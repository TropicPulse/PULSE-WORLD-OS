// ============================================================================
//  PulseEarn-v24.0-Immortal-Earn-Core-GPU.js — Earn Organism v24
//  IMMORTAL UPGRADE of v16.0-Presence-Immortal-GPU-INTEL:
//  - dual-band (symbolic + binary) — executionContext-aware
//  - evolution surfaces — advantage-field v24, pressure + mode + presence
//  - presence / mesh / castle / expansion / server / globalHints-aware
//  - chunk / cache / prewarm / warm-path / cold-path / factoring-aware
//  - GPU advantage baked in (lanes, tiers, reuse, prewarm plans, binary field)
//  - per-page compute intelligence + memory surfaces + earn-field integration
// ============================================================================
//
//  SAFETY CONTRACT (v24.0-Immortal-Earn-Core-GPU):
//  ------------------------------------------------
//  • No randomness.
//  • No real-time clocks in math (timestamps only allowed in external telemetry).
//  • Pure deterministic string/shape/field operations.
//  • Zero mutation of input objects (only structural writes into CoreMemory).
//  • Band-aware, but band is metadata-only (no behavioral non-determinism).
//  • All “memory” is structural (derived from inputs), not temporal.
//  • Presence/mesh/castle/expansion/globalHints are metadata surfaces only.
//  • Health/advantage are descriptive-only (no hidden perf heuristics).
//  • Advantage fields are IMMORTAL, versioned, non-perf-weighted.
//  • No network, no filesystem, no DOM, no GPU calls from this organ.
// ============================================================================
// ============================================================================
// FILE: PULSE-WORLD/PULSE-DESIGN/translator-v17.js
// LAYER: THE ARCHITECT (v17 IMMORTAL Orchestrator + Genome Conductor)
// ============================================================================

// 1 — GENOME IDENTITY + SUBIMPORTS (MUST BE FIRST)
PULSE-WORLD-MAP.js
import {
  OrganismIdentity,
  buildPulseOrganismMap as PulseOrganismMap
} from "./PULSE-WORLD-MAP.js";
const Identity = OrganismIdentity(import.meta.url);

// 2 — EXPORT GENOME METADATA
// export const PulseDesignArchitectMeta = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const EarnRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// --- CORE EARN ORGAN --------------------------------------------------------
// --- BIOLOGICAL EARN ORGANS -----------------------------------------------
import * as PulseEarnHeart from "./PulseEarnHeart-v24.js";
import * as PulseEarnCirculatorySystem from "./PulseEarnCirculatorySystem-v24.js";
import * as PulseEarnEndocrineSystem   from "./PulseEarnEndocrineSystem-v24.js";
import * as PulseEarnImmuneSystem      from "./PulseEarnImmuneSystem-v24.js";
import * as PulseEarnMetabolism        from "./PulseEarnMetabolism-v24.js";
import * as PulseEarnNervousSystem     from "./PulseEarnNervousSystem-v24.js";
import * as PulseEarnSkeletalSystem    from "./PulseEarnSkeletalSystem-v24.js";
import * as PulseEarnSignalFactoring from "./PulseEarnSignalFactoring-v24.js";

import * as PulseEarnReflex     from "./PulseEarnReflex-v24.js";
import * as PulseEarnReflexRouter    from "./PulseEarnReflexRouter-v24.js";
import * as PulseEarnSurvivalInstincts from "./PulseEarnSurvivalInstincts-v24.js";

// --- MARKET EARN ORGANS ----------------------------------------------------
import PulseEarnMktConsulate     from "./PulseEarnMktConsulate-v24.js";

import {
  PulseNetBoot,
  PulseNet,
  PulseProofBridge
} from "../../PULSE-UI/_BACKEND/PULSE-WORLD-BRIDGE.js";

// --- PULSE-CORE MEMORY SPINE (FULL SPINE) ----------------------------------
import PulseCoreMemory                from "../PULSE-CORE/PulseCoreMemory-v24.js";
import PulseCoreAIMemoryAdapter       from "../PULSE-CORE/PulseCoreAIMemoryAdapter-v20.js";
import PulseCoreGPUMemoryAdapter      from "../PULSE-CORE/PulseCoreGpuMemoryAdapter-v20.js";
import PulseCoreEarnMemoryAdapter     from "../PULSE-CORE/PulseCoreEarnMemoryAdapter-v20.js";
import PulseBinaryCoreOverlay         from "../PULSE-CORE/PulseCoreBinaryOverlay-v20.js";


// Optional: GPU chunker identity (no instantiation here, brain stays pure)
import * as PulseEarnChunker             from "./PulseEarnChunker-v24.js";

// CoreMemory bridge: structural, deterministic, keyed by memory surfaces.
export const CoreMemory = Object.freeze({
  raw: () => PulseCoreMemory,
  all: () => PulseCoreAIMemoryAdapter,
  gpu: () => PulseCoreGPUMemoryAdapter,
  earn: () => PulseCoreEarnMemoryAdapter,
  binaryOverlay: () => PulseBinaryCoreOverlay
});

// ============================================================================
//  DUAL-BAND CONSTANTS (symbolic + binary)
// ============================================================================
const ROUTE_BANDS = {
  SYMBOLIC: "symbolic",
  BINARY: "binary"
};

function normalizeBand(band) {
  const b = (band || ROUTE_BANDS.SYMBOLIC).toLowerCase();
  return b === ROUTE_BANDS.BINARY ? ROUTE_BANDS.BINARY : ROUTE_BANDS.SYMBOLIC;
}

// ============================================================================
//  INTERNAL HELPERS — deterministic, tiny, pure (v24-Immortal-GPU-INTEL)
// ============================================================================

function computeHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `h${h}`;
}

// Primary INTEL hash — deterministic, structure-aware, no IO, no time.
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

function buildLineage(parentLineage, pattern) {
  const base = Array.isArray(parentLineage) ? parentLineage : [];
  return [...base, pattern];
}

function computeShapeSignature(pattern, lineage, band, executionContext = null) {
  const raw = {
    band: normalizeBand(band),
    pattern,
    lineage,
    executionContext: executionContext
      ? {
          binaryMode: executionContext.binaryMode || "auto",
          pipelineId: executionContext.pipelineId || "",
          sceneType: executionContext.sceneType || "",
          workloadClass: executionContext.workloadClass || "",
          resolution: executionContext.resolution || "",
          refreshRate: executionContext.refreshRate || 0,
          dispatchSignature: executionContext.dispatchSignature || "",
          shapeSignature: executionContext.shapeSignature || ""
        }
      : null
  };

  const sig = buildDualHashSignature("earn-shape-v24", raw, pattern);
  return `earn-shape-v24-${sig.intel}`;
}

function computeBinaryShapeSignature(pattern, lineage, executionContext = null) {
  const raw = {
    band: "binary",
    pattern,
    lineage,
    executionContext: executionContext
      ? {
          binaryMode: executionContext.binaryMode || "binary",
          pipelineId: executionContext.pipelineId || "",
          sceneType: executionContext.sceneType || "",
          workloadClass: executionContext.workloadClass || "",
          resolution: executionContext.resolution || "",
          refreshRate: executionContext.refreshRate || 0,
          dispatchSignature: executionContext.dispatchSignature || "",
          shapeSignature: executionContext.shapeSignature || ""
        }
      : null
  };

  const sig = buildDualHashSignature("earn-bshape-v24", raw, pattern);
  return `earn-bshape-v24-${sig.intel}`;
}

function computeEvolutionStage(pattern, lineage, band) {
  const depth = lineage.length;
  const b = normalizeBand(band);

  if (depth === 1) return b === ROUTE_BANDS.BINARY ? "seed-binary" : "seed";
  if (depth === 2) return b === ROUTE_BANDS.BINARY ? "sprout-binary" : "sprout";
  if (depth === 3) return b === ROUTE_BANDS.BINARY ? "branch-binary" : "branch";

  if (pattern.includes("gpu")) return b === ROUTE_BANDS.BINARY ? "gpu-binary" : "gpu-aware";
  if (pattern.includes("miner")) return b === ROUTE_BANDS.BINARY ? "miner-binary" : "miner-aware";
  if (pattern.includes("air")) return b === ROUTE_BANDS.BINARY ? "air-binary" : "air-compute";

  return b === ROUTE_BANDS.BINARY ? "mature-binary" : "mature";
}

function evolvePattern(pattern, context = {}) {
  const { gpuHint, minerHint, airHint, pageHint, chunkHint, presenceHint } = context;

  const parts = [pattern];

  if (gpuHint) parts.push(`g:${gpuHint}`);
  if (minerHint) parts.push(`m:${minerHint}`);
  if (airHint) parts.push(`a:${airHint}`);
  if (pageHint) parts.push(`p:${pageHint}`);
  if (chunkHint) parts.push(`c:${chunkHint}`);
  if (presenceHint) parts.push(`x:${presenceHint}`);

  return parts.join("|");
}

function buildPatternAncestry(pattern) {
  if (!pattern || typeof pattern !== "string") return [];
  return pattern.split("/").filter(Boolean);
}

function buildLineageSignature(lineage) {
  if (!Array.isArray(lineage) || lineage.length === 0) return "NO_LINEAGE";
  return lineage.join(">");
}

function buildPageAncestrySignature({ pattern, lineage, pageId, band }) {
  const shape = {
    pattern,
    patternAncestry: buildPatternAncestry(pattern),
    lineageSignature: buildLineageSignature(lineage),
    pageId: pageId || "NO_PAGE",
    band: normalizeBand(band)
  };

  return buildDualHashSignature(JSON.stringify(shape));
}

// v24 IMMORTAL: health is descriptive-only, not performance-weighted.
function computeHealthScore() {
  return 1.0;
}

function classifyDegradationTier(h) {
  if (h >= 0.95) return "microDegrade";
  if (h >= 0.85) return "softDegrade";
  if (h >= 0.50) return "midDegrade";
  if (h >= 0.15) return "hardDegrade";
  return "criticalDegrade";
}

// ============================================================================
//  ADVANTAGE CORE + SUBFIELDS (v24, multi-surface, GPU + chunk + pressure-aware)
// ============================================================================

function buildAdvantageFieldCore(
  pattern,
  lineage,
  band,
  {
    executionContext = null,
    pressureSnapshot = null,
    advantageSnapshot = null
  } = {}
) {
  const depth = lineage.length;
  const b = normalizeBand(band);

  const pressureScore = pressureSnapshot
    ? clamp01(
        ((pressureSnapshot.gpuLoadPressure ?? 0) +
          (pressureSnapshot.thermalPressure ?? 0) +
          (pressureSnapshot.memoryPressure ?? 0) +
          (pressureSnapshot.meshStormPressure ?? 0) +
          (pressureSnapshot.auraTension ?? 0)) / 5
      )
    : 0;

  const binaryRatio = advantageSnapshot?.binaryModeRatio ?? 0;
  const symbolicRatio = advantageSnapshot?.symbolicModeRatio ?? 0;

  return {
    advantageVersion: "E-24.0",
    lineageDepth: depth,
    patternTag: pattern,
    band: b,

    binaryCompressionBias: b === ROUTE_BANDS.BINARY ? 1 : 0,
    symbolicPlanningBias: b === ROUTE_BANDS.SYMBOLIC ? 1 : 0,

    // dual-mode field awareness
    binaryModeRatio: binaryRatio,
    symbolicModeRatio: symbolicRatio,

    // pressure field awareness
    pressureScore,

    // structural tags only
    lineageSignature: buildLineageSignature(lineage),
    patternLength: pattern.length,

    // execution context projection (pure metadata)
    executionContext: executionContext
      ? {
          binaryMode: executionContext.binaryMode || "auto",
          pipelineId: executionContext.pipelineId || "",
          sceneType: executionContext.sceneType || "",
          workloadClass: executionContext.workloadClass || "",
          resolution: executionContext.resolution || "",
          refreshRate: executionContext.refreshRate || 0,
          dispatchSignature: executionContext.dispatchSignature || "",
          shapeSignature: executionContext.shapeSignature || ""
        }
      : null
  };
}

function buildCacheAdvantage({
  cachePriority = "normal",
  cacheScope = "page",
  cacheCohort = "global",
  cacheWarmth = "cold",
  cacheReuseAllowed = true,
  pressureSnapshot = null,
  advantageSnapshot = null
} = {}) {
  const pressure = pressureSnapshot?.memoryPressure ?? 0;
  const cacheHits = advantageSnapshot?.cacheHitStepCount ?? 0;

  const adjustedWarmth =
    cacheHits > 0 ? "warm" : cacheWarmth;

  const adjustedPriority =
    pressure > 0.8 && cachePriority === "normal"
      ? "high"
      : normalizeCachePriority(cachePriority);

  return {
    cachePriority: adjustedPriority,
    cacheScope,
    cacheCohort,
    cacheWarmth: adjustedWarmth,
    cacheReuseAllowed
  };
}

function buildPrewarmAdvantage({
  prewarmNeeded = false,
  prewarmScope = "page",
  prewarmBand = "symbolic",
  prewarmBudget = 0,
  prewarmHint = "none",
  pressureSnapshot = null,
  advantageSnapshot = null
} = {}) {
  const pressure = pressureSnapshot?.gpuLoadPressure ?? 0;
  const prewarmSteps = advantageSnapshot?.prewarmStepCount ?? 0;

  const effectivePrewarmNeeded =
    prewarmNeeded || prewarmSteps > 0 || pressure < 0.3;

  return {
    prewarmNeeded: !!effectivePrewarmNeeded,
    prewarmScope,
    prewarmBand: normalizeBand(prewarmBand),
    prewarmBudget,
    prewarmHint
  };
}

function buildServerAdvantage({
  hotStateReuse = true,
  multiInstanceBatching = true,
  serverHotStateReuse = true,
  serverPlanCache = true,
  serverBinaryReuse = true,
  serverTier = "normal",
  pressureSnapshot = null
} = {}) {
  const pressure = pressureSnapshot?.auraTension ?? 0;

  const adjustedMultiInstance =
    pressure > 0.8 ? false : multiInstanceBatching;

  return {
    hotStateReuse,
    multiInstanceBatching: adjustedMultiInstance,
    serverHotStateReuse,
    serverPlanCache,
    serverBinaryReuse,
    serverTier
  };
}

function buildGPUAdvantage({
  gpuPreferred = true,
  gpuTier = "normal",
  gpuBinaryReuse = true,
  gpuPrewarm = true,
  gpuChunkAggression = 0,
  gpuCachePriority = "normal",
  gpuLaneCount = 0,
  gpuLaneUtilization = 0,
  gpuBinaryFieldEnabled = true,
  pressureSnapshot = null,
  advantageSnapshot = null,
  executionContext = null
} = {}) {
  const gpuPressure = pressureSnapshot?.gpuLoadPressure ?? 0;
  const binaryRatio = advantageSnapshot?.binaryModeRatio ?? 0;

  const adjustedAggression =
    gpuPressure > 0.85 ? 0 : gpuChunkAggression;

  const adjustedPreferred =
    gpuPressure > 0.95 ? false : gpuPreferred;

  const adjustedTier =
    gpuPressure > 0.9 && gpuTier === "normal" ? "conservative" : gpuTier;

  return {
    gpuPreferred: adjustedPreferred,
    gpuTier: adjustedTier,
    gpuBinaryReuse,
    gpuPrewarm,
    gpuChunkAggression: adjustedAggression,
    gpuCachePriority: normalizeCachePriority(gpuCachePriority),
    gpuLaneCount,
    gpuLaneUtilization,
    gpuBinaryFieldEnabled,
    gpuBinaryBias: binaryRatio,
    gpuExecutionContext: executionContext
      ? {
          binaryMode: executionContext.binaryMode || "auto",
          pipelineId: executionContext.pipelineId || "",
          dispatchSignature: executionContext.dispatchSignature || ""
        }
      : null
  };
}

function buildCohortAdvantage({
  cohortId = "global",
  cohortTier = "normal",
  cohortWaveMode = "steady",
  cohortPriority = "normal",
  advantageSnapshot = null
} = {}) {
  const sampleCount = advantageSnapshot?.sampleCount ?? 0;

  const adjustedTier =
    sampleCount > 1000 && cohortTier === "normal" ? "trusted" : cohortTier;

  return {
    cohortId,
    cohortTier: adjustedTier,
    cohortWaveMode,
    cohortPriority
  };
}

function buildPageAdvantage({
  pageId = "NO_PAGE",
  pagePriority = "normal",
  pageHotState = "cold",
  pagePatternClass = "generic",
  advantageSnapshot = null
} = {}) {
  const cacheHits = advantageSnapshot?.cacheHitStepCount ?? 0;

  const adjustedHotState =
    cacheHits > 0 ? "warm" : pageHotState;

  return {
    pageId,
    pagePriority,
    pageHotState: adjustedHotState,
    pagePatternClass
  };
}

// v24: explicit chunk advantage surface
function buildChunkAdvantage({
  chunkMode = "auto",          // "auto" | "chunked" | "flat"
  targetChunkSize = 0,         // structural hint only
  maxChunks = 0,               // structural hint only
  chunkAggression = 0,         // 0–1
  cachePriority = "normal",
  pressureSnapshot = null,
  advantageSnapshot = null
} = {}) {
  const pressure = pressureSnapshot?.gpuLoadPressure ?? 0;
  const sampleCount = advantageSnapshot?.sampleCount ?? 0;

  const effectiveMode =
    chunkMode === "auto"
      ? pressure > 0.6 || sampleCount > 500
        ? "chunked"
        : "flat"
      : chunkMode;

  const adjustedAggression =
    pressure > 0.85 ? 0 : clamp01(chunkAggression);

  return {
    chunkMode: effectiveMode,
    targetChunkSize,
    maxChunks,
    chunkAggression: adjustedAggression,
    cachePriority: normalizeCachePriority(cachePriority)
  };
}

function buildDiagnostics(pattern, lineage, healthScore, tier, band) {
  const b = normalizeBand(band);

  return {
    pattern,
    patternLength: pattern.length,
    lineageDepth: lineage.length,
    healthScore,
    tier,
    band: b,
    bandMode:
      b === ROUTE_BANDS.BINARY ? "binary-compression" : "symbolic-planning"
  };
}

function clamp01(x) {
  if (x == null || Number.isNaN(x)) return 0;
  return Math.max(0, Math.min(1, x));
}

function normalizeCachePriority(p) {
  if (!p) return "normal";
  const v = String(p).toLowerCase();
  if (v === "critical" || v === "high" || v === "low") return v;
  return "normal";
}

function deriveFactoringSignalFromContext({
  meshPressureIndex = 0,
  cachePriority = "normal",
  prewarmNeeded = false,
  pressureSnapshot = null,
  advantageSnapshot = null
} = {}) {
  const pressureFromMesh = clamp01(meshPressureIndex / 100);
  const pressureFromGPU = pressureSnapshot?.gpuLoadPressure ?? 0;
  const combinedPressure = clamp01((pressureFromMesh + pressureFromGPU) / 2);

  const criticalCache = cachePriority === "critical";
  const highPressure = combinedPressure >= 0.7;
  const prewarmSignal = !!prewarmNeeded || (advantageSnapshot?.prewarmStepCount ?? 0) > 0;

  if (criticalCache || prewarmSignal) return 1;
  if (highPressure) return 1;
  return 0;
}

// ============================================================================
//  LOOP THEORY / WAVE THEORY / MEMORY SURFACES (pure, structural)
// ============================================================================
function buildLoopField(lineage, band) {
  const depth = lineage.length;
  const b = normalizeBand(band);

  return {
    depth,
    closedLoop: depth > 0,
    loopStrength: depth * (b === ROUTE_BANDS.BINARY ? 2 : 1),
    band: b
  };
}
// ============================================================================
//  WAVE FIELD / INTELLIGENCE / MEMORY / PRESENCE / ADVANTAGE
//  v24-Immortal-GPU-INTEL+ — dual-band + chunk/cache/prewarm/presence/earn-aware
// ============================================================================

function buildWaveField(pattern, lineage, band) {
  const plen = typeof pattern === "string" ? pattern.length : 0;
  const depth = Array.isArray(lineage) ? lineage.length : 0;
  const b = normalizeBand(band);

  const wavelength = plen;
  const amplitude = depth;
  const phase = (wavelength + amplitude) % 8;

  const frequency = wavelength > 0 ? 1 / wavelength : 0;
  const energy = wavelength * (amplitude || 1);

  const coherence = clamp01(
    wavelength + amplitude === 0 ? 0 : amplitude / (wavelength + amplitude)
  );

  const gpuWaveBias =
    pattern && typeof pattern === "string" && pattern.toLowerCase().includes("gpu")
      ? 1
      : 0;

  return {
    wavelength,
    amplitude,
    phase,
    frequency,
    energy,
    coherence,
    band: b,
    gpuWaveBias,
    mode: b === ROUTE_BANDS.BINARY ? "compression-wave" : "symbolic-wave"
  };
}

// ============================================================================
// ⭐ Pulse Intelligence (logic-only, IMMORTAL-safe, GPU-aware, v24+)
// ============================================================================
function computePulseIntelligence({
  advantageField,
  presenceField,
  factoringSignal,
  band
}) {
  const adv = advantageField || {};
  const pres = presenceField || {};

  const advantageScore = clamp01(adv.advantageScore || 0);
  const advantageTier = typeof adv.advantageTier === "number" ? adv.advantageTier : 0;

  const presenceTier = pres.presenceTier || "idle";
  const presenceWeight =
    presenceTier === "critical" ? 1.0 :
    presenceTier === "high"     ? 0.8 :
    presenceTier === "elevated" ? 0.6 :
    presenceTier === "soft"     ? 0.4 :
    0.2;

  const factoring = factoringSignal ? 1 : 0;
  const bandIsBinary = normalizeBand(band) === ROUTE_BANDS.BINARY ? 1 : 0;

  const gpuTier = adv.gpuTier || "unknown";
  const gpuAffinity =
    gpuTier === "critical" ? 1.0 :
    gpuTier === "high"     ? 0.8 :
    gpuTier === "normal"   ? 0.5 :
    gpuTier === "low"      ? 0.2 :
    0.0;

  // v24+: advantage shaping from chunk/cache/prewarm/presence/earn
  const chunkWarmthScore   = clamp01(adv.chunkWarmthScore   || 0);
  const cacheHitRatio      = clamp01(adv.cacheHitRatio      || 0);
  const prewarmCoverage    = clamp01(adv.prewarmCoverage    || 0);
  const presenceUptimeRatio= clamp01(adv.presenceUptimeRatio|| 0);
  const earnYieldScore     = clamp01(adv.earnYieldScore     || 0);

  const dualBandBalance =
    typeof adv.binaryModeRatio === "number" &&
    typeof adv.symbolicModeRatio === "number"
      ? 1 - Math.abs(adv.binaryModeRatio - adv.symbolicModeRatio)
      : 0;

  const solvednessScore = clamp01(
    advantageScore * 0.40 +
    presenceWeight * 0.18 +
    factoring * 0.10 +
    gpuAffinity * 0.12 +
    chunkWarmthScore * 0.06 +
    cacheHitRatio * 0.06 +
    prewarmCoverage * 0.04 +
    presenceUptimeRatio * 0.02 +
    earnYieldScore * 0.02 +
    dualBandBalance * 0.00 // kept structural, not dominant
  );

  const computeTier =
    solvednessScore >= 0.9 ? "nearSolution" :
    solvednessScore >= 0.7 ? "highValue"    :
    solvednessScore >= 0.4 ? "normal"       :
    solvednessScore >= 0.2 ? "lowPriority"  :
    "avoidCompute";

  const readinessScore = clamp01(
    solvednessScore * 0.6 +
    (bandIsBinary ? 0.10 : 0) +
    (advantageTier >= 2 ? 0.15 : advantageTier === 1 ? 0.05 : 0) +
    gpuAffinity * 0.10
  );

  return {
    solvednessScore,
    factoringSignal: factoring ? "high" : "low",
    computeTier,
    readinessScore,
    band: normalizeBand(band),
    advantageTier,
    gpuTier,
    gpuAffinity,
    chunkWarmthScore,
    cacheHitRatio,
    prewarmCoverage,
    presenceUptimeRatio,
    earnYieldScore
  };
}

// ============================================================================
// Per-page intelligence v24+: GPU + prewarm + chunk/cache/presence/earn
// ============================================================================
function computePageIntelligence({
  pageAdvantage,
  cacheAdvantage,
  prewarmAdvantage,
  gpuAdvantage
}) {
  const page = pageAdvantage || {};
  const cache = cacheAdvantage || {};
  const prewarm = prewarmAdvantage || {};
  const gpu = gpuAdvantage || {};

  const pagePriority = page.pagePriority || "normal";
  const pageHotState = page.pageHotState || "cold";

  const cachePriority = cache.cachePriority || "normal";
  const cacheWarmth = cache.cacheWarmth || "cold";

  const prewarmNeeded = !!prewarm.prewarmNeeded;
  const gpuPreferred = !!gpu.gpuPreferred;

  const priorityWeight =
    pagePriority === "critical" ? 1.0 :
    pagePriority === "high"     ? 0.8 :
    pagePriority === "normal"   ? 0.5 :
    pagePriority === "low"      ? 0.2 :
    0.1;

  const hotStateWeight =
    pageHotState === "hot"   ? 1.0 :
    pageHotState === "warm"  ? 0.7 :
    pageHotState === "cool"  ? 0.4 :
    0.2;

  const cacheWeight =
    cachePriority === "critical" ? 1.0 :
    cachePriority === "high"     ? 0.8 :
    cachePriority === "normal"   ? 0.5 :
    cachePriority === "low"      ? 0.2 :
    0.1;

  const cacheWarmthWeight =
    cacheWarmth === "hot"   ? 1.0 :
    cacheWarmth === "warm"  ? 0.7 :
    cacheWarmth === "cool"  ? 0.4 :
    0.2;

  const prewarmWeight = prewarmNeeded ? 1.0 : 0.2;
  const gpuWeight = gpuPreferred ? 1.0 : 0.3;

  // v24+: extra shaping from chunk/cache/presence/earn/gpu lanes
  const chunkWarmthScore    = clamp01(page.chunkWarmthScore    || cache.chunkWarmthScore    || 0);
  const cacheHitRatio       = clamp01(page.cacheHitRatio       || cache.cacheHitRatio       || 0);
  const prewarmCoverage     = clamp01(page.prewarmCoverage     || prewarm.prewarmCoverage   || 0);
  const presenceUptimeRatio = clamp01(page.presenceUptimeRatio || 0);
  const earnYieldScore      = clamp01(page.earnYieldScore      || 0);
  const gpuLaneUtilization  = clamp01(gpu.gpuLaneUtilization   || 0);

  const pageComputeScore = clamp01(
    priorityWeight      * 0.22 +
    hotStateWeight      * 0.16 +
    cacheWeight         * 0.12 +
    cacheWarmthWeight   * 0.10 +
    prewarmWeight       * 0.10 +
    gpuWeight           * 0.10 +
    chunkWarmthScore    * 0.08 +
    cacheHitRatio       * 0.05 +
    prewarmCoverage     * 0.03 +
    presenceUptimeRatio * 0.02 +
    earnYieldScore      * 0.01 +
    gpuLaneUtilization  * 0.01
  );

  const pageComputeTier =
    pageComputeScore >= 0.9 ? "pageCritical" :
    pageComputeScore >= 0.7 ? "pageHigh"     :
    pageComputeScore >= 0.4 ? "pageNormal"   :
    pageComputeScore >= 0.2 ? "pageLow"      :
    "pageAvoid";

  return {
    pageComputeScore,
    pageComputeTier,
    gpuPreferred,
    prewarmNeeded,
    cachePriority,
    pagePriority,
    chunkWarmthScore,
    cacheHitRatio,
    prewarmCoverage,
    presenceUptimeRatio,
    earnYieldScore,
    gpuLaneUtilization
  };
}

// ============================================================================
// MEMORY / BINARY FIELDS (v24-Immortal-GPU-INTEL)
// ============================================================================
function buildMemorySurface(pattern, lineage, pageId, band) {
  const ancestry = buildPatternAncestry(pattern);
  const lineageSig = buildLineageSignature(lineage);
  const bandNorm = normalizeBand(band);

  const pageSig = buildPageAncestrySignature({
    pattern,
    lineage,
    pageId,
    band: bandNorm
  });

  const bandSignature = buildDualHashSignature(
    `EARN_BAND_V24::${bandNorm}::${pattern || ""}::${pageId || "NO_PAGE"}`
  );

  return {
    ancestry,
    lineageSignature: lineageSig,
    pageSignature: pageSig,
    band: bandNorm,
    bandSignature,
    pageId: pageId || "NO_PAGE",
    memoryKey: buildDualHashSignature(
      ancestry.join("/") + "::" + lineageSig + "::" + JSON.stringify(pageSig)
    )
  };
}

function buildBinaryField(pattern, lineage) {
  const plen = typeof pattern === "string" ? pattern.length : 0;
  const depth = Array.isArray(lineage) ? lineage.length : 0;

  const surface = plen * (depth || 1);
  const parity = surface % 2 === 0 ? 0 : 1;
  const bitDensity = plen + depth;
  const shiftDepth = Math.max(0, Math.floor(Math.log2(surface || 1)));

  const gpuBinaryAffinity =
    pattern && typeof pattern === "string" && pattern.toLowerCase().includes("gpu")
      ? 1
      : 0;

  const raw = {
    patternLength: plen,
    lineageDepth: depth,
    surface,
    gpuBinaryAffinity
  };

  return {
    binaryShapeSignature: computeBinaryShapeSignature(pattern, lineage),
    binarySurfaceSignature: buildDualHashSignature(JSON.stringify(raw)),
    binarySurface: raw,
    parity,
    bitDensity,
    shiftDepth,
    gpuBinaryAffinity
  };
}

// ============================================================================
//  CORE MEMORY FIELD (FULL SPINE) — v24 structural, keyed, deterministic
// ============================================================================
function buildCoreMemoryField({
  pattern,
  lineage,
  pageId,
  band,
  memorySurface,
  binaryField
}) {
  const normalizedBand = normalizeBand(band);
  const mem = memorySurface || {};
  const bin = binaryField || {};

  return {
    coreMemoryVersion: "v24.0-Presence-Immortal-GPU-INTEL",
    band: normalizedBand,
    pattern,
    lineage,
    pageId,
    memoryKey: mem.memoryKey,
    ancestry: mem.ancestry,
    lineageSignature: mem.lineageSignature,
    pageSignature: mem.pageSignature,
    bandSignature: mem.bandSignature || null,
    binaryShapeSignature: bin.binaryShapeSignature,
    binarySurfaceSignature: bin.binarySurfaceSignature,
    binarySurface: bin.binarySurface,
    parity: bin.parity,
    bitDensity: bin.bitDensity,
    shiftDepth: bin.shiftDepth,
    gpuBinaryAffinity: bin.gpuBinaryAffinity || 0
  };
}

// Structural read from CoreMemory via Earn adapter (if present).
function readCoreMemoryEarn(memoryKey) {
  try {
    const earnAdapter = CoreMemory.earn?.();
    if (!earnAdapter || typeof earnAdapter.readEarnMemory !== "function") {
      return null;
    }
    return earnAdapter.readEarnMemory(memoryKey);
  } catch {
    return null;
  }
}

// Structural write to CoreMemory via Earn adapter (if present).
function writeCoreMemoryEarn(memoryKey, coreMemoryField) {
  try {
    const earnAdapter = CoreMemory.earn?.();
    if (!earnAdapter || typeof earnAdapter.writeEarnMemory !== "function") {
      return;
    }
    earnAdapter.writeEarnMemory(memoryKey, coreMemoryField);
  } catch {
    // IMMORTAL: swallow, no side-effects on failure path.
  }
}

// ============================================================================
//  PRESENCE / ADVANTAGE FIELDS (v24 IMMORTAL, GPU-aware, chunk/presence/earn)
// ============================================================================
function buildPresenceField({
  regionId = "unknown-region",
  castleId = "unknown-castle",
  meshStrength = "unknown",
  meshPressureIndex = 0,
  devicePresence = "unknown",
  bandPresence = "unknown",
  routerPresence = "unknown",
  castleLoadLevel = "unknown",
  presenceUptimeRatio = 0
} = {}) {
  const meshP = Number(meshPressureIndex) || 0;
  const castleP =
    castleLoadLevel === "unknown" ? 0 : Number(castleLoadLevel) || 0;

  const pressure = meshP + castleP;

  let presenceTier = "idle";
  if (pressure >= 150) presenceTier = "critical";
  else if (pressure >= 100) presenceTier = "high";
  else if (pressure >= 50) presenceTier = "elevated";
  else if (pressure > 0) presenceTier = "soft";

  const presenceSignature = buildDualHashSignature(
    `EARN_PRESENCE_V24::${presenceTier}::${meshPressureIndex}::${castleLoadLevel}`
  );

  return Object.freeze({
    presenceVersion: "v24.0-Presence-Immortal-GPU-INTEL",
    presenceTier,
    presenceSignature,
    regionId,
    castleId,
    meshStrength,
    meshPressureIndex,
    devicePresence,
    bandPresence,
    routerPresence,
    castleLoadLevel,
    presenceUptimeRatio: clamp01(presenceUptimeRatio)
  });
}
function buildAdvantageField({
  band = "symbolic",
  // cache
  cachePriority = "normal",
  cacheScope = "page",
  cacheCohort = "global",
  cacheWarmth = "cold",
  cacheReuseAllowed = true,

  // prewarm
  prewarmNeeded = false,
  prewarmScope = "page",
  prewarmBand = "symbolic",
  prewarmBudget = 0,
  prewarmHint = "none",

  // server
  hotStateReuse = true,
  multiInstanceBatching = true,
  serverHotStateReuse = true,
  serverPlanCache = true,
  serverBinaryReuse = true,
  serverTier = "normal",

  // factoring
  factoringSignal = 1,

  // GPU
  gpuPreferred = true,
  gpuTier = "normal",
  gpuBinaryReuse = true,
  gpuPrewarm = true,
  gpuChunkAggression = 0,
  gpuCachePriority = "normal",
  gpuLaneCount = 0,
  gpuLaneUtilization = 0,
  gpuBinaryFieldEnabled = true,

  // cohort
  cohortId = "global",
  cohortTier = "normal",
  cohortWaveMode = "steady",
  cohortPriority = "normal",

  // page
  pageId = "NO_PAGE",
  pagePriority = "normal",
  pageHotState = "cold",
  pagePatternClass = "generic"
} = {}) {

  const normalizedBand = normalizeBand(band);

  // ------------------------------------------------------------
  // v24: Build all sub‑advantage surfaces
  // ------------------------------------------------------------
  const cacheAdv = buildCacheAdvantage({
    cachePriority,
    cacheScope,
    cacheCohort,
    cacheWarmth,
    cacheReuseAllowed
  });

  const prewarmAdv = buildPrewarmAdvantage({
    prewarmNeeded,
    prewarmScope,
    prewarmBand,
    prewarmBudget,
    prewarmHint
  });

  const serverAdv = buildServerAdvantage({
    hotStateReuse,
    multiInstanceBatching,
    serverHotStateReuse,
    serverPlanCache,
    serverBinaryReuse,
    serverTier
  });

  const gpuAdv = buildGPUAdvantage({
    gpuPreferred,
    gpuTier,
    gpuBinaryReuse,
    gpuPrewarm,
    gpuChunkAggression,
    gpuCachePriority,
    gpuLaneCount,
    gpuLaneUtilization,
    gpuBinaryFieldEnabled
  });

  const cohortAdv = buildCohortAdvantage({
    cohortId,
    cohortTier,
    cohortWaveMode,
    cohortPriority
  });

  const pageAdv = buildPageAdvantage({
    pageId,
    pagePriority,
    pageHotState,
    pagePatternClass
  });

  // ------------------------------------------------------------
  // v24: Deterministic unified advantage score
  // ------------------------------------------------------------
  function weightPriority(v) {
    v = String(v || "normal").toLowerCase();
    if (v === "critical") return 1.0;
    if (v === "high")     return 0.8;
    if (v === "normal")   return 0.5;
    if (v === "low")      return 0.2;
    return 0.1;
  }

  function weightWarmth(v) {
    v = String(v || "cold").toLowerCase();
    if (v === "hot")   return 1.0;
    if (v === "warm")  return 0.7;
    if (v === "cool")  return 0.4;
    return 0.2;
  }

  function weightGpuTier(v) {
    v = String(v || "normal").toLowerCase();
    if (v === "critical") return 1.0;
    if (v === "high")     return 0.8;
    if (v === "normal")   return 0.5;
    if (v === "low")      return 0.2;
    return 0.0;
  }

  const cacheScore   = clamp01(weightPriority(cacheAdv.cachePriority) * 0.6 + weightWarmth(cacheAdv.cacheWarmth) * 0.4);
  const prewarmScore = clamp01((prewarmAdv.prewarmNeeded ? 1.0 : 0.3) * 0.7 + clamp01(prewarmAdv.prewarmBudget / 100) * 0.3);
  const gpuScore     = clamp01(weightGpuTier(gpuAdv.gpuTier) * 0.7 + (gpuAdv.gpuPreferred ? 0.3 : 0.1));
  const serverScore  = clamp01((serverAdv.hotStateReuse ? 0.3 : 0) + (serverAdv.multiInstanceBatching ? 0.3 : 0) + (serverAdv.serverPlanCache ? 0.2 : 0) + (serverAdv.serverBinaryReuse ? 0.2 : 0));
  const cohortScore  = clamp01(weightPriority(cohortAdv.cohortPriority));
  const pageScore    = clamp01(weightPriority(pageAdv.pagePriority) * 0.6 + weightWarmth(pageAdv.pageHotState) * 0.4);
  const factoringScore = clamp01(factoringSignal ? 1 : 0);

  const advantageScore = clamp01(
    cacheScore     * 0.18 +
    prewarmScore   * 0.12 +
    gpuScore       * 0.22 +
    serverScore    * 0.15 +
    cohortScore    * 0.10 +
    pageScore      * 0.18 +
    factoringScore * 0.05
  );

  const advantageTier =
    advantageScore >= 0.90 ? 3 :
    advantageScore >= 0.60 ? 2 :
    advantageScore >= 0.30 ? 1 :
    0;

  // ------------------------------------------------------------
  // v24: FINAL RETURN OBJECT (FULLY CLOSED, COMPLETE)
  // ------------------------------------------------------------
  return Object.freeze({
    advantageVersion: "E-24.0",
    band: normalizedBand,
    factoringSignal,

    // structured subfields
    cache: cacheAdv,
    prewarm: prewarmAdv,
    server: serverAdv,
    gpu: gpuAdv,
    cohort: cohortAdv,
    page: pageAdv,

    // unified IMMORTAL advantage surface
    advantageScore,
    advantageTier,

    // flattened convenience fields for older callers
    cachePriority: cacheAdv.cachePriority,
    prewarmNeeded: prewarmAdv.prewarmNeeded,
    hotStateReuse: serverAdv.hotStateReuse,
    multiInstanceBatching: serverAdv.multiInstanceBatching,
    serverHotStateReuse: serverAdv.serverHotStateReuse,
    serverPlanCache: serverAdv.serverPlanCache,
    serverBinaryReuse: serverAdv.serverBinaryReuse,

    gpuPreferred: gpuAdv.gpuPreferred,
    gpuTier: gpuAdv.gpuTier,
    gpuBinaryReuse: gpuAdv.gpuBinaryReuse,
    gpuPrewarm: gpuAdv.gpuPrewarm,
    gpuChunkAggression: gpuAdv.gpuChunkAggression,
    gpuCachePriority: gpuAdv.gpuCachePriority,
    gpuLaneCount: gpuAdv.gpuLaneCount,
    gpuLaneUtilization: gpuAdv.gpuLaneUtilization,
    gpuBinaryFieldEnabled: gpuAdv.gpuBinaryFieldEnabled,

    cohortId: cohortAdv.cohortId,
    cohortTier: cohortAdv.cohortTier,
    cohortWaveMode: cohortAdv.cohortWaveMode,
    cohortPriority: cohortAdv.cohortPriority,

    pageId: pageAdv.pageId,
    pagePriority: pageAdv.pagePriority,
    pageHotState: pageAdv.pageHotState,
    pagePatternClass: pageAdv.pagePatternClass
  });
}
// ============================================================================
//  FACTORY — Create an Earn v16 IMMORTAL-GPU-INTEL Organism (dual-band)
// ============================================================================
export function createEarn({
  jobId,
  pattern,
  payload = {},
  priority = "normal",
  returnTo = null,
  parentLineage = null,
  pageId = "NO_PAGE",
  band = ROUTE_BANDS.SYMBOLIC,

  // presence / mesh / castle / expansion / server / global hints / gpu hints / page hints
  presenceField = null,
  meshSignals = null,
  castleSignals = null,
  expansionSignals = null, // reserved, symbolic only
  serverAdvantageHints = null,
  globalHints = null,
  gpuHints = null,
  pageHints = null
}) {
  const normalizedBand = normalizeBand(band);

  const pf = presenceField || buildPresenceField({});
  const mesh = meshSignals || { meshStrength: "unknown", meshPressureIndex: 0 };
  const castle = castleSignals || { loadLevel: "unknown" };
  const gh = globalHints || {};
  const serverHints = serverAdvantageHints || {};
  const gpu = gpuHints || {};
  const page = pageHints || {};

  const cachePriority = normalizeCachePriority(gh.cacheHints?.priority);
  const prewarmNeeded = !!(gh.prewarmHints?.shouldPrewarm);
  const meshPressureIndex = mesh.meshPressureIndex || 0;

  const factoringSignal = deriveFactoringSignalFromContext({
    meshPressureIndex,
    cachePriority,
    prewarmNeeded
  });

  const lineage = buildLineage(parentLineage, pattern);
  const shapeSignature = computeShapeSignature(pattern, lineage, normalizedBand);
  const evolutionStage = computeEvolutionStage(pattern, lineage, normalizedBand);

  const patternAncestry = buildPatternAncestry(pattern);
  const lineageSignature = buildLineageSignature(lineage);
  const pageAncestrySignature = buildPageAncestrySignature({
    pattern,
    lineage,
    pageId,
    band: normalizedBand
  });

  const healthScore = computeHealthScore();
  const tier = classifyDegradationTier(healthScore);
  const advantageFieldCore = buildAdvantageFieldCore(pattern, lineage, normalizedBand);
  const diagnostics = buildDiagnostics(pattern, lineage, healthScore, tier, normalizedBand);

  const loopField = buildLoopField(lineage, normalizedBand);
  const waveField = buildWaveField(pattern, lineage, normalizedBand);
  const memorySurface = buildMemorySurface(pattern, lineage, pageId, normalizedBand);
  const binaryField =
    normalizedBand === ROUTE_BANDS.BINARY
      ? buildBinaryField(pattern, lineage)
      : {
          binaryShapeSignature: null,
          binarySurfaceSignature: null,
          binarySurface: null,
          parity: null,
          bitDensity: null,
          shiftDepth: null
        };

  // CoreMemory full spine field
  const coreMemoryField = buildCoreMemoryField({
    pattern,
    lineage,
    pageId,
    band: normalizedBand,
    memorySurface,
    binaryField
  });

  // Structural read from CoreMemory (if any prior Earn state exists)
  const priorCoreMemory = readCoreMemoryEarn(coreMemoryField.memoryKey);

  // PULSE-NET organism snapshot — structural, descriptive-only
  const netOrganism = PulseNet.organism?.() ?? null;
  const netField = netOrganism
    ? {
        lastHeartbeat: netOrganism.lastHeartbeat ?? 0,
        lastAIHeartbeat: netOrganism.lastAIHeartbeat ?? 0,
        forwardTicks: netOrganism.forwardTicks ?? 0,
        backwardTicks: netOrganism.backwardTicks ?? 0,
        lastBeatSource: netOrganism.lastBeatSource ?? "none"
      }
    : {
        lastHeartbeat: 0,
        lastAIHeartbeat: 0,
        forwardTicks: 0,
        backwardTicks: 0,
        lastBeatSource: "none"
      };

  const earnPresenceField = buildPresenceField({
    regionId: pf.regionId,
    castleId: pf.castleId,
    meshStrength: mesh.meshStrength || pf.meshStrength,
    meshPressureIndex: mesh.meshPressureIndex || pf.meshPressureIndex,
    devicePresence: pf.devicePresence,
    bandPresence: pf.bandPresence,
    routerPresence: pf.routerPresence,
    castleLoadLevel: castle.loadLevel || "unknown"
  });

  const earnAdvantageField = buildAdvantageField({
    band: normalizedBand,

    cachePriority,
    cacheScope: gh.cacheHints?.scope ?? "page",
    cacheCohort: gh.cacheHints?.cohort ?? "global",
    cacheWarmth: gh.cacheHints?.warmth ?? "cold",
    cacheReuseAllowed: gh.cacheHints?.reuseAllowed ?? true,

    prewarmNeeded,
    prewarmScope: gh.prewarmHints?.scope ?? "page",
    prewarmBand: gh.prewarmHints?.band ?? normalizedBand,
    prewarmBudget: gh.prewarmHints?.budget ?? 0,
    prewarmHint: gh.prewarmHints?.hint ?? "none",

    hotStateReuse: serverHints.hotStateReuse ?? true,
    multiInstanceBatching: serverHints.multiInstanceBatching ?? true,
    serverHotStateReuse: serverHints.hotStateReuse ?? true,
    serverPlanCache: serverHints.planCache ?? true,
    serverBinaryReuse: serverHints.binaryReuse ?? true,
    serverTier: serverHints.serverTier ?? "normal",

    factoringSignal,

    gpuPreferred: gpu.gpuPreferred ?? true,
    gpuTier: gpu.gpuTier ?? "normal",
    gpuBinaryReuse: gpu.gpuBinaryReuse ?? true,
    gpuPrewarm: gpu.gpuPrewarm ?? true,
    gpuChunkAggression: gpu.gpuChunkAggression ?? (gh.chunkHints?.chunkAggression ?? 0),
    gpuCachePriority: gpu.gpuCachePriority ?? cachePriority,
    gpuLaneCount: gpu.gpuLaneCount ?? 0,
    gpuLaneUtilization: gpu.gpuLaneUtilization ?? 0,
    gpuBinaryFieldEnabled: gpu.gpuBinaryFieldEnabled ?? true,

    cohortId: gh.cohortHints?.cohortId ?? "global",
    cohortTier: gh.cohortHints?.cohortTier ?? "normal",
    cohortWaveMode: gh.cohortHints?.waveMode ?? "steady",
    cohortPriority: gh.cohortHints?.priority ?? "normal",

    pageId,
    pagePriority: page.pagePriority ?? "normal",
    pageHotState: page.pageHotState ?? "cold",
    pagePatternClass: page.pagePatternClass ?? "generic"
  });

  // ⭐ Intelligence surface (IMMORTAL-GPU-INTEL, v24-aware advantage)
  const pulseIntelligence = computePulseIntelligence({
    advantageField: {
      ...earnAdvantageField,
      gpuTier: earnAdvantageField.gpu?.gpuTier || earnAdvantageField.gpuTier
    },
    presenceField: earnPresenceField,
    factoringSignal,
    band: normalizedBand
  });

  // ⭐ Per-page intelligence surface
  const pageIntelligence = computePageIntelligence({
    pageAdvantage: earnAdvantageField.page,
    cacheAdvantage: earnAdvantageField.cache,
    prewarmAdvantage: earnAdvantageField.prewarm,
    gpuAdvantage: earnAdvantageField.gpu
  });

  const earnObject = {
    EarnRole,
    jobId,
    pattern,
    payload,
    priority,
    returnTo,
    lineage,
    pageId,

    band: normalizedBand,
    factoringSignal,

    presenceField: earnPresenceField,
    advantageField: {
      ...advantageFieldCore,
      ...earnAdvantageField
    },

    // ⭐ top-level intelligence
    pulseIntelligence,
    pageIntelligence,

    netField,          // PULSE-NET organism snapshot
    coreMemoryField,   // CoreMemory full spine field
    priorCoreMemory,   // Any prior stored Earn memory for this key

    meta: {
      shapeSignature,
      evolutionStage,

      patternAncestry,
      lineageSignature,
      pageAncestrySignature,

      healthScore,
      tier,
      advantageField: advantageFieldCore,
      diagnostics,

      loopField,
      waveField,
      memorySurface,
      binaryField,

      netField,
      coreMemoryField,
      priorCoreMemory,

      // ⭐ mirrored intelligence + signature
      pulseIntelligence,
      pageIntelligence,
      pulseIntelligenceSignature: buildDualHashSignature(JSON.stringify(pulseIntelligence)),
      pageIntelligenceSignature: buildDualHashSignature(JSON.stringify(pageIntelligence)),

      // v11/v12/v13 signatures
      earnSignature: buildDualHashSignature(
        pattern + "::" + lineageSignature + "::" + normalizedBand
      ),
      patternSignature: buildDualHashSignature(pattern),
      lineageSurface: buildDualHashSignature(String(lineage.length)),
      advantageSignature: buildDualHashSignature(JSON.stringify(advantageFieldCore)),
      healthSignature: buildDualHashSignature(String(healthScore)),
      tierSignature: buildDualHashSignature(tier),
      bandSignature: buildDualHashSignature(normalizedBand),

      dualMode: {
        symbolic: normalizedBand === ROUTE_BANDS.SYMBOLIC,
        binary: normalizedBand === ROUTE_BANDS.BINARY
      },

      loopTheory: {
        routingCompletion: true,
        allowLoopfieldPropulsion: true,
        pulseComputeContinuity: true,
        errorRouteAround: true,

        continuanceCapable: true,
        preferContinuanceOnOrganFailure: true
      }
    }
  };

  // Structural write of Earn state into CoreMemory via Earn adapter.
  writeCoreMemoryEarn(coreMemoryField.memoryKey, earnObject.coreMemoryField);

  return earnObject;
}


// ============================================================================
//  EVOLUTION ENGINE — evolve an existing Earn deterministically (dual-band)
// ============================================================================
export function evolveEarn(earn, context = {}) {
  const currentBand =
    earn.band ||
    earn.meta?.band ||
    ROUTE_BANDS.SYMBOLIC;

  const normalizedBand = normalizeBand(context.band || currentBand);

  const nextPattern = evolvePattern(earn.pattern, context);
  const nextLineage = buildLineage(earn.lineage, nextPattern);

  const shapeSignature = computeShapeSignature(nextPattern, nextLineage, normalizedBand);
  const evolutionStage = computeEvolutionStage(nextPattern, nextLineage, normalizedBand);

  const patternAncestry = buildPatternAncestry(nextPattern);
  const lineageSignature = buildLineageSignature(nextLineage);
  const pageId = earn.pageId || "NO_PAGE";
  const pageAncestrySignature = buildPageAncestrySignature({
    pattern: nextPattern,
    lineage: nextLineage,
    pageId,
    band: normalizedBand
  });

  const healthScore = computeHealthScore();
  const tier = classifyDegradationTier(healthScore);
  const advantageFieldCore = buildAdvantageFieldCore(nextPattern, nextLineage, normalizedBand);
  const diagnostics = buildDiagnostics(nextPattern, nextLineage, healthScore, tier, normalizedBand);

  const loopField = buildLoopField(nextLineage, normalizedBand);
  const waveField = buildWaveField(nextPattern, nextLineage, normalizedBand);
  const memorySurface = buildMemorySurface(nextPattern, nextLineage, pageId, normalizedBand);
  const binaryField =
    normalizedBand === ROUTE_BANDS.BINARY
      ? buildBinaryField(nextPattern, nextLineage)
      : {
          binaryShapeSignature: null,
          binarySurfaceSignature: null,
          binarySurface: null,
          parity: null,
          bitDensity: null,
          shiftDepth: null
        };

  const pf = earn.presenceField || buildPresenceField({});
  const adv = earn.advantageField || buildAdvantageField({ band: normalizedBand });

  const mesh = context.meshSignals || null;
  const castle = context.castleSignals || null;
  const gh = context.globalHints || null;
  const serverHints = context.serverAdvantageHints || null;
  const gpu = context.gpuHints || null;
  const page = context.pageHints || null;

  const cachePriority = normalizeCachePriority(
    gh?.cacheHints?.priority ?? adv.cachePriority
  );
  const prewarmNeeded = gh?.prewarmHints?.shouldPrewarm ?? adv.prewarmNeeded;
  const meshPressureIndex = mesh?.meshPressureIndex ?? pf.meshPressureIndex ?? 0;

  const nextFactoringSignal =
    deriveFactoringSignalFromContext({
      meshPressureIndex,
      cachePriority,
      prewarmNeeded
    });

  const nextPresenceField = buildPresenceField({
    regionId: pf.regionId,
    castleId: pf.castleId,
    meshStrength: mesh?.meshStrength ?? pf.meshStrength,
    meshPressureIndex,
    devicePresence: pf.devicePresence,
    bandPresence: pf.bandPresence,
    routerPresence: pf.routerPresence,
    castleLoadLevel: castle?.loadLevel ?? pf.castleLoadLevel ?? "unknown"
  });

  const nextAdvantageField = buildAdvantageField({
    band: normalizedBand,

    // cache
    cachePriority,
    cacheScope: gh?.cacheHints?.scope ?? adv.cache?.cacheScope ?? "page",
    cacheCohort: gh?.cacheHints?.cohort ?? adv.cache?.cacheCohort ?? "global",
    cacheWarmth: gh?.cacheHints?.warmth ?? adv.cache?.cacheWarmth ?? "cold",
    cacheReuseAllowed: gh?.cacheHints?.reuseAllowed ?? adv.cache?.cacheReuseAllowed ?? true,

    // prewarm
    prewarmNeeded,
    prewarmScope: gh?.prewarmHints?.scope ?? adv.prewarm?.prewarmScope ?? "page",
    prewarmBand: gh?.prewarmHints?.band ?? adv.prewarm?.prewarmBand ?? normalizedBand,
    prewarmBudget: gh?.prewarmHints?.budget ?? adv.prewarm?.prewarmBudget ?? 0,
    prewarmHint: gh?.prewarmHints?.hint ?? adv.prewarm?.prewarmHint ?? "none",

    // server
    hotStateReuse: serverHints?.hotStateReuse ?? adv.server?.hotStateReuse ?? adv.hotStateReuse,
    multiInstanceBatching: serverHints?.multiInstanceBatching ?? adv.server?.multiInstanceBatching ?? adv.multiInstanceBatching,
    serverHotStateReuse: serverHints?.hotStateReuse ?? adv.server?.serverHotStateReuse ?? adv.serverHotStateReuse ?? true,
    serverPlanCache: serverHints?.planCache ?? adv.server?.serverPlanCache ?? adv.serverPlanCache ?? true,
    serverBinaryReuse: serverHints?.binaryReuse ?? adv.server?.serverBinaryReuse ?? adv.serverBinaryReuse ?? true,
    serverTier: serverHints?.serverTier ?? adv.server?.serverTier ?? "normal",

    // factoring
    factoringSignal: nextFactoringSignal,

    // GPU (full lane fields preserved)
    gpuPreferred: gpu?.gpuPreferred ?? adv.gpu?.gpuPreferred ?? adv.gpuPreferred ?? true,
    gpuTier: gpu?.gpuTier ?? adv.gpu?.gpuTier ?? adv.gpuTier ?? "normal",
    gpuBinaryReuse: gpu?.gpuBinaryReuse ?? adv.gpu?.gpuBinaryReuse ?? adv.gpuBinaryReuse ?? true,
    gpuPrewarm: gpu?.gpuPrewarm ?? adv.gpu?.gpuPrewarm ?? adv.gpuPrewarm ?? true,
    gpuChunkAggression: gpu?.gpuChunkAggression ?? adv.gpu?.gpuChunkAggression ?? adv.gpuChunkAggression ?? 0,
    gpuCachePriority: gpu?.gpuCachePriority ?? adv.gpu?.gpuCachePriority ?? cachePriority,
    gpuLaneCount: gpu?.gpuLaneCount ?? adv.gpu?.gpuLaneCount ?? 0,
    gpuLaneUtilization: gpu?.gpuLaneUtilization ?? adv.gpu?.gpuLaneUtilization ?? 0,
    gpuBinaryFieldEnabled: gpu?.gpuBinaryFieldEnabled ?? adv.gpu?.gpuBinaryFieldEnabled ?? true,

    // cohort
    cohortId: gh?.cohortHints?.cohortId ?? adv.cohort?.cohortId ?? "global",
    cohortTier: gh?.cohortHints?.cohortTier ?? adv.cohort?.cohortTier ?? "normal",
    cohortWaveMode: gh?.cohortHints?.waveMode ?? adv.cohort?.cohortWaveMode ?? "steady",
    cohortPriority: gh?.cohortHints?.priority ?? adv.cohort?.cohortPriority ?? "normal",

    // page
    pageId,
    pagePriority: page?.pagePriority ?? adv.page?.pagePriority ?? "normal",
    pageHotState: page?.pageHotState ?? adv.page?.pageHotState ?? "cold",
    pagePatternClass: page?.pagePatternClass ?? adv.page?.pagePatternClass ?? "generic"
  });

  // ⭐ Intelligence surface (v16 IMMORTAL-GPU-INTEL)
  const pulseIntelligence = computePulseIntelligence({
    advantageField: {
      ...nextAdvantageField,
      gpuTier: nextAdvantageField.gpu?.gpuTier || nextAdvantageField.gpuTier
    },
    presenceField: nextPresenceField,
    factoringSignal: nextFactoringSignal,
    band: normalizedBand
  });

  // CoreMemory full spine field for evolved Earn
  const coreMemoryField = buildCoreMemoryField({
    pattern: nextPattern,
    lineage: nextLineage,
    pageId,
    band: normalizedBand,
    memorySurface,
    binaryField
  });

  // Structural read from CoreMemory for evolved key
  const priorCoreMemory = readCoreMemoryEarn(coreMemoryField.memoryKey);

  // PULSE-NET organism snapshot — structural, descriptive-only
  const netOrganism = PulseNet.organism?.() ?? null;
  const netField = netOrganism
    ? {
        lastHeartbeat: netOrganism.lastHeartbeat ?? 0,
        lastAIHeartbeat: netOrganism.lastAIHeartbeat ?? 0,
        forwardTicks: netOrganism.forwardTicks ?? 0,
        backwardTicks: netOrganism.backwardTicks ?? 0,
        lastBeatSource: netOrganism.lastBeatSource ?? "none"
      }
    : {
        lastHeartbeat: 0,
        lastAIHeartbeat: 0,
        forwardTicks: 0,
        backwardTicks: 0,
        lastBeatSource: "none"
      };

  const pageIntelligence = computePageIntelligence({
    pageAdvantage: nextAdvantageField.page,
    cacheAdvantage: nextAdvantageField.cache,
    prewarmAdvantage: nextAdvantageField.prewarm,
    gpuAdvantage: nextAdvantageField.gpu
  });

  const evolved = {
    EarnRole,
    jobId: earn.jobId,
    pattern: nextPattern,
    payload: earn.payload,
    priority: earn.priority,
    returnTo: earn.returnTo,
    lineage: nextLineage,
    pageId,

    band: normalizedBand,
    factoringSignal: nextFactoringSignal,

    presenceField: nextPresenceField,
    advantageField: {
      ...advantageFieldCore,
      ...nextAdvantageField
    },

    // ⭐ top-level intelligence
    pulseIntelligence,
    pageIntelligence,

    netField,
    coreMemoryField,
    priorCoreMemory,

    meta: {
      shapeSignature,
      evolutionStage,

      patternAncestry,
      lineageSignature,
      pageAncestrySignature,

      healthScore,
      tier,
      advantageField: advantageFieldCore,
      diagnostics,

      loopField,
      waveField,
      memorySurface,
      binaryField,

      netField,
      coreMemoryField,
      priorCoreMemory,

      // ⭐ mirrored intelligence + signature
      pulseIntelligence,
      pageIntelligence,
      pulseIntelligenceSignature: buildDualHashSignature(JSON.stringify(pulseIntelligence)),
      pageIntelligenceSignature: buildDualHashSignature(JSON.stringify(pageIntelligence)),

      earnSignature: buildDualHashSignature(
        nextPattern + "::" + lineageSignature + "::" + normalizedBand
      ),
      patternSignature: buildDualHashSignature(nextPattern),
      lineageSurface: buildDualHashSignature(String(nextLineage.length)),
      advantageSignature: buildDualHashSignature(JSON.stringify(advantageFieldCore)),
      healthSignature: buildDualHashSignature(String(healthScore)),
      tierSignature: buildDualHashSignature(tier),
      bandSignature: buildDualHashSignature(normalizedBand),

      dualMode: {
        symbolic: normalizedBand === ROUTE_BANDS.SYMBOLIC,
        binary: normalizedBand === ROUTE_BANDS.BINARY
      },

      loopTheory: {
        routingCompletion: true,
        allowLoopfieldPropulsion: true,
        pulseComputeContinuity: true,
        errorRouteAround: true,

        continuanceCapable: true,
        preferContinuanceOnOrganFailure: true
      }
    }
  };

  // Structural write of evolved Earn state into CoreMemory via Earn adapter.
  writeCoreMemoryEarn(coreMemoryField.memoryKey, evolved.coreMemoryField);

  return evolved;
}


// ============================================================================
//  BRIDGE — Earn namespace alias to PulseProofBridge
// ============================================================================
const PulseEarnBridge = PulseProofBridge;
export default PulseEarnBridge;
