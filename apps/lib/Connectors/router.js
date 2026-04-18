// ============================================================================
// FILE: /apps/tropic-pulse/lib/Connectors/router.js
// PULSE COMMUNICATION INTELLIGENCE — v6.4
// “THE WISDOM+ / COMMUNICATION INTELLIGENCE LAYER”
// ============================================================================
//
// ⭐ v6.4 COMMENT LOG  [OS‑LEVEL — WHITE]
// - THEME: “THE WISDOM+ / COMMUNICATION INTELLIGENCE LAYER”
// - ROLE: Structured communication, logging, retry, healing, alerting
// - Updated: Replaced misleading ‘timer’ with GateHeartbeat
// - Updated: Clarified subsystem identity (Router = Nervous System)
// - Updated: Clarified that frontend NEVER performs timing logic
// - Updated: Healing + retry logic aligned with v6.3+ invariants
// - ZERO timing logic on frontend
// - ZERO scheduling, loops, or intervals
//
// ============================================================================
// SUBSYSTEM IDENTITY — “THE WISDOM+”  [PURPLE — SUBSYSTEM IDENTITY]
// ----------------------------------------------------------------------------
// router.js is the **WISDOM+** of the frontend (BLUE).
// It is the **COMMUNICATION INTELLIGENCE LAYER** — the subsystem that:
//
//   • Speaks to the backend (RED) using structured syscalls
//   • Logs events into RouterMemory (BLUE — The Network)
//   • Retries intelligently when communication fails
//   • Detects drift conditions
//   • Triggers backend alerts (RED) when routes are down
//   • Requests healing when memory is degraded
//
// Router.js is the **Nervous System** of PulseOS —
// it sends signals, maintains order, and ensures communication remains
// coherent, resilient, and self‑healing.
//
// ============================================================================
// WHAT THIS FILE IS  [GREEN — CLARITY]
// ----------------------------------------------------------------------------
//   ✔ A structured syscall generator
//   ✔ A logging + retry + healing connector
//   ✔ A communication intelligence layer
//   ✔ A route‑down detection + alert layer
//   ✔ A frontend → backend signaling system
//
// WHAT THIS FILE IS NOT  [GREEN — CLARITY]
// ----------------------------------------------------------------------------
//   ✘ NOT a backend router
//   ✘ NOT a business logic layer
//   ✘ NOT a security layer
//   ✘ NOT a database writer
//   ✘ NOT a timing or scheduling system
//
// ============================================================================
// SAFETY CONTRACT (v6.4)  [CYAN — SAFETY RULES]
// ----------------------------------------------------------------------------
//   • Never mutate payloads
//   • Never bypass RouterMemory
//   • Never call backend with malformed structure
//   • Always log before and after syscalls
//   • Always retry once before alerting
//   • Always heal RouterMemory before GateHeartbeat signal
//   • Never run timing logic on frontend
//
// ============================================================================

import { RouterMemory } from "./RouterMemory.js"; // [BLUE]
import { GateHeartbeat } from "./Gate.js";        // [GOLD] frontend → backend signal

// ============================================================================
// CONSTANTS + DIAGNOSTICS  [BLUE]
// ============================================================================
const LAYER_ID = "COMM-LAYER";
const LAYER_NAME = "THE WISDOM+";
const LAYER_ROLE = "COMMUNICATION INTELLIGENCE";

const WISDOM_DIAGNOSTICS_ENABLED =
  window.PULSE_WISDOM_DIAGNOSTICS === "true" ||
  window.PULSE_DIAGNOSTICS === "true";

const logWisdom = (stage, details = {}) => {
  if (!WISDOM_DIAGNOSTICS_ENABLED) return;
  console.log(JSON.stringify({
    pulseLayer: LAYER_ID,
    pulseName: LAYER_NAME,
    pulseRole: LAYER_ROLE,
    stage,
    ...details
  }));
};

// ============================================================================
// ROUTE FAILURE STATE  [BLUE]
// ============================================================================
let routeFailureCount = 0;

// ============================================================================
// ROUTER CONTEXT MAP  [BLUE]
// ============================================================================
const ROUTER_CONTEXT = {
  label: "ROUTER",
  layer: "B‑Layer",
  purpose: "Frontend → Backend Connector",
  context: "Sends structured requests to backend router"
};

// ============================================================================
// ⭐ ROUTER MEMORY HEALING (pre‑flush)  [BLUE → RED — GOLD]
// ============================================================================
async function healRouterMemoryIfNeeded() {
  const logs = RouterMemory.getAll();
  if (!logs || logs.length === 0) {
    logWisdom("HEAL_SKIP_EMPTY");
    return;
  }

  logWisdom("HEAL_REQUEST", { count: logs.length });

  try {
    const res = await fetch("/.netlify/functions/CheckRouterMemory", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ logs })
    });

    const data = await res.json();

    if (Array.isArray(data.logs)) {
      RouterMemory._logs = data.logs;
      logWisdom("HEAL_APPLIED", { count: data.logs.length });
    } else {
      logWisdom("HEAL_DEGRADED");
    }
  } catch (err) {
    logWisdom("HEAL_ERROR", { message: String(err) });
  }
}

// ============================================================================
// ⭐ ROUTE‑DOWN ALERT TRIGGER  [BLUE → RED — GOLD]
// ============================================================================
async function triggerRouteDownAlert(error, type) {
  logWisdom("ALERT_TRIGGER", { error, type });

  try {
    await fetch("/.netlify/functions/RouteDownAlert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error, type })
    });

    logWisdom("ALERT_SENT", { type });
  } catch (err) {
    logWisdom("ALERT_ERROR", { message: String(err) });
  }
}

// ============================================================================
// ⭐ UNIVERSAL SYS‑CALL FUNCTION  [BLUE → RED — GOLD]
// ============================================================================
export async function route(type, payload = {}) {
  logWisdom("ROUTE_CALL", { type });

  logEvent("routeCall", { type, payload, ...ROUTER_CONTEXT });

  try {
    const res = await fetch("/.netlify/functions/endpoint", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, payload })
    });

    const json = await res.json();

    routeFailureCount = 0;

    logWisdom("ROUTE_RESPONSE", { type });
    logEvent("routeResponse", { type, payload, json, ...ROUTER_CONTEXT });

    return json;

  } catch (err) {
    routeFailureCount++;
    logWisdom("ROUTE_ERROR", { type, message: String(err), count: routeFailureCount });

    logEvent("routeError", { type, payload, error: String(err), ...ROUTER_CONTEXT });

    if (String(err).includes("process is not defined")) {
      RouterMemory.push({
        eventType: "frontendEnvMismatch",
        repairHint: "Replace process.env.* with window.PULSE_*",
        timestamp: Date.now()
      });
    }

    if (routeFailureCount === 1) {
      logWisdom("ROUTE_RETRY", { type });

      try {
        const retryRes = await fetch("/.netlify/functions/endpoint", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type, payload })
        });

        const retryJson = await retryRes.json();

        routeFailureCount = 0;

        logWisdom("ROUTE_RETRY_SUCCESS", { type });
        logEvent("routeRetrySuccess", { type, payload, retryJson, ...ROUTER_CONTEXT });

        return retryJson;

      } catch (retryErr) {
        logWisdom("ROUTE_RETRY_FAIL", { type, message: String(retryErr) });
        await triggerRouteDownAlert(String(retryErr), type);
        routeFailureCount = 0;
      }
    }

    return { error: "Frontend connector failed", details: String(err) };
  }
}

// ============================================================================
// ⭐ LOGGING ENTRY POINT  [BLUE → RED — GOLD]
// ============================================================================
export async function logEvent(eventType, data) {
  logWisdom("LOG_EVENT", { eventType });

  RouterMemory.push({
    eventType,
    data,
    page: window.location.pathname,
    timestamp: Date.now()
  });

  logWisdom("LOG_PUSHED", { eventType });

  await healRouterMemoryIfNeeded();

  GateHeartbeat(); // [GOLD] frontend → backend heartbeat signal (NOT a timer)
  logWisdom("GATE_HEARTBEAT_SIGNAL_SENT");
}

// ============================================================================
// ⭐ HEALING ENTRY POINT  [BLUE → RED — GOLD]
// ============================================================================
export async function heal(type, payload) {
  logWisdom("HEAL_CALL", { type });

  logEvent("healingRequest", { type, payload, ...ROUTER_CONTEXT });

  return await route(type, payload);
}
