// ============================================================================
// FILE: tropic-pulse-functions/PULSE-WORLD/PULSE-GPU/PulseGPUSurvivalInstincts-v24.js
// PULSE GPU SURVIVAL INSTINCTS v24-Immortal-Evo-Core — THE EVOLUTION CORE
// Adaptive Identity Layer • Genetic Memory • Best‑Self Preservation Engine
// Prewarm‑Aware • Chunk‑Aware • Cache‑Aware • Presence‑Aware • Earn‑Field‑Aware
// Warm‑Path‑Aware • Cold‑Path‑Safe • Multi‑Instance‑Aware • Advantage‑Field‑24
// ============================================================================
//
// SAFETY CONTRACT (v24-Immortal-Evo-Core):
//  --------------------------------------
//  • No randomness
//  • No timestamps
//  • No GPU calls
//  • No DOM
//  • No Node APIs
//  • No network or filesystem access
//  • Fail-open: malformed metrics/settings → safe defaults
//  • Self-repair-ready: entries include OS metadata
//  • Deterministic: same inputs → same evolutionary memory
//  • Legacy-safe: v10.4/v11/v12.3/v16 callers still behave identically
// ============================================================================
PULSE-WORLD-MAP.js
import {
  OrganismIdentity,
  buildPulseOrganismMap as PulseOrganismMap
} from "./PULSE-WORLD-MAP.js";
const Identity = OrganismIdentity(import.meta.url);

export const pulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
// export const PULSE_EARN_IMMUNE_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;
export const SURVIVAL_CONTEXT = Identity.pulseLoreContext;
// v24: imports so SurvivalInstincts is wired into the v24 organism
import { PulseGPUSessionTracer } from "./PulseGPUNervousSystem-v24.js";
import { PulseGPUHealer } from "./PulseGPULymphNodes-v24.js";
import { PulseGPUGeneticMemory } from "./PulseGPUGeneticMemory-v24.js";
import { SCORE_CONSTANTS } from "./PulseGPUCommandments-v24.js";
// optional Earn field integration (conceptual, v24-compatible)
import { evolveEarn, createEarn } from "../PULSE-EARN/PulseEarn-v24.js";


// ------------------------------------------------------------
// Utility: stable JSON stringify for hashing
// ------------------------------------------------------------
function stableStringify(value) {
  if (value === null || typeof value !== "object") {
    return JSON.stringify(value);
  }

  if (Array.isArray(value)) {
    return "[" + value.map(stableStringify).join(",") + "]";
  }

  const keys = Object.keys(value).sort();
  const parts = keys.map(
    (k) => JSON.stringify(k) + ":" + stableStringify(value[k])
  );
  return "{" + parts.join(",") + "}";
}

// ------------------------------------------------------------
// Utility: simple deterministic hash
// ------------------------------------------------------------
function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    const chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return (hash >>> 0).toString(16);
}

// ------------------------------------------------------------
// Settings hash — Genetic Fingerprint
// ------------------------------------------------------------
function computeSettingsHash(settings) {
  const serialized = stableStringify(settings || {});
  return simpleHash(serialized);
}

// ------------------------------------------------------------
// Advantage snapshot hash — Advantage Fingerprint (v24)
// ------------------------------------------------------------
function computeAdvantageSnapshotHash(advantageSnapshot) {
  if (!advantageSnapshot || typeof advantageSnapshot !== "object") {
    return "";
  }
  const serialized = stableStringify(advantageSnapshot);
  return simpleHash(serialized);
}

// ------------------------------------------------------------
// Earn Evolution Chain — evolveEarn → createEarn → system fallback
// ------------------------------------------------------------
function runEarnEvolution(settings, metrics, executionContext) {
  const safeSettings = settings || {};
  const ctx = executionContext || {};
  let evolvedSettings = safeSettings;
  let earnMeta = null;

  function isValidSettings(obj) {
    return obj && typeof obj === "object";
  }

  // 1) Try evolveEarn first (primary evolution driver)
  try {
    const result = evolveEarn(safeSettings, metrics || {}, ctx);
    if (result && typeof result === "object") {
      const { settings: newSettings, score, fingerprint, hints } = result;
      if (isValidSettings(newSettings)) {
        evolvedSettings = newSettings;
        earnMeta = {
          mode: "evolveEarn",
          score: typeof score === "number" ? score : 0,
          fingerprint: fingerprint || "",
          hints: hints || null
        };
        return { evolvedSettings, earnMeta };
      }
    }
  } catch {
    // fail-open
  }

  // 2) If evolveEarn fails, try createEarn (secondary evolution driver)
  try {
    const result = createEarn(safeSettings, metrics || {}, ctx);
    if (result && typeof result === "object") {
      const { settings: newSettings, score, fingerprint, hints } = result;
      if (isValidSettings(newSettings)) {
        evolvedSettings = newSettings;
        earnMeta = {
          mode: "createEarn",
          score: typeof score === "number" ? score : 0,
          fingerprint: fingerprint || "",
          hints: hints || null
        };
        return { evolvedSettings, earnMeta };
      }
    }
  } catch {
    // fail-open
  }

  // 3) If both Earn paths fail → system evolution only
  return {
    evolvedSettings: safeSettings,
    earnMeta: null
  };
}

// ------------------------------------------------------------
// Session scoring — Evolutionary Fitness Score (v12.3/v16 dual-band + pressure)
// + v24 prewarm/chunk/cache/presence/earn/warm-path/cold-path shaping
// ------------------------------------------------------------
function clamp(value, min, max) {
  if (typeof value !== "number" || Number.isNaN(value)) return min;
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

// Base v10.4/v11-compatible score (FPS + stutters + crash)
function baseScoreSession(metrics = {}) {
  if (!metrics || typeof metrics !== "object") return 0;

  const {
    avgFPS,
    minFPS,
    stutterCount,
    crashFlag = false
  } = metrics;

  const avg = typeof metrics.avgFps === "number" ? metrics.avgFps : avgFPS || 0;
  const min = typeof metrics.minFps === "number" ? metrics.minFps : minFPS || 0;
  const stutters =
    typeof metrics.stutters === "number" ? metrics.stutters : stutterCount || 0;

  const safeAvg = clamp(avg, 0, SCORE_CONSTANTS.MAX_FPS);
  const safeMin = clamp(min, 0, SCORE_CONSTANTS.MAX_FPS);
  const safeStutters = clamp(stutters, 0, SCORE_CONSTANTS.MAX_STUTTERS);

  const avgScore = safeAvg / SCORE_CONSTANTS.MAX_FPS;
  const minScore = safeMin / SCORE_CONSTANTS.MAX_FPS;
  const stutterPenalty = safeStutters / SCORE_CONSTANTS.MAX_STUTTERS;

  let score =
    SCORE_CONSTANTS.AVG_FPS_WEIGHT * avgScore +
    SCORE_CONSTANTS.MIN_FPS_WEIGHT * minScore -
    SCORE_CONSTANTS.STUTTER_WEIGHT * stutterPenalty;

  if (crashFlag) score -= SCORE_CONSTANTS.CRASH_PENALTY;

  return clamp(score, 0, 1);
}

// Extract mode + pressure stats from trace / traceSummary / pressureSnapshot
function extractModeAndPressureStats({
  trace,
  traceSummary,
  pressureSnapshot,
  binaryMode
} = {}) {
  let binaryStepCount = 0;
  let symbolicStepCount = 0;

  if (traceSummary && typeof traceSummary === "object") {
    if (typeof traceSummary.binaryStepCount === "number") {
      binaryStepCount = clamp(traceSummary.binaryStepCount, 0, 1_000_000);
    }
    if (typeof traceSummary.symbolicStepCount === "number") {
      symbolicStepCount = clamp(traceSummary.symbolicStepCount, 0, 1_000_000);
    }
  } else if (Array.isArray(trace)) {
    trace.forEach((step) => {
      if (!step || typeof step !== "object") return;
      if (step.binaryModeObserved) binaryStepCount += 1;
      if (step.symbolicModeObserved) symbolicStepCount += 1;
    });
  }

  const totalSteps = binaryStepCount + symbolicStepCount;
  const binaryRatio = totalSteps > 0 ? binaryStepCount / totalSteps : 0;
  const symbolicRatio = totalSteps > 0 ? symbolicStepCount / totalSteps : 0;

  const p =
    pressureSnapshot ||
    (traceSummary && traceSummary.pressureSnapshot) ||
    null;

  let gpuLoadPressure = 0;
  let thermalPressure = 0;
  let memoryPressure = 0;
  let meshStormPressure = 0;
  let auraTension = 0;

  if (p && typeof p === "object") {
    gpuLoadPressure = clamp(p.gpuLoadPressure ?? 0, 0, 1);
    thermalPressure = clamp(p.thermalPressure ?? gpuLoadPressure, 0, 1);
    memoryPressure = clamp(p.memoryPressure ?? 0, 0, 1);
    meshStormPressure = clamp(p.meshStormPressure ?? 0, 0, 1);
    auraTension = clamp(p.auraTension ?? 0, 0, 1);
  }

  const pressureScore =
    (gpuLoadPressure +
      thermalPressure +
      memoryPressure +
      meshStormPressure +
      auraTension) / 5;

  return {
    binaryStepCount,
    symbolicStepCount,
    binaryRatio,
    symbolicRatio,
    pressureScore,
    binaryMode: binaryMode || "auto"
  };
}

// v24: prewarm / chunk / cache / presence / earn / warm-path / cold-path shaping factors
function extractAdvantageShapingFromMetrics(metrics = {}) {
  const prewarmCoverage =
    typeof metrics.prewarmCoverage === "number"
      ? clamp(metrics.prewarmCoverage, 0, 1)
      : 0;

  const chunkWarmthScore =
    typeof metrics.chunkWarmthScore === "number"
      ? clamp(metrics.chunkWarmthScore, 0, 1)
      : 0;

  const cacheHitRatio =
    typeof metrics.cacheHitRatio === "number"
      ? clamp(metrics.cacheHitRatio, 0, 1)
      : 0;

  const presenceUptimeRatio =
    typeof metrics.presenceUptimeRatio === "number"
      ? clamp(metrics.presenceUptimeRatio, 0, 1)
      : 0;

  const earnYieldScore =
    typeof metrics.earnYieldScore === "number"
      ? clamp(metrics.earnYieldScore, 0, 1)
      : 0;

  const warmPathHitRatio =
    typeof metrics.warmPathHitRatio === "number"
      ? clamp(metrics.warmPathHitRatio, 0, 1)
      : 0;

  const coldPathPenaltyRatio =
    typeof metrics.coldPathPenaltyRatio === "number"
      ? clamp(metrics.coldPathPenaltyRatio, 0, 1)
      : 0;

  const prewarmStepRatio =
    typeof metrics.prewarmStepRatio === "number"
      ? clamp(metrics.prewarmStepRatio, 0, 1)
      : 0;

  const cacheMissPenaltyRatio =
    typeof metrics.cacheMissPenaltyRatio === "number"
      ? clamp(metrics.cacheMissPenaltyRatio, 0, 1)
      : 0;

  const multiInstanceUtilization =
    typeof metrics.multiInstanceUtilization === "number"
      ? clamp(metrics.multiInstanceUtilization, 0, 1)
      : 0;

  return {
    prewarmCoverage,
    chunkWarmthScore,
    cacheHitRatio,
    presenceUptimeRatio,
    earnYieldScore,
    warmPathHitRatio,
    coldPathPenaltyRatio,
    prewarmStepRatio,
    cacheMissPenaltyRatio,
    multiInstanceUtilization
  };
}

// v12.3/v16 score: base FPS score + dual-band + pressure shaping
// v24: extended with prewarm/chunk/cache/presence/earn/warm-path/cold-path/multi-instance shaping
function scoreSession(metrics = {}, options = {}) {
  const baseScore = baseScoreSession(metrics);

  const {
    trace,
    traceSummary,
    pressureSnapshot,
    binaryMode
  } = options || {};

  const modeStats = extractModeAndPressureStats({
    trace,
    traceSummary,
    pressureSnapshot,
    binaryMode
  });

  const { binaryRatio, symbolicRatio, pressureScore } = modeStats;

  const dualBalance = 1 - Math.abs(binaryRatio - symbolicRatio);
  const dualBonus = 0.05 * dualBalance;

  const binaryBiasBonus =
    binaryMode === "binary" ? 0.05 * binaryRatio : 0;

  const pressurePenalty = 0.15 * pressureScore;

  const {
    prewarmCoverage,
    chunkWarmthScore,
    cacheHitRatio,
    presenceUptimeRatio,
    earnYieldScore,
    warmPathHitRatio,
    coldPathPenaltyRatio,
    prewarmStepRatio,
    cacheMissPenaltyRatio,
    multiInstanceUtilization
  } = extractAdvantageShapingFromMetrics(metrics);

  const prewarmBonus = 0.04 * prewarmCoverage;
  const chunkBonus = 0.04 * chunkWarmthScore;
  const cacheBonus = 0.04 * cacheHitRatio;
  const presenceBonus = 0.03 * presenceUptimeRatio;
  const earnBonus = 0.05 * earnYieldScore;

  const warmPathBonus = 0.04 * warmPathHitRatio;
  const coldPathPenalty = 0.04 * coldPathPenaltyRatio;
  const prewarmStepBonus = 0.03 * prewarmStepRatio;
  const cacheMissPenalty = 0.03 * cacheMissPenaltyRatio;
  const multiInstanceBonus = 0.03 * multiInstanceUtilization;

  let score =
    baseScore +
    dualBonus +
    binaryBiasBonus -
    pressurePenalty +
    prewarmBonus +
    chunkBonus +
    cacheBonus +
    presenceBonus +
    earnBonus +
    warmPathBonus +
    prewarmStepBonus +
    multiInstanceBonus -
    coldPathPenalty -
    cacheMissPenalty;

  return clamp(score, 0, 1);
}

// ------------------------------------------------------------
// Regression detection — Evolutionary Delta (mode/pressure-aware wrapper)
// ------------------------------------------------------------
function detectRegression(currentMetrics, baselineMetrics, options = {}) {
  const currentScore = scoreSession(currentMetrics, options.current || {});
  const baselineScore = scoreSession(baselineMetrics, options.baseline || {});

  if (baselineScore === 0) return 0;

  const delta = (currentScore - baselineScore) / baselineScore;
  return delta * 100;
}

// ------------------------------------------------------------
// Key building helpers — Genetic Indexing (v12.3 execution-aware)
// ------------------------------------------------------------
function buildGameKey(gameProfile = {}) {
  const { gameId = "unknown", buildVersion = "", contentHash = "" } =
    gameProfile;
  return stableStringify({ gameId, buildVersion, contentHash });
}

function buildHardwareKey(hardwareProfile = {}) {
  const {
    gpuModel = "unknown",
    driverVersion = "",
    vramMB = 0,
    cpuModel = "",
    ramMB = 0
  } = hardwareProfile;

  return stableStringify({
    gpuModel,
    driverVersion,
    vramMB,
    cpuModel,
    ramMB
  });
}

function buildTierKey(tierProfile = {}) {
  const { tierId = "default" } = tierProfile;
  return stableStringify({ tierId });
}

// Execution context fingerprint (aligned with GeneticMemory / SessionTracer)
// Extended with presenceMode for presence‑aware indexing.
function buildExecutionContextKey(executionContext = null) {
  if (!executionContext || typeof executionContext !== "object") {
    return stableStringify(null);
  }

  const {
    binaryMode = "auto",
    pipelineId = "",
    sceneType = "",
    workloadClass = "",
    resolution = "",
    refreshRate = 0,
    dispatchSignature = "",
    shapeSignature = "",
    presenceMode = ""
  } = executionContext;

  return stableStringify({
    binaryMode,
    pipelineId,
    sceneType,
    workloadClass,
    resolution,
    refreshRate,
    dispatchSignature,
    shapeSignature,
    presenceMode
  });
}

// v24 composite key: game + hardware + tier + settings + mode + execution + advantage + earn
function buildCompositeKey(
  gameProfile,
  hardwareProfile,
  tierProfile,
  settingsHash,
  binaryMode,
  executionContext,
  advantageSnapshotHash,
  earnFingerprint
) {
  const gameKey = buildGameKey(gameProfile);
  const hwKey = buildHardwareKey(hardwareProfile);
  const tierKey = buildTierKey(tierProfile || {});
  const execKey = buildExecutionContextKey(executionContext || null);

  const base = stableStringify({
    gameKey,
    hwKey,
    tierKey,
    settingsHash,
    binaryMode: binaryMode || "auto",
    executionContext: execKey,
    advantageSnapshotHash: advantageSnapshotHash || "",
    earnFingerprint: earnFingerprint || ""
  });

  return simpleHash(base);
}

// ------------------------------------------------------------
// Memory entry model — Evolutionary Record (v24 Immortal)
// ------------------------------------------------------------
class PulseGPUSurvivalInstinctsStore {
  constructor() {
    this.entries = new Map();
    this.meta = { ...SURVIVAL_CONTEXT };
  }

  clear() {
    this.entries.clear();
  }

  // v24: accepts optional traceSummary, pressureSnapshot, executionContext, advantageSnapshot, Earn evolution
  recordSession({
    gameProfile,
    hardwareProfile,
    tierProfile,
    settings,
    metrics,
    trace,
    traceSummary,
    pressureSnapshot,
    binaryMode = "auto",
    executionContext = null,
    advantageSnapshot = null
  }) {
    const { evolvedSettings, earnMeta } = runEarnEvolution(
      settings,
      metrics,
      executionContext
    );

    const settingsHash = computeSettingsHash(evolvedSettings);
    const advantageSnapshotHash = computeAdvantageSnapshotHash(
      advantageSnapshot
    );
    const earnFingerprint =
      earnMeta && typeof earnMeta.fingerprint === "string"
        ? earnMeta.fingerprint
        : "";

    const key = buildCompositeKey(
      gameProfile,
      hardwareProfile,
      tierProfile,
      settingsHash,
      binaryMode,
      executionContext,
      advantageSnapshotHash,
      earnFingerprint
    );

    const modeStats = extractModeAndPressureStats({
      trace,
      traceSummary,
      pressureSnapshot,
      binaryMode
    });

    const metricsForScoring = {
      ...(metrics || {}),
      earnYieldScore: earnMeta?.score ?? metrics?.earnYieldScore ?? 0,
      earnEvolutionScore: earnMeta?.score ?? 0
    };

    const score = scoreSession(metricsForScoring, {
      trace,
      traceSummary,
      pressureSnapshot,
      binaryMode
    });

    const existing = this.entries.get(key);

    if (!existing || score > existing.bestScore) {
      const entry = {
        key,
        gameProfile: gameProfile || {},
        hardwareProfile: hardwareProfile || {},
        tierProfile: tierProfile || {},
        settingsHash,
        settings: evolvedSettings || settings || {},
        bestMetrics: metrics || {},
        bestScore: score,
        bestTrace: Array.isArray(trace) ? trace.slice() : null,
        traceSummary: traceSummary || null,
        binaryMode,
        executionContext: executionContext || null,
        modeStats,
        pressureScore: modeStats.pressureScore,
        advantageSnapshot: advantageSnapshot || null,
        advantageSnapshotHash,
        earnMeta: earnMeta || null,
        earnFingerprint,
        meta: { ...SURVIVAL_CONTEXT }
      };
      this.entries.set(key, entry);
    }

    return this.entries.get(key);
  }

  // v24: best-self selection now Earn-aware
  getBestSettingsFor(
    gameProfile,
    hardwareProfile,
    tierProfile,
    opts = {}
  ) {
    const gameKey = buildGameKey(gameProfile);
    const hwKey = buildHardwareKey(hardwareProfile);
    const tierKey = tierProfile ? buildTierKey(tierProfile) : null;
    const preferredBinaryMode = opts.binaryMode || null;

    let bestEntry = null;

    for (const entry of this.entries.values()) {
      if (buildGameKey(entry.gameProfile) !== gameKey) continue;
      if (buildHardwareKey(entry.hardwareProfile) !== hwKey) continue;
      if (tierKey && buildTierKey(entry.tierProfile) !== tierKey) continue;

      if (
        preferredBinaryMode &&
        entry.binaryMode &&
        entry.binaryMode !== preferredBinaryMode
      ) {
        continue;
      }

      if (!bestEntry) {
        bestEntry = entry;
        continue;
      }

      const a = entry.earnMeta?.score ?? 0;
      const b = bestEntry.earnMeta?.score ?? 0;

      if (a > b) {
        bestEntry = entry;
        continue;
      }

      if (a === b && entry.bestScore > bestEntry.bestScore) {
        bestEntry = entry;
      }
    }

    return bestEntry;
  }

  serialize() {
    return JSON.stringify([...this.entries.values()]);
  }

  deserialize(jsonString) {
    this.entries.clear();
    if (!jsonString) return;

    let arr;
    try {
      arr = JSON.parse(jsonString);
    } catch {
      return;
    }

    if (!Array.isArray(arr)) return;

    arr.forEach((entry) => {
      if (!entry || typeof entry !== "object" || !entry.key) return;

      const modeStats = entry.modeStats || {};
      const pressureScore =
        typeof entry.pressureScore === "number"
          ? clamp(entry.pressureScore, 0, 1)
          : 0;

      const safeEntry = {
        key: entry.key,
        gameProfile: entry.gameProfile || {},
        hardwareProfile: entry.hardwareProfile || {},
        tierProfile: entry.tierProfile || {},
        settingsHash: entry.settingsHash || "",
        settings: entry.settings || {},
        bestMetrics: entry.bestMetrics || {},
        bestScore:
          typeof entry.bestScore === "number" ? entry.bestScore : 0,
        bestTrace: Array.isArray(entry.bestTrace) ? entry.bestTrace : null,
        traceSummary: entry.traceSummary || null,
        binaryMode: entry.binaryMode || "auto",
        executionContext: entry.executionContext || null,
        modeStats: {
          binaryStepCount: modeStats.binaryStepCount || 0,
          symbolicStepCount: modeStats.symbolicStepCount || 0,
          binaryRatio: modeStats.binaryRatio || 0,
          symbolicRatio: modeStats.symbolicRatio || 0,
          pressureScore
        },
        pressureScore,
        advantageSnapshot: entry.advantageSnapshot || null,
        advantageSnapshotHash: entry.advantageSnapshotHash || "",
        earnMeta: entry.earnMeta || null,
        earnFingerprint: entry.earnFingerprint || "",
        meta: { ...SURVIVAL_CONTEXT }
      };

      this.entries.set(safeEntry.key, safeEntry);
    });
  }
}

// ------------------------------------------------------------
// Public API wrapper — Evolution Core Surface (v24 Immortal)
// ------------------------------------------------------------
class PulseGPUSurvivalInstincts {
  constructor() {
    this.store = new PulseGPUSurvivalInstinctsStore();
    this.meta = { ...SURVIVAL_CONTEXT };
  }

  recordSession(session) {
    return this.store.recordSession(session || {});
  }

  getBestSettingsFor(gameProfile, hardwareProfile, tierProfile, opts) {
    return this.store.getBestSettingsFor(
      gameProfile,
      hardwareProfile,
      tierProfile,
      opts || {}
    );
  }

  detectRegression(currentMetrics, baselineMetrics, options) {
    return detectRegression(currentMetrics, baselineMetrics, options || {});
  }

  scoreSession(metrics, options) {
    return scoreSession(metrics || {}, options || {});
  }

  serialize() {
    return this.store.serialize();
  }

  deserialize(jsonString) {
    this.store.deserialize(jsonString);
  }

  clear() {
    this.store.clear();
  }
}

// ------------------------------------------------------------
// EXPORTS
// ------------------------------------------------------------
export {
  PulseGPUSurvivalInstincts,
  PulseGPUSurvivalInstinctsStore,
  computeSettingsHash,
  scoreSession,
  detectRegression,
  evolveEarn,
  createEarn
};
