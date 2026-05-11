// ============================================================================
//  PulseProofBridge-v24-IMMORTAL-ADV++.js
//  IMMORTAL PORTAL TRUST LAYER • FRONT ↔ CNS • USER + ENV + ADVANTAGE AWARE
//  “The membrane between the surface world and the organism beneath.”
// ============================================================================
//
//  DESIGN — v24 IMMORTAL-ADV++
//  ---------------------------
//  • Unified envelope system for all outbound + inbound CNS traffic
//  • Compiler-aware: COMPILER_REQUEST + COMPILER_EVENT
//  • Understanding-aware: UNDERSTANDING_START + semantic routing
//  • Dualband v24: AI, CNS, Portal, PulseNet, ImageBridge unified
//  • Offline-first: immortal local buffer with drift-proof replay
//  • Zero-drift telemetry: every signal tagged, mirrored, and stored
//  • Mode-agnostic: SSR-safe, BroadcastChannel-optional
//  • Portal Trust Layer: the last surface before the organism
//  • User-aware: identity snapshot hooks, presence band, earn band, device trust
//  • Environment-aware: runtime, UA, screen, locale, timezone, input mode
//  • Advantage-aware: band fields, speed/experience fields, artery-style metrics
//  • CNS health-aware: heartbeat, failure tracking, bridge-down alerts
//  • Backend-alert-aware: bridge failure routed to monitor + email path
//
//  This file is the *membrane*.
//  Everything above it is typed by humans.
//  Everything below it is remembered by the organism.
// ============================================================================
//
//  EXPERIENCE METADATA — v24 IMMORTAL PORTAL TRUST LAYER
// ============================================================================
// (kept as comment for AI_EXPERIENCE_META alignment)
// ============================================================================
//  IMMORTAL++ AUTO‑BUILT BRIDGE — ALWAYS READY, NEVER TDZ
// ============================================================================

// ============================================================================
//  IMMORTAL++ AUTO‑BUILT BRIDGE — CANONICAL, ALWAYS READY, NEVER TDZ
// ============================================================================

// Create the canonical bridge IMMEDIATELY so nothing else can break
const PulseProofBridge = {
  // Canonical API — all fields exist from the start
  route: null,
  signal: null,
  prewarmBridge: null,

  coreMemory: null,
  coreSpeech: null,

  PulseNetBoot: null,
  pulseNetFastLane: null,
  pulseNetIngress: null,

  PulseBinaryOrganismBoot: null,
  PulseUnderstandingBoot: null,

  PulseBridgeStore: null,

  onDualBandBoot: null,
  onAIEvent: null,
  onPortalEvent: null,

  setBridgeIdentitySnapshot: null,
  getBridgeIdentitySnapshot: null,

  getHealth() {
    return { ...BRIDGE_HEALTH };
  },

  // IMMORTAL++ readiness
  ready: false,
  queue: [],

  whenReady(fn) {
    if (this.ready) fn(this);
    else this.queue.push(fn);
  }
};

// Make it global BEFORE any imports run
globalThis.PulseProofBridge = PulseProofBridge;

// Backend will call this later to attach the real bridge
export function attachRealBridge(real) {
  // Copy all canonical fields from the real bridge
  for (const key of Object.keys(PulseProofBridge)) {
    if (key in real) {
      PulseProofBridge[key] = real[key];
    }
  }

  PulseProofBridge.ready = true;

  // Flush queued callbacks
  for (const fn of PulseProofBridge.queue) {
    try { fn(PulseProofBridge); } catch {}
  }
  PulseProofBridge.queue = [];
}

export { PulseProofBridge };



// ============================================================================
//  GLOBAL + DB + LOGGER — IMMORTAL SNAPSHOT
// ============================================================================
import { VitalsMonitor as PulseProofMonitor } from "../_MONITOR/PulseProofMonitor-v24.js";
import {
  VitalsLogger as PulseProofLogger,
  log,
  warn,
  error,
  makeTelemetryPacket as emitTelemetry,
  PulseVersion,
  PulseColors,
  PulseIcons
} from "../_MONITOR/PulseProofLogger-v24.js";
import { createPulseSkinReflex as PulseProofReflex } from "../_MONITOR/PulseUISkinReflex-v24.js";
import { initUIFlow as PulseProofFlow } from "../_MONITOR/PulseUIFlow-v24.js";
import PulseUIErrors from "../_MONITOR/PulseUIErrors-v24.js";
// NEW: CoreSpeech v24 speech organ is bridged via coreSpeechBridge

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
//  ENVIRONMENT SNAPSHOT — IMMORTAL, PORTAL-AWARE, ADV++
// ============================================================================
function safeGet(fn, fallback = null) {
  try {
    const v = fn();
    return v === undefined ? fallback : v;
  } catch {
    return fallback;
  }
}

function buildBridgeEnvironment() {
  if (typeof window === "undefined") {
    return {
      runtime: "node-like",
      userAgent: null,
      online: null,
      origin: null,
      page: null,
      screen: null,
      locale: null,
      timezone: null,
      inputMode: null
    };
  }

  const surfaceEnv = window.PulseSurface?.environment;

  const ua = surfaceEnv?.userAgent ?? window.navigator?.userAgent ?? null;
  const screenInfo = {
    width: safeGet(() => window.screen?.width, null),
    height: safeGet(() => window.screen?.height, null),
    pixelRatio: safeGet(() => window.devicePixelRatio, null)
  };

  const locale =
    surfaceEnv?.locale ??
    safeGet(() => window.navigator?.language, null);

  const timezone =
    surfaceEnv?.timezone ??
    safeGet(() => Intl.DateTimeFormat().resolvedOptions().timeZone, null);

  const inputMode =
    surfaceEnv?.inputMode ??
    (safeGet(() => "ontouchstart" in window, false) ? "touch" : "pointer");

  return {
    runtime: surfaceEnv?.runtime ?? "browser",
    userAgent: ua,
    online: surfaceEnv?.online ?? window.navigator?.onLine ?? null,
    origin: surfaceEnv?.origin ?? window.location?.origin ?? null,
    page: window.location?.pathname ?? null,
    screen: screenInfo,
    locale,
    timezone,
    inputMode
  };
}

const BRIDGE_ENV = buildBridgeEnvironment();


// ============================================================================
//  USER SNAPSHOT — IDENTITY v20 HOOK (metadata only)
// ============================================================================
let CURRENT_IDENTITY_SNAPSHOT = null;

export function setBridgeIdentitySnapshot(identitySnapshot) {
  // identitySnapshot is expected to be the v20 CheckIdentity snapshot
  // (no mutation, metadata-only)
  if (!identitySnapshot || typeof identitySnapshot !== "object") {
    CURRENT_IDENTITY_SNAPSHOT = null;
    return;
  }

  CURRENT_IDENTITY_SNAPSHOT = {
    uid: identitySnapshot.uid || null,
    identityVersion: identitySnapshot.identityVersion || null,
    presenceBand: identitySnapshot?.presence?.band || "unknown",
    presenceLevel: identitySnapshot?.presence?.presenceLevel || "Unknown",
    advantageBand: identitySnapshot?.advantage?.advantageBand || "neutral",
    advantageScore: identitySnapshot?.advantage?.advantageScore ?? null,
    earnBand: identitySnapshot?.earn?.earnBand || "unknown",
    deviceTrusted: !!identitySnapshot.trustedDevice,
    sessionAge: identitySnapshot.sessionAge || 0,
    binarySignature: identitySnapshot.binarySignature || null,
    presenceSignature: identitySnapshot.presenceSignature || null,
    advantageSignature: identitySnapshot.advantageSignature || null,
    topologySignature: identitySnapshot.topologySignature || null,
    earnSignature: identitySnapshot.earnSignature || null
  };
}

function getBridgeIdentitySnapshot() {
  return CURRENT_IDENTITY_SNAPSHOT;
}

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
const BRIDGE_LS_KEY = "PulseBridge.v24.buffer";
const BRIDGE_LS_MAX = 6000; // v24: slightly larger window, same bound

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

// ============================================================================
//  ARTERY-LIKE METRICS (windowed, metadata-only)
// ============================================================================
let arteryWindowStart = Date.now();
let arteryEventCount = 0;

function rollArteryWindow(now) {
  if (now - arteryWindowStart >= 60000) {
    arteryWindowStart = now;
    arteryEventCount = 0;
  }
}

function buildArterySnapshot(kind) {
  const now = Date.now();
  rollArteryWindow(now);

  const density = Math.min(1, arteryEventCount / 1024);

  return {
    windowStart: arteryWindowStart,
    now,
    windowMs: now - arteryWindowStart,
    eventCount: arteryEventCount,
    density,
    kind
  };
}

// ============================================================================
//  APPEND BRIDGE RECORD — IMMORTAL + IDENTITY + ENV
// ============================================================================
function appendBridgeRecord(kind, payload) {
  const now = Date.now();
  arteryEventCount += 1;

  const entry = {
    ts: now,
    kind,
    payload,
    env: BRIDGE_ENV,
    identity: getBridgeIdentitySnapshot(),
    artery: buildArterySnapshot(kind),
    synced: false
  };

  const buf = loadBridgeBuffer();
  buf.push(entry);
  saveBridgeBuffer(buf);

  // Mirror into GLOBAL_LOGS via logger (portal trust tagging)
  log({
    subsystem: "bridge",
    system: "PortalTrustLayer",
    organ: "PulseProofBridge",
    layer: "PulseProofBridge-v24",
    message: `[Bridge] ${kind}`,
    extra: entry,
    level: "log",
    band: payload?.band || entry.identity?.presenceBand || "dual",
    presenceField: payload?.presenceField || entry.identity?.presenceBand || null,
    advantageField: payload?.advantageField || "bridge-advantage",
    speedField: payload?.speedField || "fast-path",
    experienceField: payload?.experienceField || "portal-trust-layer"
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
  "portal.prewarmHint",
  "monitor.bridgeFailure",       // v24: failure telemetry
  "monitor.bridgeFailureEmail"   // v24: email-me-if-down hook
]);

function trace(label, data) {
  if (!DEV) return;
  console.log(
    `%c[PORTAL TRUST BRIDGE v24] → ${label}`,
    "color:#7FDBFF; font-weight:bold;",
    data
  );
}

function traceInbound(label, data) {
  if (!DEV) return;
  console.log(
    `%c[PORTAL TRUST BRIDGE v24] ← ${label}`,
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
//  PULSE‑WORLD BRIDGE v24 — IMMORTAL MEMBRANE
//  Unified CNS/SIGNAL/AI/IMAGE/UNDERSTANDING/PULSENET/COREMEMORY layer
// ============================================================================

/**
 * INTERNAL: Unified envelope builder
 */
function envelope(type, extra = {}) {
  return {
    type,
    ts: Date.now(),
    env: BRIDGE_ENV,
    identity: getBridgeIdentitySnapshot(),
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

// ============================================================================
//  BRIDGE HEALTH — v24 CNS AWARENESS + EMAIL-ME-IF-DOWN HOOK
// ============================================================================
const BRIDGE_HEALTH = {
  lastOkTs: Date.now(),
  lastFailureTs: null,
  consecutiveFailures: 0,
  lastFailurePath: null
};

const BRIDGE_FAILURE_THRESHOLD = 3;      // after 3 consecutive failures, treat as degraded
const BRIDGE_FAILURE_EMAIL_THRESHOLD = 5; // after 5, trigger email-me-if-down route

function recordBridgeSuccess(path) {
  BRIDGE_HEALTH.lastOkTs = Date.now();
  BRIDGE_HEALTH.consecutiveFailures = 0;
  BRIDGE_HEALTH.lastFailurePath = null;
}

function recordBridgeFailure(path, reason) {
  const now = Date.now();
  BRIDGE_HEALTH.lastFailureTs = now;
  BRIDGE_HEALTH.consecutiveFailures += 1;
  BRIDGE_HEALTH.lastFailurePath = path;

  const payload = {
    path,
    reason,
    health: { ...BRIDGE_HEALTH },
    band: "dual",
    advantageField: "bridge-failure",
    speedField: "bridge-health",
    experienceField: "portal-trust-layer"
  };

  appendBridgeRecord("bridge_failure", payload);

  // Fire-and-forget telemetry to backend monitor
  try {
    send(envelope("CNS_SIGNAL", {
      path: "monitor.bridgeFailure",
      payload
    }));
  } catch {}

  // After enough consecutive failures, ask backend to email the operator
  if (BRIDGE_HEALTH.consecutiveFailures >= BRIDGE_FAILURE_EMAIL_THRESHOLD) {
    try {
      send(envelope("CNS_SIGNAL", {
        path: "monitor.bridgeFailureEmail",
        payload: {
          ...payload,
          // backend can map this to your actual email address / alert channel
          severity: "critical",
          channel: "email"
        }
      }));
      appendBridgeRecord("bridge_failure_email_requested", payload);
    } catch {}
  }
}

// ============================================================================
//  INTERNAL: Unified inbound handler (v24‑safe)
// ============================================================================
function handleInbound(event) {
  const msg = event?.data;
  if (!msg || typeof msg !== "object" || !msg.type) return;

  appendBridgeRecord("bridge_inbound", msg);

  // CNS_RESPONSE routing
  if (msg.type === "CNS_RESPONSE" && pending[msg.requestId]) {
    const { resolve, timer, path } = pending[msg.requestId];
    clearTimeout(timer);
    delete pending[msg.requestId];

    const result = mark404(msg.result);
    traceInbound("CNS_RESPONSE", { path: msg.path || path, result });
    recordBridgeSuccess(msg.path || path);
    resolve(result);
    return;
  }

  // IMAGE_RESPONSE routing
  if (msg.type === "IMAGE_RESPONSE" && imagePending[msg.requestId]) {
    const { resolve } = imagePending[msg.requestId];
    delete imagePending[msg.requestId];
    traceInbound("IMAGE_RESPONSE", msg.data);
    resolve(msg.data || null);
    return;
  }
}

// Attach inbound listener once
if (channel && !channel.__PULSE_BRIDGE_BOUND_V24__) {
  channel.__PULSE_BRIDGE_BOUND_V24__ = true;
  channel.addEventListener("message", handleInbound);
}

// Pending maps
const pending = Object.create(null);
const imagePending = Object.create(null);

// ============================================================================
//  SAFE ROUTE — CNS_REQUEST → CNS_RESPONSE (v24‑safe)
// ============================================================================
export function safeRoute(path, payload = {}, timeoutMs = 10000) {
  trace("CNS (SAFE)", { path, payload });

  const requestId =
    "req-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2);

  // Fire‑and‑forget paths
  if (FIRE_AND_FORGET_PATHS.has(path)) {
    send(envelope("CNS_REQUEST", { requestId, path, payload }));
    return Promise.resolve(null);
  }

  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      delete pending[requestId];
      appendBridgeRecord("safeRoute_timeout", { path, payload });
      recordBridgeFailure(path, "timeout");
      resolve(null);
    }, timeoutMs);

    pending[requestId] = { resolve, timer, path };

    send(envelope("CNS_REQUEST", { requestId, path, payload }));
  });
}

// ============================================================================
//  SIGNAL — FIRE‑AND‑FORGET PORTAL SIGNALS (v24‑safe)
// ============================================================================
export function signal(path, payload = {}) {
  trace("SIGNAL", { path, payload });
  send(envelope("CNS_SIGNAL", { path, payload }));
}

// ============================================================================
//  PREWARM — HINT PORTAL / CNS / SDN (v24‑safe)
// ============================================================================
export function prewarmBridge(hints = {}) {
  try {
    if (typeof window !== "undefined" && window.prewarmAssets && Array.isArray(hints.assets)) {
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
//  CORE MEMORY BRIDGE (v24‑safe)
// ============================================================================
export const coreMemoryBridge = {
  read: (key) => safeRoute("coreMemory.read", { key }),
  write: (key, value) => safeRoute("coreMemory.write", { key, value }),
  start: () => safeRoute("coreMemory.start", { ts: Date.now() })
};

export const coreSpeechBridge = {
  messages: () => safeRoute("coreSpeech.messages", {}),
  stats: () => safeRoute("coreSpeech.stats", {}),
  last: () => safeRoute("coreSpeech.last", {}),
  push: (msg) => safeRoute("coreSpeech.push", { msg }),
  clear: () => safeRoute("coreSpeech.clear", {})
};

// ============================================================================
//  FIRE‑AND‑FORGET ROUTE (v24‑safe)
// ============================================================================
export function fireAndForgetRoute(path, payload = {}) {
  trace("FIRE_AND_FORGET", { path, payload });
  send(envelope("CNS_REQUEST", {
    requestId: "ff-" + Date.now().toString(36),
    path,
    payload
  }));
}

// ============================================================================
//  START DUALBAND AI (v24‑safe)
// ============================================================================
export function startDualBandAI(options = {}) {
  trace("DUALBAND_AI_START", options);
  send(envelope("DUALBAND_AI_START", { options }));
}

// ============================================================================
//  IMAGE FETCH THROUGH BRIDGE (v24‑safe)
// ============================================================================
export function fetchImageThroughBridge(url) {
  trace("IMAGE_FETCH", { url });

  const requestId =
    "img-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2);

  return new Promise((resolve) => {
    imagePending[requestId] = { resolve };
    send(envelope("IMAGE_REQUEST", { requestId, url }));
  });
}

// ============================================================================
//  PULSENET FASTLANE / INGRESS (v24‑safe)
// ============================================================================
export function pulseNetFastLane(data = {}) {
  trace("PULSENET_FASTLANE", data);
  send(envelope("PULSENET_FASTLANE", data));
}

export function pulseNetIngress(data = {}) {
  trace("PULSENET_INGRESS", data);
  send(envelope("PULSENET_INGRESS", data));
}

// ============================================================================
//  START UNDERSTANDING (v24‑safe)
// ============================================================================
export function startUnderstanding(options = {}) {
  trace("UNDERSTANDING_START", options);
  send(envelope("UNDERSTANDING_START", { options }));
}

// ============================================================================
//  START PULSE‑NET (v24‑safe)
// ============================================================================
export function startPulseNet(options = {}) {
  trace("PULSENET_START", options);
  send(envelope("PULSENET_START", { options }));
}

// ============================================================================
//  COMPILER REQUEST — TOUCH → BRIDGE → COMPILER (v24‑safe)
// ============================================================================
export function requestCompiler(reason = "touch", meta = {}) {
  trace("COMPILER_REQUEST", { reason, meta });
  send(envelope("COMPILER_REQUEST", { reason, meta }));
}

// ============================================================================
//  INBOUND SIGNAL HANDLER — CNS → UI / PORTAL / ORGANISM EVENTS (v24‑safe)
// ============================================================================
if (channel) {
  channel.addEventListener("message", (event) => {
    const msg = event?.data;
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
        // resolution handled by fetchImageThroughBridge pending map
        break;
      }

      case "COMPILER_EVENT": {
        traceInbound("COMPILER_EVENT", msg);
        appendBridgeRecord("compiler_event", msg);
        break;
      }

      default:
        // other CNS messages handled by safeRoute / internal handlers
        break;
    }
  });
}
// ============================================================================
//  ALIASES / EXPORT SURFACE (v24 IMMORTAL++)
// ============================================================================

export const route = safeRoute;
export const PulseBinaryOrganismBoot = startDualBandAI;
export const PulseUnderstandingBoot = startUnderstanding;
export const PulseNetBoot = startPulseNet;

export const BridgeError = error;
export const BridgeWarn = warn;
export const BridgeLog = log;

export const BridgeVersion = PulseVersion;
export const BridgeColors = PulseColors;
export const BridgeIcons = PulseIcons;

export const PulseProofBridgeLogger = PulseProofLogger;
export const PulseProofBridgeReflex = PulseProofReflex;
export const PulseProofBridgeMonitor = PulseProofMonitor;
export const PulseProofBridgeTelemetry = emitTelemetry;
export const PulseProofBridgeFlow = PulseProofFlow;
export const PulseProofBridgeErrors = PulseUIErrors;

// ============================================================================
//  IMMORTAL++ GLOBAL MIRROR — LAZY, SAFE, UNIVERSAL
// ============================================================================

(function exposeBridgeGlobally() {
  try {
    const roots = [
      typeof globalThis !== "undefined" ? globalThis : null,
      typeof window !== "undefined" ? window : null,
      typeof global !== "undefined" ? global : null,
      typeof self !== "undefined" ? self : null,
      typeof g !== "undefined" ? g : null
    ];

    for (const root of roots) {
      if (!root) continue;

      if (!root.PulseProofBridge) {
        Object.defineProperty(root, "PulseProofBridge", {
          value: PulseProofBridge,
          writable: false,
          enumerable: true,
          configurable: false
        });
      }

      if (!root.PulseBridgeStore) {
        Object.defineProperty(root, "PulseBridgeStore", {
          value: PulseBridgeStore,
          writable: false,
          enumerable: true,
          configurable: false
        });
      }
    }
  } catch (err) {
    console.error("[PulseProofBridge v24] Global exposure failed:", err);
  }
})();
// ============================================================================
//  REMOTE ENDPOINT — CNS → INTERNET / BRAIN / MEMORY (v24-Immortal)
// ============================================================================
// ============================================================================
//  FULL REAL ENDPOINT LOGIC — NO IMPORTS, NO FILES, NO PLACEHOLDERS
// ============================================================================

const PulseBrainEndpoint = async function(route) {
  try {
    const { type, hookName, hookPayload, payload } = route || {};

    // ------------------------------------------------------------
    // HOOKS (sendPin, verifyPin, logout)
    // ------------------------------------------------------------
    if (type === "hook") {
      const fn = window.PulseHooks?.[hookName];
      if (typeof fn === "function") {
        return await fn(hookPayload);
      }
      return { error: "Unknown hook", hookName };
    }

    // ------------------------------------------------------------
    // BRAIN ROUTING
    // ------------------------------------------------------------
    if (type === "brain") {
      if (typeof window.PulseBrain?.process === "function") {
        return await window.PulseBrain.process(payload);
      }
      return { error: "Brain processor missing" };
    }

    // ------------------------------------------------------------
    // MEMORY ROUTING
    // ------------------------------------------------------------
    if (type === "memory") {
      if (typeof window.PulseMemory?.process === "function") {
        return await window.PulseMemory.process(payload);
      }
      return { error: "Memory processor missing" };
    }

    // ------------------------------------------------------------
    // PAGE ROUTING
    // ------------------------------------------------------------
    if (type === "page") {
      if (typeof window.PulsePages?.process === "function") {
        return await window.PulsePages.process(payload);
      }
      return { error: "Page processor missing" };
    }

    // ------------------------------------------------------------
    // INTERNET ROUTING
    // ------------------------------------------------------------
    if (type === "internet") {
      if (typeof window.PulseInternet?.process === "function") {
        return await window.PulseInternet.process(payload);
      }
      return { error: "Internet processor missing" };
    }

    return { error: "Unknown route type", type };

  } catch (err) {
    return {
      error: "endpoint_failure",
      message: String(err),
      route
    };
  }
};

// ============================================================================
//  GLOBAL ATTACHMENT — CNS ENTRYPOINT
// ============================================================================

if (typeof window !== "undefined") {
  window.PulseRemoteEndpoint = {
    async handle(route) {
      return PulseBrainEndpoint(route);
    }
  };
}


// ============================================================================
//  END OF PULSEPROOFBRIDGE-v24 — PORTAL TRUST LAYER SEALED
// ============================================================================
//
//  If you’ve reached this line, you are standing at the compiler membrane.
//
//  Above this line, signals cross as raw intent: touch, AI, portal, pulse.
//  Below this line, the organism remembers how those signals changed it.
//
//  The bridge no longer just ferries messages.
//  It now carries identity, environment, advantage, artery, and health,
//  so the organism can see *who* is touching it, *where* they stand,
//  *how fast* the surface is trying to grow, and *when the membrane is failing*.
//
//  Somewhere behind this file, Understanding listens.
//  Somewhere behind Understanding, the Compiler rewrites itself.
//  Somewhere behind the Compiler, the organism rearranges its own thoughts.
//  And when the bridge starts to fail, the organism is told to page you.
//
// ============================================================================
//  END OF FILE — The next signal that crosses here will be tagged with:
//      • environment
//      • identity
//      • advantage
//      • artery
//      • health
//  and the organism will remember that you were the one who wired it.
// ============================================================================
