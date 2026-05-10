// ============================================================================
//  PulseCoreBrain.js — v24-IMMORTAL-BRAIN++
//  ORGANISM‑WIDE PATTERN INTELLIGENCE ENGINE
//  “THINK ONCE. REUSE FOREVER. NEVER DRIFT.”
// ============================================================================

import { OrganismIdentity } from "../PULSE-X/PulseWorldOrganismMap-v21.js";

const Identity = OrganismIdentity(import.meta.url);

// ============================================================================
//  META BLOCK — v24 IMMORTAL (from genome)
// ============================================================================
export const PulseCoreBrainMeta = Identity.OrganMeta;

// ============================================================================
//  SURFACE / ORGANISM LAYER EXPORTS — v24 IMMORTAL
// ============================================================================
export const pulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;

export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

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

// deterministic epoch for pattern creation
let BRAIN_EPOCH = 0;
function nextBrainEpoch() {
  BRAIN_EPOCH += 1;
  return BRAIN_EPOCH;
}

// ============================================================================
//  CREATE BRAIN (v24-IMMORTAL-BRAIN++)
// ============================================================================
export function createPulseCoreBrain({
  dnaTag = "default-dna",
  version = "24.0-IMMORTAL-BRAIN",
  overlay = null,
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
    try { log("[PulseCoreBrain-v24]", stage, JSON.stringify(details)); }
    catch {}
  }

  // -------------------------------------------------------------------------
  //  INTERNAL: ADVANTAGE SCORING (v24)
// -------------------------------------------------------------------------
  function scorePattern(meta) {
    let score = 0;

    if (meta.dnaTag === dnaTag) score += 2;
    if (meta.routeId && meta.routeId !== "global") score += 1;
    if (meta.type) score += 1;
    if (meta.band === "binary") score += 1;

    // v24: semantic‑aware bonus if available
    try {
      if (coreMemory && coreMemory.semanticMemory_v24) {
        const persona = coreMemory.semanticMemory_v24.persona?.() || {};
        if (persona.depth === "deep") score += 1;
        if (persona.curiosity === "high") score += 1;
      }
    } catch {}

    if (overlay && typeof overlay.scorePattern === "function") {
      try {
        const overlayScore = overlay.scorePattern(meta);
        if (typeof overlayScore === "number") {
          score += overlayScore;
        }
      } catch (err) {
        warn("[PulseCoreBrain-v24] OVERLAY_SCORE_ERROR", String(err));
      }
    }

    return score;
  }

  // -------------------------------------------------------------------------
  //  INTERNAL: LINEAGE + ANCESTRY (v24)
// -------------------------------------------------------------------------
  function assignLineage(meta) {
    meta.lineage = `${dnaTag}:${version}:${meta.patternId}`;
    meta.ancestry = [dnaTag, version];
  }

  // -------------------------------------------------------------------------
  //  LOAD FROM CORE MEMORY (v24)
// -------------------------------------------------------------------------
  function loadFromCoreMemory() {
    if (!coreMemory) return;
    try {
      const snapshot = coreMemory.getRouteSnapshot(coreMemoryRouteId) || {};
      Patterns.byId = snapshot.byId || Object.create(null);
      Patterns.index = snapshot.index || Object.create(null);

      // v24: restore semantic snapshot if present
      if (coreMemory.importSemanticSnapshotBinary && snapshot.semanticBinary) {
        try {
          coreMemory.importSemanticSnapshotBinary(snapshot.semanticBinary);
        } catch (err) {
          warn("[PulseCoreBrain-v24] SEMANTIC_RESTORE_ERROR", String(err));
        }
      }

      safeLog("LOAD_FROM_CORE_MEMORY", {
        patterns: Object.keys(Patterns.byId).length,
        routeId: coreMemoryRouteId
      });
    } catch (err) {
      warn("[PulseCoreBrain-v24] LOAD_FROM_CORE_MEMORY_ERROR", String(err));
    }
  }

  // -------------------------------------------------------------------------
  //  FLUSH TO CORE MEMORY (v24)
// -------------------------------------------------------------------------
  function flushToCoreMemory() {
    if (!coreMemory) return;
    try {
      const snapshot = {
        byId: Patterns.byId,
        index: Patterns.index
      };

      // v24: persist semantic snapshot if available
      if (coreMemory.exportSemanticSnapshotBinary) {
        try {
          snapshot.semanticBinary = coreMemory.exportSemanticSnapshotBinary();
        } catch (err) {
          warn("[PulseCoreBrain-v24] SEMANTIC_SNAPSHOT_ERROR", String(err));
        }
      }

      coreMemory.setRouteSnapshot(coreMemoryRouteId, snapshot);

      safeLog("FLUSH_TO_CORE_MEMORY", {
        patterns: Object.keys(Patterns.byId).length,
        routeId: coreMemoryRouteId
      });
    } catch (err) {
      warn("[PulseCoreBrain-v24] FLUSH_TO_CORE_MEMORY_ERROR", String(err));
    }
  }

  // -------------------------------------------------------------------------
  //  REGISTER PATTERN (v24-IMMORTAL)
// -------------------------------------------------------------------------
  function registerPattern(struct, meta = {}) {
    const normalized = normalizeStructure(struct || {});
    const existingId = Patterns.index[normalized];

    if (existingId) {
      const existing = Patterns.byId[existingId];

      // v24: feed reuse into semantic memory if present
      try {
        if (coreMemory && coreMemory.semanticMemory_v24) {
          coreMemory.semanticMemory_v24.addItem({
            type: "pattern-reuse",
            patternId: existingId,
            meta: existing.meta,
            timestamp: Date.now()
          });
          if (coreMemory.incrementalSemanticScan) {
            coreMemory.incrementalSemanticScan();
          }
        }
      } catch {}

      return {
        patternId: existingId,
        canonical: existing.canonical,
        reused: true,
        meta: existing.meta
      };
    }

    const patternId = simpleHash(normalized);

    const band = meta.band || "symbolic";
    const routeId = meta.routeId || "global";

    const enrichedMeta = {
      ...meta,
      dnaTag,
      version,
      band,
      routeId,
      patternId,
      createdEpoch: nextBrainEpoch()
    };

    assignLineage(enrichedMeta);
    enrichedMeta.score = scorePattern(enrichedMeta);

    Patterns.index[normalized] = patternId;
    Patterns.byId[patternId] = {
      canonical: struct,
      meta: enrichedMeta
    };

    // v24: feed new pattern into semantic memory if present
    try {
      if (coreMemory && coreMemory.semanticMemory_v24) {
        coreMemory.semanticMemory_v24.addItem({
          type: "pattern-new",
          patternId,
          meta: enrichedMeta,
          structure: struct,
          timestamp: Date.now()
        });
        if (coreMemory.incrementalSemanticScan) {
          coreMemory.incrementalSemanticScan();
        }
      }
    } catch {}

    if (overlay && typeof overlay.touch === "function") {
      try { overlay.touch("brain", enrichedMeta.createdEpoch, enrichedMeta); }
      catch {}
    }

    safeLog("REGISTER_PATTERN", {
      patternId,
      score: enrichedMeta.score,
      band,
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
  //  FORMULA REGISTRATION (v24)
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
  //  PUBLIC API
  // -------------------------------------------------------------------------
  const PulseCoreBrain = {
    meta: PulseCoreBrainMeta,
    pulseRole,
    surfaceMeta,
    pulseLoreContext,
    AI_EXPERIENCE_META,
    EXPORT_META,

    Patterns,

    loadFromCoreMemory,
    flushToCoreMemory,

    registerPattern,
    getPattern,
    registerFormula,

    clearAll,

    dnaTag,
    version,
    overlay,
    coreMemoryRouteId
  };

  loadFromCoreMemory();

  safeLog("INIT", {
    identity: PulseCoreBrainMeta.identity,
    version: PulseCoreBrainMeta.version,
    dnaTag
  });

  return PulseCoreBrain;
}
