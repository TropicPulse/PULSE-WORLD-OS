// ============================================================================
//  PulseSendEngine-v24-IMMORTAL-INTEL+++.js
//  Transport Engine Organ • Pulse‑Agnostic • Deterministic Movement Muscle
//  v24-IMMORTAL-INTEL+++:
//    - Binary-aware + CacheChunk v24 + Prewarm v24 + Presence v24
//    - Degradation v24 + ImmortalMeta v24
//    - DualHash (primary/secondary) on all major surfaces
//    - MovementIntelligence v24 IMMORTAL-INTEL+++
//    - Pure, deterministic, zero IO, zero randomness, zero time
// ============================================================================
//
//  SAFETY CONTRACT (v24-IMMORTAL-INTEL+++):
//  ----------------------------------------
//  • No randomness.
//  • No timestamps.
//  • No external IO.
//  • Pure deterministic movement.
//  • Zero mutation outside instance.
// ============================================================================

import {
  OrganismIdentity,
  buildPulseOrganismMap as buildOrganismMap
} from "../X-PULSE-X/PULSE-WORLD-MAPORGANISM.jssss
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
//  INTERNAL HELPERS — deterministic, pure
// ============================================================================

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

function computeHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 5)) % 262144; // 18-bit, v24
  }
  return `h24_${h}`;
}

function computeHashAlt(str) {
  let h = 1;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h * 131 + s.charCodeAt(i) * (i + 17)) % 524287; // 19-bit, v24
  }
  return `h24b_${h}`;
}

function computeDualHash(value) {
  const s = typeof value === "string" ? value : stableStringify(value);
  return {
    primary: computeHash(s),
    secondary: computeHashAlt(s)
  };
}

function extractBinarySurface(pulse) {
  const p = pulse?.payload || {};
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

function classifyDegradationTier(healthScore) {
  const h = typeof healthScore === "number" ? healthScore : 1.0;
  if (h >= 0.97) return "microDegrade";
  if (h >= 0.88) return "softDegrade";
  if (h >= 0.55) return "midDegrade";
  if (h >= 0.18) return "hardDegrade";
  return "criticalDegrade";
}

function extractImmortalMeta(pulse) {
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
//  v24 BINARY SURFACES (cacheChunk / prewarm / presence / signature)
// ============================================================================

function computeBinarySignature(bits) {
  let h = 0;
  for (let i = 0; i < bits.length; i++) {
    h = (h + bits[i] * (i + 13)) % 131072; // 17-bit deterministic
  }
  return `b24_${h}`;
}

function computeBinaryCacheChunk(bits) {
  let acc = 1;
  for (let i = 0; i < bits.length; i++) {
    acc = (acc * 31 + bits[i]) % 8191;
  }
  return `cc24_${acc}`;
}

function computeBinaryPrewarm(bits) {
  const len = bits.length;
  if (len >= 2048) return "prewarm-ultra";
  if (len >= 512)  return "prewarm-aggressive";
  if (len >= 128)  return "prewarm-medium";
  if (len >= 32)   return "prewarm-light";
  return "prewarm-none";
}

function computeBinaryPresence(bits) {
  const len = bits.length;
  if (len >= 4096) return "presence-global-max";
  if (len >= 1024) return "presence-global";
  if (len >= 256)  return "presence-page";
  return "presence-local";
}


// ============================================================================
//  cacheChunk / prewarm / presence surfaces (v24 dual-hash, pulse-level)
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
  const cacheChunkKey = "engine-cache::" + computeHash(raw);
  const cacheChunkDual = computeDualHash(cacheChunkKey);

  return {
    cacheChunkKey,
    cacheChunkSignature: cacheChunkDual.primary,
    cacheChunkSignatureDual: cacheChunkDual,
    cacheChunkShape: shape
  };
}

function buildPrewarmSurface({ pulse, targetOrgan }) {
  const priority = pulse.priority || "normal";
  let level = "none";

  if (priority === "critical" || priority === "high") level = "aggressive";
  else if (priority === "normal") level = "medium";
  else if (priority === "low") level = "light";

  const raw = stableStringify({ priority, targetOrgan });
  const prewarmKey = "engine-prewarm::" + computeHash(raw);
  const prewarmDual = computeDualHash(prewarmKey);

  return {
    level,
    prewarmKey,
    prewarmSignature: prewarmDual.primary,
    prewarmSignatureDual: prewarmDual
  };
}

function buildPresenceSurface({ pulse, targetOrgan }) {
  const pattern = pulse.pattern || "";
  let scope = "local";

  if (pattern.includes("/global")) scope = "global";
  else if (pattern.includes("/page")) scope = "page";

  const raw = stableStringify({ pattern, targetOrgan, scope });
  const presenceKey = "engine-presence::" + computeHash(raw);
  const presenceDual = computeDualHash(presenceKey);

  return {
    scope,
    presenceKey,
    presenceSignature: presenceDual.primary,
    presenceSignatureDual: presenceDual
  };
}


// ============================================================================
//  degradation + immortalMeta surfaces (v24 dual-hash)
// ============================================================================

function buildDegradationSurface({ pulse }) {
  const healthScore = typeof pulse?.healthScore === "number"
    ? pulse.healthScore
    : 1.0;

  const degradationTier = classifyDegradationTier(healthScore);
  const shape = { healthScore, degradationTier };
  const hashDual = computeDualHash(shape);

  return {
    healthScore,
    degradationTier,
    degradationHash: hashDual.primary,
    degradationHashDual: hashDual
  };
}

function buildImmortalSurface({ pulse }) {
  const immortalMeta = extractImmortalMeta(pulse);
  const raw = stableStringify(immortalMeta);
  const immortalDual = computeDualHash("engine-immortal::" + raw);

  return {
    immortalMeta,
    immortalSignature: immortalDual.primary,
    immortalSignatureDual: immortalDual
  };
}


// ============================================================================
//  MOVEMENT DIAGNOSTICS (symbolic + binary + v24 surfaces)
// ============================================================================

function buildMovementDiagnostics({ pulse, targetOrgan, pathway, mode }) {
  const pattern = pulse.pattern || "NO_PATTERN";
  const lineageDepth = Array.isArray(pulse.lineage) ? pulse.lineage.length : 0;
  const pulseType = pulse.pulseType || pulse?.PulseRole?.identity || "UNKNOWN_PULSE_TYPE";

  const binary = extractBinarySurface(pulse);
  const degradation = buildDegradationSurface({ pulse });
  const immortal = buildImmortalSurface({ pulse });

  const patternDual = computeDualHash(pattern);
  const lineageDual = computeDualHash(String(lineageDepth));
  const pulseTypeDual = computeDualHash(pulseType);
  const organDual = computeDualHash(String(targetOrgan || "NO_ORGAN"));
  const pathwayDual = computeDualHash(pathway || {});
  const modeDual = computeDualHash(mode || "normal");

  const binaryPatternDual = binary.binaryPattern ? computeDualHash(binary.binaryPattern) : null;
  const binaryModeDual = binary.binaryMode ? computeDualHash(binary.binaryMode) : null;

  return {
    pattern,
    lineageDepth,
    pulseType,
    targetOrgan,
    pathway,
    mode,

    binary,
    degradation,
    immortal,

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
//  MOVEMENT INTELLIGENCE (v24 IMMORTAL-INTEL+++)
// ============================================================================

function computeMovementIntelligence({
  diagnostics,
  cacheChunkSurface,
  prewarmSurface,
  presenceSurface,
  degradationSurface,
  immortalSurface
}) {
  const patternLen = (diagnostics.pattern || "").length;
  const lineageDepth = diagnostics.lineageDepth || 0;
  const hasBinary = diagnostics.binary?.hasBinary ? 1 : 0;

  const presenceScope = presenceSurface.scope || "local";
  const presenceWeight =
    presenceScope === "global"        ? 1.0 :
    presenceScope === "page"          ? 0.7 :
    presenceScope === "local"         ? 0.4 :
    presenceScope === "global-max"    ? 1.1 :
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
    healthScore >= 0.97 ? 1.0 :
    healthScore >= 0.88 ? 0.8 :
    healthScore >= 0.55 ? 0.5 :
    healthScore >= 0.18 ? 0.3 :
    0.1;

  const coherenceScore = immortalSurface.immortalMeta?.coherenceScore ?? 1.0;
  const coherenceWeight =
    coherenceScore >= 0.9 ? 1.0 :
    coherenceScore >= 0.7 ? 0.7 :
    coherenceScore >= 0.4 ? 0.4 :
    0.2;

  const structuralScore =
    patternLen * 0.0005 +
    lineageDepth * 0.001 +
    hasBinary * 0.12;

  const solvednessScore = Math.max(
    0,
    Math.min(
      structuralScore * 0.4 +
      presenceWeight * 0.2 +
      prewarmWeight * 0.15 +
      cacheWeight * 0.1 +
      healthWeight * 0.1 +
      coherenceWeight * 0.05,
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
      solvednessScore * 0.7 +
      hasBinary * 0.1,
      1
    )
  );

  const intelShape = {
    layer: "PulseSendEngine",
    version: "v24-IMMORTAL-INTEL+++",
    solvednessScore,
    computeTier,
    readinessScore,
    presenceScope,
    prewarmLevel,
    hasBinary: !!hasBinary,
    patternLen,
    lineageDepth,
    healthScore,
    coherenceScore
  };

  const intelDual = computeDualHash(intelShape);

  return {
    ...intelShape,
    movementIntelligenceSignature: intelDual.primary,
    movementIntelligenceSignatureDual: intelDual
  };
}


// ============================================================================
//  FACTORY — Create the PulseSendEngine (v24-IMMORTAL-INTEL+++)
// ============================================================================

export function createPulseSendEngine({ pulseMesh, log }) {
  return {
    PulseRole,

    move({ pulse, targetOrgan, pathway, mode = "normal" }) {
      const effectivePathway =
        pathway ||
        (pulseMesh && typeof pulseMesh.pathwayFor === "function"
          ? pulseMesh.pathwayFor(targetOrgan, mode)
          : null);

      const diagnostics = buildMovementDiagnostics({
        pulse,
        targetOrgan,
        pathway: effectivePathway,
        mode
      });

      const cacheChunkSurface = buildCacheChunkSurface({
        pulse,
        targetOrgan,
        pathway: effectivePathway,
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

      const degradationSurface = buildDegradationSurface({ pulse });
      const immortalSurface = buildImmortalSurface({ pulse });

      const movementIntelligence = computeMovementIntelligence({
        diagnostics,
        cacheChunkSurface,
        prewarmSurface,
        presenceSurface,
        degradationSurface,
        immortalSurface
      });

      const movementShape = {
        pulse,
        targetOrgan,
        pathway: effectivePathway,
        mode,
        movementTier: degradationSurface.degradationTier
      };
      const movementDual = computeDualHash(movementShape);
      const movementSignature = movementDual.primary;

      log && log("[PulseSendEngine-v24-IMMORTAL-INTEL+++] Movement fired", {
        jobId: pulse.jobId,
        diagnostics,
        cacheChunkSurface,
        prewarmSurface,
        presenceSurface,
        degradationSurface,
        immortalSurface,
        movementIntelligence,
        movementSignature
      });

      return {
        packet: {
          pulse,
          targetOrgan,
          pathway: effectivePathway,
          mode,
          movementSignature,
          movementSignatureDual: movementDual,
          diagnostics,
          cacheChunkSurface,
          prewarmSurface,
          presenceSurface,
          degradationSurface,
          immortalSurface,
          movementIntelligence
        }
      };
    }
  };
}


// ============================================================================
//  ORGAN EXPORT — PulseSendEngine (v24-IMMORTAL-INTEL+++)
// ============================================================================

export const PulseSendEngine = {
  PulseRole,

  move({ pulse, targetOrgan, pathway, mode }) {
    const pulseType = pulse?.pulseType || pulse?.PulseRole?.identity || "UNKNOWN_PULSE_TYPE";
    const pattern = pulse?.pattern || "NO_PATTERN";
    const lineageDepth = Array.isArray(pulse?.lineage) ? pulse.lineage.length : 0;

    throw new Error(
      `[PulseSendEngine-v24-IMMORTAL-INTEL+++] move() called before initialization.\n` +
      `• pulseType: ${pulseType}\n` +
      `• pattern: ${pattern}\n` +
      `• lineageDepth: ${lineageDepth}\n` +
      `• targetOrgan: ${targetOrgan || "NO_ORGAN"}\n` +
      `• pathway: ${pathway || "NO_PATHWAY"}\n` +
      `• mode: ${mode || "NO_MODE"}\n` +
      `Use createPulseSendEngine(...) to wire dependencies.`
    );
  }
};
