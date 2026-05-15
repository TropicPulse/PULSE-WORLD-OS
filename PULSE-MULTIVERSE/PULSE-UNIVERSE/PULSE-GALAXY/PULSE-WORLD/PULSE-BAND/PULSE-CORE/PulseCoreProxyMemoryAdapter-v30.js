// ============================================================================
//  PulseProxyMemoryAdapter-v30.js — v30‑IMMORTAL‑PROXY‑MEMORY‑ADAPTER
//  “PROXY NEVER FETCHES TWICE. NEVER DECODES TWICE. NEVER DRIFTS.”
//  BINARY‑ONLY • MAP‑STRIPPED • ZERO META
// ============================================================================

import { createPulseBinaryOverlay } from "./PulseCoreBinaryOverlay-v20.js";

// deterministic epoch for Proxy adapter events
let PROXY_EPOCH = 0;
function nextProxyEpoch() {
  PROXY_EPOCH += 1;
  return PROXY_EPOCH;
}

// ============================================================================
//  FACTORY — v30 IMMORTAL (BINARY‑ONLY)
// ============================================================================
export function createPulseProxyMemoryAdapter({
  overlay = createPulseBinaryOverlay(),
  dnaTag = "default-dna",
  version = "30.0-IMMORTAL-PROXY-MEMORY",
  log = console.log,
  defaultMode = "online" // "online" | "offline" | "cache-only" | "fail-open"
} = {}) {

  function resolveMode(modeOverride) {
    const m = modeOverride || defaultMode || "online";
    if (
      m === "online" ||
      m === "offline" ||
      m === "cache-only" ||
      m === "fail-open"
    ) return m;
    return "online";
  }

  function wrap(routeId, payload, dataType, modeOverride) {
    const epoch = nextProxyEpoch();
    const band = "binary";

    const proxySize =
      typeof payload === "object"
        ? JSON.stringify(payload).length
        : String(payload || "").length;

    const mode = resolveMode(modeOverride);

    try {
      overlay.touch?.(routeId, epoch, {
        dataType,
        dnaTag,
        version,
        epoch,
        band,
        proxySize,
        mode
      });
    } catch {}

    return overlay.canonicalize(routeId, payload, {
      dataType,
      band
    });
  }

  function inbound(routeId, payload, modeOverride) {
    return wrap(routeId, payload, "proxy-in", modeOverride);
  }

  function outbound(routeId, payload, modeOverride) {
    return wrap(routeId, payload, "proxy-out", modeOverride);
  }

  function promoteHot(routeId, key) {
    try {
      overlay.markHot?.(routeId, key);
      log("[PulseProxyMemoryAdapter-v30] HOT_PROMOTE", { routeId, key });
    } catch {}
  }

  return {
    dnaTag,
    version,

    inbound,
    outbound,

    promoteHot
  };
}

export default createPulseProxyMemoryAdapter;
