// ============================================================================
// [pulse:mesh] COMMUNITY_CORTEX_LAYER v7.3  // blue
// Strategic Decision Layer • Survival-Pattern Instincts • Metadata-Only
// ============================================================================
//
// IDENTITY — THE MESH CORTEX:
//  ---------------------------
//  • High-level decision layer for impulses.
//  • Applies survival-pattern instincts: risk, novelty, cooperation, budgeting.
//  • Sets strategic priority + intent, NEVER computes payloads.
//  • Sits above Tendons, below Earners (EarnEngine).
//
// DUAL-MODE ADVANTAGE (conceptual only):
//  --------------------------------------
//  • mental-mode: pattern clarity, instinct sharpening
//  • system-mode: faster evaluation, cheaper scoring
//  • unified-mode: both advantages ALWAYS active (AND-architecture)
//
// LOCAL + INTERNET ADVANTAGE (conceptual only):
//  ---------------------------------------------
//  • local: node-level context, load, trust, anomaly
//  • internet: cluster-wide resonance, cross-instance patterns
//  • unified: cortex inherits BOTH (no OR)
//
// ADVANTAGE CASCADE (conceptual only):
//  ------------------------------------
//  • If ANY layer evolves → cortex inherits the advantage
//  • If pulses collapse 1000→1 → cortex inherits the gain
//  • If runtime accelerates → cortex accelerates
//  • If aura stabilizes → cortex stabilizes
//  • If reflex sharpens → cortex sharpens
//
// SAFETY CONTRACT:
//  ----------------
//  • No randomness
//  • No timestamps
//  • No payload mutation
//  • No async
//  • Deterministic: same impulse → same strategic score
//  • Fail-open: missing context → safe defaults
// ============================================================================


// -----------------------------------------------------------
// Cortex Instinct Pack (logic unchanged, metadata upgraded)
// -----------------------------------------------------------

export const PulseCortex = {
  // [pulse:mesh] CORTEX_RISK  // red
  risk(impulse, context = {}) {
    const base = impulse.score || 0.5;
    const cost = context.estimatedCost || 0.0;
    const threat = context.threatLevel || 0.0;

    const penalty = (cost * 0.3) + (threat * 0.7);
    return clamp01(base - penalty);
  },

  // [pulse:mesh] CORTEX_NOVELTY  // purple
  novelty(impulse, context = {}) {
    const base = impulse.score || 0.5;
    const seen = context.frequency || 0.0;

    const boost = (1 - seen) * 0.3;
    return clamp01(base + boost);
  },

  // [pulse:mesh] CORTEX_COOPERATION  // teal
  cooperation(impulse, context = {}) {
    const base = impulse.score || 0.5;
    const reach = context.impactRadius || 0.0;

    const boost = reach * 0.25;
    return clamp01(base + boost);
  },

  // [pulse:mesh] CORTEX_RESOURCE_BUDGET  // amber
  resourceBudget(impulse, context = {}) {
    const base = impulse.score || 0.5;
    const load = context.globalLoad || 0.0;

    if (load < 0.5) return base;
    const penalty = (load - 0.5) * 0.4;
    return clamp01(base - penalty);
  },

  // [pulse:mesh] CORTEX_ANOMALY  // magenta
  anomaly(impulse, context = {}) {
    const weird = context.anomalyScore || 0.0;
    if (weird >= 0.8) {
      impulse.flags = impulse.flags || {};
      impulse.flags["cortex_anomaly"] = true;
    }
    return impulse;
  }
};


// -----------------------------------------------------------
// Cortex Engine (logic unchanged, metadata upgraded)
// -----------------------------------------------------------

export function applyPulseCortex(impulse, context = {}) {
  // attach v7.3 meta
  impulse.meta = impulse.meta || {};
  impulse.meta.cortex = {
    layer: "PulseCortex",
    role: "MESH_STRATEGIC_LAYER",
    version: 7.3,
    target: "full-mesh",
    selfRepairable: true,
    evo: {
      dualMode: true,                 // mental + system
      localAware: true,               // node-level context
      internetAware: true,            // cluster-level context
      advantageCascadeAware: true,    // inherits ANY advantage
      pulseEfficiencyAware: true,     // 1-pulse collapse
      driftProof: true,
      multiInstanceReady: true
    }
  };

  // strategic scoring pipeline
  let score = impulse.score ?? 0.5;

  score = PulseCortex.risk({ ...impulse, score }, context);
  score = PulseCortex.novelty({ ...impulse, score }, context);
  score = PulseCortex.cooperation({ ...impulse, score }, context);
  score = PulseCortex.resourceBudget({ ...impulse, score }, context);

  impulse.score = score;

  // anomaly tagging
  PulseCortex.anomaly(impulse, context);

  // strategic intent
  impulse.flags = impulse.flags || {};
  impulse.flags["cortex_intent"] = classifyIntent(score, context);

  return impulse;
}


// -----------------------------------------------------------
// Helpers
// -----------------------------------------------------------

function clamp01(v) {
  return Math.max(0, Math.min(1, v));
}

function classifyIntent(score, context) {
  const load = context.globalLoad || 0.0;

  if (score >= 0.85 && load < 0.7) return "push_hard";
  if (score >= 0.5) return "normal";
  if (score < 0.3) return "defer_or_drop";
  return "cautious";
}
