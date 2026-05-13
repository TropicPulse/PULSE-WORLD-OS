// ============================================================================
// FILE: /PULSE-TOUCH/PULSE-TOUCH-SECURITY-v27++.js
// PULSE OS — v27++ IMMORTAL
// PULSE‑TOUCH SECURITY CORTEX — RISK ENGINE + TRUST CLASSIFIER + THREATSHAPE
// + MODULE / SUBIMPORT / PULSEIMPORT / PULSEEXPORT RISK HINTS
// ============================================================================

import {
  buildThreatShape as PulseTouchThreatShape,
  threatShapeToSecurityDecision as PulseThreatShapeToDecision
} from "./PULSE-TOUCH-THREATSHAPE.js";

export const AI_EXPERIENCE_META_PulseTouchSecurity = {
  id: "pulsetouch.security",
  kind: "cortex_organ",
  version: "v27++-IMMORTAL",
  role: "risk_engine",
  surfaces: {
    band: ["security", "trust", "risk", "shape", "headers", "module"],
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
      "ua_shape",

      // v27++ module surfaces
      "module_risk_score",
      "module_missing_subimports",
      "module_wrong_tier_exports",
      "module_global_exposure_risk",
      "module_chunkprofile_anomaly"
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
    uaShapeAware: true,

    // v27++
    moduleRiskAware: true,
    pulseImportAware: true,
    pulseExportAware: true,
    subimportAware: true,
    tierAware: true
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
    threatShape: "ThreatShape object",
    headerShape: "header profile classification",
    methodShape: "method classification",
    geoShape: "geo classification",
    uaShape: "user-agent classification",

    // v27++
    moduleRisk: "module-level risk hints (subimports / exports / tiers)"
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
// HELPERS — v27++
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

// Module risk extraction from pulseTouch / warmup cache (soft contract)
function extractModuleRisk(pulseTouch) {
  // Primary: explicit module risk hint on skinState
  const explicit = pulseTouch?.pulseModuleRisk;
  if (explicit && typeof explicit === "object") {
    return {
      hasMissingSubimports: !!explicit.hasMissingSubimports,
      hasWrongTierExports: !!explicit.hasWrongTierExports,
      hasGlobalExposureRisk: !!explicit.hasGlobalExposureRisk,
      hasChunkProfileAnomaly: !!explicit.hasChunkProfileAnomaly,
      score: typeof explicit.score === "number" ? explicit.score : null,
      source: "skinState"
    };
  }

  // Secondary: look into PulseImportWarmupCache if present (same page)
  try {
    if (typeof window !== "undefined" && window.PulseImportWarmupCache) {
      const page = pulseTouch?.page || "index";
      const entry = window.PulseImportWarmupCache[page];
      if (entry && typeof entry === "object") {
        const missing = Array.isArray(entry.subimportValidation?.missing)
          ? entry.subimportValidation.missing.length
          : 0;

        const wrongTierExports = Array.isArray(entry.exportsMeta)
          ? entry.exportsMeta.filter((e) =>
              e.tier === "global" || e.tier === "system"
            ).length
          : 0;

        const hasMissingSubimports = missing > 0;
        const hasWrongTierExports = wrongTierExports > 0;

        // Very conservative, bounded score
        let score = 0;
        if (hasMissingSubimports) score += 10;
        if (hasWrongTierExports) score += 10;

        return {
          hasMissingSubimports,
          hasWrongTierExports,
          hasGlobalExposureRisk: hasWrongTierExports,
          hasChunkProfileAnomaly: false,
          score,
          source: "warmup_cache"
        };
      }
    }
  } catch {
    // silent
  }

  return {
    hasMissingSubimports: false,
    hasWrongTierExports: false,
    hasGlobalExposureRisk: false,
    hasChunkProfileAnomaly: false,
    score: 0,
    source: "none"
  };
}

// ============================================================================
// IMPLEMENTATION — v27++ IMMORTAL
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

  // ThreatShape (v27++: full object, not string)
  const threatShapeObj = PulseTouchThreatShape(pulseTouch, event || {});
  const threatDecision = PulseThreatShapeToDecision(threatShapeObj);

  // Map ThreatShape into additive risk (bounded)
  if (threatShapeObj.shape === "MAJOR_THREAT") riskScore += 25;
  else if (threatShapeObj.shape === "POSSIBLE_THREAT") riskScore += 10;

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

  // v27++ MODULE RISK (PulseImport / PulseExport / Subimports)
  const moduleRisk = extractModuleRisk(pulseTouch);
  if (moduleRisk.score && moduleRisk.score > 0) {
    // Bounded contribution: max +20 from module system
    const bounded = Math.min(20, Math.max(0, moduleRisk.score));
    riskScore += bounded;
  }

  // Trust classification (IMMORTAL thresholds preserved)
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

    threatShape: threatShapeObj,
    headerShape,
    methodShape,
    geoShape,
    uaShape,

    // v27++ module surfaces
    moduleRisk
  };

  return {
    riskScore,
    trustLevel,
    action,
    advantage,
    threatShape: threatShapeObj,
    headerShape,
    methodShape,
    geoShape,
    uaShape,
    moduleRisk
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
