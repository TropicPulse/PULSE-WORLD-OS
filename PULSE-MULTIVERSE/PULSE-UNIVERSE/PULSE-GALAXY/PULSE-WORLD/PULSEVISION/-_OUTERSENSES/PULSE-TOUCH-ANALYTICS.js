// ============================================================================
//  PULSE OS — OUTER SENSE ORGAN
//  FILE: _OUTERSENSES/PULSE-TOUCH-ANALYTICS-v27-IMMORTAL-BINARY++.js
//  ORGAN: PulseTouchAnalytics (v27++ IMMORTAL BINARY-AWARE)
//  ROLE: Metrics / Advantage Hints / Pulse Analysis / Module + Binary Health
//        + Warmup Module Risk Integration
// ============================================================================

export const AI_EXPERIENCE_META_PulseTouchAnalytics = {
  id: "pulsetouch.analytics",
  kind: "outer_sense",
  version: "v27++-IMMORTAL-BINARY",
  role: "pulse_analytics",
  surfaces: {
    band: [
      "analytics",
      "metrics",
      "advantage",
      "signal",
      "presence",
      "genome",
      "module",
      "binary",
      "risk"
    ],
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
    chunkAware: true,

    // v27++
    moduleAware: true,
    pulseImportAware: true,
    pulseExportAware: true,
    subimportAware: true,
    tierAware: true,
    moduleRiskAware: true,

    // v27++ BINARY
    binaryAware: true,
    binaryDeltaAware: true
  }
};

export const ORGAN_CONTRACT_PulseTouchAnalytics = {
  inputs: {
    pulseTouch: "Pulse‑Touch skinState",
    security: "Optional security evaluation result",
    warmup: "Optional warmup state",
    portal: "Optional Portal warmup state",
    chunks: "Optional PulseChunks state",
    predictor: "Optional Predictor output (modulePrediction, binaryPrediction)",
    binary: "Optional PulseBinary state or binary-delta summary"
  },
  outputs: {
    metrics: "Aggregated numeric + symbolic metrics (module + binary aware)",
    advantageHints: "Hints for Advantage Cortex / Gate / Warmup / Predictor / Binary"
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
// HELPERS — core + v27++ module/binary integration
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
    if (window.PulseGenome?.snapshot) return window.PulseGenome.snapshot();
  } catch {}
  return {};
}

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
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "reduced"
      : "smooth";
  } catch {
    return "smooth";
  }
}

function getHydrationTier() {
  try {
    return navigator.connection?.saveData ? "minimal" : "full";
  } catch {
    return "safe";
  }
}

// Binary helper: normalize a symbolic binary health snapshot
function getBinaryMetrics(binary, predictor) {
  const p = predictor?.binaryPrediction || {};
  const b = binary || {};

  const riskBand = b.riskBand || p.riskBand || "low";

  return {
    lane: b.lane || p.lane || "default",
    mode: b.mode || p.mode || "normal",
    sizeHint: b.sizeHint ?? p.sizeHint ?? null,
    churnHint: b.churnHint ?? p.churnHint ?? null,
    hasDelta: b.hasDelta ?? p.hasDelta ?? null,
    deltaAddedBits: b.deltaAddedBits ?? p.deltaAddedBits ?? 0,
    deltaRemovedBits: b.deltaRemovedBits ?? p.deltaRemovedBits ?? 0,
    riskBand
  };
}

// Module helper: merge Predictor + Warmup + skinState risk
function getModuleMetrics(pulseTouch, warmup, predictor) {
  const fromPredictor = predictor?.modulePrediction || null;
  const fromWarmup = warmup?.advantageWarmup?.moduleWarmupRisk || null;
  const fromSkin = pulseTouch?.pulseModuleRisk || null;

  const base = fromPredictor || fromWarmup || fromSkin || null;

  if (!base) {
    return {
      stabilityScore: 1.0,
      hasMissingSubimports: false,
      hasWrongTierExports: false,
      hasGlobalExposureRisk: false,
      hasChunkProfileAnomaly: false,
      source: "none"
    };
  }

  const stabilityScore =
    typeof base.stabilityScore === "number"
      ? Math.max(0, Math.min(1, base.stabilityScore))
      : typeof base.score === "number"
      ? Math.max(0, Math.min(1, base.score / 30)) // warmup’s 0–30 → 0–1
      : 1.0;

  return {
    stabilityScore,
    hasMissingSubimports: !!base.hasMissingSubimports,
    hasWrongTierExports: !!base.hasWrongTierExports,
    hasGlobalExposureRisk: !!base.hasGlobalExposureRisk,
    hasChunkProfileAnomaly: !!base.hasChunkProfileAnomaly,
    source:
      base.source ||
      (fromPredictor ? "predictor" : fromWarmup ? "warmup" : "skinState")
  };
}

// ============================================================================
//  MAIN ORGAN — v27++ IMMORTAL BINARY-AWARE
// ============================================================================

export function PulseTouchAnalytics() {
  function analyze(
    pulseTouch,
    security = null,
    warmup = null,
    portal = null,
    chunks = null,
    predictor = null,
    binary = null
  ) {
    // -----------------------------------------------------------------------
    // 1. BASE METRICS (Touch state)
    // -----------------------------------------------------------------------
    const moduleMetrics = getModuleMetrics(pulseTouch, warmup, predictor);
    const binaryMetrics = getBinaryMetrics(binary, predictor);

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
      genome: getGenomeHints(),

      // MODULE HEALTH (merged)
      module: moduleMetrics,

      // BINARY HEALTH
      binary: binaryMetrics
    };

    // -----------------------------------------------------------------------
    // 2. ADVANTAGE HINTS (IMMORTAL++ deterministic, module + binary aware)
    // -----------------------------------------------------------------------
    const advantageHints = {
      // Hydration bias
      hydrationBias:
        metrics.trustLevel === "hostile"
          ? "minimal"
          : metrics.trustLevel === "suspicious"
          ? "safe"
          : metrics.hydrationTier === "minimal"
          ? "minimal"
          : "full",

      // Animation bias
      animationBias:
        metrics.trustLevel === "hostile"
          ? "none"
          : metrics.trustLevel === "suspicious"
          ? "reduced"
          : metrics.animationTier === "reduced"
          ? "reduced"
          : "smooth",

      // Chunk bias
      chunkBias:
        metrics.mode === "fast"
          ? "aggressive"
          : metrics.fastLane === "enabled"
          ? "aggressive"
          : metrics.chunkDegraded
          ? "safe"
          : "safe",

      // Presence intensity → advantage
      presenceIntensity:
        metrics.presence === "high"
          ? "boost"
          : metrics.presence === "low"
          ? "conserve"
          : "neutral",

      // Region → advantage
      regionCluster:
        metrics.region === "us"
          ? "clusterA"
          : metrics.region === "eu"
          ? "clusterB"
          : "clusterUnknown",

      // Genome → advantage
      genomeMode: metrics.genome?.mode ?? "default",

      // Signals → advantage
      signalMode: metrics.signals?.pulse ? "active" : "idle",

      // MODULE HEALTH ADVANTAGE HINTS (v27++)
      moduleBias:
        metrics.module.stabilityScore == null
          ? "unknown"
          : metrics.module.stabilityScore >= 0.9
          ? "stable"
          : metrics.module.stabilityScore >= 0.7
          ? "mostly_stable"
          : metrics.module.stabilityScore >= 0.4
          ? "unstable"
          : "critical",

      subimportBias:
        metrics.module.hasMissingSubimports ? "missing" : "ok",

      exportTierBias:
        metrics.module.hasWrongTierExports ? "unsafe" : "safe",

      // BINARY HEALTH ADVANTAGE HINTS (v27++ BINARY-AWARE)
      binaryBias:
        metrics.binary.riskBand === "high"
          ? "conserve"
          : metrics.binary.riskBand === "medium"
          ? "balanced"
          : "aggressive",

      binaryPrewarmBias:
        metrics.binary.hasDelta ? "prewarm_delta" : "none"
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
