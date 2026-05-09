// ============================================================================
//  PulseProxyMemoryAdapter-v20.js — v20‑IMMORTAL‑PROXY‑MEMORY‑ADAPTER
//  “PROXY NEVER FETCHES TWICE. NEVER DECODE TWICE. NEVER DRIFTS.”
//  • v20 IMMORTAL MetaBlock
//  • dnaTag + version aware
//  • presence‑touch propagation (overlay.touch + deterministic epoch)
//  • hot‑loop promotion
//  • dual‑band metadata (proxy-in/out = binary)
//  • proxy‑mode awareness (online/offline/cache-only/fail-open)
//  • lineage + proxy‑shape metadata
//  • governor + evolution aligned
//  • deterministic canonicalization (via BinaryOverlay v20)
// ============================================================================

/*
@PULSE_IMMORTAL_REQUIRE_FULL_META
*/

// ============================================================================
//  AI_EXPERIENCE_META (IMMORTAL++)
// ============================================================================
export const AI_EXPERIENCE_META_PulseProxyMemoryAdapter = {
  id: "corememory.adapter.proxy",
  identity: "PulseCoreProxyMemoryAdapter",
  version: "v20-IMMORTAL-PROXY-MEMORY",
  layer: "corememory_adapter",
  role: "proxy_memory_adapter",
  lineage: "PulseCoreMemory-v20-IMMORTAL",

  evo: {
    adapter: true,
    proxyBridge: true,
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
    band: ["proxy", "adapter", "edge"],
    wave: ["deterministic", "cache"],
    binary: ["inbound", "outbound"],
    presence: ["proxy_presence_touch"],
    advantage: ["cache_reuse", "mode_awareness"],
    speed: "hot_loop"
  }
};

// ============================================================================
//  AI_EXPERIENCE_CONTEXT
// ============================================================================
export const AI_EXPERIENCE_CONTEXT_PulseProxyMemoryAdapter = {
  tone: "technical_silent",
  pacing: "instant",
  emotionalBand: "none_direct",
  primaryIntent: "canonicalize_proxy_payloads",
  secondaryIntent: "maximize_cache_reuse",
  visualNotes: {
    icon: "proxy",
    motion: "edge_pulse",
    colorBand: "infra_core"
  },
  presenceLens: {
    awareOfPresence: true,
    notes: "presence may bias proxy mode (e.g., more aggressive cache in low‑latency states)."
  },
  settingsLens: {
    awareOfSettings: true,
    notes: "settings may tune proxy modes and cache TTL."
  }
};

// ============================================================================
//  CORE ORGAN META
// ============================================================================
export const CORE_MEMORY_META_PulseProxyMemoryAdapter = {
  id: "organ.corememory.adapter.proxy",
  subsystem: "CoreMemory",
  layer: "MemoryAdapter",
  tier: "IMMORTAL",
  role: "Proxy-Memory-Bridge",
  lineage: {
    family: "corememory_adapter_proxy",
    generation: 3,
    coreVersion: "v20"
  },
  evoFlags: {
    dnaAware: true,
    versionAware: true,
    presenceAware: true,
    hotLoop: true,
    dualBandSafe: true,
    proxyAware: true,
    deterministic: true,
    driftProof: true,
    modeAware: true
  }
};

// ============================================================================
//  CORE ORGAN CONTRACT
// ============================================================================
export const CORE_MEMORY_CONTRACT_PulseProxyMemoryAdapter = {
  inputs: {
    overlay: "BinaryOverlay",
    dnaTag: "string",
    version: "string",
    log: "function",
    defaultMode: "string" // "online" | "offline" | "cache-only" | "fail-open"
  },
  outputs: {
    inbound: "function(routeId, payload, modeOverride?)",
    outbound: "function(routeId, payload, modeOverride?)",
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
export const IMMORTAL_OVERLAYS_PulseProxyMemoryAdapter = {
  drift: {
    allowed: false,
    notes: "Proxy cache semantics must not drift; only new modes/fields may be added."
  },
  pressure: {
    expectedLoad: "high",
    notes: "Proxy adapter sits on the edge hot path."
  },
  stability: {
    algorithm: "stable",
    layout: "stable",
    notes: "Canonicalization is structural and stable across sessions."
  },
  chunking: {
    prewarm: ["corememory.adapter.proxy", "corememory.binary.overlay"],
    cacheKey: "corememory.adapter.proxy.v20"
  },
  triHeart: {
    cognitive: "proxy_memory_bridge",
    emotional: "none_direct",
    behavioral: "cache_and_reuse"
  },
  impulseSpeed: {
    primaryAction: "inbound",
    latencyTargetNs: 40000
  },
  modes: {
    supported: ["online", "offline", "cache-only", "fail-open"],
    notes: "Mode is metadata only; real network behavior is external."
  }
};

// ============================================================================
//  v20 IDENTITY BLOCK (MetaBlock)
// ============================================================================
export const ProxyMemoryAdapterMetaBlock = {
  identity: "PulseProxyMemoryAdapter",
  subsystem: "Proxy",
  layer: "MemoryAdapter",
  role: "Proxy-Memory-Bridge",
  version: "20.0-IMMORTAL-PROXY-MEMORY",
  evo: CORE_MEMORY_META_PulseProxyMemoryAdapter.evoFlags
};

// deterministic epoch for Proxy adapter events
let PROXY_EPOCH = 0;
function nextProxyEpoch() {
  PROXY_EPOCH += 1;
  return PROXY_EPOCH;
}

// ============================================================================
//  FACTORY — v20 IMMORTAL
// ============================================================================
import { createPulseBinaryOverlay } from "./PulseBinaryCoreOverlay-v20.js";

export function createPulseProxyMemoryAdapter({
  overlay = createPulseBinaryOverlay(),
  dnaTag = "default-dna",
  version = "20.0-IMMORTAL-PROXY-MEMORY",
  log = console.log,
  defaultMode = "online" // "online" | "offline" | "cache-only" | "fail-open"
} = {}) {

  function resolveMode(modeOverride) {
    const m = modeOverride || defaultMode || "online";
    if (
      m === "online" ||
      m === "offline" ||
      m === "cache-only" ||
      m === "fail-open"
    ) return m;
    return "online";
  }

  function wrap(routeId, payload, dataType, modeOverride) {
    const epoch = nextProxyEpoch();
    const band = "binary";

    const proxySize =
      typeof payload === "object"
        ? JSON.stringify(payload).length
        : String(payload || "").length;

    const mode = resolveMode(modeOverride);

    const meta = {
      dataType,
      dnaTag,
      version,
      epoch,
      band,
      proxySize,
      mode,
      metaBlock: ProxyMemoryAdapterMetaBlock
    };

    try {
      overlay.touch?.(routeId, epoch, meta);
    } catch {}

    return overlay.canonicalize(routeId, payload, {
      dataType,
      band
    });
  }

  function inbound(routeId, payload, modeOverride) {
    return wrap(routeId, payload, "proxy-in", modeOverride);
  }

  function outbound(routeId, payload, modeOverride) {
    return wrap(routeId, payload, "proxy-out", modeOverride);
  }

  function promoteHot(routeId, key) {
    try {
      overlay.markHot?.(routeId, key);
      log("[PulseProxyMemoryAdapter-v20] HOT_PROMOTE", { routeId, key });
    } catch {}
  }

  return {
    ProxyMemoryAdapterMetaBlock,
    dnaTag,
    version,

    inbound,
    outbound,

    promoteHot,

    AI_EXPERIENCE_META_PulseProxyMemoryAdapter,
    AI_EXPERIENCE_CONTEXT_PulseProxyMemoryAdapter,
    CORE_MEMORY_META_PulseProxyMemoryAdapter,
    CORE_MEMORY_CONTRACT_PulseProxyMemoryAdapter,
    IMMORTAL_OVERLAYS_PulseProxyMemoryAdapter
  };
}
