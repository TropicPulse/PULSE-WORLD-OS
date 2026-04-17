// ============================================================================
// FILE: /apps/tropic-pulse/lib/Connectors/router.js
// LAYER: B‑LAYER (FRONTEND INTELLIGENCE + LOGGING CONNECTOR)
//
// PURPOSE:
// This is the INTELLIGENCE LAYER of the frontend.
// All healing, logging, detection, and telemetry flow through here.
//
// Router.js MUST:
// • Receive logs + healing requests from PageScanner (A2).
// • Store logs in RouterMemory.
// • Dedupe repeated failures.
// • Detect drift.
// • Detect missing fields/functions/accessors/handlers.
// • Forward backend requests to endpoint.js.
// • Flush logs to Firebase via Timer.js.
// ============================================================================

import { RouterMemory } from "./RouterMemory.js";
import { scheduleFlush } from "./Timer.js";

// ------------------------------------------------------------
// ⭐ UNIVERSAL SYS‑CALL FUNCTION (A → B → C)
// ------------------------------------------------------------
export async function route(type, payload = {}) {
  // ⭐ Log every call for lineage + debugging
  logEvent("routeCall", { type, payload });

  try {
    const res = await fetch("/.netlify/functions/endpoint", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, payload })
    });

    const json = await res.json();

    // ⭐ Log backend response for drift detection
    logEvent("routeResponse", { type, payload, json });

    return json;

  } catch (err) {
    logEvent("routeError", { type, payload, error: String(err) });

    return {
      error: "Frontend connector failed",
      details: String(err)
    };
  }
}

// ------------------------------------------------------------
// ⭐ LOGGING + HEALING ENTRY POINT (A2 → B)
// Called by PageScanner for missing fields/functions/etc.
// ------------------------------------------------------------
export function logEvent(eventType, data) {
  const entry = {
    eventType,
    data,
    page: window.location.pathname,
    timestamp: Date.now()
  };

  RouterMemory.push(entry);
  scheduleFlush(); // Timer.js handles batching + Firebase writes
}

// ------------------------------------------------------------
// ⭐ HEALING HELPERS (OPTIONAL)
// PageScanner may call route("fetchField", {...})
// Router logs it + forwards to backend.
// ------------------------------------------------------------
export async function heal(type, payload) {
  logEvent("healingRequest", { type, payload });
  return await route(type, payload);
}

// ============================================================================
// NO getMap / getAuth / getHook.
// NO connector functions.
// NO backend logic.
// Router.js = INTELLIGENCE + LOGGING + HEALING.
// ============================================================================
