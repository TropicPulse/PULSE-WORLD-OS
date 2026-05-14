/**
 * ============================================================================
 *  PULSE-WORLD : PULSE-WORLD-UNIVERSE.js
 *  ROLE: Universe-layer symbolic orchestrator / multispin / civilization lens
 *  VERSION: v25-Immortal-Universe++
 *  LAYER: Universe
 * ============================================================================
 *
 *  PURPOSE:
 *    PulseWorldUniverse is the top-level symbolic lens over:
 *
 *      - Worlds (Firebase / Netlify / Local / Edge / “Other”)
 *      - Meshes (PulseMesh, BinaryMesh, BeaconMesh)
 *      - Beacons (Engine / Mesh / Presence / Console)
 *      - Expansion (federal strategist)
 *      - Overmind (safety / world-lens / persona mix)
 *      - Game Civilization Layer (epochs / towns / tiers / cost bands)
 *
 *    It does NOT:
 *      - Perform network or filesystem I/O.
 *      - Emit Bluetooth or any hardware signals.
 *      - Execute routing or scheduling.
 *
 *    It ONLY:
 *      - Aggregates symbolic snapshots from worlds.
 *      - Computes universe-level density / pressure / health / advantage.
 *      - Computes multispin “universe bands” (Firebase / Netlify / Local / etc).
 *      - Computes civilization overlays (tier, town, cost, epoch).
 *      - Exposes a clean symbolic API for game + system to read from.
 *
 *  CONTRACT:
 *    - Deterministic, drift-proof, zero-mutation of inputs.
 *    - No randomness, no real-time dependence.
 *    - Pure symbolic math over provided snapshot providers.
 *    - Dual-band symbolic/binary aware, but never emits binary itself.
 * ============================================================================
 */

import {
  OrganismIdentity,
  buildPulseOrganismMap as PulseOrganismMap,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PULSE-WORLD-MAP.js";

const Identity = OrganismIdentity(import.meta.url);

// 2 — EXPORT GENOME METADATA
export const PulseUniverseMeta = Object.freeze({
  ...Identity.OrganMeta,
  organId: "PulseWorldUniverse-v25-Immortal-Universe++",
  role: "UNIVERSE_ORGANISM",
  layer: "Universe",
  version: "v25-Immortal-Universe++",
  guarantees: Object.freeze({
    deterministic: true,
    driftProof: true,
    symbolicOnly: true,
    zeroNetwork: true,
    zeroFilesystem: true,
    zeroHardware: true,
    zeroDynamicImports: true,
    zeroEval: true,
    dualBandAware: true,
    meshAware: true,
    beaconAware: true,
    expansionAware: true,
    overmindAware: true,
    civilizationAware: true,
    gameUniverseAware: true
  })
});

export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// ============================================================================
// HELPERS
// ============================================================================

function clamp01(v) {
  if (v == null || Number.isNaN(v)) return 0;
  if (v < 0) return 0;
  if (v > 1) return 1;
  return v;
}

function stableHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 1000003;
  }
  return `univ${h}`;
}

function safeCall(fn) {
  if (typeof fn !== "function") return null;
  try {
    return fn();
  } catch {
    return null;
  }
}

// Civilization tier ordering (symbolic)
const CIV_TIERS = ["outpost", "village", "town", "city", "metropolis", "capital", "legendary"];
const COST_BANDS = ["free", "low", "medium", "high", "premium", "mythic"];

// ============================================================================
// MULTISPIN MODEL (symbolic only)
// ============================================================================
//
// Worlds are grouped into "bands" (firebase / netlify / local / edge / other).
// Multispin computes a symbolic spin vector over these bands, based on:
//   - density (users / castles / meshes)
//   - pressure (meshPressureIndex / arteryPressure)
//   - civilization tier / cost band
//
// This is purely symbolic: no physics, no real-time.
//

function computeBandWeight({ density, pressure, civIndex, costIndex }) {
  const d = clamp01(density);
  const p = clamp01(pressure);
  const c = clamp01(civIndex);
  const k = clamp01(costIndex);

  // symbolic weighting: density + pressure + civilization, cost as friction
  const base = d * 0.4 + p * 0.3 + c * 0.3;
  const friction = 0.1 + k * 0.4; // higher cost → more friction
  const weight = base / friction;
  return clamp01(weight);
}

function normalizeVector(vec) {
  const sum = Object.values(vec).reduce((acc, v) => acc + (v || 0), 0);
  if (sum <= 0) return Object.fromEntries(Object.keys(vec).map(k => [k, 0]));
  const inv = 1 / sum;
  const out = {};
  for (const [k, v] of Object.entries(vec)) {
    out[k] = (v || 0) * inv;
  }
  return out;
}

// ============================================================================
// UNIVERSE ORGAN
// ============================================================================

/**
 * createPulseWorldUniverse
 *
 * @param {Object} options
 *   universeID: string | null
 *   trace: boolean
 *
 *   worldProviders: {
 *     [worldId]: {
 *       kind: "firebase" | "netlify" | "local" | "edge" | "other",
 *       getMeshSnapshot?: () => meshSnapshot,
 *       getBeaconMeshSnapshot?: () => beaconMeshSnapshot,
 *       getBeaconEngineSnapshot?: () => beaconEngineSnapshot,
 *       getConsoleSnapshot?: () => consoleSnapshot,
 *       getExpansionSnapshot?: () => expansionSnapshot,
 *       getOvermindSnapshot?: () => overmindSnapshot,
 *       getWorldCoreSnapshot?: () => worldCoreSnapshot
 *     }
 *   }
 *
 *   civilizationHints?: {
 *     [worldId]: {
 *       civilizationTier?: string,
 *       townType?: string,
 *       costBand?: string,
 *       epoch?: string,
 *       season?: string
 *     }
 *   }
 */
export function createPulseWorldUniverse({
  universeID = null,
  trace = false,
  worldProviders = {},
  civilizationHints = {}
} = {}) {
  const identity = Object.freeze({
    universeID: universeID || stableHash("PULSE-WORLD-UNIVERSE"),
    createdBy: "PulseExpansion-v25",
    version: PulseUniverseMeta.version,
    layer: PulseUniverseMeta.layer
  });

  const log = (...args) => trace && console.log("[PulseWorldUniverse v25]", ...args);

  // internal registry (symbolic only)
  const _worldProviders = { ...worldProviders };
  const _civHints = { ...civilizationHints };

  // ---------------------------------------------------------------------------
  // WORLD REGISTRY
  // ---------------------------------------------------------------------------

  function registerWorld(worldId, provider, civHint = null) {
    if (!worldId || typeof provider !== "object") {
      return { ok: false, reason: "invalid-arguments" };
    }
    _worldProviders[worldId] = { ...(provider || {}) };
    if (civHint) {
      _civHints[worldId] = { ...(_civHints[worldId] || {}), ...civHint };
    }
    return { ok: true };
  }

  function unregisterWorld(worldId) {
    delete _worldProviders[worldId];
    delete _civHints[worldId];
    return { ok: true };
  }

  function setCivilizationHint(worldId, civHint = {}) {
    if (!worldId) return { ok: false, reason: "invalid-worldId" };
    _civHints[worldId] = { ...(_civHints[worldId] || {}), ...(civHint || {}) };
    return { ok: true, hints: _civHints[worldId] };
  }

  function getCivilizationHint(worldId) {
    return _civHints[worldId] || null;
  }

  // ---------------------------------------------------------------------------
  // WORLD SNAPSHOT AGGREGATION
  // ---------------------------------------------------------------------------

  function readWorldSnapshot(worldId, provider) {
    const meshSnap = safeCall(provider.getMeshSnapshot);
    const beaconMeshSnap = safeCall(provider.getBeaconMeshSnapshot);
    const beaconEngineSnap = safeCall(provider.getBeaconEngineSnapshot);
    const consoleSnap = safeCall(provider.getConsoleSnapshot);
    const expansionSnap = safeCall(provider.getExpansionSnapshot);
    const overmindSnap = safeCall(provider.getOvermindSnapshot);
    const worldCoreSnap = safeCall(provider.getWorldCoreSnapshot);

    const civ = _civHints[worldId] || {};

    // density / pressure from mesh + beaconMesh + omni/continuance if present
    const meshMetrics = meshSnap?.densityHealth?.metrics || {};
    const beaconMeshPressure = beaconMeshSnap?.meshPressureIndex ?? null;
    const omniArtery = beaconMeshSnap?.continuanceOverlay?.arteryOverlay || {};
    const arteryPressure = omniArtery.arteryPressure ?? null;

    const userCount = meshMetrics.userCount || 0;
    const castleCount = meshMetrics.castleCount || 0;
    const meshPressureIndex =
      meshMetrics.meshPressureIndex ??
      beaconMeshPressure ??
      0;

    const density = clamp01((userCount + castleCount) / 1000);
    const pressure = clamp01(meshPressureIndex / 100);

    const civTier = civ.civilizationTier || "outpost";
    const townType = civ.townType || "wilderness";
    const costBand = civ.costBand || "unknown";
    const epoch = civ.epoch || "prelude";
    const season = civ.season || "alpha";

    const civIndex = CIV_TIERS.indexOf(civTier);
    const civNorm = civIndex >= 0 ? civIndex / (CIV_TIERS.length - 1 || 1) : 0;

    const costIndex = COST_BANDS.indexOf(costBand);
    const costNorm = costIndex >= 0 ? costIndex / (COST_BANDS.length - 1 || 1) : 0;

    return Object.freeze({
      worldId,
      kind: provider.kind || "other",
      density,
      pressure,
      arteryPressure: arteryPressure != null ? clamp01(arteryPressure) : pressure,
      userCount,
      castleCount,
      meshPressureIndex,
      civTier,
      townType,
      costBand,
      epoch,
      season,
      civIndex: civNorm,
      costIndex: costNorm,
      meshSnapshot: meshSnap,
      beaconMeshSnapshot: beaconMeshSnap,
      beaconEngineSnapshot: beaconEngineSnap,
      consoleSnapshot: consoleSnap,
      expansionSnapshot: expansionSnap,
      overmindSnapshot: overmindSnap,
      worldCoreSnapshot: worldCoreSnap
    });
  }

  function buildUniverseWorldsView() {
    const worlds = [];
    for (const [worldId, provider] of Object.entries(_worldProviders)) {
      const snap = readWorldSnapshot(worldId, provider);
      worlds.push(snap);
    }
    return Object.freeze(worlds);
  }

  // ---------------------------------------------------------------------------
  // MULTISPIN OVER WORLDS
  // ---------------------------------------------------------------------------

  function buildMultispinField() {
    const worlds = buildUniverseWorldsView();

    const bands = {
      firebase: 0,
      netlify: 0,
      local: 0,
      edge: 0,
      other: 0
    };

    for (const w of worlds) {
      const kind = w.kind || "other";
      const bandKey = bands.hasOwnProperty(kind) ? kind : "other";

      const weight = computeBandWeight({
        density: w.density,
        pressure: w.pressure,
        civIndex: w.civIndex,
        costIndex: w.costIndex
      });

      bands[bandKey] += weight;
    }

    const normalized = normalizeVector(bands);

    return Object.freeze({
      rawBands: bands,
      spinVector: normalized,
      dominantBand:
        Object.entries(normalized).reduce(
          (best, [k, v]) => (v > best.value ? { key: k, value: v } : best),
          { key: "other", value: 0 }
        ).key
    });
  }

  // ---------------------------------------------------------------------------
  // UNIVERSE CIVILIZATION FIELD
  // ---------------------------------------------------------------------------

  function buildCivilizationField() {
    const worlds = buildUniverseWorldsView();

    let maxCiv = 0;
    let maxCivWorld = null;
    let totalDensity = 0;
    let totalPressure = 0;

    const perWorld = worlds.map(w => {
      totalDensity += w.density;
      totalPressure += w.pressure;
      if (w.civIndex > maxCiv) {
        maxCiv = w.civIndex;
        maxCivWorld = w.worldId;
      }
      return {
        worldId: w.worldId,
        civTier: w.civTier,
        townType: w.townType,
        costBand: w.costBand,
        epoch: w.epoch,
        season: w.season,
        density: w.density,
        pressure: w.pressure
      };
    });

    const avgDensity = worlds.length ? totalDensity / worlds.length : 0;
    const avgPressure = worlds.length ? totalPressure / worlds.length : 0;

    const globalTierIndex = Math.round(maxCiv * (CIV_TIERS.length - 1 || 1));
    const globalTier = CIV_TIERS[globalTierIndex] || "outpost";

    return Object.freeze({
      globalTier,
      globalTierIndex,
      leadingWorldId: maxCivWorld,
      avgDensity,
      avgPressure,
      worlds: perWorld
    });
  }

  // ---------------------------------------------------------------------------
  // UNIVERSE HEALTH / DENSITY / PRESSURE
  // ---------------------------------------------------------------------------

  function buildUniverseHealthField() {
    const worlds = buildUniverseWorldsView();

    let totalUsers = 0;
    let totalCastles = 0;
    let maxPressure = 0;

    for (const w of worlds) {
      totalUsers += w.userCount;
      totalCastles += w.castleCount;
      if (w.meshPressureIndex > maxPressure) {
        maxPressure = w.meshPressureIndex;
      }
    }

    const density = clamp01((totalUsers + totalCastles) / 5000);
    const pressure = clamp01(maxPressure / 100);

    let healthBand = "unknown";
    if (pressure < 0.3) healthBand = "calm";
    else if (pressure < 0.6) healthBand = "stable";
    else if (pressure < 0.8) healthBand = "stressed";
    else healthBand = "overloaded";

    return Object.freeze({
      totalUsers,
      totalCastles,
      maxMeshPressureIndex: maxPressure,
      density,
      pressure,
      healthBand
    });
  }

  // ---------------------------------------------------------------------------
  // GAME / CIVILIZATION HOOKS (symbolic only)
  // ---------------------------------------------------------------------------

  function buildGameUniverseField() {
    const civField = buildCivilizationField();
    const healthField = buildUniverseHealthField();
    const multispin = buildMultispinField();

    // symbolic “epoch mode” based on civilization + health
    let epochMode = "prelude";
    if (civField.globalTierIndex >= 2 && healthField.healthBand === "calm") {
      epochMode = "growth";
    } else if (civField.globalTierIndex >= 3 && healthField.healthBand === "stable") {
      epochMode = "golden-age";
    } else if (healthField.healthBand === "stressed") {
      epochMode = "stress";
    } else if (healthField.healthBand === "overloaded") {
      epochMode = "collapse";
    }

    // symbolic “season” based on dominant band
    const band = multispin.dominantBand;
    let season = "neutral";
    if (band === "firebase") season = "fire-season";
    else if (band === "netlify") season = "wind-season";
    else if (band === "local") season = "earth-season";
    else if (band === "edge") season = "storm-season";
    else season = "void-season";

    return Object.freeze({
      epochMode,
      season,
      civilization: civField,
      health: healthField,
      multispin
    });
  }

  // ---------------------------------------------------------------------------
  // SNAPSHOT
  // ---------------------------------------------------------------------------

  function getSnapshot() {
    const worlds = buildUniverseWorldsView();
    const multispin = buildMultispinField();
    const civField = buildCivilizationField();
    const healthField = buildUniverseHealthField();
    const gameField = buildGameUniverseField();

    return Object.freeze({
      organId: PulseUniverseMeta.organId,
      version: PulseUniverseMeta.version,
      epoch: PulseUniverseMeta.epoch,
      identity,
      worlds,
      multispin,
      civilizationField: civField,
      healthField,
      gameUniverseField: gameField
    });
  }

  // ---------------------------------------------------------------------------
  // PUBLIC API
  // ---------------------------------------------------------------------------

  return Object.freeze({
    meta: PulseUniverseMeta,
    identity,

    // registry
    registerWorld,
    unregisterWorld,
    setCivilizationHint,
    getCivilizationHint,

    // views
    buildUniverseWorldsView,
    buildMultispinField,
    buildCivilizationField,
    buildUniverseHealthField,
    buildGameUniverseField,

    // snapshot
    getSnapshot
  });
}

export default createPulseWorldUniverse;
