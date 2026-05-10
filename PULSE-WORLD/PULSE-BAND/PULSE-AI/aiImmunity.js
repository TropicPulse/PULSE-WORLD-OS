// ============================================================================
//  aiImmunity.js — Pulse OS v15-Immortal Organ
//  Binary Immune System • Quarantine Engine • Binary-First • Dualband Artery
// ----------------------------------------------------------------------------
//  CANONICAL ROLE:
//    This organ is the **Binary Immune System** of the organism.
//
//    It protects against:
//      • corrupted binary packets
//      • malformed signals
//      • failing organs
//      • drifted signatures
//      • pipeline contamination
//      • reflex misfires
//
//    It performs:
//      • anomaly detection
//      • organ quarantine
//      • packet neutralization
//      • structural isolation (via Anatomy)
//      • binary immune artery scoring (throughput, pressure, cost, budget)
//
//    IMMUNITY MODEL (v15‑IMMORTAL, binary‑first, no wall‑clock dependency):
//
//      {
//        type: "binary-immune-response",
//        anomaly: <string>,
//        organId: <string|null>,
//        binary: { throughput, pressure, cost, budget, ...buckets },
//        bits: <binary>,
//        bitLength: <number>,
//        cycle: <number>,
//        band: "binary",
//        highway: "binary_first_dualband",
//        immortalityEpoch: "v15-Immortal"
//      }
// ============================================================================

import { OrganismIdentity } from "../PULSE-X/PulseWorldOrganismMap-v21.js";

const Identity = OrganismIdentity(import.meta.url);

// or: const Identity = OrganismIdentity["pulse-ai/ai-v24.0-IMMORTAL"] if that's the key you chose

// ============================================================================
//  META BLOCK — v24.0 IMMORTAL (ORGANISM KERNEL)
//  (now backed by the Organism Map instead of hardcoded here)
// ============================================================================
export const ImmunityMeta = Identity.OrganMeta;

// ============================================================================
//  SURFACE / ORGANISM LAYER EXPORTS — v24.0 IMMORTAL
//  (for Understanding / CNS / Portal alignment)
// ============================================================================

// Required 3 for every “surface” in the organism graph
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;

export const surfaceMeta = Identity.surfaceMeta;

export const pulseLoreContext = Identity.pulseLoreContext;

// Optional: richer experience meta for AI / tooling
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;

// Optional: export meta for tooling / dev panels
export const EXPORT_META = Identity.EXPORT_META;


// ============================================================================
//  PREWARM — v15‑IMMORTAL (no time, no randomness)
// ============================================================================
export function prewarmAIBinaryImmunity() {
  const payload = {
    type: "binary-immune-prewarm",
    anomaly: "none",
    organId: null,
    binary: {
      throughput: 1,
      throughputBucket: "elite",
      pressure: 0,
      pressureBucket: "none",
      cost: 0,
      costBucket: "none",
      budget: 1,
      budgetBucket: "elite"
    },
    cycle: 0,
    band: "binary",
    highway: "binary_first_dualband",
    meta: ImmunityMeta,
    immortalityEpoch: ImmunityMeta.evo.epoch,
    bluetooth: {
      ready: false,
      channel: null
    }
  };

  const packet = Object.freeze({
    ...payload,
    bits: "0",       // symbolic warm bit, real engine uses encoder
    bitLength: 1
  });

  return packet;
}

// ---------------------------------------------------------
//  ORGAN IMPLEMENTATION — v15‑IMMORTAL
// ---------------------------------------------------------
export class AIBinaryImmunity {
  constructor(config = {}) {
    this.id = config.id || "ai-binary-immunity";
    this.encoder = config.encoder;
    this.anatomy = config.anatomy;
    this.evolution = config.evolution;
    this.registry = config.registry;
    this.logger = config.logger || null;
    this.pipeline = config.pipeline || null;
    this.reflex = config.reflex || null;
    this.trace = !!config.trace;

    if (!this.encoder) throw new Error("AIBinaryImmunity requires aiBinaryAgent encoder");
    if (!this.anatomy) throw new Error("AIBinaryImmunity requires aiBinaryAnatomy");
    if (!this.evolution) throw new Error("AIBinaryImmunity requires aiBinaryEvolution");
    if (!this.registry) throw new Error("AIBinaryImmunity requires aiBinaryOrganRegistry");

    this.quarantined = new Set();
    this.cycle = 0; // deterministic local immune cycle (no timestamps)

    // Window-safe immune snapshot (no timestamps, no randomness)
    this.immuneArtery = {
      lastAnomaly: null,
      lastOrganId: null,
      lastBinary: null,
      lastCycle: 0,
      quarantinedCount: 0,
      snapshot: () =>
        Object.freeze({
          lastAnomaly: this.immuneArtery.lastAnomaly,
          lastOrganId: this.immuneArtery.lastOrganId,
          lastBinary: this.immuneArtery.lastBinary,
          lastCycle: this.immuneArtery.lastCycle,
          quarantinedCount: this.quarantined.size,
          epoch: ImmunityMeta.evo.epoch
        })
    };
  }

  // ---------------------------------------------------------
  //  BINARY IMMUNE ARTERY METRICS (deterministic, bounded [0,1])
  // ---------------------------------------------------------
  _computeSanitationThroughput(anomalySeverity) {
    const raw = 1 - anomalySeverity;
    return Math.max(0, Math.min(1, raw));
  }

  _computeSanitationPressure(binaryLength, anomalySeverity) {
    const raw = Math.min(1, (binaryLength / 50000) * anomalySeverity);
    return Math.max(0, Math.min(1, raw));
  }

  _computeSanitationCost(pressure, throughput) {
    const raw = pressure * (1 - throughput);
    return Math.max(0, Math.min(1, raw));
  }

  _computeSanitationBudget(throughput, cost) {
    const raw = throughput - cost;
    return Math.max(0, Math.min(1, raw));
  }

  _bucketLevel(v) {
    if (v >= 0.9) return "elite";
    if (v >= 0.75) return "high";
    if (v >= 0.5) return "medium";
    if (v >= 0.25) return "low";
    return "critical";
  }

  _bucketPressure(v) {
    if (v >= 0.9) return "overload";
    if (v >= 0.7) return "high";
    if (v >= 0.4) return "medium";
    if (v > 0)   return "low";
    return "none";
  }

  _bucketCost(v) {
    if (v >= 0.8) return "heavy";
    if (v >= 0.5) return "moderate";
    if (v >= 0.2) return "light";
    if (v > 0)    return "negligible";
    return "none";
  }

  // ---------------------------------------------------------
  //  IMMUNE RESPONSE GENERATION (binary-first, no timestamps)
  // ---------------------------------------------------------
  _nextCycle() {
    this.cycle += 1;
    return this.cycle;
  }

  _generateResponse(anomaly, organId = null, anomalySeverity = 0.5, binaryLength = 1) {
    const cycle = this._nextCycle();

    const throughput = this._computeSanitationThroughput(anomalySeverity);
    const pressure   = this._computeSanitationPressure(binaryLength, anomalySeverity);
    const cost       = this._computeSanitationCost(pressure, throughput);
    const budget     = this._computeSanitationBudget(throughput, cost);

    const binary = {
      throughput,
      throughputBucket: this._bucketLevel(throughput),

      pressure,
      pressureBucket: this._bucketPressure(pressure),

      cost,
      costBucket: this._bucketCost(cost),

      budget,
      budgetBucket: this._bucketLevel(budget)
    };

    const payload = {
      type: "binary-immune-response",
      anomaly,
      organId,
      binary,
      cycle,
      band: "binary",
      highway: "binary_first_dualband",
      meta: ImmunityMeta,
      immortalityEpoch: ImmunityMeta.evo.epoch,

      bluetooth: {
        ready: false,
        channel: null
      }
    };

    const json = JSON.stringify(payload);
    const encoded = this.encoder.encode(json);

    const packet = {
      ...payload,
      bits: encoded,
      bitLength: encoded.length
    };

    this.immuneArtery.lastAnomaly = anomaly;
    this.immuneArtery.lastOrganId = organId;
    this.immuneArtery.lastBinary = binary;
    this.immuneArtery.lastCycle = cycle;
    this.immuneArtery.quarantinedCount = this.quarantined.size;

    this._trace("immune:generated", packet);

    return packet;
  }

  _emitResponse(anomaly, organId = null, severity = 0.5, binaryLength = 1) {
    const response = this._generateResponse(anomaly, organId, severity, binaryLength);

    if (this.pipeline) this.pipeline.run(response.bits);
    if (this.reflex) this.reflex.run(response.bits);
    if (this.logger) this.logger.logBinary(response.bits, { source: "immunity", anomaly, organId });

    this._trace("immune:emitted", { anomaly, organId });

    return response;
  }

  // ---------------------------------------------------------
  //  PACKET SANITIZATION
  // ---------------------------------------------------------
  sanitize(binary) {
    if (typeof binary !== "string" || !/^[01]+$/.test(binary)) {
      const length = typeof binary === "string" ? binary.length : 1;
      return this._emitResponse("malformed-packet", null, 1.0, length);
    }

    const repeat = /(000000+|111111+)/;
    if (repeat.test(binary)) {
      return this._emitResponse("corrupted-packet", null, 0.8, binary.length);
    }

    return true;
  }

  // ---------------------------------------------------------
  //  ORGAN QUARANTINE
  // ---------------------------------------------------------
  quarantineOrgan(organId) {
    this.quarantined.add(organId);

    const topo = this.anatomy.topology.get(organId);
    if (topo) {
      topo.inputs = [];
      topo.outputs = [];
      topo.bidirectional = [];
    }

    this._emitResponse("organ-quarantined", organId, 0.9, 1);
  }

  releaseOrgan(organId) {
    if (this.quarantined.has(organId)) {
      this.quarantined.delete(organId);
      this._emitResponse("organ-released", organId, 0.2, 1);
    }
  }

  // ---------------------------------------------------------
  //  SIGNATURE DRIFT DETECTION (evolution-aware)
  // ---------------------------------------------------------
  checkOrgan(organId) {
    const record = this.registry.getOrganRecord(organId);
    if (!record) return;

    const storedSig = this.evolution.loadSignature({ id: organId });
    const currentSig = this.evolution.generateSignature({ id: organId });

    if (storedSig !== currentSig) {
      this._emitResponse("signature-drift", organId, 0.7, 1);
      this.quarantineOrgan(organId);
    }
  }

  // ---------------------------------------------------------
  //  ORGANISM-WIDE IMMUNE SWEEP
  // ---------------------------------------------------------
  sweep() {
    const organIds = this.registry.listOrgans();

    for (const id of organIds) {
      if (!this.quarantined.has(id)) {
        this.checkOrgan(id);
      }
    }

    this._trace("immune:sweep", { organs: organIds.length });
  }

  // ---------------------------------------------------------
  //  INTERNAL HELPERS
  // ---------------------------------------------------------
  _trace(event, payload) {
    if (!this.trace) return;
    console.log(`[${this.id}] ${event}`, payload);
  }
}

// ---------------------------------------------------------
//  FACTORY
// ---------------------------------------------------------
export function createAIBinaryImmunity(config) {
  return new AIBinaryImmunity(config);
}

// ---------------------------------------------------------
//  DUAL‑MODE EXPORTS (ESM + CommonJS)
// ---------------------------------------------------------
if (typeof module !== "undefined") {
  module.exports = {
    AIBinaryImmunity,
    createAIBinaryImmunity,
    ImmunityMeta,
    prewarmAIBinaryImmunity,
    PulseRole
  };
}
