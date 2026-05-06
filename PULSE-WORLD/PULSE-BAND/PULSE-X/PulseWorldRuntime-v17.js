/**
 * PulseRuntime-v17-IMMORTAL.js
 * PULSE-X / RUNTIME / v17-IMMORTAL
 *
 * ROLE:
 *   v17 Runtime introduces:
 *     - runtime-level hot-state tracking (instances/regions/hosts)
 *     - binary metrics (frame sizes, counts, bands)
 *     - tick sequencing + logical runtime clock
 *     - region/host heatmaps + presence/mode/page/chunkProfile/trust heatmaps
 *     - chunk/prewarm/cache awareness (symbolic + binary)
 *     - world-adjustment hooks (world engine / expansion aware)
 *     - unified introspection API (symbolic + binary + presence)
 *     - dual-band, presence-aware, advantage-aware runtime spine
 *
 *   Symbolic-first.
 *   Binary-backed.
 *   Memory-spined.
 *   Deterministic.
 */
/*
AI_EXPERIENCE_META = {
  identity: "PulseRuntime",
  version: "v17-IMMORTAL",
  layer: "runtime",
  role: "organism_execution_conductor",
  lineage: "PulseRuntime-v1 → v11-Evo → v13-Presence-Evo+ → v14-Immortal → v2.4-Presence-TOUCH-Immortal → v17-IMMORTAL",

  evo: {
    runtimeConductor: true,
    executionCycle: true,
    dualBand: true,
    substrateAware: true,
    schedulerAware: true,

    deterministic: true,
    driftProof: true,
    pureCompute: true,

    zeroMutationOfInput: true,
    zeroNetwork: true,
    zeroFilesystem: true,

    presenceAware: true,
    advantageAware: true,
    pulseTouchAware: true,
    chunkAware: true,
    cacheAware: true,
    prewarmAware: true,
    meshAware: true,
    expansionAware: true,
    multiInstanceReady: true,
    runtimeAware: true,
    worldLayerAware: true,
    genomeAware: true
  },

  contract: {
    always: [
      "BinarySubstrate",
      "PulseScheduler",
      "PulseSpecs.DNAGenome",
      "PulseWorldGenome"
    ],
    never: [
      "safeRoute",
      "fetchViaCNS",
      "presenceEngine",
      "meshKernel",
      "routerCore"
    ]
  }
}
*/

// -------------------------
// Meta
// -------------------------

export const PulseRuntimeV17Meta = Object.freeze({
  organId: "PulseRuntime-v17-IMMORTAL",
  role: "RUNTIME_SPINE",
  version: "v17-IMMORTAL",
  epoch: "v17-IMMORTAL",
  layer: "RuntimeCore",
  safety: Object.freeze({
    deterministic: true,
    noRandomness: true,
    noAsyncDrift: true,
    syntheticOnly: true
  }),
  evo: Object.freeze({
    presenceAware: true,
    advantageAware: true,
    dualbandSafe: true,
    chunkAware: true,
    cacheAware: true,
    prewarmAware: true,
    meshAware: true,
    expansionAware: true,
    multiInstanceReady: true,
    runtimeAware: true,
    pulseTouchAware: true,
    worldLayerAware: true,
    genomeAware: true
  })
});

// -------------------------
// Imports
// -------------------------

// World / Regioning (Expansion)
import * as PulseWorldRegioning from "../PULSE-EXPANSION/PulseExpansion-v16.js";

// Delta Engine (CoreMemory integrations)
import * as PulseContinuance from "../PULSE-FINALITY/PULSE-CONTINUANCE/PulseContinuance-v16.js";
import * as PulseOmniHosting from "../PULSE-FINALITY/PULSE-OMNIHOSTING/PulseOmniHosting-v16.js";
import * as PulseSchema from "../PULSE-FINALITY/PULSE-SCHEMA/PulseSchema-v16.js";

// Specs / Genome (for future runtime-aware schema hooks)
import { PULSE_FIELDS_SPEC } from "../PULSE-SPECS/PulseSpecsDNAGenome-v17.js";

// World Genome (for world-layer alignment hooks)
import { PulseWorldGenome } from "./PulseWorldGenome-v17.js";

// Core Memory
import { createPulseCoreMemory } from "../PULSE-CORE/PulseCoreMemory.js";

// Binary substrate (Touch-aware v2.x)
import BinarySubstrateV2 from "./PulseWorldBinarySubstrate-v17.js";
const { packMultiOrganismPlan, packExecutionResult } = BinarySubstrateV2;

// -------------------------
// Runtime Functions Wiring
// -------------------------

// Build multi-organism plan (Expansion / Regioning layer)
const buildMultiOrganismPlan =
  PulseWorldRegioning.buildMultiOrganismPlan ||
  (() => {
    throw new Error("buildMultiOrganismPlan missing in PulseWorldRegioning");
  });

// Summaries (Schema layer)
const summarizeMultiOrganismPlan =
  PulseSchema.summarizeMultiOrganismPlan ||
  (() => {
    throw new Error("summarizeMultiOrganismPlan missing in PulseSchema");
  });

// Execution (Continuance / OmniHosting layer)
const executeMultiOrganismPlan =
  PulseContinuance.executeMultiOrganismPlan ||
  PulseOmniHosting.executeMultiOrganismPlan ||
  (() => {
    throw new Error(
      "executeMultiOrganismPlan missing in PulseContinuance/PulseOmniHosting"
    );
  });

// Optional world-aware adjustment hook (symbolic only)
const adjustForWorldGenome =
  PulseWorldGenome?.adjustRuntimePlanForWorld ||
  ((plan, _policy) => plan);

// -------------------------
// Runtime Memory
// -------------------------

const CoreMemory = createPulseCoreMemory();

const ROUTE = "runtime-v17";

const KEY_TICK = "tick-counter";
const KEY_LOGICAL_CLOCK = "logical-clock";
const KEY_LAST_POLICY = "policy";
const KEY_LAST_PLAN = "plan";
const KEY_LAST_PLAN_SUMMARY = "plan-summary";
const KEY_LAST_EXEC = "exec-results";
const KEY_LAST_FRAMES = "binary-frames";

const KEY_HOT_INSTANCES = "hot-instances";
const KEY_HOT_REGIONS = "hot-regions";
const KEY_HOT_HOSTS = "hot-hosts";
const KEY_HOT_FRAME_SIZES = "hot-frame-sizes";

const KEY_HOT_PRESENCE = "hot-presence";
const KEY_HOT_MODES = "hot-modes";
const KEY_HOT_PAGES = "hot-pages";
const KEY_HOT_CHUNK_PROFILES = "hot-chunk-profiles";
const KEY_HOT_TRUST = "hot-trust";

const KEY_HOT_CHUNKS = "hot-chunks";
const KEY_CACHE_HITS = "cache-hits";
const KEY_CACHE_MISSES = "cache-misses";
const KEY_PREWARM_EVENTS = "prewarm-events";
const KEY_BAND_USAGE = "band-usage"; // symbolic/binary/dual

// -------------------------
// Helpers — logical clock / counters
// -------------------------

function bumpTick() {
  const t = CoreMemory.get(ROUTE, KEY_TICK) || 0;
  const next = t + 1;
  CoreMemory.set(ROUTE, KEY_TICK, next);

  const clock = CoreMemory.get(ROUTE, KEY_LOGICAL_CLOCK) || 0;
  CoreMemory.set(ROUTE, KEY_LOGICAL_CLOCK, clock + 1);

  return next;
}

function trackInstance(id) {
  const hot = CoreMemory.get(ROUTE, KEY_HOT_INSTANCES) || {};
  hot[id] = (hot[id] || 0) + 1;
  CoreMemory.set(ROUTE, KEY_HOT_INSTANCES, hot);
}

function trackRegionHostAndTouch(state) {
  if (!state) return;

  const regions = CoreMemory.get(ROUTE, KEY_HOT_REGIONS) || {};
  const hosts = CoreMemory.get(ROUTE, KEY_HOT_HOSTS) || {};

  if (state.currentRegionId) {
    regions[state.currentRegionId] =
      (regions[state.currentRegionId] || 0) + 1;
  }
  if (state.currentHostName) {
    hosts[state.currentHostName] =
      (hosts[state.currentHostName] || 0) + 1;
  }

  CoreMemory.set(ROUTE, KEY_HOT_REGIONS, regions);
  CoreMemory.set(ROUTE, KEY_HOT_HOSTS, hosts);

  const presenceMap = CoreMemory.get(ROUTE, KEY_HOT_PRESENCE) || {};
  const modesMap = CoreMemory.get(ROUTE, KEY_HOT_MODES) || {};
  const pagesMap = CoreMemory.get(ROUTE, KEY_HOT_PAGES) || {};
  const chunksMap = CoreMemory.get(ROUTE, KEY_HOT_CHUNK_PROFILES) || {};
  const trustMap = CoreMemory.get(ROUTE, KEY_HOT_TRUST) || {};

  const presence = state.presence || state.pulseTouch?.presence;
  const mode = state.mode || state.pulseTouch?.mode;
  const page = state.page || state.pulseTouch?.page;
  const chunkProfile = state.chunkProfile || state.pulseTouch?.chunkProfile;
  const trusted = state.trusted || state.pulseTouch?.trusted;

  if (presence) {
    presenceMap[presence] = (presenceMap[presence] || 0) + 1;
  }
  if (mode) {
    modesMap[mode] = (modesMap[mode] || 0) + 1;
  }
  if (page) {
    pagesMap[page] = (pagesMap[page] || 0) + 1;
  }
  if (chunkProfile) {
    chunksMap[chunkProfile] = (chunksMap[chunkProfile] || 0) + 1;
  }
  if (trusted) {
    trustMap[trusted] = (trustMap[trusted] || 0) + 1;
  }

  CoreMemory.set(ROUTE, KEY_HOT_PRESENCE, presenceMap);
  CoreMemory.set(ROUTE, KEY_HOT_MODES, modesMap);
  CoreMemory.set(ROUTE, KEY_HOT_PAGES, pagesMap);
  CoreMemory.set(ROUTE, KEY_HOT_CHUNK_PROFILES, chunksMap);
  CoreMemory.set(ROUTE, KEY_HOT_TRUST, trustMap);
}

function trackFrameSize(uint8, band = "symbolic") {
  const size = uint8?.length || 0;
  const hot = CoreMemory.get(ROUTE, KEY_HOT_FRAME_SIZES) || {};
  hot[size] = (hot[size] || 0) + 1;
  CoreMemory.set(ROUTE, KEY_HOT_FRAME_SIZES, hot);

  const bandUsage = CoreMemory.get(ROUTE, KEY_BAND_USAGE) || {};
  bandUsage[band] = (bandUsage[band] || 0) + 1;
  CoreMemory.set(ROUTE, KEY_BAND_USAGE, bandUsage);
}

function trackChunkUsage(chunkProfile) {
  if (!chunkProfile) return;
  const chunks = CoreMemory.get(ROUTE, KEY_HOT_CHUNKS) || {};
  chunks[chunkProfile] = (chunks[chunkProfile] || 0) + 1;
  CoreMemory.set(ROUTE, KEY_HOT_CHUNKS, chunks);
}

function trackCacheHit() {
  const hits = CoreMemory.get(ROUTE, KEY_CACHE_HITS) || 0;
  CoreMemory.set(ROUTE, KEY_CACHE_HITS, hits + 1);
}

function trackCacheMiss() {
  const misses = CoreMemory.get(ROUTE, KEY_CACHE_MISSES) || 0;
  CoreMemory.set(ROUTE, KEY_CACHE_MISSES, misses + 1);
}

function trackPrewarmEvent(reason = "generic") {
  const events = CoreMemory.get(ROUTE, KEY_PREWARM_EVENTS) || {};
  events[reason] = (events[reason] || 0) + 1;
  CoreMemory.set(ROUTE, KEY_PREWARM_EVENTS, events);
}

// -------------------------
// Types
// -------------------------

export class BinaryFramesBundle {
  constructor({ multiPlanFrame, executionFramesById }) {
    this.multiPlanFrame = multiPlanFrame;
    this.executionFramesById = executionFramesById;
  }
}

export class PulseRuntimeTickResult {
  constructor({
    tick,
    logicalClock,
    multiPlan,
    multiPlanSummary,
    executionResultsById,
    binaryFrames
  }) {
    this.tick = tick;
    this.logicalClock = logicalClock;
    this.multiPlan = multiPlan;
    this.multiPlanSummary = multiPlanSummary;
    this.executionResultsById = executionResultsById;
    this.binaryFrames = binaryFrames;
  }
}

// -------------------------
// Runtime Tick (v17-IMMORTAL)
// -------------------------

export function runPulseTickV17({
  instanceContexts,
  currentStatesById,
  globalContinuancePolicy = {},
  prewarmHint = null,
  cacheHint = null
}) {
  CoreMemory.prewarm();
  if (prewarmHint) {
    trackPrewarmEvent(prewarmHint);
  }

  const tick = bumpTick();
  const logicalClock = CoreMemory.get(ROUTE, KEY_LOGICAL_CLOCK) || tick;

  CoreMemory.set(ROUTE, KEY_LAST_POLICY, globalContinuancePolicy);

  const adjustedContexts =
    PulseWorldRegioning.adjustInstanceContextsForWorld?.(
      instanceContexts,
      globalContinuancePolicy
    ) || instanceContexts;

  const multiPlanRaw = buildMultiOrganismPlan(adjustedContexts);
  const multiPlan = adjustForWorldGenome(multiPlanRaw, globalContinuancePolicy);
  const multiPlanSummary = summarizeMultiOrganismPlan(multiPlan);

  CoreMemory.set(ROUTE, KEY_LAST_PLAN, multiPlan);
  CoreMemory.set(ROUTE, KEY_LAST_PLAN_SUMMARY, multiPlanSummary);

  const executionResultsById = executeMultiOrganismPlan(
    multiPlan,
    currentStatesById
  );

  CoreMemory.set(ROUTE, KEY_LAST_EXEC, executionResultsById);

  for (const [id, state] of Object.entries(currentStatesById)) {
    trackInstance(id);
    trackRegionHostAndTouch(state);
    if (state.chunkProfile) {
      trackChunkUsage(state.chunkProfile);
    }
  }

  if (cacheHint === "hit") trackCacheHit();
  if (cacheHint === "miss") trackCacheMiss();

  const multiPlanFrame = packMultiOrganismPlan(multiPlan);
  trackFrameSize(multiPlanFrame, "symbolic");

  const executionFramesById = {};
  for (const [id, exec] of Object.entries(executionResultsById)) {
    const frame = packExecutionResult(exec);
    executionFramesById[id] = frame;
    trackFrameSize(frame, "binary");
  }

  const binaryFrames = new BinaryFramesBundle({
    multiPlanFrame,
    executionFramesById
  });

  CoreMemory.set(ROUTE, KEY_LAST_FRAMES, binaryFrames);

  return new PulseRuntimeTickResult({
    tick,
    logicalClock,
    multiPlan,
    multiPlanSummary,
    executionResultsById,
    binaryFrames
  });
}

// -------------------------
// Introspection API
// -------------------------

export function getRuntimeStateV17() {
  CoreMemory.prewarm();

  return {
    tick: CoreMemory.get(ROUTE, KEY_TICK),
    logicalClock: CoreMemory.get(ROUTE, KEY_LOGICAL_CLOCK),
    policy: CoreMemory.get(ROUTE, KEY_LAST_POLICY),
    plan: CoreMemory.get(ROUTE, KEY_LAST_PLAN),
    planSummary: CoreMemory.get(ROUTE, KEY_LAST_PLAN_SUMMARY),
    execResults: CoreMemory.get(ROUTE, KEY_LAST_EXEC),
    binaryFrames: CoreMemory.get(ROUTE, KEY_LAST_FRAMES),

    hotInstances: CoreMemory.get(ROUTE, KEY_HOT_INSTANCES),
    hotRegions: CoreMemory.get(ROUTE, KEY_HOT_REGIONS),
    hotHosts: CoreMemory.get(ROUTE, KEY_HOT_HOSTS),
    hotFrameSizes: CoreMemory.get(ROUTE, KEY_HOT_FRAME_SIZES),

    hotPresence: CoreMemory.get(ROUTE, KEY_HOT_PRESENCE),
    hotModes: CoreMemory.get(ROUTE, KEY_HOT_MODES),
    hotPages: CoreMemory.get(ROUTE, KEY_HOT_PAGES),
    hotChunkProfiles: CoreMemory.get(ROUTE, KEY_HOT_CHUNK_PROFILES),
    hotTrust: CoreMemory.get(ROUTE, KEY_HOT_TRUST),

    hotChunks: CoreMemory.get(ROUTE, KEY_HOT_CHUNKS),
    cacheHits: CoreMemory.get(ROUTE, KEY_CACHE_HITS),
    cacheMisses: CoreMemory.get(ROUTE, KEY_CACHE_MISSES),
    prewarmEvents: CoreMemory.get(ROUTE, KEY_PREWARM_EVENTS),
    bandUsage: CoreMemory.get(ROUTE, KEY_BAND_USAGE),

    genomeSpecVersion: PULSE_FIELDS_SPEC.version,
    worldGenomeMeta: PulseWorldGenome?.meta || null
  };
}

// -------------------------
// Export
// -------------------------

const PulseRuntimeV17 = {
  meta: PulseRuntimeV17Meta,
  runPulseTickV17,
  getRuntimeStateV17,
  CoreMemory
};

export default PulseRuntimeV17;
