// ============================================================================
// FILE: /PULSE-OS/PulseChunker-v2.js
// PULSE CHUNK ENGINE — v14-Immortal
//  - Payload chunking
//  - Cache/delta engine
//  - Route-level folding carpet (full route chunking)
//  - PulseBandSession-aware
//  - v14-Immortal: 32-lane cache + top-chunk memory + TTL
// ============================================================================

/*
AI_EXPERIENCE_META = {
  identity: "PulseChunker",
  version: "v14-Immortal",
  layer: "os_chunker",
  role: "chunking_and_prewarm_engine",
  lineage: "PulseOS-v14",

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
    zeroMutationOfInput: true
  },

  contract: {
    always: [
      "PulseOSBrain",
      "PulseOSBBB",
      "PulseBinaryOS"
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
// META BLOCK — ORGAN IDENTITY
// ============================================================================
export const PulseChunkerMeta = Object.freeze({
  layer: "Backend",
  role: "PAYLOAD_CHUNK_ENGINE",
  version: "v14-Immortal",
  identity: "PulseChunker-v14-Immortal",
  guarantees: Object.freeze({
    deterministicSessionId: true,
    cacheAware: true,
    deltaAware: true,
    sizeOnlyAware: true,
    presenceAware: true,
    binaryAware: true,
    dualBandAware: true,
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
      "band"
    ],
    output: [
      "sessionId",
      "totalChunks",
      "payloadBytes",
      "payloadHash",
      "presenceTag",
      "band"
    ]
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
function generateLoreHeader({ meta, payloadType, baseVersion, presenceTag, band }) {
  if (!meta) return "";
  const guarantees = Object.keys(meta.guarantees || {}).filter(k => meta.guarantees[k]);
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
// PRESENCE ENVELOPE — lane-aware, envelope-aware
// ============================================================================
function buildPresenceEnvelope({
  laneId,
  envelopeId,
  band = "dual",
  wave = "coherent",
  dualBand = true,
  presenceTag = "default",
  ok = true
}) {
  return {
    ok,
    laneId,
    envelopeId,
    band,
    dualBand,
    wave,
    presenceTag
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
    throw new Error("PulseChunker v14-Immortal: Missing Brain/Logger injection.");
  }

  const log   = Logger?.log   || Brain?.log   || console.log;
  const warn  = Logger?.warn  || Brain?.warn  || console.warn;
  const error = Logger?.error || Brain?.logError || console.error;

  // DB is injected via Brain; no global firebase-admin, no global db
  const db = Brain?.firebase ? Brain.firebase("db") : null;

  const fsAPI     = Brain?.fsAPI     || global.fsAPI     || null;
  const routeAPI  = Brain?.routeAPI  || global.routeAPI  || null;
  const schemaAPI = Brain?.schemaAPI || global.schemaAPI || null;
  const fetchAPI  = Logger?.fetchAPI || Brain?.fetchAPI  || global.fetch || null;

  const backendOrgans = new Map();
  const sessions = new Map();

  const MetaForLore = {
    identity: "PulseChunker-v14-Immortal",
    version: "14.0.0",
    guarantees: {
      laneAware: true,
      presenceAware: true,
      binarySafe: true,
      cacheAware: true,
      routeDescriptorAware: true,
      loreInjected: true
    },
    contract: {
      input: [
        "routeDescriptor | rawPayload",
        "laneId",
        "envelopeId",
        "userId",
        "baseVersion",
        "sizeOnly"
      ],
      output: [
        "ok",
        "data",
        "kind",
        "presence",
        "lore",
        "sessionId",
        "payloadBytes",
        "payloadHash"
      ]
    }
  };

  // ========================================================================
  // 32-LANE TOP-CHUNK MEMORY — lane-partitioned cache + TTL
  // ========================================================================
  const LANE_COUNT = 32;
  const LANE_MASK  = LANE_COUNT - 1;
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

  function buildCacheKey({ url, payload, routeDescriptor, baseVersion, sizeOnly }) {
    if (routeDescriptor && typeof routeDescriptor.route === "string") {
      return `route::${routeDescriptor.route}::${baseVersion || "v1"}::${sizeOnly ? "size" : "full"}`;
    }

    if (typeof payload === "string") {
      return `payload::${payload}::${baseVersion || "v1"}::${sizeOnly ? "size" : "full"}`;
    }

    if (url) {
      return `url::${url}::${baseVersion || "v1"}::${sizeOnly ? "size" : "full"}`;
    }

    return `anon::${baseVersion || "v1"}::${sizeOnly ? "size" : "full"}`;
  }

  function getCacheEntry(cacheKey) {
    const laneIndex = pickLaneIndexForCache(cacheKey);
    const laneStore = laneStores[laneIndex];
    const entry = laneStore.get(cacheKey);
    if (!entry) return null;

    const now = Date.now();
    if (entry.expiresAt <= now) {
      laneStore.delete(cacheKey);
      return null;
    }

    return { laneIndex, entry };
  }

  function putCacheEntry(cacheKey, response) {
    const laneIndex = pickLaneIndexForCache(cacheKey);
    const laneStore = laneStores[laneIndex];

    const now = Date.now();
    const expiresAt = now + CACHE_TTL_MS;

    laneStore.set(cacheKey, {
      createdAt: now,
      expiresAt,
      response
    });

    log("[PulseChunker v14] Cache stored", {
      cacheKey,
      laneIndex,
      expiresAt
    });
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

    log("[PulseChunker v14] PulseBandSession started", {
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
      warn("[PulseChunker v14] registerBackendOrgan called with invalid args", {
        name,
        hasChunk: typeof chunk === "function"
      });
      return;
    }

    backendOrgans.set(name, { chunk, prewarm });
    log("[PulseChunker v14] Registered backend organ for chunking", { name });
  }

  // ------------------------------------------------------------------------
  // Prewarm — universal warmup for chunker + registered organs
  // ------------------------------------------------------------------------
  function prewarm() {
    log("[PulseChunker v14] Prewarm start", {
      organs: backendOrgans.size
    });

    for (const [name, organ] of backendOrgans.entries()) {
      if (typeof organ.prewarm === "function") {
        try {
          organ.prewarm();
          log("[PulseChunker v14] Prewarmed organ", { name });
        } catch (e) {
          warn("[PulseChunker v14] Prewarm failed for organ", {
            name,
            error: e?.message
          });
        }
      }
    }

    log("[PulseChunker v14] Prewarm complete");
  }

  // ------------------------------------------------------------------------
  // Core chunking primitive (metadata only; no splitting yet)
// ------------------------------------------------------------------------
  function chunkPayload({
    userId,
    payload,
    chunkSize = 1024 * 64,
    baseVersion = "v1",
    sizeOnly = false,
    presenceTag = "default",
    band = "dual"
  }) {
    const buffer =
      typeof payload === "string" ? Buffer.from(payload, "utf8") : Buffer.from(payload || []);

    const payloadBytes = buffer.length;
    const payloadHash = computeHash(buffer.toString("utf8"));

    const totalChunks = sizeOnly
      ? Math.ceil(payloadBytes / chunkSize)
      : Math.max(1, Math.ceil(payloadBytes / chunkSize));

    const sessionSeed = `${userId || "anon"}::${payloadHash}::${baseVersion}`;
    const sessionId = computeHash(sessionSeed);

    const result = {
      sessionId,
      totalChunks,
      payloadBytes,
      payloadHash,
      presenceTag,
      band
    };

    log("[PulseChunker v14] Chunk payload computed", {
      userId,
      payloadBytes,
      totalChunks,
      presenceTag,
      band
    });

    return result;
  }

  // ========================================================================
  // UNIVERSAL CACHE ENGINE — ONE FUNCTION ONLY (DB‑scoped)
  // ========================================================================
  async function generateCache({ payload, baseVersion, sizeOnly = false, deltaRequest = false }) {
    if (!db) {
      warn("[PulseChunker v14] generateCache called without db; returning passthrough.");
      return sizeOnly ? 0 : payload;
    }

    const isDelta = deltaRequest || (typeof payload === "string" && payload.endsWith("_DELTA"));

    const [collection, field] = String(
      payload
        .replace?.(/^REQUEST_/, "") ?? payload
    )
      .replace(/_DELTA$/, "")
      .replace(/_CACHE$/, "")
      .toLowerCase()
      .split("_");

    const docs = (await db.collection(collection).get()).docs.map(d => d.data());
    let result = field ? docs.map(d => d[field]) : docs;

    if (isDelta && baseVersion) {
      const hash = computeHash(JSON.stringify(result));
      if (hash === baseVersion) return { added: [], removed: [], changed: [] };
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
    const isFull  = payload.endsWith("_CACHE");

    if (isDelta) {
      const delta = await generateCache({
        payload,
        baseVersion,
        deltaRequest: true,
        sizeOnly: !!sizeOnly
      });

      if (sizeOnly) return delta;

      const added   = delta?.added   || [];
      const removed = delta?.removed || [];
      const changed = delta?.changed || [];

      const empty =
        (!added?.length && !Object.keys(added).length) &&
        (!removed?.length && !Object.keys(removed).length) &&
        (!changed?.length && !Object.keys(changed).length);

      return empty
        ? await generateCache({ payload })
        : delta;
    }

    if (isFull) {
      return await generateCache({
        payload,
        sizeOnly: !!sizeOnly
      });
    }

    if (sizeOnly) {
      const deltaSize = Number(
        await generateCache({ payload, deltaRequest: true, sizeOnly: true }) || 0
      );

      if (deltaSize > 0) return deltaSize;

      return await generateCache({ payload, sizeOnly: true });
    }

    return payload;
  }

  // ------------------------------------------------------------------------
  // Route Descriptor Folding — imports/assets/payloads
  // ------------------------------------------------------------------------
  async function foldRouteDescriptor(descriptor, { laneId, envelopeId, userId, baseVersion }) {
    const { route, imports, assets, payloads } = descriptor;

    const cacheKey = buildCacheKey({
      url: null,
      payload: null,
      routeDescriptor: descriptor,
      baseVersion,
      sizeOnly: false
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
        ok: true
      });

      log("[PulseChunker v14] Route descriptor cache hit", {
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
    const resolvedAssets  = [];
    const resolvedPayloads = [];

    for (const imp of imports) {
      try {
        const resolved = await resolveCacheRequest(imp, baseVersion, false);
        resolvedImports.push(resolved);
      } catch (e) {
        warn("[PulseChunker v14] Failed to resolve import", { route, imp, error: e?.message });
      }
    }

    for (const asset of assets) {
      try {
        const resolved = await resolveCacheRequest(asset, baseVersion, false);
        resolvedAssets.push(resolved);
      } catch (e) {
        warn("[PulseChunker v14] Failed to resolve asset", { route, asset, error: e?.message });
      }
    }

    for (const p of payloads) {
      try {
        const resolved = await resolveCacheRequest(p, baseVersion, false);
        resolvedPayloads.push(resolved);
      } catch (e) {
        warn("[PulseChunker v14] Failed to resolve payload", { route, payload: p, error: e?.message });
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
      band: "dual"
    });

    const presence = buildPresenceEnvelope({
      laneId,
      envelopeId,
      band: "dual",
      wave: "coherent",
      dualBand: true,
      presenceTag: "route-descriptor",
      ok: true
    });

    const lore = generateLoreHeader({
      meta: MetaForLore,
      payloadType: kind,
      baseVersion,
      presenceTag: "route-descriptor",
      band: "dual"
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
    routeDescriptor
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
        sizeOnly: !!sizeOnly
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
          ok: true
        });

        log("[PulseChunker v14] Payload cache hit", {
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

      const resolved = await resolveCacheRequest(payload ?? url, baseVersion, sizeOnly);

      const { kind, buffer, raw } = normalizeBackendPayload(resolved);

      const metaChunk = chunkPayload({
        userId,
        payload: buffer,
        baseVersion: baseVersion || "v1",
        presenceTag: "default",
        band: "dual",
        sizeOnly: !!sizeOnly
      });

      const presence = buildPresenceEnvelope({
        laneId,
        envelopeId,
        band: "dual",
        wave: "coherent",
        dualBand: true,
        presenceTag: "default",
        ok: true
      });

      const lore = generateLoreHeader({
        meta: MetaForLore,
        payloadType: kind,
        baseVersion,
        presenceTag: "default",
        band: "dual"
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
      error("[PulseChunker v14] chunkRoute failed", {
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
      routeDescriptor
    } = request || {};

    return await chunkRoute({
      url,
      laneId,
      envelopeId,
      userId,
      baseVersion,
      sizeOnly,
      payload,
      routeDescriptor
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
