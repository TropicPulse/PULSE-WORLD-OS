// ============================================================================
// FILE: /PULSE-GPU/PulseGPUChunkPlanner-v30-IMMORTAL-INTEL-OMEGA.js
// PULSE OS — v30 IMMORTAL-INTEL-OMEGA
// PULSE‑GPU CHUNK PLANNER — PAGE → GPU CHUNK STRATEGY (GPU CHUNKER-AWARE)
// Binary-Indexed • GPU-Mode-Aware (metadata only) • Evolution-Surface-Aware
// ============================================================================
//
//  • Pure planner organ: no imports, no side effects, no network.
//  • Symbolically aware of PulseGPUChunker‑v24/v30 (GPU chunker wired into
//    the GPU Brain / Astral Nervous System).
//  • Emits explicit hints for: chunkerId, chunkerProfile, lanes, chunk sizes.
//  • Emits binary index surfaces per chunk (metadata only, no IO).
//  • Emits a plan-level binary index surface (metadata only, no IO).
//  • The actual PulseGPUChunker consumes these hints when chunking.
//
//  Expected sibling organs (not imported here, just referenced):
//    - PulseGPUChunker-v24 / PulseGPUChunker-v30
// ============================================================================
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝


// ============================================================================
// INTEL HASH HELPERS — v30 IMMORTAL-INTEL-OMEGA
// ============================================================================

function computeHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `h${h}`;
}

function computeHashIntelligence(payload) {
  const base = JSON.stringify(payload || "");
  let h = 0;
  for (let i = 0; i < base.length; i++) {
    const c = base.charCodeAt(i);
    h = (h * 131 + c * (i + 7)) % 1000000007;
  }
  return `HINTEL_${h}`;
}

function buildDualHashSignature(label, intelPayload, classicString) {
  const intelBase = {
    label,
    intel: intelPayload || {},
    classic: classicString || ""
  };
  const intelHash = computeHashIntelligence(intelBase);
  const classicHash = computeHash(`${label}::${classicString || ""}`);
  return {
    intel: intelHash,
    classic: classicHash
  };
}

// ============================================================================
// GPU MODE + RISK HELPERS (metadata only)
// ============================================================================

function normalizeGpuModeFromContext({ mode, presence, risk }) {
  // purely symbolic GPU "mode" for planning metadata
  if (risk === "high" || risk === "critical") return "safe";
  if (presence === "background" || presence === "inactive") return "background";

  const m = String(mode || "fast").toLowerCase();
  if (m === "fast") return "aggressive";
  if (m === "balanced") return "balanced";
  if (m === "safe") return "safe";
  return "balanced";
}

function normalizeRisk(risk) {
  const r = String(risk || "unknown").toLowerCase();
  if (r === "low") return "low";
  if (r === "medium") return "medium";
  if (r === "high") return "high";
  if (r === "critical") return "critical";
  return "unknown";
}

function normalizeTrust(trust) {
  const t = String(trust || "unknown").toLowerCase();
  if (t === "trusted") return "trusted";
  if (t === "untrusted") return "untrusted";
  if (t === "hostile") return "hostile";
  return "unknown";
}

// ============================================================================
// BINARY INDEX SURFACES — PLAN + CHUNK (metadata only)
// ============================================================================

function buildPlanBinaryIndex({
  page,
  strategy,
  chunkProfile,
  trust,
  risk,
  gpuMode,
  lanes,
  defaultChunkSize,
  maxChunkSize,
  chunkCount
}) {
  const trustNorm = normalizeTrust(trust);
  const riskNorm = normalizeRisk(risk);

  const trustRank =
    trustNorm === "trusted" ? 2 :
    trustNorm === "untrusted" ? 1 :
    trustNorm === "hostile" ? 0 :
    1;

  const riskRank =
    riskNorm === "low" ? 0 :
    riskNorm === "medium" ? 1 :
    riskNorm === "high" ? 2 :
    riskNorm === "critical" ? 3 :
    1;

  const modeRank =
    gpuMode === "aggressive" ? 3 :
    gpuMode === "balanced" ? 2 :
    gpuMode === "safe" ? 1 :
    gpuMode === "background" ? 0 :
    1;

  const profileRank =
    chunkProfile === "gpu" ? 3 :
    chunkProfile === "rich" ? 2 :
    chunkProfile === "minimal" ? 1 :
    1;

  const laneRank = lanes >= 32 ? 3 : lanes >= 16 ? 2 : lanes >= 8 ? 1 : 0;

  const sizeRank =
    maxChunkSize >= 65536 ? 3 :
    maxChunkSize >= 32768 ? 2 :
    maxChunkSize >= 8192 ? 1 :
    0;

  const surface =
    (page ? String(page).length : 4) * 2 +
    profileRank * 11 +
    laneRank * 7 +
    sizeRank * 5 +
    modeRank * 3 +
    trustRank * 2 +
    riskRank +
    chunkCount;

  const binaryIndex = {
    page: page || "index",
    strategy,
    chunkProfile,
    trust: trustNorm,
    risk: riskNorm,
    gpuMode,
    lanes,
    defaultChunkSize,
    maxChunkSize,
    chunkCount,
    surface,
    parity: surface % 2 === 0 ? 0 : 1,
    density:
      profileRank +
      laneRank +
      sizeRank +
      modeRank +
      trustRank +
      riskRank
  };

  const classicString =
    `GPU_CHUNK_PLAN_V30::page:${page || "index"}` +
    `::strategy:${strategy}` +
    `::profile:${chunkProfile}` +
    `::mode:${gpuMode}` +
    `::lanes:${lanes}` +
    `::chunks:${chunkCount}` +
    `::surf:${surface}`;

  const sig = buildDualHashSignature(
    "PULSE_GPU_CHUNK_PLAN_BINARY_INDEX_V30",
    binaryIndex,
    classicString
  );

  return {
    planBinaryIndex: binaryIndex,
    planBinaryIndexSignatureIntel: sig.intel,
    planBinaryIndexSignatureClassic: sig.classic
  };
}

function buildChunkBinaryIndex(chunk, strategy, gpuMode, trust, risk) {
  const trustNorm = normalizeTrust(trust);
  const riskNorm = normalizeRisk(risk);

  const bandRank =
    chunk.band === "gpu" ? 2 :
    chunk.band === "cpu" ? 1 :
    0;

  const priorityRank =
    chunk.priority <= 2 ? 3 :
    chunk.priority <= 5 ? 2 :
    chunk.priority <= 20 ? 1 :
    0;

  const hydrateRank =
    chunk.hydrate === "eager" ? 3 :
    chunk.hydrate === "lazy" ? 2 :
    chunk.hydrate === "idle" ? 1 :
    0;

  const gpuHintRank =
    chunk.gpuHint === "primary" ? 3 :
    chunk.gpuHint === "secondary" ? 2 :
    0;

  const modeRank =
    gpuMode === "aggressive" ? 3 :
    gpuMode === "balanced" ? 2 :
    gpuMode === "safe" ? 1 :
    gpuMode === "background" ? 0 :
    1;

  const trustRank =
    trustNorm === "trusted" ? 2 :
    trustNorm === "untrusted" ? 1 :
    trustNorm === "hostile" ? 0 :
    1;

  const riskRank =
    riskNorm === "low" ? 0 :
    riskNorm === "medium" ? 1 :
    riskNorm === "high" ? 2 :
    riskNorm === "critical" ? 3 :
    1;

  const surface =
    (chunk.id ? String(chunk.id).length : 8) +
    bandRank * 11 +
    priorityRank * 7 +
    hydrateRank * 5 +
    gpuHintRank * 3 +
    modeRank * 2 +
    trustRank +
    riskRank;

  const binaryIndex = {
    id: chunk.id,
    strategy,
    band: chunk.band,
    priority: chunk.priority,
    hydrate: chunk.hydrate,
    gpuHint: chunk.gpuHint,
    gpuMode,
    trust: trustNorm,
    risk: riskNorm,
    surface,
    parity: surface % 2 === 0 ? 0 : 1,
    density:
      bandRank +
      priorityRank +
      hydrateRank +
      gpuHintRank +
      modeRank +
      trustRank +
      riskRank
  };

  const classicString =
    `GPU_CHUNK_BIN_V30::id:${chunk.id}` +
    `::band:${chunk.band}` +
    `::prio:${chunk.priority}` +
    `::mode:${gpuMode}` +
    `::surf:${surface}`;

  const sig = buildDualHashSignature(
    "PULSE_GPU_CHUNK_BINARY_INDEX_V30",
    binaryIndex,
    classicString
  );

  return {
    binaryIndex,
    binaryIndexSignatureIntel: sig.intel,
    binaryIndexSignatureClassic: sig.classic
  };
}

// ============================================================================
// IMPLEMENTATION — v30 IMMORTAL-INTEL-OMEGA (GPU Chunker-aware + Binary Index)
// ============================================================================

export const PulseGPUChunkPlanner = {
  /**
   * plan
   * @param {object} input - See ORGAN_CONTRACT_PulseGPUChunkPlanner.inputs
   * @returns {object} gpuChunkPlan
   *
   * v30 additions:
   *   • gpuMode (symbolic)
   *   • planBinaryIndex + signatures
   *   • per-chunk binaryIndex + signatures
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

    const chunkerId = input.chunkerId || "PulseGPUChunker-v30";
    const chunkerProfile =
      input.chunkerProfile || deriveChunkerProfileFromPageProfile(chunkProfile);
    const lanes = normalizeLanes(input.lanes);
    const defaultChunkSize = normalizeChunkSize(input.defaultChunkSize, 4096);
    const maxChunkSize = normalizeChunkSize(input.maxChunkSize, 65536);
    const laneHint = lanes >= 32 ? "lane32" : lanes >= 16 ? "lane16" : "lane_auto";

    const gpuMode = normalizeGpuModeFromContext({ mode, presence, risk });

    // If not GPU capable or hostile, fall back immediately.
    if (!gpuCapable || normalizeTrust(trust) === "hostile") {
      const chunks = [];
      const planBinary = buildPlanBinaryIndex({
        page,
        strategy: "fallback",
        chunkProfile,
        trust,
        risk,
        gpuMode,
        lanes,
        defaultChunkSize,
        maxChunkSize,
        chunkCount: 0
      });

      return {
        strategy: "fallback",
        reason: !gpuCapable ? "gpu_not_capable" : "trust_hostile",
        gpuMode,
        chunks,
        planBinaryIndex: planBinary.planBinaryIndex,
        planBinaryIndexSignatureIntel: planBinary.planBinaryIndexSignatureIntel,
        planBinaryIndexSignatureClassic: planBinary.planBinaryIndexSignatureClassic,
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
    let chunks = buildChunks({
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

    // v30++: attach per-chunk binary index surfaces
    chunks = chunks.map((chunk) => {
      const {
        binaryIndex,
        binaryIndexSignatureIntel,
        binaryIndexSignatureClassic
      } = buildChunkBinaryIndex(chunk, strategy, gpuMode, trust, risk);

      return {
        ...chunk,
        binaryIndex,
        binaryIndexSignatureIntel,
        binaryIndexSignatureClassic
      };
    });

    // v30++: plan-level binary index
    const planBinary = buildPlanBinaryIndex({
      page,
      strategy,
      chunkProfile,
      trust,
      risk,
      gpuMode,
      lanes,
      defaultChunkSize,
      maxChunkSize,
      chunkCount: chunks.length
    });

    return {
      strategy,
      reason: "planned",
      gpuMode,
      planBinaryIndex: planBinary.planBinaryIndex,
      planBinaryIndexSignatureIntel: planBinary.planBinaryIndexSignatureIntel,
      planBinaryIndexSignatureClassic: planBinary.planBinaryIndexSignatureClassic,
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
// Chunker mapping — align page chunkProfile → PulseGPUChunker profiles
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
