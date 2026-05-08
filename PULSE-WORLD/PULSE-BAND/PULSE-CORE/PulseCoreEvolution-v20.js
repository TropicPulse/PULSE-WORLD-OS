// ============================================================================
//  PulseCoreEvolutions.js — v20-IMMORTAL-ADVANTAGE
//  ORGANISM‑WIDE EVOLUTION ENGINE
//  “KNOW EVERY ADVANTAGE. APPLY ONLY THE CORRECT ONE. NEVER DRIFT.”
//  • v20 AI_EXPERIENCE_META (IMMORTAL identity)
//  • dnaTag + version aware
//  • presence / band / route aware
//  • dual‑band evolution logs (primary + secondary storage)
//  • lineage tracking (per evolution)
//  • ancestry tracking (dnaTag + version)
//  • drift detection (dna/version mismatch + TTL)
//  • healing via clear/reset + fallback band
//  • TTL (time‑bounded evolutions)
//  • advantage scoring (route, dna, recency, overlay hints)
//  • deterministic delta application (applyEvolutions)
// ============================================================================

/*
@PULSE_IMMORTAL_REQUIRE_FULL_META
*/

// ============================================================================
//  AI_EXPERIENCE_META (IMMORTAL++)
// ============================================================================
export const AI_EXPERIENCE_META_PulseCoreEvolutions = {
  id: "corememory.evolution",
  identity: "PulseCoreEvolutions",
  version: "v20-IMMORTAL-ADVANTAGE",
  layer: "corememory_evolution",
  role: "corememory_evolution_engine",
  lineage: "PulseCoreMemory-v20-IMMORTAL",

  evo: {
    evolutionEngine: true,
    versionMigration: true,
    dnaTagging: true,
    hotLoopPromotion: true,
    healingLogic: true,

    symbolicPrimary: true,
    binaryAware: true,
    dualBand: true,

    deterministic: true,
    driftProof: true,
    pureCompute: true,

    zeroMutationOfInput: true,
    zeroNetwork: true,
    zeroFilesystem: false,
    zeroRandomnessInCore: true
  },

  contract: {
    always: [
      "PulseCoreBrain",
      "PulseBinaryCoreOverlay",
      "PulseCoreGovernor",
      "PulseCoreMemory",
      "PulseCoreLayers",
      "PulseCoreSettings",
      "PulseCorePresence"
    ],
    never: [
      "safeRoute",
      "fetchViaCNS"
    ]
  },

  surfaces: {
    band: ["evolution", "advantage", "delta"],
    wave: ["deterministic", "healing", "route_scoped"],
    binary: ["registerEvolution", "applyEvolutions"],
    presence: ["evolution_presence_touch"],
    advantage: ["scoreEvolution", "ttl_filter", "lineage_filter"],
    speed: "hot_loop"
  }
};

// ============================================================================
//  AI_EXPERIENCE_CONTEXT
// ============================================================================
export const AI_EXPERIENCE_CONTEXT_PulseCoreEvolutions = {
  tone: "technical_silent",
  pacing: "instant",
  emotionalBand: "none_direct",
  primaryIntent: "apply_deterministic_evolution_deltas",
  secondaryIntent: "maintain_advantage_ordering",
  visualNotes: {
    icon: "evolution",
    motion: "none",
    colorBand: "infra_core"
  },
  worldLens: {
    awareOfWorlds: true,
    notes: "routeId may encode world; evolutions remain route-scoped."
  },
  presenceLens: {
    awareOfPresence: true,
    notes: "future: presence intensity may bias evolution scoring."
  },
  settingsLens: {
    awareOfSettings: true,
    notes: "future: settings may tune TTL or scoring weights."
  }
};

// ============================================================================
//  CORE ORGAN META
// ============================================================================
export const CORE_MEMORY_META_PulseCoreEvolutions = {
  id: "organ.corememory.evolution",
  subsystem: "CoreMemory",
  layer: "Evolution",
  tier: "IMMORTAL",
  role: "Evolution-Engine",
  lineage: {
    family: "corememory_evolution",
    generation: 4,
    coreVersion: "v20"
  },
  evoFlags: {
    deterministic: true,
    binaryNative: true,
    dualBand: true,
    fallbackable: true,
    governorAligned: true,
    brainAligned: true,
    memoryAligned: true,
    routeAware: true,
    dnaAware: true,
    presenceAware: true,
    versionAware: true,
    driftAware: true,
    lineageAware: true,
    ancestryAware: true,
    advantageAware: true,
    ttlAware: true,
    overlayAware: true,
    bandAware: true
  }
};
export const CoreEvolutionsMetaBlock = {
  identity: "PulseCoreEvolutions",
  subsystem: "Core",
  layer: "Evolution",
  role: "Evolution-Engine",
  version: "20.0-IMMORTAL-ADVANTAGE",
  evo: {
    deterministic: true,
    binaryNative: true,
    dualBand: true,
    fallbackable: true,
    governorAligned: true,
    brainAligned: true,
    memoryAligned: true,
    routeAware: true,
    dnaAware: true,
    presenceAware: true,
    versionAware: true,
    driftAware: true,
    lineageAware: true,
    ancestryAware: true,
    advantageAware: true,
    ttlAware: true,
    overlayAware: true,
    bandAware: true
  }
};

// ============================================================================
//  CORE ORGAN CONTRACT
// ============================================================================
export const CORE_MEMORY_CONTRACT_PulseCoreEvolutions = {
  inputs: {
    primaryStorage: "StorageLike",
    secondaryStorage: "StorageLike",
    dnaTag: "string",
    version: "string",
    overlay: "BinaryOverlay | null",
    log: "function",
    warn: "function"
  },
  outputs: {
    load: "function()",
    flush: "function()",
    registerEvolution: "function(evo)",
    applyEvolutions: "function(applyFn)",
    clearAll: "function()"
  },
  consumers: [
    "PulseCoreMemory",
    "PulseCoreBrain",
    "PulseBinaryCoreOverlay",
    "PulseCoreGovernor",
    "PulseCoreSettings",
    "PulseCorePresence"
  ],
  guarantees: {
    deterministic: true,
    noNetwork: true,
    noGlobalMutation: true
  }
};

// ============================================================================
//  IMMORTAL OVERLAYS
// ============================================================================
export const IMMORTAL_OVERLAYS_PulseCoreEvolutions = {
  drift: {
    allowed: false,
    notes: "Evolution semantics must never drift."
  },
  pressure: {
    expectedLoad: "medium",
    notes: "Evolutions are applied less frequently than patterns or memory."
  },
  stability: {
    algorithm: "stable",
    layout: "stable",
    notes: "Only additive evolution allowed."
  },
  load: {
    maxEvolutionsHint: 2048,
    notes: "TTL + drift filtering keep list bounded."
  },
  chunking: {
    prewarm: ["corememory.evolution", "corememory.brain"],
    cacheKey: "corememory.evolution.v20"
  },
  worldLens: {
    awareOfWorlds: true,
    notes: "routeId may encode world; evolutions remain route-scoped."
  },
  limbic: {
    band: "none_direct",
    notes: "Indirect emotional impact via stability."
  },
  triHeart: {
    cognitive: "evolution_engine",
    emotional: "none_direct",
    behavioral: "apply_deltas"
  },
  impulseSpeed: {
    primaryAction: "applyEvolutions",
    latencyTargetNs: 80000
  },
  healingSurfaces: {
    enabled: true,
    notes: "TTL + drift filtering heal corrupted evolution logs."
  }
};

// ============================================================================
//  ROLE
// ============================================================================
export const CoreEvolutionsRole = {
  type: "Organ",
  subsystem: "Core",
  layer: "Evolution",
  identity: "PulseCoreEvolutions",
  version: "20.0-IMMORTAL-ADVANTAGE",

  evo: CORE_MEMORY_META_PulseCoreEvolutions.evoFlags
};

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
  primaryStorage = typeof window !== "undefined" ? window.localStorage : null,
  secondaryStorage = typeof window !== "undefined" ? window.sessionStorage : null,
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
    CoreEvolutionsRole,
    CoreEvolutionsMetaBlock,
    Evolutions,

    load,
    flush,

    registerEvolution,
    applyEvolutions,
    clearAll,

    dnaTag,
    version,
    overlay,

    // IMMORTAL meta exports
    AI_EXPERIENCE_META_PulseCoreEvolutions,
    AI_EXPERIENCE_CONTEXT_PulseCoreEvolutions,
    CORE_MEMORY_META_PulseCoreEvolutions,
    CORE_MEMORY_CONTRACT_PulseCoreEvolutions,
    IMMORTAL_OVERLAYS_PulseCoreEvolutions
  };

  load();

  safeLog("INIT", {
    identity: CoreEvolutionsRole.identity,
    version: CoreEvolutionsRole.version,
    dnaTag,
    overlayAware: !!overlay
  });

  return PulseCoreEvolutions;
}
