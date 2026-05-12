// ============================================================================
// FILE: tropic-pulse-functions/PULSE-WORLD/PULSE-EARN/PulseEarnGenome-v24-Immortal-INTEL-PLUS.js
// LAYER: THE GENOME CORE (v24-Immortal-INTEL-PLUS)
// (Immutable DNA Sequence + Cross‑Organism Law + v24 Presence/Advantage/Compute Surfaces + Proof Bridge)
// ============================================================================
//
// ROLE (v24-Immortal-INTEL-PLUS):
//   THE GENOME CORE — the immutable DNA of Pulse‑Earn v24.
//   • Defines the canonical v13 job structure (genetic sequence) — schema remains v13, immutable.
//   • Establishes the cross‑organism treaty all subsystems must obey.
//   • Guarantees compatibility across every v24 Earn organ that still speaks v13 job DNA.
//   • Serves as the constitutional backbone of job identity and metabolism.
//   • Emits v24‑Presence‑IMMORTAL genome signatures + binary/wave/advantage/chunk surfaces.
//   • Emits v24 computeProfile + pulseIntelligence for the job schema itself (metadata‑only).
//   • Uses computeHashIntelligence as primary hash, with computeHash as deterministic fallback.
//   • Integrates with PulseProofBridge for core memory / proof surfaces.
//
// CONTRACT (v24-Immortal-INTEL-PLUS):
//   • PURE STATIC SCHEMA + PURE METADATA ENGINE — no job logic, no runtime behavior on jobs.
//   • NO dynamic fields, NO optional structural keys in the schema.
//   • NO timestamps, NO environment‑dependent fields.
//   • Immutable schema across versions unless explicitly ratified.
//   • v24‑IMMORTAL‑INTEL‑PLUS adds ONLY metadata + signatures OUTSIDE the schema.
//   • Presence/advantage/chunk/computeProfile/pulseIntelligence DO NOT change the schema.
//   • NO async, NO network, NO randomness, NO filesystem.
// ============================================================================

import {
  OrganismIdentity,
  buildPulseOrganismMap as PulseOrganismMap,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PULSE-WORLD-MAP.js";
const Identity = OrganismIdentity(import.meta.url);

// 2 — EXPORT GENOME METADATA
// export const PulseEarnCustomReceptorMeta = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

import { PulseProofBridge } from "../../PULSE-UI/_BACKEND/PULSE-WORLD-BRIDGE.js";


// ============================================================================
// INTERNAL: Deterministic Hash Helpers (v24-Immortal-INTEL-PLUS)
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
// HEALING METADATA — Genome Constitutional Health Log (v24-Immortal-INTEL-PLUS)
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
// v24 Presence / Advantage / Chunk / ComputeProfile / Intelligence
// ============================================================================

let genomeCycle = 0;

const genomeProof = new PulseProofBridge({
  namespace: "PulseEarnGenomeCore-v24-Immortal-INTEL-PLUS",
  layer: "GenomeCore",
  role: "GenomeProofSurface",
  version: "v24-Immortal-INTEL-PLUS",
  deterministic: true,
  driftProof: true
});

function buildPresenceFieldV24(globalHints = {}) {
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
    presenceVersion: "v24.0-Presence-Immortal-INTEL-PLUS",
    presenceTier,

    bandPresence: ghP.bandPresence || "symbolic",
    routerPresence: ghP.routerPresence || "stable",
    devicePresence: ghP.devicePresence || "genome-core",

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
      `GENOME_PRESENCE_V24::${presenceTier}::${meshPressureIndex}::${castleLoadLevel}`,
      "presenceFieldV24"
    )
  };

  genomeHealing.lastPresenceField = presenceField;
  return presenceField;
}

function buildBinaryFieldV24(schemaString, band) {
  const size = schemaString.length;
  const density = size + genomeCycle;
  const surface = density + size;

  const binaryField = {
    binaryGenomeSignature: hashIntelligent(
      `BGENOME_V24::${band}::${surface}`,
      "binaryGenome"
    ),
    binarySurfaceSignature: hashIntelligent(
      `BGENOME_SURF_V24::${surface}`,
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

function buildWaveFieldV24(schemaString, band) {
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

function buildAdvantageFieldV24(binaryField, waveField, presenceField, globalHints = {}) {
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
    advantageVersion: "C-24.0-INTEL-PLUS",
    advantageScore,
    advantageTier,
    fallbackBandLevel: globalHints.fallbackBandLevel ?? 0
  };

  genomeHealing.lastAdvantageField = advantageField;
  return advantageField;
}

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

  const chunkPlan = {
    planVersion: "v24.0-GenomeCore-AdvantageC-INTEL-PLUS",
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

function deriveFactoringSignalForGenomeV24({ meshPressureIndex = 0, size = 0, cachePriority = "normal" }) {
  const pressure = clamp01(meshPressureIndex / 100);
  const bigSchema = size >= 1024;
  const highPressure = pressure >= 0.7;
  const criticalCache = cachePriority === "critical";
  if (bigSchema || criticalCache || highPressure) return 1;
  return 0;
}

function buildComputeProfileV24({ band, globalHints = {}, presenceField, size = 0 }) {
  const b = normalizeBand(band);
  const hints = globalHints || {};
  const cacheHints = hints.cacheHints || {};
  const prewarmHints = hints.prewarmHints || {};

  const cachePriority = normalizeCachePriority(cacheHints.priority);
  const prewarmNeeded = !!prewarmHints.shouldPrewarm;
  const meshPressureIndex = presenceField.meshPressureIndex || 0;

  const factoringSignal = deriveFactoringSignalForGenomeV24({
    meshPressureIndex,
    size,
    cachePriority
  });

  const deepJobCandidate = size >= 2048 || cachePriority === "critical";

  const computeProfile = {
    computeProfileVersion: "v24.0-GenomeCore-INTEL-PLUS",
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

function computePulseIntelligenceForGenomeV24({ band, presenceField, advantageField, computeProfile, size }) {
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
    pulseIntelligenceVersion: "v24.0-GenomeCore-INTEL-PLUS",
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
// PUBLIC API — Genome Constitutional Surfaces (v24-Immortal-INTEL-PLUS)
// ============================================================================

export function buildPulseEarnGenomeConstitutionV24(dualBandContext = {}, globalHints = {}) {
  const band = normalizeBand(dualBandContext.band || "symbolic");
  genomeHealing.lastBand = band;
  genomeHealing.lastBandSignature = hashIntelligent(`GENOME_BAND_V24::${band}`, "genomeBand");

  const schemaString = JSON.stringify(PulseEarnJobSchemaV13);
  const size = schemaString.length;

  const presenceField = buildPresenceFieldV24(globalHints);
  const binaryField = buildBinaryFieldV24(schemaString, band);
  const waveField = buildWaveFieldV24(schemaString, band);
  const advantageField = buildAdvantageFieldV24(binaryField, waveField, presenceField, globalHints);
  const chunkPlan = buildChunkPrewarmPlanV24(presenceField, advantageField);
  const computeProfile = buildComputeProfileV24({
    band,
    globalHints,
    presenceField,
    size
  });
  const pulseIntelligence = computePulseIntelligenceForGenomeV24({
    band,
    presenceField,
    advantageField,
    computeProfile,
    size
  });

  const genomeSignature = hashIntelligent(
    `GENOME_CORE_V24::${band}::${schemaString.length}`,
    "genomeCore"
  );

  const constitutionalMetadata = {
    genomeVersion: "v24-Immortal-INTEL-PLUS",
    schemaVersion: "v13.0-Presence-Immortal",
    band,
    genomeSignature,
    presenceSignature: presenceField.presenceSignature,
    binarySignature: binaryField.binaryGenomeSignature,
    waveSignature: hashIntelligent(
      `WAVE_GENOME_V24::${waveField.amplitude}::${waveField.wavelength}::${waveField.phase}`,
      "waveGenome"
    ),
    advantageSignature: hashIntelligent(
      `ADV_GENOME_V24::${advantageField.advantageScore}::${advantageField.advantageTier}`,
      "advGenome"
    ),
    computeProfileSignature: hashIntelligent(
      `CP_GENOME_V24::${computeProfile.routeBand}::${computeProfile.cachePriority}::${computeProfile.factoringSignal}`,
      "cpGenome"
    ),
    pulseIntelligenceSignature: hashIntelligent(
      `PI_GENOME_V24::${pulseIntelligence.computeTier}::${pulseIntelligence.solvednessScore}`,
      "piGenome"
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

  genomeHealing.lastProofEventType = "constitution";
  genomeHealing.lastProofPayloadSize = JSON.stringify(proofPayload).length;

  genomeProof.write("constitution", proofPayload);

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
// v24‑IMMORTAL‑INTEL‑PLUS GENOME METADATA (NON‑STRUCTURAL, SAFE, IMMUTABLE)
// ============================================================================

export const PulseEarnGenomeMetadata = {
  genomeVersion: "24-Immortal-INTEL-PLUS",
  genomeIdentity: "PulseEarn-GenomeCore-v24-Immortal-INTEL-PLUS",
  genomeLayer: "GENOME_CORE",
  genomeRole: "Immutable DNA Sequence + Cross‑Organism Law (v13 schema, v24 surfaces + proof)",

  constitutionalPattern:
    "GENOME_V13::" +
    "id:string::marketplaceId:string::" +
    "payout:number::cpuRequired:number::memoryRequired:number::estimatedSeconds:number::" +
    "minGpuScore:number::bandwidthNeededMbps:number::" +
    "_abaBand:string::_abaBinaryDensity:number::_abaWaveAmplitude:number::" +
    "presenceField:PresenceFieldV13::advantageField:AdvantageFieldV13::chunkPlan:ChunkPrewarmPlanV13",

  genomeSignature: computeHash(JSON.stringify(PulseEarnJobSchemaV13)),
  genomeSignatureV24: hashIntelligent(
    "GENOME_CORE_V24::" + JSON.stringify(PulseEarnJobSchemaV13),
    "genomeMetadata"
  ),

  bandAware: true,
  dualBandReady: true,
  bandSignature_symbolic: hashIntelligent("band::symbolic::v24", "bandSymbolic"),
  bandSignature_binary: hashIntelligent("band::binary::v24", "bandBinary"),

  binaryGenomeSignature: hashIntelligent(
    "binary::v24::" + JSON.stringify(PulseEarnJobSchemaV13),
    "binaryGenomeMeta"
  ),

  binaryFieldSignatures: {
    id: hashIntelligent("binary::v24::id:string", "field:id"),
    marketplaceId: hashIntelligent("binary::v24::marketplaceId:string", "field:marketplaceId"),

    payout: hashIntelligent("binary::v24::payout:number", "field:payout"),
    cpuRequired: hashIntelligent("binary::v24::cpuRequired:number", "field:cpuRequired"),
    memoryRequired: hashIntelligent("binary::v24::memoryRequired:number", "field:memoryRequired"),
    estimatedSeconds: hashIntelligent("binary::v24::estimatedSeconds:number", "field:estimatedSeconds"),

    minGpuScore: hashIntelligent("binary::v24::minGpuScore:number", "field:minGpuScore"),
    bandwidthNeededMbps: hashIntelligent("binary::v24::bandwidthNeededMbps:number", "field:bandwidthNeededMbps"),

    _abaBand: hashIntelligent("binary::v24::_abaBand:string", "field:_abaBand"),
    _abaBinaryDensity: hashIntelligent("binary::v24::_abaBinaryDensity:number", "field:_abaBinaryDensity"),
    _abaWaveAmplitude: hashIntelligent("binary::v24::_abaWaveAmplitude:number", "field:_abaWaveAmplitude"),

    presenceField: hashIntelligent("binary::v24::presenceField:PresenceFieldV13", "field:presenceField"),
    advantageField: hashIntelligent("binary::v24::advantageField:AdvantageFieldV13", "field:advantageField"),
    chunkPlan: hashIntelligent("binary::v24::chunkPlan:ChunkPrewarmPlanV13", "field:chunkPlan")
  },

  waveSignature: hashIntelligent(
    "wave::v24::" + computeHash(JSON.stringify(PulseEarnJobSchemaV13)),
    "waveMeta"
  ),

  waveField: {
    wavelength: 24,
    amplitude: 9,
    phase: (24 + 9) % 16,
    mode: "symbolic-wave"
  },

  presenceFieldSignatures: {
    presenceVersionSignature: hashIntelligent("presence::v24::presenceVersion", "presence:version"),
    presenceTierSignature: hashIntelligent("presence::v24::presenceTier", "presence:tier"),
    bandPresenceSignature: hashIntelligent("presence::v24::bandPresence", "presence:band"),
    routerPresenceSignature: hashIntelligent("presence::v24::routerPresence", "presence:router"),
    devicePresenceSignature: hashIntelligent("presence::v24::devicePresence", "presence:device"),
    meshPresenceSignature: hashIntelligent("presence::v24::meshPresence", "presence:mesh"),
    castlePresenceSignature: hashIntelligent("presence::v24::castlePresence", "presence:castle"),
    regionPresenceSignature: hashIntelligent("presence::v24::regionPresence", "presence:region"),
    regionIdSignature: hashIntelligent("presence::v24::regionId", "presence:regionId"),
    castleIdSignature: hashIntelligent("presence::v24::castleId", "presence:castleId"),
    castleLoadLevelSignature: hashIntelligent("presence::v24::castleLoadLevel", "presence:castleLoad"),
    meshStrengthSignature: hashIntelligent("presence::v24::meshStrength", "presence:meshStrength"),
    meshPressureIndexSignature: hashIntelligent("presence::v24::meshPressureIndex", "presence:meshPressure"),
    cycleSignature: hashIntelligent("presence::v24::cycle", "presence:cycle")
  },

  advantageFieldSignatures: {
    advantageVersionSignature: hashIntelligent("advantage::v24::version", "adv:version"),
    advantageScoreSignature: hashIntelligent("advantage::v24::score", "adv:score"),
    advantageTierSignature: hashIntelligent("advantage::v24::tier", "adv:tier"),
    fallbackBandLevelSignature: hashIntelligent("advantage::v24::fallbackBandLevel", "adv:fallbackBandLevel")
  },

  hintsFieldSignatures: {
    fallbackBandLevelSignature: hashIntelligent("hints::v24::fallbackBandLevel", "hints:fallbackBandLevel"),
    chunkHintsSignature: hashIntelligent("hints::v24::chunkHints", "hints:chunkHints"),
    cacheHintsSignature: hashIntelligent("hints::v24::cacheHints", "hints:cacheHints"),
    prewarmHintsSignature: hashIntelligent("hints::v24::prewarmHints", "hints:prewarmHints"),
    coldStartHintsSignature: hashIntelligent("hints::v24::coldStartHints", "hints:coldStartHints")
  },

  computeProfileSignatures: {
    computeProfileVersionSignature: hashIntelligent("cp::v24::version", "cp:version"),
    routeBandSignature: hashIntelligent("cp::v24::routeBand", "cp:routeBand"),
    cachePrioritySignature: hashIntelligent("cp::v24::cachePriority", "cp:cachePriority"),
    prewarmNeededSignature: hashIntelligent("cp::v24::prewarmNeeded", "cp:prewarmNeeded"),
    factoringSignalSignature: hashIntelligent("cp::v24::factoringSignal", "cp:factoring"),
    deepJobCandidateSignature: hashIntelligent("cp::v24::deepJobCandidate", "cp:deepJob"),
    multiInstanceHintSignature: hashIntelligent("cp::v24::multiInstanceHint", "cp:multiInstance")
  },

  pulseIntelligenceSignatures: {
    piVersionSignature: hashIntelligent("pi::v24::version", "pi:version"),
    solvednessScoreSignature: hashIntelligent("pi::v24::solvednessScore", "pi:solvedness"),
    computeTierSignature: hashIntelligent("pi::v24::computeTier", "pi:computeTier"),
    readinessScoreSignature: hashIntelligent("pi::v24::readinessScore", "pi:readiness"),
    bandSignature: hashIntelligent("pi::v24::band", "pi:band"),
    advantageTierSignature: hashIntelligent("pi::v24::advantageTier", "pi:advTier"),
    sizeSignature: hashIntelligent("pi::v24::size", "pi:size")
  },

  fieldSignatures: {
    id: hashIntelligent("v24::id:string", "field:id"),
    marketplaceId: hashIntelligent("v24::marketplaceId:string", "field:marketplaceId"),

    payout: hashIntelligent("v24::payout:number", "field:payout"),
    cpuRequired: hashIntelligent("v24::cpuRequired:number", "field:cpuRequired"),
    memoryRequired: hashIntelligent("v24::memoryRequired:number", "field:memoryRequired"),
    estimatedSeconds: hashIntelligent("v24::estimatedSeconds:number", "field:estimatedSeconds"),

    minGpuScore: hashIntelligent("v24::minGpuScore:number", "field:minGpuScore"),
    bandwidthNeededMbps: hashIntelligent("v24::bandwidthNeededMbps:number", "field:bandwidthNeededMbps"),

    _abaBand: hashIntelligent("v24::_abaBand:string", "field:_abaBand"),
    _abaBinaryDensity: hashIntelligent("v24::_abaBinaryDensity:number", "field:_abaBinaryDensity"),
    _abaWaveAmplitude: hashIntelligent("v24::_abaWaveAmplitude:number", "field:_abaWaveAmplitude"),

    presenceField: hashIntelligent("v24::presenceField:PresenceFieldV13", "field:presenceField"),
    advantageField: hashIntelligent("v24::advantageField:AdvantageFieldV13", "field:advantageField"),
    chunkPlan: hashIntelligent("v24::chunkPlan:ChunkPrewarmPlanV13", "field:chunkPlan")
  }
};

// ============================================================================
// Healing State Export
// ============================================================================

export function getPulseEarnGenomeHealingState() {
  return { ...genomeHealing };
}
