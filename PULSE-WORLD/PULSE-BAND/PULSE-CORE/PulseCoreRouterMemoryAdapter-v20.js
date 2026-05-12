// ============================================================================
//  PulseRouterMemoryAdapter-v20.js — v20‑IMMORTAL‑ROUTER‑MEMORY‑ADAPTER
//  “ROUTER THINKS ONCE. ROUTES FOREVER. MEMORY NEVER DRIFTS.”
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
export const PulseRouterMemoryAdapterMeta = Identity.OrganMeta;

// ============================================================================
//  SURFACE / ORGANISM LAYER EXPORTS — v20 IMMORTAL
// ============================================================================
export const pulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;

export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// deterministic epoch for Router adapter events
let ROUTER_EPOCH = 0;
function nextRouterEpoch() {
  ROUTER_EPOCH += 1;
  return ROUTER_EPOCH;
}

// ============================================================================
//  FACTORY — v20 IMMORTAL
// ============================================================================
import { createPulseBinaryOverlay } from "./PulseCoreBinaryOverlay-v20.js";

export function createPulseRouterMemoryAdapter({
  overlay = createPulseBinaryOverlay(),
  dnaTag = "default-dna",
  version = "20.0-IMMORTAL-ROUTER-MEMORY",
  log = console.log
} = {}) {

  function wrap(routeId, payload, dataType) {
    const epoch = nextRouterEpoch();

    const band =
      dataType === "route-shape"
        ? "symbolic"
        : "binary";

    const routeSize =
      typeof payload === "object"
        ? JSON.stringify(payload).length
        : String(payload || "").length;

    const meta = {
      dataType,
      dnaTag,
      version,
      epoch,
      band,
      routeSize,
      metaBlock: PulseRouterMemoryAdapterMeta
    };

    try {
      overlay.touch?.(routeId, epoch, meta);
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
      log("[PulseRouterMemoryAdapter-v20] HOT_PROMOTE", { routeId, key });
    } catch {}
  }

  return {
    PulseRouterMemoryAdapterMeta,
    dnaTag,
    version,

    registerRouteShape,
    getRouteShape,

    promoteHot,

    // genome-driven meta exports
    AI_EXPERIENCE_META,
    EXPORT_META,
    pulseRole,
    surfaceMeta,
    pulseLoreContext
  };
}
