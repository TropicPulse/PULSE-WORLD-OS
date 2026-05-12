// ============================================================================
//  PULSE OS — OUTER SENSE ORGAN
//  FILE: _OUTERSENSES/PULSE-TOUCH-DETECTOR-v25++.js
//  ORGAN: PulseTouchDetector (v25++ IMMORTAL)
//  ROLE: Edge SKIN + Cookie Reader + Fastlane + Advantage Hints Surface
// ============================================================================

export const AI_EXPERIENCE_META_PulseTouchDetector = {
  id: "pulsetouch.detector",
  kind: "edge_skin",
  version: "v25++-IMMORTAL",
  role: "Pulse‑Touch skin signal reader",
  surfaces: {
    band: ["touch", "edge", "skin", "fastlane", "advantage", "routing"],
    wave: ["clinical", "precise", "sensory"],
    binary: ["cookie_present", "cookie_missing"],
    presence: ["touch_state", "region_hint", "mode_hint"],
    advantage: [
      "safe_defaults",
      "schema_stable",
      "fastlane_hints",
      "continuous_pulse_hints",
      "hydration_tier_hints",
      "animation_tier_hints",
      "chunk_profile_hints",
      "presence_intensity_hints"
    ],
    speed: "instant_compute"
  },
  routes: {
    warmup: "pulsetouch.warmup",
    security: "pulsetouch.security",
    gate: "pulsetouch.gate",
    advantage: "pulsetouch.advantage"
  },
  consumers: [
    "PulseTouchWarmup",
    "PulseTouchSecurity",
    "PulseTouchGate",
    "PulseTouchAdvantageCortex",
    "PulseTouchPreflight",
    "PulseTouchChunkEngine",
    "PulseTouchAnalytics"
  ],
  invariants: {
    networkCalls: "none",
    sideEffects: "none",
    determinism: "strict",
    mutation: "forbidden_at_runtime"
  }
};

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
    generation: 6,
    osVersion: "v25++",
    history: [
      "Pulse‑Touch v1 (Skin Hint)",
      "Pulse‑Touch v2 (Pre‑Pulse)",
      "Pulse‑Touch v3 (IMMORTAL Sensory Organ)",
      "Pulse‑Touch v14 (Immortal Advantage Skin)",
      "Pulse‑Touch v17 (Continuous FastLane Skin)",
      "Pulse‑Touch v24 (IMMORTAL++ Edge Skin)",
      "Pulse‑Touch v25++ (IMMORTAL Advantage Skin + Tiers)"
    ]
  }
};

export const ORGAN_CONTRACT_PulseTouchDetector = {
  inputs: {
    event: "edge request event with headers"
  },
  outputs: {
    skinState: "normalized pulse_touch state object (v25++ schema)"
  },
  consumers: [
    "PulseTouchWarmup",
    "PulseTouchSecurity",
    "PulseTouchGate",
    "PulseTouchAdvantageCortex",
    "PulseTouchPreflight",
    "PulseTouchChunkEngine",
    "PulseTouchAnalytics"
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
    cacheKey: "pulsetouch.detector.skinstate.v25"
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
// HELPERS — v25++
// ============================================================================

function safeNumber(str, fallback = null) {
  if (str == null) return fallback;
  const n = Number(str);
  return Number.isFinite(n) ? n : fallback;
}

function parseCookieHeader(cookieHeader) {
  if (!cookieHeader || typeof cookieHeader !== "string") return null;
  const raw = cookieHeader
    .split("; ")
    .find((c) => c.startsWith("pulse_touch="));
  if (!raw) return null;

  const value = raw.replace("pulse_touch=", "");
  const parts = value.split("|");

  const parsed = {};
  for (const part of parts) {
    const [k, v] = part.split("=");
    if (!k) continue;
    parsed[k] = v;
  }
  return parsed;
}

function derivePresenceIntensity(presence) {
  switch (presence) {
    case "high":
    case "engaged":
      return "high";
    case "low":
    case "idle":
      return "low";
    default:
      return "medium";
  }
}

function deriveRegionCluster(region) {
  switch (region) {
    case "us":
    case "us-east":
    case "us-west":
      return "clusterA";
    case "eu":
    case "eu-west":
    case "eu-central":
      return "clusterB";
    case "apac":
    case "asia":
      return "clusterC";
    default:
      return "clusterUnknown";
  }
}

function deriveHydrationTier(hydration) {
  switch (hydration) {
    case "minimal":
    case "low":
      return "minimal";
    case "full":
      return "full";
    default:
      return "safe";
  }
}

function deriveAnimationTier(animation) {
  switch (animation) {
    case "none":
    case "reduced":
      return "reduced";
    default:
      return "smooth";
  }
}

function deriveMode(mode) {
  switch (mode) {
    case "fast":
    case "turbo":
      return "fast";
    case "safe":
    case "normal":
      return "safe";
    default:
      return "safe";
  }
}

function deriveTrustLevel(trusted) {
  if (trusted === "2") return "trusted";
  if (trusted === "1") return "suspicious";
  return "unknown";
}

function deriveCookieIntegrity(parsed) {
  const required = ["region", "mode", "presence", "page"];
  const missing = required.filter((k) => !parsed[k]);
  if (missing.length === 0) return "intact";
  if (missing.length <= 2) return "partial";
  return "unknown";
}

// ============================================================================
// IMPLEMENTATION — v25++ IMMORTAL
// ============================================================================

/**
 * Edge‑safe, deterministic Pulse‑Touch cookie reader (v25++).
 *
 * @param {object} event - Edge / Netlify / gateway event with headers.
 * @returns {object} skinState - Normalized Pulse‑Touch state.
 */
export function detectPulseTouch(event) {
  const headers = event?.headers || {};
  const cookieHeader =
    headers.cookie ||
    headers.Cookie ||
    headers.COOKIE ||
    "";

  const parsed = parseCookieHeader(cookieHeader);
  if (!parsed) {
    return defaultPulseTouchState();
  }

  const version = parsed.v || parsed.version || "0";
  const presence = parsed.presence || "unknown";
  const pulseStream = parsed.pulseStream || "continuous";
  const fastLane = parsed.fastLane || "enabled";
  const mode = deriveMode(parsed.mode || "fast");
  const region = parsed.region || "unknown";

  const hydration = parsed.hydration || "auto";
  const animation = parsed.animation || "auto";

  const presenceIntensity = derivePresenceIntensity(presence);
  const regionCluster = deriveRegionCluster(region);
  const hydrationTier = deriveHydrationTier(hydration);
  const animationTier = deriveAnimationTier(animation);
  const trustLevel = deriveTrustLevel(parsed.trusted || "0");
  const integrity = parsed.integrity || deriveCookieIntegrity(parsed);

  const originTs = safeNumber(parsed.originTs, null);
  const lastPulseTs = safeNumber(parsed.lastPulseTs, null);

  return {
    // CORE FIELDS
    region,
    trusted: parsed.trusted || "0",
    trustLevel,
    mode,
    presence,
    presenceIntensity,
    identity: parsed.identity || "anon",
    v: version,

    // IMMORTAL ADVANTAGE FIELDS
    page: parsed.page || "index",
    chunkProfile: parsed.chunkProfile || "default",
    integrity,
    band: parsed.band || "dual",
    pulse: parsed.pulse || "early",
    evo: parsed.evo || "IMMORTAL",
    warmup: parsed.warmup || "auto",
    hydration,
    hydrationTier,
    animation,
    animationTier,

    // CONTINUOUS / FASTLANE HINTS
    pulseStream,
    fastLane,
    pulseOrigin: parsed.pulseOrigin || "edge",

    // Optional temporal hints
    originTs,
    lastPulseTs,

    // Derived clusters / hints for Advantage / Analytics
    regionCluster
  };
}

/**
 * Organism’s “blind touch” state when no pulse_touch cookie is present or readable.
 */
export function defaultPulseTouchState() {
  const region = "unknown";
  const presence = "unknown";
  const mode = "fast";

  const presenceIntensity = derivePresenceIntensity(presence);
  const regionCluster = deriveRegionCluster(region);
  const hydration = "auto";
  const animation = "auto";

  return {
    region,
    trusted: "0",
    trustLevel: "unknown",
    mode,
    presence,
    presenceIntensity,
    identity: "anon",
    v: "0",

    page: "index",
    chunkProfile: "default",
    integrity: "unknown",
    band: "dual",
    pulse: "early",
    evo: "IMMORTAL",
    warmup: "auto",
    hydration,
    hydrationTier: deriveHydrationTier(hydration),
    animation,
    animationTier: deriveAnimationTier(animation),

    pulseStream: "continuous",
    fastLane: "enabled",
    pulseOrigin: "edge",
    originTs: null,
    lastPulseTs: null,

    regionCluster
  };
}

// ============================================================================
// FACTORY ORGAN — IMMORTAL++
// ============================================================================
export function PulseTouchDetector() {
  return {
    meta: ORGAN_META_PulseTouchDetector,
    contract: ORGAN_CONTRACT_PulseTouchDetector,
    overlays: IMMORTAL_OVERLAYS_PulseTouchDetector,
    detect: detectPulseTouch,
    defaultState: defaultPulseTouchState
  };
}
