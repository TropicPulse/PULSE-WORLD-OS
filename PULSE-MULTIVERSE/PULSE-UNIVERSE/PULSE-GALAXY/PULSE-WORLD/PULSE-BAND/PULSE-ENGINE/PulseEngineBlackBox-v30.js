// ============================================================================
// PulseCompassReporter-v30-Immortal++++ — IMMORTAL Motion & GPU Telemetry Organ
//  • Records motion + GPU worker activity into PulseDB-v30
//  • Lane switches, ticks, metrics, artery snapshots, envelopes, health
//  • GPU hints, GPU ticks, GPU layouts (gpuIds, gpuMode)
//  • Cosmos-aware, band-aware, advantage-aware, artery-aware
//  • Append-only, drift-proof, zero compute, zero mutation
//  • Session-aware, evidence-aware, diagnostics-aware, dual-band
// ============================================================================
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝ ╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝

export function createPulseCompassReporter({
  Compass,              // PulseCompass-v30++++ instance
  PulseDB,              // PulseDB-v30++++ instance
  sessionId = null,
  trace = false,
  cosmosContext = {
    universeId: "u:default",
    timelineId: "t:main",
    branchId: "b:root",
    shardId: "s:primary"
  },
  presenceContext = {},
  advantageContext = {}
} = {}) {
  if (!Compass) throw new Error("[PulseCompassReporter-v30] Compass required.");
  if (!PulseDB) throw new Error("[PulseCompassReporter-v30] PulseDB required.");

  // Core motion logs (shared with Compass)
  const MOTION_COLLECTION = "pulse:v30:Motion_Engine_Logs";

  // GPU worker logs
  const GPU_COLLECTION = "pulse:v30:GPU_Worker_Logs";

  // Engine snapshots (MotionEngine snapshot(), Compass state, health)
  const SNAPSHOT_COLLECTION = "pulse:v30:Motion_Engine_Snapshots";

  PulseDB.ensureCollection(MOTION_COLLECTION);
  PulseDB.ensureCollection(GPU_COLLECTION);
  PulseDB.ensureCollection(SNAPSHOT_COLLECTION);

  // -------------------------------------------------------------------------
  // INTERNAL: envelope builder (pure, deterministic, v30 schema)
  // -------------------------------------------------------------------------
  function buildEnvelope(entry) {
    return {
      ...entry,
      sessionId: sessionId || null,
      cosmos: cosmosContext,
      presence: presenceContext,
      advantage: advantageContext,
      schemaVersion: "v30",
      version: "30.0-Immortal++++",
      timestamp: Date.now()
    };
  }

  // -------------------------------------------------------------------------
  // MOTION: Record a tick (metrics + artery + band + dnaTag + advantage + cosmos)
  // -------------------------------------------------------------------------
  async function recordTick(result) {
    if (!result?.metrics) return;

    const m = result.metrics;

    const entry = buildEnvelope({
      type: "tick",
      lane: Compass.activeLane,
      tickId: m.tickId,
      jobId: m.jobId,
      patterns: m.patternsCount,
      band: m.band,
      dnaTag: m.dnaTag,
      artery: m.artery,
      advantageScore: m.advantageScore ?? null,
      jobType: m.jobType || null,
      intent: m.intent || null,
      cosmos: m.cosmos || cosmosContext,
      triHeartId: m.triHeartId || null,
      presenceField: m.presenceField || null,
      advantageField: m.advantageField || null,
      envelope: result.envelope || null
    });

    await PulseDB.append(MOTION_COLLECTION, entry);

    if (trace && typeof console !== "undefined") {
      console.log("[Reporter-v30] Tick recorded:", entry);
    }
  }

  // -------------------------------------------------------------------------
  // MOTION: Record lane switch
  // -------------------------------------------------------------------------
  async function recordLaneSwitch(lane) {
    const entry = buildEnvelope({
      type: "lane_switch",
      lane
    });

    await PulseDB.append(MOTION_COLLECTION, entry);

    if (trace && typeof console !== "undefined") {
      console.log("[Reporter-v30] Lane switch recorded:", entry);
    }
  }

  // -------------------------------------------------------------------------
  // MOTION: Record artery snapshot (optional, lane-local)
  // -------------------------------------------------------------------------
  async function recordArterySnapshot(artery) {
    const entry = buildEnvelope({
      type: "artery_snapshot",
      lane: Compass.activeLane,
      artery
    });

    await PulseDB.append(MOTION_COLLECTION, entry);

    if (trace && typeof console !== "undefined") {
      console.log("[Reporter-v30] Artery snapshot recorded:", entry);
    }
  }

  // -------------------------------------------------------------------------
  // MOTION: Record full envelope from Compass or Engine
  // -------------------------------------------------------------------------
  async function recordEnvelope(envelope) {
    const entry = buildEnvelope({
      type: "envelope",
      lane: Compass.activeLane,
      envelope
    });

    await PulseDB.append(MOTION_COLLECTION, entry);

    if (trace && typeof console !== "undefined") {
      console.log("[Reporter-v30] Envelope recorded:", entry);
    }
  }

  // -------------------------------------------------------------------------
  // GPU: Record GPU worker hint (from PulseGPUProcessWorker.submit/plan)
  // -------------------------------------------------------------------------
  async function recordGPUHint({ job, hint }) {
    if (!hint) return;

    const entry = buildEnvelope({
      type: "gpu_hint",
      lane: job?.lane || null,
      jobId: job?.jobId || job?.id || null,
      jobType: job?.jobType || job?.type || null,
      band: job?.band || "symbolic",
      intent: job?.intent || null,
      dnaTag: job?.dnaTag || null,
      cosmos: job?.cosmos || cosmosContext,
      gpu: hint.gpu || null,
      advantageScore: hint.advantageScore ?? null,
      advantageBoost: hint.advantageBoost ?? null,
      suggestions: hint.suggestions || []
    });

    await PulseDB.append(GPU_COLLECTION, entry);

    if (trace && typeof console !== "undefined") {
      console.log("[Reporter-v30] GPU hint recorded:", entry);
    }
  }

  // -------------------------------------------------------------------------
  // GPU: Record GPU worker tick (engineBlock.tick())
  // -------------------------------------------------------------------------
  async function recordGPUTick(tickResult) {
    if (!tickResult) return;

    const entry = buildEnvelope({
      type: "gpu_tick",
      ticks: tickResult.ticks ?? null,
      gpuMode: tickResult.gpuMode || null,
      gpuIds: tickResult.gpuIds || null
    });

    await PulseDB.append(GPU_COLLECTION, entry);

    if (trace && typeof console !== "undefined") {
      console.log("[Reporter-v30] GPU tick recorded:", entry);
    }
  }

  // -------------------------------------------------------------------------
  // SNAPSHOTS: MotionEngine snapshot + Compass state + health scores
  // -------------------------------------------------------------------------
  async function recordEngineSnapshot({ engineSnapshot, healthScores, compassState }) {
    const entry = buildEnvelope({
      type: "engine_snapshot",
      engineSnapshot: engineSnapshot || null,
      healthScores: healthScores || null,
      compassState: compassState || null
    });

    await PulseDB.append(SNAPSHOT_COLLECTION, entry);

    if (trace && typeof console !== "undefined") {
      console.log("[Reporter-v30] Engine snapshot recorded:", entry);
    }
  }

  // Convenience: pull from Compass directly (if methods exist)
  async function recordFullStateSnapshot({ engineSnapshot } = {}) {
    const healthScores =
      typeof Compass.getHealthScores === "function"
        ? Compass.getHealthScores()
        : null;

    const compassState =
      typeof Compass.getCompassState === "function"
        ? Compass.getCompassState()
        : null;

    await recordEngineSnapshot({
      engineSnapshot: engineSnapshot || null,
      healthScores,
      compassState
    });
  }

  // -------------------------------------------------------------------------
  // Analytics helpers (pure, zero compute beyond filtering)
  // -------------------------------------------------------------------------
  async function getAllMotionLogs() {
    return await PulseDB.read(MOTION_COLLECTION);
  }

  async function getTicks() {
    const all = await getAllMotionLogs();
    return all.filter((e) => e.type === "tick");
  }

  async function getLaneSwitches() {
    const all = await getAllMotionLogs();
    return all.filter((e) => e.type === "lane_switch");
  }

  async function getArterySnapshots() {
    const all = await getAllMotionLogs();
    return all.filter((e) => e.type === "artery_snapshot");
  }

  async function getEnvelopes() {
    const all = await getAllMotionLogs();
    return all.filter((e) => e.type === "envelope");
  }

  async function getLaneStats() {
    const ticks = await getTicks();
    const stats = {};

    for (const t of ticks) {
      stats[t.lane] = stats[t.lane] || {
        ticks: 0,
        patterns: 0,
        lastTickId: null,
        lastBand: null,
        lastDnaTag: null,
        lastAdvantageScore: null
      };
      stats[t.lane].ticks += 1;
      stats[t.lane].patterns += t.patterns || 0;
      stats[t.lane].lastTickId = t.tickId;
      if (t.band) stats[t.lane].lastBand = t.band;
      if (t.dnaTag) stats[t.lane].lastDnaTag = t.dnaTag;
      if (typeof t.advantageScore === "number") {
        stats[t.lane].lastAdvantageScore = t.advantageScore;
      }
    }

    return stats;
  }

  // GPU analytics
  async function getAllGPULogs() {
    return await PulseDB.read(GPU_COLLECTION);
  }

  async function getGPUHints() {
    const all = await getAllGPULogs();
    return all.filter((e) => e.type === "gpu_hint");
  }

  async function getGPUTicks() {
    const all = await getAllGPULogs();
    return all.filter((e) => e.type === "gpu_tick");
  }

  // Snapshot analytics
  async function getAllSnapshots() {
    return await PulseDB.read(SNAPSHOT_COLLECTION);
  }

  async function getEngineSnapshots() {
    const all = await getAllSnapshots();
    return all.filter((e) => e.type === "engine_snapshot");
  }

  // -------------------------------------------------------------------------
  // Public API
  // -------------------------------------------------------------------------
  return Object.freeze({
    // Motion
    recordTick,
    recordLaneSwitch,
    recordArterySnapshot,
    recordEnvelope,

    getAllMotionLogs,
    getTicks,
    getLaneSwitches,
    getArterySnapshots,
    getEnvelopes,
    getLaneStats,

    // GPU worker
    recordGPUHint,
    recordGPUTick,
    getAllGPULogs,
    getGPUHints,
    getGPUTicks,

    // Snapshots
    recordEngineSnapshot,
    recordFullStateSnapshot,
    getAllSnapshots,
    getEngineSnapshots
  });
}
