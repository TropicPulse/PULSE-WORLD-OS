
// ============================================================================
//  PulseGPU-v24-IMMORTAL++ — UNIFIED GPU ORGAN (FULL v24++ UPGRADE)
//  Deterministic GPU Dispatch Organ • Pattern + Lineage + Shape + Presence
//  Dual-Mode: Binary + Symbolic • Multi-Instance • Advantage + Chunker Aware
//  “PLAN ONCE. REUSE FOREVER. NEVER DRIFT.”
//  • Metadata-only, zero GPU calls, zero side effects
// ============================================================================
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝

// ---------------------------------------------------------------------------
//  IMPORTS — v24 IMMORTAL++
// ---------------------------------------------------------------------------

import * as PulseGPUBrain                from "./PulseGPUBrain-v24.js";
import * as PulseGPUDrive                from "./PulseGPUDrive-v24.js";
import * as PulseGPUDriveCenter          from "./PulseGPUDriveCenter-v24.js";
import * as PulseGPUDriveEngine          from "./PulseGPUDriveCenter-v24.js"; // alias
import * as PulseGPUSpine                from "./PulseGPUSpine-v24.js";
import * as PulseGPUGeneticMemory        from "./PulseGPUGeneticMemory-v24.js";

import * as PulseGPUAstralMuscleSystem   from "./PulseGPUAstralMuscleSystem-v24.js";

import * as PulseGPUGuardianCortex       from "./PulseGPUGuardianCortex-v24.js";
import * as PulseGPULymphNodes           from "./PulseGPULymphNodes-v30.js";

import * as PulseGPUAstralNervousSystem  from "./PulseGPUAstralNervousSystem-v24.js";
import * as PulseGPUNervousSystem        from "./PulseGPUNervousSystem-v24.js";

import * as PulseGPUCognitiveIntelligence from "./PulseGPUCognitiveIntelligence-v24.js";
import * as PulseGPUCognitiveLayer        from "./PulseGPUCognitiveLayer-v24.js"; // cognitive layer / restorer v24++
import * as PulseGPUWisdomCortex         from "./PulseGPUWIsdomCortex-v24.js";

import * as PulseGPUSurvivalInstincts    from "./PulseGPUSurvivalInstincts-v24.js";

import * as PulseGPUSynapses             from "./PulseGPUSynapses-v24.js";

import * as PulseGPUCommandments         from "./PulseGPUCommandments-v24.js";

import {
  AI_EXPERIENCE_META_PulseGPUChunkPlanner,
  ORGAN_META_PulseGPUChunkPlanner,
  ORGAN_CONTRACT_PulseGPUChunkPlanner,
  PulseGPUChunkPlanner
} from "./PulseGPUChunkPlanner-v24.js";

import {
  PulseNetBoot,
  PulseNet,
  PulseProofBridge
} from "../../PULSE-UI/____BACKEND/PULSE-WORLD-BRIDGE.js";

// --- PULSE-CORE MEMORY SPINE (FULL SPINE) ----------------------------------
import PulseCoreMemory                   from "../PULSE-CORE/PulseCoreMemory-v24.js";
import PulseCoreAIMemoryAdapter          from "../PULSE-CORE/PulseCoreAIMemoryAdapter-v20.js";
import PulseCoreGPUMemoryAdapter         from "../PULSE-CORE/PulseCoreGpuMemoryAdapter-v20.js";
import PulseCoreProxyMemoryAdapter       from "../PULSE-CORE/PulseCoreProxyMemoryAdapter-v20.js";
import PulseCoreEarnMemoryAdapter        from "../PULSE-CORE/PulseCoreEarnMemoryAdapter-v20.js";
import PulseBinaryCoreOverlay            from "../PULSE-CORE/PulseCoreBinaryOverlay-v20.js";

// CoreMemory bridge: structural, deterministic, keyed by memory surfaces.
export const CoreMemory = Object.freeze({
  raw: () => PulseCoreMemory,
  all: () => PulseCoreAIMemoryAdapter,
  gpu: () => PulseCoreGPUMemoryAdapter,
  proxy: () => PulseCoreProxyMemoryAdapter,
  earn: () => PulseCoreEarnMemoryAdapter,
  binaryOverlay: () => PulseBinaryCoreOverlay
});

// ============================================================================
//  INTERNAL HELPERS
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
//  v24 DISPATCH FACTORY (IMMORTAL++)
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
  version = "24.0-IMMORTAL++",
  chunkContext = null
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
    shapeSignature
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

// ============================================================================
//  v24 EVOLUTION ENGINE (IMMORTAL++)
// ============================================================================

export function evolveGPUDispatch(dispatch, context = {}) {
  const {
    mode: nextMode,
    modeKind: nextModeKind,
    pressureSnapshot,
    executionContext,
    chunkContext
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
    shapeSignature
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
    version: dispatch.version || "24.0-IMMORTAL++",
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
//  IMMORTAL SURFACE — SNAPSHOT + INTELLIGENT COMPUTE HINT (CHUNKER-AWARE)
// ============================================================================

export class PulseGPUImmortal {
  constructor(config = {}) {
    this.config = {
      id: GPURole.identity,
      ...config
    };

    this.pressure    = config.pressure || null;   // mesh/aura/earn pressure provider
    this.gpuCore     = config.gpuCore || null;    // PulseGPUCore-v24
    this.chunkCache  = config.chunkCache || null; // GPU chunk cache / engine
    this.chunkPlanner = config.chunkPlanner || PulseGPUChunkPlanner;

    this.logger = config.logger || console;
  }

  // Pure structural plan description (no execution)
  describeGpuPlan(pattern, options = {}, env = {}) {
    const parentLineage      = options.parentLineage || [];
    const modeKind           = resolveModeKind(options.modeKind || env.modeKind || "symbolic");
    const mode               = options.mode || env.mode || "normal";
    const multiInstanceHint  = options.multiInstanceHint || env.multiInstanceHint || false;

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

    const plan = {
      ts: Date.now(),
      meta: {
        id: this.config.id,
        version: GPURole.version
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
      pressureSnapshot
    };

    this._log("gpu:plan-v24-immortal++", { plan });
    return plan;
  }

  // Surface snapshot for world / trust (chunker-aware)
  snapshotGpuSurface() {
    const gpuView =
      this._safeCall(this.gpuCore, "buildGpuView") ||
      this._safeCall(this.gpuCore, "snapshotGPU") ||
      null;

    const pressureSnapshot = this._safeCall(this.pressure, "snapshot") || null;
    const chunkCacheSnapshot = this._snapshotChunkCache();

    const snapshot = {
      ts: Date.now(),
      meta: {
        id: this.config.id,
        version: GPURole.version
      },
      gpuView,
      pressureSnapshot,
      chunkCache: chunkCacheSnapshot
    };

    this._log("gpu:snapshot-surface-v24-immortal++", { snapshot });
    return snapshot;
  }

  // Intelligent compute hint — advisory only, no execution, chunker-aware
  intelligentComputeHint(dispatch, chunkContext = null) {
    if (!dispatch || !dispatch.meta) {
      return {
        level: "none",
        reason: "no-dispatch",
        suggestions: [],
        chunkPlan: null
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

    // Chunker-aware: if chunkContext indicates misalignment, suggest rechunk
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
      chunkPlan
    };

    this._log("gpu:intelligent-hint-v24-immortal++", { hint });
    return hint;
  }

  // v24++: prewarm / chunk preheat hook (chunker-aware)
  prewarmChunks(hints = {}) {
    if (!this.chunkCache || typeof this.chunkCache.prewarm !== "function") {
      return null;
    }

    const payload = {
      ts: Date.now(),
      hints
    };

    const result = this.chunkCache.prewarm(payload);
    this._log("gpu:prewarm-chunks-v24-immortal++", { payload, result });
    return result;
  }

  diagnostics() {
    const diag = {
      GPURole,
      GPUMetaBlock,
      chunkPlannerMeta: {
        AI_EXPERIENCE_META_PulseGPUChunkPlanner,
        ORGAN_META_PulseGPUChunkPlanner,
        ORGAN_CONTRACT_PulseGPUChunkPlanner
      }
    };
    this._log("gpu:diagnostics-v24-immortal++", { diag });
    return diag;
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
//  PUBLIC ORGAN — PulseGPU (v24-IMMORTAL++, dual-mode, chunker-aware)
// ============================================================================

export const PulseGPU = {

  GPURole,
  GPUMetaBlock,

  plan(
    earn,
    mode = "normal",
    modeKind = "symbolic",
    pressureSnapshot = null,
    executionContext = {},
    dnaTag = "default-dna",
    version = "24.0-IMMORTAL++",
    chunkContext = null
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
      chunkContext
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
//  FACTORY FOR IMMORTAL SURFACE
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

const PulseGPUBridge = PulseProofBridge;
export default PulseGPUBridge;
