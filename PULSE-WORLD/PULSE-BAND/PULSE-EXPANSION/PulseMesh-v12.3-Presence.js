/**
 * ============================================================================
 *  PULSE-WORLD : PulseMesh-v16-IMMORTAL-ORGANISM.js
 *  ORGAN TYPE: Connectivity / Symbolic Mesh Organism
 *  VERSION: v16-IMMORTAL-ORGANISM
 * ============================================================================
 *
 *  ROLE:
 *    PulseMesh is the symbolic connective tissue of PulseWorld.
 *
 *    In v16-IMMORTAL-ORGANISM, Mesh is no longer a floating kernel.
 *    It is the ORGANISM MAP — the symbolic view that connects:
 *
 *      - PulseExpansion (world / region / cluster)
 *      - PulseCastle (castles / beacons / engines)
 *      - PulseServer (server lanes)
 *      - PulseUser (user lanes)
 *      - PulseTouch (presence / mode / page / chunkProfile / trust / identity)
 *      - PulseNet (mesh family / ingress / pressure)
 *      - PulseRuntime (hot instances / regions / presence / modes / pages)
 *      - PulseScheduler (macro tick orchestration)
 *      - PulseOvermind (world-lens / safety)
 *
 *    It does NOT route, send, forward, or execute anything.
 *    It ONLY computes and emits symbolic signals:
 *
 *      - density
 *      - health
 *      - pressure
 *      - presence
 *      - advantage
 *      - organism lanes (user / castle / server / router / runtime / overmind)
 *      - world-mesh aggregation
 *
 *  CONTRACT:
 *    - Pure symbolic mesh (no routing, no sending, no execution).
 *    - Prefer local-first symbolic signals.
 *    - Must expose clear density + health + pressure + lane signals.
 *    - Must remain deterministic, synthetic, and drift-proof.
 *    - Must support multi-mesh / world-mesh aggregation (symbolic only).
 *    - Must never mutate input.
 *    - Must never perform network or filesystem operations.
 *    - Must never depend on real time or randomness.
 */
/*
AI_EXPERIENCE_META = {
  identity: "PulseMesh",
  version: "v16-IMMORTAL-ORGANISM",
  layer: "connectivity",
  role: "symbolic_mesh_organism",
  lineage: "PulseMesh-v1 → v11-Evo → v15-IMMORTAL → v16-IMMORTAL-ORGANISM",

  evo: {
    symbolicMeshKernel: true,
    organismMap: true,
    dualBandAware: true,
    binaryAware: true,

    deterministic: true,
    driftProof: true,
    pureCompute: true,

    zeroNetwork: true,
    zeroFilesystem: true,
    zeroMutationOfInput: true,
    zeroDynamicImports: true,
    zeroEval: true,

    presenceAware: true,
    advantageAware: true,
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
    proxyBoostAware: true
  },

  contract: {
    always: [
      "PulseExpansion",
      "PulseCastle",
      "PulseServer",
      "PulseUser",
      "PulseTouch",
      "PulseNet",
      "PulseRuntime",
      "PulseScheduler",
      "PulseOvermind"
    ],
    never: [
      "routerCore",
      "safeRoute",
      "fetchViaCNS",
      "meshKernelExec",
      "presenceEngineExec"
    ]
  }
}
*/

// ============================================================================
// IMPORTS — ORGANISM CONTEXT PROVIDERS (kept exactly as in your tree)
// ============================================================================

// Castle / Server / Router / Expansion meta
import { PulseExpansionMeta, createPulseExpansion } from "../PULSE-EXPANSION/PulseExpansion-v12.3-Presence.js";
import { PulseCastleMeta, createPulseCastle } from "../PULSE-EXPANSION/PulseCastle-v12.3-Presence.js";
import { PulseServerMeta, createPulseServer } from "../PULSE-EXPANSION/PulseServer-v12.3-Presence.js";
import { PulseBeaconMesh } from "../PULSE-EXPANSION/PulseMesh-v12.3-Presence.js";
import { PulseRouterMeta, createPulseRouter } from "../PULSE-EXPANSION/PulseRouter-v12.3-Presence.js";
// User lanes
import { getPulseUserContext, createPulseWorldCore } from "../PULSE-EXPANSION/PulseUser-v12.3-Presence.js";

import { getBeaconEngineContext } from "../PULSE-EXPANSION/PulseBeaconEngine-v12.3-Presence.js";
import { getConsoleContext } from "../PULSE-EXPANSION/PulseBeaconConsole-v12.3-Presence.js";

// Touch (presence / mode / page / chunkProfile / trust / identity)
import { getPulseTouchContext } from "../../PULSE-UI/PULSE-TOUCH.js";

// Net (mesh family / ingress / pressure)
import { getPulseNetContext } from "../../PULSE-UI/_BACKEND/PULSE-NET.js";

// Runtime (hot instances / regions / presence / modes / pages / trust)
import { getPulseRuntimeContext } from "../PULSE-X/PulseRuntime-v2-Evo.js";

// Scheduler (macro ticks / policies / world-lens stop conditions)
import { getPulseSchedulerContext } from "../PULSE-X/PulseScheduler-v2.js";

// Overmind (world-lens / safety / persona mix)
import { getPulseOvermindContext } from "../PULSE-AI/aiOvermindPrime.js";

// Proxy context (symbolic-only, IMMORTAL-safe)
import {
  getProxyContext,
  getProxyPressure,
  getProxyBoost,
  getProxyFallback,
  getProxyMode,
  getProxyLineage
} from "../PULSE-PROXY/PulseProxyContext-v16.js";

// ============================================================================
// v16 ORGANISM CONTEXT SHIMS (sub-imports actually implemented)
// ============================================================================
//
// Mesh already *consumes* these symbolic contexts in buildOrganismContext.
// Here we provide deterministic, synthetic shims so every lane has a stable
// v16-ready view, without adding IO or routing.
//

// Singletons (symbolic only, no network / no async)
const _expansionSingleton =
  (typeof createPulseExpansion === "function"
    ? createPulseExpansion({})
    : null) || null;

const _castleSingleton =
  (typeof createPulseCastle === "function"
    ? createPulseCastle({})
    : null) || null;

const _serverSingleton =
  (typeof createPulseServer === "function"
    ? createPulseServer({})
    : null) || null;

// Symbolic context getters used by Mesh
function getPulseExpansionContext() {
  // v16-style: expose meta + any lightweight snapshot the core exposes
  return {
    meta: PulseExpansionMeta,
    core: _expansionSingleton || null
  };
}

function getPulseCastleContext() {
  return {
    meta: PulseCastleMeta,
    core: _castleSingleton || null
  };
}

function getPulseServerContext() {
  return {
    meta: PulseServerMeta,
    core: _serverSingleton || null
  };
}

// ============================================================================
// META
// ============================================================================

export const PulseMeshMeta = Object.freeze({
  organId: "PulseMesh-v16-IMMORTAL-ORGANISM",
  role: "SYMBOLIC_MESH_ORGANISM",
  version: "v16-IMMORTAL-ORGANISM",
  epoch: "v16-IMMORTAL-ORGANISM",
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
    fallbackBandAware: true,
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
    proxyBoostAware: true
  })
});

// ============================================================================
// FACTORY: createPulseMesh — v16-IMMORTAL-ORGANISM
// ============================================================================

export function createPulseMesh({
  meshID = null,
  regionID = null,
  trace = false
} = {}) {
  const Identity = Object.freeze({
    meshID,
    regionID,
    createdBy: "PulseExpansion",
    version: "v16-IMMORTAL-ORGANISM"
  });

  const log = (...args) => trace && console.log("[PulseMesh v16]", ...args);
  log("PulseMesh created:", { meshID, regionID });

  // --------------------------------------------------------------------------
  // 1. Topology (symbolic only)
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
  // 2. Density, Health & Pressure (deterministic)
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

      // Proxy-aware overlays
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
  // 3. Organism Context — pull from all organs (symbolic only)
  // --------------------------------------------------------------------------
  function buildOrganismContext() {
    // All of these are pure context getters; they must not perform IO.
    const expansion = getPulseExpansionContext?.() || {};
    const castle = getPulseCastleContext?.() || {};
    const beaconEngine = getBeaconEngineContext?.() || {};
    const consoleCtx = getConsoleContext?.() || {};
    const server = getPulseServerContext?.() || {};
    const user = getPulseUserContext?.() || {};
    const touch = getPulseTouchContext?.() || {};
    const net = getPulseNetContext?.() || {};
    const runtime = getPulseRuntimeContext?.() || {};
    const scheduler = getPulseSchedulerContext?.() || {};
    const overmind = getPulseOvermindContext?.() || {};

    const proxyMeta = {
      context: getProxyContext?.() || null,
      pressure: getProxyPressure?.() ?? 0,
      boost: getProxyBoost?.() ?? 0,
      fallback: getProxyFallback?.() ?? false,
      mode: getProxyMode?.() || "normal",
      lineage: getProxyLineage?.() || null
    };

    return {
      expansion,
      castle,
      beaconEngine,
      console: consoleCtx,
      server,
      user,
      touch,
      net,
      runtime,
      scheduler,
      overmind,
      proxyMeta
    };
  }

  // --------------------------------------------------------------------------
  // 4. Presence & Advantage Fields (organism-aware)
  // --------------------------------------------------------------------------
  function buildPresenceField() {
    const ctx = buildOrganismContext();
    const touch = ctx.touch || {};
    const runtime = ctx.runtime || {};
    const net = ctx.net || {};
    const overmind = ctx.overmind || {};
    const proxyMeta = ctx.proxyMeta || {};

    return Object.freeze({
      bandPresence: touch.bandPresence || "unknown",
      routerPresence: net.routerPresence || "unknown",
      devicePresence: touch.devicePresence || "unknown",
      meshPresence: DensityHealth.metrics.meshStrength || "unknown",

      touchPresence: touch.presence || "unknown",
      touchMode: touch.mode || "unknown",
      touchPage: touch.page || "unknown",
      touchChunkProfile: touch.chunkProfile || "default",
      touchTrusted: touch.trusted || "unknown",
      touchIdentityTier: touch.identityTier || "anon",

      runtimeHotPresence: runtime.hotPresence || null,
      runtimeHotModes: runtime.hotModes || null,
      runtimeHotPages: runtime.hotPages || null,

      netInstanceCount: net.instanceCount || null,
      netIngressPressure: net.meshPressureIndex || null,

      overmindWorldLens: overmind.worldLens || null,

      // Proxy overlays
      proxyMode: proxyMeta.mode || "normal",
      proxyFallback: !!proxyMeta.fallback
    });
  }

  function buildAdvantageField() {
    const ctx = buildOrganismContext();
    const touch = ctx.touch || {};
    const runtime = ctx.runtime || {};
    const expansion = ctx.expansion || {};
    const user = ctx.user || {};
    const proxyMeta = ctx.proxyMeta || {};

    return Object.freeze({
      advantageScore: touch.advantageScore ?? null,
      advantageBand: touch.advantageBand ?? "neutral",
      fallbackBandLevel: touch.fallbackBandLevel ?? 0,

      touchAdvantage: touch.advantageScore ?? null,
      touchTrust: touch.trust ?? "unknown",
      touchIdentityTier: touch.identityTier ?? "anon",

      runtimeContributionHeat: runtime.hotInstances || null,
      expansionTier: expansion.tier || null,
      userContributionScore: user.contributionScore ?? null,

      // Proxy overlays
      proxyPressure: proxyMeta.pressure ?? 0,
      proxyBoost: proxyMeta.boost ?? 0,
      proxyFallback: !!proxyMeta.fallback
    });
  }

  // --------------------------------------------------------------------------
  // 5. Density + Pressure Computation
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

    // Proxy overlays (symbolic-only, deterministic)
    const proxyPressure = getProxyPressure?.() ?? 0;
    const proxyBoost = getProxyBoost?.() ?? 0;
    const proxyFallback = getProxyFallback?.() ?? false;
    const proxyMode = getProxyMode?.() || "normal";

    DensityHealth.metrics.proxyPressure = proxyPressure;
    DensityHealth.metrics.proxyBoost = proxyBoost;
    DensityHealth.metrics.proxyFallback = proxyFallback;
    DensityHealth.metrics.proxyMode = proxyMode;

    // Increase pressure when proxy is under strain, reduce slightly on boost
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
  // 6. Symbolic Lanes: Expansion / Castle / User / Server / Router / Runtime
  // --------------------------------------------------------------------------
  function buildExpansionSignal() {
    const ctx = buildOrganismContext();
    const expansion = ctx.expansion || {};

    return Object.freeze({
      regionID: regionID || expansion.regionID || null,
      meshID,
      clusterID: expansion.clusterID || null,
      shardID: expansion.shardID || null,
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
    const proxyMeta = ctx.proxyMeta || {};

    return Object.freeze({
      routerLoad: net.routerLoad || null,
      routerPersonaMix: net.personaMix || null,
      routerSafetyMode: net.safetyMode || "standard",
      schedulerMaxTicks: scheduler.maxTicks || null,
      schedulerStopOnWorldLens: scheduler.stopOnWorldLens || null,
      overmindWorldLens: overmind.worldLens || null,
      overmindSafetyStatus: overmind.safetyStatus || null,
      meshPressureIndex: DensityHealth.metrics.meshPressureIndex,

      proxyMode: proxyMeta.mode || "normal",
      proxyPressure: proxyMeta.pressure ?? 0,
      proxyFallback: !!proxyMeta.fallback
    });
  }

  function buildRuntimeSignal() {
    const ctx = buildOrganismContext();
    const runtime = ctx.runtime || {};
    const proxyMeta = ctx.proxyMeta || {};

    return Object.freeze({
      hotInstances: runtime.hotInstances || null,
      hotRegions: runtime.hotRegions || null,
      hotPresence: runtime.hotPresence || null,
      hotModes: runtime.hotModes || null,
      hotPages: runtime.hotPages || null,
      hotChunkProfiles: runtime.hotChunkProfiles || null,
      hotTrust: runtime.hotTrust || null,
      meshPressureIndex: DensityHealth.metrics.meshPressureIndex,

      proxyMode: proxyMeta.mode || "normal"
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

      proxyMode: proxyMeta.mode || "normal"
    });
  }

  // --------------------------------------------------------------------------
  // 7. Multi-Mesh / World-Mesh Aggregation
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

    for (const provider of Object.values(neighborMeshes)) {
      try {
        const snap = provider();
        const dh = snap?.densityHealth?.metrics || {};
        totalUsers += dh.userCount || 0;
        totalCastles += dh.castleCount || 0;
        if (typeof dh.meshPressureIndex === "number") {
          maxPressure = Math.max(maxPressure, dh.meshPressureIndex);
        }
      } catch {}
    }

    const proxyPressure = getProxyPressure?.() ?? 0;
    const proxyFallback = getProxyFallback?.() ?? false;

    if (proxyPressure > 0) {
      maxPressure = Math.min(100, maxPressure + Math.round(proxyPressure * 10));
    }
    if (proxyFallback) {
      maxPressure = Math.min(100, maxPressure + 5);
    }

    return Object.freeze({
      worldMeshID: "PulseWorldMesh",
      regionID,
      localUserCount: DensityHealth.metrics.userCount,
      localCastleCount: DensityHealth.metrics.castleCount,
      localMeshPressureIndex: DensityHealth.metrics.meshPressureIndex,
      aggregatedUserCount: totalUsers,
      aggregatedCastleCount: totalCastles,
      aggregatedMaxPressureIndex: maxPressure
    });
  }

  // --------------------------------------------------------------------------
  // 8. Prewarm
  // --------------------------------------------------------------------------
  function prewarm() {
    log("Prewarm: PulseMesh v16 symbolic prewarm.");
    return {
      ok: true,
      meta: {
        organId: PulseMeshMeta.organId,
        version: PulseMeshMeta.version,
        prewarmKind: "symbolic-mesh-organism"
      }
    };
  }

  // --------------------------------------------------------------------------
  // 9. Snapshot
  // --------------------------------------------------------------------------
  function getSnapshot() {
    const ctx = buildOrganismContext();

    return Object.freeze({
      organId: PulseMeshMeta.organId,
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
  // 10. Public API
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
