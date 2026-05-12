// ============================================================================
// FILE: /PulseOS/Brain/PulseOSEvolution-v24-Immortal-CoreMemory.js
// PULSE OS — v24-Immortal-DUALBAND-Presence-Advantage-Artery
// “THE EVOLUTION ENGINE — ORGANISM-WIDE CNS GROWTH + DRIFT INTELLIGENCE”
// CoreMemory-integrated • Immortal Drift/Lineage • Cache/Prewarm/Artery-aware
// Chunk/Presence/Advantage/Topology-aware • v24 SDN/OrganismMesh aligned
// ============================================================================
import {
  OrganismIdentity,
  buildPulseOrganismMap as PulseOrganismMap,
  buildPulseOrganismMap as buildOrganismMap
} from "./PULSE-WORLD-MAP.js";
const Identity = OrganismIdentity(import.meta.url);

// 2 — EXPORT GENOME METADATA
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

import { PulseCoreMemory } from "../PULSE-CORE/PulseCoreMemory-v24.js";

// Cortex is ONLY imported here — NOT in Brain
import { createPulseOSCortex } from "./PulseOSBrainCortex-v24.js";

const CORE_MEMORY_NAMESPACE = "PulseOSEvolution-v24-Immortal";

// ============================================================================
//  DETERMINISTIC HELPERS (no Date, no randomness)
// ============================================================================
function stableStringify(value) {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) {
    return "[" + value.map(stableStringify).join(",") + "]";
  }
  const keys = Object.keys(value).sort();
  return (
    "{" +
    keys.map((k) => JSON.stringify(k) + ":" + stableStringify(value[k])).join(",") +
    "}"
  );
}

function computeHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 1000000007;
  }
  return `h${h}`;
}

function normalizeBand(band) {
  return band === "binary" || band === "symbolic" || band === "dual"
    ? band
    : "dual";
}

// v24: cacheChunk + prewarm + artery surfaces for evolution scans
function buildCacheChunkSurface({ intent, organism, iq, band }) {
  const shape = {
    intent: intent || "NO_INTENT",
    organs: organism ? Object.keys(organism) : [],
    iqKeys: iq ? Object.keys(iq) : [],
    band: normalizeBand(band),
    // v24: include route + gpu profiles for more precise cache keys
    chunkProfiles: iq?.chunkingProfiles
      ? {
          hasDefault: !!iq.chunkingProfiles.default,
          routeCount: Object.keys(iq.chunkingProfiles.routes || {}).length,
          gpuCount: Object.keys(iq.chunkingProfiles.gpu || {}).length
        }
      : null
  };
  const serialized = stableStringify(shape);
  const cacheChunkKey = "evolution-cache::" + computeHash(serialized);
  return {
    cacheChunkKey,
    cacheChunkSignature: computeHash(cacheChunkKey),
    band: normalizeBand(band)
  };
}

function buildPrewarmSurface({ iq, band }) {
  const profiles = iq?.chunkingProfiles || {};
  const hasCortexPrewarm = !!profiles.default || !!profiles.routes;

  let level = "none";
  if (hasCortexPrewarm && band === "binary") level = "aggressive";
  else if (hasCortexPrewarm && band === "dual") level = "medium";
  else if (hasCortexPrewarm) level = "light";

  const raw = stableStringify({
    hasCortexPrewarm,
    band: normalizeBand(band),
    // v24: presence + mesh awareness baked into prewarm signature
    presenceEnabled: !!iq?.presenceConfig?.enabled,
    meshTopology: iq?.meshPresenceConfig?.topology || "none"
  });

  const prewarmKey = "evolution-prewarm::" + computeHash(raw);

  return {
    level,
    prewarmKey,
    band: normalizeBand(band)
  };
}

// v24: artery load surface for Brain.CNSArtery bootstrap
function buildArteryLoadSurface({ iq, organism }) {
  const adv = iq?.advantageField || {};
  const presenceConfig = iq?.presenceConfig || {};
  const meshConfig = iq?.meshPresenceConfig || {};
  const topo = iq?.pulseTopology || {};

  const organCount = organism ? Object.keys(organism).length : 0;

  // deterministic, bounded 0..1 hints
  const presenceLoad = presenceConfig.enabled ? 0.4 : 0.1;
  const meshLoad = meshConfig.enabled ? 0.5 : 0.1;
  const advantageLoad = typeof adv.score === "number"
    ? Math.min(Math.max(Math.abs(adv.score), 0), 1)
    : 0.3;
  const topologyLoad = topo.momHeart || topo.dadHeart || topo.earnHeart ? 0.4 : 0.1;
  const cortexLoad = organCount > 0 ? Math.min(0.2 + organCount * 0.01, 0.8) : 0.2;

  const dualBandLoad = 0.6;       // v24: default dual-band ready
  const binaryOverlayLoad = 0.3;  // v24: binary overlay present but secondary
  const worldLensLoad = 0.2;      // Brain is not internet center; keep low
  const organismMeshLoad = meshConfig.enabled ? 0.5 : 0.2;

  return {
    cortexLoad,
    meshLoad,
    presenceLoad,
    advantageLoad,
    worldLensLoad,
    topologyLoad,
    organismMeshLoad,
    dualBandLoad,
    binaryOverlayLoad
  };
}

// ============================================================================
//  CORE MEMORY INTEGRATION — immortal drift/lineage/health
// ============================================================================
function coreMemoryRecord(key, payload) {
  if (!key) return;
  try {
    if (PulseCoreMemory && typeof PulseCoreMemory.record === "function") {
      PulseCoreMemory.record(CORE_MEMORY_NAMESPACE, key, payload);
    }
  } catch {
    // fail-open
  }
}

function coreMemoryRecall(key) {
  if (!key) return null;
  try {
    if (PulseCoreMemory && typeof PulseCoreMemory.recall === "function") {
      return PulseCoreMemory.recall(CORE_MEMORY_NAMESPACE, key) || null;
    }
  } catch {
    // fail-open
  }
  return null;
}

function buildDriftStateKey(intent) {
  return `DRIFT_STATE::${String(intent || "NO_INTENT")}`;
}

function buildLineageKey(intent) {
  return `LINEAGE::${String(intent || "NO_INTENT")}`;
}

function buildOrganHealthKey(intent) {
  return `ORGAN_HEALTH::${String(intent || "NO_INTENT")}`;
}

function buildOrganismHealthKey(intent) {
  return `ORGANISM_HEALTH::${String(intent || "NO_INTENT")}`;
}

function buildArteryLoadKey(intent) {
  return `ARTERY_LOAD::${String(intent || "NO_INTENT")}`;
}

// ============================================================================
//  EVOLUTION ENGINE — v24-Immortal-COREMEMORY
// ============================================================================
export function PulseOSEvolution({ intent, organism, iq, understanding }) {

  let seq = 0;
  const nextSeq = () => ++seq;

  // --------------------------------------------------------------------------
  // Presence + chunking metadata
  // --------------------------------------------------------------------------
  function computePresenceDescriptors() {
    const presenceConfig = iq?.presenceConfig || {};
    const meshConfig = iq?.meshPresenceConfig || {};

    return {
      presenceField: {
        enabled: !!presenceConfig.enabled,
        bluetoothPreferred: !!presenceConfig.bluetoothPreferred,
        routes: presenceConfig.routes || [],
        // v24: pressure hint for SDN prewarm / CNS artery
        pressureHint: presenceConfig.routes
          ? Math.min(presenceConfig.routes.length * 0.05, 1)
          : 0
      },
      meshPresence: {
        enabled: !!meshConfig.enabled,
        topology: meshConfig.topology || "none",
        routes: meshConfig.routes || [],
        pressureHint: meshConfig.routes
          ? Math.min(meshConfig.routes.length * 0.05, 1)
          : 0
      },
      organismSnapshot: {
        organs: organism ? Object.keys(organism) : []
      }
    };
  }

  function computeChunkingProfiles() {
    const profiles = iq?.chunkingProfiles || {};
    return {
      defaultProfile: profiles.default || null,
      routeProfiles: profiles.routes || {},
      gpuProfiles: profiles.gpu || {},
      // v24: quick summary for cache/prewarm tuning
      summary: {
        hasDefault: !!profiles.default,
        routeCount: Object.keys(profiles.routes || {}).length,
        gpuCount: Object.keys(profiles.gpu || {}).length
      }
    };
  }

  // --------------------------------------------------------------------------
  // Drift + lineage state (seeded from CoreMemory if present)
// --------------------------------------------------------------------------
  const driftKey = buildDriftStateKey(intent);
  const lineageKey = buildLineageKey(intent);
  const organHealthKey = buildOrganHealthKey(intent);
  const organismHealthKey = buildOrganismHealthKey(intent);
  const arteryLoadKey = buildArteryLoadKey(intent);

  const recalledDrift = coreMemoryRecall(driftKey);
  const recalledLineage = coreMemoryRecall(lineageKey);
  const recalledOrganHealth = coreMemoryRecall(organHealthKey);
  const recalledOrganismHealth = coreMemoryRecall(organismHealthKey);
  const recalledArteryLoad = coreMemoryRecall(arteryLoadKey);

  const DriftState = {
    lineage: Array.isArray(recalledLineage?.lineage)
      ? recalledLineage.lineage.slice()
      : [],
    driftEvents: Array.isArray(recalledDrift?.driftEvents)
      ? recalledDrift.driftEvents.slice()
      : [],
    organHealth:
      recalledOrganHealth && typeof recalledOrganHealth.organHealth === "object"
        ? { ...recalledOrganHealth.organHealth }
        : {},
    organismHealth:
      typeof recalledOrganismHealth?.organismHealth === "number"
        ? recalledOrganismHealth.organismHealth
        : 1.0,
    lastScanSeq: recalledDrift?.lastScanSeq || null,
    lastScanBand: recalledDrift?.lastScanBand || "dual",
    binaryDescriptor: recalledDrift?.binaryDescriptor || null,
    presenceDescriptors: computePresenceDescriptors(),
    chunkingProfiles: computeChunkingProfiles(),

    // v14 cache/prewarm surfaces
    cacheChunkSurface: recalledDrift?.cacheChunkSurface || null,
    prewarmSurface: recalledDrift?.prewarmSurface || null,

    // v24 artery load surface (for Brain.CNSArtery bootstrap)
    arteryLoadSurface:
      recalledArteryLoad && typeof recalledArteryLoad.arteryLoadSurface === "object"
        ? { ...recalledArteryLoad.arteryLoadSurface }
        : buildArteryLoadSurface({ iq, organism })
  };

  // --------------------------------------------------------------------------
  // DRIFT SCANNER
  // --------------------------------------------------------------------------
  function scanDrift(Brain, { band = "dual", dnaTag = null } = {}) {
    const normBand = normalizeBand(band);
    const drift = [];

    if (!Brain.intent) drift.push("missing-intent-map");
    if (!Brain.PulseOrganismMap) drift.push("missing-organism-map");
    if (!Brain.PulseIQMap) drift.push("missing-iq-map");

    const descriptor = Brain.BrainIntel?.getBinaryOrganismDescriptor?.();
    DriftState.binaryDescriptor = descriptor || null;

    DriftState.presenceDescriptors = computePresenceDescriptors();
    DriftState.chunkingProfiles = computeChunkingProfiles();

    DriftState.lastScanSeq = nextSeq();
    DriftState.lastScanBand = normBand;
    DriftState.driftEvents.push(...drift);

    DriftState.lineage.push({
      seq: DriftState.lastScanSeq,
      band: normBand,
      dnaTag,
      event: "drift-scan"
    });

    // v24: cache/prewarm surfaces for this scan
    DriftState.cacheChunkSurface = buildCacheChunkSurface({
      intent,
      organism,
      iq,
      band: normBand
    });
    DriftState.prewarmSurface = buildPrewarmSurface({
      iq,
      band: normBand
    });

    // v24: recompute artery load surface on each scan (cheap, deterministic)
    DriftState.arteryLoadSurface = buildArteryLoadSurface({ iq, organism });

    // persist drift + lineage + cache/prewarm + artery into CoreMemory
    coreMemoryRecord(driftKey, {
      lastScanSeq: DriftState.lastScanSeq,
      lastScanBand: DriftState.lastScanBand,
      driftEvents: DriftState.driftEvents.slice(),
      binaryDescriptor: DriftState.binaryDescriptor,
      cacheChunkSurface: DriftState.cacheChunkSurface,
      prewarmSurface: DriftState.prewarmSurface
    });

    coreMemoryRecord(lineageKey, {
      lineage: DriftState.lineage.slice()
    });

    coreMemoryRecord(arteryLoadKey, {
      arteryLoadSurface: { ...DriftState.arteryLoadSurface }
    });

    return drift;
  }

  // --------------------------------------------------------------------------
  // LINEAGE ENGINE
  // --------------------------------------------------------------------------
  function recordLineage(event, { band = "dual", dnaTag = null } = {}) {
    DriftState.lineage.push({
      seq: nextSeq(),
      band: normalizeBand(band),
      dnaTag,
      event
    });

    coreMemoryRecord(lineageKey, {
      lineage: DriftState.lineage.slice()
    });
  }

  // --------------------------------------------------------------------------
  // ORGAN HEALTH ENGINE
  // --------------------------------------------------------------------------
  function updateOrganHealth(organName, score, { band = "dual", dnaTag = null } = {}) {
    DriftState.organHealth[organName] = score;

    DriftState.lineage.push({
      seq: nextSeq(),
      band: normalizeBand(band),
      dnaTag,
      event: `organ-health-update:${organName}`
    });

    coreMemoryRecord(organHealthKey, {
      organHealth: { ...DriftState.organHealth }
    });

    coreMemoryRecord(lineageKey, {
      lineage: DriftState.lineage.slice()
    });
  }

  function computeOrganismHealth({ band = "dual", dnaTag = null } = {}) {
    const values = Object.values(DriftState.organHealth);
    DriftState.organismHealth =
      values.length === 0 ? 1.0 : values.reduce((a, b) => a + b, 0) / values.length;

    DriftState.lineage.push({
      seq: nextSeq(),
      band: normalizeBand(band),
      dnaTag,
      event: "organism-health-computed"
    });

    coreMemoryRecord(organismHealthKey, {
      organismHealth: DriftState.organismHealth
    });

    coreMemoryRecord(lineageKey, {
      lineage: DriftState.lineage.slice()
    });

    return DriftState.organismHealth;
  }

  // --------------------------------------------------------------------------
  // EVOLUTION → CORTEX BOOTSTRAP (v24-Immortal)
// --------------------------------------------------------------------------
  function bootCortex(Brain, { band = "dual", dnaTag = null } = {}) {
    const normBand = normalizeBand(band);

    // Attach maps + understanding + evolution to Brain
    Brain.intent           = intent;
    Brain.PulseOrganismMap = organism;
    Brain.PulseIQMap       = iq;
    Brain.understanding    = understanding;
    Brain.evolution        = Evolution;

    recordLineage("cortex-boot", { band: normBand, dnaTag });

    const cortex = createPulseOSCortex({ Brain });

    // v24: allow cortex to see cache/prewarm + artery surfaces from Evolution
    cortex.boot({
      band: normBand,
      cacheChunkSurface: DriftState.cacheChunkSurface,
      prewarmSurface: DriftState.prewarmSurface,
      arteryLoadSurface: DriftState.arteryLoadSurface
    });

    Brain.cortex = cortex;

    scanDrift(Brain, { band: normBand, dnaTag });

    return cortex;
  }

  // --------------------------------------------------------------------------
  // v24: INITIAL ARTERY LOADS SURFACE (for PulseOSBrain.cognitiveBootstrap)
// --------------------------------------------------------------------------
  function getInitialArteryLoads() {
    // deterministic, derived from DriftState.arteryLoadSurface
    return { ...DriftState.arteryLoadSurface };
  }

  // --------------------------------------------------------------------------
  // PUBLIC EVOLUTION ORGAN SURFACE
  // --------------------------------------------------------------------------
  const Evolution = {
    PulseRole,
    DriftState,
    scanDrift,
    recordLineage,
    updateOrganHealth,
    computeOrganismHealth,
    bootCortex,
    getPresenceDescriptors: () => DriftState.presenceDescriptors,
    getChunkingProfiles: () => DriftState.chunkingProfiles,
    getCacheChunkSurface: () => DriftState.cacheChunkSurface,
    getPrewarmSurface: () => DriftState.prewarmSurface,
    // v24+ artery-aware surface
    getArteryLoadSurface: () => DriftState.arteryLoadSurface,
    getInitialArteryLoads
  };

  return Evolution;
}
