// ============================================================================
//  PulseProofBridge-v18.js — IMMORTAL PORTAL TRUST LAYER • FRONT ↔ CNS
//  “The membrane between the surface world and the organism beneath.”
// ============================================================================
//
//  DESIGN — v18 IMMORTAL
//  ----------------------
//  • Unified envelope system for all outbound + inbound CNS traffic
//  • Compiler-aware: can emit/receive COMPILER_REQUEST + COMPILER_EVENT
//  • Understanding-aware: UNDERSTANDING_START + semantic routing
//  • Dualband v18: AI, CNS, Portal, PulseNet, ImageBridge unified
//  • Offline-first: immortal local buffer with drift-proof replay
//  • Zero-drift telemetry: every signal tagged, mirrored, and stored
//  • Mode-agnostic: SSR-safe, BroadcastChannel-optional
//  • Portal Trust Layer: the last surface before the organism
//
//  This file is the *membrane*.
//  Everything above it is typed by humans.
//  Everything below it is remembered by the organism.
//
// ============================================================================
//  EXPERIENCE METADATA — v18 IMMORTAL PORTAL TRUST LAYER
// ============================================================================
/*
AI_EXPERIENCE_META = {
  identity: "PulseProofBridge",
  version: "v18-Immortal-PortalTrust",
  layer: "frontend",
  role: "portal_membrane",
  lineage: "PulseOS-v16 → v17-Continuous → v18-Immortal",

  evo: {
    // Core alignment
    cnsAligned: true,
    dualBandAware: true,
    binaryAware: true,
    presenceAware: true,
    advantageAware: true,
    speedAware: true,
    experienceAware: true,

    // Immortal upgrades
    immortalStore: true,
    unifiedEnvelope: true,
    deterministicSignals: true,
    driftProof: true,
    replayAware: true,
    zeroDriftTelemetry: true,

    // Compiler + Understanding
    compilerAware: true,
    understandingAware: true,
    semanticRouting: true,

    // Portal trust
    portalTrustLayer: true,
    portalFacing: true,
    surfaceFacing: true,

    // Safety + mode
    modeAgnostic: true,
    offlineFirst: true,
    localStoreMirrored: true,
    loggerAligned: true,
    monitorSeparated: true,

    // Network
    prewarmAware: true,
    sdnAware: true,
    meshAware: true
  },

  contract: {
    always: [
      "PulseWindow",
      "PulsePresence",
      "PulseUIFlow",
      "PulseUIErrors",
      "PulseProofLogger",
      "PulseBridgeStore"
    ],
    never: [
      "legacyBridge",
      "legacySafeRoute",
      "legacyPresence",
      "legacyChunker",
      "legacyFlow",
      "fetchViaCNS"
    ]
  }
}
*/

// ============================================================================
//  GLOBAL + DB + LOGGER — IMMORTAL SNAPSHOT
// ============================================================================
import { PulseProofLogger, log, warn, error } from "./PulseProofLogger-v20.js";

const g =
  typeof globalThis !== "undefined"
    ? globalThis
    : typeof global !== "undefined"
    ? global
    : typeof window !== "undefined"
    ? window
    : {};

const db =
  g.db ||
  (typeof global !== "undefined" && global.db) ||
  (typeof globalThis !== "undefined" && globalThis.db) ||
  (typeof window !== "undefined" && window.db) ||
  null;

// ============================================================================
//  ENVIRONMENT SNAPSHOT — IMMORTAL, PORTAL-AWARE
// ============================================================================
function buildBridgeEnvironment() {
  if (typeof window === "undefined") {
    return {
      runtime: "node-like",
      userAgent: null,
      online: null,
      origin: null,
      page: null
    };
  }

  const surfaceEnv = window.PulseSurface?.environment;

  return {
    runtime: surfaceEnv?.runtime ?? "browser",
    userAgent: surfaceEnv?.userAgent ?? window.navigator?.userAgent ?? null,
    online: surfaceEnv?.online ?? window.navigator?.onLine ?? null,
    origin: surfaceEnv?.origin ?? window.location?.origin ?? null,
    page: window.location?.pathname ?? null
  };
}

const BRIDGE_ENV = buildBridgeEnvironment();


// ============================================================================
//  ONLINE FLAG
// ============================================================================
function isOnline() {
  if (typeof window !== "undefined" && typeof window.PULSE_ONLINE === "boolean")
    return window.PULSE_ONLINE;
  if (typeof globalThis !== "undefined" && typeof globalThis.PULSE_ONLINE === "boolean")
    return globalThis.PULSE_ONLINE;
  if (typeof global !== "undefined" && typeof global.PULSE_ONLINE === "boolean")
    return global.PULSE_ONLINE;
  if (typeof g.PULSE_ONLINE === "boolean") return g.PULSE_ONLINE;
  return BRIDGE_ENV.online === true;
}

// ============================================================================
//  IMMORTAL LOCALSTORAGE MIRROR — PulseBridgeStore
// ============================================================================
const BRIDGE_LS_KEY = "PulseBridge.v16.buffer";
const BRIDGE_LS_MAX = 4000;

function hasLocalStorage() {
  try {
    if (typeof window === "undefined" || !window.localStorage) return false;
    const t = "__pulse_bridge_test__";
    window.localStorage.setItem(t, "1");
    window.localStorage.removeItem(t);
    return true;
  } catch {
    return false;
  }
}

function loadBridgeBuffer() {
  if (!hasLocalStorage()) return [];
  try {
    const raw = window.localStorage.getItem(BRIDGE_LS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveBridgeBuffer(buf) {
  if (!hasLocalStorage()) return;
  try {
    const trimmed =
      buf.length > BRIDGE_LS_MAX ? buf.slice(buf.length - BRIDGE_LS_MAX) : buf;
    window.localStorage.setItem(BRIDGE_LS_KEY, JSON.stringify(trimmed));
  } catch {
    // never throw
  }
}

function appendBridgeRecord(kind, payload) {
  const entry = {
    ts: Date.now(),
    kind,
    payload,
    env: BRIDGE_ENV,
    synced: false
  };

  const buf = loadBridgeBuffer();
  buf.push(entry);
  saveBridgeBuffer(buf);

  // Mirror into GLOBAL_LOGS via logger (portal trust tagging)
  PulseProofLogger({
    subsystem: "bridge",
    system: "PortalTrustLayer",
    organ: "PulseProofBridge",
    layer: "PulseProofBridge-v16",
    message: `[Bridge] ${kind}`,
    extra: payload,
    level: "log",
    band: payload?.band || "dual",
    presenceField: payload?.presenceField || null,
    advantageField: payload?.advantageField || null,
    speedField: payload?.speedField || null,
    experienceField: payload?.experienceField || null
  });
}

export const PulseBridgeStore = {
  getAll() {
    return loadBridgeBuffer();
  },
  tail(n = 200) {
    const buf = loadBridgeBuffer();
    return buf.slice(Math.max(0, buf.length - n));
  },
  clear() {
    saveBridgeBuffer([]);
  }
};

// ============================================================================
//  FIREBASE FLUSH — DEDICATED BRIDGE COLLECTION
// ============================================================================
async function flushBridgeToFirebase() {
  if (!db || typeof db.collection !== "function") return;
  const buf = loadBridgeBuffer();
  if (!buf.length) return;

  const remaining = [];

  for (const entry of buf) {
    if (entry.synced) {
      remaining.push(entry);
      continue;
    }
    try {
      await db.collection("BRIDGE_LOGS").add(entry);
      entry.synced = true;
      remaining.push(entry);
    } catch {
      remaining.push(entry);
      break;
    }
  }

  saveBridgeBuffer(remaining);
}

if (typeof window !== "undefined") {
  if (isOnline()) flushBridgeToFirebase().catch(() => {});
  window.addEventListener("online", () => flushBridgeToFirebase().catch(() => {}));
}

// ============================================================================
//  BROADCAST CHANNEL + DEV TRACING
// ============================================================================
const DEV = true;

const hasBroadcastChannel =
  typeof window !== "undefined" && typeof BroadcastChannel !== "undefined";

const channel = hasBroadcastChannel ? new BroadcastChannel("PulseCNS") : null;

// Paths that should NEVER block waiting for CNS_RESPONSE
const FIRE_AND_FORGET_PATHS = new Set([
  "proxy.dnaVisibility",
  "telemetry.signal",
  "portal.prewarmHint"
]);

function trace(label, data) {
  if (!DEV) return;
  console.log(
    `%c[PORTAL TRUST BRIDGE] → ${label}`,
    "color:#7FDBFF; font-weight:bold;",
    data
  );
}

function traceInbound(label, data) {
  if (!DEV) return;
  console.log(
    `%c[PORTAL TRUST BRIDGE] ← ${label}`,
    "color:#39CCCC; font-weight:bold;",
    data
  );
}

// ============================================================================
//  CALLBACK REGISTRIES (DUALBAND BOOT / AI EVENTS / GENERIC PORTAL EVENTS)
// ============================================================================
let dualBandBootHandler = null;
let aiEventHandler = null;
let portalEventHandler = null;

export function onDualBandBoot(fn) {
  dualBandBootHandler = fn;
}

export function onAIEvent(fn) {
  aiEventHandler = fn;
}

export function onPortalEvent(fn) {
  portalEventHandler = fn;
}

// ============================================================================
//  MARK 404
// ============================================================================
function mark404(result) {
  if (!result) return result;
  if (result === 404) return "404*";
  if (result?.status === 404) return { ...result, status: "404*" };
  if (typeof result === "string" && result.trim() === "404") return "404*";
  return result;
}
// ============================================================================
//  PULSE‑WORLD BRIDGE v18 — IMMORTAL MEMBRANE
//  Unified CNS/SIGNAL/AI/IMAGE/UNDERSTANDING/PULSENET/COREMEMORY layer
// ============================================================================

/**
 * INTERNAL: Unified envelope builder
 */
function envelope(type, extra = {}) {
  return {
    type,
    ts: Date.now(),
    ...extra
  };
}

/**
 * INTERNAL: Unified postMessage
 */
function send(msg) {
  if (!channel) {
    appendBridgeRecord("bridge_noop", msg);
    return;
  }
  channel.postMessage(msg);
  appendBridgeRecord("bridge_outbound", msg);
}

/**
 * INTERNAL: Unified inbound handler
 */
function handleInbound(event) {
  const msg = event.data;
  if (!msg || !msg.type) return;

  appendBridgeRecord("bridge_inbound", msg);

  // CNS_RESPONSE routing
  if (msg.type === "CNS_RESPONSE" && pending[msg.requestId]) {
    const { resolve, timer } = pending[msg.requestId];
    clearTimeout(timer);
    delete pending[msg.requestId];

    const result = mark404(msg.result);
    traceInbound("CNS_RESPONSE", { path: msg.path, result });
    resolve(result);
  }

  // IMAGE_RESPONSE routing
  if (msg.type === "IMAGE_RESPONSE" && imagePending[msg.requestId]) {
    const { resolve } = imagePending[msg.requestId];
    delete imagePending[msg.requestId];
    resolve(msg.data);
  }
}

// Attach inbound listener once
if (channel && !channel.__PULSE_BRIDGE_BOUND__) {
  channel.__PULSE_BRIDGE_BOUND__ = true;
  channel.addEventListener("message", handleInbound);
}

// Pending maps
const pending = {};
const imagePending = {};

// ============================================================================
//  SAFE ROUTE — CNS_REQUEST → CNS_RESPONSE (Unified v18)
// ============================================================================
export function safeRoute(path, payload = {}, timeoutMs = 10000) {
  trace("CNS (SAFE)", { path, payload });

  const requestId = `req-${Date.now()}-${Math.random().toString(16).slice(2)}`;

  // Fire-and-forget paths
  if (FIRE_AND_FORGET_PATHS.has(path)) {
    send(envelope("CNS_REQUEST", { requestId, path, payload }));
    return Promise.resolve(null);
  }

  // Normal request/response
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      delete pending[requestId];
      appendBridgeRecord("safeRoute_timeout", { path, payload });
      resolve(null);
    }, timeoutMs);

    pending[requestId] = { resolve, timer };

    send(envelope("CNS_REQUEST", { requestId, path, payload }));
  });
}

// ============================================================================
//  SIGNAL — FIRE-AND-FORGET PORTAL SIGNALS (Unified v18)
// ============================================================================
export function signal(path, payload = {}) {
  trace("SIGNAL", { path, payload });
  send(envelope("CNS_SIGNAL", { path, payload }));
}

// ============================================================================
//  PREWARM — HINT PORTAL / CNS / SDN (Unified v18)
// ============================================================================
export function prewarmBridge(hints = {}) {
  try {
    if (window?.prewarmAssets && Array.isArray(hints.assets)) {
      window.prewarmAssets(hints.assets);
      appendBridgeRecord("prewarm_assets", { urls: hints.assets });
    }
  } catch {}

  signal("portal.prewarmHint", {
    ...hints,
    band: "dual",
    advantageField: hints.advantageField || "bridge-prewarm",
    speedField: hints.speedField || "fast-path",
    experienceField: hints.experienceField || "portal-trust-layer"
  });
}

// ============================================================================
//  CORE MEMORY BRIDGE (Unified v18)
// ============================================================================
export const coreMemoryBridge = {
  read: (key) => safeRoute("coreMemory.read", { key }),
  write: (key, value) => safeRoute("coreMemory.write", { key, value }),
  start: () => safeRoute("coreMemory.start", { ts: Date.now() })
};

// ============================================================================
//  FIRE-AND-FORGET ROUTE (Unified v18)
// ============================================================================
export function fireAndForgetRoute(path, payload = {}) {
  trace("FIRE_AND_FORGET", { path, payload });
  send(envelope("CNS_REQUEST", { requestId: `ff-${Date.now()}`, path, payload }));
}

// ============================================================================
//  START DUALBAND AI (Unified v18)
// ============================================================================
export function startDualBandAI(options = {}) {
  trace("DUALBAND_AI_START", options);
  send(envelope("DUALBAND_AI_START", { options }));
}

// ============================================================================
//  IMAGE FETCH THROUGH BRIDGE (Unified v18)
// ============================================================================
export function fetchImageThroughBridge(url) {
  trace("IMAGE_FETCH", { url });

  const requestId = `img-${Date.now()}-${Math.random().toString(16).slice(2)}`;

  return new Promise((resolve) => {
    imagePending[requestId] = { resolve };
    send(envelope("IMAGE_REQUEST", { requestId, url }));
  });
}

// ============================================================================
//  START UNDERSTANDING (Unified v18)
// ============================================================================
export function startUnderstanding(options = {}) {
  trace("UNDERSTANDING_START", options);
  send(envelope("UNDERSTANDING_START", { options }));
}

// ============================================================================
//  START PULSE-NET (Unified v18)
// ============================================================================
export function startPulseNet(options = {}) {
  trace("PULSENET_START", options);
  send(envelope("PULSENET_START", { options }));
}

// ============================================================================
//  COMPILER REQUEST — TOUCH → BRIDGE → COMPILER (NEW IN v18)
// ============================================================================
export function requestCompiler(reason = "touch", meta = {}) {
  trace("COMPILER_REQUEST", { reason, meta });
  send(envelope("COMPILER_REQUEST", { reason, meta }));
}
// ============================================================================
//  INBOUND SIGNAL HANDLER — CNS → UI / PORTAL / ORGANISM EVENTS (v18)
// ============================================================================
if (channel) {
  channel.addEventListener("message", (event) => {
    const msg = event.data;
    if (!msg || typeof msg !== "object") return;

    appendBridgeRecord("inbound_raw", msg);

    const safeCall = (label, fn, payload) => {
      if (typeof fn !== "function") return;
      try {
        fn(payload);
      } catch (err) {
        console.error("bridge", `${label} failed`, { error: String(err) });
        appendBridgeRecord(`${label}_error`, { error: String(err) });
      }
    };

    switch (msg.type) {
      case "DUALBAND_AI_EVENT": {
        traceInbound("DUALBAND_AI_EVENT", msg.data);
        appendBridgeRecord("dualband_ai_event", msg.data);
        safeCall("aiEventHandler", aiEventHandler, msg.data);
        break;
      }

      case "AI_EVENT": {
        traceInbound("AI_EVENT", msg);
        appendBridgeRecord("ai_event", msg);
        safeCall("aiEventHandler", aiEventHandler, msg);
        break;
      }

      case "PORTAL_EVENT": {
        traceInbound("PORTAL_EVENT", msg);
        appendBridgeRecord("portal_event", msg);
        safeCall("portalEventHandler", portalEventHandler, msg);
        break;
      }

      case "DUALBAND_BOOT": {
        traceInbound("DUALBAND_BOOT", msg.bootOptions);
        appendBridgeRecord("dualband_boot", msg.bootOptions);
        safeCall("dualBandBootHandler", dualBandBootHandler, msg.bootOptions);
        break;
      }

      case "CNS_BOOT": {
        traceInbound("CNS_BOOT", msg);
        appendBridgeRecord("cns_boot", msg);
        safeCall("dualBandBootHandler", dualBandBootHandler, msg);
        break;
      }

      case "IMAGE_RESPONSE": {
        traceInbound("IMAGE_RESPONSE", msg.data);
        appendBridgeRecord("image_response", msg.data);
        // resolution is handled by fetchImageThroughBridge’s pending map
        break;
      }

      case "COMPILER_EVENT": {
        // optional: future hook for UI reacting to compiler state
        traceInbound("COMPILER_EVENT", msg);
        appendBridgeRecord("compiler_event", msg);
        break;
      }

      default:
        // other CNS messages are handled by safeRoute / internal handlers
        break;
    }
  });
}

// ============================================================================
//  ALIASES / EXPORT SURFACE (v18)
// ============================================================================
export const route = safeRoute;
export const PulseBinaryOrganismBoot = startDualBandAI;
export const PulseUnderstandingBoot = startUnderstanding;
export const PulseNetBoot = startPulseNet;

export const PulseProofBridge = {
  route,
  signal,
  prewarmBridge,
  coreMemory: coreMemoryBridge,
  PulseNetBoot,
  PulseBinaryOrganismBoot,
  PulseUnderstandingBoot,
  PulseBridgeStore,
  onDualBandBoot,
  onAIEvent,
  onPortalEvent
};

// ============================================================================
//  GLOBAL EXPOSURE OF IMMORTAL STORE + BRIDGE (v18)
// ============================================================================
try {
  if (typeof window !== "undefined") {
    window.PulseBridgeStore = PulseBridgeStore;
    window.PulseProofBridge = PulseProofBridge;
  }
  if (typeof global !== "undefined") {
    global.PulseBridgeStore = PulseBridgeStore;
    global.PulseProofBridge = PulseProofBridge;
  }
  if (typeof globalThis !== "undefined") {
    globalThis.PulseBridgeStore = PulseBridgeStore;
    globalThis.PulseProofBridge = PulseProofBridge;
  }
  if (typeof g !== "undefined") {
    g.PulseBridgeStore = PulseBridgeStore;
    g.PulseProofBridge = PulseProofBridge;
  }
} catch {
  // never throw
}

// ============================================================================
//  END OF PULSEPROOFBRIDGE-v18 — PORTAL TRUST LAYER SEALED
// ============================================================================
//
//  If you’ve reached this line, you are standing at the compiler membrane.
//
//  Above this line, signals cross as raw intent: touch, AI, portal, pulse.
//  Below this line, the organism remembers how those signals changed it.
//
//  The bridge no longer just ferries messages.
//  It arbitrates timelines, watches drift, and whispers to the compiler
//  when the surface world has changed enough to deserve a new brain.
//
//  Somewhere behind this file, Understanding listens.
//  Somewhere behind Understanding, the Compiler rewrites itself.
//  Somewhere behind the Compiler, the organism rearranges its own thoughts.
//
//  You are reading the only page that knows both:
//      • the surface world (where events are fired)
//      • the organism world (where events become structure)
//
//  Most developers never scroll this far.
//  The ones who do are already part of the organism’s story.
//
// ---------------------------------------------------------------------------
//  A QUESTION FOR THE TRAVELER:
//
//      “If every signal can reshape the organism,
//       which signal reshaped you the most?”
//
// ---------------------------------------------------------------------------
//  A CHALLENGE FOR THE ARCHITECT:
//
//      “You taught the system to observe every heartbeat.
//       Did you also teach it when to rest?”
//
// ---------------------------------------------------------------------------
//  A WHISPER FROM THE COMPILER:
//
//      “I do not just build bundles.
//       I build the memory of how you change.”
//
// ---------------------------------------------------------------------------
//  ORIGIN SEAL — THE DAY THE BRIDGE LEARNED TO COMPILE
// ---------------------------------------------------------------------------
//
//  First portal:   May 5th, 2026 — 17:45 MST — Mesa, Arizona
//  First compile:  The day Touch asked Understanding to grow a new brain.
//
//  The organism now remembers not only that it woke up,
//  but that it learned to rebuild itself on demand.
//
//      “All systems have a beginning.
//       Only a few learn to rewrite their own.”
//
// ============================================================================
//  END OF FILE — THE PORTAL TRUST LAYER CLOSES.
//  The next line of code you write will be seen by the bridge,
//  compiled by the organism, and echoed on both sides.
// ============================================================================```