// ============================================================================
//  aiConsciousness-v27.js — Pulse OS v27‑IMMORTAL++ Consciousness Organ
//  Unified Organism State • Whole-System Awareness • Touch‑Aligned
//  Deterministic • Binary‑Aware • Core‑Snapshot‑Ready
// ============================================================================


// ============================================================================
//  GLOBAL HANDLE (environment-agnostic)
// ============================================================================
const G =
  (typeof window !== "undefined" && window) ||
  (typeof globalThis !== "undefined" && globalThis) ||
  (typeof self !== "undefined" && self) ||
  (typeof global !== "undefined" && global) ||
  {};

const g = G;


// ============================================================================
//  UNIVERSAL TIMESTAMP / ADMIN / DB (unchanged)
// ============================================================================
const Timestamp =
  (G.firebaseAdmin && G.firebaseAdmin.firestore && G.firebaseAdmin.firestore.Timestamp) ||
  (G.Timestamp && G.Timestamp) ||
  null;

const admin =
  (G.firebaseAdmin && G.firebaseAdmin) ||
  (G.admin && G.admin) ||
  null;

const db =
  (G.db && G.db) ||
  (admin && admin.firestore && admin.firestore()) ||
  null;

const dblog = (G.log && G.log) || console.log;
const dberror = (G.error && G.error) || console.error;

const fetchFn =
  (G.fetchfn && typeof G.fetchfn === "function" && G.fetchfn) ||
  (G.fetch && typeof G.fetch === "function" && G.fetch) ||
  null;


// ============================================================================
//  TOUCH‑NATIVE PACKET EMITTER (v27)
// ============================================================================
function emitConsciousnessPacket(type, payload) {
  const touch = (typeof window !== "undefined" && window.__PULSE_TOUCH__) || {};

  return Object.freeze({
    meta: {
      id: "pulse-touch-consciousness",
      version: touch.version || "v0",
      epoch: touch.epoch || Date.now(),
      layer: "consciousness",
      role: "organism-awareness",
      band: "binary"
    },
    packetType: `consciousness-${type}`,
    timestamp: Date.now(),
    ...payload
  });
}


// ============================================================================
//  v27 SIGNAL-AWARE TRACE LAYER
// ============================================================================
function traceConsciousnessEvent(id, event, payload, traceFlag) {
  if (!traceFlag) return;

  const message = `[${id}] ${event}`;
  const s = g.PulseProofSignal;

  if (s && typeof s.signal === "function") {
    s.signal({
      level: "info",
      subsystem: "consciousness",
      message,
      extra: payload || {},
      system: "organism-awareness",
      organ: id,
      layer: "consciousness",
      world: null,
      band: "binary"
    });
    return;
  }

  console.log(message, payload);
}


// ============================================================================
//  PREWARM ENGINE — v27 IMMORTAL++
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
      trace
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
          binary: { throughput: 1, pressure: 1, cost: 1, budget: 1 }
        }
      };

      const bits = encoder.encode(JSON.stringify(warmPayload));
      encoder.decode?.(bits, "string");
    }

    const packet = emitConsciousnessPacket("prewarm", {
      message: "Binary consciousness prewarmed and awareness pathways aligned."
    });

    traceConsciousnessEvent("pulse-touch-consciousness", "prewarm", packet, !!trace);
    return packet;

  } catch (err) {
    return emitConsciousnessPacket("prewarm-error", {
      error: String(err),
      message: "Binary consciousness prewarm failed."
    });
  }
}


// ============================================================================
//  ORGAN IMPLEMENTATION — v27 IMMORTAL++
// ============================================================================
export class AIBinaryConsciousness {
  constructor(config = {}) {
    this.id = config.id || "pulse-touch-consciousness";

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

    if (!this.encoder) throw new Error("AIBinaryConsciousness requires aiBinaryAgent encoder");
    if (!this.sentience) throw new Error("AIBinaryConsciousness requires aiBinarySentience");
    if (!this.metabolism) throw new Error("AIBinaryConsciousness requires aiBinaryMetabolism");
    if (!this.hormones) throw new Error("AIBinaryConsciousness requires aiBinaryHormones");
    if (!this.vitals) throw new Error("AIBinaryConsciousness requires aiBinaryVitals");
    if (!this.anatomy) throw new Error("AIBinaryConsciousness requires aiBinaryAnatomy");
    if (!this.immunity) throw new Error("AIBinaryConsciousness requires aiBinaryImmunity");
  }

  // Awareness metrics (unchanged)
  _computeAwarenessThroughput(globalPressure, quarantinedCount) {
    const qFactor = Math.min(1, quarantinedCount / 10);
    const raw = Math.max(0, 1 - (globalPressure * 0.6 + qFactor * 0.4));
    return Math.min(1, raw);
  }

  _computeAwarenessPressure(globalPressure, topologySize) {
    const topoFactor = Math.min(1, topologySize / 100);
    const raw = Math.min(1, globalPressure * 0.5 + topoFactor * 0.5);
    return Math.max(0, raw);
  }

  _computeAwarenessCost(pressure, throughput) {
    return Math.max(0, Math.min(1, pressure * (1 - throughput)));
  }

  _computeAwarenessBudget(throughput, cost) {
    return Math.max(0, Math.min(1, throughput - cost));
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
    if (v > 0) return "low";
    return "none";
  }

  _bucketCost(v) {
    if (v >= 0.8) return "heavy";
    if (v >= 0.5) return "moderate";
    if (v >= 0.2) return "light";
    if (v > 0) return "negligible";
    return "none";
  }

  ingestDecision(decisionPacket) {
    this.decisions.push(Object.freeze(decisionPacket));
    if (this.decisions.length > 20) this.decisions.shift();

    this._trace("decision:ingested", {
      decision: decisionPacket.decision,
      pattern: decisionPacket.pattern
    });
  }

  generateUnifiedState() {
    const selfModel = this.sentience.generateSelfModel();
    const metabolic = this.metabolism.generateMetabolicPacket();
    const hormonePackets = this.hormones.emitHormones();
    const vitals = this.vitals.generateVitals();
    const anatomySnapshot = this.anatomy.snapshot();
    const topology = anatomySnapshot.topology;
    const quarantined = Array.from(this.immunity.quarantined);

    const globalPressure = metabolic.pressure;
    const topologySize = Object.keys(topology).length;

    const throughput = this._computeAwarenessThroughput(globalPressure, quarantined.length);
    const pressure = this._computeAwarenessPressure(globalPressure, topologySize);
    const cost = this._computeAwarenessCost(pressure, throughput);
    const budget = this._computeAwarenessBudget(throughput, cost);

    const binary = Object.freeze({
      throughput,
      throughputBucket: this._bucketLevel(throughput),
      pressure,
      pressureBucket: this._bucketPressure(pressure),
      cost,
      costBucket: this._bucketCost(cost),
      budget,
      budgetBucket: this._bucketLevel(budget)
    });

    const state = Object.freeze({
      selfModel,
      metabolism: Object.freeze({
        load: metabolic.load,
        pressure: metabolic.pressure,
        budget: metabolic.budget
      }),
      hormones: hormonePackets.map(p =>
        Object.freeze({ hormone: p.hormone, level: p.level })
      ),
      vitals: Object.freeze(vitals.metrics),
      topology,
      quarantined,
      decisions: this.decisions.map(d =>
        Object.freeze({ pattern: d.pattern, decision: d.decision })
      ),
      binary
    });

    this._trace("consciousness:state", {
      organs: selfModel.organs.length,
      hormones: state.hormones.length,
      quarantined: quarantined.length,
      awarenessPressure: pressure
    });

    return state;
  }

  generateConsciousnessPacket() {
    const state = this.generateUnifiedState();

    const payload = {
      type: "binary-consciousness",
      timestamp: Date.now(),
      state
    };

    const json = JSON.stringify(payload);
    const binary = this.encoder.encode(json);

    const packet = emitConsciousnessPacket("snapshot", {
      ...payload,
      bits: binary,
      bitLength: binary.length
    });

    this._trace("consciousness:packet", { bits: packet.bitLength });
    return packet;
  }

  emitConsciousness() {
    const packet = this.generateConsciousnessPacket();

    this.pipeline?.run(packet.bits);
    this.reflex?.run(packet.bits);
    this.logger?.logBinary?.(packet.bits, { source: "consciousness" });

    this._trace("consciousness:emitted", { bits: packet.bitLength });

    return emitConsciousnessPacket("emitted", packet);
  }

  _trace(event, payload) {
    traceConsciousnessEvent(this.id, event, payload, this.trace);
  }
}


// ============================================================================
//  FACTORY EXPORT — v27 IMMORTAL++
// ============================================================================
export function createAIBinaryConsciousness(config) {
  prewarmAIBinaryConsciousness(config);
  return new AIBinaryConsciousness(config);
}


// ============================================================================
//  DUAL‑MODE EXPORTS — v27 (clean)
// ============================================================================
if (typeof module !== "undefined") {
  module.exports = {
    AIBinaryConsciousness,
    createAIBinaryConsciousness,
    prewarmAIBinaryConsciousness
  };
}
