// ============================================================================
// ForwardMotion-v30-Immortal-ProcessWorker+++ (v30++)
//  • Universal forward process worker over PulseMotionEngine-v30
//  • Lane: "forward" → expansion, prediction, earn, gpu-cache, prefill
//  • Band: "dual" (symbolic + binary)
//  • Integrated PulseGPUProcessWorker-v30 (GPU + Earn normalization)
//  • Zero compute logic here: all heavy lifting lives in PulseMotionEngine-v30
//  • v30++: richer GPU/Earn helpers, snapshots, diagnostics, warm-path hints
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
// ROLE META (FORWARD PROCESS WORKER v30++)
// ============================================================================

export const FORWARD_MOTION_ROLE_V30 = Object.freeze({
  lane: "forward",
  motionType: "expansion",
  band: "dual",
  description: [
    "Expands patterns, predicts next states, generates prefillChunks,",
    "executes earn/gpu-cache jobs, and orchestrates the v30 Pulse-World substrate.",
    "Forward lane is the primary motion heart for GPU+Earn prefill and cache."
  ].join(" "),
  engineMethod: "tickForward",
  safety: "ForwardMotion wrapper must never modify engine internals"
});


// ============================================================================
// PROCESS WORKER INSTANCE (FORWARD-FACE, GPU+EARN AWARE)
// ============================================================================

let gpuProcessWorker = null;

function createGpuProcessWorkerSafe() {
  try {
    if (typeof PulseGPUProcessWorker === "function") {
      return new PulseGPUProcessWorker({
        lane: "forward",
        band: "dual",
        role: "gpu+earn-process-worker-forward",
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
        lane: "forward",
        band: "dual",
        role: "gpu+earn-process-worker-forward",
        presenceContext,
        advantageContext,
        cosmosContext
      });
    }
  } catch (err) {
    dberror("PulseGPUProcessWorker-v30 (forward) creation failed:", err);
  }
  return null;
}

gpuProcessWorker = createGpuProcessWorkerSafe();


// ============================================================================
// ENGINE INSTANCE (FORWARD FACE) — ZERO-COMPUTE WRAPPER
// ============================================================================

let engine = null;

try {
  engine = createPulseMotionEngine({
    // Identity
    instanceId: "motion-forward",
    triHeartId: "forward-heart",

    // Motion semantics
    lane: "forward",
    mode: "expansion",
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
    allowSnapshotPhysics: true,        // SnapshotPhysics-v30
    allowDeltaEngine: true,            // DeltaEngine-v30
    allowDeploymentPhysics: true,      // DeploymentPhysics-v30
    allowRegioningPhysics: true,       // RegioningPhysics-v30
    allowRegionMeshRouting: true,      // RegionMeshRouting-v30
    allowLineageEngine: true,          // LineageEngine-v30
    allowMultiOrganismSupport: true,   // MultiOrganismSupport-v30
    allowExecutionPhysics: true,       // ExecutionPhysics-v30
    allowCoreMemory: true,             // CoreMemory surfaces

    // Workload lanes
    allowEarnLane: true,               // Earn tasks as MotionJobs
    allowGpuCacheLane: true,           // GPU-style cache/precompute jobs

    // Safety: wrapper must never mutate engine internals directly
    allowArteryMutation: false
  });
} catch (err) {
  dberror("ForwardMotion-v30 engine wiring failed:", err);
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
  const lane = job.lane || "forward";
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
// INTERNAL: GPU/EARN PROCESS WORKER ROUTING (FORWARD LANE)
//  • If job is GPU/EARN-related, let PulseGPUProcessWorker normalize it.
//  • Always fail-open: if worker is missing or rejects, original job passes.
// ============================================================================

function routeJobThroughProcessWorker(job) {
  if (!isObject(job)) return job;
  if (!gpuProcessWorker) return job;

  const baseJob = normalizeJobBase(job);

  try {
    const type = baseJob.type || baseJob.kind || "";
    const lane = baseJob.lane || "forward";

    // GPU-centric jobs
    if (
      type === "GPU_CACHE" ||
      type === "GPU_COMPUTE" ||
      type === "BINARY_COMPUTE"
    ) {
      if (typeof gpuProcessWorker.prepareGpuJob === "function") {
        const prepared = gpuProcessWorker.prepareGpuJob(baseJob, { lane });
        return prepared || baseJob;
      }
    }

    // Earn-centric jobs
    if (
      type === "EARN_TASK" ||
      type === "EARN_SETTLEMENT" ||
      type === "EARN_RECONCILE" ||
      type === "EARN_PREFILL"
    ) {
      if (typeof gpuProcessWorker.prepareEarnJob === "function") {
        const prepared = gpuProcessWorker.prepareEarnJob(baseJob, { lane });
        return prepared || baseJob;
      }
    }

    // Forward-lane generic normalization
    if (typeof gpuProcessWorker.prepareForwardJob === "function") {
      const prepared = gpuProcessWorker.prepareForwardJob(baseJob, { lane });
      return prepared || baseJob;
    }

    // Fallback generic job hook
    if (typeof gpuProcessWorker.prepareJob === "function") {
      const prepared = gpuProcessWorker.prepareJob(baseJob, { lane });
      return prepared || baseJob;
    }
  } catch (err) {
    dberror("routeJobThroughProcessWorker (forward) error:", err);
  }

  return baseJob;
}


// ============================================================================
// INTERNAL: JOB BUILDERS (GPU / EARN / SNAPSHOT / GENERIC)
// ============================================================================

function buildGpuJob(payload = {}, hints = {}) {
  return {
    jobId: payload.jobId || `gpu-job-${Date.now()}`,
    type: payload.type || "GPU_CACHE",
    lane: "forward",
    priority: payload.priority || "normal",
    binaryPayload: payload.binaryPayload || null,
    payload: payload.payload || {},
    cosmosContext: payload.cosmosContext || cosmosContext,
    organismId: payload.organismId || null,
    instanceId: payload.instanceId || null,
    hints: {
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

function buildEarnJob(payload = {}, hints = {}) {
  return {
    jobId: payload.jobId || `earn-job-${Date.now()}`,
    type: payload.type || "EARN_TASK",
    lane: "forward",
    priority: payload.priority || "normal",
    payload: payload.payload || {},
    cosmosContext: payload.cosmosContext || cosmosContext,
    organismId: payload.organismId || null,
    instanceId: payload.instanceId || null,
    hints: {
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
    lane: "forward",
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
      earnLane: !!hints.earnLane
    }
  };
}

function buildGenericJob(payload = {}, hints = {}) {
  return {
    jobId: payload.jobId || `job-${Date.now()}`,
    type: payload.type || "GENERIC",
    lane: payload.lane || "forward",
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
// PUBLIC API — FORWARD MOTION (CORE)
// ============================================================================

/**
 * submit
 * ------
 * Enqueue a job into the forward motion engine.
 * 1) Normalize via PulseGPUProcessWorker-v30 (GPU/Earn aware).
 * 2) Forward to engine.submitForwardJob().
 */
export function submit(job) {
  if (!engine || typeof engine.submitForwardJob !== "function") {
    return { ok: false, reason: "ENGINE_UNAVAILABLE" };
  }
  const processedJob = routeJobThroughProcessWorker(job);
  return engine.submitForwardJob(processedJob);
}

/**
 * submitGpu
 * ---------
 * Convenience: build a GPU-style job and submit via forward lane.
 */
export function submitGpu(payload = {}, hints = {}) {
  const job = buildGpuJob(payload, hints);
  return submit(job);
}

/**
 * submitEarn
 * ----------
 * Convenience: build an Earn-style job and submit via forward lane.
 */
export function submitEarn(payload = {}, hints = {}) {
  const job = buildEarnJob(payload, hints);
  return submit(job);
}

/**
 * submitSnapshot
 * --------------
 * Convenience: build a snapshot job and submit via forward lane.
 */
export function submitSnapshot(payload = {}, hints = {}) {
  const job = buildSnapshotJob(payload, hints);
  return submit(job);
}

/**
 * submitGeneric
 * -------------
 * Convenience: build a generic job and submit via forward lane.
 */
export function submitGeneric(payload = {}, hints = {}) {
  const job = buildGenericJob(payload, hints);
  return submit(job);
}

/**
 * tick
 * ----
 * Advance the forward motion engine by one tick.
 */
export function tick() {
  if (!engine || typeof engine.tickForward !== "function") {
    return { ok: false, reason: "ENGINE_UNAVAILABLE" };
  }
  return engine.tickForward();
}

/**
 * prewarm
 * -------
 * Allow the engine to pre-initialize:
 *   - DB connections
 *   - CoreMemory namespaces
 *   - region graphs / stability maps
 *   - caches for Earn / GPU cache lanes
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
 * Ask the engine for a forward-lane snapshot if available.
 * (Fail-open: returns null if engine has no snapshot API.)
 */
export function snapshot() {
  try {
    if (!engine) return null;
    if (typeof engine.snapshotForward === "function") {
      return engine.snapshotForward();
    }
    if (typeof engine.snapshot === "function") {
      return engine.snapshot();
    }
  } catch (err) {
    dberror("ForwardMotion-v30 snapshot error:", err);
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
    role: FORWARD_MOTION_ROLE_V30,
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
// ARTERY EXPOSURE (READ-ONLY, FORWARD LANE VIEW)
// ============================================================================

export const artery =
  engine && engine.artery && engine.artery.forward
    ? engine.artery.forward
    : null;


// ============================================================================
// FACTORY EXPORT (for meta/diagnostics)
// ============================================================================

export const PulseForward = createPulseMotionEngine;


// ============================================================================
// PROCESS WORKER EXPOSURE (READ-ONLY)
// ============================================================================

export const processWorker =
  gpuProcessWorker || null;
