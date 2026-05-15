// ============================================================================
// FILE: tropic-pulse-functions/PULSE-UNIVERSE/PULSE-EARN/PulseEarnReceptor-v24-IMMORTAL-INTEL-SUPERIOR.js
// LAYER: THE STANDARD RECEPTOR (Marketplace Protocol + Universal Adapter)
// PULSE EARN — v24-IMMORTAL-INTEL-SUPERIOR A‑B‑A + DualHash + Presence + Advantage + Chunk + 24++ Overlays
// ============================================================================
//
// ROLE (v24-IMMORTAL-INTEL-SUPERIOR):
//   THE STANDARD RECEPTOR — Pulse‑Earn’s canonical marketplace interface.
//   • Deterministic sensory receptor for marketplace signals.
//   • Pure adapter: ping(), fetchJobs(), submitResult(), normalizeJob().
//   • Configurable receptor DNA (no network).
//   • Emits receptorPattern, receptorSignature(+Intel), endpointSignature(+Intel).
//   • Emits unified v24 presence/advantage/chunk surfaces.
//   • Emits A‑B‑A bandSignature(+Intel) + binaryField + waveField.
//   • Dual‑hash signatures: classic + intel for core surfaces.
//   • 24++: receptorComputeProfile + receptorPressureProfile + Tri‑Heart overlays.
// ============================================================================

//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝

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
// INTERNAL STATE — deterministic, drift-proof
// ============================================================================
let receptorConfig = {
  id: "A",
  name: "PulseEarn Receptor A",
  healthScore: 1.0,

  // A‑B‑A band identity
  band: "symbolic", // symbolic | binary

  endpoints: {
    pingSignal: "PING_OK",
    jobs: [],              // deterministic job list
    submitStatus: "SUBMIT_OK"
  }
};

let receptorCycle = 0;

// ============================================================================
// HASH HELPERS — v24 IMMORTAL INTEL SUPERIOR
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

// ============================================================================
// Unified v24 Presence Field (24++)
// ============================================================================
function classifyPresenceTier(pressure) {
  if (pressure >= 150) return "critical";
  if (pressure >= 100) return "high";
  if (pressure >= 50) return "elevated";
  if (pressure > 0) return "soft";
  return "idle";
}

function buildPresenceField(globalHints = {}, cycle) {
  const ghP = globalHints.presenceContext || {};
  const mesh = globalHints.meshSignals || {};
  const castle = globalHints.castleSignals || {};
  const region = globalHints.regionContext || {};

  const meshStrength = Number(mesh.meshStrength || 0);
  const meshPressureExternal = Number(mesh.meshPressureIndex || 0);
  const castleLoadExternal = Number(castle.loadLevel || 0);

  const internalComposite = cycle * 0.0001;
  const internalPressure = Math.floor(internalComposite * 1000);

  const meshPressureIndex = meshPressureExternal + internalPressure;
  const castleLoadLevel = castleLoadExternal;

  const pressure = meshPressureIndex + castleLoadLevel;
  const presenceTier = classifyPresenceTier(pressure);

  const intelPayload = {
    kind: "receptorPresence",
    version: "v24-IMMORTAL-INTEL-SUPERIOR",
    presenceTier,
    meshPressureIndex,
    castleLoadLevel,
    meshStrength,
    cycleIndex: cycle,
    bandPresence: ghP.bandPresence || normalizeBand(receptorConfig.band)
  };

  const classicString =
    `RECEPTOR_PRESENCE::${presenceTier}::${meshPressureIndex}::${castleLoadLevel}`;

  const sig = buildDualHashSignature("RECEPTOR_PRESENCE_V24", intelPayload, classicString);

  return {
    presenceVersion: "v24-IMMORTAL-INTEL-SUPERIOR",
    presenceTier,

    bandPresence: ghP.bandPresence || normalizeBand(receptorConfig.band),
    routerPresence: ghP.routerPresence || "stable",
    devicePresence: ghP.devicePresence || "standard-receptor",

    meshPresence: ghP.meshPresence || (meshStrength > 0 ? "mesh-active" : "mesh-idle"),
    castlePresence: ghP.castlePresence || castle.castlePresence || "receptor-region",
    regionPresence: ghP.regionPresence || region.regionTag || "unknown-region",

    regionId: region.regionId || "receptor-region",
    castleId: castle.castleId || "receptor-castle",

    meshStrength,
    meshPressureIndex,
    castleLoadLevel,

    cycle,

    presenceSignatureIntel: sig.intel,
    presenceSignatureClassic: sig.classic
  };
}

// ============================================================================
// Advantage‑C v24 (24++)
// ============================================================================
function buildAdvantageField(bandPack, presenceField, globalHints = {}) {
  const density = bandPack.binaryField.binarySurface.density;
  const amplitude = bandPack.waveField.amplitude;

  const baseScore =
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
    kind: "receptorAdvantage",
    version: "C-24.0",
    density,
    amplitude,
    presenceTier: presenceField.presenceTier,
    advantageScore,
    advantageTier,
    fallbackBandLevel
  };

  const classicString =
    `RECEPTOR_ADVANTAGE::${presenceField.presenceTier}::${advantageTier}`;

  const sig = buildDualHashSignature("RECEPTOR_ADVANTAGE_V24", intelPayload, classicString);

  return {
    advantageVersion: "C-24.0",
    advantageScore,
    advantageTier,
    fallbackBandLevel,
    advantageSignatureIntel: sig.intel,
    advantageSignatureClassic: sig.classic
  };
}

// ============================================================================
// Chunk / Cache / Prewarm Plan v24 (24++)
// ============================================================================
function buildChunkPrewarmPlan(presenceField, advantageField) {
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
    kind: "receptorChunkPlan",
    version: "v24-StandardReceptor-AdvantageC",
    priority,
    presenceTier: presenceField.presenceTier,
    advantageTier: advantageField.advantageTier
  };

  const classicString =
    `RECEPTOR_CHUNK_PLAN::${presenceField.presenceTier}::${priority}`;

  const sig = buildDualHashSignature("RECEPTOR_CHUNK_PLAN_V24", intelPayload, classicString);

  return {
    planVersion: "v24-StandardReceptor-AdvantageC",
    priority,
    band: presenceField.presenceTier,
    chunks: {
      receptorEnvelope: true,
      normalizationBlueprint: true
    },
    cache: {
      receptorDiagnostics: true
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
// A‑B‑A Binary + Wave Surfaces (v24)
// ============================================================================
function buildBinaryField(cfg, cycle) {
  const patternLen =
    String(cfg.id).length + String(cfg.name).length;

  const density =
    patternLen +
    (cfg.endpoints.jobs?.length || 0) +
    (cfg.healthScore * 100) +
    cycle;

  const surface = density + patternLen;

  const intelPayload = {
    kind: "receptorBinarySurface",
    cycleIndex: cycle,
    patternLen,
    density,
    surface,
    jobCount: Array.isArray(cfg.endpoints.jobs) ? cfg.endpoints.jobs.length : 0,
    healthScore: cfg.healthScore
  };

  const classicString = `BRECEPTOR::${surface}`;
  const sig = buildDualHashSignature("RECEPTOR_BIN_V24", intelPayload, classicString);

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

function buildWaveField(cfg, cycle, band) {
  const amplitude = (cfg.healthScore || 1) * 100 + cycle;
  const wavelength = (cfg.endpoints.jobs?.length || 0) + 1;
  const phase = (cfg.id.charCodeAt(0) || 1) % 16;
  const b = normalizeBand(band || cfg.band);

  const intelPayload = {
    kind: "receptorWaveSurface",
    cycleIndex: cycle,
    band: b,
    amplitude,
    wavelength,
    phase,
    healthScore: cfg.healthScore
  };

  const classicString = `RECEPTOR_WAVE::${b}::AMP::${amplitude}`;
  const sig = buildDualHashSignature("RECEPTOR_WAVE_V24", intelPayload, classicString);

  return {
    wavePhenotypeSignatureIntel: sig.intel,
    wavePhenotypeSignatureClassic: sig.classic,
    amplitude,
    wavelength,
    phase,
    band: b,
    mode: b === "binary" ? "compression-wave" : "symbolic-wave"
  };
}

// ============================================================================
// 24++ Receptor Compute Profile + Pressure Profile + Tri‑Heart
// ============================================================================
function buildReceptorComputeProfile(cfg, bandPack) {
  const jobCount = Array.isArray(cfg.endpoints.jobs) ? cfg.endpoints.jobs.length : 0;
  const healthScore = cfg.healthScore || 1;

  const computeTier =
    jobCount >= 64 ? "tier_ultra" :
    jobCount >= 32 ? "tier_high" :
    jobCount >= 8 ? "tier_mid" :
    "tier_low";

  return {
    profileVersion: "RECEPTOR-COMPUTE-24++",
    routeBand: bandPack.band,
    jobCount,
    healthScore,
    computeTier,
    binaryDensity: bandPack.binaryField.binarySurface.density,
    waveAmplitude: bandPack.waveField.amplitude
  };
}

function buildReceptorPressureProfile(presenceField, advantageField) {
  const magnitude =
    (presenceField.meshPressureIndex || 0) +
    (presenceField.castleLoadLevel || 0) +
    (advantageField.advantageScore || 0) * 1000;

  let pressureTier = "pressure_idle";
  if (magnitude >= 300) pressureTier = "pressure_critical";
  else if (magnitude >= 200) pressureTier = "pressure_high";
  else if (magnitude >= 80) pressureTier = "pressure_elevated";
  else if (magnitude > 0) pressureTier = "pressure_soft";

  return {
    profileVersion: "RECEPTOR-PRESSURE-24++",
    pressureTier,
    presenceTier: presenceField.presenceTier,
    meshPressureIndex: presenceField.meshPressureIndex || 0,
    castleLoadLevel: presenceField.castleLoadLevel || 0,
    advantageTier: advantageField.advantageTier
  };
}

function buildTriHeartField(presenceField, advantageField) {
  return {
    triHeartVersion: "RECEPTOR-TRI-24++",
    liveness: {
      alive: true,
      presenceTier: presenceField.presenceTier
    },
    advantage: {
      advantageTier: advantageField.advantageTier,
      advantageScore: advantageField.advantageScore
    },
    speed: {
      contractionSpeedTier: presenceField.presenceTier
    },
    presence: {
      presenceTier: presenceField.presenceTier
    }
  };
}

// ============================================================================
// Signature Builders
// ============================================================================
function buildReceptorPattern(cfg) {
  return (
    `RECEPTOR::${cfg.id}` +
    `::name:${cfg.name}` +
    `::health:${cfg.healthScore}` +
    `::jobs:${Array.isArray(cfg.endpoints.jobs) ? cfg.endpoints.jobs.length : 0}` +
    `::submit:${cfg.endpoints.submitStatus}` +
    `::band:${normalizeBand(cfg.band)}`
  );
}

function buildReceptorSignatureClassic(cfg) {
  return computeHash(
    `${cfg.id}::${cfg.name}::${cfg.healthScore}::${cfg.endpoints.submitStatus}::${normalizeBand(cfg.band)}`
  );
}

function buildReceptorSignatureIntel(cfg) {
  const payload = {
    id: cfg.id,
    name: cfg.name,
    healthScore: cfg.healthScore,
    submitStatus: cfg.endpoints.submitStatus,
    band: normalizeBand(cfg.band),
    jobCount: Array.isArray(cfg.endpoints.jobs) ? cfg.endpoints.jobs.length : 0
  };
  return computeHashIntelligence({ label: "RECEPTOR_SIGNATURE", payload });
}

function buildEndpointSignatureClassic(cfg) {
  return computeHash(
    `ENDPOINTS::jobs:${Array.isArray(cfg.endpoints.jobs) ? cfg.endpoints.jobs.length : 0}` +
    `::submit:${cfg.endpoints.submitStatus}` +
    `::band:${normalizeBand(cfg.band)}`
  );
}

function buildEndpointSignatureIntel(cfg) {
  const payload = {
    jobs: Array.isArray(cfg.endpoints.jobs) ? cfg.endpoints.jobs.length : 0,
    submitStatus: cfg.endpoints.submitStatus,
    band: normalizeBand(cfg.band)
  };
  return computeHashIntelligence({ label: "ENDPOINT_SIGNATURE", payload });
}

function buildBandSignatureClassic(cfg) {
  return computeHash(`RECEPTOR_BAND::${normalizeBand(cfg.band)}::${cfg.id}`);
}

function buildBandSignatureIntel(cfg) {
  const payload = {
    band: normalizeBand(cfg.band),
    id: cfg.id
  };
  return computeHashIntelligence({ label: "RECEPTOR_BAND", payload });
}

// ============================================================================
// Health Tier
// ============================================================================
function classifyHealth(healthScore) {
  const h = typeof healthScore === "number" ? healthScore : 1.0;
  if (h >= 0.95) return "healthy";
  if (h >= 0.85) return "soft";
  if (h >= 0.50) return "mid";
  if (h >= 0.15) return "hard";
  return "critical";
}

// ============================================================================
// CONFIG OVERRIDE — deterministic only
// ============================================================================
export function configurePulseEarnReceptor(config) {
  receptorConfig = {
    ...receptorConfig,
    ...config,
    band: normalizeBand(config?.band ?? receptorConfig.band),
    endpoints: {
      ...receptorConfig.endpoints,
      ...(config?.endpoints || {})
    }
  };
}

// ============================================================================
// normalizeJob — strict unified v24 job schema
// ============================================================================
function normalizeJob(raw, globalHints = {}) {
  if (!raw || typeof raw !== "object") {
    return null;
  }
  if (!raw.id) {
    return null;
  }

  const payout = Number(raw.payout ?? raw.reward ?? 0);
  if (!Number.isFinite(payout) || payout <= 0) {
    return null;
  }

  const cpuRequired = Number(raw.cpu ?? 1);
  const memoryRequired = Number(raw.memory ?? 1024);
  const estimatedSeconds = Number(raw.estimatedSeconds ?? 600);

  if (
    !Number.isFinite(cpuRequired) || cpuRequired <= 0 ||
    !Number.isFinite(memoryRequired) || memoryRequired <= 0 ||
    !Number.isFinite(estimatedSeconds) || estimatedSeconds <= 0
  ) {
    return null;
  }

  const gpuTierRaw = raw.gpuTier ?? (raw.gpu ? "high" : "low");
  const gpuTier =
    gpuTierRaw === "high" ? "high" :
    gpuTierRaw === "mid" ? "mid" :
    gpuTierRaw === "low" ? "low" :
    "low";

  const minGpuScore =
    gpuTier === "high"
      ? 600
      : gpuTier === "mid"
      ? 400
      : gpuTier === "low"
      ? 250
      : 150;

  const bandwidthNeededMbps = Number(raw.bandwidth ?? 5);

  const band = gpuTier === "high" ? "binary" : normalizeBand(receptorConfig.band);

  const presenceField = buildPresenceField(globalHints, receptorCycle);
  const binaryField = buildBinaryField(receptorConfig, receptorCycle);
  const waveField = buildWaveField(receptorConfig, receptorCycle, band);

  const advantageField = buildAdvantageField(
    { band, binaryField, waveField },
    presenceField,
    globalHints
  );

  const chunkPlan = buildChunkPrewarmPlan(presenceField, advantageField);

  return {
    id: String(raw.id),
    marketplaceId: receptorConfig.id,

    payout,
    cpuRequired,
    memoryRequired,
    estimatedSeconds,

    minGpuScore,
    bandwidthNeededMbps,

    // A‑B‑A hints
    _abaBand: band,
    _abaBinaryDensity: binaryField.binarySurface.density,
    _abaWaveAmplitude: waveField.amplitude,

    // Unified v24 presence/advantage/chunk
    presenceField,
    advantageField,
    chunkPlan
  };
}

// ============================================================================
// Sensory Functions — ping(), fetchJobs(), submitResult()
// PURE deterministic behavior, unified v24 presence surfaces + 24++ overlays.
// ============================================================================
function ping(globalHints = {}) {
  receptorCycle++;

  const tier = classifyHealth(receptorConfig.healthScore);

  let latency;
  if (tier === "healthy") latency = 10;
  else if (tier === "soft") latency = 50;
  else if (tier === "mid") latency = 150;
  else if (tier === "hard") latency = 300;
  else latency = null; // critical → no signal

  const presenceField = buildPresenceField(globalHints, receptorCycle);
  const band = normalizeBand(receptorConfig.band);
  const binaryField = buildBinaryField(receptorConfig, receptorCycle);
  const waveField = buildWaveField(receptorConfig, receptorCycle, band);

  const advantageField = buildAdvantageField(
    { band, binaryField, waveField },
    presenceField,
    globalHints
  );

  const chunkPlan = buildChunkPrewarmPlan(presenceField, advantageField);
  const computeProfile = buildReceptorComputeProfile(receptorConfig, { band, binaryField, waveField });
  const pressureProfile = buildReceptorPressureProfile(presenceField, advantageField);
  const triHeartField = buildTriHeartField(presenceField, advantageField);

  const sig = buildDualHashSignature(
    "RECEPTOR_PING_V24",
    { latency, cycleIndex: receptorCycle, receptorId: receptorConfig.id },
    `PING::${latency}::${receptorConfig.id}::CYCLE::${receptorCycle}`
  );

  const bandSig = buildDualHashSignature(
    "RECEPTOR_BAND_V24",
    { band, receptorId: receptorConfig.id },
    `BAND::${band}::${receptorConfig.id}`
  );

  return {
    latency,
    receptorId: receptorConfig.id,
    signature: sig.classic,
    signatureIntel: sig.intel,
    bandSignature: bandSig.classic,
    bandSignatureIntel: bandSig.intel,
    binaryField,
    waveField,
    presenceField,
    advantageField,
    chunkPlan,
    receptorComputeProfile: computeProfile,
    receptorPressureProfile: pressureProfile,
    receptorTriHeartField: triHeartField
  };
}

function fetchJobs(globalHints = {}) {
  receptorCycle++;

  const jobs = receptorConfig.endpoints.jobs;
  const safeJobs = Array.isArray(jobs) ? jobs : [];

  const normalizedJobs = safeJobs
    .map(j => normalizeJob(j, globalHints))
    .filter(j => j !== null);

  const presenceField = buildPresenceField(globalHints, receptorCycle);
  const band = normalizeBand(receptorConfig.band);
  const binaryField = buildBinaryField(receptorConfig, receptorCycle);
  const waveField = buildWaveField(receptorConfig, receptorCycle, band);

  const advantageField = buildAdvantageField(
    { band, binaryField, waveField },
    presenceField,
    globalHints
  );

  const chunkPlan = buildChunkPrewarmPlan(presenceField, advantageField);
  const computeProfile = buildReceptorComputeProfile(receptorConfig, { band, binaryField, waveField });
  const pressureProfile = buildReceptorPressureProfile(presenceField, advantageField);
  const triHeartField = buildTriHeartField(presenceField, advantageField);

  const sig = buildDualHashSignature(
    "RECEPTOR_FETCH_V24",
    { count: normalizedJobs.length, cycleIndex: receptorCycle, receptorId: receptorConfig.id },
    `JOBS::${normalizedJobs.length}::${receptorConfig.id}::CYCLE::${receptorCycle}`
  );

  const bandSig = buildDualHashSignature(
    "RECEPTOR_BAND_V24",
    { band, receptorId: receptorConfig.id },
    `BAND::${band}::${receptorConfig.id}`
  );

  return {
    jobs: normalizedJobs,
    receptorId: receptorConfig.id,
    signature: sig.classic,
    signatureIntel: sig.intel,
    bandSignature: bandSig.classic,
    bandSignatureIntel: bandSig.intel,
    binaryField,
    waveField,
    presenceField,
    advantageField,
    chunkPlan,
    receptorComputeProfile: computeProfile,
    receptorPressureProfile: pressureProfile,
    receptorTriHeartField: triHeartField
  };
}

function submitResult(job, result, globalHints = {}) {
  receptorCycle++;

  const presenceField = buildPresenceField(globalHints, receptorCycle);
  const band = normalizeBand(receptorConfig.band);
  const binaryField = buildBinaryField(receptorConfig, receptorCycle);
  const waveField = buildWaveField(receptorConfig, receptorCycle, band);

  const advantageField = buildAdvantageField(
    { band, binaryField, waveField },
    presenceField,
    globalHints
  );

  const chunkPlan = buildChunkPrewarmPlan(presenceField, advantageField);
  const computeProfile = buildReceptorComputeProfile(receptorConfig, { band, binaryField, waveField });
  const pressureProfile = buildReceptorPressureProfile(presenceField, advantageField);
  const triHeartField = buildTriHeartField(presenceField, advantageField);

  if (!job || !job.id) {
    const sig = buildDualHashSignature(
      "RECEPTOR_SUBMIT_V24",
      { jobId: null, cycleIndex: receptorCycle, receptorId: receptorConfig.id, ok: false },
      `SUBMIT::NONE::INVALID::${receptorConfig.id}::CYCLE::${receptorCycle}`
    );

    const bandSig = buildDualHashSignature(
      "RECEPTOR_BAND_V24",
      { band, receptorId: receptorConfig.id },
      `BAND::${band}::${receptorConfig.id}`
    );

    return {
      success: false,
      error: "invalid_job",
      receptorId: receptorConfig.id,
      signature: sig.classic,
      signatureIntel: sig.intel,
      bandSignature: bandSig.classic,
      bandSignatureIntel: bandSig.intel,
      binaryField,
      waveField,
      presenceField,
      advantageField,
      chunkPlan,
      receptorComputeProfile: computeProfile,
      receptorPressureProfile: pressureProfile,
      receptorTriHeartField: triHeartField
    };
  }

  const status = receptorConfig.endpoints.submitStatus;

  const sig = buildDualHashSignature(
    "RECEPTOR_SUBMIT_V24",
    { jobId: job.id, cycleIndex: receptorCycle, receptorId: receptorConfig.id, status },
    `SUBMIT::${job.id}::${status}::${receptorConfig.id}::CYCLE::${receptorCycle}`
  );

  const bandSig = buildDualHashSignature(
    "RECEPTOR_BAND_V24",
    { band, receptorId: receptorConfig.id },
    `BAND::${band}::${receptorConfig.id}`
  );

  return {
    success: true,
    receptorId: receptorConfig.id,
    jobId: job.id,
    result,
    status,
    signature: sig.classic,
    signatureIntel: sig.intel,
    bandSignature: bandSig.classic,
    bandSignatureIntel: bandSig.intel,
    binaryField,
    waveField,
    presenceField,
    advantageField,
    chunkPlan,
    receptorComputeProfile: computeProfile,
    receptorPressureProfile: pressureProfile,
    receptorTriHeartField: triHeartField
  };
}

// ============================================================================
// PUBLIC EXPORT — PulseEarnReceptor v24-IMMORTAL-INTEL-SUPERIOR A‑B‑A
// ============================================================================
export const PulseEarnReceptor = {
  id: () => receptorConfig.id,
  name: () => receptorConfig.name,

  // classic signatures (backwards compatible)
  receptorSignature: () => buildReceptorSignatureClassic(receptorConfig),
  endpointSignature: () => buildEndpointSignatureClassic(receptorConfig),
  bandSignature: () => buildBandSignatureClassic(receptorConfig),

  // intel signatures (new)
  receptorSignatureIntel: () => buildReceptorSignatureIntel(receptorConfig),
  endpointSignatureIntel: () => buildEndpointSignatureIntel(receptorConfig),
  bandSignatureIntel: () => buildBandSignatureIntel(receptorConfig),

  receptorPattern: () => buildReceptorPattern(receptorConfig),

  binaryField: () => buildBinaryField(receptorConfig, receptorCycle),
  waveField: () => buildWaveField(receptorConfig, receptorCycle, receptorConfig.band),

  ping,
  fetchJobs,
  submitResult,
  normalizeJob,

  diagnostics(globalHints = {}) {
    const presenceField = buildPresenceField(globalHints, receptorCycle);
    const band = normalizeBand(receptorConfig.band);
    const binaryField = buildBinaryField(receptorConfig, receptorCycle);
    const waveField = buildWaveField(receptorConfig, receptorCycle, band);

    const advantageField = buildAdvantageField(
      { band, binaryField, waveField },
      presenceField,
      globalHints
    );

    const chunkPlan = buildChunkPrewarmPlan(presenceField, advantageField);
    const computeProfile = buildReceptorComputeProfile(receptorConfig, { band, binaryField, waveField });
    const pressureProfile = buildReceptorPressureProfile(presenceField, advantageField);
    const triHeartField = buildTriHeartField(presenceField, advantageField);

    return {
      id: receptorConfig.id,
      name: receptorConfig.name,
      healthScore: receptorConfig.healthScore,
      healthTier: classifyHealth(receptorConfig.healthScore),

      band,
      bandSignature: buildBandSignatureClassic(receptorConfig),
      bandSignatureIntel: buildBandSignatureIntel(receptorConfig),

      receptorSignature: buildReceptorSignatureClassic(receptorConfig),
      receptorSignatureIntel: buildReceptorSignatureIntel(receptorConfig),
      endpointSignature: buildEndpointSignatureClassic(receptorConfig),
      endpointSignatureIntel: buildEndpointSignatureIntel(receptorConfig),
      receptorPattern: buildReceptorPattern(receptorConfig),

      binaryField,
      waveField,

      jobCount: Array.isArray(receptorConfig.endpoints.jobs)
        ? receptorConfig.endpoints.jobs.length
        : 0,

      presenceField,
      advantageField,
      chunkPlan,
      receptorComputeProfile: computeProfile,
      receptorPressureProfile: pressureProfile,
      receptorTriHeartField: triHeartField
    };
  }
};
