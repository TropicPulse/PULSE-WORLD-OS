/**
 * aiBinaryDelta.js — Pulse OS v16‑Immortal Organ
 * ---------------------------------------------------------
 * CANONICAL ROLE:
 *   Binary Delta + Compute‑Genetic Delta Engine
 *
 *   It:
 *     • computes deterministic binary diffs
 *     • computes segment deltas
 *     • computes compute‑intelligence deltas
 *     • computes tri‑heart compute deltas
 *     • emits IMMORTAL delta packets
 *
 *   Binary‑only, dualband‑safe, pure, deterministic.
 */

// ---------------------------------------------------------
//  META BLOCK — v16‑Immortal DualBand‑Safe Binary Organ
// ---------------------------------------------------------
import { OrganismIdentity } from "../PULSE-X/PulseWorldOrganismMap-v21.js";

const Identity = OrganismIdentity(import.meta.url);

// or: const Identity = OrganismIdentity["pulse-ai/ai-v24.0-IMMORTAL"] if that's the key you chose

// ============================================================================
//  META BLOCK — v24.0 IMMORTAL (ORGANISM KERNEL)
//  (now backed by the Organism Map instead of hardcoded here)
// ============================================================================
export const DeltaMeta = Identity.OrganMeta;

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
//  PACKET EMITTER — deterministic, delta-scoped
// ---------------------------------------------------------
function emitDeltaPacket(type, payload) {
  return Object.freeze({
    meta: DeltaMeta,
    packetType: `delta-${type}`,
    timestamp: Date.now(),
    epoch: DeltaMeta.evo.epoch,
    layer: DeltaMeta.layer,
    role: DeltaMeta.role,
    identity: DeltaMeta.identity,
    band: "binary",
    ...payload
  });
}

// ---------------------------------------------------------
//  PREWARM — v16‑Immortal
// ---------------------------------------------------------
export function prewarmBinaryDelta({ trace = false } = {}) {
  try {
    const sampleA = "000111000";
    const sampleB = "001011100";

    const warm = {
      added: sampleB,
      removed: sampleA
    };

    const packet = emitDeltaPacket("prewarm", {
      message: "Binary delta engine prewarmed.",
      warm
    });

    if (trace) console.log("[aiBinaryDelta] prewarm", packet);
    return packet;
  } catch (err) {
    return emitDeltaPacket("prewarm-error", {
      error: String(err),
      message: "Binary delta prewarm failed."
    });
  }
}

// ---------------------------------------------------------
//  INTERNAL HELPERS — compute delta primitives (pure, numeric)
// ---------------------------------------------------------

function safeNumber(v) {
  return typeof v === "number" && Number.isFinite(v) ? v : 0;
}

function computeScalarDelta(a, b) {
  const from = safeNumber(a);
  const to = safeNumber(b);
  return Object.freeze({
    from,
    to,
    delta: to - from
  });
}

function computeBucketDelta(aBucket, bBucket) {
  const from = aBucket ?? null;
  const to = bBucket ?? null;
  return Object.freeze({ from, to, changed: from !== to });
}

// ---------------------------------------------------------
//  ORGAN IMPLEMENTATION — v16‑Immortal
// ---------------------------------------------------------
export class AIBinaryDelta {
  constructor(config = {}) {
    this.id = config.id || "ai-binary-delta";
    this.trace = !!config.trace;

    this._cache = new Map();

    this.windowSize = config.windowSize || 0;
    this.maxCacheEntries = config.maxCacheEntries || 256;
  }

  // ---------------------------------------------------------
  //  VALIDATION
  // ---------------------------------------------------------
  _assertBinary(str) {
    if (typeof str !== "string" || !/^[01]+$/.test(str)) {
      throw new TypeError("expected binary string");
    }
  }

  _maybeEvictCache() {
    if (this._cache.size <= this.maxCacheEntries) return;
    const firstKey = this._cache.keys().next().value;
    if (firstKey !== undefined) this._cache.delete(firstKey);
  }

  // ---------------------------------------------------------
  //  BINARY DIFF CORE — v16 IMMORTAL
  // ---------------------------------------------------------
  diff(aBin, bBin) {
    this._assertBinary(aBin);
    this._assertBinary(bBin);

    const key = `${aBin}|${bBin}`;
    if (this._cache.has(key)) {
      const cached = this._cache.get(key);
      this._trace("diff-fast", { key, cached });
      return emitDeltaPacket("diff-fast", cached);
    }

    const maxLen = Math.max(aBin.length, bBin.length);
    const a = aBin.padStart(maxLen, "0");
    const b = bBin.padStart(maxLen, "0");

    let added = "";
    let removed = "";
    let unchanged = "";

    for (let i = 0; i < maxLen; i++) {
      const bitA = a[i];
      const bitB = b[i];

      if (bitA === bitB) {
        unchanged += bitA;
      } else if (bitA === "0" && bitB === "1") {
        added += "1";
      } else if (bitA === "1" && bitB === "0") {
        removed += "1";
      }
    }

    const delta = Object.freeze({
      type: "binary-delta",
      addedBits: added || "0",
      removedBits: removed || "0",
      unchangedBits: unchanged || "0",
      addedCount: added.length,
      removedCount: removed.length,
      unchangedCount: unchanged.length
    });

    this._maybeEvictCache();
    this._cache.set(key, delta);

    const packet = emitDeltaPacket("diff", {
      aBits: aBin.length,
      bBits: bBin.length,
      delta
    });

    this._trace("diff", { key, packet });
    return packet;
  }

  // ---------------------------------------------------------
  //  SEGMENT DELTA — v16 IMMORTAL
  // ---------------------------------------------------------
  segmentDelta(aBin, bBin, segmentSize = 64) {
    this._assertBinary(aBin);
    this._assertBinary(bBin);

    const maxLen = Math.max(aBin.length, bBin.length);
    const a = aBin.padStart(maxLen, "0");
    const b = bBin.padStart(maxLen, "0");

    const segments = [];
    for (let i = 0; i < maxLen; i += segmentSize) {
      const segA = a.slice(i, i + segmentSize);
      const segB = b.slice(i, i + segmentSize);

      let changed = 0;
      const len = Math.min(segA.length, segB.length);
      for (let j = 0; j < len; j++) {
        if (segA[j] !== segB[j]) changed++;
      }

      segments.push({
        index: i / segmentSize,
        changed,
        unchanged: segmentSize - changed
      });
    }

    const packet = emitDeltaPacket("segment-delta", {
      segmentSize,
      segments
    });

    this._trace("segment-delta", { segmentSize, segmentsCount: segments.length });
    return packet;
  }

  // ---------------------------------------------------------
  //  DELTA COMPRESSION — placeholder
  // ---------------------------------------------------------
  compressDelta(delta) {
    const packet = emitDeltaPacket("compress", { delta });
    this._trace("compress", { delta });
    return packet;
  }

  // ---------------------------------------------------------
  //  DELTA APPLICATION — placeholder
  // ---------------------------------------------------------
  applyDelta(aBin, delta) {
    this._assertBinary(aBin);
    const packet = emitDeltaPacket("apply", {
      aBin,
      delta,
      result: aBin
    });
    this._trace("apply", { aBits: aBin.length });
    return packet;
  }

  // ---------------------------------------------------------
  //  COMPUTE‑INTELLIGENCE DELTA — IMMORTAL v16
  //  All inputs are treated as read‑only numeric/struct surfaces.
// ---------------------------------------------------------
  computeDelta(prev, next) {
    const prevSafe = prev || {};
    const nextSafe = next || {};

    const pressure = computeScalarDelta(prevSafe.pressure, nextSafe.pressure);
    const load = computeScalarDelta(prevSafe.load, nextSafe.load);
    const advantage = computeScalarDelta(prevSafe.advantage, nextSafe.advantage);
    const speed = computeScalarDelta(prevSafe.speed, nextSafe.speed);

    const pressureBucket = computeBucketDelta(prevSafe.pressureBucket, nextSafe.pressureBucket);
    const loadBucket = computeBucketDelta(prevSafe.loadBucket, nextSafe.loadBucket);
    const advantageBucket = computeBucketDelta(prevSafe.advantageBucket, nextSafe.advantageBucket);
    const speedBucket = computeBucketDelta(prevSafe.speedBucket, nextSafe.speedBucket);

    const delta = Object.freeze({
      type: "compute-delta",
      pressure,
      load,
      advantage,
      speed,
      pressureBucket,
      loadBucket,
      advantageBucket,
      speedBucket
    });

    const packet = emitDeltaPacket("compute-delta", { delta });
    this._trace("compute-delta", { delta });
    return packet;
  }

  // ---------------------------------------------------------
  //  GPU COMPUTE DELTA — IMMORTAL v16
  // ---------------------------------------------------------
  computeGpuDelta(prev, next) {
    const prevSafe = prev || {};
    const nextSafe = next || {};

    const gpuPressure = computeScalarDelta(prevSafe.gpuPressure, nextSafe.gpuPressure);
    const gpuLoad = computeScalarDelta(prevSafe.gpuLoad, nextSafe.gpuLoad);
    const gpuUtil = computeScalarDelta(prevSafe.gpuUtil, nextSafe.gpuUtil);

    const gpuPressureBucket = computeBucketDelta(prevSafe.gpuPressureBucket, nextSafe.gpuPressureBucket);
    const gpuLoadBucket = computeBucketDelta(prevSafe.gpuLoadBucket, nextSafe.gpuLoadBucket);
    const gpuUtilBucket = computeBucketDelta(prevSafe.gpuUtilBucket, nextSafe.gpuUtilBucket);

    const delta = Object.freeze({
      type: "compute-gpu-delta",
      gpuPressure,
      gpuLoad,
      gpuUtil,
      gpuPressureBucket,
      gpuLoadBucket,
      gpuUtilBucket
    });

    const packet = emitDeltaPacket("compute-gpu-delta", { delta });
    this._trace("compute-gpu-delta", { delta });
    return packet;
  }

  // ---------------------------------------------------------
  //  ADVANTAGE DELTA — IMMORTAL v16
  // ---------------------------------------------------------
  computeAdvantageDelta(prev, next) {
    const prevSafe = prev || {};
    const nextSafe = next || {};

    const advantage = computeScalarDelta(prevSafe.advantage, nextSafe.advantage);
    const advantageBucket = computeBucketDelta(prevSafe.advantageBucket, nextSafe.advantageBucket);

    const delta = Object.freeze({
      type: "compute-advantage-delta",
      advantage,
      advantageBucket
    });

    const packet = emitDeltaPacket("compute-advantage-delta", { delta });
    this._trace("compute-advantage-delta", { delta });
    return packet;
  }

  // ---------------------------------------------------------
  //  SPEED DELTA — IMMORTAL v16
  // ---------------------------------------------------------
  computeSpeedDelta(prev, next) {
    const prevSafe = prev || {};
    const nextSafe = next || {};

    const speed = computeScalarDelta(prevSafe.speed, nextSafe.speed);
    const speedBucket = computeBucketDelta(prevSafe.speedBucket, nextSafe.speedBucket);

    const delta = Object.freeze({
      type: "compute-speed-delta",
      speed,
      speedBucket
    });

    const packet = emitDeltaPacket("compute-speed-delta", { delta });
    this._trace("compute-speed-delta", { delta });
    return packet;
  }

  // ---------------------------------------------------------
  //  PRESENCE / AVAILABILITY DELTA — IMMORTAL v16
  // ---------------------------------------------------------
  computePresenceDelta(prev, next) {
    const prevSafe = prev || {};
    const nextSafe = next || {};

    const present = {
      from: !!prevSafe.present,
      to: !!nextSafe.present,
      changed: !!prevSafe.present !== !!nextSafe.present
    };

    const capacity = computeScalarDelta(prevSafe.capacity, nextSafe.capacity);
    const capacityBucket = computeBucketDelta(prevSafe.capacityBucket, nextSafe.capacityBucket);

    const delta = Object.freeze({
      type: "compute-presence-delta",
      present,
      capacity,
      capacityBucket
    });

    const packet = emitDeltaPacket("compute-presence-delta", { delta });
    this._trace("compute-presence-delta", { delta });
    return packet;
  }

  // ---------------------------------------------------------
  //  TRI‑HEART COMPUTE DELTA — IMMORTAL v16
  //  Expects surfaces like:
  //    { mom, dad, earn } each with compute metrics.
// ---------------------------------------------------------
  triHeartComputeDelta(prev, next) {
    const prevSafe = prev || {};
    const nextSafe = next || {};

    const mom = this.computeDelta(prevSafe.mom || {}, nextSafe.mom || {}).delta;
    const dad = this.computeDelta(prevSafe.dad || {}, nextSafe.dad || {}).delta;
    const earn = this.computeDelta(prevSafe.earn || {}, nextSafe.earn || {}).delta;

    const delta = Object.freeze({
      type: "triheart-compute-delta",
      mom,
      dad,
      earn
    });

    const packet = emitDeltaPacket("triheart-compute-delta", { delta });
    this._trace("triheart-compute-delta", { delta });
    return packet;
  }

  // ---------------------------------------------------------
  //  TRACE
  // ---------------------------------------------------------
  _trace(event, payload) {
    if (!this.trace) return;
    console.log(`[${this.id}] ${event}`, payload);
  }
}

// ---------------------------------------------------------
//  FACTORY + PRESENCE SURFACE — v16 IMMORTAL
// ---------------------------------------------------------
export function createAIBinaryDelta(config = {}) {
  return new AIBinaryDelta(config);
}

export const BinaryDeltaPresence = Object.freeze({
  meta: DeltaMeta,
  create: createAIBinaryDelta,
  prewarm: prewarmBinaryDelta,
  organ: "AIBinaryDelta",
  layer: DeltaMeta.layer,
  role: DeltaMeta.role,
  version: DeltaMeta.version,
  band: "binary"
});
