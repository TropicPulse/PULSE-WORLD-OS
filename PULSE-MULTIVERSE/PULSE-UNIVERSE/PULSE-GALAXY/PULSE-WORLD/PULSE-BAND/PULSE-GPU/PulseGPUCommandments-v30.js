// ============================================================================
// FILE: PULSE-WORLD-OS/PULSE-MULTIVERSE/PULSEWORLD/PULSE-GPU/PulseGPUConfig-v30-IMMORTAL-INTEL-OMEGA.js
// LAYER: THE COMMANDMENTS — GPU-SUBSYSTEM (CONFIG + POLICY CONSTANTS)
//
// PulseGPUConfig v30-Immortal-Intel-Omega
// Deterministic, Drift‑Proof, PulseSend‑v24/v30‑Ready, Self‑Repair‑Ready
// PURE CONFIG. NO GPU. NO DOM. NO NODE. NO SIDE EFFECTS.
// ============================================================================
//
// IDENTITY — THE COMMANDMENTS (v30-Immortal-Intel-Omega):
//  ------------------------------------------------------
//  • The immutable doctrine of the GPU organism (v30 epoch).
//  • The unbreakable rules that govern all GPU behavior.
//  • The law interpreted by Advisor, enforced by Guardian, restored by Healer.
//  • The foundation upon which the entire GPU organism operates.
//  • The single source of truth for all GPU constants.
//  • PulseSend/Earn‑aligned: contracts are explicit, but conceptual only.
//  • Binary-aware, symbolic-aware, dispatch-aware, memory-aware, presence-aware.
//  • CognitiveFrame-aware + ComputerIntelligence-aware (metadata only).
//  • WarmPath-aware, NervousSystem-aware, Synapse-aware, GeneticMemory-aware.
//  • GPU-Mode-aware (idle/warmup/active/burst/recovery).
//  • Evolution-aware (evolution tiers, survival surfaces, earn surfaces).
// ============================================================================
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝


// ============================================================================
// META — v30 IMMORTAL-INTEL-OMEGA
// ============================================================================
export const PULSE_GPU_CONFIG_META = {
  layer: "PulseGPUConfig",
  role: "GPU_COMMANDMENTS",
  version: "v30-IMMORTAL-INTEL-OMEGA",
  deterministic: true,
  driftProof: true,
  pulseSendReady: true,
  selfRepairReady: true,
  binaryAware: true,
  symbolicAware: true,
  dispatchAware: true,
  memoryAware: true,
  presenceAware: true,
  cognitiveFrameAware: true,
  computerIntelligenceAware: true,
  warmPathAware: true,
  nervousSystemAware: true,
  synapseAware: true,
  geneticMemoryAware: true,
  gpuModeAware: true,
  evolutionAware: true
};


// ============================================================================
// COMMANDMENT I — PERFORMANCE TRUTH (v30-Immortal-Intel-Omega)
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

  // v30-Immortal-Intel-Omega: evolution + survival-aware scoring hints
  GPU_EVOLUTION_SCORE_WEIGHT: 0.10,
  GPU_SURVIVAL_SCORE_WEIGHT: 0.10,
  EARN_SURVIVAL_COMPAT_BONUS: 0.06,
  BINARY_INDEX_ALIGNMENT_BONUS: 0.05,
  GPU_MODE_STABILITY_WEIGHT: 0.09, // idle/warmup/active/burst/recovery

  meta: { ...PULSE_GPU_CONFIG_META, block: "SCORE_CONSTANTS" }
};


// ============================================================================
// COMMANDMENT II — KNOW THE DEGREE OF FAILURE (v30-Immortal-Intel-Omega)
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

  // v30-Immortal-Intel-Omega: evolution + survival sensitivity
  EVOLUTION_REGRESSION_EXTRA_SENSITIVITY: 4,
  SURVIVAL_SCORE_DROP_EXTRA_SENSITIVITY: 6,
  GPU_MODE_FLAP_EXTRA_SENSITIVITY: 5, // rapid mode changes

  meta: { ...PULSE_GPU_CONFIG_META, block: "SEVERITY_THRESHOLDS" }
};


// ============================================================================
// COMMANDMENT III — USER WILL ABOVE ALL (v30-Immortal-Intel-Omega)
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

  // v30-Immortal-Intel-Omega: evolution + survival + earn preferences
  allowGpuEvolutionBoostForEarn: true,
  allowGpuEvolutionBoostForGames: true,
  allowSurvivalScoreGatingForEarnJobs: true,
  allowBinaryIndexRoutingHints: true,
  allowGpuModeAdaptiveScheduling: true,
  allowEarnSurvivalDiagnosticsLogging: true,

  meta: { ...PULSE_GPU_CONFIG_META, block: "DEFAULT_USER_PREFERENCES" }
};


// ============================================================================
// COMMANDMENT IV — NO SESSION SHALL GROW WITHOUT BOUND (v30-Immortal-Intel-Omega)
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

  // v30-Immortal-Intel-Omega: evolution + survival trace hints
  MAX_GPU_EVOLUTION_EVENTS_PER_SESSION: 512,
  MAX_EARN_SURVIVAL_EVALS_PER_SESSION: 1024,
  MAX_GPU_MODE_TRANSITIONS_PER_SESSION: 512,
  MAX_BINARY_INDEX_UPDATES_PER_SESSION: 2048,

  meta: { ...PULSE_GPU_CONFIG_META, block: "TRACE_LIMITS" }
};


// ============================================================================
// COMMANDMENT V — ONLY MEANINGFUL CHANGE SHALL BE SEEN (v30-Immortal-Intel-Omega)
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

  // v30-Immortal-Intel-Omega: evolution + survival + mode thresholds
  MIN_GPU_EVOLUTION_SCORE_DELTA: 0.03,
  MIN_EARN_SURVIVAL_SCORE_DELTA: 0.02,
  MIN_GPU_MODE_STABILITY_DELTA: 1, // mode tier change
  MIN_BINARY_INDEX_SURFACE_DELTA: 3,

  meta: { ...PULSE_GPU_CONFIG_META, block: "INSIGHT_THRESHOLDS" }
};


// ============================================================================
// COMMANDMENT VI — REMEMBER ONLY WHAT IS NECESSARY (v30-Immortal-Intel-Omega)
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

  // v30-Immortal-Intel-Omega: evolution + survival + mode memory rules
  MAX_GPU_EVOLUTION_HISTORY: 1024,
  MAX_EARN_SURVIVAL_HISTORY: 2048,
  MAX_GPU_MODE_HISTORY: 1024,
  MAX_BINARY_INDEX_HISTORY: 2048,

  meta: { ...PULSE_GPU_CONFIG_META, block: "MEMORY_RULES" }
};


// ============================================================================
// COMMANDMENT VII — GPU MODES AND TIERS (v30-Immortal-Intel-Omega)
// ============================================================================
export const GPU_MODE_TIERS = {
  MODES: ["idle", "warmup", "active", "burst", "recovery"],
  MODE_PRIORITY: {
    idle: 0,
    warmup: 1,
    active: 2,
    burst: 3,
    recovery: -1
  },
  MODE_STABILITY_TARGETS: {
    idle: 0.99,
    warmup: 0.97,
    active: 0.95,
    burst: 0.92,
    recovery: 0.90
  },
  MODE_EARN_WEIGHT: {
    idle: 0.0,
    warmup: 0.4,
    active: 0.7,
    burst: 0.8,
    recovery: 0.2
  },
  MODE_GAME_WEIGHT: {
    idle: 0.0,
    warmup: 0.3,
    active: 0.8,
    burst: 1.0,
    recovery: 0.3
  },

  meta: { ...PULSE_GPU_CONFIG_META, block: "GPU_MODE_TIERS" }
};


// ============================================================================
// COMMANDMENT VIII — EVOLUTION + SURVIVAL TIERS (v30-Immortal-Intel-Omega)
// ============================================================================
export const EVOLUTION_THRESHOLDS = {
  GPU_EVOLUTION_TIERS: {
    TIER_0: 0.0,
    TIER_1: 0.25,
    TIER_2: 0.50,
    TIER_3: 0.75,
    TIER_4: 0.92
  },
  EARN_SURVIVAL_SCORE_MIN_APPROVE: 0.0, // >0 means profitable
  EARN_SURVIVAL_SCORE_STRONG_APPROVE: 0.01,
  EARN_SURVIVAL_SCORE_EXCELLENT: 0.05,

  GPU_EVOLUTION_EARN_BOOST_MAX: 0.15,
  GPU_EVOLUTION_GAME_BOOST_MAX: 0.10,

  meta: { ...PULSE_GPU_CONFIG_META, block: "EVOLUTION_THRESHOLDS" }
};


// ============================================================================
// COMMANDMENT IX — BAND + BINARY INDEX POLICIES (v30-Immortal-Intel-Omega)
// ============================================================================
export const BAND_POLICIES = {
  DEFAULT_BAND: "symbolic",
  PREFERRED_EARN_BAND: "binary",
  PREFERRED_GAME_BAND: "binary",

  BINARY_INDEX_MAX_SURFACE: 100000,
  BINARY_INDEX_MIN_DENSITY_FOR_PRIORITY: 5,

  ALLOW_BAND_SWITCH_ON_INSTABILITY: true,
  ALLOW_BAND_LOCK_ON_STABLE_HIGH_EVOLUTION: true,

  meta: { ...PULSE_GPU_CONFIG_META, block: "BAND_POLICIES" }
};


// ============================================================================
// COMMANDMENT X — SAFETY GUARDS (v30-Immortal-Intel-Omega)
// ============================================================================
export const SAFETY_GUARDS = {
  MAX_THERMAL_CRITICAL_SESSIONS: 3,
  MAX_BATTERY_CRITICAL_SESSIONS: 3,
  MAX_CONSECUTIVE_CRASHES: 2,

  REQUIRE_SURVIVAL_CHECK_FOR_HIGH_LOAD_EARN: true,
  REQUIRE_SURVIVAL_CHECK_FOR_BURST_MODE: true,

  DISABLE_EARN_ON_PERSISTENT_CRITICAL_THERMAL: true,
  DISABLE_BURST_ON_PERSISTENT_LOW_BATTERY: true,

  meta: { ...PULSE_GPU_CONFIG_META, block: "SAFETY_GUARDS" }
};


// ============================================================================
// EXPORTS — THE COMMANDMENTS MADE PUBLIC (v30-Immortal-Intel-Omega)
// ============================================================================
export default {
  PULSE_GPU_CONFIG_META,
  SCORE_CONSTANTS,
  SEVERITY_THRESHOLDS,
  DEFAULT_USER_PREFERENCES,
  TRACE_LIMITS,
  INSIGHT_THRESHOLDS,
  MEMORY_RULES,
  GPU_MODE_TIERS,
  EVOLUTION_THRESHOLDS,
  BAND_POLICIES,
  SAFETY_GUARDS
};
