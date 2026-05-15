// ============================================================================
//  aiHormones-v30-IMMORTAL-EVO+++ .js
//  Binary Hormone System • DualBand‑Aware • Mesh‑Aware • Artery‑First
//  ZERO RANDOMNESS • DETERMINISTIC • ORGANISM‑SAFE
// ============================================================================

export const HormonesMeta = Object.freeze({
  identity: "ai-binary-hormones",
  layer: "binary",
  role: "hormone-system",
  version: "v30-IMMORTAL-EVO+++",
  evo: {
    epoch: Date.now(),
    deterministic: true,
    driftProof: true,
    arteryAware: true,
    dualBandAware: true,
    meshAware: true
  }
});

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

function _bucketLevel(v) {
  if (v >= 0.9)  return "elite";
  if (v >= 0.75) return "high";
  if (v >= 0.5)  return "medium";
  if (v >= 0.25) return "low";
  return "critical";
}

function _bucketPressure(v) {
  if (v >= 0.9)  return "overload";
  if (v >= 0.7)  return "high";
  if (v >= 0.4)  return "medium";
  if (v > 0)     return "low";
  return "none";
}

function _bucketCost(v) {
  if (v >= 0.8)  return "heavy";
  if (v >= 0.5)  return "moderate";
  if (v >= 0.2)  return "light";
  if (v > 0)     return "negligible";
  return "none";
}

function emitHormonePacket(type, payload) {
  return Object.freeze({
    meta: {
      ...HormonesMeta,
      arteryVersion: "v30-HORMONE-ARTERY-EVO+++"
    },
    packetType: `hormone-${type}`,
    timestamp: Date.now(),
    epoch: HormonesMeta.evo.epoch,
    ...payload
  });
}

export function prewarmBinaryHormones(dualBand = null, { trace = false } = {}) {
  try {
    const warmVitals = {
      pressure:
        dualBand?.binary?.metabolic?.pressure ??
        dualBand?.organism?.metabolism?.pressure ??
        0.1,
      load:
        dualBand?.binary?.metabolic?.load ??
        dualBand?.organism?.metabolism?.load ??
        0.1,
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
      id: "hormones-prewarm",
      encoder: { encode: (s) => s },
      metabolism: warmMetabolism,
      sentience: warmSentience,
      trace
    });

    const warmEmit = warm.emitHormones();
    const snapshot = warm.getSnapshot();

    const packet = emitHormonePacket("prewarm", {
      message: "Hormone system prewarmed (v30+++).",
      warmVitals,
      warmSnapshot: snapshot,
      warmEmitSummary: {
        levels: snapshot.levels,
        artery: snapshot.artery
      }
    });

    if (trace) console.log("[aiBinaryHormones-v30] prewarm", packet);
    return packet;
  } catch (err) {
    return emitHormonePacket("prewarm-error", {
      error: String(err),
      message: "Hormone prewarm failed."
    });
  }
}

export class AIBinaryHormones {
  constructor(config = {}) {
    this.id         = config.id || HormonesMeta.identity;
    this.encoder    = config.encoder;
    this.metabolism = config.metabolism;
    this.sentience  = config.sentience;

    this.logger     = config.logger   || null;
    this.pipeline   = config.pipeline || null;
    this.reflex     = config.reflex   || null;
    this.scheduler  = config.scheduler || null;

    this.bluetooth  = config.bluetooth || null;
    this.mesh       = config.mesh || null;          // PulseMesh / RF overlay
    this.dualBand   = config.dualBand || null;      // dualband overlay
    this.trace      = !!config.trace;

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

  // v30+: dualband + mesh overlays folded into hormone artery
  _computeOverlays() {
    const dual = this.dualBand || {};
    const mesh = this.mesh || {};

    const dualPressure =
      dual.artery?.organism?.pressure ??
      dual.binaryVitals?.pressure ??
      0;

    const meshPressure = mesh.pressure ?? 0;
    const meshLane     = mesh.gpuLane || "gpu-none";

    return {
      dualPressure,
      meshPressure,
      meshLane
    };
  }

  _computeHormoneThroughput(globalPressure, quarantinedCount, overlayPressure) {
    const qFactor = Math.min(1, quarantinedCount / 10);
    const overlay = Math.min(1, overlayPressure);
    const raw = 1 - (globalPressure * 0.5 + qFactor * 0.3 + overlay * 0.2);
    return Math.max(0, Math.min(1, raw));
  }

  _computeHormonePressure(load, metabolicPressure, overlayPressure) {
    const raw = load * 0.4 + metabolicPressure * 0.4 + overlayPressure * 0.2;
    return Math.max(0, Math.min(1, raw));
  }

  _computeHormoneCost(pressure, throughput) {
    return Math.max(0, Math.min(1, pressure * (1 - throughput)));
  }

  _computeHormoneBudget(throughput, cost) {
    return Math.max(0, Math.min(1, throughput - cost));
  }

  _computeHormoneLevels() {
    const load = this.metabolism._computeLoad();
    const metabolicPressure = this.metabolism._computePressure(load);

    const self = this.sentience.generateSelfModel();
    const quarantinedCount = self.quarantined.length;

    const overlays = this._computeOverlays();
    const overlayPressure = Math.max(overlays.dualPressure, overlays.meshPressure);

    const throughput = this._computeHormoneThroughput(
      metabolicPressure,
      quarantinedCount,
      overlayPressure
    );
    const pressure   = this._computeHormonePressure(
      load,
      metabolicPressure,
      overlayPressure
    );
    const cost       = this._computeHormoneCost(pressure, throughput);
    const budget     = this._computeHormoneBudget(throughput, cost);

    const artery = Object.freeze({
      throughput,
      throughputBucket: _bucketLevel(throughput),

      pressure,
      pressureBucket: _bucketPressure(pressure),

      cost,
      costBucket: _bucketCost(cost),

      budget,
      budgetBucket: _bucketLevel(budget),

      instanceIndex: this.instanceIndex,
      instanceCount: AIBinaryHormones.getInstanceCount(),
      id: this.id,
      timestamp: Date.now(),

      overlays: {
        dualBandPressure: overlays.dualPressure,
        meshPressure: overlays.meshPressure,
        meshLane: overlays.meshLane
      }
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
        channel: this.bluetooth?.channel || null
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

  getArtery() {
    return this.getSnapshot().artery;
  }

  getLevels() {
    return this.getSnapshot().levels;
  }

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

      this.pipeline?.run?.(packet.bits);
      this.reflex?.run?.(packet.bits);
      this.logger?.logBinary?.(packet.bits, { source: "hormones", hormone });

      if (this.scheduler?.scheduleHormone) {
        this.scheduler.scheduleHormone({ hormone, level, artery });
      }

      if (this.mesh?.broadcastHormone) {
        this.mesh.broadcastHormone({ hormone, level, artery });
      }

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
