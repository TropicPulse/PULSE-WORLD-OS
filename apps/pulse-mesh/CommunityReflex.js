// ============================================================================
// [pulse:mesh] COMMUNITY_REFLEX_LAYER v7.3  // amber
// Distributed Survival Arc • Fast Local Instinct Engine • Pure 1/0 Decisions
// ============================================================================
//
// IDENTITY — THE REFLEX ARC:
//  --------------------------
//  • The fastest organ in the mesh organism.
//  • Executes survival-pattern routing at sub‑cognitive speed.
//  • Never touches payloads — only impulse metadata.
//  • Cheap, local, deterministic, drift‑proof.
//  • Advantage‑cascade aware: inherits any systemic speed/efficiency gain.
//
// ROLE IN THE MESH ORGANISM:
//  ---------------------------
//  • Reflex Arc → 1/0 instinctive routing
//  • Cortex → strategic shaping
//  • Tendons → miner/earner targeting hints
//  • Immune Layer → anomaly flags
//  • Mesh Spine → distributed conduction
//
// SAFETY CONTRACT:
//  ----------------
//  • No randomness
//  • No timestamps
//  • No payload mutation
//  • No async
//  • Fail‑open: missing fields → safe defaults
//  • Deterministic: same impulse → same reflex result
//
// ADVANTAGE CASCADE (conceptual only):
//  ------------------------------------
//  • If pulses become faster → reflex evaluation conceptually accelerates.
//  • If system collapses 1000 pulses into 1 → reflex inherits that gain.
//  • If any organ evolves → reflex arc routes with that advantage.
//  • No OR — all advantages are inherited automatically.
//  • Any future evolutionary advantage is included unless it would break safety.
// ============================================================================

// -----------------------------------------------------------
// Reflex Pack: instinct rules (logic unchanged)
// -----------------------------------------------------------

export const CommunityReflex = {
  // [pulse:mesh] REFLEX_OVERLOAD  // red
  overload(impulse, node) {
    if (node.load && node.load > 0.85) return 0;
    return 1;
  },

  // [pulse:mesh] REFLEX_ENERGY  // amber
  energy(impulse) {
    if (impulse.energy <= 0.05) return 0;
    return 1;
  },

  // [pulse:mesh] REFLEX_HOPS  // amber
  hops(impulse) {
    if ((impulse.hops || 0) > 32) return 0;
    return 1;
  },

  // [pulse:mesh] REFLEX_TRUST_PATH  // teal
  trust(impulse, node) {
    if (!node.trustLevel) return 1;
    if (node.trustLevel >= 0.5) return 1;
    return 0;
  },

  // [pulse:mesh] REFLEX_PRIORITY  // purple
  priority(impulse) {
    if (impulse.score >= 0.8) return 1;
    return 1;
  },

  // [pulse:mesh] REFLEX_EARNER_TARGETING  // purple
  earnerTargeting(impulse, node) {
    if (node.kind !== "earner") return 1;
    if (!impulse.routeHint) return 1;
    if (impulse.routeHint === node.id) return 1;
    if (impulse.routeHint === node.kind) return 1;
    return 0;
  },

  // [pulse:mesh] REFLEX_ANOMALY_FLAG  // magenta
  anomaly(impulse) {
    if (impulse.flags?.cortex_anomaly) return 1;
    return 1;
  }
};

// -----------------------------------------------------------
// Combined Reflex Engine (logic unchanged, metadata upgraded)
// -----------------------------------------------------------

export function createCommunityReflex() {
  const reflexFns = [
    CommunityReflex.overload,
    CommunityReflex.energy,
    CommunityReflex.hops,
    CommunityReflex.trust,
    CommunityReflex.priority,
    CommunityReflex.earnerTargeting,
    CommunityReflex.anomaly
  ];

  const meta = {
    layer: "CommunityReflex",
    role: "MESH_REFLEX_ARC",
    version: 7.3,
    target: "full-mesh",
    selfRepairable: true,
    evo: {
      dualMode: true,                 // mental + system
      localAware: true,               // node-level conditions
      internetAware: true,            // cluster/mesh conditions

      advantageCascadeAware: true,    // inherits ANY advantage
      pulseEfficiencyAware: true,     // 1-pulse collapse, batching
      driftProof: true,
      multiInstanceReady: true,

      unifiedAdvantageField: true,    // no OR; all advantages active
      futureEvolutionReady: true      // future safe advantages auto-inherited
    }
  };

  return function communityReflex(impulse, node) {
    impulse.meta = impulse.meta || {};
    impulse.meta.reflex = meta;

    for (const fn of reflexFns) {
      const decision = fn(impulse, node);
      if (decision === 0) {
        impulse.flags = impulse.flags || {};
        impulse.flags[`reflex_${fn.name}_drop`] = true;
        return 0;
      }
    }
    return 1;
  };
}
