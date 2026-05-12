// ============================================================================
// FILE: /PULSE-TOUCH/PULSE-TOUCH-SECURITY-v25++.js
// PULSE OS — v25++ IMMORTAL
// PULSE‑TOUCH SECURITY CORTEX — RISK ENGINE + TRUST CLASSIFIER + THREATSHAPE
// ============================================================================

import { buildThreatShape as PulseTouchThreatShape } from "./PULSE-TOUCH-THREATSHAPE.js";

export const AI_EXPERIENCE_META_PulseTouchSecurity = {
  id: "pulsetouch.security",
  kind: "cortex_organ",
  version: "v25++-IMMORTAL",
  role: "risk_engine",
  surfaces: {
    band: ["security", "trust", "risk", "shape", "headers"],
    wave: ["analytical", "cold", "precise"],
    binary: ["allow", "challenge", "deny"],
    presence: ["security_state"],
    advantage: [
      "hydration_tier",
      "animation_tier",
      "chunk_strategy",
      "warmup_profile",
      "region_cluster",
      "presence_intensity",
      "pulse_stream",
      "fastlane_state",
      "threatshape",
      "header_shape",
      "method_shape",
      "geo_shape",
      "ua_shape"
    ],
    speed: "instant_compute"
  },
  consumers: [
    "PulseTouchGate",
    "PulseTouchWarmup",
    "PulseTouchAdvantageCortex",
    "PulseTouchAnalytics"
  ],
  invariants: {
    networkCalls: "none",
    sideEffects: "none",
    determinism: "strict",
    mutation: "forbidden_at_runtime"
  }
};

export const ORGAN_META_PulseTouchSecurity = {
  id: "organ.pulsetouch.security",
  organism: "PulseTouch",
  layer: "edge.security",
  tier: "IMMORTAL",
  evoFlags: {
    deterministic: true,
    driftProof: true,
    trustClassifier: true,
    riskScoring: true,
    presenceAware: true,
    regionAware: true,
    identityHintAware: true,
    trustHintAware: true,

    zeroPII: true,
    zeroTracking: true,
    zeroInference: true,
    coldLogic: true,
    hostileAware: true,

    dualBandAware: true,
    chunkProfileAware: true,
    pageHintAware: true,
    warmupAware: true,
    prePulseAware: true,
    preflightAware: true,
    deterministicRouting: true,
    driftProofThresholds: true,
    advantageHooks: true,
    modeAware: true,
    regionClusterAware: true,
    presenceIntensityAware: true,
    hydrationTierAware: true,
    animationTierAware: true,

    pulseStreamAware: true,
    fastLaneAware: true,
    temporalHintAware: true,
    cookieEvolutionAware: true,

    threatShapeAware: true,
    headerShapeAware: true,
    methodShapeAware: true,
    geoShapeAware: true,
    uaShapeAware: true
  }
};

export const ORGAN_CONTRACT_PulseTouchSecurity = {
  inputs: {
    pulseTouch: "Pulse‑Touch skinState from detector",
    event: "Edge / Netlify event with headers"
  },
  outputs: {
    riskScore: "numeric risk score",
    trustLevel: "trusted | neutral | suspicious | hostile",
    action: "allow | challenge | hellno",
    advantage: "advantage profile for Gate / Warmup / Chunk",
    threatShape: "shape classification",
    headerShape: "header profile classification",
    methodShape: "method classification",
    geoShape: "geo classification",
    uaShape: "user-agent classification"
  },
  consumers: [
    "PulseTouchGate",
    "PulseTouchWarmup",
    "PulseTouchAdvantageCortex",
    "PulseTouchAnalytics"
  ],
  guarantees: {
    deterministic: true,
    noNetwork: true,
    noSideEffects: true,
    zeroPII: true,
    zeroTracking: true
  }
};

export const IMMORTAL_OVERLAYS_PulseTouchSecurity = {
  drift: {
    allowed: false,
    notes: "Risk thresholds and actions must remain stable."
  },
  pressure: {
    expectedLoad: "high",
    notes: "Runs on every request; must remain O(1)."
  },
  stability: {
    semantics: "stable",
    notes: "Only additive evolution allowed; thresholds are IMMORTAL."
  },
  load: {
    maxComponents: 1,
    notes: "Single risk decision object."
  },
  triHeart: {
    cognitive: "risk_evaluation",
    emotional: "no_emotion",
    behavioral: "deterministic_classification"
  }
};

// ============================================================================
// HELPERS — v25++
// ============================================================================

function getHeader(headers, key) {
  if (!headers) return undefined;
  return (
    headers[key] ||
    headers[key.toLowerCase()] ||
    headers[key.toUpperCase()]
  );
}

function classifyMethod(method) {
  switch ((method || "GET").toUpperCase()) {
    case "GET":
      return "read";
    case "HEAD":
      return "read_head";
    case "POST":
      return "write";
    case "PUT":
    case "PATCH":
    case "DELETE":
      return "mutating";
    default:
      return "unknown";
  }
}

function classifyGeo(headers) {
  const country = getHeader(headers, "cf-ipcountry") || "unknown";
  if (country === "T1") return "tor";
  if (country === "unknown") return "unknown";
  return "normal";
}

function classifyUA(ua) {
  if (!ua) return "unknown";
  const s = ua.toLowerCase();
  if (s.includes("curl") || s.includes("wget") || s.includes("httpclient")) {
    return "script";
  }
  if (s.includes("bot") || s.includes("spider") || s.includes("crawler")) {
    return "bot";
  }
  if (s.includes("chrome") || s.includes("safari") || s.includes("firefox") || s.includes("edge")) {
    return "browser";
  }
  return "unknown";
}

function classifyHeaderShape(headers) {
  const keys = Object.keys(headers || {});
  const count = keys.length;

  if (count === 0) return "empty";
  if (count < 5) return "minimal";
  if (count < 15) return "normal";
  return "heavy";
}

// ============================================================================
// IMPLEMENTATION — v25++ IMMORTAL
// ============================================================================

export function evaluateSecurity(pulseTouch, event) {
  const headers = event?.headers || {};
  const method = event?.httpMethod || event?.method || "GET";

  const ip =
    getHeader(headers, "x-forwarded-for") ||
    getHeader(headers, "client-ip") ||
    getHeader(headers, "x-nf-client-connection-ip") ||
    "unknown";

  const ua = getHeader(headers, "user-agent") || "";
  const referer = getHeader(headers, "referer") || getHeader(headers, "referrer") || "";
  const scheme = getHeader(headers, "x-forwarded-proto") || "https";
  const host = getHeader(headers, "host") || "";
  const acceptLang = getHeader(headers, "accept-language") || "";
  const cfBot = getHeader(headers, "cf-bot-score") || null;

  const methodShape = classifyMethod(method);
  const geoShape = classifyGeo(headers);
  const uaShape = classifyUA(ua);
  const headerShape = classifyHeaderShape(headers);

  let riskScore = 0;

  // v17 core (preserved)
  if (pulseTouch.trusted === "0") riskScore += 40;
  if (pulseTouch.region === "unknown") riskScore += 20;
  if (pulseTouch.identity === "anon") riskScore += 20;
  if (pulseTouch.presence === "unknown") riskScore += 10;
  if (ip === "unknown") riskScore += 10;

  // ThreatShape
  const threatShape = PulseTouchThreatShape(pulseTouch);
  if (threatShape === "SPIKE") riskScore += 25;
  if (threatShape === "WAVE") riskScore += 10;

  // FastLane / continuous pulse
  if (pulseTouch.presence === "inactive") riskScore += 5;
  if (pulseTouch.mode === "safe") riskScore += 5;
  if (pulseTouch.region === "global") riskScore += 5;

  if (pulseTouch.pulseStream === "single") riskScore += 5;
  if (pulseTouch.pulseStream === "burst") riskScore += 2;

  if (pulseTouch.fastLane === "disabled") riskScore += 5;

  if (pulseTouch.originTs && pulseTouch.lastPulseTs) {
    const delta = pulseTouch.lastPulseTs - pulseTouch.originTs;
    if (delta > 5000) riskScore += 5;
  }

  // v25++ header / method / geo / UA scoring
  if (methodShape === "mutating") riskScore += 15;
  if (methodShape === "write") riskScore += 8;

  if (geoShape === "tor") riskScore += 20;
  if (geoShape === "unknown") riskScore += 5;

  if (uaShape === "script") riskScore += 15;
  if (uaShape === "bot") riskScore += 10;
  if (!ua) riskScore += 5;

  if (headerShape === "empty") riskScore += 15;
  if (headerShape === "heavy") riskScore += 5;

  if (scheme !== "https") riskScore += 10;

  if (cfBot && Number(cfBot) < 30) riskScore += 15;

  if (referer && !referer.includes(host)) {
    riskScore += 5;
  }

  // Trust classification
  let trustLevel = "trusted";
  let action = "allow";

  if (riskScore >= 80) {
    trustLevel = "hostile";
    action = "hellno";
  } else if (riskScore >= 50) {
    trustLevel = "suspicious";
    action = "challenge";
  } else if (riskScore >= 20) {
    trustLevel = "neutral";
    action = "allow";
  }

  // Advantage profile
  const advantage = {
    hydrationTier:
      trustLevel === "hostile" ? "minimal" :
      trustLevel === "suspicious" ? "safe" : "full",

    animationTier:
      trustLevel === "hostile" ? "none" :
      trustLevel === "suspicious" ? "reduced" : "smooth",

    chunkStrategy:
      pulseTouch.mode === "fast" ? "aggressive" : "safe",

    warmupProfile:
      trustLevel === "hostile" ? "minimal" :
      trustLevel === "suspicious" ? "safe" : "full",

    regionCluster: pulseTouch.regionCluster || pulseTouch.region || "unknown",
    presenceIntensity: pulseTouch.presenceIntensity || pulseTouch.presence || "unknown",
    pulseStream: pulseTouch.pulseStream || "continuous",
    fastLane: pulseTouch.fastLane || "enabled",

    temporal: {
      originTs: pulseTouch.originTs || null,
      lastPulseTs: pulseTouch.lastPulseTs || null
    },

    threatShape,
    headerShape,
    methodShape,
    geoShape,
    uaShape
  };

  return {
    riskScore,
    trustLevel,
    action,
    advantage,
    threatShape,
    headerShape,
    methodShape,
    geoShape,
    uaShape
  };
}

export function PulseTouchSecurity() {
  return {
    meta: ORGAN_META_PulseTouchSecurity,
    contract: ORGAN_CONTRACT_PulseTouchSecurity,
    overlays: IMMORTAL_OVERLAYS_PulseTouchSecurity,
    evaluate: evaluateSecurity
  };
}
