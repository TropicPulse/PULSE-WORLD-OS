// ============================================================================
// FILE: /PULSE-GPU/PulseGPUChunkPlanner.js
// PULSE OS — v24 IMMORTAL++
// PULSE‑GPU CHUNK PLANNER — PAGE → GPU CHUNK STRATEGY (GPU CHUNKER-AWARE)
// ============================================================================
//
//  • Pure planner organ: no imports, no side effects, no network.
//  • Symbolically aware of PulseGPUChunker‑v24 (the GPU chunker you wired into
//    the GPU Brain / Astral Nervous System).
//  • Emits explicit hints for: chunkerId, chunkerProfile, lanes, chunk sizes.
//  • The actual PulseGPUChunker‑v24 consumes these hints when chunking.
//
//  Expected sibling organ (not imported here, just referenced):
//    - PulseGPUChunker-v24 (GPU-specialized clone of PulseAIChunker v20)
// ============================================================================

export const AI_EXPERIENCE_META_PulseGPUChunkPlanner = {
  id: "pulsegpu.chunk_planner",
  kind: "planner_organ",
  version: "v24-IMMORTAL++",
  role: "gpu_chunk_planner",
  surfaces: {
    band: ["gpu", "chunks", "layout", "lane32"],
    wave: ["throughput", "latency", "balanced"],
    binary: ["gpu_capable", "gpu_fallback"],
    presence: ["gpu_chunk_plan", "gpu_chunker_profile"],
    advantage: [
      "chunk_strategy",
      "priority_bands",
      "hydration_tier",
      "lane_hint",
      "chunker_profile_hint"
    ],
    speed: "instant_compute",
    chunker: {
      id: "PulseGPUChunker-v24",
      contract: "PulseGPUChunker-v24-IMMORTAL",
      lanes: [8, 16, 32],
      profiles: [
        "backend-default",
        "backend-plan",
        "backend-state",
        "backend-logs",
        "world-state",
        "world-evidence",
        "world-timeline"
      ]
    }
  },
  invariants: {
    networkCalls: "none",
    sideEffects: "none",
    determinism: "strict",
    mutation: "forbidden_at_runtime"
  }
};

export const ORGAN_META_PulseGPUChunkPlanner = {
  id: "organ.pulsegpu.chunk_planner",
  organism: "PulseOS",
  layer: "advantage.gpu",
  tier: "IMMORTAL",
  evoFlags: {
    deterministic: true,
    driftProof: true,
    zeroPII: true,
    zeroTracking: true,
    gpuAware: true,
    pageHintAware: true,
    chunkProfileAware: true,
    modeAware: true,
    presenceAware: true,
    trustAware: true,
    riskAware: true,

    // v24++ extras
    gpuChunkerAware: true,
    gpuChunkerProfileAware: true,
    laneAware: true,
    lane32Preferred: true,
    prewarmAware: true,
    cacheAware: true
  }
};

export const ORGAN_CONTRACT_PulseGPUChunkPlanner = {
  inputs: {
    page: "string",
    chunkProfile: "string", // gpu | rich | minimal | default
    mode: "fast | safe | slow | background",
    presence: "active | idle | background | inactive",
    gpuCapable: "boolean",
    trust: "trusted | neutral | suspicious | hostile | unknown",
    risk: "low | medium | high | critical | unknown",
    gateMode: "fast | safe | slow",

    // GPU chunker hints (symbolic, consumed by PulseGPUChunker‑v24)
    chunkerId: "string (optional, default: PulseGPUChunker-v24)",
    chunkerProfile: "string (optional, maps to PulseGPUChunker profiles)",
    lanes: "number (optional, preferred lane count, e.g. 32)",
    defaultChunkSize: "number (optional, bytes, e.g. 4096)",
    maxChunkSize: "number (optional, bytes, e.g. 65536)"
  },
  outputs: {
    strategy: "string",
    chunks:
      "Array<{ id, priority, band, hydrate, gpuHint, chunkProfile, chunkerId, chunkerProfile, laneHint, lanes, defaultChunkSize, maxChunkSize }>",
    reason: "string",
    chunker: "{ id, profile, lanes, laneHint, defaultChunkSize, maxChunkSize }"
  },
  guarantees: {
    deterministic: true,
    noNetwork: true,
    noSideEffects: true
  }
};

// ============================================================================
// IMPLEMENTATION — v24 IMMORTAL++ (GPU Chunker-aware)
// ============================================================================

export const PulseGPUChunkPlanner = {
  /**
   * plan
   * @param {object} input - See ORGAN_CONTRACT_PulseGPUChunkPlanner.inputs
   * @returns {object} gpuChunkPlan
   */
  plan(input = {}) {
    const page = input.page || "index";
    const chunkProfile = input.chunkProfile || "default";
    const mode = input.mode || "fast";
    const presence = input.presence || "active";
    const gpuCapable = !!input.gpuCapable;
    const trust = input.trust || "unknown";
    const risk = input.risk || "unknown";
    const gateMode = input.gateMode || "fast";

    const chunkerId = input.chunkerId || "PulseGPUChunker-v24";
    const chunkerProfile =
      input.chunkerProfile || deriveChunkerProfileFromPageProfile(chunkProfile);
    const lanes = normalizeLanes(input.lanes);
    const defaultChunkSize = normalizeChunkSize(input.defaultChunkSize, 4096);
    const maxChunkSize = normalizeChunkSize(input.maxChunkSize, 65536);
    const laneHint = lanes >= 32 ? "lane32" : lanes >= 16 ? "lane16" : "lane_auto";

    // If not GPU capable or hostile, fall back immediately.
    if (!gpuCapable || trust === "hostile") {
      return {
        strategy: "fallback",
        reason: !gpuCapable ? "gpu_not_capable" : "trust_hostile",
        chunks: [],
        chunker: {
          id: chunkerId,
          profile: chunkerProfile,
          lanes,
          laneHint,
          defaultChunkSize,
          maxChunkSize
        }
      };
    }

    // Base strategy
    const strategy = computeStrategy({
      chunkProfile,
      mode,
      presence,
      risk,
      gateMode
    });

    // Chunk layout is symbolic; real IDs are for the GPU chunker to map.
    const chunks = buildChunks({
      page,
      strategy,
      chunkProfile,
      trust,
      risk,
      chunkerId,
      chunkerProfile,
      lanes,
      laneHint,
      defaultChunkSize,
      maxChunkSize
    });

    return {
      strategy,
      reason: "planned",
      chunks,
      chunker: {
        id: chunkerId,
        profile: chunkerProfile,
        lanes,
        laneHint,
        defaultChunkSize,
        maxChunkSize
      }
    };
  }
};

// ============================================================================
// INTERNAL HELPERS
// ============================================================================

function computeStrategy({ chunkProfile, mode, presence, risk, gateMode }) {
  let strategy = "balanced";

  if (chunkProfile === "gpu") {
    strategy = "gpu_forward";
  } else if (chunkProfile === "rich") {
    strategy = "rich_forward";
  } else if (chunkProfile === "minimal") {
    strategy = "minimal";
  }

  if (mode === "fast" && risk === "low" && gateMode === "fast") {
    strategy = "aggressive_gpu";
  }

  if (presence === "background" || presence === "inactive") {
    strategy = "low_impact";
  }

  if (risk === "high" || risk === "critical") {
    strategy = "safe_minimal";
  }

  return strategy;
}

function buildChunks({
  page,
  strategy,
  chunkProfile,
  trust,
  risk,
  chunkerId,
  chunkerProfile,
  lanes,
  laneHint,
  defaultChunkSize,
  maxChunkSize
}) {
  const chunks = [];

  // Core page shell
  chunks.push({
    id: `${page}:shell`,
    priority: 1,
    band: "cpu",
    hydrate: "eager",
    gpuHint: "none",
    chunkProfile,
    chunkerId,
    chunkerProfile,
    lanes,
    laneHint,
    defaultChunkSize,
    maxChunkSize
  });

  // GPU‑heavy band
  if (
    strategy === "aggressive_gpu" ||
    strategy === "gpu_forward" ||
    strategy === "rich_forward"
  ) {
    chunks.push({
      id: `${page}:gpu-main`,
      priority: 2,
      band: "gpu",
      hydrate: trust === "trusted" && risk === "low" ? "eager" : "lazy",
      gpuHint: "primary",
      chunkProfile,
      chunkerId,
      chunkerProfile,
      lanes,
      laneHint,
      defaultChunkSize,
      maxChunkSize
    });
  }

  // Supporting visuals
  if (chunkProfile === "rich" || chunkProfile === "gpu") {
    chunks.push({
      id: `${page}:gpu-secondary`,
      priority: 3,
      band: "gpu",
      hydrate: "lazy",
      gpuHint: "secondary",
      chunkProfile,
      chunkerId,
      chunkerProfile,
      lanes,
      laneHint,
      defaultChunkSize,
      maxChunkSize
    });
  }

  // Diagnostics / overlays (low priority)
  chunks.push({
    id: `${page}:diagnostics`,
    priority: 99,
    band: "cpu",
    hydrate: "idle",
    gpuHint: "none",
    chunkProfile,
    chunkerId,
    chunkerProfile,
    lanes,
    laneHint,
    defaultChunkSize,
    maxChunkSize
  });

  return chunks;
}

// ---------------------------------------------------------------------------
// Chunker mapping — align page chunkProfile → PulseGPUChunker‑v24 profiles
// ---------------------------------------------------------------------------

function deriveChunkerProfileFromPageProfile(chunkProfile) {
  switch (chunkProfile) {
    case "gpu":
      // GPU‑heavy, backend generic
      return "backend-default";
    case "rich":
      // World / scene heavy
      return "world-state";
    case "minimal":
      // Logs / diagnostics
      return "backend-logs";
    default:
      return "backend-default";
  }
}

function normalizeLanes(lanes) {
  const n = Number.isFinite(lanes) ? Math.max(1, Math.floor(lanes)) : 32;
  if (n >= 32) return 32;
  if (n >= 16) return 16;
  if (n >= 8) return 8;
  return 4;
}

function normalizeChunkSize(size, fallback) {
  const n = Number.isFinite(size) ? Math.floor(size) : fallback;
  // Clamp between 512B and 1MB
  return Math.min(Math.max(n, 512), 1024 * 1024);
}
