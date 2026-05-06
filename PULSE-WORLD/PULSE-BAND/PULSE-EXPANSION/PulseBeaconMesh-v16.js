/**
 * ============================================================================
 *  PULSE-WORLD : PulseBeaconMesh-v16-Immortal-ORGANISM.js
 *  ROLE: Local membrane simulator + density/mode/advantage debugger
 *  VERSION: v16-Immortal-ORGANISM (v16→v18 Every-Advantage, Shifter-Aware)
 *  LAYER: BeaconMesh
 *  IDENTITY: PulseBeaconMesh-v16-Immortal-ORGANISM
 * ============================================================================
 *
 *  PURPOSE:
 *    This organ simulates local world conditions and feeds them into the
 *    PulseBeaconEngine IMMORTAL chain. It does NOT compute signal physics.
 *
 *    In v16-Immortal-ORGANISM, BeaconMesh is no longer an isolated helper.
 *    It is the LOCAL MEMBRANE of the organism, wired symbolically into:
 *
 *      - PulseExpansion (world / region / cluster)
 *      - PulseCastle (castle / beacon / console)
 *      - PulseServer (server lanes)
 *      - PulseUser (user lanes)
 *      - PulseTouch (presence / mode / page / chunkProfile / trust / identity)
 *      - PulseNet (mesh family / ingress / pressure)
 *      - PulseMesh (symbolic mesh organism)
 *      - PulseRuntime (hot instances / regions / presence / modes / pages)
 *      - PulseScheduler (macro tick orchestration)
 *      - PulseOvermind (world-lens / safety)
 *
 *    v16→v18 upgrade:
 *      - Every‑Advantage overlays (mesh + user + proxy).
 *      - Shifter‑aware presence tiers and band shifts.
 *      - Chunk‑prewarm + chunk‑plan hints surfaced to Beacon Engine.
 *      - Proxy envelope surfaced but never mutated.
 *
 *    CONTRACT:
 *      - Never mutate the Beacon Engine.
 *      - Never compute signal shaping.
 *      - Never override global hints.
 *      - Only call Beacon Engine APIs.
 *      - Always deterministic.
 *      - Pure membrane surface (symbolic composition only).
 */
/*
AI_EXPERIENCE_META = {
  identity: "PulseBeaconMesh",
  version: "v16-Immortal-ORGANISM",
  layer: "beacon_mesh",
  role: "local_membrane_simulator",
  lineage: "PulseBeaconMesh-v1 → v11-Evo → v14-Immortal → v16-Immortal-ORGANISM",

  evo: {
    localMembrane: true,
    organismAware: true,
    dualBandAware: true,
    meshAware: true,

    deterministic: true,
    driftProof: true,
    pureCompute: true,

    zeroNetwork: true,
    zeroFilesystem: true,
    zeroMutationOfInput: true,
    zeroDynamicImports: true,
    zeroEval: true,
    zeroTimers: true,
    zeroAsync: true,

    presenceFieldAware: true,
    bandAware: true,
    advantageAware: true,
    chunkPrewarmAware: true,
    multiInstanceReady: true,
    regionAware: true,
    castleAware: true,
    expansionAware: true,
    routerAware: true,
    meshPressureAware: true,
    presenceTierAware: true,
    advantageBandAware: true,
    chunkPlanAware: true,
    pulseTouchAware: true,
    pulseNetAware: true,
    runtimeAware: true,
    schedulerAware: true,
    overmindAware: true,
    meshOrganismAware: true,
    proxyAware: true
  },

  contract: {
    always: [
      "PulseBeaconEngine",
      "PulseExpansion",
      "PulseCastle",
      "PulseServer",
      "PulseUser",
      "PulseTouch",
      "PulseNet",
      "PulseMesh",
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
// IMPORTS — ORGANISM CONTEXT + BEACON ENGINE
// ============================================================================

// Expansion / world / region / cluster
import {
  PulseExpansionMeta,
  createPulseExpansion,
  getPulseExpansionContext
} from "./PulseExpansion-v16.js";

// Castle / beacon / console
import {
  PulseCastleMeta,
  createPulseCastle,
  getPulseCastleContext
} from "../PulseCastle-v16.js";
import {
  PulseServerMeta,
  createPulseServer,
  getPulseServerContext
} from "./PulseServer-v16.js";
import {
  PulseRouterMeta,
  createPulseRouter
} from "./PulseRouter-v16.js";

// User lanes
import { getPulseUserContext, createPulseWorldCore } from "./PulseUser-v16.js";

import {
  getBeaconEngineContext,
  PulseBeaconEngine
} from "./PulseBeaconEngine-v16.js";
import { getConsoleContext } from "./PulseBeaconConsole-v16.js";

// Mesh organism (symbolic + binary)
import createPulseMesh, {
  PulseMeshMeta
} from "../PULSE-MESH/PulseMesh-v16.js";
import createBinaryMesh, {
  BinaryMeshMeta
} from "../PULSE-MESH/PulseBinaryMesh-v16.js";

// Touch / presence
import { getPulseTouchContext } from "../../PULSE-UI/PULSE-TOUCH.js";

// Runtime (hot instances / regions / presence / modes / pages)
import { getPulseRuntimeContext } from "../PULSE-X/PulseWorldRuntime-v17.js";

// Scheduler (macro ticks / policies / world-lens stop conditions)
import { getPulseSchedulerContext } from "../PULSE-X/PulseWorldScheduler-v17.js";

// Overmind (world-lens / safety / persona mix)
import { getPulseOvermindContext } from "../PULSE-AI/aiOvermindPrime.js";

// Proxy context (IMMORTAL dual-band envelope)
import {
  getProxyContext,
  getProxyPressure,
  getProxyBoost,
  getProxyFallback,
  getProxyMode,
  getProxyLineage
} from "../PULSE-PROXY/PulseProxyContext-v16.js";

// ============================================================================
// META
// ============================================================================

export const PulseBeaconMeshMeta = Object.freeze({
  layer: "BeaconMesh",
  role: "LOCAL_MEMBRANE_SIMULATOR",
  version: "v16-Immortal-ORGANISM",
  identity: "PulseBeaconMesh-v16-Immortal-ORGANISM",

  guarantees: Object.freeze({
    deterministic: true,
    driftProof: true,
    zeroRandomness: true,
    zeroTimers: true,
    zeroAsync: true,
    zeroNetwork: true,
    zeroEval: true,
    zeroDynamicImports: true,
    zeroMutation: true,
    zeroExternalMutation: true,

    meshAware: true,
    presenceFieldAware: true,
    bandAware: true,
    advantageAware: true,
    chunkPrewarmAware: true,
    multiInstanceReady: true,
    regionAware: true,
    castleAware: true,
    expansionAware: true,
    routerAware: true,
    meshPressureAware: true,
    presenceTierAware: true,
    advantageBandAware: true,
    chunkPlanAware: true,
    pulseTouchAware: true,
    pulseNetAware: true,
    runtimeAware: true,
    schedulerAware: true,
    overmindAware: true,
    meshOrganismAware: true,
    proxyAware: true
  })
});

// ============================================================================
// INTERNAL HELPERS (symbolic only)
// ============================================================================

function stableHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `bm${h}`;
}

function buildOrganismContext() {
  const expansion = getPulseExpansionContext?.() || {};
  const castle = getPulseCastleContext?.() || {};
  const beaconEngineCtx = getBeaconEngineContext?.() || {};
  const consoleCtx = getConsoleContext?.() || {};
  const server = getPulseServerContext?.() || {};
  const user = getPulseUserContext?.() || {};
  const touch = getPulseTouchContext?.() || {};
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
    beaconEngineCtx,
    console: consoleCtx,
    server,
    user,
    touch,
    runtime,
    scheduler,
    overmind,
    meshMeta: PulseMeshMeta,
    binaryMeshMeta: BinaryMeshMeta,
    expansionMeta: PulseExpansionMeta,
    castleMeta: PulseCastleMeta,
    serverMeta: PulseServerMeta,
    routerMeta: PulseRouterMeta,
    proxyMeta
  };
}

function buildScenarioProfile({
  densityHint = "medium",
  demandHint = "medium",
  regionType = "venue",
  meshStatus = "unknown",
  presenceTier = "normal",
  advantageBand = "neutral",
  fallbackBandLevel = null
} = {}) {
  return Object.freeze({
    densityHint,
    demandHint,
    regionType,
    meshStatus,
    presenceTier,
    advantageBand,
    fallbackBandLevel,
    scenarioSignature: stableHash(
      `SCENARIO::${densityHint}::${demandHint}::${regionType}::${meshStatus}::${presenceTier}::${advantageBand}::${fallbackBandLevel}`
    )
  });
}

// ============================================================================
// ORGAN: PulseBeaconMesh (v16-Immortal-ORGANISM, Every-Advantage / Shifter)
// ============================================================================

export function PulseBeaconMesh({
  beacon,
  meshID = null,
  regionID = null,
  trace = false
} = {}) {
  if (!beacon) {
    throw new Error("PulseBeaconMesh requires a Beacon Engine instance");
  }

  const log = (...args) => trace && console.log("[PulseBeaconMesh v16]", ...args);

  const snapshotMeta = Object.freeze({
    engineIdentity: beacon?.meta?.identity ?? null,
    engineVersion: beacon?.meta?.version ?? null,
    engineLayer: beacon?.meta?.layer ?? null,
    engineRole: beacon?.meta?.role ?? null
  });

  const localMesh =
    createPulseMesh?.({
      meshID: meshID || "beacon-mesh",
      regionID,
      trace: false
    }) || null;

  const binaryMesh =
    createBinaryMesh?.({
      meshID: meshID || "beacon-binary-mesh",
      regionID,
      trace: false
    }) || null;

  // ---------------------------------------------------------------------------
  // 1. Presence / Advantage Fields (Every-Advantage + Shifter-aware)
  // ---------------------------------------------------------------------------
  function buildPresenceField() {
    const ctx = buildOrganismContext();
    const touch = ctx.touch || {};
    const runtime = ctx.runtime || {};
    const expansion = ctx.expansion || {};
    const overmind = ctx.overmind || {};
    const proxyMeta = ctx.proxyMeta || {};

    const meshSnapshot = localMesh?.getSnapshot?.() || null;
    const meshPresence =
      meshSnapshot?.presenceField?.meshPresence ||
      meshSnapshot?.densityHealth?.metrics?.meshStrength ||
      "unknown";

    const presenceTier =
      overmind.presenceTier ||
      touch.presenceTier ||
      "normal";

    return Object.freeze({
      bandPresence: touch.bandPresence || "unknown",
      devicePresence: touch.devicePresence || "unknown",
      routerPresence: expansion.routerPresence || "unknown",
      meshPresence,
      regionPresence: expansion.regionPresence || regionID || "unknown",

      touchPresence: touch.presence || "unknown",
      touchMode: touch.mode || "unknown",
      touchPage: touch.page || "unknown",
      touchChunkProfile: touch.chunkProfile || "default",
      touchTrusted: touch.trusted || "unknown",
      touchIdentityTier: touch.identityTier || "anon",

      runtimeHotPresence: runtime.hotPresence || null,
      runtimeHotModes: runtime.hotModes || null,
      runtimeHotPages: runtime.hotPages || null,

      presenceTier,
      shifterBand: touch.shifterBand || null,

      proxyMode: proxyMeta.mode || "normal",
      proxyFallback: !!proxyMeta.fallback
    });
  }

  function buildAdvantageField() {
    const ctx = buildOrganismContext();
    const touch = ctx.touch || {};
    const runtime = ctx.runtime || {};
    const user = ctx.user || {};
    const expansion = ctx.expansion || {};
    const proxyMeta = ctx.proxyMeta || {};

    const meshSnapshot = localMesh?.getSnapshot?.() || null;
    const meshAdvantage = meshSnapshot?.advantageField || {};

    const advantageBand =
      touch.advantageBand ??
      meshAdvantage.advantageBand ??
      "neutral";

    const fallbackBandLevel =
      touch.fallbackBandLevel ??
      meshAdvantage.fallbackBandLevel ??
      0;

    return Object.freeze({
      advantageScore:
        touch.advantageScore ??
        meshAdvantage.advantageScore ??
        null,
      advantageBand,
      fallbackBandLevel,

      touchTrust: touch.trust || "unknown",
      touchIdentityTier: touch.identityTier || "anon",

      runtimeContributionHeat: runtime.hotInstances || null,
      userContributionScore: user.contributionScore ?? null,
      expansionTier: expansion.tier || null,

      proxyPressure: proxyMeta.pressure ?? 0,
      proxyBoost: proxyMeta.boost ?? 0,
      proxyFallback: !!proxyMeta.fallback
    });
  }

  // ---------------------------------------------------------------------------
  // 2. Chunk‑Prewarm / Chunk‑Plan Hints (symbolic only)
  // ---------------------------------------------------------------------------
  function buildChunkPlanHints() {
    const ctx = buildOrganismContext();
    const touch = ctx.touch || {};
    const runtime = ctx.runtime || {};
    const overmind = ctx.overmind || {};

    const page = touch.page || "unknown";
    const mode = touch.mode || "unknown";
    const chunkProfile = touch.chunkProfile || "default";

    const hotPages = runtime.hotPages || [];
    const hotChunkProfiles = runtime.hotChunkProfiles || [];

    const shouldPrewarm =
      chunkProfile !== "default" ||
      hotPages.includes(page) ||
      hotChunkProfiles.includes(chunkProfile);

    return Object.freeze({
      page,
      mode,
      chunkProfile,
      shouldPrewarm,
      hotPages,
      hotChunkProfiles,
      worldLens: overmind.worldLens || null
    });
  }

  // ---------------------------------------------------------------------------
  // 3. Scenario + Membrane Payload
  // ---------------------------------------------------------------------------
  function buildScenario() {
    const ctx = buildOrganismContext();
    const meshSnapshot = localMesh?.getSnapshot?.() || null;

    const densityMetrics = meshSnapshot?.densityHealth?.metrics || {};
    const userCount = densityMetrics.userCount || 0;

    let densityHint = "low";
    if (userCount >= 20) densityHint = "high";
    else if (userCount >= 5) densityHint = "medium";

    const meshStatus = densityMetrics.meshStrength || "unknown";

    const presenceField = buildPresenceField();
    const advantageField = buildAdvantageField();

    const presenceTier = presenceField.presenceTier || "normal";
    const advantageBand = advantageField.advantageBand || "neutral";

    const fallbackBandLevel = advantageField.fallbackBandLevel ?? null;

    return buildScenarioProfile({
      densityHint,
      demandHint: "medium",
      regionType: "venue",
      meshStatus,
      presenceTier,
      advantageBand,
      fallbackBandLevel
    });
  }

  function buildMembraneInput() {
    const organismContext = buildOrganismContext();
    const presenceField = buildPresenceField();
    const advantageField = buildAdvantageField();
    const chunkPlanHints = buildChunkPlanHints();
    const scenario = buildScenario();

    const meshSnapshot = localMesh?.getSnapshot?.() || null;
    const binaryMeshSnapshot = binaryMesh?.getSnapshot?.() || null;

    const meshPressureIndex =
      meshSnapshot?.densityHealth?.metrics?.meshPressureIndex ?? 0;

    return Object.freeze({
      meta: PulseBeaconMeshMeta,
      snapshotMeta,
      regionID,
      meshID,
      presenceField,
      advantageField,
      chunkPlanHints,
      scenario,
      meshPressureIndex,
      meshSnapshot,
      binaryMeshSnapshot,
      organismContext
    });
  }

  // ---------------------------------------------------------------------------
  // 4. Beacon Engine Surface (no mutation, pure calls)
  // ---------------------------------------------------------------------------
  function buildBeaconRequest() {
    const membraneInput = buildMembraneInput();

    return Object.freeze({
      intent: "membrane-update",
      payload: membraneInput
    });
  }

  // ---------------------------------------------------------------------------
  // 5. Composite Field (presence/band/advantage/chunk + proxy)
// ---------------------------------------------------------------------------
  function buildCompositeField() {
    const membraneInput = buildMembraneInput();
    const presenceField = membraneInput.presenceField;
    const advantageField = membraneInput.advantageField;
    const chunkPrewarmField = membraneInput.chunkPlanHints;
    const organismCtx = membraneInput.organismContext;
    const proxyMeta = organismCtx.proxyMeta || {};

    const presenceTier =
      presenceField?.presenceTier ??
      presenceField?.routerPresence ??
      presenceField?.bandPresence ??
      "unknown";

    const advantageBand =
      advantageField?.advantageBand ??
      "neutral";

    const meshStrength =
      presenceField?.meshPresence ??
      presenceField?.meshStrength ??
      "unknown";

    const meshPressureIndex =
      membraneInput.meshPressureIndex ?? null;

    const chunkPriority =
      chunkPrewarmField?.shouldPrewarm ? "high" : null;

    const proxyPressure = proxyMeta.pressure ?? 0;
    const proxyFallback = !!proxyMeta.fallback;
    const proxyBoost = proxyMeta.boost ?? 0;
    const proxyMode = proxyMeta.mode || "normal";
    const proxyLineage = proxyMeta.lineage || null;

    return Object.freeze({
      presenceField,
      advantageField,
      chunkPrewarmField,
      presenceTier,
      advantageBand,
      meshStrength,
      meshPressureIndex,
      chunkPriority,

      proxyPressure,
      proxyFallback,
      proxyBoost,
      proxyMode,
      proxyLineage,

      organismContext: organismCtx,
      compositeSignature: stableHash(
        `COMPOSITE::${presenceTier}::${advantageBand}::${meshStrength}::${meshPressureIndex}::${chunkPriority}::${proxyMode}::${proxyPressure}`
      )
    });
  }

  // ---------------------------------------------------------------------------
  // 6. Regioning + Multi-instance
  // ---------------------------------------------------------------------------
  function getRegioningSignature() {
    if (typeof beacon.getRegioningSignature === "function") {
      return beacon.getRegioningSignature();
    }
    return beacon?.meta?.regioningPhysicsSignature ?? null;
  }

  function getMultiInstanceView() {
    if (typeof beacon.getMultiInstanceSnapshot === "function") {
      return beacon.getMultiInstanceSnapshot();
    }
    const snap = beacon.getStateSnapshot?.();
    return {
      snapshot: snap,
      note:
        "Engine does not expose explicit multi-instance snapshot; returning generic state snapshot."
    };
  }

  // ---------------------------------------------------------------------------
  // 7. Simulation (symbolic only, delegates to beacon)
// ---------------------------------------------------------------------------
  function simulate({
    densityHint = "medium",
    demandHint = "medium",
    regionType = "venue",
    meshStatus = "unknown",
    presenceTier = "normal",
    advantageBand = "neutral",
    fallbackBandLevel = null
  } = {}) {
    const profile = buildScenarioProfile({
      densityHint,
      demandHint,
      regionType,
      meshStatus,
      presenceTier,
      advantageBand,
      fallbackBandLevel
    });

    log("Simulate scenario:", profile);

    const result = beacon.broadcastOnce({
      densityHint: profile.densityHint,
      demandHint: profile.demandHint,
      regionType: profile.regionType,
      meshStatus: profile.meshStatus
    });

    return Object.freeze({
      profile,
      result
    });
  }

  function simulateScenarioPreset(preset = "default") {
    const ctx = buildOrganismContext();
    const touch = ctx.touch || {};
    const net = ctx.net || {};
    const expansion = ctx.expansion || {};

    switch (preset) {
      case "home_low":
        return simulate({
          densityHint: "low",
          demandHint: "low",
          regionType: "home",
          meshStatus: "stable",
          presenceTier: touch.presenceTier || "normal",
          advantageBand: touch.advantageBand || "neutral",
          fallbackBandLevel: touch.fallbackBandLevel ?? null
        });
      case "venue_peak":
        return simulate({
          densityHint: "high",
          demandHint: "high",
          regionType: "venue",
          meshStatus: "strong",
          presenceTier: touch.presenceTier || "elevated",
          advantageBand: touch.advantageBand || "advantaged",
          fallbackBandLevel: touch.fallbackBandLevel ?? 0
        });
      case "campus_burst":
        return simulate({
          densityHint: "high",
          demandHint: "burst",
          regionType: "campus",
          meshStatus: "stable",
          presenceTier: touch.presenceTier || "normal",
          advantageBand: touch.advantageBand || "neutral",
          fallbackBandLevel: touch.fallbackBandLevel ?? 0
        });
      case "city_overloaded":
        return simulate({
          densityHint: "peak",
          demandHint: "high",
          regionType: "city",
          meshStatus: "overloaded",
          presenceTier: touch.presenceTier || "stressed",
          advantageBand: touch.advantageBand || "constrained",
          fallbackBandLevel: touch.fallbackBandLevel ?? 1
        });
      case "expansion_region":
        return simulate({
          densityHint: expansion.densityHint || "medium",
          demandHint: expansion.demandHint || "medium",
          regionType: expansion.regionType || "venue",
          meshStatus: net.meshStatus || "unknown",
          presenceTier: touch.presenceTier || "normal",
          advantageBand: touch.advantageBand || "neutral",
          fallbackBandLevel: touch.fallbackBandLevel ?? null
        });
      default:
        return simulate({});
    }
  }

  function simulateBatch(scenarios = []) {
    if (!Array.isArray(scenarios) || scenarios.length === 0) return [];
    return Object.freeze(
      scenarios.map((s) => {
        const profile = buildScenarioProfile(s || {});
        const result = simulate({
          densityHint: profile.densityHint,
          demandHint: profile.demandHint,
          regionType: profile.regionType,
          meshStatus: profile.meshStatus,
          presenceTier: profile.presenceTier,
          advantageBand: profile.advantageBand,
          fallbackBandLevel: profile.fallbackBandLevel
        });
        return { profile, result };
      })
    );
  }

  // ---------------------------------------------------------------------------
  // 8. Snapshots
  // ---------------------------------------------------------------------------
  function getMembraneSnapshot() {
    const membraneInput = buildMembraneInput();

    return Object.freeze({
      organId: PulseBeaconMeshMeta.identity,
      meta: PulseBeaconMeshMeta,
      snapshotMeta,
      regionID,
      meshID,
      presenceField: membraneInput.presenceField,
      advantageField: membraneInput.advantageField,
      chunkPlanHints: membraneInput.chunkPlanHints,
      scenario: membraneInput.scenario,
      meshPressureIndex: membraneInput.meshPressureIndex,
      meshMeta: PulseMeshMeta,
      binaryMeshMeta: BinaryMeshMeta,
      expansionMeta: PulseExpansionMeta,
      castleMeta: PulseCastleMeta,
      serverMeta: PulseServerMeta,
      routerMeta: PulseRouterMeta,
      proxyMeta: membraneInput.organismContext.proxyMeta,
      organismContext: membraneInput.organismContext
    });
  }

  function getSnapshot() {
    const engineSnapshot = beacon.getStateSnapshot?.() ?? null;
    return Object.freeze({
      engineSnapshot,
      composite: buildCompositeField()
    });
  }

  // ---------------------------------------------------------------------------
  // 9. Public Organ Surface
  // ---------------------------------------------------------------------------
  return Object.freeze({
    meta: PulseBeaconMeshMeta,
    engineMeta: snapshotMeta,
    meshIdentity: binaryMesh?.identity || localMesh?.identity || null,

    // simulation
    simulate,
    simulateScenarioPreset,
    simulateBatch,
    buildScenarioProfile,

    // fields
    buildPresenceField,
    buildAdvantageField,
    buildChunkPlanHints,
    buildScenario,
    buildMembraneInput,
    buildBeaconRequest,
    buildCompositeField,

    // telemetry + snapshots
    getTelemetry() {
      return beacon.getTelemetry?.() ?? null;
    },
    getSnapshot,
    getMembraneSnapshot,

    getPresenceField() {
      return buildPresenceField();
    },
    getAdvantageField() {
      return buildAdvantageField();
    },

    getRegioningSignature,
    getMultiInstanceView
  });
}

export default PulseBeaconMesh;
