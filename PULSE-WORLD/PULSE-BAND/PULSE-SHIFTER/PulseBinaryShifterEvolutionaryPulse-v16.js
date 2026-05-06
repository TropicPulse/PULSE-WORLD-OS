// ============================================================================
//  FILE: PulseShifterEvolutionaryPulse-v16-IMMORTAL-INTEL+++.js
//  Pulse v2 Organism • Evolution Engine • Pattern + Lineage + Shape + Intelligence
//  v16-IMMORTAL-INTEL+++:
//    • Dual-band aware (symbolic/binary) + Presence/Band Surface
//    • ImmortalMeta surfaced (presenceBandState, harmonicDrift, coherenceScore)
//    • BinarySurface surfaced (non-breaking, metadata-only)
//    • PulseIntelligence (solvedness, factoring, computeTier, readiness, depth)
//    • Pulse-Compute hints preserved (computeHints) for legacy consumers
//    • DualHash signatures across evolution + intelligence
//    • INTERNAL SignalFactoringSurface (pressure/signal/depth/stride) IMMORTAL-style
//    • INTERNAL BaseShapeSurface + baseFormulaKey (INTEL hash) for mining/cheatsheets
// ============================================================================

/*
AI_EXPERIENCE_META = {
  identity: "PulseShifterEvolutionaryPulse",
  version: "v16-IMMORTAL-INTEL+++",
  layer: "frontend",
  role: "symbolic_evolution_engine",
  lineage: "PulseOS-v12 → v16-IMMORTAL-INTEL+++",

  evo: {
    symbolicCore: true,
    dualBand: true,
    presenceAware: true,
    chunkAligned: true,
    safeRouteFree: true,
    deterministic: true,
    pulseCompute: true,
    pulseIntelligence: true,
    immortalMetaAware: true,
    binarySurfaceReady: true,
    dualHashReady: true,

    signalFactoringAware: true,
    baseShapeAware: true,
    baseFormulaKeyAware: true,
    patternMatchSurface: true
  },

  contract: {
    always: [
      "PulsePresence",
      "PulseChunks",
      "PulsePresenceNormalizer",
      "PulseUIFlow"
    ],
    never: [
      "legacyShifter",
      "legacyEvolutionEngine",
      "safeRoute",
      "fetchViaCNS",
      "legacyPresence",
      "legacyChunker"
    ]
  }
}
*/


// ============================================================================
// ⭐ PulseRole — Pulse v2 evolution engine (v16-IMMORTAL-INTEL+++)
// ============================================================================
export const PulseRole = {
  type: "Pulse",
  subsystem: "Pulse",
  layer: "Organ",
  version: "16-IMMORTAL-INTEL+++",
  identity: "PulseShifterEvolutionaryPulse-v16-IMMORTAL-INTEL+++",

  evo: {
    // Core evolution capabilities
    driftProof: true,
    patternAware: true,
    lineageAware: true,
    shapeAware: true,
    modeAware: true,

    // Band / presence surface (dual-band SHIFTER, symbolic-primary)
    dualBandAware: true,
    symbolicPrimary: true,
    binaryFieldAware: true,
    presenceAware: true,
    harmonicsAware: true,
    epochStable: true,

    // Ready to cooperate with routing/mesh organs
    routerAwareReady: true,
    meshAwareReady: true,

    // Explicitly an evolution engine
    evolutionEngineReady: true,

    // Advantage field is unified so a binary front-end can read it
    unifiedAdvantageField: true,
    pulseV2Ready: true,
    futureEvolutionReady: true,

    // Diagnostics + signatures + evolution surface
    diagnosticsReady: true,
    signatureReady: true,
    evolutionSurfaceReady: true,

    // Pulse-level compute / factoring / evolution hints
    pulseComputeReady: true,
    pulseFactoringReady: true,

    // Intelligence surface
    pulseIntelligenceReady: true,
    solvednessAware: true,
    computeTierAware: true,
    factoringAware: true,

    // Binary integration flags:
    binaryBackEndReady: true,
    binaryFrontEndContract: "PulseBinaryShifterEvolutionaryPulse-v16-IMMORTAL-INTEL++",
    binarySurfaceReady: true,

    // Immortal meta
    immortalMetaAware: true,

    // Dual-hash surface
    dualHashReady: true,

    // Internal factoring + base formula
    signalFactoringAware: true,
    baseShapeAware: true,
    baseFormulaKeyAware: true
  },

  routingContract: "PulseRouter-v16",
  meshContract: "PulseMesh-v16",
  sendContract: "PulseSend-v16",
  gpuOrganContract: "PulseGPU-v16",
  earnCompatibility: "PulseEarn-v16"
};


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

function clamp01(v) {
  return Math.max(0, Math.min(1, v));
}

function safeNumber(v, fallback = 0) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

function normalizeBand(band) {
  const x = String(band || "symbolic").toLowerCase();
  return x === "binary" ? "binary" : "symbolic";
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
function buildDiagnostics(pattern, lineage, healthScore, tier, binarySurface, immortalMeta, pulseIntelligence) {
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

    binaryPatternHash: binarySurface.binaryPattern
      ? computeHash(binarySurface.binaryPattern)
      : null,
    binaryModeHash: binarySurface.binaryMode
      ? computeHash(binarySurface.binaryMode)
      : null,
    immortalSignature: computeHash(JSON.stringify(immortalMeta)),
    intelligenceSignature: computeHash(JSON.stringify(pulseIntelligence))
  };
}


// ============================================================================
//  INTERNAL: PulseIntelligence (v16-INTEL) — symbolic shifter
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

    experimentalTier: "v2-evolution-engine-v16-IMMORTAL-INTEL+++",

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
    readinessScore: pulseIntelligence.readinessScore
  };

  return {
    advantageField,
    healthScore,
    binarySurface,
    immortalMeta,
    pulseIntelligence
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
//  INTERNAL: SHIFTER-LEVEL SIGNAL FACTORING + BASE SHAPE (symbolic shifter)
// ============================================================================

function buildShifterSignalFactoringSurface({
  pattern,
  lineage,
  binarySurface,
  immortalMeta,
  pulseIntelligence
}) {
  const depth = lineage.length || 1;
  const binaryWeight = binarySurface.hasBinary ? 1 : 0;
  const coherence = typeof immortalMeta.coherenceScore === "number"
    ? immortalMeta.coherenceScore
    : 0.5;

  const solvedness = safeNumber(pulseIntelligence.solvednessScore, 0);

  // Symbolic shifter pressure: lineage + coherence + solvedness + binary hint
  const pressure =
    0.35 * (depth / (depth + 4)) +
    0.25 * coherence +
    0.25 * solvedness +
    0.15 * (binaryWeight);

  const clampedPressure = clamp01(pressure);

  const signal = clampedPressure > 0.25 ? 1 : 0;
  const stride =
    depth > 0 ? 1 / (depth + 1) : 1;

  const factoringProfile = {
    layer: "shifter-symbolic",
    version: "v16-IMMORTAL-INTEL+++",
    pressure: clampedPressure,
    signal,
    depth,
    stride,
    hasBinary: binarySurface.hasBinary,
    coherenceScore: immortalMeta.coherenceScore,
    solvedness: pulseIntelligence.solvednessScore,
    computeTier: pulseIntelligence.computeTier,
    factoringSignal: pulseIntelligence.factoringSignal
  };

  const classicString =
    `SYM_SHIFTER_FACTORS::SIG:${signal}` +
    `::DEPTH:${depth}` +
    `::STRIDE:${stride.toFixed(4)}` +
    `::PRESS:${clampedPressure.toFixed(4)}`;

  const sig = buildDualHashSignature(
    "SYM_SHIFTER_SIGNAL_FACTORS",
    factoringProfile,
    classicString
  );

  return {
    factoringProfile,
    signatures: sig
  };
}

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
    version: "v16-IMMORTAL-INTEL-SYM-SHIFTER-BASESHAPE",
    pattern,
    ancestry,
    lineageDepth: lineage.length,
    evolutionStage: computeEvolutionStage(pattern, lineage),
    hasBinary: binarySurface.hasBinary,
    binaryMode: binarySurface.binaryMode || null,
    presenceBandState: immortalMeta.presenceBandState || null,
    coherenceScore: immortalMeta.coherenceScore ?? null,
    solvednessScore: pulseIntelligence.solvednessScore,
    computeTier: pulseIntelligence.computeTier,
    factoringSignal: pulseIntelligence.factoringSignal,
    factoringPressure: factoringSurface.factoringProfile.pressure,
    factoringDepth: factoringSurface.factoringProfile.depth,
    factoringStride: factoringSurface.factoringProfile.stride
  };

  const classicString =
    `SYM_SHIFTER_BASE_SHAPE::${shapePayload.version}` +
    `::PAT:${pattern}` +
    `::DEPTH:${shapePayload.lineageDepth}` +
    `::STAGE:${shapePayload.evolutionStage}` +
    `::BIN:${shapePayload.hasBinary ? 1 : 0}` +
    `::TIER:${shapePayload.computeTier}`;

  const sig = buildDualHashSignature(
    "SYM_SHIFTER_BASE_SHAPE",
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
//  FACTORY — Create a Pulse v2 Evolution Engine Organism (v16-IMMORTAL-INTEL+++)
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
    pulseIntelligence
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
    pulseIntelligence
  );

  const evolutionSignature  = computeHash(pattern + "::" + lineageSignature);
  const evolutionSignature2 = computeHashIntelligence(pattern + "::" + lineageSignature);
  const dualHashSignature   = computeHash(
    `${shapeSignature}::${shapeSignature2}::${evolutionSignature}::${evolutionSignature2}`
  );

  // INTERNAL: shifter-level factoring + base shape + baseFormulaKey
  const factoringSurface = buildShifterSignalFactoringSurface({
    pattern,
    lineage,
    binarySurface,
    immortalMeta,
    pulseIntelligence
  });

  const baseShapeSurface = buildShifterBaseShapeSurface({
    pattern,
    lineage,
    binarySurface,
    immortalMeta,
    pulseIntelligence,
    factoringSurface
  });

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
    bandMode: bandMode === "binary" ? "binary" : "symbolic",
    presenceBandState: immortalMeta.presenceBandState,
    harmonicDrift: immortalMeta.harmonicDrift,
    coherenceScore: immortalMeta.coherenceScore,

    // Evolution engine type
    pulseType: "Pulse-v2-EvolutionEngine-v16-IMMORTAL-INTEL+++",

    // Advantage + health
    advantageField,
    healthScore,
    tier,

    // Immortal + binary + intelligence surfaces
    immortalMeta,
    binarySurface,
    pulseIntelligence,

    // Pulse-level compute / factoring / evolution hints
    pulseCompute,

    // INTERNAL factoring + base shape
    shifterFactoring: factoringSurface,
    shifterBaseShape: baseShapeSurface,
    baseFormulaKey,

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

      shifterFactoringSignature: computeHash(JSON.stringify(factoringSurface)),
      shifterFactoringSignature2: computeHashIntelligence(JSON.stringify(factoringSurface)),

      baseShapeSignature: computeHash(JSON.stringify(baseShapeSurface)),
      baseShapeSignature2: computeHashIntelligence(JSON.stringify(baseShapeSurface)),

      baseFormulaKeySignature: computeHash(baseFormulaKey),
      baseFormulaKeySignature2: computeHashIntelligence(baseFormulaKey)
    }
  };
}


// ============================================================================
//  EVOLUTION ENGINE — evolve an existing Pulse deterministically (v2 style)
// ============================================================================
export function evolvePulseV2(
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
    pulseIntelligence
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
    pulseIntelligence
  );

  const evolutionSignature  = computeHash(nextPattern + "::" + lineageSignature);
  const evolutionSignature2 = computeHashIntelligence(nextPattern + "::" + lineageSignature);
  const dualHashSignature   = computeHash(
    `${shapeSignature}::${shapeSignature2}::${evolutionSignature}::${evolutionSignature2}`
  );

  // INTERNAL: shifter-level factoring + base shape + baseFormulaKey
  const factoringSurface = buildShifterSignalFactoringSurface({
    pattern: nextPattern,
    lineage: nextLineage,
    binarySurface,
    immortalMeta,
    pulseIntelligence
  });

  const baseShapeSurface = buildShifterBaseShapeSurface({
    pattern: nextPattern,
    lineage: nextLineage,
    binarySurface,
    immortalMeta,
    pulseIntelligence,
    factoringSurface
  });

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
    bandMode: bandMode === "binary" ? "binary" : "symbolic",
    presenceBandState: immortalMeta.presenceBandState,
    harmonicDrift: immortalMeta.harmonicDrift,
    coherenceScore: immortalMeta.coherenceScore,

    // Evolution engine type
    pulseType: "Pulse-v2-EvolutionEngine-v16-IMMORTAL-INTEL+++",

    // Advantage + health
    advantageField,
    healthScore,
    tier,

    // Immortal + binary + intelligence surfaces
    immortalMeta,
    binarySurface,
    pulseIntelligence,

    // Pulse-level compute / factoring / evolution hints
    pulseCompute,

    // INTERNAL factoring + base shape
    shifterFactoring: factoringSurface,
    shifterBaseShape: baseShapeSurface,
    baseFormulaKey,

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

      shifterFactoringSignature: computeHash(JSON.stringify(factoringSurface)),
      shifterFactoringSignature2: computeHashIntelligence(JSON.stringify(factoringSurface)),

      baseShapeSignature: computeHash(JSON.stringify(baseShapeSurface)),
      baseShapeSignature2: computeHashIntelligence(JSON.stringify(baseShapeSurface)),

      baseFormulaKeySignature: computeHash(baseFormulaKey),
      baseFormulaKeySignature2: computeHashIntelligence(baseFormulaKey)
    }
  };
}
