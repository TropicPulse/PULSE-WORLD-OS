// ============================================================================
//  PulseCoreGovernor.js — v20-IMMORTAL-GOVERNOR
//  ORGANISM‑WIDE CORE MEMORY GOVERNOR
//  “ONE BRAIN. ONE SPINE. MANY LAYERS. ZERO DRIFT.”
//  • v20 AI_EXPERIENCE_META (IMMORTAL identity)
//  • dnaTag + version propagation
//  • Presence / band / route propagation (via CoreLayers + overlay)
//  • TTL + healing alignment (delegated to CoreMemory)
//  • Dual‑band alignment (binary + symbolic via CoreLayers rules)
//  • Promotion/demotion hints
//  • Placement logic (route + dataType + dnaTag)
//  • Drift detection hooks (via overlay + CoreMemory)
//  • Governor‑aligned with CoreMemory v20 + CoreLayers v20
// ============================================================================

/*
@PULSE_IMMORTAL_REQUIRE_FULL_META
*/

import { CoreMemoryRole, createPulseCoreMemory } from "./PulseCoreMemory.js";
import { CoreLayersRole, PulseCoreLayersOrgan } from "./PulseCoreLayers.js";

// ============================================================================
//  AI_EXPERIENCE_META (IMMORTAL++)
// ============================================================================
export const AI_EXPERIENCE_META_PulseCoreGovernor = {
  id: "corememory.governor",
  identity: "PulseCoreGovernor",
  version: "v20-IMMORTAL-GOVERNOR",
  layer: "corememory_governor",
  role: "corememory_governor",
  lineage: "PulseCoreMemory-v20-IMMORTAL",

  evo: {
    governor: true,
    memoryPolicy: true,
    memoryPhysicsRules: true,
    adapterOrchestration: true,

    symbolicPrimary: true,
    binaryAware: true,
    dualBand: true,

    deterministic: true,
    driftProof: true,
    pureCompute: true,

    zeroMutationOfInput: true,
    zeroNetwork: true,
    zeroFilesystem: false
  },

  contract: {
    always: [
      "PulseCoreBrain",
      "PulseCoreEvolutions",
      "PulseBinaryCoreOverlay",
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
    band: ["governor", "policy", "placement"],
    wave: ["deterministic", "healing_aligned"],
    binary: ["set", "get", "flush", "getRouteSnapshot"],
    presence: ["governor_presence_touch"],
    advantage: ["placement_rules", "promotion_hints"],
    speed: "hot_loop"
  }
};

// ============================================================================
//  AI_EXPERIENCE_CONTEXT
// ============================================================================
export const AI_EXPERIENCE_CONTEXT_PulseCoreGovernor = {
  tone: "technical_silent",
  pacing: "instant",
  emotionalBand: "none_direct",
  primaryIntent: "govern_corememory_placement_and_policy",
  secondaryIntent: "maintain_dualband_alignment",
  visualNotes: {
    icon: "governor_node",
    motion: "none",
    colorBand: "infra_core"
  },
  worldLens: {
    awareOfWorlds: true,
    notes: "routeId may encode world; governor remains route-scoped."
  },
  presenceLens: {
    awareOfPresence: true,
    notes: "future: presence intensity may bias placement/promotion."
  },
  settingsLens: {
    awareOfSettings: true,
    notes: "future: settings may tune promotion thresholds and layer rules."
  }
};

// ============================================================================
//  CORE ORGAN META
// ============================================================================
export const CORE_MEMORY_META_PulseCoreGovernor = {
  id: "organ.corememory.governor",
  subsystem: "CoreMemory",
  layer: "Governor",
  tier: "IMMORTAL",
  role: "Memory-Governor",
  lineage: {
    family: "corememory_governor",
    generation: 4,
    coreVersion: "v20"
  },
  evoFlags: {
    binaryNative: true,
    dualBand: true,
    quadLayerAware: true,
    loopTheoryAware: true,
    fallbackAware: true,
    driftAware: true,
    evolutionAware: true,
    routeAware: true,
    presenceAware: true,
    dnaAware: true,
    versionAware: true,
    overlayAware: true,
    bandAware: true
  }
};

// ============================================================================
//  CORE ORGAN CONTRACT
// ============================================================================
export const CORE_MEMORY_CONTRACT_PulseCoreGovernor = {
  inputs: {
    primaryStorage: "StorageLike",
    secondaryStorage: "StorageLike",
    dnaTag: "string",
    version: "string",
    overlay: "GovernorOverlay | null",
    log: "function",
    warn: "function"
  },
  outputs: {
    boot: "function()",
    healIfNeeded: "function()",
    set: "function(routeId, key, value, options?)",
    get: "function(routeId, key, options?)",
    getRouteSnapshot: "function(routeId)",
    setRouteSnapshot: "function(routeId, snapshot)",
    clearRoute: "function(routeId)",
    clearAll: "function()",
    flush: "function()",
    getHotKeys: "function(minHits?)"
  },
  consumers: [
    "PulseCoreMemory",
    "PulseCoreBrain",
    "PulseCoreEvolutions",
    "PulseBinaryCoreOverlay",
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
export const IMMORTAL_OVERLAYS_PulseCoreGovernor = {
  drift: {
    allowed: false,
    notes: "Governor placement semantics must not drift."
  },
  pressure: {
    expectedLoad: "high",
    notes: "Every core memory access flows through the governor."
  },
  stability: {
    algorithm: "stable",
    layout: "stable",
    notes: "Only additive evolution allowed."
  },
  load: {
    maxRoutesHint: 4096,
    notes: "Delegated to CoreMemory TTL + pruning."
  },
  chunking: {
    prewarm: ["corememory.governor", "corememory.layers", "corememory"],
    cacheKey: "corememory.governor.v20"
  },
  worldLens: {
    awareOfWorlds: true,
    notes: "routeId may encode world; governor remains world-agnostic."
  },
  limbic: {
    band: "none_direct",
    notes: "Indirect emotional impact via stability and reliability."
  },
  triHeart: {
    cognitive: "policy_engine",
    emotional: "none_direct",
    behavioral: "govern_memory"
  },
  impulseSpeed: {
    primaryAction: "set/get",
    latencyTargetNs: 50000
  },
  healingSurfaces: {
    enabled: true,
    notes: "Governor can trigger CoreMemory healing and flush."
  }
};

// ============================================================================
//  ROLE
// ============================================================================
export const CoreGovernorRole = {
  type: "Organ",
  subsystem: "Core",
  layer: "Governor",
  identity: "PulseCoreGovernor",
  version: "20.0-IMMORTAL-GOVERNOR",

  evo: CORE_MEMORY_META_PulseCoreGovernor.evoFlags
};

// ---------------------------------------------------------------------------
//  v20 IDENTITY BLOCK (MetaBlock)
// ---------------------------------------------------------------------------
export const CoreGovernorMetaBlock = {
  identity: "PulseCoreGovernor",
  subsystem: "Core",
  layer: "Governor",
  role: "Memory-Governor",
  version: "20.0-IMMORTAL-GOVERNOR",
  evo: CoreGovernorRole.evo
};

// deterministic governor epoch
let GOVERNOR_EPOCH = 0;
function nextGovernorEpoch() {
  GOVERNOR_EPOCH += 1;
  return GOVERNOR_EPOCH;
}

// ============================================================================
//  GOVERNOR CREATION — v20-IMMORTAL-GOVERNOR
// ============================================================================
export function createPulseCoreGovernor({
  primaryStorage = typeof window !== "undefined" ? window.localStorage : null,
  secondaryStorage = typeof window !== "undefined" ? window.sessionStorage : null,
  dnaTag = "default-dna",
  version = "20.0-IMMORTAL-GOVERNOR",
  overlay = null,
  log = console.log,
  warn = console.warn
} = {}) {

  const CoreMemory = createPulseCoreMemory({
    primaryStorage,
    secondaryStorage,
    dnaTag,
    log,
    warn
  });

  const { PulseCoreLayers, PulseCoreLayerRules } = PulseCoreLayersOrgan;

  function safeLog(stage, details = {}) {
    try {
      log("[PulseCoreGovernor-v20]", stage, JSON.stringify(details));
    } catch {}
  }

  // -------------------------------------------------------------------------
  //  GOVERNOR CONTEXT + OVERLAY HOOKS
  // -------------------------------------------------------------------------
  function buildGovernorContext() {
    return {
      dnaTag,
      version,
      epoch: nextGovernorEpoch(),
      coreMemoryVersion: CoreMemoryRole.version,
      coreLayersVersion: CoreLayersRole.version,
      overlayIdentity: overlay?.identity || null
    };
  }

  function applyOverlayPlacementHint({ routeId, key, dataType, placement }) {
    if (!overlay || typeof overlay.placementHint !== "function") return placement;
    try {
      const hint = overlay.placementHint({
        routeId,
        key,
        dataType,
        placement,
        dnaTag,
        version
      });
      return hint || placement;
    } catch (err) {
      warn("[PulseCoreGovernor-v20] OVERLAY_PLACEMENT_HINT_ERROR", String(err));
      return placement;
    }
  }

  function applyOverlayPromotionHint({ routeId, key, dataType, hits, promote }) {
    if (!overlay || typeof overlay.promotionHint !== "function") return promote;
    try {
      const hint = overlay.promotionHint({
        routeId,
        key,
        dataType,
        hits,
        promote,
        dnaTag,
        version
      });
      return typeof hint === "boolean" ? hint : promote;
    } catch (err) {
      warn("[PulseCoreGovernor-v20] OVERLAY_PROMOTION_HINT_ERROR", String(err));
      return promote;
    }
  }

  // -------------------------------------------------------------------------
  //  BOOT / PREWARM / HEAL
  // -------------------------------------------------------------------------
  function boot() {
    const ctx = buildGovernorContext();
    CoreMemory.prewarm();
    safeLog("BOOT", {
      ...ctx,
      primaryStorageAvailable: !!primaryStorage,
      secondaryStorageAvailable: !!secondaryStorage
    });
  }

  function healIfNeeded() {
    const ctx = buildGovernorContext();
    CoreMemory.prewarm();
    safeLog("HEAL_CHECK", ctx);
  }

  // -------------------------------------------------------------------------
  //  LAYER‑AWARE SET / GET
  // -------------------------------------------------------------------------
  function set(routeId, key, value, options = {}) {
    const dataType = options.dataType || "generic";
    const band = options.band || "symbolic";

    let placement = PulseCoreLayerRules.decidePlacement(
      dataType,
      dnaTag,
      routeId
    );

    placement = applyOverlayPlacementHint({
      routeId,
      key,
      dataType,
      placement
    });

    CoreMemory.set(routeId, key, value);

    safeLog("SET", {
      routeId,
      key,
      dataType,
      band,
      placement,
      dnaTag,
      version
    });
  }

  function get(routeId, key, options = {}) {
    const dataType = options.dataType || "generic";
    const band = options.band || "symbolic";

    const value = CoreMemory.get(routeId, key);
    const hits = value !== undefined ? 1 : 0;

    let promote = PulseCoreLayerRules.shouldPromote({
      hits,
      dataType,
      routeId,
      dnaTag
    });

    promote = applyOverlayPromotionHint({
      routeId,
      key,
      dataType,
      hits,
      promote
    });

    if (promote) {
      safeLog("PROMOTE_HINT", { routeId, key, dataType, band });
    }

    return value;
  }

  // -------------------------------------------------------------------------
  //  SNAPSHOTS / ROUTE‑LEVEL CONTROL
  // -------------------------------------------------------------------------
  function getRouteSnapshot(routeId) {
    const snapshot = CoreMemory.getRouteSnapshot(routeId);
    safeLog("GET_ROUTE_SNAPSHOT", { routeId });
    return snapshot;
  }

  function setRouteSnapshot(routeId, snapshot) {
    CoreMemory.setRouteSnapshot(routeId, snapshot);
    safeLog("SET_ROUTE_SNAPSHOT", { routeId });
  }

  function clearRoute(routeId) {
    CoreMemory.clearRoute(routeId);
    safeLog("CLEAR_ROUTE", { routeId });
  }

  function clearAll() {
    CoreMemory.clearAll();
    safeLog("CLEAR_ALL", {});
  }

  // -------------------------------------------------------------------------
  //  FLUSH / PERSIST
  // -------------------------------------------------------------------------
  function flush() {
    CoreMemory.bulkFlush();
    const cacheData = CoreMemory.Cache?.data || {};
    safeLog("FLUSH", {
      routes: Object.keys(cacheData).length
    });
  }

  // -------------------------------------------------------------------------
  //  LOOP THEORY INTROSPECTION
  // -------------------------------------------------------------------------
  function getHotKeys(minHits = 3) {
    const keys = CoreMemory.getHotKeys(minHits);
    safeLog("HOT_KEYS", { minHits, count: keys.length });
    return keys;
  }

  // -------------------------------------------------------------------------
  //  PUBLIC API
  // -------------------------------------------------------------------------
  const PulseCoreGovernor = {
    CoreGovernorRole,
    CoreGovernorMetaBlock,

    CoreMemoryRole,
    CoreLayersRole,

    CoreMemory,
    PulseCoreLayers,
    PulseCoreLayerRules,

    boot,
    healIfNeeded,

    set,
    get,
    getRouteSnapshot,
    setRouteSnapshot,
    clearRoute,
    clearAll,

    flush,
    getHotKeys,

    dnaTag,
    version,
    overlay,

    AI_EXPERIENCE_META_PulseCoreGovernor,
    AI_EXPERIENCE_CONTEXT_PulseCoreGovernor,
    CORE_MEMORY_META_PulseCoreGovernor,
    CORE_MEMORY_CONTRACT_PulseCoreGovernor,
    IMMORTAL_OVERLAYS_PulseCoreGovernor
  };

  safeLog("INIT", {
    identity: CoreGovernorRole.identity,
    version: CoreGovernorRole.version,
    dnaTag,
    overlayAware: !!overlay
  });

  return PulseCoreGovernor;
}
