// ============================================================================
// FILE: PULSE-WORLD-OS/PULSE-MULTIVERSE/PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PULSE-BAND/PULSE-EARN/PulseEarnLymphNodes-v30-Immortal-INTEL-PLUSPLUS.js
// LAYER: THE LYMPHATIC HANDSHAKE NODES (v30-Immortal-INTEL-PLUSPLUS)
// (Finalizer of Jobs + Immune-Safe Dispatch + Certified Marketplace Exchange + INTEL Plan)
// ============================================================================
//
// ROLE (v30-Immortal-INTEL-PLUSPLUS):
//   THE LYMPHATIC HANDSHAKE NODES — Pulse‑Earn’s immune‑safe finalizers, upgraded to 30++ INTEL.
//   • Validate job + marketplace identity (immune recognition).
//   • Locate the correct marketplace receptor (antigen matching).
//   • Ensure submitResult() exists (immune compatibility).
//   • Perform deterministic Earn → Marketplace handshake.
//   • Record certified submission outcome (immune memory + signatures).
//   • Emit v30‑Immortal‑INTEL++ presence/advantage/hints surfaces.
//   • Emit binary‑first + wave surfaces.
//   • Emit lymphComputeProfileV30 (metadata‑only, gpu/miner/offline/computeTier‑aware).
//   • Emit lymphPressureProfile (diagnostic‑only).
//   • Emit dual‑hash INTEL signatures (INTEL + classic fallback).
//   • Emit lymphPulseIntelligence + intelligentLymphPlan (logic‑only, deterministic).
//
// CONTRACT (v30-Immortal-INTEL-PLUSPLUS):
//   • PURE RESULT DISPATCHER — no AI layers, no translation, no memory model.
//   • NO async, NO timestamps, NO nondeterministic behavior.
//   • NEVER mutate job objects.
//   • Deterministic identity verification + dispatch only.
//   • Dual-band + binary + wave + presence metadata are structural-only.
//   • NO speed, NO baseline, NO governor, NO performance assumptions.
//   • NO eval(), NO Function(), NO dynamic imports.
//   • NO user scripts, NO network calls, NO filesystem access.
// ============================================================================

//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝

// ============================================================================
// Imports
// ============================================================================

import { PulseEarnReceptor } from "./PulseEarnReceptorMkt-v24.js";
import { PulseEarnCustomReceptor } from "./PulseEarnCustomReceptorMkt-v24.js";

// ============================================================================
// Healing Metadata — v30 IMMORTAL-INTEL-PLUSPLUS
// ============================================================================

const MAX_LYMPH_ADV_HISTORY = 64;

const lymphHealing = {
  lastJobId: null,
  lastMarketplaceId: null,
  lastAdapterUsed: null,
  lastError: null,
  lastResponse: null,
  cycleCount: 0,
  lastCycleIndex: null,
  executionState: "idle", // idle | validating | dispatching | returning | error

  // Dual-hash INTEL signatures
  lastHandshakeSignatureIntel: null,
  lastHandshakeSignatureClassic: null,
  lastJobSignatureIntel: null,
  lastJobSignatureClassic: null,
  lastMarketplaceSignatureIntel: null,
  lastMarketplaceSignatureClassic: null,

  lastBand: "symbolic",
  lastBandSignatureIntel: null,
  lastBandSignatureClassic: null,
  lastBinaryField: null,
  lastWaveField: null,

  lastPresenceField: null,
  lastAdvantageField: null,
  lastHintsField: null,

  lastLymphPresenceProfile: null,
  lastLymphPressureProfile: null,
  lastBinaryProfile: null,
  lastWaveProfile: null,
  lastLymphComputeProfileV30: null,

  lastPressureTier: "idle",

  // v30++: local advantage memory + INTEL
  totalJobs: 0,
  successfulJobs: 0,
  failedJobs: 0,
  cumulativeAdvantageScore: 0,
  lastAdvantageHistory: [], // { jobId, marketplaceId, advantageScore, advantageTier, band }

  lastLymphPulseIntelligence: null,
  lastIntelligentLymphPlan: null
};

let lymphCycle = 0;

// ============================================================================
// Deterministic Hash Helpers — INTEL + Classic Fallback
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

function normalizeBand(band) {
  const b = String(band || "symbolic").toLowerCase();
  return b === "binary" ? "binary" : "symbolic";
}

// ============================================================================
// Signature Builders — Dual Hash
// ============================================================================

function buildJobSignature(job, cycleIndex, band, presenceTier) {
  if (!job) {
    return buildDualHashSignature("LYMPH_JOB::NONE", {}, "LYMPH_JOB::NONE");
  }

  const intelPayload = {
    kind: "lymph_job",
    id: job.id,
    marketplaceId: job.marketplaceId || "NO_MKT",
    cycleIndex,
    band,
    presenceTier
  };

  const classicString =
    `LYMPH_JOB::${job.id}::${job.marketplaceId || "NO_MKT"}::` +
    `CYCLE::${cycleIndex}::BAND::${band}::PTIER::${presenceTier}`;

  return buildDualHashSignature("LYMPH_JOB", intelPayload, classicString);
}

function buildMarketplaceSignature(marketplaceId, cycleIndex) {
  const intelPayload = {
    kind: "lymph_marketplace",
    marketplaceId: marketplaceId || "NO_MKT",
    cycleIndex
  };

  const classicString = `LYMPH_MKT::${marketplaceId || "NO_MKT"}::CYCLE::${cycleIndex}`;

  return buildDualHashSignature("LYMPH_MKT", intelPayload, classicString);
}

function buildHandshakeSignature(job, cycleIndex, band, presenceTier, pressureTier) {
  const intelPayload = {
    kind: "lymph_handshake",
    jobId: job?.id || "NO_JOB",
    marketplaceId: job?.marketplaceId || "NO_MKT",
    cycleIndex,
    band,
    presenceTier,
    pressureTier
  };

  const classicString =
    `LYMPH_HS_V30::${job?.id || "NO_JOB"}::${job?.marketplaceId || "NO_MKT"}::` +
    `CYCLE::${cycleIndex}::BAND::${band}::PTIER::${presenceTier}::PRESSURE::${pressureTier}`;

  return buildDualHashSignature("LYMPH_HS_V30", intelPayload, classicString);
}

function buildBandSignature(band, cycleIndex) {
  const intelPayload = {
    kind: "lymph_band",
    band,
    cycleIndex
  };

  const classicString = `LYMPH_BAND::${band}::CYCLE::${cycleIndex}`;

  return buildDualHashSignature("LYMPH_BAND", intelPayload, classicString);
}

// ============================================================================
// Receptor Registry
// ============================================================================

const receptorRegistry = {
  A: PulseEarnReceptor,
  CUSTOM: PulseEarnCustomReceptor
};

// ============================================================================
// Presence / Advantage / Hints — v30 IMMORTAL-INTEL-PLUSPLUS
// ============================================================================

function buildPresenceField(job, globalHints = {}) {
  const meta = job?.meta || {};
  const jp = meta.presenceContext || meta.cardiacPresence || {};

  const mesh = { ...(globalHints.meshSignals || {}), ...(meta.meshSignals || {}) };
  const castle = { ...(globalHints.castleSignals || {}), ...(meta.castleSignals || {}) };
  const region = { ...(globalHints.regionContext || {}), ...(meta.regionContext || {}) };

  const meshPressureIndex = mesh.meshPressureIndex || 0;
  const castleLoadLevel = castle.loadLevel || 0;
  const meshStrength = mesh.meshStrength || 0;

  const pressure = meshPressureIndex + castleLoadLevel;
  let presenceTier = "idle";
  if (pressure >= 180) presenceTier = "critical";
  else if (pressure >= 120) presenceTier = "high";
  else if (pressure >= 60) presenceTier = "elevated";
  else if (pressure > 0) presenceTier = "soft";

  const intelPayload = {
    kind: "lymph_presence",
    presenceTier,
    meshPressureIndex,
    castleLoadLevel,
    meshStrength,
    regionId: region.regionId || "unknown-region",
    castleId: castle.castleId || "unknown-castle"
  };

  const classicString =
    `LYMPH_PRESENCE_V30::${presenceTier}::` +
    `${meshPressureIndex}::${castleLoadLevel}`;

  const presenceSignatureDual = buildDualHashSignature(
    "LYMPH_PRESENCE_V30",
    intelPayload,
    classicString
  );

  return {
    presenceVersion: "v30-Immortal-INTEL-PLUSPLUS",
    presenceTier,
    presenceSignatureIntel: presenceSignatureDual.intel,
    presenceSignatureClassic: presenceSignatureDual.classic,

    bandPresence: jp.bandPresence || (globalHints.presenceContext || {}).bandPresence || "unknown",
    routerPresence: jp.routerPresence || (globalHints.presenceContext || {}).routerPresence || "unknown",
    devicePresence: jp.devicePresence || (globalHints.presenceContext || {}).devicePresence || "unknown",

    meshPresence: jp.meshPresence || mesh.meshStrength || "unknown",
    castlePresence: jp.castlePresence || castle.castlePresence || "unknown",
    regionPresence: jp.regionPresence || region.regionTag || "unknown",

    regionId: region.regionId || "unknown-region",
    castleId: castle.castleId || "unknown-castle",

    castleLoadLevel,
    meshStrength,
    meshPressureIndex
  };
}

function buildAdvantageField(job, globalHints = {}) {
  const meta = job?.meta || {};
  const ja = meta.advantageContext || {};
  const gh = globalHints.advantageContext || {};

  return {
    advantageVersion: "C-30.0-LYMPH",
    advantageScore: ja.score ?? gh.score ?? 0,
    advantageBand: ja.band ?? gh.band ?? "neutral",
    advantageTier: ja.tier ?? gh.tier ?? 0
  };
}

function buildHintsField(job, globalHints = {}) {
  const meta = job?.meta || {};
  const jh = meta.hintsContext || {};

  return {
    fallbackBandLevel:
      jh.fallbackBandLevel ??
      globalHints.fallbackBandLevel ??
      0,

    chunkHints: {
      ...(globalHints.chunkHints || {}),
      ...(jh.chunkHints || {})
    },

    cacheHints: {
      ...(globalHints.cacheHints || {}),
      ...(jh.cacheHints || {})
    },

    prewarmHints: {
      ...(globalHints.prewarmHints || {}),
      ...(jh.prewarmHints || {})
    },

    coldStartHints: {
      ...(globalHints.coldStartHints || {}),
      ...(jh.coldStartHints || {})
    },

    // v30++ compute hints (gpu/miner/offline/computeTier)
    computeHints: {
      ...(globalHints.computeHints || {}),
      ...(jh.computeHints || {})
    }
  };
}

// ============================================================================
// Lymph Compute Profile v30 (metadata-only, INTEL)
// ============================================================================

function normalizeCachePriority(p) {
  if (!p) return "normal";
  const v = String(p).toLowerCase();
  if (v === "critical" || v === "high" || v === "low") return v;
  return "normal";
}

function buildLymphComputeProfileV30(band, hintsField) {
  const computeHints = hintsField.computeHints || {};
  const gpuHints = computeHints.gpu || {};
  const minerHints = computeHints.miner || {};
  const offlineHints = computeHints.offline || {};

  const gpuEligible = !!gpuHints.eligible;
  const gpuPreferred = !!gpuHints.preferred;
  const gpuTier = gpuHints.tier || "unknown";

  const minerEligible = !!minerHints.eligible;
  const minerTier = minerHints.tier || "unknown";

  const offlineEligible = !!offlineHints.eligible;
  const offlineTier = offlineHints.tier || "unknown";

  const computeTierHint = computeHints.computeTier || "normal";

  return {
    computeProfileVersion: "LYMPH-CP-V30++",
    routeBand: band,
    fallbackBandLevel: hintsField.fallbackBandLevel,
    chunkAggression: hintsField.chunkHints.chunkAggression ?? 0,
    prewarmNeeded: !!hintsField.prewarmHints.shouldPrewarm,
    cachePriority: normalizeCachePriority(hintsField.cacheHints.priority),
    coldStartRisk: !!hintsField.coldStartHints.coldStartRisk,

    gpuEligible,
    gpuPreferred,
    gpuTier,
    minerEligible,
    minerTier,
    offlineEligible,
    offlineTier,
    computeTierHint
  };
}

// ============================================================================
// Pressure Tier Classification (diagnostic only, no perf baseline)
// ============================================================================

function classifyPressureTier(presenceField, errorCount) {
  const mesh = Number(presenceField.meshPressureIndex || 0);
  const castle = Number(presenceField.castleLoadLevel || 0);
  const pressure = mesh + castle + errorCount * 20; // deterministic composite

  if (pressure >= 180) return "critical";
  if (pressure >= 120) return "high";
  if (pressure >= 60) return "elevated";
  if (pressure > 0) return "soft";
  return "idle";
}

// ============================================================================
// Binary + Wave Surfaces (INTEL)
// ============================================================================

function buildLymphBandBinaryWave(job, cycleIndex, presenceField) {
  const band = normalizeBand(job?.band || job?.meta?.band || "symbolic");

  const bandSig = buildBandSignature(band, cycleIndex);
  lymphHealing.lastBand = band;
  lymphHealing.lastBandSignatureIntel = bandSig.intel;
  lymphHealing.lastBandSignatureClassic = bandSig.classic;

  const jobIdLength = (job?.id || "").length;
  const marketplaceLength = (job?.marketplaceId || "").length;

  const surface =
    jobIdLength +
    marketplaceLength +
    cycleIndex +
    (presenceField?.meshPressureIndex || 0) +
    (presenceField?.castleLoadLevel || 0);

  const binaryIntelPayload = {
    kind: "lymph_binarySurface",
    jobIdLength,
    marketplaceLength,
    cycleIndex,
    meshPressureIndex: presenceField?.meshPressureIndex || 0,
    castleLoadLevel: presenceField?.castleLoadLevel || 0,
    surface
  };

  const binaryClassicString = `LYMPH_BMETA_V30::${surface}`;

  const binarySignatureDual = buildDualHashSignature(
    "LYMPH_BMETA_V30",
    binaryIntelPayload,
    binaryClassicString
  );

  const binaryField = {
    binaryLymphSignatureIntel: binarySignatureDual.intel,
    binaryLymphSignatureClassic: binarySignatureDual.classic,
    binarySurfaceSignatureIntel: binarySignatureDual.intel,
    binarySurfaceSignatureClassic: binarySignatureDual.classic,
    binarySurface: {
      jobIdLength,
      marketplaceLength,
      cycle: cycleIndex,
      meshPressureIndex: presenceField?.meshPressureIndex || 0,
      castleLoadLevel: presenceField?.castleLoadLevel || 0,
      surface
    },
    parity: surface % 2 === 0 ? 0 : 1,
    density: jobIdLength,
    shiftDepth: Math.max(0, Math.floor(Math.log2(surface || 1)))
  };
  lymphHealing.lastBinaryField = binaryField;

  const waveIntelPayload = {
    kind: "lymph_waveSurface",
    jobIdLength,
    cycleIndex,
    meshStrength: presenceField?.meshStrength || 0,
    meshPressureIndex: presenceField?.meshPressureIndex || 0
  };

  const waveClassicString = `LYMPH_WAVE_V30::${jobIdLength}::${cycleIndex}`;

  const waveSignatureDual = buildDualHashSignature(
    "LYMPH_WAVE_V30",
    waveIntelPayload,
    waveClassicString
  );

  const waveField = {
    waveLymphSignatureIntel: waveSignatureDual.intel,
    waveLymphSignatureClassic: waveSignatureDual.classic,
    amplitude: jobIdLength + (presenceField?.meshStrength || 0),
    wavelength: cycleIndex,
    phase:
      (jobIdLength +
        cycleIndex +
        (presenceField?.meshPressureIndex || 0)) % 8,
    band,
    mode: band === "binary" ? "compression-wave" : "symbolic-wave"
  };
  lymphHealing.lastWaveField = waveField;

  return { band, binaryField, waveField };
}

// ============================================================================
// v30++ Lymph Pulse Intelligence (logic-only, deterministic)
// ============================================================================

function computeLymphPulseIntelligence({ advantageField, presenceField, computeProfile, band, errorCount }) {
  const advantageScore = advantageField.advantageScore || 0;
  const advantageTier = advantageField.advantageTier || 0;

  const presenceTier = presenceField.presenceTier || "idle";
  const presenceWeight =
    presenceTier === "critical"
      ? 1.0
      : presenceTier === "high"
      ? 0.8
      : presenceTier === "elevated"
      ? 0.6
      : presenceTier === "soft"
      ? 0.4
      : 0.2;

  const factoringSignal =
    computeProfile.prewarmNeeded ||
    computeProfile.cachePriority === "critical" ||
    computeProfile.coldStartRisk
      ? 1
      : 0;

  const bandIsBinary = band === "binary" ? 1 : 0;
  const errorWeight = Math.max(0, Math.min(errorCount / 8, 1));

  const solvednessScore = Math.max(
    0,
    Math.min(
      advantageScore * 10 * 0.4 +
        presenceWeight * 0.25 +
        factoringSignal * 0.2 +
        (1 - errorWeight) * 0.15,
      1
    )
  );

  const computeTier =
    solvednessScore >= 0.9
      ? "nearSolution"
      : solvednessScore >= 0.7
      ? "highValue"
      : solvednessScore >= 0.4
      ? "normal"
      : solvednessScore >= 0.2
      ? "lowPriority"
      : "avoidCompute";

  const readinessScore = Math.max(
    0,
    Math.min(
      solvednessScore * 0.6 +
        (bandIsBinary ? 0.2 : 0) +
        (advantageTier >= 2 ? 0.2 : advantageTier === 1 ? 0.1 : 0),
      1
    )
  );

  return {
    lymphPulseIntelligenceVersion: "LYMPH-PI-V30++",
    solvednessScore,
    computeTier,
    readinessScore,
    band,
    advantageTier,
    factoringSignal: factoringSignal ? "high" : "low",
    errorCount
  };
}

// ============================================================================
// v30++ Intelligent Lymph Plan (pure, deterministic)
// ============================================================================

function buildIntelligentLymphPlan({ job, band, presenceField, advantageField, computeProfile }) {
  const jobId = job?.id || "NO_JOB";
  const marketplaceId = job?.marketplaceId || "NO_MKT";

  const avgAdvantage =
    lymphHealing.totalJobs > 0
      ? lymphHealing.cumulativeAdvantageScore / lymphHealing.totalJobs
      : 0;

  const pressureTier = presenceField.presenceTier || "idle";
  const highPressure =
    pressureTier === "critical" || pressureTier === "high";

  const preferBinary =
    band === "binary" ||
    (highPressure && computeProfile.gpuEligible);

  const preferGPU =
    computeProfile.gpuEligible &&
    (computeProfile.gpuPreferred || advantageField.advantageTier >= 2);

  const preferMiner =
    computeProfile.minerEligible &&
    !preferGPU &&
    (pressureTier === "elevated" || pressureTier === "high");

  const preferOffline =
    computeProfile.offlineEligible &&
    !preferGPU &&
    !preferMiner &&
    pressureTier === "soft";

  let refinedComputeTier = computeProfile.computeTierHint || "normal";
  if (avgAdvantage >= 0.8 && advantageField.advantageTier >= 2) {
    refinedComputeTier = "highValue";
  } else if (avgAdvantage <= 0.2 && !highPressure) {
    refinedComputeTier = "lowPriority";
  }

  const plan = {
    planVersion: "LYMPH-INTEL-30.0",
    jobId,
    marketplaceId,
    band,

    routeBand: preferBinary ? "binary" : "symbolic",

    useGPU: preferGPU,
    useMiner: preferMiner,
    useOffline: preferOffline,

    computeTier: refinedComputeTier,

    shouldPrewarm: !!computeProfile.prewarmNeeded,
    cachePriority: computeProfile.cachePriority,
    chunkAggression: computeProfile.chunkAggression,

    factoringSignal: computeProfile.factoringSignal ?? 0,
    hotStateReuse: true,
    multiInstanceBatching: true,
    serverPlanCache: true,
    serverBinaryReuse: true,

    localAdvantageMemory: {
      totalJobs: lymphHealing.totalJobs,
      successfulJobs: lymphHealing.successfulJobs,
      failedJobs: lymphHealing.failedJobs,
      averageAdvantageScore: avgAdvantage
    }
  };

  return Object.freeze(plan);
}

// ============================================================================
// Local Advantage Memory
// ============================================================================

function recordLymphAdvantageMemory(job, band, advantageField) {
  const score = advantageField?.advantageScore ?? 0;
  const tier = advantageField?.advantageTier ?? 0;

  lymphHealing.totalJobs += 1;
  lymphHealing.cumulativeAdvantageScore += score;

  const entry = {
    jobId: job?.id || "NO_JOB",
    marketplaceId: job?.marketplaceId || "NO_MKT",
    band: normalizeBand(band),
    advantageScore: score,
    advantageTier: tier
  };

  lymphHealing.lastAdvantageHistory.push(entry);
  if (lymphHealing.lastAdvantageHistory.length > MAX_LYMPH_ADV_HISTORY) {
    lymphHealing.lastAdvantageHistory.shift();
  }
}

// ============================================================================
// submitPulseEarnResult — Deterministic Lymphatic Handshake (v30 IMMORTAL-INTEL-PLUSPLUS)
// ============================================================================

export function submitPulseEarnResult(job, result, globalHints = {}) {
  lymphCycle++;
  lymphHealing.cycleCount++;
  lymphHealing.lastCycleIndex = lymphCycle;
  lymphHealing.executionState = "validating";

  let errorCount = 0;

  const presenceField = buildPresenceField(job, globalHints);
  const advantageField = buildAdvantageField(job, globalHints);
  const hintsField = buildHintsField(job, globalHints);

  lymphHealing.lastPresenceField = presenceField;
  lymphHealing.lastAdvantageField = advantageField;
  lymphHealing.lastHintsField = hintsField;

  const { band, binaryField, waveField } = buildLymphBandBinaryWave(
    job,
    lymphCycle,
    presenceField
  );

  const lymphComputeProfileV30 = buildLymphComputeProfileV30(band, hintsField);
  lymphHealing.lastLymphComputeProfileV30 = lymphComputeProfileV30;

  const pressureTier = classifyPressureTier(presenceField, errorCount);
  lymphHealing.lastPressureTier = pressureTier;
  const presenceTier = presenceField.presenceTier || "idle";

  const lymphPressureProfile = {
    pressureTier,
    errorCount,
    band,
    meshPressureIndex: presenceField.meshPressureIndex,
    castleLoadLevel: presenceField.castleLoadLevel,
    advantageTier: advantageField.advantageTier,
    fallbackBandLevel: hintsField.fallbackBandLevel
  };

  const lymphPresenceProfile = {
    presenceTier,
    band,
    meshPressureIndex: presenceField.meshPressureIndex,
    castleLoadLevel: presenceField.castleLoadLevel,
    advantageTier: advantageField.advantageTier,
    fallbackBandLevel: hintsField.fallbackBandLevel
  };

  const binaryProfile = { binaryField, pressureTier };
  const waveProfile = { waveField, pressureTier };

  lymphHealing.lastLymphPresenceProfile = lymphPresenceProfile;
  lymphHealing.lastLymphPressureProfile = lymphPressureProfile;
  lymphHealing.lastBinaryProfile = binaryProfile;
  lymphHealing.lastWaveProfile = waveProfile;

  const lymphPulseIntelligence = computeLymphPulseIntelligence({
    advantageField,
    presenceField,
    computeProfile: lymphComputeProfileV30,
    band,
    errorCount
  });
  lymphHealing.lastLymphPulseIntelligence = lymphPulseIntelligence;

  const intelligentLymphPlan = buildIntelligentLymphPlan({
    job,
    band,
    presenceField,
    advantageField,
    computeProfile: lymphComputeProfileV30
  });
  lymphHealing.lastIntelligentLymphPlan = intelligentLymphPlan;

  try {
    if (!job || !job.marketplaceId) {
      lymphHealing.lastError = "missing_marketplaceId";
      lymphHealing.executionState = "error";
      lymphHealing.lastJobId = job?.id ?? null;
      lymphHealing.lastMarketplaceId = job?.marketplaceId ?? null;
      errorCount = 1;

      const pressureTierMissing = classifyPressureTier(presenceField, errorCount);
      lymphHealing.lastPressureTier = pressureTierMissing;

      const lymphPressureProfileMissing = {
        pressureTier: pressureTierMissing,
        errorCount,
        band,
        meshPressureIndex: presenceField.meshPressureIndex,
        castleLoadLevel: presenceField.castleLoadLevel,
        advantageTier: advantageField.advantageTier,
        fallbackBandLevel: hintsField.fallbackBandLevel
      };
      lymphHealing.lastLymphPressureProfile = lymphPressureProfileMissing;

      const jobSig = buildJobSignature(job, lymphCycle, band, presenceField.presenceTier);
      const mktSig = buildMarketplaceSignature(job?.marketplaceId, lymphCycle);
      const hsSig = buildHandshakeSignature(
        job,
        lymphCycle,
        band,
        presenceField.presenceTier,
        pressureTierMissing
      );

      lymphHealing.lastJobSignatureIntel = jobSig.intel;
      lymphHealing.lastJobSignatureClassic = jobSig.classic;
      lymphHealing.lastMarketplaceSignatureIntel = mktSig.intel;
      lymphHealing.lastMarketplaceSignatureClassic = mktSig.classic;
      lymphHealing.lastHandshakeSignatureIntel = hsSig.intel;
      lymphHealing.lastHandshakeSignatureClassic = hsSig.classic;

      recordLymphAdvantageMemory(job, band, advantageField);

      const failure = {
        success: false,
        error: "Job missing marketplaceId",
        jobId: job?.id ?? null,
        marketplaceId: job?.marketplaceId ?? null,
        band,
        binaryField,
        waveField,
        presenceField,
        advantageField,
        hintsField,
        lymphPresenceProfile,
        lymphPressureProfile: lymphPressureProfileMissing,
        binaryProfile,
        waveProfile,
        lymphComputeProfileV30,
        lymphPulseIntelligence,
        intelligentLymphPlan,
        cycleIndex: lymphCycle
      };

      lymphHealing.lastResponse = failure;
      return failure;
    }

    lymphHealing.executionState = "dispatching";

    lymphHealing.lastJobId = job.id;
    lymphHealing.lastMarketplaceId = job.marketplaceId;

    const jobSig = buildJobSignature(job, lymphCycle, band, presenceField.presenceTier);
    const mktSig = buildMarketplaceSignature(job.marketplaceId, lymphCycle);

    lymphHealing.lastJobSignatureIntel = jobSig.intel;
    lymphHealing.lastJobSignatureClassic = jobSig.classic;
    lymphHealing.lastMarketplaceSignatureIntel = mktSig.intel;
    lymphHealing.lastMarketplaceSignatureClassic = mktSig.classic;

    const adapter = receptorRegistry[job.marketplaceId];

    if (!adapter) {
      lymphHealing.lastError = "unknown_marketplace";
      lymphHealing.executionState = "error";
      errorCount = 1;

      const pressureTierUnknown = classifyPressureTier(presenceField, errorCount);
      lymphHealing.lastPressureTier = pressureTierUnknown;

      const lymphPressureProfileUnknown = {
        pressureTier: pressureTierUnknown,
        errorCount,
        band,
        meshPressureIndex: presenceField.meshPressureIndex,
        castleLoadLevel: presenceField.castleLoadLevel,
        advantageTier: advantageField.advantageTier,
        fallbackBandLevel: hintsField.fallbackBandLevel
      };
      lymphHealing.lastLymphPressureProfile = lymphPressureProfileUnknown;

      const hsSig = buildHandshakeSignature(
        job,
        lymphCycle,
        band,
        presenceField.presenceTier,
        pressureTierUnknown
      );
      lymphHealing.lastHandshakeSignatureIntel = hsSig.intel;
      lymphHealing.lastHandshakeSignatureClassic = hsSig.classic;

      recordLymphAdvantageMemory(job, band, advantageField);

      const failure = {
        success: false,
        error: `Unknown marketplace: ${job.marketplaceId}`,
        jobId: job.id,
        marketplaceId: job.marketplaceId,
        band,
        binaryField,
        waveField,
        presenceField,
        advantageField,
        hintsField,
        lymphPresenceProfile,
        lymphPressureProfile: lymphPressureProfileUnknown,
        binaryProfile,
        waveProfile,
        lymphComputeProfileV30,
        lymphPulseIntelligence,
        intelligentLymphPlan,
        cycleIndex: lymphCycle
      };

      lymphHealing.lastResponse = failure;
      return failure;
    }

    if (typeof adapter.submitResult !== "function") {
      lymphHealing.lastError = "adapter_missing_submitResult";
      lymphHealing.executionState = "error";
      errorCount = 1;

      const pressureTierAdapter = classifyPressureTier(presenceField, errorCount);
      lymphHealing.lastPressureTier = pressureTierAdapter;

      const lymphPressureProfileAdapter = {
        pressureTier: pressureTierAdapter,
        errorCount,
        band,
        meshPressureIndex: presenceField.meshPressureIndex,
        castleLoadLevel: presenceField.castleLoadLevel,
        advantageTier: advantageField.advantageTier,
        fallbackBandLevel: hintsField.fallbackBandLevel
      };
      lymphHealing.lastLymphPressureProfile = lymphPressureProfileAdapter;

      const hsSig = buildHandshakeSignature(
        job,
        lymphCycle,
        band,
        presenceField.presenceTier,
        pressureTierAdapter
      );
      lymphHealing.lastHandshakeSignatureIntel = hsSig.intel;
      lymphHealing.lastHandshakeSignatureClassic = hsSig.classic;

      recordLymphAdvantageMemory(job, band, advantageField);

      const failure = {
        success: false,
        error: `Marketplace ${job.marketplaceId} does not support result submission`,
        jobId: job.id,
        marketplaceId: job.marketplaceId,
        band,
        binaryField,
        waveField,
        presenceField,
        advantageField,
        hintsField,
        lymphPresenceProfile,
        lymphPressureProfile: lymphPressureProfileAdapter,
        binaryProfile,
        waveProfile,
        lymphComputeProfileV30,
        lymphPulseIntelligence,
        intelligentLymphPlan,
        cycleIndex: lymphCycle
      };

      lymphHealing.lastResponse = failure;
      return failure;
    }

    lymphHealing.lastAdapterUsed = job.marketplaceId;

    const response = adapter.submitResult(job, result);

    lymphHealing.executionState = "returning";
    lymphHealing.lastResponse = response;
    lymphHealing.lastError = null;
    lymphHealing.successfulJobs += 1;

    const hsSig = buildHandshakeSignature(
      job,
      lymphCycle,
      band,
      presenceField.presenceTier,
      pressureTier
    );
    lymphHealing.lastHandshakeSignatureIntel = hsSig.intel;
    lymphHealing.lastHandshakeSignatureClassic = hsSig.classic;

    recordLymphAdvantageMemory(job, band, advantageField);

    return {
      ...response,
      band,
      binaryField,
      waveField,
      presenceField,
      advantageField,
      hintsField,
      lymphPresenceProfile,
      lymphPressureProfile,
      binaryProfile,
      waveProfile,
      lymphComputeProfileV30,
      lymphPulseIntelligence,
      intelligentLymphPlan,
      cycleIndex: lymphCycle
    };

  } catch (err) {
    lymphHealing.lastError = String(err && err.message ? err.message : err);
    lymphHealing.executionState = "error";
    lymphHealing.failedJobs += 1;
    errorCount = 1;

    const pressureTierError = classifyPressureTier(presenceField, errorCount);
    lymphHealing.lastPressureTier = pressureTierError;

    const lymphPressureProfileError = {
      pressureTier: pressureTierError,
      errorCount,
      band,
      meshPressureIndex: presenceField.meshPressureIndex,
      castleLoadLevel: presenceField.castleLoadLevel,
      advantageTier: advantageField.advantageTier,
      fallbackBandLevel: hintsField.fallbackBandLevel
    };
    lymphHealing.lastLymphPressureProfile = lymphPressureProfileError;

    const hsSig = buildHandshakeSignature(
      job,
      lymphCycle,
      band,
      presenceField.presenceTier,
      pressureTierError
    );
    lymphHealing.lastHandshakeSignatureIntel = hsSig.intel;
    lymphHealing.lastHandshakeSignatureClassic = hsSig.classic;

    recordLymphAdvantageMemory(job, band, advantageField);

    const failure = {
      success: false,
      error: lymphHealing.lastError,
      jobId: job?.id ?? null,
      marketplaceId: job?.marketplaceId ?? null,
      band,
      binaryField,
      waveField,
      presenceField,
      advantageField,
      hintsField,
      lymphPresenceProfile,
      lymphPressureProfile: lymphPressureProfileError,
      binaryProfile,
      waveProfile,
      lymphComputeProfileV30,
      lymphPulseIntelligence,
      intelligentLymphPlan,
      cycleIndex: lymphCycle
    };

    lymphHealing.lastResponse = failure;
    return failure;
  }
}

// ---------------------------------------------------------------------------
// sendResultToMarketplace — alias for Nervous System (backwards compatible)
// ---------------------------------------------------------------------------

export function sendResultToMarketplace(job, result, globalHints) {
  return submitPulseEarnResult(job, result, globalHints);
}

// ---------------------------------------------------------------------------
// Export Healing Metadata — Lymphatic Dispatch Report
// ---------------------------------------------------------------------------

export function getPulseEarnLymphHealingState() {
  return { ...lymphHealing };
}
