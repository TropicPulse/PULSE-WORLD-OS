// ============================================================================
// FILE: PulseEarnSignalFactoring-v30-IMMORTAL-INTEL-OMEGA.js
// [pulse:earn] SIGNAL FACTORING LAYER — v30++ IMMORTAL‑INTEL‑OMEGA‑DUALHASH‑METABOLIC
// ----------------------------------------------------------------------------
// ROLE:
//   • Earn‑level factoring engine (1/0 + multi‑tier), INTEL‑aware, base‑shape + organism‑shape aware.
//   • Mirrors Mesh + Reflex + Send + Page factoring at full organism metabolism layer.
//   • Shapes EVERY Earn page with factoring pressure from jobs, mesh, device, cache, hints, liquidity.
//   • Emits dual INTEL + classic signatures for factoring, base‑shape, organism‑shape, and metabolic state.
//   • Exposes band/binary/wave + advantage + chunk/prewarm + baseFormulaKey + organismFormulaKey surfaces.
//   • Fully compatible with PulseSignalFactoringGuide‑v30, Mesh/Earn/Reflex/Send atlas.
// ----------------------------------------------------------------------------
// SAFETY CONTRACT (IMMORTAL v30‑INTEL‑OMEGA):
//   • No payload mutation beyond page.meta / page.flags.
//   • No routing influence (metadata only; routers MAY read but not obey).
//   • No randomness, no timestamps, no async, no network, no filesystem.
//   • Zero side‑effects outside page.meta / page.flags.
//   • Deterministic‑field: identical input → identical output.
//   • Drift‑proof across versions, multi‑instance safe, multi‑organism safe.
// ============================================================================

//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝


// ============================================================================
// HASH HELPERS — v30‑IMMORTAL‑INTEL‑OMEGA (dual‑hash)
// ============================================================================

function computeHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 1000000007;
  }
  return `h${h}`;
}

function computeHashIntelligence(payload) {
  const base = JSON.stringify(payload || "");
  let h = 0;
  for (let i = 0; i < base.length; i++) {
    const c = base.charCodeAt(i);
    h = (h * 131 + c * (i + 11)) % 4294967291;
  }
  return `HINTEL30_${h}`;
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

function normalizeCachePriorityLabel(p) {
  if (!p) return "normal";
  const v = String(p).toLowerCase();
  if (v === "critical" || v === "high" || v === "medium" || v === "low") return v;
  return "normal";
}

// ============================================================================
// BAND / BINARY / WAVE SURFACE — EARN PAGE v30++
// ============================================================================

function buildPageBandBinaryWave_v30(page, cycleIndex, deviceProfile = {}, organismContext = {}) {
  const band = normalizeBand(
    page?.meta?.band ||
      page?.band ||
      deviceProfile?.band ||
      deviceProfile?.presenceBand ||
      organismContext?.band ||
      "symbolic"
  );

  const idLen        = String(page?.id || page?.key || "NO_PAGE_ID").length;
  const jobCount     = safeNumber(Array.isArray(page?.jobs) ? page.jobs.length : 0);
  const meshPressure = safeNumber(page?.presenceField?.meshPressureIndex || organismContext?.meshPressureIndex || 0);
  const gpuScore     = safeNumber(deviceProfile?.gpuScore || 0);
  const cpuScore     = safeNumber(deviceProfile?.cpuScore || 0);
  const liquidityIdx = safeNumber(organismContext?.liquidityIndex || 0);

  const surface = idLen + jobCount + meshPressure + gpuScore + cpuScore + liquidityIdx + cycleIndex;

  const binarySurface = {
    idLen,
    jobCount,
    meshPressure,
    gpuScore,
    cpuScore,
    liquidityIdx,
    cycle: cycleIndex,
    surface
  };

  const binaryField = {
    binaryPageSignature: computeHash(`BPAGE30::${surface}`),
    binarySurfaceSignature: computeHash(`BSURF_EARN_PAGE30::${surface}`),
    binarySurface,
    parity: surface % 2 === 0 ? 0 : 1,
    density: jobCount + meshPressure + gpuScore + cpuScore + liquidityIdx,
    shiftDepth: Math.max(0, Math.floor(Math.log2(surface || 1))),
    dualSignature: buildDualHashSignature(
      "EARN_PAGE_BINARY_v30",
      binarySurface,
      `surface=${surface}::jobs=${jobCount}::liq=${liquidityIdx}`
    )
  };

  const waveSurface = {
    idLen,
    jobCount,
    meshPressure,
    gpuScore,
    cpuScore,
    liquidityIdx,
    cycle: cycleIndex
  };

  const waveField = {
    amplitude: jobCount + meshPressure + gpuScore + cpuScore + liquidityIdx,
    wavelength: cycleIndex || 1,
    phase: (idLen + jobCount + meshPressure + cycleIndex) % 32,
    band,
    mode: band === "binary" ? "compression-wave" : "symbolic-wave",
    dualSignature: buildDualHashSignature(
      "EARN_PAGE_WAVE_v30",
      waveSurface,
      `band=${band}::cycle=${cycleIndex}::liq=${liquidityIdx}`
    )
  };

  const bandSignature = buildDualHashSignature(
    "EARN_PAGE_BAND_v30",
    { band, cycleIndex, liquidityIdx },
    `${band}::${cycleIndex}::liq=${liquidityIdx}`
  );

  return { band, bandSignature, binaryField, waveField };
}

// ============================================================================
// ADVANTAGE FIELD — EARN PAGE v30++ (5‑tier, metabolic)
// ============================================================================

function buildPageAdvantageField_v30(page, deviceProfile, bandPack, factoringProfile, bandSnapshot = {}, organismContext = {}) {
  const gpuScore      = safeNumber(deviceProfile?.gpuScore || 0);
  const bandwidth     = safeNumber(deviceProfile?.bandwidthMbps || 0);
  const chunkBudgetKB = safeNumber(deviceProfile?.chunkField?.chunkBudgetKB || 0);
  const cacheLines    = safeNumber(deviceProfile?.chunkField?.cacheLines || 0);
  const prewarmSlots  = safeNumber(deviceProfile?.chunkField?.prewarmSlots || 0);
  const cpuScore      = safeNumber(deviceProfile?.cpuScore || 0);
  const thermalHead   = safeNumber(deviceProfile?.thermalHeadroom || 0);
  const deviceTier    = deviceProfile?.tier || "unknown";

  const density   = bandPack.binaryField.density;
  const amplitude = bandPack.waveField.amplitude;

  const presenceTier      = factoringProfile.presenceTier;
  const advantageTierBase = factoringProfile.advantageTier;

  const bandMode      = bandSnapshot?.mode || "normal";
  const bandLevel     = bandSnapshot?.bandLevel || null;
  const fallbackLevel = safeNumber(bandSnapshot?.fallbackLevel || factoringProfile.fallbackBandLevel || 0);

  const liquidityIdx  = safeNumber(organismContext?.liquidityIndex || 0);
  const immuneLoad    = safeNumber(organismContext?.immuneLoadIndex || 0);
  const metabolicLoad = safeNumber(organismContext?.metabolicLoadIndex || 0);

  const rawAdvantageScore =
    gpuScore * 0.0007 +
    bandwidth * 0.00025 +
    density * 0.000015 +
    amplitude * 0.000015 +
    (chunkBudgetKB + cacheLines + prewarmSlots) * 0.0000015 +
    cpuScore * 0.00025 +
    thermalHead * 0.0001 +
    liquidityIdx * 0.0003 +
    (presenceTier === "presence_high" ? 0.02 : presenceTier === "presence_mid" ? 0.01 : 0) +
    (advantageTierBase >= 2 ? 0.01 : 0) -
    immuneLoad * 0.0002 -
    metabolicLoad * 0.0002;

  const advantageScore = clamp01(rawAdvantageScore);

  const advantageTier =
    advantageScore >= 0.97 ? 4 :
    advantageScore >= 0.80 ? 3 :
    advantageScore >= 0.55 ? 2 :
    advantageScore >= 0.25 ? 1 :
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
    cpuScore,
    thermalHead,
    deviceTier,
    presenceTier,
    advantageTierBase,
    advantageTier,
    advantageScore,
    bandMode,
    bandLevel,
    fallbackLevel,
    bandRisk,
    band: bandPack.band,
    liquidityIdx,
    immuneLoad,
    metabolicLoad
  };

  const advantageSignature = buildDualHashSignature(
    "EARN_PAGE_ADVANTAGE_v30",
    advantageIntelPayload,
    [
      `band=${bandPack.band}`,
      `score=${advantageScore.toFixed(6)}`,
      `tier=${advantageTier}`,
      `liq=${liquidityIdx}`,
      `immune=${immuneLoad}`,
      `met=${metabolicLoad}`
    ].join("::")
  );

  return {
    advantageVersion: "M-30.0-EARN-PAGE-OMEGA",
    band: bandPack.band,

    gpuScore,
    bandwidth,
    binaryDensity: density,
    waveAmplitude: amplitude,
    chunkBudgetKB,
    cacheLines,
    prewarmSlots,
    cpuScore,
    thermalHead,
    deviceTier,

    presenceTier,
    advantageTierBase,
    advantageTier,
    advantageScore,

    bandMode,
    bandLevel,
    fallbackLevel,
    bandRisk,

    liquidityIndex: liquidityIdx,
    immuneLoadIndex: immuneLoad,
    metabolicLoadIndex: metabolicLoad,

    advantageSignatureIntel: advantageSignature.intel,
    advantageSignatureClassic: advantageSignature.classic
  };
}

// ============================================================================
// CHUNK / PREWARM PLAN — EARN PAGE v30++ (metabolic + lymphatic + immune + liquidity)
// ============================================================================

function buildPageChunkPrewarmPlan_v30(page, factoringProfile, bandPack, advantageField, organismContext = {}) {
  let priorityLabel = "normal";
  if (factoringProfile.presenceTier === "presence_high") priorityLabel = "high";
  else if (factoringProfile.presenceTier === "presence_mid") priorityLabel = "medium";
  else if (factoringProfile.presenceTier === "presence_low") priorityLabel = "low";

  if (advantageField.advantageScore >= 0.75) {
    priorityLabel = "ultra";
  } else if (advantageField.advantageScore >= 0.55 && priorityLabel !== "ultra") {
    priorityLabel = "high";
  } else if (advantageField.advantageScore >= 0.30 && priorityLabel === "normal") {
    priorityLabel = "medium";
  }

  const jobCount = factoringProfile.jobCount;
  const meshPressureIndex = factoringProfile.meshPressureIndex || 0;
  const cachePriorityLabel = normalizeCachePriorityLabel(factoringProfile.cachePriorityLabel || "normal");

  const liquidityIdx  = safeNumber(organismContext?.liquidityIndex || 0);
  const immuneLoad    = safeNumber(organismContext?.immuneLoadIndex || 0);
  const metabolicLoad = safeNumber(organismContext?.metabolicLoadIndex || 0);

  const planSurface =
    jobCount +
    meshPressureIndex * 2 +
    (cachePriorityLabel === "critical" ? 9 : cachePriorityLabel === "high" ? 6 : cachePriorityLabel === "medium" ? 3 : 1) * 3 +
    liquidityIdx * 2 +
    immuneLoad +
    metabolicLoad;

  let gpuBatchStyle = "none";
  if (jobCount >= 128) gpuBatchStyle = "warp_aligned";
  else if (jobCount >= 48) gpuBatchStyle = "micro_batch";
  else if (jobCount >= 16) gpuBatchStyle = "mini_batch";

  let cacheTier = "cold";
  if (cachePriorityLabel === "critical" || advantageField.advantageScore >= 0.8) {
    cacheTier = "ultra_hot";
  } else if (cachePriorityLabel === "high" || advantageField.advantageScore >= 0.6) {
    cacheTier = "hot";
  } else if (cachePriorityLabel === "medium" || advantageField.advantageScore >= 0.35) {
    cacheTier = "warm";
  }

  const planScore = clamp01(
    (jobCount / 160) * 0.35 +
    (meshPressureIndex / 256) * 0.25 +
    advantageField.advantageScore * 0.25 +
    (liquidityIdx / 100) * 0.10 -
    (immuneLoad / 100) * 0.05 -
    (metabolicLoad / 100) * 0.05
  );

  const planTier =
    planScore >= 0.95 ? "plan_critical" :
    planScore >= 0.75 ? "plan_ultra" :
    planScore >= 0.50 ? "plan_high" :
    planScore >= 0.25 ? "plan_normal" :
    "plan_low";

  const planIntelPayload = {
    jobCount,
    meshPressureIndex,
    cachePriorityLabel,
    band: bandPack.band,
    priorityLabel,
    gpuBatchStyle,
    cacheTier,
    planSurface,
    planScore,
    planTier,
    advantageScore: advantageField.advantageScore,
    advantageTier: advantageField.advantageTier,
    liquidityIdx,
    immuneLoad,
    metabolicLoad
  };

  const planSignature = buildDualHashSignature(
    "EARN_PAGE_CHUNK_PREWARM_PLAN_v30",
    planIntelPayload,
    [
      `band=${bandPack.band}`,
      `priority=${priorityLabel}`,
      `tier=${planTier}`,
      `score=${planScore.toFixed(6)}`,
      `liq=${liquidityIdx}`,
      `immune=${immuneLoad}`,
      `met=${metabolicLoad}`
    ].join("::")
  );

  return {
    planVersion: "v30-IMMORTAL-INTEL-EARN-PAGE-OMEGA",
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
      presenceAdvantageEnvelope: true,
      metabolicBlueprint: true,
      lymphaticHandshake: liquidityIdx > 0 || planTier !== "plan_low",
      immuneScan: immuneLoad > 0 || planTier === "plan_critical",
      liquidityEnvelope: liquidityIdx > 0
    },
    cache: {
      pageDiagnostics: true,
      factoringProfile: true,
      metabolicCache: planTier !== "plan_low",
      liquidityCache: liquidityIdx > 0,
      immuneCache: immuneLoad > 0
    },
    prewarm: {
      circulatorySystem: factoringProfile.prewarmNeeded || planTier !== "plan_low",
      lymphNodes: factoringProfile.prewarmNeeded || liquidityIdx > 0,
      metabolism: factoringProfile.prewarmNeeded && jobCount > 0,
      immuneSystem: immuneLoad > 0 || planTier === "plan_critical",
      liquidityChannels: liquidityIdx > 0
    },
    planSignatureIntel: planSignature.intel,
    planSignatureClassic: planSignature.classic
  };
}

// ============================================================================
// FACTORING PROFILE — v30++ (multi‑source, organism‑aware)
// ============================================================================

function buildEarnFactoringProfile_v30(page, deviceProfile, cycleIndex, organismContext = {}) {
  const jobs = Array.isArray(page?.jobs) ? page.jobs : [];
  const jobCount = jobs.length;

  const meshPressureIndex = safeNumber(
    page?.presenceField?.meshPressureIndex ||
    organismContext?.meshPressureIndex ||
    0
  );

  const cachePriorityLabel = normalizeCachePriorityLabel(
    page?.flags?.cachePriority ||
    page?.meta?.cachePriorityLabel ||
    organismContext?.cachePriorityLabel ||
    "normal"
  );

  const presenceBand =
    page?.presenceField?.presenceBand ||
    page?.meta?.band ||
    deviceProfile?.presenceBand ||
    organismContext?.band ||
    "symbolic";

  let presenceTier = "presence_low";
  const presenceScore = meshPressureIndex * 0.6 + jobCount * 0.15;
  if (presenceScore >= 18) presenceTier = "presence_ultra";
  else if (presenceScore >= 10) presenceTier = "presence_high";
  else if (presenceScore >= 4) presenceTier = "presence_mid";

  const gpuScore  = safeNumber(deviceProfile?.gpuScore || 0);
  const bandwidth = safeNumber(deviceProfile?.bandwidthMbps || 0);
  const cpuScore  = safeNumber(deviceProfile?.cpuScore || 0);

  let advantageTier = 0;
  const advantageRaw = gpuScore * 0.001 + bandwidth * 0.01 + cpuScore * 0.001;
  if (advantageRaw >= 18) advantageTier = 4;
  else if (advantageRaw >= 10) advantageTier = 3;
  else if (advantageRaw >= 4) advantageTier = 2;
  else if (advantageRaw >= 1) advantageTier = 1;

  const liquidityIdx  = safeNumber(organismContext?.liquidityIndex || 0);
  const immuneLoad    = safeNumber(organismContext?.immuneLoadIndex || 0);
  const metabolicLoad = safeNumber(organismContext?.metabolicLoadIndex || 0);

  const basePressure =
    jobCount * 0.05 +
    meshPressureIndex * 0.08 +
    (cachePriorityLabel === "critical" ? 0.12 : cachePriorityLabel === "high" ? 0.08 : cachePriorityLabel === "medium" ? 0.04 : 0.01) +
    advantageTier * 0.03 +
    liquidityIdx * 0.01 +
    immuneLoad * 0.005 +
    metabolicLoad * 0.005;

  const pressure = clamp01(basePressure);

  const depth = Math.max(
    1,
    Math.floor(1 + Math.log2(1 + cycleIndex + pressure * 16))
  );

  const phaseBoundary = 6;
  const inSecondPhase = cycleIndex >= phaseBoundary || pressure >= 0.7;
  const stride = inSecondPhase ? 2 : 1;

  const signal        = pressure > 0.12 && jobCount > 0 ? 1 : 0;
  const prewarmNeeded = pressure > 0.22 && jobCount > 0;

  const profile = {
    version: "v30-IMMORTAL-INTEL-EARN-PAGE-OMEGA",
    cycleIndex,
    jobCount,
    meshPressureIndex,
    cachePriorityLabel,
    presenceBand,
    presenceTier,
    advantageTier,
    pressure,
    depth,
    stride,
    signal,
    prewarmNeeded,
    liquidityIndex: liquidityIdx,
    immuneLoadIndex: immuneLoad,
    metabolicLoadIndex: metabolicLoad
  };

  const classicString =
    `CYCLE:${cycleIndex}` +
    `::JOBS:${jobCount}` +
    `::PRES:${meshPressureIndex}` +
    `::ADV:${advantageTier}` +
    `::P:${pressure.toFixed(4)}` +
    `::LIQ:${liquidityIdx}` +
    `::IMM:${immuneLoad}` +
    `::MET:${metabolicLoad}`;

  const profileSig = buildDualHashSignature(
    "EARN_PAGE_FACTORS_PROFILE_v30",
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
// BASE SHAPE / BASE FORMULA SURFACE — EARN PAGE v30++
// ============================================================================

function buildEarnBaseShapeSurface_v30(page, factoringProfile, bandPack, advantageField) {
  const jobs = Array.isArray(page?.jobs) ? page.jobs : [];
  const jobKinds = jobs.map(j => String(j.kind || j.type || "job")).sort();
  const jobKindHistogram = jobKinds.reduce((acc, k) => {
    acc[k] = (acc[k] || 0) + 1;
    return acc;
  }, {});

  const shapePayload = {
    version: "v30-IMMORTAL-INTEL-EARN-PAGE-BASESHAPE-OMEGA",
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
    bandRisk: advantageField.bandRisk,
    liquidityIndex: factoringProfile.liquidityIndex,
    immuneLoadIndex: factoringProfile.immuneLoadIndex,
    metabolicLoadIndex: factoringProfile.metabolicLoadIndex
  };

  const classicShapeString = [
    "EARN_BASE_SHAPE_v30",
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
    factoringProfile.liquidityIndex,
    factoringProfile.immuneLoadIndex,
    factoringProfile.metabolicLoadIndex,
    JSON.stringify(jobKindHistogram)
  ].join("::");

  const shapeSig = buildDualHashSignature(
    "EARN_PAGE_BASE_SHAPE_v30",
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
// ORGANISM SHAPE / ORGANISM FORMULA SURFACE — v30++
// ============================================================================

function buildEarnOrganismShapeSurface_v30(page, factoringProfile, bandPack, advantageField, chunkPrewarmPlan) {
  const organismPayload = {
    version: "v30-IMMORTAL-INTEL-EARN-ORGANISM-OMEGA",
    band: bandPack.band,
    presenceTier: factoringProfile.presenceTier,
    advantageTier: factoringProfile.advantageTier,
    advantageScore: advantageField.advantageScore,
    planTier: chunkPrewarmPlan.planTier,
    planScore: chunkPrewarmPlan.planScore,
    liquidityIndex: factoringProfile.liquidityIndex,
    immuneLoadIndex: factoringProfile.immuneLoadIndex,
    metabolicLoadIndex: factoringProfile.metabolicLoadIndex,
    jobCount: factoringProfile.jobCount,
    meshPressureIndex: factoringProfile.meshPressureIndex,
    cachePriorityLabel: factoringProfile.cachePriorityLabel,
    depth: factoringProfile.depth,
    stride: factoringProfile.stride,
    binaryDensity: bandPack.binaryField.density,
    waveAmplitude: bandPack.waveField.amplitude
  };

  const classicOrganismString = [
    "EARN_ORGANISM_SHAPE_v30",
    organismPayload.version,
    organismPayload.band,
    organismPayload.presenceTier,
    organismPayload.advantageTier,
    organismPayload.planTier,
    organismPayload.planScore.toFixed(6),
    organismPayload.liquidityIndex,
    organismPayload.immuneLoadIndex,
    organismPayload.metabolicLoadIndex,
    organismPayload.jobCount,
    organismPayload.meshPressureIndex,
    organismPayload.cachePriorityLabel,
    organismPayload.depth,
    organismPayload.stride,
    organismPayload.binaryDensity,
    organismPayload.waveAmplitude.toFixed(4)
  ].join("::");

  const organismSig = buildDualHashSignature(
    "EARN_PAGE_ORGANISM_SHAPE_v30",
    organismPayload,
    classicOrganismString
  );

  const organismFormulaKey = organismSig.intel;

  return {
    organismShapeVersion: organismPayload.version,
    organismShapeIntelSignature: organismSig.intel,
    organismShapeClassicSignature: organismSig.classic,
    organismFormulaKey,
    organismPayload
  };
}

// ============================================================================
// IMMORTAL META TEMPLATE — v30‑IMMORTAL‑INTEL‑OMEGA (Earn Page)
// ============================================================================

function buildEarnSignalFactoringMeta_v30(existingMeta, cycleIndex, factoringProfile, bandPack, advantageField) {
  const base = existingMeta || {};
  const intelPayload = {
    kind: "earnPageSignalFactoring",
    version: "v30-IMMORTAL-INTEL-OMEGA",
    cycleIndex,
    pressure: factoringProfile.pressure,
    signal: factoringProfile.signal,
    depth: factoringProfile.depth,
    stride: factoringProfile.stride,
    presenceTier: factoringProfile.presenceTier,
    advantageTier: factoringProfile.advantageTier,
    jobCount: factoringProfile.jobCount,
    meshPressureIndex: factoringProfile.meshPressureIndex,
    cachePriorityLabel: factoringProfile.cachePriorityLabel,
    prewarmNeeded: factoringProfile.prewarmNeeded,
    presenceBand: factoringProfile.presenceBand,
    liquidityIndex: factoringProfile.liquidityIndex,
    immuneLoadIndex: factoringProfile.immuneLoadIndex,
    metabolicLoadIndex: factoringProfile.metabolicLoadIndex,
    band: bandPack.band,
    binaryDensity: bandPack.binaryField.density,
    waveAmplitude: bandPack.waveField.amplitude,
    advantageScore: advantageField.advantageScore
  };

  const classicString =
    `EARN_FACTORS_v30::CYCLE:${cycleIndex}` +
    `::SIG:${factoringProfile.signal}` +
    `::DEPTH:${factoringProfile.depth}` +
    `::STRIDE:${factoringProfile.stride}` +
    `::JOBS:${factoringProfile.jobCount}` +
    `::LIQ:${factoringProfile.liquidityIndex}` +
    `::IMM:${factoringProfile.immuneLoadIndex}` +
    `::MET:${factoringProfile.metabolicLoadIndex}`;

  const sig = buildDualHashSignature(
    "EARN_PAGE_SIGNAL_FACTORS_v30",
    intelPayload,
    classicString
  );

  return {
    ...base,
    earnSignalFactoring: {
      layer: "PulseEarnSignalFactoring",
      role: "EARN_PAGE_SIGNAL_FACTORS",
      version: "v30-IMMORTAL-INTEL-OMEGA",
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
        liquidityAware: true,
        immuneLoadAware: true,
        metabolicLoadAware: true,

        unifiedAdvantageField: true,
        deterministicField: true,
        driftProof: true,
        multiInstanceReady: true,
        multiOrganismReady: true,

        signalFactoringAware: true,
        bandAware: true,

        zeroCompute: true,
        zeroMutation: true,
        zeroRoutingInfluence: true,

        baseShapeAware: true,
        baseFormulaKeyAware: true,
        organismShapeAware: true,
        organismFormulaKeyAware: true,
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

let earnFactoringCycle_v30 = 0;

// ============================================================================
// CORE API — applyEarnSignalFactoring_v30 (IMMORTAL‑INTEL‑OMEGA)
// ============================================================================

export function applyEarnSignalFactoring_v30(page, context = {}) {
  if (!page) return page;

  earnFactoringCycle_v30++;

  page.meta = page.meta || {};
  page.flags = page.flags || {};

  const deviceProfile   = context.deviceProfile || {};
  const presenceField   = context.presenceField   || page.presenceField   || {};
  const advantageFieldC = context.advantageField  || page.advantageField  || {};
  const hintsField      = context.hintsField      || page.hintsField      || {};
  const organismContext = context.organismContext || {};

  const jobs            = Array.isArray(page.jobs) ? page.jobs : [];
  const jobCount        = safeNumber(context.jobCountOverride ?? jobs.length, 0);

  const presenceTier    = presenceField.presenceTier || "idle";
  const meshPressureIdx = safeNumber(presenceField.meshPressureIndex, 0);
  const advantageTier   = safeNumber(advantageFieldC.advantageTier, 0);
  const fallbackBandLvl = safeNumber(hintsField.fallbackBandLevel, 0);

  const cachePriorityLabel = normalizeCachePriorityLabel(
    context.cachePriorityLabel ||
    page.flags.cachePriorityLabel ||
    page.meta.cachePriorityLabel ||
    "normal"
  );

  const prewarmNeeded   = !!(context.prewarmNeeded || page.flags.prewarmNeeded);
  const presenceBand    = context.band || page.band || "symbolic";

  const liquidityIdx  = safeNumber(organismContext.liquidityIndex || 0);
  const immuneLoad    = safeNumber(organismContext.immuneLoadIndex || 0);
  const metabolicLoad = safeNumber(organismContext.metabolicLoadIndex || 0);

  // 1) Factoring pressure (v30++ multi‑source)
  const meshPressureNorm = clamp01(meshPressureIdx / 200);
  const jobLoadNorm      = clamp01(jobCount / 160);
  const advantageNorm    = clamp01(advantageTier / 4);
  const fallbackBandNorm = clamp01(fallbackBandLvl / 4);
  const liquidityNorm    = clamp01(liquidityIdx / 100);
  const immuneNorm       = clamp01(immuneLoad / 100);
  const metabolicNorm    = clamp01(metabolicLoad / 100);

  const factoringPressure =
    meshPressureNorm   * 0.25 +
    jobLoadNorm        * 0.25 +
    advantageNorm      * 0.15 +
    fallbackBandNorm   * 0.10 +
    liquidityNorm      * 0.10 +
    immuneNorm         * 0.075 +
    metabolicNorm      * 0.075;

  const clampedPressure = clamp01(factoringPressure);
  page.flags.earn_factoring_pressure = clampedPressure;

  // 2) Signal
  const highPressure   = clampedPressure >= 0.6;
  const lowPressure    = clampedPressure <= 0.18;
  const criticalCache  = cachePriorityLabel === "critical";

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
      ? Math.min(previousDepth + 1, 12)
      : 0;

  page.flags.earn_factoringDepth = depth;

  // 4) Stride
  const stride =
    depth > 0 ? 1 / (depth + 1) : 1;

  page.flags.earn_factoringStride = stride;

  // 5) Intent
  page.flags.earn_factoring_intent =
    signal === 1
      ? "prefer_factored_page_v30"
      : "normal";

  // 6) Factoring profile (runtime, with dual signature)
  const factoringProfile = {
    version: "v30-IMMORTAL-INTEL-EARN-PAGE-OMEGA",
    cycleIndex: earnFactoringCycle_v30,
    jobCount,
    meshPressureIndex: meshPressureIdx,
    cachePriorityLabel,
    presenceBand,
    presenceTier,
    advantageTier,
    pressure: clampedPressure,
    depth,
    stride,
    signal,
    prewarmNeeded,
    fallbackBandLevel: fallbackBandLvl,
    liquidityIndex: liquidityIdx,
    immuneLoadIndex: immuneLoad,
    metabolicLoadIndex: metabolicLoad
  };

  const factoringProfileWithSig = (() => {
    const classicString =
      `CYCLE:${earnFactoringCycle_v30}` +
      `::JOBS:${jobCount}` +
      `::PRES:${meshPressureIdx}` +
      `::ADV:${advantageTier}` +
      `::P:${clampedPressure.toFixed(4)}` +
      `::LIQ:${liquidityIdx}` +
      `::IMM:${immuneLoad}` +
      `::MET:${metabolicLoad}`;

    const sig = buildDualHashSignature(
      "EARN_PAGE_FACTORS_PROFILE_RUNTIME_v30",
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
  const bandPack = buildPageBandBinaryWave_v30(
    page,
    earnFactoringCycle_v30,
    deviceProfile,
    organismContext
  );

  const bandSnapshot = {
    mode: hintsField.bandMode || "normal",
    bandLevel: hintsField.bandLevel || null,
    fallbackLevel: fallbackBandLvl
  };

  const pageAdvantageField = buildPageAdvantageField_v30(
    page,
    deviceProfile,
    bandPack,
    factoringProfileWithSig,
    bandSnapshot,
    organismContext
  );

  const pageChunkPrewarmPlan = buildPageChunkPrewarmPlan_v30(
    page,
    factoringProfileWithSig,
    bandPack,
    pageAdvantageField,
    organismContext
  );

  // 8) Base shape / base formula
  const baseShapeSurface = buildEarnBaseShapeSurface_v30(
    page,
    factoringProfileWithSig,
    bandPack,
    pageAdvantageField
  );

  // 9) Organism shape / organism formula
  const organismShapeSurface = buildEarnOrganismShapeSurface_v30(
    page,
    factoringProfileWithSig,
    bandPack,
    pageAdvantageField,
    pageChunkPrewarmPlan
  );

  // 10) IMMORTAL meta block
  page.meta = buildEarnSignalFactoringMeta_v30(
    page.meta,
    earnFactoringCycle_v30,
    {
      ...factoringProfileWithSig,
      band: bandPack.band,
      binaryDensity: bandPack.binaryField.density,
      waveAmplitude: bandPack.waveField.amplitude,
      advantageScore: pageAdvantageField.advantageScore
    },
    bandPack,
    pageAdvantageField
  );

  page.meta.earnSignalFactoring.bandBinaryWave       = bandPack;
  page.meta.earnSignalFactoring.advantageField       = pageAdvantageField;
  page.meta.earnSignalFactoring.chunkPrewarmPlan     = pageChunkPrewarmPlan;
  page.meta.earnSignalFactoring.baseShapeSurface     = baseShapeSurface;
  page.meta.earnSignalFactoring.organismShapeSurface = organismShapeSurface;

  page.meta.earnSignalFactoring.baseFormulaKey       = baseShapeSurface.baseFormulaKey;
  page.meta.earnSignalFactoring.baseShapeVersion     = baseShapeSurface.baseShapeVersion;

  page.meta.earnSignalFactoring.organismFormulaKey   = organismShapeSurface.organismFormulaKey;
  page.meta.earnSignalFactoring.organismShapeVersion = organismShapeSurface.organismShapeVersion;

  page.flags.earnSignalFactoring = true;
  page.flags.earnSignalFactoring_v30 = true;

  return page;
}

export default applyEarnSignalFactoring_v30;
