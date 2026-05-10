// ============================================================================
//  PulseEarnMemoryAdapter.js — v20‑IMMORTAL‑EARN‑MEMORY‑ADAPTER
//  “EARN FLOWS IN. VALUE ACCUMULATES. NOTHING DRIFTS.”
// ============================================================================

import { OrganismIdentity } from "../PULSE-X/PulseWorldOrganismMap-v24.js";

const Identity = OrganismIdentity(import.meta.url);

// ============================================================================
//  META BLOCK — v20 IMMORTAL (from genome)
// ============================================================================
export const PulseEarnMemoryAdapterMeta = Identity.OrganMeta;

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

// deterministic epoch for Earn adapter events
let EARNMEM_EPOCH = 0;
function nextEarnEpoch() {
  EARNMEM_EPOCH += 1;
  return EARNMEM_EPOCH;
}

export function createPulseEarnMemoryAdapter({
  overlay = createPulseBinaryOverlay(),
  dnaTag = "default-dna",
  version = "20.0-IMMORTAL-EARN-MEMORY",
  log = console.log
} = {}) {

  function wrap(routeId, payload, dataType) {
    const epoch = nextEarnEpoch();

    const rewardSize =
      typeof payload === "object"
        ? JSON.stringify(payload).length
        : String(payload || "").length;

    const band =
      dataType === "earn-signal" || dataType === "earn-attachment"
        ? "binary"
        : "symbolic";

    const meta = {
      dataType,
      dnaTag,
      version,
      epoch,
      rewardSize,
      band,
      metaBlock: PulseEarnMemoryAdapterMeta
    };

    try {
      overlay.touch?.(routeId, epoch, meta);
    } catch {}

    return overlay.canonicalize(routeId, payload, {
      dataType,
      band
    });
  }

  function registerEarnSignal(routeId, earnPayload) {
    return wrap(routeId, earnPayload, "earn-signal");
  }

  function registerEarnMeta(routeId, metaObj) {
    return wrap(routeId, metaObj, "earn-meta");
  }

  function registerEarnAttachment(routeId, attachment) {
    return wrap(routeId, attachment, "earn-attachment");
  }

  function registerEarnFormula(routeId, formulaStruct) {
    return wrap(routeId, formulaStruct, "earn-formula");
  }

  function promoteHot(routeId, key) {
    try {
      overlay.markHot?.(routeId, key);
      log("[PulseEarnMemoryAdapter-v20] HOT_PROMOTE", { routeId, key });
    } catch {}
  }

  return {
    PulseEarnMemoryAdapterMeta,
    dnaTag,
    version,

    registerEarnSignal,
    registerEarnMeta,
    registerEarnAttachment,
    registerEarnFormula,

    promoteHot,

    // genome-driven meta exports
    AI_EXPERIENCE_META,
    EXPORT_META,
    pulseRole,
    surfaceMeta,
    pulseLoreContext
  };
}
