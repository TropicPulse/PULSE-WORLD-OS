// ============================================================================
// [pulse:mesh] COMMUNITY_TENDON_LAYER v7.3  // green
// Connective Tissue • Intent Shaping • Earner Targeting • Metadata-Only
// ============================================================================
//
// IDENTITY — THE TENDONS:
//  -----------------------
//  • Translates mesh-level routing signals into earner-ready intent.
//  • Attaches action hints, earner class, and execution context.
//  • NEVER computes payloads, NEVER mutates data.
//  • Pure connective tissue between Spine (PulseMesh) and Earners (EarnEngine).
//
// THEME:
//  • Color: Green (connection, translation, intent).
//  • Subtheme: Routing hints, shaping, classification.
//
// SAFETY CONTRACT:
//  • Metadata-only.
//  • No payload access.
//  • No routing override.
//  • No autonomy, no sentience.
//  • Deterministic, drift-proof shaping.
//
// ADVANTAGE CASCADE (conceptual only):
//  ------------------------------------
//  • Inherits ANY advantage from ANY organ automatically.
//  • Dual-mode: mental clarity + system efficiency.
//  • Local-aware: node-level intent context.
//  • Internet-aware: cluster/mesh/global intent context.
//  • Unified-advantage-field: ALL advantages active unless unsafe.
//  • Future-evolution-ready: new safe advantages auto-inherited.
// ============================================================================


// -----------------------------------------------------------
// Tendon Pack: shaping impulse intent (logic unchanged)
// -----------------------------------------------------------

export const Tendons = {
  classify(impulse) {
    const score = impulse.score || 0;

    if (score >= 0.85) return 'heavy';
    if (score >= 0.45) return 'medium';
    return 'light';
  },

  routeHint(impulse) {
    const cls = Tendons.classify(impulse);

    switch (cls) {
      case 'heavy':
        impulse.routeHint = 'earner-heavy';
        break;
      case 'medium':
        impulse.routeHint = 'earner-medium';
        break;
      default:
        impulse.routeHint = 'earner-light';
    }

    return impulse;
  },

  shapeEnergy(impulse) {
    const cls = Tendons.classify(impulse);

    if (cls === 'heavy') impulse.energy *= 1.1;
    if (cls === 'light') impulse.energy *= 0.9;

    return impulse;
  },

  tag(impulse) {
    impulse.flags = impulse.flags || {};
    impulse.flags[`tendon_class_${Tendons.classify(impulse)}`] = true;
    return impulse;
  }
};


// -----------------------------------------------------------
// Tendon Engine (logic unchanged, metadata upgraded)
// -----------------------------------------------------------

export function applyTendons(impulse) {
  impulse.flags = impulse.flags || {};

  // attach v7.3 tendon meta
  impulse.flags.tendon_meta = {
    layer: "PulseTendons",
    role: "INTENT_TRANSLATION",
    version: 7.3,
    target: "full-mesh",
    selfRepairable: true,
    evo: {
      dualMode: true,                 // mental + system
      localAware: true,               // node-level intent shaping
      internetAware: true,            // cluster/mesh/global intent shaping

      advantageCascadeAware: true,    // inherits ANY advantage
      pulseEfficiencyAware: true,     // 1-pulse collapse
      driftProof: true,
      multiInstanceReady: true,

      unifiedAdvantageField: true,    // no OR; all advantages ON
      futureEvolutionReady: true      // new safe advantages auto-inherited
    }
  };

  Tendons.routeHint(impulse);
  Tendons.shapeEnergy(impulse);
  Tendons.tag(impulse);

  return impulse;
}
