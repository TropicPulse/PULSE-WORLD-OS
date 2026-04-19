// PATH: /apps/pulse-gpu/PulseGPUEventEmitter.js
// ============================================================================
//  PULSE GPU EVENT EMITTER v7.3 — THE SYNAPSE LAYER
//  Deterministic, Fail‑Open, Zero‑Side‑Effects Signal Relay
// ============================================================================
//
// IDENTITY — THE SYNAPSE LAYER:
//  -----------------------------
//  • The electrical junctions of the GPU organism.
//  • Where impulses jump between subsystems.
//  • Ordered, calm, deterministic — no chaos, no randomness.
//  • The layer that lets the organism communicate internally.
//  • Dual‑mode evolved: biological + system‑level advantage active together.
//
// ROLE IN THE GPU BODY:
//  ----------------------
//  • Brainstem → emits autonomic signals
//  • Runtime (Nerve Network) → emits memory impulses
//  • Advisor (Cortex) → emits insight pulses
//  • Healer (Immune System) → emits repair signals
//  • UXBridge (Skin/Nerves) → emits user‑facing impulses
//
// WHAT THIS FILE IS:
//  -------------------
//  • A deterministic synaptic relay
//  • A pure logic communication tissue
//  • A fail‑open signal distributor
//
// WHAT THIS FILE IS NOT:
//  -----------------------
//  • NOT a renderer
//  • NOT a GPU interface
//  • NOT async
//  • NOT DOM‑aware
//  • NOT consciousness
//  • NOT cortex
//
// SAFETY CONTRACT:
//  ----------------
//  • No randomness
//  • No timestamps
//  • No async
//  • No DOM
//  • No GPU calls
//  • Fail‑open: no handler may break the relay
//  • Deterministic: same impulses → same order → same results
//
// DUAL‑MODE ADVANTAGE (conceptual only):
//  --------------------------------------
//  • Biological / mental:
//      - metabolicBoost: conceptual signal efficiency
//      - neuralReflexBoost: conceptual impulse speed
//      - stabilityBoost: conceptual calm under load
//  • System / physical:
//      - multiInstanceReady: safe to run many emitters in parallel
//      - deterministicNeuron: same inputs → same outputs
//      - parallelSafe: conceptual multi‑synapse scaling
//      - fanOutScaling: conceptual throughput scaling
//      - clusterCoherence: conceptual sync across emitters
//      - zeroDriftCloning: conceptual no‑drift replication
//  • Fusion (AND‑architecture):
//      - dualModeEvolution: mental + physical evolution together
//      - organismClusterBoost: conceptual boost when many emitters run
//      - cognitiveComputeLink: conceptual link to Brain + Runtime
//      - unifiedAdvantageField: no OR, both layers always on
// ============================================================================

const PULSE_GPU_EVENT_EMITTER_META = {
  layer: "PulseGPUEventEmitter",
  version: 7.3,
  target: "full-gpu",
  evo: {
    metabolicBoost: 1.0,
    neuralReflexBoost: 1.0,
    stabilityBoost: 1.0,

    multiInstanceReady: true,
    deterministicNeuron: true,
    parallelSafe: true,
    fanOutScaling: 1.0,
    clusterCoherence: true,
    zeroDriftCloning: true,
    reflexPropagation: 1.0,

    dualModeEvolution: true,
    organismClusterBoost: 1.0,
    cognitiveComputeLink: true,
    unifiedAdvantageField: true
  }
};

class PulseGPUEventEmitter {
  constructor() {
    this.listeners = {};
    this.meta = { ...PULSE_GPU_EVENT_EMITTER_META };

    console.log(
      "%c[Synapse] Online — electrical junction layer active (dual‑mode evolution).",
      "color:#9C27B0; font-weight:bold;"
    );
  }

  // ------------------------------------------------------------------------
  // REGISTER — A neuron connects to this synapse
  // ------------------------------------------------------------------------
  on(signalName, handler) {
    if (!signalName || typeof handler !== "function") return;

    if (!this.listeners[signalName]) {
      this.listeners[signalName] = [];
    }

    this.listeners[signalName].push(handler);
  }

  // ------------------------------------------------------------------------
  // DISCONNECT — A neuron detaches from this synapse
  // ------------------------------------------------------------------------
  off(signalName, handler) {
    if (!this.listeners[signalName]) return;

    if (!handler) {
      this.listeners[signalName] = [];
      return;
    }

    this.listeners[signalName] = this.listeners[signalName].filter(
      (h) => h !== handler
    );
  }

  // ------------------------------------------------------------------------
  // EMIT — An electrical impulse jumps across the junction
  // ------------------------------------------------------------------------
  emit(signalName, payload) {
    const handlers = this.listeners[signalName];
    if (!handlers || handlers.length === 0) return;

    handlers.forEach((handler) => {
      try {
        handler(payload);
      } catch {
        // fail‑open: synapse never breaks from a bad neuron
      }
    });
  }

  // ------------------------------------------------------------------------
  // CLEAR — The junction resets
  // ------------------------------------------------------------------------
  clearAll() {
    this.listeners = {};
  }
}

// ============================================================================
//  EXPORTS
// ============================================================================
export { PulseGPUEventEmitter };
