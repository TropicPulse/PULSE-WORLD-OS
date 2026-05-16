// ============================================================================
// FILE: PULSE-WORLD-OS/PULSE-MULTIVERSE/PULSEWORLD/PULSE-EARN/PulseEarnMetabolism-v30-IMMORTAL-INTEL-PLUSPLUS.js
// LAYER: THE METABOLIC CELL-ENGINE SUPERPIPELINE (v30-IMMORTAL-INTEL-PLUSPLUS)
// ============================================================================

const MAX_ADV_HISTORY = 128;
const METABOLIC_LANES = 64;

const metabolicHealing = {
  lastJobId: null,
  lastPayloadType: null,
  lastError: null,
  lastResult: null,
  cycleCount: 0,
  executionState: "idle",
  lastCycleIndex: null,

  lastLaneIndex: 0,
  lastLaneBand: "symbolic",

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

  totalJobs: 0,
  successfulJobs: 0,
  failedJobs: 0,
  cumulativeAdvantageScore: 0,
  lastAdvantageHistory: [],

  lastPulseIntelligence: null,
  lastMetabolicIntelligentPlan: null
};

let metabolismCycle = 0;

// ---------------------------------------------------------------------------
// Hash + band helpers (reuse your v24 patterns)
// ---------------------------------------------------------------------------
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
  const intelBase = { label, intel: intelPayload || {}, classic: classicString || "" };
  const intelHash = computeHashIntelligence(intelBase);
  const classicHash = computeHash(`${label}::${classicString || ""}`);
  return { intel: intelHash, classic: classicHash };
}

function normalizeBand(band) {
  const b = String(band || "symbolic").toLowerCase();
  return b === "binary" ? "binary" : "symbolic";
}

// ---------------------------------------------------------------------------
// Lane selection (deterministic, no randomness)
// ---------------------------------------------------------------------------
function selectMetabolicLane(jobId, band) {
  const s = String(jobId || "NO_JOB") + `::${band}`;
  let acc = 0;
  for (let i = 0; i < s.length; i++) {
    acc += s.charCodeAt(i) * (i + 3);
  }
  const lane = acc % METABOLIC_LANES;
  return lane;
}

// ---------------------------------------------------------------------------
// Presence / Advantage / Hints — reuse v24, but treat as v30 surfaces
// ---------------------------------------------------------------------------
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
    `META_PRESENCE_V30::${presenceTier}::` +
    `${meshPressureIndex}::${castleLoadLevel}`;

  const presenceSignatureDual = buildDualHashSignature(
    "META_PRESENCE_V30",
    intelPayload,
    classicString
  );

  return {
    presenceVersion: "v30-IMMORTAL-INTEL-PLUSPLUS",
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
    advantageVersion: "C-30.0",
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

    computeHints: {
      ...(globalHints.computeHints || {}),
      ...(jh.computeHints || {})
    }
  };
}

// ---------------------------------------------------------------------------
// MetabolicComputeProfile v30 (gpu/miner/offline + factoring)
// ---------------------------------------------------------------------------
function normalizeCachePriority(p) {
  if (!p) return "normal";
  const v = String(p).toLowerCase();
  if (v === "critical" || v === "high" || v === "low") return v;
  return "normal";
}

function buildMetabolicComputeProfile(band, hintsField, presenceField) {
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

  const cachePriority = normalizeCachePriority(hintsField.cacheHints.priority);
  const prewarmNeeded = !!hintsField.prewarmHints.shouldPrewarm;
  const coldStartRisk = !!hintsField.coldStartHints.coldStartRisk;

  const meshPressureIndex = presenceField.meshPressureIndex || 0;
  const castleLoadLevel = presenceField.castleLoadLevel || 0;
  const pressure = meshPressureIndex + castleLoadLevel;
  const factoringSignal =
    prewarmNeeded ||
    coldStartRisk ||
    cachePriority === "critical" ||
    pressure >= 150
      ? 1
      : 0;

  return {
    computeProfileVersion: "META-CP-V30++",
    routeBand: band,
    fallbackBandLevel: hintsField.fallbackBandLevel,
    chunkAggression: hintsField.chunkHints.chunkAggression ?? 0,
    prewarmNeeded,
    cachePriority,
    coldStartRisk,
    meshPressureIndex,
    castleLoadLevel,
    factoringSignal,

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

// ---------------------------------------------------------------------------
// Binary + Wave surfaces (v30, lane-aware)
// ---------------------------------------------------------------------------
function buildMetabolicBandBinaryWave(job, cycleIndex, presenceField, laneIndex) {
  const band = normalizeBand(job?.band || job?.meta?.band || "symbolic");

  const bandSig = buildDualHashSignature(
    "BAND_V30",
    { kind: "band", band, cycleIndex, laneIndex },
    `BAND_V30::${band}::CYCLE::${cycleIndex}::LANE::${laneIndex}`
  );

  metabolicHealing.lastBand = band;
  metabolicHealing.lastBandSignatureIntel = bandSig.intel;
  metabolicHealing.lastBandSignatureClassic = bandSig.classic;

  const payloadType = job?.payload?.type || "NO_TYPE";
  const payloadKeysCount = job?.payload ? Object.keys(job.payload).length : 0;

  const surface =
    payloadType.length +
    payloadKeysCount +
    cycleIndex +
    laneIndex +
    (presenceField?.meshPressureIndex || 0) +
    (presenceField?.castleLoadLevel || 0);

  const binarySig = buildDualHashSignature(
    "BMETA_V30",
    {
      kind: "binarySurface",
      payloadType,
      payloadTypeLength: payloadType.length,
      payloadKeysCount,
      cycleIndex,
      laneIndex,
      meshPressureIndex: presenceField?.meshPressureIndex || 0,
      castleLoadLevel: presenceField?.castleLoadLevel || 0,
      surface
    },
    `BMETA_V30::${surface}`
  );

  const binaryField = {
    binaryMetabolicSignatureIntel: binarySig.intel,
    binaryMetabolicSignatureClassic: binarySig.classic,
    binarySurfaceSignatureIntel: binarySig.intel,
    binarySurfaceSignatureClassic: binarySig.classic,
    binarySurface: {
      payloadTypeLength: payloadType.length,
      payloadKeysCount,
      cycle: cycleIndex,
      laneIndex,
      meshPressureIndex: presenceField?.meshPressureIndex || 0,
      castleLoadLevel: presenceField?.castleLoadLevel || 0,
      surface
    },
    parity: surface % 2 === 0 ? 0 : 1,
    density: payloadKeysCount,
    shiftDepth: Math.max(0, Math.floor(Math.log2(surface || 1)))
  };
  metabolicHealing.lastBinaryField = binaryField;

  const waveSig = buildDualHashSignature(
    "WAVE_META_V30",
    {
      kind: "waveSurface",
      payloadKeysCount,
      cycleIndex,
      laneIndex,
      meshStrength: presenceField?.meshStrength || 0,
      meshPressureIndex: presenceField?.meshPressureIndex || 0
    },
    `WAVE_META_V30::${payloadKeysCount}::${cycleIndex}::${laneIndex}`
  );

  const waveField = {
    waveMetabolicSignatureIntel: waveSig.intel,
    waveMetabolicSignatureClassic: waveSig.classic,
    amplitude: payloadKeysCount + (presenceField?.meshStrength || 0),
    wavelength: cycleIndex,
    phase:
      (payloadKeysCount +
        cycleIndex +
        laneIndex +
        (presenceField?.meshPressureIndex || 0)) % 8,
    band,
    mode: band === "binary" ? "compression-wave" : "symbolic-wave"
  };
  metabolicHealing.lastWaveField = waveField;

  return { band, binaryField, waveField };
}

// ---------------------------------------------------------------------------
// PulseIntelligence v30 + IntelligentMetabolicPlan v30
// ---------------------------------------------------------------------------
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

  const factoring = computeProfile.factoringSignal ? 1 : 0;
  const bandIsBinary = band === "binary" ? 1 : 0;

  const solvednessScore = Math.max(
    0,
    Math.min(
      advantageScore * 10 * 0.5 +
        presenceWeight * 0.25 +
        factoring * 0.25,
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
    pulseIntelligenceVersion: "META-PI-V30++",
    solvednessScore,
    computeTier,
    readinessScore,
    band,
    advantageTier,
    factoringSignal: factoring ? "high" : "low"
  };
}

function buildIntelligentMetabolicPlan({ job, band, presenceField, advantageField, computeProfile, laneIndex }) {
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

  return Object.freeze({
    planVersion: "META-INTEL-30.0-PLUSPLUS",
    jobId,
    payloadType,
    band,
    laneIndex,

    routeBand: preferBinary ? "binary" : "symbolic",

    useGPU: preferGPU,
    useMiner: preferMiner,
    useOffline: preferOffline,

    computeTier: refinedComputeTier,

    shouldPrewarm: !!computeProfile.prewarmNeeded,
    cachePriority: computeProfile.cachePriority,
    chunkAggression: computeProfile.chunkAggression,

    factoringSignal: computeProfile.factoringSignal,
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
  });
}

// ---------------------------------------------------------------------------
// Local advantage memory
// ---------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------
// Deterministic micro-op handlers (you can plug your existing ones here)
// ---------------------------------------------------------------------------
function runComputeCell(data) {
  // deterministic compute micro-op
  return data;
}

function runImageCell(data) {
  // deterministic image micro-op
  return data;
}

function runScriptCell(script, input) {
  // deterministic script micro-op (no eval / Function)
  return { script, input };
}

// ---------------------------------------------------------------------------
// executePulseEarnJob — v30++ cell-engine superpipeline
// ---------------------------------------------------------------------------
export function executePulseEarnJob(job, globalHints = {}) {
  metabolismCycle++;
  metabolicHealing.cycleCount++;
  metabolicHealing.lastCycleIndex = metabolismCycle;
  metabolicHealing.executionState = "validating";

  let errorCount = 0;

  if (!job || !job.id || !job.payload) {
    metabolicHealing.lastError = "invalid_job_format";
    metabolicHealing.executionState = "error";
    errorCount = 1;

    const presenceField = buildPresenceField(job, globalHints);
    const advantageField = buildAdvantageField(job, globalHints);
    const hintsField = buildHintsField(job, globalHints);

    const band = normalizeBand(job?.band || job?.meta?.band || "symbolic");
    const laneIndex = selectMetabolicLane(job?.id, band);

    const computeProfile = buildMetabolicComputeProfile(band, hintsField, presenceField);

    const pressureTier = "critical"; // invalid job is always critical degrade
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

    metabolicHealing.lastPresenceField = presenceField;
    metabolicHealing.lastAdvantageField = advantageField;
    metabolicHealing.lastHintsField = hintsField;
    metabolicHealing.lastMetabolicComputeProfile = computeProfile;
    metabolicHealing.lastMetabolicPressureProfile = metabolicPressureProfile;

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
      band,
      laneIndex,
      pressureTier,
      metabolicPressureProfile,
      metabolicComputeProfile: computeProfile,
      pulseIntelligence,
      metabolicIntelligentPlan: null,
      cycleIndex: metabolismCycle
    };
  }

  const presenceField = buildPresenceField(job, globalHints);
  const advantageField = buildAdvantageField(job, globalHints);
  const hintsField = buildHintsField(job, globalHints);

  metabolicHealing.lastPresenceField = presenceField;
  metabolicHealing.lastAdvantageField = advantageField;
  metabolicHealing.lastHintsField = hintsField;

  const band = normalizeBand(job?.band || job?.meta?.band || "symbolic");
  const laneIndex = selectMetabolicLane(job.id, band);
  metabolicHealing.lastLaneIndex = laneIndex;
  metabolicHealing.lastLaneBand = band;

  const { binaryField, waveField } = buildMetabolicBandBinaryWave(
    job,
    metabolismCycle,
    presenceField,
    laneIndex
  );

  const metabolicComputeProfile = buildMetabolicComputeProfile(band, hintsField, presenceField);
  metabolicHealing.lastMetabolicComputeProfile = metabolicComputeProfile;

  const pressureTier = presenceField.presenceTier || "idle";
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
  metabolicHealing.lastPayloadType = job.payload.type;
  
  const presenceTier = presenceField.presenceTier || "idle";
  
  const jobSig = buildDualHashSignature(
    "JOB_V30",
    {
      kind: "job",
      id: job.id,
      payloadType: job.payload.type,
      cycleIndex: metabolismCycle,
      band,
      laneIndex,
      presenceTier
    },
    `JOB_V30::${job.id}::${job.payload.type}::${metabolismCycle}::${band}::${laneIndex}::${presenceTier}`
  );

  const payloadSig = buildDualHashSignature(
    "PAYLOAD_V30",
    {
      kind: "payload",
      type: job.payload.type,
      keys: Object.keys(job.payload).sort(),
      cycleIndex: metabolismCycle,
      band,
      laneIndex
    },
    `PAYLOAD_V30::${job.payload.type}::${Object.keys(job.payload).sort().join("::")}::${metabolismCycle}::${band}::${laneIndex}`
  );

  metabolicHealing.lastJobSignatureIntel = jobSig.intel;
  metabolicHealing.lastJobSignatureClassic = jobSig.classic;
  metabolicHealing.lastPayloadSignatureIntel = payloadSig.intel;
  metabolicHealing.lastPayloadSignatureClassic = payloadSig.classic;

  metabolicHealing.executionState = "executing";

  let result;
  const payload = job.payload;

  switch (payload.type) {
    case "compute":
      result = runComputeCell(payload.data);
      break;
    case "image-processing":
      result = runImageCell(payload.data);
      break;
    case "script":
      result = runScriptCell(payload.script, payload.input);
      break;
    default:
      metabolicHealing.lastError = "unknown_payload_type";
      metabolicHealing.executionState = "error";
      errorCount = 1;

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
        laneIndex,
        pressureTier,
        metabolicPressureProfile,
        metabolicComputeProfile,
        pulseIntelligence: pulseIntelligenceUnknown,
        metabolicIntelligentPlan: null,
        binaryField,
        waveField,
        presenceField,
        advantageField,
        hintsField,
        cycleIndex: metabolismCycle
      };
  }

  metabolicHealing.lastResult = result;
  metabolicHealing.executionState = "returning";

  const metabolicSig = buildDualHashSignature(
    "META_V30",
    {
      kind: "metabolism",
      jobId: job.id,
      payloadType: payload.type,
      cycleIndex: metabolismCycle,
      band,
      laneIndex,
      presenceTier,
      pressureTier
    },
    `META_V30::${job.id}::${payload.type}::${metabolismCycle}::${band}::${laneIndex}::${presenceTier}::${pressureTier}`
  );

  metabolicHealing.lastMetabolicSignatureIntel = metabolicSig.intel;
  metabolicHealing.lastMetabolicSignatureClassic = metabolicSig.classic;

  const metabolicPresenceProfile = {
    presenceTier,
    band,
    laneIndex,
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
    computeProfile: metabolicComputeProfile,
    laneIndex
  });

  metabolicHealing.lastPulseIntelligence = pulseIntelligence;
  metabolicHealing.lastMetabolicIntelligentPlan = metabolicIntelligentPlan;

  recordAdvantageMemory(job, band, advantageField);

  return {
    success: true,
    jobId: job.id,
    output: result,
    band,
    laneIndex,
    pressureTier,
    metabolicPressureProfile,
    metabolicComputeProfile,
    pulseIntelligence,
    metabolicIntelligentPlan,
    binaryField,
    waveField,
    presenceField,
    advantageField,
    hintsField,
    metabolicPresenceProfile,
    binaryProfile,
    waveProfile,
    cycleIndex: metabolismCycle
  };
}

// ---------------------------------------------------------------------------
// Healing state export
// ---------------------------------------------------------------------------
export function getPulseEarnMetabolismHealingState() {
  return { ...metabolicHealing };
}
