// ============================================================================
//  PULSE PROXY CONTEXT — v20-ImmortalPlus+++ ORGANISM
//  Symbolic wrapper around BinaryProxy-v20-Immortal-BINARY-MAX-ABA
//  SAFE: No mutation of BinaryProxy. No binary logic. No routing.
//  PURPOSE: Provide organism-readable proxy state (pressure, fallback, boost, advantage).
//  ROLE: Circulatory signal → Organism Context Bridge
//  LAYER: Organism / Context / Circulation
// ============================================================================
import {
  OrganismIdentity,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PulseWorldOrganismMap-v21.js";
const Identity = OrganismIdentity(import.meta.url);

// 2 — EXPORT GENOME METADATA
export const PulseProxyContextMeta = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
// export const PulseProxyContextMeta = Identity.pulseLoreContext;
export const PulseProxyContextExperienceMeta = Identity.AI_EXPERIENCE_META;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

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

// v20+++ advantage hint: richer, but still pure metadata
function deriveAdvantageHint({ pressure, boost, fallback }) {
  if (fallback) {
    return {
    band: "stability",
      score: 0.15,
      reason: "fallback-active",
      modeBias: "conservative"
    };
  }

  if (boost > 0.8 && pressure >= 0.4 && pressure <= 0.85) {
    return {
      band: "throughput",
      score: 0.95,
      reason: "boost-and-healthy-pressure",
      modeBias: "aggressive"
    };
  }

  if (pressure >= 0.9) {
    return {
      band: "throughput",
      score: 0.8,
      reason: "high-pressure",
      modeBias: "cautious-aggressive"
    };
  }

  if (pressure <= 0.1) {
    return {
      band: "latency",
      score: 0.65,
      reason: "low-pressure",
      modeBias: "opportunistic"
    };
  }

  return {
    band: "neutral",
    score: 0.5,
    reason: "steady-state",
    modeBias: "balanced"
  };
}

// v20+++ health hint: symbolic-only, derived from pressure + fallback
function deriveHealthHint({ pressure, fallback }) {
  let status = "stable";
  let score = 1.0;

  if (fallback) {
    status = "degraded";
    score = 0.45;
  } else if (pressure >= 0.95) {
    status = "overloaded";
    score = 0.6;
  } else if (pressure >= 0.8) {
    status = "strained";
    score = 0.75;
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
  pressure: 0,
  boost: 0,
  fallback: false,
  mode: "normal",
  lineage: "BinaryProxy-v20-Immortal-BINARY-MAX-ABA",
  bandSignature: null,

  advantageHint: {
    band: "neutral",
    score: 0.5,
    reason: "initial",
    modeBias: "balanced"
  },
  healthHint: {
    status: "stable",
    score: 1.0
  },

  lastBinaryField: null,
  lastCacheChunkEnvelope: null,
  lastPresenceEnvelope: null,

  seq: _proxySeq,
  lastUpdateReason: "init",
  timestamp: safeNow()
});

// ============================================================================
//  UPDATE — Symbolic-only state update from BinaryProxy envelope
// ============================================================================

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

// v20+++ safe snapshot clone for organisms that want a one-shot view
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
    timestamp: s.timestamp,
    experienceMeta: PulseProxyContextExperienceMeta,
    meta: {
      layer: PulseProxyContextMeta.layer,
      version: PulseProxyContextMeta.version
    }
  };
}
