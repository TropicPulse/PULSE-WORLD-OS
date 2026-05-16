// ============================================================================
// FILE: PULSE-WORLD-OS/PULSE-MULTIVERSE/PULSEWORLD/PULSE-GPU/PulseGPUEventEmitter-v30-IMMORTAL-INTEL-OMEGA.js
//  PULSE GPU EVENT EMITTER v30-IMMORTAL-INTEL-OMEGA — THE SYNAPSE LAYER 30++
//  Deterministic, Fail‑Open, Zero‑Side‑Effects Signal Relay • CoreMemory‑Aware
//  Dual-Band • Prewarm-Aware • Cache-Aware • NervousSystem-Linked • CI-Aware
//  GPU-Mode Aware • Binary-Indexed • Evolution-Surface-Aware • INTEL Dual-Hash
// ============================================================================
//
// IDENTITY — THE SYNAPSE LAYER (v30-IMMORTAL-INTEL-OMEGA):
//  -------------------------------------------------------
//  • Electrical junctions of the GPU organism.
//  • Pure deterministic relay between GPU subsystems.
//  • Spine-aware: tuned for Orchestrator v24+ / v30+.
//  • Dual-band-aware: binary + symbolic pathways (metadata only).
//  • Chunking-aware, prewarm-aware, cache-aware, NervousSystem-linked.
//  • ComputerIntelligence-aware (Earn mesh, metadata only).
//  • CoreMemory-aware: can mirror synapse topology (metadata only, no IO here).
//  • GPU-mode-aware: idle / warmup / active / burst / recovery (metadata only).
//  • Binary-indexed: per-signal binary + wave index surfaces (metadata only).
//  • Evolution-surface-aware: can mirror GPU evolution surfaces (metadata only).
//  • No randomness, no async, no timestamps, no GPU calls.
//  • Fail‑open: a bad handler never breaks the relay.
//  • PulseSend‑v24/v30‑ready: impulses routable by compute router.
//  • Earn‑v24/v30‑GPU‑ready.
// ============================================================================
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝


// ============================================================================
// INTEL HASH HELPERS — v30 IMMORTAL-INTEL-OMEGA
// ============================================================================

function computeHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `h${h}`;
}

function computeHashIntelligence(payload) {
  const base = JSON.stringify(payload || "");
  let h = 0;
  for (let i = 0; i < base.length; i++) {
    const c = base.charCodeAt(i);
    h = (h * 131 + c * (i + 7)) % 1000000007;
  }
  return `HINTEL_${h}`;
}

function buildDualHashSignature(label, intelPayload, classicString) {
  const intelBase = {
    label,
    intel: intelPayload || {},
    classic: classicString || ""
  };
  const intelHash = computeHashIntelligence(intelBase);
  const classicHash = computeHash(`${label}::${classicString || ""}`);
  return {
    intel: intelHash,
    classic: classicHash
  };
}

// ============================================================================
// META — PULSE GPU EVENT EMITTER v30-IMMORTAL-INTEL-OMEGA
// ============================================================================

const PULSE_GPU_EVENT_EMITTER_META_V30 = {
  layer: "PulseGPUEventEmitter",
  role: "GPU_SYNapse_LAYER",
  version: "v30-IMMORTAL-INTEL-OMEGA",
  deterministic: true,
  failOpen: true,
  dualBandAware: true,
  prewarmAware: true,
  cacheAware: true,
  nervousSystemLinked: true,
  computerIntelligenceAware: true,
  coreMemoryAware: true,
  gpuModeAware: true,
  binaryIndexed: true,
  evolutionSurfaceAware: true
};

// ============================================================================
// Small helpers (pure, deterministic)
// ============================================================================

function safeString(v, fallback = "") {
  return typeof v === "string" ? v : fallback;
}

function safeObject(v) {
  return v && typeof v === "object" ? v : null;
}

function normalizeSignalName(name) {
  return safeString(name, "unknown-signal");
}

function clamp01(v) {
  const n = typeof v === "number" ? v : Number(v);
  if (!Number.isFinite(n)) return 0;
  if (n < 0) return 0;
  if (n > 1) return 1;
  return n;
}

// ============================================================================
// GPU MODE / BINARY INDEX SURFACES — per-signal, metadata-only
// ============================================================================

function normalizeGpuMode(mode) {
  const m = String(mode || "idle").toLowerCase();
  if (m === "warmup") return "warmup";
  if (m === "active") return "active";
  if (m === "burst") return "burst";
  if (m === "recovery") return "recovery";
  return "idle";
}

function buildSignalBinaryIndex(signalName, payloadShape, gpuContext, cycleIndex) {
  const shapeLen = Array.isArray(payloadShape) ? payloadShape.length : 0;
  const gpuMode = normalizeGpuMode(gpuContext && gpuContext.mode);
  const binaryModeObserved = gpuContext && gpuContext.binaryModeObserved === true;
  const symbolicModeObserved = gpuContext && gpuContext.symbolicModeObserved === true;

  const surface =
    String(signalName || "unknown").length +
    shapeLen * 3 +
    (binaryModeObserved ? 7 : 0) +
    (symbolicModeObserved ? 5 : 0) +
    cycleIndex;

  const binaryIndex = {
    signalName: signalName || "unknown",
    shapeLen,
    gpuMode,
    binaryModeObserved: !!binaryModeObserved,
    symbolicModeObserved: !!symbolicModeObserved,
    cycleIndex,
    surface,
    parity: surface % 2 === 0 ? 0 : 1,
    density: shapeLen + (binaryModeObserved ? 1 : 0) + (symbolicModeObserved ? 1 : 0)
  };

  const sig = buildDualHashSignature(
    "PULSE_GPU_SIGNAL_BINARY_INDEX_V30",
    binaryIndex,
    `SIGBIN::${signalName || "unknown"}::surf:${surface}::mode:${gpuMode}`
  );

  return {
    binaryIndex,
    binaryIndexSignatureIntel: sig.intel,
    binaryIndexSignatureClassic: sig.classic
  };
}

function buildSignalWaveIndex(signalName, payloadShape, gpuContext, cycleIndex) {
  const shapeLen = Array.isArray(payloadShape) ? payloadShape.length : 0;
  const gpuMode = normalizeGpuMode(gpuContext && gpuContext.mode);

  const amplitude = shapeLen + (gpuContext && gpuContext.loadFactor ? gpuContext.loadFactor : 0);
  const wavelength = (gpuContext && gpuContext.waveSpan) || (cycleIndex || 1);
  const phase = (amplitude + wavelength + cycleIndex) % 32;

  const waveIndex = {
    signalName: signalName || "unknown",
    gpuMode,
    amplitude,
    wavelength,
    phase,
    cycleIndex
  };

  const sig = buildDualHashSignature(
    "PULSE_GPU_SIGNAL_WAVE_INDEX_V30",
    waveIndex,
    `SIGWAVE::${signalName || "unknown"}::amp:${amplitude}::wl:${wavelength}::mode:${gpuMode}`
  );

  return {
    waveIndex,
    waveIndexSignatureIntel: sig.intel,
    waveIndexSignatureClassic: sig.classic
  };
}

// ============================================================================
// Optional: lightweight, in-memory, deterministic stats (no time, no randomness)
// ============================================================================

function createEmptyStats() {
  return {
    emitCount: 0,
    lastPayloadShape: null,
    listenerCount: 0,
    binaryHintCount: 0,
    symbolicHintCount: 0,

    // v30++ GPU / binary index surfaces
    lastGpuMode: "idle",
    lastBinaryIndex: null,
    lastWaveIndex: null,
    lastBinaryIndexSignatureIntel: null,
    lastBinaryIndexSignatureClassic: null,
    lastWaveIndexSignatureIntel: null,
    lastWaveIndexSignatureClassic: null
  };
}

// ============================================================================
// CLASS — PulseGPUEventEmitter v30 IMMORTAL-INTEL-OMEGA
// ============================================================================

class PulseGPUEventEmitter {
  constructor(logger) {
    this.listeners = {};
    this.meta = { ...PULSE_GPU_EVENT_EMITTER_META_V30 };
    this.logger = typeof logger === "function" ? logger : null;

    // v30++: deterministic in-memory stats per signal
    this.signalStats = new Map();

    // v30++: global cycle index for binary/wave indexing
    this.cycleIndex = 0;

    if (this.logger) {
      this.logger(
        "synapse",
        "PulseGPUEventEmitter v30-IMMORTAL-INTEL-OMEGA — synaptic junction layer active (dual-band, gpu-mode, binary-indexed, evolution-surface-aware)."
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

    this.cycleIndex += 1;

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

    // v30++: build per-signal binary + wave index surfaces (metadata only)
    const { binaryIndex, binaryIndexSignatureIntel, binaryIndexSignatureClassic } =
      buildSignalBinaryIndex(name, stats.lastPayloadShape, ctx, this.cycleIndex);

    const { waveIndex, waveIndexSignatureIntel, waveIndexSignatureClassic } =
      buildSignalWaveIndex(name, stats.lastPayloadShape, ctx, this.cycleIndex);

    stats.lastGpuMode = normalizeGpuMode(ctx.mode);
    stats.lastBinaryIndex = binaryIndex;
    stats.lastWaveIndex = waveIndex;
    stats.lastBinaryIndexSignatureIntel = binaryIndexSignatureIntel;
    stats.lastBinaryIndexSignatureClassic = binaryIndexSignatureClassic;
    stats.lastWaveIndexSignatureIntel = waveIndexSignatureIntel;
    stats.lastWaveIndexSignatureClassic = waveIndexSignatureClassic;

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

    const gpuMode = stats.lastGpuMode;

    const emitIntelPayload = {
      kind: "pulseGpuSignalEmit",
      version: "v30-IMMORTAL-INTEL-OMEGA",
      signalName: name,
      cycleIndex: this.cycleIndex,
      delivered,
      listeners: handlers.length,
      gpuMode,
      binaryHintCount: stats.binaryHintCount,
      symbolicHintCount: stats.symbolicHintCount,
      binaryIndex,
      waveIndex
    };

    const emitClassicString =
      `EMIT::${name}` +
      `::CYCLE:${this.cycleIndex}` +
      `::DELIV:${delivered}` +
      `::LIST:${handlers.length}` +
      `::MODE:${gpuMode}`;

    const emitSig = buildDualHashSignature(
      "PULSE_GPU_SIGNAL_EMIT_V30",
      emitIntelPayload,
      emitClassicString
    );

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
        symbolicHintCount: stats.symbolicHintCount,
        gpuMode,
        binaryIndex,
        waveIndex,
        emitSignatureIntel: emitSig.intel,
        emitSignatureClassic: emitSig.classic
      }
    };
  }

  // ------------------------------------------------------------------------
  // PREWARM — Pre-create listener buckets for hot signals
  //   Also pre-creates stats buckets (v30++ prewarm-aware).
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
        lastGpuMode: "idle",
        lastBinaryIndex: null,
        lastWaveIndex: null,
        lastBinaryIndexSignatureIntel: null,
        lastBinaryIndexSignatureClassic: null,
        lastWaveIndexSignatureIntel: null,
        lastWaveIndexSignatureClassic: null,
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
      lastGpuMode: stats.lastGpuMode,
      lastBinaryIndex: stats.lastBinaryIndex,
      lastWaveIndex: stats.lastWaveIndex,
      lastBinaryIndexSignatureIntel: stats.lastBinaryIndexSignatureIntel,
      lastBinaryIndexSignatureClassic: stats.lastBinaryIndexSignatureClassic,
      lastWaveIndexSignatureIntel: stats.lastWaveIndexSignatureIntel,
      lastWaveIndexSignatureClassic: stats.lastWaveIndexSignatureClassic,
      meta: { ...this.meta }
    };
  }

  // ------------------------------------------------------------------------
  // CLEAR — The junction resets
  // ------------------------------------------------------------------------
  clearAll() {
    this.listeners = {};
    this.signalStats.clear();
    this.cycleIndex = 0;
  }
}

// ============================================================================
//  EXPORTS
// ============================================================================
export { PulseGPUEventEmitter, PULSE_GPU_EVENT_EMITTER_META_V30 };
