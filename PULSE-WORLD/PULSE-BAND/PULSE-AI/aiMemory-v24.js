// ============================================================================
//  aiMemory.js — Pulse OS v24.0-IMMORTAL-CORE++ Organ
//  Pure PulseCoreMemory Adapter • Dualband • Binary‑Only • Zero Local Storage
//  Memory Artery v5 • Shard-Aware • Windowed Ops Metrics • Trust/Earn/Heartbeat-Aware
//  v24+ UPGRADE: OrganismMap identity + CoreMemory v24 + Signal-aware tracing
// ============================================================================
//
//  CANONICAL ROLE:
//    This organ is the **Memory Layer Adapter** of Pulse OS (dualband).
//
//    It does NOT own storage.
//    It does NOT cache locally.
//    It does NOT interpret symbolic state.
//
//    It ONLY:
//      • validates binary keys + values
//      • forwards reads/writes to PulseCoreMemory
//      • computes memory artery metrics v5 (throughput, pressure, cost, budget,
//        hot-key density, read/write balance, shard pressure, bias buckets)
//      • exposes window‑safe memory snapshots
//      • exposes artery snapshots to NodeAdmin/Overmind/Trust/Earn/Heartbeat via reporters
//
//  STORAGE TRUTH:
//    • All real storage lives in PulseCoreMemory.
//    • All caching, speed, and power optimizations are handled by PulseCoreMemory
//      and lower layers — organism‑wide, not per‑organ.
// ============================================================================

import { OrganismIdentity } from "../PULSE-X/PulseWorldOrganismMap-v24.js";
import { PulseCoreMemory } from "../PULSE-CORE/PulseCoreMemory-v24.js";

// ============================================================================
//  GLOBAL HANDLE (v24 IMMORTAL, environment-agnostic)
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
//  IDENTITY (v24 IMMORTAL)
// ============================================================================

const Identity = OrganismIdentity(import.meta.url);

export const MemoryMeta = Identity.OrganMeta;
export const MEMORY_IDENTITY = Identity;

// ============================================================================
//  SURFACE / ORGANISM LAYER EXPORTS — v24.0 IMMORTAL
// ============================================================================

export const pulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// ============================================================================
//  GLOBAL MEMORY ARTERY REGISTRY (READ-ONLY, METRICS-ONLY)
// ============================================================================

const _globalMemoryArteryRegistry = new Map();
/**
 * Registry key: `${id}#${instanceIndex}#${shardId || "root"}`
 */
function _registryKey(id, instanceIndex, shardId) {
  return `${id || MemoryMeta.identity}#${instanceIndex}#${shardId || "root"}`;
}

export function getGlobalMemoryArteries() {
  const out = {};
  for (const [k, v] of _globalMemoryArteryRegistry.entries()) {
    out[k] = v;
  }
  return out;
}

// ============================================================================
//  v24+ SIGNAL-AWARE TRACE LAYER (optional, non-fatal)
// ============================================================================

function traceMemoryEvent(event, payload, traceFlag) {
  if (!traceFlag) return;

  const message = `[aiMemory] ${event}`;

  const s = g.PulseProofSignal;
  if (s && typeof s.signal === "function") {
    s.signal({
      level: "info",
      subsystem: "memory-adapter",
      message,
      extra: payload || {},
      system: pulseRole,
      organ: MemoryMeta.identity,
      layer: surfaceMeta?.layer,
      band: "dual"
    });
    return;
  }

  console.log(message, payload);
}

// ============================================================================
//  PACKET EMITTER — deterministic, memory-scoped
// ============================================================================

function emitMemoryPacket(type, payload) {
  const now = Date.now();
  return Object.freeze({
    meta: MemoryMeta,
    packetType: `memory-${type}`,
    packetId: `memory-${type}-${now}`,
    timestamp: now,
    epoch: MemoryMeta.evo.epoch,
    ...payload
  });
}

// ============================================================================
//  PREWARM — v24.0‑IMMORTAL-CORE++
// ============================================================================

export function prewarmAIMemory({ trace = false } = {}) {
  const packet = emitMemoryPacket("prewarm", {
    message:
      "Memory adapter prewarmed, artery v5 metrics aligned, registry ready, CoreMemory v24 bound."
  });

  traceMemoryEvent("prewarm", packet, trace);
  return packet;
}

// ============================================================================
//  ORGAN IMPLEMENTATION — v24.0‑IMMORTAL-CORE++ (PulseCoreMemory‑only)
// ============================================================================

export class AIMemory {
  constructor(config = {}) {
    this.id = config.id || MemoryMeta.identity;

    this.core = config.core || PulseCoreMemory;
    this.trace = !!config.trace;

    this.maxBits = config.maxBits || 4096;

    this.nodeAdminReporter =
      typeof config.nodeAdminReporter === "function"
        ? config.nodeAdminReporter
        : null;

    this.overmindReporter =
      typeof config.overmindReporter === "function"
        ? config.overmindReporter
        : null;

    this.trustReporter =
      typeof config.trustReporter === "function"
        ? config.trustReporter
        : null;

    this.earnReporter =
      typeof config.earnReporter === "function"
        ? config.earnReporter
        : null;

    this.heartbeatReporter =
      typeof config.heartbeatReporter === "function"
        ? config.heartbeatReporter
        : null;

    this.shardId = typeof config.shardId === "string" ? config.shardId : "root";

    this.instanceIndex = AIMemory._registerInstance();

    if (
      !this.core ||
      typeof this.core.writeBinary !== "function" ||
      typeof this.core.readBinary !== "function"
    ) {
      throw new Error(
        "AIMemory requires PulseCoreMemory with writeBinary(key, value) and readBinary(key)"
      );
    }

    this.windowMs =
      typeof config.windowMs === "number" && config.windowMs > 0
        ? config.windowMs
        : 60000;

    this._windowStart = Date.now();
    this._windowReads = 0;
    this._windowWrites = 0;
    this._windowDeletes = 0;
    this._windowSnapshots = 0;

    this._totalReads = 0;
    this._totalWrites = 0;
    this._totalDeletes = 0;
    this._totalSnapshots = 0;

    this._hotKeyHits = 0;
    this._windowHotKeyHits = 0;

    this._lastArterySnapshot = null;
  }

  // --------------------------------------------------------------------------
  //  STATIC INSTANCE REGISTRY
  // --------------------------------------------------------------------------

  static _registerInstance() {
    if (typeof AIMemory._instanceCount !== "number") {
      AIMemory._instanceCount = 0;
    }
    const idx = AIMemory._instanceCount;
    AIMemory._instanceCount += 1;
    return idx;
  }

  static getInstanceCount() {
    return typeof AIMemory._instanceCount === "number"
      ? AIMemory._instanceCount
      : 0;
  }

  // --------------------------------------------------------------------------
  //  WINDOW ROLLING
  // --------------------------------------------------------------------------

  _rollWindow(now) {
    if (now - this._windowStart >= this.windowMs) {
      this._windowStart = now;
      this._windowReads = 0;
      this._windowWrites = 0;
      this._windowDeletes = 0;
      this._windowSnapshots = 0;
      this._windowHotKeyHits = 0;
    }
  }

  // --------------------------------------------------------------------------
  //  ARTERY METRICS — v5 (segment + window + shard + hot-key + bias)
// --------------------------------------------------------------------------

  _computeMemoryThroughput(segmentCount, avgSize) {
    const countFactor = Math.min(1, segmentCount / 100);
    const sizeFactor = Math.min(1, avgSize / this.maxBits);
    const raw = Math.max(0, 1 - (countFactor * 0.5 + sizeFactor * 0.5));
    return Math.min(1, raw);
  }

  _computeMemoryPressure(totalBits, maxBits) {
    const raw = Math.min(1, totalBits / maxBits);
    return Math.max(0, raw);
  }

  _computeMemoryCost(pressure, throughput) {
    const raw = pressure * (1 - throughput);
    return Math.max(0, Math.min(1, raw));
  }

  _computeMemoryBudget(throughput, cost) {
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

  _bucketBias(ratio) {
    if (ratio === 0) return "idle";
    if (ratio < 0.5) return "write-heavy";
    if (ratio > 2.0) return "read-heavy";
    return "balanced";
  }

  _bucketHotKeyRatio(r) {
    if (r >= 0.8) return "hot-concentrated";
    if (r >= 0.4) return "hot-mixed";
    if (r > 0) return "hot-sparse";
    return "no-hot-keys";
  }

  _computeMemoryArtery() {
    const now = Date.now();
    this._rollWindow(now);

    const meta = this.core.getBinaryMeta
      ? this.core.getBinaryMeta(this.shardId)
      : { segmentCount: 0, totalBits: 0, avgSize: 0, hotKeys: 0, shardCount: 1 };

    const segmentCount = meta.segmentCount || 0;
    const totalBits = meta.totalBits || 0;
    const avgSize = meta.avgSize || 0;
    const shardCount = meta.shardCount || 1;
    const hotKeys = meta.hotKeys || 0;

    const throughput = this._computeMemoryThroughput(segmentCount, avgSize);
    const pressure = this._computeMemoryPressure(totalBits, this.maxBits);
    const cost = this._computeMemoryCost(pressure, throughput);
    const budget = this._computeMemoryBudget(throughput, cost);

    const elapsedMs = Math.max(1, now - this._windowStart);
    const opsInWindow =
      this._windowReads +
      this._windowWrites +
      this._windowDeletes +
      this._windowSnapshots;

    const opsPerSec = (opsInWindow / elapsedMs) * 1000;
    const instanceCount = AIMemory.getInstanceCount();
    const harmonicLoad =
      instanceCount > 0 ? opsPerSec / instanceCount : opsPerSec;

    const hotKeyRatio =
      segmentCount > 0 ? Math.min(1, hotKeys / segmentCount) : 0;

    const readWriteRatio =
      this._windowWrites > 0
        ? Math.min(4, this._windowReads / this._windowWrites)
        : this._windowReads > 0
        ? 4
        : 0;

    const biasBucket = this._bucketBias(
      this._windowWrites > 0
        ? this._windowReads / this._windowWrites
        : this._windowReads > 0
        ? 4
        : 0
    );

    const hotKeyBucket = this._bucketHotKeyRatio(hotKeyRatio);

    const artery = {
      throughput,
      throughputBucket: this._bucketLevel(throughput),

      pressure,
      pressureBucket: this._bucketPressure(pressure),

      cost,
      costBucket: this._bucketCost(cost),

      budget,
      budgetBucket: this._bucketLevel(budget),

      segmentCount,
      totalBits,
      avgSize,

      shardId: this.shardId,
      shardCount,

      hotKeys,
      hotKeyRatio,
      hotKeyBucket,

      windowMs: this.windowMs,
      windowReads: this._windowReads,
      windowWrites: this._windowWrites,
      windowDeletes: this._windowDeletes,
      windowSnapshots: this._windowSnapshots,
      windowHotKeyHits: this._windowHotKeyHits,

      totalReads: this._totalReads,
      totalWrites: this._totalWrites,
      totalDeletes: this._totalDeletes,
      totalSnapshots: this._totalSnapshots,
      opsPerSec,
      harmonicLoad,
      readWriteRatio,
      readWriteBiasBucket: biasBucket,

      instanceIndex: this.instanceIndex,
      instanceCount,
      id: this.id,
      timestamp: now
    };

    const key = _registryKey(this.id, this.instanceIndex, this.shardId);
    _globalMemoryArteryRegistry.set(key, artery);

    this._lastArterySnapshot = artery;

    const metaForReport = {
      id: this.id,
      shardId: this.shardId,
      instanceIndex: this.instanceIndex,
      epoch: MemoryMeta.evo.epoch
    };

    if (this.nodeAdminReporter) {
      try {
        this.nodeAdminReporter(artery, metaForReport);
      } catch (err) {
        this._trace("nodeAdmin:reporter:error", { error: String(err) });
      }
    }

    if (this.overmindReporter) {
      try {
        this.overmindReporter(artery, metaForReport);
      } catch (err) {
        this._trace("overmind:reporter:error", { error: String(err) });
      }
    }

    if (this.trustReporter) {
      try {
        this.trustReporter(artery, metaForReport);
      } catch (err) {
        this._trace("trust:reporter:error", { error: String(err) });
      }
    }

    if (this.earnReporter) {
      try {
        this.earnReporter(artery, metaForReport);
      } catch (err) {
        this._trace("earn:reporter:error", { error: String(err) });
      }
    }

    if (this.heartbeatReporter) {
      try {
        this.heartbeatReporter(artery, metaForReport);
      } catch (err) {
        this._trace("heartbeat:reporter:error", { error: String(err) });
      }
    }

    return artery;
  }

  getMemoryArterySnapshot() {
    return this._computeMemoryArtery();
  }

  // --------------------------------------------------------------------------
  //  SHARDED KEY HELPERS (adapter-only, still binary)
// --------------------------------------------------------------------------

  _withShard(keyBin) {
    return { shardId: this.shardId, keyBin };
  }

  // --------------------------------------------------------------------------
  //  WRITE — forwards directly to PulseCoreMemory
  // --------------------------------------------------------------------------

  write(keyBin, valueBin) {
    this._assertBinary(keyBin);
    this._assertBinary(valueBin);

    let toStore = valueBin;
    if (toStore.length > this.maxBits) {
      this._trace("write:truncated", { keyBin, originalBits: toStore.length });
      toStore = toStore.slice(-this.maxBits);
    }

    const { shardId, keyBin: k } = this._withShard(keyBin);

    if (this.core.writeBinary.length === 3) {
      this.core.writeBinary(shardId, k, toStore);
    } else {
      this.core.writeBinary(k, toStore);
    }

    this._totalWrites += 1;
    this._windowWrites += 1;

    const artery = this._computeMemoryArtery();
    this._trace("write", { keyBin: k, valueBits: toStore.length, shardId, artery });

    const packet = emitMemoryPacket("write", {
      keyBits: k.length,
      valueBits: toStore.length,
      shardId,
      artery
    });

    traceMemoryEvent("write", packet, this.trace);
    return packet;
  }

  // --------------------------------------------------------------------------
  //  READ — forwards directly to PulseCoreMemory
  // --------------------------------------------------------------------------

  read(keyBin) {
    this._assertBinary(keyBin);

    const { shardId, keyBin: k } = this._withShard(keyBin);

    let value;
    if (this.core.readBinary.length === 2) {
      value = this.core.readBinary(shardId, k);
    } else {
      value = this.core.readBinary(k);
    }

    this._totalReads += 1;
    this._windowReads += 1;

    if (value && value.length > 0) {
      this._hotKeyHits += 1;
      this._windowHotKeyHits += 1;
    }

    const artery = this._computeMemoryArtery();
    this._trace("read", {
      keyBin: k,
      valueBits: value ? value.length : 0,
      shardId,
      artery
    });

    const packet = emitMemoryPacket("read", {
      keyBits: k.length,
      valueBits: value ? value.length : 0,
      shardId,
      found: !!value,
      artery
    });

    traceMemoryEvent("read", packet, this.trace);
    return value;
  }

  // --------------------------------------------------------------------------
  //  DELETE — forwards directly to PulseCoreMemory
  // --------------------------------------------------------------------------

  delete(keyBin) {
    this._assertBinary(keyBin);

    const { shardId, keyBin: k } = this._withShard(keyBin);

    let existed = false;
    if (this.core.deleteBinary) {
      if (this.core.deleteBinary.length === 2) {
        existed = this.core.deleteBinary(shardId, k);
      } else {
        existed = this.core.deleteBinary(k);
      }
    }

    this._totalDeletes += 1;
    this._windowDeletes += 1;

    const artery = this._computeMemoryArtery();
    this._trace("delete", { keyBin: k, shardId, existed, artery });

    const packet = emitMemoryPacket("delete", {
      keyBits: k.length,
      existed,
      shardId,
      artery
    });

    traceMemoryEvent("delete", packet, this.trace);
    return packet;
  }

  // --------------------------------------------------------------------------
  //  LIST KEYS — delegated to PulseCoreMemory
  // --------------------------------------------------------------------------

  listKeys() {
    let keys = [];

    if (this.core.listBinaryKeys) {
      if (this.core.listBinaryKeys.length === 1) {
        keys = this.core.listBinaryKeys(this.shardId) || [];
      } else {
        keys = this.core.listBinaryKeys() || [];
      }
    }

    const artery = this._computeMemoryArtery();
    this._trace("listKeys", {
      keyCount: keys.length,
      shardId: this.shardId,
      artery
    });

    const packet = emitMemoryPacket("list-keys", {
      shardId: this.shardId,
      keyCount: keys.length,
      artery
    });

    traceMemoryEvent("listKeys", packet, this.trace);
    return keys;
  }

  snapshot() {
    let out = "";

    if (this.core.snapshotBinary) {
      if (this.core.snapshotBinary.length === 2) {
        out = this.core.snapshotBinary(this.shardId, this.maxBits) || "";
      } else {
        out = this.core.snapshotBinary(this.maxBits) || "";
      }
    } else {
      const keys = this.listKeys().slice().sort();
      for (const key of keys) {
        const val =
          this.core.readBinary.length === 2
            ? this.core.readBinary(this.shardId, key) || ""
            : this.core.readBinary(key) || "";
        out += key + val;
      }
    }

    if (out.length > this.maxBits) {
      this._trace("snapshot:truncated", { originalBits: out.length });
      out = out.slice(-this.maxBits);
    }

    this._totalSnapshots += 1;
    this._windowSnapshots += 1;

    const artery = this._computeMemoryArtery();
    this._trace("snapshot", {
      bits: out.length,
      shardId: this.shardId,
      artery
    });

    const packet = emitMemoryPacket("snapshot", {
      shardId: this.shardId,
      bits: out.length,
      artery
    });

    traceMemoryEvent("snapshot", packet, this.trace);
    return out;
  }

  snapshotArteryPacket() {
    const artery = this._computeMemoryArtery();
    const packet = emitMemoryPacket("artery-snapshot", {
      shardId: this.shardId,
      artery
    });

    traceMemoryEvent("snapshotArteryPacket", packet, this.trace);
    return packet;
  }

  lastArtery() {
    return this._lastArterySnapshot
      ? { ...this._lastArterySnapshot }
      : this._computeMemoryArtery();
  }

  _assertBinary(str) {
    if (typeof str !== "string" || !/^[01]+$/.test(str)) {
      throw new TypeError("expected binary string");
    }
  }

  _trace(event, payload) {
    traceMemoryEvent(event, payload, this.trace);
  }
}

// ============================================================================
//  FACTORY
// ============================================================================

export function createAIMemory(config) {
  return new AIMemory(config);
}

// ============================================================================
//  ORGAN EXPORT — v24 IMMORTAL
// ============================================================================

export const aiMemory = Object.freeze({
  meta: MemoryMeta,
  create: createAIMemory
});

// ============================================================================
//  DUAL‑MODE EXPORTS (ESM + CommonJS)
// ============================================================================

if (typeof module !== "undefined") {
  module.exports = {
    MEMORY_IDENTITY,
    MemoryMeta,
    pulseRole,
    surfaceMeta,
    pulseLoreContext,
    AI_EXPERIENCE_META,
    EXPORT_META,
    AIMemory,
    createAIMemory,
    prewarmAIMemory,
    getGlobalMemoryArteries,
    aiMemory
  };
}
