// ============================================================================
// FILE: tropic-pulse-functions/PULSE-WORLD/PULSE-EARN/PulseEarnMktBroker-v24-IMMORTAL-INTEL-PLUS.js
// LAYER: THE RUNPOD BROKER (v24‑IMMORTAL‑INTEL‑DUALHASH)
// ============================================================================
//
// ROLE (v24‑IMMORTAL‑INTEL):
//   • Deterministic RunPod → Pulse‑Earn broker.
//   • Pure receptor phenotype: registerDevice(), requestJob(), submitJob(), normalizeJob().
//   • Emits A‑B‑A bandSignature + binaryField + waveField + presence/advantage/chunk surfaces.
//   • Emits dual INTEL + classic signatures for all broker events.
//   • GPU‑forward advantage + chunk planning surfaces.
//   • Zero async, zero randomness, zero timestamps.
//
// CONTRACT:
//   • PURE RECEPTOR — deterministic, drift‑proof.
//   • NO network, NO fetch, NO async, NO randomness.
//   • NEVER mutate external objects.
//   • Presence/advantage/chunk are metadata-only.
//   • Dual‑hash INTEL signatures (INTEL + classic fallback).
// ============================================================================

import {
  OrganismIdentity,
  buildPulseOrganismMap as PulseOrganismMap,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PULSE-WORLD-MAP.js";
const Identity = OrganismIdentity(import.meta.url);

// 2 — EXPORT GENOME METADATA
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

export const RUNPOD_RECEPTOR_DNA = {
  version: "v24-IMMORTAL-INTEL-PLUS",
  receptorType: "runpod",
  jobs: [
    { id: "ping", payload: { type: "ping" } },
    { id: "fetch", payload: { type: "fetch" } },
    { id: "submit", payload: { type: "submit" } }
  ]
};

// ============================================================================
// HASH HELPERS — v24‑IMMORTAL‑INTEL (dual‑hash)
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
  const classicHash = computeHash(
    `${label}::${classicString || ""}`
  );
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

function safeNumber(v, fallback = 0) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

function buildBandSignature(band, cycleIndex) {
  const bandNorm = normalizeBand(band);
  const intelPayload = {
    kind: "runpodBand",
    band: bandNorm,
    cycleIndex
  };
  const classicString = `RUNPOD_BAND::${bandNorm}::CYCLE::${cycleIndex}`;
  return buildDualHashSignature("RUNPOD_BAND", intelPayload, classicString);
}

// ============================================================================
// A‑B‑A Binary + Wave Surfaces (INTEL)
// ============================================================================

function buildBinaryField(cycle) {
  const patternLen = 12;
  const density = patternLen + cycle * 3;
  const surface = density + patternLen;

  const intelPayload = {
    kind: "runpodBinarySurface",
    patternLen,
    density,
    surface,
    cycleIndex: cycle
  };
  const classicString = `BRUNPOD::${surface}`;
  const sig = buildDualHashSignature("BRUNPOD", intelPayload, classicString);

  return {
    binaryPhenotypeSignatureIntel: sig.intel,
    binaryPhenotypeSignatureClassic: sig.classic,
    binarySurfaceSignatureIntel: sig.intel,
    binarySurfaceSignatureClassic: sig.classic,
    binarySurface: {
      patternLen,
      density,
      surface
    },
    parity: surface % 2 === 0 ? 0 : 1,
    shiftDepth: Math.max(0, Math.floor(Math.log2(surface || 1)))
  };
}

function buildWaveField(cycle, band) {
  const amplitude = (cycle + 1) * (band === "binary" ? 9 : 5);
  const wavelength = amplitude + 3;
  const phase = amplitude % 16;

  const intelPayload = {
    kind: "runpodWaveSurface",
    band,
    amplitude,
    wavelength,
    phase,
    cycleIndex: cycle
  };
  const classicString = `BRUNPOD_WAVE::${band}::AMP::${amplitude}`;
  const sig = buildDualHashSignature("BRUNPOD_WAVE", intelPayload, classicString);

  return {
    wavePhenotypeSignatureIntel: sig.intel,
    wavePhenotypeSignatureClassic: sig.classic,
    amplitude,
    wavelength,
    phase,
    band,
    mode: band === "binary" ? "compression-wave" : "symbolic-wave"
  };
}

// ============================================================================
// Presence Field (v24‑IMMORTAL‑INTEL)
// ============================================================================

function buildPresenceField(jobOrRaw, device, cycle) {
  const idLen = (jobOrRaw?.id || "").length;
  const typeLen = (jobOrRaw?.priority || "").length;
  const stability = device?.stabilityScore || 0.7;

  const composite =
    idLen * 0.001 +
    typeLen * 0.001 +
    stability * 0.01;

  const presenceTier =
    composite >= 0.02 ? "presence_high" :
    composite >= 0.005 ? "presence_mid" :
    "presence_low";

  const intelPayload = {
    kind: "runpodPresence",
    presenceVersion: "v24-IMMORTAL-INTEL-PLUS",
    presenceTier,
    idLen,
    typeLen,
    stability,
    cycleIndex: cycle
  };

  const classicString =
    `RUNPOD_PRESENCE::${presenceTier}::${idLen}::${typeLen}::${cycle}`;

  const sig = buildDualHashSignature("RUNPOD_PRESENCE", intelPayload, classicString);

  return {
    presenceVersion: "v24-IMMORTAL-INTEL-PLUS",
    presenceTier,
    idLen,
    typeLen,
    stability,
    cycle,
    presenceSignatureIntel: sig.intel,
    presenceSignatureClassic: sig.classic
  };
}

// ============================================================================
// Advantage‑C Field (v24.0) — GPU‑forward
// ============================================================================

function buildAdvantageField(jobOrRaw, device, bandPack, presenceField) {
  const gpuScore = device?.gpuScore || 0;
  const bandwidth = device?.bandwidthMbps || 0;
  const density = bandPack.binaryField.binarySurface.density;
  const amplitude = bandPack.waveField.amplitude;

  const advantageScore =
    gpuScore * 0.0007 +
    bandwidth * 0.00025 +
    density * 0.00001 +
    amplitude * 0.00001 +
    (presenceField.presenceTier === "presence_high" ? 0.012 : 0);

  const intelPayload = {
    kind: "runpodAdvantage",
    advantageVersion: "C-24.0",
    band: bandPack.band,
    gpuScore,
    bandwidth,
    binaryDensity: density,
    waveAmplitude: amplitude,
    presenceTier: presenceField.presenceTier,
    advantageScore
  };

  const classicString =
    `RUNPOD_ADVANTAGE::${bandPack.band}::GPU:${gpuScore}::BW:${bandwidth}`;

  const sig = buildDualHashSignature("RUNPOD_ADVANTAGE", intelPayload, classicString);

  return {
    advantageVersion: "C-24.0",
    band: bandPack.band,
    gpuScore,
    bandwidth,
    binaryDensity: density,
    waveAmplitude: amplitude,
    presenceTier: presenceField.presenceTier,
    advantageScore,
    advantageSignatureIntel: sig.intel,
    advantageSignatureClassic: sig.classic
  };
}

// ============================================================================
// Chunk / Cache / Prewarm Plan (v24‑IMMORTAL‑INTEL)
// ============================================================================

function buildChunkPrewarmPlan(jobOrRaw, device, presenceField) {
  const basePriority =
    presenceField.presenceTier === "presence_high"
      ? 3
      : presenceField.presenceTier === "presence_mid"
      ? 2
      : 1;

  const gpuBoost = (device?.gpuScore || 0) > 600 ? 2 : (device?.gpuScore || 0) > 300 ? 1 : 0;
  const priority = basePriority + gpuBoost;

  const intelPayload = {
    kind: "runpodChunkPrewarmPlan",
    planVersion: "v24-IMMORTAL-INTEL-PLUS",
    priority,
    presenceTier: presenceField.presenceTier,
    gpuScore: device?.gpuScore || 0
  };

  const classicString =
    `RUNPOD_CHUNK_PLAN::PTIER:${presenceField.presenceTier}::PRIORITY:${priority}`;

  const sig = buildDualHashSignature("RUNPOD_CHUNK_PLAN", intelPayload, classicString);

  return {
    planVersion: "v24-IMMORTAL-INTEL-PLUS",
    priority,
    band: presenceField.presenceTier,
    chunks: {
      receptorEnvelope: true,
      normalizationBlueprint: true
    },
    cache: {
      deviceProfile: true,
      brokerDiagnostics: true
    },
    prewarm: {
      nervousSystem: presenceField.presenceTier !== "presence_low",
      muscleSystem: presenceField.presenceTier !== "presence_low",
      lymphNodes: presenceField.presenceTier !== "presence_low"
    },
    chunkPlanSignatureIntel: sig.intel,
    chunkPlanSignatureClassic: sig.classic
  };
}

// ============================================================================
// Healing Metadata — v24‑IMMORTAL‑INTEL
// ============================================================================

const runpodHealing = {
  lastRegister: null,
  lastRequest: null,
  lastSubmit: null,

  lastNormalizedJobId: null,
  lastNormalizationError: null,

  cycleCount: 0,
  lastCycleIndex: null,

  // Dual‑hash signatures
  lastRegisterSignatureIntel: null,
  lastRegisterSignatureClassic: null,

  lastRequestSignatureIntel: null,
  lastRequestSignatureClassic: null,

  lastNormalizationSignatureIntel: null,
  lastNormalizationSignatureClassic: null,

  lastSubmitSignatureIntel: null,
  lastSubmitSignatureClassic: null,

  lastRunPodCycleSignatureIntel: null,
  lastRunPodCycleSignatureClassic: null,

  lastBand: "symbolic",
  lastBandSignatureIntel: null,
  lastBandSignatureClassic: null,
  lastBinaryField: null,
  lastWaveField: null,

  lastPresenceField: null,
  lastAdvantageField: null,
  lastChunkPrewarmPlan: null
};

let runpodCycle = 0;

// ============================================================================
// Signature builders — v24‑IMMORTAL‑INTEL
// ============================================================================

function buildRegisterSignature(deviceId, cycleIndex) {
  const intelPayload = {
    kind: "runpodRegister",
    deviceId,
    cycleIndex
  };
  const classicString = `REGISTER::${deviceId}::CYCLE::${cycleIndex}`;
  return buildDualHashSignature("RUNPOD_REGISTER", intelPayload, classicString);
}

function buildRequestSignature(jobId, cycleIndex) {
  const intelPayload = {
    kind: "runpodRequest",
    jobId: jobId || "NONE",
    cycleIndex
  };
  const classicString = `REQUEST::${jobId || "NONE"}::CYCLE::${cycleIndex}`;
  return buildDualHashSignature("RUNPOD_REQUEST", intelPayload, classicString);
}

function buildSubmitSignature(jobId, cycleIndex) {
  const intelPayload = {
    kind: "runpodSubmit",
    jobId: jobId || "NONE",
    cycleIndex
  };
  const classicString = `SUBMIT::${jobId || "NONE"}::CYCLE::${cycleIndex}`;
  return buildDualHashSignature("RUNPOD_SUBMIT", intelPayload, classicString);
}

function buildNormalizationSignature(jobId, cycleIndex) {
  const intelPayload = {
    kind: "runpodNormalize",
    jobId: jobId || "NONE",
    cycleIndex
  };
  const classicString = `NORM::${jobId || "NONE"}::CYCLE::${cycleIndex}`;
  return buildDualHashSignature("RUNPOD_NORMALIZE", intelPayload, classicString);
}

function buildRunPodCycleSignature(cycleIndex, band) {
  const intelPayload = {
    kind: "runpodCycle",
    cycleIndex,
    band
  };
  const classicString = `RUNPOD_CYCLE::${cycleIndex}::BAND::${band}`;
  return buildDualHashSignature("RUNPOD_CYCLE", intelPayload, classicString);
}

// ============================================================================
// normalizeJob — deterministic + Presence + Advantage‑C + dual‑hash
// ============================================================================

function normalizeJob(raw, deviceProfile = {}) {
  runpodCycle++;
  runpodHealing.cycleCount++;
  runpodHealing.lastCycleIndex = runpodCycle;

  const band = normalizeBand(deviceProfile.gpuScore > 0 ? "binary" : "symbolic");
  runpodHealing.lastBand = band;

  const bandSig = buildBandSignature(band, runpodCycle);
  const cycleSig = buildRunPodCycleSignature(runpodCycle, band);

  runpodHealing.lastBandSignatureIntel = bandSig.intel;
  runpodHealing.lastBandSignatureClassic = bandSig.classic;
  runpodHealing.lastRunPodCycleSignatureIntel = cycleSig.intel;
  runpodHealing.lastRunPodCycleSignatureClassic = cycleSig.classic;

  if (!raw) {
    const sig = buildNormalizationSignature(null, runpodCycle);
    runpodHealing.lastNormalizationError = "invalid_job";
    runpodHealing.lastNormalizationSignatureIntel = sig.intel;
    runpodHealing.lastNormalizationSignatureClassic = sig.classic;
    return null;
  }

  const jobId = raw.id || raw.jobId || null;
  const payload = raw.input || raw.payload || {};
  const priority = raw.priority || "normal";

  const normalized = {
    id: jobId,
    marketplaceId: "runpod",

    payout: 0.1,
    cpuRequired: 4,
    memoryRequired: 4096,
    estimatedSeconds: 600,

    minGpuScore: deviceProfile.gpuScore || 200,
    bandwidthNeededMbps: deviceProfile.bandwidthMbps || 10,

    payload,
    priority,
    band
  };

  const normSig = buildNormalizationSignature(jobId, runpodCycle);
  runpodHealing.lastNormalizedJobId = jobId;
  runpodHealing.lastNormalizationError = null;
  runpodHealing.lastNormalizationSignatureIntel = normSig.intel;
  runpodHealing.lastNormalizationSignatureClassic = normSig.classic;

  const binaryField = buildBinaryField(runpodCycle);
  const waveField = buildWaveField(runpodCycle, band);

  runpodHealing.lastBinaryField = binaryField;
  runpodHealing.lastWaveField = waveField;

  const presenceField = buildPresenceField(raw, deviceProfile, runpodCycle);
  const advantageField = buildAdvantageField(
    raw,
    deviceProfile,
    { band, binaryField, waveField },
    presenceField
  );
  const chunkPlan = buildChunkPrewarmPlan(raw, deviceProfile, presenceField);

  runpodHealing.lastPresenceField = presenceField;
  runpodHealing.lastAdvantageField = advantageField;
  runpodHealing.lastChunkPrewarmPlan = chunkPlan;

  return {
    ...normalized,
    presenceField,
    advantageField,
    chunkPlan
  };
}

// ============================================================================
// registerDevice — deterministic + Presence + Advantage‑C + dual‑hash
// ============================================================================

function registerDevice({ deviceId, gpuInfo = {}, meta = {} } = {}, deviceProfile = {}) {
  runpodCycle++;
  runpodHealing.cycleCount++;
  runpodHealing.lastCycleIndex = runpodCycle;

  const band = normalizeBand(deviceProfile.gpuScore > 0 ? "binary" : "symbolic");
  runpodHealing.lastBand = band;

  const bandSig = buildBandSignature(band, runpodCycle);
  const cycleSig = buildRunPodCycleSignature(runpodCycle, band);
  const regSig = buildRegisterSignature(deviceId, runpodCycle);

  runpodHealing.lastBandSignatureIntel = bandSig.intel;
  runpodHealing.lastBandSignatureClassic = bandSig.classic;
  runpodHealing.lastRunPodCycleSignatureIntel = cycleSig.intel;
  runpodHealing.lastRunPodCycleSignatureClassic = cycleSig.classic;

  runpodHealing.lastRegister = {
    deviceId,
    gpuInfo,
    meta,
    cycleIndex: runpodCycle
  };

  runpodHealing.lastRegisterSignatureIntel = regSig.intel;
  runpodHealing.lastRegisterSignatureClassic = regSig.classic;

  const binaryField = buildBinaryField(runpodCycle);
  const waveField = buildWaveField(runpodCycle, band);

  const presenceField = buildPresenceField(null, deviceProfile, runpodCycle);
  const advantageField = buildAdvantageField(
    null,
    deviceProfile,
    { band, binaryField, waveField },
    presenceField
  );
  const chunkPlan = buildChunkPrewarmPlan(null, deviceProfile, presenceField);

  runpodHealing.lastPresenceField = presenceField;
  runpodHealing.lastAdvantageField = advantageField;
  runpodHealing.lastChunkPrewarmPlan = chunkPlan;

  return {
    ok: true,
    result: {
      registered: true,
      cycleIndex: runpodCycle,
      signatureIntel: regSig.intel,
      signatureClassic: regSig.classic,
      bandSignatureIntel: bandSig.intel,
      bandSignatureClassic: bandSig.classic,
      cycleSignatureIntel: cycleSig.intel,
      cycleSignatureClassic: cycleSig.classic,
      binaryField,
      waveField,
      presenceField,
      advantageField,
      chunkPlan
    }
  };
}

// ============================================================================
// requestJob — deterministic + Presence + Advantage‑C + dual‑hash
// ============================================================================

function requestJob({ deviceId, filters = {} } = {}, deviceProfile = {}) {
  runpodCycle++;
  runpodHealing.cycleCount++;
  runpodHealing.lastCycleIndex = runpodCycle;

  const band = normalizeBand(deviceProfile.gpuScore > 0 ? "binary" : "symbolic");
  runpodHealing.lastBand = band;

  const bandSig = buildBandSignature(band, runpodCycle);
  const cycleSig = buildRunPodCycleSignature(runpodCycle, band);

  const job =
    RUNPOD_RECEPTOR_DNA.jobs[
      runpodCycle % RUNPOD_RECEPTOR_DNA.jobs.length
    ];

  const normalized = normalizeJob(job, deviceProfile);
  const jobId = normalized?.id ?? null;

  const reqSig = buildRequestSignature(jobId, runpodCycle);

  runpodHealing.lastBandSignatureIntel = bandSig.intel;
  runpodHealing.lastBandSignatureClassic = bandSig.classic;
  runpodHealing.lastRunPodCycleSignatureIntel = cycleSig.intel;
  runpodHealing.lastRunPodCycleSignatureClassic = cycleSig.classic;

  runpodHealing.lastRequest = {
    deviceId,
    filters,
    jobId,
    cycleIndex: runpodCycle
  };

  runpodHealing.lastRequestSignatureIntel = reqSig.intel;
  runpodHealing.lastRequestSignatureClassic = reqSig.classic;

  const binaryField = buildBinaryField(runpodCycle);
  const waveField = buildWaveField(runpodCycle, band);

  const presenceField = buildPresenceField(job, deviceProfile, runpodCycle);
  const advantageField = buildAdvantageField(
    job,
    deviceProfile,
    { band, binaryField, waveField },
    presenceField
  );
  const chunkPlan = buildChunkPrewarmPlan(job, deviceProfile, presenceField);

  runpodHealing.lastPresenceField = presenceField;
  runpodHealing.lastAdvantageField = advantageField;
  runpodHealing.lastChunkPrewarmPlan = chunkPlan;

  return {
    ok: true,
    job: normalized,
    signatureIntel: reqSig.intel,
    signatureClassic: reqSig.classic,
    bandSignatureIntel: bandSig.intel,
    bandSignatureClassic: bandSig.classic,
    cycleSignatureIntel: cycleSig.intel,
    cycleSignatureClassic: cycleSig.classic,
    binaryField,
    waveField,
    presenceField,
    advantageField,
    chunkPlan
  };
}

// ============================================================================
// submitJob — deterministic + Presence + Advantage‑C + dual‑hash
// ============================================================================

function submitJob({ jobId, result, error: jobError = null } = {}, deviceProfile = {}) {
  runpodCycle++;
  runpodHealing.cycleCount++;
  runpodHealing.lastCycleIndex = runpodCycle;

  const band = normalizeBand(deviceProfile.gpuScore > 0 ? "binary" : "symbolic");
  runpodHealing.lastBand = band;

  const bandSig = buildBandSignature(band, runpodCycle);
  const cycleSig = buildRunPodCycleSignature(runpodCycle, band);
  const subSig = buildSubmitSignature(jobId, runpodCycle);

  runpodHealing.lastBandSignatureIntel = bandSig.intel;
  runpodHealing.lastBandSignatureClassic = bandSig.classic;
  runpodHealing.lastRunPodCycleSignatureIntel = cycleSig.intel;
  runpodHealing.lastRunPodCycleSignatureClassic = cycleSig.classic;

  runpodHealing.lastSubmit = {
    jobId,
    result,
    jobError,
    cycleIndex: runpodCycle
  };

  runpodHealing.lastSubmitSignatureIntel = subSig.intel;
  runpodHealing.lastSubmitSignatureClassic = subSig.classic;

  const binaryField = buildBinaryField(runpodCycle);
  const waveField = buildWaveField(runpodCycle, band);

  const presenceField = buildPresenceField({ id: jobId }, deviceProfile, runpodCycle);
  const advantageField = buildAdvantageField(
    { id: jobId },
    deviceProfile,
    { band, binaryField, waveField },
    presenceField
  );
  const chunkPlan = buildChunkPrewarmPlan({ id: jobId }, deviceProfile, presenceField);

  runpodHealing.lastPresenceField = presenceField;
  runpodHealing.lastAdvantageField = advantageField;
  runpodHealing.lastChunkPrewarmPlan = chunkPlan;

  return {
    ok: true,
    result: {
      submitted: true,
      jobId,
      cycleIndex: runpodCycle,
      signatureIntel: subSig.intel,
      signatureClassic: subSig.classic,
      bandSignatureIntel: bandSig.intel,
      bandSignatureClassic: bandSig.classic,
      cycleSignatureIntel: cycleSig.intel,
      cycleSignatureClassic: cycleSig.classic,
      binaryField,
      waveField,
      presenceField,
      advantageField,
      chunkPlan,
      note: "RunPod submission simulated deterministically (v24-IMMORTAL-INTEL-PLUS, GPU-forward)."
    }
  };
}

// ============================================================================
// Exported Marketplace Organ (Unified, like Forager/Courier)
// ============================================================================

export const PulseEarnMktBroker = {
  id: "runpod",
  name: "RunPod",
  version: "v24-IMMORTAL-INTEL-PLUS",
  lineage: "RunPodAdapter-v24-IMMORTAL-INTEL-PLUS",

  registerDevice,
  requestJob,
  submitJob,
  normalizeJob
};

// ============================================================================
// Healing State Export
// ============================================================================

export function getRunPodHealingState() {
  return { ...runpodHealing };
}
