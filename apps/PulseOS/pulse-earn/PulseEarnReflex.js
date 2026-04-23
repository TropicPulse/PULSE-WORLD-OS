// ============================================================================
//  PulseEarnReflex-v11-Evo.js
//  Side-Attached Earn Reflex (v11-Evo)
//  - No imports
//  - No sending, no routing
//  - Pure deterministic reflex builder
//  - Fully aligned with PulseOSGovernor v3.3 (dynamic slicing safe)
//  - v11: Diagnostics + Signatures + Pattern Surface
// ============================================================================


// ============================================================================
// INTERNAL STATE — deterministic, drift-proof
// ============================================================================
const reflexInstances = new Map(); // reflexId -> state
let reflexCycle = 0;               // deterministic cycle counter


// ============================================================================
// HELPERS — deterministic, tiny, pure
// ============================================================================
function computeHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `h${h}`;
}

function getPulseId(pulseOrImpulse) {
  return (
    pulseOrImpulse?.pulseId ||
    pulseOrImpulse?.id ||
    pulseOrImpulse?.tickId ||
    pulseOrImpulse?.jobId ||
    "UNKNOWN_PULSE"
  );
}

function getOrgan(event) {
  return event.organ || event.module || "UNKNOWN_ORGAN";
}

function getReason(event) {
  return event.reason || "unknown_reason";
}


// ============================================================================
// REFLEX IDENTITY (v11-Evo)
// ============================================================================
function getReflexId(event, pulseOrImpulse) {
  const pulseId = getPulseId(pulseOrImpulse);
  const organ   = getOrgan(event);
  const reason  = getReason(event);
  return `${pulseId}::${organ}::${reason}`;
}

function buildReflexDiagnostics(event, pulseOrImpulse, reflexId, state) {
  const pulseId = getPulseId(pulseOrImpulse);
  const organ   = getOrgan(event);
  const reason  = getReason(event);

  return {
    reflexId,
    pulseId,
    organ,
    reason,
    lineageDepth: event.lineageDepth,
    returnToDepth: event.returnToDepth,
    fallbackDepth: event.fallbackDepth,
    instanceContext: event.instanceContext || null,
    cycleIndex: reflexCycle,

    reflexHash: computeHash(reflexId),
    pulseHash: computeHash(pulseId),
    organHash: computeHash(organ),
    reasonHash: computeHash(reason),
    cycleHash: computeHash(String(reflexCycle))
  };
}


// ============================================================================
// REFLEX ORGANISM BUILDER (v11-Evo)
// ============================================================================
function buildReflexEarnFromGovernorEvent(event, pulseOrImpulse, instanceContext) {
  const pulseId = getPulseId(pulseOrImpulse);
  const organ   = getOrgan(event);
  const reason  = getReason(event);

  const pattern = `EarnReflex:${organ}:${reason}`;
  const patternSignature = computeHash(pattern);

  return {
    EarnRole: {
      kind: "EarnReflex",
      version: "11.0",
      identity: "EarnReflex-v11-Evo"
    },

    jobId: pulseId,
    pattern,
    patternSignature,

    payload: {
      pulseId,
      organ,
      reason,
      blocked: !!event.blocked,
      lineageDepth: event.lineageDepth,
      returnToDepth: event.returnToDepth,
      fallbackDepth: event.fallbackDepth,
      instanceContext,
      cycleIndex: reflexCycle,
      rawEvent: event
    },

    priority: "low",
    returnTo: null,
    lineage: [],

    meta: {
      reflex: true,
      origin: "PulseEarnReflex-v11-Evo",
      sourceOrgan: organ,
      sourceReason: reason,
      sourcePulseId: pulseId,
      instanceContext,
      cycleIndex: reflexCycle,
      patternSignature
    }
  };
}


// ============================================================================
// PUBLIC API — PulseEarnReflex v11-Evo
// ============================================================================
export const PulseEarnReflex = {

  fromGovernorEvent(event, pulseOrImpulse, instanceContext) {
    reflexCycle++;

    const reflexId = getReflexId(event, pulseOrImpulse);

    // Multi-instance reflex law
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

    // Build reflex organism
    const earnReflex = buildReflexEarnFromGovernorEvent(
      event,
      pulseOrImpulse,
      instanceContext
    );

    // v11-Evo diagnostics
    const diagnostics = buildReflexDiagnostics(
      event,
      pulseOrImpulse,
      reflexId,
      state
    );

    const reflexSignature = computeHash(
      `${reflexId}::${diagnostics.cycleIndex}`
    );

    // Optional local observer (no routing, no send)
    if (typeof window !== "undefined" && window.EarnBand?.receiveEarnReflex) {
      window.EarnBand.receiveEarnReflex({
        event,
        pulse: pulseOrImpulse,
        reflexId,
        state,
        instanceContext,
        diagnostics,
        reflexSignature,
        earnReflex
      });
    }

    return {
      ok: true,
      reflexId,
      state,
      instanceContext,
      diagnostics,
      reflexSignature,
      earnReflex
    };
  },

  // Dashboard / debugging
  getReflexState(reflexId) {
    if (reflexId) return reflexInstances.get(reflexId) || null;
    return Array.from(reflexInstances.values());
  }
};
