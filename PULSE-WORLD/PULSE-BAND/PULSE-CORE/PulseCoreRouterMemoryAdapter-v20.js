// ============================================================================
//  PulseRouterMemoryAdapter-v20.js — v20‑IMMORTAL‑ROUTER‑MEMORY‑ADAPTER
//  “ROUTER THINKS ONCE. ROUTES FOREVER. MEMORY NEVER DRIFTS.”
//  • v20 IMMORTAL MetaBlock
//  • dnaTag + version aware
//  • presence‑touch propagation (overlay.touch + deterministic epoch)
//  • hot‑loop promotion
//  • dual‑band metadata (route-shape = symbolic, route-lookup = binary)
//  • lineage + router‑shape metadata
//  • governor + evolution aligned
//  • deterministic canonicalization (via BinaryOverlay v20)
// ============================================================================

/*
@PULSE_IMMORTAL_REQUIRE_FULL_META
*/

// ============================================================================
//  AI_EXPERIENCE_META (IMMORTAL++)
// ============================================================================
export const AI_EXPERIENCE_META_PulseRouterMemoryAdapter = {
  id: "corememory.adapter.router",
  identity: "PulseCoreRouterMemoryAdapter",
  version: "v20-IMMORTAL-ROUTER-MEMORY",
  layer: "corememory_adapter",
  role: "router_memory_adapter",
  lineage: "PulseCoreMemory-v20-IMMORTAL",

  evo: {
    adapter: true,
    routerMemoryBridge: true,
    symbolicPrimary: true,
    binaryAware: true,
    dualBand: true,

    deterministic: true,
    driftProof: true,
    pureCompute: true,
    zeroMutationOfInput: true,
    zeroNetwork: true,
    zeroFilesystem: true
  },

  contract: {
    always: [
      "PulseCoreBrain",
      "PulseCoreGovernor",
      "PulseBinaryCoreOverlay",
      "PulseCoreSettings",
      "PulseCorePresence"
    ],
    never: [
      "safeRoute",
      "fetchViaCNS"
    ]
  },

  surfaces: {
    band: ["router", "adapter", "route"],
    wave: ["deterministic", "structural"],
    binary: ["getRouteShape"],
    presence: ["router_presence_touch"],
    advantage: ["route_shape_reuse"],
    speed: "hot_loop"
  }
};

// ============================================================================
//  AI_EXPERIENCE_CONTEXT
// ============================================================================
export const AI_EXPERIENCE_CONTEXT_PulseRouterMemoryAdapter = {
  tone: "technical_silent",
  pacing: "instant",
  emotionalBand: "none_direct",
  primaryIntent: "canonicalize_route_shapes",
  secondaryIntent: "stabilize_route_lookups",
  visualNotes: {
    icon: "router",
    motion: "path_pulse",
    colorBand: "infra_core"
  },
  presenceLens: {
    awareOfPresence: true,
    notes: "presence may bias which routes stay hot."
  },
  settingsLens: {
    awareOfSettings: true,
    notes: "settings may tune route TTL and hot‑loop thresholds."
  }
};

// ============================================================================
//  CORE ORGAN META
// ============================================================================
export const CORE_MEMORY_META_PulseRouterMemoryAdapter = {
  id: "organ.corememory.adapter.router",
  subsystem: "CoreMemory",
  layer: "MemoryAdapter",
  tier: "IMMORTAL",
  role: "Router-Memory-Bridge",
  lineage: {
    family: "corememory_adapter_router",
    generation: 3,
    coreVersion: "v20"
  },
  evoFlags: {
    dnaAware: true,
    versionAware: true,
    presenceAware: true,
    hotLoop: true,
    dualBandSafe: true,
    routerAware: true,
    deterministic: true,
    driftProof: true
  }
};

// ============================================================================
//  CORE ORGAN CONTRACT
// ============================================================================
export const CORE_MEMORY_CONTRACT_PulseRouterMemoryAdapter = {
  inputs: {
    overlay: "BinaryOverlay",
    dnaTag: "string",
    version: "string",
    log: "function"
  },
  outputs: {
    registerRouteShape: "function(routeId, shape)",
    getRouteShape: "function(routeId, shape)",
    promoteHot: "function(routeId, key)"
  },
  consumers: [
    "PulseCoreBrain",
    "PulseCoreGovernor",
    "PulseBinaryCoreOverlay",
    "PulseCoreSettings",
    "PulseCorePresence"
  ],
  guarantees: {
    deterministic: true,
    noNetwork: true,
    noFilesystem: true
  }
};

// ============================================================================
//  IMMORTAL OVERLAYS
// ============================================================================
export const IMMORTAL_OVERLAYS_PulseRouterMemoryAdapter = {
  drift: {
    allowed: false,
    notes: "Route shape identity and lookup semantics must not drift."
  },
  pressure: {
    expectedLoad: "high",
    notes: "Router adapter sits on the logical routing hot path."
  },
  stability: {
    algorithm: "stable",
    layout: "stable",
    notes: "Canonicalization is structural and stable across sessions."
  },
  chunking: {
    prewarm: ["corememory.adapter.router", "corememory.binary.overlay"],
    cacheKey: "corememory.adapter.router.v20"
  },
  triHeart: {
    cognitive: "router_memory_bridge",
    emotional: "none_direct",
    behavioral: "canonicalize_and_route"
  },
  impulseSpeed: {
    primaryAction: "getRouteShape",
    latencyTargetNs: 40000
  }
};

// ============================================================================
//  v20 IDENTITY BLOCK (MetaBlock)
// ============================================================================
export const RouterMemoryAdapterMetaBlock = {
  identity: "PulseRouterMemoryAdapter",
  subsystem: "Router",
  layer: "MemoryAdapter",
  role: "Router-Memory-Bridge",
  version: "20.0-IMMORTAL-ROUTER-MEMORY",
  evo: CORE_MEMORY_META_PulseRouterMemoryAdapter.evoFlags
};

// deterministic epoch for Router adapter events
let ROUTER_EPOCH = 0;
function nextRouterEpoch() {
  ROUTER_EPOCH += 1;
  return ROUTER_EPOCH;
}

// ============================================================================
//  FACTORY — v20 IMMORTAL
// ============================================================================
import { createPulseBinaryOverlay } from "./PulseBinaryCoreOverlay-v20.js";

export function createPulseRouterMemoryAdapter({
  overlay = createPulseBinaryOverlay(),
  dnaTag = "default-dna",
  version = "20.0-IMMORTAL-ROUTER-MEMORY",
  log = console.log
} = {}) {

  function wrap(routeId, payload, dataType) {
    const epoch = nextRouterEpoch();

    const band =
      dataType === "route-shape"
        ? "symbolic"
        : "binary";

    const routeSize =
      typeof payload === "object"
        ? JSON.stringify(payload).length
        : String(payload || "").length;

    const meta = {
      dataType,
      dnaTag,
      version,
      epoch,
      band,
      routeSize,
      metaBlock: RouterMemoryAdapterMetaBlock
    };

    try {
      overlay.touch?.(routeId, epoch, meta);
    } catch {}

    return overlay.canonicalize(routeId, payload, {
      dataType,
      band
    });
  }

  function registerRouteShape(routeId, shape) {
    return wrap(routeId, shape, "route-shape");
  }

  function getRouteShape(routeId, shape) {
    return wrap(routeId, shape, "route-lookup");
  }

  function promoteHot(routeId, key) {
    try {
      overlay.markHot?.(routeId, key);
      log("[PulseRouterMemoryAdapter-v20] HOT_PROMOTE", { routeId, key });
    } catch {}
  }

  return {
    RouterMemoryAdapterMetaBlock,
    dnaTag,
    version,

    registerRouteShape,
    getRouteShape,

    promoteHot,

    AI_EXPERIENCE_META_PulseRouterMemoryAdapter,
    AI_EXPERIENCE_CONTEXT_PulseRouterMemoryAdapter,
    CORE_MEMORY_META_PulseRouterMemoryAdapter,
    CORE_MEMORY_CONTRACT_PulseRouterMemoryAdapter,
    IMMORTAL_OVERLAYS_PulseRouterMemoryAdapter
  };
}
