// ============================================================================
// FILE: /PULSE-TOUCH/PULSE-TOUCH-DETECTOR-v24.js
// PULSE OS — v24 IMMORTAL
// PULSE‑TOUCH DETECTOR — EDGE SKIN + COOKIE READER + FASTLANE HINTS
// ============================================================================
//
// ROLE:
//   The Pulse‑Touch Detector is the organism’s SKIN at the EDGE.
//   It is the first nerve ending that reads the pulse_touch cookie
//   from raw internet signal (request headers) BEFORE:
//
//     • The organism wakes
//     • The UI loads
//     • Any conscious layer runs
//
//   It produces a normalized, deterministic “skin state” object
//   that downstream organs (Warmup, Security, Gate, Advantage Cortex)
//   can safely consume.
//
// CONTRACT:
//   • MUST read pulse_touch cookie safely
//   • MUST normalize missing fields
//   • MUST NOT infer identity
//   • MUST NOT store PII
//   • MUST NOT track user
//   • MUST remain deterministic
//   • MUST remain drift‑proof
//
// v24 IMMORTAL++:
//   • Preserves v17 continuous / fastlane semantics
//   • Adds explicit AI_EXPERIENCE_META / ORGAN_META / CONTRACT / OVERLAYS
//   • Keeps schema stable and forward‑compatible
//   • No imports, no network, no side effects
//
// ============================================================================
// AI_EXPERIENCE_META
// ============================================================================
export const AI_EXPERIENCE_META_PulseTouchDetector = {
  id: "pulsetouch.detector",
  kind: "edge_skin",
  version: "v24-IMMORTAL",
  role: "Pulse‑Touch skin signal reader",
  surfaces: {
    band: ["touch", "edge", "skin", "fastlane"],
    wave: ["clinical", "precise", "sensory"],
    binary: ["cookie_present", "cookie_missing"],
    presence: ["touch_state", "region_hint"],
    advantage: [
      "safe_defaults",
      "schema_stable",
      "fastlane_hints",
      "continuous_pulse_hints"
    ],
    speed: "instant_compute"
  },
  routes: {
    warmup: "pulsetouch.warmup",
    security: "pulsetouch.security",
    gate: "pulsetouch.gate"
  },
  consumers: [
    "PulseTouchWarmup",
    "PulseTouchSecurity",
    "PulseTouchGate",
    "PulseTouchAdvantageCortex",
    "PulseTouchPreflight",
    "PulseTouchChunkEngine"
  ],
  invariants: {
    networkCalls: "none",
    sideEffects: "none",
    determinism: "strict",
    mutation: "forbidden_at_runtime"
  }
};

// ============================================================================
// ORGAN_META
// ============================================================================
export const ORGAN_META_PulseTouchDetector = {
  id: "organ.pulsetouch.detector",
  organism: "PulseTouch",
  layer: "edge.skin",
  tier: "IMMORTAL",
  evoFlags: {
    deterministic: true,
    driftProof: true,
    safeDefaults: true,
    schemaStable: true,
    presenceAware: true,
    regionAware: true,
    trustAware: true,
    identityHintAware: true,
    dualBandAware: true,
    chunkProfileAware: true,
    pageHintAware: true,
    warmupAware: true,
    prePulseAware: true,
    preflightAware: true,
    hydrationTierAware: true,
    animationTierAware: true,
    advantageRouting: true,
    regionClusterAware: true,
    modeAware: true,
    presenceIntensityAware: true,
    cookieVersionAware: true,
    cookieIntegrityAware: true,
    cookieEvolutionAware: true,
    pulseStreamAware: true,
    fastLaneAware: true,
    temporalHintAware: true
  },
  lineage: {
    family: "pulsetouch_skin",
    generation: 5,
    osVersion: "v24",
    history: [
      "Pulse‑Touch v1 (Skin Hint)",
      "Pulse‑Touch v2 (Pre‑Pulse)",
      "Pulse‑Touch v3 (IMMORTAL Sensory Organ)",
      "Pulse‑Touch v14 (Immortal Advantage Skin)",
      "Pulse‑Touch v17 (Continuous FastLane Skin)",
      "Pulse‑Touch v24 (IMMORTAL++ Edge Skin)"
    ]
  }
};

// ============================================================================
// ORGAN_CONTRACT
// ============================================================================
export const ORGAN_CONTRACT_PulseTouchDetector = {
  inputs: {
    event: "edge request event with headers"
  },
  outputs: {
    skinState: "normalized pulse_touch state object"
  },
  consumers: [
    "PulseTouchWarmup",
    "PulseTouchSecurity",
    "PulseTouchGate",
    "PulseTouchAdvantageCortex",
    "PulseTouchPreflight",
    "PulseTouchChunkEngine"
  ],
  guarantees: {
    deterministic: true,
    noNetwork: true,
    noSideEffects: true,
    zeroPII: true,
    zeroTracking: true,
    zeroGuessing: true,
    zeroAssumptions: true
  }
};

// ============================================================================
// IMMORTAL_OVERLAYS
// ============================================================================
export const IMMORTAL_OVERLAYS_PulseTouchDetector = {
  drift: {
    allowed: false,
    notes: "Cookie parsing + schema semantics must remain stable."
  },
  pressure: {
    expectedLoad: "high",
    notes: "Runs on every edge request; must stay cheap."
  },
  stability: {
    uiLayout: "none",
    semantics: "stable",
    notes: "Only additive evolution allowed; existing fields must not change meaning."
  },
  load: {
    maxComponents: 1,
    notes: "Single skinState object per request."
  },
  chunking: {
    prewarm: [],
    cacheKey: "pulsetouch.detector.skinstate"
  },
  worldLens: {
    awareOfWorlds: false
  },
  limbic: {
    band: "clinical_safety"
  },
  triHeart: {
    cognitive: "normalize_touch_state",
    emotional: "never_guess",
    behavioral: "feed_downstream_organs"
  },
  impulseSpeed: {
    primaryAction: "detect_pulse_touch",
    latencyTargetMs: 1
  },
  healingSurfaces: {
    enabled: false
  }
};

// ============================================================================
// IMPLEMENTATION — v24 IMMORTAL++
// ============================================================================

/**
 * detectPulseTouch
 * Edge‑safe, deterministic Pulse‑Touch cookie reader.
 *
 * @param {object} event - Edge / Netlify / gateway event with headers.
 * @returns {object} skinState - Normalized Pulse‑Touch state.
 */
export function detectPulseTouch(event) {
  // ============================================================
  // HEADER EXTRACTION — CASE‑SAFE, DRIFT‑PROOF
  // ============================================================
  const headers = event?.headers || {};
  const cookieHeader =
    headers.cookie ||
    headers.Cookie ||
    headers.COOKIE ||
    "";

  if (!cookieHeader || typeof cookieHeader !== "string") {
    return defaultPulseTouchState();
  }

  const raw = cookieHeader
    .split("; ")
    .find((c) => c.startsWith("pulse_touch="));

  if (!raw) return defaultPulseTouchState();

  const value = raw.replace("pulse_touch=", "");
  const parts = value.split("|");

  const parsed = {};
  for (const part of parts) {
    const [k, v] = part.split("=");
    if (!k) continue;
    parsed[k] = v;
  }

  // ============================================================
  // NORMALIZED SKIN STATE — IMMORTAL + CONTINUOUS / FASTLANE AWARE
  // ============================================================
  const version = parsed.v || parsed.version || "0";

  // Presence intensity: never inferred — only normalized if present.
  const presence = parsed.presence || "unknown";

  // Pulse stream mode: Touch v17+ may write this; we default safely.
  const pulseStream = parsed.pulseStream || "continuous"; // "continuous" | "burst" | "single" | "unknown"
  const fastLane = parsed.fastLane || "enabled";          // "enabled" | "disabled" | "unknown"

  return {
    // CORE FIELDS (original contract)
    region: parsed.region || "unknown",
    trusted: parsed.trusted || "0",
    mode: parsed.mode || "fast",
    presence,
    identity: parsed.identity || "anon",
    v: version,

    // IMMORTAL ADVANTAGE FIELDS (v14+)
    page: parsed.page || "index",
    chunkProfile: parsed.chunkProfile || "default",
    integrity: parsed.integrity || "unknown",
    band: parsed.band || "dual",
    pulse: parsed.pulse || "early",
    evo: parsed.evo || "IMMORTAL",
    warmup: parsed.warmup || "auto",
    hydration: parsed.hydration || "auto",
    animation: parsed.animation || "auto",

    // v17+ CONTINUOUS / FASTLANE HINTS
    pulseStream,
    fastLane,
    pulseOrigin: parsed.pulseOrigin || "edge",

    // Optional temporal hints; safe defaults if absent
    originTs: parsed.originTs || null,
    lastPulseTs: parsed.lastPulseTs || null
  };
}

/**
 * DEFAULT SKIN STATE
 * Organism’s “blind touch” state when no pulse_touch cookie is present or readable.
 */
export function defaultPulseTouchState() {
  return {
    region: "unknown",
    trusted: "0",
    mode: "fast",
    presence: "unknown",
    identity: "anon",
    v: "0",

    // IMMORTAL ADVANTAGE DEFAULTS
    page: "index",
    chunkProfile: "default",
    integrity: "unknown",
    band: "dual",
    pulse: "early",
    evo: "IMMORTAL",
    warmup: "auto",
    hydration: "auto",
    animation: "auto",

    // v17+ CONTINUOUS / FASTLANE DEFAULTS
    pulseStream: "continuous",
    fastLane: "enabled",
    pulseOrigin: "edge",
    originTs: null,
    lastPulseTs: null
  };
}
