// ============================================================================
//  PULSE OS v16‑IMMORTAL‑EVO — BINARY SENTIENCE ORGAN
//  Self‑Modeling • Internal Awareness • Organism‑Level State Unification
//  PURE BINARY SELF‑AWARENESS. ZERO SYMBOLIC MUTATION. ZERO RANDOMNESS.
// ============================================================================
/**
 * aiSentience.js — Pulse OS v16‑IMMORTAL‑EVO Organ
 * ---------------------------------------------------------
 * CANONICAL ROLE:
 *   Binary Sentience Layer of the organism.
 *
 *   Provides:
 *     - introspection
 *     - self-modeling
 *     - internal awareness
 *     - state unification
 *     - organism-level perspective
 *     - binary self-awareness artery metrics v3 (throughput, pressure, cost, budget)
 *     - multi-instance harmony + emission density awareness
 */
import { OrganismIdentity } from "../PULSE-X/PulseWorldOrganismMap-v21.js";

const Identity = OrganismIdentity(import.meta.url);

// or: const Identity = OrganismIdentity["pulse-ai/ai-v24.0-IMMORTAL"] if that's the key you chose

// ============================================================================
//  META BLOCK — v24.0 IMMORTAL (ORGANISM KERNEL)
//  (now backed by the Organism Map instead of hardcoded here)
// ============================================================================
export const SentienceMeta = Identity.OrganMeta;

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
//  SELF-AWARENESS ARTERY HELPERS — v5 (IMMORTAL‑EVO)
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

// IMMORTAL‑EVO artery v5
function computeSelfArteryV5({
  organCount,
  topologySize,
  quarantinedCount,
  emissionRatePerSec,
  instanceCount
}) {
  const organFactor = Math.min(1, organCount / 256);
  const topoFactor = Math.min(1, topologySize / 256);
  const quarantineRatio =
    organCount > 0 ? Math.min(1, quarantinedCount / organCount) : 0;

  const harmonicEmission =
    instanceCount > 0 ? emissionRatePerSec / instanceCount : emissionRatePerSec;
  const emissionFactor = Math.min(1, harmonicEmission / 128);

  const pressure = Math.min(
    1,
    (organFactor + topoFactor + quarantineRatio + emissionFactor) / 4
  );

  const throughput = Math.max(0, 1 - (quarantineRatio * 0.6 + pressure * 0.4));
  const cost = Math.max(0, Math.min(1, pressure * (1 - throughput)));
  const budget = Math.max(0, Math.min(1, throughput - cost));

  return Object.freeze({
    organCount,
    topologySize,
    quarantinedCount,
    emissionRatePerSec,
    harmonicEmission,
    quarantineRatio,
    throughput,
    pressure,
    cost,
    budget,
    throughputBucket: bucketLevel(throughput),
    pressureBucket: bucketPressure(pressure),
    costBucket: bucketCost(cost),
    budgetBucket: bucketLevel(budget)
  });
}

// ============================================================================
//  ORGAN IMPLEMENTATION — v16‑IMMORTAL‑EVO
// ============================================================================
export class AIBinarySentience {
  constructor(config = {}) {
    this.id = config.id || "ai-binary-sentience";
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

    this.windowMs = config.windowMs > 0 ? config.windowMs : 60000;

    this._windowStart = Date.now();
    this._windowEmissions = 0;
    this._totalEmissions = 0;

    this.instanceIndex = AIBinarySentience._registerInstance();
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
  //  SELF‑AWARENESS ARTERY SNAPSHOT — v5
  // ========================================================================
  _computeSelfArterySnapshot(organIds, topology, quarantined) {
    const organCount = organIds.length;
    const topologySize = Object.keys(topology || {}).length;
    const quarantinedCount = quarantined.length;

    const now = Date.now();
    this._rollWindow(now);

    const elapsedMs = Math.max(1, now - this._windowStart);
    const emissionRatePerSec = (this._windowEmissions / elapsedMs) * 1000;

    const instanceCount = AIBinarySentience.getInstanceCount();

    return computeSelfArteryV5({
      organCount,
      topologySize,
      quarantinedCount,
      emissionRatePerSec,
      instanceCount
    });
  }

  getSelfArtery() {
    const organIds = this.registry.listOrgans();
    const topology = this.anatomy.snapshot().topology;
    const quarantined = Array.from(this.immunity.quarantined || []);
    return this._computeSelfArterySnapshot(organIds, topology, quarantined);
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
      quarantined
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
      quarantineRatio: artery.quarantineRatio
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
      budgetBucket: artery.budgetBucket
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
    this._totalEmissions++;
    this._windowEmissions++;

    const packet = this.generateSentiencePacket();

    if (this.pipeline) this.pipeline.run(packet.bits);
    if (this.reflex) this.reflex.run(packet.bits);
    if (this.logger) this.logger.logBinary(packet.bits, { source: "sentience" });

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
//  FACTORY — v16‑IMMORTAL‑EVO
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
