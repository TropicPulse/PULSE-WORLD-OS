// ============================================================================
// PulseCompass-v30-Immortal-Evo++++-ProcessWorker+++
//  • Motion Orchestrator & Telemetry Core (Forward + Backward + GPU/Earn worker)
//  • Dynamic lane selection (forward/backward/auto) with last-lane memory
//  • Health/advantage-aware auto-fallback + overload protection
//  • Full motion telemetry → Motion_Engine_Logs (via PulseDB-v30)
//  • Prewarms DB, motion lanes, and GPU/Earn process worker
//  • Cosmos-aware, presence/advantage-aware, dual-band, artery-aware
//  • Zero compute logic — pure routing + reporting + worker handoff
// ============================================================================

const G =
  (typeof window !== "undefined" && window) ||
  (typeof globalThis !== "undefined" && globalThis) ||
  (typeof self !== "undefined" && self) ||
  (typeof global !== "undefined" && global) ||
  {};
const g = G;

const Timestamp =
  (G.firebaseAdmin &&
    G.firebaseAdmin.firestore &&
    G.firebaseAdmin.firestore.Timestamp) ||
  (G.Timestamp && G.Timestamp) ||
  null;

const admin =
  (G.firebaseAdmin && G.firebaseAdmin) ||
  (G.admin && G.admin) ||
  null;

const db =
  (G.db && G.db) ||
  (admin && admin.firestore && admin.firestore()) ||
  null;

const dblog =
  (G.log && G.log) ||
  console.log;

const dberror =
  (G.error && G.error) ||
  console.error;

const fetchFn =
  (G.fetchfn && typeof G.fetchfn === "function" && G.fetchfn) ||
  (G.fetch && typeof G.fetch === "function" && G.fetch) ||
  null;

const presenceContext =
  (typeof window !== "undefined" && window.PULSE_PRESENCE) ||
  g.PULSE_PRESENCE ||
  {};

const advantageContext =
  (typeof window !== "undefined" && window.PULSE_ADVANTAGE) ||
  g.PULSE_ADVANTAGE ||
  {};

const cosmosContextDefault =
  (typeof window !== "undefined" && window.PULSE_COSMOS) ||
  g.PULSE_COSMOS ||
  {
    universeId: "u:default",
    timelineId: "t:main",
    branchId: "b:root",
    shardId: "s:primary"
  };

// Motion lanes (v30 wrappers)
import * as Forward from "./PulseEngineForwardMotion-v30.js";
import * as Backward from "./PulseEngineBackwardMotion-v30.js";

// DB substrate (v30++)
import { createPulseDB } from "./PulseDB-v30-Immortal++++.js";

// GPU/Earn process worker (v30)
import { PulseGPUProcessWorker } from "./PulseGPUProcessWorker-v30.js";

// ============================================================================
// Memory keys (v30 namespace)
// ============================================================================
const LAST_LANE_KEY      = "pulse:v30:lastMotionLane";
const MOTION_LOGS_KEY    = "pulse:v30:Motion_Engine_Logs";
const HEALTH_KEY         = "pulse:v30:Motion_Engine_Health";
const COMPASS_STATE_KEY  = "pulse:v30:Motion_Compass_State";

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
  maxErrorRate: 0.25,
  maxOverloadPressure: 0.9,
  minAdvantageScore: 0.1
};

// ============================================================================
// Factory — PulseCompass v30++
// ============================================================================
export function createPulseCompass({
  MemoryOrgan,
  trace = false,
  sessionId = null,
  cosmosContext = cosmosContextDefault,
  presenceContext: presenceCtxOverride = presenceContext,
  advantageContext: advantageCtxOverride = advantageContext,
  gpuProcessWorker = null   // optional external worker; default created if null
} = {}) {
  if (!MemoryOrgan) {
    throw new Error("[PulseCompass-v30] MemoryOrgan is required.");
  }

  const presenceCtx = presenceCtxOverride || presenceContext;
  const advantageCtx = advantageCtxOverride || advantageContext;

  // DB substrate
  const PulseDB = createPulseDB({
    MemoryOrgan,
    trace,
    sessionId,
    cosmosContext,
    presenceContext: presenceCtx,
    advantageContext: advantageCtx
  });

  // Ensure collections exist
  PulseDB.ensureCollection(MOTION_LOGS_KEY);
  PulseDB.ensureCollection(HEALTH_KEY);

  // GPU/Earn process worker (compressed process worker)
  const worker =
    gpuProcessWorker ||
    new PulseGPUProcessWorker({
      db,
      Timestamp,
      fetchFn,
      presenceContext: presenceCtx,
      advantageContext: advantageCtx,
      cosmosContext,
      lane: "dual",
      instanceId: "gpu-process-worker-v30",
      allowEarnLane: true,
      allowGpuLane: true
    });

  // -------------------------------------------------------------------------
  // Lane memory helpers
  // -------------------------------------------------------------------------
  function readLastLane() {
    const lane = MemoryOrgan.read?.(LAST_LANE_KEY);
    if (LANES[lane]) return lane;
    return DEFAULT_LANE;
  }

  function writeLastLane(lane) {
    MemoryOrgan.write?.(LAST_LANE_KEY, lane);
  }

  // -------------------------------------------------------------------------
  // Compass state helpers
  // -------------------------------------------------------------------------
  function readCompassState() {
    const state = MemoryOrgan.read?.(COMPASS_STATE_KEY);
    if (!state || typeof state !== "object") {
      return {
        lastLane: DEFAULT_LANE,
        lastTickAt: null,
        lastAdvantage: 0,
        lastPressure: 0,
        lastJobType: null,
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

  // -------------------------------------------------------------------------
  // Logging helpers
  // -------------------------------------------------------------------------
  async function appendLog(entry) {
    const envelope = {
      ...entry,
      sessionId: sessionId || null,
      cosmos: cosmosContext,
      presenceContext: presenceCtx,
      advantageContext: advantageCtx,
      schemaVersion: "v30",
      version: "30.0-Immortal-Evo++++"
    };
    await PulseDB.append(MOTION_LOGS_KEY, envelope);
    if (trace && typeof console !== "undefined") {
      console.log("[PulseCompass-v30] Log appended:", envelope);
    }
  }

  async function readLogs() {
    return PulseDB.read(MOTION_LOGS_KEY);
  }

  // -------------------------------------------------------------------------
  // Health helpers
  // -------------------------------------------------------------------------
  async function readHealth() {
    const health = await PulseDB.read(HEALTH_KEY);
    return Array.isArray(health) ? health : [];
  }

  async function writeHealthSnapshot(snapshot) {
    const envelope = {
      timestamp: Date.now(),
      sessionId: sessionId || null,
      cosmos: cosmosContext,
      snapshot,
      schemaVersion: "v30",
      version: "30.0-Immortal-Evo++++"
    };
    await PulseDB.append(HEALTH_KEY, envelope);
    if (trace && typeof console !== "undefined") {
      console.log("[PulseCompass-v30] Health snapshot recorded:", envelope);
    }
  }

  async function computeLaneStats() {
    const logs = (await readLogs()).filter((e) => e.type === "tick");
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
      stats[lane].lastPressure = log.pressure || null;
      stats[lane].lastLoad = log.load || null;
      stats[lane].lastBand = log.band || null;
      stats[lane].lastDnaTag = log.dnaTag || null;
      stats[lane].lastAdvantageScore = log.advantageScore ?? null;
      stats[lane].lastJobType = log.jobType || null;
      stats[lane].lastIntent = log.intent || null;
    }

    return stats;
  }

  async function computeHealth() {
    const stats = await computeLaneStats();
    const health = {
      ts: Date.now(),
      lanes: {},
      config: HEALTH_CONFIG
    };

    for (const lane of Object.keys(LANES)) {
      const s = stats[lane] || {
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

      const ticks = s.ticks;
      const advantage = s.lastAdvantageScore ?? 0;
      const pressure = s.lastPressure?.gpuLoadPressure ?? 0;

      const healthy =
        ticks >= HEALTH_CONFIG.minTicksForHealth &&
        advantage >= HEALTH_CONFIG.minAdvantageScore &&
        pressure <= HEALTH_CONFIG.maxOverloadPressure;

      health.lanes[lane] = {
        ticks,
        patterns: s.patterns,
        lastTickId: s.lastTickId,
        lastPressure: s.lastPressure,
        lastLoad: s.lastLoad,
        lastBand: s.lastBand,
        lastDnaTag: s.lastDnaTag,
        lastAdvantageScore: s.lastAdvantageScore,
        lastJobType: s.lastJobType,
        lastIntent: s.lastIntent,
        healthy
      };
    }

    await writeHealthSnapshot(health);
    return health;
  }

  // -------------------------------------------------------------------------
  // Lane selection (dynamic, health-aware, last-lane-aware)
//  • job.hints.lane can force lane; otherwise auto
  // -------------------------------------------------------------------------
  function chooseLane(job, healthSnapshot, compassState) {
    const hints = job?.hints || {};
    const forcedLane = hints.lane;
    if (forcedLane && LANES[forcedLane]) {
      return forcedLane;
    }

    const lastLane = compassState.lastLane || DEFAULT_LANE;
    const health = healthSnapshot?.lanes || {};
    const forwardHealthy = health.forward?.healthy !== false;
    const backwardHealthy = health.backward?.healthy !== false;

    const jobType = job?.type || "";
    const intent = job?.intent || "";

    if (jobType === "GPU_CACHE" || jobType === "BINARY_COMPUTE") {
      if (forwardHealthy) return "forward";
    }

    if (jobType === "EARN_TASK" && intent === "settlement") {
      if (backwardHealthy) return "backward";
    }

    if (forwardHealthy && !backwardHealthy) return "forward";
    if (!forwardHealthy && backwardHealthy) return "backward";

    return lastLane;
  }

  // -------------------------------------------------------------------------
  // Worker integration (GPU/Earn)
//  • Pre-process job → worker.hintJob / worker.routeJob
//  • Worker can attach gpuHints / earnHints / chunkHints
  // -------------------------------------------------------------------------
  function enrichJobViaWorker(job) {
    if (!worker || typeof worker.hintJob !== "function") return job;

    try {
      const hinted = worker.hintJob(job, {
        cosmosContext,
        presenceContext: presenceCtx,
        advantageContext: advantageCtx
      });
      return hinted || job;
    } catch (err) {
      if (trace) {
        console.error("[PulseCompass-v30] worker.hintJob failed:", err);
      }
      return job;
    }
  }

  // -------------------------------------------------------------------------
  // Public API — submit / tick / prewarm / snapshot / diagnostics
  // -------------------------------------------------------------------------
  async function submit(job = {}) {
    const compassState = readCompassState();
    const healthSnapshot = await computeHealth();

    const enrichedJob = enrichJobViaWorker(job);
    const lane = chooseLane(enrichedJob, healthSnapshot, compassState);
    const laneModule = LANES[lane];

    if (!laneModule || typeof laneModule.submit !== "function") {
      return { ok: false, reason: "LANE_UNAVAILABLE", lane };
    }

    const result = laneModule.submit(enrichedJob);

    writeLastLane(lane);
    writeCompassState({
      lastLane: lane,
      lastTickAt: Date.now(),
      lastJobType: enrichedJob.type || null
    });

    await appendLog({
      type: "submit",
      lane,
      jobType: enrichedJob.type || null,
      intent: enrichedJob.intent || null,
      result,
      tickId: null,
      pressure: enrichedJob.pressureSnapshot || null,
      band: enrichedJob.band || "dual",
      dnaTag: enrichedJob.dnaTag || null,
      advantageScore: enrichedJob.advantageScore ?? null
    });

    return { ok: true, lane, result };
  }

  async function tick() {
    const compassState = readCompassState();
    const healthSnapshot = await computeHealth();
    const lane = readLastLane();
    const laneModule = LANES[lane];

    if (!laneModule || typeof laneModule.tick !== "function") {
      return { ok: false, reason: "LANE_UNAVAILABLE", lane };
    }

    const result = laneModule.tick();
    const tickId = `${lane}:${Date.now()}`;

    writeCompassState({
      lastLane: lane,
      lastTickAt: Date.now()
    });

    await appendLog({
      type: "tick",
      lane,
      tickId,
      patterns: result?.patternsProcessed || 0,
      pressure: result?.pressureSnapshot || null,
      load: result?.loadSnapshot || null,
      band: result?.band || "dual",
      dnaTag: result?.dnaTag || null,
      advantageScore: result?.advantageScore ?? null,
      jobType: result?.lastJobType || null,
      intent: result?.lastIntent || null
    });

    return { ok: true, lane, result };
  }

  async function prewarm() {
    try {
      await PulseDB.append(MOTION_LOGS_KEY, {
        type: "prewarm",
        ts: Date.now(),
        sessionId,
        cosmos: cosmosContext
      });
    } catch (err) {
      if (trace) console.error("[PulseCompass-v30] DB prewarm append failed:", err);
    }

    for (const lane of Object.keys(LANES)) {
      const mod = LANES[lane];
      if (mod && typeof mod.prewarm === "function") {
        try {
          mod.prewarm();
        } catch (err) {
          if (trace) console.error("[PulseCompass-v30] Lane prewarm failed:", lane, err);
        }
      }
    }

    if (worker && typeof worker.prewarm === "function") {
      try {
        worker.prewarm();
      } catch (err) {
        if (trace) console.error("[PulseCompass-v30] Worker prewarm failed:", err);
      }
    }

    return { ok: true };
  }

  async function snapshot() {
    const healthSnapshot = await computeHealth();
    const dbSnapshot = PulseDB.snapshot?.() || null;
    const compassState = readCompassState();

    return {
      ts: Date.now(),
      meta: {
        identity: "PulseCompass-v30-Immortal-Evo++++-ProcessWorker+++",
        version: "30.0-Immortal-Evo++++",
        sessionId
      },
      cosmosContext,
      presenceContext: presenceCtx,
      advantageContext: advantageCtx,
      compassState,
      health: healthSnapshot,
      db: dbSnapshot
    };
  }

  async function diagnostics() {
    const healthSnapshot = await computeHealth();
    const logs = await readLogs();
    const metrics = PulseDB.getMetrics();

    return {
      ts: Date.now(),
      health: healthSnapshot,
      logsCount: logs.length,
      dbMetrics: metrics,
      lastCompassState: readCompassState()
    };
  }

  return Object.freeze({
    submit,
    tick,
    prewarm,
    snapshot,
    diagnostics,
    lanes: LANES,
    worker,
    db: PulseDB
  });
}
