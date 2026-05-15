// ============================================================================
//  aiLoggerAdapter-v30-IMMORTAL-CORE++.js — Pulse OS v30.0-IMMORTAL-CORE++
//  Binary Logger Membrane • Shadow Forensics • Artery v5 • Mesh-Aware
//  PURE MEMBRANE. ZERO INTERPRETATION. ZERO RANDOMNESS. DELTA‑AWARE, CI‑AWARE.
//  v30+ UPGRADE: Self-contained meta, mesh-aware routing, global artery registry,
//  signal-aware tracing, multi-instance harmony, zero dangling identifiers.
// ============================================================================

// ============================================================================
//  GLOBAL HANDLE (v30 IMMORTAL, environment-agnostic)
// ============================================================================

const G =
  (typeof window !== "undefined" && window) ||
  (typeof globalThis !== "undefined" && globalThis) ||
  (typeof self !== "undefined" && self) ||
  (typeof global !== "undefined" && global) ||
  {};

const g = G;

// ============================================================================
//  UNIVERSAL TIMESTAMP (Shadow or Admin)
// ============================================================================

const Timestamp =
  (G.firebaseAdmin &&
    G.firebaseAdmin.firestore &&
    G.firebaseAdmin.firestore.Timestamp) ||
  G.Timestamp ||
  null;

// ============================================================================
//  UNIVERSAL ADMIN (Shadow or Admin)
// ============================================================================

const admin =
  (G.firebaseAdmin && G.firebaseAdmin) ||
  G.admin ||
  null;

// ============================================================================
//  UNIVERSAL DB (Shadow DB ALWAYS wins)
// ============================================================================

const db =
  (G.db && G.db) ||
  (admin && admin.firestore && admin.firestore()) ||
  null;

// ============================================================================
//  UNIVERSAL LOGGING FALLBACKS
// ============================================================================

const dblog =
  (G.log && G.log) ||
  console.log;

const dberror =
  (G.error && G.error) ||
  console.error;

const fetchFn =
  (G.fetchfn && typeof G.fetchfn === "function" && G.fetchfn) ||
  (G.fetch && typeof G.fetch === "function" && G.fetch) ||
  null;

// ============================================================================
//  IMMORTAL v30 META — SELF-CONTAINED, NO DANGLING IDENTIFIERS
// ============================================================================

export const LoggerAdapterMeta = Object.freeze({
  type: "Organ",
  subsystem: "aiLoggerAdapter",
  layer: "B2-LoggerMembrane",
  version: "30-Immortal-Core++",
  identity: "aiLoggerAdapter-v30-Immortal-Core++",

  evo: Object.freeze({
    deterministic: true,
    driftProof: true,
    egoFree: true,
    adaptive: true,
    harmonic: true,

    dualband: true,
    dualbandSafe: true,
    binaryPrimary: true,
    symbolicAware: true,

    meshAware: true,
    arteryAware: true,
    windowAware: true,
    packetAware: true,
    ciAware: true,
    deltaAware: true,

    multiInstanceReady: true,
    readOnlyMembrane: true,
    zeroMutation: false, // internal counters only, no payload mutation
    epoch: "30-Immortal-Core++"
  }),

  contract: Object.freeze({
    purpose:
      "Membrane for binary logging into ProofLogger-like sinks with CI/delta tagging and artery metrics, without interpreting payloads.",
    never: Object.freeze([
      "mutate binary payloads",
      "interpret semantic content",
      "inject randomness",
      "log sensitive payloads directly without membrane",
      "break identity safety",
      "throw on logger overload when avoidable"
    ]),
    always: Object.freeze([
      "stay deterministic",
      "stay identity-safe",
      "stay binary-only",
      "stay window-safe",
      "emit artery snapshots",
      "tag CI/delta context when available",
      "remain mesh-aware but non-invasive"
    ])
  }),

  mesh: Object.freeze({
    role: "logger-membrane",
    band: "dual",
    tier: "organism-core",
    supportsMeshRouting: true
  }),

  boundaryReflex() {
    return "Logger membrane must remain deterministic, identity-safe, and non-interpreting — never mutate or decode payloads.";
  }
});

// Backwards-compatible identity constant
export const LOGGER_ADAPTER_IDENTITY = LoggerAdapterMeta.identity;

// Minimal experience/meta placeholders for dual-mode exports
export const AI_EXPERIENCE_META = Object.freeze({
  experience: "PulseOS-Immortal-Core++",
  version: "30",
  band: "dual"
});

export const EXPORT_META = Object.freeze({
  module: "aiLoggerAdapter-v30",
  kind: "organ",
  identity: LoggerAdapterMeta.identity,
  version: LoggerAdapterMeta.version
});

// Optional surface/pulse role placeholders (non-erroring)
export const pulseRole = "organism-core";
export const surfaceMeta = Object.freeze({
  layer: LoggerAdapterMeta.layer,
  subsystem: LoggerAdapterMeta.subsystem
});
export const pulseLoreContext = Object.freeze({
  lineage: "PulseOS-Immortal",
  organ: LoggerAdapterMeta.identity
});

// ============================================================================
//  SIGNAL-AWARE TRACE LAYER — v30
// ============================================================================

function traceLoggerEvent(event, payload, traceFlag) {
  if (!traceFlag) return;

  const message = `[aiLoggerAdapter-v30] ${event}`;

  const s = g.PulseProofSignal;
  if (s && typeof s.signal === "function") {
    s.signal({
      level: "info",
      subsystem: "logger-adapter",
      message,
      extra: payload || {},
      system: pulseRole,
      organ: LoggerAdapterMeta.identity,
      layer: surfaceMeta.layer,
      band: "dual"
    });
    return;
  }

  dblog(message, payload);
}

// ============================================================================
//  GLOBAL ARTERY REGISTRY (READ-ONLY, METRICS-ONLY) — v30
// ============================================================================
//
//  Registry key: `${id}#${instanceIndex}`
//  Value: latest logger artery snapshot for that instance.
//
const _globalLoggerArteryRegistry = new Map();

function _registryKey(id, instanceIndex) {
  return `${id || LoggerAdapterMeta.identity}#${instanceIndex}`;
}

export function getGlobalLoggerArteries() {
  const out = {};
  for (const [k, v] of _globalLoggerArteryRegistry.entries()) {
    out[k] = v;
  }
  return out;
}

// ============================================================================
//  PACKET EMITTER — deterministic, logger-scoped
// ============================================================================

function emitLoggerPacket(type, payload, { severity = "info" } = {}) {
  const now = Date.now();
  return Object.freeze({
    meta: LoggerAdapterMeta,
    exportMeta: EXPORT_META,
    packetType: `logger-${type}`,
    packetId: `logger-${type}-${now}`,
    timestamp: now,
    epoch: LoggerAdapterMeta.evo.epoch,
    severity,
    ...payload
  });
}

// ============================================================================
//  PREWARM — v30 IMMORTAL membrane + artery + CI warmup
// ============================================================================

export function prewarmLoggerAdapter(
  dualBand = null,
  {
    trace = false,
    computeSurface = null,
    computeDeltaPacket = null
  } = {}
) {
  const binaryPressure =
    dualBand?.binary?.metabolic?.pressure ??
    dualBand?.binary?.routing?.pressure ??
    0;

  const binaryLoad =
    dualBand?.binary?.metabolic?.load ??
    dualBand?.binary?.routing?.load ??
    0;

  const evolutionMode =
    dualBand?.symbolic?.evolution?.mode ||
    dualBand?.symbolic?.persona?.evolutionMode ||
    "passive";

  const meshTier =
    dualBand?.mesh?.tier || LoggerAdapterMeta.mesh.tier;

  const packet = emitLoggerPacket("prewarm", {
    message: "Logger adapter v30 prewarmed and membrane artery v5 aligned.",
    binaryPressure,
    binaryLoad,
    evolutionMode,
    meshTier,
    computeSurface: computeSurface || null,
    computeDeltaPacket: computeDeltaPacket || null
  });

  traceLoggerEvent("prewarm", packet, trace);
  return packet;
}

// ============================================================================
//  ORGAN IMPLEMENTATION — v30-IMMORTAL-CORE++
// ============================================================================

export class AIBinaryLoggerAdapter {
  constructor(config = {}) {
    this.id = config.id || LoggerAdapterMeta.identity;

    this.logger = config.logger;
    this.shadowLogger = config.shadowLogger || null;
    this.trace = !!config.trace;

    this.computeSurfaceProvider = config.computeSurfaceProvider || null;
    this.computeDeltaProvider = config.computeDeltaProvider || null;
    this.triHeartId = config.triHeartId || "dad";

    // optional mesh routing hints (read-only)
    this.meshContextProvider =
      typeof config.meshContextProvider === "function"
        ? config.meshContextProvider
        : null;

    if (!this.logger || typeof this.logger.log !== "function") {
      throw new Error(
        "AIBinaryLoggerAdapter v30 requires a ProofLogger-like object with .log(packet)"
      );
    }

    if (this.shadowLogger && typeof this.shadowLogger.logRaw !== "function") {
      throw new Error("shadowLogger must implement .logRaw(binaryString, meta)");
    }

    // Multi-instance harmony
    this.instanceIndex = AIBinaryLoggerAdapter._registerInstance();

    // Artery v5 — windowed metrics + mesh-aware load
    this.windowMs =
      typeof config.windowMs === "number" && config.windowMs > 0
        ? config.windowMs
        : 60000;

    this._windowStart = Date.now();
    this._windowPacketsIn = 0;
    this._windowPacketsOut = 0;
    this._windowBits = 0;
    this._windowCiTagged = 0;
    this._windowDeltaTagged = 0;

    this._totalPacketsIn = 0;
    this._totalPacketsOut = 0;
    this._totalBits = 0;
    this._totalCiTagged = 0;
    this._totalDeltaTagged = 0;

    this.artery = {
      packetsIn: 0,
      packetsOut: 0,
      lastPacketBits: 0,
      ciTaggedPackets: 0,
      deltaTaggedPackets: 0,
      lastSeverity: "info",
      meshPressure: 0,
      meshLoad: 0,
      snapshot: () => Object.freeze(this._snapshotArtery())
    };
  }

  // ---------------------------------------------------------------------------
  //  STATIC INSTANCE REGISTRY
  // ---------------------------------------------------------------------------

  static _registerInstance() {
    if (typeof AIBinaryLoggerAdapter._instanceCount !== "number") {
      AIBinaryLoggerAdapter._instanceCount = 0;
    }
    const idx = AIBinaryLoggerAdapter._instanceCount;
    AIBinaryLoggerAdapter._instanceCount += 1;
    return idx;
  }

  static getInstanceCount() {
    return typeof AIBinaryLoggerAdapter._instanceCount === "number"
      ? AIBinaryLoggerAdapter._instanceCount
      : 0;
  }

  // ---------------------------------------------------------------------------
  //  WINDOW ROLLING — Artery v5
  // ---------------------------------------------------------------------------

  _rollWindow(now) {
    if (now - this._windowStart >= this.windowMs) {
      this._windowStart = now;
      this._windowPacketsIn = 0;
      this._windowPacketsOut = 0;
      this._windowBits = 0;
      this._windowCiTagged = 0;
      this._windowDeltaTagged = 0;
    }
  }

  // ---------------------------------------------------------------------------
  //  BUCKET HELPERS
  // ---------------------------------------------------------------------------

  _bucketLoad(v) {
    if (v >= 0.95) return "saturated";
    if (v >= 0.75) return "high";
    if (v >= 0.4) return "medium";
    if (v > 0) return "low";
    return "idle";
  }

  _bucketPressure(v) {
    if (v >= 0.95) return "overload";
    if (v >= 0.75) return "high";
    if (v >= 0.4) return "medium";
    if (v > 0) return "low";
    return "none";
  }

  _bucketCost(v) {
    if (v >= 0.8) return "heavy";
    if (v >= 0.5) return "moderate";
    if (v >= 0.2) return "light";
    if (v > 0) return "negligible";
    return "none";
  }

  _bucketLevel(v) {
    if (v >= 0.9) return "elite";
    if (v >= 0.75) return "high";
    if (v >= 0.5) return "medium";
    if (v >= 0.25) return "low";
    return "critical";
  }

  // ---------------------------------------------------------------------------
  //  OPTIONAL MESH CONTEXT — read-only, non-interpreting
  // ---------------------------------------------------------------------------

  _safeMeshContext() {
    if (!this.meshContextProvider) return null;

    try {
      const ctx = this.meshContextProvider() || {};
      return {
        meshPressure:
          typeof ctx.meshPressure === "number"
            ? Math.max(0, Math.min(1, ctx.meshPressure))
            : 0,
        meshLoad:
          typeof ctx.meshLoad === "number"
            ? Math.max(0, Math.min(1, ctx.meshLoad))
            : 0,
        routeFanout:
          typeof ctx.routeFanout === "number" ? ctx.routeFanout : 0
      };
    } catch (err) {
      this._trace("mesh:context:error", { error: String(err) });
      return null;
    }
  }

  // ---------------------------------------------------------------------------
  //  OPTIONAL CI / DELTA CONTEXT — read-only, non-interpreting
  // ---------------------------------------------------------------------------

  _getComputeContext() {
    let computeSurface = null;
    let computeDeltaPacket = null;

    try {
      if (typeof this.computeSurfaceProvider === "function") {
        computeSurface = this.computeSurfaceProvider() || null;
      }
    } catch {
      computeSurface = null;
    }

    try {
      if (typeof this.computeDeltaProvider === "function") {
        computeDeltaPacket = this.computeDeltaProvider() || null;
      }
    } catch {
      computeDeltaPacket = null;
    }

    return { computeSurface, computeDeltaPacket };
  }

  // ---------------------------------------------------------------------------
  //  ARTERY SNAPSHOT + GLOBAL REGISTRY — window-safe metrics
  // ---------------------------------------------------------------------------

  _snapshotArtery() {
    const {
      packetsIn,
      packetsOut,
      lastPacketBits,
      ciTaggedPackets,
      deltaTaggedPackets,
      lastSeverity,
      meshPressure,
      meshLoad
    } = this.artery;

    const now = Date.now();
    this._rollWindow(now);

    const elapsedMs = Math.max(1, now - this._windowStart);
    const packetsInRate = (this._windowPacketsIn / elapsedMs) * 1000;
    const packetsOutRate = (this._windowPacketsOut / elapsedMs) * 1000;

    const instanceCount = AIBinaryLoggerAdapter.getInstanceCount() || 1;
    const harmonicLoad = (packetsInRate + packetsOutRate) / instanceCount;

    const load = Math.min(1, (packetsIn + packetsOut) / 8000);
    const pressure = Math.min(1, lastPacketBits / 262144);

    const cost = Math.max(0, Math.min(1, pressure * (1 - load)));
    const budget = Math.max(0, Math.min(1, load - cost));

    const arterySnapshot = {
      instanceIndex: this.instanceIndex,
      instanceCount,

      packetsIn,
      packetsOut,
      lastPacketBits,

      ciTaggedPackets,
      deltaTaggedPackets,
      lastSeverity,

      windowMs: this.windowMs,
      windowPacketsIn: this._windowPacketsIn,
      windowPacketsOut: this._windowPacketsOut,
      windowBits: this._windowBits,
      windowCiTagged: this._windowCiTagged,
      windowDeltaTagged: this._windowDeltaTagged,

      packetsInRate,
      packetsOutRate,
      harmonicLoad,

      load,
      loadBucket: this._bucketLoad(load),

      pressure,
      pressureBucket: this._bucketPressure(pressure),

      cost,
      costBucket: this._bucketCost(cost),

      budget,
      budgetBucket: this._bucketLevel(budget),

      meshPressure,
      meshPressureBucket: this._bucketPressure(meshPressure),

      meshLoad,
      meshLoadBucket: this._bucketLoad(meshLoad),

      id: this.id,
      timestamp: now
    };

    const key = _registryKey(this.id, this.instanceIndex);
    _globalLoggerArteryRegistry.set(key, arterySnapshot);

    return arterySnapshot;
  }

  snapshotMembrane() {
    const out = emitLoggerPacket("snapshot", {
      artery: this._snapshotArtery()
    });
    traceLoggerEvent("snapshotMembrane", out, this.trace);
    return out;
  }

  // ---------------------------------------------------------------------------
  //  PACKET BUILDER — pure, deterministic, identity-safe
  // ---------------------------------------------------------------------------

  _buildPacket(bits, meta = {}, severity = "info") {
    const { computeSurface, computeDeltaPacket } = this._getComputeContext();
    const meshCtx = this._safeMeshContext();

    const ciMeta =
      computeSurface || computeDeltaPacket
        ? {
            triHeartId: this.triHeartId,
            computeSurface: computeSurface || null,
            computeDeltaPacket: computeDeltaPacket || null
          }
        : null;

    if (ciMeta && computeSurface) {
      this.artery.ciTaggedPackets++;
      this._windowCiTagged++;
      this._totalCiTagged++;
    }
    if (ciMeta && computeDeltaPacket) {
      this.artery.deltaTaggedPackets++;
      this._windowDeltaTagged++;
      this._totalDeltaTagged++;
    }

    if (meshCtx) {
      this.artery.meshPressure = meshCtx.meshPressure;
      this.artery.meshLoad = meshCtx.meshLoad;
    }

    return Object.freeze({
      type: "binary-event",
      source: this.id,
      bits,
      bitLength: bits.length,
      timestamp: Date.now(),
      severity,
      meta: Object.freeze({
        ...meta,
        identitySafe: true,
        ci: ciMeta,
        mesh: meshCtx || null
      })
    });
  }

  // ---------------------------------------------------------------------------
  //  ALWAYS-ON SHADOW LOGGER — non-blocking, non-recursive
  // ---------------------------------------------------------------------------

  _shadowLog(bits, meta) {
    if (!this.shadowLogger) return;

    try {
      this.shadowLogger.logRaw(bits, meta);
    } catch {
      // never break organism
    }
  }

  // ---------------------------------------------------------------------------
  //  PRIMARY LOGGING — ProofLogger (human-facing)
// ---------------------------------------------------------------------------

  logBinary(binaryStr, meta = {}, { severity = "info" } = {}) {
    this._assertBinary(binaryStr);

    const now = Date.now();
    this._rollWindow(now);

    const packet = this._buildPacket(binaryStr, meta, severity);

    this._shadowLog(binaryStr, packet.meta);

    this._trace("logBinary:packet", {
      bitLength: packet.bitLength,
      severity: packet.severity,
      meta: packet.meta
    });

    this.logger.log(packet);

    this._windowPacketsIn += 1;
    this._windowPacketsOut += 1;
    this._windowBits += packet.bitLength;

    this._totalPacketsIn += 1;
    this._totalPacketsOut += 1;
    this._totalBits += packet.bitLength;

    this.artery.packetsIn = this._totalPacketsIn;
    this.artery.packetsOut = this._totalPacketsOut;
    this.artery.lastPacketBits = packet.bitLength;
    this.artery.lastSeverity = severity;

    const out = emitLoggerPacket(
      "logged",
      {
        bitLength: packet.bitLength,
        severity: packet.severity,
        meta: packet.meta,
        artery: this._snapshotArtery()
      },
      { severity }
    );

    traceLoggerEvent("logBinary", out, this.trace);
    return out;
  }

  // ---------------------------------------------------------------------------
  //  PIPELINE ATTACHMENT — window-safe observer
  // ---------------------------------------------------------------------------

  attachToPipeline(pipeline) {
    if (!pipeline || typeof pipeline.addObserver !== "function") {
      throw new Error("attachToPipeline expects a pipeline organ with .addObserver()");
    }

    pipeline.addObserver(({ stageIndex, input, output }) => {
      this.logBinary(output, {
        stageIndex,
        inputBits: input.length,
        outputBits: output.length,
        source: "pipeline"
      });
    });

    this._trace("attachToPipeline", { pipeline: pipeline.id });

    const out = emitLoggerPacket("pipeline-attached", {
      pipelineId: pipeline.id,
      artery: this._snapshotArtery()
    });

    traceLoggerEvent("attachToPipeline", out, this.trace);
    return out;
  }

  // ---------------------------------------------------------------------------
  //  REFLEX ATTACHMENT — window-safe reflex logging
  // ---------------------------------------------------------------------------

  attachToReflex(reflex) {
    if (!reflex || typeof reflex.run !== "function") {
      throw new Error("attachToReflex expects a reflex organ with .run()");
    }

    const originalRun = reflex.run.bind(reflex);

    reflex.run = binaryInput => {
      const result = originalRun(binaryInput);

      if (result !== null && result !== undefined) {
        this.logBinary(result, {
          reflexFired: true,
          inputBits: binaryInput.length,
          outputBits: result.length,
          source: "reflex"
        });
      }

      return result;
    };

    this._trace("attachToReflex", { reflex: reflex.id });

    const out = emitLoggerPacket("reflex-attached", {
      reflexId: reflex.id,
      artery: this._snapshotArtery()
    });

    traceLoggerEvent("attachToReflex", out, this.trace);
    return out;
  }

  // ---------------------------------------------------------------------------
  //  INTERNAL HELPERS
  // ---------------------------------------------------------------------------

  _assertBinary(str) {
    if (typeof str !== "string" || !/^[01]+$/.test(str)) {
      throw new TypeError("expected binary string");
    }
  }

  _trace(event, payload) {
    traceLoggerEvent(event, payload, this.trace);
  }
}

// ============================================================================
//  FACTORY
// ============================================================================

export function createAIBinaryLoggerAdapter(config) {
  return new AIBinaryLoggerAdapter(config);
}

// ============================================================================
//  ORGAN EXPORT — v30 IMMORTAL
// ============================================================================

export const aiLoggerAdapter = Object.freeze({
  meta: LoggerAdapterMeta,
  create: createAIBinaryLoggerAdapter
});

// ============================================================================
//  DUAL‑MODE EXPORTS (ESM + CommonJS) — v30 IMMORTAL
// ============================================================================

if (typeof module !== "undefined") {
  module.exports = {
    LOGGER_ADAPTER_IDENTITY,
    LoggerAdapterMeta,
    pulseRole,
    surfaceMeta,
    pulseLoreContext,
    AI_EXPERIENCE_META,
    EXPORT_META,
    AIBinaryLoggerAdapter,
    createAIBinaryLoggerAdapter,
    prewarmLoggerAdapter,
    getGlobalLoggerArteries,
    aiLoggerAdapter
  };
}
