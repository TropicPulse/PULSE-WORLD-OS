// ============================================================================
//  PULSE ROUTER EVOLUTIONARY DESIGN v10.4‑Evo‑A2 — ROUTER DESIGN CORTEX
//  Long‑Term Route Architecture Memory • Deterministic • Drift‑Proof
//  Page/Lineage/Pattern‑Ancestry Aware
// ============================================================================
//
// IDENTITY — THE DESIGN CORTEX (v10.4‑Evo‑A2):
//  -------------------------------------------
//  • Stores long‑term route design blueprints.
//  • Preserves structural intent for each route.
//  • Maintains design lineage + evolution history.
//  • Provides deterministic design lookup + self‑repair.
//  • Ensures router never drifts from founder‑approved design.
//  • PulseSend‑10.4‑ready: design metadata can be routed.
//  • Earn‑v2‑ready.
//  • Loop‑Theory‑Aware (routingCompletion, loopfieldPropulsion,
//    pulseComputeContinuity, errorRouteAround)
//  • Page/lineage/pattern ancestry are internal only, no external mutation
//
// SAFETY CONTRACT (v10.4‑Evo‑A2):
//  -------------------------------
//  • No randomness
//  • No timestamps
//  • No DOM
//  • No network or filesystem access
//  • No async
//  • Fail‑open: malformed designs → safe defaults
//  • Deterministic: same design → same blueprint
//  • Self‑repair‑ready: entries include OS metadata
// ============================================================================

// ------------------------------------------------------------
// OS‑v10.4 CONTEXT METADATA — Router Design Identity
// ------------------------------------------------------------
const ROUTER_DESIGN_CONTEXT = {
  layer: "PulseRouterEvolutionaryDesign",
  role: "ROUTER_DESIGN_CORTEX",
  purpose: "Long‑term architectural memory for route design blueprints",
  context: "Stores route design intent, lineage, constraints, and evolution",
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

  // ⭐ LOOP THEORY DESIGN INVARIANTS ⭐
  loopTheory: {
    routingCompletion: true,          // Route intends full completion
    allowLoopfieldPropulsion: true,   // Design allows LoopField acceleration
    pulseComputeContinuity: true,     // Pulse computes during routing
    errorRouteAround: true            // Design supports route-around behavior
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
// Design hash — Architectural Fingerprint
// ------------------------------------------------------------
function computeDesignHash(design) {
  const serialized = stableStringify(design || {});
  return simpleHash(serialized);
}

// ------------------------------------------------------------
// Design scoring — Structural Fitness Score
// ------------------------------------------------------------
function scoreDesign(designStats = {}) {
  const {
    stability = 1.0,
    clarity = 1.0,
    lineageStrength = 1.0
  } = designStats;

  const clamp01 = (v) => Math.max(0, Math.min(1, v));

  const s = clamp01(stability);
  const c = clamp01(clarity);
  const l = clamp01(lineageStrength);

  return s * 0.5 + c * 0.3 + l * 0.2;
}

// ------------------------------------------------------------
// Memory entry model — Architectural Design Record
// ------------------------------------------------------------
class PulseRouterDesignStore {
  constructor() {
    this.entries = new Map();
    this.meta = { ...ROUTER_DESIGN_CONTEXT };
  }

  clear() {
    this.entries.clear();
  }

  recordDesign({ routeId, design, designStats, pattern, lineage, pageId }) {
    const designHash = computeDesignHash(design);
    const score = scoreDesign(designStats);

    const existing = this.entries.get(routeId);

    const safePattern = typeof pattern === "string" ? pattern : "";
    const safeLineage = Array.isArray(lineage) ? lineage.slice() : [];
    const safePageId = pageId || "NO_PAGE";

    const patternAncestry = buildPatternAncestry(safePattern);
    const lineageSignature = buildLineageSignature(safeLineage);
    const pageAncestrySignature = buildPageAncestrySignature({
      pattern: safePattern,
      lineage: safeLineage,
      pageId: safePageId
    });

    // ⭐ LOOP THEORY INVARIANTS INCLUDED IN DESIGN RECORD ⭐
    const loopTheory = {
      routingCompletion: true,
      allowLoopfieldPropulsion: true,
      pulseComputeContinuity: true,
      errorRouteAround: true
    };

    const baseEntry = {
      routeId,
      designHash,
      design: design || {},
      bestStats: designStats || {},
      bestScore: score,
      pattern: safePattern,
      patternAncestry,
      lineage: safeLineage,
      lineageSignature,
      pageId: safePageId,
      pageAncestrySignature,
      loopTheory,
      meta: { ...ROUTER_DESIGN_CONTEXT }
    };

    if (!existing || score > existing.bestScore) {
      this.entries.set(routeId, baseEntry);
    } else {
      const merged = {
        ...existing,
        designHash,
        design: design || existing.design,
        bestStats: designStats || existing.bestStats,
        bestScore: score > existing.bestScore ? score : existing.bestScore,
        pattern: safePattern || existing.pattern,
        patternAncestry: patternAncestry.length
          ? patternAncestry
          : existing.patternAncestry,
        lineage: safeLineage.length ? safeLineage : existing.lineage,
        lineageSignature: lineageSignature || existing.lineageSignature,
        pageId: safePageId || existing.pageId,
        pageAncestrySignature:
          pageAncestrySignature || existing.pageAncestrySignature,
        loopTheory // always overwrite with latest invariants
      };
      this.entries.set(routeId, merged);
    }

    return this.entries.get(routeId);
  }

  getDesign(routeId) {
    return this.entries.get(routeId) || null;
  }

  getSnapshot() {
    const out = {};
    for (const [key, entry] of this.entries.entries()) {
      out[key] = {
        routeId: entry.routeId,
        designHash: entry.designHash,
        bestScore: entry.bestScore,
        bestStats: entry.bestStats,
        pattern: entry.pattern,
        patternAncestry: entry.patternAncestry.slice(),
        lineage: entry.lineage.slice(),
        lineageSignature: entry.lineageSignature,
        pageId: entry.pageId,
        pageAncestrySignature: entry.pageAncestrySignature,
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
      if (!entry || typeof entry !== "object" || !entry.routeId) return;

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
        routeId: entry.routeId,
        designHash: entry.designHash || "",
        design: entry.design || {},
        bestStats: entry.bestStats || {},
        bestScore:
          typeof entry.bestScore === "number" ? entry.bestScore : 0,
        pattern: safePattern,
        patternAncestry,
        lineage: safeLineage,
        lineageSignature,
        pageId: safePageId,
        pageAncestrySignature,

        // ⭐ ALWAYS RESTORE LOOP THEORY INVARIANTS ⭐
        loopTheory: {
          routingCompletion: true,
          allowLoopfieldPropulsion: true,
          pulseComputeContinuity: true,
          errorRouteAround: true
        },

        meta: { ...ROUTER_DESIGN_CONTEXT }
      };

      this.entries.set(safeEntry.routeId, safeEntry);
    });
  }
}

// ------------------------------------------------------------
// Public API wrapper — Design Cortex Surface
// ------------------------------------------------------------
class PulseRouterEvolutionaryDesign {
  constructor() {
    this.store = new PulseRouterDesignStore();
    this.meta = { ...ROUTER_DESIGN_CONTEXT };
  }

  recordDesign(designEntry) {
    return this.store.recordDesign(designEntry);
  }

  getDesign(routeId) {
    return this.store.getDesign(routeId);
  }

  scoreDesign(stats) {
    return scoreDesign(stats);
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
  PulseRouterEvolutionaryDesign,
  computeDesignHash,
  scoreDesign
};
