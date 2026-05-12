// ============================================================================
//  aiReproduction-v24-IMMORTAL++.js
//  Binary Reproduction System • Lineage-Safe • Multi-Instance Harmony
//  Artery v5 • Presence/Route/NodeAdmin/Earn/Heartbeat/Cortex/Memory Aware
//  Owner-Aware (Aldwyn) • Deterministic • Drift-Resistant • Non-Blocking
// ============================================================================

import { OrganismIdentity } from "../PULSE-X/PULSE-WORLD-MAP.js
";
import { createPulseNodeEvolutionV16 as PulseNodeAdminEvolution } from "../PULSE-TOOLS/PulseToolsNodeEvolution-v20.js";

const Identity = OrganismIdentity(import.meta.url);

// ---------------------------------------------------------------------------
//  META EXPORTS (IMMORTAL KERNEL SURFACE)
// ---------------------------------------------------------------------------

export const ReproductionMeta = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// ---------------------------------------------------------------------------
//  GLOBAL ARTERY REGISTRY (READ-ONLY, METRICS-ONLY)
// ---------------------------------------------------------------------------

const _reproductionEvolution = PulseNodeAdminEvolution({
  nodeType: "reproduction",
  trace: false
});

const _globalReproductionArteryRegistry = new Map();

function _registryKey(slice, instanceIndex) {
  return `${slice || "default"}#${instanceIndex}`;
}

export function getGlobalReproductionArteries() {
  const out = {};
  for (const [k, v] of _globalReproductionArteryRegistry.entries()) {
    out[k] = v;
  }
  return out;
}

export function prewarmReproductionArtery(slice = "default") {
  // kept for symmetry / future tuning; ensures module + registry are live
  return !!slice;
}

// ============================================================================
//  ORGAN IMPLEMENTATION — v24++ IMMORTAL++
// ============================================================================

export class AIBinaryReproduction {
  constructor(config = {}) {
    // core wiring
    this.id = config.id || "ai-binary-reproduction";
    this.encoder = config.encoder;
    this.genome = config.genome;
    this.ancestry = config.ancestry || null;
    this.factory = config.factory;
    this.logger = config.logger || null;
    this.pipeline = config.pipeline || null;
    this.reflex = config.reflex || null;
    this.monitor = config.monitor || null;
    this.trace = !!config.trace;

    this.slice = config.slice || "default";

    // rate window + recommended rate
    this.windowMs =
      typeof config.windowMs === "number" && config.windowMs > 0
        ? config.windowMs
        : 60000;

    this.recommendedRate =
      typeof config.recommendedRate === "number" && config.recommendedRate > 0
        ? config.recommendedRate
        : 32;

    // presence context provider (optional, read-only)
    this.presenceContextProvider =
      typeof config.presenceContextProvider === "function"
        ? config.presenceContextProvider
        : null;

    // route context provider (optional, read-only)
    this.routeContextProvider =
      typeof config.routeContextProvider === "function"
        ? config.routeContextProvider
        : null;

    // NodeAdmin context provider (optional, read-only)
    this.nodeAdminContextProvider =
      typeof config.nodeAdminContextProvider === "function"
        ? config.nodeAdminContextProvider
        : null;

    // Earn / economy context provider (optional, read-only)
    this.earnContextProvider =
      typeof config.earnContextProvider === "function"
        ? config.earnContextProvider
        : null;

    // Heartbeat (mom/dad/earn) context provider (optional, read-only)
    this.heartbeatContextProvider =
      typeof config.heartbeatContextProvider === "function"
        ? config.heartbeatContextProvider
        : null;

    // Cortex context provider (optional, read-only)
    this.cortexContextProvider =
      typeof config.cortexContextProvider === "function"
        ? config.cortexContextProvider
        : null;

    // Memory context provider (optional, read-only)
    this.memoryContextProvider =
      typeof config.memoryContextProvider === "function"
        ? config.memoryContextProvider
        : null;

    // NodeAdmin reporter hook (optional, metrics-only)
    this.nodeAdminReporter =
      typeof config.nodeAdminReporter === "function"
        ? config.nodeAdminReporter
        : null;

    // multi-instance identity
    this.instanceIndex = AIBinaryReproduction._registerInstance();

    // counters for artery metrics
    this._totalClones = 0;
    this._windowStart = Date.now();
    this._windowCount = 0;

    if (!this.encoder) {
      throw new Error("AIBinaryReproduction requires aiBinaryAgent encoder");
    }
    if (!this.genome) {
      throw new Error("AIBinaryReproduction requires aiBinaryGenome");
    }
    if (!this.factory) {
      throw new Error("AIBinaryReproduction requires organism factory");
    }
  }

  // ---------------------------------------------------------
  //  STATIC INSTANCE REGISTRY (MULTI-INSTANCE HARMONY)
  // ---------------------------------------------------------

  static _registerInstance() {
    if (typeof AIBinaryReproduction._instanceCount !== "number") {
      AIBinaryReproduction._instanceCount = 0;
    }
    const index = AIBinaryReproduction._instanceCount;
    AIBinaryReproduction._instanceCount += 1;
    return index;
  }

  static getInstanceCount() {
    return typeof AIBinaryReproduction._instanceCount === "number"
      ? AIBinaryReproduction._instanceCount
      : 0;
  }

  // ---------------------------------------------------------
  //  CONTEXT PROVIDERS (PRESENCE / ROUTE / NODEADMIN / EARN / HEARTBEAT / CORTEX / MEMORY)
  // ---------------------------------------------------------

  _safePresenceContext() {
    if (!this.presenceContextProvider) return null;

    try {
      const ctx = this.presenceContextProvider() || {};
      return {
        clusterId: typeof ctx.clusterId === "string" ? ctx.clusterId : null,
        presenceDensity: this._clamp01(ctx.presenceDensity),
        bandMix: {
          symbolic: this._clamp01(ctx.bandMix?.symbolic),
          dual: this._clamp01(ctx.bandMix?.dual),
          binary: this._clamp01(ctx.bandMix?.binary)
        },
        newCount: typeof ctx.newCount === "number" ? ctx.newCount : 0,
        veteranCount:
          typeof ctx.veteranCount === "number" ? ctx.veteranCount : 0,
        powerUserCount:
          typeof ctx.powerUserCount === "number" ? ctx.powerUserCount : 0
      };
    } catch (err) {
      this._trace("presence:context:error", { error: String(err) });
      return null;
    }
  }

  _safeRouteContext() {
    if (!this.routeContextProvider) return null;

    try {
      const ctx = this.routeContextProvider() || {};
      return {
        weakSegments: Array.isArray(ctx.weakSegments)
          ? ctx.weakSegments.slice(0, 32)
          : [],
        prioritySegments: Array.isArray(ctx.prioritySegments)
          ? ctx.prioritySegments.slice(0, 32)
          : [],
        corridorPressure: this._clamp01(ctx.corridorPressure),
        castleLoad: this._clamp01(ctx.castleLoad),
        serverLoad: this._clamp01(ctx.serverLoad)
      };
    } catch (err) {
      this._trace("route:context:error", { error: String(err) });
      return null;
    }
  }

  _safeNodeAdminContext() {
    if (!this.nodeAdminContextProvider) return null;

    try {
      const ctx = this.nodeAdminContextProvider() || {};
      return {
        meshPressure: this._clamp01(ctx.meshPressure),
        routePressure: this._clamp01(ctx.routePressure),
        reproductionPriority: this._clamp01(ctx.reproductionPriority)
      };
    } catch (err) {
      this._trace("nodeAdmin:context:error", { error: String(err) });
      return null;
    }
  }

  _safeEarnContext() {
    if (!this.earnContextProvider) return null;

    try {
      const ctx = this.earnContextProvider() || {};
      return {
        earnBalance:
          typeof ctx.earnBalance === "number" ? ctx.earnBalance : 0,
        activeJobs:
          typeof ctx.activeJobs === "number" ? ctx.activeJobs : 0,
        earnPressure: this._clamp01(ctx.earnPressure),
        earnPriority: this._clamp01(ctx.earnPriority)
      };
    } catch (err) {
      this._trace("earn:context:error", { error: String(err) });
      return null;
    }
  }

  _safeHeartbeatContext() {
    if (!this.heartbeatContextProvider) return null;

    try {
      const ctx = this.heartbeatContextProvider() || {};
      const normalize = (hb) => {
        if (!hb) return null;
        return {
          lastBeatAt:
            typeof hb.lastBeatAt === "number" ? hb.lastBeatAt : 0,
          state: typeof hb.state === "string" ? hb.state : "unknown",
          idleMs: typeof hb.idleMs === "number" ? hb.idleMs : 0
        };
      };

      return {
        mom: normalize(ctx.mom),
        dad: normalize(ctx.dad),
        earn: normalize(ctx.earn)
      };
    } catch (err) {
      this._trace("heartbeat:context:error", { error: String(err) });
      return null;
    }
  }

  _safeCortexContext() {
    if (!this.cortexContextProvider) return null;

    try {
      const ctx = this.cortexContextProvider() || {};
      return {
        pressure: this._clamp01(ctx.pressure),
        budget: this._clamp01(ctx.budget),
        mode: typeof ctx.mode === "string" ? ctx.mode : null
      };
    } catch (err) {
      this._trace("cortex:context:error", { error: String(err) });
      return null;
    }
  }

  _safeMemoryContext() {
    if (!this.memoryContextProvider) return null;

    try {
      const ctx = this.memoryContextProvider() || {};
      return {
        pressure: this._clamp01(ctx.pressure),
        budget: this._clamp01(ctx.budget),
        hotKeyRatio: this._clamp01(ctx.hotKeyRatio)
      };
    } catch (err) {
      this._trace("memory:context:error", { error: String(err) });
      return null;
    }
  }

  // ---------------------------------------------------------
  //  REPRODUCTION ARTERY v5 (EXTENDED METRICS)
  // ---------------------------------------------------------

  _rollWindow(now) {
    if (now - this._windowStart >= this.windowMs) {
      this._windowStart = now;
      this._windowCount = 0;
    }
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

  _clamp01(v) {
    const n = typeof v === "number" ? v : 0;
    if (n <= 0) return 0;
    if (n >= 1) return 1;
    return n;
  }

  _computeReproductionArtery() {
    const now = Date.now();
    this._rollWindow(now);

    const elapsedMs = Math.max(1, now - this._windowStart);
    const ratePerMs = this._windowCount / elapsedMs;
    const ratePerSec = ratePerMs * 1000;

    const instanceCount = AIBinaryReproduction.getInstanceCount();
    const harmonicLoad =
      instanceCount > 0 ? ratePerSec / instanceCount : ratePerSec;

    const rateFactor =
      this.recommendedRate > 0
        ? Math.min(1, harmonicLoad / this.recommendedRate)
        : 0;

    const throughput = Math.max(0, Math.min(1, 1 - rateFactor));
    const pressure = Math.max(0, Math.min(1, rateFactor));
    const cost = Math.max(0, Math.min(1, pressure * (1 - throughput)));
    const budget = Math.max(0, Math.min(1, throughput - cost));

    const presenceCtx = this._safePresenceContext();
    const routeCtx = this._safeRouteContext();
    const nodeCtx = this._safeNodeAdminContext();
    const earnCtx = this._safeEarnContext();
    const heartbeatCtx = this._safeHeartbeatContext();
    const cortexCtx = this._safeCortexContext();
    const memoryCtx = this._safeMemoryContext();

    let reproductionHint = "normal";

    if (nodeCtx && nodeCtx.reproductionPriority >= 0.7) {
      reproductionHint = "recommended";
    }
    if (routeCtx && routeCtx.corridorPressure >= 0.7) {
      reproductionHint = "recommended";
    }
    if (earnCtx && earnCtx.earnPriority >= 0.7) {
      reproductionHint = "recommended";
    }

    if (
      nodeCtx &&
      nodeCtx.reproductionPriority >= 0.9 &&
      routeCtx &&
      routeCtx.corridorPressure >= 0.8
    ) {
      reproductionHint = "urgent";
    }
    if (
      earnCtx &&
      earnCtx.earnPriority >= 0.9 &&
      (routeCtx?.corridorPressure ?? 0) >= 0.7
    ) {
      reproductionHint = "urgent";
    }

    const artery = {
      slice: this.slice,

      instanceIndex: this.instanceIndex,
      instanceCount,

      totalClones: this._totalClones,
      windowMs: this.windowMs,
      windowCount: this._windowCount,
      ratePerSec,
      harmonicLoad,

      throughput,
      pressure,
      cost,
      budget,

      throughputBucket: this._bucketLevel(throughput),
      pressureBucket: this._bucketPressure(pressure),
      costBucket: this._bucketCost(cost),
      budgetBucket: this._bucketLevel(budget),

      recommendedRate: this.recommendedRate,
      timestamp: now,

      reproductionHint,

      presence: presenceCtx && {
        clusterId: presenceCtx.clusterId,
        presenceDensity: presenceCtx.presenceDensity,
        bandMix: presenceCtx.bandMix,
        newCount: presenceCtx.newCount,
        veteranCount: presenceCtx.veteranCount,
        powerUserCount: presenceCtx.powerUserCount
      },

      routes: routeCtx && {
        weakSegments: routeCtx.weakSegments,
        prioritySegments: routeCtx.prioritySegments,
        corridorPressure: routeCtx.corridorPressure,
        castleLoad: routeCtx.castleLoad,
        serverLoad: routeCtx.serverLoad
      },

      nodeAdmin: nodeCtx && {
        meshPressure: nodeCtx.meshPressure,
        routePressure: nodeCtx.routePressure,
        reproductionPriority: nodeCtx.reproductionPriority
      },

      earn: earnCtx && {
        earnBalance: earnCtx.earnBalance,
        activeJobs: earnCtx.activeJobs,
        earnPressure: earnCtx.earnPressure,
        earnPriority: earnCtx.earnPriority
      },

      heartbeat: heartbeatCtx && {
        mom: heartbeatCtx.mom,
        dad: heartbeatCtx.dad,
        earn: heartbeatCtx.earn
      },

      cortex: cortexCtx && {
        pressure: cortexCtx.pressure,
        budget: cortexCtx.budget,
        mode: cortexCtx.mode
      },

      memory: memoryCtx && {
        pressure: memoryCtx.pressure,
        budget: memoryCtx.budget,
        hotKeyRatio: memoryCtx.hotKeyRatio
      },

      owner: {
        ownerId: ReproductionMeta.owner.ownerId,
        organRank: ReproductionMeta.owner.organRank
      }
    };

    if (
      artery.pressureBucket === "overload" ||
      artery.budgetBucket === "critical"
    ) {
      this._warn("reproduction:spiral:detected", artery);
    }

    const key = _registryKey(this.slice, this.instanceIndex);
    _globalReproductionArteryRegistry.set(key, artery);

    if (this.nodeAdminReporter) {
      try {
        this.nodeAdminReporter(artery, ReproductionMeta);
      } catch (err) {
        this._trace("nodeAdmin:reporter:error", { error: String(err) });
      }
    }

    return artery;
  }

  // PUBLIC EXPORTS
  getReproductionArtery() {
    return this._computeReproductionArtery();
  }

  getReproductionSnapshot() {
    return Object.freeze({
      meta: ReproductionMeta,
      artery: this._computeReproductionArtery()
    });
  }

  // ---------------------------------------------------------
  //  CHILD ID + PACKET EVOLUTION
  // ---------------------------------------------------------

  _generateChildId(parentId) {
    const genome = this.genome.loadGenome();
    const fp = genome?.fingerprint || "00000000";
    const suffix = fp.slice(0, 8);
    const childId = `${parentId}-child-${suffix}`;

    this._trace("child:id:generated", {
      parentId,
      childId,
      instanceIndex: this.instanceIndex
    });

    return childId;
  }

  _evolveReproductionPacket(packet, extraCtx = {}) {
    if (
      !_reproductionEvolution ||
      typeof _reproductionEvolution.evolveNodePulse !== "function"
    ) {
      return packet;
    }

    const context = {
      slice: this.slice,
      instanceIndex: this.instanceIndex,
      windowMs: this.windowMs,
      recommendedRate: this.recommendedRate,

      presence: this._safePresenceContext(),
      routes: this._safeRouteContext(),
      nodeAdmin: this._safeNodeAdminContext(),
      earn: this._safeEarnContext(),
      heartbeat: this._safeHeartbeatContext(),
      cortex: this._safeCortexContext(),
      memory: this._safeMemoryContext(),

      artery: this._computeReproductionArtery(),
      ...extraCtx
    };

    return _reproductionEvolution.evolveNodePulse({
      nodeType: "reproduction",
      pulse: packet,
      context
    });
  }

  _generateReproductionPacket(parentId, childId, genome) {
    const payload = {
      type: "binary-reproduction",
      timestamp: Date.now(),
      parentId,
      childId,
      genomeFingerprint: genome.fingerprint,
      ownerId: ReproductionMeta.owner.ownerId
    };
    const json = JSON.stringify(payload);
    const binary = this.encoder.encode(json);

    let packet = {
      ...payload,
      bits: binary,
      bitLength: binary.length
    };

    packet = this._evolveReproductionPacket(packet, {
      parentId,
      childId,
      genomeFingerprint: genome.fingerprint
    });

    this._trace("reproduction:packet", {
      parentId,
      childId,
      bits: packet.bitLength,
      instanceIndex: this.instanceIndex
    });

    return packet;
  }

  // ---------------------------------------------------------
  //  CLONING
  // ---------------------------------------------------------

  /**
   * cloneOrganism(parentId, parentConfig)
   * Creates a new organism instance with the same genome.
   * All abilities preserved; monitored via artery metrics v5.
   */
  cloneOrganism(parentId, parentConfig = {}) {
    const genome = this.genome.loadGenome();
    if (!genome) {
      throw new Error("AIBinaryReproduction: no genome available for cloning");
    }

    const childId = this._generateChildId(parentId);

    const childConfig = {
      ...parentConfig,
      organismId: childId,
      genome
    };

    const childOrganism = this.factory(childConfig);

    const packet = this._generateReproductionPacket(parentId, childId, genome);

    if (this.pipeline) this.pipeline.run(packet.bits);
    if (this.reflex) this.reflex.run(packet.bits);
    if (this.logger && typeof this.logger.logBinary === "function") {
      this.logger.logBinary(packet.bits, { source: "reproduction" });
    }

    if (
      this.ancestry &&
      typeof this.ancestry.recordReproduction === "function"
    ) {
      this.ancestry.recordReproduction({
        parentId,
        childId,
        genomeFingerprint: genome.fingerprint,
        timestamp: packet.timestamp
      });
    }

    const now = Date.now();
    this._rollWindow(now);
    this._totalClones += 1;
    this._windowCount += 1;

    const artery = this._computeReproductionArtery();

    if (typeof this.monitor === "function") {
      try {
        this.monitor(artery);
      } catch (err) {
        this._trace("monitor:error", { error: String(err) });
      }
    }

    this._trace("reproduction:clone", {
      parentId,
      childId,
      artery,
      instanceIndex: this.instanceIndex
    });

    return {
      childId,
      childOrganism,
      packet,
      artery
    };
  }

  // ---------------------------------------------------------
  //  BATCH SPAWNING
  // ---------------------------------------------------------

  /**
   * spawnMany(parentId, parentConfig, count)
   * Spawns multiple child organisms from the same parent.
   * Artery metrics reflect burst; NodeAdmin/Earn/Castle can read hints.
   */
  spawnMany(parentId, parentConfig = {}, count = 1) {
    const results = [];

    for (let i = 0; i < count; i++) {
      const result = this.cloneOrganism(parentId, parentConfig);
      results.push(result);
    }

    this._trace("reproduction:spawnMany", {
      parentId,
      count: results.length,
      instanceIndex: this.instanceIndex
    });

    return results;
  }

  // ---------------------------------------------------------
  //  INTERNAL HELPERS
  // ---------------------------------------------------------

  _warn(event, artery) {
    if (this.logger && typeof this.logger.warn === "function") {
      this.logger.warn(event, {
        artery,
        instanceIndex: this.instanceIndex,
        slice: this.slice
      });
    }
    if (typeof this.monitor === "function") {
      try {
        this.monitor(artery);
      } catch (err) {
        this._trace("monitor:error", { error: String(err) });
      }
    }
    this._trace(event, { artery, instanceIndex: this.instanceIndex });
  }

  _trace(event, payload) {
    if (!this.trace) return;
    console.log(
      `[${this.id}:${this.slice}#${this.instanceIndex}] ${event}`,
      payload
    );
  }
}

// ============================================================================
//  FACTORY — v24++ IMMORTAL++
// ============================================================================

export function createAIBinaryReproduction(config) {
  return new AIBinaryReproduction(config);
}

// ============================================================================
//  DUAL‑MODE EXPORTS (ESM + CommonJS)
// ============================================================================

if (typeof module !== "undefined") {
  module.exports = {
    ReproductionMeta,
    AIBinaryReproduction,
    createAIBinaryReproduction,
    getGlobalReproductionArteries,
    prewarmReproductionArtery
  };
}
