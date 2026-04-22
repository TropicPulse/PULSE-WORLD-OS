// ============================================================================
//  PulseEarnSendSystem.js — Earn Nervous System Conductor (v1.0)
//  Tries Earn v2 → falls back to Earn v1 (via legacy Pulse) → delegates to PulseSendSystem
// ============================================================================
//
//  ROLE:
//    • Accept an Impulse
//    • Try to build Earn v2 (evolved organism)
//    • If Earn v2 fails → fallback to Earn v1 (legacy pulse-style)
//    • Wrap Earn organism into Pulse-compatible payload
//    • Delegate ALL routing/mesh/send to PulseSendSystem
//
//  SAFETY:
//    • No network
    //    • No GPU
//    • No miner
//    • No compute
//    • Pure internal orchestration
// ============================================================================

import { createEarn, evolveEarn } from "./PulseEarn.js";
import { createLegacyPulse, legacyPulseFromImpulse } from "./PulseSendLegacyPulse.js";
import { PulseRouter } from "./PulseRouterEvolutionaryThought.js";
import { PulseSendSystem } from "./PulseSendSystem.js";


// ============================================================================
//  INTERNAL: Try to build Earn v2 safely
// ============================================================================
function tryEarnV2(impulse) {
  try {
    const baseEarn = createEarn({
      jobId: impulse.tickId,
      pattern: impulse.intent || impulse.payload?.pattern || "UNKNOWN_EARN_PATTERN",
      payload: impulse.payload || {},
      priority: impulse.payload?.priority || "normal",
      returnTo: impulse.payload?.returnTo || null,
      parentLineage: impulse.payload?.parentLineage || null
    });

    const evolved = typeof evolveEarn === "function"
      ? evolveEarn(baseEarn, {
          source: "PulseEarnSendSystem",
          intent: impulse.intent,
          lineage: impulse.payload?.parentLineage || null
        })
      : baseEarn;

    return { ok: true, earn: evolved || baseEarn };
  } catch (err) {
    return { ok: false, error: err };
  }
}


// ============================================================================
//  INTERNAL: Build Earn v1 fallback (via legacy Pulse)
// ============================================================================
function buildEarnV1(impulse) {
  // reuse legacy pulse builder as Earn v1 carrier
  const legacyPulse = legacyPulseFromImpulse(impulse);

  return {
    // minimal Earn-shaped wrapper around legacy pulse
    EarnRole: {
      kind: "Earn",
      version: legacyPulse.PulseRole?.version || "1.0"
    },
    jobId: legacyPulse.jobId,
    pattern: legacyPulse.pattern,
    payload: legacyPulse.payload,
    priority: legacyPulse.priority,
    returnTo: legacyPulse.returnTo,
    lineage: legacyPulse.lineage,
    meta: legacyPulse.meta || {}
  };
}


// ============================================================================
//  INTERNAL: Wrap Earn organism into Pulse-compatible shape
// ============================================================================
function wrapEarnForPulse(earn) {
  return {
    PulseRole: earn.EarnRole,   // PulseSendSystem expects PulseRole-like structure
    jobId: earn.jobId,
    pattern: earn.pattern,
    payload: earn.payload,
    priority: earn.priority,
    returnTo: earn.returnTo,
    lineage: earn.lineage,
    meta: earn.meta,

    // Earn-specific identity
    earn: {
      role: earn.EarnRole,
      pattern: earn.pattern,
      lineage: earn.lineage,
      meta: earn.meta
    }
  };
}


// ============================================================================
//  PUBLIC API — PulseEarnSendSystem
// ============================================================================
export const PulseEarnSendSystem = {

  // --------------------------------------------------------------------------
  //  SEND — entry point for Earn nervous system
  // --------------------------------------------------------------------------
  async send(impulse) {
    // 1. Try Earn v2
    const v2 = tryEarnV2(impulse);

    let earn = null;
    let usedFallback = false;

    if (v2.ok) {
      earn = v2.earn;
    } else {
      // 2. Fallback to Earn v1 (wrapped legacy pulse)
      earn = buildEarnV1(impulse);
      usedFallback = true;
    }

    // 3. Wrap Earn organism for Pulse
    const pulseCompatibleEarn = wrapEarnForPulse(earn);

    // 4. Delegate EVERYTHING to PulseSendSystem
    const result = await PulseSendSystem.send({
      ...impulse,
      payload: {
        ...(impulse.payload || {}),
        earn: pulseCompatibleEarn
      }
    });

    // 5. Return results to EarnBand (if present)
    if (typeof window !== "undefined" && window.EarnBand?.receiveEarnResult) {
      window.EarnBand.receiveEarnResult({
        impulse,
        earn,
        pulseCompatibleEarn,
        result,
        fallback: usedFallback
      });
    }

    return {
      ok: true,
      earn,
      pulseCompatibleEarn,
      result,
      fallback: usedFallback
    };
  }
};
