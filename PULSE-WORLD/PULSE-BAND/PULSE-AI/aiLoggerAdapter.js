// ============================================================================
//  aiLoggerAdapter.js — Pulse OS v16‑IMMORTAL
//  Binary Logger Membrane • Shadow Forensics • Artery Metrics • Window‑Safe
//  PURE MEMBRANE. ZERO INTERPRETATION. ZERO RANDOMNESS. DELTA‑AWARE, CI‑AWARE.
// ============================================================================

/*
AI_EXPERIENCE_META = {
  identity: "aiLoggerAdapter",
  version: "v16-Immortal",
  layer: "ai_adapter",
  role: "logger_adapter",
  lineage: "aiLoggerAdapter-v10 → v11.3-Evo → v12.3-Presence → v15-Immortal → v16-Immortal",

  evo: {
    adapter: true,
    logFormatting: true,
    symbolicPrimary: true,
    binaryAware: true,
    dualBand: true,

    loggerMembrane: true,
    shadowForensics: true,
    arteryMetrics: true,
    windowSafe: true,

    computeIntelligenceAware: true,
    binaryDeltaAware: true,
    triHeartAware: true,

    deterministic: true,
    driftProof: true,
    pureCompute: true,
    zeroNetwork: true,
    zeroFilesystem: true,
    zeroMutationOfInput: true
  },

  contract: {
    always: ["aiDebug", "aiDiagnostics", "aiDiagnosticsWrite"],
    never: ["safeRoute", "fetchViaCNS"]
  }
}
*/

export const LoggerAdapterMeta = Object.freeze({
  layer: "OrganismMembrane",
  role: "LOGGER_ADAPTER",
  version: "v16-Immortal",
  identity: "aiLoggerAdapter-v16-Immortal",

  evo: Object.freeze({
    deterministic: true,
    driftProof: true,
    dualband: true,
    membrane: true,

    loggerAware: true,
    pipelineAware: true,
    reflexAware: true,
    packetAware: true,
    shadowLoggerAware: true,

    windowAware: true,
    evolutionAware: true,
    bluetoothReady: true,

    microPipeline: true,
    speedOptimized: true,

    organismAware: true,
    arteryAware: true,
    identitySafe: true,

    computeIntelligenceAware: true,
    binaryDeltaAware: true,
    triHeartAware: true,

    pureCompute: true,
    zeroNetwork: true,
    zeroFilesystem: true,
    zeroMutationOfInput: true,

    multiInstanceReady: true,
    readOnly: true,
    epoch: "v16-Immortal"
  }),

  contract: Object.freeze({
    purpose:
      "Transport binary packets safely from the organism to ProofLogger and shadow forensics without decoding or interpreting, " +
      "while exposing window-safe artery metrics and optional compute-intelligence / delta context.",

    never: Object.freeze([
      "decode binary",
      "interpret binary",
      "mutate binary",
      "format binary",
      "project binary to human-readable form",
      "modify pipeline or reflex behavior",
      "introduce randomness",
      "recursively log itself",
      "store or infer user identity from bits",
      "apply policy logic on bits",
      "derive cognition from bits",
      "derive user profile from bits"
    ]),

    always: Object.freeze([
      "validate binary input",
      "wrap binary in structured packets",
      "forward packets to ProofLogger",
      "forward packets to shadowLogger (if present)",
      "remain pure and minimal",
      "act as a safe membrane",
      "emit deterministic logger packets",
      "expose artery metrics for observability",
      "remain identity-safe and policy-neutral"
    ])
  }),

  boundaryReflex() {
    return "LoggerAdapter must remain a pure membrane: no decoding, no policy, no identity inference, ever.";
  }
});

// ============================================================================
//  PACKET EMITTER — deterministic, logger-scoped
// ============================================================================
function emitLoggerPacket(type, payload, { severity = "info" } = {}) {
  return Object.freeze({
    meta: LoggerAdapterMeta,
    packetType: `logger-${type}`,
    packetId: `logger-${type}-${Date.now()}`,
    timestamp: Date.now(),
    epoch: LoggerAdapterMeta.evo.epoch,
    severity,
    ...payload
  });
}

// ============================================================================
//  PREWARM — v16‑IMMORTAL membrane + artery + CI warmup
// ============================================================================
export function prewarmLoggerAdapter(
  dualBand = null,
  {
    trace = false,
    computeSurface = null,   // optional: current compute-intelligence surface
    computeDeltaPacket = null // optional: last compute delta packet
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

  if (trace) console.log("[LoggerAdapter] prewarm", packet);
  return packet;
}

// ============================================================================
//  ORGAN IMPLEMENTATION — v16‑IMMORTAL
// ============================================================================
export class AIBinaryLoggerAdapter {
  constructor(config = {}) {
    this.id = config.id || LoggerAdapterMeta.identity;

    this.logger = config.logger;
    this.shadowLogger = config.shadowLogger || null;
    this.trace = !!config.trace;

    // optional CI / delta context (read-only, never interpreted)
    this.computeSurfaceProvider = config.computeSurfaceProvider || null;
    this.computeDeltaProvider = config.computeDeltaProvider || null;
    this.triHeartId = config.triHeartId || "dad"; // which heart this membrane is closest to

    if (!this.logger || typeof this.logger.log !== "function") {
      throw new Error("AIBinaryLoggerAdapter requires a ProofLogger-like object with .log()");
    }

    if (this.shadowLogger && typeof this.shadowLogger.logRaw !== "function") {
      throw new Error("shadowLogger must implement .logRaw(binaryString, meta)");
    }

    // v16‑IMMORTAL artery — membrane load + pressure metrics + CI counters
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
    const pressure = Math.min(1, lastPacketBits / 262144); // 256 KiB window

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
    if (v >= 0.4)  return "medium";
    if (v > 0)     return "low";
    return "idle";
  }

  _bucketPressure(v) {
    if (v >= 0.95) return "overload";
    if (v >= 0.75) return "high";
    if (v >= 0.4)  return "medium";
    if (v > 0)     return "low";
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
    } catch (_) {
      computeSurface = null;
    }

    try {
      if (typeof this.computeDeltaProvider === "function") {
        computeDeltaPacket = this.computeDeltaProvider() || null;
      }
    } catch (_) {
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
    } catch (_) {
      // shadow logger must NEVER break the organism
    }
  }

  // ---------------------------------------------------------------------------
  //  PRIMARY LOGGING — ProofLogger (human-facing)
// ---------------------------------------------------------------------------
  logBinary(binaryStr, meta = {}, { severity = "info" } = {}) {
    this._assertBinary(binaryStr);

    const packet = this._buildPacket(binaryStr, meta, severity);

    // Shadow logger ALWAYS fires first
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

    return emitLoggerPacket(
      "logged",
      {
        bitLength: packet.bitLength,
        severity: packet.severity,
        meta: packet.meta,
        artery: this._snapshotArtery()
      },
      { severity }
    );
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

    return emitLoggerPacket("pipeline-attached", { pipelineId: pipeline.id });
  }

  // ---------------------------------------------------------------------------
  //  REFLEX ATTACHMENT — window-safe reflex logging
  // ---------------------------------------------------------------------------
  attachToReflex(reflex) {
    if (!reflex || typeof reflex.run !== "function") {
      throw new Error("attachToReflex expects a reflex organ");
    }

    const originalRun = reflex.run.bind(reflex);

    reflex.run = (binaryInput) => {
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

    return emitLoggerPacket("reflex-attached", { reflexId: reflex.id });
  }

  // ---------------------------------------------------------------------------
  //  SNAPSHOT — window-safe membrane state
  // ---------------------------------------------------------------------------
  snapshotMembrane() {
    return emitLoggerPacket("snapshot", {
      artery: this._snapshotArtery()
    });
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
    if (!this.trace) return;
    console.log(`[${this.id}] ${event}`, payload);
  }
}

// ============================================================================
//  FACTORY
// ============================================================================
export function createAIBinaryLoggerAdapter(config) {
  return new AIBinaryLoggerAdapter(config);
}

if (typeof module !== "undefined") {
  module.exports = {
    AIBinaryLoggerAdapter,
    createAIBinaryLoggerAdapter,
    LoggerAdapterMeta,
    prewarmLoggerAdapter
  };
}
