/* ============================================================================
   PULSE-WORLD ORGAN — PulseWorldFirebaseShadow (v25++ SHADOW, MAP-DRIVEN)
   Frontend-safe "Firebase shadow" organ for Portal + Logger + Touch + RouteCarpet

   ROLE:
     - Provides SAFE access to Firebase-MIRRORED DATA via MAPS (no SDK)
     - Reads/writes via localStorage-backed firebase_map_* (delta-based)
     - Used for: logs, routes, snapshots, metadata, analytics
     - NOT used for: auth verification, privileged writes, admin tasks

   PLACEMENT:
     /PULSE-MULTIVERSE/PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PULSE-WORLD-FRONTEND/PulseWorldFirebaseShadow-v25.js

   NOTES:
     - This is the SHADOW organ (frontend mirror of backend FirebaseGenome)
     - All data flows through firebase_map_* and delta sync
     - Backend MAP + Admin SDK handle real Firebase writes
============================================================================ */

const C_ID   = "color:#8D6E63; font-weight:bold; font-family:monospace;";
const C_OK   = "color:#00FF9C; font-family:monospace;";
const C_INFO = "color:#E8F8FF; font-family:monospace;";
const C_WARN = "color:#FFE066; font-family:monospace;";
const C_ERR  = "color:#FF3B3B; font-weight:bold; font-family:monospace;";

export function getFetchAPI({ trace = false, routes } = {}) {
  const log = (msg, data) => trace && console.log(`[OrganismMap:fetch] ${msg}`, data);

  const meta = Object.freeze({
    layer: "PulseFetchAPI",
    role: "NETWORK_ADAPTER",
    version: "25.2-IMMORTAL-WORLD",
    evo: {
      deterministicField: true,
      unifiedAdvantageField: true,
      driftProof: true,
      multiInstanceReady: true,
      dualMode: true,
      binaryAware: true,
      symbolicAware: true,
      presenceAware: true,
      bandAware: true,
      worldAware: true,
      zeroMutation: true,
      zeroExternalMutation: true,
      zeroRoutingInfluence: true,
      safeRouteFree: true
    }
  });

  async function fetchViaRoute(url, options = {}) {
    log("fetchViaRoute", { url, options });

    try {
      const route = await routes.resolve(url);

      const opts = {
        method: options.method || "GET",
        headers: Object.assign({}, options.headers || {}),
        body: options.body || null
      };

      const result = await routes.fetchThroughRoute(route, opts);
      return Object.freeze({ ...result, meta });

    } catch (err) {
      return Object.freeze({
        ok: false,
        error: err?.message || "fetch_via_route_failed",
        meta
      });
    }
  }

  return Object.freeze({
    fetch: fetchViaRoute,
    meta
  });
}

function nowEpoch() {
  return Date.now();
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function hourKeyISO() {
  return new Date().toISOString().slice(0, 13); // "YYYY-MM-DDTHH"
}

// Collection names in MAP (mirroring Firebase)
const COL_PAGE_ROUTES       = "pulse_page_routes";
const COL_ORGANISM_SNAPSHOT = "pulse_organism_snapshot";
const COL_LOGS              = "pulse_logs";
const COL_SYSTEM_SNAPSHOTS  = "pulse_system_snapshots"; // system snapshots
const FS_JSON_ROOT          = "pulse_json_storage";     // virtual "storage" in fs map

// Helper: get doc ID for system latest + history
function systemLatestId(systemName) {
  return `${systemName}::latest`;
}

function systemHistoryId(systemName, epoch) {
  return `${systemName}::history::${epoch}`;
}

// ---------------------------------------------------------------------------
// LOCALSTORAGE MAP HELPERS (READ + DELTA WRITE)
// ---------------------------------------------------------------------------

function readCollection(collection) {
  const key = `firebase_map_${collection}`;
  const raw = localStorage.getItem(key);
  if (!raw) return [];
  try { return JSON.parse(raw); } catch { return []; }
}

function writeCollectionWithDelta(collection, newArr) {
  const key = `firebase_map_${collection}`;
  const raw = localStorage.getItem(key);
  const oldArr = raw ? JSON.parse(raw) : [];

  const delta = [];
  const index = new Map(oldArr.map(x => [x.id, x]));

  for (const doc of newArr) {
    const old = index.get(doc.id);
    if (!old || JSON.stringify(old) !== JSON.stringify(doc)) {
      delta.push(doc);
    }
  }

  if (delta.length > 0) {
    localStorage.setItem(key, JSON.stringify(newArr));
    window.dispatchEvent(new CustomEvent("firebase_delta_out", {
      detail: { collection, delta }
    }));
  }

  return delta;
}

function getDocument(collection, id) {
  return readCollection(collection).find(x => x.id === id) || null;
}

function setDocument(collection, id, value) {
  const arr = readCollection(collection);
  const idx = arr.findIndex(x => x.id === id);
  if (idx >= 0) arr[idx] = { ...value, id };
  else arr.push({ ...value, id });
  return writeCollectionWithDelta(collection, arr);
}

// FS-style helper for JSON “storage”
function writeFsFile(path, content) {
  const key = `firebase_fs_${path}`;
  localStorage.setItem(key, content);
  window.dispatchEvent(new CustomEvent("firebase_fs_delta_out", {
    detail: { path, content }
  }));
}// ============================================================================
// SHADOW ORGAN API (LIMITED + FIRST-RUN CLEAR)
// ============================================================================

// ⭐ FIRST-RUN CLEAR (Shadow-only)
(function shadowFirstRunClear() {
  const FLAG = "__SHADOW_CLEARED_V25__";

  // Already cleared once → skip
  if (localStorage.getItem(FLAG)) return;

  const shadowPrefixes = [
    "FS_JSON_",
    "PAGE_ROUTES_",
    "ORGANISM_SNAPSHOT_",
    "SYS_",
    "LOG_"
  ];

  const keys = Object.keys(localStorage);

  for (const key of keys) {
    if (shadowPrefixes.some(prefix => key.startsWith(prefix))) {
      localStorage.removeItem(key);
      console.log("🧹 [Shadow] Cleared key →", key);
    }
  }

  // Mark as cleared so it never clears again
  localStorage.setItem(FLAG, "1");

  console.log("🔥 [Shadow] First-run storage clear complete");
})();


// ============================================================================
// SHADOW ORGAN (LIMITED MODE)
// ============================================================================
export const PulseWorldFirebaseShadow = Object.freeze({

  // ⭐ Save daily route map (Portal) — MINIMAL WRITE
  async savePageRoutes(page, routes) {
    try {
      setDocument(COL_PAGE_ROUTES, page, {
        routes,
        epoch: nowEpoch()
      });
      console.log("[Shadow LIMITED] Saved page routes →", page);
    } catch (err) {
      console.error("[Shadow LIMITED] FAILED savePageRoutes →", err);
    }
  },

  // ⭐ Load page routes — SAFE
  async loadPageRoutes(page) {
    try {
      return getDocument(COL_PAGE_ROUTES, page) || null;
    } catch (err) {
      console.error("[Shadow LIMITED] FAILED loadPageRoutes →", err);
      return null;
    }
  },

  // ⭐ Save organism snapshot — MINIMAL WRITE (NO HISTORY)
  async saveOrganismSnapshot(snapshot) {
    try {
      setDocument(COL_ORGANISM_SNAPSHOT, "daily", {
        snapshot,
        epoch: nowEpoch()
      });
      console.log("[Shadow LIMITED] Saved organism snapshot");
    } catch (err) {
      console.error("[Shadow LIMITED] FAILED saveOrganismSnapshot →", err);
    }
  },

  // ⭐ Load organism snapshot — SAFE
  async loadOrganismSnapshot() {
    try {
      return getDocument(COL_ORGANISM_SNAPSHOT, "daily") || null;
    } catch (err) {
      console.error("[Shadow LIMITED] FAILED loadOrganismSnapshot →", err);
      return null;
    }
  },

  // ⭐ Log event — DISABLED (NO QUOTA WASTE)
  async logEvent(type, payload) {
    // Logging disabled to prevent quota spam
  },

  // ⭐ Save per-system snapshot — MINIMAL (NO HISTORY)
  async saveSystemSnapshot(systemName, snapshot) {
    try {
      const latestId = systemLatestId(systemName);

      setDocument(COL_SYSTEM_SNAPSHOTS, latestId, {
        system: systemName,
        snapshot,
        epoch: nowEpoch()
      });

      console.log(`[Shadow LIMITED] Saved system snapshot → ${systemName}`);
    } catch (err) {
      console.error("[Shadow LIMITED] FAILED saveSystemSnapshot →", err);
    }
  },

  // ⭐ Load latest system snapshot — SAFE
  async loadSystemSnapshot(systemName) {
    try {
      return getDocument(COL_SYSTEM_SNAPSHOTS, systemLatestId(systemName)) || null;
    } catch (err) {
      console.error("[Shadow LIMITED] FAILED loadSystemSnapshot →", err);
      return null;
    }
  },

  // ⭐ Save JSON — MINIMAL
  async saveJSON(path, obj) {
    try {
      writeFsFile(`${FS_JSON_ROOT}/${path}`, JSON.stringify(obj));
      console.log("[Shadow LIMITED] Saved JSON →", path);
    } catch (err) {
      console.error("[Shadow LIMITED] FAILED saveJSON →", err);
    }
  }
});



// ============================================================================
// GLOBAL ATTACHMENT
// ============================================================================


console.log(
  "%c[PulseFirebaseShadow v25] %cSHADOW organ %c→ %s",
  C_ID, C_INFO, C_OK, "Ready (LOCALSTORAGE MAP, NO SDK, DELTA-SYNCED)"
);
// ============================================================================
// FIREBASE SHADOW COMPATIBILITY LAYER (v25++)
// Makes old pages using Firebase-style calls still work.
// ============================================================================

// Fake "firestore" root object
export const firestore = {
  _type: "shadow-firestore"
};

// Fake Doc() → returns a simple path descriptor
export function Doc(_firestore, collection, id) {
  return { collection, id };
}

// Fake Collection() → returns collection name
export function Collection(_firestore, collection) {
  return collection;
}

// Fake GetDoc() → reads from localStorage MAP
export async function GetDoc(docRef) {
  const { collection, id } = docRef;
  const data = getDocument(collection, id);
  return {
    exists: () => !!data,
    data: () => data
  };
}

// Fake SetDoc() → writes to localStorage MAP + delta
export async function SetDoc(docRef, value) {
  const { collection, id } = docRef;
  setDocument(collection, id, value);
}

// Fake UpdateDoc() → merges into existing doc
export async function UpdateDoc(docRef, value) {
  const { collection, id } = docRef;
  const existing = getDocument(collection, id) || {};
  setDocument(collection, id, { ...existing, ...value });
}

// ============================================================================
// STORAGE SHADOW (FS MAP)
// ============================================================================

export const Storage = {
  _type: "shadow-storage"
};

export function StorageRef(_storage, path) {
  return { path };
}

export async function UploadString(ref, content) {
  writeFsFile(ref.path, content);
}
// ============================================================================
// GLOBAL DB + FS COMPATIBILITY (v25++ MAP-DRIVEN)
// Makes ALL legacy pages automatically use the new Shadow DB.
// ============================================================================
// ============================================================================
// UNIVERSAL GLOBAL DB + FS BROADCAST (v25++ IMMORTAL)
// Makes EVERY legacy reference (window/globalThis/global/self) identical.
// ============================================================================

// Build the DB object once
const ShadowDB = {
  getDocument,
  setDocument,
  readCollection,
  writeCollectionWithDelta
};

// Build the Firestore-compat object once
const ShadowFirestore = { _type: "shadow-firestore" };

// Build the Storage-compat object once
const ShadowStorage = { _type: "shadow-storage" };

// Build the helper bundle once
const ShadowHelpers = {
  Doc,
  Collection,
  GetDoc,
  SetDoc,
  UpdateDoc,
  StorageRef,
  UploadString
};

// List of ALL global surfaces we must support
const GLOBAL_SURFACES = [
  window,
  globalThis,
  self,
  (typeof global !== "undefined" ? global : null)
].filter(Boolean);

// Broadcast to ALL surfaces
for (const g of GLOBAL_SURFACES) {
  g.db = ShadowDB;

  g.firestore = ShadowFirestore;

  g.Doc = Doc;
  g.Collection = Collection;
  g.GetDoc = GetDoc;
  g.SetDoc = SetDoc;
  g.UpdateDoc = UpdateDoc;
  g.fetchfn = getFetchAPI;
  g.Storage = ShadowStorage;
  g.StorageRef = StorageRef;
  g.UploadString = UploadString;
}

console.log("%c[ShadowDB] UNIVERSAL GLOBAL DB + FS compatibility layer ACTIVE", C_OK);

window.PulseWorldFirebaseShadow = PulseWorldFirebaseShadow;