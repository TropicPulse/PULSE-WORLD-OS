// ============================================================================
//  PulseChunks-v25++-MULTILANE-Immortal
//  FRONTEND CHUNK MEMBRANE — 2026 Transport Layer (UPGRADED)
//  Chunking • Caching • Prewarm • Zero-Latency Surface
//  Lore injection • PulseBand integration • Sectional fallback
//  + Universal de-chunking via PulseChunkNormalizer
//  + 32-LANE HYBRID CNS ROUTER (binary-aligned, hash-routed)
//  + v25++ Immortal DNA-aware cache + reconstruction + localStorage mesh
//  + 4-surface memory: localStorage + window + globalThis + global
// ============================================================================

/*
AI_EXPERIENCE_META = {
  identity: "PulsePresence",
  version: "v25++-Immortal-MEMBRANE",
  layer: "frontend",
  role: "presence_loader",
  lineage: "PulseOS-v25++",

  evo: {
    binaryAware: true,
    dualBand: true,
    chunkAligned: true,
    presenceAware: true,
    safeRouteFree: true,
    cnsFallback: true,
    normalizerAligned: true,
    immortalChunkerAligned: true,
    cacheTTLBounded: true,

    ttlAware: true,
    laneAware: true,
    dnaVisibilityAware: true,
    degradedModeAware: true,
    meshMemoryAligned: true,
    localStorageMesh: true,
    crossTabSynced: true,
    prewarmPersistent: true
  },

  contract: {
    always: [
      "CNS",
      "PulseChunks",
      "PulseBand",
      "PulsePresenceNormalizer",
      "PulseChunker-v25++-Immortal"
    ],
    never: [
      "safeRoute",
      "fetchViaCNS",
      "legacyPresence",
      "legacyOfflineLoader",
      "legacyChunker",
      "v1.7Fallback"
    ]
  }
}
*/

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

console.log("Presence v25++");
console.log("[PulseChunks-v25++-MULTILANE-Immortal] Membrane chunker loading...");

import { safeRoute as route, fireAndForgetRoute } from "../_BACKEND/PULSE-WORLD-BRIDGE.js";
import PulseChunkNormalizer from "./PulseTouchChunksNormalizer-v25.js";

// ============================================================================
//  LORE TRANSLATOR — Evolvable, deterministic, metadata-driven
// ============================================================================
function stableIndexFromString(str, max) {
  let sum = 0;
  for (let i = 0; i < str.length; i++) sum += str.charCodeAt(i);
  return max > 0 ? sum % max : 0;
}

function generateLoreHeader({ meta, context, pulseRole, route }) {
  if (!meta || !context || !pulseRole) return "";

  const evoFlags = Object.keys(meta.evo || {}).filter((k) => meta.evo[k]);
  const neverRules = meta.contract?.never || [];
  const alwaysRules = meta.contract?.always || [];

  const openings = [
    `The ${meta.role.replace(/_/g, " ").toLowerCase()} stirs beneath the surface.`,
    `A quiet hum rises from the ${meta.layer.toLowerCase()} artery.`,
    `The organ awakens, shaping the unseen pathways.`,
    `A pulse of logic ripples through the ${meta.layer.toLowerCase()} membrane.`,
    `The ${meta.identity} shifts, aligning with the organism’s intent.`
  ];

  const middles = [
    `Wrapped in the ${meta.layer}, it bridges worlds the traveler cannot see.`,
    `Its presence binds symbolic and structural layers into coherence.`,
    `It listens to the organism’s pressure and adjusts its flow.`,
    `It maintains the ancient contract without hesitation.`,
    `Its architecture remains sealed, but its story leaks through.`
  ];

  const closings = [
    `The organism reveals only its story, never its mechanisms.`,
    `Only the narrative escapes; the architecture stays hidden.`,
    `Its lore evolves, but its structure remains immutable.`,
    `The system speaks in myth, not in code.`,
    `Its voice shifts with each route, yet stays deterministic.`
  ];

  const open = openings[stableIndexFromString(meta.identity || "", openings.length)];
  const mid = middles[stableIndexFromString(context.lineage || "", middles.length)];
  const close = closings[stableIndexFromString(pulseRole.identity || "", closings.length)];

  return `
/*
  ────────────────────────────────────────────────────────────────
  LORE FRAGMENT — ROUTE: ${route}
  ORGAN: ${meta.identity}
  LAYER: ${meta.layer}
  ROLE: ${meta.role}
  VERSION: ${meta.version}
  LINEAGE: ${context.lineage}
  ────────────────────────────────────────────────────────────────

  ${open}
  ${mid}

  Evolution Traits:
    • ${evoFlags.join("\n    • ")}

  Boundaries:
    ✘ NEVER:
      ${neverRules.map((r) => "• " + r).join("\n      ")}

    ✔ ALWAYS:
      ${alwaysRules.map((r) => "• " + r).join("\n      ")}

  PulseRole Archetype — ${pulseRole.identity}
    Type: ${pulseRole.type}
    Subsystem: ${pulseRole.subsystem}
    Layer: ${pulseRole.layer}
    Version: ${pulseRole.version}

  Purpose:
    ${pulseRole.contract?.purpose ?? "Membrane between CNS and presence layer."}

  Tone: ${pulseRole.voice?.tone ?? "neutral"}
  Style: ${pulseRole.voice?.style ?? "technical-mythic"}

  ${close}
  ────────────────────────────────────────────────────────────────
*/
`;
}

// ============================================================================
//  SAFETY FENCE — OUTLIER RULES
// ============================================================================
function shouldSkipChunk(filePath = "", fileSize = 0) {
  if (!filePath) return true;

  if (filePath.includes("firebase-admin")) return true;
  if (filePath.includes("env")) return true;
  if (filePath.includes("package")) return true;
  if (filePath.includes("PulseWorldTransport")) return true;
  if (filePath.includes("PulseOSLongTermMemory")) return true;
  if (filePath.includes("index.html")) return true;

  if (
    filePath.includes("PulseChunker") ||
    filePath.includes("Chunk") ||
    filePath.includes("Portal") ||
    filePath.includes("Index") ||
    filePath.includes("User") ||
    filePath.includes("Brainstem") ||
    filePath.includes("Organs") ||
    filePath.includes("PulsePresence")
  ) {
    return true;
  }

  if (fileSize > 1024 * 1024 * 5) return true; // 5MB safety cap

  return false;
}

// ============================================================================
//  CHUNKS STATE — SECTIONAL FALLBACK (GLOBAL) + TTL CACHE + LOCALSTORAGE MESH
// ============================================================================
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
const CACHE_TTL_MS = WEEK_MS;

const chunkCache = new Map(); // url -> { value, ts, presence, kind }
const chunkFailures = new Map();
let chunksDegraded = false;
const MAX_FAILURES_PER_URL = 3;
const MAX_GLOBAL_FAILURES = 20;
let globalFailures = 0;

const PULSECHUNKS_STORAGE_KEY = "PulseChunks_v25";
const PULSECHUNKS_STORAGE_POINTER = "PulseChunks_v25_pointer";

function isExpired(entry) {
  if (!entry) return true;
  return Date.now() - entry.ts > CACHE_TTL_MS;
}

// ---------------------------------------------------------------------------
//  LOCALSTORAGE + GLOBAL MESH — LOAD / PERSIST / SYNC
// ---------------------------------------------------------------------------
function loadPulseChunksFromStorage() {
  if (typeof localStorage === "undefined") return;
  try {
    const raw = localStorage.getItem(PULSECHUNKS_STORAGE_KEY);
    if (!raw) return;

    const saved = JSON.parse(raw);
    if (!saved || typeof saved !== "object") return;

    const { cache, failures, degraded } = saved;

    if (cache && typeof cache === "object") {
      chunkCache.clear();
      for (const [url, entry] of Object.entries(cache)) {
        if (entry && entry.ts && entry.value !== undefined) {
          chunkCache.set(url, entry);
        }
      }
    }

    if (failures && typeof failures === "object") {
      chunkFailures.clear();
      for (const [url, count] of Object.entries(failures)) {
        if (typeof count === "number") {
          chunkFailures.set(url, count);
        }
      }
    }

    if (typeof degraded === "boolean") {
      chunksDegraded = degraded;
    }

    console.log("[PulseChunks v25++] Restored from localStorage snapshot");
  } catch (err) {
    console.warn("[PulseChunks v25++] Failed to restore from localStorage:", err);
  }
}

function persistPulseChunksToStorage() {
  if (typeof localStorage === "undefined") return;
  try {
    const cacheObj = {};
    for (const [url, entry] of chunkCache.entries()) {
      cacheObj[url] = entry;
    }

    const failuresObj = {};
    for (const [url, count] of chunkFailures.entries()) {
      failuresObj[url] = count;
    }

    const snapshot = {
      cache: cacheObj,
      failures: failuresObj,
      degraded: chunksDegraded,
      ts: Date.now(),
      version: "v25++-Immortal"
    };

    localStorage.setItem(PULSECHUNKS_STORAGE_KEY, JSON.stringify(snapshot));
  } catch (err) {
    console.warn("[PulseChunks v25++] Failed to persist to localStorage:", err);
  }
}

function wirePulseChunksStorageEvents() {
  if (typeof window === "undefined" || typeof window.addEventListener !== "function") return;

  window.addEventListener("storage", (e) => {
    if (e.key !== PULSECHUNKS_STORAGE_KEY || !e.newValue) return;
    try {
      const saved = JSON.parse(e.newValue);
      if (!saved || typeof saved !== "object") return;

      const { cache, failures, degraded } = saved;

      if (cache && typeof cache === "object") {
        chunkCache.clear();
        for (const [url, entry] of Object.entries(cache)) {
          if (entry && entry.ts && entry.value !== undefined) {
            chunkCache.set(url, entry);
          }
        }
      }

      if (failures && typeof failures === "object") {
        chunkFailures.clear();
        for (const [url, count] of Object.entries(failures)) {
          if (typeof count === "number") {
            chunkFailures.set(url, count);
          }
        }
      }

      if (typeof degraded === "boolean") {
        chunksDegraded = degraded;
      }

      console.log("[PulseChunks v25++] Synced from storage event");
    } catch (err) {
      console.warn("[PulseChunks v25++] Failed to sync from storage event:", err);
    }
  });
}

// Initial load + pointer
try {
  loadPulseChunksFromStorage();
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(PULSECHUNKS_STORAGE_POINTER, "__active__");
  }
} catch {}

// ============================================================================
//  FAILURE + DEGRADATION MANAGEMENT
// ============================================================================
function markChunkFailure(url, err) {
  globalFailures++;
  const prev = chunkFailures.get(url) || 0;
  const next = prev + 1;
  chunkFailures.set(url, next);

  console.warn("[PulseChunks] Chunk failure:", { url, count: next, err });

  if (next >= MAX_FAILURES_PER_URL || globalFailures >= MAX_GLOBAL_FAILURES) {
    if (!chunksDegraded) {
      chunksDegraded = true;
      console.warn(
        "[PulseChunks] Entering DEGRADED mode — falling back to regular loading."
      );
    }
  }

  persistPulseChunksToStorage();
}

function resetChunksState() {
  chunksDegraded = false;
  globalFailures = 0;
  chunkFailures.clear();
  console.log("[PulseChunks] Chunks state reset — re-enabling advantages.");
  persistPulseChunksToStorage();
}

function isChunksDegraded() {
  return chunksDegraded === true;
}

// ============================================================================
//  PRESENCE / BAND ENVELOPE HELPERS — v25++ IMMORTAL FRONT
// ============================================================================
function buildChunkPresenceEnvelope({ url, fromCache, degraded, kind, laneIndex }) {
  const presence = degraded
    ? "degraded-fallback"
    : fromCache
    ? "cache-hit"
    : "fresh";

  const wave = degraded ? "distorted" : fromCache ? "stable" : "coherent";

  const band = "symbolic";
  const dualBand = false;

  return {
    url,
    presence,
    wave,
    band,
    dualBand,
    kind,
    laneIndex: typeof laneIndex === "number" ? laneIndex : null
  };
}

// ============================================================================
//  32-LANE CNS ROUTER — HYBRID: GLOBAL CACHE + PER-LANE CNS/STATS
// ============================================================================
const LANE_COUNT = 32;
const LANE_MASK = LANE_COUNT - 1;

function hashKey(key = "") {
  let h = 0;
  for (let i = 0; i < key.length; i++) {
    h = ((h << 5) - h + key.charCodeAt(i)) | 0;
  }
  return h >>> 0;
}

function pickLaneIndex(key) {
  return hashKey(key) & LANE_MASK;
}

function nowMs() {
  if (typeof performance !== "undefined" && typeof performance.now === "function") {
    return performance.now();
  }
  return Date.now();
}

function createLane(id) {
  return {
    id,
    envelopeCounter: 0,
    stats: {
      requests: 0,
      successes: 0,
      failures: 0,
      totalLatencyMs: 0,
      lastError: null
    },
    async fetchViaCNS(url) {
      const start = nowMs();
      this.stats.requests++;

      const envelopeId = `lane-${id}-${++this.envelopeCounter}`;

      const routed = await route("fetchExternalResource", {
        url,
        layer: "A1",
        reflexOrigin: "PulseChunks",
        binaryAware: true,
        dualBand: true,
        presenceAware: true,
        kind: "chunk",
        laneId: id,
        envelopeId
      });

      const latency = nowMs() - start;
      this.stats.totalLatencyMs += latency;

      const ok = routed && routed.ok !== false;
      if (ok) {
        this.stats.successes++;
      } else {
        this.stats.failures++;
        this.stats.lastError = routed?.error || `Chunk route failed for ${url}`;
      }

      return routed;
    }
  };
}

const lanes = Array.from({ length: LANE_COUNT }, (_, i) => createLane(i));

function getLaneStatsSnapshot() {
  return lanes.map((lane) => ({
    id: lane.id,
    envelopeCounter: lane.envelopeCounter,
    stats: { ...lane.stats }
  }));
}

// ============================================================================
//  DNA-AWARE VALUE NORMALIZATION (v25++ IMMORTAL BACKEND)
// ============================================================================
function unwrapImmortalDNA(value) {
  if (!value) return value;
  if (value.__chunk !== undefined) return value.__chunk;
  return value;
}

// ============================================================================
//  CORE CHUNK FETCHER — v25++ MULTILANE IMMORTAL, CACHE + PRESENCE AWARE
// ============================================================================
async function fetchChunk(url) {
  try {
    fireAndForgetRoute("proxy.dnaVisibility", {
      url,
      timestamp: Date.now(),
      degraded: chunksDegraded,
      presence: "frontend-dna-request",
      membrane: "PulseChunks-v25++-MULTILANE-Immortal"
    });
  } catch (err) {
    console.warn("[PulseDNA] Network visibility logging failed:", err);
  }

  // ⭐ SKIP LOGIC — BEFORE ANYTHING ELSE
  if (shouldSkipChunk(url)) {
    return {
      ok: false,
      value: url,
      chunk: url,
      envelope: buildChunkPresenceEnvelope({
        url,
        fromCache: false,
        degraded: false,
        kind: "skipped"
      })
    };
  }

  if (!url) {
    return {
      ok: false,
      value: url,
      chunk: url,
      envelope: buildChunkPresenceEnvelope({
        url,
        fromCache: false,
        degraded: chunksDegraded,
        kind: "none"
      })
    };
  }

  // ⭐ GLOBAL DEGRADATION — NEVER ATTEMPT NETWORK
  if (chunksDegraded) {
    return {
      ok: false,
      value: url,
      chunk: url,
      envelope: buildChunkPresenceEnvelope({
        url,
        fromCache: false,
        degraded: true,
        kind: "fallback"
      })
    };
  }

  // ⭐ CACHE FIRST — TTL AWARE
  const cachedEntry = chunkCache.get(url);
  if (cachedEntry && !isExpired(cachedEntry)) {
    const { value, kind, presence } = cachedEntry;
    return {
      ok: true,
      value,
      chunk: value,
      envelope:
        presence ||
        buildChunkPresenceEnvelope({
          url,
          fromCache: true,
          degraded: false,
          kind: kind || (typeof value === "string" ? "text-or-url" : "object")
        })
    };
  } else if (cachedEntry && isExpired(cachedEntry)) {
    chunkCache.delete(url);
    persistPulseChunksToStorage();
  }

  // ⭐ MULTILANE ROUTING
  const laneIndex = pickLaneIndex(url);
  const lane = lanes[laneIndex];

  try {
    const routed = await lane.fetchViaCNS(url);

    const ok = routed && routed.ok !== false;
    if (!ok) {
      throw new Error(routed?.error || `Chunk route failed for ${url}`);
    }

    // v25++: prefer explicit dna/chunk fields, then fall back
    const dna =
      routed.dna ??
      routed.chunk ??
      routed.data ??
      routed.result ??
      routed.value ??
      url;

    const kind =
      routed.kind ||
      (typeof dna === "string" ? "text-or-url" : "object");

    const envelope = buildChunkPresenceEnvelope({
      url,
      fromCache: false,
      degraded: false,
      kind,
      laneIndex
    });

    chunkCache.set(url, {
      value: dna,
      ts: Date.now(),
      kind,
      presence: envelope
    });

    persistPulseChunksToStorage();

    return {
      ok: true,
      value: dna,
      chunk: dna,
      envelope
    };
  } catch (err) {
    markChunkFailure(url, err);

    return {
      ok: false,
      value: url,
      chunk: url,
      error: String(err),
      envelope: buildChunkPresenceEnvelope({
        url,
        fromCache: false,
        degraded: true,
        kind: "fallback"
      })
    };
  }
}

// ============================================================================
//  IMAGE-SPECIFIC CHUNKER — NORMALIZER-ALIGNED (v25++ MULTILANE IMMORTAL)
// ============================================================================
export async function getImage(url) {
  const { value, ok, error, envelope } = await fetchChunk(url);

  if (!ok) {
    console.warn(
      "[PulseChunks] getImage fallback — using raw URL due to chunk failure:",
      {
        url,
        error,
        envelope
      }
    );
    return url;
  }

  const dnaUnwrapped = unwrapImmortalDNA(value);
  const unwrapped = PulseChunkNormalizer.unwrap(dnaUnwrapped);
  const binary = PulseChunkNormalizer.normalizeBinary(unwrapped);

  const src =
    PulseChunkNormalizer.normalizeImage(binary) ||
    PulseChunkNormalizer.normalizeChunkValue(binary, "image") ||
    null;

  if (!src) {
    console.warn(
      "[PulseChunks] getImage unknown image format, falling back to URL:",
      {
        url,
        value
      }
    );
    return url;
  }

  return src;
}

// Optional: sync-only image resolver from cache (no await, no network)
export function getImageSync(url) {
  const dna = getCachedDNA(url);
  if (!dna) return null;

  const dnaUnwrapped = unwrapImmortalDNA(dna);
  const unwrapped = PulseChunkNormalizer.unwrap(dnaUnwrapped);
  const binary = PulseChunkNormalizer.normalizeBinary(unwrapped);

  const src =
    PulseChunkNormalizer.normalizeImage(binary) ||
    PulseChunkNormalizer.normalizeChunkValue(binary, "image") ||
    null;

  return src || null;
}

// ============================================================================
//  LORE ATTACHMENT — USED BY DNA MODE (FRONTEND-SIDE)
// ============================================================================
function attachLore(chunk, metaPack) {
  const lore = generateLoreHeader(metaPack);

  // Avoid double-lore on strings
  if (typeof chunk === "string") {
    if (chunk.startsWith(lore)) return chunk;
    return lore + "\n" + chunk;
  }

  // Avoid double-lore on objects
  if (chunk && typeof chunk === "object" && chunk.__lore) {
    return chunk;
  }

  return {
    __lore: lore,
    __chunk: chunk
  };
}

// ============================================================================
//  PAGE RECONSTRUCTION HELPERS — MEMORY MESH ALIGNMENT
// ============================================================================
export function reconstructChunk(dnaOrValue) {
  const dnaUnwrapped = unwrapImmortalDNA(dnaOrValue);
  const unwrapped = PulseChunkNormalizer.unwrap(dnaUnwrapped);
  return unwrapped;
}

export function reconstructRouteDescriptor(dnaOrValue) {
  const core = reconstructChunk(dnaOrValue);
  if (!core || typeof core !== "object") return core;

  const { route, imports, assets, payloads } = core;
  return {
    route: route || null,
    imports: imports || [],
    assets: assets || [],
    payloads: payloads || []
  };
}

// ============================================================================
//  SYNC MEMORY SURFACE — NO AWAIT, NO NETWORK
// ============================================================================
export function getCachedDNA(url) {
  if (!url) return null;
  const entry = chunkCache.get(url);
  if (!entry || isExpired(entry)) return null;
  return entry.value;
}

export function reconstructCachedChunk(url) {
  const dna = getCachedDNA(url);
  if (!dna) return null;
  return reconstructChunk(dna);
}

export function reconstructCachedRouteDescriptor(url) {
  const dna = getCachedDNA(url);
  if (!dna) return null;
  return reconstructRouteDescriptor(dna);
}

// ============================================================================
//  GENERIC CHUNKER ENTRY — WITH UNIVERSAL LORE INJECTION (DNA MODE)
// ============================================================================
export async function PulseChunker(filePath, fileSize = 0, metaPack = null) {
  if (shouldSkipChunk(filePath, fileSize)) {
    return null;
  }

  console.log("[PulseChunks] DNA allowed:", filePath);

  const { value: dna, envelope, ok, error } = await fetchChunk(filePath);

  // If fetch failed or chunks are globally degraded, just surface raw DNA/url
  if (!ok || chunksDegraded || !metaPack) {
    if (!ok) {
      console.warn("[PulseChunks] PulseChunker fallback — fetch failed:", {
        filePath,
        error,
        envelope
      });
    }

    return {
      dna,
      dnaEncoded: ok && !chunksDegraded,
      safe: ok,
      presence: envelope
    };
  }

  // v25++: unwrap ONE layer, attach lore once, keep DNA sealed for frontend
  const dnaCore = unwrapImmortalDNA(dna);
  const dnaWithLore = attachLore(dnaCore, metaPack);

  return {
    dna: dnaWithLore,
    dnaEncoded: true,
    safe: true,
    presence: envelope
  };
}

// ============================================================================
//  PREWARM ENGINE — NON-BLOCKING, ROUTED, TTL-AWARE + PERSISTENT
// ============================================================================
export function prewarm(urls = []) {
  urls.forEach((url) => {
    if (!url) return;
    const entry = chunkCache.get(url);
    if ((!entry || isExpired(entry)) && !chunksDegraded) {
      fetchChunk(url).then(() => {
        // fetchChunk already persists; nothing extra needed
      });
    }
  });
}

// ============================================================================
//  PULSEBAND INTEGRATION — v25++-Evo
// ============================================================================
function handlePulseBandPacket(packet) {
  if (!packet || !packet.type) return;

  switch (packet.type) {
    case "chunk-manifest":
    case "chunk-prewarm":
      if (Array.isArray(packet.urls) && !chunksDegraded) {
        prewarm(packet.urls);
      }
      break;

    case "chunk-bundle":
      if (packet.url && packet.data && !chunksDegraded) {
        const kind =
          typeof packet.data === "string" ? "text-or-url" : "object";

        const envelope = buildChunkPresenceEnvelope({
          url: packet.url,
          fromCache: false,
          degraded: false,
          kind,
          laneIndex: packet.laneIndex
        });

        chunkCache.set(packet.url, {
          value: packet.data,
          ts: Date.now(),
          kind,
          presence: envelope
        });

        persistPulseChunksToStorage();
      }
      break;

    case "chunk-packet":
      if (packet.url && packet.chunk && !chunksDegraded) {
        const kind =
          typeof packet.chunk === "string" ? "text-or-url" : "object";

        const envelope = buildChunkPresenceEnvelope({
          url: packet.url,
          fromCache: false,
          degraded: false,
          kind,
          laneIndex: packet.laneIndex
        });

        chunkCache.set(packet.url, {
          value: packet.chunk,
          ts: Date.now(),
          kind,
          presence: envelope
        });

        persistPulseChunksToStorage();
      }
      break;

    case "chunk-invalidate":
      if (packet.url) {
        chunkCache.delete(packet.url);
        chunkFailures.delete(packet.url);
        persistPulseChunksToStorage();
      }
      break;

    default:
      console.warn("[PulseChunks] Unknown PulseBand packet:", packet);
  }
}

function dechunk(urls = []) {
  urls.forEach((url) => {
    if (!url) return;
    chunkCache.delete(url);
    chunkFailures.delete(url);
  });
  persistPulseChunksToStorage();
}

function dechunkAll() {
  chunkCache.clear();
  chunkFailures.clear();
  globalFailures = 0;
  chunksDegraded = false;

  if (typeof window !== "undefined" && window.PulseChunks) {
    if (window.PulseChunks.cache) {
      window.PulseChunks.cache = {};
    }
  }

  console.log("[PulseChunks] All chunks cleared, state reset.");
  persistPulseChunksToStorage();
}

// ============================================================================
//  UNIVERSAL FRONTEND AUTO-LOADER — v25++ IMMORTAL++
// ============================================================================
async function autoLoadOfflineImages() {
  if (typeof document === "undefined" || typeof window === "undefined") return;
  if (typeof fetchChunk !== "function") return;

  const assetSelectors = [
    "link[rel='stylesheet'][href]",
    "script[src]",
    "img[src]",
    "img.offline-img[data-offline]",
    "[data-chunk]",
    "[data-preload]",
    "[data-asset]"
  ];

  const urls = new Set();

  for (const selector of assetSelectors) {
    const nodes = document.querySelectorAll(selector);
    nodes.forEach((node) => {
      const url =
        node.getAttribute("href") ||
        node.getAttribute("src") ||
        node.getAttribute("data-offline") ||
        node.getAttribute("data-chunk") ||
        node.getAttribute("data-preload") ||
        node.getAttribute("data-asset");

      if (url) urls.add(url);
    });
  }

  for (const url of urls) {
    try {
      const { value, ok, error, envelope } = await fetchChunk(url);

      if (!ok) {
        console.warn(
          "[PulseChunks] Asset chunk failed — using CNS fallback:",
          {
            url,
            error,
            envelope
          }
        );

        if (typeof route === "function") {
          const fallback = await route("getImages", {
            url,
            layer: "A1",
            reflexOrigin: "PulseChunks",
            binaryAware: true,
            dualBand: true,
            presenceAware: true,
            kind: "asset-fallback"
          });

          if (fallback && fallback.ok && fallback.data) {
            const unwrapped = PulseChunkNormalizer.unwrap(fallback.data);
            const binary = PulseChunkNormalizer.normalizeBinary(unwrapped);

            if (window.PulseChunks) {
              window.PulseChunks.cache = window.PulseChunks.cache || {};
              window.PulseChunks.cache[url] = binary;
            }

            const img = document.querySelector(
              `img.offline-img[data-offline="${url}"]`
            );
            if (img) {
              const src =
                PulseChunkNormalizer.normalizeImage(binary) ||
                PulseChunkNormalizer.normalizeChunkValue(binary, "image") ||
                null;
              if (src) img.src = src;
            }

            continue;
          }
        }

        console.warn(
          "[PulseChunks] CNS fallback failed — leaving asset as-is:",
          url
        );
        continue;
      }

      const dnaUnwrapped = unwrapImmortalDNA(value);
      const unwrapped = PulseChunkNormalizer.unwrap(dnaUnwrapped);
      const binary = PulseChunkNormalizer.normalizeBinary(unwrapped);

      if (window.PulseChunks) {
        window.PulseChunks.cache = window.PulseChunks.cache || {};
        window.PulseChunks.cache[url] = binary;
      }

      const img = document.querySelector(
        `img.offline-img[data-offline="${url}"]`
      );
      if (img) {
        const src =
          PulseChunkNormalizer.normalizeImage(binary) ||
          PulseChunkNormalizer.normalizeChunkValue(binary, "image") ||
          null;
        if (src) img.src = src;
      }
    } catch (err) {
      console.warn("[PulseChunks] Asset load threw — using CNS fallback:", {
        url,
        err
      });

      try {
        if (typeof route === "function") {
          const fallback = await route("getImages", {
            url,
            layer: "A1",
            reflexOrigin: "PulseChunks",
            binaryAware: true,
            dualBand: true,
            presenceAware: true,
            kind: "asset-fallback"
          });

          if (fallback && fallback.ok && fallback.data) {
            const unwrapped = PulseChunkNormalizer.unwrap(fallback.data);
            const binary = PulseChunkNormalizer.normalizeBinary(unwrapped);

            if (window.PulseChunks) {
              window.PulseChunks.cache = window.PulseChunks.cache || {};
              window.PulseChunks.cache[url] = binary;
            }

            const img = document.querySelector(
              `img.offline-img[data-offline="${url}"]`
            );
            if (img) {
              const src =
                PulseChunkNormalizer.normalizeImage(binary) ||
                PulseChunkNormalizer.normalizeChunkValue(binary, "image") ||
                null;
              if (src) img.src = src;
            }

            continue;
          }
        }
      } catch (fallbackErr) {
        console.warn(
          "[PulseChunks] CNS fallback threw — leaving asset as-is:",
          {
            url,
            fallbackErr
          }
        );
      }
    }
  }

  console.log(
    `[PulseChunks] Universal preload complete — ${urls.size} assets seen + warmed.`
  );
}

// ============================================================================
//  EXPOSE TO WINDOW — WITH STATE + CONTROLS + LANE STATS (v25++ IMMORTAL)
// ============================================================================
if (typeof window !== "undefined") {
  window.PulseChunks = {
    // Core API
    getImage,
    getImageSync,
    fetchChunk,
    prewarm,
    PulseChunker,

    // Reconstruction helpers (for router / mesh memory)
    reconstructChunk,
    reconstructRouteDescriptor,

    // Sync memory surface
    getCachedDNA,
    reconstructCachedChunk,
    reconstructCachedRouteDescriptor,

    // State + degradation
    isDegraded: isChunksDegraded,
    resetState: resetChunksState,

    // Dechunking utilities
    dechunk,
    dechunkAll,

    // Full normalizer organ
    normalizer: PulseChunkNormalizer,

    // Lane system
    lanes,
    getLaneStats: getLaneStatsSnapshot,

    // Raw cache mirror (for debugging / offline surface)
    cache: {}
  };
}

export default typeof window !== "undefined" ? window.PulseChunks : undefined;

// Wire DOM + PulseBand + storage events
if (typeof window !== "undefined" && typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    autoLoadOfflineImages();
  });
}

if (typeof window !== "undefined") {
  if (window.PulseBand && typeof window.PulseBand.on === "function") {
    window.PulseBand.on("chunk", handlePulseBandPacket);
  }
}

wirePulseChunksStorageEvents();

console.log(
  "[PulseChunks-v25++-MULTILANE-Immortal] Ready — 32-lane membrane active, v25++ Immortal DNA-aware cache, TTL-bounded memory, localStorage mesh, reconstruction helpers online."
);

try {
  if (typeof global !== "undefined") {
    global.PulseBand =
      typeof window !== "undefined" ? window.PulseBand : global.PulseBand;
    global.PulseChunks =
      typeof window !== "undefined" ? window.PulseChunks : global.PulseChunks;
  }
  if (typeof globalThis !== "undefined") {
    globalThis.PulseBand =
      typeof window !== "undefined" ? window.PulseBand : globalThis.PulseBand;
    globalThis.PulseChunks =
      typeof window !== "undefined"
        ? window.PulseChunks
        : globalThis.PulseChunks;
  }
} catch {}
