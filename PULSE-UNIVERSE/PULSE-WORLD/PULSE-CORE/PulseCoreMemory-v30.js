// ============================================================================
//  PulseCoreMemory-v30.js — v30‑IMMORTAL‑BINARY‑SPINE
//  ORGANISM‑WIDE BINARY MEMORY SPINE (SINGLE BAND, MAP‑STRIPPED)
//  “LOAD RARELY, SERVE CONSTANTLY, FLUSH INTENTIONALLY, HEAL WHILE SPINNING”
// ============================================================================

const CORE_VERSION = "30.0-IMMORTAL-BINARY-SPINE";

// ============================================================================
//  SIMPLE BINARY HELPERS
// ============================================================================
function encodeToBinary(obj) {
  const json = JSON.stringify(obj || {});
  const bits = [];
  for (let i = 0; i < json.length; i++) {
    const code = json.charCodeAt(i);
    for (let b = 7; b >= 0; b--) bits.push((code >> b) & 1);
  }
  return bits;
}

function decodeFromBinary(bits) {
  if (!Array.isArray(bits) || bits.length % 8 !== 0) return null;
  let json = "";
  for (let i = 0; i < bits.length; i += 8) {
    let code = 0;
    for (let b = 0; b < 8; b++) code = (code << 1) | (bits[i + b] & 1);
    json += String.fromCharCode(code);
  }
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}

// ============================================================================
//  STORAGE KEYS + LIMITS (v30)
// ============================================================================
const CORE_KEY_PRIMARY   = "pulse-core-memory-v30-primary";
const CORE_KEY_SECONDARY = "pulse-core-memory-v30-secondary";
const META_KEY_PRIMARY   = "pulse-core-memory-meta-v30-primary";
const META_KEY_SECONDARY = "pulse-core-memory-meta-v30-secondary";

const ROUTE_TTL_MS         = 7 * 24 * 60 * 60 * 1000; // 7 days
const MAX_SERIALIZED_BYTES = 512 * 1024;              // 512 KB

// ============================================================================
//  FACTORY — v30 IMMORTAL BINARY SPINE
// ============================================================================
export function createPulseCoreMemory({
  primaryStorage   = typeof window !== "undefined" ? window.localStorage : null,
  secondaryStorage = typeof window !== "undefined" ? window.sessionStorage : null,
  log              = console.log,
  warn             = console.warn,
  dnaTag           = "default-dna"
} = {}) {
  const Cache = {
    loaded: false,
    lastLoadEpoch: 0,
    data: Object.create(null),
    hotLoop: Object.create(null),
    routeMeta: Object.create(null)
  };

  const Meta = {
    lastFlushEpoch: 0,
    lastLoadEpoch: 0,
    version: CORE_VERSION,
    lastBandUsed: "primary",
    fallbackUsed: false,
    dnaTag
  };

  function safeLog(stage, details = {}) {
    try {
      log("[PulseCoreMemory-v30]", stage, JSON.stringify(details));
    } catch {}
  }

  function readBand(storage, coreKey, metaKey) {
    if (!storage) return { ok: false, data: null, meta: null };
    try {
      const raw = storage.getItem(coreKey);
      const metaRaw = storage.getItem(metaKey);
      const meta = metaRaw ? JSON.parse(metaRaw) : null;
      if (!raw) return { ok: true, data: null, meta };
      const bits = JSON.parse(raw);
      const decoded = decodeFromBinary(bits) || {};
      return { ok: true, data: decoded, meta };
    } catch (err) {
      warn("[PulseCoreMemory-v30] READ_BAND_ERROR", String(err));
      return { ok: false, data: null, meta: null };
    }
  }

  function writeBand(storage, coreKey, metaKey, data, meta) {
    if (!storage) return false;
    try {
      const bits = encodeToBinary(data);
      const serialized = JSON.stringify(bits);
      if (serialized.length > MAX_SERIALIZED_BYTES) {
        warn("[PulseCoreMemory-v30] WRITE_BAND_SKIPPED_SIZE_LIMIT", serialized.length);
        return false;
      }
      storage.setItem(coreKey, serialized);
      storage.setItem(metaKey, JSON.stringify(meta));
      return true;
    } catch (err) {
      warn("[PulseCoreMemory-v30] WRITE_BAND_ERROR", String(err));
      return false;
    }
  }

  function isVersionCompatible(meta) {
    if (!meta || !meta.version) return false;
    return meta.version === CORE_VERSION;
  }

  function isDnaCompatible(meta) {
    if (!meta || !meta.dnaTag) return false;
    return meta.dnaTag === dnaTag;
  }

  function healBandsFrom(sourceData, sourceMeta) {
    const primaryOk = writeBand(
      primaryStorage,
      CORE_KEY_PRIMARY,
      META_KEY_PRIMARY,
      sourceData,
      sourceMeta
    );
    const secondaryOk = writeBand(
      secondaryStorage,
      CORE_KEY_SECONDARY,
      META_KEY_SECONDARY,
      sourceData,
      sourceMeta
    );

    Meta.lastBandUsed = primaryOk ? "primary" : secondaryOk ? "secondary" : Meta.lastBandUsed;
    Meta.fallbackUsed = !primaryOk && secondaryOk;

    safeLog("HEAL_BANDS", { primaryOk, secondaryOk });
  }

  function pruneExpiredRoutes() {
    const now = Date.now();
    const meta = Cache.routeMeta;
    let removed = 0;

    for (const routeId in meta) {
      const info = meta[routeId];
      if (!info) continue;

      if (info.lastTouched && now - info.lastTouched > ROUTE_TTL_MS) {
        delete Cache.data[routeId];
        delete Cache.routeMeta[routeId];
        removed++;
        continue;
      }

      if (info.dnaTag && info.dnaTag !== dnaTag) {
        delete Cache.data[routeId];
        delete Cache.routeMeta[routeId];
        removed++;
      }
    }

    if (removed > 0) {
      safeLog("PRUNE_EXPIRED_ROUTES", { removed });
    }
  }

  function touchRouteMeta(routeId) {
    const now = Date.now();
    if (!Cache.routeMeta[routeId]) {
      Cache.routeMeta[routeId] = { lastTouched: now, dnaTag };
    } else {
      Cache.routeMeta[routeId].lastTouched = now;
      Cache.routeMeta[routeId].dnaTag = dnaTag;
    }
  }

  function shouldReloadNow() {
    const now = Date.now();
    const ONE_DAY = 24 * 60 * 60 * 1000;
    return !Cache.loaded || now - Cache.lastLoadEpoch > ONE_DAY;
  }

  function bulkLoad() {
    const primary = readBand(primaryStorage, CORE_KEY_PRIMARY, META_KEY_PRIMARY);

    if (primary.ok && primary.data && isVersionCompatible(primary.meta) && isDnaCompatible(primary.meta)) {
      Cache.data      = primary.data.data || Object.create(null);
      Cache.routeMeta = primary.data.routeMeta || Object.create(null);
      Cache.loaded    = true;
      Cache.lastLoadEpoch = Date.now();
      Meta.lastLoadEpoch  = Cache.lastLoadEpoch;
      Meta.lastBandUsed   = "primary";
      Meta.fallbackUsed   = false;

      if (primary.meta) Object.assign(Meta, primary.meta);

      pruneExpiredRoutes();

      safeLog("BULK_LOAD_PRIMARY_OK", {
        routes: Object.keys(Cache.data || {}).length
      });
      return;
    }

    const secondary = readBand(
      secondaryStorage,
      CORE_KEY_SECONDARY,
      META_KEY_SECONDARY
    );

    if (secondary.ok && secondary.data && isVersionCompatible(secondary.meta) && isDnaCompatible(secondary.meta)) {
      Cache.data      = secondary.data.data || Object.create(null);
      Cache.routeMeta = secondary.data.routeMeta || Object.create(null);
      Cache.loaded    = true;
      Cache.lastLoadEpoch = Date.now();
      Meta.lastLoadEpoch  = Cache.lastLoadEpoch;
      Meta.lastBandUsed   = "secondary";
      Meta.fallbackUsed   = true;

      if (secondary.meta) Object.assign(Meta, secondary.meta);

      healBandsFrom({ data: Cache.data, routeMeta: Cache.routeMeta }, Meta);

      pruneExpiredRoutes();

      safeLog("BULK_LOAD_SECONDARY_OK", {
        routes: Object.keys(Cache.data || {}).length
      });
      return;
    }

    Cache.loaded        = true;
    Cache.lastLoadEpoch = Date.now();
    Cache.data          = Object.create(null);
    Cache.routeMeta     = Object.create(null);

    Meta.lastLoadEpoch = Cache.lastLoadEpoch;
    Meta.lastBandUsed  = "primary";
    Meta.fallbackUsed  = false;
    Meta.version       = CORE_VERSION;
    Meta.dnaTag        = dnaTag;

    safeLog("BULK_LOAD_EMPTY_OR_RESET");
  }

  function prewarm() {
    if (shouldReloadNow()) bulkLoad();
  }

  function bulkFlush() {
    try {
      Meta.lastFlushEpoch = Date.now();

      const payload = {
        data: Cache.data,
        routeMeta: Cache.routeMeta
      };

      const primaryOk = writeBand(
        primaryStorage,
        CORE_KEY_PRIMARY,
        META_KEY_PRIMARY,
        payload,
        Meta
      );

      const secondaryOk = writeBand(
        secondaryStorage,
        CORE_KEY_SECONDARY,
        META_KEY_SECONDARY,
        payload,
        Meta
      );

      Meta.lastBandUsed = primaryOk ? "primary" : secondaryOk ? "secondary" : Meta.lastBandUsed;
      Meta.fallbackUsed = !primaryOk && secondaryOk;

      safeLog("BULK_FLUSH_OK", {
        routes: Object.keys(Cache.data || {}).length,
        primaryOk,
        secondaryOk
      });
    } catch (err) {
      warn("[PulseCoreMemory-v30] BULK_FLUSH_ERROR", String(err));
    }
  }

  // -------------------------------------------------------------------------
  //  ROUTE‑AWARE ACCESSORS + LOOP THEORY (BINARY‑ONLY)
// -------------------------------------------------------------------------
  function ensureRoute(routeId = "global") {
    if (!Cache.data[routeId]) Cache.data[routeId] = {};
    if (!Cache.routeMeta[routeId]) {
      Cache.routeMeta[routeId] = { lastTouched: Date.now(), dnaTag };
    }
    return Cache.data[routeId];
  }

  function markHot(routeId, key) {
    const id = `${routeId}:${key}`;
    const current = Cache.hotLoop[id] || 0;
    const next = current + 1;
    Cache.hotLoop[id] = next;
    return next;
  }

  function get(routeId, key) {
    prewarm();
    const bucket = ensureRoute(routeId);
    const value = bucket[key];

    if (value !== undefined) {
      markHot(routeId, key);
      touchRouteMeta(routeId);
    }

    return value;
  }

  function set(routeId, key, value) {
    prewarm();
    const bucket = ensureRoute(routeId);
    bucket[key] = value;
    markHot(routeId, key);
    touchRouteMeta(routeId);
  }

  function getRouteSnapshot(routeId) {
    prewarm();
    touchRouteMeta(routeId);
    return { ...(Cache.data[routeId] || {}) };
  }

  function setRouteSnapshot(routeId, snapshot) {
    prewarm();
    Cache.data[routeId] = { ...(snapshot || {}) };
    touchRouteMeta(routeId);
  }

  function clearRoute(routeId) {
    prewarm();
    delete Cache.data[routeId];
    delete Cache.routeMeta[routeId];
  }

  function clearAll() {
    Cache.data      = Object.create(null);
    Cache.hotLoop   = Object.create(null);
    Cache.routeMeta = Object.create(null);
    bulkFlush();
  }

  function getHotKeys(minHits = 3) {
    const result = [];
    for (const id in Cache.hotLoop) {
      if (Cache.hotLoop[id] >= minHits) result.push({ id, hits: Cache.hotLoop[id] });
    }
    return result;
  }

  function coolDown(routeId, key) {
    const id = `${routeId}:${key}`;
    delete Cache.hotLoop[id];
  }

  // ========================================================================
  //  PULSE CORE MEMORY — v30 IMMORTAL BINARY SPINE
  // ========================================================================
  const PulseCoreMemory = {
    Meta,
    Cache,

    prewarm,
    bulkLoad,
    bulkFlush,

    get,
    set,
    getRouteSnapshot,
    setRouteSnapshot,
    clearRoute,
    clearAll,

    getHotKeys,
    coolDown,

    dnaTag,
    version: CORE_VERSION
  };

  return PulseCoreMemory;
}

// ============================================================================
//  BACKEND API SURFACE — v30 IMMORTAL BINARY
// ============================================================================
export const PulseCoreMemoryAPI = {
  version: CORE_VERSION,

  create: createPulseCoreMemory,

  read(key, routeId = "global") {
    const inst = createPulseCoreMemory();
    return inst.get(routeId, key);
  },

  write(key, value, routeId = "global") {
    const inst = createPulseCoreMemory();
    inst.set(routeId, key, value);
    return true;
  },

  snapshot(routeId = "global") {
    const inst = createPulseCoreMemory();
    return inst.getRouteSnapshot(routeId);
  },

  clearRoute(routeId) {
    const inst = createPulseCoreMemory();
    inst.clearRoute(routeId);
    return true;
  },

  clearAll() {
    const inst = createPulseCoreMemory();
    inst.clearAll();
    return true;
  }
};

export default PulseCoreMemoryAPI;
