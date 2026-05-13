// ============================================================================
//  PulsePresenceNormalizer-SMART v3.0++ (v27 IMMORTAL UPGRADE)
//  Contract-driven bridge: A → Z
//  No guessing. No heuristics. No fallback decoding.
//  Fully aligned with PulseChunks-v27-IMMORTAL
//  v27 IMMORTAL++: IndexedDB + in-memory mesh of ALL normalization events
//  + Session-aware, replay-aware, route-aware, organ-aware
//  + PulseImport / PulseExport / subimport / tier-aware module normalization
// ============================================================================

/*
AI_EXPERIENCE_META = {
  identity: "PulsePresenceNormalizer",
  version: "v27-Immortal-SMART-HYBRID++",
  layer: "frontend",
  role: "chunk_normalizer",
  lineage: "PulseOS-v27++",

  evo: {
    binaryAware: true,
    chunkAligned: true,
    dualBand: true,
    presenceAware: true,
    safeRouteFree: true,
    smartNormalizer: true,
    unwrapOneLayer: true,

    // IMMORTAL++
    offlineFirst: true,
    idbBacked: true,
    replayAware: true,
    modeAgnostic: true,
    dnaAware: true,
    meshMemoryAligned: true,
    sessionAware: true,
    routeAware: true,
    organAware: true,
    crossTabSynced: true,

    // NEW v27+++
    pulseImportAware: true,
    pulseExportAware: true,
    subimportAware: true,
    tierAware: true,
    chunkProfileAware: true,
    moduleMeshAware: true
  },

  contract: {
    always: [
      "PulseChunks",
      "PulsePresence",
      "PulseWindow",
      "PulseUIFlow",
      "PulseUIErrors"
    ],
    never: [
      "legacyNormalizer",
      "legacyDecode",
      "legacyPresence",
      "safeRoute",
      "fetchViaCNS"
    ]
  }
}
*/

const G =
  (typeof window !== "undefined" && window) ||
  (typeof globalThis !== "undefined" && globalThis) ||
  (typeof self !== "undefined" && self) ||
  (typeof global !== "undefined" && global) ||
  {};
const g = G;

// ============================================================================
// UNIVERSAL TIMESTAMP (Shadow or Admin)
// ============================================================================

const Timestamp =
  (G.firebaseAdmin && G.firebaseAdmin.firestore && G.firebaseAdmin.firestore.Timestamp) ||
  (G.Timestamp && G.Timestamp) ||
  null;

// ============================================================================
// UNIVERSAL ADMIN (Shadow or Admin)
// ============================================================================

const admin =
  (G.firebaseAdmin && G.firebaseAdmin) ||
  (G.admin && G.admin) ||
  null;

// ============================================================================
// UNIVERSAL DB (Shadow DB ALWAYS wins)
// ============================================================================
const db =
  (G.db && G.db) ||                 // Shadow DB (v25++)
  (admin && admin.firestore && admin.firestore()) || // Admin fallback
  null;

// ============================================================================
// UNIVERSAL LOGGING
// ============================================================================

const dblog =
  (G.log && G.log) ||
  console.log;

const dberror =
  (G.error && G.error) ||
  console.error;

const fetchFn =
  (G.fetchfn && typeof G.fetchfn === "function" && G.fetchfn) ||   // Shadow fetch alias
  (G.fetch && typeof G.fetch === "function" && G.fetch) ||         // Global broadcasted Shadow.fetch
  null;

// ============================================================================
//  IMMORTAL INDEXEDDB + MEMORY MESH — v27++
//  PulsePresenceNormalizerStore v27++
// ============================================================================

const PN_DB_NAME = "PulsePresenceNormalizerDB_v27";
const PN_STORE_NAME = "presence";
const PN_MEM_MAX = 1000; // in-memory tail for fast access

// In-memory ring buffer (per tab)
let pnMemBuffer = [];

// Session + route tagging
const PN_SESSION_ID = (() => {
  try {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      return crypto.randomUUID();
    }
  } catch {}
  return "sess-" + Math.random().toString(36).slice(2);
})();

function getCurrentRouteTag() {
  try {
    if (g.PulseRoute && typeof g.PulseRoute === "string") return g.PulseRoute;
    if (typeof window !== "undefined" && window.PulseRoute) return window.PulseRoute;
    if (typeof location !== "undefined" && location.pathname) return location.pathname;
  } catch {}
  return null;
}

// IndexedDB open helper
function openPresenceDB() {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === "undefined") {
      resolve(null);
      return;
    }

    const req = indexedDB.open(PN_DB_NAME, 1);

    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(PN_STORE_NAME)) {
        const store = db.createObjectStore(PN_STORE_NAME, {
          keyPath: "id",
          autoIncrement: true
        });
        store.createIndex("ts", "ts", { unique: false });
      }
    };

    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

// Load tail from IndexedDB into memory
async function loadPresenceTailFromDB(limit = PN_MEM_MAX) {
  try {
    const db = await openPresenceDB();
    if (!db) return [];

    const tx = db.transaction(PN_STORE_NAME, "readonly");
    const store = tx.objectStore(PN_STORE_NAME);
    const index = store.index("ts");

    const results = [];
    const req = index.openCursor(null, "prev"); // newest first

    return await new Promise((resolve) => {
      req.onsuccess = () => {
        const cursor = req.result;
        if (!cursor || results.length >= limit) {
          resolve(results.reverse()); // oldest first in memory
          return;
        }
        results.push(cursor.value);
        cursor.continue();
      };
      req.onerror = () => {
        resolve([]);
      };
    });
  } catch {
    return [];
  }
}

// Append a single record to IndexedDB (fire-and-forget)
function appendPresenceRecordToDB(entry) {
  (async () => {
    try {
      const db = await openPresenceDB();
      if (!db) return;

      const tx = db.transaction(PN_STORE_NAME, "readwrite");
      const store = tx.objectStore(PN_STORE_NAME);
      store.add(entry);

      tx.oncomplete = () => {};
      tx.onerror = () => {};
    } catch {
      // never throw
    }
  })();
}

// Get all records from IndexedDB (bounded by optional limit)
async function getAllPresenceFromDB(limit = 4000) {
  try {
    const db = await openPresenceDB();
    if (!db) return [];

    const tx = db.transaction(PN_STORE_NAME, "readonly");
    const store = tx.objectStore(PN_STORE_NAME);
    const index = store.index("ts");

    const results = [];
    const req = index.openCursor(null, "next");

    return await new Promise((resolve) => {
      req.onsuccess = () => {
        const cursor = req.result;
        if (!cursor) {
          resolve(
            results.length > limit ? results.slice(results.length - limit) : results
          );
          return;
        }
        results.push(cursor.value);
        cursor.continue();
      };
      req.onerror = () => {
        resolve([]);
      };
    });
  } catch {
    return [];
  }
}

// Clear all presence records from IndexedDB
function clearPresenceDB() {
  (async () => {
    try {
      const db = await openPresenceDB();
      if (!db) return;

      const tx = db.transaction(PN_STORE_NAME, "readwrite");
      const store = tx.objectStore(PN_STORE_NAME);
      store.clear();

      tx.oncomplete = () => {};
      tx.onerror = () => {};
    } catch {
      // never throw
    }
  })();
}

// Initial load into memory
(async () => {
  try {
    const tail = await loadPresenceTailFromDB(PN_MEM_MAX);
    pnMemBuffer = tail;
  } catch {
    pnMemBuffer = [];
  }
})();

// No storage events needed: IndexedDB is multi-tab safe by design

function appendPresenceRecord(kind, payload) {
  const entry = {
    ts: Date.now(),
    kind,
    payload,
    sessionId: PN_SESSION_ID,
    route: getCurrentRouteTag(),
    organ: "PulsePresenceNormalizer",
    version: "v27++"
  };

  // In-memory
  pnMemBuffer.push(entry);
  if (pnMemBuffer.length > PN_MEM_MAX) {
    pnMemBuffer = pnMemBuffer.slice(pnMemBuffer.length - PN_MEM_MAX);
  }

  // IndexedDB (async, non-blocking)
  appendPresenceRecordToDB(entry);

  // Optional external db logging (if present)
  try {
    if (db && typeof db.log === "function") {
      db.log("PulsePresenceNormalizer", entry);
    }
  } catch {
    // never throw
  }
}

export const PulsePresenceNormalizerStore = {
  async getAll() {
    return await getAllPresenceFromDB(4000);
  },
  tail(n = 200) {
    const buf = pnMemBuffer || [];
    return buf.slice(Math.max(0, buf.length - n));
  },
  clear() {
    pnMemBuffer = [];
    clearPresenceDB();
  },
  sessionId() {
    return PN_SESSION_ID;
  }
};

// ============================================================================
//  TYPE INTROSPECTION HELPERS
// ============================================================================
function describeValueType(value) {
  if (value === null) return "null";
  const t = typeof value;
  if (t !== "object") return t;
  if (value instanceof Uint8Array) return "Uint8Array";
  if (value instanceof ArrayBuffer) return "ArrayBuffer";
  if (value instanceof Blob) return "Blob";
  if (Array.isArray(value)) return "array";
  return "object";
}

// ============================================================================
//  SMART: unwrap ONLY ONE LAYER (v27 IMMORTAL++)
//  Backend must declare the shape. No recursive peeling.
// ============================================================================
function unwrap(value) {
  appendPresenceRecord("unwrap_in", {
    type: describeValueType(value)
  });

  if (!value || typeof value !== "object") {
    appendPresenceRecord("unwrap_out", { type: describeValueType(value) });
    return value;
  }

  let out = value;

  if (value.__dna !== undefined) out = value.__dna;
  else if (value.__chunk !== undefined) out = value.__chunk;
  else if (value.data !== undefined) out = value.data;
  else if (value.chunk !== undefined) out = value.chunk;
  else if (value.value !== undefined) out = value.value;

  appendPresenceRecord("unwrap_out", { type: describeValueType(out) });
  return out;
}

// ============================================================================
//  SMART IMAGE CONSTRUCTOR — A → Z (image) — v27 IMMORTAL++
// ============================================================================
export function normalizeImage(value, mime = "image/png") {
  appendPresenceRecord("normalizeImage_in", {
    type: describeValueType(value),
    mime
  });

  value = unwrap(value);

  let out = null;

  if (typeof value === "string") {
    out = value;
  } else if (value && typeof value.base64 === "string") {
    out = `data:${mime};base64,${value.base64}`;
  } else if (value instanceof Uint8Array) {
    try {
      out = URL.createObjectURL(new Blob([value], { type: mime }));
    } catch {
      out = null;
    }
  } else if (value instanceof ArrayBuffer) {
    try {
      out = URL.createObjectURL(new Blob([new Uint8Array(value)], { type: mime }));
    } catch {
      out = null;
    }
  } else if (value instanceof Blob) {
    try {
      out = URL.createObjectURL(value);
    } catch {
      out = null;
    }
  } else if (value && typeof value.url === "string") {
    out = value.url;
  }

  appendPresenceRecord("normalizeImage_out", {
    outType: describeValueType(out),
    out
  });
  return out;
}

// ============================================================================
//  SMART TEXT / HTML / CSS / JS — v27 IMMORTAL++
// ============================================================================
function normalizeText(value) {
  appendPresenceRecord("normalizeText_in", {
    type: describeValueType(value)
  });

  value = unwrap(value);
  const out = typeof value === "string" ? value : null;

  appendPresenceRecord("normalizeText_out", {
    outType: describeValueType(out)
  });
  return out;
}

// ============================================================================
//  SMART JSON — v27 IMMORTAL++
// ============================================================================
function normalizeJSON(value) {
  appendPresenceRecord("normalizeJSON_in", {
    type: describeValueType(value)
  });

  value = unwrap(value);
  const out = typeof value === "object" && value !== null ? value : null;

  appendPresenceRecord("normalizeJSON_out", {
    outType: describeValueType(out)
  });
  return out;
}

// ============================================================================
//  SMART BINARY — v27 IMMORTAL++
// ============================================================================
function normalizeBinary(value, mime = "application/octet-stream") {
  appendPresenceRecord("normalizeBinary_in", {
    type: describeValueType(value),
    mime
  });

  value = unwrap(value);

  let out = null;

  if (value instanceof Uint8Array) {
    try {
      out = new Blob([value], { type: mime });
    } catch {
      out = null;
    }
  } else if (value instanceof ArrayBuffer) {
    try {
      out = new Blob([new Uint8Array(value)], { type: mime });
    } catch {
      out = null;
    }
  } else if (value instanceof Blob) {
    out = value;
  }

  appendPresenceRecord("normalizeBinary_out", {
    outType: describeValueType(out)
  });
  return out;
}

// ============================================================================
//  SMART UNIVERSAL NORMALIZER — v27 IMMORTAL++
// ============================================================================
export function normalizeChunkValue(value, typeHint = null, options = {}) {
  appendPresenceRecord("normalizeChunkValue_in", {
    type: describeValueType(value),
    typeHint,
    options
  });

  const mime = options.mime || "application/octet-stream";
  let out = null;

  switch (typeHint) {
    case "image":
      out = normalizeImage(value, mime);
      break;

    case "html":
    case "css":
    case "js":
      out = normalizeText(value);
      break;

    case "json":
      out = normalizeJSON(value);
      break;

    case "binary":
      out = normalizeBinary(value, mime);
      break;

    default:
      out = unwrap(value);
      break;
  }

  appendPresenceRecord("normalizeChunkValue_out", {
    outType: describeValueType(out)
  });
  return out;
}

// ============================================================================
//  PULSEIMPORT / PULSEEXPORT / MODULE NORMALIZATION — v27 IMMORTAL++
// ============================================================================

// Expected chunk envelope shape (example, not enforced here):
// {
//   module: <any>,                // raw module body (function, object, etc.)
//   meta: {
//     typeHint: "js" | "json" | ...,
//     exports: [
//       { name, tier: "local"|"organism"|"global"|"system", kind: "value"|"function"|"class" },
//       ...
//     ],
//     imports: [
//       { name, from, layer, required: true|false },
//       ...
//     ],
//     subimports: { ... },        // optional subimport map
//     chunkProfile: { ... },      // optional chunk profile
//     lineage: { ... }            // optional lineage
//   }
// }

const VALID_EXPORT_TIERS = ["local", "organism", "global", "system"];

function normalizeExportTier(tier) {
  if (!tier || typeof tier !== "string") return "local";
  const lower = tier.toLowerCase();
  return VALID_EXPORT_TIERS.includes(lower) ? lower : "local";
}

function normalizeExportsMeta(exportsMetaRaw) {
  if (!exportsMetaRaw || !Array.isArray(exportsMetaRaw)) return [];

  const normalized = exportsMetaRaw.map((e) => {
    const name = typeof e?.name === "string" ? e.name : null;
    if (!name) return null;

    return {
      name,
      tier: normalizeExportTier(e.tier),
      kind: typeof e.kind === "string" ? e.kind : "value"
    };
  }).filter(Boolean);

  appendPresenceRecord("normalizeExportsMeta", {
    count: normalized.length
  });

  return normalized;
}

function normalizeImportsMeta(importsMetaRaw) {
  if (!importsMetaRaw || !Array.isArray(importsMetaRaw)) return [];

  const normalized = importsMetaRaw.map((i) => {
    const name = typeof i?.name === "string" ? i.name : null;
    const from = typeof i?.from === "string" ? i.from : null;
    if (!name || !from) return null;

    return {
      name,
      from,
      layer: typeof i.layer === "string" ? i.layer : null,
      required: i.required === true
    };
  }).filter(Boolean);

  appendPresenceRecord("normalizeImportsMeta", {
    count: normalized.length
  });

  return normalized;
}

function normalizeSubimportsMap(subimportsRaw) {
  if (!subimportsRaw || typeof subimportsRaw !== "object") return null;
  appendPresenceRecord("normalizeSubimportsMap", {
    keys: Object.keys(subimportsRaw || {})
  });
  return subimportsRaw;
}

function normalizeChunkProfile(profileRaw) {
  if (!profileRaw || typeof profileRaw !== "object") return null;
  appendPresenceRecord("normalizeChunkProfile", {
    keys: Object.keys(profileRaw || {})
  });
  return profileRaw;
}

// Core: normalize a module chunk for PulseImport
export function normalizeModuleChunk(chunkEnvelope) {
  appendPresenceRecord("normalizeModuleChunk_in", {
    type: describeValueType(chunkEnvelope)
  });

  if (!chunkEnvelope || typeof chunkEnvelope !== "object") {
    appendPresenceRecord("normalizeModuleChunk_out", {
      error: "invalid_envelope"
    });
    return {
      module: null,
      exportsMeta: [],
      importsMeta: [],
      subimports: null,
      chunkProfile: null,
      lineage: null
    };
  }

  const meta = chunkEnvelope.meta || {};
  const typeHint = meta.typeHint || null;

  // 1) Normalize raw module body (one-layer unwrap + type-aware)
  const rawModule = chunkEnvelope.module !== undefined
    ? chunkEnvelope.module
    : chunkEnvelope.value !== undefined
    ? chunkEnvelope.value
    : chunkEnvelope;

  const normalizedModule = normalizeChunkValue(rawModule, typeHint, meta.options || {});

  // 2) Normalize exports / imports / subimports / chunkProfile
  const exportsMeta = normalizeExportsMeta(meta.exports);
  const importsMeta = normalizeImportsMeta(meta.imports);
  const subimports = normalizeSubimportsMap(meta.subimports);
  const chunkProfile = normalizeChunkProfile(meta.chunkProfile);
  const lineage = typeof meta.lineage === "object" ? meta.lineage : null;

  appendPresenceRecord("normalizeModuleChunk_out", {
    moduleType: describeValueType(normalizedModule),
    exportsCount: exportsMeta.length,
    importsCount: importsMeta.length,
    hasSubimports: !!subimports,
    hasChunkProfile: !!chunkProfile
  });

  return {
    module: normalizedModule,
    exportsMeta,
    importsMeta,
    subimports,
    chunkProfile,
    lineage
  };
}

// Helper: extract export tier map for PulseImport / Portal / Bridge
export function extractPulseExportTiers(exportsMeta) {
  const tiers = {
    local: [],
    organism: [],
    global: [],
    system: []
  };

  (exportsMeta || []).forEach((e) => {
    const tier = normalizeExportTier(e.tier);
    tiers[tier].push(e.name);
  });

  appendPresenceRecord("extractPulseExportTiers", {
    local: tiers.local.length,
    organism: tiers.organism.length,
    global: tiers.global.length,
    system: tiers.system.length
  });

  return tiers;
}

// Helper: validate imports vs subimports (no auto-heal here, just reporting)
export function validateSubimports(importsMeta, subimportsMap, layerHint = null) {
  const missing = [];
  const moved = [];
  const ok = [];

  const subKeys = subimportsMap ? Object.keys(subimportsMap) : [];

  (importsMeta || []).forEach((imp) => {
    if (!imp || !imp.name) return;

    if (subKeys.includes(imp.name)) {
      ok.push(imp.name);
    } else {
      // We don't know if it's truly missing or moved; we just flag it.
      missing.push(imp.name);
    }
  });

  appendPresenceRecord("validateSubimports", {
    layerHint,
    okCount: ok.length,
    missingCount: missing.length,
    subKeysCount: subKeys.length
  });

  return {
    ok,
    missing,
    moved, // reserved for future when we track cross-layer moves
    layer: layerHint || null
  };
}

// ============================================================================
//  EXPORTS — v27 IMMORTAL++
// ============================================================================
export const PulseChunkNormalizer = {
  normalizeChunkValue,
  normalizeImage,
  normalizeHTML: normalizeText,
  normalizeCSS: normalizeText,
  normalizeJS: normalizeText,
  normalizeJSON,
  normalizeBinary,
  unwrap,

  // NEW module-level helpers
  normalizeModuleChunk,
  extractPulseExportTiers,
  validateSubimports
};

export default PulseChunkNormalizer;

// ============================================================================
//  GLOBAL EXPOSURE OF IMMORTAL STORE + NORMALIZER — v27 IMMORTAL++
//  (No auto-attach of export tiers; we only expose the normalizer + store)
// ============================================================================
try {
  if (typeof window !== "undefined") {
    window.PulseChunkNormalizer = PulseChunkNormalizer;
    window.PulsePresenceNormalizerStore = PulsePresenceNormalizerStore;
  }
  if (typeof globalThis !== "undefined") {
    globalThis.PulseChunkNormalizer = PulseChunkNormalizer;
    globalThis.PulsePresenceNormalizerStore = PulsePresenceNormalizerStore;
  }
  if (typeof global !== "undefined") {
    global.PulseChunkNormalizer = PulseChunkNormalizer;
    global.PulsePresenceNormalizerStore = PulsePresenceNormalizerStore;
  }
  if (typeof g !== "undefined") {
    g.PulseChunkNormalizer = PulseChunkNormalizer;
    g.PulsePresenceNormalizerStore = PulsePresenceNormalizerStore;
  }
} catch {
  // never throw
}
