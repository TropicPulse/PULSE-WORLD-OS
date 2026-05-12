/* global log,warn */
// ============================================================================
//  PULSE GPU INSIGHTS ENGINE v24-Immortal++-MAX — THE WISDOM CORTEX
//  Deterministic, Pure Logic, Drift‑Proof Analytics Over Session Traces
//  COGNITIVE-FRAME AWARE • COMPUTER-INTELLIGENCE AWARE • EARN-v24-GPU AWARE
//  GENETIC-MEMORY-LINKED • NERVOUS-SYSTEM-LINKED • WARM-PATH-AWARE • HEALER-AWARE
// ============================================================================
import {
  OrganismIdentity,
  buildPulseOrganismMap as PulseOrganismMap,
  buildPulseOrganismMap as buildOrganismMap
} from "./PULSE-WORLD-MAP.js";
const Identity = OrganismIdentity(import.meta.url);

export const pulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
// export const PULSE_EARN_IMMUNE_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

import { INSIGHT_THRESHOLDS } from "./PulseGPUCommandments-v24.js";
import {
  CognitiveFrame,
  computeComputerIntelligence
} from "./PulseGPUCognitiveIntelligence-v24.js";

// Optional: read-only helpers from other organs (no side effects)
import { PulseGPUGeneticMemory } from "./PulseGPUGeneticMemory-v24.js";
import { PulseGPUWarmPathCache } from "./PulseGPUWarmPathCache-v24.js";

// ------------------------------------------------------
// Helpers
// ------------------------------------------------------

function clamp(value, min, max) {
  if (typeof value !== "number" || Number.isNaN(value)) return min;
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

function classifyDelta(deltaPercent) {
  if (typeof deltaPercent !== "number" || Number.isNaN(deltaPercent)) {
    return "low";
  }

  const absDelta = Math.abs(deltaPercent);
  const low = INSIGHT_THRESHOLDS?.MIN_STEP_DELTA_PERCENT ?? 5;
  const medium = INSIGHT_THRESHOLDS?.MEDIUM_STEP_DELTA_PERCENT ?? 20;
  const high = INSIGHT_THRESHOLDS?.HIGH_STEP_DELTA_PERCENT ?? 40;

  if (absDelta < low) return "low";
  if (absDelta < medium) return "medium";
  if (absDelta < high) return "high";
  return "critical";
}

function safePercentDelta(baseline, current) {
  const b = typeof baseline === "number" && baseline > 0 ? baseline : 0;
  const c = typeof current === "number" ? current : 0;
  if (b === 0) return 0;
  return ((b - c) / b) * 100;
}

function safeNumber(v, fallback = 0) {
  return typeof v === "number" && !Number.isNaN(v) ? v : fallback;
}

// ------------------------------------------------------
// CognitiveFrame builder for a single step change (v24++ MAX)
// ------------------------------------------------------

function buildCognitiveFrameForStepChange({
  stepId,
  deltaPercent,
  baselineAvgDurationMs,
  currentAvgDurationMs,
  gameProfile,
  hardwareProfile,
  tierProfile,
  pressureVector,
  geneticPattern,
  warmPathHints,
  dnaTag = "default-dna",
  instanceId = "",
  earnMode = false
}) {
  const performanceLabel =
    typeof deltaPercent === "number"
      ? deltaPercent > 0
        ? "faster"
        : "slower"
      : "unknown";

  const cognition = {
    gameProfile,
    hardwareProfile,
    tierProfile,
    stepId,
    deltaPercent,
    baselineAvgDurationMs,
    currentAvgDurationMs,
    pressureVector,
    geneticPattern,
    warmPathHints
  };

  const performance = {
    baselineScore: null,
    currentScore: null,
    deltaPercent,
    label: performanceLabel
  };

  const narrative = {
    summary:
      performanceLabel === "faster"
        ? `Step "${stepId}" appears faster than baseline.`
        : performanceLabel === "slower"
        ? `Step "${stepId}" appears slower than baseline.`
        : `Step "${stepId}" changed relative to baseline.`,
    details: {
      deltaPercent,
      baselineAvgDurationMs,
      currentAvgDurationMs,
      pressureVector,
      warmPathTier: warmPathHints?.cacheTier || "none"
    }
  };

  const frame = new CognitiveFrame({
    cognition,
    interpretation: {
      warmPathAlignment: warmPathHints?.cacheTier || "none",
      pressureBand: pressureVector
        ? classifyPressureBand(pressureVector)
        : "unknown"
    },
    narrative,
    tier: {
      currentTier: tierProfile?.tierId || null,
      tierHistory: tierProfile?.history || []
    },
    performance,
    dispatch: {},
    advantage: {
      regressionRisk:
        performanceLabel === "slower" ? classifyDelta(deltaPercent) : "low",
      improvementBand:
        performanceLabel === "faster" ? classifyDelta(deltaPercent) : "low",
      warmPathTier: warmPathHints?.cacheTier || "none"
    },
    presence: {
      context: "wisdom_step_delta",
      dnaTag,
      instanceId,
      intelligentCompute: earnMode ? "earn-aware" : null
    },
    shapeSignature: {},
    patternSignature: {},
    symbolic: {},
    binary: {},
    recommendedActions: [],
    dnaTag,
    instanceId,
    earnMode
  });

  return frame;
}

function classifyPressureBand(pressureVector) {
  if (!pressureVector) return "unknown";
  const gpu = safeNumber(pressureVector.gpu, 0);
  const thermal = safeNumber(pressureVector.thermal, 0);
  const memory = safeNumber(pressureVector.memory, 0);
  const maxP = Math.max(gpu, thermal, memory);
  if (maxP < 0.3) return "low";
  if (maxP < 0.6) return "medium";
  if (maxP < 0.85) return "high";
  return "critical";
}

// ------------------------------------------------------
// Insight builder (v24-Immortal++ MAX, CognitiveFrame-aware)
// ------------------------------------------------------

function buildInsight({
  type,
  severity,
  message,
  gameProfile,
  hardwareProfile,
  tierProfile,
  stepId,
  deltaPercent,
  baselineAvgDurationMs,
  currentAvgDurationMs,
  extra,
  cognitiveFrame,
  computerIntelligence
}) {
  const insight = {
    type,
    severity,
    message,

    meta: {
      layer: "PulseGPUInsightsEngine",
      role: "WISDOM_CORTEX",
      version: "24.0-Immortal++-MAX",
      target: "full-gpu+binary+spine",
      selfRepairable: true,

      evo: {
        advantageCascadeAware: true,
        pulseEfficiencyAware: true,
        driftProof: true,
        unifiedAdvantageField: true,

        gpuSpineReady: true,
        dualBandReady: true,
        chunkingReady: true,
        prewarmReady: true,
        warmPathAware: true,
        geneticMemoryAware: true,

        binaryAware: true,
        symbolicAware: true,
        gpuDispatchAware: true,
        gpuMemoryAware: true,
        gpuAdvantageAware: true,

        pulseSend24Ready: true,
        routingContract: "PulseSend-v24",
        gpuOrganContract: "PulseGPU-v24-Immortal++",
        binaryGpuOrganContract: "PulseBinaryGPU-v24-Immortal++",
        earnCompatibility: "Earn-v24-GPU"
      }
    }
  };

  if (gameProfile) insight.gameProfile = gameProfile;
  if (hardwareProfile) insight.hardwareProfile = hardwareProfile;
  if (tierProfile) insight.tierProfile = tierProfile;
  if (stepId) insight.stepId = stepId;
  if (typeof deltaPercent === "number") insight.deltaPercent = deltaPercent;
  if (typeof baselineAvgDurationMs === "number") {
    insight.baselineAvgDurationMs = baselineAvgDurationMs;
  }
  if (typeof currentAvgDurationMs === "number") {
    insight.currentAvgDurationMs = currentAvgDurationMs;
  }
  if (extra && typeof extra === "object") {
    insight.extra = extra;
  }

  if (cognitiveFrame) {
    insight.meta.cognitiveFrame = cognitiveFrame;
  }
  if (computerIntelligence) {
    insight.meta.computerIntelligence = computerIntelligence;
  }

  return insight;
}

// ------------------------------------------------------
// Trace grouping + averages
// ------------------------------------------------------

function groupStepsById(traces = []) {
  const groups = new Map();

  traces.forEach((trace) => {
    if (!trace || !Array.isArray(trace.steps)) return;

    trace.steps.forEach((step) => {
      if (!step) return;

      const stepId = step.stepId || "unknown-step";
      let group = groups.get(stepId);
      if (!group) {
        group = {
          durations: [],
          metaSamples: [],
          pressureSnapshots: []
        };
        groups.set(stepId, group);
      }

      const duration = clamp(step.durationMs || 0, 0, 60 * 60 * 1000);
      group.durations.push(duration);
      group.metaSamples.push({
        gameProfile: trace.gameProfile || {},
        hardwareProfile: trace.hardwareProfile || {},
        tierProfile: trace.tierProfile || {}
      });

      if (step.pressureSnapshot && typeof step.pressureSnapshot === "object") {
        group.pressureSnapshots.push(step.pressureSnapshot);
      }
    });
  });

  return groups;
}

function computeStepAverages(groups) {
  const result = new Map();

  for (const [stepId, group] of groups.entries()) {
    const durations = group.durations;
    if (!durations || durations.length === 0) continue;

    let sum = 0;
    durations.forEach((d) => (sum += d));

    const avg = sum / durations.length;

    let pressureVector = null;
    if (group.pressureSnapshots.length > 0) {
      const agg = { gpu: 0, thermal: 0, memory: 0, mesh: 0, aura: 0 };
      group.pressureSnapshots.forEach((p) => {
        agg.gpu += safeNumber(p.gpuLoadPressure, 0);
        agg.thermal += safeNumber(p.thermalPressure, 0);
        agg.memory += safeNumber(p.memoryPressure, 0);
        agg.mesh += safeNumber(p.meshStormPressure, 0);
        agg.aura += safeNumber(p.auraTension, 0);
      });
      const c = group.pressureSnapshots.length || 1;
      pressureVector = {
        gpu: agg.gpu / c,
        thermal: agg.thermal / c,
        memory: agg.memory / c,
        mesh: agg.mesh / c,
        aura: agg.aura / c
      };
    }

    result.set(stepId, {
      avgDurationMs: avg,
      sampleCount: durations.length,
      sampleMeta: group.metaSamples[0] || {
        gameProfile: {},
        hardwareProfile: {},
        tierProfile: {}
      },
      pressureVector
    });
  }

  return result;
}

// ------------------------------------------------------
// Wisdom Cortex Engine (v24-Immortal++ MAX)
// ------------------------------------------------------

class PulseGPUInsightsEngine {
  constructor({ geneticMemory, warmPathCache } = {}) {
    this.geneticMemory =
      geneticMemory instanceof PulseGPUGeneticMemory
        ? geneticMemory
        : new PulseGPUGeneticMemory();
    this.warmPathCache = warmPathCache || PulseGPUWarmPathCache;
  }

  // Core: step duration deltas + pressure + genetic pattern + warm-path hints
  analyzeStepDurations(
    baselineTraces = [],
    currentTraces = [],
    {
      dnaTag = "default-dna",
      instanceId = "",
      earnMode = false,
      page = "gpu-session",
      chunkProfile = "gpu"
    } = {}
  ) {
    const baselineGroups = groupStepsById(baselineTraces);
    const currentGroups = groupStepsById(currentTraces);
    const baselineAverages = computeStepAverages(baselineGroups);
    const currentAverages = computeStepAverages(currentGroups);
    const insights = [];

    for (const [stepId, baselineInfo] of baselineAverages.entries()) {
      const currentInfo = currentAverages.get(stepId);
      if (!currentInfo) continue;

      const baselineAvg = baselineInfo.avgDurationMs;
      const currentAvg = currentInfo.avgDurationMs;

      if (baselineAvg <= 0) continue;

      const deltaPercent = safePercentDelta(baselineAvg, currentAvg);

      const minDelta =
        INSIGHT_THRESHOLDS?.MIN_STEP_DELTA_PERCENT ?? 5;
      if (Math.abs(deltaPercent) < minDelta) continue;

      const severity = classifyDelta(deltaPercent);

      const { gameProfile, hardwareProfile, tierProfile } =
        currentInfo.sampleMeta || {};

      const message =
        deltaPercent > 0
          ? `Step "${stepId}" is faster than baseline.`
          : `Step "${stepId}" is slower than baseline.`;

      // Genetic pattern lookup (read-only)
      const geneticPattern =
        this.geneticMemory.getPatternForContext({
          gameProfile,
          hardwareProfile,
          tierProfile,
          executionContext: {
            binaryMode: "auto",
            sceneType: stepId,
            workloadClass: "gpu_step"
          }
        }) || null;

      // Warm path hints (read-only, deterministic)
      const warmPathHints = this.warmPathCache.compute({
        page,
        chunkProfile,
        gpuCapable: true,
        trust: "trusted",
        risk: "low",
        pulseStream: "continuous",
        fastLane: "enabled"
      });

      const pressureVector = currentInfo.pressureVector || null;

      const cognitiveFrame = buildCognitiveFrameForStepChange({
        stepId,
        deltaPercent,
        baselineAvgDurationMs: baselineAvg,
        currentAvgDurationMs: currentAvg,
        gameProfile,
        hardwareProfile,
        tierProfile,
        pressureVector,
        geneticPattern,
        warmPathHints,
        dnaTag,
        instanceId,
        earnMode
      });

      const computerIntelligence = computeComputerIntelligence(
        cognitiveFrame,
        { earnMode }
      );

      insights.push(
        buildInsight({
          type: "step-duration-change",
          severity,
          message,
          gameProfile,
          hardwareProfile,
          tierProfile,
          stepId,
          deltaPercent,
          baselineAvgDurationMs: baselineAvg,
          currentAvgDurationMs: currentAvg,
          extra: {
            baselineSampleCount: baselineInfo.sampleCount,
            currentSampleCount: currentInfo.sampleCount,
            pressureVector,
            warmPathTier: warmPathHints.cacheTier,
            geneticSampleCount:
              geneticPattern?.patternStats?.sampleCount || 0
          },
          cognitiveFrame,
          computerIntelligence
        })
      );
    }

    return insights;
  }

  analyzeStepDurationsForGameAndHardware({
    baselineTraces = [],
    currentTraces = [],
    gameId,
    gpuModel,
    dnaTag = "default-dna",
    instanceId = "",
    earnMode = false,
    page = "gpu-session",
    chunkProfile = "gpu"
  }) {
    const filteredBaseline = baselineTraces.filter((trace) => {
      if (!trace) return false;
      const gp = trace.gameProfile || {};
      const hp = trace.hardwareProfile || {};
      if (gameId && gp.gameId !== gameId) return false;
      if (gpuModel && hp.gpuModel !== gpuModel) return false;
      return true;
    });

    const filteredCurrent = currentTraces.filter((trace) => {
      if (!trace) return false;
      const gp = trace.gameProfile || {};
      const hp = trace.hardwareProfile || {};
      if (gameId && gp.gameId !== gameId) return false;
      if (gpuModel && hp.gpuModel !== gpuModel) return false;
      return true;
    });

    return this.analyzeStepDurations(filteredBaseline, filteredCurrent, {
      dnaTag,
      instanceId,
      earnMode,
      page,
      chunkProfile
    });
  }
}

// ------------------------------------------------------
// EXPORTS
// ------------------------------------------------------

export {
  PulseGPUInsightsEngine,
  buildInsight,
  classifyDelta,
  groupStepsById,
  computeStepAverages
};
