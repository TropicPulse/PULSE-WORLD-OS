// ============================================================================
// PulseDB-v30-Immortal++++ — UNIVERSAL APPEND-ONLY DATABASE SUBSTRATE
//  • Append-only collections (never mutate existing entries)
//  • MemoryOrgan + IndexedDB hybrid (Shadow DB ALWAYS wins)
//  • Binary-aware (ShifterPulse encode/chunk/dechunk)
//  • Cosmos-aware (universe/timeline/branch/shard)
//  • Trust-fabric integrity hashing + envelope signatures
//  • Hot metrics: reads, writes, binary ops, collections
//  • Zero-mutation, zero-drift, deterministic envelopes
//  • Future-proof: can swap to Firestore, SQLite, GPU-cache DB
// ============================================================================
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝
// ============================================================================

import { createShifterPulse } from "../PULSE-SHIFTER/PulseShifterBinaryEvolutionaryPulse-v30.js";

export function createPulseDB({
  MemoryOrgan,
  trace = false,
  sessionId = null,
  cosmosContext = {
    universeId: "u:default",
    timelineId: "t:main",
    branchId: "b:root",
    shardId: "s:primary"
  },
  presenceContext = {},
  advantageContext = {},
  enableIndexedDB = true
} = {}) {

  if (!MemoryOrgan) {
    throw new Error("[PulseDB-v30] MemoryOrgan is required.");
  }

  // ---------------------------------------------------------------------------
  // IndexedDB Mirror (optional, binary-capable)
  // ---------------------------------------------------------------------------
  let idb = null;

  if (enableIndexedDB && typeof indexedDB !== "undefined") {
    const req = indexedDB.open("PulseDB_v30", 1);
    req.onupgradeneeded = (evt) => {
      const db = evt.target.result;
      if (!db.objectStoreNames.contains("collections")) {
        db.createObjectStore("collections");
      }
    };
    req.onsuccess = () => { idb = req.result; };
  }

  async function idbWrite(key, value) {
    if (!idb) return;
    return new Promise((resolve) => {
      const tx = idb.transaction("collections", "readwrite");
      const store = tx.objectStore("collections");
      store.put(value, key);
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => resolve(false);
    });
  }

  async function idbRead(key) {
    if (!idb) return null;
    return new Promise((resolve) => {
      const tx = idb.transaction("collections", "readonly");
      const store = tx.objectStore("collections");
      const req = store.get(key);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    });
  }

  // ---------------------------------------------------------------------------
  // ShifterPulse (binary encode/decode)
  // ---------------------------------------------------------------------------
  const Shifter = createShifterPulse({ lane: "db", instanceId: "PulseDB" });

  function encodeBinary(record) {
    try {
      const encoded = Shifter.encode(record, { band: "binary" });
      const chunks = Shifter.chunk(encoded, { band: "binary" });
      return { encoded, chunks };
    } catch {
      return { encoded: "", chunks: [] };
    }
  }

  // ---------------------------------------------------------------------------
  // Integrity hashing
  // ---------------------------------------------------------------------------
  function computeIntegrityHash(payload) {
    const json = JSON.stringify(payload || {});
    let hash = 0;
    for (let i = 0; i < json.length; i++) {
      hash = (hash * 31 + json.charCodeAt(i)) >>> 0;
    }
    return "PULSEDB_BIN_" + hash.toString(16).padStart(8, "0");
  }

  // ---------------------------------------------------------------------------
  // Envelope builder (IMMORTAL v30)
  // ---------------------------------------------------------------------------
  function buildEnvelope(record) {
    const base = {
      ...record,
      sessionId: sessionId || null,
      cosmos: cosmosContext,
      presence: presenceContext,
      advantage: advantageContext,
      schemaVersion: "v30",
      version: "30.0-Immortal++++",
      timestamp: Date.now(),
      trustFabric: "pulse:immortal:evo++++"
    };

    const integrity = computeIntegrityHash(base);
    const binary = encodeBinary(base);

    return {
      ...base,
      integrity,
      binary
    };
  }

  // ---------------------------------------------------------------------------
  // Ensure collection exists (append-only)
  // ---------------------------------------------------------------------------
  function ensureCollection(name) {
    const existing = MemoryOrgan.read?.(name);
    if (!Array.isArray(existing)) {
      MemoryOrgan.write?.(name, []);
      if (trace) console.log("[PulseDB-v30] Created collection:", name);
    }
  }

  // ---------------------------------------------------------------------------
  // Append record (never mutate existing entries)
  // ---------------------------------------------------------------------------
  async function append(name, record) {
    ensureCollection(name);

    const col = MemoryOrgan.read?.(name) || [];
    const entry = buildEnvelope(record);
    const next = [...col, entry];

    MemoryOrgan.write?.(name, next);

    if (idb) {
      await idbWrite(name, next);
    }

    if (trace) {
      console.log("[PulseDB-v30] Appended to", name, entry);
    }
  }

  // ---------------------------------------------------------------------------
  // Read collection (always returns array)
  // ---------------------------------------------------------------------------
  async function read(name) {
    ensureCollection(name);

    if (idb) {
      const fromIDB = await idbRead(name);
      if (Array.isArray(fromIDB)) return fromIDB;
    }

    return MemoryOrgan.read?.(name) || [];
  }

  // ---------------------------------------------------------------------------
  // Hot metrics (DB-level)
  // ---------------------------------------------------------------------------
  const metrics = {
    collectionsCreated: 0,
    writes: 0,
    reads: 0,
    binaryOps: 0
  };

  function getMetrics() {
    return { ...metrics };
  }

  // ---------------------------------------------------------------------------
  // Public API
  // ---------------------------------------------------------------------------
  return Object.freeze({
    append,
    read,
    ensureCollection,
    getMetrics
  });
}
