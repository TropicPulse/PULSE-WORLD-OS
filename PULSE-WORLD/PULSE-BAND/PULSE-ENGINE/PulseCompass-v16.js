// ============================================================================
// PulseCompass-v16.js — Motion Orchestrator (IMMORTAL)
//  • Chooses motion lane dynamically (forward/backward/...)
//  • Remembers last used lane via MemoryOrgan
//  • Falls back to forward if unknown
//  • Zero compute logic — delegates to lane wrappers
//  • Future lanes can be added without modifying EngineBlock
// ============================================================================

/*
AI_EXPERIENCE_META = {
  identity: "PulseCompass",
  version: "v16-IMMORTAL",
  layer: "motion_orchestrator",
  role: "lane_selector",
  lineage: "PulseMotionEngine-v16 → PulseCompass-v16",

  evo: {
    laneAgnostic: true,
    unifiedMotion: true,
    driftProof: true,
    zeroCompute: true,
    zeroMutation: true,
    pureRouting: true,
    fallbackAware: true,
    memoryAware: true,
    presenceAware: true,
    advantageAware: true,
    triHeartAware: true
  },

  contract: {
    always: [
      "PulseMotionEngine",
      "ForwardMotion-v16",
      "BackwardMotion-v16"
    ],
    never: [
      "BinaryOrgan",
      "ShifterPulse",
      "routerCore",
      "meshKernel"
    ]
  }
}
*/

/*
PAGE_INDEX = {
  purpose: "Select correct motion lane at runtime",
  responsibilities: [
    "Load last-used lane from MemoryOrgan",
    "Fallback to forward if unknown",
    "Expose submit/tick/prewarm routed to correct lane",
    "Allow future lanes to be added without modifying EngineBlock"
  ],
  forbidden: [
    "No compute logic",
    "No pattern expansion/compression",
    "No artery mutation",
    "No shifter usage"
  ],
  notes: "This file must remain thin and deterministic."
}
*/

// Lane wrappers
import * as Forward from "./ForwardMotion-v16.js";
import * as Backward from "./BackwardMotion-v16.js";

// Key for storing last-used lane
const LAST_LANE_KEY = "pulse:lastMotionLane";

// Default lane if none stored
const DEFAULT_LANE = "forward";

// Allowed lanes (future lanes can be added here)
const LANES = {
  forward: Forward,
  backward: Backward
};

// ---------------------------------------------------------------------------
// Lane selection logic
// ---------------------------------------------------------------------------
export function createPulseCompass({ MemoryOrgan, trace = false } = {}) {
  if (!MemoryOrgan) {
    throw new Error("[PulseCompass] MemoryOrgan is required.");
  }

  function readLastLane() {
    const lane = MemoryOrgan.read?.(LAST_LANE_KEY);
    if (LANES[lane]) return lane;
    return DEFAULT_LANE;
  }

  function writeLastLane(lane) {
    MemoryOrgan.write?.(LAST_LANE_KEY, lane);
  }

  // Determine active lane
  let activeLane = readLastLane();
  let Lane = LANES[activeLane];

  if (trace) console.log("[PulseCompass] Active lane:", activeLane);

  // -------------------------------------------------------------------------
  // Routing wrappers
  // -------------------------------------------------------------------------
  function submit(job) {
    Lane.submit(job);
    writeLastLane(activeLane);
  }

  function tick() {
    const res = Lane.tick();
    writeLastLane(activeLane);
    return res;
  }

  function prewarm() {
    return Lane.prewarm();
  }

  // -------------------------------------------------------------------------
  // Lane switching API (optional)
  // -------------------------------------------------------------------------
  function switchLane(lane) {
    if (!LANES[lane]) {
      console.warn("[PulseCompass] Unknown lane:", lane);
      return false;
    }
    activeLane = lane;
    Lane = LANES[lane];
    writeLastLane(lane);

    if (trace) console.log("[PulseCompass] Switched to lane:", lane);
    return true;
  }

  return Object.freeze({
    submit,
    tick,
    prewarm,
    switchLane,
    get activeLane() {
      return activeLane;
    }
  });
}
