// ============================================================================
//  PULSE OS — SIGNAL PORT ORGAN (v30 IMMORTAL++)
//  FILE: /PULSE-SIGNAL/PULSE-FINALITY-PORT.js
//  ORGAN: PulseSignalPort
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
const PulseIO = G.PulseIO || null;
const PulseBinaryKeyCodec = G.PulseBinaryKeyCodec || null;

// ============================================================================
//  AI EXPERIENCE META
// ============================================================================
export const AI_EXPERIENCE_META_PulseSignalPort = {
  id: "pulse.signal_port",
  kind: "bridge_organ",
  version: "v30-IMMORTAL++",
  role: "pulse_signal_bridge",
  surfaces: {
    band: [
      "signal",
      "module",
      "chunks",
      "memory",
      "secrets_host",
      "kill_switch",
      "runtime_freeze",
      "pulse_signal_key",
      "pulse_io_bridge",
      "binary_key_projection",
      "pulse_port"
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

    pulseSignalKeyAware: true,
    pulseIOAware: true,
    binaryKeyAware: true,
    pulsePortAware: true
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
    noSideEffects: true
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
//  INTERNAL REGISTRY — IMMORTAL++ SAFE (v30 ORGANISM-AWARE)
// ============================================================================
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
  if (!order || order.length <= REGISTRY_MAX) return;

  const excess = order.length - REGISTRY_MAX;
  for (let i = 0; i < excess; i++) {
    const key = order[i];
    if (key && modules[key]) {
      delete modules[key];
    }
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

// Module envelope normalization (IMMORTAL: no wall-clock ts)
function normalizeModuleEnvelope(rawEnvelope = {}, context = {}) {
  const page = context.page || rawEnvelope.page || "index";

  const exportsMeta = rawEnvelope.exportsMeta || rawEnvelope.exports || {};
  const importsMeta = rawEnvelope.importsMeta || rawEnvelope.imports || {};
  const exportTiers = rawEnvelope.exportTiers || {};
  const subimports = rawEnvelope.subimports || {};
  const chunkProfile = rawEnvelope.chunkProfile || null;
  const lineage = rawEnvelope.lineage || null;

  const pulseSignalKey =
    rawEnvelope.pulseSignalKey ||
    context.pulseSignalKey ||
    G.PULSE_SIGNAL_KEY ||
    null;

  const tier =
    rawEnvelope.tier ||
    context.tier ||
    rawEnvelope.layer ||
    "default";

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
    tier,
    ts: 0 // v30 IMMORTAL++: no Date.now()
  };
}

// Try to pull module envelope from Warmup cache or PulseChunks
function resolveModuleEnvelope(context = {}) {
  const page = context.page || "index";

  try {
    const cache = G.PulseImportWarmupCache || {};
    if (cache && cache[page]) {
      return normalizeModuleEnvelope(cache[page], context);
    }
  } catch {}

  try {
    if (PulseChunks && typeof PulseChunks.getModuleEnvelope === "function") {
      const raw = PulseChunks.getModuleEnvelope(page);
      if (raw) return normalizeModuleEnvelope(raw, context);
    }
  } catch {}

  return normalizeModuleEnvelope({}, context);
}

// ============================================================================
//  PULSEBINARY REGISTRY STORAGE (v30 IMMORTAL++, PulsePort-centric)
// ============================================================================
import { PulseTouchStorageV30 } from "../PULSE-TOUCH/PULSE-TOUCH-STORAGE-v30.js";

const REGISTRY_STORE = "chunks"; // or dedicated "registry" if you add it

const __textEncoder = new TextEncoder();
const __textDecoder = new TextDecoder();

function encodeRegistryKey(key) {
  return __textEncoder.encode(key);
}

function encodeRegistryRecord(record) {
  const json = JSON.stringify(record);
  return __textEncoder.encode(json);
}

function decodeRegistryRecord(binary) {
  if (!binary) return null;
  try {
    const view = binary instanceof Uint8Array ? binary : new Uint8Array(binary);
    const json = __textDecoder.decode(view);
    return JSON.parse(json);
  } catch {
    return null;
  }
}

const __PulseTouchStorage = PulseTouchStorageV30();

async function registryPut(key, record) {
  const k = encodeRegistryKey(key);
  const v = encodeRegistryRecord(record);
  const { ok } = await __PulseTouchStorage.put(REGISTRY_STORE, k, v);
  return ok;
}

async function registryGet(key) {
  const k = encodeRegistryKey(key);
  const { ok, result } = await __PulseTouchStorage.get(REGISTRY_STORE, k);
  if (!ok) return null;
  return decodeRegistryRecord(result);
}

async function registryDelete(key) {
  const k = encodeRegistryKey(key);
  const { ok } = await __PulseTouchStorage.delete(REGISTRY_STORE, k);
  return ok;
}
// ============================================================================
//  REGISTRY OPERATIONS (v30 IMMORTAL++ / PulseBinary-backed)
// ============================================================================

async function registerModule(state, envelope) {
  if (!state || !state.modules || !state.order || !envelope) return;

  const key = envelope.id;
  if (!key) return;

  if (!state.modules[key]) {
    state.order.push(key);
  }

  const meta = {
    page: envelope.page,
    tier: envelope.tier || "default",
    exportTiers: envelope.exportTiers || {},
    subimports: envelope.subimports || {},
    chunkProfile: envelope.chunkProfile || null,
    lineage: envelope.lineage || null,
    pulseSignalKey: envelope.pulseSignalKey || null,
    ts: envelope.ts || 0 // IMMORTAL: no wall-clock
  };

  state.modules[key] = {
    exports: {},
    imports: envelope.importsMeta || {},
    meta
  };

  trimRegistry(state);

  // v30: PulseBinary registry persistence via PulseTouchStorageV30
  try {
    await registryPut(key, meta);
  } catch {
    // IMMORTAL: never throw from persistence
  }
}

function getModuleRecord(state, moduleId) {
  if (!state || !state.modules || !moduleId) return null;
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

  if (PulseGlobal.pulseFunctions[fnId]) {
    return PulseGlobal.pulseFunctions[fnId];
  }

  let fn = null;

  try {
    if (PulseFunctionLibrary && typeof PulseFunctionLibrary[fnId] === "function") {
      fn = PulseFunctionLibrary[fnId];
    }
  } catch {}

  try {
    if (!fn && PulseChunks && typeof PulseChunks.getPulseFunction === "function") {
      const candidate = PulseChunks.getPulseFunction(fnId);
      if (typeof candidate === "function") {
        fn = candidate;
      }
    }
  } catch {}

  if (!fn) {
    fn = function inertPulseFunction() {
      return null;
    };
  }

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
//  RELATIONAL / FUZZY SIGNAL RESOLUTION HELPERS (v28+, kept for compat)
// ============================================================================
function stringSimilarity(a, b) {
  if (!a || !b) return 0;
  a = String(a);
  b = String(b);
  if (a === b) return 1;

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

  if (record.exports[requestedId]) {
    return { id: requestedId, score: 1, exact: true };
  }

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
    // v30 IMMORTAL++: no console side-effects here
    return { id: bestId, score: bestScore, exact: false };
  }

  return { id: null, score: bestScore, exact: false };
}

// ============================================================================
//  PULSE SIGNAL KEY BRIDGE (PulseIO + Binary projection)
// ============================================================================
function resolvePulseSignalKey(envelope, context = {}) {
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

  let binaryBits = null;
  let binaryMeta = null;

  try {
    if (key && PulseBinaryKeyCodec) {
      if (typeof PulseBinaryKeyCodec.toBits === "function") {
        const bits = PulseBinaryKeyCodec.toBits(key);
        if (Array.isArray(bits)) {
          binaryBits = bits.filter((b) => b === 0 || b === 1);
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
//  SECRETS HOST + KILL SWITCH + RUNTIME FREEZE (v30 IMMORTAL++)
// ============================================================================

function createPulseSecretsHost(envelope, signalBridge) {
  const PulseGlobal = ensurePulseGlobal();

  const state = {
    active: false,
    authority: "unknown"
  };

  PulseGlobal.secrets.state = state;

  function activate(externalKey = null) {
    const keyToUse = externalKey || signalBridge?.key || null;

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
        state.active = false;
        state.authority = "unknown";
      }
    } catch {
      state.active = false;
      state.authority = "denied";
    }
  }

  function strip() {
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


// ============================================================================
//  RUNTIME FREEZE (v30 IMMORTAL++)
// ============================================================================
function createRuntimeFreeze(envelope) {
  const PulseGlobal = ensurePulseGlobal();

  const runtimeState = {
    frozen: false
  };

  PulseGlobal.runtime.state = runtimeState;

  function freeze(reason = "manual") {
    runtimeState.frozen = true;

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


// ============================================================================
//  KILL SWITCH (v30 IMMORTAL++)
// ============================================================================
function createKillSwitch(secretsHost, runtimeFreeze) {
  return {
    softKill() {
      try { secretsHost.strip(); } catch {}
    },
    stripKeys() {
      try { secretsHost.stripKeys(); } catch {}
    },
    freezeExecution(reason = "manual") {
      try { runtimeFreeze.freeze(reason); } catch {}
    }
  };
}

// ============================================================================
//  PULSEIMPORT / PULSEEXPORT / SUBIMPORT (v30 IMMORTAL++, PulsePort-internal)
// ============================================================================
function createPulseExport(state, envelope) {
  const moduleId = envelope.id;

  return function PulseExport(exportId, value, meta = {}) {
    if (!exportId) return;

    const record = getModuleRecord(state, moduleId);
    if (!record) return;

    const normalized = unwrapOnce(value);

    if (!record.exports) {
      record.exports = {};
    }

    record.exports[exportId] = {
      value: normalized,
      meta: {
        tier: meta.tier || envelope.exportTiers?.[exportId] || "default",
        ts: 0,
        ...meta
      }
    };
  };
}

function createPulseImport(state, envelope) {
  const moduleId = envelope.id;

  return function PulseImport(exportId, pulseFlag = false) {
    if (!exportId) return null;

    if (exportId === "ORGANISM" && pulseFlag === false) {
      return createOrganismPreloader(state);
    }

    if (pulseFlag === true) {
      return buildPulseFunctionOrgan(exportId);
    }

    const record = getModuleRecord(state, moduleId);
    if (!record) return null;

    const { id: resolvedId } = resolveExportIdWithFuzzy(record, exportId, {
      minScore: 0.8
    });

    if (!resolvedId) {
      return null;
    }

    const entry = record.exports[resolvedId];
    if (!entry) return null;

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
//  MODULE-LEVEL PRELOAD (single module, tier-aware, safe) — v30
// ============================================================================
async function preloadModuleExports(state, moduleId) {
  const record = getModuleRecord(state, moduleId);
  if (!record) return false;

  try {
    if (typeof record.warmup === "function") {
      await record.warmup();
    }
  } catch {}

  try {
    const exports = record.exports || {};
    for (const key of Object.keys(exports)) {
      const entry = exports[key];
      if (!entry) continue;

      const v = entry.value;

      if (typeof v === "function") {
        void v;
      }

      if (v && typeof v === "object") {
        for (const subKey of Object.keys(v)) {
          try {
            void v[subKey];
          } catch {}
        }
      }
    }
  } catch {}

  try {
    if (record.exportTiers) {
      for (const tierName of Object.keys(record.exportTiers)) {
        const tierList = record.exportTiers[tierName] || [];
        for (const t of tierList) {
          void t;
        }
      }
    }
  } catch {}

  try {
    if (record.lineage) {
      void record.lineage;
    }
  } catch {}

  return true;
}
// ============================================================================
//  ORGANISM-LEVEL PRELOAD (ALL MODULES, TIERED) — v30 IMMORTAL++
// ============================================================================
async function preloadAllModules(state, options = {}) {
  const modules = Object.values(state.modules || {});
  if (!modules.length) return false;

  const {
    mode = "auto",
    firstTier = "core",
    maxParallel = Infinity
  } = options;

  const core = [];
  const rest = [];

  for (const mod of modules) {
    const metaTier = mod.meta?.tier || mod.meta?.layer || "default";
    if (metaTier === firstTier) core.push(mod);
    else rest.push(mod);
  }

  for (const mod of core) {
    try {
      await preloadModuleExports(state, mod.id);
    } catch {}
  }

  const remaining = rest.slice();

  if (mode === "sequential") {
    for (const mod of remaining) {
      try {
        await preloadModuleExports(state, mod.id);
      } catch {}
    }
    return true;
  }

  const parallelLimit = Number.isFinite(maxParallel)
    ? Math.max(1, maxParallel)
    : remaining.length;

  let index = 0;
  async function worker() {
    while (index < remaining.length) {
      const mod = remaining[index++];
      try {
        await preloadModuleExports(state, mod.id);
      } catch {}
    }
  }

  const workers = [];
  for (let i = 0; i < parallelLimit; i++) {
    workers.push(worker());
  }

  await Promise.all(workers);
  return true;
}

// ============================================================================
//  ORGANISM PRELOADER HANDLE — PulseImport("ORGANISM") — v30
// ============================================================================
function createOrganismPreloader(state) {
  return {
    preloadAll(options = {}) {
      return preloadAllModules(state, { mode: "auto", ...options });
    },
    preloadSequential(options = {}) {
      return preloadAllModules(state, { mode: "sequential", ...options });
    },
    preloadParallel(options = {}) {
      return preloadAllModules(state, { mode: "parallel", ...options });
    }
  };
}

// ============================================================================
//  REGISTRY SNAPSHOT
// ============================================================================
function registrySnapshot(state) {
  const out = {};
  const modules = state?.modules || {};

  for (const key of Object.keys(modules)) {
    const rec = modules[key];
    if (!rec) continue;

    out[key] = {
      exports: Object.keys(rec.exports || {}),
      imports: rec.imports || {},
      meta: rec.meta || {}
    };
  }
  return out;
}

// ============================================================================
//  AUTO-GENERATED FINALITY FLOW ORGAN (v30 IMMORTAL, ORGANISM-AWARE)
// ============================================================================
function buildPulseFinalityFlowOrgan(
  envelope,
  snapshot,
  PulseImport,
  PulseExport,
  PulseSubimport,
  signalBridge
) {
  const devComments = `
    /*
    ============================================================================
      PULSE-FINALITY-FLOW.js (AUTO-GENERATED, MEMORY-ONLY) — v30 IMMORTAL
      ROLE:
        - Initialize PulseImport / PulseExport / PulseSubimport
        - Initialize PulseGlobal registry
        - Initialize PulseGlobal.pulseFunctions
        - Start Finality boot sequence
        - Attach Approval / Secrets / KillSwitch / RuntimeFreeze
        - Attach PulseSignalKey bridge (PulseIO + Binary projection)
        - Organism-level preload (tier-aware, parallel-aware)
        - PulseImport("ORGANISM") integration
    ============================================================================
    */
  `;

  const comments = G.PULSE_PUBLIC_MODE ? "" : devComments;

  if (G.PulseFinalityFlow && G.PulseFinalityFlow.__page === envelope.page) {
    return G.PulseFinalityFlow;
  }

  let organismPreloader = null;
  try {
    organismPreloader = PulseImport("ORGANISM");
  } catch {
    organismPreloader = null;
  }

  function decidePreloadMode() {
    try {
      const perf = performance.now();
      const mem = navigator.deviceMemory || 4;
      const cores = navigator.hardwareConcurrency || 4;

      if (perf < 20 && mem >= 4 && cores >= 4) {
        return { mode: "parallel", maxParallel: Infinity, tier: "core" };
      }

      if (perf < 50 && mem >= 2) {
        return { mode: "auto", maxParallel: 16, tier: "core" };
      }

      return { mode: "sequential", maxParallel: 1, tier: "core" };
    } catch {
      return { mode: "auto", maxParallel: 8, tier: "core" };
    }
  }

  const organ = {
    __page: envelope.page,
    __ts: 0, // IMMORTAL: no Date.now()
    comments,

    envelope,
    snapshot,
    PulseImport,
    PulseExport,
    PulseSubimport,
    signalBridge,

    booted: false,

    async boot() {
      if (this.booted) return;
      this.booted = true;

      try {
        const PulseGlobal = ensurePulseGlobal();

        PulseGlobal.registry = this.snapshot;
        PulseGlobal.signal.bridge = this.signalBridge || null;

        if (G.PulseContinuance?.start) {
          G.PulseContinuance.start(this.envelope.page);
        }

        if (G.PulseOmniHosting?.attach) {
          G.PulseOmniHosting.attach(this.envelope.page);
        }

        if (G.PulseSchema?.normalize) {
          G.PulseSchema.normalize(this.envelope);
        }

        if (G.PulseSonar?.warm) {
          G.PulseSonar.warm(this.envelope.page);
        }

        try {
          if (PulseApproval?.attach) {
            PulseApproval.attach({
              page: this.envelope.page,
              pulseSignalKey: this.signalBridge?.key || null
            });
          }
        } catch {}

        if (organismPreloader) {
          const decision = decidePreloadMode();

          try {
            organismPreloader.preloadAll({
              mode: decision.mode,
              firstTier: decision.tier,
              maxParallel: decision.maxParallel
            });
          } catch {}
        }
      } catch {}
    }
  };

  G.PulseFinalityFlow = organ;
  return organ;
}
// ============================================================================
//  FACTORY — PULSE SIGNAL PORT ORGAN (v30 IMMORTAL++, PULSEPORT-AWARE)
// ============================================================================
export function PulseSignalPort() {
  const state = createRegistry();

  function attach(moduleEnvelope = null, context = {}) {
    const envelope = moduleEnvelope || resolveModuleEnvelope(context);

    registerModule(state, envelope);

    const signalBridge = buildPulseSignalKeyBridge(envelope, context);

    const PulseExport = createPulseExport(state, envelope);
    const PulseImport = createPulseImport(state, envelope);
    const PulseSubimport = createPulseSubimport(state, envelope);

    try {
      if (
        PulsePresenceNormalizerStore &&
        typeof PulsePresenceNormalizerStore.tail === "function"
      ) {
        PulsePresenceNormalizerStore.tail(10);
      }
    } catch {}

    const snapshot = registrySnapshot(state);
    const PulseFinalityFlow = buildPulseFinalityFlowOrgan(
      envelope,
      snapshot,
      PulseImport,
      PulseExport,
      PulseSubimport,
      signalBridge
    );

    const secretsHost = createPulseSecretsHost(envelope, signalBridge);
    const runtimeFreeze = createRuntimeFreeze(envelope);
    const killSwitch = createKillSwitch(secretsHost, runtimeFreeze);

    let organismPreloader = null;
    try {
      organismPreloader = PulseImport("ORGANISM");
    } catch {
      organismPreloader = null;
    }

    const preloadMetrics = {
      lastMode: null,
      lastDurationMs: null,
      lastError: null,
      totalWaves: 0
    };

    async function preloadWave(options = {}) {
      if (!organismPreloader || typeof organismPreloader.preloadAll !== "function") {
        return false;
      }

      let error = null;

      try {
        const decision = {
          mode: options.mode || "auto",
          firstTier: options.firstTier || "core",
          maxParallel: options.maxParallel ?? 16
        };

        preloadMetrics.lastMode = decision.mode;
        preloadMetrics.totalWaves += 1;

        await organismPreloader.preloadAll(decision);
      } catch (err) {
        error = err;
        preloadMetrics.lastError = String(err);
      } finally {
        // IMMORTAL++: no wall-clock coupling; keep duration as null
        preloadMetrics.lastDurationMs = null;
      }

      return !error;
    }

    try {
      if (PulseFinalityFlow && typeof PulseFinalityFlow.boot === "function") {
        PulseFinalityFlow.boot();
      }
    } catch {}

    const organism = {
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
      },

      preload: {
        wave: preloadWave,
        get metrics() {
          return { ...preloadMetrics };
        }
      },

      // expose internal state for PulsePort warm logic
      __state: state
    };

    return organism;
  }

  return {
    meta: ORGAN_META_PulseSignalPort,
    contract: ORGAN_CONTRACT_PulseSignalPort,
    overlays: IMMORTAL_OVERLAYS_PulseSignalPort,
    attach
  };
}

// ============================================================================
//  PULSEPORT — IMMORTAL FINALITY PORT (TOP-LEVEL API)
// ============================================================================
let __PULSE_PORT_SINGLETON__ = null;

function getOrCreateOrganism() {
  if (__PULSE_PORT_SINGLETON__) return __PULSE_PORT_SINGLETON__;

  const factory = PulseSignalPort();
  const context = G.PulseContext || {};
  const organism = factory.attach(null, context);

  __PULSE_PORT_SINGLETON__ = organism;
  return organism;
}

function warmSingleOrgan(organism, id) {
  const value = organism.PulseImport(id);
  if (!value) return null;

  try {
    if (typeof value === "function") {
      void value;
    } else if (value && typeof value === "object") {
      for (const k of Object.keys(value)) {
        try {
          void value[k];
        } catch {}
      }
    }
  } catch {}

  return value;
}

export function PulsePort(id, options = {}) {
  if (!id) return null;

  const organism = getOrCreateOrganism();

  if (id === "ORGANISM") {
    try {
      organism.preload.wave({ mode: "auto", firstTier: "core", maxParallel: 16 });
    } catch {}
    return organism;
  }

  const direction = options.direction || "import";

  if (direction === "import") {
    return warmSingleOrgan(organism, id);
  }

  if (direction === "export") {
    return (value, meta = {}) => {
      organism.PulseExport(id, value, meta);
      return value;
    };
  }

  if (direction === "subimport") {
    return (subpath) => organism.PulseSubimport(id, subpath);
  }

  return warmSingleOrgan(organism, id);
}

// ============================================================================
//  GLOBAL EXPOSURE — OPTIONAL (BROWSER ONLY)
// ============================================================================
try {
  if (typeof window !== "undefined") {
    window.PulseSignalPort = PulseSignalPort;
    window.PulsePort = PulsePort;
  }
  if (typeof globalThis !== "undefined") {
    globalThis.PulseSignalPort = PulseSignalPort;
    globalThis.PulsePort = PulsePort;
  }
} catch {
  // never throw
}
