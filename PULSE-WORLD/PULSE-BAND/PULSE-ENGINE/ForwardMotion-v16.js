// ============================================================================
// ForwardMotion-v16.js — Forward Motion Page Wrapper
//  • Thin directional wrapper around PulseMotionEngine-v16
//  • No compute logic, no shifter logic, no artery logic
//  • Lane-specific intent: expansion, prediction, forward motion
// ============================================================================

/*
AI_EXPERIENCE_META = {
  identity: "ForwardMotion",
  version: "v16",
  layer: "motion_page",
  role: "forward_motion_interface",
  lineage: "PulseMotionEngine-v16 → ForwardMotion-v16",

  evo: {
    forwardLane: true,
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
  purpose: "Expose forward motion lane to UI/pages",
  lane: "forward",
  responsibilities: [
    "Submit forward jobs",
    "Trigger forward ticks",
    "Expose forward artery for UI",
    "Never compute patterns",
    "Never compress/expand",
    "Never encode/decode"
  ],
  forbidden: [
    "No computeForward logic",
    "No shifter usage",
    "No normalization",
    "No packet writing",
    "No artery mutation"
  ],
  notes: "This file must remain thin. All logic lives in PulseMotionEngine."
}
*/

import { createPulseMotionEngine } from "./PulseMotionEngine-v16.js";

// Engine instance (forward face)
const engine = createPulseMotionEngine({
  instanceId: "motion-forward",
  presenceContext: window.PULSE_PRESENCE || {},
  advantageContext: window.PULSE_ADVANTAGE || {},
  triHeartId: "forward-heart"
});

/*
FORWARD_MOTION_ROLE = {
  lane: "forward",
  motionType: "expansion",
  description: "Expands patterns, predicts next states, generates prefillChunks",
  engineMethod: "tickForward",
  safety: "ForwardMotion must never modify engine internals"
}
*/

// Public API for forward motion
export function submit(job) {
  // Forward-only job submission
  engine.submitForwardJob(job);
}

export function tick() {
  // Forward lane tick
  return engine.tickForward();
}

export function prewarm() {
  // Shared engine prewarm
  return engine.prewarm();
}

// Expose artery for UI/debug
export const artery = engine.artery.forward;
