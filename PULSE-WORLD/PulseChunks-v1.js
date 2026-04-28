// ============================================================================
//  PulseChunks-v1.6-EVO+
//  FRONTEND CHUNK MEMBRANE — 2026 Transport Layer
//  Chunking • Caching • Prewarm • Zero-Latency Surface
//  Now with: LORE HEADER INJECTION (text chunks only)
// ============================================================================

console.log("[PulseChunks-v1.6-EVO+] Membrane chunker loading...");

// ============================================================================
//  LORE TRANSLATOR — Injects story based on metadata
// ============================================================================
function generateLoreHeader({ meta, context, pulseRole, route }) {
  if (!meta || !context || !pulseRole) return "";

  const evoFlags = Object.keys(meta.evo || {}).filter(k => meta.evo[k]);
  const neverRules = meta.contract?.never || [];
  const alwaysRules = meta.contract?.always || [];

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

  The ${meta.role.replace(/_/g, " ").toLowerCase()} stirs beneath the surface.
  Wrapped in the ${meta.layer}, it bridges worlds the traveler cannot see.

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

  The organism reveals only its story,
  never its mechanisms.
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
//  UNIVERSAL FRONTEND CACHE
// ============================================================================
const chunkCache = new Map();

// ============================================================================
//  UNIVERSAL CHUNK FETCHER
// ============================================================================
async function fetchChunk(url) {
  if (!url) return url;

  if (chunkCache.has(url)) return chunkCache.get(url);

  try {
    const res = await fetch(url);
    const contentType = res.headers.get("content-type") || "";

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
    console.error("[PulseChunks] Failed to fetch chunk:", url, err);
    return url;
  }
}

// ============================================================================
//  IMAGE-SPECIFIC CHUNKER
// ============================================================================
export async function getImage(url) {
  return await fetchChunk(url);
}

// ============================================================================
//  GENERIC CHUNKER ENTRY — NOW WITH LORE INJECTION
// ============================================================================
export async function PulseChunker(filePath, fileSize = 0, metaPack = null) {
  if (shouldSkipChunk(filePath, fileSize)) return null;

  console.log("[PulseChunks] Chunking allowed:", filePath);

  const chunk = await fetchChunk(filePath);

  // Only inject lore into TEXT chunks
  if (typeof chunk === "string" && metaPack) {
    const lore = generateLoreHeader(metaPack);
    return {
      chunk: lore + "\n" + chunk,
      chunked: true,
      safe: true
    };
  }

  return {
    chunk,
    chunked: true,
    safe: true
  };
}

// ============================================================================
//  PREWARM ENGINE
// ============================================================================
export function prewarm(urls = []) {
  urls.forEach((url) => {
    if (!chunkCache.has(url)) fetchChunk(url);
  });
}

// ============================================================================
//  EXPOSE TO WINDOW
// ============================================================================
window.PulseChunks = {
  getImage,
  fetchChunk,
  prewarm,
  PulseChunker
};

console.log("[PulseChunks-v1.6-EVO+] Ready — membrane chunker active.");
