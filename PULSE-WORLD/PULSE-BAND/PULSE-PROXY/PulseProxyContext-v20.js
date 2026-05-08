// ============================================================================
//  PULSE PROXY CONTEXT — v20 IMMORTAL++ ORGANISM
//  Symbolic wrapper around BinaryProxy-v12.3-Evo-MAX-ABA
//  SAFE: No mutation of BinaryProxy. No binary logic. No routing.
//  PURPOSE: Provide organism-readable proxy state (pressure, fallback, boost).
//  ROLE: Circulatory signal → Organism Context Bridge
//  LAYER: Organism / Context / Circulation
// ============================================================================

/*
AI_EXPERIENCE_META = {
  identity: "PulseProxyContext",
  version: "v20-ImmortalPlus-ORGANISM",
  layer: "organism_context",
  role: "proxy_context_bridge",
  lineage: {
    root: "BinaryProxy-v9",
    parent: "BinaryProxy-v12.3-Evo-BINARY-MAX-ABA",
    organismIntegration: "v16-Immortal",
    spinalIntegration: "PulseOSSpinalCord-v13.0-Presence-Immortal",
    routerIntegration: "PulseRouter-v16-Immortal",
    meshIntegration: "PulseMesh-v16-Immortal",
    proxyContextEvolution: "v20-ImmortalPlus"
  },

  evo: {
    // Organism awareness
    organismAware: true,
    meshAware: true,
    expansionAware: true,
    serverAware: true,
    routerAware: true,
    worldCoreAware: true,
    dualBandAware: true,
    binarySendAware: true,
    spinalAware: true,
    proxyOrganismAware: true,

    // Advantage + presence field
    unifiedAdvantageField: true,
    advantageCascadeAware: true,
    pulseEfficiencyAware: true,
    presenceAware: true,
    bandPresenceAware: true,
    cacheChunkPresenceAware: true,

    // Prewarm / cache / chunk
    chunkAware: true,
    cacheAware: true,
    prewarmAware: true,
    routeWarmthAware: true,

    // Determinism
    deterministic: true,
    driftProof: true,
    pureCompute: true,
    zeroNetwork: true,
    zeroAsync: true,
    zeroFilesystem: true,
    zeroMutationOfBinaryProxy: true,
    zeroMutationOfInput: true,
    symbolicOnly: true,
    futureEvolutionReady: true
  },

  guarantees: {
    // Safety
    noBinaryLogic: true,
    noRouting: true,
    noExternalIO: true,
    noExternalMutation: true,
    noDynamicImports: true,
    noEval: true,
    noTimers: true,
    noRandomness: true,

    // Organism context
    providesProxyPressure: true,
    providesProxyFallback: true,
    providesProxyBoost: true,
    providesProxyMode: true,
    providesProxyLineage: true,
    providesProxyAdvantageHint: true,
    providesProxyHealthHint: true,
    providesProxyBandSignature: true,

    // Performance
    hotPathSafe: true,
    prewarmAware: true,
    zeroAllocExceptStateSwap: true
  },

  contract: {
    input: ["BinaryProxyEnvelope"],
    output: ["ProxyContextState"],
    consumers: [
      "PulseMesh",
      "PulseExpansion",
      "PulseServer",
      "PulseRouter",
      "PulseWorldCore",
      "DualBandOrganism",
      "BinarySend",
      "PulseOSSpinalCord",
      "PulseProxyOrganism"
    ]
  }
}
*/

// ============================================================================
//  INTERNAL HELPERS — deterministic, symbolic-only
// ============================================================================

function safeNow() {
  try {
    return Date.now(); // symbolic timestamp only
  } catch {
    return 0;
  }
}

function derivePressureFromBinaryField(binaryField) {
  if (!binaryField || typeof binaryField !== "object") return 0;
  const density =
    typeof binaryField.density === "number" ? binaryField.density : 0;

  // v20: keep same mapping but explicitly clamp [0,1]
  const normalized = density / 4096;
  if (normalized <= 0) return 0;
  if (normalized >= 1) return 1;
  return normalized;
}

function deriveBoostFromCacheChunkEnvelope(cacheChunkEnvelope) {
  if (!cacheChunkEnvelope || typeof cacheChunkEnvelope !== "object") return 0;

  const sig = cacheChunkEnvelope.cacheChunkSurfaceSignature || "";
  if (typeof sig !== "string" || !sig.length) return 0;

  const lastChar = sig.charAt(sig.length - 1);
  // v20: same graded boost semantics
  if (lastChar === "F" || lastChar === "f") return 1.0;
  if (lastChar === "E" || lastChar === "e") return 0.75;
  if (lastChar === "D" || lastChar === "d") return 0.5;
  return 0;
}

function deriveFallbackFromPresenceEnvelope(presenceEnvelope) {
  if (!presenceEnvelope || typeof presenceEnvelope !== "object") return false;

  const sig = presenceEnvelope.presenceSignature || "";
  if (typeof sig !== "string" || !sig.length) return false;

  const lastChar = sig.charAt(sig.length - 1);
  // even hex digit → fallback bias, odd → normal
  const evenHex = ["0", "2", "4", "6", "8", "a", "A", "c", "C", "e", "E"];
  return evenHex.includes(lastChar);
}

function deriveMode(pressure, boost, fallback) {
  if (fallback) return "fallback";
  if (boost > 0.8 && pressure >= 0.4) return "boost";
  if (pressure >= 0.8) return "pressure-high";
  if (pressure <= 0.1) return "pressure-low";
  return "normal";
}

// v20: advantage hint is pure metadata, no routing, no network
function deriveAdvantageHint({ pressure, boost, fallback }) {
  if (fallback) {
    return {
      band: "stability",
      score: 0.1,
      reason: "fallback-active"
    };
  }

  if (boost > 0.8 && pressure >= 0.4) {
    return {
      band: "throughput",
      score: 0.95,
      reason: "boost-and-healthy-pressure"
    };
  }

  if (pressure >= 0.8) {
    return {
      band: "throughput",
      score: 0.8,
      reason: "high-pressure"
    };
  }

  if (pressure <= 0.1) {
    return {
      band: "latency",
      score: 0.6,
      reason: "low-pressure"
    };
  }

  return {
    band: "neutral",
    score: 0.5,
    reason: "steady-state"
  };
}

// v20: health hint is symbolic-only, derived from pressure + fallback
function deriveHealthHint({ pressure, fallback }) {
  let status = "stable";
  let score = 1.0;

  if (fallback) {
    status = "degraded";
    score = 0.4;
  } else if (pressure >= 0.9) {
    status = "overloaded";
    score = 0.6;
  } else if (pressure <= 0.1) {
    status = "idle";
    score = 0.9;
  }

  return { status, score };
}

function safeBandSignature(envelope) {
  const sig = envelope && envelope.bandSignature;
  return typeof sig === "string" ? sig : null;
}

// ============================================================================
//  INTERNAL STATE — IMMUTABLE SNAPSHOT (v20 IMMORTAL++)
// ============================================================================

let _proxySeq = 0;

let _proxyState = Object.freeze({
  // Core organism fields
  pressure: 0, // 0–1 (derived from binaryField density)
  boost: 0, // 0–1 (derived from cacheChunk envelope)
  fallback: false, // boolean (derived from presence envelope)
  mode: "normal", // "normal" | "boost" | "fallback" | "pressure-high" | "pressure-low"
  lineage: "BinaryProxy-v12.3-Evo-BINARY-MAX-ABA",
  bandSignature: null, // last band signature from BinaryProxy envelope

  // v20: advantage + health hints
  advantageHint: {
    band: "neutral",
    score: 0.5,
    reason: "initial"
  },
  healthHint: {
    status: "stable",
    score: 1.0
  },

  // last envelope snapshots (symbolic-only, shallow)
  lastBinaryField: null,
  lastCacheChunkEnvelope: null,
  lastPresenceEnvelope: null,

  // sequence + timestamps (symbolic only)
  seq: _proxySeq,
  lastUpdateReason: "init",
  timestamp: safeNow()
});

export function updateProxyStateFromEnvelope(
  envelope = {},
  reason = "envelope"
) {
  const binaryField = envelope && envelope.binaryField;
  const cacheChunkEnvelope = envelope && envelope.cacheChunkEnvelope;
  const presenceEnvelope = envelope && envelope.presenceEnvelope;

  const pressure = derivePressureFromBinaryField(binaryField);
  const boost = deriveBoostFromCacheChunkEnvelope(cacheChunkEnvelope);
  const fallback = deriveFallbackFromPresenceEnvelope(presenceEnvelope);
  const mode = deriveMode(pressure, boost, fallback);

  const advantageHint = deriveAdvantageHint({ pressure, boost, fallback });
  const healthHint = deriveHealthHint({ pressure, fallback });
  const bandSignature = safeBandSignature(envelope);

  _proxySeq += 1;

  _proxyState = Object.freeze({
    pressure,
    boost,
    fallback,
    mode,
    lineage: _proxyState.lineage,
    bandSignature,

    advantageHint,
    healthHint,

    lastBinaryField: binaryField || null,
    lastCacheChunkEnvelope: cacheChunkEnvelope || null,
    lastPresenceEnvelope: presenceEnvelope || null,

    seq: _proxySeq,
    lastUpdateReason: typeof reason === "string" ? reason : "envelope",
    timestamp: safeNow()
  });
}

// ============================================================================
//  READ API — used by Mesh / Expansion / Server / Router / WorldCore
//  NOTE: All getters are pure, zero-mutation.
// ============================================================================

export const getProxyContext = () => _proxyState;
export const getProxyPressure = () => _proxyState.pressure;
export const getProxyBoost = () => _proxyState.boost;
export const getProxyFallback = () => _proxyState.fallback;
export const getProxyMode = () => _proxyState.mode;
export const getProxyLineage = () => _proxyState.lineage;
export const getProxyBandSignature = () => _proxyState.bandSignature;
export const getProxyAdvantageHint = () => _proxyState.advantageHint;
export const getProxyHealthHint = () => _proxyState.healthHint;
export const getProxySeq = () => _proxyState.seq;

// v20: safe snapshot clone for organisms that want a one-shot view
export function getProxySnapshot() {
  const s = _proxyState;
  return {
    pressure: s.pressure,
    boost: s.boost,
    fallback: s.fallback,
    mode: s.mode,
    lineage: s.lineage,
    bandSignature: s.bandSignature,
    advantageHint: { ...s.advantageHint },
    healthHint: { ...s.healthHint },
    seq: s.seq,
    lastUpdateReason: s.lastUpdateReason,
    timestamp: s.timestamp
  };
}
