// ============================================================================
// FILE: PULSE-WORLD-OS/PULSE-MULTIVERSE/PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PULSE-BAND/PULSE-EARN/PulseEarnMktForager-v24-IMMORTAL-INTEL++.js
// LAYER: THE FORAGER — Salad Marketplace Receptor
//        v24 IMMORTAL++ + INTEL + DualHash + Presence + Advantage-C + Chunk
//        + A-B-A Binary/Wave Surfaces + GPU-Aware Normalization
// ============================================================================

//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝

// 2 — EXPORT GENOME METADATA


// ============================================================================
// HASH HELPERS — v24 IMMORTAL++ INTEL (dual-hash)
// ============================================================================

function computeHashClassic(str) {
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
  const classicHash = computeHashClassic(
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

function safeGet(obj, path, fallback = null) {
  try {
    return path
      .split(".")
      .reduce((o, k) => (o && o[k] !== undefined ? o[k] : null), obj) ?? fallback;
  } catch {
    return fallback;
  }
}

// ============================================================================
// Unified v24 Presence Tier
// ============================================================================
function classifyPresenceTier(pressure) {
  if (pressure >= 150) return "critical";
  if (pressure >= 100) return "high";
  if (pressure >= 50) return "elevated";
  if (pressure > 0) return "soft";
  return "idle";
}

// ============================================================================
// Unified v24 Presence Field (Forager)
// ============================================================================
function buildPresenceField(jobOrRaw, deviceProfile, cycle, globalHints = {}) {
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
    kind: "foragerPresence",
    version: "v24-IMMORTAL-INTEL++",
    presenceTier,
    meshPressureIndex,
    castleLoadLevel,
    meshStrength,
    idLen,
    typeLen,
    stability,
    cycleIndex: cycle
  };

  const classicString =
    `FORAGER_PRESENCE::${presenceTier}::${meshPressureIndex}::${castleLoadLevel}`;

  const sig = buildDualHashSignature("FORAGER_PRESENCE", intelPayload, classicString);

  return {
    presenceVersion: "v24-IMMORTAL-INTEL++",
    presenceTier,

    bandPresence: ghP.bandPresence || "symbolic",
    routerPresence: ghP.routerPresence || "stable",
    devicePresence: ghP.devicePresence || "forager",

    meshPresence: ghP.meshPresence || (meshStrength > 0 ? "mesh-active" : "mesh-idle"),
    castlePresence: ghP.castlePresence || castle.castlePresence || "forager-region",
    regionPresence: ghP.regionPresence || region.regionTag || "unknown-region",

    regionId: region.regionId || "forager-region",
    castleId: castle.castleId || "forager-castle",

    meshStrength,
    meshPressureIndex,
    castleLoadLevel,

    idLen,
    typeLen,
    stability,
    cycle,

    presenceSignatureIntel: sig.intel,
    presenceSignatureClassic: sig.classic
  };
}

// ============================================================================
// A‑B‑A Binary + Wave Surfaces (v24 IMMORTAL++)
// ============================================================================
function classifyGpuTierFromJob(raw) {
  const gpuTier = raw?.gpuTier || raw?.gpu_tier || null;
  if (!gpuTier) return "mid";
  const s = String(gpuTier).toLowerCase();
  if (s.includes("high")) return "high";
  if (s.includes("low")) return "low";
  return "mid";
}

function classifyGpuTierFromDevice(deviceProfile = {}) {
  const score = Number(deviceProfile.gpuScore || 0);
  if (score >= 800) return "high";
  if (score >= 400) return "mid";
  if (score > 0) return "low";
  return "none";
}

function buildBinaryField(cycle, gpuTier, presenceField) {
  const tierWeight =
    gpuTier === "high" ? 24 :
    gpuTier === "mid"  ? 16 :
    gpuTier === "low"  ? 10 :
    6;

  const mesh = Number(presenceField?.meshPressureIndex || 0);
  const castle = Number(presenceField?.castleLoadLevel || 0);

  const patternLen = tierWeight;
  const density = patternLen + cycle + (tierWeight * 2) + mesh + castle;
  const surface = density + patternLen;

  const intelPayload = {
    kind: "foragerBinarySurface",
    cycleIndex: cycle,
    gpuTier,
    patternLen,
    density,
    surface,
    meshPressureIndex: mesh,
    castleLoadLevel: castle
  };

  const classicString = `BFORAGER::${surface}`;
  const sig = buildDualHashSignature("FORAGER_BIN", intelPayload, classicString);

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
  const amplitude = (cycle + 1) * (band === "binary" ? 12 : 6) + mesh;
  const wavelength = amplitude + 4;
  const phase = (amplitude + (presenceField?.meshPressureIndex || 0)) % 16;

  const intelPayload = {
    kind: "foragerWaveSurface",
    cycleIndex: cycle,
    band,
    amplitude,
    wavelength,
    phase,
    meshStrength: presenceField?.meshStrength || 0
  };

  const classicString = `FORAGER_WAVE::${band}::AMP::${amplitude}`;
  const sig = buildDualHashSignature("FORAGER_WAVE", intelPayload, classicString);

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
// Advantage‑C v24 (GPU + bandwidth + A‑B‑A surfaces + presence)
// ============================================================================
function buildAdvantageField(jobOrRaw, deviceProfile, bandPack, presenceField, globalHints = {}) {
  const gpuScore = Number(deviceProfile?.gpuScore || 0);
  const bandwidth = Number(deviceProfile?.bandwidthMbps || 0);

  const density = bandPack.binaryField.binarySurface.density;
  const amplitude = bandPack.waveField.amplitude;

  const baseScore =
    gpuScore * 0.0006 +
    bandwidth * 0.00025 +
    density * 0.000012 +
    amplitude * 0.000012;

  const presenceBoost =
    presenceField.presenceTier === "critical" ? 0.025 :
    presenceField.presenceTier === "high" ? 0.018 :
    presenceField.presenceTier === "elevated" ? 0.012 :
    presenceField.presenceTier === "soft" ? 0.006 :
    0;

  const advantageScore = baseScore + presenceBoost;

  let advantageTier = 0;
  if (advantageScore >= 0.06) advantageTier = 3;
  else if (advantageScore >= 0.025) advantageTier = 2;
  else if (advantageScore > 0) advantageTier = 1;

  const fallbackBandLevel = globalHints.fallbackBandLevel ?? 0;

  const intelPayload = {
    kind: "foragerAdvantage",
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
    `FORAGER_ADVANTAGE::${presenceField.presenceTier}::${advantageTier}`;

  const sig = buildDualHashSignature("FORAGER_ADVANTAGE", intelPayload, classicString);

  return {
    advantageVersion: "C-24.0",
    band: bandPack.band,
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
// Chunk / Cache / Prewarm Plan v24 (Forager)
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
    kind: "foragerChunkPlan",
    version: "v24-IMMORTAL-INTEL++",
    priority,
    presenceTier: presenceField.presenceTier,
    advantageTier: advantageField.advantageTier
  };

  const classicString =
    `FORAGER_CHUNK_PLAN::${presenceField.presenceTier}::${priority}`;

  const sig = buildDualHashSignature("FORAGER_CHUNK_PLAN", intelPayload, classicString);

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
      foragerDiagnostics: true
    },
    prewarm: {
      nervousSystem: true,
      survivalInstincts: true,
      lymphNodes: true
    },
    chunkPlanSignatureIntel: sig.intel,
    chunkPlanSignatureClassic: sig.classic
  };
}

// ============================================================================
// Healing Metadata — v24 IMMORTAL++ INTEL
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

  lastPayloadVersion: "24-salad-dna",
  lastJobType: null,
  lastGpuTier: null,
  lastResourceShape: null,
  payoutVolatility: 0,
  liquidityScore: 0,
  cycleCount: 0,

  // dual signatures
  lastPingSignatureIntel: null,
  lastPingSignatureClassic: null,
  lastFetchSignatureIntel: null,
  lastFetchSignatureClassic: null,
  lastNormalizationSignatureIntel: null,
  lastNormalizationSignatureClassic: null,
  lastSubmitSignatureIntel: null,
  lastSubmitSignatureClassic: null,

  lastBand: "symbolic",
  lastBandSignatureIntel: null,
  lastBandSignatureClassic: null,

  lastBinaryField: null,
  lastWaveField: null,

  lastPresenceField: null,
  lastAdvantageField: null,
  lastChunkPrewarmPlan: null
};

// ============================================================================
// Deterministic Salad Receptor DNA (v24 IMMORTAL++)
// ============================================================================
const SALAD_RECEPTOR_DNA = {
  pingLatency: 55,
  jobs: [
    {
      id: "salad-001",
      reward: 0.08,
      cpu: 4,
      memory: 4096,
      estimatedSeconds: 900,
      gpuTier: "mid",
      bandwidth: 20,
      type: "generic-compute"
    },
    {
      id: "salad-002",
      reward: 0.15,
      cpu: 8,
      memory: 8192,
      estimatedSeconds: 1800,
      gpuTier: "high",
      bandwidth: 50,
      type: "ai-task"
    }
  ],
  version: "v24-IMMORTAL-INTEL++",
  lineage: "Forager-Salad-v24-IMMORTAL-INTEL++",
  phenotype: "MarketplaceReceptor"
};

// ============================================================================
// FORAGER CLIENT — v24 IMMORTAL++ INTEL
// ============================================================================
export const PulseEarnMktForager = {
  id: "salad",
  name: "Salad Marketplace",
  version: "v24-IMMORTAL-INTEL++",
  lineage: "Forager-Salad-v24-IMMORTAL-INTEL++",

  // -------------------------------------------------------------------------
  // Ping — v24 dual-hash + presence + advantage + chunk + A-B-A
  // -------------------------------------------------------------------------
  ping(deviceProfile = {}, globalHints = {}) {
    const latency = SALAD_RECEPTOR_DNA.pingLatency;

    healingState.cycleCount++;
    const cycleIndex = healingState.cycleCount;
    healingState.lastPingMs = latency;
    healingState.lastPingError = null;

    const pingSig = buildDualHashSignature(
      "FORAGER_PING",
      { latency, cycleIndex },
      `PING::SALAD::${latency}::CYCLE::${cycleIndex}`
    );
    healingState.lastPingSignatureIntel = pingSig.intel;
    healingState.lastPingSignatureClassic = pingSig.classic;

    const deviceGpuTier = classifyGpuTierFromDevice(deviceProfile);
    const band = normalizeBand(deviceGpuTier === "high" ? "binary" : "symbolic");
    healingState.lastBand = band;

    const bandSig = buildDualHashSignature(
      "FORAGER_BAND",
      { band, cycleIndex },
      `BAND::${band}::CYCLE::${cycleIndex}`
    );
    healingState.lastBandSignatureIntel = bandSig.intel;
    healingState.lastBandSignatureClassic = bandSig.classic;

    const presenceField = buildPresenceField(
      null,
      deviceProfile,
      cycleIndex,
      globalHints
    );
    const binaryField = buildBinaryField(cycleIndex, deviceGpuTier, presenceField);
    const waveField = buildWaveField(cycleIndex, band, presenceField);

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
      latency,
      cycleIndex,
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

  // -------------------------------------------------------------------------
  // Fetch Jobs — v24 dual-hash + presence + advantage + chunk + A-B-A
  // -------------------------------------------------------------------------
  fetchJobs(deviceProfile = {}, globalHints = {}) {
    try {
      const data = { jobs: SALAD_RECEPTOR_DNA.jobs };
      healingState.lastPayloadVersion = "24-salad-dna";

      if (!data || !Array.isArray(data.jobs)) {
        const sig = buildDualHashSignature(
          "FORAGER_FETCH",
          { count: 0, cycleIndex: healingState.cycleCount },
          "FETCH::SALAD::0"
        );
        healingState.lastFetchError = "invalid_jobs_payload";
        healingState.lastFetchCount = 0;
        healingState.lastFetchSignatureIntel = sig.intel;
        healingState.lastFetchSignatureClassic = sig.classic;
        return {
          jobs: [],
          cycleIndex: healingState.cycleCount,
          signatureIntel: sig.intel,
          signatureClassic: sig.classic,
          bandSignatureIntel: null,
          bandSignatureClassic: null,
          binaryField: null,
          waveField: null,
          presenceField: null,
          advantageField: null,
          chunkPlan: null
        };
      }

      const jobs = data.jobs
        .map(raw => this.normalizeJob(raw, deviceProfile, globalHints))
        .filter(j => j !== null);

      healingState.lastFetchError = null;
      healingState.lastFetchCount = jobs.length;
      healingState.cycleCount++;
      const cycleIndex = healingState.cycleCount;

      const fetchSig = buildDualHashSignature(
        "FORAGER_FETCH",
        { count: jobs.length, cycleIndex },
        `FETCH::SALAD::${jobs.length}::CYCLE::${cycleIndex}`
      );
      healingState.lastFetchSignatureIntel = fetchSig.intel;
      healingState.lastFetchSignatureClassic = fetchSig.classic;

      const deviceGpuTier = classifyGpuTierFromDevice(deviceProfile);
      const band = normalizeBand(deviceGpuTier === "high" ? "binary" : "symbolic");
      healingState.lastBand = band;

      const bandSig = buildDualHashSignature(
        "FORAGER_BAND",
        { band, cycleIndex },
        `BAND::${band}::CYCLE::${cycleIndex}`
      );
      healingState.lastBandSignatureIntel = bandSig.intel;
      healingState.lastBandSignatureClassic = bandSig.classic;

      const presenceField = buildPresenceField(
        null,
        deviceProfile,
        cycleIndex,
        globalHints
      );
      const binaryField = buildBinaryField(cycleIndex, deviceGpuTier, presenceField);
      const waveField = buildWaveField(cycleIndex, band, presenceField);

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
        cycleIndex,
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

    } catch (err) {
      const sig = buildDualHashSignature(
        "FORAGER_FETCH",
        { count: 0, error: String(err) },
        "FETCH::SALAD::0"
      );
      healingState.lastFetchError = err.message || String(err);
      healingState.lastFetchCount = 0;
      healingState.lastFetchSignatureIntel = sig.intel;
      healingState.lastFetchSignatureClassic = sig.classic;
      return {
        jobs: [],
        cycleIndex: healingState.cycleCount,
        signatureIntel: sig.intel,
        signatureClassic: sig.classic,
        bandSignatureIntel: null,
        bandSignatureClassic: null,
        binaryField: null,
        waveField: null,
        presenceField: null,
        advantageField: null,
        chunkPlan: null
      };
    }
  },

  // -------------------------------------------------------------------------
  // Submit Result — v24 dual-hash + presence + advantage + chunk + A-B-A
  // -------------------------------------------------------------------------
  submitResult(job, result, deviceProfile = {}, globalHints = {}) {
    const jobId = job?.id ?? null;

    healingState.lastSubmitJobId = jobId;
    healingState.lastSubmitError = null;
    healingState.cycleCount++;
    const cycleIndex = healingState.cycleCount;

    const submitSig = buildDualHashSignature(
      "FORAGER_SUBMIT",
      { jobId, cycleIndex },
      `SUBMIT::SALAD::${jobId}::CYCLE::${cycleIndex}`
    );
    healingState.lastSubmitSignatureIntel = submitSig.intel;
    healingState.lastSubmitSignatureClassic = submitSig.classic;

    const gpuTier = classifyGpuTierFromJob(job);
    const band = normalizeBand(gpuTier === "high" ? "binary" : "symbolic");
    healingState.lastBand = band;

    const bandSig = buildDualHashSignature(
      "FORAGER_BAND",
      { band, cycleIndex },
      `BAND::${band}::CYCLE::${cycleIndex}`
    );
    healingState.lastBandSignatureIntel = bandSig.intel;
    healingState.lastBandSignatureClassic = bandSig.classic;

    const presenceField = buildPresenceField(
      job,
      deviceProfile,
      cycleIndex,
      globalHints
    );
    const binaryField = buildBinaryField(cycleIndex, gpuTier, presenceField);
    const waveField = buildWaveField(cycleIndex, band, presenceField);

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

    healingState.lastBinaryField = binaryField;
    healingState.lastWaveField = waveField;
    healingState.lastPresenceField = presenceField;
    healingState.lastAdvantageField = advantageField;
    healingState.lastChunkPrewarmPlan = chunkPlan;

    return {
      ok: true,
      marketplace: "salad",
      jobId,
      cycleIndex,
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

  // -------------------------------------------------------------------------
  // Normalize Job — v24 dual-hash + presence + advantage + chunk + A-B-A
  // -------------------------------------------------------------------------
  normalizeJob(raw, deviceProfile = {}, globalHints = {}) {
    try {
      if (!raw || typeof raw !== "object") {
        const sig = buildDualHashSignature("FORAGER_NORM", { jobId: null }, "NORM::SALAD::NONE");
        healingState.lastNormalizationError = "invalid_raw_job";
        healingState.lastNormalizedJobId = null;
        healingState.lastNormalizationSignatureIntel = sig.intel;
        healingState.lastNormalizationSignatureClassic = sig.classic;
        return null;
      }
      if (!raw.id) {
        const sig = buildDualHashSignature("FORAGER_NORM", { jobId: null }, "NORM::SALAD::NONE");
        healingState.lastNormalizationError = "missing_id";
        healingState.lastNormalizedJobId = null;
        healingState.lastNormalizationSignatureIntel = sig.intel;
        healingState.lastNormalizationSignatureClassic = sig.classic;
        return null;
      }

      healingState.lastJobType = safeGet(raw, "type", "unknown");

      const payout = Number(raw.reward ?? raw.payout ?? 0);
      if (!Number.isFinite(payout) || payout <= 0) {
        const sig = buildDualHashSignature("FORAGER_NORM", { jobId: null }, "NORM::SALAD::NONE");
        healingState.lastNormalizationError = "non_positive_payout";
        healingState.lastNormalizedJobId = null;
        healingState.lastNormalizationSignatureIntel = sig.intel;
        healingState.lastNormalizationSignatureClassic = sig.classic;
        return null;
      }

      const cpuRequired = Number(raw.cpu ?? 2);
      const memoryRequired = Number(raw.memory ?? 2048);
      const estimatedSeconds = Number(raw.estimatedSeconds ?? 600);

      healingState.lastResourceShape = {
        cpu: cpuRequired,
        mem: memoryRequired,
        duration: estimatedSeconds
      };

      if (!Number.isFinite(estimatedSeconds) || estimatedSeconds <= 0) {
        const sig = buildDualHashSignature("FORAGER_NORM", { jobId: null }, "NORM::SALAD::NONE");
        healingState.lastNormalizationError = "non_positive_duration";
        healingState.lastNormalizedJobId = null;
        healingState.lastNormalizationSignatureIntel = sig.intel;
        healingState.lastNormalizationSignatureClassic = sig.classic;
        return null;
      }

      const gpuTier = classifyGpuTierFromJob(raw);
      healingState.lastGpuTier = gpuTier;

      const minGpuScore =
        gpuTier === "high"
          ? 700
          : gpuTier === "mid"
          ? 450
          : gpuTier === "low"
          ? 250
          : 150;

      const bandwidthNeededMbps = Number(raw.bandwidth ?? 10);

      const band = normalizeBand(gpuTier === "high" ? "binary" : "symbolic");
      healingState.lastBand = band;

      const bandSig = buildDualHashSignature(
        "FORAGER_BAND",
        { band, cycleIndex: healingState.cycleCount },
        `BAND::${band}::CYCLE::${healingState.cycleCount}`
      );
      healingState.lastBandSignatureIntel = bandSig.intel;
      healingState.lastBandSignatureClassic = bandSig.classic;

      const presenceField = buildPresenceField(
        raw,
        deviceProfile,
        healingState.cycleCount,
        globalHints
      );
      const binaryField = buildBinaryField(healingState.cycleCount, gpuTier, presenceField);
      const waveField = buildWaveField(healingState.cycleCount, band, presenceField);

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

      healingState.lastBinaryField = binaryField;
      healingState.lastWaveField = waveField;
      healingState.lastPresenceField = presenceField;
      healingState.lastAdvantageField = advantageField;
      healingState.lastChunkPrewarmPlan = chunkPlan;

      healingState.lastNormalizedJobId = raw.id;
      healingState.lastNormalizationError = null;

      const normSig = buildDualHashSignature(
        "FORAGER_NORM",
        { jobId: raw.id, cycleIndex: healingState.cycleCount },
        `NORM::SALAD::${raw.id}`
      );
      healingState.lastNormalizationSignatureIntel = normSig.intel;
      healingState.lastNormalizationSignatureClassic = normSig.classic;

      return {
        id: String(raw.id),
        marketplaceId: "salad",

        payout,
        cpuRequired,
        memoryRequired,
        estimatedSeconds,

        minGpuScore,
        bandwidthNeededMbps,

        _abaBand: band,
        _abaBinaryDensity: binaryField.binarySurface.density,
        _abaWaveAmplitude: waveField.amplitude,

        presenceField,
        advantageField,
        chunkPlan
      };

    } catch (err) {
      const sig = buildDualHashSignature(
        "FORAGER_NORM",
        { jobId: null, error: String(err) },
        "NORM::SALAD::NONE"
      );
      healingState.lastNormalizationError = err.message || String(err);
      healingState.lastNormalizedJobId = null;
      healingState.lastNormalizationSignatureIntel = sig.intel;
      healingState.lastNormalizationSignatureClassic = sig.classic;
      return null;
    }
  }
};

// ---------------------------------------------------------------------------
// Healing State Export — Forager Interaction Log (v24-IMMORTAL-INTEL++)
// ---------------------------------------------------------------------------
export function getPulseEarnMktForagerHealingState() {
  return { ...healingState };
}
