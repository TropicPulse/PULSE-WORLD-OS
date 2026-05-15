// ============================================================================
//  PulseCoreGovernor.js — v30-IMMORTAL-GOVERNOR
//  ORGANISM‑WIDE CORE MEMORY GOVERNOR (MAP‑STRIPPED, BINARY‑READY)
//  “ONE BRAIN. ONE SPINE. MANY LAYERS. ZERO DRIFT.”
//  NO META MAP • NO OVERLAY MAP • NO LAYER MAP • NO PROMOTION MAP
// ============================================================================

// ============================================================================
//  CORE IMPORTS (v30)
// ============================================================================
import { createPulseCoreMemory } from "./PulseCoreMemory-v30.js";

// deterministic governor epoch (internal only)
let GOVERNOR_EPOCH = 0;
function nextGovernorEpoch() {
  GOVERNOR_EPOCH += 1;
  return GOVERNOR_EPOCH;
}

// ============================================================================
//  GOVERNOR CREATION — v30-IMMORTAL-GOVERNOR
// ============================================================================
export function createPulseCoreGovernor({
  primaryStorage = typeof window !== "undefined" ? window.localStorage : null,
  secondaryStorage = typeof window !== "undefined" ? window.sessionStorage : null,
  dnaTag = "default-dna",
  version = "30.0-IMMORTAL-GOVERNOR",
  log = console.log,
  warn = console.warn
} = {}) {

  const CoreMemory = createPulseCoreMemory({
    primaryStorage,
    secondaryStorage,
    dnaTag,
    log,
    warn
  });

  function safeLog(stage, details = {}) {
    try {
      log("[PulseCoreGovernor-v30]", stage, JSON.stringify(details));
    } catch {}
  }

  // -------------------------------------------------------------------------
  //  GOVERNOR CONTEXT (identity‑light, internal only)
  // -------------------------------------------------------------------------
  function buildGovernorContext() {
    return {
      dnaTag,
      version,
      epoch: nextGovernorEpoch()
    };
  }

  // -------------------------------------------------------------------------
  //  BOOT / PREWARM / HEAL
  // -------------------------------------------------------------------------
  function boot() {
    const ctx = buildGovernorContext();
    try {
      CoreMemory.prewarm?.();
    } catch {}
    safeLog("BOOT", {
      ...ctx,
      primaryStorageAvailable: !!primaryStorage,
      secondaryStorageAvailable: !!secondaryStorage
    });
  }

  function healIfNeeded() {
    const ctx = buildGovernorContext();
    try {
      CoreMemory.prewarm?.();
    } catch {}
    safeLog("HEAL_CHECK", ctx);
  }

  // -------------------------------------------------------------------------
  //  SET / GET — v30 (no layers, no placement, no promotion)
// -------------------------------------------------------------------------
  function set(routeId, key, value, options = {}) {
    const dataType = options.dataType || "generic";

    CoreMemory.set(routeId, key, value);

    safeLog("SET", {
      routeId,
      key,
      dataType,
      dnaTag,
      version
    });
  }

  function get(routeId, key, options = {}) {
    const dataType = options.dataType || "generic";

    const value = CoreMemory.get(routeId, key);

    safeLog("GET", {
      routeId,
      key,
      dataType,
      hit: value !== undefined
    });

    return value;
  }

  // -------------------------------------------------------------------------
  //  SNAPSHOTS / ROUTE‑LEVEL CONTROL
  // -------------------------------------------------------------------------
  function getRouteSnapshot(routeId) {
    const snapshot = CoreMemory.getRouteSnapshot(routeId);
    safeLog("GET_ROUTE_SNAPSHOT", { routeId });
    return snapshot;
  }

  function setRouteSnapshot(routeId, snapshot) {
    CoreMemory.setRouteSnapshot(routeId, snapshot);
    safeLog("SET_ROUTE_SNAPSHOT", { routeId });
  }

  function clearRoute(routeId) {
    CoreMemory.clearRoute(routeId);
    safeLog("CLEAR_ROUTE", { routeId });
  }

  function clearAll() {
    CoreMemory.clearAll();
    safeLog("CLEAR_ALL", {});
  }

  // -------------------------------------------------------------------------
  //  FLUSH / PERSIST — v30
  // -------------------------------------------------------------------------
  function flush() {
    CoreMemory.bulkFlush?.();
    const cacheData = CoreMemory.Cache?.data || {};
    safeLog("FLUSH", {
      routes: Object.keys(cacheData).length
    });
  }

  // -------------------------------------------------------------------------
  //  PUBLIC API — v30 (META‑STRIPPED, IDENTITY‑LIGHT)
// -------------------------------------------------------------------------
  const PulseCoreGovernor = {
    CoreMemory,

    boot,
    healIfNeeded,

    set,
    get,
    getRouteSnapshot,
    setRouteSnapshot,
    clearRoute,
    clearAll,

    flush,

    dnaTag,
    version
  };

  safeLog("INIT", {
    version,
    dnaTag
  });

  return PulseCoreGovernor;
}
