/*
===============================================================================
FILE: /PULSE-UI/PulseEvolutionaryRouter.js
LAYER: UI PAGE ROUTER ORGAN
===============================================================================
===============================================================================
AI_EXPERIENCE_META = {
  identity: "PulseUI.EvolutionaryRouter",
  version: "v15-IMMORTAL",
  layer: "pulse_ui",
  role: "ui_page_router",
  lineage: "PulseEvolutionaryRouter-v11.3-Evo-Prime → v14-IMMORTAL → v15-IMMORTAL",

  evo: {
    uiRouting: true,
    deterministic: true,
    driftProof: true,
    dualBand: true,
    binaryAware: true,
    symbolicAware: true,
    routeAware: true,
    lineageAware: true,
    cnsAware: true,
    memoryAware: true,
    unifiedAdvantageField: true,
    signatureAware: true,
    tierAware: true,
    channelAware: true,
    futureEvolutionReady: true,

    zeroNetwork: true,
    zeroFilesystem: true,
    zeroMutationOfInput: true,

    // v15 upgrades
    schemaVersioned: true,
    envelopeAware: true,
    historyAware: true,
    integrityAware: true
  },

  contract: {
    always: [
      "PulseUI.EvolutionaryCode",
      "PulseUI.EvolutionaryBrain",
      "PulseUI.EvolutionaryImpulse",
      "PulseCore.Memory",
      "PulseCore.CNS",
      "PulseDesign.Manifest"
    ],
    never: [
      "eval",
      "Function",
      "dynamicImport",
      "fetchViaCNS",
      "safeRoute"
    ]
  }
}
===============================================================================
EXPORT_META = {
  organ: "PulseUI.EvolutionaryRouter",
  layer: "pulse_ui",
  stability: "IMMORTAL",
  deterministic: true,
  pure: true,

  consumes: [
    "RouteName",
    "SymbolicPayload",
    "BinaryPayload",
    "RouteContext",
    "CNS",
    "Evolution",
    "MemoryOrgan"
  ],

  produces: [
    "RouteTransition",
    "TransitionSignature",
    "TransitionTier",
    "TransitionChannel"
  ],

  sideEffects: "cns_emit_only",
  network: "none",
  filesystem: "none"
}

*/

export const RouterRole = {
  type: "Organ",
  subsystem: "UI",
  layer: "PageRouter",
  version: "15.0-IMMORTAL",
  identity: "PulseEvolutionaryRouter",

  evo: {
    driftProof: true,
    deterministic: true,
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
    futureEvolutionReady: true
  }
};

const ROUTER_SCHEMA_VERSION = "v2";

// ============================================================================
// INTERNAL: deterministic signature generator
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
// INTERNAL: transition tiers
// ============================================================================
const TransitionTiers = Object.freeze({
  normal: "normal",
  important: "important",
  critical: "critical",
  immortal: "immortal"
});

// ============================================================================
// INTERNAL: transition channels
// ============================================================================
const TransitionChannels = Object.freeze({
  ui: "ui",
  system: "system",
  evolution: "evolution",
  memory: "memory",
  earn: "earn"
});

// ============================================================================
// FACTORY — creates the router organ
// ============================================================================
export function createPulseEvolutionaryRouter({
  CNS,
  Evolution,
  CodeOrgan,
  BrainOrgan,
  ImpulseOrgan,
  MemoryOrgan,
  log = console.log,
  warn = console.warn
} = {}) {

  const RouterState = {
    currentRoute: "init",
    lastTransition: null,
    lastSignature: null,
    lastTier: null,
    lastChannel: null,
    routeHistory: [],
    eventSeq: 0
  };

  function nextSeq() {
    RouterState.eventSeq += 1;
    return RouterState.eventSeq;
  }

  function safeLog(stage, details = {}) {
    try {
      log(
        "[PulseEvolutionaryRouter]",
        stage,
        JSON.stringify({
          schemaVersion: ROUTER_SCHEMA_VERSION,
          seq: RouterState.eventSeq,
          currentRoute: RouterState.currentRoute,
          ...details
        })
      );
    } catch {}
  }

  // --------------------------------------------------------------------------
  // ROUTING TABLE — deterministic, lineage-aware
  // --------------------------------------------------------------------------
  const ROUTES = {
    init: {
      next: ["home", "debug", "evo"],
      handler: () => BrainOrgan.freshEvolve({ type: "page:init" })
    },

    home: {
      next: ["debug", "evo"],
      handler: () => CodeOrgan.evolve({ type: "page:home" })
    },

    debug: {
      next: ["home", "evo"],
      handler: () => CodeOrgan.evolve({ type: "page:debug" })
    },

    evo: {
      next: ["home", "debug"],
      handler: () => CodeOrgan.evolve({ type: "page:evo" })
    }
  };

  // --------------------------------------------------------------------------
  // VALIDATE ROUTE
  // --------------------------------------------------------------------------
  function isValidRoute(route) {
    return typeof route === "string" && Object.prototype.hasOwnProperty.call(ROUTES, route);
  }

  // --------------------------------------------------------------------------
  // BUILD TRANSITION ENVELOPE — deterministic, binary-native
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

    const envelope = {
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
      timestamp: "NO_TIMESTAMP_v15"
    };

    envelope.signature = deterministicSignature(envelope);
    return envelope;
  }

  // --------------------------------------------------------------------------
  // TRANSITION — deterministic, CNS-aware, memory-aware
  // --------------------------------------------------------------------------
  async function transition(
    toRoute,
    {
      payload,
      binaryPayload,
      context,
      tier = TransitionTiers.normal,
      channel = TransitionChannels.ui
    } = {}
  ) {
    nextSeq();

    if (!isValidRoute(toRoute)) {
      const err = "InvalidRoute";
      warn("[PulseEvolutionaryRouter] INVALID_ROUTE", toRoute);
      safeLog("INVALID_ROUTE", { toRoute, error: err });
      return { ok: false, error: err };
    }

    const fromRoute = RouterState.currentRoute;
    const allowed = ROUTES[fromRoute]?.next || [];

    if (!allowed.includes(toRoute)) {
      const err = "RouteNotAllowed";
      warn("[PulseEvolutionaryRouter] ROUTE_NOT_ALLOWED", { fromRoute, toRoute });
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
    RouterState.routeHistory.push({ from: fromRoute, to: toRoute });

    safeLog("TRANSITION", { fromRoute, toRoute, signature: envelope.signature });

    // Emit impulse to CNS
    try {
      ImpulseOrgan?.emit({
        source: "PulseEvolutionaryRouter",
        payload: { fromRoute, toRoute },
        binaryPayload: null,
        context,
        tier,
        channel
      });
    } catch (err) {
      warn("[PulseEvolutionaryRouter] IMPULSE_EMIT_ERROR", String(err));
      safeLog("IMPULSE_EMIT_ERROR", { error: String(err) });
    }

    // Persist route to CoreMemory via EvolutionaryMemory
    try {
      MemoryOrgan?.core?.setRouteSnapshot?.("router", {
        schemaVersion: ROUTER_SCHEMA_VERSION,
        currentRoute: toRoute,
        lastTransition: envelope
      });
      safeLog("MEMORY_WRITE_OK", { toRoute });
    } catch (err) {
      warn("[PulseEvolutionaryRouter] MEMORY_WRITE_ERROR", String(err));
      safeLog("MEMORY_WRITE_ERROR", { error: String(err) });
    }

    // Execute route handler
    const handler = ROUTES[toRoute]?.handler;
    if (typeof handler === "function") {
      const res = await handler({ payload, binaryPayload, context });
      return { ok: true, route: toRoute, result: res, signature: envelope.signature };
    }

    return { ok: true, route: toRoute, signature: envelope.signature };
  }

  // --------------------------------------------------------------------------
  // PUBLIC ENTRY — go to a route
  // --------------------------------------------------------------------------
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
    version: RouterRole.version
  });

  return PulseEvolutionaryRouter;
}
