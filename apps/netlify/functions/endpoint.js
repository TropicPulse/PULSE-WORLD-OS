// ============================================================================
// FILE: /apps/netlify/functions/endpoint.js
// LAYER: C‑LAYER (BACKEND ENTRY POINT / KERNEL DISPATCHER)
//
// PURPOSE:
// • Single backend entry point for Netlify.
// • ALWAYS try modular backend files first.
// • FALLBACK to legacy index.js only if modular file does not exist.
// • If neither exists → return missingFunction so router.js can heal.
// ============================================================================

import * as LegacyLogic from "./index.js";

// ------------------------------------------------------------
// ⭐ DYNAMIC MODULAR BACKEND LOADER
// ------------------------------------------------------------
async function loadModularHandler(type) {
  try {
    // Try to import a modular backend file: /functions/<type>.js
    const module = await import(`./${type}.js`);
    if (typeof module.handler === "function") {
      return module.handler;
    }
  } catch (err) {
    // File does not exist or failed to load → fallback to legacy
  }
  return null;
}

// ------------------------------------------------------------
// ⭐ MAIN HANDLER (C‑LAYER)
// ------------------------------------------------------------
export const handler = async (event) => {
  let type;
  let payload = {};

  // ------------------------------------------------------------
  // 0. NORMALIZE INPUT
  // ------------------------------------------------------------
  if (event.httpMethod === "POST") {
    try {
      const body = JSON.parse(event.body || "{}");
      type = body.type;
      payload = body.payload || {};
    } catch (err) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid JSON body" })
      };
    }
  } else if (event.httpMethod === "GET") {
    type = event.queryStringParameters?.type;
    payload = event.queryStringParameters || {};
  }

  // ------------------------------------------------------------
  // 1. TRY MODULAR BACKEND FILE FIRST (NEW SYSTEM)
  // ------------------------------------------------------------
  const modularFn = await loadModularHandler(type);

  if (modularFn) {
    try {
      const result = await modularFn(payload);
      return {
        statusCode: 200,
        body: JSON.stringify(result)
      };
    } catch (err) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: "Modular backend execution failed",
          details: String(err)
        })
      };
    }
  }

  // ------------------------------------------------------------
  // 2. FALLBACK TO LEGACY index.js (OLD SYSTEM)
  // ------------------------------------------------------------
  const legacyFn = LegacyLogic[type];

  if (typeof legacyFn === "function") {
    try {
      const result = await legacyFn(payload);
      return {
        statusCode: 200,
        body: JSON.stringify(result)
      };
    } catch (err) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: "Legacy backend execution failed",
          details: String(err)
        })
      };
    }
  }

  // ------------------------------------------------------------
  // 3. NOTHING FOUND → LET ROUTER HEAL IT
  // ------------------------------------------------------------
  return {
    statusCode: 200,
    body: JSON.stringify({
      error: "Backend function not found",
      missingFunction: type,
      allowPageFallback: true
    })
  };
};
