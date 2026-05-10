// ============================================================================
//  PulseProxy-v20-Immortal-ABA-ADVANTAGE-SYMBOLIC.js
//  PROXY ORGANISM v20 IMMORTAL (SYMBOLIC EDITION, 20++ ADVANTAGE)
//  Evolutionary Proxy Organ • Pattern + Lineage + Shape • Route-Assist
//  v20++: Dual-band organism snapshot + unified advantage field +
//         presence/harmonics + cache/chunk/prewarm/memory envelopes +
//         CNS/SDN/Spine/Impulse envelopes + Proxy Mode addon (OS-level tap).
// ============================================================================
//
//  SAFETY CONTRACT (v20-Immortal-ABA-ADVANTAGE-SYMBOLIC):
//  ------------------------------------------------------
//  • No randomness.
//  • No symbolic routing decisions (proxy is organism snapshot, not router).
//  • Pure deterministic string/shape operations for organism math.
//  • Zero mutation outside instance.
//  • Memory / diagnostics / maintenance are structural only.
//  • Proxy Mode is addon-only: tap-only, no routing, no OS logic here.
//  • No network, no filesystem, no dynamic imports, no eval.
// ============================================================================
import {
  OrganismIdentity,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PulseWorldOrganismMap-v24.js";
const Identity = OrganismIdentity(import.meta.url);

// 2 — EXPORT GENOME METADATA
// export const PulseMeshMeta = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const ProxyRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
// export const PULSE_EARN_IMMUNE_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;
import PulseProxyHeart from "./PulseProxyHeart-v20.js";
import PulseProxyBloodPressure from "./PulseProxyBloodPressure-v20.js";
import PulseProxyCirculatorySystem from "./PulseProxyCirculatorySystem-v20.js";

import PulseProxyHypothalamus from "./PulseProxyHypothalamus-v20.js";
import PulseProxySpine from "./PulseProxySpine-v20.js";

import pulseband from "./PulseProxyPNSNervousSystem-v20.js";   // PNS
import PulseProxySynapse from "./PulseProxySynapse-v20.js";    // Synapse junctions

import { PulseClient, PulseNet, PULSE_LIMBIC_SHADOW_META } from "./PulseProxyLimbic-v20.js";

import {
  scanUserScoresForInstanceHints,
  checkProxyHealthAndMetrics
} from "./PulseProxyWBCells-v20.js";

import {
  cleanupSessionsBefore,
  cleanupErrorsBefore,
  cleanupRedownloadsBefore
} from "./PulseProxyPNSPurifier-v20.js";

import PulseProxyOuterAgent from "./PulseProxyOuterAgent-v20.js";
import createPulseProxyInnerAgent from "./PulseProxyInnerAgent-v20.js";

import PulseProxyImpulse from "./PulseProxyImpulse-v20.js";

import PulseProxyBloodstream from "./PulseProxyBloodstream-v20.js";

import PulseProxyAdrenalSystem from "./PulseProxyAdrenalSystem-v20.js";

import PulseProxyBBB from "./PulseProxyBBB-v20.js";

import pulseHistoryRepair from "./PulseProxyPNSRepair-v20.js";

import {
  PulseNetBoot,
  PulseProofBridge
} from "../../PULSE-UI/_BACKEND/PULSE-WORLD-BRIDGE.js";

// --- PULSE-CORE MEMORY SPINE (FULL SPINE) ----------------------------------
import PulseCoreMemory from "../PULSE-CORE/PulseCoreMemory-v24.js";
import PulseCoreAIMemoryAdapter from "../PULSE-CORE/PulseCoreAIMemoryAdapter-v20.js";
import PulseCoreProxyMemoryAdapter from "../PULSE-CORE/PulseCoreProxyMemoryAdapter-v20.js";
import PulseBinaryCoreOverlay from "../PULSE-CORE/PulseBinaryCoreOverlay-v20.js";

// CoreMemory bridge: structural, deterministic, keyed by memory surfaces.
export const CoreMemory = Object.freeze({
  raw: () => PulseCoreMemory,
  all: () => PulseCoreAIMemoryAdapter,
  proxy: () => PulseCoreProxyMemoryAdapter,
  binaryOverlay: () => PulseBinaryCoreOverlay
});


// ============================================================================
//  INTERNAL HELPERS — deterministic, tiny, pure
// ============================================================================
function buildLineage(parentLineage, pattern) {
  const base = Array.isArray(parentLineage) ? parentLineage : [];
  return [...base, pattern];
}

function computeShapeSignature(pattern, lineage) {
  const lineageKey = lineage.join("::");
  const raw = `${pattern}::${lineageKey}`;

  let acc = 0;
  for (let i = 0; i < raw.length; i++) {
    acc = (acc + raw.charCodeAt(i) * (i + 1)) % 100000;
  }

  return `proxy-shape-${acc}`;
}

function computeEvolutionStage(pattern, lineage) {
  const depth = lineage.length;

  if (depth === 1) return "seed";
  if (depth === 2) return "sprout";
  if (depth === 3) return "branch";

  if (pattern.includes("router")) return "router-aware";
  if (pattern.includes("mesh")) return "mesh-aware";
  if (pattern.includes("send")) return "send-aware";

  return "mature";
}

function evolvePattern(pattern, context = {}) {
  const { routerHint, meshHint, sendHint } = context;

  const parts = [pattern];

  if (routerHint) parts.push(`r:${routerHint}`);
  if (meshHint) parts.push(`m:${meshHint}`);
  if (sendHint) parts.push(`s:${sendHint}`);

  return parts.join("|");
}

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
    const chr = raw.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return (hash >>> 0).toString(16);
}

function computeHealthScore(pattern, lineage) {
  const base = 0.7 + Math.min(
    0.3,
    lineage.length * 0.02 + pattern.length * 0.001
  );
  return Math.max(0.15, Math.min(1.0, base));
}

function classifyDegradationTier(h) {
  if (h >= 0.95) return "microDegrade";
  if (h >= 0.85) return "softDegrade";
  if (h >= 0.50) return "midDegrade";
  if (h >= 0.15) return "hardDegrade";
  return "criticalDegrade";
}

function buildAdvantageField(pattern, lineage) {
  return {
    lineageDepth: lineage.length,
    patternStrength: pattern.length,
    shapeComplexity: lineage.length * pattern.length
  };
}

function computeProxyMode(tier, pattern) {
  if (tier === "criticalDegrade") return "routeAround";
  if (tier === "hardDegrade") return "heavyAssist";
  if (tier === "midDegrade") return "assist";
  if (tier === "softDegrade") return "lightAssist";

  if (pattern.includes("router")) return "routerAssist";
  if (pattern.includes("mesh")) return "meshAssist";
  if (pattern.includes("send")) return "sendAssist";

  return "transparent";
}

function buildProxyDiagnostics(pattern, lineage, healthScore, tier) {
  const lineageDepth = lineage.length;
  const patternLength = pattern.length;

  let healthBucket = "low";
  if (healthScore >= 0.9) healthBucket = "elite";
  else if (healthScore >= 0.75) healthBucket = "high";
  else if (healthScore >= 0.5) healthBucket = "medium";

  return {
    lineageDepth,
    patternLength,
    healthBucket,
    degradationTier: tier,
    lineageDensity: lineageDepth === 0 ? 0 : patternLength / lineageDepth
  };
}

// A‑B‑A surfaces
function buildBand(pattern) {
  if (pattern.includes("router")) return "symbolic-router";
  if (pattern.includes("mesh")) return "symbolic-mesh";
  if (pattern.includes("send")) return "symbolic-send";
  return "symbolic";
}

function buildBandSignature(pattern) {
  const band = buildBand(pattern);
  const raw = `PROXY_BAND::${band}`;
  let acc = 0;
  for (let i = 0; i < raw.length; i++) {
    acc = (acc + raw.charCodeAt(i) * (i + 1)) % 100000;
  }
  return {
    band,
    bandSignature: `proxy-band-${acc}`
  };
}

function buildBinaryField(pattern, lineage) {
  const patternLen = pattern.length || 1;
  const depth = lineage.length || 1;
  const patternLenNorm = Math.max(4, Math.min(32, patternLen));
  const depthNorm = Math.max(1, Math.min(16, depth));

  const density = patternLenNorm + depthNorm * 3;
  const surface = density + patternLenNorm;

  let acc = 0;
  const raw = `PROXY_BINARY_FIELD::${patternLenNorm}::${depthNorm}::${surface}`;
  for (let i = 0; i < raw.length; i++) {
    acc = (acc + raw.charCodeAt(i) * (i + 1)) % 100000;
  }

  return {
    binaryPhenotypeSignature: `proxy-binary-pheno-${acc}`,
    binarySurfaceSignature: `proxy-binary-surface-${(acc * 7) % 100000}`,
    binarySurface: {
      patternLen: patternLenNorm,
      density,
      surface
    },
    parity: surface % 2 === 0 ? 0 : 1,
    shiftDepth: Math.max(0, Math.floor(Math.log2(surface || 1)))
  };
}

function buildWaveField(pattern, lineage) {
  const depth = lineage.length || 1;
  const patternLen = pattern.length || 1;

  const amplitude = (depth + 1) * 6 + Math.floor(patternLen / 8);
  const wavelength = amplitude + 5;
  const phase = (amplitude + patternLen) % 16;

  return {
    amplitude,
    wavelength,
    phase,
    band: "symbolic",
    mode: "symbolic-wave"
  };
}

// presence/harmonics
function buildPresenceAndHarmonics(pattern, lineage) {
  const depth = lineage.length || 1;
  const patternLen = pattern.length || 1;

  const presenceBandState =
    depth > 4 ? "deep-presence" :
    depth > 2 ? "stable-presence" :
    "light-presence";

  const harmonicDrift = Math.max(
    0,
    Math.min(1, (patternLen % 17) / 16)
  );

  const coherenceScore = Math.max(
    0.2,
    Math.min(1.0, 0.6 + depth * 0.03 - harmonicDrift * 0.1)
  );

  const pulsePrewarm = pattern.includes("send") || pattern.includes("router")
    ? "preferred"
    : "optional";

  const pulseCacheMode = pattern.includes("mesh")
    ? "mesh-cache"
    : "direct-cache";

  const pulseChunkMode = patternLen > 32
    ? "multi-chunk"
    : "single-chunk";

  const pulseRemember = depth >= 3 ? "remember-strong" : "remember-weak";

  const dualBandMode = pattern.includes("binary")
    ? "binary"
    : "symbolic";

  return {
    presenceBandState,
    harmonicDrift,
    coherenceScore,
    pulsePrewarm,
    pulseCacheMode,
    pulseChunkMode,
    pulseRemember,
    dualBandMode
  };
}

// v16: memory envelope — structural view of core memory surfaces
function buildMemoryEnvelope() {
  return {
    rawAvailable: !!CoreMemory.raw(),
    aiAdapterAvailable: !!CoreMemory.all(),
    proxyAdapterAvailable: !!CoreMemory.proxy(),
    binaryOverlayAvailable: !!CoreMemory.binaryOverlay()
  };
}

// v16: dual-band advantage hint (pure metadata, no network)
function buildAdvantageHint(dualBandContext = {}) {
  const band = dualBandContext.band || "symbolic";
  const mode = dualBandContext.mode || "neutral";
  const score = typeof dualBandContext.score === "number" ? dualBandContext.score : null;

  return {
    band,
    mode,
    score
  };
}

// physiology envelope — uses heart, blood, circulatory, hypothalamus, spine, PNS, synapse, bloodstream, adrenal, BBB
function buildPhysiologyEnvelope() {
  return {
    heartAvailable: !!PulseProxyHeart,
    bloodPressureAvailable: !!PulseProxyBloodPressure,
    circulatorySystemAvailable: !!PulseProxyCirculatorySystem,
    hypothalamusAvailable: !!PulseProxyHypothalamus,
    spineAvailable: !!PulseProxySpine,
    pnsAvailable: !!pulseband,
    synapseAvailable: !!PulseProxySynapse,
    bloodstreamAvailable: !!PulseProxyBloodstream,
    adrenalSystemAvailable: !!PulseProxyAdrenalSystem,
    bbbAvailable: !!PulseProxyBBB
  };
}

// limbic envelope — uses limbic meta, client, net
function buildLimbicEnvelope() {
  return {
    limbicMeta: PULSE_LIMBIC_SHADOW_META || null,
    clientAvailable: !!PulseClient,
    netAvailable: !!PulseNet
  };
}

// agents envelope — uses outer/inner agents, impulse, history repair
function buildAgentsEnvelope() {
  return {
    outerAgentAvailable: !!PulseProxyOuterAgent,
    innerAgentFactoryAvailable: !!createPulseProxyInnerAgent,
    impulseAvailable: !!PulseProxyImpulse,
    historyRepairAvailable: !!pulseHistoryRepair
  };
}

// v20++: cache/chunk/presence/prewarm/advantage envelopes (symbolic meta)
function buildCacheChunkEnvelope(pattern, lineage) {
  const key = `${pattern}::${lineage.length}`;
  let acc = 0;
  for (let i = 0; i < key.length; i++) {
    acc = (acc + key.charCodeAt(i) * (i + 1)) % 100000;
  }
  const chunkId = `proxy-chunk-${acc}`;
  const chunkBandSignature = `proxy-chunk-band-${(acc * 3) % 100000}`;
  const chunkSurfaceSignature = `proxy-chunk-surf-${(acc * 7) % 100000}`;

  return {
    cacheChunkId: chunkId,
    cacheChunkBandSignature: chunkBandSignature,
    cacheChunkSurfaceSignature: chunkSurfaceSignature
  };
}

function buildPresenceEnvelope(pattern, lineage) {
  const band = buildBand(pattern);
  const depth = lineage.length || 1;
  const mode =
    band === "symbolic-router" ? "router" :
    band === "symbolic-mesh" ? "mesh" :
    band === "symbolic-send" ? "send" :
    "symbolic";

  const raw = `PROXY_PRESENCE::${band}::${depth}::${mode}`;
  let acc = 0;
  for (let i = 0; i < raw.length; i++) {
    acc = (acc + raw.charCodeAt(i) * (i + 1)) % 100000;
  }

  return {
    presenceId: `proxy-presence-${acc}`,
    presenceSignature: `proxy-presence-sig-${(acc * 5) % 100000}`,
    presenceBand: band,
    presenceMode: mode
  };
}

function buildPrewarmEnvelope(pattern, lineage) {
  const depth = lineage.length || 1;
  const patternLen = pattern.length || 1;

  const routeHint =
    pattern.includes("router") ? "router-path" :
    pattern.includes("mesh") ? "mesh-path" :
    pattern.includes("send") ? "send-path" :
    "neutral-path";

  const raw = `PROXY_PREWARM::${routeHint}::${depth}::${patternLen}`;
  let acc = 0;
  for (let i = 0; i < raw.length; i++) {
    acc = (acc + raw.charCodeAt(i) * (i + 1)) % 100000;
  }

  return {
    prewarmId: `proxy-prewarm-${acc}`,
    routePrewarmSignature: `proxy-prewarm-route-${(acc * 3) % 100000}`,
    cachePrewarmSignature: `proxy-prewarm-cache-${(acc * 7) % 100000}`,
    chunkPrewarmSignature: `proxy-prewarm-chunk-${(acc * 11) % 100000}`,
    prewarmBand: "symbolic",
    prewarmMode: routeHint
  };
}

function buildAdvantageEnvelope(pattern, lineage, advantageField) {
  const depth = lineage.length || 1;
  const patternLen = pattern.length || 1;
  const baseScore = Math.max(
    0.2,
    Math.min(
      1.0,
      0.6 + depth * 0.03 + patternLen * 0.002
    )
  );

  const advantageScoreHint = baseScore;
  const cascadeLevelHint = depth > 6 ? 2 : depth > 3 ? 1 : 0;

  const raw = `PROXY_ADV::${depth}::${patternLen}::${advantageScoreHint}`;
  let acc = 0;
  for (let i = 0; i < raw.length; i++) {
    acc = (acc + raw.charCodeAt(i) * (i + 1)) % 100000;
  }

  return {
    advantageId: `proxy-adv-${acc}`,
    advantageFieldSignature: `proxy-adv-field-${(acc * 5) % 100000}`,
    advantageBandSignature: `proxy-adv-band-${(acc * 9) % 100000}`,
    advantageBand: "symbolic",
    advantageField: "proxy-organism",
    advantageScoreHint,
    cascadeLevelHint,
    advantageFieldMeta: advantageField
  };
}

// v20++: CNS/SDN/Spine/Impulse envelopes (symbolic meta)
function buildCnsEnvelope() {
  return {
    spineAvailable: !!PulseProxySpine,
    pnsAvailable: !!pulseband,
    synapseAvailable: !!PulseProxySynapse
  };
}

function buildSdnEnvelope() {
  return {
    netAvailable: !!PulseNet,
    netBootAvailable: !!PulseNetBoot
  };
}

function buildImpulseEnvelope() {
  return {
    impulseAvailable: !!PulseProxyImpulse,
    adrenalSystemAvailable: !!PulseProxyAdrenalSystem,
    heartAvailable: !!PulseProxyHeart
  };
}

// ============================================================================
//  FACTORY — v20+ symbolic proxy organism with Proxy Mode addon (20++)
// ============================================================================
export function createProxy({
  jobId,
  pattern,
  payload = {},
  priority = "normal",
  returnTo = null,
  parentLineage = null,
  pageId = "NO_PAGE",
  dualBandContext = {},
  proxyModeAdapter = null,   // OS-level / Pulse-Pal addon
  trace = false              // optional trace
}) {
  const lineage = buildLineage(parentLineage, pattern);
  const shapeSignature = computeShapeSignature(pattern, lineage);
  const evolutionStage = computeEvolutionStage(pattern, lineage);

  const patternAncestry = buildPatternAncestry(pattern);
  const lineageSignature = buildLineageSignature(lineage);
  const pageAncestrySignature = buildPageAncestrySignature({
    pattern,
    lineage,
    pageId
  });

  const healthScore = computeHealthScore(pattern, lineage);
  const tier = classifyDegradationTier(healthScore);
  const advantageField = buildAdvantageField(pattern, lineage);
  const proxyMode = computeProxyMode(tier, pattern);
  const diagnostics = buildProxyDiagnostics(
    pattern,
    lineage,
    healthScore,
    tier
  );

  const { band, bandSignature } = buildBandSignature(pattern);
  const binaryField = buildBinaryField(pattern, lineage);
  const waveField = buildWaveField(pattern, lineage);
  const presenceHarmonics = buildPresenceAndHarmonics(pattern, lineage);

  const physiologyEnvelope = buildPhysiologyEnvelope();
  const limbicEnvelope = buildLimbicEnvelope();
  const agentsEnvelope = buildAgentsEnvelope();
  const memoryEnvelope = buildMemoryEnvelope();
  const advantageHint = buildAdvantageHint(dualBandContext);

  const cacheChunkEnvelope = buildCacheChunkEnvelope(pattern, lineage);
  const presenceEnvelope = buildPresenceEnvelope(pattern, lineage);
  const prewarmEnvelope = buildPrewarmEnvelope(pattern, lineage);
  const advantageEnvelope = buildAdvantageEnvelope(pattern, lineage, advantageField);

  const cnsEnvelope = buildCnsEnvelope();
  const sdnEnvelope = buildSdnEnvelope();
  const impulseEnvelope = buildImpulseEnvelope();

  const evolvedPattern = evolvePattern(pattern, {
    routerHint: pattern.includes("router") ? "router" : null,
    meshHint: pattern.includes("mesh") ? "mesh" : null,
    sendHint: pattern.includes("send") ? "send" : null
  });

  const proxyId = `${jobId || "NO_JOB"}::${lineageSignature}::${pageAncestrySignature}`;

  let proxyModeEnabled = !!proxyModeAdapter;
  let proxyModeTapCount = 0;

  // Core proxy envelope (symbolic, 20++ surfaces)
  const proxyEnvelope = {
    proxyId,
    jobId: jobId || null,
    pattern,
    evolvedPattern,
    patternAncestry,
    lineage,
    lineageSignature,
    pageId,
    pageAncestrySignature,
    shapeSignature,
    evolutionStage,
    healthScore,
    degradationTier: tier,
    advantageField,
    proxyMode,
    diagnostics,
    band,
    bandSignature,
    binaryField,
    waveField,
    presenceHarmonics,
    physiologyEnvelope,
    limbicEnvelope,
    agentsEnvelope,
    memoryEnvelope,
    advantageHint,
    dualBandContext,
    cacheChunkEnvelope,
    presenceEnvelope,
    prewarmEnvelope,
    advantageEnvelope,
    cnsEnvelope,
    sdnEnvelope,
    impulseEnvelope,
    priority,
    returnTo,
    payload
  };

  // -------------------------------------------------------------------------
  //  PROXY MODE TAP (ADDON-ONLY, NO MUTATION OF SYMBOLIC FLOW)
  // -------------------------------------------------------------------------
  function tapProxyMode() {
    if (!proxyModeEnabled || !proxyModeAdapter || typeof proxyModeAdapter.tap !== "function") {
      return;
    }

    try {
      proxyModeAdapter.tap({
        proxyId,
        pattern,
        lineage,
        band,
        bandSignature,
        binaryField,
        waveField,
        presenceHarmonics,
        pageId,
        dualBandContext,
        cacheChunkEnvelope,
        presenceEnvelope,
        prewarmEnvelope,
        advantageEnvelope
      });
      proxyModeTapCount++;
    } catch (e) {
      if (trace && typeof console !== "undefined" && console.warn) {
        console.warn("[PulseProxy] ProxyMode tap error:", e);
      }
    }
  }

  // Immediately tap once on creation (organism snapshot)
  tapProxyMode();

  // -------------------------------------------------------------------------
  //  AGENT HELPERS — actually use outer/inner agents + impulse
  // -------------------------------------------------------------------------
  function createInnerAgent(context = {}) {
    if (!createPulseProxyInnerAgent) return null;
    return createPulseProxyInnerAgent({
      proxyId,
      pattern,
      lineage,
      context
    });
  }

  function dispatchToOuterAgent(context = {}) {
    if (!PulseProxyOuterAgent) return null;
    return PulseProxyOuterAgent({
      proxyId,
      pattern,
      lineage,
      payload,
      context
    });
  }

  function sendImpulse(impulsePayload = {}) {
    if (!PulseProxyImpulse) return null;
    return PulseProxyImpulse({
      proxyId,
      pattern,
      lineage,
      payload: impulsePayload
    });
  }

  // -------------------------------------------------------------------------
  //  PROXY MODE CONTROL (v20+ ADDON)
  // -------------------------------------------------------------------------
  function enableProxyMode(adapter) {
    if (adapter && typeof adapter.tap === "function") {
      proxyModeAdapter = adapter;
      proxyModeEnabled = true;
      tapProxyMode();
    }
    return proxyModeEnabled;
  }

  function disableProxyMode() {
    proxyModeEnabled = false;
    return proxyModeEnabled;
  }

  function getProxyModeStatus() {
    return {
      enabled: proxyModeEnabled,
      adapterAvailable: !!proxyModeAdapter,
      tapCount: proxyModeTapCount
    };
  }

  // -------------------------------------------------------------------------
  //  DIAGNOSTICS — uses WB cells (scores + health metrics)
  // -------------------------------------------------------------------------
  async function runDiagnostics({ instanceId, beforeTimestamp } = {}) {
    const scores = await scanUserScoresForInstanceHints(instanceId || null);
    const health = await checkProxyHealthAndMetrics();

    return {
      role: ProxyRole,
      proxyId,
      pattern,
      lineage,
      scores,
      health,
      beforeTimestamp: beforeTimestamp || null,
      proxyMode: getProxyModeStatus()
    };
  }

  // -------------------------------------------------------------------------
  //  MAINTENANCE — uses PNS purifier + history repair
  // -------------------------------------------------------------------------
  async function runMaintenance({ beforeTimestamp } = {}) {
    const ts = beforeTimestamp || Date.now();

    const sessions = await cleanupSessionsBefore(ts);
    const errors = await cleanupErrorsBefore(ts);
    const redownloads = await cleanupRedownloadsBefore(ts);
    const historyFix = await pulseHistoryRepair({ before: ts });

    return {
      role: ProxyRole,
      proxyId,
      pattern,
      lineage,
      sessions,
      errors,
      redownloads,
      historyFix,
      proxyMode: getProxyModeStatus()
    };
  }

  // -------------------------------------------------------------------------
  //  PUBLIC PROXY OBJECT — enriched, no abilities removed
  // -------------------------------------------------------------------------
  return {
    role: ProxyRole,
    envelope: proxyEnvelope,

    // core identity
    getId() {
      return proxyId;
    },

    getLineage() {
      return [...lineage];
    },

    getDiagnostics() {
      return { ...diagnostics };
    },

    getMode() {
      return proxyMode;
    },

    getBand() {
      return band;
    },

    // envelopes
    getPhysiologyEnvelope() {
      return { ...physiologyEnvelope };
    },

    getLimbicEnvelope() {
      return { ...limbicEnvelope };
    },

    getAgentsEnvelope() {
      return { ...agentsEnvelope };
    },

    getMemoryEnvelope() {
      return { ...memoryEnvelope };
    },

    getAdvantageHint() {
      return { ...advantageHint };
    },

    getCacheChunkEnvelope() {
      return { ...cacheChunkEnvelope };
    },

    getPresenceEnvelope() {
      return { ...presenceEnvelope };
    },

    getPrewarmEnvelope() {
      return { ...prewarmEnvelope };
    },

    getAdvantageEnvelope() {
      return { ...advantageEnvelope };
    },

    getCnsEnvelope() {
      return { ...cnsEnvelope };
    },

    getSdnEnvelope() {
      return { ...sdnEnvelope };
    },

    getImpulseEnvelope() {
      return { ...impulseEnvelope };
    },

    // agents / impulses
    createInnerAgent,
    dispatchToOuterAgent,
    sendImpulse,

    // proxy mode
    enableProxyMode,
    disableProxyMode,
    getProxyModeStatus,

    // async ops
    runDiagnostics,
    runMaintenance
  };
}

const PulseProxyBridge = PulseProofBridge;
export default PulseProxyBridge;
