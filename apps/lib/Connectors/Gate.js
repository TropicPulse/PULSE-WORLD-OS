// ============================================================================
// FILE: /apps/tropic-pulse/lib/Connectors/Gate.js
// PULSE OS — v7.0
// “THE GATE / HEARTBEAT SIGNAL LAYER”
// LOCAL‑FIRST • OFFLINE‑CAPABLE • ZERO TIMING • ZERO STATE
// ============================================================================
//
// ROLE (v7.0):
//   • Protect backend heartbeat from direct frontend access
//   • Provide a safe, one‑way signal path
//   • Never run timers, loops, or scheduling
//   • Never store state
//   • Never mutate payloads
//   • Never depend on internet
//   • When offline → provide safe local fallback
//
// WHAT THIS FILE IS:
//   ✔ A protective wrapper around backend heartbeat
//   ✔ A safe, one‑way signal sender
//   ✔ A strict boundary between router.js and backend timer
//   ✔ A frontend → backend communication gate
//   ✔ v7.0: LOCAL‑FIRST, OFFLINE‑SAFE
//
// WHAT THIS FILE IS NOT:
//   ✘ NOT a timer
//   ✘ NOT a heartbeat
//   ✘ NOT a scheduler
//   ✘ NOT a loop
//   ✘ NOT a backend logic layer
//   ✘ NOT a state machine
//
// SAFETY CONTRACT (v7.0):
//   • Never run timing logic on frontend
//   • Never store state
//   • Never retry or loop
//   • Never mutate payloads
//   • Never expose backend heartbeat directly
//   • Always send a one‑way, best‑effort signal
//   • v7.0: If offline → return safe local signal instead of fetch
//
// ============================================================================
// MODE — v7.0 LOCAL-FIRST
// ----------------------------------------------------------------------------
// If window.PULSE_OFFLINE_MODE === "1", GateHeartbeat will NOT call fetch.
// It will still return a safe, valid heartbeat signal object.
// ============================================================================
const OFFLINE_MODE =
  typeof window !== "undefined" &&
  window.PULSE_OFFLINE_MODE === "1";

// ============================================================================
// HEARTBEAT SIGNAL FUNCTION (Frontend → Backend)
// ============================================================================

export function GateHeartbeat() {
  const payload = {
    source: "frontend-gate",
    timestamp: Date.now(),
    mode: OFFLINE_MODE ? "offline" : "online"
  };

  // OFFLINE MODE — v7.0 local-only safe fallback
  if (OFFLINE_MODE) {
    return {
      ok: false,
      offline: true,
      reason: "Gate running in offline mode; backend heartbeat skipped.",
      payload
    };
  }

  // ONLINE MODE — original v6.x behavior (unchanged)
  fetch("/.netlify/functions/timer", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  }).catch(() => {
    // Silent by design — the Gate NEVER throws.
  });

  return { ok: true, offline: false, payload };
}

// ============================================================================
// END OF FILE — THE GATE
// ============================================================================
