// ============================================================================
// FILE: PulseSignalFactoringGuide-v16-IMMORTAL-INTEL.js
// [pulse:guide] SIGNAL FACTORING GUIDE — v16‑IMMORTAL‑INTEL‑BASEFORMULA‑ATLAS
// ----------------------------------------------------------------------------
// ROLE:
//   • Read‑only “atlas” over Mesh + Earn signal factoring surfaces.
//   • Provides a deterministic, in‑memory BaseFormula registry keyed by
//     baseFormulaKey (INTEL hash) from Mesh/Earn factoring layers.
//   • Does NOT perform routing or compute; only describes matches + hints.
//   • Bridges your math vision (/2, base formulas, cheat‑sheet) into a
//     reusable organ that any layer can consult.
// ----------------------------------------------------------------------------
// SAFETY CONTRACT (IMMORTAL v16‑INTEL):
//   • No payload mutation beyond meta/flags.guide* fields.
//   • No routing influence (metadata only; routers MAY read but not obey).
//   • No randomness, no timestamps.
//   • No external I/O, no FS, no network.
//   • Zero async, zero side‑effects outside target.meta/flags.
//   • Deterministic‑field: identical input → identical output.
//   • Drift‑proof: stable across versions.
// ============================================================================

/*
AI_EXPERIENCE_META = {
  identity: "PulseSignalFactoringGuide",
  version: "v16-IMMORTAL-INTEL",
  layer: "guide",
  role: "signal_factoring_guide",
  lineage: "PulseSignalFactoringGuide-v1 → v16-IMMORTAL-INTEL",

  evo: {
    signalFactoringAware: true,
    meshFactoringAware: true,
    earnFactoringAware: true,
    baseShapeAware: true,
    baseFormulaKeyAware: true,
    patternMatchSurface: true,

    deterministic: true,
    deterministicField: true,
    driftProof: true,
    multiInstanceReady: true,
    selfRepairable: true,

    zeroNetwork: true,
    zeroFilesystem: true,
    zeroAsync: true,
    zeroRandomness: true,
    zeroMutationOfInput: true,
    zeroRoutingInfluence: true
  },

  contract: {
    always: [
      "PulseMeshSignalFactoring",
      "PulseEarnSignalFactoring",
      "PulseMesh",
      "PulseEarnHeart",
      "PulseEarnMetabolism",
      "PulseMeshEcho"
    ],
    never: [
      "userScript",
      "dynamicEval",
      "legacyFactoringGuide"
    ]
  }
}
*/

// ============================================================================
// HASH HELPERS (INTEL‑aligned, but only used for internal tagging)
// ============================================================================

function computeHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `h${h}`;
}

function computeHashIntelligence(payload) {
  const base = JSON.stringify(payload || "");
  let h = 0;
  for (let i = 0; i < base.length; i++) {
    const c = base.charCodeAt(i);
    h = (h * 131 + c * (i + 7)) % 1000000007;
  }
  return `HINTEL_${h}`;
}

// ============================================================================
// BASE FORMULA REGISTRY (in‑memory, deterministic, process‑local)
// ============================================================================
//
// This is your “cheat‑sheet” shelf. It is intentionally simple and
// deterministic: no timestamps, no random IDs, no IO. You can seed it at
// boot with known formulas, or let higher‑level code call registerBaseFormula.
// ============================================================================

const _baseFormulaRegistry = Object.create(null);

/**
 * Register a base formula under a baseFormulaKey.
 *
 * baseFormulaKey: INTEL hash from Mesh/Earn factoring (string).
 * descriptor: {
 *   name: string,
 *   version: string,
 *   layerHint: "mesh" | "earn" | "any",
 *   description: string,
 *   tags: string[],
 *   mathShape: string,        // e.g. "O(n log n)", "ax^2+bx+c", "FFT-like"
 *   factorPattern: string,    // e.g. "/2 recursion", "divide-and-conquer"
 *   notes: string
 * }
 */
export function registerBaseFormula(baseFormulaKey, descriptor) {
  if (!baseFormulaKey || typeof baseFormulaKey !== "string") return;
  if (!descriptor || typeof descriptor !== "object") return;

  const safeDescriptor = {
    name: String(descriptor.name || "unnamed_formula"),
    version: String(descriptor.version || "v1"),
    layerHint: descriptor.layerHint === "mesh" || descriptor.layerHint === "earn"
      ? descriptor.layerHint
      : "any",
    description: String(descriptor.description || ""),
    tags: Array.isArray(descriptor.tags)
      ? descriptor.tags.map(t => String(t))
      : [],
    mathShape: String(descriptor.mathShape || ""),
    factorPattern: String(descriptor.factorPattern || ""),
    notes: String(descriptor.notes || "")
  };

  _baseFormulaRegistry[baseFormulaKey] = safeDescriptor;
}

/**
 * Lookup a base formula by key.
 */
export function lookupBaseFormula(baseFormulaKey) {
  if (!baseFormulaKey || typeof baseFormulaKey !== "string") return null;
  const entry = _baseFormulaRegistry[baseFormulaKey];
  return entry ? { key: baseFormulaKey, ...entry } : null;
}

/**
 * List all registered base formulas (for diagnostics / introspection).
 */
export function listBaseFormulas() {
  return Object.keys(_baseFormulaRegistry).map(key => ({
    key,
    ..._baseFormulaRegistry[key]
  }));
}

// ============================================================================
// FACTORING SNAPSHOT EXTRACTORS
// ============================================================================
//
// These helpers read Mesh/Earn factoring meta and normalize them into a
// common "snapshot" shape so the guide can reason symmetrically.
// ============================================================================

function extractMeshFactoringSnapshot(impulse) {
  const meta = impulse?.meta?.signalFactoring || impulse?.meta?.earnSignalFactoring || {};
  const profile = meta.profile || {};
  const bandBinaryWave = meta.bandBinaryWave || {};
  const advantageField = meta.advantageField || {};
  const baseShapeSurface = meta.baseShapeSurface || {};
  const baseFormulaKey = meta.baseFormulaKey || baseShapeSurface.baseFormulaKey || null;

  return {
    layer: "mesh",
    pressure: profile.pressure ?? 0,
    signal: profile.signal ?? 0,
    depth: profile.depth ?? 0,
    stride: profile.stride ?? 1,
    presenceTier: profile.presenceTier || "idle",
    presenceBand: profile.presenceBand || profile.band || "symbolic",
    auraBias: profile.auraBias ?? 0,
    meshBias: profile.meshBias ?? 0,
    flowBias: profile.flowBias ?? 0,
    jobCount: profile.jobCount ?? 0,
    cachePriority: profile.cachePriority || "normal",
    prewarmNeeded: !!profile.prewarmNeeded,
    bandBinaryWave,
    advantageField,
    baseShapeSurface,
    baseFormulaKey
  };
}

function extractEarnFactoringSnapshot(page) {
  const meta = page?.meta?.earnSignalFactoring || {};
  const profile = meta.profile || {};
  const bandBinaryWave = meta.bandBinaryWave || {};
  const advantageField = meta.advantageField || {};
  const baseFormulaKey = meta.baseFormulaKey || null; // Earn may add this later

  return {
    layer: "earn",
    pressure: profile.pressure ?? 0,
    signal: profile.signal ?? 0,
    depth: profile.depth ?? 0,
    stride: profile.stride ?? 1,
    presenceTier: profile.presenceTier || "idle",
    presenceBand: profile.presenceBand || profile.band || "symbolic",
    jobCount: profile.jobCount ?? 0,
    cachePriority: profile.cachePriority || "normal",
    prewarmNeeded: !!profile.prewarmNeeded,
    bandBinaryWave,
    advantageField,
    baseShapeSurface: meta.baseShapeSurface || {},
    baseFormulaKey
  };
}

// ============================================================================
// GUIDE DECISION SURFACE
// ============================================================================
//
// Given a factoring snapshot + optional baseFormula match, we build a
// "guide surface" that describes how strongly this impulse/page should
// try to snap to a known base formula, and what style of factoring it
// is likely to benefit from.
// ============================================================================

function buildGuideSurface(snapshot, baseFormula) {
  const hasFormula = !!baseFormula;
  const pressure = snapshot.pressure || 0;
  const depth = snapshot.depth || 0;
  const stride = snapshot.stride || 1;
  const signal = snapshot.signal || 0;

  let snapIntent = "none";
  if (hasFormula && signal === 1 && pressure >= 0.2) {
    snapIntent = "strong";
  } else if (hasFormula && pressure >= 0.1) {
    snapIntent = "weak";
  }

  let factoringStyle = "none";
  if (signal === 1 && depth >= 1) {
    if (stride <= 0.5) factoringStyle = "divide_and_conquer";
    else factoringStyle = "shallow_factoring";
  }

  const guidePayload = {
    layer: snapshot.layer,
    presenceTier: snapshot.presenceTier,
    presenceBand: snapshot.presenceBand,
    pressure,
    depth,
    stride,
    signal,
    snapIntent,
    factoringStyle,
    hasFormula,
    baseFormulaKey: snapshot.baseFormulaKey || null,
    baseFormulaName: baseFormula?.name || null,
    baseFormulaVersion: baseFormula?.version || null,
    baseFormulaMathShape: baseFormula?.mathShape || null,
    baseFormulaPattern: baseFormula?.factorPattern || null
  };

  const classicString =
    `GUIDE::${guidePayload.layer}` +
    `::SIG:${signal}` +
    `::DEPTH:${depth}` +
    `::STRIDE:${stride}` +
    `::SNAP:${snapIntent}` +
    `::STYLE:${factoringStyle}` +
    `::FORMULA:${guidePayload.baseFormulaKey || "NONE"}`;

  const sig = {
    intel: computeHashIntelligence(guidePayload),
    classic: computeHash(classicString)
  };

  return {
    guidePayload,
    signatures: sig
  };
}

// ============================================================================
// META ATTACH HELPERS
// ============================================================================

function attachGuideMeta(target, guideSurface) {
  if (!target) return target;
  target.meta = target.meta || {};
  target.flags = target.flags || {};

  const existing = target.meta.signalFactoringGuide || {};
  const merged = {
    ...existing,
    version: "v16-IMMORTAL-INTEL",
    layer: "PulseSignalFactoringGuide",
    guidePayload: guideSurface.guidePayload,
    signatures: guideSurface.signatures
  };

  target.meta.signalFactoringGuide = merged;
  target.flags.signalFactoringGuide = true;

  return target;
}

// ============================================================================
// PUBLIC API — APPLY GUIDE TO MESH / EARN
// ============================================================================

/**
 * Apply guide to a mesh impulse (after PulseMeshSignalFactoring).
 */
export function applySignalFactoringGuideToMesh(impulse) {
  if (!impulse) return impulse;

  const snapshot = extractMeshFactoringSnapshot(impulse);
  const baseFormula = snapshot.baseFormulaKey
    ? lookupBaseFormula(snapshot.baseFormulaKey)
    : null;

  const guideSurface = buildGuideSurface(snapshot, baseFormula);
  return attachGuideMeta(impulse, guideSurface);
}

/**
 * Apply guide to an earn page (after PulseEarnSignalFactoring).
 */
export function applySignalFactoringGuideToEarn(page) {
  if (!page) return page;

  const snapshot = extractEarnFactoringSnapshot(page);
  const baseFormula = snapshot.baseFormulaKey
    ? lookupBaseFormula(snapshot.baseFormulaKey)
    : null;

  const guideSurface = buildGuideSurface(snapshot, baseFormula);
  return attachGuideMeta(page, guideSurface);
}

// ============================================================================
// OPTIONAL: SEED SOME CANONICAL BASE FORMULAS
// ============================================================================
//
// These are just examples. You can replace/extend them at boot.
// They show how your /2, divide‑and‑conquer, and “mining” patterns
// can be encoded as reusable base formulas.
// ============================================================================

function seedDefaultBaseFormulas() {
  const examples = [
    {
      key: "HINTEL_DIVIDE_AND_CONQUER_GENERIC",
      descriptor: {
        name: "Generic Divide-and-Conquer",
        version: "v1",
        layerHint: "any",
        description: "Generic /2 recursion pattern; suitable for balanced splitting of work or data.",
        tags: ["divide_and_conquer", "recursion", "binary_split"],
        mathShape: "T(n) = 2T(n/2) + f(n)",
        factorPattern: "/2 recursion",
        notes: "Use when depth>1, stride≈1/(depth+1), and pressure is moderate to high."
      }
    },
    {
      key: "HINTEL_MESH_MINING_PATTERN",
      descriptor: {
        name: "Mesh Mining Pattern",
        version: "v1",
        layerHint: "mesh",
        description: "Mesh‑level mining pattern for 64‑way impulse distribution.",
        tags: ["mining", "mesh", "parallel"],
        mathShape: "O(64 * f(chunk))",
        factorPattern: "fixed‑fanout",
        notes: "Aligns with 64‑instance miner; treat each channel as a shard."
      }
    },
    {
      key: "HINTEL_EARN_JOB_BATCHING",
      descriptor: {
        name: "Earn Job Batching",
        version: "v1",
        layerHint: "earn",
        description: "Batch jobs into base formula groups for reuse and caching.",
        tags: ["earn", "batching", "reuse"],
        mathShape: "O(batches * f(batchSize))",
        factorPattern: "group‑by‑formula",
        notes: "Use when many jobs share the same baseFormulaKey."
      }
    }
  ];

  for (const ex of examples) {
    registerBaseFormula(ex.key, ex.descriptor);
  }
}

// Seed immediately in this process (deterministic, static content).
seedDefaultBaseFormulas();
