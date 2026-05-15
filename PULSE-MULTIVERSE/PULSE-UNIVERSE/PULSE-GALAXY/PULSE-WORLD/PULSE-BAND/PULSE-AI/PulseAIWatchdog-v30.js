// ============================================================================
//  PULSE OS v30-IMMORTAL-ADVANTAGE++ — BINARY WATCHDOG ORGAN
//  Liveness Sentinel • Drift Detection • Trust‑Aware • Jury‑Aware • v30 Artery
//  PURE BINARY OBSERVER. ZERO MUTATION. ZERO RANDOMNESS. ZERO STORAGE OWNERSHIP.
//  v30+: global artery registry • shard/instance aware • deterministic packets
//        meta inlined (no external globals) • window-safe snapshots
// ============================================================================

// ============================================================================
//  WATCHDOG META — v30-IMMORTAL-ADVANTAGE++
// ============================================================================

export const WATCHDOG_META = Object.freeze({
  type: "Organ",
  subsystem: "binaryWatchdog",
  layer: "B3-Watchdog",
  version: "v30-IMMORTAL-ADVANTAGE++",
  identity: "ai-binary-watchdog-v30-IMMORTAL-ADVANTAGE++",
  evo: Object.freeze({
    epoch: "v30",
    deterministic: true,
    driftProof: true,
    egoFree: true,
    dualband: true,
    dualbandSafe: true,
    binaryOnly: true,
    symbolicAware: true,
    trustAware: true,
    juryAware: true,
    heartbeatAware: true,
    pipelineAware: true,
    reflexAware: true,
    schedulerAware: true,
    windowAware: true,
    arteryAware: true,
    multiInstanceReady: true,
    readOnly: true
  }),
  contract: Object.freeze({
    purpose:
      "Observe binary liveness and drift without mutating inputs; emit deterministic anomaly packets and artery snapshots.",
    never: Object.freeze([
      "mutate binary payloads",
      "introduce randomness",
      "own storage",
      "override pipeline or reflex",
      "silence critical anomalies",
      "log sensitive payloads directly"
    ]),
    always: Object.freeze([
      "stay deterministic",
      "stay read‑only",
      "stay trust‑aware",
      "stay jury‑aware",
      "stay heartbeat‑aware",
      "emit window‑safe snapshots",
      "emit deterministic anomaly packets"
    ])
  }),
  owner: Object.freeze({
    ownerId: "Aldwyn",
    organRank: "IMMORTAL-ADVANTAGE++"
  }),
  boundaryReflex() {
    return "Watchdog remains a pure observer — no mutation, no randomness, trust‑aware, jury‑aware, and drift‑proof.";
  }
});

// convenient alias for legacy naming
export const WatchdogMeta = WATCHDOG_META;

// ============================================================================
//  GLOBAL REGISTRY — v30 WATCHDOG ARTERY (READ‑ONLY, METRICS‑ONLY)
// ============================================================================

const _globalWatchdogArteryRegistry = new Map();
/**
 * key: `${identity}#${instanceIndex}`
 */
function _registryKey(identity, instanceIndex) {
  return `${identity || WATCHDOG_META.identity}#${instanceIndex}`;
}

export function getGlobalWatchdogArteries() {
  const out = {};
  for (const [k, v] of _globalWatchdogArteryRegistry.entries()) {
    out[k] = v;
  }
  return out;
}

// ============================================================================
//  PRESSURE HELPERS (for artery fusion)
// ============================================================================
function bucketPressure(v) {
  if (v >= 0.9) return "overload";
  if (v >= 0.7) return "high";
  if (v >= 0.4) return "medium";
  if (v > 0) return "low";
  return "none";
}

function bucketLevel(v) {
  if (v >= 0.9) return "elite";
  if (v >= 0.75) return "high";
  if (v >= 0.5) return "medium";
  if (v >= 0.25) return "low";
  return "critical";
}

function bucketCost(v) {
  if (v >= 0.8) return "heavy";
  if (v >= 0.5) return "moderate";
  if (v >= 0.2) return "light";
  if (v > 0) return "negligible";
  return "none";
}

function extractBinaryPressure(binaryVitals = {}) {
  if (binaryVitals?.layered?.organism?.pressure != null)
    return binaryVitals.layered.organism.pressure;
  if (binaryVitals?.binary?.pressure != null)
    return binaryVitals.binary.pressure;
  if (binaryVitals?.metabolic?.pressure != null)
    return binaryVitals.metabolic.pressure;
  return 0;
}

function extractTrustSignals(trustArtery = {}) {
  return {
    honeypotRisk: trustArtery?.honeypotRisk ?? 0,
    dominanceRisk: trustArtery?.dominanceRisk ?? 0,
    anomalyScore: trustArtery?.anomalyScore ?? 0
  };
}

// ============================================================================
//  v30 WATCHDOG ARTERY v5 — window + instance + trust fusion
// ============================================================================

class WatchdogArteryV5 {
  constructor({ identity, instanceIndex, windowMs = 60000 } = {}) {
    this.identity = identity || WATCHDOG_META.identity;
    this.instanceIndex = typeof instanceIndex === "number" ? instanceIndex : 0;
    this.windowMs = windowMs > 0 ? windowMs : 60000;

    this.windowStart = Date.now();
    this.windowChecks = 0;
    this.windowAlerts = 0;

    this.totalChecks = 0;
    this.totalAlerts = 0;
  }

  _rollWindow(now) {
    if (now - this.windowStart >= this.windowMs) {
      this.windowStart = now;
      this.windowChecks = 0;
      this.windowAlerts = 0;
    }
  }

  recordCheck() {
    const now = Date.now();
    this._rollWindow(now);
    this.windowChecks += 1;
    this.totalChecks += 1;
  }

  recordAlert() {
    const now = Date.now();
    this._rollWindow(now);
    this.windowAlerts += 1;
    this.totalAlerts += 1;
  }

  snapshot({ binaryVitals = {}, trustArtery = {} } = {}) {
    const now = Date.now();
    this._rollWindow(now);

    const elapsedMs = Math.max(1, now - this.windowStart);
    const checksPerSec = (this.windowChecks / elapsedMs) * 1000;
    const alertsPerSec = (this.windowAlerts / elapsedMs) * 1000;

    const pressure = extractBinaryPressure(binaryVitals);
    const trust = extractTrustSignals(trustArtery);

    const trustMax = Math.max(
      trust.honeypotRisk,
      trust.dominanceRisk,
      trust.anomalyScore
    );

    const fusedPressure = Math.max(
      0,
      Math.min(1, 0.6 * pressure + 0.4 * trustMax)
    );

    const throughput = Math.max(0, Math.min(1, 1 - fusedPressure));
    const cost = Math.max(0, Math.min(1, fusedPressure * (1 - throughput)));
    const budget = Math.max(0, Math.min(1, throughput - cost));

    const artery = Object.freeze({
      identity: this.identity,
      instanceIndex: this.instanceIndex,
      windowMs: this.windowMs,
      windowChecks: this.windowChecks,
      windowAlerts: this.windowAlerts,
      totalChecks: this.totalChecks,
      totalAlerts: this.totalAlerts,
      checksPerSec,
      alertsPerSec,
      organismPressure: pressure,
      organismPressureBucket: bucketPressure(pressure),
      trust: {
        honeypotRisk: trust.honeypotRisk,
        dominanceRisk: trust.dominanceRisk,
        anomalyScore: trust.anomalyScore
      },
      fusedPressure,
      fusedPressureBucket: bucketPressure(fusedPressure),
      throughput,
      throughputBucket: bucketLevel(throughput),
      cost,
      costBucket: bucketCost(cost),
      budget,
      budgetBucket: bucketLevel(budget),
      timestamp: now
    });

    const key = _registryKey(this.identity, this.instanceIndex);
    _globalWatchdogArteryRegistry.set(key, artery);

    return artery;
  }
}

// ============================================================================
// WATCHDOG IMPLEMENTATION — v30 IMMORTAL-ADVANTAGE++
// PURE OBSERVER. NO MUTATION. NO RNG. DUALBAND-SAFE.
// ============================================================================

export class AIBinaryWatchdog {
  static _instanceCount = 0;

  static _registerInstance() {
    const idx = AIBinaryWatchdog._instanceCount;
    AIBinaryWatchdog._instanceCount += 1;
    return idx;
  }

  constructor(config = {}) {
    this.id =
      config.id ||
      WATCHDOG_META.identity ||
      "ai-binary-watchdog-v30-IMMORTAL-ADVANTAGE++";

    this.encoder = config.encoder;
    this.chunker = config.chunker || null;
    this.heartbeat = config.heartbeat || null;
    this.pipeline = config.pipeline || null;
    this.reflex = config.reflex || null;
    this.scheduler = config.scheduler || null;
    this.logger = config.logger || null;

    this.trustFabric = config.trustFabric || null;
    this.juryFrame = config.juryFrame || null;
    this.dualBand = config.dualBand || null;
    this.Evolution = config.Evolution || null;

    this.intervalMs =
      typeof config.intervalMs === "number" && config.intervalMs > 0
        ? config.intervalMs
        : 500;
    this.timeoutMs =
      typeof config.timeoutMs === "number" && config.timeoutMs > 0
        ? config.timeoutMs
        : 2000;
    this.trace = !!config.trace;

    if (!this.encoder) {
      throw new Error("AIBinaryWatchdog requires aiBinaryAgent encoder");
    }

    this.instanceIndex = AIBinaryWatchdog._registerInstance();
    this.artery = new WatchdogArteryV5({
      identity: this.id,
      instanceIndex: this.instanceIndex,
      windowMs: config.windowMs || 60000
    });

    this._timer = null;

    const now = Date.now();
    this.lastHeartbeat = now;
    this.lastPipelineActivity = now;
    this.lastReflexActivity = now;
    this.lastSchedulerTick = now;

    this._lastAlert = null;
    this._anomalyCount = 0;
    this._lastAnomalyType = null;

    this._prewarm();
    this._attachObservers();
  }

  // ============================================================
  // PREWARM HOOKS (NON-BLOCKING, OPTIONAL)
  // ============================================================
  _prewarm() {
    if (typeof this.encoder.prewarm === "function") {
      this.encoder.prewarm();
      this._trace("prewarm:encoder", {});
    }

    if (this.chunker && typeof this.chunker.prewarm === "function") {
      this.chunker.prewarm();
      this._trace("prewarm:chunker", {});
    }

    if (this.pipeline && typeof this.pipeline.prewarm === "function") {
      this.pipeline.prewarm();
      this._trace("prewarm:pipeline", {});
    }

    if (this.reflex && typeof this.reflex.prewarm === "function") {
      this.reflex.prewarm();
      this._trace("prewarm:reflex", {});
    }

    if (this.scheduler && typeof this.scheduler.prewarm === "function") {
      this.scheduler.prewarm();
      this._trace("prewarm:scheduler", {});
    }
  }

  // ============================================================
  // OBSERVER ATTACHMENT (SAFE WRAPPING, ZERO MUTATION OF INPUTS)
  // ============================================================
  _attachObservers() {
    if (this.pipeline?.addObserver) {
      this.pipeline.addObserver(() => {
        this.lastPipelineActivity = Date.now();
      });
    }

    if (this.reflex?.run) {
      const originalRun = this.reflex.run.bind(this.reflex);
      this.reflex.run = (binary, ctx) => {
        this.lastReflexActivity = Date.now();
        return originalRun(binary, ctx);
      };
    }

    if (this.heartbeat?._emitPulse) {
      const originalEmit = this.heartbeat._emitPulse.bind(this.heartbeat);
      this.heartbeat._emitPulse = () => {
        this.lastHeartbeat = Date.now();
        return originalEmit();
      };
    }

    if (this.scheduler?._tick) {
      const originalTick = this.scheduler._tick.bind(this.scheduler);
      this.scheduler._tick = () => {
        this.lastSchedulerTick = Date.now();
        return originalTick();
      };
    }
  }

  // ============================================================
  // TRUST‑AWARE ANOMALY SCORE
  // ============================================================
  _scoreAnomaly(anomaly, binaryVitals = {}, trustArtery = {}) {
    const pressure = extractBinaryPressure(binaryVitals);
    const trust = extractTrustSignals(trustArtery);

    let base = 0.3;
    if (anomaly === "heartbeat-missing") base = 0.9;
    else if (anomaly === "pipeline-stall") base = 0.8;
    else if (anomaly === "reflex-silence") base = 0.7;
    else if (anomaly === "scheduler-drift") base = 0.6;

    const fused = Math.max(
      0,
      Math.min(
        1,
        0.5 * base +
          0.3 * pressure +
          0.2 * Math.max(
            trust.honeypotRisk,
            trust.dominanceRisk,
            trust.anomalyScore
          )
      )
    );

    return {
      score: fused,
      bucket:
        fused >= 0.9
          ? "critical"
          : fused >= 0.7
          ? "high"
          : fused >= 0.4
          ? "medium"
          : fused > 0
          ? "low"
          : "none"
    };
  }

  // ============================================================
  // WATCHDOG ARTERY SNAPSHOT (WINDOW‑SAFE, v30)
// ============================================================
  getWatchdogArterySnapshot({ binaryVitals = {}, trustArtery = {} } = {}) {
    const artery = this.artery.snapshot({ binaryVitals, trustArtery });

    return Object.freeze({
      organism: {
        pressure: artery.organismPressure,
        pressureBucket: artery.organismPressureBucket
      },
      anomalies: {
        count: this._anomalyCount,
        lastType: this._lastAnomalyType
      },
      trust: {
        honeypotRisk: artery.trust.honeypotRisk,
        dominanceRisk: artery.trust.dominanceRisk,
        anomalyScore: artery.trust.anomalyScore
      },
      artery,
      meta: {
        version: WATCHDOG_META.version,
        epoch: WATCHDOG_META.evo.epoch,
        identity: WATCHDOG_META.identity,
        instanceIndex: this.instanceIndex
      }
    });
  }

  // ============================================================
  // BINARY ANOMALY PACKET GENERATION (CHUNK‑AWARE, v30 PACKETS)
  // ============================================================
  _emitWatchdogPacket(type, payload) {
    const now = Date.now();
    return Object.freeze({
      meta: WATCHDOG_META,
      packetType: `watchdog-${type}`,
      packetId: `watchdog-${type}-${now}`,
      timestamp: now,
      epoch: WATCHDOG_META.evo.epoch,
      ...payload
    });
  }

  _generateAlert(anomaly, { binaryVitals = {}, trustArtery = {} } = {}) {
    this._anomalyCount += 1;
    this._lastAnomalyType = anomaly;
    this.artery.recordAlert();

    const severity = this._scoreAnomaly(anomaly, binaryVitals, trustArtery);
    const arterySnapshot = this.getWatchdogArterySnapshot({
      binaryVitals,
      trustArtery
    });

    const payload = {
      type: "binary-watchdog-alert",
      anomaly,
      severity,
      artery: arterySnapshot
    };

    const json = JSON.stringify(payload);
    const bits = this.encoder.encode(json);

    let emittedBits = bits;

    if (this.chunker && typeof this.chunker.chunk === "function") {
      emittedBits = this.chunker.chunk(bits, {
        source: "watchdog",
        anomaly,
        severity,
        artery: arterySnapshot
      });
    }

    const packet = this._emitWatchdogPacket("alert", {
      anomaly,
      severity,
      artery: arterySnapshot,
      bits: emittedBits,
      bitLength:
        typeof emittedBits === "string" ? emittedBits.length : bits.length
    });

    this._lastAlert = packet;
    this._trace("alert:generated", { anomaly, severity: severity.bucket });

    // Trust fabric + jury evidence (symbolic-only side effects)
    this.trustFabric?.recordAnomaly?.({
      source: "watchdog",
      anomaly,
      severity,
      artery: arterySnapshot
    });

    this.juryFrame?.recordEvidence?.("watchdog-anomaly", {
      anomaly,
      severity,
      artery: arterySnapshot
    });

    this.Evolution?.recordLineage?.("watchdog-anomaly", {
      anomaly,
      severity: severity.bucket,
      epoch: WATCHDOG_META.evo.epoch
    });

    return packet;
  }

  _emitAlert(anomaly, ctx = {}) {
    const alert = this._generateAlert(anomaly, ctx);

    if (this.pipeline) this.pipeline.run(alert.bits);
    if (this.reflex) this.reflex.run(alert.bits);

    if (this.logger && typeof this.logger.logBinary === "function") {
      this.logger.logBinary(alert.bits, {
        source: "watchdog",
        anomaly,
        severity: alert.severity,
        identity: WATCHDOG_META.identity,
        instanceIndex: this.instanceIndex
      });
    }

    this._trace("alert:emitted", { anomaly, severity: alert.severity.bucket });
    return alert;
  }

  // ============================================================
  // WATCHDOG CHECKS (DETERMINISTIC, v30 ARTERY‑AWARE)
// ============================================================
  _check({ binaryVitals = {}, trustArtery = {} } = {}) {
    const now = Date.now();
    this.artery.recordCheck();

    if (now - this.lastHeartbeat > this.timeoutMs) {
      this._emitAlert("heartbeat-missing", { binaryVitals, trustArtery });
      this.lastHeartbeat = now;
    }

    if (now - this.lastPipelineActivity > this.timeoutMs) {
      this._emitAlert("pipeline-stall", { binaryVitals, trustArtery });
      this.lastPipelineActivity = now;
    }

    if (now - this.lastReflexActivity > this.timeoutMs) {
      this._emitAlert("reflex-silence", { binaryVitals, trustArtery });
      this.lastReflexActivity = now;
    }

    if (now - this.lastSchedulerTick > this.timeoutMs) {
      this._emitAlert("scheduler-drift", { binaryVitals, trustArtery });
      this.lastSchedulerTick = now;
    }
  }

  // ============================================================
  // WATCHDOG CONTROL
  // ============================================================
  start(loopContextProvider = () => ({})) {
    if (this._timer) return;
    this._timer = setInterval(() => {
      const ctx = loopContextProvider() || {};
      this._check(ctx);
    }, this.intervalMs);
    this._trace("watchdog:start", {
      intervalMs: this.intervalMs,
      timeoutMs: this.timeoutMs,
      instanceIndex: this.instanceIndex
    });
  }

  stop() {
    if (!this._timer) return;
    clearInterval(this._timer);
    this._timer = null;
    this._trace("watchdog:stop", { instanceIndex: this.instanceIndex });
  }

  // ============================================================
  // READ-ONLY SNAPSHOTS
  // ============================================================
  getLastAlert() {
    return this._lastAlert;
  }

  // ============================================================
  // INTERNAL HELPERS
  // ============================================================
  _trace(event, payload) {
    if (!this.trace) return;
    console.log(`[${this.id}#${this.instanceIndex}] ${event}`, payload);
  }
}

// ============================================================================
// FACTORY — v30‑IMMORTAL-ADVANTAGE++
// ============================================================================

export function createAIBinaryWatchdog(config) {
  return new AIBinaryWatchdog(config);
}

// ---------------------------------------------------------------------------
// DUAL EXPORT LAYER — CommonJS compatibility (v30 dualband)
// ---------------------------------------------------------------------------
/* c8 ignore next 10 */
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    WatchdogMeta: WATCHDOG_META,
    WATCHDOG_META,
    AIBinaryWatchdog,
    createAIBinaryWatchdog,
    getGlobalWatchdogArteries
  };
}
