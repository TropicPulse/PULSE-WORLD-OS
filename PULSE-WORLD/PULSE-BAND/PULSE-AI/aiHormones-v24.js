// ============================================================================
//  aiHormones-v24.js — Pulse OS v24‑IMMORTAL‑ADVANTAGE++
//  Binary Hormone System • Global Modulation • Tri‑Band Fusion • Artery‑First
//  Window-Safe • Registry-Aware • Governor/Membrane-Ready • Drift-Aware
// ============================================================================
//
//  ROLE (v24++):
//    • Slow-acting global modulation for the organism.
//    • Feeds hormone packets into pipelines/reflexes/governor membranes.
//    • Pure binary → no symbolic interpretation.
//    • Tri-band fusion: metabolic + sentience + external binaryVitals.
//    • Drift-aware: detects hormone-level deltas between snapshots.
//    • Global registry v2: multi-instance, artery-first, window-safe.
//    • Prewarm emits full hormone+artery summary.
//    • Deterministic buckets, deterministic cost/pressure/throughput.
// ============================================================================

import { OrganismIdentity } from "../PULSE-X/PULSE-WORLD-MAP.js
";
const Identity = OrganismIdentity(import.meta.url);

// ============================================================================
//  META BLOCK — v24 IMMORTAL ADVANTAGE++
// ============================================================================
export const HormonesMeta = Identity.OrganMeta;

export const pulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;

export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// ============================================================================
//  GLOBAL HORMONE REGISTRY v2 — read-only from outside
// ============================================================================
const _globalHormoneRegistry = new Map();

function _registryKey(id, instanceIndex) {
  return `${id || HormonesMeta.identity}#${instanceIndex}`;
}

export function getGlobalHormoneState() {
  const out = {};
  for (const [k, v] of _globalHormoneRegistry.entries()) {
    out[k] = v;
  }
  return out;
}

// ============================================================================
//  PACKET EMITTER — deterministic, hormone-scoped
// ============================================================================
function emitHormonePacket(type, payload) {
  return Object.freeze({
    meta: {
      ...HormonesMeta,
      version: HormonesMeta.version || "v24-IMMORTAL-ADVANTAGE++",
      arteryVersion: "v24-HORMONE-ARTERY-ADVANTAGE++"
    },
    packetType: `hormone-${type}`,
    timestamp: Date.now(),
    epoch: HormonesMeta.evo.epoch,
    ...payload
  });
}

// ============================================================================
//  PREWARM — tri-band warmup + artery summary
// ============================================================================
export function prewarmBinaryHormones(dualBand = null, { trace = false } = {}) {
  try {
    const warmVitals = {
      pressure: dualBand?.binary?.metabolic?.pressure ?? 0.1,
      load:     dualBand?.binary?.metabolic?.load     ?? 0.1,
      quarantinedCount:
        dualBand?.binary?.immunity?.quarantinedCount ??
        dualBand?.symbolic?.immunity?.quarantinedCount ??
        0
    };

    const warmMetabolism = {
      _computeLoad:     () => warmVitals.load,
      _computePressure: () => warmVitals.pressure
    };

    const warmSentience = {
      generateSelfModel: () => ({
        quarantined: Array.from({ length: warmVitals.quarantinedCount }),
        vitals: {
          memoryHealth: 1,
          pipelineStability: 1
        }
      })
    };

    const warm = new AIBinaryHormones({
      encoder: { encode: (s) => s },
      metabolism: warmMetabolism,
      sentience: warmSentience,
      trace
    });

    const warmEmit = warm.emitHormones();
    const snapshot = warm.getSnapshot();

    const packet = emitHormonePacket("prewarm", {
      message: "Hormone system prewarmed (v24++).",
      warmVitals,
      warmSnapshot: snapshot,
      warmEmitSummary: {
        levels: snapshot.levels,
        artery: snapshot.artery
      }
    });

    if (trace) console.log("[aiBinaryHormones] prewarm", packet);
    return packet;
  } catch (err) {
    return emitHormonePacket("prewarm-error", {
      error: String(err),
      message: "Hormone prewarm failed."
    });
  }
}

// ============================================================================
//  ORGAN IMPLEMENTATION — v24 IMMORTAL ADVANTAGE++
// ============================================================================
export class AIBinaryHormones {
  constructor(config = {}) {
    this.id = config.id || HormonesMeta.identity;

    this.encoder    = config.encoder;
    this.metabolism = config.metabolism;
    this.sentience  = config.sentience;

    this.logger   = config.logger   || null;
    this.pipeline = config.pipeline || null;
    this.reflex   = config.reflex   || null;

    this.bluetooth = config.bluetooth || null;
    this.trace     = !!config.trace;

    this.nodeAdminReporter =
      typeof config.nodeAdminReporter === "function"
        ? config.nodeAdminReporter
        : null;

    if (!this.encoder)    throw new Error("AIBinaryHormones requires encoder");
    if (!this.metabolism) throw new Error("AIBinaryHormones requires metabolism");
    if (!this.sentience)  throw new Error("AIBinaryHormones requires sentience");

    this.instanceIndex = AIBinaryHormones._registerInstance();

    this._cache = {
      levels: null,
      artery: null
    };
  }

  // ---------------------------------------------------------------------------
  //  STATIC INSTANCE REGISTRY
  // ---------------------------------------------------------------------------
  static _registerInstance() {
    if (typeof AIBinaryHormones._instanceCount !== "number") {
      AIBinaryHormones._instanceCount = 0;
    }
    const idx = AIBinaryHormones._instanceCount;
    AIBinaryHormones._instanceCount += 1;
    return idx;
  }

  static getInstanceCount() {
    return typeof AIBinaryHormones._instanceCount === "number"
      ? AIBinaryHormones._instanceCount
      : 0;
  }

  // ---------------------------------------------------------------------------
  //  ARTERY METRICS — deterministic, drift-proof
  // ---------------------------------------------------------------------------
  _computeHormoneThroughput(globalPressure, quarantinedCount) {
    const qFactor = Math.min(1, quarantinedCount / 10);
    return Math.max(0, Math.min(1, 1 - (globalPressure * 0.6 + qFactor * 0.4)));
  }

  _computeHormonePressure(load, metabolicPressure) {
    return Math.max(0, Math.min(1, load * 0.5 + metabolicPressure * 0.5));
  }

  _computeHormoneCost(pressure, throughput) {
    return Math.max(0, Math.min(1, pressure * (1 - throughput)));
  }

  _computeHormoneBudget(throughput, cost) {
    return Math.max(0, Math.min(1, throughput - cost));
  }

  // ---------------------------------------------------------------------------
  //  BUCKETS — v24++ stable categorical mapping
  // ---------------------------------------------------------------------------
  _bucketLevel(v) {
    if (v >= 0.9)  return "elite";
    if (v >= 0.75) return "high";
    if (v >= 0.5)  return "medium";
    if (v >= 0.25) return "low";
    return "critical";
  }

  _bucketPressure(v) {
    if (v >= 0.9)  return "overload";
    if (v >= 0.7)  return "high";
    if (v >= 0.4)  return "medium";
    if (v > 0)     return "low";
    return "none";
  }

  _bucketCost(v) {
    if (v >= 0.8)  return "heavy";
    if (v >= 0.5)  return "moderate";
    if (v >= 0.2)  return "light";
    if (v > 0)     return "negligible";
    return "none";
  }

  // ---------------------------------------------------------------------------
  //  HORMONE LEVEL COMPUTATION — pure binary modulation (v24++)
  // ---------------------------------------------------------------------------
  _computeHormoneLevels() {
    const load = this.metabolism._computeLoad();
    const metabolicPressure = this.metabolism._computePressure(load);

    const self = this.sentience.generateSelfModel();
    const quarantinedCount = self.quarantined.length;

    const throughput = this._computeHormoneThroughput(metabolicPressure, quarantinedCount);
    const pressure   = this._computeHormonePressure(load, metabolicPressure);
    const cost       = this._computeHormoneCost(pressure, throughput);
    const budget     = this._computeHormoneBudget(throughput, cost);

    const artery = Object.freeze({
      throughput,
      throughputBucket: this._bucketLevel(throughput),

      pressure,
      pressureBucket: this._bucketPressure(pressure),

      cost,
      costBucket: this._bucketCost(cost),

      budget,
      budgetBucket: this._bucketLevel(budget),

      instanceIndex: this.instanceIndex,
      instanceCount: AIBinaryHormones.getInstanceCount(),
      id: this.id,
      timestamp: Date.now()
    });

    const levels = Object.freeze({
      urgency: pressure,
      calm:   Math.max(0, 1 - pressure),
      focus:  self.vitals.memoryHealth,
      growth: self.vitals.pipelineStability,
      repair: quarantinedCount > 0 ? 1 : 0.2
    });

    const key = _registryKey(this.id, this.instanceIndex);
    _globalHormoneRegistry.set(key, { levels, artery });

    if (this.nodeAdminReporter) {
      try {
        this.nodeAdminReporter({ levels, artery }, HormonesMeta);
      } catch {}
    }

    return { levels, artery };
  }

  // ---------------------------------------------------------------------------
  //  PACKET GENERATION — binary-only, packet-aware
  // ---------------------------------------------------------------------------
  _generateHormonePacket(hormone, level, artery) {
    const payload = {
      type: "binary-hormone",
      timestamp: Date.now(),
      hormone,
      level,
      artery,
      membrane: {
        source: this.id,
        instanceIndex: this.instanceIndex
      },
      bluetooth: {
        ready: !!this.bluetooth,
        channel: null
      }
    };

    const json    = JSON.stringify(payload);
    const encoded = this.encoder.encode(json);

    return Object.freeze({
      ...payload,
      bits: encoded,
      bitLength: encoded.length
    });
  }

  // ---------------------------------------------------------------------------
  //  SNAPSHOT — organism/window-safe hormone snapshot
  // ---------------------------------------------------------------------------
  getSnapshot() {
    if (!this._cache.levels || !this._cache.artery) {
      const { levels, artery } = this._computeHormoneLevels();
      this._cache.levels = levels;
      this._cache.artery = artery;
    }

    return Object.freeze({
      levels: this._cache.levels,
      artery: this._cache.artery
    });
  }

  // ---------------------------------------------------------------------------
  //  EMIT — global modulation packets (v24++)
  // ---------------------------------------------------------------------------
  emitHormones() {
    const { levels, artery } = this._computeHormoneLevels();

    const drift =
      this._cache.levels &&
      JSON.stringify(this._cache.levels) !== JSON.stringify(levels);

    if (!drift) {
      return emitHormonePacket("fast", {
        id: this.id,
        instanceIndex: this.instanceIndex,
        levels,
        artery,
        message: "Hormone levels unchanged (fast path)."
      });
    }

    const packets = [];

    for (const hormone of Object.keys(levels)) {
      const level  = levels[hormone];
      const packet = this._generateHormonePacket(hormone, level, artery);

      this.pipeline?.run(packet.bits);
      this.reflex?.run(packet.bits);
      this.logger?.logBinary?.(packet.bits, { source: "hormones", hormone });

      packets.push(packet);
    }

    this._cache.levels = levels;
    this._cache.artery = artery;

    return emitHormonePacket("emit", {
      id: this.id,
      instanceIndex: this.instanceIndex,
      count: packets.length,
      levels,
      artery,
      packets,
      membraneSnapshot: {
        id: this.id,
        instanceIndex: this.instanceIndex,
        artery
      }
    });
  }
}

// ============================================================================
//  FACTORY
// ============================================================================
export function createAIBinaryHormones(config) {
  return new AIBinaryHormones(config);
}

if (typeof module !== "undefined") {
  module.exports = {
    HormonesMeta,
    AIBinaryHormones,
    createAIBinaryHormones,
    prewarmBinaryHormones,
    getGlobalHormoneState
  };
}
