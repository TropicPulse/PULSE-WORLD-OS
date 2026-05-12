// ============================================================================
//  BinarySend-v24-IMMORTAL-INTEL-ORGANISM.js
//  PURE BINARY SEND ORGAN — v12.3 EVO BINARY CORE + v24 IMMORTAL INTEL++
// ============================================================================
//  ROLE:
//    - Accept ONLY pure binary arrays (0/1).
//    - Deterministic outbound binary channel.
//    - No JSON, no objects, no strings (except internal ops).
//    - No lineage, no pattern, no routing hints.
//    - No drift, no randomness, no mutation.
//    - Binary-aware: emits binary diagnostics + signatures.
//    - 12.3+: cacheChunk-aware, prewarm-aware, presence-aware.
//    - v16: proxy-aware (pressure / fallback / boost), organism-aware (safe).
//    - v24: INTEL+ADVANTAGE surface + ER-ready binarySendMeta profile.
//    - Fallback-safe: deterministic fallback to proxy.
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
//  v24-IMMORTAL-INTEL — dual-hash + healing meta (symbolic-only)
// ============================================================================
function computeClassicHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `h${h}`;
}

function computeIntelHash(payload) {
  const s = JSON.stringify(payload || {});
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
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
  const intel = computeIntelHash(intelBase);
  const classic = computeClassicHash(`${label}::${classicString || ""}`);
  return { intel, classic };
}

// IMMORTAL healing/meta surface for BinarySend
const binarySendHealing = {
  cycleCount: 0,
  lastLength: 0,
  lastSignature: null,
  lastCacheChunk: null,
  lastPrewarm: null,
  lastPresenceScope: null,
  lastProxyMode: null,
  lastMaxThroughput: null,
  lastIntelSignature: null,
  lastClassicSignature: null
};

export function getBinarySendHealingState() {
  return { ...binarySendHealing };
}

// --- Evolution Engines ------------------------------------------------------
import { createPulseV2 as PulseV2EvolutionEngine } from "./PulseSendV2EvolutionEngine-v24.js";
import { createPulseV3 as PulseV3UnifiedOrganism } from "./PulseSendV3UnifiedOrganism-v24.js";

// --- Impulse Layer ----------------------------------------------------------
import { createPulseSendImpulse as PulseSendImpulse } from "./PulseSendImpulse-v24.js";

// --- Legacy Pulse Layer -----------------------------------------------------
import { createLegacyPulse as PulseSendLegacyPulse } from "./PulseSendLegacyPulse-v24.js";

// --- Adapter Layer ----------------------------------------------------------
import { adaptPulseSendPacket as PulseSendAdapter } from "./PulseSendAdapter-v24.js";

// --- Engine Layer -----------------------------------------------------------
import { PulseSendMover as PulseSendEngine } from "./PulseSendEngine-v24.js";

// --- Return Layer -----------------------------------------------------------
import { createPulseSendReturn as PulseSendReturn } from "./PulseSendReturn-v24.js";

// --- System Layer (Final Conductor) ----------------------------------------
import { createPulseSendSystem as PulseSendSystem } from "./PulseSendSystem.js";

// --- Proxy Context (IMMORTAL ORGANISM) -------------------------------------
import {
  getProxyContext,
  getProxyPressure,
  getProxyBoost,
  getProxyFallback,
  getProxyMode,
  getProxyLineage
} from "../PULSE-PROXY/PulseProxyContext-v20.js";

// ============================================================================
//  PROXY INTEGRATION — BinarySend Throughput Control (symbolic-only)
// ============================================================================
function computeMaxBinaryThroughput() {
  let maxBinaryThroughput = 8; // default safe throughput

  // Proxy fallback → strong throttle
  if (getProxyFallback()) {
    maxBinaryThroughput = Math.max(1, maxBinaryThroughput - 4);
  }

  // Proxy pressure → dynamic throttling
  const proxyPressure = getProxyPressure();
  if (proxyPressure > 0.7) {
    maxBinaryThroughput = Math.max(1, maxBinaryThroughput - 2);
  } else if (proxyPressure > 0.4) {
    maxBinaryThroughput = Math.max(1, maxBinaryThroughput - 1);
  }

  // Proxy boost → increase throughput if not in fallback
  if (getProxyBoost() > 0.5 && !getProxyFallback()) {
    maxBinaryThroughput += 2;
  }

  // Proxy mode override
  if (getProxyMode() === "fallback") {
    maxBinaryThroughput = 1;
  }

  return maxBinaryThroughput;
}

// ============================================================================
// ⭐ Pulse Intelligence (logic-only, IMMORTAL-safe, v24 surface)
// ============================================================================
function computePulseIntelligence({ advantageField, presenceField, factoringSignal, band }) {
  const advantageScore = Number(advantageField.advantageScore || 0);
  const advantageTier = Number(advantageField.advantageTier || 0);

  const presenceTier = presenceField.presenceTier || "idle";
  const presenceWeight =
    presenceTier === "critical" ? 1.0 :
    presenceTier === "high"     ? 0.8 :
    presenceTier === "elevated" ? 0.6 :
    presenceTier === "soft"     ? 0.4 :
    presenceTier === "low"      ? 0.3 :
    0.2;

  const factoring = factoringSignal ? 1 : 0;
  const bandIsBinary = band === "binary" ? 1 : 0;

  const solvednessScore = Math.max(
    0,
    Math.min(
      advantageScore * 5 +
      presenceWeight * 0.3 +
      factoring * 0.2,
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
      (bandIsBinary ? 0.2 : 0) +
      (advantageTier >= 2 ? 0.2 : advantageTier === 1 ? 0.1 : 0),
      1
    )
  );

  return {
    solvednessScore,
    factoringSignal: factoring ? "high" : "low",
    computeTier,
    readinessScore,
    band,
    advantageTier
  };
}
// ============================================================================
//  BINARY SURFACE FUNCTIONS — v24 IMMORTAL-INTEL+++
//  Pure, deterministic, drift-proof, zero IO, zero randomness.
//  Accept ONLY pure binary arrays (0/1).
// ============================================================================

// ---------------------------------------------------------------------------
//  Signature (17-bit deterministic) — stable across all v24 organs
// ---------------------------------------------------------------------------
export function computeSignature(bits) {
  let h = 0;
  for (let i = 0; i < bits.length; i++) {
    h = (h + bits[i] * (i + 13)) % 131072;   // 17-bit stable
  }
  return `b24_${h}`;
}

// ---------------------------------------------------------------------------
//  CacheChunk fingerprint — stable 24++ binary envelope key
// ---------------------------------------------------------------------------
export function computeCacheChunk(bits) {
  let acc = 1;
  for (let i = 0; i < bits.length; i++) {
    acc = (acc * 31 + bits[i]) % 8191;       // 13-bit stable
  }
  return `cc24_${acc}`;
}

// ---------------------------------------------------------------------------
//  Prewarm level — used by PulseSend, Adapter, BinarySend, MeshBinary
// ---------------------------------------------------------------------------
export function computePrewarm(bits) {
  const len = bits.length;

  if (len >= 1024) return "prewarm-ultra";     // 24++ new tier
  if (len >= 512)  return "prewarm-aggressive";
  if (len >= 128)  return "prewarm-medium";
  if (len >= 32)   return "prewarm-light";
  return "prewarm-none";
}

// ---------------------------------------------------------------------------
//  Presence scope — used by Mesh, Adapter, BinarySend, Awareness
// ---------------------------------------------------------------------------
export function computePresence(bits) {
  const len = bits.length;

  if (len >= 4096) return "presence-global-max";  // 24++ new tier
  if (len >= 1024) return "presence-global";
  if (len >= 256)  return "presence-page";
  return "presence-local";
}


// ============================================================================
//  v14.4+ Binary Intelligence (binary-only, organism-aware)
// ============================================================================
function computeBinaryIntelligence(bits) {
  const len = bits.length;

  const ones = bits.reduce((a, b) => a + b, 0);
  const density = len > 0 ? ones / len : 0;

  const parity = ones % 2 === 0 ? "even" : "odd";

  const shiftDepth = len > 0 ? (bits[0] === 1 ? 1 : 0) : 0;

  const cacheChunk = computeCacheChunk(bits);
  const prewarm = computePrewarm(bits);
  const presence = computePresence(bits);
  const signature = computeSignature(bits);

  const solvednessScore = Math.min(
    1,
    density * 0.6 +
      (shiftDepth ? 0.2 : 0) +
      (len > 256 ? 0.2 : 0)
  );

  const computeTier =
    solvednessScore >= 0.9 ? "nearSolution" :
    solvednessScore >= 0.7 ? "highValue"    :
    solvednessScore >= 0.4 ? "normal"       :
    solvednessScore >= 0.2 ? "lowPriority"  :
    "avoidCompute";

  const baseReadinessScore = Math.min(
    1,
    solvednessScore * 0.7 + (parity === "even" ? 0.1 : 0)
  );

  // ORGANISM-AWARE (symbolic-only): proxy pressure influences readiness
  const proxyPressure = getProxyPressure();
  const proxyFallback = getProxyFallback();
  const proxyBoost = getProxyBoost();

  const organismAdjustedReadiness = Math.max(
    0,
    Math.min(
      baseReadinessScore * (proxyFallback ? 0.5 : 1) -
        proxyPressure * 0.2 +
        (proxyBoost > 0.5 ? 0.1 : 0),
      1
    )
  );

  return {
    solvednessScore,
    computeTier,
    readinessScore: organismAdjustedReadiness,
    parity,
    density,
    shiftDepth,
    cacheChunk,
    prewarm,
    presence,
    signature,
    length: len
  };
}

export function createBinarySend({
  fallbackProxy,
  trace = false
} = {}) {

  // ---------------------------------------------------------------------------
  //  SAFETY: PURE BINARY ONLY
  // ---------------------------------------------------------------------------
  function isPureBinary(bits) {
    if (!Array.isArray(bits)) return false;
    for (let i = 0; i < bits.length; i++) {
      if (bits[i] !== 0 && bits[i] !== 1) return false;
    }
    return true;
  }

  // ---------------------------------------------------------------------------
  //  12.3+: deterministic binary signature (dual-band safe)
// ---------------------------------------------------------------------------
  function computeSignature(bits) {
    let h = 0;
    for (let i = 0; i < bits.length; i++) {
      h = (h + bits[i] * (i + 13)) % 131072; // 17-bit deterministic
    }
    return `b12_${h}`;
  }

  // ---------------------------------------------------------------------------
  //  12.3+: cacheChunk fingerprint (binary-only)
// ---------------------------------------------------------------------------
  function computeCacheChunk(bits) {
    let acc = 1;
    for (let i = 0; i < bits.length; i++) {
      acc = (acc * 31 + bits[i]) % 8191;
    }
    return `cc_${acc}`;
  }

  // ---------------------------------------------------------------------------
  //  12.3+: prewarm hint (binary-only)
// ---------------------------------------------------------------------------
  function computePrewarm(bits) {
    if (bits.length >= 512) return "prewarm-aggressive";
    if (bits.length >= 128) return "prewarm-medium";
    if (bits.length >= 32)  return "prewarm-light";
    return "prewarm-none";
  }

  // ---------------------------------------------------------------------------
  //  12.3+: presence scope (binary-only)
// ---------------------------------------------------------------------------
  function computePresence(bits) {
    const len = bits.length;
    if (len >= 1024) return "presence-global";
    if (len >= 256)  return "presence-page";
    return "presence-local";
  }

  // ---------------------------------------------------------------------------
  //  INTERNAL: ensure pure binary or fallback
  // ---------------------------------------------------------------------------
  function ensurePureBinaryOrFallback(op, bits, reason) {
    if (!isPureBinary(bits)) {
      return fallback(op, bits, reason);
    }
    return bits;
  }

  // ---------------------------------------------------------------------------
  //  INTERNAL: USE ALL IMPORTS (12.3+ integration surfaces)
// ---------------------------------------------------------------------------
  function runTechSurfaces(bits) {

    const v2 = PulseV2EvolutionEngine?.createPulseV2
      ? PulseV2EvolutionEngine.createPulseV2({ bits })
      : null;

    const v3 = PulseV3UnifiedOrganism?.createPulseV3
      ? PulseV3UnifiedOrganism.createPulseV3({ bits })
      : null;

    const impulse = PulseSendImpulse?.createImpulse
      ? PulseSendImpulse.createImpulse(bits)
      : null;

    const legacy = PulseSendLegacyPulse?.createLegacyPulse
      ? PulseSendLegacyPulse.createLegacyPulse(bits)
      : null;

    const adapter = PulseSendAdapter?.adapt
      ? PulseSendAdapter.adapt(bits)
      : null;

    const engine = PulseSendEngine?.engine
      ? PulseSendEngine.engine(bits)
      : null;

    const ret = PulseSendReturn?.ret
      ? PulseSendReturn.ret(bits)
      : null;

    const system = PulseSendSystem?.conduct
      ? PulseSendSystem.conduct(bits)
      : null;

    return {
      v2,
      v3,
      impulse,
      legacy,
      adapter,
      engine,
      ret,
      system
    };
  }

  // ---------------------------------------------------------------------------
  //  SHARED: build v24 INTEL+ADVANTAGE surface from binary intelligence
  // ---------------------------------------------------------------------------
  function buildIntelAdvantageSurface(binaryIntel, proxyMeta) {
    const advantageField = {
      advantageScore: binaryIntel.solvednessScore,
      advantageTier:
        binaryIntel.computeTier === "nearSolution" ? 3 :
        binaryIntel.computeTier === "highValue"    ? 2 :
        binaryIntel.computeTier === "normal"       ? 1 :
        0
    };

    const presenceField = {
      presenceTier:
        binaryIntel.presence === "presence-global" ? "critical" :
        binaryIntel.presence === "presence-page"   ? "high" :
        "soft",
      presenceBand: "binary"
    };

    const factoringSignal = binaryIntel.parity === "even";
    const band = "binary";

    const pulseIntel = computePulseIntelligence({
      advantageField,
      presenceField,
      factoringSignal,
      band
    });

    return {
      advantageField,
      presenceField,
      factoringSignal,
      band,
      pulseIntel,
      proxyMeta
    };
  }

  // ---------------------------------------------------------------------------
  //  SEND (binary → outbound)
// ---------------------------------------------------------------------------
  function send(bits) {
    const pure = ensurePureBinaryOrFallback("send", bits, "non-binary-output");

    // v24 IMMORTAL-INTEL cycle + base surfaces
    binarySendHealing.cycleCount++;
    binarySendHealing.lastLength = pure.length;

    const signature  = computeSignature(pure);
    const cacheChunk = computeCacheChunk(pure);
    const prewarm    = computePrewarm(pure);
    const presence   = computePresence(pure);

    binarySendHealing.lastSignature = signature;
    binarySendHealing.lastCacheChunk = cacheChunk;
    binarySendHealing.lastPrewarm = prewarm;
    binarySendHealing.lastPresenceScope = presence;

    const recommendedThroughput = computeMaxBinaryThroughput();
    const proxyMode = getProxyMode();

    binarySendHealing.lastMaxThroughput = recommendedThroughput;
    binarySendHealing.lastProxyMode = proxyMode;

    const tech = runTechSurfaces(pure);

    // Binary-level intelligence
    const binaryIntel = computeBinaryIntelligence(pure);

    // ORGANISM-AWARE: proxy meta (symbolic-only)
    const proxyMeta = {
      proxyPressure: getProxyPressure(),
      proxyFallback: getProxyFallback(),
      proxyBoost: getProxyBoost(),
      proxyMode,
      proxyLineage: getProxyLineage()
    };

    // v24 INTEL+ADVANTAGE surface
    const intelAdvantage = buildIntelAdvantageSurface(binaryIntel, proxyMeta);

    // v24-IMMORTAL-INTEL: build dualhash INTEL signature
    const intelPayload = {
      kind: "binarySend",
      version: "v24-IMMORTAL-INTEL-ORGANISM",
      cycleIndex: binarySendHealing.cycleCount,
      length: pure.length,
      signature,
      cacheChunk,
      prewarm,
      presenceScope: presence,
      recommendedThroughput,
      proxyMode,
      proxyPressure: proxyMeta.proxyPressure,
      proxyBoost: proxyMeta.proxyBoost,
      proxyFallback: proxyMeta.proxyFallback,
      proxyLineage: proxyMeta.proxyLineage,
      binaryIntel,
      advantageField: intelAdvantage.advantageField,
      presenceField: intelAdvantage.presenceField,
      pulseIntelligence: intelAdvantage.pulseIntel
    };

    const classicString =
      `LEN:${pure.length}` +
      `::SIG:${signature}` +
      `::CC:${cacheChunk}` +
      `::PRE:${prewarm}` +
      `::PRES:${presence}` +
      `::THR:${recommendedThroughput}` +
      `::MODE:${proxyMode}`;

    const dual = buildDualHashSignature("BINARY_SEND_ORGAN_V24", intelPayload, classicString);

    binarySendHealing.lastIntelSignature = dual.intel;
    binarySendHealing.lastClassicSignature = dual.classic;

    if (trace) {
      console.log("[BinarySend-v24] OUT:", pure, {
        signature,
        cacheChunk,
        prewarm,
        presence,
        tech,
        binaryIntel,
        intelAdvantage,
        proxyMeta,
        recommendedThroughput,
        intelSignature: dual.intel,
        classicSignature: dual.classic
      });
    }

    return {
      ok: true,
      bits: pure,
      signature,
      cacheChunk,
      prewarm,
      presence,
      tech,

      // Binary-level intelligence
      binaryIntel,
      binaryIntelSignature: signature,

      // v24 INTEL+ADVANTAGE surface
      advantageField: intelAdvantage.advantageField,
      presenceField: intelAdvantage.presenceField,
      pulseIntelligence: intelAdvantage.pulseIntel,

      length: pure.length,
      proxyMeta,
      recommendedThroughput,

      // v24-IMMORTAL-INTEL meta
      intelSignature: dual.intel,
      classicSignature: dual.classic,
      binarySendMeta: {
        layer: "BinarySend",
        role: "PURE_BINARY_SEND_ORGAN",
        version: "v24-IMMORTAL-INTEL-ORGANISM",
        erReady: true,
        signatures: {
          intel: dual.intel,
          classic: dual.classic
        },
        evo: {
          deterministicField: true,
          driftProof: true,
          multiInstanceReady: true,
          binaryFirst: true,
          advantageAware: true,
          proxyAware: true,
          cacheChunkAware: true,
          prewarmAware: true,
          presenceAware: true,
          zeroRoutingInfluence: true,
          zeroMutation: true,
          zeroIO: true
        },
        profile: {
          cycleIndex: binarySendHealing.cycleCount,
          length: pure.length,
          prewarm,
          presenceScope: presence,
          recommendedThroughput,
          proxyMode
        }
      }
    };
  }

  // ---------------------------------------------------------------------------
  //  FALLBACK — deterministic, drift-proof
  // ---------------------------------------------------------------------------
  function fallback(op, bits, reason) {
    if (!fallbackProxy) {
      throw new Error(
        `BinarySend fallback triggered (${reason}) but no fallbackProxy provided`
      );
    }

    if (trace) {
      console.warn("[BinarySend-v24] FALLBACK (%s): %s", op, reason, bits);
    }

    const result = fallbackProxy.exchange
      ? fallbackProxy.exchange(bits)
      : fallbackProxy(bits);

    const safe = Array.isArray(result) ? result : [];

    binarySendHealing.cycleCount++;
    binarySendHealing.lastLength = safe.length;

    const signature  = computeSignature(safe);
    const cacheChunk = computeCacheChunk(safe);
    const prewarm    = computePrewarm(safe);
    const presence   = computePresence(safe);

    binarySendHealing.lastSignature = signature;
    binarySendHealing.lastCacheChunk = cacheChunk;
    binarySendHealing.lastPrewarm = prewarm;
    binarySendHealing.lastPresenceScope = presence;

    const recommendedThroughput = computeMaxBinaryThroughput();
    const proxyMode = getProxyMode();

    binarySendHealing.lastMaxThroughput = recommendedThroughput;
    binarySendHealing.lastProxyMode = proxyMode;

    const tech = runTechSurfaces(safe);

    const binaryIntel = computeBinaryIntelligence(safe);

    const proxyMeta = {
      proxyPressure: getProxyPressure(),
      proxyFallback: getProxyFallback(),
      proxyBoost: getProxyBoost(),
      proxyMode,
      proxyLineage: getProxyLineage()
    };

    const intelAdvantage = buildIntelAdvantageSurface(binaryIntel, proxyMeta);

    const intelPayload = {
      kind: "binarySendFallback",
      version: "v24-IMMORTAL-INTEL-ORGANISM",
      cycleIndex: binarySendHealing.cycleCount,
      length: safe.length,
      signature,
      cacheChunk,
      prewarm,
      presenceScope: presence,
      recommendedThroughput,
      proxyMode,
      proxyPressure: proxyMeta.proxyPressure,
      proxyBoost: proxyMeta.proxyBoost,
      proxyFallback: proxyMeta.proxyFallback,
      proxyLineage: proxyMeta.proxyLineage,
      binaryIntel,
      advantageField: intelAdvantage.advantageField,
      presenceField: intelAdvantage.presenceField,
      pulseIntelligence: intelAdvantage.pulseIntel,
      reason
    };

    const classicString =
      `FALLBACK` +
      `::LEN:${safe.length}` +
      `::SIG:${signature}` +
      `::CC:${cacheChunk}` +
      `::PRE:${prewarm}` +
      `::PRES:${presence}` +
      `::THR:${recommendedThroughput}` +
      `::MODE:${proxyMode}` +
      `::REASON:${reason}`;

    const dual = buildDualHashSignature("BINARY_SEND_ORGAN_V24_FALLBACK", intelPayload, classicString);

    binarySendHealing.lastIntelSignature = dual.intel;
    binarySendHealing.lastClassicSignature = dual.classic;

    return {
      ok: false,
      fallback: true,
      reason,
      bits: safe,
      signature,
      cacheChunk,
      prewarm,
      presence,
      tech,

      binaryIntel,
      binaryIntelSignature: signature,

      advantageField: intelAdvantage.advantageField,
      presenceField: intelAdvantage.presenceField,
      pulseIntelligence: intelAdvantage.pulseIntel,

      length: safe.length,
      proxyMeta,
      recommendedThroughput,

      intelSignature: dual.intel,
      classicSignature: dual.classic,
      binarySendMeta: {
        layer: "BinarySend",
        role: "PURE_BINARY_SEND_ORGAN",
        version: "v24-IMMORTAL-INTEL-ORGANISM",
        fallback: true,
        signatures: {
          intel: dual.intel,
          classic: dual.classic
        },
        evo: {
          deterministicField: true,
          driftProof: true,
          multiInstanceReady: true,
          binaryFirst: true,
          advantageAware: true,
          proxyAware: true,
          cacheChunkAware: true,
          prewarmAware: true,
          presenceAware: true,
          zeroRoutingInfluence: true,
          zeroMutation: true,
          zeroIO: true
        },
        profile: {
          cycleIndex: binarySendHealing.cycleCount,
          length: safe.length,
          prewarm,
          presenceScope: presence,
          recommendedThroughput,
          proxyMode,
          reason
        }
      }
    };
  }

  // ---------------------------------------------------------------------------
  //  PUBLIC API
  // ---------------------------------------------------------------------------
  return {
    send,
    fallback
  };
}
