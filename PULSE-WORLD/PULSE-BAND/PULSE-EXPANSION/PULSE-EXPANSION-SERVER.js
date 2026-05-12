// ============================================================================
//  PULSE OS v24‑IMMORTAL‑ORGANISM — PULSE SERVER (EXEC ENGINE / ADVANTAGE HUB)
//  PulseServer-v24.js
//
//  ROLE:
//    - Deterministic compute / exec engine for the organism.
//    - Centralizes compute advantages (batching, caching, reuse) WITHOUT
//      reinterpreting organ math.
//    - Binds: AdrenalSystem + Scheduler + Runtime v2 (+ Router/Overmind via Scheduler).
//    - Single entrypoint for “server-as-compute” and “server-as-earn/flow”.
//    - WorldCore-aware, user-aware, mesh-aware, brain-aware, PulseNet-bridge-aware.
//    - DualBand-aware + binary send aware (symbolic + binary lanes).
//    - NO direct network fetch: all network is via higher PulseNet bridge / expansion.
//    - v16+ / v24: Castle-aware, Expansion-aware, can act as Castle-General fallback
//      when Castle is absent or degraded (server-as-central-castle).
// ============================================================================
import {
  OrganismIdentity,
  buildPulseOrganismMap as PulseOrganismMap,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PULSE-WORLD-MAP.js";
const Identity = OrganismIdentity(import.meta.url);

// 2 — EXPORT GENOME METADATA
export const PulseServerMeta = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
// export const PULSE_EARN_IMMUNE_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;
// ============================================================================
//  IMPORTS — Organs it feeds and orchestrates
// ============================================================================

import { PulseProofBridgeLogger as logger } from "../../PULSE-UI/_BACKEND/PULSE-WORLD-BRIDGE.js";

// v24 Expansion / Castle
import {
  PulseExpansionMeta,
  createPulseExpansion,
  summarizeCastlePresence
} from "./PULSE-EXPANSION-INTERNET.js";

import {
  PulseCastleMeta,
  computeCastlePresence
} from "./PulseExpansionCastle-v24.js";

// Router v24
import {
  PulseRouterMeta,
  createPulseRouter
} from "./PulseExpansionRouter-v24.js";

// User lanes / WorldCore
import {
  getPulseUserContext,
  createPulseWorldCore
} from "./PulseExpansionUser-v24.js";

// Adrenal (compute starter / circulation governor)
import {
  runInstanceOrchestrator as runAdrenalInstanceOrchestrator,
  PulseProxyAdrenalSystemMeta
} from "../PULSE-PROXY/PulseProxyAdrenalSystem-v20.js";

// PulseNet bridge (symbolic adapter to PULSE-NET)
import { createPulseNetBridge } from "../PULSE-X/PULSE-WORLD.js";

// Touch / presence
import { getPulseTouchContext } from "../../PULSE-UI/PULSE-WORLD-TOUCH.js";

// Runtime / scheduler / overmind
import {
  getPulseOvermindContext,
  createOvermindPrime
} from "../PULSE-X/PULSE-WORLD-ALDWYN.js";

// (Optional) Earn / treasury integration hook (symbolic only)
import {
  getEarnContext,
  evolveEarn
} from "../PULSE-EARN/PulseEarn-v24.js";

// Scheduler (Router + Overmind + Runtime v2 macro pipeline)
import {
  createPulseScheduler,
  PulseSchedulerMeta,
  getPulseSchedulerContext
} from "../PULSE-X/PulseWorldScheduler-v20.js";

// Runtime v2 (multi-organism execution + binary frames)
import {
  PulseRuntimeV2,
  getPulseRuntimeContext
} from "../PULSE-X/PulseWorldRuntime-v20.js";

const {
  runPulseTickV2,
  getRuntimeStateV2,
  CoreMemory: RuntimeCoreMemory
} = PulseRuntimeV2;

// DualBand / Binary field (optional, advantage-only)
import { createDualBandOrganism as PulseBinaryOrganismBoot } from "../PULSE-AI/aiDualBand-v24.js";
import { createBinarySend as PulseSendBin } from "../PULSE-SEND/PulseSendBinary-v24.js";

// Proxy context (IMMORTAL ORGANISM)
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
//  TYPES
// ============================================================================
export class PulseServerJobResult {
  constructor({
    serverMeta,
    schedulerPipeline,
    runtimeStateV2,
    adrenalMeta,
    adrenalTickAccepted,
    cacheHit = false,
    castleFallback,
    meta = {}
  }) {
    this.serverMeta = serverMeta;
    this.schedulerPipeline = schedulerPipeline;
    this.runtimeStateV2 = runtimeStateV2;
    this.adrenalMeta = adrenalMeta;
    this.adrenalTickAccepted = adrenalTickAccepted;
    this.cacheHit = cacheHit;
    this.castleFallback = castleFallback || null;
    this.meta = meta;
  }
}

// ============================================================================
//  INTERNAL ADVANTAGE STATE (Deterministic, in‑memory, backend‑only)
// ============================================================================
const jobResultCache = new Map();
const hotInstanceBatches = new Map();

function stableStringify(obj) {
  if (obj == null || typeof obj !== "object") return JSON.stringify(obj);
  const keys = Object.keys(obj).sort();
  const out = {};
  for (const k of keys) out[k] = obj[k];
  return JSON.stringify(out);
}

function buildBatchKey(instances, currentStatesById, globalContinuancePolicy) {
  return stableStringify({
    instances,
    currentStatesById,
    globalContinuancePolicy
  });
}

// ============================================================================
//  PROXY-AWARE TICK GOVERNOR — symbolic-only, no runtime mutation
// ============================================================================
function computeProxyAwareMaxTicks(baseMaxTicks) {
  let maxTicks = baseMaxTicks;

  const mode = getProxyMode();
  const pressure = getProxyPressure();
  const boost = getProxyBoost();
  const fallback = getProxyFallback();

  if (fallback || mode === "fallback") {
    maxTicks = Math.max(1, maxTicks - 2);
  }

  if (pressure > 0.7) {
    maxTicks = Math.max(1, maxTicks - 1);
  }

  if (boost > 0.5 && !fallback && mode !== "fallback") {
    maxTicks += 1;
  }

  return maxTicks;
}

// ============================================================================
//  CASTLE / EXPANSION / PULSENET BRIDGE HELPERS
// ============================================================================

function buildServerCastleId({ serverId, regionId }) {
  return `SERVER_GENERAL::${regionId || "unknown-region"}::${serverId || "anon"}`;
}

function isCastleHealthy(presenceField) {
  if (!presenceField) return false;
  const tier = presenceField.tier || presenceField.presenceTier || "normal";
  const score =
    presenceField.presenceScore ??
    presenceField.composite ??
    0;
  const stress = presenceField.stressIndex ?? 0;

  if (getProxyFallback()) return false;
  if (tier === "low") return false;
  if (score < 0.3) return false;
  if (stress > 0.9) return false;
  return true;
}

function emitBridgeSafe(bridge, method, payload) {
  if (!bridge || typeof bridge[method] !== "function") return { ok: false };
  try {
    return bridge[method](payload) || { ok: true };
  } catch (err) {
    logger?.log?.("server", "pulsenet_bridge_error", {
      method,
      error: String(err)
    });
    return { ok: false, error: String(err) };
  }
}

// ============================================================================
//  CORE SERVER ENGINE — worldCore/user/mesh/PulseNet-bridge/dualBand aware
// ============================================================================

export class PulseServerPresenceExec {
  constructor(config = {}) {
    this.config = {
      enableAdrenal: true,
      enableScheduler: true,
      enableRuntimeV2DirectTick: true,
      enableJobCache: true,
      enableBatchReuse: true,
      defaultGlobalPolicy: {},
      defaultMaxTicks: 3,
      defaultStopOnWorldLens: ["unsafe"],

      // Integration points
      worldCore: null,
      mesh: null,
      userContext: null,
      pulseNetBridge: null,
      brainNetworkMode: true,

      // Castle / Expansion
      regionId: null,
      hostName: null,
      serverId: null,
      enableCastleFallback: true,

      // DualBand / binary
      dualBandEngine: null,
      binarySend: null,

      ...config
    };

    this.worldCore = this.config.worldCore || null;
    this.mesh = this.config.mesh || null;
    this.userContext = this.config.userContext || null;

    this.regionId = this.config.regionId || null;
    this.hostName = this.config.hostName || null;
    this.serverId = this.config.serverId || null;

    this._serverEvolution = createPulseNodeEvolutionV16({
      nodeType: "server",
      trace: false
    });

    // PulseNet bridge (symbolic)
    this.pulseNetBridge =
      this.config.pulseNetBridge ||
      (typeof createPulseNetBridge === "function"
        ? createPulseNetBridge()
        : null);

    // DualBand / binary
    this.dualBandEngine =
      this.config.dualBandEngine ||
      (typeof PulseBinaryOrganismBoot === "function"
        ? PulseBinaryOrganismBoot({ mode: "presence-server" })
        : null);

    this.binarySend =
      this.config.binarySend ||
      (typeof PulseSendBin === "function"
        ? PulseSendBin({ source: "PulseServer-v24" })
        : null);

    // Scheduler
    this.scheduler = createPulseScheduler({
      defaultGlobalPolicy: this.config.defaultGlobalPolicy,
      defaultMaxTicks: this.config.defaultMaxTicks,
      defaultStopOnWorldLens: this.config.defaultStopOnWorldLens,
      ...this.config.schedulerConfig
    });

    // Expansion (v24) — server-aware, castle-aware, PulseNet-bridge-aware
    this.expansion =
      typeof createPulseExpansion === "function"
        ? createPulseExpansion({})
        : null;

    if (
      this.expansion &&
      this.pulseNetBridge &&
      typeof this.expansion.attachPulseNetBridge === "function"
    ) {
      try {
        this.expansion.attachPulseNetBridge(this.pulseNetBridge);
      } catch (err) {
        logger?.log?.("server", "expansion_attach_pulsenet_error", {
          error: String(err)
        });
      }
    }

    // WorldCore runtime attach
    if (this.worldCore && typeof this.worldCore.attachRuntime === "function") {
      try {
        this.worldCore.attachRuntime(PulseRuntimeV2);
      } catch (err) {
        logger?.log?.("server", "worldcore_attach_runtime_error", {
          error: String(err)
        });
      }
    }

    // Mesh user attach
    if (this.mesh && typeof this.mesh.attachUser === "function") {
      try {
        this.mesh.attachUser(this.userContext || { source: "PulseServer" });
      } catch (err) {
        logger?.log?.("server", "mesh_attach_user_error", {
          error: String(err)
        });
      }
    }
  }

  // --------------------------------------------------------------------------
  // Integration hooks
  // --------------------------------------------------------------------------
  attachWorldCore(worldCore) {
    this.worldCore = worldCore;
    if (worldCore && typeof worldCore.attachRuntime === "function") {
      try {
        worldCore.attachRuntime(PulseRuntimeV2);
      } catch (err) {
        logger?.log?.("server", "worldcore_attach_runtime_error", {
          error: String(err)
        });
      }
    }
    return { ok: true };
  }

  attachMesh(mesh) {
    this.mesh = mesh;
    if (mesh && typeof mesh.attachUser === "function") {
      try {
        mesh.attachUser(this.userContext || { source: "PulseServer" });
      } catch (err) {
        logger?.log?.("server", "mesh_attach_user_error", {
          error: String(err)
        });
      }
    }
    return { ok: true };
  }

  attachUserContext(userContext) {
    this.userContext = userContext;
    if (this.mesh && typeof this.mesh.attachUser === "function") {
      try {
        this.mesh.attachUser(userContext);
      } catch (err) {
        logger?.log?.("server", "mesh_attach_user_error", {
          error: String(err)
        });
      }
    }
    return { ok: true };
  }

  attachPulseNetBridge(pulseNetBridge) {
    this.pulseNetBridge = pulseNetBridge;
    if (pulseNetBridge && typeof pulseNetBridge.attachServer === "function") {
      try {
        pulseNetBridge.attachServer({ serverMeta: PulseServerMeta });
      } catch (err) {
        logger?.log?.("server", "pulsenet_attach_server_error", {
          error: String(err)
        });
      }
    }
    if (
      this.expansion &&
      this.pulseNetBridge &&
      typeof this.expansion.attachPulseNetBridge === "function"
    ) {
      try {
        this.expansion.attachPulseNetBridge(this.pulseNetBridge);
      } catch (err) {
        logger?.log?.("server", "expansion_attach_pulsenet_error", {
          error: String(err)
        });
      }
    }
    return { ok: true };
  }

  attachDualBandEngine(dualBandEngine) {
    this.dualBandEngine = dualBandEngine || null;
    return { ok: true };
  }

  attachBinarySend(binarySend) {
    this.binarySend = binarySend || null;
    return { ok: true };
  }

  _evolveServerPacket(packet, extraCtx = {}) {
    if (!this._serverEvolution) return packet;

    const context = {
      // SERVER CONTEXT
      regionId: this.regionId,
      hostName: this.hostName,
      serverId: this.serverId,

      // USER / WORLDCORE / MESH
      userContext: this.userContext,
      worldCore: this.worldCore,
      mesh: this.mesh,

      // RUNTIME / SCHEDULER / OVERMIND / EARN
      runtime: getPulseRuntimeContext?.(),
      scheduler: getPulseSchedulerContext?.(),
      overmind: getPulseOvermindContext?.(),
      earn: getEarnContext?.(),

      // PROXY CONTEXT
      proxyMode: getProxyMode?.(),
      proxyPressure: getProxyPressure?.(),
      proxyBoost: getProxyBoost?.(),
      proxyFallback: getProxyFallback?.(),
      proxyLineage: getProxyLineage?.(),
      proxyContext: getProxyContext?.(),

      // TOUCH
      touch: getPulseTouchContext?.(),

      // METAS
      serverMeta: PulseServerMeta,
      routerMeta: PulseRouterMeta,
      castleMeta: PulseCastleMeta,
      expansionMeta: PulseExpansionMeta,
      schedulerMeta: PulseSchedulerMeta,
      adrenalMeta: PulseProxyAdrenalSystemMeta,

      ...extraCtx
    };

    return this._serverEvolution.evolveNodePulse({
      nodeType: "server",
      pulse: packet,
      context
    });
  }

  // --------------------------------------------------------------------------
  // 0) Memory prewarm + hot batch reuse
  // --------------------------------------------------------------------------
  prewarmAndMaybeReuseBatch({
    instances,
    currentStatesById,
    globalContinuancePolicy
  }) {
    RuntimeCoreMemory.prewarm?.();

    if (!this.config.enableBatchReuse) {
      return { instances, currentStatesById, reused: false };
    }

    const batchKey = buildBatchKey(
      instances,
      currentStatesById,
      globalContinuancePolicy
    );

    if (hotInstanceBatches.has(batchKey)) {
      const hot = hotInstanceBatches.get(batchKey);
      return {
        instances: hot.instances,
        currentStatesById: hot.currentStatesById,
        reused: true
      };
    }

    hotInstanceBatches.set(batchKey, {
      instances,
      currentStatesById
    });

    return { instances, currentStatesById, reused: false };
  }

  // --------------------------------------------------------------------------
  // 1) Optional Adrenal tick — compute starter / circulation governor
  // --------------------------------------------------------------------------
  async runAdrenalIfEnabled(adrenalPulse) {
    if (!this.config.enableAdrenal) {
      return {
        adrenalTickAccepted: false,
        adrenalMeta: {
          meta: PulseProxyAdrenalSystemMeta,
          note: "Adrenal disabled at PulseServer config."
        }
      };
    }

    const pulsePayload = {
      ...(adrenalPulse || {}),
      userContext: this.userContext || null
    };

    await runAdrenalInstanceOrchestrator(pulsePayload);

    return {
      adrenalTickAccepted: true,
      adrenalMeta: {
        meta: PulseProxyAdrenalSystemMeta,
        pulse: pulsePayload
      }
    };
  }

  // --------------------------------------------------------------------------
  // 2) Scheduler pipeline — Router + Overmind + Runtime (v1-style)
  // --------------------------------------------------------------------------
  async runSchedulerPipeline({
    instances = [],
    currentStatesById = {},
    globalContinuancePolicy = null,
    userRequest = null,
    dualBand = null,
    maxTicks = null,
    stopOnWorldLens = null
  }) {
    if (!this.config.enableScheduler) {
      return {
        schedulerPipeline: null,
        schedulerMeta: {
          meta: PulseSchedulerMeta,
          note: "Scheduler disabled at PulseServer config."
        }
      };
    }

    const advantageContext =
      this.worldCore &&
      typeof this.worldCore.buildAdvantageContext === "function"
        ? this.worldCore.buildAdvantageContext()
        : null;

    const dualBandSnapshot =
      dualBand ||
      (this.dualBandEngine &&
      typeof this.dualBandEngine.getSnapshot === "function"
        ? this.dualBandEngine.getSnapshot()
        : null);

    const baseMaxTicks = maxTicks ?? this.config.defaultMaxTicks;
    const proxyAwareMaxTicks = computeProxyAwareMaxTicks(baseMaxTicks);

    const pipelineResult = await this.scheduler.runPipeline({
      instances,
      currentStatesById,
      globalContinuancePolicy:
        globalContinuancePolicy ?? this.config.defaultGlobalPolicy,
      userRequest,
      dualBand: dualBandSnapshot,
      maxTicks: proxyAwareMaxTicks,
      stopOnWorldLens: stopOnWorldLens ?? this.config.defaultStopOnWorldLens,
      advantageContext,
      userContext: this.userContext || null
    });

    return {
      schedulerPipeline: pipelineResult,
      schedulerMeta: {
        ...PulseSchedulerMeta,
        proxyMode: getProxyMode(),
        proxyPressure: getProxyPressure()
      }
    };
  }

  // --------------------------------------------------------------------------
  // 3) Optional direct Runtime v2 tick — extra compute pass in same run
  // --------------------------------------------------------------------------
  runRuntimeV2IfEnabled({
    instanceContexts,
    currentStatesById,
    globalContinuancePolicy = {}
  }) {
    if (!this.config.enableRuntimeV2DirectTick) {
      return null;
    }

    return runPulseTickV2({
      instanceContexts,
      currentStatesById,
      globalContinuancePolicy
    });
  }

  // --------------------------------------------------------------------------
  // 4) Job-level cache — reuse full compute result when safe
  // --------------------------------------------------------------------------
  maybeGetCachedJob(cacheKey) {
    if (!this.config.enableJobCache || !cacheKey) return null;
    return jobResultCache.get(cacheKey) || null;
  }

  maybeStoreCachedJob(cacheKey, result) {
    if (!this.config.enableJobCache || !cacheKey) return;
    jobResultCache.set(cacheKey, result);
  }

  // --------------------------------------------------------------------------
  // 5) Brain-network-shaped helper — compute miner for BrainIntent
  // --------------------------------------------------------------------------
  async runBrainNetworkJob({
    brainIntent,
    instances = [],
    currentStatesById = {},
    globalContinuancePolicy = null,
    dualBand = null,
    maxTicks = null,
    stopOnWorldLens = null,
    adrenalPulse = null,
    cacheKey = null
  } = {}) {
    if (!this.config.brainNetworkMode || !brainIntent) {
      return this.runServerJob({
        instances,
        currentStatesById,
        globalContinuancePolicy,
        dualBand,
        maxTicks,
        stopOnWorldLens,
        adrenalPulse,
        cacheKey
      });
    }

    const userRequest = {
      source: "BrainIntent",
      intent: brainIntent.intent,
      payload: brainIntent.payload || null,
      band: brainIntent.band || "symbolic",
      userContext: this.userContext || null
    };

    return this.runServerJob({
      instances,
      currentStatesById,
      globalContinuancePolicy,
      userRequest,
      dualBand,
      maxTicks,
      stopOnWorldLens,
      adrenalPulse,
      cacheKey
    });
  }

  // --------------------------------------------------------------------------
  // 6) Castle-General fallback — server becomes central castle if needed
  // --------------------------------------------------------------------------
  evaluateCastleFallbackAndSignal({
    runtimeStateV2,
    schedulerPipeline
  }) {
    if (!this.config.enableCastleFallback) {
      const base = {
        takeover: false,
        reason: "castle_fallback_disabled"
      };
      return this._evolveServerPacket
        ? this._evolveServerPacket(base, { mode: "castle_fallback_disabled" })
        : base;
    }

    const regionId = this.regionId || "unknown-region";
    const serverId = this.serverId || "server-unknown";
    const hostName = this.hostName || "host-unknown";

    let takeover = false;
    let reason = "castle_healthy_or_unknown";
    let castlePresenceField = null;
    let meshSnapshot = null;
    let regionInfo = null;

    try {
      const snapshot = summarizeCastlePresence();
      const byRegion = snapshot.byRegion || {};
      regionInfo = byRegion[regionId];

      if (!regionInfo || regionInfo.castles.length === 0) {
        takeover = true;
        reason = "no_castles_in_region";
      } else {
        let anyHealthy = false;
        for (const c of regionInfo.castles) {
          const presenceField = c.presenceField || computeCastlePresence(c);
          if (isCastleHealthy(presenceField)) {
            anyHealthy = true;
            break;
          }
        }
        if (!anyHealthy) {
          takeover = true;
          reason = "all_castles_unhealthy_or_low";
        }
      }

      meshSnapshot = regionInfo || null;
      castlePresenceField =
        regionInfo && regionInfo.castles[0]
          ? regionInfo.castles[0].presenceField || null
          : null;
    } catch (err) {
      takeover = true;
      reason = "castle_snapshot_error";
      logger?.log?.("server", "castle_snapshot_error", {
        error: String(err)
      });
    }

    const serverCastleId = buildServerCastleId({ serverId, regionId });

    const serverCastlePresence = {
      castleId: serverCastleId,
      regionId,
      hostName,
      presenceField: {
        tier: "normal",
        presenceScore: 0.6,
        loadIndex: 0.4,
        stressIndex: 0.3,
        proxyMode: getProxyMode(),
        proxyPressure: getProxyPressure(),
        proxyBoost: getProxyBoost(),
        proxyFallback: getProxyFallback(),
        proxyLineage: getProxyLineage()
      },
      runtimeHint: {
        runtimeStateV2: !!runtimeStateV2,
        schedulerTicks: schedulerPipeline?.ticks?.length ?? 0
      },
      regionHint: {
        castleCount: regionInfo?.castles?.length ?? 0,
        serversPerCastle:
          regionInfo && regionInfo.castles?.length > 0
            ? (regionInfo.totalServers || 0) / regionInfo.castles.length
            : 0
      }
    };

    const baseResult = {
      takeover,
      reason,
      serverCastleId,
      serverCastlePresence
    };

    const evolvedResult = this._evolveServerPacket
      ? this._evolveServerPacket(baseResult, {
          mode: "castle_fallback",
          regionInfo,
          castlePresenceField,
          meshSnapshot
        })
      : baseResult;

    if (takeover && this.pulseNetBridge) {
      const bridgePayload = {
        mode: "server_general_takeover",
        serverId,
        regionId,
        hostName,
        serverCastleId,
        serverCastlePresence:
          evolvedResult.serverCastlePresence || serverCastlePresence,
        previousCastlePresence: castlePresenceField,
        meshSnapshot,
        proxy: {
          mode: getProxyMode(),
          pressure: getProxyPressure(),
          boost: getProxyBoost(),
          fallback: getProxyFallback(),
          lineage: getProxyLineage()
        }
      };

      emitBridgeSafe(
        this.pulseNetBridge,
        "routeCastle",
        this._evolveServerPacket
          ? this._evolveServerPacket(bridgePayload, {
              mode: "bridge_castle_takeover"
            })
          : bridgePayload
      );

      if (this.expansion && typeof this.expansion.buildExpansionPlan === "function") {
        try {
          this.expansion.buildExpansionPlan({
            globalLoadIndex: 0.5,
            regionSignals: {
              [regionId]: {
                avgLoadIndex: 0.5,
                userDensityHint: 0,
                stressHint: 0.4
              }
            }
          });
        } catch (err) {
          logger?.log?.("server", "expansion_plan_on_takeover_error", {
            error: String(err)
          });
        }
      }
    }

    return evolvedResult;
  }

  // --------------------------------------------------------------------------
  // MAIN ENTRYPOINT — PulseServer job
  // --------------------------------------------------------------------------
  async runServerJob({
    instances = [],
    currentStatesById = {},
    globalContinuancePolicy = null,
    userRequest = null,
    dualBand = null,
    maxTicks = null,
    stopOnWorldLens = null,
    adrenalPulse = null,
    cacheKey = null
  } = {}) {
    const notes = [];

    notes.push("PulseServer-v24-Immortal-ORGANISM-EXEC: starting job.");

    const cached = this.maybeGetCachedJob(cacheKey);
    if (cached) {
      notes.push("Job cache hit: returning cached PulseServerJobResult.");
      const cachedWithNotes = new PulseServerJobResult({
        ...cached,
        cacheHit: true,
        meta: {
          ...(cached.meta || {}),
          notes: [...(cached.meta?.notes || []), ...notes]
        }
      });

      const evolvedCached = this._evolveServerPacket
        ? this._evolveServerPacket(cachedWithNotes, {
            mode: "server_job_cached"
          })
        : cachedWithNotes;

      return evolvedCached;
    }

    const {
      instances: effectiveInstances,
      currentStatesById: effectiveStates,
      reused: batchReused
    } = this.prewarmAndMaybeReuseBatch({
      instances,
      currentStatesById,
      globalContinuancePolicy
    });

    notes.push(
      batchReused
        ? "Hot batch reuse: using prewarmed instance batch."
        : "No hot batch reuse: new batch registered."
    );

    // 1) Adrenal tick (optional)
    const adrenalResult = await this.runAdrenalIfEnabled(adrenalPulse);
    if (adrenalResult.adrenalTickAccepted) {
      notes.push("Adrenal tick accepted and executed.");
    } else {
      notes.push("Adrenal tick skipped (disabled).");
    }

    // 2) Scheduler pipeline
    const schedulerResult = await this.runSchedulerPipeline({
      instances: effectiveInstances,
      currentStatesById: effectiveStates,
      globalContinuancePolicy,
      userRequest,
      dualBand,
      maxTicks,
      stopOnWorldLens
    });

    const schedulerPipeline = schedulerResult.schedulerPipeline;
    notes.push(
      schedulerPipeline
        ? "Scheduler pipeline executed."
        : "Scheduler pipeline skipped (disabled)."
    );

    // 3) Optional direct Runtime v2 tick
    let runtimeStateV2 = null;
    if (this.config.enableRuntimeV2DirectTick && schedulerPipeline) {
      const instanceContexts =
        schedulerPipeline.instanceContexts || effectiveInstances;

      runtimeStateV2 = this.runRuntimeV2IfEnabled({
        instanceContexts,
        currentStatesById: effectiveStates,
        globalContinuancePolicy:
          globalContinuancePolicy ?? this.config.defaultGlobalPolicy
      });

      if (runtimeStateV2) {
        notes.push("Runtime v2 direct tick executed.");
      } else {
        notes.push("Runtime v2 direct tick skipped (disabled).");
      }
    } else {
      notes.push("Runtime v2 direct tick not executed (no scheduler pipeline or disabled).");
    }

    // 4) Castle fallback evaluation
    const castleFallback = this.evaluateCastleFallbackAndSignal({
      runtimeStateV2,
      schedulerPipeline
    });

    if (castleFallback.takeover) {
      notes.push(
        `Castle-General fallback active: server acting as central castle (${castleFallback.reason}).`
      );
    } else {
      notes.push(
        `Castle-General fallback not active (${castleFallback.reason}).`
      );
    }

    // 5) Build job result
    const baseResult = new PulseServerJobResult({
      serverMeta: PulseServerMeta,
      schedulerPipeline,
      runtimeStateV2,
      adrenalMeta: adrenalResult.adrenalMeta,
      adrenalTickAccepted: adrenalResult.adrenalTickAccepted,
      cacheHit: false,
      castleFallback,
      meta: {
        notes
      }
    });

    const evolvedResult = this._evolveServerPacket
      ? this._evolveServerPacket(baseResult, {
          mode: "server_job_completed"
        })
      : baseResult;

    // 6) Cache store (if enabled)
    this.maybeStoreCachedJob(cacheKey, evolvedResult);

    return evolvedResult;
  }

  // --------------------------------------------------------------------------
  // Snapshot — introspection surface
  // --------------------------------------------------------------------------
  getSnapshot() {
    const runtimeState = getRuntimeStateV2?.() || null;

    const base = {
      organId: PulseServerMeta.identity,
      meta: PulseServerMeta,
      config: this.config,
      regionId: this.regionId,
      hostName: this.hostName,
      serverId: this.serverId,
      proxy: {
        mode: getProxyMode(),
        pressure: getProxyPressure(),
        boost: getProxyBoost(),
        fallback: getProxyFallback(),
        lineage: getProxyLineage()
      },
      runtimeStateV2: runtimeState,
      worldCoreAttached: !!this.worldCore,
      meshAttached: !!this.mesh,
      pulseNetBridgeAttached: !!this.pulseNetBridge,
      dualBandAttached: !!this.dualBandEngine,
      binarySendAttached: !!this.binarySend
    };

    return this._evolveServerPacket
      ? this._evolveServerPacket(base, { mode: "server_snapshot" })
      : base;
  }
}

// ============================================================================
// FACTORY — createPulseServer v24
// ============================================================================

export function createPulseServer(config = {}) {
  const core = new PulseServerPresenceExec(config);

  return Object.freeze({
    meta: PulseServerMeta,
    core,

    // integration
    attachWorldCore(worldCore) {
      return core.attachWorldCore(worldCore);
    },
    attachMesh(mesh) {
      return core.attachMesh(mesh);
    },
    attachUserContext(userContext) {
      return core.attachUserContext(userContext);
    },
    attachPulseNetBridge(bridge) {
      return core.attachPulseNetBridge(bridge);
    },
    attachDualBandEngine(engine) {
      return core.attachDualBandEngine(engine);
    },
    attachBinarySend(binarySend) {
      return core.attachBinarySend(binarySend);
    },

    // jobs
    runServerJob(payload) {
      return core.runServerJob(payload);
    },
    runBrainNetworkJob(payload) {
      return core.runBrainNetworkJob(payload);
    },

    // snapshot
    getSnapshot() {
      return core.getSnapshot();
    }
  });
}

export default createPulseServer;
