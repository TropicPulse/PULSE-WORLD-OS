// PulseGPUEngine.js
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