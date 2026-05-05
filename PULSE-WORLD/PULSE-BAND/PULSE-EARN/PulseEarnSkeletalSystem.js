// ============================================================================
// FILE: tropic-pulse-functions/PULSE-WORLD/PULSE-EARN/PulseEarnSkeletalSystem-v16-IMMORTAL-MAX.js
// LAYER: THE SKELETAL SYSTEM + VITAL SIGNS MONITOR (v16-IMMORTAL-MAX A-B-A-INTEL)
// ROLE: Deterministic Device Phenotype + Structural Limits + Physiological Baselines
//       + Presence Field + Chunk/Cache/Prewarm + Advantage‑M Surfaces
//       + Dual-Hash INTEL Signatures + Device Lineage + Compatibility Surfaces
// ============================================================================
//
// ROLE (v16-IMMORTAL-MAX):
//   THE SKELETAL SYSTEM — Pulse‑Earn’s structural capacity declaration.
//   • CPU cores = bone density (deterministic)
//   • Memory = marrow capacity (deterministic)
//   • GPU = muscular fiber potential (deterministic)
//
//   THE VITAL SIGNS MONITOR — Pulse‑Earn’s physiological baseline.
//   • Bandwidth = circulatory throughput (deterministic)
//   • Stability = organism homeostasis (deterministic)
//
//   PRESENCE + A-B-A DUAL-BAND EXTENSION (v16):
//   • band = symbolic | binary (phenotype-declared, binary-first capable)
//   • presenceBand = organism presence field hint
//   • binaryField = deterministic binary surface
//   • waveField = deterministic wave surface
//   • chunkField = deterministic chunk/cache/prewarm budget surface
//   • advantageField = Advantage‑M skeletal surface (gpu/bw/presence/chunk)
//   • buildDualHashSignature = INTEL dual-hash signature for every major surface
//
// PURPOSE (v16-IMMORTAL-MAX):
//   • Provide deterministic, drift‑proof device profiling.
//   • Guarantee safe capability declaration.
//   • Supply Survival Instincts + Reflex + Earn + PulseSend with:
//       - phenotype
//       - presence
//       - chunk/cache/prewarm
//       - skeletal Advantage‑M field
//       - compatibility surfaces (muscle / nervous / lymph / endocrine / embassy)
//   • Emit pattern + signature surfaces for v16‑IMMORTAL diagnostics.
// ============================================================================

/*
AI_EXPERIENCE_META = {
  identity: "PulseEarnSkeletalSystem",
  version: "v16-Immortal-MAX",
  layer: "earn_skeletal",
  role: "earn_structural_support",
  lineage: "PulseEarnSkeletalSystem-v10.4 → v11-Evo → v13.1-Presence-Immortal-ADV → v16-Immortal-MAX",

  evo: {
    skeletalSystem: true,
    structuralSupport: true,
    jobFramework: true,
    dualBand: true,
    symbolicPrimary: true,
    binaryAware: true,

    deterministic: true,
    driftProof: true,
    pureCompute: true,
    zeroNetwork: true,
    zeroFilesystem: true,
    zeroMutationOfInput: true,

    dualHashIntel: true,
    extendedPhenotypeSurfaces: true,
    extendedPresenceSurfaces: true,
    extendedAdvantageSurfaces: true,
    extendedChunkSurfaces: true,
    compatibilitySurfaces: true
  },

  contract: {
    always: [
      "PulseEarnMuscleSystem",
      "PulseEarnNervousSystem",
      "PulseEarnHeart",
      "PulseEarnLymphNodes",
      "PulseEarnEndocrineSystem",
      "PulseEarnMktEmbassyLedger"
    ],
    never: [
      "safeRoute",
      "fetchViaCNS"
    ]
  }
}
*/

export const PulseEarnSkeletalSystemMeta = Object.freeze({
  layer: "PulseEarnSkeletalSystem",
  role: "EARN_SKELETAL_ORGAN",
  version: "v16-Immortal-MAX",
  identity: "PulseEarnSkeletalSystem-v16-Immortal-MAX",

  guarantees: Object.freeze({
    deterministic: true,
    driftProof: true,
    noRandomness: true,
    noRealTime: true,
    noExternalIO: true,

    // Capability engine laws
    pureCapabilityEngine: true,
    deterministicPhenotype: true,
    deterministicStructuralLimits: true,
    deterministicPhysiologicalBaselines: true,

    // Safety laws
    zeroAI: true,
    zeroUserCode: true,
    zeroDynamicImports: true,
    zeroEval: true,
    zeroNetwork: true,
    zeroFilesystem: true,
    zeroCrypto: true,
    zeroHardwareProbing: true,
    zeroOSInspection: true,

    // Band + metadata
    dualBandAware: true,
    binaryAware: true,
    waveFieldAware: true,
    healingMetadataAware: true,

    // Presence + advantage
    presenceAware: true,
    presenceFieldAware: true,
    chunkingAware: true,
    cachePrewarmAware: true,
    gpuFieldAware: true,
    advantageFieldAware: true,

    // Environment
    worldLensAware: false,
    multiInstanceReady: true,

    // v16 INTEL
    dualHashIntel: true,
    compatibilitySurfaces: true
  }),

  contract: Object.freeze({
    input: [
      "PhenotypeConfigOverride",
      "DualBandContext",
      "PresenceContext"
    ],
    output: [
      "DevicePhenotype",
      "StructuralDiagnostics",
      "PhysiologicalDiagnostics",
      "PresenceDiagnostics",
      "SkeletalAdvantageField",
      "SkeletalCompatibilityField",
      "SkeletalSignatures",
      "SkeletalHealingState"
    ]
  }),

  lineage: Object.freeze({
    root: "PulseOS-v16-Immortal",
    parent: "PulseEarn-v16-Immortal",
    ancestry: [
      "PulseEarnSkeletalSystem-v9",
      "PulseEarnSkeletalSystem-v10",
      "PulseEarnSkeletalSystem-v11",
      "PulseEarnSkeletalSystem-v11-Evo",
      "PulseEarnSkeletalSystem-v12.3-Presence",
      "PulseEarnSkeletalSystem-v13.0-Presence-Immortal",
      "PulseEarnSkeletalSystem-v13.1-Presence-Immortal-ADV"
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
    baseline: "deterministic phenotype → structural limits → physiological baselines",
    adaptive: "binary/wave/presence surfaces + dual-band signatures + chunkField + advantageField + compatibilityField",
    return: "deterministic phenotype + structural + physiological + presence + advantage + compatibility signatures"
  })
});

// ---------------------------------------------------------------------------
// Healing Metadata — Structural + Physiological + Presence + Advantage Log
// ---------------------------------------------------------------------------
const skeletalHealing = {
  lastProfile: null,
  lastGpuModel: null,
  lastGpuScore: null,
  lastBandwidthMbps: null,
  lastStabilityScore: null,

  lastPhenotypeSignature: null,
  lastStructuralSignature: null,
  lastPhysiologicalSignature: null,
  lastPresenceSignature: null,
  lastDevicePattern: null,

  lastBand: null,
  lastBandSignature: null,
  lastBinaryField: null,
  lastWaveField: null,
  lastPresenceBand: null,
  lastPresenceField: null,
  lastChunkField: null,

  lastAdvantageField: null,
  lastAdvantageSignature: null,

  lastCompatibilityField: null,
  lastCompatibilitySignature: null,

  // v16 dual-hash INTEL surfaces
  lastPhenotypeIntelSig: null,
  lastStructuralIntelSig: null,
  lastPhysIntelSig: null,
  lastPresenceIntelSig: null,
  lastAdvantageIntelSig: null,
  lastCompatibilityIntelSig: null,

  cycleCount: 0,

  loopTheory: {
    routingCompletion: true,
    allowLoopfieldPropulsion: true,
    pulseComputeContinuity: true,
    errorRouteAround: true
  }
};

// ---------------------------------------------------------------------------
// Deterministic Hash Helpers — v16-IMMORTAL-MAX
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
  const classicHash = computeHash(
    `${label}::${classicString || ""}`
  );
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
// Deterministic Phenotype — v16-IMMORTAL-MAX
// Still no hardware probing; phenotype is deterministic and override‑only.
// ---------------------------------------------------------------------------
let phenotype = {
  id: "DEVICE-16-IMMORTAL-MAX",

  // Structural capacity (skeletal system)
  cpuCores: 12,
  memoryMB: 32768,

  // Muscular potential
  gpuModel: "deterministic-gpu-v16",
  vramMB: 8192,
  gpuScore: 1600,

  // Physiological baselines
  bandwidthMbps: 250,
  stabilityScore: 0.9,

  // A-B-A band identity (phenotype-declared, binary-first capable)
  band: "binary",

  // Presence + chunk/cache/prewarm hints
  presenceBand: "binary",
  chunkBudgetKB: 1024,
  cacheLines: 256,
  prewarmSlots: 16,

  // Extended v16 capability envelope
  maxConcurrentJobs: 4,
  maxMarketplaceStreams: 3,
  maxReflexDepth: 2,
  maxPulseSendConcurrency: 2
};

// ---------------------------------------------------------------------------
// configurePulseEarnPhenotype — deterministic override
// ---------------------------------------------------------------------------
export function configurePulseEarnPhenotype(config) {
  const cfg = config || {};
  phenotype = {
    ...phenotype,
    ...cfg,
    band: normalizeBand(cfg && cfg.band != null ? cfg.band : phenotype.band),
    presenceBand: normalizePresenceBand(
      cfg && cfg.presenceBand != null ? cfg.presenceBand : phenotype.presenceBand
    )
  };
}

// ---------------------------------------------------------------------------
// INTERNAL: Build Device Pattern
// ---------------------------------------------------------------------------
function buildDevicePattern(p) {
  return (
    `DEVICE::cpu:${p.cpuCores}` +
    `::mem:${p.memoryMB}` +
    `::gpu:${p.gpuScore}` +
    `::bw:${p.bandwidthMbps}` +
    `::stab:${p.stabilityScore}` +
    `::band:${normalizeBand(p.band)}` +
    `::presence:${normalizePresenceBand(p.presenceBand)}` +
    `::chunk:${p.chunkBudgetKB}` +
    `::cache:${p.cacheLines}` +
    `::prewarm:${p.prewarmSlots}` +
    `::jobs:${p.maxConcurrentJobs}` +
    `::streams:${p.maxMarketplaceStreams}` +
    `::reflex:${p.maxReflexDepth}` +
    `::pulse:${p.maxPulseSendConcurrency}`
  );
}

// ---------------------------------------------------------------------------
// INTERNAL: Build Signatures
// ---------------------------------------------------------------------------
function buildStructuralSignature(p) {
  return computeHash(
    `STRUCT::cpu:${p.cpuCores}::mem:${p.memoryMB}::gpu:${p.gpuScore}`
  );
}

function buildPhysiologicalSignature(p) {
  return computeHash(
    `PHYS::bw:${p.bandwidthMbps}::stab:${p.stabilityScore}`
  );
}

function buildPhenotypeSignature(p) {
  return computeHash(
    `PHENO::${p.cpuCores}::${p.memoryMB}::${p.gpuScore}::${p.bandwidthMbps}::${p.stabilityScore}::${normalizeBand(p.band)}::${normalizePresenceBand(p.presenceBand)}`
  );
}

function buildPresenceSignature(p) {
  return computeHash(
    `PRESENCE::band:${normalizePresenceBand(p.presenceBand)}::chunk:${p.chunkBudgetKB}::cache:${p.cacheLines}::prewarm:${p.prewarmSlots}`
  );
}

function buildBandSignature(p, cycleIndex) {
  const band = normalizeBand(p.band);
  return computeHash(`BAND::SKELETAL::${band}::${cycleIndex}`);
}

// ---------------------------------------------------------------------------
// INTERNAL: A-B-A Binary + Wave Surfaces
// ---------------------------------------------------------------------------
function buildBinaryField(p, cycleIndex) {
  const patternLen =
    String(p.id || "").length +
    String(p.gpuModel || "").length;

  const density = p.cpuCores + (p.memoryMB >> 10) + p.gpuScore;
  const surface = density + patternLen + cycleIndex;

  return {
    binaryPhenotypeSignature: computeHash(`BPHENO::${surface}`),
    binarySurfaceSignature: computeHash(`BSURF_SKEL::${surface}`),
    binarySurface: {
      patternLen,
      density,
      cycle: cycleIndex,
      surface
    },
    parity: surface % 2 === 0 ? 0 : 1,
    density,
    shiftDepth: Math.max(0, Math.floor(Math.log2(surface || 1)))
  };
}

function buildWaveField(p, cycleIndex) {
  const band = normalizeBand(p.band);
  const amplitude = p.gpuScore;
  const wavelength = p.bandwidthMbps;
  const phase = (p.cpuCores + (p.memoryMB >> 10) + cycleIndex) % 16;

  return {
    amplitude,
    wavelength,
    phase,
    band,
    mode: band === "binary" ? "compression-wave" : "symbolic-wave"
  };
}

// ---------------------------------------------------------------------------
// INTERNAL: Presence + Chunk/Cache/Prewarm Field
// ---------------------------------------------------------------------------
function buildPresenceField(p, cycleIndex) {
  const presenceBand = normalizePresenceBand(p.presenceBand);
  const chunkBudget = p.chunkBudgetKB;
  const cacheLines = p.cacheLines;
  const prewarmSlots = p.prewarmSlots;

  const surface =
    chunkBudget +
    cacheLines * 2 +
    prewarmSlots * 3 +
    cycleIndex;

  return {
    presenceVersion: "v16-IMMORTAL-MAX",
    presenceBand,
    presenceSignature: computeHash(
      `PRES_FIELD::${presenceBand}::${chunkBudget}::${cacheLines}::${prewarmSlots}::${surface}`
    ),
    chunkField: {
      chunkBudgetKB: chunkBudget,
      cacheLines,
      prewarmSlots,
      surface,
      parity: surface % 2 === 0 ? 0 : 1
    }
  };
}

// ---------------------------------------------------------------------------
// INTERNAL: Advantage‑M Skeletal Field (v16-IMMORTAL-MAX)
// ---------------------------------------------------------------------------
function buildSkeletalAdvantageField(p, presenceField, binaryField, waveField) {
  const gpuScore = p.gpuScore || 0;
  const bandwidth = p.bandwidthMbps || 0;
  const chunkBudget = p.chunkBudgetKB || 0;
  const cacheLines = p.cacheLines || 0;
  const prewarmSlots = p.prewarmSlots || 0;

  const density = binaryField.density || 0;
  const amplitude = waveField.amplitude || 0;

  const presenceTier =
    presenceField.presenceBand === "binary" ? "presence_high" : "presence_mid";

  const advantageScore =
    gpuScore * 0.0005 +
    bandwidth * 0.0002 +
    density * 0.00001 +
    amplitude * 0.00001 +
    (chunkBudget + cacheLines + prewarmSlots) * 0.000001 +
    (presenceTier === "presence_high" ? 0.01 : 0);

  const advantageField = {
    advantageVersion: "M-SKELETAL-16",
    band: normalizeBand(p.band),
    presenceBand: presenceField.presenceBand,
    gpuScore,
    bandwidth,
    binaryDensity: density,
    waveAmplitude: amplitude,
    chunkBudgetKB: chunkBudget,
    cacheLines,
    prewarmSlots,
    presenceTier,
    advantageScore
  };

  const advantageSignature = computeHash(
    `ADV_SKEL::${gpuScore}::${bandwidth}::${density}::${amplitude}::${chunkBudget}::${cacheLines}::${prewarmSlots}::${presenceTier}`
  );

  const intelSig = buildDualHashSignature("SKELETAL_ADVANTAGE_V16", {
    gpuScore,
    bandwidth,
    density,
    amplitude,
    chunkBudget,
    cacheLines,
    prewarmSlots,
    presenceTier,
    advantageScore
  });

  skeletalHealing.lastAdvantageField = advantageField;
  skeletalHealing.lastAdvantageSignature = advantageSignature;
  skeletalHealing.lastAdvantageIntelSig = intelSig;

  return { advantageField, advantageSignature, advantageIntelSig: intelSig };
}

// ---------------------------------------------------------------------------
// INTERNAL: Compatibility Field (v16-IMMORTAL-MAX)
// ---------------------------------------------------------------------------
//
// This exposes how well this skeletal phenotype can cooperate with:
//   - Muscle System
//   - Nervous System
//   - Lymph Nodes
//   - Endocrine System
//   - Embassy Ledger / Market Layer
//
function buildSkeletalCompatibilityField(p, advantageField) {
  const cpu = p.cpuCores;
  const mem = p.memoryMB;
  const gpu = p.gpuScore;
  const bw = p.bandwidthMbps;
  const stab = p.stabilityScore;

  const muscleAffinity =
    (gpu * 0.0005) +
    (cpu * 0.0002) +
    (advantageField.binaryDensity * 0.00001);

  const nervousAffinity =
    (bw * 0.0003) +
    (stab * 0.02) +
    (advantageField.waveAmplitude * 0.00001);

  const lymphAffinity =
    (bw * 0.0002) +
    (advantageField.chunkBudgetKB * 0.000001);

  const endocrineAffinity =
    (stab * 0.03) +
    (advantageField.cacheLines * 0.00001);

  const embassyAffinity =
    (cpu * 0.0001) +
    (mem * 0.000001) +
    (advantageField.presenceTier === "presence_high" ? 0.01 : 0);

  const compatibilityField = {
    compatibilityVersion: "SKELETAL_COMPAT_V16",
    muscleAffinity,
    nervousAffinity,
    lymphAffinity,
    endocrineAffinity,
    embassyAffinity
  };

  const compatibilitySignature = computeHash(
    `COMP_SKEL::${muscleAffinity.toFixed(6)}::${nervousAffinity.toFixed(6)}::${lymphAffinity.toFixed(6)}::${endocrineAffinity.toFixed(6)}::${embassyAffinity.toFixed(6)}`
  );

  const intelSig = buildDualHashSignature("SKELETAL_COMPAT_V16", {
    muscleAffinity,
    nervousAffinity,
    lymphAffinity,
    endocrineAffinity,
    embassyAffinity
  });

  skeletalHealing.lastCompatibilityField = compatibilityField;
  skeletalHealing.lastCompatibilitySignature = compatibilitySignature;
  skeletalHealing.lastCompatibilityIntelSig = intelSig;

  return { compatibilityField, compatibilitySignature, compatibilityIntelSig: intelSig };
}

// ---------------------------------------------------------------------------
// MAIN EXPORT — getPulseEarnDeviceProfile()
// Phenotype Passport + Structural Identity + Advantage‑M + Compatibility (v16)
// ---------------------------------------------------------------------------
export function getPulseEarnDeviceProfile() {
  skeletalHealing.cycleCount++;

  const band = normalizeBand(phenotype.band);
  const cycleIndex = skeletalHealing.cycleCount;

  const structuralSignature = buildStructuralSignature(phenotype);
  const physiologicalSignature = buildPhysiologicalSignature(phenotype);
  const phenotypeSignature = buildPhenotypeSignature(phenotype);
  const presenceSignature = buildPresenceSignature(phenotype);
  const devicePattern = buildDevicePattern(phenotype);
  const bandSignature = buildBandSignature(phenotype, cycleIndex);
  const binaryField = buildBinaryField(phenotype, cycleIndex);
  const waveField = buildWaveField(phenotype, cycleIndex);
  const presenceField = buildPresenceField(phenotype, cycleIndex);
  const { advantageField, advantageSignature, advantageIntelSig } =
    buildSkeletalAdvantageField(phenotype, presenceField, binaryField, waveField);
  const { compatibilityField, compatibilitySignature, compatibilityIntelSig } =
    buildSkeletalCompatibilityField(phenotype, advantageField);

  const phenotypeIntelSig = buildDualHashSignature("SKELETAL_PHENOTYPE_V16", {
    cpuCores: phenotype.cpuCores,
    memoryMB: phenotype.memoryMB,
    gpuScore: phenotype.gpuScore,
    bandwidthMbps: phenotype.bandwidthMbps,
    stabilityScore: phenotype.stabilityScore,
    band,
    presenceBand: presenceField.presenceBand
  });

  const structuralIntelSig = buildDualHashSignature("SKELETAL_STRUCT_V16", {
    cpuCores: phenotype.cpuCores,
    memoryMB: phenotype.memoryMB,
    gpuScore: phenotype.gpuScore
  });

  const physIntelSig = buildDualHashSignature("SKELETAL_PHYS_V16", {
    bandwidthMbps: phenotype.bandwidthMbps,
    stabilityScore: phenotype.stabilityScore
  });

  const presenceIntelSig = buildDualHashSignature("SKELETAL_PRESENCE_V16", {
    presenceBand: presenceField.presenceBand,
    chunkBudgetKB: presenceField.chunkField.chunkBudgetKB,
    cacheLines: presenceField.chunkField.cacheLines,
    prewarmSlots: presenceField.chunkField.prewarmSlots
  });

  const profile = {
    id: phenotype.id,

    // Structural capacity
    cpuCores: phenotype.cpuCores,
    memoryMB: phenotype.memoryMB,

    // Muscular potential
    gpuModel: phenotype.gpuModel,
    vramMB: phenotype.vramMB,
    gpuScore: phenotype.gpuScore,

    // Physiological baselines
    bandwidthMbps: phenotype.bandwidthMbps,
    stabilityScore: phenotype.stabilityScore,

    // A-B-A band identity
    band,
    bandSignature,

    // Presence identity
    presenceVersion: presenceField.presenceVersion,
    presenceBand: presenceField.presenceBand,
    presenceSignature,

    // v16 signatures
    structuralSignature,
    physiologicalSignature,
    phenotypeSignature,

    // v16 pattern surface
    devicePattern,

    // A-B-A binary + wave surfaces
    binaryField,
    waveField,

    // Presence + chunk/cache/prewarm field
    chunkField: presenceField.chunkField,

    // Skeletal Advantage‑M field
    advantageField,
    advantageSignature,
    advantageIntelSig,

    // Skeletal Compatibility field
    compatibilityField,
    compatibilitySignature,
    compatibilityIntelSig,

    // Extended capability envelope
    maxConcurrentJobs: phenotype.maxConcurrentJobs,
    maxMarketplaceStreams: phenotype.maxMarketplaceStreams,
    maxReflexDepth: phenotype.maxReflexDepth,
    maxPulseSendConcurrency: phenotype.maxPulseSendConcurrency,

    // v16 INTEL surfaces
    phenotypeIntelSig,
    structuralIntelSig,
    physIntelSig,
    presenceIntelSig
  };

  // Update healing metadata
  skeletalHealing.lastProfile = profile;
  skeletalHealing.lastGpuModel = phenotype.gpuModel;
  skeletalHealing.lastGpuScore = phenotype.gpuScore;
  skeletalHealing.lastBandwidthMbps = phenotype.bandwidthMbps;
  skeletalHealing.lastStabilityScore = phenotype.stabilityScore;

  skeletalHealing.lastStructuralSignature = structuralSignature;
  skeletalHealing.lastPhysiologicalSignature = physiologicalSignature;
  skeletalHealing.lastPhenotypeSignature = phenotypeSignature;
  skeletalHealing.lastPresenceSignature = presenceSignature;
  skeletalHealing.lastDevicePattern = devicePattern;

  skeletalHealing.lastBand = band;
  skeletalHealing.lastBandSignature = bandSignature;
  skeletalHealing.lastBinaryField = binaryField;
  skeletalHealing.lastWaveField = waveField;

  skeletalHealing.lastPresenceBand = presenceField.presenceBand;
  skeletalHealing.lastPresenceField = presenceField;
  skeletalHealing.lastChunkField = presenceField.chunkField;

  skeletalHealing.lastPhenotypeIntelSig = phenotypeIntelSig;
  skeletalHealing.lastStructuralIntelSig = structuralIntelSig;
  skeletalHealing.lastPhysIntelSig = physIntelSig;
  skeletalHealing.lastPresenceIntelSig = presenceIntelSig;

  return profile;
}

// ---------------------------------------------------------------------------
// Export Healing Metadata — Phenotype Health Report (v16-IMMORTAL-MAX)
// ---------------------------------------------------------------------------
export function getPulseEarnSkeletalHealingState() {
  return { ...skeletalHealing };
}
