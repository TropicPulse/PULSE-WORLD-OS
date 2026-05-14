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
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝

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
// Lane wrappers (v24)
import * as Forward from "./PulseEngineForwardMotion-v24.js";
import * as Backward from "./PulseEngineBackwardMotion-v24.js";

// DB adapter (v24)
import { createPulseDB } from "./PulseEngineDB-v24.js";

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
