// ============================================================================
//  v25+ UNIVERSAL MEMORY LAYER (UPGRADED FOR SIGNAL v27)
//  - Treat localStorage as source of truth (with in-memory fallback)
//  - Sync ALL serializable globals (globalThis/window/g) → localStorage (one-shot scan)
//  - Mirror important globals (PulseSignal, PulseProofSignal, SignalPort, etc.) on write
//  - Beast-safe (no window), browser-safe, offline-safe
// ============================================================================
// ============================================================================
//  PULSE-WINDOW-BOOTSTRAP v27 (FINAL FORM)
//  - window IS the global surface
//  - continuity comes from localStorage
//  - route history is tracked
// ============================================================================
// ============================================================================
// PulseTouchDetector — Route History (IndexedDB v25++)
// ============================================================================

(function PulseTouchRouteHistory() {

  const DB_NAME = "PulseDB_v25";
  const STORE = "route_history";

  // Open or create IndexedDB
  function openDB() {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, 1);

      req.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(STORE)) {
          db.createObjectStore(STORE, { keyPath: "id", autoIncrement: true });
        }
      };

      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  // Read last route
  async function getLastRoute(db) {
    return new Promise((resolve) => {
      const tx = db.transaction(STORE, "readonly");
      const store = tx.objectStore(STORE);

      const req = store.openCursor(null, "prev"); // last entry
      req.onsuccess = (e) => {
        const cursor = e.target.result;
        resolve(cursor ? cursor.value.route : null);
      };
      req.onerror = () => resolve(null);
    });
  }

  // Add new route
  async function addRoute(db, route) {
    return new Promise((resolve) => {
      const tx = db.transaction(STORE, "readwrite");
      const store = tx.objectStore(STORE);
      store.add({ route, ts: Date.now() });
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => resolve(false);
    });
  }

  // Trim to last 100 entries
  async function trimHistory(db) {
    return new Promise((resolve) => {
      const tx = db.transaction(STORE, "readwrite");
      const store = tx.objectStore(STORE);

      const req = store.getAllKeys();
      req.onsuccess = () => {
        const keys = req.result;
        const excess = keys.length - 100;
        if (excess > 0) {
          for (let i = 0; i < excess; i++) {
            store.delete(keys[i]);
          }
        }
        resolve(true);
      };
      req.onerror = () => resolve(false);
    });
  }

  // MAIN EXECUTION
  (async () => {
    try {
      const db = await openDB();
      const current = window.location.pathname;
      const last = await getLastRoute(db);

      // CSS-style merge
      if (current !== last) {
        await addRoute(db, current);
        await trimHistory(db);
      }

      // Expose to Pulse
      window.__PULSE__ = window.__PULSE__ || {};
      window.__PULSE__.continuity = localStorage.getItem("pulse_continuity") || null;
      window.__PULSE__.routeHistoryIndexedDB = true;

    } catch (err) {
      console.warn("[PulseTouchDetector] IndexedDB route history failed:", err);
    }
  })();

})();



import { PulseProofBridgeFlow as initUIFlow, PulseProofBridgeErrors as PulseUIErrors, PulseProofBridgeLogger as PulseProofLogger, BridgeLog as log, BridgeWarn as warn, BridgeError as error } from "../../PULSEVISION/____BACKEND/PULSE-WORLD-BRIDGE.js";
import { aiOvermindPrime } from "./PULSE-WORLD-ALDWYN.js";
import { prewarmSDN } from "../PULSE-OS/PulseOSSDNPrewarm-v30.js";
import { createPulseRouter } from "./PULSE-WORLD-INTERNET-ROUTER.js";
import { PulseUnderstanding, PulseWorldCastle, PulseWorldMesh } from "./PULSE-WORLD-UNDERSTANDING.js";


const PULSE_MEMORY_PREFIX = "__pulse_global__:";
// ============================================================================

console.log(
  "%cPulseProofSignal v25-IMMORTAL-EVOLVABLE (CSS-MERGED, OFFLINE, +SignalPort, +UniversalMemory, +PulseSignalBus)",
  "color:#BA68C8;font-weight:bold;"
);

// Capture original console to avoid recursion and preserve native behavior
const _c = { ...console };

// Global handle (safe, environment-agnostic)

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

// global guard for Signal↔Logger recursion (kept for safety, though we no longer attach)
g.__PULSE_SIGNAL_LOGGING = g.__PULSE_SIGNAL_LOGGING || { active: false };

export const PulseVersion = {
  proof: "25.0",
  logger: "25.0",
  renderer: "25.0",
  gpu: "25.0",
  band: "25.0",
  vault: "25.0",
  hooks: "25.0",
  endpoint: "25.0",
  router: "25.0",
  expansion: "25.0",
  bridge: "25.0",
  internet: "25.0",
  memory: "25.0",
  pages: "25.0",
  cns: "25.0",
  world: "25.0",
  mesh: "25.0",
  ai: "25.0",
  signal: "25.0"
};

// fallback only
export const PulseVersionFallback = "16.x";

// ============================================================================
//  DETERMINISTIC ROLE MAP
// ============================================================================

export const PulseRoles = {
  proof: "PROOF MONITOR",
  logger: "PROOF LOGGER",
  renderer: "RENDERER",
  gpu: "GPU SUBSYSTEM",
  band: "NERVOUS SYSTEM",
  vault: "VAULT SUBSYSTEM",
  hooks: "HOOK REGISTRY",
  endpoint: "REMOTE ENDPOINT",
  router: "ROUTER",
  expansion: "EXPANSION ENGINE",
  bridge: "CNS BRIDGE",
  internet: "INTERNET SUBSYSTEM",
  memory: "MEMORY SUBSYSTEM",
  pages: "PAGE SUBSYSTEM",
  cns: "CNS CORE",
  world: "WORLD SUBSYSTEM",
  mesh: "MESH SUBSYSTEM",
  ai: "AI SUBSYSTEM",
  signal: "SIGNAL SUBSYSTEM"
};

// fallback only
export const PulseRoleFallback = "LEGACY SUBSYSTEM";

// ============================================================================
//  DETERMINISTIC COLOR MAP
// ============================================================================

export const PulseColors = {
  proof: "#4DD0E1",
  logger: "#FF7043",
  renderer: "#29B6F6",
  gpu: "#7E57C2",
  band: "#66BB6A",
  vault: "#26C6DA",
  ui: "#AB47BC",
  endpoint: "#FFA726",
  router: "#42A5F5",
  expansion: "#26A69A",
  bridge: "#EC407A",
  internet: "#8D6E63",
  memory: "#5C6BC0",
  pages: "#26C6DA",
  cns: "#EF5350",
  world: "#26A69A",
  mesh: "#7E57C2",
  ai: "#FFCA28",
  signal: "#90CAF9"
};

// fallback only
export const PulseColorFallback = "#BDBDBD";

// ============================================================================
//  DETERMINISTIC ICON MAP
// ============================================================================

export const PulseIcons = {
  proof: "📜",
  logger: "🖨️",
  renderer: "✨",
  gpu: "🎨",
  band: "🧠",
  vault: "🔐",
  hooks: "🪝",
  endpoint: "🌐",
  router: "🛰️",
  expansion: "🚀",
  bridge: "🌉",
  internet: "📡",
  memory: "💾",
  pages: "📄",
  cns: "🧬",
  world: "🌍",
  mesh: "🕸️",
  ai: "🤖",
  signal: "📡"
};

// fallback only
export const PulseIconFallback = "🖥️";

// ============================================================================
//  v25+ UNIVERSAL MEMORY LAYER
//  - Treat localStorage as source of truth
//  - Sync ALL globals (globalThis/window/g) → localStorage
//  - Mirror localStorage → window/g on frontend
//  - Beast-safe (no window), browser-safe, offline-safe
// ============================================================================
// Safe localStorage abstraction (works in beast + browser)
const PulseMemoryStorage = {
  _ensureInMemory() {
    if (!g.__PULSE_LOCALSTORAGE) {
      Object.defineProperty(g, "__PULSE_LOCALSTORAGE", {
        value: {},
        writable: false,
        configurable: false,
        enumerable: false
      });
    }
  },

  getRaw(key) {
    try {
      if (typeof localStorage !== "undefined") {
        return localStorage.getItem(key);
      }
    } catch {
      // ignore and fall back
    }
    this._ensureInMemory();
    return g.__PULSE_LOCALSTORAGE[key] || null;
  },

  setRaw(key, value) {
    try {
      if (typeof localStorage !== "undefined") {
        localStorage.setItem(key, value);
        return;
      }
    } catch {
      // ignore and fall back
    }
    this._ensureInMemory();
    g.__PULSE_LOCALSTORAGE[key] = value;
  },

  get(key) {
    const raw = this.getRaw(key);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },

  set(key, value) {
    try {
      const raw = JSON.stringify(value);
      this.setRaw(key, raw);
    } catch {
      // ignore
    }
  },

  keys() {
    const keys = new Set();
    try {
      if (typeof localStorage !== "undefined") {
        for (let i = 0; i < localStorage.length; i++) {
          const k = localStorage.key(i);
          if (k) keys.add(k);
        }
      }
    } catch {
      // ignore
    }
    if (g.__PULSE_LOCALSTORAGE) {
      Object.keys(g.__PULSE_LOCALSTORAGE).forEach(k => keys.add(k));
    }
    return Array.from(keys);
  }
};

// Heuristic skip list so we don't try to serialize built-ins
const PULSE_GLOBAL_SKIP_KEYS = new Set([
  "window",
  "self",
  "global",
  "globalThis",
  "document",
  "location",
  "navigator",
  "console",
  "frames",
  "parent",
  "top",
  "opener",
  "performance",
  "crypto",
  "indexedDB",
  "localStorage",
  "sessionStorage",
  "Promise",
  "Array",
  "Object",
  "Function",
  "Number",
  "String",
  "Boolean",
  "Map",
  "Set",
  "WeakMap",
  "WeakSet",
  "Date",
  "RegExp",
  "Error",
  "TypeError",
  "SyntaxError",
  "ReferenceError",
  "RangeError",
  "EvalError",
  "URIError",
  "JSON",
  "Math",
  "Reflect",
  "Proxy",
  "Intl",
  "Atomics",
  "SharedArrayBuffer",
  "BigInt",
  "BigInt64Array",
  "BigUint64Array",
  "DataView",
  "ArrayBuffer",
  "Uint8Array",
  "Uint16Array",
  "Uint32Array",
  "Int8Array",
  "Int16Array",
  "Int32Array",
  "Float32Array",
  // 🔥 minimal wallet/provider safety (same casing style)
  "ethereum",
  "web3",
  "__metamask",
  "__mmwallet",
  "__phantom",
  "__coinbase",
  "__walletconnect",
  "__frame",
  "__rabby",
  "__keplr",
  "__solflare",
  "__terra",
  "__okx",
  "__binance",
  "__bitget"
]);

// Keys we explicitly care about for the signal system
const PULSE_SIGNAL_KEYS = {
  PulseSignal: `${PULSE_MEMORY_PREFIX}PulseSignal_v27`,
  PulseProofSignal: `${PULSE_MEMORY_PREFIX}PulseProofSignal_v27`,
  PulseSignalPort: `${PULSE_MEMORY_PREFIX}PulseSignalPort_v27`
};
const PulseUniversalMemory = {
  prefix: PULSE_MEMORY_PREFIX,

  _isSerializable(value) {
    if (value === undefined) return false;
    if (typeof value === "function") return false;
    if (typeof value === "symbol") return false;
    try {
      JSON.stringify(value);
      return true;
    } catch {
      return false;
    }
  },

  // One-shot scan: snapshot existing globals into storage
  _syncGlobalsToStorageOnce() {
    const root = g;
    const seen = new Set();

    const pushProps = obj => {
      if (!obj || typeof obj !== "object") return;
      let names;
      try {
        names = Object.getOwnPropertyNames(obj);
      } catch {
        return;
      }
      for (const key of names) {
        if (seen.has(key)) continue;
        seen.add(key);
        if (PULSE_GLOBAL_SKIP_KEYS.has(key)) continue;
        if (key.startsWith(this.prefix)) continue;

        let desc;
        try {
          desc = Object.getOwnPropertyDescriptor(obj, key);
        } catch {
          continue;
        }
        if (!desc || !("value" in desc)) continue;

        const value = desc.value;
        if (!this._isSerializable(value)) continue;

        const storageKey = this.prefix + key;
        PulseMemoryStorage.set(storageKey, value);
      }
    };

    // globalThis / g
    pushProps(root);

    // window / self if present
    try {
      if (typeof window !== "undefined") pushProps(window);
    } catch {
      // ignore
    }
    try {
      if (typeof self !== "undefined" && self !== window) pushProps(self);
    } catch {
      // ignore
    }
  },

  // “Every time they globalize, we localize”
  mirrorGlobalWrite(prop, value) {
    if (typeof prop !== "string") return;
    if (PULSE_GLOBAL_SKIP_KEYS.has(prop)) return;
    if (!this._isSerializable(value)) return;

    const storageKey = this.prefix + prop;
    PulseMemoryStorage.set(storageKey, value);

    // Special handling for the three core signal structures
    if (prop === "PulseSignal") {
      PulseMemoryStorage.set(PULSE_SIGNAL_KEYS.PulseSignal, value);
    } else if (prop === "PulseProofSignal") {
      PulseMemoryStorage.set(PULSE_SIGNAL_KEYS.PulseProofSignal, value);
    } else if (prop === "SignalPort" || prop === "PulseSignalPort") {
      PulseMemoryStorage.set(PULSE_SIGNAL_KEYS.PulseSignalPort, value);
    }
  },

  // Restore important globals from storage on boot (frontend)
  restoreSignalGlobals() {
    const pulseSignal = PulseMemoryStorage.get(PULSE_SIGNAL_KEYS.PulseSignal);
    if (pulseSignal && !g.PulseSignal) {
      g.PulseSignal = pulseSignal;
    }

    const proofSignal = PulseMemoryStorage.get(PULSE_SIGNAL_KEYS.PulseProofSignal);
    if (proofSignal && !g.PulseProofSignal) {
      g.PulseProofSignal = proofSignal;
    }

    const signalPort = PulseMemoryStorage.get(PULSE_SIGNAL_KEYS.PulseSignalPort);
    if (signalPort && !g.SignalPort && !g.PulseSignalPort) {
      g.SignalPort = signalPort;
      g.PulseSignalPort = signalPort;
    }
  },

  // Attach lightweight mirroring to global writes without overriding window/globalThis
  attachGlobalMirroring() {
    const selfRef = this;

    // Mirror direct property sets on the global handle `g`
    const originalSet = Reflect.set;
    Reflect.set = function(target, prop, value, receiver) {
      if (target === g) {
        selfRef.mirrorGlobalWrite(prop, value);
      }
      return originalSet(target, prop, value, receiver);
    };

    // Mirror defineProperty on the global handle `g`
    const originalDefine = Object.defineProperty;
    Object.defineProperty = function(obj, prop, descriptor) {
      if (obj === g && descriptor && "value" in descriptor) {
        selfRef.mirrorGlobalWrite(prop, descriptor.value);
      }
      return originalDefine.call(Object, obj, prop, descriptor);
    };
  },

  _syncStorageToGlobalsOnce() {
    const keys = PulseMemoryStorage.keys();
    for (const key of keys) {
      if (!key.startsWith(this.prefix)) continue;
      const prop = key.slice(this.prefix.length);
      const value = PulseMemoryStorage.get(key);

      try {
        g[prop] = value;
      } catch {
        // ignore
      }

      if (typeof window !== "undefined") {
        try {
          window[prop] = value;
        } catch {
          // ignore
        }
      }
      if (typeof self !== "undefined") {
        try {
          self[prop] = value;
        } catch {
          // ignore
        }
      }
    }
  },

  init() {
    // 1) snapshot existing globals → storage
    this._syncGlobalsToStorageOnce();
    // 2) restore dedicated signal globals (PulseSignal, PulseProofSignal, SignalPort)
    this.restoreSignalGlobals();
    // 3) storage → globals so frontend sees persisted state
    this._syncStorageToGlobalsOnce();
    // 4) from now on, every write to g.* is mirrored into storage
    this.attachGlobalMirroring();

    // Optional: expose helper for later manual syncs if needed
    g.PulseUniversalMemory = g.PulseUniversalMemory || {
      resyncGlobalsToStorage: () => this._syncGlobalsToStorageOnce(),
      resyncStorageToGlobals: () => this._syncStorageToGlobalsOnce()
    };
  }
};

// Initialize universal memory once on load
try {
  PulseUniversalMemory.init();
} catch (err) {
  _c.warn("[PulseUniversalMemory] Initialization failed (non-fatal):", err);
}

// ============================================================================
//  PACKET EMITTER — deterministic, signal-scoped, FRONTEND-SAFE, MAP-AWARE
//  v27+: carries rawSignal / normalizedSignal / channel / port / threePart
// ============================================================================

function emitSignalPacket(type, payload) {
  const now = Date.now();

  return Object.freeze({
    packetType: `signal-${type}`,
    packetId: `signal-${type}-${now}`,
    timestamp: now,

    // IMMORTAL++: minimal, stable, frontend-safe identity
    version: "27.0-IMMORTAL++",
    source: "PulseProofSignal",

    // v27+ optional signal metadata (Map / SignalPort aware)
    // rawSignal: original string from emit / map
    // normalizedSignal: CSS-collapsed, normalized form
    // channel: global channel (e.g. PULSE_BAND)
    // port: SignalPort key (e.g. "pulseband")
    // threePart: normalized 3-part name (_PulseBand_Boot_Start)
    rawSignal: payload.rawSignal || null,
    normalizedSignal: payload.normalizedSignal || null,
    channel: payload.channel || null,
    port: payload.port || null,
    threePart: payload.threePart || null,

    // user payload last (can override above if explicitly set)
    ...payload
  });
}

function safeClone(v) {
  try {
    return JSON.parse(JSON.stringify(v));
  } catch {
    return null;
  }
}

// ============================================================================
//  COLOR + COMMENT ENGINE (unchanged core + signal metadata surfaced)
// ============================================================================

const SIGNAL_COLORS = {
  "signal-direct": "color:#4FC3F7",
  "signal-top-layer": "color:#BA68C8",
  default: "color:#90A4AE"
};

function getColorForPacket(packet) {
  if (!packet || typeof packet !== "object") return SIGNAL_COLORS.default;
  if (SIGNAL_COLORS[packet.packetType]) return SIGNAL_COLORS[packet.packetType];

  const level = packet.level || packet.severity || "";
  if (level === "error" || level === "critical") return "color:#E57373";
  if (level === "warn" || level === "warning") return "color:#FFB74D";
  if (level === "info") return "color:#81C784";
  if (level === "debug") return "color:#A5D6A7";
  return SIGNAL_COLORS.default;
}

function buildCommentFromSignalPacket(packet, kind = "direct") {
  const env =
    g.PulseSurface && g.PulseSurface.environment
      ? safeClone(g.PulseSurface.environment)
      : null;

  const route =
    g.PulseRouteMemory && g.PulseRouteMemory.currentRoute
      ? safeClone(g.PulseRouteMemory.currentRoute)
      : null;

  const flow =
    g.PulseUIFlow && g.PulseUIFlow.currentState
      ? safeClone(g.PulseUIFlow.currentState)
      : null;

  const reflex =
    g.PulseSkinReflex && g.PulseSkinReflex.currentReflex
      ? safeClone(g.PulseSkinReflex.currentReflex)
      : null;

  const identity =
    g.PulseProofBridge &&
    typeof g.PulseProofBridge.getBridgeIdentitySnapshot === "function"
      ? safeClone(g.PulseProofBridge.getBridgeIdentitySnapshot())
      : null;

  const bridgeEnv =
    g.PulseProofBridge && g.PulseProofBridge.BRIDGE_ENV
      ? safeClone(g.PulseProofBridge.BRIDGE_ENV)
      : null;

  const page =
    typeof location !== "undefined" && location
      ? location.pathname || null
      : null;

  const color = getColorForPacket(packet);

  const base = {
    type: "comment",
    ts: packet.timestamp,
    signalPacketId: packet.packetId,
    signalPacketType: packet.packetType,
    summary: `Signal (${kind}) fired: ${packet.packetType}`,
    color,
    details: {
      packet: safeClone(packet),
      route,
      flow,
      reflex,
      page,
      env,
      identity,
      bridgeEnv,
      meta: {
        version: "27.0-IMMORTAL++",
        generator: "PulseProofSignalCommentEngine",
        kind
      }
    }
  };

  base.pretty = JSON.stringify(
    {
      summary: base.summary,
      ts: base.ts,
      packetType: base.signalPacketType,
      route,
      page,
      env,
      level: packet.level || null,
      subsystem: packet.subsystem || null,
      message: packet.message || null,
      // v27+: surface signal metadata for debugging/normalization
      rawSignal: packet.rawSignal || null,
      normalizedSignal: packet.normalizedSignal || null,
      channel: packet.channel || null,
      port: packet.port || null,
      threePart: packet.threePart || null
    },
    null,
    2
  );

  return base;
}

// ============================================================================
//  TOP-LAYER MERGE ENGINE (unchanged core behavior + merges signal metadata)
// ============================================================================

const TopLayerMerge = {
  _pending: null,
  _scheduled: false,
  _lastComputedSnapshot: null,

  _reset() {
    this._pending = null;
    this._scheduled = false;
  },

  _ensurePending() {
    if (!this._pending) {
      this._pending = {
        packets: [],
        kinds: []
      };
    }
  },

  add(packet, kind) {
    if (!packet) return;
    this._ensurePending();
    this._pending.packets.push(packet);
    this._pending.kinds.push(kind || "direct");

    if (!this._scheduled) {
      this._scheduled = true;
      queueMicrotask(() => {
        this._scheduled = false;
        this.flush();
      });
    }
  },

  _computeMergedState(packets) {
    const computed = {};
    for (const p of packets) {
      const {
        level,
        subsystem,
        message,
        band,
        route,
        identity,
        phase,
        world,
        flow,
        reflex,
        page,
        env,
        state,
        advantage,
        stability,
        // v27+ signal metadata
        rawSignal,
        normalizedSignal,
        channel,
        port,
        threePart
      } = p;

      if (level !== undefined) computed.level = level;
      if (subsystem !== undefined) computed.subsystem = subsystem;
      if (message !== undefined) computed.message = message;
      if (band !== undefined) computed.band = band;
      if (route !== undefined) computed.route = route;
      if (identity !== undefined) computed.identity = identity;
      if (phase !== undefined) computed.phase = phase;
      if (world !== undefined) computed.world = world;
      if (flow !== undefined) computed.flow = flow;
      if (reflex !== undefined) computed.reflex = reflex;
      if (page !== undefined) computed.page = page;
      if (env !== undefined) computed.env = env;
      if (state !== undefined) computed.state = state;
      if (advantage !== undefined) computed.advantage = advantage;
      if (stability !== undefined) computed.stability = stability;

      // v27+: last-wins for signal metadata too
      if (rawSignal !== undefined) computed.rawSignal = rawSignal;
      if (normalizedSignal !== undefined) computed.normalizedSignal = normalizedSignal;
      if (channel !== undefined) computed.channel = channel;
      if (port !== undefined) computed.port = port;
      if (threePart !== undefined) computed.threePart = threePart;
    }
    return computed;
  },

  _hasChanged(computed) {
    const prev = this._lastComputedSnapshot;
    const nextStr = JSON.stringify(computed);
    const prevStr = prev ? JSON.stringify(prev) : null;
    if (nextStr === prevStr) return false;
    this._lastComputedSnapshot = computed;
    return true;
  },

  flush() {
    if (!this._pending || !this._pending.packets.length) {
      this._reset();
      return;
    }

    const packets = this._pending.packets.slice();
    const kinds = this._pending.kinds.slice();
    this._reset();

    const lastPacket = packets[packets.length - 1];
    const computed = this._computeMergedState(packets);

    if (!this._hasChanged(computed)) {
      return;
    }

    const mergedComment = this._buildMergedComment(
      packets,
      kinds,
      lastPacket,
      computed
    );
    this._emitToSink(mergedComment);
  },

  _buildMergedComment(packets, kinds, lastPacket, computed) {
    const base = buildCommentFromSignalPacket(lastPacket, "merged-burst");
    base.summary = `Merged ${packets.length} signals (last: ${lastPacket.packetType})`;
    base.signalPacketType = "signal-top-layer";

    base.details.subsignals = packets.map((p, idx) => ({
      id: p.packetId,
      type: p.packetType,
      kind: kinds[idx],
      level: p.level || null,
      subsystem: p.subsystem || null,
      message: p.message || null,
      ts: p.timestamp,
      rawSignal: p.rawSignal || null,
      normalizedSignal: p.normalizedSignal || null,
      channel: p.channel || null,
      port: p.port || null,
      threePart: p.threePart || null
    }));

    base.details.computed = safeClone(computed);
    base.color = getColorForPacket(lastPacket);

    base.pretty = JSON.stringify(
      {
        summary: base.summary,
        count: packets.length,
        lastType: lastPacket.packetType,
        lastLevel: lastPacket.level || null,
        lastSubsystem: lastPacket.subsystem || null,
        lastMessage: lastPacket.message || null,
        rawSignal: computed.rawSignal || null,
        normalizedSignal: computed.normalizedSignal || null,
        channel: computed.channel || null,
        port: computed.port || null,
        threePart: computed.threePart || null
      },
      null,
      2
    );

    return base;
  },

  _emitToSink(comment) {
    try {
      _c.log("[PulseProofSignal:TOP-LAYER]", comment);
    } catch {
      // ignore
    }
    SignalBuffer._pushComment(comment);
  }
};

function emitCommentLogForPacket(packet, kind = "direct") {
  try {
    TopLayerMerge.add(packet, kind);
  } catch {
    // Merge failure must never break signal engine
  }
}

// ============================================================================
//  INTERNAL BUFFER — burst-safe, offline-only (unchanged)
// ============================================================================

const SignalBuffer = {
  _queue: [],
  _comments: [],
  _max: 2048,
  _maxComments: 512,

  configure() {
    // kept for API compatibility; no-op for now
  },

  push(packet) {
    if (!packet) return;
    this._queue.push(packet);
    if (this._queue.length > this._max) {
      this._queue.splice(0, this._queue.length - this._max);
    }
  },

  _pushComment(comment) {
    if (!comment) return;
    this._comments.push(comment);
    if (this._comments.length > this._maxComments) {
      this._comments.splice(0, this._comments.length - this._maxComments);
    }
  },

  flush() {
    this._queue.length = 0;
  },

  tail(n = 200) {
    if (n <= 0) return [];
    return this._queue.slice(Math.max(0, this._queue.length - n));
  },

  comments(n = 100) {
    if (n <= 0) return [];
    return this._comments.slice(Math.max(0, this._comments.length - n));
  }
};

// ============================================================================
//  CORE SIGNAL API — logger-independent, beast+UI aware, v27-ready
// ============================================================================

function normalizeDirectSignal(payload = {}) {
  const {
    level = "info",
    subsystem = "signal",
    message = "",
    extra = {},

    // beast
    band = "dual",
    route = null,
    identity = null,
    phase = null,
    world = null,
    state = null,
    advantage = null,
    stability = null,

    // UI / environment
    layer = null,
    page = null,
    func = null,
    system = null,
    organ = null,
    flow = null,
    reflex = null,
    env = null,

    // v27+ signal metadata (optional, usually filled by OrganismMap)
    rawSignal = null,
    normalizedSignal = null,
    channel = null,
    port = null,
    threePart = null
  } = payload;

  return emitSignalPacket("direct", {
    source: "direct",
    level,
    subsystem,
    message,
    extra,

    band,
    route,
    identity,
    phase,
    world,
    state,
    advantage,
    stability,

    layer,
    page,
    func,
    system,
    organ,
    flow,
    reflex,
    env,

    rawSignal,
    normalizedSignal,
    channel,
    port,
    threePart
  });
}
// ============================================================================
//  SIGNALPORT-STYLE DISPATCH — USING ORGANISMMAP IF PRESENT (v27-aware)
// ============================================================================

function resolveTargetViaOrganismMap(target) {
  if (!target || !g.OrganismMap) return null;

  const map = g.OrganismMap;
  const systems = map.systems || {};
  const aliases = map.aliases || {};

  const key = String(target)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

  const aliasMatch = aliases[key];
  if (aliasMatch && systems[aliasMatch]) {
    return systems[aliasMatch];
  }

  if (systems[key]) {
    return systems[key];
  }

  for (const sysKey of Object.keys(systems)) {
    const identity = systems[sysKey];
    const port = identity?.IDENTITY_META?.PORT_IDENTITY?.portName;

    if (port && port === key) {
      return identity;
    }
  }

  for (const sysKey of Object.keys(systems)) {
    const identity = systems[sysKey];
    const portAliases = identity?.IDENTITY_META?.PORT_IDENTITY?.aliases || [];

    if (portAliases.includes(key)) {
      return identity;
    }
  }

  for (const sysKey of Object.keys(systems)) {
    if (sysKey.startsWith(key)) {
      return systems[sysKey];
    }
  }

  for (const sysKey of Object.keys(systems)) {
    if (sysKey.includes(key)) {
      return systems[sysKey];
    }
  }

  return null;
}

function dispatchSignalToOrganism(target, payload = {}) {
  const resolved = resolveTargetViaOrganismMap(target);

  if (!resolved) {
    const packet = normalizeDirectSignal({
      subsystem: "signalport",
      message: `No subsystem found for target: ${target}`,
      extra: { target, resolved: false },
      level: "warn",
      // v27 metadata: we at least know the port/target
      rawSignal: payload.rawSignal || null,
      normalizedSignal: payload.normalizedSignal || null,
      channel: payload.channel || null,
      port: String(target),
      threePart: payload.threePart || null
    });
    SignalBuffer.push(packet);
    emitCommentLogForPacket(packet, "direct");

    return {
      ok: false,
      reason: "NO_SUBSYSTEM",
      target,
      resolved: null
    };
  }

  const portIdentity =
    resolved.IDENTITY_META?.PORT_IDENTITY || resolved.PORT_IDENTITY || null;

  if (!portIdentity || typeof portIdentity.handler !== "function") {
    const packet = normalizeDirectSignal({
      subsystem: "signalport",
      message: `No PORT_IDENTITY handler for target: ${target}`,
      extra: { target, resolved: true },
      level: "warn",
      rawSignal: payload.rawSignal || null,
      normalizedSignal: payload.normalizedSignal || null,
      channel: payload.channel || null,
      port: String(target),
      threePart: payload.threePart || null
    });
    SignalBuffer.push(packet);
    emitCommentLogForPacket(packet, "direct");

    return {
      ok: false,
      reason: "NO_PORT_HANDLER",
      target,
      resolved: true
    };
  }

  let result = null;
  let error = null;

  try {
    result = portIdentity.handler(payload);
  } catch (err) {
    error = err;
  }

  const packet = normalizeDirectSignal({
    subsystem: portIdentity.portName || "signalport",
    message: payload?.message || payload?.type || "dispatch",
    extra: {
      target,
      port: portIdentity.portName,
      aliases: portIdentity.aliases,
      error: error ? String(error) : null
    },
    // carry through v27 metadata if present
    rawSignal: payload.rawSignal || null,
    normalizedSignal: payload.normalizedSignal || null,
    channel: payload.channel || null,
    port: portIdentity.portName || String(target),
    threePart: payload.threePart || null,
    ...payload
  });

  SignalBuffer.push(packet);
  emitCommentLogForPacket(packet, "direct");

  if (error) {
    return {
      ok: false,
      reason: "HANDLER_ERROR",
      target,
      port: portIdentity.portName,
      error: String(error)
    };
  }

  return {
    ok: true,
    target,
    port: portIdentity.portName,
    result
  };
}

// ============================================================================
//  PULSE SIGNAL BUS — Beast → PulseMemoryStorage → UI (+ 60s heartbeat)
//  v27-ready: can carry signal metadata if desired
// ============================================================================

const PULSE_SIGNAL_KEY = "__pulse_signal__";

const PulseSignal = {
  _listeners: [],

  // Beast/backend: push raw state (network, stability, latency, etc.)
  // Optionally include v27 metadata: rawSignal, normalizedSignal, channel, port, threePart
  push(rawState, meta = {}) {
    const packet = emitSignalPacket("direct", {
      state: safeClone(rawState) || rawState,
      rawSignal: meta.rawSignal || null,
      normalizedSignal: meta.normalizedSignal || null,
      channel: meta.channel || null,
      port: meta.port || null,
      threePart: meta.threePart || null
    });

    // Feed into existing engines
    SignalBuffer.push(packet);
    emitCommentLogForPacket(packet, "direct");

    // Persist to universal memory (localStorage or in-memory fallback)
    PulseMemoryStorage.set(PULSE_SIGNAL_KEY, packet);

    // Notify in-process listeners
    this._notify(packet);

    return packet;
  },

  // Frontend + Beast: get latest packet from storage
  getPacket() {
    return PulseMemoryStorage.get(PULSE_SIGNAL_KEY);
  },

  // Convenience: get just the state payload
  getState() {
    const p = this.getPacket();
    return p?.state || null;
  },

  subscribe(fn) {
    if (typeof fn !== "function") return () => {};
    this._listeners.push(fn);

    const current = this.getPacket();
    if (current) {
      try { fn(current); } catch {}
    }

    return () => {
      this._listeners = this._listeners.filter(l => l !== fn);
    };
  },

  _notify(packet) {
    for (const fn of this._listeners) {
      try { fn(packet); } catch {}
    }
  }
};

// 60s heartbeat: re-write latest packet to storage so other contexts see it
(function setupPulseSignalHeartbeat() {
  try {
    const intervalMs = 60_000;
    setInterval(() => {
      const packet = PulseSignal.getPacket();
      if (!packet) return;
      PulseMemoryStorage.set(PULSE_SIGNAL_KEY, packet);
    }, intervalMs);
  } catch {
    // heartbeat is best-effort only
  }
})();

// ============================================================================
//  PUBLIC API — PulseProofSignal Engine (FRONTEND-SAFE IMMORTAL++, v27)
// ============================================================================

export const PulseProofSignal = Object.freeze({
  version: "27.0-IMMORTAL++",
  source: "PulseProofSignal",

  configure(config) {
    SignalBuffer.configure(config);
  },

  // payload can include v27 metadata: rawSignal, normalizedSignal, channel, port, threePart
  signal(payload) {
    const packet = normalizeDirectSignal(payload);
    SignalBuffer.push(packet);
    emitCommentLogForPacket(packet, "direct");
    return packet;
  },

  flush() {
    SignalBuffer.flush();
  },

  tail(n = 200) {
    return SignalBuffer.tail(n);
  },

  comments(n = 100) {
    return SignalBuffer.comments(n);
  },

  latest() {
    const comments = SignalBuffer.comments(1);
    if (!comments || !comments.length) return null;
    return comments[0]?.details?.computed || null;
  },

  dispatch(target, payload = {}) {
    return dispatchSignalToOrganism(target, payload);
  }
});

// ============================================================================
//  SIGNALPORT — THIN WRAPPER OVER PulseProofSignal.dispatch
// ============================================================================

export const SignalPort = Object.freeze({
  // payload can include v27 metadata; it flows into dispatch → normalizeDirectSignal
  send(target, payload = {}) {
    return PulseProofSignal.dispatch(target, payload);
  }
});

// ============================================================================
//  PULSE SIGNAL IMMORTAL++ v27 — Global attach via PulseUniversalMemory
// ============================================================================

(function attachPulseSignals() {
  try {
    // Use the live engines; PulseUniversalMemory will mirror them into storage
    g.PulseSignal = g.PulseSignal || PulseSignal;
    g.PulseProofSignal = g.PulseProofSignal || PulseProofSignal;
    g.SignalPort = g.SignalPort || SignalPort;

    if (typeof window !== "undefined") {
      window.PulseSignal = g.PulseSignal;
      window.PulseProofSignal = g.PulseProofSignal;
      window.SignalPort = g.SignalPort;
    }
    console.log(
      "%c[PULSE-WORLD-SIGNAL v24-IMMORTAL-EVOLVABLE] %c Initializing Signal %c",
      "color:#90CAF9; font-weight:bold; font-family:monospace;",
      "color:#00FF9C; font-family:monospace;",
      "color:#E8F8FF; font-family:monospace;");

    // Let PulseUniversalMemory handle persistence/mirroring of these globals
    if (g.PulseUniversalMemory && typeof g.PulseUniversalMemory.resyncGlobalsToStorage === "function") {
      g.PulseUniversalMemory.resyncGlobalsToStorage();
    }
  } catch (err) {
    _c.warn("[PulseSignal IMMORTAL++] Global attach failed (non-fatal):", err);
  }
})();

// ============================================================================
//  DUAL-MODE EXPORTS — FRONTEND-SAFE
// ============================================================================

if (typeof module !== "undefined") {
  module.exports = {
    PulseProofSignal,
    SignalPort,
    PulseSignal
  };
}
