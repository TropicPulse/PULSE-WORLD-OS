// ============================================================================
//  PulseSendAdapter-v16-Immortal-ORGANISM.js
//  Pattern‑Shape Adapter • Pulse‑Agnostic Translator • Pre‑Delivery Adapter
//  v16-Immortal-ORGANISM:
//    - DualStack + Binary-Front-End + Ancestry Surface + Advantage Echo
//    - cacheChunkSurface + prewarmSurface + presenceSurface
//    - DualHash (primary/secondary) on all keys/signatures
//    - IMMORTAL-INTEL adapterIntelligence field
// ============================================================================
//
//  SAFETY CONTRACT (v16-Immortal-ORGANISM):
//  ----------------------------------------
//  • No imports.
//  • No network.
//  • No async.
//  • No timestamps.
//  • No external IO.
//  • No mutation outside instance.
//  • Pure structural math only.
// ============================================================================
import {
  OrganismIdentity,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PulseWorldOrganismMap-v21.js";
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
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `h${h}`;
}

function computeHashAlt(str) {
  let h = 1;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h * 131 + s.charCodeAt(i) * (i + 7)) % 131071;
  }
  return `h2_${h}`;
}

function stableStringify(value) {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) {
    return "[" + value.map(stableStringify).join(",") + "]";
  }
  const keys = Object.keys(value).sort();
  return (
    "{" +
    keys.map((k) => JSON.stringify(k) + ":" + stableStringify(value[k])).join(",") +
    "}"
  );
}

function computeDualHash(value) {
  const s = typeof value === "string" ? value : stableStringify(value);
  return {
    primary: computeHash(s),
    secondary: computeHashAlt(s)
  };
}


// ============================================================================
//  BINARY SURFACE EXTRACTION
// ============================================================================
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


// ============================================================================
//  DIAGNOSTICS + ANCESTRY + ADVANTAGE ECHO
// ============================================================================
function buildAdapterDiagnostics({ pulse, targetOrgan, mode }) {
  const pattern = pulse?.pattern || "NO_PATTERN";
  const lineageDepth = Array.isArray(pulse?.lineage) ? pulse.lineage.length : 0;
  const pulseType = pulse?.pulseType || pulse?.PulseRole?.identity || "UNKNOWN_PULSE_TYPE";

  const binarySurface = extractBinarySurfaceFromPulse(pulse);

  const patternHashDual   = computeDualHash(pattern);
  const lineageHashDual   = computeDualHash(String(lineageDepth));
  const pulseTypeHashDual = computeDualHash(pulseType);
  const organHashDual     = computeDualHash(String(targetOrgan || "NO_ORGAN"));
  const modeHashDual      = computeDualHash(mode || "normal");

  const binaryPatternHashDual = binarySurface.binaryPattern
    ? computeDualHash(binarySurface.binaryPattern)
    : null;
  const binaryModeHashDual = binarySurface.binaryMode
    ? computeDualHash(binarySurface.binaryMode)
    : null;
  const binaryRouterHintHashDual = binarySurface.routerHint
    ? computeDualHash(binarySurface.routerHint)
    : null;
  const binaryMeshHintHashDual = binarySurface.meshHint
    ? computeDualHash(binarySurface.meshHint)
    : null;
  const binaryOrganHintHashDual = binarySurface.organHint
    ? computeDualHash(binarySurface.organHint)
    : null;

  return {
    pattern,
    lineageDepth,
    pulseType,
    targetOrgan: targetOrgan || "NO_ORGAN",
    mode,

    binary: binarySurface,

    patternHash: patternHashDual.primary,
    patternHashDual,
    lineageHash: lineageHashDual.primary,
    lineageHashDual,
    pulseTypeHash: pulseTypeHashDual.primary,
    pulseTypeHashDual,
    organHash: organHashDual.primary,
    organHashDual,
    modeHash: modeHashDual.primary,
    modeHashDual,

    binaryPatternHash: binaryPatternHashDual ? binaryPatternHashDual.primary : null,
    binaryPatternHashDual,
    binaryModeHash: binaryModeHashDual ? binaryModeHashDual.primary : null,
    binaryModeHashDual,
    binaryRouterHintHash: binaryRouterHintHashDual ? binaryRouterHintHashDual.primary : null,
    binaryRouterHintHashDual,
    binaryMeshHintHash: binaryMeshHintHashDual ? binaryMeshHintHashDual.primary : null,
    binaryMeshHintHashDual,
    binaryOrganHintHash: binaryOrganHintHashDual ? binaryOrganHintHashDual.primary : null,
    binaryOrganHintHashDual
  };
}

function buildAncestrySurface(pulse) {
  const jobId = pulse?.jobId || "NO_JOB";
  const lineage = Array.isArray(pulse?.lineage) ? pulse.lineage : [];
  const originIdentity = pulse?.PulseRole?.identity || "UNKNOWN_ORIGIN";

  const shape = {
    jobId,
    lineageDepth: lineage.length,
    originIdentity,
    lineage
  };

  const hashDual = computeDualHash(shape);

  return {
    jobId,
    lineageDepth: lineage.length,
    originIdentity,
    ancestrySignature: hashDual.primary,
    ancestrySignatureDual: hashDual
  };
}

function buildAdvantageEchoSurface(pulse) {
  const advantageField = pulse?.advantageField || {};
  const presenceField  = pulse?.presenceField  || {};
  const factoringSignal = pulse?.factoringSignal || null;
  const band = pulse?.band || "symbolic";

  const shape = {
    advantageField,
    presenceField,
    factoringSignal,
    band
  };

  const hashDual = computeDualHash(shape);

  return {
    advantageField,
    presenceField,
    factoringSignal,
    band,
    advantageEchoSignature: hashDual.primary,
    advantageEchoSignatureDual: hashDual
  };
}


// ============================================================================
//  cacheChunk / prewarm / presence surfaces (v16 dual-hash)
// ============================================================================
function buildCacheChunkSurface({ pulse, targetOrgan, mode }) {
  const pattern = pulse?.pattern || "NO_PATTERN";
  const jobId = pulse?.jobId || "NO_JOB";
  const pulseType = pulse?.pulseType || pulse?.PulseRole?.identity || "UNKNOWN_PULSE_TYPE";

  const shape = {
    jobId,
    pattern,
    targetOrgan: targetOrgan || "NO_ORGAN",
    mode: mode || "normal",
    pulseType
  };

  const serialized = stableStringify(shape);
  const cacheChunkKey = "psend-adapter-cache::" + computeHash(serialized);
  const cacheChunkKeyDual = computeDualHash(cacheChunkKey);

  return {
    cacheChunkKey,
    cacheChunkSignature: cacheChunkKeyDual.primary,
    cacheChunkSignatureDual: cacheChunkKeyDual
  };
}

function buildPrewarmSurface({ pulse, targetOrgan, mode }) {
  const priority = pulse?.priority || "normal";
  const safeMode = mode || "normal";
  const hasTarget = !!targetOrgan;

  let level = "none";
  if (priority === "high" || priority === "critical") {
    level = "aggressive";
  } else if (priority === "normal" && hasTarget) {
    level = "medium";
  } else if (priority === "low" && hasTarget) {
    level = "light";
  }

  const raw = stableStringify({
    priority,
    mode: safeMode,
    hasTarget
  });

  const prewarmKey = "psend-adapter-prewarm::" + computeHash(raw);
  const prewarmKeyDual = computeDualHash(prewarmKey);

  return {
    level,
    prewarmKey,
    prewarmSignature: prewarmKeyDual.primary,
    prewarmSignatureDual: prewarmKeyDual
  };
}

function buildPresenceSurface({ pulse, targetOrgan }) {
  const pattern = pulse?.pattern || "NO_PATTERN";
  const hasTarget = !!targetOrgan;

  let scope = "local";
  if (hasTarget && pattern.includes("/global")) {
    scope = "global";
  } else if (hasTarget && pattern.includes("/page")) {
    scope = "page";
  }

  const raw = stableStringify({
    pattern,
    hasTarget,
    scope
  });

  const presenceKey = "psend-adapter-presence::" + computeHash(raw);
  const presenceKeyDual = computeDualHash(presenceKey);

  return {
    scope,
    presenceKey,
    presenceSignature: presenceKeyDual.primary,
    presenceSignatureDual: presenceKeyDual
  };
}


// ============================================================================
//  IMMORTAL-INTEL — Adapter Intelligence (symbolic-only)
// ============================================================================
function computeAdapterIntelligence({ diagnostics, cacheChunkSurface, prewarmSurface, presenceSurface }) {
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

  const structuralScore =
    patternLen * 0.0005 +
    lineageDepth * 0.001 +
    hasBinary * 0.1;

  const solvednessScore = Math.max(
    0,
    Math.min(
      structuralScore * 0.5 +
      presenceWeight * 0.25 +
      prewarmWeight * 0.15 +
      cacheWeight * 0.1,
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
    solvednessScore,
    computeTier,
    readinessScore,
    presenceScope,
    prewarmLevel,
    hasBinary: !!hasBinary,
    patternLen,
    lineageDepth
  };

  const intelHashDual = computeDualHash(intelShape);

  return {
    ...intelShape,
    adapterIntelligenceSignature: intelHashDual.primary,
    adapterIntelligenceSignatureDual: intelHashDual
  };
}


// ============================================================================
//  ADAPTER RULES — how each organ wants to receive a Pulse organism
// ============================================================================
const ORGAN_ADAPTERS = {
  GPU: (pulse, targetOrgan, mode) => ({
    target: targetOrgan,
    jobId: pulse.jobId,
    pattern: pulse.pattern,
    payload: pulse.payload,
    priority: pulse.priority,
    lineage: pulse.lineage,
    mode,
    pulseType: pulse.pulseType,
    advantageField: pulse.advantageField,
    gpuReady: true
  }),

  Earn: (pulse, targetOrgan, mode) => ({
    target: targetOrgan,
    jobId: pulse.jobId,
    pattern: pulse.pattern,
    payload: pulse.payload,
    priority: pulse.priority,
    lineage: pulse.lineage,
    mode,
    pulseType: pulse.pulseType,
    advantageField: pulse.advantageField,
    earnReady: true
  }),

  OS: (pulse, targetOrgan, mode) => ({
    target: targetOrgan,
    jobId: pulse.jobId,
    pattern: pulse.pattern,
    payload: pulse.payload,
    priority: pulse.priority,
    lineage: pulse.lineage,
    mode,
    pulseType: pulse.pulseType,
    advantageField: pulse.advantageField,
    osReady: true
  }),

  Mesh: (pulse, targetOrgan, mode) => ({
    target: targetOrgan,
    jobId: pulse.jobId,
    pattern: pulse.pattern,
    payload: pulse.payload,
    priority: pulse.priority,
    lineage: pulse.lineage,
    mode,
    pulseType: pulse.pulseType,
    advantageField: pulse.advantageField,
    meshReady: true
  })
};


// ============================================================================
//  FACTORY — Create an Adapter for ANY Pulse organism (v16 IMMORTAL)
// ============================================================================
export function adaptPulseSendPacket(pulse, targetOrgan, mode = "normal") {
  const pulseType = pulse?.pulseType || pulse?.PulseRole?.identity || "UNKNOWN_PULSE_TYPE";
  const advantageField = pulse?.advantageField || null;

  const diagnostics = buildAdapterDiagnostics({
    pulse,
    targetOrgan,
    mode
  });

  const cacheChunkSurface = buildCacheChunkSurface({
    pulse,
    targetOrgan,
    mode
  });

  const prewarmSurface = buildPrewarmSurface({
    pulse,
    targetOrgan,
    mode
  });

  const presenceSurface = buildPresenceSurface({
    pulse,
    targetOrgan
  });

  const ancestrySurface = buildAncestrySurface(pulse);
  const advantageEchoSurface = buildAdvantageEchoSurface(pulse);

  const adapterIntelligence = computeAdapterIntelligence({
    diagnostics,
    cacheChunkSurface,
    prewarmSurface,
    presenceSurface
  });

  // v16 dual-hash adapter signature
  const adapterSignatureShape = {
    pattern: diagnostics.pattern,
    targetOrgan: diagnostics.targetOrgan,
    mode: diagnostics.mode,
    binaryPattern: diagnostics.binary.binaryPattern || "NO_BINARY_PATTERN",
    routerHint: diagnostics.binary.routerHint || "NO_ROUTER_HINT",
    meshHint: diagnostics.binary.meshHint || "NO_MESH_HINT",
    organHint: diagnostics.binary.organHint || "NO_ORGAN_HINT"
  };
  const adapterSignatureDual = computeDualHash(adapterSignatureShape);

  const adapter = ORGAN_ADAPTERS[targetOrgan];

  if (typeof adapter === "function") {
    return {
      ...adapter(
        { ...pulse, pulseType, advantageField },
        targetOrgan,
        mode
      ),
      PulseRole,
      adapterSignature: adapterSignatureDual.primary,
      adapterSignatureDual,
      diagnostics,
      cacheChunkSurface,
      prewarmSurface,
      presenceSurface,
      ancestrySurface,
      advantageEchoSurface,
      adapterIntelligence
    };
  }

  // ⭐ fallback: neutral shape
  return {
    target: targetOrgan,
    jobId: pulse.jobId,
    pattern: pulse.pattern,
    payload: pulse.payload,
    priority: pulse.priority,
    lineage: pulse.lineage,
    mode,
    pulseType,
    advantageField,
    neutral: true,

    PulseRole,
    adapterSignature: adapterSignatureDual.primary,
    adapterSignatureDual,
    diagnostics,
    cacheChunkSurface,
    prewarmSurface,
    presenceSurface,
    ancestrySurface,
    advantageEchoSurface,
    adapterIntelligence
  };
}


// ============================================================================
//  ORGAN EXPORT — BinarySend tech-surface compatibility
// ============================================================================
//
//  BinarySend-v16 imports:
//    import { adaptPulseSendPacket as PulseSendAdapter } from "./PulseSendAdapter.js";
//    const adapter = PulseSendAdapter?.adapt ? PulseSendAdapter.adapt(bits) : null;
//
//  So we expose an object with .adapt(...) that delegates to adaptPulseSendPacket.
// ============================================================================
export const PulseSendAdapter = {
  PulseRole,

  adapt(bitsOrPulse, targetOrgan, mode) {
    // If it's already a pulse-shaped object, pass through.
    if (bitsOrPulse && typeof bitsOrPulse === "object" && !Array.isArray(bitsOrPulse)) {
      return adaptPulseSendPacket(bitsOrPulse, targetOrgan, mode);
    }

    // Binary path: wrap bits into a synthetic pulse envelope.
    const bits = Array.isArray(bitsOrPulse) ? bitsOrPulse : [];
    const pseudoPulse = {
      jobId: "BINARY_SEND_ADAPTER",
      pattern: "binary/send/adapter",
      payload: {
        binaryPayload: bits,
        binaryPattern: "binary/send",
        binaryMode: mode || "normal"
      },
      priority: "normal",
      returnTo: null,
      band: "binary",
      lineage: []
    };

    return adaptPulseSendPacket(pseudoPulse, targetOrgan, mode);
  }
};
