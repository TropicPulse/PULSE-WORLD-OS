// ============================================================================
// FILE: tropic-pulse-functions/PULSE-WORLD/PULSE-EARN/PulseEarnMktForager-v16-IMMORTAL-INTEL.js
// LAYER: THE FORAGER — Salad Marketplace Receptor
//        v16 IMMORTAL + INTEL + DualHash + Presence + Advantage + Chunk
// ============================================================================

/*
AI_EXPERIENCE_META = {
  identity: "PulseEarnMktForager",
  version: "v16-IMMORTAL-INTEL",
  layer: "earn_market",
  role: "market_forager",
  lineage: "PulseEarnMktForager-v11 → v12.3 → v13.0-Presence-Immortal → v16-IMMORTAL-INTEL",

  evo: {
    marketForager: true,
    jobDiscovery: true,
    jobHarvesting: true,
    jobNormalization: true,
    dualBand: true,
    symbolicPrimary: true,
    binaryAware: true,

    deterministic: true,
    deterministicField: true,
    driftProof: true,
    pureCompute: true,
    zeroNetwork: true,
    zeroFilesystem: true,
    zeroMutationOfInput: true,
    zeroAsync: true,
    zeroRandomness: true,

    chunkAware: true,
    prewarmAware: true,
    cacheAware: true,

    intelSignatureAware: true,
    dualHashAware: true,
    structureAware: true,
    contextAware: true,
    factoringAware: true
  },

  contract: {
    always: [
      "PulseEarnMktCourier",
      "PulseEarnMktEmbassyLedger",
      "PulseEarnMktBroker",
      "PulseEarnMetabolism",
      "PulseEarnLymphNodes"
    ],
    never: [
      "safeRoute",
      "fetchViaCNS",
      "userScript",
      "dynamicEval"
    ]
  }
}
*/

export const PulseEarnMktForagerMeta = Object.freeze({
  layer: "PulseEarnMktForager",
  role: "EARN_MARKETPLACE_RECEPTOR",
  version: "v16-IMMORTAL-INTEL",
  identity: "PulseEarnMktForager-v16-IMMORTAL-INTEL",

  guarantees: Object.freeze({
    deterministic: true,
    deterministicField: true,
    driftProof: true,
    pureReceptor: true,

    dualBandAware: true,
    binaryAware: true,
    waveFieldAware: true,
    presenceAware: true,
    advantageAware: true,
    chunkPrewarmAware: true,
    healingMetadataAware: true,

    worldLensAware: false,
    zeroNetwork: true,
    zeroAsync: true,
    zeroAI: true,
    zeroUserCode: true
  })
});

// ============================================================================
// HASH HELPERS — v16 IMMORTAL INTEL
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

// ============================================================================
// A‑B‑A Binary + Wave Surfaces (v16)
// ============================================================================
function buildBinaryField(cycle, gpuTier, presenceField) {
  const tierWeight =
    gpuTier === "high" ? 20 :
    gpuTier === "mid"  ? 12 :
    gpuTier === "low"  ? 8  : 5;

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
  const amplitude = (cycle + 1) * (band === "binary" ? 10 : 5) + mesh;
  const wavelength = amplitude + 3;
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
// Unified v16 Presence Tier
// ============================================================================
function classifyPresenceTier(pressure) {
  if (pressure >= 150) return "critical";
  if (pressure >= 100) return "high";
  if (pressure >= 50) return "elevated";
  if (pressure > 0) return "soft";
  return "idle";
}

// ============================================================================
// Unified v16 Presence Field
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
    version: "v16-IMMORTAL-INTEL",
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
    presenceVersion: "v16-IMMORTAL-INTEL",
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
// Advantage‑C v16
// ============================================================================
function buildAdvantageField(jobOrRaw, deviceProfile, bandPack, presenceField, globalHints = {}) {
  const gpuScore = deviceProfile?.gpuScore || 0;
  const bandwidth = deviceProfile?.bandwidthMbps || 0;

  const density = bandPack.binaryField.binarySurface.density;
  const amplitude = bandPack.waveField.amplitude;

  const baseScore =
    gpuScore * 0.0005 +
    bandwidth * 0.0002 +
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
    kind: "foragerAdvantage",
    version: "C-16.0",
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
    advantageVersion: "C-16.0",
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
// Chunk / Cache / Prewarm Plan v16
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
    version: "v16-IMMORTAL-INTEL",
    priority,
    presenceTier: presenceField.presenceTier,
    advantageTier: advantageField.advantageTier
  };

  const classicString =
    `FORAGER_CHUNK_PLAN::${presenceField.presenceTier}::${priority}`;

  const sig = buildDualHashSignature("FORAGER_CHUNK_PLAN", intelPayload, classicString);

  return {
    planVersion: "v16-IMMORTAL-INTEL",
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
// Healing Metadata — v16 IMMORTAL INTEL
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

  lastPayloadVersion: "16-salad-dna",
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
// Safe Getter
// ============================================================================
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
// Deterministic Salad Receptor DNA (v16)
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
  version: "v16-IMMORTAL-INTEL",
  lineage: "Forager-Salad-v16-IMMORTAL-INTEL",
  phenotype: "MarketplaceReceptor"
};

// ============================================================================
// FORAGER CLIENT — v16 IMMORTAL INTEL
// ============================================================================
export const PulseEarnMktForager = {
  id: "salad",
  name: "Salad Marketplace",
  version: "v16-IMMORTAL-INTEL",
  lineage: "Forager-Salad-v16-IMMORTAL-INTEL",

  // -------------------------------------------------------------------------
  // Ping — v16 dual-hash + presence + advantage + chunk
  // -------------------------------------------------------------------------
  ping(deviceProfile = {}, globalHints = {}) {
    const latency = SALAD_RECEPTOR_DNA.pingLatency;

    healingState.cycleCount++;
    healingState.lastPingMs = latency;
    healingState.lastPingError = null;

    const pingSig = buildDualHashSignature(
      "FORAGER_PING",
      { latency, cycleIndex: healingState.cycleCount },
      `PING::SALAD::${latency}::CYCLE::${healingState.cycleCount}`
    );
    healingState.lastPingSignatureIntel = pingSig.intel;
    healingState.lastPingSignatureClassic = pingSig.classic;

    const band = "symbolic";
    healingState.lastBand = band;

    const bandSig = buildDualHashSignature(
      "FORAGER_BAND",
      { band, cycleIndex: healingState.cycleCount },
      `BAND::${band}`
    );
    healingState.lastBandSignatureIntel = bandSig.intel;
    healingState.lastBandSignatureClassic = bandSig.classic;

    const presenceField = buildPresenceField(
      null,
      deviceProfile,
      healingState.cycleCount,
      globalHints
    );
    const binaryField = buildBinaryField(healingState.cycleCount, "low", presenceField);
    const waveField = buildWaveField(healingState.cycleCount, band, presenceField);

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
      cycleIndex: healingState.cycleCount,
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
  // Fetch Jobs — v16 dual-hash + presence + advantage + chunk
  // -------------------------------------------------------------------------
  fetchJobs(deviceProfile = {}, globalHints = {}) {
    try {
      const data = { jobs: SALAD_RECEPTOR_DNA.jobs };
      healingState.lastPayloadVersion = "16-salad-dna";

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
        return [];
      }

      const jobs = data.jobs
        .map(raw => this.normalizeJob(raw, deviceProfile, globalHints))
        .filter(j => j !== null);

      healingState.lastFetchError = null;
      healingState.lastFetchCount = jobs.length;
      healingState.cycleCount++;

      const fetchSig = buildDualHashSignature(
        "FORAGER_FETCH",
        { count: jobs.length, cycleIndex: healingState.cycleCount },
        `FETCH::SALAD::${jobs.length}::CYCLE::${healingState.cycleCount}`
      );
      healingState.lastFetchSignatureIntel = fetchSig.intel;
      healingState.lastFetchSignatureClassic = fetchSig.classic;

      const band = "symbolic";
      healingState.lastBand = band;

      const bandSig = buildDualHashSignature(
        "FORAGER_BAND",
        { band, cycleIndex: healingState.cycleCount },
        `BAND::${band}`
      );
      healingState.lastBandSignatureIntel = bandSig.intel;
      healingState.lastBandSignatureClassic = bandSig.classic;

      const presenceField = buildPresenceField(
        null,
        deviceProfile,
        healingState.cycleCount,
        globalHints
      );
      const binaryField = buildBinaryField(healingState.cycleCount, "low", presenceField);
      const waveField = buildWaveField(healingState.cycleCount, band, presenceField);

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
        cycleIndex: healingState.cycleCount,
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
      return [];
    }
  },

  // -------------------------------------------------------------------------
  // Submit Result — v16 dual-hash + presence + advantage + chunk
  // -------------------------------------------------------------------------
  submitResult(job, result, deviceProfile = {}, globalHints = {}) {
    const jobId = job?.id ?? null;

    healingState.lastSubmitJobId = jobId;
    healingState.lastSubmitError = null;
    healingState.cycleCount++;

    const submitSig = buildDualHashSignature(
      "FORAGER_SUBMIT",
      { jobId, cycleIndex: healingState.cycleCount },
      `SUBMIT::SALAD::${jobId}::CYCLE::${healingState.cycleCount}`
    );
    healingState.lastSubmitSignatureIntel = submitSig.intel;
    healingState.lastSubmitSignatureClassic = submitSig.classic;

    const band = "symbolic";
    healingState.lastBand = band;

    const bandSig = buildDualHashSignature(
      "FORAGER_BAND",
      { band, cycleIndex: healingState.cycleCount },
      `BAND::${band}`
    );
    healingState.lastBandSignatureIntel = bandSig.intel;
    healingState.lastBandSignatureClassic = bandSig.classic;

    const presenceField = buildPresenceField(
      job,
      deviceProfile,
      healingState.cycleCount,
      globalHints
    );
    const binaryField = buildBinaryField(healingState.cycleCount, "low", presenceField);
    const waveField = buildWaveField(healingState.cycleCount, band, presenceField);

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
      cycleIndex: healingState.cycleCount,
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
  // Normalize Job — v16 dual-hash + presence + advantage + chunk
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

      const gpuTier = raw.gpuTier ?? "mid";
      healingState.lastGpuTier = gpuTier;

      const minGpuScore =
        gpuTier === "high"
          ? 600
          : gpuTier === "mid"
          ? 400
          : gpuTier === "low"
          ? 250
          : 150;

      const bandwidthNeededMbps = Number(raw.bandwidth ?? 10);

      const band = gpuTier === "high" ? "binary" : "symbolic";
      healingState.lastBand = band;

      const bandSig = buildDualHashSignature(
        "FORAGER_BAND",
        { band, cycleIndex: healingState.cycleCount },
        `BAND::${band}`
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
      const sig = buildDualHashSignature("FORAGER_NORM", { jobId: null, error: String(err) }, "NORM::SALAD::NONE");
      healingState.lastNormalizationError = err.message || String(err);
      healingState.lastNormalizedJobId = null;
      healingState.lastNormalizationSignatureIntel = sig.intel;
      healingState.lastNormalizationSignatureClassic = sig.classic;
      return null;
    }
  }
};

// ---------------------------------------------------------------------------
// Healing State Export — Forager Interaction Log (v16-IMMORTAL-INTEL)
// ---------------------------------------------------------------------------
export function getPulseEarnMktForagerHealingState() {
  return { ...healingState };
}
