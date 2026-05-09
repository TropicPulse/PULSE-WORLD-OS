// ============================================================================
// PulseCompassReporter-v24-Immortal-Evo+++.js — IMMORTAL Motion Telemetry Organ
//  • Records motion activity into PulseDB-v24
//  • Lane switches, ticks, metrics, artery snapshots, envelopes
//  • Append-only, drift-proof, zero compute, zero mutation
//  • Session-aware, band-aware, evidence-aware, diagnostics-aware
// ============================================================================

/*
AI_EXPERIENCE_META = {
  identity: "PulseCompassReporter",
  version: "v24-Immortal-Evo+++",
  layer: "motion_telemetry",
  role: "motion_analytics",
  lineage: "PulseCompass-v16 → PulseCompassReporter-v16 → PulseCompassReporter-v24-Immortal-Evo+++",

  evo: {
    reportingAware: true,
    analyticsAware: true,
    driftProof: true,
    zeroMutation: true,
    zeroCompute: true,
    pureTelemetry: true,

    // v24++ upgrades
    dualBand: true,
    binaryAware: true,
    symbolicAware: true,
    pulseBandAware: true,
    sessionAware: true,
    diagnosticsAware: true,
    evidenceAware: true,
    arteryAware: true,
    advantageAware: true,
    presenceAware: true,
    trustFabricAware: true
  },

  contract: {
    always: ["PulseCompass", "PulseDB-v24"],
    never: ["PulseMotionEngine", "ShifterPulse", "routerCore", "meshKernel"]
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
    "Record envelopes",
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
  sessionId = null,
  trace = false
} = {}) {
  if (!Compass) throw new Error("[PulseCompassReporter-v24] Compass required.");
  if (!PulseDB) throw new Error("[PulseCompassReporter-v24] PulseDB required.");

  const COLLECTION = "pulse:v24:Motion_Engine_Logs";

  PulseDB.ensureCollection(COLLECTION);

  // -------------------------------------------------------------------------
  // INTERNAL: envelope builder (pure, deterministic)
  // -------------------------------------------------------------------------
  function buildEnvelope(entry) {
    return {
      ...entry,
      sessionId: sessionId || null,
      schemaVersion: "v24",
      version: "24.0-Immortal-Evo+++",
      timestamp: Date.now()
    };
  }

  // -------------------------------------------------------------------------
  // Record a tick (v24 metrics + artery + band + dnaTag + envelope)
  // -------------------------------------------------------------------------
  function recordTick(result) {
    if (!result?.metrics) return;

    const entry = buildEnvelope({
      type: "tick",
      lane: Compass.activeLane,
      tickId: result.metrics.tickId,
      jobId: result.metrics.jobId,
      patterns: result.metrics.patternsCount,
      band: result.metrics.band,
      dnaTag: result.metrics.dnaTag,
      artery: result.metrics.artery,
      envelope: result.envelope || null
    });

    PulseDB.append(COLLECTION, entry);

    if (trace && typeof console !== "undefined") {
      console.log("[Reporter-v24] Tick recorded:", entry);
    }
  }

  // -------------------------------------------------------------------------
  // Record lane switch (v24 envelope)
  // -------------------------------------------------------------------------
  function recordLaneSwitch(lane) {
    const entry = buildEnvelope({
      type: "lane_switch",
      lane
    });

    PulseDB.append(COLLECTION, entry);

    if (trace && typeof console !== "undefined") {
      console.log("[Reporter-v24] Lane switch recorded:", entry);
    }
  }

  // -------------------------------------------------------------------------
  // Record artery snapshot (optional)
  // -------------------------------------------------------------------------
  function recordArterySnapshot(artery) {
    const entry = buildEnvelope({
      type: "artery_snapshot",
      lane: Compass.activeLane,
      artery
    });

    PulseDB.append(COLLECTION, entry);

    if (trace && typeof console !== "undefined") {
      console.log("[Reporter-v24] Artery snapshot recorded:", entry);
    }
  }

  // -------------------------------------------------------------------------
  // Record full envelope from Compass (v24)
  // -------------------------------------------------------------------------
  function recordEnvelope(envelope) {
    const entry = buildEnvelope({
      type: "envelope",
      lane: Compass.activeLane,
      envelope
    });

    PulseDB.append(COLLECTION, entry);

    if (trace && typeof console !== "undefined") {
      console.log("[Reporter-v24] Envelope recorded:", entry);
    }
  }

  // -------------------------------------------------------------------------
  // Analytics helpers (pure, zero compute)
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

  function getArterySnapshots() {
    return getAll().filter((e) => e.type === "artery_snapshot");
  }

  function getEnvelopes() {
    return getAll().filter((e) => e.type === "envelope");
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

  // -------------------------------------------------------------------------
  // Public API
  // -------------------------------------------------------------------------
  return Object.freeze({
    recordTick,
    recordLaneSwitch,
    recordArterySnapshot,
    recordEnvelope,

    getAll,
    getTicks,
    getLaneSwitches,
    getArterySnapshots,
    getEnvelopes,
    getLaneStats
  });
}
