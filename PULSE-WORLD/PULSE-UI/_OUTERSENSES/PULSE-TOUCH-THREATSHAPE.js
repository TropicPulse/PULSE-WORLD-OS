// ============================================================================
// FILE: /PULSE-TOUCH/PULSE-TOUCH-THREATSHAPE.js
// PULSE OS — v24 IMMORTAL++
// PULSE‑TOUCH THREATSHAPE ENGINE — 3‑SHAPE THREAT MODEL
// ============================================================================
//
// ROLE:
//   Early threat shape classification for Pulse‑Touch at the edge.
//   Consumes Pulse‑Touch skinState and produces a stable ThreatShape object:
//
//     • shape: NOT_A_THREAT | POSSIBLE_THREAT | MAJOR_THREAT
//     • recommendedAction: allow | alert | hellno
//     • riskScore: 0–100
//     • reasons: string[]
//     • regionRisk / pulseRisk / temporalRisk / clusterRisk
//     • meta: region / pulseStream / fastLane / mode / presence / timestamps
//
// CONTRACT:
//   • MUST NOT use PII
//   • MUST NOT infer personal identity
//   • MUST remain deterministic and drift‑proof
//   • MUST output a stable ThreatShape object
//
// ============================================================================
// AI_EXPERIENCE_META — v24 IMMORTAL++
// ============================================================================
export const AI_EXPERIENCE_META_PulseTouchThreatShape = {
  id: "pulsetouch.threatshape",
  kind: "cortex_organ",
  version: "v24-IMMORTAL++",
  role: "threat_shape_engine",
  surfaces: {
    band: ["security", "threatshape", "risk"],
    wave: ["analytical", "cold", "early_firewall"],
    binary: ["not_a_threat", "possible_threat", "major_threat"],
    presence: ["threatshape_state"],
    advantage: [
      "region_risk",
      "pulse_risk",
      "temporal_risk",
      "cluster_risk",
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

// ============================================================================
// ORGAN META
// ============================================================================
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

    zeroPII: true,
    zeroTracking: true,
    zeroIdentityInference: true,

    failOpenAware: true,
    threeShapeModel: true,
    operatorAlertAware: true,
    hellnoAware: true
  },
  lineage: {
    family: "pulsetouch_threatshape",
    generation: 2,
    osVersion: "v24",
    history: [
      "Touch v17 (Detector / Security / Gate / Warmup)",
      "ThreatShape v18 (Pre‑Entry Firewall Cortex)",
      "ThreatShape v24 (IMMORTAL++ ThreatShape Engine)"
    ]
  }
};

// ============================================================================
// ORGAN CONTRACT
// ============================================================================
export const ORGAN_CONTRACT_PulseTouchThreatShape = {
  inputs: {
    pulseTouch: "Pulse‑Touch skinState from detector",
    event: "Edge / Netlify event (optional, for future use)"
  },
  outputs: {
    threatShape: "ThreatShape object (3‑shape model)",
    securityDecision: "Optional skeleton decision (trustLevel/action)",
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

// ============================================================================
// IMMORTAL OVERLAYS
// ============================================================================
export const IMMORTAL_OVERLAYS_PulseTouchThreatShape = {
  drift: {
    allowed: false,
    notes: "Shape thresholds and semantics must remain stable."
  },
  pressure: {
    expectedLoad: "high",
    notes: "Runs on many requests; must remain O(1)."
  },
  stability: {
    semantics: "stable",
    notes: "Only additive evolution allowed; existing shapes must not change meaning."
  },
  load: {
    maxComponents: 1,
    notes: "Single ThreatShape per evaluation."
  },
  triHeart: {
    cognitive: "early_threat_classification",
    emotional: "no_emotion",
    behavioral: "fail_open_by_default"
  }
};

// ============================================================================
// CORE IMPLEMENTATION — v24 IMMORTAL++
// ============================================================================

/**
 * Build a ThreatShape from early environment identity.
 *
 * @param {Object} pulseTouch - Output from detectPulseTouch(event)
 * @param {Object} event      - Raw edge event (for IP / headers if needed)
 * @returns {Object} ThreatShape
 */
export function buildThreatShape(pulseTouch, event = {}) {
  const reasons = [];
  let riskScore = 0;

  const region = pulseTouch.region || "unknown";
  const pulseStream = pulseTouch.pulseStream || "continuous";
  const fastLane = pulseTouch.fastLane || "enabled";
  const mode = pulseTouch.mode || "fast";
  const presence = pulseTouch.presence || "unknown";
  const originTs = pulseTouch.originTs || null;
  const lastPulseTs = pulseTouch.lastPulseTs || null;

  // ------------------------------------------------------------
  // REGION RISK
  // ------------------------------------------------------------
  let regionRisk = "safe"; // safe | restricted | blocked

  const BLOCKED_REGIONS = new Set(["kp"]);
  const RESTRICTED_REGIONS = new Set(["ng"]);

  if (BLOCKED_REGIONS.has(region)) {
    regionRisk = "blocked";
    riskScore += 80;
    reasons.push(`region_blocked:${region}`);
  } else if (RESTRICTED_REGIONS.has(region)) {
    regionRisk = "restricted";
    riskScore += 40;
    reasons.push(`region_restricted:${region}`);
  }

  // ------------------------------------------------------------
  // PULSE RISK
  // ------------------------------------------------------------
  let pulseRisk = "normal"; // normal | anomalous | hostile

  if (pulseStream === "single") {
    pulseRisk = "anomalous";
    riskScore += 10;
    reasons.push("pulse_single");
  } else if (pulseStream === "burst") {
    pulseRisk = "anomalous";
    riskScore += 5;
    reasons.push("pulse_burst");
  }

  if (fastLane === "disabled") {
    pulseRisk = pulseRisk === "normal" ? "anomalous" : pulseRisk;
    riskScore += 5;
    reasons.push("fastlane_disabled");
  }

  // ------------------------------------------------------------
  // TEMPORAL RISK
  // ------------------------------------------------------------
  let temporalRisk = "normal"; // normal | drift | suspicious

  if (originTs && lastPulseTs && lastPulseTs > originTs) {
    const delta = lastPulseTs - originTs;
    if (delta > 15000) {
      temporalRisk = "drift";
      riskScore += 10;
      reasons.push("temporal_drift");
    } else if (delta > 5000) {
      temporalRisk = "suspicious";
      riskScore += 5;
      reasons.push("temporal_suspicious");
    }
  }

  // ------------------------------------------------------------
  // CLUSTER RISK
  // ------------------------------------------------------------
  let clusterRisk = "safe"; // safe | unknown | blocked

  if (region === "unknown") {
    clusterRisk = "unknown";
    riskScore += 10;
    reasons.push("cluster_unknown_region");
  }

  // ------------------------------------------------------------
  // MODE / PRESENCE HINTS
  // ------------------------------------------------------------
  if (mode === "safe") {
    riskScore += 5;
    reasons.push("mode_safe");
  }

  if (presence === "inactive" || presence === "unknown") {
    riskScore += 5;
    reasons.push(`presence_${presence}`);
  }

  // ------------------------------------------------------------
  // NORMALIZE RISK SCORE (0–100)
  // ------------------------------------------------------------
  if (riskScore < 0) riskScore = 0;
  if (riskScore > 100) riskScore = 100;

  // ------------------------------------------------------------
  // MAP RISK → THREAT SHAPE (3‑tier model)
  // ------------------------------------------------------------
  let shape = "NOT_A_THREAT";
  let recommendedAction = "allow";

  if (regionRisk === "blocked" || riskScore >= 80) {
    shape = "MAJOR_THREAT";
    recommendedAction = "hellno";
  } else if (
    regionRisk === "restricted" ||
    clusterRisk === "unknown" ||
    riskScore >= 40
  ) {
    shape = "POSSIBLE_THREAT";
    recommendedAction = "alert";
  }

  return {
    shape,
    recommendedAction,
    riskScore,
    reasons,
    regionRisk,
    pulseRisk,
    temporalRisk,
    clusterRisk,
    meta: {
      region,
      pulseStream,
      fastLane,
      mode,
      presence,
      originTs,
      lastPulseTs
    }
  };
}

/**
 * Map ThreatShape → Security decision skeleton.
 */
export function threatShapeToSecurityDecision(threatShape) {
  const { shape, riskScore } = threatShape;

  let trustLevel = "trusted";
  let action = "allow";

  if (shape === "MAJOR_THREAT") {
    trustLevel = "hostile";
    action = "hellno";
  } else if (shape === "POSSIBLE_THREAT") {
    trustLevel = "suspicious";
    action = "allow"; // fail‑open, operator alerted
  } else if (riskScore >= 20) {
    trustLevel = "neutral";
    action = "allow";
  }

  return {
    riskScore,
    trustLevel,
    action
  };
}

/**
 * Decide whether to notify operator (email/webhook) based on ThreatShape.
 */
export function shouldNotifyOperator(threatShape) {
  return threatShape.shape === "POSSIBLE_THREAT";
}

/**
 * Decide whether to hard‑block (HELLNO) based on ThreatShape.
 */
export function shouldHellno(threatShape) {
  return threatShape.shape === "MAJOR_THREAT";
}

// ============================================================================
// FACTORY ORGAN — IMMORTAL++
// ============================================================================
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
