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
import {
  OrganismIdentity,
  buildPulseOrganismMap as PulseOrganismMap
} from "./PULSE-WORLD-MAP.js";
const Identity = OrganismIdentity(import.meta.url);
export const PulseGPUChunkerMeta = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
// export const PULSE_EARN_IMMUNE_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;
const PulseGPUChunkContract = Identity.OrganMeta.contract;

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
