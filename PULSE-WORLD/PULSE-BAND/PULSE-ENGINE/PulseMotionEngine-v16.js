// ============================================================================
// PulseMotionEngine-v16-Immortal-Evo+.js — Unified Motion Engine
//  • One engine, multi-lane motion (forward + backward)
//  • Dual-band aware (symbolic/binary), ShifterPulse-first
//  • Drift-proof via normalized job/intents (multi-instance safe)
//  • Deterministic tick sequencing (shared tick space)
//  • Presence/advantage-aware, artery metrics, prewarm-aware, tri-heart aware
// ============================================================================

/*
AI_EXPERIENCE_META = {
  identity: "PulseMotionEngine",
  version: "v16-Immortal-Evo+",
  layer: "pulsenet_engine",
  role: "unified_motion_engine",
  lineage: [
    "ForwardEngine-v16-Immortal-Evo+",
    "BackwardEngine-v16-Immortal-Evo+"
  ],

  evo: {
    motionEngine: true,
    forwardLane: true,
    backwardLane: true,

    patternExpansion: true,
    patternCompression: true,
    jobAware: true,
    chunkAware: true,
    prewarmAware: true,
    arteryMetricsAware: true,

    symbolicPrimary: true,
    binaryAware: true,
    dualBand: true,

    presenceAware: true,
    advantageAware: true,
    triHeartAware: true,

    deterministic: true,
    driftProof: true,
    pureCompute: true,
    zeroMutationOfInput: true,

    zeroNetwork: true,
    zeroFilesystem: true
  },

  contract: {
    always: [
      "PulseNet",
      "PulseChunker"
    ],
    never: [
      "safeRoute",
      "fetchViaCNS",
      "presenceEngine",
      "meshKernel",
      "routerCore"
    ]
  }
}
*/

import { createShifterPulse as ShifterPulse } from "../PULSE-SHIFTER/PulseBinaryShifterEvolutionaryPulse-v16.js";

export const PulseMotionEngineMeta = Object.freeze({
  lane: "motion",
  version: "16-Immortal-Evo+",
  identity: "PulseMotionEngine-v16-Immortal-Evo+",
  evo: Object.freeze({
    deterministic: true,
    driftProof: true,
    binaryFirst: true,
    chunkAware: true,
    memoryAware: true,
    multiInstanceReady: true,
    dualBandAware: true,
    symbolicPrimary: true,
    binaryNonExecutable: true,
    shifterPulseAware: true,

    presenceAware: true,
    advantageAware: true,
    triHeartAware: true,
    prewarmAware: true,
    arteryMetricsAware: true
  })
});

// Keys preserved for compatibility
const FORWARD_JOB_QUEUE_KEY  = "evo:forward:jobs";
const FORWARD_RESULT_KEY     = "evo:forward:results";
const FORWARD_METRICS_KEY    = "evo:forward:metrics";

const BACKWARD_JOB_QUEUE_KEY = "evo:backward:jobs";
const BACKWARD_RESULT_KEY    = "evo:backward:results";
const BACKWARD_METRICS_KEY   = "evo:backward:metrics";

function safe(fn, ...args) {
  try {
    if (typeof fn === "function") return fn(...args);
  } catch (err) {
    console.warn("[PulseMotionEngine] safe call failed:", err);
  }
  return undefined;
}

// Shared monotonic tick sequence (engine-local)
let globalTickId = 0;

// ---------------------------------------------------------------------------
// Arteries — per-lane engine metrics (symbolic only)
// ---------------------------------------------------------------------------
const ForwardArtery = {
  ticks: 0,
  jobsConsumed: 0,
  selfJobsGenerated: 0,
  lastPatternsCount: 0,
  lastDurationMs: 0,
  prewarms: 0,
  lastBand: "symbolic",
  lastDnaTag: null,
  snapshot() {
    const ticks = ForwardArtery.ticks;
    const jobs = ForwardArtery.jobsConsumed;
    const prewarms = ForwardArtery.prewarms;

    const load = Math.min(1, ticks / 4096);
    const pressure = Math.min(1, jobs / Math.max(1, ticks || 1));

    const loadBucket =
      load >= 0.9 ? "saturated" :
      load >= 0.7 ? "high" :
      load >= 0.4 ? "medium" :
      load > 0    ? "low" :
                    "idle";

    const pressureBucket =
      pressure >= 0.9 ? "overload" :
      pressure >= 0.7 ? "high" :
      pressure >= 0.4 ? "medium" :
      pressure > 0    ? "low" :
                        "none";

    return Object.freeze({
      ticks,
      jobsConsumed: jobs,
      selfJobsGenerated: ForwardArtery.selfJobsGenerated,
      lastPatternsCount: ForwardArtery.lastPatternsCount,
      lastDurationMs: ForwardArtery.lastDurationMs,
      prewarms,
      lastBand: ForwardArtery.lastBand,
      lastDnaTag: ForwardArtery.lastDnaTag,
      load,
      loadBucket,
      pressure,
      pressureBucket
    });
  }
};

const BackwardArtery = {
  ticks: 0,
  jobsConsumed: 0,
  selfJobsGenerated: 0,
  lastPatternsCount: 0,
  lastDurationMs: 0,
  prewarms: 0,
  lastBand: "symbolic",
  lastDnaTag: null,
  snapshot() {
    const ticks = BackwardArtery.ticks;
    const jobs = BackwardArtery.jobsConsumed;
    const prewarms = BackwardArtery.prewarms;

    const load = Math.min(1, ticks / 4096);
    const pressure = Math.min(1, jobs / Math.max(1, ticks || 1));

    const loadBucket =
      load >= 0.9 ? "saturated" :
      load >= 0.7 ? "high" :
      load >= 0.4 ? "medium" :
      load > 0    ? "low" :
                    "idle";

    const pressureBucket =
      pressure >= 0.9 ? "overload" :
      pressure >= 0.7 ? "high" :
      pressure >= 0.4 ? "medium" :
      pressure > 0    ? "low" :
                        "none";

    return Object.freeze({
      ticks,
      jobsConsumed: jobs,
      selfJobsGenerated: BackwardArtery.selfJobsGenerated,
      lastPatternsCount: BackwardArtery.lastPatternsCount,
      lastDurationMs: BackwardArtery.lastDurationMs,
      prewarms,
      lastBand: BackwardArtery.lastBand,
      lastDnaTag: BackwardArtery.lastDnaTag,
      load,
      loadBucket,
      pressure,
      pressureBucket
    });
  }
};

// ---------------------------------------------------------------------------
// ShifterPulse adapter — band-aware wrapper around v16 shifter
// ---------------------------------------------------------------------------
function createShifterAdapter({ lane, instanceId }) {
  const shifter =
    typeof ShifterPulse === "function"
      ? ShifterPulse({ lane, instanceId })
      : (ShifterPulse && typeof ShifterPulse.create === "function"
          ? ShifterPulse.create({ lane, instanceId })
          : ShifterPulse);

  const hasShifter =
    shifter &&
    (typeof shifter.encode === "function" ||
      typeof shifter.shiftEncode === "function");

  function encode(value, { band }) {
    if (!hasShifter) return "";
    if (typeof shifter.encode === "function") {
      return shifter.encode(value, { band: band || "symbolic" });
    }
    if (typeof shifter.shiftEncode === "function") {
      return shifter.shiftEncode("regular", "binary", value, {
        band: band || "symbolic"
      });
    }
    return "";
  }

  function decode(bits, { band }) {
    if (!hasShifter) return undefined;
    if (typeof shifter.decode === "function") {
      return shifter.decode(bits, { band: band || "symbolic" });
    }
    if (typeof shifter.shiftDecode === "function") {
      return shifter.shiftDecode("binary", "regular", bits, {
        band: band || "symbolic"
      });
    }
    return undefined;
  }

  function chunk(bits, { band }) {
    if (!hasShifter) return [];
    if (typeof shifter.chunk === "function") {
      return shifter.chunk(bits, { band: band || "symbolic" }) || [];
    }
    if (typeof shifter.shiftChunk === "function") {
      return shifter.shiftChunk("binary", bits, {
        band: band || "symbolic"
      }) || [];
    }
    return [];
  }

  function dechunk(chunks, { band }) {
    if (!hasShifter) return "";
    if (typeof shifter.dechunk === "function") {
      return shifter.dechunk(chunks, { band: band || "symbolic" }) || "";
    }
    if (typeof shifter.shiftDechunk === "function") {
      return shifter.shiftDechunk("binary", chunks, {
        band: band || "symbolic"
      }) || "";
    }
    return "";
  }

  return { encode, decode, chunk, dechunk, hasShifter };
}

// ---------------------------------------------------------------------------
// Normalization / multi-instance drift-proofing
// ---------------------------------------------------------------------------
function normalizeJob(job, { instanceId, lane }) {
  const laneTag = lane === "backward" ? "backward" : "forward";
  const typeUnknown =
    laneTag === "backward" ? "evo:backward:unknown" : "evo:forward:unknown";
  const typeGeneric =
    laneTag === "backward" ? "evo:backward:generic" : "evo:forward:generic";

  if (!job || typeof job !== "object") {
    return {
      id: `job-${laneTag}-${instanceId}-${globalTickId}`,
      type: typeUnknown,
      payload: {},
      lane: laneTag,
      __band: "symbolic",
      __dnaTag: null
    };
  }

  const payload = job.payload && typeof job.payload === "object"
    ? job.payload
    : {};

  const band =
    typeof payload.__band === "string"
      ? payload.__band.toLowerCase()
      : "symbolic";

  return {
    id: job.id || `job-${laneTag}-${instanceId}-${globalTickId}`,
    type: job.type || typeGeneric,
    payload,
    lane: laneTag,
    __band: band === "binary" ? "binary" : "symbolic",
    __dnaTag: typeof payload.__dnaTag === "string" ? payload.__dnaTag : null
  };
}

function normalizeMetrics(base, extra = {}, { lane }) {
  const artery = lane === "backward"
    ? BackwardArtery.snapshot()
    : ForwardArtery.snapshot();

  return {
    lane,
    instanceId: base.instanceId,
    tickId: base.tickId,
    jobId: base.jobId,
    durationMs: extra.durationMs ?? 0,
    patternsCount: extra.patternsCount ?? 0,
    band: base.band || "symbolic",
    dnaTag: base.dnaTag || null,
    presenceField: base.presenceField || null,
    advantageField: base.advantageField || null,
    triHeartId: base.triHeartId || null,
    artery
  };
}

// ============================================================================
// Factory — Pulse Motion Engine v16-Immortal-Evo+
// ============================================================================
export function createPulseMotionEngine({
  MemoryOrgan,
  BrainOrgan,
  instanceId = "motion-0",
  trace = false,
  presenceContext = {},
  advantageContext = {},
  triHeartId = "motion-heart"
} = {}) {
  if (!MemoryOrgan) {
    throw new Error("[PulseMotionEngine] MemoryOrgan is required.");
  }

  const Shifter = createShifterAdapter({ lane: "motion", instanceId });
  let enginePrewarmed = false;

  // --------------------------------------------------------------------------
  // Job intake (drift-proof, normalized) — per lane
  // --------------------------------------------------------------------------
  function readJobQueue(lane) {
    const key = lane === "backward" ? BACKWARD_JOB_QUEUE_KEY : FORWARD_JOB_QUEUE_KEY;
    const raw = safe(MemoryOrgan.read, key);
    if (!raw || !Array.isArray(raw)) return [];
    return raw;
  }

  function writeJobQueue(lane, queue) {
    const key = lane === "backward" ? BACKWARD_JOB_QUEUE_KEY : FORWARD_JOB_QUEUE_KEY;
    safe(MemoryOrgan.write, key, queue);
  }

  function takeNextJob(lane) {
    const queue = readJobQueue(lane);
    if (!queue.length) return null;
    const job = queue.shift();
    writeJobQueue(lane, queue);
    return normalizeJob(job, { instanceId, lane });
  }

  function submitJob(lane, job) {
    const queue = readJobQueue(lane);
    const normalized = normalizeJob(job, { instanceId, lane });

    queue.push({
      ...normalized,
      submittedTick: globalTickId
    });

    writeJobQueue(lane, queue);

    if (trace) console.log("[PulseMotionEngine] job submitted:", lane, normalized);
  }

  // Public lane-specific submitters
  function submitForwardJob(job) {
    submitJob("forward", job);
  }

  function submitBackwardJob(job) {
    submitJob("backward", job);
  }

  // --------------------------------------------------------------------------
  // Self-generated jobs when idle (deterministic shape)
// --------------------------------------------------------------------------
  function createSelfJob(lane) {
    const laneTag = lane === "backward" ? "backward" : "forward";
    const typeSelf =
      laneTag === "backward" ? "self:evo-backward" : "self:evo-forward";

    const selfJob = normalizeJob(
      {
        id: `self-${laneTag}-${instanceId}-${globalTickId}`,
        type: typeSelf,
        payload: {
          hint: `self-generated-${laneTag}`,
          origin: "PulseMotionEngine"
        }
      },
      { instanceId, lane: laneTag }
    );

    if (laneTag === "backward") {
      BackwardArtery.selfJobsGenerated += 1;
    } else {
      ForwardArtery.selfJobsGenerated += 1;
    }

    return selfJob;
  }

  // --------------------------------------------------------------------------
  // Shared presence/advantage field construction
  // --------------------------------------------------------------------------
  function buildPresenceField() {
    return {
      band: presenceContext.band || "pulseband",
      deviceId: presenceContext.deviceId || null,
      hydraNodeId: presenceContext.hydraNodeId || null,
      route: presenceContext.route || "/",
      triHeartId
    };
  }

  function buildAdvantageField() {
    return {
      advantageScore: advantageContext.advantageScore ?? 1.0,
      cascadeLevel: advantageContext.cascadeLevel ?? 0,
      timeSavedMs: advantageContext.timeSavedMs ?? 0
    };
  }

  // --------------------------------------------------------------------------
  // Core forward compute (expand, predict, factor, pattern-find)
// --------------------------------------------------------------------------
  function computeForward(job) {
    const tickId = globalTickId;

    const presenceField = buildPresenceField();
    const advantageField = buildAdvantageField();

    const baseMeta = {
      lane: "forward",
      instanceId,
      tickId,
      jobId: job.id,
      band: job.__band || "symbolic",
      dnaTag: job.__dnaTag || null,
      presenceField,
      advantageField,
      triHeartId
    };

    const payload = job.payload || {};

    const score =
      typeof payload.score === "number"
        ? payload.score
        : typeof payload.baseScore === "number"
          ? payload.baseScore
          : 0.5;

    const clampedScore = Math.max(0, Math.min(1, score));
    const boostedScore = Math.max(0, Math.min(1, clampedScore + 0.1));

    let patterns = Array.isArray(payload.patterns) ? payload.patterns.slice() : [];

    if (patterns.length < 8) {
      const nextId = `p-${patterns.length + 1}`;
      patterns.push({
        id: nextId,
        weight: boostedScore,
        source: payload.source || "forward-engine",
        lane: "forward"
      });
    }

    const prefillChunks = patterns.map((p) => ({
      id: p.id,
      weight: typeof p.weight === "number" ? p.weight : boostedScore,
      hint: "forward-prefill",
      lane: "forward"
    }));

    const resultPayload = {
      ...payload,
      lane: "forward",
      boostedScore,
      patterns,
      prefillChunks,
      __band: baseMeta.band,
      __dnaTag: baseMeta.dnaTag
    };

    const metrics = normalizeMetrics(
      baseMeta,
      {
        durationMs: 0,
        patternsCount: patterns.length
      },
      { lane: "forward" }
    );

    ForwardArtery.lastPatternsCount = patterns.length;
    ForwardArtery.lastDurationMs = 0;
    ForwardArtery.lastBand = baseMeta.band;
    ForwardArtery.lastDnaTag = baseMeta.dnaTag;

    return {
      meta: baseMeta,
      payload: resultPayload,
      metrics
    };
  }

  // --------------------------------------------------------------------------
  // Core backward compute (stabilize, normalize, compress, pattern-reduce)
// --------------------------------------------------------------------------
  function computeBackward(job) {
    const tickId = globalTickId;

    const presenceField = buildPresenceField();
    const advantageField = buildAdvantageField();

    const baseMeta = {
      lane: "backward",
      instanceId,
      tickId,
      jobId: job.id,
      band: job.__band || "symbolic",
      dnaTag: job.__dnaTag || null,
      presenceField,
      advantageField,
      triHeartId
    };

    const payload = job.payload || {};

    const score =
      typeof payload.boostedScore === "number"
        ? payload.boostedScore
        : typeof payload.score === "number"
          ? payload.score
          : 0.5;

    const clampedScore = Math.max(0, Math.min(1, score));
    const stabilizedScore = Math.max(0, Math.min(1, clampedScore - 0.05));

    let patterns = Array.isArray(payload.patterns) ? payload.patterns.slice() : [];
    const seen = new Set();
    patterns = patterns.filter((p) => {
      if (!p || typeof p !== "object") return false;
      const key = `${p.id ?? "?"}:${p.weight ?? 0}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    const compressedHints = patterns.slice(0, 4).map((p) => ({
      id: p.id,
      bucket: (typeof p.weight === "number" && p.weight > 0.5) ? "high" : "low"
    }));

    const resultPayload = {
      ...payload,
      lane: "backward",
      stabilizedScore,
      patterns,
      compressedHints,
      __band: baseMeta.band,
      __dnaTag: baseMeta.dnaTag
    };

    const metrics = normalizeMetrics(
      baseMeta,
      {
        durationMs: 0,
        patternsCount: patterns.length
      },
      { lane: "backward" }
    );

    BackwardArtery.lastPatternsCount = patterns.length;
    BackwardArtery.lastDurationMs = 0;
    BackwardArtery.lastBand = baseMeta.band;
    BackwardArtery.lastDnaTag = baseMeta.dnaTag;

    return {
      meta: baseMeta,
      payload: resultPayload,
      metrics
    };
  }

  // --------------------------------------------------------------------------
  // Binary/regular encode + chunk + write results via ShifterPulse
  // --------------------------------------------------------------------------
  function writeResult(lane, result) {
    const band = result.metrics.band || "symbolic";

    const encoded = Shifter.encode(result, { band }) || "";
    const chunks  = Shifter.chunk(encoded, { band }) || [];

    const packet = {
      bits: chunks,
      meta: {
        lane,
        instanceId,
        tickId: result.metrics.tickId,
        jobId: result.metrics.jobId,
        band: result.metrics.band,
        dnaTag: result.metrics.dnaTag,
        shifterPulse: Shifter.hasShifter === true ? "enabled" : "fallback-binary",
        presenceField: result.metrics.presenceField,
        advantageField: result.metrics.advantageField,
        triHeartId: result.metrics.triHeartId,
        artery: result.metrics.artery
      }
    };

    const resultKey  = lane === "backward" ? BACKWARD_RESULT_KEY  : FORWARD_RESULT_KEY;
    const metricsKey = lane === "backward" ? BACKWARD_METRICS_KEY : FORWARD_METRICS_KEY;

    safe(MemoryOrgan.write, resultKey, packet);
    safe(MemoryOrgan.write, metricsKey, result.metrics);

    if (trace) {
      console.log("[PulseMotionEngine] result written:", {
        lane,
        key: resultKey,
        metrics: result.metrics,
        shifterPulse: packet.meta.shifterPulse
      });
    }
  }

  // --------------------------------------------------------------------------
  // Optional: feed Brain with lane-specific hints
  // --------------------------------------------------------------------------
  function feedBrain(lane, result) {
    if (!BrainOrgan || typeof BrainOrgan.evolve !== "function") return;

    if (lane === "forward") {
      BrainOrgan.evolve({
        type: "evo:forward:hint",
        payload: {
          lane: "forward",
          instanceId,
          tickId: result.metrics.tickId,
          jobId: result.metrics.jobId,
          boostedScore: result.payload.boostedScore,
          patternsCount: result.metrics.patternsCount,
          band: result.metrics.band,
          dnaTag: result.metrics.dnaTag,
          presenceField: result.metrics.presenceField,
          advantageField: result.metrics.advantageField,
          triHeartId: result.metrics.triHeartId
        }
      });
    } else {
      BrainOrgan.evolve({
        type: "evo:backward:hint",
        payload: {
          lane: "backward",
          instanceId,
          tickId: result.metrics.tickId,
          jobId: result.metrics.jobId,
          stabilizedScore: result.payload.stabilizedScore,
          patternsCount: result.metrics.patternsCount,
          band: result.metrics.band,
          dnaTag: result.metrics.dnaTag,
          presenceField: result.metrics.presenceField,
          advantageField: result.metrics.advantageField,
          triHeartId: result.metrics.triHeartId
        }
      });
    }
  }

  // --------------------------------------------------------------------------
  // tickForward() — one forward evolution step (deterministic lane step)
// --------------------------------------------------------------------------
  function tickForward() {
    if (!enginePrewarmed) {
      prewarm();
    }

    globalTickId += 1;
    ForwardArtery.ticks += 1;

    let job = takeNextJob("forward");
    if (!job) {
      job = createSelfJob("forward");
      if (trace) console.log("[PulseMotionEngine] no forward job in queue, using self job.");
    } else {
      ForwardArtery.jobsConsumed += 1;
    }

    const result = computeForward(job);
    writeResult("forward", result);
    feedBrain("forward", result);

    if (trace) {
      console.log("[PulseMotionEngine] forward tick complete:", {
        tickId: result.metrics.tickId,
        patternsCount: result.metrics.patternsCount
      });
    }

    return { ok: true, metrics: result.metrics };
  }

  // --------------------------------------------------------------------------
  // tickBackward() — one backward evolution step (deterministic lane step)
// --------------------------------------------------------------------------
  function tickBackward() {
    if (!enginePrewarmed) {
      prewarm();
    }

    globalTickId += 1;
    BackwardArtery.ticks += 1;

    let job = takeNextJob("backward");
    if (!job) {
      job = createSelfJob("backward");
      if (trace) console.log("[PulseMotionEngine] no backward job in queue, using self job.");
    } else {
      BackwardArtery.jobsConsumed += 1;
    }

    const result = computeBackward(job);
    writeResult("backward", result);
    feedBrain("backward", result);

    if (trace) {
      console.log("[PulseMotionEngine] backward tick complete:", {
        tickId: result.metrics.tickId,
        patternsCount: result.metrics.patternsCount
      });
    }

    return { ok: true, metrics: result.metrics };
  }

  // --------------------------------------------------------------------------
  // prewarm() — touch shifter paths (binary + symbolic, deterministic sample)
// --------------------------------------------------------------------------
  function prewarm() {
    const sample = {
      lane: "motion",
      instanceId,
      intent: "prewarm",
      band: "symbolic"
    };

    const encodedSym = Shifter.encode(sample, { band: "symbolic" }) || "";
    const chunksSym  = Shifter.chunk(encodedSym, { band: "symbolic" }) || [];
    const flatSym    = Shifter.dechunk(chunksSym, { band: "symbolic" }) || "";
    Shifter.decode(flatSym, { band: "symbolic" });

    const encodedBin = Shifter.encode(sample, { band: "binary" });
    if (encodedBin) {
      const chunksBin = Shifter.chunk(encodedBin, { band: "binary" }) || [];
      const flatBin   = Shifter.dechunk(chunksBin, { band: "binary" }) || "";
      Shifter.decode(flatBin, { band: "binary" });
    }

    enginePrewarmed = true;
    ForwardArtery.prewarms += 1;
    BackwardArtery.prewarms += 1;

    if (trace) {
      console.log("[PulseMotionEngine] prewarm complete (symbolic + binary).", {
        shifterPulse: Shifter.hasShifter === true ? "enabled" : "fallback-binary"
      });
    }
    return true;
  }

  return Object.freeze({
    meta: PulseMotionEngineMeta,
    tickForward,
    tickBackward,
    submitForwardJob,
    submitBackwardJob,
    prewarm,
    artery: {
      forward: ForwardArtery,
      backward: BackwardArtery
    }
  });
}
