// ============================================================================
// FILE: /apps/netlify/functions/endpoint.js
// PULSE BACKEND ENDPOINT — VERSION 7.1+
// “THE EPITHELIAL GATE / IMMUNE BARRIER LAYER”
// ============================================================================
//
// PAGE INDEX (v7.1+ Source of Truth)
// ----------------------------------
// ROLE:
//   This file is the **EPITHELIAL GATE** of the backend — the Immune Barrier Layer.
//   It is the organism’s first line of defense, filtering all incoming signals.
//
//   • Intercepts every request entering the organism
//   • Validates intent (type)
//   • Routes to modular backend organs
//   • Falls back to legacy organs
//   • Reports missing organs for healing
//
//   Nothing touches backend organs without passing through this gate.
//
// WHAT THIS FILE *IS* (v7.1+):
//   • The immune barrier + epithelial checkpoint of the backend
//   • A deterministic, fail‑open routing membrane
//   • A biological security organ that filters invalid signals
//   • Version‑aware, drift‑safe, AND‑architecture compliant
//
// WHAT THIS FILE *IS NOT*:
//   • NOT business logic
//   • NOT a renderer
//   • NOT a GPU subsystem
//   • NOT a persistence layer
//
// SAFETY CONTRACT (v7.1+):
//   • Fail‑open: missing organs → healing path
//   • No randomness
//   • No timestamps
//   • No external side effects beyond logging
//   • No mutation of payload or event
//   • No new imports without architectural approval
//
// STRUCTURE RULES (v7.1+):
//   • Modular backend organs take priority
//   • Legacy index.js is fallback only
//   • Unknown organs must return healing metadata
//
// VERSION TAG:
//   version: 7.1+
// ============================================================================

import * as LegacyLogic from "./index.js";

// ------------------------------------------------------------
// ⭐ HUMAN‑READABLE CONTEXT MAP (v7.1+)
// ------------------------------------------------------------
const ENDPOINT_CONTEXT = {
  label: "ENDPOINT",
  layer: "C‑Layer",
  role: "Epithelial Gate / Immune Barrier",
  purpose: "Backend Kernel Dispatcher",
  context: "Routes backend organs, falls back to legacy, heals missing organs",
  version: "7.1+"
};

// ------------------------------------------------------------
// ⭐ DYNAMIC MODULAR BACKEND ORGAN LOADER (v7.1+)
// ------------------------------------------------------------
async function loadModularHandler(type) {
  try {
    const module = await import(`./${type}.js`);
    if (typeof module.handler === "function") {
      return module.handler;
    }
  } catch (err) {
    // Missing or invalid organ → fallback
  }
  return null;
}

// ------------------------------------------------------------
// ⭐ MAIN HANDLER — THE EPITHELIAL GATE (v7.1+)
// ------------------------------------------------------------
export const handler = async (event) => {
  let type;
  let payload = {};

  // ------------------------------------------------------------
  // 0. NORMALIZE INPUT (v7.1+)
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

  log(
    `%c🧬 EPITHELIAL GATE CALL → type: ${type}`,
    "color:#00BCD4; font-weight:bold;"
  );

  // ------------------------------------------------------------
  // 1. TRY MODULAR BACKEND ORGAN FIRST (v7.1+)
// ------------------------------------------------------------
  const modularFn = await loadModularHandler(type);

  if (modularFn) {
    log(
      `%c🟩 ORGAN FOUND → ${type}.js`,
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
      error(
        `%c🟥 ORGAN FAILURE`,
        "color:#FF5252; font-weight:bold;",
        err
      );

      return {
        statusCode: 500,
        body: JSON.stringify({
          error: "Backend organ execution failed",
          details: String(err),
          ...ENDPOINT_CONTEXT
        })
      };
    }
  }

  // ------------------------------------------------------------
  // 2. FALLBACK TO LEGACY ORGAN (index.js)
// ------------------------------------------------------------
  warn(
    `%c🟨 NO ORGAN FOUND → Falling back to legacy index.js`,
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
      error(
        `%c🟥 LEGACY ORGAN FAILURE`,
        "color:#FF5252; font-weight:bold;",
        err
      );

      return {
        statusCode: 500,
        body: JSON.stringify({
          error: "Legacy organ execution failed",
          details: String(err),
          ...ENDPOINT_CONTEXT
        })
      };
    }
  }

  // ------------------------------------------------------------
  // 3. NOTHING FOUND → IMMUNE HEALING PATH
  // ------------------------------------------------------------
  error(
    `%c🟥 UNKNOWN ORGAN REQUEST → ${type}`,
    "color:#FF5252; font-weight:bold;"
  );

  return {
    statusCode: 200,
    body: JSON.stringify({
      error: "Backend organ not found",
      missingOrgan: type,
      allowPageFallback: true,
      ...ENDPOINT_CONTEXT
    })
  };
};
