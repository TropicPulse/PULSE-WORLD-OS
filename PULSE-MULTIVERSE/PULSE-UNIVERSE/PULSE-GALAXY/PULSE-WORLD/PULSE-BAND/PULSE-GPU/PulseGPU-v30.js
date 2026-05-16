// ============================================================================
//  PulseGPU-v30-IMMORTAL+++ — UNIFIED DUAL-GPU ORGAN (FULL v30+++ UPGRADE)
//  Deterministic GPU Dispatch Organ • Pattern + Lineage + Shape + Presence
//  Dual-Mode: Binary + Symbolic • Multi-Instance • Advantage + Chunker + Worker Aware
//  Dual-GPU Topology: primaryGPU + workerGPU (process worker lane)
//  “PLAN ONCE. REUSE FOREVER. NEVER DRIFT. NEVER LAG.”
//  • Metadata-only, zero GPU calls, zero side effects
// ============================================================================
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚══════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝

// ============================================================================
//  IMPORTS — v30+++ GPU ORGAN STACK
// ============================================================================

import * as PulseGPUBrain                 from "./PulseGPUBrain-v30.js";
import * as PulseGPUDrive                 from "./PulseGPUDrive-v30.js";
import * as PulseGPUDriveCenter           from "./PulseGPUDriveCenter-v30.js";
import * as PulseGPUDriveEngine           from "./PulseGPUDriveCenter-v30.js"; // alias
import * as PulseGPUSpine                 from "./PulseGPUSpine-v30.js";
import * as PulseGPUGeneticMemoryModule   from "./PulseGPUGeneticMemory-v30.js";
import * as PulseGPUWarmPathCacheModule   from "./PulseGPUWarmPathCache-v30.js";

import * as PulseGPUAstralMuscleSystem    from "./PulseGPUAstralMuscleSystem-v30.js";
import * as PulseGPUGuardianCortexModule  from "./PulseGPUGuardianCortex-v30.js";
import * as PulseGPULymphNodes            from "./PulseGPULymphNodes-v30.js";

import * as PulseGPUAstralNervousSystem   from "./PulseGPUAstralNervousSystem-v30.js";
import * as PulseGPUNervousSystem         from "./PulseGPUNervousSystem-v30.js";

import * as PulseGPUCognitiveIntelligence from "./PulseGPUCognitiveIntelligence-v30.js";
import * as PulseGPUCognitiveLayer        from "./PulseGPUCognitiveLayer-v30.js";
import * as PulseGPUWisdomCortex          from "./PulseGPUWisdomCortex-v30.js";

import * as PulseGPUSurvivalInstincts     from "./PulseGPUSurvivalInstincts-v30.js";
import * as PulseGPUSynapses              from "./PulseGPUSynapses-v30.js";
import * as PulseGPUCommandments          from "./PulseGPUCommandments-v30.js";

import {
  AI_EXPERIENCE_META_PulseGPUChunkPlanner,
  ORGAN_META_PulseGPUChunkPlanner,
  ORGAN_CONTRACT_PulseGPUChunkPlanner,
  PulseGPUChunkPlanner
} from "./PulseGPUChunkPlanner-v30.js";

import {
  PulseNetBoot,
  PulseNet,
  PulseProofBridge
} from "../../PULSEVISION/____BACKEND/PULSE-WORLD-BRIDGE.js";

// GPU chunker + warm-path-aware
import { pulseGPUChunker } from "./PulseGPUChunker-v30.js";

// Genetic memory + warm-path cache
const { PulseGPUGeneticMemory } = PulseGPUGeneticMemoryModule;
const { PulseGPUWarmPathCache } = PulseGPUWarmPathCacheModule;

// Guardian Cortex
const { PulseGPUGuardianCortex } = PulseGPUGuardianCortexModule;

// Astral Muscle (engine)
const {
  PulseGPUMemory,
  PulseRenderPassBuilder,
  PulsePipelineBuilder,
  PulseDrawExecutor,
  PulseGPUEngine
} = PulseGPUAstralMuscleSystem;

// Process worker helper (real, not hypothetical)
import { PulseGPUProcessWorker } from "../PULSE-ENGINE/PulseEngineGPUProcessWorker-v30.js";

// Motion engine (process worker / motion spine)
import { createPulseMotionEngine as PulseMotionEngine } from "../PULSE-ENGINE/PulseEngineProcess-v30.js";

// --- PULSE-CORE MEMORY SPINE (FULL SPINE) ----------------------------------
import PulseCoreMemory                    from "../PULSE-CORE/PulseCoreMemory-v30.js";
import PulseCoreAIMemoryAdapter           from "../PULSE-CORE/PulseCoreAIMemoryAdapter-v30.js";
import PulseCoreGPUMemoryAdapter          from "../PULSE-CORE/PulseCoreGpuMemoryAdapter-v30.js";
import PulseCoreProxyMemoryAdapter        from "../PULSE-CORE/PulseCoreProxyMemoryAdapter-v30.js";
import PulseCoreEarnMemoryAdapter         from "../PULSE-CORE/PulseCoreEarnMemoryAdapter-v30.js";
import PulseBinaryCoreOverlay             from "../PULSE-CORE/PulseCoreBinaryOverlay-v30.js";

// ============================================================================
//  CORE MEMORY BRIDGE
// ============================================================================
export const CoreMemory = Object.freeze({
  raw: () => PulseCoreMemory,
  all: () => PulseCoreAIMemoryAdapter,
  gpu: () => PulseCoreGPUMemoryAdapter,
  proxy: () => PulseCoreProxyMemoryAdapter,
  earn: () => PulseCoreEarnMemoryAdapter,
  binaryOverlay: () => PulseBinaryCoreOverlay
});

// ============================================================================
//  GPU ROLE / META BLOCK (v30+++)
// ============================================================================
export const GPURole = Object.freeze({
  identity: "PulseGPU-Organ-v30-Immortal+++",
  version: "30.0-IMMORTAL+++",
  dualGpu: true,
  description:
    "Unified dual-GPU organ (primary + worker) — deterministic dispatch, lineage, warm-path, genetic memory, process-worker aware."
});

export const GPUMetaBlock = Object.freeze({
  identity: GPURole.identity,
  version: GPURole.version,
  dualGpu: true,
  bands: ["symbolic", "binary"],
  gpuMode: "mixed",
  warmPathAware: true,
  geneticMemoryAware: true,
  guardianCortexAware: true,
  astralMuscleAware: true,
  processWorkerAware: true,
  motionEngineAware: true,
  chunkerAware: true,
  earnAware: true,
  multiInstanceReady: true,
  deterministic: true,
  zeroEntropy: true
});

// ============================================================================
//  UTILS — LINEAGE / SIGNATURES / ADVANTAGE (v30+++)
// ============================================================================

function buildLineage(parentLineage, pattern) {
  const base = Array.isArray(parentLineage) ? parentLineage : [];
  return [...base, pattern];
}

function computeShapeSignature(pattern, lineage, modeKind) {
  const lineageKey = lineage.join("::");
  const raw = `gpu::${modeKind}::${pattern}::${lineageKey}`;

  let acc = 0;
  for (let i = 0; i < raw.length; i++) {
    acc = (acc + raw.charCodeAt(i) * (i + 1)) % 100000;
  }

  return `gpu-shape-${modeKind}-${acc}`;
}

function computeDispatchSignature(pattern, modeKind, profileStyle) {
  const raw = `dispatch::${modeKind}::${pattern}::${profileStyle}`;
  let acc = 0;
  for (let i = 0; i < raw.length; i++) {
    acc = (acc * 31 + raw.charCodeAt(i)) % 100000;
  }
  return `gpu-dispatch-${modeKind}-${acc}`;
}

function computeEvolutionStage(pattern, lineage) {
  const depth = lineage.length;

  if (depth === 1) return "seed";
  if (depth === 2) return "sprout";
  if (depth === 3) return "branch";

  if (pattern.includes("fuse")) return "fused-kernel";
  if (pattern.includes("batch")) return "batched";
  if (pattern.includes("stream")) return "streaming";
  if (pattern.includes("fallback")) return "fallback-aware";

  return "mature";
}

function resolveModeKind(modeKind) {
  if (modeKind === "binary") return "binary";
  if (modeKind === "symbolic") return "symbolic";
  return "symbolic";
}

function computeModeBias(mode, pressure, modeKind) {
  const modeLabel = mode || "normal";
  let bias = "neutral";

  if (modeLabel === "latency") bias = "low-latency";
  else if (modeLabel === "throughput") bias = "high-throughput";
  else if (modeLabel === "energy") bias = "low-energy";
  else if (modeLabel === "recovery") bias = "high-reliability";

  const gpuLoad = pressure?.gpuLoadPressure || 0;
  const thermal = pressure?.thermalPressure || 0;
  const mem = pressure?.memoryPressure || 0;
  const meshStorm = pressure?.meshStormPressure || 0;
  const auraTension = pressure?.auraTension || 0;

  if (gpuLoad > 0.7 || thermal > 0.7 || meshStorm > 0.6) {
    bias = "fallback-friendly";
  } else if (mem > 0.7) {
    bias = "memory-conservative";
  }

  if (modeKind === "binary" && bias === "high-throughput") {
    return "binary-throughput";
  }
  if (modeKind === "binary" && bias === "low-latency") {
    return "binary-latency";
  }

  if (auraTension > 0.5) {
    return "stability-first";
  }

  return bias;
}

function selectDispatchProfile(pattern, modeBias, modeKind, multiInstanceHint) {
  const base = {
    style: "neutral",
    kernelType: modeKind === "binary" ? "binary-standard" : "standard",
    maxBatchSize: 1,
    allowFusion: false,
    allowStreaming: false,
    allowFallbackCPU: true,
    modeKind,
    multiInstanceOptimized: !!multiInstanceHint
  };

  const mark = (profile) => ({
    ...profile,
    modeKind,
    multiInstanceOptimized: !!multiInstanceHint
  });

  if (pattern.includes("fuse")) {
    return mark({
      style: modeKind === "binary" ? "binary-fused" : "fused",
      kernelType: modeKind === "binary" ? "binary-fused" : "fused",
      maxBatchSize: 8,
      allowFusion: true,
      allowStreaming: false,
      allowFallbackCPU: true
    });
  }

  if (pattern.includes("batch")) {
    return mark({
      style: modeKind === "binary" ? "binary-batched" : "batched",
      kernelType: modeKind === "binary" ? "binary-batched" : "batched",
      maxBatchSize: 32,
      allowFusion: false,
      allowStreaming: true,
      allowFallbackCPU: true
    });
  }

  if (pattern.includes("stream")) {
    return mark({
      style: modeKind === "binary" ? "binary-streaming" : "streaming",
      kernelType: modeKind === "binary" ? "binary-streaming" : "streaming",
      maxBatchSize: 4,
      allowFusion: false,
      allowStreaming: true,
      allowFallbackCPU: true
    });
  }

  if (modeBias === "low-latency" || modeBias === "binary-latency") {
    return mark({
      style: modeKind === "binary" ? "binary-latency-first" : "latency-first",
      kernelType: modeKind === "binary" ? "binary-standard" : "standard",
      maxBatchSize: 1,
      allowFusion: false,
      allowStreaming: false,
      allowFallbackCPU: true
    });
  }

  if (modeBias === "high-throughput" || modeBias === "binary-throughput") {
    return mark({
      style: modeKind === "binary" ? "binary-throughput-first" : "throughput-first",
      kernelType: modeKind === "binary" ? "binary-batched" : "batched",
      maxBatchSize: 64,
      allowFusion: true,
      allowStreaming: true,
      allowFallbackCPU: true
    });
  }

  if (modeBias === "fallback-friendly") {
    return mark({
      style: modeKind === "binary" ? "binary-fallback-aware" : "fallback-aware",
      kernelType: modeKind === "binary" ? "binary-standard" : "standard",
      maxBatchSize: 2,
      allowFusion: false,
      allowStreaming: false,
      allowFallbackCPU: true
    });
  }

  if (modeBias === "memory-conservative") {
    return mark({
      style: modeKind === "binary"
        ? "binary-memory-conservative"
        : "memory-conservative",
      kernelType: modeKind === "binary" ? "binary-standard" : "standard",
      maxBatchSize: 4,
      allowFusion: false,
      allowStreaming: false,
      allowFallbackCPU: true
    });
  }

  if (modeBias === "stability-first") {
    return mark({
      style: modeKind === "binary"
        ? "binary-stability-first"
        : "stability-first",
      kernelType: modeKind === "binary" ? "binary-standard" : "standard",
      maxBatchSize: 2,
      allowFusion: false,
      allowStreaming: false,
      allowFallbackCPU: true
    });
  }

  return base;
}

function computeAdvantageScore({ pattern, modeBias, modeKind, pressureSnapshot }) {
  let score = 0;

  if (modeKind === "binary") score += 2;
  if (pattern.includes("fuse")) score += 2;
  if (pattern.includes("batch")) score += 2;
  if (pattern.includes("stream")) score += 1;

  if (modeBias === "high-throughput" || modeBias === "binary-throughput") score += 2;
  if (modeBias === "low-latency" || modeBias === "binary-latency") score += 1;

  const gpuLoad = pressureSnapshot?.gpuLoadPressure || 0;
  if (gpuLoad < 0.3) score += 1;

  return score;
}

// ============================================================================
//  DISPATCH BUILDERS — v30+++
// ============================================================================

export function createGPUDispatch({
  jobId,
  pattern,
  payload = {},
  mode = "normal",
  modeKind = "symbolic",
  parentLineage = null,
  pressureSnapshot = null,
  executionContext = {},
  dnaTag = "default-dna",
  version = GPURole.version,
  chunkContext = null,
  gpuLane = "primary" // "primary" | "worker"
}) {
  const resolvedModeKind   = resolveModeKind(modeKind);
  const lineage            = buildLineage(parentLineage, pattern);
  const evolutionStage     = computeEvolutionStage(pattern, lineage);
  const modeBias           = computeModeBias(mode, pressureSnapshot || {}, resolvedModeKind);
  const multiInstanceHint  = !!executionContext.multiInstance;
  const profile            = selectDispatchProfile(
    pattern,
    modeBias,
    resolvedModeKind,
    multiInstanceHint
  );
  const shapeSignature     = computeShapeSignature(pattern, lineage, resolvedModeKind);
  const dispatchSignature  = computeDispatchSignature(
    pattern,
    resolvedModeKind,
    profile.style
  );

  const advantageScore = computeAdvantageScore({
    pattern,
    modeBias,
    modeKind: resolvedModeKind,
    pressureSnapshot: pressureSnapshot || {}
  });

  const execCtx = {
    binaryMode: resolvedModeKind === "binary" ? "binary" : "non-binary",
    pipelineId: executionContext.pipelineId || "",
    sceneType: executionContext.sceneType || "",
    workloadClass: executionContext.workloadClass || "",
    resolution: executionContext.resolution || "",
    refreshRate: executionContext.refreshRate || 0,
    instanceId: executionContext.instanceId || "",
    multiInstance: multiInstanceHint,
    dispatchSignature,
    shapeSignature,
    gpuLane
  };

  return {
    GPURole,
    GPUMetaBlock,
    jobId,
    pattern,
    payload,
    mode,
    modeKind: resolvedModeKind,
    lineage,
    dnaTag,
    version,
    gpuLane,
    executionContext: execCtx,
    chunkContext: chunkContext || null,
    meta: {
      shapeSignature,
      dispatchSignature,
      evolutionStage,
      modeBias,
      profile,
      advantageScore,
      pressureSnapshot: pressureSnapshot || {}
    }
  };
}

export function evolveGPUDispatch(dispatch, context = {}) {
  const {
    mode: nextMode,
    modeKind: nextModeKind,
    pressureSnapshot,
    executionContext,
    chunkContext,
    gpuLane
  } = context;

  const modeLabel        = nextMode || dispatch.mode || "normal";
  const resolvedModeKind = resolveModeKind(nextModeKind || dispatch.modeKind || "symbolic");
  const lineage          = Array.isArray(dispatch.lineage) ? dispatch.lineage : [];
  const pattern          = dispatch.pattern;

  const nextLineage       = buildLineage(lineage, pattern);
  const evolutionStage    = computeEvolutionStage(pattern, nextLineage);
  const modeBias          = computeModeBias(
    modeLabel,
    pressureSnapshot || dispatch.meta?.pressureSnapshot || {},
    resolvedModeKind
  );
  const multiInstanceHint = !!executionContext?.multiInstance ||
    !!dispatch.executionContext?.multiInstance;
  const profile           = selectDispatchProfile(
    pattern,
    modeBias,
    resolvedModeKind,
    multiInstanceHint
  );
  const shapeSignature    = computeShapeSignature(pattern, nextLineage, resolvedModeKind);
  const dispatchSignature = computeDispatchSignature(
    pattern,
    resolvedModeKind,
    profile.style
  );

  const advantageScore = computeAdvantageScore({
    pattern,
    modeBias,
    modeKind: resolvedModeKind,
    pressureSnapshot: pressureSnapshot || dispatch.meta?.pressureSnapshot || {}
  });

  const prevExec = dispatch.executionContext || {};
  const lane = gpuLane || prevExec.gpuLane || "primary";

  const execCtx = {
    binaryMode: resolvedModeKind === "binary" ? "binary" : "non-binary",
    pipelineId: executionContext?.pipelineId || prevExec.pipelineId || "",
    sceneType: executionContext?.sceneType || prevExec.sceneType || "",
    workloadClass: executionContext?.workloadClass || prevExec.workloadClass || "",
    resolution: executionContext?.resolution || prevExec.resolution || "",
    refreshRate: executionContext?.refreshRate || prevExec.refreshRate || 0,
    instanceId: executionContext?.instanceId || prevExec.instanceId || "",
    multiInstance: multiInstanceHint,
    dispatchSignature,
    shapeSignature,
    gpuLane: lane
  };

  return {
    GPURole,
    GPUMetaBlock,
    jobId: dispatch.jobId,
    pattern,
    payload: dispatch.payload,
    mode: modeLabel,
    modeKind: resolvedModeKind,
    lineage: nextLineage,
    dnaTag: dispatch.dnaTag || "default-dna",
    version: dispatch.version || GPURole.version,
    gpuLane: lane,
    executionContext: execCtx,
    chunkContext: chunkContext || dispatch.chunkContext || null,
    meta: {
      shapeSignature,
      dispatchSignature,
      evolutionStage,
      modeBias,
      profile,
      advantageScore,
      pressureSnapshot: pressureSnapshot || dispatch.meta?.pressureSnapshot || {}
    }
  };
}

// ============================================================================
//  PULSE GPU IMMORTAL — DUAL-GPU ORGAN CONTROLLER (v30+++)
// ============================================================================

class PulseGPUImmortal {
  constructor(config = {}) {
    this.config = {
      id: GPURole.identity,
      ...config
    };

    this.pressure      = config.pressure || null;   // mesh/aura/earn pressure provider
    this.gpuCore       = config.gpuCore || null;    // PulseGPUCore / engine view
    this.chunkCache    = config.chunkCache || null; // GPU chunk cache / engine
    this.chunkPlanner  = config.chunkPlanner || PulseGPUChunkPlanner;

    // Dual GPU lanes
    this.primaryEngine = config.primaryEngine || null; // PulseGPUEngine (primary)
    this.workerEngine  = config.workerEngine || null;  // PulseGPUEngine (worker lane)

    // Genetic memory + warm-path
    this.geneticMemory = config.geneticMemory || new PulseGPUGeneticMemory();
    this.warmPathCache = config.warmPathCache || PulseGPUWarmPathCache;

    // Guardian cortex
    this.guardian = config.guardian || new PulseGPUGuardianCortex(config.guardianPrefs || {}, "gpu-guardian-v30");

    // Process worker + motion engine
    this.processWorker = config.processWorker || new PulseGPUProcessWorker({
      id: `${this.config.id}::process-worker`,
      mode: "gpu",
      gpuLane: "worker"
    });

    this.motionEngine = config.motionEngine || new PulseMotionEngine({
      id: `${this.config.id}::motion-engine`,
      gpuProcessWorker: this.processWorker
    });

    this.logger = config.logger || console;
  }

  // -------------------------------------------------------------------------
  //  Pure structural plan description (no execution) — primary vs worker lane
  // -------------------------------------------------------------------------
  describeGpuPlan(pattern, options = {}, env = {}) {
    const parentLineage      = options.parentLineage || [];
    const modeKind           = resolveModeKind(options.modeKind || env.modeKind || "symbolic");
    const mode               = options.mode || env.mode || "normal";
    const multiInstanceHint  = options.multiInstanceHint || env.multiInstanceHint || false;
    const gpuLane            = options.gpuLane || env.gpuLane || "primary";

    const pressureSnapshot =
      options.pressureSnapshot ||
      env.pressureSnapshot ||
      this._safeCall(this.pressure, "snapshot") ||
      null;

    const lineage         = buildLineage(parentLineage, pattern);
    const evolutionStage  = computeEvolutionStage(pattern, lineage);
    const modeBias        = computeModeBias(mode, pressureSnapshot || {}, modeKind);
    const profile         = selectDispatchProfile(
      pattern,
      modeBias,
      modeKind,
      multiInstanceHint
    );
    const shapeSignature  = computeShapeSignature(pattern, lineage, modeKind);
    const dispatchSignature = computeDispatchSignature(
      pattern,
      modeKind,
      profile.style
    );
    const advantageScore  = computeAdvantageScore({
      pattern,
      modeBias,
      modeKind,
      pressureSnapshot: pressureSnapshot || {}
    });

    // Warm-path + genetic memory hints
    const warmHints = this._computeWarmPathHints(pattern, {
      chunkProfile: options.chunkProfile || "gpu",
      gpuCapable: options.gpuCapable !== false,
      trust: options.trust || "trusted",
      risk: options.risk || "low",
      pulseStream: options.pulseStream || "continuous",
      fastLane: options.fastLane || "enabled",
      page: options.page || "gpu-organ"
    });

    const geneticPattern = this.geneticMemory.getPatternForContext({
      gameProfile: options.gameProfile || {},
      hardwareProfile: options.hardwareProfile || {},
      tierProfile: options.tierProfile || {},
      executionContext: {
        binaryMode: modeKind === "binary" ? "binary" : "auto",
        pipelineId: options.pipelineId || "",
        sceneType: options.sceneType || "",
        workloadClass: options.workloadClass || "",
        resolution: options.resolution || "",
        refreshRate: options.refreshRate || 0,
        dispatchSignature,
        shapeSignature,
        qualityPreset: options.qualityPreset || "",
        rayTracing: !!options.rayTracing
      }
    });

    const plan = {
      ts: Date.now(),
      meta: {
        id: this.config.id,
        version: GPURole.version,
        gpuLane
      },
      pattern,
      lineage,
      modeKind,
      mode,
      modeBias,
      evolutionStage,
      shapeSignature,
      dispatchSignature,
      profile,
      advantageScore,
      pressureSnapshot,
      warmPathHints: warmHints,
      geneticPattern
    };

    this._log("gpu:plan-v30-immortal+++", { plan });
    return plan;
  }

  // -------------------------------------------------------------------------
  //  Surface snapshot for world / trust (chunker + dual-engine aware)
// -------------------------------------------------------------------------
  snapshotGpuSurface() {
    const gpuView =
      this._safeCall(this.gpuCore, "buildGpuView") ||
      this._safeCall(this.gpuCore, "snapshotGPU") ||
      null;

    const pressureSnapshot = this._safeCall(this.pressure, "snapshot") || null;
    const chunkCacheSnapshot = this._snapshotChunkCache();

    const primarySnapshot =
      this.primaryEngine && typeof this.primaryEngine.snapshotEngineSurface === "function"
        ? this.primaryEngine.snapshotEngineSurface()
        : null;

    const workerSnapshot =
      this.workerEngine && typeof this.workerEngine.snapshotEngineSurface === "function"
        ? this.workerEngine.snapshotEngineSurface()
        : null;

    const snapshot = {
      ts: Date.now(),
      meta: {
        id: this.config.id,
        version: GPURole.version,
        dualGpu: true
      },
      gpuView,
      pressureSnapshot,
      chunkCache: chunkCacheSnapshot,
      engines: {
        primary: primarySnapshot,
        worker: workerSnapshot
      }
    };

    this._log("gpu:snapshot-surface-v30-immortal+++", { snapshot });
    return snapshot;
  }

  // -------------------------------------------------------------------------
  //  Intelligent compute hint — advisory only, chunker + worker aware
  // -------------------------------------------------------------------------
  intelligentComputeHint(dispatch, chunkContext = null) {
    if (!dispatch || !dispatch.meta) {
      return {
        level: "none",
        reason: "no-dispatch",
        suggestions: [],
        chunkPlan: null,
        workerPlan: null
      };
    }
    const { profile, modeBias, advantageScore, pressureSnapshot } = dispatch.meta;
    const suggestions = [];

    if (profile?.style?.includes("throughput") && pressureSnapshot?.gpuLoadPressure > 0.8) {
      suggestions.push("consider-reducing-batch-size");
      suggestions.push("prefer-streaming-or-latency-profile");
    }

    if (profile?.style?.includes("latency") && pressureSnapshot?.gpuLoadPressure < 0.3) {
      suggestions.push("consider-increasing-batch-size");
    }

    if (modeBias === "memory-conservative" && profile?.maxBatchSize > 4) {
      suggestions.push("cap-batch-size-to-4-for-memory");
    }

    if (advantageScore < 2) {
      suggestions.push("pattern-may-benefit-from-fuse-or-batch-variant");
    }

    // Chunker-aware
    let chunkPlan = null;
    if (chunkContext && this.chunkPlanner && typeof this.chunkPlanner.plan === "function") {
      const plannerInput = {
        page: chunkContext.page || "gpu",
        chunkProfile: chunkContext.chunkProfile || "gpu",
        mode: chunkContext.mode || "fast",
        presence: chunkContext.presence || "active",
        gpuCapable: chunkContext.gpuCapable !== false,
        trust: chunkContext.trust || "trusted",
        risk: chunkContext.risk || "low",
        gateMode: chunkContext.gateMode || "fast"
      };
      chunkPlan = this.chunkPlanner.plan(plannerInput);
      if (chunkPlan && chunkPlan.strategy === "fallback") {
        suggestions.push("gpu-chunk-planner-recommended-fallback-layout");
      } else if (chunkPlan && chunkPlan.strategy === "aggressive_gpu") {
        suggestions.push("gpu-chunk-planner-recommends-aggressive-gpu-layout");
      } else if (chunkPlan && chunkPlan.strategy === "safe_minimal") {
        suggestions.push("gpu-chunk-planner-recommends-safe-minimal-layout");
      }
    }

    // Worker-aware: decide if this dispatch should be offloaded to worker GPU lane
    let workerPlan = null;
    if (this.processWorker && typeof this.processWorker.plan === "function") {
      workerPlan = this.processWorker.plan({
        jobId: dispatch.jobId,
        pattern: dispatch.pattern,
        modeKind: dispatch.modeKind,
        advantageScore,
        pressureSnapshot,
        gpuLane: dispatch.gpuLane || "primary"
      });

      if (workerPlan && workerPlan.route === "worker") {
        suggestions.push("route-dispatch-to-worker-gpu-lane");
      } else if (workerPlan && workerPlan.route === "primary") {
        suggestions.push("keep-dispatch-on-primary-gpu-lane");
      }
    }

    const level =
      suggestions.length === 0 ? "none" :
      suggestions.length <= 2 ? "mild" :
      "strong";

    const hint = {
      ts: Date.now(),
      meta: {
        id: this.config.id,
        version: GPURole.version
      },
      level,
      modeKind: dispatch.modeKind,
      modeBias,
      advantageScore,
      suggestions,
      chunkPlan,
      workerPlan
    };
    this._log("gpu:intelligent-hint-v30-immortal+++", { hint });
    return hint;
  }

  // -------------------------------------------------------------------------
  //  Prewarm / chunk preheat hook (chunker + warm-path aware)
// -------------------------------------------------------------------------
  prewarmChunks(hints = {}) {
    if (!this.chunkCache || typeof this.chunkCache.prewarm !== "function") {
      return null;
    }

    const warmHints = this._computeWarmPathHints("gpu-prewarm", {
      chunkProfile: hints.chunkProfile || "gpu",
      gpuCapable: hints.gpuCapable !== false,
      trust: hints.trust || "trusted",
      risk: hints.risk || "low",
      pulseStream: hints.pulseStream || "continuous",
      fastLane: hints.fastLane || "enabled",
      page: hints.page || "gpu-organ"
    });

    const payload = {
      ts: Date.now(),
      hints: {
        ...hints,
        warmPathHints: warmHints
      }
    };

    const result = this.chunkCache.prewarm(payload);
    this._log("gpu:prewarm-chunks-v30-immortal+++", { payload, result });
    return result;
  }

  // -------------------------------------------------------------------------
  //  Diagnostics
  // -------------------------------------------------------------------------
  diagnostics() {
    const diag = {
      GPURole,
      GPUMetaBlock,
      chunkPlannerMeta: {
        AI_EXPERIENCE_META_PulseGPUChunkPlanner,
        ORGAN_META_PulseGPUChunkPlanner,
        ORGAN_CONTRACT_PulseGPUChunkPlanner
      },
      dualGpu: true
    };
    this._log("gpu:diagnostics-v30-immortal+++", { diag });
    return diag;
  }

  // -------------------------------------------------------------------------
  //  Internal helpers
  // -------------------------------------------------------------------------
  _computeWarmPathHints(pattern, input) {
    try {
      if (!this.warmPathCache || typeof this.warmPathCache.compute !== "function") {
        return null;
      }
      const base = {
        ...input,
        page: input.page || "gpu-organ",
        chunkProfile: input.chunkProfile || "gpu"
      };
      const hints = this.warmPathCache.compute(base);
      return {
        ...hints,
        pattern
      };
    } catch {
      return null;
    }
  }

  _snapshotChunkCache() {
    try {
      if (!this.chunkCache || typeof this.chunkCache.snapshot !== "function") return null;
      return this.chunkCache.snapshot();
    } catch {
      return null;
    }
  }

  _safeCall(target, method) {
    try {
      if (!target || typeof target[method] !== "function") return null;
      return target[method]();
    } catch {
      return null;
    }
  }

  _log(event, payload) {
    try {
      this.logger?.log?.(event, {
        ...payload,
        gpu: {
          identity: GPUMetaBlock.identity,
          version: GPUMetaBlock.version
        }
      });
    } catch {
      // non-fatal
    }
  }
}

// ============================================================================
//  PUBLIC SURFACE — PulseGPU (v30+++)
// ============================================================================
export const PulseGPU = {

  GPUMetaBlock,

  plan(
    earn,
    mode = "normal",
    modeKind = "symbolic",
    pressureSnapshot = null,
    executionContext = {},
    dnaTag = "default-dna",
    version = GPURole.version,
    chunkContext = null,
    gpuLane = "primary"
  ) {
    const jobId   = earn.jobId;
    const pattern = earn.pattern || "gpu-default";
    const payload = earn.payload || {};
    const lineage = earn.lineage || [];
    return createGPUDispatch({
      jobId,
      pattern,
      payload,
      mode,
      modeKind,
      parentLineage: lineage,
      pressureSnapshot,
      executionContext,
      dnaTag,
      version,
      chunkContext,
      gpuLane
    });
  },

  evolve(dispatch, context = {}) {
    return evolveGPUDispatch(dispatch, context);
  },

  diagnostics() {
    return {
      GPURole,
      GPUMetaBlock
    };
  }
};

// ============================================================================
//  FACTORY — createPulseGPUImmortal (v30+++)
// ============================================================================
export function createPulseGPUImmortal(config = {}) {
  const core = new PulseGPUImmortal(config);

  return Object.freeze({
    meta: GPUMetaBlock,
    describeGpuPlan: (pattern, options, env) =>
      core.describeGpuPlan(pattern, options, env),
    snapshotGpuSurface: () => core.snapshotGpuSurface(),
    intelligentComputeHint: (dispatch, chunkContext) =>
      core.intelligentComputeHint(dispatch, chunkContext),
    prewarmChunks: (hints) => core.prewarmChunks(hints),
    diagnostics: () => core.diagnostics()
  });
}

// ============================================================================
//  DEFAULT EXPORT — Bridge
// ============================================================================
const PulseGPUBridge = PulseProofBridge;
export default PulseGPUBridge;
