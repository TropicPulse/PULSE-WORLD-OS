// ============================================================================
//  PULSE-WORLD-ROUTER v30 — IMMORTAL MESH-FIRST + HOST/SATELLITE FALLBACK
//  Routes: mesh • host-mesh • satellite-mesh • direct-fallback (cloud)
//  Symbolic-only, deterministic, organism-aware.
// ============================================================================
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝


import { PulseProofBridgeLogger as logger } from "../../PULSE-BAND/____BACKEND/PULSE-WORLD-BRIDGE.js";

import {
  PulseExpansionMeta,
  createPulseExpansion,
  getPulseExpansionContext
} from "../PULSE-EXPANSION/PULSE-EXPANSION-WORLD.js";

import { PulseCastleMeta, createPulseCastle } from "../PULSE-EXPANSION/PULSE-EXPANSION-CASTLE.js";
import { PulseServerMeta, createPulseServer } from "../PULSE-EXPANSION/PULSE-EXPANSION-SERVER.js";

// User lanes + world core
import {
  getPulseUserContext,
  createPulseWorldCore,
  pulseUser,
  PulseUserMeta
} from "../PULSE-EXPANSION/PULSE-EXPANSION-USER.js";

// Mesh (symbolic + binary) — v24 IMMORTAL ORGANISM
import createBinaryMesh, {
  BinaryMeshMeta
} from "../PULSE-MESH/PulseMeshBinary-v30.js";

import createPulseMesh, {
  PulseMeshMeta
} from "../PULSE-MESH/PulseMesh-v30.js";

// Beacon engine (optional, for presence / region signals)
import PulseBeaconEngine from "../PULSE-EXPANSION/PULSE-EXPANSION-BEACON-ENGINE.js";

// Beacon membrane (for meta only, if needed)
import PulseBeaconMesh, {
  PulseBeaconMeshMeta
} from "../PULSE-EXPANSION/PULSE-EXPANSION-BEACON-MESH.js";

// Touch / presence
import { getPulseTouchContext } from "../../PULSE-UNIVERSE/PULSE-WORLD-TOUCH.js";

// Runtime / scheduler / overmind
import { getPulseRuntimeContext } from "./PulseWorldRuntime-v20.js";
import { getPulseSchedulerContext } from "./PulseWorldScheduler-v20.js";
import { getPulseOvermindContext } from "./PULSE-WORLD-ALDWYN.js";

// (Optional) Earn / treasury integration hook (symbolic only)
import { getEarnContext } from "../PULSE-EARN/PulseEarn-v24.js";

// Proxy context (symbolic-only, IMMORTAL-safe)
import {
  getProxyContext,
  getProxyPressure,
  getProxyBoost,
  getProxyFallback,
  getProxyMode,
  getProxyLineage
} from "../PULSE-PROXY/PulseProxyContext-v20.js";

// ============================================================================
//  ROUTER META — v30 IMMORTAL MESH-FIRST
// ============================================================================
export const PulseRouterMeta = Object.freeze({
  version: "v30-IMMORTAL-MESH-ROUTER",
  band: "symbolic",
  organismRole: "router",
  meshFirst: true,
  satelliteFallback: true,
  hostMeshFallback: true,
  organId: "PULSE-WORLD-ROUTER"
});

// ============================================================================
//  A-B-A SURFACES — SYMBOLIC BAND SIGNATURES
// ============================================================================
function computeHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `h${h}`;
}

function buildBinaryField(cycle, proxyMeta) {
  const densityBase = 10 + cycle * 3;
  const proxyPressure = proxyMeta?.proxyPressure ?? 0;
  const density = densityBase + Math.round(proxyPressure * 4);
  const surface = density + 16;

  return {
    binaryPhenotypeSignature: computeHash(`ROUTER_BEXP30::${surface}::${proxyPressure}`),
    binarySurfaceSignature: computeHash(`ROUTER_BEXP30_SURF::${surface}`),
    binarySurface: { density, surface, patternLen: 30 },
    parity: surface % 2,
    shiftDepth: Math.floor(Math.log2(surface || 1))
  };
}

function buildWaveField(cycle, band, proxyMeta) {
  const baseAmp = band === "binary" ? 9 : 5;
  const proxyBoost = proxyMeta?.proxyBoost ?? 0;
  const amplitude = (cycle + 1) * baseAmp + Math.round(proxyBoost * 8);

  return {
    amplitude,
    wavelength: amplitude + 7,
    phase: amplitude % 48,
    band,
    mode: band === "binary" ? "compression-wave" : "symbolic-wave"
  };
}

function buildBandSignature(band, proxyMeta) {
  const mode = proxyMeta?.proxyMode || "normal";
  return computeHash(`ROUTER_EXP_BAND30::${band}::${mode}`);
}

// ============================================================================
//  ORGANISM CONTEXT (for meta + introspection)
// ============================================================================
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

const _worldCoreSingleton =
  (typeof createPulseWorldCore === "function"
    ? createPulseWorldCore({ serverMode: false })
    : null) || null;

function buildOrganismContext() {
  const expansionCtx = getPulseExpansionContext?.() || {};
  const touch = getPulseTouchContext?.() || {};
  const runtime = getPulseRuntimeContext?.() || {};
  const scheduler = getPulseSchedulerContext?.() || {};
  const overmind = getPulseOvermindContext?.() || {};
  const earn = getEarnContext?.() || {};
  const userCtx = getPulseUserContext?.() || {};
  const worldCore = _worldCoreSingleton || null;

  const proxyMeta = {
    proxy: getProxyContext?.() || null,
    proxyPressure: getProxyPressure?.() ?? 0,
    proxyBoost: getProxyBoost?.() ?? 0,
    proxyFallback: getProxyFallback?.() ?? false,
    proxyMode: getProxyMode?.() || "normal",
    proxyLineage: getProxyLineage?.() || null
  };

  return {
    expansion: {
      meta: PulseExpansionMeta,
      context: expansionCtx,
      core: _expansionSingleton
    },
    castle: {
      meta: PulseCastleMeta,
      core: _castleSingleton
    },
    server: {
      meta: PulseServerMeta,
      core: _serverSingleton
    },
    user: {
      meta: PulseUserMeta,
      instance: pulseUser || null,
      context: userCtx
    },
    worldCore,
    touch,
    runtime,
    scheduler,
    overmind,
    earn,
    meshMeta: PulseMeshMeta,
    binaryMeshMeta: BinaryMeshMeta,
    beaconMeshMeta: PulseBeaconMeshMeta,
    routerMeta: PulseRouterMeta,
    proxyMeta
  };
}

let _beaconEngineInstance = null;
function getLocalBeaconEngine() {
  if (_beaconEngineInstance) return _beaconEngineInstance;
  try {
    _beaconEngineInstance =
      typeof PulseBeaconEngine === "function"
        ? new PulseBeaconEngine()
        : PulseBeaconEngine;
  } catch {
    _beaconEngineInstance = null;
  }
  return _beaconEngineInstance;
}

// ============================================================================
// FACTORY: createPulseRouter — v30 Immortal Organism
// ============================================================================
export function createPulseRouter({
  routerID = null,
  regionID = null,
  trace = false,
  globalHints = null
} = {}) {
  const Identity = Object.freeze({
    routerID,
    regionID,
    createdBy: "PulseWorldCore",
    version: "v30-IMMORTAL-MESH-ROUTER"
  });

  function log(...args) {
    if (trace) console.log("[PulseRouter v30]", ...args);
  }

  log("PulseRouter v30 created:", { routerID, regionID });

  let cycle = 0;
  let lastBinaryField = null;
  let lastWaveField = null;
  let lastBandSignature = null;

  // Inputs
  let meshSnapshotSymbolic = null;
  let meshSnapshotBinary = null;
  let castleSnapshot = null;
  let expansionSnapshot = null;
  let beaconSnapshot = null;
  let userSnapshot = null;
  let worldCoreSnapshot = null;
  let brainSnapshot = null;

  function attachMeshSymbolic(snapshot) {
    meshSnapshotSymbolic = snapshot || null;
    return { ok: true };
  }

  function attachMeshBinary(snapshot) {
    meshSnapshotBinary = snapshot || null;
    return { ok: true };
  }

  function attachMesh(snapshot) {
    return attachMeshSymbolic(snapshot);
  }

  function attachCastle(snapshot) {
    castleSnapshot = snapshot || null;
    return { ok: true };
  }

  function attachExpansion(snapshot) {
    expansionSnapshot = snapshot || null;
    return { ok: true };
  }

  function attachBeacon(snapshot) {
    beaconSnapshot = snapshot || null;
    return { ok: true };
  }

  function attachUser(snapshot) {
    userSnapshot = snapshot || null;
    return { ok: true };
  }

  function attachWorldCore(snapshot) {
    worldCoreSnapshot = snapshot || null;
    return { ok: true };
  }

  function attachBrain(snapshot) {
    brainSnapshot = snapshot || null;
    return { ok: true };
  }

  // Global hints
  let lastGlobalHints = globalHints || null;

  function setGlobalHints(hints) {
    lastGlobalHints = hints || null;
    return { ok: true, hints: lastGlobalHints };
  }

  function getGlobalHints() {
    return lastGlobalHints;
  }

  function buildPresenceField() {
    const gh = lastGlobalHints || {};

    const meshPresence =
      meshSnapshotSymbolic?.presenceField?.meshPresence ||
      meshSnapshotSymbolic?.densityHealth?.A_metrics?.meshStrength ||
      meshSnapshotBinary?.presenceField?.meshPresence ||
      "unknown";

    const userPresence =
      userSnapshot?.presenceField?.userPresence ||
      userSnapshot?.presenceField?.devicePresence ||
      gh?.presenceContext?.devicePresence ||
      "unknown";

    const routerPresence =
      gh?.presenceContext?.routerPresence || "unknown";

    const regionPresence =
      beaconSnapshot?.presenceField?.regionPresence ||
      worldCoreSnapshot?.advantageContext?.presenceField?.presenceTier ||
      "unknown";

    return Object.freeze({
      bandPresence: gh?.presenceContext?.bandPresence || "unknown",
      routerPresence,
      devicePresence: userPresence,
      meshPresence,
      regionPresence
    });
  }

  function buildAdvantageField() {
    const gh = lastGlobalHints || {};

    const meshAdvantageScore =
      meshSnapshotSymbolic?.advantageField?.advantageScore ??
      meshSnapshotBinary?.advantageField?.advantageScore ??
      null;

    const meshAdvantageBand =
      meshSnapshotSymbolic?.advantageField?.advantageBand ??
      meshSnapshotBinary?.advantageField?.advantageBand ??
      "neutral";

    const userAdvantageScore =
      userSnapshot?.advantageField?.advantageScore ??
      worldCoreSnapshot?.advantageContext?.advantageField?.advantageScore ??
      null;

    const userAdvantageBand =
      userSnapshot?.advantageField?.advantageBand ??
      worldCoreSnapshot?.advantageContext?.advantageField?.advantageBand ??
      "neutral";

    return Object.freeze({
      advantageScore:
        gh?.advantageContext?.score ??
        userAdvantageScore ??
        meshAdvantageScore,

      advantageBand:
        gh?.advantageContext?.band ??
        userAdvantageBand ??
        meshAdvantageBand,

      fallbackBandLevel: gh?.fallbackBandLevel ?? null
    });
  }

  // Policy
  const Policy = {
    A_baseline: {
      preferLocalCastle: true,
      preferLocalMesh: true,
      fallbackToRemoteCloud: true,
      avoidLoops: true
    },
    B_adaptive: {
      pressureAware: true,
      latencyAware: true,
      costAware: true,
      routeAware: true,
      userAware: true,
      worldCoreAware: true,
      osBrainAware: true
    },
    A_limits: {
      maxHops: 8
    }
  };

  // Signals
  function getMeshSignals() {
    const dhSym = meshSnapshotSymbolic?.densityHealth?.A_metrics || {};
    const dhBin = meshSnapshotBinary?.densityHealth?.A_metrics || {};

    const presenceField =
      meshSnapshotSymbolic?.presenceField ||
      meshSnapshotBinary?.presenceField ||
      null;

    const advantageField =
      meshSnapshotSymbolic?.advantageField ||
      meshSnapshotBinary?.advantageField ||
      null;

    return {
      meshStrength:
        dhSym.meshStrength ||
        dhBin.meshStrength ||
        "unknown",

      meshPressureIndex:
        dhSym.meshPressureIndex ??
        dhBin.meshPressureIndex ??
        0,

      userCount:
        dhSym.userCount ??
        dhBin.userCount ??
        0,

      castleCount:
        dhSym.castleCount ??
        dhBin.castleCount ??
        0,

      presenceField,
      advantageField
    };
  }

  function getCastleSignals() {
    const state = castleSnapshot?.state || {};
    const loadLevel = state.loadLevel || "unknown";
    const presenceField = castleSnapshot?.presenceField || null;

    return {
      loadLevel,
      presenceField
    };
  }

  function getExpansionSignals() {
    const routeField = expansionSnapshot?.routeField || {
      weakSegments: [],
      prioritySegments: [],
      routeStable: true
    };

    return { routeField };
  }

  function getUserSignals() {
    const region =
      userSnapshot?.regionID ||
      worldCoreSnapshot?.identity?.regionID ||
      regionID ||
      null;

    const stressIndex =
      userSnapshot?.presenceField?.stressIndex ??
      worldCoreSnapshot?.advantageContext?.meshPressureIndex ??
      0;

    const fallbackBandLevel =
      lastGlobalHints?.fallbackBandLevel ??
      worldCoreSnapshot?.advantageContext?.fallbackBandLevel ??
      0;

    const osBrainStatus =
      worldCoreSnapshot?.primaryOSView?.osBrainStatus ??
      worldCoreSnapshot?.primaryOSView?.status ??
      "unknown";

    return {
      region,
      stressIndex,
      fallbackBandLevel,
      osBrainStatus
    };
  }

  // Decision engine
  function routeTo(target, routeMode, reason, context = {}) {
    return Object.freeze({
      target,          // executor key: "castle" | "mesh" | "cloud"
      routeMode,       // "mesh" | "host-mesh" | "satellite-mesh" | "direct-fallback"
      reason,
      hops: 1,
      safe: true,
      presenceField: context.presenceField || null,
      advantageField: context.advantageField || null,
      meshSignals: context.mesh || null,
      castleSignals: context.castle || null,
      userSignals: context.userSignals || null,
      routeField: context.routeField || null,
      proxyMeta: context.proxyMeta || null,
      bandSignature: lastBandSignature,
      binaryField: lastBinaryField,
      waveField: lastWaveField
    });
  }

  function decideRoute(request) {
    cycle += 1;

    const proxyMeta = {
      proxy: getProxyContext() || null,
      proxyPressure: getProxyPressure() ?? 0,
      proxyBoost: getProxyBoost() ?? 0,
      proxyFallback: getProxyFallback() ?? false,
      proxyMode: getProxyMode() || "normal",
      proxyLineage: getProxyLineage() || null
    };

    const band = "symbolic";

    lastBinaryField = buildBinaryField(cycle, proxyMeta);
    lastWaveField = buildWaveField(cycle, band, proxyMeta);
    lastBandSignature = buildBandSignature(band, proxyMeta);

    const mesh = getMeshSignals();
    const castle = getCastleSignals();
    const { routeField } = getExpansionSignals();
    const presenceField = buildPresenceField();
    const advantageField = buildAdvantageField();
    const userSignals = getUserSignals();

    const meshStrength = mesh.meshStrength;
    const meshPressure = mesh.meshPressureIndex;
    const castleLoad = castle.loadLevel;

    const userStress = userSignals.stressIndex;
    const fallbackBandLevel =
      advantageField.fallbackBandLevel ??
      userSignals.fallbackBandLevel ??
      0;

    const osBrainStatus = userSignals.osBrainStatus;
    const regionPresence = presenceField.regionPresence || "unknown";

    // Proxy-aware hard fallback → direct cloud
    if (proxyMeta.proxyFallback || proxyMeta.proxyMode === "fallback") {
      return routeTo(
        "cloud",
        "direct-fallback",
        "proxyFallbackActive",
        { mesh, castle, presenceField, advantageField, userSignals, routeField, proxyMeta }
      );
    }

    // Satellite-mesh bias: remote / weak region presence
    const regionLooksRemote =
      regionPresence === "remote" ||
      regionPresence === "edge" ||
      regionPresence === "unknown";

    if (
      regionLooksRemote &&
      Policy.A_baseline.fallbackToRemoteCloud &&
      meshStrength !== "weak"
    ) {
      // executor: cloud, but mode: satellite-mesh (cloud edge / satellite entry, then mesh)
      return routeTo(
        "cloud",
        "satellite-mesh",
        "regionRemotePreferSatelliteMesh",
        { mesh, castle, presenceField, advantageField, userSignals, routeField, proxyMeta }
      );
    }

    // OS brain / high fallback → direct-fallback cloud
    if (osBrainStatus !== "healthy" || fallbackBandLevel >= 3) {
      return routeTo(
        "cloud",
        "direct-fallback",
        "osBrainUnhealthyOrHighFallback",
        { mesh, castle, presenceField, advantageField, userSignals, routeField, proxyMeta }
      );
    }

    // Host-mesh: castle healthy, mesh available → host first, mesh as fabric
    const castleHealthy =
      castleLoad === "low" ||
      castleLoad === "normal" ||
      castleLoad === "medium";

    if (
      castleHealthy &&
      meshStrength !== "weak" &&
      userStress < 80 &&
      Policy.A_baseline.preferLocalCastle
    ) {
      return routeTo(
        "castle",
        "host-mesh",
        "nearestHealthyCastleMeshBackbone",
        { mesh, castle, presenceField, advantageField, userSignals, routeField, proxyMeta }
      );
    }

    // Mesh-first for castle relief
    if (
      (castleLoad === "high" || castleLoad === "critical") &&
      meshStrength !== "weak" &&
      Policy.A_baseline.preferLocalMesh
    ) {
      return routeTo(
        "mesh",
        "mesh",
        "castleReliefViaMesh",
        { mesh, castle, presenceField, advantageField, userSignals, routeField, proxyMeta }
      );
    }

    // Strong mesh → mesh-first
    if (
      meshStrength === "strong" &&
      meshPressure < 80 &&
      Policy.A_baseline.preferLocalMesh
    ) {
      return routeTo(
        "mesh",
        "mesh",
        "strongMeshPreferred",
        { mesh, castle, presenceField, advantageField, userSignals, routeField, proxyMeta }
      );
    }

    // User stress high → mesh-first
    if (
      userStress >= 80 &&
      meshStrength !== "weak" &&
      Policy.A_baseline.preferLocalMesh
    ) {
      return routeTo(
        "mesh",
        "mesh",
        "userStressHighPreferMesh",
        { mesh, castle, presenceField, advantageField, userSignals, routeField, proxyMeta }
      );
    }

    // Default: cloud with satellite-mesh flavor if mesh is usable, else direct-fallback
    if (meshStrength !== "weak") {
      return routeTo(
        "cloud",
        "satellite-mesh",
        "fallbackSatelliteMesh",
        { mesh, castle, presenceField, advantageField, userSignals, routeField, proxyMeta }
      );
    }

    return routeTo(
      "cloud",
      "direct-fallback",
      "fallback",
      { mesh, castle, presenceField, advantageField, userSignals, routeField, proxyMeta }
    );
  }

  // Suggestions
  function suggestBetterRoutes() {
    if (!meshSnapshotSymbolic && !meshSnapshotBinary) {
      return { ok: false, reason: "missing-mesh" };
    }
    if (!castleSnapshot || !expansionSnapshot) {
      return { ok: false, reason: "missing-inputs" };
    }

    const mesh = getMeshSignals();
    const castle = getCastleSignals();
    const { routeField } = getExpansionSignals();
    const userSignals = getUserSignals();

    const suggestions = [];

    if (
      Array.isArray(routeField.weakSegments) &&
      routeField.weakSegments.length > 0
    ) {
      suggestions.push({
        type: "reinforce-route-segment",
        segments: routeField.weakSegments,
        reason: "weakSegmentsDetected",
        meshPressureIndex: mesh.meshPressureIndex
      });
    }

    if (mesh.meshPressureIndex >= 75) {
      suggestions.push({
        type: "alternate-path",
        reason: "meshPressureCritical",
        idea: "reroute via mid-region or lower-pressure segments",
        meshPressureIndex: mesh.meshPressureIndex
      });
    }

    if (castle.loadLevel === "high" || castle.loadLevel === "critical") {
      suggestions.push({
        type: "castle-relief",
        reason: "castleLoadHigh",
        idea: "shift some traffic to mesh or neighboring castles",
        castleLoadLevel: castle.loadLevel
      });
    }

    if (userSignals.stressIndex >= 80) {
      suggestions.push({
        type: "user-stress-relief",
        reason: "userStressHigh",
        idea: "prefer distributed mesh routes and reduce local castle contention",
        userStressIndex: userSignals.stressIndex
      });
    }

    return Object.freeze({
      ok: true,
      suggestions: Object.freeze(suggestions)
    });
  }

  function suggestCorridorProtection() {
    if (!expansionSnapshot) return { ok: false, reason: "no-expansion" };

    const { routeField } = getExpansionSignals();
    const suggestions = [];

    if (!routeField.routeStable) {
      suggestions.push({
        type: "protect-corridor",
        reason: "routeUnstable",
        segments: routeField.prioritySegments || []
      });
    }

    return Object.freeze({
      ok: true,
      suggestions: Object.freeze(suggestions)
    });
  }

  function buildNodeAdminIntent() {
    const routeSuggestions = suggestBetterRoutes();
    const corridorSuggestions = suggestCorridorProtection();

    return Object.freeze({
      intent: "optimize-route",
      payload: Object.freeze({
        routeSuggestions: routeSuggestions.ok
          ? routeSuggestions.suggestions
          : [],
        corridorSuggestions: corridorSuggestions.ok
          ? corridorSuggestions.suggestions
          : []
      })
    });
  }

  // Telemetry
  const Telemetry = {
    metrics: {
      routedRequests: 0,
      localRouted: 0,
      meshRouted: 0,
      cloudRouted: 0,
      avgRouteLatencyMs: null
    }
  };

  function recordRoute(route, latencyMs = null) {
    Telemetry.metrics.routedRequests += 1;

    if (route.target === "castle") Telemetry.metrics.localRouted += 1;
    else if (route.target === "mesh") Telemetry.metrics.meshRouted += 1;
    else if (route.target === "cloud") Telemetry.metrics.cloudRouted += 1;

    if (latencyMs != null) {
      const prev = Telemetry.metrics.avgRouteLatencyMs;
      if (prev == null) {
        Telemetry.metrics.avgRouteLatencyMs = latencyMs;
      } else {
        Telemetry.metrics.avgRouteLatencyMs =
          Math.round((prev * 0.8 + latencyMs * 0.2) * 100) / 100;
      }
    }
  }

  function getSnapshot() {
    return Object.freeze({
      organId: PulseRouterMeta.organId,
      identity: Identity,
      policy: Policy,
      meshSnapshotSymbolic,
      meshSnapshotBinary,
      castleSnapshot,
      expansionSnapshot,
      beaconSnapshot: beaconSnapshot || getLocalBeaconEngine()?.getSnapshot?.() || null,
      userSnapshot,
      worldCoreSnapshot,
      brainSnapshot,
      presenceField: buildPresenceField(),
      advantageField: buildAdvantageField(),
      bandSignature: lastBandSignature,
      binaryField: lastBinaryField,
      waveField: lastWaveField,
      telemetry: Telemetry,
      suggestions: Object.freeze({
        betterRoutes: suggestBetterRoutes(),
        corridorProtection: suggestCorridorProtection()
      }),
      organismContext: buildOrganismContext()
    });
  }

  // ==========================================================================
  // v30 INTERNET ROUTING ORCHESTRATOR (mesh-first + host/satellite modes)
  // ==========================================================================
  /**
   * executors: {
   *   castle: async (request, routeDecision) => { ... },   // host-mesh
   *   mesh:   async (request, routeDecision) => { ... },   // mesh
   *   cloud:  async (request, routeDecision) => { ... }    // satellite-mesh / direct-fallback
   * }
   */
  async function routeInternet(request, executors = {}) {
    const start = Date.now();
    const decision = decideRoute(request);
    const primary = decision.target;

    const order = buildFallbackOrder(primary);
    log("routeInternet decision:", {
      primary,
      routeMode: decision.routeMode,
      order,
      reason: decision.reason
    });

    let lastError = null;

    for (const target of order) {
      const exec = executors[target];
      if (typeof exec !== "function") continue;

      try {
        const result = await exec(request, decision);
        if (result && result.ok) {
          recordRoute(decision, Date.now() - start);
          return {
            ok: true,
            target,
            decision,
            result
          };
        }
        lastError = result || { ok: false, reason: "unknown_failure" };
      } catch (err) {
        lastError = { ok: false, reason: "executor_error", error: String(err), target };
      }
    }

    recordRoute(decision, Date.now() - start);

    return {
      ok: false,
      target: null,
      decision,
      error: lastError || { ok: false, reason: "no_executor_succeeded" }
    };
  }

  function buildFallbackOrder(primary) {
    // Same executor keys, but now routeMode carries semantics.
    switch (primary) {
      case "castle":
        return ["castle", "mesh", "cloud"];
      case "mesh":
        return ["mesh", "castle", "cloud"];
      case "cloud":
        return ["cloud", "mesh", "castle"];
      default:
        return ["castle", "mesh", "cloud"];
    }
  }

  // ==========================================================================
  // PUBLIC API
  // ==========================================================================
  return Object.freeze({
    meta: PulseRouterMeta,
    identity: Identity,

    // attachments
    attachMesh,
    attachMeshSymbolic,
    attachMeshBinary,
    attachCastle,
    attachExpansion,
    attachBeacon,
    attachUser,
    attachWorldCore,
    attachBrain,

    // hints
    setGlobalHints,
    getGlobalHints,
    buildPresenceField,
    buildAdvantageField,

    // routing
    decideRoute,
    recordRoute,
    routeInternet,

    // suggestions
    suggestBetterRoutes,
    suggestCorridorProtection,
    buildNodeAdminIntent,

    // introspection
    getSnapshot
  });
}

export default createPulseRouter;
