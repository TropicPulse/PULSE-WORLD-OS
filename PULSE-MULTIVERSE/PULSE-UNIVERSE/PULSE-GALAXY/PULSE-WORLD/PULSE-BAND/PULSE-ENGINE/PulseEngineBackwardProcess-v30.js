// ============================================================================
// BackwardMotion-v30-Immortal-ProcessWorker+++ (v30++)
//  • Universal backward process worker over PulseMotionEngine-v30
//  • Lane: "backward" → stabilization, compression, reduction, dedupe, cleanup
//  • Band: "dual" (symbolic + binary)
//  • Integrated PulseGPUProcessWorker-v30 (GPU + Earn cleanup lanes)
//  • Zero compute logic here: all heavy lifting lives in PulseMotionEngine-v30
//  • v30++: richer GPU/Earn cleanup helpers, snapshots, diagnostics, warm-path hints
// ============================================================================
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝


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


// ============================================================================
// UNIVERSAL TIMESTAMP
// ============================================================================

const Timestamp =
  (G.firebaseAdmin &&
    G.firebaseAdmin.firestore &&
    G.firebaseAdmin.firestore.Timestamp) ||
  (G.Timestamp && G.Timestamp) ||
  null;


// ============================================================================
// UNIVERSAL ADMIN
// ============================================================================

const admin =
  (G.firebaseAdmin && G.firebaseAdmin) ||
  (G.admin && G.admin) ||
  null;


// ============================================================================
// UNIVERSAL DB (Shadow DB wins)
// ============================================================================

const db =
  (G.db && G.db) ||                                   // Shadow DB (v25++)
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


// ============================================================================
// UNIVERSAL FETCH
// ============================================================================

const fetchFn =
  (G.fetchfn && typeof G.fetchfn === "function" && G.fetchfn) ||
  (G.fetch && typeof G.fetch === "function" && G.fetch) ||
  null;


// ============================================================================
// SAFE CONTEXTS (zero-mutation, world-aware)
// ============================================================================

const presenceContext =
  (typeof window !== "undefined" && window.PULSE_PRESENCE) ||
  g.PULSE_PRESENCE ||
  {};

const advantageContext =
  (typeof window !== "undefined" && window.PULSE_ADVANTAGE) ||
  g.PULSE_ADVANTAGE ||
  {};

const cosmosContext =
  (typeof window !== "undefined" && window.PULSE_COSMOS) ||
  g.PULSE_COSMOS ||
  {
    universeId: "u:default",
    timelineId: "t:main",
    branchId: "b:root",
    shardId: "s:primary"
  };


// ============================================================================
// ENGINE IMPORT (v30 IMMORTAL MOTION ENGINE)
// ============================================================================

import { createPulseMotionEngine } from "./PulseEngineMotionEngine-v30.js";


// ============================================================================
// GPU PROCESS WORKER IMPORT (v30++) — GPU + Earn lanes helper
// ============================================================================

import { PulseGPUProcessWorker } from "./PulseGPUProcessWorker-v30.js";


// ============================================================================
// ROLE META (BACKWARD PROCESS WORKER v30++)
// ============================================================================

export const BACKWARD_MOTION_ROLE_V30 = Object.freeze({
  lane: "backward",
  motionType: "compression",
  band: "dual",
  description: [
    "Stabilizes patterns, dedupes, reduces, generates compressedHints,",
    "and runs cleanup/settlement/gpu-cache consolidation jobs over the v30 substrate.",
    "Backward lane is the cleanup heart for Earn settlement and GPU cache compaction."
  ].join(" "),
  engineMethod: "tickBackward",
  safety: "BackwardMotion wrapper must never modify engine internals"
});


// ============================================================================
// PROCESS WORKER INSTANCE (BACKWARD-FACE, GPU+EARN CLEANUP AWARE)
// ============================================================================

let gpuProcessWorker = null;

function createGpuProcessWorkerSafe() {
  try {
    if (typeof PulseGPUProcessWorker === "function") {
      return new PulseGPUProcessWorker({
        lane: "backward",
        band: "dual",
        role: "gpu+earn-process-worker-backward",
        presenceContext,
        advantageContext,
        cosmosContext
      });
    }
    if (
      PulseGPUProcessWorker &&
      typeof PulseGPUProcessWorker.create === "function"
    ) {
      return PulseGPUProcessWorker.create({
        lane: "backward",
        band: "dual",
        role: "gpu+earn-process-worker-backward",
        presenceContext,
        advantageContext,
        cosmosContext
      });
    }
  } catch (err) {
    dberror("PulseGPUProcessWorker-v30 (backward) creation failed:", err);
  }
  return null;
}

gpuProcessWorker = createGpuProcessWorkerSafe();


// ============================================================================
// ENGINE INSTANCE (BACKWARD FACE) — ZERO-COMPUTE WRAPPER
// ============================================================================

let engine = null;

try {
  engine = createPulseMotionEngine({
    // Identity
    instanceId: "motion-backward",
    triHeartId: "backward-heart",

    // Motion semantics
    lane: "backward",
    mode: "compression",
    band: "dual",

    // Substrate wiring
    db,
    admin,
    Timestamp,
    fetchFn,
    presenceContext,
    advantageContext,
    cosmosContext,

    // Physics capabilities (v30 stack)
    allowSnapshotPhysics: true,
    allowDeltaEngine: true,
    allowDeploymentPhysics: true,
    allowRegioningPhysics: true,
    allowRegionMeshRouting: true,
    allowLineageEngine: true,
    allowMultiOrganismSupport: true,
    allowExecutionPhysics: true,
    allowCoreMemory: true,

    // Workload lanes
    // Backward is especially good at:
    //  - compression/dedupe of state
    //  - lineage compaction
    //  - region hotness consolidation
    //  - Earn “cleanup” tasks (settlement, reconciliation)
    //  - GPU cache eviction/compaction
    allowEarnLane: true,
    allowGpuCacheLane: true,

    // Safety: wrapper must never mutate engine internals directly
    allowArteryMutation: false
  });
} catch (err) {
  dberror("BackwardMotion-v30 engine wiring failed:", err);
  engine = null;
}


// ============================================================================
// INTERNAL HELPERS — TYPE GUARDS / NORMALIZATION
// ============================================================================

function isObject(x) {
  return x !== null && typeof x === "object";
}

function cloneShallow(obj) {
  if (!isObject(obj)) return obj;
  return { ...obj };
}

function normalizeJobBase(job) {
  if (!isObject(job)) return {};
  const lane = job.lane || "backward";
  const priority = job.priority || "normal";
  const cosmos = job.cosmosContext || cosmosContext;

  return {
    ...job,
    lane,
    priority,
    cosmosContext: {
      universeId: cosmos.universeId || cosmosContext.universeId,
      timelineId: cosmos.timelineId || cosmosContext.timelineId,
      branchId: cosmos.branchId || cosmosContext.branchId,
      shardId: cosmos.shardId || cosmosContext.shardId
    }
  };
}


// ============================================================================
// INTERNAL: GPU/EARN PROCESS WORKER ROUTING (BACKWARD LANE)
//  • If job is GPU/Earn cleanup-related, let PulseGPUProcessWorker normalize it.
//  • Always fail-open: if worker is missing or rejects, original job passes.
// ============================================================================

function routeJobThroughProcessWorker(job) {
  if (!isObject(job)) return job;
  if (!gpuProcessWorker) return job;

  const baseJob = normalizeJobBase(job);

  try {
    const type = baseJob.type || baseJob.kind || "";
    const lane = baseJob.lane || "backward";

    // GPU cache cleanup / compaction jobs
    if (
      type === "GPU_CACHE" ||
      type === "GPU_CACHE_EVICT" ||
      type === "GPU_CACHE_COMPACT"
    ) {
      if (typeof gpuProcessWorker.prepareGpuCleanupJob === "function") {
        const prepared = gpuProcessWorker.prepareGpuCleanupJob(baseJob, { lane });
        return prepared || baseJob;
      }
      if (typeof gpuProcessWorker.prepareGpuJob === "function") {
        const prepared = gpuProcessWorker.prepareGpuJob(baseJob, { lane });
        return prepared || baseJob;
      }
    }

    // Earn settlement / reconciliation jobs
    if (
      type === "EARN_TASK" ||
      type === "EARN_SETTLEMENT" ||
      type === "EARN_RECONCILE" ||
      type === "EARN_CLEANUP"
    ) {
      if (typeof gpuProcessWorker.prepareEarnCleanupJob === "function") {
        const prepared = gpuProcessWorker.prepareEarnCleanupJob(baseJob, { lane });
        return prepared || baseJob;
      }
      if (typeof gpuProcessWorker.prepareEarnJob === "function") {
        const prepared = gpuProcessWorker.prepareEarnJob(baseJob, { lane });
        return prepared || baseJob;
      }
    }

    // Backward-lane generic normalization
    if (typeof gpuProcessWorker.prepareBackwardJob === "function") {
      const prepared = gpuProcessWorker.prepareBackwardJob(baseJob, { lane });
      return prepared || baseJob;
    }

    // Fallback generic job hook
    if (typeof gpuProcessWorker.prepareJob === "function") {
      const prepared = gpuProcessWorker.prepareJob(baseJob, { lane });
      return prepared || baseJob;
    }
  } catch (err) {
    dberror("routeJobThroughProcessWorker (backward) error:", err);
  }

  return baseJob;
}


// ============================================================================
// INTERNAL: JOB BUILDERS (GPU CLEANUP / EARN CLEANUP / SNAPSHOT / GENERIC)
// ============================================================================

function buildGpuCleanupJob(payload = {}, hints = {}) {
  return {
    jobId: payload.jobId || `gpu-cleanup-job-${Date.now()}`,
    type: payload.type || "GPU_CACHE",
    lane: "backward",
    priority: payload.priority || "normal",
    binaryPayload: payload.binaryPayload || null,
    payload: payload.payload || {},
    cosmosContext: payload.cosmosContext || cosmosContext,
    organismId: payload.organismId || null,
    instanceId: payload.instanceId || null,
    hints: {
      cleanup: true,
      eviction: !!hints.eviction,
      compaction: !!hints.compaction,
      useGpuCache: true,
      useSnapshotPhysics: !!hints.useSnapshotPhysics,
      useDeltaEngine: !!hints.useDeltaEngine,
      useDeploymentPhysics: !!hints.useDeploymentPhysics,
      useRegioning: !!hints.useRegioning,
      useLineage: !!hints.useLineage,
      useMultiOrganism: !!hints.useMultiOrganism,
      useExecution: !!hints.useExecution,
      earnLane: !!hints.earnLane
    }
  };
}

function buildEarnCleanupJob(payload = {}, hints = {}) {
  return {
    jobId: payload.jobId || `earn-cleanup-job-${Date.now()}`,
    type: payload.type || "EARN_SETTLEMENT",
    lane: "backward",
    priority: payload.priority || "normal",
    payload: payload.payload || {},
    cosmosContext: payload.cosmosContext || cosmosContext,
    organismId: payload.organismId || null,
    instanceId: payload.instanceId || null,
    hints: {
      cleanup: true,
      settlement: !!hints.settlement,
      reconciliation: !!hints.reconciliation,
      earnLane: true,
      useSnapshotPhysics: !!hints.useSnapshotPhysics,
      useDeltaEngine: !!hints.useDeltaEngine,
      useDeploymentPhysics: !!hints.useDeploymentPhysics,
      useRegioning: !!hints.useRegioning,
      useLineage: !!hints.useLineage,
      useMultiOrganism: !!hints.useMultiOrganism,
      useExecution: !!hints.useExecution,
      useGpuCache: !!hints.useGpuCache
    }
  };
}

function buildSnapshotJob(payload = {}, hints = {}) {
  return {
    jobId: payload.jobId || `snapshot-job-${Date.now()}`,
    type: payload.type || "STATE_SNAPSHOT",
    lane: "backward",
    priority: payload.priority || "low",
    payload: payload.payload || {},
    cosmosContext: payload.cosmosContext || cosmosContext,
    organismId: payload.organismId || null,
    instanceId: payload.instanceId || null,
    hints: {
      useSnapshotPhysics: true,
      useDeltaEngine: !!hints.useDeltaEngine,
      useRegioning: !!hints.useRegioning,
      useLineage: !!hints.useLineage,
      useMultiOrganism: !!hints.useMultiOrganism,
      useExecution: !!hints.useExecution,
      useGpuCache: !!hints.useGpuCache,
      earnLane: !!hints.earnLane,
      cleanup: !!hints.cleanup
    }
  };
}

function buildGenericJob(payload = {}, hints = {}) {
  return {
    jobId: payload.jobId || `job-${Date.now()}`,
    type: payload.type || "GENERIC",
    lane: payload.lane || "backward",
    priority: payload.priority || "normal",
    payload: payload.payload || {},
    binaryPayload: payload.binaryPayload || null,
    cosmosContext: payload.cosmosContext || cosmosContext,
    organismId: payload.organismId || null,
    instanceId: payload.instanceId || null,
    hints: {
      ...cloneShallow(hints)
    }
  };
}


// ============================================================================
// PUBLIC API — BACKWARD MOTION (CORE)
// ============================================================================

/**
 * submit
 * ------
 * Enqueue a job into the backward motion engine.
 * 1) Normalize via PulseGPUProcessWorker-v30 (GPU/Earn cleanup aware).
 * 2) Forward to engine.submitBackwardJob().
 */
export function submit(job) {
  if (!engine || typeof engine.submitBackwardJob !== "function") {
    return { ok: false, reason: "ENGINE_UNAVAILABLE" };
  }
  const processedJob = routeJobThroughProcessWorker(job);
  return engine.submitBackwardJob(processedJob);
}

/**
 * submitGpuCleanup
 * ----------------
 * Convenience: build a GPU cache cleanup/compaction job and submit.
 */
export function submitGpuCleanup(payload = {}, hints = {}) {
  const job = buildGpuCleanupJob(payload, hints);
  return submit(job);
}

/**
 * submitEarnCleanup
 * -----------------
 * Convenience: build an Earn settlement/reconciliation job and submit.
 */
export function submitEarnCleanup(payload = {}, hints = {}) {
  const job = buildEarnCleanupJob(payload, hints);
  return submit(job);
}

/**
 * submitSnapshot
 * --------------
 * Convenience: build a snapshot job and submit via backward lane.
 */
export function submitSnapshot(payload = {}, hints = {}) {
  const job = buildSnapshotJob(payload, hints);
  return submit(job);
}

/**
 * submitGeneric
 * -------------
 * Convenience: build a generic job and submit via backward lane.
 */
export function submitGeneric(payload = {}, hints = {}) {
  const job = buildGenericJob(payload, hints);
  return submit(job);
}

/**
 * tick
 * ----
 * Advance the backward motion engine by one tick.
 */
export function tick() {
  if (!engine || typeof engine.tickBackward !== "function") {
    return { ok: false, reason: "ENGINE_UNAVAILABLE" };
  }
  return engine.tickBackward();
}

/**
 * prewarm
 * -------
 * Allow the engine to pre-initialize:
 *   - CoreMemory namespaces for regioning/lineage/execution
 *   - caches for compression/dedupe
 *   - Earn settlement lanes, GPU cache metadata
 */
export function prewarm() {
  if (!engine || typeof engine.prewarm !== "function") {
    return { ok: false, reason: "ENGINE_UNAVAILABLE" };
  }
  return engine.prewarm();
}


// ============================================================================
// SNAPSHOT / DIAGNOSTICS SURFACE (READ-ONLY)
// ============================================================================

/**
 * snapshot
 * --------
 * Ask the engine for a backward-lane snapshot if available.
 */
export function snapshot() {
  try {
    if (!engine) return null;
    if (typeof engine.snapshotBackward === "function") {
      return engine.snapshotBackward();
    }
    if (typeof engine.snapshot === "function") {
      return engine.snapshot();
    }
  } catch (err) {
    dberror("BackwardMotion-v30 snapshot error:", err);
  }
  return null;
}

/**
 * diagnostics
 * -----------
 * Lightweight meta surface for observability.
 */
export function diagnostics() {
  return {
    role: BACKWARD_MOTION_ROLE_V30,
    engineAvailable: !!engine,
    processWorkerAvailable: !!gpuProcessWorker,
    cosmosContext: {
      universeId: cosmosContext.universeId,
      timelineId: cosmosContext.timelineId,
      branchId: cosmosContext.branchId,
      shardId: cosmosContext.shardId
    }
  };
}


// ============================================================================
// ARTERY EXPOSURE (READ-ONLY, BACKWARD LANE VIEW)
// ============================================================================

export const artery =
  engine && engine.artery && engine.artery.backward
    ? engine.artery.backward
    : null;


// ============================================================================
// FACTORY EXPORT (for meta/diagnostics)
// ============================================================================

export const PulseBackward = createPulseMotionEngine;


// ============================================================================
// PROCESS WORKER EXPOSURE (READ-ONLY)
// ============================================================================

export const processWorker =
  gpuProcessWorker || null;
