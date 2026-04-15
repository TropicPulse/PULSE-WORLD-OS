// FILE: tropic-pulse-functions/apps/pulse-gpu/PulseGPUEngine.js
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
//   The Pulse GPU Engine — consumes PulseGPURuntime, builds GPU pipelines,
//   constructs render passes, and executes draw calls. This is the final
//   stage of the Pulse GPU subsystem.
//
//   This file IS:
//     • A frontend‑only WebGPU execution layer
//     • A renderer that issues draw calls
//     • A consumer of GPU‑ready packages from PulseGPURuntime
//
//   This file IS NOT:
//     • A backend module
//     • A CPU‑side optimizer (that’s PulseGPUBrain)
//     • A GPU memory manager (that’s PulseGPURuntime)
//     • A shader compiler (that’s PulseGPUBrain)
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
//     • PulseGPURuntime from ./PulseGPURuntime.js
//
//   Forbidden:
//     • Node.js APIs
//     • Firebase, Stripe, Twilio, or any backend modules
//     • DOM manipulation outside WebGPU context
//     • Any environment‑specific dependencies
//
// INTERNAL LOGIC SUMMARY:
//   • PulseRenderPassBuilder:
//       - Builds basic render pass descriptors
//
//   • PulsePipelineBuilder:
//       - Creates WebGPU render pipelines from shader modules
//
//   • PulseDrawExecutor:
//       - Issues draw calls for meshes
//       - Creates temporary render targets
//
//   • PulseGPUEngine:
//       - Initializes PulseGPURuntime
//       - Builds pipelines from shader modules
//       - Iterates meshes and draws them
//       - Submits command buffers to GPU queue
//
// SAFETY NOTES:
//   • Must NEVER run on backend — WebGPU is browser‑only
//   • Must NEVER assume device size — hardcoded textures are temporary
//   • Must NEVER mutate runtime internals directly
//   • Must ALWAYS check readiness before rendering
//   • Must remain deterministic and side‑effect‑free outside init()
// ------------------------------------------------------
// Consumes PulseGPURuntime → builds pipelines →
// executes render passes and draw calls.
// ------------------------------------------------------

import {
  PulseGPURuntime
} from "./PulseGPURuntime.js";

// ------------------------------------------------------
// RENDER PASS BUILDER
// ------------------------------------------------------

class PulseRenderPassBuilder {
  constructor(device, context) {
    this.device = device;
    this.context = context;
  }

  createBasicPass(colorTextureView) {
    return {
      colorAttachments: [
        {
          view: colorTextureView,
          clearValue: { r: 0, g: 0, b: 0, a: 1 },
          loadOp: "clear",
          storeOp: "store"
        }
      ]
    };
  }
}

// ------------------------------------------------------
// PIPELINE BUILDER
// ------------------------------------------------------

class PulsePipelineBuilder {
  constructor(device) {
    this.device = device;
  }

  createPipeline(shaderModule, vertexLayout) {
    return this.device.createRenderPipeline({
      layout: "auto",
      vertex: {
        module: shaderModule,
        entryPoint: "vs_main",
        buffers: vertexLayout
      },
      fragment: {
        module: shaderModule,
        entryPoint: "fs_main",
        targets: [{ format: "bgra8unorm" }]
      },
      primitive: {
        topology: "triangle-list"
      }
    });
  }
}

// ------------------------------------------------------
// DRAW CALL EXECUTOR
// ------------------------------------------------------

class PulseDrawExecutor {
  constructor(device) {
    this.device = device;
  }

  drawMesh(encoder, pipeline, meshBuffers) {
    const pass = encoder.beginRenderPass({
      colorAttachments: [
        {
          view: this.device
            .createTexture({
              size: [800, 600],
              format: "bgra8unorm",
              usage: GPUTextureUsage.RENDER_ATTACHMENT
            })
            .createView(),
          clearValue: { r: 0, g: 0, b: 0, a: 1 },
          loadOp: "clear",
          storeOp: "store"
        }
      ]
    });

    pass.setPipeline(pipeline);
    pass.setVertexBuffer(0, meshBuffers.vertexBuffer);
    pass.setIndexBuffer(meshBuffers.indexBuffer, "uint32");
    pass.drawIndexed(meshBuffers.indexBuffer.size / 4);
    pass.end();
  }
}

// ------------------------------------------------------
// MAIN ENGINE
// ------------------------------------------------------

class PulseGPUEngine {
  constructor() {
    this.runtime = new PulseGPURuntime();
    this.device = null;

    this.pipelineBuilder = null;
    this.passBuilder = null;
    this.drawExecutor = null;

    this.ready = false;
  }

  async init() {
    await this.runtime.init();

    this.device = this.runtime.context.device;

    this.pipelineBuilder = new PulsePipelineBuilder(this.device);
    this.passBuilder = new PulseRenderPassBuilder(
      this.device,
      this.runtime.context
    );
    this.drawExecutor = new PulseDrawExecutor(this.device);

    this.ready = true;
  }

  // ----------------------------------------------------
  // BUILD PIPELINES FROM SHADERS
  // ----------------------------------------------------
  buildPipelines() {
    const shaders = this.runtime.getShaders();
    const pipelines = [];

    shaders.forEach((shaderModule) => {
      const pipeline = this.pipelineBuilder.createPipeline(shaderModule, [
        {
          arrayStride: 12,
          attributes: [{ shaderLocation: 0, offset: 0, format: "float32x3" }]
        }
      ]);

      pipelines.push(pipeline);
    });

    return pipelines;
  }

  // ----------------------------------------------------
  // RENDER A FRAME
  // ----------------------------------------------------
  renderFrame() {
    if (!this.ready) return;

    const meshes = this.runtime.getMeshes();
    const shaders = this.runtime.getShaders();

    if (!meshes.length || !shaders.length) return;

    const pipelines = this.buildPipelines();

    const encoder = this.device.createCommandEncoder();

    meshes.forEach((meshBuffers, i) => {
      const pipeline = pipelines[i % pipelines.length];
      this.drawExecutor.drawMesh(encoder, pipeline, meshBuffers);
    });

    const commandBuffer = encoder.finish();
    this.device.queue.submit([commandBuffer]);
  }
}

// ------------------------------------------------------
// EXPORTS
// ------------------------------------------------------

export {
  PulseGPUEngine,
  PulsePipelineBuilder,
  PulseRenderPassBuilder,
  PulseDrawExecutor
};