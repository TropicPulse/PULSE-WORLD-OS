// ============================================================================
// [pulse:field] PULSE_OS_ENVIRONMENTAL_FIELD v7.3  // teal
// Internal Weather System • Metadata-Only • Stabilization + Pressure Signals
// ============================================================================
//
// IDENTITY — THE ENVIRONMENTAL FIELD:
//  -----------------------------------
//  • Internal “weather system” of the organism.
//  • Holds global environmental metadata that influences interpretation.
//  • NEVER computes payloads.
//  • NEVER mutates impulses directly.
//  • Provides read-only field values to other organs.
//
// THEME:
//  • Color: Teal (environment, currents, subtle forces).
//  • Subtheme: Pressure, friction, resonance, stability.
//
// SAFETY CONTRACT:
//  • Metadata-only.
//  • No routing control.
//  • No direct hormone/memory writes.
//  • No loops, no sync, no autonomy.
//  • Trusted writers only (PulseEnvironment, admin tools).
//
// ADVANTAGE CASCADE (conceptual only):
//  ------------------------------------
//  • Inherits ANY advantage from ANY organ automatically.
//  • Dual-mode: mental clarity + system efficiency.
//  • Local-aware: node-level environmental influence.
//  • Internet-aware: cluster/mesh environmental influence.
//  • Unified-advantage-field: ALL advantages active unless unsafe.
//  • Future-evolution-ready: new safe advantages auto-inherited.
// ============================================================================


// -----------------------------------------------------------
// INTERNAL FIELD STATE (metadata-only)
// -----------------------------------------------------------

const FieldState = {
  // Global "weather"
  friction: 0,
  noise: 0,
  stability: 1,
  resonance: 0,

  // Pressure + load
  loadWave: 0,
  driftPressure: 0,

  // External influence markers (fed by PulseEnvironment)
  externalHeat: 0,
  externalStorm: 0,
  externalSignal: 0,

  // v7.3 meta
  meta: {
    layer: "PulseField",
    role: "ENVIRONMENTAL_FIELD",
    version: 7.3,
    target: "full-mesh",
    selfRepairable: true,
    evo: {
      dualMode: true,                 // mental + system
      localAware: true,               // node-level environmental influence
      internetAware: true,            // cluster/mesh environmental influence

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
// FIELD UPDATE API (trusted writers only)
// -----------------------------------------------------------

export const PulseFieldControl = {
  setFriction(value) {
    FieldState.friction = clamp01(value);
  },
  setNoise(value) {
    FieldState.noise = clamp01(value);
  },
  setStability(value) {
    FieldState.stability = clamp01(value);
  },
  setResonance(value) {
    FieldState.resonance = clamp01(value);
  },
  setLoadWave(value) {
    FieldState.loadWave = clamp01(value);
  },
  setDriftPressure(value) {
    FieldState.driftPressure = clamp01(value);
  },
  setExternalHeat(value) {
    FieldState.externalHeat = clamp01(value);
  },
  setExternalStorm(value) {
    FieldState.externalStorm = clamp01(value);
  },
  setExternalSignal(value) {
    FieldState.externalSignal = clamp01(value);
  },

  // Bulk update from PulseEnvironment-style object
  applyEnvironmentSnapshot(env = {}) {
    if ("friction" in env) this.setFriction(env.friction);
    if ("noise" in env) this.setNoise(env.noise);
    if ("stability" in env) this.setStability(env.stability);
    if ("resonance" in env) this.setResonance(env.resonance);
    if ("loadWave" in env) this.setLoadWave(env.loadWave);
    if ("driftPressure" in env) this.setDriftPressure(env.driftPressure);
    if ("externalHeat" in env) this.setExternalHeat(env.externalHeat);
    if ("externalStorm" in env) this.setExternalStorm(env.externalStorm);
    if ("externalSignal" in env) this.setExternalSignal(env.externalSignal);
  }
};


// -----------------------------------------------------------
// FIELD READ API (organs + flow can read, never write)
// -----------------------------------------------------------

export const PulseField = {
  snapshot() {
    return { ...FieldState };
  },

  getFriction() {
    return FieldState.friction;
  },
  getNoise() {
    return FieldState.noise;
  },
  getStability() {
    return FieldState.stability;
  },
  getResonance() {
    return FieldState.resonance;
  },
  getLoadWave() {
    return FieldState.loadWave;
  },
  getDriftPressure() {
    return FieldState.driftPressure;
  },
  getExternalHeat() {
    return FieldState.externalHeat;
  },
  getExternalStorm() {
    return FieldState.externalStorm;
  },
  getExternalSignal() {
    return FieldState.externalSignal;
  },

  getMeta() {
    return FieldState.meta;
  }
};


// -----------------------------------------------------------
// Helper
// -----------------------------------------------------------

function clamp01(v) {
  if (typeof v !== "number" || Number.isNaN(v)) return 0;
  return Math.max(0, Math.min(1, v));
}
