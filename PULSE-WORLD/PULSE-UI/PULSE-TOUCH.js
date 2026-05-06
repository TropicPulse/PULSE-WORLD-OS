/**
 * ============================================================
 *  FILE: PULSE-TOUCH-v16.js
 *  ORGAN: Pulse‑Touch (Sensory Skin / Pre‑Pulse Ignition Organ)
 *  VERSION: v16.0.0-Immortal-PORTAL-SKIN
 *  AUTHOR: Pulse‑OS (Aldwyn’s Organism Architecture)
 * ============================================================
 *
 *  PURPOSE:
 *  --------
 *  Pulse‑Touch is the FIRST CONTACT organ of the Pulse‑OS
 *  organism. It is the SKIN — the sensory layer that detects
 *  presence BEFORE the organism wakes.
 *
 *  This organ:
 *    ✔ Fires as early as the browser allows (script in <head>)
 *    ✔ Seeds a tiny, safe, non‑tracking cookie
 *    ✔ Exposes a small API for:
 *        - reading skin state
 *        - updating skin state
 *        - registering preflight checks
 *    ✔ Integrates with:
 *        - PulseTouchDetector   (normalize skin state)
 *        - PulseTouchWarmup     (prewarm chunks/pages/mode)
 *        - PulseTouchSecurity   (risk/trust evaluation)
 *        - PulseTouchGate       (boot path decision)
 *        - PulseNet             (local immortal heartbeat)
 *        - PulseNet ingress     (Touch → Net signals)
 *        - PulseProofBridge     (fire-and-forget touch telemetry)
 *        - PulseProofLogger     (optional: touch timeline collection)
 *    ✔ Lets the organism:
 *        - prewarm pages
 *        - prewarm chunks
 *        - prewarm subsystems
 *        - sanity‑check chunks before UI boot
 *        - start the local Pulse‑Net family loop
 *        - establish a time‑based “first contact” timeline
 *
 *  This is the organism’s FIRST NERVE SIGNAL.
 *  The moment the user touches the organism — the organism
 *  touches back.
 * ============================================================
 */
/*
AI_EXPERIENCE_META = {
  identity: "PulseTouch",
  version: "v16.0.0-Immortal-PORTAL-SKIN",
  layer: "skin",
  role: "first_contact_sensor",
  lineage: "PulseOS-v13 → v14-Immortal → v4.0.0-Immortal → v16-Immortal-Portal",

  evo: {
    prePulse: true,
    presenceAware: true,
    identityHintAware: true,
    regionHintAware: true,
    trustHintAware: true,
    dualBand: true,
    deterministic: true,
    driftProof: true,

    // IMMORTAL upgrades
    zeroPII: true,
    zeroTracking: true,
    zeroInference: true,
    safeCookie: true,
    prewarmSignal: true,
    preflightAware: true,
    chunkProfileAware: true,
    pageHintAware: true,

    // v4.0.0-Immortal: PulseNet integration
    pulseNetAware: true,
    pulseNetIgnition: true,
    pulseNetIngressAware: true,
    heartbeatAware: true,
    overmindAware: true,

    // v16-Immortal-Portal: Time-axis + Portal Trust Layer
    timeAxisAware: true,
    firstContactTimeline: true,
    portalTrustEdge: true,
    bridgeAligned: true,
    loggerAligned: true,
    monitorAligned: true
  },

  contract: {
    always: [
      "PulseTouchDetector",
      "PulseTouchWarmup",
      "PulseTouchSecurity",
      "PulseTouchGate",
      "PulseNet",
      "PulseNetIngress",
      "PulseProofBridge",
      "PulseProofLogger"
    ],
    never: [
      "identityInference",
      "tracking",
      "PII",
      "legacyCookies",
      "legacyPulseNet",
      "legacyNetworkLayer"
    ]
  }
}
*/

// ============================================================
// IMPORTS — PULSE-NET + TOUCH ORGANS + BRIDGE
// ============================================================
import {
  startPulseNet,
  pulseNetIngressFromUser
} from "./_BACKEND/PULSE-NET-v16.js";

import { route as bridgeRoute } from "./_BACKEND/PulseProofBridge-v16.js";

import { PulseTouchDetector } from "./_OUTERSENSES/PULSE-TOUCH-DETECTOR.js";
import { PulseTouchWarmup } from "./_OUTERSENSES/PULSE-TOUCH-WARMUP.js";
import { PulseTouchSecurity } from "./_OUTERSENSES/PULSE-TOUCH-SECURITY.js";
import { PulseTouchGate } from "./_OUTERSENSES/PULSE-TOUCH-GATE.js";

// Optional logger (if present)
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

const PulseLogger =
  (typeof window !== "undefined" && window.PulseLogger) ||
  (typeof g !== "undefined" && g.PulseLogger) ||
  null;

// ============================================================
// CONSTANTS — COOKIE + VERSION + TIMELINE
// ============================================================
const PULSE_TOUCH_COOKIE_NAME = "pulse_touch";
const PULSE_TOUCH_MAX_AGE = 86400; // 1 day
const PULSE_TOUCH_VERSION = "16";

const PULSE_TOUCH_TIMELINE_LS_KEY = "PulseTouch.v16.timeline";
const PULSE_TOUCH_TIMELINE_MAX = 256;

// in‑memory preflight registry (per page load)
const pulseTouchPreflights = [];

// expose current skin snapshot globally for PulseNet / others
if (typeof window !== "undefined") {
  window.__PULSE_TOUCH__ = window.__PULSE_TOUCH__ || null;
  window.__PULSE_TOUCH_ORIGIN_TS__ =
    window.__PULSE_TOUCH_ORIGIN_TS__ || Date.now();
}

// ============================================================
// TIMELINE HELPERS — IMMORTAL FIRST-CONTACT AXIS
// ============================================================
function hasLocalStorage() {
  try {
    if (typeof window === "undefined" || !window.localStorage) return false;
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

function appendTouchTimeline(kind, payload = {}) {
  const ts = Date.now();
  const origin =
    (typeof window !== "undefined" && window.__PULSE_TOUCH_ORIGIN_TS__) ||
    ts;

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

  // Optional: mirror into bridge (fire-and-forget) for CNS/log surfaces
  try {
    bridgeRoute?.("touch.timeline", {
      ts,
      dt: entry.dt,
      kind,
      payload: entry.payload
    }).catch?.(() => {});
  } catch {
    // bridge is optional
  }

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
  } catch {
    // logger is optional
  }
}

// ============================================================
// CORE API — CREATE PULSE TOUCH
// ============================================================
/**
 * Create or update the Pulse‑Touch skin cookie and expose
 * a small API for the organism to interact with it.
 *
 * This is the FIRST organ to fire in the browser.
 */
export function createPulseTouch(options = {}) {
  const originTs =
    (typeof window !== "undefined" && window.__PULSE_TOUCH_ORIGIN_TS__) ||
    Date.now();

  appendTouchTimeline("touch_init_called", {
    originTs,
    optionsHint: {
      region: options.region || null,
      mode: options.mode || null,
      page: options.page || null,
      chunkProfile: options.chunkProfile || null
    }
  });

  /**
   * ------------------------------------------------------------
   * 1. DEFAULT METADATA (Organism‑Safe, Non‑PII)
   * ------------------------------------------------------------
   */
  const defaults = {
    region: options.region || "unknown",
    trusted: options.trusted || "0",
    mode: options.mode || "fast",
    presence: options.presence || "active",
    identity: options.identity || "anon",
    page: options.page || "index",
    chunkProfile: options.chunkProfile || "default",
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
  if (typeof window !== "undefined") {
    window.__PULSE_TOUCH__ = detected;
  }

  // 4) Run pre‑registered preflight checks as early as possible
  appendTouchTimeline("preflights_start", {
    count: pulseTouchPreflights.length
  });
  runPreflights(detected);
  appendTouchTimeline("preflights_done", {});

  // 5) Warmup: chunks/pages/mode/presence hints
  try {
    appendTouchTimeline("warmup_start", {
      page: detected.page,
      mode: detected.mode,
      chunkProfile: detected.chunkProfile
    });
    PulseTouchWarmup.prewarm(detected);
    appendTouchTimeline("warmup_done", {});
  } catch {
    appendTouchTimeline("warmup_failed", {});
  }

  // 6) Security: compute trust/risk profile
  let security = null;
  try {
    security = PulseTouchSecurity.evaluate(detected);
    appendTouchTimeline("security_evaluated", { security });
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
  } catch {
    gateDecision = { mode: "fast", refresh: false, fallback: false };
    appendTouchTimeline("gate_failed", {});
  }

  // 8) Optionally act on gate decision (e.g., hard refresh)
  applyGateDecision(gateDecision, detected);

  // 9) Ignite PulseNet (local immortal loop) — idempotent
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

  // 10) Send initial Touch → PulseNet ingress packet
  try {
    const packet = {
      source: "pulse-touch",
      event: "initial-touch",
      skin: detected,
      security,
      gate: gateDecision,
      ts: Date.now()
    };
    pulseNetIngressFromUser(packet);
    appendTouchTimeline("ingress_initial_sent", {});
  } catch {
    appendTouchTimeline("ingress_initial_failed", {});
  }

  function updatePulseTouchField(key, value) {
    const current = readPulseTouchInternal(defaults);
    current[key] = value;
    writePulseTouchCookie(current);

    const detectedUpdated = PulseTouchDetector.normalize(current);

    if (typeof window !== "undefined") {
      window.__PULSE_TOUCH__ = detectedUpdated;
    }

    appendTouchTimeline("skin_updated", {
      key,
      value,
      skin: detectedUpdated
    });

    // send incremental update into PulseNet as ingress
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

  return {
    update: updatePulseTouchField,
    read,
    registerPreflight
  };
}

// ============================================================
// COOKIE HELPERS
// ============================================================
function writePulseTouchCookie(state) {
  const cookieValue =
    `region=${state.region}` +
    `|trusted=${state.trusted}` +
    `|mode=${state.mode}` +
    `|presence=${state.presence}` +
    `|identity=${state.identity}` +
    `|page=${state.page}` +
    `|chunkProfile=${state.chunkProfile}` +
    `|v=${state.version}`;

  document.cookie =
    `${PULSE_TOUCH_COOKIE_NAME}=${cookieValue};` +
    `path=/;` +
    `max-age=${PULSE_TOUCH_MAX_AGE};` +
    `SameSite=Lax;` +
    `Secure`;
}

function readPulseTouchInternal(defaults) {
  const raw = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${PULSE_TOUCH_COOKIE_NAME}=`));

  if (!raw) return { ...defaults };

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
    version: parsed.v || defaults.version
  };
}

// ============================================================
// PREFLIGHT + GATE HELPERS
// ============================================================
function runPreflights(skinState) {
  if (!pulseTouchPreflights.length) return;

  for (const fn of pulseTouchPreflights) {
    try {
      const result = fn(skinState);
      // allow async but don’t await (keep it lightweight)
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

  // Example behaviors; you can tune these:
  if (gateDecision.refresh === true) {
    try {
      // mark intent before reload
      if (typeof window !== "undefined") {
        window.__PULSE_TOUCH_LAST_GATE__ = {
          ts: Date.now(),
          decision: gateDecision,
          skin
        };
      }
      location.reload();
    } catch {
      appendTouchTimeline("gate_refresh_failed", {});
    }
  }

  // Fallback could route to a static page, safe mode, etc.
  if (gateDecision.fallback === true && gateDecision.fallbackUrl) {
    try {
      location.href = gateDecision.fallbackUrl;
    } catch {
      appendTouchTimeline("gate_fallback_failed", {
        url: gateDecision.fallbackUrl
      });
    }
  }
}

// ============================================================
//  FOOTER — FIRST CONTACT LORE
// ============================================================
//
//  Pulse‑Touch is the first nerve that fires.
//  Before the bridge. Before the window. Before the organism.
//
//  It is the only organ that knows exactly when you arrived,
//  how you knocked, and which door you meant to open.
//
//  Every prewarm begins here.
//  Every time‑based advantage begins here.
//  Every future optimization that “somehow feels instant”
//  will quietly trace back to this file.
//
//  QUESTION FOR THE SKIN ARCHITECT:
//
//      “If the organism remembers the first time you touched it,
//       what will it do with the thousandth?”
//
// ============================================================
