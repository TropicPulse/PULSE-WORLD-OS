// ============================================================================
//  PulseGPU-v10.4
//  Deterministic GPU Dispatch Organ • Pattern + Lineage + Shape • Pressure-Aware
// ============================================================================
//
//  WHAT THIS ORGAN IS:
//  --------------------
//  • The GPU compute organ for the Pulse organism (v10.4).
//  • Builds deterministic GPU dispatch descriptors (no actual GPU calls here).
//  • Pattern-aware, lineage-aware, shape-aware, mode-aware, pressure-aware.
//  • Compatible with PulseSend-v10.4, PulseRouter-v10.4, PulseMesh-v10.4, Earn-v2.
//  • Pure metadata + dispatch planning — no side effects, no randomness.
//
//  WHAT THIS ORGAN IS NOT:
//  ------------------------
//  • Not a router.
//  • Not a mesh engine.
//  • Not a network client.
//  • Not a miner.
//  • Not a GPU driver or kernel launcher.
//  • Not a compute engine by itself.
//
//  SAFETY CONTRACT (v10.4):
//  ------------------------
//  • No imports.
//  • No randomness.
//  • No timestamps.
//  • No external mutation.
//  • Pure deterministic string/shape/field operations.
// ============================================================================


// ============================================================================
// ⭐ GPURole — identifies this as the PulseGPU Organ (v10.4)
// ============================================================================
export const GPURole = {
  type: "GPU",
  subsystem: "PulseGPU",
  layer: "ComputeOrgan",
  version: "10.4",
  identity: "PulseGPU-v10.4",

  evo: {
    driftProof: true,
    patternAware: true,
    lineageAware: true,
    shapeAware: true,
    modeAware: true,
    pressureAware: true,
    deterministicDispatch: true,
    futureEvolutionReady: true,

    unifiedAdvantageField: true,
    gpuV4Ready: true
  },

  pulseContract: "Pulse-v1/v2/v3",
  meshContract: "PulseMesh-v10.4",
  routerContract: "PulseRouter-v10.4",
  sendContract: "PulseSend-v10.4",
  earnContract: "Earn-v2"
};


// ============================================================================
//  INTERNAL HELPERS — deterministic, tiny, pure
// ============================================================================

// Build lineage chain: parentLineage + current pattern
function buildLineage(parentLineage, pattern) {
  const base = Array.isArray(parentLineage) ? parentLineage : [];
  return [...base, pattern];
}

// Compute deterministic shape signature for GPU dispatch
function computeShapeSignature(pattern, lineage) {
  const lineageKey = lineage.join("::");
  const raw = `gpu::${pattern}::${lineageKey}`;

  let acc = 0;
  for (let i = 0; i < raw.length; i++) {
    acc = (acc + raw.charCodeAt(i) * (i + 1)) % 100000;
  }

  return `gpu-shape-${acc}`;
}

// Determine evolution stage for GPU dispatch
function computeEvolutionStage(pattern, lineage) {
  const depth = lineage.length;

  if (depth === 1) return "seed";
  if (depth === 2) return "sprout";
  if (depth === 3) return "branch";

  if (pattern.includes("fuse")) return "fused-kernel";
  if (pattern.includes("batch")) return "batched";
  if (pattern.includes("stream")) return "streaming";
  if (pattern.includes("fallback")) return "fallback-aware";

  return "mature";
}

// Deterministic mode bias based on mode + pressure
function computeModeBias(mode, pressure) {
  const modeLabel = mode || "normal";

  let bias = "neutral";

  if (modeLabel === "latency") bias = "low-latency";
  else if (modeLabel === "throughput") bias = "high-throughput";
  else if (modeLabel === "energy") bias = "low-energy";
  else if (modeLabel === "recovery") bias = "high-reliability";

  const gpuLoad = pressure?.gpuLoadPressure || 0;
  const thermal = pressure?.thermalPressure || 0;
  const mem = pressure?.memoryPressure || 0;

  if (gpuLoad > 0.7 || thermal > 0.7) {
    bias = "fallback-friendly";
  } else if (mem > 0.7) {
    bias = "memory-conservative";
  }

  return bias;
}

// Deterministic dispatch profile selection
function selectDispatchProfile(pattern, modeBias) {
  // No randomness — pure pattern + bias mapping
  const base = {
    style: "neutral",
    kernelType: "standard",
    maxBatchSize: 1,
    allowFusion: false,
    allowStreaming: false,
    allowFallbackCPU: true
  };

  if (pattern.includes("fuse")) {
    return {
      style: "fused",
      kernelType: "fused",
      maxBatchSize: 8,
      allowFusion: true,
      allowStreaming: false,
      allowFallbackCPU: true
    };
  }

  if (pattern.includes("batch")) {
    return {
      style: "batched",
      kernelType: "batched",
      maxBatchSize: 32,
      allowFusion: false,
      allowStreaming: true,
      allowFallbackCPU: true
    };
  }

  if (pattern.includes("stream")) {
    return {
      style: "streaming",
      kernelType: "streaming",
      maxBatchSize: 4,
      allowFusion: false,
      allowStreaming: true,
      allowFallbackCPU: true
    };
  }

  if (modeBias === "low-latency") {
    return {
      style: "latency-first",
      kernelType: "standard",
      maxBatchSize: 1,
      allowFusion: false,
      allowStreaming: false,
      allowFallbackCPU: true
    };
  }

  if (modeBias === "high-throughput") {
    return {
      style: "throughput-first",
      kernelType: "batched",
      maxBatchSize: 64,
      allowFusion: true,
      allowStreaming: true,
      allowFallbackCPU: true
    };
  }

  if (modeBias === "fallback-friendly") {
    return {
      style: "fallback-aware",
      kernelType: "standard",
      maxBatchSize: 2,
      allowFusion: false,
      allowStreaming: false,
      allowFallbackCPU: true
    };
  }

  return base;
}


// ============================================================================
//  FACTORY — Create a GPU Dispatch Descriptor (v10.4)
// ============================================================================
//
//  This does NOT launch GPU work.
//  It only builds a deterministic descriptor that other organs can use.
// ============================================================================

export function createGPUDispatch({
  jobId,
  pattern,
  payload = {},
  mode = "normal",
  parentLineage = null,
  pressureSnapshot = null
}) {
  const lineage        = buildLineage(parentLineage, pattern);
  const shapeSignature = computeShapeSignature(pattern, lineage);
  const evolutionStage = computeEvolutionStage(pattern, lineage);
  const modeBias       = computeModeBias(mode, pressureSnapshot || {});

  const profile = selectDispatchProfile(pattern, modeBias);

  return {
    GPURole,
    jobId,
    pattern,
    payload,
    mode,
    lineage,
    meta: {
      shapeSignature,
      evolutionStage,
      modeBias,
      profile
    }
  };
}


// ============================================================================
//  EVOLUTION ENGINE — evolve an existing GPU dispatch deterministically
// ============================================================================
//
//  This is analogous to evolveEarn, but for GPU dispatch patterns.
//  It never mutates the original dispatch; always returns a new one.
// ============================================================================

export function evolveGPUDispatch(dispatch, context = {}) {
  const { mode: nextMode, pressureSnapshot } = context;

  const modeLabel = nextMode || dispatch.mode || "normal";
  const lineage   = Array.isArray(dispatch.lineage) ? dispatch.lineage : [];
  const pattern   = dispatch.pattern;

  const nextLineage     = buildLineage(lineage, pattern);
  const shapeSignature  = computeShapeSignature(pattern, nextLineage);
  const evolutionStage  = computeEvolutionStage(pattern, nextLineage);
  const modeBias        = computeModeBias(modeLabel, pressureSnapshot || {});
  const profile         = selectDispatchProfile(pattern, modeBias);

  return {
    GPURole,
    jobId: dispatch.jobId,
    pattern,
    payload: dispatch.payload,
    mode: modeLabel,
    lineage: nextLineage,
    meta: {
      shapeSignature,
      evolutionStage,
      modeBias,
      profile
    }
  };
}


// ============================================================================
//  PUBLIC ORGAN — PulseGPU (v10.4)
// ============================================================================
//
//  This is what other organs (Router, Mesh, Send, Earn) talk to.
//  It stays pure: no GPU driver calls, no side effects.
// ============================================================================

export const PulseGPU = {

  GPURole,

  // --------------------------------------------------------------------------
  //  plan(earn, mode?, pressureSnapshot?)
  // --------------------------------------------------------------------------
  //
  //  Given an Earn v2 organism, build a GPU dispatch descriptor.
  //  This is the main entry point used by Earn → GPU pipelines.
  // --------------------------------------------------------------------------
  plan(earn, mode = "normal", pressureSnapshot = null) {
    const jobId   = earn.jobId;
    const pattern = earn.pattern || "gpu-default";
    const payload = earn.payload || {};
    const lineage = earn.lineage || [];

    return createGPUDispatch({
      jobId,
      pattern,
      payload,
      mode,
      parentLineage: lineage,
      pressureSnapshot
    });
  },

  // --------------------------------------------------------------------------
  //  evolve(dispatch, context?)
  // --------------------------------------------------------------------------
  evolve(dispatch, context = {}) {
    return evolveGPUDispatch(dispatch, context);
  },

  // --------------------------------------------------------------------------
  //  diagnostics() — optional introspection
  // --------------------------------------------------------------------------
  diagnostics() {
    return {
      GPURole
    };
  }
};
