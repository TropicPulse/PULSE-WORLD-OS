/**
 * ============================================================================
 *  PULSE EXPANSION — v24-Immortal++
 *  Presence Region Governor / Network Stretcher to PULSE-NET
 *  Every-Advantage / Regioning-Aware / Beacon-Aware / Castle-Aware / PulseNet-Aware
 *  Heartbeat-Driven (heartbeat / aiHeartbeat / earnHeartbeat)
 *  Federal Strategist for capacity, stress, governance, treasury, mesh, routes.
 * ============================================================================
 */
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝

import { PulseProofBridgeLogger as logger } from "../../PULSEVISION/____BACKEND/PULSE-WORLD-BRIDGE.js";

// v24 Castle + v24 world core
import {
  PulseCastleMeta,
  summarizeCastlePresence
} from "./PULSE-EXPANSION-CASTLE.js";

import {
  PulseWorldCoreMeta,
  createPulseWorldCore
} from "./PULSE-EXPANSION-USER.js"; // world core stays v16 but referenced as OS meta

// v16 server/router
import {
  PulseServerMeta,
  createPulseServer
} from "./PULSE-EXPANSION-SERVER.js";

import {
  PulseRouterMeta,
  createPulseRouter
} from "../X-PULSE-X/PULSE-WORLD-INTERNET-ROUTER.js";

// Beacon mesh / engine
import {
  PulseBeaconMeshMeta,
  PulseBeaconMesh
} from "./PULSE-EXPANSION-BEACON-MESH.js";

import {
  PulseBeaconMeta as PulseBeaconEngineMeta,
  createPulseBeaconEngine
} from "./PULSE-EXPANSION-BEACON-ENGINE.js";

// v16 mesh + binary mesh metas
import { PulseMeshMeta } from "../PULSE-MESH/PulseMesh-v30.js";
import { BinaryMeshMeta } from "../PULSE-MESH/PulseMeshBinary-v30.js";
import { createBinaryPulse } from "../PULSE-TECH/PULSE-TECH-BINARY-WAVE.js";
// Touch / presence
import { getPulseTouchContext } from "../../PULSE-MULTIVERSE/PULSEWORLD/PULSE-WORLD-TOUCH.js";

// Runtime / scheduler / overmind
import { getPulseRuntimeContext } from "../X-PULSE-X/PulseWorldRuntime-v20.js";
import { getPulseSchedulerContext } from "../X-PULSE-X/PulseWorldScheduler-v20.js";
import { getPulseOvermindContext } from "../X-PULSE-X/PULSE-WORLD-ALDWYN.js";

// Earn / treasury
import { getEarnContext } from "../PULSE-EARN/PulseEarn-v24.js";

// PROXY CONTEXT
import {
  getProxyContext,
  getProxyPressure,
  getProxyBoost,
  getProxyFallback,
  getProxyMode,
  getProxyLineage
} from "../PULSE-PROXY/PulseProxyContext-v20.js";

import { createPulseNodeEvolutionV16 } from "../PULSE-TOOLS/PulseToolsNodeEvolution-v20.js";


// ============================================================================
//  PULSE-NET BRIDGE CONTRACT (NO IMPORTS, PURELY INJECTED)
// ============================================================================

function safePulseNetCall(pulseNetBridge, method, payload) {
  if (!pulseNetBridge) return { ok: false, reason: "no_pulse_net_bridge" };
  const fn = pulseNetBridge[method];
  if (typeof fn !== "function") {
    return { ok: false, reason: "method_not_available", method };
  }
  try {
    return fn(payload) || { ok: true };
  } catch (e) {
    logger?.log?.("expansion", "pulse_net_bridge_error", {
      method,
      error: String(e)
    });
    return { ok: false, reason: "bridge_error" };
  }
}

// ============================================================================
//  META — FULL-ADVANTAGE STRATEGIST VIEW (v24-Immortal++)
// ============================================================================

export const PulseExpansionMeta = Object.freeze({
  layer: "PulseExpansion",
  role: "PRESENCE_STRATEGIST_ORGAN",
  version: "v24-Immortal++",
  identity: "PulseExpansion-v24-Immortal++",

  world: Object.freeze({
    castleMeta: PulseCastleMeta,
    osMeta: PulseWorldCoreMeta
  }),

  beacons: Object.freeze({
    engineMeta: PulseBeaconEngineMeta,
    meshMeta: PulseBeaconMeshMeta
  }),

  connectivity: Object.freeze({
    meshMeta: PulseMeshMeta,
    binaryMeshMeta: BinaryMeshMeta,
    routerMeta: PulseRouterMeta
  }),

  server: Object.freeze({
    pulseServerMeta: PulseServerMeta
  }),

  guarantees: Object.freeze({
    deterministic: true,
    driftProof: true,
    multiRegionReady: true,
    multiCastleReady: true,
    meshAware: true,
    presenceFieldAware: true,
    advantageAware: true,
    chunkPrewarmAware: true,
    soldierAware: true,
    treasuryAware: true,
    treasuryPressureAware: true,
    capacitySignalAware: true,
    stressSignalAware: true,
    beaconAware: true,
    beaconMeshAware: true,
    osBrainAware: true,
    routerAware: true,
    serverExecAware: true,
    binaryMeshAware: true,
    pulseNetAware: true,
    proxyAware: true,
    meshOrganismAware: true,
    heartbeatAware: true,
    aiHeartbeatAware: true,
    earnHeartbeatAware: true,

    zeroRandomness: true,
    zeroDynamicImports: true,
    zeroEval: true,
    zeroNetworkFetch: true,
    zeroAI: true,
    zeroRouting: true,
    zeroComputeMath: true
  })
});

// ============================================================================
//  TYPES
// ============================================================================

export class ExpansionAction {
  constructor({
    regionId,
    hostHint = null,
    tier = "normal",
    reason = "capacity",
    desiredServers = 1,
    desiredSoldiers = 0
  }) {
    this.type = "expand";
    this.regionId = regionId;
    this.hostHint = hostHint;
    this.tier = tier;
    this.reason = reason;
    this.desiredServers = desiredServers;
    this.desiredSoldiers = desiredSoldiers;
  }
}

export class ContractionAction {
  constructor({
    castleId,
    reason = "low_load",
    removeServers = 1,
    removeSoldiers = 0
  }) {
    this.type = "contract";
    this.castleId = castleId;
    this.reason = reason;
    this.removeServers = removeServers;
    this.removeSoldiers = removeSoldiers;
  }
}

export class SoldierDelegationAction {
  constructor({
    castleId,
    spawn = 0,
    kill = 0,
    reason = "presence_adjustment"
  }) {
    this.type = "soldier_delegation";
    this.castleId = castleId;
    this.spawn = spawn;
    this.kill = kill;
    this.reason = reason;
  }
}

export class MeshRebalanceAction {
  constructor({ castleId, targetCastleId, action = "link" }) {
    this.type = "mesh_rebalance";
    this.castleId = castleId;
    this.targetCastleId = targetCastleId;
    this.action = action;
  }
}

export class RouteDefenseAction {
  constructor({
    regionId,
    castleId,
    reason = "protect_routes",
    desiredDefenders = 2
  }) {
    this.type = "route_defense";
    this.regionId = regionId;
    this.castleId = castleId;
    this.reason = reason;
    this.desiredDefenders = desiredDefenders;
  }
}

export class NodeAdminOrbitAction {
  constructor({
    castleId,
    intervalHint = "steady",
    pressureHint = "normal"
  }) {
    this.type = "nodeadmin_orbit";
    this.castleId = castleId;
    this.intervalHint = intervalHint;
    this.pressureHint = pressureHint;
  }
}

export class ExpansionPlan {
  constructor({
    expansions = [],
    contractions = [],
    rebalanceLinks = [],
    soldierDelegation = [],
    routeDefenseActions = [],
    nodeAdminOrbitActions = [],
    regionPresence = {},
    regionAdvantage = {},
    regionChunkPlan = {},
    bandSignature = null,
    binaryField = null,
    waveField = null,
    pulseNetIntents = [],
    meta = {}
  }) {
    this.expansions = expansions;
    this.contractions = contractions;
    this.rebalanceLinks = rebalanceLinks;
    this.soldierDelegation = soldierDelegation;
    this.routeDefenseActions = routeDefenseActions;
    this.nodeAdminOrbitActions = nodeAdminOrbitActions;
    this.regionPresence = regionPresence;
    this.regionAdvantage = regionAdvantage;
    this.regionChunkPlan = regionChunkPlan;
    this.bandSignature = bandSignature;
    this.binaryField = binaryField;
    this.waveField = waveField;
    this.pulseNetIntents = pulseNetIntents;
    this.meta = meta;
  }
}

// ============================================================================
//  INTERNAL HELPERS + ARTERY
// ============================================================================

function clamp01(x) {
  if (x == null || Number.isNaN(x)) return 0;
  return Math.max(0, Math.min(1, x));
}

function computeHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `h${h}`;
}

function buildBinaryField(cycle, heartbeat, aiHeartbeat, earnHeartbeat) {
  const hbFactor = clamp01(heartbeat?.intensity ?? 0.5);
  const aiFactor = clamp01(aiHeartbeat?.intensity ?? 0.5);
  const earnFactor = clamp01(earnHeartbeat?.throughput ?? 0.5);

  const densityBase = 10 + cycle * 3;
  const density = densityBase + Math.floor(hbFactor * 4 + aiFactor * 3 + earnFactor * 3);
  const surface = density + 12;

  return {
    binaryPhenotypeSignature: computeHash(`BEXP::${surface}::${hbFactor}::${aiFactor}::${earnFactor}`),
    binarySurfaceSignature: computeHash(`BEXP_SURF::${surface}`),
    binarySurface: {
      density,
      surface,
      patternLen: 12
    },
    parity: surface % 2,
    shiftDepth: Math.floor(Math.log2(surface || 1)),
    heartbeat: {
      hbFactor,
      aiFactor,
      earnFactor
    }
  };
}

function buildWaveField(cycle, band, heartbeat, aiHeartbeat, earnHeartbeat) {
  const hbPhase = heartbeat?.phase ?? 0;
  const aiPhase = aiHeartbeat?.phase ?? 0;
  const earnPhase = earnHeartbeat?.phase ?? 0;

  const baseAmp = band === "binary" ? 9 : 5;
  const amplitude = (cycle + 1) * baseAmp + hbPhase + aiPhase + earnPhase;

  return {
    amplitude,
    wavelength: amplitude + 3,
    phase: amplitude % 16,
    band,
    mode: band === "binary" ? "compression-wave" : "symbolic-wave",
    heartbeatPhase: {
      hbPhase,
      aiPhase,
      earnPhase
    }
  };
}

function buildBandSignature(band, heartbeat, aiHeartbeat) {
  const hbTag = heartbeat?.bandTag || "hb";
  const aiTag = aiHeartbeat?.bandTag || "ai";
  return computeHash(`EXP_BAND::${band}::${hbTag}::${aiTag}`);
}

function buildRegionPresenceField(regionInfo, cycle) {
  const castleCount = regionInfo.castles.length;
  const totalServers = regionInfo.totalServers;
  const avgPresence =
    regionInfo.castles.reduce(
      (a, c) => a + (c.presenceField?.presenceScore || 0),
      0
    ) / Math.max(1, castleCount);

  const composite =
    castleCount * 0.01 + totalServers * 0.005 + avgPresence * 0.02;

  const presenceTier =
    composite >= 0.5
      ? "presence_high"
      : composite >= 0.2
      ? "presence_mid"
      : "presence_low";

  return {
    presenceVersion: "v24-Immortal++",
    presenceTier,
    castleCount,
    totalServers,
    avgPresence,
    composite,
    cycle,
    presenceSignature: computeHash(
      `REGION_PRESENCE::${presenceTier}::${castleCount}::${totalServers}::${avgPresence}`
    )
  };
}

function buildRegionAdvantageField(regionInfo, presenceField, cycle) {
  const density = regionInfo.castles.length;
  const stress = regionInfo.castles.reduce(
    (a, c) => a + (c.presenceField?.stressIndex || 0),
    0
  );

  const advantageScore =
    density * 0.01 +
    stress * 0.005 +
    (presenceField.presenceTier === "presence_high" ? 0.1 : 0);

  return {
    advantageVersion: "v24-Immortal++",
    density,
    stress,
    presenceTier: presenceField.presenceTier,
    advantageScore,
    cycle
  };
}

function buildRegionChunkPrewarmPlan(
  regionInfo,
  presenceField,
  advantageField
) {
  const basePriority =
    presenceField.presenceTier === "presence_high"
      ? 3
      : presenceField.presenceTier === "presence_mid"
      ? 2
      : 1;

  const advantageBoost = advantageField.advantageScore > 0.1 ? 1 : 0;

  return {
    planVersion: "v24-Immortal++-Region-Advantage",
    priority: basePriority + advantageBoost,
    chunks: {
      castleEnvelope: true,
      serverEnvelope: true,
      soldierEnvelope: true
    },
    cache: {
      regionPresence: true,
      regionAdvantage: true
    },
    prewarm: {
      castleSpawn: true,
      serverSpawn: true,
      soldierSpawn: true
    }
  };
}

function createExpansionArtery() {
  const artery = {
    cycles: 0,
    expansions: 0,
    contractions: 0,
    rebalanceLinks: 0,
    soldierDelegations: 0,
    routeDefenses: 0,
    nodeAdminOrbits: 0,
    lastGlobalLoad: 0,
    lastProxyPressure: 0,
    lastBeaconPresenceScore: 0,
    snapshot() {
      return Object.freeze({
        cycles: artery.cycles,
        expansions: artery.expansions,
        contractions: artery.contractions,
        rebalanceLinks: artery.rebalanceLinks,
        soldierDelegations: artery.soldierDelegations,
        routeDefenses: artery.routeDefenses,
        nodeAdminOrbits: artery.nodeAdminOrbits,
        lastGlobalLoad: artery.lastGlobalLoad,
        lastProxyPressure: artery.lastProxyPressure,
        lastBeaconPresenceScore: artery.lastBeaconPresenceScore
      });
    }
  };
  return artery;
}

// ============================================================================
//  WORLD BOOT / PREWARM — CASTLE + BEACON ENGINE + MESH
// ============================================================================

const BeaconEngine = createPulseBeaconEngine
  ? createPulseBeaconEngine({ boundCastleID: "GLOBAL_CASTLE" })
  : null;

const BeaconMesh = BeaconEngine
  ? PulseBeaconMesh({
      beacon: BeaconEngine,
      meshID: "expansion-beacon-mesh",
      regionID: null,
      trace: false
    })
  : null;

// ============================================================================
//  CORE ORGAN — PulseExpansion v24-Immortal++
// ============================================================================

export class PulseExpansion {
  constructor(config = {}) {
    this.config = {
      defaultMaxCastlesPerRegion: 8,
      defaultMinCastlesPerRegion: 1,
      defaultDesiredServersPerCastle: 1,
      defaultDesiredSoldiersPerCastle: 3,
      ...config
    };
    this._expansionEvolution = createPulseNodeEvolutionV16({
      nodeType: "expansion",
      trace: false
    });

    this.cycle = 0;
    this.pulseNetBridge = config.pulseNetBridge || null;

    this.heartbeat = null;
    this.aiHeartbeat = null;
    this.earnHeartbeat = null;

    this.artery = createExpansionArtery();
    this.prewarmed = false;

    this.prewarm();
  }

  prewarm() {
    if (this.prewarmed) return true;

    void getPulseTouchContext?.();
    void getPulseRuntimeContext?.();
    void getPulseSchedulerContext?.();
    void getPulseOvermindContext?.();
    void getEarnContext?.();
    void getProxyContext?.();

    logger?.log?.("expansion", "prewarm_v24", {});

    this.prewarmed = true;
    return true;
  }

  snapshot() {
    return Object.freeze({
      meta: PulseExpansionMeta,
      cycle: this.cycle,
      artery: this.artery.snapshot()
    });
  }

  attachPulseNetBridge(bridge) {
    this.pulseNetBridge = bridge || null;
    return { ok: true, hasBridge: !!this.pulseNetBridge };
  }

  attachHeartbeats({ heartbeat, aiHeartbeat, earnHeartbeat } = {}) {
    this.heartbeat = heartbeat || null;
    this.aiHeartbeat = aiHeartbeat || null;
    this.earnHeartbeat = earnHeartbeat || null;
    return {
      ok: true,
      heartbeatAttached: !!this.heartbeat,
      aiHeartbeatAttached: !!this.aiHeartbeat,
      earnHeartbeatAttached: !!this.earnHeartbeat
    };
  }

  monitorCastleHealth({ castlePresence }) {
    if (!castlePresence) return { ok: false, reason: "no_castle_presence" };

    const unhealthy = [];

    for (const region of Object.values(castlePresence.byRegion || {})) {
      for (const c of region.castles || []) {
        const pf = c.presenceField || {};
        const presenceScore = pf.presenceScore ?? 0;
        const stressIndex = pf.stressIndex ?? 0;
        const governanceStabilityIndex = pf.governanceStabilityIndex ?? 1;

        if (presenceScore < 0.3 || stressIndex > 0.9 || governanceStabilityIndex < 0.3) {
          unhealthy.push({
            castleId: c.castleId,
            regionId: c.regionId,
            presenceField: pf
          });
        }
      }
    }

    return {
      ok: true,
      unhealthy,
      count: unhealthy.length
    };
  }

  monitorServerTakeover({ serverFallback }) {
    if (!serverFallback) return { ok: true, takeover: false };

    return {
      ok: true,
      takeover: !!serverFallback.takeover,
      reason: serverFallback.reason,
      serverCastleId: serverFallback.serverCastleId,
      serverCastlePresence: serverFallback.serverCastlePresence
    };
  }

  // ========================================================================
  // FEDERAL GOVERNANCE HELPERS — v24-Immortal++
  // ========================================================================

  detectPowerImbalance({ castleHealth, serverTakeover }) {
    const imbalance = {
      castleWeak: castleHealth.count > 0,
      serverDominating: serverTakeover.takeover === true,
      severity: 0
    };

    if (imbalance.castleWeak) imbalance.severity += 1;
    if (imbalance.serverDominating) imbalance.severity += 1;

    return imbalance;
  }

  haltRunawayBehavior({ imbalance }) {
    if (imbalance.severity === 0) return null;

    const target =
      imbalance.serverDominating && imbalance.castleWeak
        ? "server"
        : imbalance.serverDominating
        ? "server"
        : "castle";

    return {
      kind: "halt_runaway_v24",
      target,
      severity: imbalance.severity,
      reason: "federal_governance_intervention_v24"
    };
  }

  rebalanceGovernance({ imbalance }) {
    if (imbalance.severity === 0) return null;

    const actions = [];

    if (imbalance.castleWeak) {
      actions.push({
        kind: "spawn_castle_v24",
        reason: "castle_weakness_detected_v24"
      });
    }

    if (imbalance.serverDominating) {
      actions.push({
        kind: "reduce_server_influence_v24",
        reason: "server_dominance_detected_v24"
      });
    }

    return {
      kind: "governance_rebalance_v24",
      actions,
      severity: imbalance.severity
    };
  }

  // ========================================================================
  // INTERNET + BRAIN + MEMORY ROUTING ARTERIES — v25++ IMMORTAL
  // ========================================================================

  sendInternetRoute(route) {
    if (!this.pulseNetBridge || !this.pulseNetBridge.sendRoute) {
      return { ok: false, reason: "no_pulseNetBridge" };
    }

    return this.pulseNetBridge.sendRoute({
      type: "PulseNetExpansion",
      payload: {
        channel: "internet",
        route,
        cycle: this.cycle
      }
    });
  }

  sendBrainRoute(route) {
    if (!this.pulseNetBridge || !this.pulseNetBridge.sendRoute) {
      return { ok: false, reason: "no_pulseNetBridge" };
    }

    return this.pulseNetBridge.sendRoute({
      type: "PulseNetExpansion",
      payload: {
        channel: "brain",
        route,
        cycle: this.cycle
      }
    });
  }

  sendMemoryRoute(route) {
    if (!this.pulseNetBridge || !this.pulseNetBridge.sendRoute) {
      return { ok: false, reason: "no_pulseNetBridge" };
    }

    return this.pulseNetBridge.sendRoute({
      type: "PulseNetExpansion",
      payload: {
        channel: "memory",
        route,
        cycle: this.cycle
      }
    });
  }

  // ========================================================================
  // EVOLUTION PIPE — v24-Immortal++
  // ========================================================================

  _evolveExpansionPlan(plan, extraCtx = {}) {
    if (!this._expansionEvolution) return plan;

    const context = {
      cycle: this.cycle,
      heartbeat: this.heartbeat,
      aiHeartbeat: this.aiHeartbeat,
      earnHeartbeat: this.earnHeartbeat,

      // PROXY CONTEXT
      proxyMode: getProxyMode?.(),
      proxyPressure: getProxyPressure?.(),
      proxyBoost: getProxyBoost?.(),
      proxyFallback: getProxyFallback?.(),
      proxyLineage: getProxyLineage?.(),
      proxyContext: getProxyContext?.(),

      // TOUCH / RUNTIME / SCHEDULER / OVERMIND / EARN
      touch: getPulseTouchContext?.(),
      runtime: getPulseRuntimeContext?.(),
      scheduler: getPulseSchedulerContext?.(),
      overmind: getPulseOvermindContext?.(),
      earn: getEarnContext?.(),

      // METAS
      meshMeta: PulseMeshMeta,
      binaryMeshMeta: BinaryMeshMeta,
      beaconMeshMeta: PulseBeaconMeshMeta,
      beaconEngineMeta: PulseBeaconEngineMeta,
      serverMeta: PulseServerMeta,
      routerMeta: PulseRouterMeta,
      castleMeta: PulseCastleMeta,
      worldCoreMeta: PulseWorldCoreMeta,

      ...extraCtx
    };

    return this._expansionEvolution.evolveNodePulse({
      nodeType: "expansion",
      pulse: plan,
      context
    });
  }

  // ========================================================================
  // BUILD EXPANSION PLAN — v24-Immortal++
  // ========================================================================
  buildExpansionPlan({
    globalLoadIndex = 0,
    regionSignals = {},
    maxCastlesPerRegion = null,
    minCastlesPerRegion = null,
    heartbeat = null,
    aiHeartbeat = null,
    earnHeartbeat = null
  } = {}) {

    // Heartbeat-driven cycle
    const hb = heartbeat || this.heartbeat || {};
    const aiHb = aiHeartbeat || this.aiHeartbeat || {};
    const earnHb = earnHeartbeat || this.earnHeartbeat || {};

    if (typeof hb.tick === "number") {
      this.cycle = hb.tick;
    } else {
      this.cycle++;
    }

    this.artery.cycles += 1;

    const expansions = [];
    const contractions = [];
    const rebalanceLinks = [];
    const soldierDelegation = [];
    const routeDefenseActions = [];
    const nodeAdminOrbitActions = [];

    const { byRegion, meshLinksByCastleId } = summarizeCastlePresence();

    const effectiveMaxCastles =
      typeof maxCastlesPerRegion === "number" && maxCastlesPerRegion > 0
        ? maxCastlesPerRegion
        : this.config.defaultMaxCastlesPerRegion;

    const effectiveMinCastles =
      typeof minCastlesPerRegion === "number" && minCastlesPerRegion >= 0
        ? minCastlesPerRegion
        : this.config.defaultMinCastlesPerRegion;

    const globalLoad = clamp01(globalLoadIndex);
    this.artery.lastGlobalLoad = globalLoad;

    const regionPresence = {};
    const regionAdvantage = {};
    const regionChunkPlan = {};

    const beaconSnapshot = BeaconMesh?.getSnapshot?.() ?? null;
    const beaconPresenceField = beaconSnapshot?.composite?.presenceField ?? null;
    const beaconAdvantageField = beaconSnapshot?.composite?.advantageField ?? null;

    this.artery.lastBeaconPresenceScore =
      beaconPresenceField?.presenceScore ?? 0;

    const pulseNetIntents = [];

    // PROXY SNAPSHOT
    const proxyCtx = getProxyContext();
    const proxyPressure = getProxyPressure();
    const proxyBoost = getProxyBoost();
    const proxyFallback = getProxyFallback();
    const proxyMode = getProxyMode();
    const proxyLineage = getProxyLineage();

    this.artery.lastProxyPressure = proxyPressure || 0;

    // ======================================================================
    // REGION LOOP — v24-Immortal++
    // ======================================================================
    for (const [regionId, regionInfo] of Object.entries(byRegion)) {
      const signal = regionSignals[regionId] || {};
      const avgLoadIndex = clamp01(signal.avgLoadIndex ?? globalLoad);
      const userDensityHint = signal.userDensityHint ?? 0;
      const stressHint = clamp01(signal.stressHint ?? globalLoad);

      const presenceField = buildRegionPresenceField(regionInfo, this.cycle);
      let advantageField = buildRegionAdvantageField(regionInfo, presenceField, this.cycle);
      const chunkPlan = buildRegionChunkPrewarmPlan(regionInfo, presenceField, advantageField);

      const proxyPressureClamped = clamp01(proxyPressure || 0);
      const proxyStressBoost = proxyPressureClamped * 10;
      const proxyAdvantageBoost = proxyBoost ? 0.02 : 0;

      const adjustedStress =
        (advantageField.stress || 0) + proxyStressBoost;

      const adjustedAdvantageScore =
        (advantageField.advantageScore || 0) +
        proxyAdvantageBoost -
        (proxyFallback ? 0.05 : 0);

      advantageField = {
        ...advantageField,
        stress: adjustedStress,
        advantageScore: adjustedAdvantageScore,
        proxy: {
          mode: proxyMode,
          pressure: proxyPressure,
          boost: proxyBoost,
          fallback: proxyFallback,
          lineage: proxyLineage,
          context: proxyCtx
        }
      };

      regionPresence[regionId] = presenceField;
      regionAdvantage[regionId] = advantageField;
      regionChunkPlan[regionId] = chunkPlan;

      const castleCount = regionInfo.castles.length;

      // ============================================================
      // EXPANSION — v24
      // ============================================================
      const hbLoadBoost = clamp01(hb.intensity ?? 0);
      const aiLoadBoost = clamp01(aiHb.intensity ?? 0);
      const effectiveLoad = clamp01(
        avgLoadIndex + hbLoadBoost * 0.1 + aiLoadBoost * 0.1
      );

      const expansionPressure =
        effectiveLoad >= 0.6 ||
        userDensityHint >= 2000 ||
        stressHint >= 0.6 ||
        proxyPressureClamped >= 0.8;

      if (
        expansionPressure &&
        castleCount < effectiveMaxCastles &&
        !proxyFallback
      ) {
        const action = new ExpansionAction({
          regionId,
          tier: presenceField.presenceTier,
          reason: "high_load_or_density_or_proxy_pressure_v24",
          desiredServers: this.config.defaultDesiredServersPerCastle,
          desiredSoldiers: this.config.defaultDesiredSoldiersPerCastle
        });
        expansions.push(action);
        this.artery.expansions += 1;

        pulseNetIntents.push({
          kind: "expansion_request_v24",
          regionId,
          tier: presenceField.presenceTier,
          desiredServers: action.desiredServers,
          desiredSoldiers: action.desiredSoldiers,
          cycle: this.cycle,
          proxyMode,
          proxyPressure,
          heartbeatTick: hb.tick ?? null
        });
      }

      // ============================================================
      // CONTRACTION — v24
      // ============================================================
      const contractionPressure =
        effectiveLoad <= 0.2 &&
        castleCount > effectiveMinCastles &&
        proxyPressureClamped < 0.5;

      if (contractionPressure) {
        const candidate = regionInfo.castles[regionInfo.castles.length - 1];
        if (candidate) {
          const action = new ContractionAction({
            castleId: candidate.castleId,
            reason: "low_load_v24",
            removeServers: 1,
            removeSoldiers: 1
          });
          contractions.push(action);
          this.artery.contractions += 1;

          pulseNetIntents.push({
            kind: "contraction_request_v24",
            castleId: candidate.castleId,
            regionId,
            reason: action.reason,
            cycle: this.cycle,
            proxyMode,
            proxyPressure,
            heartbeatTick: hb.tick ?? null
          });
        }
      }

      // ============================================================
      // SOLDIER DELEGATION + ROUTE DEFENSE + NODEADMIN ORBIT — v24
      // ============================================================
      for (const c of regionInfo.castles) {
        const load = c.presenceField?.loadIndex ?? 0;
        const stress = c.presenceField?.stressIndex ?? 0;

        const highPressure =
          load >= 0.7 ||
          stress >= 0.7 ||
          proxyPressureClamped >= 0.8;

        const lowPressure =
          load <= 0.2 &&
          stress <= 0.2 &&
          proxyPressureClamped < 0.5;

        if (highPressure) {
          const action = new SoldierDelegationAction({
            castleId: c.castleId,
            spawn: 2,
            kill: 0,
            reason: "high_pressure_or_proxy_pressure_v24"
          });
          soldierDelegation.push(action);
          this.artery.soldierDelegations += 1;

          pulseNetIntents.push({
            kind: "soldier_route_v24",
            castleId: c.castleId,
            regionId,
            spawn: action.spawn,
            kill: action.kill,
            reason: action.reason,
            cycle: this.cycle,
            proxyMode,
            proxyPressure
          });

          const rdAction = new RouteDefenseAction({
            regionId,
            castleId: c.castleId,
            reason: "high_pressure_route_defense_v24",
            desiredDefenders: 2
          });
          routeDefenseActions.push(rdAction);
          this.artery.routeDefenses += 1;

          pulseNetIntents.push({
            kind: "route_defense_v24",
            regionId,
            castleId: c.castleId,
            desiredDefenders: rdAction.desiredDefenders,
            cycle: this.cycle,
            proxyMode,
            proxyPressure
          });

          const orbitAction = new NodeAdminOrbitAction({
            castleId: c.castleId,
            intervalHint: "frequent",
            pressureHint: "high"
          });
          nodeAdminOrbitActions.push(orbitAction);
          this.artery.nodeAdminOrbits += 1;

          pulseNetIntents.push({
            kind: "nodeadmin_orbit_v24",
            castleId: c.castleId,
            regionId,
            intervalHint: orbitAction.intervalHint,
            pressureHint: orbitAction.pressureHint,
            cycle: this.cycle,
            proxyMode,
            proxyPressure
          });
        } else if (lowPressure) {
          const orbitAction = new NodeAdminOrbitAction({
            castleId: c.castleId,
            intervalHint: "sparse",
            pressureHint: "low"
          });
          nodeAdminOrbitActions.push(orbitAction);
          this.artery.nodeAdminOrbits += 1;

          pulseNetIntents.push({
            kind: "nodeadmin_orbit_v24",
            castleId: c.castleId,
            regionId,
            intervalHint: orbitAction.intervalHint,
            pressureHint: orbitAction.pressureHint,
            cycle: this.cycle,
            proxyMode,
            proxyPressure
          });
        }
      }

      // ============================================================
      // MESH REBALANCE — v24 (symbolic)
// ============================================================
      const links = meshLinksByCastleId || {};
      for (const c of regionInfo.castles) {
        const castleLinks = links[c.castleId] || [];
        if (castleLinks.length === 0 && castleCount > 1) {
          const targetCastle = regionInfo.castles[0];
          if (targetCastle && targetCastle.castleId !== c.castleId) {
            const action = new MeshRebalanceAction({
              castleId: c.castleId,
              targetCastleId: targetCastle.castleId,
              action: "link"
            });
            rebalanceLinks.push(action);
            this.artery.rebalanceLinks += 1;

            pulseNetIntents.push({
              kind: "mesh_rebalance_v24",
              castleId: c.castleId,
              targetCastleId: targetCastle.castleId,
              regionId,
              cycle: this.cycle,
              proxyMode,
              proxyPressure
            });
          }
        }
      }
    }

    // ======================================================================
    // BINARY / WAVE / BAND SIGNATURE FIELDS — v24-Immortal++
    // ======================================================================
    const band = "binary";
    const binaryField = buildBinaryField(this.cycle, hb, aiHb, earnHb);
    const waveField = buildWaveField(this.cycle, band, hb, aiHb, earnHb);
    const bandSignature = buildBandSignature(band, hb, aiHb);

    const meta = {
      cycle: this.cycle,
      globalLoad,
      proxyMode,
      proxyPressure,
      proxyFallback,
      heartbeatTick: hb.tick ?? null,
      aiHeartbeatTick: aiHb.tick ?? null,
      earnHeartbeatTick: earnHb.tick ?? null,
      beaconPresenceField,
      beaconAdvantageField
    };

    let plan = new ExpansionPlan({
      expansions,
      contractions,
      rebalanceLinks,
      soldierDelegation,
      routeDefenseActions,
      nodeAdminOrbitActions,
      regionPresence,
      regionAdvantage,
      regionChunkPlan,
      bandSignature,
      binaryField,
      waveField,
      pulseNetIntents,
      meta
    });

    plan = this._evolveExpansionPlan(plan, {
      beaconPresenceField,
      beaconAdvantageField
    });

    return plan;
  }

  // ========================================================================
  // APPLY EXPANSION PLAN — v24-Immortal++
  // ========================================================================
  applyExpansionPlan(plan) {
    if (!plan) return { ok: false, reason: "no_plan" };

    const intents = Array.isArray(plan.pulseNetIntents)
      ? plan.pulseNetIntents
      : [];

    for (const intent of intents) {
      safePulseNetCall(this.pulseNetBridge, "sendIntent", {
        type: "PulseNetExpansionIntent",
        payload: {
          ...intent,
          cycle: this.cycle
        }
      });
    }

    return { ok: true, intentsCount: intents.length };
  }
}

export default PulseExpansion;
