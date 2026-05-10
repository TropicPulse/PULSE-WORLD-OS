// ============================================================================
//  aiEnvironment.js — Pulse OS v12.3‑Presence
//  World State • Internal Flags • Drift Awareness • Dual‑Band Logging
//  PURE READ‑ONLY. ZERO MUTATION. ZERO RANDOMNESS.
// ============================================================================

import { OrganismIdentity } from "../PULSE-X/PulseWorldOrganismMap-v21.js";

const Identity = OrganismIdentity(import.meta.url);

// or: const Identity = OrganismIdentity["pulse-ai/ai-v24.0-IMMORTAL"] if that's the key you chose

// ============================================================================
//  META BLOCK — v24.0 IMMORTAL (ORGANISM KERNEL)
//  (now backed by the Organism Map instead of hardcoded here)
// ============================================================================
export const EnvironmentMeta = Identity.OrganMeta;

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


// ============================================================================
//  PACKET EMITTER — deterministic, environment-scoped
// ============================================================================
function emitEnvironmentPacket(type, payload = {}) {
  return Object.freeze({
    meta: EnvironmentMeta,
    packetType: `environment-${type}`,
    timestamp: Date.now(),
    epoch: EnvironmentMeta.evo.epoch,
    layer: EnvironmentMeta.layer,
    role: EnvironmentMeta.role,
    identity: EnvironmentMeta.identity,
    ...payload
  });
}

import { getOrganismSnapshot } from "./aiDeps-v16.js";

// ============================================================================
//  CACHES — Hourly + Daily (Presence‑grade)
// ============================================================================
const hourlyCache = { data: null, timestamp: 0 };
const dailyCache = { data: null, timestamp: 0 };

const ONE_HOUR = 60 * 60 * 1000;
const ONE_DAY = 24 * ONE_HOUR;

// ============================================================================
//  ENVIRONMENT ORGAN — v12.3‑Presence
// ============================================================================
export function createEnvironmentAPI(db, evolutionAPI, dualBand = null) {

  // --------------------------------------------------------------------------
  // IDENTITY‑SAFE CLONING
  // --------------------------------------------------------------------------
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

  async function fetch(collection, options = {}) {
    const rows = await db.getCollection(collection, options);
    return rows.map(stripIdentity);
  }

  // --------------------------------------------------------------------------
  // HOURLY CACHE BUILDER
  // --------------------------------------------------------------------------
  async function buildHourly(context) {
    const now = Date.now();

    if (hourlyCache.data && now - hourlyCache.timestamp < ONE_HOUR) {
      context.logStep?.("env:hourly-hit");
      return hourlyCache.data;
    }

    context.logStep?.("env:hourly-miss");

    const [weather, heatIndex, waves, storms] = await Promise.all([
      fetch("weather", { limit: 1 }),
      fetch("heatIndex", { limit: 1 }),
      fetch("waves", { limit: 1 }),
      fetch("storms", { limit: 1 })
    ]);

    hourlyCache.data = Object.freeze({
      weather: weather[0] || null,
      heatIndex: heatIndex[0] || null,
      waves: waves[0] || null,
      storms: storms[0] || null
    });

    hourlyCache.timestamp = now;
    return hourlyCache.data;
  }

  // --------------------------------------------------------------------------
  // DAILY CACHE BUILDER
  // --------------------------------------------------------------------------
  async function buildDaily(context) {
    const now = Date.now();

    if (dailyCache.data && now - dailyCache.timestamp < ONE_DAY) {
      context.logStep?.("env:daily-hit");
      return dailyCache.data;
    }

    context.logStep?.("env:daily-miss");

    const [sargassum, moon, wildlife, seasons, holidays] = await Promise.all([
      fetch("sargassum", { limit: 1 }),
      fetch("moon", { limit: 1 }),
      fetch("wildlife", { limit: 1 }),
      fetch("seasons", { limit: 1 }),
      fetch("holidays", { limit: 1 })
    ]);

    dailyCache.data = Object.freeze({
      sargassum: sargassum[0] || null,
      moon: moon[0] || null,
      wildlife: wildlife[0] || null,
      seasons: seasons[0] || null,
      holidays: holidays[0] || null
    });

    dailyCache.timestamp = now;
    return dailyCache.data;
  }

  // --------------------------------------------------------------------------
  // ANOMALY DETECTION — deterministic
  // --------------------------------------------------------------------------
  function detectJumps(arr, label, context) {
    const anomalies = [];
    if (!Array.isArray(arr)) return anomalies;

    for (let i = 1; i < arr.length; i++) {
      const prev = arr[i - 1];
      const curr = arr[i];
      if (!prev || !curr) continue;

      const base = prev.value === 0 ? 1 : prev.value;
      const diff = Math.abs(curr.value - prev.value);
      const pct = (diff / base) * 100;

      if (pct >= 25) {
        anomalies.push({
          type: `${label}_jump`,
          timestamp: curr.timestamp,
          deviation: pct,
          from: prev.value,
          to: curr.value
        });

        context.logStep?.(`env:anomaly ${label} ${pct.toFixed(1)}%`);
      }
    }

    return anomalies;
  }

  // --------------------------------------------------------------------------
  // PUBLIC API — Cached + Dual‑Band Logged + Presence‑grade
  // --------------------------------------------------------------------------
  return Object.freeze({

    // ----------------------------------------------------------------------
    // TOURIST‑SAFE SNAPSHOT
    // ----------------------------------------------------------------------
    async getPublicEnvironment(context) {
      context.logStep?.("env:public");

      const snapshot = getOrganismSnapshot(dualBand);
      const hourly = await buildHourly(context);
      const daily = await buildDaily(context);

      return Object.freeze({
        ...hourly,
        ...daily,
        organismSnapshot: snapshot
      });
    },

    // ----------------------------------------------------------------------
    // OWNER‑ONLY INTERNAL ENVIRONMENT
    // ----------------------------------------------------------------------
    async getInternalEnvironment(context) {
      if (!context.userIsOwner) return null;

      context.logStep?.("env:internal");

      const [internal, settings, history] = await Promise.all([
        fetch("environment", { where: { scope: "internal" } }),
        fetch("environmentSettings"),
        fetch("environmentHistory")
      ]);

      const snapshot = getOrganismSnapshot(dualBand);

      return Object.freeze({
        internal: internal[0] || null,
        settings,
        history,
        organismSnapshot: snapshot
      });
    },

    // ----------------------------------------------------------------------
    // OWNER‑ONLY ANOMALIES
    // ----------------------------------------------------------------------
    async getEnvironmentAnomalies(context) {
      if (!context.userIsOwner) return null;

      context.logStep?.("env:anomalies");

      const [weatherHistory, heatHistory, waveHistory] = await Promise.all([
        fetch("weatherHistory"),
        fetch("heatIndexHistory"),
        fetch("waveHistory")
      ]);

      return Object.freeze({
        anomalies: [
          ...detectJumps(weatherHistory, "weather", context),
          ...detectJumps(heatHistory, "heatIndex", context),
          ...detectJumps(waveHistory, "waves", context)
        ]
      });
    },

    // ----------------------------------------------------------------------
    // OWNER‑ONLY EVOLUTION ANALYSIS
    // ----------------------------------------------------------------------
    async getEnvironmentEvolutionOverview(context) {
      if (!context.userIsOwner || !evolutionAPI?.analyzeSchema) return null;
      context.logStep?.("env:evolution");
      return evolutionAPI.analyzeSchema(context, "environment");
    },

    async analyzeEnvironmentFiles(context) {
      if (!context.userIsOwner || !evolutionAPI?.analyzeFile) return null;
      return evolutionAPI.analyzeFile(context, "environment.js");
    },

    async analyzeEnvironmentRoutes(context) {
      if (!context.userIsOwner || !evolutionAPI?.analyzeRoute) return null;
      return evolutionAPI.analyzeRoute(context, "environment");
    }
  });
}
