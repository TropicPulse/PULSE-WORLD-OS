// ============================================================================
//  PulseCoreBrain.js — v30-IMMORTAL-BRAIN
//  ORGANISM‑WIDE PATTERN INTELLIGENCE ENGINE (MAP‑STRIPPED, BINARY‑READY)
//  “THINK ONCE. REUSE FOREVER. NEVER DRIFT.”
//  NO META MAP • NO SCORE MAP • NO SEMANTIC MAP • NO OVERLAY MAP
// ============================================================================


// ============================================================================
//  SIMPLE HASH / ID HELPERS (STRUCTURAL, NOT CRYPTO)
// ============================================================================
function simpleHash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) | 0;
  }
  return "patt-" + (h >>> 0).toString(16);
}

function normalizeStructure(struct) {
  try {
    return JSON.stringify(struct, Object.keys(struct).sort());
  } catch {
    return JSON.stringify(struct || {});
  }
}

// deterministic epoch for pattern creation (internal only)
let BRAIN_EPOCH = 0;
function nextBrainEpoch() {
  BRAIN_EPOCH += 1;
  return BRAIN_EPOCH;
}

// ============================================================================
//  CREATE BRAIN (v30-IMMORTAL-BRAIN)
// ============================================================================
export function createPulseCoreBrain({
  dnaTag = "default-dna",
  version = "30.0-IMMORTAL-BRAIN",
  coreMemory = null,
  coreMemoryRouteId = "brain-patterns",
  log = console.log,
  warn = console.warn
} = {}) {

  const Patterns = {
    byId: Object.create(null),
    index: Object.create(null)
  };

  function safeLog(stage, details = {}) {
    try { log("[PulseCoreBrain-v30]", stage, JSON.stringify(details)); }
    catch {}
  }

  // -------------------------------------------------------------------------
  //  LOAD FROM CORE MEMORY — v30 (no semantic, no overlay)
// -------------------------------------------------------------------------
  function loadFromCoreMemory() {
    if (!coreMemory) return;
    try {
      const snapshot = coreMemory.getRouteSnapshot(coreMemoryRouteId) || {};
      Patterns.byId = snapshot.byId || Object.create(null);
      Patterns.index = snapshot.index || Object.create(null);

      safeLog("LOAD_FROM_CORE_MEMORY", {
        patterns: Object.keys(Patterns.byId).length,
        routeId: coreMemoryRouteId
      });
    } catch (err) {
      warn("[PulseCoreBrain-v30] LOAD_FROM_CORE_MEMORY_ERROR", String(err));
    }
  }

  // -------------------------------------------------------------------------
  //  FLUSH TO CORE MEMORY — v30 (pure pattern snapshot)
// -------------------------------------------------------------------------
  function flushToCoreMemory() {
    if (!coreMemory) return;
    try {
      const snapshot = {
        byId: Patterns.byId,
        index: Patterns.index
      };

      coreMemory.setRouteSnapshot(coreMemoryRouteId, snapshot);

      safeLog("FLUSH_TO_CORE_MEMORY", {
        patterns: Object.keys(Patterns.byId).length,
        routeId: coreMemoryRouteId
      });
    } catch (err) {
      warn("[PulseCoreBrain-v30] FLUSH_TO_CORE_MEMORY_ERROR", String(err));
    }
  }

  // -------------------------------------------------------------------------
  //  REGISTER PATTERN — v30 (no score, no lineage map, no semantic)
// -------------------------------------------------------------------------
  function registerPattern(struct, meta = {}) {
    const normalized = normalizeStructure(struct || {});
    const existingId = Patterns.index[normalized];

    if (existingId) {
      const existing = Patterns.byId[existingId];
      return {
        patternId: existingId,
        canonical: existing.canonical,
        reused: true,
        meta: existing.meta
      };
    }

    const patternId = simpleHash(normalized);
    const routeId = meta.routeId || "global";

    const enrichedMeta = {
      ...meta,
      dnaTag,
      version,
      routeId,
      patternId,
      createdEpoch: nextBrainEpoch()
    };

    Patterns.index[normalized] = patternId;
    Patterns.byId[patternId] = {
      canonical: struct,
      meta: enrichedMeta
    };

    safeLog("REGISTER_PATTERN", {
      patternId,
      routeId
    });

    return {
      patternId,
      canonical: struct,
      reused: false,
      meta: enrichedMeta
    };
  }

  // -------------------------------------------------------------------------
  //  LOOKUP
  // -------------------------------------------------------------------------
  function getPattern(patternId) {
    return Patterns.byId[patternId] || null;
  }

  // -------------------------------------------------------------------------
  //  FORMULA REGISTRATION — v30
  // -------------------------------------------------------------------------
  function registerFormula(formulaStr, meta = {}) {
    return registerPattern(
      { type: "formula", value: formulaStr },
      meta
    );
  }

  // -------------------------------------------------------------------------
  //  CLEAR / RESET
  // -------------------------------------------------------------------------
  function clearAll() {
    Patterns.byId = Object.create(null);
    Patterns.index = Object.create(null);
    flushToCoreMemory();
    safeLog("CLEAR_ALL", { routeId: coreMemoryRouteId });
  }

  // -------------------------------------------------------------------------
  //  PUBLIC API — v30 (META‑STRIPPED, IDENTITY‑LIGHT)
// -------------------------------------------------------------------------
  const PulseCoreBrain = {
    Patterns,

    loadFromCoreMemory,
    flushToCoreMemory,

    registerPattern,
    getPattern,
    registerFormula,

    clearAll,

    dnaTag,
    version,
    coreMemoryRouteId
  };

  loadFromCoreMemory();

  safeLog("INIT", {
    version,
    dnaTag
  });

  return PulseCoreBrain;
}
