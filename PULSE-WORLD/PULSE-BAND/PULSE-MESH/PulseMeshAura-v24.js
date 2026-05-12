// ============================================================================
// FILE: /PULSE-MESH/PulseMeshAura-v24-IMMORTAL-ADVANTAGE.js
// [pulse:mesh] PULSE_MESH_AURA v24-IMMORTAL-ADVANTAGE++
// System-wide Field Layer • Stabilization Loops • Multi-Instance Resonance
// Metadata-only • Zero Compute • Zero Payload Mutation (flags-only)
// Presence-aware • Binary-aware • Advantage-cascade-aware • Drift-proof
// ============================================================================
//
// IDENTITY — THE AURA FIELD (v24-IMMORTAL-ADVANTAGE++):
//  ----------------------------------------------------
//  • Organism-wide field surrounding all pulses and instances.
//  • Provides stabilization loops (loop field).
//  • Provides multi-instance resonance (sync field).
//  • Senses Flow pressure + recent throttles → stabilization hints.
//  • Senses mesh factoring pressure → factoring hints.
//  • Metadata-only: tags, hints, and gentle shaping fields (flags-only).
//  • Advantage-cascade aware: inherits ANY systemic advantage automatically.
//  • Binary-aware + Presence-aware: tags pulses with band + presence origin.
//  • Fully deterministic: same impulse + same AuraState → same aura tags.
//  • Zero randomness, zero timestamps, zero async, zero network, zero FS.
//
// SAFETY CONTRACT (v24):
//  ----------------------
//  • No randomness
//  • No timestamps
//  • No payload mutation (flags-only metadata shaping)
//  • No async
//  • No network, no filesystem, no env access
//  • Fail-open: missing fields → safe defaults
//  • Deterministic: same impulse + same AuraState → same aura tags
//  • Zero imports for logic — external deps only via callers
//  • Presence-aware but presence stays in metadata only
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
// AURA STATE — v24 IMMORTAL ADVANTAGE++
// ============================================================================
const AuraState = {
  // Stabilization
  loopStrength: 0.0,
  loopMaxDepth: 3,

  // Multi-instance resonance
  instanceId: "instance-default",
  clusterId: "cluster-default",
  syncStrength: 0.0,

  // Flow + pressure sensing
  flowPressure: 0.0,
  recentThrottleRate: 0.0,

  // Binary-awareness
  binaryPreference: 0.0,
  binaryMeshReady: true,
  binaryOSReady: true,

  // Presence-awareness
  presenceBand: "symbolic", // symbolic | binary | dual
  presenceTag: "PulseMeshAura-v24",

  // Advantage-awareness
  advantageBias: 0.0, // 0..1: systemic advantage cascade

  meta: {
    layer: "PulseMeshAura",
    role: "AURA_FIELD",
    version: "24-IMMORTAL-ADVANTAGE++",
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
      futureEvolutionReady: true,
      signalFactoringAware: true,
      deterministicField: true,
      zeroCompute: true,
      zeroMutation: true,
      binaryAware: true,
      binaryMeshReady: true,
      binaryOSReady: true,
      pulseMesh11Ready: true,
      presenceAware: true,
      bandAware: true
    }
  }
};

// ============================================================================
// AURA CONTROL — trusted writers only (Flow, Mesh, Presence, Brainstem)
// ============================================================================
export const PulseAuraControl = {
  setLoopStrength(v) { AuraState.loopStrength = clamp01(v); },
  setLoopMaxDepth(d) {
    AuraState.loopMaxDepth = Number.isFinite(d) ? Math.max(0, d) : AuraState.loopMaxDepth;
  },
  setSyncStrength(v) { AuraState.syncStrength = clamp01(v); },
  setInstanceId(id) { if (typeof id === "string" && id) AuraState.instanceId = id; },
  setClusterId(id) { if (typeof id === "string" && id) AuraState.clusterId = id; },
  setFlowPressure(v) { AuraState.flowPressure = clamp01(v); },
  setRecentThrottleRate(v) { AuraState.recentThrottleRate = clamp01(v); },
  setBinaryPreference(v) { AuraState.binaryPreference = clamp01(v); },
  setPresenceBand(b) {
    if (b === "symbolic" || b === "binary" || b === "dual") AuraState.presenceBand = b;
  },
  setPresenceTag(tag) { if (typeof tag === "string" && tag) AuraState.presenceTag = tag; },
  setAdvantageBias(v) { AuraState.advantageBias = clamp01(v); },

  snapshot() {
    return {
      ...AuraState,
      meta: {
        ...AuraState.meta,
        evo: { ...AuraState.meta.evo }
      }
    };
  }
};

// ============================================================================
// AURA PACK — v24 IMMORTAL ADVANTAGE++
// Pure metadata shaping. Flags only. Zero compute.
// ============================================================================
export const PulseAura = {

  // Stabilization sensing
  senseStabilization(impulse) {
    const p = AuraState.flowPressure;
    const t = AuraState.recentThrottleRate;

    impulse.flags = impulse.flags || {};

    if (p > 0.25 || t > 0.1) impulse.flags["aura_system_under_tension"] = true;
    if (p > 0.45 || t > 0.2) impulse.flags["aura_stabilization_needed"] = true;

    return impulse;
  },

  // Loop tagging
  tagLoop(impulse) {
    impulse.flags = impulse.flags || {};

    const drifted =
      impulse.flags?.cortex_anomaly ||
      impulse.flags?.immune_quarantined ||
      impulse.flags?.aura_stabilization_needed ||
      impulse.flags?.skin_boundary_load > 0.7;

    const depth = impulse.flags?.aura_loop_depth || 0;

    if (drifted && AuraState.loopStrength > 0 && depth < AuraState.loopMaxDepth) {
      impulse.flags["aura_in_loop"] = true;
      impulse.flags["aura_loop_depth"] = depth + 1;
    }

    return impulse;
  },

  // Loop hint
  loopHint(impulse) {
    if (impulse.flags?.aura_in_loop) {
      impulse.flags["aura_prefers_stable_routes"] = true;
    }
    return impulse;
  },

  // Sync tagging
  tagSync(impulse) {
    impulse.flags = impulse.flags || {};
    impulse.flags["aura_instance"] = AuraState.instanceId;
    impulse.flags["aura_cluster"] = AuraState.clusterId;
    return impulse;
  },

  // Sync hint
  syncHint(impulse) {
    if (AuraState.syncStrength > 0) {
      impulse.flags = impulse.flags || {};
      impulse.flags["aura_sync_candidate"] = true;
    }
    return impulse;
  },

  // Factoring hint
  factoringHint(impulse) {
    const p = AuraState.flowPressure;
    const t = AuraState.recentThrottleRate;

    if (p <= 0.25 && t <= 0.1) return impulse;

    impulse.flags = impulse.flags || {};
    impulse.flags["aura_prefers_factored_paths"] = true;
    impulse.flags["aura_factoring_bias"] = clamp01((p + t) / 2);

    return impulse;
  },

  // Binary-awareness
  binaryHint(impulse) {
    impulse.flags = impulse.flags || {};

    if (AuraState.binaryPreference > 0 && AuraState.binaryMeshReady) {
      impulse.flags["aura_prefers_binary_mesh"] = true;
      impulse.flags["aura_binary_mesh_bias"] = AuraState.binaryPreference;
    }

    if (AuraState.binaryOSReady) {
      impulse.flags["aura_binary_os_available"] = true;
    }

    return impulse;
  },

  // Presence-awareness
  presenceHint(impulse) {
    impulse.flags = impulse.flags || {};
    impulse.flags["aura_presence_band"] = AuraState.presenceBand;
    impulse.flags["aura_presence_tag"] = AuraState.presenceTag;
    return impulse;
  },

  // Advantage-awareness
  advantageHint(impulse) {
    if (AuraState.advantageBias > 0) {
      impulse.flags = impulse.flags || {};
      impulse.flags["aura_advantage_bias"] = AuraState.advantageBias;
      impulse.flags["aura_advantage_cascade"] = true;
    }
    return impulse;
  }
};

// ============================================================================
// APPLY AURA — v24 IMMORTAL ADVANTAGE++
// ============================================================================
export function applyPulseAura(impulse) {
  impulse.flags = impulse.flags || {};
  impulse.flags.aura_meta = AuraState.meta;

  PulseAura.senseStabilization(impulse);
  PulseAura.tagLoop(impulse);
  PulseAura.loopHint(impulse);
  PulseAura.tagSync(impulse);
  PulseAura.syncHint(impulse);
  PulseAura.factoringHint(impulse);
  PulseAura.binaryHint(impulse);
  PulseAura.presenceHint(impulse);
  PulseAura.advantageHint(impulse);

  impulse.flags["aura_applied"] = true;

  return impulse;
}

// ============================================================================
// INTERNAL — clamp
// ============================================================================
function clamp01(v) {
  if (typeof v !== "number" || Number.isNaN(v)) return 0;
  return Math.max(0, Math.min(1, v));
}
