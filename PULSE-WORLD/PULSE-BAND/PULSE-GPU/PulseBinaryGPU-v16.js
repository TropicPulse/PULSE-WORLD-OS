// ============================================================================
//  PulseBinaryGPU-v16-Immortal — BINARY GPU ORGAN (FULL v16 UPGRADE)
//  Deterministic GPU Dispatch Organ • Pattern + Lineage + Shape + Presence
//  Binary/Dual-Mode • Pressure-Aware • Factoring-Aware • Mesh/Aura/Earn-Aware
//  “PLAN ONCE. REUSE FOREVER. NEVER DRIFT.”
// ============================================================================

/*
AI_EXPERIENCE_META:
  organ: PulseBinaryGPU
  version: 16.0.0
  tier: IMMORTAL
  role: gpu_binary_surface
  mind: false

  description:
    "IMMORTAL binary GPU organ. Deterministic dispatch descriptor with full
     lineage, shape, pressure, factoring, and presence awareness. Provides
     v16-level snapshots, advantage view, and prewarm hooks. No AI reasoning."

  guarantees:
    - "Never mutates input payloads."
    - "Never performs AI reasoning."
    - "Never executes GPU kernels directly."
    - "Always emits deterministic dispatch descriptors."
    - "Always preserves lineage and shape signatures."
    - "Always remains drift-proof and mutation-safe."

  boundaries:
    - "Cannot alter routing decisions outside its descriptor."
    - "Cannot infer correctness or intent."
    - "Cannot generate opinions or narratives."
    - "Cannot call AI models."

  identity:
    band: "gpu_binary"
    type: "organ"
    mind: false
    immutable: true

  lineage:
    parent: "PulseBinaryGPU-v12-Evo-Presence-Max"
    evolution: "v16 IMMORTAL — full advantage + snapshot + prewarm upgrade"

  integration:
    receives:
      - pressureSnapshot (mesh/aura/earn pressure)
      - factoringSnapshot
      - gpuCoreView (PulseGPUCore-v16)
      - chunkCache / prewarm hooks
    feeds:
      - PulseWorldCore (worldSnapshot.raw.gpuBinary)
      - PulseTrustEvidence (RAW/RAW_AI evidence)
      - Debug / infra tools

  contract:
    input:
      - plan(earn, mode, pressureSnapshot, factoringSnapshot, context, dnaTag, version)
      - evolve(dispatch, context)
      - describeBinaryPlan(pattern, options, env)
      - snapshotBinarySurface()
      - prewarmBinaryChunks(hints)
    output:
      - binaryDispatchDescriptor
      - evolvedBinaryDispatchDescriptor
      - binaryPlanSnapshot
      - binarySurfaceSnapshot

  immortal:
    drift_protection: true
    mutation_protection: true
    deterministic: true
*/

// ---------------------------------------------------------------------------
//  IMPORTS (as in v12)
// ---------------------------------------------------------------------------

import * as PulseGPUBrain              from "./PulseGPUBrain.js";
import * as PulseGPUDrive              from "./PulseGPUDrive.js";
import * as PulseGPUDriveCenter        from "./PulseGPUDriveCenter.js";
import * as PulseGPUDriveEngine        from "./PulseGPUDriveCenter.js";      // alias
import * as PulseGPUSpine              from "./PulseGPUSpine.js";
import * as PulseGPUGeneticMemory      from "./PulseGPUGeneticMemory.js";

import * as PulseGPUAstralMuscleSystem from "./PulseGPUAstralMuscleSystem.js";

import * as PulseGPUGuardianCortex     from "./PulseGPUGuardianCortex.js";
import * as PulseGPULymphNodes         from "./PulseGPULymphNodes.js";

import * as PulseGPUAstralNervousSystem from "./PulseGPUAstralNervousSystem.js";
import * as PulseGPUNervousSystem       from "./PulseGPUNervousSystem.js";

import * as PulseGPUCognitiveLayer      from "./PulseGPUCognitiveLayer.js";
import * as PulseGPUCognitiveIntelligence from "./PulseGPUCognitiveIntelligence.js";
import * as PulseGPUWisdomCortex        from "./PulseGPUWisdomCortex.js";

import * as PulseGPUSurvivalInstincts   from "./PulseGPUSurvivalInstincts.js";

import * as PulseGPUSynapses            from "./PulseGPUSynapses.js";

import * as PulseGPUCommandments        from "./PulseGPUCommandments.js";

import {
  PulseNetBoot,
  PulseNet,
  PulseProofBridge
} from "../../PULSE-UI/_BACKEND/PULSE-WORLD-BRIDGE.js";


// --- PULSE-CORE MEMORY SPINE (FULL SPINE) ----------------------------------
import PulseCoreMemory                from "../PULSE-CORE/PulseCoreMemory-v24.js";
import PulseCoreAIMemoryAdapter      from "../PULSE-CORE/PulseCoreAIMemoryAdapter-v20.js";
import PulseCoreGPUMemoryAdapter      from "../PULSE-CORE/PulseCoreGpuMemoryAdapter-v20.js";
import PulseCoreEarnMemoryAdapter     from "../PULSE-CORE/PulseCoreEarnMemoryAdapter-v20.js";
import PulseBinaryCoreOverlay         from "../PULSE-CORE/PulseBinaryCoreOverlay-v20.js";


// CoreMemory bridge: structural, deterministic, keyed by memory surfaces.
export const CoreMemory = Object.freeze({
  raw: () => PulseCoreMemory,
  all: () => PulseCoreAIMemoryAdapter,
  gpu: () => PulseCoreGPUMemoryAdapter,
  earn: () => PulseCoreEarnMemoryAdapter,
  binaryOverlay: () => PulseBinaryCoreOverlay
});

// ---------------------------------------------------------------------------
//  CORE ROLE / METABLOCK — UPGRADED TO v16
// ---------------------------------------------------------------------------

export const BinaryGPURole = {
  type: "GPU",
  subsystem: "PulseGPU",
  layer: "ComputeOrgan",
  version: "16.0-Immortal",
  identity: "PulseBinaryGPU-v16-Immortal",

  evo: {
    driftProof: true,
    patternAware: true,
    lineageAware: true,
    shapeAware: true,
    modeAware: true,
    pressureAware: true,
    deterministicDispatch: true,
    futureEvolutionReady: true,

    unifiedAdvantageField: true,
    pulseEfficiencyAware: true,
    advantageCascadeAware: true,
    multiInstanceReady: true,

    signalFactoringAware: true,
    meshPressureAware: true,
    auraPressureAware: true,

    binaryAware: true,
    dualModeAware: true,

    presenceAware: true,
    dnaAware: true,
    versionAware: true,

    zeroCompute: true,
    zeroMutation: true,
    zeroRoutingInfluence: true
  },

  pulseContract: "Pulse-v4-Presence",
  meshContract: "PulseMeshSpine-v16",
  routerContract: "PulseRouter-v16",
  sendContract: "PulseSend-v16",
  earnContract: "Earn-v6-Immortal"
};

export const BinaryGPUMetaBlock = {
  identity: "PulseBinaryGPU",
  subsystem: "PulseGPU",
  layer: "ComputeOrgan",
  role: "Binary-GPU-Dispatch",
  version: "16.0-Immortal",
  evo: BinaryGPURole.evo
};

// ---------------------------------------------------------------------------
//  INTERNAL HELPERS — deterministic, tiny, pure (from v12, unchanged)
// ---------------------------------------------------------------------------

function buildLineage(parentLineage, pattern) {
  const base = Array.isArray(parentLineage) ? parentLineage : [];
  return [...base, pattern];
}

function computeShapeSignature(pattern, lineage, binaryMode, dualMode) {
  const lineageKey = lineage.join("::");
  const modeKey = binaryMode ? "binary" : dualMode ? "dual" : "symbolic";
  const raw = `gpu::${modeKey}::${pattern}::${lineageKey}`;

  let acc = 0;
  for (let i = 0; i < raw.length; i++) {
    acc = (acc + raw.charCodeAt(i) * (i + 1)) % 100000;
  }

  return `gpu-shape-${modeKey}-${acc}`;
}

function computeDispatchSignature(pattern, binaryMode, dualMode, profileStyle) {
  const modeKey = binaryMode ? "binary" : dualMode ? "dual" : "symbolic";
  const raw = `dispatch::${modeKey}::${pattern}::${profileStyle}`;
  let acc = 0;
  for (let i = 0; i < raw.length; i++) {
    acc = (acc * 31 + raw.charCodeAt(i)) % 100000;
  }
  return `gpu-dispatch-${modeKey}-${acc}`;
}

function computeEvolutionStage(pattern, lineage, binaryMode, dualMode) {
  const depth = lineage.length;

  if (depth === 1) return binaryMode ? "seed-binary" : dualMode ? "seed-dual" : "seed";
  if (depth === 2) return binaryMode ? "sprout-binary" : dualMode ? "sprout-dual" : "sprout";
  if (depth === 3) return binaryMode ? "branch-binary" : dualMode ? "branch-dual" : "branch";

  if (pattern.includes("fuse")) return binaryMode ? "fused-kernel-binary" : "fused-kernel";
  if (pattern.includes("batch")) return binaryMode ? "batched-binary" : "batched";
  if (pattern.includes("stream")) return binaryMode ? "streaming-binary" : "streaming";
  if (pattern.includes("fallback")) return "fallback-aware";

  return binaryMode ? "mature-binary" : dualMode ? "mature-dual" : "mature";
}

function computeModeBias(mode, pressure, factoringSnapshot) {
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
  const factoringPressure = factoringSnapshot?.factoringPressure || 0;

  if (gpuLoad > 0.7 || thermal > 0.7 || meshStorm > 0.6) {
    bias = "fallback-friendly";
  } else if (mem > 0.7) {
    bias = "memory-conservative";
  }

  if (factoringPressure > 0.5 || auraTension > 0.5) {
    bias = "stability-first";
  }

  return bias;
}

function selectDispatchProfile(pattern, modeBias, binaryMode, dualMode, multiInstanceHint) {
  const base = {
    style: "neutral",
    kernelType: "standard",
    maxBatchSize: 1,
    allowFusion: false,
    allowStreaming: false,
    allowFallbackCPU: true,
    binaryOptimized: false,
    dualModeOptimized: false,
    multiInstanceOptimized: !!multiInstanceHint
  };

  const mark = (profile) => ({
    ...profile,
    binaryOptimized: !!binaryMode,
    dualModeOptimized: !!dualMode,
    multiInstanceOptimized: !!multiInstanceHint
  });

  if (pattern.includes("fuse")) {
    return mark({
      style: "fused",
      kernelType: "fused",
      maxBatchSize: binaryMode ? 16 : 8,
      allowFusion: true,
      allowStreaming: false,
      allowFallbackCPU: true
    });
  }

  if (pattern.includes("batch")) {
    return mark({
      style: "batched",
      kernelType: "batched",
      maxBatchSize: binaryMode ? 128 : 32,
      allowFusion: false,
      allowStreaming: true,
      allowFallbackCPU: true
    });
  }

  if (pattern.includes("stream")) {
    return mark({
      style: "streaming",
      kernelType: "streaming",
      maxBatchSize: binaryMode ? 8 : 4,
      allowFusion: false,
      allowStreaming: true,
      allowFallbackCPU: true
    });
  }

  if (modeBias === "low-latency") {
    return mark({
      style: "latency-first",
      kernelType: "standard",
      maxBatchSize: 1,
      allowFusion: false,
      allowStreaming: false,
      allowFallbackCPU: true
    });
  }

  if (modeBias === "high-throughput") {
    return mark({
      style: "throughput-first",
      kernelType: "batched",
      maxBatchSize: binaryMode ? 256 : 64,
      allowFusion: true,
      allowStreaming: true,
      allowFallbackCPU: true
    });
  }

  if (modeBias === "fallback-friendly") {
    return mark({
      style: "fallback-aware",
      kernelType: "standard",
      maxBatchSize: 2,
      allowFusion: false,
      allowStreaming: false,
      allowFallbackCPU: true
    });
  }

  if (modeBias === "memory-conservative") {
    return mark({
      style: "memory-conservative",
      kernelType: "standard",
      maxBatchSize: 4,
      allowFusion: false,
      allowStreaming: false,
      allowFallbackCPU: true
    });
  }

  if (modeBias === "stability-first") {
    return mark({
      style: "stability-first",
      kernelType: "standard",
      maxBatchSize: 2,
      allowFusion: false,
      allowStreaming: false,
      allowFallbackCPU: true
    });
  }

  return mark(base);
}

function resolveBinaryModeSurface(context = {}) {
  const flags = context.flags || {};
  const binaryMode = !!(flags.binary_mode || context.binaryMode);
  const dualMode = !!(flags.dual_mode || context.dualMode);

  return { binaryMode, dualMode };
}

function computeAdvantageScore({ pattern, modeBias, binaryMode, dualMode, pressureSnapshot }) {
  let score = 0;

  if (binaryMode) score += 2;
  if (dualMode) score += 1;

  if (pattern.includes("fuse")) score += 2;
  if (pattern.includes("batch")) score += 2;
  if (pattern.includes("stream")) score += 1;

  if (modeBias === "high-throughput") score += 2;
  if (modeBias === "low-latency") score += 1;

  const gpuLoad = pressureSnapshot?.gpuLoadPressure || 0;
  if (gpuLoad < 0.3) score += 1;

  return score;
}

// ---------------------------------------------------------------------------
//  v16 DISPATCH FACTORY (based on v12, version bumped, meta enriched)
// ---------------------------------------------------------------------------

export function createBinaryGPUDispatch({
  jobId,
  pattern,
  payload = {},
  mode = "normal",
  parentLineage = null,
  pressureSnapshot = null,
  factoringSnapshot = null,
  context = {},
  dnaTag = "default-dna",
  version = "16.0-Immortal"
}) {
  const { binaryMode, dualMode } = resolveBinaryModeSurface(context);

  const lineage        = buildLineage(parentLineage, pattern);
  const shapeSignature = computeShapeSignature(pattern, lineage, binaryMode, dualMode);
  const evolutionStage = computeEvolutionStage(pattern, lineage, binaryMode, dualMode);
  const modeBias       = computeModeBias(mode, pressureSnapshot || {}, factoringSnapshot || {});
  const multiInstanceHint = !!context.multiInstance;
  const profile        = selectDispatchProfile(
    pattern,
    modeBias,
    binaryMode,
    dualMode,
    multiInstanceHint
  );
  const dispatchSignature = computeDispatchSignature(
    pattern,
    binaryMode,
    dualMode,
    profile.style
  );

  const advantageScore = computeAdvantageScore({
    pattern,
    modeBias,
    binaryMode,
    dualMode,
    pressureSnapshot: pressureSnapshot || {}
  });

  const executionContext = {
    binaryMode: binaryMode ? "binary" : dualMode ? "dual" : "non-binary",
    pipelineId: context.pipelineId || "",
    sceneType: context.sceneType || "",
    workloadClass: context.workloadClass || "",
    resolution: context.resolution || "",
    refreshRate: context.refreshRate || 0,
    instanceId: context.instanceId || "",
    multiInstance: multiInstanceHint,
    dispatchSignature,
    shapeSignature
  };

  return {
    GPURole: BinaryGPURole,
    metaBlock: BinaryGPUMetaBlock,
    jobId,
    pattern,
    payload,
    mode,
    lineage,
    binaryMode,
    dualMode,
    dnaTag,
    version,
    executionContext,
    meta: {
      shapeSignature,
      dispatchSignature,
      evolutionStage,
      modeBias,
      profile,
      advantageScore,
      pressureSnapshot: pressureSnapshot || {},
      factoringSnapshot: factoringSnapshot || {}
    }
  };
}

// ---------------------------------------------------------------------------
//  v16 EVOLUTION ENGINE
// ---------------------------------------------------------------------------

export function evolveBinaryGPUDispatch(dispatch, context = {}) {
  const { mode: nextMode, pressureSnapshot, factoringSnapshot, ...ctxRest } = context;

  const modeLabel = nextMode || dispatch.mode || "normal";
  const lineage   = Array.isArray(dispatch.lineage) ? dispatch.lineage : [];
  const pattern   = dispatch.pattern;

  const { binaryMode, dualMode } = resolveBinaryModeSurface({
    ...ctxRest,
    flags: {
      ...(ctxRest.flags || {}),
      binary_mode: dispatch.binaryMode,
      dual_mode: dispatch.dualMode
    },
    binaryMode: dispatch.binaryMode,
    dualMode: dispatch.dualMode
  });

  const nextLineage       = buildLineage(lineage, pattern);
  const shapeSignature    = computeShapeSignature(pattern, nextLineage, binaryMode, dualMode);
  const evolutionStage    = computeEvolutionStage(pattern, nextLineage, binaryMode, dualMode);
  const modeBias          = computeModeBias(
    modeLabel,
    pressureSnapshot || dispatch.meta?.pressureSnapshot || {},
    factoringSnapshot || dispatch.meta?.factoringSnapshot || {}
  );
  const multiInstanceHint = !!ctxRest.multiInstance || !!dispatch.executionContext?.multiInstance;
  const profile           = selectDispatchProfile(
    pattern,
    modeBias,
    binaryMode,
    dualMode,
    multiInstanceHint
  );
  const dispatchSignature = computeDispatchSignature(
    pattern,
    binaryMode,
    dualMode,
    profile.style
  );

  const advantageScore = computeAdvantageScore({
    pattern,
    modeBias,
    binaryMode,
    dualMode,
    pressureSnapshot: pressureSnapshot || dispatch.meta?.pressureSnapshot || {}
  });

  const prevExec = dispatch.executionContext || {};
  const executionContext = {
    binaryMode: binaryMode ? "binary" : dualMode ? "dual" : "non-binary",
    pipelineId: ctxRest.pipelineId || prevExec.pipelineId || "",
    sceneType: ctxRest.sceneType || prevExec.sceneType || "",
    workloadClass: ctxRest.workloadClass || prevExec.workloadClass || "",
    resolution: ctxRest.resolution || prevExec.resolution || "",
    refreshRate: ctxRest.refreshRate || prevExec.refreshRate || 0,
    instanceId: ctxRest.instanceId || prevExec.instanceId || "",
    multiInstance: multiInstanceHint,
    dispatchSignature,
    shapeSignature
  };

  return {
    GPURole: BinaryGPURole,
    metaBlock: BinaryGPUMetaBlock,
    jobId: dispatch.jobId,
    pattern,
    payload: dispatch.payload,
    mode: modeLabel,
    lineage: nextLineage,
    binaryMode,
    dualMode,
    dnaTag: dispatch.dnaTag || "default-dna",
    version: dispatch.version || "16.0-Immortal",
    executionContext,
    meta: {
      shapeSignature,
      dispatchSignature,
      evolutionStage,
      modeBias,
      profile,
      advantageScore,
      pressureSnapshot: pressureSnapshot || dispatch.meta?.pressureSnapshot || {},
      factoringSnapshot: factoringSnapshot || dispatch.meta?.factoringSnapshot || {}
    }
  };
}

// ---------------------------------------------------------------------------
//  IMMORTAL SURFACE CLASS — SNAPSHOT + ADVANTAGE + PREWARM
// ---------------------------------------------------------------------------

export class PulseBinaryGPUImmortal {
  constructor(config = {}) {
    this.config = {
      id: BinaryGPURole.identity,
      ...config
    };

    this.pressure = config.pressure || null;   // mesh/aura/earn pressure provider
    this.factoring = config.factoring || null; // factoring provider
    this.gpuCore = config.gpuCore || null;     // PulseGPUCore-v16
    this.chunkCache = config.chunkCache || null;

    this.logger = config.logger || console;
  }

  // v16: structural plan description (no change to dispatch math)
  describeBinaryPlan(pattern, options = {}, env = {}) {
    const parentLineage = options.parentLineage || [];
    const binaryMode = !!options.binaryMode;
    const dualMode = !!options.dualMode;
    const mode = options.mode || env.mode || "normal";
    const multiInstanceHint = options.multiInstanceHint || env.multiInstanceHint || false;

    const pressureSnapshot =
      options.pressureSnapshot ||
      env.pressureSnapshot ||
      this._safeCall(this.pressure, "snapshot") ||
      null;

    const factoringSnapshot =
      options.factoringSnapshot ||
      env.factoringSnapshot ||
      this._safeCall(this.factoring, "snapshot") ||
      null;

    const lineage = buildLineage(parentLineage, pattern);
    const shapeSignature = computeShapeSignature(pattern, lineage, binaryMode, dualMode);
    const evolutionStage = computeEvolutionStage(pattern, lineage, binaryMode, dualMode);
    const modeBias = computeModeBias(mode, pressureSnapshot || {}, factoringSnapshot || {});
    const profile = selectDispatchProfile(
      pattern,
      modeBias,
      binaryMode,
      dualMode,
      multiInstanceHint
    );
    const dispatchSignature = computeDispatchSignature(
      pattern,
      binaryMode,
      dualMode,
      profile.style
    );
    const advantageScore = computeAdvantageScore({
      pattern,
      modeBias,
      binaryMode,
      dualMode,
      pressureSnapshot: pressureSnapshot || {}
    });

    const plan = {
      ts: Date.now(),
      meta: {
        id: this.config.id,
        version: BinaryGPURole.version
      },
      pattern,
      lineage,
      binaryMode,
      dualMode,
      mode,
      modeBias,
      evolutionStage,
      shapeSignature,
      dispatchSignature,
      profile,
      advantageScore,
      pressureSnapshot,
      factoringSnapshot
    };

    this._log("binary-gpu:plan-v16", { plan });
    return plan;
  }

  // v16: surface snapshot for world/trust
  snapshotBinarySurface() {
    const gpuView =
      this._safeCall(this.gpuCore, "buildGpuView") ||
      this._safeCall(this.gpuCore, "snapshotGPU") ||
      null;

    const pressureSnapshot = this._safeCall(this.pressure, "snapshot") || null;
    const factoringSnapshot = this._safeCall(this.factoring, "snapshot") || null;

    const snapshot = {
      ts: Date.now(),
      meta: {
        id: this.config.id,
        version: BinaryGPURole.version
      },
      gpuView,
      pressureSnapshot,
      factoringSnapshot,
      chunkCache: this._snapshotChunkCache()
    };

    this._log("binary-gpu:snapshot-surface-v16", { snapshot });
    return snapshot;
  }

  
    // Intelligent compute hint — advisory only, no execution
    intelligentComputeHint(dispatch) {
      if (!dispatch || !dispatch.meta) {
        return {
          level: "none",
          reason: "no-dispatch",
          suggestions: []
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
  
      const level =
        suggestions.length === 0 ? "none" :
        suggestions.length <= 2 ? "mild" :
        "strong";
  
      const hint = {
        ts: Date.now(),
        meta: {
          id: this.config.id,
          version: BinaryGPURole.version
        },
        level,
        modeKind: dispatch.modeKind,
        modeBias,
        advantageScore,
        suggestions
      };
  
      this._log("binary-gpu:intelligent-hint-v16", { hint });
      return hint;
    }

  // v16: prewarm / chunk preheat hook
  prewarmBinaryChunks(hints = {}) {
    if (!this.chunkCache || typeof this.chunkCache.prewarm !== "function") {
      return null;
    }

    const payload = {
      ts: Date.now(),
      hints
    };

    const result = this.chunkCache.prewarm(payload);
    this._log("binary-gpu:prewarm-chunks-v16", { payload, result });
    return result;
  }

  diagnostics() {
    const diag = {
      GPURole: BinaryGPURole,
      metaBlock: BinaryGPUMetaBlock
    };
    this._log("binary-gpu:diagnostics-v16", { diag });
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
        binaryGPU: {
          identity: BinaryGPUMetaBlock.identity,
          version: BinaryGPUMetaBlock.version
        }
      });
    } catch {
      // non-fatal
    }
  }
}

// ---------------------------------------------------------------------------
//  PUBLIC ORGAN — PulseBinaryGPU (v16-Immortal)
// ---------------------------------------------------------------------------

export const PulseBinaryGPU = {
  GPURole: BinaryGPURole,
  BinaryGPUMetaBlock,

  plan(
    earn,
    mode = "normal",
    pressureSnapshot = null,
    factoringSnapshot = null,
    context = {},
    dnaTag = "default-dna",
    version = "16.0-Immortal"
  ) {
    const jobId   = earn.jobId;
    const pattern = earn.pattern || "gpu-binary-default";
    const payload = earn.payload || {};
    const lineage = earn.lineage || [];

    const ctx = {
      ...context,
      flags: {
        ...(context.flags || {}),
        binary_mode: true
      }
    };

    return createBinaryGPUDispatch({
      jobId,
      pattern,
      payload,
      mode,
      parentLineage: lineage,
      pressureSnapshot,
      factoringSnapshot,
      context: ctx,
      dnaTag,
      version
    });
  },

  evolve(dispatch, context = {}) {
    return evolveBinaryGPUDispatch(dispatch, context);
  },

  diagnostics() {
    return {
      GPURole: BinaryGPURole,
      metaBlock: BinaryGPUMetaBlock
    };
  }
};

// ---------------------------------------------------------------------------
//  FACTORY FOR IMMORTAL SURFACE
// ---------------------------------------------------------------------------

export function createPulseBinaryGPUImmortal(config = {}) {
  const core = new PulseBinaryGPUImmortal(config);

  return Object.freeze({
    meta: BinaryGPUMetaBlock,
    describeBinaryPlan: (pattern, options, env) =>
      core.describeBinaryPlan(pattern, options, env),
    snapshotBinarySurface: () => core.snapshotBinarySurface(),
    prewarmBinaryChunks: (hints) => core.prewarmBinaryChunks(hints),
    diagnostics: () => core.diagnostics()
  });
}
const PulseGPUBridge = PulseProofBridge;
export default PulseGPUBridge;