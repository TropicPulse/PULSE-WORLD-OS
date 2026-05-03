// ============================================================================
// PULSE-NET — Immortal Local Heartbeat + Forward/Backward Engine ignition
// v15-FAMILY-IMMORTAL (SUPER INSTANCE MODE)
//  • Multi-instance safe (family registry)
//  • Drift-proof
//  • Dual-lane (forward/backward)
//  • Shared organism memory
//  • Per-instance organism state
//  • Exportable engines for Earn / PULSE-X
//  • Deterministic tick sequencing
//  • 3-heart mesh (Mom/Dad/Earn) + random nudge
//  • UIFlow + ErrorSpine + Bridge-aware
//  • LOCAL ONLY — lives under PULSE-X, NOT a Netlify function
// ============================================================================
/*
AI_EXPERIENCE_META = {
  identity: "PulseNet",
  version: "v15-FAMILY-IMMORTAL",
  layer: "frontend",
  role: "network_intelligence",
  lineage: "PulseOS-v12 → v13-EVO-IMMORTAL → v15-FAMILY-IMMORTAL",

  evo: {
    dualBand: true,
    binaryAware: true,
    cnsAligned: true,
    chunkAligned: true,
    presenceAware: true,
    safeRouteFree: true,
    microPulseEngine: true,
    pathfinder: true,
    preLossDetector: true,
    fallbackRouter: true,

    multiInstanceFamily: true,
    serverResident: true,
    heartbeatMesh: true,
    uiFlowAware: true,
    errorSpineAware: true,
    routeAware: true,
    futureEvolutionReady: true
  },

  contract: {
    always: [
      "PulseWindow",
      "PulsePresence",
      "PulseChunks",
      "PulseBand",
      "PulseUIFlow",
      "PulseProofBridge",
      "PulsePresenceNormalizer",
      "PulseUIErrors"
    ],
    never: [
      "legacyPulseNet",
      "legacyPulseClient",
      "legacyPulseMesh",
      "safeRoute",
      "fetchViaCNS",
      "legacyFallbackRouter",
      "legacyNetworkLayer"
    ]
  }
}
*/

import { createForwardEngine } from "./ForwardEngine.js";
import { createBackwardEngine } from "./BackwardEngine.js";
import PulseUIErrors from "./PulseUIErrors-v13-EVO-PRIME.js";
import { initUIFlow } from "./PulseUIFlow-v13-EVO-PRIME.js";
import { safeRoute as route } from "./PulseProofBridge.js";

// ============================================================================
// GLOBAL ORGANISM MEMORY (shared across all imports)
// ============================================================================
globalThis.__PULSE_MEM__ = globalThis.__PULSE_MEM__ || {};

// Per-instance organism state (family)
globalThis.__PULSE_ORGANISM_FAMILY__ = globalThis.__PULSE_ORGANISM_FAMILY__ || {};
function getOrganism(instanceId) {
  const fam = globalThis.__PULSE_ORGANISM_FAMILY__;
  if (!fam[instanceId]) {
    fam[instanceId] = {
      id: instanceId,
      forwardTicks: 0,
      backwardTicks: 0,
      lastHeartbeat: 0,
      lastAIHeartbeat: 0,
      lastBeatSource: "none"
    };
  }
  return fam[instanceId];
}

// Local PULSE-NET runtime state (family registry)
globalThis.__PULSE_NET_FAMILY__ = globalThis.__PULSE_NET_FAMILY__ || {};
function getNetState(instanceId) {
  const fam = globalThis.__PULSE_NET_FAMILY__;
  if (!fam[instanceId]) {
    fam[instanceId] = {
      started: false,
      intervalId: null,
      lastTick: 0
    };
  }
  return fam[instanceId];
}

// ============================================================================
// ENGINE SINGLETONS (per instance in Earn / PULSE-X)
// ============================================================================
const forwardEngines = {};
const backwardEngines = {};

// ============================================================================
// ORGAN STUBS (symbolic-first, binary-non-executable)
// ============================================================================
const BinaryOrgan = {
  encode: (v) => JSON.stringify(v),
  chunk: (s) => [s],
  dechunk: (chunks) => chunks.join(""),
  decode: (s) => JSON.parse(s)
};

const MemoryOrgan = {
  read: (key) => globalThis.__PULSE_MEM__[key] ?? null,
  write: (key, value) => (globalThis.__PULSE_MEM__[key] = value)
};

const BrainOrgan = {
  evolve: (_event) => {}
};

// ============================================================================
// ENGINE FACTORIES (multi-instance safe)
// ============================================================================
function getForwardEngine(instanceId = "core") {
  if (forwardEngines[instanceId]) return forwardEngines[instanceId];

  const engine = createForwardEngine({
    BinaryOrgan,
    MemoryOrgan,
    BrainOrgan,
    instanceId: `forward-${instanceId}`,
    trace: true
  });

  engine.prewarm();
  forwardEngines[instanceId] = engine;
  return engine;
}

function getBackwardEngine(instanceId = "core") {
  if (backwardEngines[instanceId]) return backwardEngines[instanceId];

  const engine = createBackwardEngine({
    BinaryOrgan,
    MemoryOrgan,
    BrainOrgan,
    instanceId: `backward-${instanceId}`,
    trace: true
  });

  engine.prewarm();
  backwardEngines[instanceId] = engine;
  return engine;
}

// ============================================================================
// HEARTBEAT HELPERS
// ============================================================================
function getHeartbeatState(instanceId) {
  const org = getOrganism(instanceId);
  return { last: org.lastHeartbeat };
}

function runOrganismHeartbeat(instanceId, source) {
  const org = getOrganism(instanceId);
  const now = Date.now();
  org.lastHeartbeat = now;
  org.lastBeatSource = source;
  console.log("[PULSE-NET]", instanceId, "Organism heartbeat:", source, now);
}

function runAIHeartbeat(instanceId, source) {
  const org = getOrganism(instanceId);
  const now = Date.now();
  org.lastAIHeartbeat = now;
  console.log("[PULSE-NET]", instanceId, "AI heartbeat:", source, now);
}

// ============================================================================
// ENGINE TICK HELPERS
// ============================================================================
function warmForwardEngine(instanceId) {
  const org = getOrganism(instanceId);
  const engine = getForwardEngine(instanceId);
  const result = engine.tick();

  org.forwardTicks++;
  console.log("[PULSE-NET]", instanceId, "ForwardEngine tick:", result.metrics);
  return result.metrics;
}

function warmBackwardEngine(instanceId) {
  const org = getOrganism(instanceId);
  const engine = getBackwardEngine(instanceId);
  const result = engine.tick();

  org.backwardTicks++;
  console.log("[PULSE-NET]", instanceId, "BackwardEngine tick:", result.metrics);
  return result.metrics;
}

// ============================================================================
// 3-HEART MESH (Mom / Dad / Earn) + random nudge
// ============================================================================

// Mom Heart — primary beat: forward engine + organism heartbeat
function momHeart(instanceId, now) {
  runOrganismHeartbeat(instanceId, "mom");
  const forwardMetrics = warmForwardEngine(instanceId);
  return { source: "mom", forward: forwardMetrics };
}

// Dad Heart — fallback beat: backward engine + AI heartbeat
function dadHeart(instanceId, now) {
  runAIHeartbeat(instanceId, "dad");
  const backwardMetrics = warmBackwardEngine(instanceId);
  return { source: "dad", backward: backwardMetrics };
}

// Earn Heart — tertiary beat: both engines if stale, light touch if not
function earnHeart(instanceId, now, stale) {
  if (stale) {
    runOrganismHeartbeat(instanceId, "earn-stale");
    runAIHeartbeat(instanceId, "earn-stale");
    const forwardMetrics = warmForwardEngine(instanceId);
    const backwardMetrics = warmBackwardEngine(instanceId);
    return {
      source: "earn-stale",
      forward: forwardMetrics,
      backward: backwardMetrics
    };
  } else {
    // light nudge: just ensure organism time moves
    runOrganismHeartbeat(instanceId, "earn-soft");
    return { source: "earn-soft" };
  }
}

// Random nudge — probabilistic extra push
function randomNudge(instanceId, now) {
  if (Math.random() > 0.97) {
    runOrganismHeartbeat(instanceId, "random");
    console.log("[PULSE-NET]", instanceId, "Random nudge beat");
    return { source: "random" };
  }
  return null;
}

// ============================================================================
// LOCAL IMMORTAL LOOP (NO NETLIFY, NO HANDLER)
// ============================================================================
async function tickFamily(instanceId = "core") {
  const now = Date.now();
  const { last } = getHeartbeatState(instanceId);
  const delta = now - (last || 0);

  const stale = delta > 90 * 1000;      // organism stale
  const softStale = delta > 15 * 1000;  // soft fallback threshold

  let result = null;

  // 1) Mom tries first (primary beat)
  if (!stale) {
    result = momHeart(instanceId, now);
  } else {
    console.log("[PULSE-NET]", instanceId, "Mom stale, escalating to Dad/Earn");
  }

  // 2) If Mom is stale or soft-stale, let Dad step in
  if (!result || softStale) {
    const dadResult = dadHeart(instanceId, now);
    result = { ...(result || {}), ...dadResult };
  }

  // 3) If fully stale, Earn does a heavy rescue beat
  if (stale) {
    const earnResult = earnHeart(instanceId, now, true);
    result = { ...(result || {}), ...earnResult };
  } else {
    // non-stale: Earn does a soft continuity beat
    const earnResult = earnHeart(instanceId, now, false);
    result = { ...(result || {}), ...earnResult };
  }

  // 4) Random nudge as extra beat source
  const rnd = randomNudge(instanceId, now);
  if (rnd) {
    result = { ...(result || {}), ...rnd };
  }

  // 5) UIFlow + CNS + ErrorSpine awareness (local only)
  try {
    // Ping CNS with heartbeat (non-fatal if bridge is quiet)
    route("pulseNet.heartbeat", {
      instanceId,
      organism: getOrganism(instanceId),
      result,
      layer: "PulseNet",
      binaryAware: true,
      dualBand: true
    }).catch(() => {});

    // Light UIFlow ignition on first ticks (idempotent)
    if (typeof window !== "undefined" && !window.__PULSE_UIFLOW_BOOTED__) {
      window.__PULSE_UIFLOW_BOOTED__ = true;
      initUIFlow().catch(() => {
        window.__PULSE_UIFLOW_BOOTED__ = false;
      });
    }
  } catch (err) {
    try {
      const packet = PulseUIErrors.normalizeError(err, "PulseNet.tickFamily");
      PulseUIErrors.broadcast(packet);
    } catch {}
  }

  const state = getNetState(instanceId);
  state.lastTick = now;
  return result;
}

// Start the local immortal loop (idempotent per instance)
export function startPulseNet(options = {}) {
  const {
    instanceId = "core",
    intervalMs = 750,      // slightly faster in dev; can be raised in prod
    superInstance = true   // reserved flag for future tuning
  } = options;

  const state = getNetState(instanceId);
  if (state.started) {
    console.log("[PULSE-NET]", instanceId, "Already started");
    return;
  }

  state.started = true;
  state.intervalId = setInterval(() => {
    tickFamily(instanceId).catch((err) => {
      console.error("[PULSE-NET]", instanceId, "Tick error:", err);
      try {
        const packet = PulseUIErrors.normalizeError(err, "PulseNet.intervalTick");
        PulseUIErrors.broadcast(packet);
      } catch {}
    });
  }, intervalMs);

  console.log(
    "[PULSE-NET]",
    instanceId,
    "Local immortal family loop started @",
    intervalMs,
    "ms (superInstance:",
    !!superInstance,
    ")"
  );
}

// ============================================================================
// EXPORT ENGINES + ORGANISM FOR EARN / OTHER ORGANS
// ============================================================================
export function PulseNetForward(instanceId = "core") {
  return getForwardEngine(instanceId);
}

export function PulseNetBackward(instanceId = "core") {
  return getBackwardEngine(instanceId);
}

export function PulseNetOrganism(instanceId = "core") {
  return getOrganism(instanceId);
}

export function PulseNetInstances() {
  return {
    organisms: globalThis.__PULSE_ORGANISM_FAMILY__,
    nets: globalThis.__PULSE_NET_FAMILY__
  };
}
