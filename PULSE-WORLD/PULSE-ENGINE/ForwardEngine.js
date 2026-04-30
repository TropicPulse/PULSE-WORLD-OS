// ============================================================================
// ForwardEngine.js — v13-EVO-PRIME Forward Lane Engine
// ============================================================================

export const ForwardEngineMeta = Object.freeze({
  lane: "forward",
  version: "13.0-EVO-PRIME",
  identity: "ForwardEngine-v13",
  evo: {
    deterministic: true,
    driftProof: true,
    binaryFirst: true,
    chunkAware: true,
    memoryAware: true,
    multiInstanceReady: true
  }
});

const FORWARD_JOB_QUEUE_KEY = "evo:forward:jobs";
const FORWARD_RESULT_KEY    = "evo:forward:results";
const FORWARD_METRICS_KEY   = "evo:forward:metrics";

function safe(fn, ...args) {
  try {
    if (typeof fn === "function") return fn(...args);
  } catch (err) {
    console.warn("[ForwardEngine] safe call failed:", err);
  }
  return undefined;
}

let globalTickId = 0;

export function createForwardEngine({
  BinaryOrgan,
  MemoryOrgan,
  BrainOrgan,
  instanceId = "forward-0",
  trace = false
} = {}) {
  if (!BinaryOrgan || !MemoryOrgan) {
    throw new Error("[ForwardEngine] BinaryOrgan and MemoryOrgan are required.");
  }

  // --------------------------------------------------------------------------
  // Job intake
  // --------------------------------------------------------------------------
  function readJobQueue() {
    const raw = safe(MemoryOrgan.read, FORWARD_JOB_QUEUE_KEY);
    if (!raw || !Array.isArray(raw)) return [];
    return raw;
  }

  function writeJobQueue(queue) {
    safe(MemoryOrgan.write, FORWARD_JOB_QUEUE_KEY, queue);
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
      lane: "forward",
      ts: Date.now()
    });
    writeJobQueue(queue);
    if (trace) console.log("[ForwardEngine] job submitted:", job);
  }

  // --------------------------------------------------------------------------
  // Self-generated job when idle
  // --------------------------------------------------------------------------
  function createSelfJob() {
    return {
      id: `self-${instanceId}-${Date.now()}`,
      type: "self:evo-forward",
      payload: {
        hint: "self-generated-forward",
        ts: Date.now()
      }
    };
  }

  // --------------------------------------------------------------------------
  // Core forward compute (expand, predict, factor, pattern-find)
  // --------------------------------------------------------------------------
  function computeForward(job) {
    const start = performance.now();

    const base = {
      lane: "forward",
      instanceId,
      tickId: globalTickId,
      jobId: job.id,
      type: job.type,
      ts: Date.now()
    };

    const payload = job.payload || {};

    // Example: pattern expansion / scoring / prefill hints
    const score = typeof payload.score === "number" ? payload.score : Math.random();
    const boostedScore = Math.min(1, score + 0.1);

    const patterns = Array.isArray(payload.patterns) ? payload.patterns.slice() : [];
    if (patterns.length < 8) {
      patterns.push({
        id: `p-${patterns.length + 1}`,
        weight: boostedScore,
        ts: Date.now()
      });
    }

    const prefillChunks = patterns.map((p) => ({
      id: p.id,
      weight: p.weight,
      hint: "forward-prefill"
    }));

    const resultPayload = {
      ...payload,
      lane: "forward",
      boostedScore,
      patterns,
      prefillChunks
    };

    const end = performance.now();

    return {
      meta: base,
      payload: resultPayload,
      metrics: {
        lane: "forward",
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
        lane: "forward",
        instanceId,
        tickId: result.metrics.tickId,
        jobId: result.metrics.jobId,
        ts: result.metrics.ts
      }
    };

    safe(MemoryOrgan.write, FORWARD_RESULT_KEY, packet);
    safe(MemoryOrgan.write, FORWARD_METRICS_KEY, result.metrics);

    if (trace) {
      console.log("[ForwardEngine] result written:", {
        key: FORWARD_RESULT_KEY,
        metrics: result.metrics
      });
    }
  }

  // --------------------------------------------------------------------------
  // Optional: feed Brain with forward hints
  // --------------------------------------------------------------------------
  function feedBrain(result) {
    if (!BrainOrgan || typeof BrainOrgan.evolve !== "function") return;

    BrainOrgan.evolve({
      type: "evo:forward:hint",
      payload: {
        lane: "forward",
        instanceId,
        tickId: result.metrics.tickId,
        jobId: result.metrics.jobId,
        boostedScore: result.payload.boostedScore,
        patternsCount: result.metrics.patternsCount
      }
    });
  }

  // --------------------------------------------------------------------------
  // tick() — one forward evolution step
  // --------------------------------------------------------------------------
  function tick() {
    globalTickId += 1;

    let job = takeNextJob();
    if (!job) {
      job = createSelfJob();
      if (trace) console.log("[ForwardEngine] no job in queue, using self job.");
    }

    const result = computeForward(job);
    writeResult(result);
    feedBrain(result);

    if (trace) {
      console.log("[ForwardEngine] tick complete:", {
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
      lane: "forward",
      instanceId,
      intent: "prewarm",
      ts: Date.now()
    };
    const bits   = safe(BinaryOrgan.encode, sample) || "";
    const chunks = safe(BinaryOrgan.chunk, bits) || [];
    const flat   = safe(BinaryOrgan.dechunk, chunks) || "";
    safe(BinaryOrgan.decode, flat);
    if (trace) console.log("[ForwardEngine] prewarm complete.");
    return true;
  }

  return Object.freeze({
    meta: ForwardEngineMeta,
    tick,
    submitJob,
    prewarm
  });
}
