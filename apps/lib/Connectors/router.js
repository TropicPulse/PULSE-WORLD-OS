// ============================================================================
// FILE: /apps/tropic-pulse/lib/Connectors/router.js
// PULSE COMMUNICATION INTELLIGENCE — v6.3+
// “THE WISDOM+ / COMMUNICATION INTELLIGENCE LAYER”
// ============================================================================
//
// ⭐ v6.3+ COMMENT LOG
// - THEME: “THE WISDOM+ / COMMUNICATION INTELLIGENCE LAYER”
// - ROLE: Structured communication + logging + healing + alert intelligence
// - Added route‑down retry logic
// - Added instant-but-verified alert trigger
// - Added RouterMemory healing pre‑flush
// - Added new diagnostics stages (RETRY, ALERT_TRIGGER, HEAL_APPLY)
// - ZERO breaking changes to syscall structure
//
// ============================================================================
// PERSONALITY + ROLE — “THE WISDOM+”
// ----------------------------------------------------------------------------
// router.js is the **WISDOM+** of the frontend.
// It is the **COMMUNICATION INTELLIGENCE LAYER** — the subsystem that knows
// how to speak to the backend, how to structure requests, how to log events,
// how to retry intelligently, how to alert when communication fails,
// and how to initiate healing.
//
//   • Sends structured syscalls to the backend
//   • Logs events into RouterMemory (The Network)
//   • Retries failed routes instantly
//   • Triggers backend alerts when routes are truly down
//   • Heals RouterMemory before Timer.js flush
//   • Maintains communication order + structure
//
// This is the OS’s procedural wisdom — the intelligence that keeps
// communication coherent, resilient, and self-healing.
//
// ============================================================================
// WHAT THIS FILE IS
// ----------------------------------------------------------------------------
//   ✔ A structured syscall generator
//   ✔ A logging + retry + healing connector
//   ✔ A communication intelligence layer
//   ✔ A route‑down detection + alert layer
//
// WHAT THIS FILE IS NOT
// ----------------------------------------------------------------------------
//   ✘ NOT a backend router
//   ✘ NOT a business logic layer
//   ✘ NOT a security layer
//   ✘ NOT a database writer
//
// ============================================================================
// SAFETY CONTRACT (v6.3+)
// ----------------------------------------------------------------------------
//   • Never mutate payloads
//   • Never bypass RouterMemory
//   • Never call backend with malformed structure
//   • Always log before and after syscalls
//   • Always retry once before alerting
//   • Always heal RouterMemory before Timer flush
//
// ============================================================================

import { RouterMemory } from "./RouterMemory.js";

// ============================================================================
// LAYER CONSTANTS + DIAGNOSTICS
// ============================================================================
const LAYER_ID = "COMM-LAYER";
const LAYER_NAME = "THE WISDOM+";
const LAYER_ROLE = "COMMUNICATION INTELLIGENCE";

const WISDOM_DIAGNOSTICS_ENABLED =
  window.PULSE_WISDOM_DIAGNOSTICS === "true" ||
  window.PULSE_DIAGNOSTICS === "true";

const logWisdom = (stage, details = {}) => {
  if (!WISDOM_DIAGNOSTICS_ENABLED) return;

  console.log(
    JSON.stringify({
      pulseLayer: LAYER_ID,
      pulseName: LAYER_NAME,
      pulseRole: LAYER_ROLE,
      stage,
      ...details
    })
  );
};

// ============================================================================
// ROUTE FAILURE STATE (short‑term, safe, non‑top‑level execution)
// ============================================================================
let routeFailureCount = 0;

// ============================================================================
// ROUTER CONTEXT MAP
// ============================================================================
const ROUTER_CONTEXT = {
  label: "ROUTER",
  layer: "B‑Layer",
  purpose: "Frontend → Backend Connector",
  context: "Sends structured requests to backend router"
};

// ============================================================================
// ⭐ ROUTER MEMORY HEALING (pre‑flush)
// ============================================================================
async function healRouterMemoryIfNeeded() {
  const logs = RouterMemory.getAll();
  if (!logs || logs.length === 0) {
    logWisdom("HEAL_SKIP_EMPTY", {});
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
      logWisdom("HEAL_DEGRADED", {});
    }
  } catch (err) {
    logWisdom("HEAL_ERROR", { message: String(err) });
  }
}

// ============================================================================
// ⭐ ROUTE‑DOWN ALERT TRIGGER (backend email)
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
// ⭐ UNIVERSAL SYS‑CALL FUNCTION (A → B → C)
// ============================================================================
export async function route(type, payload = {}) {
  logWisdom("ROUTE_CALL", { type });

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

    // Reset failure counter on success
    routeFailureCount = 0;

    logWisdom("ROUTE_RESPONSE", { type });

    logEvent("routeResponse", {
      type,
      payload,
      json,
      ...ROUTER_CONTEXT
    });

    return json;

  } catch (err) {
    // ------------------------------------------------------------
    // ⭐ FIRST FAILURE DETECTED
    // ------------------------------------------------------------
    routeFailureCount++;
    logWisdom("ROUTE_ERROR", { type, message: String(err), count: routeFailureCount });

    logEvent("routeError", {
      type,
      payload,
      error: String(err),
      ...ROUTER_CONTEXT
    });

    // ⭐ v6.3 DRIFT DETECTOR
    if (String(err).includes("process is not defined")) {
      RouterMemory.push({
        eventType: "frontendEnvMismatch",
        repairHint: "Replace process.env.* with window.PULSE_*",
        timestamp: Date.now()
      });
    }

    // ------------------------------------------------------------
    // ⭐ RETRY ONCE BEFORE ALERTING
    // ------------------------------------------------------------
    if (routeFailureCount === 1) {
      logWisdom("ROUTE_RETRY", { type });

      try {
        const retryRes = await fetch("/.netlify/functions/endpoint", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type, payload })
        });

        const retryJson = await retryRes.json();

        // Retry succeeded → reset counter
        routeFailureCount = 0;

        logWisdom("ROUTE_RETRY_SUCCESS", { type });

        logEvent("routeRetrySuccess", {
          type,
          payload,
          retryJson,
          ...ROUTER_CONTEXT
        });

        return retryJson;

      } catch (retryErr) {
        // Retry failed → trigger alert
        logWisdom("ROUTE_RETRY_FAIL", { type, message: String(retryErr) });

        await triggerRouteDownAlert(String(retryErr), type);

        routeFailureCount = 0; // reset after alert
      }
    }

    return {
      error: "Frontend connector failed",
      details: String(err)
    };
  }
}

// ============================================================================
// ⭐ LOGGING ENTRY POINT (A2 → B)
// ============================================================================
export async function logEvent(eventType, data) {
  logWisdom("LOG_EVENT", { eventType });

  const entry = {
    eventType,
    data,
    page: window.location.pathname,
    timestamp: Date.now()
  };

  RouterMemory.push(entry);

  logWisdom("LOG_PUSHED", { eventType });

  // ⭐ Heal RouterMemory BEFORE Timer flush
  await healRouterMemoryIfNeeded();

  timer();
  logWisdom("TIMER_TRIGGERED", {});
}

// ============================================================================
// ⭐ HEALING ENTRY POINT (A2 → B)
// ============================================================================
export async function heal(type, payload) {
  logWisdom("HEAL_CALL", { type });

  logEvent("healingRequest", {
    type,
    payload,
    ...ROUTER_CONTEXT
  });

  return await route(type, payload);
}
