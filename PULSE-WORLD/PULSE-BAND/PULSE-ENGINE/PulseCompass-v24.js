// ============================================================================
// PulseCompass-v24-Immortal-Evo+++.js — Motion Orchestrator & Telemetry Core
//  • Dynamic lane selection (forward/backward/…)
//  • Last-lane memory + health-aware auto-fallback
//  • Full motion telemetry → Motion_Engine_Logs (via PulseDB-v24)
//  • Prewarms all dependent lanes + DB
//  • Zero compute logic — pure routing + reporting
//  • Future lanes can be added without touching EngineBlock
//  • Evidence-aware, diagnostics-aware, session-aware, dual-band
// ============================================================================

/*
AI_EXPERIENCE_META = {
  identity: "PulseCompass",
  version: "v24-Immortal-Evo+++",
  layer: "motion_orchestrator",
  role: "lane_selector_health_monitor_and_reporter",
  lineage: "PulseMotionEngine-v16 → PulseCompass-v16-IMMORTAL+ → PulseCompass-v24-Immortal-Evo+++",

  evo: {
    laneAgnostic: true,
    unifiedMotion: true,
    driftProof: true,
    zeroCompute: true,
    zeroMutation: true,
    pureRouting: true,
    fallbackAware: true,
    memoryAware: true,
    reportingAware: true,
    healthAware: true,
    prewarmAware: true,
    analyticsAware: true,
    presenceAware: true,
    advantageAware: true,
    triHeartAware: true,

    // v24++ upgrades
    dualBand: true,
    binaryAware: true,
    symbolicAware: true,
    pulseBandAware: true,
    sessionAware: true,
    timeAxisAware: true,
    diagnosticsAware: true,
    evidenceAware: true,
    adminPanelAware: true,
    portalAware: true,
    trustFabricAware: true,
    organismMapAware: true
  },

  contract: {
    always: [
      "PulseMotionEngine",
      "ForwardMotion-v24-Immortal-Evo+++",
      "BackwardMotion-v24-Immortal-Evo+++",
      "PulseDB-v24",
      "PulsePresence",
      "PulseAdvantage",
      "PulseWorldAdminPanel",
      "AdminDiagnosticsOrgan"
    ],
    never: [
      "BinaryOrgan",
      "ShifterPulse",
      "routerCore",
      "meshKernel",
      "safeRoute",
      "fetchViaCNS"
    ]
  }
}
*/

/*
PAGE_INDEX = {
  purpose: "Select motion lane at runtime, monitor health, and record engine activity",
  responsibilities: [
    "Load last-used lane from MemoryOrgan",
    "Fallback to forward if unknown or unhealthy",
    "Expose submit/tick/prewarm routed to active lane",
    "Record tick metrics into Motion_Engine_Logs",
    "Record lane switches and prewarm events",
    "Compute simple health scores per lane",
    "Auto-fallback to healthy lane when needed",
    "Allow future lanes to be added without modifying EngineBlock"
  ],
  forbidden: [
    "No pattern expansion/compression",
    "No engine internals mutation",
    "No shifter usage",
    "No artery mutation"
  ],
  notes: "This file must remain thin, deterministic, and analytics-focused."
}
*/

// ============================================================================
// GLOBAL HANDLE (membrane-safe)
// ============================================================================
const g =
  typeof globalThis !== "undefined"
    ? globalThis
    : typeof global !== "undefined"
    ? global
    : typeof window !== "undefined"
    ? window
    : {};

// Lane wrappers (v24)
import * as Forward from "./ForwardMotion-v24-Immortal-Evo+++.js";
import * as Backward from "./BackwardMotion-v24-Immortal-Evo+++.js";

// DB adapter (v24)
import { createPulseDB } from "./PulseDB-v24-Immortal-Evo+++.js";

// Memory keys
const LAST_LANE_KEY   = "pulse:v24:lastMotionLane";
const MOTION_LOGS_KEY = "pulse:v24:Motion_Engine_Logs";
const HEALTH_KEY      = "pulse:v24:Motion_Engine_Health";

// Default lane if none stored
const DEFAULT_LANE = "forward";

// Allowed lanes (future lanes can be added here)
const LANES = {
  forward: Forward,
  backward: Backward
};

// Health thresholds
const HEALTH_CONFIG = {
  minTicksForHealth: 8,
  maxErrorRate: 0.25,      // reserved
  maxOverloadPressure: 0.9 // artery.pressure threshold
};

// ---------------------------------------------------------------------------
// Orchestrator Factory — v24 IMMORTAL
// ---------------------------------------------------------------------------
export function createPulseCompass({ MemoryOrgan, trace = false, sessionId = null } = {}) {
  if (!MemoryOrgan) {
    throw new Error("[PulseCompass-v24] MemoryOrgan is required.");
  }

  const PulseDB = createPulseDB({ MemoryOrgan, trace, sessionId });

  PulseDB.ensureCollection(MOTION_LOGS_KEY);
  PulseDB.ensureCollection(HEALTH_KEY);

  // ------------------------------
  // Lane memory helpers
  // ------------------------------
  function readLastLane() {
    const lane = MemoryOrgan.read?.(LAST_LANE_KEY);
    if (LANES[lane]) return lane;
    return DEFAULT_LANE;
  }

  function writeLastLane(lane) {
    MemoryOrgan.write?.(LAST_LANE_KEY, lane);
  }

  // ------------------------------
  // Logging helpers
  // ------------------------------
  function appendLog(entry) {
    const envelope = {
      ...entry,
      sessionId: sessionId || null,
      schemaVersion: "v24",
      version: "24.0-Immortal-Evo+++"
    };
    PulseDB.append(MOTION_LOGS_KEY, envelope);
    if (trace && typeof console !== "undefined") {
      console.log("[PulseCompass-v24] Log appended:", envelope);
    }
  }

  function readLogs() {
    return PulseDB.read(MOTION_LOGS_KEY);
  }

  // ------------------------------
  // Health helpers
  // ------------------------------
  function readHealth() {
    const health = PulseDB.read(HEALTH_KEY);
    return Array.isArray(health) ? health : [];
  }

  function writeHealthSnapshot(snapshot) {
    const envelope = {
      timestamp: Date.now(),
      sessionId: sessionId || null,
      snapshot,
      schemaVersion: "v24",
      version: "24.0-Immortal-Evo+++"
    };
    PulseDB.append(HEALTH_KEY, envelope);
    if (trace && typeof console !== "undefined") {
      console.log("[PulseCompass-v24] Health snapshot recorded:", envelope);
    }
  }

  function computeLaneStats() {
    const logs = readLogs().filter((e) => e.type === "tick");
    const stats = {};

    for (const log of logs) {
      const lane = log.lane;
      if (!stats[lane]) {
        stats[lane] = {
          ticks: 0,
          patterns: 0,
          lastTickId: null,
          lastPressure: null,
          lastLoad: null,
          lastBand: null,
          lastDnaTag: null
        };
      }
      stats[lane].ticks += 1;
      stats[lane].patterns += log.patterns || 0;
      stats[lane].lastTickId = log.tickId;
      if (log.artery) {
        stats[lane].lastPressure = log.artery.pressure ?? null;
        stats[lane].lastLoad = log.artery.load ?? null;
      }
      if (log.band) stats[lane].lastBand = log.band;
      if (log.dnaTag) stats[lane].lastDnaTag = log.dnaTag;
    }

    return stats;
  }

  function computeHealthScores() {
    const stats = computeLaneStats();
    const scores = {};

    for (const lane of Object.keys(LANES)) {
      const s = stats[lane] || { ticks: 0, lastPressure: 0, lastLoad: 0 };
      let score = 1.0;

      if (s.ticks < HEALTH_CONFIG.minTicksForHealth) {
        score *= 0.8;
      }

      if (typeof s.lastPressure === "number" &&
          s.lastPressure > HEALTH_CONFIG.maxOverloadPressure) {
        score *= 0.5;
      }

      if (typeof s.lastLoad === "number" && s.lastLoad > 0.9) {
        score *= 0.7;
      }

      scores[lane] = {
        lane,
        score,
        ticks: s.ticks,
        lastPressure: s.lastPressure,
        lastLoad: s.lastLoad,
        lastBand: s.lastBand || null,
        lastDnaTag: s.lastDnaTag || null
      };
    }

    writeHealthSnapshot(scores);
    return scores;
  }

  function pickBestHealthyLane() {
    const scores = computeHealthScores();
    let bestLane = DEFAULT_LANE;
    let bestScore = -1;

    for (const lane of Object.keys(scores)) {
      const s = scores[lane];
      if (s.score > bestScore) {
        bestScore = s.score;
        bestLane = lane;
      }
    }

    if (trace && typeof console !== "undefined") {
      console.log("[PulseCompass-v24] Best healthy lane:", bestLane, scores);
    }
    return bestLane;
  }

  // ------------------------------
  // Determine active lane
  // ------------------------------
  let activeLane = readLastLane();
  let Lane = LANES[activeLane];

  if (!Lane) {
    activeLane = DEFAULT_LANE;
    Lane = LANES[activeLane];
  }

  if (trace && typeof console !== "undefined") {
    console.log("[PulseCompass-v24] Initial active lane:", activeLane);
  }

  // -------------------------------------------------------------------------
  // Prewarm EVERYTHING this orchestrator depends on
  // -------------------------------------------------------------------------
  async function prewarm() {
    try {
      PulseDB.ensureCollection(MOTION_LOGS_KEY);
      PulseDB.ensureCollection(HEALTH_KEY);

      if (typeof Forward.prewarm === "function") await Forward.prewarm();
      if (typeof Backward.prewarm === "function") await Backward.prewarm();

      appendLog({
        type: "prewarm",
        timestamp: Date.now(),
        lanes: Object.keys(LANES)
      });

      if (trace && typeof console !== "undefined") {
        console.log("[PulseCompass-v24] Prewarm complete.");
      }
      return true;
    } catch (err) {
      if (typeof console !== "undefined") {
        console.warn("[PulseCompass-v24] Prewarm failed:", err);
      }
      return false;
    }
  }

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

    if (res?.metrics) {
      appendLog({
        type: "tick",
        timestamp: Date.now(),
        lane: activeLane,
        tickId: res.metrics.tickId,
        jobId: res.metrics.jobId,
        patterns: res.metrics.patternsCount,
        band: res.metrics.band,
        dnaTag: res.metrics.dnaTag,
        artery: res.metrics.artery
      });
    }

    const scores = computeHealthScores();
    const current = scores[activeLane];
    if (current && current.lastPressure != null &&
        current.lastPressure > HEALTH_CONFIG.maxOverloadPressure) {
      const best = pickBestHealthyLane();
      if (best !== activeLane) {
        switchLane(best);
      }
    }

    return res;
  }

  // -------------------------------------------------------------------------
  // Lane switching API
  // -------------------------------------------------------------------------
  function switchLane(lane) {
    if (!LANES[lane]) {
      if (typeof console !== "undefined") {
        console.warn("[PulseCompass-v24] Unknown lane:", lane);
      }
      return false;
    }

    activeLane = lane;
    Lane = LANES[lane];
    writeLastLane(lane);

    appendLog({
      type: "lane_switch",
      timestamp: Date.now(),
      lane
    });

    if (trace && typeof console !== "undefined") {
      console.log("[PulseCompass-v24] Switched to lane:", lane);
    }
    return true;
  }

  // -------------------------------------------------------------------------
  // Public API
  // -------------------------------------------------------------------------
  return Object.freeze({
    submit,
    tick,
    prewarm,
    switchLane,
    get activeLane() {
      return activeLane;
    },
    get logs() {
      return readLogs();
    },
    getHealthSnapshots() {
      return readHealth();
    },
    getLaneStats() {
      return computeLaneStats();
    },
    getHealthScores() {
      return computeHealthScores();
    }
  });
}
