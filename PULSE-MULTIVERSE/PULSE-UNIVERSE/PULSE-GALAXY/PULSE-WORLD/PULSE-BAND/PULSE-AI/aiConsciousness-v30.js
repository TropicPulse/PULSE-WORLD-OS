// ============================================================================
//  aiConsciousness-v30-IMMORTAL-PLUS.js — Pulse OS v30+ Consciousness Organ
//  Unified Organism State • Whole-System Awareness • Binary-Only
//  Deterministic • No External Globals • No Legacy OrganismMap Remnants
//  IMMORTAL-PLUS • Consciousness Artery v6 • Multi-Instance Harmony
// ============================================================================

const ConsciousnessMeta = Object.freeze({
  id: "ai-binary-consciousness",
  version: "v30-IMMORTAL-PLUS",
  layer: "consciousness",
  role: "organism-awareness",
  band: "binary",
  evo: {
    epoch: Date.now()
  }
});

// ============================================================================
//  BUCKET HELPERS — v6
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

function bucketCoherence(v) {
  if (v >= 0.9) return "crystalline";
  if (v >= 0.7) return "coherent";
  if (v >= 0.4) return "balanced";
  if (v > 0.2) return "strained";
  return "unknown";
}

// ============================================================================
//  CONSCIOUSNESS ARTERY v6 — IMMORTAL-PLUS
// ============================================================================

function computeConsciousnessArteryV6({
  globalPressure,
  quarantinedCount,
  topologySize,
  selfThroughput,
  selfPressure,
  metabolicLoad,
  instanceCount
}) {
  const qFactor = Math.min(1, quarantinedCount / 16);
  const topoFactor = Math.min(1, topologySize / 256);
  const selfThroughputFactor = Math.min(1, selfThroughput);
  const selfPressureFactor = Math.min(1, selfPressure);
  const metabolicFactor = Math.min(1, metabolicLoad);

  const pressure = Math.max(
    0,
    Math.min(
      1,
      (globalPressure * 0.4 +
        qFactor * 0.15 +
        topoFactor * 0.15 +
        selfPressureFactor * 0.15 +
        metabolicFactor * 0.15)
    )
  );

  const baseThroughput = Math.max(
    0,
    1 -
      (globalPressure * 0.4 +
        qFactor * 0.2 +
        topoFactor * 0.1 +
        selfPressureFactor * 0.2 +
        metabolicFactor * 0.1)
  );

  const harmonicFactor = instanceCount > 0 ? Math.min(1, 1 / instanceCount) : 1;
  const throughput = Math.max(0, Math.min(1, baseThroughput * harmonicFactor));

  const cost = Math.max(0, Math.min(1, pressure * (1 - throughput)));
  const budget = Math.max(0, Math.min(1, throughput - cost));

  const coherence = Math.max(
    0,
    Math.min(
      1,
      (selfThroughputFactor * 0.4 +
        (1 - selfPressureFactor) * 0.3 +
        (1 - globalPressure) * 0.3)
    )
  );

  return Object.freeze({
    globalPressure,
    quarantinedCount,
    topologySize,
    selfThroughput,
    selfPressure,
    metabolicLoad,
    instanceCount,
    throughput,
    pressure,
    cost,
    budget,
    coherence,
    throughputBucket: bucketLevel(throughput),
    pressureBucket: bucketPressure(pressure),
    costBucket: bucketCost(cost),
    budgetBucket: bucketLevel(budget),
    coherenceBucket: bucketCoherence(coherence)
  });
}

// ============================================================================
//  PACKET + TRACE HELPERS — PURE, NO GLOBALS
// ============================================================================

function emitConsciousnessPacket(type, payload) {
  return Object.freeze({
    meta: ConsciousnessMeta,
    packetType: `consciousness-${type}`,
    timestamp: Date.now(),
    ...payload
  });
}

function traceConsciousnessEvent(id, event, payload, traceFlag, logger) {
  if (!traceFlag) return;
  const message = `[${id}] ${event}`;
  if (logger && typeof logger.log === "function") {
    logger.log("consciousness", { message, payload });
    return;
  }
  // Fallback console trace (still deterministic, no external mutation)
  console.log(message, payload);
}

// ============================================================================
//  PREWARM — v30 IMMORTAL-PLUS
// ============================================================================

export function prewarmAIBinaryConsciousness(config = {}) {
  try {
    const {
      encoder,
      sentience,
      metabolism,
      hormones,
      vitals,
      anatomy,
      immunity,
      trace,
      logger
    } = config;

    sentience?.generateSelfModel?.();
    metabolism?.generateMetabolicPacket?.();
    hormones?.emitHormones?.();
    vitals?.generateVitals?.();
    anatomy?.snapshot?.();
    if (immunity?.quarantined) Array.from(immunity.quarantined);

    if (encoder?.encode) {
      const warmPayload = {
        type: "binary-consciousness",
        timestamp: 0,
        state: {
          selfModel: {},
          metabolism: {},
          hormones: [],
          vitals: {},
          topology: {},
          quarantined: [],
          decisions: [],
          binary: {
            throughput: 1,
            pressure: 0,
            cost: 0,
            budget: 1,
            coherence: 1
          }
        }
      };
      const bits = encoder.encode(JSON.stringify(warmPayload));
      encoder.decode?.(bits, "string");
    }

    const packet = emitConsciousnessPacket("prewarm", {
      message: "Binary consciousness v30 prewarmed and awareness artery aligned."
    });

    traceConsciousnessEvent(
      ConsciousnessMeta.id,
      "prewarm",
      packet,
      !!trace,
      logger
    );

    return packet;
  } catch (err) {
    return emitConsciousnessPacket("prewarm-error", {
      error: String(err),
      message: "Binary consciousness prewarm failed."
    });
  }
}

// ============================================================================
//  AIBinaryConsciousness v30-IMMORTAL-PLUS
// ============================================================================

export class AIBinaryConsciousness {
  constructor(config = {}) {
    this.id = config.id || ConsciousnessMeta.id;

    this.encoder = config.encoder;
    this.sentience = config.sentience;
    this.metabolism = config.metabolism;
    this.hormones = config.hormones;
    this.vitals = config.vitals;
    this.anatomy = config.anatomy;
    this.immunity = config.immunity;

    this.cortex = config.cortex || null;
    this.logger = config.logger || null;
    this.pipeline = config.pipeline || null;
    this.reflex = config.reflex || null;

    this.trace = !!config.trace;
    this.decisions = [];

    if (!this.encoder)
      throw new Error("AIBinaryConsciousness requires aiBinaryAgent encoder");
    if (!this.sentience)
      throw new Error("AIBinaryConsciousness requires aiBinarySentience");
    if (!this.metabolism)
      throw new Error("AIBinaryConsciousness requires aiBinaryMetabolism");
    if (!this.hormones)
      throw new Error("AIBinaryConsciousness requires aiBinaryHormones");
    if (!this.vitals)
      throw new Error("AIBinaryConsciousness requires aiBinaryVitals");
    if (!this.anatomy)
      throw new Error("AIBinaryConsciousness requires aiBinaryAnatomy");
    if (!this.immunity)
      throw new Error("AIBinaryConsciousness requires aiBinaryImmunity");

    this.instanceIndex = AIBinaryConsciousness._registerInstance();
    this.consciousnessArterySnapshot = null;
  }

  // IMMORTAL-PLUS instance registry
  static _registerInstance() {
    if (typeof AIBinaryConsciousness._instanceCount !== "number") {
      AIBinaryConsciousness._instanceCount = 0;
    }
    return AIBinaryConsciousness._instanceCount++;
  }

  static getInstanceCount() {
    return AIBinaryConsciousness._instanceCount || 0;
  }

  // --------------------------------------------------------------------------
  //  INTERNAL AWARENESS ARTERY
  // --------------------------------------------------------------------------

  _computeConsciousnessArtery(selfModel, metabolic, topology, quarantined) {
    const globalPressure =
      typeof metabolic.pressure === "number" ? metabolic.pressure : 0;

    const topologySize = topology ? Object.keys(topology).length : 0;
    const quarantinedCount = Array.isArray(quarantined)
      ? quarantined.length
      : 0;

    const selfBinary = selfModel && selfModel.binary ? selfModel.binary : null;
    const selfThroughput =
      selfBinary && typeof selfBinary.throughput === "number"
        ? selfBinary.throughput
        : 1;
    const selfPressure =
      selfBinary && typeof selfBinary.pressure === "number"
        ? selfBinary.pressure
        : globalPressure;

    const metabolicLoad =
      typeof metabolic.load === "number" ? metabolic.load : globalPressure;

    const instanceCount = AIBinaryConsciousness.getInstanceCount();

    const artery = computeConsciousnessArteryV6({
      globalPressure,
      quarantinedCount,
      topologySize,
      selfThroughput,
      selfPressure,
      metabolicLoad,
      instanceCount
    });

    this.consciousnessArterySnapshot = artery;
    return artery;
  }

  getConsciousnessArtery() {
    return this.consciousnessArterySnapshot || null;
  }

  // --------------------------------------------------------------------------
  //  DECISION INGESTION
  // --------------------------------------------------------------------------

  ingestDecision(decisionPacket) {
    if (!decisionPacket) return;

    this.decisions.push(
      Object.freeze({
        pattern: decisionPacket.pattern || null,
        decision: decisionPacket.decision || null,
        source: decisionPacket.source || null,
        timestamp:
          typeof decisionPacket.timestamp === "number"
            ? decisionPacket.timestamp
            : Date.now()
      })
    );

    if (this.decisions.length > 32) this.decisions.shift();

    this._trace("decision:ingested", {
      pattern: decisionPacket.pattern,
      decision: decisionPacket.decision
    });
  }

  // --------------------------------------------------------------------------
  //  UNIFIED STATE v30
  // --------------------------------------------------------------------------

  generateUnifiedState() {
    const selfModel = this.sentience.generateSelfModel();
    const metabolicPacket = this.metabolism.generateMetabolicPacket();
    const hormonePackets = this.hormones.emitHormones();
    const vitals = this.vitals.generateVitals();
    const anatomySnapshot = this.anatomy.snapshot();
    const topology = anatomySnapshot.topology || {};
    const quarantined = Array.from(this.immunity.quarantined || []);

    const metabolic = Object.freeze({
      load: metabolicPacket.load,
      pressure: metabolicPacket.pressure,
      budget: metabolicPacket.budget
    });

    const artery = this._computeConsciousnessArtery(
      selfModel,
      metabolic,
      topology,
      quarantined
    );

    const binary = Object.freeze({
      throughput: artery.throughput,
      throughputBucket: artery.throughputBucket,
      pressure: artery.pressure,
      pressureBucket: artery.pressureBucket,
      cost: artery.cost,
      costBucket: artery.costBucket,
      budget: artery.budget,
      budgetBucket: artery.budgetBucket,
      coherence: artery.coherence,
      coherenceBucket: artery.coherenceBucket
    });

    const state = Object.freeze({
      meta: ConsciousnessMeta,
      instanceIndex: this.instanceIndex,
      instanceCount: AIBinaryConsciousness.getInstanceCount(),
      selfModel,
      metabolism: metabolic,
      hormones: hormonePackets.map((p) =>
        Object.freeze({ hormone: p.hormone, level: p.level })
      ),
      vitals: Object.freeze(vitals.metrics),
      topology,
      quarantined,
      decisions: this.decisions.map((d) =>
        Object.freeze({ pattern: d.pattern, decision: d.decision, source: d.source, timestamp: d.timestamp })
      ),
      binary
    });

    this._trace("consciousness:state", {
      organs: selfModel.organs ? selfModel.organs.length : 0,
      hormones: state.hormones.length,
      quarantined: quarantined.length,
      awarenessPressure: artery.pressure,
      coherenceBucket: artery.coherenceBucket
    });

    return state;
  }

  // --------------------------------------------------------------------------
  //  PACKET GENERATION + EMISSION
  // --------------------------------------------------------------------------

  generateConsciousnessPacket() {
    const state = this.generateUnifiedState();

    const payload = {
      type: "binary-consciousness",
      timestamp: Date.now(),
      state
    };

    const json = JSON.stringify(payload);
    const bits = this.encoder.encode(json);

    const packet = emitConsciousnessPacket("snapshot", {
      ...payload,
      bits,
      bitLength: bits.length
    });

    this._trace("consciousness:packet", {
      bits: packet.bitLength,
      throughputBucket: state.binary.throughputBucket,
      pressureBucket: state.binary.pressureBucket
    });

    return packet;
  }

  emitConsciousness() {
    const packet = this.generateConsciousnessPacket();

    this.pipeline?.run(packet.bits);
    this.reflex?.run(packet.bits);
    this.logger?.logBinary?.(packet.bits, { source: "consciousness" });

    this._trace("consciousness:emitted", {
      bits: packet.bitLength,
      coherenceBucket: packet.state.binary.coherenceBucket
    });

    return emitConsciousnessPacket("emitted", packet);
  }

  // --------------------------------------------------------------------------
  //  TRACE
  // --------------------------------------------------------------------------

  _trace(event, payload) {
    traceConsciousnessEvent(this.id, event, payload, this.trace, this.logger);
  }
}

// ============================================================================
//  FACTORY — v30-IMMORTAL-PLUS
// ============================================================================

export function createAIBinaryConsciousness(config = {}) {
  prewarmAIBinaryConsciousness(config);
  return new AIBinaryConsciousness(config);
}

if (typeof module !== "undefined") {
  module.exports = {
    ConsciousnessMeta,
    AIBinaryConsciousness,
    createAIBinaryConsciousness,
    prewarmAIBinaryConsciousness
  };
}
