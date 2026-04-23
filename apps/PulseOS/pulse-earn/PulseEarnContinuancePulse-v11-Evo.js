// ============================================================================
//  PulseEarnContinuancePulse-v11-Evo.js
//  Earn v1 Continuance Wrapper (v11-Evo SAFE)
//  NO PulseSendSystem, NO network, NO routing, NO loops.
//  Only: build LegacyEarn v1 + Pulse-compatible envelope and return it.
// ============================================================================

// Deterministic cycle counter (replaces timestamps)
let continuanceCycle = 0;


// ============================================================================
//  INTERNAL: Deterministic Hash Helper (v11-Evo)
// ============================================================================
function computeHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `h${h}`;
}


// ============================================================================
//  INTERNAL: Build LegacyEarn v1 directly from impulse (NO IMPORTS)
// ============================================================================
function buildLegacyEarnFromImpulse(impulse) {
  continuanceCycle++;

  const payload = impulse?.payload || {};

  const jobId   = impulse.tickId || payload.jobId || "UNKNOWN_JOB";
  const pattern = impulse.intent || payload.pattern || "UNKNOWN_PATTERN";
  const lineage = payload.parentLineage || [];

  const patternSignature = computeHash(pattern);
  const lineageSignature = computeHash(lineage.join("::"));

  return {
    EarnRole: {
      kind: "Earn",
      version: "1.0",
      identity: "Earn-v1-Continuance-v11-Evo"
    },

    jobId,
    pattern,
    patternSignature,

    payload,
    priority: payload.priority || "normal",
    returnTo: payload.returnTo || null,
    lineage,
    lineageSignature,

    meta: {
      ...(payload.meta || {}),
      legacy: true,
      origin: "ContinuancePulse-v11-Evo",
      cycleIndex: continuanceCycle,
      patternSignature,
      lineageSignature
    }
  };
}


// ============================================================================
//  INTERNAL: Build Pulse-Compatible Earn Wrapper (v11-Evo)
// ============================================================================
function buildPulseCompatibleEarn(earn) {
  if (!earn) return null;

  const continuanceSignature = computeHash(
    `${earn.jobId}::${earn.patternSignature}::${earn.meta.cycleIndex}`
  );

  return {
    PulseRole: earn.EarnRole,

    jobId: earn.jobId,
    pattern: earn.pattern,
    patternSignature: earn.patternSignature,

    payload: earn.payload,
    priority: earn.priority,
    returnTo: earn.returnTo,
    lineage: earn.lineage,
    lineageSignature: earn.lineageSignature,

    meta: {
      ...(earn.meta || {}),
      origin: "ContinuancePulse-v11-Evo",
      earnVersion: "1.0",
      earnIdentity: "Earn-v1-Continuance-v11-Evo",
      earnEnvelope: true,
      cycleIndex: earn.meta.cycleIndex,
      continuanceSignature
    },

    earn: {
      role: earn.EarnRole,
      pattern: earn.pattern,
      patternSignature: earn.patternSignature,
      lineage: earn.lineage,
      lineageSignature: earn.lineageSignature,
      meta: earn.meta,
      __earnEnvelope: true
    }
  };
}


// ============================================================================
//  PUBLIC API — PulseEarnContinuancePulse (v11-Evo SAFE)
//  NOTE: This module DOES NOT SEND ANYTHING.
//        It only returns the legacy Earn + envelope.
//        Caller decides if/where to send, under a governor.
// ============================================================================
export const PulseEarnContinuancePulse = {

  build(impulse) {
    // 1. Build Earn v1 from Impulse
    const earnV1 = buildLegacyEarnFromImpulse(impulse);

    // 2. Wrap Earn v1 in Pulse-compatible shape
    const pulseCompatibleEarn = buildPulseCompatibleEarn(earnV1);

    // 3. Optional local-only observer hook
    if (typeof window !== "undefined" && window.EarnBand?.receiveEarnResult) {
      window.EarnBand.receiveEarnResult({
        impulse,
        earn: earnV1,
        pulseCompatibleEarn,
        result: null,
        fallback: true
      });
    }

    // 4. Return ONLY the structures; no sending, no routing.
    return {
      ok: true,
      earn: earnV1,
      pulseCompatibleEarn,
      fallback: true
    };
  }
};
