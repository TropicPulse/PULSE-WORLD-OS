// ============================================================================
//  PulseCoreEvolutions.js — v30-IMMORTAL-ADVANTAGE
//  ORGANISM‑WIDE EVOLUTION ENGINE (PURE, MAP‑STRIPPED, BINARY‑READY)
//  “KNOW EVERY ADVANTAGE. APPLY ONLY THE CORRECT ONE. NEVER DRIFT.”
//  NO META MAP • NO SCORING MAP • NO BAND MAP • NO LINEAGE MAP
// ============================================================================


// ============================================================================
//  STORAGE KEYS (PRIMARY + SECONDARY) — v30
// ============================================================================
const EVO_PRIMARY   = "pulse-core-evolutions-v30-primary";
const EVO_SECONDARY = "pulse-core-evolutions-v30-secondary";

const EVO_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

// deterministic epoch counter (internal only, not exported)
let EVO_EPOCH_COUNTER = 0;
function nextEpoch() {
  EVO_EPOCH_COUNTER += 1;
  return EVO_EPOCH_COUNTER;
}

// ============================================================================
//  CREATE EVOLUTION ENGINE — v30 IMMORTAL (MAP‑STRIPPED)
// ============================================================================
export function createPulseCoreEvolutions({
  primaryStorage = typeof window !== "undefined" ? window.localStorage : null,
  secondaryStorage = typeof window !== "undefined" ? window.sessionStorage : null,
  dnaTag = "default-dna",
  version = "30.0-IMMORTAL-ADVANTAGE",
  log = console.log,
  warn = console.warn
} = {}) {

  const Evolutions = {
    loaded: false,
    list: [],
    lastLoadEpoch: 0,
    lastApplyEpoch: 0,
    fallbackUsed: false,
    lastExpiredFilteredCount: 0
  };

  function safeLog(stage, details = {}) {
    try { log("[PulseCoreEvolutions-v30]", stage, JSON.stringify(details)); }
    catch {}
  }

  // -------------------------------------------------------------------------
  //  TTL FILTERING (v30) — no dna/version drift map, just TTL
  // -------------------------------------------------------------------------
  function filterValidEvolutions(list, nowMs) {
    const valid = [];
    let expiredFiltered = 0;

    for (const e of list) {
      if (typeof e.timestamp === "number" && nowMs - e.timestamp >= EVO_TTL_MS) {
        expiredFiltered++;
        continue;
      }
      valid.push(e);
    }

    Evolutions.lastExpiredFilteredCount = expiredFiltered;
    return valid;
  }

  // -------------------------------------------------------------------------
  //  LOAD (PRIMARY → SECONDARY, TTL ONLY, NO DRIFT MAP)
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

      Evolutions.list = filtered;
      Evolutions.loaded = true;
      Evolutions.fallbackUsed = usedFallback;
      Evolutions.lastLoadEpoch = nextEpoch();

      safeLog("LOAD_DONE", {
        count: Evolutions.list.length,
        fallbackUsed: Evolutions.fallbackUsed,
        expiredFiltered: Evolutions.lastExpiredFilteredCount
      });
    } catch (err) {
      warn("[PulseCoreEvolutions-v30] LOAD_ERROR", String(err));
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
      warn("[PulseCoreEvolutions-v30] FLUSH_ERROR", String(err));
    }
  }

  // -------------------------------------------------------------------------
  //  REGISTER EVOLUTION — v30 IMMORTAL (NO SCORE, NO LINEAGE MAP)
// -------------------------------------------------------------------------
  function registerEvolution({ id, routeId, delta }) {
    if (!id || !delta || typeof delta !== "object") {
      warn("[PulseCoreEvolutions-v30] INVALID_EVOLUTION", { id, routeId });
      return;
    }

    const nowMs = Date.now();

    const evo = {
      id,
      dnaTag,
      routeId: routeId || "global",
      delta,
      timestamp: nowMs,
      ttlMs: EVO_TTL_MS
    };

    Evolutions.list.push(evo);

    safeLog("REGISTER", {
      id: evo.id,
      routeId: evo.routeId
    });
  }

  // -------------------------------------------------------------------------
  //  APPLY EVOLUTIONS — v30 IMMORTAL (ORDERED BY TIMESTAMP ONLY)
// -------------------------------------------------------------------------
  function applyEvolutions(applyFn) {
    if (typeof applyFn !== "function") {
      warn("[PulseCoreEvolutions-v30] APPLY_FN_REQUIRED");
      return;
    }

    const sorted = [...Evolutions.list].sort((a, b) => {
      return (a.timestamp || 0) - (b.timestamp || 0);
    });

    for (const evo of sorted) {
      try {
        applyFn({
          id: evo.id,
          routeId: evo.routeId,
          dnaTag: evo.dnaTag,
          delta: evo.delta,
          timestamp: evo.timestamp
        });
      } catch (err) {
        warn("[PulseCoreEvolutions-v30] APPLY_ERROR", {
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
    Evolutions.lastExpiredFilteredCount = 0;
    flush();
    safeLog("CLEAR_ALL");
  }

  // -------------------------------------------------------------------------
  //  PUBLIC API — v30 (META‑STRIPPED, IDENTITY‑LIGHT)
// -------------------------------------------------------------------------
  const PulseCoreEvolutions = {
    Evolutions,

    load,
    flush,

    registerEvolution,
    applyEvolutions,
    clearAll,

    dnaTag,
    version
  };

  load();

  safeLog("INIT", {
    version,
    dnaTag
  });

  return PulseCoreEvolutions;
}
