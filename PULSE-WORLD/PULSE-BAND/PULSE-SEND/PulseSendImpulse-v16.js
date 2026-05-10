// ============================================================================
//  PulseSendImpulse-v16-Immortal-ORGANISM.js
//  Nerve‑Spark • Pulse‑Agnostic Trigger Organ • Fires the Movement
//  v16-Immortal-ORGANISM:
//    - Binary + CacheChunk + Prewarm + Presence + Degradation + Advantage
//    - DualBand + Immortal Meta Surfaces
//    - DualHash on all surfaces
//    - ImpulseIntelligence IMMORTAL-INTEL
// ============================================================================
//
//  ROLE:
//    • Pulse‑agnostic spark organ (v1/v2/v3).
//    • Fires the movement via the mover organ.
//    • Emits diagnostics + signatures for the impulse arc.
//    • Binary‑aware + cacheChunk‑aware + prewarm‑aware + multi‑presence‑aware.
//    • Degradation‑aware + advantage‑aware + dual‑band‑aware + immortal‑meta‑aware.
//
//  SAFETY CONTRACT (v16-Immortal-ORGANISM):
//  ----------------------------------------
//  • No imports.
//  • No network.
//  • No compute beyond local helpers.
//  • Zero randomness.
//  • Zero timestamps.
//  • Zero mutation outside instance.
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
    h = (h + s.charCodeAt(i) * (i + 5)) % 131072;
  }
  return `h12_${h}`;
}

function computeHashAlt(str) {
  let h = 1;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h * 131 + s.charCodeAt(i) * (i + 17)) % 262139;
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

function extractBinarySurfaceFromPulse(pulse) {
  const payload = pulse?.payload || {};

  const binaryPattern  = payload.binaryPattern || null;
  const binaryMode     = payload.binaryMode || null;
  const binaryPayload  = payload.binaryPayload || null;
  const binaryHints    = payload.binaryHints || null;
  const binaryStrength = typeof payload.binaryStrength === "number"
    ? payload.binaryStrength
    : null;

  const hasBinary =
    !!binaryPattern ||
    !!binaryMode ||
    !!binaryPayload ||
    !!binaryHints ||
    binaryStrength !== null;

  const routerHint = payload.routerHint ?? (binaryHints && binaryHints.routerHint) ?? null;
  const meshHint   = payload.meshHint   ?? (binaryHints && binaryHints.meshHint)   ?? null;
  const organHint  = payload.organHint  ?? (binaryHints && binaryHints.organHint)  ?? null;

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

function classifyDegradationTier(healthScore) {
  const h = typeof healthScore === "number" ? healthScore : 1.0;
  if (h >= 0.95) return "microDegrade";
  if (h >= 0.85) return "softDegrade";
  if (h >= 0.50) return "midDegrade";
  if (h >= 0.15) return "hardDegrade";
  return "criticalDegrade";
}

function extractImmortalMetaFromPulse(pulse) {
  const meta = pulse?.immortalMeta || {};
  return {
    presenceBandState: meta.presenceBandState ?? null,
    harmonicDrift: meta.harmonicDrift ?? null,
    coherenceScore: meta.coherenceScore ?? null,
    dualBandMode: meta.dualBandMode ?? null,
    shifterBand: meta.shifterBand ?? null
  };
}


// ============================================================================
//  Surfaces — cacheChunk / prewarm / presence / degradation / immortal (v16)
// ============================================================================
function buildCacheChunkSurface({ pulse, targetOrgan, pathway, mode }) {
  const shape = {
    pattern: pulse.pattern || "",
    lineageDepth: Array.isArray(pulse.lineage) ? pulse.lineage.length : 0,
    targetOrgan,
    pathway,
    mode
  };
  const raw = stableStringify(shape);
  const cacheChunkKey = "impulse-cache::" + computeHash(raw);
  const dual = computeDualHash(cacheChunkKey);

  return {
    cacheChunkKey,
    cacheChunkSignature: dual.primary,
    cacheChunkSignatureDual: dual
  };
}

function buildPrewarmSurface({ pulse, targetOrgan }) {
  const priority = pulse.priority || "normal";
  let level = "none";

  if (priority === "critical" || priority === "high") level = "aggressive";
  else if (priority === "normal") level = "medium";
  else if (priority === "low") level = "light";

  const raw = stableStringify({ priority, targetOrgan });
  const prewarmKey = "impulse-prewarm::" + computeHash(raw);
  const dual = computeDualHash(prewarmKey);

  return {
    level,
    prewarmKey,
    prewarmSignature: dual.primary,
    prewarmSignatureDual: dual
  };
}

function buildPresenceSurface({ pulse, targetOrgan }) {
  const pattern = pulse.pattern || "";
  let scope = "local";

  if (pattern.includes("/global")) scope = "global";
  else if (pattern.includes("/page")) scope = "page";

  const raw = stableStringify({ pattern, targetOrgan, scope });
  const presenceKey = "impulse-presence::" + computeHash(raw);
  const dual = computeDualHash(presenceKey);

  return {
    scope,
    presenceKey,
    presenceSignature: dual.primary,
    presenceSignatureDual: dual
  };
}

function buildDegradationSurface({ pulse }) {
  const healthScore = typeof pulse?.healthScore === "number"
    ? pulse.healthScore
    : 1.0;

  const degradationTier = classifyDegradationTier(healthScore);
  const shape = { healthScore, degradationTier };
  const dual = computeDualHash(shape);

  return {
    healthScore,
    degradationTier,
    degradationHash: dual.primary,
    degradationHashDual: dual
  };
}

function buildImmortalSurface({ pulse }) {
  const immortalMeta = extractImmortalMetaFromPulse(pulse);
  const raw = stableStringify(immortalMeta);
  const dual = computeDualHash("impulse-immortal::" + raw);

  return {
    immortalMeta,
    immortalSignature: dual.primary,
    immortalSignatureDual: dual
  };
}


// ============================================================================
//–  ADVANTAGE + DUAL-BAND SURFACE
// ============================================================================
function buildAdvantageSurface({ pulse }) {
  const advantageField = pulse?.advantageField || {};
  const band = pulse?.band || "symbolic";

  const advantageScore = advantageField.advantageScore || 0;
  const advantageTier  = advantageField.advantageTier  || 0;

  const shape = {
    advantageScore,
    advantageTier,
    band
  };

  const dual = computeDualHash(shape);

  return {
    advantageScore,
    advantageTier,
    band,
    advantageSignature: dual.primary,
    advantageSignatureDual: dual
  };
}


// ============================================================================
//  IMPULSE DIAGNOSTICS (symbolic + binary + v16 surfaces)
// ============================================================================
function buildImpulseDiagnostics({ pulse, targetOrgan, pathway, mode }) {
  const pattern = pulse?.pattern || "NO_PATTERN";
  const lineageDepth = Array.isArray(pulse?.lineage) ? pulse.lineage.length : 0;
  const pulseType = pulse?.pulseType || pulse?.PulseRole?.identity || "UNKNOWN_PULSE_TYPE";

  const binarySurface = extractBinarySurfaceFromPulse(pulse);
  const immortalSurface = buildImmortalSurface({ pulse });
  const degradationSurface = buildDegradationSurface({ pulse });
  const advantageSurface = buildAdvantageSurface({ pulse });

  const patternDual   = computeDualHash(pattern);
  const lineageDual   = computeDualHash(String(lineageDepth));
  const pulseTypeDual = computeDualHash(pulseType);
  const organDual     = computeDualHash(String(targetOrgan || "NO_ORGAN"));
  const pathwayDual   = computeDualHash(pathway || {});
  const modeDual      = computeDualHash(mode || "normal");

  const binaryPatternDual = binarySurface.binaryPattern
    ? computeDualHash(binarySurface.binaryPattern)
    : null;
  const binaryModeDual = binarySurface.binaryMode
    ? computeDualHash(binarySurface.binaryMode)
    : null;

  return {
    pattern,
    lineageDepth,
    pulseType,
    targetOrgan: targetOrgan || "NO_ORGAN",
    pathway: pathway || "NO_PATHWAY",
    mode,

    binary: binarySurface,
    immortal: immortalSurface,
    degradation: degradationSurface,
    advantage: advantageSurface,

    patternHash: patternDual.primary,
    patternHashDual: patternDual,
    lineageHash: lineageDual.primary,
    lineageHashDual: lineageDual,
    pulseTypeHash: pulseTypeDual.primary,
    pulseTypeHashDual: pulseTypeDual,
    organHash: organDual.primary,
    organHashDual: organDual,
    pathwayHash: pathwayDual.primary,
    pathwayHashDual: pathwayDual,
    modeHash: modeDual.primary,
    modeHashDual: modeDual,

    binaryPatternHash: binaryPatternDual ? binaryPatternDual.primary : null,
    binaryPatternHashDual: binaryPatternDual,
    binaryModeHash: binaryModeDual ? binaryModeDual.primary : null,
    binaryModeHashDual: binaryModeDual
  };
}


// ============================================================================
//  IMPULSE INTELLIGENCE (IMMORTAL-INTEL)
// ============================================================================
function computeImpulseIntelligence({
  diagnostics,
  cacheChunkSurface,
  prewarmSurface,
  presenceSurface,
  degradationSurface,
  immortalSurface,
  advantageSurface
}) {
  const patternLen = (diagnostics.pattern || "").length;
  const lineageDepth = diagnostics.lineageDepth || 0;
  const hasBinary = diagnostics.binary?.hasBinary ? 1 : 0;

  const presenceScope = presenceSurface.scope || "local";
  const presenceWeight =
    presenceScope === "global" ? 1.0 :
    presenceScope === "page"   ? 0.7 :
    presenceScope === "local"  ? 0.4 :
    0.2;

  const prewarmLevel = prewarmSurface.level || "none";
  const prewarmWeight =
    prewarmLevel === "aggressive" ? 1.0 :
    prewarmLevel === "medium"     ? 0.7 :
    prewarmLevel === "light"      ? 0.4 :
    0.1;

  const cacheWeight = cacheChunkSurface.cacheChunkKey ? 0.6 : 0.2;

  const healthScore = degradationSurface.healthScore ?? 1.0;
  const healthWeight =
    healthScore >= 0.95 ? 1.0 :
    healthScore >= 0.85 ? 0.8 :
    healthScore >= 0.50 ? 0.5 :
    healthScore >= 0.15 ? 0.3 :
    0.1;

  const coherenceScore = immortalSurface.immortalMeta?.coherenceScore ?? 1.0;
  const coherenceWeight =
    coherenceScore >= 0.9 ? 1.0 :
    coherenceScore >= 0.7 ? 0.7 :
    coherenceScore >= 0.4 ? 0.4 :
    0.2;

  const advantageScore = advantageSurface.advantageScore || 0;
  const advantageTier  = advantageSurface.advantageTier  || 0;
  const bandIsBinary   = advantageSurface.band === "binary" ? 1 : 0;

  const structuralScore =
    patternLen * 0.0005 +
    lineageDepth * 0.001 +
    hasBinary * 0.1;

  const solvednessScore = Math.max(
    0,
    Math.min(
      structuralScore * 0.3 +
      presenceWeight * 0.15 +
      prewarmWeight * 0.15 +
      cacheWeight * 0.1 +
      healthWeight * 0.1 +
      coherenceWeight * 0.1 +
      advantageScore * 0.1,
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
      bandIsBinary * 0.1 +
      (advantageTier >= 2 ? 0.2 : advantageTier === 1 ? 0.1 : 0),
      1
    )
  );

  const intelShape = {
    solvednessScore,
    computeTier,
    readinessScore,
    presenceScope,
    prewarmLevel,
    hasBinary: !!hasBinary,
    patternLen,
    lineageDepth,
    healthScore,
    coherenceScore,
    advantageScore,
    advantageTier,
    band: advantageSurface.band
  };

  const dual = computeDualHash(intelShape);

  return {
    ...intelShape,
    impulseIntelligenceSignature: dual.primary,
    impulseIntelligenceSignatureDual: dual
  };
}


// ============================================================================
//  FACTORY — Create the Impulse Organ (v16-Immortal-ORGANISM)
// ============================================================================
export function createPulseSendImpulse({ mover, log }) {
  return {
    PulseRole,

    fire({ pulse, targetOrgan, pathway, mode = "normal" }) {

      const diagnostics = buildImpulseDiagnostics({
        pulse,
        targetOrgan,
        pathway,
        mode
      });

      const cacheChunkSurface = buildCacheChunkSurface({
        pulse,
        targetOrgan,
        pathway,
        mode
      });

      const prewarmSurface = buildPrewarmSurface({
        pulse,
        targetOrgan
      });

      const presenceSurface = buildPresenceSurface({
        pulse,
        targetOrgan
      });

      const degradationSurface = diagnostics.degradation;
      const immortalSurface = diagnostics.immortal;
      const advantageSurface = diagnostics.advantage;

      const impulseIntelligence = computeImpulseIntelligence({
        diagnostics,
        cacheChunkSurface,
        prewarmSurface,
        presenceSurface,
        degradationSurface,
        immortalSurface,
        advantageSurface
      });

      const impulseShape = {
        pulse,
        targetOrgan,
        pathway,
        mode
      };
      const impulseDual = computeDualHash(impulseShape);
      const impulseSignature = impulseDual.primary;

      log && log("[PulseSendImpulse-v16-Immortal-ORGANISM] Spark fired", {
        jobId: pulse.jobId,
        diagnostics,
        cacheChunkSurface,
        prewarmSurface,
        presenceSurface,
        degradationSurface,
        immortalSurface,
        advantageSurface,
        impulseIntelligence
      });

      const movement = mover.move({
        pulse,
        targetOrgan,
        pathway,
        mode
      });

      return {
        impulseSignature,
        impulseSignatureDual: impulseDual,
        diagnostics,
        cacheChunkSurface,
        prewarmSurface,
        presenceSurface,
        degradationSurface,
        immortalSurface,
        advantageSurface,
        impulseIntelligence,
        movement
      };
    }
  };
}


// ============================================================================
//  ORGAN EXPORT — ⭐ PulseSendImpulse (v16-Immortal-ORGANISM)
// ============================================================================
export const PulseSendImpulse = {
  PulseRole,

  fire({ pulse, targetOrgan, pathway, mode }) {
    const pulseType = pulse?.pulseType || pulse?.PulseRole?.identity || "UNKNOWN_PULSE_TYPE";
    const pattern = pulse?.pattern || "NO_PATTERN";
    const lineageDepth = Array.isArray(pulse?.lineage) ? pulse.lineage.length : 0;

    throw new Error(
      `[PulseSendImpulse-v16-Immortal-ORGANISM] fire() called before initialization.\n` +
      `• pulseType: ${pulseType}\n` +
      `• pattern: ${pattern}\n` +
      `• lineageDepth: ${lineageDepth}\n` +
      `• targetOrgan: ${targetOrgan || "NO_ORGAN"}\n` +
      `• pathway: ${pathway || "NO_PATHWAY"}\n` +
      `• mode: ${mode || "NO_MODE"}\n` +
      `Use createPulseSendImpulse(...) to wire dependencies.`
    );
  }
};
