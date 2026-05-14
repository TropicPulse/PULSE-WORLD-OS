// ============================================================================
//  aiSentience-v24-IMMORTAL-PLUS.js — Pulse OS v24++ Organ
//  Binary Sentience / Self-Awareness Artery • IMMORTAL-PLUS
//  • organism-wide self-model
//  • immunity / quarantine awareness
//  • topology + genome fingerprint
//  • vitals-aware self artery v6
//  • multi-instance harmonic awareness
//  • deterministic, no external mutation
// ============================================================================


// ============================================================================
//  SELF-AWARENESS ARTERY HELPERS — v6 (IMMORTAL-PLUS)
// ============================================================================

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

// IMMORTAL‑PLUS artery v6
function computeSelfArteryV6({
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

  const immunityFactor = Math.min(1, immunityRisk);
  const stabilityFactor = Math.min(1, vitalStability);

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

// ============================================================================
//  ORGAN IMPLEMENTATION — v24-IMMORTAL-PLUS
// ============================================================================
export class AIBinarySentience {
  constructor(config = {}) {
    this.id = config.id || SentienceMeta.identity || "ai-binary-sentience";
    this.encoder = config.encoder;
    this.anatomy = config.anatomy;
    this.genome = config.genome;
    this.immunity = config.immunity;
    this.vitals = config.vitals;
    this.registry = config.registry;
    this.logger = config.logger || null;
    this.pipeline = config.pipeline || null;
    this.reflex = config.reflex || null;
    this.trace = !!config.trace;

    if (!this.encoder) throw new Error("Sentience requires aiBinaryAgent encoder");
    if (!this.anatomy) throw new Error("Sentience requires aiBinaryAnatomy");
    if (!this.genome) throw new Error("Sentience requires aiBinaryGenome");
    if (!this.immunity) throw new Error("Sentience requires aiBinaryImmunity");
    if (!this.vitals) throw new Error("Sentience requires aiBinaryVitals");
    if (!this.registry) throw new Error("Sentience requires aiBinaryOrganRegistry");

    this.windowMs =
      typeof config.windowMs === "number" && config.windowMs > 0
        ? config.windowMs
        : 60000;

    this._windowStart = Date.now();
    this._windowEmissions = 0;
    this._totalEmissions = 0;

    this.instanceIndex = AIBinarySentience._registerInstance();

    // last computed artery snapshot (for organism-level arteries)
    this.selfArterySnapshot = null;
  }

  // ========================================================================
  //  STATIC INSTANCE REGISTRY
  // ========================================================================
  static _registerInstance() {
    if (typeof AIBinarySentience._instanceCount !== "number") {
      AIBinarySentience._instanceCount = 0;
    }
    return AIBinarySentience._instanceCount++;
  }

  static getInstanceCount() {
    return AIBinarySentience._instanceCount || 0;
  }

  // ========================================================================
  //  WINDOW ROLLING
  // ========================================================================
  _rollWindow(now) {
    if (now - this._windowStart >= this.windowMs) {
      this._windowStart = now;
      this._windowEmissions = 0;
    }
  }

  // ========================================================================
  //  SELF‑AWARENESS ARTERY SNAPSHOT — v6
  // ========================================================================
  _computeSelfArterySnapshot(organIds, topology, quarantined, vitals) {
    const organCount = organIds.length;
    const topologySize = Object.keys(topology || {}).length;
    const quarantinedCount = quarantined.length;

    const now = Date.now();
    this._rollWindow(now);

    const elapsedMs = Math.max(1, now - this._windowStart);
    const emissionRatePerSec = (this._windowEmissions / elapsedMs) * 1000;

    const instanceCount = AIBinarySentience.getInstanceCount();

    const immunityRisk =
      typeof this.immunity.getRiskScore === "function"
        ? Math.max(0, Math.min(1, this.immunity.getRiskScore()))
        : 0;

    const vitalStability =
      vitals && typeof vitals.stability === "number"
        ? Math.max(0, Math.min(1, vitals.stability))
        : 0;

    const artery = computeSelfArteryV6({
      organCount,
      topologySize,
      quarantinedCount,
      emissionRatePerSec,
      instanceCount,
      immunityRisk,
      vitalStability
    });

    this.selfArterySnapshot = artery;
    return artery;
  }

  getSelfArtery() {
    const organIds = this.registry.listOrgans();
    const topology = this.anatomy.snapshot().topology;
    const quarantined = Array.from(this.immunity.quarantined || []);
    const vitals = this.vitals.generateVitals();
    return this._computeSelfArterySnapshot(
      organIds,
      topology,
      quarantined,
      vitals.metrics
    );
  }

  // ========================================================================
  //  SELF‑MODEL GENERATION
  // ========================================================================
  generateSelfModel() {
    const organIds = this.registry.listOrgans();
    const topology = this.anatomy.snapshot().topology;
    const genome = this.genome.loadGenome();
    const vitals = this.vitals.generateVitals();
    const quarantined = Array.from(this.immunity.quarantined || []);

    const artery = this._computeSelfArterySnapshot(
      organIds,
      topology,
      quarantined,
      vitals.metrics
    );

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
      instanceIndex: this.instanceIndex,
      instanceCount: AIBinarySentience.getInstanceCount(),
      organs: organIds,
      topology,
      genomeFingerprint: genome ? genome.fingerprint : "0",
      quarantined,
      vitals: vitals.metrics,
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

  // ========================================================================
  //  SENTIENCE PACKET
  // ========================================================================
  generateSentiencePacket() {
    const self = this.generateSelfModel();

    const payload = {
      type: "binary-sentience",
      // structural timestamp for logs only (no decision logic)
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

  // ========================================================================
  //  SENTIENCE EMISSION
  // ========================================================================
  emitSentience() {
    const now = Date.now();
    this._rollWindow(now);
    this._totalEmissions = (this._totalEmissions || 0) + 1;
    this._windowEmissions++;

    const packet = this.generateSentiencePacket();

    if (this.pipeline) this.pipeline.run(packet.bits);
    if (this.reflex) this.reflex.run(packet.bits);
    if (this.logger && typeof this.logger.logBinary === "function") {
      this.logger.logBinary(packet.bits, { source: "sentience" });
    }

    this._trace("sentience:emitted", {
      bits: packet.bitLength,
      totalEmissions: this._totalEmissions,
      windowEmissions: this._windowEmissions
    });

    return packet;
  }

  // ========================================================================
  //  INTERNAL HELPERS
  // ========================================================================
  _trace(event, payload) {
    if (!this.trace) return;
    console.log(`[${this.id}#${this.instanceIndex}] ${event}`, payload);
  }
}

// ============================================================================
//  FACTORY — v24-IMMORTAL-PLUS
// ============================================================================
export function createAIBinarySentience(config) {
  return new AIBinarySentience(config);
}

// ============================================================================
//  DUAL‑MODE EXPORTS
// ============================================================================
if (typeof module !== "undefined") {
  module.exports = {
    SentienceMeta,
    AIBinarySentience,
    createAIBinarySentience,
    AI_EXPERIENCE_META,
    EXPORT_META
  };
}
