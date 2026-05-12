// ============================================================================
//  PulsePresenceNormalizer-SMART v2.5++ (v25 IMMORTAL UPGRADE)
//  Contract-driven bridge: A → Z
//  No guessing. No heuristics. No fallback decoding.
//  Fully aligned with PulseChunks-v25++-MULTILANE-Immortal
//  v25 IMMORTAL++: LocalStorage + in-memory mesh of ALL normalization events
//  + Session-aware, replay-aware, route-aware, organ-aware
// ============================================================================

/*
AI_EXPERIENCE_META = {
  identity: "PulsePresenceNormalizer",
  version: "v25-Immortal-SMART-HYBRID++",
  layer: "frontend",
  role: "chunk_normalizer",
  lineage: "PulseOS-v25++",

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
    localStoreMirrored: true,
    replayAware: true,
    modeAgnostic: true,
    dnaAware: true,
    meshMemoryAligned: true,
    sessionAware: true,
    routeAware: true,
    organAware: true,
    crossTabSynced: true
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

const g =
  typeof globalThis !== "undefined"
    ? globalThis
    : typeof global !== "undefined"
    ? global
    : typeof window !== "undefined"
    ? window
    : typeof g !== "undefined"
    ? g
    : {};

// Prefer global db if present (logger page / server)
const db =
  (g && g.db) ||
  (typeof global !== "undefined" && global.db) ||
  (typeof globalThis !== "undefined" && globalThis.db) ||
  (typeof window !== "undefined" && window.db) ||
  null;

// ============================================================================
//  IMMORTAL LOCALSTORAGE + MEMORY MESH — v25++
//  PulsePresenceNormalizerStore v25++
// ============================================================================

const PN_LS_KEY = "PulsePresenceNormalizer.v25.buffer";
const PN_LS_POINTER = "PulsePresenceNormalizer.v25.pointer";
const PN_LS_MAX = 4000; // bigger, but still bounded
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

function hasLocalStorage() {
  try {
    if (typeof window === "undefined" || !window.localStorage) return false;
    const t = "__presence_normalizer_test__";
    window.localStorage.setItem(t, "1");
    window.localStorage.removeItem(t);
    return true;
  } catch {
    return false;
  }
}

function loadPNBufferFromLS() {
  if (!hasLocalStorage()) return [];
  try {
    const raw = window.localStorage.getItem(PN_LS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function savePNBufferToLS(buf) {
  if (!hasLocalStorage()) return;
  try {
    const trimmed =
      buf.length > PN_LS_MAX ? buf.slice(buf.length - PN_LS_MAX) : buf;
    window.localStorage.setItem(PN_LS_KEY, JSON.stringify(trimmed));
    window.localStorage.setItem(PN_LS_POINTER, "__active__");
  } catch {
    // never throw
  }
}

function syncMemFromLS() {
  const fromLS = loadPNBufferFromLS();
  pnMemBuffer = fromLS.length > PN_MEM_MAX
    ? fromLS.slice(fromLS.length - PN_MEM_MAX)
    : fromLS;
}

// Initial load
try {
  syncMemFromLS();
} catch {}

// Cross-tab sync
if (typeof window !== "undefined" && typeof window.addEventListener === "function") {
  window.addEventListener("storage", (e) => {
    if (e.key !== PN_LS_KEY || !e.newValue) return;
    try {
      const parsed = JSON.parse(e.newValue);
      if (!Array.isArray(parsed)) return;
      pnMemBuffer = parsed.length > PN_MEM_MAX
        ? parsed.slice(parsed.length - PN_MEM_MAX)
        : parsed;
    } catch {
      // ignore
    }
  });
}

function appendPresenceRecord(kind, payload) {
  const entry = {
    ts: Date.now(),
    kind,
    payload,
    sessionId: PN_SESSION_ID,
    route: getCurrentRouteTag(),
    organ: "PulsePresenceNormalizer",
    version: "v25++"
  };

  // In-memory
  pnMemBuffer.push(entry);
  if (pnMemBuffer.length > PN_MEM_MAX) {
    pnMemBuffer = pnMemBuffer.slice(pnMemBuffer.length - PN_MEM_MAX);
  }

  // LocalStorage
  const lsBuf = loadPNBufferFromLS();
  lsBuf.push(entry);
  savePNBufferToLS(lsBuf);

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
  getAll() {
    // merge LS + mem, but mem is already tail of LS
    return loadPNBufferFromLS();
  },
  tail(n = 200) {
    const buf = pnMemBuffer.length ? pnMemBuffer : loadPNBufferFromLS();
    return buf.slice(Math.max(0, buf.length - n));
  },
  clear() {
    pnMemBuffer = [];
    savePNBufferToLS([]);
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
//  SMART: unwrap ONLY ONE LAYER.
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
//  SMART IMAGE CONSTRUCTOR — A → Z (image)
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
    out = URL.createObjectURL(new Blob([value], { type: mime }));
  } else if (value instanceof ArrayBuffer) {
    out = URL.createObjectURL(new Blob([new Uint8Array(value)], { type: mime }));
  } else if (value instanceof Blob) {
    out = URL.createObjectURL(value);
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
//  SMART TEXT / HTML / CSS / JS
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
//  SMART JSON
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
//  SMART BINARY
// ============================================================================
function normalizeBinary(value, mime = "application/octet-stream") {
  appendPresenceRecord("normalizeBinary_in", {
    type: describeValueType(value),
    mime
  });

  value = unwrap(value);

  let out = null;

  if (value instanceof Uint8Array) {
    out = new Blob([value], { type: mime });
  } else if (value instanceof ArrayBuffer) {
    out = new Blob([new Uint8Array(value)], { type: mime });
  } else if (value instanceof Blob) {
    out = value;
  }

  appendPresenceRecord("normalizeBinary_out", {
    outType: describeValueType(out)
  });
  return out;
}

// ============================================================================
//  SMART UNIVERSAL NORMALIZER
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
//  EXPORTS
// ============================================================================
export const PulseChunkNormalizer = {
  normalizeChunkValue,
  normalizeImage,
  normalizeHTML: normalizeText,
  normalizeCSS: normalizeText,
  normalizeJS: normalizeText,
  normalizeJSON,
  normalizeBinary,
  unwrap
};

export default PulseChunkNormalizer;

// ============================================================================
//  GLOBAL EXPOSURE OF IMMORTAL STORE + NORMALIZER
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
