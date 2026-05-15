// ============================================================================
// FILE: PulseRouter-v24-IMMORTAL-INTEL++-DUALHASH.js
// PulseRouter — v24 IMMORTAL INTEL++ DualHash Evolution‑Aware Router
// ----------------------------------------------------------------------------
// ROLE:
//   • Deterministically route pulses via Commandments → Instincts → Design
//     → Thought → Fallback (A‑B‑A symbolic routing spine).
//   • Preserve v16 semantics, upgrade to v24‑IMMORTAL‑INTEL++ dualhash surfaces.
//   • Expose routing‑intelligence INTEL surfaces + healing diagnostics.
// ----------------------------------------------------------------------------
// SAFETY CONTRACT (IMMORTAL v24‑INTEL):
//   • No network, no filesystem, no randomness, no timestamps, no async.
//   • No mutation of pulse input; only internal healing + routingMemory.
//   • Deterministic‑field: identical input → identical routing decision.
//   • Zero user code, zero eval, zero dynamic imports.
// ============================================================================
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝


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
// HASH / DUALHASH HELPERS (v24 IMMORTAL INTEL)
// ============================================================================
function computeHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `h${h}`;
}

function computeHashIntelligence(payload) {
  const base = JSON.stringify(payload || "");
  let h = 0;
  for (let i = 0; i < base.length; i++) {
    const c = base.charCodeAt(i);
    h = (h * 131 + c * (i + 7)) % 1000000007;
  }
  return `HINTEL_${h}`;
}

function buildDualHashSignature(label, intelPayload, classicString) {
  const intelBase = {
    label,
    intel: intelPayload || {},
    classic: classicString || ""
  };
  const intelHash = computeHashIntelligence(intelBase);
  const classicHash = computeHash(`${label}::${classicString || ""}`);
  return {
    intel: intelHash,
    classic: classicHash
  };
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
  return buildDualHashSignature("PULSE_ROUTER_COSMOS", {}, raw);
}

// ============================================================================
// ANCESTRY HELPERS
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
  return computeHash(raw);
}

// ============================================================================
// DEGRADATION TIER HELPER
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
// FALLBACK DETERMINISTIC ROUTING (legacy spine → v16 surface)
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

  const routeDualHash = buildDualHashSignature(
    "PULSE_ROUTER_ROUTE",
    shape,
    JSON.stringify(shape)
  );

  const advantageDualHash = advantageField
    ? buildDualHashSignature(
        "PULSE_ROUTER_ADVANTAGE",
        advantageField,
        JSON.stringify(advantageField)
      )
    : null;

  const pulseIntelDualHash = pulseIntelligence
    ? buildDualHashSignature(
        "PULSE_ROUTER_PULSE_INTEL",
        pulseIntelligence,
        JSON.stringify(pulseIntelligence)
      )
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
// HEALING METADATA — Routing Health Log (v24 IMMORTAL INTEL++)
// ============================================================================
const routingHealing = {
  cycleCount: 0,

  lastPattern: null,
  lastTargetOrgan: null,
  lastSource: null,
  lastTier: null,
  lastCosmosSignature: null,
  lastLineageDepth: 0,
  lastPageId: null,

  lastPatternAncestry: null,
  lastLineageSignature: null,
  lastPageAncestrySignature: null,

  lastRoutingIntelSignatureIntel: null,
  lastRoutingIntelSignatureClassic: null
};

export function getPulseRouterHealingState() {
  return { ...routingHealing };
}

// ============================================================================
// INTEL WRAPPER — v24 dualhash routing‑intelligence envelope
// ============================================================================
function buildRoutingIntelDualHash({
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
  const routingIntelligence = computeRoutingIntelligence({
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
  });

  const cosmosSig = cosmosSignature(normalizeCosmos(cosmos));

  const intelPayload = {
    kind: "pulseRoutingIntelligence",
    version: "v24-IMMORTAL-INTEL++-DUALHASH",
    source,
    targetOrgan,
    tier,
    pattern,
    lineageDepth: (lineage && lineage.length) || 0,
    pageId,
    cosmos: normalizeCosmos(cosmos),
    cosmosSignature: cosmosSig,
    patternAncestry,
    lineageSignature,
    pageAncestrySignature,
    routingIntelligence
  };

  const classicString =
    `ROUTE::SRC:${source}` +
    `::ORG:${targetOrgan}` +
    `::TIER:${tier}` +
    `::PAT:${pattern}` +
    `::PAGE:${pageId}`;

  const sig = buildDualHashSignature(
    "PULSE_ROUTING_INTEL_v24",
    intelPayload,
    classicString
  );

  routingHealing.lastPattern = pattern;
  routingHealing.lastTargetOrgan = targetOrgan;
  routingHealing.lastSource = source;
  routingHealing.lastTier = tier;
  routingHealing.lastCosmosSignature = cosmosSig.classic;
  routingHealing.lastLineageDepth = (lineage && lineage.length) || 0;
  routingHealing.lastPageId = pageId;
  routingHealing.lastPatternAncestry = patternAncestry;
  routingHealing.lastLineageSignature = lineageSignature;
  routingHealing.lastPageAncestrySignature = pageAncestrySignature;
  routingHealing.lastRoutingIntelSignatureIntel = sig.intel;
  routingHealing.lastRoutingIntelSignatureClassic = sig.classic;
  routingHealing.cycleCount++;

  return {
    routingIntelligence,
    routingIntelSignatureIntel: sig.intel,
    routingIntelSignatureClassic: sig.classic
  };
}

// ============================================================================
// CORE EVOLUTION‑AWARE ROUTE TARGET (v16 logic + v24 INTEL surfaces)
// ============================================================================
function evolutionAwareRouteTarget_v24(pulse) {
  const pattern = pulse.pattern || "UNKNOWN_PATTERN";
  const cosmos = normalizeCosmos(pulse.cosmos || {});
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

    const { routingIntelligence, routingIntelSignatureIntel, routingIntelSignatureClassic } =
      buildRoutingIntelDualHash({
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
      routingIntelligence,
      routingIntelSignatureIntel,
      routingIntelSignatureClassic
    };
  }

  // 2) Instincts
  if (pulse.instinctsDecision?.targetOrgan) {
    const targetOrgan = pulse.instinctsDecision.targetOrgan;
    rememberSuccess(pattern, targetOrgan);

    const { routingIntelligence, routingIntelSignatureIntel, routingIntelSignatureClassic } =
      buildRoutingIntelDualHash({
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
      routingIntelligence,
      routingIntelSignatureIntel,
      routingIntelSignatureClassic
    };
  }

  // 3) Design
  if (pulse.designDecision?.targetOrgan) {
    const targetOrgan = pulse.designDecision.targetOrgan;
    rememberSuccess(pattern, targetOrgan);

    const { routingIntelligence, routingIntelSignatureIntel, routingIntelSignatureClassic } =
      buildRoutingIntelDualHash({
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
      routingIntelligence,
      routingIntelSignatureIntel,
      routingIntelSignatureClassic
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

    const { routingIntelligence, routingIntelSignatureIntel, routingIntelSignatureClassic } =
      buildRoutingIntelDualHash({
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
      routingIntelligence,
      routingIntelSignatureIntel,
      routingIntelSignatureClassic
    };
  }

  // 5) Fallback
  const fallbackTarget = fallbackRouteTarget(pulse);
  rememberSuccess(pattern, fallbackTarget);

  const { routingIntelligence, routingIntelSignatureIntel, routingIntelSignatureClassic } =
    buildRoutingIntelDualHash({
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
    routingIntelligence,
    routingIntelSignatureIntel,
    routingIntelSignatureClassic
  };
}

// ============================================================================
// PUBLIC API — PulseRouter (v24-IMMORTAL-INTEL++-DUALHASH)
// ============================================================================
export const PulseRouter = {

  PulseRole,

  route(pulse) {
    const pattern = pulse.pattern || "UNKNOWN_PATTERN";

    if (pulse.targetHint) {
      rememberSuccess(pattern, pulse.targetHint);
      return pulse.targetHint;
    }

    return evolutionAwareRouteTarget_v24(pulse).targetOrgan;
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

      const { routingIntelligence, routingIntelSignatureIntel, routingIntelSignatureClassic } =
        buildRoutingIntelDualHash({
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
        routingIntelligence,
        routingIntelSignatureIntel,
        routingIntelSignatureClassic
      };
    }

    return evolutionAwareRouteTarget_v24(pulse);
  },

  remember(pulse, target, status, healthScore = 1) {
    const pattern = pulse.pattern || "UNKNOWN_PATTERN";
    if (status === "success") rememberSuccess(pattern, target);
    else rememberFailure(pattern, target);
    return { pattern, target, status, healthScore };
  },

  diagnostics() {
    return {
      PulseRole,
      routingMemory,
      routingHealing: getPulseRouterHealingState()
    };
  }
};
