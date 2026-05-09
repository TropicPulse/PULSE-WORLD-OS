// ============================================================================
// FILE: tropic-pulse-functions/PULSE-WORLD/PULSE-GPU/PulseGPUConfig-v24.js
// LAYER: THE COMMANDMENTS — GPU-SUBSYSTEM (CONFIG + POLICY CONSTANTS)
//
// PulseGPUConfig v24-Immortal++ — Deterministic, Drift‑Proof, PulseSend‑v24‑Ready, Self‑Repair‑Ready
// PURE CONFIG. NO GPU. NO DOM. NO NODE. NO SIDE EFFECTS.
// ============================================================================
//
// IDENTITY — THE COMMANDMENTS (v24-Immortal++):
//  -------------------------------------------
//  • The immutable doctrine of the GPU organism (v24 epoch).
//  • The unbreakable rules that govern all GPU behavior.
//  • The law interpreted by Advisor, enforced by Guardian, restored by Healer.
//  • The foundation upon which the entire GPU organism operates.
//  • The single source of truth for all GPU constants.
//  • PulseSend/Earn‑aligned: contracts are explicit, but conceptual only.
//  • Binary-aware, symbolic-aware, dispatch-aware, memory-aware, presence-aware.
//  • CognitiveFrame-aware + ComputerIntelligence-aware (metadata only).
//  • WarmPath-aware, NervousSystem-aware, Synapse-aware, GeneticMemory-aware.
// ============================================================================

export const PULSE_GPU_CONFIG_META = {
  layer: "PulseGPUConfig",
  version: "24.0-Immortal++",
  target: "full-gpu+binary+spine",
  selfRepairable: true,
  doctrine: "These constants form the immutable commandments of PULSE-GPU (v24-Immortal++).",
  description: "Central configuration + policy constants for PULSE-GPU v24-Immortal++.",

  evo: {
    metabolicBoost: 1.35,
    neuralReflexBoost: 1.4,
    stabilityBoost: 1.6,

    multiInstanceReady: true,
    deterministicNeuron: true,
    parallelSafe: true,
    fanOutScaling: 1.25,
    clusterCoherence: true,
    zeroDriftCloning: true,
    reflexPropagation: 1.25,

    dualModeEvolution: true,
    organismClusterBoost: 1.25,
    cognitiveComputeLink: true,
    unifiedAdvantageField: true,

    // v24 Immortal++ Presence
    presenceAware: true,
    dnaAware: true,
    versionAware: true,
    instanceAware: true,

    // GPU awareness
    binaryAware: true,
    symbolicAware: true,
    gpuDispatchAware: true,
    gpuMemoryAware: true,
    gpuAdvantageAware: true,

    // Nervous system + synapse + warm path + healer + lymph
    nervousSystemAware: true,
    synapseAware: true,
    warmPathAware: true,
    healerAware: true,
    lymphNodeAware: true,
    geneticMemoryAware: true,

    // Cognitive / CI awareness (metadata only)
    cognitiveFrameAware: true,
    computerIntelligenceAware: true,

    // PulseSend / Earn contracts (conceptual only)
    routingContract: "PulseSend-v24",
    gpuOrganContract: "PulseGPU-v24-Immortal++",
    binaryGpuOrganContract: "PulseBinaryGPU-v24-Immortal++",
    earnCompatibility: "Earn-v24-GPU",
    workgroupLawVersion: 24
  }
};

// ============================================================================
// COMMANDMENT I — PERFORMANCE TRUTH (v24-Immortal++)
// ============================================================================
export const SCORE_CONSTANTS = {
  MAX_FPS: 480,
  MAX_STUTTERS: 1000,
  CRASH_PENALTY: 0.45,

  AVG_FPS_WEIGHT: 0.55,
  MIN_FPS_WEIGHT: 0.35,
  STUTTER_WEIGHT: 0.3,

  // v16-Immortal: binary/symbolic scoring hints (kept for compatibility)
  BINARY_MODE_BONUS: 0.08,
  STABILITY_FIELD_WEIGHT: 0.14,

  // v16-Immortal: CI-aware scoring hints (kept for compatibility)
  COMPUTER_INTELLIGENCE_BONUS: 0.05,
  COGNITIVE_FRAME_ALIGNMENT_WEIGHT: 0.07,

  // v24-Immortal++: warm-path + pressure-aware scoring hints (conceptual only)
  WARM_PATH_ALIGNMENT_BONUS: 0.06,
  PRESSURE_STABILITY_WEIGHT: 0.12,
  NERVOUS_SYSTEM_HEALTH_WEIGHT: 0.08,

  meta: { ...PULSE_GPU_CONFIG_META, block: "SCORE_CONSTANTS" }
};

// ============================================================================
// COMMANDMENT II — KNOW THE DEGREE OF FAILURE (v24-Immortal++)
// ============================================================================
export const SEVERITY_THRESHOLDS = {
  LOW: 5,
  MEDIUM: 12,
  HIGH: 25,
  CRITICAL: 40,

  // v16-Immortal: optional GPU-aware modifiers (kept)
  BINARY_REGRESSION_EXTRA_SENSITIVITY: 5,
  CI_REGRESSION_EXTRA_SENSITIVITY: 3,

  // v24-Immortal++: warm-path + cache + pressure sensitivity (conceptual only)
  WARM_PATH_REGRESSION_EXTRA_SENSITIVITY: 4,
  HIGH_PRESSURE_EXTRA_SENSITIVITY: 6,

  meta: { ...PULSE_GPU_CONFIG_META, block: "SEVERITY_THRESHOLDS" }
};

// ============================================================================
// COMMANDMENT III — USER WILL ABOVE ALL (v24-Immortal++)
// ============================================================================
export const DEFAULT_USER_PREFERENCES = {
  allowAutoFixLowRegressions: false,
  allowAutoFixMediumRegressions: false,
  allowAutoFixHighRegressions: false,
  allowAutoFixCriticalRegressions: false,

  allowAutoApplyOptimalSettings: false,
  allowAutoTierChanges: false,

  // v16-Immortal: binary/symbolic preference flags (kept)
  preferBinaryStablePaths: true,
  allowSymbolicFallbackOnInstability: true,

  // v16-Immortal: presence / identity preferences (kept)
  allowPerDevicePresenceTuning: true,
  allowPerInstanceProfiles: true,

  // v16-Immortal: CI / cognition preferences (kept)
  allowComputerIntelligenceScoring: true,
  allowCognitiveFrameLogging: true,
  allowEarnModeOptimizations: true,

  // v24-Immortal++: warm-path + nervous system preferences (conceptual only)
  allowWarmPathPrewarm: true,
  allowAggressiveWarmPathOnTrustedLowRisk: true,
  allowNervousSystemDeepTracingOnDebug: false,
  allowHealerAutoRepairHints: true,
  allowLymphNodeImmuneFiltering: true,

  meta: { ...PULSE_GPU_CONFIG_META, block: "DEFAULT_USER_PREFERENCES" }
};

// ============================================================================
// COMMANDMENT IV — NO SESSION SHALL GROW WITHOUT BOUND (v24-Immortal++)
// ============================================================================
export const TRACE_LIMITS = {
  MAX_STEPS_PER_SESSION: 1000,
  MAX_DURATION_MS: 90 * 60 * 1000,
  MAX_WARNINGS: 100000,
  MAX_ERRORS: 100000,
  MAX_STUTTERS: 100000,
  MAX_VRAM_MB: 4_000_000,

  // v16-Immortal: dispatch/memory trace hints (kept)
  MAX_DISPATCH_HISTORY: 4096,
  MAX_BINARY_PATTERN_HISTORY: 1024,

  // v16-Immortal: cognition / CI trace hints (kept)
  MAX_COGNITIVE_FRAMES_PER_SESSION: 256,
  MAX_COMPUTER_INTELLIGENCE_RECORDS: 256,

  // v24-Immortal++: nervous system + warm-path trace hints (conceptual only)
  MAX_SENSORY_STEPS_PER_SESSION: 2048,
  MAX_WARM_PATH_EVENTS_PER_SESSION: 512,
  MAX_HEALER_REPORTS_PER_SESSION: 128,
  MAX_LYMPH_NODE_ACTIONS_PER_SESSION: 256,

  meta: { ...PULSE_GPU_CONFIG_META, block: "TRACE_LIMITS" }
};

// ============================================================================
// COMMANDMENT V — ONLY MEANINGFUL CHANGE SHALL BE SEEN (v24-Immortal++)
// ============================================================================
export const INSIGHT_THRESHOLDS = {
  MIN_STEP_DELTA_PERCENT: 5,
  MAX_STEP_DELTA_PERCENT: 200,

  // v16-Immortal: GPU pattern/dispatch insight thresholds (kept)
  MIN_DISPATCH_PATTERN_DELTA_PERCENT: 3,

  // v16-Immortal: CI / cognition thresholds (kept)
  MIN_COMPUTER_INTELLIGENCE_DELTA: 0.02,
  MIN_COGNITIVE_ALIGNMENT_DELTA: 0.03,

  // v24-Immortal++: pressure + warm-path + genetic memory thresholds
  MIN_PRESSURE_BAND_DELTA: 0.05,
  MIN_WARM_PATH_TIER_DELTA: 1, // none→light or light→strong
  MIN_GENETIC_SAMPLE_DELTA: 5,

  meta: { ...PULSE_GPU_CONFIG_META, block: "INSIGHT_THRESHOLDS" }
};

// ============================================================================
// COMMANDMENT VI — REMEMBER ONLY WHAT IS NECESSARY (v24-Immortal++)
// ============================================================================
export const MEMORY_RULES = {
  MAX_ENTRIES_PER_GAME: 80,
  MAX_ENTRIES_TOTAL: 4000,

  // v16-Immortal: GPU memory / dispatch memory rules (kept)
  MAX_GPU_MEMORY_SNAPSHOTS: 512,
  MAX_GPU_DISPATCH_HINT_SETS: 512,

  // v16-Immortal: cognition / CI memory rules (kept)
  MAX_COGNITIVE_FRAME_HISTORY: 512,
  MAX_COMPUTER_INTELLIGENCE_HISTORY: 512,

  // v24-Immortal++: genetic memory + warm-path + healer memory rules
  MAX_GENETIC_MEMORY_PATTERNS: 4096,
  MAX_WARM_PATH_CACHE_ENTRIES: 1024,
  MAX_HEALER_CACHE_ENTRIES: 1024,
  MAX_LYMPH_NODE_CACHE_ENTRIES: 1024,

  meta: { ...PULSE_GPU_CONFIG_META, block: "MEMORY_RULES" }
};

// ============================================================================
// EXPORTS — THE COMMANDMENTS MADE PUBLIC (v24-Immortal++)
// ============================================================================
export default {
  PULSE_GPU_CONFIG_META,
  SCORE_CONSTANTS,
  SEVERITY_THRESHOLDS,
  DEFAULT_USER_PREFERENCES,
  TRACE_LIMITS,
  INSIGHT_THRESHOLDS,
  MEMORY_RULES
};
