// ============================================================================
// BackwardEngine.js — v13-EVO-PRIME Backward Lane Engine
// ============================================================================

export const BackwardEngineMeta = Object.freeze({
  lane: "backward",
  version: "13.0-EVO-PRIME",
  identity: "BackwardEngine-v13",
  evo: {
    deterministic: true,
    driftProof: true,
    binaryFirst: true,
    chunkAware: true,
    memoryAware: true,
    multiInstanceReady: true
  }
});

const BACKWARD_JOB_QUEUE_KEY = "evo:backward:jobs";
const BACKWARD_RESULT_KEY    = "evo:backward:results";
const BACKWARD_METRICS_KEY   = "evo:backward:metrics";

function safe(fn, ...args) {
  try {
    if (typeof fn === "function") return fn(...args);
  } catch (err) {
    console.warn("[BackwardEngine] safe call failed:", err);
  }
  return undefined;
}

let globalTickId = 0;

export function createBackwardEngine({
  BinaryOrgan,
  MemoryOrgan,
  BrainOrgan,
  instanceId = "backward-0",
  trace = false
} = {}) {
  if (!BinaryOrgan || !MemoryOrgan) {
    throw new Error("[BackwardEngine] BinaryOrgan and MemoryOrgan are required.");
  }

  // --------------------------------------------------------------------------
  // Job intake
  // --------------------------------------------------------------------------
  function readJobQueue() {
    const raw = safe(MemoryOrgan.read, BACKWARD_JOB_QUEUE_KEY);
    if (!raw || !Array.isArray(raw)) return [];
    return raw;
  }

  function writeJobQueue(queue) {
    safe(MemoryOrgan.write, BACKWARD_JOB_QUEUE_KEY, queue);
  }

  function takeNextJob() {
    const queue = readJobQueue();
    if (!queue.length) return null;
    const job = queue.shift();
    writeJobQueue(queue);
    return job;
  }

  function submitJob(job) {
    const queue = readJobQueue();
    queue.push({
      ...job,
      lane: "backward",
      ts: Date.now()
    });
    writeJobQueue(queue);
    if (trace) console.log("[BackwardEngine] job submitted:", job);
  }

  // --------------------------------------------------------------------------
  // Self-generated job when idle
  // --------------------------------------------------------------------------
  function createSelfJob() {
    return {
      id: `self-${instanceId}-${Date.now()}`,
      type: "self:evo-backward",
      payload: {
        hint: "self-generated-backward",
        ts: Date.now()
      }
    };
  }

  // --------------------------------------------------------------------------
  // Core backward compute (stabilize, normalize, compress, pattern‑reduce)
  // --------------------------------------------------------------------------
  function computeBackward(job) {
    const start = performance.now();

    const base = {
      lane: "backward",
      instanceId,
      tickId: globalTickId,
      jobId: job.id,
      type: job.type,
      ts: Date.now()
    };

    const payload = job.payload || {};

    // Example: stabilization / clamping / dedupe / compression
    const score = typeof payload.boostedScore === "number"
      ? payload.boostedScore
      : (typeof payload.score === "number" ? payload.score : Math.random());

    const stabilizedScore = Math.max(0, Math.min(1, score - 0.05));

    let patterns = Array.isArray(payload.patterns) ? payload.patterns.slice() : [];
    const seen = new Set();
    patterns = patterns.filter((p) => {
      const key = `${p.id}:${p.weight}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    const compressedHints = patterns.slice(0, 4).map((p) => ({
      id: p.id,
      bucket: p.weight > 0.5 ? "high" : "low"
    }));

    const resultPayload = {
      ...payload,
      lane: "backward",
      stabilizedScore,
      patterns,
      compressedHints
    };

    const end = performance.now();

    return {
      meta: base,
      payload: resultPayload,
      metrics: {
        lane: "backward",
        instanceId,
        tickId: globalTickId,
        jobId: job.id,
        durationMs: end - start,
        patternsCount: patterns.length,
        ts: Date.now()
      }
    };
  }

  // --------------------------------------------------------------------------
  // Binary encode + chunk + write results
  // --------------------------------------------------------------------------
  function writeResult(result) {
    const encoded = safe(BinaryOrgan.encode, result) || "";
    const chunks  = safe(BinaryOrgan.chunk, encoded) || [];

    const packet = {
      bits: chunks,
      meta: {
        lane: "backward",
        instanceId,
        tickId: result.metrics.tickId,
        jobId: result.metrics.jobId,
        ts: result.metrics.ts
      }
    };

    safe(MemoryOrgan.write, BACKWARD_RESULT_KEY, packet);
    safe(MemoryOrgan.write, BACKWARD_METRICS_KEY, result.metrics);

    if (trace) {
      console.log("[BackwardEngine] result written:", {
        key: BACKWARD_RESULT_KEY,
        metrics: result.metrics
      });
    }
  }

  // --------------------------------------------------------------------------
  // Optional: feed Brain with backward hints
  // --------------------------------------------------------------------------
  function feedBrain(result) {
    if (!BrainOrgan || typeof BrainOrgan.evolve !== "function") return;

    BrainOrgan.evolve({
      type: "evo:backward:hint",
      payload: {
        lane: "backward",
        instanceId,
        tickId: result.metrics.tickId,
        jobId: result.metrics.jobId,
        stabilizedScore: result.payload.stabilizedScore,
        patternsCount: result.metrics.patternsCount
      }
    });
  }

  // --------------------------------------------------------------------------
  // tick() — one backward evolution step
  // --------------------------------------------------------------------------
  function tick() {
    globalTickId += 1;

    let job = takeNextJob();
    if (!job) {
      job = createSelfJob();
      if (trace) console.log("[BackwardEngine] no job in queue, using self job.");
    }

    const result = computeBackward(job);
    writeResult(result);
    feedBrain(result);

    if (trace) {
      console.log("[BackwardEngine] tick complete:", {
        tickId: result.metrics.tickId,
        durationMs: result.metrics.durationMs
      });
    }

    return { ok: true, metrics: result.metrics };
  }

  // --------------------------------------------------------------------------
  // prewarm() — touch binary paths
  // --------------------------------------------------------------------------
  function prewarm() {
    const sample = {
      lane: "backward",
      instanceId,
      intent: "prewarm",
      ts: Date.now()
    };
    const bits   = safe(BinaryOrgan.encode, sample) || "";
    const chunks = safe(BinaryOrgan.chunk, bits) || [];
    const flat   = safe(BinaryOrgan.dechunk, chunks) || "";
    safe(BinaryOrgan.decode, flat);
    if (trace) console.log("[BackwardEngine] prewarm complete.");
    return true;
  }

  return Object.freeze({
    meta: BackwardEngineMeta,
    tick,
    submitJob,
    prewarm
  });
}
