// ============================================================================
//  FILE: PulseV2EvolutionEngine-v24-IMMORTAL-COMPUTE.js
//  Pulse v2 • Evolution Engine • Trait Layer (Compute Inside Pulse)
//  v24-IMMORTAL-COMPUTE:
//    • Binary-Aware + ImmortalMeta + Degradation v24 + DualBand
//    • COMPUTE_INTELLIGENCE v24 surface
//    • DualHash surfaces (primary v24 + legacy-style fallback)
//    • cacheChunk / prewarm / presence v24 surfaces
//    • Deterministic, stable, no randomness
// ============================================================================
//
//  ROLE:
//    • Symbolic evolution engine (v2 tier).
//    • Computes deterministic advantageField.
//    • Computes healthScore + v24 degradation tier.
//    • Surfaces binary metadata (non-breaking).
//    • Surfaces immortalMeta (presenceBandState, harmonicDrift, coherenceScore,
//      dualBandMode, shifterBand).
//    • Surfaces v24 COMPUTE_INTELLIGENCE for routing / Earn / GPU.
//    • DualHash-aware cacheChunk / prewarm / presence surfaces.
//
//  SAFETY CONTRACT (v24-IMMORTAL-COMPUTE):
//    • No randomness.
//    • No timestamps.
//    • No external mutation.
//    • Pure deterministic compute loop.
// ============================================================================

import {
  OrganismIdentity,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PULSE-WORLD-MAP.js
";

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

function computeHashLegacy(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 3)) % 100000;
  }
  return `h${h}`;
}

function computeHashV24(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 5)) % 262144; // 18‑bit
  }
  return `h24_${h}`;
}

function computeHash(str) {
  // Primary v24 hash (used where a single hash string is expected)
  return computeHashV24(str);
}

function stableStringify(v) {
  if (v === null || typeof v !== "object") return JSON.stringify(v);
  if (Array.isArray(v)) return "[" + v.map(stableStringify).join(",") + "]";
  const keys = Object.keys(v).sort();
  return (
    "{" +
    keys.map(k => JSON.stringify(k) + ":" + stableStringify(v[k])).join(",") +
    "}"
  );
}

function computeDualHashSignature(shape) {
  const raw = typeof shape === "string" ? shape : stableStringify(shape);
  const primary = computeHashV24(raw);
  const fallback = computeHashLegacy(raw);
  return {
    primary,
    fallback
  };
}

function buildLineage(parentLineage, pattern) {
  const base = Array.isArray(parentLineage) ? parentLineage : [];
  return [...base, pattern];
}

function computeShapeSignature(pattern, lineage) {
  return `shape-${computeHash(pattern + "::" + lineage.join("::"))}`;
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
  return computeHash(stableStringify(shape));
}


// ============================================================================
//  BINARY SURFACE — optional, non-breaking
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

  return {
    hasBinary,
    binaryPattern,
    binaryMode,
    binaryPayload,
    binaryHints,
    binaryStrength
  };
}


// ============================================================================
//  IMMORTAL META SURFACE (v24)
// ============================================================================
function extractImmortalMeta(payload) {
  const m = payload?.immortalMeta || {};
  return {
    presenceBandState: m.presenceBandState ?? null,
    harmonicDrift: m.harmonicDrift ?? null,
    coherenceScore: m.coherenceScore ?? null,
    dualBandMode: m.dualBandMode ?? null,
    shifterBand: m.shifterBand ?? null
  };
}


// ============================================================================
//  PULSE INTELLIGENCE SURFACE (v24-IMMORTAL-COMPUTE)
// ============================================================================
function computePulseIntelligence({ pattern, lineage, payload, healthScore, binarySurface }) {
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
      (1 - patternComplexity) * 0.15 +
      (1 - payloadComplexity) * 0.15 +
      binaryStrength * 0.10,
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
//  v24 Surfaces — cacheChunk / prewarm / presence (dualHash-aware)
// ============================================================================
function buildCacheChunkSurface({ pattern, lineage, pageId, mode }) {
  const shape = {
    pattern,
    lineageDepth: Array.isArray(lineage) ? lineage.length : 0,
    pageId: pageId || "NO_PAGE",
    mode: mode || "normal"
  };
  const cacheChunkKey = "pulse-v2-cache::" + computeHash(stableStringify(shape));
  const dualHash = computeDualHashSignature(shape);

  return {
    cacheChunkKey,
    cacheChunkSignature: computeHash(cacheChunkKey),
    cacheChunkDualHash: dualHash
  };
}

function buildPrewarmSurface({ priority, mode }) {
  let level = "none";
  if (priority === "critical" || priority === "high") level = "aggressive";
  else if (priority === "normal") level = "medium";
  else if (priority === "low") level = "light";

  const shape = { priority, mode: mode || "normal" };
  const prewarmKey = "pulse-v2-prewarm::" + computeHash(stableStringify(shape));
  const dualHash = computeDualHashSignature(shape);

  return {
    level,
    prewarmKey,
    prewarmDualHash: dualHash
  };
}

function buildPresenceSurface({ pattern, pageId }) {
  let scope = "local";
  if (pattern && pattern.includes("/global")) scope = "global";
  else if (pattern && pattern.includes("/page")) scope = "page";

  const shape = { pattern: pattern || "", pageId: pageId || "NO_PAGE", scope };
  const presenceKey = "pulse-v2-presence::" + computeHash(stableStringify(shape));
  const dualHash = computeDualHashSignature(shape);

  return {
    scope,
    presenceKey,
    presenceDualHash: dualHash
  };
}


// ============================================================================
//  INTERNAL: Deterministic evolution compute loop (v24)
// ============================================================================
function runEvolutionComputeLoopV2({ pattern, lineage, payload, mode }) {
  const lineageDepth = Array.isArray(lineage) ? lineage.length : 0;
  const payloadSize = payload && typeof payload === "object"
    ? Object.keys(payload).length
    : 0;

  const patternLen = pattern.length;

  const binarySurface = extractBinarySurfaceFromPayload(payload);
  const immortalMeta  = extractImmortalMeta(payload);

  const binaryStrength = typeof binarySurface.binaryStrength === "number"
    ? binarySurface.binaryStrength
    : 0;

  const maxPattern = 64;
  const maxLineage = 16;
  const maxPayload = 32;

  const patternScore = Math.min(patternLen / maxPattern, 1);
  const lineageScore = Math.min(lineageDepth / maxLineage, 1);
  const payloadScore = Math.min(payloadSize / maxPayload, 1);
  const binaryScore  = Math.min(Math.max(binaryStrength, 0), 1);

  const healthScore = (
    patternScore * 0.45 +
    lineageScore * 0.25 +
    payloadScore * 0.20 +
    binaryScore  * 0.10
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

    experimentalTier: "v2-evolution-engine-v24-Immortal-COMPUTE",

    // Binary-aware advantage surface
    binaryAware: binarySurface.hasBinary,
    binaryStrength,
    binaryMode: binarySurface.binaryMode,
    binaryPattern: binarySurface.binaryPattern,

    // IMMORTAL META surfaced
    presenceBandState: immortalMeta.presenceBandState,
    harmonicDrift: immortalMeta.harmonicDrift,
    coherenceScore: immortalMeta.coherenceScore,
    dualBandMode: immortalMeta.dualBandMode,
    shifterBand: immortalMeta.shifterBand,

    // Intelligence surfaced for routing / Earn / GPU organs
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
/** DIAGNOSTICS (v24) */
function buildDiagnostics(pattern, lineage, healthScore, tier, binarySurface, immortalMeta, pulseIntelligence) {
  const immortalSignatureShape = immortalMeta || {};
  const intelligenceShape = pulseIntelligence || {};

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

    binaryPatternHash: binarySurface.binaryPattern
      ? computeHash(binarySurface.binaryPattern)
      : null,

    binaryModeHash: binarySurface.binaryMode
      ? computeHash(binarySurface.binaryMode)
      : null,

    immortalSignature: computeHash(stableStringify(immortalSignatureShape)),

    intelligence: pulseIntelligence,
    intelligenceSignature: computeHash(stableStringify(intelligenceShape))
  };
}


// ============================================================================
//  FACTORY — Create a Pulse v2 Evolution Engine Organism (v24-IMMORTAL-COMPUTE)
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
  const lineage               = buildLineage(parentLineage, pattern);
  const shapeSignature        = computeShapeSignature(pattern, lineage);
  const evolutionStage        = computeEvolutionStage(pattern, lineage);
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
    mode
  });

  const tier =
    healthScore >= 0.97 ? "microDegrade" :
    healthScore >= 0.90 ? "softDegrade" :
    healthScore >= 0.60 ? "midDegrade" :
    healthScore >= 0.25 ? "hardDegrade" :
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

  const cacheChunkSurface = buildCacheChunkSurface({
    pattern,
    lineage,
    pageId,
    mode
  });

  const prewarmSurface = buildPrewarmSurface({
    priority,
    mode
  });

  const presenceSurface = buildPresenceSurface({
    pattern,
    pageId
  });

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

    pulseType: "Pulse-v2-EvolutionEngine-v24-Immortal-COMPUTE",

    advantageField,
    healthScore,
    tier,

    immortalMeta,

    // Intelligence surfaced at organism level
    pulseIntelligence,

    // v24 cache / prewarm / presence surfaces
    cacheChunkSurface,
    prewarmSurface,
    presenceSurface,

    // Binary surfaced at organism level for v24 stack
    binarySurface,

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
      advantageSignature: computeHash(stableStringify(advantageField)),
      healthSignature: computeHash(String(healthScore)),
      tierSignature: computeHash(tier),
      pulseIntelligenceSignature: computeHash(stableStringify(pulseIntelligence)),

      cacheChunkDualHash: cacheChunkSurface.cacheChunkDualHash,
      prewarmDualHash: prewarmSurface.prewarmDualHash,
      presenceDualHash: presenceSurface.presenceDualHash
    }
  };
}
