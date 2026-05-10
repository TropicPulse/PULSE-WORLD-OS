// ============================================================================
// FILE: PulseEarnRouter-v24-IMMORTAL-INTEL++-DualHash.js
// [pulse:earn] ROUTING LAYER — v24‑IMMORTAL‑INTEL++
// ----------------------------------------------------------------------------
// ROLE:
//   • Deterministic Earn routing spine (pattern/lineage/page/binary aware).
//   • Upgrades v16 EarnRouter to v24 IMMORTAL INTEL++ dualhash surfaces.
//   • Uses PulseCoreMemory v24 for hot‑pattern / hot‑page / hot‑binary tracking.
//   • Emits full INTEL routing envelope + healing state.
// ----------------------------------------------------------------------------
// SAFETY CONTRACT (IMMORTAL v24‑INTEL):
//   • No randomness, no timestamps, no async, no network, no filesystem.
//   • No mutation of pulse input; only CoreMemory + internal healing state.
//   • Deterministic‑field: identical input → identical routing decision.
//   • Zero eval, zero dynamic imports, zero user code.
// ============================================================================
import {
  OrganismIdentity,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PulseWorldOrganismMap-v21.js";
const Identity = OrganismIdentity(import.meta.url);

// 2 — EXPORT GENOME METADATA
// export const PulseMeshMeta = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const PulseEarnRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
// export const WBC_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

import { createPulseCoreMemory } from "../PULSE-CORE/PulseCoreMemory-v24.js";

// ============================================================================
// CORE MEMORY + KEYS
// ============================================================================
const CoreMemory = createPulseCoreMemory();
const ROUTE = "earn-router-global-v24";

const KEY_LAST_DECISION = "last-decision";
const KEY_LAST_PULSE_SURFACE = "last-pulse-surface";
const KEY_HOT_PATTERNS = "hot-patterns";
const KEY_HOT_PAGES = "hot-pages";
const KEY_HOT_BINARY = "hot-binary-patterns";

// ============================================================================
// HASH / DUALHASH HELPERS — v24 IMMORTAL INTEL
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
// HEALING METADATA — Earn Routing Health Log (v24 IMMORTAL INTEL++)
// ============================================================================
const earnRoutingHealing = {
  cycleCount: 0,

  lastPattern: null,
  lastTier: null,
  lastTargetPath: null,

  lastPageId: null,
  lastPatternAncestry: null,
  lastLineageSignature: null,
  lastPageAncestrySignature: null,

  lastBinarySurface: null,

  lastIntelSignatureIntel: null,
  lastIntelSignatureClassic: null
};

export function getPulseEarnRoutingHealingState() {
  return { ...earnRoutingHealing };
}

// ============================================================================
// HOT TRACKING HELPERS
// ============================================================================
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

  const raw = JSON.stringify(shape);
  return computeHash(raw);
}

// ============================================================================
// BINARY SURFACE EXTRACTION
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
// DEGRADATION TIER
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
// PATH SELECTION — deterministic Earn path
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
// INTEL SURFACE — v24 dualhash Earn routing INTEL
// ============================================================================
function buildEarnIntel(pulse, decisionShape) {
  const healthScore =
    typeof pulse.healthScore === "number" ? pulse.healthScore : 1.0;

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

  const intelPayload = {
    kind: "earnRoutingDecision",
    version: "v24-IMMORTAL-INTEL++-DualHash",
    decisionShape,
    healthScore,
    tier,
    advantageField,
    pulseCompute,
    solvednessScore,
    computeTier,
    factoringSignal
  };

  const classicString =
    `EARN_ROUTE::PATH:${decisionShape.targetPath}` +
    `::TIER:${tier}` +
    `::PAT:${decisionShape.pattern}` +
    `::PAGE:${decisionShape.pageId}`;

  const dualSig = buildDualHashSignature(
    "PULSE_EARN_ROUTING_v24",
    intelPayload,
    classicString
  );

  earnRoutingHealing.lastIntelSignatureIntel = dualSig.intel;
  earnRoutingHealing.lastIntelSignatureClassic = dualSig.classic;

  return {
    healthScore,
    tier,
    advantageField,
    pulseCompute,
    solvednessScore,
    computeTier,
    factoringSignal,
    dualHash: dualSig
  };
}

// ============================================================================
// DECISION BUILDER — full v24 Earn routing surface
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

  earnRoutingHealing.cycleCount++;
  earnRoutingHealing.lastPattern = pattern;
  earnRoutingHealing.lastTier = tier;
  earnRoutingHealing.lastTargetPath = targetPath;
  earnRoutingHealing.lastPageId = pageId;
  earnRoutingHealing.lastPatternAncestry = patternAncestry;
  earnRoutingHealing.lastLineageSignature = lineageSignature;
  earnRoutingHealing.lastPageAncestrySignature = pageAncestrySignature;
  earnRoutingHealing.lastBinarySurface = binary;

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
// PUBLIC API — PulseEarnRouter v24 IMMORTAL INTEL++
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
      hotBinaryPatterns: CoreMemory.get(ROUTE, KEY_HOT_BINARY),
      healing: getPulseEarnRoutingHealingState()
    };
  },

  CoreMemory
};
