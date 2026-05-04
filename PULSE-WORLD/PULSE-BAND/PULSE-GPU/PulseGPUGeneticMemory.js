// ============================================================================
// FILE: tropic-pulse-functions/PULSE-WORLD/PULSE-GPU/PulseGPUGeneticMemory.js
// PULSE GPU GENETIC MEMORY v16‑IMMORTAL — THE DNA ARCHIVE
// Long-Horizon Pattern Memory • Lineage Store • Deterministic Pattern Engine
// CoreMemory‑Integrated • ComputerIntelligence‑Aware • Earn‑v4‑Presence‑Ready
// ============================================================================
//
// IDENTITY — THE DNA ARCHIVE (v16‑IMMORTAL):
//  --------------------------------------------------------
//  • Long-term genetic memory of the GPU organism.
//  • Stores lineage, execution signatures, binary-mode outcomes, and patterns.
//  • Stores dispatch signatures, shape signatures, pressure correlations.
//  • Tracks advantage vectors + CI fields for Drive / Wisdom / Cognitive layers.
//  • No prediction — only pattern recognition over what actually happened.
//  • Designed for Advisor, Healer, Orchestrator, Insights, UI, Engine, Earn.
//  • Advantage-cascade aware: systemic gains improve pattern density.
//  • PulseSend-v16-ready • Earn-v4-Presence-ready • Dual-band + CI aware.
//
// SAFETY CONTRACT (v16‑IMMORTAL):
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

/*
AI_EXPERIENCE_META = {
  identity: "PulseGPUGeneticMemory",
  version: "v16-Immortal",
  layer: "gpu_brain",
  role: "gpu_genetic_memory",
  lineage: "PulseGPU-v16-Immortal",

  evo: {
    gpuCompute: true,
    gpuGeneticMemory: true,
    gpuTemplateStore: true,

    deterministic: true,
    driftProof: true,
    pureCompute: true,

    zeroNetwork: true,
    zeroFilesystem: true,
    zeroMutationOfInput: true,

    // Awareness
    binaryAware: true,
    symbolicAware: true,
    dualBandAware: true,
    gpuDispatchAware: true,
    gpuMemoryAware: true,
    gpuAdvantageAware: true,
    presenceAware: true,
    dnaAware: true,
    versionAware: true,
    instanceAware: true,

    // CI + Earn
    computerIntelligenceAware: true,
    earnAware: true,
    earnCompatibility: "Earn-v4-Presence",

    // Contracts
    coreMemoryAware: true,
    coreMemoryContract: "PulseCoreMemory-v16-Immortal",
    routingContract: "PulseSend-v16",
    gpuOrganContract: "PulseGPU-v16-Immortal",
    binaryGpuOrganContract: "PulseBinaryGPU-v16-Immortal"
  },

  contract: {
    always: [
      "PulseGPUBrain",
      "PulseGPUCognitiveLayer",
      "PulseGPUDriveCenter"
    ],
    never: [
      "safeRoute",
      "fetchViaCNS",
      "legacyGeneticMemory"
    ]
  }
}
*/

import { PulseCoreMemory } from "../PULSE-CORE/PulseCoreMemory.js";

// ============================================================================
// CONTEXT METADATA — Genetic Memory Identity (v16-Immortal)
// ============================================================================
const GENETIC_MEMORY_CONTEXT = {
  layer: "PulseGPUGeneticMemory",
  role: "DNA_ARCHIVE",
  purpose:
    "Long-horizon genetic memory for configs, execution signatures, patterns, lineage, correlations, and CI fields",
  context:
    "Stores lineage, binary-mode outcomes, dispatch signatures, shape signatures, pattern stats, and advantage vectors",
  target: "full-gpu+binary+symbolic",
  version: "16-Immortal",
  selfRepairable: true,

  evo: {
    advantageCascadeAware: true,
    pulseEfficiencyAware: true,
    driftProof: true,
    multiInstanceReady: true,
    unifiedAdvantageField: true,
    pulseSend16Ready: true,

    dualModeEvolution: true,
    binaryAware: true,
    symbolicAware: true,
    dualBandAware: true,
    gpuDispatchAware: true,
    gpuMemoryAware: true,
    gpuAdvantageAware: true,

    // v16 IMMORTAL contracts
    coreMemoryAware: true,
    coreMemoryContract: "PulseCoreMemory-v16-Immortal",
    routingContract: "PulseSend-v16",
    gpuOrganContract: "PulseGPU-v16-Immortal",
    binaryGpuOrganContract: "PulseBinaryGPU-v16-Immortal",
    earnCompatibility: "Earn-v4-Presence",

    // Legacy compatibility
    legacyRoutingContract: "PulseSend-v10.4",
    legacyGPUOrganContract: "PulseGPU-v10.4",
    legacyEarnCompatibility: "Earn-v2"
  }
};

// ============================================================================
// Utility: stable JSON stringify for hashing
// ============================================================================
function stableStringify(value) {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return "[" + value.map(stableStringify).join(",") + "]";
  const keys = Object.keys(value).sort();
  return "{" + keys.map(k => JSON.stringify(k) + ":" + stableStringify(value[k])).join(",") + "}";
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
// Signature builders — v16 IMMORTAL
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

  return stableStringify({ gpuModel, driverVersion, vramMB, cpuModel, ramMB, deviceClass, platform });
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
    rayTracing = false
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
    rayTracing
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
// Pattern aggregation — v16 IMMORTAL
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
        advantageVector: { scoreDelta: 0, stabilityDelta: 0, earnPotential: 0 },

        // mode ratios
        binaryModeRatio: 0,
        symbolicModeRatio: 0,

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
  const sDuration = clamp(safeNumber(sample.totalDurationMs), 0, 60 * 60 * 1000);

  next.avgFPS = (next.avgFPS * count + sAvgFPS) / newCount;
  next.minFPS = (next.minFPS * count + sMinFPS) / newCount;

  const stutterRateSample = sDuration > 0 ? sStutters / sDuration : 0;
  next.stutterRate = (next.stutterRate * count + stutterRateSample) / newCount;

  next.crashRate = (next.crashRate * count + sCrash) / newCount;
  next.avgDurationMs = (next.avgDurationMs * count + sDuration) / newCount;

  if (sample.pressureSnapshot) {
    const p = sample.pressureSnapshot;
    next.pressureVector = {
      gpu: (next.pressureVector.gpu * count + safeNumber(p.gpuLoadPressure)) / newCount,
      thermal: (next.pressureVector.thermal * count + safeNumber(p.thermalPressure)) / newCount,
      memory: (next.pressureVector.memory * count + safeNumber(p.memoryPressure)) / newCount,
      mesh: (next.pressureVector.mesh * count + safeNumber(p.meshStormPressure)) / newCount,
      aura: (next.pressureVector.aura * count + safeNumber(p.auraTension)) / newCount
    };
  }

  if (sample.advantageSnapshot) {
    const a = sample.advantageSnapshot;
    next.advantageVector = {
      scoreDelta:
        (next.advantageVector.scoreDelta * count + safeNumber(a.scoreDelta)) / newCount,
      stabilityDelta:
        (next.advantageVector.stabilityDelta * count + safeNumber(a.stabilityDelta)) /
        newCount,
      earnPotential:
        (next.advantageVector.earnPotential * count + safeNumber(a.earnPotential)) /
        newCount
    };
  }

  if (sample.binaryStepCount || sample.symbolicStepCount) {
    const total = sample.binaryStepCount + sample.symbolicStepCount;
    if (total > 0) {
      next.binaryModeRatio =
        (next.binaryModeRatio * count + sample.binaryStepCount / total) / newCount;
      next.symbolicModeRatio =
        (next.symbolicModeRatio * count + sample.symbolicStepCount / total) / newCount;
    }
  }

  if (sample.computerIntelligence && typeof sample.computerIntelligence === "object") {
    const ci = sample.computerIntelligence;
    const prev = next.computerIntelligence || {
      performancePressure: 0,
      stabilitySignal: 0,
      confidence: 0
    };

    next.computerIntelligence = {
      performancePressure:
        (prev.performancePressure * count + safeNumber(ci.performancePressure)) / newCount,
      stabilitySignal:
        (prev.stabilitySignal * count + safeNumber(ci.stabilitySignal)) / newCount,
      confidence:
        (prev.confidence * count + clamp(safeNumber(ci.confidence), 0, 1)) / newCount
    };
  }

  next.sampleCount = newCount;
  return next;
}

// ============================================================================
// Genetic Memory Store — v16 IMMORTAL + CoreMemory Integration
// ============================================================================
class PulseGPUGeneticMemoryStore {
  constructor() {
    this.entries = new Map();
    this.meta = { ...GENETIC_MEMORY_CONTEXT };
    this.coreMemory = new PulseCoreMemory("PulseGPU.GeneticMemory.v16");
    this.namespace = "PulseGPU.GeneticMemory.v16";
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
    computerIntelligence
  }) {
    const key = buildGeneticKey({ gameProfile, hardwareProfile, tierProfile, executionContext });

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
      computerIntelligence: computerIntelligence || null
    };

    const updatedStats = aggregatePatternStats(existing?.patternStats, sample);

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

  getPatternForContext({ gameProfile, hardwareProfile, tierProfile, executionContext }) {
    const key = buildGeneticKey({ gameProfile, hardwareProfile, tierProfile, executionContext });

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
// Public API — Genetic Memory Surface (v16 IMMORTAL)
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
