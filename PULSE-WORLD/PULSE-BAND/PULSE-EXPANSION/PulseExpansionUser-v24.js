// ============================================================================
// PULSE-WORLD : PulseUser-v24-Immortal-ORGANISM-JuryReady.js
// ORGAN TYPE: Local OS / Experience Orchestrator / Citizen Witness
// VERSION: v24-Immortal-ORGANISM (Hybrid, Every-Advantage, Brain-Aware,
//          Server-Attachable, Jury-Ready, Bluetooth-Aware, Proxy-Aware)
// ============================================================================

// ============================================================================
// IMPORTS — OS / Mesh / Castle / Server / Router / Expansion / Band
// ============================================================================
import {
  OrganismIdentity,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PulseWorldOrganismMap-v24.js";
const Identity = OrganismIdentity(import.meta.url);

// 2 — EXPORT GENOME METADATA
export const PulseWorldCoreMeta = Identity.OrganMeta;
export const PulseUserMeta = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
// export const PULSE_EARN_IMMUNE_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;


// Primary OS / Binary OS (OSBrain + runtimes)
import * as PulseBinaryOS from "../PULSE-OS/PulseOSBinary-v24.js";

// Mesh + BeaconMesh meta
import { PulseMeshMeta, createPulseMesh } from "../PULSE-MESH/PulseMesh-v16.js";
import { PulseBeaconMeshMeta, PulseBeaconMesh } from "./PulseExpansionBeaconMesh-v20.js";

import { PulseCastleMeta, createPulseCastle } from "./PulseExpansionCastle-v24.js";
import { PulseServerMeta, createPulseServer } from "./PulseExpansionServer-v24.js";
import { PulseRouterMeta, createPulseRouter } from "./PulseExpansionRouter-v24.js";
import { PulseExpansionMeta, createPulseExpansion } from "./PulseExpansion-v24.js";
import { createDualBandOrganism as PulseBinaryOrganismBoot } from "../PULSE-AI/aiDualBand-v24.js";

// Earn / Band / BinarySend
import { getEarnContext, evolveEarn, createEarn } from "../PULSE-EARN/PulseEarn-v24.js";
import { createBinarySend as PulseSendBin } from "../PULSE-SEND/PulseBinarySend-v16.js";

// PROXY CONTEXT — v24 IMMORTAL ORGANISM
import {
  getProxyContext,
  getProxyPressure,
  getProxyBoost,
  getProxyFallback,
  getProxyMode,
  getProxyLineage
} from "../PULSE-PROXY/PulseProxyContext-v20.js";

// Runtime / scheduler / overmind
import { getPulseRuntimeContext } from "../PULSE-X/PulseWorldRuntime-v20.js";
import { getPulseSchedulerContext } from "../PULSE-X/PulseWorldScheduler-v20.js";
import { getPulseOvermindContext } from "../PULSE-X/PULSE-WORLD-ALDWYN.js";

// Evolution engine
import { createPulseNodeEvolutionV16 } from "../PULSE-TOOLS/PulseToolsNodeEvolution-v20.js";

// ============================================================================
// FACTORY: createPulseWorldCore — v24 IMMORTAL ORGANISM JURY-READY
// ============================================================================

export function createPulseWorldCore({
  regionID = null,
  trace = false,
  serverMode = false
} = {}) {
  const _userEvolution = createPulseNodeEvolutionV16({
    nodeType: "user",
    trace: false
  });

  // 1. Identity
  const Identity = Object.freeze({
    coreID: "PulseWorldCore",
    version: "v24-Immortal-ORGANISM-JuryReady",
    createdBy: "PulseOS",
    regionID,
    serverMode
  });

  // 2. Attached Organ Snapshots
  let beaconSnapshot = null;
  let routerSnapshot = null;
  let castleSnapshot = null;
  let meshSnapshot = null;
  let expansionSnapshot = null;

  let serverBridgeSnapshot = null;
  let serverExecSnapshot = null;

  let primaryOSSnapshot = null;
  let runtimeSnapshot = null;

  let dualBandOrganism = null;
  let binarySend = null;

  const userContext = Object.freeze({
    identity: Identity,
    regionID,
    serverMode,
    trace
  });

  // ---------------------------------------------------------------------------
  // JURY-READY INTERNAL STATE (DETERMINISTIC, IN-MEMORY ONLY)
  // ---------------------------------------------------------------------------

  const MAX_EVENTS = 256;
  const MAX_ANOMALIES = 128;
  const MAX_DECISIONS = 128;

  const interactionLog = [];
  const anomalyLog = [];
  const decisionTimeline = [];

  function pushBounded(list, item, max) {
    list.push(item);
    if (list.length > max) list.shift();
  }

  // ---------------------------------------------------------------------------
  // ATTACHMENTS
  // ---------------------------------------------------------------------------

  function attachBeacon(snapshot) {
    beaconSnapshot = snapshot;
    if (snapshot?.attachWorldCore) {
      snapshot.attachWorldCore({
        identity: Identity,
        getSnapshot,
        buildAdvantageContext
      });
    }
    return { ok: true };
  }

  function attachRouter(snapshot) {
    routerSnapshot = snapshot;
    if (snapshot?.attachWorldCore) {
      snapshot.attachWorldCore({
        identity: Identity,
        requestRoute,
        getSnapshot
      });
    }
    return { ok: true };
  }

  function attachCastle(snapshot) {
    castleSnapshot = snapshot;
    if (snapshot?.attachWorldCore) {
      snapshot.attachWorldCore({
        identity: Identity,
        buildAdvantageContext,
        getSnapshot,
        handleBrainNetworkIntent
      });
    }
    return { ok: true };
  }

  function attachMesh(snapshot) {
    meshSnapshot = snapshot;
    if (snapshot?.attachUser) snapshot.attachUser(userContext);
    if (snapshot?.attachWorldCore) {
      snapshot.attachWorldCore({
        identity: Identity,
        buildAdvantageContext,
        getSnapshot
      });
    }
    return { ok: true };
  }

  function attachExpansion(snapshot) {
    expansionSnapshot = snapshot;
    if (snapshot?.attachWorldCore) {
      snapshot.attachWorldCore({
        identity: Identity,
        buildAdvantageContext,
        getSnapshot,
        handleBrainNetworkIntent
      });
    }
    return { ok: true };
  }

  function attachServerBridge(snapshot) {
    serverBridgeSnapshot = snapshot;
    if (snapshot?.attachWorldCore) {
      snapshot.attachWorldCore({
        identity: Identity,
        userContext,
        getSnapshot
      });
    }
    return { ok: true };
  }

  function attachServerExec(snapshot) {
    serverExecSnapshot = snapshot;
    return { ok: true };
  }

  function attachPrimaryOS(snapshot) {
    primaryOSSnapshot = snapshot;
    if (snapshot?.attachWorldCore) {
      snapshot.attachWorldCore({
        identity: Identity,
        getSnapshot,
        buildAdvantageContext,
        computeAdaptiveUI,
        handleBrainNetworkIntent
      });
    }
    return { ok: true };
  }

  function attachRuntime(snapshot) {
    runtimeSnapshot = snapshot;
    if (snapshot?.attachUserContext) snapshot.attachUserContext(userContext);
    if (snapshot?.attachWorldCore) {
      snapshot.attachWorldCore({
        identity: Identity,
        getSnapshot,
        buildAdvantageContext,
        computeAdaptiveUI,
        handleBrainNetworkIntent
      });
    }
    return { ok: true };
  }

  function attachDualBand({ organism, send } = {}) {
    dualBandOrganism = organism || dualBandOrganism;
    binarySend = send || binarySend;
    return { ok: true };
  }

  // Auto-attach OS + dualband in server mode
  if (serverMode === true) {
    attachPrimaryOS(PulseBinaryOS);
    try { dualBandOrganism = PulseBinaryOrganismBoot?.({ trace: false }) || null; } catch {}
    try { binarySend = PulseSendBin?.({ trace: false }) || null; } catch {}
  }

  // ---------------------------------------------------------------------------
  // ROUTING
  // ---------------------------------------------------------------------------

  function requestRoute(request) {
    if (!routerSnapshot) return { ok: false, reason: "router-not-attached" };
    return routerSnapshot.decideRoute(request);
  }

  // ---------------------------------------------------------------------------
  // ADVANTAGE CONTEXT (FULLY UPGRADED + PROXY + BLUETOOTH HOOKS)
// ---------------------------------------------------------------------------

  function buildAdvantageContext() {
    const earn = getEarnContext?.() || {};

    // Simple symbolic bluetooth hook (no IO, caller can enrich)
    const bluetoothContext =
      beaconSnapshot?.bluetoothContext ||
      meshSnapshot?.bluetoothContext ||
      null;

    return Object.freeze({
      presenceField: beaconSnapshot?.presenceField || null,
      advantageField: beaconSnapshot?.advantageField || null,

      meshStrength: meshSnapshot?.densityHealth?.A_metrics?.meshStrength || "unknown",
      meshPressureIndex: meshSnapshot?.densityHealth?.A_metrics?.meshPressureIndex || 0,

      castleLoadLevel: castleSnapshot?.state?.loadLevel || "unknown",
      routeStable: expansionSnapshot?.routeField?.routeStable ?? null,
      fallbackBandLevel: beaconSnapshot?.globalHints?.fallbackBandLevel ?? 0,

      earnContext: earn || null,

      meshMeta: PulseMeshMeta || null,
      beaconMeshMeta: PulseBeaconMeshMeta || null,
      castleMeta: PulseCastleMeta || null,
      serverMeta: PulseServerMeta || null,
      routerMeta: PulseRouterMeta || null,
      expansionMeta: PulseExpansionMeta || null,

      bluetoothContext,

      proxy: getProxyContext(),
      proxyPressure: getProxyPressure(),
      proxyBoost: getProxyBoost(),
      proxyFallback: getProxyFallback(),
      proxyMode: getProxyMode(),
      proxyLineage: getProxyLineage()
    });
  }

  // ---------------------------------------------------------------------------
  // ADAPTIVE UI (FULLY UPGRADED + PROXY / ADVANTAGE / RUNTIME / SCHEDULER / OVERMIND AWARE)
  // ---------------------------------------------------------------------------

  function computeAdaptiveUI() {
    const ctx = buildAdvantageContext();
    const brain = getBrainView();
    const primaryOS = getPrimaryOSView();

    const runtimeCtx = getPulseRuntimeContext?.();
    const schedulerCtx = getPulseSchedulerContext?.();
    const overmindCtx = getPulseOvermindContext?.();

    const runtimeHealthy =
      brain && typeof brain.tick === "number" && brain.tick >= 0;

    const osBrainHealthy =
      primaryOS &&
      (primaryOS.status === "healthy" || primaryOS.osBrainStatus === "healthy");

    const ui = Object.freeze({
      // REGION / MESH / CASTLE / ROUTE
      showMeshWarning: ctx.meshPressureIndex >= 70,
      showCastleLoadWarning:
        ctx.castleLoadLevel === "high" || ctx.castleLoadLevel === "critical",
      showRouteUnstableWarning: ctx.routeStable === false,

      // ADVANTAGE / FALLBACK
      showFallbackMode: ctx.fallbackBandLevel >= 2,
      showAdvantageBoost: ctx.advantageField?.advantageBand === "high",

      // RUNTIME / OS BRAIN
      showRuntimePanel: !!brain,
      showRuntimeWarning: brain && !runtimeHealthy,

      showOSBrainPanel: !!primaryOS,
      showOSBrainWarning: primaryOS && !osBrainHealthy,

      // PROXY UI
      showProxyWarning: ctx.proxyPressure > 0.7,
      showProxyFallback: ctx.proxyFallback === true,
      showProxyBoost: ctx.proxyBoost > 0.5,

      // BLUETOOTH UI (symbolic)
      bluetoothConnected: !!ctx.bluetoothContext?.connected,
      bluetoothDeviceName: ctx.bluetoothContext?.deviceName || null,

      // NEW SUBIMPORT UI SIGNALS
      runtimeMode: runtimeCtx?.mode || null,
      runtimeLoad: runtimeCtx?.loadIndex ?? null,

      schedulerActive: schedulerCtx?.active ?? null,
      schedulerLoad: schedulerCtx?.loadIndex ?? null,

      overmindState: overmindCtx?.state || null,
      overmindBand: overmindCtx?.band || null,

      // EXTRA CONTEXT FOR EVOLUTION
      regionID,
      serverMode,
      proxyMode: ctx.proxyMode,
      proxyPressure: ctx.proxyPressure,
      proxyFallback: ctx.proxyFallback,
      proxyBoost: ctx.proxyBoost
    });

    return _evolveUserPacket(ui, { mode: "adaptive_ui" });
  }

  // ---------------------------------------------------------------------------
  // EVOLUTION WRAPPER — SHIFTER-FIRST + SECTIONAL FALLBACK + SUBIMPORT CONTEXT
  // ---------------------------------------------------------------------------

  function _evolveUserPacket(packet, extraCtx = {}) {
    if (!_userEvolution) return packet;

    const context = {
      regionID,
      serverMode,
      identity: Identity,

      // ATTACHED ORGANS
      beaconSnapshot,
      routerSnapshot,
      castleSnapshot,
      meshSnapshot,
      expansionSnapshot,
      primaryOSSnapshot,
      runtimeSnapshot,
      serverBridgeSnapshot,
      serverExecSnapshot,
      dualBandOrganism,
      binarySend,

      // PROXY CONTEXT
      proxyMode: getProxyMode?.(),
      proxyPressure: getProxyPressure?.(),
      proxyBoost: getProxyBoost?.(),
      proxyFallback: getProxyFallback?.(),
      proxyLineage: getProxyLineage?.(),
      proxyContext: getProxyContext?.(),

      // EARN CONTEXT
      earnContext: getEarnContext?.(),

      // NEW SUBIMPORT CONTEXT
      runtimeContext: getPulseRuntimeContext?.(),
      schedulerContext: getPulseSchedulerContext?.(),
      overmindContext: getPulseOvermindContext?.(),

      // METAS
      meshMeta: PulseMeshMeta,
      beaconMeshMeta: PulseBeaconMeshMeta,
      castleMeta: PulseCastleMeta,
      serverMeta: PulseServerMeta,
      routerMeta: PulseRouterMeta,
      expansionMeta: PulseExpansionMeta,
      userMeta: PulseUserMeta,
      worldCoreMeta: PulseWorldCoreMeta,

      // JURY CONTEXT
      interactionLog,
      anomalyLog,
      decisionTimeline,

      ...extraCtx
    };

    return _userEvolution.evolveNodePulse({
      nodeType: "user",
      pulse: packet,
      context
    });
  }

  // ---------------------------------------------------------------------------
  // BRAIN / RUNTIME VIEW
  // ---------------------------------------------------------------------------

  function getBrainView() {
    return runtimeSnapshot?.getRuntimeStateV2?.() || null;
  }

  function getPrimaryOSView() {
    return (
      primaryOSSnapshot?.getOSState?.() ||
      primaryOSSnapshot?.getOSBrainState?.() ||
      null
    );
  }

  function requestBrainInstance(spawnRequest = {}) {
    if (!primaryOSSnapshot?.spawnRuntimeInstance &&
        !primaryOSSnapshot?.spawnBrainInstance) {
      return { ok: false, reason: "primary-os-spawn-not-available" };
    }

    const enriched = {
      ...spawnRequest,
      userContext,
      worldCoreIdentity: Identity
    };

    if (primaryOSSnapshot.spawnRuntimeInstance) {
      return primaryOSSnapshot.spawnRuntimeInstance(enriched);
    }
    return primaryOSSnapshot.spawnBrainInstance(enriched);
  }

  // ---------------------------------------------------------------------------
  // BRAIN NETWORK INTENT
  // ---------------------------------------------------------------------------

  function handleBrainNetworkIntent(intent) {
    if (!intent || intent.intent !== "network-request") {
      return { ok: false, reason: "invalid-intent" };
    }

    if (expansionSnapshot?.handleBrainNetworkIntent) {
      return expansionSnapshot.handleBrainNetworkIntent({
        intent,
        userContext,
        worldCoreIdentity: Identity,
        serverBridge: serverBridgeSnapshot,
        serverExec: serverExecSnapshot,
        dualBandOrganism,
        binarySend
      });
    }

    if (castleSnapshot?.handleBrainNetworkIntent) {
      return castleSnapshot.handleBrainNetworkIntent({
        intent,
        userContext,
        worldCoreIdentity: Identity,
        serverBridge: serverBridgeSnapshot,
        serverExec: serverExecSnapshot,
        dualBandOrganism,
        binarySend
      });
    }

    if (serverBridgeSnapshot?.handleBrainNetworkIntent) {
      return serverBridgeSnapshot.handleBrainNetworkIntent({
        intent,
        userContext,
        worldCoreIdentity: Identity,
        serverExec: serverExecSnapshot,
        dualBandOrganism,
        binarySend
      });
    }

    return { ok: false, reason: "no-brain-network-handler" };
  }

  // ---------------------------------------------------------------------------
  // JURY-READY: CITIZEN WITNESS + PATTERN / FLOW / AI-ORIGIN DETECTION
  // ---------------------------------------------------------------------------

  function recordUserEvent(event) {
    if (!event || typeof event !== "object") {
      return { ok: false, reason: "invalid-event" };
    }

    const safeEvent = Object.freeze({
      type: event.type || "unknown",
      userId: event.userId || null,
      role: event.role || null,
      content: event.content ?? null,
      aiOrigin: event.aiOrigin === true,
      contextHash: event.contextHash || null,
      timestamp: event.timestamp ?? null,
      tag: event.tag || null
    });

    pushBounded(interactionLog, safeEvent, MAX_EVENTS);
    return { ok: true };
  }

  function recordDecision(decision) {
    if (!decision || typeof decision !== "object") {
      return { ok: false, reason: "invalid-decision" };
    }

    const safeDecision = Object.freeze({
      decisionId: decision.decisionId || null,
      stageIndex: typeof decision.stageIndex === "number" ? decision.stageIndex : null,
      userId: decision.userId || null,
      aiOrigin: decision.aiOrigin === true,
      contextHash: decision.contextHash || null,
      verdictSummary: decision.verdictSummary ?? null,
      timestamp: decision.timestamp ?? null
    });

    pushBounded(decisionTimeline, safeDecision, MAX_DECISIONS);
    return { ok: true };
  }

  function analyzeBehaviorPatterns() {
    const dominanceMap = Object.create(null);
    const identityLoopMap = Object.create(null);
    let aiEchoCount = 0;

    for (const d of decisionTimeline) {
      if (!d || !d.userId) continue;
      dominanceMap[d.userId] = (dominanceMap[d.userId] || 0) + 1;
    }

    for (const e of interactionLog) {
      if (!e) continue;
      if (e.aiOrigin === true) aiEchoCount++;
      if (e.type === "identity" && e.userId) {
        identityLoopMap[e.userId] = (identityLoopMap[e.userId] || 0) + 1;
      }
    }

    const dominantUser = Object.keys(dominanceMap).reduce(
      (best, userId) => {
        const count = dominanceMap[userId];
        if (!best || count > best.count) return { userId, count };
        return best;
      },
      null
    );

    return Object.freeze({
      dominantUser: dominantUser ? dominantUser.userId : null,
      dominantUserDecisionCount: dominantUser ? dominantUser.count : 0,
      aiEchoCount,
      identityLoops: Object.freeze(identityLoopMap)
    });
  }

  function detectContextDivergence({ proposalContextHash, aiOrigin }) {
    const last = interactionLog.length > 0 ? interactionLog[interactionLog.length - 1] : null;
    const lastHash = last?.contextHash || null;

    const mismatch =
      proposalContextHash &&
      lastHash &&
      proposalContextHash !== lastHash;

    const suspiciousAI =
      aiOrigin === true &&
      !proposalContextHash;

    const divergent = !!(mismatch || suspiciousAI);

    const proxyMode = getProxyMode?.();
    const proxyPressure = getProxyPressure?.();
    const proxyFallback = getProxyFallback?.();

    return Object.freeze({
      divergent,
      reason: divergent
        ? (mismatch ? "context-hash-mismatch" : "ai-origin-without-context")
        : null,
      lastContextHash: lastHash,
      proposalContextHash: proposalContextHash || null,
      lastEventType: last?.type || null,
      proxyMode: proxyMode || null,
      proxyPressure: typeof proxyPressure === "number" ? proxyPressure : null,
      proxyFallback: proxyFallback === true
    });
  }

  function recordAnomaly(anomaly) {
    if (!anomaly || typeof anomaly !== "object") {
      return { ok: false, reason: "invalid-anomaly" };
    }

    const proxyMode = getProxyMode?.();
    const proxyPressure = getProxyPressure?.();
    const proxyFallback = getProxyFallback?.();

    const safeAnomaly = Object.freeze({
      type: anomaly.type || "unknown",
      severity: anomaly.severity ?? 1,
      details: anomaly.details ?? null,
      timestamp: anomaly.timestamp ?? null,
      proxyMode: proxyMode || null,
      proxyPressure: typeof proxyPressure === "number" ? proxyPressure : null,
      proxyFallback: proxyFallback === true
    });

    pushBounded(anomalyLog, safeAnomaly, MAX_ANOMALIES);
    return { ok: true };
  }

  function buildCitizenWitnessReport() {
    const patterns = analyzeBehaviorPatterns();

    const decisionsSummary = decisionTimeline.map(d => ({
      decisionId: d.decisionId,
      stageIndex: d.stageIndex,
      userId: d.userId,
      aiOrigin: d.aiOrigin,
      timestamp: d.timestamp
    }));

    const interactionsSummary = interactionLog.map(e => ({
      type: e.type,
      userId: e.userId,
      role: e.role,
      aiOrigin: e.aiOrigin,
      tag: e.tag,
      timestamp: e.timestamp
    }));

    const report = Object.freeze({
      identity: Identity,
      regionID,
      serverMode,
      patterns,
      decisions: Object.freeze(decisionsSummary),
      interactions: Object.freeze(interactionsSummary),
      anomalies: Object.freeze(anomalyLog.slice())
    });

    return _evolveUserPacket(report, { mode: "citizen_witness" });
  }

  function buildJuryFeed() {
    const feed = Object.freeze({
      identity: Identity,
      advantageContext: buildAdvantageContext(),
      adaptiveUI: computeAdaptiveUI(),
      brainView: getBrainView(),
      primaryOSView: getPrimaryOSView(),
      citizenWitness: buildCitizenWitnessReport()
    });

    return _evolveUserPacket(feed, { mode: "jury_feed" });
  }

  function analyzeJuryFlow() {
    if (decisionTimeline.length === 0) {
      return Object.freeze({
        flowError: false,
        reason: null,
        rootDecisionId: null
      });
    }

    const first = decisionTimeline[0];
    const later = decisionTimeline.slice(1);

    const anyDependOnFirst =
      !!later.find(d => d.contextHash && first.contextHash && d.contextHash === first.contextHash);

    const flowError =
      first.aiOrigin === true && anyDependOnFirst;

    return Object.freeze({
      flowError,
      reason: flowError ? "ai-origin-root-decision-with-downstream-dependents" : null,
      rootDecisionId: first.decisionId || null
    });
  }

  function getJurySnapshot() {
    const snapshot = Object.freeze({
      identity: Identity,
      patterns: analyzeBehaviorPatterns(),
      flow: analyzeJuryFlow(),
      anomalies: anomalyLog.slice(),
      decisions: decisionTimeline.slice(),
      interactions: interactionLog.slice()
    });

    return _evolveUserPacket(snapshot, { mode: "jury_snapshot" });
  }

  // ---------------------------------------------------------------------------
  // SNAPSHOT
  // ---------------------------------------------------------------------------

  function getSnapshot() {
    return _evolveUserPacket(
      Object.freeze({
        organId: PulseWorldCoreMeta.organId,
        identity: Identity,
        attached: {
          beacon: beaconSnapshot,
          router: routerSnapshot,
          castle: castleSnapshot,
          mesh: meshSnapshot,
          expansion: expansionSnapshot,
          primaryOS: primaryOSSnapshot,
          runtime: runtimeSnapshot,
          serverBridge: serverBridgeSnapshot,
          serverExec: serverExecSnapshot,
          dualBandOrganism,
          binarySend
        },
        advantageContext: buildAdvantageContext(),
        adaptiveUI: computeAdaptiveUI(),
        brainView: getBrainView(),
        primaryOSView: getPrimaryOSView(),
        jurySnapshot: getJurySnapshot()
      }),
      { mode: "snapshot" }
    );
  }

  // ---------------------------------------------------------------------------
  // PUBLIC API
  // ---------------------------------------------------------------------------

  return Object.freeze({
    meta: PulseWorldCoreMeta,
    identity: Identity,

    attachBeacon,
    attachRouter,
    attachCastle,
    attachMesh,
    attachExpansion,
    attachPrimaryOS,
    attachRuntime,
    attachServerBridge,
    attachServerExec,
    attachDualBand,

    requestRoute,
    computeAdaptiveUI,
    buildAdvantageContext,

    getBrainView,
    getPrimaryOSView,
    requestBrainInstance,

    handleBrainNetworkIntent,

    // Jury-ready citizen witness + pattern / flow APIs
    recordUserEvent,
    recordDecision,
    recordAnomaly,
    analyzeBehaviorPatterns,
    detectContextDivergence,
    buildCitizenWitnessReport,
    buildJuryFeed,
    analyzeJuryFlow,
    getJurySnapshot,

    getSnapshot
  });
}

// ============================================================================
// USER CONTEXT HELPER + SINGLETON (for Router / Server / Mesh imports)
// ============================================================================

const _pulseUserSingleton = createPulseWorldCore({ serverMode: false });

export function getPulseUserContext() {
  return {
    identity: _pulseUserSingleton.identity,
    regionID: _pulseUserSingleton.identity.regionID,
    serverMode: _pulseUserSingleton.identity.serverMode
  };
}

export const pulseUser = _pulseUserSingleton;

export default createPulseWorldCore;
