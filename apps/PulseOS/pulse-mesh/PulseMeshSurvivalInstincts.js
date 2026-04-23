// ============================================================================
//  PULSE OS v10.4 — SURVIVAL INSTINCTS LAYER  // amber
//  “Skin-Level Reflex Arc / Local Survival Gate”
//  Deterministic Survival Arc • Fast Instinct Engine • Pure 1/0 Decisions
// ============================================================================
//
//  IDENTITY (v10.4):
//  -----------------
//  • Lowest-level survival organ (skin-level reflex).
//  • Pure 1/0 instinct engine — no compute, no routing, no shaping.
//  • Drops or keeps impulses instantly based on local state + anomaly flags.
//  • Zero payload mutation — metadata-only.
//  • Deterministic, drift-proof, AND-architecture aligned.
//  • Pulse-agnostic: works with Pulse v1/v2/v3.
//  • No pressure gating, no internet-mode logic, no factoring pressure.
// ============================================================================


// -----------------------------------------------------------
//  Instinct Pack (v10.4)
// -----------------------------------------------------------

export const SurvivalInstincts = {

  // [pulse:mesh] INSTINCT_ENERGY  // amber
  // Drop when impulse is out of energy.
  energy(impulse) {
    if (typeof impulse.energy !== "number") return 1;
    if (impulse.energy <= 0.05) return 0;
    return 1;
  },

  // [pulse:mesh] INSTINCT_HOPS  // amber
  // Drop when hop count is too high (runaway prevention).
  // (Optional in v10.4, kept for safety if hops are tracked.)
  hops(impulse) {
    if ((impulse.hops || 0) > 64) return 0;
    return 1;
  },

  // [pulse:mesh] INSTINCT_TRUST  // teal
  // Drop when node trust is too low (if trust metadata exists).
  trust(impulse, node) {
    if (!node || typeof node.trustLevel !== "number") return 1;
    if (node.trustLevel >= 0.5) return 1;
    return 0;
  },

  // [pulse:mesh] INSTINCT_ANOMALY_FLAG  // magenta
  // Drop when cortex has already flagged anomaly.
  anomaly(impulse) {
    if (impulse.flags?.cortex_anomaly) return 0;
    if (impulse.flags?.cortex_factoring_anomaly) return 0;
    return 1;
  },

  // [pulse:mesh] INSTINCT_EARNER_TARGETING  // purple
  // Drop when earner targeting is clearly wrong (if node is an earner).
  earnerTargeting(impulse, node) {
    if (!node || node.kind !== "earner") return 1;
    if (!impulse.routeHint) return 1;
    if (impulse.routeHint === node.id) return 1;
    if (impulse.routeHint === node.kind) return 1;
    return 0;
  }
};


// -----------------------------------------------------------
//  Combined Survival Instinct Engine (v10.4)
// -----------------------------------------------------------

export function createSurvivalInstincts() {

  const instinctFns = [
    SurvivalInstincts.energy,
    SurvivalInstincts.hops,
    SurvivalInstincts.trust,
    SurvivalInstincts.anomaly,
    SurvivalInstincts.earnerTargeting
  ];

  const meta = {
    layer: "SurvivalInstincts",
    role: "SURVIVAL_REFLEX",
    version: "10.4",
    target: "full-mesh",
    selfRepairable: true,
    evo: {
      dualMode: true,
      localAware: true,
      internetAware: true,
      advantageCascadeAware: true,
      pulseEfficiencyAware: true,
      driftProof: true,
      multiInstanceReady: true,
      unifiedAdvantageField: true,
      deterministicField: true,
      futureEvolutionReady: true,
      signalFactoringAware: true
    }
  };

  return function survivalInstinctEngine(impulse, node) {
    impulse.meta = impulse.meta || {};
    impulse.meta.reflex = meta;
    impulse.flags = impulse.flags || {};

    for (const fn of instinctFns) {
      const decision = fn(impulse, node);
      if (decision === 0) {
        impulse.flags[`instinct_${fn.name}_drop`] = true;
        return 0;
      }
    }

    return 1;
  };
}
