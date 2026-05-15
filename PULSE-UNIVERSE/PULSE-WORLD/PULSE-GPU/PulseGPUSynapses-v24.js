// ============================================================================
// FILE: tropic-pulse-functions/PULSE-UNIVERSE/PULSE-GPU/PulseGPUEventEmitter-v24.js
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
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝

const PULSE_GPU_EVENT_EMITTER_META_V24 = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
// export const PULSE_EARN_IMMUNE_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

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
