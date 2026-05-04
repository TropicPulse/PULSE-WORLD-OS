/*
===============================================================================
FILE: /PULSE-UI/PulseEvolutionaryBrain.js
LAYER: UI PAGE BRAIN / PAGE CORTEX
===============================================================================

ROLE (v15):
  THE PAGE BRAIN — The UI cortex + coordination layer.
  • Wires Code + Memory + CNS into a deterministic evolution pipeline.
  • Chooses restore vs fresh evolve paths with explicit boot path tracking.
  • Emits CNS impulses for restore/evolve events.
  • Maintains deterministic state for the page.

PURPOSE (v15):
  • Provide a stable, deterministic, drift‑proof UI brain.
  • Coordinate MemoryOrgan + CodeOrgan + CNS.
  • Guarantee deterministic boot behavior with explicit boot path metadata.
  • Serve as the UI CNS‑aware cortex for the organism.

CONTRACT:
  • PURE ORCHESTRATION — no IO, no network, no filesystem.
  • Delegates all persistence to MemoryOrgan.
  • Delegates all evolution to CodeOrgan.
  • Deterministic output only.

SAFETY:
  • v15 upgrade is PURE + STRUCTURAL — logic is richer but still safe.
  • All behavior is deterministic and organism‑safe.
===============================================================================
===============================================================================
AI_EXPERIENCE_META = {
  identity: "PulseUI.EvolutionaryBrain",
  version: "v15-IMMORTAL",
  layer: "pulse_ui",
  role: "page_brain_and_cortex",
  lineage: "PulseEvolutionaryBrain-v11.3-Evo-Prime → v14-IMMORTAL → v15-IMMORTAL",

  evo: {
    pageBrain: true,
    cortex: true,
    cnsAware: true,
    memoryAware: true,
    routeAware: true,
    dualBandAware: true,
    symbolicPrimary: true,
    binaryAware: true,
    lineageAware: true,
    unifiedAdvantageField: true,
    futureEvolutionReady: true,

    deterministic: true,
    driftProof: true,
    pureCompute: true,

    zeroNetwork: true,
    zeroFilesystem: true,
    zeroMutationOfInput: true,

    // v15 upgrades
    bootPathAware: true,
    errorAware: true,
    schemaVersioned: true
  },

  contract: {
    always: [
      "PulseUI.Evolution",
      "PulseUI.RouteOrgan",
      "PulseUI.EvolutionaryCode",
      "PulseUI.EvolutionaryMemory",
      "PulseCore.CNS"
    ],
    never: [
      "eval",
      "Function",
      "dynamicImport",
      "fetchViaCNS",
      "safeRoute"
    ]
  }
}
===============================================================================
EXPORT_META = {
  organ: "PulseUI.EvolutionaryBrain",
  layer: "pulse_ui",
  stability: "IMMORTAL",
  deterministic: true,
  pure: true,

  consumes: [
    "Evolution",
    "LongTermMemory",
    "CNS",
    "createCode",
    "createMemory"
  ],

  produces: [
    "bootResult",
    "restoreResult",
    "freshEvolveResult"
  ],

  sideEffects: "logging_only",
  network: "none",
  filesystem: "none"
}

*/

// Global handle
const g =
  typeof globalThis !== "undefined"
    ? globalThis
    : typeof global !== "undefined"
    ? global
    : typeof window !== "undefined"
    ? window
    : typeof g !== "undefined"
    ? g
    : {};

// Prefer global db if present (logger page / server)
const db =
  (g && g.db) ||
  (typeof global !== "undefined" && global.db) ||
  (typeof globalThis !== "undefined" && globalThis.db) ||
  (typeof window !== "undefined" && window.db) ||
  null;

export const BrainRole = {
  type: "Organ",
  subsystem: "UI",
  layer: "PageBrain",
  version: "15.0-IMMORTAL",
  identity: "PulseEvolutionaryBrain",

  evo: {
    driftProof: true,
    deterministic: true,
    pageBrain: true,
    dualBandAware: true,
    memoryAware: true,
    cnsAware: true,
    routeAware: true,
    unifiedAdvantageField: true,
    futureEvolutionReady: true
  }
};

const BRAIN_SCHEMA_VERSION = "v2";

// ============================================================================
// FACTORY — wires Code + Memory + CNS using the Core Memory Spine
// ============================================================================
export function createPulseEvolutionaryBrain({
  Evolution,
  LongTermMemory,   // route-aware client of PulseCoreMemory
  CNS,
  createCode,       // factory: () => PulseEvolutionaryCode organ
  createMemory,     // factory: () => PulseEvolutionaryMemory organ
  log = console.log,
  warn = console.warn
} = {}) {

  const BrainState = {
    initialized: false,
    lastMode: null,        // "restore" | "fresh"
    lastResult: null,
    lastBootPath: null,    // "restore" | "fresh"
    lastError: null,
    eventSeq: 0
  };

  function nextSeq() {
    BrainState.eventSeq += 1;
    return BrainState.eventSeq;
  }

  function safeLog(stage, details = {}) {
    try {
      log(
        "[PulseEvolutionaryBrain]",
        stage,
        JSON.stringify({
          schemaVersion: BRAIN_SCHEMA_VERSION,
          seq: BrainState.eventSeq,
          ...details
        })
      );
    } catch {}
  }

  // --------------------------------------------------------------------------
  // Instantiate sub‑organs (route-aware memory + code)
  // --------------------------------------------------------------------------
  const MemoryOrgan =
    typeof createMemory === "function"
      ? createMemory({ log, warn })
      : LongTermMemory || null;

  const CodeOrgan =
    typeof createCode === "function"
      ? createCode({ Evolution, LongTermMemory: MemoryOrgan, CNS, log, warn })
      : null;

  if (!MemoryOrgan) warn("[PulseEvolutionaryBrain] NO_MEMORY_ORGAN");
  if (!CodeOrgan) warn("[PulseEvolutionaryBrain] NO_CODE_ORGAN");

  // --------------------------------------------------------------------------
  // RESTORE PATH — deterministic, binary-native, core-powered
  // --------------------------------------------------------------------------
  async function restore() {
    nextSeq();

    if (!MemoryOrgan || !CodeOrgan) {
      const errorInfo = "MissingOrgans";
      BrainState.lastMode = "restore";
      BrainState.lastError = errorInfo;
      safeLog("RESTORE_MISSING_ORGANS", { error: errorInfo });
      return { ok: false, error: errorInfo };
    }

    try {
      const model = await MemoryOrgan.loadPage();
      if (!model) {
        BrainState.lastMode = "restore";
        BrainState.lastError = "NoSavedPage";
        safeLog("RESTORE_EMPTY", {});
        return { ok: false, error: "NoSavedPage" };
      }

      const res = await CodeOrgan.restore?.();
      BrainState.lastMode = "restore";
      BrainState.lastResult = res || null;
      BrainState.lastError = res?.ok ? null : (res?.error || null);

      CNS?.emitImpulse?.("PulseEvolutionaryBrain", {
        event: "restore",
        ok: !!res?.ok
      });

      safeLog("RESTORE_DONE", { ok: !!res?.ok });
      return res || { ok: true, model };
    } catch (err) {
      const msg = String(err);
      BrainState.lastMode = "restore";
      BrainState.lastError = msg;

      CNS?.emitImpulse?.("PulseEvolutionaryBrain", {
        event: "restore",
        ok: false
      });

      safeLog("RESTORE_ERROR", { error: msg });
      return { ok: false, error: "RestoreError" };
    }
  }

  // --------------------------------------------------------------------------
  // FRESH EVOLVE PATH — deterministic, no randomness
  // --------------------------------------------------------------------------
  async function freshEvolve({ type = "page:init", payload, binaryPayload, context } = {}) {
    nextSeq();

    if (!CodeOrgan) {
      const errorInfo = "MissingCodeOrgan";
      BrainState.lastMode = "fresh";
      BrainState.lastError = errorInfo;
      safeLog("FRESH_EVOLVE_MISSING_CODE", { error: errorInfo });
      return { ok: false, error: errorInfo };
    }

    try {
      const res = await CodeOrgan.evolve({ type, payload, binaryPayload, context });
      BrainState.lastMode = "fresh";
      BrainState.lastResult = res || null;
      BrainState.lastError = res?.ok ? null : (res?.error || null);

      CNS?.emitImpulse?.("PulseEvolutionaryBrain", {
        event: "freshEvolve",
        ok: !!res?.ok
      });

      safeLog("FRESH_EVOLVE_DONE", { ok: !!res?.ok });
      return res;
    } catch (err) {
      const msg = String(err);
      BrainState.lastMode = "fresh";
      BrainState.lastError = msg;

      CNS?.emitImpulse?.("PulseEvolutionaryBrain", {
        event: "freshEvolve",
        ok: false
      });

      safeLog("FRESH_EVOLVE_ERROR", { error: msg });
      return { ok: false, error: "FreshEvolveError" };
    }
  }

  // --------------------------------------------------------------------------
  // PUBLIC ENTRY — boot sequence
  // 1) Try restore from memory
  // 2) If none, do fresh evolve
  // --------------------------------------------------------------------------
  async function boot({ payload, binaryPayload, context } = {}) {
    nextSeq();
    safeLog("BOOT_START", {});

    const restored = await restore();
    if (restored?.ok) {
      BrainState.initialized = true;
      BrainState.lastBootPath = "restore";
      safeLog("BOOT_RESTORE_PATH", {});
      return restored;
    }

    const fresh = await freshEvolve({ type: "page:init", payload, binaryPayload, context });
    BrainState.initialized = true;
    BrainState.lastBootPath = "fresh";
    safeLog("BOOT_FRESH_PATH", {});
    return fresh;
  }

  const PulseEvolutionaryBrain = {
    BrainRole,
    BrainState,
    boot,
    restore,
    freshEvolve
  };

  safeLog("INIT", {
    identity: BrainRole.identity,
    version: BrainRole.version,
    schemaVersion: BRAIN_SCHEMA_VERSION
  });

  return PulseEvolutionaryBrain;
}
try {
  if (typeof window !== "undefined") {
    window.PulseEvolutionaryBrain = createPulseEvolutionaryBrain;
  }
  if (typeof globalThis !== "undefined") {
    globalThis.PulseEvolutionaryBrain = createPulseEvolutionaryBrain;
  }
  if (typeof global !== "undefined") {
    global.PulseEvolutionaryBrain = createPulseEvolutionaryBrain;
  }
  if (typeof g !== "undefined") {
    g.PulseEvolutionaryBrain = createPulseEvolutionaryBrain;
  }
} catch {}