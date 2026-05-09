// ============================================================================
//  PulseEarnContinuancePulse-v24-Immortal-INTEL.js
//  Earn v1 Continuance Wrapper (v24 IMMORTAL SAFE MODE)
//  NO PulseSendSystem, NO network, NO routing, NO loops.
//  Only: build LegacyEarn v1 + Pulse-compatible envelope and return it.
//  Presence/Advantage/Chunk/Band/Binary/Wave/Hints/ComputeProfile-aware
//  as METADATA ONLY (pure compute, deterministic).
//  v24-INTEL: extended pulseIntelligence + advantage + computeProfile
//  with factoring, chunk/cache/prewarm, band/binary/gpu/miner/air-aware hints,
//  and continuance/risk-aware surfaces (metadata-only).
// ============================================================================

/*
AI_EXPERIENCE_META = {
  identity: "PulseEarnContinuancePulse",
  version: "v24-Immortal-INTEL",
  layer: "earn_continuance",
  role: "earn_continuance_pulse",
  lineage: "PulseEarnContinuancePulse-v11 → v12.3 → v13 → v14.4 → v16.0-Immortal-INTEL → v24-Immortal-INTEL",

  evo: {
    continuancePulse: true,
    fallbackAware: true,
    survivalHeuristics: true,
    dualBand: true,
    symbolicPrimary: true,
    binaryAware: true,

    deterministic: true,
    driftProof: true,
    pureCompute: true,
    zeroMutationOfInput: true,
    zeroNetwork: true,
    zeroFilesystem: true,
    zeroAsync: true,
    zeroTimers: true,
    zeroDateNow: true,

    presenceAware: true,
    advantageAware: true,
    chunkPrewarmAware: true,
    hintsAware: true,
    waveFieldAware: true,
    bandAware: true,
    factoringAware: true,
    gpuAwareReady: true,
    minerAwareReady: true,
    airAwareReady: true,

    // Intelligence surface (logic-only, no heavy compute)
    pulseIntelligenceReady: true,
    solvednessAware: true,
    computeTierAware: true,
    readinessAware: true,

    // v24 extensions
    continuanceAware: true,
    riskAware: true,
    capabilityModelAware: true
  },

  contract: {
    always: [
      "PulseEarn",
      "PulseEarnGeneticMemory",
      "PulseEarnEndocrineSystem"
    ],
    never: [
      "safeRoute",
      "fetchViaCNS"
    ]
  }
}
*/

// ============================================================================
// ⭐ PulseRole — identifies this as the Earn Continuance Pulse Organ (v24)
// ============================================================================
export const PulseRole = {
  type: "PulseEarnContinuance",
  subsystem: "Earn",
  layer: "Organ",
  version: "24-Immortal-INTEL",
  identity: "PulseEarnContinuancePulse-v24-Immortal-INTEL",

  evo: {
    continuancePulse: true,
    fallbackAware: true,
    survivalHeuristics: true,

    deterministic: true,
    driftProof: true,
    pureCompute: true,
    zeroMutationOfInput: true,
    zeroNetwork: true,
    zeroFilesystem: true,
    zeroAsync: true,
    zeroTimers: true,
    zeroDateNow: true,

    presenceAware: true,
    advantageAware: true,
    chunkPrewarmAware: true,
    hintsAware: true,
    binaryAware: true,
    waveFieldAware: true,
    bandAware: true,
    factoringAware: true,
    gpuAwareReady: true,
    minerAwareReady: true,
    airAwareReady: true,

    // Intelligence surface (logic-only, no heavy compute)
    pulseIntelligenceReady: true,
    solvednessAware: true,
    computeTierAware: true,
    readinessAware: true,

    // v24 extensions
    continuanceAware: true,
    riskAware: true,
    capabilityModelAware: true
  },

  routingContract: "PulseRouter-v24-Immortal-INTEL",
  meshContract: "PulseMesh-v24-Immortal-INTEL",
  sendContract: "PulseSend-v24-Immortal-INTEL",
  gpuOrganContract: "PulseGPU-v24-Immortal-INTEL",
  earnCompatibility: "PulseEarn-v24-Immortal-INTEL"
};

export const PulseEarnContinuancePulseMeta = Object.freeze({
  layer: "PulseEarnContinuancePulse",
  role: "EARN_CONTINUANCE_ORGAN",
  version: "v24-Immortal-INTEL",
  identity: "PulseEarnContinuancePulse-v24-Immortal-INTEL",

  guarantees: Object.freeze({
    deterministic: true,
    noRandomness: true,
    noRealTime: true,
    noExternalIO: true,
    pureBuilder: true,
    safeFallback: true,

    dualBandAware: true,
    binaryAware: true,
    waveFieldAware: true,
    factoringAware: true,

    presenceAware: true,
    advantageAware: true,
    chunkPrewarmAware: true,
    hintsAware: true,

    loopTheorySafe: true,
    worldLensAware: false,

    continuanceAware: true,
    riskAware: true,
    capabilityModelAware: true
  }),

  contract: Object.freeze({
    input: [
      "EarnImpulse",
      "DualBandContext",
      "LegacyLineage",
      "PatternShape",
      "GlobalHintsPresenceField",
      "ContinuanceSnapshot",   // optional, metadata-only
      "RiskSnapshot",          // optional, metadata-only
      "CapabilityModel"        // optional, metadata-only
    ],
    output: [
      "LegacyEarnV1",
      "PulseCompatibleEarnEnvelope",
      "ContinuanceDiagnostics"
    ]
  })
});

// ============================================================================
// Deterministic cycle counter (replaces timestamps)
// ============================================================================
let continuanceCycle = 0;

// ============================================================================
// Deterministic Hash Helper
// ============================================================================
function computeHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++)
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  return `h${h}`;
}

function normalizeBand(band) {
  const b = String(band || "symbolic").toLowerCase();
  return b === "binary" ? "binary" : "symbolic";
}

function clamp01(x) {
  if (x == null || Number.isNaN(x)) return 0;
  return Math.max(0, Math.min(1, x));
}

// ============================================================================
// v24 Presence Field (IMMORTAL)
// ============================================================================
function classifyPresenceTier(pressure) {
  if (pressure >= 150) return "critical";
  if (pressure >= 100) return "high";
  if (pressure >= 50) return "elevated";
  if (pressure > 0) return "soft";
  return "idle";
}

function buildPresenceFieldV24(globalHints = {}, cycle) {
  const ghP = globalHints.presenceContext || {};
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

  return {
    presenceVersion: "v24-Immortal-INTEL",
    presenceTier,

    bandPresence: ghP.bandPresence || "symbolic",
    routerPresence: ghP.routerPresence || "stable",
    devicePresence: ghP.devicePresence || "continuance",

    meshPresence: ghP.meshPresence || (meshStrength > 0 ? "mesh-active" : "mesh-idle"),
    castlePresence: ghP.castlePresence || castle.castlePresence || "continuance-region",
    regionPresence: ghP.regionPresence || region.regionTag || "unknown-region",

    regionId: region.regionId || "continuance-region",
    castleId: castle.castleId || "continuance-castle",

    meshStrength,
    meshPressureIndex,
    castleLoadLevel,

    cycle,

    presenceSignature: computeHash(
      `CONTINUANCE_PRESENCE_V24::${presenceTier}::${meshPressureIndex}::${castleLoadLevel}`
    )
  };
}

// ============================================================================
// Advantage‑C v24 (structural, IMMORTAL-safe)
// ============================================================================
function buildAdvantageFieldV24(binaryField, waveField, presenceField, globalHints = {}, continuanceSnapshot = null, riskSnapshot = null) {
  const density = binaryField.binarySurface.density;
  const amplitude = waveField.amplitude;

  const baseScore =
    density * 0.00001 +
    amplitude * 0.00001;

  const presenceBoost =
    presenceField.presenceTier === "critical" ? 0.02 :
    presenceField.presenceTier === "high" ? 0.015 :
    presenceField.presenceTier === "elevated" ? 0.01 :
    presenceField.presenceTier === "soft" ? 0.005 :
    0;

  const contScore = continuanceSnapshot && typeof continuanceSnapshot.continuanceScore === "number"
    ? continuanceSnapshot.continuanceScore
    : 0;

  const riskScore = riskSnapshot && typeof riskSnapshot.riskScore === "number"
    ? riskSnapshot.riskScore
    : 0;

  const continuanceBoost = (1 - clamp01(contScore)) * 0.01;
  const riskBoost = clamp01(riskScore) * 0.01;

  const advantageScore = baseScore + presenceBoost + continuanceBoost + riskBoost;

  let advantageTier = 0;
  if (advantageScore >= 0.05) advantageTier = 3;
  else if (advantageScore >= 0.02) advantageTier = 2;
  else if (advantageScore > 0) advantageTier = 1;

  const hints = globalHints || {};
  const chunkHints = hints.chunkHints || {};
  const cacheHints = hints.cacheHints || {};
  const prewarmHints = hints.prewarmHints || {};
  const coldStartHints = hints.coldStartHints || {};

  return {
    advantageVersion: "C-24.0-INTEL",
    advantageScore,
    advantageTier,
    fallbackBandLevel: hints.fallbackBandLevel ?? 0,

    // hint surfaces (metadata-only)
    chunkAggression: chunkHints.chunkAggression ?? 0,
    cachePriority: (cacheHints.priority || "normal").toLowerCase(),
    prewarmNeeded: !!prewarmHints.shouldPrewarm,
    coldStartRisk: !!coldStartHints.coldStartRisk,

    gpuPreferred: !!hints.gpuPreferred,
    minerPreferred: !!hints.minerPreferred,
    airPreferred: !!hints.airPreferred,

    continuanceScore: contScore,
    riskScore
  };
}

// ============================================================================
// Chunk / Cache / Prewarm Plan v24
// ============================================================================
function buildChunkPrewarmPlanV24(presenceField, advantageField) {
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

  const gpuBoost =
    advantageField.gpuPreferred ? 1 : 0;

  return {
    planVersion: "v24-Continuance-AdvantageC-INTEL",
    priority: basePriority + advantageBoost + gpuBoost,
    band: presenceField.presenceTier,
    chunks: {
      continuanceEnvelope: true,
      legacyEarnBlueprint: true
    },
    cache: {
      continuanceDiagnostics: true
    },
    prewarm: {
      nervousSystem: true,
      muscleSystem: true,
      lymphNodes: true,
      gpuOrgan: !!advantageField.gpuPreferred,
      minerOrgan: !!advantageField.minerPreferred
    }
  };
}

// ============================================================================
// Hints + Compute Profile v24 (metadata-only)
// ============================================================================
function buildHintsFieldV24(globalHints = {}) {
  return Object.freeze({
    fallbackBandLevel: globalHints.fallbackBandLevel ?? 0,
    chunkHints: globalHints.chunkHints || {},
    cacheHints: globalHints.cacheHints || {},
    prewarmHints: globalHints.prewarmHints || {},
    coldStartHints: globalHints.coldStartHints || {},
    gpuPreferred: !!globalHints.gpuPreferred,
    minerPreferred: !!globalHints.minerPreferred,
    airPreferred: !!globalHints.airPreferred
  });
}

function normalizeCachePriorityV24(p) {
  if (!p) return "normal";
  const v = String(p).toLowerCase();
  if (v === "critical" || v === "high" || v === "low") return v;
  return "normal";
}

function deriveFactoringSignalV24({ meshPressureIndex = 0, cachePriority = "normal", prewarmNeeded = false }) {
  const pressure = clamp01(meshPressureIndex / 100);
  const highPressure = pressure >= 0.7;
  const criticalCache = cachePriority === "critical";
  if (criticalCache || prewarmNeeded) return 1;
  if (highPressure) return 1;
  return 0;
}

function buildComputeProfileV24({ band, presenceField, advantageField, globalHints = {}, capabilityModel = {} }) {
  const b = normalizeBand(band);
  const hintsField = buildHintsFieldV24(globalHints);
  const cachePriority = normalizeCachePriorityV24(hintsField.cacheHints.priority);
  const prewarmNeeded = !!hintsField.prewarmHints.shouldPrewarm;
  const meshPressureIndex = Number(globalHints.meshSignals?.meshPressureIndex || 0);

  const factoringSignal = deriveFactoringSignalV24({
    meshPressureIndex,
    cachePriority,
    prewarmNeeded
  });

  const performanceRatio = capabilityModel.performanceRatio ?? 1;
  const gpuScore = capabilityModel.gpuScore ?? 0;
  const minerScore = capabilityModel.minerScore ?? 0;
  const airScore = capabilityModel.airScore ?? 0;

  return Object.freeze({
    routeBand: b,
    fallbackBandLevel: hintsField.fallbackBandLevel,
    chunkAggression: hintsField.chunkHints.chunkAggression ?? 0,
    cachePriority,
    prewarmNeeded,
    binaryPreferred: b === "binary",
    symbolicPreferred: b === "symbolic",
    factoringSignal,
    gpuPreferred: hintsField.gpuPreferred || gpuScore > 0,
    minerPreferred: hintsField.minerPreferred || minerScore > 0,
    airPreferred: hintsField.airPreferred || airScore > 0,
    presenceTier: presenceField.presenceTier,
    advantageTier: advantageField.advantageTier,
    performanceRatio,
    gpuScore,
    minerScore,
    airScore
  });
}

// ============================================================================
// Binary + Wave Surfaces (v24)
// ============================================================================
function buildBinaryFieldV24(pattern, lineage, cycle) {
  const size = pattern.length + lineage.length;
  const density = size + cycle;
  const surface = density + size;

  return {
    binaryShapeSignature: computeHash(`bshape::${pattern}::${lineage.join("::")}`),
    binarySurfaceSignature: computeHash(`bsurf::${surface}`),
    binarySurface: {
      size,
      density,
      surface
    },
    parity: surface % 2 === 0 ? 0 : 1,
    shiftDepth: Math.max(0, Math.floor(Math.log2(surface || 1)))
  };
}

function buildWaveFieldV24(pattern, lineage, cycle, band) {
  const amplitude = lineage.length + cycle;
  const wavelength = pattern.length + 1;
  const phase = (pattern.length + lineage.length + cycle) % 16;

  return {
    amplitude,
    wavelength,
    phase,
    band,
    mode: band === "binary" ? "compression-wave" : "symbolic-wave"
  };
}

// ============================================================================
// Pulse Intelligence for Earn Continuance (logic-only, v24)
// ============================================================================
function computePulseIntelligenceForEarnV24({ band, factoringSignal, presenceField, advantageField, computeProfile }) {
  const bandIsBinary = band === "binary" ? 1 : 0;
  const factoring = factoringSignal ? 1 : 0;

  const advantageScore = advantageField.advantageScore || 0;
  const advantageTier = advantageField.advantageTier || 0;

  const presenceTier = presenceField.presenceTier || "idle";
  const presenceWeight =
    presenceTier === "critical" ? 1.0 :
    presenceTier === "high" ? 0.8 :
    presenceTier === "elevated" ? 0.6 :
    presenceTier === "soft" ? 0.4 :
    0.2;

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
      (bandIsBinary ? 0.15 : 0.0) +
      (advantageTier >= 2 ? 0.25 : advantageTier === 1 ? 0.1 : 0),
      1
    )
  );

  return {
    solvednessScore,
    factoringSignal: factoring ? "high" : "low",
    computeTier,
    readinessScore,
    band,
    advantageTier,
    performanceRatio
  };
}

// ============================================================================
// Build Legacy Earn v1 (unchanged logic, upgraded metadata surfaces v24)
// ============================================================================
function buildLegacyEarnV1(impulse, globalHints = {}, continuanceSnapshot = null, riskSnapshot = null, capabilityModel = {}) {
  continuanceCycle++;

  const payload = impulse?.payload || {};

  const jobId   = impulse.tickId || payload.jobId || "UNKNOWN_JOB";
  const pattern = impulse.intent || payload.pattern || "UNKNOWN_PATTERN";
  const lineage = payload.parentLineage || [];

  const band = normalizeBand(payload.band);

  const factoringSignal =
    typeof payload.factoringSignal === "number"
      ? (payload.factoringSignal ? 1 : 0)
      : 1;

  const patternSignature = computeHash(pattern);
  const lineageSignature = computeHash(lineage.join("::"));

  const presenceField = buildPresenceFieldV24(globalHints, continuanceCycle);
  const binaryField = buildBinaryFieldV24(pattern, lineage, continuanceCycle);
  const waveField = buildWaveFieldV24(pattern, lineage, continuanceCycle, band);
  const advantageField = buildAdvantageFieldV24(
    binaryField,
    waveField,
    presenceField,
    globalHints,
    continuanceSnapshot,
    riskSnapshot
  );
  const chunkPlan = buildChunkPrewarmPlanV24(presenceField, advantageField);
  const hintsField = buildHintsFieldV24(globalHints);
  const computeProfile = buildComputeProfileV24({
    band,
    presenceField,
    advantageField,
    globalHints,
    capabilityModel
  });

  const pulseIntelligence = computePulseIntelligenceForEarnV24({
    band,
    factoringSignal,
    presenceField,
    advantageField,
    computeProfile
  });

  return {
    EarnRole: {
      kind: "Earn",
      version: "1.0",
      identity: "Earn-v1-Continuance-v24-Immortal-INTEL"
    },

    jobId,
    pattern,
    patternSignature,

    payload,
    priority: payload.priority || "normal",
    returnTo: payload.returnTo || null,
    lineage,
    lineageSignature,

    band,
    factoringSignal,

    binaryField,
    waveField,
    presenceField,
    advantageField,
    chunkPlan,
    hintsField,
    computeProfile,

    pulseIntelligence,

    meta: {
      ...(payload.meta || {}),
      legacy: true,
      origin: "ContinuancePulse-v24-Immortal-INTEL",
      cycleIndex: continuanceCycle,
      patternSignature,
      lineageSignature
    }
  };
}

// ============================================================================
// Build Pulse-Compatible Envelope (v24 surfaces)
// ============================================================================
function buildPulseCompatibleEarnV24(earn) {
  if (!earn) return null;

  const continuanceSignature = computeHash(
    `${earn.jobId}::${earn.patternSignature}::${earn.meta.cycleIndex}`
  );

  return {
    PulseRole,

    jobId: earn.jobId,
    pattern: earn.pattern,
    patternSignature: earn.patternSignature,

    payload: earn.payload,
    priority: earn.priority,
    returnTo: earn.returnTo,
    lineage: earn.lineage,
    lineageSignature: earn.lineageSignature,

    band: earn.band,
    factoringSignal: earn.factoringSignal,

    binaryField: earn.binaryField,
    waveField: earn.waveField,
    presenceField: earn.presenceField,
    advantageField: earn.advantageField,
    chunkPlan: earn.chunkPlan,
    hintsField: earn.hintsField,
    computeProfile: earn.computeProfile,

    pulseIntelligence: earn.pulseIntelligence,

    meta: {
      ...(earn.meta || {}),
      origin: "ContinuancePulse-v24-Immortal-INTEL",
      earnVersion: "1.0",
      earnIdentity: "Earn-v1-Continuance-v24-Immortal-INTEL",
      earnEnvelope: true,
      cycleIndex: earn.meta.cycleIndex,
      continuanceSignature,
      bandSignature: computeHash(earn.band),
      factoringSignature: computeHash(String(earn.factoringSignal)),
      binarySignature: earn.binaryField.binaryShapeSignature,
      waveSignature: computeHash(JSON.stringify(earn.waveField)),
      pulseIntelligenceSignature: computeHash(JSON.stringify(earn.pulseIntelligence))
    },

    earn: {
      ...earn,
      __earnEnvelope: true
    }
  };
}

// ============================================================================
// PUBLIC API — PulseEarnContinuancePulse (v24 IMMORTAL-INTEL SAFE MODE)
// ============================================================================
export const PulseEarnContinuancePulse = {
  build(impulse, globalHints = {}, continuanceSnapshot = null, riskSnapshot = null, capabilityModel = {}) {
    const earnV1 = buildLegacyEarnV1(impulse, globalHints, continuanceSnapshot, riskSnapshot, capabilityModel);
    const pulseCompatibleEarn = buildPulseCompatibleEarnV24(earnV1);

    return {
      ok: true,
      earn: earnV1,
      pulseCompatibleEarn,
      fallback: true
    };
  }
};

export default {
  PulseRole,
  PulseEarnContinuancePulseMeta,
  PulseEarnContinuancePulse
};
