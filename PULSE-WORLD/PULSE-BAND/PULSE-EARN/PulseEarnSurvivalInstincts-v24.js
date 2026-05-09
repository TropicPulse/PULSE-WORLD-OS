// ============================================================================
//  PulseEarnSurvivalInstincts-v24-IMMORTAL-INTEL-MAX.js
//  EARN SURVIVAL ORGAN (v24 IMMORTAL-INTEL-MAX)
//  Deterministic Survival Scoring + Compatibility + Evolutionary Scaling
//  DualBand + DualHash-INTEL + Presence/Advantage/Chunk/Cache/Prewarm Surfaces
//  Zero async, zero network, zero filesystem, zero AI, zero user code
// ============================================================================

/*
AI_EXPERIENCE_META = {
  identity: "PulseEarnSurvivalInstincts",
  version: "v24-IMMORTAL-INTEL-MAX",
  layer: "earn_survival",
  role: "earn_survival_organ",
  lineage: "v9 → v10 → v11 → v11-Evo → v12.3-Presence-Evo+ → v13.0-Presence-Immortal-ADV → v16-IMMORTAL-INTEL → v24-IMMORTAL-INTEL-MAX",

  evo: {
    survivalOrgan: true,
    compatibilityEngine: true,
    profitabilityEngine: true,
    evolutionaryScaling: true,
    fairnessDefense: true,

    dualBand: true,
    symbolicPrimary: true,
    binaryAware: true,
    waveAware: true,

    deterministic: true,
    deterministicField: true,
    driftProof: true,
    pureCompute: true,
    zeroNetwork: true,
    zeroFilesystem: true,
    zeroMutationOfInput: true,
    zeroAsync: true,
    zeroRandomness: true,

    presenceAdvantageChunkUnified: true,
    cachePrewarmAware: true,
    hintsAware: true,

    intelSignatureAware: true,
    dualHashAware: true,
    structureAware: true,
    contextAware: true
  },

  contract: {
    always: [
      "PulseEarnSkeletalSystem",
      "PulseEarnMuscleSystem",
      "PulseEarnReceptorMkt"
    ],
    never: [
      "safeRoute",
      "fetchViaCNS"
    ]
  }
};
*/

export const PulseEarnSurvivalInstinctsMeta = Object.freeze({
  layer: "PulseEarnSurvivalInstincts",
  role: "EARN_SURVIVAL_ORGAN",
  version: "v24-IMMORTAL-INTEL-MAX",
  identity: "PulseEarnSurvivalInstincts-v24-IMMORTAL-INTEL-MAX",

  guarantees: Object.freeze({
    deterministic: true,
    driftProof: true,
    noRandomness: true,
    noRealTime: true,
    noExternalIO: true,

    // Scoring engine laws
    pureScoringEngine: true,
    deterministicCompatibility: true,
    deterministicProfitability: true,
    deterministicEvolutionaryScaling: true,
    deterministicFairnessDefense: true,

    // Safety laws
    zeroAI: true,
    zeroUserCode: true,
    zeroDynamicImports: true,
    zeroEval: true,
    zeroNetwork: true,
    zeroFilesystem: true,
    zeroCrypto: true,
    zeroOSInspection: true,
    zeroHardwareProbing: true,

    // Mutation rules
    neverMutateJobObjects: true,
    internalHealingStateAllowed: true,

    // Band + metadata
    dualBandAware: true,
    binaryAware: true,
    waveFieldAware: true,
    healingMetadataAware: true,

    // Presence / advantage / hints
    presenceAware: true,
    advantageAware: true,
    cacheAware: true,
    chunkAware: true,
    prewarmAware: true,
    advantageFieldAware: true,

    // INTEL / dualhash
    intelSignatureAware: true,
    dualHashAware: true,

    // Environment
    worldLensAware: false,
    multiInstanceReady: true
  }),

  contract: Object.freeze({
    input: [
      "MarketplaceJob",
      "DevicePhenotype",
      "DualBandContextPresenceAdvantageHints"
    ],
    output: [
      "SurvivalScore",
      "SurvivalDecision",
      "SurvivalDiagnostics",
      "SurvivalSignatures",
      "SurvivalHealingState"
    ]
  }),

  lineage: Object.freeze({
    root: "PulseOS-v24-IMMORTAL-INTEL-MAX",
    parent: "PulseEarn-v24-IMMORTAL-INTEL-MAX",
    ancestry: [
      "PulseEarnSurvivalInstincts-v9",
      "PulseEarnSurvivalInstincts-v10",
      "PulseEarnSurvivalInstincts-v11",
      "PulseEarnSurvivalInstincts-v11-Evo",
      "PulseEarnSurvivalInstincts-v12.3-Presence-Evo+",
      "PulseEarnSurvivalInstincts-v13.0-Presence-Immortal-ADV",
      "PulseEarnSurvivalInstincts-v16-IMMORTAL-INTEL"
    ]
  }),

  bands: Object.freeze({
    supported: ["symbolic", "binary"],
    default: "symbolic",
    behavior: "metadata-only",
    priority: "binary-first"
  }),

  architecture: Object.freeze({
    pattern: "A-B-A",
    baseline: "deterministic compatibility → evolutionary scaling → fairness defense",
    adaptive:
      "binary/wave surfaces + dual-band + presence/advantage‑M + chunk/cache/prewarm signatures + INTEL dualhash",
    return:
      "deterministic survival score + decision + signatures + presence/advantage surfaces"
  })
});

// ---------------------------------------------------------------------------
// Healing Metadata — Survival Instinct Activity Log (v24-IMMORTAL-INTEL-MAX)
// ---------------------------------------------------------------------------
const survivalHealing = {
  lastJobId: null,
  lastMarketplaceId: null,

  lastScore: null,
  lastRawScore: null,
  lastCompatibility: null,
  lastRuntimeSeconds: null,
  lastPayoutEstimate: null,
  lastBandwidthPenalty: null,
  lastEvolutionBoost: null,
  lastTier: null,
  lastProfitPerSecond: null,
  lastStabilityBonus: null,
  lastHealthScore: null,

  lastDecision: null,
  lastRejectionReason: null,
  lastApprovalReason: null,

  // pattern / signature surface
  lastJobPattern: null,
  lastDevicePattern: null,

  // classic + intel survival signatures
  lastSurvivalSignatureClassic: null,
  lastSurvivalSignatureIntel: null,

  // presence / advantage / hints surfaces
  presenceTier: null,
  presenceField: null,
  presenceVersion: null,
  presenceSignatureClassic: null,
  presenceSignatureIntel: null,

  advantageField: null,
  advantageVersion: null,
  advantageSignatureClassic: null,
  advantageSignatureIntel: null,

  hintsField: null,
  hintsSignatureClassic: null,
  hintsSignatureIntel: null,

  // band + binary + wave surfaces
  lastBand: "symbolic",
  lastBandSignatureClassic: null,
  lastBandSignatureIntel: null,
  lastBinaryField: null,
  lastWaveField: null,

  cycleCount: 0,

  loopTheory: {
    routingCompletion: true,
    allowLoopfieldPropulsion: true,
    pulseComputeContinuity: true,
    errorRouteAround: true
  }
};

// ---------------------------------------------------------------------------
// Deterministic Hash Helpers — v24-IMMORTAL-INTEL-MAX
// ---------------------------------------------------------------------------
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
  const classicHash = computeHash(`${label}::${classicString || ""}`);
  return {
    intel: intelHash,
    classic: classicHash
  };
}

function normalizeBand(band) {
  const b = String(band || "symbolic").toLowerCase();
  return b === "binary" ? "binary" : "symbolic";
}

function normalizePresenceBand(presenceBand) {
  const p = String(presenceBand || "symbolic").toLowerCase();
  return p === "binary" ? "binary" : "symbolic";
}

// ---------------------------------------------------------------------------
// Numeric safety helpers
// ---------------------------------------------------------------------------
function toNumber(value, fallback) {
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function clamp(value, min, max) {
  const v = toNumber(value, min);
  if (v < min) return min;
  if (v > max) return max;
  return v;
}

function nonNegative(value, fallback) {
  const v = toNumber(value, fallback);
  return v < 0 ? 0 : v;
}

// ---------------------------------------------------------------------------
// Degradation Tier — aligned with presence tiers
// ---------------------------------------------------------------------------
function classifyDegradationTier(healthScore) {
  const h = typeof healthScore === "number" ? healthScore : 1.0;

  if (h >= 0.97) return "presenceMicroDegrade";
  if (h >= 0.90) return "presenceSoftDegrade";
  if (h >= 0.60) return "presenceMidDegrade";
  if (h >= 0.25) return "presenceHardDegrade";
  return "presenceCriticalDegrade";
}

// ---------------------------------------------------------------------------
// Presence / Advantage‑M / Hints Surfaces (v24-IMMORTAL-INTEL-MAX)
// ---------------------------------------------------------------------------
function buildPresenceField(deviceProfile, dualBandContext) {
  const presenceContext = (dualBandContext && dualBandContext.presenceContext) || {};
  const regionContext = (dualBandContext && dualBandContext.regionContext) || {};

  const skeletalPresenceBand =
    (deviceProfile && deviceProfile.presenceBand) ||
    (deviceProfile && deviceProfile.band) ||
    "symbolic";

  const bandPresence =
    presenceContext.bandPresence ||
    skeletalPresenceBand;

  const devicePresence = presenceContext.devicePresence || "local";
  const routerPresence = presenceContext.routerPresence || "stable";
  const regionTag = regionContext.regionTag || "unknown-region";

  const chunkField = (deviceProfile && deviceProfile.chunkField) || {};
  const chunkBudgetKB = chunkField.chunkBudgetKB || 0;
  const cacheLines = chunkField.cacheLines || 0;
  const prewarmSlots = chunkField.prewarmSlots || 0;

  const presenceVersion = "v24-IMMORTAL-INTEL-MAX-SURVIVAL";

  const field = {
    presenceVersion,
    bandPresence,
    devicePresence,
    routerPresence,
    regionTag,
    chunkBudgetKB,
    cacheLines,
    prewarmSlots
  };

  const raw = [
    presenceVersion,
    bandPresence,
    devicePresence,
    routerPresence,
    regionTag,
    `chunk:${chunkBudgetKB}`,
    `cache:${cacheLines}`,
    `prewarm:${prewarmSlots}`
  ].join("::");

  const sig = buildDualHashSignature(
    "SURVIVAL_PRESENCE_V24",
    { field },
    raw
  );

  survivalHealing.presenceField = field;
  survivalHealing.presenceVersion = presenceVersion;
  survivalHealing.presenceSignatureClassic = sig.classic;
  survivalHealing.presenceSignatureIntel = sig.intel;

  return field;
}

function buildAdvantageField(deviceProfile, dualBandContext) {
  const advantageContext = (dualBandContext && dualBandContext.advantageContext) || {};
  const skeletalAdv = (deviceProfile && deviceProfile.advantageField) || {};

  const ctxScore = toNumber(advantageContext.score, 0);
  const ctxBand = advantageContext.band || null;
  const ctxTier = advantageContext.tier;

  const skScore = toNumber(skeletalAdv.advantageScore, 0);
  const skBand = skeletalAdv.band || null;
  const skTier = skeletalAdv.presenceTier || null;

  const score = Math.max(ctxScore, skScore);
  const band =
    ctxBand ||
    skBand ||
    (deviceProfile && deviceProfile.band) ||
    "symbolic";

  const tier =
    ctxTier != null
      ? ctxTier
      : skTier != null
      ? skTier
      : 0;

  const advantageVersion = "M-SURVIVAL-24.0";

  const field = {
    advantageVersion,
    score,
    band,
    tier,
    skeletalScore: skScore,
    skeletalBand: skBand,
    skeletalTier: skTier
  };

  const raw =
    `ADV_M::v:${advantageVersion}::score:${score}` +
    `::band:${band}::tier:${tier}` +
    `::skScore:${skScore}::skBand:${skBand}::skTier:${skTier}`;

  const sig = buildDualHashSignature(
    "SURVIVAL_ADVANTAGE_V24",
    { field },
    raw
  );

  survivalHealing.advantageField = field;
  survivalHealing.advantageVersion = advantageVersion;
  survivalHealing.advantageSignatureClassic = sig.classic;
  survivalHealing.advantageSignatureIntel = sig.intel;

  return field;
}

function buildHintsField(dualBandContext) {
  const chunkHints = (dualBandContext && dualBandContext.chunkHints) || {};
  const cacheHints = (dualBandContext && dualBandContext.cacheHints) || {};
  const prewarmHints = (dualBandContext && dualBandContext.prewarmHints) || {};
  const coldStartHints = (dualBandContext && dualBandContext.coldStartHints) || {};

  const field = {
    chunkHints,
    cacheHints,
    prewarmHints,
    coldStartHints
  };

  const raw = [
    JSON.stringify(chunkHints || {}),
    JSON.stringify(cacheHints || {}),
    JSON.stringify(prewarmHints || {}),
    JSON.stringify(coldStartHints || {})
  ].join("::");

  const sig = buildDualHashSignature(
    "SURVIVAL_HINTS_V24",
    { field },
    raw
  );

  survivalHealing.hintsField = field;
  survivalHealing.hintsSignatureClassic = sig.classic;
  survivalHealing.hintsSignatureIntel = sig.intel;

  return field;
}

function buildBandBinaryWaveSurfaces(deviceProfile, dualBandContext) {
  const bandRaw =
    (dualBandContext && dualBandContext.band) ||
    (deviceProfile && deviceProfile.band) ||
    (survivalHealing.presenceField && survivalHealing.presenceField.bandPresence) ||
    "symbolic";

  const band = normalizeBand(bandRaw);

  const bandSig = buildDualHashSignature(
    "SURVIVAL_BAND_V24",
    { band },
    `BAND::SURVIVAL::${band}`
  );

  survivalHealing.lastBand = band;
  survivalHealing.lastBandSignatureClassic = bandSig.classic;
  survivalHealing.lastBandSignatureIntel = bandSig.intel;

  const skeletalBinary = deviceProfile && deviceProfile.binaryField;
  const skeletalWave = deviceProfile && deviceProfile.waveField;

  if (skeletalBinary && skeletalWave) {
    const surfaceVal =
      skeletalBinary.binarySurface && skeletalBinary.binarySurface.surface;

    const binaryField = {
      ...skeletalBinary,
      binarySurvivalSignatureClassic: buildDualHashSignature(
        "SURVIVAL_BINARY_V24",
        { surface: surfaceVal },
        `BSURV::${surfaceVal}`
      ).classic,
      binarySurvivalSignatureIntel: buildDualHashSignature(
        "SURVIVAL_BINARY_V24",
        { surface: surfaceVal },
        `BSURV::${surfaceVal}`
      ).intel
    };

    const waveField = {
      ...skeletalWave,
      band,
      mode: band === "binary" ? "compression-wave" : "symbolic-wave"
    };

    survivalHealing.lastBinaryField = binaryField;
    survivalHealing.lastWaveField = waveField;

    return { band, bandSignature: bandSig.classic, binaryField, waveField };
  }

  const cpu = deviceProfile && deviceProfile.cpuCores ? deviceProfile.cpuCores : 0;
  const mem = deviceProfile && deviceProfile.memoryMB ? deviceProfile.memoryMB : 0;
  const gpu = deviceProfile && deviceProfile.gpuScore ? deviceProfile.gpuScore : 0;
  const cycle = survivalHealing.cycleCount || 0;

  const surface = cpu + mem + gpu + cycle;

  const binarySig = buildDualHashSignature(
    "SURVIVAL_BINARY_V24",
    { cpu, mem, gpu, cycle, surface },
    `BSURV::${surface}`
  );

  const binaryField = {
    binarySurvivalSignatureClassic: binarySig.classic,
    binarySurvivalSignatureIntel: binarySig.intel,
    binarySurfaceSignatureClassic: buildDualHashSignature(
      "SURVIVAL_BINARY_SURFACE_V24",
      { surface },
      `BSURF_SURV::${surface}`
    ).classic,
    binarySurfaceSignatureIntel: buildDualHashSignature(
      "SURVIVAL_BINARY_SURFACE_V24",
      { surface },
      `BSURF_SURV::${surface}`
    ).intel,
    binarySurface: {
      cpu,
      mem,
      gpu,
      cycle,
      surface
    },
    parity: surface % 2 === 0 ? 0 : 1,
    density: cpu + gpu,
    shiftDepth: Math.max(0, Math.floor(Math.log2(surface || 1)))
  };

  const amplitude = cpu + gpu;
  const wavelength = cycle + 1;
  const phase = (amplitude + wavelength) % 16;

  const waveField = {
    amplitude,
    wavelength,
    phase,
    band,
    mode: band === "binary" ? "compression-wave" : "symbolic-wave"
  };

  survivalHealing.lastBinaryField = binaryField;
  survivalHealing.lastWaveField = waveField;

  return { band, bandSignature: bandSig.classic, binaryField, waveField };
}

// ---------------------------------------------------------------------------
// Classic Survival Signature (kept for backward readers, dualhash-backed)
// ---------------------------------------------------------------------------
function buildSurvivalSignature({
  jobId,
  marketplaceId,
  compatibility,
  profitPerSecond,
  bandwidthPenalty,
  tier,
  healthScore,
  stabilityBonus
}) {
  const raw = [
    jobId || "NO_JOB",
    marketplaceId || "NO_MARKET",
    compatibility ? "COMPATIBLE" : "INCOMPATIBLE",
    `pps:${toNumber(profitPerSecond, 0)}`,
    `bw:${toNumber(bandwidthPenalty, 0)}`,
    `tier:${tier || "NO_TIER"}`,
    `h:${toNumber(healthScore, 1)}`,
    `stab:${toNumber(stabilityBonus, 0.5)}`
  ].join("::");

  return buildDualHashSignature(
    "EARN_SURVIVAL_CLASSIC_V24",
    {
      jobId: jobId || null,
      marketplaceId: marketplaceId || null,
      compatibility: !!compatibility,
      profitPerSecond: toNumber(profitPerSecond, 0),
      bandwidthPenalty: toNumber(bandwidthPenalty, 0),
      tier: tier || null,
      healthScore: toNumber(healthScore, 1),
      stabilityBonus: toNumber(stabilityBonus, 0.5)
    },
    raw
  );
}

// ---------------------------------------------------------------------------
// COMPATIBILITY CHECKS — Worker Safety Rules
// ---------------------------------------------------------------------------
function isJobCompatible(rawJob, deviceProfile) {
  if (!rawJob || !deviceProfile) return false;

  const cpuReq = rawJob.cpuRequired || 0;
  const memReq = rawJob.memoryRequired || 0;
  const gpuReq = rawJob.minGpuScore || 0;

  const cpuAvail = deviceProfile.cpuCores || 4;
  const memAvail = deviceProfile.memoryMB || 4096;
  const gpuAvail = deviceProfile.gpuScore || 100;

  if (cpuReq > cpuAvail) return false;
  if (memReq > memAvail) return false;
  if (gpuReq > gpuAvail * 1.5) return false;

  return true;
}

// ---------------------------------------------------------------------------
// EVOLUTIONARY CAPABILITY BOOST — Organism Advantage‑M
// ---------------------------------------------------------------------------
function computeEvolutionaryBoost(
  deviceProfile,
  presenceField,
  advantageField,
  hintsField,
  band,
  binaryField,
  waveField
) {
  const stability = deviceProfile.stabilityScore || 0.5;
  const bandwidth = deviceProfile.bandwidthMbps || 50;
  const memory = deviceProfile.memoryMB || 4096;

  const density =
    (binaryField &&
      binaryField.binarySurface &&
      binaryField.binarySurface.density) ||
    binaryField.density ||
    0;
  const amplitude = (waveField && waveField.amplitude) || 0;

  const advScore = (advantageField && advantageField.score) || 0;
  const advTier = (advantageField && advantageField.tier) || 0;

  const chunkHints = (hintsField && hintsField.chunkHints) || {};
  const cacheHints = (hintsField && hintsField.cacheHints) || {};
  const prewarmHints = (hintsField && hintsField.prewarmHints) || {};

  const chunkBoost = chunkHints.prechunk ? 0.05 : 0;
  const cacheBoost = toNumber(cacheHints.level, 0) * 0.02;
  const prewarmBoost = prewarmHints.enabled ? 0.05 : 0;

  let boost =
    1 +
    stability * 0.4 +
    Math.min(bandwidth / 200, 0.3) +
    Math.min(memory / 32000, 0.3);

  if (band === "binary") {
    boost += 0.05;
  }

  boost += Math.min(density / 20000, 0.1);
  boost += Math.min(amplitude / 5000, 0.1);

  boost += Math.min(advScore * 0.03, 0.15);
  boost += Math.min(advTier * 0.02, 0.1);

  boost += chunkBoost + cacheBoost + prewarmBoost;

  if (boost < 0.5) return 0.5;
  if (boost > 3.0) return 3.0;

  return boost;
}

// ---------------------------------------------------------------------------
// RUNTIME ESTIMATION — Workload Difficulty
// ---------------------------------------------------------------------------
function estimateRuntimeSeconds(rawJob, deviceProfile, evoBoost) {
  const base = rawJob.estimatedSeconds || 600;

  const jobGpuBaseline = rawJob.minGpuScore || 100;
  const ourGpu = (deviceProfile.gpuScore || 100) * evoBoost;

  const speedFactor = ourGpu / jobGpuBaseline;
  const sf = Math.max(speedFactor, 0.25);

  return base / sf;
}

// ---------------------------------------------------------------------------
// PAYOUT ESTIMATION — Fair Compensation
// ---------------------------------------------------------------------------
function estimatePayout(rawJob) {
  if (rawJob.payout) return rawJob.payout;
  return 0.01;
}

// ---------------------------------------------------------------------------
// BANDWIDTH PENALTY — Hidden Cost Detection
// ---------------------------------------------------------------------------
function estimateBandwidthPenalty(rawJob, deviceProfile, band) {
  const needed = rawJob.bandwidthNeededMbps || 0;
  const available = deviceProfile.bandwidthMbps || 1;

  if (needed <= 0) return 0;

  const ratio = needed / Math.max(available, 1);

  const b = (band || deviceProfile.band || "symbolic").toLowerCase();
  const bandMultiplier = b === "binary" ? 0.8 : 1.0;

  if (ratio > 1) return ratio * 0.01 * bandMultiplier;
  return ratio * 0.001 * bandMultiplier;
}

// ---------------------------------------------------------------------------
// PATTERN BUILDERS — Job / Device Pattern Surfaces
// ---------------------------------------------------------------------------
function buildJobPattern(rawJob) {
  if (!rawJob) return "JOB::NONE";

  const id = rawJob.id || "NO_ID";
  const market = rawJob.marketplaceId || "NO_MARKET";
  const cpu = rawJob.cpuRequired || 0;
  const mem = rawJob.memoryRequired || 0;
  const gpu = rawJob.minGpuScore || 0;
  const bw = rawJob.bandwidthNeededMbps || 0;

  return (
    `JOB::${id}` +
    `::${market}` +
    `::cpu:${cpu}` +
    `::mem:${mem}` +
    `::gpu:${gpu}` +
    `::bw:${bw}`
  );
}

function buildDevicePattern(deviceProfile) {
  if (!deviceProfile) return "DEVICE::NONE";

  const cpu = deviceProfile.cpuCores || 0;
  const mem = deviceProfile.memoryMB || 0;
  const gpu = deviceProfile.gpuScore || 0;
  const bw = deviceProfile.bandwidthMbps || 0;
  const stab = deviceProfile.stabilityScore || 0.5;
  const health = deviceProfile.healthScore ?? 1.0;
  const band = (deviceProfile.band || "symbolic").toLowerCase();

  return (
    `DEVICE::cpu:${cpu}` +
    `::mem:${mem}` +
    `::gpu:${gpu}` +
    `::bw:${bw}` +
    `::stab:${stab}` +
    `::h:${health}` +
    `::band:${band}`
  );
}

// ---------------------------------------------------------------------------
// MAIN EXPORT — scoreJobForDevice (v24-IMMORTAL-INTEL-MAX)
// ---------------------------------------------------------------------------
export function scoreJobForDevice(rawJob, deviceProfile, dualBandContext) {
  const job = rawJob || {};
  const device = deviceProfile || {};

  survivalHealing.cycleCount++;
  survivalHealing.lastJobId = job.id ?? null;
  survivalHealing.lastMarketplaceId = job.marketplaceId ?? null;
  survivalHealing.lastDecision = null;
  survivalHealing.lastRejectionReason = null;
  survivalHealing.lastApprovalReason = null;

  // 0. Presence / Advantage‑M / Hints + Band/Binary/Wave surfaces
  const presenceField = buildPresenceField(device, dualBandContext || {});
  const advantageField = buildAdvantageField(device, dualBandContext || {});
  const hintsField = buildHintsField(dualBandContext || {});
  const { band, bandSignature, binaryField, waveField } = buildBandBinaryWaveSurfaces(
    device,
    dualBandContext || {}
  );

  const healthScore = toNumber(device.healthScore, 1.0);
  const baseTier = classifyDegradationTier(healthScore);
  const advTier = advantageField.tier || 0;
  const presenceTier = `${baseTier}::advTier:${advTier}`;

  survivalHealing.presenceTier = presenceTier;
  survivalHealing.lastTier = baseTier;
  survivalHealing.lastHealthScore = healthScore;

  // 1. Worker Safety Check — Survival Protection
  const compatible = isJobCompatible(job, device);
  survivalHealing.lastCompatibility = compatible;

  const stabilityBonus = clamp(device.stabilityScore, 0, 1.5) || 0.5;
  survivalHealing.lastStabilityBonus = stabilityBonus;

  if (!compatible) {
    const profitPerSecond = 0;
    const bandwidthPenalty = 0;

    survivalHealing.lastScore = -Infinity;
    survivalHealing.lastRawScore = -Infinity;
    survivalHealing.lastRuntimeSeconds = null;
    survivalHealing.lastPayoutEstimate = null;
    survivalHealing.lastBandwidthPenalty = null;
    survivalHealing.lastEvolutionBoost = null;
    survivalHealing.lastProfitPerSecond = null;

    const jobPattern = buildJobPattern(job);
    const devicePattern = buildDevicePattern(device);
    survivalHealing.lastJobPattern = jobPattern;
    survivalHealing.lastDevicePattern = devicePattern;

    const classicSurvivalSignature = buildSurvivalSignature({
      jobId: survivalHealing.lastJobId,
      marketplaceId: survivalHealing.lastMarketplaceId,
      compatibility: false,
      profitPerSecond,
      bandwidthPenalty,
      tier: baseTier,
      healthScore,
      stabilityBonus
    });

    survivalHealing.lastSurvivalSignatureClassic = classicSurvivalSignature.classic;
    survivalHealing.lastSurvivalSignatureIntel = classicSurvivalSignature.intel;

    const decision = "rejected_incompatible";
    survivalHealing.lastDecision = decision;
    survivalHealing.lastRejectionReason = "incompatible_with_device";

    survivalHealing.lastBand = band;
    survivalHealing.lastBinaryField = binaryField;
    survivalHealing.lastWaveField = waveField;

    const survivalIntelPayload = {
      kind: "earnSurvivalScore",
      version: "v24-IMMORTAL-INTEL-MAX",
      cycleIndex: survivalHealing.cycleCount,
      jobId: survivalHealing.lastJobId,
      marketplaceId: survivalHealing.lastMarketplaceId,
      rawScore: -Infinity,
      finalScore: -Infinity,
      decision,
      compatibility: false,
      profitPerSecond,
      bandwidthPenalty,
      healthScore,
      stabilityBonus,
      presenceTier,
      advantageTier: advTier,
      band,
      bandSignature,
      binaryDensity: binaryField.density,
      waveAmplitude: waveField.amplitude
    };

    const survivalClassicString =
      `SURV::${survivalHealing.lastJobId || "NO_JOB"}` +
      `::MKT:${survivalHealing.lastMarketplaceId || "NO_MARKET"}` +
      `::RAW:-INF::FINAL:-INF::DEC:${decision}`;

    const dualSig = buildDualHashSignature(
      "EARN_SURVIVAL_SCORE_V24",
      survivalIntelPayload,
      survivalClassicString
    );

    survivalHealing.lastSurvivalSignatureClassic = dualSig.classic;
    survivalHealing.lastSurvivalSignatureIntel = dualSig.intel;

    const diagnostics = {
      jobId: survivalHealing.lastJobId,
      marketplaceId: survivalHealing.lastMarketplaceId,
      cycleIndex: survivalHealing.cycleCount,
      compatibility: false,
      decision,
      profitPerSecond,
      estimatedRuntimeSeconds: null,
      estimatedPayout: null,
      bandwidthPenalty: null,
      evoBoost: null,
      stabilityBonus,
      healthScore,
      presenceTier,
      advantageTier: advTier,
      band,
      bandSignature,
      binaryField,
      waveField,
      presenceField,
      advantageField,
      hintsField,
      survivalSignatureIntel: dualSig.intel,
      survivalSignatureClassic: dualSig.classic
    };

    return {
      score: -Infinity,
      decision,
      diagnostics,
      signatures: {
        survivalIntel: dualSig.intel,
        survivalClassic: dualSig.classic
      }
    };
  }

  // 2. Evolutionary capability boost
  const evoBoost = computeEvolutionaryBoost(
    device,
    presenceField,
    advantageField,
    hintsField,
    band,
    binaryField,
    waveField
  );
  survivalHealing.lastEvolutionBoost = evoBoost;

  // 3. Runtime estimation
  const estimatedRuntimeSeconds = nonNegative(
    estimateRuntimeSeconds(job, device, evoBoost),
    1
  ) || 1;
  survivalHealing.lastRuntimeSeconds = estimatedRuntimeSeconds;

  // 4. Compensation Check — Fair Pay
  const estimatedPayout = nonNegative(estimatePayout(job), 0);
  survivalHealing.lastPayoutEstimate = estimatedPayout;

  // 5. Hidden Cost Detection — Bandwidth Penalties
  const bandwidthPenalty = nonNegative(
    estimateBandwidthPenalty(job, device, band),
    0
  );
  survivalHealing.lastBandwidthPenalty = bandwidthPenalty;

  // 6. Final Survival Score — Profitability + Evolution + Presence Advantage
  const profitPerSecond =
    estimatedPayout / Math.max(estimatedRuntimeSeconds, 1);
  survivalHealing.lastProfitPerSecond = profitPerSecond;

  const rawScore =
    profitPerSecond * stabilityBonus * evoBoost - bandwidthPenalty;
  survivalHealing.lastRawScore = rawScore;

  const finalScore = Number.isFinite(rawScore) ? rawScore : -Infinity;
  survivalHealing.lastScore = finalScore;

  const jobPattern = buildJobPattern(job);
  const devicePattern = buildDevicePattern(device);
  survivalHealing.lastJobPattern = jobPattern;
  survivalHealing.lastDevicePattern = devicePattern;

  const classicSurvivalSignature = buildSurvivalSignature({
    jobId: survivalHealing.lastJobId,
    marketplaceId: survivalHealing.lastMarketplaceId,
    compatibility: true,
    profitPerSecond,
    bandwidthPenalty,
    tier: baseTier,
    healthScore,
    stabilityBonus
  });

  survivalHealing.lastSurvivalSignatureClassic = classicSurvivalSignature.classic;
  survivalHealing.lastSurvivalSignatureIntel = classicSurvivalSignature.intel;

  const decision =
    finalScore > 0 ? "approved" : "rejected_unprofitable";
  survivalHealing.lastDecision = decision;
  survivalHealing.lastApprovalReason =
    finalScore > 0 ? "profitable_and_compatible" : null;

  if (finalScore <= 0 && !survivalHealing.lastRejectionReason) {
    survivalHealing.lastRejectionReason = "non_profitable_or_neutral";
  }

  survivalHealing.lastBand = band;
  survivalHealing.lastBinaryField = binaryField;
  survivalHealing.lastWaveField = waveField;

  const survivalIntelPayload = {
    kind: "earnSurvivalScore",
    version: "v24-IMMORTAL-INTEL-MAX",
    cycleIndex: survivalHealing.cycleCount,
    jobId: survivalHealing.lastJobId,
    marketplaceId: survivalHealing.lastMarketplaceId,
    rawScore,
    finalScore,
    decision,
    compatibility: true,
    profitPerSecond,
    bandwidthPenalty,
    healthScore,
    stabilityBonus,
    presenceTier,
    advantageTier: advTier,
    band,
    bandSignature,
    binaryDensity: binaryField.density,
    waveAmplitude: waveField.amplitude
  };

  const survivalClassicString =
    `SURV::${survivalHealing.lastJobId || "NO_JOB"}` +
    `::MKT:${survivalHealing.lastMarketplaceId || "NO_MARKET"}` +
    `::RAW:${rawScore}` +
    `::FINAL:${finalScore}` +
    `::DEC:${decision}`;

  const dualSig = buildDualHashSignature(
    "EARN_SURVIVAL_SCORE_V24",
    survivalIntelPayload,
    survivalClassicString
  );

  survivalHealing.lastSurvivalSignatureClassic = dualSig.classic;
  survivalHealing.lastSurvivalSignatureIntel = dualSig.intel;

  const diagnostics = {
    jobId: survivalHealing.lastJobId,
    marketplaceId: survivalHealing.lastMarketplaceId,
    cycleIndex: survivalHealing.cycleCount,
    compatibility: true,
    decision,
    profitPerSecond,
    estimatedRuntimeSeconds,
    estimatedPayout,
    bandwidthPenalty,
    evoBoost,
    stabilityBonus,
    healthScore,
    presenceTier,
    advantageTier: advTier,
    band,
    bandSignature,
    binaryField,
    waveField,
    presenceField,
    advantageField,
    hintsField,
    survivalSignatureIntel: dualSig.intel,
    survivalSignatureClassic: dualSig.classic
  };

  return {
    score: finalScore,
    decision,
    diagnostics,
    signatures: {
      survivalIntel: dualSig.intel,
      survivalClassic: dualSig.classic
    }
  };
}

// ---------------------------------------------------------------------------
// Export Healing Metadata — Survival Health Report (v24-IMMORTAL-INTEL-MAX)
// ---------------------------------------------------------------------------
export function getPulseEarnSurvivalHealingState() {
  return { ...survivalHealing };
}
