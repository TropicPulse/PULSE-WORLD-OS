// ============================================================================
// FILE: tropic-pulse-functions/PULSE-WORLD/PULSE-EARN/PulseEarnMetabolism-v16-IMMORTAL-INTEL.js
// LAYER: THE METABOLIC ENGINEER (v16-IMMORTAL-INTEL)
// (Interpreter of Jobs + Safe Executor + Deterministic Throughput Engine)
// ============================================================================
//
// ROLE (v16-IMMORTAL-INTEL):
//   THE METABOLIC ENGINEER — Pulse‑Earn’s deterministic execution organ.
//   • Reads the blueprint (job payload).
//   • Selects the correct safe tool (compute/image/script handler).
//   • Executes deterministically with NO performance math.
//   • Emits v16‑IMMORTAL presence/advantage/hints surfaces.
//   • Emits binary-first + wave surfaces.
//   • Emits metabolicComputeProfile (metadata-only).
//   • Emits metabolicPressureProfile (diagnostic-only).
//   • Emits dual-hash INTEL signatures (INTEL + classic fallback).
//
// CONTRACT (v16-IMMORTAL-INTEL):
//   • PURE EXECUTION BRIDGE — no AI layers, no translation, no memory model.
//   • NO eval(), NO Function(), NO dynamic imports.
//   • NO user scripts, NO network calls, NO filesystem access.
//   • NEVER mutate job objects.
//   • Deterministic output only.
//   • Dual-band + binary + wave + presence metadata are structural-only.
//   • NO speed, NO baseline, NO governor, NO performance assumptions.
//   • NO timestamps, NO randomness, NO nondeterministic behavior.
// ============================================================================
//
// AI_EXPERIENCE_META (v16-IMMORTAL-INTEL):
//
//   identity: "PulseEarnMetabolism"
//   version: "v16-IMMORTAL-INTEL"
//   layer: "earn_metabolism"
//   role: "earn_metabolic_engine"
//   lineage: "PulseEarnMetabolism-v11 → v12.3 → v13.0-Presence-Immortal → v16-IMMORTAL-INTEL"
//
//   evo:
//     metabolismEngine: true
//     nutrientFlow: true
//     jobEnergyModel: true
//     dualBand: true
//     symbolicPrimary: true
//     binaryAware: true
//
//     deterministic: true
//     driftProof: true
//     pureCompute: true
//     zeroMutationOfInput: true
//     zeroNetwork: true
//     zeroFilesystem: true
//
//   contract.always:
//     - "PulseEarnHeart"
//     - "PulseEarnCirculatorySystem"
//     - "PulseEarnGenome"
//     - "PulseEarnImmuneSystem"
//     - "PulseEarnLymphNodes"
//
//   contract.never:
//     - "safeRoute"
//     - "fetchViaCNS"
//     - "userScript"
//     - "dynamicEval"
// ============================================================================

export const PulseEarnMetabolismMeta = Object.freeze({
  layer: "PulseEarnMetabolism",
  role: "EARN_METABOLISM_ORGAN",
  version: "v16-IMMORTAL-INTEL",
  identity: "PulseEarnMetabolism-v16-IMMORTAL-INTEL",

  guarantees: Object.freeze({
    deterministic: true,
    noRandomness: true,
    noRealTime: true,
    noExternalIO: true,
    pureExecutionBridge: true,
    dualBandAware: true,
    binaryAware: true,
    waveFieldAware: true,
    healingMetadataAware: true,
    presenceAware: true,
    advantageAware: true,
    hintsAware: true,
    meshAware: true,
    castleAware: true,
    regionAware: true,
    worldLensAware: false,
    zeroAI: true,
    zeroUserCode: true,
    zeroAsync: true,
    safeToolSelection: true,
    safeExecution: true
  }),

  contract: Object.freeze({
    input: [
      "PulseEarnJob",
      "DualBandContext",
      "MetabolicBlueprint",
      "SafeToolset",
      "GlobalHintsPresenceField"
    ],
    output: [
      "MetabolicResult",
      "MetabolicDiagnostics",
      "MetabolicSignatures",
      "MetabolicHealingState"
    ]
  }),

  lineage: Object.freeze({
    root: "PulseOS-v11-Evo",
    parent: "PulseEarn-v16-IMMORTAL-INTEL",
    ancestry: [
      "PulseEarnMetabolism-v9",
      "PulseEarnMetabolism-v10",
      "PulseEarnMetabolism-v11",
      "PulseEarnMetabolism-v11-Evo",
      "PulseEarnMetabolism-v12.3-Presence-Evo+",
      "PulseEarnMetabolism-v13.0-Presence-Immortal"
    ]
  }),

  bands: Object.freeze({
    supported: ["symbolic", "binary"],
    default: "symbolic",
    behavior: "metadata-only"
  }),

  architecture: Object.freeze({
    pattern: "A-B-A",
    baseline: "validate job → deterministic tool selection",
    adaptive: "binary/wave surfaces + v16 presence/advantage/hints surfaces",
    return: "deterministic metabolic output + healing metadata"
  })
});

// ============================================================================
// ROLE CONTEXT — v16 IMMORTAL-INTEL
// ============================================================================

export const PulseRole = Object.freeze({
  type: "MetabolicEngine",
  subsystem: "PulseEarnMetabolism",
  layer: "C1-MetabolicExecution",
  version: "v16-IMMORTAL-INTEL",
  identity: "PulseEarnMetabolism-v16-IMMORTAL-INTEL",

  evo: {
    driftProof: true,
    deterministicField: true,
    unifiedAdvantageField: true,
    futureEvolutionReady: true,

    metabolismEngine: true,
    nutrientFlow: true,
    jobEnergyModel: true,

    dualBand: true,
    binaryAware: true,
    symbolicAware: true,
    waveAware: true,
    bandNormalizationAware: true,

    zeroAsync: true,
    zeroTiming: true,
    zeroRandomness: true,
    zeroMutation: true,
    zeroRouting: true,
    zeroSending: true,
    zeroCompute: false,

    environmentAgnostic: true,
    multiInstanceReady: true
  }
});

// ============================================================================
// Healing Metadata — v16 IMMORTAL-INTEL
// ============================================================================

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

  lastPressureTier: "idle"
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

  const classicString = `JOB::${job.id}::${job.payload?.type || "NO_TYPE"}::CYCLE::${cycleIndex}::BAND::${band}::PTIER::${presenceTier}`;

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

  const classicString = `PAYLOAD::${payload.type}::${Object.keys(payload)
    .sort()
    .join("::")}::CYCLE::${cycleIndex}::BAND::${band}`;

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

  const classicString = `META_V16::${job?.id || "NO_JOB"}::${cycleIndex}::PTIER:${presenceTier}::BAND:${band}::PRESSURE:${pressureTier}`;

  return buildDualHashSignature("META_V16", intelPayload, classicString);
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
// Presence / Advantage / Hints — v16 IMMORTAL-INTEL
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

  const classicString = `META_PRESENCE_V16::${presenceTier}::${meshPressureIndex}::${castleLoadLevel}`;

  const presenceSignatureDual = buildDualHashSignature(
    "META_PRESENCE_V16",
    intelPayload,
    classicString
  );

  return {
    presenceVersion: "v16-IMMORTAL-INTEL",
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
    advantageVersion: "C-16.0",
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
    }
  };
}

// ============================================================================
// Metabolic Compute Profile (metadata-only, INTEL)
// ============================================================================

function normalizeCachePriority(p) {
  if (!p) return "normal";
  const v = String(p).toLowerCase();
  if (v === "critical" || v === "high" || v === "low") return v;
  return "normal";
}

function buildMetabolicComputeProfile(band, hintsField) {
  return {
    routeBand: band,
    fallbackBandLevel: hintsField.fallbackBandLevel,
    chunkAggression: hintsField.chunkHints.chunkAggression ?? 0,
    prewarmNeeded: !!hintsField.prewarmHints.shouldPrewarm,
    cachePriority: normalizeCachePriority(hintsField.cacheHints.priority),
    coldStartRisk: !!hintsField.coldStartHints.coldStartRisk
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

  const binaryClassicString = `BMETA_V16::${surface}`;

  const binarySignatureDual = buildDualHashSignature(
    "BMETA_V16",
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

  const waveClassicString = `WAVE_META_V16::${payloadKeysCount}::${cycleIndex}`;

  const waveSignatureDual = buildDualHashSignature(
    "WAVE_META_V16",
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
// executePulseEarnJob — Deterministic Metabolic Workflow (v16 IMMORTAL-INTEL)
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
      metabolicHealing.lastMetabolicPressureProfile = metabolicPressureProfile;

      return {
        success: false,
        jobId: job?.id ?? null,
        error: "Invalid job format",
        pressureTier,
        metabolicPressureProfile,
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

    const presenceTier = presenceField.presenceTier;

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

        return {
          success: false,
          jobId: job.id,
          error: `Unknown job type: ${payload.type}`,
          band,
          pressureTier: pressureTierUnknown,
          metabolicPressureProfile: metabolicPressureProfileUnknown,
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
      payloadSignatureClassic: payloadSig.classic
    };

  } catch (err) {
    metabolicHealing.executionState = "error";
    metabolicHealing.lastError = err.message;
    errorCount = 1;

    const presenceField = metabolicHealing.lastPresenceField ||
      buildPresenceField(null, {});
    const advantageField = metabolicHealing.lastAdvantageField || {
      advantageVersion: "C-16.0",
      advantageScore: 0,
      advantageBand: "neutral",
      advantageTier: 0
    };
    const hintsField = metabolicHealing.lastHintsField || {
      fallbackBandLevel: 0,
      chunkHints: {},
      cacheHints: {},
      prewarmHints: {},
      coldStartHints: {}
    };

    const band = normalizeBand(metabolicHealing.lastBand || "symbolic");

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

    return {
      success: false,
      jobId: job?.id ?? null,
      error: err.message,
      band,
      pressureTier,
      metabolicPressureProfile,
      cycleIndex: metabolismCycle
    };
  }
}

// ============================================================================
// SAFE workload handlers — Deterministic Metabolic Tools (v16 IMMORTAL-INTEL)
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
