// ============================================================================
// FILE: tropic-pulse-functions/PULSE-WORLD/PULSE-EARN/PulseEarnMetabolism-v24-IMMORTAL-INTEL-PLUS.js
// LAYER: THE METABOLIC ENGINEER (v24-IMMORTAL-INTEL-PLUS)
// (Interpreter of Jobs + Safe Executor + Deterministic Throughput Engine + INTEL Plan)
// ============================================================================
//
// ROLE (v24-IMMORTAL-INTEL-PLUS):
//   THE METABOLIC ENGINEER — Pulse‑Earn’s deterministic execution organ.
//   • Reads the blueprint (job payload).
//   • Selects the correct safe tool (compute/image/script handler).
//   • Executes deterministically with NO performance math.
//   • Emits v24‑IMMORTAL presence/advantage/hints surfaces.
//   • Emits binary-first + wave surfaces.
//   • Emits metabolicComputeProfile v24 (metadata-only, gpu/miner/offline/computeTier-aware).
//   • Emits metabolicPressureProfile (diagnostic-only).
//   • Emits dual-hash INTEL signatures (INTEL + classic fallback).
//   • Emits pulseIntelligence + intelligentMetabolicPlan (logic-only, deterministic).
//
// CONTRACT (v24-IMMORTAL-INTEL-PLUS):
//   • PURE EXECUTION BRIDGE — no AI layers, no translation, no memory model.
//   • NO eval(), NO Function(), NO dynamic imports.
//   • NO user scripts, NO network calls, NO filesystem access.
//   • NEVER mutate job objects.
//   • Deterministic output only.
//   • Dual-band + binary + wave + presence metadata are structural-only.
//   • NO speed, NO baseline, NO governor, NO performance assumptions.
//   • NO timestamps, NO randomness, NO nondeterministic behavior.
// ============================================================================
import {
  OrganismIdentity,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PulseWorldOrganismMap-v21.js";
const Identity = OrganismIdentity(import.meta.url);

// 2 — EXPORT GENOME METADATA
// export const PulseEarnCustomReceptorMeta = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
// export const PULSE_EARN_IMMUNE_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;
// ============================================================================
// Healing Metadata — v24 IMMORTAL-INTEL-PLUS
// ============================================================================

const MAX_ADV_HISTORY = 64;

const metabolicHealing = {
  lastJobId: null,
  lastPayloadType: null,
  lastError: null,
  lastResult: null,
  cycleCount: 0,
  executionState: "idle",
  lastCycleIndex: null,

  // Dual-hash INTEL signatures
  lastMetabolicSignatureIntel: null,
  lastMetabolicSignatureClassic: null,
  lastJobSignatureIntel: null,
  lastJobSignatureClassic: null,
  lastPayloadSignatureIntel: null,
  lastPayloadSignatureClassic: null,

  lastBand: "symbolic",
  lastBandSignatureIntel: null,
  lastBandSignatureClassic: null,
  lastBinaryField: null,
  lastWaveField: null,

  lastPresenceField: null,
  lastAdvantageField: null,
  lastHintsField: null,

  lastMetabolicPresenceProfile: null,
  lastMetabolicPressureProfile: null,
  lastBinaryProfile: null,
  lastWaveProfile: null,
  lastMetabolicComputeProfile: null,

  lastPressureTier: "idle",

  // v24++: local advantage memory + INTEL
  totalJobs: 0,
  successfulJobs: 0,
  failedJobs: 0,
  cumulativeAdvantageScore: 0,
  lastAdvantageHistory: [], // { jobId, payloadType, advantageScore, advantageTier, band }

  lastPulseIntelligence: null,
  lastMetabolicIntelligentPlan: null
};

let metabolismCycle = 0;

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

function buildJobSignature(job, cycleIndex, presenceTier, band) {
  if (!job) {
    return buildDualHashSignature("JOB::NONE", {}, "JOB::NONE");
  }

  const intelPayload = {
    kind: "job",
    id: job.id,
    payloadType: job.payload?.type || "NO_TYPE",
    cycleIndex,
    band,
    presenceTier
  };

  const classicString =
    `JOB::${job.id}::${job.payload?.type || "NO_TYPE"}::` +
    `CYCLE::${cycleIndex}::BAND::${band}::PTIER::${presenceTier}`;

  return buildDualHashSignature("JOB", intelPayload, classicString);
}

function buildPayloadSignature(payload, cycleIndex, band) {
  if (!payload) {
    return buildDualHashSignature("PAYLOAD::NONE", {}, "PAYLOAD::NONE");
  }

  const intelPayload = {
    kind: "payload",
    type: payload.type,
    keys: Object.keys(payload).sort(),
    cycleIndex,
    band
  };

  const classicString =
    `PAYLOAD::${payload.type}::` +
    `${Object.keys(payload).sort().join("::")}::` +
    `CYCLE::${cycleIndex}::BAND::${band}`;

  return buildDualHashSignature("PAYLOAD", intelPayload, classicString);
}

function buildMetabolicSignature(job, cycleIndex, presenceTier, band, pressureTier) {
  const intelPayload = {
    kind: "metabolism",
    jobId: job?.id || "NO_JOB",
    payloadType: job?.payload?.type || "NO_TYPE",
    cycleIndex,
    band,
    presenceTier,
    pressureTier
  };

  const classicString =
    `META_V24::${job?.id || "NO_JOB"}::${cycleIndex}::` +
    `PTIER:${presenceTier}::BAND:${band}::PRESSURE:${pressureTier}`;

  return buildDualHashSignature("META_V24", intelPayload, classicString);
}

function buildBandSignature(band, cycleIndex) {
  const intelPayload = {
    kind: "band",
    band,
    cycleIndex
  };

  const classicString = `BAND::${band}::CYCLE::${cycleIndex}`;

  return buildDualHashSignature("BAND", intelPayload, classicString);
}

// ============================================================================
// Presence / Advantage / Hints — v24 IMMORTAL-INTEL-PLUS
// ============================================================================

function buildPresenceField(job, globalHints = {}) {
  const meta = job?.meta || {};
  const jp = meta.presenceContext || {};

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
    kind: "presence",
    presenceTier,
    meshPressureIndex,
    castleLoadLevel,
    meshStrength,
    regionId: region.regionId || "unknown-region",
    castleId: castle.castleId || "unknown-castle"
  };

  const classicString =
    `META_PRESENCE_V24::${presenceTier}::` +
    `${meshPressureIndex}::${castleLoadLevel}`;

  const presenceSignatureDual = buildDualHashSignature(
    "META_PRESENCE_V24",
    intelPayload,
    classicString
  );

  return {
    presenceVersion: "v24-IMMORTAL-INTEL-PLUS",
    presenceTier,
    presenceSignatureIntel: presenceSignatureDual.intel,
    presenceSignatureClassic: presenceSignatureDual.classic,

    bandPresence:
      jp.bandPresence ||
      (globalHints.presenceContext || {}).bandPresence ||
      "unknown",
    routerPresence:
      jp.routerPresence ||
      (globalHints.presenceContext || {}).routerPresence ||
      "unknown",
    devicePresence:
      jp.devicePresence ||
      (globalHints.presenceContext || {}).devicePresence ||
      "unknown",

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
    advantageVersion: "C-24.0",
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

    // v24++ compute hints (gpu/miner/offline/computeTier)
    computeHints: {
      ...(globalHints.computeHints || {}),
      ...(jh.computeHints || {})
    }
  };
}

// ============================================================================
// Metabolic Compute Profile v24 (metadata-only, INTEL)
// ============================================================================

function normalizeCachePriority(p) {
  if (!p) return "normal";
  const v = String(p).toLowerCase();
  if (v === "critical" || v === "high" || v === "low") return v;
  return "normal";
}

function buildMetabolicComputeProfile(band, hintsField) {
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

function buildMetabolicBandBinaryWave(job, cycleIndex, presenceField) {
  const band = normalizeBand(job?.band || job?.meta?.band || "symbolic");

  const bandSig = buildBandSignature(band, cycleIndex);
  metabolicHealing.lastBand = band;
  metabolicHealing.lastBandSignatureIntel = bandSig.intel;
  metabolicHealing.lastBandSignatureClassic = bandSig.classic;

  const payloadType = job?.payload?.type || "NO_TYPE";
  const payloadKeysCount = job?.payload ? Object.keys(job.payload).length : 0;

  const surface =
    payloadType.length +
    payloadKeysCount +
    cycleIndex +
    (presenceField?.meshPressureIndex || 0) +
    (presenceField?.castleLoadLevel || 0);

  const binaryIntelPayload = {
    kind: "binarySurface",
    payloadType,
    payloadTypeLength: payloadType.length,
    payloadKeysCount,
    cycleIndex,
    meshPressureIndex: presenceField?.meshPressureIndex || 0,
    castleLoadLevel: presenceField?.castleLoadLevel || 0,
    surface
  };

  const binaryClassicString = `BMETA_V24::${surface}`;

  const binarySignatureDual = buildDualHashSignature(
    "BMETA_V24",
    binaryIntelPayload,
    binaryClassicString
  );

  const binaryField = {
    binaryMetabolicSignatureIntel: binarySignatureDual.intel,
    binaryMetabolicSignatureClassic: binarySignatureDual.classic,
    binarySurfaceSignatureIntel: binarySignatureDual.intel,
    binarySurfaceSignatureClassic: binarySignatureDual.classic,
    binarySurface: {
      payloadTypeLength: payloadType.length,
      payloadKeysCount,
      cycle: cycleIndex,
      meshPressureIndex: presenceField?.meshPressureIndex || 0,
      castleLoadLevel: presenceField?.castleLoadLevel || 0,
      surface
    },
    parity: surface % 2 === 0 ? 0 : 1,
    density: payloadKeysCount,
    shiftDepth: Math.max(0, Math.floor(Math.log2(surface || 1)))
  };
  metabolicHealing.lastBinaryField = binaryField;

  const waveIntelPayload = {
    kind: "waveSurface",
    payloadKeysCount,
    cycleIndex,
    meshStrength: presenceField?.meshStrength || 0,
    meshPressureIndex: presenceField?.meshPressureIndex || 0
  };

  const waveClassicString = `WAVE_META_V24::${payloadKeysCount}::${cycleIndex}`;

  const waveSignatureDual = buildDualHashSignature(
    "WAVE_META_V24",
    waveIntelPayload,
    waveClassicString
  );

  const waveField = {
    waveMetabolicSignatureIntel: waveSignatureDual.intel,
    waveMetabolicSignatureClassic: waveSignatureDual.classic,
    amplitude: payloadKeysCount + (presenceField?.meshStrength || 0),
    wavelength: cycleIndex,
    phase:
      (payloadKeysCount +
        cycleIndex +
        (presenceField?.meshPressureIndex || 0)) % 8,
    band,
    mode: band === "binary" ? "compression-wave" : "symbolic-wave"
  };
  metabolicHealing.lastWaveField = waveField;

  return { band, binaryField, waveField };
}

// ============================================================================
// v24++ Pulse Intelligence (logic-only, deterministic)
// ============================================================================

function computePulseIntelligence({ advantageField, presenceField, computeProfile, band }) {
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
    computeProfile.prewarmNeeded || computeProfile.cachePriority === "critical"
      ? 1
      : 0;

  const bandIsBinary = band === "binary" ? 1 : 0;

  const solvednessScore = Math.max(
    0,
    Math.min(
      advantageScore * 10 * 0.5 +
        presenceWeight * 0.3 +
        factoringSignal * 0.2,
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
    solvednessScore,
    computeTier,
    readinessScore,
    band,
    advantageTier,
    factoringSignal: factoringSignal ? "high" : "low"
  };
}

// ============================================================================
// v24++ Intelligent Metabolic Plan (pure, deterministic)
// ============================================================================

function buildIntelligentMetabolicPlan({
  job,
  band,
  presenceField,
  advantageField,
  computeProfile
}) {
  const jobId = job?.id || "NO_JOB";
  const payloadType = job?.payload?.type || "NO_TYPE";

  const avgAdvantage =
    metabolicHealing.totalJobs > 0
      ? metabolicHealing.cumulativeAdvantageScore / metabolicHealing.totalJobs
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
    planVersion: "META-INTEL-24.0",
    jobId,
    payloadType,
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
      totalJobs: metabolicHealing.totalJobs,
      successfulJobs: metabolicHealing.successfulJobs,
      failedJobs: metabolicHealing.failedJobs,
      averageAdvantageScore: avgAdvantage
    }
  };

  return Object.freeze(plan);
}

// ============================================================================
// Local Advantage Memory
// ============================================================================

function recordAdvantageMemory(job, band, advantageField) {
  const score = advantageField?.advantageScore ?? 0;
  const tier = advantageField?.advantageTier ?? 0;

  metabolicHealing.totalJobs += 1;
  metabolicHealing.cumulativeAdvantageScore += score;

  const entry = {
    jobId: job?.id || "NO_JOB",
    payloadType: job?.payload?.type || "NO_TYPE",
    band: normalizeBand(band),
    advantageScore: score,
    advantageTier: tier
  };

  metabolicHealing.lastAdvantageHistory.push(entry);
  if (metabolicHealing.lastAdvantageHistory.length > MAX_ADV_HISTORY) {
    metabolicHealing.lastAdvantageHistory.shift();
  }
}

// ============================================================================
// executePulseEarnJob — Deterministic Metabolic Workflow (v24 IMMORTAL-INTEL-PLUS)
// ============================================================================

export function executePulseEarnJob(job, globalHints = {}) {
  metabolismCycle++;
  metabolicHealing.cycleCount++;
  metabolicHealing.lastCycleIndex = metabolismCycle;
  metabolicHealing.executionState = "validating";

  let errorCount = 0;

  try {
    if (!job || !job.id || !job.payload) {
      metabolicHealing.lastError = "invalid_job_format";
      metabolicHealing.executionState = "error";
      errorCount = 1;

      const presenceField = buildPresenceField(job, globalHints);
      const advantageField = buildAdvantageField(job, globalHints);
      const hintsField = buildHintsField(job, globalHints);

      const computeProfile = buildMetabolicComputeProfile(
        normalizeBand(job?.band || job?.meta?.band || "symbolic"),
        hintsField
      );

      const pressureTier = classifyPressureTier(presenceField, errorCount);
      metabolicHealing.lastPressureTier = pressureTier;

      const metabolicPressureProfile = {
        pressureTier,
        errorCount,
        band: normalizeBand(job?.band || job?.meta?.band || "symbolic"),
        meshPressureIndex: presenceField.meshPressureIndex,
        castleLoadLevel: presenceField.castleLoadLevel,
        advantageTier: advantageField.advantageTier,
        fallbackBandLevel: hintsField.fallbackBandLevel
      };

      metabolicHealing.lastPresenceField = presenceField;
      metabolicHealing.lastAdvantageField = advantageField;
      metabolicHealing.lastHintsField = hintsField;
      metabolicHealing.lastMetabolicComputeProfile = computeProfile;
      metabolicHealing.lastMetabolicPressureProfile = metabolicPressureProfile;

      const band = normalizeBand(job?.band || job?.meta?.band || "symbolic");
      const pulseIntelligence = computePulseIntelligence({
        advantageField,
        presenceField,
        computeProfile,
        band
      });

      metabolicHealing.lastPulseIntelligence = pulseIntelligence;
      metabolicHealing.lastMetabolicIntelligentPlan = null;

      recordAdvantageMemory(job, band, advantageField);

      return {
        success: false,
        jobId: job?.id ?? null,
        error: "Invalid job format",
        pressureTier,
        metabolicPressureProfile,
        metabolicComputeProfile: computeProfile,
        pulseIntelligence,
        metabolicIntelligentPlan: null,
        cycleIndex: metabolismCycle
      };
    }

    const { payload } = job;

    const presenceField = buildPresenceField(job, globalHints);
    const advantageField = buildAdvantageField(job, globalHints);
    const hintsField = buildHintsField(job, globalHints);

    metabolicHealing.lastPresenceField = presenceField;
    metabolicHealing.lastAdvantageField = advantageField;
    metabolicHealing.lastHintsField = hintsField;

    const { band, binaryField, waveField } = buildMetabolicBandBinaryWave(
      job,
      metabolismCycle,
      presenceField
    );

    const metabolicComputeProfile = buildMetabolicComputeProfile(band, hintsField);
    metabolicHealing.lastMetabolicComputeProfile = metabolicComputeProfile;

    const pressureTier = classifyPressureTier(presenceField, errorCount);
    metabolicHealing.lastPressureTier = pressureTier;

    const metabolicPressureProfile = {
      pressureTier,
      errorCount,
      band,
      meshPressureIndex: presenceField.meshPressureIndex,
      castleLoadLevel: presenceField.castleLoadLevel,
      advantageTier: advantageField.advantageTier,
      fallbackBandLevel: hintsField.fallbackBandLevel
    };
    metabolicHealing.lastMetabolicPressureProfile = metabolicPressureProfile;

    metabolicHealing.lastJobId = job.id;
    metabolicHealing.lastPayloadType = payload.type;

    const presenceTier = presenceField.presenceTier;

    const jobSig = buildJobSignature(job, metabolismCycle, presenceTier, band);
    const payloadSig = buildPayloadSignature(payload, metabolismCycle, band);

    metabolicHealing.lastJobSignatureIntel = jobSig.intel;
    metabolicHealing.lastJobSignatureClassic = jobSig.classic;
    metabolicHealing.lastPayloadSignatureIntel = payloadSig.intel;
    metabolicHealing.lastPayloadSignatureClassic = payloadSig.classic;

    metabolicHealing.executionState = "executing";

    let result;

    switch (payload.type) {
      case "compute":
        result = runComputeTask(payload.data);
        break;

      case "image-processing":
        result = runImageTask(payload.data);
        break;

      case "script":
        result = runScriptTask(payload.script, payload.input);
        break;

      default:
        metabolicHealing.lastError = "unknown_payload_type";
        metabolicHealing.executionState = "error";
        errorCount = 1;

        const pressureTierUnknown = classifyPressureTier(presenceField, errorCount);
        metabolicHealing.lastPressureTier = pressureTierUnknown;

        const metabolicPressureProfileUnknown = {
          pressureTier: pressureTierUnknown,
          errorCount,
          band,
          meshPressureIndex: presenceField.meshPressureIndex,
          castleLoadLevel: presenceField.castleLoadLevel,
          advantageTier: advantageField.advantageTier,
          fallbackBandLevel: hintsField.fallbackBandLevel
        };
        metabolicHealing.lastMetabolicPressureProfile = metabolicPressureProfileUnknown;

        const pulseIntelligenceUnknown = computePulseIntelligence({
          advantageField,
          presenceField,
          computeProfile: metabolicComputeProfile,
          band
        });

        metabolicHealing.lastPulseIntelligence = pulseIntelligenceUnknown;
        metabolicHealing.lastMetabolicIntelligentPlan = null;

        recordAdvantageMemory(job, band, advantageField);

        return {
          success: false,
          jobId: job.id,
          error: `Unknown job type: ${payload.type}`,
          band,
          pressureTier: pressureTierUnknown,
          metabolicPressureProfile: metabolicPressureProfileUnknown,
          metabolicComputeProfile,
          pulseIntelligence: pulseIntelligenceUnknown,
          metabolicIntelligentPlan: null,
          cycleIndex: metabolismCycle
        };
    }

    metabolicHealing.lastResult = result;

    metabolicHealing.executionState = "returning";

    const metabolicSig = buildMetabolicSignature(
      job,
      metabolismCycle,
      presenceTier,
      band,
      pressureTier
    );

    metabolicHealing.lastMetabolicSignatureIntel = metabolicSig.intel;
    metabolicHealing.lastMetabolicSignatureClassic = metabolicSig.classic;

    const metabolicPresenceProfile = {
      presenceTier,
      band,
      meshPressureIndex: presenceField.meshPressureIndex,
      castleLoadLevel: presenceField.castleLoadLevel,
      advantageTier: advantageField.advantageTier,
      fallbackBandLevel: hintsField.fallbackBandLevel
    };

    const binaryProfile = { binaryField, pressureTier };
    const waveProfile = { waveField, pressureTier };

    metabolicHealing.lastMetabolicPresenceProfile = metabolicPresenceProfile;
    metabolicHealing.lastBinaryProfile = binaryProfile;
    metabolicHealing.lastWaveProfile = waveProfile;

    const pulseIntelligence = computePulseIntelligence({
      advantageField,
      presenceField,
      computeProfile: metabolicComputeProfile,
      band
    });

    const metabolicIntelligentPlan = buildIntelligentMetabolicPlan({
      job,
      band,
      presenceField,
      advantageField,
      computeProfile: metabolicComputeProfile
    });

    metabolicHealing.lastPulseIntelligence = pulseIntelligence;
    metabolicHealing.lastMetabolicIntelligentPlan = metabolicIntelligentPlan;

    metabolicHealing.totalJobs += 1;
    metabolicHealing.successfulJobs += 1;
    metabolicHealing.cumulativeAdvantageScore += advantageField.advantageScore || 0;
    recordAdvantageMemory(job, band, advantageField);

    return {
      success: true,
      jobId: job.id,
      result,

      band,
      binaryField,
      waveField,

      presenceField,
      advantageField,
      hintsField,

      metabolicPresenceProfile,
      metabolicComputeProfile,
      metabolicPressureProfile,

      binaryProfile,
      waveProfile,
      pressureTier,

      cycleIndex: metabolismCycle,

      metabolicSignatureIntel: metabolicSig.intel,
      metabolicSignatureClassic: metabolicSig.classic,
      jobSignatureIntel: jobSig.intel,
      jobSignatureClassic: jobSig.classic,
      payloadSignatureIntel: payloadSig.intel,
      payloadSignatureClassic: payloadSig.classic,

      pulseIntelligence,
      metabolicIntelligentPlan
    };

  } catch (err) {
    metabolicHealing.executionState = "error";
    metabolicHealing.lastError = err.message;
    errorCount = 1;

    const presenceField =
      metabolicHealing.lastPresenceField || buildPresenceField(null, {});
    const advantageField =
      metabolicHealing.lastAdvantageField || {
        advantageVersion: "C-24.0",
        advantageScore: 0,
        advantageBand: "neutral",
        advantageTier: 0
      };
    const hintsField =
      metabolicHealing.lastHintsField || {
        fallbackBandLevel: 0,
        chunkHints: {},
        cacheHints: {},
        prewarmHints: {},
        coldStartHints: {},
        computeHints: {}
      };

    const band = normalizeBand(metabolicHealing.lastBand || "symbolic");

    const metabolicComputeProfile = buildMetabolicComputeProfile(band, hintsField);
    metabolicHealing.lastMetabolicComputeProfile = metabolicComputeProfile;

    const pressureTier = classifyPressureTier(presenceField, errorCount);
    metabolicHealing.lastPressureTier = pressureTier;

    const metabolicPressureProfile = {
      pressureTier,
      errorCount,
      band,
      meshPressureIndex: presenceField.meshPressureIndex || 0,
      castleLoadLevel: presenceField.castleLoadLevel || 0,
      advantageTier: advantageField.advantageTier || 0,
      fallbackBandLevel: hintsField.fallbackBandLevel || 0
    };
    metabolicHealing.lastMetabolicPressureProfile = metabolicPressureProfile;

    const pulseIntelligence = computePulseIntelligence({
      advantageField,
      presenceField,
      computeProfile: metabolicComputeProfile,
      band
    });

    metabolicHealing.lastPulseIntelligence = pulseIntelligence;
    metabolicHealing.lastMetabolicIntelligentPlan = null;

    return {
      success: false,
      jobId: job?.id ?? null,
      error: err.message,
      band,
      pressureTier,
      metabolicPressureProfile,
      metabolicComputeProfile,
      pulseIntelligence,
      metabolicIntelligentPlan: null,
      cycleIndex: metabolismCycle
    };
  }
}

// ============================================================================
// SAFE workload handlers — Deterministic Metabolic Tools (v24 IMMORTAL-INTEL-PLUS)
// ============================================================================

function runComputeTask(data) {
  return { output: "compute-result", input: data };
}

function runImageTask(data) {
  return { output: "image-result", input: data };
}

function runScriptTask(script, input) {
  return { output: "script-task-placeholder", script, input };
}

// ============================================================================
// Export healing metadata — Metabolic Ledger
// ============================================================================

export function getPulseEarnMetabolismHealingState() {
  return { ...metabolicHealing };
}
