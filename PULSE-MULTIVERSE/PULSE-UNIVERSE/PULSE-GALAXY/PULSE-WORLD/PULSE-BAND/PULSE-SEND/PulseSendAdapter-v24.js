// ============================================================================
//  FILE: PulseSendAdapter-v24-IMMORTAL-INTEL+++.js
//  Pattern-Shape Adapter • Pulse-Agnostic Translator • Pre-Delivery Adapter
//  v24-IMMORTAL-INTEL+++:
//    - Binary-first + Dual-Band aware (symbolic/binary)
//    - Ancestry Surface + Advantage Echo + Band/Presence Surface
//    - cacheChunkSurface + prewarmSurface + presenceSurface (24++ tuned)
//    - DualHash (classic) + INTEL hash on all key signatures
//    - IMMORTAL-INTEL+++ adapterIntelligence (burst-ready, GPU/band-aware)
//    - Binary path: wraps bits into full pulse envelope (band="binary")
// ============================================================================
//
//  SAFETY CONTRACT (v24-IMMORTAL-INTEL+++):
//  ----------------------------------------
//  • No network, no async, no timestamps.
//  • No external IO, no global mutation.
//  • Deterministic, drift-proof, zero randomness.
//  • No mutation outside returned objects.
// ============================================================================

//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝

// 2 — EXPORT GENOME METADATA


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

// INTEL hash — structure-aware, no IO, no time.
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
  const classicHash = computeHash(`${label}::${classicString || ""}`);
  return {
    intel: intelHash,
    classic: classicHash
  };
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

// ============================================================================
//  BINARY SURFACE EXTRACTION (binary-first, dual-band aware)
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
//  DIAGNOSTICS + ANCESTRY + ADVANTAGE ECHO + BAND/PRESENCE
// ============================================================================
function buildAdapterDiagnostics({ pulse, targetOrgan, mode }) {
  const pattern = pulse?.pattern || "NO_PATTERN";
  const lineageDepth = Array.isArray(pulse?.lineage) ? pulse.lineage.length : 0;
  const pulseType = pulse?.pulseType || pulse?.PulseRole?.identity || "UNKNOWN_PULSE_TYPE";

  const binarySurface = extractBinarySurfaceFromPulse(pulse);

  const patternClassic = computeHash(pattern);
  const lineageClassic = computeHash(String(lineageDepth));
  const pulseTypeClassic = computeHash(pulseType);
  const organClassic = computeHash(String(targetOrgan || "NO_ORGAN"));
  const modeClassic = computeHash(mode || "normal");

  const intelPayload = {
    pattern,
    lineageDepth,
    pulseType,
    targetOrgan: targetOrgan || "NO_ORGAN",
    mode: mode || "normal",
    binary: {
      hasBinary: binarySurface.hasBinary,
      binaryPattern: binarySurface.binaryPattern,
      binaryMode: binarySurface.binaryMode
    }
  };

  const classicString =
    `ADAPTER_DIAG::PAT:${pattern}` +
    `::DEPTH:${lineageDepth}` +
    `::TYPE:${pulseType}` +
    `::ORGAN:${targetOrgan || "NO_ORGAN"}` +
    `::MODE:${mode || "normal"}`;

  const diagSig = buildDualHashSignature(
    "PULSE_SEND_ADAPTER_DIAGNOSTICS",
    intelPayload,
    classicString
  );

  return {
    pattern,
    lineageDepth,
    pulseType,
    targetOrgan: targetOrgan || "NO_ORGAN",
    mode,

    binary: binarySurface,

    patternHash: patternClassic,
    lineageHash: lineageClassic,
    pulseTypeHash: pulseTypeClassic,
    organHash: organClassic,
    modeHash: modeClassic,

    diagnosticsIntelSignature: diagSig.intel,
    diagnosticsClassicSignature: diagSig.classic
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

  const classicString =
    `ADAPTER_ANCESTRY::JOB:${jobId}` +
    `::DEPTH:${lineage.length}` +
    `::ORIGIN:${originIdentity}`;

  const sig = buildDualHashSignature(
    "PULSE_SEND_ADAPTER_ANCESTRY",
    shape,
    classicString
  );

  return {
    jobId,
    lineageDepth: lineage.length,
    originIdentity,
    ancestryIntelSignature: sig.intel,
    ancestryClassicSignature: sig.classic
  };
}

function buildAdvantageEchoSurface(pulse) {
  const advantageField = pulse?.advantageField || {};
  const presenceField  = pulse?.presenceField  || {};
  const factoringSignal = pulse?.factoringSignal || null;
  const band = normalizeBand(pulse?.band || pulse?.bandMode || "symbolic");

  const shape = {
    advantageField,
    presenceField,
    factoringSignal,
    band
  };

  const classicString =
    `ADAPTER_ADV_ECHO::BAND:${band}` +
    `::FACT_SIG:${factoringSignal || "none"}`;

  const sig = buildDualHashSignature(
    "PULSE_SEND_ADAPTER_ADVANTAGE_ECHO",
    shape,
    classicString
  );

  return {
    advantageField,
    presenceField,
    factoringSignal,
    band,
    advantageEchoIntelSignature: sig.intel,
    advantageEchoClassicSignature: sig.classic
  };
}

// ============================================================================
//  cacheChunk / prewarm / presence surfaces (v24++ tuned)
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

  const sig = buildDualHashSignature(
    "PULSE_SEND_ADAPTER_CACHE_CHUNK",
    { cacheChunkKey, shape },
    `CACHE_CHUNK::${cacheChunkKey}`
  );

  return {
    cacheChunkKey,
    cacheChunkClassicSignature: computeHash(cacheChunkKey),
    cacheChunkIntelSignature: sig.intel,
    cacheChunkDualSignature: sig.classic
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

  const shape = {
    priority,
    mode: safeMode,
    hasTarget,
    level
  };

  const raw = stableStringify(shape);
  const prewarmKey = "psend-adapter-prewarm::" + computeHash(raw);

  const sig = buildDualHashSignature(
    "PULSE_SEND_ADAPTER_PREWARM",
    { prewarmKey, shape },
    `PREWARM::${prewarmKey}`
  );

  return {
    level,
    prewarmKey,
    prewarmIntelSignature: sig.intel,
    prewarmClassicSignature: sig.classic
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

  const shape = {
    pattern,
    hasTarget,
    scope
  };

  const raw = stableStringify(shape);
  const presenceKey = "psend-adapter-presence::" + computeHash(raw);

  const sig = buildDualHashSignature(
    "PULSE_SEND_ADAPTER_PRESENCE",
    { presenceKey, shape },
    `PRESENCE::${presenceKey}`
  );

  return {
    scope,
    presenceKey,
    presenceIntelSignature: sig.intel,
    presenceClassicSignature: sig.classic
  };
}

// ============================================================================
//  IMMORTAL-INTEL+++ — Adapter Intelligence (burst / GPU / band aware)
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

  const cacheWeight = cacheChunkSurface.cacheChunkKey ? 0.7 : 0.2;

  const structuralScore =
    patternLen * 0.0007 +
    lineageDepth * 0.0012 +
    hasBinary * 0.15;

  const solvednessScore = clamp01(
    structuralScore * 0.5 +
    presenceWeight * 0.25 +
    prewarmWeight * 0.15 +
    cacheWeight * 0.1
  );

  const computeTier =
    solvednessScore >= 0.9 ? "nearSolution" :
    solvednessScore >= 0.7 ? "highValue"    :
    solvednessScore >= 0.4 ? "normal"       :
    solvednessScore >= 0.2 ? "lowPriority"  :
    "avoidCompute";

  const readinessScore = clamp01(
    solvednessScore * 0.7 +
    hasBinary * 0.15
  );

  const intelShape = {
    version: "v24-IMMORTAL-INTEL+++",
    solvednessScore,
    computeTier,
    readinessScore,
    presenceScope,
    prewarmLevel,
    hasBinary: !!hasBinary,
    patternLen,
    lineageDepth
  };

  const classicString =
    `ADAPTER_INTEL::SOLV:${solvednessScore.toFixed(4)}` +
    `::TIER:${computeTier}` +
    `::READY:${readinessScore.toFixed(4)}`;

  const sig = buildDualHashSignature(
    "PULSE_SEND_ADAPTER_INTELLIGENCE",
    intelShape,
    classicString
  );

  return {
    ...intelShape,
    adapterIntelligenceIntelSignature: sig.intel,
    adapterIntelligenceClassicSignature: sig.classic
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
//  FACTORY — Create an Adapter for ANY Pulse organism (v24 IMMORTAL-INTEL+++)
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

  const adapterSignatureShape = {
    pattern: diagnostics.pattern,
    targetOrgan: diagnostics.targetOrgan,
    mode: diagnostics.mode,
    binaryPattern: diagnostics.binary.binaryPattern || "NO_BINARY_PATTERN",
    routerHint: diagnostics.binary.routerHint || "NO_ROUTER_HINT",
    meshHint: diagnostics.binary.meshHint || "NO_MESH_HINT",
    organHint: diagnostics.binary.organHint || "NO_ORGAN_HINT"
  };

  const classicString =
    `ADAPTER_SIG::PAT:${adapterSignatureShape.pattern}` +
    `::ORGAN:${adapterSignatureShape.targetOrgan}` +
    `::MODE:${adapterSignatureShape.mode}`;

  const adapterSig = buildDualHashSignature(
    "PULSE_SEND_ADAPTER_SIGNATURE",
    adapterSignatureShape,
    classicString
  );

  const adapter = ORGAN_ADAPTERS[targetOrgan];

  if (typeof adapter === "function") {
    return {
      ...adapter(
        { ...pulse, pulseType, advantageField },
        targetOrgan,
        mode
      ),
      PulseRole,
      adapterIntelSignature: adapterSig.intel,
      adapterClassicSignature: adapterSig.classic,
      diagnostics,
      cacheChunkSurface,
      prewarmSurface,
      presenceSurface,
      ancestrySurface,
      advantageEchoSurface,
      adapterIntelligence
    };
  }

  // Fallback: neutral shape
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
    adapterIntelSignature: adapterSig.intel,
    adapterClassicSignature: adapterSig.classic,
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
//  ORGAN EXPORT — BinarySend tech-surface compatibility (binary-first)
// ============================================================================
//
//  BinarySend-v24 imports:
//    import { PulseSendAdapter } from "./PulseSendAdapter-v24-IMMORTAL-INTEL+++.js";
//    const adapter = PulseSendAdapter?.adapt ? PulseSendAdapter.adapt(bits) : null;
// ============================================================================
export const PulseSendAdapter = {
  PulseRole,

  adapt(bitsOrPulse, targetOrgan, mode) {
    // If it's already a pulse-shaped object, pass through.
    if (bitsOrPulse && typeof bitsOrPulse === "object" && !Array.isArray(bitsOrPulse)) {
      return adaptPulseSendPacket(bitsOrPulse, targetOrgan, mode);
    }

    // Binary path: wrap bits into a synthetic pulse envelope (binary-first).
    const bits = Array.isArray(bitsOrPulse) ? bitsOrPulse : [];
    const pseudoPulse = {
      jobId: "BINARY_SEND_ADAPTER_V24",
      pattern: "binary/send/adapter/v24",
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
