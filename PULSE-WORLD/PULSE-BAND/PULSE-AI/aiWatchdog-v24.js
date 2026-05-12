// ============================================================================
//  PULSE OS v24‑IMMORTAL++ — BINARY WATCHDOG ORGAN
//  Liveness Sentinel • Drift Detection • Trust‑Aware • Jury‑Aware
//  PURE BINARY OBSERVER. ZERO MUTATION. ZERO RANDOMNESS.
// ============================================================================

import { OrganismIdentity } from "../PULSE-X/PULSE-WORLD-MAP.js
";

const Identity = OrganismIdentity(import.meta.url);

// ============================================================================
//  META BLOCK — v24.0 IMMORTAL (ORGANISM KERNEL)
//  (now backed by the Organism Map instead of hardcoded here)
// ============================================================================
export const WatchdogMeta = Identity.OrganMeta;

// ============================================================================
//  SURFACE / ORGANISM LAYER EXPORTS — v24.0 IMMORTAL
//  (for Understanding / CNS / Portal alignment)
// ============================================================================

// Required 3 for every “surface” in the organism graph
export const pulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;

// Optional: richer experience meta for AI / tooling
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;

// Optional: export meta for tooling / dev panels
export const EXPORT_META = Identity.EXPORT_META;

// ============================================================================
// PRESSURE HELPERS (for artery fusion)
// ============================================================================
function bucketPressure(v) {
  if (v >= 0.9) return "overload";
  if (v >= 0.7) return "high";
  if (v >= 0.4) return "medium";
  if (v > 0) return "low";
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
// WATCHDOG IMPLEMENTATION — v24 IMMORTAL++
// ============================================================================
export class AIBinaryWatchdog {
  constructor(config = {}) {
    this.id = config.id || WatchdogMeta.identity || "ai-binary-watchdog";
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

    this.intervalMs = config.intervalMs || 500;
    this.timeoutMs = config.timeoutMs || 2000;
    this.trace = !!config.trace;

    if (!this.encoder) {
      throw new Error("AIBinaryWatchdog requires aiBinaryAgent encoder");
    }

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
  // OBSERVER ATTACHMENT (SAFE WRAPPING)
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
        fused >= 0.9 ? "critical" :
        fused >= 0.7 ? "high" :
        fused >= 0.4 ? "medium" :
        fused > 0    ? "low" : "none"
    };
  }

  // ============================================================
  // WATCHDOG ARTERY SNAPSHOT (WINDOW‑SAFE)
  // ============================================================
  getWatchdogArterySnapshot({ binaryVitals = {}, trustArtery = {} } = {}) {
    const pressure = extractBinaryPressure(binaryVitals);
    const trust = extractTrustSignals(trustArtery);

    return Object.freeze({
      organism: {
        pressure,
        pressureBucket: bucketPressure(pressure)
      },
      anomalies: {
        count: this._anomalyCount,
        lastType: this._lastAnomalyType
      },
      trust: {
        honeypotRisk: trust.honeypotRisk,
        dominanceRisk: trust.dominanceRisk,
        anomalyScore: trust.anomalyScore
      },
      meta: {
        version: WatchdogMeta.version,
        epoch: WatchdogMeta.evo.epoch,
        identity: WatchdogMeta.identity
      }
    });
  }

  // ============================================================
  // BINARY ANOMALY PACKET GENERATION (CHUNK‑AWARE)
  // ============================================================
  _generateAlert(anomaly, { binaryVitals = {}, trustArtery = {} } = {}) {
    this._anomalyCount += 1;
    this._lastAnomalyType = anomaly;

    const severity = this._scoreAnomaly(anomaly, binaryVitals, trustArtery);
    const artery = this.getWatchdogArterySnapshot({ binaryVitals, trustArtery });

    const payload = {
      type: "binary-watchdog-alert",
      anomaly,
      severity,
      artery
    };

    const json = JSON.stringify(payload);
    const bits = this.encoder.encode(json);

    let emittedBits = bits;

    if (this.chunker && typeof this.chunker.chunk === "function") {
      emittedBits = this.chunker.chunk(bits, {
        source: "watchdog",
        anomaly,
        severity,
        artery
      });
    }

    const packet = {
      ...payload,
      bits: emittedBits,
      bitLength:
        typeof emittedBits === "string" ? emittedBits.length : bits.length
    };

    this._lastAlert = packet;
    this._trace("alert:generated", { anomaly, severity: severity.bucket });

    // Trust fabric + jury evidence (symbolic-only side effects)
    this.trustFabric?.recordAnomaly?.({
      source: "watchdog",
      anomaly,
      severity,
      artery
    });

    this.juryFrame?.recordEvidence?.("watchdog-anomaly", {
      anomaly,
      severity,
      artery
    });

    this.Evolution?.recordLineage?.("watchdog-anomaly", {
      anomaly,
      severity: severity.bucket,
      epoch: WatchdogMeta.evo.epoch
    });

    return packet;
  }

  _emitAlert(anomaly, ctx = {}) {
    const alert = this._generateAlert(anomaly, ctx);

    if (this.pipeline) this.pipeline.run(alert.bits);
    if (this.reflex) this.reflex.run(alert.bits);

    if (this.logger) {
      this.logger.logBinary(alert.bits, {
        source: "watchdog",
        anomaly,
        severity: alert.severity,
        identity: WatchdogMeta.identity
      });
    }

    this._trace("alert:emitted", { anomaly, severity: alert.severity.bucket });
    return alert;
  }

  // ============================================================
  // WATCHDOG CHECKS (DETERMINISTIC)
  // ============================================================
  _check({ binaryVitals = {}, trustArtery = {} } = {}) {
    const now = Date.now();

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
    this._trace("watchdog:start", { intervalMs: this.intervalMs });
  }

  stop() {
    if (!this._timer) return;
    clearInterval(this._timer);
    this._timer = null;
    this._trace("watchdog:stop", {});
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
    console.log(`[${this.id}] ${event}`, payload);
  }
}

// ============================================================================
// FACTORY — v24‑IMMORTAL++
// ============================================================================
export function createAIBinaryWatchdog(config) {
  return new AIBinaryWatchdog(config);
}

// ---------------------------------------------------------------------------
// DUAL EXPORT LAYER — CommonJS compatibility (v24‑IMMORTAL++ dualband)
// ---------------------------------------------------------------------------
/* c8 ignore next 10 */
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    WatchdogMeta,
    AIBinaryWatchdog,
    createAIBinaryWatchdog
  };
}
