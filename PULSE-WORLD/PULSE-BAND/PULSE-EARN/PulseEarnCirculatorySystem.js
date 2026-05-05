// ============================================================================
// FILE: tropic-pulse-functions/PULSE-WORLD/PULSE-EARN/PulseEarnCirculatorySystem-v16-Immortal-INTEL.js
// LAYER: THE CIRCULATORY SYSTEM (v16-Immortal-INTEL)
// (Deterministic Reflex + Routing + Weighting + Presence + Advantage + INTEL +
//  Multi-Instance + GPU/Capability-Aware + Prewarm/Chunk/Cache surfaces)
// ============================================================================
//
// ROLE (v16-Immortal-INTEL):
//   THE CIRCULATORY SYSTEM — Pulse‑Earn’s autonomic routing + INTEL backbone.
//   • Deterministically evaluates marketplaces (no real ping).
//   • Filters unhealthy ones using deterministic healthScore.
//   • Fetches jobs deterministically (no async, no network).
//   • Applies reputation weighting (synaptic strength).
//   • Applies presence/mesh/castle/expansion/globalHints advantage.
//   • Applies multi-instance + factoring-aware routing.
//   • CapabilityModel + GPU-aware + performanceRatio-aware.
//   • Emits v16‑IMMORTAL‑INTEL routing signatures + loop/wave fields.
//   • Emits routing presence/advantage/computeProfile + INTEL surfaces.
//   • Supports dual-band routing (symbolic + binary) as metadata-only.
//   • Uses ONLY provided capabilityModel; no internal device constants.
//
// PURPOSE (v16-Immortal-INTEL):
//   • Provide deterministic, drift‑proof job routing as Earn backbone.
//   • Guarantee safe multi‑marketplace discovery.
//   • Maintain healing metadata for the Immune System.
//   • Preserve autonomic routing + synaptic weighting.
//   • Expose routing loop/wave fields + presence/advantage/compute surfaces.
//   • Expose Pulse‑INTEL surfaces for routing decisions.
//   • Remain pure: no hardcoded device profile, no internal baseline.
//
// CONTRACT (v16-Immortal-INTEL):
//   • PURE ROUTER — no AI layers, no translation, no memory model.
//   • READ‑ONLY except for healing metadata.
//   • NO eval(), NO Function(), NO dynamic imports.
//   • NO executing user code.
//   • NO timestamps, NO randomness, NO async.
//   • Deterministic job selection only.
//   • Dual-band is metadata-only (no non-deterministic branching).
//   • Presence/advantage/globalHints/capabilityModel are metadata-only.
// ============================================================================

/*
AI_EXPERIENCE_META = {
  identity: "PulseEarnCirculatorySystem",
  version: "v16-Immortal-INTEL",
  layer: "earn_circulatory",
  role: "earn_circulation_and_flow_backbone",
  lineage: "PulseEarnCirculatorySystem-v11 → v12.3 → v13-Presence-Immortal → v16-Immortal-INTEL",

  evo: {
    earnCirculation: true,
    jobFlow: true,
    nutrientFlow: true,
    dualBand: true,
    symbolicPrimary: true,
    binaryAware: true,

    deterministic: true,
    driftProof: true,
    pureCompute: true,
    zeroMutationOfInput: true,
    zeroNetwork: true,
    zeroFilesystem: true,

    // INTEL + capability + GPU
    capabilityModelAware: true,
    performanceRatioAware: true,
    gpuAwareReady: true,
    minerAwareReady: true,
    offlineAwareReady: true,
    futureEvolutionReady: true,

    // Advantage + tier + diagnostics
    unifiedAdvantageField: true,
    advantageFieldAware: true,
    tierAware: true,
    diagnosticsReady: true,
    evolutionSurfaceReady: true,

    // Pulse Intelligence
    pulseIntelligenceReady: true,
    solvednessAware: true,
    factoringAware: true,
    computeTierAware: true,
    readinessAware: true,

    // Wave / cohort / band
    bandAware: true,
    dualBandReady: true,
    binaryCompressionReady: true,
    waveFieldAware: true,
    cohortAware: true,

    // Presence‑IMMORTAL surfaces
    presenceAware: true,
    meshAware: true,
    castleAware: true,
    expansionAware: true,
    serverAware: true,
    routerAware: true,
    beaconAware: true,

    // Chunking / caching / prewarm / hot state
    chunkAware: true,
    cacheAware: true,
    prewarmAware: true,
    hotStateAware: true,

    // Continuance + legacy bridge
    continuanceAware: true,
    legacyBridgeCapable: true
  },

  contract: {
    always: [
      "PulseEarn",
      "PulseEarnCell",
      "PulseEarnEndocrineSystem"
    ],
    never: [
      "safeRoute",
      "fetchViaCNS"
    ]
  }
}
*/

export const PulseEarnCirculatorySystemMeta = Object.freeze({
  layer: "PulseEarnCirculatorySystem",
  role: "CIRCULATORY_ORGAN",
  version: "v16-Immortal-INTEL",
  identity: "PulseEarnCirculatorySystem-v16-Immortal-INTEL",

  guarantees: Object.freeze({
    deterministic: true,
    noRandomness: true,
    noRealTime: true,
    noExternalIO: true,
    pureRouter: true,
    dualBandAware: true,
    binaryAware: true,
    evolutionAware: true,
    healingMetadataAware: true,
    loopFieldAware: true,
    waveFieldAware: true,

    presenceAware: true,
    advantageAware: true,
    fallbackBandAware: true,
    chunkAware: true,
    cacheAware: true,
    prewarmAware: true,
    coldStartAware: true,
    expansionAware: true,
    meshAware: true,
    castleAware: true,
    regionAware: true,
    dualbandSafe: true,

    capabilityModelAware: true,
    performanceRatioAware: true,
    gpuAwareReady: true,

    pulseIntelligenceAware: true
  }),

  contract: Object.freeze({
    input: [
      "MarketplaceList",
      "MarketplaceHealth",
      "DualBandContext",
      "ReputationWeights",
      "RoutingCycleState",
      "GlobalHintsPresenceField",
      "CapabilityModel" // { cpuCores, memoryMB, gpuScore, performanceRatio, minerScore, offlineScore } provided by caller
    ],
    output: [
      "BestJobSelection",
      "RoutingDiagnostics",
      "RoutingSignatures",
      "RoutingPresenceField",
      "RoutingAdvantageField",
      "RoutingComputeProfile",
      "RoutingPulseIntelligence"
    ]
  }),

  lineage: Object.freeze({
    root: "PulseOS-v11-Evo",
    parent: "PulseEarn-v16-Immortal-INTEL",
    ancestry: [
      "PulseEarnCirculatorySystem-v10",
      "PulseEarnCirculatorySystem-v11",
      "PulseEarnCirculatorySystem-v11-Evo",
      "PulseEarnCirculatorySystem-v12.3-Presence-Evo+",
      "PulseEarnCirculatorySystem-v13.0-Presence-Immortal"
    ]
  }),

  bands: Object.freeze({
    supported: ["symbolic", "binary"],
    default: "symbolic",
    behavior: "metadata-only"
  }),

  architecture: Object.freeze({
    pattern: "A-B-A",
    baseline: "deterministic routing + health evaluation (pure, capabilityModel-driven)",
    adaptive: "presence/advantage-aware weighting + multi-instance factoring + capabilityModel + GPU scaling + INTEL surfaces",
    return: "deterministic best-job selection + routing INTEL surfaces"
  })
});

// ============================================================================
// Dual-Band Constants — Symbolic + Binary (metadata-only)
// ============================================================================
const CIRC_BANDS = {
  SYMBOLIC: "symbolic",
  BINARY: "binary"
};

function normalizeBand(band) {
  const b = String(band || CIRC_BANDS.SYMBOLIC).toLowerCase();
  return b === CIRC_BANDS.BINARY ? CIRC_BANDS.BINARY : CIRC_BANDS.SYMBOLIC;
}

// ============================================================================
// Healing Metadata — Circulatory Reflex Log (v16-Immortal-INTEL)
// ============================================================================
const circulatoryHealing = {
  lastHealthError: null,
  lastFetchError: null,
  lastSelectionError: null,

  lastHealthyMarketplaces: [],
  lastJobsFetched: 0,
  lastBestJobId: null,

  cycleCount: 0,

  lastHealthSignature: null,
  lastJobListSignature: null,
  lastSelectionSignature: null,
  lastRoutingCycleSignature: null,

  lastBand: CIRC_BANDS.SYMBOLIC,
  lastLoopField: null,
  lastWaveField: null,
  lastAdvantageField: null,

  lastPresenceField: null,
  lastAdvantagePresenceField: null,
  lastHintsField: null,
  lastComputeProfile: null,

  // capability + performance surfaces
  lastCapabilityModel: null,
  lastPerformanceRatio: 1,

  // INTEL surfaces
  lastPulseIntelligence: null,
  lastPulseIntelligenceSignature: null
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

// ============================================================================
// Signature Builders
// ============================================================================
function buildHealthSignature(list) {
  return computeHash(`HEALTH::${list.join(",")}`);
}

function buildJobListSignature(count) {
  return computeHash(`JOBS::${count}`);
}

function buildSelectionSignature(jobId) {
  return computeHash(`SELECT::${jobId || "NONE"}`);
}

function buildRoutingCycleSignature(cycle, band) {
  return computeHash(`ROUTE_CYCLE::${cycle}::${normalizeBand(band)}`);
}

// ============================================================================
// Loop / Wave / Advantage Fields (Routing-Level)
// ============================================================================
function buildLoopField(jobs, band) {
  const count = Array.isArray(jobs) ? jobs.length : 0;
  const b = normalizeBand(band);

  return {
    loopDepth: count,
    closedLoop: count > 0,
    loopStrength: count * (b === CIRC_BANDS.BINARY ? 2 : 1),
    band: b
  };
}

function buildWaveField(jobs, band) {
  const count = Array.isArray(jobs) ? jobs.length : 0;
  const b = normalizeBand(band);

  return {
    wavelength: count || 1,
    amplitude: (count * 3) % 11,
    phase: (count * 5) % 16,
    band: b,
    mode: b === CIRC_BANDS.BINARY ? "compression-wave" : "symbolic-wave"
  };
}

function buildAdvantageFieldForRouting(jobs, band) {
  const count = Array.isArray(jobs) ? jobs.length : 0;
  const b = normalizeBand(band);

  return {
    advantageVersion: "R-16.0",
    jobCount: count,
    band: b,
    symbolicPlanningBias: b === CIRC_BANDS.SYMBOLIC ? 1 : 0,
    binaryCompressionBias: b === CIRC_BANDS.BINARY ? 1 : 0
  };
}

// ============================================================================
// Presence / Advantage / Hints / Compute Profile (v16 IMMORTAL-INTEL)
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

function buildPresenceField(context = {}) {
  const gh = context.globalHints || {};
  const pf = context.presenceField || {};
  const mesh = context.meshSignals || {};
  const castle = context.castleSignals || {};
  const region = gh.regionContext || {};

  const meshStrength = Number(mesh.meshStrength || 0);
  const meshPressureIndex = Number(mesh.meshPressureIndex || 0);
  const castleLoadLevel = Number(castle.loadLevel || 0);

  const pressure = meshPressureIndex + castleLoadLevel;
  let presenceTier = "idle";
  if (pressure >= 150) presenceTier = "critical";
  else if (pressure >= 100) presenceTier = "high";
  else if (pressure >= 50) presenceTier = "elevated";
  else if (pressure > 0) presenceTier = "soft";

  return Object.freeze({
    presenceVersion: "v16-Immortal-INTEL",
    presenceTier,

    bandPresence: pf.bandPresence || gh.presenceContext?.bandPresence || "unknown",
    routerPresence: pf.routerPresence || gh.presenceContext?.routerPresence || "unknown",
    devicePresence: pf.devicePresence || gh.presenceContext?.devicePresence || "unknown",

    meshPresence: pf.meshPresence || (meshStrength > 0 ? "mesh-active" : "mesh-idle"),
    castlePresence: pf.castlePresence || castle.castlePresence || "unknown",
    regionPresence: pf.regionPresence || region.regionTag || "unknown",

    regionId: region.regionId || "unknown-region",
    castleId: castle.castleId || "unknown-castle",

    meshStrength,
    meshPressureIndex,
    castleLoadLevel,

    presenceSignature: computeHash(
      `PRESENCE_V16::${presenceTier}::${meshPressureIndex}::${castleLoadLevel}`
    )
  });
}

function buildAdvantagePresenceField(context = {}) {
  const gh = context.globalHints || {};
  const adv = gh.advantageContext || {};

  return Object.freeze({
    advantageVersion: "C-16.0",
    advantageScore: adv.score ?? 0,
    advantageBand: adv.band ?? "neutral",
    advantageTier: adv.tier ?? 0
  });
}

function buildHintsField(context = {}) {
  const gh = context.globalHints || {};
  return Object.freeze({
    fallbackBandLevel: gh.fallbackBandLevel ?? 0,
    chunkHints: gh.chunkHints || {},
    cacheHints: gh.cacheHints || {},
    prewarmHints: gh.prewarmHints || {},
    coldStartHints: gh.coldStartHints || {}
  });
}

function deriveFactoringSignal({ meshPressureIndex = 0, cachePriority = "normal", prewarmNeeded = false }) {
  const pressure = clamp01(meshPressureIndex / 100);
  const highPressure = pressure >= 0.7;
  const criticalCache = cachePriority === "critical";
  if (criticalCache || prewarmNeeded) return 1;
  if (highPressure) return 1;
  return 0;
}

function buildComputeProfile({ band, context = {}, capabilityModel = {} }) {
  const b = normalizeBand(band);
  const hintsField = buildHintsField(context);
  const cachePriority = normalizeCachePriority(hintsField.cacheHints.priority);
  const prewarmNeeded = !!hintsField.prewarmHints.shouldPrewarm;
  const meshPressureIndex = (context.meshSignals && context.meshSignals.meshPressureIndex) || 0;

  const factoringSignal = deriveFactoringSignal({
    meshPressureIndex,
    cachePriority,
    prewarmNeeded
  });

  const serverHints = context.serverAdvantageHints || {};
  const performanceRatio = capabilityModel.performanceRatio ?? 1;
  const gpuScore = capabilityModel.gpuScore ?? 0;
  const minerScore = capabilityModel.minerScore ?? 0;
  const offlineScore = capabilityModel.offlineScore ?? 0;

  const gpuPreferred = gpuScore > 0;
  const minerPreferred = minerScore > 0;
  const offlinePreferred = offlineScore > 0;

  return Object.freeze({
    routeBand: b,
    fallbackBandLevel: hintsField.fallbackBandLevel,
    chunkAggression: hintsField.chunkHints.chunkAggression ?? 0,
    cachePriority,
    prewarmNeeded,
    binaryPreferred: b === CIRC_BANDS.BINARY,
    symbolicPreferred: b === CIRC_BANDS.SYMBOLIC,
    factoringSignal,
    performanceRatio,

    gpuPreferred,
    minerPreferred,
    offlinePreferred,

    hotStateReuse: serverHints.hotStateReuse ?? true,
    multiInstanceBatching: serverHints.multiInstanceBatching ?? true,
    serverPlanCache: serverHints.planCache ?? true,
    serverBinaryReuse: serverHints.binaryReuse ?? true
  });
}

// ============================================================================
// ⭐ Pulse Intelligence (logic-only, IMMORTAL-safe, routing-level)
// ============================================================================
function computePulseIntelligence({ advantageField, presenceField, computeProfile, band }) {
  const advantageScore = advantageField.advantageScore || 0;
  const advantageTier = advantageField.advantageTier || 0;

  const presenceTier = presenceField.presenceTier || "idle";
  const presenceWeight =
    presenceTier === "critical" ? 1.0 :
    presenceTier === "high"     ? 0.8 :
    presenceTier === "elevated" ? 0.6 :
    presenceTier === "soft"     ? 0.4 :
    0.2;

  const factoring = computeProfile.factoringSignal ? 1 : 0;
  const bandIsBinary = band === "binary" ? 1 : 0;
  const performanceRatio = computeProfile.performanceRatio || 1;

  const solvednessScore = Math.max(
    0,
    Math.min(
      advantageScore * 10 * 0.4 +
      presenceWeight * 0.25 +
      factoring * 0.2 +
      performanceRatio * 0.15,
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
      (bandIsBinary ? 0.15 : 0) +
      (advantageTier >= 2 ? 0.25 : advantageTier === 1 ? 0.1 : 0),
      1
    )
  );

  return {
    solvednessScore,
    factoringSignal: computeProfile.factoringSignal ? "high" : "low",
    computeTier,
    readinessScore,
    band,
    advantageTier,
    performanceRatio
  };
}

// ============================================================================
// Deterministic Marketplace Health Evaluation
// ============================================================================
function evaluateMarketplaceHealth(marketplace) {
  const h = typeof marketplace.healthScore === "number"
    ? marketplace.healthScore
    : 1.0;

  if (h >= 0.95) return "healthy";
  if (h >= 0.85) return "soft";
  if (h >= 0.50) return "mid";
  if (h >= 0.15) return "hard";
  return "critical";
}

// ============================================================================
// 1. discoverHealthyMarketplaces — Deterministic Sensory Reflex
// ============================================================================
export function discoverHealthyMarketplaces(marketplaces) {
  circulatoryHealing.cycleCount++;

  try {
    const healthy = [];

    for (const m of marketplaces) {
      const tier = evaluateMarketplaceHealth(m);
      if (tier === "healthy" || tier === "soft") {
        healthy.push(m);
      }
    }

    const ids = healthy.map(m => m.id);
    circulatoryHealing.lastHealthyMarketplaces = ids;
    circulatoryHealing.lastHealthSignature = buildHealthSignature(ids);

    return healthy;

  } catch (err) {
    circulatoryHealing.lastHealthError = String(err && err.message ? err.message : err);
    return [];
  }
}

// ============================================================================
// 2. fetchJobsFromMarketplaces — Deterministic Intake
// ============================================================================
export function fetchJobsFromMarketplaces(marketplaces) {
  try {
    const allJobs = [];

    for (const m of marketplaces) {
      const jobs = Array.isArray(m.jobs) ? m.jobs : [];

      for (const j of jobs) {
        allJobs.push({
          ...j,
          marketplaceId: m.id
        });
      }
    }

    circulatoryHealing.lastJobsFetched = allJobs.length;
    circulatoryHealing.lastJobListSignature = buildJobListSignature(allJobs.length);

    return allJobs;

  } catch (err) {
    circulatoryHealing.lastFetchError = String(err && err.message ? err.message : err);
    return [];
  }
}

// ============================================================================
// INTERNAL: Deterministic Job Capability Scoring (capabilityModel-driven)
// ============================================================================
function scoreJobForCapability(job, capabilityModel = {}) {
  const cpuRequired = job.cpuRequired ?? 0;
  const memRequired = job.memoryRequired ?? 0;
  const gpuRequired = job.gpuRequired ?? 0;

  const cpuCores = capabilityModel.cpuCores ?? 0;
  const memoryMB = capabilityModel.memoryMB ?? 0;
  const gpuScore = capabilityModel.gpuScore ?? 0;

  const cpuScore = cpuCores <= 0 ? 0 : (cpuCores >= cpuRequired ? 1 : 0.2);
  const memScore = memoryMB <= 0 ? 0 : (memoryMB >= memRequired ? 1 : 0.2);
  const gpuScoreNorm = gpuScore <= 0 ? 0 : (gpuScore >= gpuRequired ? 1 : 0.2);

  return (cpuScore + memScore + gpuScoreNorm) / 3;
}

// ============================================================================
// INTERNAL: Deterministic Band-Aware Job Score (v16 + capabilityModel + INTEL)
// ============================================================================
function scoreJobWithBand(job, capabilityModel, band, context = {}) {
  const baseCapability = scoreJobForCapability(job, capabilityModel);
  const rep = job.reputationWeight ?? 0.5;

  const b = normalizeBand(band);
  const bandBias = b === CIRC_BANDS.BINARY ? 1.1 : 1.0;

  const presenceField = buildPresenceField(context);
  const meshPressure = presenceField.meshPressureIndex || 0;
  const hintsField = buildHintsField(context);
  const fallbackBandLevel = hintsField.fallbackBandLevel || 0;

  const pressureBias = 1 + (meshPressure / 300);
  const fallbackBias = 1 - (fallbackBandLevel * 0.05);

  const performanceRatio = capabilityModel.performanceRatio ?? 1;

  const gpuScore = capabilityModel.gpuScore ?? 0;
  const minerScore = capabilityModel.minerScore ?? 0;
  const offlineScore = capabilityModel.offlineScore ?? 0;

  const gpuBias = gpuScore > 0 ? 1.05 : 1.0;
  const minerBias = minerScore > 0 ? 1.03 : 1.0;
  const offlineBias = offlineScore > 0 ? 1.02 : 1.0;

  return baseCapability
    * (0.5 + rep)
    * bandBias
    * pressureBias
    * fallbackBias
    * performanceRatio
    * gpuBias
    * minerBias
    * offlineBias;
}

// ============================================================================
// 3. selectBestJob — Deterministic Autonomic Prioritization (v16 IMMORTAL-INTEL)
// ============================================================================
export function selectBestJob(jobs, band = CIRC_BANDS.SYMBOLIC, context = {}, capabilityModel = {}) {
  try {
    const normalizedBand = normalizeBand(band);

    let bestJob = null;
    let bestScore = -Infinity;

    for (const job of jobs) {
      if (!job.id || !job.marketplaceId) continue;

      const finalScore = scoreJobWithBand(job, capabilityModel, normalizedBand, context);

      if (finalScore > bestScore) {
        bestScore = finalScore;
        bestJob = job;
      }
    }

    if (bestJob) {
      circulatoryHealing.lastBestJobId = bestJob.id;
      circulatoryHealing.lastSelectionSignature = buildSelectionSignature(bestJob.id);
    }

    return bestJob;

  } catch (err) {
    circulatoryHealing.lastSelectionError = String(err && err.message ? err.message : err);
    return null;
  }
}

// ============================================================================
// 4. getNextJob — Full Autonomic Routing Cycle (v16 IMMORTAL-INTEL)
// ============================================================================
// capabilityModel is REQUIRED for strict purity: no internal device assumptions.
export function getNextJob(
  allMarketplaces,
  getMarketplaceReputation,
  band = CIRC_BANDS.SYMBOLIC,
  context = {},
  capabilityModel = {}
) {
  const normalizedBand = normalizeBand(band);
  circulatoryHealing.lastBand = normalizedBand;
  circulatoryHealing.lastCapabilityModel = { ...capabilityModel };
  circulatoryHealing.lastPerformanceRatio = capabilityModel.performanceRatio ?? 1;

  try {
    const presenceField = buildPresenceField(context);
    const advantagePresenceField = buildAdvantagePresenceField(context);
    const hintsField = buildHintsField(context);
    const computeProfile = buildComputeProfile({ band: normalizedBand, context, capabilityModel });

    const healthy = discoverHealthyMarketplaces(allMarketplaces);
    if (healthy.length === 0) {
      const loopField = buildLoopField([], normalizedBand);
      const waveField = buildWaveField([], normalizedBand);
      const advantageField = buildAdvantageFieldForRouting([], normalizedBand);

      const pulseIntelligence = computePulseIntelligence({
        advantageField: {
          ...advantageField,
          advantageScore: advantagePresenceField.advantageScore,
          advantageTier: advantagePresenceField.advantageTier
        },
        presenceField,
        computeProfile,
        band: normalizedBand
      });

      circulatoryHealing.lastLoopField = loopField;
      circulatoryHealing.lastWaveField = waveField;
      circulatoryHealing.lastAdvantageField = advantageField;

      circulatoryHealing.lastPresenceField = presenceField;
      circulatoryHealing.lastAdvantagePresenceField = advantagePresenceField;
      circulatoryHealing.lastHintsField = hintsField;
      circulatoryHealing.lastComputeProfile = computeProfile;

      circulatoryHealing.lastPulseIntelligence = pulseIntelligence;
      circulatoryHealing.lastPulseIntelligenceSignature = computeHash(
        JSON.stringify(pulseIntelligence)
      );

      circulatoryHealing.lastRoutingCycleSignature =
        buildRoutingCycleSignature(circulatoryHealing.cycleCount, normalizedBand);

      return null;
    }

    const jobs = fetchJobsFromMarketplaces(healthy);
    if (jobs.length === 0) {
      const loopField = buildLoopField([], normalizedBand);
      const waveField = buildWaveField([], normalizedBand);
      const advantageField = buildAdvantageFieldForRouting([], normalizedBand);

      const pulseIntelligence = computePulseIntelligence({
        advantageField: {
          ...advantageField,
          advantageScore: advantagePresenceField.advantageScore,
          advantageTier: advantagePresenceField.advantageTier
        },
        presenceField,
        computeProfile,
        band: normalizedBand
      });

      circulatoryHealing.lastLoopField = loopField;
      circulatoryHealing.lastWaveField = waveField;
      circulatoryHealing.lastAdvantageField = advantageField;

      circulatoryHealing.lastPresenceField = presenceField;
      circulatoryHealing.lastAdvantagePresenceField = advantagePresenceField;
      circulatoryHealing.lastHintsField = hintsField;
      circulatoryHealing.lastComputeProfile = computeProfile;

      circulatoryHealing.lastPulseIntelligence = pulseIntelligence;
      circulatoryHealing.lastPulseIntelligenceSignature = computeHash(
        JSON.stringify(pulseIntelligence)
      );

      circulatoryHealing.lastRoutingCycleSignature =
        buildRoutingCycleSignature(circulatoryHealing.cycleCount, normalizedBand);

      return null;
    }

    const weightedJobs = jobs.map(job => {
      const rep = getMarketplaceReputation(job.marketplaceId);
      return { ...job, reputationWeight: rep };
    });

    const best = selectBestJob(weightedJobs, normalizedBand, context, capabilityModel);

    const loopField = buildLoopField(weightedJobs, normalizedBand);
    const waveField = buildWaveField(weightedJobs, normalizedBand);
    const advantageField = buildAdvantageFieldForRouting(weightedJobs, normalizedBand);

    const pulseIntelligence = computePulseIntelligence({
      advantageField: {
        ...advantageField,
        advantageScore: advantagePresenceField.advantageScore,
        advantageTier: advantagePresenceField.advantageTier
      },
      presenceField,
      computeProfile,
      band: normalizedBand
    });

    circulatoryHealing.lastLoopField = loopField;
    circulatoryHealing.lastWaveField = waveField;
    circulatoryHealing.lastAdvantageField = advantageField;

    circulatoryHealing.lastPresenceField = presenceField;
    circulatoryHealing.lastAdvantagePresenceField = advantagePresenceField;
    circulatoryHealing.lastHintsField = hintsField;
    circulatoryHealing.lastComputeProfile = computeProfile;

    circulatoryHealing.lastPulseIntelligence = pulseIntelligence;
    circulatoryHealing.lastPulseIntelligenceSignature = computeHash(
      JSON.stringify(pulseIntelligence)
    );

    circulatoryHealing.lastRoutingCycleSignature =
      buildRoutingCycleSignature(circulatoryHealing.cycleCount, normalizedBand);

    return best;

  } catch (err) {
    const msg = String(err && err.message ? err.message : err);
    circulatoryHealing.lastSelectionError = msg;

    const presenceField = buildPresenceField(context);
    const advantagePresenceField = buildAdvantagePresenceField(context);
    const hintsField = buildHintsField(context);
    const computeProfile = buildComputeProfile({ band: normalizedBand, context, capabilityModel });

    const loopField = buildLoopField([], normalizedBand);
    const waveField = buildWaveField([], normalizedBand);
    const advantageField = buildAdvantageFieldForRouting([], normalizedBand);

    const pulseIntelligence = computePulseIntelligence({
      advantageField: {
        ...advantageField,
        advantageScore: advantagePresenceField.advantageScore,
        advantageTier: advantagePresenceField.advantageTier
      },
      presenceField,
      computeProfile,
      band: normalizedBand
    });

    circulatoryHealing.lastLoopField = loopField;
    circulatoryHealing.lastWaveField = waveField;
    circulatoryHealing.lastAdvantageField = advantageField;

    circulatoryHealing.lastPresenceField = presenceField;
    circulatoryHealing.lastAdvantagePresenceField = advantagePresenceField;
    circulatoryHealing.lastHintsField = hintsField;
    circulatoryHealing.lastComputeProfile = computeProfile;

    circulatoryHealing.lastPulseIntelligence = pulseIntelligence;
    circulatoryHealing.lastPulseIntelligenceSignature = computeHash(
      JSON.stringify(pulseIntelligence)
    );

    circulatoryHealing.lastRoutingCycleSignature =
      buildRoutingCycleSignature(circulatoryHealing.cycleCount, normalizedBand);

    return null;
  }
}

// ============================================================================
// Export Healing Metadata — Circulatory Reflex Report (v16-Immortal-INTEL)
// ============================================================================
export function getPulseEarnCirculatorySystemHealingState() {
  return { ...circulatoryHealing };
}
