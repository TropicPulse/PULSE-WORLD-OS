// ============================================================================
//  PulseChunks-v1.7-EVO-FALLBACK
//  FRONTEND CHUNK MEMBRANE — 2026 Transport Layer
//  Chunking • Caching • Prewarm • Zero-Latency Surface
//  Lore injection • PulseBand integration • Sectional fallback
// ============================================================================

console.log("[PulseChunks-v1.7-EVO-FALLBACK] Membrane chunker loading...");

// ============================================================================
//  LORE TRANSLATOR — Evolvable, deterministic, metadata-driven
// ============================================================================

// Deterministic selector (no randomness, no timers)
function stableIndexFromString(str, max) {
  let sum = 0;
  for (let i = 0; i < str.length; i++) sum += str.charCodeAt(i);
  return sum % max;
}

function generateLoreHeader({ meta, context, pulseRole, route }) {
  if (!meta || !context || !pulseRole) return "";

  const evoFlags = Object.keys(meta.evo || {}).filter(k => meta.evo[k]);
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

  const open = openings[stableIndexFromString(meta.identity, openings.length)];
  const mid = middles[stableIndexFromString(context.lineage, middles.length)];
  const close = closings[stableIndexFromString(pulseRole.identity, closings.length)];

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
      ${neverRules.map(r => "• " + r).join("\n      ")}

    ✔ ALWAYS:
      ${alwaysRules.map(r => "• " + r).join("\n      ")}

  PulseRole Archetype — ${pulseRole.identity}
    Type: ${pulseRole.type}
    Subsystem: ${pulseRole.subsystem}
    Layer: ${pulseRole.layer}
    Version: ${pulseRole.version}

  Purpose:
    ${pulseRole.contract.purpose}

  Tone: ${pulseRole.voice.tone}
  Style: ${pulseRole.voice.style}

  ${close}
  ────────────────────────────────────────────────────────────────
*/
`;
}

// ============================================================================
//  SAFETY FENCE — OUTLIER RULES
// ============================================================================
function shouldSkipChunk(filePath, fileSize = 0) {
  if (!filePath) return true;

  if (filePath.includes("PulseOSLongTermMemory.js")) return true;
  if (filePath.includes("index.js")) return true;
  if (filePath.includes("firebase-admin")) return true;

  if (
    !filePath.startsWith("/public") &&
    !filePath.startsWith("/frontend") &&
    !filePath.startsWith("/assets")
  ) return true;

  if (fileSize > 1024 * 1024) return true;

  return false;
}

// ============================================================================
//  CHUNKS STATE — SECTIONAL FALLBACK
//  Try every advantage; if degraded, fall back to regular mode.
// ============================================================================
const chunkCache = new Map();
const chunkFailures = new Map();
let chunksDegraded = false;
const MAX_FAILURES_PER_URL = 3;
const MAX_GLOBAL_FAILURES = 20;
let globalFailures = 0;

function markChunkFailure(url, err) {
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
}

function resetChunksState() {
  chunksDegraded = false;
  globalFailures = 0;
  chunkFailures.clear();
  console.log("[PulseChunks] Chunks state reset — re-enabling advantages.");
}

function isChunksDegraded() {
  return chunksDegraded === true;
}

// ============================================================================
//  UNIVERSAL CHUNK FETCHER — WITH FALLBACK
//  1) Try chunked path
//  2) On error → mark failure, fall back to regular URL
// ============================================================================
async function fetchChunk(url) {
  if (!url) return url;

  // If CHUNKS is degraded, fall back immediately to regular behavior.
  if (chunksDegraded) {
    return url;
  }

  if (chunkCache.has(url)) return chunkCache.get(url);

  try {
    const res = await fetch(url);
    const contentType = res.headers.get("content-type") || "";

    if (!res.ok) {
      throw new Error(`HTTP ${res.status} for ${url}`);
    }

    // IMAGE → blob URL
    if (contentType.startsWith("image/")) {
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      chunkCache.set(url, blobUrl);
      return blobUrl;
    }

    // JSON → parsed object
    if (contentType.includes("application/json")) {
      const json = await res.json();
      chunkCache.set(url, json);
      return json;
    }

    // CSS / JS / TEXT → text
    const text = await res.text();
    chunkCache.set(url, text);
    return text;

  } catch (err) {
    markChunkFailure(url, err);
    // Fallback: return original URL so the browser / caller can load it normally.
    return url;
  }
}

// ============================================================================
//  IMAGE-SPECIFIC CHUNKER — WITH FALLBACK
// ============================================================================
export async function getImage(url) {
  const result = await fetchChunk(url);
  // If degraded or failure, result will just be the original URL.
  return result;
}

// ============================================================================
//  GENERIC CHUNKER ENTRY — NOW WITH LORE + FALLBACK
// ============================================================================
export async function PulseChunker(filePath, fileSize = 0, metaPack = null) {
  if (shouldSkipChunk(filePath, fileSize)) {
    return null;
  }

  console.log("[PulseChunks] Chunking allowed:", filePath);

  const chunk = await fetchChunk(filePath);

  // If CHUNKS is degraded or fetchChunk fell back, chunk may just be the URL.
  if (typeof chunk === "string" && metaPack && !chunksDegraded) {
    const lore = generateLoreHeader(metaPack);
    return {
      chunk: lore + "\n" + chunk,
      chunked: true,
      safe: true
    };
  }

  return {
    chunk,
    chunked: !chunksDegraded,
    safe: true
  };
}

// ============================================================================
//  PREWARM ENGINE — NON-BLOCKING, WITH FALLBACK
// ============================================================================
export function prewarm(urls = []) {
  urls.forEach((url) => {
    if (!chunkCache.has(url) && !chunksDegraded) {
      fetchChunk(url);
    }
  });
}

// ============================================================================
//  PULSEBAND INTEGRATION — v12-EVO
//  Allows backend chunker to push chunk packets to the membrane.
// ============================================================================
function handlePulseBandPacket(packet) {
  if (!packet || !packet.type) return;

  switch (packet.type) {
    case "chunk-manifest":
      if (Array.isArray(packet.urls) && !chunksDegraded) {
        prewarm(packet.urls);
      }
      break;

    case "chunk-prewarm":
      if (Array.isArray(packet.urls) && !chunksDegraded) {
        prewarm(packet.urls);
      }
      break;

    case "chunk-bundle":
      if (packet.url && packet.data && !chunksDegraded) {
        chunkCache.set(packet.url, packet.data);
      }
      break;

    case "chunk-packet":
      if (packet.url && packet.chunk && !chunksDegraded) {
        chunkCache.set(packet.url, packet.chunk);
      }
      break;

    case "chunk-invalidate":
      if (packet.url) {
        chunkCache.delete(packet.url);
      }
      break;

    default:
      console.warn("[PulseChunks] Unknown PulseBand packet:", packet);
  }
}

// After chunkCache / failures / state declarations
function dechunk(urls = []) {
  urls.forEach((url) => {
    if (!url) return;
    chunkCache.delete(url);
    chunkFailures.delete(url);
  });
}

function dechunkAll() {
  chunkCache.clear();
  chunkFailures.clear();
  globalFailures = 0;
  chunksDegraded = false;
  console.log("[PulseChunks] All chunks cleared, state reset.");
}


// Attach listener if PulseBand exists
if (typeof window !== "undefined") {
  if (window.PulseBand && typeof window.PulseBand.on === "function") {
    window.PulseBand.on("chunk", handlePulseBandPacket);
  }
}

// ============================================================================
//  EXPOSE TO WINDOW — WITH STATE + CONTROLS
// ============================================================================
window.PulseChunks = {
  getImage,
  fetchChunk,
  prewarm,
  PulseChunker,
  isDegraded: isChunksDegraded,
  resetState: resetChunksState,
  dechunk,
  dechunkAll
};


console.log("[PulseChunks-v1.7-EVO-FALLBACK] Ready — membrane chunker active with sectional fallback.");
