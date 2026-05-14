// ============================================================================
// FILE: PulseEarnSignalFactoring-v24-IMMORTAL-INTEL++.js
// [pulse:earn] SIGNAL FACTORING LAYER — v24‑IMMORTAL‑INTEL++‑DUALHASH‑BASESHAPE
// ----------------------------------------------------------------------------
// ROLE:
//   • Earn‑level 1/0 factoring engine (metadata‑only, INTEL‑aware, base‑shape aware).
//   • Mirrors Mesh signal factoring (pressure, depth, stride, /2 pattern) at Earn page layer.
//   • Shapes EVERY Earn page with factoring pressure from jobs, mesh, device, cache, hints.
//   • Emits dual INTEL + classic signatures for factoring + base‑shape state.
//   • Exposes band/binary/wave + advantage + chunk/prewarm + baseFormulaKey surfaces.
//   • Fully compatible with PulseSignalFactoringGuide (Mesh + Earn atlas).
// ----------------------------------------------------------------------------
// SAFETY CONTRACT (IMMORTAL v24‑INTEL):
//   • No payload mutation beyond page.meta / page.flags.
//   • No routing influence (metadata only; routers MAY read but not obey).
//   • No randomness, no timestamps, no async, no network, no filesystem.
//   • Zero side‑effects outside page.meta / page.flags.
//   • Deterministic‑field: identical input → identical output.
//   • Drift‑proof across versions, multi‑instance safe.
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

  const idLen        = String(page?.id || page?.key || "NO_PAGE_ID").length;
  const jobCount     = safeNumber(Array.isArray(page?.jobs) ? page.jobs.length : 0);
  const meshPressure = safeNumber(page?.presenceField?.meshPressureIndex || 0);
  const gpuScore     = safeNumber(deviceProfile?.gpuScore || 0);

  const surface = idLen + jobCount + meshPressure + gpuScore + cycleIndex;

  const binarySurface = {
    idLen,
    jobCount,
    meshPressure,
    gpuScore,
    cycle: cycleIndex,
    surface
  };

  const binaryField = {
    binaryPageSignature: computeHash(`BPAGE::${surface}`),
    binarySurfaceSignature: computeHash(`BSURF_EARN_PAGE::${surface}`),
    binarySurface,
    parity: surface % 2 === 0 ? 0 : 1,
    density: jobCount + meshPressure + gpuScore,
    shiftDepth: Math.max(0, Math.floor(Math.log2(surface || 1))),
    dualSignature: buildDualHashSignature(
      "EARN_PAGE_BINARY_v24",
      binarySurface,
      `surface=${surface}`
    )
  };

  const waveSurface = {
    idLen,
    jobCount,
    meshPressure,
    gpuScore,
    cycle: cycleIndex
  };

  const waveField = {
    amplitude: jobCount + meshPressure + gpuScore,
    wavelength: cycleIndex || 1,
    phase: (idLen + jobCount + cycleIndex) % 16,
    band,
    mode: band === "binary" ? "compression-wave" : "symbolic-wave",
    dualSignature: buildDualHashSignature(
      "EARN_PAGE_WAVE_v24",
      waveSurface,
      `band=${band}::cycle=${cycleIndex}`
    )
  };

  const bandSignature = buildDualHashSignature(
    "EARN_PAGE_BAND_v24",
    { band, cycleIndex },
    `${band}::${cycleIndex}`
  );

  return { band, bandSignature, binaryField, waveField };
}

// ============================================================================
// ADVANTAGE FIELD — EARN PAGE (v24-IMMORTAL-INTEL++)
// ============================================================================

function buildPageAdvantageField(page, deviceProfile, bandPack, factoringProfile, bandSnapshot = null) {
  const gpuScore      = safeNumber(deviceProfile?.gpuScore || 0);
  const bandwidth     = safeNumber(deviceProfile?.bandwidthMbps || 0);
  const chunkBudgetKB = safeNumber(deviceProfile?.chunkField?.chunkBudgetKB || 0);
  const cacheLines    = safeNumber(deviceProfile?.chunkField?.cacheLines || 0);
  const prewarmSlots  = safeNumber(deviceProfile?.chunkField?.prewarmSlots || 0);

  const density   = bandPack.binaryField.density;
  const amplitude = bandPack.waveField.amplitude;

  const presenceTier      = factoringProfile.presenceTier;
  const advantageTierBase = factoringProfile.advantageTier;

  const bandMode      = bandSnapshot?.mode || "normal";
  const bandLevel     = bandSnapshot?.bandLevel || null;
  const fallbackLevel = bandSnapshot?.fallbackLevel || 0;

  const rawAdvantageScore =
    gpuScore * 0.0007 +
    bandwidth * 0.00025 +
    density * 0.000015 +
    amplitude * 0.000015 +
    (chunkBudgetKB + cacheLines + prewarmSlots) * 0.0000015 +
    (presenceTier === "presence_high" ? 0.015 : 0) +
    (advantageTierBase >= 2 ? 0.0075 : 0);

  const advantageScore = clamp01(rawAdvantageScore);

  const advantageTier =
    advantageScore >= 0.92 ? 3 :
    advantageScore >= 0.65 ? 2 :
    advantageScore >= 0.30 ? 1 :
    0;

  const bandRisk =
    bandMode === "high_risk" ||
    bandMode === "offline_biased" ||
    fallbackLevel > 0;

  const advantageIntelPayload = {
    gpuScore,
    bandwidth,
    density,
    amplitude,
    chunkBudgetKB,
    cacheLines,
    prewarmSlots,
    presenceTier,
    advantageTierBase,
    advantageTier,
    advantageScore,
    bandMode,
    bandLevel,
    fallbackLevel,
    bandRisk,
    band: bandPack.band
  };

  const advantageSignature = buildDualHashSignature(
    "EARN_PAGE_ADVANTAGE_v24",
    advantageIntelPayload,
    `band=${bandPack.band}::score=${advantageScore.toFixed(6)}::tier=${advantageTier}`
  );

  return {
    advantageVersion: "M-24.0-EARN-PAGE",
    band: bandPack.band,

    gpuScore,
    bandwidth,
    binaryDensity: density,
    waveAmplitude: amplitude,
    chunkBudgetKB,
    cacheLines,
    prewarmSlots,

    presenceTier,
    advantageTierBase,
    advantageTier,
    advantageScore,

    bandMode,
    bandLevel,
    fallbackLevel,
    bandRisk,

    advantageSignatureIntel: advantageSignature.intel,
    advantageSignatureClassic: advantageSignature.classic
  };
}

// ============================================================================
// CHUNK / PREWARM PLAN — EARN PAGE (v24-IMMORTAL-INTEL++)
// ============================================================================

function buildPageChunkPrewarmPlan(page, factoringProfile, bandPack, advantageField) {
  let priorityLabel = "normal";
  if (factoringProfile.presenceTier === "presence_high") priorityLabel = "high";
  else if (factoringProfile.presenceTier === "presence_mid") priorityLabel = "medium";
  else if (factoringProfile.presenceTier === "presence_low") priorityLabel = "low";

  if (advantageField.advantageScore >= 0.55) {
    priorityLabel = "high";
  } else if (advantageField.advantageScore >= 0.25 && priorityLabel === "normal") {
    priorityLabel = "medium";
  }

  const jobCount = factoringProfile.jobCount;
  const planSurface =
    jobCount +
    (factoringProfile.meshPressureIndex || 0) * 2 +
    (safeNumber(factoringProfile.cachePriority, 0) || 0) * 3;

  let gpuBatchStyle = "none";
  if (jobCount >= 64) gpuBatchStyle = "warp_aligned";
  else if (jobCount >= 16) gpuBatchStyle = "micro_batch";

  let cacheTier = "cold";
  if (factoringProfile.cachePriority === "high" || advantageField.advantageScore >= 0.6) {
    cacheTier = "hot";
  } else if (factoringProfile.cachePriority === "normal" && advantageField.advantageScore >= 0.3) {
    cacheTier = "warm";
  }

  const planScore = clamp01(
    (jobCount / 96) * 0.4 +
    (factoringProfile.meshPressureIndex / 256) * 0.3 +
    advantageField.advantageScore * 0.3
  );

  const planTier =
    planScore >= 0.9 ? "plan_critical" :
    planScore >= 0.6 ? "plan_high" :
    planScore >= 0.3 ? "plan_normal" :
    "plan_low";

  const planIntelPayload = {
    jobCount,
    meshPressureIndex: factoringProfile.meshPressureIndex || 0,
    cachePriority: factoringProfile.cachePriority,
    band: bandPack.band,
    priorityLabel,
    gpuBatchStyle,
    cacheTier,
    planSurface,
    planScore,
    planTier,
    advantageScore: advantageField.advantageScore,
    advantageTier: advantageField.advantageTier
  };

  const planSignature = buildDualHashSignature(
    "EARN_PAGE_CHUNK_PREWARM_PLAN_v24",
    planIntelPayload,
    `band=${bandPack.band}::priority=${priorityLabel}::tier=${planTier}::score=${planScore.toFixed(6)}`
  );

  return {
    planVersion: "v24-IMMORTAL-INTEL-EARN-PAGE",
    priorityLabel,
    bandPresence: factoringProfile.presenceTier,
    band: bandPack.band,
    planSurface,
    planScore,
    planTier,
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
    },
    planSignatureIntel: planSignature.intel,
    planSignatureClassic: planSignature.classic
  };
}

// ============================================================================
// FACTORING PROFILE — 1/2 then 2/2 pattern (v24)
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

  const gpuScore  = safeNumber(deviceProfile?.gpuScore || 0);
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

  const signal        = pressure > 0.15 && jobCount > 0 ? 1 : 0;
  const prewarmNeeded = pressure > 0.25 && jobCount > 0;

  const profile = {
    version: "v24-IMMORTAL-INTEL-EARN-PAGE",
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

  const classicString =
    `CYCLE:${cycleIndex}` +
    `::JOBS:${jobCount}` +
    `::PRES:${meshPressureIndex}` +
    `::ADV:${advantageTier}` +
    `::P:${pressure.toFixed(4)}`;

  const profileSig = buildDualHashSignature(
    "EARN_PAGE_FACTORS_PROFILE_v24",
    profile,
    classicString
  );

  return {
    ...profile,
    profileSignatureIntel: profileSig.intel,
    profileSignatureClassic: profileSig.classic
  };
}

// ============================================================================
// BASE SHAPE / BASE FORMULA SURFACE — EARN PAGE (v24-IMMORTAL-INTEL++)
// ============================================================================

function buildEarnBaseShapeSurface(page, factoringProfile, bandPack, advantageField) {
  const jobs = Array.isArray(page?.jobs) ? page.jobs : [];
  const jobKinds = jobs.map(j => String(j.kind || j.type || "job")).sort();
  const jobKindHistogram = jobKinds.reduce((acc, k) => {
    acc[k] = (acc[k] || 0) + 1;
    return acc;
  }, {});

  const shapePayload = {
    version: "v24-IMMORTAL-INTEL-EARN-PAGE-BASESHAPE",
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
    advantageTierFinal: advantageField.advantageTier,
    bandMode: advantageField.bandMode,
    bandRisk: advantageField.bandRisk
  };

  const classicShapeString = [
    "EARN_BASE_SHAPE_v24",
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
    "EARN_PAGE_BASE_SHAPE_v24",
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
// IMMORTAL META TEMPLATE — v24‑IMMORTAL‑INTEL (Earn Page)
// ============================================================================

function buildEarnSignalFactoringMeta(existingMeta, cycleIndex, factoringProfile) {
  const base = existingMeta || {};
  const intelPayload = {
    kind: "earnPageSignalFactoring",
    version: "v24-IMMORTAL-INTEL",
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
    `EARN_FACTORS_v24::CYCLE:${cycleIndex}` +
    `::SIG:${factoringProfile.signal}` +
    `::DEPTH:${factoringProfile.depth}` +
    `::STRIDE:${factoringProfile.stride}` +
    `::JOBS:${factoringProfile.jobCount}`;

  const sig = buildDualHashSignature(
    "EARN_PAGE_SIGNAL_FACTORS_v24",
    intelPayload,
    classicString
  );

  return {
    ...base,
    earnSignalFactoring: {
      layer: "PulseEarnSignalFactoring",
      role: "EARN_PAGE_SIGNAL_FACTORS",
      version: "v24-IMMORTAL-INTEL",
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
// CORE API — applyEarnSignalFactoring (v24‑IMMORTAL‑INTEL++)
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

  // 6) Factoring profile (runtime, with dual signature)
  const factoringProfile = {
    version: "v24-IMMORTAL-INTEL-EARN-PAGE",
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

  const factoringProfileWithSig = (() => {
    const classicString =
      `CYCLE:${earnFactoringCycle}` +
      `::JOBS:${jobCount}` +
      `::PRES:${meshPressureIdx}` +
      `::ADV:${advantageTier}` +
      `::P:${clampedPressure.toFixed(4)}`;

    const sig = buildDualHashSignature(
      "EARN_PAGE_FACTORS_PROFILE_RUNTIME_v24",
      factoringProfile,
      classicString
    );

    return {
      ...factoringProfile,
      profileSignatureIntel: sig.intel,
      profileSignatureClassic: sig.classic
    };
  })();

  page.flags.earn_factoring_profile = {
    ...factoringProfileWithSig
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
    factoringProfileWithSig,
    bandSnapshot
  );

  const pageChunkPrewarmPlan = buildPageChunkPrewarmPlan(
    page,
    factoringProfileWithSig,
    bandPack,
    pageAdvantageField
  );

  // 8) Base shape / base formula
  const baseShapeSurface = buildEarnBaseShapeSurface(
    page,
    factoringProfileWithSig,
    bandPack,
    pageAdvantageField
  );

  // 9) IMMORTAL meta block
  page.meta = buildEarnSignalFactoringMeta(
    page.meta,
    earnFactoringCycle,
    {
      ...factoringProfileWithSig,
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
