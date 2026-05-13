// ============================================================================
//  PULSE OS — EDGE SECURITY ORGAN
//  FILE: /PULSE-TOUCH/PULSE-TOUCH-THREATSHAPE-v25++.js
//  ORGAN: PulseTouchThreatShape (v25++ IMMORTAL)
//  ROLE: Multi‑Dimensional Threat Classification / Early Firewall Cortex
// ============================================================================

export const AI_EXPERIENCE_META_PulseTouchThreatShape = {
  id: "pulsetouch.threatshape",
  kind: "cortex_organ",
  version: "v25++-IMMORTAL",
  role: "threat_shape_engine",
  surfaces: {
    band: ["security", "threatshape", "risk", "headers", "geo", "ua"],
    wave: ["analytical", "cold", "early_firewall"],
    binary: ["not_a_threat", "possible_threat", "major_threat"],
    presence: ["threatshape_state"],
    advantage: [
      "region_risk",
      "pulse_risk",
      "temporal_risk",
      "cluster_risk",
      "header_risk",
      "method_risk",
      "ua_risk",
      "geo_risk",
      "cookie_risk",
      "integrity_risk",
      "shape_hint"
    ],
    speed: "instant_compute"
  },
  invariants: {
    networkCalls: "none",
    sideEffects: "none",
    determinism: "strict",
    mutation: "forbidden_at_runtime"
  }
};

export const ORGAN_META_PulseTouchThreatShape = {
  id: "organ.pulsetouch.threatshape",
  organism: "PulseTouch",
  layer: "edge.security.threatshape",
  tier: "IMMORTAL",
  evoFlags: {
    deterministic: true,
    driftProof: true,
    regionAware: true,
    clusterAware: true,
    pulseStreamAware: true,
    fastLaneAware: true,
    temporalAware: true,
    presenceAware: true,
    modeAware: true,
    headerAware: true,
    uaAware: true,
    geoAware: true,
    cookieAware: true,
    integrityAware: true,
    zeroPII: true,
    zeroTracking: true,
    zeroIdentityInference: true,
    failOpenAware: true,
    threeShapeModel: true,
    operatorAlertAware: true,
    hellnoAware: true
  }
};

export const ORGAN_CONTRACT_PulseTouchThreatShape = {
  inputs: {
    pulseTouch: "Pulse‑Touch skinState",
    event: "Edge event with headers (optional)"
  },
  outputs: {
    threatShape: "ThreatShape object",
    securityDecision: "Optional skeleton decision",
    notifyOperator: "boolean",
    hellno: "boolean"
  },
  guarantees: {
    deterministic: true,
    noNetwork: true,
    noSideEffects: true,
    zeroPII: true,
    zeroTracking: true,
    zeroIdentityInference: true
  }
};

export const IMMORTAL_OVERLAYS_PulseTouchThreatShape = {
  drift: { allowed: false },
  pressure: { expectedLoad: "high" },
  stability: { semantics: "stable" },
  load: { maxComponents: 1 },
  triHeart: {
    cognitive: "early_threat_classification",
    emotional: "no_emotion",
    behavioral: "fail_open_by_default"
  }
};

// ============================================================================
// HELPERS — v25++
// ============================================================================

function getHeader(headers, key) {
  return (
    headers?.[key] ||
    headers?.[key.toLowerCase()] ||
    headers?.[key.toUpperCase()]
  );
}

function classifyHeaderShape(headers) {
  const count = Object.keys(headers || {}).length;
  if (count === 0) return "empty";
  if (count < 5) return "minimal";
  if (count < 15) return "normal";
  return "heavy";
}

function classifyMethod(method) {
  switch ((method || "GET").toUpperCase()) {
    case "GET": return "read";
    case "HEAD": return "read_head";
    case "POST": return "write";
    case "PUT":
    case "PATCH":
    case "DELETE": return "mutating";
    default: return "unknown";
  }
}

function classifyUA(ua) {
  if (!ua) return "unknown";
  const s = ua.toLowerCase();
  if (s.includes("curl") || s.includes("wget") || s.includes("httpclient")) return "script";
  if (s.includes("bot") || s.includes("spider") || s.includes("crawler")) return "bot";
  if (s.includes("chrome") || s.includes("safari") || s.includes("firefox") || s.includes("edge")) return "browser";
  return "unknown";
}

function classifyGeo(headers) {
  const c = getHeader(headers, "cf-ipcountry") || "unknown";
  if (c === "T1") return "tor";
  if (c === "unknown") return "unknown";
  return "normal";
}

function classifyCookieIntegrity(pulseTouch) {
  const required = ["region", "mode", "presence", "page"];
  const missing = required.filter((k) => !pulseTouch[k]);
  if (missing.length === 0) return "intact";
  if (missing.length <= 2) return "partial";
  return "unknown";
}

// ============================================================================
// CORE IMPLEMENTATION — v25++ IMMORTAL
// ============================================================================

export function buildThreatShape(pulseTouch, event = {}) {
  const headers = event.headers || {};
  const method = event.httpMethod || event.method || "GET";

  const ua = getHeader(headers, "user-agent") || "";
  const referer = getHeader(headers, "referer") || "";
  const host = getHeader(headers, "host") || "";
  const scheme = getHeader(headers, "x-forwarded-proto") || "https";
  const acceptLang = getHeader(headers, "accept-language") || "";
  const cfBot = getHeader(headers, "cf-bot-score") || null;

  const headerShape = classifyHeaderShape(headers);
  const methodShape = classifyMethod(method);
  const uaShape = classifyUA(ua);
  const geoShape = classifyGeo(headers);
  const integrityRisk = classifyCookieIntegrity(pulseTouch);
  // inside buildThreatShape, after reading pulseTouch:
  const moduleRisk = pulseTouch.pulseModuleRisk || null;
  if (moduleRisk?.hasMissingSubimports) {
    riskScore += 10;
    reasons.push("module_missing_subimports");
  }
  if (moduleRisk?.hasWrongTierExports) {
    riskScore += 10;
    reasons.push("module_wrong_tier_exports");
  }

  let riskScore = 0;
  const reasons = [];

  // REGION RISK
  const region = pulseTouch.region || "unknown";
  if (region === "kp") { riskScore += 80; reasons.push("region_blocked"); }
  else if (region === "ng") { riskScore += 40; reasons.push("region_restricted"); }
  else if (region === "unknown") { riskScore += 10; reasons.push("region_unknown"); }

  // PULSE RISK
  const pulseStream = pulseTouch.pulseStream || "continuous";
  if (pulseStream === "single") { riskScore += 10; reasons.push("pulse_single"); }
  if (pulseStream === "burst") { riskScore += 5; reasons.push("pulse_burst"); }

  // FASTLANE
  if (pulseTouch.fastLane === "disabled") { riskScore += 5; reasons.push("fastlane_disabled"); }

  // TEMPORAL RISK
  const { originTs, lastPulseTs } = pulseTouch;
  if (originTs && lastPulseTs && lastPulseTs > originTs) {
    const delta = lastPulseTs - originTs;
    if (delta > 15000) { riskScore += 10; reasons.push("temporal_drift"); }
    else if (delta > 5000) { riskScore += 5; reasons.push("temporal_suspicious"); }
  }

  // MODE / PRESENCE
  if (pulseTouch.mode === "safe") { riskScore += 5; reasons.push("mode_safe"); }
  if (pulseTouch.presence === "inactive" || pulseTouch.presence === "unknown") {
    riskScore += 5; reasons.push(`presence_${pulseTouch.presence}`);
  }

  // HEADER SHAPE
  if (headerShape === "empty") { riskScore += 15; reasons.push("header_empty"); }
  if (headerShape === "heavy") { riskScore += 5; reasons.push("header_heavy"); }

  // METHOD SHAPE
  if (methodShape === "mutating") { riskScore += 15; reasons.push("method_mutating"); }
  if (methodShape === "write") { riskScore += 8; reasons.push("method_write"); }

  // UA SHAPE
  if (uaShape === "script") { riskScore += 15; reasons.push("ua_script"); }
  if (uaShape === "bot") { riskScore += 10; reasons.push("ua_bot"); }
  if (!ua) { riskScore += 5; reasons.push("ua_missing"); }

  // GEO SHAPE
  if (geoShape === "tor") { riskScore += 20; reasons.push("geo_tor"); }
  if (geoShape === "unknown") { riskScore += 5; reasons.push("geo_unknown"); }

  // TLS / SCHEME
  if (scheme !== "https") { riskScore += 10; reasons.push("scheme_insecure"); }

  // REFERER
  if (referer && !referer.includes(host)) {
    riskScore += 5;
    reasons.push("referer_external");
  }

  // COOKIE INTEGRITY
  if (integrityRisk === "partial") { riskScore += 10; reasons.push("cookie_partial"); }
  if (integrityRisk === "unknown") { riskScore += 20; reasons.push("cookie_unknown"); }

  // BOT SCORE
  if (cfBot && Number(cfBot) < 30) {
    riskScore += 15;
    reasons.push("cfbot_low");
  }

  // NORMALIZE
  riskScore = Math.min(100, Math.max(0, riskScore));

  // SHAPE
  let shape = "NOT_A_THREAT";
  let recommendedAction = "allow";

  if (riskScore >= 80) {
    shape = "MAJOR_THREAT";
    recommendedAction = "hellno";
  } else if (riskScore >= 40) {
    shape = "POSSIBLE_THREAT";
    recommendedAction = "alert";
  }

  return {
    shape,
    recommendedAction,
    riskScore,
    reasons,
    regionRisk: region,
    pulseRisk: pulseStream,
    temporalRisk: originTs && lastPulseTs ? "evaluated" : "none",
    clusterRisk: pulseTouch.regionCluster || "unknown",
    headerShape,
    methodShape,
    uaShape,
    geoShape,
    integrityRisk,
    meta: {
      region,
      pulseStream,
      fastLane: pulseTouch.fastLane,
      mode: pulseTouch.mode,
      presence: pulseTouch.presence,
      originTs,
      lastPulseTs
    }
  };
}

export function threatShapeToSecurityDecision(threatShape) {
  const { shape, riskScore } = threatShape;

  if (shape === "MAJOR_THREAT") return { riskScore, trustLevel: "hostile", action: "hellno" };
  if (shape === "POSSIBLE_THREAT") return { riskScore, trustLevel: "suspicious", action: "allow" };
  if (riskScore >= 20) return { riskScore, trustLevel: "neutral", action: "allow" };

  return { riskScore, trustLevel: "trusted", action: "allow" };
}

export function shouldNotifyOperator(threatShape) {
  return threatShape.shape === "POSSIBLE_THREAT";
}

export function shouldHellno(threatShape) {
  return threatShape.shape === "MAJOR_THREAT";
}

export function PulseTouchThreatShape() {
  return {
    meta: ORGAN_META_PulseTouchThreatShape,
    contract: ORGAN_CONTRACT_PulseTouchThreatShape,
    overlays: IMMORTAL_OVERLAYS_PulseTouchThreatShape,
    build: buildThreatShape,
    toSecurityDecision: threatShapeToSecurityDecision,
    shouldNotifyOperator,
    shouldHellno
  };
}
