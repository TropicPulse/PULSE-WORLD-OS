// ============================================================================
//  aiNervousSystem.js — Pulse OS v24.0-IMMORTAL++
//  Binary Nervous System • Routing Brainstem • Deterministic • Routing Artery v4
//  Dualband • Registry-Aware • Multi-Instance • Spiral-Safe • Signal-Aware
// ============================================================================
//
//  CANONICAL ROLE:
//    This organ is the **Binary Nervous System** of the organism.
//
//    It is the routing brainstem for binary signals:
//      • receives binary signals from organs
//      • consults anatomy topology + immunity quarantine
//      • resolves valid downstream targets
//      • emits routing packets (binary) with artery metrics
//      • delivers bits to target organs (run/handle)
//
//    It provides organism-level routing awareness:
//      • routing throughput
//      • routing pressure
//      • routing cost
//      • routing budget
//      • routing artery buckets (throughput/pressure/cost/budget)
//      • window-safe routing snapshots (per-instance)
//      • global routing artery registry (multi-instance)
//
//    It is **binary-only** and **non-cognitive**:
//      • does NOT interpret symbolic state
//      • does NOT perform cognition
//      • does NOT override pipeline/reflex engines
//      • treats all inputs as read-only
// ============================================================================

import {
  OrganismIdentity,
  buildPulseOrganismMap as PulseOrganismMap,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PULSE-WORLD-MAP.js";

// ============================================================================
//  GLOBAL HANDLE (v24 IMMORTAL)
// ============================================================================

const G =
  (typeof window !== "undefined" && window) ||
  (typeof globalThis !== "undefined" && globalThis) ||
  (typeof self !== "undefined" && self) ||
  (typeof global !== "undefined" && global) ||
  {};
const g = G;
// ============================================================================
// UNIVERSAL TIMESTAMP (Shadow or Admin)
// ============================================================================

const Timestamp =
  (G.firebaseAdmin && G.firebaseAdmin.firestore && G.firebaseAdmin.firestore.Timestamp) ||
  (G.Timestamp && G.Timestamp) ||
  null;

// ============================================================================
// UNIVERSAL ADMIN (Shadow or Admin)
// ============================================================================

const admin =
  (G.firebaseAdmin && G.firebaseAdmin) ||
  (G.admin && G.admin) ||
  null;

// ============================================================================
// UNIVERSAL DB (Shadow DB ALWAYS wins)
// ============================================================================
const db =
  (G.db && G.db) ||                 // Shadow DB (v25++)
  (admin && admin.firestore && admin.firestore()) || // Admin fallback
  null;

// ============================================================================
// UNIVERSAL LOGGING
// ============================================================================

const dblog =
  (G.log && G.log) ||
  console.log;

const dberror =
  (G.error && G.error) ||
  console.error;
  
const fetchFn =
  (G.fetchfn && typeof G.fetchfn === "function" && G.fetchfn) ||   // Shadow fetch alias
  (G.fetch && typeof G.fetch === "function" && G.fetch) ||         // Global broadcasted Shadow.fetch
  null;

// ============================================================================
//  IDENTITY (v24 IMMORTAL)
// ============================================================================
const Identity = OrganismIdentity(import.meta.url);

export const NervousSystemMeta = Identity.OrganMeta;

// ============================================================================
//  SURFACE EXPORTS — v24 IMMORTAL
// ============================================================================
export const pulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// ============================================================================
//  GLOBAL ROUTING ARTERY REGISTRY
// ============================================================================
const _globalRoutingArteryRegistry = new Map();

function _registryKey(id, instanceIndex) {
  return `${id || NervousSystemMeta.identity}#${instanceIndex}`;
}

export function getGlobalRoutingArteries() {
  const out = {};
  for (const [k, v] of _globalRoutingArteryRegistry.entries()) {
    out[k] = v;
  }
  return out;
}

// ============================================================================
//  BUCKET HELPERS — v4
// ============================================================================
function _bucketLevel(v) {
  if (v >= 0.9) return "elite";
  if (v >= 0.75) return "high";
  if (v >= 0.5) return "medium";
  if (v >= 0.25) return "low";
  return "critical";
}

function _bucketPressure(v) {
  if (v >= 0.9) return "overload";
  if (v >= 0.7) return "high";
  if (v >= 0.4) return "medium";
  if (v > 0) return "low";
  return "none";
}

function _bucketCost(v) {
  if (v >= 0.8) return "heavy";
  if (v >= 0.5) return "moderate";
  if (v >= 0.2) return "light";
  if (v > 0) return "negligible";
  return "none";
}

// ============================================================================
//  SIGNAL-AWARE TRACE LAYER
// ============================================================================
function traceNervousEvent(event, payload, traceFlag) {
  if (!traceFlag) return;

  const s = g.PulseProofSignal;
  if (s && typeof s.signal === "function") {
    s.signal({
      subsystem: "nervous-system",
      level: "info",
      message: `[AIBinaryNervousSystem] ${event}`,
      extra: payload || {},
      organ: NervousSystemMeta.identity,
      layer: surfaceMeta?.layer,
      band: "dual"
    });
    return;
  }

  console.log(`[AIBinaryNervousSystem] ${event}`, payload);
}

// ============================================================================
//  PACKET EMITTER
// ============================================================================
function emitRoutingPacket(type, payload) {
  const now = Date.now();
  return Object.freeze({
    meta: NervousSystemMeta,
    packetType: `routing-${type}`,
    packetId: `routing-${type}-${now}`,
    timestamp: now,
    epoch: NervousSystemMeta.evo.epoch,
    ...payload
  });
}

// ============================================================================
//  PREWARM
// ============================================================================
export function prewarmAIBinaryNervousSystem({ trace = false } = {}) {
  const packet = emitRoutingPacket("prewarm", {
    message: "Nervous system prewarmed and routing artery v4 aligned."
  });

  traceNervousEvent("prewarm", packet, trace);
  return packet;
}

// ============================================================================
//  ORGAN IMPLEMENTATION — v24 IMMORTAL++
// ============================================================================
export class AIBinaryNervousSystem {
  constructor(config = {}) {
    this.id = config.id || NervousSystemMeta.identity;
    this.encoder = config.encoder;
    this.anatomy = config.anatomy;
    this.immunity = config.immunity;
    this.registry = config.registry;
    this.logger = config.logger || null;
    this.trace = !!config.trace;

    this.nodeAdminReporter =
      typeof config.nodeAdminReporter === "function"
        ? config.nodeAdminReporter
        : null;

    if (!this.encoder) throw new Error("AIBinaryNervousSystem requires encoder");
    if (!this.anatomy?.topology?.get)
      throw new Error("AIBinaryNervousSystem requires aiBinaryAnatomy");
    if (!this.immunity?.sanitize || !this.immunity.quarantined)
      throw new Error("AIBinaryNervousSystem requires aiBinaryImmunity");
    if (!this.registry)
      throw new Error("AIBinaryNervousSystem requires aiBinaryOrganRegistry");

    this.organs = new Map();

    this.instanceIndex = AIBinaryNervousSystem._registerInstance();

    this.windowMs =
      typeof config.windowMs === "number" && config.windowMs > 0
        ? config.windowMs
        : 60000;

    this._windowStart = Date.now();
    this._windowRoutes = 0;
    this._windowBits = 0;
    this._windowTargets = 0;

    this._totalRoutes = 0;
    this._totalBits = 0;
    this._totalTargets = 0;

    this.routingArtery = {
      throughput: 0,
      pressure: 0,
      cost: 0,
      budget: 1,
      lastTargets: [],
      lastSource: null,
      routesPerSec: 0,
      harmonicLoad: 0,
      snapshot: () =>
        Object.freeze({
          throughput: this.routingArtery.throughput,
          pressure: this.routingArtery.pressure,
          cost: this.routingArtery.cost,
          budget: this.routingArtery.budget,
          lastTargets: this.routingArtery.lastTargets,
          lastSource: this.routingArtery.lastSource,
          routesPerSec: this.routingArtery.routesPerSec,
          harmonicLoad: this.routingArtery.harmonicLoad,
          instanceIndex: this.instanceIndex,
          instanceCount: AIBinaryNervousSystem.getInstanceCount()
        })
    };
  }

  // --------------------------------------------------------------------------
  //  STATIC INSTANCE REGISTRY
  // --------------------------------------------------------------------------
  static _registerInstance() {
    if (typeof AIBinaryNervousSystem._instanceCount !== "number") {
      AIBinaryNervousSystem._instanceCount = 0;
    }
    const idx = AIBinaryNervousSystem._instanceCount;
    AIBinaryNervousSystem._instanceCount += 1;
    return idx;
  }

  static getInstanceCount() {
    return (
      AIBinaryNervousSystem._instanceCount ||
      0
    );
  }

  // --------------------------------------------------------------------------
  //  WINDOW ROLLING
  // --------------------------------------------------------------------------
  _rollWindow(now) {
    if (now - this._windowStart >= this.windowMs) {
      this._windowStart = now;
      this._windowRoutes = 0;
      this._windowBits = 0;
      this._windowTargets = 0;
    }
  }

  // --------------------------------------------------------------------------
  //  ROUTING ARTERY v4
  // --------------------------------------------------------------------------
  _computeRoutingArtery() {
    const now = Date.now();
    this._rollWindow(now);

    const elapsedMs = Math.max(1, now - this._windowStart);
    const routesPerSec = (this._windowRoutes / elapsedMs) * 1000;

    const instanceCount = AIBinaryNervousSystem.getInstanceCount() || 1;
    const harmonicLoad = routesPerSec / instanceCount;

    const avgTargets =
      this._windowRoutes > 0
        ? this._windowTargets / this._windowRoutes
        : 0;

    const avgBits =
      this._windowRoutes > 0 ? this._windowBits / this._windowRoutes : 0;

    const targetFactor = Math.min(1, avgTargets / 16);
    const sizeFactor = Math.min(1, avgBits / 50000);
    const loadFactor = Math.min(1, harmonicLoad / 128);

    const pressure = Math.max(
      0,
      Math.min(1, (targetFactor + sizeFactor + loadFactor) / 3)
    );

    const throughput = Math.max(0, Math.min(1, 1 - pressure));
    const cost = Math.max(0, Math.min(1, pressure * (1 - throughput)));
    const budget = Math.max(0, Math.min(1, throughput - cost));

    const artery = {
      instanceIndex: this.instanceIndex,
      instanceCount,

      windowMs: this.windowMs,
      windowRoutes: this._windowRoutes,
      windowBits: this._windowBits,
      windowTargets: this._windowTargets,

      totalRoutes: this._totalRoutes,
      totalBits: this._totalBits,
      totalTargets: this._totalTargets,

      routesPerSec,
      harmonicLoad,
      avgTargets,
      avgBits,

      throughput,
      throughputBucket: _bucketLevel(throughput),

      pressure,
      pressureBucket: _bucketPressure(pressure),

      cost,
      costBucket: _bucketCost(cost),

      budget,
      budgetBucket: _bucketLevel(budget),

      id: this.id,
      timestamp: now
    };

    this.routingArtery.throughput = throughput;
    this.routingArtery.pressure = pressure;
    this.routingArtery.cost = cost;
    this.routingArtery.budget = budget;
    this.routingArtery.routesPerSec = routesPerSec;
    this.routingArtery.harmonicLoad = harmonicLoad;

    const key = _registryKey(this.id, this.instanceIndex);
    _globalRoutingArteryRegistry.set(key, artery);

    if (this.nodeAdminReporter) {
      try {
        this.nodeAdminReporter(artery, NervousSystemMeta);
      } catch (err) {
        this._trace("nodeAdmin:reporter:error", { error: String(err) });
      }
    }

    return artery;
  }

  // --------------------------------------------------------------------------
  //  ORGAN REGISTRATION
  // --------------------------------------------------------------------------
  registerOrgan(organId, organInstance) {
    this.organs.set(organId, organInstance);
    this._trace("organ:registered", { organId });
  }

  // --------------------------------------------------------------------------
  //  TARGET RESOLUTION
  // --------------------------------------------------------------------------
  _determineTargets(sourceId) {
    const topo = this.anatomy.topology.get(sourceId);
    if (!topo) {
      this._trace("routing:targets:none", { sourceId });
      return [];
    }

    const outputs = topo.outputs || [];
    const bidirectional = topo.bidirectional || [];

    const targets = [...outputs, ...bidirectional].filter(
      (id) => !this.immunity.quarantined.has(id)
    );

    this._trace("routing:targets", { sourceId, targets });
    return targets;
  }

  // --------------------------------------------------------------------------
  //  ROUTING PACKET (binary, artery-aware)
  // --------------------------------------------------------------------------
  _generateRoutingPacket(sourceId, targets, bits) {
    const bitLength = bits.length;

    const throughput = this._computeRoutingThroughput(
      targets.length,
      bitLength
    );
    const pressure = this._computeRoutingPressure(
      targets.length,
      bitLength
    );
    const cost = this._computeRoutingCost(pressure, throughput);
    const budget = this._computeRoutingBudget(throughput, cost);

    const binary = {
      throughput,
      throughputBucket: _bucketLevel(throughput),

      pressure,
      pressureBucket: _bucketPressure(pressure),

      cost,
      costBucket: _bucketCost(cost),

      budget,
      budgetBucket: _bucketLevel(budget)
    };

    const payload = {
      type: "binary-routing",
      timestamp: Date.now(),
      source: sourceId,
      targets,
      binary
    };

    const json = JSON.stringify(payload);
    const encoded = this.encoder.encode(json);

    const packet = {
      ...payload,
      bits: encoded,
      bitLength: encoded.length
    };

    this.routingArtery.lastTargets = targets;
    this.routingArtery.lastSource = sourceId;

    this._trace("routing:packet", {
      bits: packet.bitLength,
      targets: targets.length
    });

    return packet;
  }

  // --------------------------------------------------------------------------
  //  LOCAL ROUTING METRIC HELPERS (legacy-compatible)
// --------------------------------------------------------------------------
  _computeRoutingThroughput(targetCount, bitLength) {
    const loadFactor = Math.min(1, targetCount / 10);
    const sizeFactor = Math.min(1, bitLength / 50000);
    return Math.max(0, Math.min(1, 1 - (loadFactor * 0.5 + sizeFactor * 0.5)));
  }

  _computeRoutingPressure(targetCount, bitLength) {
    return Math.max(0, Math.min(1, (targetCount * bitLength) / 200000));
  }

  _computeRoutingCost(pressure, throughput) {
    return Math.max(0, Math.min(1, pressure * (1 - throughput)));
  }

  _computeRoutingBudget(throughput, cost) {
    return Math.max(0, Math.min(1, throughput - cost));
  }

  // --------------------------------------------------------------------------
  //  SIGNAL PROPAGATION — Core Routing Path
  // --------------------------------------------------------------------------
  propagate(sourceId, bits) {
    if (typeof bits !== "string") return;

    const safe = this.immunity.sanitize(bits);
    if (safe !== true) return;

    const targets = this._determineTargets(sourceId);

    const now = Date.now();
    this._rollWindow(now);
    this._windowRoutes += 1;
    this._windowBits += bits.length;
    this._windowTargets += targets.length;

    this._totalRoutes += 1;
    this._totalBits += bits.length;
    this._totalTargets += targets.length;

    const routingPacket = this._generateRoutingPacket(
      sourceId,
      targets,
      bits
    );

    const artery = this._computeRoutingArtery();

    if (
      artery.pressureBucket === "overload" ||
      artery.budgetBucket === "critical"
    ) {
      this._trace("routing:spiral-warning", {
        pressure: artery.pressure,
        pressureBucket: artery.pressureBucket,
        budget: artery.budget,
        budgetBucket: artery.budgetBucket
      });
    }

    if (this.logger?.logBinary) {
      this.logger.logBinary(routingPacket.bits, {
        source: "nervous-system",
        from: sourceId,
        targets
      });
    }

    for (const targetId of targets) {
      const organ = this.organs.get(targetId);
      if (!organ) continue;

      if (typeof organ.run === "function") {
        organ.run(bits);
      } else if (typeof organ.handle === "function") {
        organ.handle(bits);
      }

      this._trace("routing:delivered", { sourceId, targetId });
    }

    return routingPacket;
  }

  // --------------------------------------------------------------------------
  //  INTERNAL TRACE
  // --------------------------------------------------------------------------
  _trace(event, payload) {
    traceNervousEvent(event, payload, this.trace);
  }
}

// ============================================================================
//  FACTORY
// ============================================================================
export function createAIBinaryNervousSystem(config) {
  return new AIBinaryNervousSystem(config);
}

// ============================================================================
//  DUAL‑MODE EXPORTS
// ============================================================================
if (typeof module !== "undefined") {
  module.exports = {
    AIBinaryNervousSystem,
    createAIBinaryNervousSystem,
    NervousSystemMeta,
    prewarmAIBinaryNervousSystem,
    getGlobalRoutingArteries
  };
}
