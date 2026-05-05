// ============================================================================
// FILE: tropic-pulse-functions/PULSE-WORLD/PULSE-EARN/PulseEarnGenome-v16-Immortal-INTEL.js
// LAYER: THE GENOME CORE (v16-Immortal-INTEL)
// (Immutable DNA Sequence + Cross‑Organism Law + v16 Presence/Advantage/Compute Surfaces)
// ============================================================================
//
// ROLE (v16-Immortal-INTEL):
//   THE GENOME CORE — the immutable DNA of Pulse‑Earn v16.
//   • Defines the canonical v13 job structure (genetic sequence) — schema remains v13, immutable.
//   • Establishes the cross‑organism treaty all subsystems must obey.
//   • Guarantees compatibility across every v16 Earn organ that still speaks v13 job DNA.
//   • Serves as the constitutional backbone of job identity and metabolism.
//   • Emits v16‑Presence‑IMMORTAL genome signatures + binary/wave/advantage/chunk surfaces.
//   • Emits v16 computeProfile + pulseIntelligence for the job schema itself (metadata‑only).
//   • Uses computeHashIntelligence as primary hash, with computeHash as deterministic fallback.
//
// PURPOSE (v16-Immortal-INTEL):
//   • Provide a deterministic, drift‑proof v13 job format as the constitutional layer for v16.
//   • Ensure universal compatibility across all Earn v16 layers that consume v13 jobs.
//   • Serve as the legal + biological foundation for job execution, routing, healing, archival.
//   • Provide signature‑rich constitutional metadata, presence‑aware and compute‑aware (metadata‑only).
//
// CONTRACT (v16-Immortal-INTEL):
//   • PURE STATIC SCHEMA + PURE METADATA ENGINE — no job logic, no runtime behavior on jobs.
//   • NO dynamic fields, NO optional structural keys in the schema.
//   • NO timestamps, NO environment‑dependent fields.
//   • Immutable schema across versions unless explicitly ratified.
//   • v16‑IMMORTAL‑INTEL adds ONLY metadata + signatures OUTSIDE the schema.
//   • Presence/advantage/chunk/computeProfile/pulseIntelligence DO NOT change the schema.
//   • NO async, NO network, NO randomness, NO filesystem.
// ============================================================================
/*
AI_EXPERIENCE_META = {
  identity: "PulseEarnGenome",
  version: "v16-Immortal-INTEL",
  layer: "earn_genome",
  role: "earn_genetic_blueprint",
  lineage: "PulseEarnGenome-v9 → v10 → v11 → v12.3 → v13 → v14 → v16-Immortal-INTEL",

  evo: {
    earnGenome: true,
    jobDNA: true,
    lineageTracking: true,
    mutationProof: true,
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
    waveFieldAware: true,
    chunkPrewarmAware: true,

    computeProfileAware: true,
    pulseIntelligenceAware: true,
    factoringAware: true,
    deepJobAware: true,
    multiInstanceHints: true,

    hashIntelligencePrimary: true,
    legacyHashFallback: true
  },

  contract: {
    always: [
      "PulseEarnHeart",
      "PulseEarnMetabolism",
      "PulseEarnGeneticMemory",
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

export const PulseEarnGenomeCoreMeta = Object.freeze({
  layer: "PulseEarnGenomeCore",
  role: "EARN_GENOME_CORE",
  version: "v16-Immortal-INTEL",
  identity: "PulseEarnGenomeCore-v16-Immortal-INTEL",

  guarantees: Object.freeze({
    deterministic: true,
    immutable: true,
    driftProof: true,
    noRandomness: true,
    noRealTime: true,
    noExternalIO: true,
    pureStaticSchema: true,
    dualBandAware: true,
    binaryAware: true,
    waveFieldAware: true,
    presenceAware: true,
    advantageAware: true,
    hintsAware: true,
    chunkPrewarmAware: true,
    computeProfileAware: true,
    pulseIntelligenceAware: true,
    factoringAware: true,
    deepJobAware: true,
    multiInstanceHints: true,
    worldLensAware: false,
    constitutional: true,
    hashIntelligencePrimary: true,
    legacyHashFallback: true
  }),

  contract: Object.freeze({
    input: [
      "PulseEarnJobSchemaV13 (immutable)",
      "DualBandContext (metadata-only)",
      "GlobalHintsPresenceField (metadata-only)"
    ],
    output: [
      "GenomeSignatures",
      "BinaryFieldSignatures",
      "WaveFieldSignatures",
      "PresenceFieldSignatures",
      "AdvantageFieldSignatures",
      "ChunkPrewarmPlan",
      "ComputeProfile",
      "PulseIntelligence",
      "ConstitutionalMetadata"
    ]
  }),

  lineage: Object.freeze({
    root: "PulseOS-v11-Evo",
    parent: "PulseEarn-v16-Immortal-INTEL",
    ancestry: [
      "PulseEarnGenomeCore-v9",
      "PulseEarnGenomeCore-v10",
      "PulseEarnGenomeCore-v11",
      "PulseEarnGenomeCore-v11-Evo",
      "PulseEarnGenomeCore-v12.3-Presence-Evo+",
      "PulseEarnGenomeCore-v13.0-Presence-Immortal"
    ]
  }),

  bands: Object.freeze({
    supported: ["symbolic", "binary"],
    default: "symbolic",
    behavior: "metadata-only"
  }),

  architecture: Object.freeze({
    pattern: "A-B-A",
    baseline: "immutable static schema",
    adaptive: "signature surfaces (binary + wave + presence/advantage/hints/compute)",
    return: "deterministic constitutional metadata"
  })
});

// ============================================================================
// INTERNAL: Deterministic Hash Helpers (v16-Immortal-INTEL)
// ============================================================================
//
// computeHashIntelligence:
//   • Primary hash for v16 surfaces.
//   • Deterministic, pure, no randomness.
//   • Mixes a simple FNV‑style core with positional weighting and band/context salt.
//   • Still bounded and cheap; safe for hot paths.
//
// computeHash:
//   • Legacy v13/v14/v15 helper.
//   • Used as fallback and for compatibility surfaces.
//
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

  // FNV‑1a style core with positional weighting, still deterministic and bounded
  let h = 2166136261 >>> 0;
  for (let i = 0; i < combined.length; i++) {
    h ^= combined.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
    // light positional mix
    h = (h + ((i + 1) * 131)) >>> 0;
  }

  // Fold down to 5 digits, keep legacy prefix compatibility
  const reduced = h % 100000;
  return `hi${reduced}`;
}

// Convenience: always prefer computeHashIntelligence, fall back to computeHash
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
// THE IMMUTABLE GENOME CORE — v13 JOB SCHEMA (STRUCTURE CANNOT CHANGE)
// ============================================================================
export const PulseEarnJobSchemaV13 = {
  id: "string",             // Unique job ID (genetic locus)
  marketplaceId: "string",  // Marketplace origin (environmental source)

  payout: "number",         // Deterministic payout for the job
  cpuRequired: "number",    // CPU units required
  memoryRequired: "number", // Memory required (MB)
  estimatedSeconds: "number", // Deterministic duration estimate

  minGpuScore: "number",        // Minimum GPU score required
  bandwidthNeededMbps: "number",// Network bandwidth requirement

  // A‑B‑A band hints
  _abaBand: "string",           // "symbolic" | "binary"
  _abaBinaryDensity: "number",  // Binary surface density
  _abaWaveAmplitude: "number",  // Wave amplitude

  // Unified v13 presence / advantage / chunk surfaces
  presenceField: "PresenceFieldV13",     // v13 presence model
  advantageField: "AdvantageFieldV13",   // Advantage‑C v13
  chunkPlan: "ChunkPrewarmPlanV13"       // Chunk/cache/prewarm plan
};

// ============================================================================
// v16 Presence / Advantage / Chunk / ComputeProfile / Intelligence
// ============================================================================

let genomeCycle = 0;

function buildPresenceFieldV16(globalHints = {}) {
  genomeCycle++;

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

  return {
    presenceVersion: "v16.0-Presence-Immortal-INTEL",
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
      `GENOME_PRESENCE_V16::${presenceTier}::${meshPressureIndex}::${castleLoadLevel}`,
      "presenceFieldV16"
    )
  };
}

function buildBinaryFieldV16(schemaString, band) {
  const size = schemaString.length;
  const density = size + genomeCycle;
  const surface = density + size;

  return {
    binaryGenomeSignature: hashIntelligent(
      `BGENOME_V16::${band}::${surface}`,
      "binaryGenome"
    ),
    binarySurfaceSignature: hashIntelligent(
      `BGENOME_SURF_V16::${surface}`,
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
}

function buildWaveFieldV16(schemaString, band) {
  const size = schemaString.length;
  const amplitude = size + genomeCycle;
  const wavelength = genomeCycle + 1;
  const phase = (size + genomeCycle) % 16;

  return {
    amplitude,
    wavelength,
    phase,
    band,
    mode: band === "binary" ? "compression-wave" : "symbolic-wave"
  };
}

function buildAdvantageFieldV16(binaryField, waveField, presenceField, globalHints = {}) {
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

  return {
    advantageVersion: "C-16.0-INTEL",
    advantageScore,
    advantageTier,
    fallbackBandLevel: globalHints.fallbackBandLevel ?? 0
  };
}

function buildChunkPrewarmPlanV16(presenceField, advantageField) {
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

  return {
    planVersion: "v16.0-GenomeCore-AdvantageC-INTEL",
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
}

function deriveFactoringSignalForGenome({ meshPressureIndex = 0, size = 0, cachePriority = "normal" }) {
  const pressure = clamp01(meshPressureIndex / 100);
  const bigSchema = size >= 1024;
  const highPressure = pressure >= 0.7;
  const criticalCache = cachePriority === "critical";
  if (bigSchema || criticalCache || highPressure) return 1;
  return 0;
}

function buildComputeProfileV16({ band, globalHints = {}, presenceField, size = 0 }) {
  const b = normalizeBand(band);
  const hints = globalHints || {};
  const cacheHints = hints.cacheHints || {};
  const prewarmHints = hints.prewarmHints || {};

  const cachePriority = normalizeCachePriority(cacheHints.priority);
  const prewarmNeeded = !!prewarmHints.shouldPrewarm;
  const meshPressureIndex = presenceField.meshPressureIndex || 0;

  const factoringSignal = deriveFactoringSignalForGenome({
    meshPressureIndex,
    size,
    cachePriority
  });

  const deepJobCandidate = size >= 2048 || cachePriority === "critical";

  return {
    computeProfileVersion: "v16.0-GenomeCore-INTEL",
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
}

function computePulseIntelligenceForGenome({ band, presenceField, advantageField, computeProfile, size }) {
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

  return {
    pulseIntelligenceVersion: "v16.0-GenomeCore-INTEL",
    solvednessScore,
    factoringSignal: factoring ? "high" : "low",
    computeTier,
    readinessScore,
    band,
    advantageTier,
    size
  };
}

// ============================================================================
// PUBLIC API — Genome Constitutional Surfaces (v16-Immortal-INTEL)
// ============================================================================
//
// buildPulseEarnGenomeConstitutionV16:
//   • Takes the immutable v13 schema + band + global hints.
//   • Emits all v16 surfaces + signatures as constitutional metadata.
//   • Does NOT mutate the schema; does NOT depend on runtime job data.
//
export function buildPulseEarnGenomeConstitutionV16(dualBandContext = {}, globalHints = {}) {
  const band = normalizeBand(dualBandContext.band || "symbolic");

  const schemaString = JSON.stringify(PulseEarnJobSchemaV13);
  const size = schemaString.length;

  const presenceField = buildPresenceFieldV16(globalHints);
  const binaryField = buildBinaryFieldV16(schemaString, band);
  const waveField = buildWaveFieldV16(schemaString, band);
  const advantageField = buildAdvantageFieldV16(binaryField, waveField, presenceField, globalHints);
  const chunkPlan = buildChunkPrewarmPlanV16(presenceField, advantageField);
  const computeProfile = buildComputeProfileV16({
    band,
    globalHints,
    presenceField,
    size
  });
  const pulseIntelligence = computePulseIntelligenceForGenome({
    band,
    presenceField,
    advantageField,
    computeProfile,
    size
  });

  const genomeSignature = hashIntelligent(
    `GENOME_CORE_V16::${band}::${schemaString.length}`,
    "genomeCore"
  );

  const constitutionalMetadata = {
    genomeVersion: "v16-Immortal-INTEL",
    schemaVersion: "v13.0-Presence-Immortal",
    band,
    genomeSignature,
    presenceSignature: presenceField.presenceSignature,
    binarySignature: binaryField.binaryGenomeSignature,
    waveSignature: hashIntelligent(
      `WAVE_GENOME_V16::${waveField.amplitude}::${waveField.wavelength}::${waveField.phase}`,
      "waveGenome"
    ),
    advantageSignature: hashIntelligent(
      `ADV_GENOME_V16::${advantageField.advantageScore}::${advantageField.advantageTier}`,
      "advGenome"
    ),
    computeProfileSignature: hashIntelligent(
      `CP_GENOME_V16::${computeProfile.routeBand}::${computeProfile.cachePriority}::${computeProfile.factoringSignal}`,
      "cpGenome"
    ),
    pulseIntelligenceSignature: hashIntelligent(
      `PI_GENOME_V16::${pulseIntelligence.computeTier}::${pulseIntelligence.solvednessScore}`,
      "piGenome"
    )
  };

  return {
    genomeSignatures: {
      genomeSignature,
      bandSignature: hashIntelligent(`GENOME_BAND_V16::${band}`, "genomeBand")
    },
    binaryField,
    waveField,
    presenceField,
    advantageField,
    chunkPlan,
    computeProfile,
    pulseIntelligence,
    constitutionalMetadata
  };
}

// ============================================================================
// v16‑IMMORTAL‑INTEL GENOME METADATA (NON‑STRUCTURAL, SAFE, IMMUTABLE)
// ============================================================================
export const PulseEarnGenomeMetadata = {
  genomeVersion: "16-Immortal-INTEL",
  genomeIdentity: "PulseEarn-GenomeCore-v16-Immortal-INTEL",
  genomeLayer: "GENOME_CORE",
  genomeRole: "Immutable DNA Sequence + Cross‑Organism Law (v13 schema, v16 surfaces)",

  // Deterministic constitutional pattern (unchanged v13 schema)
  constitutionalPattern:
    "GENOME_V13::" +
    "id:string::marketplaceId:string::" +
    "payout:number::cpuRequired:number::memoryRequired:number::estimatedSeconds:number::" +
    "minGpuScore:number::bandwidthNeededMbps:number::" +
    "_abaBand:string::_abaBinaryDensity:number::_abaWaveAmplitude:number::" +
    "presenceField:PresenceFieldV13::advantageField:AdvantageFieldV13::chunkPlan:ChunkPrewarmPlanV13",

  // Deterministic base signatures (legacy + v16‑intelligence)
  genomeSignature: computeHash(JSON.stringify(PulseEarnJobSchemaV13)),
  genomeSignatureV16: hashIntelligent(
    "GENOME_CORE_V16::" + JSON.stringify(PulseEarnJobSchemaV13),
    "genomeMetadata"
  ),

  // -----------------------------
  // A — Dual-Band Metadata
  // -----------------------------
  bandAware: true,
  dualBandReady: true,
  bandSignature_symbolic: hashIntelligent("band::symbolic::v16", "bandSymbolic"),
  bandSignature_binary: hashIntelligent("band::binary::v16", "bandBinary"),

  // -----------------------------
  // B — Binary Surfaces
  // -----------------------------
  binaryGenomeSignature: hashIntelligent(
    "binary::v16::" + JSON.stringify(PulseEarnJobSchemaV13),
    "binaryGenomeMeta"
  ),

  binaryFieldSignatures: {
    id: hashIntelligent("binary::v16::id:string", "field:id"),
    marketplaceId: hashIntelligent("binary::v16::marketplaceId:string", "field:marketplaceId"),

    payout: hashIntelligent("binary::v16::payout:number", "field:payout"),
    cpuRequired: hashIntelligent("binary::v16::cpuRequired:number", "field:cpuRequired"),
    memoryRequired: hashIntelligent("binary::v16::memoryRequired:number", "field:memoryRequired"),
    estimatedSeconds: hashIntelligent("binary::v16::estimatedSeconds:number", "field:estimatedSeconds"),

    minGpuScore: hashIntelligent("binary::v16::minGpuScore:number", "field:minGpuScore"),
    bandwidthNeededMbps: hashIntelligent("binary::v16::bandwidthNeededMbps:number", "field:bandwidthNeededMbps"),

    _abaBand: hashIntelligent("binary::v16::_abaBand:string", "field:_abaBand"),
    _abaBinaryDensity: hashIntelligent("binary::v16::_abaBinaryDensity:number", "field:_abaBinaryDensity"),
    _abaWaveAmplitude: hashIntelligent("binary::v16::_abaWaveAmplitude:number", "field:_abaWaveAmplitude"),

    presenceField: hashIntelligent("binary::v16::presenceField:PresenceFieldV13", "field:presenceField"),
    advantageField: hashIntelligent("binary::v16::advantageField:AdvantageFieldV13", "field:advantageField"),
    chunkPlan: hashIntelligent("binary::v16::chunkPlan:ChunkPrewarmPlanV13", "field:chunkPlan")
  },

  // -----------------------------
  // C — Wave-Theory Metadata
  // -----------------------------
  waveSignature: hashIntelligent(
    "wave::v16::" + computeHash(JSON.stringify(PulseEarnJobSchemaV13)),
    "waveMeta"
  ),

  waveField: {
    wavelength: 16,
    amplitude: 7,
    phase: (16 + 7) % 16,
    mode: "symbolic-wave"
  },

  // -----------------------------
  // D — Presence / Advantage / Hints Surfaces (metadata-only)
// -----------------------------
  presenceFieldSignatures: {
    presenceVersionSignature: hashIntelligent("presence::v16::presenceVersion", "presence:version"),
    presenceTierSignature: hashIntelligent("presence::v16::presenceTier", "presence:tier"),
    bandPresenceSignature: hashIntelligent("presence::v16::bandPresence", "presence:band"),
    routerPresenceSignature: hashIntelligent("presence::v16::routerPresence", "presence:router"),
    devicePresenceSignature: hashIntelligent("presence::v16::devicePresence", "presence:device"),
    meshPresenceSignature: hashIntelligent("presence::v16::meshPresence", "presence:mesh"),
    castlePresenceSignature: hashIntelligent("presence::v16::castlePresence", "presence:castle"),
    regionPresenceSignature: hashIntelligent("presence::v16::regionPresence", "presence:region"),
    regionIdSignature: hashIntelligent("presence::v16::regionId", "presence:regionId"),
    castleIdSignature: hashIntelligent("presence::v16::castleId", "presence:castleId"),
    castleLoadLevelSignature: hashIntelligent("presence::v16::castleLoadLevel", "presence:castleLoad"),
    meshStrengthSignature: hashIntelligent("presence::v16::meshStrength", "presence:meshStrength"),
    meshPressureIndexSignature: hashIntelligent("presence::v16::meshPressureIndex", "presence:meshPressure"),
    cycleSignature: hashIntelligent("presence::v16::cycle", "presence:cycle")
  },

  advantageFieldSignatures: {
    advantageVersionSignature: hashIntelligent("advantage::v16::version", "adv:version"),
    advantageScoreSignature: hashIntelligent("advantage::v16::score", "adv:score"),
    advantageTierSignature: hashIntelligent("advantage::v16::tier", "adv:tier"),
    fallbackBandLevelSignature: hashIntelligent("advantage::v16::fallbackBandLevel", "adv:fallbackBandLevel")
  },

  hintsFieldSignatures: {
    fallbackBandLevelSignature: hashIntelligent("hints::v16::fallbackBandLevel", "hints:fallbackBandLevel"),
    chunkHintsSignature: hashIntelligent("hints::v16::chunkHints", "hints:chunkHints"),
    cacheHintsSignature: hashIntelligent("hints::v16::cacheHints", "hints:cacheHints"),
    prewarmHintsSignature: hashIntelligent("hints::v16::prewarmHints", "hints:prewarmHints"),
    coldStartHintsSignature: hashIntelligent("hints::v16::coldStartHints", "hints:coldStartHints")
  },

  // -----------------------------
  // E — ComputeProfile + PulseIntelligence (v16-only, metadata)
// -----------------------------
  computeProfileSignatures: {
    computeProfileVersionSignature: hashIntelligent("cp::v16::version", "cp:version"),
    routeBandSignature: hashIntelligent("cp::v16::routeBand", "cp:routeBand"),
    cachePrioritySignature: hashIntelligent("cp::v16::cachePriority", "cp:cachePriority"),
    prewarmNeededSignature: hashIntelligent("cp::v16::prewarmNeeded", "cp:prewarmNeeded"),
    factoringSignalSignature: hashIntelligent("cp::v16::factoringSignal", "cp:factoring"),
    deepJobCandidateSignature: hashIntelligent("cp::v16::deepJobCandidate", "cp:deepJob"),
    multiInstanceHintSignature: hashIntelligent("cp::v16::multiInstanceHint", "cp:multiInstance")
  },

  pulseIntelligenceSignatures: {
    piVersionSignature: hashIntelligent("pi::v16::version", "pi:version"),
    solvednessScoreSignature: hashIntelligent("pi::v16::solvednessScore", "pi:solvedness"),
    computeTierSignature: hashIntelligent("pi::v16::computeTier", "pi:computeTier"),
    readinessScoreSignature: hashIntelligent("pi::v16::readinessScore", "pi:readiness"),
    bandSignature: hashIntelligent("pi::v16::band", "pi:band"),
    advantageTierSignature: hashIntelligent("pi::v16::advantageTier", "pi:advTier"),
    sizeSignature: hashIntelligent("pi::v16::size", "pi:size")
  },

  // -----------------------------
  // F — Original-style field signatures (v13 schema, v16 tag)
// -----------------------------
  fieldSignatures: {
    id: hashIntelligent("v16::id:string", "field:id"),
    marketplaceId: hashIntelligent("v16::marketplaceId:string", "field:marketplaceId"),

    payout: hashIntelligent("v16::payout:number", "field:payout"),
    cpuRequired: hashIntelligent("v16::cpuRequired:number", "field:cpuRequired"),
    memoryRequired: hashIntelligent("v16::memoryRequired:number", "field:memoryRequired"),
    estimatedSeconds: hashIntelligent("v16::estimatedSeconds:number", "field:estimatedSeconds"),

    minGpuScore: hashIntelligent("v16::minGpuScore:number", "field:minGpuScore"),
    bandwidthNeededMbps: hashIntelligent("v16::bandwidthNeededMbps:number", "field:bandwidthNeededMbps"),

    _abaBand: hashIntelligent("v16::_abaBand:string", "field:_abaBand"),
    _abaBinaryDensity: hashIntelligent("v16::_abaBinaryDensity:number", "field:_abaBinaryDensity"),
    _abaWaveAmplitude: hashIntelligent("v16::_abaWaveAmplitude:number", "field:_abaWaveAmplitude"),

    presenceField: hashIntelligent("v16::presenceField:PresenceFieldV13", "field:presenceField"),
    advantageField: hashIntelligent("v16::advantageField:AdvantageFieldV13", "field:advantageField"),
    chunkPlan: hashIntelligent("v16::chunkPlan:ChunkPrewarmPlanV13", "field:chunkPlan")
  }
};
