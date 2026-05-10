// ============================================================================
// FILE: tropic-pulse-functions/PULSE-WORLD/PULSE-EARN/PulseEarnGeneticMemory-v24-Immortal-INTEL-NEURAL.js
// LAYER: THE GENETIC MEMORY (v24-Immortal-INTEL-NEURAL)
// Neural‑Genetic Hybrid • Core Memory Bridge • Deep Job INTEL • v24 Surfaces
// ============================================================================
//
// ROLE (v24-Immortal-INTEL-NEURAL):
//   THE GENETIC MEMORY — Pulse‑Earn’s deterministic packet genome for v24.
//   • Stores packet data in a safe, in‑memory gene archive (genome map).
//   • Generates deterministic packet values (genetic identity).
//   • Maintains packet‑level healing metadata (genetic health).
//   • Emits v24‑Presence‑IMMORTAL genetic signatures + binary/wave fields.
//   • Emits v24 chunk/prewarm/computeProfile + pulseIntelligence surfaces.
//   • Dual-band, binary-aware, wave-aware, presence/advantage/chunk-aware.
//   • Deep-job aware + multi-instance hints (metadata-only).
//   • Neural‑Genetic Hybrid: reads organism INTEL surfaces as metadata only
//     (continuance, risk, endocrine, circulatory, capabilityModel, etc.).
//
// CONTRACT (v24-Immortal-INTEL-NEURAL):
//   • PURE PACKET ENGINE — no AI layers, no translation, no memory model.
//   • NO eval(), NO Function(), NO dynamic imports.
//   • NO network calls, NO filesystem, NO timestamps.
//   • Deterministic hashing + safe in‑memory storage only.
//   • Presence/advantage/chunk/computeProfile/pulseIntelligence DO NOT affect behavior.
//   • All intelligence surfaces are metadata-only for higher organs.
//   • Core memory integration via PulseProofBridge (no external IO).
// ============================================================================
import {
  OrganismIdentity,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PulseWorldOrganismMap-v21.js";
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
// Healing Metadata — Genetic Health Log (v24-Immortal-INTEL-NeuroGenetic)
// ============================================================================
const geneticHealing = {
  lastKey: null,
  lastWrite: null,
  lastGenerated: null,
  lastError: null,

  cycleCount: 0,
  lastCycleIndex: null,

  lastGeneSignature: null,
  lastWriteSignature: null,
  lastSynthesisSignature: null,

  // Dual-Band + Binary + Wave
  lastBand: "symbolic",
  lastBandSignature: null,
  lastBinaryField: null,
  lastWaveField: null,

  // v24 Presence / Advantage / Chunk / Compute / Intelligence
  lastPresenceField: null,
  lastAdvantageField: null,
  lastChunkPlan: null,
  lastComputeProfile: null,
  lastPulseIntelligence: null,

  // v24 NEURAL‑GENETIC ORGANISM CONTEXT SURFACES (metadata-only)
  lastContinuanceContext: null,
  lastRiskContext: null,
  lastEndocrineContext: null,
  lastCirculatoryContext: null,
  lastOrganismContextSignature: null
};

// ============================================================================
// In‑Memory Genome — Packet Store (Chromosome Map)
// ============================================================================
const genome = new Map();

// Deterministic cycle counter
let geneCycle = 0;

// ============================================================================
// PulseProofBridge — deterministic proof surfaces for genetic memory
// (core memory integration, metadata-only, no external IO)
// ============================================================================
const proof = new PulseProofBridge({
  namespace: "PulseEarnGeneticMemory-v24-Immortal-INTEL-NeuroGenetic",
  layer: "GeneticMemory",
  role: "GeneProofSurface",
  version: "v24-Immortal-INTEL-NeuroGenetic-CHUNK",
  deterministic: true,
  driftProof: true
});

// ============================================================================
// Deterministic Helpers
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

function classifyPresenceTier(pressure) {
  if (pressure >= 150) return "critical";
  if (pressure >= 100) return "high";
  if (pressure >= 50) return "elevated";
  if (pressure > 0) return "soft";
  return "idle";
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
// v24 Presence / Advantage / Chunk / ComputeProfile / Intelligence
// ============================================================================

function buildPresenceField(globalHints = {}, cycle) {
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
    presenceVersion: "v24.0-Presence-Immortal-INTEL-NeuroGenetic",
    presenceTier,

    bandPresence: ghP.bandPresence || "symbolic",
    routerPresence: ghP.routerPresence || "stable",
    devicePresence: ghP.devicePresence || "genetic-memory",

    meshPresence: ghP.meshPresence || (meshStrength > 0 ? "mesh-active" : "mesh-idle"),
    castlePresence: ghP.castlePresence || castle.castlePresence || "genetic-region",
    regionPresence: ghP.regionPresence || region.regionTag || "unknown-region",

    regionId: region.regionId || "genetic-region",
    castleId: castle.castleId || "genetic-castle",

    meshStrength,
    meshPressureIndex,
    castleLoadLevel,

    cycle,

    presenceSignature: computeHash(
      `GENETIC_PRESENCE_V24::${presenceTier}::${meshPressureIndex}::${castleLoadLevel}`
    )
  };
}

function buildAdvantageField(binaryField, waveField, presenceField, globalHints = {}, organismContext = {}) {
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

  // Organism context (metadata-only, does NOT affect behavior)
  const contScore = organismContext.continuance?.continuanceScore ?? 0;
  const riskScore = organismContext.risk?.riskScore ?? 0;
  const reputation = organismContext.endocrine?.reputation ?? 0.5;

  const continuanceBoost = contScore * 0.01;
  const riskPenalty = riskScore * 0.005;
  const reputationBoost = reputation * 0.01;

  const advantageScore =
    baseScore +
    presenceBoost +
    continuanceBoost +
    reputationBoost -
    riskPenalty;

  let advantageTier = 0;
  if (advantageScore >= 0.05) advantageTier = 3;
  else if (advantageScore >= 0.02) advantageTier = 2;
  else if (advantageScore > 0) advantageTier = 1;

  return {
    advantageVersion: "C-24.0-INTEL-NeuroGenetic",
    advantageScore,
    advantageTier,
    fallbackBandLevel: globalHints.fallbackBandLevel ?? 0,

    // Organism context surfaces (metadata-only)
    continuanceScore: contScore,
    riskScore,
    endocrineReputation: reputation
  };
}

function buildChunkPrewarmPlan(presenceField, advantageField) {
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
    planVersion: "v24.0-GeneticMemory-AdvantageC-INTEL-NeuroGenetic",
    priority: basePriority + advantageBoost,
    band: presenceField.presenceTier,
    chunks: {
      geneEnvelope: true,
      geneRepairMatrix: true
    },
    cache: {
      geneticDiagnostics: true
    },
    prewarm: {
      nervousSystem: true,
      muscleSystem: true,
      lymphNodes: true
    }
  };
}

// --------------------------------------------------------------------------
// ComputeProfile + Factoring + Deep Job Hints (metadata-only, v24)
// --------------------------------------------------------------------------
function deriveFactoringSignal({ meshPressureIndex = 0, size = 0, cachePriority = "normal" }) {
  const pressure = clamp01(meshPressureIndex / 100);
  const bigGene = size >= 4096; // deep packet / large gene
  const highPressure = pressure >= 0.7;
  const criticalCache = cachePriority === "critical";
  if (bigGene || criticalCache || highPressure) return 1;
  return 0;
}

function buildComputeProfile({
  band,
  globalHints = {},
  presenceField,
  size = 0,
  organismContext = {}
}) {
  const b = normalizeBand(band);
  const hints = globalHints || {};
  const cacheHints = hints.cacheHints || {};
  const prewarmHints = hints.prewarmHints || {};

  const cachePriority = normalizeCachePriority(cacheHints.priority);
  const prewarmNeeded = !!prewarmHints.shouldPrewarm;
  const meshPressureIndex = presenceField.meshPressureIndex || 0;

  const factoringSignal = deriveFactoringSignal({
    meshPressureIndex,
    size,
    cachePriority
  });

  const deepJobCandidate = size >= 8192 || cachePriority === "critical";

  // Circulatory / capability surfaces (metadata-only)
  const capability = organismContext.circulatory?.capabilityModel || {};
  const performanceRatio = capability.performanceRatio ?? 1;
  const gpuScore = capability.gpuScore ?? 0;
  const minerScore = capability.minerScore ?? 0;
  const offlineScore = capability.offlineScore ?? 0;

  const gpuPreferred = gpuScore > 0;
  const minerPreferred = minerScore > 0;
  const offlinePreferred = offlineScore > 0;

  return {
    computeProfileVersion: "v24.0-GeneticMemory-INTEL-NeuroGenetic",
    routeBand: b,
    fallbackBandLevel: hints.fallbackBandLevel ?? 0,
    chunkAggression: (hints.chunkHints && hints.chunkHints.chunkAggression) ?? 0,
    cachePriority,
    prewarmNeeded,
    binaryPreferred: b === "binary",
    symbolicPreferred: b === "symbolic",
    factoringSignal,
    performanceRatio,
    deepJobCandidate,
    multiInstanceHint: deepJobCandidate,

    gpuPreferred,
    minerPreferred,
    offlinePreferred
  };
}

// --------------------------------------------------------------------------
// Pulse Intelligence for Genetic Memory (logic-only, metadata-only, v24)
// --------------------------------------------------------------------------
function computePulseIntelligenceForGene({
  band,
  presenceField,
  advantageField,
  computeProfile,
  size,
  organismContext = {}
}) {
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

  const sizeWeight = Math.max(0, Math.min(size / 8192, 1)); // large genes → closer to 1

  const contScore = organismContext.continuance?.continuanceScore ?? 0;
  const riskScore = organismContext.risk?.riskScore ?? 0;
  const reputation = organismContext.endocrine?.reputation ?? 0.5;

  const continuanceWeight = contScore * 0.2;
  const riskWeight = (1 - riskScore) * 0.2;
  const reputationWeight = reputation * 0.2;

  const solvednessScore = Math.max(
    0,
    Math.min(
      advantageScore * 10 * 0.25 +
      presenceWeight * 0.2 +
      sizeWeight * 0.15 +
      factoring * 0.15 +
      continuanceWeight * 0.1 +
      riskWeight * 0.1 +
      reputationWeight * 0.05,
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
    pulseIntelligenceVersion: "v24.0-GeneticMemory-INTEL-NeuroGenetic",
    solvednessScore,
    factoringSignal: factoring ? "high" : "low",
    computeTier,
    readinessScore,
    band,
    advantageTier,
    size,

    continuanceScore: contScore,
    riskScore,
    endocrineReputation: reputation
  };
}

// ============================================================================
// Binary + Wave Surfaces (v24, same math, upgraded signatures)
// ============================================================================
function buildBinaryField(size, cycle) {
  const density = size + cycle;
  const surface = density + size;

  return {
    binaryGeneSignature: computeHash(`BGENE_V24::${surface}`),
    binarySurfaceSignature: computeHash(`BGENE_SURF_V24::${surface}`),
    binarySurface: {
      size,
      density,
      surface
    },
    parity: surface % 2 === 0 ? 0 : 1,
    shiftDepth: Math.max(0, Math.floor(Math.log2(surface || 1)))
  };
}

function buildWaveField(size, cycle, band) {
  const amplitude = size + cycle;
  const wavelength = cycle + 1;
  const phase = (size + cycle) % 16;

  return {
    amplitude,
    wavelength,
    phase,
    band,
    mode: band === "binary" ? "compression-wave" : "symbolic-wave"
  };
}

// ============================================================================
// Organism Context Helper (metadata-only)
// ============================================================================
function normalizeOrganismContext(organismContext = {}) {
  const continuance = organismContext.continuance || null;
  const risk = organismContext.risk || null;
  const endocrine = organismContext.endocrine || null;
  const circulatory = organismContext.circulatory || null;

  const signature = computeHash(
    `ORGCTX_V24::${JSON.stringify({
      continuance,
      risk,
      endocrine,
      circulatory
    })}`
  );

  geneticHealing.lastContinuanceContext = continuance;
  geneticHealing.lastRiskContext = risk;
  geneticHealing.lastEndocrineContext = endocrine;
  geneticHealing.lastCirculatoryContext = circulatory;
  geneticHealing.lastOrganismContextSignature = signature;

  return {
    continuance,
    risk,
    endocrine,
    circulatory,
    signature
  };
}

// ============================================================================
// PUBLIC API — Genetic Memory v24-Immortal-INTEL-NeuroGenetic
// ============================================================================
//
// NOTE: organismContext is always metadata-only and does NOT affect core
//       read/write/synthesize behavior — only surfaces and healing metadata.
//

export function readPulseEarnGeneExists(
  fileId,
  packetIndex,
  band = "symbolic",
  globalHints = {},
  organismContext = {}
) {
  geneCycle++;
  geneticHealing.cycleCount++;
  geneticHealing.lastCycleIndex = geneCycle;

  const normalizedBand = normalizeBand(band);
  geneticHealing.lastBand = normalizedBand;
  geneticHealing.lastBandSignature = computeHash(`BAND::${normalizedBand}`);

  const presenceField = buildPresenceField(globalHints, geneCycle);
  const binaryField = buildBinaryField(0, geneCycle);
  const waveField = buildWaveField(0, geneCycle, normalizedBand);

  const normalizedOrganismContext = normalizeOrganismContext(organismContext);

  const advantageField = buildAdvantageField(
    binaryField,
    waveField,
    presenceField,
    globalHints,
    normalizedOrganismContext
  );

  const chunkPlan = buildChunkPrewarmPlan(presenceField, advantageField);
  const computeProfile = buildComputeProfile({
    band: normalizedBand,
    globalHints,
    presenceField,
    size: 0,
    organismContext: normalizedOrganismContext
  });

  const pulseIntelligence = computePulseIntelligenceForGene({
    band: normalizedBand,
    presenceField,
    advantageField,
    computeProfile,
    size: 0,
    organismContext: normalizedOrganismContext
  });

  geneticHealing.lastPresenceField = presenceField;
  geneticHealing.lastAdvantageField = advantageField;
  geneticHealing.lastChunkPlan = chunkPlan;
  geneticHealing.lastComputeProfile = computeProfile;
  geneticHealing.lastPulseIntelligence = pulseIntelligence;

  try {
    const key = `${fileId}:${packetIndex}:${normalizedBand}`;
    geneticHealing.lastKey = key;

    geneticHealing.lastGeneSignature = computeHash(
      `GENE_EXISTS_V24::${key}::${geneCycle}`
    );

    // Core memory proof surface
    proof.write("read", {
      key,
      fileId,
      packetIndex,
      band: normalizedBand,
      cycle: geneCycle,
      presenceField,
      binaryField,
      waveField,
      advantageField,
      chunkPlan,
      computeProfile,
      pulseIntelligence,
      organismContext: normalizedOrganismContext
    });

    return genome.has(key);

  } catch (err) {
    geneticHealing.lastError = err && err.message ? err.message : String(err);
    return false;
  }
}

export function writePulseEarnGene(
  fileId,
  packetIndex,
  data,
  band = "symbolic",
  globalHints = {},
  organismContext = {}
) {
  geneCycle++;
  geneticHealing.cycleCount++;
  geneticHealing.lastCycleIndex = geneCycle;

  const normalizedBand = normalizeBand(band);
  geneticHealing.lastBand = normalizedBand;
  geneticHealing.lastBandSignature = computeHash(`BAND::${normalizedBand}`);

  const presenceField = buildPresenceField(globalHints, geneCycle);

  try {
    const key = `${fileId}:${packetIndex}:${normalizedBand}`;
    geneticHealing.lastKey = key;

    genome.set(key, structuredClone(data));

    const size = JSON.stringify(data).length;

    const binaryField = buildBinaryField(size, geneCycle);
    const waveField = buildWaveField(size, geneCycle, normalizedBand);

    const normalizedOrganismContext = normalizeOrganismContext(organismContext);

    const advantageField = buildAdvantageField(
      binaryField,
      waveField,
      presenceField,
      globalHints,
      normalizedOrganismContext
    );

    const chunkPlan = buildChunkPrewarmPlan(presenceField, advantageField);
    const computeProfile = buildComputeProfile({
      band: normalizedBand,
      globalHints,
      presenceField,
      size,
      organismContext: normalizedOrganismContext
    });

    const pulseIntelligence = computePulseIntelligenceForGene({
      band: normalizedBand,
      presenceField,
      advantageField,
      computeProfile,
      size,
      organismContext: normalizedOrganismContext
    });

    geneticHealing.lastBinaryField = binaryField;
    geneticHealing.lastWaveField = waveField;
    geneticHealing.lastPresenceField = presenceField;
    geneticHealing.lastAdvantageField = advantageField;
    geneticHealing.lastChunkPlan = chunkPlan;
    geneticHealing.lastComputeProfile = computeProfile;
    geneticHealing.lastPulseIntelligence = pulseIntelligence;

    geneticHealing.lastWrite = {
      key,
      size,
      cycleIndex: geneCycle
    };

    geneticHealing.lastWriteSignature = computeHash(
      `WRITE_V24::${key}::${size}`
    );
    geneticHealing.lastError = null;

    // Core memory proof surface
    proof.write("write", {
      key,
      fileId,
      packetIndex,
      band: normalizedBand,
      size,
      cycle: geneCycle,
      presenceField,
      binaryField,
      waveField,
      advantageField,
      chunkPlan,
      computeProfile,
      pulseIntelligence,
      organismContext: normalizedOrganismContext
    });

    return true;

  } catch (err) {
    geneticHealing.lastError = err && err.message ? err.message : String(err);
    return false;
  }
}

export function synthesizePulseEarnGene(
  fileId,
  packetIndex,
  band = "symbolic",
  globalHints = {},
  organismContext = {}
) {
  geneCycle++;
  geneticHealing.cycleCount++;
  geneticHealing.lastCycleIndex = geneCycle;

  const normalizedBand = normalizeBand(band);
  geneticHealing.lastBand = normalizedBand;
  geneticHealing.lastBandSignature = computeHash(`BAND::${normalizedBand}`);

  const presenceField = buildPresenceField(globalHints, geneCycle);

  try {
    const key = `${fileId}:${packetIndex}:${normalizedBand}`;
    geneticHealing.lastKey = key;

    // Deterministic FNV‑1a hash → genetic identity
    let hash = 2166136261;
    for (let i = 0; i < key.length; i++) {
      hash ^= key.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }

    const value = (hash >>> 0) / 0xffffffff;

    const gene = {
      fileId,
      packetIndex,
      key,
      value,
      band: normalizedBand,
      cycleIndex: geneCycle
    };

    const size = Math.floor(value * 1000);

    const binaryField = buildBinaryField(size, geneCycle);
    const waveField = buildWaveField(size, geneCycle, normalizedBand);

    const normalizedOrganismContext = normalizeOrganismContext(organismContext);

    const advantageField = buildAdvantageField(
      binaryField,
      waveField,
      presenceField,
      globalHints,
      normalizedOrganismContext
    );

    const chunkPlan = buildChunkPrewarmPlan(presenceField, advantageField);
    const computeProfile = buildComputeProfile({
      band: normalizedBand,
      globalHints,
      presenceField,
      size,
      organismContext: normalizedOrganismContext
    });

    const pulseIntelligence = computePulseIntelligenceForGene({
      band: normalizedBand,
      presenceField,
      advantageField,
      computeProfile,
      size,
      organismContext: normalizedOrganismContext
    });

    geneticHealing.lastGenerated = gene;
    geneticHealing.lastSynthesisSignature = computeHash(
      `SYNTH_V24::${key}::${value}`
    );

    geneticHealing.lastBinaryField = binaryField;
    geneticHealing.lastWaveField = waveField;
    geneticHealing.lastPresenceField = presenceField;
    geneticHealing.lastAdvantageField = advantageField;
    geneticHealing.lastChunkPlan = chunkPlan;
    geneticHealing.lastComputeProfile = computeProfile;
    geneticHealing.lastPulseIntelligence = pulseIntelligence;

    geneticHealing.lastError = null;

    // Core memory proof surface
    proof.write("synthesize", {
      key,
      fileId,
      packetIndex,
      band: normalizedBand,
      value,
      size,
      cycle: geneCycle,
      presenceField,
      binaryField,
      waveField,
      advantageField,
      chunkPlan,
      computeProfile,
      pulseIntelligence,
      organismContext: normalizedOrganismContext
    });

    return gene;

  } catch (err) {
    geneticHealing.lastError = err && err.message ? err.message : String(err);
    return null;
  }
}

export function getPulseEarnGeneticMemoryHealingState() {
  return { ...geneticHealing };
}
