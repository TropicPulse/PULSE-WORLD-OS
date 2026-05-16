// ============================================================================
// PulseGPUProcessWorker-v30-Immortal++++
//  • Engine-block + black-box wrapper for GPU-facing work
//  • Dual-GPU aware (gpuIds[]), gpuMode: "single" | "dual" | "mirror"
//  • Designed as the GPU-side “process worker” for:
//      - PulseMotionEngine-v30 (forward/backward lanes)
//      - Earn lane jobs (EARN_TASK)
//      - GPU cache / BINARY_COMPUTE / GPU_CACHE
//  • ZERO heavy compute here — pure routing, shaping, and hint metadata
//  • Cosmos-aware, presence/advantage-aware, MotionEngine-aware
// ============================================================================
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝
// ============================================================================


// ============================================================================
// GLOBAL HANDLE (membrane-safe, environment-agnostic)
// ============================================================================
const G =
  (typeof window !== "undefined" && window) ||
  (typeof globalThis !== "undefined" && globalThis) ||
  (typeof self !== "undefined" && self) ||
  (typeof global !== "undefined" && global) ||
  {};

const g = G;

const dblog =
  (G.log && G.log) ||
  console.log;

const dberror =
  (G.error && G.error) ||
  console.error;


// ============================================================================
// META
// ============================================================================
export const PulseGPUProcessWorkerMeta = Object.freeze({
  id: "PulseGPUProcessWorker-v30-Immortal++++",
  version: "30.0-Immortal++++",
  dualGpu: true,
  bands: ["symbolic", "binary"],
  lanes: ["forward", "backward"],
  roles: ["earn", "gpu-cache", "binary-compute"]
});


// ============================================================================
// ENGINE BLOCK — INTERNAL STATE + ROUTING CORE
//  • This is the “engine block” of the ProcessWorker
//  • No GPU math here, just shaping + routing + hints
// ============================================================================
function createEngineBlock({
  gpuMode = "dual",                 // "single" | "dual" | "mirror"
  gpuIds = ["gpu-0", "gpu-1"],
  trace = false
} = {}) {
  const state = {
    gpuMode,
    gpuIds: Array.isArray(gpuIds) && gpuIds.length ? gpuIds.slice() : ["gpu-0"],
    ticks: 0,
    jobsRouted: 0,
    lastLane: null,
    lastGpuId: null,
    lastJobType: null,
    lastAdvantageScore: 0,
    lastBand: "symbolic"
  };

  function pickGpu(job) {
    const ids = state.gpuIds;
    if (!ids.length) return "gpu-0";

    if (state.gpuMode === "single") {
      return ids[0];
    }

    // Simple round-robin / lane-aware split
    if (job.lane === "backward" && ids.length > 1) {
      return ids[1];
    }

    const idx = state.jobsRouted % ids.length;
    return ids[idx];
  }

  function buildHint(job, baseAdvantage) {
    const gpuId = pickGpu(job);
    state.jobsRouted += 1;
    state.lastGpuId = gpuId;
    state.lastLane = job.lane || null;
    state.lastJobType = job.jobType || job.type || null;
    state.lastBand = job.band || "symbolic";

    let advantageBoost = 0;

    if (job.jobType === "EARN_TASK" || job.type === "EARN_TASK") {
      advantageBoost += 0.15;
    }
    if (job.jobType === "GPU_CACHE" || job.type === "GPU_CACHE") {
      advantageBoost += 0.1;
    }
    if (job.band === "binary") {
      advantageBoost += 0.05;
    }

    const finalAdvantage = Math.max(
      0,
      Math.min(1, (baseAdvantage ?? 0.5) + advantageBoost)
    );

    state.lastAdvantageScore = finalAdvantage;

    const hint = {
      ts: Date.now(),
      meta: {
        workerId: PulseGPUProcessWorkerMeta.id,
        version: PulseGPUProcessWorkerMeta.version
      },
      gpu: {
        gpuId,
        gpuMode: state.gpuMode,
        gpuIds: state.gpuIds.slice()
      },
      lane: job.lane || null,
      band: job.band || "symbolic",
      jobType: job.jobType || job.type || null,
      intent: job.intent || null,
      baseAdvantage: baseAdvantage ?? 0.5,
      advantageBoost,
      advantageScore: finalAdvantage,
      suggestions: []
    };

    if (finalAdvantage > 0.85) {
      hint.suggestions.push("gpu-path-high-advantage");
    }
    if (job.jobType === "GPU_CACHE" || job.type === "GPU_CACHE") {
      hint.suggestions.push("gpu-cache-lane-preferred");
    }
    if (job.lane === "backward") {
      hint.suggestions.push("backward-lane-good-for-compression");
    } else if (job.lane === "forward") {
      hint.suggestions.push("forward-lane-good-for-expansion");
    }

    return hint;
  }

  function tick() {
    state.ticks += 1;
    return {
      ok: true,
      ticks: state.ticks,
      gpuMode: state.gpuMode,
      gpuIds: state.gpuIds.slice()
    };
  }

  function snapshot() {
    return Object.freeze({
      meta: PulseGPUProcessWorkerMeta,
      ticks: state.ticks,
      jobsRouted: state.jobsRouted,
      lastLane: state.lastLane,
      lastGpuId: state.lastGpuId,
      lastJobType: state.lastJobType,
      lastAdvantageScore: state.lastAdvantageScore,
      lastBand: state.lastBand,
      gpuMode: state.gpuMode,
      gpuIds: state.gpuIds.slice()
    });
  }

  if (trace) {
    dblog("[PulseGPUProcessWorker] EngineBlock initialized:", {
      gpuMode: state.gpuMode,
      gpuIds: state.gpuIds
    });
  }

  return {
    buildHint,
    tick,
    snapshot
  };
}


// ============================================================================
// BLACK BOX — PUBLIC PROCESS WORKER INTERFACE
//  • This is what MotionEngine calls via:
//      - gpuProcessWorker.submit(job)
//      - gpuProcessWorker.plan(job)
//  • It wraps the engine block and exposes a stable contract.
// ============================================================================
export function createPulseGPUProcessWorker({
  gpuMode = "dual",
  gpuIds = ["gpu-0", "gpu-1"],
  trace = false
} = {}) {
  const engineBlock = createEngineBlock({ gpuMode, gpuIds, trace });

  function normalizeIncomingJob(job) {
    if (!job || typeof job !== "object") return {
      lane: "forward",
      jobId: "unknown",
      jobType: "UNKNOWN",
      band: "symbolic",
      dnaTag: null,
      cosmos: null,
      triHeartId: null,
      intent: null,
      advantageScore: 0.5,
      presence: null,
      payload: {}
    };

    return {
      lane: job.lane || "forward",
      jobId: job.jobId || job.id || "unknown",
      jobType: job.jobType || job.type || "UNKNOWN",
      band: job.band || "symbolic",
      dnaTag: job.dnaTag || null,
      cosmos: job.cosmos || null,
      triHeartId: job.triHeartId || null,
      intent: job.intent || null,
      advantageScore:
        typeof job.advantageScore === "number"
          ? job.advantageScore
          : 0.5,
      presence: job.presence || job.presenceField || null,
      payload: job.payload || {}
    };
  }

  // -------------------------------------------------------------------------
  // submit(job) — fire-and-forget style, returns hint
  // -------------------------------------------------------------------------
  function submit(job) {
    const j = normalizeIncomingJob(job);
    const hint = engineBlock.buildHint(j, j.advantageScore);

    if (trace) {
      dblog("[PulseGPUProcessWorker] submit:", { job: j, hint });
    }

    return hint;
  }

  // -------------------------------------------------------------------------
  // plan(job) — same as submit, but semantically “planning”
// -------------------------------------------------------------------------
  function plan(job) {
    const j = normalizeIncomingJob(job);
    const hint = engineBlock.buildHint(j, j.advantageScore);

    if (trace) {
      dblog("[PulseGPUProcessWorker] plan:", { job: j, hint });
    }

    return hint;
  }

  function tick() {
    return engineBlock.tick();
  }

  function snapshot() {
    return engineBlock.snapshot();
  }

  return Object.freeze({
    meta: PulseGPUProcessWorkerMeta,
    submit,
    plan,
    tick,
    snapshot
  });
}


// ============================================================================
// DEFAULT EXPORT — IMMORTAL BLACK BOX INSTANCE
//  • This matches your import style:
//      import { PulseGPUProcessWorker } from "./PulseGPUProcessWorker-v30.js";
// ============================================================================
export const PulseGPUProcessWorker = createPulseGPUProcessWorker({
  gpuMode: "dual",
  gpuIds: ["gpu-0", "gpu-1"],
  trace: false
});

export default PulseGPUProcessWorker;
