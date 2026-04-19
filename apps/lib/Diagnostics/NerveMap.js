// ============================================================================
// FILE: /apps/lib/Diagnostics/NerveMap.js
// LAYER: NERVE MAP (Living Pathway + Drift Sentinel + Directional Mapper)
// PULSE OS — v7.1
// OFFLINE • SELF-EVOLVING • NO HARDCODED PAGES
// ============================================================================
//
// ROLE (v7.1):
//   • Interpret Impulse.path as a living nervous pathway
//   • Compute health, efficiency, degradation per hop
//   • Build forward + return directional maps
//   • Compare forward vs return efficiency (repair insight)
//   • Detect version drift across layers
//   • Produce clean, UI-ready chains for diagnostics
//   • NEVER mutate the impulse
//
// CONTRACT:
//   • Pure diagnostics — metadata only
//   • No business logic, no payload computation
//   • Safe for evolving organisms (layers may grow/shrink)
//   • No file/page assumptions — pathway is the truth
//
// SAFETY:
//   • No external stimuli (internet) required
//   • No backend, no fetch, no network
//   • No timers, no loops beyond local processing
// ============================================================================


// ============================================================================
// NERVE SCORING PACK (unchanged logic, v7.1 formatting)
// ============================================================================
export const Nerves = {

  healthScore(hop) {
    const s = hop?.state || {};
    let score = 0.8;

    if (s.health === "Excellent") score = 0.95;
    if (s.health === "Good")      score = 0.85;
    if (s.health === "Weak")      score = 0.55;
    if (s.health === "Critical")  score = 0.25;

    if (s.latency > 300) score -= 0.25;
    else if (s.latency > 200) score -= 0.15;
    else if (s.latency > 150) score -= 0.05;

    if (s.stability > 90) score += 0.05;
    if (s.stability < 50) score -= 0.15;

    return Math.max(0, Math.min(1, score));
  },

  efficiency(impulse, hopIndex) {
    const expected = Math.pow(0.5, hopIndex);
    if (expected <= 0) return 0;

    const ratio = (impulse.energy || 1) / expected;
    return Math.max(0, Math.min(1, ratio / 2));
  },

  visual(health, efficiency) {
    const combined = (health * 0.7) + (efficiency * 0.3);

    if (combined < 0.3)  return { color: "red",    icons: 3 };
    if (combined < 0.5)  return { color: "orange", icons: 2 };
    if (combined < 0.7)  return { color: "yellow", icons: 1 };
    if (combined < 0.9)  return { color: "green",  icons: 1 };
    if (combined < 1.05) return { color: "green",  icons: 2 };
    return { color: "green", icons: 3 };
  },

  connection(prevHealth, currentHealth) {
    if (prevHealth !== null && prevHealth < 0.3) return "X";
    if (currentHealth < 0.2) return "X";
    return "|";
  }
};


// ============================================================================
// INTERNAL: BUILD A SINGLE DIRECTIONAL MAP
// ============================================================================
function buildDirectionalMap(impulse, hops, directionLabel) {
  const nerves = [];
  let prevHealth = null;

  hops.forEach((hop, index) => {
    const health = Nerves.healthScore(hop);
    const efficiency = Nerves.efficiency(impulse, index);
    const visual = Nerves.visual(health, efficiency);
    const connection = Nerves.connection(prevHealth, health);

    nerves.push({
      nerve: `Nerve${index + 1}`,
      index: index + 1,
      direction: directionLabel,

      connection,
      color: visual.color,
      icons: visual.icons,

      healthScore: health,
      efficiencyScore: efficiency,

      layerId: hop?.id || null,
      layerName: hop?.name || null,
      layerVersion: hop?.version || null,

      page: hop?.page || impulse?.page?.name || "UNKNOWN_PAGE",
      identityHealth: hop?.identityHealth || impulse?.identityHealth || null,

      rawState: hop?.state || {},
      rawDelta: hop?.delta || null,
      timestamp: hop?.timestamp || null
    });

    prevHealth = health;
  });

  return nerves;
}


// ============================================================================
// NERVE MAP ENGINE — v7.1
// ============================================================================
export const NerveMap = {

  // --------------------------------------------------------------------------
  // FORWARD MAP (Impulse.path as-is)
  // --------------------------------------------------------------------------
  buildForward(impulse) {
    const path = Array.isArray(impulse?.path) ? impulse.path : [];
    return buildDirectionalMap(impulse, path, "forward");
  },

  // --------------------------------------------------------------------------
  // RETURN MAP (Impulse.path reversed)
  // --------------------------------------------------------------------------
  buildReturn(impulse) {
    const path = Array.isArray(impulse?.path) ? impulse.path : [];
    const reversed = [...path].reverse();
    return buildDirectionalMap(impulse, reversed, "return");
  },

  // --------------------------------------------------------------------------
  // FULL MAP (forward + return + comparison)
  // --------------------------------------------------------------------------
  buildFull(impulse) {
    const forward = this.buildForward(impulse);
    const reverse = this.buildReturn(impulse);

    const comparison = forward.map((f, idx) => {
      const r = reverse[reverse.length - 1 - idx];

      if (!r) {
        return {
          nerve: f.nerve,
          forwardEfficiency: f.efficiencyScore,
          returnEfficiency: null,
          delta: null
        };
      }

      const delta = (r.efficiencyScore ?? 0) - (f.efficiencyScore ?? 0);

      return {
        nerve: f.nerve,
        forwardEfficiency: f.efficiencyScore,
        returnEfficiency: r.efficiencyScore,
        delta
      };
    });

    return { forward, reverse, comparison };
  },

  // --------------------------------------------------------------------------
  // VERSION DRIFT CHECK (optional, used by SurgeonGeneral)
  // --------------------------------------------------------------------------
  detectVersionDrift(impulse) {
    const versions = {};

    for (const hop of impulse.path) {
      if (!hop?.id) continue;
      const v = hop.version || null;

      if (!versions[hop.id]) versions[hop.id] = new Set();
      if (v) versions[hop.id].add(v);
    }

    const drift = [];

    for (const id of Object.keys(versions)) {
      const set = versions[id];
      if (set.size > 1) {
        drift.push({
          layerId: id,
          versions: Array.from(set)
        });
      }
    }

    return {
      hasDrift: drift.length > 0,
      drift
    };
  }
};
