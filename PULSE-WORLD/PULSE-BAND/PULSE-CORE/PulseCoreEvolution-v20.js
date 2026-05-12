// ============================================================================
//  PulseCoreEvolutions.js — v20-IMMORTAL-ADVANTAGE
//  ORGANISM‑WIDE EVOLUTION ENGINE
//  “KNOW EVERY ADVANTAGE. APPLY ONLY THE CORRECT ONE. NEVER DRIFT.”
// ============================================================================

import {
  OrganismIdentity,
  buildPulseOrganismMap as PulseOrganismMap,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PULSE-WORLD-MAP.js";

const Identity = OrganismIdentity(import.meta.url);

// ============================================================================
//  META BLOCK — v20 IMMORTAL (from genome)
// ============================================================================
export const PulseCoreEvolutionsMeta = Identity.OrganMeta;

// ============================================================================
//  SURFACE / ORGANISM LAYER EXPORTS — v20 IMMORTAL
// ============================================================================
export const pulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;

export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// ============================================================================
//  STORAGE KEYS (PRIMARY + SECONDARY)
// ============================================================================
const EVO_PRIMARY   = "pulse-core-evolutions-v20-primary";
const EVO_SECONDARY = "pulse-core-evolutions-v20-secondary";

const EVO_TTL_MS = 7 * 24 * 60 * 60 * 1000;

// deterministic epoch counter
let EVO_EPOCH_COUNTER = 0;
function nextEpoch() {
  EVO_EPOCH_COUNTER += 1;
  return EVO_EPOCH_COUNTER;
}

// ============================================================================
//  CREATE EVOLUTION ENGINE — v20 IMMORTAL
// ============================================================================
export function createPulseCoreEvolutions({
  primaryStorage = typeof window !== "undefined" ? global.localStorage : null,
  secondaryStorage = typeof window !== "undefined" ? global.sessionStorage : null,
  dnaTag = "default-dna",
  version = "20.0-IMMORTAL-ADVANTAGE",
  overlay = null,
  log = console.log,
  warn = console.warn
} = {}) {

  const Evolutions = {
    loaded: false,
    list: [],
    lastLoadEpoch: 0,
    lastApplyEpoch: 0,
    fallbackUsed: false,
    lastDriftFilteredCount: 0,
    lastExpiredFilteredCount: 0
  };

  function safeLog(stage, details = {}) {
    try { log("[PulseCoreEvolutions-v20]", stage, JSON.stringify(details)); }
    catch {}
  }

  // -------------------------------------------------------------------------
  //  ADVANTAGE SCORING (v20)
  // -------------------------------------------------------------------------
  function scoreEvolution(evo, nowMs) {
    let score = 0;

    if (evo.dnaTag === dnaTag) score += 3;
    if (evo.routeId && evo.routeId !== "global") score += 2;

    if (evo.delta && typeof evo.delta === "object") {
      const keys = Object.keys(evo.delta);
      if (keys.length > 0) score += 1;
      if (keys.length > 3) score += 1;
    }

    if (typeof evo.timestamp === "number" && typeof nowMs === "number") {
      const ageMs = nowMs - evo.timestamp;
      if (ageMs < EVO_TTL_MS / 4) score += 1;
    }

    if (overlay && typeof overlay.scoreHint === "function") {
      try {
        const hint = overlay.scoreHint(evo) || 0;
        score += Number(hint) || 0;
      } catch {}
    }

    if (evo.band === "binary") score += 1;
    if (evo.band === "symbolic") score += 0.5;

    return score;
  }

  // -------------------------------------------------------------------------
  //  LINEAGE + ANCESTRY (v20)
  // -------------------------------------------------------------------------
  function assignLineage(evo) {
    const epoch = nextEpoch();
    evo.lineage = `${dnaTag}:${version}:${evo.id}:${epoch}`;
    evo.ancestry = [dnaTag, version];
    evo.band = evo.band || "symbolic";
  }

  // -------------------------------------------------------------------------
  //  DRIFT + TTL FILTERING (v20)
  // -------------------------------------------------------------------------
  function filterValidEvolutions(list, nowMs) {
    const valid = [];
    let driftFiltered = 0;
    let expiredFiltered = 0;

    for (const e of list) {
      if (typeof e.timestamp === "number" && nowMs - e.timestamp >= EVO_TTL_MS) {
        expiredFiltered++;
        continue;
      }

      const dnaMatch = e.dnaTag === dnaTag;
      const versionMatch = Array.isArray(e.ancestry)
        ? e.ancestry.includes(version)
        : e.version === version;

      if (!dnaMatch || !versionMatch) {
        driftFiltered++;
        continue;
      }

      valid.push(e);
    }

    Evolutions.lastDriftFilteredCount = driftFiltered;
    Evolutions.lastExpiredFilteredCount = expiredFiltered;

    return valid;
  }

  // -------------------------------------------------------------------------
  //  LOAD (DUALBAND + FALLBACK + TTL + VERSION + DNA + DRIFT)
  // -------------------------------------------------------------------------
  function load() {
    const nowMs = Date.now();
    let loadedList = [];
    let usedFallback = false;

    try {
      if (primaryStorage) {
        const rawPrimary = primaryStorage.getItem(EVO_PRIMARY);
        if (rawPrimary) {
          loadedList = JSON.parse(rawPrimary);
          usedFallback = false;
          safeLog("LOAD_PRIMARY_OK", { count: loadedList.length });
        }
      }

      if (!loadedList.length && secondaryStorage) {
        const rawSecondary = secondaryStorage.getItem(EVO_SECONDARY);
        if (rawSecondary) {
          loadedList = JSON.parse(rawSecondary);
          usedFallback = true;
          safeLog("LOAD_SECONDARY_OK", { count: loadedList.length });
        }
      }

      if (!loadedList.length) {
        Evolutions.loaded = true;
        Evolutions.list = [];
        Evolutions.fallbackUsed = false;
        Evolutions.lastLoadEpoch = nextEpoch();
        safeLog("LOAD_EMPTY");
        return;
      }

      const filtered = filterValidEvolutions(loadedList, nowMs);

      for (const evo of filtered) {
        evo.score = scoreEvolution(evo, nowMs);
      }

      Evolutions.list = filtered;
      Evolutions.loaded = true;
      Evolutions.fallbackUsed = usedFallback;
      Evolutions.lastLoadEpoch = nextEpoch();

      safeLog("LOAD_DONE", {
        count: Evolutions.list.length,
        fallbackUsed: Evolutions.fallbackUsed,
        driftFiltered: Evolutions.lastDriftFilteredCount,
        expiredFiltered: Evolutions.lastExpiredFilteredCount
      });
    } catch (err) {
      warn("[PulseCoreEvolutions-v20] LOAD_ERROR", String(err));
    }
  }

  // -------------------------------------------------------------------------
  //  FLUSH (WRITE TO BOTH BANDS)
  // -------------------------------------------------------------------------
  function flush() {
    try {
      const json = JSON.stringify(Evolutions.list);

      if (primaryStorage) {
        primaryStorage.setItem(EVO_PRIMARY, json);
      }
      if (secondaryStorage) {
        secondaryStorage.setItem(EVO_SECONDARY, json);
      }

      safeLog("FLUSH_OK", { count: Evolutions.list.length });
    } catch (err) {
      warn("[PulseCoreEvolutions-v20] FLUSH_ERROR", String(err));
    }
  }

  // -------------------------------------------------------------------------
  //  REGISTER EVOLUTION (v20 IMMORTAL)
  // -------------------------------------------------------------------------
  function registerEvolution({ id, routeId, delta, band = "symbolic" }) {
    if (!id || !delta || typeof delta !== "object") {
      warn("[PulseCoreEvolutions-v20] INVALID_EVOLUTION", { id, routeId });
      return;
    }

    const nowMs = Date.now();

    const evo = {
      id,
      dnaTag,
      routeId: routeId || "global",
      delta,
      timestamp: nowMs,
      band,
      ttlMs: EVO_TTL_MS
    };

    assignLineage(evo);
    evo.score = scoreEvolution(evo, nowMs);

    Evolutions.list.push(evo);

    safeLog("REGISTER", {
      id: evo.id,
      routeId: evo.routeId,
      band: evo.band,
      score: evo.score,
      lineage: evo.lineage
    });
  }

  // -------------------------------------------------------------------------
  //  APPLY EVOLUTIONS (v20 IMMORTAL)
  // -------------------------------------------------------------------------
  function applyEvolutions(applyFn) {
    if (typeof applyFn !== "function") {
      warn("[PulseCoreEvolutions-v20] APPLY_FN_REQUIRED");
      return;
    }

    const sorted = [...Evolutions.list].sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return (a.timestamp || 0) - (b.timestamp || 0);
    });

    for (const evo of sorted) {
      try {
        let effectiveDelta = evo.delta;

        if (overlay && typeof overlay.transform === "function") {
          try {
            const transformed = overlay.transform(evo);
            if (transformed === null) {
              safeLog("APPLY_SKIPPED_BY_OVERLAY", { id: evo.id });
              continue;
            }
            if (typeof transformed === "object") {
              effectiveDelta = transformed;
            }
          } catch (err) {
            warn("[PulseCoreEvolutions-v20] OVERLAY_TRANSFORM_ERROR", String(err));
          }
        }

        applyFn({
          id: evo.id,
          routeId: evo.routeId,
          dnaTag: evo.dnaTag,
          band: evo.band,
          lineage: evo.lineage,
          ancestry: evo.ancestry,
          score: evo.score,
          delta: effectiveDelta
        });
      } catch (err) {
        warn("[PulseCoreEvolutions-v20] APPLY_ERROR", {
          evoId: evo.id,
          error: String(err)
        });
      }
    }

    Evolutions.lastApplyEpoch = nextEpoch();
    safeLog("APPLY_DONE", { count: sorted.length });
  }

  // -------------------------------------------------------------------------
  //  CLEAR / RESET
  // -------------------------------------------------------------------------
  function clearAll() {
    Evolutions.list = [];
    Evolutions.fallbackUsed = false;
    Evolutions.lastDriftFilteredCount = 0;
    Evolutions.lastExpiredFilteredCount = 0;
    flush();
    safeLog("CLEAR_ALL");
  }

  // -------------------------------------------------------------------------
  //  PUBLIC API
  // -------------------------------------------------------------------------
  const PulseCoreEvolutions = {
    meta: PulseCoreEvolutionsMeta,
    pulseRole,
    surfaceMeta,
    pulseLoreContext,
    AI_EXPERIENCE_META,
    EXPORT_META,

    Evolutions,

    load,
    flush,

    registerEvolution,
    applyEvolutions,
    clearAll,

    dnaTag,
    version,
    overlay
  };

  load();

  safeLog("INIT", {
    identity: PulseCoreEvolutionsMeta.identity,
    version: PulseCoreEvolutionsMeta.version,
    dnaTag,
    overlayAware: !!overlay
  });

  return PulseCoreEvolutions;
}
