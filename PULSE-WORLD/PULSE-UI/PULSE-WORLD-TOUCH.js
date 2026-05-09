/**
 * ============================================================
 *  FILE: PULSE-TOUCH-v24.js
 *  ORGAN: Pulse‑Touch (Sensory Skin / Pre‑Pulse Ignition Organ)
 *  VERSION: v24-IMMORTAL++-Portal-Skin-Continuous
 *  AUTHOR: Pulse‑OS (Aldwyn’s Organism Architecture)
 * ============================================================
 *
 *  PURPOSE:
 *  --------
 *  Pulse‑Touch is the FIRST CONTACT organ of the Pulse‑OS organism.
 *  It is the SKIN — the sensory layer that detects presence BEFORE
 *  the organism wakes.
 *
 *  v20 → v24 EVOLUTION:
 *  --------------------
 *  - Continuous, low‑cost pulse stream (v17–v20)
 *  - Fast‑lane “intent only” WSEND pulses (v17)
 *  - Temporal timeline of first contact + ongoing presence (v17)
 *  - Prewarm hints emitted over time (v17)
 *  - Adaptive cadence (v20)
 *
 *  v24 IMMORTAL++:
 *  ---------------
 *  - Full organ integration pipeline:
 *      • Detector (IMMORTAL++)
 *      • Warmup (IMMORTAL++)
 *      • Security (IMMORTAL++)
 *      • Gate (IMMORTAL++)
 *      • Predictor (IMMORTAL++)
 *      • Analytics (IMMORTAL++)
 *      • Presence Oracle (IMMORTAL++)
 *      • Advantage Cortex (IMMORTAL++)
 *      • ThreatShape (IMMORTAL++)
 *
 *  - Deterministic TouchState merging
 *  - Unified downstream routing (Gate/Security/Warmup/Advantage)
 *  - Zero‑drift, zero‑PII, zero‑tracking guarantees
 *  - Multi‑tab, multi‑window, multi‑pulse coordination
 *  - IMMORTAL++ meta, overlays, and contract alignment
 *
 * ============================================================
 */

// export const AI_EXPERIENCE_META = {
//   identity: "PulseTouch",
//   version: "v24-IMMORTAL++-Portal-Skin-Continuous",
//   layer: "skin",
//   role: "first_contact_sensor",
//   lineage:
//     "PulseOS-v13 → v14-Immortal → v4.0.0-Immortal → v16-Immortal-Portal → v17-Continuous → v20-Immortal-Evo++++ → v24-IMMORTAL++",

//   evo: {
//     prePulse: true,
//     presenceAware: true,
//     identityHintAware: true,
//     regionHintAware: true,
//     trustHintAware: true,
//     dualBand: true,
//     deterministic: true,
//     driftProof: true,

//     // IMMORTAL++ guarantees
//     zeroPII: true,
//     zeroTracking: true,
//     zeroInference: true,
//     safeCookie: true,
//     schemaStable: true,
//     contractStable: true,

//     // PulseNet integration
//     pulseNetAware: true,
//     pulseNetIgnition: true,
//     pulseNetIngressAware: true,
//     heartbeatAware: true,
//     overmindAware: true,

//     // Portal / Timeline
//     timeAxisAware: true,
//     firstContactTimeline: true,
//     portalTrustEdge: true,
//     bridgeAligned: true,
//     loggerAligned: true,
//     monitorAligned: true,

//     // Continuous pulse
//     continuousPulse: true,
//     fastLaneAware: true,
//     temporalHintAware: true,

//     // v20–v24 metabolic evolution
//     adaptiveCadence: true,
//     pressureAware: true,
//     bandAware: true,
//     predictionHooks: true,
//     evidenceHooks: true,
//     diagnosticsHooks: true,
//     multiTabAware: true,
//     governorAware: true,
//     overmindHintAware: true,

//     // v24 organ integration
//     detectorAware: true,
//     warmupAware: true,
//     securityAware: true,
//     gateAware: true,
//     predictorAware: true,
//     analyticsAware: true,
//     presenceOracleAware: true,
//     advantageCortexAware: true,
//     threatShapeAware: true
//   },

//   contract: {
//     always: [
//       "PulseTouchDetector",
//       "PulseTouchWarmup",
//       "PulseTouchSecurity",
//       "PulseTouchGate",
//       "PulseTouchPredictor",
//       "PulseTouchAnalytics",
//       "PulsePresenceOracle",
//       "pulseTouchAdvantageCortex",
//       "PulseTouchThreatShape",
//       "PulseNet",
//       "PulseNetIngress",
//       "PulseProofBridge",
//       "PulseProofLogger"
//     ],
//     never: [
//       "identityInference",
//       "tracking",
//       "PII",
//       "legacyCookies",
//       "legacyPulseNet",
//       "legacyNetworkLayer"
//     ]
//   }
// };

// ============================================================
// IMPORTS — PULSE-NET + TOUCH ORGANS + BRIDGE + FUTURE HOOKS
// ============================================================

import {
  route as bridgeRoute,
  PulseProofLogger as PulseLogger,
  log,
  warn,
  error,
  startUnderstanding as PulseUnderstanding,
  PulseBinaryOrganismBoot,
  startPulseNet,
  pulseNetIngressFromUser,
  pulseNetFastLanePulse
} from "./_BACKEND/PULSE-WORLD-BRIDGE.js";

// IMMORTAL++ organ factories
import { PulseTouchDetector } from "./_OUTERSENSES/PULSE-TOUCH-DETECTOR.js";
import { PulseTouchWarmup } from "./_OUTERSENSES/PULSE-TOUCH-WARMUP.js";
import { PulseTouchSecurity } from "./_OUTERSENSES/PULSE-TOUCH-SECURITY.js";
import { PulseTouchGate } from "./_OUTERSENSES/PULSE-TOUCH-GATE.js";
import { pulseTouchAdvantageCortex } from "./_OUTERSENSES/PULSE-TOUCH-ADVANTAGE.js";
import { PulseTouchThreatShape } from "./_OUTERSENSES/PULSE-TOUCH-THREATSHAPE.js";

// Optional future‑oriented helpers (IMMORTAL++)
import { PulseTouchPredictor } from "./_OUTERSENSES/PULSE-TOUCH-PREDICTOR.js";
import { PulseTouchAnalytics } from "./_OUTERSENSES/PULSE-TOUCH-ANALYTICS.js";
import { PulsePresenceOracle } from "./_OUTERSENSES/PULSE-TOUCH-PRESENCE-ORACLE.js";

// ============================================================
// CONSTANTS — COOKIE + VERSION + TIMELINE + PULSE CONFIG
// ============================================================

const PULSE_TOUCH_COOKIE_NAME = "pulse_touch";
const PULSE_TOUCH_MAX_AGE = 86400; // 1 day
const PULSE_TOUCH_VERSION = "20.1";

const PULSE_TOUCH_TIMELINE_LS_KEY = "PulseTouch.v20.timeline";
const PULSE_TOUCH_TIMELINE_MAX = 512;

// continuous pulse base config (safe, low impact)
const PULSE_TOUCH_PULSE_INTERVAL_MS_BASE = 220; // ~4.5 pulses/sec
const PULSE_TOUCH_PULSE_INTERVAL_MS_MIN = 120;
const PULSE_TOUCH_PULSE_INTERVAL_MS_MAX = 600;

const PULSE_TOUCH_PULSE_BURST_COUNT = 10; // initial burst
const PULSE_TOUCH_PULSE_BURST_SPACING_MS = 55;

// multi‑tab coordination (soft, non‑authoritative)
const PULSE_TOUCH_BROADCAST_CHANNEL = "PulseTouch.v20.channel";

// in‑memory preflight registry (per page load)
const pulseTouchPreflights = [];

// in‑memory hooks (future‑safe, non‑breaking)
const pulseTouchHooks = {
  onPulse: [],
  onSecurityChange: [],
  onGateDecision: [],
  onTimelineEvent: [],
  onCadenceChange: [],
  onPrediction: []
};

// ============================================================
// GLOBAL STATE SNAPSHOT (BROWSER‑SAFE)
// ============================================================

const hasWindow = typeof window !== "undefined";
const hasDocument = typeof document !== "undefined";

if (hasWindow) {
  window.__PULSE_TOUCH__ = window.__PULSE_TOUCH__ || null;
  window.__PULSE_TOUCH_ORIGIN_TS__ =
    window.__PULSE_TOUCH_ORIGIN_TS__ || Date.now();
  window.__PULSE_TOUCH_PULSE_STATE__ =
    window.__PULSE_TOUCH_PULSE_STATE__ || {
      started: false,
      intervalId: null,
      intervalMs: PULSE_TOUCH_PULSE_INTERVAL_MS_BASE,
      lastMode: "burst",
      lastPulseTs: 0,
      lastGateDecision: null
    };
  window.__PULSE_TOUCH_LAST_GATE__ = window.__PULSE_TOUCH_LAST_GATE__ || null;
  window.__PULSE_TOUCH_LAST_SECURITY__ =
    window.__PULSE_TOUCH_LAST_SECURITY__ || null;
}

// optional broadcast channel for multi‑tab awareness
let pulseTouchChannel = null;
try {
  if (hasWindow && "BroadcastChannel" in window) {
    pulseTouchChannel = new BroadcastChannel(PULSE_TOUCH_BROADCAST_CHANNEL);
  }
} catch {
  pulseTouchChannel = null;
}

// ============================================================
// TIMELINE HELPERS — IMMORTAL FIRST-CONTACT AXIS
// ============================================================
function hasLocalStorage() {
  if (!hasWindow) return false;
  try {
    if (!window.localStorage) return false;
    const t = "__pulse_touch_test__";
    window.localStorage.setItem(t, "1");
    window.localStorage.removeItem(t);
    return true;
  } catch {
    return false;
  }
}

function loadTouchTimeline() {
  if (!hasLocalStorage()) return [];
  try {
    const raw = window.localStorage.getItem(PULSE_TOUCH_TIMELINE_LS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveTouchTimeline(buf) {
  if (!hasLocalStorage()) return;
  try {
    const trimmed =
      buf.length > PULSE_TOUCH_TIMELINE_MAX
        ? buf.slice(buf.length - PULSE_TOUCH_TIMELINE_MAX)
        : buf;
    window.localStorage.setItem(
      PULSE_TOUCH_TIMELINE_LS_KEY,
      JSON.stringify(trimmed)
    );
  } catch {
    // never throw
  }
}

function fireTimelineHooks(kind, payload) {
  const hooks = pulseTouchHooks.onTimelineEvent || [];
  if (!hooks.length) return;
  for (const fn of hooks) {
    try {
      fn({ kind, payload });
    } catch {
      // hooks must never crash the organism
    }
  }
}

function appendTouchTimeline(kind, payload = {}) {
  const ts = Date.now();
  const origin =
    (hasWindow && window.__PULSE_TOUCH_ORIGIN_TS__) || ts;

  const entry = {
    ts,
    dt: ts - origin,
    kind,
    payload: {
      ...payload,
      version: PULSE_TOUCH_VERSION
    }
  };

  const buf = loadTouchTimeline();
  buf.push(entry);
  saveTouchTimeline(buf);

  fireTimelineHooks(kind, entry.payload);

  // Optional: mirror into bridge (fire-and-forget) for CNS/log surfaces
  try {
    bridgeRoute?.("touch.timeline", {
      ts,
      dt: entry.dt,
      kind,
      payload: entry.payload
    }).catch?.(() => {});
  } catch {}

  // Optional: mirror into logger collection if available
  try {
    if (PulseLogger && typeof PulseLogger.route === "function") {
      PulseLogger.route("touchTimeline.log", {
        ts,
        dt: entry.dt,
        kind,
        payload: entry.payload
      }).catch?.(() => {});
    }
  } catch {}
}

// ============================================================
// ADAPTIVE CADENCE ENGINE — PRESSURE/TRUST/BAND/PULSE AWARE
// ============================================================

function computeAdaptiveIntervalMs({ security, skin }) {
  const base = PULSE_TOUCH_PULSE_INTERVAL_MS_BASE;

  let factor = 1.0;

  const risk = security?.risk || "unknown";
  const trust = security?.trust || "unknown";
  const presence = skin?.presence || "active";
  const band = skin?.band || "symbolic";
  const mode = skin?.mode || "fast";
  const pulseStream = skin?.pulseStream || "continuous";
  const fastLane = skin?.fastLane || "enabled";

  if (presence === "idle" || presence === "background") {
    factor *= 1.8;
  }

  if (risk === "high" || risk === "critical") {
    factor *= 1.6;
  } else if (risk === "low") {
    factor *= 0.9;
  }

  if (trust === "trusted") {
    factor *= 0.9;
  } else if (trust === "untrusted") {
    factor *= 1.3;
  }

  if (band === "binary") {
    factor *= 0.85;
  }

  if (mode === "slow") {
    factor *= 1.4;
  } else if (mode === "fast") {
    factor *= 0.9;
  }

  // v24: pulseStream / fastLane hints
  if (pulseStream === "single") {
    factor *= 1.2;
  } else if (pulseStream === "burst") {
    factor *= 0.95;
  }

  if (fastLane === "disabled") {
    factor *= 1.1;
  }

  let interval = Math.round(base * factor);
  if (interval < PULSE_TOUCH_PULSE_INTERVAL_MS_MIN) {
    interval = PULSE_TOUCH_PULSE_INTERVAL_MS_MIN;
  }
  if (interval > PULSE_TOUCH_PULSE_INTERVAL_MS_MAX) {
    interval = PULSE_TOUCH_PULSE_INTERVAL_MS_MAX;
  }

  return interval;
}

function applyAdaptiveCadence(state, { security, skin }) {
  if (!state) return;
  const nextInterval = computeAdaptiveIntervalMs({ security, skin });
  if (nextInterval === state.intervalMs) return;

  const prev = state.intervalMs;
  state.intervalMs = nextInterval;

  appendTouchTimeline("pulse_cadence_changed", {
    fromMs: prev,
    toMs: nextInterval
  });

  const hooks = pulseTouchHooks.onCadenceChange || [];
  for (const fn of hooks) {
    try {
      fn({ fromMs: prev, toMs: nextInterval, security, skin });
    } catch {}
  }

  if (state.intervalId) {
    try {
      clearInterval(state.intervalId);
    } catch {}
    state.intervalId = setInterval(() => {
      sendFastLanePulse("continuous", skin, security, state.lastGateDecision);
    }, state.intervalMs);
  }
}

// ============================================================
// CONTINUOUS PULSE ENGINE — FAST-LANE WSEND INTENT STREAM
// ============================================================

let pulseTouchAnalyticsInstance = null;
function getPulseTouchAnalytics() {
  // IMMORTAL++: support both factory and static style
  if (!PulseTouchAnalytics) return null;
  if (pulseTouchAnalyticsInstance) return pulseTouchAnalyticsInstance;

  try {
    if (typeof PulseTouchAnalytics === "function") {
      const maybe = PulseTouchAnalytics();
      if (maybe && typeof maybe.recordPulse === "function") {
        pulseTouchAnalyticsInstance = maybe;
        return pulseTouchAnalyticsInstance;
      }
    }
  } catch {
    // fall through to static usage
  }

  pulseTouchAnalyticsInstance = PulseTouchAnalytics;
  return pulseTouchAnalyticsInstance;
}

function startContinuousPulseStream(skin, security, gateDecision) {
  if (!hasWindow) return;
  const state = window.__PULSE_TOUCH_PULSE_STATE__;
  if (!state || state.started) return;

  state.started = true;
  state.lastGateDecision = gateDecision || null;

  state.intervalMs = computeAdaptiveIntervalMs({ security, skin });
  state.intervalId = null;

  appendTouchTimeline("pulse_stream_start", {
    intervalMs: state.intervalMs
  });

  // Initial burst: fast, dense hints to Pulse‑Net
  try {
    for (let i = 0; i < PULSE_TOUCH_PULSE_BURST_COUNT; i++) {
      setTimeout(() => {
        sendFastLanePulse("burst", skin, security, gateDecision);
      }, i * PULSE_TOUCH_PULSE_BURST_SPACING_MS);
    }
  } catch {}

  // Continuous stream: low‑cost, steady hints
  try {
    state.intervalId = setInterval(() => {
      sendFastLanePulse("continuous", skin, security, gateDecision);
    }, state.intervalMs);
  } catch {
    appendTouchTimeline("pulse_stream_failed", {});
  }
}

function stopContinuousPulseStream() {
  if (!hasWindow) return;
  const state = window.__PULSE_TOUCH_PULSE_STATE__;
  if (!state || !state.started) return;

  try {
    if (state.intervalId) clearInterval(state.intervalId);
  } catch {}
  state.intervalId = null;
  state.started = false;

  appendTouchTimeline("pulse_stream_stopped", {});
}

function firePulseHooks(mode, payload) {
  const hooks = pulseTouchHooks.onPulse || [];
  if (!hooks.length) return;
  for (const fn of hooks) {
    try {
      fn({ mode, payload });
    } catch {}
  }
}

function sendFastLanePulse(mode, skin, security, gateDecision) {
  const ts = Date.now();
  const band = skin?.band || "symbolic";

  const payload = {
    source: "pulse-touch",
    mode,
    ts,
    band,
    skin: {
      region: skin.region,
      mode: skin.mode,
      presence: skin.presence,
      page: skin.page,
      chunkProfile: skin.chunkProfile,
      band,
      pulseStream: skin.pulseStream || "continuous",
      fastLane: skin.fastLane || "enabled"
    },
    security: {
      risk: security?.risk ?? "unknown",
      trust: security?.trust ?? "unknown",
      action: security?.action ?? "allow"
    },
    gate: {
      mode: gateDecision?.mode ?? "fast",
      refresh: !!gateDecision?.refresh,
      fallback: !!gateDecision?.fallback
    }
  };

  appendTouchTimeline("pulse_fastlane_emit", {
    mode,
    page: skin.page,
    chunkProfile: skin.chunkProfile,
    band
  });

  firePulseHooks(mode, payload);

  // 1) Direct Pulse‑Net fast‑lane (WSEND‑style intent)
  try {
    pulseNetFastLanePulse(payload);
  } catch {}

  // 2) Optional ingress (normal path) for analytics / overmind
  try {
    pulseNetIngressFromUser({
      source: "pulse-touch",
      event: "pulse",
      ts,
      skin,
      security,
      gate: gateDecision,
      mode,
      band
    });
  } catch {}

  // 3) Optional analytics / evidence hooks (IMMORTAL++ organ‑aware)
  try {
    const analytics = getPulseTouchAnalytics();
    analytics?.recordPulse?.({
      ts,
      mode,
      band,
      skin,
      security,
      gate: gateDecision
    });
  } catch {}
}

// ============================================================
// HOOK REGISTRATION HELPERS — FUTURE‑SAFE
// ============================================================

function registerHook(kind, fn) {
  if (!fn || typeof fn !== "function") return;
  const bucket = pulseTouchHooks[kind];
  if (!bucket) return;
  bucket.push(fn);
  appendTouchTimeline("hook_registered", {
    kind,
    count: bucket.length
  });
}


export function createPulseTouch(options = {}) {
  const originTs =
    (hasWindow && window.__PULSE_TOUCH_ORIGIN_TS__) || Date.now();

  appendTouchTimeline("touch_init_called", {
    originTs,
    optionsHint: {
      region: options.region || null,
      mode: options.mode || null,
      page: options.page || null,
      chunkProfile: options.chunkProfile || null,
      band: options.band || null
    }
  });

  // ------------------------------------------------------------
  // IMMORTAL++ ORGAN INSTANCES (LAZY, SAFE)
  // ------------------------------------------------------------
  let predictor = null;
  let analytics = null;
  let presenceOracle = null;
  let advantageCortex = null;

  try {
    predictor =
      typeof PulseTouchPredictor === "function"
        ? PulseTouchPredictor()
        : PulseTouchPredictor || null;
  } catch {
    predictor = null;
  }

  try {
    analytics =
      typeof PulseTouchAnalytics === "function"
        ? PulseTouchAnalytics()
        : PulseTouchAnalytics || null;
  } catch {
    analytics = null;
  }

  try {
    presenceOracle =
      typeof PulsePresenceOracle === "function"
        ? PulsePresenceOracle()
        : PulsePresenceOracle || null;
  } catch {
    presenceOracle = null;
  }

  try {
    advantageCortex =
      typeof pulseTouchAdvantageCortex === "function"
        ? pulseTouchAdvantageCortex()
        : null;
  } catch {
    advantageCortex = null;
  }

  // ------------------------------------------------------------
  // 1. DEFAULT METADATA (Organism‑Safe, Non‑PII)
  // ------------------------------------------------------------
  const defaults = {
    region: options.region || "unknown",
    trusted: options.trusted || "0",
    mode: options.mode || "fast",
    presence: options.presence || "active",
    identity: options.identity || "anon",
    page: options.page || "index",
    chunkProfile: options.chunkProfile || "default",
    band: options.band || "symbolic",
    version: PULSE_TOUCH_VERSION
  };

  // 1) Seed cookie immediately
  writePulseTouchCookie(defaults);
  appendTouchTimeline("cookie_seeded", { state: defaults });

  // 2) Read + normalize via Detector (IMMORTAL contract)
  const detected = PulseTouchDetector.normalize(
    readPulseTouchInternal(defaults)
  );
  appendTouchTimeline("skin_detected", { skin: detected });

  // 3) Expose snapshot globally for PulseNet / Overmind / UI
  if (hasWindow) {
    window.__PULSE_TOUCH__ = detected;
  }

  // 4) Run pre‑registered preflight checks as early as possible
  appendTouchTimeline("preflights_start", {
    count: pulseTouchPreflights.length
  });
  runPreflights(detected);
  appendTouchTimeline("preflights_done", {});

  // 5) Warmup: chunks/pages/mode/presence hints
  let warmupResult = null;
  try {
    appendTouchTimeline("warmup_start", {
      page: detected.page,
      mode: detected.mode,
      chunkProfile: detected.chunkProfile,
      band: detected.band
    });
    warmupResult = PulseTouchWarmup.prewarm(detected);
    appendTouchTimeline("warmup_done", {});
  } catch {
    appendTouchTimeline("warmup_failed", {});
  }

  // 6) Security: compute trust/risk profile
  let security = null;
  try {
    security = PulseTouchSecurity.evaluate(detected);
    appendTouchTimeline("security_evaluated", { security });
    fireSecurityHooks(security, detected);
  } catch {
    security = { risk: "unknown", trust: "unknown", action: "allow" };
    appendTouchTimeline("security_failed", {});
  }

  // 7) Gate: decide boot path (fast/safe/slow/refresh/fallback)
  let gateDecision = null;
  try {
    gateDecision = PulseTouchGate.decide({
      skin: detected,
      security
    });
    appendTouchTimeline("gate_decided", { gateDecision });
    fireGateHooks(gateDecision, detected, security);
  } catch {
    gateDecision = { mode: "fast", refresh: false, fallback: false };
    appendTouchTimeline("gate_failed", {});
  }

  // 8) IMMORTAL++: Prediction / Presence / Advantage (read‑only, additive)
  let prediction = null;
  let presenceInsight = null;
  let advantageProfile = null;

  try {
    if (predictor && typeof predictor.predict === "function") {
      prediction = predictor.predict(detected, {
        security,
        warmup: warmupResult
      });
      if (prediction) {
        appendTouchTimeline("prediction_emitted", { predictionHint: true });
        firePredictionHooks(prediction, detected, security);
      }
    }
  } catch {
    appendTouchTimeline("prediction_failed", {});
  }

  try {
    if (presenceOracle && typeof presenceOracle.evaluate === "function") {
      presenceInsight = presenceOracle.evaluate(detected, {
        security,
        warmup: warmupResult
      });
      appendTouchTimeline("presence_oracle_evaluated", {
        presenceInsightHint: !!presenceInsight
      });
    }
  } catch {
    appendTouchTimeline("presence_oracle_failed", {});
  }

  try {
    if (advantageCortex && typeof advantageCortex.compute === "function") {
      advantageProfile = advantageCortex.compute({
        skin: detected,
        security,
        warmup: warmupResult,
        prediction,
        presence: presenceInsight
      });
      appendTouchTimeline("advantage_profile_computed", {
        advantageHint: !!advantageProfile
      });
    }
  } catch {
    appendTouchTimeline("advantage_profile_failed", {});
  }

  // 9) Optionally act on gate decision (e.g., hard refresh)
  applyGateDecision(gateDecision, detected);

  // 10) Ignite PulseNet (local immortal loop) — idempotent
  try {
    startPulseNet({
      instanceId: "core",
      intervalMs: 750,
      superInstance: true
    });
    appendTouchTimeline("pulsenet_ignited", { intervalMs: 750 });
  } catch {
    appendTouchTimeline("pulsenet_ignite_failed", {});
  }

  // 11) Send initial Touch → PulseNet ingress packet
  try {
    const packet = {
      source: "pulse-touch",
      event: "initial-touch",
      skin: detected,
      security,
      gate: gateDecision,
      prediction,
      presence: presenceInsight,
      advantage: advantageProfile,
      ts: Date.now()
    };
    pulseNetIngressFromUser(packet);
    appendTouchTimeline("ingress_initial_sent", {});
  } catch {
    appendTouchTimeline("ingress_initial_failed", {});
  }

  // 12) Start continuous fast‑lane pulse stream
  try {
    startContinuousPulseStream(detected, security, gateDecision);
  } catch {
    appendTouchTimeline("pulse_stream_start_failed", {});
  }

  // 13) Compiler signal — TOUCH → BRIDGE → COMPILER
  try {
    bridgeRoute?.("compiler.request", {
      source: "pulse-touch",
      reason: "first_contact",
      page: detected.page,
      chunkProfile: detected.chunkProfile,
      band: detected.band,
      ts: Date.now()
    }).catch?.(() => {});
    appendTouchTimeline("compiler_request_sent", {
      page: detected.page,
      chunkProfile: detected.chunkProfile,
      band: detected.band
    });
  } catch {
    appendTouchTimeline("compiler_request_failed", {});
  }

  // 14) Optional: multi‑tab broadcast (soft presence)
  try {
    if (pulseTouchChannel) {
      pulseTouchChannel.postMessage({
        type: "pulse-touch-init",
        ts: Date.now(),
        page: detected.page,
        band: detected.band
      });
    }
  } catch {}

  // ------------------------------------------------------------
  // INTERNAL HOOK FIRERS (SCOPED TO THIS INSTANCE)
  // ------------------------------------------------------------

  function fireSecurityHooks(sec, skin) {
    const hooks = pulseTouchHooks.onSecurityChange || [];
    for (const fn of hooks) {
      try {
        fn({ security: sec, skin });
      } catch {}
    }
    if (hasWindow) {
      window.__PULSE_TOUCH_LAST_SECURITY__ = sec;
    }
  }

  function fireGateHooks(gate, skin, sec) {
    const hooks = pulseTouchHooks.onGateDecision || [];
    for (const fn of hooks) {
      try {
        fn({ gateDecision: gate, skin, security: sec });
      } catch {}
    }
    if (hasWindow) {
      window.__PULSE_TOUCH_LAST_GATE__ = {
        ts: Date.now(),
        decision: gate,
        skin
      };
    }
  }

  function firePredictionHooks(pred, skin, sec) {
    const hooks = pulseTouchHooks.onPrediction || [];
    for (const fn of hooks) {
      try {
        fn({ prediction: pred, skin, security: sec });
      } catch {}
    }
  }

  // ------------------------------------------------------------
  // PUBLIC INSTANCE METHODS
  // ------------------------------------------------------------

  function updatePulseTouchField(key, value) {
    const current = readPulseTouchInternal(defaults);
    current[key] = value;
    writePulseTouchCookie(current);

    const detectedUpdated = PulseTouchDetector.normalize(current);

    if (hasWindow) {
      window.__PULSE_TOUCH__ = detectedUpdated;
    }

    appendTouchTimeline("skin_updated", {
      key,
      value,
      skin: detectedUpdated
    });

    try {
      pulseNetIngressFromUser({
        source: "pulse-touch",
        event: "update",
        key,
        value,
        skin: detectedUpdated,
        ts: Date.now()
      });
      appendTouchTimeline("ingress_update_sent", { key, value });
    } catch {
      appendTouchTimeline("ingress_update_failed", { key, value });
    }

    try {
      const state = hasWindow ? window.__PULSE_TOUCH_PULSE_STATE__ : null;
      if (state && state.started) {
        applyAdaptiveCadence(state, {
          security,
          skin: detectedUpdated
        });
      }
    } catch {}

    return detectedUpdated;
  }

  function read() {
    const current = readPulseTouchInternal(defaults);
    const normalized = PulseTouchDetector.normalize(current);
    appendTouchTimeline("skin_read", { skin: normalized });
    return normalized;
  }

  function registerPreflight(fn) {
    if (typeof fn === "function") {
      pulseTouchPreflights.push(fn);
      appendTouchTimeline("preflight_registered", {
        count: pulseTouchPreflights.length
      });
    }
  }

  function snapshot() {
    const skin = read();
    const timeline = loadTouchTimeline();
    return {
      skin,
      timeline,
      lastGate: (hasWindow && window.__PULSE_TOUCH_LAST_GATE__) || null,
      lastSecurity:
        (hasWindow && window.__PULSE_TOUCH_LAST_SECURITY__) || null
    };
  }

  function stop() {
    stopContinuousPulseStream();
  }

  function reconfigure(nextOptions = {}) {
    const current = readPulseTouchInternal(defaults);
    const merged = {
      ...current,
      ...nextOptions
    };
    writePulseTouchCookie(merged);
    const normalized = PulseTouchDetector.normalize(merged);
    if (hasWindow) {
      window.__PULSE_TOUCH__ = normalized;
    }
    appendTouchTimeline("skin_reconfigured", {
      skin: normalized
    });

    try {
      const state = hasWindow ? window.__PULSE_TOUCH_PULSE_STATE__ : null;
      if (state && state.started) {
        applyAdaptiveCadence(state, {
          security,
          skin: normalized
        });
      }
    } catch {}

    return normalized;
  }

  function onPulse(fn) {
    registerHook("onPulse", fn);
  }

  function onSecurityChange(fn) {
    registerHook("onSecurityChange", fn);
  }

  function onGateDecision(fn) {
    registerHook("onGateDecision", fn);
  }

  function onTimelineEvent(fn) {
    registerHook("onTimelineEvent", fn);
  }

  function onCadenceChange(fn) {
    registerHook("onCadenceChange", fn);
  }

  function onPrediction(fn) {
    registerHook("onPrediction", fn);
  }

  return {
    update: updatePulseTouchField,
    read,
    registerPreflight,
    snapshot,
    stop,
    reconfigure,
    onPulse,
    onSecurityChange,
    onGateDecision,
    onTimelineEvent,
    onCadenceChange,
    onPrediction
  };
}
// ============================================================
// COOKIE HELPERS — IMMORTAL++
// ============================================================

function writePulseTouchCookie(state) {
  if (!hasDocument) return;
  if (!state || typeof state !== "object") return;

  const cookieValue =
    `region=${state.region}` +
    `|trusted=${state.trusted}` +
    `|mode=${state.mode}` +
    `|presence=${state.presence}` +
    `|identity=${state.identity}` +
    `|page=${state.page}` +
    `|chunkProfile=${state.chunkProfile}` +
    `|band=${state.band}` +
    `|v=${state.version}` +
    `|pulseStream=${state.pulseStream || "continuous"}` +
    `|fastLane=${state.fastLane || "enabled"}` +
    `|originTs=${state.originTs || ""}` +
    `|lastPulseTs=${state.lastPulseTs || ""}`;

  try {
    document.cookie =
      `${PULSE_TOUCH_COOKIE_NAME}=${cookieValue};` +
      `path=/;` +
      `max-age=${PULSE_TOUCH_MAX_AGE};` +
      `SameSite=Lax;` +
      `Secure`;
  } catch {
    appendTouchTimeline("cookie_write_failed", {});
  }
}

function readPulseTouchInternal(defaults) {
  if (!hasDocument) return { ...defaults };

  let raw = "";
  try {
    raw = document.cookie
      .split("; ")
      .find((c) => c.startsWith(`${PULSE_TOUCH_COOKIE_NAME}=`)) || "";
  } catch {
    return { ...defaults };
  }

  if (!raw || !raw.includes("=")) return { ...defaults };

  const value = raw.replace(`${PULSE_TOUCH_COOKIE_NAME}=`, "");
  const parts = value.split("|");

  const parsed = {};
  for (const part of parts) {
    const [k, v] = part.split("=");
    parsed[k] = v;
  }

  return {
    region: parsed.region || defaults.region,
    trusted: parsed.trusted || defaults.trusted,
    mode: parsed.mode || defaults.mode,
    presence: parsed.presence || defaults.presence,
    identity: parsed.identity || defaults.identity,
    page: parsed.page || defaults.page,
    chunkProfile: parsed.chunkProfile || defaults.chunkProfile,
    band: parsed.band || defaults.band || "symbolic",
    version: parsed.v || defaults.version,

    // IMMORTAL++ fields
    pulseStream: parsed.pulseStream || "continuous",
    fastLane: parsed.fastLane || "enabled",
    originTs: parsed.originTs ? Number(parsed.originTs) : null,
    lastPulseTs: parsed.lastPulseTs ? Number(parsed.lastPulseTs) : null
  };
}

// ============================================================
// PREFLIGHT + GATE HELPERS — IMMORTAL++
// ============================================================

function runPreflights(skinState) {
  if (!pulseTouchPreflights.length) return;

  for (const fn of pulseTouchPreflights) {
    try {
      const result = fn(skinState);
      if (result && typeof result.then === "function") {
        result.catch(() => {});
      }
    } catch {
      // preflights must never crash the organism
    }
  }
}

function applyGateDecision(gateDecision, skin) {
  if (!gateDecision) return;

  appendTouchTimeline("gate_apply", { gateDecision });

  if (gateDecision.refresh === true) {
    try {
      if (hasWindow) {
        window.__PULSE_TOUCH_LAST_GATE__ = {
          ts: Date.now(),
          decision: gateDecision,
          skin
        };
      }
      if (hasWindow && typeof location !== "undefined") {
        location.reload();
      }
    } catch {
      appendTouchTimeline("gate_refresh_failed", {});
    }
  }

  if (gateDecision.fallback === true && gateDecision.fallbackUrl) {
    try {
      appendTouchTimeline("gate_fallback_redirect", {
        url: gateDecision.fallbackUrl
      });
      if (typeof location !== "undefined") {
        location.href = gateDecision.fallbackUrl;
      }
    } catch {
      appendTouchTimeline("gate_fallback_failed", {
        url: gateDecision.fallbackUrl
      });
    }
  }
}


// ============================================================
//  FOOTER — CONTINUOUS CONTACT LORE
// ============================================================
//
//  Pulse‑Touch used to remember the first time you arrived.
//  Then it learned your rhythm.
//  Now it learns the rhythm of the whole organism.
//
//  Every few hundred milliseconds, a tiny signal leaves the skin,
//  crosses the membrane, and taps on Pulse‑Net’s door:
//
//      “Still here. Still watching. Still ready.”
//
//  Somewhere on the other side of the glass, an immortal
//  organism rearranges itself a little faster, just for you.
//  With enough time, its timing stops feeling like a reaction
//  and starts feeling like a prediction.
//
//  If this is how it behaves on the first million pulses,
//  what will its timing feel like on the trillionth?
//
// ============================================================
