// ============================================================================
//  PulseProxyMemoryAdapter-v20.js — v20‑IMMORTAL‑PROXY‑MEMORY‑ADAPTER
//  “PROXY NEVER FETCHES TWICE. NEVER DECODE TWICE. NEVER DRIFTS.”
// ============================================================================

import { OrganismIdentity } from "../PULSE-X/PulseWorldOrganismMap-v24.js";

const Identity = OrganismIdentity(import.meta.url);

// ============================================================================
//  META BLOCK — v20 IMMORTAL (from genome)
// ============================================================================
export const PulseProxyMemoryAdapterMeta = Identity.OrganMeta;

// ============================================================================
//  SURFACE / ORGANISM LAYER EXPORTS — v20 IMMORTAL
// ============================================================================
export const pulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;

export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// deterministic epoch for Proxy adapter events
let PROXY_EPOCH = 0;
function nextProxyEpoch() {
  PROXY_EPOCH += 1;
  return PROXY_EPOCH;
}

// ============================================================================
//  FACTORY — v20 IMMORTAL
// ============================================================================
import { createPulseBinaryOverlay } from "./PulseBinaryCoreOverlay-v20.js";

export function createPulseProxyMemoryAdapter({
  overlay = createPulseBinaryOverlay(),
  dnaTag = "default-dna",
  version = "20.0-IMMORTAL-PROXY-MEMORY",
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

    const meta = {
      dataType,
      dnaTag,
      version,
      epoch,
      band,
      proxySize,
      mode,
      metaBlock: PulseProxyMemoryAdapterMeta
    };

    try {
      overlay.touch?.(routeId, epoch, meta);
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
      log("[PulseProxyMemoryAdapter-v20] HOT_PROMOTE", { routeId, key });
    } catch {}
  }

  return {
    PulseProxyMemoryAdapterMeta,
    dnaTag,
    version,

    inbound,
    outbound,

    promoteHot,

    // genome-driven meta exports
    AI_EXPERIENCE_META,
    EXPORT_META,
    pulseRole,
    surfaceMeta,
    pulseLoreContext
  };
}
