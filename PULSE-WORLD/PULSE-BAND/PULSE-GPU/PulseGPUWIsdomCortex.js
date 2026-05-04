/* global log,warn */
// ============================================================================
//  PULSE GPU INSIGHTS ENGINE v16-Immortal — THE WISDOM CORTEX
//  Deterministic, Pure Logic, Drift‑Proof Analytics Over Session Traces
//  COGNITIVE-FRAME AWARE • COMPUTER-INTELLIGENCE AWARE • EARN-AWARE
// ============================================================================
//
// IDENTITY — THE WISDOM CORTEX (v16-Immortal):
//  ------------------------------------------
//  • Interpretive cortex of the GPU organism.
//  • Observes baseline traces (past) and current traces (present).
//  • Compares them with deterministic clarity, no guessing.
//  • Reveals meaning already encoded in the data.
//  • Binary-aware, symbolic-aware, dual-band-aware (metadata only).
//  • Spine-aware: aligned with Orchestrator / Spine / Genetic Memory.
//  • Chunking-aware + prewarm-ready (metadata only).
//  • Advantage‑cascade aware: systemic gains improve insight flow.
//  • PulseSend‑v16‑ready: insights routable by compute router.
//  • Earn‑v4‑Presence‑ready.
//  • CognitiveFrame-aware: can emit GPU “thoughts” per step change.
//  • ComputerIntelligence-aware: can emit CI frames for Earn mode.
// ============================================================================
//
// SAFETY CONTRACT (v16-Immortal):
//  ------------------------------
//  • No randomness
//  • No timestamps
//  • No GPU calls
//  • No DOM
//  • No Node APIs
//  • No network or filesystem access
//  • Fail‑open: malformed traces → ignored, never crash
//  • Deterministic: same traces → same insights
//  • Self‑repair‑ready: insights include metadata
// ============================================================================
/*
AI_EXPERIENCE_META = {
  identity: "PulseGPUWisdomCortex",
  version: "v16-Immortal",
  layer: "gpu_wisdom",
  role: "gpu_wisdom_cortex",
  lineage: "PulseGPU-v16-Immortal",

  evo: {
    gpuCognition: true,
    gpuHeuristics: true,
    gpuMetaReasoning: true,

    gpuCompute: true,
    deterministic: true,
    driftProof: true,
    pureCompute: true,

    zeroNetwork: true,
    zeroFilesystem: true,
    zeroMutationOfInput: true,

    // Awareness
    symbolicAware: true,
    binaryAware: true,
    dualBandAware: true,
    gpuDispatchAware: true,
    gpuMemoryAware: true,
    gpuAdvantageAware: true,
    presenceAware: true,
    dnaAware: true,
    versionAware: true,

    // Mesh linkage
    brainLinked: true,
    cognitionLinked: true,
    spineLinked: true,
    geneticMemoryLinked: true,

    // Immortal + Earn
    immortalReady: true,
    immortalSurface: true,
    earnAware: true,
    earnCompatibility: "Earn-v4-Presence",

    // Contracts
    routingContract: "PulseSend-v16",
    gpuOrganContract: "PulseGPU-v16-Immortal",
    binaryGpuOrganContract: "PulseBinaryGPU-v16-Immortal",
    workgroupLawVersion: 16
  },

  contract: {
    always: [
      "PulseGPUBrain",
      "PulseGPUCognitiveIntelligence",
      "PulseGPUGeneticMemory"
    ],
    never: [
      "safeRoute",
      "fetchViaCNS",
      "legacyWisdomCortex"
    ]
  }
}
*/

import { INSIGHT_THRESHOLDS } from "./PulseGPUCommandments.js";
import {
  CognitiveFrame,
  computeComputerIntelligence
} from "./PulseGPUCognitiveIntelligence.js";

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

  if (absDelta < low) return "low";
  if (absDelta < 20) return "medium";
  if (absDelta < 40) return "high";
  return "critical";
}

// ------------------------------------------------------
// CognitiveFrame builder for a single step change
// ------------------------------------------------------

function buildCognitiveFrameForStepChange({
  stepId,
  deltaPercent,
  baselineAvgDurationMs,
  currentAvgDurationMs,
  gameProfile,
  hardwareProfile,
  tierProfile,
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
    currentAvgDurationMs
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
      currentAvgDurationMs
    }
  };

  const frame = new CognitiveFrame({
    cognition,
    interpretation: {},
    narrative,
    tier: {
      currentTier: tierProfile?.tierId || null,
      tierHistory: tierProfile?.history || []
    },
    performance,
    dispatch: {},
    advantage: {},
    presence: {
      context: null,
      dnaTag,
      instanceId,
      intelligentCompute: null
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

// ------------------------------------------------------
// Insight builder (v16-Immortal, CognitiveFrame-aware)
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
      version: "16.0-Immortal",
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

        binaryAware: true,
        symbolicAware: true,
        gpuDispatchAware: true,
        gpuMemoryAware: true,
        gpuAdvantageAware: true,

        pulseSend16Ready: true,
        routingContract: "PulseSend-v16",
        gpuOrganContract: "PulseGPU-v16-Immortal",
        binaryGpuOrganContract: "PulseBinaryGPU-v16-Immortal",
        earnCompatibility: "Earn-v4-Presence"
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
          metaSamples: []
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

    result.set(stepId, {
      avgDurationMs: avg,
      sampleCount: durations.length,
      sampleMeta: group.metaSamples[0] || {
        gameProfile: {},
        hardwareProfile: {},
        tierProfile: {}
      }
    });
  }

  return result;
}

// ------------------------------------------------------
// Wisdom Cortex Engine (v16-Immortal)
// ------------------------------------------------------

class PulseGPUInsightsEngine {
  constructor() {}

  analyzeStepDurations(
    baselineTraces = [],
    currentTraces = [],
    { dnaTag = "default-dna", instanceId = "", earnMode = false } = {}
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

      const delta = (baselineAvg - currentAvg) / baselineAvg;
      const deltaPercent = delta * 100;

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

      // Build CognitiveFrame + ComputerIntelligence for this step change
      const cognitiveFrame = buildCognitiveFrameForStepChange({
        stepId,
        deltaPercent,
        baselineAvgDurationMs: baselineAvg,
        currentAvgDurationMs: currentAvg,
        gameProfile,
        hardwareProfile,
        tierProfile,
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
            currentSampleCount: currentInfo.sampleCount
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
    earnMode = false
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
      earnMode
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
