// ============================================================================
// FILE: PULSE-WORLD-OS/PULSE-MULTIVERSE/PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PULSE-BAND/PULSE-EARN/PulseEarnMktCourier-v24-IMMORTAL-INTEL++.js
// LAYER: THE COURIER (v24 IMMORTAL++ + INTEL + DualHash + Presence + Advantage + Chunk)
// Spheron GPU‑aware A‑B‑A courier
// ============================================================================

import {
  OrganismIdentity,
  buildPulseOrganismMap as buildOrganismMap
} from "../X-PULSE-X/PULSE-WORLD-MAPORGANISM.jssss
";

const Identity = OrganismIdentity(import.meta.url);



// ============================================================================
// HASH HELPERS — v24 IMMORTAL INTEL++
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
    classic: classicHash
  };
}

function normalizeBand(b) {
  const x = String(b || "symbolic").toLowerCase();
  return x === "binary" ? "binary" : "symbolic";
}

// ============================================================================
// COURIER STATE — v24 IMMORTAL INTEL++
// ============================================================================

const healingState = {
  lastPingMs: null,
  lastPingError: null,
  lastFetchCount: 0,
  lastFetchError: null,
  lastSubmitJobId: null,
  lastSubmitError: null,
  lastNormalizedJobId: null,
  lastNormalizationError: null,

  cycleCount: 0,
  lastCycleIndex: null,

  lastPingSignatureIntel: null,
  lastPingSignatureClassic: null,

  lastFetchSignatureIntel: null,
  lastFetchSignatureClassic: null,

  lastNormalizationSignatureIntel: null,
  lastNormalizationSignatureClassic: null,

  lastSubmitSignatureIntel: null,
  lastSubmitSignatureClassic: null,

  lastCourierCycleSignatureIntel: null,
  lastCourierCycleSignatureClassic: null,

  lastBand: "symbolic",
  lastBandSignatureIntel: null,
  lastBandSignatureClassic: null,

  lastBinaryField: null,
  lastWaveField: null,

  lastPresenceField: null,
  lastAdvantageField: null,
  lastChunkPrewarmPlan: null
};

let courierCycle = 0;

// ============================================================================
// SPHERON DNA (deterministic)
// ============================================================================

const SPHERON_RECEPTOR_DNA = {
  pingLatency: 42,
  jobs: [
    {
      id: "spheron-001",
      payout: 0.05,
      cpu: 2,
      memory: 2048,
      estimatedSeconds: 300,
      gpu: false,
      type: "compute"
    },
    {
      id: "spheron-002",
      payout: 0.12,
      cpu: 4,
      memory: 4096,
      estimatedSeconds: 600,
      gpu: true,
      type: "compute"
    }
  ],
  version: "v24-IMMORTAL-INTEL++",
  lineage: "Courier-Spheron-v24-IMMORTAL-INTEL++",
  phenotype: "MarketplaceReceptor"
};

// ============================================================================
// PRESENCE FIELD — v24 IMMORTAL INTEL++
// ============================================================================

function classifyPresenceTier(pressure) {
  if (pressure >= 150) return "critical";
  if (pressure >= 100) return "high";
  if (pressure >= 50) return "elevated";
  if (pressure > 0) return "soft";
  return "idle";
}

function buildPresenceField(jobOrRaw, deviceProfile = {}, cycle, globalHints = {}) {
  const ghP = globalHints.presenceContext || {};
  const mesh = globalHints.meshSignals || {};
  const castle = globalHints.castleSignals || {};
  const region = globalHints.regionContext || {};

  const meshStrength = Number(mesh.meshStrength || 0);
  const meshPressureExternal = Number(mesh.meshPressureIndex || 0);
  const castleLoadExternal = Number(castle.loadLevel || 0);

  const idLen = (jobOrRaw?.id || "").length;
  const typeLen = (jobOrRaw?.type || "").length;
  const stability = deviceProfile?.stabilityScore || 0.7;

  const internalComposite =
    idLen * 0.001 +
    typeLen * 0.001 +
    stability * 0.01;

  const internalPressure = Math.floor(internalComposite * 1000);

  const meshPressureIndex = meshPressureExternal + internalPressure;
  const castleLoadLevel = castleLoadExternal;

  const pressure = meshPressureIndex + castleLoadLevel;
  const presenceTier = classifyPresenceTier(pressure);

  const intelPayload = {
    kind: "courierPresence",
    version: "v24-IMMORTAL-INTEL++",
    presenceTier,
    meshPressureIndex,
    castleLoadLevel,
    idLen,
    typeLen,
    stability,
    cycleIndex: cycle
  };

  const classicString =
    `COURIER_PRESENCE::${presenceTier}::${meshPressureIndex}::${castleLoadLevel}`;

  const sig = buildDualHashSignature("COURIER_PRESENCE", intelPayload, classicString);

  return {
    presenceVersion: "v24-IMMORTAL-INTEL++",
    presenceTier,
    meshPressureIndex,
    castleLoadLevel,
    meshStrength,
    idLen,
    typeLen,
    stability,
    cycle,
    presenceSignatureIntel: sig.intel,
    presenceSignatureClassic: sig.classic
  };
}

// ============================================================================
// ADVANTAGE FIELD — v24 IMMORTAL INTEL++
// ============================================================================

function buildAdvantageField(jobOrRaw, deviceProfile, bandPack, presenceField, globalHints = {}) {
  const gpuScore = deviceProfile?.gpuScore || 0;
  const bandwidth = deviceProfile?.bandwidthMbps || 0;

  const density = bandPack.binaryField.binarySurface.density;
  const amplitude = bandPack.waveField.amplitude;

  const baseScore =
    gpuScore * 0.0007 +
    bandwidth * 0.00025 +
    density * 0.00001 +
    amplitude * 0.00001;

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
    kind: "courierAdvantage",
    version: "C-24.0",
    gpuScore,
    bandwidth,
    density,
    amplitude,
    presenceTier: presenceField.presenceTier,
    advantageScore,
    advantageTier,
    fallbackBandLevel
  };

  const classicString =
    `COURIER_ADVANTAGE::${presenceField.presenceTier}::${advantageTier}`;

  const sig = buildDualHashSignature("COURIER_ADVANTAGE", intelPayload, classicString);

  return {
    advantageVersion: "C-24.0",
    gpuScore,
    bandwidth,
    binaryDensity: density,
    waveAmplitude: amplitude,
    presenceTier: presenceField.presenceTier,
    advantageScore,
    advantageTier,
    fallbackBandLevel,
    advantageSignatureIntel: sig.intel,
    advantageSignatureClassic: sig.classic
  };
}

// ============================================================================
// CHUNK / PREWARM PLAN — v24 IMMORTAL INTEL++
// ============================================================================

function buildChunkPrewarmPlan(jobOrRaw, deviceProfile, presenceField, advantageField) {
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
    kind: "courierChunkPlan",
    version: "v24-IMMORTAL-INTEL++",
    priority,
    presenceTier: presenceField.presenceTier,
    advantageTier: advantageField.advantageTier
  };

  const classicString =
    `COURIER_CHUNK_PLAN::${presenceField.presenceTier}::${priority}`;

  const sig = buildDualHashSignature("COURIER_CHUNK_PLAN", intelPayload, classicString);

  return {
    planVersion: "v24-IMMORTAL-INTEL++",
    priority,
    band: presenceField.presenceTier,
    chunks: {
      receptorEnvelope: true,
      normalizationBlueprint: true
    },
    cache: {
      deviceProfile: true,
      courierDiagnostics: true
    },
    prewarm: {
      nervousSystem: true,
      muscleSystem: true,
      lymphNodes: true
    },
    chunkPlanSignatureIntel: sig.intel,
    chunkPlanSignatureClassic: sig.classic
  };
}

// ============================================================================
// A‑B‑A SURFACES — v24 IMMORTAL INTEL++
// ============================================================================

function buildBinaryField(cycle, hasGpu, presenceField) {
  const patternLen = hasGpu ? 16 : 10;
  const baseDensity = patternLen + cycle + (hasGpu ? 25 : 8);
  const mesh = Number(presenceField?.meshPressureIndex || 0);
  const castle = Number(presenceField?.castleLoadLevel || 0);
  const density = baseDensity + mesh + castle;
  const surface = density + patternLen;

  const intelPayload = {
    kind: "courierBinarySurface",
    patternLen,
    density,
    surface,
    meshPressureIndex: mesh,
    castleLoadLevel: castle,
    cycleIndex: cycle,
    hasGpu
  };

  const classicString = `COURIER_BIN::${surface}`;
  const sig = buildDualHashSignature("COURIER_BIN", intelPayload, classicString);

  return {
    binaryPhenotypeSignatureIntel: sig.intel,
    binaryPhenotypeSignatureClassic: sig.classic,
    binarySurfaceSignatureIntel: sig.intel,
    binarySurfaceSignatureClassic: sig.classic,
    binarySurface: {
      patternLen,
      density,
      meshPressureIndex: mesh,
      castleLoadLevel: castle,
      surface
    },
    parity: surface % 2 === 0 ? 0 : 1,
    shiftDepth: Math.max(0, Math.floor(Math.log2(surface || 1)))
  };
}

function buildWaveField(cycle, band, presenceField) {
  const mesh = Number(presenceField?.meshStrength || 0);
  const amplitude = (cycle + 1) * (band === "binary" ? 14 : 7) + mesh;
  const wavelength = amplitude + 5;
  const phase = (amplitude + (presenceField?.meshPressureIndex || 0)) % 16;

  const intelPayload = {
    kind: "courierWaveSurface",
    band,
    amplitude,
    wavelength,
    phase,
    meshStrength: presenceField?.meshStrength || 0,
    cycleIndex: cycle
  };

  const classicString = `COURIER_WAVE::${band}::AMP::${amplitude}`;
  const sig = buildDualHashSignature("COURIER_WAVE", intelPayload, classicString);

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
// COURIER ORGAN — v24 IMMORTAL INTEL++
// ============================================================================

export const PulseEarnMktCourier = {
  id: "spheron",
  name: "Spheron Compute",
  version: "v24-IMMORTAL-INTEL++",
  lineage: "Courier-Spheron-v24-IMMORTAL-INTEL++",

  ping(deviceProfile = {}, globalHints = {}) {
    courierCycle++;
    healingState.cycleCount++;
    healingState.lastCycleIndex = courierCycle;

    const latency = SPHERON_RECEPTOR_DNA.pingLatency;

    const band = "symbolic";
    healingState.lastBand = band;

    const bandSig = buildDualHashSignature("COURIER_BAND", { band, cycleIndex: courierCycle }, band);
    healingState.lastBandSignatureIntel = bandSig.intel;
    healingState.lastBandSignatureClassic = bandSig.classic;

    const presenceField = buildPresenceField(null, deviceProfile, courierCycle, globalHints);
    const binaryField = buildBinaryField(courierCycle, false, presenceField);
    const waveField = buildWaveField(courierCycle, band, presenceField);

    const advantageField = buildAdvantageField(
      null,
      deviceProfile,
      { band, binaryField, waveField },
      presenceField,
      globalHints
    );

    const chunkPlan = buildChunkPrewarmPlan(null, deviceProfile, presenceField, advantageField);

    const pingSig = buildDualHashSignature("COURIER_PING", { latency, cycleIndex: courierCycle }, `${latency}`);
    healingState.lastPingSignatureIntel = pingSig.intel;
    healingState.lastPingSignatureClassic = pingSig.classic;

    healingState.lastBinaryField = binaryField;
    healingState.lastWaveField = waveField;
    healingState.lastPresenceField = presenceField;
    healingState.lastAdvantageField = advantageField;
    healingState.lastChunkPrewarmPlan = chunkPlan;

    return {
      latency,
      cycleIndex: courierCycle,
      signatureIntel: pingSig.intel,
      signatureClassic: pingSig.classic,
      bandSignatureIntel: bandSig.intel,
      bandSignatureClassic: bandSig.classic,
      binaryField,
      waveField,
      presenceField,
      advantageField,
      chunkPlan
    };
  },

  fetchJobs(deviceProfile = {}, globalHints = {}) {
    courierCycle++;
    healingState.cycleCount++;
    healingState.lastCycleIndex = courierCycle;

    const rawJobs = SPHERON_RECEPTOR_DNA.jobs || [];
    const jobs = rawJobs
      .map(raw => this.normalizeJob(raw, deviceProfile, globalHints))
      .filter(j => j !== null);

    const fetchSig = buildDualHashSignature(
      "COURIER_FETCH",
      { count: jobs.length, cycleIndex: courierCycle },
      `FETCH::${jobs.length}::CYCLE::${courierCycle}`
    );

    healingState.lastFetchCount = jobs.length;
    healingState.lastFetchSignatureIntel = fetchSig.intel;
    healingState.lastFetchSignatureClassic = fetchSig.classic;

    const band = "symbolic";
    healingState.lastBand = band;

    const bandSig = buildDualHashSignature(
      "COURIER_BAND",
      { band, cycleIndex: courierCycle },
      `BAND::${band}`
    );
    healingState.lastBandSignatureIntel = bandSig.intel;
    healingState.lastBandSignatureClassic = bandSig.classic;

    const presenceField = buildPresenceField(null, deviceProfile, courierCycle, globalHints);
    const binaryField = buildBinaryField(courierCycle, false, presenceField);
    const waveField = buildWaveField(courierCycle, band, presenceField);

    const advantageField = buildAdvantageField(
      null,
      deviceProfile,
      { band, binaryField, waveField },
      presenceField,
      globalHints
    );

    const chunkPlan = buildChunkPrewarmPlan(
      null,
      deviceProfile,
      presenceField,
      advantageField
    );

    healingState.lastBinaryField = binaryField;
    healingState.lastWaveField = waveField;
    healingState.lastPresenceField = presenceField;
    healingState.lastAdvantageField = advantageField;
    healingState.lastChunkPrewarmPlan = chunkPlan;

    return {
      jobs,
      cycleIndex: courierCycle,
      signatureIntel: fetchSig.intel,
      signatureClassic: fetchSig.classic,
      bandSignatureIntel: bandSig.intel,
      bandSignatureClassic: bandSig.classic,
      binaryField,
      waveField,
      presenceField,
      advantageField,
      chunkPlan
    };
  },

  submitResult(job, result, deviceProfile = {}, globalHints = {}) {
    courierCycle++;
    healingState.cycleCount++;
    healingState.lastCycleIndex = courierCycle;

    const jobId = job?.id ?? null;
    const band = "symbolic";
    healingState.lastBand = band;

    const bandSig = buildDualHashSignature(
      "COURIER_BAND",
      { band, cycleIndex: courierCycle },
      `BAND::${band}`
    );
    healingState.lastBandSignatureIntel = bandSig.intel;
    healingState.lastBandSignatureClassic = bandSig.classic;

    const presenceField = buildPresenceField(job, deviceProfile, courierCycle, globalHints);
    const binaryField = buildBinaryField(courierCycle, !!job?.gpu, presenceField);
    const waveField = buildWaveField(courierCycle, band, presenceField);

    const advantageField = buildAdvantageField(
      job,
      deviceProfile,
      { band, binaryField, waveField },
      presenceField,
      globalHints
    );

    const chunkPlan = buildChunkPrewarmPlan(
      job,
      deviceProfile,
      presenceField,
      advantageField
    );

    const submitSig = buildDualHashSignature(
      "COURIER_SUBMIT",
      { jobId, cycleIndex: courierCycle },
      `SUBMIT::${jobId}::CYCLE::${courierCycle}`
    );

    healingState.lastSubmitJobId = jobId;
    healingState.lastSubmitSignatureIntel = submitSig.intel;
    healingState.lastSubmitSignatureClassic = submitSig.classic;

    healingState.lastBinaryField = binaryField;
    healingState.lastWaveField = waveField;
    healingState.lastPresenceField = presenceField;
    healingState.lastAdvantageField = advantageField;
    healingState.lastChunkPrewarmPlan = chunkPlan;

    return {
      ok: true,
      marketplace: "spheron",
      jobId,
      cycleIndex: courierCycle,
      signatureIntel: submitSig.intel,
      signatureClassic: submitSig.classic,
      bandSignatureIntel: bandSig.intel,
      bandSignatureClassic: bandSig.classic,
      binaryField,
      waveField,
      presenceField,
      advantageField,
      chunkPlan,
      result
    };
  },

  normalizeJob(raw, deviceProfile = {}, globalHints = {}) {
    try {
      if (!raw || typeof raw !== "object" || !raw.id) {
        const sig = buildDualHashSignature("COURIER_NORM", { jobId: null }, "NORM::NONE");
        healingState.lastNormalizationError = "invalid_raw_job";
        healingState.lastNormalizedJobId = null;
        healingState.lastNormalizationSignatureIntel = sig.intel;
        healingState.lastNormalizationSignatureClassic = sig.classic;
        return null;
      }

      const payout = Number(raw.payout ?? 0);
      if (!Number.isFinite(payout) || payout <= 0) {
        const sig = buildDualHashSignature("COURIER_NORM", { jobId: null }, "NORM::NONE");
        healingState.lastNormalizationError = "non_positive_payout";
        healingState.lastNormalizedJobId = null;
        healingState.lastNormalizationSignatureIntel = sig.intel;
        healingState.lastNormalizationSignatureClassic = sig.classic;
        return null;
      }

      const cpuRequired = Number(raw.cpu ?? 1);
      const memoryRequired = Number(raw.memory ?? 1024);
      const estimatedSeconds = Number(raw.estimatedSeconds ?? 600);

      if (!Number.isFinite(estimatedSeconds) || estimatedSeconds <= 0) {
        const sig = buildDualHashSignature("COURIER_NORM", { jobId: null }, "NORM::NONE");
        healingState.lastNormalizationError = "non_positive_duration";
        healingState.lastNormalizedJobId = null;
        healingState.lastNormalizationSignatureIntel = sig.intel;
        healingState.lastNormalizationSignatureClassic = sig.classic;
        return null;
      }

      const gpuFlag = !!raw.gpu;
      const band = gpuFlag ? "binary" : "symbolic";

      const presenceField = buildPresenceField(raw, deviceProfile, courierCycle, globalHints);
      const binaryField = buildBinaryField(courierCycle, gpuFlag, presenceField);
      const waveField = buildWaveField(courierCycle, band, presenceField);

      const advantageField = buildAdvantageField(
        raw,
        deviceProfile,
        { band, binaryField, waveField },
        presenceField,
        globalHints
      );

      const chunkPlan = buildChunkPrewarmPlan(
        raw,
        deviceProfile,
        presenceField,
        advantageField
      );

      const normalized = {
        id: String(raw.id),
        marketplaceId: "spheron",

        payout,
        cpuRequired,
        memoryRequired,
        estimatedSeconds,

        minGpuScore: gpuFlag ? 300 : 100,
        bandwidthNeededMbps: 5,

        _abaBand: band,
        _abaBinaryDensity: binaryField.binarySurface.density,
        _abaWaveAmplitude: waveField.amplitude,

        presenceField,
        advantageField,
        chunkPlan
      };

      const sig = buildDualHashSignature(
        "COURIER_NORM",
        { jobId: normalized.id, cycleIndex: courierCycle },
        `NORM::${normalized.id}`
      );

      healingState.lastNormalizedJobId = normalized.id;
      healingState.lastNormalizationError = null;
      healingState.lastNormalizationSignatureIntel = sig.intel;
      healingState.lastNormalizationSignatureClassic = sig.classic;

      return normalized;

    } catch (err) {
      const sig = buildDualHashSignature("COURIER_NORM", { jobId: null }, "NORM::NONE");
      healingState.lastNormalizationError = err?.message || String(err);
      healingState.lastNormalizedJobId = null;
      healingState.lastNormalizationSignatureIntel = sig.intel;
      healingState.lastNormalizationSignatureClassic = sig.classic;
      return null;
    }
  }
};

// ============================================================================
// HEALING STATE EXPORT
// ============================================================================

export function getPulseEarnMktCourierHealingState() {
  return { ...healingState };
}
