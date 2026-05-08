// ============================================================================
//  PulseEarnMemoryAdapter.js — v20‑IMMORTAL‑EARN‑MEMORY‑ADAPTER
//  “EARN FLOWS IN. VALUE ACCUMULATES. NOTHING DRIFTS.”
//  • v20 IMMORTAL MetaBlock
//  • dnaTag + version aware
//  • presence aware (overlay.touch + deterministic epoch)
//  • hot‑loop promotion
//  • dual‑band metadata (signal = binary, meta = symbolic)
//  • lineage + reward‑shape metadata
//  • governor + evolution aligned
//  • deterministic canonicalization (via BinaryOverlay v20)
// ============================================================================

/*
@PULSE_IMMORTAL_REQUIRE_FULL_META
*/

// ============================================================================
//  AI_EXPERIENCE_META (IMMORTAL++)
// ============================================================================
export const AI_EXPERIENCE_META_PulseEarnMemoryAdapter = {
  id: "corememory.adapter.earn",
  identity: "PulseCoreEarnMemoryAdapter",
  version: "v20-IMMORTAL-EARN-MEMORY",
  layer: "corememory_adapter",
  role: "earn_memory_adapter",
  lineage: "PulseCoreMemory-v20-IMMORTAL",

  evo: {
    adapter: true,
    earnMemoryBridge: true,
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
    band: ["earn", "adapter", "reward"],
    wave: ["deterministic", "structural"],
    binary: ["registerEarnSignal", "registerEarnAttachment"],
    presence: ["earn_presence_touch"],
    advantage: ["reward_shape", "reuse"],
    speed: "hot_loop"
  }
};

// ============================================================================
//  AI_EXPERIENCE_CONTEXT
// ============================================================================
export const AI_EXPERIENCE_CONTEXT_PulseEarnMemoryAdapter = {
  tone: "technical_silent",
  pacing: "instant",
  emotionalBand: "none_direct",
  primaryIntent: "canonicalize_earn_payloads",
  secondaryIntent: "preserve_reward_shape",
  visualNotes: {
    icon: "earn",
    motion: "none",
    colorBand: "infra_core"
  },
  presenceLens: {
    awareOfPresence: true,
    notes: "future: presence may bias earn scoring."
  },
  settingsLens: {
    awareOfSettings: true,
    notes: "future: settings may tune earn thresholds."
  }
};

// ============================================================================
//  CORE ORGAN META
// ============================================================================
export const CORE_MEMORY_META_PulseEarnMemoryAdapter = {
  id: "organ.corememory.adapter.earn",
  subsystem: "CoreMemory",
  layer: "MemoryAdapter",
  tier: "IMMORTAL",
  role: "Earn-Memory-Bridge",
  lineage: {
    family: "corememory_adapter_earn",
    generation: 3,
    coreVersion: "v20"
  },
  evoFlags: {
    dnaAware: true,
    versionAware: true,
    presenceAware: true,
    hotLoop: true,
    dualBandSafe: true,
    lineageAware: true,
    rewardAware: true,
    deterministic: true,
    driftProof: true
  }
};

// ============================================================================
//  CORE ORGAN CONTRACT
// ============================================================================
export const CORE_MEMORY_CONTRACT_PulseEarnMemoryAdapter = {
  inputs: {
    overlay: "BinaryOverlay",
    dnaTag: "string",
    version: "string",
    log: "function"
  },
  outputs: {
    registerEarnSignal: "function(routeId, earnPayload)",
    registerEarnMeta: "function(routeId, metaObj)",
    registerEarnAttachment: "function(routeId, attachment)",
    registerEarnFormula: "function(routeId, formulaStruct)",
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
export const IMMORTAL_OVERLAYS_PulseEarnMemoryAdapter = {
  drift: {
    allowed: false,
    notes: "Earn reward semantics must never drift."
  },
  pressure: {
    expectedLoad: "medium_high",
    notes: "Earn events spike but are bounded."
  },
  stability: {
    algorithm: "stable",
    layout: "stable",
    notes: "Reward‑shape metadata is append‑only."
  },
  chunking: {
    prewarm: ["corememory.adapter.earn", "corememory.binary.overlay"],
    cacheKey: "corememory.adapter.earn.v20"
  },
  triHeart: {
    cognitive: "reward_engine_bridge",
    emotional: "none_direct",
    behavioral: "canonicalize_earn_flows"
  },
  impulseSpeed: {
    primaryAction: "registerEarnSignal",
    latencyTargetNs: 50000
  }
};

// ============================================================================
//  v20 IDENTITY BLOCK (MetaBlock)
// ============================================================================
export const EarnMemoryAdapterMetaBlock = {
  identity: "PulseEarnMemoryAdapter",
  subsystem: "Earn",
  layer: "MemoryAdapter",
  role: "Earn-Memory-Bridge",
  version: "20.0-IMMORTAL-EARN-MEMORY",
  evo: CORE_MEMORY_META_PulseEarnMemoryAdapter.evoFlags
};

// deterministic epoch for Earn adapter events
let EARNMEM_EPOCH = 0;
function nextEarnEpoch() {
  EARNMEM_EPOCH += 1;
  return EARNMEM_EPOCH;
}

// ============================================================================
//  FACTORY — v20 IMMORTAL
// ============================================================================
import { createPulseBinaryOverlay } from "./PulseBinaryOverlay.js";

export function createPulseEarnMemoryAdapter({
  overlay = createPulseBinaryOverlay(),
  dnaTag = "default-dna",
  version = "20.0-IMMORTAL-EARN-MEMORY",
  log = console.log
} = {}) {

  function wrap(routeId, payload, dataType) {
    const epoch = nextEarnEpoch();

    const rewardSize =
      typeof payload === "object"
        ? JSON.stringify(payload).length
        : String(payload || "").length;

    const band =
      dataType === "earn-signal" || dataType === "earn-attachment"
        ? "binary"
        : "symbolic";

    const meta = {
      dataType,
      dnaTag,
      version,
      epoch,
      rewardSize,
      band,
      metaBlock: EarnMemoryAdapterMetaBlock
    };

    try {
      overlay.touch?.(routeId, epoch, meta);
    } catch {}

    return overlay.canonicalize(routeId, payload, {
      dataType,
      band
    });
  }

  function registerEarnSignal(routeId, earnPayload) {
    return wrap(routeId, earnPayload, "earn-signal");
  }

  function registerEarnMeta(routeId, metaObj) {
    return wrap(routeId, metaObj, "earn-meta");
  }

  function registerEarnAttachment(routeId, attachment) {
    return wrap(routeId, attachment, "earn-attachment");
  }

  function registerEarnFormula(routeId, formulaStruct) {
    return wrap(routeId, formulaStruct, "earn-formula");
  }

  function promoteHot(routeId, key) {
    try {
      overlay.markHot?.(routeId, key);
      log("[PulseEarnMemoryAdapter-v20] HOT_PROMOTE", { routeId, key });
    } catch {}
  }

  return {
    EarnMemoryAdapterMetaBlock,
    dnaTag,
    version,

    registerEarnSignal,
    registerEarnMeta,
    registerEarnAttachment,
    registerEarnFormula,

    promoteHot,

    AI_EXPERIENCE_META_PulseEarnMemoryAdapter,
    AI_EXPERIENCE_CONTEXT_PulseEarnMemoryAdapter,
    CORE_MEMORY_META_PulseEarnMemoryAdapter,
    CORE_MEMORY_CONTRACT_PulseEarnMemoryAdapter,
    IMMORTAL_OVERLAYS_PulseEarnMemoryAdapter
  };
}
