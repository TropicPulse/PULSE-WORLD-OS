// ----------------------------------------------------------------------------
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝
// ============================================================================
// PulseWorldOrganismMap-v27.js — v27.0-INSTANT-BINARY-MAP
// A pure metadata map: systems + file metadata, nothing else.
// No backend, no Firebase, no localStorage, no HTML/JS scanning.
// ============================================================================

const G =
  (typeof window !== "undefined" && window) ||
  (typeof globalThis !== "undefined" && globalThis) ||
  (typeof self !== "undefined" && self) ||
  (typeof global !== "undefined" && global) ||
  {};

const MAP_DB_NAME = "PulseWorldMapDB";
const MAP_STORE_NAME = "OrganismMapStore";
const MAP_KEY = "PulseOrganismMap_v27";

// ---------------------------------------------------------------------------
// IndexedDB helpers (binary-friendly, but we just store JSON for now)
// ---------------------------------------------------------------------------
let dbPromise = null;

function openMapDB() {
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve) => {
    const req = indexedDB.open(MAP_DB_NAME, 1);
    req.onupgradeneeded = function (evt) {
      const db = evt.target.result;
      if (!db.objectStoreNames.contains(MAP_STORE_NAME)) {
        db.createObjectStore(MAP_STORE_NAME);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => {
      console.error("[OrganismMap:v27] Failed to open IndexedDB", req.error);
      resolve(null);
    };
  });

  return dbPromise;
}

async function idbGetMap() {
  const db = await openMapDB();
  if (!db) return null;
  return new Promise((resolve) => {
    const tx = db.transaction(MAP_STORE_NAME, "readonly");
    const store = tx.objectStore(MAP_STORE_NAME);
    const req = store.get(MAP_KEY);
    req.onsuccess = () => resolve(req.result || null);
    req.onerror = () => {
      console.error("[OrganismMap:v27] get failed", req.error);
      resolve(null);
    };
  });
}

async function idbSetMap(snapshot) {
  const db = await openMapDB();
  if (!db) return false;
  return new Promise((resolve) => {
    const tx = db.transaction(MAP_STORE_NAME, "readwrite");
    const store = tx.objectStore(MAP_STORE_NAME);
    const req = store.put(snapshot, MAP_KEY);
    req.onsuccess = () => resolve(true);
    req.onerror = () => {
      console.error("[OrganismMap:v27] set failed", req.error);
      resolve(false);
    };
  });
}

// ---------------------------------------------------------------------------
// Minimal classifier (kept, but simplified)
// ---------------------------------------------------------------------------
function classifySystemName(name) {
  const n = name.toLowerCase();

  const MAP = {
    "pulse-ai":         { layer: "ai",        kind: "ai" },
    "pulse-band":       { layer: "backend",   kind: "band" },
    "pulse-code":       { layer: "specs",     kind: "code" },
    "pulse-core":       { layer: "core",      kind: "core" },
    "pulse-design":     { layer: "design",    kind: "design" },
    "pulse-earn":       { layer: "earn",      kind: "earn" },
    "pulse-engine":     { layer: "engine",    kind: "engine" },
    "pulse-expansion":  { layer: "expansion", kind: "expansion" },
    "pulse-finality":   { layer: "finality",  kind: "finality" },
    "pulse-gpu":        { layer: "gpu",       kind: "gpu" },
    "pulse-grid":       { layer: "grid",      kind: "grid" },
    "pulse-mesh":       { layer: "mesh",      kind: "mesh" },
    "pulse-os":         { layer: "os",        kind: "os" },
    "pulse-proxy":      { layer: "proxy",     kind: "boundary" },
    "pulse-regioning":  { layer: "regioning", kind: "regioning" },
    "pulse-router":     { layer: "router",    kind: "router" },
    "pulse-send":       { layer: "send",      kind: "send" },
    "pulse-specs":      { layer: "specs",     kind: "specs" },
    "pulse-shifter":    { layer: "shifter",   kind: "shifter" },
    "pulse-tech":       { layer: "tech",      kind: "tech" },
    "pulse-tools":      { layer: "tools",     kind: "tools" },
    "pulse-translator": { layer: "translator",kind: "translator" },
    "pulse-trust":      { layer: "trust",     kind: "trust" },
    "PULSE-BAND":         { layer: "frontend",  kind: "ui" },
    "pulse-world":      { layer: "world_root",kind: "world" },
    "pulse-x":          { layer: "core_engine", kind: "engine" },
    "pulse":            { layer: "security_ui", kind: "pulse" },
    "pulseadmin":       { layer: "admin_ui",  kind: "admin" },
    "pulsedelivery":    { layer: "delivery_ui", kind: "delivery" },
    "pulsedirectory":   { layer: "directory_ui", kind: "directory" },
    "pulserewards":     { layer: "rewards_ui", kind: "rewards" },
    "netlify":          { layer: "backup",    kind: "backup" }
  };

  return MAP[n] || { layer: "generic", kind: "system" };
}

// ---------------------------------------------------------------------------
// Runtime map attach — tiny, no signals, no prewarm, no routes
// ---------------------------------------------------------------------------
function attachRuntimeToSnapshot(snapshot) {
  const map = Object.assign(
    {
      systems: {},
      fileToMeta: {},
      defaultMeta: { subsystem: "unknown", version: "v0", color: "#90CAF9", icon: "?" }
    },
    snapshot || {}
  );

  map.lookup = function (fileUrl) {
    return this.fileToMeta[fileUrl] || this.defaultMeta;
  };

  map.getSystem = function (sysKey) {
    return this.systems[sysKey.toLowerCase()] || null;
  };

  map.listSystems = function () {
    return Object.values(this.systems || {});
  };

  // Backwards-compat no-op signal bus so old calls don't crash
  map.signal = function (_evt) {
    // v27: map is passive; Touch owns behavior.
  };

  // Backwards-compat no-op prewarm
  map.prewarm = function (_page, _region, _mode) {
    // v27: Touch + chunks handle warm paths.
  };

  // Backwards-compat identity resolver stub
  map.resolveIdentity = function (_metaUrl) {
    return null;
  };

  // Backwards-compat export (just re-saves snapshot)
  map.exportToLocalStorage = function () {
    // v27: no localStorage; keep as no-op to avoid crashes.
  };

  return map;
}

// ---------------------------------------------------------------------------
// Public: load map (sync facade + async hydrate)
// ---------------------------------------------------------------------------
let inMemoryMap = null;

/**
 * getPulseOrganismMapV27
 * Sync facade: always returns a map object immediately.
 * If IndexedDB has a snapshot, it will be hydrated asynchronously.
 */
export function getPulseOrganismMapV27() {
  if (inMemoryMap) return inMemoryMap;

  // Start with an empty map; hydrate in background.
  inMemoryMap = attachRuntimeToSnapshot({
    epoch: Date.now(),
    version: "v27.0-INSTANT-BINARY-MAP",
    systems: {},
    fileToMeta: {}
  });

  // Async hydrate from IndexedDB (if snapshot exists)
  idbGetMap().then((snapshot) => {
    if (!snapshot) return;
    inMemoryMap = attachRuntimeToSnapshot(snapshot);
    if (typeof window !== "undefined") {
      window.PulseOrganismMap = inMemoryMap;      // legacy global
      window.PulseOrganismMapV27 = inMemoryMap;   // new global
    }
  });

  if (typeof window !== "undefined") {
    window.PulseOrganismMap = inMemoryMap;
    window.PulseOrganismMapV27 = inMemoryMap;
  }

  return inMemoryMap;
}

/**
 * savePulseOrganismMapSnapshot
 * Called by your build tooling / admin tools to push a new snapshot
 * into IndexedDB (and into memory).
 */
export async function savePulseOrganismMapSnapshot(snapshot) {
  const normalized = Object.assign(
    {
      epoch: Date.now(),
      version: "v27.0-INSTANT-BINARY-MAP",
      systems: {},
      fileToMeta: {}
    },
    snapshot || {}
  );

  await idbSetMap(normalized);
  inMemoryMap = attachRuntimeToSnapshot(normalized);

  if (typeof window !== "undefined") {
    window.PulseOrganismMap = inMemoryMap;
    window.PulseOrganismMapV27 = inMemoryMap;
  }

  return inMemoryMap;
}
