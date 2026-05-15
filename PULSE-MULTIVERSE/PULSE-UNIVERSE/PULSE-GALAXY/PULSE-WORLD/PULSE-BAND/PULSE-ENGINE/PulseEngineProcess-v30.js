// ============================================================================
// PulseMotionEngine-v30-Immortal+++ — Unified Motion Engine (Forward + Backward)
//  • One engine, multi-lane motion (forward + backward)
//  • Dual-band aware (symbolic/binary), ShifterPulse-first
//  • Drift-proof via normalized job/intents (multi-instance safe)
//  • Deterministic tick sequencing (engine-local shared tick space)
//  • Presence/advantage/cosmos-aware, artery metrics, prewarm-aware, tri-heart aware
//  • v30++: physics organs (regioning, lineage, snapshots, multi-org, execution)
//  • Designed as the “compressed process worker” for Earn, GPU cache, routing, etc.
// ============================================================================

import { createShifterPulse as ShifterPulse } from "../PULSE-SHIFTER/PulseShifterBinaryEvolutionaryPulse-v30.js";

// Lane-local queue/result keys (symbolic only; actual storage via MemoryOrgan)
const FORWARD_JOB_QUEUE_KEY  = "motion-v30:forward:jobs";
const FORWARD_RESULT_KEY     = "motion-v30:forward:results";
const FORWARD_METRICS_KEY    = "motion-v30:forward:metrics";

const BACKWARD_JOB_QUEUE_KEY = "motion-v30:backward:jobs";
const BACKWARD_RESULT_KEY    = "motion-v30:backward:results";
const BACKWARD_METRICS_KEY   = "motion-v30:backward:metrics";

function safe(fn, ...args) {
  try {
    if (typeof fn === "function") return fn(...args);
  } catch (err) {
    console.warn("[PulseMotionEngine-v30] safe call failed:", err);
  }
  return undefined;
}

// ---------------------------------------------------------------------------
// Artery factory — per-engine, per-lane metrics (symbolic only)
// ---------------------------------------------------------------------------
function createArtery(laneTag) {
  const artery = {
    lane: laneTag,
    ticks: 0,
    jobsConsumed: 0,
    selfJobsGenerated: 0,
    lastPatternsCount: 0,
    lastDurationMs: 0,
    prewarms: 0,
    lastBand: "symbolic",
    lastDnaTag: null,
    lastJobType: null,
    lastAdvantage: 0,
    snapshot() {
      const ticks = artery.ticks;
      const jobs = artery.jobsConsumed;
      const prewarms = artery.prewarms;

      const load = Math.min(1, ticks / 8192);
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
        lane: artery.lane,
        ticks,
        jobsConsumed: jobs,
        selfJobsGenerated: artery.selfJobsGenerated,
        lastPatternsCount: artery.lastPatternsCount,
        lastDurationMs: artery.lastDurationMs,
        prewarms,
        lastBand: artery.lastBand,
        lastDnaTag: artery.lastDnaTag,
        lastJobType: artery.lastJobType,
        lastAdvantage: artery.lastAdvantage,
        load,
        loadBucket,
        pressure,
        pressureBucket
      });
    }
  };

  return artery;
}

// ---------------------------------------------------------------------------
// ShifterPulse adapter — band-aware wrapper
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
function normalizeJob(job, { instanceId, lane, tickId, cosmosContext }) {
  const laneTag = lane === "backward" ? "backward" : "forward";
  const typeUnknown =
    laneTag === "backward" ? "motion:backward:unknown" : "motion:forward:unknown";
  const typeGeneric =
    laneTag === "backward" ? "motion:backward:generic" : "motion:forward:generic";

  if (!job || typeof job !== "object") {
    return {
      id: `job-${laneTag}-${instanceId}-${tickId}`,
      type: typeUnknown,
      payload: {},
      lane: laneTag,
      __band: "symbolic",
      __dnaTag: null,
      __cosmos: cosmosContext
    };
  }

  const payload = job.payload && typeof job.payload === "object"
    ? job.payload
    : {};

  const band =
    typeof payload.__band === "string"
      ? payload.__band.toLowerCase()
      : "symbolic";

  const cosmos =
    job.cosmosContext && typeof job.cosmosContext === "object"
      ? {
          universeId: job.cosmosContext.universeId || cosmosContext.universeId,
          timelineId: job.cosmosContext.timelineId || cosmosContext.timelineId,
          branchId: job.cosmosContext.branchId || cosmosContext.branchId,
          shardId: job.cosmosContext.shardId || cosmosContext.shardId
        }
      : cosmosContext;

  return {
    id: job.id || `job-${laneTag}-${instanceId}-${tickId}`,
    type: job.type || typeGeneric,
    payload,
    lane: laneTag,
    __band: band === "binary" ? "binary" : "symbolic",
    __dnaTag: typeof payload.__dnaTag === "string" ? payload.__dnaTag : null,
    __cosmos: cosmos,
    __intent: job.intent || payload.intent || null
  };
}

function normalizeMetrics(base, extra = {}, { lane, arterySnapshot }) {
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
    cosmos: base.cosmos || null,
    triHeartId: base.triHeartId || null,
    jobType: base.jobType || null,
    intent: base.intent || null,
    advantageScore: extra.advantageScore ?? 0,
    artery: arterySnapshot
  };
}

// ---------------------------------------------------------------------------
// Meta (symbolic only)
// ---------------------------------------------------------------------------
export const PulseMotionEngineMeta = Object.freeze({
  engineId: "PulseMotionEngine-v30-Immortal+++",
  version: "v30",
  lanes: ["forward", "backward"],
  bands: ["symbolic", "binary"],
  dualBand: true
});

// ============================================================================
// Factory — Pulse Motion Engine v30-Immortal+++
// ============================================================================

export function createPulseMotionEngine({
  // Organs / substrates
  MemoryOrgan,
  BrainOrgan,

  // v30 physics organs (optional, but powerful)
  RegioningPhysics,
  LineageEngine,
  SnapshotPhysics,
  MultiOrganismSupport,
  ExecutionPhysics,

  // Identity / context
  instanceId = "motion-0",
  trace = false,
  presenceContext = {},
  advantageContext = {},
  cosmosContext = {
    universeId: "u:default",
    timelineId: "t:main",
    branchId: "b:root",
    shardId: "s:primary"
  },
  triHeartId = "motion-heart",

  // Capability flags
  allowSnapshotPhysics = false,
  allowDeltaEngine = false,
  allowDeploymentPhysics = false,
  allowRegioningPhysics = false,
  allowRegionMeshRouting = false,
  allowLineageEngine = false,
  allowMultiOrganismSupport = false,
  allowExecutionPhysics = false,
  allowCoreMemory = false,
  allowEarnLane = false,
  allowGpuCacheLane = false
} = {}) {
  if (!MemoryOrgan) {
    throw new Error("[PulseMotionEngine-v30] MemoryOrgan is required.");
  }

  const Shifter = createShifterAdapter({ lane: "motion", instanceId });

  // Engine-local tick space
  let engineTickId = 0;
  let enginePrewarmed = false;

  // Per-engine arteries
  const ForwardArtery = createArtery("forward");
  const BackwardArtery = createArtery("backward");

  // ------------------------------------------------------------------------
  // Job intake — per lane
  // ------------------------------------------------------------------------
  function readJobQueue(lane) {
    const key = lane === "backward" ? BACKWARD_JOB_QUEUE_KEY : FORWARD_JOB_QUEUE_KEY;
    const raw = safe(MemoryOrgan.read, key);
    if (!raw || !Array.isArray(raw)) return [];
    return raw.slice();
  }

  function writeJobQueue(lane, queue) {
    const key = lane === "backward" ? BACKWARD_JOB_QUEUE_KEY : FORWARD_JOB_QUEUE_KEY;
    safe(MemoryOrgan.write, key, Array.isArray(queue) ? queue.slice() : []);
  }

  function takeNextJob(lane) {
    const queue = readJobQueue(lane);
    if (!queue.length) return null;
    const job = queue.shift();
    writeJobQueue(lane, queue);
    return normalizeJob(job, {
      instanceId,
      lane,
      tickId: engineTickId,
      cosmosContext
    });
  }

  function submitJob(lane, job) {
    const queue = readJobQueue(lane);
    const normalized = normalizeJob(job, {
      instanceId,
      lane,
      tickId: engineTickId,
      cosmosContext
    });

    queue.push({
      ...normalized,
      submittedTick: engineTickId
    });

    writeJobQueue(lane, queue);

    if (trace) console.log("[PulseMotionEngine-v30] job submitted:", lane, normalized);
  }

  function submitForwardJob(job) {
    submitJob("forward", job);
  }

  function submitBackwardJob(job) {
    submitJob("backward", job);
  }

  // ------------------------------------------------------------------------
  // Self-generated jobs when idle
  // ------------------------------------------------------------------------
  function createSelfJob(lane) {
    const laneTag = lane === "backward" ? "backward" : "forward";
    const typeSelf =
      laneTag === "backward" ? "self:motion-backward" : "self:motion-forward";

    const selfJob = normalizeJob(
      {
        id: `self-${laneTag}-${instanceId}-${engineTickId}`,
        type: typeSelf,
        intent: "SELF_TICK",
        payload: {
          hint: `self-generated-${laneTag}`,
          origin: "PulseMotionEngine-v30"
        }
      },
      { instanceId, lane: laneTag, tickId: engineTickId, cosmosContext }
    );

    if (laneTag === "backward") {
      BackwardArtery.selfJobsGenerated += 1;
    } else {
      ForwardArtery.selfJobsGenerated += 1;
    }

    return selfJob;
  }

  // ------------------------------------------------------------------------
  // Shared presence/advantage/cosmos fields
  // ------------------------------------------------------------------------
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

  function buildCosmosField(jobCosmos) {
    const c = jobCosmos || cosmosContext;
    return {
      universeId: c.universeId || "u:default",
      timelineId: c.timelineId || "t:main",
      branchId: c.branchId || "b:root",
      shardId: c.shardId || "s:primary"
    };
  }

  // ------------------------------------------------------------------------
  // Physics orchestration helpers (symbolic only, compressed)
//  These are intentionally minimal; you can expand them as needed.
// ------------------------------------------------------------------------
  function maybeRunEarnOrCompute(job, lane, baseMeta) {
    // Example: route by job.type / job.intent into physics organs
    // This is where you plug in Regioning/Lineage/Snapshot/MultiOrg/Execution.
    // For now, we just compute a simple advantage hint.
    let advantageScore = 0.5;

    if (allowEarnLane && job.type === "EARN_TASK") {
      advantageScore = 0.9;
    } else if (allowGpuCacheLane && job.type === "GPU_CACHE") {
      advantageScore = 0.8;
    } else if (allowRegioningPhysics && job.type === "REGIONING_COMPUTE") {
      advantageScore = 0.7;
    }

    return { advantageScore };
  }

  // ------------------------------------------------------------------------
  // Core forward compute (expand, predict, factor, pattern-find)
// ------------------------------------------------------------------------
  function computeForward(job) {
    const tickId = engineTickId;

    const presenceField = buildPresenceField();
    const advantageField = buildAdvantageField();
    const cosmosField = buildCosmosField(job.__cosmos);

    const baseMeta = {
      lane: "forward",
      instanceId,
      tickId,
      jobId: job.id,
      band: job.__band || "symbolic",
      dnaTag: job.__dnaTag || null,
      presenceField,
      advantageField,
      cosmos: cosmosField,
      triHeartId,
      jobType: job.type,
      intent: job.__intent || null
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

    const physicsAdv = maybeRunEarnOrCompute(job, "forward", baseMeta);

    const resultPayload = {
      ...payload,
      lane: "forward",
      boostedScore,
      patterns,
      prefillChunks,
      __band: baseMeta.band,
      __dnaTag: baseMeta.dnaTag,
      __cosmos: cosmosField,
      __advantageScore: physicsAdv.advantageScore
    };

    const arterySnapshot = ForwardArtery.snapshot();

    const metrics = normalizeMetrics(
      baseMeta,
      {
        durationMs: 0,
        patternsCount: patterns.length,
        advantageScore: physicsAdv.advantageScore
      },
      { lane: "forward", arterySnapshot }
    );

    ForwardArtery.lastPatternsCount = patterns.length;
    ForwardArtery.lastDurationMs = 0;
    ForwardArtery.lastBand = baseMeta.band;
    ForwardArtery.lastDnaTag = baseMeta.dnaTag;
    ForwardArtery.lastJobType = baseMeta.jobType;
    ForwardArtery.lastAdvantage = physicsAdv.advantageScore;

    return {
      meta: baseMeta,
      payload: resultPayload,
      metrics
    };
  }

  // ------------------------------------------------------------------------
  // Core backward compute (stabilize, normalize, compress, pattern-reduce)
// ------------------------------------------------------------------------
  function computeBackward(job) {
    const tickId = engineTickId;

    const presenceField = buildPresenceField();
    const advantageField = buildAdvantageField();
    const cosmosField = buildCosmosField(job.__cosmos);

    const baseMeta = {
      lane: "backward",
      instanceId,
      tickId,
      jobId: job.id,
      band: job.__band || "symbolic",
      dnaTag: job.__dnaTag || null,
      presenceField,
      advantageField,
      cosmos: cosmosField,
      triHeartId,
      jobType: job.type,
      intent: job.__intent || null
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

    const physicsAdv = maybeRunEarnOrCompute(job, "backward", baseMeta);

    const resultPayload = {
      ...payload,
      lane: "backward",
      stabilizedScore,
      patterns,
      compressedHints,
      __band: baseMeta.band,
      __dnaTag: baseMeta.dnaTag,
      __cosmos: cosmosField,
      __advantageScore: physicsAdv.advantageScore
    };

    const arterySnapshot = BackwardArtery.snapshot();

    const metrics = normalizeMetrics(
      baseMeta,
      {
        durationMs: 0,
        patternsCount: patterns.length,
        advantageScore: physicsAdv.advantageScore
      },
      { lane: "backward", arterySnapshot }
    );

    BackwardArtery.lastPatternsCount = patterns.length;
    BackwardArtery.lastDurationMs = 0;
    BackwardArtery.lastBand = baseMeta.band;
    BackwardArtery.lastDnaTag = baseMeta.dnaTag;
    BackwardArtery.lastJobType = baseMeta.jobType;
    BackwardArtery.lastAdvantage = physicsAdv.advantageScore;

    return {
      meta: baseMeta,
      payload: resultPayload,
      metrics
    };
  }

  // ------------------------------------------------------------------------
  // Binary/regular encode + chunk + write results via ShifterPulse
  // ------------------------------------------------------------------------
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
        cosmos: result.metrics.cosmos,
        triHeartId: result.metrics.triHeartId,
        jobType: result.metrics.jobType,
        intent: result.metrics.intent,
        advantageScore: result.metrics.advantageScore,
        artery: result.metrics.artery
      }
    };

    const resultKey  = lane === "backward" ? BACKWARD_RESULT_KEY  : FORWARD_RESULT_KEY;
    const metricsKey = lane === "backward" ? BACKWARD_METRICS_KEY : FORWARD_METRICS_KEY;

    safe(MemoryOrgan.write, resultKey, packet);
    safe(MemoryOrgan.write, metricsKey, result.metrics);

    if (trace) {
      console.log("[PulseMotionEngine-v30] result written:", {
        lane,
        key: resultKey,
        metrics: result.metrics,
        shifterPulse: packet.meta.shifterPulse
      });
    }
  }

  // ------------------------------------------------------------------------
  // Optional: feed Brain with lane-specific hints
  // ------------------------------------------------------------------------
  function feedBrain(lane, result) {
    if (!BrainOrgan || typeof BrainOrgan.evolve !== "function") return;

    const basePayload = {
      lane,
      instanceId,
      tickId: result.metrics.tickId,
      jobId: result.metrics.jobId,
      patternsCount: result.metrics.patternsCount,
      band: result.metrics.band,
      dnaTag: result.metrics.dnaTag,
      presenceField: result.metrics.presenceField,
      advantageField: result.metrics.advantageField,
      cosmos: result.metrics.cosmos,
      triHeartId: result.metrics.triHeartId,
      jobType: result.metrics.jobType,
      intent: result.metrics.intent,
      advantageScore: result.metrics.advantageScore
    };

    if (lane === "forward") {
      BrainOrgan.evolve({
        type: "motion:forward:hint",
        payload: {
          ...basePayload,
          boostedScore: result.payload.boostedScore
        }
      });
    } else {
      BrainOrgan.evolve({
        type: "motion:backward:hint",
        payload: {
          ...basePayload,
          stabilizedScore: result.payload.stabilizedScore
        }
      });
    }
  }

  // ------------------------------------------------------------------------
  // tickForward() — one forward evolution step
  // ------------------------------------------------------------------------
  function tickForward() {
    if (!enginePrewarmed) {
      prewarm();
    }

    engineTickId += 1;
    ForwardArtery.ticks += 1;

    let job = takeNextJob("forward");
    if (!job) {
      job = createSelfJob("forward");
      if (trace) console.log("[PulseMotionEngine-v30] no forward job in queue, using self job.");
    } else {
      ForwardArtery.jobsConsumed += 1;
    }

    const result = computeForward(job);
    writeResult("forward", result);
    feedBrain("forward", result);

    if (trace) {
      console.log("[PulseMotionEngine-v30] forward tick complete:", {
        tickId: result.metrics.tickId,
        patternsCount: result.metrics.patternsCount
      });
    }

    return { ok: true, metrics: result.metrics };
  }

  // ------------------------------------------------------------------------
  // tickBackward() — one backward evolution step
  // ------------------------------------------------------------------------
  function tickBackward() {
    if (!enginePrewarmed) {
      prewarm();
    }

    engineTickId += 1;
    BackwardArtery.ticks += 1;

    let job = takeNextJob("backward");
    if (!job) {
      job = createSelfJob("backward");
      if (trace) console.log("[PulseMotionEngine-v30] no backward job in queue, using self job.");
    } else {
      BackwardArtery.jobsConsumed += 1;
    }

    const result = computeBackward(job);
    writeResult("backward", result);
    feedBrain("backward", result);

    if (trace) {
      console.log("[PulseMotionEngine-v30] backward tick complete:", {
        tickId: result.metrics.tickId,
        patternsCount: result.metrics.patternsCount
      });
    }

    return { ok: true, metrics: result.metrics };
  }

  // ------------------------------------------------------------------------
  // tickBoth() — optional helper: forward + backward in one shared tick window
  // ------------------------------------------------------------------------
  function tickBoth() {
    const forward = tickForward();
    const backward = tickBackward();
    return { forward, backward };
  }

  // ------------------------------------------------------------------------
  // prewarm() — touch shifter paths (binary + symbolic, deterministic sample)
  // ------------------------------------------------------------------------
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
      console.log("[PulseMotionEngine-v30] prewarm complete (symbolic + binary).", {
        shifterPulse: Shifter.hasShifter === true ? "enabled" : "fallback-binary"
      });
    }
    return true;
  }

  // ------------------------------------------------------------------------
  // Engine snapshot — state view without mutation
  // ------------------------------------------------------------------------
  function snapshot() {
    return Object.freeze({
      meta: PulseMotionEngineMeta,
      instanceId,
      tickId: engineTickId,
      prewarmed: enginePrewarmed,
      arteries: {
        forward: ForwardArtery.snapshot(),
        backward: BackwardArtery.snapshot()
      },
      cosmos: cosmosContext
    });
  }

  return Object.freeze({
    meta: PulseMotionEngineMeta,
    tickForward,
    tickBackward,
    tickBoth,
    submitForwardJob,
    submitBackwardJob,
    prewarm,
    snapshot,
    artery: {
      forward: ForwardArtery,
      backward: BackwardArtery
    }
  });
}
