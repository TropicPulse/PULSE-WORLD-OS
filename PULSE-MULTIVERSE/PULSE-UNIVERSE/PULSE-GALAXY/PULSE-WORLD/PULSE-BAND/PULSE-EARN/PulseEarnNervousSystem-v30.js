// ============================================================================
//  PulseEarnNervousSystem-v30E-Immortal-INTEL-Superior.js
//  THE NERVOUS SYSTEM + EXCHANGE OFFICE (v30E-Immortal-INTEL-Superior)
//  Skeletal-aware Job Intake + Result Forwarding + Reputation Updating
//  Dual-Band + Dual-Hash + Binary + Wave + Presence + Chunk/Prewarm (IMMORTAL)
//  + NervousComputeProfile + NervousPressureProfile + Tri-Heart Overlays (30E)
//  + v30E binary-density / wave-amplitude aware routing + advantage fusion
// ============================================================================

import {
  updateMarketplaceReputation,
  computeReputationSignals
} from "./PulseEarnEndocrineSystem-v30.js";

import { getNextJob } from "./PulseEarnCirculatorySystem-v24.js";
import { getPulseEarnDeviceProfile } from "./PulseEarnSkeletalSystem-v24.js";
import { sendResultToMarketplace } from "./PulseEarnLymphNodes-v24.js";

// ============================================================================
// Healing Metadata — Neural Activity Log (v30E-Immortal-INTEL-Superior)
// ============================================================================
const nervousHealing = {
  lastFetchError: null,
  lastSubmitError: null,
  lastJobId: null,
  lastMarketplaceId: null,

  lastNervousSignature: null,
  lastJobIntakeSignature: null,
  lastResultForwardSignature: null,

  lastDevicePattern: null,
  lastJobPattern: null,

  cycleCount: 0,

  loopTheory: {
    routingCompletion: true,
    allowLoopfieldPropulsion: true,
    pulseComputeContinuity: true,
    errorRouteAround: true
  },

  // Dual-Band + Binary + Wave + Presence
  lastBand: "symbolic",
  lastBandSignature: null,
  lastBinaryField: null,
  lastWaveField: null,

  lastPresenceField: null,
  lastAdvantageField: null,
  lastChunkPrewarmPlan: null,

  // dual-hash / intel surfaces
  lastDualHash: null,
  lastIntelHash: null,
  lastIntelContext: null,

  // Skeletal awareness
  lastSkeletalAdvantageField: null,
  lastSkeletalChunkField: null,

  // v30E nervous overlays
  lastNervousComputeProfile: null,
  lastNervousPressureProfile: null,

  // v30E tri-heart overlays
  triHeartLiveness: null,
  triHeartAdvantage: null,
  triHeartSpeed: null,
  triHeartPresence: null
};

// ============================================================================
// Deterministic Hash Helpers (dual-hash + intel)
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
    classic: classicHash,
    primary: classicHash
  };
}

function normalizeBand(band) {
  const b = String(band || "symbolic").toLowerCase();
  return b === "binary" ? "binary" : "symbolic";
}

// ============================================================================
// Pattern Builders
// ============================================================================
function buildDevicePattern(device) {
  return (
    `DEVICE::cpu:${device.cpuCores}` +
    `::mem:${device.memoryMB}` +
    `::gpu:${device.gpuScore}` +
    `::bw:${device.bandwidthMbps}` +
    `::stab:${device.stabilityScore}` +
    `::band:${device.band}` +
    `::presence:${device.presenceBand}`
  );
}

function buildJobPattern(job) {
  if (!job) return "JOB::NONE";
  return (
    `JOB::${job.id}` +
    `::market:${job.marketplaceId}` +
    `::cpu:${job.cpuRequired ?? 0}` +
    `::mem:${job.memoryRequired ?? 0}` +
    `::sec:${job.estimatedSeconds ?? 0}`
  );
}

// ============================================================================
// Dual-Band + Binary + Wave Builder — v30E
// ============================================================================
function buildNervousBandBinaryWave(job, result, cycleIndex, device) {
  const band = normalizeBand(
    result?.band ||
      job?.band ||
      job?.meta?.band ||
      device?.band ||
      "symbolic"
  );
  nervousHealing.lastBand = band;

  const bandSigPayload = {
    band,
    cycleIndex,
    jobId: job?.id || null,
    marketplaceId: job?.marketplaceId || null
  };
  const bandDual = buildDualHashSignature(
    "NERVOUS_BAND_V30E",
    bandSigPayload,
    `${band}::${cycleIndex}::${job?.id || "NONE"}`
  );
  const bandSignature = bandDual.primary;

  nervousHealing.lastBandSignature = bandSignature;
  nervousHealing.lastDualHash = bandDual.primary;
  nervousHealing.lastIntelHash = bandDual.intel;
  nervousHealing.lastIntelContext = bandSigPayload;

  const jobIdLength = (job?.id || "").length;
  const marketplaceLength = (job?.marketplaceId || "").length;
  const gpuScore = device?.gpuScore || 0;

  const surface = jobIdLength + marketplaceLength + gpuScore + cycleIndex;

  const binaryField = {
    binaryNervousSignature: computeHash(`BNERV_V30E::${surface}`),
    binarySurfaceSignature: computeHash(`BSURF_NERV_V30E::${surface}`),
    binarySurface: {
      jobIdLength,
      marketplaceLength,
      gpuScore,
      cycle: cycleIndex,
      surface
    },
    parity: surface % 2 === 0 ? 0 : 1,
    density: marketplaceLength + gpuScore,
    shiftDepth: Math.max(0, Math.floor(Math.log2(surface || 1)))
  };
  nervousHealing.lastBinaryField = binaryField;

  const waveField = {
    amplitude: marketplaceLength + gpuScore,
    wavelength: cycleIndex || 1,
    phase: (marketplaceLength + cycleIndex) % 16,
    band,
    mode: band === "binary" ? "compression-wave" : "symbolic-wave"
  };
  nervousHealing.lastWaveField = waveField;

  return { band, bandSignature, binaryField, waveField, bandDual };
}

// ============================================================================
// Presence Field — v30E (descriptive-only)
// ============================================================================
function buildNervousPresenceField(job, device, cycleIndex) {
  const jobLen = (job?.id || "").length;
  const marketLen = (job?.marketplaceId || "").length;
  const stability = device?.stabilityScore ?? 0.7;

  const magnitude = jobLen + marketLen;
  let presenceTier = "presence_idle";
  if (magnitude >= 40) presenceTier = "presence_high";
  else if (magnitude >= 10) presenceTier = "presence_mid";
  else if (magnitude > 0) presenceTier = "presence_low";

  const payload = {
    presenceTier,
    jobLen,
    marketLen,
    stability,
    cycleIndex,
    skeletalPresenceBand: device.presenceBand,
    skeletalChunkSurface: device.chunkField?.surface ?? null
  };
  const sig = buildDualHashSignature(
    "NERV_PRESENCE_V30E",
    payload,
    `${presenceTier}::${jobLen}::${marketLen}`
  );

  const presenceField = {
    presenceVersion: "v30E-Immortal-INTEL-Superior",
    presenceTier,
    jobLen,
    marketLen,
    stability,
    cycleIndex,
    skeletalPresenceBand: device.presenceBand,
    skeletalChunkSurface: device.chunkField?.surface ?? null,
    presenceSignature: sig.primary,
    presenceIntelSignature: sig.intel
  };

  nervousHealing.lastPresenceField = presenceField;
  return presenceField;
}

// ============================================================================
// Advantage‑M‑30E — merges skeletal + nervous structural view
// ============================================================================
function buildNervousAdvantageField(job, device, bandPack, presenceField) {
  const gpuScore = device?.gpuScore || 0;
  const bandwidth = device?.bandwidthMbps || 0;
  const density = bandPack.binaryField.density;
  const amplitude = bandPack.waveField.amplitude;

  const skeletalAdv = device.advantageField || null;
  nervousHealing.lastSkeletalAdvantageField = skeletalAdv || null;

  const skeletalScore = skeletalAdv?.advantageScore ?? 0;

  const combinedScore =
    skeletalScore +
    gpuScore * 0.0002 +
    bandwidth * 0.0001 +
    density * 0.00001 +
    amplitude * 0.00001;

  const payload = {
    band: bandPack.band,
    gpuScore,
    bandwidth,
    density,
    amplitude,
    presenceTier: presenceField.presenceTier,
    skeletalAdvantageScore: skeletalScore,
    combinedScore
  };
  const sig = buildDualHashSignature(
    "NERV_ADV_M30E",
    payload,
    `${bandPack.band}::${combinedScore}`
  );

  const advantageField = {
    advantageVersion: "M-30E.0-Superior",
    band: bandPack.band,
    gpuScore,
    bandwidth,
    binaryDensity: density,
    waveAmplitude: amplitude,
    presenceTier: presenceField.presenceTier,
    skeletalAdvantageScore: skeletalScore,
    combinedAdvantageScore: combinedScore,
    advantageSignature: sig.primary,
    advantageIntelSignature: sig.intel
  };

  nervousHealing.lastAdvantageField = advantageField;
  return advantageField;
}

// ============================================================================
// Chunk / Cache / Prewarm Plan — v30E (spine-aware)
// ============================================================================
function buildNervousChunkPrewarmPlan(job, device, presenceField) {
  let priorityLabel = "normal";
  if (presenceField.presenceTier === "presence_high") priorityLabel = "high";
  else if (presenceField.presenceTier === "presence_mid") priorityLabel = "medium";
  else if (presenceField.presenceTier === "presence_low") priorityLabel = "low";

  const skeletalChunk = device.chunkField || null;
  nervousHealing.lastSkeletalChunkField = skeletalChunk;

  const payload = {
    priorityLabel,
    presenceTier: presenceField.presenceTier,
    jobId: job?.id || null,
    marketplaceId: job?.marketplaceId || null,
    skeletalChunkSurface: skeletalChunk?.surface ?? null,
    skeletalChunkBudgetKB: skeletalChunk?.chunkBudgetKB ?? null
  };
  const sig = buildDualHashSignature(
    "NERV_CHUNK_M30E",
    payload,
    `${priorityLabel}::${presenceField.presenceTier}`
  );

  const plan = {
    planVersion: "v30E-AdvantageM-Superior",
    priorityLabel,
    bandPresence: presenceField.presenceTier,
    chunks: {
      jobEnvelope: true,
      metabolismBlueprint: true,
      marketplaceHandshake: true
    },
    cache: {
      deviceProfile: true,
      nervousDiagnostics: true,
      skeletalProfile: true
    },
    prewarm: {
      survivalInstincts: true,
      circulatorySystem: presenceField.presenceTier !== "presence_idle",
      lymphNodes: presenceField.presenceTier !== "presence_idle"
    },
    skeletalChunkField: skeletalChunk,
    chunkSignature: sig.primary,
    chunkIntelSignature: sig.intel
  };

  nervousHealing.lastChunkPrewarmPlan = plan;
  return plan;
}

// ============================================================================
// Nervous Compute Profile + Pressure Profile + Tri-Heart (30E)
// ============================================================================
function buildNervousComputeProfile(device, bandPack) {
  const gpuScore = device?.gpuScore || 0;
  const bandwidth = device?.bandwidthMbps || 0;

  const computeTier =
    gpuScore >= 8000 ? "tier_ultra" :
    gpuScore >= 4000 ? "tier_high" :
    gpuScore >= 1000 ? "tier_mid" :
    "tier_low";

  const profile = {
    profileVersion: "NERV-COMPUTE-30E",
    routeBand: bandPack.band,
    gpuScore,
    bandwidthMbps: bandwidth,
    computeTier,
    binaryDensity: bandPack.binaryField.density,
    waveAmplitude: bandPack.waveField.amplitude
  };

  nervousHealing.lastNervousComputeProfile = profile;
  return profile;
}

function buildNervousPressureProfile(presenceField, advantageField) {
  const magnitude =
    (presenceField.jobLen || 0) +
    (presenceField.marketLen || 0) +
    (advantageField.combinedAdvantageScore || 0);

  let pressureTier = "pressure_idle";
  if (magnitude >= 80) pressureTier = "pressure_critical";
  else if (magnitude >= 40) pressureTier = "pressure_high";
  else if (magnitude >= 15) pressureTier = "pressure_elevated";
  else if (magnitude > 0) pressureTier = "pressure_soft";

  const profile = {
    profileVersion: "NERV-PRESSURE-30E",
    pressureTier,
    presenceTier: presenceField.presenceTier,
    combinedAdvantageScore: advantageField.combinedAdvantageScore || 0,
    jobLen: presenceField.jobLen || 0,
    marketLen: presenceField.marketLen || 0
  };

  nervousHealing.lastNervousPressureProfile = profile;
  return profile;
}

function buildTriHeartFields(presenceField, advantageField) {
  const liveness = {
    triHeartVersion: "NERV-TRI-30E",
    alive: true,
    presenceTier: presenceField.presenceTier
  };

  const advantage = {
    triHeartVersion: "NERV-TRI-30E",
    combinedAdvantageScore: advantageField.combinedAdvantageScore ?? 0,
    skeletalAdvantageScore: advantageField.skeletalAdvantageScore ?? 0
  };

  const speed = {
    triHeartVersion: "NERV-TRI-30E",
    routingSpeedTier: presenceField.presenceTier,
    routingContinuity: nervousHealing.loopTheory.pulseComputeContinuity
  };

  const presence = {
    triHeartVersion: "NERV-TRI-30E",
    presenceTier: presenceField.presenceTier,
    skeletalPresenceBand: presenceField.skeletalPresenceBand
  };

  nervousHealing.triHeartLiveness = liveness;
  nervousHealing.triHeartAdvantage = advantage;
  nervousHealing.triHeartSpeed = speed;
  nervousHealing.triHeartPresence = presence;

  return { liveness, advantage, speed, presence };
}

// ============================================================================
// fetchJobFromMarketplace — Sensory Intake (v30E)
// NOTE: assumes getNextJob() is already wired to circulatory system.
// ============================================================================
export function fetchJobFromMarketplace() {
  nervousHealing.cycleCount++;

  try {
    const device = getPulseEarnDeviceProfile();
    const devicePattern = buildDevicePattern(device);
    nervousHealing.lastDevicePattern = devicePattern;

    // v30E: circulatory already encodes capabilityModel; here we pass device as capabilityModel
    const job = getNextJob(device);

    if (job) {
      nervousHealing.lastJobId = job.id;
      nervousHealing.lastMarketplaceId = job.marketplaceId;
      nervousHealing.lastJobPattern = buildJobPattern(job);

      const intakeSig = buildDualHashSignature(
        "NERV_JOB_INTAKE_V30E",
        {
          jobId: job.id,
          marketplaceId: job.marketplaceId,
          cycle: nervousHealing.cycleCount
        },
        `${job.id}::${job.marketplaceId}::${nervousHealing.cycleCount}`
      );
      nervousHealing.lastJobIntakeSignature = intakeSig.primary;

      const bandPack = buildNervousBandBinaryWave(
        job,
        null,
        nervousHealing.cycleCount,
        device
      );
      const presenceField = buildNervousPresenceField(
        job,
        device,
        nervousHealing.cycleCount
      );
      const advantageField = buildNervousAdvantageField(
        job,
        device,
        bandPack,
        presenceField
      );
      const chunkPrewarmPlan = buildNervousChunkPrewarmPlan(
        job,
        device,
        presenceField
      );
      const nervousComputeProfile = buildNervousComputeProfile(
        device,
        bandPack
      );
      const nervousPressureProfile = buildNervousPressureProfile(
        presenceField,
        advantageField
      );
      const triHeart = buildTriHeartFields(presenceField, advantageField);

      return {
        job,
        band: bandPack.band,
        bandSignature: bandPack.bandSignature,
        binaryField: bandPack.binaryField,
        waveField: bandPack.waveField,
        presenceField,
        advantageField,
        chunkPrewarmPlan,
        nervousComputeProfile,
        nervousPressureProfile,
        triHeartLivenessField: triHeart.liveness,
        triHeartAdvantageField: triHeart.advantage,
        triHeartSpeedField: triHeart.speed,
        triHeartPresenceField: triHeart.presence,
        dualHash: nervousHealing.lastDualHash,
        intelHash: nervousHealing.lastIntelHash
      };
    }

    return null;
  } catch (err) {
    nervousHealing.lastFetchError = err && err.message ? err.message : String(err);
    return null;
  }
}

// ============================================================================
// getNextMarketplaceJob — Neural Encoding Layer (v30E)
// ============================================================================
export function getNextMarketplaceJob(deviceId) {
  const intake = fetchJobFromMarketplace();
  if (!intake || !intake.job) return null;

  const job = intake.job;

  if (!job.id || !job.marketplaceId) {
    nervousHealing.lastFetchError = "invalid_job_structure";
    return null;
  }

  return {
    id: job.id,

    payload: {
      type: "marketplace-job",
      data: {
        marketplaceId: job.marketplaceId,
        cpuRequired: job.cpuRequired ?? 0,
        memoryRequired: job.memoryRequired ?? 0,
        estimatedSeconds: job.estimatedSeconds ?? 0
      },
      gpu: {
        workgroupSize: 1,
        iterations: 1,
        shader: ""
      }
    },

    marketplace: job.marketplaceId,
    assignedTo: deviceId,

    cycleIndex: nervousHealing.cycleCount,

    band: intake.band,
    bandSignature: intake.bandSignature,
    binaryField: intake.binaryField,
    waveField: intake.waveField,
    presenceField: intake.presenceField,
    advantageField: intake.advantageField,
    chunkPrewarmPlan: intake.chunkPrewarmPlan,
    nervousComputeProfile: intake.nervousComputeProfile,
    nervousPressureProfile: intake.nervousPressureProfile,
    triHeartLivenessField: intake.triHeartLivenessField,
    triHeartAdvantageField: intake.triHeartAdvantageField,
    triHeartSpeedField: intake.triHeartSpeedField,
    triHeartPresenceField: intake.triHeartPresenceField,

    dualHash: intake.dualHash,
    intelHash: intake.intelHash
  };
}

// ============================================================================
// submitMarketplaceResult — Motor Output + Synaptic Update (v30E)
// ============================================================================
export function submitMarketplaceResult(job, result) {
  try {
    if (!job || !job.marketplaceId) {
      nervousHealing.lastSubmitError = "invalid_job_for_submission";
      return null;
    }

    const device = getPulseEarnDeviceProfile();

    const signals = computeReputationSignals({
      latencyMs: result.latencyMs ?? 0,
      apiErrors: result.apiErrors ?? 0,
      jobsReturned: result.jobsReturned ?? 0,
      profitableJobs: result.profitableJobs ?? 0,
      jobSuccessRate: result.jobSuccessRate ?? 0,
      avgProfitPerJob: result.avgProfitPerJob ?? 0
    });

    updateMarketplaceReputation(job.marketplaceId, signals);

    const submission = sendResultToMarketplace(job, result);

    const forwardSig = buildDualHashSignature(
      "NERV_RESULT_FORWARD_V30E",
      {
        jobId: job.id,
        marketplaceId: job.marketplaceId,
        jobSuccessRate: result.jobSuccessRate ?? 0
      },
      `${job.id}::${job.marketplaceId}`
    );
    nervousHealing.lastResultForwardSignature = forwardSig.primary;

    const bandPack = buildNervousBandBinaryWave(
      job,
      result,
      nervousHealing.cycleCount,
      device
    );
    const presenceField = buildNervousPresenceField(
      job,
      device,
      nervousHealing.cycleCount
    );
    const advantageField = buildNervousAdvantageField(
      job,
      device,
      bandPack,
      presenceField
    );
    const chunkPrewarmPlan = buildNervousChunkPrewarmPlan(
      job,
      device,
      presenceField
    );
    const nervousComputeProfile = buildNervousComputeProfile(
      device,
      bandPack
    );
    const nervousPressureProfile = buildNervousPressureProfile(
      presenceField,
      advantageField
    );
    const triHeart = buildTriHeartFields(presenceField, advantageField);

    return {
      submission,
      band: bandPack.band,
      bandSignature: bandPack.bandSignature,
      binaryField: bandPack.binaryField,
      waveField: bandPack.waveField,
      presenceField,
      advantageField,
      chunkPrewarmPlan,
      nervousComputeProfile,
      nervousPressureProfile,
      triHeartLivenessField: triHeart.liveness,
      triHeartAdvantageField: triHeart.advantage,
      triHeartSpeedField: triHeart.speed,
      triHeartPresenceField: triHeart.presence,
      dualHash: nervousHealing.lastDualHash,
      intelHash: nervousHealing.lastIntelHash
    };
  } catch (err) {
    nervousHealing.lastSubmitError = err && err.message ? err.message : String(err);
    return null;
  }
}

// ============================================================================
// Nervous System Signature (v30E dual-hash)
// ============================================================================
function buildNervousSignature() {
  const payload = {
    lastJobId: nervousHealing.lastJobId,
    lastMarketplaceId: nervousHealing.lastMarketplaceId,
    cycleCount: nervousHealing.cycleCount
  };
  const sig = buildDualHashSignature("NERV_SYSTEM_V30E", payload, JSON.stringify(payload));
  return { primary: sig.primary, intel: sig.intel };
}

// ============================================================================
// Export Healing Metadata — Nervous System Health Report (v30E)
// ============================================================================
export function getPulseEarnNervousSystemHealingState() {
  const sig = buildNervousSignature();
  nervousHealing.lastNervousSignature = sig.primary;
  nervousHealing.lastIntelHash = sig.intel;
  return { ...nervousHealing };
}
