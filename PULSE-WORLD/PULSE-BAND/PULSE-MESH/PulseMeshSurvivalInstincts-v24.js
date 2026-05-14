// ============================================================================
// FILE: /organs/survival/PulseMeshSurvivalInstincts-v24-Immortal-PLUS.js
// PULSE OS v24-MESH-Immortal-PLUS — SURVIVAL INSTINCTS LAYER  // amber
// “Skin-Level Reflex Arc / Local Survival Gate”
// Deterministic Survival Arc • Fast Instinct Engine • Pure 1/0 Decisions
// Full Advantage Stack: Presence-Aware • Mesh-Aware • Organ-Aware
// Unified-Advantage-Field • IMMORTAL, Coordinator-Free, Metadata-Only
// ============================================================================
//
// IDENTITY (v24-Immortal-PLUS):
// -----------------------------
// • Lowest-level survival organ (skin-level reflex).
// • Pure 1/0 instinct engine — no routing, no shaping, no compute.
// • Drops or keeps impulses instantly based on local state + anomaly flags.
// • Zero payload mutation — metadata-only tags only (no payload writes).
// • Deterministic, drift-proof, AND-architecture aligned.
// • Binary-aware, dual-mode-ready, presence-band-aware, mesh-aware.
// • Organ-aware: tags itself as the survival organ in the mesh organ field.
// • Unified-advantage-field compliant (tags only, no side effects).
// ============================================================================

//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝

// 2 — EXPORT GENOME METADATA
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// -----------------------------------------------------------
// Presence-Band Helper (v24)
// -----------------------------------------------------------
function classifyPresenceBand(impulse) {
  const f = impulse.flags || {};
  if (f.binary_mode && f.dual_mode) return "dual";
  if (f.binary_mode) return "binary";
  if (f.dual_mode) return "dual";
  return "symbolic";
}

// -----------------------------------------------------------
// Instinct Pack (v24-Immortal-PLUS)
// Pure 1/0 decisions, metadata-only
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
  hops(impulse) {
    if ((impulse.hops || 0) > 64) return 0;
    return 1;
  },

  // [pulse:mesh] INSTINCT_TRUST  // teal
  // Drop when node trust is too low.
  trust(impulse, node) {
    if (!node || typeof node.trustLevel !== "number") return 1;
    if (node.trustLevel >= 0.5) return 1;
    return 0;
  },

  // [pulse:mesh] INSTINCT_ANOMALY_FLAG  // magenta
  // Drop when cortex has flagged anomaly.
  anomaly(impulse) {
    if (impulse.flags?.cortex_anomaly) return 0;
    if (impulse.flags?.cortex_factoring_anomaly) return 0;
    if (impulse.flags?.cortex_flow_anomaly) return 0;
    return 1;
  },

  // [pulse:mesh] INSTINCT_EARNER_TARGETING  // purple
  // Drop when earner targeting is clearly wrong.
  earnerTargeting(impulse, node) {
    if (!node || node.kind !== "earner") return 1;
    if (!impulse.routeHint) return 1;
    if (impulse.routeHint === node.id) return 1;
    if (impulse.routeHint === node.kind) return 1;
    return 0;
  },

  // [pulse:mesh] INSTINCT_BINARY_MODE  // cyan
  // v15.1: binary-mode reflex tightening
  binaryMode(impulse) {
    if (!impulse.flags?.binary_mode) return 1;
    // binary mode requires higher structural integrity
    if (impulse.energy <= 0.1) return 0;
    if ((impulse.hops || 0) > 48) return 0;
    return 1;
  },

  // [pulse:mesh] INSTINCT_DUAL_MODE  // blue
  // v15.1: dual-mode reflex softening
  dualMode(impulse) {
    if (!impulse.flags?.dual_mode) return 1;
    // dual mode tolerates slightly higher hop count
    if ((impulse.hops || 0) > 72) return 0;
    return 1;
  }
};

// -----------------------------------------------------------
// Combined Survival Instinct Engine (v24-Immortal-PLUS)
// Presence-band aware, mesh-organ aware, unified-advantage-field aligned
// -----------------------------------------------------------

export function createSurvivalInstincts() {

  const instinctFns = [
    SurvivalInstincts.energy,
    SurvivalInstincts.hops,
    SurvivalInstincts.trust,
    SurvivalInstincts.anomaly,
    SurvivalInstincts.earnerTargeting,
    SurvivalInstincts.binaryMode,
    SurvivalInstincts.dualMode
  ];

  const meta = {
    layer: "SurvivalInstincts",
    role: "SURVIVAL_REFLEX",
    version: "24-MESH-SURVIVAL-Immortal-PLUS",
    target: "full-mesh",
    selfRepairable: true,
    evo: {
      // Awareness
      dualMode: true,
      binaryAware: true,
      symbolicAware: true,
      presenceAware: true,
      bandAware: true,
      meshAware: true,
      localAware: true,
      internetAware: true,

      // Advantage + efficiency
      advantageCascadeAware: true,
      pulseEfficiencyAware: true,
      unifiedAdvantageField: true,

      // Field guarantees
      deterministicField: true,
      driftProof: true,
      multiInstanceReady: true,
      futureEvolutionReady: true,

      // Pressure + factoring
      signalFactoringAware: true,
      meshPressureAware: true,
      auraPressureAware: true,

      // v24+ advantage flags (tags only)
      prewarmAware: true,
      chunkAware: true,
      cacheAware: true,
      presenceAwareAdvantage: true,
      dualBandReady: true,

      // Organ + registry awareness
      organAware: true,
      meshOrgansAware: true,
      organRegistryAware: true,

      // Safety / zero-side-effect guarantees
      zeroCompute: true,
      zeroMutation: true,
      zeroRoutingInfluence: true,
      zeroNetworkFetch: true,
      zeroExternalMutation: true
    },

    contract: {
      always: [
        "skin-level-reflex",
        "pure-1-or-0",
        "metadata-only",
        "unified-advantage-field",
        "deterministic-field"
      ],
      never: [
        "route",
        "shape",
        "compute",
        "async",
        "network",
        "payload-mutation"
      ]
    }
  };

  return function survivalInstinctEngine(impulse, node) {
    // Ensure metadata containers exist
    impulse.meta = impulse.meta || {};
    impulse.flags = impulse.flags || {};
    impulse.organs = impulse.organs || [];

    // Attach survival meta (metadata-only)
    impulse.meta.reflex = meta;

    // Mesh-organ tagging: declare this impulse touched survival organ
    if (!impulse.organs.includes("organ-survival")) {
      impulse.organs.push("organ-survival");
    }
    impulse.flags.organ_organ_survival = true;

    // v24: presence-band tagging (metadata-only)
    const presenceBand = classifyPresenceBand(impulse);
    impulse.flags.survival_presence_band = presenceBand;
    impulse.flags.survival_advantage_meta = {
      prewarm_surface: true,
      chunk_surface: true,
      cache_surface: true,
      presence_band: presenceBand
    };

    // Pure 1/0 instinct chain — unchanged behavior
    for (const fn of instinctFns) {
      const decision = fn(impulse, node);
      if (decision === 0) {
        impulse.flags[`instinct_${fn.name}_drop`] = true;
        impulse.flags.survival_dropped = true;
        return 0;
      }
    }

    impulse.flags.survival_passed = true;
    return 1;
  };
}
