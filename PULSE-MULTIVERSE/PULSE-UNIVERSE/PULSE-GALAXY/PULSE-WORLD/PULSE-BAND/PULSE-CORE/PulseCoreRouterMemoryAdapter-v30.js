// ============================================================================
//  PulseRouterMemoryAdapter-v30.js — v30‑IMMORTAL‑ROUTER‑MEMORY‑ADAPTER
//  “ROUTER THINKS ONCE. ROUTES FOREVER. MEMORY NEVER DRIFTS.”
//  PURE BINARY • MAP‑STRIPPED • ZERO META • ZERO SYMBOLIC BAND
// ============================================================================

import { createPulseBinaryOverlay } from "./PulseCoreBinaryOverlay-v20.js";

// deterministic epoch for Router adapter events
let ROUTER_EPOCH = 0;
function nextRouterEpoch() {
  ROUTER_EPOCH += 1;
  return ROUTER_EPOCH;
}

// ============================================================================
//  FACTORY — v30 IMMORTAL (BINARY‑ONLY, META‑FREE)
// ============================================================================
export function createPulseRouterMemoryAdapter({
  overlay = createPulseBinaryOverlay(),
  dnaTag = "default-dna",
  version = "30.0-IMMORTAL-ROUTER-MEMORY",
  log = console.log
} = {}) {

  function wrap(routeId, payload, dataType) {
    const epoch = nextRouterEpoch();
    const band = "binary";

    const routeSize =
      typeof payload === "object"
        ? JSON.stringify(payload).length
        : String(payload || "").length;

    // v30: no metaBlock, no symbolic band, no scoring, no lineage
    try {
      overlay.touch?.(routeId, epoch, {
        dataType,
        dnaTag,
        version,
        epoch,
        band,
        routeSize
      });
    } catch {}

    return overlay.canonicalize(routeId, payload, {
      dataType,
      band
    });
  }

  function registerRouteShape(routeId, shape) {
    return wrap(routeId, shape, "route-shape");
  }

  function getRouteShape(routeId, shape) {
    return wrap(routeId, shape, "route-lookup");
  }

  function promoteHot(routeId, key) {
    try {
      overlay.markHot?.(routeId, key);
      log("[PulseRouterMemoryAdapter-v30] HOT_PROMOTE", { routeId, key });
    } catch {}
  }

  return {
    dnaTag,
    version,

    registerRouteShape,
    getRouteShape,

    promoteHot
  };
}

export default createPulseRouterMemoryAdapter;
