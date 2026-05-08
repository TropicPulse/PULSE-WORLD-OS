// ============================================================================
//  PulseEarnRouter-v16-IMMORTAL-INTEL-DualHash
//  EARN ROUTING ORGAN (Symbolic + Binary + Intel)
//  Deterministic Earn Routing • Pattern/Lineage/Page/Binary-Aware
//  + CoreMemory Integration: hot patterns/pages/binary surfaces
//  + DualHash Decision Keys + EarnIntel Surface
// ============================================================================

/*
AI_EXPERIENCE_META = {
  identity: "PulseRouterEarn",
  version: "v16-IMMORTAL-INTEL-DualHash",
  layer: "frontend",
  role: "earn_router",
  lineage: "PulseOS-v16",

  evo: {
    earnCore: true,
    advantageV2: true,
    dualBand: true,
    presenceAware: true,
    chunkAligned: true,
    safeRouteFree: true,
    deterministic: true,
    dualHashReady: true,
    intelReady: true,
    coreMemoryAware: true,
    binarySurfaceReady: true
  },

  contract: {
    always: [
      "PulseRouter",
      "PulseBinaryRouter",
      "PulseRouterCommandments",
      "PulsePresence",
      "PulseChunks"
    ],
    never: [
      "legacyEarnRouter",
      "legacyRouter",
      "safeRoute",
      "fetchViaCNS"
    ]
  }
}
*/

import { createPulseCoreMemory } from "../PULSE-CORE/PulseCoreMemory-v20.js";

export const PulseEarnRole = {
  type: "EarnRouter",
  subsystem: "PulseEarn",
  layer: "Routing",
  version: "16.0-IMMORTAL-INTEL-DualHash",
  identity: "PulseEarnRouter-v16-IMMORTAL-INTEL-DualHash",

  evo: {
    driftProof: true,
    patternAware: true,
    lineageAware: true,
    pageAware: true,
    deterministicRouting: true,
    unifiedAdvantageField: true,
    loopTheoryAware: true,

    binaryAware: true,
    coreMemoryAware: true,
    hotPatternAware: true,
    hotPageAware: true,
    hotBinarySurfaceAware: true,

    dualHashReady: true,
    intelReady: true
  },

  loopTheory: {
    routingCompletion: true,
    allowLoopfieldPropulsion: true,
    pulseComputeContinuity: true,
    errorRouteAround: true
  },

  earnContract: "PulseEarn-v16",
  sendContract: "PulseSend-v16"
};


// ============================================================================
//  CORE MEMORY — hot caching / presence
// ============================================================================
const CoreMemory = createPulseCoreMemory();
const ROUTE = "earn-router-global";

const KEY_LAST_DECISION = "last-decision";
const KEY_LAST_PULSE_SURFACE = "last-pulse-surface";
const KEY_HOT_PATTERNS = "hot-patterns";
const KEY_HOT_PAGES = "hot-pages";
const KEY_HOT_BINARY = "hot-binary-patterns";

function trackPattern(pattern) {
  if (!pattern) return;
  const hot = CoreMemory.get(ROUTE, KEY_HOT_PATTERNS) || {};
  hot[pattern] = (hot[pattern] || 0) + 1;
  CoreMemory.set(ROUTE, KEY_HOT_PATTERNS, hot);
}

function trackPage(pageId) {
  if (!pageId) return;
  const hot = CoreMemory.get(ROUTE, KEY_HOT_PAGES) || {};
  hot[pageId] = (hot[pageId] || 0) + 1;
  CoreMemory.set(ROUTE, KEY_HOT_PAGES, hot);
}

function trackBinary(binary) {
  if (!binary || !binary.hasBinary) return;
  const key = binary.binaryPattern || binary.binaryMode || "generic-binary";
  const hot = CoreMemory.get(ROUTE, KEY_HOT_BINARY) || {};
  hot[key] = (hot[key] || 0) + 1;
  CoreMemory.set(ROUTE, KEY_HOT_BINARY, hot);
}

function storeDecision(decision, pulseSurface) {
  CoreMemory.set(ROUTE, KEY_LAST_DECISION, decision);
  CoreMemory.set(ROUTE, KEY_LAST_PULSE_SURFACE, pulseSurface);
  trackPattern(pulseSurface.pattern);
  trackPage(pulseSurface.pageId);
  trackBinary(pulseSurface.binary);
}


// ============================================================================
//  HELPERS — symbolic ancestry
// ============================================================================
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

  const shape = {
    pattern: safePattern,
    patternAncestry: buildPatternAncestry(safePattern),
    lineageSignature: buildLineageSignature(safeLineage),
    pageId: safePageId
  };

  let raw = JSON.stringify(shape);
  let hash = 0;
  for (let i = 0; i < raw.length; i++) {
    hash = (hash << 5) - hash + raw.charCodeAt(i);
    hash |= 0;
  }
  return (hash >>> 0).toString(16);
}


// ============================================================================
//  HELPERS — binary ancestry (optional)
// ============================================================================
function extractBinarySurface(payload = {}) {
  const binaryPattern  = payload.binaryPattern || null;
  const binaryMode     = payload.binaryMode || null;
  const binaryPayload  = payload.binaryPayload || null;
  const binaryHints    = payload.binaryHints || null;
  const binaryStrength = typeof payload.binaryStrength === "number"
    ? payload.binaryStrength
    : null;

  const hasBinary =
    !!binaryPattern ||
    !!binaryMode ||
    !!binaryPayload ||
    !!binaryHints ||
    binaryStrength !== null;

  return {
    hasBinary,
    binaryPattern,
    binaryMode,
    binaryPayload,
    binaryHints,
    binaryStrength
  };
}


// ============================================================================
//  HASH / DUALHASH HELPERS (Earn Decision)
// ============================================================================
function hash131(raw) {
  let h = 0;
  const s = String(raw);
  for (let i = 0; i < s.length; i++) {
    h = (h * 131 + s.charCodeAt(i)) >>> 0;
  }
  return h >>> 0;
}

function hash257(raw) {
  let h = 1;
  const s = String(raw);
  for (let i = 0; i < s.length; i++) {
    h = (h * 257 + s.charCodeAt(i)) >>> 0;
  }
  return h >>> 0;
}

function computeDualHashEarnDecision(shape) {
  const raw = JSON.stringify(shape);
  const h1 = hash131(raw);
  const h2 = hash257(raw);
  const combined = hash131(`${h1.toString(16)}::${h2.toString(16)}`);
  return {
    primary: `ed16-p${h1.toString(16)}`,
    secondary: `ed16-s${h2.toString(16)}`,
    combined: `ed16-c${combined.toString(16)}`
  };
}


// ============================================================================
//  DEGRADATION TIER
// ============================================================================
function classifyDegradationTier(healthScore) {
  const h = typeof healthScore === "number" ? healthScore : 1.0;
  if (h >= 0.95) return "microDegrade";
  if (h >= 0.85) return "softDegrade";
  if (h >= 0.50) return "midDegrade";
  if (h >= 0.15) return "hardDegrade";
  return "criticalDegrade";
}


// ============================================================================
//  DETERMINISTIC EARN PATH SELECTION (Symbolic + Binary)
// ============================================================================
function chooseEarnPath(pulse) {
  const pattern = pulse.pattern || "UNKNOWN_PATTERN";
  const health = pulse.healthScore ?? 1;

  const binary = extractBinarySurface(pulse.payload || {});

  if (binary.hasBinary && binary.binaryHints?.organHint) {
    return binary.binaryHints.organHint;
  }

  const raw = `${pattern}::${health}`;
  let acc = 0;
  for (let i = 0; i < raw.length; i++) {
    acc = (acc + raw.charCodeAt(i) * (i + 7)) % 7919;
  }

  const paths = ["earn-core", "earn-cache", "earn-os-fallback"];
  return paths[acc % paths.length];
}


// ============================================================================
//  EARN INTEL SURFACE (IMMORTAL v16)
// ============================================================================
function buildEarnIntel(pulse, decisionShape) {
  const healthScore = typeof pulse.healthScore === "number"
    ? pulse.healthScore
    : 1.0;

  const tier = classifyDegradationTier(healthScore);

  const advantageField = pulse.advantageField || null;
  const pulseCompute   = pulse.pulseCompute || null;

  const solvednessScore =
    pulseCompute && typeof pulseCompute.solvednessScore === "number"
      ? pulseCompute.solvednessScore
      : null;

  const computeTier =
    pulseCompute && typeof pulseCompute.computeTier === "string"
      ? pulseCompute.computeTier
      : null;

  const factoringSignal =
    pulseCompute && typeof pulseCompute.factoringSignal === "string"
      ? pulseCompute.factoringSignal
      : null;

  const dualHash = computeDualHashEarnDecision(decisionShape);

  return {
    healthScore,
    tier,
    advantageField,
    pulseCompute,
    solvednessScore,
    computeTier,
    factoringSignal,
    dualHash
  };
}


// ============================================================================
//  INTERNAL — pure decision builder (no CoreMemory side effects)
// ============================================================================
function buildEarnDecision(pulse) {
  const pattern = pulse.pattern || "UNKNOWN_PATTERN";
  const lineage = Array.isArray(pulse.lineage) ? pulse.lineage.slice() : [];
  const pageId = pulse.pageId || "NO_PAGE";

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
      : buildPageAncestrySignature({ pattern, lineage, pageId });

  const binary = extractBinarySurface(pulse.payload || {});
  const tier = classifyDegradationTier(pulse.healthScore ?? 1);

  const targetPath = chooseEarnPath(pulse);

  const decisionShape = {
    targetPath,
    tier,
    pattern,
    patternAncestry,
    lineage,
    lineageSignature,
    pageId,
    pageAncestrySignature,
    binary
  };

  const earnIntel = buildEarnIntel(pulse, decisionShape);

  return {
    decision: {
      targetPath,
      tier,

      pattern,
      patternAncestry,
      lineage,
      lineageSignature,
      pageId,
      pageAncestrySignature,

      binary,

      loopTheory: { ...PulseEarnRole.loopTheory },

      earnIntel
    },
    surface: {
      pattern,
      patternAncestry,
      lineage,
      lineageSignature,
      pageId,
      pageAncestrySignature,
      binary,
      earnIntel
    }
  };
}


// ============================================================================
//  PUBLIC API — PulseEarnRouter (DualStack + CoreMemory + INTEL + DualHash)
// ============================================================================
export const PulseEarnRouter = {

  PulseEarnRole,

  routeEarn(pulse) {
    CoreMemory.prewarm();

    const { decision, surface } = buildEarnDecision(pulse);
    storeDecision(decision, surface);

    return decision;
  },

  getEarnRoutingState() {
    CoreMemory.prewarm();

    return {
      lastDecision: CoreMemory.get(ROUTE, KEY_LAST_DECISION),
      lastPulseSurface: CoreMemory.get(ROUTE, KEY_LAST_PULSE_SURFACE),
      hotPatterns: CoreMemory.get(ROUTE, KEY_HOT_PATTERNS),
      hotPages: CoreMemory.get(ROUTE, KEY_HOT_PAGES),
      hotBinaryPatterns: CoreMemory.get(ROUTE, KEY_HOT_BINARY)
    };
  },

  CoreMemory
};
