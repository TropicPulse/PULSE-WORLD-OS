// ============================================================================
// [pulse:mesh] COMMUNITY_AURA_LAYER v7.3  // violet
// System-wide Field Layer • Stabilization Loops • Multi-Instance Resonance
// Metadata-only • Zero Compute • Zero Payload Mutation
// ============================================================================
//
// IDENTITY — THE AURA FIELD:
//  --------------------------
//  • The organism-wide field surrounding all pulses and instances.
//  • Provides stabilization loops (loop field).
//  • Provides multi-instance resonance (sync field).
//  • Never computes payloads, never mutates data content.
//  • Metadata-only: tags, hints, and gentle shaping fields.
//  • Advantage-cascade aware: inherits any systemic speed/efficiency gain.
//
// ROLE IN THE MESH ORGANISM:
//  ---------------------------
//  • Reflex Arc → 1/0 survival decisions
//  • Aura Field → stabilization + resonance
//  • Cortex → strategic shaping
//  • Tendons → routing hints
//  • Immune → anomaly flags
//  • Mesh Spine → distributed conduction
//
// SAFETY CONTRACT:
//  ----------------
//  • No randomness
//  • No timestamps
//  • No payload mutation
//  • No async
//  • Fail-open: missing fields → safe defaults
//  • Deterministic: same impulse → same aura tags
//
// ADVANTAGE CASCADE (conceptual only):
//  ------------------------------------
//  • If pulses become faster → aura tagging conceptually accelerates.
//  • If system collapses 1000 pulses into 1 → aura inherits that gain.
//  • If any organ evolves → aura field aligns with that advantage.
//  • No OR — all advantages are inherited automatically.
//  • Any future evolutionary advantage is included unless it would break safety.
// ============================================================================

// -----------------------------------------------------------
// Aura State (global, metadata-only)
// -----------------------------------------------------------

const AuraState = {
  // loop field: controlled stabilization loops
  loopStrength: 0.0,      // 0–1: stabilization pull
  loopMaxDepth: 3,        // max loop-tag depth

  // sync field: multi-instance resonance
  instanceId: "instance-1",
  clusterId: "cluster-default",
  syncStrength: 0.0,      // 0–1: resonance strength

  meta: {
    layer: "PulseAura",
    role: "AURA_FIELD",
    version: 7.3,
    target: "full-mesh",
    selfRepairable: true,
    evo: {
      // AND-architecture advantage flags
      dualMode: true,                 // mental + system
      localAware: true,               // node-level field awareness
      internetAware: true,            // cluster/mesh/internet field awareness

      advantageCascadeAware: true,    // inherits ANY advantage in the organism
      pulseEfficiencyAware: true,     // 1-pulse collapse, batching, compression
      driftProof: true,               // no drift, deterministic tagging
      multiInstanceReady: true,       // multiple instances, shared field

      unifiedAdvantageField: true,    // no OR; all advantages are active
      futureEvolutionReady: true      // any new safe advantage is conceptually inherited
    }
  }
};

// -----------------------------------------------------------
// Aura Pack: loop + sync behaviors (metadata-only)
// -----------------------------------------------------------

export const PulseAura = {
  // [pulse:mesh] AURA_LOOP_TAG  // violet
  // - tag impulse as part of a stabilization loop if it looks drifted
  tagLoop(impulse) {
    impulse.flags = impulse.flags || {};

    const drifted =
      impulse.flags?.cortex_anomaly ||
      impulse.flags?.immune_quarantined ||
      impulse.flags?.skin_boundary_load > 0.7;

    const currentDepth = impulse.flags?.aura_loop_depth || 0;

    if (
      drifted &&
      AuraState.loopStrength > 0 &&
      currentDepth < AuraState.loopMaxDepth
    ) {
      impulse.flags["aura_in_loop"] = true;
      impulse.flags["aura_loop_depth"] = currentDepth + 1;
    }

    return impulse;
  },

  // [pulse:mesh] AURA_LOOP_HINT  // violet
  // - provide a gentle hint that this impulse prefers stabilizing routes
  loopHint(impulse) {
    if (!impulse.flags?.aura_in_loop) return impulse;

    impulse.flags["aura_prefers_stable_routes"] = true;
    return impulse;
  },

  // [pulse:mesh] AURA_SYNC_TAG  // violet
  // - tag impulse with instance + cluster identity
  tagSync(impulse) {
    impulse.flags = impulse.flags || {};

    impulse.flags["aura_instance"] = AuraState.instanceId;
    impulse.flags["aura_cluster"] = AuraState.clusterId;

    return impulse;
  },

  // [pulse:mesh] AURA_SYNC_HINT  // violet
  // - gentle hint that this impulse should be considered for cross-instance comparison
  syncHint(impulse) {
    if (AuraState.syncStrength <= 0) return impulse;

    impulse.flags = impulse.flags || {};
    impulse.flags["aura_sync_candidate"] = true;

    return impulse;
  }
};

// -----------------------------------------------------------
// Aura Engine
// -----------------------------------------------------------

export function applyPulseAura(impulse) {
  // attach aura meta every time (field identity + evo flags)
  impulse.flags = impulse.flags || {};
  impulse.flags.aura_meta = AuraState.meta;

  // apply loop + sync fields (metadata only)
  PulseAura.tagLoop(impulse);
  PulseAura.loopHint(impulse);
  PulseAura.tagSync(impulse);
  PulseAura.syncHint(impulse);

  impulse.flags["aura_applied"] = true;

  return impulse;
}
