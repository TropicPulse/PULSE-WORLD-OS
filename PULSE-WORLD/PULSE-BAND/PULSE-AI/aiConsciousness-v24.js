/**
 * aiConsciousness.js — Pulse OS v24.0‑IMMORTAL++ Consciousness Organ
 * ---------------------------------------------------------
 * CANONICAL ROLE:
 *   This organ is the **Consciousness Layer** of the organism.
 *
 *   It provides:
 *     - unified organism state
 *     - whole-system awareness
 *     - global integration of all organs
 *     - continuous organism-level perspective
 *     - cross-organ coherence
 *     - binary awareness artery metrics
 *     - v24+ OrganismMap alignment + Signal-aware tracing (if present)
 */

import { OrganismIdentity } from "../PULSE-X/PulseWorldOrganismMap-v24.js";

const Identity = OrganismIdentity(import.meta.url);

// ============================================================================
//  GLOBAL HANDLE (v24+ IMMORTAL, environment-agnostic)
// ============================================================================

const g =
  typeof globalThis !== "undefined"
    ? globalThis
    : typeof global !== "undefined"
    ? global
    : typeof window !== "undefined"
    ? window
    : typeof self !== "undefined"
    ? self
    : {};

// ============================================================================
//  META BLOCK — v24.0 IMMORTAL (ORGANISM KERNEL)
//  Backed by the Organism Map instead of hardcoded here
// ============================================================================

export const ConsciousnessMeta = Identity.OrganMeta;

// Optional: expose full identity for tooling / Understanding
export const CONSCIOUSNESS_IDENTITY = Identity;

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

// ---------------------------------------------------------
//  PACKET EMITTER — deterministic, consciousness-scoped
// ---------------------------------------------------------

function emitConsciousnessPacket(type, payload) {
  return Object.freeze({
    meta: ConsciousnessMeta,
    packetType: `consciousness-${type}`,
    timestamp: Date.now(),
    epoch: ConsciousnessMeta.evo.epoch,
    layer: ConsciousnessMeta.layer,
    role: ConsciousnessMeta.role,
    identity: ConsciousnessMeta.identity,
    ...payload
  });
}

// ---------------------------------------------------------
//  v24+ SIGNAL-AWARE TRACE LAYER (optional, non-fatal)
// ---------------------------------------------------------

function traceConsciousnessEvent(id, event, payload, traceFlag) {
  if (!traceFlag) return;

  const message = `[${id}] ${event}`;

  // Prefer PulseProofSignal if present (v24+ signal-grade tracing)
  const s = g.PulseProofSignal;
  if (s && typeof s.signal === "function") {
    s.signal({
      level: "info",
      subsystem: "consciousness",
      message,
      extra: payload || {},
      system: ConsciousnessMeta.role,
      organ: id,
      layer: ConsciousnessMeta.layer,
      world: ConsciousnessMeta.world || null,
      band: "dual"
    });
    return;
  }

  // Fallback: plain console
  // eslint-disable-next-line no-console
  console.log(message, payload);
}

// ---------------------------------------------------------
//  CONSCIOUSNESS PREWARM ENGINE — v24.0 IMMORTAL (Presence-compatible)
// ---------------------------------------------------------

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

    if (immunity?.quarantined) {
      // Touch quarantined set to ensure structure is warmed
      Array.from(immunity.quarantined);
    }

    const throughput = 1;
    const pressure = 1;
    const cost = 1;
    const budget = 1;

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
          binary: { throughput, pressure, cost, budget }
        }
      };

      const bits = encoder.encode(JSON.stringify(warmPayload));
      encoder.decode?.(bits, "string");
    }

    const packet = emitConsciousnessPacket("prewarm", {
      message: "Binary consciousness prewarmed and awareness pathways aligned."
    });

    traceConsciousnessEvent(
      ConsciousnessMeta.identity,
      "prewarm",
      packet,
      !!trace
    );

    return packet;
  } catch (err) {
    return emitConsciousnessPacket("prewarm-error", {
      error: String(err),
      message: "Binary consciousness prewarm failed."
    });
  }
}

// ---------------------------------------------------------
//  ORGAN IMPLEMENTATION — v24.0 IMMORTAL (Presence lineage)
// ---------------------------------------------------------

export class AIBinaryConsciousness {
  constructor(config = {}) {
    this.id = config.id || ConsciousnessMeta.identity;
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

    this.decisions = [];
  }

  // ---------------------------------------------------------
  //  BINARY AWARENESS ARTERY METRICS
  // ---------------------------------------------------------

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

  // ---------------------------------------------------------
  //  DECISION INGESTION
  // ---------------------------------------------------------

  ingestDecision(decisionPacket) {
    this.decisions.push(Object.freeze(decisionPacket));
    if (this.decisions.length > 20) this.decisions.shift();

    this._trace("decision:ingested", {
      decision: decisionPacket.decision,
      pattern: decisionPacket.pattern
    });
  }

  // ---------------------------------------------------------
  //  GLOBAL STATE GENERATION (v24+ snapshot-ready)
// ---------------------------------------------------------

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

    const throughput = this._computeAwarenessThroughput(
      globalPressure,
      quarantined.length
    );
    const pressure = this._computeAwarenessPressure(
      globalPressure,
      topologySize
    );
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

  // ---------------------------------------------------------
  //  CONSCIOUSNESS PACKET (v24+ IMMORTAL snapshot)
// ---------------------------------------------------------

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

  // ---------------------------------------------------------
  //  EMISSION (pipeline + reflex + logger)
// ---------------------------------------------------------

  emitConsciousness() {
    const packet = this.generateConsciousnessPacket();

    this.pipeline?.run(packet.bits);
    this.reflex?.run(packet.bits);
    this.logger?.logBinary?.(packet.bits, { source: "consciousness" });

    this._trace("consciousness:emitted", { bits: packet.bitLength });

    return emitConsciousnessPacket("emitted", packet);
  }

  // ---------------------------------------------------------
  //  INTERNAL HELPERS
  // ---------------------------------------------------------

  _trace(event, payload) {
    traceConsciousnessEvent(this.id, event, payload, this.trace);
  }
}

// ---------------------------------------------------------
//  FACTORY EXPORT — v24.0 IMMORTAL
// ---------------------------------------------------------

export function createAIBinaryConsciousness(config) {
  prewarmAIBinaryConsciousness(config);
  return new AIBinaryConsciousness(config);
}

// ---------------------------------------------------------
//  DUAL‑MODE EXPORTS (ESM + CommonJS)
// ---------------------------------------------------------

if (typeof module !== "undefined") {
  module.exports = {
    ConsciousnessMeta,
    CONSCIOUSNESS_IDENTITY,
    AIBinaryConsciousness,
    createAIBinaryConsciousness,
    prewarmAIBinaryConsciousness,
    pulseRole,
    surfaceMeta,
    pulseLoreContext,
    AI_EXPERIENCE_META,
    EXPORT_META
  };
}
