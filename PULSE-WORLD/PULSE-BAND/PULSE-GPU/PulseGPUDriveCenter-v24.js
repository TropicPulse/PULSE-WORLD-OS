// ============================================================================
//  PULSE GPU PERFORMANCE ADVISOR v24-IMMORTAL++ — THE DRIVE CENTER
//  Internal Performance Instinct • Deterministic, Pure Logic, Drift‑Proof
//  Binary-aware • Symbolic-aware • Dispatch-aware • Memory-aware • CI-aware
//  Earn-aware • Game-aware • GPU-Advantage-aware
// ============================================================================
import {
  OrganismIdentity,
  buildPulseOrganismMap as PulseOrganismMap
} from "./PULSE-WORLD-MAP.js";
const Identity = OrganismIdentity(import.meta.url);

export const pulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
// export const PULSE_EARN_IMMUNE_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

import {
  SCORE_CONSTANTS,
  SEVERITY_THRESHOLDS
} from "./PulseGPUCommandments-v24.js";
import { PulseGPUGeneticMemory } from "./PulseGPUGeneticMemory-v24.js";
import { PulseGPUSurvivalInstincts } from "./PulseGPUSurvivalInstincts-v24.js";
import { PulseGPUEngine } from "./PulseGPUAstralMuscleSystem-v24.js";
import { computePulseGPUEarnProfile } from "./PulseGPUEarnProfile-v24.js";

// ============================================================================
// DELTA CLASSIFICATION — DRIVE PRESSURE LOGIC (v24-IMMORTAL++)
// ============================================================================
function classifyDelta(deltaPercent, gpuContext = null, computerIntelligence = null) {
  if (typeof deltaPercent !== "number" || Number.isNaN(deltaPercent)) {
    return "low";
  }

  let absDelta = Math.abs(deltaPercent);

  const binarySensitive =
    gpuContext &&
    typeof gpuContext === "object" &&
    gpuContext.binaryModeObserved === true;

  if (binarySensitive && deltaPercent < 0) {
    const extra = SEVERITY_THRESHOLDS.BINARY_REGRESSION_EXTRA_SENSITIVITY || 0;
    absDelta += extra;
  }

  // v24: CI-aware modulation (conceptual, deterministic)
  if (computerIntelligence && typeof computerIntelligence === "object") {
    const ciPressure = computerIntelligence.performancePressure || 0;
    const ciClamp = Math.max(-10, Math.min(10, ciPressure));
    absDelta += ciClamp;
  }

  if (absDelta < SEVERITY_THRESHOLDS.LOW) return "low";
  if (absDelta < SEVERITY_THRESHOLDS.MEDIUM) return "medium";
  if (absDelta < SEVERITY_THRESHOLDS.HIGH) return "high";
  return "critical";
}

// Primary INTEL hash — deterministic, structure-aware, no IO, no time.
function computeHashIntelligence(payload) {
  const base = JSON.stringify(payload || "");
  let h = 0;
  for (let i = 0; i < base.length; i++) {
    const c = base.charCodeAt(i);
    h = (h * 131 + c * (i + 7)) % 1000000007;
  }
  return `HINTEL_${h}`;
}

function isImprovement(deltaPercent) {
  return typeof deltaPercent === "number" && deltaPercent > 0;
}

function isRegression(deltaPercent) {
  return typeof deltaPercent === "number" && deltaPercent < 0;
}

// ============================================================================
// ADVICE BUILDER — Structured Drive Signals (v24-IMMORTAL++)
// ============================================================================
function buildAdvice({
  type,
  severity,
  message,
  deltaPercent,
  currentScore,
  baselineScore,
  gameProfile,
  hardwareProfile,
  tierProfile,
  settings,
  baselineSettings,
  extra,
  gpuContext,
  computerIntelligence,
  cognitiveFrame,
  earnProfile
}) {
  const advice = {
    type,
    severity,
    message,
    meta: {
      layer: "PulseGPUPerformanceAdvisor",
      role: "DRIVE_CENTER",
      version: "24.0-Immortal++",
      target: "full-gpu",
      selfRepairable: true,
      evo: {
        advantageCascadeAware: true,
        pulseEfficiencyAware: true,
        driftProof: true,
        multiInstanceReady: true,
        unifiedAdvantageField: true,
        pulseSend24Ready: true,

        // v24 Immortal awareness
        binaryAware: true,
        symbolicAware: true,
        dualBandAware: true,
        gpuDispatchAware: true,
        gpuMemoryAware: true,
        gpuAdvantageAware: true,
        presenceAware: true,
        dnaAware: true,
        versionAware: true,
        instanceAware: true,

        // Cognitive / CI awareness (metadata only)
        cognitiveFrameAware: true,
        computerIntelligenceAware: true,

        // Earn / game awareness
        earnAware: true,
        gameAware: true,

        routingContract: "PulseSend-v24",
        gpuOrganContract: "PulseGPU-v24-Immortal++",
        binaryGpuOrganContract: "PulseBinaryGPU-v24-Immortal++",
        earnCompatibility: "Earn-v24-GPU"
      }
    }
  };

  if (typeof deltaPercent === "number") advice.deltaPercent = deltaPercent;
  if (typeof currentScore === "number") advice.currentScore = currentScore;
  if (typeof baselineScore === "number") advice.baselineScore = baselineScore;
  if (gameProfile) advice.gameProfile = gameProfile;
  if (hardwareProfile) advice.hardwareProfile = hardwareProfile;
  if (tierProfile) advice.tierProfile = tierProfile;
  if (settings) advice.settings = settings;
  if (baselineSettings) advice.baselineSettings = baselineSettings;
  if (extra && typeof extra === "object") advice.extra = extra;

  if (gpuContext && typeof gpuContext === "object") {
    advice.gpuContext = { ...gpuContext };

    if (gpuContext.gpuPattern) {
      advice.gpuPattern = gpuContext.gpuPattern;
    }
    if (gpuContext.gpuShapeSignature) {
      advice.gpuShapeSignature = gpuContext.gpuShapeSignature;
    }
    if (typeof gpuContext.binaryModeObserved === "boolean") {
      advice.binaryModeObserved = gpuContext.binaryModeObserved;
    }
    if (typeof gpuContext.symbolicModeObserved === "boolean") {
      advice.symbolicModeObserved = gpuContext.symbolicModeObserved;
    }
    if (gpuContext.gpuDispatchHints) {
      advice.gpuDispatchHints = gpuContext.gpuDispatchHints;
    }
  }

  // v24: CI + CognitiveFrame surfaces (metadata-only, fail-open)
  if (computerIntelligence && typeof computerIntelligence === "object") {
    advice.computerIntelligence = computerIntelligence;
  }
  if (cognitiveFrame && typeof cognitiveFrame === "object") {
    advice.cognitiveFrame = cognitiveFrame;
  }

  // v24: Earn profile surface (how much GPU Earn is allowed to use)
  if (earnProfile && typeof earnProfile === "object") {
    advice.earnProfile = earnProfile;
  }

  return advice;
}

// ============================================================================
// ADVICE VALIDATION — For Immune Layer (v24-IMMORTAL++)
// ============================================================================
function validateAdvice(advice) {
  if (!advice || typeof advice !== "object") return false;
  if (typeof advice.type !== "string") return false;
  if (typeof advice.severity !== "string") return false;
  if (!advice.meta || advice.meta.layer !== "PulseGPUPerformanceAdvisor") {
    return false;
  }
  return true;
}

// ============================================================================
// SCORING + REGRESSION DETECTION HELPERS (v24-IMMORTAL++)
// ============================================================================
function scoreSession(metrics = {}) {
  if (!metrics || typeof metrics !== "object") return 0;

  const avg = metrics.avgFps || 0;
  const min = metrics.minFps || 0;
  const stutters = metrics.stutters || 0;
  const crashes = metrics.crashes || 0;

  let score =
    avg * SCORE_CONSTANTS.AVG_FPS_WEIGHT +
    min * SCORE_CONSTANTS.MIN_FPS_WEIGHT -
    stutters * SCORE_CONSTANTS.STUTTER_WEIGHT;

  if (crashes > 0) {
    score = score * (1 - SCORE_CONSTANTS.CRASH_PENALTY);
  }

  return Math.max(0, score);
}

function detectRegression(currentMetrics = {}, baselineMetrics = {}) {
  const currentScore = scoreSession(currentMetrics);
  const baselineScore = scoreSession(baselineMetrics);

  if (baselineScore === 0) return 0;

  return ((currentScore - baselineScore) / baselineScore) * 100;
}

// ============================================================================
//  PULSE GPU PERFORMANCE ADVISOR — THE DRIVE CENTER (v24-IMMORTAL++)
// ============================================================================
class PulseGPUPerformanceAdvisor {
  constructor(settingsMemory) {
    this.memory = settingsMemory || new PulseGPUGeneticMemory();
  }

  static meta = {
    layer: "PulseGPUPerformanceAdvisor",
    role: "DRIVE_CENTER",
    version: "24.0-Immortal++",
    target: "full-gpu",
    selfRepairable: true,
    evo: {
      advantageCascadeAware: true,
      pulseEfficiencyAware: true,
      driftProof: true,
      multiInstanceReady: true,
      unifiedAdvantageField: true,
      pulseSend24Ready: true,

      // v24 Immortal awareness
      binaryAware: true,
      symbolicAware: true,
      dualBandAware: true,
      gpuDispatchAware: true,
      gpuMemoryAware: true,
      gpuAdvantageAware: true,
      presenceAware: true,
      dnaAware: true,
      versionAware: true,
      instanceAware: true,

      // Cognitive / CI awareness (metadata only)
      cognitiveFrameAware: true,
      computerIntelligenceAware: true,

      // Earn / game awareness
      earnAware: true,
      gameAware: true,

      routingContract: "PulseSend-v24",
      gpuOrganContract: "PulseGPU-v24-Immortal++",
      binaryGpuOrganContract: "PulseBinaryGPU-v24-Immortal++",
      earnCompatibility: "Earn-v24-GPU"
    }
  };

  // ----------------------------------------------------
  // CURRENT SESSION ANALYSIS (v24-IMMORTAL++)
  // ----------------------------------------------------
  analyzeCurrentSession({
    gameProfile,
    hardwareProfile,
    tierProfile,
    settings,
    metrics,
    gpuContext,       // GPU context (binary/symbolic/dispatch)
    cognitiveFrame,   // optional cognitive frame (metadata-only)
    dispatchHints,    // optional dispatch hints (for CI)
    gpuMemorySnapshot,// optional memory snapshot (for CI)
    presence,         // "active" | "idle" | "background"
    gameActive        // boolean: is a game / heavy workload present
  }) {
    const currentScore = scoreSession(metrics);

    const baselineEntry = this.memory.getBestSettingsFor(
      gameProfile,
      hardwareProfile,
      tierProfile
    );

    if (!baselineEntry) {
      return {
        currentScore,
        baselineScore: null,
        deltaPercent: null,
        advice: []
      };
    }

    const baselineScore = baselineEntry.bestScore;
    const deltaPercent = detectRegression(metrics, baselineEntry.bestMetrics);

    // v24: compute ComputerIntelligence snapshot (fail-open)
    let computerIntelligence = null;
    try {
      computerIntelligence = computeHashIntelligence({
        dispatchHints: dispatchHints || gpuContext?.gpuDispatchHints || null,
        gpuMemorySnapshot: gpuMemorySnapshot || null,
        currentMetrics: metrics || null,
        baselineMetrics: baselineEntry.bestMetrics || null,
        gameProfile,
        hardwareProfile,
        tierProfile
      });
    } catch {
      computerIntelligence = null;
    }

    // v24: compute Earn profile for this session (game-aware, presence-aware)
    let earnProfile = null;
    try {
      earnProfile = computePulseGPUEarnProfile({
        gameActive: !!gameActive,
        gpuContext,
        performanceHint: {
          headroomPercent: metrics?.headroomPercent ?? 0,
          regressionRisk: deltaPercent ?? 0,
          pressure: metrics?.pressure ?? 0
        },
        presence: presence || "active"
      });
    } catch {
      earnProfile = null;
    }

    const advice = [];

    // NEGATIVE PRESSURE — REGRESSION
    if (isRegression(deltaPercent)) {
      const severity = classifyDelta(deltaPercent, gpuContext, computerIntelligence);

      advice.push(
        buildAdvice({
          type: "regression",
          severity,
          message:
            severity === "critical"
              ? "Performance has fallen far below your historical best."
              : "Performance is below your historical best.",
          deltaPercent,
          currentScore,
          baselineScore,
          gameProfile,
          hardwareProfile,
          tierProfile,
          settings,
          baselineSettings: baselineEntry.settings,
          extra: {
            baselineMetrics: baselineEntry.bestMetrics,
            repairHint: "restore-baseline-settings"
          },
          gpuContext,
          computerIntelligence,
          cognitiveFrame,
          earnProfile
        })
      );
    }

    // POSITIVE PRESSURE — IMPROVEMENT
    else if (isImprovement(deltaPercent)) {
      const severity = classifyDelta(deltaPercent, gpuContext, computerIntelligence);

      advice.push(
        buildAdvice({
          type: "improvement",
          severity,
          message:
            severity === "critical"
              ? "Performance exceeds your historical best by a wide margin."
              : "Performance is above your historical best.",
          deltaPercent,
          currentScore,
          baselineScore,
          gameProfile,
          hardwareProfile,
          tierProfile,
          settings,
          baselineSettings: baselineEntry.settings,
          extra: {
            baselineMetrics: baselineEntry.bestMetrics,
            repairHint: "promote-current-to-baseline"
          },
          gpuContext,
          computerIntelligence,
          cognitiveFrame,
          earnProfile
        })
      );
    }

    return {
      currentScore,
      baselineScore,
      deltaPercent,
      advice
    };
  }

  // ----------------------------------------------------
  // SAFE ANALYSIS — IMMUNE LAYER ENTRYPOINT (v24-IMMORTAL++)
  // ----------------------------------------------------
  safeAnalyzeCurrentSession(
    input,
    gpuContext = null,
    cognitiveFrame = null,
    dispatchHints = null,
    gpuMemorySnapshot = null
  ) {
    try {
      const result = this.analyzeCurrentSession({
        ...(input || {}),
        gpuContext,
        cognitiveFrame,
        dispatchHints,
        gpuMemorySnapshot
      });

      if (!result || typeof result !== "object" || !Array.isArray(result.advice)) {
        return {
          currentScore: 0,
          baselineScore: null,
          deltaPercent: null,
          advice: []
        };
      }

      const safeAdvice = result.advice.filter((a) => validateAdvice(a));
      return {
        currentScore:
          typeof result.currentScore === "number" ? result.currentScore : 0,
        baselineScore:
          typeof result.baselineScore === "number"
            ? result.baselineScore
            : null,
        deltaPercent:
          typeof result.deltaPercent === "number"
            ? result.deltaPercent
            : null,
        advice: safeAdvice
      };
    } catch {
      return {
        currentScore: 0,
        baselineScore: null,
        deltaPercent: null,
        advice: []
      };
    }
  }

  // ----------------------------------------------------
  // SUBOPTIMAL SETTINGS ANALYSIS (v24-IMMORTAL++)
  // ----------------------------------------------------
  analyzeSuboptimalSettings({
    gameProfile,
    hardwareProfile,
    tierProfile,
    currentSettings,
    currentMetrics,
    gpuContext,
    cognitiveFrame,
    dispatchHints,
    gpuMemorySnapshot,
    presence,
    gameActive
  }) {
    const baselineEntry = this.memory.getBestSettingsFor(
      gameProfile,
      hardwareProfile,
      tierProfile
    );

    if (!baselineEntry) return [];

    const currentScore = scoreSession(currentMetrics);
    const baselineScore = baselineEntry.bestScore;

    if (baselineScore <= currentScore) return [];

    const deltaPercent =
      baselineScore === 0
        ? 0
        : ((baselineScore - currentScore) / baselineScore) * 100;

    let computerIntelligence = null;
    try {
      computerIntelligence = computeHashIntelligence({
        dispatchHints: dispatchHints || gpuContext?.gpuDispatchHints || null,
        gpuMemorySnapshot: gpuMemorySnapshot || null,
        currentMetrics: currentMetrics || null,
        baselineMetrics: baselineEntry.bestMetrics || null,
        gameProfile,
        hardwareProfile,
        tierProfile
      });
    } catch {
      computerIntelligence = null;
    }

    let earnProfile = null;
    try {
      earnProfile = computePulseGPUEarnProfile({
        gameActive: !!gameActive,
        gpuContext,
        performanceHint: {
          headroomPercent: currentMetrics?.headroomPercent ?? 0,
          regressionRisk: deltaPercent ?? 0,
          pressure: currentMetrics?.pressure ?? 0
        },
        presence: presence || "active"
      });
    } catch {
      earnProfile = null;
    }

    const severity = classifyDelta(deltaPercent, gpuContext, computerIntelligence);

    return [
      buildAdvice({
        type: "suboptimal",
        severity,
        message:
          "Your current settings underperform your historical best for this game and hardware.",
        deltaPercent,
        currentScore,
        baselineScore,
        gameProfile,
        hardwareProfile,
        tierProfile,
        settings: currentSettings,
        baselineSettings: baselineEntry.settings,
        extra: {
          baselineMetrics: baselineEntry.bestMetrics,
          repairHint: "suggest-baseline-settings"
        },
        gpuContext,
        computerIntelligence,
        cognitiveFrame,
        earnProfile
      })
    ];
  }

  // ----------------------------------------------------
  // TIER UPGRADE ANALYSIS (v24-IMMORTAL++)
  // ----------------------------------------------------
  analyzeTierUpgrade({
    gameProfile,
    hardwareProfile,
    oldTierProfile,
    newTierProfile,
    currentSettings,
    currentMetrics,
    gpuContext,
    cognitiveFrame,
    dispatchHints,
    gpuMemorySnapshot,
    presence,
    gameActive
  }) {
    const currentScore = scoreSession(currentMetrics);

    const newTierBaseline = this.memory.getBestSettingsFor(
      gameProfile,
      hardwareProfile,
      newTierProfile
    );

    if (!newTierBaseline) return [];

    const newTierScore = newTierBaseline.bestScore;

    if (newTierScore <= currentScore) return [];

    const deltaPercent =
      currentScore === 0
        ? 0
        : ((newTierScore - currentScore) / currentScore) * 100;

    let computerIntelligence = null;
    try {
      computerIntelligence = computeHashIntelligence({
        dispatchHints: dispatchHints || gpuContext?.gpuDispatchHints || null,
        gpuMemorySnapshot: gpuMemorySnapshot || null,
        currentMetrics: currentMetrics || null,
        baselineMetrics: newTierBaseline.bestMetrics || null,
        gameProfile,
        hardwareProfile,
        tierProfile: newTierProfile
      });
    } catch {
      computerIntelligence = null;
    }

    let earnProfile = null;
    try {
      earnProfile = computePulseGPUEarnProfile({
        gameActive: !!gameActive,
        gpuContext,
        performanceHint: {
          headroomPercent: currentMetrics?.headroomPercent ?? 0,
          regressionRisk: deltaPercent ?? 0,
          pressure: currentMetrics?.pressure ?? 0
        },
        presence: presence || "active"
      });
    } catch {
      earnProfile = null;
    }

    const severity = classifyDelta(deltaPercent, gpuContext, computerIntelligence);

    return [
      buildAdvice({
        type: "tier-upgrade-opportunity",
        severity,
        message:
          "A higher tier configuration has historically delivered better performance.",
        deltaPercent,
        currentScore,
        baselineScore: newTierScore,
        gameProfile,
        hardwareProfile,
        tierProfile: newTierProfile,
        settings: currentSettings,
        baselineSettings: newTierBaseline.settings,
        extra: {
          oldTierProfile,
          newTierProfile,
          newTierMetrics: newTierBaseline.bestMetrics,
          repairHint: "upgrade-tier"
        },
        gpuContext,
        computerIntelligence,
        cognitiveFrame,
        earnProfile
      })
    ];
  }
}

// ============================================================================
// EXPORTS
// ============================================================================
export {
  PulseGPUPerformanceAdvisor,
  classifyDelta,
  buildAdvice,
  validateAdvice,
  scoreSession,
  detectRegression
};
