// ============================================================================
//  PulseBinaryCoreOverlay-v20.js — v20-IMMORTAL-BINARY-OVERLAY
//  ORGANISM‑WIDE BINARY MEMORY OVERLAY
//  “GRAB ONCE. CANONICALIZE ONCE. REUSE FOREVER. NEVER DRIFT.”
//  • v20 AI_EXPERIENCE_META (IMMORTAL identity)
//  • dnaTag + version aware
//  • presence / band aware (via Governor + overlay)
//  • hot‑loop integrated (spinHotKeys + rebuild)
//  • dual‑band aligned (dataType + band hints)
//  • lineage + ancestry via Governor/CoreMemory
//  • advantage scoring (route + dataType + band)
//  • governor + evolution aligned
//  • RAM as scratchpad, CoreMemory as truth
//  • Layer‑aware (CoreLayers) + CoreSettings/CorePresence ready
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

import { createPulseCoreGovernor } from "./PulseCoreGovernor-v20.js";
import { PulseCoreLayersOrgan }    from "./PulseCoreLayers-v20.js";

// ============================================================================
//  AI_EXPERIENCE_META (IMMORTAL++)
// ============================================================================
export const AI_EXPERIENCE_META_PulseBinaryOverlay = {
  id: "corememory.binary.overlay",
  identity: "PulseBinaryCoreOverlay",
  version: "v20-IMMORTAL-BINARY-OVERLAY",
  layer: "corememory_binary",
  role: "binary_overlay_engine",
  lineage: "PulseCoreMemory-v20-IMMORTAL",

  evo: {
    binaryPrimary: true,
    symbolicAware: true,
    dualBand: true,

    overlayEngine: true,
    hydrationEngine: true,
    dehydrationEngine: true,

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
    band: ["memory", "binary", "overlay"],
    wave: ["deterministic", "low_level", "invisible"],
    binary: ["canonicalize", "interceptInbound", "interceptOutbound"],
    presence: ["overlay_presence_touch"],
    advantage: ["reuse", "hot_path", "route_aware"],
    speed: "hot_loop"
  }
};

// ============================================================================
//  AI_EXPERIENCE_CONTEXT
// ============================================================================
export const AI_EXPERIENCE_CONTEXT_PulseBinaryOverlay = {
  tone: "technical_silent",
  pacing: "instant",
  emotionalBand: "none_direct",
  primaryIntent: "canonicalize_binary_payloads",
  secondaryIntent: "optimize_memory_reuse",
  visualNotes: {
    icon: "binary_matrix",
    motion: "none",
    colorBand: "infra_core"
  },
  worldLens: {
    awareOfWorlds: true,
    notes: "routeId may encode world/realm; overlay must not assume single-world."
  },
  presenceLens: {
    awareOfPresence: true,
    notes: "future: presence intensity may bias reuse scoring."
  },
  settingsLens: {
    awareOfSettings: true,
    notes: "future: settings may tune scoring weights and scratchpad size."
  }
};

// ============================================================================
//  CORE ORGAN META
// ============================================================================
export const CORE_MEMORY_META_PulseBinaryOverlay = {
  id: "organ.corememory.binary.overlay",
  subsystem: "CoreMemory",
  layer: "BinaryOverlay",
  tier: "IMMORTAL",
  role: "Binary-Memory-Membrane",
  lineage: {
    family: "corememory_binary_overlay",
    generation: 3,
    coreVersion: "v20"
  },
  evoFlags: {
    binaryNative: true,
    memorySpineAligned: true,
    loopTheoryAware: true,
    routeAware: true,
    dnaAware: true,
    presenceAware: true,
    versionAware: true,
    dualBandSafe: true,
    lineageAware: true,
    advantageAware: true,
    ramOptional: true,
    overlayAware: true,
    layersAware: true
  }
};

// ============================================================================
//  CORE ORGAN CONTRACT
// ============================================================================
export const CORE_MEMORY_CONTRACT_PulseBinaryOverlay = {
  inputs: {
    dnaTag: "string",
    version: "string",
    coreGovernor: "PulseCoreGovernor | null",
    log: "function",
    warn: "function"
  },
  outputs: {
    canonicalize: "function(routeId, blobOrStruct, options?)",
    interceptInbound: "function(routeId, payload, options?)",
    interceptOutbound: "function(routeId, payload, options?)",
    flushRam: "function()",
    rebuildWorkingSetFromCore: "function(routeId?)",
    spinHotKeys: "function(minHits?)",
    Governor: "PulseCoreGovernor",
    CoreMemory: "CoreMemoryInterface",
    layers: "PulseCoreLayersOrgan"
  },
  consumers: [
    "PulseCoreBrain",
    "PulseCoreEvolution",
    "PulseCoreGovernor",
    "PulseCoreMemory",
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
export const IMMORTAL_OVERLAYS_PulseBinaryOverlay = {
  drift: {
    allowed: false,
    notes: "Binary canonicalization semantics must never drift."
  },
  pressure: {
    expectedLoad: "very_high",
    notes: "Hot path for binary payloads across organism."
  },
  stability: {
    algorithm: "stable",
    layout: "stable",
    notes: "Only additive evolution; no behavioral regressions."
  },
  load: {
    maxScratchEntriesHint: 8192,
    notes: "Scratchpad is RAM-only; CoreMemory is truth."
  },
  chunking: {
    prewarm: ["corememory.binary.overlay", "corememory.spine", "corememory.layers"],
    cacheKey: "corememory.binary.overlay.v20"
  },
  worldLens: {
    awareOfWorlds: true,
    notes: "routeId may encode world; overlay must remain route-local."
  },
  limbic: {
    band: "none_direct",
    notes: "Indirect emotional impact via performance + stability."
  },
  triHeart: {
    cognitive: "binary_structuring",
    emotional: "none_direct",
    behavioral: "reuse_and_deduplicate"
  },
  impulseSpeed: {
    primaryAction: "canonicalize",
    latencyTargetNs: 40000 // 40µs target
  },
  healingSurfaces: {
    enabled: true,
    notes: "Overlay reduces duplication and fragmentation in CoreMemory."
  }
};

export const BinaryOverlayRole = {
  type: "Organ",
  subsystem: "Core",
  layer: "BinaryOverlay",
  identity: "PulseBinaryOverlay",
  version: "20.0-IMMORTAL-BINARY-OVERLAY",

  evo: {
    binaryNative: true,
    memorySpineAligned: true,
    loopTheoryAware: true,
    routeAware: true,
    dnaAware: true,
    presenceAware: true,
    versionAware: true,
    dualBandSafe: true,
    lineageAware: true,
    advantageAware: true,
    ramOptional: true,
    overlayAware: true,
    layersAware: true
  }
};

// ---------------------------------------------------------------------------
//  v20 IDENTITY BLOCK (MetaBlock)
// ---------------------------------------------------------------------------
export const BinaryOverlayMetaBlock = {
  identity: "PulseBinaryOverlay",
  subsystem: "Core",
  layer: "BinaryOverlay",
  role: "Binary-Memory-Membrane",
  version: "20.0-IMMORTAL-BINARY-OVERLAY",
  evo: BinaryOverlayRole.evo
};

// ---------------------------------------------------------------------------
//  SIMPLE BINARY KEY (STRUCTURAL HASH)
// ---------------------------------------------------------------------------
function toBinaryKey(blobOrStruct) {
  const json =
    typeof blobOrStruct === "string"
      ? blobOrStruct
      : JSON.stringify(blobOrStruct || {});
  let h = 0;
  for (let i = 0; i < json.length; i++) {
    h = (h * 31 + json.charCodeAt(i)) | 0;
  }
  return "bin-" + (h >>> 0).toString(16);
}

// deterministic overlay epoch (for touch / logs)
let OVERLAY_EPOCH = 0;
function nextOverlayEpoch() {
  OVERLAY_EPOCH += 1;
  return OVERLAY_EPOCH;
}

// ---------------------------------------------------------------------------
//  CREATE BINARY OVERLAY — v20-IMMORTAL
// ---------------------------------------------------------------------------
export function createPulseBinaryOverlay({
  dnaTag = "default-dna",
  version = "20.0-IMMORTAL-BINARY-OVERLAY",
  coreGovernor = null,
  log = console.log,
  warn = console.warn
} = {}) {

  const Governor =
    coreGovernor ||
    createPulseCoreGovernor({
      dnaTag,
      version,
      log,
      warn
    });

  const CoreMemory = Governor.CoreMemory;

  // RAM scratchpad
  const Scratch = {
    byKey: Object.create(null)
  };

  function safeLog(stage, details = {}) {
    try {
      log("[PulseBinaryOverlay-v20]", stage, JSON.stringify(details));
    } catch {
      // fail-open
    }
  }

  // -------------------------------------------------------------------------
  //  INTERNAL: ADVANTAGE SCORING (v20)
  //  • routeId (non-global)
  //  • dataType (gpu/ai aware)
  //  • band (binary vs symbolic)
  //  • optional overlay hook
  // -------------------------------------------------------------------------
  function scoreEntry(routeId, dataType, band = "symbolic") {
    let score = 0;

    if (routeId !== "global") score += 1;
    if (dataType.includes("gpu")) score += 2;
    if (dataType.includes("ai")) score += 1;
    if (band === "binary") score += 1;

    if (Governor.overlay && typeof Governor.overlay.scoreBinaryEntry === "function") {
      try {
        const extra = Governor.overlay.scoreBinaryEntry({
          routeId,
          dataType,
          band,
          dnaTag,
          version
        });
        if (typeof extra === "number") score += extra;
      } catch (err) {
        warn("[PulseBinaryOverlay-v20] OVERLAY_SCORE_ERROR", String(err));
      }
    }

    return score;
  }

  // -------------------------------------------------------------------------
  //  CANONICALIZE (v20-IMMORTAL)
  //  • RAM scratchpad first
  //  • CoreMemory second
  //  • New entry last
  //  • presence / overlay touch via Governor
  // -------------------------------------------------------------------------
  function canonicalize(routeId, blobOrStruct, options = {}) {
    const route = routeId || "global";
    const binaryKey = toBinaryKey(blobOrStruct);
    const dataType = options.dataType || "generic";
    const band = options.band || "binary";

    const epoch = nextOverlayEpoch();

    // Presence‑touch via CoreMemory + Governor overlay
    try {
      CoreMemory.prewarm();
    } catch {}
    try {
      if (Governor.overlay?.touch) {
        Governor.overlay.touch(route, epoch, {
          band,
          dataType,
          binaryKey
        });
      }
    } catch {}

    // 1) RAM scratchpad
    const scratch = Scratch.byKey[binaryKey];
    if (scratch) {
      scratch.lastEpoch = epoch;
      Governor.set(route, binaryKey, scratch.value, { dataType, band });
      safeLog("CANONICALIZE_HIT_RAM", { route, binaryKey, dataType, band });
      return { binaryKey, value: scratch.value, reused: true };
    }

    // 2) CoreMemory
    const existing = Governor.get(route, binaryKey, { dataType, band });
    if (existing !== undefined) {
      Scratch.byKey[binaryKey] = {
        value: existing,
        routeId: route,
        lastEpoch: epoch,
        score: scoreEntry(route, dataType, band)
      };
      safeLog("CANONICALIZE_HIT_CORE", { route, binaryKey, dataType, band });
      return { binaryKey, value: existing, reused: true };
    }

    // 3) New entry
    Governor.set(route, binaryKey, blobOrStruct, { dataType, band });
    Scratch.byKey[binaryKey] = {
      value: blobOrStruct,
      routeId: route,
      lastEpoch: epoch,
      score: scoreEntry(route, dataType, band)
    };

    safeLog("CANONICALIZE_NEW", { route, binaryKey, dataType, band });
    return { binaryKey, value: blobOrStruct, reused: false };
  }

  // -------------------------------------------------------------------------
  //  INBOUND / OUTBOUND
  // -------------------------------------------------------------------------
  function interceptInbound(routeId, payload, options = {}) {
    return canonicalize(routeId, payload, {
      dataType: options.dataType || "inbound",
      band: options.band || "binary"
    });
  }

  function interceptOutbound(routeId, payload, options = {}) {
    return canonicalize(routeId, payload, {
      dataType: options.dataType || "outbound",
      band: options.band || "binary"
    });
  }

  // -------------------------------------------------------------------------
  //  RAM FLUSH / REBUILD
  // -------------------------------------------------------------------------
  function flushRam() {
    Scratch.byKey = Object.create(null);
    safeLog("FLUSH_RAM", {});
  }

  function rebuildWorkingSetFromCore(routeId = "global") {
    const snapshot = Governor.getRouteSnapshot(routeId) || {};
    const epoch = nextOverlayEpoch();

    const keys = Object.keys(snapshot);
    for (const key of keys) {
      const value = snapshot[key];
      Scratch.byKey[key] = {
        value,
        routeId,
        lastEpoch: epoch,
        score: scoreEntry(routeId, "rebuild", "binary")
      };
    }

    safeLog("REBUILD_WORKING_SET", {
      routeId,
      keys: keys.length
    });
  }

  // -------------------------------------------------------------------------
  //  LOOP THEORY (v20)
  //  • spin hot keys into RAM scratchpad
  // -------------------------------------------------------------------------
  function spinHotKeys(minHits = 3) {
    const hot = Governor.getHotKeys(minHits);
    const epoch = nextOverlayEpoch();

    for (const { id } of hot) {
      const [routeId, key] = id.split(":");
      const value = Governor.get(routeId, key, { dataType: "hot", band: "binary" });
      if (value !== undefined) {
        Scratch.byKey[key] = {
          value,
          routeId,
          lastEpoch: epoch,
          score: scoreEntry(routeId, "hot", "binary")
        };
      }
    }

    safeLog("SPIN_HOT_KEYS", { count: hot.length });
  }

  // -------------------------------------------------------------------------
  //  PUBLIC API
  // -------------------------------------------------------------------------
  const PulseBinaryOverlay = {
    BinaryOverlayRole,
    BinaryOverlayMetaBlock,
    Governor,
    CoreMemory,

    canonicalize,
    interceptInbound,
    interceptOutbound,

    flushRam,
    rebuildWorkingSetFromCore,

    spinHotKeys,

    dnaTag,
    version,

    // IMMORTAL meta exports
    AI_EXPERIENCE_META_PulseBinaryOverlay,
    AI_EXPERIENCE_CONTEXT_PulseBinaryOverlay,
    CORE_MEMORY_META_PulseBinaryOverlay,
    CORE_MEMORY_CONTRACT_PulseBinaryOverlay,
    IMMORTAL_OVERLAYS_PulseBinaryOverlay,

    // Layer attachment (same layer system as CoreMemory)
    layers: PulseCoreLayersOrgan
  };

  safeLog("INIT", {
    identity: BinaryOverlayRole.identity,
    version: BinaryOverlayRole.version,
    dnaTag
  });

  return PulseBinaryOverlay;
}
