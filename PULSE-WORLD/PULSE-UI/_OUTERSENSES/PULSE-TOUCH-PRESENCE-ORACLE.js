// ============================================================================
//  PULSE OS — OUTER SENSE ORGAN
//  FILE: _OUTERSENSES/PULSE-TOUCH-PRESENCE-ORACLE-v25++.js
//  ORGAN: PulseTouchPresenceOracle (v25++ IMMORTAL)
//  ROLE: Presence Intensity / Stability / Volatility / Oracle Hints
// ============================================================================

export const AI_EXPERIENCE_META_PulsePresenceOracle = {
  id: "pulsetouch.presence_oracle",
  kind: "outer_sense",
  version: "v25++-IMMORTAL",
  role: "presence_oracle",
  surfaces: {
    band: ["presence", "intensity", "stability", "volatility", "trend"],
    wave: ["quiet", "stabilizing", "predictive"],
    presence: ["presence_state"],
    speed: "sync"
  }
};

export const ORGAN_META_PulsePresenceOracle = {
  id: "organ.pulsetouch.presence_oracle",
  organism: "PulseTouch",
  layer: "outer_sense.presence",
  tier: "IMMORTAL",
  evoFlags: {
    deterministic: true,
    driftProof: true,
    asyncSafe: true,
    zeroPII: true,
    zeroTracking: true,
    presenceAware: true,
    presenceIntensityAware: true,
    presenceTrendAware: true,
    presenceVolatilityAware: true,
    regionClusterAware: true,
    signalAware: true,
    genomeAware: true,
    warmupAware: true,
    analyticsAware: true
  }
};

export const ORGAN_CONTRACT_PulsePresenceOracle = {
  inputs: {
    pulseTouch: "Pulse‑Touch skinState",
    history: "Optional presence history",
    analytics: "PulseTouchAnalytics metrics",
    predictor: "PulseTouchPredictor view",
    organismMap: "PulseOrganismMap (optional)"
  },
  outputs: {
    presenceIntensity: "low | medium | high",
    stability: "stable | unstable",
    volatility: "low | medium | high",
    trend: "rising | falling | steady",
    confidence: "0–1 numeric",
    oracleHints: "Hints for Warmup / Security / Advantage / Gate"
  },
  guarantees: {
    deterministic: true,
    noNetwork: true,
    noSideEffects: true
  }
};

export const IMMORTAL_OVERLAYS_PulsePresenceOracle = {
  drift: { allowed: false },
  pressure: { expectedLoad: "low" },
  stability: { semantics: "stable" },
  load: { maxComponents: 1 }
};

// ============================================================================
// HELPERS — v25++
// ============================================================================

function deriveIntensity(presence) {
  switch (presence) {
    case "active":
    case "engaged":
    case "focused":
      return "high";
    case "idle":
    case "background":
      return "medium";
    case "unknown":
    default:
      return "low";
  }
}

function computeStability(history) {
  if (!Array.isArray(history) || history.length < 3) return "unstable";

  const last = history.slice(-3);
  const unique = new Set(last);

  return unique.size === 1 ? "stable" : "unstable";
}

function computeVolatility(history) {
  if (!Array.isArray(history) || history.length < 4) return "medium";

  let changes = 0;
  for (let i = 1; i < history.length; i++) {
    if (history[i] !== history[i - 1]) changes++;
  }

  if (changes === 0) return "low";
  if (changes <= 2) return "medium";
  return "high";
}

function computeTrend(history) {
  if (!Array.isArray(history) || history.length < 3) return "steady";

  const last = history.slice(-3).map((p) => deriveIntensity(p));
  const score = last.map((i) => (i === "high" ? 3 : i === "medium" ? 2 : 1));

  if (score[2] > score[1] && score[1] > score[0]) return "rising";
  if (score[2] < score[1] && score[1] < score[0]) return "falling";
  return "steady";
}

function computeConfidence(intensity, stability, volatility) {
  let base = 0.5;

  if (intensity === "high") base += 0.2;
  if (stability === "stable") base += 0.2;
  if (volatility === "low") base += 0.1;

  return Math.min(1, Math.max(0, base));
}

// ============================================================================
// FACTORY — v25++ IMMORTAL
// ============================================================================

export function PulsePresenceOracle() {
  function evaluate({ pulseTouch, history = [], analytics = {}, predictor = {}, organismMap = null }) {
    const presence = pulseTouch?.presence || "unknown";

    // 1) Intensity
    const presenceIntensity = deriveIntensity(presence);

    // 2) Stability
    const stability = computeStability(history);

    // 3) Volatility
    const volatility = computeVolatility(history);

    // 4) Trend
    const trend = computeTrend(history);

    // 5) Confidence
    const confidence = computeConfidence(presenceIntensity, stability, volatility);

    // 6) Oracle Hints (IMMORTAL++)
    const oracleHints = {
      warmupBias:
        presenceIntensity === "high" ? "full" :
        presenceIntensity === "medium" ? "safe" : "minimal",

      animationBias:
        stability === "unstable" ? "reduced" : "smooth",

      hydrationBias:
        volatility === "high" ? "minimal" :
        presenceIntensity === "high" ? "full" : "safe",

      chunkBias:
        presenceIntensity === "high" ? "aggressive" :
        stability === "unstable" ? "safe" : "safe",

      routingBias:
        trend === "rising" ? "forward" :
        trend === "falling" ? "conservative" : "neutral",

      // Signals + Genome (if present)
      signalMode: analytics?.metrics?.signals?.pulse ? "active" : "idle",
      genomeMode: analytics?.metrics?.genome?.mode || "default",

      // Predictor influence
      predictedNextPage: predictor?.prediction?.nextPage || null
    };

    return {
      presenceIntensity,
      stability,
      volatility,
      trend,
      confidence,
      oracleHints
    };
  }

  return {
    meta: ORGAN_META_PulsePresenceOracle,
    contract: ORGAN_CONTRACT_PulsePresenceOracle,
    overlays: IMMORTAL_OVERLAYS_PulsePresenceOracle,
    evaluate
  };
}
