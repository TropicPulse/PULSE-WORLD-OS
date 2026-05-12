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

console.log("Presence v25++");
console.log("[PulseChunks-v25++-MULTILANE-Immortal] Membrane chunker loading...");

import { safeRoute as route, fireAndForgetRoute } from "../_BACKEND/PULSE-WORLD-BRIDGE.js";
import PulseChunkNormalizer from "./PULSE-TOUCH-CHUNKSMY.js";

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
//  SAFETY FENCE — OUTLIER RULES (v27 IMMORTAL++ UPGRADE)
//  Case-insensitive, organ-aware, portal-aware, OS-aware
// ============================================================================
function shouldSkipChunk(filePath = "", fileSize = 0) {
  if (!filePath) return true;

  // Normalize for case-insensitive matching
  const fp = String(filePath).toLowerCase().trim();

  // ------------------------------------------------------------------------
  // 1. NEVER CHUNK SYSTEM / OS / INTERNAL / META FILES
  // ------------------------------------------------------------------------
  const hardBlock = [
    "firebase-admin",
    "env",
    "package",
    "pulseworldtransport",
    "pulse-world-touch",
    "pulse-touch-chunks",
    "pulse-touch-chunksmy",
    "pulseoslongtermmemory",
    "index.html",
    "service-worker",
    "sw.js",
    "manifest.json",
    "robots.txt",
    "sitemap",
    "favicon",
    "asset-manifest",
    "vite",
    "webpack",
    "rollup",
    "parcel"
  ];

  for (const key of hardBlock) {
    if (fp.includes(key)) return true;
  }

  // ------------------------------------------------------------------------
  // 2. NEVER CHUNK ANYTHING FROM CORE ORGANS / PORTALS / TOUCH / PROOF / MAP
  // ------------------------------------------------------------------------
  const organBlock = [
    "pulsechunker",
    "chunk",
    "portal",
    "touch",
    "tap",
    "proof",
    "bridge",
    "pulseproof",
    "pulsebridge",
    "pulsetouch",
    "pulsetap",
    "pulseportal",
    "pulsepresence",
    "presence",
    "brainstem",
    "organs",
    "organism",
    "organismmap",
    "pulsemap",
    "pulseos",
    "pulseworld",
    "pulseworldtransport",
    "router",
    "route",
    "index",
    "user",
    "auth",
    "login",
    "admin"
  ];

  for (const key of organBlock) {
    if (fp.includes(key)) return true;
  }

  // ------------------------------------------------------------------------
  // 3. NEVER CHUNK FILE EXTENSIONS THAT ARE NOT CHUNKABLE
  // ------------------------------------------------------------------------
  const forbiddenExt = [
    ".zip",
    ".rar",
    ".7z",
    ".exe",
    ".dll",
    ".so",
    ".dylib",
    ".pdf",
    ".doc",
    ".docx",
    ".xls",
    ".xlsx",
    ".ppt",
    ".pptx",
    ".mp4",
    ".mov",
    ".avi",
    ".mkv",
    ".mp3",
    ".wav",
    ".flac"
  ];

  for (const ext of forbiddenExt) {
    if (fp.endsWith(ext)) return true;
  }

  // ------------------------------------------------------------------------
  // 4. NEVER CHUNK DIRECTORIES THAT SHOULD NOT BE CHUNKED
  // ------------------------------------------------------------------------
  const forbiddenDirs = [
    "/pulseadmin/",
    "/private/",
    "/system/",
    "/internal/",
    "/node_modules/",
    "/vendor/",
    "/build/",
    "/dist/",
    "/server/",
    "/_backend/"
  ];

  for (const dir of forbiddenDirs) {
    if (fp.includes(dir)) return true;
  }

  // ------------------------------------------------------------------------
  // 5. SIZE CAP — NEVER CHUNK > 5MB
  // ------------------------------------------------------------------------
  if (fileSize > 1024 * 1024 * 5) return true;

  // ------------------------------------------------------------------------
  // 6. DEFAULT: ALLOW
  // ------------------------------------------------------------------------
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
// ============================================================================
//  PULSECHUNKS STORAGE v27 — IndexedDB IMMORTAL++
//  Replaces ALL localStorage-based load/persist/sync logic
// ============================================================================

const PULSECHUNKS_DB = "PulseChunksDB_v27";
const PULSECHUNKS_STORE = "chunks";

// Open or create IndexedDB
function openPulseChunksDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(PULSECHUNKS_DB, 1);

    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(PULSECHUNKS_STORE)) {
        db.createObjectStore(PULSECHUNKS_STORE, { keyPath: "url" });
      }
    };

    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

// ============================================================================
//  LOAD — Restore chunkCache + chunkFailures from IndexedDB
// ============================================================================

async function loadPulseChunksFromStorage() {
  try {
    const db = await openPulseChunksDB();
    const tx = db.transaction(PULSECHUNKS_STORE, "readonly");
    const store = tx.objectStore(PULSECHUNKS_STORE);

    const req = store.getAll();

    return new Promise((resolve) => {
      req.onsuccess = () => {
        const rows = req.result || [];

        chunkCache.clear();
        chunkFailures.clear();

        for (const row of rows) {
          if (row.entry) {
            chunkCache.set(row.url, row.entry);
          }
          if (typeof row.failures === "number") {
            chunkFailures.set(row.url, row.failures);
          }
        }

        console.log("[PulseChunks v27] Loaded from IndexedDB");
        resolve();
      };

      req.onerror = () => {
        console.warn("[PulseChunks v27] Failed to load from IndexedDB:", req.error);
        resolve();
      };
    });
  } catch (err) {
    console.warn("[PulseChunks v27] IndexedDB load error:", err);
  }
}

// ============================================================================
//  PERSIST — Save a single chunk entry + failure count
// ============================================================================

async function persistPulseChunkToStorage(url, entry, failures = 0) {
  try {
    const db = await openPulseChunksDB();
    const tx = db.transaction(PULSECHUNKS_STORE, "readwrite");
    const store = tx.objectStore(PULSECHUNKS_STORE);

    store.put({
      url,
      entry,
      failures
    });

    tx.oncomplete = () => {};
    tx.onerror = () => {
      console.warn("[PulseChunks v27] Failed to persist chunk:", url, tx.error);
    };
  } catch (err) {
    console.warn("[PulseChunks v27] IndexedDB persist error:", err);
  }
}

// ============================================================================
//  SYNC — No storage events needed (IndexedDB handles multi-tab automatically)
// ============================================================================

function wirePulseChunksStorageEvents() {
  // No-op: IndexedDB does not use storage events
  console.log("[PulseChunks v27] Local Storage events disabled (IndexedDB Used)");
}

// ============================================================================
//  INITIAL LOAD — Replaces old localStorage pointer logic
// ============================================================================

(async function initPulseChunksStorage() {
  await loadPulseChunksFromStorage();
})();

// ============================================================================
//  FAILURE + DEGRADATION MANAGEMENT — v27 IMMORTAL++
// ============================================================================

async function markChunkFailure(url, err) {
  globalFailures++;
  const prev = chunkFailures.get(url) || 0;
  const next = prev + 1;
  chunkFailures.set(url, next);

  console.warn("[PulseChunks] Chunk failure:", { url, count: next, err });

  if (next >= MAX_FAILURES_PER_URL || globalFailures >= MAX_GLOBAL_FAILURES) {
    if (!chunksDegraded) {
      chunksDegraded = true;
      console.warn("[PulseChunks] Entering DEGRADED mode — falling back to regular loading.");
    }
  }

  const entry = chunkCache.get(url) || null;
  await persistPulseChunkToStorage(url, entry, next);
}

async function resetChunksState() {
  chunksDegraded = false;
  globalFailures = 0;
  chunkFailures.clear();
  console.log("[PulseChunks] Chunks state reset — re-enabling advantages.");

  // Persist reset state for all known chunks
  for (const [url, entry] of chunkCache.entries()) {
    await persistPulseChunkToStorage(url, entry, 0);
  }
}

function isChunksDegraded() {
  return chunksDegraded === true;
}

// ============================================================================
//  PRESENCE / BAND ENVELOPE HELPERS — v25++ IMMORTAL FRONT (unchanged)
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
//  32-LANE CNS ROUTER — HYBRID: GLOBAL CACHE + PER-LANE CNS/STATS (unchanged)
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
//  SNAPSHOT PERSIST — v27 compatibility shim for legacy callers
//  (used by fetchChunk(), markChunkFailure(), resetChunksState(), etc.)
// ============================================================================

function persistPulseChunksToStorage() {
  // Fire-and-forget async snapshot; callers expect sync semantics
  (async () => {
    try {
      const db = await openPulseChunksDB();
      const tx = db.transaction(PULSECHUNKS_STORE, "readwrite");
      const store = tx.objectStore(PULSECHUNKS_STORE);

      // Optional: clear old entries to avoid stale URLs
      const clearReq = store.clear();

      await new Promise((resolve, reject) => {
        clearReq.onsuccess = resolve;
        clearReq.onerror = () => reject(clearReq.error);
      });

      // Re‑persist current cache + failures
      for (const [url, entry] of chunkCache.entries()) {
        const failures = chunkFailures.get(url) || 0;
        store.put({ url, entry, failures });
      }

      tx.oncomplete = () => {
        // snapshot done
      };
      tx.onerror = () => {
        console.warn("[PulseChunks v27] Snapshot persist failed:", tx.error);
      };
    } catch (err) {
      console.warn("[PulseChunks v27] Snapshot persist error:", err);
    }
  })();
}
// ============================================================================
//  CORE CHUNK FETCHER — v27 IMMORTAL++ MULTILANE, CACHE + PRESENCE + IDB
// ============================================================================

async function fetchChunk(url) {
  // -------------------------------
  // 1. VISIBILITY LOGGING (best-effort)
  // -------------------------------
  try {
    fireAndForgetRoute("proxy.dnaVisibility", {
      url,
      timestamp: Date.now(),
      degraded: chunksDegraded,
      presence: "frontend-dna-request",
      membrane: "PulseChunks-v27-IMMORTAL"
    });
  } catch (err) {
    console.warn("[PulseDNA] Network visibility logging failed:", err);
  }

  // -------------------------------
  // 2. SKIP LOGIC
  // -------------------------------
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

  // -------------------------------
  // 3. GLOBAL DEGRADATION MODE
  // -------------------------------
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

  // -------------------------------
  // 4. CACHE FIRST (TTL-AWARE)
  // -------------------------------
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
  }

  // expired → remove + async snapshot
  if (cachedEntry && isExpired(cachedEntry)) {
    chunkCache.delete(url);
    persistPulseChunksToStorage(); // async, non-blocking
  }

  // -------------------------------
  // 5. MULTILANE CNS ROUTING
  // -------------------------------
  const laneIndex = pickLaneIndex(url);
  const lane = lanes[laneIndex];

  try {
    const routed = await lane.fetchViaCNS(url);

    const ok = routed && routed.ok !== false;
    if (!ok) {
      throw new Error(routed?.error || `Chunk route failed for ${url}`);
    }

    // -------------------------------
    // 6. DNA EXTRACTION
    // -------------------------------
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

    const entry = {
      value: dna,
      ts: Date.now(),
      kind,
      presence: envelope
    };

    // -------------------------------
    // 7. UPDATE MEMORY + IDB
    // -------------------------------
    chunkCache.set(url, entry);

    // async, non-blocking
    persistPulseChunkToStorage(url, entry, chunkFailures.get(url) || 0);

    // async snapshot (legacy compatibility)
    persistPulseChunksToStorage();

    return {
      ok: true,
      value: dna,
      chunk: dna,
      envelope
    };
  } catch (err) {
    // -------------------------------
    // 8. FAILURE HANDLING
    // -------------------------------
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
// ============================================================================
//  IMAGE-SPECIFIC CHUNKER — NORMALIZER-ALIGNED (v27 IMMORTAL)
// ============================================================================
export async function getImage(url) {
  const { value, ok, error, envelope } = await fetchChunk(url);

  if (!ok) {
    console.warn("[PulseChunks] getImage fallback:", { url, error, envelope });
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
    console.warn("[PulseChunks] getImage unknown format, fallback:", { url, value });
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

  return (
    PulseChunkNormalizer.normalizeImage(binary) ||
    PulseChunkNormalizer.normalizeChunkValue(binary, "image") ||
    null
  );
}


// ============================================================================
//  LORE ATTACHMENT — USED BY DNA MODE (FRONTEND-SIDE)
// ============================================================================
function attachLore(chunk, metaPack) {
  const lore = generateLoreHeader(metaPack);

  if (typeof chunk === "string") {
    if (chunk.startsWith(lore)) return chunk;
    return lore + "\n" + chunk;
  }

  if (chunk && typeof chunk === "object" && chunk.__lore) {
    return chunk;
  }

  return { __lore: lore, __chunk: chunk };
}


// ============================================================================
//  PAGE RECONSTRUCTION HELPERS — MEMORY MESH ALIGNMENT
// ============================================================================
export function reconstructChunk(dnaOrValue) {
  const dnaUnwrapped = unwrapImmortalDNA(dnaOrValue);
  return PulseChunkNormalizer.unwrap(dnaUnwrapped);
}

export function reconstructRouteDescriptor(dnaOrValue) {
  const core = reconstructChunk(dnaOrValue);
  if (!core || typeof core !== "object") return core;

  return {
    route: core.route || null,
    imports: core.imports || [],
    assets: core.assets || [],
    payloads: core.payloads || []
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
  return dna ? reconstructChunk(dna) : null;
}

export function reconstructCachedRouteDescriptor(url) {
  const dna = getCachedDNA(url);
  return dna ? reconstructRouteDescriptor(dna) : null;
}


// ============================================================================
//  GENERIC CHUNKER ENTRY — WITH UNIVERSAL LORE INJECTION (DNA MODE)
// ============================================================================
export async function PulseChunker(filePath, fileSize = 0, metaPack = null) {
  if (shouldSkipChunk(filePath, fileSize)) return null;

  console.log("[PulseChunks] DNA allowed:", filePath);

  const { value: dna, envelope, ok } = await fetchChunk(filePath);

  if (!ok || chunksDegraded) {
    return {
      chunk: dna,
      normalized: null,
      lore: null,
      safe: ok,
      presence: envelope
    };
  }

  const dnaCore = unwrapImmortalDNA(dna);
  const normalized = PulseChunkNormalizer.normalizeChunkValue(dnaCore);
  const lore = metaPack ? generateLoreHeader(metaPack) : null;

  return {
    chunk: normalized,
    lore,
    safe: true,
    presence: envelope
  };
}

// ============================================================================
//  PREWARM ENGINE — NON-BLOCKING, ROUTED, TTL-AWARE + PERSISTENT (v27 IMMORTAL++)
// ============================================================================
export function prewarm(urls = [], metaPack = null) {
  urls.forEach((url) => {
    if (!url) return;

    const entry = chunkCache.get(url);

    // Already cached and fresh
    if (entry && !isExpired(entry) && !chunksDegraded) {
      return;
    }

    // Fetch + persist + normalize + lore
    fetchChunk(url).then(async ({ value: dna, ok, envelope }) => {
      if (!ok) return;

      // unwrap
      const dnaCore = unwrapImmortalDNA(dna);

      // normalize
      const normalized = PulseChunkNormalizer.normalizeChunkValue(dnaCore);

      // lore AFTER normalization (attach into the value itself)
      const withLore = metaPack ? attachLore(normalized, metaPack) : normalized;

      const kind =
        typeof normalized === "string" ? "text-or-url" : "object";

      const entry = {
        value: withLore,
        ts: Date.now(),
        kind,
        presence: envelope
      };

      // store in cache
      chunkCache.set(url, entry);

      // persist to IndexedDB + snapshot
      persistPulseChunkToStorage(url, entry, chunkFailures.get(url) || 0);
      persistPulseChunksToStorage();

      // Touch/Portal future hook
      if (typeof window !== "undefined" && global.PulseTouchWarmup) {
        try {
          global.PulseTouchWarmup.onPrewarm(url, withLore, metaPack);
        } catch {}
      }

      if (typeof window !== "undefined" && global.PulsePortalWarmup) {
        try {
          global.PulsePortalWarmup.onPrewarm(url, withLore, metaPack);
        } catch {}
      }
    });
  });
}


// ============================================================================
//  PULSEBAND INTEGRATION — v27 IMMORTAL++
// ============================================================================
function handlePulseBandPacket(packet) {
  if (!packet || !packet.type) return;

  switch (packet.type) {
    case "chunk-manifest":
    case "chunk-prewarm":
      if (Array.isArray(packet.urls) && !chunksDegraded) {
        prewarm(packet.urls, packet.metaPack || null);
      }
      break;

    case "chunk-bundle":
      if (packet.url && packet.data && !chunksDegraded) {
        const baseValue = packet.data;
        const kind =
          typeof baseValue === "string" ? "text-or-url" : "object";

        const envelope = buildChunkPresenceEnvelope({
          url: packet.url,
          fromCache: false,
          degraded: false,
          kind,
          laneIndex: packet.laneIndex
        });

        const valueWithLore = packet.metaPack
          ? attachLore(baseValue, packet.metaPack)
          : baseValue;

        const entry = {
          value: valueWithLore,
          ts: Date.now(),
          kind,
          presence: envelope
        };

        chunkCache.set(packet.url, entry);
        persistPulseChunkToStorage(packet.url, entry, chunkFailures.get(packet.url) || 0);
        persistPulseChunksToStorage();
      }
      break;

    case "chunk-packet":
      if (packet.url && packet.chunk && !chunksDegraded) {
        const baseValue = packet.chunk;
        const kind =
          typeof baseValue === "string" ? "text-or-url" : "object";

        const envelope = buildChunkPresenceEnvelope({
          url: packet.url,
          fromCache: false,
          degraded: false,
          kind,
          laneIndex: packet.laneIndex
        });

        const valueWithLore = packet.metaPack
          ? attachLore(baseValue, packet.metaPack)
          : baseValue;

        const entry = {
          value: valueWithLore,
          ts: Date.now(),
          kind,
          presence: envelope
        };

        chunkCache.set(packet.url, entry);
        persistPulseChunkToStorage(packet.url, entry, chunkFailures.get(packet.url) || 0);
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

  if (typeof window !== "undefined" && global.PulseChunks) {
    if (global.PulseChunks.cache) {
      global.PulseChunks.cache = {};
    }
  }

  console.log("[PulseChunks] All chunks cleared, state reset.");
  persistPulseChunksToStorage();
}

// ============================================================================
//  UNIVERSAL FRONTEND AUTO-LOADER — v27 IMMORTAL++
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
          { url, error, envelope }
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

            if (global.PulseChunks) {
              global.PulseChunks.cache = global.PulseChunks.cache || {};
              global.PulseChunks.cache[url] = binary;
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

      if (global.PulseChunks) {
        global.PulseChunks.cache = global.PulseChunks.cache || {};
        global.PulseChunks.cache[url] = binary;
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

            if (global.PulseChunks) {
              global.PulseChunks.cache = global.PulseChunks.cache || {};
              global.PulseChunks.cache[url] = binary;
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
          { url, fallbackErr }
        );
      }
    }
  }

  console.log(
    `[PulseChunks] Universal preload complete — ${urls.size} assets seen + warmed.`
  );
}

// ============================================================================
//  EXPOSE TO WINDOW — WITH STATE + CONTROLS + LANE STATS (v27 IMMORTAL++)
// ============================================================================
if (typeof window !== "undefined") {
  global.PulseChunks = {
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

export default typeof window !== "undefined" ? global.PulseChunks : undefined;

// Wire DOM + PulseBand + storage (IDB) events
if (typeof window !== "undefined" && typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    autoLoadOfflineImages();
  });
}

if (typeof window !== "undefined") {
  if (global.PulseBand && typeof global.PulseBand.on === "function") {
    global.PulseBand.on("chunk", handlePulseBandPacket);
  }
}

// v27: this is now an IndexedDB-backed no-op hook (logging only)
wirePulseChunksStorageEvents();

console.log(
  "[PulseChunks-v27-IMMORTAL++] Ready — 32-lane membrane active, v27 DNA-aware cache, TTL-bounded memory, IndexedDB-backed persistence, reconstruction helpers online."
);

try {
  // ⭐ MIGRATE PulseBand + PulseChunks INTO LOCALSTORAGE
  function persist(name, value) {
    try {
      localStorage.setItem(name + "_v25", JSON.stringify(value));
    } catch {}
  }

  function load(name) {
    try {
      const raw = localStorage.getItem(name + "_v25");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  function migrate(name, sourceA, sourceB) {
    let val = sourceA[name] || sourceB[name] || load(name) || {};
    persist(name, val);
    sourceA[name] = val;
    sourceB[name] = val;
    return val;
  }

  if (typeof global !== "undefined") {
    global.PulseBand = migrate("PulseBand", window, global);
    global.PulseChunks = migrate("PulseChunks", window, global);
  }

  if (typeof globalThis !== "undefined") {
    global.PulseBand = migrate("PulseBand", window, globalThis);
    global.PulseChunks = migrate("PulseChunks", window, globalThis);
  }

} catch {}


global.PulseChunks.signal = function (evt) {
  try {
    // ⭐ ALWAYS WRITE TO LOCALSTORAGE FIRST
    localStorage.setItem(
      "PulseChunks_v25",
      JSON.stringify(global.PulseChunks)
    );

    // ⭐ ALWAYS HYDRATE FROM LOCALSTORAGE (SELF-HEAL)
    const raw = localStorage.getItem("PulseChunks_v25");
    if (raw) Object.assign(global.PulseChunks, JSON.parse(raw));

    // ⭐ TOUCH BOOTSTRAP
    if (evt.type === "touch_bootstrap") {
      this.prewarm?.();
      this.ready = true;

      // ⭐ SEND TO DETECTOR (NOT TOUCH DIRECTLY)
      global.PulseDetector?.onChunksReady?.({
        type: "chunks_ready",
        page: evt.page,
        prefix: evt.prefix,
        chunks: global.PulseChunks
      });

      return;
    }

    // ⭐ TOUCH PREWARM
    if (evt.type === "touch_prewarm") {
      this.deepwarm?.(evt);

      global.PulseDetector?.onChunksReady?.({
        type: "chunks_prewarm_ready",
        page: evt.page,
        prefix: evt.prefix,
        chunks: global.PulseChunks
      });

      return;
    }

  } catch (err) {
    console.error("[PulseChunks] signal handler failed →", err);
  }
};
