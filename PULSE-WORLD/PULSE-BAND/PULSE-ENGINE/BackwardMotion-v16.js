// ============================================================================
// BackwardMotion-v16.js — Backward Motion Page Wrapper
//  • Thin directional wrapper around PulseMotionEngine-v16
//  • No compute logic, no shifter logic, no artery logic
//  • Lane-specific intent: stabilization, compression, reduction
// ============================================================================

/*
AI_EXPERIENCE_META = {
  identity: "BackwardMotion",
  version: "v16",
  layer: "motion_page",
  role: "backward_motion_interface",
  lineage: "PulseMotionEngine-v16 → BackwardMotion-v16",

  evo: {
    backwardLane: true,
    directionalWrapper: true,
    zeroCompute: true,
    zeroMutation: true,
    driftProof: true,
    pureInterface: true,
    motionAware: true,
    arteryAware: true,
    presenceAware: true,
    advantageAware: true,
    triHeartAware: true
  },

  contract: {
    always: [
      "PulseMotionEngine",
      "PulsePower",
      "PulseChunker"
    ],
    never: [
      "BinaryOrgan",
      "ShifterPulse",
      "routerCore",
      "meshKernel",
      "presenceEngine"
    ]
  }
}
*/

/*
PAGE_INDEX = {
  purpose: "Expose backward motion lane to UI/pages",
  lane: "backward",
  responsibilities: [
    "Submit backward jobs",
    "Trigger backward ticks",
    "Expose backward artery for UI",
    "Never compute patterns",
    "Never compress/expand",
    "Never encode/decode"
  ],
  forbidden: [
    "No computeBackward logic",
    "No shifter usage",
    "No normalization",
    "No packet writing",
    "No artery mutation"
  ],
  notes: "This file must remain thin. All logic lives in PulseMotionEngine."
}
*/

import { createPulseMotionEngine } from "./PulseMotionEngine-v16.js";

// Engine instance (backward face)
const engine = createPulseMotionEngine({
  instanceId: "motion-backward",
  presenceContext: window.PULSE_PRESENCE || {},
  advantageContext: window.PULSE_ADVANTAGE || {},
  triHeartId: "backward-heart"
});

/*
BACKWARD_MOTION_ROLE = {
  lane: "backward",
  motionType: "compression",
  description: "Stabilizes patterns, dedupes, reduces, generates compressedHints",
  engineMethod: "tickBackward",
  safety: "BackwardMotion must never modify engine internals"
}
*/

// Public API for backward motion
export function submit(job) {
  engine.submitBackwardJob(job);
}

export function tick() {
  return engine.tickBackward();
}

export function prewarm() {
  return engine.prewarm();
}

// Expose artery for UI/debug
export const artery = engine.artery.backward;
