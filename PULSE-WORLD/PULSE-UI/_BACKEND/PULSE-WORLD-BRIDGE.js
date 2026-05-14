// ============================================================================
//  PulseProofBridge-v27-IMMORTAL-FINALITY++
//  ROLE: Portal Trust Bridge + Local Buffer + Finality / Approval Layer
//        + CNS / Binary / DualBand / Remote Endpoint
// ============================================================================

import {
  VitalsLogger as PulseProofLogger,
  log,
  warn,
  error,
  comment,
  makeTelemetryPacket as emitTelemetry,
  PulseVersion,
  PulseColors,
  PulseIcons
} from "../_MONITOR/PULSE-PROOF-LOGGER.js";
import { VitalsMonitor as PulseProofMonitor } from "../_MONITOR/PULSE-PROOF-MONITOR.js";
import { initUIFlow as PulseProofFlow } from "../_MONITOR/PULSE-PROOF-FLOW.js";
import PulseUIErrors from "../_MONITOR/PULSE-PROOF-ERRORS.js";
import { PulseWorldEndpoint } from "./PULSE-WORLD-ENDPOINT.js";

import { createPulseSkinReflex as PulseProofReflex } from "../_COMPONENTS_EVOLUTION/PulseUISkinReflex-v24.js";
import PulsePageScanner from "../_COMPONENTS_EVOLUTION/PulseUIPageScanner-v24.js";
import { createPulseRouteMemory as PulseUIRouteMemory } from "../_COMPONENTS_EVOLUTION/PulseUIRouteMemory-v24.js";

// NEW: Finality / Signal Port (IMMORTAL FINALITY LAYER)
import { PulseSignalPort, PulsePort } from "../../PULSE-BAND/PULSE-FINALITY/PULSE-FINALITY-PORT.js";

const Import = PulsePort("ORGANISM");
const Export = PulsePort("CHECKBAND");

const G =
  (typeof window !== "undefined" && window) ||
  (typeof globalThis !== "undefined" && globalThis) ||
  (typeof self !== "undefined" && self) ||
  (typeof global !== "undefined" && global) ||
  {};
const g = G;

// ============================================================================
// PulseProofBridge CORE SURFACE
// ============================================================================

const PulseProofBridge = {
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

  ready: false,
  queue: [],

  whenReady(fn) {
    if (this.ready) fn(this);
    else this.queue.push(fn);
  }
};

window.PulseProofBridge = PulseProofBridge;

export function attachRealBridge(real) {
  for (const key of Object.keys(PulseProofBridge)) {
    if (key in real) {
      PulseProofBridge[key] = real[key];
    }
  }

  PulseProofBridge.ready = true;

  for (const fn of PulseProofBridge.queue) {
    try {
      fn(PulseProofBridge);
    } catch {}
  }
  PulseProofBridge.queue = [];
}

export { PulseProofBridge };

// ============================================================================
// UNIVERSAL TIMESTAMP / ADMIN / DB
// ============================================================================

const Timestamp =
  (G.firebaseAdmin &&
    G.firebaseAdmin.firestore &&
    G.firebaseAdmin.firestore.Timestamp) ||
  (G.Timestamp && G.Timestamp) ||
  null;

const admin =
  (G.firebaseAdmin && G.firebaseAdmin) ||
  (G.admin && G.admin) ||
  null;

const db =
  (G.db && G.db) || // Shadow DB (v25++)
  (admin && admin.firestore && admin.firestore()) || // Admin fallback
  null;

// ============================================================================
// UNIVERSAL LOGGING / FETCH
// ============================================================================

const dblog = (G.log && G.log) || console.log;
const dberror = (G.error && G.error) || console.error;

const fetchFn =
  (G.fetchfn && typeof G.fetchfn === "function" && G.fetchfn) ||
  (G.fetch && typeof G.fetch === "function" && G.fetch) ||
  null;

// ============================================================================
// ENVIRONMENT SNAPSHOT — IMMORTAL, PORTAL-AWARE, ADV++
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

  const ua =
    surfaceEnv?.userAgent ?? window.navigator?.userAgent ?? null;
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
// IDENTITY SNAPSHOT — IMMORTAL
// ============================================================================

let CURRENT_IDENTITY_SNAPSHOT = null;

export function setBridgeIdentitySnapshot(identitySnapshot) {
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
// ONLINE FLAG
// ============================================================================

function isOnline() {
  if (typeof window !== "undefined" && typeof window.PULSE_ONLINE === "boolean")
    return window.PULSE_ONLINE;
  if (typeof globalThis !== "undefined" && typeof window.PULSE_ONLINE === "boolean")
    return window.PULSE_ONLINE;
  if (typeof global !== "undefined" && typeof window.PULSE_ONLINE === "boolean")
    return window.PULSE_ONLINE;
  if (typeof g.PULSE_ONLINE === "boolean") return g.PULSE_ONLINE;
  return BRIDGE_ENV.online === true;
}

// ============================================================================
// IMMORTAL LOCALSTORAGE MIRROR — PulseBridgeStore
// ============================================================================

const BRIDGE_LS_KEY = "PulseBridge.v24.buffer";
const BRIDGE_LS_MAX = 6000;

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
// ARTERY-LIKE METRICS
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
// FINALITY / APPROVAL LAYER — v27++ IMMORTAL
// ============================================================================

const FINALITY_CHANNEL_ID = "portal.trust.bridge";

function emitFinalityEvent(kind, payload) {
  try {
    if (!PulseSignalPort || typeof PulseSignalPort.emit !== "function") return;
    PulseSignalPort.emit("bridge.finality", {
      channel: FINALITY_CHANNEL_ID,
      kind,
      env: BRIDGE_ENV,
      identity: getBridgeIdentitySnapshot(),
      payload
    });
  } catch {
    // finality is advisory; never break bridge
  }
}

function approveBridgeMessage(kind, msg) {
  // Default: allow
  let allowed = true;

  try {
    if (!PulseSignalPort) return true;

    const fn =
      PulseSignalPort.requestApproval ||
      PulseSignalPort.approve ||
      null;

    if (typeof fn !== "function") {
      emitFinalityEvent("bridge_observe", { kind, msg });
      return true;
    }

    const decision = fn({
      channel: FINALITY_CHANNEL_ID,
      kind,
      path: msg.path || msg.payload?.path || null,
      env: BRIDGE_ENV,
      identity: getBridgeIdentitySnapshot(),
      msg
    });

    // Support sync or promise; if promise, we don't block, we just observe
    if (decision && typeof decision.then === "function") {
      decision.then((res) => {
        emitFinalityEvent("bridge_async_decision", {
          kind,
          msg,
          decision: res
        });
      });
      // For determinism, treat async as "allow" but still observed
      emitFinalityEvent("bridge_async_observe", { kind, msg });
      return true;
    }

    const action = typeof decision === "string" ? decision : decision?.action;

    if (action === "deny") {
      allowed = false;
      emitFinalityEvent("bridge_denied", { kind, msg, decision });
    } else if (action === "logOnly") {
      allowed = true;
      emitFinalityEvent("bridge_log_only", { kind, msg, decision });
    } else {
      allowed = true;
      emitFinalityEvent("bridge_allowed", { kind, msg, decision });
    }
  } catch {
    // On any failure, we fall back to allow but still emit an error event
    emitFinalityEvent("bridge_finality_error", { kind, msg });
    allowed = true;
  }

  return allowed;
}

// ============================================================================
// APPEND BRIDGE RECORD — IMMORTAL + IDENTITY + ENV + FINALITY TAP
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

  // Human-facing: logger + comment
  try {
    log({
      subsystem: "bridge",
      system: "PortalTrustLayer",
      organ: "PulseProofBridge",
      layer: "PulseProofBridge-v27-FINALITY",
      message: `[Bridge] ${kind}`,
      extra: entry,
      level: "log",
      band: payload?.band || entry.identity?.presenceBand || "dual",
      presenceField: payload?.presenceField || entry.identity?.presenceBand || null,
      advantageField: payload?.advantageField || "bridge-advantage",
      speedField: payload?.speedField || "fast-path",
      experienceField: payload?.experienceField || "portal-trust-layer"
    });

    comment("bridge", `[Bridge] ${kind}`, entry);
  } catch {
    console.log("[Bridge]", kind, entry);
  }

  // Tap into Finality stream (non-blocking)
  emitFinalityEvent("bridge_record", { kind, entry });
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
// FIREBASE FLUSH
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
// BROADCAST CHANNEL + DEV TRACING
// ============================================================================

const DEV = true;

const hasBroadcastChannel =
  typeof window !== "undefined" && typeof BroadcastChannel !== "undefined";

const channel = hasBroadcastChannel ? new BroadcastChannel("PulseCNS") : null;

const FIRE_AND_FORGET_PATHS = new Set([
  "proxy.dnaVisibility",
  "telemetry.signal",
  "portal.prewarmHint",
  "monitor.bridgeFailure",
  "monitor.bridgeFailureEmail"
]);

function trace(label, data) {
  if (!DEV) return;
  console.log(
    `%c[PORTAL TRUST BRIDGE v27] → ${label}`,
    "color:#7FDBFF; font-weight:bold;",
    data
  );
}

function traceInbound(label, data) {
  if (!DEV) return;
  console.log(
    `%c[PORTAL TRUST BRIDGE v27] ← ${label}`,
    "color:#39CCCC; font-weight:bold;",
    data
  );
}

// ============================================================================
// CALLBACK REGISTRIES
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
// MARK 404
// ============================================================================

function mark404(result) {
  if (!result) return result;
  if (result === 404) return "404*";
  if (result?.status === 404) return { ...result, status: "404*" };
  if (typeof result === "string" && result.trim() === "404") return "404*";
  return result;
}

// ============================================================================
// ENVELOPE + SEND (CNS SIGNAL SIDE) + FINALITY APPROVAL
// ============================================================================

function envelope(type, extra = {}) {
  return {
    type,
    ts: Date.now(),
    env: BRIDGE_ENV,
    identity: getBridgeIdentitySnapshot(),
    ...extra
  };
}

function send(msg) {
  // Finality / Approval gate
  const kind = msg.type || "unknown";
  if (!approveBridgeMessage(kind, msg)) {
    appendBridgeRecord("bridge_outbound_denied", { msg });
    return;
  }

  if (!channel) {
    appendBridgeRecord("bridge_noop", msg);
    return;
  }

  channel.postMessage(msg);
  appendBridgeRecord("bridge_outbound", msg);
}

// ============================================================================
// BRIDGE HEALTH
// ============================================================================

const BRIDGE_HEALTH = {
  lastOkTs: Date.now(),
  lastFailureTs: null,
  consecutiveFailures: 0,
  lastFailurePath: null
};

const BRIDGE_FAILURE_THRESHOLD = 3;
const BRIDGE_FAILURE_EMAIL_THRESHOLD = 5;

function recordBridgeSuccess(path) {
  BRIDGE_HEALTH.lastOkTs = Date.now();
  BRIDGE_HEALTH.consecutiveFailures = 0;
  BRIDGE_HEALTH.lastFailurePath = null;
  appendBridgeRecord("bridge_success", { path });
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

  try {
    send(
      envelope("CNS_SIGNAL", {
        path: "monitor.bridgeFailure",
        payload
      })
    );
  } catch {}

  if (BRIDGE_HEALTH.consecutiveFailures >= BRIDGE_FAILURE_EMAIL_THRESHOLD) {
    try {
      send(
        envelope("CNS_SIGNAL", {
          path: "monitor.bridgeFailureEmail",
          payload: {
            ...payload,
            severity: "critical",
            channel: "email"
          }
        })
      );
      appendBridgeRecord("bridge_failure_email_requested", payload);
    } catch {}
  }
}

// ============================================================================
// INBOUND HANDLER
// ============================================================================

function handleInbound(event) {
  const msg = event?.data;
  if (!msg || typeof msg !== "object" || !msg.type) return;

  appendBridgeRecord("bridge_inbound", msg);

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

  if (msg.type === "IMAGE_RESPONSE" && imagePending[msg.requestId]) {
    const { resolve } = imagePending[msg.requestId];
    delete imagePending[msg.requestId];
    traceInbound("IMAGE_RESPONSE", msg.data);
    resolve(msg.data || null);
    return;
  }
}

if (channel && !channel.__PULSE_BRIDGE_BOUND_V27__) {
  channel.__PULSE_BRIDGE_BOUND_V27__ = true;
  channel.addEventListener("message", handleInbound);
}

const pending = Object.create(null);
const imagePending = Object.create(null);

// ============================================================================
// SAFE ROUTE — DIRECT ENDPOINT MODE (NO BRIDGE, NO TIMEOUTS)
// ============================================================================

export function safeRoute(path, payload = {}, timeoutMs = 10000) {
  trace("SAFE_ROUTE", { path, payload });

  // 1 — Direct frontend hooks
  if (
    typeof window !== "undefined" &&
    window.PulseHooks &&
    typeof window.PulseHooks[path] === "function"
  ) {
    appendBridgeRecord("safeRoute_direct_call", { path, payload });

    try {
      return Promise.resolve(window.PulseHooks[path](payload));
    } catch (err) {
      appendBridgeRecord("safeRoute_direct_error", { path, payload, err });
      return Promise.resolve(null);
    }
  }

  // 2 — DIRECT ENDPOINT ROUTE
  return new Promise(async (resolve) => {
    try {
      if (
        typeof window !== "undefined" &&
        window.PulseRemoteEndpoint &&
        typeof window.PulseRemoteEndpoint.handle === "function"
      ) {
        const result = await window.PulseRemoteEndpoint.handle({
          path,
          payload
        });

        appendBridgeRecord("safeRoute_endpoint_call", {
          path,
          payload,
          result
        });
        resolve(result);
        return;
      }

      appendBridgeRecord("safeRoute_no_endpoint", { path, payload });
      resolve(null);
    } catch (err) {
      appendBridgeRecord("safeRoute_endpoint_error", { path, payload, err });
      resolve(null);
    }
  });
}

// ============================================================================
// SIGNAL (CNS side, not PulseProofSignal)
// ============================================================================

export function signal(path, payload = {}) {
  trace("SIGNAL", { path, payload });
  send(
    envelope("CNS_SIGNAL", {
      path,
      payload
    })
  );
}

// ============================================================================
// PREWARM
// ============================================================================

export function prewarmBridge(hints = {}) {
  try {
    if (
      typeof window !== "undefined" &&
      window.prewarmAssets &&
      Array.isArray(hints.assets)
    ) {
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
// CORE MEMORY / SPEECH BRIDGES
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
// FIRE-AND-FORGET ROUTE
// ============================================================================

export function fireAndForgetRoute(path, payload = {}) {
  trace("FIRE_AND_FORGET", { path, payload });
  send(
    envelope("CNS_REQUEST", {
      requestId: "ff-" + Date.now().toString(36),
      path,
      payload
    })
  );
}

// ============================================================================
// STARTERS
// ============================================================================

export function startDualBandAI(options = {}) {
  trace("DUALBAND_AI_START", options);
  send(envelope("DUALBAND_AI_START", { options }));

  trace("BINARY_OS_BOOT", options);
  send(envelope("BINARY_OS_BOOT", { options }));
}

export function fetchImageThroughBridge(url) {
  trace("IMAGE_FETCH", { url });

  const requestId =
    "img-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2);

  return new Promise((resolve) => {
    imagePending[requestId] = { resolve };
    send(
      envelope("IMAGE_REQUEST", {
        requestId,
        url
      })
    );
  });
}

export function pulseNetFastLane(data = {}) {
  trace("PULSENET_FASTLANE", data);
  send(envelope("PULSENET_FASTLANE", data));
}

export function pulseNetIngress(data = {}) {
  trace("PULSENET_INGRESS", data);
  send(envelope("PULSENET_INGRESS", data));
}

export function startUnderstanding(options = {}) {
  trace("UNDERSTANDING_START", options);
  send(envelope("UNDERSTANDING_START", { options }));
}

export function startPulseNet(options = {}) {
  trace("PULSENET_START", options);
  send(envelope("PULSENET_START", { options }));
}

export function requestCompiler(reason = "touch", meta = {}) {
  trace("COMPILER_REQUEST", { reason, meta });
  send(envelope("COMPILER_REQUEST", { reason, meta }));
}

// ============================================================================
// INBOUND PORTAL / AI / BOOT EVENTS
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
        console.error(
          "%c[BRIDGE::ERROR] %c%s %c→ %s",
          "color:#FF3B3B; font-weight:bold; font-family:monospace;",
          "color:#FFE066; font-family:monospace;",
          label,
          "color:#FF3B3B; font-family:monospace;",
          String(err)
        );
        appendBridgeRecord(`${label}_error`, { error: String(err) });
      }
    };

    const logInbound = (type, payload) => {
      console.log(
        "%c[BRIDGE::INBOUND] %c%s %c→",
        "color:#7C4DFF; font-weight:bold; font-family:monospace;",
        "color:#EC407A; font-weight:bold; font-family:monospace;",
        type,
        "color:#E8F8FF; font-family:monospace;"
      );

      if (payload !== undefined) {
        console.log(
          "%c↳ payload:",
          "color:#EC407A; font-family:monospace; font-weight:bold;"
        );
        console.log(
          "%c" + JSON.stringify(payload, null, 2),
          "color:#E8F8FF; font-family:monospace;"
        );
      }
    };

    switch (msg.type) {
      case "DUALBAND_AI_EVENT": {
        logInbound("DUALBAND_AI_EVENT", msg.data);
        appendBridgeRecord("dualband_ai_event", msg.data);
        safeCall("aiEventHandler", aiEventHandler, msg.data);
        break;
      }

      case "AI_EVENT": {
        logInbound("AI_EVENT", msg);
        appendBridgeRecord("ai_event", msg);
        safeCall("aiEventHandler", aiEventHandler, msg);
        break;
      }

      case "PORTAL_EVENT": {
        logInbound("PORTAL_EVENT", msg);
        appendBridgeRecord("portal_event", msg);
        safeCall("portalEventHandler", portalEventHandler, msg);
        break;
      }

      case "DUALBAND_BOOT": {
        logInbound("DUALBAND_BOOT", msg.bootOptions);
        appendBridgeRecord("dualband_boot", msg.bootOptions);
        safeCall("dualBandBootHandler", dualBandBootHandler, msg.bootOptions);
        break;
      }

      case "CNS_BOOT": {
        logInbound("CNS_BOOT", msg);
        appendBridgeRecord("cns_boot", msg);
        safeCall("dualBandBootHandler", dualBandBootHandler, msg);
        break;
      }

      case "IMAGE_RESPONSE": {
        logInbound("IMAGE_RESPONSE", msg.data);
        appendBridgeRecord("image_response", msg.data);
        break;
      }

      case "COMPILER_EVENT": {
        logInbound("COMPILER_EVENT", msg);
        appendBridgeRecord("compiler_event", msg);
        break;
      }

      default: {
        console.log(
          "%c[BRIDGE::UNKNOWN] %c%s",
          "color:#7C4DFF; font-weight:bold; font-family:monospace;",
          "color:#FFE066; font-family:monospace;",
          msg.type
        );
        break;
      }
    }
  });
}

import { createAdminDiagnosticsOrgan } from "../_COMPONENTS_EVOLUTION/PulseAIAdminPanel-v20.js";
import { createPulseWorldAdminPanel } from "../_COMPONENTS_EVOLUTION/PulseWorldAdminPanel-v20.js";

// ============================================================================
// EXPORT SURFACE
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
export const PulseProofBridgeScanner = PulsePageScanner;
export const PulseProofBridgeRouteMemory = PulseUIRouteMemory;
export const PulseProofBridgeWorldAdminPanel = createPulseWorldAdminPanel;
export const PulseProofBridgeAdminDiagnostics = createAdminDiagnosticsOrgan;

// ============================================================================
// IMMORTAL++ GLOBAL MIRROR
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
    console.error("[PulseProofBridge v27-FINALITY] Global exposure failed:", err);
  }
})();

// ⭐ THIS IS THE WHOLE POINT OF THIS PAGE
if (typeof window !== "undefined") {
  window.PulseRemoteEndpoint = {
    async handle(route) {
      return PulseWorldEndpoint.handle(route);
    }
  };
}
