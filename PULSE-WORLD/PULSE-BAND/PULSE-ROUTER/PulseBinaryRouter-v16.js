/**
 * BinaryRouter-CosmosMultiverse-v16-Immortal-DualHash-INTEL.js
 * PULSE-WORLD / BINARY-ROUTER / MULTIVERSE COSMOS
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
 */
// ============================================================================
//  PulseRouter-Barrel.js — v16‑IMMORTAL‑DUALHASH‑INTEL
//  Unified Router Organ Import Surface (Binary + Evolutionary + Mesh + Earn)
//  PURE IMPORT LAYER — NO LOGIC, NO STATE, NO EXECUTION
// ============================================================================
/*
AI_EXPERIENCE_META = {
  identity: "PulseBinaryRouter",
  version: "v16-Immortal-DualHash-INTEL",
  layer: "frontend",
  role: "binary_router",
  lineage: "PulseOS-v16",

  evo: {
    binaryCore: true,
    immortalBand: true,
    dualBand: true,
    chunkAligned: true,
    presenceAware: true,
    safeRouteFree: true,
    deterministic: true,
    advantageV2: true,
    dualHashReady: true,
    routerIntelligenceReady: true,
    multiverseAware: true
  },

  contract: {
    always: [
      "PulseBinaryPulse",
      "PulseBinaryTech-v16-Immortal-DualHash-INTEL",
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
function computeHash(str) {
  let h = 0;
  const s = String(str);
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 131072;
  }
  return `br16-h${h.toString(16)}`;
}

function computeAltHash(str) {
  let h = 1;
  const s = String(str);
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i) * (i + 7)) % 1048573;
  }
  return `br16-a${h.toString(16)}`;
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


// ============================================================================
// FACTORY — Binary Router (v16-Immortal-DualHash-INTEL)
// ============================================================================
export function createBinaryRouter({
  handlers = [],
  fallbackProxy,
  fallbackMesh,
  fallbackNode,
  trace = false,
  cosmosContext = {}
} = {}) {

  // ------------------------------------------------------------
  // COSMOS CONTEXT (universe / timeline / branch)
  // ------------------------------------------------------------
  const cosmos = {
    universeId: cosmosContext.universeId || "u:default",
    timelineId: cosmosContext.timelineId || "t:main",
    branchId: cosmosContext.branchId || "b:root"
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
      console.warn(`[BinaryRouter-v16-IMMORTAL] FALLBACK (${op}):`, reason, bits);
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
        `BinaryRouter-v16 fallback triggered (${reason}) with no handlers`
      );
    }

    const outBits = Array.isArray(result) ? result : [];
    const signature = computeSignature(outBits);
    const routerIntel = computeRouterIntelligence({
      bits: outBits,
      handlerIndex: -1,
      handlersCount: handlers.length,
      cosmos
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
      routerIntelligence: routerIntel
    };
  }

  // ------------------------------------------------------------
  // ROUTE — pure binary → pure binary
  // ------------------------------------------------------------
  function route(bits) {
    const pure = ensurePureBinaryOrFallback("route", bits, "non-binary-input");

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

      const signature = computeSignature(pureOut);
      const routerIntel = computeRouterIntelligence({
        bits: pureOut,
        handlerIndex: index,
        handlersCount: handlers.length,
        cosmos
      });

      if (trace && typeof console !== "undefined") {
        console.log(
          "[BinaryRouter-v16-IMMORTAL] ROUTE:",
          pure,
          "→",
          pureOut,
          "sig:",
          signature,
          "cosmos:",
          cosmos,
          "intel:",
          routerIntel
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
        routerIntelligence: routerIntel
      };

    } catch (err) {
      return fallback("route", pure, "handler-exception");
    }
  }

  // ------------------------------------------------------------
  // PUBLIC API
  // ------------------------------------------------------------
  return {
    register,
    route,
    fallback,
    cosmos,
    cosmosSignature
  };
}
