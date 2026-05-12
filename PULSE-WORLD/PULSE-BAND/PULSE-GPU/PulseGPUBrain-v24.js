/* global log,warn */
// ============================================================================
//  PULSE GPU BRAIN v24-Immortal++ — THE ANALYST CORTEX / BRAINSTEM
//  CPU-SIDE INTELLIGENCE DIVISION (FULL-GPU, API-AGNOSTIC)
//  PURE LOGIC. PURE DETERMINISM. ZERO SIDE EFFECTS.
//  SYMBOLIC + BINARY AWARE • DISPATCH-AWARE • MEMORY-AWARE • PRESENCE-AWARE
//  PREWARM + CHUNK + CACHE-AWARE • IMMORTAL++ SURFACE • v24 CONTRACTS
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
// ---------------------------------------------------------------------------
//  GPU ORGAN IMPORT SURFACE (v24-Immortal++, awareness only — zero coupling)
//  NOTE: These imports are for identity, contracts, and future intelligent
//        compute hooks. No direct calls here: brain stays pure.
// ---------------------------------------------------------------------------

import * as PulseGPU                   from "./PulseGPU-v24.js";
import * as PulseBinaryGPU             from "./PulseGPUBinary-v24.js";

import * as PulseGPUDrive              from "./PulseGPUDrive-v24.js";
import * as PulseGPUDriveCenter        from "./PulseGPUDriveCenter-v24.js";
import * as PulseGPUDriveEngine        from "./PulseGPUDriveCenter-v24.js"; // alias

import * as PulseGPUSpine              from "./PulseGPUSpine-v24.js";
import * as PulseGPUGeneticMemory      from "./PulseGPUGeneticMemory-v24.js";

import * as PulseGPUAstralMuscleSystem from "./PulseGPUAstralMuscleSystem-v24.js";
import * as PulseGPUAstralNervousSystem from "./PulseGPUAstralNervousSystem-v24.js";

import * as PulseGPUGuardianCortex     from "./PulseGPUGuardianCortex-v24.js";
import * as PulseGPULymphNodes         from "./PulseGPULymphNodes-v24.js";

import * as PulseGPUCognitiveLayer      from "./PulseGPUCognitiveLayer-v24.js";
import * as PulseGPUCognitiveIntelligence from "./PulseGPUCognitiveIntelligence-v24.js";
import * as PulseGPUWisdomCortex        from "./PulseGPUWIsdomCortex-v24.js";

import * as PulseGPUSurvivalInstincts   from "./PulseGPUSurvivalInstincts-v24.js";

import * as PulseGPUSynapses            from "./PulseGPUSynapses-v24.js";

import * as PulseGPUCommandments        from "./PulseGPUCommandments-v24.js";

// Optional: GPU chunker identity (no instantiation here, brain stays pure)
import * as PulseGPUChunker             from "./PulseGPUChunker-v24.js";

log(
  "gpu",
  "PulseGPUBrain v24-Immortal++ — Analyst Cortex / Brainstem active " +
    "(dual-mode + binary + presence + immortal++ surface, PulseSend‑v24‑Immortal++‑ready)."
);

// ------------------------------------------------------
// GLOBAL VERSIONS
// ------------------------------------------------------

const PULSE_GPU_BRAIN_VERSION = "24.0-Immortal++";
const PULSE_GPU_BRAIN_SCHEMA_VERSION = 12; // v8 → v12 schema evolution

// ------------------------------------------------------
// DUAL-MODE + BINARY + PRESENCE ADVANTAGE BLOCK (v24-Immortal++)
// ------------------------------------------------------

const DUAL_MODE_EVO = {
  // Biological / mental
  metabolicBoost: 1.5,
  neuralReflexBoost: 1.6,
  stabilityBoost: 1.8,
  cognitiveStabilityField: true,
  immortalCortexField: true,

  // System / physical
  multiInstanceReady: true,
  deterministicNeuron: true,
  parallelSafe: true,
  fanOutScaling: 1.3,
  clusterCoherence: true,
  zeroDriftCloning: true,
  reflexPropagation: 1.2,
  shaderPipelinePurity: true,

  // Fusion — BOTH layers active
  dualModeEvolution: true,
  organismClusterBoost: 1.4,
  cognitiveComputeLink: true,
  unifiedAdvantageField: true,
  unifiedAdvantageFieldV24: true,
  pulseSend24Ready: true,

  // Binary / symbolic awareness
  binaryAware: true,
  symbolicAware: true,
  gpuDispatchAware: true,
  gpuMemoryAware: true,
  gpuAdvantageAware: true,

  // Prewarm / chunk / cache / presence
  prewarmReady: true,
  chunkCacheReady: true,
  presencePrewarmReady: true,
  intelligentComputeReady: true,

  // Presence / identity
  presenceAware: true,
  dnaAware: true,
  versionAware: true,
  instanceAware: true,

  // PulseSend / organism contracts (conceptual only)
  routingContract: "PulseSend-v24-Immortal++",
  gpuOrganContract: "PulseGPU-v24-Immortal++",
  binaryGpuOrganContract: "PulseBinaryGPU-v24-Immortal++",
  earnCompatibility: "Earn-v24-GPU",
  workgroupLawVersion: 24,
  zeroImportShaderPipeline: true
};

// ------------------------------------------------------
// PACKAGE DEFINITIONS (STRUCTURAL ONLY) — v24-Immortal++, presence-aware
// ------------------------------------------------------

class PulseTexturePackage {
  constructor({
    id = "textures",
    version = PULSE_GPU_BRAIN_SCHEMA_VERSION,
    optimizedTextures = [],
    mipmaps = [],
    atlasMaps = [],
    metadata = {},
    dnaTag = "default-dna"
  } = {}) {
    this.id = id;
    this.version = version;
    this.optimizedTextures = optimizedTextures;
    this.mipmaps = mipmaps;
    this.atlasMaps = atlasMaps;
    this.metadata = {
      layer: "PulseGPUBrain",
      kind: "texture-package",
      target: "full-gpu",
      evo: DUAL_MODE_EVO,
      brainVersion: PULSE_GPU_BRAIN_VERSION,
      schemaVersion: PULSE_GPU_BRAIN_SCHEMA_VERSION,
      dnaTag,
      prewarmReady: true,
      chunkCacheReady: true,
      ...metadata
    };
  }
}

class PulseMeshPackage {
  constructor({
    id = "meshes",
    version = PULSE_GPU_BRAIN_SCHEMA_VERSION,
    lods = [],
    simplifiedMeshes = [],
    clusters = [],
    indices = [],
    metadata = {},
    dnaTag = "default-dna"
  } = {}) {
    this.id = id;
    this.version = version;
    this.lods = lods;
    this.simplifiedMeshes = simplifiedMeshes;
    this.clusters = clusters;
    this.indices = indices;
    this.metadata = {
      layer: "PulseGPUBrain",
      kind: "mesh-package",
      target: "full-gpu",
      evo: DUAL_MODE_EVO,
      brainVersion: PULSE_GPU_BRAIN_VERSION,
      schemaVersion: PULSE_GPU_BRAIN_SCHEMA_VERSION,
      dnaTag,
      prewarmReady: true,
      chunkCacheReady: true,
      ...metadata
    };
  }
}

class PulseLightingPackage {
  constructor({
    id = "lighting",
    version = PULSE_GPU_BRAIN_SCHEMA_VERSION,
    bakedGI = null,
    bakedAO = null,
    shadowData = null,
    reflectionProbes = [],
    metadata = {},
    dnaTag = "default-dna"
  } = {}) {
    this.id = id;
    this.version = version;
    this.bakedGI = bakedGI;
    this.bakedAO = bakedAO;
    this.shadowData = shadowData;
    this.reflectionProbes = reflectionProbes;
    this.metadata = {
      layer: "PulseGPUBrain",
      kind: "lighting-package",
      target: "full-gpu",
      evo: DUAL_MODE_EVO,
      brainVersion: PULSE_GPU_BRAIN_VERSION,
      schemaVersion: PULSE_GPU_BRAIN_SCHEMA_VERSION,
      dnaTag,
      presencePrewarmReady: true,
      ...metadata
    };
  }
}

class PulseAnimationPackage {
  constructor({
    id = "animation",
    version = PULSE_GPU_BRAIN_SCHEMA_VERSION,
    bakedFrames = [],
    transitions = [],
    skeletonData = null,
    metadata = {},
    dnaTag = "default-dna"
  } = {}) {
    this.id = id;
    this.version = version;
    this.bakedFrames = bakedFrames;
    this.transitions = transitions;
    this.skeletonData = skeletonData;
    this.metadata = {
      layer: "PulseGPUBrain",
      kind: "animation-package",
      target: "full-gpu",
      evo: DUAL_MODE_EVO,
      brainVersion: PULSE_GPU_BRAIN_VERSION,
      schemaVersion: PULSE_GPU_BRAIN_SCHEMA_VERSION,
      dnaTag,
      intelligentComputeReady: true,
      ...metadata
    };
  }
}

class PulseShaderPackage {
  constructor({
    id = "shaders",
    version = PULSE_GPU_BRAIN_SCHEMA_VERSION,
    compiledVariants = [],
    pipelineStates = [],
    metadata = {},
    dnaTag = "default-dna"
  } = {}) {
    this.id = id;
    this.version = version;
    this.compiledVariants = compiledVariants;
    this.pipelineStates = pipelineStates;
    this.metadata = {
      layer: "PulseGPUBrain",
      kind: "shader-package",
      target: "full-gpu",
      evo: DUAL_MODE_EVO,
      brainVersion: PULSE_GPU_BRAIN_VERSION,
      schemaVersion: PULSE_GPU_BRAIN_SCHEMA_VERSION,
      shaderContract: "WGSL-v24-Immortal++",
      dnaTag,
      zeroImportShaderPipeline: true,
      ...metadata
    };
  }
}

class PulseRenderPlanPackage {
  constructor({
    id = "render-plan",
    version = PULSE_GPU_BRAIN_SCHEMA_VERSION,
    renderPasses = [],
    drawLists = [],
    materialBatches = [],
    frameGraph = null,
    metadata = {},
    dnaTag = "default-dna"
  } = {}) {
    this.id = id;
    this.version = version;
    this.renderPasses = renderPasses;
    this.drawLists = drawLists;
    this.materialBatches = materialBatches;
    this.frameGraph = frameGraph;
    this.metadata = {
      layer: "PulseGPUBrain",
      kind: "render-plan-package",
      target: "full-gpu",
      evo: DUAL_MODE_EVO,
      brainVersion: PULSE_GPU_BRAIN_VERSION,
      schemaVersion: PULSE_GPU_BRAIN_SCHEMA_VERSION,
      routingContract: "PulseSend-v24-Immortal++",
      renderPlanContract: "PulseGPU-RenderPlan-v24-Immortal++",
      frameGraphContract: "FrameGraph-v8",
      dnaTag,
      prewarmReady: true,
      ...metadata
    };
  }
}

class PulseGPUDispatchHintPackage {
  constructor({
    id = "gpu-dispatch-hints",
    version = PULSE_GPU_BRAIN_SCHEMA_VERSION,
    patternHints = [],
    metadata = {},
    dnaTag = "default-dna"
  } = {}) {
    this.id = id;
    this.version = version;
    this.patternHints = patternHints;
    this.metadata = {
      layer: "PulseGPUBrain",
      kind: "gpu-dispatch-hint-package",
      target: "full-gpu",
      evo: DUAL_MODE_EVO,
      brainVersion: PULSE_GPU_BRAIN_VERSION,
      schemaVersion: PULSE_GPU_BRAIN_SCHEMA_VERSION,
      dispatchHintContract: "PulseGPU-DispatchHints-v24-Immortal++",
      dnaTag,
      intelligentComputeReady: true,
      ...metadata
    };
  }
}

// ------------------------------------------------------
// BRAIN INPUT (RAW ASSET + GPU MEMORY / DISPATCH CONTEXT) — v24-Immortal++
// ------------------------------------------------------

class BrainInput {
  constructor({
    schemaVersion = PULSE_GPU_BRAIN_SCHEMA_VERSION,
    rawTextures = [],
    rawMeshes = [],
    rawAnimations = [],
    rawShaders = [],
    rawScenes = [],
    usagePatterns = {},
    predictionHints = {},

    gpuMemorySnapshot = null,
    gpuDispatchHistory = [],
    gpuAdvantageMap = null,

    dnaTag = "default-dna",
    instanceId = "",
    version = PULSE_GPU_BRAIN_VERSION,
    presenceContext = null
  } = {}) {
    this.schemaVersion = schemaVersion;
    this.rawTextures = rawTextures;
    this.rawMeshes = rawMeshes;
    this.rawAnimations = rawAnimations;
    this.rawShaders = rawShaders;
    this.rawScenes = rawScenes;
    this.usagePatterns = usagePatterns;
    this.predictionHints = predictionHints;

    this.gpuMemorySnapshot = gpuMemorySnapshot;
    this.gpuDispatchHistory = gpuDispatchHistory;
    this.gpuAdvantageMap = gpuAdvantageMap;

    this.dnaTag = dnaTag;
    this.instanceId = instanceId;
    this.version = version;
    this.presenceContext = presenceContext;

    this.evo = DUAL_MODE_EVO;
    this.brainVersion = PULSE_GPU_BRAIN_VERSION;
    this.routingContract = "PulseSend-v24-Immortal++";
    this.gpuOrganContract = "PulseGPU-v24-Immortal++";
    this.binaryGpuOrganContract = "PulseBinaryGPU-v24-Immortal++";
    this.earnCompatibility = "Earn-v24-GPU";
  }
}

// ------------------------------------------------------
// INTELLIGENT COMPUTE HINT (v24-Immortal++, pure helper)
// ------------------------------------------------------

function computeIntelligentAdvantage(brainInput) {
  const dispatchCount = Array.isArray(brainInput.gpuDispatchHistory)
    ? brainInput.gpuDispatchHistory.length
    : 0;

  const hasAdvantageMap = !!brainInput.gpuAdvantageMap;
  const hasPresence = !!brainInput.presenceContext;

  return {
    dispatchCount,
    hasAdvantageMap,
    hasPresence,
    prewarmRecommended: dispatchCount > 0 || hasPresence,
    chunkCacheRecommended: dispatchCount > 8 || hasAdvantageMap,
    modeHint: dispatchCount > 32 ? "throughput" : "latency"
  };
}

// ------------------------------------------------------
// OPTIMIZATION PIPELINES (PURE, DETERMINISTIC) — v24-Immortal++
// ------------------------------------------------------

class TextureOptimizer {
  static process(rawTextures, brainInput) {
    const intel = computeIntelligentAdvantage(brainInput);

    log(
      "gpu",
      "[Analyst] TextureOptimizer v24-Immortal++ → pass-through (memory + presence + prewarm + chunk-aware)",
      "color:#8BC34A;",
      {
        count: rawTextures.length,
        hasGpuMemory: !!brainInput.gpuMemorySnapshot,
        dnaTag: brainInput.dnaTag,
        instanceId: brainInput.instanceId,
        prewarmRecommended: intel.prewarmRecommended,
        chunkCacheRecommended: intel.chunkCacheRecommended
      }
    );

    return new PulseTexturePackage({
      optimizedTextures: rawTextures,
      dnaTag: brainInput.dnaTag,
      metadata: {
        sourceCount: rawTextures.length,
        optimizerContract: "TextureOptimizer-v24-Immortal++",
        hasGpuMemorySnapshot: !!brainInput.gpuMemorySnapshot,
        instanceId: brainInput.instanceId,
        intelligentAdvantage: intel
      }
    });
  }
}

class MeshOptimizer {
  static process(rawMeshes, brainInput) {
    const dispatchHistoryCount = Array.isArray(brainInput.gpuDispatchHistory)
      ? brainInput.gpuDispatchHistory.length
      : 0;

    const intel = computeIntelligentAdvantage(brainInput);

    log(
      "gpu",
      "[Analyst] MeshOptimizer v24-Immortal++ → pass-through (dispatch + presence + chunk-cache aware)",
      "color:#8BC34A;",
      {
        count: rawMeshes.length,
        dispatchHistoryCount,
        dnaTag: brainInput.dnaTag,
        instanceId: brainInput.instanceId,
        chunkCacheRecommended: intel.chunkCacheRecommended
      }
    );

    return new PulseMeshPackage({
      simplifiedMeshes: rawMeshes,
      dnaTag: brainInput.dnaTag,
      metadata: {
        sourceCount: rawMeshes.length,
        optimizerContract: "MeshOptimizer-v24-Immortal++",
        dispatchHistoryCount,
        instanceId: brainInput.instanceId,
        intelligentAdvantage: intel
      }
    });
  }
}

class LightingBaker {
  static process(rawScenes, brainInput) {
    const intel = computeIntelligentAdvantage(brainInput);

    log(
      "gpu",
      "[Analyst] LightingBaker v24-Immortal++ → placeholder (advantage + presence + prewarm aware)",
      "color:#8BC34A;",
      {
        sceneCount: rawScenes.length,
        hasAdvantageMap: !!brainInput.gpuAdvantageMap,
        dnaTag: brainInput.dnaTag,
        instanceId: brainInput.instanceId,
        prewarmRecommended: intel.prewarmRecommended
      }
    );

    return new PulseLightingPackage({
      dnaTag: brainInput.dnaTag,
      metadata: {
        sceneCount: rawScenes.length,
        bakerContract: "LightingBaker-v24-Immortal++",
        hasAdvantageMap: !!brainInput.gpuAdvantageMap,
        instanceId: brainInput.instanceId,
        intelligentAdvantage: intel
      }
    });
  }
}

class AnimationBaker {
  static process(rawAnimations, brainInput) {
    const hasUsagePatterns =
      !!brainInput.usagePatterns &&
      Object.keys(brainInput.usagePatterns).length > 0;

    const intel = computeIntelligentAdvantage(brainInput);

    log(
      "gpu",
      "[Analyst] AnimationBaker v24-Immortal++ → pass-through (usage + presence + intelligent compute aware)",
      "color:#8BC34A;",
      {
        clipCount: rawAnimations.length,
        hasUsagePatterns,
        dnaTag: brainInput.dnaTag,
        instanceId: brainInput.instanceId,
        modeHint: intel.modeHint
      }
    );

    return new PulseAnimationPackage({
      bakedFrames: rawAnimations,
      dnaTag: brainInput.dnaTag,
      metadata: {
        clipCount: rawAnimations.length,
        bakerContract: "AnimationBaker-v24-Immortal++",
        hasUsagePatterns,
        instanceId: brainInput.instanceId,
        intelligentAdvantage: intel
      }
    });
  }
}

class ShaderCompiler {
  static process(rawShaders, brainInput) {
    const hasDispatchHistory = Array.isArray(brainInput.gpuDispatchHistory)
      ? brainInput.gpuDispatchHistory.length > 0
      : false;

    const intel = computeIntelligentAdvantage(brainInput);

    log(
      "gpu",
      "[Analyst] ShaderCompiler v24-Immortal++ → pass-through (binary/symbolic + presence + immortal++ aware)",
      "color:#8BC34A;",
      {
        shaderCount: rawShaders.length,
        hasDispatchHistory,
        dnaTag: brainInput.dnaTag,
        instanceId: brainInput.instanceId,
        modeHint: intel.modeHint
      }
    );

    return new PulseShaderPackage({
      compiledVariants: rawShaders,
      dnaTag: brainInput.dnaTag,
      metadata: {
        shaderCount: rawShaders.length,
        compilerContract: "ShaderCompiler-v24-Immortal++",
        hasDispatchHistory,
        instanceId: brainInput.instanceId,
        intelligentAdvantage: intel
      }
    });
  }
}

// NEW: GPU Dispatch Hint Builder (symbolic + binary + presence + advantage aware)
class GPUDispatchHintBuilder {
  static process(brainInput) {
    const history = Array.isArray(brainInput.gpuDispatchHistory)
      ? brainInput.gpuDispatchHistory
      : [];

    const intel = computeIntelligentAdvantage(brainInput);

    log(
      "gpu",
      "[Analyst] GPUDispatchHintBuilder v24-Immortal++ → intelligent placeholder",
      "color:#8BC34A;",
      {
        dispatchHistoryCount: history.length,
        hasAdvantageMap: !!brainInput.gpuAdvantageMap,
        dnaTag: brainInput.dnaTag,
        instanceId: brainInput.instanceId,
        modeHint: intel.modeHint
      }
    );

    const patternMap = Object.create(null);

    history.forEach((d) => {
      const pattern = d?.pattern || "gpu-default";
      const key = pattern;
      const bucket = patternMap[key] || {
        pattern,
        count: 0,
        lastMode: d?.mode || "normal",
        lastModeKind: d?.modeKind || "symbolic",
        lastBinaryMode: !!d?.binaryMode,
        lastDualMode: !!d?.dualMode,
        lastAdvantageScore: d?.meta?.advantageScore || 0
      };
      bucket.count += 1;
      bucket.lastMode = d?.mode || bucket.lastMode;
      bucket.lastModeKind = d?.modeKind || bucket.lastModeKind;
      bucket.lastBinaryMode = !!d?.binaryMode;
      bucket.lastDualMode = !!d?.dualMode;
      bucket.lastAdvantageScore =
        typeof d?.meta?.advantageScore === "number"
          ? d.meta.advantageScore
          : bucket.lastAdvantageScore;
      patternMap[key] = bucket;
    });

    const patternHints = Object.values(patternMap).map((bucket) => ({
      pattern: bucket.pattern,
      preferredMode: bucket.lastMode,
      preferredModeKind: bucket.lastModeKind,
      preferBinary: bucket.lastBinaryMode,
      preferDualMode: bucket.lastDualMode,
      observedCount: bucket.count,
      lastAdvantageScore: bucket.lastAdvantageScore,
      intelligentModeHint: intel.modeHint
    }));

    return new PulseGPUDispatchHintPackage({
      patternHints,
      dnaTag: brainInput.dnaTag,
      metadata: {
        dispatchHistoryCount: history.length,
        hasAdvantageMap: !!brainInput.gpuAdvantageMap,
        instanceId: brainInput.instanceId,
        intelligentAdvantage: intel
      }
    });
  }
}

// ------------------------------------------------------
// RENDER PLANNER — v24-Immortal++
// ------------------------------------------------------

class RenderPlanner {
  static process(rawScenes, usagePatterns, brainInput) {
    const hasUsagePatterns =
      !!usagePatterns && Object.keys(usagePatterns).length > 0;

    const intel = computeIntelligentAdvantage(brainInput);

    log(
      "gpu",
      "RenderPlanner v24-Immortal++ → placeholder (dispatch + memory + presence + prewarm aware)",
      {
        sceneCount: rawScenes.length,
        hasUsagePatterns,
        hasGpuMemorySnapshot: !!brainInput.gpuMemorySnapshot,
        dnaTag: brainInput.dnaTag,
        instanceId: brainInput.instanceId,
        prewarmRecommended: intel.prewarmRecommended
      }
    );

    return new PulseRenderPlanPackage({
      dnaTag: brainInput.dnaTag,
      metadata: {
        sceneCount: rawScenes.length,
        hasUsagePatterns,
        hasGpuMemorySnapshot: !!brainInput.gpuMemorySnapshot,
        plannerContract: "RenderPlanner-v24-Immortal++",
        instanceId: brainInput.instanceId,
        intelligentAdvantage: intel
      }
    });
  }
}

// ------------------------------------------------------
// BRAIN ORCHESTRATOR (PURE, SYNCHRONOUS, v24-Immortal++)
// ------------------------------------------------------

class PulseGPUBrainController {
  static buildPackages(brainInput) {
    log(
      "gpu",
      "[Analyst] buildPackages() v24-Immortal++ — starting",
      "color:#03A9F4;",
      {
        schemaVersion: brainInput.schemaVersion,
        brainVersion: PULSE_GPU_BRAIN_VERSION,
        textures: brainInput.rawTextures.length,
        meshes: brainInput.rawMeshes.length,
        animations: brainInput.rawAnimations.length,
        shaders: brainInput.rawShaders.length,
        scenes: brainInput.rawScenes.length,
        hasGpuMemorySnapshot: !!brainInput.gpuMemorySnapshot,
        dispatchHistoryCount: Array.isArray(brainInput.gpuDispatchHistory)
          ? brainInput.gpuDispatchHistory.length
          : 0,
        dnaTag: brainInput.dnaTag,
        instanceId: brainInput.instanceId
      }
    );

    const textures      = TextureOptimizer.process(brainInput.rawTextures, brainInput);
    const meshes        = MeshOptimizer.process(brainInput.rawMeshes, brainInput);
    const lighting      = LightingBaker.process(brainInput.rawScenes, brainInput);
    const animation     = AnimationBaker.process(brainInput.rawAnimations, brainInput);
    const shaders       = ShaderCompiler.process(brainInput.rawShaders, brainInput);
    const renderPlan    = RenderPlanner.process(
      brainInput.rawScenes,
      brainInput.usagePatterns,
      brainInput
    );
    const dispatchHints = GPUDispatchHintBuilder.process(brainInput);

    const packageSet = {
      schemaVersion: PULSE_GPU_BRAIN_SCHEMA_VERSION,
      brainVersion: PULSE_GPU_BRAIN_VERSION,
      target: "full-gpu",

      textures,
      meshes,
      lighting,
      animation,
      shaders,
      renderPlan,
      dispatchHints,

      evo: DUAL_MODE_EVO,
      routingContract: "PulseSend-v24-Immortal++",
      gpuOrganContract: "PulseGPU-v24-Immortal++",
      binaryGpuOrganContract: "PulseBinaryGPU-v24-Immortal++",
      dnaTag: brainInput.dnaTag,
      instanceId: brainInput.instanceId
    };

    log(
      "gpu",
      "[Analyst] buildPackages() v24-Immortal++ — complete",
      "color:#4CAF50;",
      {
        schemaVersion: packageSet.schemaVersion,
        brainVersion: packageSet.brainVersion
      }
    );

    return packageSet;
  }
}

// ------------------------------------------------------
// EXPORT CONTRACT (SINGLE PACKAGE SET HOLDER)
// ------------------------------------------------------

class PulseGPUBrainExport {
  static packageSet = null;

  static buildAndStore(brainInput) {
    log(
      "gpu",
      "[Analyst] buildAndStore() v24-Immortal++",
      "color:#03A9F4;"
    );

    this.packageSet = PulseGPUBrainController.buildPackages(brainInput);

    log(
      "gpu",
      "[Analyst] packageSet stored v24-Immortal++",
      "color:#4CAF50;"
    );

    return this.packageSet;
  }

  static exportToRuntime() {
    log(
      "gpu",
      "[Analyst] exportToRuntime() v24-Immortal++",
      "color:#03A9F4;",
      { hasPackageSet: !!this.packageSet }
    );

    return this.packageSet;
  }
}

// ------------------------------------------------------
// EXPORTS
// ------------------------------------------------------

export {
  PULSE_GPU_BRAIN_SCHEMA_VERSION,
  BrainInput,
  PulseTexturePackage,
  PulseMeshPackage,
  PulseLightingPackage,
  PulseAnimationPackage,
  PulseShaderPackage,
  PulseRenderPlanPackage,
  PulseGPUDispatchHintPackage,
  TextureOptimizer,
  MeshOptimizer,
  LightingBaker,
  AnimationBaker,
  ShaderCompiler,
  RenderPlanner,
  GPUDispatchHintBuilder,
  PulseGPUBrainController,
  PulseGPUBrainExport,
  computeIntelligentAdvantage
};
