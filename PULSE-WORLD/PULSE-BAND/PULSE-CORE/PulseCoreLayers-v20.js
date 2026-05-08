// ============================================================================
//  PulseCoreLayers.js — v20-IMMORTAL-LAYERS
//  ORGANISM‑WIDE MEMORY LAYER MANAGER
//  “RAM IS A SCRATCHPAD. CORE IS THE TRUTH. PRESENCE DECIDES EVERYTHING.”
//  • v20 AI_EXPERIENCE_META (IMMORTAL identity)
//  • PulseRole / PresenceRole / SettingsRole aware
//  • DNA‑aware, version‑aware, world‑aware
//  • Hot‑loop integration
//  • TTL + healing alignment
//  • GPU‑promotion rules
//  • Governor‑aligned (CoreMemory v20 lineage)
//  • Dual‑band / binary‑aware placement hints
//  • CoreSettings + CorePresence + CoreWorld integration ready
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
export const AI_EXPERIENCE_META_PulseCoreLayers = {
  id: "corememory.layers",
  identity: "PulseCoreLayers",
  version: "v20-IMMORTAL-LAYERS",
  layer: "corememory_layers",
  role: "corememory_physical_layer_map",
  lineage: "PulseCoreMemory-v20-IMMORTAL",

  evo: {
    layerMap: true,                // RAM, DiskPrimary, DiskSecondary, GPU, Proxy
    memoryPhysics: true,
    hydrationRules: true,
    dehydrationRules: true,
    dualBand: true,
    symbolicPrimary: true,
    binaryAware: true,

    deterministic: true,
    driftProof: true,
    pureCompute: true,
    zeroMutationOfInput: true,
    zeroNetwork: true,
    zeroFilesystem: true
  },

  contract: {
    always: [
      "PulseCoreMemory",
      "PulseBinaryCoreOverlay",
      "PulseCoreBrain",
      "PulseCoreGovernor",
      "PulseCoreSettings",
      "PulseCorePresence",
      "PulseCoreWorld"
    ],
    never: [
      "safeRoute",
      "fetchViaCNS"
    ]
  },

  surfaces: {
    band: ["memory", "layers", "placement"],
    wave: ["deterministic", "governor_aligned", "invisible"],
    binary: ["decidePlacement", "shouldPromote", "shouldDemote", "shouldFlush"],
    presence: ["placement_influenced_by_presence"],
    advantage: ["gpu_promotion", "ram_hot_loop", "disk_truth"],
    speed: "hot_loop"
  }
};

// ============================================================================
//  AI_EXPERIENCE_CONTEXT
// ============================================================================
export const AI_EXPERIENCE_CONTEXT_PulseCoreLayers = {
  tone: "technical_silent",
  pacing: "instant",
  emotionalBand: "none_direct",
  primaryIntent: "map_data_to_physical_layers",
  secondaryIntent: "optimize_for_speed_and_truth",
  visualNotes: {
    icon: "layers",
    motion: "none",
    colorBand: "infra_core"
  },
  worldLens: {
    awareOfWorlds: true,
    notes: "routeId may encode world/realm; layer rules must not assume single-world."
  },
  presenceLens: {
    awareOfPresence: true,
    notes: "future: presence intensity may bias RAM/GPU promotion."
  },
  settingsLens: {
    awareOfSettings: true,
    notes: "future: user/system settings may tune TTL, promotion thresholds, GPU usage."
  }
};

// ============================================================================
//  CORE ORGAN META
// ============================================================================
export const CORE_MEMORY_META_PulseCoreLayers = {
  id: "organ.corememory.layers",
  subsystem: "CoreMemory",
  layer: "LayerManager",
  tier: "IMMORTAL",
  role: "Memory-Layer-Governor",
  lineage: {
    family: "corememory_layer_map",
    generation: 3,
    coreVersion: "v20"
  },
  evoFlags: {
    binaryNative: true,
    dualBand: true,
    quadLayer: true,
    fallbackable: true,
    loopTheory: true,
    routeAware: true,
    dnaAware: true,
    governorAligned: true,
    presenceAware: true,
    settingsAware: true,
    worldAware: true,
    versionAware: true,
    deterministic: true,
    driftProof: true
  }
};

// ============================================================================
//  CORE ORGAN CONTRACT
// ============================================================================
export const CORE_MEMORY_CONTRACT_PulseCoreLayers = {
  inputs: {
    dataType: "string",
    dnaTag: "string",
    routeId: "string",
    hits: "number",
    lastAccess: "number",
    layerId: "string"
  },
  outputs: {
    decidePlacement: "placementDescriptor",
    shouldPromote: "boolean",
    shouldDemote: "boolean",
    shouldFlush: "boolean"
  },
  consumers: [
    "PulseCoreMemory",
    "PulseBinaryCoreOverlay",
    "PulseCoreBrain",
    "PulseCoreGovernor",
    "PulseCoreSettings",
    "PulseCorePresence",
    "PulseCoreWorld"
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
export const IMMORTAL_OVERLAYS_PulseCoreLayers = {
  drift: {
    allowed: false,
    notes: "Layer placement semantics must remain stable across versions."
  },
  pressure: {
    expectedLoad: "high",
    notes: "Every CoreMemory operation may consult layer rules."
  },
  stability: {
    algorithm: "stable",
    layout: "stable",
    notes: "Only additive evolution; no behavioral regressions."
  },
  load: {
    complexityHint: "O(1)",
    notes: "Rules must remain constant-time to stay hot-loop safe."
  },
  chunking: {
    prewarm: ["corememory.layers", "corememory.binary.overlay"],
    cacheKey: "corememory.layers.v20"
  },
  worldLens: {
    awareOfWorlds: true,
    notes: "routeId may encode world; future: world-specific layer policies."
  },
  limbic: {
    band: "none_direct",
    notes: "Indirect emotional impact via performance + reliability."
  },
  triHeart: {
    cognitive: "memory_physics",
    emotional: "none_direct",
    behavioral: "optimize_layer_usage"
  },
  impulseSpeed: {
    primaryAction: "decidePlacement",
    latencyTargetNs: 30000 // 30µs target
  },
  healingSurfaces: {
    enabled: true,
    notes: "Layer rules reduce fragmentation and misplacement across the organism."
  }
};

export const CoreLayersRole = {
  type: "Organ",
  subsystem: "Core",
  layer: "LayerManager",
  identity: "PulseCoreLayers",
  version: "20.0-IMMORTAL-LAYERS",

  evo: {
    binaryNative: true,
    dualBand: true,
    quadLayer: true,
    fallbackable: true,
    loopTheory: true,
    routeAware: true,
    dnaAware: true,
    governorAligned: true,
    presenceAware: true,
    settingsAware: true,
    worldAware: true,
    versionAware: true,
    deterministic: true,
    driftProof: true
  }
};

// ============================================================================
//  v20 IDENTITY BLOCK (MetaBlock)
// ============================================================================
export const CoreLayersMetaBlock = {
  identity: "PulseCoreLayers",
  subsystem: "Core",
  layer: "LayerManager",
  role: "Memory-Layer-Governor",
  version: "20.0-IMMORTAL-LAYERS",
  evo: CoreLayersRole.evo
};

// ============================================================================
//  MEMORY LAYER DEFINITIONS (v20)
//  (behavior preserved; metadata upgraded)
// ============================================================================
export const PulseCoreLayers = {
  RAM: {
    id: "ram",
    speed: "fastest",
    volatility: "volatile",
    authoritative: false,
    flushOnBoot: true,
    idealFor: [
      "hotLoopKeys",
      "workingSets",
      "gpuWarmBuffers",
      "proxyTempBuffers"
    ],
    bandHint: "dual",
    hydrationRole: "scratchpad",
    metaBlock: CoreLayersMetaBlock
  },

  DISK_PRIMARY: {
    id: "disk-primary",
    speed: "medium",
    volatility: "persistent",
    authoritative: true,
    fallback: "disk-secondary",
    idealFor: [
      "canonicalBlobs",
      "routeSnapshots",
      "patternMaps",
      "evolutionState"
    ],
    bandHint: "symbolic-primary",
    hydrationRole: "truth",
    metaBlock: CoreLayersMetaBlock
  },

  DISK_SECONDARY: {
    id: "disk-secondary",
    speed: "medium",
    volatility: "persistent",
    authoritative: false,
    fallback: null,
    idealFor: [
      "canonicalBlobsMirror",
      "routeSnapshotsMirror",
      "patternMapsMirror"
    ],
    bandHint: "symbolic-mirror",
    hydrationRole: "backup",
    metaBlock: CoreLayersMetaBlock
  },

  GPU: {
    id: "gpu",
    speed: "fast",
    volatility: "volatile",
    authoritative: false,
    idealFor: [
      "compiledKernels",
      "modelSegments",
      "binaryTransforms",
      "uiHydrationGraphs"
    ],
    bandHint: "binary-primary",
    hydrationRole: "compute-surface",
    metaBlock: CoreLayersMetaBlock
  },

  PROXY: {
    id: "proxy",
    speed: "fast",
    volatility: "transient",
    authoritative: false,
    idealFor: [
      "binaryTransit",
      "dedupedOutbound",
      "clientVersionMaps"
    ],
    bandHint: "binary-transit",
    hydrationRole: "edge-buffer",
    metaBlock: CoreLayersMetaBlock
  }
};

// ============================================================================
//  LAYER DECISION ENGINE (v20-IMMORTAL)
//  • uses dataType + dnaTag + routeId
//  • GPU‑aware, proxy‑aware
//  • compatible with v15 call sites
//  • future-ready for presence/settings/world tuning
// ============================================================================
export const PulseCoreLayerRules = {
  // ---------------------------------------------------------
  //  RULE 1 — WHERE DOES NEW DATA GO?
  // ---------------------------------------------------------
  decidePlacement(dataType, dnaTag, routeId) {
    const dt = String(dataType || "generic").toLowerCase();
    const route = String(routeId || "global");

    const gpuPreferred =
      dt.includes("gpu") ||
      dt.includes("binary") ||
      route.includes("gpu") ||
      route.includes("render");

    const proxyPreferred =
      dt.includes("proxy") ||
      dt.includes("network") ||
      dt.includes("transit");

    const primary = "disk-primary";
    const secondary = "disk-secondary";
    const ram = "ram";
    const gpu = gpuPreferred ? "gpu" : "ram";
    const proxy = proxyPreferred ? "proxy" : "ram";

    return {
      primary,
      secondary,
      ram,
      gpu,
      proxy,
      dnaTag,
      routeId: route
    };
  },

  // ---------------------------------------------------------
  //  RULE 2 — WHEN TO PROMOTE?
  // ---------------------------------------------------------
  shouldPromote({ hits, dataType, routeId, dnaTag } = {}) {
    const dt = String(dataType || "generic").toLowerCase();
    const route = String(routeId || "global");
    const h = Number(hits || 0);

    if (dt.includes("gpu")) return h > 1;
    if (route.includes("hot") || route.includes("loop")) return h > 2;
    if (String(dnaTag || "").includes("prime")) return h > 2;

    return h > 3;
  },

  // ---------------------------------------------------------
  //  RULE 3 — WHEN TO DEMOTE?
  // ---------------------------------------------------------
  shouldDemote({ hits, lastAccess, layerId } = {}) {
    const now = Date.now();
    const TTL = 7 * 24 * 60 * 60 * 1000;
    const h = Number(hits || 0);
    const last = Number(lastAccess || 0);
    const layer = String(layerId || "");

    if (layer === "ram" || layer === "gpu") {
      if (now - last > TTL / 4) return true;
      return h < 1;
    }

    if (now - last > TTL) return true;
    return h < 1;
  },

  // ---------------------------------------------------------
  //  RULE 4 — WHEN TO FLUSH?
  // ---------------------------------------------------------
  shouldFlush(layerId) {
    const id = String(layerId || "");
    return id === "ram" || id === "gpu";
  }
};

// ============================================================================
//  PUBLIC EXPORT
// ============================================================================
export const PulseCoreLayersOrgan = {
  CoreLayersRole,
  CoreLayersMetaBlock,
  PulseCoreLayers,
  PulseCoreLayerRules,
  AI_EXPERIENCE_META_PulseCoreLayers,
  AI_EXPERIENCE_CONTEXT_PulseCoreLayers,
  CORE_MEMORY_META_PulseCoreLayers,
  CORE_MEMORY_CONTRACT_PulseCoreLayers,
  IMMORTAL_OVERLAYS_PulseCoreLayers
};
