// ============================================================================
//  FILE: PulseShifterEvolutionaryPulse-v24-IMMORTAL-INTEL++++.js
//  Pulse v2 Organism • Evolution Engine • Pattern + Lineage + Shape + Intelligence
//  v24-IMMORTAL-INTEL++++:
//    • Binary-first dual-band (binary/symbolic) + Presence/Band Surface
//    • ImmortalMeta surfaced (presenceBandState, harmonicDrift, coherenceScore, burstTier)
//    • BinarySurface surfaced (non-breaking, metadata-only)
//    • PulseIntelligence v24++++ (solvedness, factoring, computeTier, readiness, depth)
//    • Internal Signal Factoring v24 (pressure/signal/depth/stride/intent) — mesh/earn-aligned
//    • BaseShapeSurface + baseFormulaKey (INTEL hash) for mining/cheatsheets
//    • Chunk/Prewarm/Cache-style hints for GPU/burst/“bluetooth” impulse bursts
//    • Pulse-Compute v24 (legacy-compatible compute hints)
//    • DualHash signatures across evolution + intelligence + factoring + baseShape
//    • Deterministic, drift-proof, zero IO, zero randomness
// ============================================================================

import {
  OrganismIdentity,
  buildPulseOrganismMap as PulseOrganismMap,
  buildPulseOrganismMap as buildOrganismMap
} from "./PULSE-WORLD-MAP.js";
const Identity = OrganismIdentity(import.meta.url);

// 2 — EXPORT GENOME METADATA
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
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
  const classicHash = computeHash(`${label}::${classicString || ""}`);
  return {
    intel: intelHash,
    classic: classicHash
  };
}

function clamp01(v) {
  return Math.max(0, Math.min(1, v));
}

function safeNumber(v, fallback = 0) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

function normalizeBand(band) {
  const x = String(band || "symbolic").toLowerCase();
  if (x === "binary") return "binary";
  if (x === "dual") return "dual";
  return "symbolic";
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
  coherenceScore,
  burstTier
} = {}) {
  const m = payload?.immortalMeta || {};
  return {
    presenceBandState: presenceBandState ?? m.presenceBandState ?? null,
    harmonicDrift: harmonicDrift ?? m.harmonicDrift ?? null,
    coherenceScore: coherenceScore ?? m.coherenceScore ?? null,
    dualBandMode: m.dualBandMode ?? null,
    shifterBand: m.shifterBand ?? null,
    burstTier: burstTier ?? m.burstTier ?? null // v24: burst/“bluetooth” tier
  };
}

// ============================================================================
//  DIAGNOSTICS
// ============================================================================
function buildDiagnostics(pattern, lineage, healthScore, tier, binarySurface, immortalMeta, pulseIntelligence, factoringSurface, baseShapeSurface) {
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
    baseShape: baseShapeSurface,

    binaryPatternHash: binarySurface.binaryPattern
      ? computeHash(binarySurface.binaryPattern)
      : null,
    binaryModeHash: binarySurface.binaryMode
      ? computeHash(binarySurface.binaryMode)
      : null,
    immortalSignature: computeHash(JSON.stringify(immortalMeta)),
    intelligenceSignature: computeHash(JSON.stringify(pulseIntelligence)),
    factoringSignature: computeHash(JSON.stringify(factoringSurface)),
    baseShapeSignature: computeHash(JSON.stringify(baseShapeSurface))
  };
}

// ============================================================================
//  INTERNAL: PulseIntelligence (v24-INTEL++++)
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
    ? clamp01(binarySurface.binaryStrength)
    : 0;

  const depthNorm = clamp01(lineageDepth / 16);

  const solvednessScore = clamp01(
    healthScore * 0.55 +
    (1 - patternComplexity) * 0.15 +
    (1 - payloadComplexity) * 0.10 +
    binaryStrength * 0.10 +
    depthNorm * 0.10
  );

  const factoringSignal =
    lineageDepth >= 5 || payloadSize >= 16
      ? "high"
      : lineageDepth >= 3 || payloadSize >= 8
        ? "medium"
        : "low";

  const computeTier =
    solvednessScore >= 0.92 ? "nearSolution" :
    solvednessScore >= 0.75 ? "highValue"    :
    solvednessScore >= 0.45 ? "normal"       :
    solvednessScore >= 0.20 ? "lowPriority"  :
    "avoidCompute";

  const readinessScore = clamp01(
    solvednessScore * 0.6 +
    healthScore * 0.25 +
    (factoringSignal === "high" ? 0.10 : factoringSignal === "medium" ? 0.05 : 0)
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
//  INTERNAL: Pulse-level Signal Factoring v24 (IMMORTAL++++)
//  Mirrors Mesh/Earn style: pressure → signal (1/0) → depth → stride → intent
// ============================================================================
let pulseFactoringCycle = 0;

function computePulseFactoringSurface({
  pattern,
  lineage,
  payload,
  pulseIntelligence,
  bandMode = "binary",
  presenceBandState = null,
  coherenceScore = null
}) {
  pulseFactoringCycle++;

  const lineageDepth = Array.isArray(lineage) ? lineage.length : 0;
  const payloadSize = payload && typeof payload === "object"
    ? Object.keys(payload).length
    : 0;

  const patternLen = typeof pattern === "string" ? pattern.length : 0;

  const auraBias =
    presenceBandState === "presence_high" ? 1.0 :
    presenceBandState === "presence_mid"  ? 0.7 :
    presenceBandState === "presence_low"  ? 0.4 :
    0.2;

  const flowBias =
    bandMode === "binary" ? 0.8 :
    bandMode === "dual"   ? 0.6 :
    0.4;

  const meshBias =
    lineageDepth >= 6 ? 0.9 :
    lineageDepth >= 3 ? 0.6 :
    0.3;

  const complexityNorm = clamp01((patternLen + payloadSize) / 160);
  const intelligenceNorm = clamp01(pulseIntelligence.solvednessScore);
  const coherenceNorm = typeof coherenceScore === "number"
    ? clamp01(coherenceScore)
    : 0.5;

  const factoringPressure =
    auraBias        * 0.22 +
    flowBias        * 0.20 +
    meshBias        * 0.18 +
    complexityNorm  * 0.15 +
    intelligenceNorm* 0.15 +
    coherenceNorm   * 0.10;

  const clampedPressure = clamp01(factoringPressure);

  const highPressure = clampedPressure >= 0.6;
  const lowPressure  = clampedPressure <= 0.18;

  let signal;
  if (highPressure) {
    signal = 1;
  } else if (lowPressure) {
    signal = 0;
  } else {
    signal = pulseIntelligence.factoringSignal === "high" ? 1 : 0;
  }

  const depth =
    signal === 1
      ? Math.min(1 + Math.floor(lineageDepth / 2), 10)
      : 0;

  const stride =
    depth > 0 ? 1 / (depth + 1) : 1;

  const intent =
    signal === 1
      ? "prefer_factored_pulse_v24"
      : "normal";

  const intelPayload = {
    layer: "PulseShifterFactoring",
    version: "v24-IMMORTAL-INTEL++++",
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
    presenceBandState,
    coherenceScore
  };

  const classicString =
    `PULSE_FACTORS_V24::SIG:${signal}` +
    `::DEPTH:${depth}` +
    `::STRIDE:${stride.toFixed(4)}` +
    `::PRESS:${clampedPressure.toFixed(4)}` +
    `::BAND:${bandMode}`;

  const sig = buildDualHashSignature(
    "PULSE_SHIFTER_SIGNAL_FACTORS_V24",
    intelPayload,
    classicString
  );

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
    presenceBandState,
    coherenceScore,
    signatures: sig
  };
}

// ============================================================================
//  INTERNAL: Base Shape Surface v24 (symbolic/binary shifter)
// ============================================================================
function buildShifterBaseShapeSurface({
  pattern,
  lineage,
  binarySurface,
  immortalMeta,
  pulseIntelligence,
  factoringSurface
}) {
  const ancestry = buildPatternAncestry(pattern);

  const shapePayload = {
    version: "v24-IMMORTAL-INTEL-SHIFTER-BASESHAPE",
    pattern,
    ancestry,
    lineageDepth: lineage.length,
    evolutionStage: computeEvolutionStage(pattern, lineage),
    hasBinary: binarySurface.hasBinary,
    binaryMode: binarySurface.binaryMode || null,
    presenceBandState: immortalMeta.presenceBandState || null,
    coherenceScore: immortalMeta.coherenceScore ?? null,
    burstTier: immortalMeta.burstTier ?? null,
    solvednessScore: pulseIntelligence.solvednessScore,
    computeTier: pulseIntelligence.computeTier,
    factoringSignal: pulseIntelligence.factoringSignal,
    factoringPressure: factoringSurface.pressure,
    factoringDepth: factoringSurface.depth,
    factoringStride: factoringSurface.stride,
    factoringIntent: factoringSurface.intent
  };

  const classicString =
    `SHIFTER_BASE_SHAPE_V24::${shapePayload.version}` +
    `::PAT:${pattern}` +
    `::DEPTH:${shapePayload.lineageDepth}` +
    `::STAGE:${shapePayload.evolutionStage}` +
    `::BIN:${shapePayload.hasBinary ? 1 : 0}` +
    `::TIER:${shapePayload.computeTier}`;

  const sig = buildDualHashSignature(
    "SHIFTER_BASE_SHAPE_V24",
    shapePayload,
    classicString
  );

  const baseFormulaKey = sig.intel;

  return {
    baseShapeVersion: shapePayload.version,
    baseShapeIntelSignature: sig.intel,
    baseShapeClassicSignature: sig.classic,
    baseFormulaKey,
    shapePayload
  };
}

// ============================================================================
//  INTERNAL: Deterministic evolution compute loop (v2 — IMMORTAL v24)
// ============================================================================
function runEvolutionComputeLoopV2({
  pattern,
  lineage,
  payload,
  mode,
  bandMode = "binary",          // v24: binary-first
  presenceBandState = null,
  harmonicDrift = null,
  coherenceScore = null,
  burstTier = null
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
    coherenceScore,
    burstTier
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
    presenceBandState: immortalMeta.presenceBandState,
    coherenceScore: immortalMeta.coherenceScore
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
    bandMode: normalizeBand(bandMode),
    presenceBandState: immortalMeta.presenceBandState,
    harmonicDrift: immortalMeta.harmonicDrift,
    coherenceScore: immortalMeta.coherenceScore,
    burstTier: immortalMeta.burstTier,

    experimentalTier: "v2-evolution-engine-v24-IMMORTAL-INTEL++++",

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
    factoringIntent: factoringSurface.intent,

    // v24: burst / “bluetooth” style hints (metadata-only)
    burstReady:
      immortalMeta.burstTier === "high" ||
      (pulseIntelligence.computeTier === "highValue" && factoringSurface.signal === 1),
    burstStyle:
      immortalMeta.burstTier === "high" ? "power_burst" :
      immortalMeta.burstTier === "mid"  ? "mesh_burst"  :
      "none"
  };

  const baseShapeSurface = buildShifterBaseShapeSurface({
    pattern,
    lineage,
    binarySurface,
    immortalMeta,
    pulseIntelligence,
    factoringSurface
  });

  return {
    advantageField,
    healthScore,
    binarySurface,
    immortalMeta,
    pulseIntelligence,
    factoringSurface,
    baseShapeSurface
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
    modeBias: advantageField.modeBias,
    burstReady: advantageField.burstReady,
    burstStyle: advantageField.burstStyle
  };

  return {
    factoringSignal,
    solvednessScore,
    computeTier,
    computeHints
  };
}

// ============================================================================
//  FACTORY — Create a Pulse v2 Evolution Engine Organism (v24-IMMORTAL-INTEL++++)
//  BINARY-FIRST SHIFTER — createPulseV2 (binary default)
// ============================================================================
export function createPulseV2({
  jobId,
  pattern,
  payload = {},
  priority = "normal",
  returnTo = null,
  parentLineage = null,
  mode = "normal",
  pageId = "NO_PAGE",

  // SHIFTER dual-band + presence surface
  bandMode = "binary",              // v24: binary-first
  presenceBandState = null,
  harmonicDrift = null,
  coherenceScore = null,
  burstTier = null
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
    factoringSurface,
    baseShapeSurface
  } = runEvolutionComputeLoopV2({
    pattern,
    lineage,
    payload,
    mode,
    bandMode,
    presenceBandState,
    harmonicDrift,
    coherenceScore,
    burstTier
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
    factoringSurface,
    baseShapeSurface
  );

  const evolutionSignature  = computeHash(pattern + "::" + lineageSignature);
  const evolutionSignature2 = computeHashIntelligence(pattern + "::" + lineageSignature);
  const dualHashSignature   = computeHash(
    `${shapeSignature}::${shapeSignature2}::${evolutionSignature}::${evolutionSignature2}`
  );

  const intelPayload = {
    kind: "PulseShifterEvolutionaryPulse",
    version: "v24-IMMORTAL-INTEL++++",
    pattern,
    lineageDepth: lineage.length,
    tier,
    bandMode: normalizeBand(bandMode),
    presenceBandState: immortalMeta.presenceBandState,
    factoringPressure: advantageField.factoringPressure,
    factoringDepth: advantageField.factoringDepth,
    factoringStride: advantageField.factoringStride,
    factoringIntent: advantageField.factoringIntent,
    burstTier: immortalMeta.burstTier,
    burstReady: advantageField.burstReady,
    burstStyle: advantageField.burstStyle
  };

  const classicString =
    `PULSE_CREATE_V24::PATTERN:${pattern}` +
    `::LINEAGE_DEPTH:${lineage.length}` +
    `::TIER:${tier}` +
    `::BAND:${normalizeBand(bandMode)}`;

  const dualHash = buildDualHashSignature(
    "PULSE_SHIFTER_EVOLUTION_CREATE_V24",
    intelPayload,
    classicString
  );

  const baseFormulaKey = baseShapeSurface.baseFormulaKey;

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
    bandMode: normalizeBand(bandMode),
    presenceBandState: immortalMeta.presenceBandState,
    harmonicDrift: immortalMeta.harmonicDrift,
    coherenceScore: immortalMeta.coherenceScore,
    burstTier: immortalMeta.burstTier,

    // Evolution engine type
    pulseType: "Pulse-v2-EvolutionEngine-v24-IMMORTAL-INTEL++++",

    // Advantage + health
    advantageField,
    healthScore,
    tier,

    // Immortal + binary + intelligence surfaces
    immortalMeta,
    binarySurface,
    pulseIntelligence,

    // Internal factoring + base shape
    pulseFactoring: factoringSurface,
    shifterBaseShape: baseShapeSurface,
    baseFormulaKey,

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

      baseShapeSignature: computeHash(JSON.stringify(baseShapeSurface)),
      baseShapeSignature2: computeHashIntelligence(JSON.stringify(baseShapeSurface)),

      baseFormulaKeySignature: computeHash(baseFormulaKey),
      baseFormulaKeySignature2: computeHashIntelligence(baseFormulaKey),

      dualHashIntel: dualHash.intel,
      dualHashClassic: dualHash.classic
    }
  };
}

// ============================================================================
//  EVOLUTION ENGINE — evolve an existing Pulse deterministically (v2 style)
//  BINARY-FIRST SHIFTER — evolvePulseV2
// ============================================================================
export function evolvePulseV2(
  pulse,
  context = {}
) {
  const {
    routerHint,
    meshHint,
    organHint,

    bandMode = pulse.bandMode || "binary",
    presenceBandState = pulse.presenceBandState ?? null,
    harmonicDrift = pulse.harmonicDrift ?? null,
    coherenceScore = pulse.coherenceScore ?? null,
    burstTier = pulse.burstTier ?? null
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
    factoringSurface,
    baseShapeSurface
  } = runEvolutionComputeLoopV2({
    pattern: nextPattern,
    lineage: nextLineage,
    payload: pulse.payload,
    mode: pulse.mode || "normal",
    bandMode,
    presenceBandState,
    harmonicDrift,
    coherenceScore,
    burstTier
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
    factoringSurface,
    baseShapeSurface
  );

  const evolutionSignature  = computeHash(nextPattern + "::" + lineageSignature);
  const evolutionSignature2 = computeHashIntelligence(nextPattern + "::" + lineageSignature);
  const dualHashSignature   = computeHash(
    `${shapeSignature}::${shapeSignature2}::${evolutionSignature}::${evolutionSignature2}`
  );

  const intelPayload = {
    kind: "PulseShifterEvolutionaryPulse",
    version: "v24-IMMORTAL-INTEL++++",
    pattern: nextPattern,
    lineageDepth: nextLineage.length,
    tier,
    bandMode: normalizeBand(bandMode),
    presenceBandState: immortalMeta.presenceBandState,
    factoringPressure: advantageField.factoringPressure,
    factoringDepth: advantageField.factoringDepth,
    factoringStride: advantageField.factoringStride,
    factoringIntent: advantageField.factoringIntent,
    burstTier: immortalMeta.burstTier,
    burstReady: advantageField.burstReady,
    burstStyle: advantageField.burstStyle
  };

  const classicString =
    `PULSE_EVOLVE_V24::PATTERN:${nextPattern}` +
    `::LINEAGE_DEPTH:${nextLineage.length}` +
    `::TIER:${tier}` +
    `::BAND:${normalizeBand(bandMode)}`;

  const dualHash = buildDualHashSignature(
    "PULSE_SHIFTER_EVOLUTION_EVOLVE_V24",
    intelPayload,
    classicString
  );

  const baseFormulaKey = baseShapeSurface.baseFormulaKey;

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
    bandMode: normalizeBand(bandMode),
    presenceBandState: immortalMeta.presenceBandState,
    harmonicDrift: immortalMeta.harmonicDrift,
    coherenceScore: immortalMeta.coherenceScore,
    burstTier: immortalMeta.burstTier,

    // Evolution engine type
    pulseType: "Pulse-v2-EvolutionEngine-v24-IMMORTAL-INTEL++++",

    // Advantage + health
    advantageField,
    healthScore,
    tier,

    // Immortal + binary + intelligence surfaces
    immortalMeta,
    binarySurface,
    pulseIntelligence,

    // Internal factoring + base shape
    pulseFactoring: factoringSurface,
    shifterBaseShape: baseShapeSurface,
    baseFormulaKey,

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

      baseShapeSignature: computeHash(JSON.stringify(baseShapeSurface)),
      baseShapeSignature2: computeHashIntelligence(JSON.stringify(baseShapeSurface)),

      baseFormulaKeySignature: computeHash(baseFormulaKey),
      baseFormulaKeySignature2: computeHashIntelligence(baseFormulaKey),

      dualHashIntel: dualHash.intel,
      dualHashClassic: dualHash.classic
    }
  };
}
