// ============================================================================
//  PulseRouter-v16-IMMORTAL-DualHash-INTEL
//  SYMBOLIC EVOLUTION ROUTER — Multiverse-Aware Routing Spine
// ============================================================================
//
//  ROLE:
//    - Deterministic symbolic routing across universes/timelines/branches.
//    - Pattern-aware, lineage-aware, page-aware, ancestry-aware.
//    - Integrates Commandments, Instincts, Design, Thought.
//    - Zero randomness, zero mutation, zero drift.
//    - Pure symbolic (no binary).
//    - DualHash reversible routing signatures.
//    - Cosmos-aware routing metadata.
//    - Router-intelligence surface (pattern/lineage/page/cosmos/advantage/pulse-compute).
//
// ============================================================================
/*
AI_EXPERIENCE_META = {
  identity: "PulseRouter",
  version: "v16-Immortal-DualHash-INTEL",
  layer: "frontend",
  role: "symbolic_router",
  lineage: "PulseOS-v16",

  evo: {
    symbolicCore: true,
    dualBand: true,
    presenceAware: true,
    chunkAligned: true,
    safeRouteFree: true,
    deterministic: true,
    dualHashReady: true,
    routerIntelligenceReady: true,
    cosmosAware: true,
    advantageAware: true,
    evolutionAware: true
  },

  contract: {
    always: [
      "PulseRouterCommandments",
      "PulsePresence",
      "PulseChunks"
    ],
    never: [
      "legacyRouter",
      "legacySymbolicRouter",
      "safeRoute",
      "fetchViaCNS"
    ]
  }
}
*/


// --- EVOLUTIONARY ROUTER ORGANS --------------------------------------------
import * as PulseRouterEvolutionaryDesign     from "./PulseRouterEvolutionaryDesign.js";
import * as PulseRouterEvolutionaryInstincts  from "./PulseRouterEvolutionaryInstincts.js";
import * as PulseRouterEvolutionaryThought    from "./PulseRouterEvolutionaryThought.js";

// --- MESH ROUTER ------------------------------------------------------------
import * as PulseRouterMesh           from "./PulseRouterMesh-v16.js";

// --- EARN-AWARE ROUTER ------------------------------------------------------
import * as PulseRouterEarn           from "./PulseRouterEarn-v16.js";

// --- ROUTER COMMANDMENTS ----------------------------------------------------
import * as PulseRouterCommandments   from "./PulseRouterCommandments.js";


// ============================================================================
// ⭐ PulseRole — identifies this as the PulseRouter Organ (v16-IMMORTAL)
// ============================================================================
export const PulseRole = {
  type: "Router",
  subsystem: "PulseRouter",
  layer: "RoutingSpine",
  version: "16.0-Immortal-DualHash-INTEL",
  identity: "PulseRouter-v16-IMMORTAL-DualHash-INTEL",

  evo: {
    driftProof: true,
    patternAware: true,
    lineageAware: true,
    pageAware: true,
    cosmosAware: true,
    modeAware: true,
    identityAware: true,
    advantageAware: true,
    deterministicRouting: true,
    memoryReady: true,
    futureEvolutionReady: true,
    dualHashReady: true,
    routerIntelligenceReady: true,
    evolutionAware: true
  },

  loopTheory: {
    routingCompletion: true,
    allowLoopfieldPropulsion: true,
    pulseComputeContinuity: true,
    errorRouteAround: true
  },

  pulseContract: "Pulse-v1/v2/v3",
  meshContract: "PulseMesh-v16",
  sendContract: "PulseSend-v16"
};


// ============================================================================
// INTERNAL MEMORY — deterministic, local, safe
// ============================================================================
const routingMemory = {
  successes: {},
  failures: {}
};

function rememberSuccess(pattern, target) {
  const key = `${pattern}::${target}`;
  routingMemory.successes[key] = (routingMemory.successes[key] || 0) + 1;
}

function rememberFailure(pattern, target) {
  const key = `${pattern}::${target}`;
  routingMemory.failures[key] = (routingMemory.failures[key] || 0) + 1;
}


// ============================================================================
// HASH / DUALHASH HELPERS (pure, deterministic)
// ============================================================================
function computeHash(str) {
  let h = 0;
  const s = String(str);
  for (let i = 0; i < s.length; i++) {
    h = (h * 131 + s.charCodeAt(i) * (i + 3)) >>> 0;
  }
  return `pr16-h${h.toString(16)}`;
}

function computeAltHash(str) {
  let h = 1;
  const s = String(str);
  for (let i = 0; i < s.length; i++) {
    h = (h * 257 + s.charCodeAt(i) * (i + 11)) >>> 0;
  }
  return `pr16-a${h.toString(16)}`;
}

function computeDualHash(str) {
  const primary = computeHash(str);
  const secondary = computeAltHash(str);
  const combined = computeHash(primary + "::" + secondary);
  return { primary, secondary, combined };
}


// ============================================================================
// COSMOS CONTEXT HELPERS
// ============================================================================
function normalizeCosmos(cosmos = {}) {
  return {
    universeId: cosmos.universeId || "u:default",
    timelineId: cosmos.timelineId || "t:main",
    branchId: cosmos.branchId || "b:root"
  };
}

function cosmosSignature(cosmos) {
  const raw = `${cosmos.universeId}|${cosmos.timelineId}|${cosmos.branchId}`;
  return computeDualHash(raw);
}


// ============================================================================
// ancestry helpers
// ============================================================================
function buildPatternAncestry(pattern) {
  if (!pattern || typeof pattern !== "string") return [];
  return pattern.split("/").filter(Boolean);
}

function buildLineageSignature(lineage) {
  if (!Array.isArray(lineage) || lineage.length === 0) return "NO_LINEAGE";
  return lineage.join(">");
}

function buildPageAncestrySignature({ pattern, lineage, pageId, cosmos }) {
  const shape = {
    pattern: pattern || "",
    patternAncestry: buildPatternAncestry(pattern || ""),
    lineageSignature: buildLineageSignature(lineage || []),
    pageId: pageId || "NO_PAGE",
    cosmos: normalizeCosmos(cosmos)
  };

  const raw = JSON.stringify(shape);
  return computeDualHash(raw);
}


// ============================================================================
// degradation tier helper
// ============================================================================
function classifyDegradationTier(h) {
  const v = typeof h === "number" ? h : 1.0;
  if (v >= 0.95) return "microDegrade";
  if (v >= 0.85) return "softDegrade";
  if (v >= 0.50) return "midDegrade";
  if (v >= 0.15) return "hardDegrade";
  return "criticalDegrade";
}


// ============================================================================
// fallback deterministic routing (legacy spine → v16 surface)
// ============================================================================
function fallbackRouteTarget(pulse) {
  const pattern = pulse.pattern || "UNKNOWN_PATTERN";
  const lineageDepth = Array.isArray(pulse.lineage) ? pulse.lineage.length : 0;
  const mode = pulse.mode || "normal";
  const health = pulse.healthScore ?? 1;

  const raw = `${pattern}::${lineageDepth}::${mode}::${health}`;
  let acc = 0;

  for (let i = 0; i < raw.length; i++) {
    acc = (acc + raw.charCodeAt(i) * (i + 7)) % 12289;
  }

  const organs = ["GPU", "Earn", "OS", "Mesh"];
  return organs[acc % organs.length];
}


// ============================================================================
// ROUTER INTELLIGENCE — symbolic routing insight surface
// ============================================================================
function computeRoutingIntelligence({
  pulse,
  targetOrgan,
  source,
  tier,
  cosmos,
  pattern,
  patternAncestry,
  lineage,
  lineageSignature,
  pageId,
  pageAncestrySignature
}) {
  const healthScore = pulse.healthScore ?? 1;
  const advantageField = pulse.advantageField ?? null;
  const pulseIntelligence = pulse.pulseIntelligence ?? pulse.pulseCompute ?? null;

  const shape = {
    targetOrgan,
    source,
    tier,
    cosmos: normalizeCosmos(cosmos),
    pattern,
    patternAncestry,
    lineage,
    lineageSignature,
    pageId,
    pageAncestrySignature,
    healthScore
  };

  const routeDualHash = computeDualHash(JSON.stringify(shape));
  const advantageDualHash = advantageField
    ? computeDualHash(JSON.stringify(advantageField))
    : null;
  const pulseIntelDualHash = pulseIntelligence
    ? computeDualHash(JSON.stringify(pulseIntelligence))
    : null;

  const readinessScore = Math.max(
    0,
    Math.min(
      0.5 * healthScore +
      0.3 * (patternAncestry.length > 0 ? 1 : 0) +
      0.2 * (lineage.length > 0 ? 1 : 0),
      1
    )
  );

  return {
    healthScore,
    advantageField,
    pulseIntelligence,
    readinessScore,
    routeDualHash,
    advantageDualHash,
    pulseIntelDualHash
  };
}


// ============================================================================
// evolution-aware routing (COSMOS v16-IMMORTAL-DUALHASH-INTEL)
// ============================================================================
function evolutionAwareRouteTarget(pulse) {
  const cosmos = normalizeCosmos(pulse.cosmos || {});
  const pattern = pulse.pattern || "UNKNOWN_PATTERN";
  const lineage = Array.isArray(pulse.lineage) ? pulse.lineage.slice() : [];
  const pageId = pulse.pageId || "NO_PAGE";

  const health = pulse.healthScore ?? 1;
  const tier = classifyDegradationTier(health);

  const patternAncestry =
    pulse.patternAncestry?.length
      ? pulse.patternAncestry.slice()
      : buildPatternAncestry(pattern);

  const lineageSignature =
    typeof pulse.lineageSignature === "string"
      ? pulse.lineageSignature
      : buildLineageSignature(lineage);

  const pageAncestrySignature =
    typeof pulse.pageAncestrySignature === "string"
      ? pulse.pageAncestrySignature
      : buildPageAncestrySignature({ pattern, lineage, pageId, cosmos });

  // 1) Commandments
  if (pulse.commandmentsDecision?.targetOrgan) {
    const targetOrgan = pulse.commandmentsDecision.targetOrgan;
    rememberSuccess(pattern, targetOrgan);

    const routingIntelligence = computeRoutingIntelligence({
      pulse,
      targetOrgan,
      source: "Commandments",
      tier,
      cosmos,
      pattern,
      patternAncestry,
      lineage,
      lineageSignature,
      pageId,
      pageAncestrySignature
    });

    return {
      targetOrgan,
      source: "Commandments",
      tier,
      cosmos,
      pattern,
      patternAncestry,
      lineage,
      lineageSignature,
      pageId,
      pageAncestrySignature,
      routingIntelligence
    };
  }

  // 2) Instincts
  if (pulse.instinctsDecision?.targetOrgan) {
    const targetOrgan = pulse.instinctsDecision.targetOrgan;
    rememberSuccess(pattern, targetOrgan);

    const routingIntelligence = computeRoutingIntelligence({
      pulse,
      targetOrgan,
      source: "Instincts",
      tier,
      cosmos,
      pattern,
      patternAncestry,
      lineage,
      lineageSignature,
      pageId,
      pageAncestrySignature
    });

    return {
      targetOrgan,
      source: "Instincts",
      tier,
      cosmos,
      pattern,
      patternAncestry,
      lineage,
      lineageSignature,
      pageId,
      pageAncestrySignature,
      routingIntelligence
    };
  }

  // 3) Design
  if (pulse.designDecision?.targetOrgan) {
    const targetOrgan = pulse.designDecision.targetOrgan;
    rememberSuccess(pattern, targetOrgan);

    const routingIntelligence = computeRoutingIntelligence({
      pulse,
      targetOrgan,
      source: "Design",
      tier,
      cosmos,
      pattern,
      patternAncestry,
      lineage,
      lineageSignature,
      pageId,
      pageAncestrySignature
    });

    return {
      targetOrgan,
      source: "Design",
      tier,
      cosmos,
      pattern,
      patternAncestry,
      lineage,
      lineageSignature,
      pageId,
      pageAncestrySignature,
      routingIntelligence
    };
  }

  // 4) Thought
  if (pulse.thoughtDecision?.targetOrgan) {
    const targetOrgan = pulse.thoughtDecision.targetOrgan;
    rememberSuccess(pattern, targetOrgan);

    const routedTier = pulse.thoughtDecision.tier || tier;
    const routedPatternAncestry =
      pulse.thoughtDecision.patternAncestry || patternAncestry;
    const routedLineageSignature =
      pulse.thoughtDecision.lineageSignature || lineageSignature;
    const routedPageId = pulse.thoughtDecision.pageId || pageId;
    const routedPageAncestrySignature =
      pulse.thoughtDecision.pageAncestrySignature || pageAncestrySignature;

    const routingIntelligence = computeRoutingIntelligence({
      pulse,
      targetOrgan,
      source: "Thought",
      tier: routedTier,
      cosmos,
      pattern,
      patternAncestry: routedPatternAncestry,
      lineage,
      lineageSignature: routedLineageSignature,
      pageId: routedPageId,
      pageAncestrySignature: routedPageAncestrySignature
    });

    return {
      targetOrgan,
      source: "Thought",
      tier: routedTier,
      cosmos,
      pattern,
      patternAncestry: routedPatternAncestry,
      lineage,
      lineageSignature: routedLineageSignature,
      pageId: routedPageId,
      pageAncestrySignature: routedPageAncestrySignature,
      routingIntelligence
    };
  }

  // 5) Fallback
  const fallbackTarget = fallbackRouteTarget(pulse);
  rememberSuccess(pattern, fallbackTarget);

  const routingIntelligence = computeRoutingIntelligence({
    pulse,
    targetOrgan: fallbackTarget,
    source: "Fallback",
    tier,
    cosmos,
    pattern,
    patternAncestry,
    lineage,
    lineageSignature,
    pageId,
    pageAncestrySignature
  });

  return {
    targetOrgan: fallbackTarget,
    source: "Fallback",
    tier,
    cosmos,
    pattern,
    patternAncestry,
    lineage,
    lineageSignature,
    pageId,
    pageAncestrySignature,
    routingIntelligence
  };
}


// ============================================================================
// PUBLIC API — PulseRouter (v16-IMMORTAL-DUALHASH-INTEL)
// ============================================================================
export const PulseRouter = {

  PulseRole,

  route(pulse) {
    const pattern = pulse.pattern || "UNKNOWN_PATTERN";

    if (pulse.targetHint) {
      rememberSuccess(pattern, pulse.targetHint);
      return pulse.targetHint;
    }

    return evolutionAwareRouteTarget(pulse).targetOrgan;
  },

  routeWithMeta(pulse) {
    if (pulse.targetHint) {
      const pattern = pulse.pattern || "UNKNOWN_PATTERN";
      rememberSuccess(pattern, pulse.targetHint);

      const cosmos = normalizeCosmos(pulse.cosmos || {});
      const lineage = pulse.lineage || [];
      const pageId = pulse.pageId || "NO_PAGE";

      const tier = classifyDegradationTier(pulse.healthScore ?? 1);
      const patternAncestry = buildPatternAncestry(pattern);
      const lineageSignature = buildLineageSignature(lineage);
      const pageAncestrySignature = buildPageAncestrySignature({
        pattern,
        lineage,
        pageId,
        cosmos
      });

      const routingIntelligence = computeRoutingIntelligence({
        pulse,
        targetOrgan: pulse.targetHint,
        source: "Hint",
        tier,
        cosmos,
        pattern,
        patternAncestry,
        lineage,
        lineageSignature,
        pageId,
        pageAncestrySignature
      });

      return {
        targetOrgan: pulse.targetHint,
        source: "Hint",
        tier,
        cosmos,
        pattern,
        patternAncestry,
        lineage,
        lineageSignature,
        pageId,
        pageAncestrySignature,
        routingIntelligence
      };
    }

    return evolutionAwareRouteTarget(pulse);
  },

  remember(pulse, target, status, healthScore = 1) {
    const pattern = pulse.pattern || "UNKNOWN_PATTERN";
    if (status === "success") rememberSuccess(pattern, target);
    else rememberFailure(pattern, target);
    return { pattern, target, status, healthScore };
  },

  diagnostics() {
    return { PulseRole, routingMemory };
  }
};
