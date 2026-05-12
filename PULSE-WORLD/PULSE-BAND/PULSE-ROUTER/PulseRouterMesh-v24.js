// ============================================================================
//  PulseMeshRouter-v24-IMMORTAL-INTEL-TriHash — MESH ROUTING ORGAN 24++
//  Symbolic + Binary + Presence + CacheChunk + Cosmos + AdvantageField
//  IntelDualHash + TriHash • Deterministic Mesh Path Selection
//  Pattern/Lineage/Page/Binary/Presence/Cache/Cosmos-Aware • Drift-Proof
// ============================================================================
import {
  OrganismIdentity,
  buildPulseOrganismMap as PulseOrganismMap,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PULSE-WORLD-MAP.js";
const Identity = OrganismIdentity(import.meta.url);

// 2 — EXPORT GENOME METADATA
// export const PulseMeshMeta = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const PulseMeshRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
// export const WBC_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;
// ============================================================================
// IMPORT SURFACE — Router Mesh Unit (v24++)
// ============================================================================
import * as PulseRouterEvolutionaryDesign     from "./PulseRouterEvolutionaryDesign-v24.js";
import * as PulseRouterEvolutionaryInstincts  from "./PulseRouterEvolutionaryInstincts-v24.js";
import * as PulseRouterEvolutionaryThought    from "./PulseRouterEvolutionaryThought-v24.js";

import { PulseRouter }                        from "./PulseRouter-v24.js";
import { createBinaryRouter }                 from "./PulseRouterBinary-v24.js";
import { PulseRouterCommandments }            from "./PulseRouterCommandments-v24.js";
import { PulseEarnRouter }                    from "./PulseRouterEarn-v24.js";

import { createPulseCoreMemory }              from "../PULSE-CORE/PulseCoreMemory-v24.js";
import { createPulseMeshPresenceRelay as PulseMeshPresenceRelay } from "../PULSE-MESH/PulseMeshPresenceRelay-v24.js";

// ============================================================================
//  CORE MEMORY (mesh-level intel / prewarm)
// ============================================================================
const MeshCoreMemory = createPulseCoreMemory();
const MESH_ROUTE = "mesh-router-global";

const KEY_LAST_DECISION   = "mesh-last-decision";
const KEY_LAST_SURFACE    = "mesh-last-surface";
const KEY_HOT_PATTERNS    = "mesh-hot-patterns";
const KEY_HOT_PAGES       = "mesh-hot-pages";
const KEY_HOT_BINARY      = "mesh-hot-binary";
const KEY_HOT_PATHS       = "mesh-hot-paths";
const KEY_HOT_COSMOS      = "mesh-hot-cosmos";

function trackMeshPattern(pattern) {
  if (!pattern) return;
  const hot = MeshCoreMemory.get(MESH_ROUTE, KEY_HOT_PATTERNS) || {};
  hot[pattern] = (hot[pattern] || 0) + 1;
  MeshCoreMemory.set(MESH_ROUTE, KEY_HOT_PATTERNS, hot);
}

function trackMeshPage(pageId) {
  if (!pageId) return;
  const hot = MeshCoreMemory.get(MESH_ROUTE, KEY_HOT_PAGES) || {};
  hot[pageId] = (hot[pageId] || 0) + 1;
  MeshCoreMemory.set(MESH_ROUTE, KEY_HOT_PAGES, hot);
}

function trackMeshBinary(binary) {
  if (!binary || !binary.hasBinary) return;
  const key = binary.binaryPattern || binary.binaryMode || "generic-binary";
  const hot = MeshCoreMemory.get(MESH_ROUTE, KEY_HOT_BINARY) || {};
  hot[key] = (hot[key] || 0) + 1;
  MeshCoreMemory.set(MESH_ROUTE, KEY_HOT_BINARY, hot);
}

function trackMeshPath(path) {
  if (!path) return;
  const hot = MeshCoreMemory.get(MESH_ROUTE, KEY_HOT_PATHS) || {};
  hot[path] = (hot[path] || 0) + 1;
  MeshCoreMemory.set(MESH_ROUTE, KEY_HOT_PATHS, hot);
}

function trackMeshCosmos(cosmosSig) {
  if (!cosmosSig) return;
  const hot = MeshCoreMemory.get(MESH_ROUTE, KEY_HOT_COSMOS) || {};
  hot[cosmosSig] = (hot[cosmosSig] || 0) + 1;
  MeshCoreMemory.set(MESH_ROUTE, KEY_HOT_COSMOS, hot);
}

function storeMeshDecision(decision, surface) {
  MeshCoreMemory.set(MESH_ROUTE, KEY_LAST_DECISION, decision);
  MeshCoreMemory.set(MESH_ROUTE, KEY_LAST_SURFACE, surface);
  trackMeshPattern(surface.pattern);
  trackMeshPage(surface.pageId);
  trackMeshBinary(surface.binary);
  trackMeshPath(decision.meshPath);
  trackMeshCosmos(surface.cosmosSignature);
}


// ============================================================================
//  HELPERS — stable stringify + hash
// ============================================================================
function stableStringify(value) {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return "[" + value.map(stableStringify).join(",") + "]";
  const keys = Object.keys(value).sort();
  return (
    "{" +
    keys.map((k) => JSON.stringify(k) + ":" + stableStringify(value[k])).join(",") +
    "}"
  );
}

function simpleHash32(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return (hash >>> 0) >>> 0;
}

function simpleHash(str) {
  return simpleHash32(str).toString(16);
}

function clamp01(v) {
  if (typeof v !== "number" || Number.isNaN(v)) return 0;
  if (v < 0) return 0;
  if (v > 1) return 1;
  return v;
}


// ============================================================================
//  COSMOS HELPERS — v24 IMMORTAL
// ============================================================================
function normalizeCosmos(cosmos = {}) {
  return {
    universeId: cosmos.universeId || "u:default",
    timelineId: cosmos.timelineId || "t:main",
    branchId: cosmos.branchId || "b:root",
    worldId: cosmos.worldId || "w:primary",
    shardId: cosmos.shardId || "s:0"
  };
}

function cosmosSignature(cosmos) {
  const raw = `${cosmos.universeId}|${cosmos.timelineId}|${cosmos.branchId}|${cosmos.worldId}|${cosmos.shardId}`;
  let h = 0;
  for (let i = 0; i < raw.length; i++) {
    h = (h * 31 + raw.charCodeAt(i)) >>> 0;
  }
  return `cx24-${h.toString(16)}`;
}


// ============================================================================
//  INTEL DUALHASH + TRIHASH HELPERS (Mesh Decision)
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

function computeDualHashMeshDecision(shape) {
  const raw = stableStringify(shape || {});
  const h1 = hash131(raw);
  const h2 = hash257(raw);
  const combined = hash131(`${h1.toString(16)}::${h2.toString(16)}`);
  return {
    primary: `md24-p${h1.toString(16)}`,
    secondary: `md24-s${h2.toString(16)}`,
    combined: `md24-c${combined.toString(16)}`
  };
}

function intelDualHash(shape) {
  const raw = stableStringify(shape || {});
  const mid = Math.floor(raw.length / 2);

  const left = raw.slice(0, mid);
  const right = raw.slice(mid);

  const h1 = simpleHash32(left);
  const h2 = simpleHash32(right);

  const hi = (BigInt(h1) << 32n) | BigInt(h2);
  const lo = BigInt(simpleHash32(raw));

  const combined = (hi ^ (lo << 1n)) & ((1n << 96n) - 1n);

  const hiHex = hi.toString(16);
  const loHex = combined.toString(16);

  return {
    primary: `idh24-${hiHex}`,
    secondary: `idh24s-${loHex}`,
    hi,
    lo
  };
}

function triHash(shape) {
  const raw = stableStringify(shape || {});
  const len = raw.length || 1;
  const third = Math.floor(len / 3);

  const a = raw.slice(0, third);
  const b = raw.slice(third, 2 * third);
  const c = raw.slice(2 * third);

  const hA = simpleHash32(a);
  const hB = simpleHash32(b);
  const hC = simpleHash32(c);

  const hi = (BigInt(hA) << 32n) | BigInt(hB);
  const mid = BigInt(hC);
  const lo = BigInt(simpleHash32(raw));

  const combined = (hi ^ (mid << 16n) ^ (lo << 1n)) & ((1n << 112n) - 1n);

  return {
    triPrimary: `th24-${combined.toString(16)}`,
    hi,
    mid,
    lo
  };
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

function buildPageAncestrySignature({ pattern, lineage, pageId, cosmos }) {
  const safePattern = typeof pattern === "string" ? pattern : "";
  const safeLineage = Array.isArray(lineage) ? lineage : [];
  const safePageId = pageId || "NO_PAGE";

  const shape = {
    pattern: safePattern,
    patternAncestry: buildPatternAncestry(safePattern),
    lineageSignature: buildLineageSignature(safeLineage),
    pageId: safePageId,
    cosmosSignature: cosmosSignature(cosmos)
  };

  return simpleHash(stableStringify(shape));
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
//  CACHE / PREWARM / PRESENCE SCOPE
// ============================================================================
function buildCacheChunkKey({ pattern, lineage, pageId, binary, cosmos }) {
  const shape = {
    pattern,
    lineage,
    pageId,
    binaryPattern: binary.binaryPattern,
    binaryMode: binary.binaryMode,
    cosmosSignature: cosmosSignature(cosmos)
  };
  return "mesh-cache::" + simpleHash(stableStringify(shape));
}

function buildPrewarmHint({ pattern, pageId, binary, cosmos }) {
  const base = {
    pattern,
    pageId,
    hasBinary: binary.hasBinary,
    binaryPattern: binary.binaryPattern,
    cosmosSignature: cosmosSignature(cosmos)
  };
  const hash = simpleHash(stableStringify(base));
  const bucket = parseInt(hash.slice(0, 2), 16) % 3;

  const level = bucket === 0 ? "light" : bucket === 1 ? "aggressive" : "none";
  return {
    level,
    hintKey: "mesh-prewarm::" + hash
  };
}

function buildPresenceScope({ pattern, pageId, binary, cosmos }) {
  if (binary.hasBinary && binary.binaryPattern) {
    const key =
      "mesh-presence::page::" +
      simpleHash(
        `${pattern}::${pageId}::${binary.binaryPattern}::${cosmosSignature(
          cosmos
        )}`
      );
    return { scope: "page", presenceKey: key };
  }

  const key = "mesh-presence::local::" +
    simpleHash(`${pattern}::${pageId}::${cosmosSignature(cosmos)}`);
  return { scope: "local", presenceKey: key };
}


// ============================================================================
//  ADVANTAGE FIELD (mesh-level view)
// ============================================================================
function computeMeshAdvantageField(pulse = {}, meshShape = {}, cosmos = {}) {
  if (typeof pulse.advantageField === "number") {
    return clamp01(pulse.advantageField);
  }

  const healthScore =
    typeof pulse.healthScore === "number" ? clamp01(pulse.healthScore) : 1.0;

  const lineageDepth = Array.isArray(pulse.lineage)
    ? pulse.lineage.length
    : 0;

  const patternStrength =
    typeof pulse.pattern === "string" ? Math.min(64, pulse.pattern.length) : 8;

  const binary = extractBinarySurface(pulse.payload || {});
  const binaryBoost = binary.hasBinary ? 0.8 : 0.5;

  const cx = normalizeCosmos(pulse.cosmos || cosmos || {});
  const cosmosStability = cx.universeId === "u:default" ? 0.9 : 0.8;

  const base =
    healthScore * 0.4 +
    clamp01(lineageDepth / 16) * 0.2 +
    clamp01(patternStrength / 64) * 0.2 +
    cosmosStability * 0.2;

  const adv = base * 0.75 + binaryBoost * 0.25;
  return clamp01(adv);
}


// ============================================================================
//  MESH INTEL SURFACE (IMMORTAL v24)
// ============================================================================
function buildMeshIntel(pulse, meshShape, cosmos) {
  const healthScore = typeof pulse.healthScore === "number"
    ? pulse.healthScore
    : 1.0;

  const tier = classifyDegradationTier(healthScore);

  const advantageField =
    computeMeshAdvantageField(pulse, meshShape, cosmos);

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

  const dualHash = computeDualHashMeshDecision(meshShape);
  const intelHash = intelDualHash(meshShape);
  const tri = triHash(meshShape);

  return {
    healthScore,
    tier,
    advantageField,
    pulseCompute,
    solvednessScore,
    computeTier,
    factoringSignal,
    dualHash,
    intelHash,
    triHash: tri
  };
}


// ============================================================================
//  DETERMINISTIC MESH PATH SELECTION (Symbolic + Binary)
// ============================================================================
function chooseMeshPath(pulse, cosmos) {
  const binary = extractBinarySurface(pulse.payload || {});

  if (binary.hasBinary && binary.binaryHints?.meshHint) {
    return binary.binaryHints.meshHint;
  }

  const pattern = pulse.pattern || "UNKNOWN_PATTERN";
  const lineageDepth = Array.isArray(pulse.lineage) ? pulse.lineage.length : 0;
  const cxSig = cosmosSignature(normalizeCosmos(pulse.cosmos || cosmos || {}));

  const raw = `${pattern}::${lineageDepth}::${cxSig}`;
  let acc = 0;
  for (let i = 0; i < raw.length; i++) {
    acc = (acc + raw.charCodeAt(i) * (i + 11)) % 12289;
  }

  const paths = [
    "mesh-local",
    "mesh-remote",
    "mesh-os-fallback",
    "mesh-cosmos-lane"
  ];
  return paths[acc % paths.length];
}


// ============================================================================
//  INTERNAL — pure mesh decision builder
// ============================================================================
function buildMeshDecision(pulse) {
  const cosmos = normalizeCosmos(pulse.cosmos || {});
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
      : buildPageAncestrySignature({ pattern, lineage, pageId, cosmos });

  const binary = extractBinarySurface(pulse.payload || {});
  const tier = classifyDegradationTier(pulse.healthScore ?? 1);

  const meshPath = chooseMeshPath(pulse, cosmos);

  const cacheChunkKey = buildCacheChunkKey({
    pattern,
    lineage,
    pageId,
    binary,
    cosmos
  });

  const prewarmHint = buildPrewarmHint({
    pattern,
    pageId,
    binary,
    cosmos
  });

  const presenceScope = buildPresenceScope({
    pattern,
    pageId,
    binary,
    cosmos
  });

  const meshShape = {
    meshPath,
    tier,
    pattern,
    patternAncestry,
    lineage,
    lineageSignature,
    pageId,
    pageAncestrySignature,
    binary,
    cacheChunkKey,
    prewarmHint,
    presenceScope,
    cosmosSignature: cosmosSignature(cosmos)
  };

  const meshIntel = buildMeshIntel(pulse, meshShape, cosmos);

  return {
    decision: {
      ...meshShape,
      loopTheory: { ...PulseMeshRole.loopTheory },
      meshIntel
    },
    surface: {
      pattern,
      patternAncestry,
      lineage,
      lineageSignature,
      pageId,
      pageAncestrySignature,
      binary,
      cacheChunkKey,
      prewarmHint,
      presenceScope,
      cosmosSignature: cosmosSignature(cosmos),
      meshIntel
    }
  };
}


// ============================================================================
//  PUBLIC API — PulseMeshRouter (v24 IMMORTAL INTEL TriHash)
// ============================================================================
export const PulseMeshRouter = {

  PulseMeshRole,
  MeshCoreMemory,
  PulseRouter,
  PulseRouterEvolutionaryDesign,
  PulseRouterEvolutionaryInstincts,
  PulseRouterEvolutionaryThought,
  PulseRouterCommandments,
  PulseEarnRouter,
  createBinaryRouter,
  PulseMeshPresenceRelay,

  routeMesh(pulse) {
    MeshCoreMemory.prewarm();

    const { decision, surface } = buildMeshDecision(pulse);
    storeMeshDecision(decision, surface);

    return decision;
  },

  getMeshRoutingState() {
    MeshCoreMemory.prewarm();

    return {
      lastDecision: MeshCoreMemory.get(MESH_ROUTE, KEY_LAST_DECISION),
      lastSurface: MeshCoreMemory.get(MESH_ROUTE, KEY_LAST_SURFACE),
      hotPatterns: MeshCoreMemory.get(MESH_ROUTE, KEY_HOT_PATTERNS),
      hotPages: MeshCoreMemory.get(MESH_ROUTE, KEY_HOT_PAGES),
      hotBinaryPatterns: MeshCoreMemory.get(MESH_ROUTE, KEY_HOT_BINARY),
      hotPaths: MeshCoreMemory.get(MESH_ROUTE, KEY_HOT_PATHS),
      hotCosmos: MeshCoreMemory.get(MESH_ROUTE, KEY_HOT_COSMOS)
    };
  }
};
