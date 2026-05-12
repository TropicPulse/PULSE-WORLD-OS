// ============================================================================
// FILE: PulseMeshCortex-v24-IMMORTAL-ADVANTAGE.js
// [pulse:mesh] COMMUNITY_CORTEX_LAYER v24-IMMORTAL-ADVANTAGE++  // blue
// Strategic Decision Layer • Survival-Pattern Instincts • Metadata-Only
// Presence-Aware • Binary-Aware • Dual-Band • Drift-Proof • Advantage-Aware
// ============================================================================
//
// IDENTITY — THE MESH CORTEX (v24-IMMORTAL-ADVANTAGE++):
// ------------------------------------------------------
// • High-level strategic decision layer for impulses (community cortex).
// • Applies survival-pattern instincts: risk, novelty, cooperation, budgeting.
// • Sets strategic priority + intent, NEVER computes or mutates payloads.
// • Sits above Tendons, below Earners — pure metadata shaping layer.
// • Deterministic-field, unified-advantage-field,
//   factoring-aware, flow-aware, drift-aware, aura-aware,
//   binary-aware, dual-band-ready, presence-aware,
//   multi-instance-ready, chunk/prewarm-ready.
// • Fully deterministic: same impulse + same context → same score + intent.
// • Zero randomness, zero timestamps, zero async, zero network, zero FS.
//
// SAFETY CONTRACT (v24):
// ----------------------
// • No randomness
// • No timestamps
// • No payload mutation (flags + meta only)
// • No async
// • No network, no filesystem, no env access
// • Deterministic: same impulse/context → same strategic score
// • Fail-open: missing context → safe defaults
// • Metadata-only shaping (no routing side-effects by itself)
// ============================================================================

import {
  OrganismIdentity
} from "../PULSE-X/PULSE-WORLD-MAP.js
";

const Identity = OrganismIdentity(import.meta.url);

// ---------------------------------------------------------------------------
// META EXPORTS — v24 IMMORTAL KERNEL
// ---------------------------------------------------------------------------
export const pulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// ============================================================================
// COMMUNITY CORTEX LAYER — v24 IMMORTAL ADVANTAGE++
// ============================================================================
export function createPulseMeshCortex({ context = {}, log, warn, error } = {}) {

  // -------------------------------------------------------------------------
  // IMMORTAL META (attached to every impulse)
// -------------------------------------------------------------------------
  const CORTEX_META = {
    layer: "PulseCortex",
    role: "MESH_STRATEGIC_LAYER",
    version: "24-IMMORTAL-ADVANTAGE++",
    target: "full-mesh",
    selfRepairable: true,
    evo: {
      dualMode: true,
      binaryAware: true,
      symbolicAware: true,
      localAware: true,
      internetAware: true,
      advantageCascadeAware: true,
      pulseEfficiencyAware: true,
      driftProof: true,
      multiInstanceReady: true,
      unifiedAdvantageField: true,
      deterministicField: true,
      signalFactoringAware: true,
      flowAware: true,
      driftAware: true,
      presenceAware: true,
      bandAware: true,
      zeroCompute: true,
      zeroMutation: true
    }
  };

  // -------------------------------------------------------------------------
  // INSTINCT PACK — v24 IMMORTAL ADVANTAGE++
// -------------------------------------------------------------------------
  const PulseCortex = {

    // Risk instinct: penalize high cost + high threat.
    risk(impulse, ctx = {}) {
      const base = impulse.score ?? 0.5;
      const cost = ctx.estimatedCost ?? 0.0;
      const threat = ctx.threatLevel ?? 0.0;
      const penalty = (cost * 0.3) + (threat * 0.7);
      return clamp01(base - penalty);
    },

    // Novelty instinct: boost low-frequency impulses.
    novelty(impulse, ctx = {}) {
      const base = impulse.score ?? 0.5;
      const seen = ctx.frequency ?? 0.0;
      const boost = (1 - seen) * 0.3;
      return clamp01(base + boost);
    },

    // Cooperation instinct: reward wide impact radius.
    cooperation(impulse, ctx = {}) {
      const base = impulse.score ?? 0.5;
      const reach = ctx.impactRadius ?? 0.0;
      return clamp01(base + reach * 0.25);
    },

    // Resource budget instinct: respect load, flow, throttle, factoring.
    resourceBudget(impulse, ctx = {}) {
      const base = impulse.score ?? 0.5;
      const load = ctx.globalLoad ?? 0.0;
      const flowPressure = ctx.flowPressure ?? 0.0;
      const throttle = ctx.recentThrottleRate ?? 0.0;
      const factoringBias = impulse.flags?.aura_factoring_bias ?? 0.0;

      let penalty = 0;
      if (load >= 0.5)        penalty += (load - 0.5) * 0.4;
      if (flowPressure > 0.3) penalty += flowPressure * 0.4;
      if (throttle > 0.0)     penalty += throttle * 0.5;
      if (factoringBias > 0)  penalty += factoringBias * 0.4;

      return clamp01(base - penalty);
    },

    // Binary awareness: small bias toward binary when requested.
    binaryAwareness(impulse, ctx = {}) {
      const base = impulse.score ?? 0.5;
      const bias = ctx.binaryBias ?? 0.0;
      if (bias <= 0) return base;
      return clamp01(base + bias * 0.15);
    },

    // Presence awareness: slight preference for binary/dual band.
    presenceAwareness(impulse) {
      const base = impulse.score ?? 0.5;
      const band = impulse.band ?? "symbolic";
      if (band === "binary") return clamp01(base + 0.05);
      if (band === "dual")   return clamp01(base + 0.03);
      return base;
    },

    // Advantage awareness: cascade systemic advantage into score.
    advantageAwareness(impulse, ctx = {}) {
      const base = impulse.score ?? 0.5;
      const advantage = ctx.advantageBias ?? 0.0;
      if (advantage <= 0) return base;
      return clamp01(base + advantage * 0.1);
    },

    // Anomaly tagging: flags-only, no score mutation.
    anomaly(impulse, ctx = {}) {
      const weird = ctx.anomalyScore ?? 0.0;

      impulse.flags = impulse.flags || {};

      if (weird >= 0.8) impulse.flags.cortex_anomaly = true;
      if (impulse.flags.flow_throttled) impulse.flags.cortex_flow_anomaly = true;
      if (impulse.flags.aura_prefers_factored_paths)
        impulse.flags.cortex_factoring_anomaly = true;

      return impulse;
    }
  };

  // -------------------------------------------------------------------------
  // CORTEX ENGINE — v24 IMMORTAL ADVANTAGE++
// -------------------------------------------------------------------------
  function applyPulseCortex(impulse, ctx = {}) {
    impulse.meta = impulse.meta || {};
    impulse.meta.cortex = CORTEX_META;

    let score = impulse.score ?? 0.5;

    // Deterministic instinct pipeline (fixed order)
    score = PulseCortex.risk({ ...impulse, score }, ctx);
    score = PulseCortex.novelty({ ...impulse, score }, ctx);
    score = PulseCortex.cooperation({ ...impulse, score }, ctx);
    score = PulseCortex.resourceBudget({ ...impulse, score }, ctx);
    score = PulseCortex.binaryAwareness({ ...impulse, score }, ctx);
    score = PulseCortex.presenceAwareness({ ...impulse, score }, ctx);
    score = PulseCortex.advantageAwareness({ ...impulse, score }, ctx);

    impulse.score = score;

    // Flags-only anomaly tagging
    PulseCortex.anomaly(impulse, ctx);

    impulse.flags = impulse.flags || {};
    impulse.flags.cortex_intent = classifyIntent(score, ctx, impulse);

    return impulse;
  }

  // -------------------------------------------------------------------------
  // HELPERS
  // -------------------------------------------------------------------------
  function clamp01(v) {
    return Math.max(0, Math.min(1, v));
  }

  function classifyIntent(score, ctx, impulse) {
    const load = ctx.globalLoad ?? 0.0;
    const flowPressure = ctx.flowPressure ?? 0.0;
    const throttle = ctx.recentThrottleRate ?? 0.0;
    const factoringBias = impulse.flags?.aura_factoring_bias ?? 0.0;

    const environmentHot =
      flowPressure > 0.5 ||
      throttle > 0.2 ||
      load > 0.8 ||
      factoringBias > 0.5;

    if (score >= 0.85 && !environmentHot) return "push_hard";
    if (score >= 0.5)                     return "normal";
    if (score < 0.3)                      return "defer_or_drop";
    return "cautious";
  }

  // -------------------------------------------------------------------------
  // CONTEXT ATTACHMENT — IMMORTAL
  // -------------------------------------------------------------------------
  context.applyPulseCortex = applyPulseCortex;

  // -------------------------------------------------------------------------
  // PUBLIC API
  // -------------------------------------------------------------------------
  return {
    apply: applyPulseCortex,
    instincts: PulseCortex,
    meta: CORTEX_META
  };
}
