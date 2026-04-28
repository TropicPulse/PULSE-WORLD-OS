// ============================================================================
// PULSE-WORLD : PulseMesh-v12.3-PRESENCE-EVO+.js
// ORGAN TYPE: Connectivity / Mesh Organism
// VERSION: v12.3-PRESENCE-EVO+ (Hybrid, Every-Advantage, Pressure-Aware)
// ============================================================================
//
// ROLE:
//   PulseMesh is the connective tissue of PulseWorld.
//   It links users, castles, and regions into a coherent local-first network.
//   It prefers local paths, bridges between castles when needed, and reports
//   density + health + pressure back to PulseExpansion and PulseCastle.
//
// CONTRACT:
//   - Prefer local routes over remote whenever possible.
//   - Must cooperate with PulseExpansion + PulseCastle.
//   - Must not fragment the network or create loops.
//   - Must respect SafetyFrame and cost constraints.
//   - Must expose clear density + health + pressure signals.
//   - Must remain deterministic, synthetic, and drift-proof.
//
// ARCHITECTURE:
//   A = Baseline mesh structure (nodes, links, regions).
//   B = Adaptive behavior (density-aware, cost-aware, bridge-aware,
//       pressure-aware, multi-instance-aware).
//   A = Return to deterministic contracts and limits.
//
// DEPENDENCIES (SYMBOLIC):
//   - PulseExpansion
//   - PulseCastle
//   - SafetyFrame
//   - PulseBeaconEngine (for presence + mesh status)
// ============================================================================

export const PulseMeshMeta = Object.freeze({
  organId: "PulseMesh-v12.3-PRESENCE-EVO+",
  role: "CONNECTIVE_TISSUE",
  version: "12.3-PRESENCE-EVO+",
  epoch: "v12.3-PRESENCE-EVO+",
  layer: "Connectivity",
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
    meshPressureAware: true,
    densityAware: true,
    costAware: true,
    bridgeAware: true,
    multiInstanceAware: true,
    expansionAware: true,
    dualbandSafe: true
  })
});

// ============================================================================
// FACTORY: createPulseMesh — v12.3-PRESENCE-EVO+
// ============================================================================

export function createPulseMesh({
  meshID = null,
  regionID = null,
  trace = false,
  globalHints = null   // presenceContext, advantageContext, fallbackBandLevel, etc.
} = {}) {

  // --------------------------------------------------------------------------
  // 1. Identity & Scope (A)
  // --------------------------------------------------------------------------
  const Identity = Object.freeze({
    meshID,
    regionID,
    createdBy: "PulseExpansion",
    version: "v12.3-PRESENCE-EVO+"
  });

  // --------------------------------------------------------------------------
  // 2. Topology (A → B → A)
  // --------------------------------------------------------------------------
  const Topology = {
    A_nodes: {
      userNodes: [],      // user device IDs
      castleNodes: [],    // castle IDs
      bridgeNodes: []     // special nodes bridging regions
    },
    A_links: {
      edges: []           // { from, to, weight, type }
    },
    B_adaptive: {
      autoAddUserNodes: true,
      autoRemoveIdleNodes: true,
      autoReweightLinksOnLoad: true
    },
    A_limits: {
      maxNodesPerRegion: 5000,
      maxEdgesPerNode: 64
    }
  };

  // --------------------------------------------------------------------------
  // 3. Density, Health & Pressure (A → B → A)
  // --------------------------------------------------------------------------
  const DensityHealth = {
    A_metrics: {
      userCount: 0,
      castleCount: 0,
      avgLatencyMs: null,
      packetLossRate: 0,
      meshStrength: "unknown", // unknown | weak | stable | strong

      relayLoadScore: 0,
      pingFrequencyScore: 0,
      meshContributionScore: 0,
      meshPressureIndex: 0
    },
    B_adaptive: {
      densityAware: true,
      costAware: true,
      preferShortLocalPaths: true,
      computePressureIndex: true
    },
    A_thresholds: {
      weakThresholdUsers: 1,
      stableThresholdUsers: 5,
      strongThresholdUsers: 20,
      highPressureThreshold: 70 // 0-100 scale
    }
  };

  // --------------------------------------------------------------------------
  // 4. Routing Logic (A → B → A)
  // --------------------------------------------------------------------------
  const Routing = {
    A_baseline: {
      preferLocalCastle: true,
      fallbackToRemote: true,
      avoidLoops: true
    },
    B_behavior: {
      dynamicWeighting: true,
      congestionAware: true,
      canBridgeBetweenCastles: true
    },
    A_contracts: {
      mustRespectSafetyFrame: true,
      mustNotBypassCostLimits: true
    }
  };

  // --------------------------------------------------------------------------
  // 5. Castle Integration (Mesh ↔ PulseCastle)
  // --------------------------------------------------------------------------
  const CastleIntegration = {
    A_links: {
      attachedCastles: [] // list of castle IDs
    },
    B_behavior: {
      routeThroughNearestHealthyCastle: true,
      reportCastleHealthToExpansion: true,
      supportCastleRetirement: true
    },
    A_contracts: {
      mustNotOverloadSingleCastle: true,
      mustSupportMultiCastleRegions: true
    }
  };

  // --------------------------------------------------------------------------
  // 6. Expansion Integration (Mesh ↔ PulseExpansion)
  // --------------------------------------------------------------------------
  const ExpansionIntegration = {
    A_links: {
      expansionOrganID: "PulseExpansion"
    },
    B_behavior: {
      reportDensityToExpansion: true,
      reportMeshPressureToExpansion: true,
      suggestCastleSpinUpOnDemand: true,
      suggestCastleSpinDownWhenStable: true
    },
    A_contracts: {
      mustProvideAccurateDensitySignals: true,
      mustProvideAccurateMeshStrength: true,
      mustProvideAccurateMeshPressure: true
    }
  };

  // --------------------------------------------------------------------------
  // 7. Multi-Instance & Region Handling (A → B → A)
  // --------------------------------------------------------------------------
  const MultiInstance = {
    A_baseline: {
      oneMeshPerRegionPreferred: true,
      allowSubMeshesForLargeRegions: true
    },
    B_governor: {
      governedBy: "PulseExpansion.SafetyFrame.multiInstanceGovernor",
      preventMeshFragmentation: true,
      mergeSubMeshesWhenPossible: true,
      splitOnlyOnHighLoad: true
    },
    A_rules: {
      mustMaintainSingleLogicalViewPerRegion: true
    }
  };

  // --------------------------------------------------------------------------
  // 8. Telemetry & Logging
  // --------------------------------------------------------------------------
  const Telemetry = {
    metrics: {
      lastUpdatedAt: null,
      userCount: 0,
      castleCount: 0,
      avgLatencyMs: null,
      meshStrength: "unknown",
      meshPressureIndex: 0
    },
    reportTargets: {
      toExpansion: true,
      toLogger: true
    }
  };

  // --------------------------------------------------------------------------
  // 9. Contracts (DNA)
  // --------------------------------------------------------------------------
  const Contracts = Object.freeze({
    preferLocalFirst: true,
    mustCooperateWithCastles: true,
    mustRespectSafetyFrame: true,
    mustAvoidLoops: true
  });

  // --------------------------------------------------------------------------
  // 10. Global Hints (presence/advantage/fallback)
  // --------------------------------------------------------------------------
  let lastGlobalHints = globalHints || null;

  function setGlobalHints(hints) {
    lastGlobalHints = hints || null;
    return { ok: true, hints: lastGlobalHints };
  }

  function getGlobalHints() {
    return lastGlobalHints;
  }

  // --------------------------------------------------------------------------
  // 11. Presence & Advantage Fields (Mesh View)
  // --------------------------------------------------------------------------
  function buildPresenceField() {
    const gh = lastGlobalHints || {};
    return Object.freeze({
      bandPresence: gh.presenceContext?.bandPresence || "unknown",
      routerPresence: gh.presenceContext?.routerPresence || "unknown",
      devicePresence: gh.presenceContext?.devicePresence || "unknown",
      meshPresence: DensityHealth.A_metrics.meshStrength || "unknown"
    });
  }

  function buildAdvantageField() {
    const gh = lastGlobalHints || {};
    return Object.freeze({
      advantageScore: gh.advantageContext?.score ?? null,
      advantageBand: gh.advantageContext?.band ?? "neutral",
      fallbackBandLevel: gh.fallbackBandLevel ?? null
    });
  }

  // --------------------------------------------------------------------------
  // 12. Compute Density & Pressure (deterministic)
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
    DensityHealth.A_metrics.userCount = userCount;
    DensityHealth.A_metrics.castleCount = castleCount;
    DensityHealth.A_metrics.avgLatencyMs = avgLatencyMs;
    DensityHealth.A_metrics.packetLossRate = packetLossRate;
    DensityHealth.A_metrics.relayLoadScore = relayLoadScore;
    DensityHealth.A_metrics.pingFrequencyScore = pingFrequencyScore;
    DensityHealth.A_metrics.meshContributionScore = meshContributionScore;

    let meshStrength = "unknown";
    const thresholds = DensityHealth.A_thresholds;

    if (userCount >= thresholds.strongThresholdUsers) {
      meshStrength = "strong";
    } else if (userCount >= thresholds.stableThresholdUsers) {
      meshStrength = "stable";
    } else if (userCount >= thresholds.weakThresholdUsers) {
      meshStrength = "weak";
    }

    const pressure =
      (relayLoadScore * 0.4) +
      (pingFrequencyScore * 0.3) +
      (meshContributionScore * 0.3);

    const meshPressureIndex = Math.max(0, Math.min(100, Math.round(pressure)));

    DensityHealth.A_metrics.meshStrength = meshStrength;
    DensityHealth.A_metrics.meshPressureIndex = meshPressureIndex;

    Telemetry.metrics.lastUpdatedAt = Date.now();
    Telemetry.metrics.userCount = userCount;
    Telemetry.metrics.castleCount = castleCount;
    Telemetry.metrics.avgLatencyMs = avgLatencyMs;
    Telemetry.metrics.meshStrength = meshStrength;
    Telemetry.metrics.meshPressureIndex = meshPressureIndex;

    return Object.freeze({
      meshStrength,
      meshPressureIndex,
      userCount,
      castleCount
    });
  }

  // --------------------------------------------------------------------------
  // 13. Mesh → Expansion / Castle Signals (symbolic)
  // --------------------------------------------------------------------------
  function buildExpansionSignal() {
    const presenceField = buildPresenceField();
    const advantageField = buildAdvantageField();

    return Object.freeze({
      density: DensityHealth.A_metrics.userCount,
      meshStrength: DensityHealth.A_metrics.meshStrength,
      meshPressureIndex: DensityHealth.A_metrics.meshPressureIndex,
      presenceField,
      advantageField
    });
  }

  function buildCastleSignal() {
    const presenceField = buildPresenceField();
    const advantageField = buildAdvantageField();

    return Object.freeze({
      meshStrength: DensityHealth.A_metrics.meshStrength,
      meshPressureIndex: DensityHealth.A_metrics.meshPressureIndex,
      presenceField,
      advantageField
    });
  }

  // --------------------------------------------------------------------------
  // 14. Snapshot & Manual
  // --------------------------------------------------------------------------
  function getSnapshot() {
    return Object.freeze({
      organId: PulseMeshMeta.organId,
      identity: Identity,
      topology: Topology,
      densityHealth: DensityHealth,
      routing: Routing,
      castleIntegration: CastleIntegration,
      expansionIntegration: ExpansionIntegration,
      multiInstance: MultiInstance,
      telemetry: Telemetry,
      contracts: Contracts,
      globalHints: lastGlobalHints,
      presenceField: buildPresenceField(),
      advantageField: buildAdvantageField()
    });
  }

  function getManual() {
    return {
      meta: PulseMeshMeta,
      description:
        "PulseMesh is the connective tissue of PulseWorld. It reports density, health, and mesh pressure to Expansion and Castle.",
      usage: {
        setGlobalHints:
          "mesh.setGlobalHints({ presenceContext?, advantageContext?, fallbackBandLevel?, ... })",
        computeDensityAndPressure:
          "mesh.computeDensityAndPressure({ userCount, castleCount, avgLatencyMs, packetLossRate, relayLoadScore, pingFrequencyScore, meshContributionScore })",
        buildExpansionSignal:
          "mesh.buildExpansionSignal() // for PulseExpansion",
        buildCastleSignal:
          "mesh.buildCastleSignal() // for PulseCastle",
        getSnapshot:
          "mesh.getSnapshot()"
      }
    };
  }

  // --------------------------------------------------------------------------
  // 15. Public API
  // --------------------------------------------------------------------------
  function log(...args) {
    if (trace) console.log("[PulseMesh]", ...args);
  }

  log("PulseMesh created:", { meshID, regionID });

  return Object.freeze({
    meta: PulseMeshMeta,
    identity: Identity,

    // hints
    setGlobalHints,
    getGlobalHints,

    // fields
    buildPresenceField,
    buildAdvantageField,

    // density + pressure
    computeDensityAndPressure,
    buildExpansionSignal,
    buildCastleSignal,

    // introspection
    getSnapshot,
    getManual
  });
}

export default createPulseMesh;
