// ============================================================================
//  PulseEarnMemoryAdapter.js — v30‑IMMORTAL‑EARN‑MEMORY‑ADAPTER
//  “EARN FLOWS IN. VALUE ACCUMULATES. NOTHING DRIFTS.”
//  PURE BINARY. ZERO META MAP. ZERO SYMBOLIC BANDS.
// ============================================================================

import { createPulseBinaryOverlay } from "./PulseCoreBinaryOverlay-v30.js";

// ============================================================================
//  FACTORY — v30 IMMORTAL (map‑stripped, binary‑only)
// ============================================================================
export function createPulseEarnMemoryAdapter({
  overlay = createPulseBinaryOverlay(),
  dnaTag = "default-dna",
  version = "30.0-IMMORTAL-EARN-MEMORY",
  log = console.log
} = {}) {

  // core wrapper — no epoch, no meta, no band switching
  function wrap(routeId, payload, dataType) {
    return overlay.canonicalize(routeId, payload, {
      dataType,
      band: "binary"
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
      log("[PulseEarnMemoryAdapter-v30] HOT_PROMOTE", { routeId, key });
    } catch {}
  }

  return Object.freeze({
    kind: "PulseEarnMemoryAdapter",
    version,
    dnaTag,

    registerEarnSignal,
    registerEarnMeta,
    registerEarnAttachment,
    registerEarnFormula,

    promoteHot
  });
}
