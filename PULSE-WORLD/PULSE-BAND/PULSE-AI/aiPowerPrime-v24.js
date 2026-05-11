// ============================================================================
//  aiPowerPrime.js — PULSE OS Power‑Prime Organ — v24‑IMMORTAL‑PRIME++
//  Crown-Layer Power Intelligence • Artery-Fused • Predictive • Drift-Aware
//  READ-ONLY • DUALBAND • DETERMINISTIC • IDENTITY-SAFE
// ============================================================================
//
//  CANONICAL ROLE:
//    • Power Intelligence Assistant (Not a Controller).
//    • Provides read-only power intelligence: risk, continuance, fluctuations,
//      outages, and drift for tourist and owner scopes.
//    • Fuses organism arteries (binary + symbolic) into a safe snapshot.
//    • Interprets internal power collections and BEL power information into
//      patterns, NOT into control actions.
//    • Requests external power info via PulseOS route() and reads routed text.
//    • Guides owners toward understanding risk and continuity, WITHOUT
//      modifying power systems or issuing control commands.
//
//  ROLE BOUNDARY (Declared Once):
//    • This organ is a Power Intelligence Assistant, not a power controller.
//    • It does not change power settings, send commands, or operate hardware.
//    • It does not replace grid operators, utilities, or engineers.
//    • It is meant to support you by organizing information, highlighting
//      risk patterns, and surfacing what may matter for decisions elsewhere.
//
//  HARD GUARANTEES:
//    • No power control, no “do X” directives, no hardware operations.
//    • No direct network primitives (no fetch/axios/etc inside this file).
//    • All external I/O (including BEL/external power queries) is mediated by
//      the caller’s route() / CNS.
//    • From this organ’s perspective: pure compute over provided data.
// ============================================================================

import { OrganismIdentity } from "../PULSE-X/PulseWorldOrganismMap-v24.js";

const Identity = OrganismIdentity(import.meta.url);

// ============================================================================
//  META BLOCK — v24.0 IMMORTAL (ORGANISM KERNEL)
//  (now backed by the Organism Map instead of hardcoded here)
// ============================================================================
export const PowerMeta = Identity.OrganMeta;

// ============================================================================
//  SURFACE / ORGANISM LAYER EXPORTS — v24.0 IMMORTAL
//  (for Understanding / CNS / Portal alignment)
// ============================================================================

// Required 3 for every “surface” in the organism graph
export const pulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;

// Optional: richer experience meta for AI / tooling
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;

// Optional: export meta for tooling / dev panels
export const EXPORT_META = Identity.EXPORT_META;

// ---------------------------------------------------------------------------
//  DEPENDENCIES
// ---------------------------------------------------------------------------

import { getOrganismSnapshot } from "./aiDeps-v24.js";
import {
  computePowerRiskVector,
  buildPowerRiskSummary,
  buildPowerBeaconSignals
} from "../PULSE-GRID/PulseGridRiskEngine-v24.js";
import {
  computeContinuanceMetricsV3,
  detectFluctuationsV3,
  detectOutagesV3
} from "../PULSE-GRID/PulseGridContinuanceEngine-v24.js";

// ---------------------------------------------------------------------------
//  IDENTITY‑SAFE HELPERS
// ---------------------------------------------------------------------------

function stripIdentity(record) {
  if (!record || typeof record !== "object") return record;
  const clone = { ...record };
  delete clone.uid;
  delete clone.userId;
  delete clone.resendToken;
  delete clone.identityRoot;
  delete clone.sessionRoot;
  delete clone.deviceFingerprint;
  return clone;
}

async function fetchOwner(context, db, collection, options = {}) {
  if (!context.userIsOwner) {
    context.logStep?.(`aiPowerPrime: owner-only "${collection}" blocked.`);
    return [];
  }
  context.logStep?.(`aiPowerPrime: fetching owner "${collection}"`);
  const rows = await db.getCollection(collection, options);
  return rows.map(stripIdentity);
}

async function fetchTourist(context, db, collection, options = {}) {
  context.logStep?.(`aiPowerPrime: fetching public "${collection}"`);
  const rows = await db.getCollection(collection, options);
  return rows.map(stripIdentity);
}

// ---------------------------------------------------------------------------
//  ARTERY FUSION — READ‑ONLY ORGANISM SNAPSHOT
// ---------------------------------------------------------------------------

function buildFusedArteries(organismSnapshot) {
  const o = organismSnapshot || {};

  const metabolic = o.binary?.metabolic || {};
  const nervous = o.binary?.nervous || {};
  const immune = o.binary?.immune || {};
  const hormones = o.binary?.hormones || {};
  const pipeline = o.binary?.pipeline || {};
  const scanner = o.binary?.scanner || {};
  const personalFrame = o.symbolic?.personalFrame || {};
  const personality = o.symbolic?.personality || {};
  const memory = o.symbolic?.memory || {};
  const evolution = o.symbolic?.evolution || {};

  return Object.freeze({
    metabolic,
    nervous,
    immune,
    hormones,
    pipeline,
    scanner,
    personalFrame,
    personality,
    memory,
    evolution
  });
}

// ---------------------------------------------------------------------------
//  HISTORY / CONTINUANCE DIAGNOSTIC HELPERS — v24++
// ---------------------------------------------------------------------------

function _safeNumber(v, fallback = 0) {
  return typeof v === "number" && !Number.isNaN(v) ? v : fallback;
}

function _deriveHistoryStats(history = []) {
  if (!Array.isArray(history) || history.length === 0) {
    return Object.freeze({
      totalEvents: 0,
      outageEvents: 0,
      fluctuationEvents: 0,
      maxOutageMinutes: 0,
      recentOutageMinutes: 0,
      lastOutageAt: null,
      volatilityIndex: 0
    });
  }

  let totalEvents = 0;
  let outageEvents = 0;
  let fluctuationEvents = 0;
  let maxOutageMinutes = 0;
  let recentOutageMinutes = 0;
  let lastOutageAt = null;

  const now = Date.now();
  const oneDayMs = 24 * 60 * 60 * 1000;

  for (const ev of history) {
    if (!ev || typeof ev !== "object") continue;
    totalEvents += 1;

    const status = String(ev.status || ev.state || "").toLowerCase();
    const reason = String(ev.reason || ev.cause || "").toLowerCase();
    const duration = _safeNumber(ev.durationMinutes || ev.duration || 0, 0);
    const ts =
      typeof ev.timestamp === "number"
        ? ev.timestamp
        : typeof ev.timestamp === "string"
        ? Date.parse(ev.timestamp)
        : null;

    const looksOutage =
      status.includes("outage") ||
      status.includes("down") ||
      status.includes("offline") ||
      reason.includes("outage") ||
      reason.includes("fault") ||
      reason.includes("trip");

    const looksFluctuation =
      status.includes("fluctuation") ||
      status.includes("unstable") ||
      status.includes("low voltage") ||
      status.includes("high voltage") ||
      reason.includes("voltage") ||
      reason.includes("frequency");

    if (looksOutage) {
      outageEvents += 1;
      if (duration > maxOutageMinutes) maxOutageMinutes = duration;
      if (ts && now - ts <= oneDayMs) {
        recentOutageMinutes += duration;
        if (!lastOutageAt || ts > lastOutageAt) lastOutageAt = ts;
      }
    }

    if (looksFluctuation) {
      fluctuationEvents += 1;
    }
  }

  const volatilityIndex = Math.min(
    1,
    (outageEvents * 0.6 + fluctuationEvents * 0.4) / Math.max(1, totalEvents)
  );

  return Object.freeze({
    totalEvents,
    outageEvents,
    fluctuationEvents,
    maxOutageMinutes,
    recentOutageMinutes,
    lastOutageAt,
    volatilityIndex
  });
}

function _deriveRiskDiagnostics(continuance, riskSummary, historyStats) {
  const c = continuance || {};
  const r = riskSummary || {};
  const h = historyStats || {};

  const continuanceScore = _safeNumber(c.continuanceScore, 0);
  const windowMinutes = _safeNumber(c.continuanceWindowMinutes, 0);
  const riskLevel = r.level || "unknown";

  let riskScore = 0.5;
  if (typeof r.score === "number") {
    riskScore = r.score;
  } else {
    if (riskLevel === "low") riskScore = 0.2;
    else if (riskLevel === "medium") riskScore = 0.5;
    else if (riskLevel === "high") riskScore = 0.8;
    else if (riskLevel === "critical") riskScore = 0.95;
  }

  const volatility = _safeNumber(h.volatilityIndex, 0);
  const outageEvents = _safeNumber(h.outageEvents, 0);
  const recentOutageMinutes = _safeNumber(h.recentOutageMinutes, 0);

  const outageProbabilityEstimate = Math.min(
    1,
    riskScore * 0.5 +
      volatility * 0.3 +
      (outageEvents > 0 ? 0.1 : 0) +
      (recentOutageMinutes > 0 ? 0.1 : 0)
  );

  let continuityClass = "unknown";
  if (continuanceScore >= 0.85) continuityClass = "strong";
  else if (continuanceScore >= 0.65) continuityClass = "stable";
  else if (continuanceScore >= 0.4) continuityClass = "fragile";
  else continuityClass = "weak";

  return Object.freeze({
    riskScore,
    riskLevel,
    outageProbabilityEstimate,
    continuityClass,
    continuanceScore,
    continuanceWindowMinutes: windowMinutes,
    volatilityIndex: volatility,
    outageEvents,
    recentOutageMinutes
  });
}

// ---------------------------------------------------------------------------
//  INTERNAL HELPER — BEL POWER INFO POINTER (no route, no I/O)
// ---------------------------------------------------------------------------

function _belPowerPointer({ topic = "" } = {}) {
  const sources = {
    bel_updates: "https://www.bel.com.bz/PowerUpdates/?q=",
    bel_news: "https://www.bel.com.bz/News/?q=",
    bel_docs: "https://www.bel.com.bz/Documents/?q=",
    gov_energy: "https://www.energy.gov.bz/?s=",
    pucs: "https://www.puc.bz/?s="
  };

  const base = sources.bel_updates;
  const q = encodeURIComponent(topic || "");
  const url = `${base}${q}`;

  return Object.freeze({
    kind: "power-pointer-bel",
    source: "bel",
    topic,
    url,
    meta: {
      organ: PowerMeta.identity,
      version: PowerMeta.version,
      mode: "pointer",
      zeroNetworkFromThisOrgan: true
    },
    note:
      "Deterministic pointer to public BEL power resources. External I/O is handled by the caller, not this Power‑Prime organ."
  });
}

// ---------------------------------------------------------------------------
//  INTERNAL HELPER — EXTERNAL GENERIC POWER POINTER
// ---------------------------------------------------------------------------

function _externalPowerPointer({ topic = "" } = {}) {
  const base = "https://www.google.com/search?q=";
  const q = encodeURIComponent(topic || "belize power grid");
  const url = `${base}${q}`;

  return Object.freeze({
    kind: "power-pointer-external",
    source: "external",
    topic,
    url,
    meta: {
      organ: PowerMeta.identity,
      version: PowerMeta.version,
      mode: "pointer",
      zeroNetworkFromThisOrgan: true
    },
    note:
      "Deterministic pointer to general external power information. External I/O is handled by the caller, not this Power‑Prime organ."
  });
}

// ---------------------------------------------------------------------------
//  INTERNAL HELPER — INTERNAL POWER POINTER (collections)
// ---------------------------------------------------------------------------

function _internalPowerPointer({ topic = "" } = {}) {
  return Object.freeze({
    kind: "power-pointer-internal",
    source: "internal",
    topic,
    collections: ["power", "powerHistory", "powerSettings", "powerData"],
    meta: {
      organ: PowerMeta.identity,
      version: PowerMeta.version,
      mode: "pointer",
      zeroNetworkFromThisOrgan: true
    },
    note:
      "Pointer to internal power collections (power, powerHistory, powerSettings, powerData). Data is read via DB, not via network."
  });
}

// ---------------------------------------------------------------------------
//  AUTO‑DETECT POWER SOURCE (Hybrid: explicit overrides auto)
// ---------------------------------------------------------------------------

function autoDetectPowerSource(topic = "") {
  const t = (topic || "").toLowerCase();

  // BEL‑leaning keywords
  if (
    t.includes("bel") ||
    t.includes("belize") ||
    t.includes("feeder") ||
    t.includes("outage") ||
    t.includes("interruption") ||
    t.includes("scheduled") ||
    t.includes("restoration") ||
    t.includes("puc") ||
    t.includes("energy.gov.bz")
  ) {
    return "bel";
  }

  // Internal‑leaning keywords
  if (
    t.includes("continuance") ||
    t.includes("risk") ||
    t.includes("history") ||
    t.includes("settings") ||
    t.includes("powerdata") ||
    t.includes("power data") ||
    t.includes("pipeline") ||
    t.includes("organism") ||
    t.includes("artery") ||
    t.includes("snapshot") ||
    t.includes("drift")
  ) {
    return "internal";
  }

  // Fallback: external
  return "external";
}

// ---------------------------------------------------------------------------
//  UNIFIED POWER POINTER — internal + BEL + external
// ---------------------------------------------------------------------------

export function powerPointer({ topic = "", source = "auto" } = {}) {
  const effectiveSource =
    source === "auto" ? autoDetectPowerSource(topic) : source;

  if (effectiveSource === "internal") {
    return _internalPowerPointer({ topic });
  }
  if (effectiveSource === "bel") {
    return _belPowerPointer({ topic });
  }
  return _externalPowerPointer({ topic });
}

// ---------------------------------------------------------------------------
//  BEL POWER READER v2 — richer pattern detection
// ---------------------------------------------------------------------------

function belPowerReader(info = {}, binaryVitals = {}) {
  const notes = [];
  const text = (info.rawText || "").toLowerCase();

  if (!info.rawText) {
    return {
      notes: ["No BEL power text provided to belPowerReader."],
      citations: info.citations || [],
      source: info.source || null
    };
  }

  const binaryPressure =
    binaryVitals?.layered?.organism?.pressure ??
    binaryVitals?.binary?.pressure ??
    0;

  if (binaryPressure >= 0.7) {
    notes.push("System load elevated — interpretation simplified.");
  }

  if (text.includes("outage") || text.includes("interruption")) {
    notes.push(
      "Outage-related content detected — may indicate feeder faults, maintenance, or grid instability."
    );
  }

  if (text.includes("load shedding") || text.includes("load-shedding")) {
    notes.push(
      "Load shedding detected — suggests capacity constraints or grid protection actions."
    );
  }

  if (text.includes("scheduled") && text.includes("maintenance")) {
    notes.push(
      "Scheduled maintenance detected — suggests planned downtime windows."
    );
  }

  if (text.includes("fault") || text.includes("trip")) {
    notes.push(
      "Fault or trip event detected — often linked to line issues or protective shutdowns."
    );
  }

  if (
    text.includes("transformer") ||
    text.includes("substation") ||
    text.includes("feeder")
  ) {
    notes.push(
      "Equipment-level reference detected (transformer/substation/feeder) — may localize risk to specific infrastructure."
    );
  }

  if (text.includes("storm") || text.includes("lightning")) {
    notes.push(
      "Weather-related risk detected — storms or lightning may increase outage probability."
    );
  }

  if (text.includes("restored") || text.includes("normal")) {
    notes.push(
      "Restoration indicators detected — suggests service normalization or recovery."
    );
  }

  notes.push(
    "A Power‑Prime assistant mapped these BEL signals into risk, continuance, and fluctuation patterns. This is informational only — not a control interface."
  );

  return {
    notes,
    citations: info.citations || [],
    source: info.source || null,
    meta: info.meta || {}
  };
}

// ---------------------------------------------------------------------------
//  UNIFIED POWER READER — internal + BEL + external (v24++)
// ---------------------------------------------------------------------------

function powerReader({ source, payload = {}, binaryVitals = {} } = {}) {
  if (source === "bel") {
    return belPowerReader(payload, binaryVitals);
  }

  if (source === "internal") {
    const notes = [];
    const { continuance, risk, beacons, historyStats, diagnostics } =
      payload || {};

    if (continuance) {
      const score =
        continuance.continuanceScore &&
        continuance.continuanceScore.toFixed
          ? continuance.continuanceScore.toFixed(2)
          : "n/a";
      notes.push(
        `Internal continuance window: ${continuance.continuanceWindowMinutes} minutes, score=${score}.`
      );
    }

    if (risk) {
      notes.push(`Internal risk level: ${risk.level || "unknown"}.`);
      if (typeof risk.score === "number") {
        notes.push(`Internal risk score: ${risk.score.toFixed(2)}.`);
      }
    }

    if (historyStats) {
      notes.push(
        `History: ${historyStats.outageEvents} outage event(s), ${historyStats.fluctuationEvents} fluctuation event(s), max outage ${historyStats.maxOutageMinutes} minutes.`
      );
      notes.push(
        `Volatility index: ${historyStats.volatilityIndex.toFixed(2)} (0=stable, 1=highly volatile).`
      );
    }

    if (diagnostics) {
      notes.push(
        `Estimated outage probability: ${(diagnostics.outageProbabilityEstimate * 100).toFixed(
          1
        )}%, continuity class: ${diagnostics.continuityClass}.`
      );
    }

    if (beacons && Array.isArray(beacons.signals)) {
      notes.push(
        `Beacon signals detected: ${beacons.signals.length} pattern(s).`
      );
    }

    notes.push(
      "Internal power data was interpreted into continuance, risk, and volatility patterns. This is informational only and does not control power."
    );

    return {
      notes,
      meta: { source: "internal" }
    };
  }

  // External generic reader
  const text = (payload.rawText || "").toLowerCase();
  const notes = [];

  if (!payload.rawText) {
    return {
      notes: ["No external power text provided to powerReader."],
      citations: payload.citations || [],
      source: payload.source || null
    };
  }

  if (text.includes("grid") || text.includes("stability")) {
    notes.push(
      "External grid stability content detected — may relate to regional reliability or capacity."
    );
  }

  if (
    text.includes("renewable") ||
    text.includes("solar") ||
    text.includes("wind")
  ) {
    notes.push(
      "External renewable energy content detected — may affect long-term power mix and risk profile."
    );
  }

  if (text.includes("blackout") || text.includes("brownout")) {
    notes.push(
      "Blackout/brownout references detected — may indicate severe or widespread power instability."
    );
  }

  notes.push(
    "External power information was interpreted at a high level. This is informational only and does not control power."
  );

  return {
    notes,
    citations: payload.citations || [],
    source: payload.source || null,
    meta: payload.meta || {}
  };
}

// ---------------------------------------------------------------------------
//  FACTORY — Power‑Prime API (v24‑IMMORTAL‑PRIME++)
// ---------------------------------------------------------------------------

export function createPowerAPI(db, evolutionAPI, dualBand = null) {
  return Object.freeze({
    meta: PowerMeta,

    // ----------------------------------------------------------------------
    // TOURIST‑SAFE SNAPSHOT + CONTINUANCE + RISK SUMMARY + DIAGNOSTICS
    // ----------------------------------------------------------------------
    async getPublicPowerSnapshot(context) {
      context.logStep?.("aiPowerPrime: building public power snapshot");

      const organismSnapshot = getOrganismSnapshot(dualBand);
      const fusedArteries = buildFusedArteries(organismSnapshot);

      const [power, history] = await Promise.all([
        fetchTourist(context, db, "power", { limit: 1 }),
        fetchTourist(context, db, "powerHistory", { limit: 50 })
      ]);

      const continuance = computeContinuanceMetricsV3({
        power,
        history,
        fusedArteries,
        organismSnapshot
      });

      const riskVector = computePowerRiskVector({
        power,
        history,
        fusedArteries,
        continuance
      });

      const riskSummary = buildPowerRiskSummary({
        riskVector,
        continuance
      });

      const historyStats = _deriveHistoryStats(history);
      const diagnostics = _deriveRiskDiagnostics(
        continuance,
        riskSummary,
        historyStats
      );

      context.logStep?.(
        `aiPowerPrime: continuanceScore=${continuance.continuanceScore.toFixed(
          2
        )}, window=${continuance.continuanceWindowMinutes}min, risk=${riskSummary.level}, outageProb≈${(
          diagnostics.outageProbabilityEstimate * 100
        ).toFixed(1)}%`
      );

      return Object.freeze({
        power: power[0] || null,
        history,
        continuance,
        risk: riskSummary,
        historyStats,
        diagnostics,
        fusedArteries,
        organismSnapshot
      });
    },

    // ----------------------------------------------------------------------
    // OWNER‑ONLY — FULL GRID DIAGNOSTICS + CONTINUANCE + RISK + BEACONS
    // ----------------------------------------------------------------------
    async getOwnerPowerDiagnostics(context) {
      if (!context.userIsOwner) return null;

      context.logStep?.("aiPowerPrime: fetching owner diagnostics");

      const [power, history, settings, rawData] = await Promise.all([
        fetchOwner(context, db, "power"),
        fetchOwner(context, db, "powerHistory"),
        fetchOwner(context, db, "powerSettings"),
        fetchOwner(context, db, "powerData")
      ]);

      const organismSnapshot = getOrganismSnapshot(dualBand);
      const fusedArteries = buildFusedArteries(organismSnapshot);

      const continuance = computeContinuanceMetricsV3({
        power,
        history,
        fusedArteries,
        organismSnapshot
      });

      const riskVector = computePowerRiskVector({
        power,
        history,
        fusedArteries,
        continuance,
        settings
      });

      const riskSummary = buildPowerRiskSummary({
        riskVector,
        continuance,
        settings
      });

      const beacons = buildPowerBeaconSignals({
        riskVector,
        continuance,
        fusedArteries
      });

      const historyStats = _deriveHistoryStats(history);
      const diagnostics = _deriveRiskDiagnostics(
        continuance,
        riskSummary,
        historyStats
      );

      return Object.freeze({
        power,
        history,
        settings,
        rawData,
        continuance,
        risk: riskSummary,
        beacons,
        historyStats,
        diagnostics,
        fusedArteries,
        organismSnapshot
      });
    },

    // ----------------------------------------------------------------------
    // OWNER‑ONLY — FLUCTUATION + OUTAGE ANALYSIS + CONTINUANCE + RISK
    // ----------------------------------------------------------------------
    async getPowerFluctuationAnalysis(context) {
      if (!context.userIsOwner) return null;

      context.logStep?.("aiPowerPrime: running fluctuation + outage analysis");

      const [history, settingsArr] = await Promise.all([
        fetchOwner(context, db, "powerHistory"),
        fetchOwner(context, db, "powerSettings")
      ]);

      const config = settingsArr[0] || {};

      const organismSnapshot = getOrganismSnapshot(dualBand);
      const fusedArteries = buildFusedArteries(organismSnapshot);

      const fluctuations = detectFluctuationsV3(history, config, context);
      const outages = detectOutagesV3(history, config, context);

      const continuance = computeContinuanceMetricsV3({
        power: [],
        history,
        fusedArteries,
        organismSnapshot
      });

      const riskVector = computePowerRiskVector({
        power: [],
        history,
        fusedArteries,
        continuance,
        settings: config
      });

      const riskSummary = buildPowerRiskSummary({
        riskVector,
        continuance,
        settings: config
      });

      const beacons = buildPowerBeaconSignals({
        riskVector,
        continuance,
        fusedArteries
      });

      const historyStats = _deriveHistoryStats(history);
      const diagnostics = _deriveRiskDiagnostics(
        continuance,
        riskSummary,
        historyStats
      );

      return Object.freeze({
        fluctuations,
        outages,
        settings: config,
        continuance,
        risk: riskSummary,
        beacons,
        historyStats,
        diagnostics,
        fusedArteries,
        organismSnapshot
      });
    },

    // ----------------------------------------------------------------------
    // OWNER‑ONLY — RISK‑ONLY VIEW (NO RAW DATA) + DIAGNOSTICS
    // ----------------------------------------------------------------------
    async getPowerRiskOverview(context) {
      if (!context.userIsOwner) return null;

      context.logStep?.("aiPowerPrime: building risk overview");

      const [power, history, settingsArr] = await Promise.all([
        fetchOwner(context, db, "power", { limit: 1 }),
        fetchOwner(context, db, "powerHistory", { limit: 100 }),
        fetchOwner(context, db, "powerSettings", { limit: 1 })
      ]);

      const settings = settingsArr[0] || {};
      const organismSnapshot = getOrganismSnapshot(dualBand);
      const fusedArteries = buildFusedArteries(organismSnapshot);

      const continuance = computeContinuanceMetricsV3({
        power,
        history,
        fusedArteries,
        organismSnapshot
      });

      const riskVector = computePowerRiskVector({
        power,
        history,
        fusedArteries,
        continuance,
        settings
      });

      const riskSummary = buildPowerRiskSummary({
        riskVector,
        continuance,
        settings
      });

      const beacons = buildPowerBeaconSignals({
        riskVector,
        continuance,
        fusedArteries
      });

      const historyStats = _deriveHistoryStats(history);
      const diagnostics = _deriveRiskDiagnostics(
        continuance,
        riskSummary,
        historyStats
      );

      return Object.freeze({
        risk: riskSummary,
        beacons,
        continuance,
        historyStats,
        diagnostics,
        fusedArteries,
        organismSnapshot
      });
    },

    // ----------------------------------------------------------------------
    // OWNER‑ONLY — EVOLUTIONARY DRIFT (via aiEvolution)
    // ----------------------------------------------------------------------
    async getPowerEvolutionOverview(context) {
      if (!context.userIsOwner || !evolutionAPI?.analyzeSchema) return null;
      context.logStep?.("aiPowerPrime: schema drift analysis");
      return evolutionAPI.analyzeSchema(context, "power");
    },

    async analyzePowerFiles(context) {
      if (!context.userIsOwner || !evolutionAPI?.analyzeFile) return null;
      context.logStep?.("aiPowerPrime: file drift analysis");
      return evolutionAPI.analyzeFile(context, "power.js");
    },

    async analyzePowerRoutes(context) {
      if (!context.userIsOwner || !evolutionAPI?.analyzeRoute) return null;
      context.logStep?.("aiPowerPrime: route drift analysis");
      return evolutionAPI.analyzeRoute(context, "power");
    },

    // ----------------------------------------------------------------------
    // WINDOW‑SAFE POWER ARTERY SNAPSHOT
    // ----------------------------------------------------------------------
    getPowerArterySnapshot() {
      const organismSnapshot = getOrganismSnapshot(dualBand);
      const fusedArteries = buildFusedArteries(organismSnapshot);

      const riskVector = computePowerRiskVector({
        power: [],
        history: [],
        fusedArteries,
        continuance: null
      });

      const riskSummary = buildPowerRiskSummary({
        riskVector,
        continuance: null
      });

      const historyStats = _deriveHistoryStats([]);
      const diagnostics = _deriveRiskDiagnostics(
        null,
        riskSummary,
        historyStats
      );

      return Object.freeze({
        risk: riskSummary,
        diagnostics,
        fusedArteries
      });
    },

    // ----------------------------------------------------------------------
    // UNIFIED POWER QUERY — internal + BEL + external
    // ----------------------------------------------------------------------
    /**
     * powerQuery({
     *   topic: string,
     *   source?: "auto" | "internal" | "bel" | "external",
     *   mode?: "auto" | "pointer" | "route",
     *   route?: function,
     *   context?: object,
     *   binaryVitals?: object
     * })
     */
    async powerQuery({
      topic = "",
      source = "auto",
      mode = "auto",
      route = null,
      context = {},
      binaryVitals = {}
    } = {}) {
      const pointer = powerPointer({ topic, source });
      const effectiveSource =
        pointer.source ||
        (source === "auto" ? autoDetectPowerSource(topic) : source);

      const effectiveMode =
        mode === "auto"
          ? typeof route === "function"
            ? "route"
            : "pointer"
          : mode;

      // POINTER‑ONLY MODE
      if (effectiveMode !== "route" || typeof route !== "function") {
        return pointer;
      }

      // ROUTE MODE
      if (effectiveSource === "internal") {
        // Read internal collections and summarize
        const [power, history, settingsArr, data] = await Promise.all([
          context.userIsOwner
            ? fetchOwner(context, db, "power")
            : fetchTourist(context, db, "power", { limit: 1 }),
          context.userIsOwner
            ? fetchOwner(context, db, "powerHistory")
            : fetchTourist(context, db, "powerHistory", { limit: 50 }),
          context.userIsOwner
            ? fetchOwner(context, db, "powerSettings", { limit: 1 })
            : fetchTourist(context, db, "powerSettings", { limit: 1 }),
          context.userIsOwner ? fetchOwner(context, db, "powerData") : []
        ]);

        const settings = settingsArr[0] || {};
        const organismSnapshot = getOrganismSnapshot(dualBand);
        const fusedArteries = buildFusedArteries(organismSnapshot);

        const continuance = computeContinuanceMetricsV3({
          power,
          history,
          fusedArteries,
          organismSnapshot
        });

        const riskVector = computePowerRiskVector({
          power,
          history,
          fusedArteries,
          continuance,
          settings
        });

        const riskSummary = buildPowerRiskSummary({
          riskVector,
          continuance,
          settings
        });

        const beacons = buildPowerBeaconSignals({
          riskVector,
          continuance,
          fusedArteries
        });

        const historyStats = _deriveHistoryStats(history);
        const diagnostics = _deriveRiskDiagnostics(
          continuance,
          riskSummary,
          historyStats
        );

        const payload = {
          power,
          history,
          settings,
          data,
          continuance,
          risk: riskSummary,
          beacons,
          historyStats,
          diagnostics
        };

        const readerView = powerReader({
          source: "internal",
          payload,
          binaryVitals
        });

        return {
          kind: "power-query-internal",
          source: "internal",
          topic,
          pointer,
          payload,
          readerView,
          meta: {
            organ: PowerMeta.identity,
            version: PowerMeta.version,
            mode: "route",
            zeroNetworkFromThisOrgan: true
          }
        };
      }

      if (effectiveSource === "bel") {
        const request = {
          type: "bel-power-query",
          payload: { topic },
          meta: {
            fromOrgan: PowerMeta.identity,
            version: PowerMeta.version,
            role: "power_prime_assistant"
          }
        };

        const result = await route(request);
        const readerView = powerReader({
          source: "bel",
          payload: result || {},
          binaryVitals
        });

        return {
          kind: "power-query-bel",
          source: "bel",
          topic,
          pointer,
          result,
          readerView,
          meta: {
            organ: PowerMeta.identity,
            version: PowerMeta.version,
            mode: "route",
            zeroNetworkFromThisOrgan: true
          }
        };
      }

      // EXTERNAL
      const request = {
        type: "power-external-query",
        payload: { topic },
        meta: {
          fromOrgan: PowerMeta.identity,
          version: PowerMeta.version,
          role: "power_prime_assistant"
        }
      };

      const result = await route(request);
      const readerView = powerReader({
        source: "external",
        payload: result || {},
        binaryVitals
      });

      return {
        kind: "power-query-external",
        source: "external",
        topic,
        pointer,
        result,
        readerView,
        meta: {
          organ: PowerMeta.identity,
          version: PowerMeta.version,
          mode: "route",
          zeroNetworkFromThisOrgan: true
        }
      };
    }
  });
}

// ============================================================================
//  DUAL‑MODE EXPORTS (ESM + CommonJS)
// ============================================================================
if (typeof module !== "undefined") {
  module.exports = {
    PowerMeta,
    createPowerAPI,
    powerPointer
  };
}
