// ============================================================================
// BackwardMotion-v24-Immortal-Evo+++ — Backward Motion Page Wrapper
//  • Thin directional wrapper around PulseMotionEngine-v24
//  • No compute logic, no shifter logic, no artery logic
//  • Lane-specific intent: stabilization, compression, reduction
//  • Evidence-aware, diagnostics-aware, multi-band, session-aware
// ============================================================================
import {
  OrganismIdentity,
  buildPulseOrganismMap as PulseOrganismMap,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PULSE-WORLD-MAP.js";
const Identity = OrganismIdentity(import.meta.url);

// 2 — EXPORT GENOME METADATA
// export const PulseEarnCustomReceptorMeta = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
// export const PULSE_EARN_IMMUNE_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;
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
  (G.firebaseAdmin && G.firebaseAdmin.firestore && G.firebaseAdmin.firestore.Timestamp) ||
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
  (G.db && G.db) ||                 // Shadow DB (v25++)
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
  
const fetchFn =
  (G.fetchfn && typeof G.fetchfn === "function" && G.fetchfn) ||   // Shadow fetch alias
  (G.fetch && typeof G.fetch === "function" && G.fetch) ||         // Global broadcasted Shadow.fetch
  null;

// Safe presence/advantage contexts (optional, zero-mutation)
const presenceContext =
  (typeof window !== "undefined" && window.PULSE_PRESENCE) ||
  g.PULSE_PRESENCE ||
  {};

const advantageContext =
  (typeof window !== "undefined" && window.PULSE_ADVANTAGE) ||
  g.PULSE_ADVANTAGE ||
  {};

// ============================================================================
// ENGINE IMPORT (v24 IMMORTAL MOTION ENGINE)
// ============================================================================
import { createPulseMotionEngine } from "./PulseEngineMotionEngine-v24.js";

// ============================================================================
// ENGINE INSTANCE (BACKWARD FACE) — ZERO-COMPUTE WRAPPER
// ============================================================================
let engine = null;

try {
  engine = createPulseMotionEngine({
    instanceId: "motion-backward",
    presenceContext,
    advantageContext,
    triHeartId: "backward-heart",
    lane: "backward",
    mode: "compression",
    band: "dual"
  });
} catch {
  // BackwardMotion must never throw during wiring; engine may remain null.
}

/*
BACKWARD_MOTION_ROLE = {
  lane: "backward",
  motionType: "compression",
  description: "Stabilizes patterns, dedupes, reduces, generates compressedHints",
  engineMethod: "tickBackward",
  safety: "BackwardMotion must never modify engine internals"
}
*/

// ============================================================================
// PUBLIC API — BACKWARD MOTION (PURE INTERFACE, ZERO LOGIC)
// ============================================================================

export function submit(job) {
  if (!engine || typeof engine.submitBackwardJob !== "function") return;
  engine.submitBackwardJob(job);
}

export function tick() {
  if (!engine || typeof engine.tickBackward !== "function") {
    return { ok: false, reason: "ENGINE_UNAVAILABLE" };
  }
  return engine.tickBackward();
}

export function prewarm() {
  if (!engine || typeof engine.prewarm !== "function") {
    return { ok: false, reason: "ENGINE_UNAVAILABLE" };
  }
  return engine.prewarm();
}

// Expose artery for UI/debug (read-only surface)
export const artery =
  engine && engine.artery && engine.artery.backward
    ? engine.artery.backward
    : null;
export const PulseBackward = createPulseMotionEngine;