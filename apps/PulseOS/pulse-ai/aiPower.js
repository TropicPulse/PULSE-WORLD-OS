// ============================================================================
// FILE: tropic-pulse-functions/apps/pulse-ai/aiPower.js
// LAYER: POWER ORGAN (Grid Status + Fluctuations + History + Drift Awareness)
// ============================================================================
//
// ROLE:
//   • Provide SAFE, READ‑ONLY access to power grid data.
//   • Tourist: high‑level snapshot (safe).
//   • Owner: deep diagnostics, fluctuation patterns, outage windows.
//   • Integrates with aiEvolution for drift + schema mismatch.
//   • Never exposes UID, resendToken, or identity anchors.
//   • Never mutates anything.
//
// CONTRACT:
//   • READ‑ONLY.
//   • ZERO MUTATION.
//   • ZERO RANDOMNESS.
//   • DETERMINISTIC ANALYSIS ONLY.
// ============================================================================

import { Personas } from "./persona.js";

export function createPowerAPI(db, evolutionAPI) {

  // --------------------------------------------------------------------------
  // HELPERS
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

  async function fetchOwner(context, collection, options = {}) {
    if (!context.userIsOwner) {
      context.logStep(`aiPower: owner‑only "${collection}" blocked.`);
      return [];
    }
    const rows = await db.getCollection(collection, options);
    return rows.map(stripIdentity);
  }

  async function fetchTourist(context, collection, options = {}) {
    const rows = await db.getCollection(collection, options);
    return rows.map(stripIdentity);
  }

  // --------------------------------------------------------------------------
  // PUBLIC API — Power Insight
  // --------------------------------------------------------------------------
  return {

    // ----------------------------------------------------------------------
    // TOURIST‑SAFE SNAPSHOT
    // ----------------------------------------------------------------------
    async getPublicPowerSnapshot(context) {
      const [power, history] = await Promise.all([
        fetchTourist(context, "power", { limit: 1 }),
        fetchTourist(context, "powerHistory", { limit: 50 })
      ]);

      return {
        power: power[0] || null,
        history
      };
    },

    // ----------------------------------------------------------------------
    // OWNER‑ONLY — FULL GRID DIAGNOSTICS
    // ----------------------------------------------------------------------
    async getOwnerPowerDiagnostics(context) {
      const [
        power,
        history,
        settings,
        rawData
      ] = await Promise.all([
        fetchOwner(context, "power"),
        fetchOwner(context, "powerHistory"),
        fetchOwner(context, "powerSettings"),
        fetchOwner(context, "powerData")
      ]);

      return {
        power,
        history,
        settings,
        rawData
      };
    },

    // ----------------------------------------------------------------------
    // OWNER‑ONLY — FLUCTUATION + OUTAGE ANALYSIS
    // ----------------------------------------------------------------------
    async getPowerFluctuationAnalysis(context) {
      if (!context.userIsOwner) return null;

      const [history, settings] = await Promise.all([
        fetchOwner(context, "powerHistory"),
        fetchOwner(context, "powerSettings")
      ]);

      const baseline = settings[0]?.baselineWindow || 10;
      const minDeviation = settings[0]?.minDeviationPercent || 15;
      const outageWindow = settings[0]?.minOutageWindow || 3;

      const fluctuations = [];
      const outages = [];

      for (let i = 1; i < history.length; i++) {
        const prev = history[i - 1];
        const curr = history[i];

        if (!prev || !curr) continue;

        const diff = Math.abs(curr.value - prev.value);
        const pct = (diff / prev.value) * 100;

        if (pct >= minDeviation) {
          fluctuations.push({
            timestamp: curr.timestamp,
            deviation: pct,
            from: prev.value,
            to: curr.value
          });
        }
      }

      // Outage detection (simple window)
      for (let i = 0; i < history.length - outageWindow; i++) {
        const window = history.slice(i, i + outageWindow);
        const allZero = window.every(h => h.value === 0);

        if (allZero) {
          outages.push({
            start: window[0].timestamp,
            end: window[window.length - 1].timestamp
          });
        }
      }

      return {
        fluctuations,
        outages,
        settings: settings[0] || null
      };
    },

    // ----------------------------------------------------------------------
    // OWNER‑ONLY — EVOLUTIONARY DRIFT (via aiEvolution)
// ----------------------------------------------------------------------
    async getPowerEvolutionOverview(context) {
      if (!context.userIsOwner) return null;
      return evolutionAPI.analyzeSchema(context, "power");
    },

    async analyzePowerFiles(context) {
      if (!context.userIsOwner) return null;
      return evolutionAPI.analyzeFile(context, "power.js");
    },

    async analyzePowerRoutes(context) {
      if (!context.userIsOwner) return null;
      return evolutionAPI.analyzeRoute(context, "power");
    }
  };
}
