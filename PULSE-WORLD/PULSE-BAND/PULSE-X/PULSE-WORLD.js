// ============================================================================
// PULSE-WORLD — Immortal Local Heartbeat + Forward/Backward Engine + FastLane
// v24-IMMORTAL++-RootOrganism-FastLane (SUPER INSTANCE MODE)
// ============================================================================

import {
  OrganismIdentity,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PulseWorldOrganismMap-v21.js";
const Identity = OrganismIdentity(import.meta.url);

// 2 — EXPORT GENOME METADATA
// export const PulseBinaryWaveScannerMeta = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
// export const WBC_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// Global handle
const g =
  typeof globalThis !== "undefined"
    ? globalThis
    : typeof global !== "undefined"
    ? global
    : typeof window !== "undefined"
    ? window
    : typeof g !== "undefined"
    ? g
    : {};
import { PulseProofBridgeFlow as initUIFlow, PulseProofBridgeErrors as PulseUIErrors, route, PulseProofBridgeLogger as PulseProofLogger, BridgeLog as log, BridgeWarn as warn, BridgeError as error } from "../../PULSE-UI/_BACKEND/PULSE-WORLD-BRIDGE.js";
import { db, admin } from "./PulseWorldGenome-v20.js";

// ============================================================================
// PULSE-NET v14-Immortal — Backend Gateway + Crown Throne Room
//  • Single internet edge (via NetworkOrgan → route(...))
//  • Hybrid crown model: OvermindPrime sees heartbeats + AI requests
// ============================================================================
import { aiOvermindPrime } from "./PULSE-WORLD-ALDWYN.js";
import { PulseForward as createForwardEngine } from "../PULSE-ENGINE/ForwardMotion-v24.js";
import { PulseBackward as createBackwardEngine } from "../PULSE-ENGINE/BackwardMotion-v24.js";

import { PulseUnderstanding } from "./PULSE-WORLD-UNDERSTANDING.js";

// ============================================================================
// GLOBAL ORGANISM MEMORY (shared across all imports)
// ============================================================================
globalThis.__PULSE_MEM__ = globalThis.__PULSE_MEM__ || {};

// Per-instance organism state (family)
globalThis.__PULSE_ORGANISM_FAMILY__ =
  globalThis.__PULSE_ORGANISM_FAMILY__ || {};
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
// WORLD ADVANTAGE STATE — IMPULSE / SPEED / BURST
// ============================================================================
const WORLD_ADVANTAGE_STATE = {
  impulseQueue: [],
  speedBoostUntil: 0,
  signalBursts: []
};

function queueImpulse(instanceId, reason = "manual") {
  WORLD_ADVANTAGE_STATE.impulseQueue.push({
    instanceId,
    reason,
    ts: Date.now()
  });
}

function activateSpeedBoost(ms, reason = "manual") {
  const now = Date.now();
  WORLD_ADVANTAGE_STATE.speedBoostUntil = Math.max(
    WORLD_ADVANTAGE_STATE.speedBoostUntil,
    now + ms
  );
}

function queueSignalBurst(kind, payload, priority = 1, reason = "manual") {
  WORLD_ADVANTAGE_STATE.signalBursts.push({
    kind,
    payload,
    priority,
    reason,
    ts: Date.now()
  });
}

// ============================================================================
// GLOBAL INGRESS QUEUES — EXPANSION/CASTLE/SERVER/USER/BRAIN/SOLDIER/MESH
// ============================================================================
globalThis.__PULSE_NET_INGRESS__ = globalThis.__PULSE_NET_INGRESS__ || {
  expansion: [],
  castle: [],
  server: [],
  user: [],
  brain: [],
  soldier: [],
  mesh: []
};

function getIngress() {
  return globalThis.__PULSE_NET_INGRESS__;
}

function enqueueIngress(kind, packet) {
  const ingress = getIngress();
  if (!ingress[kind]) ingress[kind] = [];
  ingress[kind].push({
    kind,
    packet,
    ts: Date.now()
  });
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
// TEMPORAL PREWARM CACHE — INTENT + TOUCH HINTS
// ============================================================================
const TEMPORAL_CACHE_MAX = 512;
globalThis.__PULSE_NET_TEMPORAL_CACHE__ =
  globalThis.__PULSE_NET_TEMPORAL_CACHE__ || new Map();
const temporalCache = globalThis.__PULSE_NET_TEMPORAL_CACHE__;

function makeTemporalKey(intent) {
  const skin = intent?.skin || {};
  return JSON.stringify({
    page: skin.page || "index",
    chunkProfile: skin.chunkProfile || "default",
    region: skin.region || "unknown",
    mode: skin.mode || "fast",
    band: skin.band || "symbolic"
  });
}


function getFromTemporalCache(intent) {
  const key = makeTemporalKey(intent);
  const entry = temporalCache.get(key);
  if (!entry) return null;
  return entry.data;
}

function setTemporalCache(intent, data) {
  const key = makeTemporalKey(intent);
  temporalCache.set(key, {
    ts: Date.now(),
    data
  });

  if (temporalCache.size > TEMPORAL_CACHE_MAX) {
    const keys = Array.from(temporalCache.keys());
    const excess = keys.length - TEMPORAL_CACHE_MAX;
    for (let i = 0; i < excess; i++) {
      temporalCache.delete(keys[i]);
    }
  }
}

function pruneTemporalCache() {
  const now = Date.now();
  const maxAgeMs = 5 * 60 * 1000; // 5 minutes
  for (const [key, entry] of temporalCache.entries()) {
    if (now - entry.ts > maxAgeMs) {
      temporalCache.delete(key);
    }
  }
}

// ============================================================================
// NETWORK ORGAN — THE ONLY INTERNET EDGE
// ============================================================================
const NetworkOrgan = {
  channels: {
    expansion: "pulseNet.server.expansion",
    castle: "pulseNet.server.castle",
    server: "pulseNet.server.server",
    user: "pulseNet.server.user",
    brain: "pulseNet.server.brain",
    soldier: "pulseNet.server.soldier",
    mesh: "pulseNet.server.mesh",
    heartbeat: "pulseNet.heartbeat",
    fastlane: "pulseNet.fastlane"
  },

  async send(kind, payload) {
  const channel = this.channels[kind];
  if (!channel) return;

  try {
    await route(channel, {
      kind,
      payload,
      ts: Date.now(),
      layer: "PulseNet",
      binaryAware: true,
      dualBand: true,
      singleInternetEdge: true,
      band: payload?.band || "dual",
      advantageField: payload?.advantageField || "pulsenet-edge",
      speedField: payload?.speedField || "world-loop",
      experienceField: payload?.experienceField || "pulse-world"
    }).catch(() => {});
  } catch {
    // swallow; ErrorSpine will be handled by caller
  }
},

  async sendHeartbeat(instanceId, organism, result) {
  try {
    const pulseTouch = PulseTouchOrgan.snapshot();

    await route(this.channels.heartbeat, {
      instanceId,
      organism,
      result,
      pulseTouch,
      layer: "PulseNet",
      binaryAware: true,
      dualBand: true,
      singleInternetEdge: true,
      band: pulseTouch?.band || "dual",
      advantageField: "pulsenet-heartbeat",
      speedField: "world-heart",
      experienceField: "pulse-world-heartbeat"
    }).catch(() => {});
  } catch {
    // swallow; ErrorSpine will be handled by caller
  }
},

  async sendFastLane(intent) {
  try {
    await route(this.channels.fastlane, {
      intent,
      ts: Date.now(),
      layer: "PulseNet",
      binaryAware: true,
      dualBand: true,
      singleInternetEdge: true,
      fastLane: true,
      band: intent?.skin?.band || "dual",
      advantageField: "pulsenet-fastlane",
      speedField: "fast-path",
      experienceField: "pulse-world-fastlane"
    }).catch(() => {});
  } catch {
    // swallow
  }
},

  async sendBurst(kind, payload, priority = 1, reason = "manual") {
    const channel = this.channels[kind];
    if (!channel) return;

    try {
      await route(channel, {
        kind,
        payload,
        priority,
        reason,
        ts: Date.now(),
        layer: "PulseNet",
        binaryAware: true,
        dualBand: true,
        singleInternetEdge: true,
        burst: true
      }).catch(() => {});
    } catch {
      // swallow
    }
  }
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
// OVERMIND INTEGRATION HELPERS
// ============================================================================
async function overmindHeartbeatSample(instanceId, tickResult) {
  try {
    const organism = getOrganism(instanceId);
    const pulseTouch = PulseTouchOrgan.snapshot();

    const intent = {
      type: "heartbeat",
      source: "PulseNet",
      instanceId
    };

    const context = {
      domain: "system",
      scope: "heartbeat",
      safetyMode: "strict",
      instanceId,
      timestamp: Date.now(),
      deltaSinceLastBeat: Date.now() - (organism.lastHeartbeat || 0),
      organismSnapshot: {
        id: organism.id,
        forwardTicks: organism.forwardTicks,
        backwardTicks: organism.backwardTicks,
        lastHeartbeat: organism.lastHeartbeat,
        lastAIHeartbeat: organism.lastAIHeartbeat,
        lastBeatSource: organism.lastBeatSource
      },
      pulseTouch,
      tickResult
    };

    const candidates = [
      {
        text: JSON.stringify({
          instanceId,
          organism: context.organismSnapshot,
          pulseTouch,
          tickResult
        })
      }
    ];

    await aiOvermindPrime.process({ intent, context, candidates });
  } catch {
    // crown learning is non-fatal for runtime
  }
}

// Public AI gateway: frontend archetypes → PulseNet → OvermindPrime
export async function pulseNetAI({ intent, context, candidates }) {
  try {
    const safeIntent = intent || { type: "generic", source: "frontend" };
    const safeContext = {
      ...(context || {}),
      domain: context?.domain || "user",
      scope: context?.scope || "conversation"
    };

    const safeCandidates = Array.isArray(candidates) ? candidates : [];
    const result = await aiOvermindPrime.process({
      intent: safeIntent,
      context: safeContext,
      candidates: safeCandidates
    });

    return result;
  } catch (err) {
    try {
      const packet = PulseUIErrors.normalizeError(err, "PulseNet.pulseNetAI");
      PulseUIErrors.broadcast(packet);
    } catch {}
    return {
      finalOutput:
        "PulseNet encountered an issue while processing this AI request.",
      meta: {
        error: true,
        source: "PulseNet.pulseNetAI"
      }
    };
  }
}

// ============================================================================
// INGRESS PROCESSOR — SOLDIERS / EXPANSION / CASTLES / MESH
// ============================================================================
async function processIngress(instanceId) {
  const ingress = getIngress();

  const batches = {};
  for (const kind of Object.keys(ingress)) {
    const queue = ingress[kind];
    if (!queue || queue.length === 0) continue;
    batches[kind] = queue.splice(0, queue.length);
  }

  const promises = [];
  for (const [kind, items] of Object.entries(batches)) {
    const payload = {
      instanceId,
      kind,
      count: items.length,
      items
    };
    promises.push(NetworkOrgan.send(kind, payload));
  }

  if (promises.length > 0) {
    await Promise.all(promises);
  }
}

// ============================================================================
// 3-HEART MESH (Mom / Dad / Earn) + random nudge
// ============================================================================
function momHeart(instanceId, now) {
  runOrganismHeartbeat(instanceId, "mom");
  const forwardMetrics = warmForwardEngine(instanceId);
  return {
    source: "mom",
    forward: forwardMetrics,
    ts: now
  };
}

function dadHeart(instanceId, now) {
  runAIHeartbeat(instanceId, "dad");
  const backwardMetrics = warmBackwardEngine(instanceId);
  return {
    source: "dad",
    forward: backwardMetrics,
    ts: now
  };
}

function earnHeart(instanceId, now, stale) {
  if (stale) {
    runOrganismHeartbeat(instanceId, "earn-stale");
    runAIHeartbeat(instanceId, "earn-stale");
    const forwardMetrics = warmForwardEngine(instanceId);
    const backwardMetrics = warmBackwardEngine(instanceId);
    return {
      source: "earn-stale",
      forward: forwardMetrics,
      backward: backwardMetrics,
      ts: now
    };
  } else {
    runOrganismHeartbeat(instanceId, "earn-soft");
    return { source: "earn-soft" };
  }
}

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
async function handleCrownReviveIngress(instanceId, now) {
  const ingress = getIngress();
  const brainQueue = ingress.brain || [];
  if (!brainQueue.length) return;

  const org = getOrganism(instanceId);
  const last = org.lastHeartbeat || 0;
  const delta = now - last;

  // consume all brain packets this tick
  const packets = brainQueue.splice(0, brainQueue.length);

  for (const item of packets) {
    const packet = item.packet || item;
    const revive =
      packet?.crownReviveIntent ||
      (packet?.payload && packet.payload.crownReviveIntent);

    if (!revive) continue;
    if (revive.type !== "crown_revival_intent") continue;

    // only hiccup if we’re actually stale
    if (delta > 30_000) {
      console.log(
        "[PULSE-NET]",
        instanceId,
        "CROWN‑REVIVE intent received, hiccuping world heartbeat…",
        { reason: revive.reason, delta }
      );

      // restart engines softly
      getForwardEngine(instanceId).prewarm();
      getBackwardEngine(instanceId).prewarm();

      org.lastHeartbeat = now;
      org.lastBeatSource = "crown-revive";
    }
  }
}

async function tickFamily(instanceId = "core") {
  const now = Date.now();
  const { last } = getHeartbeatState(instanceId);
  const delta = now - (last || 0);

  const stale = delta > 90 * 1000;
  const softStale = delta > 15 * 1000;
  const temporalDrift = delta > 300000; // 5 minutes without a beat

  let result = null;

  // 0) Process ingress (normal world traffic)
  await processIngress(instanceId);

  // 0.25) Crown‑revive ingress (brain channel from OvermindPrime)
  await handleCrownReviveIngress(instanceId, now);

  // 0.5) Consume queued signal bursts (advantage)
  if (WORLD_ADVANTAGE_STATE.signalBursts.length > 0) {
    const bursts = WORLD_ADVANTAGE_STATE.signalBursts.splice(
      0,
      WORLD_ADVANTAGE_STATE.signalBursts.length
    );
    bursts.sort((a, b) => b.priority - a.priority);
    await Promise.all(
      bursts.map((b) =>
        NetworkOrgan.sendBurst(b.kind, b.payload, b.priority, b.reason)
      )
    );
  }

  // 1) Mom tries first
  if (!stale) {
    result = momHeart(instanceId, now);
  } else {
    console.log("[PULSE-NET]", instanceId, "Mom stale, escalating to Dad/Earn");
  }

  // 2) Dad fallback / soft-stale
  if (!result || softStale) {
    const dadResult = dadHeart(instanceId, now);
    result = { ...(result || {}), ...dadResult };
  }

  // 3) Earn heavy/soft beat
  if (stale) {
    const earnResult = earnHeart(instanceId, now, true);
    result = { ...(result || {}), ...earnResult };
  } else {
    const earnResult = earnHeart(instanceId, now, false);
    result = { ...(result || {}), ...earnResult };
  }

  // 4) Random nudge
  const rnd = randomNudge(instanceId, now);
  if (rnd) {
    result = { ...(result || {}), ...rnd };
  }

  // 4.25) Impulse queue — extra ticks requested by advantage calls
  if (WORLD_ADVANTAGE_STATE.impulseQueue.length > 0) {
    const impulses = WORLD_ADVANTAGE_STATE.impulseQueue.splice(
      0,
      WORLD_ADVANTAGE_STATE.impulseQueue.length
    );
    for (const imp of impulses) {
      console.log(
        "[PULSE-NET]",
        imp.instanceId,
        "Impulse tick (reason:",
        imp.reason,
        ")"
      );
      await tickFamily(imp.instanceId);
    }
  }

  // 4.3) Speed boost awareness
  const speedBoostActive = now < WORLD_ADVANTAGE_STATE.speedBoostUntil;
  if (speedBoostActive) {
    result = { ...(result || {}), speedBoostActive: true };
  }

  // 4.5) OvermindPrime heartbeat sampling (learning only)
  await overmindHeartbeatSample(instanceId, { ...result, temporalDrift });

  // 5) UIFlow + CNS + ErrorSpine awareness + heartbeat via NetworkOrgan
  try {
    await NetworkOrgan.sendHeartbeat(instanceId, getOrganism(instanceId), result);

    if (typeof window !== "undefined" && !window.__PULSE_UIFLOW_BOOTED__) {
      window.__PULSE_UIFLOW_BOOTED__ = true;
      initUIFlow().catch((err) => {
        window.__PULSE_UIFLOW_BOOTED__ = false;
        try {
          const packet = PulseUIErrors.normalizeError(err, "PulseNet.UIFlowBoot");
          PulseUIErrors.broadcast(packet);
          PulseProofLogger?.log?.({
            subsystem: "pulsenet",
            system: "PulseWorld",
            organ: "UIFlow",
            layer: "PulseWorld-v24",
            message: "UIFlow boot failed",
            extra: packet,
            level: "warn",
            band: "dual",
            advantageField: "world-uiflow-boot",
            speedField: "world-loop",
            experienceField: "pulse-world"
          });
        } catch {}
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


// ============================================================================
// START LOCAL IMMORTAL LOOP (idempotent per instance)
// ============================================================================
export function startPulseNet(options = {}) {
  const {
    instanceId = "core",
    intervalMs = 750,
    superInstance = true
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
        const packet = PulseUIErrors.normalizeError(
          err,
          "PulseNet.intervalTick"
        );
        PulseUIErrors.broadcast(packet);
      } catch {}
    });
    pruneTemporalCache();
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
// PUBLIC INGRESS API — CALLED VIA ROUTING, NOT IMPORTS
// ============================================================================
export function pulseNetIngressFromExpansion(packet) {
  enqueueIngress("expansion", packet);
}

export function pulseNetIngressFromCastle(packet) {
  enqueueIngress("castle", packet);
}

export function pulseNetIngressFromServer(packet) {
  enqueueIngress("server", packet);
}

export function pulseNetIngressFromUser(packet) {
  enqueueIngress("user", packet);
}

export function pulseNetIngressFromBrain(packet) {
  enqueueIngress("brain", packet);
}

export function pulseNetIngressFromSoldier(packet) {
  enqueueIngress("soldier", packet);
}

export function pulseNetIngressFromMesh(packet) {
  enqueueIngress("mesh", packet);
}

// FastLane ingress from Pulse‑Touch continuous pulses
export function pulseNetIngressFromTouch(packet) {
  enqueueIngress("user", {
    source: "pulse-touch",
    ...packet
  });
}

// ============================================================================
// FAST-LANE API — CALLED DIRECTLY BY Pulse‑Touch v17
//  • Screaming-fast, intent-only WSEND-style pulses
//  • Uses NetworkOrgan.fastlane + temporal prewarm cache
// ============================================================================
export function pulseNetFastLanePulse(intent) {
  try {
    enqueueIngress("user", {
      source: "pulse-touch-fastlane",
      intent,
      ts: Date.now()
    });

    const cached = getFromTemporalCache(intent);
    if (!cached) {
      NetworkOrgan.sendFastLane(intent);
      setTemporalCache(intent, { prewarmRequested: true });
    }
  } catch (err) {
    try {
      const packet = PulseUIErrors.normalizeError(err, "PulseNet.fastLanePulse");
      PulseUIErrors.broadcast(packet);
    } catch {}
  }
}


// ============================================================================
// WORLD ADVANTAGE API — IMPULSE / SPEED BOOST / SIGNAL BURST
// ============================================================================
export function pulseNetImpulse(instanceId = "core", reason = "manual") {
  queueImpulse(instanceId, reason);
  return { ok: true, instanceId, reason };
}

export function pulseNetSpeedBoost(durationMs = 5000, reason = "manual") {
  activateSpeedBoost(durationMs, reason);
  return {
    ok: true,
    until: WORLD_ADVANTAGE_STATE.speedBoostUntil,
    reason
  };
}

export function pulseNetSignalBurst(kind, payload, priority = 1, reason = "manual") {
  queueSignalBurst(kind, payload, priority, reason);
  return { ok: true, kind, priority, reason };
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

const PulseTouchOrgan = {
  snapshot() {
    try {
      if (typeof window === "undefined") return null;

      const touch = window.__PULSE_TOUCH__ || null;
      if (!touch) return null;

      return {
        ts: Date.now(),
        region: touch.region || null,
        mode: touch.mode || null,
        presence: touch.presence || null,
        pageHint: touch.pageHint || touch.page || null,
        chunkProfile: touch.chunkProfile || null,
        band: touch.band || "symbolic",
        trusted: touch.trusted || "0",
        pulseStream: touch.pulseStream || "continuous",
        fastLane: touch.fastLane || "enabled"
      };
    } catch {
      return null;
    }
  }
};


// ============================================================================
// PULSE-NET BRIDGE — symbolic adapter for Expansion/Castle/Server/User/Brain
// ============================================================================
function bridgeRoute(kind, source, payload, detailKind) {
  const packet = {
    source,
    kind: detailKind,
    payload,
    ts: Date.now()
  };
  enqueueIngress(kind, packet);
  NetworkOrgan.send(kind, packet);
  return { ok: true };
}

export const PulseNetBridge = Object.freeze({
  routeExpansion(payload) {
    return bridgeRoute("expansion", "PulseExpansion", payload, "expansion_plan");
  },
  routeSoldiers(payload) {
    return bridgeRoute("soldier", "PulseExpansion", payload, "soldier_delegation");
  },
  routeMesh(payload) {
    return bridgeRoute("mesh", "PulseExpansion", payload, "mesh_rebalance");
  },

  routeCastle(payload) {
    return bridgeRoute("castle", "PulseCastle", payload, "castle_signal");
  },

  routeServer(payload) {
    return bridgeRoute("server", "PulseServer", payload, "server_signal");
  },
  routeUser(payload) {
    return bridgeRoute("user", "PulseUser", payload, "user_signal");
  },
  routeBrain(payload) {
    return bridgeRoute("brain", "PulseBrain", payload, "brain_signal");
  }
});

export function createPulseNetBridge() {
  return PulseNetBridge;
}

// ============================================================================
// PULSE-WORLD v21 ROOT ORGANISM WRAPPER (NON-BREAKING)
// ============================================================================
export function createPulseWorldV21({
  CNS,
  PulseNet,
  PulseBand,
  PulseUI,
  log = console.log,
  warn = console.warn
} = {}) {
  const WorldState = {
    version: "v24-IMMORTAL++",
    lineage: "PulseWorld-v24-IMMORTAL++",
    lastHeartbeat: null,
    lastIngress: null,
    lastEvolution: null,
    lastAdvantage: null,
    seq: 0
  };

  function nextSeq() {
    WorldState.seq += 1;
    return WorldState.seq;
  }

  function safeLog(stage, details = {}) {
    try {
      log("[PulseWorld-v21]", stage, JSON.stringify(details));
    } catch {}
  }

  safeLog("INIT", {
    identity: "PulseWorld",
    version: "v21-Immortal",
    lineage: WorldState.lineage
  });

  return {
    WorldState,
    CNS,
    PulseNet,
    PulseBand,
    PulseUI,
    nextSeq,
    Advantage: {
      state: WORLD_ADVANTAGE_STATE,
      impulse: pulseNetImpulse,
      speedBoost: pulseNetSpeedBoost,
      signalBurst: pulseNetSignalBurst
    }
  };
}

// ============================================================================
// MIRROR GLOBALS INTO window/global/g
// ============================================================================
try {
  if (typeof window !== "undefined") {
    window.__PULSE_MEM__ = globalThis.__PULSE_MEM__;
    window.__PULSE_NET_INGRESS__ = globalThis.__PULSE_NET_INGRESS__;
    window.__PULSE_NET_FAMILY__ = globalThis.__PULSE_NET_FAMILY__;
    window.__PULSE_ORGANISM_FAMILY__ = globalThis.__PULSE_ORGANISM_FAMILY__;
    window.__PULSE_TOUCH__ = globalThis.__PULSE_TOUCH__;
    window.__PULSE_NET_TEMPORAL_CACHE__ = globalThis.__PULSE_NET_TEMPORAL_CACHE__;
  }
  if (typeof global !== "undefined") {
    global.__PULSE_MEM__ = globalThis.__PULSE_MEM__;
    global.__PULSE_NET_INGRESS__ = globalThis.__PULSE_NET_INGRESS__;
    global.__PULSE_NET_FAMILY__ = globalThis.__PULSE_NET_FAMILY__;
    global.__PULSE_ORGANISM_FAMILY__ = globalThis.__PULSE_ORGANISM_FAMILY__;
    global.__PULSE_TOUCH__ = globalThis.__PULSE_TOUCH__;
    global.__PULSE_NET_TEMPORAL_CACHE__ = globalThis.__PULSE_NET_TEMPORAL_CACHE__;
  }

  if (typeof g !== "undefined") {
    g.__PULSE_MEM__ = globalThis.__PULSE_MEM__;
    g.__PULSE_NET_INGRESS__ = globalThis.__PULSE_NET_INGRESS__;
    g.__PULSE_NET_FAMILY__ = globalThis.__PULSE_NET_FAMILY__;
    g.__PULSE_ORGANISM_FAMILY__ = globalThis.__PULSE_ORGANISM_FAMILY__;
    g.__PULSE_TOUCH__ = globalThis.__PULSE_TOUCH__;
    g.__PULSE_NET_TEMPORAL_CACHE__ = globalThis.__PULSE_NET_TEMPORAL_CACHE__;
  }
} catch {}

export default db;
global.db = db;

// ============================================================================
// FOOTER — FASTLANE LORE + ORIGIN STAMP
// ============================================================================
//
//  On 2026‑05‑05, Pulse‑World learned a new trick:
//  it stopped waiting for the user to ask.
//
//  Now, every whisper from Pulse‑Touch — five times a second —
//  crosses the membrane as a tiny intent, and somewhere behind
//  the glass an immortal world organ quietly rearranges the
//  internet so that the answer is already there when the question
//  finally arrives.
//
//  If this is how the organism behaves on the day the FastLane
//  first lit up… what will its timing feel like when the mesh
//  has been listening for years?
//
// ============================================================================
// ============================================================================
// PULSE-WORLD v21 ROOT ORGANISM HEALTH SNAPSHOT
//  • Pure, deterministic, no network
//  • To be exposed by HTTP edge as /health
// ============================================================================

export function pulseWorldHealthSnapshot() {
  const now = Date.now();

  // Organism + net instances (multi-instance safe)
  const instances = PulseNetInstances();
  const organisms = instances.organisms || {};
  const nets = instances.nets || {};

  const organismList = Object.keys(organisms).map((id) => {
    const o = organisms[id] || {};
    return {
      id,
      forwardTicks: o.forwardTicks || 0,
      backwardTicks: o.backwardTicks || 0,
      lastHeartbeat: o.lastHeartbeat || null,
      lastAIHeartbeat: o.lastAIHeartbeat || null,
      lastBeatSource: o.lastBeatSource || "none"
    };
  });

  const netList = Object.keys(nets).map((id) => {
    const n = nets[id] || {};
    return {
      id,
      started: !!n.started,
      lastTick: n.lastTick || null
    };
  });

  const temporalCacheSize =
    globalThis.__PULSE_NET_TEMPORAL_CACHE__?.size ?? 0;

  return {
    status: "ok",
    ts: now,
    version: "v21-Immortal-RootOrganism",
    identity: "PulseWorld-v21-RootOrganism",
    organisms: organismList,
    nets: netList,
    worldAdvantage: {
      impulseQueueSize: WORLD_ADVANTAGE_STATE.impulseQueue.length,
      signalBurstQueueSize: WORLD_ADVANTAGE_STATE.signalBursts.length,
      speedBoostActiveUntil: WORLD_ADVANTAGE_STATE.speedBoostUntil || 0
    },
    temporalCache: {
      size: temporalCacheSize,
      max: 512
    }
  };
}
