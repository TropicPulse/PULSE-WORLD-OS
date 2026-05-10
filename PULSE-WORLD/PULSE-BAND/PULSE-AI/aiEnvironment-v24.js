// ============================================================================
//  aiEnvironment-v24.js — Pulse OS v24++‑IMMORTAL‑ADVANTAGE
//  World State • Internal Flags • Drift Awareness • Dual‑Band Logging
//  PURE READ‑ONLY. ZERO MUTATION. ZERO RANDOMNESS.
//  OWNER‑SUBORDINATE: ALWAYS BELOW ALDWYN.
// ============================================================================

import { OrganismIdentity } from "../PULSE-X/PulseWorldOrganismMap-v21.js";
const Identity = OrganismIdentity(import.meta.url);

import { getOrganismSnapshot } from "./aiDeps-v24.js";
// ============================================================================
//  META BLOCK — v24++ IMMORTAL (ORGANISM KERNEL)
// ============================================================================
export const EnvironmentMeta = Identity.OrganMeta;

// ============================================================================
//  SURFACE / ORGANISM LAYER EXPORTS — v24++ IMMORTAL
// ============================================================================
export const pulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// ============================================================================
//  PRESSURE HELPERS — dualband‑aware
// ============================================================================
function extractBinaryPressure(binaryVitals = {}) {
  if (binaryVitals?.layered?.organism?.pressure != null)
    return binaryVitals.layered.organism.pressure;
  if (binaryVitals?.binary?.pressure != null)
    return binaryVitals.binary.pressure;
  if (typeof binaryVitals.pressure === "number")
    return binaryVitals.pressure;
  return 0;
}

function bucketPressure(v) {
  if (v >= 0.9) return "overload";
  if (v >= 0.7) return "high";
  if (v >= 0.4) return "medium";
  if (v > 0) return "low";
  return "none";
}

// ============================================================================
//  PACKET EMITTER — deterministic, environment‑scoped
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
    owner: "Aldwyn",
    subordinate: true,
    ...payload
  });
}

// ============================================================================
//  CACHES — Hourly + Daily (Presence‑grade, IMMORTAL‑SAFE)
// ============================================================================
const hourlyCache = { data: null, timestamp: 0 };
const dailyCache = { data: null, timestamp: 0 };

const ONE_HOUR = 60 * 60 * 1000;
const ONE_DAY = 24 * ONE_HOUR;

// ============================================================================
//  IDENTITY‑SAFE CLONING v24++
// ============================================================================
function stripIdentity(record) {
  if (!record || typeof record !== "object") return record;

  const clone = { ...record };

  delete clone.uid;
  delete clone.userId;
  delete clone.resendToken;
  delete clone.identityRoot;
  delete clone.sessionRoot;
  delete clone.deviceFingerprint;

  // v24++ hardened
  delete clone.email;
  delete clone.phone;
  delete clone.ip;
  delete clone.session;
  delete clone.token;
  delete clone.browserFingerprint;

  return clone;
}

// ============================================================================
//  ENVIRONMENT ORGAN — v24++ IMMORTAL‑ADVANTAGE
// ============================================================================
export function createEnvironmentAPI(db, evolutionAPI, dualBand = null) {

  async function fetch(collection, options = {}) {
    const rows = await db.getCollection(collection, options);
    return rows.map(stripIdentity);
  }

  // --------------------------------------------------------------------------
  // HOURLY CACHE BUILDER (IMMORTAL‑SAFE)
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
  // DAILY CACHE BUILDER (IMMORTAL‑SAFE)
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
  // ANOMALY DETECTION — deterministic, drift‑proof
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
  // ENVIRONMENT ARTERY — symbolic-only, deterministic, dualband-aware
  // --------------------------------------------------------------------------
  function environmentArtery({ binaryVitals = {} } = {}) {
    const pressure = extractBinaryPressure(binaryVitals);

    const localPressure = 0.2; // environment always contributes a baseline

    const combined = Math.max(
      0,
      Math.min(1, 0.6 * localPressure + 0.4 * pressure)
    );

    return emitEnvironmentPacket("artery", {
      organism: {
        pressure: combined,
        pressureBucket: bucketPressure(combined)
      }
    });
  }

  // --------------------------------------------------------------------------
  // PUBLIC API — Cached + Dual‑Band Logged + IMMORTAL‑SAFE
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

      return emitEnvironmentPacket("public", {
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

      return emitEnvironmentPacket("internal", {
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

      return emitEnvironmentPacket("anomalies", {
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
      return emitEnvironmentPacket("evolution", {
        result: await evolutionAPI.analyzeSchema(context, "environment")
      });
    },

    async analyzeEnvironmentFiles(context) {
      if (!context.userIsOwner || !evolutionAPI?.analyzeFile) return null;
      return emitEnvironmentPacket("files", {
        result: await evolutionAPI.analyzeFile(context, "environment.js")
      });
    },

    async analyzeEnvironmentRoutes(context) {
      if (!context.userIsOwner || !evolutionAPI?.analyzeRoute) return null;
      return emitEnvironmentPacket("routes", {
        result: await evolutionAPI.analyzeRoute(context, "environment")
      });
    },

    // ----------------------------------------------------------------------
    // ARTERY
    // ----------------------------------------------------------------------
    environmentArtery
  });
}
