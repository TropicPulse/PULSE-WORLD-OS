// ============================================================================
// FILE: /apps/lib/Diagnostics/PathwayMemory.js
// LAYER: PATHWAY MEMORY (Living Map + Evolution Archive + Identity Anchor)
// PULSE OS — v7.1
// OFFLINE • SELF-EVOLVING • NO HARDCODED PAGES
// ============================================================================
//
// ROLE (v7.1):
//   • Remembers the discovered nervous pathway (Impulse.path)
//   • Stores layer order (0..N, unbounded)
//   • Stores layer identity + version + stability markers
//   • Stores forward/return efficiency snapshots
//   • Detects organism evolution (growth, pruning, identity shifts)
//   • Updates pathway ONLY when structure changes
//   • Provides stable map to NerveMap + DiagnosticsPanel + SurgeonGeneral
//
// CONTRACT:
//   • Pure memory — NEVER mutates impulses
//   • NEVER computes business logic
//   • NEVER depends on filenames or page names
//   • Stores structure, not state
//   • Safe for organisms that grow new layers over time
//
// SAFETY:
//   • Pathway updated only when identity or structure changes
//   • Prevents recomputing identity every hop
//   • Prevents drift across impulses
// ============================================================================


// ============================================================================
// INTERNAL MEMORY STORE (module-level, long-term memory)
// ============================================================================
const _store = {
  pathway: null,        // stable pathway (array of hops)
  signature: null,      // structural signature for evolution detection
  history: [],          // evolution snapshots
  lastLearnedRouteId: null
};


// ============================================================================
// HELPERS
// ============================================================================

// Compute a structural signature for evolution detection
function computeSignature(hops) {
  return hops
    .map(h => `${h.layerId || "X"}:${h.layerVersion || "?"}`)
    .join("|");
}

// Compare two signatures
function signaturesMatch(a, b) {
  return a === b;
}

// Deep clone (safe for memory snapshots)
function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}


// ============================================================================
// PATHWAY MEMORY ENGINE — v7.1
// ============================================================================
export const PathwayMemory = {

  // --------------------------------------------------------------------------
  // RECORD IMPULSE SNAPSHOT (from Impulse.returnToPulseBand)
  // --------------------------------------------------------------------------
  recordImpulse(snapshot) {
    if (!snapshot || !Array.isArray(snapshot?.pathway?.hops)) return;

    const hops = snapshot.pathway.hops;
    const newSignature = computeSignature(snapshot.pathway.hops);

    // FIRST DISCOVERY
    if (!_store.pathway) {
      _store.pathway = clone(hops);
      _store.signature = newSignature;

      _store.history.push({
        timestamp: Date.now(),
        event: "INITIAL_DISCOVERY",
        signature: newSignature,
        hops: clone(hops),
        tickId: snapshot.tickId
      });

      return;
    }

    // NO EVOLUTION
    if (signaturesMatch(_store.signature, newSignature)) {
      return;
    }

    // EVOLUTION DETECTED
    _store.history.push({
      timestamp: Date.now(),
      event: "EVOLUTION_DETECTED",
      oldSignature: _store.signature,
      newSignature,
      oldHops: clone(_store.pathway),
      newHops: clone(hops),
      tickId: snapshot.tickId
    });

    // UPDATE MEMORY
    _store.pathway = clone(hops);
    _store.signature = newSignature;
  },


  // --------------------------------------------------------------------------
  // GET STABLE PATHWAY (cached)
  // --------------------------------------------------------------------------
  getPathway() {
    return clone(_store.pathway || []);
  },


  // --------------------------------------------------------------------------
  // GET EVOLUTION HISTORY
  // --------------------------------------------------------------------------
  getHistory() {
    return clone(_store.history);
  },


  // --------------------------------------------------------------------------
  // CHECK IF ORGANISM EVOLVED (compares snapshot to memory)
  // --------------------------------------------------------------------------
  hasEvolved(snapshot) {
    if (!snapshot || !Array.isArray(snapshot?.pathway?.hops)) return false;
    const newSignature = computeSignature(snapshot.pathway.hops);
    return !signaturesMatch(_store.signature, newSignature);
  },


  // --------------------------------------------------------------------------
  // OPTIONAL: MARK ROUTE ID (assigned by NerveMap or RouterMemory)
  // --------------------------------------------------------------------------
  setLearnedRouteId(routeId) {
    _store.lastLearnedRouteId = routeId;
  },

  getLearnedRouteId() {
    return _store.lastLearnedRouteId;
  },


  // --------------------------------------------------------------------------
  // CLEAR MEMORY (DEV ONLY)
  // --------------------------------------------------------------------------
  clear() {
    _store.pathway = null;
    _store.signature = null;
    _store.history = [];
    _store.lastLearnedRouteId = null;
  }
};
