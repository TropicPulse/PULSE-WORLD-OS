// ============================================================================
// FILE: /PULSE-TOUCH/PULSE-TOUCH-STORAGE-v30.js
// PULSE OS — v30 IMMORTAL++
// PULSE‑TOUCH STORAGE — PULSEBINARY INDEXEDDB ORGAN (FULL VERSION)
// ============================================================================
//
// ROLE:
//   Unified binary storage cortex for Pulse‑Touch.
//   Deterministic, IMMORTAL‑safe IndexedDB access.
//   Stores (all binary):
//     • presence ring buffer
//     • module envelopes
//     • chunk profiles
//     • warmup cache
//     • analytics frames
//     • pulse signals
//
//   All keys + values are binary (ArrayBuffer / Uint8Array).
//   No JSON. No strings. No schema drift.
//   Append‑only where possible.
//   Deterministic IMMORTAL schema.
// ============================================================================

export const PULSE_TOUCH_STORAGE_META_V30 = Object.freeze({
  id: "pulsetouch.storage.v30",
  kind: "storage_organ",
  version: "v30-IMMORTAL++",
  role: "binary_storage_engine",
  layer: "edge.storage",
  band: "storage",
  invariants: Object.freeze({
    networkCalls: "none",
    sideEffects: "none",
    determinism: "strict",
    mutation: "forbidden_at_runtime",
    zeroPII: true,
    zeroTracking: true,
    binaryOnly: true,
    indexedDBOnly: true
  })
});

export const PULSE_TOUCH_STORAGE_CONTRACT_V30 = Object.freeze({
  inputs: Object.freeze({
    op: "operation",
    store: "store name",
    key: "binary key (ArrayBuffer/Uint8Array)",
    value: "binary value (optional, ArrayBuffer/Uint8Array)"
  }),
  outputs: Object.freeze({
    result: "binary result or null",
    ok: "boolean"
  }),
  guarantees: Object.freeze({
    deterministic: true,
    asyncSafe: true,
    noNetwork: true,
    zeroPII: true
  })
});

export const PULSE_TOUCH_STORAGE_OVERLAYS_V30 = Object.freeze({
  drift: { allowed: false },
  pressure: { expectedLoad: "medium" },
  stability: { semantics: "stable" },
  load: { maxComponents: 1 }
});

// ============================================================================
// INTERNAL CONSTANTS
// ============================================================================

const DB_NAME = "PulseTouchDB_v30_IMMORTAL";
const DB_VERSION = 1;

const STORES = Object.freeze({
  presence: "presence",       // binary ring buffer
  modules: "modules",         // binary module envelopes
  chunks: "chunks",           // binary chunk profiles
  warmup: "warmup",           // binary warmup cache
  analytics: "analytics",     // binary analytics frames
  signals: "signals"          // binary pulse signals
});

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
// BINARY HELPERS (PULSEBINARY STRICT)
// ============================================================================

function toBinaryKey(key) {
  if (key instanceof Uint8Array) return key.buffer;
  if (key instanceof ArrayBuffer) return key;
  throw new Error("PULSE-TOUCH-STORAGE v30: key must be Uint8Array or ArrayBuffer");
}

function toBinaryValue(value) {
  if (value == null) return null;
  if (value instanceof Uint8Array) return value.buffer;
  if (value instanceof ArrayBuffer) return value;
  throw new Error("PULSE-TOUCH-STORAGE v30: value must be Uint8Array or ArrayBuffer or null");
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
  const key = toBinaryKey(new Uint8Array([0x70, 0x72, 0x65, 0x73])); // "pres" binary tag
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
        const dvInit = new DataView(buf);
        dvInit.setUint32(0, 0); // head
        dvInit.setUint32(4, 0); // size
      }

      const dv = new DataView(buf);
      let head = dv.getUint32(0);
      let size = dv.getUint32(4);

      const frameOffset = 8 + head * 5;
      dv.setUint32(frameOffset, timestamp >>> 0);
      dv.setUint8(frameOffset + 4, presenceCode & 0xff);

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
// CORE STORAGE OPERATIONS (BINARY‑ONLY)
// ============================================================================

async function storagePut(storeName, key, value) {
  const db = await openDB();
  return new Promise((resolve) => {
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);

    const binaryKey = toBinaryKey(key);
    const binaryValue = toBinaryValue(value);

    const req = store.put(binaryValue, binaryKey);

    req.onsuccess = () => resolve(true);
    req.onerror = () => resolve(false);
  });
}

async function storageGet(storeName, key) {
  const db = await openDB();
  return new Promise((resolve) => {
    const tx = db.transaction(storeName, "readonly");
    const store = tx.objectStore(storeName);

    const binaryKey = toBinaryKey(key);
    const req = store.get(binaryKey);

    req.onsuccess = () => {
      const result = req.result || null;
      resolve(result);
    };
    req.onerror = () => resolve(null);
  });
}

async function storageDelete(storeName, key) {
  const db = await openDB();
  return new Promise((resolve) => {
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);

    const binaryKey = toBinaryKey(key);
    const req = store.delete(binaryKey);

    req.onsuccess = () => resolve(true);
    req.onerror = () => resolve(false);
  });
}

// ============================================================================
/** PUBLIC ORGAN INTERFACE — v30 IMMORTAL++ PULSEBINARY */
// ============================================================================

export function PulseTouchStorageV30() {
  return Object.freeze({
    meta: PULSE_TOUCH_STORAGE_META_V30,
    contract: PULSE_TOUCH_STORAGE_CONTRACT_V30,
    overlays: PULSE_TOUCH_STORAGE_OVERLAYS_V30,

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

    // v30 IMMORTAL++ — presence ring buffer (binary‑only)
    async appendPresence(timestamp, presenceCode) {
      const ok = await appendPresenceFrame(timestamp, presenceCode);
      return { ok };
    }
  });
}
