// ============================================================================
// BackwardMotion-v30-Immortal-ProcessWorker+++
//  • Thin directional wrapper around PulseMotionEngine-v30
//  • STILL zero compute logic, no shifter logic, no artery mutation
//  • Lane-specific intent: stabilization, compression, reduction, dedupe
//  • Engine is a compressed orchestrator over the full Pulse-World v30 stack:
//      - SnapshotPhysics v30
//      - DeltaEngine v30
//      - DeploymentPhysics v30
//      - RegioningPhysics v30 + RegionMeshRouting v30
//      - LineageEngine v30
//      - MultiOrganismSupport v30
//      - ExecutionPhysics v30
//      - CoreMemory + Shadow DB + fetch + presence/advantage/cosmos
//  • This wrapper is your “universal backward process worker” entrypoint.
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
// UNIVERSAL TIMESTAMP (Shadow or Admin)
// ============================================================================

const Timestamp =
  (G.firebaseAdmin &&
    G.firebaseAdmin.firestore &&
    G.firebaseAdmin.firestore.Timestamp) ||
  (G.Timestamp && G.Timestamp) ||
  null;


// ============================================================================
// UNIVERSAL ADMIN (Shadow or Admin)
// ============================================================================

const admin =
  (G.firebaseAdmin && G.firebaseAdmin) ||
  (G.admin && G.admin) ||
  null;


// ============================================================================
// UNIVERSAL DB (Shadow DB ALWAYS wins)
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
// ENGINE INSTANCE (BACKWARD FACE) — ZERO-COMPUTE WRAPPER
//  • lane: "backward"  → stabilization, compression, reduction, dedupe
//  • mode: "compression"
//  • band: "dual"      → symbolic + binary bands
//  • Capability flags: full v30 physics stack, tuned for “cleanup / compress”
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
    allowEarnLane: true,
    allowGpuCacheLane: true,

    // Safety: wrapper must never mutate engine internals directly
    allowArteryMutation: false
  });
} catch (err) {
  dberror("BackwardMotion-v30 engine wiring failed:", err);
  engine = null;
}

/*
BACKWARD_MOTION_ROLE_V30 = {
  lane: "backward",
  motionType: "compression",
  description: [
    "Stabilizes patterns, dedupes, reduces, generates compressedHints,",
    "and runs cleanup/settlement/gpu-cache consolidation jobs over the v30 substrate."
  ].join(" "),
  engineMethod: "tickBackward",
  safety: "BackwardMotion wrapper must never modify engine internals"
}
*/


// ============================================================================
// PUBLIC API — BACKWARD MOTION (PURE INTERFACE, ZERO LOGIC)
// ============================================================================

/**
 * submit
 * ------
 * Enqueue a job into the backward motion engine.
 *
 * Typical backward jobs:
 *   - type: "BINARY_COMPUTE" with compression/dedupe hints
 *   - type: "STATE_SNAPSHOT" for consolidation
 *   - type: "DELTA_COMPUTE" for rollback/cleanup
 *   - type: "EARN_TASK" for settlement/reconciliation
 *   - type: "GPU_CACHE" for eviction/compaction
 *
 * This wrapper does not inspect or modify the job; it just forwards it.
 */
export function submit(job) {
  if (!engine || typeof engine.submitBackwardJob !== "function") {
    return { ok: false, reason: "ENGINE_UNAVAILABLE" };
  }
  return engine.submitBackwardJob(job);
}

/**
 * tick
 * ----
 * Advance the backward motion engine by one tick.
 *
 * Inside the engine, a backward tick might:
 *   - drain a queue of compression/cleanup jobs
 *   - compact lineage, regioning, or execution logs
 *   - recompute stability/advantage surfaces in a “shrinking” direction
 *   - write consolidated state back to DB/CoreMemory/GPU cache
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
