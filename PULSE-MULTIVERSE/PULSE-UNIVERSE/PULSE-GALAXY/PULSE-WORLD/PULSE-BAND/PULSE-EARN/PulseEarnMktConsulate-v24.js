// ============================================================================
// FILE: PULSE-WORLD-OS/PULSE-MULTIVERSE/PULSEWORLD/PULSE-EARN/PulseEarnMktConsulate-v24-IMMORTAL-INTEL.js
// LAYER: THE CONSULATE (v24 IMMORTAL + INTEL + DualHash + Presence + Advantage + Chunk + Artery)
// ============================================================================

import {
  OrganismIdentity,
  buildPulseOrganismMap as buildOrganismMap
} from "../X-PULSE-X/PULSE-WORLD-MAPORGANISM.jssss
";

const Identity = OrganismIdentity(import.meta.url);

// ---------------------------------------------------------------------------
//  ORGANISM META (v24 IMMORTAL)
// ---------------------------------------------------------------------------

export const PulseEarnMktConsulateMeta = Identity.OrganMeta;



import { PulseEarnMktEmbassyLedger } from "./PulseEarnMktEmbassyLedger-v24.js";

// ============================================================================
// HASH HELPERS — v24 IMMORTAL INTEL (dual‑hash)
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

function normalizeBand(b) {
  const x = String(b || "symbolic").toLowerCase();
  return x === "binary" ? "binary" : "symbolic";
}

function clamp01(v) {
  return Math.max(0, Math.min(1, v));
}

// ============================================================================
// CONSULATE STATE — v24 IMMORTAL INTEL
// ============================================================================

const consulateState = {
  resultCache: new Map(),
  fingerprintIndex: new Map(),
  factorIndex: new Map(),
  marketplaceStats: new Map(),

  stats: {
    totalJobsSeen: 0,
    totalUniqueJobs: 0,
    totalEliminatedJobs: 0,
    totalReusedResults: 0,
    totalFactoredJobs: 0,
    lastCycleJobsIn: 0,
    lastCycleJobsOut: 0
  },

  cycleIndex: 0,

  lastCycleSignatureIntel: null,
  lastCycleSignatureClassic: null,

  lastFingerprintSignatureIntel: null,
  lastFingerprintSignatureClassic: null,

  lastFactorSignatureIntel: null,
  lastFactorSignatureClassic: null,

  lastPrioritySignatureIntel: null,
  lastPrioritySignatureClassic: null,

  lastMarketplaceStatsSignatureIntel: null,
  lastMarketplaceStatsSignatureClassic: null,

  lastResultCacheSignatureIntel: null,
  lastResultCacheSignatureClassic: null,

  lastPresenceField: null,
  lastAdvantageField: null,
  lastChunkPrewarmPlan: null,

  // Artery / band context (v24 dualband-ish)
  lastBand: "symbolic",
  lastWorldBand: "world",
  lastArterySignatureIntel: null,
  lastArterySignatureClassic: null
};

// ============================================================================
// STABLE STRINGIFY
// ============================================================================

function stableStringify(obj) {
  if (obj === null || typeof obj !== "object") return JSON.stringify(obj);
  if (Array.isArray(obj)) return `[${obj.map(stableStringify).join(",")}]`;
  const keys = Object.keys(obj).sort();
  return `{${keys.map(k => `"${k}":${stableStringify(obj[k])}`).join(",")}}`;
}

// ============================================================================
// PRESENCE FIELD — v24 IMMORTAL INTEL
// ============================================================================

function classifyPresenceTier(pressure) {
  if (pressure >= 150) return "critical";
  if (pressure >= 100) return "high";
  if (pressure >= 50) return "elevated";
  if (pressure > 0) return "soft";
  return "idle";
}

function buildPresenceField(consulateState, globalHints = {}) {
  const jobsIn = consulateState.stats.lastCycleJobsIn || 0;
  const jobsOut = consulateState.stats.lastCycleJobsOut || 0;
  const unique = consulateState.stats.totalUniqueJobs || 0;

  const internalComposite =
    jobsIn * 0.0005 +
    jobsOut * 0.0007 +
    unique * 0.0001;

  const ghP = globalHints.presenceContext || {};
  const mesh = globalHints.meshSignals || {};
  const castle = globalHints.castleSignals || {};
  const region = globalHints.regionContext || {};

  const meshStrength = Number(mesh.meshStrength || 0);
  const meshPressureExternal = Number(mesh.meshPressureIndex || 0);
  const castleLoadExternal = Number(castle.loadLevel || 0);

  const internalPressure = Math.floor(internalComposite * 1000);
  const meshPressureIndex = meshPressureExternal + internalPressure;
  const castleLoadLevel = castleLoadExternal;

  const pressure = meshPressureIndex + castleLoadLevel;
  const presenceTier = classifyPresenceTier(pressure);

  const intelPayload = {
    kind: "consulatePresence",
    version: "v24-IMMORTAL-INTEL",
    presenceTier,
    meshPressureIndex,
    castleLoadLevel,
    jobsIn,
    jobsOut,
    unique,
    cycleIndex: consulateState.cycleIndex
  };

  const classicString =
    `CONSULATE_PRESENCE::${presenceTier}::${meshPressureIndex}::${castleLoadLevel}`;

  const sig = buildDualHashSignature("CONSULATE_PRESENCE", intelPayload, classicString);

  return {
    presenceVersion: "v24-IMMORTAL-INTEL",
    presenceTier,
    meshPressureIndex,
    castleLoadLevel,
    meshStrength,
    jobsIn,
    jobsOut,
    unique,
    cycleIndex: consulateState.cycleIndex,
    presenceSignatureIntel: sig.intel,
    presenceSignatureClassic: sig.classic,

    // v24 presence bands
    bandPresence: ghP.bandPresence || "symbolic",
    routerPresence: ghP.routerPresence || "consulate",
    devicePresence: ghP.devicePresence || "earn-router",
    regionId: region.regionId || "consulate-region",
    regionTag: region.regionTag || "consulate-region",
    castleId: castle.castleId || "consulate-castle"
  };
}

// ============================================================================
// ADVANTAGE FIELD — v24 IMMORTAL INTEL (C‑24.0)
// ============================================================================

function buildAdvantageField(consulateState, presenceField, globalHints = {}) {
  const fpCount = consulateState.fingerprintIndex.size;
  const factorCount = consulateState.factorIndex.size;
  const cacheSize = consulateState.resultCache.size;

  const baseScore =
    fpCount * 0.00005 +
    factorCount * 0.00003 +
    cacheSize * 0.00002;

  const presenceBoost =
    presenceField.presenceTier === "critical" ? 0.02 :
    presenceField.presenceTier === "high" ? 0.015 :
    presenceField.presenceTier === "elevated" ? 0.01 :
    presenceField.presenceTier === "soft" ? 0.005 :
    0;

  const advantageScore = baseScore + presenceBoost;

  let advantageTier = 0;
  if (advantageScore >= 0.05) advantageTier = 3;
  else if (advantageScore >= 0.02) advantageTier = 2;
  else if (advantageScore > 0) advantageTier = 1;

  const fallbackBandLevel = globalHints.fallbackBandLevel ?? 0;

  const intelPayload = {
    kind: "consulateAdvantage",
    version: "C-24.0",
    fpCount,
    factorCount,
    cacheSize,
    presenceTier: presenceField.presenceTier,
    advantageScore,
    advantageTier,
    fallbackBandLevel
  };

  const classicString =
    `CONSULATE_ADVANTAGE::${presenceField.presenceTier}::${advantageTier}`;

  const sig = buildDualHashSignature("CONSULATE_ADVANTAGE", intelPayload, classicString);

  return {
    advantageVersion: "C-24.0",
    fpCount,
    factorCount,
    cacheSize,
    presenceTier: presenceField.presenceTier,
    advantageScore,
    advantageTier,
    fallbackBandLevel,
    advantageSignatureIntel: sig.intel,
    advantageSignatureClassic: sig.classic
  };
}

// ============================================================================
// CHUNK / PREWARM PLAN — v24 IMMORTAL INTEL
// ============================================================================

function buildChunkPrewarmPlan(consulateState, presenceField, advantageField) {
  const basePriority =
    presenceField.presenceTier === "critical"
      ? 4
      : presenceField.presenceTier === "high"
      ? 3
      : presenceField.presenceTier === "elevated"
      ? 2
      : presenceField.presenceTier === "soft"
      ? 1
      : 0;

  const advantageBoost =
    advantageField.advantageTier >= 3 ? 2 :
    advantageField.advantageTier === 2 ? 1 :
    0;

  const priority = basePriority + advantageBoost;

  const intelPayload = {
    kind: "consulateChunkPlan",
    version: "v24-IMMORTAL-INTEL",
    priority,
    presenceTier: presenceField.presenceTier,
    advantageTier: advantageField.advantageTier
  };

  const classicString =
    `CONSULATE_CHUNK_PLAN::${presenceField.presenceTier}::${priority}`;

  const sig = buildDualHashSignature("CONSULATE_CHUNK_PLAN", intelPayload, classicString);

  return {
    planVersion: "v24-IMMORTAL-INTEL",
    priority,
    band: presenceField.presenceTier,
    chunks: {
      consulateEnvelope: true,
      fingerprintIndex: true,
      factorIndex: true,
      resultCache: true
    },
    cache: {
      consulateDiagnostics: true,
      marketplaceStats: true
    },
    prewarm: {
      nervousSystem: true,
      muscleSystem: true,
      foragerLayer: true,
      courierLayer: true,
      brokerLayer: true,
      ambassadorLayer: true,
      auctioneerLayer: true
    },
    chunkPlanSignatureIntel: sig.intel,
    chunkPlanSignatureClassic: sig.classic
  };
}

// ============================================================================
// FINGERPRINTING — v24 dual hash
// ============================================================================

function fingerprintJob(job) {
  const core = {
    marketplaceId: job.marketplaceId || job._sourceMarketplaceId || null,
    cpuRequired: job.cpuRequired ?? null,
    memoryRequired: job.memoryRequired ?? null,
    estimatedSeconds: job.estimatedSeconds ?? null,
    minGpuScore: job.minGpuScore ?? null,
    bandwidthNeededMbps: job.bandwidthNeededMbps ?? null
  };

  const fp = stableStringify(core);

  const sig = buildDualHashSignature("CONSULATE_FP", { core }, fp);
  consulateState.lastFingerprintSignatureIntel = sig.intel;
  consulateState.lastFingerprintSignatureClassic = sig.classic;

  return fp;
}

// ============================================================================
// FACTOR EXTRACTION — v24 dual hash (GPU‑aware)
// ============================================================================

function extractFactors(job) {
  const f = [];

  const cpu = job.cpuRequired != null ? `cpu:${job.cpuRequired}` : null;
  const mem = job.memoryRequired != null ? `mem:${job.memoryRequired}` : null;
  const sec = job.estimatedSeconds != null ? `sec:${job.estimatedSeconds}` : null;
  const gpu = job.minGpuScore != null ? `gpu:${job.minGpuScore}` : null;
  const bw = job.bandwidthNeededMbps != null ? `bw:${job.bandwidthNeededMbps}` : null;
  const mkt = job.marketplaceId ? `mkt:${job.marketplaceId}` : null;

  [cpu, mem, sec, gpu, bw, mkt].forEach(x => x && f.push(x));

  if (f.length) {
    const sig = buildDualHashSignature("CONSULATE_FACTORS", { f }, f.join("|"));
    consulateState.lastFactorSignatureIntel = sig.intel;
    consulateState.lastFactorSignatureClassic = sig.classic;
  }

  return f;
}

function indexFactors(fp, factors) {
  for (const f of factors) {
    if (!consulateState.factorIndex.has(f)) {
      consulateState.factorIndex.set(f, new Set());
    }
    consulateState.factorIndex.get(f).add(fp);
  }
}

// ============================================================================
// MONEY SLOPE (GPU‑sensitive via job fields)
// ============================================================================

function computeMoneySlope(job) {
  const payout = Number(job.payout ?? 0);
  const sec = Number(job.estimatedSeconds ?? 0);
  if (payout <= 0 || sec <= 0) return 0;
  return payout / sec;
}

// ============================================================================
// MARKETPLACE PROFILE (GPU‑weighted)
// ============================================================================

function getMarketplaceProfile(id) {
  switch (id) {
    case "runpod": return { base: 1.1, gpu: 1.25, short: 1.1, bw: 1.0 };
    case "spheron": return { base: 1.0, gpu: 0.95, short: 1.3, bw: 1.0 };
    case "salad": return { base: 1.05, gpu: 1.1, short: 1.0, bw: 1.0 };
    case "akash": return { base: 0.95, gpu: 1.05, short: 1.0, bw: 1.0 };
    case "vast": return { base: 1.15, gpu: 1.3, short: 1.1, bw: 1.0 };
    default: return { base: 1.0, gpu: 1.0, short: 1.0, bw: 1.0 };
  }
}

// ============================================================================
// A‑B‑A Influence (band + binary + wave)
// ============================================================================

function computeAbaModifiers(job) {
  const band = job._abaBand || null;
  const density = Number(job._abaBinaryDensity ?? 0);
  const amp = Number(job._abaWaveAmplitude ?? 0);

  const bandFactor = band === "binary" ? 1.02 : 1.0;
  const binaryFactor = 1.0 + Math.min(density / 1000, 0.03);
  const waveFactor = 1.0 + Math.min(amp / 1000, 0.02);

  return { bandFactor, binaryFactor, waveFactor };
}

// ============================================================================
// PRIORITY SCORE — v24 dual hash (GPU‑aware)
// ============================================================================

function computePriorityScore(job) {
  const slope = computeMoneySlope(job);
  if (slope <= 0) return 0;

  const profile = getMarketplaceProfile(job.marketplaceId);
  const { bandFactor, binaryFactor, waveFactor } = computeAbaModifiers(job);

  // GPU‑weighted: heavier emphasis on minGpuScore for GPU‑rich jobs
  const gpuScore = Number(job.minGpuScore ?? 0);
  const gpuBoost = 1.0 + Math.min(gpuScore / 1000, profile.gpu - 1.0);

  const score =
    slope *
    profile.base *
    bandFactor *
    binaryFactor *
    waveFactor *
    gpuBoost;

  const sig = buildDualHashSignature(
    "CONSULATE_PRIORITY",
    { jobId: job.id, score },
    `${job.id}::${score}`
  );
  consulateState.lastPrioritySignatureIntel = sig.intel;
  consulateState.lastPrioritySignatureClassic = sig.classic;

  return score;
}

// ============================================================================
// MARKETPLACE STATS — v24 dual hash
// ============================================================================

function updateMarketplaceStats(jobs) {
  const grouped = new Map();

  for (const job of jobs) {
    const id = job.marketplaceId || "unknown";
    if (!grouped.has(id)) grouped.set(id, []);
    grouped.get(id).push(job);
  }

  const snapshot = {};

  for (const [id, list] of grouped.entries()) {
    const slopes = list.map(computeMoneySlope).filter(x => x > 0);
    const avg = slopes.length ? slopes.reduce((a, b) => a + b, 0) / slopes.length : 0;

    const prev = consulateState.marketplaceStats.get(id) || {
      jobsSeen: 0,
      avgSlope: 0,
      lastCycleJobs: 0
    };

    const jobsSeen = prev.jobsSeen + list.length;
    const blended =
      jobsSeen > 0
        ? (prev.avgSlope * prev.jobsSeen + avg * list.length) / jobsSeen
        : avg;

    const entry = {
      jobsSeen,
      avgSlope: blended,
      lastCycleJobs: list.length
    };

    consulateState.marketplaceStats.set(id, entry);
    snapshot[id] = entry;
  }

  const sig = buildDualHashSignature(
    "CONSULATE_MKT_STATS",
    { snapshot },
    JSON.stringify(snapshot)
  );
  consulateState.lastMarketplaceStatsSignatureIntel = sig.intel;
  consulateState.lastMarketplaceStatsSignatureClassic = sig.classic;
}

// ============================================================================
// FETCH JOBS FROM ALL MARKETPLACES
// ============================================================================

function fetchJobsFromAllMarketplaces(deviceId, globalHints = {}) {
  const { marketplaces } = PulseEarnMktEmbassyLedger;
  const all = [];

  for (const adapter of marketplaces) {
    try {
      const raw = adapter.fetchJobs
        ? adapter.fetchJobs(globalHints)
        : [];

      let jobs;
      if (Array.isArray(raw)) jobs = raw;
      else if (raw && Array.isArray(raw.jobs)) jobs = raw.jobs;
      else jobs = [];

      for (const j of jobs) {
        all.push({
          ...j,
          _sourceMarketplaceId: adapter.id
        });
      }
    } catch (_) {}
  }

  return all;
}

// ============================================================================
// INTELLIGENCE PASS
// ============================================================================

function processJobsIntelligently(jobs) {
  const unique = [];
  const { stats, resultCache, fingerprintIndex } = consulateState;

  stats.lastCycleJobsIn = jobs.length;
  stats.totalJobsSeen += jobs.length;

  for (const job of jobs) {
    const fp = fingerprintJob(job);

    if (fingerprintIndex.has(fp)) {
      stats.totalEliminatedJobs++;

      const cached = resultCache.get(fp);
      if (cached) {
        stats.totalReusedResults++;
        unique.push({
          ...job,
          _router: {
            fingerprint: fp,
            hasCachedResult: true,
            cachedResultMeta: {
              cycleIndex: cached.cycleIndex,
              marketplaceId: cached.marketplaceId
            }
          }
        });
      }
      continue;
    }

    fingerprintIndex.set(fp, {
      fingerprint: fp,
      firstSeenCycle: consulateState.cycleIndex
    });
    stats.totalUniqueJobs++;

    const factors = extractFactors(job);
    if (factors.length) {
      indexFactors(fp, factors);
      stats.totalFactoredJobs++;
    }

    unique.push({
      ...job,
      _router: {
        fingerprint: fp,
        hasCachedResult: false
      }
    });
  }

  stats.lastCycleJobsOut = unique.length;
  updateMarketplaceStats(unique);

  return unique;
}

// ============================================================================
// PRIORITY SORTING
// ============================================================================

function sortJobsByPriority(jobs) {
  const scored = jobs.map(j => ({ job: j, score: computePriorityScore(j) }));
  scored.sort((a, b) => b.score - a.score);
  return scored.map(s => s.job);
}

// ============================================================================
// ARTERY SNAPSHOT (v24) — world‑band consulate artery
// ============================================================================

export function getConsulateArterySnapshotV5(globalHints = {}) {
  const presenceField = consulateState.lastPresenceField ||
    buildPresenceField(consulateState, globalHints);
  const advantageField = consulateState.lastAdvantageField ||
    buildAdvantageField(consulateState, presenceField, globalHints);
  const chunkPlan = consulateState.lastChunkPrewarmPlan ||
    buildChunkPrewarmPlan(consulateState, presenceField, advantageField);

  const band = normalizeBand("symbolic");
  const worldBand = "world";

  const intelPayload = {
    kind: "consulateArtery",
    cycleIndex: consulateState.cycleIndex,
    band,
    worldBand,
    presenceTier: presenceField.presenceTier,
    advantageTier: advantageField.advantageTier,
    stats: { ...consulateState.stats }
  };

  const classicString =
    `CONSULATE_ARTERY::${consulateState.cycleIndex}::${presenceField.presenceTier}`;

  const sig = buildDualHashSignature("CONSULATE_ARTERY", intelPayload, classicString);

  consulateState.lastBand = band;
  consulateState.lastWorldBand = worldBand;
  consulateState.lastArterySignatureIntel = sig.intel;
  consulateState.lastArterySignatureClassic = sig.classic;

  return Object.freeze({
    organism: {
      pressure: presenceField.meshPressureIndex + presenceField.castleLoadLevel,
      presenceTier: presenceField.presenceTier
    },
    stats: { ...consulateState.stats },
    bands: {
      band,
      worldBand
    },
    presence: presenceField,
    advantage: advantageField,
    chunkPlan,
    meta: {
      version: PulseEarnMktConsulateMeta.version,
      epoch: PulseEarnMktConsulateMeta.evo.epoch,
      identity: PulseEarnMktConsulateMeta.identity,
      arterySignatureIntel: sig.intel,
      arterySignatureClassic: sig.classic
    }
  });
}

// ============================================================================
// PUBLIC: getRoutedJobs
// ============================================================================

function getRoutedJobs(deviceId, globalHints = {}) {
  consulateState.cycleIndex++;

  const raw = fetchJobsFromAllMarketplaces(deviceId, globalHints);
  const unique = processJobsIntelligently(raw);
  const sorted = sortJobsByPriority(unique);

  const cycleSig = buildDualHashSignature(
    "CONSULATE_CYCLE",
    { cycleIndex: consulateState.cycleIndex },
    `CYCLE::${consulateState.cycleIndex}`
  );
  consulateState.lastCycleSignatureIntel = cycleSig.intel;
  consulateState.lastCycleSignatureClassic = cycleSig.classic;

  const cacheSig = buildDualHashSignature(
    "CONSULATE_RESULT_CACHE",
    { size: consulateState.resultCache.size },
    `RESULT_CACHE::${consulateState.resultCache.size}`
  );
  consulateState.lastResultCacheSignatureIntel = cacheSig.intel;
  consulateState.lastResultCacheSignatureClassic = cacheSig.classic;

  const presenceField = buildPresenceField(consulateState, globalHints);
  const advantageField = buildAdvantageField(consulateState, presenceField, globalHints);
  const chunkPlan = buildChunkPrewarmPlan(consulateState, presenceField, advantageField);

  consulateState.lastPresenceField = presenceField;
  consulateState.lastAdvantageField = advantageField;
  consulateState.lastChunkPrewarmPlan = chunkPlan;

  return sorted;
}

// ============================================================================
// PUBLIC: recordJobResult
// ============================================================================

function recordJobResult(job, result) {
  if (!job) return;

  const fp = job._router?.fingerprint || fingerprintJob(job);
  if (!fp) return;

  consulateState.resultCache.set(fp, {
    result,
    cycleIndex: consulateState.cycleIndex,
    marketplaceId: job.marketplaceId || job._sourceMarketplaceId
  });

  const cacheSig = buildDualHashSignature(
    "CONSULATE_RESULT_CACHE",
    { size: consulateState.resultCache.size },
    `RESULT_CACHE::${consulateState.resultCache.size}`
  );
  consulateState.lastResultCacheSignatureIntel = cacheSig.intel;
  consulateState.lastResultCacheSignatureClassic = cacheSig.classic;
}

// ============================================================================
// PUBLIC: getHealingState
// ============================================================================

function getPulseEarnMktConsulateHealingState() {
  const marketplaceStats = {};
  for (const [id, v] of consulateState.marketplaceStats.entries()) {
    marketplaceStats[id] = { ...v };
  }

  return {
    stats: { ...consulateState.stats },
    resultCacheSize: consulateState.resultCache.size,
    fingerprintCount: consulateState.fingerprintIndex.size,
    factorKeyCount: consulateState.factorIndex.size,
    marketplaceStats,
    cycleIndex: consulateState.cycleIndex,

    lastCycleSignatureIntel: consulateState.lastCycleSignatureIntel,
    lastCycleSignatureClassic: consulateState.lastCycleSignatureClassic,
    lastFingerprintSignatureIntel: consulateState.lastFingerprintSignatureIntel,
    lastFingerprintSignatureClassic: consulateState.lastFingerprintSignatureClassic,
    lastFactorSignatureIntel: consulateState.lastFactorSignatureIntel,
    lastFactorSignatureClassic: consulateState.lastFactorSignatureClassic,
    lastPrioritySignatureIntel: consulateState.lastPrioritySignatureIntel,
    lastPrioritySignatureClassic: consulateState.lastPrioritySignatureClassic,
    lastMarketplaceStatsSignatureIntel: consulateState.lastMarketplaceStatsSignatureIntel,
    lastMarketplaceStatsSignatureClassic: consulateState.lastMarketplaceStatsSignatureClassic,
    lastResultCacheSignatureIntel: consulateState.lastResultCacheSignatureIntel,
    lastResultCacheSignatureClassic: consulateState.lastResultCacheSignatureClassic,

    lastPresenceField: consulateState.lastPresenceField,
    lastAdvantageField: consulateState.lastAdvantageField,
    lastChunkPrewarmPlan: consulateState.lastChunkPrewarmPlan,

    lastBand: consulateState.lastBand,
    lastWorldBand: consulateState.lastWorldBand,
    lastArterySignatureIntel: consulateState.lastArterySignatureIntel,
    lastArterySignatureClassic: consulateState.lastArterySignatureClassic
  };
}

// ============================================================================
// EXPORTED API (v24 IMMORTAL INTEL)
// ============================================================================

export const PulseEarnMktConsulate = {
  meta: PulseEarnMktConsulateMeta,
  getRoutedJobs,
  recordJobResult,
  getHealingState: getPulseEarnMktConsulateHealingState,
  getConsulateArterySnapshotV5
};
