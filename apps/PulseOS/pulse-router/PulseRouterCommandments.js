// ============================================================================
//  PULSE ROUTER COMMANDMENTS v10.4‑Evo‑A2 — ROUTER SETTINGS COVENANT
//  Long‑Term Route Settings Memory • Deterministic • Drift‑Proof • Lineage/Page/Pattern‑Aware
// ============================================================================
//
//  WHAT THIS ORGAN NOW IS:
//  ------------------------
//  • Canonical route settings + constraints.
//  • Pattern‑aware, lineage‑aware, page‑aware.
//  • Deterministic fallback + safe defaults.
//  • Multi‑instance safe, drift‑proof, self‑repair‑ready.
//  • Compatible with EvolutionaryThought inheritance layer.
//  • Compatible with EvolutionaryInstincts + EvolutionaryDesign metadata.
//  • Loop‑Theory‑Aware (routingCompletion, loopfieldPropulsion,
//    pulseComputeContinuity, errorRouteAround)
//
//  WHAT THIS ORGAN IS NOT:
//  ------------------------
//  • Not a router.
//  • Not a compute engine.
//  • Not a mesh organ.
//  • Not a transport organ.
//  • Not a mutation engine.
// ============================================================================


// ------------------------------------------------------------
// OS‑v10.4 CONTEXT METADATA — Router Commandments Identity
// ------------------------------------------------------------
const ROUTER_COMMANDMENTS_CONTEXT = {
  layer: "PulseRouterCommandments",
  role: "ROUTER_SETTINGS_COVENANT",
  purpose: "Long‑term canonical settings + constraints for routes",
  context:
    "Stores per‑route commandments: allowed behaviors, fallbacks, and stability rules",
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

  // ⭐ LOOP THEORY COMMANDMENTS (router-level)
  loopTheory: {
    routingCompletion: true,          // Always attempt full route
    allowLoopfieldPropulsion: true,   // LoopField may accelerate routing
    pulseComputeContinuity: true,     // Pulse computes during routing
    errorRouteAround: true            // Route around errors
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
// Commandment key — Route + Tier + Context + Pattern + Page
// ------------------------------------------------------------
function buildRouteKey({
  routeId = "unknown-route",
  tierId = "default",
  context = {},
  pattern = "",
  pageId = "NO_PAGE",
  lineage = []
} = {}) {
  const base = {
    routeId,
    tierId,
    context,
    pattern,
    pageId,
    lineage
  };
  return simpleHash(stableStringify(base));
}


// ------------------------------------------------------------
// Commandment normalization — Safe Settings Envelope
// ------------------------------------------------------------
function normalizeCommandments(commandments = {}) {
  const {
    allowDegrade = true,
    allowFallback = true,
    hardFailOnBreach = false,
    maxDegradeDepth = 3,
    preferredPath = "primary",
    forbiddenPaths = [],
    notes = "",

    // ⭐ LOOP THEORY COMMANDMENTS ⭐
    routingCompletion = true,
    allowLoopfieldPropulsion = true,
    pulseComputeContinuity = true,
    errorRouteAround = true
  } = commandments;

  return {
    allowDegrade: Boolean(allowDegrade),
    allowFallback: Boolean(allowFallback),
    hardFailOnBreach: Boolean(hardFailOnBreach),
    maxDegradeDepth:
      typeof maxDegradeDepth === "number" && maxDegradeDepth >= 0
        ? maxDegradeDepth
        : 0,
    preferredPath: String(preferredPath || "primary"),
    forbiddenPaths: Array.isArray(forbiddenPaths)
      ? forbiddenPaths.map((p) => String(p))
      : [],
    notes: String(notes || ""),

    // ⭐ LOOP THEORY COMMANDMENTS ⭐
    routingCompletion: Boolean(routingCompletion),
    allowLoopfieldPropulsion: Boolean(allowLoopfieldPropulsion),
    pulseComputeContinuity: Boolean(pulseComputeContinuity),
    errorRouteAround: Boolean(errorRouteAround)
  };
}


// ------------------------------------------------------------
// Memory entry model — Route Commandment Record
// ------------------------------------------------------------
class PulseRouterCommandmentsStore {
  constructor() {
    this.entries = new Map();
    this.meta = { ...ROUTER_COMMANDMENTS_CONTEXT };
  }

  clear() {
    this.entries.clear();
  }

  setCommandments({
    routeId,
    tierId,
    context,
    commandments,
    pattern,
    lineage,
    pageId
  }) {
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

    const key = buildRouteKey({
      routeId,
      tierId,
      context,
      pattern: safePattern,
      lineage: safeLineage,
      pageId: safePageId
    });

    const normalized = normalizeCommandments(commandments);

    const entry = {
      key,
      routeId: String(routeId || "unknown-route"),
      tierId: String(tierId || "default"),
      context: context || {},
      pattern: safePattern,
      patternAncestry,
      lineage: safeLineage,
      lineageSignature,
      pageId: safePageId,
      pageAncestrySignature,
      commandments: normalized,
      meta: { ...ROUTER_COMMANDMENTS_CONTEXT }
    };

    this.entries.set(key, entry);
    return this.entries.get(key);
  }

  getCommandments({ routeId, tierId, context, pattern, lineage, pageId }) {
    const safePattern = typeof pattern === "string" ? pattern : "";
    const safeLineage = Array.isArray(lineage) ? lineage.slice() : [];
    const safePageId = pageId || "NO_PAGE";

    const key = buildRouteKey({
      routeId,
      tierId,
      context,
      pattern: safePattern,
      lineage: safeLineage,
      pageId: safePageId
    });

    const entry = this.entries.get(key);

    if (!entry) {
      const patternAncestry = buildPatternAncestry(safePattern);
      const lineageSignature = buildLineageSignature(safeLineage);
      const pageAncestrySignature = buildPageAncestrySignature({
        pattern: safePattern,
        lineage: safeLineage,
        pageId: safePageId
      });

      return {
        key,
        routeId: String(routeId || "unknown-route"),
        tierId: String(tierId || "default"),
        context: context || {},
        pattern: safePattern,
        patternAncestry,
        lineage: safeLineage,
        lineageSignature,
        pageId: safePageId,
        pageAncestrySignature,
        commandments: normalizeCommandments({}),
        meta: { ...ROUTER_COMMANDMENTS_CONTEXT }
      };
    }

    return entry;
  }

  getSnapshot() {
    const out = {};
    for (const [key, entry] of this.entries.entries()) {
      out[key] = {
        routeId: entry.routeId,
        tierId: entry.tierId,
        pattern: entry.pattern,
        patternAncestry: entry.patternAncestry.slice(),
        lineage: entry.lineage.slice(),
        lineageSignature: entry.lineageSignature,
        pageId: entry.pageId,
        pageAncestrySignature: entry.pageAncestrySignature,
        commandments: { ...entry.commandments }
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
        routeId: entry.routeId || "unknown-route",
        tierId: entry.tierId || "default",
        context: entry.context || {},
        pattern: safePattern,
        patternAncestry,
        lineage: safeLineage,
        lineageSignature,
        pageId: safePageId,
        pageAncestrySignature,
        commandments: normalizeCommandments(entry.commandments || {}),
        meta: { ...ROUTER_COMMANDMENTS_CONTEXT }
      };

      this.entries.set(safeEntry.key, safeEntry);
    });
  }
}


// ------------------------------------------------------------
// Public API wrapper — Commandment Surface
// ------------------------------------------------------------
class PulseRouterCommandments {
  constructor() {
    this.store = new PulseRouterCommandmentsStore();
    this.meta = { ...ROUTER_COMMANDMENTS_CONTEXT };
  }

  setCommandments(payload) {
    return this.store.setCommandments(payload);
  }

  getCommandments(payload) {
    return this.store.getCommandments(payload);
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
  PulseRouterCommandments,
  buildRouteKey,
  normalizeCommandments
};
