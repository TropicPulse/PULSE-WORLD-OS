// ============================================================================
//  PulseAIMemoryAdapter.js — v20‑IMMORTAL‑AI‑MEMORY‑ADAPTER
//  “AI NEVER RE-EMBEDS. NEVER RE-TOKENIZES. NEVER RE-THINKS TWICE.”
// ============================================================================

import { OrganismIdentity } from "../PULSE-X/PulseWorldOrganismMap-v21.js";

const Identity = OrganismIdentity(import.meta.url);

// ============================================================================
//  META BLOCK — v20 IMMORTAL (from genome)
// ============================================================================
export const PulseAIMemoryAdapterMeta = Identity.OrganMeta;

// ============================================================================
//  SURFACE / ORGANISM LAYER EXPORTS — v20 IMMORTAL
// ============================================================================
export const pulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;

export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// ============================================================================
//  FACTORY — v20 IMMORTAL
// ============================================================================
import { createPulseBinaryOverlay } from "./PulseBinaryCoreOverlay-v20.js";

// deterministic epoch for adapter events
let AIMEM_EPOCH = 0;
function nextAIEpoch() {
  AIMEM_EPOCH += 1;
  return AIMEM_EPOCH;
}

export function createPulseAIMemoryAdapter({
  overlay = createPulseBinaryOverlay(),
  dnaTag = "default-dna",
  version = "20.0-IMMORTAL-AI-MEMORY",
  log = console.log
} = {}) {

  function wrap(routeId, payload, dataType) {
    const epoch = nextAIEpoch();

    const meta = {
      dataType,
      dnaTag,
      version,
      epoch,
      metaBlock: PulseAIMemoryAdapterMeta,
      band: dataType.includes("embedding") ? "binary" : "symbolic"
    };

    try {
      overlay.touch?.(routeId, epoch, meta);
    } catch {}

    return overlay.canonicalize(routeId, payload, {
      dataType,
      band: meta.band
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
      log("[PulseAIMemoryAdapter-v20] HOT_PROMOTE", { routeId, key });
    } catch {}
  }

  return {
    PulseAIMemoryAdapterMeta,
    dnaTag,
    version,

    registerPrompt,
    registerEmbedding,
    registerResponse,
    registerContext,

    promoteHot,

    // genome-driven meta exports
    AI_EXPERIENCE_META,
    EXPORT_META,
    pulseRole,
    surfaceMeta,
    pulseLoreContext
  };
}
