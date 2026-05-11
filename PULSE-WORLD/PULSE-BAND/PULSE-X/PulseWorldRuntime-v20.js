// ============================================================================
//  FILE: /PULSE-X/PulseRuntime-v20-IMMORTAL-ADVANTAGE.js
//  PULSE RUNTIME v20 — IMMORTAL ADVANTAGE RUNTIME SPINE
// ----------------------------------------------------------------------------
//  ROLE (UNDERTOW OF THE ORGANISM):
//    • Single source of truth for execution ticks across the organism.
//    • Orchestrates multi‑organism plans (symbolic) and binary execution frames.
//    • Tracks heat (instances / regions / hosts / presence / trust).
//    • Tracks chunk profiles, cache behavior, prewarm events, and band usage.
//    • Exposes a deterministic, introspectable runtime state for the whole world.
//
//  DESIGN:
//    • Symbolic‑first, binary‑backed, memory‑spined.
//    • Dual‑band, advantage‑aware, presence‑aware.
//    • No network, no filesystem, no eval, no timers.
//    • All state flows through CoreMemory; all outputs are replayable.
// ============================================================================
import {
  OrganismIdentity,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PulseWorldOrganismMap-v24.js";
const Identity = OrganismIdentity(import.meta.url);

// 2 — EXPORT GENOME METADATA
// export const PulseBinaryWaveScannerMeta = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
export const PulseRuntimeV17Meta = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// -----------------------------------------------------------------------------
// IMPORTS — WORLD / FINALITY / SPECS / GENOME / MEMORY / BINARY SUBSTRATE
// -----------------------------------------------------------------------------

// World / Regioning (Expansion)
import * as PulseWorldRegioning from "../PULSE-EXPANSION/PULSE-EXPANSION-INTERNET.js";

// Delta Engine (CoreMemory integrations)
import * as PulseContinuance from "../PULSE-FINALITY/PulseFinalityContinuance-v20.js";
import * as PulseOmniHosting from "../PULSE-FINALITY/PulseFinalityOmniHosting-v20.js";
import * as PulseSchema from "../PULSE-FINALITY/PulseFinalitySchema-v20.js";

// Specs / Genome (for runtime‑aware schema hooks)
import { PULSE_FIELDS_SPEC } from "../PULSE-SPECS/PulseSpecsDNAGenome-v20.js";

// World Genome (for world‑layer alignment hooks)
import { PulseWorldGenome } from "./PulseWorldGenome-v20.js";

// Core Memory
import { createPulseCoreMemory } from "../PULSE-CORE/PulseCoreMemory-v24.js";

// Binary substrate (Touch‑aware v2.x)
import BinarySubstrateV2 from "./PulseWorldBinarySubstrate-v24.js";
const { packMultiOrganismPlan, packExecutionResult } = BinarySubstrateV2;

// -----------------------------------------------------------------------------
// RUNTIME HOOKS — WORLD / SCHEMA / EXECUTION
// -----------------------------------------------------------------------------
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

// World genome alignment hook
const adjustForWorldGenome =
  PulseWorldGenome?.adjustRuntimePlanForWorld ||
  ((plan, _policy) => plan);

// Core runtime memory spine
const CoreMemory = createPulseCoreMemory();

// -----------------------------------------------------------------------------
// RUNTIME KEYS — LOGICAL CLOCK, HOT MAPS, BINARY METRICS
// -----------------------------------------------------------------------------
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
const KEY_BAND_USAGE = "band-usage"; // symbolic / binary / dual

// -----------------------------------------------------------------------------
// TICK / CLOCK — LOGICAL RUNTIME TIME
// -----------------------------------------------------------------------------
function bumpTick() {
  const t = CoreMemory.get(ROUTE, KEY_TICK) || 0;
  const next = t + 1;
  CoreMemory.set(ROUTE, KEY_TICK, next);

  const clock = CoreMemory.get(ROUTE, KEY_LOGICAL_CLOCK) || 0;
  CoreMemory.set(ROUTE, KEY_LOGICAL_CLOCK, clock + 1);

  return next;
}

// -----------------------------------------------------------------------------
// HOT INSTANCE TRACKING — WHICH RUNTIME INSTANCES ARE ACTIVE
// -----------------------------------------------------------------------------
function trackInstance(id) {
  const hot = CoreMemory.get(ROUTE, KEY_HOT_INSTANCES) || {};
  hot[id] = (hot[id] || 0) + 1;
  CoreMemory.set(ROUTE, KEY_HOT_INSTANCES, hot);
}

// -----------------------------------------------------------------------------
// WORLD / REGION / HOST / TOUCH HEATMAPS
// -----------------------------------------------------------------------------
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

// -----------------------------------------------------------------------------
// BINARY FRAME METRICS — SIZE + BAND USAGE
// -----------------------------------------------------------------------------
function trackFrameSize(uint8, band = "symbolic") {
  const size = uint8?.length || 0;
  const hot = CoreMemory.get(ROUTE, KEY_HOT_FRAME_SIZES) || {};
  hot[size] = (hot[size] || 0) + 1;
  CoreMemory.set(ROUTE, KEY_HOT_FRAME_SIZES, hot);

  const bandUsage = CoreMemory.get(ROUTE, KEY_BAND_USAGE) || {};
  bandUsage[band] = (bandUsage[band] || 0) + 1;
  CoreMemory.set(ROUTE, KEY_BAND_USAGE, bandUsage);
}

// -----------------------------------------------------------------------------
// CHUNK PROFILE METRICS — WHICH CHUNK PROFILES ARE HOT
// -----------------------------------------------------------------------------
function trackChunkUsage(chunkProfile) {
  if (!chunkProfile) return;
  const chunks = CoreMemory.get(ROUTE, KEY_HOT_CHUNKS) || {};
  chunks[chunkProfile] = (chunks[chunkProfile] || 0) + 1;
  CoreMemory.set(ROUTE, KEY_HOT_CHUNKS, chunks);
}

// -----------------------------------------------------------------------------
// INTERNAL METRICS HELPERS — CACHE / PREWARM / FRAME TRACKING
// -----------------------------------------------------------------------------
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

// -----------------------------------------------------------------------------
// BINARY FRAME BUNDLES — SYMBOLIC + BINARY PACKED OUTPUT
// -----------------------------------------------------------------------------
export class BinaryFramesBundle {
  constructor({ multiPlanFrame, executionFramesById }) {
    this.multiPlanFrame = multiPlanFrame;
    this.executionFramesById = executionFramesById;
  }
}

// -----------------------------------------------------------------------------
// RUNTIME TICK RESULT — SINGLE IMMORTAL TICK SNAPSHOT
// -----------------------------------------------------------------------------
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

// -----------------------------------------------------------------------------
// MAIN TICK — v20 IMMORTAL ADVANTAGE RUNTIME STEP
// (names kept v17 for compatibility; semantics are v20+)
// -----------------------------------------------------------------------------
export function runPulseTickV17({
  instanceContexts,
  currentStatesById,
  globalContinuancePolicy = {},
  prewarmHint = null,
  cacheHint = null
}) {
  // Prewarm core memory for this route
  CoreMemory.prewarm();
  if (prewarmHint) {
    trackPrewarmEvent(prewarmHint);
  }

  // Logical tick + clock
  const tick = bumpTick();
  const logicalClock = CoreMemory.get(ROUTE, KEY_LOGICAL_CLOCK) || tick;

  CoreMemory.set(ROUTE, KEY_LAST_POLICY, globalContinuancePolicy);

  // World‑aware instance contexts (regioning, host, etc.)
  const adjustedContexts =
    PulseWorldRegioning.adjustInstanceContextsForWorld?.(
      instanceContexts,
      globalContinuancePolicy
    ) || instanceContexts;

  // Build + adjust multi‑organism plan
  const multiPlanRaw = buildMultiOrganismPlan(adjustedContexts);
  const multiPlan = adjustForWorldGenome(multiPlanRaw, globalContinuancePolicy);
  const multiPlanSummary = summarizeMultiOrganismPlan(multiPlan);

  CoreMemory.set(ROUTE, KEY_LAST_PLAN, multiPlan);
  CoreMemory.set(ROUTE, KEY_LAST_PLAN_SUMMARY, multiPlanSummary);

  // Execute plan
  const executionResultsById = executeMultiOrganismPlan(
    multiPlan,
    currentStatesById
  );

  CoreMemory.set(ROUTE, KEY_LAST_EXEC, executionResultsById);

  // Track heat + chunk usage per instance
  for (const [id, state] of Object.entries(currentStatesById)) {
    trackInstance(id);
    trackRegionHostAndTouch(state);
    if (state.chunkProfile) {
      trackChunkUsage(state.chunkProfile);
    }
  }

  // Cache metrics
  if (cacheHint === "hit") trackCacheHit();
  if (cacheHint === "miss") trackCacheMiss();

  // Pack symbolic multi‑plan frame
  const multiPlanFrame = packMultiOrganismPlan(multiPlan);
  trackFrameSize(multiPlanFrame, "symbolic");

  // Pack binary execution frames per instance
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

  // Return full tick snapshot
  return new PulseRuntimeTickResult({
    tick,
    logicalClock,
    multiPlan,
    multiPlanSummary,
    executionResultsById,
    binaryFrames
  });
}

// -----------------------------------------------------------------------------
// RUNTIME STATE SNAPSHOT — READ‑ONLY VIEW OF HOT STATE
// -----------------------------------------------------------------------------
export function getRuntimeStateV17() {
  CoreMemory.prewarm();

  return {
    // clocks
    tick: CoreMemory.get(ROUTE, KEY_TICK),
    logicalClock: CoreMemory.get(ROUTE, KEY_LOGICAL_CLOCK),

    // last policy + plan + exec
    policy: CoreMemory.get(ROUTE, KEY_LAST_POLICY),
    plan: CoreMemory.get(ROUTE, KEY_LAST_PLAN),
    planSummary: CoreMemory.get(ROUTE, KEY_LAST_PLAN_SUMMARY),
    execResults: CoreMemory.get(ROUTE, KEY_LAST_EXEC),
    binaryFrames: CoreMemory.get(ROUTE, KEY_LAST_FRAMES),

    // heat maps
    hotInstances: CoreMemory.get(ROUTE, KEY_HOT_INSTANCES),
    hotRegions: CoreMemory.get(ROUTE, KEY_HOT_REGIONS),
    hotHosts: CoreMemory.get(ROUTE, KEY_HOT_HOSTS),
    hotFrameSizes: CoreMemory.get(ROUTE, KEY_HOT_FRAME_SIZES),

    hotPresence: CoreMemory.get(ROUTE, KEY_HOT_PRESENCE),
    hotModes: CoreMemory.get(ROUTE, KEY_HOT_MODES),
    hotPages: CoreMemory.get(ROUTE, KEY_HOT_PAGES),
    hotChunkProfiles: CoreMemory.get(ROUTE, KEY_HOT_CHUNK_PROFILES),
    hotTrust: CoreMemory.get(ROUTE, KEY_HOT_TRUST),

    // chunk + cache + band usage
    hotChunks: CoreMemory.get(ROUTE, KEY_HOT_CHUNKS),
    cacheHits: CoreMemory.get(ROUTE, KEY_CACHE_HITS),
    cacheMisses: CoreMemory.get(ROUTE, KEY_CACHE_MISSES),
    prewarmEvents: CoreMemory.get(ROUTE, KEY_PREWARM_EVENTS),
    bandUsage: CoreMemory.get(ROUTE, KEY_BAND_USAGE),

    // genome + world meta
    genomeSpecVersion: PULSE_FIELDS_SPEC.version,
    worldGenomeMeta: PulseWorldGenome?.meta || null
  };
}

// -----------------------------------------------------------------------------
// RUNTIME OBJECT EXPORT — IMMORTAL ADVANTAGE RUNTIME CONTRACT
// -----------------------------------------------------------------------------
const PulseRuntimeV17 = {
  meta: PulseRuntimeV17Meta,
  runPulseTickV17,
  getRuntimeStateV17,
  CoreMemory
};

export default PulseRuntimeV17;
