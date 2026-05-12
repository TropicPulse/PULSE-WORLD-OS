// ============================================================================
// PULSE-WORLD : PulseBeaconEngine-v20-Immortal-GPU+-CI.js
// ORGAN TYPE: Bluetooth Presence / Membrane Organism
// VERSION: v20-Immortal-GPU+-CI (Every-Advantage, Every-Prewarm, Mesh/WorldCore/Continuance/OmniHosting/CI/Binary-Delta-Aware)
// ============================================================================
//
// ROLE:
//   PulseBeaconEngine is the Bluetooth membrane of PulseWorld.
//   It turns region + mesh + castle + user + worldCore + continuance + omniHosting
//   state into deterministic, SafetyFrame-compliant Bluetooth presence frames
//   AND EMITS THEM over Bluetooth.
//
//   v20-Immortal-GPU+-CI upgrades:
//     - GPU-aware, CI-aware, Continuance-aware, Binary-Delta-aware
//     - WorldCore-aware, Mesh-aware, Router-aware, Server-aware
//     - Explicit userContext attachment (user ↔ membrane)
//     - Direct consumption of:
//         • PulseMesh user/region signals
//         • PulseWorldCore AI-mirror advantage/truth vectors
//         • PulseContinuance risk reports + overlays
//         • PulseOmniHosting placement/failover plans
//     - Chunk/cache/prewarm/fallback surfaced as first-class IMMORTAL fields
//     - Deterministic “profile lanes” for discovery/presence/mesh/expand/immortal
//     - Dual-band symbolic/binary presence frames (band + binaryField + waveField)
//     - Artery metrics for broadcast load + pressure (pure compute, symbolic only)
//     - INTERNAL Bluetooth emitter: this file is the ONLY place that can emit Bluetooth.
//
// CONTRACT:
//   - Never auto-connect, never bypass SafetyFrame.
//   - Never perform direct hardware I/O except via internal nativeBluetoothBroadcast.
//   - Never introduce randomness or async drift.
//   - Always remain deterministic, synthetic, and drift-proof in its logic.
//   - This organ is the ONLY Bluetooth membrane in the organism.
// ============================================================================
import {
  OrganismIdentity,
  buildPulseOrganismMap as PulseOrganismMap,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PULSE-WORLD-MAP.js";
const Identity = OrganismIdentity(import.meta.url);

// 2 — EXPORT GENOME METADATA
export const PulseBeaconMeta = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
// export const PULSE_EARN_IMMUNE_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// ============================================================================
// INTERNAL BLUETOOTH EMITTER (ONLY HARDWARE EDGE IN THE ORGANISM)
// ============================================================================

let _nativeBluetoothDriver = null; // platform-specific driver, internal only

export function attachNativeBluetoothDriver(driver) {
  // driver MUST implement: driver.broadcast(payload, profile)
  if (!driver || typeof driver.broadcast !== "function") {
    throw new Error("[PulseBeaconEngine-v20] Invalid native Bluetooth driver");
  }
  _nativeBluetoothDriver = driver;
  return { ok: true };
}

function nativeBluetoothBroadcast(payload, profile) {
  if (!_nativeBluetoothDriver) {
    throw new Error(
      "[PulseBeaconEngine-v20] nativeBluetoothBroadcast called with no attached driver"
    );
  }
  _nativeBluetoothDriver.broadcast(payload, profile);
}

// ============================================================================
// HELPERS
// ============================================================================

function clamp01(v) {
  if (v == null || Number.isNaN(v)) return 0;
  if (v < 0) return 0;
  if (v > 1) return 1;
  return v;
}

function stableHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `be${h}`;
}

// ============================================================================
// FACTORY: createPulseBeaconEngine — v20-Immortal-GPU+-CI
// ============================================================================

export function createPulseBeaconEngine({
  engineID = null,
  regionID = null,
  boundCastleID = null,
  trace = false,
  safetyPolicy = null, // fn({ mode, payload, signalProfile }) => { allowed: boolean, reason?: string }
  globalHints = null   // unified global hints object (hybrid v20)
} = {}) {
  // --------------------------------------------------------------------------
  // INTERNAL STATE
  // --------------------------------------------------------------------------
  let activeMode =
    "discovery"; // discovery | presence | adaptive | pulse-reach | pulse-storm | PULSE-MESH | pulse-expand | pulse-immortal
  let tick = 0;

  const identity = Object.freeze({
    engineID: engineID || stableHash(`engine-${regionID || "global"}`),
    regionID,
    boundCastleID,
    createdBy: "PulseExpansion"
  });

  const payloadState = {
    regionTag: null,
    castlePresence: false,
    meshStatus: "unknown",      // unknown | weak | stable | strong
    meshPressureIndex: 0,       // 0–100 symbolic pressure index
    meshStrength: "unknown",    // unknown | weak | stable | strong
    loadHint: "light",          // light | medium | heavy
    experienceHint: "PulseWorld",
    userProfile: "unknown",     // unknown | new | known
    advantageHint: "neutral",   // neutral | boost | protect | expand
    fallbackBandLevel: 0,       // 0–3 symbolic band level
    coldStartPhase: "unknown"   // unknown | warming | active | cooling
  };

  const signalState = {
    powerLevel: "auto",      // low | medium | high | auto
    intervalProfile: "auto", // auto | frequent | steady | sparse
    maxRangeMeters: 50
  };

  const optInState = {
    requiresUserTap: true,
    requiresConsent: true,
    noSilentJoin: true
  };

  const telemetry = {
    activeMode: null,
    seenDevicesCount: 0,
    optInAttempts: 0,
    successfulJoins: 0,
    lastBroadcast: null,
    totalBroadcasts: 0
  };

  // v20 artery metrics (symbolic only)
  const artery = {
    totalBroadcasts: 0,
    lastMode: null,
    lastPayloadSize: 0,
    lastSignalPower: "auto",
    lastIntervalProfile: "auto",
    loadBucket: "idle",     // idle | low | medium | high | saturated
    pressureBucket: "none"  // none | low | medium | high | overload
  };

  // v20+ global → local hybrid hints
  let lastGlobalHints = globalHints || null;

  // External bridges
  let overmind = null;
  let nodeAdmin = null;

  // Attachments (mesh/user/worldCore/server/router/continuance/omniHosting)
  let meshSnapshotProvider = null;          // () => mesh.getSnapshot()
  let worldCoreSnapshotProvider = null;     // () => worldCore.snapshotWorld()
  let routerSnapshotProvider = null;        // () => router.getSnapshot()
  let serverSnapshotProvider = null;        // () => pulseServerSnapshot
  let continuanceSnapshotProvider = null;   // () => getLastContinuanceState()
  let omniHostingSnapshotProvider = null;   // () => getLastOmniHostingState()
  let userContext = null;                   // user/session context (symbolic only)

  // --------------------------------------------------------------------------
  // BASELINE DEFINITIONS
  // --------------------------------------------------------------------------
  const Modes = Object.freeze({
    baseline: {
      discovery: {
        description: "High-power, visible beacon for new users",
        powerProfile: "high",
        intervalProfile: "frequent"
      },
      presence: {
        description: "Low-power heartbeat for known Pulse devices",
        powerProfile: "low",
        intervalProfile: "steady"
      }
    },
    adaptive: {
      autoSwitchEnabled: true,
      densityAware: true,
      demandAware: true,
      regionTypeAware: true // home | venue | campus | city
    },
    organism: {
      "pulse-reach": {
        description: "Extended reach for sparse regions",
        powerProfile: "high",
        intervalProfile: "steady"
      },
      "pulse-storm": {
        description: "Short, intense bursts for high attention windows",
        powerProfile: "high",
        intervalProfile: "frequent"
      },
      "PULSE-MESH": {
        description: "Mesh-aware, cooperative presence",
        powerProfile: "medium",
        intervalProfile: "steady"
      },
      "pulse-expand": {
        description: "Gradual region expansion under mesh guidance",
        powerProfile: "medium",
        intervalProfile: "auto"
      },
      "pulse-immortal": {
        description: "Continuance/CI-aware immortal presence lane",
        powerProfile: "medium",
        intervalProfile: "steady"
      }
    },
    defaults: {
      initialMode: "discovery"
    }
  });

  const PayloadProfiles = Object.freeze({
    newUserProfile: {
      showOnboardingHint: true,
      showFirstTimeTag: true
    },
    knownUserProfile: {
      showFastPathHint: true,
      showWelcomeBackTag: true
    }
  });

  const SignalLimits = Object.freeze({
    maxPowerProfile: "high",
    minIntervalProfile: "sane" // symbolic; enforced via mapping
  });

  const MultiInstance = Object.freeze({
    canRunMultipleBeaconsPerRegion: true,
    preferSingleBeaconPerCastle: true,
    governedBy: "PulseExpansion.SafetyFrame.multiInstanceGovernor",
    preventBeaconFlood: true,
    mergeOverlappingBeacons: true,
    splitRegionsOnlyWhenNeeded: true,
    onePrimaryBeaconPerRegionPreferred: true
  });

  const Contracts = Object.freeze({
    mustBeUserVisible: true,
    mustBeUserControllable: true,
    mustRespectSafetyFrame: true,
    mustNotAutoConnect: true
  });

  // --------------------------------------------------------------------------
  // LOGGING / ARTERY
  // --------------------------------------------------------------------------
  function log(...args) {
    if (trace) console.log("[PulseBeaconEngine-v20]", ...args);
  }

  function bumpArtery(payload, profile) {
    artery.totalBroadcasts += 1;
    artery.lastMode = activeMode;
    artery.lastPayloadSize = payload ? JSON.stringify(payload).length : 0;
    artery.lastSignalPower = profile.powerProfile;
    artery.lastIntervalProfile = profile.intervalProfile;

    const load = clamp01(artery.totalBroadcasts / 16384);
    const pressure = clamp01(artery.lastPayloadSize / 8192);

    artery.loadBucket =
      load >= 0.9
        ? "saturated"
        : load >= 0.7
        ? "high"
        : load >= 0.4
        ? "medium"
        : load > 0
        ? "low"
        : "idle";

    artery.pressureBucket =
      pressure >= 0.9
        ? "overload"
        : pressure >= 0.7
        ? "high"
        : pressure >= 0.4
        ? "medium"
        : pressure > 0
        ? "low"
        : "none";
  }

  function getArterySnapshot() {
    return Object.freeze({
      ...artery
    });
  }

  function rememberBroadcast(payload, profile) {
    telemetry.activeMode = activeMode;
    telemetry.lastBroadcast = {
      timestamp: Date.now(),
      payload,
      profile
    };
    telemetry.totalBroadcasts += 1;
    bumpArtery(payload, profile);
  }

  function emitToOvermind(eventType, data) {
    if (!overmind || typeof overmind.emit !== "function") return;
    overmind.emit({
      organId: PulseBeaconMeta.organId,
      eventType,
      data,
      snapshot: getStateSnapshot()
    });
  }

  function emitToNodeAdmin(eventType, data) {
    if (!nodeAdmin || typeof nodeAdmin.onBeaconEvent !== "function") return;
    nodeAdmin.onBeaconEvent({
      organId: PulseBeaconMeta.organId,
      eventType,
      data,
      snapshot: getStateSnapshot()
    });
  }

  // --------------------------------------------------------------------------
  // ATTACHMENTS (Mesh / WorldCore / Router / Server / User / Continuance / OmniHosting)
// --------------------------------------------------------------------------
  function attachMeshSnapshotProvider(provider) {
    meshSnapshotProvider = typeof provider === "function" ? provider : null;
    return { ok: true, hasProvider: !!meshSnapshotProvider };
  }

  function attachWorldCoreSnapshotProvider(provider) {
    worldCoreSnapshotProvider = typeof provider === "function" ? provider : null;
    return { ok: true, hasProvider: !!worldCoreSnapshotProvider };
  }

  function attachRouterSnapshotProvider(provider) {
    routerSnapshotProvider = typeof provider === "function" ? provider : null;
    return { ok: true, hasProvider: !!routerSnapshotProvider };
  }

  function attachServerSnapshotProvider(provider) {
    serverSnapshotProvider = typeof provider === "function" ? provider : null;
    return { ok: true, hasProvider: !!serverSnapshotProvider };
  }

  function attachContinuanceSnapshotProvider(provider) {
    continuanceSnapshotProvider = typeof provider === "function" ? provider : null;
    return { ok: true, hasProvider: !!continuanceSnapshotProvider };
  }

  function attachOmniHostingSnapshotProvider(provider) {
    omniHostingSnapshotProvider = typeof provider === "function" ? provider : null;
    return { ok: true, hasProvider: !!omniHostingSnapshotProvider };
  }

  function attachUserContext(ctx) {
    userContext = ctx || null;
    emitToOvermind("user-context-updated", { userContext });
    emitToNodeAdmin("user-context-updated", { userContext });
    return { ok: true, userContext };
  }

  function attachOvermind(o) {
    overmind = o || null;
    return { ok: true, overmindAttached: !!overmind };
  }

  function attachNodeAdmin(n) {
    nodeAdmin = n || null;
    return { ok: true, nodeAdminAttached: !!nodeAdmin };
  }

  function readMeshView() {
    if (!meshSnapshotProvider) return null;
    try {
      const snap = meshSnapshotProvider();
      return snap || null;
    } catch {
      return null;
    }
  }

  function readWorldCoreView() {
    if (!worldCoreSnapshotProvider) return null;
    try {
      const snap = worldCoreSnapshotProvider();
      return snap || null;
    } catch {
      return null;
    }
  }

  function readContinuanceView() {
    if (!continuanceSnapshotProvider) return null;
    try {
      const snap = continuanceSnapshotProvider();
      return snap || null;
    } catch {
      return null;
    }
  }

  function readOmniHostingView() {
    if (!omniHostingSnapshotProvider) return null;
    try {
      const snap = omniHostingSnapshotProvider();
      return snap || null;
    } catch {
      return null;
    }
  }

  // --------------------------------------------------------------------------
  // GLOBAL HINTS (v20 HYBRID)
// --------------------------------------------------------------------------
  function setGlobalHints(hints) {
    lastGlobalHints = hints || null;
    emitToOvermind("global-hints-updated", { hints: lastGlobalHints });
    emitToNodeAdmin("global-hints-updated", { hints: lastGlobalHints });
    return { ok: true, hints: lastGlobalHints };
  }

  function getGlobalHints() {
    return lastGlobalHints;
  }

  // --------------------------------------------------------------------------
  // MODE ENGINE
  // --------------------------------------------------------------------------
  function setMode(nextMode) {
    if (!nextMode || typeof nextMode !== "string") {
      return { ok: false, reason: "invalid-mode" };
    }

    const known =
      Modes.baseline[nextMode] ||
      Modes.organism[nextMode] ||
      (nextMode === "adaptive" ? Modes.adaptive : null);

    if (!known && nextMode !== "adaptive") {
      return { ok: false, reason: "unknown-mode" };
    }

    activeMode = nextMode;
    log("Mode set:", activeMode);
    emitToOvermind("mode-change", { mode: activeMode });
    emitToNodeAdmin("mode-change", { mode: activeMode });
    return { ok: true, mode: activeMode };
  }

  function getMode() {
    return activeMode;
  }

  // --------------------------------------------------------------------------
  // PAYLOAD ENGINE (LOCAL + GLOBAL HINTS + MESH/WORLDCORE)
// --------------------------------------------------------------------------
  function updatePayloadFromContext({
    regionTag = null,
    castlePresence = null,
    meshStatus = null,
    meshPressureIndex = null,
    meshStrength = null,
    loadHint = null,
    userProfile = null,
    advantageHint = null,
    fallbackBandLevel = null,
    coldStartPhase = null
  } = {}) {
    if (regionTag !== null) payloadState.regionTag = regionTag;
    if (castlePresence !== null) payloadState.castlePresence = !!castlePresence;
    if (meshStatus !== null) payloadState.meshStatus = meshStatus;
    if (meshPressureIndex !== null) payloadState.meshPressureIndex = meshPressureIndex;
    if (meshStrength !== null) payloadState.meshStrength = meshStrength;
    if (loadHint !== null) payloadState.loadHint = loadHint;
    if (userProfile !== null) payloadState.userProfile = userProfile;
    if (advantageHint !== null) payloadState.advantageHint = advantageHint;
    if (fallbackBandLevel !== null) payloadState.fallbackBandLevel = fallbackBandLevel;
    if (coldStartPhase !== null) payloadState.coldStartPhase = coldStartPhase;

    // Mesh auto-hydration (symbolic only)
    const meshView = readMeshView();
    if (meshView && meshView.densityHealth?.A_metrics) {
      const dh = meshView.densityHealth.A_metrics;
      if (typeof dh.meshPressureIndex === "number") {
        payloadState.meshPressureIndex = dh.meshPressureIndex;
      }
      if (typeof dh.meshStrength === "string") {
        payloadState.meshStrength = dh.meshStrength;
        payloadState.meshStatus = dh.meshStrength;
      }
    }

    // WorldCore advantage/presence hints (symbolic only)
    const wcView = readWorldCoreView();
    if (wcView?.advantageContext?.presenceField?.presenceTier && !payloadState.regionTag) {
      payloadState.regionTag = wcView.advantageContext.presenceField.presenceTier;
    }

    emitToOvermind("payload-updated", { payloadState });
    emitToNodeAdmin("payload-updated", { payloadState });

    return { ok: true, payloadState: { ...payloadState } };
  }

  // --------------------------------------------------------------------------
  // CONTINUANCE / CI / BINARY-DELTA FIELDS (symbolic overlays)
// --------------------------------------------------------------------------
  function buildContinuanceField() {
    const cont = readContinuanceView();
    const risk = cont?.riskReport || null;

    if (!risk) {
      return Object.freeze({
        globalRisk: 0,
        fallbackBandLevel: 0,
        prewarmHint: { shouldPrewarm: false, reason: "no_risk_report" },
        cacheHint: { keepHot: false, priority: "normal", gpuMode: "cpu" },
        chunkHint: { chunkAggression: 1, gpuMode: "cpu" },
        notes: ["no_continuance_state"]
      });
    }

    return Object.freeze({
      globalRisk: clamp01(risk.globalRisk || 0),
      fallbackBandLevel: risk.fallbackBandLevel ?? 0,
      prewarmHint: risk.prewarmHint || null,
      cacheHint: risk.cacheHint || null,
      chunkHint: risk.chunkHint || null,
      gpuMode: risk.gpuMode || "cpu",
      notes: Array.isArray(risk.notes) ? risk.notes.slice() : []
    });
  }

  function buildCIField() {
    const cont = readContinuanceView();
    const ciSurface = cont?.lastPacket?.ciSurface || null;

    if (!ciSurface) {
      return Object.freeze({
        ciActive: false,
        ciMode: "none",
        ciScore: 0
      });
    }

    return Object.freeze({
      ciActive: true,
      ciMode: ciSurface.mode || "unknown",
      ciScore: clamp01(ciSurface.ciScore ?? 1)
    });
  }

  function buildBinaryDeltaField() {
    const cont = readContinuanceView();
    const deltaPacket = cont?.lastPacket?.ciDeltaPacket || null;
    const delta = deltaPacket?.delta || null;

    if (!delta) {
      return Object.freeze({
        deltaPresent: false,
        addedBits: 0,
        removedBits: 0,
        unchangedBits: 0
      });
    }

    return Object.freeze({
      deltaPresent: true,
      addedBits: delta.addedCount ?? 0,
      removedBits: delta.removedCount ?? 0,
      unchangedBits: delta.unchangedCount ?? 0
    });
  }

  function buildOmniHostingField() {
    const oh = readOmniHostingView();
    const placement = oh?.lastPlacementPlan || null;
    const failover = oh?.lastFailoverPlan || null;

    return Object.freeze({
      placement: placement
        ? {
            selectedHosts: placement.selectedHosts || [],
            eligibleHosts: placement.eligibleHosts || [],
            fallbackBandLevel: placement.fallbackBandLevel ?? 0,
            artery: placement.artery || null
          }
        : null,
      failover: failover
        ? {
            failoverTargets: failover.failoverTargets || [],
            fallbackBandLevel: failover.fallbackBandLevel ?? 0,
            artery: failover.artery || null
          }
        : null
    });
  }

  // --------------------------------------------------------------------------
  // PRESENCE / ADVANTAGE / HINTS / BAND / CHUNK FIELDS
  // --------------------------------------------------------------------------
  function buildPresenceField() {
    const gh = lastGlobalHints || {};
    const presenceCtx = gh.presenceContext || {};
    const advantageCtx = gh.advantageContext || {};
    const fallbackCtx = gh.fallbackContext || {};

    const meshView = readMeshView();
    const wcView = readWorldCoreView();
    const contField = buildContinuanceField();

    const regionPresence =
      payloadState.regionTag ||
      presenceCtx.regionPresence ||
      wcView?.advantageContext?.presenceField?.presenceTier ||
      regionID ||
      "unknown";

    const meshStrength =
      gh.meshStrength ||
      payloadState.meshStrength ||
      payloadState.meshStatus ||
      meshView?.densityHealth?.A_metrics?.meshStrength ||
      "unknown";

    const meshPressureIndex =
      gh.meshPressureIndex ??
      payloadState.meshPressureIndex ??
      meshView?.densityHealth?.A_metrics?.meshPressureIndex ??
      0;

    const fallbackBandLevel =
      fallbackCtx.fallbackBandLevel ??
      gh.fallbackBandLevel ??
      payloadState.fallbackBandLevel ??
      contField.fallbackBandLevel ??
      0;

    return Object.freeze({
      bandPresence: presenceCtx.bandPresence || "unknown",
      routerPresence: presenceCtx.routerPresence || "unknown",
      devicePresence: presenceCtx.devicePresence || "unknown",
      meshPresence: payloadState.meshStatus,
      meshStrength,
      meshPressureIndex,
      castlePresence: payloadState.castlePresence ? "present" : "absent",
      regionPresence,
      advantageBand: advantageCtx.advantageBand || payloadState.advantageHint || "neutral",
      fallbackBandLevel,
      coldStartPhase: payloadState.coldStartPhase
    });
  }

  function buildAdvantageField() {
    const gh = lastGlobalHints || {};
    const advantageCtx = gh.advantageContext || {};
    const wcView = readWorldCoreView();

    return Object.freeze({
      advantageScore: advantageCtx.score ?? null,
      advantageBand: advantageCtx.band || payloadState.advantageHint || "neutral",
      regionAdvantage: gh.regionAdvantage || wcView?.advantageContext?.advantageField || {},
      regionPresence: gh.regionPresence || wcView?.advantageContext?.presenceField || {}
    });
  }

  function buildHintsField() {
    const gh = lastGlobalHints || {};
    const fallbackCtx = gh.fallbackContext || {};
    const contField = buildContinuanceField();

    const fallbackBandLevel =
      fallbackCtx.fallbackBandLevel ??
      gh.fallbackBandLevel ??
      payloadState.fallbackBandLevel ??
      contField.fallbackBandLevel ??
      0;

    const chunkHints = {
      ...(gh.chunkHints || {}),
      // continuance chunkAggression wins if present
      ...(contField.chunkHint ? { chunkAggression: contField.chunkHint.chunkAggression } : {})
    };

    const cacheHints = {
      ...(gh.cacheHints || {}),
      ...(contField.cacheHint || {})
    };

    const prewarmHints = {
      ...(gh.prewarmHints || {}),
      ...(contField.prewarmHint || {})
    };

    return Object.freeze({
      fallbackBandLevel,
      chunkHints,
      cacheHints,
      prewarmHints,
      regionChunkPlan: gh.regionChunkPlan || {}
    });
  }

  function buildBandField() {
    const gh = lastGlobalHints || {};
    const bandSignature = gh.bandSignature || null;
    const binaryField = gh.binaryField || null;
    const waveField = gh.waveField || null;

    const ciField = buildCIField();
    const binaryDeltaField = buildBinaryDeltaField();

    return Object.freeze({
      bandSignature,
      binaryField,
      waveField,
      ciField,
      binaryDeltaField
    });
  }

  function buildChunkPrewarmField() {
    const hintsField = buildHintsField();

    return Object.freeze({
      planVersion: "v20-Beacon-ChunkPrewarm-Immortal-GPU+-CI",
      fallbackBandLevel: hintsField.fallbackBandLevel,
      chunkHints: hintsField.chunkHints,
      cacheHints: hintsField.cacheHints,
      prewarmHints: hintsField.prewarmHints,
      regionChunkPlan: hintsField.regionChunkPlan
    });
  }

  function buildImmortalField() {
    const contField = buildContinuanceField();
    const ciField = buildCIField();
    const binaryDeltaField = buildBinaryDeltaField();
    const omniField = buildOmniHostingField();

    return Object.freeze({
      epoch: PulseBeaconMeta.epoch,
      continuance: contField,
      ci: ciField,
      binaryDelta: binaryDeltaField,
      omniHosting: omniField,
      artery: getArterySnapshot()
    });
  }

  function buildPayload() {
    const base = {
      regionTag: payloadState.regionTag,
      castlePresence: payloadState.castlePresence,
      meshStatus: payloadState.meshStatus,
      meshStrength: payloadState.meshStrength,
      meshPressureIndex: payloadState.meshPressureIndex,
      loadHint: payloadState.loadHint,
      experienceHint: payloadState.experienceHint
    };

    let profileHints = {};
    if (payloadState.userProfile === "new") {
      profileHints = PayloadProfiles.newUserProfile;
    } else if (payloadState.userProfile === "known") {
      profileHints = PayloadProfiles.knownUserProfile;
    }

    const presenceField = buildPresenceField();
    const advantageField = buildAdvantageField();
    const hintsField = buildHintsField();
    const bandField = buildBandField();
    const chunkPrewarmField = buildChunkPrewarmField();
    const immortalField = buildImmortalField();

    return Object.freeze({
      ...base,
      ...profileHints,
      presenceField,
      advantageField,
      hintsField,
      bandField,
      chunkPrewarmField,
      immortalField,
      userContext: userContext || null,
      globalHints: {
        fallbackBandLevel: hintsField.fallbackBandLevel,
        chunkHints: hintsField.chunkHints,
        cacheHints: hintsField.cacheHints,
        prewarmHints: hintsField.prewarmHints,
        regionPresence: advantageField.regionPresence,
        regionAdvantage: advantageField.regionAdvantage,
        regionChunkPlan: hintsField.regionChunkPlan,
        bandSignature: bandField.bandSignature
      }
    });
  }

  // --------------------------------------------------------------------------
  // SIGNAL SHAPING ENGINE (USES GLOBAL HINTS + MESH/WORLDCORE/CONTINUANCE)
// --------------------------------------------------------------------------
  function computeSignalProfile({
    densityHint,
    demandHint,
    regionType,
    meshStatus
  } = {}) {
    // Start from baseline based on mode.
    let powerProfile = "medium";
    let intervalProfile = "steady";

    const baseline = Modes.baseline[activeMode];
    const organism = Modes.organism[activeMode];

    if (baseline) {
      powerProfile = baseline.powerProfile;
      intervalProfile = baseline.intervalProfile;
    } else if (organism) {
      powerProfile = organism.powerProfile;
      intervalProfile = organism.intervalProfile;
    } else if (activeMode === "adaptive") {
      powerProfile = "auto";
      intervalProfile = "auto";
    }

    const gh = lastGlobalHints || {};
    const fallbackCtx = gh.fallbackContext || {};
    const contField = buildContinuanceField();

    const fallbackBandLevel =
      fallbackCtx.fallbackBandLevel ??
      gh.fallbackBandLevel ??
      payloadState.fallbackBandLevel ??
      contField.fallbackBandLevel ??
      0;

    const chunkAggression =
      gh.chunkHints?.chunkAggression ??
      contField.chunkHint?.chunkAggression ??
      0;

    const cachePriority =
      gh.cacheHints?.priority ||
      contField.cacheHint?.priority ||
      "normal";

    const prewarmNeeded =
      gh.prewarmHints?.shouldPrewarm ||
      contField.prewarmHint?.shouldPrewarm ||
      false;

    const meshView = readMeshView();

    const effectiveDensity =
      densityHint ||
      gh.densityHint ||
      (meshView?.densityHealth?.A_metrics?.userCount > 20 ? "high" : "medium");

    const effectiveDemand = demandHint || gh.demandHint || "medium";
    const effectiveRegionType = regionType || gh.regionType || "venue";
    const effectiveMeshStatus =
      meshStatus ||
      gh.meshStatus ||
      payloadState.meshStatus ||
      meshView?.densityHealth?.A_metrics?.meshStrength ||
      "unknown";

    // B-layer: adaptive shaping (local + global).
    if (Modes.adaptive.autoSwitchEnabled) {
      const dense = effectiveDensity === "high";
      const sparse = effectiveDensity === "low";
      const highDemand = effectiveDemand === "high";
      const meshStrong = effectiveMeshStatus === "strong";

      if (dense) {
        powerProfile = "low";
        intervalProfile = "steady";
      } else if (sparse) {
        powerProfile = "high";
        intervalProfile = "steady";
      }

      if (highDemand) {
        intervalProfile = "frequent";
      }

      if (meshStrong && activeMode === "PULSE-MESH") {
        powerProfile = "medium";
        intervalProfile = "steady";
      }

      if (effectiveRegionType === "home") {
        powerProfile = powerProfile === "high" ? "medium" : powerProfile;
      }
    }

    // Continuance-aware shaping.
    if (contField.globalRisk >= 0.6) {
      // high risk → keep presence strong but not insane
      if (powerProfile === "low") powerProfile = "medium";
      if (intervalProfile === "sparse") intervalProfile = "steady";
    }

    // Global hints influence:
    if (fallbackBandLevel >= 2) {
      powerProfile = powerProfile === "high" ? "medium" : powerProfile;
      intervalProfile = intervalProfile === "frequent" ? "steady" : intervalProfile;
    }

    if (chunkAggression > 0.5) {
      intervalProfile = "frequent";
    }

    if (cachePriority === "critical") {
      powerProfile = "high";
      intervalProfile = "frequent";
    } else if (cachePriority === "high") {
      intervalProfile = "steady";
    }

    if (prewarmNeeded && intervalProfile === "sparse") {
      intervalProfile = "steady";
    }

    // Enforce limits.
    if (powerProfile === "very-high") {
      powerProfile = SignalLimits.maxPowerProfile;
    }

    signalState.powerLevel = powerProfile;
    signalState.intervalProfile = intervalProfile;

    return Object.freeze({
      powerProfile,
      intervalProfile,
      maxRangeMeters: signalState.maxRangeMeters
    });
  }

  // --------------------------------------------------------------------------
  // SAFETY CHECK
  // --------------------------------------------------------------------------
  function checkSafety(payload, signalProfile) {
    if (!Contracts.mustRespectSafetyFrame) {
      return { allowed: true };
    }

    if (typeof safetyPolicy === "function") {
      return safetyPolicy({
        mode: activeMode,
        payload,
        signalProfile,
        identity,
        contracts: Contracts
      });
    }

    return { allowed: true };
  }

  // --------------------------------------------------------------------------
  // BROADCAST ENGINE (REAL BLUETOOTH EMISSION VIA INTERNAL EMITTER)
// --------------------------------------------------------------------------
  function broadcastOnce({
    densityHint,
    demandHint,
    regionType,
    meshStatus
  } = {}) {
    tick++;

    const payload = buildPayload();
    const signalProfile = computeSignalProfile({
      densityHint,
      demandHint,
      regionType,
      meshStatus
    });

    const safety = checkSafety(payload, signalProfile);
    if (!safety.allowed) {
      const reason = safety.reason || "safety-denied";
      emitToOvermind("broadcast-blocked", { reason, payload, signalProfile });
      emitToNodeAdmin("broadcast-blocked", { reason, payload, signalProfile });
      log("Broadcast blocked:", { reason, payload, signalProfile });
      return { ok: false, reason: "safety-denied" };
    }

    const profile = {
      mode: activeMode,
      powerProfile: signalProfile.powerProfile,
      intervalProfile: signalProfile.intervalProfile,
      maxRangeMeters: signalProfile.maxRangeMeters
    };

    rememberBroadcast(payload, profile);
    emitToOvermind("broadcast", { payload, profile });
    emitToNodeAdmin("broadcast", { payload, profile });

    nativeBluetoothBroadcast(payload, profile);

    log("Broadcast:", { payload, profile });
    return { ok: true, payload, profile };
  }

  // --------------------------------------------------------------------------
  // DIRECTIVE ENGINE (OVERMIND + NODEADMIN)
// --------------------------------------------------------------------------
  function applyDirective(directive) {
    if (!directive || typeof directive !== "object") {
      return { ok: false, reason: "invalid-directive" };
    }

    const {
      mode,
      payloadUpdate,
      broadcastNow,
      contextHints,
      globalHints: gh
    } = directive;

    let modeChanged = false;
    let payloadChanged = false;
    let hintsChanged = false;
    let broadcastResult = null;

    if (mode) {
      const res = setMode(mode);
      modeChanged = !!res.ok;
    }

    if (payloadUpdate) {
      const res = updatePayloadFromContext(payloadUpdate);
      payloadChanged = !!res.ok;
    }

    if (gh) {
      const res = setGlobalHints(gh);
      hintsChanged = !!res.ok;
    }

    if (broadcastNow) {
      broadcastResult = broadcastOnce(contextHints || {});
    }

    const result = {
      ok: true,
      modeChanged,
      payloadChanged,
      hintsChanged,
      broadcastResult
    };

    emitToOvermind("directive-applied", { directive, result });
    emitToNodeAdmin("directive-applied", { directive, result });

    return result;
  }

  // --------------------------------------------------------------------------
  // SNAPSHOTS
  // --------------------------------------------------------------------------
  function getStateSnapshot() {
    return Object.freeze({
      meta: PulseBeaconMeta,
      identity,
      payloadState: { ...payloadState },
      signalState: { ...signalState },
      optInState: { ...optInState },
      telemetry: { ...telemetry },
      globalHints: lastGlobalHints || null,
      artery: getArterySnapshot(),
      mode: activeMode,
      multiInstance: MultiInstance
    });
  }

  function getTelemetry() {
    return Object.freeze({
      ...telemetry,
      artery: getArterySnapshot()
    });
  }

  // --------------------------------------------------------------------------
  // PUBLIC API SURFACE
  // --------------------------------------------------------------------------
  return Object.freeze({
    meta: PulseBeaconMeta,
    identity,

    // snapshots
    getStateSnapshot,
    getTelemetry,
    getGlobalHints,
    setGlobalHints,

    // attachments
    attachMeshSnapshotProvider,
    attachWorldCoreSnapshotProvider,
    attachRouterSnapshotProvider,
    attachServerSnapshotProvider,
    attachContinuanceSnapshotProvider,
    attachOmniHostingSnapshotProvider,
    attachUserContext,
    attachOvermind,
    attachNodeAdmin,

    // mode
    setMode,
    getMode,

    // payload + fields
    updatePayloadFromContext,
    buildPresenceField,
    buildAdvantageField,
    buildHintsField,
    buildBandField,
    buildChunkPrewarmField,
    buildImmortalField,

    // continuance/CI/binary/omni fields (exposed if needed)
    buildContinuanceField,
    buildCIField,
    buildBinaryDeltaField,
    buildOmniHostingField,

    // artery
    getArterySnapshot,

    // broadcast + directives
    broadcastOnce,
    applyDirective
  });
}
