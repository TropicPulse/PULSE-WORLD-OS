// ============================================================================
//  PULSE OS — SIGNAL PORT ORGAN (v30 IMMORTAL++)
//  FILE: /PULSE-SIGNAL/PULSE-FINALITY-PORT.js
//  ORGAN: PulseSignalPort
//  ROLE:
//    - PulseImport / PulseExport / Subimport / Module Envelope Bridge
//    - PulseSignalKey bridge → PulseIO (offline .env-style file, backend-prepared)
//    - Secrets host + Kill-switch dispatch + Runtime freeze surface
//    - Optional binary key projection (advantage-only, no raw secret storage)
// ============================================================================
//
//  This organ is the *bridge* between:
//    - PulseChunks (code + assets)
//    - PulsePresenceNormalizer (value normalizer / unwrap)
//    - PulseTouch* organs (analytics, predictor, advantage, presence)
//    - Local in-memory + localStorage module registry
//    - PulseSignalKey → PulseIO (offline, backend-prepared, non-network)
//    - Optional binary key codec (symbolic / advantage-only)
//
//  It does NOT:
//    - Reach the network
//    - Parse files directly
//    - Store real secrets
//    - Own authority (that lives in Approval / Overmind / SecretsLayer)
// ============================================================================


// Soft globals
const G =
  (typeof window !== "undefined" && window) ||
  (typeof globalThis !== "undefined" && globalThis) ||
  (typeof self !== "undefined" && self) ||
  (typeof global !== "undefined" && global) ||
  {};

// Optional integrations (all soft / optional)
const PulseChunks = G.PulseChunks || null;
const PulsePresenceNormalizerStore = G.PulsePresenceNormalizerStore || null;
const PulseChunkNormalizer = G.PulseChunkNormalizer || null;

// Optional PulseFunction library (soft)
const PulseFunctionLibrary = G.PulseFunctionLibrary || null;

// Optional higher organs (soft)
const PulseSecretsLayer = G.PulseSecretsLayer || null;   // secure enclave (external)
const PulseOvermind = G.PulseOvermind || null;           // execution brain (external)
const PulseApproval = G.PulseApproval || null;           // authority organ (external)

// NEW: PulseIO + Binary codec (backend/offline, soft)
// - PulseIO: backend-prepared view of your PulseIO file (old .env, parsed offline)
//   Shape suggestion (soft, not required):
//     G.PulseIO = {
//       getSnapshot(pulseSignalKey) → { metaOnlyConfig },
//       getMeta(pulseSignalKey) → { source, keys, tags }
//     }
// - PulseBinaryKeyCodec: optional binary projection of the key (advantage-only)
//   Shape suggestion:
//     G.PulseBinaryKeyCodec = {
//       toBits(pulseSignalKey) → number[] (0/1 only),
//       meta(pulseSignalKey) → { band, tier, hint }
//     }
const PulseIO = G.PulseIO || null;
const PulseBinaryKeyCodec = G.PulseBinaryKeyCodec || null;

// ============================================================================
//  AI EXPERIENCE META
// ============================================================================
export const AI_EXPERIENCE_META_PulseSignalPort = {
  id: "pulse.signal_port",
  kind: "bridge_organ",
  version: "v30-IMMORTAL++",
  role: "pulse_import_export_bridge",
  surfaces: {
    band: [
      "signal",
      "import",
      "export",
      "module",
      "subimport",
      "chunks",
      "memory",
      "secrets_host",
      "kill_switch",
      "runtime_freeze",
      "pulse_signal_key",
      "pulse_io_bridge",
      "binary_key_projection"
    ],
    wave: ["quiet", "structural", "deterministic"],
    presence: ["signal_port_state"],
    speed: "sync"
  }
};

// ============================================================================
//  ORGAN META
// ============================================================================
export const ORGAN_META_PulseSignalPort = {
  id: "organ.pulse.signal_port",
  organism: "PulseOS",
  layer: "bridge.signal_port",
  tier: "IMMORTAL",
  evoFlags: {
    deterministic: true,
    driftProof: true,
    asyncSafe: true,
    zeroPII: true,
    zeroTracking: true,

    moduleAware: true,
    chunkAware: true,
    presenceAware: true,
    warmupAware: true,
    analyticsAware: true,
    predictorAware: true,
    advantageAware: true,

    pulseImportAware: true,
    pulseExportAware: true,
    subimportAware: true,
    tierAware: true,
    registryAware: true,

    secretsHostAware: true,
    killSwitchAware: true,
    runtimeFreezeAware: true,

    // NEW
    pulseSignalKeyAware: true,
    pulseIOAware: true,
    binaryKeyAware: true
  }
};

// ============================================================================
//  ORGAN CONTRACT
// ============================================================================
export const ORGAN_CONTRACT_PulseSignalPort = {
  inputs: {
    moduleEnvelope: "Optional pre-normalized module envelope (from Warmup / Chunks)",
    context: "Optional context: { page, region, mode, advantage, predictor, analytics, pulseSignalKey }"
  },
  outputs: {
    PulseImport: "Function: (id: string) => any | null",
    PulseExport: "Function: (id: string, value: any, meta?: object) => void",
    PulseSubimport: "Function: (id: string, subpath: string) => any | null",
    registrySnapshot: "Current module registry snapshot",
    moduleEnvelope: "Normalized module envelope for current page/context",
    secrets: "Secrets host surface: { active, authority, softKill, stripKeys }",
    runtime: "Runtime control surface: { freeze, frozen }",
    signal: "PulseSignalKey bridge surface: { key, source, pulseIO, binary }"
  },
  guarantees: {
    deterministic: true,
    noNetwork: true,
    noSideEffects: true // beyond local in-memory + localStorage registry
  }
};

// ============================================================================
//  IMMORTAL OVERLAYS
// ============================================================================
export const IMMORTAL_OVERLAYS_PulseSignalPort = {
  drift: { allowed: false },
  pressure: { expectedLoad: "medium" },
  stability: { semantics: "stable" },
  load: { maxComponents: 1 }
};

// ============================================================================
//  INTERNAL REGISTRY — IMMORTAL++ SAFE
// ============================================================================
//
//  Registry is *local* to this tab/process, with optional localStorage echo.
//  It is NOT a secret store. It only holds module metadata + references.
//
const REGISTRY_MAX = 256;

function createRegistry() {
  return {
    modules: {}, // key: moduleId → { exports, imports, meta, ts }
    order: []    // insertion order for trimming
  };
}

function registryKeyFromContext(context = {}) {
  const page = context.page || "index";
  const region = context.region || "unknown";
  const mode = context.mode || "safe";
  return `${page}::${region}::${mode}`;
}

function trimRegistry(state) {
  const { modules, order } = state;
  if (order.length <= REGISTRY_MAX) return;
  const excess = order.length - REGISTRY_MAX;
  for (let i = 0; i < excess; i++) {
    const key = order[i];
    delete modules[key];
  }
  state.order = order.slice(excess);
}

// ============================================================================
//  NORMALIZATION HELPERS
// ============================================================================
function safeNormalize(value, typeHint = null, options = {}) {
  if (!PulseChunkNormalizer || typeof PulseChunkNormalizer.normalizeChunkValue !== "function") {
    return value;
  }
  try {
    return PulseChunkNormalizer.normalizeChunkValue(value, typeHint, options);
  } catch {
    return value;
  }
}

function unwrapOnce(value) {
  if (!PulseChunkNormalizer || typeof PulseChunkNormalizer.unwrap !== "function") {
    return value;
  }
  try {
    return PulseChunkNormalizer.unwrap(value);
  } catch {
    return value;
  }
}

// Module envelope normalization
function normalizeModuleEnvelope(rawEnvelope = {}, context = {}) {
  const page = context.page || rawEnvelope.page || "index";

  const exportsMeta = rawEnvelope.exportsMeta || rawEnvelope.exports || {};
  const importsMeta = rawEnvelope.importsMeta || rawEnvelope.imports || {};
  const exportTiers = rawEnvelope.exportTiers || {};
  const subimports = rawEnvelope.subimports || {};
  const chunkProfile = rawEnvelope.chunkProfile || null;
  const lineage = rawEnvelope.lineage || null;

  // NEW: allow pulseSignalKey to be carried on envelope (soft)
  const pulseSignalKey =
    rawEnvelope.pulseSignalKey ||
    context.pulseSignalKey ||
    G.PULSE_SIGNAL_KEY ||
    null;

  return {
    id: rawEnvelope.id || `module::${page}`,
    page,
    exportsMeta,
    importsMeta,
    exportTiers,
    subimports,
    chunkProfile,
    lineage,
    pulseSignalKey,
    ts: Date.now()
  };
}

// Try to pull module envelope from Warmup cache or PulseChunks
function resolveModuleEnvelope(context = {}) {
  const page = context.page || "index";

  // 1) Warmup cache (if present)
  try {
    const cache = G.PulseImportWarmupCache || {};
    if (cache[page]) {
      return normalizeModuleEnvelope(cache[page], context);
    }
  } catch {}

  // 2) PulseChunks (if present)
  try {
    if (PulseChunks && typeof PulseChunks.getModuleEnvelope === "function") {
      const raw = PulseChunks.getModuleEnvelope(page);
      if (raw) return normalizeModuleEnvelope(raw, context);
    }
  } catch {}

  // 3) Fallback: empty envelope
  return normalizeModuleEnvelope({}, context);
}

// ============================================================================
//  REGISTRY OPERATIONS
// ============================================================================
function registerModule(state, envelope) {
  const key = envelope.id;
  if (!key) return;

  if (!state.modules[key]) {
    state.order.push(key);
  }
  state.modules[key] = {
    exports: {},
    imports: envelope.importsMeta || {},
    meta: {
      page: envelope.page,
      exportTiers: envelope.exportTiers || {},
      subimports: envelope.subimports || {},
      chunkProfile: envelope.chunkProfile || null,
      lineage: envelope.lineage || null,
      pulseSignalKey: envelope.pulseSignalKey || null,
      ts: envelope.ts
    }
  };

  trimRegistry(state);

  // Optional echo to localStorage (non-critical, meta only)
  try {
    const snapshot = {
      key,
      meta: state.modules[key].meta
    };
    localStorage.setItem("PulseSignalPortRegistry_v30", JSON.stringify(snapshot));
  } catch {}
}

function getModuleRecord(state, moduleId) {
  return state.modules[moduleId] || null;
}

// ============================================================================
//  PULSE FUNCTION ORGAN (MEMORY-ONLY, OPTIONAL)
// ============================================================================
function ensurePulseGlobal() {
  if (!G.PulseGlobal) G.PulseGlobal = {};
  if (!G.PulseGlobal.pulseFunctions) G.PulseGlobal.pulseFunctions = {};
  if (!G.PulseGlobal.secrets) G.PulseGlobal.secrets = {};
  if (!G.PulseGlobal.runtime) G.PulseGlobal.runtime = {};
  if (!G.PulseGlobal.signal) G.PulseGlobal.signal = {};
  return G.PulseGlobal;
}

function buildPulseFunctionOrgan(fnId) {
  const PulseGlobal = ensurePulseGlobal();

  // Already built?
  if (PulseGlobal.pulseFunctions[fnId]) {
    return PulseGlobal.pulseFunctions[fnId];
  }

  let fn = null;

  // 1) Try PulseFunctionLibrary (soft)
  try {
    if (PulseFunctionLibrary && typeof PulseFunctionLibrary[fnId] === "function") {
      fn = PulseFunctionLibrary[fnId];
    }
  } catch {}

  // 2) Try PulseChunks (soft, if you ever wire it)
  try {
    if (!fn && PulseChunks && typeof PulseChunks.getPulseFunction === "function") {
      const candidate = PulseChunks.getPulseFunction(fnId);
      if (typeof candidate === "function") {
        fn = candidate;
      }
    }
  } catch {}

  // 3) Fallback: inert function (never throws)
  if (!fn) {
    fn = function inertPulseFunction() {
      return null;
    };
  }

  // Wrap in a tiny organ shell if you ever want to extend
  const organFn = function PulseFunctionWrapper(...args) {
    try {
      return fn(...args);
    } catch {
      return null;
    }
  };

  PulseGlobal.pulseFunctions[fnId] = organFn;
  return organFn;
}

// ============================================================================
//  RELATIONAL / FUZZY SIGNAL RESOLUTION HELPERS (v28++)
// ============================================================================
function stringSimilarity(a, b) {
  if (!a || !b) return 0;
  a = String(a);
  b = String(b);
  if (a === b) return 1;

  // Simple character overlap heuristic (fast, good enough for CNS/PNS style)
  const aSet = new Set(a.split(""));
  const bSet = new Set(b.split(""));
  let overlap = 0;
  for (const ch of aSet) {
    if (bSet.has(ch)) overlap++;
  }
  const maxLen = Math.max(aSet.size, bSet.size) || 1;
  return overlap / maxLen;
}

function resolveExportIdWithFuzzy(record, requestedId, options = {}) {
  const { minScore = 0.8 } = options;
  if (!record || !record.exports) return { id: null, score: 0, exact: false };

  const keys = Object.keys(record.exports);
  if (keys.length === 0) {
    return { id: null, score: 0, exact: false };
  }

  // 1) Exact match first
  if (record.exports[requestedId]) {
    return { id: requestedId, score: 1, exact: true };
  }

  // 2) Fuzzy match
  let bestId = null;
  let bestScore = 0;

  for (const key of keys) {
    const score = stringSimilarity(requestedId, key);
    if (score > bestScore) {
      bestScore = score;
      bestId = key;
    }
  }

  if (bestScore >= minScore && bestId) {
    try {
      if (!G.PULSE_PUBLIC_MODE) {
        console.warn(
          "[PulseSignalPort] Fuzzy signal match:",
          { requestedId, resolvedId: bestId, score: bestScore.toFixed(2) }
        );
      }
    } catch {}
    return { id: bestId, score: bestScore, exact: false };
  }

  return { id: null, score: bestScore, exact: false };
}

// ============================================================================
//  PULSE SIGNAL KEY BRIDGE (PulseIO + Binary projection)
// ============================================================================
//
//  This is the heart of what you asked for:
//    - One pulseSignalKey per page/context
//    - Read *by key* from PulseIO (backend-prepared, offline)
//    - Optionally project key into binary bits (advantage-only)
//    - No raw secret storage here; only meta/snapshot surfaces
// ============================================================================

function resolvePulseSignalKey(envelope, context = {}) {
  // Priority:
  //   1) context.pulseSignalKey
  //   2) envelope.pulseSignalKey
  //   3) G.PULSE_SIGNAL_KEY (global soft)
  const key =
    context.pulseSignalKey ||
    envelope.pulseSignalKey ||
    G.PULSE_SIGNAL_KEY ||
    null;

  let source = "none";
  if (context.pulseSignalKey) source = "context";
  else if (envelope.pulseSignalKey) source = "envelope";
  else if (G.PULSE_SIGNAL_KEY) source = "global";

  return { key, source };
}

function buildPulseSignalKeyBridge(envelope, context = {}) {
  const { key, source } = resolvePulseSignalKey(envelope, context);

  const PulseGlobal = ensurePulseGlobal();
  PulseGlobal.signal.key = key;
  PulseGlobal.signal.source = source;

  // PulseIO snapshot (meta-only, backend-prepared)
  let pulseIOSnapshot = null;
  let pulseIOMeta = null;

  try {
    if (key && PulseIO) {
      if (typeof PulseIO.getSnapshot === "function") {
        pulseIOSnapshot = PulseIO.getSnapshot(key) || null;
      }
      if (typeof PulseIO.getMeta === "function") {
        pulseIOMeta = PulseIO.getMeta(key) || null;
      }
    }
  } catch {
    pulseIOSnapshot = null;
    pulseIOMeta = null;
  }

  // Optional binary projection of the key (advantage-only)
  let binaryBits = null;
  let binaryMeta = null;

  try {
    if (key && PulseBinaryKeyCodec) {
      if (typeof PulseBinaryKeyCodec.toBits === "function") {
        const bits = PulseBinaryKeyCodec.toBits(key);
        if (Array.isArray(bits)) {
          binaryBits = bits.filter(b => b === 0 || b === 1);
        }
      }
      if (typeof PulseBinaryKeyCodec.meta === "function") {
        binaryMeta = PulseBinaryKeyCodec.meta(key) || null;
      }
    }
  } catch {
    binaryBits = null;
    binaryMeta = null;
  }

  PulseGlobal.signal.pulseIO = pulseIOSnapshot;
  PulseGlobal.signal.pulseIOMeta = pulseIOMeta;
  PulseGlobal.signal.binaryBits = binaryBits;
  PulseGlobal.signal.binaryMeta = binaryMeta;

  return {
    key,
    source,
    pulseIO: {
      snapshot: pulseIOSnapshot,
      meta: pulseIOMeta
    },
    binary: {
      bits: binaryBits,
      meta: binaryMeta
    }
  };
}

// ============================================================================
//  SECRETS HOST + KILL SWITCH + RUNTIME FREEZE (v29+)
// ============================================================================
//
//  NOTE:
//    - This organ does NOT store real secrets itself.
//    - It only exposes a host surface for an external SecretsLayer.
//    - All kill-switches are routed to external organs if present.
//    - Defaults are inert and safe.
//    - We now *optionally* pass pulseSignalKey into SecretsLayer.activate.
// ============================================================================

function createPulseSecretsHost(envelope, signalBridge) {
  const PulseGlobal = ensurePulseGlobal();

  const state = {
    active: false,
    authority: "unknown" // "unknown" | "approved" | "denied"
  };

  // Expose into PulseGlobal for other organs
  PulseGlobal.secrets.state = state;

  function activate(externalKey = null) {
    const keyToUse = externalKey || signalBridge?.key || null;

    // Delegate to external SecretsLayer if present
    try {
      if (PulseSecretsLayer && typeof PulseSecretsLayer.activate === "function") {
        const result = PulseSecretsLayer.activate({
          page: envelope.page,
          moduleId: envelope.id,
          pulseSignalKey: keyToUse
        });
        state.active = !!result?.active;
        state.authority = result?.authority || (state.active ? "approved" : "denied");
      } else {
        // No external layer wired: stay inert
        state.active = false;
        state.authority = "unknown";
      }
    } catch {
      state.active = false;
      state.authority = "denied";
    }
  }

  function strip() {
    // Soft kill: wipe secrets from memory via external layer
    try {
      if (PulseSecretsLayer && typeof PulseSecretsLayer.strip === "function") {
        PulseSecretsLayer.strip({
          page: envelope.page,
          moduleId: envelope.id,
          pulseSignalKey: signalBridge?.key || null
        });
      }
    } catch {}
    state.active = false;
  }

  function stripKeys() {
    // Hard kill: revoke authority via external layer
    try {
      if (PulseSecretsLayer && typeof PulseSecretsLayer.stripKeys === "function") {
        PulseSecretsLayer.stripKeys({
          page: envelope.page,
          moduleId: envelope.id,
          pulseSignalKey: signalBridge?.key || null
        });
      }
    } catch {}
    state.active = false;
    state.authority = "denied";
  }

  return {
    state,
    activate,
    strip,
    stripKeys
  };
}

function createRuntimeFreeze(envelope) {
  const PulseGlobal = ensurePulseGlobal();

  const runtimeState = {
    frozen: false
  };

  PulseGlobal.runtime.state = runtimeState;

  function freeze(reason = "manual") {
    runtimeState.frozen = true;

    // Delegate to Overmind / Continuance if present
    try {
      if (PulseOvermind && typeof PulseOvermind.freezeExecution === "function") {
        PulseOvermind.freezeExecution({ page: envelope.page, reason });
      }
    } catch {}

    try {
      if (G.PulseContinuance && typeof G.PulseContinuance.stopAll === "function") {
        G.PulseContinuance.stopAll(envelope.page);
      }
    } catch {}
  }

  return {
    state: runtimeState,
    freeze
  };
}

function createKillSwitch(secretsHost, runtimeFreeze) {
  return {
    softKill() {
      // Soft kill: strip secrets only
      secretsHost.strip();
    },
    stripKeys() {
      // Hard kill: revoke authority + strip secrets
      secretsHost.stripKeys();
    },
    freezeExecution(reason = "manual") {
      // Absolute kill: freeze runtime
      runtimeFreeze.freeze(reason);
    }
  };
}

// ============================================================================
//  PULSEIMPORT / PULSEEXPORT / SUBIMPORT
// ============================================================================
function createPulseExport(state, envelope) {
  const moduleId = envelope.id;

  return function PulseExport(exportId, value, meta = {}) {
    if (!exportId) return;

    const record = getModuleRecord(state, moduleId);
    if (!record) return;

    // Normalize value once (no guessing)
    const normalized = unwrapOnce(value);

    record.exports[exportId] = {
      value: normalized,
      meta: {
        tier: meta.tier || envelope.exportTiers?.[exportId] || "default",
        ts: Date.now(),
        ...meta
      }
    };
  };
}

function createPulseImport(state, envelope) {
  const moduleId = envelope.id;

  // NOTE:
  //   PulseImport(exportId)          → normal export (relational + fuzzy)
  //   PulseImport(exportId, true)   → PulseFunction (memory-only)
  return function PulseImport(exportId, pulseFlag = false) {
    if (!exportId) return null;

    // PulseFunction path (no objects, no pulse:true, just literal true)
    if (pulseFlag === true) {
      return buildPulseFunctionOrgan(exportId);
    }

    const record = getModuleRecord(state, moduleId);
    if (!record) return null;

    // v28++: relational + fuzzy resolution (80% threshold)
    const { id: resolvedId, exact, score } = resolveExportIdWithFuzzy(
      record,
      exportId,
      { minScore: 0.8 }
    );

    if (!resolvedId) {
      try {
        if (!G.PULSE_PUBLIC_MODE) {
          console.warn(
            "[PulseSignalPort] Signal not found:",
            { requestedId: exportId, moduleId, bestScore: score.toFixed(2) }
          );
        }
      } catch {}
      return null;
    }

    const entry = record.exports[resolvedId];
    if (!entry) return null;

    if (!exact) {
      try {
        if (!G.PULSE_PUBLIC_MODE) {
          console.warn(
            "[PulseSignalPort] Using fuzzy-resolved signal:",
            {
              requestedId: exportId,
              resolvedId,
              moduleId,
              score: score.toFixed(2)
            }
          );
        }
      } catch {}
    }

    return entry.value;
  };
}

function createPulseSubimport(state, envelope) {
  const moduleId = envelope.id;

  return function PulseSubimport(exportId, subpath) {
    if (!exportId || !subpath) return null;

    const record = getModuleRecord(state, moduleId);
    if (!record) return null;

    const entry = record.exports[exportId];
    if (!entry) return null;

    const value = entry.value;
    if (!value || typeof value !== "object") return null;

    // Deterministic, shallow subpath (no recursion)
    const parts = String(subpath).split(".").filter(Boolean);
    let current = value;
    for (const p of parts) {
      if (!current || typeof current !== "object") return null;
      current = current[p];
    }
    return current;
  };
}

// ============================================================================
//  REGISTRY SNAPSHOT
// ============================================================================
function registrySnapshot(state) {
  const out = {};
  for (const key of Object.keys(state.modules)) {
    const rec = state.modules[key];
    out[key] = {
      exports: Object.keys(rec.exports),
      imports: rec.imports,
      meta: rec.meta
    };
  }
  return out;
}

// ============================================================================
//  AUTO-GENERATED FINALITY FLOW ORGAN (MEMORY ONLY)
// ============================================================================
function buildPulseFinalityFlowOrgan(envelope, snapshot, PulseImport, PulseExport, PulseSubimport, signalBridge) {
  // DEV MODE: full real JS (commented)
  const devComments = `
    /*
    ============================================================================
      PULSE-FINALITY-FLOW.js (AUTO-GENERATED, MEMORY-ONLY)
      ROLE:
        - Initialize PulseImport / PulseExport / PulseSubimport
        - Initialize PulseGlobal registry
        - Initialize PulseGlobal.pulseFunctions
        - Start Continuance warm-path
        - Start OmniHosting
        - Start Schema normalization
        - Start Sonar warm-path
        - Start Finality boot sequence
        - Attach Approval / Secrets / KillSwitch / RuntimeFreeze (v29+)
        - Attach PulseSignalKey bridge (PulseIO + Binary projection)
    ============================================================================

    export function PulseFinalityFlow() {
      const registry = PulseGlobal.registry;
      const warmPath = Continuance.getWarmPath();
      const sonar = PulseSonar.scanCurrentPage();

      // Boot sequence
      Schema.normalize(envelope);
      OmniHosting.attach(envelope.page);
      Continuance.start(warmPath);
      PulseSonar.warm(sonar);
    }
    */
  `;

  const comments = G.PULSE_PUBLIC_MODE ? "" : devComments;

  // SKIP LOGIC: only one FinalityFlow per page per session
  if (G.PulseFinalityFlow && G.PulseFinalityFlow.__page === envelope.page) {
    return G.PulseFinalityFlow;
  }

  const organ = {
    __page: envelope.page,
    __ts: Date.now(),
    comments,

    envelope,
    snapshot,
    PulseImport,
    PulseExport,
    PulseSubimport,
    signalBridge,

    booted: false,

    boot() {
      if (this.booted) return;
      this.booted = true;

      try {
        const PulseGlobal = ensurePulseGlobal();

        // Warm PulseGlobal registry
        PulseGlobal.registry = this.snapshot;

        // Attach signal bridge into PulseGlobal
        PulseGlobal.signal.bridge = this.signalBridge || null;

        // PulseFunctions already live on PulseGlobal.pulseFunctions
        // (buildPulseFunctionOrgan populates them on demand)

        // Warm Continuance
        if (G.PulseContinuance && typeof G.PulseContinuance.start === "function") {
          G.PulseContinuance.start(this.envelope.page);
        }

        // Warm OmniHosting
        if (G.PulseOmniHosting && typeof G.PulseOmniHosting.attach === "function") {
          G.PulseOmniHosting.attach(this.envelope.page);
        }

        // Warm Schema
        if (G.PulseSchema && typeof G.PulseSchema.normalize === "function") {
          G.PulseSchema.normalize(this.envelope);
        }

        // Warm Sonar
        if (G.PulseSonar && typeof G.PulseSonar.warm === "function") {
          G.PulseSonar.warm(this.envelope.page);
        }

        // Approval organ (soft)
        try {
          if (PulseApproval && typeof PulseApproval.attach === "function") {
            PulseApproval.attach({
              page: this.envelope.page,
              pulseSignalKey: this.signalBridge?.key || null
            });
          }
        } catch {}

      } catch (err) {
        try {
          console.warn("PulseFinalityFlow boot error:", err);
        } catch {}
      }
    }
  };

  G.PulseFinalityFlow = organ;
  return organ;
}

// ============================================================================
//  FACTORY — PULSE SIGNAL PORT ORGAN
// ============================================================================
export function PulseSignalPort() {
  const state = createRegistry();

  function attach(moduleEnvelope = null, context = {}) {
    // 1) Resolve envelope
    const envelope = moduleEnvelope || resolveModuleEnvelope(context);

    // 2) Register module
    registerModule(state, envelope);

    // 3) Build PulseSignalKey bridge (PulseIO + Binary)
    const signalBridge = buildPulseSignalKeyBridge(envelope, context);

    // 4) Create functions bound to this module
    const PulseExport = createPulseExport(state, envelope);
    const PulseImport = createPulseImport(state, envelope);
    const PulseSubimport = createPulseSubimport(state, envelope);

    // 5) Optional presence trace (non-critical)
    try {
      if (PulsePresenceNormalizerStore && typeof PulsePresenceNormalizerStore.tail === "function") {
        PulsePresenceNormalizerStore.tail(10);
      }
    } catch {}

    // 6) Build Finality Flow organ (memory-only, reflex)
    const snapshot = registrySnapshot(state);
    const PulseFinalityFlow = buildPulseFinalityFlowOrgan(
      envelope,
      snapshot,
      PulseImport,
      PulseExport,
      PulseSubimport,
      signalBridge
    );

    // 7) Secrets host + runtime freeze + kill-switch (v29+)
    const secretsHost = createPulseSecretsHost(envelope, signalBridge);
    const runtimeFreeze = createRuntimeFreeze(envelope);
    const killSwitch = createKillSwitch(secretsHost, runtimeFreeze);

    // 8) Auto-boot (skin reflex)
    try {
      PulseFinalityFlow.boot();
    } catch {}

    return {
      PulseImport,
      PulseExport,
      PulseSubimport,
      registrySnapshot: () => registrySnapshot(state),
      moduleEnvelope: envelope,
      secrets: {
        get active() {
          return secretsHost.state.active;
        },
        get authority() {
          return secretsHost.state.authority;
        },
        activate: (externalKey) => secretsHost.activate(externalKey),
        softKill: () => killSwitch.softKill(),
        stripKeys: () => killSwitch.stripKeys()
      },
      runtime: {
        get frozen() {
          return runtimeFreeze.state.frozen;
        },
        freeze: (reason) => killSwitch.freezeExecution(reason)
      },
      signal: {
        key: signalBridge.key,
        source: signalBridge.source,
        pulseIO: signalBridge.pulseIO,
        binary: signalBridge.binary
      }
    };
  }

  return {
    meta: ORGAN_META_PulseSignalPort,
    contract: ORGAN_CONTRACT_PulseSignalPort,
    overlays: IMMORTAL_OVERLAYS_PulseSignalPort,
    attach
  };
}

// ============================================================================
//  GLOBAL EXPOSURE — OPTIONAL (BROWSER ONLY)
// ============================================================================
try {
  if (typeof window !== "undefined") {
    window.PulseSignalPort = PulseSignalPort;
  }
  if (typeof globalThis !== "undefined") {
    globalThis.PulseSignalPort = PulseSignalPort;
  }
} catch {
  // never throw
}
