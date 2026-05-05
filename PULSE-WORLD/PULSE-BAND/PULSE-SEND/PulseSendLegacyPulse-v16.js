// ============================================================================
//  PulseSendLegacyPulse-v16-Immortal-ORGANISM.js
//  Pulse v1 Organism • Stable Evolutionary Floor • Non-Evolving
//  v16-Immortal-ORGANISM:
//    - Binary-aware surfaces
//    - CacheChunk + Prewarm + Presence + Degradation + ImmortalMeta
//    - DualHash surfaces (primary + secondary, fallback-safe)
//    - Still: stable, non-evolving, metadata-only
// ============================================================================
//
//  ROLE:
//    • v1 is the *stable floor* of the organism stack.
//    • It never evolves, never mutates, never computes evolution tiers.
//    • It surfaces 12.3+ / 14.4+ / 16 metadata (cacheChunk, prewarm, presence,
//      degradation, immortalMeta, ancestry).
//    • It does NOT use these surfaces to evolve or change behavior.
//    • Deterministic, stable, non-evolving, non-computing.
//
//  SAFETY CONTRACT (v16-Immortal-ORGANISM-EvoStable):
//  --------------------------------------------------
//  • No randomness.
//  • No timestamps.
//  • No external mutation.
//  • Deterministic, stable, non-evolving organism.
// ============================================================================

/*
AI_EXPERIENCE_META = {
  identity: "PulseSendLegacyPulse",
  version: "v16-Immortal-ORGANISM",
  layer: "frontend",
  role: "legacy_pulse_floor",
  lineage: "PulseOS-v12 → v14.4-Immortal → v16-Immortal-ORGANISM",

  evo: {
    immutable: true,
    noEvolution: true,
    deterministic: true,
    safeRouteFree: true,
    dualHashSurfaces: true
  },

  contract: {
    always: [
      "PulseSendSystem"
    ],
    never: [
      "legacyLegacyPulse",
      "legacyEvolutionEngine",
      "safeRoute",
      "fetchViaCNS"
    ]
  }
}
*/

// ============================================================================
// ⭐ PulseRole — Pulse v1 Stable Organism (v16 IMMORTAL ORGANISM)
// ============================================================================
export const PulseRole = {
  type: "Pulse",
  subsystem: "Pulse",
  layer: "Organ",
  version: "16-Immortal-ORGANISM",
  identity: "Pulse-v1-EvoStable-v16-Immortal-ORGANISM",

  evo: {
    // v1 is stable, non-evolving, deterministic
    driftProof: true,
    patternAware: true,
    lineageAware: true,
    shapeAware: true,
    modeAware: true,

    // v1 participates in routing/mesh/send but does NOT evolve
    routerAwareReady: true,
    meshAwareReady: true,
    sendAwareReady: true,

    // v1 does NOT run evolution compute loops
    evolutionEngineReady: false,
    pulseV1Ready: true,
    pulseV2Ready: false,
    pulseV3Ready: false,

    // v1 surfaces only metadata (cache, prewarm, presence, immortal)
    diagnosticsReady: true,
    signatureReady: true,
    evolutionSurfaceReady: false,

    // IMMORTAL META
    immortalMetaAware: true,
    dualBandAware: true,
    harmonicAware: true,
    coherenceAware: true,

    // v1 degradation surfaces (metadata only)
    degradationAware: true,

    // v1 does NOT support intelligence compute
    pulseIntelligenceReady: false,
    solvednessAware: false,
    factoringAware: false,
    computeTierAware: false,

    // v16: dual-hash surfaces
    dualHashSurfaces: true
  },

  // Contracts for compatibility with the rest of the organism
  routingContract: "PulseRouter-v11",
  meshContract: "PulseMesh-v11",
  sendContract: "PulseSend-v11",
  gpuOrganContract: "PulseGPU-v11",
  earnCompatibility: "PulseEarn-v11"
};


// ============================================================================
//  INTERNAL HELPERS — deterministic, pure
// ============================================================================
function computeHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 3)) % 131072;
  }
  return `h12_${h}`;
}

function computeHashAlt(str) {
  let h = 1;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h * 131 + s.charCodeAt(i) * (i + 11)) % 262139;
  }
  return `h13_${h}`;
}

function stableStringify(v) {
  if (v === null || typeof v !== "object") return JSON.stringify(v);
  if (Array.isArray(v)) return "[" + v.map(stableStringify).join(",") + "]";
  const keys = Object.keys(v).sort();
  return "{" + keys.map(k => JSON.stringify(k) + ":" + stableStringify(v[k])).join(",") + "}";
}

function computeDualHash(value) {
  const s = typeof value === "string" ? value : stableStringify(value);
  return {
    primary: computeHash(s),
    secondary: computeHashAlt(s)
  };
}

function buildLineage(parentLineage, pattern) {
  const base = Array.isArray(parentLineage) ? parentLineage : [];
  return [...base, pattern];
}

function computeShapeSignature(pattern, lineage) {
  const raw = pattern + "::" + (Array.isArray(lineage) ? lineage.join("::") : "");
  const dual = computeDualHash(raw);
  return {
    shapeSignature: `shape-${dual.primary}`,
    shapeSignatureDual: dual
  };
}

function computeEvolutionStage(pattern, lineage) {
  const depth = Array.isArray(lineage) ? lineage.length : 0;
  if (depth === 1) return "seed";
  if (depth === 2) return "sprout";
  if (depth === 3) return "branch";
  return "mature";
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
  const dual = computeDualHash(shape);
  return {
    pageAncestrySignature: dual.primary,
    pageAncestrySignatureDual: dual
  };
}

function extractBinarySurface(payload) {
  const p = payload || {};

  const binaryPattern  = p.binaryPattern || null;
  const binaryMode     = p.binaryMode || null;
  const binaryPayload  = p.binaryPayload || null;
  const binaryHints    = p.binaryHints || null;
  const binaryStrength = typeof p.binaryStrength === "number" ? p.binaryStrength : null;

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

function classifyDegradationTier(healthScore) {
  const h = typeof healthScore === "number" ? healthScore : 1.0;
  if (h >= 0.95) return "microDegrade";
  if (h >= 0.85) return "softDegrade";
  if (h >= 0.50) return "midDegrade";
  if (h >= 0.15) return "hardDegrade";
  return "criticalDegrade";
}

function extractImmortalMeta(payload) {
  const meta = payload?.immortalMeta || {};
  return {
    presenceBandState: meta.presenceBandState ?? null,
    harmonicDrift: meta.harmonicDrift ?? null,
    coherenceScore: meta.coherenceScore ?? null,
    dualBandMode: meta.dualBandMode ?? null,
    shifterBand: meta.shifterBand ?? null
  };
}


// ============================================================================
//  16 surfaces — surfaced only, never used for evolution
// ============================================================================

function buildCacheChunkSurface({ pattern, lineage, pageId }) {
  const shape = { pattern, lineage, pageId };
  const raw = stableStringify(shape);
  const cacheChunkKey = "pulse-v1-cache::" + computeHash(raw);
  const dual = computeDualHash(cacheChunkKey);

  return {
    cacheChunkKey,
    cacheChunkSignature: dual.primary,
    cacheChunkSignatureDual: dual
  };
}

function buildPrewarmSurface({ priority }) {
  let level = "none";
  if (priority === "critical" || priority === "high") level = "aggressive";
  else if (priority === "normal") level = "medium";
  else if (priority === "low") level = "light";

  const raw = stableStringify({ priority });
  const prewarmKey = "pulse-v1-prewarm::" + computeHash(raw);
  const dual = computeDualHash(prewarmKey);

  return {
    level,
    prewarmKey,
    prewarmSignature: dual.primary,
    prewarmSignatureDual: dual
  };
}

function buildPresenceSurface({ pattern }) {
  let scope = "local";
  if (pattern.includes("/global")) scope = "global";
  else if (pattern.includes("/page")) scope = "page";

  const raw = stableStringify({ pattern, scope });
  const presenceKey = "pulse-v1-presence::" + computeHash(raw);
  const dual = computeDualHash(presenceKey);

  return {
    scope,
    presenceKey,
    presenceSignature: dual.primary,
    presenceSignatureDual: dual
  };
}

function buildDegradationSurface({ healthScore }) {
  const score = typeof healthScore === "number" ? healthScore : 1.0;
  const degradationTier = classifyDegradationTier(score);
  const shape = { healthScore: score, degradationTier };
  const dual = computeDualHash(shape);

  return {
    healthScore: score,
    degradationTier,
    degradationHash: dual.primary,
    degradationHashDual: dual
  };
}

function buildImmortalSurface({ immortalMeta }) {
  const raw = stableStringify(immortalMeta);
  const dual = computeDualHash("immortal-v1::" + raw);

  return {
    immortalMeta,
    immortalSignature: dual.primary,
    immortalSignatureDual: dual
  };
}


// ============================================================================
//  DIAGNOSTICS (stable, non-evolving, v16 surfaces)
// ============================================================================
function buildDiagnostics(pattern, lineage, payload, healthScore) {
  const binarySurface = extractBinarySurface(payload);
  const degradationSurface = buildDegradationSurface({ healthScore });
  const immortalMeta = extractImmortalMeta(payload);
  const immortalSurface = buildImmortalSurface({ immortalMeta });

  const patternLen = (pattern || "").length;
  const lineageDepth = Array.isArray(lineage) ? lineage.length : 0;

  const patternDual = computeDualHash(pattern || "NO_PATTERN");
  const lineageDual = computeDualHash(buildLineageSignature(lineage));

  return {
    patternLength: patternLen,
    lineageDepth,
    lineageDensity: lineageDepth === 0 ? 0 : patternLen / lineageDepth,
    stabilityTier: "v1-evo-stable-16-Immortal-ORGANISM",

    binary: binarySurface,
    degradation: degradationSurface,
    immortal: immortalSurface,

    patternHash: patternDual.primary,
    patternHashDual: patternDual,
    lineageHash: lineageDual.primary,
    lineageHashDual: lineageDual
  };
}


// ============================================================================
//  FACTORY — Create a Pulse v1 Organism (v16 Stable-Plus-Immortal ORGANISM)
//  NOTE: Signature kept compatible with v14.4 usage in createPulseSend(...)
// ============================================================================
export function createLegacyPulse({
  jobId,
  pattern,
  payload = {},
  priority = "normal",
  returnTo = null,
  parentLineage = null,
  mode = "normal",
  pageId = "NO_PAGE"
}) {
  const safePattern = pattern || "NO_PATTERN";
  const lineage = buildLineage(parentLineage, safePattern);

  const { shapeSignature, shapeSignatureDual } = computeShapeSignature(
    safePattern,
    lineage
  );
  const evolutionStage = computeEvolutionStage(safePattern, lineage);

  const patternAncestry       = buildPatternAncestry(safePattern);
  const lineageSignature      = buildLineageSignature(lineage);
  const pageAncestry          = buildPageAncestrySignature({
    pattern: safePattern,
    lineage,
    pageId
  });

  const advantageField = {
    patternStrength: safePattern.length,
    lineageDepth: lineage.length,
    modeBias: mode === "stress" ? 2 : 1,
    stabilityTier: "v1-evo-stable-16-Immortal-ORGANISM"
  };

  const healthScore = 1.0;
  const tier = "stable";

  const cacheChunkSurface = buildCacheChunkSurface({
    pattern: safePattern,
    lineage,
    pageId
  });

  const prewarmSurface = buildPrewarmSurface({
    priority
  });

  const presenceSurface = buildPresenceSurface({
    pattern: safePattern
  });

  const diagnostics = buildDiagnostics(safePattern, lineage, payload, healthScore);
  const immortalMeta = diagnostics.immortal.immortalMeta;

  return {
    PulseRole,
    jobId,
    pattern: safePattern,
    payload,
    priority,
    returnTo,
    lineage,
    mode,
    pageId,

    pulseType: "Pulse-v1-EvoStable-v16-Immortal-ORGANISM",

    advantageField,
    healthScore,
    tier,

    cacheChunkSurface,
    prewarmSurface,
    presenceSurface,

    immortalMeta,

    meta: {
      shapeSignature,
      shapeSignatureDual,
      evolutionStage,

      patternAncestry,
      lineageSignature,
      pageAncestrySignature: pageAncestry.pageAncestrySignature,
      pageAncestrySignatureDual: pageAncestry.pageAncestrySignatureDual,

      diagnostics,

      stableSignature: computeHash(safePattern + "::" + lineageSignature),
      stableSignatureDual: computeDualHash(safePattern + "::" + lineageSignature),

      patternSignature: diagnostics.patternHash,
      lineageSurface: computeHash(String(lineage.length)),
      advantageSignature: computeHash(stableStringify(advantageField)),
      healthSignature: computeHash("1.0"),
      tierSignature: computeHash("stable")
    }
  };
}


// ============================================================================
//  FROM IMPULSE — build a v1 Pulse from an Impulse traveler (v16 IMMORTAL)
//  (fallback path from higher-band impulse into stable v1 floor)
// ============================================================================
export function legacyPulseFromImpulse(impulse, overrides = {}) {
  if (!impulse) return null;

  const payload = impulse.payload || {};

  const pattern       = overrides.pattern       || payload.pattern       || impulse.intent || "UNKNOWN_PATTERN";
  const jobId         = overrides.jobId         || payload.jobId         || impulse.tickId;
  const priority      = overrides.priority      || payload.priority      || "normal";
  const returnTo      = overrides.returnTo      || payload.returnTo      || null;
  const parentLineage = overrides.parentLineage || payload.parentLineage || null;
  const mode          = overrides.mode          || payload.mode          || "normal";
  const pageId        = overrides.pageId        || payload.pageId        || "NO_PAGE";

  return createLegacyPulse({
    jobId,
    pattern,
    payload,
    priority,
    returnTo,
    parentLineage,
    mode,
    pageId
  });
}
