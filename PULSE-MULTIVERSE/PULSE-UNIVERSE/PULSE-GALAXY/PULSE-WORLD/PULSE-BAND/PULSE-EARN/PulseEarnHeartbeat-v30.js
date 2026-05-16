// ============================================================================
// FILE: PULSE-WORLD-OS/PULSE-MULTIVERSE/PULSEWORLD/PULSE-EARN/PulseHeartbeat-v30-Immortal-INTEL-PLUSPLUS.js
// PULSE OS — v30-Immortal-INTEL+++
// “THE BABY HEART / METABOLIC CELL + HEARTBEAT ENGINE (30++ LANES + CHUNK/PREWARM/BINARY)”
// FULL UPGRADE FROM v24-Immortal-INTEL-PLUSPLUS — NO REMOVALS, ALL SURFACES EXTENDED.
// ============================================================================
//
// ROLE (v30-Immortal-INTEL+++):
//   THE EARN HEARTBEAT — Pulse‑Earn’s deterministic metabolic heart/cell organ (30++).
//   • Acts as the Earn Heartbeat (Baby Heart) in the tri-heart mesh (Mom + Dad + Baby).
//   • Executes small, sandboxed, deterministic cell operations (computeWork).
//   • Emits v30‑IMMORTAL‑INTEL+++ presence/advantage/hints/compute/speed/experience surfaces.
//   • Emits cell compute + GPU/miner/offline profile (metadata-only).
//   • Emits loop + wave + band/binary fields as structural metadata.
//   • Heartbeat wrapper (pulseEarnHeartbeat) advances cycles + tri-heart + lane surfaces.
//   • Adds 30++ pulseIntelligence surfaces + deep factoring + multi-instance + lane hints.
//   • Adds v30 chunk/cache/prewarm/binary lane routing metadata for PulseBand.
//
// CONTRACT (v30-Immortal-INTEL+++):
//   • PURE COMPUTE + HEARTBEAT — no AI layers, no translation, no memory model.
//   • NO eval(), NO Function(), NO dynamic imports.
//   • NO user scripts, NO network calls, NO filesystem access.
//   • NEVER mutate job objects.
//   • Deterministic output only.
//   • Dual-band + binary + wave + lanes + presence metadata are structural-only.
//   • Heartbeat is metadata-only, no external side effects beyond globals.
// ============================================================================

const CELL_BANDS = {
  SYMBOLIC: "symbolic",
  BINARY: "binary"
};

function normalizeBand(band) {
  const b = String(band || CELL_BANDS.SYMBOLIC).toLowerCase();
  return b === CELL_BANDS.BINARY ? CELL_BANDS.BINARY : CELL_BANDS.SYMBOLIC;
}

// v30: lanes + clocks
const MAX_ADV_HISTORY = 64;
const MAX_LANES = 64;

const EARN_HEART_CONTEXT = {};

const healingState = {
  lastJobType: null,
  lastError: null,
  lastOutput: null,
  continuanceFallback: false,

  cycleCount: 0,
  lastCycleIndex: 0,
  executionState: "idle",

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
  lastPulseIntelligence24pp: null,

  totalJobs: 0,
  successfulJobs: 0,
  failedJobs: 0,
  cumulativeAdvantageScore: 0,
  lastAdvantageHistory: [],

  heartbeatCycles: 0,
  lastHeartbeatSpeedField: null,
  lastHeartbeatAdvantageField: null,
  lastHeartbeatPresenceField: null,
  lastHeartbeatExperienceField: null,
  lastHeartbeatCycleSignature: null,

  triHeartLiveness: null,
  triHeartAdvantage: null,
  triHeartSpeed: null,
  triHeartPresence: null,

  // v30++ lane + multiverse clocks
  lastLane: 0,
  lastLaneProfile: null,
  lastBinaryLaneField: null,
  lastWaveLaneField: null,
  lastUniverseTick: 0,
  lastSymbolicClock: 0,
  lastBinaryClock: 0,
  lastWaveClock: 0,

  // v30++ chunk/cache/prewarm lane routing
  lastChunkPlan: null,
  lastCachePlan: null,
  lastPrewarmPlan: null,

  ...EARN_HEART_CONTEXT
};

let universeTick = 0;
let symbolicClock = 0;
let binaryClock = 0;
let waveClock = 0;

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
// Deterministic Hash Helpers
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
// Signature Builders
// ============================================================================

function buildCellSignature(cycle, band) {
  return buildDualHashSignature(`CELL::${cycle}::${normalizeBand(band)}`);
}

function buildJobSignature(type, band) {
  return buildDualHashSignature(`JOBTYPE::${normalizeBand(band)}::${type}`);
}

function buildOutputSignature(output, band) {
  return buildDualHashSignature(
    `OUTPUT::${normalizeBand(band)}::${JSON.stringify(output).length}`
  );
}

function buildHeartbeatCycleSignature(cycle, lane) {
  return buildDualHashSignature(
    `EARN_HEARTBEAT_CYCLE_V30::${cycle}::LANE::${lane}`
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
// Presence / Advantage / Hints / Compute Profile
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

  const presenceSignature = buildDualHashSignature(
    `CELL_PRESENCE_V30PP::${presenceTier}::${meshPressureIndex}::${castleLoadLevel}`
  );

  return Object.freeze({
    presenceVersion: "v30-Immortal-INTEL-PLUSPLUS",
    presenceTier,
    presenceSignature,

    bandPresence:
      pf.bandPresence || gh.presenceContext?.bandPresence || "unknown",
    routerPresence:
      pf.routerPresence || gh.presenceContext?.routerPresence || "unknown",
    devicePresence:
      pf.devicePresence || gh.presenceContext?.devicePresence || "unknown",
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
    advantageVersion: "C-30.0-PLUSPLUS",
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
    chunkAggression:
      hintsField.chunkAggression ??
      hintsField.chunkHints.chunkAggression ??
      0,
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
    advantageVersion: "C-30.0-PLUSPLUS",
    jobType,
    band: b,

    symbolicPlanningBias: b === CELL_BANDS.SYMBOLIC ? 1 : 0,
    binaryCompressionBias: b === CELL_BANDS.BINARY ? 1 : 0,

    advantageScore: pa.advantageScore ?? 0,
    advantageBand: pa.advantageBand ?? "neutral",
    advantageTier: pa.advantageTier ?? 0,

    chunkAggression: cp.chunkAggression ?? 0,
    cachePriority: cp.cachePriority || "normal",
    prewarmNeeded: !!cp.prewarmNeeded,
    factoringSignal: cp.factoringSignal ?? 0,
    hotStateReuse: cp.hotStateReuse ?? true,
    multiInstanceBatching: cp.multiInstanceBatching ?? true,
    serverPlanCache: cp.serverPlanCache ?? true,
    serverBinaryReuse: cp.serverBinaryReuse ?? true,

    binaryPreferred: !!cp.binaryPreferred,
    symbolicPreferred: !!cp.symbolicPreferred,

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
    phase: (len * 3) % 16,
    band: b,
    mode: b === CELL_BANDS.BINARY ? "compression-wave" : "symbolic-wave"
  };
}

// ============================================================================
// Pulse Intelligence 30++
// ============================================================================

function computePulseIntelligence24pp({
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
    pulseIntelligenceVersion: "v30-Immortal-INTEL-PLUSPLUS",
    solvednessScore,
    factoringSignal: factoring ? "high" : "low",
    computeTier,
    readinessScore,
    band,
    advantageTier
  };
}

// ============================================================================
// Intelligent Compute Plan 30++ (adds lane + chunk/prewarm lane hints)
// ============================================================================

function chooseLane(presenceTier, advantageTier, computeTierHint) {
  const tierMap = {
    idle: 0,
    soft: 1,
    elevated: 2,
    high: 3,
    critical: 4
  };

  const presenceScore = tierMap[presenceTier] ?? 0;
  const advScore = Number(advantageTier || 0);
  const computeScore =
    computeTierHint === "highValue"
      ? 3
      : computeTierHint === "normal"
      ? 2
      : 1;

  const raw = presenceScore * 8 + advScore * 2 + computeScore;
  return raw % MAX_LANES;
}

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

  const lane = chooseLane(
    pressureTier,
    baseAdvantage.advantageTier,
    refinedComputeTier
  );

  const plan = {
    planVersion: "CELL-INTEL-30.0-PLUSPLUS",
    jobType,
    band: b,

    routeBand: preferBinary ? CELL_BANDS.BINARY : CELL_BANDS.SYMBOLIC,

    useGPU: preferGPU,
    useMiner: preferMiner,
    useOffline: preferOffline,

    computeTier: refinedComputeTier,

    shouldPrewarm: !!computeProfile.prewarmNeeded,
    cachePriority: computeProfile.cachePriority,
    chunkAggression: computeProfile.chunkAggression,

    factoringSignal: computeProfile.factoringSignal,
    hotStateReuse: computeProfile.hotStateReuse,
    multiInstanceBatching: computeProfile.multiInstanceBatching,
    serverPlanCache: computeProfile.serverPlanCache,
    serverBinaryReuse: computeProfile.serverBinaryReuse,

    lane,

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
// computeWork — v30 IMMORTAL-INTEL+++ Cell Execution
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
  healingState.lastLane = intelligentPlan.lane;
  healingState.lastLaneProfile = {
    lane: intelligentPlan.lane,
    presenceTier: presenceField.presenceTier,
    computeTier: intelligentPlan.computeTier,
    advantageTier: presenceAdvantageField.advantageTier
  };

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

      const pulseIntelligence24pp = computePulseIntelligence24pp({
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
      healingState.lastPulseIntelligence24pp = pulseIntelligence24pp;

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
        presenceField,
        hintsField,
        computeProfile,
        intelligentPlan,
        pulseIntelligence24pp
      };
    }

    healingState.executionState = "executing";
    const jobType = job.type;
    healingState.lastJobType = jobType;
    healingState.lastJobSignature = buildJobSignature(jobType, band);

    let output;
    if (jobType === "text.transform") {
      output = textTransform(job.payload);
    } else if (jobType === "math.compute") {
      output = mathCompute(job.payload);
    } else if (jobType === "data.aggregate") {
      output = dataAggregate(job.payload);
    } else if (jobType === "json.transform") {
      output = jsonTransform(job.payload);
    } else {
      throw new Error(`Unknown job type: ${jobType}`);
    }

    healingState.executionState = "returning";
    healingState.lastOutput = output;
    healingState.successfulJobs += 1;

    const healthScore = computeHealthScore();
    const tier = classifyDegradationTier(healthScore);
    const advantageField = buildAdvantageField(jobType, band, {
      computeProfile,
      presenceAdvantageField
    });
    const diagnostics = buildDiagnostics(jobType, band, healthScore, tier);
    const loopField = buildLoopField(healingState.cycleCount, band);
    const waveField = buildWaveField(jobType, band);

    const pulseIntelligence24pp = computePulseIntelligence24pp({
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
    healingState.lastPulseIntelligence24pp = pulseIntelligence24pp;

    healingState.lastCellSignature = buildCellSignature(
      healingState.cycleCount,
      band
    );
    healingState.lastOutputSignature = buildOutputSignature(output, band);

    recordAdvantageMemory(jobType, band, advantageField);

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
      jobSignature: healingState.lastJobSignature,
      outputSignature: healingState.lastOutputSignature,
      presenceField,
      hintsField,
      computeProfile,
      intelligentPlan,
      pulseIntelligence24pp
    };
  } catch (err) {
    healingState.lastError = String(err && err.message ? err.message : err);
    healingState.executionState = "error";
    healingState.failedJobs += 1;

    const healthScore = computeHealthScore();
    const tier = classifyDegradationTier(healthScore);
    const advantageField = buildAdvantageField("error", band, {
      computeProfile,
      presenceAdvantageField
    });
    const diagnostics = buildDiagnostics("error", band, healthScore, tier);
    const loopField = buildLoopField(healingState.cycleCount, band);
    const waveField = buildWaveField("error", band);

    const pulseIntelligence24pp = computePulseIntelligence24pp({
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
    healingState.lastPulseIntelligence24pp = pulseIntelligence24pp;

    healingState.lastCellSignature = buildCellSignature(
      healingState.cycleCount,
      band
    );

    recordAdvantageMemory("error", band, advantageField);

    return {
      success: false,
      error: healingState.lastError,
      durationCycles: healingState.cycleCount,
      band,
      healthScore,
      tier,
      advantageField,
      diagnostics,
      loopField,
      waveField,
      cellSignature: healingState.lastCellSignature,
      presenceField,
      hintsField,
      computeProfile,
      intelligentPlan,
      pulseIntelligence24pp
    };
  }
}

// ============================================================================
// Heartbeat wrapper — pulseEarnHeartbeat (tri-heart + lanes + v30 surfaces)
// ============================================================================

const MOM_PULSE_KEY = "PulseProxyHeartbeatLastBeatAt";
const DAD_PULSE_KEY = "PulseAIHeartbeatLastBeatAt";

function buildMomPulseSurface() {
  let last = 0;
  try {
    last = globalThis?.[MOM_PULSE_KEY] || 0;
  } catch (_) {
    last = 0;
  }
  const alive = !!last;
  return {
    momPulseAlive: alive,
    momPulseLastBeatAt: last,
    momPulseFallbackState: alive ? "available" : "silent"
  };
}

function buildDadPulseSurface() {
  let last = 0;
  try {
    last = globalThis?.[DAD_PULSE_KEY] || 0;
  } catch (_) {
    last = 0;
  }
  const alive = !!last;
  return {
    dadPulseAlive: alive,
    dadPulseLastBeatAt: last,
    dadPulseFallbackState: alive ? "available" : "silent"
  };
}

function buildSelfPulseSurface(workerId, band, presenceTier) {
  const wid = String(workerId || "0");
  let acc = 0;
  for (let i = 0; i < wid.length; i++) {
    acc += wid.charCodeAt(i) * (i + 1);
  }

  const tierWeight =
    presenceTier === "critical" ? 5 :
    presenceTier === "high" ? 4 :
    presenceTier === "elevated" ? 3 :
    presenceTier === "soft" ? 2 :
    1;

  const bandWeight = band === "binary" ? 7 : 3;

  const beatIndex = (healingState.heartbeatCycles * tierWeight + acc + bandWeight) % 11;
  const selfBeatActive = beatIndex === 0;

  return {
    selfPulseAlive: true,
    selfPulseBeatIndex: beatIndex,
    selfPulseActive: selfBeatActive,
    selfPulseFallbackState: selfBeatActive ? "self-beat" : "idle"
  };
}

function selectActivePulseSource(momPulseSurface, dadPulseSurface, selfPulseSurface) {
  if (momPulseSurface.momPulseAlive) return "mom";
  if (dadPulseSurface.dadPulseAlive) return "dad";
  if (selfPulseSurface.selfPulseActive) return "self";
  return "self";
}

function buildSpeedFieldFromComputeProfile(computeProfile, intelligentPlan) {
  const tier = intelligentPlan.computeTier || computeProfile.computeTierHint || "normal";
  const lane = intelligentPlan.lane ?? 0;

  const tierScore =
    tier === "highValue"
      ? 1.0
      : tier === "normal"
      ? 0.7
      : tier === "lowPriority"
      ? 0.4
      : 0.2;

  const laneScore = Math.max(0, Math.min(1, lane / (MAX_LANES - 1 || 1)));

  const speedScore = Math.max(
    0,
    Math.min(1, tierScore * 0.7 + laneScore * 0.3)
  );

  return {
    speedVersion: "v30-Immortal-INTEL-PLUSPLUS",
    speedScore,
    lane,
    computeTier: tier
  };
}

function buildExperienceFieldFromHistory() {
  const total = healingState.totalJobs || 0;
  const success = healingState.successfulJobs || 0;
  const fail = healingState.failedJobs || 0;

  const load = Math.max(
    0,
    Math.min(1, total > 0 ? (success + fail) / (success + fail + 10) : 0)
  );

  const stability =
    total > 0 ? Math.max(0, Math.min(1, success / total)) : 1;

  return {
    experienceVersion: "v30-Immortal-INTEL-PLUSPLUS",
    totalJobs: total,
    successfulJobs: success,
    failedJobs: fail,
    load,
    stability
  };
}

function buildTriHeartSurfaces({
  momPulseSurface,
  dadPulseSurface,
  selfPulseSurface,
  speedField,
  presenceField,
  advantageField
}) {
  const momAlive = !!momPulseSurface.momPulseAlive;
  const dadAlive = !!dadPulseSurface.dadPulseAlive;
  const selfAlive = !!selfPulseSurface.selfPulseAlive;

  const livenessScore =
    (momAlive ? 0.4 : 0) +
    (dadAlive ? 0.4 : 0) +
    (selfAlive ? 0.2 : 0);

  const triHeartLiveness = Math.max(0, Math.min(1, livenessScore));

  const triHeartAdvantage =
    (advantageField.advantageScore || 0) *
    (1 + (advantageField.advantageTier || 0) * 0.1);

  const triHeartSpeed = speedField.speedScore || 0;
  const triHeartPresence =
    presenceField.presenceTier === "critical"
      ? 1
      : presenceField.presenceTier === "high"
      ? 0.8
      : presenceField.presenceTier === "elevated"
      ? 0.6
      : presenceField.presenceTier === "soft"
      ? 0.4
      : 0.2;

  return {
    triHeartLiveness,
    triHeartAdvantage,
    triHeartSpeed,
    triHeartPresence
  };
}

export function pulseEarnHeartbeat({
  workerId,
  band,
  presenceTier,
  globalHints = {},
  nervousPresence = {},
  nervousAdvantage = {},
  nervousHints = {}
} = {}) {
  healingState.heartbeatCycles++;
  universeTick++;
  symbolicClock++;
  binaryClock += 1;
  waveClock = (waveClock + 3) % 1024;

  healingState.lastUniverseTick = universeTick;
  healingState.lastSymbolicClock = symbolicClock;
  healingState.lastBinaryClock = binaryClock;
  healingState.lastWaveClock = waveClock;

  const normalizedBand = normalizeBand(band);
  const context = {
    globalHints,
    presenceField: nervousPresence,
    meshSignals: nervousPresence.meshSignals || {},
    castleSignals: nervousPresence.castleSignals || {},
    serverAdvantageHints: nervousAdvantage.serverAdvantageHints || {},
    computeContext: globalHints.computeContext || {}
  };

  const presenceField = buildPresenceFieldFromContext(context);
  const presenceAdvantageField = buildAdvantageFieldFromHints(context);
  const hintsField = buildHintsFieldFromHints(context);
  const computeProfile = buildComputeProfile({ band: normalizedBand, context });
  const intelligentPlan = buildIntelligentComputePlan({
    job: { type: "heartbeat", payload: {} },
    band: normalizedBand,
    presenceField,
    presenceAdvantageField,
    computeProfile
  });

  healingState.lastPresenceField = presenceField;
  healingState.lastPresenceAdvantageField = presenceAdvantageField;
  healingState.lastHintsField = hintsField;
  healingState.lastComputeProfile = computeProfile;
  healingState.lastLane = intelligentPlan.lane;
  healingState.lastLaneProfile = {
    lane: intelligentPlan.lane,
    presenceTier: presenceField.presenceTier,
    computeTier: intelligentPlan.computeTier,
    advantageTier: presenceAdvantageField.advantageTier
  };

  const momPulseSurface = buildMomPulseSurface();
  const dadPulseSurface = buildDadPulseSurface();
  const selfPulseSurface = buildSelfPulseSurface(
    workerId,
    normalizedBand,
    presenceTier || presenceField.presenceTier
  );

  const activePulseSource = selectActivePulseSource(
    momPulseSurface,
    dadPulseSurface,
    selfPulseSurface
  );

  const speedField = buildSpeedFieldFromComputeProfile(
    computeProfile,
    intelligentPlan
  );
  const experienceField = buildExperienceFieldFromHistory();

  const advantageField = buildAdvantageField("heartbeat", normalizedBand, {
    computeProfile,
    presenceAdvantageField
  });

  const pulseIntelligence24pp = computePulseIntelligence24pp({
    advantageField,
    presenceField,
    factoringSignal: computeProfile.factoringSignal,
    band: normalizedBand
  });

  const triHeart = buildTriHeartSurfaces({
    momPulseSurface,
    dadPulseSurface,
    selfPulseSurface,
    speedField,
    presenceField,
    advantageField
  });

  healingState.lastHeartbeatSpeedField = speedField;
  healingState.lastHeartbeatAdvantageField = advantageField;
  healingState.lastHeartbeatPresenceField = presenceField;
  healingState.lastHeartbeatExperienceField = experienceField;
  healingState.lastPulseIntelligence24pp = pulseIntelligence24pp;

  healingState.triHeartLiveness = triHeart.triHeartLiveness;
  healingState.triHeartAdvantage = triHeart.triHeartAdvantage;
  healingState.triHeartSpeed = triHeart.triHeartSpeed;
  healingState.triHeartPresence = triHeart.triHeartPresence;

  const heartbeatCycleSignature = buildHeartbeatCycleSignature(
    healingState.heartbeatCycles,
    intelligentPlan.lane
  );
  healingState.lastHeartbeatCycleSignature = heartbeatCycleSignature;

  const binaryLaneField = {
    lane: intelligentPlan.lane,
    parity: intelligentPlan.lane % 2,
    density: intelligentPlan.lane,
    shiftDepth: Math.max(
      0,
      Math.floor(Math.log2(intelligentPlan.lane || 1))
    )
  };

  const waveLaneField = {
    lane: intelligentPlan.lane,
    amplitude: intelligentPlan.lane % 11,
    wavelength: healingState.heartbeatCycles,
    phase:
      (healingState.heartbeatCycles +
        intelligentPlan.lane +
        (presenceField.meshPressureIndex || 0)) % 16
  };

  healingState.lastBinaryLaneField = binaryLaneField;
  healingState.lastWaveLaneField = waveLaneField;

  const chunkPlan = {
    enabled: !!computeProfile.prewarmNeeded || !!computeProfile.chunkAggression,
    strategy: hintsField.chunkHints.strategy || "default",
    aggression: computeProfile.chunkAggression || 0,
    lane: intelligentPlan.lane
  };

  const cachePlan = {
    enabled: true,
    strategy: hintsField.cacheHints.strategy || "default",
    priority: computeProfile.cachePriority || "normal",
    lane: intelligentPlan.lane
  };

  const prewarmPlan = {
    enabled: !!computeProfile.prewarmNeeded,
    strategy: hintsField.prewarmHints.strategy || "default",
    band: computeProfile.routeBand || normalizedBand,
    lane: intelligentPlan.lane
  };

  healingState.lastChunkPlan = chunkPlan;
  healingState.lastCachePlan = cachePlan;
  healingState.lastPrewarmPlan = prewarmPlan;

  return {
    heartbeatVersion: "v30-Immortal-INTEL-PLUSPLUS",
    cycle: healingState.heartbeatCycles,
    band: normalizedBand,
    lane: intelligentPlan.lane,

    presenceField,
    advantageField,
    hintsField,
    computeProfile,
    intelligentPlan,

    speedField,
    experienceField,
    pulseIntelligence: pulseIntelligence24pp,

    triHeartLiveness: triHeart.triHeartLiveness,
    triHeartAdvantage: triHeart.triHeartAdvantage,
    triHeartSpeed: triHeart.triHeartSpeed,
    triHeartPresence: triHeart.triHeartPresence,

    momPulseSurface,
    dadPulseSurface,
    selfPulseSurface,
    activePulseSource,

    binaryLaneField,
    waveLaneField,

    chunkPlan,
    cachePlan,
    prewarmPlan,

    cycleSignature: heartbeatCycleSignature,
    universeTick,
    symbolicClock,
    binaryClock,
    waveClock
  };
}

// ============================================================================
// PUBLIC: Heartbeat Healing State
// ============================================================================

export function getPulseEarnHeartbeatHealingState() {
  return { ...healingState };
}
