// ============================================================================
//  PulseEarnReflex.js — Side-Attached Earn Reflex (v10.4)
//  - No imports
//  - No sending, no routing
//  - Pure deterministic reflex builder
//  - Fully aligned with PulseOSGovernor v3.2 (dynamic slicing)
// ============================================================================

// In-memory registry of reflex instances (multi-instance law)
const reflexInstances = new Map(); // reflexId -> state

// Deterministic cycle counter (replaces timestamps)
let reflexCycle = 0;

// ---------------------------------------------------------------------------
//  INTERNAL: Build a Reflex Earn organism from a governor event (deterministic)
// ---------------------------------------------------------------------------
function buildReflexEarnFromGovernorEvent(event, pulseOrImpulse, instanceContext) {
  const pulseId =
    pulseOrImpulse?.pulseId ||
    pulseOrImpulse?.id ||
    pulseOrImpulse?.tickId ||
    pulseOrImpulse?.jobId ||
    "UNKNOWN_PULSE";

  const organ  = event.organ  || event.module || "UNKNOWN_ORGAN";
  const reason = event.reason || "unknown_reason";

  const payload = {
    pulseId,
    organ,
    reason,
    blocked: !!event.blocked,
    lineageDepth: event.lineageDepth,
    returnToDepth: event.returnToDepth,
    fallbackDepth: event.fallbackDepth,
    instanceContext,       // dynamic slice context
    cycleIndex: reflexCycle,
    rawEvent: event
  };

  return {
    EarnRole: {
      kind: "EarnReflex",
      version: "10.4",
      identity: "EarnReflex-v10.4"
    },
    jobId: pulseId,
    pattern: `EarnReflex:${organ}:${reason}`,
    payload,
    priority: "low",
    returnTo: null,
    lineage: [],
    meta: {
      reflex: true,
      origin: "PulseEarnReflex",
      sourceOrgan: organ,
      sourceReason: reason,
      sourcePulseId: pulseId,
      instanceContext,
      cycleIndex: reflexCycle
    }
  };
}

// ---------------------------------------------------------------------------
//  INTERNAL: Multi-instance reflex identity (deterministic)
// ---------------------------------------------------------------------------
function getReflexId(event, pulseOrImpulse) {
  const pulseId =
    pulseOrImpulse?.pulseId ||
    pulseOrImpulse?.id ||
    pulseOrImpulse?.tickId ||
    pulseOrImpulse?.jobId ||
    "UNKNOWN_PULSE";

  const organ  = event.organ  || event.module || "UNKNOWN_ORGAN";
  const reason = event.reason || "unknown_reason";

  return `${pulseId}::${organ}::${reason}`;
}

// ---------------------------------------------------------------------------
//  PUBLIC API — PulseEarnReflex v10.4
// ---------------------------------------------------------------------------
export const PulseEarnReflex = {
  // Called when the governor blocks or detects a loop-like condition
  fromGovernorEvent(event, pulseOrImpulse, instanceContext) {
    reflexCycle++;

    const reflexId = getReflexId(event, pulseOrImpulse);

    // Multi-instance reflex law:
    // - Track how many reflexes of this type have appeared
    // - Provide slice context for reflex distribution
    let state = reflexInstances.get(reflexId);
    if (!state) {
      state = {
        reflexId,
        count: 0,
        firstSeenCycle: reflexCycle,
        lastSeenCycle: null
      };
      reflexInstances.set(reflexId, state);
    }

    state.count += 1;
    state.lastSeenCycle = reflexCycle;

    // Build the EarnReflex organism with dynamic slice context
    const earnReflex = buildReflexEarnFromGovernorEvent(
      event,
      pulseOrImpulse,
      instanceContext
    );

    // Optional: local-only observer hook (no routing, no send)
    if (typeof window !== "undefined" && window.EarnBand?.receiveEarnReflex) {
      window.EarnBand.receiveEarnReflex({
        event,
        pulse: pulseOrImpulse,
        reflexId,
        state,
        instanceContext,
        earnReflex
      });
    }

    return {
      ok: true,
      reflexId,
      state,
      instanceContext,
      earnReflex
    };
  },

  // Expose current reflex instances (for dashboards / debugging)
  getReflexState(reflexId) {
    if (reflexId) return reflexInstances.get(reflexId) || null;
    return Array.from(reflexInstances.values());
  }
};
