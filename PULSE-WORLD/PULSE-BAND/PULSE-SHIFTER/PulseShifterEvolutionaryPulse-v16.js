// ============================================================================
//  FILE: PulseShifterEvolutionaryPulse-v16-IMMORTAL-INTEL.js
//  Pulse v2 Organism • Evolution Engine • Pattern + Lineage + Shape + Intelligence
//  v16-IMMORTAL-INTEL+++:
//    • Dual-band aware (symbolic/binary) + Presence/Band Surface
//    • ImmortalMeta surfaced (presenceBandState, harmonicDrift, coherenceScore)
//    • BinarySurface surfaced (non-breaking, metadata-only)
//    • PulseIntelligence v16+++ (solvedness, factoring, computeTier, readiness, depth)
//    • Internal Signal Factoring (pressure/signal/depth/stride) like Mesh/Earn
//    • Pulse-Compute v16+++ (legacy-compatible compute hints)
//    • DualHash signatures across evolution + intelligence + factoring
//    • Deterministic, drift-proof, zero IO, zero randomness
// ============================================================================
import {
  OrganismIdentity,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PulseWorldOrganismMap-v24.js";
const Identity = OrganismIdentity(import.meta.url);

// 2 — EXPORT GENOME METADATA
// export const PulseMeshMeta = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
// export const WBC_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// ============================================================================
//  INTERNAL HELPERS — deterministic, tiny, pure
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

function buildLineage(parentLineage, pattern) {
  const base = Array.isArray(parentLineage) ? parentLineage : [];
  return [...base, pattern];
}

function computeShapeSignature(pattern, lineage) {
  const lineageKey = lineage.join("::");
  const raw = `${pattern}::${lineageKey}`;
  return `shape-${computeHash(raw)}`;
}

function computeShapeSignatureAlt(pattern, lineage) {
  const lineageKey = lineage.join("::");
  const raw = `${pattern}::${lineageKey}`;
  return `shape2-${computeHashIntelligence(raw)}`;
}

function computeEvolutionStage(pattern, lineage) {
  const depth = lineage.length;

  if (depth === 1) return "seed";
  if (depth === 2) return "sprout";
  if (depth === 3) return "branch";
  if (depth === 4) return "canopy";
  return "wild";
}

// v2-style deterministic pattern evolution
function evolvePattern(pattern, context = {}) {
  const { routerHint, meshHint, organHint } = context;

  const parts = [pattern];

  if (routerHint) parts.push(`r:${routerHint}`);
  if (meshHint) parts.push(`m:${meshHint}`);
  if (organHint) parts.push(`o:${organHint}`);

  return parts.join("|");
}

function buildPatternAncestry(pattern) {
  if (!pattern || typeof pattern !== "string") return [];
  return pattern.split("/").filter(Boolean);
}

function buildLineageSignature(lineage) {
  if (!Array.isArray(lineage) || lineage.length === 0) return "NO_LINEAGE";
  return lineage.join(">");
}

function buildPageAncestrySignature({ pattern, lineage, pageId }) {
  const shape = {
    pattern,
    patternAncestry: buildPatternAncestry(pattern),
    lineageSignature: buildLineageSignature(lineage),
    pageId: pageId || "NO_PAGE"
  };

  return computeHash(JSON.stringify(shape));
}


// ============================================================================
//  BINARY SURFACE + IMMORTAL META (metadata-only)
// ============================================================================
function extractBinarySurfaceFromPayload(payload) {
  const p = payload || {};

  const binaryPattern  = p.binaryPattern || null;
  const binaryMode     = p.binaryMode || null;
  const binaryPayload  = p.binaryPayload || null;
  const binaryHints    = p.binaryHints || null;
  const binaryStrength = typeof p.binaryStrength === "number"
    ? p.binaryStrength
    : null;

  const hasBinary =
    !!binaryPattern ||
    !!binaryMode ||
    !!binaryPayload ||
    !!binaryHints ||
    binaryStrength !== null;

  const routerHint = p.routerHint ?? (binaryHints && binaryHints.routerHint) ?? null;
  const meshHint   = p.meshHint   ?? (binaryHints && binaryHints.meshHint)   ?? null;
  const organHint  = p.organHint  ?? (binaryHints && binaryHints.organHint)  ?? null;

  return {
    hasBinary,
    binaryPattern,
    binaryMode,
    binaryPayload,
    binaryHints,
    binaryStrength,
    routerHint,
    meshHint,
    organHint
  };
}

function extractImmortalMeta(payload, {
  presenceBandState,
  harmonicDrift,
  coherenceScore
} = {}) {
  const m = payload?.immortalMeta || {};
  return {
    presenceBandState: presenceBandState ?? m.presenceBandState ?? null,
    harmonicDrift: harmonicDrift ?? m.harmonicDrift ?? null,
    coherenceScore: coherenceScore ?? m.coherenceScore ?? null,
    dualBandMode: m.dualBandMode ?? null,
    shifterBand: m.shifterBand ?? null
  };
}


// ============================================================================
//  DIAGNOSTICS
// ============================================================================
function buildDiagnostics(pattern, lineage, healthScore, tier, binarySurface, immortalMeta, pulseIntelligence, factoringSurface) {
  return {
    patternLength: pattern.length,
    lineageDepth: lineage.length,
    healthBucket:
      healthScore >= 0.9 ? "elite" :
      healthScore >= 0.75 ? "high" :
      healthScore >= 0.5 ? "medium" : "low",
    tier,
    lineageDensity: lineage.length === 0 ? 0 : pattern.length / lineage.length,

    binary: binarySurface,
    immortal: immortalMeta,
    intelligence: pulseIntelligence,
    factoring: factoringSurface,

    binaryPatternHash: binarySurface.binaryPattern
      ? computeHash(binarySurface.binaryPattern)
      : null,
    binaryModeHash: binarySurface.binaryMode
      ? computeHash(binarySurface.binaryMode)
      : null,
    immortalSignature: computeHash(JSON.stringify(immortalMeta)),
    intelligenceSignature: computeHash(JSON.stringify(pulseIntelligence)),
    factoringSignature: computeHash(JSON.stringify(factoringSurface))
  };
}


// ============================================================================
//  INTERNAL: PulseIntelligence (v16-INTEL+++)
// ============================================================================
function computePulseIntelligence({
  pattern,
  lineage,
  payload,
  healthScore,
  binarySurface
}) {
  const lineageDepth = Array.isArray(lineage) ? lineage.length : 0;
  const payloadSize = payload && typeof payload === "object"
    ? Object.keys(payload).length
    : 0;

  const patternLen = typeof pattern === "string" ? pattern.length : 0;

  const maxPattern = 128;
  const maxPayload = 64;

  const patternComplexity = Math.min(patternLen / maxPattern, 1);
  const payloadComplexity = Math.min(payloadSize / maxPayload, 1);

  const binaryStrength = typeof binarySurface.binaryStrength === "number"
    ? Math.min(Math.max(binarySurface.binaryStrength, 0), 1)
    : 0;

  const solvednessScore = Math.max(
    0,
    Math.min(
      healthScore * 0.6 +
      (1 - patternComplexity) * 0.2 +
      (1 - payloadComplexity) * 0.1 +
      binaryStrength * 0.1,
      1
    )
  );

  const factoringSignal =
    lineageDepth >= 4 || payloadSize >= 12
      ? "high"
      : lineageDepth >= 2 || payloadSize >= 4
        ? "medium"
        : "low";

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
      healthScore * 0.3 +
      (factoringSignal === "high" ? 0.1 : factoringSignal === "medium" ? 0.05 : 0),
      1
    )
  );

  return {
    solvednessScore,
    factoringSignal,
    computeTier,
    payloadComplexity,
    evolutionDepth: lineageDepth,
    readinessScore
  };
}


// ============================================================================
//  INTERNAL: Pulse-level Signal Factoring (IMMORTAL v16+++)
//  Mirrors Mesh/Earn style: pressure → signal (1/0) → depth → stride
// ============================================================================
let pulseFactoringCycle = 0;

function clamp01(v) {
  return Math.max(0, Math.min(1, v));
}

function safeNumber(v, fallback = 0) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

function computePulseFactoringSurface({
  pattern,
  lineage,
  payload,
  pulseIntelligence,
  bandMode = "symbolic",
  presenceBandState = null
}) {
  pulseFactoringCycle++;

  const lineageDepth = Array.isArray(lineage) ? lineage.length : 0;
  const payloadSize = payload && typeof payload === "object"
    ? Object.keys(payload).length
    : 0;

  const patternLen = typeof pattern === "string" ? pattern.length : 0;

  const auraBias =
    presenceBandState === "presence_high" ? 1 :
    presenceBandState === "presence_mid"  ? 0.6 :
    presenceBandState === "presence_low"  ? 0.3 :
    0.1;

  const flowBias =
    bandMode === "binary" ? 0.7 : 0.4;

  const meshBias =
    lineageDepth >= 4 ? 0.8 :
    lineageDepth >= 2 ? 0.5 :
    0.2;

  const complexityNorm = clamp01((patternLen + payloadSize) / 128);
  const intelligenceNorm = clamp01(pulseIntelligence.solvednessScore);

  const factoringPressure =
    auraBias       * 0.25 +
    flowBias       * 0.20 +
    meshBias       * 0.20 +
    complexityNorm * 0.15 +
    intelligenceNorm * 0.20;

  const clampedPressure = clamp01(factoringPressure);

  const highPressure = clampedPressure >= 0.6;
  const lowPressure  = clampedPressure <= 0.2;

  let signal;
  if (highPressure) {
    signal = 1;
  } else if (lowPressure) {
    signal = 0;
  } else {
    signal = pulseIntelligence.factoringSignal === "high"
      ? 1
      : 0;
  }

  const previousDepth = 0; // stateless per-call; depth is derived, not stored
  const depth =
    signal === 1
      ? Math.min(previousDepth + 1 + Math.floor(lineageDepth / 2), 8)
      : 0;

  const stride =
    depth > 0 ? 1 / (depth + 1) : 1;

  const intent =
    signal === 1
      ? "prefer_factored_pulse"
      : "normal";

  return {
    cycleIndex: pulseFactoringCycle,
    pressure: clampedPressure,
    signal,
    depth,
    stride,
    intent,
    auraBias,
    flowBias,
    meshBias,
    bandMode,
    presenceBandState
  };
}


// ============================================================================
//  INTERNAL: Deterministic evolution compute loop (v2 — IMMORTAL tier)
// ============================================================================
function runEvolutionComputeLoopV2({
  pattern,
  lineage,
  payload,
  mode,
  bandMode = "symbolic",
  presenceBandState = null,
  harmonicDrift = null,
  coherenceScore = null
}) {
  const lineageDepth = Array.isArray(lineage) ? lineage.length : 0;
  const payloadSize = payload && typeof payload === "object"
    ? Object.keys(payload).length
    : 0;

  const patternLen = pattern.length;

  const binarySurface = extractBinarySurfaceFromPayload(payload);
  const immortalMeta  = extractImmortalMeta(payload, {
    presenceBandState,
    harmonicDrift,
    coherenceScore
  });

  const maxPattern = 64;
  const maxLineage = 16;
  const maxPayload = 32;

  const patternScore = Math.min(patternLen / maxPattern, 1);
  const lineageScore = Math.min(lineageDepth / maxLineage, 1);
  const payloadScore = Math.min(payloadSize / maxPayload, 1);

  const healthScore = (
    patternScore * 0.45 +
    lineageScore * 0.25 +
    payloadScore * 0.20
  );

  const pulseIntelligence = computePulseIntelligence({
    pattern,
    lineage,
    payload,
    healthScore,
    binarySurface
  });

  const factoringSurface = computePulseFactoringSurface({
    pattern,
    lineage,
    payload,
    pulseIntelligence,
    bandMode,
    presenceBandState: immortalMeta.presenceBandState
  });

  const advantageField = {
    patternStrength: patternLen,
    lineageDepth,
    payloadSize,
    modeBias:
      mode === "stress"   ? 4 :
      mode === "drain"    ? 3 :
      mode === "recovery" ? 2 :
      1,

    // IMMORTAL / band surface (metadata-only, deterministic)
    bandMode: bandMode === "binary" ? "binary" : "symbolic",
    presenceBandState: immortalMeta.presenceBandState,
    harmonicDrift: immortalMeta.harmonicDrift,
    coherenceScore: immortalMeta.coherenceScore,

    experimentalTier: "v2-evolution-engine-v16-IMMORTAL-INTEL",

    // Binary-aware advantage surface
    binaryAware: binarySurface.hasBinary,
    binaryStrength: binarySurface.binaryStrength,
    binaryMode: binarySurface.binaryMode,
    binaryPattern: binarySurface.binaryPattern,
    routerHint: binarySurface.routerHint,
    meshHint: binarySurface.meshHint,
    organHint: binarySurface.organHint,

    // Intelligence surfaced
    solvednessScore: pulseIntelligence.solvednessScore,
    factoringSignal: pulseIntelligence.factoringSignal,
    computeTier: pulseIntelligence.computeTier,
    payloadComplexity: pulseIntelligence.payloadComplexity,
    readinessScore: pulseIntelligence.readinessScore,

    // Internal factoring surfaced
    factoringPressure: factoringSurface.pressure,
    factoringDepth: factoringSurface.depth,
    factoringStride: factoringSurface.stride,
    factoringIntent: factoringSurface.intent
  };

  return {
    advantageField,
    healthScore,
    binarySurface,
    immortalMeta,
    pulseIntelligence,
    factoringSurface
  };
}


// ============================================================================
//  INTERNAL: Pulse-level compute / factoring / evolution hints (legacy surface)
// ============================================================================
function runPulseComputeV2({
  pattern,
  lineage,
  payload,
  advantageField,
  healthScore
}) {
  const payloadKeys = payload && typeof payload === "object"
    ? Object.keys(payload)
    : [];

  const payloadSize = payloadKeys.length;
  const payloadComplexity = Math.min(payloadSize / 32, 1);

  const factoringSignal = computeHash(
    `${pattern}::${lineage.length}::${payloadKeys.join("|")}`
  );

  const solvednessScore = Math.min(
    (healthScore * 0.6) + ((1 - payloadComplexity) * 0.4),
    1
  );

  const computeTier =
    solvednessScore >= 0.9 ? "nearSolution" :
    solvednessScore >= 0.7 ? "refined" :
    solvednessScore >= 0.4 ? "factored" :
    "raw";

  const computeHints = {
    payloadComplexity,
    payloadSize,
    solvednessScore,
    computeTier,
    patternStrength: advantageField.patternStrength,
    lineageDepth: advantageField.lineageDepth,
    modeBias: advantageField.modeBias
  };

  return {
    factoringSignal,
    solvednessScore,
    computeTier,
    computeHints
  };
}


// ============================================================================
//  FACTORY — Create a Pulse v2 Evolution Engine Organism (v16-IMMORTAL-INTEL)
//  SYMBOLIC SHIFTER (primary) — createSymPulseV2
// ============================================================================
export function createSymPulseV2({
  jobId,
  pattern,
  payload = {},
  priority = "normal",
  returnTo = null,
  parentLineage = null,
  mode = "normal",
  pageId = "NO_PAGE",

  // SHIFTER dual-band + presence surface
  bandMode = "symbolic",
  presenceBandState = null,
  harmonicDrift = null,
  coherenceScore = null
}) {
  const lineage         = buildLineage(parentLineage, pattern);
  const shapeSignature  = computeShapeSignature(pattern, lineage);
  const shapeSignature2 = computeShapeSignatureAlt(pattern, lineage);
  const evolutionStage  = computeEvolutionStage(pattern, lineage);

  const patternAncestry       = buildPatternAncestry(pattern);
  const lineageSignature      = buildLineageSignature(lineage);
  const pageAncestrySignature = buildPageAncestrySignature({
    pattern,
    lineage,
    pageId
  });

  const {
    advantageField,
    healthScore,
    binarySurface,
    immortalMeta,
    pulseIntelligence,
    factoringSurface
  } = runEvolutionComputeLoopV2({
    pattern,
    lineage,
    payload,
    mode,
    bandMode,
    presenceBandState,
    harmonicDrift,
    coherenceScore
  });

  const pulseCompute = runPulseComputeV2({
    pattern,
    lineage,
    payload,
    advantageField,
    healthScore
  });

  const tier =
    healthScore >= 0.95 ? "microDegrade" :
    healthScore >= 0.85 ? "softDegrade" :
    healthScore >= 0.50 ? "midDegrade" :
    healthScore >= 0.15 ? "hardDegrade" :
    "criticalDegrade";

  const diagnostics = buildDiagnostics(
    pattern,
    lineage,
    healthScore,
    tier,
    binarySurface,
    immortalMeta,
    pulseIntelligence,
    factoringSurface
  );

  const evolutionSignature  = computeHash(pattern + "::" + lineageSignature);
  const evolutionSignature2 = computeHashIntelligence(pattern + "::" + lineageSignature);
  const dualHashSignature   = computeHash(
    `${shapeSignature}::${shapeSignature2}::${evolutionSignature}::${evolutionSignature2}`
  );

  const intelPayload = {
    kind: "PulseShifterEvolutionaryPulse",
    version: "v16-IMMORTAL-INTEL",
    pattern,
    lineageDepth: lineage.length,
    tier,
    bandMode: bandMode === "binary" ? "binary" : "symbolic",
    presenceBandState: immortalMeta.presenceBandState,
    factoringPressure: advantageField.factoringPressure,
    factoringDepth: advantageField.factoringDepth,
    factoringStride: advantageField.factoringStride,
    factoringIntent: advantageField.factoringIntent
  };

  const classicString =
    `PULSE_CREATE::PATTERN:${pattern}` +
    `::LINEAGE_DEPTH:${lineage.length}` +
    `::TIER:${tier}`;

  const dualHash = buildDualHashSignature(
    "PULSE_SHIFTER_EVOLUTION_CREATE",
    intelPayload,
    classicString
  );

  return {
    // Identity + contracts
    PulseRole,

    // Core pulse identity
    jobId,
    pattern,
    payload,
    priority,
    returnTo,
    lineage,
    mode,
    pageId,

    // Band / presence surface
    bandMode: bandMode === "binary" ? "binary" : "symbolic",
    presenceBandState: immortalMeta.presenceBandState,
    harmonicDrift: immortalMeta.harmonicDrift,
    coherenceScore: immortalMeta.coherenceScore,

    // Evolution engine type
    pulseType: "Pulse-v2-EvolutionEngine-v16-IMMORTAL-INTEL",

    // Advantage + health
    advantageField,
    healthScore,
    tier,

    // Immortal + binary + intelligence surfaces
    immortalMeta,
    binarySurface,
    pulseIntelligence,

    // Internal factoring surface
    pulseFactoring: factoringSurface,

    // Pulse-level compute / factoring / evolution hints
    pulseCompute,

    // Meta: signatures + diagnostics
    meta: {
      shapeSignature,
      shapeSignature2,
      evolutionStage,

      patternAncestry,
      lineageSignature,
      pageAncestrySignature,

      diagnostics,

      evolutionSignature,
      evolutionSignature2,
      dualHashSignature,

      patternSignature: computeHash(pattern),
      patternSignature2: computeHashIntelligence(pattern),

      lineageSurface: computeHash(String(lineage.length)),
      lineageSurface2: computeHashIntelligence(String(lineage.length)),

      advantageSignature: computeHash(JSON.stringify(advantageField)),
      advantageSignature2: computeHashIntelligence(JSON.stringify(advantageField)),

      healthSignature: computeHash(String(healthScore)),
      healthSignature2: computeHashIntelligence(String(healthScore)),

      tierSignature: computeHash(tier),
      tierSignature2: computeHashIntelligence(tier),

      pulseComputeSignature: computeHash(JSON.stringify(pulseCompute)),
      pulseComputeSignature2: computeHashIntelligence(JSON.stringify(pulseCompute)),

      pulseIntelligenceSignature: computeHash(JSON.stringify(pulseIntelligence)),
      pulseIntelligenceSignature2: computeHashIntelligence(JSON.stringify(pulseIntelligence)),

      binarySurfaceSignature: computeHash(JSON.stringify(binarySurface)),
      binarySurfaceSignature2: computeHashIntelligence(JSON.stringify(binarySurface)),

      immortalMetaSignature: computeHash(JSON.stringify(immortalMeta)),
      immortalMetaSignature2: computeHashIntelligence(JSON.stringify(immortalMeta)),

      pulseFactoringSignature: computeHash(JSON.stringify(factoringSurface)),
      pulseFactoringSignature2: computeHashIntelligence(JSON.stringify(factoringSurface)),

      dualHashIntel: dualHash.intel,
      dualHashClassic: dualHash.classic
    }
  };
}


// ============================================================================
//  EVOLUTION ENGINE — evolve an existing Pulse deterministically (v2 style)
//  SYMBOLIC SHIFTER (primary) — evolveSymPulseV2
// ============================================================================
export function evolveSymPulseV2(
  pulse,
  context = {}
) {
  const {
    routerHint,
    meshHint,
    organHint,

    bandMode = pulse.bandMode || "symbolic",
    presenceBandState = pulse.presenceBandState ?? null,
    harmonicDrift = pulse.harmonicDrift ?? null,
    coherenceScore = pulse.coherenceScore ?? null
  } = context;

  const nextPattern = evolvePattern(pulse.pattern, {
    routerHint,
    meshHint,
    organHint
  });

  const nextLineage         = buildLineage(pulse.lineage, nextPattern);
  const shapeSignature      = computeShapeSignature(nextPattern, nextLineage);
  const shapeSignature2     = computeShapeSignatureAlt(nextPattern, nextLineage);
  const evolutionStage      = computeEvolutionStage(nextPattern, nextLineage);
  const patternAncestry     = buildPatternAncestry(nextPattern);
  const lineageSignature    = buildLineageSignature(nextLineage);
  const pageId              = pulse.pageId || "NO_PAGE";
  const pageAncestrySignature = buildPageAncestrySignature({
    pattern: nextPattern,
    lineage: nextLineage,
    pageId
  });

  const {
    advantageField,
    healthScore,
    binarySurface,
    immortalMeta,
    pulseIntelligence,
    factoringSurface
  } = runEvolutionComputeLoopV2({
    pattern: nextPattern,
    lineage: nextLineage,
    payload: pulse.payload,
    mode: pulse.mode || "normal",
    bandMode,
    presenceBandState,
    harmonicDrift,
    coherenceScore
  });

  const pulseCompute = runPulseComputeV2({
    pattern: nextPattern,
    lineage: nextLineage,
    payload: pulse.payload,
    advantageField,
    healthScore
  });

  const tier =
    healthScore >= 0.95 ? "microDegrade" :
    healthScore >= 0.85 ? "softDegrade" :
    healthScore >= 0.50 ? "midDegrade" :
    healthScore >= 0.15 ? "hardDegrade" :
    "criticalDegrade";

  const diagnostics = buildDiagnostics(
    nextPattern,
    nextLineage,
    healthScore,
    tier,
    binarySurface,
    immortalMeta,
    pulseIntelligence,
    factoringSurface
  );

  const evolutionSignature  = computeHash(nextPattern + "::" + lineageSignature);
  const evolutionSignature2 = computeHashIntelligence(nextPattern + "::" + lineageSignature);
  const dualHashSignature   = computeHash(
    `${shapeSignature}::${shapeSignature2}::${evolutionSignature}::${evolutionSignature2}`
  );

  const intelPayload = {
    kind: "PulseShifterEvolutionaryPulse",
    version: "v16-IMMORTAL-INTEL",
    pattern: nextPattern,
    lineageDepth: nextLineage.length,
    tier,
    bandMode: bandMode === "binary" ? "binary" : "symbolic",
    presenceBandState: immortalMeta.presenceBandState,
    factoringPressure: advantageField.factoringPressure,
    factoringDepth: advantageField.factoringDepth,
    factoringStride: advantageField.factoringStride,
    factoringIntent: advantageField.factoringIntent
  };

  const classicString =
    `PULSE_EVOLVE::PATTERN:${nextPattern}` +
    `::LINEAGE_DEPTH:${nextLineage.length}` +
    `::TIER:${tier}`;

  const dualHash = buildDualHashSignature(
    "PULSE_SHIFTER_EVOLUTION_EVOLVE",
    intelPayload,
    classicString
  );

  return {
    // Identity + contracts
    PulseRole,

    // Core pulse identity (carried forward)
    jobId: pulse.jobId,
    pattern: nextPattern,
    payload: pulse.payload,
    priority: pulse.priority,
    returnTo: pulse.returnTo,
    lineage: nextLineage,
    mode: pulse.mode || "normal",
    pageId,

    // Band / presence surface
    bandMode: bandMode === "binary" ? "binary" : "symbolic",
    presenceBandState: immortalMeta.presenceBandState,
    harmonicDrift: immortalMeta.harmonicDrift,
    coherenceScore: immortalMeta.coherenceScore,

    // Evolution engine type
    pulseType: "Pulse-v2-EvolutionEngine-v16-IMMORTAL-INTEL",

    // Advantage + health
    advantageField,
    healthScore,
    tier,

    // Immortal + binary + intelligence surfaces
    immortalMeta,
    binarySurface,
    pulseIntelligence,

    // Internal factoring surface
    pulseFactoring: factoringSurface,

    // Pulse-level compute / factoring / evolution hints
    pulseCompute,

    // Meta: signatures + diagnostics
    meta: {
      shapeSignature,
      shapeSignature2,
      evolutionStage,

      patternAncestry,
      lineageSignature,
      pageAncestrySignature,

      diagnostics,

      evolutionSignature,
      evolutionSignature2,
      dualHashSignature,

      patternSignature: computeHash(nextPattern),
      patternSignature2: computeHashIntelligence(nextPattern),

      lineageSurface: computeHash(String(nextLineage.length)),
      lineageSurface2: computeHashIntelligence(String(nextLineage.length)),

      advantageSignature: computeHash(JSON.stringify(advantageField)),
      advantageSignature2: computeHashIntelligence(JSON.stringify(advantageField)),

      healthSignature: computeHash(String(healthScore)),
      healthSignature2: computeHashIntelligence(String(healthScore)),

      tierSignature: computeHash(tier),
      tierSignature2: computeHashIntelligence(tier),

      pulseComputeSignature: computeHash(JSON.stringify(pulseCompute)),
      pulseComputeSignature2: computeHashIntelligence(JSON.stringify(pulseCompute)),

      pulseIntelligenceSignature: computeHash(JSON.stringify(pulseIntelligence)),
      pulseIntelligenceSignature2: computeHashIntelligence(JSON.stringify(pulseIntelligence)),

      binarySurfaceSignature: computeHash(JSON.stringify(binarySurface)),
      binarySurfaceSignature2: computeHashIntelligence(JSON.stringify(binarySurface)),

      immortalMetaSignature: computeHash(JSON.stringify(immortalMeta)),
      immortalMetaSignature2: computeHashIntelligence(JSON.stringify(immortalMeta)),

      pulseFactoringSignature: computeHash(JSON.stringify(factoringSurface)),
      pulseFactoringSignature2: computeHashIntelligence(JSON.stringify(factoringSurface)),

      dualHashIntel: dualHash.intel,
      dualHashClassic: dualHash.classic
    }
  };
}
