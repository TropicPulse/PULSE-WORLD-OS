// ============================================================================
//  PULSE OS — PULSE EVOLUTIONARY PAGE ENGINE (v20‑IMMORTAL‑EVOLUTIONARY)
//  “Deterministic Page Evolution • Advantage View • Dual‑Band Lineage Memory”
// ============================================================================
//
//  EXPERIENCE METADATA — v20 IMMORTAL EVOLUTIONARY
// ============================================================================
/*
AI_EXPERIENCE_META = {
  identity: "PulseEvolutionaryCode",
  version: "v20-Immortal-Evolutionary",
  layer: "frontend",
  role: "page_evolution_engine",
  lineage: "PulseOS-v16 → v18 → v20-Immortal-Evolutionary",

  evo: {
    pageEvolution: true,
    lineageAware: true,
    advantageView: true,
    memoryPersistence: true,
    routeAware: true,

    deterministic: true,
    driftProof: true,
    dualBand: true,
    symbolicPrimary: true,
    binaryAware: true,

    domGuarded: true,
    domNonDestructive: true,
    wrapperScoped: true,

    unifiedAdvantageField: true,
    pulseEfficiencyAware: true,
    futureEvolutionReady: true,

    // v20 upgrades
    v20SchemaAware: true,
    v20AdvantageView: true,
    v20LineageTags: true,
    v20ConsoleAligned: true,
    v20LoggerAligned: true
  },

  contract: {
    always: [
      "PulseProofLogger",
      "PulseEvolutionMemory",
      "PulseCNSImpulseBus"
    ],
    never: [
      "dynamicEval",
      "unsafeInnerHTMLFromUser",
      "legacyEvolutionEngine"
    ]
  }
}
*/

// ============================================================================
//  GLOBAL HANDLE (for optional DB / environment)
// ============================================================================

const G =
  (typeof window !== "undefined" && window) ||
  (typeof globalThis !== "undefined" && globalThis) ||
  (typeof self !== "undefined" && self) ||
  (typeof global !== "undefined" && global) ||
  {};
const g = G;
// ============================================================================
// UNIVERSAL TIMESTAMP (Shadow or Admin)
// ============================================================================

const Timestamp =
  (G.firebaseAdmin && G.firebaseAdmin.firestore && G.firebaseAdmin.firestore.Timestamp) ||
  (G.Timestamp && G.Timestamp) ||
  null;

// ============================================================================
// UNIVERSAL ADMIN (Shadow or Admin)
// ============================================================================

const admin =
  (G.firebaseAdmin && G.firebaseAdmin) ||
  (G.admin && G.admin) ||
  null;

// ============================================================================
// UNIVERSAL DB (Shadow DB ALWAYS wins)
// ============================================================================
const db =
  (G.db && G.db) ||                 // Shadow DB (v25++)
  (admin && admin.firestore && admin.firestore()) || // Admin fallback
  null;

// ============================================================================
// UNIVERSAL LOGGING
// ============================================================================

const dblog =
  (G.log && G.log) ||
  console.log;

const dberror =
  (G.error && G.error) ||
  console.error;
  
const fetchFn =
  (G.fetchfn && typeof G.fetchfn === "function" && G.fetchfn) ||   // Shadow fetch alias
  (G.fetch && typeof G.fetch === "function" && G.fetch) ||         // Global broadcasted Shadow.fetch
  null;

// ============================================================================
//  PAGE ROLE — v20 IMMORTAL EVOLUTIONARY
// ============================================================================
export const PageRole = {
  type: "Organ",
  subsystem: "UI",
  layer: "PageEvo",
  version: "20.0-Immortal-Evolutionary",
  identity: "PulseEvolutionaryCode-v20",

  evo: {
    driftProof: true,
    deterministic: true,

    dualBand: true,
    symbolicAware: true,
    binaryAware: true,

    pageEvolution: true,
    lineageAware: true,
    memoryPersistence: true,
    routeAware: true,

    unifiedAdvantageField: true,
    futureEvolutionReady: true,
    domGuarded: true,
    advantageView: true,

    // v20: richer lineage + advantage
    v20SchemaAware: true,
    v20AdvantageView: true,
    v20LineageTags: true,
    v20ConsoleAligned: true,
    v20LoggerAligned: true
  }
};

// Schema version for persisted page models
const PAGE_SCHEMA_VERSION = "v4";

// ============================================================================
//  ADVANTAGE VIEW — v20 DETERMINISTIC SNAPSHOT
//  - Lightweight, deterministic summary of payload + binary
//  - Used by CNS / Router / Brain as a “how heavy is this page?” view
// ============================================================================
function computeAdvantageView({ payload, binaryPayload, lineage }) {
  const payloadSize = payload ? JSON.stringify(payload).length : 0;
  const binarySize = binaryPayload ? (binaryPayload.length || 0) : 0;

  const totalSize = payloadSize + binarySize;
  const sizeTier =
    totalSize > 256 * 1024 ? "colossal" :
    totalSize > 128 * 1024 ? "huge" :
    totalSize > 64 * 1024  ? "large" :
    totalSize > 16 * 1024  ? "medium" :
    totalSize > 0          ? "small" :
                             "empty";

  const density = totalSize > 0 ? binarySize / totalSize : 0;
  const entropyHint =
    totalSize > 0 ? clamp01(1 - Math.abs(0.5 - density) * 2) : 0.5;

  const lineageHash = hashString(JSON.stringify(lineage || {}));

  return {
    schemaVersion: PAGE_SCHEMA_VERSION,
    sizeTier,
    payloadSize,
    binarySize,
    totalSize,
    density,
    entropyHint,
    lineageHash
  };
}

function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) >>> 0;
  }
  return h >>> 0;
}

function clamp01(v) {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

// ============================================================================
//  FACTORY — PULSE EVOLUTIONARY CODE v20
//  - Evolution + restore + advantage snapshot
//  - No timers, no network, no eval
// ============================================================================
export function createPulseEvolutionaryCode({
  Evolution,
  LongTermMemory,
  CNS,
  log = console.log,
  warn = console.warn
} = {}) {
  // --------------------------------------------------------------------------
  //  INTERNAL PAGE STATE — deterministic, in‑memory only
  // --------------------------------------------------------------------------
  const PageState = {
    lastRender: null,
    lastLineage: null,
    lastBinary: null,
    lastModel: null,
    lastError: null,
    lastAdvantage: null,
    lastModeKind: null,
    eventSeq: 0
  };

  function nextSeq() {
    PageState.eventSeq += 1;
    return PageState.eventSeq;
  }

  function safeLog(stage, details = {}) {
    try {
      log(
        "[PulseEvolutionaryCode-v20]",
        stage,
        JSON.stringify({
          schemaVersion: PAGE_SCHEMA_VERSION,
          seq: PageState.eventSeq,
          identity: PageRole.identity,
          version: PageRole.version,
          ...details
        })
      );
    } catch {
      // never throw
    }
  }

  // --------------------------------------------------------------------------
  //  MEMORY LOAD — deterministic restore from LongTermMemory
  // --------------------------------------------------------------------------
  async function loadFromMemory() {
    nextSeq();
    try {
      const saved = await LongTermMemory?.loadPage?.();
      if (saved && typeof saved === "object") {
        safeLog("MEMORY_LOAD_OK", {
          hasBinary: !!saved.binary,
          sizeTier: saved.advantage?.sizeTier
        });

        PageState.lastModel = saved;
        PageState.lastLineage = saved.lineage || null;
        PageState.lastBinary = saved.binary || null;
        PageState.lastAdvantage = saved.advantage || null;

        applyModelToDOM(saved);
        return saved;
      }
    } catch (err) {
      const msg = String(err);
      PageState.lastError = msg;
      warn("[PulseEvolutionaryCode-v20] MEMORY_LOAD_ERROR", msg);
      safeLog("MEMORY_LOAD_ERROR", { error: msg });
    }
    safeLog("MEMORY_LOAD_EMPTY");
    return null;
  }

  // --------------------------------------------------------------------------
  //  MODEL BUILD — v20 schema + lineage + advantage
  // --------------------------------------------------------------------------
  function buildPageModel({ payload, binaryPayload }) {
    const lineage = Evolution?.getPageLineage?.() || {};
    const advantage = computeAdvantageView({ payload, binaryPayload, lineage });

    const model = {
      schemaVersion: PAGE_SCHEMA_VERSION,
      lineage,
      payload: payload || {},
      binary: binaryPayload || null,
      advantage,
      version: PageRole.version,
      timestamp: "NO_TIMESTAMP_v20"
    };

    PageState.lastLineage = lineage;
    PageState.lastBinary = binaryPayload || null;
    PageState.lastModel = model;
    PageState.lastAdvantage = advantage;

    return model;
  }

  // --------------------------------------------------------------------------
  //  DOM APPLY — wrapper‑scoped, deterministic, no user eval
  // --------------------------------------------------------------------------
  function applyModelToDOM(model) {
    if (typeof document === "undefined") {
      safeLog("DOM_SKIP_NO_DOCUMENT");
      return;
    }

    const wrapper =
      document.getElementById("evo-wrapper") ||
      document.querySelector("[data-pulse-evo-wrapper='true']");

    if (!wrapper) {
      safeLog("DOM_SKIP_NO_WRAPPER");
      return;
    }

    try {
      // Guarded: we fully own this wrapper; no external user HTML injected
      wrapper.innerHTML = "";

      const div = document.createElement("div");
      div.className = "evo-block evo-breathe evo-shimmer";

      const modeKind = model.binary ? "dual" : "symbolic";
      const sizeTier = model.advantage?.sizeTier || "unknown";
      const entropy = (model.advantage?.entropyHint ?? 0.5).toFixed(2);

      div.innerHTML = `
        <div class="evo-title">Pulse Evolutionary Page (v20)</div>
        <div class="evo-meta">
          <span class="evo-chip">mode: ${modeKind}</span>
          <span class="evo-chip">sizeTier: ${sizeTier}</span>
          <span class="evo-chip">entropy: ${entropy}</span>
        </div>
        <div class="evo-content">
          <pre>${escapeHtml(JSON.stringify(model, null, 2))}</pre>
        </div>
      `;

      wrapper.appendChild(div);
      PageState.lastRender = model;
      PageState.lastModeKind = modeKind;

      safeLog("DOM_APPLY_OK", {
        modeKind,
        sizeTier
      });
    } catch (err) {
      const msg = String(err);
      PageState.lastError = msg;
      warn("[PulseEvolutionaryCode-v20] DOM_APPLY_ERROR", msg);
      safeLog("DOM_APPLY_ERROR", { error: msg });
    }
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  // --------------------------------------------------------------------------
  //  MEMORY SAVE — deterministic, lineage‑aligned
  // --------------------------------------------------------------------------
  async function saveToMemory(model) {
    nextSeq();
    try {
      await LongTermMemory?.savePage?.(model);
      Evolution?.recordPageLineage?.(model);

      safeLog("MEMORY_SAVE_OK", {
        hasBinary: !!model.binary,
        sizeTier: model.advantage?.sizeTier
      });

      return { ok: true };
    } catch (err) {
      const msg = String(err);
      PageState.lastError = msg;
      warn("[PulseEvolutionaryCode-v20] MEMORY_SAVE_ERROR", msg);
      safeLog("MEMORY_SAVE_ERROR", { error: msg });
      return { ok: false, error: "MemorySaveError" };
    }
  }

  // --------------------------------------------------------------------------
  //  EVOLVE — main entrypoint
  //  - type: evolution reason (route change, model update, etc.)
//   - payload / binaryPayload: symbolic + binary surfaces
//   - context: optional CNS context
  // --------------------------------------------------------------------------
  async function evolve({ type, payload, binaryPayload, context } = {}) {
    nextSeq();
    const modeKind = binaryPayload ? "dual" : "symbolic";

    safeLog("EVOLVE_START", { type, modeKind });

    try {
      const model = buildPageModel({ payload, binaryPayload });
      applyModelToDOM(model);
      const saveRes = await saveToMemory(model);

      CNS?.emitImpulse?.("PulseEvolutionaryCode-v20", {
        event: "evolve",
        type,
        modeKind,
        executionContext: context || {},
        advantage: model.advantage
      });

      const ok = !!saveRes.ok;
      safeLog("EVOLVE_DONE", {
        type,
        ok,
        modeKind,
        sizeTier: model.advantage?.sizeTier
      });

      return {
        ok,
        model,
        advantage: model.advantage
      };
    } catch (err) {
      const msg = String(err);
      PageState.lastError = msg;
      warn("[PulseEvolutionaryCode-v20] EVOLVE_ERROR", msg);
      safeLog("EVOLVE_ERROR", { error: msg });
      return { ok: false, error: "EvolveError" };
    }
  }

  // --------------------------------------------------------------------------
  //  RESTORE — restore last evolutionary state from memory
  // --------------------------------------------------------------------------
  async function restore() {
    nextSeq();
    const restored = await loadFromMemory();
    if (restored) {
      const modeKind = restored.binary ? "dual" : "symbolic";

      CNS?.emitImpulse?.("PulseEvolutionaryCode-v20", {
        event: "restore",
        modeKind,
        advantage: restored.advantage || null
      });

      safeLog("RESTORE_OK", {
        modeKind,
        sizeTier: restored.advantage?.sizeTier
      });

      return {
        ok: true,
        model: restored,
        advantage: restored.advantage || null
      };
    }
    safeLog("RESTORE_EMPTY");
    return { ok: false, error: "NoSavedPage" };
  }

  // --------------------------------------------------------------------------
  //  PUBLIC ORGAN SURFACE
  // --------------------------------------------------------------------------
  const PulseEvolutionaryCode = {
    PageRole,
    PageState,
    evolve,
    restore,

    // Advantage snapshot for Brain / Router / Power
    getAdvantageSnapshot() {
      return PageState.lastAdvantage || null;
    },

    // Optional: debug snapshot
    getDebugSnapshot() {
      return {
        identity: PageRole.identity,
        version: PageRole.version,
        lastModeKind: PageState.lastModeKind,
        lastError: PageState.lastError,
        lastAdvantage: PageState.lastAdvantage
      };
    }
  };

  safeLog("INIT", {
    identity: PageRole.identity,
    version: PageRole.version
  });

  return PulseEvolutionaryCode;
}

// ============================================================================
//  GLOBAL BINDINGS (OPTIONAL, NON‑CRITICAL)
// ============================================================================
try {
  if (typeof window !== "undefined") {
    window.PulseEvolutionaryCode = createPulseEvolutionaryCode;
  }
  if (typeof globalThis !== "undefined") {
    window.PulseEvolutionaryCode = createPulseEvolutionaryCode;
  }
  if (typeof global !== "undefined") {
    window.PulseEvolutionaryCode = createPulseEvolutionaryCode;
  }
  if (typeof g !== "undefined") {
    g.PulseEvolutionaryCode = createPulseEvolutionaryCode;
  }
} catch {
  // never throw
}
