// ============================================================================
//  PulseEarnNervousSystem-v16-Superior.js
//  THE NERVOUS SYSTEM + EXCHANGE OFFICE (v16-Superior + Advantage‑M‑16)
//  Skeletal-aware Job Intake + Result Forwarding + Reputation Updating
//  Dual-Band + Dual-Hash + Binary + Wave + Presence + Chunk/Prewarm (IMMORTAL)
// ============================================================================

/*
AI_EXPERIENCE_META = {
  identity: "PulseEarnNervousSystem",
  version: "v16-Superior",
  layer: "earn_nervous",
  role: "earn_signal_router",
  lineage: "PulseEarnNervousSystem-v10.4 → v11-Evo → v13-Presence → v16-Immortal → v16-Superior",

  evo: {
    nervousSystem: true,
    signalRouting: true,
    sensoryIntake: true,
    motorOutput: true,

    dualBand: true,
    dualHash: true,
    intelHash: true,

    skeletalAware: true,
    skeletalAdvantageAware: true,
    skeletalChunkAware: true,

    symbolicPrimary: true,
    binaryAware: true,

    deterministic: true,
    driftProof: true,
    pureCompute: true,
    zeroNetwork: true,
    zeroFilesystem: true,
    zeroMutationOfInput: true
  },

  contract: {
    always: [
      "PulseEarnMuscleSystem",
      "PulseEarnReflexRouter",
      "PulseEarnSkeletalSystem",
      "PulseEarnEndocrineSystem",
      "PulseEarnLymphNodes",
      "PulseEarnCirculatorySystem"
    ],
    never: [
      "safeRoute",
      "fetchViaCNS"
    ]
  }
}
*/

export const PulseEarnNervousSystemMeta = Object.freeze({
  layer: "PulseEarnNervousSystem",
  role: "EARN_NERVOUS_ORGAN",
  version: "v16-Superior",
  identity: "PulseEarnNervousSystem-v16-Superior",

  guarantees: Object.freeze({
    deterministic: true,
    driftProof: true,
    noRandomness: true,
    noRealTime: true,
    noExternalIO: true,
    pureInterface: true,

    dualBandAware: true,
    binaryAware: true,
    waveFieldAware: true,
    presenceAware: true,
    advantageAware: true,
    chunkPrewarmAware: true,
    healingMetadataAware: true,

    dualHashAware: true,
    intelHashAware: true,
    skeletalAdvantageAware: true,
    skeletalChunkAware: true,

    worldLensAware: false,
    zeroNetwork: true,
    zeroAsync: true,
    zeroAI: true,
    zeroUserCode: true,
    deterministicReputationUpdates: true,
    deterministicJobIntake: true,
    deterministicResultForwarding: true
  }),

  contract: Object.freeze({
    input: [
      "MarketplaceJob",
      "DeviceProfile",
      "DualBandContext",
      "ReputationSignals",
      "CirculatoryRouting",
      "DevicePhenotypePresence"
    ],
    output: [
      "NervousJobIntakeResult",
      "NervousResultForwardingResult",
      "NervousDiagnostics",
      "NervousSignatures",
      "NervousHealingState",
      "NervousPresenceField",
      "NervousAdvantageField",
      "NervousChunkPrewarmPlan"
    ]
  }),

  bands: Object.freeze({
    supported: ["symbolic", "binary"],
    default: "symbolic",
    behavior: "metadata-only"
  }),

  architecture: Object.freeze({
    pattern: "A-B-A",
    baseline: "deterministic sensory intake → deterministic motor output",
    adaptive: "binary/wave surfaces + dual-band signatures + presence/advantage fields + dual-hash intel surfaces",
    return: "deterministic job intake + deterministic result forwarding + prewarm hints"
  })
});

// ---------------------------------------------------------------------------
// Imports — v16 / v13.1 organs
// ---------------------------------------------------------------------------
import {
  updateMarketplaceReputation,
  computeReputationSignals
} from "./PulseEarnEndocrineSystem.js";

import { getNextJob } from "./PulseEarnCirculatorySystem.js";
import {
  getPulseEarnDeviceProfile
} from "./PulseEarnSkeletalSystem.js";

import { sendResultToMarketplace } from "./PulseEarnLymphNodes.js";

// ============================================================================
// Healing Metadata — Neural Activity Log (v16-Superior)
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

  // v16 dual-hash / intel surfaces
  lastDualHash: null,
  lastIntelHash: null,
  lastIntelContext: null,

  // Skeletal awareness
  lastSkeletalAdvantageField: null,
  lastSkeletalChunkField: null
};

// ============================================================================
// Deterministic Hash Helpers (v16 dual-hash + intel)
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
// Dual-Band + Binary + Wave Builder — v16-Superior
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
  const bandDual = buildDualHashSignature("NERVOUS_BAND_V16_SUP", bandSigPayload);
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
    binaryNervousSignature: computeHash(`BNERV_SUP::${surface}`),
    binarySurfaceSignature: computeHash(`BSURF_NERV_SUP::${surface}`),
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
// Presence Field — v16-Superior (descriptive-only, M-16 compatible)
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
  const sig = buildDualHashSignature("NERV_PRESENCE_V16_SUP", payload);

  const presenceField = {
    presenceVersion: "v16-Superior",
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
// Advantage‑M‑16-Superior — merges skeletal + nervous structural view
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
  const sig = buildDualHashSignature("NERV_ADV_M16_SUP", payload);

  const advantageField = {
    advantageVersion: "M-16.0-Superior",
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
// Chunk / Cache / Prewarm Plan — v16-Superior (spine-aware)
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
  const sig = buildDualHashSignature("NERV_CHUNK_M16_SUP", payload);

  const plan = {
    planVersion: "v16-AdvantageM-Superior",
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
// fetchJobFromMarketplace — Sensory Intake (v16-Superior)
// ============================================================================
export function fetchJobFromMarketplace() {
  nervousHealing.cycleCount++;

  try {
    const device = getPulseEarnDeviceProfile();
    const devicePattern = buildDevicePattern(device);
    nervousHealing.lastDevicePattern = devicePattern;

    const capacity = {
      cpuAvailable: device.cpuCores,
      memoryAvailable: device.memoryMB
    };

    const job = getNextJob(capacity);

    if (job) {
      nervousHealing.lastJobId = job.id;
      nervousHealing.lastMarketplaceId = job.marketplaceId;
      nervousHealing.lastJobPattern = buildJobPattern(job);

      const intakeSig = buildDualHashSignature("NERV_JOB_INTAKE_V16_SUP", {
        jobId: job.id,
        marketplaceId: job.marketplaceId,
        cycle: nervousHealing.cycleCount
      });
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

      return {
        job,
        band: bandPack.band,
        bandSignature: bandPack.bandSignature,
        binaryField: bandPack.binaryField,
        waveField: bandPack.waveField,
        presenceField,
        advantageField,
        chunkPrewarmPlan,
        dualHash: nervousHealing.lastDualHash,
        intelHash: nervousHealing.lastIntelHash
      };
    }

    return null;

  } catch (err) {
    nervousHealing.lastFetchError = err.message;
    return null;
  }
}

// ============================================================================
// getNextMarketplaceJob — Neural Encoding Layer (v16-Superior)
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

    dualHash: intake.dualHash,
    intelHash: intake.intelHash
  };
}

// ============================================================================
// submitMarketplaceResult — Motor Output + Synaptic Update (v16-Superior)
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

    const forwardSig = buildDualHashSignature("NERV_RESULT_FORWARD_V16_SUP", {
      jobId: job.id,
      marketplaceId: job.marketplaceId,
      jobSuccessRate: result.jobSuccessRate ?? 0
    });
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

    return {
      submission,
      band: bandPack.band,
      bandSignature: bandPack.bandSignature,
      binaryField: bandPack.binaryField,
      waveField: bandPack.waveField,
      presenceField,
      advantageField,
      chunkPrewarmPlan,
      dualHash: nervousHealing.lastDualHash,
      intelHash: nervousHealing.lastIntelHash
    };

  } catch (err) {
    nervousHealing.lastSubmitError = err.message;
    return null;
  }
}

// ============================================================================
// Nervous System Signature (v16-Superior dual-hash)
// ============================================================================
function buildNervousSignature() {
  const payload = {
    lastJobId: nervousHealing.lastJobId,
    lastMarketplaceId: nervousHealing.lastMarketplaceId,
    cycleCount: nervousHealing.cycleCount
  };
  const sig = buildDualHashSignature("NERV_SYSTEM_V16_SUP", payload);
  return { primary: sig.primary, intel: sig.intel };
}

// ============================================================================
// Export Healing Metadata — Nervous System Health Report (v16-Superior)
// ============================================================================
export function getPulseEarnNervousSystemHealingState() {
  const sig = buildNervousSignature();
  nervousHealing.lastNervousSignature = sig.primary;
  nervousHealing.lastIntelHash = sig.intel;
  return { ...nervousHealing };
}
