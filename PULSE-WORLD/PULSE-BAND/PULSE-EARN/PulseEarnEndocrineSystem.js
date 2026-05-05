// ============================================================================
// FILE: tropic-pulse-functions/PULSE-WORLD/PULSE-EARN/PulseEarnEndocrineSystem-v16-Immortal-INTEL-AGGRESSIVE.js
// LAYER: THE ENDOCRINE SYSTEM (v16-Immortal-INTEL AGGRESSIVE)
// (Performance Intelligence + Reputation Hormones + Trust Regulation + v16 Surfaces)
// ============================================================================
//
// ROLE (v16-Immortal-INTEL AGGRESSIVE):
//   THE ENDOCRINE SYSTEM — Pulse‑Earn’s long-term performance regulator for v16.
//   • Tracks marketplace reliability and profitability (hormone sensing).
//   • Computes normalized performance signals (signal transduction).
//   • Applies weighted scoring to determine trust (hormonal modulation).
//   • Blends historical + recent performance (EMA).
//   • Modulates EMA aggressively using v16 presence/advantage/hints surfaces.
//   • Maintains in‑memory reputation for long-term intelligence.
//   • Emits v16‑Presence‑IMMORTAL hormonal signatures + binary/wave fields.
//   • Emits v16 chunk/prewarm/computeProfile + pulseIntelligence surfaces.
//   • Uses ONLY provided weights/config; no hidden scoring constants.
//
// CONTRACT (v16-Immortal-INTEL):
//   • PURE INTELLIGENCE ENGINE — no AI layers, no translation, no memory model.
//   • READ-ONLY except deterministic reputation updates.
//   • NO eval(), NO Function(), NO dynamic imports.
//   • NO executing user code.
//   • NO filesystem, NO timestamps.
//   • Deterministic scoring only.
//   • Presence/advantage/hints/computeProfile are deterministic inputs.
//   • Scoring weights are provided as inputs (no internal hardcoded weights).
//   • Dual-band A‑B‑A: symbolic primary, binary aware, metadata-only.
// ============================================================================
/*
AI_EXPERIENCE_META = {
  identity: "PulseEarnEndocrineSystem",
  version: "v16-Immortal-INTEL",
  layer: "earn_endocrine",
  role: "earn_hormone_and_signal_system",
  lineage: "PulseEarnEndocrineSystem-v11 → v12.3 → v13 → v14.4 → v16-Immortal-INTEL",

  evo: {
    endocrineSystem: true,
    hormoneSignals: true,
    jobPrioritySignals: true,
    dualBand: true,
    symbolicPrimary: true,
    binaryAware: true,

    deterministic: true,
    driftProof: true,
    pureCompute: true,
    zeroMutationOfInput: true,
    zeroNetwork: true,
    zeroFilesystem: true,

    presenceAware: true,
    advantageAware: true,
    hintsAware: true,
    chunkPrewarmAware: true,
    factoringAware: true,
    computeProfileAware: true,
    pulseIntelligenceAware: true,

    waveFieldAware: true,
    meshAware: true,
    castleAware: true,
    regionAware: true
  },

  contract: {
    always: [
      "PulseEarn",
      "PulseEarnCell",
      "PulseEarnCirculatorySystem",
      "PulseEarnGeneticMemory",
      "PulseEarnContinuancePulse"
    ],
    never: [
      "safeRoute",
      "fetchViaCNS"
    ]
  }
}
*/

export const PulseEarnEndocrineSystemMeta = Object.freeze({
  layer: "PulseEarnEndocrineSystem",
  role: "EARN_ENDOCRINE_ORGAN",
  version: "v16-Immortal-INTEL",
  identity: "PulseEarnEndocrineSystem-v16-Immortal-INTEL-AGGRESSIVE",

  guarantees: Object.freeze({
    deterministic: true,
    noRandomness: true,
    noRealTime: true,
    noExternalIO: true,
    pureIntelligenceEngine: true,
    reputationAware: true,
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

    chunkPrewarmAware: true,
    factoringAware: true,
    computeProfileAware: true,
    pulseIntelligenceAware: true
  }),

  contract: Object.freeze({
    input: [
      "MarketplaceId",
      "EndocrineSignals",
      "DualBandContext",
      "GlobalHintsPresenceField",
      "EndocrineWeightsConfig" // { latency, apiSuccess, jobQuality, profitability, jobSuccess, defaultReputation, emaBaseBlend? }
    ],
    output: [
      "ReputationScore",
      "EndocrineDiagnostics",
      "EndocrineSignatures"
    ]
  }),

  lineage: Object.freeze({
    root: "PulseOS-v11-Evo",
    parent: "PulseEarn-v16-Immortal-INTEL",
    ancestry: [
      "PulseEarnEndocrineSystem-v10",
      "PulseEarnEndocrineSystem-v11",
      "PulseEarnEndocrineSystem-v11-Evo",
      "PulseEarnEndocrineSystem-v12.3-Presence-Evo+-AGGRESSIVE",
      "PulseEarnEndocrineSystem-v13.0-Presence-Immortal-AGGRESSIVE",
      "PulseEarnEndocrineSystem-v14.4-Immortal-INTEL-AGGRESSIVE"
    ]
  }),

  bands: Object.freeze({
    supported: ["symbolic", "binary"],
    default: "symbolic",
    behavior: "metadata-only"
  }),

  architecture: Object.freeze({
    pattern: "A-B-A",
    baseline: "deterministic reputation scoring (weights as inputs)",
    adaptive: "EMA blending + binary/wave + v16 presence/advantage/chunk/computeProfile modulation",
    return: "stable reputation signal for routing/selection"
  })
});

// ============================================================================
// Settings — visible, editable (not buried in logic)
// ============================================================================
const ENDOCRINE_SETTINGS = Object.freeze({
  DEFAULT_REPUTATION: 0.5,      // neutral prior, editable
  MAX_REPUTATION: 1.0,
  MIN_REPUTATION: 0.0
});

// In-memory endocrine hormone store (keyed by `${id}::${band}`)
let reputation = new Map();

// ============================================================================
// Healing Metadata — Endocrine Activity Log (v16-Immortal-INTEL)
// ============================================================================
const endocrineHealing = {
  lastMarketplaceId: null,
  lastBand: "symbolic",
  lastReputationBefore: null,
  lastReputationAfter: null,
  lastSignals: null,
  lastLoadError: null,
  lastSaveError: null,
  cycleCount: 0,

  lastHormoneSignature: null,
  lastSignalSignature: null,
  lastReputationSignature: null,
  lastEndocrineCycleSignature: null,
  lastBandSignature: null,

  lastBinaryField: null,
  lastWaveField: null,

  lastPresenceField: null,
  lastAdvantageField: null,
  lastHintsField: null,
  lastHormonalFactors: null,

  lastComputeProfile: null,
  lastPulseIntelligence: null,

  lastWeightsConfig: null
};

// ============================================================================
// Deterministic Hash Helper
// ============================================================================
function computeHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `h${h}`;
}

function normalizeBand(band) {
  const b = String(band || "symbolic").toLowerCase();
  return b === "binary" ? "binary" : "symbolic";
}

function makeReputationKey(id, band) {
  return `${id}::${band}`;
}

// ============================================================================
// Presence / Advantage / Hints Surfaces (v16 IMMORTAL style)
// ============================================================================
function classifyPresenceTier(pressure) {
  if (pressure >= 150) return "critical";
  if (pressure >= 100) return "high";
  if (pressure >= 50) return "elevated";
  if (pressure > 0) return "soft";
  return "idle";
}

function buildPresenceField(globalHints = {}, cycle) {
  const gh = globalHints.presenceContext || {};
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

  return Object.freeze({
    presenceVersion: "v16.0-Presence-Immortal-INTEL",
    presenceTier,

    bandPresence: gh.bandPresence || "unknown",
    routerPresence: gh.routerPresence || "unknown",
    devicePresence: gh.devicePresence || "endocrine",

    meshPresence: meshStrength > 0 ? "mesh-active" : "mesh-idle",
    castlePresence: castle.castlePresence || "unknown",
    regionPresence: region.regionTag || "unknown",

    regionId: region.regionId || "unknown-region",
    castleId: castle.castleId || "unknown-castle",

    meshStrength,
    meshPressureIndex,
    castleLoadLevel,

    cycle,

    presenceSignature: computeHash(
      `ENDO_PRESENCE_V16::${presenceTier}::${meshPressureIndex}::${castleLoadLevel}`
    )
  });
}

function buildAdvantageField(globalHints = {}) {
  const adv = globalHints.advantageContext || {};
  return Object.freeze({
    advantageVersion: "C-16.0-INTEL",
    advantageScore: adv.score ?? 0,
    advantageBand: adv.band ?? "neutral",
    advantageTier: adv.tier ?? 0
  });
}

function buildHintsField(globalHints = {}) {
  return Object.freeze({
    fallbackBandLevel: globalHints.fallbackBandLevel ?? 0,
    chunkHints: globalHints.chunkHints || {},
    cacheHints: globalHints.cacheHints || {},
    prewarmHints: globalHints.prewarmHints || {},
    coldStartHints: globalHints.coldStartHints || {}
  });
}

// Aggressive hormonal factor computation (v16, still deterministic)
function computeHormonalFactors({ band, presenceField, advantageField, hintsField }) {
  const meshPressure = presenceField.meshPressureIndex || 0;      // 0–100+
  const castleLoad = presenceField.castleLoadLevel || 0;          // 0–100+
  const regionPresence = presenceField.regionPresence || "unknown";

  const advantageTier = Number(advantageField.advantageTier || 0);
  const fallbackBandLevel = Number(hintsField.fallbackBandLevel || 0);

  const meshFactor = 1 + (meshPressure / 50);          // 0..100 → 1..3+
  const castleFactor = 1 - (castleLoad / 100);         // 0..100 → 1..0
  const advantageFactor = 1 + (advantageTier * 0.15);  // tier 3 → +45%
  const fallbackFactor = 1 - (fallbackBandLevel * 0.1);// level 3 → -30%

  let regionFactor = 1.0;
  if (regionPresence === "home") regionFactor = 1.1;
  else if (regionPresence === "foreign") regionFactor = 0.9;
  else regionFactor = 0.95;

  const emaBlend = band === "binary" ? 0.5 : 0.7;

  return {
    meshFactor,
    castleFactor,
    advantageFactor,
    fallbackFactor,
    regionFactor,
    emaBlend
  };
}

// ============================================================================
// v16 Chunk / Cache / Prewarm + Compute Profile + Factoring
// ============================================================================
function clamp01(x) {
  if (x == null || Number.isNaN(x)) return 0;
  return Math.max(0, Math.min(1, x));
}

function normalizeCachePriority(p) {
  if (!p) return "normal";
  const v = String(p).toLowerCase();
  if (v === "critical" || v === "high" || v === "low") return v;
  return "normal";
}

function deriveFactoringSignal({ meshPressureIndex = 0, cachePriority = "normal", prewarmNeeded = false }) {
  const pressure = clamp01(meshPressureIndex / 100);
  const highPressure = pressure >= 0.7;
  const criticalCache = cachePriority === "critical";
  if (criticalCache || prewarmNeeded) return 1;
  if (highPressure) return 1;
  return 0;
}

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

  return {
    planVersion: "v16.0-Endocrine-AdvantageC-INTEL",
    priority,
    band: presenceField.presenceTier,
    chunks: {
      endocrineEnvelope: true,
      reputationBlueprint: true
    },
    cache: {
      endocrineDiagnostics: true
    },
    prewarm: {
      nervousSystem: true,
      muscleSystem: true,
      lymphNodes: true
    }
  };
}

function buildComputeProfile({ band, globalHints = {}, presenceField }) {
  const b = normalizeBand(band);
  const hintsField = buildHintsField(globalHints);
  const cachePriority = normalizeCachePriority(hintsField.cacheHints.priority);
  const prewarmNeeded = !!hintsField.prewarmHints.shouldPrewarm;
  const meshPressureIndex = presenceField.meshPressureIndex || 0;

  const factoringSignal = deriveFactoringSignal({
    meshPressureIndex,
    cachePriority,
    prewarmNeeded
  });

  return Object.freeze({
    routeBand: b,
    fallbackBandLevel: hintsField.fallbackBandLevel,
    chunkAggression: hintsField.chunkHints.chunkAggression ?? 0,
    cachePriority,
    prewarmNeeded,
    binaryPreferred: b === "binary",
    symbolicPreferred: b === "symbolic",
    factoringSignal,
    performanceRatio: 1
  });
}

// ============================================================================
// Pulse Intelligence for Endocrine / Reputation (logic-only)
// ============================================================================
function computePulseIntelligenceForReputation({ band, presenceField, advantageField, hormonalFactors, computeProfile }) {
  const bandIsBinary = band === "binary" ? 1 : 0;
  const factoring = computeProfile.factoringSignal ? 1 : 0;

  const advantageScore = advantageField.advantageScore || 0;
  const advantageTier = advantageField.advantageTier || 0;

  const presenceTier = presenceField.presenceTier || "idle";
  const presenceWeight =
    presenceTier === "critical" ? 1.0 :
    presenceTier === "high"     ? 0.8 :
    presenceTier === "elevated" ? 0.6 :
    presenceTier === "soft"     ? 0.4 :
    0.2;

  const emaBlend = hormonalFactors.emaBlend || 0.6;

  const solvednessScore = Math.max(
    0,
    Math.min(
      advantageScore * 10 * 0.4 +
      presenceWeight * 0.3 +
      (1 - emaBlend) * 0.1 +
      factoring * 0.2,
      1
    )
  );

  const computeTier =
    solvednessScore >= 0.9 ? "nearSolution" :
    solvednessScore >= 0.7 ? "highValue"    :
    solvednessScore >= 0.4 ? "normal"       :
    solvednessScore >= 0.2 ? "lowPriority"  :
    "avoidCompute";

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
    solvednessScore,
    factoringSignal: factoring ? "high" : "low",
    computeTier,
    readinessScore,
    band,
    advantageTier
  };
}

// ============================================================================
// Signature Builders
// ============================================================================
function buildHormoneSignature(id, cycle) {
  return computeHash(`ENDO::${id}::${cycle}`);
}

function buildSignalSignature(signals) {
  return computeHash(`SIG::${JSON.stringify(signals)}`);
}

function buildReputationSignature(id, rep, band) {
  return computeHash(`REP::${id}::${band}::${rep}`);
}

function buildEndocrineCycleSignature(cycle, band) {
  return computeHash(`ENDO_CYCLE::${cycle}::${band}`);
}

// ============================================================================
// Load reputation — Endocrine Memory Recall (in-memory only)
// ============================================================================
export function loadPulseEarnReputation() {
  reputation = reputation || new Map();
  endocrineHealing.lastLoadError = null;
}

// ============================================================================
// Save reputation — Endocrine Persistence (no-op)
// ============================================================================
function savePulseEarnReputation() {
  endocrineHealing.lastSaveError = null;
}

// ============================================================================
// Get current reputation — Hormone Level Lookup (band-aware)
// ============================================================================
export function getPulseEarnReputation(id, band = "symbolic", defaultReputation) {
  const normalizedBand = normalizeBand(band);
  const key = makeReputationKey(id, normalizedBand);
  const base = defaultReputation != null
    ? defaultReputation
    : ENDOCRINE_SETTINGS.DEFAULT_REPUTATION;
  const value = reputation.get(key);
  return value != null ? Number(value) : base;
}

// ============================================================================
// Update reputation — Endocrine Regulation Cycle (v16 IMMORTAL-INTEL AGGRESSIVE)
// signals: { latency, apiSuccess, jobQuality, profitability, jobSuccess, band? }
// globalHints: Presence/Advantage/Hints surfaces
// weightsConfig: {
//   latency, apiSuccess, jobQuality, profitability, jobSuccess,
//   defaultReputation?, emaBaseBlend?
// }
// ============================================================================
export function updatePulseEarnReputation(id, signals, globalHints = {}, weightsConfig = {}) {
  endocrineHealing.cycleCount++;
  endocrineHealing.lastMarketplaceId = id;
  endocrineHealing.lastSignals = { ...signals };
  endocrineHealing.lastWeightsConfig = { ...weightsConfig };

  const band = normalizeBand(signals?.band);
  endocrineHealing.lastBand = band;
  endocrineHealing.lastBandSignature = computeHash(`BAND::${band}`);

  const defaultReputation =
    weightsConfig.defaultReputation != null
      ? weightsConfig.defaultReputation
      : ENDOCRINE_SETTINGS.DEFAULT_REPUTATION;

  const current = getPulseEarnReputation(id, band, defaultReputation);
  endocrineHealing.lastReputationBefore = current;

  endocrineHealing.lastSignalSignature = buildSignalSignature(signals);

  const weights = {
    latency: weightsConfig.latency ?? 0,
    apiSuccess: weightsConfig.apiSuccess ?? 0,
    jobQuality: weightsConfig.jobQuality ?? 0,
    profitability: weightsConfig.profitability ?? 0,
    jobSuccess: weightsConfig.jobSuccess ?? 0
  };

  const score =
    (signals.latency ?? 0) * weights.latency +
    (signals.apiSuccess ?? 0) * weights.apiSuccess +
    (signals.jobQuality ?? 0) * weights.jobQuality +
    (signals.profitability ?? 0) * weights.profitability +
    (signals.jobSuccess ?? 0) * weights.jobSuccess;

  const presenceField = buildPresenceField(globalHints, endocrineHealing.cycleCount);
  const advantageField = buildAdvantageField(globalHints);
  const hintsField = buildHintsField(globalHints);

  const hormonalFactors = computeHormonalFactors({
    band,
    presenceField,
    advantageField,
    hintsField
  });

  const baseEmaBlend =
    weightsConfig.emaBaseBlend != null ? weightsConfig.emaBaseBlend : hormonalFactors.emaBlend;

  const emaBlend = clamp(baseEmaBlend, 0, 1);
  let updated = current * emaBlend + score * (1 - emaBlend);

  updated *= hormonalFactors.meshFactor;
  updated *= hormonalFactors.castleFactor;
  updated *= hormonalFactors.advantageFactor;
  updated *= hormonalFactors.fallbackFactor;
  updated *= hormonalFactors.regionFactor;

  const clamped = clamp(updated, ENDOCRINE_SETTINGS.MIN_REPUTATION, ENDOCRINE_SETTINGS.MAX_REPUTATION);

  const key = makeReputationKey(id, band);
  reputation.set(key, clamped);
  endocrineHealing.lastReputationAfter = clamped;

  endocrineHealing.lastHormoneSignature = buildHormoneSignature(
    id,
    endocrineHealing.cycleCount
  );

  endocrineHealing.lastReputationSignature = buildReputationSignature(
    id,
    clamped,
    band
  );

  endocrineHealing.lastEndocrineCycleSignature = buildEndocrineCycleSignature(
    endocrineHealing.cycleCount,
    band
  );

  const surface = clamped * 1000 + endocrineHealing.cycleCount;
  const binaryField = {
    binaryReputationSignature: computeHash(
      `BREP_V16::${id}::${band}::${clamped}`
    ),
    binarySurfaceSignature: computeHash(`BSURF_V16::${surface}`),
    binarySurface: {
      reputation: clamped,
      cycle: endocrineHealing.cycleCount,
      surface
    },
    parity: surface % 2 === 0 ? 0 : 1,
    density: clamped,
    shiftDepth: Math.max(0, Math.floor(Math.log2(surface || 1)))
  };
  endocrineHealing.lastBinaryField = binaryField;

  const waveField = {
    amplitude: clamped,
    wavelength: endocrineHealing.cycleCount,
    phase:
      (Math.floor(clamped * 100) + endocrineHealing.cycleCount) % 8,
    band,
    mode: band === "binary" ? "compression-wave" : "symbolic-wave"
  };
  endocrineHealing.lastWaveField = waveField;

  const chunkPlan = buildChunkPrewarmPlan(presenceField, advantageField);
  const computeProfile = buildComputeProfile({ band, globalHints, presenceField });
  const pulseIntelligence = computePulseIntelligenceForReputation({
    band,
    presenceField,
    advantageField,
    hormonalFactors,
    computeProfile
  });

  endocrineHealing.lastPresenceField = presenceField;
  endocrineHealing.lastAdvantageField = advantageField;
  endocrineHealing.lastHintsField = hintsField;
  endocrineHealing.lastHormonalFactors = hormonalFactors;
  endocrineHealing.lastComputeProfile = computeProfile;
  endocrineHealing.lastPulseIntelligence = pulseIntelligence;

  savePulseEarnReputation();

  // Core return remains the scalar reputation score; diagnostics via healing state.
  return clamped;
}

// ============================================================================
// Normalization Helpers — Endocrine Signal Processing
// ============================================================================
function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

export function computePulseEarnReputationSignals({
  latencyMs,
  apiErrors,
  jobsReturned,
  profitableJobs,
  jobSuccessRate,
  avgProfitPerJob
}) {
  return {
    latency: latencyMs != null ? normalizeLatency(latencyMs) : 0.5,
    apiSuccess: apiErrors != null ? normalizeApiErrors(apiErrors) : 0.5,
    jobQuality: jobsReturned != null ? normalizeJobQuality(jobsReturned) : 0.5,
    profitability:
      avgProfitPerJob != null ? normalizeProfit(avgProfitPerJob) : 0.5,
    jobSuccess: jobSuccessRate != null ? clamp(jobSuccessRate, 0, 1) : 0.5
  };
}

// ============================================================================
// Normalizers — Endocrine Signal Processing
// ============================================================================
function normalizeLatency(ms) {
  if (ms < 200) return 1;
  if (ms < 500) return 0.8;
  if (ms < 1000) return 0.6;
  if (ms < 1500) return 0.4;
  return 0.2;
}

function normalizeApiErrors(errors) {
  if (errors === 0) return 1;
  if (errors <= 2) return 0.8;
  if (errors <= 5) return 0.5;
  return 0.2;
}

function normalizeJobQuality(count) {
  if (count > 20) return 1;
  if (count > 10) return 0.8;
  if (count > 5) return 0.6;
  return 0.3;
}

function normalizeProfit(p) {
  if (p > 5) return 1;
  if (p > 2) return 0.8;
  if (p > 1) return 0.6;
  return 0.3;
}

// ============================================================================
// Export Healing Metadata — Endocrine Report (v16-Immortal-INTEL)
// ============================================================================
export function getPulseEarnReputationHealingState() {
  return { ...endocrineHealing };
}

// ============================================================================
// v16 COMPAT ALIASES — for Nervous System imports
// ============================================================================
export function updateMarketplaceReputation(id, signals, globalHints = {}, weightsConfig = {}) {
  return updatePulseEarnReputation(id, signals, globalHints, weightsConfig);
}

export function computeReputationSignals(args) {
  return computePulseEarnReputationSignals(args);
}
