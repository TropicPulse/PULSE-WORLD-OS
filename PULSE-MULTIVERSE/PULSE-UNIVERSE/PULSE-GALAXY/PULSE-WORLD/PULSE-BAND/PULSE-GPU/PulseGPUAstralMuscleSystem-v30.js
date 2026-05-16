// ============================================================================
//  PULSE GPU ENGINE v30-Immortal+++ — THE ASTRAL MUSCLE SYSTEM (DUAL-LANE)
//  WebGPU Execution Layer • Frame Conductor • GPU Motor Cortex
//  Dual-Mode (Symbolic + Binary) • Dispatch-Aware • Memory-Aware • Presence-Aware
//  Prewarm • Chunk/Cache-Aware • Snapshot-Ready • RAW ENGINE EVIDENCE
//  GPU-CHUNKER-AWARE • WARM-PATH-AWARE • SESSION-TRACE-AWARE
//  PROCESS-WORKER-AWARE (PulseGPUProcessWorker-v30)
//  “MUSCLE OF THE ORGANISM. PRESENCE IN MOTION. TWO LUNGS, ONE BREATH.”
// ============================================================================

import {
  VitalsLogger as logger,
  log,
  warn,
  error,
  comment,
  makeTelemetryPacket as emitTelemetry,
  PulseVersion,
  PulseColors,
  PulseIcons
} from "../___MONITOR/PULSE-PROOF-LOGGER.js";

import { PulseGPURuntime } from "./PulseGPUDrive-v24.js";
import { pulseGPUChunker } from "./PulseGPUChunker-v30.js";

// Genetic memory + warm-path (metadata-only, no GPU calls)
import {
  PulseGPUGeneticMemory
} from "./PulseGPUGeneticMemory-v30.js";

import {
  PulseGPUWarmPathCache
} from "./PulseGPUWarmPathCache-v30.js";

// Process worker (real helper, not hypothetical)
import {
  PulseGPUProcessWorker
} from "../PULSE-ENGINE/PulseEngineGPUProcessWorker-v30.js";

// ============================================================================
//  META BLOCK — v30-Immortal+++
// ============================================================================
export const PULSE_GPU_ENGINE_META = Object.freeze({
  identity: "PulseGPUAstralMuscleSystem",
  version: "30.0-Immortal+++",
  evo: {
    lineage: "astral-muscle-v30",
    dualLane: true,
    warmPathAware: true,
    chunkerAware: true,
    geneticMemoryAware: true,
    processWorkerAware: true,
    sessionTraceAware: true,
    evidenceSurface: "gpu-engine-evidence-v30"
  }
});

// ============================================================================
//  GPU MEMORY / DISPATCH HISTORY (v30 — chunk-aware, snapshot/evidence-ready)
//  • RAW ENGINE EVIDENCE: what was actually dispatched.
//  • Optional GPU chunker integration for structural evidence chunks.
//  • Optional genetic memory mirror (metadata-only).
// ============================================================================
class PulseGPUMemory {
  constructor({
    maxHistory = 1024,
    dnaTag = "default-dna",
    instanceId = "",
    chunker = null,
    warmPathId = "gpu-engine",
    sessionId = null,
    geneticMemory = null
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
    this.geneticMemory = geneticMemory || null;
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
      warmPathId: meta.warmPathId || this.meta.warmPathId || "gpu-engine",
      pressureSnapshot: meta.pressureSnapshot || null
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

    // Optional genetic memory mirror (metadata-only)
    if (this.geneticMemory && typeof this.geneticMemory.recordObservation === "function") {
      try {
        this.geneticMemory.recordObservation({
          gameProfile: { gameId: "pulse-world-gpu", buildVersion: entry.version || "" },
          hardwareProfile: { gpuModel: "webgpu", deviceClass: "browser", platform: "web" },
          tierProfile: { tierId: "default", tierLabel: "gpu-engine", earnTier: "" },
          executionContext: {
            binaryMode: entry.binaryMode ? "binary" : "symbolic",
            pipelineId: exec.pipelineId || "",
            sceneType: exec.sceneType || "",
            workloadClass: exec.workloadClass || "",
            resolution: exec.resolution || "",
            refreshRate: exec.refreshRate || 0,
            dispatchSignature: entry.dispatchSignature || "",
            shapeSignature: entry.shapeSignature || "",
            qualityPreset: "",
            rayTracing: false
          },
          metrics: {
            avgFPS: 0,
            minFPS: 0,
            stutters: 0,
            crashFlag: false
          },
          traceSummary: {
            totalDurationMs: 0,
            pressureSnapshot: entry.pressureSnapshot || null,
            binaryStepCount: entry.binaryMode ? 1 : 0,
            symbolicStepCount: entry.binaryMode ? 0 : 1
          },
          advantageSnapshot: {
            scoreDelta: entry.advantageScore || 0,
            stabilityDelta: 0,
            earnPotential: 0
          },
          computerIntelligence: null,
          earnSnapshot: null
        });
      } catch {
        // non-fatal
      }
    }
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
    const profileId = options.profile || "gpu-engine-evidence-v30";
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
//  RENDER PASS BUILDER (v30 — deterministic, meta-upgraded)
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
//  PIPELINE BUILDER (v30 — cache-friendly, snapshot-aware, warm-path-aware)
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
//  DRAW EXECUTOR (v30 — same logic, upgraded meta, dual-lane aware)
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
//  MAIN ENGINE (WebGPU Backend) — Astral Muscle v30-Immortal+++
//  Dual-Lane: primary + auxiliary “second GPU” lane (logical)
//  ProcessWorker-aware • WarmPath-aware • GeneticMemory-aware
// ============================================================================
class PulseGPUEngine {
  constructor({
    gpuSpine = null,
    binaryGpuSpine = null,
    dnaTag = "default-dna",
    version = "30.0-Immortal+++",
    instanceId = "",
    chunkCache = null,
    chunker = pulseGPUChunker,
    processWorker = null,
    geneticMemory = null,
    warmPathConfig = {}
  } = {}) {
    this.runtime = new PulseGPURuntime();

    this.device = null;
    this.context = null;
    this.colorFormat = "bgra8unorm";

    this.pipelineBuilder = null;
    this.passBuilder = null;
    this.drawExecutor = null;

    // “Second GPU” lane: same device, separate logical lane metadata
    this.auxLane = {
      enabled: true,
      label: "aux-gpu-lane",
      mode: "background"
    };

    this.ready = false;

    this.evo = { ...PULSE_GPU_ENGINE_META.evo };
    this.meta = {
      ...PULSE_GPU_ENGINE_META,
      dnaTag,
      version,
      instanceId
    };

    this.geneticMemory =
      geneticMemory || new PulseGPUGeneticMemory();

    this.gpuMemory = new PulseGPUMemory({
      dnaTag,
      instanceId,
      chunker,
      warmPathId: "gpu-engine-main",
      sessionId: null,
      geneticMemory: this.geneticMemory
    });

    this.gpuSpine = gpuSpine;
    this.binaryGpuSpine = binaryGpuSpine;
    this.chunkCache = chunkCache;
    this.chunker = chunker;

    this.processWorker =
      processWorker ||
      new PulseGPUProcessWorker({
        id: `gpu-engine-worker-${instanceId || "default"}`,
        role: "astral-muscle",
        band: "gpu"
      });

    this.warmPathConfig = warmPathConfig || {};

    log(
      "gpu",
      "[PulseGPUEngine v30-Immortal+++] Constructed — awaiting init().",
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
      "PulseGPUEngine v30-Immortal+++ ready — WebGPU backend active (Astral Muscle, dual-lane)."
    );

    // Kick a process-worker warmup task (metadata-only)
    this._enqueueWorkerTask("engine-init", {
      meta: this.meta,
      warmPathConfig: this.warmPathConfig
    });
  }

  // -------------------------------------------------------------------------
  //  PREWARM — pipelines / caches / chunk-aware warmup + warm-path hints
  // -------------------------------------------------------------------------
  prewarm({ patterns = [], frames = 1, page = "gpu", chunkProfile = "gpu" } = {}) {
    if (!this.device || !this.context) return;

    const uniquePatterns = Array.from(new Set(patterns || []));
    const count = Math.max(1, frames | 0);

    // Warm-path hints (v30++): compute budget + fanout
    const warmHints = PulseGPUWarmPathCache.compute({
      page,
      chunkProfile,
      gpuCapable: true,
      trust: this.warmPathConfig.trust || "trusted",
      risk: this.warmPathConfig.risk || "low",
      pulseStream: this.warmPathConfig.pulseStream || "continuous",
      fastLane: this.warmPathConfig.fastLane || "enabled"
    });

    this._enqueueWorkerTask("prewarm-plan", {
      patterns: uniquePatterns,
      frames: count,
      warmHints
    });

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
              chunkCache: this.chunkCache,
              warmHints
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

    log("gpu", "Prewarm complete (v30++)", {
      patterns: uniquePatterns,
      frames: count,
      warmHints
    });
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
  //  DISPATCH SOURCE — same contract as v24 (runtime-first), dual-lane aware
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

      // Process worker can post-process dispatch metadata (no GPU calls)
      const processed = this._processDispatchWithWorker(dispatch, earnFrame);
      return processed ? [processed] : [dispatch];
    }

    return [];
  }

  // -------------------------------------------------------------------------
  //  FRAME RENDER — RAW ENGINE EXECUTION + EVIDENCE RECORDING (dual-lane)
//   primary lane: foreground; aux lane: background / second-GPU-style
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
      // Aux lane: if no explicit dispatches, still keep “second GPU” breathing
      meshes.forEach((meshBuffers, i) => {
        const pipeline = pipelines[i % pipelines.length];
        this.drawExecutor.drawMesh(encoder, pipeline, meshBuffers);
      });
    }

    const commandBuffer = encoder.finish();
    this.device.queue.submit([commandBuffer]);

    // Process worker gets a tick with engine evidence (no GPU calls)
    this._enqueueWorkerTask("frame-tick", {
      engineSnapshot: this.snapshotEngineSurface(),
      auxLane: this.auxLane
    });
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
        instanceId: this.meta.instanceId,
        dualLane: this.auxLane
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
      gpuMemory: this.gpuMemory.diagnostics(),
      auxLane: this.auxLane
    };
  }

  // -------------------------------------------------------------------------
  //  INTERNAL — Process worker integration
  // -------------------------------------------------------------------------
  _enqueueWorkerTask(kind, payload) {
    try {
      if (!this.processWorker || typeof this.processWorker.enqueue !== "function") {
        return;
      }
      this.processWorker.enqueue({
        kind,
        ts: Date.now(),
        engineId: this.meta.identity,
        version: this.meta.version,
        payload
      });
    } catch {
      // non-fatal
    }
  }

  _processDispatchWithWorker(dispatch, earnFrame) {
    try {
      if (!this.processWorker || typeof this.processWorker.transformDispatch !== "function") {
        return null;
      }
      return this.processWorker.transformDispatch(dispatch, {
        earnFrame,
        engineMeta: this.meta
      });
    } catch {
      return null;
    }
  }
}

// ============================================================================
//  EXPORTS — Astral Muscle System v30-Immortal+++
// ============================================================================
export {
  PulseGPUMemory,
  PulseRenderPassBuilder,
  PulsePipelineBuilder,
  PulseDrawExecutor,
  PulseGPUEngine
};
