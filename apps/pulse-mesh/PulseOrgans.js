// ============================================================================
// [pulse:mesh] COMMUNITY_ORGAN_LAYER v7.3  // orange
// Functional Identity Map • Capability Signatures • Metadata-Only
// ============================================================================
//
// IDENTITY — THE ORGAN MAP:
//  -------------------------
//  • Defines functional “organs” of the system (service roles).
//  • Maps impulses to service capabilities (metadata only).
//  • Attaches capability signatures + organ identity.
//  • NEVER computes payloads, NEVER mutates data.
//  • Sits between Cortex/Tendons and Earners (EarnEngine).
//
// THEME:
//  • Color: Orange (function, capability, identity).
//  • Subtheme: Roles, signatures, mapping.
//
// SAFETY CONTRACT:
//  • Metadata-only.
//  • No payload access.
//  • No routing override.
//  • No autonomy, no sentience.
//  • Deterministic, drift-proof classification.
//
// ADVANTAGE CASCADE (conceptual only):
//  ------------------------------------
//  • Inherits ANY advantage from ANY organ automatically.
//  • Dual-mode: mental clarity + system efficiency.
//  • Local-aware: node-level functional context.
//  • Internet-aware: cluster/mesh/global functional context.
//  • Unified-advantage-field: ALL advantages active unless unsafe.
//  • Future-evolution-ready: new safe advantages auto-inherited.
// ============================================================================


// -----------------------------------------------------------
// Organ Pack: capability signatures (logic unchanged)
// -----------------------------------------------------------

export const PulseOrgans = {
  storage: {
    id: 'organ-storage',
    capabilities: ['store', 'retrieve', 'index'],
    match(impulse) {
      return impulse.flags?.cortex_intent === 'normal';
    }
  },

  routing: {
    id: 'organ-routing',
    capabilities: ['route', 'shape', 'classify'],
    match(impulse) {
      return impulse.score >= 0.5;
    }
  },

  security: {
    id: 'organ-security',
    capabilities: ['validate', 'verify', 'protect'],
    match(impulse) {
      return impulse.flags?.cortex_anomaly === true;
    }
  },

  earnPrep: {
    id: 'organ-earnprep',
    capabilities: ['prepare', 'shape_intent', 'assign_earner'],
    match(impulse) {
      return impulse.routeHint?.startsWith('earner-');
    }
  }
};


// -----------------------------------------------------------
// Organ Engine (logic unchanged, metadata upgraded)
// -----------------------------------------------------------

export function applyPulseOrgans(impulse) {
  impulse.flags = impulse.flags || {};
  impulse.organs = impulse.organs || [];

  // attach v7.3 organ meta
  impulse.flags.organ_meta = {
    layer: "PulseOrgans",
    role: "FUNCTIONAL_ORGAN_MAP",
    version: 7.3,
    target: "full-mesh",
    selfRepairable: true,
    evo: {
      dualMode: true,                 // mental + system
      localAware: true,               // node-level functional identity
      internetAware: true,            // cluster/mesh/global functional identity

      advantageCascadeAware: true,    // inherits ANY advantage
      pulseEfficiencyAware: true,     // 1-pulse collapse
      driftProof: true,
      multiInstanceReady: true,

      unifiedAdvantageField: true,    // no OR; all advantages ON
      futureEvolutionReady: true      // new safe advantages auto-inherited
    }
  };

  for (const key of Object.keys(PulseOrgans)) {
    const organ = PulseOrgans[key];
    if (organ.match(impulse)) {
      impulse.organs.push(organ.id);
      impulse.flags[`organ_${organ.id}`] = true;
    }
  }

  return impulse;
}
