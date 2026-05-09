// ============================================================================
//  PulseSendMemoryAdapter-v20.js — v20‑IMMORTAL‑SEND‑MEMORY‑ADAPTER
//  “SEND ONCE. REFERENCE FOREVER. MEMORY NEVER DRIFTS.”
//  • v20 IMMORTAL MetaBlock
//  • dnaTag + version aware
//  • presence‑touch propagation (overlay.touch + deterministic epoch)
//  • hot‑loop promotion
//  • dual‑band metadata (send = binary)
//  • send‑shape + channel metadata
//  • governor + evolution aligned
//  • deterministic canonicalization (via BinaryOverlay v20)
// ============================================================================

/*
@PULSE_IMMORTAL_REQUIRE_FULL_META
*/

// ============================================================================
//  AI_EXPERIENCE_META (IMMORTAL++)
// ============================================================================
export const AI_EXPERIENCE_META_PulseSendMemoryAdapter = {
  id: "corememory.adapter.send",
  identity: "PulseCoreSendMemoryAdapter",
  version: "v20-IMMORTAL-SEND-MEMORY",
  layer: "corememory_adapter",
  role: "send_memory_adapter",
  lineage: "PulseCoreMemory-v20-IMMORTAL",

  evo: {
    adapter: true,
    sendMemoryBridge: true,
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
    band: ["send", "adapter", "edge"],
    wave: ["deterministic", "outbound"],
    binary: ["prepareOutbound"],
    presence: ["send_presence_touch"],
    advantage: ["send_shape_reuse"],
    speed: "hot_loop"
  }
};

// ============================================================================
//  AI_EXPERIENCE_CONTEXT
// ============================================================================
export const AI_EXPERIENCE_CONTEXT_PulseSendMemoryAdapter = {
  tone: "technical_silent",
  pacing: "instant",
  emotionalBand: "none_direct",
  primaryIntent: "canonicalize_send_payloads",
  secondaryIntent: "stabilize_outbound_reuse",
  visualNotes: {
    icon: "send",
    motion: "vector_pulse",
    colorBand: "infra_core"
  },
  presenceLens: {
    awareOfPresence: true,
    notes: "presence may bias which outbound shapes stay hot."
  },
  settingsLens: {
    awareOfSettings: true,
    notes: "settings may tune send size thresholds and retention."
  }
};

// ============================================================================
//  CORE ORGAN META
// ============================================================================
export const CORE_MEMORY_META_PulseSendMemoryAdapter = {
  id: "organ.corememory.adapter.send",
  subsystem: "CoreMemory",
  layer: "MemoryAdapter",
  tier: "IMMORTAL",
  role: "Send-Memory-Bridge",
  lineage: {
    family: "corememory_adapter_send",
    generation: 3,
    coreVersion: "v20"
  },
  evoFlags: {
    dnaAware: true,
    versionAware: true,
    presenceAware: true,
    hotLoop: true,
    dualBandSafe: true,
    sendAware: true,
    deterministic: true,
    driftProof: true
  }
};

// ============================================================================
//  CORE ORGAN CONTRACT
// ============================================================================
export const CORE_MEMORY_CONTRACT_PulseSendMemoryAdapter = {
  inputs: {
    overlay: "BinaryOverlay",
    dnaTag: "string",
    version: "string",
    log: "function",
    defaultChannel: "string" // e.g. "http", "ws", "native"
  },
  outputs: {
    prepareOutbound: "function(routeId, payload, channelOverride?)",
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
export const IMMORTAL_OVERLAYS_PulseSendMemoryAdapter = {
  drift: {
    allowed: false,
    notes: "Send shape identity and outbound semantics must not drift."
  },
  pressure: {
    expectedLoad: "medium_high",
    notes: "Send adapter sits on outbound hot path."
  },
  stability: {
    algorithm: "stable",
    layout: "stable",
    notes: "Canonicalization is structural and stable across sessions."
  },
  chunking: {
    prewarm: ["corememory.adapter.send", "corememory.binary.overlay"],
    cacheKey: "corememory.adapter.send.v20"
  },
  triHeart: {
    cognitive: "send_memory_bridge",
    emotional: "none_direct",
    behavioral: "prepare_and_reuse"
  },
  impulseSpeed: {
    primaryAction: "prepareOutbound",
    latencyTargetNs: 40000
  }
};

// ============================================================================
//  v20 IDENTITY BLOCK (MetaBlock)
// ============================================================================
export const SendMemoryAdapterMetaBlock = {
  identity: "PulseSendMemoryAdapter",
  subsystem: "Send",
  layer: "MemoryAdapter",
  role: "Send-Memory-Bridge",
  version: "20.0-IMMORTAL-SEND-MEMORY",
  evo: CORE_MEMORY_META_PulseSendMemoryAdapter.evoFlags
};

// deterministic epoch for Send adapter events
let SEND_EPOCH = 0;
function nextSendEpoch() {
  SEND_EPOCH += 1;
  return SEND_EPOCH;
}

// ============================================================================
//  FACTORY — v20 IMMORTAL
// ============================================================================
import { createPulseBinaryOverlay } from "./PulseBinaryCoreOverlay-v20.js";

export function createPulseSendMemoryAdapter({
  overlay = createPulseBinaryOverlay(),
  dnaTag = "default-dna",
  version = "20.0-IMMORTAL-SEND-MEMORY",
  log = console.log,
  defaultChannel = "http"
} = {}) {

  function resolveChannel(channelOverride) {
    const c = channelOverride || defaultChannel || "http";
    return String(c);
  }

  function wrap(routeId, payload, dataType, channelOverride) {
    const epoch = nextSendEpoch();
    const band = "binary";

    const sendSize =
      typeof payload === "object"
        ? JSON.stringify(payload).length
        : String(payload || "").length;

    const channel = resolveChannel(channelOverride);

    const meta = {
      dataType,
      dnaTag,
      version,
      epoch,
      band,
      sendSize,
      channel,
      metaBlock: SendMemoryAdapterMetaBlock
    };

    try {
      overlay.touch?.(routeId, epoch, meta);
    } catch {}

    return overlay.interceptOutbound(routeId, payload, {
      dataType,
      band
    });
  }

  function prepareOutbound(routeId, payload, channelOverride) {
    return wrap(routeId, payload, "send", channelOverride);
  }

  function promoteHot(routeId, key) {
    try {
      overlay.markHot?.(routeId, key);
      log("[PulseSendMemoryAdapter-v20] HOT_PROMOTE", { routeId, key });
    } catch {}
  }

  return {
    SendMemoryAdapterMetaBlock,
    dnaTag,
    version,

    prepareOutbound,
    promoteHot,

    AI_EXPERIENCE_META_PulseSendMemoryAdapter,
    AI_EXPERIENCE_CONTEXT_PulseSendMemoryAdapter,
    CORE_MEMORY_META_PulseSendMemoryAdapter,
    CORE_MEMORY_CONTRACT_PulseSendMemoryAdapter,
    IMMORTAL_OVERLAYS_PulseSendMemoryAdapter
  };
}
