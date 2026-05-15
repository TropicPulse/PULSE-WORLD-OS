// ============================================================================
//  PulseCoreBinaryOverlay-v30.js — v30-IMMORTAL-BINARY-OVERLAY
//  ORGANISM‑WIDE BINARY MEMORY OVERLAY (PURE BINARY, MAP‑STRIPPED)
//  ZERO META MAP. ZERO ADVANTAGE SCORING. ZERO SYMBOLIC BANDS.
// ============================================================================

import { createPulseCoreGovernor } from "./PulseCoreGovernor-v30.js";

// ---------------------------------------------------------------------------
//  SIMPLE BINARY KEY (STRUCTURAL HASH) — unchanged, deterministic
// ---------------------------------------------------------------------------
function toBinaryKey(blobOrStruct) {
  const json =
    typeof blobOrStruct === "string"
      ? blobOrStruct
      : JSON.stringify(blobOrStruct || {});
  let h = 0;
  for (let i = 0; i < json.length; i++) {
    h = (h * 31 + json.charCodeAt(i)) | 0;
  }
  return "bin-" + (h >>> 0).toString(16);
}

// ---------------------------------------------------------------------------
//  CREATE BINARY OVERLAY — v30-IMMORTAL (map‑stripped, binary‑only)
// ---------------------------------------------------------------------------
export function createPulseBinaryOverlay({
  dnaTag = "default-dna",
  version = "30.0-IMMORTAL-BINARY-OVERLAY",
  coreGovernor = null,
  log = console.log
} = {}) {
  const Governor =
    coreGovernor ||
    createPulseCoreGovernor({
      dnaTag,
      version,
      log
    });

  const CoreMemory = Governor.CoreMemory;

  // RAM scratchpad (pure binary cache)
  const Scratch = {
    byKey: Object.create(null)
  };

  function safeLog(stage, details = {}) {
    try {
      log("[PulseBinaryOverlay-v30]", stage, JSON.stringify(details));
    } catch {
      // fail-open
    }
  }

  // -------------------------------------------------------------------------
  //  CANONICALIZE — v30-IMMORTAL (no meta map, no scoring, no overlay.touch)
  // -------------------------------------------------------------------------
  function canonicalize(routeId, blobOrStruct, options = {}) {
    const route = routeId || "global";
    const binaryKey = toBinaryKey(blobOrStruct);
    const dataType = options.dataType || "generic";
    const band = "binary";

    try {
      CoreMemory.prewarm?.();
    } catch {}

    // 1) RAM scratchpad
    const scratch = Scratch.byKey[binaryKey];
    if (scratch) {
      Scratch.byKey[binaryKey] = {
        value: scratch.value,
        routeId: route
      };
      Governor.set(route, binaryKey, scratch.value, { dataType, band });
      safeLog("CANONICALIZE_HIT_RAM", { route, binaryKey, dataType });
      return { binaryKey, value: scratch.value, reused: true };
    }

    // 2) CoreMemory
    const existing = Governor.get(route, binaryKey, { dataType, band });
    if (existing !== undefined) {
      Scratch.byKey[binaryKey] = {
        value: existing,
        routeId: route
      };
      safeLog("CANONICALIZE_HIT_CORE", { route, binaryKey, dataType });
      return { binaryKey, value: existing, reused: true };
    }

    // 3) New entry
    Governor.set(route, binaryKey, blobOrStruct, { dataType, band });
    Scratch.byKey[binaryKey] = {
      value: blobOrStruct,
      routeId: route
    };

    safeLog("CANONICALIZE_NEW", { route, binaryKey, dataType });
    return { binaryKey, value: blobOrStruct, reused: false };
  }

  // -------------------------------------------------------------------------
  //  INBOUND / OUTBOUND — always binary band
  // -------------------------------------------------------------------------
  function interceptInbound(routeId, payload, options = {}) {
    return canonicalize(routeId, payload, {
      dataType: options.dataType || "inbound"
    });
  }

  function interceptOutbound(routeId, payload, options = {}) {
    return canonicalize(routeId, payload, {
      dataType: options.dataType || "outbound"
    });
  }

  // -------------------------------------------------------------------------
  //  RAM FLUSH — v30 (no rebuild / hot map)
// -------------------------------------------------------------------------
  function flushRam() {
    Scratch.byKey = Object.create(null);
    safeLog("FLUSH_RAM", {});
  }

  // -------------------------------------------------------------------------
  //  PUBLIC API — v30 (identity‑light, map‑free)
// -------------------------------------------------------------------------
  const PulseBinaryOverlay = {
    Governor,
    CoreMemory,

    canonicalize,
    interceptInbound,
    interceptOutbound,

    flushRam,

    dnaTag,
    version
  };

  safeLog("INIT", {
    version,
    dnaTag
  });

  return PulseBinaryOverlay;
}
