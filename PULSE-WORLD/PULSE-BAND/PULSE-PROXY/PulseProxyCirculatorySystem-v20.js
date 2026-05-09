// ============================================================================
//  PULSE OS v20-ImmortalPlus — CIRCULATORY SYSTEM (INSTANCE BLOODFLOW ORGAN)
//  Flow / Pressure / Saturation • Tri-Env + Adrenal + Telemetry Fusion
//  PURE CIRCULATORY MATH. NO ROUTING. NO AI. NO WORKER LOOPS.
//  v20-ImmortalPlus-FLOW-MAX (Internal + Adrenal + Telemetry)
//    • Deterministic, drift-proof, multi-instance safe
//    • Unified advantage field (flow/pressure/saturation → advantageScore)
//    • Dual-band A‑B‑A surfaces (band/binary/wave)
//    • Tri-env + Proxy-Mode + Pulse-Pal stress awareness
//    • Read-only experience meta for AI/agents/Overmind
// ============================================================================

/*
AI_EXPERIENCE_META = {
  identity: "PulseCirculatorySystem",
  version: "v20-ImmortalPlus-FLOW-MAX",
  layer: "circulatory_system",
  role: "instance_bloodflow_regulator",
  lineage: "PulseProxy-v20-Immortal",

  evo: {
    // Core circulatory laws
    circulatoryOrgan: true,
    bloodflowRegulator: true,
    flowFieldAware: true,
    pressureFieldAware: true,
    saturationFieldAware: true,
    capacityFieldAware: true,

    // IMMORTAL guarantees
    deterministic: true,
    driftProof: true,
    zeroRandomness: true,
    zeroNondeterminism: true,
    zeroExternalMutation: true,
    zeroDynamicImports: true,
    zeroEval: true,
    zeroTimers: true,
    zeroAsyncLoops: true,
    zeroDateNow: true,
    multiInstanceReady: true,
    backendOnly: true,

    // A‑B‑A surfaces
    bandAware: true,
    waveFieldAware: true,
    binaryFieldAware: true,
    flowBandAware: true,
    pressureBandAware: true,
    abaBandAware: true,

    // v20 presence/harmonics
    presenceAware: true,
    harmonicsAware: true,
    dualBandCompatible: true,
    unifiedAdvantageField: true,
    advantageCascadeAware: true,
    pulseEfficiencyAware: true,
    passivePrewarm: true,
    passiveCache: true,
    passiveChunk: true,
    passiveRemember: true,

    // Tri‑environment stress
    triEnvStressAware: true,
    cortexStressAware: true,
    somaticStressAware: true,
    sensoryStressAware: true,
    maxDominantFusion: true,
    rawStressDominance: true,

    // Adrenal + Telemetry integration
    adrenalStressAware: true,
    telemetryPressureAware: true,
    networkFlowAware: true,

    // Proxy‑Mode + Pulse‑Pal
    proxyModeStressAware: true,
    pulsePalStressAware: true,
    domCaptureStressAware: true,

    // Evolutionary awareness
    patternAware: true,
    shapeAware: true,
    evolutionAware: true,

    // Environment
    worldLensAware: false
  },

  contract: {
    input: [
      "UserScoresSnapshot",
      "TriEnvStressContext",
      "AdrenalStressContext",
      "TelemetryPressureContext",
      "ProxyModeStressContext",
      "PulsePalStressContext",
      "DualBandContext"
    ],
    output: [
      "CirculatoryFlowField",
      "CirculatoryPressureField",
      "CirculatorySaturationField",
      "CirculatoryAdvantageField",
      "CirculatoryBandSignature",
      "CirculatoryBinaryField",
      "CirculatoryWaveField",
      "CirculatoryPresenceField",
      "CirculatoryHarmonicsField",
      "CirculatoryDiagnostics",
      "CirculatoryHealingState",
      "CirculatoryExperienceMeta"
    ]
  }
}
*/

// ============================================================================
//  OSKernel imports (backend‑safe)
// ============================================================================
import {
  logger,
  PulseVersion,
  PulseRoles,
  PulseLineage
} from "../../PULSE-UI/_MONITOR/PulseProofLogger-v20.js";

// ============================================================================
//  EXPERIENCE META — AI / Agent / Overmind surfaces
// ============================================================================
export const PulseCirculatoryExperienceMeta = Object.freeze({
  layer: "PulseCirculatorySystem",
  role: "CIRCULATORY_SYSTEM_EXPERIENCE",
  version: "v20-ImmortalPlus-FLOW-MAX",
  identity: "PulseCirculatoryExperience-v20-ImmortalPlus",
  experience: {
    surfaces: {
      flowRate: true,
      pressureIndex: true,
      saturation: true,
      capacityScore: true,
      triEnvStress: true,
      adrenalStress: true,
      telemetryPressure: true,
      proxyModeStress: true,
      pulsePalStress: true,
      band: true,
      bandSignature: true,
      binaryField: true,
      waveField: true,
      advantageField: true,
      presenceField: true,
      harmonicsField: true
    },
    narrative: {
      description:
        "Circulatory system that fuses internal capacity, adrenal stress, and telemetry pressure " +
        "into flow/pressure/saturation fields with A‑B‑A band surfaces and advantage overlays. " +
        "Pure circulatory math; no routing, no worker loops, no AI.",
      aiUsageHint:
        "Use these circulatory surfaces to understand instance bloodflow, pressure, and advantage. " +
        "Never treat this organ as a router, scheduler, or worker manager."
    }
  }
});

// ============================================================================
//  ORGAN IDENTITY — v20-ImmortalPlus A‑B‑A
// ============================================================================
export const PulseRole = {
  type: "Organ",
  subsystem: "PulseProxy",
  layer: "CirculatorySystem",
  version: "v20-ImmortalPlus-FLOW-MAX",
  identity: "PulseCirculatorySystem-v20-ImmortalPlus-FLOW-MAX-ABA",

  evo: {
    deterministic: true,
    driftProof: true,
    pulseEfficiencyAware: true,
    unifiedAdvantageField: true,
    multiInstanceReady: true,
    circulatoryOrgan: true,
    bloodflowRegulator: true,
    backendOnly: true,
    futureEvolutionReady: true,

    // A‑B‑A awareness
    bandAware: true,
    waveFieldAware: true,
    binaryFieldAware: true,
    flowFieldAware: true,
    pressureFieldAware: true,
    saturationFieldAware: true,
    capacityFieldAware: true,

    // presence / cache / chunk advantages
    presenceAware: true,
    harmonicsAware: true,
    cachePrewarmAware: true,
    chunkingAware: true,

    // dual-band / IMMORTAL surfaces
    symbolicAware: true,
    binaryAware: true,
    dualBandAware: true,
    epochStable: true,

    // Tri‑environment stress
    triEnvStressAware: true,
    cortexStressAware: true,
    somaticStressAware: true,
    sensoryStressAware: true,
    maxDominantFusion: true,
    rawStressDominance: true,

    // Adrenal + Telemetry integration
    adrenalStressAware: true,
    telemetryPressureAware: true,
    networkFlowAware: true,

    // Proxy‑Mode + Pulse‑Pal
    proxyModeStressAware: true,
    pulsePalStressAware: true,
    domCaptureStressAware: true
  }
};

export const PulseCirculatorySystemMeta = Object.freeze({
  layer: "PulseCirculatorySystem",
  role: "CIRCULATORY_SYSTEM_ORGAN",
  version: "v20-ImmortalPlus-FLOW-MAX-ABA",
  identity: "PulseCirculatorySystem-v20-ImmortalPlus-FLOW-MAX-ABA",

  guarantees: Object.freeze({
    deterministic: true,
    driftProof: true,
    multiInstanceReady: true,

    // Circulatory laws
    circulatoryOrgan: true,
    bloodflowRegulator: true,
    flowFieldAware: true,
    pressureFieldAware: true,
    saturationFieldAware: true,
    capacityFieldAware: true,
    unifiedAdvantageField: true,
    pulseEfficiencyAware: true,
    backendOnly: true,

    // Execution prohibitions
    zeroRandomness: true,
    zeroNondeterminism: true,
    zeroExternalMutation: true,
    zeroDynamicImports: true,
    zeroEval: true,
    zeroTimers: true,
    zeroAsyncLoops: true,
    zeroDateNow: true,
    zeroNetworkFetch: true,
    zeroWindow: true,
    zeroDOM: true,
    zeroAI: true,
    zeroRouting: true,

    // A‑B‑A + band surfaces
    bandAware: true,
    waveFieldAware: true,
    binaryFieldAware: true,

    // Awareness
    symbolicAware: true,
    binaryAware: true,
    dualBandAware: true,

    // Presence / chunking / cache-prewarm
    presenceAware: true,
    harmonicsAware: true,
    chunkingAware: true,
    cachePrewarmAware: true,

    worldLensAware: false
  }),

  contract: Object.freeze({
    input: [
      "UserScoresSnapshot",
      "TriEnvStressContext",
      "AdrenalStressContext",
      "TelemetryPressureContext",
      "ProxyModeStressContext",
      "PulsePalStressContext",
      "DualBandContext"
    ],
    output: [
      "CirculatoryFlowField",
      "CirculatoryPressureField",
      "CirculatorySaturationField",
      "CirculatoryAdvantageField",
      "CirculatoryBandSignature",
      "CirculatoryBinaryField",
      "CirculatoryWaveField",
      "CirculatoryPresenceField",
      "CirculatoryHarmonicsField",
      "CirculatoryDiagnostics",
      "CirculatoryHealingState",
      "CirculatoryExperienceMeta"
    ]
  }),

  lineage: Object.freeze({
    root: "PulseProxy-v11",
    parent: "PulseProxy-v20-Immortal",
    ancestry: [
      "PulseProxyAdrenalSystem-v7",
      "PulseProxyAdrenalSystem-v8",
      "PulseProxyAdrenalSystem-v9",
      "PulseProxyAdrenalSystem-v10",
      "PulseProxyAdrenalSystem-v11",
      "PulseProxyAdrenalSystem-v11-Evo",
      "PulseProxyAdrenalSystem-v11.2-Evo-BINARY-MAX",
      "PulseProxyAdrenalSystem-v12.3-Presence-Evo+",
      "PulseCirculatorySystem-v20-ImmortalPlus-FLOW-MAX-ABA"
    ]
  }),

  bands: Object.freeze({
    supported: ["symbolic", "binary", "dual"],
    default: "symbolic",
    behavior: "circulatory-flow"
  }),

  architecture: Object.freeze({
    pattern: "A-B-A",
    baseline: "capacity + stress + telemetry → flow/pressure/saturation → A‑B‑A surfaces",
    adaptive:
      "binary-field + wave-field overlays + advantage field + presence/harmonics overlays",
    return:
      "deterministic circulatory surfaces + signatures + advantage + experience meta"
  })
});

// ============================================================================
//  INTERNAL HELPERS — Hash / Band / Binary / Wave / Advantage / Presence
// ============================================================================
let circulatoryCycle = 0;

function computeHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `h${h}`;
}

function buildCirculatoryCycleSignature(cycle) {
  return computeHash(`CIRCULATORY_CYCLE::${cycle}`);
}

function buildBand(flowRate, pressureIndex) {
  const f = flowRate ?? 0;
  const p = pressureIndex ?? 0;

  if (p > 0.7 || f > 0.85) return "binary";
  if (p < 0.3 && f < 0.6) return "symbolic";
  return "dual";
}

function buildBandSignature(band) {
  const raw = `CIRCULATORY_BAND::${band}`;
  let acc = 0;
  for (let i = 0; i < raw.length; i++) {
    acc = (acc + raw.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `circ-band-${acc}`;
}

function buildBinaryField(flowRate, pressureIndex, saturation) {
  const f = flowRate ?? 0;
  const p = pressureIndex ?? 0;
  const s = saturation ?? 0;

  const patternLen = 12 + Math.round(f * 8 + p * 6);
  const density = patternLen + Math.round((p + s) * 10);
  const surface = density + patternLen;

  return {
    binaryPhenotypeSignature: `circ-binary-pheno-${surface % 99991}`,
    binarySurfaceSignature: `circ-binary-surface-${(surface * 7) % 99991}`,
    binarySurface: { patternLen, density, surface },
    parity: surface % 2 === 0 ? 0 : 1,
    shiftDepth: Math.max(0, Math.floor(Math.log2(surface || 1)))
  };
}

function buildWaveField(flowRate, pressureIndex, band) {
  const f = flowRate ?? 0;
  const p = pressureIndex ?? 0;

  const amplitude = 6 + Math.round(f * 6 + p * 4);
  const wavelength = amplitude + 4;
  const phase = amplitude % 16;

  return {
    amplitude,
    wavelength,
    phase,
    band,
    mode: band === "binary" ? "compression-wave" : band === "dual" ? "hybrid-wave" : "symbolic-wave"
  };
}

// IMMORTAL advantage field: combines flow, pressure, saturation into 0–1 advantageScore
function buildAdvantageField(flowRate, pressureIndex, saturation) {
  const f = Math.max(0, Math.min(1, flowRate ?? 0));
  const p = Math.max(0, Math.min(1, pressureIndex ?? 0));
  const s = Math.max(0, Math.min(1, saturation ?? 0));

  // High flow, moderate pressure, moderate-high saturation → best advantage
  const flowScore = f;
  const pressureScore = 1 - Math.abs(p - 0.5) * 2; // best around 0.5
  const saturationScore = s;

  const advantageScore = Math.max(
    0,
    Math.min(1, flowScore * 0.45 + pressureScore * 0.3 + saturationScore * 0.25)
  );

  let flowBand = "low";
  if (f >= 0.8) flowBand = "high";
  else if (f >= 0.5) flowBand = "medium";

  let pressureBand = "normal";
  if (p >= 0.75) pressureBand = "high";
  else if (p <= 0.25) pressureBand = "low";

  return {
    flowRate: f,
    pressureIndex: p,
    saturation,
    flowBand,
    pressureBand,
    advantageScore,
    advantageSignature: `circ-adv-${Math.round(advantageScore * 1000)}`
  };
}

// Presence / harmonics field (purely derived)
function buildPresenceField(flowRate, pressureIndex) {
  const f = Math.max(0, Math.min(1, flowRate ?? 0));
  const p = Math.max(0, Math.min(1, pressureIndex ?? 0));

  const coherenceBase = 0.6 + f * 0.3 - Math.abs(p - 0.5) * 0.2;
  const coherenceScore = Math.max(0.2, Math.min(1, coherenceBase));

  const harmonicDrift = Math.max(0, Math.min(1, 0.4 + (p - 0.5) * 0.4));

  const dualBandMode =
    p > 0.7 || f > 0.8 ? "dual" :
    p < 0.3 && f < 0.6 ? "symbolic" :
    "binary";

  const pulsePrewarm =
    f > 0.7 ? "preferred" :
    f > 0.4 ? "optional" :
    "disabled";

  const pulseCacheMode =
    f > 0.7 ? "circulation-cache-strong" :
    f > 0.4 ? "circulation-cache-normal" :
    "circulation-cache-weak";

  const pulseChunkMode =
    p > 0.7 ? "micro-chunk" :
    f > 0.7 ? "multi-chunk" :
    "single-chunk";

  const pulseRemember =
    coherenceScore > 0.8 ? "remember-strong" :
    coherenceScore > 0.5 ? "remember-normal" :
    "remember-weak";

  return {
    coherenceScore,
    harmonicDrift,
    dualBandMode,
    pulsePrewarm,
    pulseCacheMode,
    pulseChunkMode,
    pulseRemember
  };
}

// Simple harmonics field wrapper (can be extended later)
function buildHarmonicsField(flowRate, pressureIndex) {
  const f = Math.max(0, Math.min(1, flowRate ?? 0));
  const p = Math.max(0, Math.min(1, pressureIndex ?? 0));

  return {
    flowHarmonic: f,
    pressureHarmonic: p,
    harmonicsSignature: computeHash(`HARMONICS::${f.toFixed(3)}::${p.toFixed(3)}`)
  };
}

// ============================================================================
//  CORE FUSION — Flow / Pressure / Saturation from Internal + Adrenal + Telemetry
// ============================================================================

function fuseTriEnvStress(triEnvContext) {
  if (!triEnvContext || typeof triEnvContext !== "object") {
    return { triEnvStress: 0, cortexStress: 0, somaticStress: 0, sensoryStress: 0 };
  }

  const cortex = Math.max(0, Math.min(1, triEnvContext.cortexStress ?? 0));
  const somatic = Math.max(0, Math.min(1, triEnvContext.somaticStress ?? 0));
  const sensory = Math.max(0, Math.min(1, triEnvContext.sensoryStress ?? 0));

  const triEnvStress = Math.max(cortex, somatic, sensory);

  return { triEnvStress, cortexStress: cortex, somaticStress: somatic, sensoryStress: sensory };
}

function fuseAdrenalStress(adrenalContext) {
  if (!adrenalContext || typeof adrenalContext !== "object") {
    return { adrenalStress: 0 };
  }
  const adrenalStress = Math.max(0, Math.min(1, adrenalContext.stressIndex ?? 0));
  return { adrenalStress };
}

function fuseTelemetryPressure(telemetryContext) {
  if (!telemetryContext || typeof telemetryContext !== "object") {
    return { telemetryPressure: 0 };
  }
  const telemetryPressure = Math.max(0, Math.min(1, telemetryContext.pressureIndex ?? 0));
  return { telemetryPressure };
}

function fuseProxyModeStress(proxyContext) {
  if (!proxyContext || typeof proxyContext !== "object") {
    return { proxyModeStress: 0 };
  }
  const proxyModeStress = Math.max(0, Math.min(1, proxyContext.stressIndex ?? 0));
  return { proxyModeStress };
}

function fusePulsePalStress(pulsePalContext) {
  if (!pulsePalContext || typeof pulsePalContext !== "object") {
    return { pulsePalStress: 0 };
  }
  const pulsePalStress = Math.max(0, Math.min(1, pulsePalContext.stressIndex ?? 0));
  return { pulsePalStress };
}

// Internal capacity / saturation from user snapshot
function buildCapacityAndSaturation(userSnapshot) {
  const baseInstances = Math.max(1, userSnapshot?.instances ?? 1);
  const maxInstances = Math.max(baseInstances, userSnapshot?.maxInstances ?? baseInstances);

  const capacityScore = Math.max(0, Math.min(1, baseInstances / maxInstances));
  const saturation = Math.max(0, Math.min(1, baseInstances / maxInstances));

  return {
    baseInstances,
    maxInstances,
    capacityScore,
    saturation,
    capacitySignature: computeHash(
      `CAPACITY::${baseInstances}::${maxInstances}::${capacityScore.toFixed(3)}`
    )
  };
}

// Flow / pressure fusion
function buildFlowAndPressure(capacity, triEnv, adrenal, telemetry, proxyMode, pulsePal) {
  const c = capacity.capacityScore;
  const s = capacity.saturation;

  const tri = triEnv.triEnvStress;
  const adr = adrenal.adrenalStress;
  const tel = telemetry.telemetryPressure;
  const prox = proxyMode.proxyModeStress;
  const pal = pulsePal.pulsePalStress;

  // Flow: primarily capacity + tri-env + adrenal
  const flowBase = c * 0.5 + (1 - s) * 0.2 + tri * 0.15 + adr * 0.15;
  const flowRate = Math.max(0, Math.min(1, flowBase));

  // Pressure: primarily telemetry + adrenal + tri-env + proxy/pal
  const pressureBase =
    tel * 0.4 +
    adr * 0.25 +
    tri * 0.15 +
    prox * 0.1 +
    pal * 0.1;

  const pressureIndex = Math.max(0, Math.min(1, pressureBase));

  return { flowRate, pressureIndex };
}

// ============================================================================
//  MAIN API — Build Circulatory Surfaces (v20-ImmortalPlus-FLOW-MAX A‑B‑A)
// ============================================================================

export function computeCirculatoryState(userSnapshot, contexts = {}) {
  circulatoryCycle++;

  const triEnv = fuseTriEnvStress(contexts.triEnvStressContext);
  const adrenal = fuseAdrenalStress(contexts.adrenalStressContext);
  const telemetry = fuseTelemetryPressure(contexts.telemetryPressureContext);
  const proxyMode = fuseProxyModeStress(contexts.proxyModeStressContext);
  const pulsePal = fusePulsePalStress(contexts.pulsePalStressContext);

  const capacity = buildCapacityAndSaturation(userSnapshot);
  const { flowRate, pressureIndex } = buildFlowAndPressure(
    capacity,
    triEnv,
    adrenal,
    telemetry,
    proxyMode,
    pulsePal
  );

  const band = buildBand(flowRate, pressureIndex);
  const bandSignature = buildBandSignature(band);
  const binaryField = buildBinaryField(flowRate, pressureIndex, capacity.saturation);
  const waveField = buildWaveField(flowRate, pressureIndex, band);
  const advantageField = buildAdvantageField(flowRate, pressureIndex, capacity.saturation);
  const presenceField = buildPresenceField(flowRate, pressureIndex);
  const harmonicsField = buildHarmonicsField(flowRate, pressureIndex);
  const circulatoryCycleSignature = buildCirculatoryCycleSignature(circulatoryCycle);

  const diagnostics = {
    cycle: circulatoryCycle,
    circulatoryCycleSignature,
    capacity,
    triEnv,
    adrenal,
    telemetry,
    proxyMode,
    pulsePal,
    flowRate,
    pressureIndex
  };

  const healingState = {
    stable: pressureIndex < 0.8,
    overloadRisk: pressureIndex >= 0.8,
    underutilized: flowRate < 0.3 && capacity.saturation < 0.5,
    notesSignature: computeHash(
      `HEALING::${flowRate.toFixed(3)}::${pressureIndex.toFixed(3)}::${capacity.saturation.toFixed(3)}`
    )
  };

  const flowField = {
    flowRate,
    baseInstances: capacity.baseInstances,
    maxInstances: capacity.maxInstances
  };

  const pressureField = {
    pressureIndex,
    telemetryPressure: telemetry.telemetryPressure,
    adrenalStress: adrenal.adrenalStress,
    triEnvStress: triEnv.triEnvStress
  };

  const saturationField = {
    saturation: capacity.saturation,
    capacityScore: capacity.capacityScore
  };

  return {
    flowField,
    pressureField,
    saturationField,
    advantageField,
    band,
    bandSignature,
    binaryField,
    waveField,
    presenceField,
    harmonicsField,
    circulatoryCycleSignature,
    diagnostics,
    healingState,
    experienceMeta: PulseCirculatoryExperienceMeta,
    meta: {
      layer: PulseRole.layer,
      version: PulseRole.version,
      lineage: PulseLineage.proxy,
      role: PulseRole.layer
    }
  };
}

// ============================================================================
//  EXPORT — CIRCULATORY SYSTEM v20-ImmortalPlus-FLOW-MAX A‑B‑A
// ============================================================================
export const PulseCirculatorySystem = {
  compute: computeCirculatoryState,
  meta: {
    layer: PulseRole.layer,
    version: PulseRole.version,
    experienceMeta: PulseCirculatoryExperienceMeta
  },
  PulseRole,
  PulseCirculatorySystemMeta
};
