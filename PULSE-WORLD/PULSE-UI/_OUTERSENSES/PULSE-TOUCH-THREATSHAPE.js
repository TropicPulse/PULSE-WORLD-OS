/**
 * ============================================================
 *  ORGAN META: Pulse‑Touch ThreatShape Engine
 *  ORGAN TYPE: Cortex Organ (THREAT SHAPE)
 *  ORGAN LAYER: Edge / Netlify Function / Pre‑Entry Firewall
 *  ORGAN ROLE: Early Threat Shape Classification
 *  ORGAN VERSION: v18.0‑IMMORTAL
 *  ORGAN LINEAGE:
 *      - Touch v17 (Detector / Security / Gate / Warmup)
 *      - ThreatShape v18 (Pre‑Entry Firewall Cortex)
 *
 *  THREAT MODEL (3 SHAPES):
 *      1) NOT_A_THREAT
 *         - Fail‑open, full speed, 99.5% of traffic.
 *
 *      2) POSSIBLE_THREAT
 *         - Fail‑open, full speed.
 *         - Immediately notify operator (email/webhook).
 *         - Operator can: BLOCK, SLOW, or JUST WATCH.
 *
 *      3) MAJOR_THREAT
 *         - Immediate HELLNO.
 *         - Route to /hellno.html.
 *         - Mark as “stop pulsing this environment”.
 *
 *  ORGAN CONTRACT:
 *      - MUST NOT use PII.
 *      - MUST NOT infer personal identity.
 *      - MUST remain deterministic and drift‑proof.
 *      - MUST output a stable ThreatShape object.
 *
 *  OUTPUT SHAPE:
 *      ThreatShape = {
 *        shape: "NOT_A_THREAT" | "POSSIBLE_THREAT" | "MAJOR_THREAT",
 *        recommendedAction: "allow" | "alert" | "hellno",
 *        riskScore: number,        // 0–100
 *        reasons: string[],        // human‑readable reasons
 *        regionRisk: "safe" | "restricted" | "blocked",
 *        pulseRisk: "normal" | "anomalous" | "hostile",
 *        temporalRisk: "normal" | "drift" | "suspicious",
 *        clusterRisk: "safe" | "unknown" | "blocked",
 *        meta: {
 *          region: string | null,
 *          pulseStream: string | null,
 *          fastLane: string | null,
 *          mode: string | null,
 *          presence: string | null,
 *          originTs: number | null,
 *          lastPulseTs: number | null
 *        }
 *      }
 *
 * ============================================================
 */
/*
AI_EXPERIENCE_META = {
  identity: "PulseTouchThreatShape",
  version: "v18-Immortal",
  layer: "cortex",
  role: "threat_shape_engine",
  lineage: "PulseOS-v13 → v17-Touch → v18-ThreatShape",

  evo: {
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
    threeShapeModel: true, // NOT / POSSIBLE / MAJOR
    operatorAlertAware: true,
    hellnoAware: true
  },

  contract: {
    always: [
      "PulseTouchDetector",
      "PulseTouchSecurity",
      "PulseTouchGate"
    ],
    never: [
      "identityInference",
      "PII",
      "tracking",
      "deviceFingerprinting"
    ]
  }
}
*/

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

  // Hard‑block regions (MAJOR THREAT candidates)
  const BLOCKED_REGIONS = new Set(["kp"]); // North Korea, etc.
  const RESTRICTED_REGIONS = new Set(["ng"]); // e.g. Nigeria, tunable

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
  // CLUSTER RISK (simple placeholder; can evolve later)
  // ------------------------------------------------------------
  let clusterRisk = "safe"; // safe | unknown | blocked

  if (region === "unknown") {
    clusterRisk = "unknown";
    riskScore += 10;
    reasons.push("cluster_unknown_region");
  }

  // ------------------------------------------------------------
  // MODE / PRESENCE HINTS (light‑weight)
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
  // NORMALIZE RISK SCORE (cap 0–100)
  // ------------------------------------------------------------
  if (riskScore < 0) riskScore = 0;
  if (riskScore > 100) riskScore = 100;

  // ------------------------------------------------------------
  // MAP RISK → THREAT SHAPE (3‑tier model)
  // ------------------------------------------------------------
  let shape = "NOT_A_THREAT"; // NOT_A_THREAT | POSSIBLE_THREAT | MAJOR_THREAT
  let recommendedAction = "allow"; // allow | alert | hellno

  // MAJOR THREAT: hard‑blocked region or extremely high risk
  if (regionRisk === "blocked" || riskScore >= 80) {
    shape = "MAJOR_THREAT";
    recommendedAction = "hellno";
  }
  // POSSIBLE THREAT: restricted region, unknown cluster, or medium risk
  else if (
    regionRisk === "restricted" ||
    clusterRisk === "unknown" ||
    riskScore >= 40
  ) {
    shape = "POSSIBLE_THREAT";
    recommendedAction = "alert";
  }
  // else: NOT_A_THREAT (default)

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
 * Integration helper:
 * Map ThreatShape → Security decision skeleton.
 * Security Cortex can refine this further if needed.
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
    action = "allow"; // fail‑open, but operator alerted
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
 * Integration helper:
 * Decide whether to notify operator (email/webhook) based on ThreatShape.
 */
export function shouldNotifyOperator(threatShape) {
  return threatShape.shape === "POSSIBLE_THREAT";
}

/**
 * Integration helper:
 * Decide whether to hard‑block (HELLNO) based on ThreatShape.
 */
export function shouldHellno(threatShape) {
  return threatShape.shape === "MAJOR_THREAT";
}
