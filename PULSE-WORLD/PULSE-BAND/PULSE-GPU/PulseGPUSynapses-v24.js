// ============================================================================
// FILE: tropic-pulse-functions/PULSE-WORLD/PULSE-GPU/PulseGPUEventEmitter-v24.js
//  PULSE GPU EVENT EMITTER v24-Immortal++ — THE SYNAPSE LAYER 24++
//  Deterministic, Fail‑Open, Zero‑Side‑Effects Signal Relay • CoreMemory‑Aware
//  Dual-Band • Prewarm-Aware • Cache-Aware • NervousSystem-Linked • CI-Aware
// ============================================================================
//
// IDENTITY — THE SYNAPSE LAYER (v24-Immortal++):
//  ---------------------------------------------
//  • Electrical junctions of the GPU organism.
//  • Pure deterministic relay between GPU subsystems.
//  • Spine-aware: tuned for Orchestrator v24+
//  • Dual-band-aware: binary + symbolic pathways (metadata only).
//  • Chunking-aware, prewarm-aware, cache-aware, NervousSystem-linked.
//  • ComputerIntelligence-aware (Earn mesh, metadata only).
//  • CoreMemory-aware: can mirror synapse topology (metadata only, no IO here).
//  • No randomness, no async, no timestamps, no GPU calls.
//  • Fail‑open: a bad handler never breaks the relay.
//  • PulseSend‑v24‑ready: impulses routable by compute router.
//  • Earn‑v24‑GPU‑ready.
// ============================================================================

/*
AI_EXPERIENCE_META = {
  identity: "PulseGPUSynapse",
  version: "v24-Immortal++",
  layer: "gpu_runtime",
  role: "gpu_synapse",
  lineage: "PulseGPU-v24-Immortal++",

  evo: {
    gpuSynapse: true,
    gpuSignalJunction: true,
    gpuFanout: true,

    gpuCompute: true,
    deterministic: true,
    driftProof: true,
    pureCompute: true,

    zeroNetwork: true,
    zeroFilesystem: true,
    zeroMutationOfInput: true,

    // Awareness
    symbolicAware: true,
    binaryAware: true,
    dualBandAware: true,
    gpuDispatchAware: true,
    gpuMemoryAware: true,
    gpuAdvantageAware: true,
    presenceAware: true,
    dnaAware: true,
    versionAware: true,
    instanceAware: true,

    // Mesh linkage
    brainLinked: true,
    cognitionLinked: true,
    wisdomLinked: true,
    geneticMemoryLinked: true,
    nervousSystemLinked: true,
    healerLinked: true,

    // Immortal + Earn
    immortalReady: true,
    immortalSurface: true,
    earnAware: true,
    earnCompatibility: "Earn-v24-GPU",

    // Contracts
    routingContract: "PulseSend-v24",
    gpuOrganContract: "PulseGPU-v24-Immortal++",
    binaryGpuOrganContract: "PulseBinaryGPU-v24-Immortal++",
    workgroupLawVersion: 24,

    // CoreMemory
    coreMemoryAware: true,
    coreMemoryContract: "PulseCoreMemory-v24-Immortal++"
  },

  contract: {
    always: [
      "PulseGPUNervousSystem",
      "PulseGPUSpine",
      "PulseGPUGeneticMemory",
      "PulseGPUHealer"
    ],
    never: [
      "safeRoute",
      "fetchViaCNS",
      "legacyGPUSynapse"
    ]
  }
}
*/

const PULSE_GPU_EVENT_EMITTER_META_V24 = {
  layer: "PulseGPUEventEmitter",
  version: "24.0-Immortal++",
  target: "full-gpu+binary+spine",
  description:
    "Synaptic signal relay for GPU subsystem communication — v24-Immortal++ dual-band, prewarm, cache-aware.",

  selfRepairable: true,
  unifiedAdvantageField: true,
  pulseSend24Ready: true,
  pulseSend16Ready: true,

  evo: {
    // deterministic nervous system traits (24++ boosted)
    metabolicBoost: 1.25,
    neuralReflexBoost: 1.35,
    stabilityBoost: 1.4,

    multiInstanceReady: true,
    deterministicNeuron: true,
    parallelSafe: true,
    fanOutScaling: 1.3,
    clusterCoherence: true,
    zeroDriftCloning: true,
    reflexPropagation: 1.35,

    // v24 spine + dual-band + chunking + prewarm
    gpuSpineReady: true,
    dualBandReady: true,
    chunkingReady: true,
    prewarmReady: true,
    cacheAware: true,
    prewarmAware: true,
    organismClusterBoost: 1.3,
    cognitiveComputeLink: true,
    nervousSystemLinked: true,
    geneticMemoryLinked: true,

    // awareness flags (metadata only)
    binaryAware: true,
    symbolicAware: true,
    gpuDispatchAware: true,
    gpuMemoryAware: true,
    gpuAdvantageAware: true,
    cognitiveFrameAware: true,
    computerIntelligenceAware: true,
    presenceAware: true,
    dnaAware: true,
    versionAware: true,
    instanceAware: true,

    // Contracts (conceptual only)
    routingContract: "PulseSend-v24",
    gpuOrganContract: "PulseGPU-v24-Immortal++",
    binaryGpuOrganContract: "PulseBinaryGPU-v24-Immortal++",
    earnCompatibility: "Earn-v24-GPU",

    // Legacy compatibility
    legacyRoutingContract: "PulseSend-v16",
    legacyGPUOrganContract: "PulseGPU-v16-Immortal",
    legacyBinaryGPUOrganContract: "PulseBinaryGPU-v16-Immortal",
    legacyEarnCompatibility: "Earn-v4-Presence"
  }
};

// Small helpers (pure, deterministic)
function safeString(v, fallback = "") {
  return typeof v === "string" ? v : fallback;
}

function safeObject(v) {
  return v && typeof v === "object" ? v : null;
}

function normalizeSignalName(name) {
  return safeString(name, "unknown-signal");
}

// Optional: lightweight, in-memory, deterministic stats (no time, no randomness)
function createEmptyStats() {
  return {
    emitCount: 0,
    lastPayloadShape: null,
    listenerCount: 0,
    binaryHintCount: 0,
    symbolicHintCount: 0
  };
}

class PulseGPUEventEmitter {
  constructor(logger) {
    this.listeners = {};
    this.meta = { ...PULSE_GPU_EVENT_EMITTER_META_V24 };
    this.logger = typeof logger === "function" ? logger : null;

    // v24++: deterministic in-memory stats per signal
    this.signalStats = new Map();

    if (this.logger) {
      this.logger(
        "synapse",
        "PulseGPUEventEmitter v24-Immortal++ — synaptic junction layer active (spine-ready, dual-band, prewarm+cache-aware, CI-aware)."
      );
    }
  }

  // ------------------------------------------------------------------------
  // INTERNAL: ensure stats bucket
  // ------------------------------------------------------------------------
  ensureStats(signalName) {
    const key = normalizeSignalName(signalName);
    let stats = this.signalStats.get(key);
    if (!stats) {
      stats = createEmptyStats();
      this.signalStats.set(key, stats);
    }
    return stats;
  }

  // ------------------------------------------------------------------------
  // REGISTER — A neuron connects to this synapse
  // ------------------------------------------------------------------------
  on(signalName, handler) {
    const name = normalizeSignalName(signalName);
    if (!name || typeof handler !== "function") return;

    if (!this.listeners[name]) {
      this.listeners[name] = [];
    }

    this.listeners[name].push(handler);

    const stats = this.ensureStats(name);
    stats.listenerCount = this.listeners[name].length;
  }

  // ------------------------------------------------------------------------
  // DISCONNECT — A neuron detaches from this synapse
  // ------------------------------------------------------------------------
  off(signalName, handler) {
    const name = normalizeSignalName(signalName);
    if (!this.listeners[name]) return;

    if (!handler) {
      this.listeners[name] = [];
    } else {
      this.listeners[name] = this.listeners[name].filter((h) => h !== handler);
    }

    const stats = this.ensureStats(name);
    stats.listenerCount = this.listeners[name].length;
  }

  // ------------------------------------------------------------------------
  // EMIT — An electrical impulse jumps across the junction
  //   payload MAY include:
  //     • cognitiveFrame
  //     • computerIntelligence
  //     • gpuDispatchHints / gpuContext
  //     • prewarmHint / cacheHint (metadata only)
//   Returns: { delivered: number, listeners: number, meta }
  // ------------------------------------------------------------------------
  emit(signalName, payload) {
    const name = normalizeSignalName(signalName);
    const handlers = this.listeners[name];
    if (!handlers || handlers.length === 0) {
      return {
        delivered: 0,
        listeners: 0,
        meta: { ...this.meta, signalName: name, status: "no-listeners" }
      };
    }

    const safePayload = safeObject(payload) || payload;

    const stats = this.ensureStats(name);
    stats.emitCount += 1;

    // track dual-band hints if present (metadata only)
    const ctx = safeObject(safePayload && safePayload.gpuContext) || {};
    if (ctx.binaryModeObserved === true) stats.binaryHintCount += 1;
    if (ctx.symbolicModeObserved === true) stats.symbolicHintCount += 1;

    // record last payload shape (keys only, no values)
    if (safeObject(safePayload)) {
      stats.lastPayloadShape = Object.keys(safePayload).sort();
    } else {
      stats.lastPayloadShape = null;
    }

    let delivered = 0;

    // Deterministic ordering: handlers invoked in registration order
    for (let i = 0; i < handlers.length; i++) {
      const handler = handlers[i];
      try {
        handler(safePayload);
        delivered += 1;
      } catch {
        // fail‑open: synapse never breaks
      }
    }

    return {
      delivered,
      listeners: handlers.length,
      meta: {
        ...this.meta,
        signalName: name,
        status: "delivered",
        emitCount: stats.emitCount,
        listenerCount: stats.listenerCount,
        binaryHintCount: stats.binaryHintCount,
        symbolicHintCount: stats.symbolicHintCount
      }
    };
  }

  // ------------------------------------------------------------------------
  // PREWARM — Pre-create listener buckets for hot signals
  //   Also pre-creates stats buckets (v24++ prewarm-aware).
  // ------------------------------------------------------------------------
  prewarm(signalNames) {
    if (!Array.isArray(signalNames)) return;

    for (let i = 0; i < signalNames.length; i++) {
      const name = normalizeSignalName(signalNames[i]);
      if (!name) continue;
      if (!this.listeners[name]) {
        this.listeners[name] = [];
      }
      this.ensureStats(name);
    }
  }

  // ------------------------------------------------------------------------
  // INTROSPECTION — Read-only stats for a signal (no side effects)
  // ------------------------------------------------------------------------
  getSignalStats(signalName) {
    const name = normalizeSignalName(signalName);
    const stats = this.signalStats.get(name);
    if (!stats) {
      return {
        signalName: name,
        emitCount: 0,
        listenerCount: 0,
        binaryHintCount: 0,
        symbolicHintCount: 0,
        lastPayloadShape: null,
        meta: { ...this.meta }
      };
    }

    return {
      signalName: name,
      emitCount: stats.emitCount,
      listenerCount: stats.listenerCount,
      binaryHintCount: stats.binaryHintCount,
      symbolicHintCount: stats.symbolicHintCount,
      lastPayloadShape: stats.lastPayloadShape
        ? stats.lastPayloadShape.slice()
        : null,
      meta: { ...this.meta }
    };
  }

  // ------------------------------------------------------------------------
  // CLEAR — The junction resets
  // ------------------------------------------------------------------------
  clearAll() {
    this.listeners = {};
    this.signalStats.clear();
  }
}

// ============================================================================
//  EXPORTS
// ============================================================================
export { PulseGPUEventEmitter, PULSE_GPU_EVENT_EMITTER_META_V24 };
