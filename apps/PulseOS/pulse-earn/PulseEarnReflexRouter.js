// ============================================================================
//  PulseEarnReflexRouter-v11-Evo.js
//  Reflex → Earn Synapse (v11-Evo)
//  - No imports
//  - No routing, no sending
//  - Pure deterministic EarnReflex → Earn handoff
//  - Fully aligned with PulseOSGovernor v3.3 (instance slicing safe)
//  - Designed to run ONLY when explicitly called
//  - v11: Diagnostics + Signatures + Pattern Surface
// ============================================================================


// ============================================================================
//  INTERNAL STATE — deterministic, drift-proof
// ============================================================================
const routedReflexes = new Map(); // reflexId -> state
let reflexRouteCycle = 0;         // deterministic cycle counter


// ============================================================================
//  INTERNAL HELPERS — deterministic, tiny, pure
// ============================================================================
function computeHash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h + str.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `h${h}`;
}

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

function buildReflexDiagnostics(earnReflex, reflexId, state) {
  const pattern = earnReflex?.pattern || "NO_PATTERN";
  const lineageDepth = Array.isArray(earnReflex?.lineage)
    ? earnReflex.lineage.length
    : 0;

  const sourcePulseId = earnReflex?.meta?.sourcePulseId || "NO_SOURCE_PULSE";
  const sourceOrgan   = earnReflex?.meta?.sourceOrgan   || "NO_SOURCE_ORGAN";
  const sourceReason  = earnReflex?.meta?.sourceReason  || "NO_SOURCE_REASON";

  return {
    reflexId,
    pattern,
    lineageDepth,
    sourcePulseId,
    sourceOrgan,
    sourceReason,
    cycleIndex: reflexRouteCycle,

    patternHash: computeHash(pattern),
    lineageHash: computeHash(String(lineageDepth)),
    sourceHash: computeHash(sourcePulseId + "::" + sourceOrgan),
    reflexHash: computeHash(reflexId),
    cycleHash: computeHash(String(reflexRouteCycle))
  };
}


// ============================================================================
//  PUBLIC API — PulseEarnReflexRouter v11-Evo
// ============================================================================
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

    const diagnostics = buildReflexDiagnostics(earnReflex, reflexId, state);

    // v11 reflexRouteSignature
    const reflexRouteSignature = computeHash(
      diagnostics.pattern +
      "::" +
      diagnostics.reflexId +
      "::" +
      diagnostics.cycleIndex
    );

    // If EarnSystem is missing or not ready, fail-open (immune-safe)
    if (!EarnSystem || typeof EarnSystem.handle !== "function") {
      return {
        ok: false,
        reason: "earn_system_unavailable",
        reflexId,
        state,
        diagnostics,
        reflexRouteSignature
      };
    }

    // -----------------------------------------------------------------------
    //  SAFE HANDOFF (v11-Evo):
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
        cycleIndex: reflexRouteCycle,
        diagnostics,
        reflexRouteSignature
      });

      return {
        ok: true,
        routed: true,
        reflexId,
        state,
        diagnostics,
        reflexRouteSignature,
        result
      };
    } catch (error) {
      return {
        ok: false,
        routed: false,
        reflexId,
        state,
        diagnostics,
        reflexRouteSignature,
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
