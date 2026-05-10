/**
 * ============================================================
 *  ORGAN: PulseScheduler
 *  ROOT:  PULSE-X
 *  MODE:  runtime
 *  TARGET: multi-tick-orchestration
 *  VERSION: v20-IMMORTAL-ADVANTAGE
 *
 *  ROLE:
 *    - Deterministic macro-orchestrator over Router + Overmind + Runtime.
 *    - Runs multi-tick pipelines (sequence of macro ticks).
 *    - Uses Overmind world-lens + dual-band + Pulse-Touch + presence bands.
 *    - Shapes tick flow using presence/mode/page/chunkProfile/trust/advantage.
 *    - Prewarm/cache-aware, runtime-v17+/v20-aware, world-layer-aware.
 *    - Provides rich, introspectable meta for each tick and the whole pipeline.
 *
 *  DESIGN:
 *    - Lives in PULSE-X (connection/runtime/scheduler/binary overlay).
 *    - Never owns memory; only calls into PULSE-CORE via Runtime.
 *    - Symbolic-first orchestration, binary-aware, advantage-aware.
 *    - All behavior is deterministic and host-agnostic.
 *
 *  GUARANTEES:
 *    - No real-time dependence.
 *    - No randomness.
 *    - No direct device/network IO.
 *    - Pure orchestration over symbolic + binary layers.
 * ============================================================
 */
import {
  OrganismIdentity,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PulseWorldOrganismMap-v24.js";
const Identity = OrganismIdentity(import.meta.url);

// 2 — EXPORT GENOME METADATA
export const PulseSchedulerMetaV17 = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
// export const WBC_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;
// ============================================================================
//  IMPORTS
// ============================================================================

import { routeAIRequest } from "../PULSE-AI/aiRouter-v16.js";
import { createOvermindOrgan } from "./PULSE-WORLD-ALDWYN.js";

// RUNTIME (Touch + prewarm/cache-aware, v17+)
import PulseRuntimeV17 from "./PulseWorldRuntime-v20.js";

const {
  runPulseTickV17: runPulseTick,
  PulseRuntimeTickResult
} = PulseRuntimeV17;

// ============================================================================
//  TYPES
// ============================================================================

export class SchedulerResult {
  constructor({
    scheduleId,
    tickIndex,
    routing = null,
    overmindDecision = null,
    runtimeTick = null,
    meta = {}
  }) {
    this.scheduleId = scheduleId;
    this.tickIndex = tickIndex;
    this.routing = routing;
    this.overmindDecision = overmindDecision;
    this.runtimeTick = runtimeTick;
    this.meta = meta;
  }
}

export class SchedulerPipelineResult {
  constructor({
    scheduleId,
    ticks = [],
    finalStateById = {},
    meta = {}
  }) {
    this.scheduleId = scheduleId;
    this.ticks = ticks;
    this.finalStateById = finalStateById;
    this.meta = meta;
  }
}

// ============================================================================
//  INTERNAL HELPERS
// ============================================================================

function buildScheduleId(seed = "pulse-scheduler-v20-immortal-advantage") {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const chr = seed.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return `sched-${Math.abs(hash)}`;
}

function summarizeRouting(routing) {
  if (!routing) return null;
  return {
    personaId: routing.personaId || null,
    safetyMode: routing.personaSafety?.safetyMode || null,
    archetypePrimaryPage: routing.archetypes?.primaryPage || null,
    dualBandMode: routing.dualBand?.mode || null,
    dualBandAdvantage: routing.dualBand?.advantage || null
  };
}

function summarizeOvermindDecision(overmindDecision) {
  if (!overmindDecision) return null;
  const meta = overmindDecision.meta || {};
  return {
    worldLens: meta.worldLens || null,
    safetyStatus: meta.safetyStatus || null,
    comfortTag: meta.comfortTag || null,
    confidence: meta.confidence || null
  };
}

function summarizeRuntimeTick(runtimeTick) {
  if (!runtimeTick) return null;
  return {
    logicalClock: runtimeTick.logicalClock || null,
    planSummary: runtimeTick.multiPlanSummary || null
  };
}

function buildTickAdvantageSummary({ routing, overmindDecision, runtimeTick }) {
  const routingSummary = summarizeRouting(routing);
  const overmindSummary = summarizeOvermindDecision(overmindDecision);
  const runtimeSummary = summarizeRuntimeTick(runtimeTick);

  return {
    routing: routingSummary,
    overmind: overmindSummary,
    runtime: runtimeSummary
  };
}

// ============================================================================
//  CORE SCHEDULER ORGAN
// ============================================================================

export class PulseSchedulerV17 {
  constructor(config = {}) {
    this.config = {
      enableRouting: true,
      enableOvermind: true,
      enableRuntimeTick: true,
      defaultGlobalPolicy: {},
      defaultMaxTicks: 3,
      defaultStopOnWorldLens: ["unsafe"],
      defaultPrewarmHint: "scheduler-init",

      // Optional pure observer hooks (no IO, no side effects outside memory):
      //   onTick(result: SchedulerResult) => void
      //   onPipeline(result: SchedulerPipelineResult) => void
      onTick: null,
      onPipeline: null,

      ...config
    };

    this.overmind =
      config.overmind ||
      createOvermindOrgan({
        personalFrame: config.personalFrame || null,
        juryFrame: config.juryFrame || null,
        safetyFrame: config.safetyFrame || null
      });
  }

  // --------------------------------------------------------------------------
  // v20 macro tick (Touch + prewarm/cache-aware + advantage summary)
  // --------------------------------------------------------------------------
  async runMacroTick({
    instances = [],
    currentStatesById = {},
    globalContinuancePolicy = null,
    userRequest = null,
    dualBand = null,
    pulseTouch = null,
    scheduleId = null,
    tickIndex = 0,
    prewarmHint = null,
    cacheHint = null
  }) {
    const reasoning = [];
    const effectiveScheduleId = scheduleId || buildScheduleId();

    reasoning.push(
      `PulseScheduler-v20-IMMORTAL-ADVANTAGE: macro tick #${tickIndex} (schedule=${effectiveScheduleId}).`
    );

    const policy =
      globalContinuancePolicy || this.config.defaultGlobalPolicy || {};

    // 1) ROUTING (Touch-aware)
    let routing = null;

    if (this.config.enableRouting && userRequest) {
      routing = routeAIRequest(userRequest, {
        ...dualBand,
        pulseTouch
      });

      reasoning.push(
        `Routing: persona=${routing?.personaId || "none"}, safetyMode=${
          routing?.personaSafety?.safetyMode || "standard"
        }, archetypePrimaryPage=${routing?.archetypes?.primaryPage || "none"}.`
      );
    } else {
      reasoning.push("Routing: disabled or no userRequest provided.");
    }

    // 2) OVERMIND (Touch-aware)
    let overmindDecision = null;

    if (this.config.enableOvermind && routing) {
      const intent = {
        type: userRequest?.intent || "analyze",
        domain: userRequest?.domain || null,
        scope: userRequest?.scope || null,
        safetyMode: routing?.personaSafety?.safetyMode || "standard",
        keywords: userRequest?.keywords || [],
        pulseTouch
      };

      const context = {
        domain: userRequest?.domain || null,
        scope: userRequest?.scope || null,
        safetyMode: routing?.personaSafety?.safetyMode || "standard",
        personaId: routing.personaId,
        archetypePrimaryPage: routing.archetypes?.primaryPage || null,
        dualBand: routing.dualBand || null,
        pulseTouch
      };

      const candidates = [
        {
          text:
            userRequest?.rawText ||
            userRequest?.prompt ||
            "No explicit user text provided.",
          routing,
          pulseTouch
        }
      ];

      overmindDecision = await this.overmind.process({
        intent,
        context,
        candidates,
        options: { mode: "normal" }
      });

      reasoning.push(
        `Overmind: worldLens=${overmindDecision?.meta?.worldLens || "none"}, safetyStatus=${
          overmindDecision?.meta?.safetyStatus || "unknown"
        }.`
      );
    } else {
      reasoning.push("Overmind: disabled or routing missing.");
    }

    // 3) RUNTIME TICK v17 (Touch + prewarm/cache-aware)
    let runtimeTickResult = null;

    if (this.config.enableRuntimeTick) {
      const runtimeResult = runPulseTick({
        instanceContexts: instances,
        currentStatesById,
        globalContinuancePolicy: policy,
        prewarmHint: prewarmHint || this.config.defaultPrewarmHint,
        cacheHint: cacheHint || null,
        pulseTouch
      });

      runtimeTickResult = runtimeResult;

      reasoning.push(
        `Runtime: logicalClock=${runtimeTickResult.logicalClock}, planSummary=${
          runtimeTickResult.multiPlanSummary || "none"
        }.`
      );
    } else {
      reasoning.push("Runtime: disabled by config.");
    }

    // 4) ADVANTAGE SUMMARY (routing + overmind + runtime)
    const advantageSummary = buildTickAdvantageSummary({
      routing,
      overmindDecision,
      runtimeTick: runtimeTickResult
    });

    // 5) META SUMMARY
    const meta = Object.freeze({
      schedulerMeta: PulseSchedulerMetaV17,
      scheduleId: effectiveScheduleId,
      tickIndex,

      routingPersonaId: routing?.personaId || null,
      routingArchetypePrimaryPage:
        routing?.archetypes?.primaryPage || null,
      routingSafetyMode: routing?.personaSafety?.safetyMode || null,

      overmindWorldLens: overmindDecision?.meta?.worldLens || null,
      overmindSafetyStatus: overmindDecision?.meta?.safetyStatus || null,
      overmindComfortTag: overmindDecision?.meta?.comfortTag || null,

      runtimePlanSummary:
        runtimeTickResult?.multiPlanSummary || null,
      runtimeLogicalClock: runtimeTickResult?.logicalClock || null,

      advantageSummary,
      pulseTouch,
      notes: reasoning
    });

    const result = new SchedulerResult({
      scheduleId: effectiveScheduleId,
      tickIndex,
      routing,
      overmindDecision,
      runtimeTick: runtimeTickResult,
      meta
    });

    // Optional observer hook (pure)
    if (typeof this.config.onTick === "function") {
      try {
        this.config.onTick(result);
      } catch {
        // never throw from observer
      }
    }

    return result;
  }

  // --------------------------------------------------------------------------
  // v20: Multi-tick pipeline (Touch + prewarm/cache-aware + pipeline stats)
  // --------------------------------------------------------------------------
  async runPipeline({
    instances = [],
    currentStatesById = {},
    globalContinuancePolicy = null,
    userRequest = null,
    dualBand = null,
    pulseTouch = null,
    maxTicks = null,
    stopOnWorldLens = null,
    prewarmHint = null
  }) {
    const scheduleId = buildScheduleId();
    const ticks = [];
    const reasoning = [];

    const effectiveMaxTicks =
      typeof maxTicks === "number" && maxTicks > 0
        ? maxTicks
        : this.config.defaultMaxTicks;

    const effectiveStopOnWorldLens =
      Array.isArray(stopOnWorldLens) && stopOnWorldLens.length > 0
        ? stopOnWorldLens
        : this.config.defaultStopOnWorldLens;

    let currentStateById = { ...currentStatesById };

    let firstWorldLens = null;
    let lastWorldLens = null;
    let cacheHits = 0;
    let cacheMisses = 0;

    for (let tickIndex = 0; tickIndex < effectiveMaxTicks; tickIndex++) {
      const cacheHint = tickIndex === 0 ? "miss" : "hit";

      if (cacheHint === "hit") cacheHits++;
      if (cacheHint === "miss") cacheMisses++;

      const tickResult = await this.runMacroTick({
        instances,
        currentStatesById: currentStateById,
        globalContinuancePolicy,
        userRequest,
        dualBand,
        pulseTouch,
        scheduleId,
        tickIndex,
        prewarmHint:
          prewarmHint ||
          (tickIndex === 0 ? "pipeline-start" : "pipeline-continue"),
        cacheHint
      });

      ticks.push(tickResult);

      const worldLens = tickResult.overmindDecision?.meta?.worldLens || null;

      if (tickIndex === 0) {
        firstWorldLens = worldLens;
      }
      lastWorldLens = worldLens;

      if (worldLens && effectiveStopOnWorldLens.includes(worldLens)) {
        reasoning.push(
          `Pipeline: stopping early on worldLens="${worldLens}" (tickIndex=${tickIndex}).`
        );
        break;
      }

      if (tickResult.runtimeTick?.executionResultsById) {
        const nextState = { ...currentStateById };
        for (const [instanceId, execResult] of Object.entries(
          tickResult.runtimeTick.executionResultsById
        )) {
          if (execResult?.newState) {
            nextState[instanceId] = execResult.newState;
          }
        }
        currentStateById = nextState;
      }
    }

    const meta = Object.freeze({
      schedulerMeta: PulseSchedulerMetaV17,
      scheduleId,
      totalTicks: ticks.length,
      maxTicksRequested: effectiveMaxTicks,
      stopOnWorldLens: effectiveStopOnWorldLens,
      firstWorldLens,
      lastWorldLens,
      cacheHits,
      cacheMisses,
      pulseTouch,
      notes: reasoning
    });

    const pipelineResult = new SchedulerPipelineResult({
      scheduleId,
      ticks,
      finalStateById: currentStateById,
      meta
    });

    // Optional observer hook (pure)
    if (typeof this.config.onPipeline === "function") {
      try {
        this.config.onPipeline(pipelineResult);
      } catch {
        // never throw from observer
      }
    }

    return pipelineResult;
  }
}

// ============================================================================
//  PUBLIC API — Create Scheduler Organ
// ============================================================================

export function createPulseSchedulerV17(config = {}) {
  const core = new PulseSchedulerV17(config);

  return Object.freeze({
    meta: PulseSchedulerMetaV17,
    runMacroTick: (payload) => core.runMacroTick(payload),
    runPipeline: (payload) => core.runPipeline(payload)
  });
}

export const pulseSchedulerV17 = createPulseSchedulerV17();
