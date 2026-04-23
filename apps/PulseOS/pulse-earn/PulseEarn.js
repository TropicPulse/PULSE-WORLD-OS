// ============================================================================
//  PulseEarn.js — Earn Organism v10.4
//  Evolutionary Earn Organ • Pattern + Lineage + Shape • Compute‑Ready
//  10.4: Ancestry + Loop-Theory + Tier + Advantage Field + Continuance Hint
// ============================================================================
//
//  SAFETY CONTRACT (v10.4):
//  ------------------------
//  • No imports.
//  • No randomness.
//  • No timestamps.
//  • Pure deterministic string/shape operations.
//  • Zero mutation outside instance.
// ============================================================================


// ============================================================================
//  EarnRole — identifies this as the Earn v10.4 Organism
// ============================================================================
export const EarnRole = {
  type: "Earn",
  subsystem: "Earn",
  layer: "Organ",
  version: "10.4",
  identity: "Earn-v10.4",

  evo: {
    driftProof: true,
    patternAware: true,
    lineageAware: true,
    shapeAware: true,
    evolutionEngineReady: true,
    gpuAwareReady: true,
    minerAwareReady: true,
    offlineAwareReady: true,
    futureEvolutionReady: true,

    unifiedAdvantageField: true,
    earnV2Ready: true,

    ancestryAware: true,
    loopTheoryAware: true,
    tierAware: true,
    advantageFieldAware: true,

    // NEW — explicit continuance awareness (shape-level only)
    continuanceAware: true,
    legacyBridgeCapable: true
  },

  routingContract: "PulseRouter-v10.4",
  meshContract: "PulseMesh-v10.4",
  sendContract: "PulseSend-v10.4",
  gpuOrganContract: "PulseGPU-v10",
  minerContract: "PulseMiner-v10",
  pulseCompatibility: "Pulse-v2/v3"
};


// ============================================================================
//  INTERNAL HELPERS — deterministic, tiny, pure
// ============================================================================

function buildLineage(parentLineage, pattern) {
  const base = Array.isArray(parentLineage) ? parentLineage : [];
  return [...base, pattern];
}

function computeShapeSignature(pattern, lineage) {
  const lineageKey = lineage.join("::");
  const raw = `${pattern}::${lineageKey}`;

  let acc = 0;
  for (let i = 0; i < raw.length; i++) {
    acc = (acc + raw.charCodeAt(i) * (i + 1)) % 100000;
  }

  return `earn-shape-${acc}`;
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
  const safePattern = typeof pattern === "string" ? pattern : "";
  const safeLineage = Array.isArray(lineage) ? lineage : [];
  const safePageId = pageId || "NO_PAGE";

  const shape = {
    pattern: safePattern,
    patternAncestry: buildPatternAncestry(safePattern),
    lineageSignature: buildLineageSignature(safeLineage),
    pageId: safePageId
  };

  let raw = JSON.stringify(shape);
  let hash = 0;
  for (let i = 0; i < raw.length; i++) {
    const chr = raw.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return (hash >>> 0).toString(16);
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


// ============================================================================
//  FACTORY — Create an Earn v10.4 Organism
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
  const lineage        = buildLineage(parentLineage, pattern);
  const shapeSignature = computeShapeSignature(pattern, lineage);
  const evolutionStage = computeEvolutionStage(pattern, lineage);

  const patternAncestry       = buildPatternAncestry(pattern);
  const lineageSignature      = buildLineageSignature(lineage);
  const pageAncestrySignature = buildPageAncestrySignature({
    pattern,
    lineage,
    pageId
  });

  const healthScore    = computeHealthScore(pattern, lineage);
  const tier           = classifyDegradationTier(healthScore);
  const advantageField = buildAdvantageField(pattern, lineage);

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

      loopTheory: {
        routingCompletion: true,
        allowLoopfieldPropulsion: true,
        pulseComputeContinuity: true,
        errorRouteAround: true,

        // NEW — explicit continuance hint for runtime / routers
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

  const patternAncestry       = buildPatternAncestry(nextPattern);
  const lineageSignature      = buildLineageSignature(nextLineage);
  const pageId                = earn.pageId || "NO_PAGE";
  const pageAncestrySignature = buildPageAncestrySignature({
    pattern: nextPattern,
    lineage: nextLineage,
    pageId
  });

  const healthScore    = computeHealthScore(nextPattern, nextLineage);
  const tier           = classifyDegradationTier(healthScore);
  const advantageField = buildAdvantageField(nextPattern, nextLineage);

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
