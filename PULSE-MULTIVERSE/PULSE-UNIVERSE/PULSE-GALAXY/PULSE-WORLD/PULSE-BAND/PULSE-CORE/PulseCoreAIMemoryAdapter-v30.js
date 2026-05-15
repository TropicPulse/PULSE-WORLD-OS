// ============================================================================
//  PulseAIMemoryAdapter.js — v30‑IMMORTAL‑AI‑MEMORY‑ADAPTER
//  “AI NEVER RE-EMBEDS. NEVER RE-TOKENIZES. NEVER RE-THINKS TWICE.”
//  PURE BINARY. ZERO META MAP. ZERO SYMBOLIC BANDS.
// ============================================================================

import { createPulseBinaryOverlay } from "./PulseCoreBinaryOverlay-v30.js";

// ============================================================================
//  FACTORY — v30 IMMORTAL (binary‑only, map‑stripped)
// ============================================================================
export function createPulseAIMemoryAdapter({
  overlay = createPulseBinaryOverlay(),
  dnaTag = "default-dna",
  version = "30.0-IMMORTAL-AI-MEMORY",
  log = console.log
} = {}) {
  // core binary wrapper — no meta map, no band mapping, no epoch export
  function wrap(routeId, payload, dataType) {
    // all data is treated as binary‑grade; overlay decides encoding
    return overlay.canonicalize(routeId, payload, {
      dataType,
      band: "binary"
    });
  }

  function registerPrompt(routeId, prompt) {
    return wrap(routeId, prompt, "ai-prompt");
  }

  function registerEmbedding(routeId, embedding) {
    return wrap(routeId, embedding, "ai-embedding");
  }

  function registerResponse(routeId, response) {
    return wrap(routeId, response, "ai-response");
  }

  function registerContext(routeId, contextObj) {
    return wrap(routeId, contextObj, "ai-context");
  }

  function promoteHot(routeId, key) {
    try {
      overlay.markHot?.(routeId, key);
      log("[PulseAIMemoryAdapter-v30] HOT_PROMOTE", { routeId, key });
    } catch {}
  }

  return Object.freeze({
    kind: "PulseAIMemoryAdapter",
    version,
    dnaTag,

    registerPrompt,
    registerEmbedding,
    registerResponse,
    registerContext,

    promoteHot
  });
}
