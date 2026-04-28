// ============================================================================
// PULSE-WORLD : PulseUser-v12.3-PRESENCE-EVO+.js
// ORGAN TYPE: Local OS / Experience Orchestrator
// VERSION: v12.3-PRESENCE-EVO+ (Hybrid, Every-Advantage, Context-Aware)
// ============================================================================
//
// ROLE:
//   PulseWorldCore/PulseUser is the local OS layer that boots when a user taps the beacon.
//   It binds Beacon → Router → Castle → Mesh → Expansion into a coherent,
//   adaptive, local-first experience.
//
//   In v12.3 it becomes:
//     - presence-aware
//     - advantage-aware
//     - fallback-aware
//     - chunk/cache/prewarm-aware
//     - mesh-pressure-aware
//     - castle-load-aware
//     - expansion-route-aware
//     - router-suggestion-aware
//
//   It does NOT:
//     - spawn nodes
//     - route traffic directly
//     - override organ logic
//     - mutate infrastructure
//
//   It ONLY adapts the local OS experience.
//
// CONTRACT:
//   - Must only boot after explicit user opt-in.
//   - Must respect offline-first and local-first principles.
//   - Must route via PulseRouter, not directly to castles/mesh.
//   - Must expose clear, minimal, reversible controls.
//   - Must remain deterministic, synthetic, and drift-proof.
//
// ARCHITECTURE:
//   A = Baseline experience shell.
//   B = Adaptive behavior (presence-aware, density-aware, pressure-aware).
//   A = Return to deterministic UX contracts.
//
// DEPENDENCIES (SYMBOLIC):
//   - PulseBeaconEngine
//   - PulseRouter
//   - PulseExpansion
//   - PulseCastle
//   - PulseMesh
//   - SafetyFrame
// ============================================================================

export const PulseWorldCoreMeta = Object.freeze({
  organId: "PulseWorldCore-v12.3-PRESENCE-EVO+",
  role: "LOCAL_OS",
  version: "12.3-PRESENCE-EVO+",
  epoch: "v12.3-PRESENCE-EVO+",
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
    dualbandSafe: true
  })
});

// ============================================================================
// FACTORY: createPulseWorldCore — v12.3-PRESENCE-EVO+
// ============================================================================

export function createPulseWorldCore({
  regionID = null,
  trace = false
} = {}) {

  // --------------------------------------------------------------------------
  // 1. Identity & Scope (A)
  // --------------------------------------------------------------------------
  const Identity = Object.freeze({
    coreID: "PulseWorldCore",
    version: "v12.3-PRESENCE-EVO+",
    createdBy: "PulseOS",
    regionID
  });

  // --------------------------------------------------------------------------
  // 2. Attached Organ Snapshots (NEW)
// --------------------------------------------------------------------------
  let beaconSnapshot = null;
  let routerSnapshot = null;
  let castleSnapshot = null;
  let meshSnapshot = null;
  let expansionSnapshot = null;

  function attachBeacon(snapshot) { beaconSnapshot = snapshot; return { ok: true }; }
  function attachRouter(snapshot) { routerSnapshot = snapshot; return { ok: true }; }
  function attachCastle(snapshot) { castleSnapshot = snapshot; return { ok: true }; }
  function attachMesh(snapshot) { meshSnapshot = snapshot; return { ok: true }; }
  function attachExpansion(snapshot) { expansionSnapshot = snapshot; return { ok: true }; }

  // --------------------------------------------------------------------------
  // 3. Boot Sequence (Beacon Tap → Core)
// --------------------------------------------------------------------------
  const Boot = {
    A_triggers: {
      fromBeaconTap: true,
      fromLocalShortcut: true
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

  // --------------------------------------------------------------------------
  // 4. Experience Shell (Local Dashboard + Tools)
// --------------------------------------------------------------------------
  const Experience = {
    A_layout: {
      hasLocalDashboard: true,
      hasToolsTray: true,
      hasEvolutionPanel: true
    },
    B_adaptiveUI: {
      densityAwareUI: true,
      meshStrengthIndicators: true,
      castlePresenceIndicators: true,
      presenceFieldIndicators: true,
      advantageBandIndicators: true,
      fallbackBandIndicators: true,
      routeHealthIndicators: true
    },
    A_tools: {
      defaultTools: ["MyDay", "MyTools", "Evolution", "LocalPulse"],
      offlineFirst: true
    }
  };

  // --------------------------------------------------------------------------
  // 5. Routing Integration (Core ↔ PulseRouter)
// --------------------------------------------------------------------------
  function requestRoute(request) {
    if (!routerSnapshot) {
      return { ok: false, reason: "router-not-attached" };
    }
    return routerSnapshot.decideRoute(request);
  }

  // --------------------------------------------------------------------------
  // 6. Advantage Aggregation (NEW)
// --------------------------------------------------------------------------
  function buildAdvantageContext() {
    return Object.freeze({
      presenceField: beaconSnapshot?.presenceField || null,
      advantageField: beaconSnapshot?.advantageField || null,
      meshStrength: meshSnapshot?.densityHealth?.A_metrics?.meshStrength || "unknown",
      meshPressureIndex: meshSnapshot?.densityHealth?.A_metrics?.meshPressureIndex || 0,
      castleLoadLevel: castleSnapshot?.state?.loadLevel || "unknown",
      routeStable: expansionSnapshot?.routeField?.routeStable ?? null,
      fallbackBandLevel: beaconSnapshot?.globalHints?.fallbackBandLevel ?? 0
    });
  }

  // --------------------------------------------------------------------------
  // 7. Adaptive UI Logic (NEW)
// --------------------------------------------------------------------------
  function computeAdaptiveUI() {
    const ctx = buildAdvantageContext();

    return Object.freeze({
      showMeshWarning: ctx.meshPressureIndex >= 70,
      showCastleLoadWarning: ctx.castleLoadLevel === "high" || ctx.castleLoadLevel === "critical",
      showRouteUnstableWarning: ctx.routeStable === false,
      showFallbackMode: ctx.fallbackBandLevel >= 2,
      showAdvantageBoost: ctx.advantageField?.advantageBand === "high"
    });
  }

  // --------------------------------------------------------------------------
  // 8. Telemetry
  // --------------------------------------------------------------------------
  const Telemetry = {
    metrics: {
      sessionsStarted: 0,
      localSessions: 0,
      remoteSessions: 0
    }
  };

  // --------------------------------------------------------------------------
  // 9. Snapshot
  // --------------------------------------------------------------------------
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
        expansion: expansionSnapshot
      },
      advantageContext: buildAdvantageContext(),
      adaptiveUI: computeAdaptiveUI(),
      telemetry: Telemetry
    });
  }

  // --------------------------------------------------------------------------
  // 10. Public API
  // --------------------------------------------------------------------------
  return Object.freeze({
    meta: PulseWorldCoreMeta,
    identity: Identity,

    // attachments
    attachBeacon,
    attachRouter,
    attachCastle,
    attachMesh,
    attachExpansion,

    // routing
    requestRoute,

    // experience
    computeAdaptiveUI,
    buildAdvantageContext,

    // introspection
    getSnapshot
  });
}

export default createPulseWorldCore;
