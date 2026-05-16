// ============================================================================
// FILE: PULSE-WORLD-OS/PULSE-MULTIVERSE/PULSEWORLD/PULSE-EARN/
//       PulseEarnGenome-v30-Immortal-INTEL-PLUSPLUS.js
// LAYER: THE GENOME CORE (v30-Immortal-INTEL-PLUSPLUS)
// (Immutable DNA Sequence + Cross‑Organism Law + v30 Presence/Advantage/Compute Surfaces + Proof Bridge)
// ============================================================================
//
// ROLE (v30-Immortal-INTEL-PLUSPLUS):
//   THE GENOME CORE — the immutable DNA of Pulse‑Earn v30++.
//   • Defines the canonical v13 job structure (genetic sequence) — schema remains v13, immutable.
//   • Establishes the cross‑organism treaty all subsystems must obey.
//   • Guarantees compatibility across every v30 Earn organ that still speaks v13 job DNA.
//   • Serves as the constitutional backbone of job identity and metabolism.
//   • Emits v30‑Presence‑IMMORTAL genome signatures + binary/wave/advantage/chunk surfaces.
//   • Emits v30 computeProfile + pulseIntelligence for the job schema itself (metadata‑only).
//   • Uses computeHashIntelligence as primary hash, with computeHash as deterministic fallback.
//   • Integrates with PulseProofBridge for core memory / proof surfaces.
//
// CONTRACT (v30-Immortal-INTEL-PLUSPLUS):
//   • PURE STATIC SCHEMA + PURE METADATA ENGINE — no job logic, no runtime behavior on jobs.
//   • NO dynamic fields, NO optional structural keys in the schema.
//   • NO timestamps, NO environment‑dependent fields.
//   • Immutable schema across versions unless explicitly ratified.
//   • v30‑IMMORTAL‑INTEL‑PLUSPLUS adds ONLY metadata + signatures OUTSIDE the schema.
//   • Presence/advantage/chunk/computeProfile/pulseIntelligence DO NOT change the schema.
//   • NO async, NO network, NO randomness, NO filesystem.
// ============================================================================

import { PulseProofBridge } from "../../PULSEVISION/____BACKEND/PULSE-WORLD-BRIDGE.js";

// ============================================================================
// INTERNAL: Deterministic Hash Helpers (v30-Immortal-INTEL-PLUSPLUS)
// ============================================================================

function computeHash(str) {
  let h = 0;
  const s = String(str);
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `h${h}`;
}

function computeHashIntelligence(str, context = "") {
  const s = String(str || "");
  const c = String(context || "");
  const combined = s + "::" + c;

  let h = 2166136261 >>> 0;
  for (let i = 0; i < combined.length; i++) {
    h ^= combined.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
    h = (h + ((i + 1) * 131)) >>> 0;
  }

  const reduced = h % 100000;
  return `hi${reduced}`;
}

function hashIntelligent(str, context) {
  try {
    return computeHashIntelligence(str, context);
  } catch (_e) {
    return computeHash(str + "::" + String(context || ""));
  }
}

function classifyPresenceTier(pressure) {
  if (pressure >= 150) return "critical";
  if (pressure >= 100) return "high";
  if (pressure >= 50) return "elevated";
  if (pressure > 0) return "soft";
  return "idle";
}

function normalizeBand(band) {
  const b = String(band || "symbolic").toLowerCase();
  return b === "binary" ? "binary" : "symbolic";
}

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

// ============================================================================
// HEALING METADATA — Genome Constitutional Health Log (v30-Immortal-INTEL-PLUSPLUS)
// ============================================================================

const genomeHealing = {
  cycleCount: 0,
  lastBand: "symbolic",
  lastBandSignature: null,

  lastPresenceField: null,
  lastBinaryField: null,
  lastWaveField: null,
  lastAdvantageField: null,
  lastChunkPlan: null,
  lastComputeProfile: null,
  lastPulseIntelligence: null,

  lastGenomeSignature: null,
  lastConstitutionalMetadata: null,

  lastProofEventType: null,
  lastProofPayloadSize: null,
  lastError: null
};

// ============================================================================
// THE IMMUTABLE GENOME CORE — v13 JOB SCHEMA (STRUCTURE CANNOT CHANGE)
// ============================================================================

export const PulseEarnJobSchemaV13 = {
  id: "string",
  marketplaceId: "string",

  payout: "number",
  cpuRequired: "number",
  memoryRequired: "number",
  estimatedSeconds: "number",

  minGpuScore: "number",
  bandwidthNeededMbps: "number",

  _abaBand: "string",
  _abaBinaryDensity: "number",
  _abaWaveAmplitude: "number",

  presenceField: "PresenceFieldV13",
  advantageField: "AdvantageFieldV13",
  chunkPlan: "ChunkPrewarmPlanV13"
};

// ============================================================================
// v30 Presence / Advantage / Chunk / ComputeProfile / Intelligence
// ============================================================================

let genomeCycle = 0;

const genomeProof = new PulseProofBridge({
  namespace: "PulseEarnGenomeCore-v30-Immortal-INTEL-PLUSPLUS",
  layer: "GenomeCore",
  role: "GenomeProofSurface",
  version: "v30-Immortal-INTEL-PLUSPLUS",
  deterministic: true,
  driftProof: true,
  epoch: 30
});

function buildPresenceFieldV30(globalHints = {}) {
  genomeCycle++;
  genomeHealing.cycleCount = genomeCycle;

  const ghP = globalHints.presenceContext || {};
  const mesh = globalHints.meshSignals || {};
  const castle = globalHints.castleSignals || {};
  const region = globalHints.regionContext || {};

  const meshStrength = Number(mesh.meshStrength || 0);
  const meshPressureExternal = Number(mesh.meshPressureIndex || 0);
  const castleLoadExternal = Number(castle.loadLevel || 0);

  const internalComposite = genomeCycle * 0.0001;
  const internalPressure = Math.floor(internalComposite * 1000);

  const meshPressureIndex = meshPressureExternal + internalPressure;
  const castleLoadLevel = castleLoadExternal;

  const pressure = meshPressureIndex + castleLoadLevel;
  const presenceTier = classifyPresenceTier(pressure);

  const presenceField = {
    presenceVersion: "v30.0-Presence-Immortal-INTEL-PLUSPLUS",
    presenceEpoch: 30,
    presenceTier,

    bandPresence: ghP.bandPresence || "symbolic",
    routerPresence: ghP.routerPresence || "stable",
    devicePresence: ghP.devicePresence || "genome-core",
    presenceLayer: "GENOME_CORE",
    presenceBandMode: "dual-band-v30",

    meshPresence: ghP.meshPresence || (meshStrength > 0 ? "mesh-active" : "mesh-idle"),
    castlePresence: ghP.castlePresence || castle.castlePresence || "genome-region",
    regionPresence: ghP.regionPresence || region.regionTag || "unknown-region",

    regionId: region.regionId || "genome-region",
    castleId: castle.castleId || "genome-castle",

    meshStrength,
    meshPressureIndex,
    castleLoadLevel,

    cycle: genomeCycle,

    presenceSignature: hashIntelligent(
      `GENOME_PRESENCE_V30::${presenceTier}::${meshPressureIndex}::${castleLoadLevel}`,
      "presenceFieldV30"
    )
  };

  genomeHealing.lastPresenceField = presenceField;
  return presenceField;
}

function buildBinaryFieldV30(schemaString, band) {
  const size = schemaString.length;
  const density = size + genomeCycle;
  const surface = density + size;

  const binaryField = {
    binaryGenomeSignature: hashIntelligent(
      `BGENOME_V30::${band}::${surface}`,
      "binaryGenome"
    ),
    binarySurfaceSignature: hashIntelligent(
      `BGENOME_SURF_V30::${surface}`,
      "binarySurface"
    ),
    binarySurface: {
      size,
      density,
      surface
    },
    parity: surface % 2 === 0 ? 0 : 1,
    shiftDepth: Math.max(0, Math.floor(Math.log2(surface || 1)))
  };

  genomeHealing.lastBinaryField = binaryField;
  return binaryField;
}

function buildWaveFieldV30(schemaString, band) {
  const size = schemaString.length;
  const amplitude = size + genomeCycle;
  const wavelength = genomeCycle + 1;
  const phase = (size + genomeCycle) % 16;

  const waveField = {
    amplitude,
    wavelength,
    phase,
    band,
    mode: band === "binary" ? "compression-wave" : "symbolic-wave"
  };

  genomeHealing.lastWaveField = waveField;
  return waveField;
}

function buildAdvantageFieldV30(binaryField, waveField, presenceField, globalHints = {}) {
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

  const advantageScore = baseScore + presenceBoost;

  let advantageTier = 0;
  if (advantageScore >= 0.05) advantageTier = 3;
  else if (advantageScore >= 0.02) advantageTier = 2;
  else if (advantageScore > 0) advantageTier = 1;

  const advantageField = {
    advantageVersion: "C-30.0-INTEL-PLUSPLUS",
    advantageEpoch: 30,
    advantageProfile: "Earn-v30++",
    advantageScore,
    advantageTier,
    fallbackBandLevel: globalHints.fallbackBandLevel ?? 0
  };

  genomeHealing.lastAdvantageField = advantageField;
  return advantageField;
}

function buildChunkPrewarmPlanV30(presenceField, advantageField) {
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

  const chunkPlan = {
    planVersion: "v30.0-GenomeCore-AdvantageC-INTEL-PLUSPLUS",
    planEpoch: 30,
    planContinuanceAware: true,
    planGenomeAware: true,
    priority: basePriority + advantageBoost,
    band: presenceField.presenceTier,
    chunks: {
      genomeConstitution: true,
      jobSchemaBlueprint: true
    },
    cache: {
      genomeDiagnostics: true
    },
    prewarm: {
      nervousSystem: true,
      muscleSystem: true,
      lymphNodes: true
    }
  };

  genomeHealing.lastChunkPlan = chunkPlan;
  return chunkPlan;
}

function deriveFactoringSignalForGenomeV30({ meshPressureIndex = 0, size = 0, cachePriority = "normal" }) {
  const pressure = clamp01(meshPressureIndex / 100);
  const bigSchema = size >= 1024;
  const highPressure = pressure >= 0.7;
  const criticalCache = cachePriority === "critical";
  if (bigSchema || criticalCache || highPressure) return 1;
  return 0;
}

function buildComputeProfileV30({ band, globalHints = {}, presenceField, size = 0 }) {
  const b = normalizeBand(band);
  const hints = globalHints || {};
  const cacheHints = hints.cacheHints || {};
  const prewarmHints = hints.prewarmHints || {};

  const cachePriority = normalizeCachePriority(cacheHints.priority);
  const prewarmNeeded = !!prewarmHints.shouldPrewarm;
  const meshPressureIndex = presenceField.meshPressureIndex || 0;

  const factoringSignal = deriveFactoringSignalForGenomeV30({
    meshPressureIndex,
    size,
    cachePriority
  });

  const deepJobCandidate = size >= 2048 || cachePriority === "critical";

  const computeProfile = {
    computeProfileVersion: "v30.0-GenomeCore-INTEL-PLUSPLUS",
    computeProfileEpoch: 30,
    routeBand: b,
    fallbackBandLevel: hints.fallbackBandLevel ?? 0,
    chunkAggression: (hints.chunkHints && hints.chunkHints.chunkAggression) ?? 0,
    cachePriority,
    prewarmNeeded,
    binaryPreferred: b === "binary",
    symbolicPreferred: b === "symbolic",
    factoringSignal,
    performanceRatio: 1,
    deepJobCandidate,
    multiInstanceHint: deepJobCandidate
  };

  genomeHealing.lastComputeProfile = computeProfile;
  return computeProfile;
}

function computePulseIntelligenceForGenomeV30({ band, presenceField, advantageField, computeProfile, size }) {
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

  const sizeWeight = Math.max(0, Math.min(size / 4096, 1));

  const solvednessScore = Math.max(
    0,
    Math.min(
      advantageScore * 10 * 0.3 +
      presenceWeight * 0.25 +
      sizeWeight * 0.25 +
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

  const pulseIntelligence = {
    pulseIntelligenceVersion: "v30.0-GenomeCore-INTEL-PLUSPLUS",
    pulseIntelligenceEpoch: 30,
    solvednessScore,
    factoringSignal: factoring ? "high" : "low",
    computeTier,
    readinessScore,
    band,
    advantageTier,
    size
  };

  genomeHealing.lastPulseIntelligence = pulseIntelligence;
  return pulseIntelligence;
}

// ============================================================================
// PUBLIC API — Genome Constitutional Surfaces (v30-Immortal-INTEL-PLUSPLUS)
// ============================================================================

export function buildPulseEarnGenomeConstitutionV30(dualBandContext = {}, globalHints = {}) {
  const band = normalizeBand(dualBandContext.band || "symbolic");
  genomeHealing.lastBand = band;
  genomeHealing.lastBandSignature = hashIntelligent(`GENOME_BAND_V30::${band}`, "genomeBandV30");

  const schemaString = JSON.stringify(PulseEarnJobSchemaV13);
  const size = schemaString.length;

  const presenceField = buildPresenceFieldV30(globalHints);
  const binaryField = buildBinaryFieldV30(schemaString, band);
  const waveField = buildWaveFieldV30(schemaString, band);
  const advantageField = buildAdvantageFieldV30(binaryField, waveField, presenceField, globalHints);
  const chunkPlan = buildChunkPrewarmPlanV30(presenceField, advantageField);
  const computeProfile = buildComputeProfileV30({
    band,
    globalHints,
    presenceField,
    size
  });
  const pulseIntelligence = computePulseIntelligenceForGenomeV30({
    band,
    presenceField,
    advantageField,
    computeProfile,
    size
  });

  const genomeSignature = hashIntelligent(
    `GENOME_CORE_V30::${band}::${schemaString.length}`,
    "genomeCoreV30"
  );

  const constitutionalMetadata = {
    genomeVersion: "v30-Immortal-INTEL-PLUSPLUS",
    genomeEpoch: 30,
    schemaVersion: "v13.0-Presence-Immortal",
    band,
    genomeSignature,
    presenceSignature: presenceField.presenceSignature,
    binarySignature: binaryField.binaryGenomeSignature,
    waveSignature: hashIntelligent(
      `WAVE_GENOME_V30::${waveField.amplitude}::${waveField.wavelength}::${waveField.phase}`,
      "waveGenomeV30"
    ),
    advantageSignature: hashIntelligent(
      `ADV_GENOME_V30::${advantageField.advantageScore}::${advantageField.advantageTier}`,
      "advGenomeV30"
    ),
    computeProfileSignature: hashIntelligent(
      `CP_GENOME_V30::${computeProfile.routeBand}::${computeProfile.cachePriority}::${computeProfile.factoringSignal}`,
      "cpGenomeV30"
    ),
    pulseIntelligenceSignature: hashIntelligent(
      `PI_GENOME_V30::${pulseIntelligence.computeTier}::${pulseIntelligence.solvednessScore}`,
      "piGenomeV30"
    )
  };

  genomeHealing.lastGenomeSignature = genomeSignature;
  genomeHealing.lastConstitutionalMetadata = constitutionalMetadata;
  genomeHealing.lastError = null;

  const proofPayload = {
    band,
    size,
    cycle: genomeCycle,
    presenceField,
    binaryField,
    waveField,
    advantageField,
    chunkPlan,
    computeProfile,
    pulseIntelligence,
    constitutionalMetadata
  };

  genomeHealing.lastProofEventType = "constitution-v30";
  genomeHealing.lastProofPayloadSize = JSON.stringify(proofPayload).length;

  genomeProof.write("constitution-v30", proofPayload);

  return {
    genomeSignatures: {
      genomeSignature,
      bandSignature: genomeHealing.lastBandSignature
    },
    binaryField,
    waveField,
    presenceField,
    advantageField,
    chunkPlan,
    computeProfile,
    pulseIntelligence,
    constitutionalMetadata,
    genomeHealingState: { ...genomeHealing }
  };
}

// ============================================================================
// v30‑IMMORTAL‑INTEL‑PLUSPLUS GENOME METADATA (NON‑STRUCTURAL, SAFE, IMMUTABLE)
// ============================================================================

export const PulseEarnGenomeMetadataV30 = {
  genomeVersion: "30-Immortal-INTEL-PLUSPLUS",
  genomeEpoch: 30,
  genomeIdentity: "PulseEarn-GenomeCore-v30-Immortal-INTEL-PLUSPLUS",
  genomeLayer: "GENOME_CORE",
  genomeRole: "Immutable DNA Sequence + Cross‑Organism Law (v13 schema, v30 surfaces + proof)",

  constitutionalPattern:
    "GENOME_V13::" +
    "id:string::marketplaceId:string::" +
    "payout:number::cpuRequired:number::memoryRequired:number::estimatedSeconds:number::" +
    "minGpuScore:number::bandwidthNeededMbps:number::" +
    "_abaBand:string::_abaBinaryDensity:number::_abaWaveAmplitude:number::" +
    "presenceField:PresenceFieldV13::advantageField:AdvantageFieldV13::chunkPlan:ChunkPrewarmPlanV13",

  genomeSignature: computeHash(JSON.stringify(PulseEarnJobSchemaV13)),
  genomeSignatureV30: hashIntelligent(
    "GENOME_CORE_V30::" + JSON.stringify(PulseEarnJobSchemaV13),
    "genomeMetadataV30"
  ),

  bandAware: true,
  dualBandReady: true,
  bandSignature_symbolic: hashIntelligent("band::symbolic::v30", "bandSymbolicV30"),
  bandSignature_binary: hashIntelligent("band::binary::v30", "bandBinaryV30"),

  binaryGenomeSignature: hashIntelligent(
    "binary::v30::" + JSON.stringify(PulseEarnJobSchemaV13),
    "binaryGenomeMetaV30"
  ),

  binaryFieldSignatures: {
    id: hashIntelligent("binary::v30::id:string", "field:id"),
    marketplaceId: hashIntelligent("binary::v30::marketplaceId:string", "field:marketplaceId"),

    payout: hashIntelligent("binary::v30::payout:number", "field:payout"),
    cpuRequired: hashIntelligent("binary::v30::cpuRequired:number", "field:cpuRequired"),
    memoryRequired: hashIntelligent("binary::v30::memoryRequired:number", "field:memoryRequired"),
    estimatedSeconds: hashIntelligent("binary::v30::estimatedSeconds:number", "field:estimatedSeconds"),

    minGpuScore: hashIntelligent("binary::v30::minGpuScore:number", "field:minGpuScore"),
    bandwidthNeededMbps: hashIntelligent("binary::v30::bandwidthNeededMbps:number", "field:bandwidthNeededMbps"),

    _abaBand: hashIntelligent("binary::v30::_abaBand:string", "field:_abaBand"),
    _abaBinaryDensity: hashIntelligent("binary::v30::_abaBinaryDensity:number", "field:_abaBinaryDensity"),
    _abaWaveAmplitude: hashIntelligent("binary::v30::_abaWaveAmplitude:number", "field:_abaWaveAmplitude"),

    presenceField: hashIntelligent("binary::v30::presenceField:PresenceFieldV13", "field:presenceField"),
    advantageField: hashIntelligent("binary::v30::advantageField:AdvantageFieldV13", "field:advantageField"),
    chunkPlan: hashIntelligent("binary::v30::chunkPlan:ChunkPrewarmPlanV13", "field:chunkPlan")
  },

  waveSignature: hashIntelligent(
    "wave::v30::" + computeHash(JSON.stringify(PulseEarnJobSchemaV13)),
    "waveMetaV30"
  ),

  waveField: {
    wavelength: 30,
    amplitude: 11,
    phase: (30 + 11) % 16,
    mode: "symbolic-wave"
  },

  presenceFieldSignatures: {
    presenceVersionSignature: hashIntelligent("presence::v30::presenceVersion", "presence:versionV30"),
    presenceEpochSignature: hashIntelligent("presence::v30::presenceEpoch", "presence:epochV30"),
    presenceTierSignature: hashIntelligent("presence::v30::presenceTier", "presence:tierV30"),
    bandPresenceSignature: hashIntelligent("presence::v30::bandPresence", "presence:bandV30"),
    routerPresenceSignature: hashIntelligent("presence::v30::routerPresence", "presence:routerV30"),
    devicePresenceSignature: hashIntelligent("presence::v30::devicePresence", "presence:deviceV30"),
    meshPresenceSignature: hashIntelligent("presence::v30::meshPresence", "presence:meshV30"),
    castlePresenceSignature: hashIntelligent("presence::v30::castlePresence", "presence:castleV30"),
    regionPresenceSignature: hashIntelligent("presence::v30::regionPresence", "presence:regionV30"),
    regionIdSignature: hashIntelligent("presence::v30::regionId", "presence:regionIdV30"),
    castleIdSignature: hashIntelligent("presence::v30::castleId", "presence:castleIdV30"),
    castleLoadLevelSignature: hashIntelligent("presence::v30::castleLoadLevel", "presence:castleLoadV30"),
    meshStrengthSignature: hashIntelligent("presence::v30::meshStrength", "presence:meshStrengthV30"),
    meshPressureIndexSignature: hashIntelligent("presence::v30::meshPressureIndex", "presence:meshPressureV30"),
    cycleSignature: hashIntelligent("presence::v30::cycle", "presence:cycleV30")
  },

  advantageFieldSignatures: {
    advantageVersionSignature: hashIntelligent("advantage::v30::version", "adv:versionV30"),
    advantageEpochSignature: hashIntelligent("advantage::v30::epoch", "adv:epochV30"),
    advantageProfileSignature: hashIntelligent("advantage::v30::profile", "adv:profileV30"),
    advantageScoreSignature: hashIntelligent("advantage::v30::score", "adv:scoreV30"),
    advantageTierSignature: hashIntelligent("advantage::v30::tier", "adv:tierV30"),
    fallbackBandLevelSignature: hashIntelligent("advantage::v30::fallbackBandLevel", "adv:fallbackBandLevelV30")
  },

  hintsFieldSignatures: {
    fallbackBandLevelSignature: hashIntelligent("hints::v30::fallbackBandLevel", "hints:fallbackBandLevelV30"),
    chunkHintsSignature: hashIntelligent("hints::v30::chunkHints", "hints:chunkHintsV30"),
    cacheHintsSignature: hashIntelligent("hints::v30::cacheHints", "hints:cacheHintsV30"),
    prewarmHintsSignature: hashIntelligent("hints::v30::prewarmHints", "hints:prewarmHintsV30"),
    coldStartHintsSignature: hashIntelligent("hints::v30::coldStartHints", "hints:coldStartHintsV30")
  },

  computeProfileSignatures: {
    computeProfileVersionSignature: hashIntelligent("cp::v30::version", "cp:versionV30"),
    computeProfileEpochSignature: hashIntelligent("cp::v30::epoch", "cp:epochV30"),
    routeBandSignature: hashIntelligent("cp::v30::routeBand", "cp:routeBandV30"),
    cachePrioritySignature: hashIntelligent("cp::v30::cachePriority", "cp:cachePriorityV30"),
    prewarmNeededSignature: hashIntelligent("cp::v30::prewarmNeeded", "cp:prewarmNeededV30"),
    factoringSignalSignature: hashIntelligent("cp::v30::factoringSignal", "cp:factoringV30"),
    deepJobCandidateSignature: hashIntelligent("cp::v30::deepJobCandidate", "cp:deepJobV30"),
    multiInstanceHintSignature: hashIntelligent("cp::v30::multiInstanceHint", "cp:multiInstanceV30")
  },

  pulseIntelligenceSignatures: {
    piVersionSignature: hashIntelligent("pi::v30::version", "pi:versionV30"),
    piEpochSignature: hashIntelligent("pi::v30::epoch", "pi:epochV30"),
    solvednessScoreSignature: hashIntelligent("pi::v30::solvednessScore", "pi:solvednessV30"),
    computeTierSignature: hashIntelligent("pi::v30::computeTier", "pi:computeTierV30"),
    readinessScoreSignature: hashIntelligent("pi::v30::readinessScore", "pi:readinessV30"),
    bandSignature: hashIntelligent("pi::v30::band", "pi:bandV30"),
    advantageTierSignature: hashIntelligent("pi::v30::advantageTier", "pi:advTierV30"),
    sizeSignature: hashIntelligent("pi::v30::size", "pi:sizeV30")
  },

  fieldSignatures: {
    id: hashIntelligent("v30::id:string", "field:idV30"),
    marketplaceId: hashIntelligent("v30::marketplaceId:string", "field:marketplaceIdV30"),

    payout: hashIntelligent("v30::payout:number", "field:payoutV30"),
    cpuRequired: hashIntelligent("v30::cpuRequired:number", "field:cpuRequiredV30"),
    memoryRequired: hashIntelligent("v30::memoryRequired:number", "field:memoryRequiredV30"),
    estimatedSeconds: hashIntelligent("v30::estimatedSeconds:number", "field:estimatedSecondsV30"),

    minGpuScore: hashIntelligent("v30::minGpuScore:number", "field:minGpuScoreV30"),
    bandwidthNeededMbps: hashIntelligent("v30::bandwidthNeededMbps:number", "field:bandwidthNeededMbpsV30"),

    _abaBand: hashIntelligent("v30::_abaBand:string", "field:_abaBandV30"),
    _abaBinaryDensity: hashIntelligent("v30::_abaBinaryDensity:number", "field:_abaBinaryDensityV30"),
    _abaWaveAmplitude: hashIntelligent("v30::_abaWaveAmplitude:number", "field:_abaWaveAmplitudeV30"),

    presenceField: hashIntelligent("v30::presenceField:PresenceFieldV13", "field:presenceFieldV30"),
    advantageField: hashIntelligent("v30::advantageField:AdvantageFieldV13", "field:advantageFieldV30"),
    chunkPlan: hashIntelligent("v30::chunkPlan:ChunkPrewarmPlanV13", "field:chunkPlanV30")
  }
};

// ============================================================================
// Healing State Export
// ============================================================================

export function getPulseEarnGenomeHealingStateV30() {
  return { ...genomeHealing };
}

export default {
  PulseEarnJobSchemaV13,
  buildPulseEarnGenomeConstitutionV30,
  PulseEarnGenomeMetadataV30,
  getPulseEarnGenomeHealingStateV30
};
