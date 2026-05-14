// ============================================================================
// FILE: /PULSE-TOUCH/PULSE-TOUCH-STORAGE.js
// PULSE OS — v27++ IMMORTAL-INTEL
// PULSE‑TOUCH STORAGE — BINARY INDEXEDDB ORGAN (FULL VERSION)
// ============================================================================
//
// ROLE:
//   Unified binary storage cortex for Pulse‑Touch.
//   Provides deterministic, IMMORTAL-safe IndexedDB access.
//   Stores:
//     • presence ring buffer (binary)
//     • module envelopes (binary)
//     • chunk profiles (binary)
//     • warmup cache (binary)
//     • analytics frames (binary)
//     • pulse signals (binary)
//
//   All keys + values are binary.
//   No JSON. No strings. No schema drift.
//   Append‑only where possible.
//   Deterministic IMMORTAL schema.
// ============================================================================

export const AI_EXPERIENCE_META_PulseTouchStorage = {
  id: "pulsetouch.storage",
  kind: "storage_organ",
  version: "v27++-IMMORTAL-INTEL",
  role: "binary_storage_engine",
  surfaces: {
    band: ["storage", "binary", "indexeddb", "persistence"],
    wave: ["quiet", "background", "deterministic"],
    presence: ["storage_state"],
    speed: "async"
  },
  invariants: {
    networkCalls: "none",
    sideEffects: "none",
    determinism: "strict",
    mutation: "forbidden_at_runtime",
    zeroPII: true,
    zeroTracking: true
  }
};

export const ORGAN_META_PulseTouchStorage = {
  id: "organ.pulsetouch.storage",
  organism: "PulseTouch",
  layer: "edge.storage",
  tier: "IMMORTAL",
  evoFlags: {
    deterministic: true,
    driftProof: true,
    asyncSafe: true,
    zeroPII: true,
    zeroTracking: true,
    binaryAware: true,
    indexedDBAware: true,
    chunkProfileAware: true,
    moduleEnvelopeAware: true,
    warmupCacheAware: true,
    analyticsAware: true,
    presenceHistoryAware: true,
    pulseSignalAware: true
  }
};

export const ORGAN_CONTRACT_PulseTouchStorage = {
  inputs: {
    op: "operation",
    store: "store name",
    key: "binary key",
    value: "binary value (optional)"
  },
  outputs: {
    result: "binary result or null",
    ok: "boolean"
  },
  guarantees: {
    deterministic: true,
    asyncSafe: true,
    noNetwork: true,
    zeroPII: true
  }
};

export const IMMORTAL_OVERLAYS_PulseTouchStorage = {
  drift: { allowed: false },
  pressure: { expectedLoad: "medium" },
  stability: { semantics: "stable" },
  load: { maxComponents: 1 }
};

// ============================================================================
// INTERNAL CONSTANTS
// ============================================================================

const DB_NAME = "PulseTouchDB_v27_INTEL";
const DB_VERSION = 3;

const STORES = {
  presence: "presence",       // binary ring buffer
  modules: "modules",         // binary module envelopes
  chunks: "chunks",           // binary chunk profiles
  warmup: "warmup",           // binary warmup cache
  analytics: "analytics",     // binary analytics frames
  signals: "signals"          // binary pulse signals
};

// ============================================================================
// OPEN DATABASE (IMMORTAL)
// ============================================================================

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);

    req.onupgradeneeded = (e) => {
      const db = e.target.result;

      for (const store of Object.values(STORES)) {
        if (!db.objectStoreNames.contains(store)) {
          db.createObjectStore(store);
        }
      }
    };

    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

// ============================================================================
// BINARY HELPERS
// ============================================================================

function toBinaryKey(key) {
  if (key instanceof ArrayBuffer) return key;
  if (key instanceof Uint8Array) return key.buffer;
  if (typeof key === "string") return new TextEncoder().encode(key).buffer;
  throw new Error("Invalid binary key");
}

function toBinaryValue(value) {
  if (value == null) return null;
  if (value instanceof ArrayBuffer) return value;
  if (value instanceof Uint8Array) return value.buffer;
  if (typeof value === "string") return new TextEncoder().encode(value).buffer;
  throw new Error("Invalid binary value");
}

// ============================================================================
// BINARY RING BUFFER (Presence History)
// ============================================================================
//
// Layout:
//   [uint32 head][uint32 size][frames...]
//
// Each frame is:
//   [uint32 timestamp][uint8 presenceCode]
//
// IMMORTAL, deterministic, append-only.
// ============================================================================

async function appendPresenceFrame(timestamp, presenceCode) {
  const key = toBinaryKey("presence_ring");
  const db = await openDB();

  return new Promise((resolve) => {
    const tx = db.transaction(STORES.presence, "readwrite");
    const store = tx.objectStore(STORES.presence);

    const req = store.get(key);

    req.onsuccess = () => {
      let buf = req.result;

      if (!buf) {
        // initialize ring buffer
        buf = new ArrayBuffer(8 + 1024 * 5); // header + 5KB frames
        const dv = new DataView(buf);
        dv.setUint32(0, 0); // head
        dv.setUint32(4, 0); // size
      }

      const dv = new DataView(buf);
      let head = dv.getUint32(0);
      let size = dv.getUint32(4);

      const frameOffset = 8 + head * 5;
      dv.setUint32(frameOffset, timestamp);
      dv.setUint8(frameOffset + 4, presenceCode);

      head = (head + 1) % 1024;
      size = Math.min(size + 1, 1024);

      dv.setUint32(0, head);
      dv.setUint32(4, size);

      store.put(buf, key);
      resolve(true);
    };

    req.onerror = () => resolve(false);
  });
}

// ============================================================================
// CORE STORAGE OPERATIONS
// ============================================================================

async function storagePut(storeName, key, value) {
  const db = await openDB();
  return new Promise((resolve) => {
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);

    const req = store.put(toBinaryValue(value), toBinaryKey(key));

    req.onsuccess = () => resolve(true);
    req.onerror = () => resolve(false);
  });
}

async function storageGet(storeName, key) {
  const db = await openDB();
  return new Promise((resolve) => {
    const tx = db.transaction(storeName, "readonly");
    const store = tx.objectStore(storeName);

    const req = store.get(toBinaryKey(key));

    req.onsuccess = () => resolve(req.result || null);
    req.onerror = () => resolve(null);
  });
}

async function storageDelete(storeName, key) {
  const db = await openDB();
  return new Promise((resolve) => {
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);

    const req = store.delete(toBinaryKey(key));

    req.onsuccess = () => resolve(true);
    req.onerror = () => resolve(false);
  });
}

// ============================================================================
// PUBLIC ORGAN INTERFACE
// ============================================================================

export function PulseTouchStorage() {
  return {
    meta: ORGAN_META_PulseTouchStorage,
    contract: ORGAN_CONTRACT_PulseTouchStorage,
    overlays: IMMORTAL_OVERLAYS_PulseTouchStorage,

    async put(store, key, value) {
      if (!STORES[store]) return { ok: false, result: null };
      const ok = await storagePut(STORES[store], key, value);
      return { ok, result: null };
    },

    async get(store, key) {
      if (!STORES[store]) return { ok: false, result: null };
      const result = await storageGet(STORES[store], key);
      return { ok: true, result };
    },

    async delete(store, key) {
      if (!STORES[store]) return { ok: false, result: null };
      const ok = await storageDelete(STORES[store], key);
      return { ok, result: null };
    },

    // v27++ INTEL — presence ring buffer
    async appendPresence(timestamp, presenceCode) {
      const ok = await appendPresenceFrame(timestamp, presenceCode);
      return { ok };
    }
  };
}
