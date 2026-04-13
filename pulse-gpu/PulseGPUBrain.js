// PulseGPUBrain.js
// ------------------------------------------------------
// Precomputes textures, meshes, lighting, animation,
// shaders, and render plans for Pulse GPU Runtime.
// ------------------------------------------------------

// ------------------------------------------------------
// PACKAGE DEFINITIONS
// ------------------------------------------------------

class PulseTexturePackage {
  constructor({
    id,
    version,
    optimizedTextures = [],
    mipmaps = [],
    atlasMaps = [],
    metadata = {}
  } = {}) {
    this.id = id;
    this.version = version;
    this.optimizedTextures = optimizedTextures;
    this.mipmaps = mipmaps;
    this.atlasMaps = atlasMaps;
    this.metadata = metadata;
  }
}

class PulseMeshPackage {
  constructor({
    id,
    version,
    lods = [],
    simplifiedMeshes = [],
    clusters = [],
    indices = [],
    metadata = {}
  } = {}) {
    this.id = id;
    this.version = version;
    this.lods = lods;
    this.simplifiedMeshes = simplifiedMeshes;
    this.clusters = clusters;
    this.indices = indices;
    this.metadata = metadata;
  }
}

class PulseLightingPackage {
  constructor({
    id,
    version,
    bakedGI = null,
    bakedAO = null,
    shadowData = null,
    reflectionProbes = [],
    metadata = {}
  } = {}) {
    this.id = id;
    this.version = version;
    this.bakedGI = bakedGI;
    this.bakedAO = bakedAO;
    this.shadowData = shadowData;
    this.reflectionProbes = reflectionProbes;
    this.metadata = metadata;
  }
}

class PulseAnimationPackage {
  constructor({
    id,
    version,
    bakedFrames = [],
    transitions = [],
    skeletonData = null,
    metadata = {}
  } = {}) {
    this.id = id;
    this.version = version;
    this.bakedFrames = bakedFrames;
    this.transitions = transitions;
    this.skeletonData = skeletonData;
    this.metadata = metadata;
  }
}

class PulseShaderPackage {
  constructor({
    id,
    version,
    compiledVariants = [],
    pipelineStates = [],
    metadata = {}
  } = {}) {
    this.id = id;
    this.version = version;
    this.compiledVariants = compiledVariants;
    this.pipelineStates = pipelineStates;
    this.metadata = metadata;
  }
}

class PulseRenderPlanPackage {
  constructor({
    id,
    version,
    renderPasses = [],
    drawLists = [],
    materialBatches = [],
    frameGraph = null,
    metadata = {}
  } = {}) {
    this.id = id;
    this.version = version;
    this.renderPasses = renderPasses;
    this.drawLists = drawLists;
    this.materialBatches = materialBatches;
    this.frameGraph = frameGraph;
    this.metadata = metadata;
  }
}

// ------------------------------------------------------
// BRAIN INPUT
// ------------------------------------------------------

class BrainInput {
  constructor({
    rawTextures = [],
    rawMeshes = [],
    rawAnimations = [],
    rawShaders = [],
    rawScenes = [],
    usagePatterns = {},
    predictionHints = {}
  } = {}) {
    this.rawTextures = rawTextures;
    this.rawMeshes = rawMeshes;
    this.rawAnimations = rawAnimations;
    this.rawShaders = rawShaders;
    this.rawScenes = rawScenes;
    this.usagePatterns = usagePatterns;
    this.predictionHints = predictionHints;
  }
}

// ------------------------------------------------------
// OPTIMIZATION PIPELINES
// ------------------------------------------------------

class TextureOptimizer {
  static process(rawTextures) {
    return new PulseTexturePackage({
      id: "textures",
      version: 1,
      optimizedTextures: rawTextures
    });
  }
}

class MeshOptimizer {
  static process(rawMeshes) {
    return new PulseMeshPackage({
      id: "meshes",
      version: 1,
      simplifiedMeshes: rawMeshes
    });
  }
}

class LightingBaker {
  static process(rawScenes) {
    return new PulseLightingPackage({
      id: "lighting",
      version: 1
    });
  }
}

class AnimationBaker {
  static process(rawAnimations) {
    return new PulseAnimationPackage({
      id: "animation",
      version: 1,
      bakedFrames: rawAnimations
    });
  }
}

class ShaderCompiler {
  static process(rawShaders) {
    return new PulseShaderPackage({
      id: "shaders",
      version: 1,
      compiledVariants: rawShaders
    });
  }
}

class RenderPlanner {
  static process(rawScenes, usagePatterns) {
    return new PulseRenderPlanPackage({
      id: "render-plan",
      version: 1
    });
  }
}

// ------------------------------------------------------
// BRAIN ORCHESTRATOR
// ------------------------------------------------------

class PulseGPUBrainController {
  static buildPackages(brainInput) {
    const textures = TextureOptimizer.process(brainInput.rawTextures);
    const meshes = MeshOptimizer.process(brainInput.rawMeshes);
    const lighting = LightingBaker.process(brainInput.rawScenes);
    const animation = AnimationBaker.process(brainInput.rawAnimations);
    const shaders = ShaderCompiler.process(brainInput.rawShaders);
    const renderPlan = RenderPlanner.process(
      brainInput.rawScenes,
      brainInput.usagePatterns
    );

    return {
      textures,
      meshes,
      lighting,
      animation,
      shaders,
      renderPlan
    };
  }
}

// ------------------------------------------------------
// EXPORT CONTRACT
// ------------------------------------------------------

class PulseGPUBrainExport {
  static packageSet = null;

  static buildAndStore(brainInput) {
    this.packageSet = PulseGPUBrainController.buildPackages(brainInput);
    return this.packageSet;
  }

  static exportToRuntime() {
    return this.packageSet;
  }
}

// ------------------------------------------------------
// EXPORTS
// ------------------------------------------------------

export {
  BrainInput,
  PulseTexturePackage,
  PulseMeshPackage,
  PulseLightingPackage,
  PulseAnimationPackage,
  PulseShaderPackage,
  PulseRenderPlanPackage,
  TextureOptimizer,
  MeshOptimizer,
  LightingBaker,
  AnimationBaker,
  ShaderCompiler,
  RenderPlanner,
  PulseGPUBrainController,
  PulseGPUBrainExport
};