// ============================================================================
// FILE: /apps/tropic-pulse/lib/Connectors/router.js
// LAYER: B‑LAYER (FRONTEND INTELLIGENCE + LOGGING CONNECTOR)
// ============================================================================

import { RouterMemory } from "./RouterMemory.js";

// ------------------------------------------------------------
// ⭐ CONTEXT MAP (LAYER + PURPOSE + ROLE)
// ------------------------------------------------------------
const ROUTER_CONTEXT = {
  label: "ROUTER",
  layer: "B‑Layer",
  purpose: "Frontend → Backend Connector",
  context: "Sends structured requests to backend router"
};

// ------------------------------------------------------------
// ⭐ UNIVERSAL SYS‑CALL FUNCTION (A → B → C)
// ------------------------------------------------------------
export async function route(type, payload = {}) {
  logEvent("routeCall", {
    type,
    payload,
    ...ROUTER_CONTEXT
  });

  try {
    const res = await fetch("/.netlify/functions/endpoint", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, payload })
    });

    const json = await res.json();

    logEvent("routeResponse", {
      type,
      payload,
      json,
      ...ROUTER_CONTEXT
    });

    return json;

  } catch (err) {
    logEvent("routeError", {
      type,
      payload,
      error: String(err),
      ...ROUTER_CONTEXT
    });

    return {
      error: "Frontend connector failed",
      details: String(err)
    };
  }
}

// ------------------------------------------------------------
// ⭐ LOGGING ENTRY POINT (A2 → B)
// ------------------------------------------------------------
export function logEvent(eventType, data) {
  const entry = {
    eventType,
    data,
    page: window.location.pathname,
    timestamp: Date.now()
  };

  RouterMemory.push(entry);
  timer();
}

// ------------------------------------------------------------
// ⭐ HEALING ENTRY POINT (A2 → B)
// ------------------------------------------------------------
export async function heal(type, payload) {
  logEvent("healingRequest", {
    type,
    payload,
    ...ROUTER_CONTEXT
  });

  return await route(type, payload);
}
