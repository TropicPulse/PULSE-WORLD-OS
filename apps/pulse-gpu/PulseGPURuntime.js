// FILE: tropic-pulse-functions/apps/pulse-gpu/PulseGPURuntime.js
//
// INTENT-CHECK: If you paste this while confused or frustrated, gently re-read your INTENT; if I am unsure of intent, I will ask you for the full INTENT paragraph.
// 📘 PAGE INDEX — Source of Truth for This File
//
// This PAGE INDEX defines the identity, purpose, boundaries, and allowed
// behavior of this file. It is the compressed representation of the entire
// page. Keep this updated as functions, responsibilities, and logic evolve.
//
// If AI becomes uncertain or drifts, request: "Rules Design (Trust/Data)"
//
// CONTENTS TO MAINTAIN:
//   • What this file IS
//   • What this file IS NOT
//   • Its responsibilities
//   • Its exported classes/functions
//   • Its internal logic summary
//   • Allowed imports
//   • Forbidden imports
//   • Deployment rules
//   • Safety constraints
//
// The PAGE INDEX + SUB‑COMMENTS allow full reconstruction of the file
// without needing to paste the entire codebase. Keep summaries accurate.
// The comments are the source of truth — if code and comments disagree,
// the comments win.
//
// ROLE:
//   The Pulse GPU Runtime — loads GPU‑ready packages from PulseGPUBrainExport,
//   initializes GPU memory, creates buffers and shader modules, and exposes
//   runtime‑level GPU operations for PulseGPUEngine.
//
//   This file IS:
//     • A GPU memory initializer
//     • A loader for Brain‑generated packages
//     • A WebGPU context manager
//     • The bridge between CPU‑side precompute (Brain) and GPU‑side execution (Engine)
//
//   This file IS NOT:
//     • A renderer (that’s PulseGPUEngine)
//     • A CPU‑side optimizer (that’s PulseGPUBrain)
//     • A shader compiler (Brain handles compilation)
//     • A backend module
//     • A business logic module
//
// DEPLOYMENT:
//   Lives in /apps/pulse-gpu as part of the GPU subsystem.
//   Must run ONLY in browser environments with WebGPU support.
//   Must remain ESM‑only and side‑effect‑free until init() is called.
//
// SYNTAX RULES:
//   ESM JavaScript ONLY — no TypeScript, no CommonJS, no require().
//   Named exports ONLY — no default exports.
//
// IMPORT RULES:
//   Allowed:
//     • BrainInput, package classes, and PulseGPUBrainExport from PulseGPUBrain.js
//
//   Forbidden:
//     • Node.js APIs
//     • Firebase, Stripe, Twilio, or any backend modules
//     • DOM manipulation outside WebGPU context
//     • Any environment‑specific dependencies
//
// INTERNAL LOGIC SUMMARY:
//   • PulseGPUContext:
//       - Requests WebGPU adapter + device
//       - Tracks readiness
//
//   • createGPUBuffer():
//       - Creates mapped GPU buffers
//       - Uploads raw binary data
//
//   • PulseGPURuntimeLoader:
//       - Loads Brain packages
//       - Initializes textures → GPU buffers
//       - Initializes meshes → vertex + index buffers
//       - Initializes shaders → GPU shader modules
//       - Runs full initialization pipeline
//
//   • PulseGPURuntime:
//       - Owns context + loader
//       - Exposes runtime API to Engine:
//           getTextures(), getMeshes(), getShaders(), getPackages()
//
// SAFETY NOTES:
//   • Must NEVER run on backend — WebGPU is browser‑only
//   • Must NEVER assume GPU availability — always check navigator.gpu
//   • Must NEVER mutate Brain packages
//   • Must ALWAYS initialize GPU before creating buffers
//   • Must remain deterministic and side‑effect‑free outside init()
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