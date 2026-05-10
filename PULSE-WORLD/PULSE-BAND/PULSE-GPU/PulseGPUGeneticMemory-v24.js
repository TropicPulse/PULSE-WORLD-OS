// ============================================================================
// FILE: tropic-pulse-functions/PULSE-WORLD/PULSE-GPU/PulseGPUGeneticMemory-v24.js
// PULSE GPU GENETIC MEMORY v24‑IMMORTAL++ — THE DNA ARCHIVE
// Long-Horizon Pattern Memory • Lineage Store • Deterministic Pattern Engine
// CoreMemory‑v24‑Integrated • ComputerIntelligence‑Aware • Earn‑v24‑GPU‑Ready
// ============================================================================
//
// IDENTITY — THE DNA ARCHIVE (v24‑IMMORTAL++):
//  --------------------------------------------------------
//  • Long-term genetic memory of the GPU organism.
//  • Stores lineage, execution signatures, binary-mode outcomes, and patterns.
//  • Stores dispatch signatures, shape signatures, pressure correlations.
//  • Tracks advantage vectors + CI fields for Drive / Wisdom / Cognitive layers.
//  • No prediction — only pattern recognition over what actually happened.
//  • Designed for Advisor, Healer, Orchestrator, Insights, UI, Engine, Earn.
//  • Advantage-cascade aware: systemic gains improve pattern density.
//  • PulseSend-v24-ready • Earn-v24-GPU-ready • Dual-band + CI aware.
//
// SAFETY CONTRACT (v24‑IMMORTAL++):
//  ---------------------------------------------
//  • No randomness
//  • No timestamps
//  • No GPU calls
//  • No DOM
//  • No Node APIs
//  • No network or filesystem access
//  • Fail-open: malformed inputs → ignored, never crash
//  • Self-repair-ready: entries include OS metadata
//  • Deterministic: same inputs → same genetic memory
// ============================================================================
import {
  OrganismIdentity,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PulseWorldOrganismMap-v24.js";
const Identity = OrganismIdentity(import.meta.url);

export const pulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
export const GENETIC_MEMORY_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;
import { PulseCoreMemory } from "../PULSE-CORE/PulseCoreMemory-v24.js";


// ============================================================================
// Utility: stable JSON stringify for hashing
// ============================================================================
function stableStringify(value) {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return "[" + value.map(stableStringify).join(",") + "]";
  const keys = Object.keys(value).sort();
  return (
    "{" +
    keys
      .map((k) => JSON.stringify(k) + ":" + stableStringify(value[k]))
      .join(",") +
    "}"
  );
}

// ============================================================================
// Utility: deterministic hash
// ============================================================================
function simpleHash(str) {
  let hash = 0;
  const s = String(str);
  for (let i = 0; i < s.length; i++) {
    hash = (hash << 5) - hash + s.charCodeAt(i);
    hash |= 0;
  }
  return (hash >>> 0).toString(16);
}

function clamp(v, min, max) {
  if (typeof v !== "number" || Number.isNaN(v)) return min;
  return v < min ? min : v > max ? max : v;
}

// ============================================================================
// Signature builders — v24 IMMORTAL++
// ============================================================================
function buildGameKey(gameProfile = {}) {
  const {
    gameId = "unknown",
    buildVersion = "",
    contentHash = "",
    publisherId = "",
    channel = ""
  } = gameProfile;
  return stableStringify({ gameId, buildVersion, contentHash, publisherId, channel });
}

function buildHardwareKey(hardwareProfile = {}) {
  const {
    gpuModel = "unknown",
    driverVersion = "",
    vramMB = 0,
    cpuModel = "",
    ramMB = 0,
    deviceClass = "",
    platform = ""
  } = hardwareProfile;

  return stableStringify({
    gpuModel,
    driverVersion,
    vramMB,
    cpuModel,
    ramMB,
    deviceClass,
    platform
  });
}

function buildTierKey(tierProfile = {}) {
  return stableStringify({
    tierId: tierProfile?.tierId || "default",
    tierLabel: tierProfile?.tierLabel || "",
    earnTier: tierProfile?.earnTier || ""
  });
}

function buildExecutionContextKey(executionContext = {}) {
  const {
    binaryMode = "auto",
    pipelineId = "",
    sceneType = "",
    workloadClass = "",
    resolution = "",
    refreshRate = 0,
    dispatchSignature = "",
    shapeSignature = "",
    qualityPreset = "",
    rayTracing = false,
    // v24: optional Earn + presence hints
    presence = "",
    earnBand = "",
    earnTierHint = ""
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
    qualityPreset,
    rayTracing,
    presence,
    earnBand,
    earnTierHint
  });
}

function buildGeneticKey({ gameProfile, hardwareProfile, tierProfile, executionContext }) {
  const base = stableStringify({
    gameKey: buildGameKey(gameProfile),
    hwKey: buildHardwareKey(hardwareProfile),
    tierKey: buildTierKey(tierProfile),
    ctxKey: buildExecutionContextKey(executionContext)
  });
  return simpleHash(base);
}

// ============================================================================
// Pattern aggregation — v24 IMMORTAL++
// ============================================================================
function safeNumber(n, fallback = 0) {
  return typeof n === "number" && !Number.isNaN(n) ? n : fallback;
}

function aggregatePatternStats(existing, sample) {
  const next = existing
    ? { ...existing }
    : {
        sampleCount: 0,
        avgFPS: 0,
        minFPS: 0,
        stutterRate: 0,
        crashRate: 0,
        avgDurationMs: 0,

        // pressure + advantage vectors
        pressureVector: { gpu: 0, thermal: 0, memory: 0, mesh: 0, aura: 0 },
        advantageVector: {
          scoreDelta: 0,
          stabilityDelta: 0,
          earnPotential: 0
        },

        // mode ratios
        binaryModeRatio: 0,
        symbolicModeRatio: 0,

        // v24: Earn + presence stats (metadata-only)
        earnStats: {
          avgEarnTier: 0,
          avgEarnUtilization: 0,
          presenceIdleRatio: 0,
          presenceActiveRatio: 0
        },

        // CI surface (metadata-only)
        computerIntelligence: {
          performancePressure: 0,
          stabilitySignal: 0,
          confidence: 0
        }
      };

  const count = next.sampleCount;
  const newCount = count + 1;

  const sAvgFPS = safeNumber(sample.avgFPS);
  const sMinFPS = safeNumber(sample.minFPS);
  const sStutters = clamp(safeNumber(sample.stutters), 0, 100000);
  const sCrash = sample.crashFlag ? 1 : 0;
  const sDuration = clamp(
    safeNumber(sample.totalDurationMs),
    0,
    60 * 60 * 1000
  );

  next.avgFPS = (next.avgFPS * count + sAvgFPS) / newCount;
  next.minFPS = (next.minFPS * count + sMinFPS) / newCount;

  const stutterRateSample = sDuration > 0 ? sStutters / sDuration : 0;
  next.stutterRate =
    (next.stutterRate * count + stutterRateSample) / newCount;

  next.crashRate = (next.crashRate * count + sCrash) / newCount;
  next.avgDurationMs =
    (next.avgDurationMs * count + sDuration) / newCount;

  if (sample.pressureSnapshot) {
    const p = sample.pressureSnapshot;
    next.pressureVector = {
      gpu:
        (next.pressureVector.gpu * count +
          safeNumber(p.gpuLoadPressure)) /
        newCount,
      thermal:
        (next.pressureVector.thermal * count +
          safeNumber(p.thermalPressure)) /
        newCount,
      memory:
        (next.pressureVector.memory * count +
          safeNumber(p.memoryPressure)) /
        newCount,
      mesh:
        (next.pressureVector.mesh * count +
          safeNumber(p.meshStormPressure)) /
        newCount,
      aura:
        (next.pressureVector.aura * count +
          safeNumber(p.auraTension)) /
        newCount
    };
  }

  if (sample.advantageSnapshot) {
    const a = sample.advantageSnapshot;
    next.advantageVector = {
      scoreDelta:
        (next.advantageVector.scoreDelta * count +
          safeNumber(a.scoreDelta)) /
        newCount,
      stabilityDelta:
        (next.advantageVector.stabilityDelta * count +
          safeNumber(a.stabilityDelta)) /
        newCount,
      earnPotential:
        (next.advantageVector.earnPotential * count +
          safeNumber(a.earnPotential)) /
        newCount
    };
  }

  if (sample.binaryStepCount || sample.symbolicStepCount) {
    const total = sample.binaryStepCount + sample.symbolicStepCount;
    if (total > 0) {
      next.binaryModeRatio =
        (next.binaryModeRatio * count +
          sample.binaryStepCount / total) /
        newCount;
      next.symbolicModeRatio =
        (next.symbolicModeRatio * count +
          sample.symbolicStepCount / total) /
        newCount;
    }
  }

  // v24: Earn + presence aggregation (metadata-only)
  if (sample.earnSnapshot && typeof sample.earnSnapshot === "object") {
    const es = sample.earnSnapshot;
    const prev = next.earnStats || {
      avgEarnTier: 0,
      avgEarnUtilization: 0,
      presenceIdleRatio: 0,
      presenceActiveRatio: 0
    };

    const tierNumeric = safeNumber(es.tierNumeric, 0);
    const util = clamp(
      safeNumber(es.utilizationPercent, 0),
      0,
      100
    );
    const idleFlag = es.presence === "idle" ? 1 : 0;
    const activeFlag = es.presence === "active" ? 1 : 0;

    next.earnStats = {
      avgEarnTier:
        (prev.avgEarnTier * count + tierNumeric) / newCount,
      avgEarnUtilization:
        (prev.avgEarnUtilization * count + util) / newCount,
      presenceIdleRatio:
        (prev.presenceIdleRatio * count + idleFlag) / newCount,
      presenceActiveRatio:
        (prev.presenceActiveRatio * count + activeFlag) / newCount
    };
  }

  if (
    sample.computerIntelligence &&
    typeof sample.computerIntelligence === "object"
  ) {
    const ci = sample.computerIntelligence;
    const prev = next.computerIntelligence || {
      performancePressure: 0,
      stabilitySignal: 0,
      confidence: 0
    };

    next.computerIntelligence = {
      performancePressure:
        (prev.performancePressure * count +
          safeNumber(ci.performancePressure)) /
        newCount,
      stabilitySignal:
        (prev.stabilitySignal * count +
          safeNumber(ci.stabilitySignal)) /
        newCount,
      confidence:
        (prev.confidence * count +
          clamp(safeNumber(ci.confidence), 0, 1)) /
        newCount
    };
  }

  next.sampleCount = newCount;
  return next;
}

// ============================================================================
// Genetic Memory Store — v24 IMMORTAL++ + CoreMemory v24 Integration
// ============================================================================
class PulseGPUGeneticMemoryStore {
  constructor() {
    this.entries = new Map();
    this.meta = { ...GENETIC_MEMORY_CONTEXT };
    this.coreMemory = new PulseCoreMemory("PulseGPU.GeneticMemory.v24");
    this.namespace = "PulseGPU.GeneticMemory.v24";
  }

  clear() {
    this.entries.clear();
    try {
      this.coreMemory.clearNamespace(this.namespace);
    } catch {}
  }

  recordObservation({
    gameProfile,
    hardwareProfile,
    tierProfile,
    executionContext,
    metrics,
    traceSummary,
    advantageSnapshot,
    computerIntelligence,
    // v24: optional Earn snapshot (from PulseGPUEarnProfile-v24)
    earnSnapshot
  }) {
    const key = buildGeneticKey({
      gameProfile,
      hardwareProfile,
      tierProfile,
      executionContext
    });

    const existing = this.entries.get(key);

    const sample = {
      avgFPS: metrics?.avgFps ?? metrics?.avgFPS ?? 0,
      minFPS: metrics?.minFps ?? metrics?.minFPS ?? 0,
      stutters: metrics?.stutters ?? metrics?.stutterCount ?? 0,
      crashFlag: !!metrics?.crashFlag,
      totalDurationMs: traceSummary?.totalDurationMs ?? 0,
      pressureSnapshot: traceSummary?.pressureSnapshot ?? null,
      binaryStepCount: traceSummary?.binaryStepCount ?? 0,
      symbolicStepCount: traceSummary?.symbolicStepCount ?? 0,
      advantageSnapshot: advantageSnapshot || null,
      computerIntelligence: computerIntelligence || null,
      earnSnapshot: earnSnapshot || null
    };

    const updatedStats = aggregatePatternStats(
      existing?.patternStats,
      sample
    );

    const entry = {
      key,
      gameProfile: gameProfile || {},
      hardwareProfile: hardwareProfile || {},
      tierProfile: tierProfile || {},
      executionContext: executionContext || {},
      patternStats: updatedStats,
      meta: { ...GENETIC_MEMORY_CONTEXT }
    };

    this.entries.set(key, entry);

    // CoreMemory mirror
    try {
      this.coreMemory.record(this.namespace, key, entry);
    } catch {}

    return entry;
  }

  getPatternForContext({
    gameProfile,
    hardwareProfile,
    tierProfile,
    executionContext
  }) {
    const key = buildGeneticKey({
      gameProfile,
      hardwareProfile,
      tierProfile,
      executionContext
    });

    const local = this.entries.get(key);
    if (local) return local;

    try {
      const fromCore = this.coreMemory.get(this.namespace, key);
      if (fromCore) {
        this.entries.set(key, fromCore);
        return fromCore;
      }
    } catch {}

    return null;
  }

  queryPatterns({ gameId, gpuModel, binaryMode, tierId, earnTier } = {}) {
    const results = [];
    for (const entry of this.entries.values()) {
      const gp = entry.gameProfile || {};
      const hp = entry.hardwareProfile || {};
      const ctx = entry.executionContext || {};
      const tp = entry.tierProfile || {};

      if (gameId && gp.gameId !== gameId) continue;
      if (gpuModel && hp.gpuModel !== gpuModel) continue;
      if (binaryMode && ctx.binaryMode !== binaryMode) continue;
      if (tierId && tp.tierId !== tierId) continue;
      if (earnTier && tp.earnTier !== earnTier) continue;

      results.push(entry);
    }
    return results;
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

    for (const entry of arr) {
      if (!entry || typeof entry !== "object" || !entry.key) continue;

      const ps = entry.patternStats || {};
      const pv = ps.pressureVector || {};
      const av = ps.advantageVector || {};
      const ci = ps.computerIntelligence || {};
      const es = ps.earnStats || {};

      const safeEntry = {
        key: entry.key,
        gameProfile: entry.gameProfile || {},
        hardwareProfile: entry.hardwareProfile || {},
        tierProfile: entry.tierProfile || {},
        executionContext: entry.executionContext || {},
        patternStats: {
          sampleCount: ps.sampleCount || 0,
          avgFPS: ps.avgFPS || 0,
          minFPS: ps.minFPS || 0,
          stutterRate: ps.stutterRate || 0,
          crashRate: ps.crashRate || 0,
          avgDurationMs: ps.avgDurationMs || 0,
          pressureVector: {
            gpu: pv.gpu || 0,
            thermal: pv.thermal || 0,
            memory: pv.memory || 0,
            mesh: pv.mesh || 0,
            aura: pv.aura || 0
          },
          advantageVector: {
            scoreDelta: av.scoreDelta || 0,
            stabilityDelta: av.stabilityDelta || 0,
            earnPotential: av.earnPotential || 0
          },
          binaryModeRatio: ps.binaryModeRatio || 0,
          symbolicModeRatio: ps.symbolicModeRatio || 0,
          earnStats: {
            avgEarnTier: es.avgEarnTier || 0,
            avgEarnUtilization: es.avgEarnUtilization || 0,
            presenceIdleRatio: es.presenceIdleRatio || 0,
            presenceActiveRatio: es.presenceActiveRatio || 0
          },
          computerIntelligence: {
            performancePressure: ci.performancePressure || 0,
            stabilitySignal: ci.stabilitySignal || 0,
            confidence: clamp(ci.confidence || 0, 0, 1)
          }
        },
        meta: { ...GENETIC_MEMORY_CONTEXT }
      };

      this.entries.set(safeEntry.key, safeEntry);

      try {
        this.coreMemory.record(this.namespace, safeEntry.key, safeEntry);
      } catch {}
    }
  }
}

// ============================================================================
// Public API — Genetic Memory Surface (v24 IMMORTAL++)
// ============================================================================
class PulseGPUGeneticMemory {
  constructor() {
    this.store = new PulseGPUGeneticMemoryStore();
    this.meta = { ...GENETIC_MEMORY_CONTEXT };
  }

  recordObservation(o) {
    return this.store.recordObservation(o || {});
  }

  getPatternForContext(ctx) {
    return this.store.getPatternForContext(ctx || {});
  }

  queryPatterns(q) {
    return this.store.queryPatterns(q || {});
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

// ============================================================================
// EXPORTS
// ============================================================================
export {
  PulseGPUGeneticMemory,
  PulseGPUGeneticMemoryStore,
  buildGeneticKey
};
