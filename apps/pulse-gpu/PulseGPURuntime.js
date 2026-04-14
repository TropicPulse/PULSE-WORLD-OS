// PulseGPURuntime.js
// ------------------------------------------------------
// Loads Brain packages → initializes GPU memory →
// exposes runtime-level GPU operations for the Engine.
// ------------------------------------------------------

import {
  BrainInput,
  PulseTexturePackage,
  PulseMeshPackage,
  PulseLightingPackage,
  PulseAnimationPackage,
  PulseShaderPackage,
  PulseRenderPlanPackage,
  PulseGPUBrainExport
} from "./PulseGPUBrain.js";

// ------------------------------------------------------
// GPU CONTEXT (placeholder for WebGPU / WebGL2 / native)
// ------------------------------------------------------

class PulseGPUContext {
  constructor() {
    this.device = null;
    this.adapter = null;
    this.ready = false;
  }

  async init() {
    if (!navigator.gpu) {
      console.warn("WebGPU not available.");
      return;
    }

    this.adapter = await navigator.gpu.requestAdapter();
    this.device = await this.adapter.requestDevice();
    this.ready = true;
  }
}

// ------------------------------------------------------
// BUFFER HELPERS
// ------------------------------------------------------

function createGPUBuffer(device, data, usage) {
  const buffer = device.createBuffer({
    size: data.byteLength,
    usage,
    mappedAtCreation: true
  });

  new Uint8Array(buffer.getMappedRange()).set(new Uint8Array(data));
  buffer.unmap();
  return buffer;
}

// ------------------------------------------------------
// RUNTIME PACKAGE LOADER
// ------------------------------------------------------

class PulseGPURuntimeLoader {
  constructor(gpuContext) {
    this.gpu = gpuContext;
    this.packages = null;

    this.textureBuffers = [];
    this.meshBuffers = [];
    this.animationBuffers = [];
    this.shaderModules = [];
  }

  loadPackages() {
    this.packages = PulseGPUBrainExport.exportToRuntime();
    return this.packages;
  }

  // ----------------------------------------------------
  // TEXTURES → GPU BUFFERS
  // ----------------------------------------------------
  initTextures() {
    if (!this.packages?.textures) return;

    const { optimizedTextures } = this.packages.textures;

    optimizedTextures.forEach((tex) => {
      const buffer = createGPUBuffer(
        this.gpu.device,
        tex.data,
        GPUBufferUsage.COPY_DST | GPUBufferUsage.TEXTURE_BINDING
      );
      this.textureBuffers.push(buffer);
    });
  }

  // ----------------------------------------------------
  // MESHES → GPU BUFFERS
  // ----------------------------------------------------
  initMeshes() {
    if (!this.packages?.meshes) return;

    const { simplifiedMeshes } = this.packages.meshes;

    simplifiedMeshes.forEach((mesh) => {
      const vertexBuffer = createGPUBuffer(
        this.gpu.device,
        mesh.vertices,
        GPUBufferUsage.VERTEX
      );

      const indexBuffer = createGPUBuffer(
        this.gpu.device,
        mesh.indices,
        GPUBufferUsage.INDEX
      );

      this.meshBuffers.push({ vertexBuffer, indexBuffer });
    });
  }

  // ----------------------------------------------------
  // SHADERS → GPU MODULES
  // ----------------------------------------------------
  initShaders() {
    if (!this.packages?.shaders) return;

    const { compiledVariants } = this.packages.shaders;

    compiledVariants.forEach((shader) => {
      const module = this.gpu.device.createShaderModule({
        code: shader.code
      });
      this.shaderModules.push(module);
    });
  }

  // ----------------------------------------------------
  // FULL INITIALIZATION PIPELINE
  // ----------------------------------------------------
  async initialize() {
    if (!this.gpu.ready) {
      await this.gpu.init();
    }

    this.loadPackages();
    this.initTextures();
    this.initMeshes();
    this.initShaders();

    return true;
  }
}

// ------------------------------------------------------
// RUNTIME API (what Engine uses)
// ------------------------------------------------------

class PulseGPURuntime {
  constructor() {
    this.context = new PulseGPUContext();
    this.loader = new PulseGPURuntimeLoader(this.context);
  }

  async init() {
    await this.loader.initialize();
  }

  getTextures() {
    return this.loader.textureBuffers;
  }

  getMeshes() {
    return this.loader.meshBuffers;
  }

  getShaders() {
    return this.loader.shaderModules;
  }

  getPackages() {
    return this.loader.packages;
  }
}

// ------------------------------------------------------
// EXPORTS
// ------------------------------------------------------

export {
  PulseGPUContext,
  PulseGPURuntimeLoader,
  PulseGPURuntime,
  createGPUBuffer
};