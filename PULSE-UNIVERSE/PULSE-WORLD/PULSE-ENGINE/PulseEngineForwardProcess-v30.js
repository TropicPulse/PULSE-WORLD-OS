// ============================================================================
// ForwardMotion-v30-Immortal-ProcessWorker+++
//  • Thin directional wrapper around PulseMotionEngine-v30
//  • Still ZERO compute logic in this file (no shifters, no arteries mutated)
//  • Lane-specific intent: expansion, prediction, forward motion, earn, gpu-cache
//  • Engine is a compressed orchestrator over the full Pulse-World v30 substrate:
//      - SnapshotPhysics v30
//      - DeltaEngine v30
//      - DeploymentPhysics v30
//      - RegioningPhysics v30 + RegionMeshRouting v30
//      - LineageEngine v30
//      - MultiOrganismSupport v30
//      - ExecutionPhysics v30
//      - CoreMemory + Shadow DB + fetch + presence/advantage/cosmos
//  • This wrapper is your “universal forward process worker” entrypoint.
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
//  • Works in browser, worker, node, or any JS host
//  • Never throws if globals are missing
// ============================================================================

const G =
  (typeof window !== "undefined" && window) ||
  (typeof globalThis !== "undefined" && globalThis) ||
  (typeof self !== "undefined" && self) ||
  (typeof global !== "undefined" && global) ||
  {};

const g = G;


// ============================================================================
// UNIVERSAL TIMESTAMP (Shadow or Admin)
//  • Prefer Shadow/host Timestamp if present
//  • Fallback to firebaseAdmin Timestamp if available
//  • Otherwise null (engine must handle gracefully)
// ============================================================================

const Timestamp =
  (G.firebaseAdmin &&
    G.firebaseAdmin.firestore &&
    G.firebaseAdmin.firestore.Timestamp) ||
  (G.Timestamp && G.Timestamp) ||
  null;


// ============================================================================
// UNIVERSAL ADMIN (Shadow or Admin)
//  • Shadow/admin handle for Firestore or other admin APIs
// ============================================================================

const admin =
  (G.firebaseAdmin && G.firebaseAdmin) ||
  (G.admin && G.admin) ||
  null;


// ============================================================================
// UNIVERSAL DB (Shadow DB ALWAYS wins)
//  • db is the primary substrate for persistent state
//  • Shadow DB (G.db) is preferred
//  • Fallback to admin.firestore() if available
// ============================================================================

const db =
  (G.db && G.db) ||                                   // Shadow DB (v25++)
  (admin && admin.firestore && admin.firestore()) || // Admin fallback
  null;


// ============================================================================
// UNIVERSAL LOGGING
//  • dblog / dberror are soft-bound logging surfaces
//  • Engine can use them for diagnostics, but wrapper stays zero-logic
// ============================================================================

const dblog =
  (G.log && G.log) ||
  console.log;

const dberror =
  (G.error && G.error) ||
  console.error;


// ============================================================================
// UNIVERSAL FETCH
//  • fetchFn is the network surface
//  • Shadow fetch alias (G.fetchfn) wins
//  • Fallback to global fetch if present
// ============================================================================

const fetchFn =
  (G.fetchfn && typeof G.fetchfn === "function" && G.fetchfn) ||
  (G.fetch && typeof G.fetch === "function" && G.fetch) ||
  null;


// ============================================================================
// SAFE CONTEXTS (zero-mutation, world-aware)
//  • presenceContext: who/what is “here”
//  • advantageContext: advantage surfaces, scoring, hints
//  • cosmosContext: multiverse placement (universe/timeline/branch/shard)
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
//  • This is the compressed orchestrator over the Pulse-World v30 stack
//  • All heavy logic lives inside this engine, not in this wrapper
// ============================================================================

import { createPulseMotionEngine } from "./PulseEngineMotionEngine-v30.js";


// ============================================================================
// ENGINE INSTANCE (FORWARD FACE) — ZERO-COMPUTE WRAPPER
//  • lane: "forward"  → expansion, prediction, prefill, earn, gpu-cache
//  • mode: "expansion"
//  • band: "dual"     → can see both symbolic + binary bands
//  • triHeartId: identifies this motion-heart in the tri-heart topology
//  • Capability flags: grant engine access to all v30 physics modules
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
  // ForwardMotion must never throw during wiring; engine may remain null.
  dberror("ForwardMotion-v30 engine wiring failed:", err);
  engine = null;
}

/*
FORWARD_MOTION_ROLE_V30 = {
  lane: "forward",
  motionType: "expansion",
  description: [
    "Expands patterns, predicts next states, generates prefillChunks,",
    "executes earn/gpu-cache jobs, and orchestrates the v30 Pulse-World substrate."
  ].join(" "),
  engineMethod: "tickForward",
  safety: "ForwardMotion wrapper must never modify engine internals"
}
*/


// ============================================================================
// PUBLIC API — FORWARD MOTION (PURE INTERFACE, ZERO LOGIC)
//  • submit(job): enqueue a MotionJob into the forward lane
//  • tick(): advance the engine one forward tick (process queued jobs)
//  • prewarm(): allow engine to hydrate caches, CoreMemory, DB handles, etc.
//  • All routing/compute/orchestration happens inside PulseMotionEngine-v30.
// ============================================================================

/**
 * submit
 * ------
 * Enqueue a job into the forward motion engine.
 *
 * Expected job shape (conceptual):
 *   {
 *     jobId: string,
 *     type: "EARN_TASK" | "BINARY_COMPUTE" | "STATE_SNAPSHOT" | ...,
 *     lane?: "forward" | "backward" | "auto",
 *     priority?: "low" | "normal" | "high",
 *     binaryPayload?: ArrayBuffer | Uint8Array,
 *     payload?: any,
 *     cosmosContext?: { universeId?, timelineId?, branchId?, shardId? },
 *     organismId?: string | null,
 *     instanceId?: string | null,
 *     hints?: {
 *       useSnapshotPhysics?: boolean,
 *       useDeltaEngine?: boolean,
 *       useDeploymentPhysics?: boolean,
 *       useRegioning?: boolean,
 *       useLineage?: boolean,
 *       useMultiOrganism?: boolean,
 *       useExecution?: boolean,
 *       useGpuCache?: boolean,
 *       earnLane?: boolean
 *     }
 *   }
 *
 * This wrapper does not inspect or modify the job; it just forwards it.
 */
export function submit(job) {
  if (!engine || typeof engine.submitForwardJob !== "function") {
    return { ok: false, reason: "ENGINE_UNAVAILABLE" };
  }
  return engine.submitForwardJob(job);
}

/**
 * tick
 * ----
 * Advance the forward motion engine by one tick.
 *
 * Inside the engine, a tick might:
 *   - drain a queue of MotionJobs
 *   - call Snapshot/Delta/Deployment/Regioning/Lineage/MultiOrg/Execution physics
 *   - write results to DB/CoreMemory/GPU cache
 *   - emit Earn artifacts or advantage metrics
 *
 * This wrapper only calls engine.tickForward() and returns its result.
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
 *
 * Wrapper simply forwards the call.
 */
export function prewarm() {
  if (!engine || typeof engine.prewarm !== "function") {
    return { ok: false, reason: "ENGINE_UNAVAILABLE" };
  }
  return engine.prewarm();
}


// ============================================================================
// ARTERY EXPOSURE (READ-ONLY, FORWARD LANE VIEW)
//  • artery: engine.artery.forward if present
//  • Intended for UI/diagnostics/observability only
//  • Never mutate artery from outside the engine
// ============================================================================

export const artery =
  engine && engine.artery && engine.artery.forward
    ? engine.artery.forward
    : null;


// ============================================================================
// FACTORY EXPORT (for meta/diagnostics)
//  • PulseForward is the engine factory itself
//  • Useful if you want to spin custom motion engines elsewhere
// ============================================================================

export const PulseForward = createPulseMotionEngine;
