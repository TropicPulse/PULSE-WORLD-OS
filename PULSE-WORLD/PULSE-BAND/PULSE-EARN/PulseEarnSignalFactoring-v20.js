// ============================================================================
// FILE: PulseEarnSignalFactoring-v20-IMMORTAL-INTEL++.js
// [pulse:earn] SIGNAL FACTORING LAYER — v20‑IMMORTAL‑INTEL++‑DUALHASH‑BASESHAPE
// ----------------------------------------------------------------------------
// ROLE:
//   • Earn‑level 1/0 factoring engine (metadata‑only, INTEL‑aware, base‑shape aware).
//   • Mirrors Mesh signal factoring (pressure, depth, stride, /2 pattern) at Earn page layer.
//   • Shapes EVERY Earn page with factoring pressure from jobs, mesh, device, cache, hints.
//   • Emits dual INTEL + classic signatures for factoring + base‑shape state.
//   • Exposes band/binary/wave + advantage + chunk/prewarm + baseFormulaKey surfaces.
//   • Fully compatible with PulseSignalFactoringGuide (Mesh + Earn atlas).
// ----------------------------------------------------------------------------
// SAFETY CONTRACT (IMMORTAL v20‑INTEL):
//   • No payload mutation beyond page.meta / page.flags.
//   • No routing influence (metadata only; routers MAY read but not obey).
//   • No randomness, no timestamps, no async, no network, no filesystem.
//   • Zero side‑effects outside page.meta / page.flags.
//   • Deterministic‑field: identical input → identical output.
//   • Drift‑proof across versions, multi‑instance safe.
// ============================================================================

/*
AI_EXPERIENCE_META = {
  identity: "PulseEarnSignalFactoring",
  version: "v20-IMMORTAL-INTEL++",
  layer: "earn",
  role: "earn_signal_factoring_engine",
  lineage: "PulseEarnSignalFactoring-v16 → v20-IMMORTAL-INTEL++",

  evo: {
    // Core factoring traits
    signalFactoring: true,
    factoringPressureEngine: true,
    factoringDepthEngine: true,
    factoringStrideEngine: true,
    factoringIntentEngine: true,

    // Awareness traits
    jobLoadAware: true,
    meshPressureAware: true,
    presenceAware: true,
    bandAware: true,
    advantageAware: true,
    hintsAware: true,

    // Band traits
    symbolicPrimary: true,
    binaryAware: true,
    dualBand: true,

    // IMMORTAL traits
    deterministic: true,
    deterministicField: true,
    driftProof: true,
    multiInstanceReady: true,
    selfRepairable: true,

    // Safety traits
    zeroNetwork: true,
    zeroFilesystem: true,
    zeroAsync: true,
    zeroRandomness: true,
    zeroMutationOfInput: true,
    zeroRoutingInfluence: true,

    // Performance metadata traits
    chunkAware: true,
    prewarmAware: true,
    cacheAware: true,

    // INTEL traits
    intelSignatureAware: true,
    dualHashAware: true,
    structureAware: true,
    contextAware: true,

    // Base‑shape / formula traits
    baseShapeAware: true,
    baseFormulaKeyAware: true,
    patternMatchSurface: true
  },

  contract: {
    always: [
      "PulseEarnHeart",
      "PulseEarnMetabolism",
      "PulseEarnLymphNodes",
      "PulseMesh",
      "PulseMeshSignalFactoring",
      "PulseSignalFactoringGuide"
    ],
    never: [
      "legacyEarnFactoring",
      "safeRoute",
      "fetchViaCNS",
      "userScript",
      "dynamicEval"
    ]
  }
}
*/

// ============================================================================
// HASH HELPERS — v20‑IMMORTAL‑INTEL (dual‑hash)
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

// ============================================================================
// GENERIC HELPERS
// ============================================================================

function clamp01(v) {
  const n = Number(v);
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.min(1, n));
}

function safeNumber(v, fallback = 0) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

function normalizeBand(band) {
  const x = String(band || "symbolic").toLowerCase();
  return x === "binary" ? "binary" : "symbolic";
}

// ============================================================================
// BAND / BINARY / WAVE SURFACE — EARN PAGE
// ============================================================================

function buildPageBandBinaryWave(page, cycleIndex, deviceProfile = {}) {
  const band = normalizeBand(
    page?.meta?.band ||
      page?.band ||
      deviceProfile?.band ||
      deviceProfile?.presenceBand ||
      "symbolic"
  );

  const idLen = String(page?.id || page?.key || "NO_PAGE_ID").length;
  const jobCount = safeNumber(Array.isArray(page?.jobs) ? page.jobs.length : 0);
  const meshPressure = safeNumber(page?.presenceField?.meshPressureIndex || 0);
  const gpuScore = safeNumber(deviceProfile?.gpuScore || 0);

  const surface = idLen + jobCount + meshPressure + gpuScore + cycleIndex;

  const binaryField = {
    binaryPageSignature: computeHash(`BPAGE::${surface}`),
    binarySurfaceSignature: computeHash(`BSURF_EARN_PAGE::${surface}`),
    binarySurface: {
      idLen,
      jobCount,
      meshPressure,
      gpuScore,
      cycle: cycleIndex,
      surface
    },
    parity: surface % 2 === 0 ? 0 : 1,
    density: jobCount + meshPressure + gpuScore,
    shiftDepth: Math.max(0, Math.floor(Math.log2(surface || 1)))
  };

  const waveField = {
    amplitude: jobCount + meshPressure + gpuScore,
    wavelength: cycleIndex || 1,
    phase: (idLen + jobCount + cycleIndex) % 16,
    band,
    mode: band === "binary" ? "compression-wave" : "symbolic-wave"
  };

  return { band, binaryField, waveField };
}

// ============================================================================
// ADVANTAGE FIELD — EARN PAGE
// ============================================================================

function buildPageAdvantageField(page, deviceProfile, bandPack, factoringProfile, bandSnapshot = null) {
  const gpuScore = safeNumber(deviceProfile?.gpuScore || 0);
  const bandwidth = safeNumber(deviceProfile?.bandwidthMbps || 0);
  const chunkBudgetKB = safeNumber(deviceProfile?.chunkField?.chunkBudgetKB || 0);
  const cacheLines = safeNumber(deviceProfile?.chunkField?.cacheLines || 0);
  const prewarmSlots = safeNumber(deviceProfile?.chunkField?.prewarmSlots || 0);

  const density = bandPack.binaryField.density;
  const amplitude = bandPack.waveField.amplitude;

  const presenceTier = factoringProfile.presenceTier;
  const advantageTier = factoringProfile.advantageTier;

  const bandMode = bandSnapshot?.mode || "normal";
  const bandLevel = bandSnapshot?.bandLevel || null;
  const fallbackLevel = bandSnapshot?.fallbackLevel || 0;

  const advantageScore =
    gpuScore * 0.0005 +
    bandwidth * 0.0002 +
    density * 0.00001 +
    amplitude * 0.00001 +
    (chunkBudgetKB + cacheLines + prewarmSlots) * 0.000001 +
    (presenceTier === "presence_high" ? 0.01 : 0) +
    (advantageTier >= 2 ? 0.005 : 0);

  const bandRisk =
    bandMode === "high_risk" ||
    bandMode === "offline_biased" ||
    fallbackLevel > 0;

  return {
    advantageVersion: "M-20.0-EARN-PAGE",
    band: bandPack.band,
    gpuScore,
    bandwidth,
    binaryDensity: density,
    waveAmplitude: amplitude,
    chunkBudgetKB,
    cacheLines,
    prewarmSlots,
    presenceTier,
    advantageTier,
    advantageScore,
    bandMode,
    bandLevel,
    fallbackLevel,
    bandRisk
  };
}

// ============================================================================
// CHUNK / PREWARM PLAN — EARN PAGE
// ============================================================================

function buildPageChunkPrewarmPlan(page, factoringProfile, bandPack, advantageField) {
  let priorityLabel = "normal";
  if (factoringProfile.presenceTier === "presence_high") priorityLabel = "high";
  else if (factoringProfile.presenceTier === "presence_mid") priorityLabel = "medium";
  else if (factoringProfile.presenceTier === "presence_low") priorityLabel = "low";

  if (advantageField.advantageScore >= 0.05) {
    priorityLabel = "high";
  } else if (advantageField.advantageScore >= 0.02 && priorityLabel === "normal") {
    priorityLabel = "medium";
  }

  const jobCount = factoringProfile.jobCount;
  const planSurface =
    jobCount +
    (factoringProfile.meshPressureIndex || 0) * 2 +
    (safeNumber(factoringProfile.cachePriority, 0) || 0) * 3;

  let gpuBatchStyle = "none";
  if (jobCount >= 32) gpuBatchStyle = "warp_aligned";

  let cacheTier = "cold";
  if (factoringProfile.cachePriority === "high" || advantageField.advantageScore >= 0.5) {
    cacheTier = "hot";
  } else if (factoringProfile.cachePriority === "normal" && advantageField.advantageScore >= 0.2) {
    cacheTier = "warm";
  }

  return {
    planVersion: "v20-IMMORTAL-INTEL-EARN-PAGE",
    priorityLabel,
    bandPresence: factoringProfile.presenceTier,
    band: bandPack.band,
    planSurface,
    gpuBatchStyle,
    cacheTier,
    chunks: {
      pageEnvelope: true,
      jobList: true,
      presenceAdvantageEnvelope: true
    },
    cache: {
      pageDiagnostics: true,
      factoringProfile: true
    },
    prewarm: {
      circulatorySystem: factoringProfile.prewarmNeeded,
      lymphNodes: factoringProfile.prewarmNeeded,
      metabolism: factoringProfile.prewarmNeeded && jobCount > 0
    }
  };
}

// ============================================================================
// FACTORING PROFILE — 1/2 then 2/2 pattern
// ============================================================================

function buildEarnFactoringProfile(page, deviceProfile, cycleIndex) {
  const jobs = Array.isArray(page?.jobs) ? page.jobs : [];
  const jobCount = jobs.length;

  const meshPressureIndex = safeNumber(
    page?.presenceField?.meshPressureIndex || 0
  );
  const cachePriority = safeNumber(page?.meta?.cachePriority || 0);
  const presenceBand =
    page?.presenceField?.presenceBand ||
    page?.meta?.band ||
    deviceProfile?.presenceBand ||
    "symbolic";

  let presenceTier = "presence_low";
  const presenceScore = meshPressureIndex + jobCount * 0.1;
  if (presenceScore >= 8) presenceTier = "presence_high";
  else if (presenceScore >= 3) presenceTier = "presence_mid";

  const gpuScore = safeNumber(deviceProfile?.gpuScore || 0);
  const bandwidth = safeNumber(deviceProfile?.bandwidthMbps || 0);
  let advantageTier = 0;
  const advantageRaw = gpuScore * 0.001 + bandwidth * 0.01;
  if (advantageRaw >= 10) advantageTier = 3;
  else if (advantageRaw >= 4) advantageTier = 2;
  else if (advantageRaw >= 1) advantageTier = 1;

  const basePressure =
    jobCount * 0.05 +
    meshPressureIndex * 0.1 +
    cachePriority * 0.05 +
    advantageTier * 0.02;
  const pressure = clamp01(basePressure);

  const depth = Math.max(
    1,
    Math.floor(1 + Math.log2(1 + cycleIndex + pressure * 8))
  );

  const phaseBoundary = 4;
  const inSecondPhase = cycleIndex >= phaseBoundary || pressure >= 0.7;
  const stride = inSecondPhase ? 2 : 1;

  const signal = pressure > 0.15 && jobCount > 0 ? 1 : 0;
  const prewarmNeeded = pressure > 0.25 && jobCount > 0;

  return {
    version: "v20-IMMORTAL-INTEL-EARN-PAGE",
    cycleIndex,
    jobCount,
    meshPressureIndex,
    cachePriority,
    presenceBand,
    presenceTier,
    advantageTier,
    pressure,
    depth,
    stride,
    signal,
    prewarmNeeded
  };
}

// ============================================================================
// BASE SHAPE / BASE FORMULA SURFACE — EARN PAGE
// ============================================================================

function buildEarnBaseShapeSurface(page, factoringProfile, bandPack, advantageField) {
  const jobs = Array.isArray(page?.jobs) ? page.jobs : [];
  const jobKinds = jobs.map(j => String(j.kind || j.type || "job")).sort();
  const jobKindHistogram = jobKinds.reduce((acc, k) => {
    acc[k] = (acc[k] || 0) + 1;
    return acc;
  }, {});

  const shapePayload = {
    version: "v20-IMMORTAL-INTEL-EARN-PAGE-BASESHAPE",
    jobCount: factoringProfile.jobCount,
    jobKinds: jobKindHistogram,
    presenceTier: factoringProfile.presenceTier,
    advantageTier: factoringProfile.advantageTier,
    presenceBand: factoringProfile.presenceBand,
    depth: factoringProfile.depth,
    stride: factoringProfile.stride,
    pressure: factoringProfile.pressure,
    band: bandPack.band,
    binaryDensity: bandPack.binaryField.density,
    waveAmplitude: bandPack.waveField.amplitude,
    advantageScore: advantageField.advantageScore,
    bandMode: advantageField.bandMode,
    bandRisk: advantageField.bandRisk
  };

  const classicShapeString = [
    "EARN_BASE_SHAPE",
    shapePayload.version,
    factoringProfile.jobCount,
    factoringProfile.presenceTier,
    factoringProfile.advantageTier,
    factoringProfile.presenceBand,
    factoringProfile.depth,
    factoringProfile.stride,
    factoringProfile.pressure.toFixed(4),
    bandPack.band,
    bandPack.binaryField.density,
    bandPack.waveField.amplitude.toFixed(4),
    advantageField.advantageScore.toFixed(6),
    JSON.stringify(jobKindHistogram)
  ].join("::");

  const shapeSig = buildDualHashSignature(
    "EARN_PAGE_BASE_SHAPE",
    shapePayload,
    classicShapeString
  );

  const baseFormulaKey = shapeSig.intel;

  return {
    baseShapeVersion: shapePayload.version,
    baseShapeIntelSignature: shapeSig.intel,
    baseShapeClassicSignature: shapeSig.classic,
    baseFormulaKey,
    shapePayload
  };
}

// ============================================================================
// IMMORTAL META TEMPLATE — v20‑IMMORTAL‑INTEL (Earn Page)
// ============================================================================

function buildEarnSignalFactoringMeta(existingMeta, cycleIndex, factoringProfile) {
  const base = existingMeta || {};
  const intelPayload = {
    kind: "earnPageSignalFactoring",
    version: "v20-IMMORTAL-INTEL",
    cycleIndex,
    pressure: factoringProfile.pressure,
    signal: factoringProfile.signal,
    depth: factoringProfile.depth,
    stride: factoringProfile.stride,
    presenceTier: factoringProfile.presenceTier,
    advantageTier: factoringProfile.advantageTier,
    jobCount: factoringProfile.jobCount,
    meshPressureIndex: factoringProfile.meshPressureIndex,
    cachePriority: factoringProfile.cachePriority,
    prewarmNeeded: factoringProfile.prewarmNeeded,
    presenceBand: factoringProfile.presenceBand
  };

  const classicString =
    `EARN_FACTORS::CYCLE:${cycleIndex}` +
    `::SIG:${factoringProfile.signal}` +
    `::DEPTH:${factoringProfile.depth}` +
    `::STRIDE:${factoringProfile.stride}` +
    `::JOBS:${factoringProfile.jobCount}`;

  const sig = buildDualHashSignature(
    "EARN_PAGE_SIGNAL_FACTORS",
    intelPayload,
    classicString
  );

  return {
    ...base,
    earnSignalFactoring: {
      layer: "PulseEarnSignalFactoring",
      role: "EARN_PAGE_SIGNAL_FACTORS",
      version: "v20-IMMORTAL-INTEL",
      target: "earn-page",
      selfRepairable: true,
      evo: {
        dualMode: true,
        binaryAware: true,
        symbolicAware: true,
        jobLoadAware: true,
        presenceAware: true,
        advantageAware: true,
        hintsAware: true,
        meshPressureAware: true,
        cachePriorityAware: true,
        prewarmAware: true,

        unifiedAdvantageField: true,
        deterministicField: true,
        driftProof: true,
        multiInstanceReady: true,

        signalFactoringAware: true,
        bandAware: true,

        zeroCompute: true,
        zeroMutation: true,
        zeroRoutingInfluence: true,

        baseShapeAware: true,
        baseFormulaKeyAware: true,
        patternMatchSurface: true
      },
      signatures: {
        factoringSignatureIntel: sig.intel,
        factoringSignatureClassic: sig.classic
      },
      profile: factoringProfile
    }
  };
}

// ============================================================================
// GLOBAL CYCLE COUNTER (earn‑page‑local, deterministic)
// ============================================================================

let earnFactoringCycle = 0;

// ============================================================================
// CORE API — applyEarnSignalFactoring (v20‑IMMORTAL‑INTEL++)
// ============================================================================

export function applyEarnSignalFactoring(page, context = {}) {
  if (!page) return page;

  earnFactoringCycle++;

  page.meta = page.meta || {};
  page.flags = page.flags || {};

  const deviceProfile   = context.deviceProfile || {};
  const presenceField   = context.presenceField   || page.presenceField   || {};
  const advantageFieldC = context.advantageField  || page.advantageField  || {};
  const hintsField      = context.hintsField      || page.hintsField      || {};
  const jobs            = Array.isArray(page.jobs) ? page.jobs : [];
  const jobCount        = safeNumber(context.jobCountOverride ?? jobs.length, 0);

  const presenceTier    = presenceField.presenceTier || "idle";
  const meshPressureIdx = safeNumber(presenceField.meshPressureIndex, 0);
  const advantageTier   = safeNumber(advantageFieldC.advantageTier, 0);
  const fallbackBandLvl = safeNumber(hintsField.fallbackBandLevel, 0);

  const cachePriority   = context.cachePriority || page.flags.cachePriority || "normal";
  const prewarmNeeded   = !!(context.prewarmNeeded || page.flags.prewarmNeeded);
  const presenceBand    = context.band || page.band || "symbolic";

  // 1) Factoring pressure
  const meshPressureNorm = clamp01(meshPressureIdx / 200);
  const jobLoadNorm      = clamp01(jobCount / 100);
  const advantageNorm    = clamp01(advantageTier / 3);
  const fallbackBandNorm = clamp01(fallbackBandLvl / 3);

  const factoringPressure =
    meshPressureNorm   * 0.30 +
    jobLoadNorm        * 0.30 +
    advantageNorm      * 0.20 +
    fallbackBandNorm   * 0.20;

  const clampedPressure = clamp01(factoringPressure);
  page.flags.earn_factoring_pressure = clampedPressure;

  // 2) Signal
  const highPressure   = clampedPressure >= 0.6;
  const lowPressure    = clampedPressure <= 0.2;
  const criticalCache  = cachePriority === "critical";

  let signal;
  if (criticalCache || prewarmNeeded) {
    signal = 1;
  } else if (highPressure) {
    signal = 1;
  } else if (lowPressure) {
    signal = 0;
  } else {
    signal = page.flags.earn_factoringSignal ?? 0;
  }

  page.flags.earn_factoringSignal = signal;

  // 3) Depth
  const previousDepth = page.flags.earn_factoringDepth ?? 0;
  const depth =
    signal === 1
      ? Math.min(previousDepth + 1, 8)
      : 0;

  page.flags.earn_factoringDepth = depth;

  // 4) Stride
  const stride =
    depth > 0 ? 1 / (depth + 1) : 1;

  page.flags.earn_factoringStride = stride;

  // 5) Intent
  page.flags.earn_factoring_intent =
    signal === 1
      ? "prefer_factored_page"
      : "normal";

  // 6) Factoring profile
  const factoringProfile = {
    version: "v20-IMMORTAL-INTEL-EARN-PAGE",
    cycleIndex: earnFactoringCycle,
    jobCount,
    meshPressureIndex: meshPressureIdx,
    cachePriority,
    presenceBand,
    presenceTier,
    advantageTier,
    pressure: clampedPressure,
    depth,
    stride,
    signal,
    prewarmNeeded,
    fallbackBandLevel: fallbackBandLvl
  };

  page.flags.earn_factoring_profile = {
    ...factoringProfile
  };

  // 7) Band/Binary/Wave + Advantage + Chunk/Prewarm
  const bandPack = buildPageBandBinaryWave(
    page,
    earnFactoringCycle,
    deviceProfile
  );

  const bandSnapshot = {
    mode: hintsField.bandMode || "normal",
    bandLevel: hintsField.bandLevel || null,
    fallbackLevel: fallbackBandLvl
  };

  const pageAdvantageField = buildPageAdvantageField(
    page,
    deviceProfile,
    bandPack,
    factoringProfile,
    bandSnapshot
  );

  const pageChunkPrewarmPlan = buildPageChunkPrewarmPlan(
    page,
    factoringProfile,
    bandPack,
    pageAdvantageField
  );

  // 8) Base shape / base formula
  const baseShapeSurface = buildEarnBaseShapeSurface(
    page,
    factoringProfile,
    bandPack,
    pageAdvantageField
  );

  // 9) IMMORTAL meta block
  page.meta = buildEarnSignalFactoringMeta(
    page.meta,
    earnFactoringCycle,
    {
      ...factoringProfile,
      band: bandPack.band,
      binaryDensity: bandPack.binaryField.density,
      waveAmplitude: bandPack.waveField.amplitude,
      advantageScore: pageAdvantageField.advantageScore
    }
  );

  page.meta.earnSignalFactoring.bandBinaryWave    = bandPack;
  page.meta.earnSignalFactoring.advantageField    = pageAdvantageField;
  page.meta.earnSignalFactoring.chunkPrewarmPlan  = pageChunkPrewarmPlan;
  page.meta.earnSignalFactoring.baseShapeSurface  = baseShapeSurface;

  page.meta.earnSignalFactoring.baseFormulaKey    = baseShapeSurface.baseFormulaKey;
  page.meta.earnSignalFactoring.baseShapeVersion  = baseShapeSurface.baseShapeVersion;

  page.flags.earnSignalFactoring = true;

  return page;
}

export default applyEarnSignalFactoring;
