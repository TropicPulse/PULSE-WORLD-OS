// ============================================================================
//  PULSE OS v25.0‑IMMORTAL++ — PULSE-WORLD-SIGNAL Engine (CSS-MERGED TOP LAYER)
//  Signal-Grade Telemetry • Logger-Independent • Offline-First
//  ZERO RANDOMNESS • ZERO EGO • DUALBAND-AWARE • ORGANISM-MAP-AWARE
//  CSS-Style Signal Cascade • Top-Layer Merged Comments • Color-Aware Logs
//  BEAST + UI CONTEXT • EMITS ONLY ON CHANGE
//  v25+ UPGRADE: SignalPort-style dispatch via OrganismMap (if present)
//  v25+ UPGRADE: Universal Memory Layer (global/window → localStorage → window)
//  v25+ UPGRADE: PulseSignal bus (Beast → localStorage → UI) + 60s heartbeat
// ============================================================================

console.log(
  "%cPulseProofSignal v25-IMMORTAL-EVOLVABLE (CSS-MERGED, OFFLINE, +SignalPort, +UniversalMemory, +PulseSignalBus)",
  "color:#BA68C8;font-weight:bold;"
);

// Capture original console to avoid recursion and preserve native behavior
const _c = { ...console };

// Global handle (safe, environment-agnostic)
const g =
  typeof globalThis !== "undefined"
    ? globalThis
    : typeof global !== "undefined"
    ? global
    : typeof window !== "undefined"
    ? window
    : typeof self !== "undefined"
    ? self
    : {};

// global guard for Signal↔Logger recursion (kept for safety, though we no longer attach)
g.__PULSE_SIGNAL_LOGGING = g.__PULSE_SIGNAL_LOGGING || { active: false };

// ============================================================================
//  v25+ UNIVERSAL MEMORY LAYER
//  - Treat localStorage as source of truth
//  - Sync ALL globals (globalThis/window/g) → localStorage
//  - Mirror localStorage → window/g on frontend
//  - Beast-safe (no window), browser-safe, offline-safe
// ============================================================================

const PULSE_MEMORY_PREFIX = "__pulse_global__:";

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
  "Float64Array"
]);

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
        if (key.startsWith("__pulse_global__")) continue;

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
    // First, sync any existing globals into storage
    this._syncGlobalsToStorageOnce();
    // Then, mirror storage back into globals/window so frontend sees them
    this._syncStorageToGlobalsOnce();

    // Optional: expose helper for later manual syncs if needed
    g.PulseUniversalMemory = g.PulseUniversalMemory || {
      resyncGlobalsToStorage: () => this._syncGlobalsToStorageOnce(),
      resyncStorageToGlobals: () => this._syncStorageToGlobalsOnce()
    };
  }
};

// Initialize universal memory immediately (runs as soon as this module loads)
PulseUniversalMemory.init();

// ============================================================================
//  PACKET EMITTER — deterministic, signal-scoped, FRONTEND-SAFE
// ============================================================================

function emitSignalPacket(type, payload) {
  const now = Date.now();

  return Object.freeze({
    packetType: `signal-${type}`,
    packetId: `signal-${type}-${now}`,
    timestamp: now,

    // IMMORTAL++: minimal, stable, frontend-safe identity
    version: "25.0-IMMORTAL++",
    source: "PulseProofSignal",

    // user payload last
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
//  COLOR + COMMENT ENGINE (unchanged core)
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
        version: "25.0-IMMORTAL++",
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
      message: packet.message || null
    },
    null,
    2
  );

  return base;
}

// ============================================================================
//  TOP-LAYER MERGE ENGINE (unchanged core behavior)
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
        stability
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
      ts: p.timestamp
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
        lastMessage: lastPacket.message || null
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
//  INTERNAL BUFFER — burst-safe, offline-only
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
//  CORE SIGNAL API — logger-independent, beast+UI aware
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
    env = null
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
    env
  });
}

// ============================================================================
//  SIGNALPORT-STYLE DISPATCH — USING ORGANISMMAP IF PRESENT
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
      level: "warn"
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
      level: "warn"
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
    subsystem: portIdentity.portName,
    message: payload?.message || payload?.type || "dispatch",
    extra: {
      target,
      port: portIdentity.portName,
      aliases: portIdentity.aliases,
      error: error ? String(error) : null
    },
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
//  PULSE SIGNAL BUS — Beast → LocalStorage → UI (+ 60s heartbeat)
// ============================================================================

const PULSE_SIGNAL_KEY = "__pulse_signal__";

const PulseSignal = {
  _listeners: [],

  // Beast/backend: push raw state (network, stability, latency, etc.)
  push(rawState) {
    const packet = emitSignalPacket("direct", {
      state: safeClone(rawState) || rawState
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

// 60s heartbeat: re-write latest packet to localStorage so any listener
// that only watches storage (e.g., other tabs) gets a fresh event.
(function setupPulseSignalHeartbeat() {
  try {
    const intervalMs = 60_000;
    setInterval(() => {
      const packet = PulseSignal.getPacket();
      if (!packet) return;
      // Re-set into storage to trigger storage events across contexts
      PulseMemoryStorage.set(PULSE_SIGNAL_KEY, packet);
    }, intervalMs);
  } catch {
    // heartbeat is best-effort only
  }
})();

// ============================================================================
//  PUBLIC API — PulseProofSignal Engine (FRONTEND-SAFE IMMORTAL++)
// ============================================================================

export const PulseProofSignal = Object.freeze({
  version: "25.0-IMMORTAL++",
  source: "PulseProofSignal",

  configure(config) {
    SignalBuffer.configure(config);
  },

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
  send(target, payload = {}) {
    return PulseProofSignal.dispatch(target, payload);
  }
});

// ============================================================================
// PULSE SIGNAL IMMORTAL++ v27 — LocalStorage-backed global attach
// ============================================================================

(function attachPulseSignals() {
  const g = globalThis;

  // -------------------------------
  // 1. RESTORE FROM LOCALSTORAGE
  // -------------------------------
  let storedPulseSignal = null;
  let storedProofSignal = null;
  let storedSignalPort  = null;

  try {
    storedPulseSignal = JSON.parse(localStorage.getItem("PulseSignal_v27"));
  } catch {}
  try {
    storedProofSignal = JSON.parse(localStorage.getItem("PulseProofSignal_v27"));
  } catch {}
  try {
    storedSignalPort = JSON.parse(localStorage.getItem("PulseSignalPort_v27"));
  } catch {}

  // -------------------------------
  // 2. FALLBACK TO LIVE ENGINES
  // -------------------------------
  g.PulseSignal      = storedPulseSignal || g.PulseSignal      || PulseSignal;
  g.PulseProofSignal = storedProofSignal || g.PulseProofSignal || PulseProofSignal;
  g.SignalPort       = storedSignalPort  || g.SignalPort       || SignalPort;

  // Mirror to window (browser only)
  if (typeof window !== "undefined") {
    window.PulseSignal      = g.PulseSignal;
    window.PulseProofSignal = g.PulseProofSignal;
    window.SignalPort       = g.SignalPort;
  }

  // -------------------------------
  // 3. PERSIST BACK TO LOCALSTORAGE
  // -------------------------------
  try {
    localStorage.setItem("PulseSignal_v27", JSON.stringify(g.PulseSignal));
    localStorage.setItem("PulseProofSignal_v27", JSON.stringify(g.PulseProofSignal));
    localStorage.setItem("PulseSignalPort_v27", JSON.stringify(g.SignalPort));
  } catch (err) {
    console.warn("[PulseSignal IMMORTAL++] Failed to persist:", err);
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
