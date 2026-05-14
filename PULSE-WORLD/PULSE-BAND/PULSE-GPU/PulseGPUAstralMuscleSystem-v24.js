/* global log,warn */
// ============================================================================
//  PULSE GPU ENGINE v24-Immortal++ — THE ASTRAL MUSCLE SYSTEM
//  WebGPU Execution Layer • Frame Conductor • GPU Motor Cortex
//  Dual-Mode (Symbolic + Binary) • Dispatch-Aware • Memory-Aware • Presence-Aware
//  Prewarm • Chunk/Cache-Aware • Snapshot-Ready • RAW ENGINE EVIDENCE
//  GPU-CHUNKER-AWARE • WARM-PATH-AWARE • SESSION-TRACE-AWARE
//  “MUSCLE OF THE ORGANISM. PRESENCE IN MOTION.”
// ============================================================================
//
//  Same organ shape as v16:
//    • Same import shape (PulseGPURuntime only, plus local helpers).
//    • Same class layout: PulseGPUMemory, PulseRenderPassBuilder,
//      PulsePipelineBuilder, PulseDrawExecutor, PulseGPUEngine.
//    • Same export surface.
//
//  Upgrades (v24-Immortal++):
//    • Version bumped to v24-Immortal++.
//    • Evo/meta upgraded (prewarm, chunk/cache, snapshot, evidence).
//    • GPU chunker-aware: can emit chunked engine evidence.
//    • Warm-path-aware + session-trace-aware hooks via metadata.
// ============================================================================
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝

// 2 — EXPORT GENOME METADATA
export const PULSE_GPU_ENGINE_META = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const GPURole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
// export const PULSE_EARN_IMMUNE_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

import { PulseGPURuntime } from "./PulseGPUDrive-v24.js";
import { pulseGPUChunker } from "./PulseGPUChunker-v24.js";


// ============================================================================
//  GPU MEMORY / DISPATCH HISTORY (v24 — chunk-aware, snapshot/evidence-ready)
//  • RAW ENGINE EVIDENCE: what was actually dispatched.
//  • Optional GPU chunker integration for structural evidence chunks.
// ============================================================================
class PulseGPUMemory {
  constructor({
    maxHistory = 512,
    dnaTag = "default-dna",
    instanceId = "",
    chunker = null,
    warmPathId = "gpu-engine",
    sessionId = null
  } = {}) {
    this.maxHistory = maxHistory;
    this.history = [];
    this.byPattern = Object.create(null);
    this.meta = {
      ...PULSE_GPU_ENGINE_META,
      block: "GPUMemory",
      dnaTag,
      instanceId,
      warmPathId,
      sessionId
    };
    this.chunker = chunker || null;
  }

  recordDispatch(dispatch) {
    if (!dispatch || typeof dispatch !== "object") return;

    const meta = dispatch.meta || {};
    const exec = dispatch.executionContext || {};

    const entry = {
      ts: Date.now(),
      jobId: dispatch.jobId || null,
      pattern: dispatch.pattern || "gpu-default",
      shapeSignature: meta.shapeSignature || null,
      dispatchSignature: meta.dispatchSignature || null,
      evolutionStage: meta.evolutionStage || null,
      mode: dispatch.mode || "normal",
      modeKind: dispatch.modeKind || "symbolic",
      binaryMode: !!dispatch.binaryMode || exec.binaryMode === "binary",
      dualMode: !!dispatch.dualMode,
      profile: meta.profile || null,
      advantageScore: meta.advantageScore || 0,
      dnaTag: dispatch.dnaTag || null,
      version: dispatch.version || null,
      instanceId: exec.instanceId || null,
      warmPathId: meta.warmPathId || this.meta.warmPathId || "gpu-engine"
    };

    this.history.push(entry);
    if (this.history.length > this.maxHistory) {
      this.history.shift();
    }

    const key = entry.pattern;
    const bucket = this.byPattern[key] || {
      count: 0,
      lastProfile: null,
      lastShapeSignature: null,
      lastDispatchSignature: null,
      lastEvolutionStage: null,
      lastMode: null,
      lastModeKind: null,
      lastBinaryMode: null,
      lastDualMode: null,
      lastAdvantageScore: 0,
      lastDnaTag: null,
      lastVersion: null,
      lastInstanceId: null,
      lastWarmPathId: null
    };

    bucket.count += 1;
    bucket.lastProfile = entry.profile;
    bucket.lastShapeSignature = entry.shapeSignature;
    bucket.lastDispatchSignature = entry.dispatchSignature;
    bucket.lastEvolutionStage = entry.evolutionStage;
    bucket.lastMode = entry.mode;
    bucket.lastModeKind = entry.modeKind;
    bucket.lastBinaryMode = entry.binaryMode;
    bucket.lastDualMode = entry.dualMode;
    bucket.lastAdvantageScore = entry.advantageScore;
    bucket.lastDnaTag = entry.dnaTag;
    bucket.lastVersion = entry.version;
    bucket.lastInstanceId = entry.instanceId;
    bucket.lastWarmPathId = entry.warmPathId;

    this.byPattern[key] = bucket;
  }

  bestProfileForPattern(pattern) {
    const key = pattern || "gpu-default";
    const bucket = this.byPattern[key];
    if (!bucket) return null;

    return {
      profile: bucket.lastProfile,
      shapeSignature: bucket.lastShapeSignature,
      dispatchSignature: bucket.lastDispatchSignature,
      evolutionStage: bucket.lastEvolutionStage,
      mode: bucket.lastMode,
      modeKind: bucket.lastModeKind,
      binaryMode: bucket.lastBinaryMode,
      dualMode: bucket.lastDualMode,
      advantageScore: bucket.lastAdvantageScore,
      dnaTag: bucket.lastDnaTag,
      version: bucket.lastVersion,
      instanceId: bucket.lastInstanceId,
      warmPathId: bucket.lastWarmPathId
    };
  }

  diagnostics() {
    return {
      meta: this.meta,
      totalHistory: this.history.length,
      patternsTracked: Object.keys(this.byPattern).length
    };
  }

  snapshot() {
    return {
      meta: this.meta,
      totalHistory: this.history.length,
      patternsTracked: Object.keys(this.byPattern).length,
      lastEntries: this.history.slice(-32)
    };
  }

  snapshotChunks(options = {}) {
    if (!this.chunker) return null;

    const payload = this.snapshot();
    const profileId = options.profile || "gpu-engine-evidence";
    const worldBand = options.worldBand || "backend";

    const chunks = this.chunker.chunkJSON(payload, {
      band: "symbolic",
      backendKind: "gpu-engine-evidence",
      worldBand,
      profile: profileId,
      chunkProfile: profileId,
      uid: options.uid || null,
      lineage: options.lineage || null,
      route: options.route || null,
      organism: options.organism || "PulseGPU"
    });

    return {
      meta: {
        ...this.meta,
        chunkProfile: profileId,
        worldBand
      },
      chunks
    };
  }
}


// ============================================================================
//  RENDER PASS BUILDER (v24 — deterministic, meta-upgraded)
// ============================================================================
class PulseRenderPassBuilder {
  constructor(device, context, format = "bgra8unorm") {
    this.device = device;
    this.context = context;
    this.format = format;
    this.meta = { ...PULSE_GPU_ENGINE_META, block: "RenderPassBuilder" };
  }

  createBasicPassDescriptor(clearValue = { r: 0, g: 0, b: 0, a: 1 }) {
    const currentTexture = this.context.getCurrentTexture();
    const view = currentTexture.createView();

    return {
      colorAttachments: [
        {
          view,
          clearValue,
          loadOp: "clear",
          storeOp: "store"
        }
      ]
    };
  }
}


// ============================================================================
//  PIPELINE BUILDER (v24 — cache-friendly, snapshot-aware, warm-path-aware)
// ============================================================================
class PulsePipelineBuilder {
  constructor(device, colorFormat = "bgra8unorm") {
    this.device = device;
    this.colorFormat = colorFormat;
    this.meta = { ...PULSE_GPU_ENGINE_META, block: "PipelineBuilder" };

    this.pipelineCache = new Map();
  }

  getCacheKey(shaderModule) {
    return String(shaderModule);
  }

  createPipeline(shaderModule, vertexLayout) {
    const key = this.getCacheKey(shaderModule);
    if (this.pipelineCache.has(key)) {
      return this.pipelineCache.get(key);
    }

    const pipeline = this.device.createRenderPipeline({
      layout: "auto",
      vertex: {
        module: shaderModule,
        entryPoint: "vs_main",
        buffers: vertexLayout
      },
      fragment: {
        module: shaderModule,
        entryPoint: "fs_main",
        targets: [{ format: this.colorFormat }]
      },
      primitive: {
        topology: "triangle-list"
      }
    });

    this.pipelineCache.set(key, pipeline);
    return pipeline;
  }

  snapshot() {
    return {
      ts: Date.now(),
      cacheSize: this.pipelineCache.size
    };
  }
}


// ============================================================================
//  DRAW EXECUTOR (v24 — same logic, upgraded meta)
// ============================================================================
class PulseDrawExecutor {
  constructor(device, passBuilder) {
    this.device = device;
    this.passBuilder = passBuilder;
    this.meta = { ...PULSE_GPU_ENGINE_META, block: "DrawExecutor" };
  }

  drawMesh(encoder, pipeline, meshBuffers) {
    if (!pipeline || !meshBuffers) return;

    const passDesc = this.passBuilder.createBasicPassDescriptor();
    const pass = encoder.beginRenderPass(passDesc);

    pass.setPipeline(pipeline);
    pass.setVertexBuffer(0, meshBuffers.vertexBuffer);
    pass.setIndexBuffer(meshBuffers.indexBuffer, "uint32");

    const indexCount =
      typeof meshBuffers.indexCount === "number"
        ? meshBuffers.indexCount
        : meshBuffers.indexBuffer.size / 4;

    pass.drawIndexed(indexCount);
    pass.end();
  }
}


// ============================================================================
//  MAIN ENGINE (WebGPU Backend) — Astral Muscle (v24-Immortal++)
//  Dual-Mode Aware • Dispatch-Aware • Memory-Aware • Presence-Aware
//  Prewarm + Chunk/Cache + Snapshot + RAW ENGINE EVIDENCE
// ============================================================================
class PulseGPUEngine {
  constructor({
    gpuSpine = null,
    binaryGpuSpine = null,
    dnaTag = "default-dna",
    version = "24.0-Immortal++",
    instanceId = "",
    chunkCache = null,
    chunker = pulseGPUChunker
  } = {}) {
    this.runtime = new PulseGPURuntime();

    this.device = null;
    this.context = null;
    this.colorFormat = "bgra8unorm";

    this.pipelineBuilder = null;
    this.passBuilder = null;
    this.drawExecutor = null;

    this.ready = false;

    this.evo = { ...PULSE_GPU_ENGINE_META.evo };
    this.meta = {
      ...PULSE_GPU_ENGINE_META,
      dnaTag,
      version,
      instanceId
    };

    this.gpuMemory = new PulseGPUMemory({
      dnaTag,
      instanceId,
      chunker,
      warmPathId: "gpu-engine-main",
      sessionId: null
    });

    this.gpuSpine = gpuSpine;
    this.binaryGpuSpine = binaryGpuSpine;
    this.chunkCache = chunkCache;
    this.chunker = chunker;

    log(
      "gpu",
      "[PulseGPUEngine v24-Immortal++] Constructed — awaiting init().",
      "color:#03A9F4; font-weight:bold;"
    );
  }

  async init(canvas) {
    if (!canvas) {
      warn("gpu", "No canvas provided — engine inactive (fail-open).");
      this.ready = false;
      return;
    }

    try {
      await this.runtime.init(canvas);
    } catch (err) {
      warn("gpu", "Runtime init failed (fail-open).", err);
      this.ready = false;
      return;
    }

    const gpuContext =
      this.runtime.getGPUContext?.() || this.runtime.context;

    if (!gpuContext || !gpuContext.device || !gpuContext.context) {
      warn("gpu", "GPU context unavailable — engine inactive (fail-open).");
      this.ready = false;
      return;
    }

    this.device = gpuContext.device;
    this.context = gpuContext.context;
    this.colorFormat = gpuContext.format || "bgra8unorm";

    this.pipelineBuilder = new PulsePipelineBuilder(this.device, this.colorFormat);
    this.passBuilder = new PulseRenderPassBuilder(this.device, this.context, this.colorFormat);
    this.drawExecutor = new PulseDrawExecutor(this.device, this.passBuilder);

    this.ready = true;

    log(
      "gpu",
      "PulseGPUEngine v24-Immortal++ ready — WebGPU backend active (Astral Muscle)."
    );
  }

  // -------------------------------------------------------------------------
  //  PREWARM — pipelines / caches / chunk-aware warmup
  // -------------------------------------------------------------------------
  prewarm({ patterns = [], frames = 1 } = {}) {
    if (!this.device || !this.context) return;

    const uniquePatterns = Array.from(new Set(patterns || []));
    const count = Math.max(1, frames | 0);

    for (let i = 0; i < uniquePatterns.length; i++) {
      const pattern = uniquePatterns[i] || "gpu-default";

      for (let f = 0; f < count; f++) {
        try {
          const passDesc = this.passBuilder.createBasicPassDescriptor();
          const commandEncoder = this.device.createCommandEncoder();
          const passEncoder = commandEncoder.beginRenderPass(passDesc);

          if (typeof this.runtime.prewarmDraw === "function") {
            this.runtime.prewarmDraw(passEncoder, {
              pattern,
              chunkCache: this.chunkCache
            });
          }

          passEncoder.end();
          const commandBuffer = commandEncoder.finish();
          this.device.queue.submit([commandBuffer]);
        } catch (err) {
          warn("gpu", "Prewarm error", err);
        }
      }
    }

    log("gpu", "Prewarm complete", { patterns: uniquePatterns, frames: count });
  }

  // -------------------------------------------------------------------------
  //  PIPELINES — deterministic, cache-friendly
  // -------------------------------------------------------------------------
  buildPipelines() {
    const shaders =
      this.runtime.getShadersFromPackages?.() ||
      this.runtime.getShaders?.() ||
      [];

    if (!Array.isArray(shaders) || shaders.length === 0) return [];

    return shaders.map((shaderModule) =>
      this.pipelineBuilder.createPipeline(shaderModule, [
        {
          arrayStride: 12,
          attributes: [{ shaderLocation: 0, offset: 0, format: "float32x3" }]
        }
      ])
    );
  }

  // -------------------------------------------------------------------------
  //  DISPATCH SOURCE — same contract as v16 (runtime-first)
  // -------------------------------------------------------------------------
  getDispatches() {
    const fromRuntime =
      this.runtime.getGPUDispatchesFromPackages?.() ||
      this.runtime.getGPUDispatches?.() ||
      [];

    if (Array.isArray(fromRuntime) && fromRuntime.length > 0) {
      return fromRuntime;
    }

    const earnFrame = this.runtime.getCurrentEarnFrame?.();
    if (earnFrame && (this.gpuSpine || this.binaryGpuSpine)) {
      const modeKind = earnFrame.modeKind || "symbolic";
      const spine =
        modeKind === "binary" && this.binaryGpuSpine
          ? this.binaryGpuSpine
          : this.gpuSpine;

      if (!spine || typeof spine.plan !== "function") return [];

      const dispatch = spine.plan(
        earnFrame,
        "normal",
        modeKind,
        earnFrame.pressureSnapshot || null,
        {
          ...(earnFrame.executionContext || {}),
          multiInstance: !!earnFrame.multiInstance,
          instanceId: earnFrame.instanceId || this.meta.instanceId
        },
        earnFrame.dnaTag || this.meta.dnaTag,
        earnFrame.version || this.meta.version
      );
      return dispatch ? [dispatch] : [];
    }

    return [];
  }

  // -------------------------------------------------------------------------
  //  FRAME RENDER — RAW ENGINE EXECUTION + EVIDENCE RECORDING
  // -------------------------------------------------------------------------
  renderFrame() {
    if (!this.ready) return;

    const meshes =
      this.runtime.getMeshesFromPackages?.() ||
      this.runtime.getMeshes?.() ||
      [];
    const shaders =
      this.runtime.getShadersFromPackages?.() ||
      this.runtime.getShaders?.() ||
      [];

    if (!meshes.length || !shaders.length) return;

    const pipelines = this.buildPipelines();
    if (!pipelines.length) return;

    const encoder = this.device.createCommandEncoder();

    const dispatches = this.getDispatches();

    if (dispatches.length > 0) {
      dispatches.forEach((dispatch, i) => {
        this.gpuMemory.recordDispatch(dispatch);

        const meshIndex = i % meshes.length;
        const pipelineIndex = i % pipelines.length;

        const meshBuffers = meshes[meshIndex];
        const pipeline = pipelines[pipelineIndex];

        this.drawExecutor.drawMesh(encoder, pipeline, meshBuffers);
      });
    } else {
      meshes.forEach((meshBuffers, i) => {
        const pipeline = pipelines[i % pipelines.length];
        this.drawExecutor.drawMesh(encoder, pipeline, meshBuffers);
      });
    }

    const commandBuffer = encoder.finish();
    this.device.queue.submit([commandBuffer]);
  }

  // -------------------------------------------------------------------------
  //  SNAPSHOT SURFACE — for WorldCore + PulseTrustEvidence
  // -------------------------------------------------------------------------
  snapshotEngineSurface() {
    const gpuMemorySnapshot = this.gpuMemory.snapshot();
    const pipelineSnapshot = this.pipelineBuilder
      ? this.pipelineBuilder.snapshot()
      : null;

    return {
      ts: Date.now(),
      meta: {
        identity: "PulseGPUAstralMuscleSystem",
        version: this.meta.version,
        instanceId: this.meta.instanceId
      },
      engine: {
        ready: this.ready,
        colorFormat: this.colorFormat
      },
      memory: gpuMemorySnapshot,
      pipelines: pipelineSnapshot
    };
  }

  // Chunked snapshot surface (symbolic evidence chunks via GPU chunker)
  snapshotEngineSurfaceChunks(options = {}) {
    return this.gpuMemory.snapshotChunks({
      ...options,
      organism: "PulseGPU"
    });
  }

  diagnostics() {
    return {
      meta: this.meta,
      evo: this.evo,
      gpuMemory: this.gpuMemory.diagnostics()
    };
  }
}


// ============================================================================
//  EXPORTS — Astral Muscle System v24-Immortal++
// ============================================================================
export {
  PulseGPUMemory,
  PulseRenderPassBuilder,
  PulsePipelineBuilder,
  PulseDrawExecutor,
  PulseGPUEngine
};
