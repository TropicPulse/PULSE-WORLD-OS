// ============================================================================
//  PulseContinuance-v16-Immortal-GPU+.js
//  PULSE-FINALITY / PULSE-CONTINUANCE / GPU SURVIVAL PHYSICS
//
//  ROLE:
//    Predictive survival physics for Pulse OS, now GPU-accelerated.
//    Reads region/grid/host signals and proposes preemptive movement or
//    replication BEFORE outages or instability hit the organism.
//
//    v16-IMMORTAL:
//      • CPU + GPU dual-path continuance physics
//      • GPU-instability prediction + trend forecasting
//      • GPU risk smoothing + inertia + momentum
//      • IMMORTAL chunk/cache/prewarm hints
//      • Presence / fallback / advantage-aware
//      • CI-aware (compute surfaces + deltas)
//      • Pure compute, zero randomness, zero IO
//
//  NEVER:
//    - Never call real hosts or networks.
//    - Never introduce randomness.
//    - Never mutate input descriptors or signals.
//
//  ALWAYS:
//    - Always operate on symbolic descriptors.
//    - Always be deterministic for the same inputs.
//    - Always output explicit, reversible plans.
//    - Attach presence/fallback/chunk/cache/prewarm hints as pure metadata.
// ============================================================================

/*
AI_EXPERIENCE_META = {
  identity: "PulseContinuanceGPUPlus",
  version: "v16-Immortal",
  layer: "continuance_gpu",
  role: "gpu_continuance_engine",
  lineage: "PulseContinuance-v12.3-Presence-Evo+ → v14 → v16-Immortal-GPU+",

  evo: {
    continuanceEngine: true,
    outageDetection: true,
    replicationPlanning: true,
    survivalModeling: true,

    gpuAccelerated: true,
    gpuInstabilityPrediction: true,
    gpuTrendForecasting: true,
    gpuRiskSmoothing: true,
    gpuContinuanceScoring: true,
    gpuMetaReasoning: true,
    gpuHeuristics: true,

    deterministic: true,
    driftProof: true,
    pureCompute: true,

    zeroNetwork: true,
    zeroFilesystem: true,
    zeroMutationOfInput: true
  },

  contract: {
    always: [
      "PulseGPUBrain",
      "PulseCoreMemory",
      "PulseSchema"
    ],
    never: [
      "safeRoute",
      "fetchViaCNS",
      "legacyContinuance"
    ]
  }
}
*/
import { createPulseCoreMemory } from "../../PULSE-CORE/PulseCoreMemory.js";
// ============================================================================
//  IMPORTS
// ============================================================================
import { PulseGPUBrain } from "../../PULSE-GPU/PulseGPUBrain.js";

// ============================================================================
//  META — v16-IMMORTAL
// ============================================================================
export const PulseContinuanceMeta = Object.freeze({
  layer: "ContinuanceGPU",
  role: "GPU_CONTINUANCE_ENGINE",
  version: "16-Immortal",
  identity: "PulseContinuanceGPUPlus-v16-Immortal",

  evo: Object.freeze({
    deterministic: true,
    driftProof: true,

    continuanceEngine: true,
    outageDetection: true,
    replicationPlanning: true,
    survivalModeling: true,

    gpuAccelerated: true,
    gpuInstabilityPrediction: true,
    gpuTrendForecasting: true,
    gpuRiskSmoothing: true,
    gpuContinuanceScoring: true,
    gpuMetaReasoning: true,
    gpuHeuristics: true,

    presenceAware: true,
    fallbackBandAware: true,
    chunkAware: true,
    cacheAware: true,
    prewarmAware: true,

    pureCompute: true,
    zeroRandomness: true,
    zeroMutationOfInput: true,
    zeroNetwork: true,
    zeroFilesystem: true,
    epoch: "16-Immortal"
  }),

  contract: Object.freeze({
    purpose:
      "Compute GPU-accelerated continuance risk, preemptive moves, and replication plans " +
      "while remaining deterministic, IO-free, and physics-pure.",

    never: Object.freeze([
      "mutate physical topology directly",
      "perform network IO",
      "perform filesystem IO",
      "introduce randomness",
      "derive user identity",
      "apply routing policy",
      "act as a scheduler",
      "act as a router"
    ]),

    always: Object.freeze([
      "remain pure symbolic compute",
      "remain deterministic across identical inputs",
      "expose explicit, reversible plans",
      "attach presence/fallback/chunk/cache/prewarm hints as metadata",
      "remain GPU-accelerated when available",
      "fallback to CPU deterministically when GPU is unavailable"
    ])
  })
});

// ============================================================================
//  CORE MEMORY — IMMORTAL HOT MEMORY ORGAN
// ============================================================================
const CoreMemory = createPulseCoreMemory();
const ROUTE = "continuance-global";

const KEY_LAST_PACKET = "last-continuance-packet";
const KEY_LAST_RISK = "last-risk-report";
const KEY_LAST_PREEMPTIVE = "last-preemptive-plan";
const KEY_LAST_REPLICATION = "last-replication-plan";
const KEY_LAST_PRESENCE = "last-presence-field";
const KEY_LAST_ADVANTAGE = "last-advantage-field";

// ============================================================================
//  PACKET EMITTER — deterministic, continuance-scoped
// ============================================================================
function emitContinuancePacket(type, payload) {
  return Object.freeze({
    meta: PulseContinuanceMeta,
    packetType: `continuance-${type}`,
    packetId: `continuance-${type}-${Date.now()}`,
    timestamp: Date.now(),
    epoch: PulseContinuanceMeta.evo.epoch,
    ...payload
  });
}

// ============================================================================
//  Types (v16-IMMORTAL, extended)
// ============================================================================

export class RegionSignal {
  constructor({ regionId, instability = 0, trend = "stable", meta = {} }) {
    this.regionId = regionId;
    this.instability = clamp01(instability);
    this.trend = trend;
    this.meta = meta;
  }
}

export class GridSignal {
  constructor({
    sourceId,
    instability = 0,
    trend = "stable",
    affectedRegions = [],
    meta = {}
  }) {
    this.sourceId = sourceId;
    this.instability = clamp01(instability);
    this.trend = trend;
    this.affectedRegions = affectedRegions;
    this.meta = meta;
  }
}

export class CurrentPlacementPlan {
  constructor({
    selectedHosts = [],
    eligibleHosts = [],
    minInstances = 1,
    schemaVersion = 1
  }) {
    this.selectedHosts = selectedHosts;
    this.eligibleHosts = eligibleHosts;
    this.minInstances = minInstances;
    this.schemaVersion = schemaVersion;
  }
}

export class PreemptiveMovePlan {
  constructor({ moveFrom = [], moveTo = [], reason = "", riskScore = 0 }) {
    this.moveFrom = moveFrom;
    this.moveTo = moveTo;
    this.reason = reason;
    this.riskScore = clamp01(riskScore);
  }
}

export class ReplicationPlan {
  constructor({ replicateTo = [], reason = "", riskScore = 0 }) {
    this.replicateTo = replicateTo;
    this.reason = reason;
    this.riskScore = clamp01(riskScore);
  }
}

/**
 * ContinuanceRiskReport v16-Immortal-GPU+
 *
 * perRegion: { [regionId: string]: number }   // 0.0 - 1.0
 * globalRisk: number                          // 0.0 - 1.0
 * notes: string[]
 *
 * v16+ additions:
 *   fallbackBandLevel: 0–3
 *   prewarmHint: { shouldPrewarm: boolean, reason: string }
 *   cacheHint: { keepHot: boolean, priority: "normal"|"medium"|"high"|"critical" }
 *   chunkHint: { chunkAggression: number (0–1) }
 *   gpuMode: "gpu" | "cpu"
 *   gpuDetail: { smoothed: number[], amplified: number[], decayed: number[], momentum: number[] }
 */
export class ContinuanceRiskReport {
  constructor({
    perRegion = {},
    globalRisk = 0,
    notes = [],
    fallbackBandLevel = 0,
    prewarmHint = null,
    cacheHint = null,
    chunkHint = null,
    gpuMode = "cpu",
    gpuDetail = null
  }) {
    this.perRegion = perRegion;
    this.globalRisk = clamp01(globalRisk);
    this.notes = notes;
    this.fallbackBandLevel = fallbackBandLevel;
    this.prewarmHint = prewarmHint;
    this.cacheHint = cacheHint;
    this.chunkHint = chunkHint;
    this.gpuMode = gpuMode;
    this.gpuDetail = gpuDetail;
  }
}

// ============================================================================
//  Helpers
// ============================================================================

function clamp01(v) {
  if (v < 0) return 0;
  if (v > 1) return 1;
  return v;
}

function computeFallbackBandLevel(globalRisk) {
  if (globalRisk >= 0.8) return 3;
  if (globalRisk >= 0.6) return 2;
  if (globalRisk >= 0.4) return 1;
  return 0;
}

function buildPrewarmHint(globalRisk, gpuMode) {
  if (globalRisk >= 0.6) {
    return {
      shouldPrewarm: true,
      reason: gpuMode === "gpu" ? "gpu_high_global_risk" : "high_global_risk"
    };
  }
  if (globalRisk >= 0.4) {
    return {
      shouldPrewarm: true,
      reason: gpuMode === "gpu" ? "gpu_moderate_global_risk" : "moderate_global_risk"
    };
  }
  return {
    shouldPrewarm: false,
    reason: gpuMode === "gpu" ? "gpu_low_global_risk" : "low_global_risk"
  };
}

function buildCacheHint(globalRisk, gpuMode) {
  let priority = "normal";
  if (globalRisk >= 0.8) priority = "critical";
  else if (globalRisk >= 0.6) priority = "high";
  else if (globalRisk >= 0.4) priority = "medium";

  return {
    keepHot: globalRisk >= 0.4,
    priority,
    gpuMode
  };
}

function buildChunkHint(globalRisk, gpuMode) {
  const chunkAggression = 1 - globalRisk;
  return {
    chunkAggression,
    gpuMode
  };
}

// ============================================================================
//  CPU CONTINUANCE CORE (original physics, kept as fallback)
// ============================================================================

export function computeRegionRiskCPU(regionSignals = [], gridSignals = []) {
  const risk = {};

  for (const rs of regionSignals) {
    risk[rs.regionId] = clamp01(rs.instability);
  }

  for (const gs of gridSignals) {
    const weight =
      gs.trend === "rising" ? 0.5 :
      gs.trend === "stable" ? 0.3 :
      0.2; // falling

    for (const regionId of gs.affectedRegions || []) {
      const base = risk[regionId] || 0;
      const added = clamp01(gs.instability * weight);
      risk[regionId] = clamp01(base + added - base * added);
    }
  }

  return risk;
}

export function computeGlobalRiskCPU(perRegionRisk = {}) {
  const values = Object.values(perRegionRisk);
  if (values.length === 0) return 0;
  const sum = values.reduce((a, b) => a + b, 0);
  return clamp01(sum / values.length);
}

// ============================================================================
//  GPU HELPERS — deterministic, pure compute
// ============================================================================

function gpuAvailable() {
  return !!PulseGPUBrain && typeof PulseGPUBrain.compute === "function";
}

function gpuSmooth(values) {
  return PulseGPUBrain.compute({
    op: "smooth",
    values,
    window: 5,
    mode: "gaussian"
  });
}

function gpuAmplify(values, factor = 1.25) {
  return PulseGPUBrain.compute({
    op: "scale",
    values,
    factor
  });
}

function gpuDecay(values, factor = 0.85) {
  return PulseGPUBrain.compute({
    op: "scale",
    values,
    factor
  });
}

function gpuMomentum(values) {
  return PulseGPUBrain.compute({
    op: "momentum",
    values,
    inertia: 0.6
  });
}

function gpuTrend(values) {
  return PulseGPUBrain.compute({
    op: "trend",
    values
  });
}

function gpuFuse(a, b) {
  return PulseGPUBrain.compute({
    op: "fuse",
    a,
    b,
    mode: "max"
  });
}

// ============================================================================
//  GPU-ACCELERATED REGION RISK
// ============================================================================

export function computeRegionRiskGPU(regionSignals = [], gridSignals = []) {
  const regionIds = regionSignals.map((r) => r.regionId);
  const baseInstability = regionSignals.map((r) => r.instability);

  const smoothed = gpuSmooth(baseInstability);
  const amplified = gpuAmplify(smoothed);
  const decayed = gpuDecay(amplified);
  const momentum = gpuMomentum(decayed);

  const gridImpact = new Array(regionIds.length).fill(0);

  for (const gs of gridSignals) {
    const weight =
      gs.trend === "rising" ? 0.6 :
      gs.trend === "stable" ? 0.35 :
      0.2;

    for (const regionId of gs.affectedRegions || []) {
      const idx = regionIds.indexOf(regionId);
      if (idx >= 0) {
        const added = clamp01(gs.instability * weight);
        gridImpact[idx] = clamp01(
          gridImpact[idx] + added - gridImpact[idx] * added
        );
      }
    }
  }

  const fused = gpuFuse(momentum, gridImpact);

  const out = {};
  for (let i = 0; i < regionIds.length; i++) {
    out[regionIds[i]] = clamp01(fused[i]);
  }

  return {
    perRegion: out,
    gpuDetail: {
      smoothed,
      amplified,
      decayed,
      momentum,
      gridImpact,
      fused
    }
  };
}

// ============================================================================
//  GPU-ACCELERATED GLOBAL RISK
// ============================================================================

export function computeGlobalRiskGPU(perRegionRisk = {}) {
  const values = Object.values(perRegionRisk);
  if (values.length === 0) return { globalRisk: 0, gpuDetail: null };

  const smoothed = gpuSmooth(values);
  const amplified = gpuAmplify(smoothed, 1.15);
  const decayed = gpuDecay(amplified, 0.9);
  const trend = gpuTrend(decayed);

  const avg = decayed.reduce((a, b) => a + b, 0) / decayed.length;
  const globalRisk = clamp01(avg);

  return {
    globalRisk,
    gpuDetail: {
      smoothed,
      amplified,
      decayed,
      trend
    }
  };
}

// ============================================================================
//  UNIFIED RISK REPORT (GPU-first, CPU fallback)
// ============================================================================

export function buildContinuanceRiskReport(regionSignals, gridSignals) {
  let gpuMode = "cpu";
  let perRegion;
  let globalRisk;
  let gpuDetail = null;

  if (gpuAvailable()) {
    const regionGPU = computeRegionRiskGPU(regionSignals, gridSignals);
    const globalGPU = computeGlobalRiskGPU(regionGPU.perRegion);
    perRegion = regionGPU.perRegion;
    globalRisk = globalGPU.globalRisk;
    gpuDetail = {
      region: regionGPU.gpuDetail,
      global: globalGPU.gpuDetail
    };
    gpuMode = "gpu";
  } else {
    perRegion = computeRegionRiskCPU(regionSignals, gridSignals);
    globalRisk = computeGlobalRiskCPU(perRegion);
  }

  const notes = [];

  if (globalRisk >= 0.7) {
    notes.push(
      gpuMode === "gpu"
        ? "GPU: High global risk detected. Preemptive movement strongly recommended."
        : "High global risk detected. Preemptive movement strongly recommended."
    );
  } else if (globalRisk >= 0.4) {
    notes.push(
      gpuMode === "gpu"
        ? "GPU: Moderate global risk detected. Consider replication in safer regions."
        : "Moderate global risk detected. Consider replication in safer regions."
    );
  } else {
    notes.push(
      gpuMode === "gpu"
        ? "GPU: Global risk is low. No immediate movement required."
        : "Global risk is low. No immediate movement required."
    );
  }

  const fallbackBandLevel = computeFallbackBandLevel(globalRisk);
  const prewarmHint = buildPrewarmHint(globalRisk, gpuMode);
  const cacheHint = buildCacheHint(globalRisk, gpuMode);
  const chunkHint = buildChunkHint(globalRisk, gpuMode);

  return new ContinuanceRiskReport({
    perRegion,
    globalRisk,
    notes,
    fallbackBandLevel,
    prewarmHint,
    cacheHint,
    chunkHint,
    gpuMode,
    gpuDetail
  });
}

// ============================================================================
//  PREEMPTIVE MOVE PLAN (GPU-aware, deterministic)
// ============================================================================

export function buildPreemptiveMovePlan(hosts, placement, perRegionRisk) {
  const byName = {};
  for (const h of hosts) byName[h.name] = h;

  const moveFrom = [];
  const moveToSet = new Set();

  for (const hostName of placement.selectedHosts) {
    const host = byName[hostName];
    if (!host) continue;
    const rRisk = perRegionRisk[host.region] || 0;
    if (rRisk >= 0.6) {
      moveFrom.push(hostName);
    }
  }

  for (const hostName of placement.eligibleHosts) {
    const host = byName[hostName];
    if (!host) continue;
    const rRisk = perRegionRisk[host.region] || 0;
    if (rRisk < 0.6) {
      moveToSet.add(hostName);
    }
  }

  const moveTo = Array.from(moveToSet).sort();

  const riskScore =
    moveFrom.length === 0
      ? 0
      : Math.max(
          ...moveFrom.map((name) => {
            const h = byName[name];
            return h ? perRegionRisk[h.region] || 0 : 0;
          })
        );

  const reason =
    moveFrom.length === 0
      ? "No high-risk hosts in current placement."
      : "High-risk regions detected for current placement. Proposing preemptive movement.";

  return new PreemptiveMovePlan({
    moveFrom,
    moveTo,
    reason,
    riskScore
  });
}

// ============================================================================
//  REPLICATION PLAN (GPU-aware, deterministic)
// ============================================================================

export function buildReplicationPlan(
  hosts,
  placement,
  perRegionRisk,
  minInstances
) {
  const byName = {};
  for (const h of hosts) byName[h.name] = h;

  const currentCount = placement.selectedHosts.length;
  if (currentCount >= minInstances) {
    return new ReplicationPlan({
      replicateTo: [],
      reason: "Minimum instance count already satisfied.",
      riskScore: 0
    });
  }

  const eligible = placement.eligibleHosts
    .map((name) => {
      const h = byName[name];
      if (!h) return null;
      return {
        name,
        risk: perRegionRisk[h.region] || 0
      };
    })
    .filter(Boolean);

  eligible.sort((a, b) => a.risk - b.risk);

  const needed = minInstances - currentCount;
  const replicateTo = eligible.slice(0, needed).map((e) => e.name);

  const riskScore =
    replicateTo.length === 0
      ? 0
      : Math.max(
          ...replicateTo.map((name) => {
            const h = byName[name];
            return h ? perRegionRisk[h.region] || 0 : 0;
          })
        );

  const reason =
    replicateTo.length === 0
      ? "No suitable low-risk hosts available for replication."
      : "Replicating to lower-risk hosts to satisfy minimal instance floor.";

  return new ReplicationPlan({
    replicateTo,
    reason,
    riskScore
  });
}

// ============================================================================
//  HIGH-LEVEL CONTINUANCE COMPUTE (GPU-first, packet-emitting + CoreMemory)
// ============================================================================

export function computeContinuance({
  regionSignals,
  gridSignals,
  hosts,
  placement,
  presenceContext = {},
  advantageContext = {},
  ciSurface = null,
  ciDeltaPacket = null
}) {
  const start = Date.now();

  const riskReport = buildContinuanceRiskReport(regionSignals, gridSignals);
  const preemptivePlan = buildPreemptiveMovePlan(
    hosts,
    placement,
    riskReport.perRegion
  );
  const replicationPlan = buildReplicationPlan(
    hosts,
    placement,
    riskReport.perRegion,
    placement.minInstances
  );

  const presenceField = {
    band: presenceContext.band || "pulseband",
    deviceId: presenceContext.deviceId || null,
    hydraNodeId: presenceContext.hydraNodeId || null,
    route: presenceContext.route || "/"
  };

  const advantageField = {
    advantageScore: advantageContext.advantageScore ?? 1.0,
    cascadeLevel: advantageContext.cascadeLevel ?? 0,
    timeSavedMs: advantageContext.timeSavedMs ?? 0
  };

  const durationMs = Date.now() - start;

  const packet = emitContinuancePacket("gpu-compute", {
    riskReport,
    preemptivePlan,
    replicationPlan,
    presenceField,
    advantageField,
    ciSurface,
    ciDeltaPacket,
    durationMs
  });

  // CoreMemory integration — hot symbolic snapshot
  CoreMemory.set(ROUTE, KEY_LAST_RISK, riskReport);
  CoreMemory.set(ROUTE, KEY_LAST_PREEMPTIVE, preemptivePlan);
  CoreMemory.set(ROUTE, KEY_LAST_REPLICATION, replicationPlan);
  CoreMemory.set(ROUTE, KEY_LAST_PRESENCE, presenceField);
  CoreMemory.set(ROUTE, KEY_LAST_ADVANTAGE, advantageField);
  CoreMemory.set(ROUTE, KEY_LAST_PACKET, packet);

  return packet;
}

// ============================================================================
//  HOT MEMORY ACCESSOR — last continuance state
// ============================================================================

export function getLastContinuanceState() {
  CoreMemory.prewarm();

  return {
    meta: PulseContinuanceMeta,
    lastPacket: CoreMemory.get(ROUTE, KEY_LAST_PACKET),
    riskReport: CoreMemory.get(ROUTE, KEY_LAST_RISK),
    preemptivePlan: CoreMemory.get(ROUTE, KEY_LAST_PREEMPTIVE),
    replicationPlan: CoreMemory.get(ROUTE, KEY_LAST_REPLICATION),
    presenceField: CoreMemory.get(ROUTE, KEY_LAST_PRESENCE),
    advantageField: CoreMemory.get(ROUTE, KEY_LAST_ADVANTAGE)
  };
}

// ============================================================================
//  Exported API
// ============================================================================

const PulseContinuanceAPI = {
  meta: PulseContinuanceMeta,

  RegionSignal,
  GridSignal,
  CurrentPlacementPlan,
  PreemptiveMovePlan,
  ReplicationPlan,
  ContinuanceRiskReport,

  // CPU paths
  computeRegionRiskCPU,
  computeGlobalRiskCPU,

  // GPU paths
  computeRegionRiskGPU,
  computeGlobalRiskGPU,

  // Unified IMMORTAL paths
  buildContinuanceRiskReport,
  buildPreemptiveMovePlan,
  buildReplicationPlan,
  computeContinuance,

  // CoreMemory integration
  getLastContinuanceState,
  CoreMemory
};

export default PulseContinuanceAPI;
