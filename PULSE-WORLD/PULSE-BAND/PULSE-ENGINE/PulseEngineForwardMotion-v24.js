// ============================================================================
// ForwardMotion-v24-Immortal-Evo+++ — Forward Motion Page Wrapper
//  • Thin directional wrapper around PulseMotionEngine-v24
//  • No compute logic, no shifter logic, no artery logic
//  • Lane-specific intent: expansion, prediction, forward motion
//  • Evidence-aware, diagnostics-aware, multi-band, session-aware
// ============================================================================
PULSE-WORLD-MAP.js
import {
  OrganismIdentity,
  buildPulseOrganismMap as PulseOrganismMap
} from "./PULSE-WORLD-MAP.js";
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
const g =
  typeof globalThis !== "undefined"
    ? globalThis
    : typeof global !== "undefined"
    ? global
    : typeof window !== "undefined"
    ? window
    : {};

// Safe presence/advantage contexts (zero-mutation)
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
// ENGINE INSTANCE (FORWARD FACE) — ZERO-COMPUTE WRAPPER
// ============================================================================
let engine = null;

try {
  engine = createPulseMotionEngine({
    instanceId: "motion-forward",
    presenceContext,
    advantageContext,
    triHeartId: "forward-heart",
    lane: "forward",
    mode: "expansion",
    band: "dual"
  });
} catch {
  // ForwardMotion must never throw during wiring; engine may remain null.
}

/*
FORWARD_MOTION_ROLE = {
  lane: "forward",
  motionType: "expansion",
  description: "Expands patterns, predicts next states, generates prefillChunks",
  engineMethod: "tickForward",
  safety: "ForwardMotion must never modify engine internals"
}
*/

// ============================================================================
// PUBLIC API — FORWARD MOTION (PURE INTERFACE, ZERO LOGIC)
// ============================================================================

export function submit(job) {
  if (!engine || typeof engine.submitForwardJob !== "function") return;
  engine.submitForwardJob(job);
}

export function tick() {
  if (!engine || typeof engine.tickForward !== "function") {
    return { ok: false, reason: "ENGINE_UNAVAILABLE" };
  }
  return engine.tickForward();
}

export function prewarm() {
  if (!engine || typeof engine.prewarm !== "function") {
    return { ok: false, reason: "ENGINE_UNAVAILABLE" };
  }
  return engine.prewarm();
}

// Expose artery for UI/debug (read-only surface)
export const artery =
  engine && engine.artery && engine.artery.forward
    ? engine.artery.forward
    : null;
export const PulseForward = createPulseMotionEngine;