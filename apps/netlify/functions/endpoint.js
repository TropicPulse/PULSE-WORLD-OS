// ============================================================================
// FILE: /apps/netlify/functions/endpoint.js
// LAYER: C‑LAYER (BACKEND ENTRY POINT / KERNEL DISPATCHER)
//
// PURPOSE:
// • Single backend entry point for Netlify.
// • Try modular backend files first.
// • Fallback to legacy index.js.
// • If nothing exists → return missingFunction so router.js can heal.
// ============================================================================

import * as LegacyLogic from "./index.js";

// ------------------------------------------------------------
// ⭐ HUMAN‑READABLE CONTEXT MAP
// ------------------------------------------------------------
const ENDPOINT_CONTEXT = {
  label: "ENDPOINT",
  layer: "C‑Layer",
  purpose: "Backend Kernel Dispatcher",
  context: "Loads modular backend handlers, falls back to legacy, heals missing functions"
};

// ------------------------------------------------------------
// ⭐ DYNAMIC MODULAR BACKEND LOADER
// ------------------------------------------------------------
async function loadModularHandler(type) {
  try {
    const module = await import(`./${type}.js`);
    if (typeof module.handler === "function") {
      return module.handler;
    }
  } catch (err) {
    // File missing or failed to load → fallback
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
        body: JSON.stringify({
          error: "Invalid JSON body",
          ...ENDPOINT_CONTEXT
        })
      };
    }
  } else if (event.httpMethod === "GET") {
    type = event.queryStringParameters?.type;
    payload = event.queryStringParameters || {};
  }

  // ------------------------------------------------------------
  // ⭐ DEV LOGGING (COLOR‑CODED)
  // ------------------------------------------------------------
  console.log(
    `%c🟦 ${ENDPOINT_CONTEXT.label} CALL → type: ${type}`,
    "color:#03A9F4; font-weight:bold;"
  );

  // ------------------------------------------------------------
  // 1. TRY MODULAR BACKEND FILE FIRST (NEW SYSTEM)
  // ------------------------------------------------------------
  const modularFn = await loadModularHandler(type);

  if (modularFn) {
    console.log(
      `%c🟩 MODULAR HANDLER FOUND → ${type}.js`,
      "color:#4CAF50; font-weight:bold;"
    );

    try {
      const result = await modularFn(payload);

      return {
        statusCode: 200,
        body: JSON.stringify({
          ...result,
          ...ENDPOINT_CONTEXT
        })
      };

    } catch (err) {
      console.error(
        `%c🟥 MODULAR HANDLER ERROR`,
        "color:#FF5252; font-weight:bold;",
        err
      );

      return {
        statusCode: 500,
        body: JSON.stringify({
          error: "Modular backend execution failed",
          details: String(err),
          ...ENDPOINT_CONTEXT
        })
      };
    }
  }

  // ------------------------------------------------------------
  // 2. FALLBACK TO LEGACY index.js (OLD SYSTEM)
  // ------------------------------------------------------------
  console.warn(
    `%c🟨 MODULAR HANDLER NOT FOUND → Falling back to legacy index.js`,
    "color:#FFC107; font-weight:bold;"
  );

  const legacyFn = LegacyLogic[type];

  if (typeof legacyFn === "function") {
    try {
      const result = await legacyFn(payload);

      return {
        statusCode: 200,
        body: JSON.stringify({
          ...result,
          ...ENDPOINT_CONTEXT
        })
      };

    } catch (err) {
      console.error(
        `%c🟥 LEGACY HANDLER ERROR`,
        "color:#FF5252; font-weight:bold;",
        err
      );

      return {
        statusCode: 500,
        body: JSON.stringify({
          error: "Legacy backend execution failed",
          details: String(err),
          ...ENDPOINT_CONTEXT
        })
      };
    }
  }

  // ------------------------------------------------------------
  // 3. NOTHING FOUND → LET ROUTER HEAL IT
  // ------------------------------------------------------------
  console.error(
    `%c🟥 BACKEND FUNCTION NOT FOUND → ${type}`,
    "color:#FF5252; font-weight:bold;"
  );

  return {
    statusCode: 200,
    body: JSON.stringify({
      error: "Backend function not found",
      missingFunction: type,
      allowPageFallback: true,
      ...ENDPOINT_CONTEXT
    })
  };
};
