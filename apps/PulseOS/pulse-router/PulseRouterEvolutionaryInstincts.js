// ============================================================================
//  PULSE ROUTER EVOLUTIONARY INSTINCTS v10.4‑Evo‑A2 — ROUTER EVOLUTION CORE
//  Adaptive Routing Identity • Genetic Route Memory • Best‑Path Preservation
//  Page/Lineage/Pattern‑Ancestry Aware
// ============================================================================
//
// SAFETY CONTRACT (v10.4‑Evo‑A2):
//  -------------------------------
//  • No randomness
//  • No timestamps
//  • No DOM
//  • No network or filesystem access
//  • No async
//  • Fail-open: malformed routes → safe defaults
//  • Deterministic: same inputs → same evolutionary memory
//  • Self-repair-ready: entries include OS metadata
//  • Loop-Theory-Aware (routingCompletion, loopfieldPropulsion,
//    pulseComputeContinuity, errorRouteAround)
//  • Page/lineage/pattern ancestry are internal only, no external mutation
// ============================================================================

// ------------------------------------------------------------
// OS‑v10.4 CONTEXT METADATA — Router Evolution Identity
// ------------------------------------------------------------
const ROUTER_EVOLUTION_CONTEXT = {
  layer: "PulseRouterEvolutionaryInstincts",
  role: "ROUTER_EVOLUTION_CORE",
  purpose: "Adaptive routing identity + genetic memory for route patterns",
  context: "Stores best-known routes, lineage, stability, and regression data",
  target: "full-router",
  version: 10.4,
  selfRepairable: true,

  evo: {
    advantageCascadeAware: true,
    pulseEfficiencyAware: true,
    driftProof: true,
    multiInstanceReady: true,
    unifiedAdvantageField: true,
    pulseSend10Ready: true,

    routingContract: "PulseSend-v10.4",
    routerOrganContract: "PulseRouter-v10.4",
    earnCompatibility: "Earn-v2"
  },

  // ⭐ LOOP THEORY INVARIANTS ⭐
  loopTheory: {
    routingCompletion: true,
    allowLoopfieldPropulsion: true,
    pulseComputeContinuity: true,
    errorRouteAround: true
  }
};

// ------------------------------------------------------------
// Utility: stable JSON stringify
// ------------------------------------------------------------
function stableStringify(value) {
  if (value === null || typeof value !== "object") {
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) {
    return "[" + value.map(stableStringify).join(",") + "]";
  }
  const keys = Object.keys(value).sort();
  const parts = keys.map(
    (k) => JSON.stringify(k) + ":" + stableStringify(value[k])
  );
  return "{" + parts.join(",") + "}";
}

// ------------------------------------------------------------
// Utility: deterministic hash
// ------------------------------------------------------------
function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return (hash >>> 0).toString(16);
}

// ------------------------------------------------------------
// Helpers: pattern / lineage / page ancestry
// ------------------------------------------------------------
function buildPatternAncestry(pattern) {
  if (!pattern || typeof pattern !== "string") return [];
  return pattern.split("/").filter(Boolean);
}

function buildLineageSignature(lineage) {
  if (!Array.isArray(lineage) || lineage.length === 0) return "NO_LINEAGE";
  return lineage.join(">");
}

function buildPageAncestrySignature({ pattern, lineage, pageId }) {
  const safePattern = typeof pattern === "string" ? pattern : "";
  const safeLineage = Array.isArray(lineage) ? lineage : [];
  const safePageId = pageId || "NO_PAGE";

  const patternAncestry = buildPatternAncestry(safePattern);
  const lineageSig = buildLineageSignature(safeLineage);

  const shape = {
    pattern: safePattern,
    patternAncestry,
    lineageSignature: lineageSig,
    pageId: safePageId
  };

  return simpleHash(stableStringify(shape));
}

// ------------------------------------------------------------
// Route hash — Genetic Route Fingerprint
// ------------------------------------------------------------
function computeRouteHash(routeShape) {
  const serialized = stableStringify(routeShape || {});
  return simpleHash(serialized);
}

// ------------------------------------------------------------
// Route scoring — Evolutionary Fitness Score
// ------------------------------------------------------------
function clamp(value, min, max) {
  if (typeof value !== "number" || Number.isNaN(value)) return min;
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

function scoreRoute(routeStats = {}) {
  const {
    successCount = 0,
    failureCount = 0,
    degradationEvents = 0
  } = routeStats;

  const safeSuccess = clamp(successCount, 0, 100000);
  const safeFailure = clamp(failureCount, 0, 100000);
  const safeDegrade = clamp(degradationEvents, 0, 100000);

  const score =
    safeSuccess * 1.0 -
    safeFailure * 0.8 -
    safeDegrade * 0.5;

  return clamp(score, 0, 100000);
}

// ------------------------------------------------------------
// Regression detection — Evolutionary Delta
// ------------------------------------------------------------
function detectRegression(currentStats, baselineStats) {
  const currentScore = scoreRoute(currentStats);
  const baselineScore = scoreRoute(baselineStats);

  if (baselineScore === 0) return 0;

  const delta = (currentScore - baselineScore) / baselineScore;
  return delta * 100;
}

// ------------------------------------------------------------
// Degradation tier helper
// ------------------------------------------------------------
function classifyDegradationTier(healthScore) {
  const h = typeof healthScore === "number" ? healthScore : 1.0;

  if (h >= 0.95) return "microDegrade";
  if (h >= 0.85) return "softDegrade";
  if (h >= 0.50) return "midDegrade";
  if (h >= 0.15) return "hardDegrade";
  return "criticalDegrade";
}

// ------------------------------------------------------------
// Memory entry model — Evolutionary Route Record
// ------------------------------------------------------------
class PulseRouterEvolutionaryStore {
  constructor() {
    this.entries = new Map();
    this.meta = { ...ROUTER_EVOLUTION_CONTEXT };
  }

  clear() {
    this.entries.clear();
  }

  recordRoute({ routeShape, routeStats, healthScore, pattern, lineage, pageId }) {
    const routeHash = computeRouteHash(routeShape);
    const score = scoreRoute(routeStats);

    const existing = this.entries.get(routeHash);

    const safePattern = typeof pattern === "string" ? pattern : "";
    const safeLineage = Array.isArray(lineage) ? lineage.slice() : [];
    const safePageId = pageId || "NO_PAGE";
    const safeHealth = typeof healthScore === "number" ? healthScore : 1.0;
    const tier = classifyDegradationTier(safeHealth);

    const patternAncestry = buildPatternAncestry(safePattern);
    const lineageSignature = buildLineageSignature(safeLineage);
    const pageAncestrySignature = buildPageAncestrySignature({
      pattern: safePattern,
      lineage: safeLineage,
      pageId: safePageId
    });

    // ⭐ LOOP THEORY INVARIANTS INCLUDED IN EVOLUTION RECORD ⭐
    const loopTheory = {
      routingCompletion: true,
      allowLoopfieldPropulsion: true,
      pulseComputeContinuity: true,
      errorRouteAround: true
    };

    const baseEntry = {
      key: routeHash,
      routeShape: routeShape || {},
      bestStats: routeStats || {},
      bestScore: score,
      pattern: safePattern,
      patternAncestry,
      lineage: safeLineage,
      lineageSignature,
      pageId: safePageId,
      pageAncestrySignature,
      healthScore: safeHealth,
      tier,
      loopTheory,
      meta: { ...ROUTER_EVOLUTION_CONTEXT }
    };

    if (!existing || score > existing.bestScore) {
      this.entries.set(routeHash, baseEntry);
    } else {
      const merged = {
        ...existing,
        pattern: safePattern || existing.pattern,
        patternAncestry: patternAncestry.length
          ? patternAncestry
          : existing.patternAncestry,
        lineage: safeLineage.length ? safeLineage : existing.lineage,
        lineageSignature: lineageSignature || existing.lineageSignature,
        pageId: safePageId || existing.pageId,
        pageAncestrySignature:
          pageAncestrySignature || existing.pageAncestrySignature,
        healthScore: safeHealth,
        tier,
        loopTheory // always overwrite with latest invariants
      };
      this.entries.set(routeHash, merged);
    }

    return this.entries.get(routeHash);
  }

  getBestRoute(routeShape) {
    const routeHash = computeRouteHash(routeShape);
    return this.entries.get(routeHash) || null;
  }

  getSnapshot() {
    const out = {};
    for (const [key, entry] of this.entries.entries()) {
      out[key] = {
        key: entry.key,
        bestScore: entry.bestScore,
        bestStats: entry.bestStats,
        pattern: entry.pattern,
        patternAncestry: entry.patternAncestry.slice(),
        lineage: entry.lineage.slice(),
        lineageSignature: entry.lineageSignature,
        pageId: entry.pageId,
        pageAncestrySignature: entry.pageAncestrySignature,
        healthScore: entry.healthScore,
        tier: entry.tier,
        loopTheory: { ...entry.loopTheory }
      };
    }
    return out;
  }

  serialize() {
    return JSON.stringify([...this.entries.values()]);
  }

  deserialize(jsonString) {
    this.entries.clear();
    if (!jsonString) return;

    let arr;
    try {
      arr = JSON.parse(jsonString);
    } catch {
      return;
    }

    if (!Array.isArray(arr)) return;

    arr.forEach((entry) => {
      if (!entry || typeof entry !== "object" || !entry.key) return;

      const safePattern = typeof entry.pattern === "string" ? entry.pattern : "";
      const safeLineage = Array.isArray(entry.lineage)
        ? entry.lineage.slice()
        : [];
      const safePageId = entry.pageId || "NO_PAGE";

      const patternAncestry = Array.isArray(entry.patternAncestry)
        ? entry.patternAncestry.slice()
        : buildPatternAncestry(safePattern);

      const lineageSignature =
        typeof entry.lineageSignature === "string"
          ? entry.lineageSignature
          : buildLineageSignature(safeLineage);

      const pageAncestrySignature =
        typeof entry.pageAncestrySignature === "string"
          ? entry.pageAncestrySignature
          : buildPageAncestrySignature({
              pattern: safePattern,
              lineage: safeLineage,
              pageId: safePageId
            });

      const safeEntry = {
        key: entry.key,
        routeShape: entry.routeShape || {},
        bestStats: entry.bestStats || {},
        bestScore:
          typeof entry.bestScore === "number" ? entry.bestScore : 0,
        pattern: safePattern,
        patternAncestry,
        lineage: safeLineage,
        lineageSignature,
        pageId: safePageId,
        pageAncestrySignature,
        healthScore:
          typeof entry.healthScore === "number" ? entry.healthScore : 1.0,
        tier: classifyDegradationTier(entry.healthScore),

        // ⭐ ALWAYS RESTORE LOOP THEORY INVARIANTS ⭐
        loopTheory: {
          routingCompletion: true,
          allowLoopfieldPropulsion: true,
          pulseComputeContinuity: true,
          errorRouteAround: true
        },

        meta: { ...ROUTER_EVOLUTION_CONTEXT }
      };

      this.entries.set(safeEntry.key, safeEntry);
    });
  }
}

// ------------------------------------------------------------
// Public API wrapper — Evolution Core Surface
// ------------------------------------------------------------
class PulseRouterEvolutionaryInstincts {
  constructor() {
    this.store = new PulseRouterEvolutionaryStore();
    this.meta = { ...ROUTER_EVOLUTION_CONTEXT };
  }

  recordRoute(route) {
    return this.store.recordRoute(route);
  }

  getBestRoute(routeShape) {
    return this.store.getBestRoute(routeShape);
  }

  detectRegression(currentStats, baselineStats) {
    return detectRegression(currentStats, baselineStats);
  }

  scoreRoute(stats) {
    return scoreRoute(stats);
  }

  getSnapshot() {
    return this.store.getSnapshot();
  }

  serialize() {
    return this.store.serialize();
  }

  deserialize(jsonString) {
    this.store.deserialize(jsonString);
  }

  clear() {
    this.store.clear();
  }
}

// ------------------------------------------------------------
// EXPORTS
// ------------------------------------------------------------
export {
  PulseRouterEvolutionaryInstincts,
  computeRouteHash,
  scoreRoute,
  detectRegression
};
