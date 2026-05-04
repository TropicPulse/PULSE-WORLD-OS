/*
===============================================================================
FILE: /PULSE-UI/PulseEvolutionaryCode.js
LAYER: UI PAGE EVOLUTION ORGAN
===============================================================================

ROLE (v15):
  THE PAGE EVOLUTION ORGAN — deterministic self‑evolving page layer.
  • Builds page models from symbolic + binary payloads.
  • Applies deterministic DOM updates (guarded).
  • Persists models via PulseCoreMemory (route‑aware).
  • Emits CNS impulses for evolution events.

PURPOSE (v15):
  • Provide a stable, deterministic, drift‑proof page evolution engine.
  • Guarantee lineage‑aware, route‑aware, memory‑aware evolution.
  • Serve as the execution layer beneath the Page Brain.

CONTRACT:
  • PURE LOGIC except DOM writes.
  • No randomness, no network, no filesystem.
  • Deterministic output only.

SAFETY:
  • v15 upgrade is PURE + STRUCTURAL — logic is richer but still safe.
  • All behavior is deterministic and organism‑safe.
===============================================================================
===============================================================================
AI_EXPERIENCE_META = {
  identity: "PulseUI.EvolutionaryCode",
  version: "v15-Immortal",
  layer: "pulse_ui",
  role: "page_evolution_organ",
  lineage: "PulseEvolutionaryCode-v11.3-Evo-Prime → v14-Immortal → v15-Immortal",

  evo: {
    pageEvolution: true,
    dualBand: true,
    symbolicPrimary: true,
    binaryAware: true,
    memoryPersistence: true,
    routeAware: true,
    lineageAware: true,
    cnsAware: true,
    unifiedAdvantageField: true,
    futureEvolutionReady: true,

    deterministic: true,
    driftProof: true,
    pureCompute: true,

    zeroNetwork: true,
    zeroFilesystem: true,
    zeroMutationOfInput: true,

    // v15 upgrades
    schemaVersioned: true,
    errorAware: true,
    domGuarded: true
  },

  contract: {
    always: [
      "PulseUI.Evolution",
      "PulseUI.EvolutionaryMemory",
      "PulseCore.Memory",
      "PulseCore.CNS",
      "PulseUI.EvolutionaryBrain"
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
  organ: "PulseUI.EvolutionaryCode",
  layer: "pulse_ui",
  stability: "IMMORTAL",
  deterministic: true,
  pure: true,

  consumes: [
    "Evolution",
    "LongTermMemory",
    "CNS"
  ],

  produces: [
    "PageModel",
    "RenderedDOM",
    "MemorySaveResult",
    "RestoreResult"
  ],

  sideEffects: "dom_manipulation_only",
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

export const PageRole = {
  type: "Organ",
  subsystem: "UI",
  layer: "PageEvo",
  version: "15.0-Immortal",
  identity: "PulseEvolutionaryCode",

  evo: {
    driftProof: true,
    deterministic: true,
    dualBand: true,
    binaryAware: true,
    symbolicAware: true,
    pageEvolution: true,
    lineageAware: true,
    memoryPersistence: true,
    routeAware: true,
    unifiedAdvantageField: true,
    futureEvolutionReady: true
  }
};

const PAGE_SCHEMA_VERSION = "v2";

// ============================================================================
// FACTORY — dependencies injected by the Page Brain
// ============================================================================
export function createPulseEvolutionaryCode({
  Evolution,
  LongTermMemory,   // route-aware PulseCoreMemory client
  CNS,
  log = console.log,
  warn = console.warn
} = {}) {

  const PageState = {
    lastRender: null,
    lastLineage: null,
    lastBinary: null,
    lastModel: null,
    lastError: null,
    eventSeq: 0
  };

  function nextSeq() {
    PageState.eventSeq += 1;
    return PageState.eventSeq;
  }

  function safeLog(stage, details = {}) {
    try {
      log(
        "[PulseEvolutionaryCode]",
        stage,
        JSON.stringify({
          schemaVersion: PAGE_SCHEMA_VERSION,
          seq: PageState.eventSeq,
          ...details
        })
      );
    } catch {}
  }

  // --------------------------------------------------------------------------
  // LOAD PREVIOUS EVOLUTION FROM MEMORY (CORE‑POWERED)
  // --------------------------------------------------------------------------
  async function loadFromMemory() {
    nextSeq();
    try {
      const saved = await LongTermMemory?.loadPage?.();
      if (saved && typeof saved === "object") {
        safeLog("MEMORY_LOAD_OK", {});
        PageState.lastModel = saved;
        applyModelToDOM(saved);
        return saved;
      }
    } catch (err) {
      const msg = String(err);
      PageState.lastError = msg;
      warn("[PulseEvolutionaryCode] MEMORY_LOAD_ERROR", msg);
      safeLog("MEMORY_LOAD_ERROR", { error: msg });
    }
    safeLog("MEMORY_LOAD_EMPTY", {});
    return null;
  }

  // --------------------------------------------------------------------------
  // BUILD PAGE MODEL — deterministic, no randomness
  // --------------------------------------------------------------------------
  function buildPageModel({ payload, binaryPayload }) {
    const lineage = Evolution?.getPageLineage?.() || {};

    const model = {
      schemaVersion: PAGE_SCHEMA_VERSION,
      lineage,
      payload: payload || {},
      binary: binaryPayload || null,
      version: PageRole.version,
      timestamp: "NO_TIMESTAMP_v15" // deterministic placeholder
    };

    PageState.lastLineage = lineage;
    PageState.lastBinary = binaryPayload || null;
    PageState.lastModel = model;

    return model;
  }

  // --------------------------------------------------------------------------
  // APPLY PAGE MODEL TO DOM — deterministic, guarded
  // --------------------------------------------------------------------------
  function applyModelToDOM(model) {
    if (typeof document === "undefined") {
      safeLog("DOM_SKIP_NO_DOCUMENT", {});
      return;
    }

    const wrapper = document.getElementById("evo-wrapper");
    if (!wrapper) {
      safeLog("DOM_SKIP_NO_WRAPPER", {});
      return;
    }

    try {
      wrapper.innerHTML = "";

      const div = document.createElement("div");
      div.className = "evo-block evo-breathe evo-shimmer";

      div.innerHTML = `
        <div class="evo-title">Pulse Evolutionary Page</div>
        <div class="evo-content"><pre>${JSON.stringify(model, null, 2)}</pre></div>
      `;

      wrapper.appendChild(div);
      PageState.lastRender = model;
      safeLog("DOM_APPLY_OK", {});
    } catch (err) {
      const msg = String(err);
      PageState.lastError = msg;
      warn("[PulseEvolutionaryCode] DOM_APPLY_ERROR", msg);
      safeLog("DOM_APPLY_ERROR", { error: msg });
    }
  }

  // --------------------------------------------------------------------------
  // SAVE MODEL TO MEMORY — PulseCoreMemory (route-aware)
  // --------------------------------------------------------------------------
  async function saveToMemory(model) {
    nextSeq();
    try {
      await LongTermMemory?.savePage?.(model);
      Evolution?.recordPageLineage?.(model);
      safeLog("MEMORY_SAVE_OK", {});
      return { ok: true };
    } catch (err) {
      const msg = String(err);
      PageState.lastError = msg;
      warn("[PulseEvolutionaryCode] MEMORY_SAVE_ERROR", msg);
      safeLog("MEMORY_SAVE_ERROR", { error: msg });
      return { ok: false, error: "MemorySaveError" };
    }
  }

  // --------------------------------------------------------------------------
  // PUBLIC ENTRY — evolve the page
  // --------------------------------------------------------------------------
  async function evolve({ type, payload, binaryPayload, context } = {}) {
    nextSeq();
    safeLog("EVOLVE_START", { type });

    try {
      const model = buildPageModel({ payload, binaryPayload });
      applyModelToDOM(model);
      const saveRes = await saveToMemory(model);

      CNS?.emitImpulse?.("PulseEvolutionaryCode", {
        modeKind: binaryPayload ? "dual" : "symbolic",
        executionContext: context || {}
      });

      const ok = !!saveRes.ok;
      safeLog("EVOLVE_DONE", { type, ok });
      return { ok, model };
    } catch (err) {
      const msg = String(err);
      PageState.lastError = msg;
      warn("[PulseEvolutionaryCode] EVOLVE_ERROR", msg);
      safeLog("EVOLVE_ERROR", { error: msg });
      return { ok: false, error: "EvolveError" };
    }
  }

  // --------------------------------------------------------------------------
  // PUBLIC ENTRY — restore previous evolution
  // --------------------------------------------------------------------------
  async function restore() {
    nextSeq();
    const restored = await loadFromMemory();
    if (restored) {
      safeLog("RESTORE_OK", {});
      return { ok: true, model: restored };
    }
    safeLog("RESTORE_EMPTY", {});
    return { ok: false, error: "NoSavedPage" };
  }

  const PulseEvolutionaryCode = {
    PageRole,
    PageState,
    evolve,
    restore
  };

  safeLog("INIT", {
    identity: PageRole.identity,
    version: PageRole.version
  });

  return PulseEvolutionaryCode;
}
try {
  if (typeof window !== "undefined") {
    window.PulseEvolutionaryCode = createPulseEvolutionaryCode;
  }
  if (typeof globalThis !== "undefined") {
    globalThis.PulseEvolutionaryCode = createPulseEvolutionaryCode;
  }
  if (typeof global !== "undefined") {
    global.PulseEvolutionaryCode = createPulseEvolutionaryCode;
  }
  if (typeof g !== "undefined") {
    g.PulseEvolutionaryCode = createPulseEvolutionaryCode;
  }
} catch {}