/*
===============================================================================
FILE: /PULSE-WORLD-OS/PULSE-MULTIVERSE/PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PulseWorldCompilerWorker-v30.js
ORGAN: PulseWorldCompilerWorker
LAYER: WORLD BACKEND — SEMANTIC COMPILE WORKER — v30-IMMORTAL-BINARY
===============================================================================
*/
export const AI_EXPERIENCE_META = {
  identity: "PulseWorld.CompilerWorker",
  version: "v30-Immortal-Binary",
  layer: "pulse_world_backend",
  role: "semantic_compile_worker",
  lineage: "CompilerWorker-v1 → v18 → v20-Immortal → v30-Immortal-Binary",

  evo: {
    backendOrgan: true,
    compileWorker: true,
    laneAware: true,
    cacheAware: true,
    chunkerAware: true,
    actNowAware: true,
    powerAware: true,
    presenceAware: true,

    deterministicPerJob: true,
    driftProofProfiles: true,
    multiLaneCache: true,

    zeroDOM: true,
    zeroUI: true,
    zeroRuntimeMutation: true,

    // v30
    worldBinaryAware: true,
    meshAware: true,
    satelliteAware: true,
    routerAware: true,
    gpuLymphAware: true
  },

  contract: {
    always: [
      "PulseWorldCompile",
      "ChunkerFactory",
      "ACTNowFactory",
      "PulsePowerAPI",
      "Brain",
      "Logger",
      "WorldBinaryCore",
      "Router"
    ],
    never: [
      "window",
      "document",
      "DOM",
      "eval",
      "dynamicImport"
    ]
  }
};

export const EXPORT_META = {
  organ: "PulseWorld.CompilerWorker",
  layer: "pulse_world_backend",
  stability: "IMMORTAL",
  deterministic: "per-job",

  consumes: [
    "CompileJob",
    "BackendProfile",
    "PulseWorldCompile",
    "Chunker",
    "ACTNow",
    "PulsePowerSnapshot",
    "WorldBinaryContext",
    "RouterSnapshot"
  ],

  produces: [
    "CompileResponse",
    "ChunkMeta",
    "ActNowReflex",
    "PowerHints",
    "PresenceEnvelope",
    "BinaryCompileSurface"
  ],

  sideEffects: "log_only",
  network: "none",
  filesystem: "compile_only"
};

const WORKER_SCHEMA_VERSION = "v3";
const DEFAULT_LANE_COUNT = 16;
const CACHE_TTL_MS = 90_000;

// ---------------------------------------------------------------------------
// META BLOCK
// ---------------------------------------------------------------------------
export const PulseWorldCompilerWorkerMeta = {
  identity: "PulseWorldCompilerWorker",
  version: "v30-Immortal-Binary",
  schemaVersion: WORKER_SCHEMA_VERSION,
  lanes: DEFAULT_LANE_COUNT
};

// ---------------------------------------------------------------------------
// INTERNAL: PROFILE ENGINE — IMMORTAL BACKEND PROFILES
// ---------------------------------------------------------------------------
function createProfileEngine({ Logger } = {}) {
  const log = Logger?.log || console.log;

  const profiles = Object.create(null);
  const stats = Object.create(null);

  function defineProfile(profileId, base) {
    profiles[profileId] = {
      profileId,
      backendKind: base.backendKind || "compile",
      worldBand: base.worldBand || "backend",
      presenceTag: base.presenceTag || "compile-worker",
      band: base.band || "dual",
      chunkProfile: base.chunkProfile || "compile-default",
      defaultChunkSize: base.defaultChunkSize || 32 * 1024,
      binaryMode: base.binaryMode || "symbolic",      // v30
      meshMode: base.meshMode || "mesh-first"         // v30
    };
    stats[profileId] = {
      profileId,
      totalBytes: 0,
      jobs: 0,
      lastTs: 0
    };
  }

  function prewarmProfile(profileId, base) {
    if (!profiles[profileId]) {
      defineProfile(profileId, base);
      log("[CompilerWorker v30] Profile prewarmed", { profileId });
    }
  }

  function resolveProfile(rawContext = {}) {
    const profileId =
      rawContext.profileId ||
      rawContext.backendKind ||
      "compile-default";

    if (!profiles[profileId]) {
      defineProfile(profileId, {
        backendKind: rawContext.backendKind || "compile",
        worldBand: rawContext.worldBand || "backend",
        presenceTag: rawContext.presenceTag || "compile-worker",
        band: rawContext.band || "dual",
        chunkProfile: rawContext.chunkProfile || "compile-default",
        defaultChunkSize: rawContext.defaultChunkSize || 32 * 1024,
        binaryMode: rawContext.binaryMode || "symbolic",
        meshMode: rawContext.meshMode || "mesh-first"
      });
    }

    return profiles[profileId];
  }

  function bumpProfileStats(profileId, bytes) {
    const s = stats[profileId];
    if (!s) return;
    s.totalBytes += bytes || 0;
    s.jobs += 1;
    s.lastTs = Date.now();
  }

  function getProfiles() {
    return Object.values(profiles).map((p) => ({ ...p }));
  }

  function getProfileStats() {
    return Object.values(stats).map((s) => ({ ...s }));
  }

  return {
    prewarmProfile,
    resolveProfile,
    bumpProfileStats,
    getProfiles,
    getProfileStats
  };
}

// ---------------------------------------------------------------------------
// INTERNAL: PRESENCE ENVELOPE — BACKEND WAVE STATE
// ---------------------------------------------------------------------------
function buildPresenceEnvelope({
  laneId,
  envelopeId,
  band,
  presenceTag,
  worldBand,
  wave,
  bandKind,
  ok,
  binaryMode,
  meshMode
} = {}) {
  return {
    schemaVersion: WORKER_SCHEMA_VERSION,
    laneId,
    envelopeId,
    band,
    presenceTag,
    worldBand,
    wave,
    bandKind,
    ok: !!ok,
    binaryMode: binaryMode || "symbolic",
    meshMode: meshMode || "mesh-first",
    ts: Date.now()
  };
}

// ---------------------------------------------------------------------------
// INTERNAL: JOB NORMALIZATION
// ---------------------------------------------------------------------------
function normalizeCompileJob(rawJob = {}) {
  return {
    laneId: rawJob.laneId ?? 0,
    envelopeId: rawJob.envelopeId || null,
    userId: rawJob.userId || null,
    route: rawJob.route || "unknown",
    pageId: rawJob.pageId || null,
    intent: rawJob.intent || "compile",
    payload: rawJob.payload || {},
    options: rawJob.options || {}
  };
}

// ---------------------------------------------------------------------------
// INTERNAL: MULTI-LANE CACHE — IMMORTAL, TTL-BOUND
// ---------------------------------------------------------------------------
function createCompileCache({
  Logger,
  laneCount = DEFAULT_LANE_COUNT,
  ttlMs = CACHE_TTL_MS
} = {}) {
  const log = Logger?.log || console.log;

  const laneStores = [];
  const laneStats = [];

  for (let i = 0; i < laneCount; i++) {
    laneStores.push(new Map());
    laneStats.push({
      laneId: i,
      entries: 0,
      lastTs: 0
    });
  }

  function buildCacheKey(job, profile) {
    const base = JSON.stringify({
      route: job.route,
      pageId: job.pageId,
      intent: job.intent,
      payload: job.payload,
      profileId: profile.profileId,
      binaryMode: profile.binaryMode,
      meshMode: profile.meshMode
    });
    let h = 0;
    for (let i = 0; i < base.length; i++) {
      h = (h * 31 + base.charCodeAt(i)) >>> 0;
    }
    return `CW30-${h.toString(16).padStart(8, "0")}`;
  }

  function pickLaneIndex(cacheKey) {
    let h = 0;
    for (let i = 0; i < cacheKey.length; i++) {
      h = (h * 31 + cacheKey.charCodeAt(i)) >>> 0;
    }
    return h % laneStores.length;
  }

  function get(cacheKey) {
    const laneIndex = pickLaneIndex(cacheKey);
    const laneStore = laneStores[laneIndex];
    const stat = laneStats[laneIndex];

    const now = Date.now();
    const entry = laneStore.get(cacheKey);
    if (!entry) return null;

    if (entry.expiresAt <= now) {
      laneStore.delete(cacheKey);
      stat.entries = laneStore.size;
      return null;
    }

    stat.lastTs = now;
    return { laneIndex, entry };
  }

  function put(cacheKey, response) {
    const laneIndex = pickLaneIndex(cacheKey);
    const laneStore = laneStores[laneIndex];
    const stat = laneStats[laneIndex];

    const now = Date.now();
    const expiresAt = now + ttlMs;

    laneStore.set(cacheKey, {
      createdAt: now,
      expiresAt,
      response
    });

    stat.entries = laneStore.size;
    stat.lastTs = now;

    log("[CompilerWorker v30] Cache stored", {
      cacheKey,
      laneIndex,
      expiresAt
    });
  }

  function getLaneStats() {
    return laneStats.map((s) => ({ ...s }));
  }

  function getLaneCacheSnapshot() {
    return laneStores.map((store, idx) => ({
      laneId: idx,
      size: store.size
    }));
  }

  return {
    buildCacheKey,
    get,
    put,
    getLaneStats,
    getLaneCacheSnapshot
  };
}

// ---------------------------------------------------------------------------
// BINARY COMPILE SURFACE — v30
// ---------------------------------------------------------------------------
function buildBinaryCompileSurface({
  job,
  profile,
  compileBytes,
  laneId
}) {
  return {
    kind: "compile_job",
    laneId,
    route: job.route,
    intent: job.intent,
    pageId: job.pageId,
    profileId: profile.profileId,
    backendKind: profile.backendKind,
    worldBand: profile.worldBand,
    binaryMode: profile.binaryMode,
    meshMode: profile.meshMode,
    bytes: compileBytes,
    throughputClass:
      compileBytes > 256 * 1024 ? "heavy" :
      compileBytes > 64 * 1024 ? "medium" :
      "light",
    advantageTier:
      profile.binaryMode === "binary" ? 2 :
      profile.binaryMode === "hybrid" ? 1 :
      0
  };
}

// ---------------------------------------------------------------------------
// WORKER FACTORY — v30 IMMORTAL BACKEND ORGAN
// ---------------------------------------------------------------------------
export function createPulseWorldCompilerWorker({
  PulseWorldCompile,
  ChunkerFactory,      // createPulseChunker
  ACTNowFactory,       // createACTNowVxx
  PulsePowerAPI,       // PulsePower-v18+
  WorldBinaryCore,     // optional, for binary surfaces
  Router,              // optional, for route context
  Brain,
  Logger
} = {}) {
  if (!PulseWorldCompile) {
    throw new Error("CompilerWorker v30: Missing PulseWorldCompile.");
  }

  const log = Logger?.log || Brain?.log || console.log;
  const warn = Logger?.warn || Brain?.warn || console.warn;
  const error = Logger?.error || Brain?.logError || console.error;

  const Chunker =
    typeof ChunkerFactory === "function"
      ? ChunkerFactory({ Brain, Logger })
      : null;

  const ACTNow =
    typeof ACTNowFactory === "function"
      ? ACTNowFactory({
          PulseImmunity: Brain?.Immunity || {},
          PulseSurgeonGeneral: Brain?.SurgeonGeneral || {}
        })
      : null;

  const profileEngine = createProfileEngine({ Logger });
  const cache = createCompileCache({ Logger });

  function safeLog(stage, details = {}) {
    try {
      log(
        "[CompilerWorker-v30]",
        stage,
        JSON.stringify({
          schemaVersion: WORKER_SCHEMA_VERSION,
          ...details
        })
      );
    } catch {
      // never throw
    }
  }

  // ------------------------------------------------------------------------
  // PREWARM — canonical backend profiles
  // ------------------------------------------------------------------------
  function prewarm() {
    safeLog("PREWARM_START");

    profileEngine.prewarmProfile("compile-default", {
      backendKind: "compile",
      worldBand: "backend",
      presenceTag: "compile-worker",
      band: "dual",
      chunkProfile: "compile-default",
      binaryMode: "hybrid",
      meshMode: "mesh-first"
    });

    profileEngine.prewarmProfile("compile-plan", {
      backendKind: "plan",
      worldBand: "backend",
      presenceTag: "compile-plan",
      band: "dual",
      chunkProfile: "compile-plan",
      binaryMode: "symbolic",
      meshMode: "mesh-first"
    });

    profileEngine.prewarmProfile("compile-state", {
      backendKind: "state",
      worldBand: "backend",
      presenceTag: "compile-state",
      band: "dual",
      chunkProfile: "compile-state",
      binaryMode: "binary",
      meshMode: "host-mesh"
    });

    safeLog("PREWARM_DONE");
  }

  // ------------------------------------------------------------------------
  // CORE COMPILE PRIMITIVE — async, deterministic per job
  // ------------------------------------------------------------------------
  async function compileJob(rawJob, rawContext = {}) {
    const job = normalizeCompileJob(rawJob);
    const profile = profileEngine.resolveProfile(rawContext);

    const presenceBase = {
      laneId: job.laneId,
      envelopeId: job.envelopeId,
      band: profile.band,
      presenceTag: profile.presenceTag,
      worldBand: profile.worldBand,
      binaryMode: profile.binaryMode,
      meshMode: profile.meshMode
    };

    const cacheKey = cache.buildCacheKey(job, profile);
    const cached = cache.get(cacheKey);

    if (cached) {
      const presence = buildPresenceEnvelope({
        ...presenceBase,
        wave: "stable",
        bandKind: "backend_compile_worker",
        ok: true
      });

      safeLog("CACHE_HIT", {
        laneId: job.laneId,
        route: job.route,
        intent: job.intent
      });

      const resp = cached.entry.response;
      return {
        ...resp,
        presence
      };
    }

    // 1) Run compiler (semantic brain)
    let compileResult = null;
    let compileDiagnostics = null;

    try {
      let result;

      if (typeof PulseWorldCompile === "function") {
        result = await PulseWorldCompile({
          route: job.route,
          pageId: job.pageId,
          intent: job.intent,
          payload: job.payload,
          options: job.options,
          profile,
          worldBinaryContext: rawContext.worldBinaryContext || null
        });
      } else if (typeof PulseWorldCompile.compile === "function") {
        result = await PulseWorldCompile.compile({
          route: job.route,
          pageId: job.pageId,
          intent: job.intent,
          payload: job.payload,
          options: job.options,
          profile,
          worldBinaryContext: rawContext.worldBinaryContext || null
        });
      } else {
        throw new Error("Invalid PulseWorldCompile shape");
      }

      compileResult = result?.output ?? result?.result ?? result ?? null;
      compileDiagnostics = result?.diagnostics ?? null;
    } catch (e) {
      const msg = e?.message || "Compile failed";
      error("[CompilerWorker v30] Compile failed", {
        laneId: job.laneId,
        route: job.route,
        intent: job.intent,
        error: msg
      });

      const presence = buildPresenceEnvelope({
        ...presenceBase,
        wave: "distorted",
        bandKind: "backend_compile_worker",
        ok: false
      });

      return {
        ok: false,
        laneId: job.laneId,
        envelopeId: job.envelopeId,
        compileResult: null,
        chunkMeta: null,
        actNowReflex: null,
        powerHints: null,
        binaryCompileSurface: null,
        presence,
        diagnostics: {
          error: msg,
          compileDiagnostics: null
        }
      };
    }

    const compileBytes = Buffer.byteLength(
      JSON.stringify(compileResult ?? {}),
      "utf8"
    );
    profileEngine.bumpProfileStats(profile.profileId, compileBytes);

    // 2) Chunk metadata
    let chunkMeta = null;
    if (Chunker && typeof Chunker.chunkPayload === "function") {
      try {
        const buffer = Buffer.from(
          JSON.stringify(compileResult ?? {}),
          "utf8"
        );
        chunkMeta = Chunker.chunkPayload({
          userId: job.userId,
          payload: buffer,
          chunkSize: profile.defaultChunkSize,
          baseVersion: "v2",
          sizeOnly: false,
          presenceTag: profile.presenceTag,
          band: profile.band,
          backendKind: profile.backendKind,
          worldBand: profile.worldBand,
          chunkProfile: profile.chunkProfile
        });
      } catch (e) {
        warn("[CompilerWorker v30] Chunk metadata failed", {
          laneId: job.laneId,
          error: e?.message
        });
      }
    }

    // 3) ACTNow reflex
    let actNowReflex = null;
    if (ACTNow && typeof ACTNow.reflex === "function") {
      try {
        const snapshot = {
          laneId: job.laneId,
          route: job.route,
          intent: job.intent,
          compileDiagnostics,
          chunkMeta,
          profile
        };
        actNowReflex = ACTNow.reflex(snapshot, { modeKind: "dual" });
      } catch (e) {
        warn("[CompilerWorker v30] ACTNow reflex failed", {
          laneId: job.laneId,
          error: e?.message
        });
      }
    }

    // 4) Power hints
    let powerHints = null;
    if (PulsePowerAPI && typeof PulsePowerAPI.getPulsePowerSnapshot === "function") {
      try {
        const snap = PulsePowerAPI.getPulsePowerSnapshot();
        powerHints = {
          lanes: snap?.chunkHints?.lanes || null,
          prewarmTargets: snap?.chunkHints?.prewarmTargets || null
        };
      } catch (e) {
        warn("[CompilerWorker v30] Power snapshot failed", {
          laneId: job.laneId,
          error: e?.message
        });
      }
    }

    // 5) Binary compile surface + optional world binary registration
    const binaryCompileSurface = buildBinaryCompileSurface({
      job,
      profile,
      compileBytes,
      laneId: job.laneId
    });

    if (WorldBinaryCore && typeof WorldBinaryCore.registerEntity === "function") {
      try {
        WorldBinaryCore.registerEntity(binaryCompileSurface);
      } catch {
        // never throw from registration
      }
    }

    const presence = buildPresenceEnvelope({
      ...presenceBase,
      wave: "coherent",
      bandKind: "backend_compile_worker",
      ok: true
    });

    const response = {
      ok: true,
      laneId: job.laneId,
      envelopeId: job.envelopeId,
      compileResult,
      chunkMeta,
      actNowReflex,
      powerHints,
      binaryCompileSurface,
      presence,
      diagnostics: {
        compileDiagnostics,
        profileId: profile.profileId,
        bytes: compileBytes
      }
    };

    cache.put(cacheKey, response);

    return response;
  }

  // ------------------------------------------------------------------------
  // PUBLIC API
  // ------------------------------------------------------------------------
  const api = {
    meta: PulseWorldCompilerWorkerMeta,

    prewarm,
    compileJob,

    getProfiles: profileEngine.getProfiles,
    getProfileStats: profileEngine.getProfileStats,
    getLaneStats: cache.getLaneStats,
    getLaneCacheSnapshot: cache.getLaneCacheSnapshot
  };

  safeLog("INIT", {
    lanes: PulseWorldCompilerWorkerMeta.lanes
  });

  return api;
}

export default createPulseWorldCompilerWorker;
