// ============================================================================
// FILE: /PULSEVISION/__COMPONENTS_EVOLUTION/PulseEvolutionaryRouter-v20.js
// PULSE OS — v20-IMMORTAL-EVOLUTIONARY
// ROUTE CORTEX ORGAN — CONTEXT-FUSION, ADVANTAGE-AWARE, CNS-AWARE
// ============================================================================
//
//  THIS IS THE CORRECTED, UNIFIED, NON-DUPLICATED VERSION
//  (Your pasted file contained two full routers merged together)
//
// ============================================================================
//
// AI_EXPERIENCE_META:
//   identity: "PulseUI.EvolutionaryRouter"
//   version: "v20-Immortal-Evolutionary"
//   layer: "pulse_ui"
//   role: "ui_page_router"
//   lineage: "v11.3 → v14 → v16 → v20-Immortal-Evolutionary"
//
//   evo: {
//     uiRouting: true,
//     deterministic: true,
//     driftProof: true,
//     dualBand: true,
//     binaryAware: true,
//     symbolicAware: true,
//     routeAware: true,
//     lineageAware: true,
//     cnsAware: true,
//     memoryAware: true,
//     unifiedAdvantageField: true,
//     signatureAware: true,
//     tierAware: true,
//     channelAware: true,
//     futureEvolutionReady: true,
//
//     zeroNetwork: true,
//     zeroFilesystem: true,
//     zeroMutationOfInput: true,
//
//     schemaVersioned: true,
//     envelopeAware: true,
//     historyAware: true,
//     integrityAware: true,
//     degradationAware: true,
//     experienceBlocksAware: true
//   }
//
// CONTRACT:
//   consumes:
//     • RouteName
//     • SymbolicPayload
//     • BinaryPayload
//     • RouteContext
//     • CNS
//     • Evolution
//     • MemoryOrgan
//     • ImpulseOrgan
//     • IQMap
//
//   produces:
//     • RouteTransitionEnvelope
//     • transitionId
//     • signature
//     • tier
//     • channel
//     • advantage
//
// ============================================================================

export const RouterRole = Object.freeze({
  layer: "PulseEvolutionaryRouter",
  version: "v20-Immortal-Evolutionary",
  role: "UI_PAGE_ROUTER",
  identity: "PulseUI.EvolutionaryRouter",

  lineage: Object.freeze({
    root: "PulseEvolutionaryRouter-v11.3",
    parent: "PulseEvolutionaryRouter-v16",
    ancestry: [
      "PulseEvolutionaryRouter-v11.3-Evo-Prime",
      "PulseEvolutionaryRouter-v14-Immortal",
      "PulseEvolutionaryRouter-v15-Immortal",
      "PulseEvolutionaryRouter-v16-Immortal",
      "PulseEvolutionaryRouter-v20-Immortal-Evolutionary"
    ]
  }),

  guarantees: Object.freeze({
    deterministic: true,
    driftProof: true,
    dualBand: true,
    binaryAware: true,
    symbolicAware: true,
    uiRouting: true,
    cnsAware: true,
    routeAware: true,
    unifiedAdvantageField: true,
    signatureAware: true,
    tierAware: true,
    channelAware: true,
    envelopeAware: true,
    historyAware: true,
    integrityAware: true,
    degradationAware: true,
    experienceBlocksAware: true,
    futureEvolutionReady: true,

    zeroNetwork: true,
    zeroFilesystem: true,
    zeroMutationOfInput: true,
    zeroDynamicImports: true,
    zeroEval: true,
    zeroRandomness: true
  }),

  contract: Object.freeze({
    consumes: [
      "RouteName",
      "SymbolicPayload",
      "BinaryPayload",
      "RouteContext",
      "CNS",
      "Evolution",
      "MemoryOrgan",
      "ImpulseOrgan",
      "IQMap"
    ],
    produces: [
      "RouteTransitionEnvelope",
      "TransitionSignature",
      "TransitionTier",
      "TransitionChannel",
      "TransitionExperience"
    ]
  }),

  bands: Object.freeze({
    supported: ["symbolic", "binary"],
    default: "symbolic",
    behavior: "route-cortex"
  }),

  architecture: Object.freeze({
    pattern: "A-B-A",
    baseline: "route → fuse → envelope",
    adaptive:
      "context fusion + lineage + memory tier + IQMap + advantage + integrity",
    return:
      "deterministic transition envelope + CNS impulse"
  })
});

// ============================================================================
// CONSTANTS
// ============================================================================
export let ROUTER_MODE = "deep"; 
const ROUTER_SCHEMA_VERSION = "v5";

const TransitionTiers = Object.freeze({
  normal: "normal",
  important: "important",
  critical: "critical",
  immortal: "immortal"
});

const TransitionChannels = Object.freeze({
  ui: "ui",
  system: "system",
  evolution: "evolution",
  memory: "memory",
  router: "router",
  earn: "earn"
});

// ============================================================================
// DETERMINISTIC SIGNATURE
// ============================================================================
function deterministicSignature(obj) {
  const json = JSON.stringify(obj || {});
  let hash = 0;
  for (let i = 0; i < json.length; i++) {
    hash = (hash * 31 + json.charCodeAt(i)) >>> 0;
  }
  return "ROUTE_SIG_" + hash.toString(16).padStart(8, "0");
}

// ============================================================================
// ADVANTAGE + INTEGRITY + EXPERIENCE
// ============================================================================
function computeTransitionAdvantage({ payload, binaryPayload }) {
  const payloadJson = JSON.stringify(payload || {});
  const payloadSize = payloadJson.length;

  const binary = binaryPayload;
  const binarySize = Array.isArray(binary) ? binary.length : 0;

  const total = payloadSize + binarySize || 1;
  const symbolicWeight = payloadSize / total;
  const binaryWeight = binarySize / total;

  const density = binaryWeight;
  const entropyHint = 1 - Math.abs(0.5 - density) * 2;

  const advantage = 0.4 * symbolicWeight + 0.6 * binaryWeight;

  return {
    payloadSize,
    binarySize,
    totalSize: total,
    symbolicWeight,
    binaryWeight,
    density,
    entropyHint,
    advantage
  };
}

function computeTransitionIntegrity({ fromRoute, toRoute, advantage }) {
  const base =
    (fromRoute ? 0.25 : 0) +
    (toRoute ? 0.25 : 0) +
    0.25 * (advantage.entropyHint ?? 0.5) +
    0.25 * (advantage.advantage ?? 0.5);

  const score = Math.max(0, Math.min(1, base));

  const status =
    score >= 0.95 ? "immortal" :
    score >= 0.85 ? "excellent" :
    score >= 0.70 ? "good" :
    score >= 0.55 ? "fair" :
    score >= 0.40 ? "degraded" :
                    "critical";

  const degraded = status === "degraded" || status === "critical";

  return { score, status, degraded };
}

function buildExperienceBlocks({
  fromRoute,
  toRoute,
  tier,
  channel,
  advantage,
  integrity
}) {
  return {
    schemaVersion: ROUTER_SCHEMA_VERSION,
    blocks: [
      {
        id: "router.transition",
        kind: "transition",
        fromRoute,
        toRoute,
        tier,
        channel
      },
      {
        id: "router.advantage",
        kind: "advantage",
        payloadSize: advantage.payloadSize,
        binarySize: advantage.binarySize,
        totalSize: advantage.totalSize,
        symbolicWeight: advantage.symbolicWeight,
        binaryWeight: advantage.binaryWeight,
        density: advantage.density,
        entropyHint: advantage.entropyHint,
        advantage: advantage.advantage
      },
      {
        id: "router.integrity",
        kind: "integrity",
        score: integrity.score,
        status: integrity.status,
        degraded: integrity.degraded
      }
    ]
  };
}

function buildEnvelopeId({ fromRoute, toRoute, signature }) {
  const base = `${fromRoute}:${toRoute}:${signature}`;
  let h = 0;
  for (let i = 0; i < base.length; i++) {
    h = (h * 31 + base.charCodeAt(i)) >>> 0;
  }
  return `ROUTE-${ROUTER_SCHEMA_VERSION}-${h.toString(16).padStart(8, "0")}`;
}

// ============================================================================
// FACTORY — FINAL, CORRECTED, UNIFIED
// ============================================================================
export function createPulseEvolutionaryRouter({
  CNS,
  Evolution,
  MemoryOrgan,
  ImpulseOrgan,
  IQMap,
  log = console.log,
  warn = console.warn
} = {}) {

  const RouterState = {
    currentRoute: "init",
    lastTransition: null,
    lastSignature: null,
    lastTier: null,
    lastChannel: null,
    lastExperience: null,
    routeHistory: [],
    seq: 0
  };

  function nextSeq() {
    RouterState.seq += 1;
    return RouterState.seq;
  }

  function safeLog(stage, details = {}) {
    try {
      log("[PulseEvolutionaryRouter-v20]", stage, JSON.stringify(details));
    } catch {}
  }

  // --------------------------------------------------------------------------
  // ROUTING TABLE
  // --------------------------------------------------------------------------
  const ROUTES = {
    init: {
      next: ["home", "debug", "evo"],
      handler: () => Evolution?.freshEvolve?.({ type: "page:init" })
    },

    home: {
      next: ["debug", "evo"],
      handler: () => Evolution?.freshEvolve?.({ type: "page:home" })
    },

    debug: {
      next: ["home", "evo"],
      handler: () => Evolution?.freshEvolve?.({ type: "page:debug" })
    },

    evo: {
      next: ["home", "debug"],
      handler: () => Evolution?.freshEvolve?.({ type: "page:evo" })
    }
  };

  function isValidRoute(route) {
    return typeof route === "string" && ROUTES.hasOwnProperty(route);
  }

  // --------------------------------------------------------------------------
  // BUILD TRANSITION ENVELOPE
  // --------------------------------------------------------------------------
  function buildTransitionEnvelope({
    fromRoute,
    toRoute,
    payload,
    binaryPayload,
    context,
    tier = TransitionTiers.normal,
    channel = TransitionChannels.ui
  }) {
    const lineage = Evolution?.getPageLineage?.() || {};
    const advantage = computeTransitionAdvantage({ payload, binaryPayload });
    const integrity = computeTransitionIntegrity({ fromRoute, toRoute, advantage });

    const baseEnvelope = {
      schemaVersion: ROUTER_SCHEMA_VERSION,
      fromRoute,
      toRoute,
      lineage,
      tier,
      channel,
      payload: payload || {},
      binary: binaryPayload || null,
      context: context || {},
      version: RouterRole.version,
      timestamp: "NO_TIMESTAMP_v20"
    };

    const signature = deterministicSignature(baseEnvelope);
    const id = buildEnvelopeId({ fromRoute, toRoute, signature });
    const experience = buildExperienceBlocks({
      fromRoute,
      toRoute,
      tier,
      channel,
      advantage,
      integrity
    });

    return {
      ...baseEnvelope,
      id,
      signature,
      advantage,
      integrity,
      experience
    };
  }

  // --------------------------------------------------------------------------
  // TRANSITION
  // --------------------------------------------------------------------------
  async function transition(
    toRoute,
    {
      payload = {},
      binaryPayload = null,
      context = {},
      tier = TransitionTiers.normal,
      channel = TransitionChannels.ui
    } = {}
  ) {
    nextSeq();

    if (!isValidRoute(toRoute)) {
      const err = "InvalidRoute";
      warn("[Router] INVALID_ROUTE", toRoute);
      safeLog("INVALID_ROUTE", { toRoute, error: err });
      return { ok: false, error: err };
    }

    const fromRoute = RouterState.currentRoute;
    const allowed = ROUTES[fromRoute]?.next || [];

    if (!allowed.includes(toRoute)) {
      const err = "RouteNotAllowed";
      warn("[Router] ROUTE_NOT_ALLOWED", { fromRoute, toRoute });
      safeLog("ROUTE_NOT_ALLOWED", { fromRoute, toRoute, error: err });
      return { ok: false, error: err };
    }

    const envelope = buildTransitionEnvelope({
      fromRoute,
      toRoute,
      payload,
      binaryPayload,
      context,
      tier,
      channel
    });

    RouterState.currentRoute = toRoute;
    RouterState.lastTransition = envelope;
    RouterState.lastSignature = envelope.signature;
    RouterState.lastTier = tier;
    RouterState.lastChannel = channel;
    RouterState.lastExperience = envelope.experience;
    RouterState.routeHistory.push({ from: fromRoute, to: toRoute });

    safeLog("TRANSITION", {
      fromRoute,
      toRoute,
      signature: envelope.signature,
      integrityStatus: envelope.integrity.status,
      degraded: envelope.integrity.degraded
    });

    // CNS impulse
    try {
      ImpulseOrgan?.emit({
        source: "PulseEvolutionaryRouter",
        payload: {
          fromRoute,
          toRoute,
          integrityStatus: envelope.integrity.status,
          degraded: envelope.integrity.degraded
        },
        context,
        tier,
        channel
      });
    } catch (err) {
      warn("[Router] IMPULSE_EMIT_ERROR", String(err));
      safeLog("IMPULSE_EMIT_ERROR", { error: String(err) });
    }

    // Persist router state
    try {
      MemoryOrgan?.core?.setRouteSnapshot?.("router", {
        schemaVersion: ROUTER_SCHEMA_VERSION,
        version: RouterRole.version,
        currentRoute: toRoute,
        lastTransition: envelope,
        routeHistory: RouterState.routeHistory.slice(-64)
      });
      safeLog("MEMORY_WRITE_OK", { toRoute });
    } catch (err) {
      warn("[Router] MEMORY_WRITE_ERROR", String(err));
      safeLog("MEMORY_WRITE_ERROR", { error: String(err) });
    }

    // Execute route handler
    const handler = ROUTES[toRoute]?.handler;
    if (typeof handler === "function") {
      const res = await handler({ payload, binaryPayload, context });
      return {
        ok: true,
        route: toRoute,
        result: res,
        signature: envelope.signature,
        experience: envelope.experience
      };
    }

    return {
      ok: true,
      route: toRoute,
      signature: envelope.signature,
      experience: envelope.experience
    };
  }

  async function go(route, opts = {}) {
    return transition(route, opts);
  }

  const PulseEvolutionaryRouter = {
    RouterRole,
    RouterState,
    go,
    transition,
    Tiers: TransitionTiers,
    Channels: TransitionChannels
  };

  safeLog("INIT", {
    identity: RouterRole.identity,
    version: RouterRole.version,
    schemaVersion: ROUTER_SCHEMA_VERSION
  });

  return PulseEvolutionaryRouter;
}

// ---------------------------------------------------------------------------
// GLOBAL REGISTRATION
// ---------------------------------------------------------------------------
try {
  if (typeof window !== "undefined") window.PulseEvolutionaryRouter = createPulseEvolutionaryRouter;
  if (typeof globalThis !== "undefined") window.PulseEvolutionaryRouter = createPulseEvolutionaryRouter;
  if (typeof global !== "undefined") window.PulseEvolutionaryRouter = createPulseEvolutionaryRouter;
} catch {}
