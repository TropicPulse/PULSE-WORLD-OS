// ============================================================================
//  PULSE OS — OUTER SENSE ORGAN
//  FILE: _OUTERSENSES/PULSE-TOUCH-ANALYTICS-v25++.js
//  ORGAN: PulseTouchAnalytics (v25++ IMMORTAL)
//  ROLE: Metrics / Advantage Hints / Pulse Analysis / Signal Awareness
// ============================================================================

export const AI_EXPERIENCE_META_PulseTouchAnalytics = {
  id: "pulsetouch.analytics",
  kind: "outer_sense",
  version: "v25++-IMMORTAL",
  role: "pulse_analytics",
  surfaces: {
    band: ["analytics", "metrics", "advantage", "signal", "presence", "genome"],
    wave: ["cold", "numerical", "deterministic"],
    presence: ["analytics_state"],
    speed: "sync"
  }
};

export const ORGAN_META_PulseTouchAnalytics = {
  id: "organ.pulsetouch.analytics",
  organism: "PulseTouch",
  layer: "outer_sense.analytics",
  tier: "IMMORTAL",
  evoFlags: {
    deterministic: true,
    driftProof: true,
    asyncSafe: true,
    zeroPII: true,
    zeroTracking: true,
    advantageAware: true,
    regionAware: true,
    presenceAware: true,
    modeAware: true,
    signalAware: true,
    genomeAware: true,
    warmupAware: true,
    chunkAware: true
  }
};

export const ORGAN_CONTRACT_PulseTouchAnalytics = {
  inputs: {
    pulseTouch: "Pulse‑Touch skinState",
    security: "Optional security evaluation result",
    warmup: "Optional warmup state",
    portal: "Optional Portal warmup state",
    chunks: "Optional PulseChunks state"
  },
  outputs: {
    metrics: "Aggregated numeric + symbolic metrics",
    advantageHints: "Hints for Advantage Cortex / Gate / Warmup / Predictor"
  },
  guarantees: {
    deterministic: true,
    noNetwork: true,
    noSideEffects: true
  }
};

export const IMMORTAL_OVERLAYS_PulseTouchAnalytics = {
  drift: { allowed: false },
  pressure: { expectedLoad: "medium" },
  stability: { semantics: "stable" },
  load: { maxComponents: 1 }
};

// ============================================================================
//  SIGNAL + GENOME HELPERS — v25++
// ============================================================================

function getSignalHints() {
  try {
    return {
      pulse: localStorage.getItem("PulseSignal_v27") || null,
      proof: localStorage.getItem("PulseProofSignal_v27") || null,
      port: localStorage.getItem("PulseSignalPort_v27") || null
    };
  } catch {
    return {};
  }
}

function getGenomeHints() {
  try {
    if (global.PulseGenome && typeof global.PulseGenome.snapshot === "function") {
      return global.PulseGenome.snapshot();
    }
  } catch {}
  return {};
}

// ============================================================================
//  DEVICE + PERFORMANCE HELPERS — v25++
// ============================================================================

function getDeviceMetrics() {
  try {
    return {
      memory: navigator.deviceMemory || null,
      cores: navigator.hardwareConcurrency || null,
      perfNow: performance.now(),
      perfTiming: performance.timeOrigin || null
    };
  } catch {
    return {};
  }
}

function getAnimationTier() {
  try {
    const prefersReduced = global.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return prefersReduced ? "reduced" : "smooth";
  } catch {
    return "smooth";
  }
}

function getHydrationTier() {
  try {
    const saveData = navigator.connection?.saveData;
    return saveData ? "minimal" : "full";
  } catch {
    return "safe";
  }
}

// ============================================================================
//  MAIN ORGAN — v25++ IMMORTAL
// ============================================================================

export function PulseTouchAnalytics() {
  function analyze(pulseTouch, security = null, warmup = null, portal = null, chunks = null) {
    // -----------------------------------------------------------------------
    // 1. BASE METRICS (Touch state)
    // -----------------------------------------------------------------------
    const metrics = {
      region: pulseTouch?.region || "unknown",
      presence: pulseTouch?.presence || "unknown",
      mode: pulseTouch?.mode || "safe",
      pulseStream: pulseTouch?.pulseStream || "single",
      fastLane: pulseTouch?.fastLane || "disabled",
      warmed: warmup?.warmed ?? null,
      portalWarm: portal?.warmed ?? null,
      chunkDegraded: chunks?.isDegraded?.() ?? null,

      // Security
      riskScore: security?.riskScore ?? null,
      trustLevel: security?.trustLevel ?? null,

      // Device + performance
      device: getDeviceMetrics(),
      animationTier: getAnimationTier(),
      hydrationTier: getHydrationTier(),

      // Signals
      signals: getSignalHints(),

      // Genome
      genome: getGenomeHints()
    };

    // -----------------------------------------------------------------------
    // 2. ADVANTAGE HINTS (IMMORTAL++ deterministic)
    // -----------------------------------------------------------------------
    const advantageHints = {
      // Hydration bias
      hydrationBias:
        metrics.trustLevel === "hostile" ? "minimal" :
        metrics.trustLevel === "suspicious" ? "safe" :
        metrics.hydrationTier === "minimal" ? "minimal" :
        "full",

      // Animation bias
      animationBias:
        metrics.trustLevel === "hostile" ? "none" :
        metrics.trustLevel === "suspicious" ? "reduced" :
        metrics.animationTier === "reduced" ? "reduced" :
        "smooth",

      // Chunk bias
      chunkBias:
        metrics.mode === "fast" ? "aggressive" :
        metrics.fastLane === "enabled" ? "aggressive" :
        metrics.chunkDegraded ? "safe" :
        "safe",

      // Presence intensity → advantage
      presenceIntensity:
        metrics.presence === "high" ? "boost" :
        metrics.presence === "low" ? "conserve" :
        "neutral",

      // Region → advantage
      regionCluster:
        metrics.region === "us" ? "clusterA" :
        metrics.region === "eu" ? "clusterB" :
        "clusterUnknown",

      // Genome → advantage
      genomeMode:
        metrics.genome?.mode ?? "default",

      // Signals → advantage
      signalMode:
        metrics.signals?.pulse ? "active" : "idle"
    };

    return { metrics, advantageHints };
  }

  return {
    meta: ORGAN_META_PulseTouchAnalytics,
    contract: ORGAN_CONTRACT_PulseTouchAnalytics,
    overlays: IMMORTAL_OVERLAYS_PulseTouchAnalytics,
    analyze
  };
}
