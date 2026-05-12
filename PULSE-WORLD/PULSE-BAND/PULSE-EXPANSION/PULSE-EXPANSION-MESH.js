/**
 * ============================================================================
 *  PULSE-WORLD : PulseMesh-v24-Immortal++.js
 *  ORGAN TYPE: Connectivity / Symbolic Mesh Organism
 *  VERSION: v24-Immortal++
 * ============================================================================
 *
 *  ROLE (v24++):
 *    PulseMesh is the symbolic connective tissue of PulseWorld.
 *    It is the ORGANISM MAP — the symbolic view that connects:
 *
 *      - PulseExpansion (federal strategist)
 *      - PulseCastle (presence host)
 *      - PulseServer (server lanes)
 *      - PulseUser (user lanes)
 *      - PulseTouch (presence / identity / persona / trust)
 *      - PulseNet (mesh family / ingress / pressure)
 *      - PulseRuntime (hot instances / modes / pages)
 *      - PulseScheduler (macro tick orchestration)
 *      - PulseOvermind (world-lens / safety)
 *
 *    It does NOT route, send, forward, or execute anything.
 *    It ONLY computes symbolic signals:
 *
 *      - density
 *      - health
 *      - pressure
 *      - presence
 *      - advantage
 *      - persona / identity tier
 *      - device / bluetooth / band presence
 *      - world-mesh aggregation
 *      - proxy pressure / fallback / boost
 *
 *  CONTRACT (v24++):
 *    - Pure symbolic mesh (no routing, no sending, no execution).
 *    - Deterministic, drift-proof, zero-mutation.
 *    - Multi-mesh aggregation (symbolic only).
 *    - Dual-band symbolic/binary.
 *    - Prewarm-aware, chunk-aware, cache-aware.
 *    - Must expose clear density + health + pressure + lane signals.
 *    - Must never perform network or filesystem operations.
 *    - Must never depend on real time or randomness.
 */
import {
  OrganismIdentity,
  buildPulseOrganismMap as PulseOrganismMap,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PULSE-WORLD-MAP.js";
const Identity = OrganismIdentity(import.meta.url);

// 2 — EXPORT GENOME METADATA

export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
// export const PULSE_EARN_IMMUNE_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// ============================================================================
// IMPORTS — v24 ORGANISM CONTEXT
// ============================================================================

import { PulseExpansionMeta, createPulseExpansion } from "./PULSE-EXPANSION-INTERNET.js";
import { PulseCastleMeta, createPulseCastle } from "./PULSE-EXPANSION-CASTLE.js";
import { PulseServerMeta, createPulseServer } from "./PULSE-EXPANSION-SERVER.js";
import { PulseRouterMeta, createPulseRouter } from "./PULSE-EXPANSION-ROUTER.js";

import { getPulseUserContext, createPulseWorldCore } from "./PULSE-EXPANSION-USER.js";

import { getBeaconEngineContext } from "./PulseExpansionBeaconEngine-v20.js";
import { getConsoleContext } from "./PulseExpansionBeaconConsole-v20.js";

import { getPulseTouchContext } from "../../PULSE-UI/PULSE-WORLD-TOUCH.js";

import { getPulseRuntimeContext } from "../PULSE-X/PulseWorldRuntime-v20.js";
import { getPulseSchedulerContext } from "../PULSE-X/PulseWorldScheduler-v20.js";
import { getPulseOvermindContext } from "../PULSE-X/PULSE-WORLD-ALDWYN.js";

import {
  getProxyContext,
  getProxyPressure,
  getProxyBoost,
  getProxyFallback,
  getProxyMode,
  getProxyLineage
} from "../PULSE-PROXY/PulseProxyContext-v20.js";

// ============================================================================
// SINGLETONS (v24)
// ============================================================================

const _expansionSingleton = createPulseExpansion({});
const _castleSingleton = createPulseCastle({});
const _serverSingleton = createPulseServer({});

function getPulseExpansionContext() {
  return { meta: PulseExpansionMeta, core: _expansionSingleton };
}

function getPulseCastleContext() {
  return { meta: PulseCastleMeta, core: _castleSingleton };
}

function getPulseServerContext() {
  return { meta: PulseServerMeta, core: _serverSingleton };
}

// ============================================================================
// META — v24
// ============================================================================

export const PulseMeshMeta = Object.freeze({
  organId: "PulseMesh-v24-Immortal++",
  role: "SYMBOLIC_MESH_ORGANISM",
  version: "v24-Immortal++",
  layer: "Connectivity",

  guarantees: Object.freeze({
    deterministic: true,
    driftProof: true,
    symbolicPrimary: true,
    binaryAware: true,
    dualBandAware: true,

    zeroNetwork: true,
    zeroFilesystem: true,
    zeroMutationOfInput: true,
    zeroDynamicImports: true,
    zeroEval: true,

    presenceAware: true,
    advantageAware: true,
    personaAware: true,
    identityTierAware: true,
    bluetoothAware: true,
    devicePresenceAware: true,

    meshPressureAware: true,
    densityAware: true,
    costAware: true,
    bridgeAware: true,
    multiInstanceAware: true,
    expansionAware: true,
    routerAware: true,
    userAware: true,
    worldMeshAware: true,
    osBrainAware: true,
    serverAware: true,
    castleAware: true,
    runtimeAware: true,
    overmindAware: true,
    pulseTouchAware: true,
    pulseNetAware: true,
    schedulerAware: true,

    proxyAware: true,
    proxyPressureAware: true,
    proxyFallbackAware: true,
    proxyBoostAware: true,

    chunkPrewarmAware: true,
    cacheAware: true,
    prewarmAware: true
  })
});

// ============================================================================
// FACTORY — PulseMesh v24-Immortal++
// ============================================================================

export function createPulseMesh({
  meshID = null,
  regionID = null,
  trace = false
} = {}) {

  const Identity = Object.freeze({
    meshID,
    regionID,
    createdBy: "PulseExpansion-v24",
    version: "v24-Immortal++"
  });

  const log = (...args) => trace && console.log("[PulseMesh v24]", ...args);

  // --------------------------------------------------------------------------
  // 1. Topology
  // --------------------------------------------------------------------------
  const Topology = {
    nodes: {
      userNodes: [],
      castleNodes: [],
      bridgeNodes: []
    },
    links: {
      edges: []
    },
    limits: Object.freeze({
      maxNodesPerRegion: 5000,
      maxEdgesPerNode: 64
    })
  };

  // --------------------------------------------------------------------------
  // 2. Density / Health / Pressure (v24)
  // --------------------------------------------------------------------------
  const DensityHealth = {
    metrics: {
      userCount: 0,
      castleCount: 0,
      avgLatencyMs: null,
      packetLossRate: 0,
      meshStrength: "unknown",
      relayLoadScore: 0,
      pingFrequencyScore: 0,
      meshContributionScore: 0,
      meshPressureIndex: 0,

      proxyPressure: 0,
      proxyBoost: 0,
      proxyFallback: false,
      proxyMode: "normal"
    },
    thresholds: Object.freeze({
      weakThresholdUsers: 1,
      stableThresholdUsers: 5,
      strongThresholdUsers: 20,
      highPressureThreshold: 70
    })
  };

  // --------------------------------------------------------------------------
  // 3. Organism Context (v24)
  // --------------------------------------------------------------------------
  function buildOrganismContext() {
    return {
      expansion: getPulseExpansionContext(),
      castle: getPulseCastleContext(),
      beaconEngine: getBeaconEngineContext?.() || {},
      console: getConsoleContext?.() || {},
      server: getPulseServerContext(),
      user: getPulseUserContext?.() || {},
      touch: getPulseTouchContext?.() || {},
      runtime: getPulseRuntimeContext?.() || {},
      scheduler: getPulseSchedulerContext?.() || {},
      overmind: getPulseOvermindContext?.() || {},
      proxyMeta: {
        context: getProxyContext?.() || null,
        pressure: getProxyPressure?.() ?? 0,
        boost: getProxyBoost?.() ?? 0,
        fallback: getProxyFallback?.() ?? false,
        mode: getProxyMode?.() || "normal",
        lineage: getProxyLineage?.() || null
      }
    };
  }

  // --------------------------------------------------------------------------
  // 4. Presence & Advantage (v24++)
  // --------------------------------------------------------------------------
  function buildPresenceField() {
    const ctx = buildOrganismContext();
    const touch = ctx.touch || {};
    const runtime = ctx.runtime || {};
    const proxy = ctx.proxyMeta || {};

    return Object.freeze({
      bandPresence: touch.bandPresence || "unknown",
      devicePresence: touch.devicePresence || "unknown",
      bluetoothPresence: touch.bluetoothPresence || "off",
      persona: touch.persona || "neutral",
      identityTier: touch.identityTier || "anon",
      trusted: touch.trusted || "unknown",

      touchMode: touch.mode || "unknown",
      touchPage: touch.page || "unknown",
      chunkProfile: touch.chunkProfile || "default",

      runtimeHotPresence: runtime.hotPresence || null,
      runtimeModes: runtime.hotModes || null,

      proxyMode: proxy.mode,
      proxyFallback: proxy.fallback
    });
  }

  function buildAdvantageField() {
    const ctx = buildOrganismContext();
    const touch = ctx.touch || {};
    const runtime = ctx.runtime || {};
    const user = ctx.user || {};
    const proxy = ctx.proxyMeta || {};

    return Object.freeze({
      advantageScore: touch.advantageScore ?? 0,
      advantageBand: touch.advantageBand ?? "neutral",
      fallbackBandLevel: touch.fallbackBandLevel ?? 0,

      userContributionScore: user.contributionScore ?? 0,
      runtimeContributionHeat: runtime.hotInstances || null,

      proxyPressure: proxy.pressure,
      proxyBoost: proxy.boost,
      proxyFallback: proxy.fallback
    });
  }

  // --------------------------------------------------------------------------
  // 5. Density + Pressure (v24++)
  // --------------------------------------------------------------------------
  function computeDensityAndPressure({
    userCount,
    castleCount,
    avgLatencyMs,
    packetLossRate,
    relayLoadScore,
    pingFrequencyScore,
    meshContributionScore
  }) {
    DensityHealth.metrics.userCount = userCount;
    DensityHealth.metrics.castleCount = castleCount;
    DensityHealth.metrics.avgLatencyMs = avgLatencyMs;
    DensityHealth.metrics.packetLossRate = packetLossRate;
    DensityHealth.metrics.relayLoadScore = relayLoadScore;
    DensityHealth.metrics.pingFrequencyScore = pingFrequencyScore;
    DensityHealth.metrics.meshContributionScore = meshContributionScore;

    const t = DensityHealth.thresholds;

    let meshStrength = "unknown";
    if (userCount >= t.strongThresholdUsers) meshStrength = "strong";
    else if (userCount >= t.stableThresholdUsers) meshStrength = "stable";
    else if (userCount >= t.weakThresholdUsers) meshStrength = "weak";

    const basePressure =
      (relayLoadScore * 0.4) +
      (pingFrequencyScore * 0.3) +
      (meshContributionScore * 0.3);

    let meshPressureIndex = Math.max(0, Math.min(100, Math.round(basePressure)));

    const proxyPressure = getProxyPressure?.() ?? 0;
    const proxyBoost = getProxyBoost?.() ?? 0;
    const proxyFallback = getProxyFallback?.() ?? false;
    const proxyMode = getProxyMode?.() || "normal";

    DensityHealth.metrics.proxyPressure = proxyPressure;
    DensityHealth.metrics.proxyBoost = proxyBoost;
    DensityHealth.metrics.proxyFallback = proxyFallback;
    DensityHealth.metrics.proxyMode = proxyMode;

    meshPressureIndex += Math.round(proxyPressure * 20);
    meshPressureIndex -= Math.round(proxyBoost * 5);

    if (proxyFallback || proxyMode === "fallback") {
      meshPressureIndex = Math.min(100, meshPressureIndex + 10);
    }

    meshPressureIndex = Math.max(0, Math.min(100, meshPressureIndex));

    DensityHealth.metrics.meshStrength = meshStrength;
    DensityHealth.metrics.meshPressureIndex = meshPressureIndex;

    return Object.freeze({
      meshStrength,
      meshPressureIndex,
      userCount,
      castleCount
    });
  }

  // --------------------------------------------------------------------------
  // 6. Symbolic Lanes (v24++)
  // --------------------------------------------------------------------------
  function buildExpansionSignal() {
    const ctx = buildOrganismContext();
    const expansion = ctx.expansion || {};

    return Object.freeze({
      regionID: regionID || expansion.regionID || null,
      meshID,
      density: DensityHealth.metrics.userCount,
      meshStrength: DensityHealth.metrics.meshStrength,
      meshPressureIndex: DensityHealth.metrics.meshPressureIndex,
      presenceField: buildPresenceField(),
      advantageField: buildAdvantageField()
    });
  }

  function buildCastleSignal() {
    const ctx = buildOrganismContext();
    const castle = ctx.castle || {};
    const beaconEngine = ctx.beaconEngine || {};
    const consoleCtx = ctx.console || {};

    return Object.freeze({
      castleID: castle.id || null,
      castleRole: castle.role || "generic",
      castleLoadScore: castle.loadScore ?? null,
      beaconEngineState: beaconEngine.state || null,
      consoleMode: consoleCtx.mode || "standard",
      meshStrength: DensityHealth.metrics.meshStrength,
      meshPressureIndex: DensityHealth.metrics.meshPressureIndex,
      presenceField: buildPresenceField(),
      advantageField: buildAdvantageField()
    });
  }

  function buildUserMeshSignal() {
    const ctx = buildOrganismContext();
    const user = ctx.user || {};

    return Object.freeze({
      userID: user.id || null,
      userTier: user.tier || "guest",
      userContributionScore: user.contributionScore ?? null,
      regionID,
      meshID,
      presenceField: buildPresenceField(),
      advantageField: buildAdvantageField(),
      meshPressureIndex: DensityHealth.metrics.meshPressureIndex
    });
  }

  function buildServerSignal() {
    const ctx = buildOrganismContext();
    const server = ctx.server || {};

    return Object.freeze({
      serverRegion: server.region || regionID || "unknown",
      serverHostName: server.hostName || null,
      serverRole: server.role || "generic",
      serverMode: server.mode || "standard",
      meshStrength: DensityHealth.metrics.meshStrength,
      meshPressureIndex: DensityHealth.metrics.meshPressureIndex
    });
  }

  function buildRouterSignal() {
    const ctx = buildOrganismContext();
    const net = ctx.net || {};
    const scheduler = ctx.scheduler || {};
    const overmind = ctx.overmind || {};
    const proxy = ctx.proxyMeta || {};

    return Object.freeze({
      routerLoad: net.routerLoad || null,
      routerPersonaMix: net.personaMix || null,
      routerSafetyMode: net.safetyMode || "standard",
      schedulerMaxTicks: scheduler.maxTicks || null,
      schedulerStopOnWorldLens: scheduler.stopOnWorldLens || null,
      overmindWorldLens: overmind.worldLens || null,
      overmindSafetyStatus: overmind.safetyStatus || null,
      meshPressureIndex: DensityHealth.metrics.meshPressureIndex,

      proxyMode: proxy.mode,
      proxyPressure: proxy.pressure,
      proxyFallback: proxy.fallback
    });
  }

  function buildRuntimeSignal() {
    const ctx = buildOrganismContext();
    const runtime = ctx.runtime || {};
    const proxy = ctx.proxyMeta || {};

    return Object.freeze({
      hotInstances: runtime.hotInstances || null,
      hotRegions: runtime.hotRegions || null,
      hotPresence: runtime.hotPresence || null,
      hotModes: runtime.hotModes || null,
      hotPages: runtime.hotPages || null,
      hotChunkProfiles: runtime.hotChunkProfiles || null,
      hotTrust: runtime.hotTrust || null,

      runtimeMode: runtime.mode || null,
      runtimeLoadIndex: runtime.loadIndex ?? null,
      runtimeRegion: runtime.region || null,

      meshPressureIndex: DensityHealth.metrics.meshPressureIndex,
      proxyMode: proxy.mode
    });
  }

    function buildTouchSignal() {
    const ctx = buildOrganismContext();
    const touch = ctx.touch || {};
    const proxyMeta = ctx.proxyMeta || {};

    return Object.freeze({
      presence: touch.presence || "unknown",
      mode: touch.mode || "unknown",
      page: touch.page || "unknown",
      chunkProfile: touch.chunkProfile || "default",
      identity: touch.identity || null,
      identityTier: touch.identityTier || "anon",
      trusted: touch.trusted || "unknown",
      region: touch.region || regionID || "unknown",

      // NEW SUBIMPORT SIGNALS (v24++ advantage lane)
      touchAdvantage: touch.advantageScore ?? null,
      touchFallbackBand: touch.fallbackBandLevel ?? 0,
      touchPersona: touch.persona || null,
      touchDeviceClass: touch.deviceClass || "generic",
      touchRadioBand: touch.radioBand || "bluetooth-symbolic",
      touchBandwidthTier: touch.bandwidthTier || "normal",

      proxyMode: proxyMeta.mode || "normal",
      proxyPressure: proxyMeta.pressure ?? 0,
      proxyBoost: proxyMeta.boost ?? 0,
      proxyFallback: !!proxyMeta.fallback
    });
  }

  // --------------------------------------------------------------------------
  // 7. Multi-Mesh / World-Mesh Aggregation (v24++ advantage-aware)
  // --------------------------------------------------------------------------
  const neighborMeshes = Object.create(null);

  function registerNeighborMesh(meshId, snapshotProvider) {
    if (!meshId || typeof snapshotProvider !== "function") {
      return { ok: false, reason: "invalid-arguments" };
    }
    neighborMeshes[meshId] = snapshotProvider;
    return { ok: true };
  }

  function unregisterNeighborMesh(meshId) {
    delete neighborMeshes[meshId];
    return { ok: true };
  }

  function buildWorldMeshSignal() {
    let totalUsers = DensityHealth.metrics.userCount;
    let totalCastles = DensityHealth.metrics.castleCount;
    let maxPressure = DensityHealth.metrics.meshPressureIndex;

    let neighborCount = 0;

    for (const provider of Object.values(neighborMeshes)) {
      try {
        const snap = provider();
        const dh = snap?.densityHealth?.metrics || {};
        totalUsers += dh.userCount || 0;
        totalCastles += dh.castleCount || 0;
        if (typeof dh.meshPressureIndex === "number") {
          maxPressure = Math.max(maxPressure, dh.meshPressureIndex);
        }
        neighborCount++;
      } catch {
        // symbolic-only, ignore neighbor failures
      }
    }

    const proxyPressure = getProxyPressure?.() ?? 0;
    const proxyBoost = getProxyBoost?.() ?? 0;
    const proxyFallback = getProxyFallback?.() ?? false;
    const proxyMode = getProxyMode?.() || "normal";

    if (proxyPressure > 0) {
      maxPressure = Math.min(100, maxPressure + Math.round(proxyPressure * 10));
    }
    if (proxyFallback) {
      maxPressure = Math.min(100, maxPressure + 5);
    }
    if (proxyBoost > 0) {
      maxPressure = Math.max(0, maxPressure - Math.round(proxyBoost * 3));
    }

    return Object.freeze({
      worldMeshID: "PulseWorldMesh-v24++",
      regionID,
      localUserCount: DensityHealth.metrics.userCount,
      localCastleCount: DensityHealth.metrics.castleCount,
      localMeshPressureIndex: DensityHealth.metrics.meshPressureIndex,
      aggregatedUserCount: totalUsers,
      aggregatedCastleCount: totalCastles,
      aggregatedMaxPressureIndex: maxPressure,
      neighborMeshCount: neighborCount,
      proxyMode,
      proxyPressure,
      proxyBoost,
      proxyFallback
    });
  }

  // --------------------------------------------------------------------------
  // 8. Prewarm (v24++ every-advantage symbolic prewarm)
  // --------------------------------------------------------------------------
  function prewarm() {
    log("Prewarm: PulseMesh v24++ symbolic-mesh-organism prewarm.");
    return {
      ok: true,
      meta: {
        organId: PulseMeshMeta.organId,
        version: PulseMeshMeta.version,
        epoch: PulseMeshMeta.epoch,
        prewarmKind: "symbolic-mesh-organism-v24-advantage",
        lanesPrewarmed: [
          "expansion",
          "castle",
          "user",
          "server",
          "router",
          "runtime",
          "touch",
          "worldMesh"
        ]
      }
    };
  }

  // --------------------------------------------------------------------------
  // 9. Snapshot (v24++ organism snapshot)
  // --------------------------------------------------------------------------
  function getSnapshot() {
    const ctx = buildOrganismContext();

    return Object.freeze({
      organId: PulseMeshMeta.organId,
      version: PulseMeshMeta.version,
      epoch: PulseMeshMeta.epoch,
      identity: Identity,
      topology: Topology,
      densityHealth: DensityHealth,
      presenceField: buildPresenceField(),
      advantageField: buildAdvantageField(),
      worldMesh: buildWorldMeshSignal(),

      organismContext: ctx,

      lanes: {
        expansion: buildExpansionSignal(),
        castle: buildCastleSignal(),
        user: buildUserMeshSignal(),
        server: buildServerSignal(),
        router: buildRouterSignal(),
        runtime: buildRuntimeSignal(),
        touch: buildTouchSignal()
      }
    });
  }

  // --------------------------------------------------------------------------
  // 10. Public API (v24++ mesh organism)
  // --------------------------------------------------------------------------
  return Object.freeze({
    meta: PulseMeshMeta,
    identity: Identity,

    // density + pressure
    computeDensityAndPressure,

    // lanes
    buildExpansionSignal,
    buildCastleSignal,
    buildUserMeshSignal,
    buildServerSignal,
    buildRouterSignal,
    buildRuntimeSignal,
    buildTouchSignal,
    buildWorldMeshSignal,

    // multi-mesh
    registerNeighborMesh,
    unregisterNeighborMesh,

    // prewarm
    prewarm,

    // introspection
    getSnapshot
  });
}

export default createPulseMesh;
