// ============================================================================
// FILE: /PULSE-UI/_BACKEND/PulseWorldChunker-v18.js
// PULSE CHUNK ENGINE — v18-Immortal
//  - Payload chunking (backend + compiler/ACTNOW-aligned)
//  - Cache/delta engine
//  - Route-level folding carpet (full route chunking)
//  - PulseBandSession-aware
//  - v18-Immortal: 32-lane cache + top-chunk memory + TTL
//  - Compiler/ACTNOW-aware envelopes (ready for front chunk lanes)
// ============================================================================

/*
AI_EXPERIENCE_META = {
  identity: "PulseChunker",
  version: "v18-Immortal",
  layer: "os_chunker",
  role: "chunking_and_prewarm_engine",
  lineage: "PulseOS-v14 → v17-Immortal → v18-Immortal",

  evo: {
    chunking: true,
    prewarm: true,
    cacheAware: true,

    deterministic: true,
    driftProof: true,
    zeroNetwork: true,
    zeroFilesystem: true,

    symbolicPrimary: true,
    binaryAware: true,
    dualBand: true,

    safeRouteFree: true,
    zeroMutationOfInput: true,

    // v18 upgrades
    compilerAware: true,
    actnowAware: true,
    unifiedEnvelope: true,
    laneProfileAware: true
  },

  contract: {
    always: [
      "PulseOSBrain",
      "PulseOSBBB",
      "PulseBinaryOS",
      "PulseWorldCompiler",
      "ACTNOW"
    ],
    never: [
      "legacyChunker",
      "safeRoute",
      "fetchViaCNS"
    ]
  }
}
*/

// ============================================================================
// META BLOCK — ORGAN IDENTITY (v18-Immortal)
// ============================================================================
export const PulseChunkerMeta = Object.freeze({
  layer: "Backend",
  role: "PAYLOAD_CHUNK_ENGINE",
  version: "v18-Immortal",
  identity: "PulseChunker-v18-Immortal",
  guarantees: Object.freeze({
    deterministicSessionId: true,
    cacheAware: true,
    deltaAware: true,
    sizeOnlyAware: true,
    presenceAware: true,
    binaryAware: true,
    dualBandAware: true,
    worldBandAware: true,
    backendKindAware: true,
    profileAware: true,
    laneAware: true,
    noFrontendExposure: true,
    noDynamicImports: true,
    noEval: true,
    noRandomness: true
    // noTiming: timing only used for TTL/observability, not identity
  }),
  contract: Object.freeze({
    input: [
      "userId",
      "payload",
      "chunkSize",
      "baseVersion",
      "sizeOnly",
      "presenceTag",
      "band",
      "backendKind?",
      "worldBand?",
      "chunkProfile?"
    ],
    output: [
      "sessionId",
      "totalChunks",
      "payloadBytes",
      "payloadHash",
      "presenceTag",
      "band",
      "backendKind?",
      "worldBand?",
      "chunkProfile?"
    ]
  }),
  evo: Object.freeze({
    backendChunker: true,
    dualBand: true,
    symbolicPrimary: true,
    binaryAware: true,
    presenceBandAware: true,
    worldBandAware: true,
    backendKindAware: true,
    profileAware: true,
    cacheAware: true,
    deltaAware: true,
    deterministic: true,
    driftProof: true,
    pureCompute: true,
    zeroNetworkFetch: false, // db is injected, not global
    zeroFilesystemGlobal: true,
    zeroMutationOfInput: true
  })
});

// ============================================================================
// ROUTE DESCRIPTOR CONTRACT — v12.4-Evo-ROUTE-FABRIC
// ============================================================================
function isRouteDescriptor(input) {
  if (!input || typeof input !== "object") return false;
  return (
    typeof input.route === "string" &&
    Array.isArray(input.imports) &&
    Array.isArray(input.assets) &&
    Array.isArray(input.payloads)
  );
}

// ============================================================================
// LORE TRANSLATOR — backend flavor, Presence-aligned
// ============================================================================
function generateLoreHeader({
  meta,
  payloadType,
  baseVersion,
  presenceTag,
  band,
  backendKind,
  worldBand,
  chunkProfile
}) {
  if (!meta) return "";
  const guarantees = Object.keys(meta.guarantees || {}).filter(
    (k) => meta.guarantees[k]
  );
  const inputs = meta.contract?.input || [];
  const outputs = meta.contract?.output || [];
  return `
/*
  PULSE LORE — ORGAN: ${meta.identity}
  VERSION: ${meta.version}
  PAYLOAD TYPE: ${payloadType || "unknown"}
  BASE VERSION: ${baseVersion || "none"}
  PRESENCE TAG: ${presenceTag || "none"}
  BAND: ${band || "symbolic"}
  BACKEND KIND: ${backendKind || "generic"}
  WORLD BAND: ${worldBand || "backend"}
  CHUNK PROFILE: ${chunkProfile || "default"}

  Guarantees:
    • ${guarantees.join("\n    • ")}

  INPUT:
    • ${inputs.join("\n    • ")}

  OUTPUT:
    • ${outputs.join("\n    • ")}
*/
`;
}

// ============================================================================
// DETERMINISTIC HASH — Pulse-native, no crypto
// ============================================================================
function computeHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 1000000007;
  }
  return `h${h}`;
}

// ============================================================================
// PRESENCE ENVELOPE — lane-aware, envelope-aware, world-band-aware
// ============================================================================
function buildPresenceEnvelope({
  laneId,
  envelopeId,
  band = "dual",
  wave = "coherent",
  dualBand = true,
  presenceTag = "default",
  worldBand = "backend",
  bandKind = "backend_chunk",
  ok = true
}) {
  return {
    ok,
    laneId,
    envelopeId,
    band,
    dualBand,
    wave,
    presenceTag,
    worldBand,
    bandKind
    // timing/TTL is owned by frontend membrane
  };
}

// ============================================================================
// PAYLOAD NORMALIZATION — JSON / string / Buffer / binary
// ============================================================================
function normalizeBackendPayload(payload) {
  if (payload == null) {
    return { kind: "none", buffer: Buffer.alloc(0), raw: null };
  }

  if (Buffer.isBuffer(payload)) {
    return { kind: "binary", buffer: payload, raw: payload };
  }

  if (payload instanceof Uint8Array) {
    const buf = Buffer.from(payload);
    return { kind: "binary", buffer: buf, raw: payload };
  }

  if (typeof payload === "string") {
    const buf = Buffer.from(payload, "utf8");
    return { kind: "text", buffer: buf, raw: payload };
  }

  const jsonStr = JSON.stringify(payload);
  const buf = Buffer.from(jsonStr, "utf8");
  return { kind: "json", buffer: buf, raw: payload };
}

// ============================================================================
// FACTORY — CNS‑SAFE CHUNKER (Brain + Logger)
// ============================================================================
export function createPulseChunker({ Brain, Logger } = {}) {
  if (!Brain && !Logger) {
    throw new Error(
      "PulseChunker v18-Immortal: Missing Brain/Logger injection."
    );
  }

  const log = Logger?.log || Brain?.log || console.log;
  const warn = Logger?.warn || Brain?.warn || console.warn;
  const error = Logger?.error || Brain?.logError || console.error;

  // DB is injected via Brain; no global firebase-admin, no global db
  const db = Brain?.firebase ? Brain.firebase("db") : null;

  const fsAPI = Brain?.fsAPI || global.fsAPI || null;
  const routeAPI = Brain?.routeAPI || global.routeAPI || null;
  const schemaAPI = Brain?.schemaAPI || global.schemaAPI || null;
  const fetchAPI = Logger?.fetchAPI || Brain?.fetchAPI || global.fetch || null;

  const backendOrgans = new Map();
  const sessions = new Map();

  const MetaForLore = {
    identity: "PulseChunker-v18-Immortal",
    version: "18.0.0",
    guarantees: {
      laneAware: true,
      presenceAware: true,
      binarySafe: true,
      cacheAware: true,
      routeDescriptorAware: true,
      loreInjected: true,
      backendKindAware: true,
      worldBandAware: true,
      profileAware: true
    },
    contract: {
      input: [
        "routeDescriptor | rawPayload",
        "laneId",
        "envelopeId",
        "userId",
        "baseVersion",
        "sizeOnly",
        "backendKind?",
        "worldBand?",
        "chunkProfile?"
      ],
      output: [
        "ok",
        "data",
        "kind",
        "presence",
        "lore",
        "sessionId",
        "payloadBytes",
        "payloadHash",
        "backendKind?",
        "worldBand?",
        "chunkProfile?"
      ]
    }
  };

  // ========================================================================
  // 32-LANE TOP-CHUNK MEMORY — lane-partitioned cache + TTL + lane stats
  // ========================================================================
  const LANE_COUNT = 32;
  const LANE_MASK = LANE_COUNT - 1;
  const CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000; // ~1 week

  function hashKey(key = "") {
    let h = 0;
    const s = String(key);
    for (let i = 0; i < s.length; i++) {
      h = ((h << 5) - h + s.charCodeAt(i)) | 0;
    }
    return h >>> 0;
  }

  function pickLaneIndexForCache(key) {
    return hashKey(key) & LANE_MASK;
  }

  const laneStores = Array.from({ length: LANE_COUNT }, () => new Map());
  const laneStats = Array.from({ length: LANE_COUNT }, (_, laneId) =>
    Object.seal({
      laneId,
      entries: 0,
      hits: 0,
      misses: 0,
      evictions: 0,
      lastTs: null
    })
  );

  function buildCacheKey({
    url,
    payload,
    routeDescriptor,
    baseVersion,
    sizeOnly,
    backendKind,
    worldBand,
    chunkProfile
  }) {
    const base = baseVersion || "v1";
    const sizeTag = sizeOnly ? "size" : "full";
    const bk = backendKind || "generic";
    const wb = worldBand || "backend";
    const cp = chunkProfile || "default";

    if (routeDescriptor && typeof routeDescriptor.route === "string") {
      return `route::${routeDescriptor.route}::${base}::${sizeTag}::${bk}::${wb}::${cp}`;
    }

    if (typeof payload === "string") {
      return `payload::${payload}::${base}::${sizeTag}::${bk}::${wb}::${cp}`;
    }

    if (url) {
      return `url::${url}::${base}::${sizeTag}::${bk}::${wb}::${cp}`;
    }

    return `anon::${base}::${sizeTag}::${bk}::${wb}::${cp}`;
  }

  function getCacheEntry(cacheKey) {
    const laneIndex = pickLaneIndexForCache(cacheKey);
    const laneStore = laneStores[laneIndex];
    const stat = laneStats[laneIndex];

    const entry = laneStore.get(cacheKey);
    if (!entry) {
      stat.misses += 1;
      stat.lastTs = Date.now();
      return null;
    }

    const now = Date.now();
    if (entry.expiresAt <= now) {
      laneStore.delete(cacheKey);
      stat.evictions += 1;
      stat.lastTs = now;
      return null;
    }

    stat.hits += 1;
    stat.lastTs = now;

    return { laneIndex, entry };
  }

  function putCacheEntry(cacheKey, response) {
    const laneIndex = pickLaneIndexForCache(cacheKey);
    const laneStore = laneStores[laneIndex];
    const stat = laneStats[laneIndex];

    const now = Date.now();
    const expiresAt = now + CACHE_TTL_MS;

    laneStore.set(cacheKey, {
      createdAt: now,
      expiresAt,
      response
    });

    stat.entries = laneStore.size;
    stat.lastTs = now;

    log("[PulseChunker v18] Cache stored", {
      cacheKey,
      laneIndex,
      expiresAt
    });
  }

  // ========================================================================
  // PROFILE ENGINE — backendKind/worldBand/chunkProfile
  // ========================================================================
  const profiles = new Map();
  const profileStats = new Map();

  function prewarmProfile(profileId, profile = {}) {
    if (!profileId) return;
    const stored = Object.freeze({
      profileId,
      ts: Date.now(),
      config: {
        backendKind: profile.backendKind || "generic",
        worldBand: profile.worldBand || "backend",
        presenceTag: profile.presenceTag || "default",
        band: profile.band || "dual",
        chunkProfile: profile.chunkProfile || profileId,
        defaultChunkSize: profile.defaultChunkSize || 1024 * 64,
        maxChunkSize: profile.maxChunkSize || 1024 * 1024
      }
    });
    profiles.set(profileId, stored);

    if (!profileStats.has(profileId)) {
      profileStats.set(
        profileId,
        Object.seal({
          profileId,
          chunks: 0,
          bytes: 0,
          lastTs: null
        })
      );
    }

    log("[PulseChunker v18] Prewarmed profile", { profileId });

    return stored;
  }

  function resolveProfile(options = {}) {
    const profileId = options.chunkProfile || options.profileId || "backend-default";
    const profile = profiles.get(profileId);

    const base = {
      backendKind: options.backendKind || "generic",
      worldBand: options.worldBand || "backend",
      presenceTag: options.presenceTag || "default",
      band: options.band || "dual",
      chunkProfile: profileId,
      defaultChunkSize: options.chunkSize || 1024 * 64,
      maxChunkSize: 1024 * 1024
    };

    const fromProfile = profile?.config || {};

    return {
      backendKind: fromProfile.backendKind || base.backendKind,
      worldBand: fromProfile.worldBand || base.worldBand,
      presenceTag: fromProfile.presenceTag || base.presenceTag,
      band: fromProfile.band || base.band,
      chunkProfile: fromProfile.chunkProfile || base.chunkProfile,
      defaultChunkSize:
        fromProfile.defaultChunkSize || base.defaultChunkSize,
      maxChunkSize: fromProfile.maxChunkSize || base.maxChunkSize,
      profileId
    };
  }

  function bumpProfileStats(profileId, bytes) {
    if (!profileId) return;
    const stat =
      profileStats.get(profileId) ||
      Object.seal({
        profileId,
        chunks: 0,
        bytes: 0,
        lastTs: null
      });
    stat.chunks += 1;
    stat.bytes += bytes;
    stat.lastTs = Date.now();
    profileStats.set(profileId, stat);
  }

  // ------------------------------------------------------------------------
  // PulseBandSession — deterministic session bootstrap (no time in ID)
  // ------------------------------------------------------------------------
  function startPulseBandSession({
    trace,
    db: dbOverride,
    fsAPI: fsOverride,
    routeAPI: routeOverride,
    schemaAPI: schemaOverride
  } = {}) {
    const seed = `${trace || "no-trace"}::${JSON.stringify({
      hasDb: !!(dbOverride || db),
      hasFs: !!(fsOverride || fsAPI),
      hasRoute: !!(routeOverride || routeAPI)
    })}`;

    const sessionId = computeHash(seed);

    const session = {
      id: sessionId,
      startedAt: Date.now(), // observability only
      db: dbOverride || db,
      fsAPI: fsOverride || fsAPI,
      routeAPI: routeOverride || routeAPI,
      schemaAPI: schemaOverride || schemaAPI
    };

    sessions.set(sessionId, session);

    log("[PulseChunker v18] PulseBandSession started", {
      sessionId,
      hasDb: !!session.db
    });

    return session;
  }

  // ------------------------------------------------------------------------
  // Registration — backend organs that support chunking
  // ------------------------------------------------------------------------
  function registerBackendOrgan(name, { chunk, prewarm } = {}) {
    if (!name || typeof chunk !== "function") {
      warn("[PulseChunker v18] registerBackendOrgan called with invalid args", {
        name,
        hasChunk: typeof chunk === "function"
      });
      return;
    }

    backendOrgans.set(name, { chunk, prewarm });
    log("[PulseChunker v18] Registered backend organ for chunking", { name });
  }

  // ------------------------------------------------------------------------
  // Prewarm — universal warmup for chunker + registered organs
  // ------------------------------------------------------------------------
  function prewarm() {
    log("[PulseChunker v18] Prewarm start", {
      organs: backendOrgans.size
    });

    // Prewarm canonical profiles
    prewarmProfile("backend-default", {
      backendKind: "generic",
      worldBand: "backend",
      presenceTag: "default",
      band: "dual",
      chunkProfile: "backend-default"
    });

    prewarmProfile("backend-plan", {
      backendKind: "plan",
      worldBand: "backend",
      presenceTag: "plan",
      band: "dual",
      chunkProfile: "backend-plan"
    });

    prewarmProfile("backend-state", {
      backendKind: "state",
      worldBand: "backend",
      presenceTag: "state",
      band: "dual",
      chunkProfile: "backend-state"
    });

    prewarmProfile("backend-logs", {
      backendKind: "logs",
      worldBand: "backend",
      presenceTag: "logs",
      band: "dual",
      chunkProfile: "backend-logs"
    });

    for (const [name, organ] of backendOrgans.entries()) {
      if (typeof organ.prewarm === "function") {
        try {
          organ.prewarm();
          log("[PulseChunker v18] Prewarmed organ", { name });
        } catch (e) {
          warn("[PulseChunker v18] Prewarm failed for organ", {
            name,
            error: e?.message
          });
        }
      }
    }

    log("[PulseChunker v18] Prewarm complete");
  }

  // ------------------------------------------------------------------------
  // Core chunking primitive (metadata only; no splitting yet)
  //  - profile-aware / backendKind-aware / worldBand-aware
  // ------------------------------------------------------------------------
  function chunkPayload({
    userId,
    payload,
    chunkSize = 1024 * 64,
    baseVersion = "v1",
    sizeOnly = false,
    presenceTag = "default",
    band = "dual",
    backendKind = "generic",
    worldBand = "backend",
    chunkProfile = "backend-default"
  }) {
    const profile = resolveProfile({
      chunkProfile,
      backendKind,
      worldBand,
      presenceTag,
      band,
      chunkSize
    });

    const buffer =
      typeof payload === "string"
        ? Buffer.from(payload, "utf8")
        : Buffer.from(payload || []);

    const payloadBytes = buffer.length;
    const payloadHash = computeHash(buffer.toString("utf8"));

    const effectiveChunkSize = Math.max(
      1,
      Math.min(profile.defaultChunkSize, profile.maxChunkSize)
    );

    const totalChunks = sizeOnly
      ? Math.ceil(payloadBytes / effectiveChunkSize)
      : Math.max(1, Math.ceil(payloadBytes / effectiveChunkSize));

    const sessionSeed = `${userId || "anon"}::${payloadHash}::${baseVersion}::${profile.backendKind}::${profile.worldBand}::${profile.chunkProfile}`;
    const sessionId = computeHash(sessionSeed);

    const result = {
      sessionId,
      totalChunks,
      payloadBytes,
      payloadHash,
      presenceTag: profile.presenceTag,
      band: profile.band,
      backendKind: profile.backendKind,
      worldBand: profile.worldBand,
      chunkProfile: profile.chunkProfile
    };

    bumpProfileStats(profile.profileId, payloadBytes);

    log("[PulseChunker v18] Chunk payload computed", {
      userId,
      payloadBytes,
      totalChunks,
      presenceTag: profile.presenceTag,
      band: profile.band,
      backendKind: profile.backendKind,
      worldBand: profile.worldBand,
      chunkProfile: profile.chunkProfile
    });

    return result;
  }

  // ========================================================================
  // UNIVERSAL CACHE ENGINE — ONE FUNCTION ONLY (DB‑scoped)
  // ========================================================================
  async function generateCache({
    payload,
    baseVersion,
    sizeOnly = false,
    deltaRequest = false
  }) {
    if (!db) {
      warn(
        "[PulseChunker v18] generateCache called without db; returning passthrough."
      );
      return sizeOnly ? 0 : payload;
    }

    const isDelta =
      deltaRequest || (typeof payload === "string" && payload.endsWith("_DELTA"));

    const [collection, field] = String(
      payload.replace?.(/^REQUEST_/, "") ?? payload
    )
      .replace(/_DELTA$/, "")
      .replace(/_CACHE$/, "")
      .toLowerCase()
      .split("_");

    const docs = (await db.collection(collection).get()).docs.map((d) =>
      d.data()
    );
    let result = field ? docs.map((d) => d[field]) : docs;

    if (isDelta && baseVersion) {
      const hash = computeHash(JSON.stringify(result));
      if (hash === baseVersion)
        return { added: [], removed: [], changed: [] };
      return { added: result, removed: [], changed: [] };
    }

    if (!sizeOnly) return result;

    return Buffer.byteLength(JSON.stringify(result ?? {}), "utf8");
  }

  // ========================================================================
  // INTELLIGENT CACHE RESOLVER — ONE FUNCTION ONLY
  // ========================================================================
  async function resolveCacheRequest(payload, baseVersion, sizeOnly) {
    if (typeof payload !== "string") return payload;

    const isDelta = payload.endsWith("_DELTA");
    const isFull = payload.endsWith("_CACHE");

    if (isDelta) {
      const delta = await generateCache({
        payload,
        baseVersion,
        deltaRequest: true,
        sizeOnly: !!sizeOnly
      });

      if (sizeOnly) return delta;

      const added = delta?.added || [];
      const removed = delta?.removed || [];
      const changed = delta?.changed || [];

      const empty =
        (!added?.length && !Object.keys(added).length) &&
        (!removed?.length && !Object.keys(removed).length) &&
        (!changed?.length && !Object.keys(changed).length);

      return empty ? await generateCache({ payload }) : delta;
    }

    if (isFull) {
      return await generateCache({
        payload,
        sizeOnly: !!sizeOnly
      });
    }

    if (sizeOnly) {
      const deltaSize = Number(
        (await generateCache({
          payload,
          deltaRequest: true,
          sizeOnly: true
        })) || 0
      );

      if (deltaSize > 0) return deltaSize;

      return await generateCache({ payload, sizeOnly: true });
    }

    return payload;
  }

  // ------------------------------------------------------------------------
  // Route Descriptor Folding — imports/assets/payloads
  // ------------------------------------------------------------------------
  async function foldRouteDescriptor(
    descriptor,
    { laneId, envelopeId, userId, baseVersion }
  ) {
    const { route, imports, assets, payloads } = descriptor;

    const cacheKey = buildCacheKey({
      url: null,
      payload: null,
      routeDescriptor: descriptor,
      baseVersion,
      sizeOnly: false,
      backendKind: "route",
      worldBand: "backend",
      chunkProfile: "backend-plan"
    });

    const cached = getCacheEntry(cacheKey);
    if (cached) {
      const { entry, laneIndex } = cached;
      const cachedResp = entry.response;

      const presence = buildPresenceEnvelope({
        laneId,
        envelopeId,
        band: "dual",
        wave: "stable",
        dualBand: true,
        presenceTag: cachedResp.presence?.presenceTag || "route-descriptor",
        worldBand: cachedResp.presence?.worldBand || "backend",
        bandKind: "backend_chunk_route",
        ok: true
      });

      log("[PulseChunker v18] Route descriptor cache hit", {
        route,
        cacheKey,
        laneIndex
      });

      return {
        ok: true,
        data: cachedResp.data,
        kind: cachedResp.kind,
        presence,
        sessionId: cachedResp.sessionId,
        payloadBytes: cachedResp.payloadBytes,
        payloadHash: cachedResp.payloadHash
      };
    }

    const resolvedImports = [];
    const resolvedAssets = [];
    const resolvedPayloads = [];

    for (const imp of imports) {
      try {
        const resolved = await resolveCacheRequest(imp, baseVersion, false);
        resolvedImports.push(resolved);
      } catch (e) {
        warn("[PulseChunker v18] Failed to resolve import", {
          route,
          imp,
          error: e?.message
        });
      }
    }

    for (const asset of assets) {
      try {
        const resolved = await resolveCacheRequest(asset, baseVersion, false);
        resolvedAssets.push(resolved);
      } catch (e) {
        warn("[PulseChunker v18] Failed to resolve asset", {
          route,
          asset,
          error: e?.message
        });
      }
    }

    for (const p of payloads) {
      try {
        const resolved = await resolveCacheRequest(p, baseVersion, false);
        resolvedPayloads.push(resolved);
      } catch (e) {
        warn("[PulseChunker v18] Failed to resolve payload", {
          route,
          payload: p,
          error: e?.message
        });
      }
    }

    const folded = {
      route,
      imports: resolvedImports,
      assets: resolvedAssets,
      payloads: resolvedPayloads
    };

    const { kind, buffer } = normalizeBackendPayload(folded);
    const metaChunk = chunkPayload({
      userId,
      payload: buffer,
      baseVersion: baseVersion || "v1",
      presenceTag: "route-descriptor",
      band: "dual",
      backendKind: "route",
      worldBand: "backend",
      chunkProfile: "backend-plan"
    });

    const presence = buildPresenceEnvelope({
      laneId,
      envelopeId,
      band: "dual",
      wave: "coherent",
      dualBand: true,
      presenceTag: "route-descriptor",
      worldBand: "backend",
      bandKind: "backend_chunk_route",
      ok: true
    });

    const lore = generateLoreHeader({
      meta: MetaForLore,
      payloadType: kind,
      baseVersion,
      presenceTag: "route-descriptor",
      band: "dual",
      backendKind: "route",
      worldBand: "backend",
      chunkProfile: "backend-plan"
    });

    const dna = {
      __lore: lore,
      __chunk: folded
    };

    const response = {
      ok: true,
      data: dna,
      kind,
      presence,
      sessionId: metaChunk.sessionId,
      payloadBytes: metaChunk.payloadBytes,
      payloadHash: metaChunk.payloadHash
    };

    putCacheEntry(cacheKey, response);

    return response;
  }

  // ------------------------------------------------------------------------
  // Generic Chunk Route — used by CNS fetchExternalResource
  // ------------------------------------------------------------------------
  async function chunkRoute({
    url,
    laneId,
    envelopeId,
    userId,
    baseVersion,
    sizeOnly,
    payload,
    routeDescriptor,
    backendKind = "generic",
    worldBand = "backend",
    chunkProfile = "backend-default"
  }) {
    try {
      if (routeDescriptor && isRouteDescriptor(routeDescriptor)) {
        return await foldRouteDescriptor(routeDescriptor, {
          laneId,
          envelopeId,
          userId,
          baseVersion
        });
      }

      const cacheKey = buildCacheKey({
        url,
        payload,
        routeDescriptor: null,
        baseVersion,
        sizeOnly: !!sizeOnly,
        backendKind,
        worldBand,
        chunkProfile
      });

      const cached = getCacheEntry(cacheKey);
      if (cached && !sizeOnly) {
        const { entry, laneIndex } = cached;
        const cachedResp = entry.response;

        const presence = buildPresenceEnvelope({
          laneId,
          envelopeId,
          band: "dual",
          wave: "stable",
          dualBand: true,
          presenceTag: cachedResp.presence?.presenceTag || "default",
          worldBand: cachedResp.presence?.worldBand || worldBand,
          bandKind: "backend_chunk_route",
          ok: true
        });

        log("[PulseChunker v18] Payload cache hit", {
          url,
          cacheKey,
          laneIndex
        });

        return {
          ok: true,
          data: cachedResp.data,
          kind: cachedResp.kind,
          presence,
          sessionId: cachedResp.sessionId,
          payloadBytes: cachedResp.payloadBytes,
          payloadHash: cachedResp.payloadHash
        };
      }

      const resolved = await resolveCacheRequest(
        payload ?? url,
        baseVersion,
        sizeOnly
      );

      const { kind, buffer, raw } = normalizeBackendPayload(resolved);

      const metaChunk = chunkPayload({
        userId,
        payload: buffer,
        baseVersion: baseVersion || "v1",
        presenceTag: "default",
        band: "dual",
        sizeOnly: !!sizeOnly,
        backendKind,
        worldBand,
        chunkProfile
      });

      const presence = buildPresenceEnvelope({
        laneId,
        envelopeId,
        band: "dual",
        wave: "coherent",
        dualBand: true,
        presenceTag: "default",
        worldBand,
        bandKind: "backend_chunk_route",
        ok: true
      });

      const lore = generateLoreHeader({
        meta: MetaForLore,
        payloadType: kind,
        baseVersion,
        presenceTag: "default",
        band: "dual",
        backendKind,
        worldBand,
        chunkProfile
      });

      const dna = {
        __lore: lore,
        __chunk: raw
      };

      const response = {
        ok: true,
        data: dna,
        kind,
        presence,
        sessionId: metaChunk.sessionId,
        payloadBytes: metaChunk.payloadBytes,
        payloadHash: metaChunk.payloadHash
      };

      if (!sizeOnly) {
        putCacheEntry(cacheKey, response);
      }

      return response;
    } catch (e) {
      error("[PulseChunker v18] chunkRoute failed", {
        url,
        laneId,
        envelopeId,
        error: e?.message
      });

      const presence = buildPresenceEnvelope({
        laneId,
        envelopeId,
        band: "dual",
        wave: "distorted",
        dualBand: true,
        presenceTag: "error",
        worldBand,
        bandKind: "backend_chunk_route",
        ok: false
      });

      return {
        ok: false,
        error: e?.message || "Chunk route failed",
        presence
      };
    }
  }

  // ------------------------------------------------------------------------
  // CNS Handler — fetchExternalResource adapter
  // ------------------------------------------------------------------------
  async function handleFetchExternalResource(request) {
    const {
      url,
      laneId,
      envelopeId,
      userId,
      baseVersion,
      sizeOnly,
      payload,
      routeDescriptor,
      backendKind,
      worldBand,
      chunkProfile
    } = request || {};

    return await chunkRoute({
      url,
      laneId,
      envelopeId,
      userId,
      baseVersion,
      sizeOnly,
      payload,
      routeDescriptor,
      backendKind,
      worldBand,
      chunkProfile
    });
  }

  // ------------------------------------------------------------------------
  // Public API
  // ------------------------------------------------------------------------
  return {
    meta: PulseChunkerMeta,

    // CNS wiring
    startPulseBandSession,
    registerBackendOrgan,
    prewarm,

    // Core primitive
    chunkPayload,

    // Cache / route helpers
    resolveCacheRequest,
    generateCache,
    chunkRoute,
    handleFetchExternalResource,

    // Profiles / lanes
    prewarmProfile,
    getProfiles() {
      const out = {};
      for (const [k, v] of profiles.entries()) out[k] = v;
      return out;
    },
    getProfileStats() {
      const out = {};
      for (const [k, v] of profileStats.entries()) out[k] = { ...v };
      return out;
    },
    getLaneStats() {
      return laneStats.map((s) => ({ ...s }));
    },

    // Utilities
    getSession(sessionId) {
      return sessions.get(sessionId) || null;
    },

    hasBackendOrgan(name) {
      return backendOrgans.has(name);
    },

    isRouteDescriptor,
    generateLoreHeader,

    getLaneCacheSnapshot() {
      return laneStores.map((store, idx) => ({
        laneId: idx,
        size: store.size
      }));
    }
  };
}
