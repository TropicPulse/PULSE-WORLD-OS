// ============================================================================
// PulseCompassReporter-v30-Immortal++++ — IMMORTAL Motion Telemetry Organ
//  • Records motion activity into PulseDB-v30
//  • Lane switches, ticks, metrics, artery snapshots, envelopes
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
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝

export function createPulseCompassReporter({
  Compass,
  PulseDB,
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

  const COLLECTION = "pulse:v30:Motion_Engine_Logs";

  PulseDB.ensureCollection(COLLECTION);

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
  // Record a tick (metrics + artery + band + dnaTag + advantage + cosmos)
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
      envelope: result.envelope || null
    });

    await PulseDB.append(COLLECTION, entry);

    if (trace && typeof console !== "undefined") {
      console.log("[Reporter-v30] Tick recorded:", entry);
    }
  }

  // -------------------------------------------------------------------------
  // Record lane switch
  // -------------------------------------------------------------------------
  async function recordLaneSwitch(lane) {
    const entry = buildEnvelope({
      type: "lane_switch",
      lane
    });

    await PulseDB.append(COLLECTION, entry);

    if (trace && typeof console !== "undefined") {
      console.log("[Reporter-v30] Lane switch recorded:", entry);
    }
  }

  // -------------------------------------------------------------------------
  // Record artery snapshot (optional, lane-local)
  // -------------------------------------------------------------------------
  async function recordArterySnapshot(artery) {
    const entry = buildEnvelope({
      type: "artery_snapshot",
      lane: Compass.activeLane,
      artery
    });

    await PulseDB.append(COLLECTION, entry);

    if (trace && typeof console !== "undefined") {
      console.log("[Reporter-v30] Artery snapshot recorded:", entry);
    }
  }

  // -------------------------------------------------------------------------
  // Record full envelope from Compass or Engine
  // -------------------------------------------------------------------------
  async function recordEnvelope(envelope) {
    const entry = buildEnvelope({
      type: "envelope",
      lane: Compass.activeLane,
      envelope
    });

    await PulseDB.append(COLLECTION, entry);

    if (trace && typeof console !== "undefined") {
      console.log("[Reporter-v30] Envelope recorded:", entry);
    }
  }

  // -------------------------------------------------------------------------
  // Analytics helpers (pure, zero compute beyond filtering)
  // -------------------------------------------------------------------------
  async function getAll() {
    return await PulseDB.read(COLLECTION);
  }

  async function getTicks() {
    const all = await getAll();
    return all.filter((e) => e.type === "tick");
  }

  async function getLaneSwitches() {
    const all = await getAll();
    return all.filter((e) => e.type === "lane_switch");
  }

  async function getArterySnapshots() {
    const all = await getAll();
    return all.filter((e) => e.type === "artery_snapshot");
  }

  async function getEnvelopes() {
    const all = await getAll();
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
