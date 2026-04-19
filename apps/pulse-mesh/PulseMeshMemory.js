// ============================================================================
// [pulse:mesh] COMMUNITY_MEMORY_LAYER v7.3  // yellow
// Long-Term Pattern Retention • Metadata-Only • Evolution Support
// ============================================================================
//
// IDENTITY — THE MEMORY LAYER:
//  ----------------------------
//  • Long-term retention of routing patterns and impulse outcomes.
//  • Stores metadata-only "memories" of what worked and what failed.
//  • Used by Cortex, Tendons, Organs, and Immune for evolution.
//  • NEVER computes payloads, NEVER mutates data content.
//  • Pure pattern retention for system-wide improvement.
//
// THEME:
//  • Color: Yellow (memory, retention, long-term shaping).
//  • Subtheme: Patterns, outcomes, evolution.
//
// SAFETY CONTRACT:
//  • Metadata-only.
//  • No payload access.
//  • No routing override.
//  • No autonomy, no sentience.
//  • Deterministic, drift-proof retention.
//
// ADVANTAGE CASCADE (conceptual only):
//  ------------------------------------
//  • Inherits ANY advantage from ANY organ automatically.
//  • Dual-mode: mental clarity + system efficiency.
//  • Local-aware: node-level memory context.
//  • Internet-aware: cluster/mesh/global memory context.
//  • Unified-advantage-field: ALL advantages active unless unsafe.
//  • Future-evolution-ready: new safe advantages auto-inherited.
// ============================================================================


// -----------------------------------------------------------
// Memory Store (in-memory, metadata-only)
// -----------------------------------------------------------

const MemoryStore = {
  routes: new Map(),      // routeKey -> { success, fail, lastScore }
  earners: new Map(),     // earnerId -> { success, fail, avgScore }
  organs: new Map(),      // organId -> { count, anomalyCount }
  reflexes: new Map(),    // reflexName -> { triggered, drops }

  meta: {
    layer: "PulseMemory",
    role: "LONG_TERM_MEMORY",
    version: 7.3,
    target: "full-mesh",
    selfRepairable: true,
    evo: {
      dualMode: true,                 // mental + system
      localAware: true,               // node-level memory
      internetAware: true,            // cluster/mesh/global memory

      advantageCascadeAware: true,    // inherits ANY advantage
      pulseEfficiencyAware: true,     // 1-pulse collapse
      driftProof: true,
      multiInstanceReady: true,

      unifiedAdvantageField: true,    // no OR; all advantages ON
      futureEvolutionReady: true      // new safe advantages auto-inherited
    }
  }
};


// -----------------------------------------------------------
// Memory Helpers
// -----------------------------------------------------------

function getOrInit(map, key, init) {
  if (!map.has(key)) map.set(key, { ...init });
  return map.get(key);
}


// -----------------------------------------------------------
// Memory Pack: what we record (logic unchanged)
// -----------------------------------------------------------

export const PulseMemory = {
  recordRoute(impulse) {
    const key = `${impulse.entryNodeId}->${impulse.flags?.delivered_to ?? 'none'}`;
    const mem = getOrInit(MemoryStore.routes, key, {
      success: 0,
      fail: 0,
      lastScore: 0,
    });

    if (impulse.flags?.delivered_to) mem.success++;
    else mem.fail++;

    mem.lastScore = impulse.score || 0;
  },

  recordEarner(impulse) {
    const earnerId = impulse.flags?.delivered_to;
    if (!earnerId) return;

    const mem = getOrInit(MemoryStore.earners, earnerId, {
      success: 0,
      fail: 0,
      avgScore: 0,
    });

    mem.success++;
    mem.avgScore = (mem.avgScore + (impulse.score || 0)) / 2;
  },

  recordOrgans(impulse) {
    const organs = impulse.organs || [];
    for (const organId of organs) {
      const mem = getOrInit(MemoryStore.organs, organId, {
        count: 0,
        anomalyCount: 0,
      });

      mem.count++;
      if (impulse.flags?.cortex_anomaly) mem.anomalyCount++;
    }
  },

  recordReflexes(impulse) {
    const flags = impulse.flags || {};
    for (const key of Object.keys(flags)) {
      if (!key.startsWith('reflex_')) continue;

      const mem = getOrInit(MemoryStore.reflexes, key, {
        triggered: 0,
        drops: 0,
      });

      mem.triggered++;
      if (key.endsWith('_drop')) mem.drops++;
    }
  }
};


// -----------------------------------------------------------
// Memory Engine (logic unchanged, metadata upgraded)
// -----------------------------------------------------------

export function applyPulseMemory(impulse) {
  impulse.flags = impulse.flags || {};
  impulse.flags.memory_meta = MemoryStore.meta;

  PulseMemory.recordRoute(impulse);
  PulseMemory.recordEarner(impulse);
  PulseMemory.recordOrgans(impulse);
  PulseMemory.recordReflexes(impulse);

  impulse.flags.memory_recorded = true;

  return impulse;
}
