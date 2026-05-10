// ============================================================================
//  PulseCoreLayers-v20.js — v20-IMMORTAL-LAYERS
//  ORGANISM‑WIDE MEMORY LAYER MANAGER
//  “RAM IS A SCRATCHPAD. CORE IS THE TRUTH. PRESENCE DECIDES EVERYTHING.”
// ============================================================================

import { OrganismIdentity } from "../PULSE-X/PulseWorldOrganismMap-v24.js";

const Identity = OrganismIdentity(import.meta.url);

// ============================================================================
//  META BLOCK — v20 IMMORTAL (from genome)
// ============================================================================
export const PulseCoreLayersMeta = Identity.OrganMeta;

// ============================================================================
//  SURFACE / ORGANISM LAYER EXPORTS — v20 IMMORTAL
// ============================================================================
export const pulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;

export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// ============================================================================
//  MEMORY LAYER DEFINITIONS (v20)
// ============================================================================
export const PulseCoreLayers = {
  RAM: {
    id: "ram",
    speed: "fastest",
    volatility: "volatile",
    authoritative: false,
    flushOnBoot: true,
    idealFor: [
      "hotLoopKeys",
      "workingSets",
      "gpuWarmBuffers",
      "proxyTempBuffers"
    ],
    bandHint: "dual",
    hydrationRole: "scratchpad",
    metaBlock: PulseCoreLayersMeta
  },

  DISK_PRIMARY: {
    id: "disk-primary",
    speed: "medium",
    volatility: "persistent",
    authoritative: true,
    fallback: "disk-secondary",
    idealFor: [
      "canonicalBlobs",
      "routeSnapshots",
      "patternMaps",
      "evolutionState"
    ],
    bandHint: "symbolic-primary",
    hydrationRole: "truth",
    metaBlock: PulseCoreLayersMeta
  },

  DISK_SECONDARY: {
    id: "disk-secondary",
    speed: "medium",
    volatility: "persistent",
    authoritative: false,
    fallback: null,
    idealFor: [
      "canonicalBlobsMirror",
      "routeSnapshotsMirror",
      "patternMapsMirror"
    ],
    bandHint: "symbolic-mirror",
    hydrationRole: "backup",
    metaBlock: PulseCoreLayersMeta
  },

  GPU: {
    id: "gpu",
    speed: "fast",
    volatility: "volatile",
    authoritative: false,
    idealFor: [
      "compiledKernels",
      "modelSegments",
      "binaryTransforms",
      "uiHydrationGraphs"
    ],
    bandHint: "binary-primary",
    hydrationRole: "compute-surface",
    metaBlock: PulseCoreLayersMeta
  },

  PROXY: {
    id: "proxy",
    speed: "fast",
    volatility: "transient",
    authoritative: false,
    idealFor: [
      "binaryTransit",
      "dedupedOutbound",
      "clientVersionMaps"
    ],
    bandHint: "binary-transit",
    hydrationRole: "edge-buffer",
    metaBlock: PulseCoreLayersMeta
  }
};

// ============================================================================
//  LAYER DECISION ENGINE (v20-IMMORTAL)
// ============================================================================
export const PulseCoreLayerRules = {
  decidePlacement(dataType, dnaTag, routeId) {
    const dt = String(dataType || "generic").toLowerCase();
    const route = String(routeId || "global");

    const gpuPreferred =
      dt.includes("gpu") ||
      dt.includes("binary") ||
      route.includes("gpu") ||
      route.includes("render");

    const proxyPreferred =
      dt.includes("proxy") ||
      dt.includes("network") ||
      dt.includes("transit");

    const primary = "disk-primary";
    const secondary = "disk-secondary";
    const ram = "ram";
    const gpu = gpuPreferred ? "gpu" : "ram";
    const proxy = proxyPreferred ? "proxy" : "ram";

    return {
      primary,
      secondary,
      ram,
      gpu,
      proxy,
      dnaTag,
      routeId: route
    };
  },

  shouldPromote({ hits, dataType, routeId, dnaTag } = {}) {
    const dt = String(dataType || "generic").toLowerCase();
    const route = String(routeId || "global");
    const h = Number(hits || 0);

    if (dt.includes("gpu")) return h > 1;
    if (route.includes("hot") || route.includes("loop")) return h > 2;
    if (String(dnaTag || "").includes("prime")) return h > 2;

    return h > 3;
  },

  shouldDemote({ hits, lastAccess, layerId } = {}) {
    const now = Date.now();
    const TTL = 7 * 24 * 60 * 60 * 1000;
    const h = Number(hits || 0);
    const last = Number(lastAccess || 0);
    const layer = String(layerId || "");

    if (layer === "ram" || layer === "gpu") {
      if (now - last > TTL / 4) return true;
      return h < 1;
    }

    if (now - last > TTL) return true;
    return h < 1;
  },

  shouldFlush(layerId) {
    const id = String(layerId || "");
    return id === "ram" || id === "gpu";
  }
};

// ============================================================================
//  PUBLIC EXPORT — GENOME‑ALIGNED
// ============================================================================
export const PulseCoreLayersOrgan = {
  meta: PulseCoreLayersMeta,
  pulseRole,
  surfaceMeta,
  pulseLoreContext,
  AI_EXPERIENCE_META,
  EXPORT_META,

  PulseCoreLayers,
  PulseCoreLayerRules
};
