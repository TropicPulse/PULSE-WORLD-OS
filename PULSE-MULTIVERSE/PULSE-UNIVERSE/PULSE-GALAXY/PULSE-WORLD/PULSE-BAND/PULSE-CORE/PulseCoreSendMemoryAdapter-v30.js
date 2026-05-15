// ============================================================================
//  PulseSendMemoryAdapter-v30.js — v30‑IMMORTAL‑SEND‑MEMORY‑ADAPTER
//  “SEND ONCE. REFERENCE FOREVER. MEMORY NEVER DRIFTS.”
//  PURE BINARY • ZERO META • MAP‑STRIPPED
// ============================================================================

import { createPulseBinaryOverlay } from "./PulseCoreBinaryOverlay-v20.js";

// deterministic epoch for Send adapter events
let SEND_EPOCH = 0;
function nextSendEpoch() {
  SEND_EPOCH += 1;
  return SEND_EPOCH;
}

// ============================================================================
//  FACTORY — v30 IMMORTAL (BINARY‑ONLY)
// ============================================================================
export function createPulseSendMemoryAdapter({
  overlay = createPulseBinaryOverlay(),
  dnaTag = "default-dna",
  version = "30.0-IMMORTAL-SEND-MEMORY",
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

    // v30: no metaBlock, no symbolic band, no scoring, no lineage
    try {
      overlay.touch?.(routeId, epoch, {
        dataType,
        dnaTag,
        version,
        epoch,
        band,
        sendSize,
        channel
      });
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
      log("[PulseSendMemoryAdapter-v30] HOT_PROMOTE", { routeId, key });
    } catch {}
  }

  return {
    dnaTag,
    version,

    prepareOutbound,
    promoteHot
  };
}

export default createPulseSendMemoryAdapter;
