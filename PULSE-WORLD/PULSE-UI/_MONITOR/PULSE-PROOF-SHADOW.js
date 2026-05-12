/* ============================================================================
   PULSE-WORLD ORGAN — PulseWorldFirebaseShadow (v25++ SHADOW, MAP-DRIVEN)
   Frontend-safe "Firebase shadow" organ for Portal + Logger + Touch + RouteCarpet

   ROLE:
     - Provides SAFE access to Firebase-MIRRORED DATA via MAPS (no SDK)
     - Reads/writes via localStorage-backed firebase_map_* (delta-based)
     - Used for: logs, routes, snapshots, metadata, analytics
     - NOT used for: auth verification, privileged writes, admin tasks

   PLACEMENT:
     /PULSE-WORLD/PULSE-WORLD-FRONTEND/PulseWorldFirebaseShadow-v25.js

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
}

// ============================================================================
// SHADOW ORGAN API (MAP-DRIVEN, NO FIREBASE SDK, LOCALSTORAGE-BASED)
// ============================================================================
export const PulseWorldFirebaseShadow = Object.freeze({

  // ⭐ Save daily route map (Portal)
  async savePageRoutes(page, routes) {
    try {
      const payload = {
        date: todayISO(),
        routes,
        epoch: nowEpoch()
      };

      setDocument(COL_PAGE_ROUTES, page, payload);
      console.log("[FirebaseShadow v25] Saved page routes →", page);
    } catch (err) {
      console.error("[FirebaseShadow v25] FAILED savePageRoutes →", err);
    }
  },

  // ⭐ Load page routes (Portal)
  async loadPageRoutes(page) {
    try {
      const doc = getDocument(COL_PAGE_ROUTES, page);
      return doc || null;
    } catch (err) {
      console.error("[FirebaseShadow v25] FAILED loadPageRoutes →", err);
      return null;
    }
  },

  // ⭐ Save daily organism snapshot (OrganismMap)
  async saveOrganismSnapshot(snapshot) {
    try {
      const payload = {
        epoch: nowEpoch(),
        snapshot
      };

      setDocument(COL_ORGANISM_SNAPSHOT, "daily", payload);
      console.log("[FirebaseShadow v25] Saved organism snapshot");
    } catch (err) {
      console.error("[FirebaseShadow v25] FAILED saveOrganismSnapshot →", err);
    }
  },

  // ⭐ Load organism snapshot
  async loadOrganismSnapshot() {
    try {
      const doc = getDocument(COL_ORGANISM_SNAPSHOT, "daily");
      return doc || null;
    } catch (err) {
      console.error("[FirebaseShadow v25] FAILED loadOrganismSnapshot →", err);
      return null;
    }
  },

  // ⭐ Log event (Logger)
  async logEvent(type, payload) {
    try {
      const id = String(nowEpoch());
      const doc = {
        type,
        payload,
        epoch: nowEpoch()
      };

      setDocument(COL_LOGS, id, doc);
      console.log("[FirebaseShadow v25] Logged event →", type);
    } catch (err) {
      console.error("[FirebaseShadow v25] FAILED logEvent →", err);
    }
  },

  // ⭐ Save per-system organism snapshot (hourly)
  async saveSystemSnapshot(systemName, snapshot) {
    try {
      const epoch = nowEpoch();
      const hourKey = hourKeyISO();

      const latestId = systemLatestId(systemName);
      const latest = getDocument(COL_SYSTEM_SNAPSHOTS, latestId);

      // Archive previous snapshot into history
      if (latest && latest.epoch) {
        const historyId = systemHistoryId(systemName, latest.epoch);
        setDocument(COL_SYSTEM_SNAPSHOTS, historyId, latest);
      }

      const newLatest = {
        system: systemName,
        epoch,
        hour: hourKey,
        snapshot
      };

      setDocument(COL_SYSTEM_SNAPSHOTS, latestId, newLatest);
      console.log(`[FirebaseShadow v25] Saved system snapshot → ${systemName}`);
    } catch (err) {
      console.error("[FirebaseShadow v25] FAILED saveSystemSnapshot →", err);
    }
  },

  // ⭐ Load latest system snapshot
  async loadSystemSnapshot(systemName) {
    try {
      const latestId = systemLatestId(systemName);
      const doc = getDocument(COL_SYSTEM_SNAPSHOTS, latestId);
      return doc || null;
    } catch (err) {
      console.error("[FirebaseShadow v25] FAILED loadSystemSnapshot →", err);
      return null;
    }
  },

  // ⭐ Save JSON to "Storage" (actually FS MAP via localStorage)
  async saveJSON(path, obj) {
    try {
      const fullPath = `${FS_JSON_ROOT}/${path}`;
      const content = JSON.stringify(obj);

      writeFsFile(fullPath, content);
      console.log("[FirebaseShadow v25] Saved JSON →", fullPath);
    } catch (err) {
      console.error("[FirebaseShadow v25] FAILED saveJSON →", err);
    }
  }
});

// ============================================================================
// GLOBAL ATTACHMENT
// ============================================================================
window.PulseWorldFirebaseShadow = PulseWorldFirebaseShadow;

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
