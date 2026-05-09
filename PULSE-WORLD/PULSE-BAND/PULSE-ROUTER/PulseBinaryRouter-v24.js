/**
 * BinaryRouter-CosmosMultiverse-v24-Immortal-Cosmos-INTEL-Evo+++ .js
 * PULSE-WORLD / BINARY-ROUTER / MULTIVERSE COSMOS — v24++
 *
 * ROLE:
 *   Pure binary → binary router with multiverse placement.
 *   - Deterministic handler selection
 *   - Pure binary contract
 *   - Zero randomness, zero mutation
 *   - DualHash routing signatures (reversible-friendly)
 *   - Tiered fallback (proxy → mesh → node)
 *   - Multiverse-aware routing metadata
 *   - Router-intelligence surface (bits/handler/cosmos insight)
 *   - Advantage / integrity / envelope-aware routing
 *   - Session/band/route-aware (schema-only, no IO)
 */
// ============================================================================
//  PulseRouter-Barrel-v24.js — v24‑IMMORTAL‑COSMOS‑INTEL‑Evo+++
//  Unified Router Organ Import Surface (Binary + Evolutionary + Mesh + Earn)
//  PURE IMPORT LAYER — NO LOGIC, NO STATE, NO EXECUTION
// ============================================================================
/*
AI_EXPERIENCE_META = {
  identity: "PulseBinaryRouter",
  version: "v24-Immortal-Cosmos-INTEL-Evo+++",
  layer: "pulse_router",
  role: "binary_router_multiverse",
  lineage: "PulseBinaryRouter-v16-Immortal-DualHash-INTEL → v24-Immortal-Cosmos-INTEL-Evo+++",

  evo: {
    binaryCore: true,
    immortalBand: true,
    dualBand: true,
    chunkAligned: true,
    presenceAware: true,
    safeRouteFree: true,
    deterministic: true,
    driftProof: true,
    pureCompute: true,

    dualHashReady: true,
    routerIntelligenceReady: true,
    multiverseAware: true,
    cosmosAware: true,
    timelineAware: true,
    branchAware: true,

    advantageAware: true,
    integrityAware: true,
    envelopeAware: true,
    samplingAware: true,
    dedupAware: true,

    sessionAware: true,
    bandAware: true,
    routeShapeAware: true
  },

  contract: {
    always: [
      "PulseBinaryPulse",
      "PulseBinaryTech-v24-Immortal-Cosmos-INTEL-Evo+++",
      "PulsePresence",
      "PulseChunks",
      "PulseRouterCommandments"
    ],
    never: [
      "legacyBinaryRouter",
      "legacyRouter",
      "safeRoute",
      "fetchViaCNS",
      "legacyChunker"
    ]
  }
}
*/

export const PulseBinaryRouterRole = {
  type: "Organ",
  subsystem: "BinaryRouter",
  layer: "PulseRouter",
  version: "24.0-Immortal-Cosmos-INTEL-Evo+++",
  identity: "PulseBinaryRouter-v24-Immortal-Cosmos-INTEL-Evo+++",
  schemaVersion: "v3",
  evo: {
    binaryCore: true,
    immortalBand: true,
    dualBand: true,
    chunkAligned: true,
    presenceAware: true,
    deterministic: true,
    driftProof: true,
    pureCompute: true,
    dualHashReady: true,
    routerIntelligenceReady: true,
    multiverseAware: true,
    cosmosAware: true,
    timelineAware: true,
    branchAware: true,
    advantageAware: true,
    integrityAware: true,
    envelopeAware: true,
    samplingAware: true,
    dedupAware: true,
    sessionAware: true,
    bandAware: true,
    routeShapeAware: true
  }
};

// --- EVOLUTIONARY ROUTER ORGANS --------------------------------------------
import * as PulseRouterEvolutionaryDesign     from "./PulseRouterEvolutionaryDesign.js";
import * as PulseRouterEvolutionaryInstincts  from "./PulseRouterEvolutionaryInstincts.js";
import * as PulseRouterEvolutionaryThought    from "./PulseRouterEvolutionaryThought.js";

// --- MESH ROUTER ------------------------------------------------------------
import * as PulseRouterMesh           from "./PulseRouterMesh-v16.js";

// --- EARN-AWARE ROUTER ------------------------------------------------------
import * as PulseRouterEarn           from "./PulseRouterEarn-v16.js";

// --- ROUTER COMMANDMENTS ----------------------------------------------------
import * as PulseRouterCommandments   from "./PulseRouterCommandments.js";

// ============================================================================
// INTERNAL HELPERS — HASH / DUALHASH / INTELLIGENCE (pure, deterministic)
// ============================================================================

const BINARY_ROUTER_SCHEMA_VERSION = "v3";

function computeHash(str) {
  let h = 0;
  const s = String(str);
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 131072;
  }
  return `br24-h${h.toString(16)}`;
}

function computeAltHash(str) {
  let h = 1;
  const s = String(str);
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i) * (i + 7)) % 1048573;
  }
  return `br24-a${h.toString(16)}`;
}

function computeDualHash(str) {
  const primary = computeHash(str);
  const secondary = computeAltHash(str);
  const combined = computeHash(primary + "::" + secondary);
  return { primary, secondary, combined };
}

function computeBitsStats(bits) {
  const len = Array.isArray(bits) ? bits.length : 0;
  if (len === 0) {
    return {
      length: 0,
      ones: 0,
      zeros: 0,
      onesRatio: 0,
      zerosRatio: 0
    };
  }
  let ones = 0;
  for (let i = 0; i < len; i++) {
    if (bits[i] === 1) ones++;
  }
  const zeros = len - ones;
  return {
    length: len,
    ones,
    zeros,
    onesRatio: ones / len,
    zerosRatio: zeros / len
  };
}

function computeRouterAdvantage({ bits, handlerIndex, handlersCount }) {
  const stats = computeBitsStats(bits);
  const load = handlersCount > 0 ? handlerIndex / handlersCount : 0;

  const density = stats.length > 0 ? stats.onesRatio : 0;
  const balance = 1 - Math.abs(0.5 - stats.onesRatio) * 2;
  const entropyProxy =
    stats.onesRatio > 0 && stats.zerosRatio > 0
      ? Math.min(1, stats.onesRatio * stats.zerosRatio * 4)
      : 0;

  const advantage =
    0.4 * entropyProxy +
    0.3 * balance +
    0.3 * (stats.length > 0 ? 1 : 0);

  return {
    stats,
    density,
    balance,
    entropyProxy,
    handlerLoad: load,
    advantage
  };
}

function computeRouterIntegrity({ bits, cosmos, handlerIndex, handlersCount }) {
  const hasBits = Array.isArray(bits) && bits.length > 0 ? 1 : 0;
  const hasCosmos =
    cosmos && cosmos.universeId && cosmos.timelineId && cosmos.branchId ? 1 : 0;
  const hasHandlerInfo = handlersCount > 0 ? 1 : 0;

  const base =
    0.35 * hasBits +
    0.35 * hasCosmos +
    0.30 * hasHandlerInfo;

  const score = Math.max(0, Math.min(1, base));

  const status =
    score >= 0.97 ? "immortal" :
    score >= 0.90 ? "excellent" :
    score >= 0.75 ? "good" :
    score >= 0.60 ? "fair" :
    score >= 0.40 ? "degraded" :
                    "critical";

  const degraded = status === "degraded" || status === "critical";

  return { score, status, degraded };
}

function computeRouterIntelligence({ bits, handlerIndex, handlersCount, cosmos }) {
  const stats = computeBitsStats(bits);
  const handlerLoad = handlersCount > 0 ? handlerIndex / handlersCount : 0;

  const entropyProxy = Math.min(
    1,
    (stats.onesRatio > 0 && stats.zerosRatio > 0)
      ? (stats.onesRatio * stats.zerosRatio * 4)
      : 0
  );

  const readinessScore = Math.max(
    0,
    Math.min(
      0.5 * entropyProxy +
      0.3 * (stats.length > 0 ? 1 : 0) +
      0.2 * (1 - Math.abs(0.5 - stats.onesRatio) * 2),
      1
    )
  );

  const routeShape = {
    universeId: cosmos.universeId,
    timelineId: cosmos.timelineId,
    branchId: cosmos.branchId,
    handlerIndex,
    handlersCount,
    bitsLength: stats.length
  };

  const routeDualHash = computeDualHash(JSON.stringify(routeShape));

  return {
    stats,
    entropyProxy,
    readinessScore,
    handlerIndex,
    handlersCount,
    handlerLoad,
    routeDualHash
  };
}

function buildRouteEnvelope({
  op,
  ok,
  fallback,
  reason,
  bits,
  handlerIndex,
  handlersCount,
  cosmos,
  cosmosSignature
}) {
  const intel = computeRouterIntelligence({
    bits,
    handlerIndex,
    handlersCount,
    cosmos
  });

  const advantage = computeRouterAdvantage({
    bits,
    handlerIndex,
    handlersCount
  });

  const integrity = computeRouterIntegrity({
    bits,
    cosmos,
    handlerIndex,
    handlersCount
  });

  const base = {
    schemaVersion: BINARY_ROUTER_SCHEMA_VERSION,
    version: PulseBinaryRouterRole.version,
    op,
    ok,
    fallback: !!fallback,
    reason: reason || null,
    cosmos,
    cosmosSignature,
    handlerIndex,
    handlersCount,
    bitsLength: intel.stats.length,
    timestamp: Date.now()
  };

  const signatureShape = {
    base,
    advantage,
    integrity,
    intel
  };

  const signature = computeDualHash(JSON.stringify(signatureShape));

  return {
    ...base,
    bits,
    signature,
    advantage,
    integrity,
    routerIntelligence: intel
  };
}

// ============================================================================
// FACTORY — Binary Router (v24-Immortal-Cosmos-INTEL-Evo+++)
// ============================================================================
export function createBinaryRouter({
  handlers = [],
  fallbackProxy,
  fallbackMesh,
  fallbackNode,
  trace = false,
  cosmosContext = {},
  bandContext = null,
  sessionId = null
} = {}) {

  // ------------------------------------------------------------
  // COSMOS CONTEXT (universe / timeline / branch)
  // ------------------------------------------------------------
  const cosmos = {
    universeId: cosmosContext.universeId || "u:default",
    timelineId: cosmosContext.timelineId || "t:main",
    branchId: cosmosContext.branchId || "b:root",
    band: bandContext || cosmosContext.band || null,
    sessionId: sessionId || cosmosContext.sessionId || null
  };

  const cosmosSignature = computeDualHash(JSON.stringify(cosmos));

  // ------------------------------------------------------------
  // SAFETY: PURE BINARY ONLY
  // ------------------------------------------------------------
  function isPureBinary(bits) {
    if (!Array.isArray(bits)) return false;
    for (let i = 0; i < bits.length; i++) {
      if (bits[i] !== 0 && bits[i] !== 1) return false;
    }
    return true;
  }

  function ensurePureBinaryOrFallback(op, bits, reason) {
    if (!isPureBinary(bits)) {
      return fallback(op, bits, reason);
    }
    return bits;
  }

  // ------------------------------------------------------------
  // COSMIC SIGNATURE — deterministic, dualhash
  // ------------------------------------------------------------
  function computeSignature(bits) {
    const stats = computeBitsStats(bits);
    const base = {
      bitsLength: stats.length,
      ones: stats.ones,
      zeros: stats.zeros,
      cosmos
    };
    return computeDualHash(JSON.stringify(base));
  }

  // ------------------------------------------------------------
  // REGISTER HANDLER (binary → binary)
  // ------------------------------------------------------------
  function register(handler) {
    handlers.push(handler);
  }

  // ------------------------------------------------------------
  // FALLBACK — deterministic, tiered, multiverse-aware
  // ------------------------------------------------------------
  function fallback(op, bits, reason) {
    if (trace && typeof console !== "undefined") {
      console.warn(
        `[BinaryRouter-v24-IMMORTAL-COSMOS] FALLBACK (${op}):`,
        reason,
        bits
      );
    }

    let result = null;

    if (fallbackProxy?.exchange) {
      result = fallbackProxy.exchange(bits, reason, cosmos);
    } else if (fallbackMesh?.exchange) {
      result = fallbackMesh.exchange(bits, reason, cosmos);
    } else if (fallbackNode?.exchange) {
      result = fallbackNode.exchange(bits, reason, cosmos);
    } else {
      throw new Error(
        `BinaryRouter-v24 fallback triggered (${reason}) with no handlers`
      );
    }

    const outBits = Array.isArray(result) ? result : [];
    const signature = computeSignature(outBits);

    const envelope = buildRouteEnvelope({
      op: op || "route",
      ok: false,
      fallback: true,
      reason,
      bits: outBits,
      handlerIndex: -1,
      handlersCount: handlers.length,
      cosmos,
      cosmosSignature
    });

    return {
      ok: false,
      fallback: true,
      reason,
      cosmos,
      cosmosSignature,
      bits: outBits,
      signature,
      length: outBits.length,
      routerIntelligence: envelope.routerIntelligence,
      advantage: envelope.advantage,
      integrity: envelope.integrity,
      envelope
    };
  }

  // ------------------------------------------------------------
  // ROUTE — pure binary → pure binary
  // ------------------------------------------------------------
  function route(bits) {
    const pure = ensurePureBinaryOrFallback("route", bits, "non-binary-input");
    if (!Array.isArray(pure)) {
      // already handled by fallback
      return pure;
    }

    if (handlers.length === 0) {
      return fallback("route", pure, "no-handlers");
    }

    try {
      // Deterministic handler selection:
      // sum(bits) mod handlerCount
      const sum = pure.reduce((a, b) => a + b, 0);
      const index = sum % handlers.length;

      const handler = handlers[index];
      const out = handler(pure);

      const pureOut = ensurePureBinaryOrFallback(
        "route",
        out,
        "non-binary-output"
      );
      if (!Array.isArray(pureOut)) {
        // fallback already returned envelope
        return pureOut;
      }

      const signature = computeSignature(pureOut);

      const envelope = buildRouteEnvelope({
        op: "route",
        ok: true,
        fallback: false,
        reason: null,
        bits: pureOut,
        handlerIndex: index,
        handlersCount: handlers.length,
        cosmos,
        cosmosSignature
      });

      if (trace && typeof console !== "undefined") {
        console.log(
          "[BinaryRouter-v24-IMMORTAL-COSMOS] ROUTE:",
          pure,
          "→",
          pureOut,
          "sig:",
          signature,
          "cosmos:",
          cosmos,
          "intel:",
          envelope.routerIntelligence,
          "advantage:",
          envelope.advantage,
          "integrity:",
          envelope.integrity
        );
      }

      return {
        ok: true,
        cosmos,
        cosmosSignature,
        bits: pureOut,
        signature,
        handlerIndex: index,
        length: pureOut.length,
        routerIntelligence: envelope.routerIntelligence,
        advantage: envelope.advantage,
        integrity: envelope.integrity,
        envelope
      };

    } catch (err) {
      return fallback("route", pure, "handler-exception");
    }
  }

  // ------------------------------------------------------------
  // PUBLIC API
  // ------------------------------------------------------------
  return {
    role: PulseBinaryRouterRole,
    register,
    route,
    fallback,
    cosmos,
    cosmosSignature
  };
}
