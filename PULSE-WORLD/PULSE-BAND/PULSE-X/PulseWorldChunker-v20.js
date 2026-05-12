// ============================================================================
// FILE: /PULSE-UI/_BACKEND/PulseWorldChunker-v20-Immortal-World.js
// PULSE WORLD CHUNK ENGINE — v20-Immortal-World
//  - Payload + Route + World-Graph chunking (backend + compiler/ACTNOW-aligned)
//  - Cache/delta engine (DB-scoped, deterministic, drift-proof)
//  - Route-level folding carpet (full route chunking, world-aware)
//  - PulseBandSession-aware + WorldBand-aware + PresenceBand-aware
//  - v20-Immortal: 64-lane cache + top-chunk memory + TTL + lane health
//  - Compiler/ACTNOW-aware envelopes (front chunk lanes ready)
//  - Identity/World/Bridge-aware: chunkProfile hints, presence tags, world bands
// ============================================================================
import {
  OrganismIdentity,
  buildPulseOrganismMap as PulseOrganismMap,
  buildPulseOrganismMap as buildOrganismMap
} from "./PULSE-WORLD-MAP.js";
const Identity = OrganismIdentity(import.meta.url);

// 2 — EXPORT GENOME METADATA
// export const PulseBinaryWaveScannerMeta = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
// export const WBC_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

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
// WORLD SNAPSHOT CONTRACT — symbolic-only, world-aware
// ============================================================================
function isWorldSnapshot(input) {
  if (!input || typeof input !== "object") return false;
  return (
    typeof input.meta === "object" &&
    Array.isArray(input.nodes || []) &&
    Array.isArray(input.edges || [])
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
// FACTORY — CNS‑SAFE WORLD CHUNKER (Brain + Logger)
// ============================================================================
export function createPulseWorldChunker({ Brain, Logger } = {}) {
  if (!Brain && !Logger) {
    throw new Error(
      "PulseWorldChunker v20-Immortal-World: Missing Brain/Logger injection."
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
    identity: "PulseWorldChunker-v20-Immortal-World",
    version: "20.0.0",
    guarantees: {
      laneAware: true,
      presenceAware: true,
      binarySafe: true,
      cacheAware: true,
      routeDescriptorAware: true,
      worldSnapshotAware: true,
      loreInjected: true,
      backendKindAware: true,
      worldBandAware: true,
      profileAware: true
    },
    contract: {
      input: [
        "routeDescriptor | rawPayload | worldSnapshot",
        "laneId",
        "envelopeId",
        "userId",
        "baseVersion",
        "sizeOnly",
        "backendKind?",
        "worldBand?",
        "chunkProfile?",
        "identitySnapshot?",
        "worldGraphSnapshot?"
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
        "chunkProfile?",
        "laneHealth?",
        "profileStats?"
      ]
    }
  };

  // ========================================================================
  // 64-LANE TOP-CHUNK MEMORY — lane-partitioned cache + TTL + lane stats
  // ========================================================================
  const LANE_COUNT = 64;
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
    worldSnapshot,
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

    if (worldSnapshot && typeof worldSnapshot.meta === "object") {
      const worldId = worldSnapshot.meta?.version || "world";
      return `world::${worldId}::${base}::${sizeTag}::${bk}::${wb}::${cp}`;
    }

    if (typeof payload === "string") {
      return `payload::${payload}::${base}::${sizeTag}::${bk}::${wb}::${cp}`;
    }

    if (url) {
      return `url::${url}::${base}::${sizeTag}::${bk}::${wb}::${cp}`;
    }

    return `anon::${base}::${sizeTag}::${bk}::${wb}::${cp}`;
  }

  function getLaneHealth() {
    const now = Date.now();
    return laneStats.map((stat) => {
      const ageMs = stat.lastTs ? now - stat.lastTs : null;
      const hot = ageMs != null && ageMs < 60 * 1000;
      return {
        laneId: stat.laneId,
        entries: stat.entries,
        hits: stat.hits,
        misses: stat.misses,
        evictions: stat.evictions,
        lastTs: stat.lastTs,
        hot
      };
    });
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

    log("[PulseWorldChunker v20] Cache stored", {
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

    log("[PulseWorldChunker v20] Prewarmed profile", { profileId });

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

  function getProfileStatsSnapshot() {
    return Array.from(profileStats.values()).map((s) => ({
      profileId: s.profileId,
      chunks: s.chunks,
      bytes: s.bytes,
      lastTs: s.lastTs
    }));
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

    log("[PulseWorldChunker v20] PulseBandSession started", {
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
      warn("[PulseWorldChunker v20] registerBackendOrgan called with invalid args", {
        name,
        hasChunk: typeof chunk === "function"
      });
      return;
    }

    backendOrgans.set(name, { chunk, prewarm });
    log("[PulseWorldChunker v20] Registered backend organ for chunking", { name });
  }

  // ------------------------------------------------------------------------
  // Prewarm — universal warmup for chunker + registered organs
  // ------------------------------------------------------------------------
  function prewarm() {
    log("[PulseWorldChunker v20] Prewarm start", {
      organs: backendOrgans.size
    });

    // Canonical backend profiles
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

    // World-aware profiles
    prewarmProfile("world-social", {
      backendKind: "world-social",
      worldBand: "world",
      presenceTag: "world-social",
      band: "dual",
      chunkProfile: "world-social"
    });

    prewarmProfile("world-identity", {
      backendKind: "world-identity",
      worldBand: "world",
      presenceTag: "world-identity",
      band: "dual",
      chunkProfile: "world-identity"
    });

    prewarmProfile("world-earn", {
      backendKind: "world-earn",
      worldBand: "world",
      presenceTag: "world-earn",
      band: "dual",
      chunkProfile: "world-earn"
    });

    for (const [name, organ] of backendOrgans.entries()) {
      if (typeof organ.prewarm === "function") {
        try {
          organ.prewarm();
          log("[PulseWorldChunker v20] Prewarmed organ", { name });
        } catch (e) {
          warn("[PulseWorldChunker v20] Prewarm failed for organ", {
            name,
            error: e?.message
          });
        }
      }
    }

    log("[PulseWorldChunker v20] Prewarm complete");
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

    log("[PulseWorldChunker v20] Chunk payload computed", {
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
        "[PulseWorldChunker v20] generateCache called without db; returning passthrough."
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
      worldSnapshot: null,
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

      log("[PulseWorldChunker v20] Route descriptor cache hit", {
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
        payloadHash: cachedResp.payloadHash,
        laneHealth: getLaneHealth(),
        profileStats: getProfileStatsSnapshot()
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
        warn("[PulseWorldChunker v20] Failed to resolve import", {
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
        warn("[PulseWorldChunker v20] Failed to resolve asset", {
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
        warn("[PulseWorldChunker v20] Failed to resolve payload", {
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

    return {
      ...response,
      laneHealth: getLaneHealth(),
      profileStats: getProfileStatsSnapshot()
    };
  }

  // ------------------------------------------------------------------------
  // World Snapshot Folding — PulseWorldSocialGraph snapshot
  // ------------------------------------------------------------------------
  async function foldWorldSnapshot(
    worldSnapshot,
    { laneId, envelopeId, userId, baseVersion }
  ) {
    const cacheKey = buildCacheKey({
      url: null,
      payload: null,
      routeDescriptor: null,
      worldSnapshot,
      baseVersion,
      sizeOnly: false,
      backendKind: "world-social",
      worldBand: "world",
      chunkProfile: "world-social"
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
        presenceTag: cachedResp.presence?.presenceTag || "world-social",
        worldBand: cachedResp.presence?.worldBand || "world",
        bandKind: "backend_chunk_world",
        ok: true
      });

      log("[PulseWorldChunker v20] World snapshot cache hit", {
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
        payloadHash: cachedResp.payloadHash,
        laneHealth: getLaneHealth(),
        profileStats: getProfileStatsSnapshot()
      };
    }

    const { kind, buffer } = normalizeBackendPayload(worldSnapshot);
    const metaChunk = chunkPayload({
      userId,
      payload: buffer,
      baseVersion: baseVersion || "v1",
      presenceTag: "world-social",
      band: "dual",
      backendKind: "world-social",
      worldBand: "world",
      chunkProfile: "world-social"
    });

    const presence = buildPresenceEnvelope({
      laneId,
      envelopeId,
      band: "dual",
      wave: "coherent",
      dualBand: true,
      presenceTag: "world-social",
      worldBand: "world",
      bandKind: "backend_chunk_world",
      ok: true
    });

    const lore = generateLoreHeader({
      meta: MetaForLore,
      payloadType: kind,
      baseVersion,
      presenceTag: "world-social",
      band: "dual",
      backendKind: "world-social",
      worldBand: "world",
      chunkProfile: "world-social"
    });

    const dna = {
      __lore: lore,
      __chunk: worldSnapshot
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

    return {
      ...response,
      laneHealth: getLaneHealth(),
      profileStats: getProfileStatsSnapshot()
    };
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
    worldSnapshot,
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

      if (worldSnapshot && isWorldSnapshot(worldSnapshot)) {
        return await foldWorldSnapshot(worldSnapshot, {
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
        worldSnapshot: null,
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

        log("[PulseWorldChunker v20] Payload cache hit", {
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
          payloadHash: cachedResp.payloadHash,
          laneHealth: getLaneHealth(),
          profileStats: getProfileStatsSnapshot()
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

      return {
        ...response,
        laneHealth: getLaneHealth(),
        profileStats: getProfileStatsSnapshot()
      };
    } catch (e) {
      error("[PulseWorldChunker v20] chunkRoute fatal error", {
        url,
        error: e?.message
      });

      return {
        ok: false,
        data: null,
        kind: "error",
        presence: buildPresenceEnvelope({
          laneId,
          envelopeId,
          band: "dual",
          wave: "degraded",
          dualBand: true,
          presenceTag: "error",
          worldBand,
          bandKind: "backend_chunk_route",
          ok: false
        }),
        sessionId: null,
        payloadBytes: 0,
        payloadHash: "h0",
        laneHealth: getLaneHealth(),
        profileStats: getProfileStatsSnapshot()
      };
    }
  }

  // ========================================================================
  // PUBLIC API
  // ========================================================================
  return {
    meta: MetaForLore,

    // sessions
    startPulseBandSession,

    // registration
    registerBackendOrgan,

    // prewarm
    prewarm,

    // core chunk route
    chunkRoute,

    // diagnostics
    getLaneHealth,
    getProfileStatsSnapshot
  };
}
