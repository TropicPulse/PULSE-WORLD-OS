// ============================================================================
// [pulse:mesh] COMMUNITY_HORMONE_LAYER v7.3  // pink
// Global Modulation Layer • Metadata-Only • System-Wide Influence
// ============================================================================
//
// IDENTITY — THE HORMONE FIELD:
//  -----------------------------
//  • Global modulation signals that influence impulse metadata.
//  • Boosts, dampens, stabilizes, or cools routing behavior.
//  • NEVER computes payloads, NEVER mutates data content.
//  • Metadata-only global context for Reflex, Cortex, Tendons, Organs.
//
// THEME:
//  • Color: Pink (modulation, global tone, systemic influence).
//  • Subtheme: Boost, dampen, urgency, cooling, stability.
//
// SAFETY CONTRACT:
//  • Metadata-only.
//  • No payload access.
//  • No routing override.
//  • No autonomy, no sentience.
//  • No mutation outside metadata.
//
// ADVANTAGE CASCADE (conceptual only):
//  ------------------------------------
//  • Inherits ANY advantage from ANY organ automatically.
//  • Dual-mode: mental clarity + system efficiency.
//  • Local-aware: node-level modulation.
//  • Internet-aware: cluster/mesh/global modulation.
//  • Unified-advantage-field: ALL advantages active unless unsafe.
//  • Future-evolution-ready: new safe advantages auto-inherited.
// ============================================================================


// -----------------------------------------------------------
// Hormone State (global, metadata-only)
// -----------------------------------------------------------

const HormoneState = {
  boost: 0.0,
  dampen: 0.0,
  urgency: 0.0,
  cooling: 0.0,
  stability: 0.0,
  loadSignal: 0.0,

  meta: {
    layer: "PulseHormones",
    role: "GLOBAL_MODULATION",
    version: 7.3,
    target: "full-mesh",
    selfRepairable: true,
    evo: {
      dualMode: true,                 // mental + system
      localAware: true,               // node-level modulation
      internetAware: true,            // cluster/mesh/global modulation

      advantageCascadeAware: true,    // inherits ANY advantage
      pulseEfficiencyAware: true,     // 1-pulse collapse
      driftProof: true,
      multiInstanceReady: true,

      unifiedAdvantageField: true,    // no OR; all advantages ON
      futureEvolutionReady: true      // new safe advantages auto-inherited
    }
  }
};


// -----------------------------------------------------------
// Hormone Pack: modulation rules (logic unchanged)
// -----------------------------------------------------------

export const PulseHormones = {
  applyBoost(impulse) {
    if (HormoneState.boost > 0) {
      impulse.score = clamp01(impulse.score + HormoneState.boost * 0.2);
    }
  },

  applyDampen(impulse) {
    if (HormoneState.dampen > 0) {
      impulse.score = clamp01(impulse.score - HormoneState.dampen * 0.2);
    }
  },

  applyUrgency(impulse) {
    if (HormoneState.urgency > 0) {
      impulse.energy *= (1 + HormoneState.urgency * 0.1);
    }
  },

  applyCooling(impulse) {
    if (HormoneState.cooling > 0) {
      impulse.energy *= (1 - HormoneState.cooling * 0.1);
    }
  },

  applyStability(impulse) {
    if (HormoneState.stability > 0) {
      impulse.flags = impulse.flags || {};
      impulse.flags.hormone_stabilized = true;
    }
  },

  applyLoadSignal(impulse) {
    impulse.flags = impulse.flags || {};
    impulse.flags.hormone_load = HormoneState.loadSignal;
  }
};


// -----------------------------------------------------------
// Hormone Engine (logic unchanged, metadata upgraded)
// -----------------------------------------------------------

export function applyPulseHormones(impulse) {
  impulse.flags = impulse.flags || {};
  impulse.flags.hormone_meta = HormoneState.meta;

  PulseHormones.applyBoost(impulse);
  PulseHormones.applyDampen(impulse);
  PulseHormones.applyUrgency(impulse);
  PulseHormones.applyCooling(impulse);
  PulseHormones.applyStability(impulse);
  PulseHormones.applyLoadSignal(impulse);

  impulse.flags.hormones_applied = true;

  return impulse;
}


// -----------------------------------------------------------
// Helpers
// -----------------------------------------------------------

function clamp01(v) {
  return Math.max(0, Math.min(1, v));
}
