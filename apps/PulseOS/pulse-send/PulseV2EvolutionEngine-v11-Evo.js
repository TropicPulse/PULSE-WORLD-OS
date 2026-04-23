// ============================================================================
//  PulseV2EvolutionEngine-v11-Evo.js
//  Pulse v2 • Evolution Engine • Experimental Trait Layer (Compute Inside Pulse)
//  v11: Diagnostics + Signatures + Evolution Surface + Advantage Surface
// ============================================================================
//
//  SAFETY CONTRACT (v11-Evo):
//  --------------------------
//  • No imports.
//  • No randomness.
//  • No timestamps.
//  • No external mutation.
//  • Deterministic compute loop only.
// ============================================================================


// ============================================================================
// ⭐ PulseRole — identifies this as the Pulse v2 evolution engine (v11)
// ============================================================================
export const PulseRole = {
  type: "Pulse",
  subsystem: "Pulse",
  layer: "Organ",
  version: "11.0",
  identity: "Pulse-v2-EvolutionEngine-v11-Evo",

  evo: {
    driftProof: true,
    patternAware: true,
    lineageAware: true,
    shapeAware: true,
    modeAware: true,
    routerAwareReady: true,
    meshAwareReady: true,

    evolutionEngineReady: true,
    unifiedAdvantageField: true,
    pulseV2Ready: true,
    futureEvolutionReady: true,

    diagnosticsReady: true,
    signatureReady: true,
    evolutionSurfaceReady: true
  },

  routingContract: "PulseRouter-v11",
  meshContract: "PulseMesh-v11",
  sendContract: "PulseSend-v11",
  gpuOrganContract: "PulseGPU-v11",
  earnCompatibility: "PulseEarn-v11"
};


// ============================================================================
//  INTERNAL HELPERS — deterministic, tiny, pure
// ============================================================================

function computeHash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h + str.charCodeAt(i) * (i + 3)) % 100000;
  }
  return `h${h}`;
}

function buildLineage(parentLineage, pattern) {
  const base = Array.isArray(parentLineage) ? parentLineage : [];
  return [...base, pattern];
}

function computeShapeSignature(pattern, lineage) {
  const raw = `${pattern}::${lineage.join("::")}`;
  return `shape-${computeHash(raw)}`;
}

function computeEvolutionStage(pattern, lineage) {
  const depth = lineage.length;

  if (depth === 1) return "seed";
  if (depth === 2) return "sprout";
  if (depth === 3) return "branch";
  if (depth === 4) return "canopy";
  return "wild";
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
//  INTERNAL: Deterministic evolution compute loop (v11 — enhanced v2 tier)
// ============================================================================
function runEvolutionComputeLoopV2({ pattern, lineage, payload, mode }) {
  const lineageDepth = Array.isArray(lineage) ? lineage.length : 0;
  const payloadSize = payload && typeof payload === "object"
    ? Object.keys(payload).length
    : 0;

  const patternLen = pattern.length;

  const advantageField = {
    patternStrength: patternLen,
    lineageDepth,
    payloadSize,
    modeBias:
      mode === "stress"   ? 4 :
      mode === "drain"    ? 3 :
      mode === "recovery" ? 2 :
      1,
    experimentalTier: "v2-evolution-engine-v11"
  };

  const maxPattern = 64;
  const maxLineage = 16;
  const maxPayload = 32;

  const patternScore = Math.min(patternLen / maxPattern, 1);
  const lineageScore = Math.min(lineageDepth / maxLineage, 1);
  const payloadScore = Math.min(payloadSize / maxPayload, 1);

  const healthScore = (
    patternScore * 0.5 +
    lineageScore * 0.3 +
    payloadScore * 0.2
  );

  return {
    advantageField,
    healthScore
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
//  FACTORY — Create a Pulse v2 Evolution Engine Organism (v11)
// ============================================================================
export function createPulseV2({
  jobId,
  pattern,
  payload = {},
  priority = "normal",
  returnTo = null,
  parentLineage = null,
  mode = "normal",
  pageId = "NO_PAGE"
}) {
  const lineage = buildLineage(parentLineage, pattern);
  const shapeSignature = computeShapeSignature(pattern, lineage);
  const evolutionStage = computeEvolutionStage(pattern, lineage);

  const patternAncestry = buildPatternAncestry(pattern);
  const lineageSignature = buildLineageSignature(lineage);
  const pageAncestrySignature = buildPageAncestrySignature({ pattern, lineage, pageId });

  const { advantageField, healthScore } = runEvolutionComputeLoopV2({
    pattern,
    lineage,
    payload,
    mode
  });

  const tier =
    healthScore >= 0.95 ? "microDegrade" :
    healthScore >= 0.85 ? "softDegrade" :
    healthScore >= 0.50 ? "midDegrade" :
    healthScore >= 0.15 ? "hardDegrade" :
    "criticalDegrade";

  const diagnostics = buildDiagnostics(pattern, lineage, healthScore, tier);

  return {
    PulseRole,
    jobId,
    pattern,
    payload,
    priority,
    returnTo,
    lineage,
    mode,
    pageId,

    pulseType: "Pulse-v2-EvolutionEngine-v11",

    advantageField,
    healthScore,
    tier,

    meta: {
      shapeSignature,
      evolutionStage,

      patternAncestry,
      lineageSignature,
      pageAncestrySignature,

      diagnostics,

      evolutionSignature: computeHash(pattern + "::" + lineageSignature),
      patternSignature: computeHash(pattern),
      lineageSurface: computeHash(String(lineage.length)),
      advantageSignature: computeHash(JSON.stringify(advantageField)),
      healthSignature: computeHash(String(healthScore)),
      tierSignature: computeHash(tier)
    }
  };
}
