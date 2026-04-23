// ============================================================================
// FILE: /apps/pulse-sdn/PulseSDN.js
// PULSE SDN — v10.4
// “SOFTWARE‑DEFINED NERVOUS SYSTEM”
// ============================================================================
//
// ROLE (v10.4):
// -------------
// • Unified nervous system for the entire organism.
// • Receives impulses from UI, GPU, Mesh, Earn, OS organs.
// • Routes impulses to Router, Cortex, Brain, and Organs.
// • Emits nervous‑system events onto the EventBus.
// • Tracks nervous‑system health for Evolution / BrainIntel.
// • Pure frontend wiring — no backend, no fetch, no filesystem.
//
// SAFETY CONTRACT (v10.4):
// ------------------------
// • No dynamic eval / Function / import.meta.glob.
// • No direct backend calls (backend is reached via Router/route only).
// • Deterministic routing behavior (no random branching).
// • No mutation of external modules (Brain, Router, EventBus).
// • SDN is wiring only — no cognition, no business logic.
// ============================================================================

export const PulseRole = {
  type: "NervousSystem",
  subsystem: "OS",
  layer: "SDN",
  version: "10.4",
  identity: "PulseSDN",

  evo: {
    deterministicNeuron: true,
    driftProof: true,
    multiInstanceReady: true,
    unifiedAdvantageField: true,
    advantageCascadeAware: true,
    pulseEfficiencyAware: true,
    loopTheoryAware: true,
    continuanceAware: true,

    routingContract: "PulseRouter-v10.4",
    osOrganContract: "PulseOS-v10.4",
    earnCompatibility: "PulseEarn-v10.4",
    gpuCompatibility: "PulseGPU-v10.4",
    sendCompatibility: "PulseSendSystem-v10.4"
  }
};


// ============================================================================
// FACTORY — All dependencies are injected by CNS Brain / Cortex
// ============================================================================
export function createPulseSDN({
  Router,        // expected to expose: route(type, payload)
  EventBus,      // expected to expose: emit(event, payload)
  Brain,         // PulseOSBrain (for logging + context)
  Evolution,     // optional: Evolution organ for lineage + drift
  log = console.log,
  warn = console.warn
}) {

  // --------------------------------------------------------------------------
  // INTERNAL STATE
  // --------------------------------------------------------------------------
  const SDNState = {
    receptors: {},          // { source: Set<handler> }
    impulseCount: 0,
    lastImpulseTs: null,
    healthScore: 1.0
  };


  // --------------------------------------------------------------------------
  // RECEPTOR REGISTRATION — sources that can emit impulses into SDN
  // --------------------------------------------------------------------------
  function registerReceptor(source, handler) {
    if (!source || typeof handler !== "function") return;

    if (!SDNState.receptors[source]) {
      SDNState.receptors[source] = new Set();
    }

    SDNState.receptors[source].add(handler);

    Evolution?.recordLineage?.(`sdn-register-receptor:${source}`);
    log("[PulseSDN] Receptor registered:", source);
  }


  function unregisterReceptor(source, handler) {
    const set = SDNState.receptors[source];
    if (!set) return;

    set.delete(handler);
    if (set.size === 0) {
      delete SDNState.receptors[source];
    }

    Evolution?.recordLineage?.(`sdn-unregister-receptor:${source}`);
    log("[PulseSDN] Receptor unregistered:", source);
  }


  // --------------------------------------------------------------------------
  // IMPULSE EMISSION — entrypoint from UI / GPU / Mesh / Earn / OS
  // --------------------------------------------------------------------------
  function emitImpulse(source, impulse) {
    SDNState.impulseCount += 1;
    SDNState.lastImpulseTs = Date.now();

    EventBus?.emit?.("sdn:impulse", { source, impulse, ts: SDNState.lastImpulseTs });

    const set = SDNState.receptors[source];
    if (set && set.size > 0) {
      for (const handler of set) {
        try {
          handler(impulse);
        } catch (err) {
          warn("[PulseSDN] Receptor handler error:", source, err);
        }
      }
    }

    Evolution?.recordLineage?.("sdn-impulse");
  }


  // --------------------------------------------------------------------------
  // ROUTING HELPERS — SDN → Router → Organs / Backend
  // --------------------------------------------------------------------------
  async function routeToOrgan(routeType, payload = {}) {
    Evolution?.recordLineage?.("sdn-route-organ");

    if (!Router?.route) {
      warn("[PulseSDN] Router missing route() — cannot route to organ.");
      return { error: "routerMissing", details: "Router.route not available" };
    }

    const res = await Router.route(routeType, {
      ...payload,
      sdnContext: {
        impulseCount: SDNState.impulseCount,
        lastImpulseTs: SDNState.lastImpulseTs
      }
    });

    EventBus?.emit?.("sdn:route:organ", { routeType, payload, res });
    return res;
  }


  async function routeToBackend(endpointType, payload = {}) {
    // SDN never calls backend directly — it always goes through Router.
    Evolution?.recordLineage?.("sdn-route-backend");

    if (!Router?.route) {
      warn("[PulseSDN] Router missing route() — cannot route to backend.");
      return { error: "routerMissing", details: "Router.route not available" };
    }

    const res = await Router.route(endpointType, {
      ...payload,
      sdnContext: {
        impulseCount: SDNState.impulseCount,
        lastImpulseTs: SDNState.lastImpulseTs
      }
    });

    EventBus?.emit?.("sdn:route:backend", { endpointType, payload, res });
    return res;
  }


  // --------------------------------------------------------------------------
  // HEALTH ENGINE — SDN health reporting for Evolution / BrainIntel
  // --------------------------------------------------------------------------
  function updateHealth(score) {
    SDNState.healthScore = score;
    EventBus?.emit?.("sdn:health:update", { score, ts: Date.now() });
    Evolution?.updateOrganHealth?.("PulseSDN", score);
  }


  function getHealth() {
    return SDNState.healthScore;
  }


  // --------------------------------------------------------------------------
  // PUBLIC SDN SURFACE
  // --------------------------------------------------------------------------
  const PulseSDN = {
    PulseRole,
    SDNState,

    // Receptors
    registerReceptor,
    unregisterReceptor,

    // Impulses
    emitImpulse,

    // Routing
    routeToOrgan,
    routeToBackend,

    // Health
    updateHealth,
    getHealth
  };

  Brain?.log?.("[PulseSDN v10.4] Initialized nervous system.");
  Evolution?.recordLineage?.("sdn-init");

  return PulseSDN;
}
