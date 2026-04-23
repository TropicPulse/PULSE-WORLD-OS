// ============================================================================
//  PulseEarnReflexRouter.js — Reflex → Earn Synapse (v10.4)
//  - No imports
//  - No routing, no sending
//  - Pure, deterministic EarnReflex → Earn handoff
//  - Fully aligned with PulseOSGovernor v3.2 (instance slicing safe)
//  - Designed to run ONLY when explicitly called
// ============================================================================

// Local registry of routed reflexes (drift-proof, no loops)
const routedReflexes = new Map(); // reflexId -> state

// Deterministic cycle counter (replaces timestamps)
let reflexRouteCycle = 0;

// ---------------------------------------------------------------------------
//  INTERNAL: Build or retrieve reflex routing state (deterministic)
// ---------------------------------------------------------------------------
function getOrCreateReflexRouteState(reflexId) {
  let state = routedReflexes.get(reflexId);

  if (!state) {
    state = {
      reflexId,
      count: 0,
      firstSeenCycle: reflexRouteCycle,
      lastSeenCycle: null
    };
    routedReflexes.set(reflexId, state);
  }

  return state;
}

// ---------------------------------------------------------------------------
//  PUBLIC API — PulseEarnReflexRouter v10.4
// ---------------------------------------------------------------------------
export const PulseEarnReflexRouter = {
  /**
   * route(earnReflex, EarnSystem)
   * - earnReflex: the organism built by PulseEarnReflex
   * - EarnSystem: the frontend Earn engine (PulseEarn)
   */
  route(earnReflex, EarnSystem) {
    reflexRouteCycle++;

    if (!earnReflex || !earnReflex.meta?.reflex) {
      return {
        ok: false,
        reason: "invalid_reflex",
        reflex: earnReflex
      };
    }

    const reflexId =
      earnReflex.meta.reflexId ||
      `${earnReflex.meta.sourcePulseId}::${earnReflex.meta.sourceOrgan}::${earnReflex.meta.sourceReason}`;

    const state = getOrCreateReflexRouteState(reflexId);
    state.count += 1;
    state.lastSeenCycle = reflexRouteCycle;

    // If EarnSystem is missing or not ready, fail-open (immune-safe)
    if (!EarnSystem || typeof EarnSystem.handle !== "function") {
      return {
        ok: false,
        reason: "earn_system_unavailable",
        reflexId,
        state
      };
    }

    // -----------------------------------------------------------------------
    //  SAFE HANDOFF (v10.4):
    //  - No routing
    //  - No sending
    //  - No returnTo
    //  - No lineage mutation
    //  - No async
    //  - Pure EarnSystem.handle() call
    // -----------------------------------------------------------------------
    try {
      const result = EarnSystem.handle(earnReflex, {
        reflex: true,
        reflexId,
        state,
        instanceContext: earnReflex.meta.instanceContext || null,
        cycleIndex: reflexRouteCycle
      });

      return {
        ok: true,
        routed: true,
        reflexId,
        state,
        result
      };
    } catch (error) {
      return {
        ok: false,
        routed: false,
        reflexId,
        state,
        error
      };
    }
  },

  // -------------------------------------------------------------------------
  //  Debug / Dashboard
  // -------------------------------------------------------------------------
  getRoutedState(reflexId) {
    if (reflexId) return routedReflexes.get(reflexId) || null;
    return Array.from(routedReflexes.values());
  }
};
