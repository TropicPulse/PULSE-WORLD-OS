// ============================================================================
//  aiImmunity-v24.js — Pulse OS v24.0‑IMMORTAL++ Organ
//  Binary Immune System • Quarantine Engine • Dualband Artery • Packet‑Aware
//  PURE BINARY. ZERO NETWORK. ZERO RANDOMNESS IN LOGIC PATHS.
// ============================================================================

import { OrganismIdentity } from "../PULSE-X/PULSE-WORLD-MAP.js
";

const Identity = OrganismIdentity(import.meta.url);

// ============================================================================
//  META BLOCK — v24.0 IMMORTAL (ORGANISM KERNEL)
//  (backed by the Organism Map instead of hardcoded here)
// ============================================================================
export const ImmunityMeta = Identity.OrganMeta;

// ============================================================================
//  SURFACE / ORGANISM LAYER EXPORTS — v24.0 IMMORTAL
// ============================================================================
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;

export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;

export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// ============================================================================
//  GLOBAL IMMUNE REGISTRY — window‑safe, read‑only from outside
// ============================================================================
const _globalImmuneRegistry = new Map();
/**
 * Registry key: `${id}#${instanceIndex}`
 */
function _registryKey(id, instanceIndex) {
  return `${id || ImmunityMeta.identity}#${instanceIndex}`;
}

export function getGlobalImmuneState() {
  const out = {};
  for (const [k, v] of _globalImmuneRegistry.entries()) {
    out[k] = v;
  }
  return out;
}

// ============================================================================
//  PACKET EMITTER — deterministic, immune‑scoped
// ============================================================================
function emitImmunePacket(type, payload) {
  return Object.freeze({
    meta: ImmunityMeta,
    packetType: `immune-${type}`,
    timestamp: Date.now(),
    epoch: ImmunityMeta.evo.epoch,
    ...payload
  });
}

// ============================================================================
//  PREWARM — v24.0‑IMMORTAL++ (dualband‑aware, no randomness)
// ============================================================================
export function prewarmAIBinaryImmunity(
  dualBand = null,
  { trace = false } = {}
) {
  const quarantinedCount =
    dualBand?.binary?.immunity?.quarantinedCount ??
    dualBand?.symbolic?.immunity?.quarantinedCount ??
    0;

  const pressure =
    dualBand?.binary?.metabolic?.pressure ??
    dualBand?.binary?.pressure ??
    0;

  const load =
    dualBand?.binary?.metabolic?.load ??
    dualBand?.binary?.load ??
    0;

  const baseBinary = {
    throughput: 1,
    throughputBucket: "elite",
    pressure,
    pressureBucket: pressure === 0 ? "none" : pressure >= 0.9 ? "overload" : pressure >= 0.7 ? "high" : pressure >= 0.4 ? "medium" : "low",
    cost: 0,
    costBucket: "none",
    budget: 1,
    budgetBucket: "elite"
  };

  const packet = emitImmunePacket("prewarm", {
    type: "binary-immune-prewarm",
    anomaly: "none",
    organId: null,
    binary: baseBinary,
    cycle: 0,
    band: "binary",
    highway: "binary_first_dualband",
    immortalityEpoch: ImmunityMeta.evo.epoch,
    quarantinedCount,
    bluetooth: {
      ready: false,
      channel: null
    }
  });

  if (trace) {
    console.log("[aiBinaryImmunity] prewarm", packet);
  }

  return packet;
}

// ============================================================================
//  ORGAN IMPLEMENTATION — v24.0‑IMMORTAL++
// ============================================================================
export class AIBinaryImmunity {
  constructor(config = {}) {
    this.id = config.id || ImmunityMeta.identity || "ai-binary-immunity";

    this.encoder = config.encoder;
    this.anatomy = config.anatomy;
    this.evolution = config.evolution;
    this.registry = config.registry;
    this.logger = config.logger || null;
    this.pipeline = config.pipeline || null;
    this.reflex = config.reflex || null;
    this.trace = !!config.trace;

    this.dualBand = config.dualBand || null;

    if (!this.encoder) throw new Error("AIBinaryImmunity requires aiBinaryAgent encoder");
    if (!this.anatomy) throw new Error("AIBinaryImmunity requires aiBinaryAnatomy");
    if (!this.evolution) throw new Error("AIBinaryImmunity requires aiBinaryEvolution");
    if (!this.registry) throw new Error("AIBinaryImmunity requires aiBinaryOrganRegistry");

    this.quarantined = new Set();
    this.cycle = 0; // deterministic local immune cycle (no wall‑clock in logic)

    // Instance index for registry
    this.instanceIndex = AIBinaryImmunity._registerInstance();

    // Window‑safe immune artery snapshot
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
          epoch: ImmunityMeta.evo.epoch,
          instanceIndex: this.instanceIndex,
          instanceCount: AIBinaryImmunity.getInstanceCount()
        })
    };

    this._updateGlobalRegistry();
  }

  // --------------------------------------------------------------------------
  //  STATIC INSTANCE REGISTRY
  // --------------------------------------------------------------------------
  static _registerInstance() {
    if (typeof AIBinaryImmunity._instanceCount !== "number") {
      AIBinaryImmunity._instanceCount = 0;
    }
    const idx = AIBinaryImmunity._instanceCount;
    AIBinaryImmunity._instanceCount += 1;
    return idx;
  }

  static getInstanceCount() {
    return typeof AIBinaryImmunity._instanceCount === "number"
      ? AIBinaryImmunity._instanceCount
      : 0;
  }

  _updateGlobalRegistry() {
    const key = _registryKey(this.id, this.instanceIndex);
    _globalImmuneRegistry.set(key, {
      artery: this.immuneArtery.snapshot()
    });
  }

  // --------------------------------------------------------------------------
  //  BINARY IMMUNE ARTERY METRICS (deterministic, bounded [0,1])
  // --------------------------------------------------------------------------
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

  // --------------------------------------------------------------------------
  //  IMMUNE RESPONSE GENERATION (binary‑first, no randomness)
  // --------------------------------------------------------------------------
  _nextCycle() {
    this.cycle += 1;
    return this.cycle;
  }

  _buildBinaryArtery(anomalySeverity, binaryLength) {
    const throughput = this._computeSanitationThroughput(anomalySeverity);
    const pressure   = this._computeSanitationPressure(binaryLength, anomalySeverity);
    const cost       = this._computeSanitationCost(pressure, throughput);
    const budget     = this._computeSanitationBudget(throughput, cost);

    return {
      throughput,
      throughputBucket: this._bucketLevel(throughput),

      pressure,
      pressureBucket: this._bucketPressure(pressure),

      cost,
      costBucket: this._bucketCost(cost),

      budget,
      budgetBucket: this._bucketLevel(budget)
    };
  }

  _generateResponse(anomaly, organId = null, anomalySeverity = 0.5, binaryLength = 1) {
    const cycle = this._nextCycle();
    const binary = this._buildBinaryArtery(anomalySeverity, binaryLength);

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

    this._updateGlobalRegistry();
    this._trace("immune:generated", packet);

    return packet;
  }

  _emitResponse(anomaly, organId = null, severity = 0.5, binaryLength = 1) {
    const response = this._generateResponse(anomaly, organId, severity, binaryLength);

    if (this.pipeline) this.pipeline.run(response.bits);
    if (this.reflex) this.reflex.run(response.bits);
    if (this.logger) this.logger.logBinary(response.bits, { source: "immunity", anomaly, organId });

    this._trace("immune:emitted", { anomaly, organId });

    return emitImmunePacket("response", {
      anomaly,
      organId,
      severity,
      binaryLength,
      response
    });
  }

  // --------------------------------------------------------------------------
  //  PACKET SANITIZATION — binary‑first
  // --------------------------------------------------------------------------
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

  // --------------------------------------------------------------------------
  //  ORGAN QUARANTINE — evolution‑aware, anatomy‑safe
  // --------------------------------------------------------------------------
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

  // --------------------------------------------------------------------------
  //  SIGNATURE DRIFT DETECTION — evolution‑aware
  // --------------------------------------------------------------------------
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

  // --------------------------------------------------------------------------
  //  ORGANISM‑WIDE IMMUNE SWEEP
  // --------------------------------------------------------------------------
  sweep() {
    const organIds = this.registry.listOrgans();

    for (const id of organIds) {
      if (!this.quarantined.has(id)) {
        this.checkOrgan(id);
      }
    }

    this._trace("immune:sweep", { organs: organIds.length });
    return emitImmunePacket("sweep", {
      organCount: organIds.length,
      quarantinedCount: this.quarantined.size,
      artery: this.immuneArtery.snapshot()
    });
  }

  // --------------------------------------------------------------------------
  //  WINDOW‑SAFE ARTERY SNAPSHOT
  // --------------------------------------------------------------------------
  getImmuneArterySnapshot() {
    return this.immuneArtery.snapshot();
  }

  // --------------------------------------------------------------------------
  //  INTERNAL HELPERS
  // --------------------------------------------------------------------------
  _trace(event, payload) {
    if (!this.trace) return;
    console.log(`[${this.id}#${this.instanceIndex}] ${event}`, payload);
  }
}

// ============================================================================
//  FACTORY
// ============================================================================
export function createAIBinaryImmunity(config) {
  return new AIBinaryImmunity(config);
}

// ============================================================================
//  DUAL‑MODE EXPORTS (ESM + CommonJS)
// ============================================================================
if (typeof module !== "undefined") {
  module.exports = {
    AIBinaryImmunity,
    createAIBinaryImmunity,
    ImmunityMeta,
    prewarmAIBinaryImmunity,
    PulseRole,
    getGlobalImmuneState
  };
}
