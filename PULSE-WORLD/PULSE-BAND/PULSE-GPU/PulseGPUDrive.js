/* global log,warn,error */
// ============================================================================
// FILE: tropic-pulse-functions/PULSE-WORLD/PULSE-GPU/PulseGPUDrive.js
// LAYER: MOMENTUM NETWORK — GPU RUNTIME (BRAIN → ENGINE FLOW)
//
// PulseGPURuntime v16-Immortal
// Deterministic, Drift‑Proof, PulseSend‑v16‑Ready, Presence‑Aware, CI‑Aware
// ============================================================================
//
// ROLE — MOMENTUM NETWORK:
//  ------------------------
//  • Wraps WebGPU context (adapter/device/context/format).
//  • Loads GPU Brain packages → creates GPU buffers + shader modules.
//  • Exposes meshes/shaders/textures/dispatch hints to Astral Muscle Engine.
//  • Binary-aware, symbolic-aware, dispatch-aware, memory-aware, presence-aware.
//  • CognitiveFrame-aware + ComputerIntelligence-aware (metadata + surfaces).
//  • Fail-open: if anything is missing, surfaces stay empty but never throw.
/*
AI_EXPERIENCE_META = {
  identity: "PulseGPUDrive",
  version: "v16-Immortal",
  layer: "gpu_runtime",
  role: "gpu_runtime_surface",
  lineage: "PulseGPU-v16-Immortal",

  evo: {
    gpuRuntime: true,
    gpuMomentumNetwork: true,
    gpuFrameConductor: true,

    deterministic: true,
    driftProof: true,
    pureCompute: true,

    zeroNetwork: true,
    zeroFilesystem: true,
    zeroMutationOfInput: true,

    parallelSafe: true,
    gpuSafe: true,

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
    instanceAware: true,

    // Mesh linkage
    brainLinked: true,
    cognitionLinked: true,
    wisdomLinked: true,
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
      "PulseGPUDriveCenter",
      "PulseGPUBrain",
      "PulseGPU"
    ],
    never: [
      "safeRoute",
      "fetchViaCNS",
      "legacyGPURuntime"
    ]
  }
}
*/

import { PulseGPUBrainExport } from "./PulseGPUBrain.js";
import { computeComputerIntelligence } from "./PulseGPUComputerIntelligence.js";

const PULSE_GPU_RUNTIME_VERSION = "16.0-Immortal";

// ============================================================================
// GPU CONTEXT WRAPPER — Momentum Network: Conduction Node
// ============================================================================
class PulseGPUContext {
  constructor() {
    this.adapter = null;
    this.device = null;
    this.context = null;
    this.format = "bgra8unorm";
    this.ready = false;

    this.meta = {
      layer: "PulseGPUContext",
      role: "MOMENTUM_NODE",
      version: PULSE_GPU_RUNTIME_VERSION,
      target: "full-gpu",
      evo: {
        advantageCascadeAware: true,
        pulseEfficiencyAware: true,
        driftProof: true,
        multiInstanceReady: true,
        unifiedAdvantageField: true,
        pulseSend16Ready: true,

        // v16 Immortal Presence
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

        // Cognitive / CI awareness (metadata only)
        cognitiveFrameAware: true,
        computerIntelligenceAware: true,

        routingContract: "PulseSend-v16",
        gpuOrganContract: "PulseGPU-v16-Immortal",
        binaryGpuOrganContract: "PulseBinaryGPU-v16-Immortal",
        earnCompatibility: "Earn-v4-Presence"
      }
    };
  }

  async init(canvas) {
    if (!canvas) {
      warn("PulseGPUContext: canvas not provided (fail-open).");
      this.ready = false;
      return;
    }

    if (!navigator.gpu) {
      warn("PulseGPUContext: WebGPU unavailable (fail-open).");
      this.ready = false;
      return;
    }

    this.adapter = await navigator.gpu.requestAdapter();
    if (!this.adapter) {
      warn("PulseGPUContext: adapter unavailable (fail-open).");
      this.ready = false;
      return;
    }

    this.device = await this.adapter.requestDevice();
    if (!this.device) {
      warn("PulseGPUContext: device unavailable (fail-open).");
      this.ready = false;
      return;
    }

    const context = canvas.getContext("webgpu");
    if (!context) {
      warn("PulseGPUContext: cannot acquire WebGPU context (fail-open).");
      this.ready = false;
      return;
    }

    this.context = context;
    this.format = navigator.gpu.getPreferredCanvasFormat();

    this.context.configure({
      device: this.device,
      format: this.format,
      alphaMode: "opaque"
    });

    this.ready = true;
  }
}

// ============================================================================
// GPU BUFFER CREATION — Momentum Network: Payload Conduction
// ============================================================================
function createGPUBuffer(device, data, usage) {
  if (!device || !data) return null;

  const buffer = device.createBuffer({
    size: data.byteLength,
    usage,
    mappedAtCreation: true
  });

  new Uint8Array(buffer.getMappedRange()).set(new Uint8Array(data));
  buffer.unmap();

  return buffer;
}

// ============================================================================
// RUNTIME LOADER — Momentum Network: Flow Initialization
// ============================================================================
class PulseGPURuntimeLoader {
  constructor(gpuContext) {
    this.gpu = gpuContext;

    this.packages = null;

    this.textureBuffers = [];
    this.meshBuffers = [];
    this.shaderModules = [];

    this.dispatchHints = null;      // v16: metadata + CI input
    this.gpuMemorySnapshot = null;  // v16: optional, metadata-only

    // v16: cognitive + CI runtime surfaces (metadata-only, fail-open)
    this.cognitiveFrame = null;
    this.computerIntelligence = null;

    this.meta = {
      layer: "PulseGPURuntimeLoader",
      role: "MOMENTUM_FLOW",
      version: PULSE_GPU_RUNTIME_VERSION,
      target: "full-gpu",
      evo: {
        advantageCascadeAware: true,
        pulseEfficiencyAware: true,
        driftProof: true,
        multiInstanceReady: true,
        unifiedAdvantageField: true,
        pulseSend16Ready: true,

        // v16 Immortal Presence
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

        // Cognitive / CI awareness (metadata only)
        cognitiveFrameAware: true,
        computerIntelligenceAware: true,

        routingContract: "PulseSend-v16",
        gpuOrganContract: "PulseGPU-v16-Immortal",
        binaryGpuOrganContract: "PulseBinaryGPU-v16-Immortal",
        earnCompatibility: "Earn-v4-Presence"
      }
    };
  }

  loadPackages() {
    const pkg = PulseGPUBrainExport.exportToRuntime();
    if (!pkg) {
      warn("PulseGPURuntimeLoader: no packageSet available (fail-open).");
      this.packages = null;
      return null;
    }

    this.packages = pkg;

    // v16: load dispatch hints + memory snapshot if present
    this.dispatchHints = pkg.dispatchHints || null;
    this.gpuMemorySnapshot = pkg.gpuMemorySnapshot || null;

    // v16: optional cognitive frame + CI snapshot (metadata-only, fail-open)
    this.cognitiveFrame = pkg.cognitiveFrame || null;

    try {
      this.computerIntelligence = computeComputerIntelligence({
        dispatchHints: this.dispatchHints,
        gpuMemorySnapshot: this.gpuMemorySnapshot,
        renderPlan: pkg.renderPlan || null,
        dnaTag: pkg.dnaTag,
        instanceId: pkg.instanceId,
        brainVersion: pkg.brainVersion
      });
    } catch {
      this.computerIntelligence = null;
    }

    return this.packages;
  }

  initTextures() {
    if (!this.gpu.device) return;
    const pkg = this.packages?.textures;
    if (!pkg || !Array.isArray(pkg.optimizedTextures)) return;

    pkg.optimizedTextures.forEach((tex) => {
      if (!tex || !tex.data) return;
      const buffer = createGPUBuffer(
        this.gpu.device,
        tex.data,
        GPUBufferUsage.COPY_DST | GPUBufferUsage.TEXTURE_BINDING
      );
      if (buffer) this.textureBuffers.push(buffer);
    });
  }

  initMeshes() {
    if (!this.gpu.device) return;
    const pkg = this.packages?.meshes;
    if (!pkg || !Array.isArray(pkg.simplifiedMeshes)) return;

    pkg.simplifiedMeshes.forEach((mesh) => {
      if (!mesh || !mesh.vertices || !mesh.indices) return;

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

      if (vertexBuffer && indexBuffer) {
        this.meshBuffers.push({
          vertexBuffer,
          indexBuffer,
          indexCount: mesh.indices.byteLength / 4
        });
      }
    });
  }

  initShaders() {
    if (!this.gpu.device) return;
    const pkg = this.packages?.shaders;
    if (!pkg || !Array.isArray(pkg.compiledVariants)) return;

    pkg.compiledVariants.forEach((shader) => {
      if (!shader || !shader.code) return;
      const module = this.gpu.device.createShaderModule({ code: shader.code });
      this.shaderModules.push(module);
    });
  }

  async initialize(canvas) {
    if (!this.gpu.ready) {
      await this.gpu.init(canvas);
    }

    if (!this.gpu.ready) return false;

    this.loadPackages();
    if (!this.packages) return true;

    this.initTextures();
    this.initMeshes();
    this.initShaders();

    return true;
  }
}

// ============================================================================
// RUNTIME API — Momentum Network: Flow Surface
// ============================================================================
class PulseGPURuntime {
  constructor() {
    this.context = new PulseGPUContext();
    this.loader = new PulseGPURuntimeLoader(this.context);

    this.meta = {
      layer: "PulseGPURuntime",
      role: "MOMENTUM_NETWORK",
      version: PULSE_GPU_RUNTIME_VERSION,
      target: "full-gpu",
      evo: {
        advantageCascadeAware: true,
        pulseEfficiencyAware: true,
        driftProof: true,
        multiInstanceReady: true,
        unifiedAdvantageField: true,
        pulseSend16Ready: true,

        // v16 Immortal Presence
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

        // Cognitive / CI awareness (metadata only)
        cognitiveFrameAware: true,
        computerIntelligenceAware: true,

        routingContract: "PulseSend-v16",
        gpuOrganContract: "PulseGPU-v16-Immortal",
        binaryGpuOrganContract: "PulseBinaryGPU-v16-Immortal",
        earnCompatibility: "Earn-v4-Presence"
      }
    };
  }

  async init(canvas) {
    await this.loader.initialize(canvas);
  }

  getGPUContext() {
    return {
      adapter: this.context.adapter,
      device: this.context.device,
      context: this.context.context,
      format: this.context.format,
      ready: this.context.ready
    };
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

  // v16: expose dispatch hints + memory snapshot
  getDispatchHints() {
    return this.loader.dispatchHints;
  }

  getGpuMemorySnapshot() {
    return this.loader.gpuMemorySnapshot;
  }

  // v16: cognitive + CI runtime surfaces (for Earn / Spine / Wisdom)
  getCognitiveFrame() {
    return this.loader.cognitiveFrame;
  }

  getComputerIntelligence() {
    return this.loader.computerIntelligence;
  }

  // v16: compatibility surfaces for Astral Muscle / Spine
  getMeshesFromPackages() {
    return this.loader.meshBuffers;
  }

  getShadersFromPackages() {
    return this.loader.shaderModules;
  }

  // v16: optional dispatch surfaces (fail-open, empty)
  getGPUDispatchesFromPackages() {
    return this.loader.packages?.gpuDispatches || [];
  }

  getGPUDispatches() {
    return this.getGPUDispatchesFromPackages();
  }

  // v16: optional Earn frame surface (for Spine planning) — fail-open
  getCurrentEarnFrame() {
    return this.loader.packages?.earnFrame || null;
  }
}

// ============================================================================
// EXPORTS
// ============================================================================
export {
  PulseGPUContext,
  PulseGPURuntimeLoader,
  PulseGPURuntime,
  createGPUBuffer
};
