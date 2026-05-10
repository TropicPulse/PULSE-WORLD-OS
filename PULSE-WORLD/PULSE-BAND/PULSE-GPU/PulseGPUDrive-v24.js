/* global log,warn,error */
// ============================================================================
// FILE: PULSE-WORLD/PULSE-GPU/PulseGPUDrive-v24.js
// LAYER: MOMENTUM NETWORK — GPU RUNTIME (BRAIN → ENGINE FLOW)
//
// PulseGPURuntime v24-IMMORTAL++
// Deterministic, Drift‑Proof, Earn‑Aware, Presence‑Aware, CI‑Aware, GPU‑Advantage‑Aware
// ============================================================================
//
// ROLE — MOMENTUM NETWORK:
//  ------------------------
//  • Wraps WebGPU context (adapter/device/context/format).
//  • Loads GPU Brain packages → creates GPU buffers + shader modules.
//  • Exposes meshes/shaders/textures/dispatch hints to Astral Muscle Engine.
//  • Binary-aware, symbolic-aware, dispatch-aware, memory-aware, presence-aware.
//  • Earn‑aware + game‑aware via PulseGPUEarnProfile.
//  • CognitiveFrame-aware + ComputerIntelligence-aware (metadata + surfaces).
//  • Fail-open: if anything is missing, surfaces stay empty but never throw.
//
// ============================================================================
// AI_EXPERIENCE_META — v24 IMMORTAL++
// ============================================================================
import {
  OrganismIdentity,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PulseWorldOrganismMap-v21.js";
const Identity = OrganismIdentity(import.meta.url);

export const pulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
// export const PULSE_EARN_IMMUNE_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;
// ============================================================================
// IMPORTS — GPU BRAIN + CI + ADVANTAGE ORGANS
// ============================================================================
import { PulseGPUBrainExport } from "./PulseGPUBrain-v24.js";
import { PulseGPUCognitiveIntelligence } from "./PulseGPUCognitiveIntelligence-v24.js";
import { buildPulseGPUEarnProfile } from "./PulseGPUEarnProfile-v24.js";
import { PulseGPUChunkPlanner } from "./PulseGPUChunkPlanner-v24.js";
import { PulseGPUWarmPathCache } from "./PulseGPUWarmPathCache-v24.js";

const PULSE_GPU_RUNTIME_VERSION = "24.0-Immortal++";

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
        pulseSend24Ready: true,

        // v24 Immortal Presence
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

        routingContract: "PulseSend-v24",
        gpuOrganContract: "PulseGPU-v24-Immortal++",
        binaryGpuOrganContract: "PulseBinaryGPU-v24-Immortal++",
        earnCompatibility: "Earn-v24-GPU"
      }
    };
  }

  async init(canvas) {
    if (!canvas) {
      warn?.("PulseGPUContext: canvas not provided (fail-open).");
      this.ready = false;
      return;
    }

    if (!navigator.gpu) {
      warn?.("PulseGPUContext: WebGPU unavailable (fail-open).");
      this.ready = false;
      return;
    }

    this.adapter = await navigator.gpu.requestAdapter();
    if (!this.adapter) {
      warn?.("PulseGPUContext: adapter unavailable (fail-open).");
      this.ready = false;
      return;
    }

    this.device = await this.adapter.requestDevice();
    if (!this.device) {
      warn?.("PulseGPUContext: device unavailable (fail-open).");
      this.ready = false;
      return;
    }

    const context = canvas.getContext("webgpu");
    if (!context) {
      warn?.("PulseGPUContext: cannot acquire WebGPU context (fail-open).");
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

    this.dispatchHints = null;      // v24: metadata + CI input
    this.gpuMemorySnapshot = null;  // v24: optional, metadata-only

    // v24: cognitive + CI runtime surfaces (metadata-only, fail-open)
    this.cognitiveFrame = null;
    this.computerIntelligence = null;

    // v24: earn / play profile + warm path planning
    this.earnProfile = null;
    this.chunkPlan = null;
    this.warmPathCache = null;

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
        pulseSend24Ready: true,

        // v24 Immortal Presence
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

        // Earn / game awareness
        earnAware: true,
        gameAware: true,

        routingContract: "PulseSend-v24",
        gpuOrganContract: "PulseGPU-v24-Immortal++",
        binaryGpuOrganContract: "PulseBinaryGPU-v24-Immortal++",
        earnCompatibility: "Earn-v24-GPU"
      }
    };
  }

  loadPackages() {
    const pkg = PulseGPUBrainExport?.exportToRuntime?.();
    if (!pkg) {
      warn?.("PulseGPURuntimeLoader: no packageSet available (fail-open).");
      this.packages = null;
      return null;
    }

    this.packages = pkg;

    // v24: load dispatch hints + memory snapshot if present
    this.dispatchHints = pkg.dispatchHints || null;
    this.gpuMemorySnapshot = pkg.gpuMemorySnapshot || null;

    // v24: optional cognitive frame (metadata-only, fail-open)
    this.cognitiveFrame = pkg.cognitiveFrame || null;

    // v24: CI snapshot (metadata-only, fail-open)
    try {
      this.computerIntelligence =
        PulseGPUCognitiveIntelligence?.compute?.({
          dispatchHints: this.dispatchHints,
          gpuMemorySnapshot: this.gpuMemorySnapshot,
          renderPlan: pkg.renderPlan || null,
          dnaTag: pkg.dnaTag,
          instanceId: pkg.instanceId,
          brainVersion: pkg.brainVersion
        }) || null;
    } catch {
      this.computerIntelligence = null;
    }

    // v24: Earn / game context (if brain exports it)
    const earnContext = pkg.earnContext || null;
    if (earnContext) {
      try {
        this.earnProfile = buildPulseGPUEarnProfile(earnContext);
      } catch {
        this.earnProfile = null;
      }
    }

    // v24: Chunk planning + warm path cache (if available)
    try {
      this.chunkPlan = PulseGPUChunkPlanner?.plan?.({
        brain: pkg,
        earnProfile: this.earnProfile,
        dispatchHints: this.dispatchHints
      }) || null;
    } catch {
      this.chunkPlan = null;
    }

    try {
      this.warmPathCache = PulseGPUWarmPathCache?.build?.({
        brain: pkg,
        earnProfile: this.earnProfile,
        chunkPlan: this.chunkPlan
      }) || null;
    } catch {
      this.warmPathCache = null;
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
        pulseSend24Ready: true,

        // v24 Immortal Presence
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

        // Earn / game awareness
        earnAware: true,
        gameAware: true,

        routingContract: "PulseSend-v24",
        gpuOrganContract: "PulseGPU-v24-Immortal++",
        binaryGpuOrganContract: "PulseBinaryGPU-v24-Immortal++",
        earnCompatibility: "Earn-v24-GPU"
      }
    };
  }

  async init(canvas) {
    await this.loader.initialize(canvas);
  }

  // Core GPU context
  getGPUContext() {
    return {
      adapter: this.context.adapter,
      device: this.context.device,
      context: this.context.context,
      format: this.context.format,
      ready: this.context.ready
    };
  }

  // Raw buffers / modules
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

  // v24: dispatch hints + memory snapshot
  getDispatchHints() {
    return this.loader.dispatchHints;
  }

  getGpuMemorySnapshot() {
    return this.loader.gpuMemorySnapshot;
  }

  // v24: cognitive + CI runtime surfaces (for Earn / Spine / Wisdom)
  getCognitiveFrame() {
    return this.loader.cognitiveFrame;
  }

  getComputerIntelligence() {
    return this.loader.computerIntelligence;
  }

  // v24: compatibility surfaces for Astral Muscle / Spine
  getMeshesFromPackages() {
    return this.loader.meshBuffers;
  }

  getShadersFromPackages() {
    return this.loader.shaderModules;
  }

  // v24: optional dispatch surfaces (fail-open, empty)
  getGPUDispatchesFromPackages() {
    return this.loader.packages?.gpuDispatches || [];
  }

  getGPUDispatches() {
    return this.getGPUDispatchesFromPackages();
  }

  // v24: optional Earn frame surface (for Spine planning) — fail-open
  getCurrentEarnFrame() {
    return this.loader.packages?.earnFrame || null;
  }

  // v24: Earn / game GPU profile (scheduler view)
  getEarnProfile() {
    return this.loader.earnProfile;
  }

  // v24: Chunk plan + warm path cache (for GPU advantage routing)
  getChunkPlan() {
    return this.loader.chunkPlan;
  }

  getWarmPathCache() {
    return this.loader.warmPathCache;
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
