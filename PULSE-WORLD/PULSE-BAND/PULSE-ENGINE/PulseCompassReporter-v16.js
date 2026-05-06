// ============================================================================
// PulseCompassReporter-v16.js — IMMORTAL Motion Telemetry Organ
//  • Records motion activity into PulseDB
//  • Lane switches, ticks, metrics, artery snapshots
//  • Append-only, drift-proof, zero compute
// ============================================================================

/*
AI_EXPERIENCE_META = {
  identity: "PulseCompassReporter",
  version: "v16-IMMORTAL",
  layer: "motion_telemetry",
  role: "motion_analytics",
  lineage: "PulseCompass-v16 → PulseCompassReporter-v16",

  evo: {
    reportingAware: true,
    analyticsAware: true,
    driftProof: true,
    zeroMutation: true,
    zeroCompute: true,
    pureTelemetry: true
  },

  contract: {
    always: ["PulseCompass", "PulseDB"],
    never: ["PulseMotionEngine", "ShifterPulse", "routerCore"]
  }
}
*/

/*
PAGE_INDEX = {
  purpose: "Record and analyze motion engine activity",
  responsibilities: [
    "Record ticks",
    "Record lane switches",
    "Record artery snapshots",
    "Provide analytics summaries"
  ],
  forbidden: [
    "No compute logic",
    "No engine logic",
    "No mutation of engine internals"
  ]
}
*/

export function createPulseCompassReporter({
  Compass,
  PulseDB,
  trace = false
} = {}) {
  if (!Compass) throw new Error("[PulseCompassReporter] Compass required.");
  if (!PulseDB) throw new Error("[PulseCompassReporter] PulseDB required.");

  const COLLECTION = "Motion_Engine_Logs";

  PulseDB.ensureCollection(COLLECTION);

  // -------------------------------------------------------------------------
  // Record a tick
  // -------------------------------------------------------------------------
  function recordTick(result) {
    if (!result?.metrics) return;

    const entry = {
      type: "tick",
      timestamp: Date.now(),
      lane: Compass.activeLane,
      tickId: result.metrics.tickId,
      jobId: result.metrics.jobId,
      patterns: result.metrics.patternsCount,
      band: result.metrics.band,
      dnaTag: result.metrics.dnaTag,
      artery: result.metrics.artery
    };

    PulseDB.append(COLLECTION, entry);

    if (trace) console.log("[Reporter] Tick recorded:", entry);
  }

  // -------------------------------------------------------------------------
  // Record lane switch
  // -------------------------------------------------------------------------
  function recordLaneSwitch(lane) {
    const entry = {
      type: "lane_switch",
      timestamp: Date.now(),
      lane
    };

    PulseDB.append(COLLECTION, entry);

    if (trace) console.log("[Reporter] Lane switch recorded:", entry);
  }

  // -------------------------------------------------------------------------
  // Analytics helpers
  // -------------------------------------------------------------------------
  function getAll() {
    return PulseDB.read(COLLECTION);
  }

  function getTicks() {
    return getAll().filter((e) => e.type === "tick");
  }

  function getLaneSwitches() {
    return getAll().filter((e) => e.type === "lane_switch");
  }

  function getLaneStats() {
    const ticks = getTicks();
    const stats = {};

    for (const t of ticks) {
      stats[t.lane] = stats[t.lane] || { ticks: 0, patterns: 0 };
      stats[t.lane].ticks += 1;
      stats[t.lane].patterns += t.patterns;
    }

    return stats;
  }

  return Object.freeze({
    recordTick,
    recordLaneSwitch,
    getAll,
    getTicks,
    getLaneSwitches,
    getLaneStats
  });
}
