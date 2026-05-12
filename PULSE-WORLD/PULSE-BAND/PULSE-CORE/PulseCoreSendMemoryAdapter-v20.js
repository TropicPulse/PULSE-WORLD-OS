// ============================================================================
//  PulseSendMemoryAdapter-v20.js — v20‑IMMORTAL‑SEND‑MEMORY‑ADAPTER
//  “SEND ONCE. REFERENCE FOREVER. MEMORY NEVER DRIFTS.”
// ============================================================================

import {
  OrganismIdentity,
  buildPulseOrganismMap as PulseOrganismMap,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PULSE-WORLD-MAP.js";

const Identity = OrganismIdentity(import.meta.url);

// ============================================================================
//  META BLOCK — v20 IMMORTAL (from genome)
// ============================================================================
export const PulseSendMemoryAdapterMeta = Identity.OrganMeta;

// ============================================================================
//  SURFACE / ORGANISM LAYER EXPORTS — v20 IMMORTAL
// ============================================================================
export const pulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;

export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// deterministic epoch for Send adapter events
let SEND_EPOCH = 0;
function nextSendEpoch() {
  SEND_EPOCH += 1;
  return SEND_EPOCH;
}

// ============================================================================
//  FACTORY — v20 IMMORTAL
// ============================================================================
import { createPulseBinaryOverlay } from "./PulseCoreBinaryOverlay-v20.js";

export function createPulseSendMemoryAdapter({
  overlay = createPulseBinaryOverlay(),
  dnaTag = "default-dna",
  version = "20.0-IMMORTAL-SEND-MEMORY",
  log = console.log,
  defaultChannel = "http"
} = {}) {

  function resolveChannel(channelOverride) {
    const c = channelOverride || defaultChannel || "http";
    return String(c);
  }

  function wrap(routeId, payload, dataType, channelOverride) {
    const epoch = nextSendEpoch();
    const band = "binary";

    const sendSize =
      typeof payload === "object"
        ? JSON.stringify(payload).length
        : String(payload || "").length;

    const channel = resolveChannel(channelOverride);

    const meta = {
      dataType,
      dnaTag,
      version,
      epoch,
      band,
      sendSize,
      channel,
      metaBlock: PulseSendMemoryAdapterMeta
    };

    try {
      overlay.touch?.(routeId, epoch, meta);
    } catch {}

    return overlay.interceptOutbound(routeId, payload, {
      dataType,
      band
    });
  }

  function prepareOutbound(routeId, payload, channelOverride) {
    return wrap(routeId, payload, "send", channelOverride);
  }

  function promoteHot(routeId, key) {
    try {
      overlay.markHot?.(routeId, key);
      log("[PulseSendMemoryAdapter-v20] HOT_PROMOTE", { routeId, key });
    } catch {}
  }

  return {
    PulseSendMemoryAdapterMeta,
    dnaTag,
    version,

    prepareOutbound,
    promoteHot,

    // genome-driven meta exports
    AI_EXPERIENCE_META,
    EXPORT_META,
    pulseRole,
    surfaceMeta,
    pulseLoreContext
  };
}
