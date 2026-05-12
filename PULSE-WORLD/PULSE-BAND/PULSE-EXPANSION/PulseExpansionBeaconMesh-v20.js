/**
 * ============================================================================
 *  PULSE-WORLD : PulseBeaconMesh-v20-Immortal-NET.js
 *  ROLE: Local membrane simulator + density/mode/advantage/network debugger
 *  VERSION: v20-Immortal-NET (v16→v18→v20 Every-Advantage, Shifter+Continuance+OmniHosting-Aware)
 *  LAYER: BeaconMesh
 *  IDENTITY: PulseBeaconMesh-v20-Immortal-NET
 * ============================================================================
 *
 *  PURPOSE:
 *    This organ simulates local world conditions and feeds them into the
 *    PulseBeaconEngine IMMORTAL chain. It does NOT compute signal physics.
 *
 *    In v20-Immortal-NET, BeaconMesh is the LOCAL MEMBRANE of the organism,
 *    wired symbolically into:
 *
 *      - PulseExpansion (world / region / cluster)
 *      - PulseCastle (castle / beacon / console)
 *      - PulseServer (server lanes)
 *      - PulseRouter (routing lanes)
 *      - PulseUser (user lanes)
 *      - PulseTouch (presence / mode / page / chunkProfile / trust / identity)
 *      - PulseNet (mesh family / ingress / pressure)
 *      - PulseMesh (symbolic mesh organism)
 *      - PulseBinaryMesh (binary mesh organism)
 *      - PulseRuntime (hot instances / regions / presence / modes / pages)
 *      - PulseScheduler (macro tick orchestration)
 *      - PulseOvermind (world-lens / safety)
 *      - PulseWorldCore (AI-mirror worldview)
 *      - PulseContinuance (GPU continuance physics)
 *      - PulseOmniHosting (hosting physics / artery metrics)
 *      - PulseProxy (dual-band proxy envelope)
 *
 *    v16→v18→v20 upgrades:
 *      - Every‑Advantage overlays (mesh + user + proxy + continuance + omnihosting).
 *      - Shifter‑aware presence tiers and band shifts.
 *      - Chunk‑prewarm + chunk‑plan hints surfaced to Beacon Engine.
 *      - Proxy envelope surfaced but never mutated.
 *      - Continuance risk + fallback band + prewarm/cache/chunk hints surfaced.
 *      - OmniHosting artery metrics surfaced as mesh pressure / expansion hints.
 *      - Multi‑radio profile awareness (Bluetooth + LTE‑assist symbolic fields).
 *      - Ultra‑low‑power “signal mode” lanes (symbolic only, no physics).
 *
 *    CONTRACT:
 *      - Never mutate the Beacon Engine.
 *      - Never compute signal shaping.
 *      - Never override global hints.
 *      - Only call Beacon Engine APIs.
 *      - Always deterministic.
 *      - Pure membrane surface (symbolic composition only).
 */
import {
  OrganismIdentity,
  buildPulseOrganismMap as PulseOrganismMap,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PULSE-WORLD-MAP.js";
const Identity = OrganismIdentity(import.meta.url);

// 2 — EXPORT GENOME METADATA
export const PulseBeaconMeshMeta = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
// export const PULSE_EARN_IMMUNE_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// ============================================================================
// IMPORTS — ORGANISM CONTEXT + BEACON ENGINE
// ============================================================================

// Expansion / world / region / cluster
import {
  PulseExpansionMeta,
  createPulseExpansion,
  getPulseExpansionContext
} from "./PULSE-EXPANSION-INTERNET.js";

// Castle / beacon / console
import {
  PulseCastleMeta,
  createPulseCastle,
  getPulseCastleContext
} from "./PULSE-EXPANSION-CASTLE.js";
import {
  PulseServerMeta,
  createPulseServer,
  getPulseServerContext
} from "./PULSE-EXPANSION-SERVER.js";
import {
  PulseRouterMeta,
  createPulseRouter
} from "../PULSE-X/PULSE-WORLD-INTERNET-ROUTER.js";

// User lanes
import { getPulseUserContext } from "./PULSE-EXPANSION-USER.js";

// WorldCore (AI mirror)
import {
  createPulseWorldCore,
  pulseWorldCore
} from "./PulseExpansionAIWorldCore-v20.js";

// Beacon Engine + Console
import {
  getBeaconEngineContext,
  PulseBeaconEngine
} from "./PulseExpansionBeaconEngine-v20.js";
import { getConsoleContext } from "./PulseExpansionBeaconConsole-v20.js";

// Mesh organism (symbolic + binary)
import createPulseMesh, {
  PulseMeshMeta
} from "../PULSE-MESH/PulseMesh-v24.js";
import createBinaryMesh, {
  BinaryMeshMeta
} from "../PULSE-MESH/PulseMeshBinary-v24.js";

// Touch / presence
import { getPulseTouchContext } from "../../PULSE-UI/PULSE-WORLD-TOUCH.js";

// Runtime (hot instances / regions / presence / modes / pages)
import { getPulseRuntimeContext } from "../PULSE-X/PulseWorldRuntime-v20.js";

// Scheduler (macro ticks / policies / world-lens stop conditions)
import { getPulseSchedulerContext } from "../PULSE-X/PulseWorldScheduler-v20.js";

// Overmind (world-lens / safety / persona mix)
import { getPulseOvermindContext } from "../PULSE-X/PULSE-WORLD-ALDWYN.js";

// Continuance (GPU continuance physics)
import {
  getLastContinuanceState
} from "../PULSE-FINALITY/PulseFinalityContinuance-v20.js";

// OmniHosting (hosting physics / artery metrics)
import {
  getLastOmniHostingState
} from "../PULSE-FINALITY/PulseFinalityOmniHosting-v20.js";

// Proxy context (IMMORTAL dual-band envelope)
import {
  getProxyContext,
  getProxyPressure,
  getProxyBoost,
  getProxyFallback,
  getProxyMode,
  getProxyLineage
} from "../PULSE-PROXY/PulseProxyContext-v20.js";


function stableHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `bm${h}`;
}

function clamp01(v) {
  if (v == null || Number.isNaN(v)) return 0;
  if (v < 0) return 0;
  if (v > 1) return 1;
  return v;
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

  const worldCoreSnapshot =
    typeof pulseWorldCore?.snapshotWorld === "function"
      ? pulseWorldCore.snapshotWorld()
      : null;

  const continuanceState = getLastContinuanceState?.() || null;
  const omniHostingState = getLastOmniHostingState?.() || null;

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
    worldCoreSnapshot,
    continuanceState,
    omniHostingState,
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

// Multi‑radio profile (symbolic only: Bluetooth + LTE‑assist)
function burstWindowsDutyCycle(risk, pressure) {
  const r = Math.max(risk, pressure);
  if (r >= 0.8) return "short-high";
  if (r >= 0.6) return "medium-high";
  if (r >= 0.4) return "medium";
  return "low";
}

function buildMultiRadioProfile({
  densityHint = "medium",
  demandHint = "medium",
  meshStatus = "unknown",
  continuanceRisk = 0,
  proxyPressure = 0
} = {}) {
  const risk = clamp01(continuanceRisk);
  const pressure = clamp01(proxyPressure);

  let btMode = "signal-low-power"; // signal-low-power | presence-steady | mesh-coop | expansion-lane
  if (meshStatus === "strong") btMode = "mesh-coop";
  if (demandHint === "high") btMode = "presence-steady";
  if (densityHint === "low") btMode = "expansion-lane";

  let lteAssist = "idle"; // idle | assist-light | assist-heavy
  if (risk >= 0.6 || pressure >= 0.6) {
    lteAssist = "assist-heavy";
  } else if (risk >= 0.3 || pressure >= 0.3) {
    lteAssist = "assist-light";
  }

  const burstWindows = {
    enabled: risk >= 0.7 || pressure >= 0.7,
    reason:
      risk >= 0.7 || pressure >= 0.7
        ? "high_risk_or_pressure"
        : "normal",
    suggestedDutyCycle: burstWindowsDutyCycle(risk, pressure)
  };

  return Object.freeze({
    btMode,
    lteAssist,
    burstWindows,
    meta: {
      densityHint,
      demandHint,
      meshStatus,
      continuanceRisk: risk,
      proxyPressure: pressure
    }
  });
}

// Continuance + OmniHosting overlays → global hints patch
function buildContinuanceOmniHostingOverlay(continuanceState, omniHostingState) {
  const riskReport = continuanceState?.riskReport || null;
  const globalRisk = clamp01(riskReport?.globalRisk ?? 0);
  const fallbackBandLevel = riskReport?.fallbackBandLevel ?? 0;
  const prewarmHint = riskReport?.prewarmHint || null;
  const cacheHint = riskReport?.cacheHint || null;
  const chunkHint = riskReport?.chunkHint || null;

  const artery = omniHostingState?.lastPlacementPlan?.artery ||
                 omniHostingState?.lastFailoverPlan?.artery ||
                 null;

  const arteryPressure = clamp01(artery?.pressure ?? 0);
  const arteryLoad = clamp01(artery?.load ?? 0);

  return Object.freeze({
    fallbackContext: {
      fallbackBandLevel
    },
    chunkHints: {
      chunkAggression: chunkHint?.chunkAggression ?? (1 - globalRisk)
    },
    cacheHints: {
      keepHot: cacheHint?.keepHot ?? globalRisk >= 0.4,
      priority: cacheHint?.priority ?? (globalRisk >= 0.8 ? "critical" : globalRisk >= 0.6 ? "high" : "normal")
    },
    prewarmHints: {
      shouldPrewarm: prewarmHint?.shouldPrewarm ?? globalRisk >= 0.4,
      reason: prewarmHint?.reason ?? "continuance_overlay"
    },
    arteryOverlay: {
      globalRisk,
      arteryPressure,
      arteryLoad
    }
  });
}

// ============================================================================
// ORGAN: PulseBeaconMesh (v20-Immortal-NET, Every-Advantage / Shifter / NET)
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

  const log = (...args) => trace && console.log("[PulseBeaconMesh v20]", ...args);

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

    const continuanceOverlay = buildContinuanceOmniHostingOverlay(
      ctx.continuanceState,
      ctx.omniHostingState
    );

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
      proxyFallback: !!proxyMeta.fallback,

      continuanceGlobalRisk: continuanceOverlay.arteryOverlay.globalRisk,
      arteryPressure: continuanceOverlay.arteryOverlay.arteryPressure,
      arteryLoad: continuanceOverlay.arteryOverlay.arteryLoad
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

    const continuanceOverlay = buildContinuanceOmniHostingOverlay(
      ctx.continuanceState,
      ctx.omniHostingState
    );

    return Object.freeze({
      page,
      mode,
      chunkProfile,
      shouldPrewarm,
      hotPages,
      hotChunkProfiles,
      worldLens: overmind.worldLens || null,
      continuancePrewarm: continuanceOverlay.prewarmHints,
      continuanceChunkHints: continuanceOverlay.chunkHints
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

    const continuanceOverlay = buildContinuanceOmniHostingOverlay(
      organismContext.continuanceState,
      organismContext.omniHostingState
    );

    const multiRadioProfile = buildMultiRadioProfile({
      densityHint: scenario.densityHint,
      demandHint: scenario.demandHint,
      meshStatus: scenario.meshStatus,
      continuanceRisk: continuanceOverlay.arteryOverlay.globalRisk,
      proxyPressure: clamp01(organismContext.proxyMeta?.pressure ?? 0)
    });

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
      organismContext,
      continuanceOverlay,
      multiRadioProfile
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
  // 5. Composite Field (presence/band/advantage/chunk + proxy + multi-radio)
// ---------------------------------------------------------------------------
  function buildCompositeField() {
    const membraneInput = buildMembraneInput();
    const presenceField = membraneInput.presenceField;
    const advantageField = membraneInput.advantageField;
    const chunkPrewarmField = membraneInput.chunkPlanHints;
    const organismCtx = membraneInput.organismContext;
    const proxyMeta = organismCtx.proxyMeta || {};
    const multiRadioProfile = membraneInput.multiRadioProfile;

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

      multiRadioProfile,

      organismContext: organismCtx,
      compositeSignature: stableHash(
        `COMPOSITE::${presenceTier}::${advantageBand}::${meshStrength}::${meshPressureIndex}::${chunkPriority}::${proxyMode}::${proxyPressure}::${multiRadioProfile?.btMode || "na"}`
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
      continuanceOverlay: membraneInput.continuanceOverlay,
      multiRadioProfile: membraneInput.multiRadioProfile,
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
