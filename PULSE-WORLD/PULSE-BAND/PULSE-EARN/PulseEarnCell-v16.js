// ============================================================================
// FILE: tropic-pulse-functions/PULSE-WORLD/PULSE-EARN/PulseEarnCell-v16-Immortal-INTEL.js
// LAYER: THE CELL WORKER (v16-Immortal-INTEL)
// (Deterministic Cell Compute + Presence/Advantage/Hints + Compute/GPU Profile)
// ============================================================================
//
// ROLE (v16-Immortal-INTEL):
//   THE CELL WORKER — Pulse‑Earn’s deterministic micro‑compute organ.
//   • Executes small, sandboxed, deterministic operations.
//   • Emits v16‑IMMORTAL presence/advantage/hints/compute surfaces.
//   • Emits cell compute + GPU profile (metadata-only).
//   • Emits loop + wave + band/binary fields as structural metadata.
//   • No speed, no baselines, no governors, no performance math.
//
// CONTRACT (v16-Immortal-INTEL):
//   • PURE COMPUTE — no AI layers, no translation, no memory model.
//   • NO eval(), NO Function(), NO dynamic imports.
//   • NO user scripts, NO network calls, NO filesystem access.
//   • NEVER mutate job objects.
//   • Deterministic output only.
//   • Dual-band + binary + wave + presence metadata are structural-only.
// ============================================================================
/*
AI_EXPERIENCE_META = {
  identity: "PulseEarnCell",
  version: "v16-Immortal-INTEL",
  layer: "earn_cell",
  role: "earn_metabolic_cell",
  lineage: "PulseEarnCell-v9 → v11-Evo → v13-Presence-Immortal → v16-Immortal-INTEL",

  evo: {
    earnCell: true,
    metabolicUnit: true,
    jobExecutor: true,
    dualBand: true,
    symbolicPrimary: true,
    binaryAware: true,

    deterministic: true,
    driftProof: true,
    pureCompute: true,
    zeroMutationOfInput: true,
    zeroNetwork: true,
    zeroFilesystem: true,

    // v16 IMMORTAL-INTEL
    chunkAware: true,
    cacheAware: true,
    prewarmAware: true,
    hotStateAware: true,
    factoringAware: true,
    gpuAware: true,
    minerAware: true,
    offlineAware: true,
    computeTierAware: true,
    pulseIntelligenceReady: true
  },

  contract: {
    always: [
      "PulseEarn",
      "PulseEarnCirculatorySystem",
      "PulseEarnEndocrineSystem"
    ],
    never: [
      "safeRoute",
      "fetchViaCNS"
    ]
  }
}
*/

export const PulseEarnCellMeta = Object.freeze({
  layer: "PulseEarnCell",
  role: "CELL_WORKER",
  version: "v16-Immortal-INTEL",
  identity: "PulseEarnCell-v16-Immortal-INTEL",

  guarantees: Object.freeze({
    deterministic: true,
    noRandomness: true,
    noRealTime: true,
    noExternalIO: true,
    pureCompute: true,
    safeSandbox: true,
    dualBandAware: true,
    binaryAware: true,
    evolutionAware: true,
    healingMetadataAware: true,
    waveFieldAware: true,
    loopFieldAware: true,
    worldLensAware: false,

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

    // v16 IMMORTAL-INTEL
    gpuAware: true,
    minerAware: true,
    offlineAware: true,
    computeTierAware: true,
    pulseIntelligenceReady: true
  }),

  contract: Object.freeze({
    input: [
      "EarnCellJob",
      "DualBandContext",
      "GlobalHintsPresenceField"
    ],
    output: [
      "EarnCellResult",
      "EarnCellDiagnostics",
      "EarnCellSignatures",
      "EarnCellPresenceField",
      "EarnCellAdvantageField",
      "EarnCellComputeProfile",
      "EarnCellIntelligentPlan"
    ]
  }),

  lineage: Object.freeze({
    root: "PulseOS-v16-Immortal-INTEL",
    parent: "PulseEarn-v16-Immortal-INTEL",
    ancestry: [
      "PulseEarnCell-v10",
      "PulseEarnCell-v11",
      "PulseEarnCell-v11-Evo",
      "PulseEarnCell-v12.3-Presence-Evo+",
      "PulseEarnCell-v13.0-Presence-Immortal"
    ]
  }),

  bands: Object.freeze({
    supported: ["symbolic", "binary"],
    default: "symbolic",
    behavior: "metadata-only"
  }),

  architecture: Object.freeze({
    pattern: "A-B-A",
    baseline: "deterministic compute",
    adaptive: "healing metadata + advantage surfaces + presence/hints/compute surfaces + intelligent plan",
    return: "deterministic structured output"
  })
});

// ============================================================================
// CELL CONTEXT METADATA
// ============================================================================
const EARN_CELL_CONTEXT = {
  layer: "PulseEarnCell-v16-Immortal-INTEL",
  role: "CELL_WORKER",
  purpose: "Execute deterministic, sandboxed compute operations for Earn jobs",
  context: "Safe compute participant + healing metadata (cell health)",
  version: "16-Immortal-INTEL"
};

// ============================================================================
// Dual-band constants (symbolic + binary) — metadata-only
// ============================================================================
const CELL_BANDS = {
  SYMBOLIC: "symbolic",
  BINARY: "binary"
};

function normalizeBand(band) {
  const b = String(band || CELL_BANDS.SYMBOLIC).toLowerCase();
  return b === CELL_BANDS.BINARY ? CELL_BANDS.BINARY : CELL_BANDS.SYMBOLIC;
}

// ============================================================================
// Healing Metadata — Cell Health Log + Advantage Memory
// ============================================================================
const MAX_ADV_HISTORY = 32;

const healingState = {
  lastJobType: null,
  lastError: null,
  lastOutput: null,
  continuanceFallback: false,

  cycleCount: 0,
  lastCycleIndex: 0,
  executionState: "idle", // idle | dispatching | executing | returning | error

  lastCellSignature: null,
  lastJobSignature: null,
  lastOutputSignature: null,

  lastHealthScore: 1.0,
  lastTier: "microDegrade",
  lastBand: CELL_BANDS.SYMBOLIC,
  lastAdvantageField: null,
  lastDiagnostics: null,
  lastLoopField: null,
  lastWaveField: null,

  lastPresenceField: null,
  lastPresenceAdvantageField: null,
  lastHintsField: null,
  lastComputeProfile: null,

  // v16: local advantage memory
  totalJobs: 0,
  successfulJobs: 0,
  failedJobs: 0,
  cumulativeAdvantageScore: 0,
  lastAdvantageHistory: [], // array of { jobType, advantageScore, advantageTier, band }

  ...EARN_CELL_CONTEXT
};

function recordAdvantageMemory(jobType, band, advantageField) {
  const score = advantageField?.advantageScore ?? 0;
  const tier = advantageField?.advantageTier ?? 0;

  healingState.totalJobs += 1;
  healingState.cumulativeAdvantageScore += score;

  const entry = {
    jobType: jobType || "unknown",
    band: normalizeBand(band),
    advantageScore: score,
    advantageTier: tier
  };

  healingState.lastAdvantageHistory.push(entry);
  if (healingState.lastAdvantageHistory.length > MAX_ADV_HISTORY) {
    healingState.lastAdvantageHistory.shift();
  }
}

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
function buildCellSignature(cycle, band) {
  return computeHash(`CELL::${cycle}::${normalizeBand(band)}`);
}

function buildJobSignature(type, band) {
  return computeHash(`JOBTYPE::${normalizeBand(band)}::${type}`);
}

function buildOutputSignature(output, band) {
  return computeHash(
    `OUTPUT::${normalizeBand(band)}::${JSON.stringify(output).length}`
  );
}

// ============================================================================
// Health / Tier
// ============================================================================
function computeHealthScore() {
  return 1.0;
}

function classifyDegradationTier(h) {
  if (h >= 0.95) return "microDegrade";
  if (h >= 0.85) return "softDegrade";
  if (h >= 0.50) return "midDegrade";
  if (h >= 0.15) return "hardDegrade";
  return "criticalDegrade";
}

// ============================================================================
// Presence / Advantage / Hints / Compute Profile from globalHints/context
// ============================================================================
function cwClamp01(x) {
  if (x == null || Number.isNaN(x)) return 0;
  return Math.max(0, Math.min(1, x));
}

function cwNormalizeCachePriority(p) {
  if (!p) return "normal";
  const v = String(p).toLowerCase();
  if (v === "critical" || v === "high" || v === "low") return v;
  return "normal";
}

function buildPresenceFieldFromContext(context = {}) {
  const gh = context.globalHints || {};
  const pf = context.presenceField || {};
  const mesh = context.meshSignals || {};
  const castle = context.castleSignals || {};
  const region = gh.regionContext || {};

  const meshPressureIndex = mesh.meshPressureIndex || 0;
  const castleLoadLevel = castle.loadLevel || 0;
  const meshStrength = mesh.meshStrength || 0;

  const pressure = meshPressureIndex + castleLoadLevel;
  let presenceTier = "idle";
  if (pressure >= 150) presenceTier = "critical";
  else if (pressure >= 100) presenceTier = "high";
  else if (pressure >= 50) presenceTier = "elevated";
  else if (pressure > 0) presenceTier = "soft";

  const presenceSignature = computeHash(
    `CELL_PRESENCE_V16::${presenceTier}::${meshPressureIndex}::${castleLoadLevel}`
  );

  return Object.freeze({
    presenceVersion: "v16-Immortal-INTEL",
    presenceTier,
    presenceSignature,

    bandPresence: pf.bandPresence || gh.presenceContext?.bandPresence || "unknown",
    routerPresence: pf.routerPresence || gh.presenceContext?.routerPresence || "unknown",
    devicePresence: pf.devicePresence || gh.presenceContext?.devicePresence || "unknown",
    meshPresence: pf.meshPresence || mesh.meshStrength || "unknown",
    castlePresence: pf.castlePresence || castle.castlePresence || "unknown",
    regionPresence: pf.regionPresence || region.regionTag || "unknown",
    regionId: region.regionId || "unknown-region",
    castleId: castle.castleId || "unknown-castle",
    castleLoadLevel,
    meshStrength,
    meshPressureIndex
  });
}

function buildAdvantageFieldFromHints(context = {}) {
  const gh = context.globalHints || {};
  const adv = gh.advantageContext || {};
  const compute = gh.computeContext || {};
  const gpu = compute.gpu || {};
  const miner = compute.miner || {};
  const offline = compute.offline || {};

  return Object.freeze({
    advantageVersion: "C-16.0",
    advantageScore: adv.score ?? 0,
    advantageBand: adv.band ?? "neutral",
    advantageTier: adv.tier ?? 0,

    gpuEligible: !!gpu.eligible,
    gpuPreferred: !!gpu.preferred,
    gpuTier: gpu.tier || "unknown",

    minerEligible: !!miner.eligible,
    minerTier: miner.tier || "unknown",

    offlineEligible: !!offline.eligible,
    offlineTier: offline.tier || "unknown"
  });
}

function buildHintsFieldFromHints(context = {}) {
  const gh = context.globalHints || {};
  return Object.freeze({
    fallbackBandLevel: gh.fallbackBandLevel ?? 0,
    chunkHints: gh.chunkHints || {},
    cacheHints: gh.cacheHints || {},
    prewarmHints: gh.prewarmHints || {},
    coldStartHints: gh.coldStartHints || {},
    computeHints: gh.computeHints || {}
  });
}

function deriveFactoringSignal({
  meshPressureIndex = 0,
  cachePriority = "normal",
  prewarmNeeded = false
}) {
  const pressure = cwClamp01(meshPressureIndex / 100);
  const highPressure = pressure >= 0.7;
  const criticalCache = cachePriority === "critical";
  if (criticalCache || prewarmNeeded) return 1;
  if (highPressure) return 1;
  return 0;
}

function buildComputeProfile({ band, context = {} }) {
  const b = normalizeBand(band);
  const hintsField = buildHintsFieldFromHints(context);
  const cachePriority = cwNormalizeCachePriority(hintsField.cacheHints.priority);
  const prewarmNeeded = !!hintsField.prewarmHints.shouldPrewarm;
  const meshPressureIndex =
    (context.meshSignals && context.meshSignals.meshPressureIndex) || 0;

  const factoringSignal = deriveFactoringSignal({
    meshPressureIndex,
    cachePriority,
    prewarmNeeded
  });

  const serverHints = context.serverAdvantageHints || {};
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

  return Object.freeze({
    routeBand: b,
    fallbackBandLevel: hintsField.fallbackBandLevel,
    chunkAggression: hintsField.chunkAggression ?? hintsField.chunkHints.chunkAggression ?? 0,
    cachePriority,
    prewarmNeeded,
    binaryPreferred: b === CELL_BANDS.BINARY,
    symbolicPreferred: b === CELL_BANDS.SYMBOLIC,
    factoringSignal,

    hotStateReuse: serverHints.hotStateReuse ?? true,
    multiInstanceBatching: serverHints.multiInstanceBatching ?? true,
    serverPlanCache: serverHints.planCache ?? true,
    serverBinaryReuse: serverHints.binaryReuse ?? true,

    gpuEligible,
    gpuPreferred,
    gpuTier,
    minerEligible,
    minerTier,
    offlineEligible,
    offlineTier,
    computeTierHint
  });
}

// ============================================================================
// Advantage / Diagnostics / Loop / Wave
// ============================================================================
function buildAdvantageField(jobType, band, { computeProfile, presenceAdvantageField } = {}) {
  const b = normalizeBand(band);
  const cp = computeProfile || {};
  const pa = presenceAdvantageField || {};

  return Object.freeze({
    advantageVersion: "C-16.0",
    jobType,
    band: b,

    symbolicPlanningBias: b === CELL_BANDS.SYMBOLIC ? 1 : 0,
    binaryCompressionBias: b === CELL_BANDS.BINARY ? 1 : 0,

    // Presence / global advantage
    advantageScore: pa.advantageScore ?? 0,
    advantageBand: pa.advantageBand ?? "neutral",
    advantageTier: pa.advantageTier ?? 0,

    // Chunk / cache / prewarm / factoring / hot state
    chunkAggression: cp.chunkAggression ?? 0,
    cachePriority: cp.cachePriority || "normal",
    prewarmNeeded: !!cp.prewarmNeeded,
    factoringSignal: cp.factoringSignal ?? 0,
    hotStateReuse: cp.hotStateReuse ?? true,
    multiInstanceBatching: cp.multiInstanceBatching ?? true,
    serverPlanCache: cp.serverPlanCache ?? true,
    serverBinaryReuse: cp.serverBinaryReuse ?? true,

    // Band preferences
    binaryPreferred: !!cp.binaryPreferred,
    symbolicPreferred: !!cp.symbolicPreferred,

    // GPU / miner / offline / compute tier
    gpuEligible: !!cp.gpuEligible,
    gpuPreferred: !!cp.gpuPreferred,
    gpuTier: cp.gpuTier || "unknown",
    minerEligible: !!cp.minerEligible,
    minerTier: cp.minerTier || "unknown",
    offlineEligible: !!cp.offlineEligible,
    offlineTier: cp.offlineTier || "unknown",
    computeTierHint: cp.computeTierHint || "normal"
  });
}

function buildDiagnostics(jobType, band, healthScore, tier) {
  const b = normalizeBand(band);

  return {
    jobType,
    band: b,
    healthScore,
    tier,
    bandMode:
      b === CELL_BANDS.BINARY ? "binary-compression" : "symbolic-planning"
  };
}

function buildLoopField(cycle, band) {
  const b = normalizeBand(band);
  return {
    cycle,
    closedLoop: cycle > 0,
    loopStrength: cycle * (b === CELL_BANDS.BINARY ? 2 : 1),
    band: b
  };
}

function buildWaveField(jobType, band) {
  const len = String(jobType || "").length;
  const b = normalizeBand(band);

  return {
    wavelength: len,
    amplitude: len % 7,
    phase: (len * 3) % 8,
    band: b,
    mode: b === CELL_BANDS.BINARY ? "compression-wave" : "symbolic-wave"
  };
}

// ============================================================================
// ⭐ Pulse Intelligence (logic-only, IMMORTAL-safe)
// ============================================================================
function computePulseIntelligence({
  advantageField,
  presenceField,
  factoringSignal,
  band
}) {
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

  const factoring = factoringSignal ? 1 : 0;
  const bandIsBinary = band === "binary" ? 1 : 0;

  const solvednessScore = Math.max(
    0,
    Math.min(
      advantageScore * 10 * 0.5 + presenceWeight * 0.3 + factoring * 0.2,
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
    solvednessScore,
    factoringSignal: factoring ? "high" : "low",
    computeTier,
    readinessScore,
    band,
    advantageTier
  };
}

// ============================================================================
// ⭐ Intelligent Compute Plan (pure, deterministic)
// ============================================================================
function buildIntelligentComputePlan({
  job,
  band,
  presenceField,
  presenceAdvantageField,
  computeProfile
}) {
  const jobType = job?.type || "unknown";
  const b = normalizeBand(band);

  const baseAdvantage = {
    advantageScore: presenceAdvantageField.advantageScore ?? 0,
    advantageTier: presenceAdvantageField.advantageTier ?? 0
  };

  const avgAdvantage =
    healingState.totalJobs > 0
      ? healingState.cumulativeAdvantageScore / healingState.totalJobs
      : 0;

  const pressureTier = presenceField.presenceTier || "idle";
  const highPressure =
    pressureTier === "critical" || pressureTier === "high";

  const preferBinary =
    computeProfile.binaryPreferred ||
    (highPressure && computeProfile.gpuEligible);

  const preferGPU =
    computeProfile.gpuEligible &&
    (computeProfile.gpuPreferred || baseAdvantage.advantageTier >= 2);

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
  if (avgAdvantage >= 0.8 && baseAdvantage.advantageTier >= 2) {
    refinedComputeTier = "highValue";
  } else if (avgAdvantage <= 0.2 && !highPressure) {
    refinedComputeTier = "lowPriority";
  }

  const plan = {
    planVersion: "CELL-INTEL-16.0",
    jobType,
    band: b,

    // routing
    routeBand: preferBinary ? CELL_BANDS.BINARY : CELL_BANDS.SYMBOLIC,

    // compute placement
    useGPU: preferGPU,
    useMiner: preferMiner,
    useOffline: preferOffline,

    // tiering
    computeTier: refinedComputeTier,

    // prewarm / cache / chunk
    shouldPrewarm: !!computeProfile.prewarmNeeded,
    cachePriority: computeProfile.cachePriority,
    chunkAggression: computeProfile.chunkAggression,

    // factoring / hot state
    factoringSignal: computeProfile.factoringSignal,
    hotStateReuse: computeProfile.hotStateReuse,
    multiInstanceBatching: computeProfile.multiInstanceBatching,
    serverPlanCache: computeProfile.serverPlanCache,
    serverBinaryReuse: computeProfile.serverBinaryReuse,

    // local advantage memory snapshot
    localAdvantageMemory: {
      totalJobs: healingState.totalJobs,
      successfulJobs: healingState.successfulJobs,
      failedJobs: healingState.failedJobs,
      averageAdvantageScore: avgAdvantage
    }
  };

  return Object.freeze(plan);
}

// ============================================================================
// Deterministic Cell Workloads
// ============================================================================
function textTransform({ text = "", mode = "upper" }) {
  switch (mode) {
    case "upper":
      return text.toUpperCase();
    case "lower":
      return text.toLowerCase();
    case "reverse":
      return text.split("").reverse().join("");
    default:
      throw new Error(`Unknown text mode: ${mode}`);
  }
}

function mathCompute({ operation, values = [] }) {
  const nums = Array.isArray(values)
    ? values.map((v) => Number(v)).filter((v) => Number.isFinite(v))
    : [];
  switch (operation) {
    case "sum":
      return nums.reduce((a, b) => a + b, 0);
    case "avg":
      return nums.length
        ? nums.reduce((a, b) => a + b, 0) / nums.length
        : 0;
    case "max":
      return nums.length ? Math.max(...nums) : -Infinity;
    case "min":
      return nums.length ? Math.min(...nums) : Infinity;
    default:
      throw new Error(`Unknown math operation: ${operation}`);
  }
}

function dataAggregate({ items = [], field }) {
  if (!field) throw new Error("Missing field for data.aggregate");
  return items.map((item) => item[field]);
}

function jsonTransform({ json, pick }) {
  if (!json || typeof json !== "object") {
    throw new Error("Invalid JSON payload");
  }

  if (!pick) return json;

  const out = {};
  for (const key of pick) {
    if (Object.prototype.hasOwnProperty.call(json, key)) {
      out[key] = json[key];
    }
  }
  return out;
}

// ============================================================================
// computeWork — v16 IMMORTAL-INTEL Cell Execution
// ============================================================================
export function computeWork(job, context = {}) {
  healingState.cycleCount++;
  healingState.lastCycleIndex = healingState.cycleCount;
  healingState.executionState = "dispatching";

  const band = normalizeBand(job && job.band);
  healingState.lastBand = band;

  const presenceField = buildPresenceFieldFromContext(context);
  const presenceAdvantageField = buildAdvantageFieldFromHints(context);
  const hintsField = buildHintsFieldFromHints(context);
  const computeProfile = buildComputeProfile({ band, context });

  const intelligentPlan = buildIntelligentComputePlan({
    job,
    band,
    presenceField,
    presenceAdvantageField,
    computeProfile
  });

  healingState.lastPresenceField = presenceField;
  healingState.lastPresenceAdvantageField = presenceAdvantageField;
  healingState.lastHintsField = hintsField;
  healingState.lastComputeProfile = computeProfile;

  try {
    if (!job || !job.type || !job.payload) {
      healingState.lastError = "invalid_job_structure";
      healingState.executionState = "error";
      healingState.continuanceFallback = true;
      healingState.failedJobs += 1;

      const healthScore = computeHealthScore();
      const tier = classifyDegradationTier(healthScore);
      const advantageField = buildAdvantageField("invalid", band, {
        computeProfile,
        presenceAdvantageField
      });
      const diagnostics = buildDiagnostics("invalid", band, healthScore, tier);
      const loopField = buildLoopField(healingState.cycleCount, band);
      const waveField = buildWaveField("invalid", band);

      const pulseIntelligence = computePulseIntelligence({
        advantageField,
        presenceField,
        factoringSignal: computeProfile.factoringSignal,
        band
      });

      healingState.lastHealthScore = healthScore;
      healingState.lastTier = tier;
      healingState.lastAdvantageField = advantageField;
      healingState.lastDiagnostics = diagnostics;
      healingState.lastLoopField = loopField;
      healingState.lastWaveField = waveField;

      healingState.lastCellSignature = buildCellSignature(
        healingState.cycleCount,
        band
      );

      recordAdvantageMemory("invalid", band, advantageField);

      return {
        success: false,
        error: "Invalid job structure",
        durationCycles: healingState.cycleCount,
        band,
        healthScore,
        tier,
        advantageField,
        diagnostics,
        loopField,
        waveField,
        cellSignature: healingState.lastCellSignature,
        continuanceFallback: true,
        presenceField,
        presenceAdvantageField,
        hintsField,
        computeProfile,
        intelligentPlan,

        pulseIntelligence,
        pulseIntelligenceSignature: computeHash(
          JSON.stringify(pulseIntelligence)
        ),

        ...EARN_CELL_CONTEXT
      };
    }

    const { type, payload } = job;
    healingState.lastJobType = type;
    healingState.lastJobSignature = buildJobSignature(type, band);

    healingState.executionState = "executing";
    healingState.continuanceFallback = false;

    let output;

    switch (type) {
      case "text.transform":
        output = textTransform(payload);
        break;

      case "math.compute":
        output = mathCompute(payload);
        break;

      case "data.aggregate":
        output = dataAggregate(payload);
        break;

      case "json.transform":
        output = jsonTransform(payload);
        break;

      default: {
        healingState.lastError = "unknown_job_type";
        healingState.executionState = "error";
        healingState.continuanceFallback = true;
        healingState.failedJobs += 1;

        const uHealthScore = computeHealthScore();
        const uTier = classifyDegradationTier(uHealthScore);
        const uAdvantageField = buildAdvantageField(type, band, {
          computeProfile,
          presenceAdvantageField
        });
        const uDiagnostics = buildDiagnostics(
          type,
          band,
          uHealthScore,
          uTier
        );
        const uLoopField = buildLoopField(healingState.cycleCount, band);
        const uWaveField = buildWaveField(type, band);

        const uPulseIntelligence = computePulseIntelligence({
          advantageField: uAdvantageField,
          presenceField,
          factoringSignal: computeProfile.factoringSignal,
          band
        });

        healingState.lastHealthScore = uHealthScore;
        healingState.lastTier = uTier;
        healingState.lastAdvantageField = uAdvantageField;
        healingState.lastDiagnostics = uDiagnostics;
        healingState.lastLoopField = uLoopField;
        healingState.lastWaveField = uWaveField;

        healingState.lastCellSignature = buildCellSignature(
          healingState.cycleCount,
          band
        );

        recordAdvantageMemory(type, band, uAdvantageField);

        return {
          success: false,
          error: `Unknown job type: ${type}`,
          durationCycles: healingState.cycleCount,
          band,
          healthScore: uHealthScore,
          tier: uTier,
          advantageField: uAdvantageField,
          diagnostics: uDiagnostics,
          loopField: uLoopField,
          waveField: uWaveField,
          cellSignature: healingState.lastCellSignature,
          continuanceFallback: true,
          presenceField,
          presenceAdvantageField,
          hintsField,
          computeProfile,
          intelligentPlan,

          pulseIntelligence: uPulseIntelligence,
          pulseIntelligenceSignature: computeHash(
            JSON.stringify(uPulseIntelligence)
          ),

          ...EARN_CELL_CONTEXT
        };
      }
    }

    healingState.lastOutput = output;
    healingState.lastOutputSignature = buildOutputSignature(output, band);
    healingState.lastError = null;
    healingState.executionState = "returning";
    healingState.successfulJobs += 1;

    const healthScore = computeHealthScore();
    const tier = classifyDegradationTier(healthScore);
    const advantageField = buildAdvantageField(type, band, {
      computeProfile,
      presenceAdvantageField
    });
    const diagnostics = buildDiagnostics(type, band, healthScore, tier);
    const loopField = buildLoopField(healingState.cycleCount, band);
    const waveField = buildWaveField(type, band);

    const pulseIntelligence = computePulseIntelligence({
      advantageField,
      presenceField,
      factoringSignal: computeProfile.factoringSignal,
      band
    });

    healingState.lastHealthScore = healthScore;
    healingState.lastTier = tier;
    healingState.lastAdvantageField = advantageField;
    healingState.lastDiagnostics = diagnostics;
    healingState.lastLoopField = loopField;
    healingState.lastWaveField = waveField;

    healingState.lastCellSignature = buildCellSignature(
      healingState.cycleCount,
      band
    );

    recordAdvantageMemory(type, band, advantageField);

    return {
      success: true,
      output,
      durationCycles: healingState.cycleCount,
      band,
      healthScore,
      tier,
      advantageField,
      diagnostics,
      loopField,
      waveField,
      cellSignature: healingState.lastCellSignature,
      continuanceFallback: false,
      presenceField,
      presenceAdvantageField,
      hintsField,
      computeProfile,
      intelligentPlan,

      pulseIntelligence,
      pulseIntelligenceSignature: computeHash(
        JSON.stringify(pulseIntelligence)
      ),

      ...EARN_CELL_CONTEXT
    };
  } catch (err) {
    const msg = String(err && err.message ? err.message : err);

    healingState.lastError = msg;
    healingState.executionState = "error";
    healingState.continuanceFallback = true;
    healingState.failedJobs += 1;

    const healthScore = computeHealthScore();
    const tier = classifyDegradationTier(healthScore);
    const advantageField = buildAdvantageField(
      healingState.lastJobType || "error",
      band,
      {
        computeProfile,
        presenceAdvantageField
      }
    );
    const diagnostics = buildDiagnostics(
      healingState.lastJobType || "error",
      band,
      healthScore,
      tier
    );
    const loopField = buildLoopField(healingState.cycleCount, band);
    const waveField = buildWaveField(
      healingState.lastJobType || "error",
      band
    );

    const pulseIntelligence = computePulseIntelligence({
      advantageField,
      presenceField,
      factoringSignal: computeProfile.factoringSignal,
      band
    });

    healingState.lastHealthScore = healthScore;
    healingState.lastTier = tier;
    healingState.lastAdvantageField = advantageField;
    healingState.lastDiagnostics = diagnostics;
    healingState.lastLoopField = loopField;
    healingState.lastWaveField = waveField;

    healingState.lastCellSignature = buildCellSignature(
      healingState.cycleCount,
      band
    );

    recordAdvantageMemory(healingState.lastJobType || "error", band, advantageField);

    return {
      success: false,
      error: msg,
      durationCycles: healingState.cycleCount,
      band,
      healthScore,
      tier,
      advantageField,
      diagnostics,
      loopField,
      waveField,
      cellSignature: healingState.lastCellSignature,
      continuanceFallback: true,
      presenceField,
      presenceAdvantageField,
      hintsField,
      computeProfile,
      intelligentPlan,

      pulseIntelligence,
      pulseIntelligenceSignature: computeHash(
        JSON.stringify(pulseIntelligence)
      ),

      ...EARN_CELL_CONTEXT
    };
  }
}

// ============================================================================
// Export healing metadata — Cell Health Snapshot
// ============================================================================
export function getPulseEarnCellHealingState() {
  return { ...healingState };
}
