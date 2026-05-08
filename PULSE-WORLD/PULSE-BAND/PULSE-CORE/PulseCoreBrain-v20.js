// ============================================================================
//  PulseCoreBrain.js — v20-IMMORTAL-BRAIN
//  ORGANISM‑WIDE PATTERN INTELLIGENCE ENGINE
//  “THINK ONCE. REUSE FOREVER. NEVER DRIFT.”
//  • v20 AI_EXPERIENCE_META (IMMORTAL identity)
//  • dnaTag + version aware
//  • presence / band / route aware (via meta + overlay)
//  • lineage + ancestry
//  • advantage scoring (band + route + dnaTag)
//  • dual‑band metadata alignment
//  • CoreMemory persistence (route‑scoped)
//  • deterministic canonicalization (structural)
// ============================================================================

/*
@PULSE_IMMORTAL_REQUIRE_FULL_META
This organ requires FULL IMMORTAL++ metadata on every upgrade:
- AI_EXPERIENCE_META + AI_EXPERIENCE_CONTEXT
- Full organ metadata + evo flags + lineage
- Full contract (input/output/consumers)
- Full experience surfaces (band/wave/binary/presence/advantage/speed)
- Full IMMORTAL++ overlays (drift, pressure, stability, load)
- Full chunk/cache/prewarm overlays
- Full world‑lens, limbic, tri‑heart, impulse‑speed awareness
- Full healing surfaces + diagnostics
Always include ALL layers, ALL overlays, ALL IMMORTAL++ structures.
*/

// ============================================================================
//  AI_EXPERIENCE_META (IMMORTAL++)
// ============================================================================
export const AI_EXPERIENCE_META_PulseCoreBrain = {
  id: "corememory.brain",
  identity: "PulseCoreBrain",
  version: "v20-IMMORTAL-BRAIN",
  layer: "corememory_brain",
  role: "corememory_symbolic_brain",
  lineage: "PulseCoreMemory-v20-IMMORTAL",

  evo: {
    symbolicPrimary: true,
    binaryAware: true,
    dualBand: true,

    memoryShaping: true,
    memoryPhysics: true,
    overlayManagement: true,
    hydrationPlanning: true,

    deterministic: true,
    driftProof: true,
    pureCompute: true,

    zeroMutationOfInput: true,
    zeroNetwork: true,
    zeroFilesystem: true
  },

  contract: {
    always: [
      "PulseBinaryCoreOverlay",
      "PulseCoreEvolution",
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
    band: ["symbolic", "patterns", "intelligence"],
    wave: ["deterministic", "structural", "canonical"],
    binary: ["registerPattern", "registerFormula", "getPattern"],
    presence: ["pattern_presence_touch"],
    advantage: ["reuse", "dedupe", "lineage_score"],
    speed: "hot_loop"
  }
};

// ============================================================================
//  AI_EXPERIENCE_CONTEXT
// ============================================================================
export const AI_EXPERIENCE_CONTEXT_PulseCoreBrain = {
  tone: "technical_silent",
  pacing: "instant",
  emotionalBand: "none_direct",
  primaryIntent: "canonicalize_symbolic_patterns",
  secondaryIntent: "maintain_pattern_intelligence",
  visualNotes: {
    icon: "ai_brain",
    motion: "none",
    colorBand: "infra_core"
  },
  worldLens: {
    awareOfWorlds: true,
    notes: "routeId may encode world; patterns remain route-scoped."
  },
  presenceLens: {
    awareOfPresence: true,
    notes: "future: presence intensity may bias pattern scoring."
  },
  settingsLens: {
    awareOfSettings: true,
    notes: "future: settings may tune pattern TTL or scoring weights."
  }
};
export const CoreBrainMetaBlock = {
  identity: "PulseCoreBrain",
  subsystem: "Core",
  layer: "Brain",
  role: "Pattern-Intelligence",
  version: "20.0-IMMORTAL-BRAIN",
  evo: {
    deterministic: true,
    binaryNative: true,
    routeAware: true,
    dnaAware: true,
    governorAligned: true,
    memoryAligned: true,
    presenceAware: true,
    versionAware: true,
    lineageAware: true,
    advantageAware: true,
    bandAware: true,
    overlayAware: true
  }
};

// ============================================================================
//  CORE ORGAN META
// ============================================================================
export const CORE_MEMORY_META_PulseCoreBrain = {
  id: "organ.corememory.brain",
  subsystem: "CoreMemory",
  layer: "Brain",
  tier: "IMMORTAL",
  role: "Pattern-Intelligence",
  lineage: {
    family: "corememory_brain",
    generation: 4,
    coreVersion: "v20"
  },
  evoFlags: {
    deterministic: true,
    binaryNative: true,
    routeAware: true,
    dnaAware: true,
    governorAligned: true,
    memoryAligned: true,
    presenceAware: true,
    versionAware: true,
    lineageAware: true,
    advantageAware: true,
    bandAware: true,
    overlayAware: true
  }
};

// ============================================================================
//  CORE ORGAN CONTRACT
// ============================================================================
export const CORE_MEMORY_CONTRACT_PulseCoreBrain = {
  inputs: {
    dnaTag: "string",
    version: "string",
    overlay: "BinaryOverlay",
    coreMemory: "CoreMemoryInterface",
    coreMemoryRouteId: "string",
    log: "function",
    warn: "function"
  },
  outputs: {
    registerPattern: "function(struct, meta?)",
    registerFormula: "function(formulaStr, meta?)",
    getPattern: "function(patternId)",
    loadFromCoreMemory: "function()",
    flushToCoreMemory: "function()",
    clearAll: "function()"
  },
  consumers: [
    "PulseCoreMemory",
    "PulseBinaryCoreOverlay",
    "PulseCoreEvolution",
    "PulseCoreGovernor",
    "PulseCoreSettings",
    "PulseCorePresence"
  ],
  guarantees: {
    deterministic: true,
    noNetwork: true,
    noFilesystem: true,
    noGlobalMutation: true
  }
};

// ============================================================================
//  IMMORTAL OVERLAYS
// ============================================================================
export const IMMORTAL_OVERLAYS_PulseCoreBrain = {
  drift: {
    allowed: false,
    notes: "Pattern canonicalization must never drift."
  },
  pressure: {
    expectedLoad: "high",
    notes: "Patterns are registered frequently across the organism."
  },
  stability: {
    algorithm: "stable",
    layout: "stable",
    notes: "Only additive evolution allowed."
  },
  load: {
    maxPatternsHint: 4096,
    notes: "Pattern index kept bounded by structural dedupe."
  },
  chunking: {
    prewarm: ["corememory.brain", "corememory.binary.overlay"],
    cacheKey: "corememory.brain.v20"
  },
  worldLens: {
    awareOfWorlds: true,
    notes: "Patterns remain route-scoped; world-specific patterns possible."
  },
  limbic: {
    band: "none_direct",
    notes: "Indirect emotional impact via reliability + clarity."
  },
  triHeart: {
    cognitive: "pattern_intelligence",
    emotional: "none_direct",
    behavioral: "reuse_and_canonicalize"
  },
  impulseSpeed: {
    primaryAction: "registerPattern",
    latencyTargetNs: 50000
  },
  healingSurfaces: {
    enabled: true,
    notes: "Pattern dedupe reduces fragmentation and drift."
  }
};

// ============================================================================
//  ROLE
// ============================================================================
export const CoreBrainRole = {
  type: "Organ",
  subsystem: "Core",
  layer: "Brain",
  identity: "PulseCoreBrain",
  version: "20.0-IMMORTAL-BRAIN",

  evo: {
    deterministic: true,
    binaryNative: true,
    routeAware: true,
    dnaAware: true,
    governorAligned: true,
    memoryAligned: true,
    presenceAware: true,
    versionAware: true,
    lineageAware: true,
    advantageAware: true,
    bandAware: true,
    overlayAware: true
  }
};

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
//  CREATE BRAIN (v20-IMMORTAL-BRAIN)
// ============================================================================
export function createPulseCoreBrain({
  dnaTag = "default-dna",
  version = "20.0-IMMORTAL-BRAIN",
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
    try { log("[PulseCoreBrain-v20]", stage, JSON.stringify(details)); }
    catch {}
  }

  // -------------------------------------------------------------------------
  //  INTERNAL: ADVANTAGE SCORING (v20)
  // -------------------------------------------------------------------------
  function scorePattern(meta) {
    let score = 0;

    if (meta.dnaTag === dnaTag) score += 2;
    if (meta.routeId && meta.routeId !== "global") score += 1;
    if (meta.type) score += 1;
    if (meta.band === "binary") score += 1;

    if (overlay && typeof overlay.scorePattern === "function") {
      try {
        const overlayScore = overlay.scorePattern(meta);
        if (typeof overlayScore === "number") {
          score += overlayScore;
        }
      } catch (err) {
        warn("[PulseCoreBrain-v20] OVERLAY_SCORE_ERROR", String(err));
      }
    }

    return score;
  }

  // -------------------------------------------------------------------------
  //  INTERNAL: LINEAGE + ANCESTRY (v20)
  // -------------------------------------------------------------------------
  function assignLineage(meta) {
    meta.lineage = `${dnaTag}:${version}:${meta.patternId}`;
    meta.ancestry = [dnaTag, version];
  }

  // -------------------------------------------------------------------------
  //  LOAD FROM CORE MEMORY (v20)
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
      warn("[PulseCoreBrain-v20] LOAD_FROM_CORE_MEMORY_ERROR", String(err));
    }
  }

  // -------------------------------------------------------------------------
  //  FLUSH TO CORE MEMORY (v20)
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
      warn("[PulseCoreBrain-v20] FLUSH_TO_CORE_MEMORY_ERROR", String(err));
    }
  }

  // -------------------------------------------------------------------------
  //  REGISTER PATTERN (v20-IMMORTAL)
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
  //  FORMULA REGISTRATION (v20)
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
    CoreBrainRole,
    CoreBrainMetaBlock,
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
    coreMemoryRouteId,

    // IMMORTAL meta exports
    AI_EXPERIENCE_META_PulseCoreBrain,
    AI_EXPERIENCE_CONTEXT_PulseCoreBrain,
    CORE_MEMORY_META_PulseCoreBrain,
    CORE_MEMORY_CONTRACT_PulseCoreBrain,
    IMMORTAL_OVERLAYS_PulseCoreBrain
  };

  loadFromCoreMemory();

  safeLog("INIT", {
    identity: CoreBrainRole.identity,
    version: CoreBrainRole.version,
    dnaTag
  });

  return PulseCoreBrain;
}
