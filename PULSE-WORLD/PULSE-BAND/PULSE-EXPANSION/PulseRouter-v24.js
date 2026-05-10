/**
 * ============================================================================
 *  PULSE OS v24‑IMMORTAL-ORGANISM — PULSE ROUTER (TRAFFIC BRAIN / ORGANISM-AWARE)
 *  PulseRouter-v24.js
 * ============================================================================
 *
 *  ROLE:
 *    - Traffic brain of a region.
 *    - Decides how to route user requests: castle / mesh / cloud.
 *    - Reads Castle, Mesh (symbolic + binary), Expansion, Beacon, User, WorldCore,
 *      Runtime, Scheduler, Overmind, Earn, Proxy.
 *    - Suggests better routes and corridor protection (never auto-applies).
 *    - Pure symbolic planner: no network, no filesystem, no AI execution.
 */
import {
  OrganismIdentity,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PulseWorldOrganismMap-v21.js";
const Identity = OrganismIdentity(import.meta.url);

export const PulseRouterMeta = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
// export const PULSE_EARN_IMMUNE_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;
// ============================================================================
//  IMPORTS (backend-safe, organism-aware)
// ============================================================================
import { PulseProofBridgeLogger as logger } from "../../PULSE-UI/_BACKEND/PULSE-WORLD-BRIDGE.js";

import {
  PulseExpansionMeta,
  createPulseExpansion,
  getPulseExpansionContext
} from "./PulseExpansion-v24.js";

import { PulseCastleMeta, createPulseCastle } from "./PulseCastle-v24.js";
import { PulseServerMeta, createPulseServer } from "./PulseServer-v24.js";

// User lanes + world core
import {
  getPulseUserContext,
  createPulseWorldCore,
  pulseUser,
  PulseUserMeta
} from "./PulseUser-v24.js";

// Mesh (symbolic + binary) — v24 IMMORTAL ORGANISM
import createBinaryMesh, {
  BinaryMeshMeta
} from "../PULSE-MESH/PulseBinaryMesh-v16.js";

import createPulseMesh, {
  PulseMeshMeta
} from "../PULSE-MESH/PulseMesh-v16.js";

// Beacon engine (optional, for presence / region signals)
import PulseBeaconEngine from "./PulseBeaconEngine-v20.js";

// Beacon membrane (for meta only, if needed)
import PulseBeaconMesh, {
  PulseBeaconMeshMeta
} from "./PulseBeaconMesh-v20.js";

// Touch / presence
import { getPulseTouchContext } from "../../PULSE-UI/PULSE-WORLD-TOUCH.js";

// Runtime / scheduler / overmind
import { getPulseRuntimeContext } from "../PULSE-X/PulseWorldRuntime-v20.js";
import { getPulseSchedulerContext } from "../PULSE-X/PulseWorldScheduler-v20.js";
import { getPulseOvermindContext } from "../PULSE-X/PULSE-WORLD-ALDWYN.js";

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
    binaryPhenotypeSignature: computeHash(`ROUTER_BEXP24::${surface}::${proxyPressure}`),
    binarySurfaceSignature: computeHash(`ROUTER_BEXP24_SURF::${surface}`),
    binarySurface: { density, surface, patternLen: 24 },
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
  return computeHash(`ROUTER_EXP_BAND24::${band}::${mode}`);
}

// ============================================================================
//  ORGANISM CONTEXT (for meta + introspection)
// ============================================================================

// Lightweight, synthetic singletons (no IO, no routing)
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

// Optional local beacon engine singleton (symbolic only)
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
// FACTORY: createPulseRouter — v24-Immortal-ORGANISM
// ============================================================================
export function createPulseRouter({
  routerID = null,
  regionID = null,
  trace = false,
  globalHints = null
} = {}) {
  // --------------------------------------------------------------------------
  // 1. Identity & Scope
  // --------------------------------------------------------------------------
  const Identity = Object.freeze({
    routerID,
    regionID,
    createdBy: "PulseWorldCore",
    version: "v24-Immortal-ORGANISM"
  });

  function log(...args) {
    if (trace) console.log("[PulseRouter v24]", ...args);
  }

  log("PulseRouter v24 created:", { routerID, regionID });

  // A-B-A cycle + last fields
  let cycle = 0;
  let lastBinaryField = null;
  let lastWaveField = null;
  let lastBandSignature = null;

  // --------------------------------------------------------------------------
  // 2. Inputs (What the Router Can See)
  // --------------------------------------------------------------------------
  // Dual mesh: symbolic + binary
  let meshSnapshotSymbolic = null; // from PulseMesh.getSnapshot()
  let meshSnapshotBinary = null;   // from PulseBinaryMesh.getSnapshot()

  // Castle / Expansion / Beacon
  let castleSnapshot = null;       // from PulseCastle presence + state
  let expansionSnapshot = null;    // from PulseExpansion.buildExpansionPlan() + routeField
  let beaconSnapshot = null;       // from PulseBeaconEngine (optional)

  // User / WorldCore / Brain
  let userSnapshot = null;         // from PulseUser / local user context
  let worldCoreSnapshot = null;    // from PulseWorldCore.getSnapshot()
  let brainSnapshot = null;        // from runtime.getRuntimeStateV2() or OS brain view

  // Attachments
  function attachMeshSymbolic(snapshot) {
    meshSnapshotSymbolic = snapshot || null;
    return { ok: true };
  }

  function attachMeshBinary(snapshot) {
    meshSnapshotBinary = snapshot || null;
    return { ok: true };
  }

  // Backward-compatible alias: attachMesh → symbolic mesh
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

  // --------------------------------------------------------------------------
  // 3. Global Hints (presence/advantage/fallback)
// --------------------------------------------------------------------------
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

  // --------------------------------------------------------------------------
  // 4. Routing Policy
  // --------------------------------------------------------------------------
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

  // --------------------------------------------------------------------------
  // 5. Helpers: Read Signals
  // --------------------------------------------------------------------------
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

  // --------------------------------------------------------------------------
  // 6. Decision Engine (Routing Decisions)
// --------------------------------------------------------------------------
  function routeTo(target, reason, context = {}) {
    return Object.freeze({
      target,
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

    // Proxy-aware bias: if proxy is in hard fallback, prefer cloud
    if (proxyMeta.proxyFallback || proxyMeta.proxyMode === "fallback") {
      return routeTo("cloud", "proxyFallbackActive", {
        mesh,
        castle,
        presenceField,
        advantageField,
        userSignals,
        routeField,
        proxyMeta
      });
    }

    // Proxy pressure: if high, prefer mesh (distributed) over castle
    if (proxyMeta.proxyPressure > 0.8 && meshStrength !== "weak") {
      return routeTo("mesh", "proxyPressureHighPreferMesh", {
        mesh,
        castle,
        presenceField,
        advantageField,
        userSignals,
        routeField,
        proxyMeta
      });
    }

    // Proxy boost: if boost and castle not critical, bias to castle
    if (proxyMeta.proxyBoost > 0.5 && castleLoad !== "critical") {
      return routeTo("castle", "proxyBoostPreferCastle", {
        mesh,
        castle,
        presenceField,
        advantageField,
        userSignals,
        routeField,
        proxyMeta
      });
    }

    // 0. If OS brain is unhealthy or fallback band is high, bias toward cloud
    if (osBrainStatus !== "healthy" || fallbackBandLevel >= 3) {
      return routeTo("cloud", "osBrainUnhealthyOrHighFallback", {
        mesh,
        castle,
        presenceField,
        advantageField,
        userSignals,
        routeField,
        proxyMeta
      });
    }

    // 1. Prefer Castle if healthy and not overloaded, and user stress not critical
    const castleHealthy =
      castleLoad === "low" ||
      castleLoad === "normal" ||
      castleLoad === "medium";

    if (
      castleHealthy &&
      userStress < 80 &&
      Policy.A_baseline.preferLocalCastle
    ) {
      return routeTo("castle", "nearestHealthyCastle", {
        mesh,
        castle,
        presenceField,
        advantageField,
        userSignals,
        routeField,
        proxyMeta
      });
    }

    // 2. Prefer Mesh if castle is high/critical but mesh is not weak
    if (
      (castleLoad === "high" || castleLoad === "critical") &&
      meshStrength !== "weak" &&
      Policy.A_baseline.preferLocalMesh
    ) {
      return routeTo("mesh", "castleReliefViaMesh", {
        mesh,
        castle,
        presenceField,
        advantageField,
        userSignals,
        routeField,
        proxyMeta
      });
    }

    // 3. If mesh is strong and pressure is moderate, use mesh
    if (
      meshStrength === "strong" &&
      meshPressure < 80 &&
      Policy.A_baseline.preferLocalMesh
    ) {
      return routeTo("mesh", "strongMeshPreferred", {
        mesh,
        castle,
        presenceField,
        advantageField,
        userSignals,
        routeField,
        proxyMeta
      });
    }

    // 4. If user stress is very high, prefer mesh (distributed) over castle
    if (
      userStress >= 80 &&
      meshStrength !== "weak" &&
      Policy.A_baseline.preferLocalMesh
    ) {
      return routeTo("mesh", "userStressHighPreferMesh", {
        mesh,
        castle,
        presenceField,
        advantageField,
        userSignals,
        routeField,
        proxyMeta
      });
    }

    // 5. Cloud fallback when both castle + mesh are weak/overloaded
    return routeTo("cloud", "fallback", {
      mesh,
      castle,
      presenceField,
      advantageField,
      userSignals,
      routeField,
      proxyMeta
    });
  }

  // --------------------------------------------------------------------------
  // 7. Route Suggestion Engine (Every-Advantage)
// --------------------------------------------------------------------------
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

    // Reinforce weak segments
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

    // Alternate paths on high mesh pressure
    if (mesh.meshPressureIndex >= 75) {
      suggestions.push({
        type: "alternate-path",
        reason: "meshPressureCritical",
        idea: "reroute via mid-region or lower-pressure segments",
        meshPressureIndex: mesh.meshPressureIndex
      });
    }

    // Castle relief when load is high
    if (castle.loadLevel === "high" || castle.loadLevel === "critical") {
      suggestions.push({
        type: "castle-relief",
        reason: "castleLoadHigh",
        idea: "shift some traffic to mesh or neighboring castles",
        castleLoadLevel: castle.loadLevel
      });
    }

    // User stress-based suggestions
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

  // --------------------------------------------------------------------------
  // 8. Corridor Protection Engine
  // --------------------------------------------------------------------------
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

  // --------------------------------------------------------------------------
  // 9. NodeAdmin Suggestion Surface
  // --------------------------------------------------------------------------
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

  // --------------------------------------------------------------------------
  // 10. Telemetry
  // --------------------------------------------------------------------------
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

  // --------------------------------------------------------------------------
  // 11. Snapshot
  // --------------------------------------------------------------------------
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

  // --------------------------------------------------------------------------
  // 12. Public API
  // --------------------------------------------------------------------------
  return Object.freeze({
    meta: PulseRouterMeta,
    identity: Identity,

    // attachments
    attachMesh,            // symbolic (back-compat)
    attachMeshSymbolic,    // explicit symbolic
    attachMeshBinary,      // explicit binary
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

    // suggestions
    suggestBetterRoutes,
    suggestCorridorProtection,
    buildNodeAdminIntent,

    // introspection
    getSnapshot
  });
}

export default createPulseRouter;
