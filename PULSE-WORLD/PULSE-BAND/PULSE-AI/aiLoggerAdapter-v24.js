// ============================================================================
//  aiLoggerAdapter.js — Pulse OS v24.0‑IMMORTAL++
//  Binary Logger Membrane • Shadow Forensics • Artery Metrics • Window‑Safe
//  PURE MEMBRANE. ZERO INTERPRETATION. ZERO RANDOMNESS. DELTA‑AWARE, CI‑AWARE.
//  v24+ UPGRADE: OrganismMap identity + Signal-aware tracing + global handle
// ============================================================================

import {
  OrganismIdentity,
  buildPulseOrganismMap as PulseOrganismMap,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PULSE-WORLD-MAP.js";

// ============================================================================
//  GLOBAL HANDLE (v24 IMMORTAL, environment-agnostic)
// ============================================================================

const G =
  (typeof window !== "undefined" && window) ||
  (typeof globalThis !== "undefined" && globalThis) ||
  (typeof self !== "undefined" && self) ||
  (typeof global !== "undefined" && global) ||
  {};
const g = G;
// ============================================================================
// UNIVERSAL TIMESTAMP (Shadow or Admin)
// ============================================================================

const Timestamp =
  (G.firebaseAdmin && G.firebaseAdmin.firestore && G.firebaseAdmin.firestore.Timestamp) ||
  (G.Timestamp && G.Timestamp) ||
  null;

// ============================================================================
// UNIVERSAL ADMIN (Shadow or Admin)
// ============================================================================

const admin =
  (G.firebaseAdmin && G.firebaseAdmin) ||
  (G.admin && G.admin) ||
  null;

// ============================================================================
// UNIVERSAL DB (Shadow DB ALWAYS wins)
// ============================================================================
const db =
  (G.db && G.db) ||                 // Shadow DB (v25++)
  (admin && admin.firestore && admin.firestore()) || // Admin fallback
  null;

// ============================================================================
// UNIVERSAL LOGGING
// ============================================================================

const dblog =
  (G.log && G.log) ||
  console.log;

const dberror =
  (G.error && G.error) ||
  console.error;
  
const fetchFn =
  (G.fetchfn && typeof G.fetchfn === "function" && G.fetchfn) ||   // Shadow fetch alias
  (G.fetch && typeof G.fetch === "function" && G.fetch) ||         // Global broadcasted Shadow.fetch
  null;
// ============================================================================
//  IDENTITY (v24 IMMORTAL)
// ============================================================================

const Identity = OrganismIdentity(import.meta.url);

export const LoggerAdapterMeta = Identity.OrganMeta;
export const LOGGER_ADAPTER_IDENTITY = Identity;

// ============================================================================
//  SURFACE / ORGANISM LAYER EXPORTS — v24.0 IMMORTAL
// ============================================================================

export const pulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// ============================================================================
//  v24+ SIGNAL-AWARE TRACE LAYER (optional, non-fatal)
// ============================================================================

function traceLoggerEvent(event, payload, traceFlag) {
  if (!traceFlag) return;

  const message = `[aiLoggerAdapter] ${event}`;

  const s = g.PulseProofSignal;
  if (s && typeof s.signal === "function") {
    s.signal({
      level: "info",
      subsystem: "logger-adapter",
      message,
      extra: payload || {},
      system: pulseRole,
      organ: LoggerAdapterMeta.identity,
      layer: surfaceMeta?.layer,
      band: "dual"
    });
    return;
  }

  console.log(message, payload);
}

// ============================================================================
//  PACKET EMITTER — deterministic, logger-scoped
// ============================================================================

function emitLoggerPacket(type, payload, { severity = "info" } = {}) {
  const now = Date.now();
  return Object.freeze({
    meta: LoggerAdapterMeta,
    packetType: `logger-${type}`,
    packetId: `logger-${type}-${now}`,
    timestamp: now,
    epoch: LoggerAdapterMeta.evo.epoch,
    severity,
    ...payload
  });
}

// ============================================================================
//  PREWARM — v24‑IMMORTAL membrane + artery + CI warmup
// ============================================================================

export function prewarmLoggerAdapter(
  dualBand = null,
  {
    trace = false,
    computeSurface = null,
    computeDeltaPacket = null
  } = {}
) {
  const binaryPressure = dualBand?.binary?.metabolic?.pressure ?? 0;
  const binaryLoad = dualBand?.binary?.metabolic?.load ?? 0;

  const evolutionMode =
    dualBand?.symbolic?.evolution?.mode ||
    dualBand?.symbolic?.persona?.evolutionMode ||
    "passive";

  const packet = emitLoggerPacket("prewarm", {
    message: "Logger adapter prewarmed and membrane artery aligned.",
    binaryPressure,
    binaryLoad,
    evolutionMode,
    computeSurface: computeSurface || null,
    computeDeltaPacket: computeDeltaPacket || null
  });

  traceLoggerEvent("prewarm", packet, trace);
  return packet;
}

// ============================================================================
//  ORGAN IMPLEMENTATION — v24‑IMMORTAL++
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

    if (!this.logger || typeof this.logger.log !== "function") {
      throw new Error(
        "AIBinaryLoggerAdapter requires a ProofLogger-like object with .log()"
      );
    }

    if (this.shadowLogger && typeof this.shadowLogger.logRaw !== "function") {
      throw new Error("shadowLogger must implement .logRaw(binaryString, meta)");
    }

    this.artery = {
      packetsIn: 0,
      packetsOut: 0,
      lastPacketBits: 0,
      ciTaggedPackets: 0,
      deltaTaggedPackets: 0,
      lastSeverity: "info",
      snapshot: () => Object.freeze(this._snapshotArtery())
    };
  }

  // ---------------------------------------------------------------------------
  //  ARTERY SNAPSHOT + BUCKETS — window-safe metrics
  // ---------------------------------------------------------------------------

  _snapshotArtery() {
    const {
      packetsIn,
      packetsOut,
      lastPacketBits,
      ciTaggedPackets,
      deltaTaggedPackets,
      lastSeverity
    } = this.artery;

    const load = Math.min(1, (packetsIn + packetsOut) / 4000);
    const pressure = Math.min(1, lastPacketBits / 262144);

    return {
      packetsIn,
      packetsOut,
      lastPacketBits,
      load,
      loadBucket: this._bucketLoad(load),
      pressure,
      pressureBucket: this._bucketPressure(pressure),
      ciTaggedPackets,
      deltaTaggedPackets,
      lastSeverity
    };
  }

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
  //  PACKET BUILDER — pure, deterministic, identity-safe
  // ---------------------------------------------------------------------------

  _buildPacket(bits, meta = {}, severity = "info") {
    const { computeSurface, computeDeltaPacket } = this._getComputeContext();

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
    }
    if (ciMeta && computeDeltaPacket) {
      this.artery.deltaTaggedPackets++;
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
        ci: ciMeta
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

    const packet = this._buildPacket(binaryStr, meta, severity);

    this._shadowLog(binaryStr, packet.meta);

    this._trace("logBinary:packet", {
      bitLength: packet.bitLength,
      severity: packet.severity,
      meta: packet.meta
    });

    this.logger.log(packet);

    this.artery.packetsIn++;
    this.artery.packetsOut++;
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
      throw new Error("attachToPipeline expects a pipeline organ");
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
      throw new Error("attachToReflex expects a reflex organ");
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
  //  SNAPSHOT — window-safe membrane state
  // ---------------------------------------------------------------------------

  snapshotMembrane() {
    const out = emitLoggerPacket("snapshot", {
      artery: this._snapshotArtery()
    });
    traceLoggerEvent("snapshotMembrane", out, this.trace);
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
//  ORGAN EXPORT — v24 IMMORTAL
// ============================================================================

export const aiLoggerAdapter = Object.freeze({
  meta: LoggerAdapterMeta,
  create: createAIBinaryLoggerAdapter
});

// ============================================================================
//  DUAL‑MODE EXPORTS (ESM + CommonJS)
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
    aiLoggerAdapter
  };
}
