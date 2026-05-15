// ============================================================================
// PulseCompass-v30-Immortal-Evo++++ — Motion Orchestrator & Telemetry Core
//  • Dynamic lane selection (forward/backward/…)
//  • Last-lane memory + health/advantage-aware auto-fallback
//  • Full motion telemetry → Motion_Engine_Logs (via PulseDB-v30)
//  • Prewarms all dependent lanes + DB
//  • Zero compute logic — pure routing + reporting
//  • Cosmos-aware, presence/advantage-aware, dual-band, artery-aware
//  • Future lanes can be added without touching MotionEngine core
// ============================================================================
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝

// ============================================================================
// GLOBAL HANDLE (membrane-safe)
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

// ============================================================================
// Lane wrappers (v30-capable faces around MotionEngine)
//   NOTE: these are your Forward/Backward motion pages that call createPulseMotionEngine
// ============================================================================
import * as Forward from "./PulseEngineForwardMotion-v24.js";
import * as Backward from "./PulseEngineBackwardMotion-v24.js";

// DB adapter (v30)
import { createPulseDB } from "./PulseEngineWorkFlow-v30.js";

// ============================================================================
// Memory keys (v30 namespace)
// ============================================================================
const LAST_LANE_KEY    = "pulse:v30:lastMotionLane";
const MOTION_LOGS_KEY  = "pulse:v30:Motion_Engine_Logs";
const HEALTH_KEY       = "pulse:v30:Motion_Engine_Health";
const COMPASS_STATE_KEY = "pulse:v30:Motion_Compass_State";

// Default lane if none stored
const DEFAULT_LANE = "forward";

// Allowed lanes (future lanes can be added here)
const LANES = {
  forward: Forward,
  backward: Backward
};

// Health thresholds (v30 tuned)
const HEALTH_CONFIG = {
  minTicksForHealth: 8,
  maxErrorRate: 0.25,        // reserved for future error tracking
  maxOverloadPressure: 0.9,  // artery.pressure threshold
  minAdvantageScore: 0.1     // if advantage collapses, lane is considered weak
};

// ---------------------------------------------------------------------------
// Orchestrator Factory — v30 IMMORTAL
// ---------------------------------------------------------------------------
export function createPulseCompass({
  MemoryOrgan,
  trace = false,
  sessionId = null,
  cosmosContext = {
    universeId: "u:default",
    timelineId: "t:main",
    branchId: "b:root",
    shardId: "s:primary"
  },
  presenceContext = {},
  advantageContext = {}
} = {}) {
  if (!MemoryOrgan) {
    throw new Error("[PulseCompass-v30] MemoryOrgan is required.");
  }

  const PulseDB = createPulseDB({ MemoryOrgan, trace, sessionId });

  // Ensure collections exist
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
  // Compass state helpers
  // ------------------------------
  function readCompassState() {
    const state = MemoryOrgan.read?.(COMPASS_STATE_KEY);
    if (!state || typeof state !== "object") {
      return {
        lastLane: DEFAULT_LANE,
        lastTickAt: null,
        lastAdvantage: 0,
        cosmos: cosmosContext
      };
    }
    return state;
  }

  function writeCompassState(partial) {
    const current = readCompassState();
    const next = {
      ...current,
      ...partial
    };
    MemoryOrgan.write?.(COMPASS_STATE_KEY, next);
    return next;
  }

  // ------------------------------
  // Logging helpers
  // ------------------------------
  function appendLog(entry) {
    const envelope = {
      ...entry,
      sessionId: sessionId || null,
      cosmos: cosmosContext,
      presenceContext,
      advantageContext,
      schemaVersion: "v30",
      version: "30.0-Immortal-Evo++++"
    };
    PulseDB.append(MOTION_LOGS_KEY, envelope);
    if (trace && typeof console !== "undefined") {
      console.log("[PulseCompass-v30] Log appended:", envelope);
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
      cosmos: cosmosContext,
      snapshot,
      schemaVersion: "v30",
      version: "30.0-Immortal-Evo++++"
    };
    PulseDB.append(HEALTH_KEY, envelope);
    if (trace && typeof console !== "undefined") {
      console.log("[PulseCompass-v30] Health snapshot recorded:", envelope);
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
          lastDnaTag: null,
          lastAdvantageScore: null,
          lastJobType: null,
          lastIntent: null
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
      if (typeof log.advantageScore === "number") {
        stats[lane].lastAdvantageScore = log.advantageScore;
      }
      if (log.jobType) stats[lane].lastJobType = log.jobType;
      if (log.intent) stats[lane].lastIntent = log.intent;
    }

    return stats;
  }

  function computeHealthScores() {
    const stats = computeLaneStats();
    const scores = {};

    for (const lane of Object.keys(LANES)) {
      const s = stats[lane] || {
        ticks: 0,
        lastPressure: 0,
        lastLoad: 0,
        lastAdvantageScore: 0
      };
      let score = 1.0;

      // Not enough ticks → lower confidence
      if (s.ticks < HEALTH_CONFIG.minTicksForHealth) {
        score *= 0.8;
      }

      // Overload pressure → penalize
      if (typeof s.lastPressure === "number" &&
          s.lastPressure > HEALTH_CONFIG.maxOverloadPressure) {
        score *= 0.5;
      }

      // Saturated load → penalize
      if (typeof s.lastLoad === "number" && s.lastLoad > 0.9) {
        score *= 0.7;
      }

      // Advantage collapsed → penalize
      if (typeof s.lastAdvantageScore === "number" &&
          s.lastAdvantageScore < HEALTH_CONFIG.minAdvantageScore) {
        score *= 0.6;
      }

      scores[lane] = {
        lane,
        score,
        ticks: s.ticks,
        lastPressure: s.lastPressure,
        lastLoad: s.lastLoad,
        lastBand: s.lastBand || null,
        lastDnaTag: s.lastDnaTag || null,
        lastAdvantageScore: s.lastAdvantageScore ?? null,
        lastJobType: s.lastJobType || null,
        lastIntent: s.lastIntent || null
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
      console.log("[PulseCompass-v30] Best healthy lane:", bestLane, scores);
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
    console.log("[PulseCompass-v30] Initial active lane:", activeLane);
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

      writeCompassState({
        lastLane: activeLane,
        lastTickAt: Date.now()
      });

      if (trace && typeof console !== "undefined") {
        console.log("[PulseCompass-v30] Prewarm complete.");
      }
      return true;
    } catch (err) {
      if (typeof console !== "undefined") {
        console.warn("[PulseCompass-v30] Prewarm failed:", err);
      }
      return false;
    }
  }

  // -------------------------------------------------------------------------
  // Routing wrappers
  // -------------------------------------------------------------------------
  function submit(job) {
    // Compass is lane-agnostic: it just forwards to current lane
    Lane.submit(job);
    writeLastLane(activeLane);

    appendLog({
      type: "submit",
      timestamp: Date.now(),
      lane: activeLane,
      jobType: job?.type || null,
      intent: job?.intent || job?.payload?.intent || null
    });
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
        artery: res.metrics.artery,
        advantageScore: res.metrics.advantageScore ?? null,
        jobType: res.metrics.jobType || null,
        intent: res.metrics.intent || null,
        cosmos: res.metrics.cosmos || cosmosContext
      });

      writeCompassState({
        lastLane: activeLane,
        lastTickAt: Date.now(),
        lastAdvantage: res.metrics.advantageScore ?? 0
      });
    }

    // Health-aware lane switching
    const scores = computeHealthScores();
    const current = scores[activeLane];

    if (current &&
        current.lastPressure != null &&
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
        console.warn("[PulseCompass-v30] Unknown lane:", lane);
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

    writeCompassState({
      lastLane: lane,
      lastTickAt: Date.now()
    });

    if (trace && typeof console !== "undefined") {
      console.log("[PulseCompass-v30] Switched to lane:", lane);
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
    },
    getCompassState() {
      return readCompassState();
    }
  });
}
