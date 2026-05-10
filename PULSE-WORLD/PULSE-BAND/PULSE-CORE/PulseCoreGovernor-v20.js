// ============================================================================
//  PulseCoreGovernor.js — v20-IMMORTAL-GOVERNOR
//  ORGANISM‑WIDE CORE MEMORY GOVERNOR
//  “ONE BRAIN. ONE SPINE. MANY LAYERS. ZERO DRIFT.”
// ============================================================================

import { OrganismIdentity } from "../PULSE-X/PulseWorldOrganismMap-v21.js";

const Identity = OrganismIdentity(import.meta.url);

// ============================================================================
//  META BLOCK — v20 IMMORTAL (from genome)
// ============================================================================
export const PulseCoreGovernorMeta = Identity.OrganMeta;

// ============================================================================
//  SURFACE / ORGANISM LAYER EXPORTS — v20 IMMORTAL
// ============================================================================
export const pulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;

export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// ============================================================================
//  CORE IMPORTS
// ============================================================================
import { CoreMemoryRole, createPulseCoreMemory } from "./PulseCoreMemory-v24.js";
import { CoreLayersRole, PulseCoreLayersOrgan } from "./PulseCoreLayers-v20.js";

// deterministic governor epoch
let GOVERNOR_EPOCH = 0;
function nextGovernorEpoch() {
  GOVERNOR_EPOCH += 1;
  return GOVERNOR_EPOCH;
}

// ============================================================================
//  GOVERNOR CREATION — v20-IMMORTAL-GOVERNOR
// ============================================================================
export function createPulseCoreGovernor({
  primaryStorage = typeof window !== "undefined" ? window.localStorage : null,
  secondaryStorage = typeof window !== "undefined" ? window.sessionStorage : null,
  dnaTag = "default-dna",
  version = "20.0-IMMORTAL-GOVERNOR",
  overlay = null,
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

  const { PulseCoreLayers, PulseCoreLayerRules } = PulseCoreLayersOrgan;

  function safeLog(stage, details = {}) {
    try {
      log("[PulseCoreGovernor-v20]", stage, JSON.stringify(details));
    } catch {}
  }

  // -------------------------------------------------------------------------
  //  GOVERNOR CONTEXT + OVERLAY HOOKS
  // -------------------------------------------------------------------------
  function buildGovernorContext() {
    return {
      dnaTag,
      version,
      epoch: nextGovernorEpoch(),
      coreMemoryVersion: CoreMemoryRole.version,
      coreLayersVersion: CoreLayersRole.version,
      overlayIdentity: overlay?.identity || null
    };
  }

  function applyOverlayPlacementHint({ routeId, key, dataType, placement }) {
    if (!overlay || typeof overlay.placementHint !== "function") return placement;
    try {
      const hint = overlay.placementHint({
        routeId,
        key,
        dataType,
        placement,
        dnaTag,
        version
      });
      return hint || placement;
    } catch (err) {
      warn("[PulseCoreGovernor-v20] OVERLAY_PLACEMENT_HINT_ERROR", String(err));
      return placement;
    }
  }

  function applyOverlayPromotionHint({ routeId, key, dataType, hits, promote }) {
    if (!overlay || typeof overlay.promotionHint !== "function") return promote;
    try {
      const hint = overlay.promotionHint({
        routeId,
        key,
        dataType,
        hits,
        promote,
        dnaTag,
        version
      });
      return typeof hint === "boolean" ? hint : promote;
    } catch (err) {
      warn("[PulseCoreGovernor-v20] OVERLAY_PROMOTION_HINT_ERROR", String(err));
      return promote;
    }
  }

  // -------------------------------------------------------------------------
  //  BOOT / PREWARM / HEAL
  // -------------------------------------------------------------------------
  function boot() {
    const ctx = buildGovernorContext();
    CoreMemory.prewarm();
    safeLog("BOOT", {
      ...ctx,
      primaryStorageAvailable: !!primaryStorage,
      secondaryStorageAvailable: !!secondaryStorage
    });
  }

  function healIfNeeded() {
    const ctx = buildGovernorContext();
    CoreMemory.prewarm();
    safeLog("HEAL_CHECK", ctx);
  }

  // -------------------------------------------------------------------------
  //  LAYER‑AWARE SET / GET
  // -------------------------------------------------------------------------
  function set(routeId, key, value, options = {}) {
    const dataType = options.dataType || "generic";
    const band = options.band || "symbolic";

    let placement = PulseCoreLayerRules.decidePlacement(
      dataType,
      dnaTag,
      routeId
    );

    placement = applyOverlayPlacementHint({
      routeId,
      key,
      dataType,
      placement
    });

    CoreMemory.set(routeId, key, value);

    safeLog("SET", {
      routeId,
      key,
      dataType,
      band,
      placement,
      dnaTag,
      version
    });
  }

  function get(routeId, key, options = {}) {
    const dataType = options.dataType || "generic";
    const band = options.band || "symbolic";

    const value = CoreMemory.get(routeId, key);
    const hits = value !== undefined ? 1 : 0;

    let promote = PulseCoreLayerRules.shouldPromote({
      hits,
      dataType,
      routeId,
      dnaTag
    });

    promote = applyOverlayPromotionHint({
      routeId,
      key,
      dataType,
      hits,
      promote
    });

    if (promote) {
      safeLog("PROMOTE_HINT", { routeId, key, dataType, band });
    }

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
  //  FLUSH / PERSIST
  // -------------------------------------------------------------------------
  function flush() {
    CoreMemory.bulkFlush();
    const cacheData = CoreMemory.Cache?.data || {};
    safeLog("FLUSH", {
      routes: Object.keys(cacheData).length
    });
  }

  // -------------------------------------------------------------------------
  //  LOOP THEORY INTROSPECTION
  // -------------------------------------------------------------------------
  function getHotKeys(minHits = 3) {
    const keys = CoreMemory.getHotKeys(minHits);
    safeLog("HOT_KEYS", { minHits, count: keys.length });
    return keys;
  }

  // -------------------------------------------------------------------------
  //  PUBLIC API
  // -------------------------------------------------------------------------
  const PulseCoreGovernor = {
    // genome-driven identity + surface
    meta: PulseCoreGovernorMeta,
    pulseRole,
    surfaceMeta,
    pulseLoreContext,
    AI_EXPERIENCE_META,
    EXPORT_META,

    CoreMemoryRole,
    CoreLayersRole,

    CoreMemory,
    PulseCoreLayers,
    PulseCoreLayerRules,

    boot,
    healIfNeeded,

    set,
    get,
    getRouteSnapshot,
    setRouteSnapshot,
    clearRoute,
    clearAll,

    flush,
    getHotKeys,

    dnaTag,
    version,
    overlay
  };

  safeLog("INIT", {
    identity: PulseCoreGovernorMeta.identity,
    version: PulseCoreGovernorMeta.version,
    dnaTag,
    overlayAware: !!overlay
  });

  return PulseCoreGovernor;
}
