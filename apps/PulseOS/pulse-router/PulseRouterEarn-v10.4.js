// ============================================================================
//  PulseEarnRouter-v10.4-Evo-A2 — EARN ROUTING ORGAN
//  Deterministic Earn Routing • Pattern/Lineage/Page-Ancestry Aware
// ============================================================================

export const PulseEarnRole = {
  type: "EarnRouter",
  subsystem: "PulseEarn",
  layer: "Routing",
  version: "10.4",
  identity: "PulseEarnRouter-v10.4-Evo-A2",

  evo: {
    driftProof: true,
    patternAware: true,
    lineageAware: true,
    pageAware: true,
    deterministicRouting: true,
    unifiedAdvantageField: true,
    pulseRouter10Ready: true,
    loopTheoryAware: true
  },

  loopTheory: {
    routingCompletion: true,
    allowLoopfieldPropulsion: true,
    pulseComputeContinuity: true,
    errorRouteAround: true
  },

  earnContract: "PulseEarn-v10",
  sendContract: "PulseSend-v10.4"
};

// ancestry helpers (same shape as router)
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

  let raw = JSON.stringify(shape);
  let hash = 0;
  for (let i = 0; i < raw.length; i++) {
    const chr = raw.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return (hash >>> 0).toString(16);
}

function classifyDegradationTier(healthScore) {
  const h = typeof healthScore === "number" ? healthScore : 1.0;
  if (h >= 0.95) return "microDegrade";
  if (h >= 0.85) return "softDegrade";
  if (h >= 0.50) return "midDegrade";
  if (h >= 0.15) return "hardDegrade";
  return "criticalDegrade";
}

// simple deterministic earn-target chooser
function chooseEarnPath(pulse) {
  const pattern = pulse.pattern || "UNKNOWN_PATTERN";
  const health = pulse.healthScore ?? 1;
  const raw = `${pattern}::${health}`;
  let acc = 0;
  for (let i = 0; i < raw.length; i++) {
    acc = (acc + raw.charCodeAt(i) * (i + 7)) % 7919;
  }
  const paths = ["earn-core", "earn-cache", "earn-os-fallback"];
  return paths[acc % paths.length];
}

export const PulseEarnRouter = {
  PulseEarnRole,

  routeEarn(pulse) {
    const pattern = pulse.pattern || "UNKNOWN_PATTERN";
    const lineage = Array.isArray(pulse.lineage) ? pulse.lineage.slice() : [];
    const pageId = pulse.pageId || "NO_PAGE";

    const patternAncestry =
      Array.isArray(pulse.patternAncestry) && pulse.patternAncestry.length
        ? pulse.patternAncestry.slice()
        : buildPatternAncestry(pattern);

    const lineageSignature =
      typeof pulse.lineageSignature === "string"
        ? pulse.lineageSignature
        : buildLineageSignature(lineage);

    const pageAncestrySignature =
      typeof pulse.pageAncestrySignature === "string"
        ? pulse.pageAncestrySignature
        : buildPageAncestrySignature({ pattern, lineage, pageId });

    const tier = classifyDegradationTier(pulse.healthScore ?? 1);

    const targetPath = chooseEarnPath(pulse);

    return {
      targetPath,
      tier,
      pattern,
      patternAncestry,
      lineage,
      lineageSignature,
      pageId,
      pageAncestrySignature,
      loopTheory: { ...PulseEarnRole.loopTheory }
    };
  }
};
