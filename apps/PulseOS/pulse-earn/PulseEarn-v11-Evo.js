// ============================================================================
//  PulseEarn-v11-Evo.js — Earn Organism v11.0
//  Evolutionary Earn Organ • Pattern + Lineage + Shape • Compute-Ready
//  v11: Diagnostics + Signatures + Evolution Surface + Advantage Surface
// ============================================================================
//
//  SAFETY CONTRACT (v11-Evo):
//  --------------------------
//  • No imports.
//  • No randomness.
//  • No timestamps.
//  • Pure deterministic string/shape operations.
//  • Zero mutation outside instance.
// ============================================================================


// ============================================================================
//  EarnRole — identifies this as the Earn v11 Organism
// ============================================================================
export const EarnRole = {
  type: "Earn",
  subsystem: "Earn",
  layer: "Organ",
  version: "11.0",
  identity: "Earn-v11-Evo",

  evo: {
    driftProof: true,
    patternAware: true,
    lineageAware: true,
    shapeAware: true,
    evolutionEngineReady: true,
    gpuAwareReady: true,
    minerAwareReady: true,
    airAwareReady: true,
    offlineAwareReady: true,
    futureEvolutionReady: true,

    unifiedAdvantageField: true,
    earnV3Ready: true,

    ancestryAware: true,
    loopTheoryAware: true,
    tierAware: true,
    advantageFieldAware: true,

    continuanceAware: true,
    legacyBridgeCapable: true,

    diagnosticsReady: true,
    signatureReady: true,
    evolutionSurfaceReady: true
  },

  routingContract: "PulseRouter-v11",
  meshContract: "PulseMesh-v11",
  sendContract: "PulseSend-v11",
  gpuOrganContract: "PulseGPU-v11",
  minerContract: "PulseMiner-v11",
  pulseCompatibility: "Pulse-v1/v2/v3"
};


// ============================================================================
//  INTERNAL HELPERS — deterministic, tiny, pure
// ============================================================================

function computeHash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h + str.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `h${h}`;
}

function buildLineage(parentLineage, pattern) {
  const base = Array.isArray(parentLineage) ? parentLineage : [];
  return [...base, pattern];
}

function computeShapeSignature(pattern, lineage) {
  const raw = `${pattern}::${lineage.join("::")}`;
  return `earn-shape-${computeHash(raw)}`;
}

function computeEvolutionStage(pattern, lineage) {
  const depth = lineage.length;

  if (depth === 1) return "seed";
  if (depth === 2) return "sprout";
  if (depth === 3) return "branch";

  if (pattern.includes("gpu")) return "gpu-aware";
  if (pattern.includes("miner")) return "miner-aware";
  if (pattern.includes("air")) return "air-compute";

  return "mature";
}

function evolvePattern(pattern, context = {}) {
  const { gpuHint, minerHint, airHint } = context;

  const parts = [pattern];

  if (gpuHint) parts.push(`g:${gpuHint}`);
  if (minerHint) parts.push(`m:${minerHint}`);
  if (airHint) parts.push(`a:${airHint}`);

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

function computeHealthScore(pattern, lineage) {
  const base = 0.7 + Math.min(0.3, lineage.length * 0.02 + pattern.length * 0.001);
  return Math.max(0.15, Math.min(1.0, base));
}

function classifyDegradationTier(h) {
  if (h >= 0.95) return "microDegrade";
  if (h >= 0.85) return "softDegrade";
  if (h >= 0.50) return "midDegrade";
  if (h >= 0.15) return "hardDegrade";
  return "criticalDegrade";
}

function buildAdvantageField(pattern, lineage) {
  return {
    lineageDepth: lineage.length,
    patternStrength: pattern.length,
    shapeComplexity: lineage.length * pattern.length
  };
}

function buildDiagnostics(pattern, lineage, healthScore, tier) {
  return {
    patternLength: pattern.length,
    lineageDepth: lineage.length,
    healthBucket:
      healthScore >= 0.9 ? "elite" :
      healthScore >= 0.75 ? "high" :
      healthScore >= 0.5 ? "medium" : "low",
    tier,
    lineageDensity: lineage.length === 0 ? 0 : pattern.length / lineage.length
  };
}


// ============================================================================
//  FACTORY — Create an Earn v11 Organism
// ============================================================================
export function createEarn({
  jobId,
  pattern,
  payload = {},
  priority = "normal",
  returnTo = null,
  parentLineage = null,
  pageId = "NO_PAGE"
}) {
  const lineage = buildLineage(parentLineage, pattern);
  const shapeSignature = computeShapeSignature(pattern, lineage);
  const evolutionStage = computeEvolutionStage(pattern, lineage);

  const patternAncestry = buildPatternAncestry(pattern);
  const lineageSignature = buildLineageSignature(lineage);
  const pageAncestrySignature = buildPageAncestrySignature({ pattern, lineage, pageId });

  const healthScore = computeHealthScore(pattern, lineage);
  const tier = classifyDegradationTier(healthScore);
  const advantageField = buildAdvantageField(pattern, lineage);
  const diagnostics = buildDiagnostics(pattern, lineage, healthScore, tier);

  return {
    EarnRole,
    jobId,
    pattern,
    payload,
    priority,
    returnTo,
    lineage,
    pageId,

    meta: {
      shapeSignature,
      evolutionStage,

      patternAncestry,
      lineageSignature,
      pageAncestrySignature,

      healthScore,
      tier,
      advantageField,
      diagnostics,

      // v11 signatures
      earnSignature: computeHash(pattern + "::" + lineageSignature),
      patternSignature: computeHash(pattern),
      lineageSurface: computeHash(String(lineage.length)),
      advantageSignature: computeHash(JSON.stringify(advantageField)),
      healthSignature: computeHash(String(healthScore)),
      tierSignature: computeHash(tier),

      loopTheory: {
        routingCompletion: true,
        allowLoopfieldPropulsion: true,
        pulseComputeContinuity: true,
        errorRouteAround: true,

        continuanceCapable: true,
        preferContinuanceOnOrganFailure: true
      }
    }
  };
}


// ============================================================================
//  EVOLUTION ENGINE — evolve an existing Earn deterministically
// ============================================================================
export function evolveEarn(earn, context = {}) {
  const nextPattern = evolvePattern(earn.pattern, context);
  const nextLineage = buildLineage(earn.lineage, nextPattern);

  const shapeSignature = computeShapeSignature(nextPattern, nextLineage);
  const evolutionStage = computeEvolutionStage(nextPattern, nextLineage);

  const patternAncestry = buildPatternAncestry(nextPattern);
  const lineageSignature = buildLineageSignature(nextLineage);
  const pageId = earn.pageId || "NO_PAGE";
  const pageAncestrySignature = buildPageAncestrySignature({
    pattern: nextPattern,
    lineage: nextLineage,
    pageId
  });

  const healthScore = computeHealthScore(nextPattern, nextLineage);
  const tier = classifyDegradationTier(healthScore);
  const advantageField = buildAdvantageField(nextPattern, nextLineage);
  const diagnostics = buildDiagnostics(nextPattern, nextLineage, healthScore, tier);

  return {
    EarnRole,
    jobId: earn.jobId,
    pattern: nextPattern,
    payload: earn.payload,
    priority: earn.priority,
    returnTo: earn.returnTo,
    lineage: nextLineage,
    pageId,

    meta: {
      shapeSignature,
      evolutionStage,

      patternAncestry,
      lineageSignature,
      pageAncestrySignature,

      healthScore,
      tier,
      advantageField,
      diagnostics,

      earnSignature: computeHash(nextPattern + "::" + lineageSignature),
      patternSignature: computeHash(nextPattern),
      lineageSurface: computeHash(String(nextLineage.length)),
      advantageSignature: computeHash(JSON.stringify(advantageField)),
      healthSignature: computeHash(String(healthScore)),
      tierSignature: computeHash(tier),

      loopTheory: {
        routingCompletion: true,
        allowLoopfieldPropulsion: true,
        pulseComputeContinuity: true,
        errorRouteAround: true,

        continuanceCapable: true,
        preferContinuanceOnOrganFailure: true
      }
    }
  };
}
