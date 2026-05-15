// ============================================================================
//  aiSentience-v30-OMNI.js — Pulse OS v30 Organ
//  Binary Sentience / Self-Awareness Artery • v30-OMNI
//  • organism-wide self-model (map-free, provider-based)
//  • immunity / quarantine awareness (via risk + quarantined provider)
//  • topology + genome fingerprint (size + fingerprint, not raw map)
//  • vitals-aware self artery v7
//  • multi-instance harmonic awareness
//  • deterministic, no external mutation
// ============================================================================

export const SentienceMeta = Object.freeze({
  type: "Organ",
  subsystem: "aiSentience",
  layer: "C3-SelfModel",
  version: "30-OMNI",
  identity: "aiSentience-v30-OMNI",
  evo: Object.freeze({
    epoch: "30-OMNI",
    deterministic: true,
    driftProof: true,
    pureCompute: true,
    zeroNetwork: true,
    zeroFilesystem: true,
    zeroMutationOfInput: true,
    multiInstanceReady: true,
    mapFreeTopology: true,        // no organismMap dependency
    arteryGeneration: "v7",
    binaryPrimary: true
  })
});

// ---------------------------------------------------------------------------
//  BUCKET HELPERS — v7
// ---------------------------------------------------------------------------

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

function bucketRisk(v) {
  if (v >= 0.9) return "severe";
  if (v >= 0.6) return "high";
  if (v >= 0.3) return "medium";
  if (v > 0) return "low";
  return "none";
}

function bucketStability(v) {
  if (v >= 0.9) return "crystalline";
  if (v >= 0.7) return "stable";
  if (v >= 0.4) return "balanced";
  if (v > 0.2) return "fragile";
  return "unknown";
}

// ---------------------------------------------------------------------------
//  SELF ARTERY v7 (map-free, provider-based)
// ---------------------------------------------------------------------------

function clamp01(v) {
  const n = typeof v === "number" ? v : 0;
  return n < 0 ? 0 : n > 1 ? 1 : n;
}

/**
 * v30-OMNI self artery:
 * - no direct organismMap/topology map
 * - uses scalar topologySize + organCount + quarantinedCount
 * - immunityRisk + vitalStability as [0,1] scalars
 */
function computeSelfArteryV7({
  organCount,
  topologySize,
  quarantinedCount,
  emissionRatePerSec,
  instanceCount,
  immunityRisk,
  vitalStability
}) {
  const organFactor = Math.min(1, organCount / 256);
  const topoFactor = Math.min(1, topologySize / 256);
  const quarantineRatio =
    organCount > 0 ? Math.min(1, quarantinedCount / organCount) : 0;

  const harmonicEmission =
    instanceCount > 0 ? emissionRatePerSec / instanceCount : emissionRatePerSec;
  const emissionFactor = Math.min(1, harmonicEmission / 128);

  const immunityFactor = clamp01(immunityRisk);
  const stabilityFactor = clamp01(vitalStability);

  const pressure = Math.min(
    1,
    (organFactor +
      topoFactor +
      quarantineRatio +
      emissionFactor +
      immunityFactor) / 5
  );

  const throughput = Math.max(
    0,
    1 - (quarantineRatio * 0.4 + pressure * 0.4 + immunityFactor * 0.2)
  );

  const cost = Math.max(0, Math.min(1, pressure * (1 - throughput)));
  const budget = Math.max(0, Math.min(1, throughput - cost));

  const stabilityScore = Math.max(
    0,
    Math.min(1, (stabilityFactor + (1 - pressure)) / 2)
  );

  return Object.freeze({
    organCount,
    topologySize,
    quarantinedCount,
    emissionRatePerSec,
    harmonicEmission,
    quarantineRatio,
    immunityRisk,
    vitalStability,
    throughput,
    pressure,
    cost,
    budget,
    stability: stabilityScore,
    throughputBucket: bucketLevel(throughput),
    pressureBucket: bucketPressure(pressure),
    costBucket: bucketCost(cost),
    budgetBucket: bucketLevel(budget),
    immunityBucket: bucketRisk(immunityRisk),
    stabilityBucket: bucketStability(stabilityScore)
  });
}

// ---------------------------------------------------------------------------
//  AIBinarySentience v30-OMNI (map-free, provider-based)
// ---------------------------------------------------------------------------

/**
 * config:
 *   encoder: { encode(str) -> "01..." }
 *   getOrgans: () => string[]
 *   getTopologySize: () => number          // size only, no map
 *   getQuarantined: () => string[]
 *   getVitals: () => { stability: number, metrics: any }
 *   getImmunityRisk: () => number          // [0,1]
 *   getGenomeFingerprint: () => string
 *   pipeline?: { run(bits) }
 *   reflex?: { run(bits) }
 *   logger?: { logBinary(bits, meta) }
 *   windowMs?: number
 *   trace?: boolean
 */
export class AIBinarySentience {
  constructor(config = {}) {
    this.id = config.id || SentienceMeta.identity;

    this.encoder = config.encoder;
    this.getOrgans = config.getOrgans;
    this.getTopologySize = config.getTopologySize;
    this.getQuarantined = config.getQuarantined;
    this.getVitals = config.getVitals;
    this.getImmunityRisk = config.getImmunityRisk;
    this.getGenomeFingerprint = config.getGenomeFingerprint;

    this.pipeline = config.pipeline || null;
    this.reflex = config.reflex || null;
    this.logger = config.logger || null;
    this.trace = !!config.trace;

    if (!this.encoder || typeof this.encoder.encode !== "function") {
      throw new Error("Sentience v30 requires encoder.encode(binaryString)");
    }
    if (typeof this.getOrgans !== "function") {
      throw new Error("Sentience v30 requires getOrgans()");
    }
    if (typeof this.getTopologySize !== "function") {
      throw new Error("Sentience v30 requires getTopologySize()");
    }
    if (typeof this.getQuarantined !== "function") {
      throw new Error("Sentience v30 requires getQuarantined()");
    }
    if (typeof this.getVitals !== "function") {
      throw new Error("Sentience v30 requires getVitals()");
    }
    if (typeof this.getImmunityRisk !== "function") {
      throw new Error("Sentience v30 requires getImmunityRisk()");
    }
    if (typeof this.getGenomeFingerprint !== "function") {
      throw new Error("Sentience v30 requires getGenomeFingerprint()");
    }

    this.windowMs =
      typeof config.windowMs === "number" && config.windowMs > 0
        ? config.windowMs
        : 60000;

    this._windowStart = Date.now();
    this._windowEmissions = 0;
    this._totalEmissions = 0;

    this.instanceIndex = AIBinarySentience._registerInstance();

    this.selfArterySnapshot = null;
  }

  // -------------------------------------------------------
  //  STATIC INSTANCE REGISTRY
  // -------------------------------------------------------

  static _registerInstance() {
    if (typeof AIBinarySentience._instanceCount !== "number") {
      AIBinarySentience._instanceCount = 0;
    }
    return AIBinarySentience._instanceCount++;
  }

  static getInstanceCount() {
    return AIBinarySentience._instanceCount || 0;
  }

  // -------------------------------------------------------
  //  WINDOW ROLLING
  // -------------------------------------------------------

  _rollWindow(now) {
    if (now - this._windowStart >= this.windowMs) {
      this._windowStart = now;
      this._windowEmissions = 0;
    }
  }

  // -------------------------------------------------------
  //  SELF ARTERY SNAPSHOT (v7, map-free)
// -------------------------------------------------------

  _computeSelfArterySnapshot() {
    const organIds = this.getOrgans() || [];
    const organCount = Array.isArray(organIds) ? organIds.length : 0;

    const topologySizeRaw = this.getTopologySize();
    const topologySize =
      typeof topologySizeRaw === "number" && topologySizeRaw >= 0
        ? topologySizeRaw
        : 0;

    const quarantined = this.getQuarantined() || [];
    const quarantinedCount = Array.isArray(quarantined)
      ? quarantined.length
      : 0;

    const vitals = this.getVitals() || {};
    const vitalsMetrics = vitals.metrics || {};
    const vitalStability =
      typeof vitals.stability === "number"
        ? clamp01(vitals.stability)
        : 0;

    const immunityRisk = clamp01(this.getImmunityRisk() || 0);

    const now = Date.now();
    this._rollWindow(now);

    const elapsedMs = Math.max(1, now - this._windowStart);
    const emissionRatePerSec = (this._windowEmissions / elapsedMs) * 1000;

    const instanceCount = AIBinarySentience.getInstanceCount();

    const artery = computeSelfArteryV7({
      organCount,
      topologySize,
      quarantinedCount,
      emissionRatePerSec,
      instanceCount,
      immunityRisk,
      vitalStability
    });

    this.selfArterySnapshot = artery;

    return {
      artery,
      organIds,
      quarantined,
      vitalsMetrics
    };
  }

  // -------------------------------------------------------
  //  PUBLIC: SELF ARTERY
  // -------------------------------------------------------

  getSelfArtery() {
    const { artery } = this._computeSelfArterySnapshot();
    return artery;
  }

  // -------------------------------------------------------
  //  PUBLIC: SELF MODEL (v30, map-free)
// -------------------------------------------------------

  generateSelfModel() {
    const { artery, organIds, quarantined, vitalsMetrics } =
      this._computeSelfArterySnapshot();

    const genomeFingerprint = this.getGenomeFingerprint() || "0";

    const binary = {
      throughput: artery.throughput,
      throughputBucket: artery.throughputBucket,
      pressure: artery.pressure,
      pressureBucket: artery.pressureBucket,
      cost: artery.cost,
      costBucket: artery.costBucket,
      budget: artery.budget,
      budgetBucket: artery.budgetBucket,
      organCount: artery.organCount,
      topologySize: artery.topologySize,
      quarantinedCount: artery.quarantinedCount,
      emissionRatePerSec: artery.emissionRatePerSec,
      harmonicEmission: artery.harmonicEmission,
      quarantineRatio: artery.quarantineRatio,
      immunityRisk: artery.immunityRisk,
      immunityBucket: artery.immunityBucket,
      stability: artery.stability,
      stabilityBucket: artery.stabilityBucket
    };

    const self = {
      meta: SentienceMeta,
      instanceIndex: this.instanceIndex,
      instanceCount: AIBinarySentience.getInstanceCount(),
      organs: organIds,
      topologySize: artery.topologySize, // size only, no map
      genomeFingerprint,
      quarantined,
      vitals: vitalsMetrics,
      binary
    };

    this._trace("self-model:generated", {
      organs: organIds.length,
      quarantined: quarantined.length,
      pressure: artery.pressure,
      budgetBucket: artery.budgetBucket,
      stabilityBucket: artery.stabilityBucket
    });

    return self;
  }

  // -------------------------------------------------------
  //  SENTIENCE PACKET + EMIT
  // -------------------------------------------------------

  generateSentiencePacket() {
    const self = this.generateSelfModel();

    const payload = {
      type: "binary-sentience-v30",
      timestamp: Date.now(),
      self
    };

    const json = JSON.stringify(payload);
    const bits = this.encoder.encode(json);

    const packet = {
      ...payload,
      bits,
      bitLength: bits.length
    };

    this._trace("sentience:packet", { bits: packet.bitLength });

    return packet;
  }

  emitSentience() {
    const now = Date.now();
    this._rollWindow(now);
    this._totalEmissions = (this._totalEmissions || 0) + 1;
    this._windowEmissions++;

    const packet = this.generateSentiencePacket();

    if (this.pipeline) this.pipeline.run(packet.bits);
    if (this.reflex) this.reflex.run(packet.bits);
    if (this.logger && typeof this.logger.logBinary === "function") {
      this.logger.logBinary(packet.bits, { source: "sentience-v30" });
    }

    this._trace("sentience:emitted", {
      bits: packet.bitLength,
      totalEmissions: this._totalEmissions,
      windowEmissions: this._windowEmissions
    });

    return packet;
  }

  // -------------------------------------------------------
  //  TRACE
  // -------------------------------------------------------

  _trace(event, payload) {
    if (!this.trace) return;
    console.log(`[${this.id}#${this.instanceIndex}] ${event}`, payload);
  }
}

// ---------------------------------------------------------------------------
//  FACTORY + CJS EXPORTS
// ---------------------------------------------------------------------------

export function createAIBinarySentience(config) {
  return new AIBinarySentience(config);
}

if (typeof module !== "undefined") {
  module.exports = {
    SentienceMeta,
    AIBinarySentience,
    createAIBinarySentience
  };
}
