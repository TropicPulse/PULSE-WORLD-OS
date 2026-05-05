// ============================================================================
// FILE: tropic-pulse-functions/PULSE-WORLD/PULSE-EARN/PulseEarnImmuneSystem-v16-Immortal-INTEL.js
// LAYER: THE IMMUNE SYSTEM (v16-Immortal-INTEL + Dual-Band + Binary-First + Wave + Presence)
// (Subsystem Doctor + Drift Diagnostician + Deterministic Repair Engine + Presence/INTEL Telemetry)
// ============================================================================
//
// ROLE (v16-Immortal-INTEL):
//   THE IMMUNE SYSTEM — Pulse‑Earn’s subsystem physician.
//   • Reads vitals across all Earn subsystems (immune surveillance).
//   • Detects drift, errors, inconsistencies (pathogen detection).
//   • Prescribes deterministic repairs (immune response).
//   • Maintains subsystem health records (immune memory).
//   • Emits v16‑Immortal‑INTEL signatures + diagnostics + presence/advantage/hints surfaces.
//   • Binary‑first immune surfaces, wave‑aware, presence‑aware, INTEL‑aware.
//
// CONTRACT (v16-Immortal-INTEL):
//   • PURE HEALING — no AI layers, no translation, no LLM inference.
//   • READ‑ONLY except deterministic repair actions.
//   • NO eval(), NO Function(), NO dynamic imports.
//   • NO executing user code.
//   • NO filesystem, NO timestamps, NO async.
//   • Deterministic drift detection only.
//   • Dual-band + binary + wave + presence metadata are structural-only.
//   • Binary-first: binary field is the primary immune surface, wave is secondary.
//   • computeHashIntelligence is primary; computeHash is deterministic fallback.
// ============================================================================

/*
AI_EXPERIENCE_META = {
  identity: "PulseEarnImmuneSystem",
  version: "v16-Immortal-INTEL",
  layer: "earn_immune",
  role: "earn_immune_system",
  lineage: "PulseEarnImmuneSystem-v11 → v12.3 → v13.0-Presence-Immortal → v14-Immortal → v16-Immortal-INTEL",

  evo: {
    earnImmune: true,
    anomalyDetection: true,
    jobRejection: true,
    toxinFilter: true,
    dualBand: true,
    symbolicPrimary: true,
    binaryAware: true,
    binaryFirst: true,

    deterministic: true,
    driftProof: true,
    pureCompute: true,
    zeroMutationOfInput: true,
    zeroNetwork: true,
    zeroFilesystem: true,

    presenceAware: true,
    advantageAware: true,
    hintsAware: true,
    meshAware: true,
    castleAware: true,
    regionAware: true,

    immuneComputeProfile: true,
    immunePressureProfile: true,
    immuneIntelSignatures: true,
    computeHashIntelligence: true,

    zeroAI: true,
    zeroUserCode: true,
    zeroAsync: true
  },

  contract: {
    always: [
      "PulseEarnLymphNodes",
      "PulseEarnMetabolism",
      "PulseEarnHeart",
      "PulseEarnGeneticMemory"
    ],
    never: [
      "safeRoute",
      "fetchViaCNS"
    ]
  }
}
*/

export const PulseEarnImmuneSystemMeta = Object.freeze({
  layer: "PulseEarnImmuneSystem",
  role: "EARN_IMMUNE_ORGAN",
  version: "v16-Immortal-INTEL",
  identity: "PulseEarnImmuneSystem-v16-Immortal-INTEL",

  guarantees: Object.freeze({
    deterministic: true,
    noRandomness: true,
    noRealTime: true,
    noExternalIO: true,
    pureHealing: true,
    driftDetectionOnly: true,
    dualBandAware: true,
    binaryAware: true,
    binaryFirst: true,
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
    zeroAsync: true
  }),

  contract: Object.freeze({
    input: [
      "EarnSubsystemHealingStates",
      "DualBandContext",
      "BinaryField",
      "WaveField",
      "GlobalHintsPresenceField"
    ],
    output: [
      "ImmuneDiagnostics",
      "ImmuneSignatures",
      "DeterministicRepairActions",
      "ImmuneHealingState"
    ]
  }),

  lineage: Object.freeze({
    root: "PulseOS-v11-Evo",
    parent: "PulseEarn-v16-Immortal-INTEL",
    ancestry: [
      "PulseEarnImmuneSystem-v9",
      "PulseEarnImmuneSystem-v10",
      "PulseEarnImmuneSystem-v11",
      "PulseEarnImmuneSystem-v11-Evo",
      "PulseEarnImmuneSystem-v12.3-Presence-Evo+",
      "PulseEarnImmuneSystem-v13.0-Presence-Immortal"
    ]
  }),

  bands: Object.freeze({
    supported: ["symbolic", "binary"],
    default: "binary",
    behavior: "metadata-only",
    priority: "binary-first"
  }),

  architecture: Object.freeze({
    pattern: "A-B-A",
    baseline: "deterministic drift detection across Earn subsystems",
    adaptive: "binary-first immune surfaces + wave + presence/advantage/hints metadata + INTEL signatures",
    return: "deterministic repair actions + immune diagnostics"
  })
});

// ============================================================================
// IMMUNE CONTEXT METADATA (v16-Immortal-INTEL + Dual-Band + Binary-First)
// ============================================================================

export const PULSE_EARN_IMMUNE_CONTEXT = Object.freeze({
  layer: "PulseEarnImmuneSystem-v16-Immortal-INTEL",
  role: "IMMUNE_PHYSICIAN",
  purpose: "Diagnose and repair drift across Earn subsystems",
  context: "Immune surveillance + deterministic healing",
  band: "dualband",
  highway: "binary_first_dualband",
  intent: "pulse_earn_subsystem_healing",
  evo: Object.freeze({
    dualMode: true,
    dualBand: true,
    binaryAware: true,
    symbolicAware: true,
    localAware: true,
    internetAware: true,

    driftProof: true,
    deterministicField: true,
    unifiedAdvantageField: true,
    advantageCascadeAware: true,
    pulseEfficiencyAware: true,
    healerStackAware: true,
    loopTheoryAware: true,
    fpinTheoryAware: true,
    intentFieldAware: true,
    futureEvolutionReady: true,
    multiInstanceReady: true,

    zeroNetwork: true,
    zeroBackend: true,
    zeroTiming: true,
    zeroAsync: true,
    zeroAI: true,
    zeroUserCode: true
  })
});

// ============================================================================
// Imports — subsystem vitals (healing state providers)
// ============================================================================

import { getEarnEngineHealingState } from "./PulseEarnMuscleSystem.js";
import { getPulseEarnHeartHealingState } from "./PulseEarnHeart.js";
import { getPulseEarnMetabolismHealingState } from "./PulseEarnMetabolism.js";
import { getPulseEarnLymphHealingState } from "./PulseEarnLymphNodes.js";
import {
  getPulseEarnGeneticMemoryHealingState,
  synthesizePulseEarnGene,
  writePulseEarnGene
} from "./PulseEarnGeneticMemory.js";
import { getPulseEarnCellHealingState } from "./PulseEarnCell.js";
import { getPulseEarnNervousSystemHealingState } from "./PulseEarnNervousSystem.js";

// ============================================================================
// Immune State — medical chart (immune memory)
// ============================================================================

const immuneState = {
  lastCheck: null,
  lastRepair: null,
  lastError: null,
  cycleCount: 0,
  status: "healthy", // healthy | warning | error | repairing
  lastReport: null,
  lastCycleIndex: null,

  lastImmuneSignature: null,
  lastDriftSignature: null,
  lastRepairSignature: null,

  // Dual-Band + Binary + Wave
  lastBand: "symbolic",
  lastBandSignature: null,
  lastBinaryField: null,
  lastWaveField: null,

  // Presence / Advantage / Hints / Profiles
  lastPresenceField: null,
  lastAdvantageField: null,
  lastHintsField: null,
  lastImmunePressureProfile: null,
  lastBinaryProfile: null,
  lastWaveProfile: null,
  lastImmuneComputeProfile: null,

  ...PULSE_EARN_IMMUNE_CONTEXT
};

// Deterministic immune cycle counter
let immuneCycle = 0;

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

function normalizeBand(band) {
  const b = String(band || "symbolic").toLowerCase();
  return b === "binary" ? "binary" : "symbolic";
}

// ============================================================================
// Signature Builders (INTEL-first, classic as fallback)
// ============================================================================

function buildImmuneSignature(cycle, band, pressureTier, errorCount) {
  try {
    return computeHashIntelligence({
      organ: "PulseEarnImmuneSystem",
      cycle,
      band,
      pressureTier,
      errorCount
    });
  } catch (_) {
    return computeHash(
      `IMMUNE::${cycle}::${band}::PTIER:${pressureTier}::ERRS:${errorCount}`
    );
  }
}

function buildDriftSignature(report) {
  try {
    return computeHashIntelligence({
      engineError: report.engine.lastError || "OK",
      runtimeError: report.runtime.lastError || "OK",
      workerError: report.worker.lastError || "OK",
      submissionError: report.submission.lastError || "OK",
      packetsError: report.packets.lastError || "OK",
      cellError: report.cell.lastError || "OK",
      connectorError: report.connector.lastError || "OK"
    });
  } catch (_) {
    return computeHash(
      `DRIFT::${report.engine.lastError || "OK"}::${report.worker?.lastError || "OK"}`
    );
  }
}

function buildRepairSignature(key, cycle) {
  try {
    return computeHashIntelligence({
      organ: "PulseEarnImmuneSystem",
      mode: "repair",
      key: key || "NONE",
      cycle
    });
  } catch (_) {
    return computeHash(`REPAIR::${key || "NONE"}::${cycle}`);
  }
}

// ============================================================================
// Presence / Advantage / Hints Surfaces (aggregated across subsystems + global)
// ============================================================================

function safePresenceFrom(subsystem) {
  return (
    subsystem?.lastPresenceField ||
    subsystem?.presenceField ||
    {}
  );
}

function safeAdvantageFrom(subsystem) {
  return (
    subsystem?.lastAdvantageField ||
    subsystem?.advantageField ||
    {}
  );
}

function safeHintsFrom(subsystem) {
  return (
    subsystem?.lastHintsField ||
    subsystem?.hintsField ||
    {}
  );
}

function buildPresenceField(report, globalHints = {}) {
  const engineP = safePresenceFrom(report.engine);
  const runtimeP = safePresenceFrom(report.runtime);
  const workerP = safePresenceFrom(report.worker);
  const submissionP = safePresenceFrom(report.submission);
  const packetsP = safePresenceFrom(report.packets);
  const cellP = safePresenceFrom(report.cell);
  const connectorP = safePresenceFrom(report.connector);

  const gh = globalHints.presenceContext || {};
  const mesh = globalHints.meshSignals || {};
  const castle = globalHints.castleSignals || {};
  const region = globalHints.regionContext || {};

  const meshPressureIndex =
    engineP.meshPressureIndex ||
    runtimeP.meshPressureIndex ||
    workerP.meshPressureIndex ||
    submissionP.meshPressureIndex ||
    packetsP.meshPressureIndex ||
    cellP.meshPressureIndex ||
    connectorP.meshPressureIndex ||
    mesh.meshPressureIndex ||
    0;

  const castleLoadLevel =
    engineP.castleLoadLevel ||
    runtimeP.castleLoadLevel ||
    workerP.castleLoadLevel ||
    submissionP.castleLoadLevel ||
    packetsP.castleLoadLevel ||
    cellP.castleLoadLevel ||
    connectorP.castleLoadLevel ||
    castle.loadLevel ||
    0;

  const meshStrength =
    engineP.meshStrength ||
    runtimeP.meshStrength ||
    workerP.meshStrength ||
    submissionP.meshStrength ||
    packetsP.meshStrength ||
    cellP.meshStrength ||
    connectorP.meshStrength ||
    mesh.meshStrength ||
    0;

  const pressure = meshPressureIndex + castleLoadLevel;
  let presenceTier = "idle";
  if (pressure >= 180) presenceTier = "critical";
  else if (pressure >= 120) presenceTier = "high";
  else if (pressure >= 60) presenceTier = "elevated";
  else if (pressure > 0) presenceTier = "soft";

  const presenceSignature = computeHashIntelligence({
    version: "v16-Immortal-INTEL",
    presenceTier,
    meshPressureIndex,
    castleLoadLevel
  });

  return {
    presenceVersion: "v16-Immortal-INTEL",
    presenceTier,
    presenceSignature,

    bandPresence:
      engineP.bandPresence ||
      runtimeP.bandPresence ||
      workerP.bandPresence ||
      submissionP.bandPresence ||
      packetsP.bandPresence ||
      cellP.bandPresence ||
      connectorP.bandPresence ||
      gh.bandPresence ||
      "unknown",
    routerPresence:
      engineP.routerPresence ||
      runtimeP.routerPresence ||
      workerP.routerPresence ||
      submissionP.routerPresence ||
      packetsP.routerPresence ||
      cellP.routerPresence ||
      connectorP.routerPresence ||
      gh.routerPresence ||
      "unknown",
    devicePresence:
      engineP.devicePresence ||
      runtimeP.devicePresence ||
      workerP.devicePresence ||
      submissionP.devicePresence ||
      packetsP.devicePresence ||
      cellP.devicePresence ||
      connectorP.devicePresence ||
      gh.devicePresence ||
      "unknown",
    meshPresence:
      engineP.meshPresence ||
      runtimeP.meshPresence ||
      workerP.meshPresence ||
      submissionP.meshPresence ||
      packetsP.meshPresence ||
      cellP.meshPresence ||
      connectorP.meshPresence ||
      mesh.meshStrength ||
      "unknown",
    castlePresence:
      engineP.castlePresence ||
      runtimeP.castlePresence ||
      workerP.castlePresence ||
      submissionP.castlePresence ||
      packetsP.castlePresence ||
      cellP.castlePresence ||
      connectorP.castlePresence ||
      castle.castlePresence ||
      "unknown",
    regionPresence:
      engineP.regionPresence ||
      runtimeP.regionPresence ||
      workerP.regionPresence ||
      submissionP.regionPresence ||
      packetsP.regionPresence ||
      cellP.regionPresence ||
      connectorP.regionPresence ||
      region.regionTag ||
      "unknown",
    regionId:
      engineP.regionId ||
      runtimeP.regionId ||
      workerP.regionId ||
      submissionP.regionId ||
      packetsP.regionId ||
      cellP.regionId ||
      connectorP.regionId ||
      region.regionId ||
      "unknown-region",
    castleId:
      engineP.castleId ||
      runtimeP.castleId ||
      workerP.castleId ||
      submissionP.castleId ||
      packetsP.castleId ||
      cellP.castleId ||
      connectorP.castleId ||
      castle.castleId ||
      "unknown-castle",

    castleLoadLevel,
    meshStrength,
    meshPressureIndex
  };
}

function buildAdvantageField(report, globalHints = {}) {
  const engineA = safeAdvantageFrom(report.engine);
  const runtimeA = safeAdvantageFrom(report.runtime);
  const workerA = safeAdvantageFrom(report.worker);
  const submissionA = safeAdvantageFrom(report.submission);
  const packetsA = safeAdvantageFrom(report.packets);
  const cellA = safeAdvantageFrom(report.cell);
  const connectorA = safeAdvantageFrom(report.connector);
  const ghAdv = globalHints.advantageContext || {};

  return {
    advantageVersion: "C-16.0",
    advantageScore:
      engineA.advantageScore ??
      runtimeA.advantageScore ??
      workerA.advantageScore ??
      submissionA.advantageScore ??
      packetsA.advantageScore ??
      cellA.advantageScore ??
      connectorA.advantageScore ??
      ghAdv.score ??
      0,
    advantageBand:
      engineA.advantageBand ??
      runtimeA.advantageBand ??
      workerA.advantageBand ??
      submissionA.advantageBand ??
      packetsA.advantageBand ??
      cellA.advantageBand ??
      connectorA.advantageBand ??
      ghAdv.band ??
      "neutral",
    advantageTier:
      engineA.advantageTier ??
      runtimeA.advantageTier ??
      workerA.advantageTier ??
      submissionA.advantageTier ??
      packetsA.advantageTier ??
      cellA.advantageTier ??
      connectorA.advantageTier ??
      ghAdv.tier ??
      0
  };
}

function buildHintsField(report, globalHints = {}) {
  const engineH = safeHintsFrom(report.engine);
  const runtimeH = safeHintsFrom(report.runtime);
  const workerH = safeHintsFrom(report.worker);
  const submissionH = safeHintsFrom(report.submission);
  const packetsH = safeHintsFrom(report.packets);
  const cellH = safeHintsFrom(report.cell);
  const connectorH = safeHintsFrom(report.connector);

  const gh = {
    fallbackBandLevel: globalHints.fallbackBandLevel ?? 0,
    chunkHints: globalHints.chunkHints || {},
    cacheHints: globalHints.cacheHints || {},
    prewarmHints: globalHints.prewarmHints || {},
    coldStartHints: globalHints.coldStartHints || {}
  };

  const mergedChunkHints = {
    ...gh.chunkHints,
    ...(engineH.chunkHints || {}),
    ...(runtimeH.chunkHints || {}),
    ...(workerH.chunkHints || {}),
    ...(submissionH.chunkHints || {}),
    ...(packetsH.chunkHints || {}),
    ...(cellH.chunkHints || {}),
    ...(connectorH.chunkHints || {})
  };

  const mergedCacheHints = {
    ...gh.cacheHints,
    ...(engineH.cacheHints || {}),
    ...(runtimeH.cacheHints || {}),
    ...(workerH.cacheHints || {}),
    ...(submissionH.cacheHints || {}),
    ...(packetsH.cacheHints || {}),
    ...(cellH.cacheHints || {}),
    ...(connectorH.cacheHints || {})
  };

  const mergedPrewarmHints = {
    ...gh.prewarmHints,
    ...(engineH.prewarmHints || {}),
    ...(runtimeH.prewarmHints || {}),
    ...(workerH.prewarmHints || {}),
    ...(submissionH.prewarmHints || {}),
    ...(packetsH.prewarmHints || {}),
    ...(cellH.prewarmHints || {}),
    ...(connectorH.prewarmHints || {})
  };

  const mergedColdStartHints = {
    ...gh.coldStartHints,
    ...(engineH.coldStartHints || {}),
    ...(runtimeH.coldStartHints || {}),
    ...(workerH.coldStartHints || {}),
    ...(submissionH.coldStartHints || {}),
    ...(packetsH.coldStartHints || {}),
    ...(cellH.coldStartHints || {}),
    ...(connectorH.coldStartHints || {})
  };

  const fallbackBandLevel =
    engineH.fallbackBandLevel ??
    runtimeH.fallbackBandLevel ??
    workerH.fallbackBandLevel ??
    submissionH.fallbackBandLevel ??
    packetsH.fallbackBandLevel ??
    cellH.fallbackBandLevel ??
    connectorH.fallbackBandLevel ??
    gh.fallbackBandLevel ??
    0;

  return {
    fallbackBandLevel,
    chunkHints: mergedChunkHints,
    cacheHints: mergedCacheHints,
    prewarmHints: mergedPrewarmHints,
    coldStartHints: mergedColdStartHints
  };
}

// ============================================================================
// Immune Compute Profile (metadata-only, no performance math)
// ============================================================================

function normalizeCachePriority(p) {
  if (!p) return "normal";
  const v = String(p).toLowerCase();
  if (v === "critical" || v === "high" || v === "low") return v;
  return "normal";
}

function buildImmuneComputeProfile(derivedBand, hintsField) {
  const chunkAggression = hintsField.chunkHints.chunkAggression ?? 0;
  const prewarmNeeded = !!hintsField.prewarmHints.shouldPrewarm;
  const cachePriority = normalizeCachePriority(hintsField.cacheHints.priority);
  const coldStartRisk = !!hintsField.coldStartHints.coldStartRisk;

  return {
    routeBand: derivedBand,
    fallbackBandLevel: hintsField.fallbackBandLevel,
    chunkAggression,
    prewarmNeeded,
    cachePriority,
    coldStartRisk
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
// runHealthCheck() — immune surveillance scan (presence-aware, binary-first)
// ============================================================================

export function runHealthCheck(globalHints = {}) {
  immuneCycle++;
  immuneState.cycleCount++;
  immuneState.lastCycleIndex = immuneCycle;

  try {
    const report = {
      engine: getEarnEngineHealingState(),
      runtime: getPulseEarnHeartHealingState(),
      worker: getPulseEarnMetabolismHealingState(),
      submission: getPulseEarnLymphHealingState(),
      packets: getPulseEarnGeneticMemoryHealingState(),
      cell: getPulseEarnCellHealingState(),
      connector: getPulseEarnNervousSystemHealingState(),
      cycleIndex: immuneCycle,
      ...PULSE_EARN_IMMUNE_CONTEXT
    };

    immuneState.lastReport = report;

    const driftDetected =
      report.engine.lastError ||
      report.runtime.lastError ||
      report.worker.lastError ||
      report.submission.lastError ||
      report.packets.lastError ||
      report.cell.lastError ||
      report.connector.lastError;

    const derivedBand = normalizeBand(
      report.runtime.lastBand ||
      report.packets.lastBand ||
      "symbolic"
    );
    immuneState.lastBand = derivedBand;
    immuneState.lastBandSignature = computeHashIntelligence({
      organ: "PulseEarnImmuneSystem",
      band: derivedBand,
      cycle: immuneCycle
    });

    const errorFlags = [
      report.engine.lastError,
      report.runtime.lastError,
      report.worker.lastError,
      report.submission.lastError,
      report.packets.lastError,
      report.cell.lastError,
      report.connector.lastError
    ];
    const errorCount = errorFlags.reduce(
      (acc, e) => acc + (e ? 1 : 0),
      0
    );

    const presenceField = buildPresenceField(report, globalHints);
    const advantageField = buildAdvantageField(report, globalHints);
    const hintsField = buildHintsField(report, globalHints);

    const pressureTier = classifyPressureTier(presenceField, errorCount);

    const immuneComputeProfile = buildImmuneComputeProfile(
      derivedBand,
      hintsField
    );

    immuneState.lastPresenceField = presenceField;
    immuneState.lastAdvantageField = advantageField;
    immuneState.lastHintsField = hintsField;
    immuneState.lastImmuneComputeProfile = immuneComputeProfile;

    const surface =
      errorCount * 100 +
      immuneCycle +
      (presenceField.meshPressureIndex || 0) +
      (presenceField.castleLoadLevel || 0);

    const binaryField = {
      binaryImmuneSignature: computeHashIntelligence({
        organ: "PulseEarnImmuneSystem",
        surface,
        errorCount,
        cycle: immuneCycle,
        meshPressureIndex: presenceField.meshPressureIndex,
        castleLoadLevel: presenceField.castleLoadLevel
      }),
      binarySurfaceSignature: computeHashIntelligence({
        organ: "PulseEarnImmuneSystem",
        mode: "surface",
        surface,
        cycle: immuneCycle
      }),
      binarySurface: {
        errorCount,
        cycle: immuneCycle,
        meshPressureIndex: presenceField.meshPressureIndex,
        castleLoadLevel: presenceField.castleLoadLevel,
        surface
      },
      parity: surface % 2 === 0 ? 0 : 1,
      density: errorCount,
      shiftDepth: Math.max(0, Math.floor(Math.log2(surface || 1)))
    };
    immuneState.lastBinaryField = binaryField;

    const waveField = {
      amplitude: errorCount + (presenceField.meshStrength || 0),
      wavelength: immuneCycle,
      phase:
        (errorCount +
          immuneCycle +
          (presenceField.meshPressureIndex || 0)) % 8,
      band: derivedBand,
      mode: derivedBand === "binary" ? "compression-wave" : "symbolic-wave"
    };
    immuneState.lastWaveField = waveField;

    const immunePressureProfile = {
      pressureTier,
      errorCount,
      band: derivedBand,
      meshPressureIndex: presenceField.meshPressureIndex,
      castleLoadLevel: presenceField.castleLoadLevel,
      advantageTier: advantageField.advantageTier,
      fallbackBandLevel: hintsField.fallbackBandLevel
    };

    const binaryProfile = {
      binaryField,
      pressureTier
    };

    const waveProfile = {
      waveField,
      pressureTier
    };

    immuneState.lastImmunePressureProfile = immunePressureProfile;
    immuneState.lastBinaryProfile = binaryProfile;
    immuneState.lastWaveProfile = waveProfile;

    immuneState.lastImmuneSignature = buildImmuneSignature(
      immuneCycle,
      derivedBand,
      pressureTier,
      errorCount
    );
    immuneState.lastDriftSignature = buildDriftSignature(report);

    if (!driftDetected) {
      immuneState.status = "healthy";
      immuneState.lastError = null;

      return {
        status: "healthy",
        report,
        immuneSignature: immuneState.lastImmuneSignature,
        driftSignature: immuneState.lastDriftSignature,
        band: derivedBand,
        binaryField,
        waveField,
        pressureTier,
        presenceField,
        advantageField,
        hintsField,
        immunePressureProfile,
        binaryProfile,
        waveProfile,
        immuneComputeProfile,
        cycleIndex: immuneCycle,
        ...PULSE_EARN_IMMUNE_CONTEXT
      };
    }

    immuneState.status = "warning";
    immuneState.lastError = "drift_detected";

    return {
      status: "warning",
      report,
      message: "Subsystem drift detected",
      immuneSignature: immuneState.lastImmuneSignature,
      driftSignature: immuneState.lastDriftSignature,
      band: derivedBand,
      binaryField,
      waveField,
      pressureTier,
      presenceField,
      advantageField,
      hintsField,
      immunePressureProfile,
      binaryProfile,
      waveProfile,
      immuneComputeProfile,
      cycleIndex: immuneCycle,
      ...PULSE_EARN_IMMUNE_CONTEXT
    };

  } catch (err) {
    immuneState.status = "error";
    immuneState.lastError = err.message;

    const derivedBand = normalizeBand(immuneState.lastBand);

    const surface = immuneCycle;
    const binaryField = {
      binaryImmuneSignature: computeHashIntelligence({
        organ: "PulseEarnImmuneSystem",
        mode: "error",
        surface,
        cycle: immuneCycle
      }),
      binarySurfaceSignature: computeHashIntelligence({
        organ: "PulseEarnImmuneSystem",
        mode: "error_surface",
        surface,
        cycle: immuneCycle
      }),
      binarySurface: {
        errorCount: 1,
        cycle: immuneCycle,
        surface
      },
      parity: surface % 2 === 0 ? 0 : 1,
      density: 1,
      shiftDepth: Math.max(0, Math.floor(Math.log2(surface || 1)))
    };
    immuneState.lastBinaryField = binaryField;

    const waveField = {
      amplitude: 1,
      wavelength: immuneCycle,
      phase: (1 + immuneCycle) % 8,
      band: derivedBand,
      mode: derivedBand === "binary" ? "compression-wave" : "symbolic-wave"
    };
    immuneState.lastWaveField = waveField;

    return {
      status: "error",
      error: err.message,
      immuneSignature: buildImmuneSignature(
        immuneCycle,
        derivedBand,
        "error",
        1
      ),
      band: derivedBand,
      binaryField,
      waveField,
      cycleIndex: immuneCycle,
      ...PULSE_EARN_IMMUNE_CONTEXT
    };
  }
}

// ============================================================================
// runRepair() — immune response (dual-band aware genetic repair)
// ============================================================================

export function runRepair() {
  immuneCycle++;
  immuneState.lastCycleIndex = immuneCycle;
  immuneState.status = "repairing";

  try {
    const packets = getPulseEarnGeneticMemoryHealingState();

    let repairedKey = null;

    if (packets.lastError && packets.lastKey) {
      const parts = String(packets.lastKey).split(":");
      const fileId = parts[0];
      const packetIndex = parts[1];
      const bandRaw = parts[2];
      const band = normalizeBand(bandRaw);

      const regenerated = synthesizePulseEarnGene(fileId, packetIndex, band);
      writePulseEarnGene(fileId, packetIndex, regenerated, band);

      repairedKey = packets.lastKey;
    }

    immuneState.status = "healthy";
    immuneState.lastError = null;
    immuneState.lastRepairSignature = buildRepairSignature(
      repairedKey,
      immuneCycle
    );

    return {
      repaired: true,
      repairedKey,
      repairSignature: immuneState.lastRepairSignature,
      cycleIndex: immuneCycle,
      ...PULSE_EARN_IMMUNE_CONTEXT
    };

  } catch (err) {
    immuneState.status = "error";
    immuneState.lastError = err.message;

    return {
      repaired: false,
      error: err.message,
      cycleIndex: immuneCycle,
      ...PULSE_EARN_IMMUNE_CONTEXT
    };
  }
}

// ============================================================================
// getPulseEarnImmuneState() — immune memory export
// ============================================================================

export function getPulseEarnImmuneState() {
  return { ...immuneState };
}
