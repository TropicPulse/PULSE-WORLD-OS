// ============================================================================
// PULSE-WORLD : PulseUser-v16-IMMORTAL-ORGANISM.js
// ORGAN TYPE: Local OS / Experience Orchestrator
// VERSION: v16-IMMORTAL-ORGANISM (Hybrid, Every-Advantage, Brain-Aware, Server-Attachable)
// ============================================================================

/*
AI_EXPERIENCE_META = {
  identity: "PulseUser",
  version: "v16-IMMORTAL-ORGANISM",
  layer: "presence_user",
  role: "presence_user_core",
  lineage: "PulseUser-v9 → v12.3-PRESENCE-EVO+ → v15-IMMORTAL → v16-IMMORTAL-ORGANISM",

  evo: {
    userCore: true,
    presenceAware: true,
    bluetoothAware: true,
    meshAware: true,
    regionAware: true,
    advantageBand: true,
    fallbackBand: true,

    symbolicPrimary: true,
    binaryAware: true,
    dualBand: true,

    deterministic: true,
    driftProof: true,
    zeroMutationOfInput: true,
    zeroNetwork: true,
    zeroFilesystem: true
  },

  contract: {
    always: [
      "PulseBeaconEngine",
      "PulseBeaconMesh",
      "PulseExpansion",
      "PulseCastle",
      "PulseMesh",
      "PulseServer",
      "PulseRouter"
    ],
    never: [
      "safeRoute",
      "fetchViaCNS"
    ]
  }
}
*/

// ============================================================================
// IMPORTS — OS / Mesh / Castle / Server / Router / Expansion / Band
// ============================================================================

// Primary OS / Binary OS (OSBrain + runtimes)
import * as PulseBinaryOS from "../PULSE-OS/PulseBinaryOS-v11-Evo-Max.js";

// Mesh + BeaconMesh meta (for advantage context + snapshot meta)
import { PulseMeshMeta } from "../PULSE-MESH/PulseMesh-v11-Evo.js";
import { PulseBeaconMeshMeta } from "../PULSE-EXPANSION/PulseBeaconMesh-v12.3-Presence.js";

// Castle / Server / Router / Expansion meta (symbolic only)
import { PulseCastleMeta } from "../PULSE-EXPANSION/PulseCastle-v12.3-Presence.js";
import { PulseServerMeta } from "../PULSE-EXPANSION/PulseServer-v12.3-Presence.js";
import { PulseRouterMeta } from "../PULSE-EXPANSION/PulseRouter-v12.3-Presence.js";
import { PulseExpansionMeta } from "../PULSE-EXPANSION/PulseExpansion-v12.3-Presence.js";

// Optional Earn / Treasury / Band (symbolic hooks)
import { getEarnContext } from "../PULSE-EARN/PulseEarn-v12.3-Presence.js";
import { createDualBandOrganism as PulseBinaryOrganismBoot } from "../PULSE-AI/aiDualBand-v11-Evo.js";
import { createBinarySend as PulseSendBin } from "../PULSE-SEND/PulseBinarySend-v11-EVO.js";

// ============================================================================

export const PulseWorldCoreMeta = Object.freeze({
  organId: "PulseWorldCore-v16-IMMORTAL-ORGANISM",
  role: "LOCAL_OS",
  version: "v16-IMMORTAL-ORGANISM",
  epoch: "v16-IMMORTAL-ORGANISM",
  layer: "Experience",
  safety: Object.freeze({
    deterministic: true,
    noRandomness: true,
    noAsyncDrift: true,
    syntheticOnly: true
  }),
  evo: Object.freeze({
    presenceAware: true,
    advantageAware: true,
    fallbackBandAware: true,
    chunkAware: true,
    cacheAware: true,
    prewarmAware: true,
    meshPressureAware: true,
    routeAware: true,
    castleAware: true,
    expansionAware: true,
    dualbandSafe: true,
    runtimeAware: true,
    osBrainAware: true,      // we see brain via primary OS / binary OS puller
    userAttachedToBrain: true,
    serverAttachedToUser: true, // explicit: server attaches above user
    meshOrganismAware: true,
    beaconMeshAware: true,
    serverExecAware: true,
    routerAware: true,
    earnAware: true,
    bandAware: true,
    binarySendAware: true
  })
});

// ============================================================================
// FACTORY: createPulseWorldCore — v16-IMMORTAL-ORGANISM
// ============================================================================

export function createPulseWorldCore({
  regionID = null,
  trace = false,
  serverMode = false
} = {}) {

  // 1. Identity
  const Identity = Object.freeze({
    coreID: "PulseWorldCore",
    version: "v16-IMMORTAL-ORGANISM",
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

  // Optional: explicit server bridge snapshot (PulseNetServerBridge / similar)
  let serverBridgeSnapshot = null;

  // Optional: attached server exec snapshot (PulseServer)
  let serverExecSnapshot = null;

  // This is the "primary OS / binary OS puller" attachment.
  // It may internally own OSBrain + runtimes.
  let primaryOSSnapshot = null; // PulseBinaryOS / PulseOS
  let runtimeSnapshot = null;   // Runtime / Brainstem (if you still attach it separately)

  // Optional: dualband organism + binary send (symbolic only)
  let dualBandOrganism = null;
  let binarySend = null;

  // Core user/world context we pass into brain / mesh / others
  const userContext = Object.freeze({
    identity: Identity,
    regionID,
    serverMode,
    trace
  });

  // ---------------------------------------------------------------------------
  // Attachments
  // ---------------------------------------------------------------------------
  function attachBeacon(snapshot) {
    beaconSnapshot = snapshot;

    if (snapshot && typeof snapshot.attachWorldCore === "function") {
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

    if (snapshot && typeof snapshot.attachWorldCore === "function") {
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

    if (snapshot && typeof snapshot.attachWorldCore === "function") {
      snapshot.attachWorldCore({
        identity: Identity,
        buildAdvantageContext,
        getSnapshot,
        handleBrainNetworkIntent // allow castle to see brain intent path if needed
      });
    }

    return { ok: true };
  }

  function attachMesh(snapshot) {
    meshSnapshot = snapshot;

    if (snapshot && typeof snapshot.attachUser === "function") {
      snapshot.attachUser(userContext);
    }
    if (snapshot && typeof snapshot.attachWorldCore === "function") {
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

    if (snapshot && typeof snapshot.attachWorldCore === "function") {
      snapshot.attachWorldCore({
        identity: Identity,
        buildAdvantageContext,
        getSnapshot,
        handleBrainNetworkIntent // expansion is primary handler for brain network intent
      });
    }

    return { ok: true };
  }

  function attachServerBridge(snapshot) {
    serverBridgeSnapshot = snapshot;

    if (snapshot && typeof snapshot.attachWorldCore === "function") {
      snapshot.attachWorldCore({
        identity: Identity,
        userContext,
        getSnapshot
      });
    }

    return { ok: true };
  }

  function attachServerExec(snapshot) {
    // snapshot is expected to be a PulseServer facade (createPulseServer result)
    serverExecSnapshot = snapshot;
    return { ok: true };
  }

  // Attach primary OS (PulseBinaryOS / PulseOS)
  function attachPrimaryOS(snapshot) {
    primaryOSSnapshot = snapshot;

    if (snapshot && typeof snapshot.attachWorldCore === "function") {
      snapshot.attachWorldCore({
        identity: Identity,
        getSnapshot,
        buildAdvantageContext,
        computeAdaptiveUI,
        handleBrainNetworkIntent // primary OS can forward BrainIntent up through user
      });
    }

    return { ok: true };
  }

  // Keep runtime attachment if you still want direct runtime view
  function attachRuntime(snapshot) {
    runtimeSnapshot = snapshot;

    if (snapshot && typeof snapshot.attachUserContext === "function") {
      snapshot.attachUserContext(userContext);
    }
    if (snapshot && typeof snapshot.attachWorldCore === "function") {
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

  // Attach dualband organism + binary send (symbolic only)
  function attachDualBand({ organism, send } = {}) {
    dualBandOrganism = organism || dualBandOrganism;
    binarySend = send || binarySend;
    return { ok: true };
  }

  // If running under server, auto‑attach the primary OS module we imported.
  if (serverMode === true) {
    attachPrimaryOS(PulseBinaryOS);

    // Optionally boot a default dualband organism + binary send in server mode
    try {
      dualBandOrganism = PulseBinaryOrganismBoot?.({ trace: false }) || null;
    } catch {
      dualBandOrganism = null;
    }
    try {
      binarySend = PulseSendBin?.({ trace: false }) || null;
    } catch {
      binarySend = null;
    }
  }

  // 3. Boot Sequence
  const Boot = {
    A_triggers: {
      fromBeaconTap: true,
      fromLocalShortcut: true,
      fromServerSession: serverMode === true
    },
    B_contextAwareness: {
      readRegionFromBeacon: true,
      readCastlePresenceFromExpansion: true,
      readMeshStrengthFromMesh: true,
      readPresenceFieldFromBeacon: true,
      readAdvantageFieldFromBeacon: true
    },
    A_contracts: {
      mustRequireUserOptIn: true,
      mustRespectSafetyFrame: true
    }
  };

  // 4. Experience Shell
  const Experience = {
    A_layout: {
      hasLocalDashboard: true,
      hasToolsTray: true,
      hasEvolutionPanel: true,
      hasBrainPanel: true
    },
    B_adaptiveUI: {
      densityAwareUI: true,
      meshStrengthIndicators: true,
      castlePresenceIndicators: true,
      presenceFieldIndicators: true,
      advantageBandIndicators: true,
      fallbackBandIndicators: true,
      routeHealthIndicators: true,
      runtimeHealthIndicators: true,
      osBrainHealthIndicators: true
    },
    A_tools: {
      defaultTools: ["MyDay", "MyTools", "Evolution", "LocalPulse"],
      offlineFirst: true
    }
  };

  // 5. Routing Integration
  function requestRoute(request) {
    if (!routerSnapshot) {
      return { ok: false, reason: "router-not-attached" };
    }
    return routerSnapshot.decideRoute(request);
  }

  // 6. Advantage Aggregation
  function buildAdvantageContext() {
    const earn = getEarnContext?.() || {};

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
      expansionMeta: PulseExpansionMeta || null
    });
  }

  // 7. Brain / Runtime View (direct runtime, if attached)
  function getBrainView() {
    if (runtimeSnapshot?.getRuntimeStateV2) {
      return runtimeSnapshot.getRuntimeStateV2();
    }
    return null;
  }

  // 8. Primary OS / OSBrain View (read-only, via primary OS)
  function getPrimaryOSView() {
    if (primaryOSSnapshot?.getOSState) {
      return primaryOSSnapshot.getOSState();
    }
    if (primaryOSSnapshot?.getOSBrainState) {
      return primaryOSSnapshot.getOSBrainState();
    }
    return null;
  }

  // 9. Ask primary OS to spin a brain/runtime (delegated)
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

  // 10. Brain Network Intent Handling (Brain → User → Castle/Expansion/Server)
  function handleBrainNetworkIntent(intent) {
    // intent is what BrainIntent.emitNetworkIntent(...) produced
    if (!intent || intent.intent !== "network-request") {
      return { ok: false, reason: "invalid-intent" };
    }

    // Prefer Expansion as the main bridge to server / Pulse-Net
    if (expansionSnapshot?.handleBrainNetworkIntent) {
      return expansionSnapshot.handleBrainNetworkIntent({
        intent,
        userContext,
        worldCoreIdentity: Identity,
        serverBridge: serverBridgeSnapshot || null,
        serverExec: serverExecSnapshot || null,
        dualBandOrganism,
        binarySend
      });
    }

    // Fallback: Castle can also handle / forward
    if (castleSnapshot?.handleBrainNetworkIntent) {
      return castleSnapshot.handleBrainNetworkIntent({
        intent,
        userContext,
        worldCoreIdentity: Identity,
        serverBridge: serverBridgeSnapshot || null,
        serverExec: serverExecSnapshot || null,
        dualBandOrganism,
        binarySend
      });
    }

    // Last resort: direct server bridge, if attached
    if (serverBridgeSnapshot?.handleBrainNetworkIntent) {
      return serverBridgeSnapshot.handleBrainNetworkIntent({
        intent,
        userContext,
        worldCoreIdentity: Identity,
        serverExec: serverExecSnapshot || null,
        dualBandOrganism,
        binarySend
      });
    }

    return { ok: false, reason: "no-brain-network-handler" };
  }

  // 11. Adaptive UI Logic
  function computeAdaptiveUI() {
    const ctx = buildAdvantageContext();
    const brain = getBrainView();
    const primaryOS = getPrimaryOSView();

    const runtimeHealthy =
      brain &&
      typeof brain.tick === "number" &&
      brain.tick >= 0;

    const osBrainHealthy =
      primaryOS &&
      (primaryOS.status === "healthy" || primaryOS.osBrainStatus === "healthy");

    return Object.freeze({
      showMeshWarning: ctx.meshPressureIndex >= 70,
      showCastleLoadWarning: ctx.castleLoadLevel === "high" || ctx.castleLoadLevel === "critical",
      showRouteUnstableWarning: ctx.routeStable === false,
      showFallbackMode: ctx.fallbackBandLevel >= 2,
      showAdvantageBoost: ctx.advantageField?.advantageBand === "high",
      showRuntimePanel: !!brain,
      showRuntimeWarning: brain && !runtimeHealthy,
      showOSBrainPanel: !!primaryOS,
      showOSBrainWarning: primaryOS && !osBrainHealthy
    });
  }

  // 12. Telemetry
  const Telemetry = {
    metrics: {
      sessionsStarted: 0,
      localSessions: 0,
      remoteSessions: 0
    }
  };

  // 13. Snapshot
  function getSnapshot() {
    return Object.freeze({
      organId: PulseWorldCoreMeta.organId,
      identity: Identity,
      boot: Boot,
      experience: Experience,
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
      brainView: getBrainView(),
      primaryOSView: getPrimaryOSView(),
      adaptiveUI: computeAdaptiveUI(),
      telemetry: Telemetry
    });
  }

  // 14. Public API
  return Object.freeze({
    meta: PulseWorldCoreMeta,
    identity: Identity,

    // attachments
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

    // routing
    requestRoute,

    // experience
    computeAdaptiveUI,
    buildAdvantageContext,

    // brain/runtime
    getBrainView,
    getPrimaryOSView,
    requestBrainInstance,

    // brain network intent
    handleBrainNetworkIntent,

    // introspection
    getSnapshot
  });
}

export default createPulseWorldCore;
