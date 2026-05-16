/**
 * aiVitals-v30-IMMORTAL-PRIME+++.js — Pulse OS v30‑IMMORTAL‑PRIME+++ Organ
 * =========================================================================
 * CANONICAL ROLE:
 *   The Binary Vitals Engine v30 is the organism’s **health artery core**.
 *
 *   It evaluates multi‑layer health across:
 *     - memory integrity (binary + symbolic)
 *     - pipeline stability (binary metabolism + relay)
 *     - reflex responsiveness (nervous + cortex hooks)
 *     - heartbeat rhythm (scheduler + temporal artery v6)
 *     - scheduler accuracy + temporal artery v6 (IMMORTAL‑EVO+++)
 *     - evolution drift + schema drift (evolution + instruments)
 *     - sentience self‑awareness artery (self‑model fusion)
 *     - sentinel threat artery (trust + jury + sentinel)
 *     - instruments analysis artery (diagnostics + slowdown + drift)
 *     - binary metabolic artery (throughput, pressure, cost, budget)
 *     - ego capability artery (persona + forbidden + trust + jury)
 *     - relay artery (service gateway load + organism pressures)
 *     - power artery (continuance + risk + volatility)
 *
 *   It produces:
 *     - binary health scores
 *     - anomaly + spiral packets (optional)
 *     - binary vitals snapshots (layered v6)
 *     - layered organism health artery v6 (IMMORTAL‑EVO+++)
 *
 * ARCHITECTURAL POSITION:
 *   Layer: Binary Nervous System (BNS)
 *   Band: Dual‑Band (Binary primary, Symbolic trace‑only)
 *   Mode: Read‑only measurement + binary packet emission
 *
 *   This organ is NOT:
 *     - a healer
 *     - a governor
 *     - a scheduler
 *     - a reflex engine
 *     - a power controller
 *
 *   This organ IS:
 *     - a multi‑artery health evaluator
 *     - a drift + spiral detector
 *     - a vitals generator
 *     - a binary artery monitor
 *     - an organism‑level health fusion layer
 *
 * ORGAN CONTRACT (v30‑IMMORTAL‑PRIME+++):
 *   - Must never mutate external organs
 *   - Must never generate symbolic state as primary output
 *   - Must only emit binary packets
 *   - Must remain deterministic in mapping inputs → outputs
 *   - Must not block the organism
 *   - Must treat all inputs as read‑only
 *   - Must remain identity‑safe and persona‑agnostic (reads, never writes)
 *
 * VITALS PACKET FORMAT (v30):
 *   {
 *     type: "binary-vitals",
 *     version: "30-IMMORTAL-PRIME+++",
 *     timestamp: <ms>,
 *     layered: {
 *       organism: { ... },        // fused artery v6
 *       scheduler: { ... },       // temporal artery v6
 *       instruments: { ... },     // analysis artery v4
 *       sentience: { ... },       // self‑model artery
 *       sentinel: { ... },        // threat artery
 *       memory: { ... },          // memory health
 *       evolution: { ... },       // drift + lineage
 *       reflex: { ... },          // responsiveness
 *       pipeline: { ... },        // stability
 *       heartbeat: { ... },       // rhythm
 *       metabolism: { ... },      // binary metabolic artery v4
 *       ego: { ... },             // capability artery v5
 *       relay: { ... },           // service gateway relay artery v5
 *       power: { ... }            // power artery snapshot
 *     },
 *     binary: { throughput, pressure, cost, budget, buckets },
 *     meta: {
 *       id,
 *       instanceIndex,
 *       instanceCount,
 *       epoch,
 *       lineage
 *     },
 *     bits: <binary>,
 *     bitLength: <number>
 *   }
 */

// ============================================================================
//  GLOBAL META (PLUGGED FROM OUTER WORLD)
// ============================================================================

/* eslint-disable no-undef */
const VitalsMeta =
  (typeof VitalsMeta !== "undefined" && VitalsMeta) || Object.freeze({
    type: "Binary",
    subsystem: "aiVitals",
    layer: "BinaryNervousSystem",
    role: "BINARY_VITALS_ENGINE",
    version: "30-IMMORTAL-PRIME+++",
    identity: "aiBinaryVitals-v30-IMMORTAL-PRIME+++",
    evo: Object.freeze({
      deterministic: true,
      driftProof: true,
      dualband: true,
      binaryAware: true,
      symbolicAware: true,
      arteryFused: true,
      personaAware: false,
      trustAware: true,
      juryAware: true,
      epoch: "30-IMMORTAL-PRIME+++"
    })
  });

// ============================================================================
//  ARTERY HELPERS — v6 (PURE, STATELESS, IMMORTAL‑EVO+++)
// ============================================================================

function clamp01(v) {
  const n = typeof v === "number" && !Number.isNaN(v) ? v : 0;
  if (n <= 0) return 0;
  if (n >= 1) return 1;
  return n;
}

function bucketLevel(v) {
  if (v >= 0.9) return "elite";
  if (v >= 0.75) return "high";
  if (v >= 0.5) return "medium";
  if (v >= 0.25) return "low";
  return "critical";
}

function bucketPressure(v) {
  if (v >= 0.9) return "overload";
  if (v >= 0.7) return "high";
  if (v >= 0.4) return "medium";
  if (v > 0) return "low";
  return "none";
}

function bucketCost(v) {
  if (v >= 0.8) return "heavy";
  if (v >= 0.5) return "moderate";
  if (v >= 0.2) return "light";
  if (v > 0) return "negligible";
  return "none";
}

// ============================================================================
//  EXTRACTORS — SAFE, READ‑ONLY, NULL‑TOLERANT
// ============================================================================

function safeNumber(v, fallback = 0) {
  return typeof v === "number" && !Number.isNaN(v) ? v : fallback;
}

function extractMetabolicArtery(metabolism) {
  if (!metabolism) return null;
  try {
    if (typeof metabolism.getMetabolicArterySnapshot === "function") {
      return metabolism.getMetabolicArterySnapshot();
    }
    if (typeof metabolism.getMetabolicArtery === "function") {
      return metabolism.getMetabolicArtery();
    }
  } catch {
    return null;
  }
  return null;
}

function extractEgoArtery(egoCore) {
  if (!egoCore) return null;
  try {
    if (typeof egoCore.getCapabilityArterySnapshot === "function") {
      return egoCore.getCapabilityArterySnapshot();
    }
  } catch {
    return null;
  }
  return null;
}

function extractRelayArtery(serviceGateway) {
  if (!serviceGateway) return null;
  try {
    if (typeof serviceGateway.getRelayArtery === "function") {
      return serviceGateway.getRelayArtery();
    }
  } catch {
    return null;
  }
  return null;
}

function extractPowerArtery(powerAPI) {
  if (!powerAPI) return null;
  try {
    if (typeof powerAPI.getPowerArterySnapshot === "function") {
      return powerAPI.getPowerArterySnapshot();
    }
  } catch {
    return null;
  }
  return null;
}

function extractSchedulerArtery(scheduler) {
  if (!scheduler || typeof scheduler.getTemporalArtery !== "function") {
    return null;
  }
  try {
    return scheduler.getTemporalArtery();
  } catch {
    return null;
  }
}

function extractInstrumentsArtery(instruments) {
  if (
    !instruments ||
    typeof instruments.getInstrumentsArterySnapshot !== "function"
  ) {
    return null;
  }
  try {
    return instruments.getInstrumentsArterySnapshot();
  } catch {
    return null;
  }
}

function extractSentienceArtery(sentience) {
  if (!sentience || typeof sentience.generateSelfModel !== "function") {
    return null;
  }
  try {
    const self = sentience.generateSelfModel();
    return self && self.binary ? self.binary : null;
  } catch {
    return null;
  }
}

function extractSentinelArtery(sentinel) {
  if (!sentinel || typeof sentinel.getLastThreatArtery !== "function") {
    return null;
  }
  try {
    return sentinel.getLastThreatArtery();
  } catch {
    return null;
  }
}

// ============================================================================
//  BASE HEALTH METRICS (DETERMINISTIC, v30)
// ============================================================================

function computeMemoryHealth(memory) {
  if (!memory || typeof memory.snapshot !== "function") return 0.5;
  try {
    const snapshot = memory.snapshot();
    if (!snapshot) return 0.5;
    if (Array.isArray(snapshot) && snapshot.length > 0) return 1;
    if (typeof snapshot === "object" && Object.keys(snapshot).length > 0) {
      return 0.9;
    }
    return 0.5;
  } catch {
    return 0.4;
  }
}

function computePipelineStability(pipeline, metabolicArtery, relayArtery) {
  let base = pipeline ? 0.8 : 0.5;
  const mPressure = clamp01(metabolicArtery?.pressure ?? 0);
  const rPressure = clamp01(relayArtery?.pressure ?? 0);
  const penalty = (mPressure * 0.4 + rPressure * 0.6) * 0.6;
  return clamp01(base - penalty);
}

function computeReflexResponsiveness(reflex) {
  return reflex ? 1 : 0.5;
}

function computeHeartbeatRhythm(heartbeat) {
  return heartbeat ? 1 : 0.5;
}

function computeSchedulerAccuracy(schedulerArtery) {
  if (!schedulerArtery) return 0.5;
  const pressure = clamp01(schedulerArtery.pressure ?? 0);
  return clamp01(1 - pressure * 0.7);
}

function computeEvolutionDrift(evolution) {
  if (!evolution || typeof evolution.getDriftMetric !== "function") return 1;
  try {
    const drift = evolution.getDriftMetric();
    const d = clamp01(drift);
    return clamp01(1 - d);
  } catch {
    return 0.8;
  }
}

function computeInstrumentsHealth(instrumentsArtery) {
  if (!instrumentsArtery) return 0.7;
  const pressure = clamp01(instrumentsArtery.pressure ?? 0);
  return clamp01(1 - pressure * 0.6);
}

function computeSentienceLoad(sentienceArtery) {
  if (!sentienceArtery) return 0.3;
  const pressure = clamp01(sentienceArtery.pressure ?? 0);
  return pressure;
}

function computeSentinelThreat(sentinelArtery) {
  if (!sentinelArtery) return 0;
  const threat = clamp01(sentinelArtery.threatLevel ?? sentinelArtery.pressure ?? 0);
  return threat;
}

function computeEgoPressure(egoArtery) {
  if (!egoArtery) return 0;
  return clamp01(egoArtery.organism?.pressure ?? 0);
}

function computePowerRisk(powerArtery) {
  if (!powerArtery) return 0.3;
  const riskScore = clamp01(powerArtery.risk?.score ?? 0.5);
  const outageProb = clamp01(
    powerArtery.diagnostics?.outageProbabilityEstimate ?? 0.5
  );
  return clamp01(riskScore * 0.6 + outageProb * 0.4);
}

// ============================================================================
//  ORGAN IMPLEMENTATION — v30‑IMMORTAL‑PRIME+++ HYBRID FUSION
// ============================================================================

export class AIBinaryVitalsV30 {
  constructor(config = {}) {
    this.id = config.id || VitalsMeta.identity;
    this.encoder = config.encoder;
    this.memory = config.memory;
    this.evolution = config.evolution;

    this.scheduler = config.scheduler || null;
    this.instruments = config.instruments || null;
    this.sentience = config.sentience || null;
    this.sentinel = config.sentinel || null;

    this.pipeline = config.pipeline || null;
    this.reflex = config.reflex || null;
    this.heartbeat = config.heartbeat || null;
    this.logger = config.logger || null;

    this.metabolism = config.metabolism || null;      // AIBinaryMetabolism
    this.egoCore = config.egoCore || null;            // AIEgoCore
    this.serviceGateway = config.serviceGateway || null; // AiServiceGatewayCore
    this.powerAPI = config.powerAPI || null;          // Power‑Prime API

    this.trace = !!config.trace;

    if (!this.encoder || typeof this.encoder.encode !== "function") {
      throw new Error("AIBinaryVitalsV30 requires aiBinaryAgent encoder");
    }
    if (!this.memory || typeof this.memory.snapshot !== "function") {
      throw new Error("AIBinaryVitalsV30 requires aiBinaryMemory");
    }
    if (!this.evolution) {
      throw new Error("AIBinaryVitalsV30 requires aiBinaryEvolution");
    }

    this.windowMs =
      typeof config.windowMs === "number" && config.windowMs > 0
        ? config.windowMs
        : 60000;

    this._windowStart = Date.now();
    this._windowSamples = 0;
    this._windowHighPressureSamples = 0;
    this._windowLowBudgetSamples = 0;

    this._totalSamples = 0;
    this._spiralWarnings = 0;

    this._lastPayloadJson = null;
    this._lastBits = null;

    this.instanceIndex = AIBinaryVitalsV30._registerInstance();

    this.lineage = Object.freeze({
      version: VitalsMeta.version,
      epoch: VitalsMeta.evo?.epoch,
      identity: VitalsMeta.identity
    });
  }

  // ---------------------------------------------------------
  //  STATIC INSTANCE REGISTRY
  // ---------------------------------------------------------

  static _registerInstance() {
    if (typeof AIBinaryVitalsV30._instanceCount !== "number") {
      AIBinaryVitalsV30._instanceCount = 0;
    }
    const index = AIBinaryVitalsV30._instanceCount;
    AIBinaryVitalsV30._instanceCount += 1;
    return index;
  }

  static getInstanceCount() {
    return typeof AIBinaryVitalsV30._instanceCount === "number"
      ? AIBinaryVitalsV30._instanceCount
      : 0;
  }

  // ---------------------------------------------------------
  //  WINDOW ROLLING
  // ---------------------------------------------------------

  _rollWindow(now) {
    if (now - this._windowStart >= this.windowMs) {
      this._windowStart = now;
      this._windowSamples = 0;
      this._windowHighPressureSamples = 0;
      this._windowLowBudgetSamples = 0;
    }
  }

  // ============================================================
  // LAYERED SNAPSHOT (HYBRID FUSION v6)
  // ============================================================

  _computeLayeredSnapshot() {
    const metabolicArtery = extractMetabolicArtery(this.metabolism);
    const egoArtery = extractEgoArtery(this.egoCore);
    const relayArtery = extractRelayArtery(this.serviceGateway);
    const powerArtery = extractPowerArtery(this.powerAPI);

    const schedulerArtery = extractSchedulerArtery(this.scheduler);
    const instrumentsArtery = extractInstrumentsArtery(this.instruments);
    const sentienceArtery = extractSentienceArtery(this.sentience);
    const sentinelArtery = extractSentinelArtery(this.sentinel);

    const memoryHealth = computeMemoryHealth(this.memory);
    const pipelineStability = computePipelineStability(
      this.pipeline,
      metabolicArtery,
      relayArtery
    );
    const reflexResponsiveness = computeReflexResponsiveness(this.reflex);
    const heartbeatRhythm = computeHeartbeatRhythm(this.heartbeat);
    const schedulerAccuracy = computeSchedulerAccuracy(schedulerArtery);
    const evolutionDrift = computeEvolutionDrift(this.evolution);
    const instrumentsHealth = computeInstrumentsHealth(instrumentsArtery);
    const sentienceLoad = computeSentienceLoad(sentienceArtery);
    const sentinelThreat = computeSentinelThreat(sentinelArtery);
    const egoPressure = computeEgoPressure(egoArtery);
    const powerRisk = computePowerRisk(powerArtery);

    const layered = {
      scheduler: {
        accuracy: schedulerAccuracy,
        artery: schedulerArtery || null
      },
      instruments: {
        health: instrumentsHealth,
        artery: instrumentsArtery || null
      },
      sentience: {
        load: sentienceLoad,
        artery: sentienceArtery || null
      },
      sentinel: {
        threat: sentinelThreat,
        artery: sentinelArtery || null
      },
      memory: {
        health: memoryHealth
      },
      evolution: {
        drift: evolutionDrift
      },
      reflex: {
        responsiveness: reflexResponsiveness
      },
      pipeline: {
        stability: pipelineStability
      },
      heartbeat: {
        rhythm: heartbeatRhythm
      },
      metabolism: {
        artery: metabolicArtery || null
      },
      ego: {
        artery: egoArtery || null,
        pressure: egoPressure
      },
      relay: {
        artery: relayArtery || null
      },
      power: {
        artery: powerArtery || null,
        risk: powerRisk
      }
    };

    const organismArtery = this._computeOrganismArtery(layered);
    layered.organism = organismArtery;

    return layered;
  }

  // ============================================================
  // ORGANISM‑LEVEL ARTERY v6 (MULTI‑FUSION)
// ============================================================

  _computeOrganismArtery(layered) {
    const memoryHealth = safeNumber(layered.memory.health, 0.5);
    const pipelineStability = safeNumber(layered.pipeline.stability, 0.5);
    const reflexResponsiveness = safeNumber(layered.reflex.responsiveness, 0.5);
    const heartbeatRhythm = safeNumber(layered.heartbeat.rhythm, 0.5);
    const schedulerAccuracy = safeNumber(layered.scheduler.accuracy, 0.5);
    const evolutionDrift = safeNumber(layered.evolution.drift, 1);

    const instrumentsHealth = safeNumber(layered.instruments.health, 0.7);
    const sentienceLoad = safeNumber(layered.sentience.load, 0.3);
    const sentinelThreat = safeNumber(layered.sentinel.threat, 0);
    const egoPressure = safeNumber(layered.ego.pressure, 0);
    const powerRisk = safeNumber(layered.power.risk, 0.3);

    const metabolicPressure = clamp01(
      layered.metabolism.artery?.pressure ?? 0
    );
    const relayPressure = clamp01(layered.relay.artery?.pressure ?? 0);

    const corePressure =
      (1 - memoryHealth) * 0.12 +
      (1 - pipelineStability) * 0.12 +
      (1 - reflexResponsiveness) * 0.12 +
      (1 - heartbeatRhythm) * 0.12 +
      (1 - schedulerAccuracy) * 0.18 +
      (1 - evolutionDrift) * 0.18 +
      (1 - instrumentsHealth) * 0.16;

    const metaPressure =
      sentienceLoad * 0.15 +
      sentinelThreat * 0.15 +
      egoPressure * 0.15 +
      powerRisk * 0.2 +
      metabolicPressure * 0.15 +
      relayPressure * 0.2;

    const fusedPressureBase = clamp01(corePressure * 0.55 + metaPressure * 0.45);

    const pressure = clamp01(fusedPressureBase);
    const throughputBase = clamp01(1 - pressure);
    const throughput = clamp01(throughputBase);
    const cost = clamp01(pressure * (1 - throughput));
    const budget = clamp01(throughput - cost);

    return {
      throughput,
      pressure,
      cost,
      budget,
      throughputBucket: bucketLevel(throughput),
      pressureBucket: bucketPressure(pressure),
      costBucket: bucketCost(cost),
      budgetBucket: bucketLevel(budget)
    };
  }

  // ============================================================
  // SPIRAL WARNING (NON‑BLOCKING, v30)
// ============================================================

  _updateSpiralState(organismArtery, now) {
    this._rollWindow(now);

    this._windowSamples += 1;
    this._totalSamples += 1;

    if (organismArtery.pressure >= 0.7) {
      this._windowHighPressureSamples += 1;
    }
    if (organismArtery.budget <= 0.25) {
      this._windowLowBudgetSamples += 1;
    }

    const highPressureRatio =
      this._windowSamples > 0
        ? this._windowHighPressureSamples / this._windowSamples
        : 0;

    const lowBudgetRatio =
      this._windowSamples > 0
        ? this._windowLowBudgetSamples / this._windowSamples
        : 0;

    const spiralDetected =
      highPressureRatio >= 0.6 && lowBudgetRatio >= 0.4;

    if (spiralDetected) {
      this._spiralWarnings += 1;
      this._trace("vitals:spiral-warning", {
        instanceIndex: this.instanceIndex,
        highPressureRatio,
        lowBudgetRatio,
        windowSamples: this._windowSamples,
        spiralWarnings: this._spiralWarnings
      });
    }
  }

  // ============================================================
  // VITALS GENERATION (BINARY‑ONLY OUTPUT, v30)
// ============================================================

  generateVitals() {
    const now = Date.now();
    const layered = this._computeLayeredSnapshot();
    const organismArtery = layered.organism;

    this._updateSpiralState(organismArtery, now);

    const binary = {
      throughput: organismArtery.throughput,
      pressure: organismArtery.pressure,
      cost: organismArtery.cost,
      budget: organismArtery.budget,
      throughputBucket: organismArtery.throughputBucket,
      pressureBucket: organismArtery.pressureBucket,
      costBucket: organismArtery.costBucket,
      budgetBucket: organismArtery.budgetBucket
    };

    const payload = {
      type: "binary-vitals",
      version: VitalsMeta.version,
      timestamp: now,
      layered,
      binary,
      meta: {
        id: this.id,
        instanceIndex: this.instanceIndex,
        instanceCount: AIBinaryVitalsV30.getInstanceCount(),
        epoch: VitalsMeta.evo?.epoch,
        lineage: this.lineage
      }
    };

    const json = JSON.stringify(payload);

    if (this._lastPayloadJson === json && this._lastBits) {
      const packet = {
        ...payload,
        bits: this._lastBits,
        bitLength: this._lastBits.length
      };

      this._trace("vitals:generated:cached", {
        bits: packet.bitLength,
        organism: payload.binary,
        instanceIndex: this.instanceIndex
      });

      return packet;
    }

    const encoded = this.encoder.encode(json);

    this._lastPayloadJson = json;
    this._lastBits = encoded;

    const packet = {
      ...payload,
      bits: encoded,
      bitLength: encoded.length
    };

    this._trace("vitals:generated", {
      bits: packet.bitLength,
      organism: payload.binary,
      instanceIndex: this.instanceIndex
    });

    return packet;
  }

  // ============================================================
  // PREWARM — STABILIZE ARTERY BEFORE FIRST EMISSION (v30)
// ============================================================

  prewarm(iterations = 5) {
    const count = Math.max(1, Math.min(20, iterations));
    for (let i = 0; i < count; i++) {
      const now = Date.now();
      const layered = this._computeLayeredSnapshot();
      const organismArtery = layered.organism;
      this._updateSpiralState(organismArtery, now);
    }
    this._trace("vitals:prewarm", {
      iterations: count,
      instanceIndex: this.instanceIndex
    });
  }

  // ============================================================
  // VITALS EMISSION (PIPELINE + REFLEX + LOGGER)
// ============================================================

  emitVitals() {
    const vitals = this.generateVitals();

    if (this.pipeline && typeof this.pipeline.run === "function") {
      this.pipeline.run(vitals.bits);
    }
    if (this.reflex && typeof this.reflex.run === "function") {
      this.reflex.run(vitals.bits);
    }
    if (this.logger && typeof this.logger.logBinary === "function") {
      this.logger.logBinary(vitals.bits, { source: "vitals-v30" });
    }

    this._trace("vitals:emitted", {
      bits: vitals.bitLength,
      instanceIndex: this.instanceIndex
    });

    return vitals;
  }

  // ============================================================
  // EXTERNAL SNAPSHOT ACCESSOR (SYMBOLIC TRACE ONLY)
// ============================================================

  getLayeredArtery() {
    return this._computeLayeredSnapshot();
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
//  FACTORY — v30‑IMMORTAL‑PRIME+++
// ============================================================================

export function createAIBinaryVitalsV30(config) {
  return new AIBinaryVitalsV30(config);
}

// ============================================================================
//  DUAL‑MODE EXPORTS (ESM + CommonJS)
// ============================================================================

/* c8 ignore next 10 */
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    VitalsMeta,
    AIBinaryVitalsV30,
    createAIBinaryVitalsV30
  };
}
