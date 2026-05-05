// ============================================================================
//  aiHeartbeat.js — Pulse OS v16‑IMMORTAL++
//  Mom/Dad/Earn Tri‑Heart • Dual‑Band Liveness • Bi‑Directional Fallback
//  PURE LIVENESS. ZERO MUTATION OF INPUT. GLOBAL KEYS ONLY FOR LIVENESS.
// ============================================================================

/*
AI_EXPERIENCE_META = {
  identity: "aiHeartbeat",
  version: "v16-Immortal++",
  layer: "ai_core",
  role: "ai_heartbeat",
  lineage: "aiHeartbeat-v9 → v11 → v14-Immortal → v16-Immortal++",

  evo: {
    heartbeat: true,
    symbolicPulse: true,
    binaryPulse: true,
    dualBand: true,
    symbolicPrimary: true,
    binaryAware: true,

    deterministic: true,
    driftProof: true,
    pureCompute: true,
    zeroNetwork: true,
    zeroFilesystem: true,
    zeroMutationOfInput: true,

    momAware: true,
    dadAware: true,
    earnAware: true,
    triHeartAware: true,
    arteryAware: true,
    packetAware: true,
    windowAware: true
  },

  contract: {
    always: ["aiEngine", "aiCortex", "aiBinaryOrganRegistry"],
    never: ["safeRoute", "fetchViaCNS"]
  }
}
*/

export const AI_HEARTBEAT_META = Object.freeze({
  layer: "PulseAIHeartbeat",
  role: "HEARTBEAT_ORGAN",
  version: "v16-Immortal++",
  identity: "aiHeartbeat-v16-Immortal++",

  evo: Object.freeze({
    driftProof: true,
    deterministic: true,
    dualband: true,
    packetAware: true,
    evolutionAware: true,
    windowAware: true,
    bluetoothReady: true,

    binaryAware: true,
    symbolicAware: true,
    metabolicAware: true,
    livenessAware: true,
    cooldownAware: true,
    fallbackAware: true,
    concurrencyAware: true,
    arteryAware: true,

    momAware: true,
    dadAware: true,
    earnAware: true,
    triHeartAware: true,

    multiInstanceReady: true,
    epoch: "16-Immortal++"
  }),

  contract: Object.freeze({
    purpose:
      "Maintain dual-band liveness as an independent pacer, exposing bi-directional fallback surfaces for mom/dad/earn/baby.",

    never: Object.freeze([
      "mutate external systems",
      "override cortex decisions",
      "override router decisions",
      "bypass metabolic safety",
      "spawn multiple organisms",
      "perform cognition",
      "perform analysis",
      "alter organism state",
      "auto-connect bluetooth"
    ]),

    always: Object.freeze([
      "respect binary metabolic pressure",
      "respect artery load",
      "respect cooldown windows",
      "skip ticks when unsafe",
      "run cortex/nervous/router pulses safely",
      "fallback when idle too long",
      "log deterministic steps",
      "return frozen state",
      "prepare for future packet-bus liveness",
      "expose mom/dad/earn liveness fields for organism/earn"
    ])
  })
});

// ============================================================================
//  PACKET EMITTER — deterministic, heartbeat-scoped
// ============================================================================
function emitHeartbeatPacket(type, payload) {
  return Object.freeze({
    meta: AI_HEARTBEAT_META,
    packetType: `ai-heartbeat-${type}`,
    timestamp: Date.now(),
    epoch: AI_HEARTBEAT_META.evo.epoch,
    ...payload
  });
}

// ============================================================================
//  DEPENDENCIES
// ============================================================================
import { createBrainstem } from "./aiBrainstem-v16.js";
import {
  getDb,
  getFsAPI,
  getRouteAPI,
  getSchemaAPI,
  getOrganismSnapshot
} from "./aiDeps-v16.js";

// ============================================================================
//  CONFIG — metabolic‑safe cadence
// ============================================================================
const AI_MIN_GAP_MS    = 1400;
const AI_MAX_IDLE_MS   = 12000;
const AI_TIME_CHECK_MS = 4000;

// Mom heartbeat awareness (diagnostic + pulse-fallback surface)
// Mom is default, primary heartbeat.
const PRIMARY_HEARTBEAT_KEY      = "PulseProxyHeartbeatLastBeatAt";
const PRIMARY_MAX_SILENCE_MS     = 60_000;

// Dad heartbeat visibility (for mom/baby)
const AI_HEARTBEAT_KEY           = "PulseAIHeartbeatLastBeatAt";

// Earn heartbeat visibility (child heartbeat, used as backup by both)
const EARN_HEARTBEAT_KEY         = "PulseEarnHeartbeatLastBeatAt";
const EARN_MAX_SILENCE_MS        = 45_000;

// ============================================================================
//  SINGLETON — one organism per warm container
// ============================================================================
let aiOrganism = null;
let aiBusy = false;
let lastRun = 0;
let aiTimeFallbackTimer = null;

// v16‑IMMORTAL++: heartbeat artery metrics (packet‑aware, tri‑heart)
const heartbeatArtery = {
  ticks: 0,
  pulses: 0,
  skips: 0,
  lastReason: "none",
  lastPressure: 0,
  lastLoad: 0,
  lastPrimaryState: "unknown",
  lastDadState: "unknown",
  lastEarnState: "unknown",
  snapshot() {
    return Object.freeze({
      ticks: this.ticks,
      pulses: this.pulses,
      skips: this.skips,
      lastReason: this.lastReason,
      lastPressure: this.lastPressure,
      lastLoad: this.lastLoad,
      lastPrimaryState: this.lastPrimaryState,
      lastDadState: this.lastDadState,
      lastEarnState: this.lastEarnState
    });
  }
};

// Healing / diagnostics for AI heartbeat
const aiHeartbeatHealing = {
  ticks: 0,
  pulses: 0,
  skips: 0,
  lastReason: "none",
  lastError: null,
  lastExitReason: null,
  lastPacket: null,
  lastPrimaryState: "unknown",
  lastDadState: "unknown",
  lastEarnState: "unknown",
  lastIdleMs: 0,
  lastMomPulseSurface: null,
  lastEarnPulseSurface: null,
  lastRandomNudgeAt: 0
};

// ============================================================================
//  HEARTBEAT STATE HELPERS
// ============================================================================

// Mom (primary)
function isPrimaryHeartbeatInactive(now = Date.now()) {
  try {
    const last = globalThis?.[PRIMARY_HEARTBEAT_KEY] || 0;
    if (!last) return true;
    const delta = now - last;
    return delta > PRIMARY_MAX_SILENCE_MS;
  } catch {
    return true;
  }
}

function updatePrimaryStateFlag(now = Date.now()) {
  const inactive = isPrimaryHeartbeatInactive(now);
  const state = inactive ? "primary_inactive" : "primary_active";
  heartbeatArtery.lastPrimaryState = state;
  aiHeartbeatHealing.lastPrimaryState = state;
  return inactive;
}

// Dad (this AI heartbeat)
function isDadHeartbeatInactive(now = Date.now()) {
  try {
    const last = globalThis?.[AI_HEARTBEAT_KEY] || 0;
    if (!last) return true;
    const delta = now - last;
    return delta > AI_MAX_IDLE_MS;
  } catch {
    return true;
  }
}

function updateDadStateFlag(now = Date.now()) {
  const inactive = isDadHeartbeatInactive(now);
  const state = inactive ? "dad_inactive" : "dad_active";
  heartbeatArtery.lastDadState = state;
  aiHeartbeatHealing.lastDadState = state;
  return inactive;
}

// Earn (child heartbeat)
function isEarnHeartbeatInactive(now = Date.now()) {
  try {
    const last = globalThis?.[EARN_HEARTBEAT_KEY] || 0;
    if (!last) return true;
    const delta = now - last;
    return delta > EARN_MAX_SILENCE_MS;
  } catch {
    return true;
  }
}

function updateEarnStateFlag(now = Date.now()) {
  const inactive = isEarnHeartbeatInactive(now);
  const state = inactive ? "earn_inactive" : "earn_active";
  heartbeatArtery.lastEarnState = state;
  aiHeartbeatHealing.lastEarnState = state;
  return inactive;
}

// ============================================================================
//  PULSE SURFACES
// ============================================================================
function buildMomPulseSurface() {
  const last = globalThis?.[PRIMARY_HEARTBEAT_KEY] || 0;
  const alive = last > 0;
  return {
    momPulseAlive: alive,
    momPulseLastBeatAt: last,
    momPulseFallbackState: alive ? "available" : "silent"
  };
}

function buildEarnPulseSurface() {
  const last = globalThis?.[EARN_HEARTBEAT_KEY] || 0;
  const alive = last > 0;
  return {
    earnPulseAlive: alive,
    earnPulseLastBeatAt: last,
    earnPulseFallbackState: alive ? "available" : "silent"
  };
}

// ============================================================================
//  PREWARM — optional, dualband-aware
// ============================================================================
export function prewarmAiHeartbeat(dualBand = null, { trace = false } = {}) {
  const pressure = dualBand?.binary?.metabolic?.pressure ?? 0;
  const packet = emitHeartbeatPacket("prewarm", {
    message: "AI heartbeat prewarmed and tri-heart liveness metrics aligned.",
    binaryPressure: pressure
  });
  aiHeartbeatHealing.lastPacket = packet;
  if (trace) console.log("[AI_HEARTBEAT] prewarm", packet);
  return packet;
}

// ============================================================================
//  BOOT — create dual‑band organism
// ============================================================================
function bootAiOrganism() {
  if (aiOrganism) return aiOrganism;

  const db = getDb();
  const fsAPI = getFsAPI();
  const routeAPI = getRouteAPI();
  const schemaAPI = getSchemaAPI();

  const request = { userId: null, personaId: null };

  aiOrganism = createBrainstem(request, db, fsAPI, routeAPI, schemaAPI);
  aiOrganism.context.logStep?.("[HEARTBEAT] Brainstem created (dual‑band).");

  lastRun = Date.now();
  return aiOrganism;
}

// ============================================================================
//  RANDOM NUDGE — soft, last-resort liveness push (no organs, no mutation)
//  Mom is default, Dad secondary, Earn tertiary — but all can use each other
//  as a reason to stay visible.
// ============================================================================
function randomHeartbeatNudge(reason = "random") {
  // ~3% chance per check
  if (Math.random() > 0.97) {
    const now = Date.now();
    try {
      if (typeof globalThis !== "undefined") {
        // Dad marks himself alive
        globalThis[AI_HEARTBEAT_KEY] = now;

        // Mom and Earn can see Dad as a reason to stay alive
        // (they will read this key as part of their own logic)
      }
    } catch {}

    aiHeartbeatHealing.lastRandomNudgeAt = now;
    aiHeartbeatHealing.lastExitReason = "random_nudge";
    aiHeartbeatHealing.lastReason = `random_nudge:${reason}`;

    const momSurface = buildMomPulseSurface();
    const earnSurface = buildEarnPulseSurface();
    aiHeartbeatHealing.lastMomPulseSurface = momSurface;
    aiHeartbeatHealing.lastEarnPulseSurface = earnSurface;

    const packet = emitHeartbeatPacket("random-nudge", {
      reason,
      randomNudgeAt: now,
      primaryState: heartbeatArtery.lastPrimaryState,
      dadState: heartbeatArtery.lastDadState,
      earnState: heartbeatArtery.lastEarnState,
      momPulseSurface: momSurface,
      earnPulseSurface: earnSurface
    });
    aiHeartbeatHealing.lastPacket = packet;

    aiOrganism?.context?.logStep?.(
      `[HEARTBEAT] Random nudge fired. reason=${reason}, primary=${heartbeatArtery.lastPrimaryState}, dad=${heartbeatArtery.lastDadState}, earn=${heartbeatArtery.lastEarnState}`
    );

    return packet;
  }

  return null;
}

// ============================================================================
//  CORE — one heartbeat tick (A‑B‑A: liveness → safety → organs → liveness)
//  Mom is default; Dad uses Mom as secondary; Earn uses Mom → Dad → self.
// ============================================================================
async function aiHeartbeatTick(reason = "unknown") {
  const now = Date.now();
  const primaryInactive = updatePrimaryStateFlag(now);
  const dadInactive = updateDadStateFlag(now);
  const earnInactive = updateEarnStateFlag(now);

  const organism = bootAiOrganism();
  const { context, organs, dualBand } = organism;

  const snapshot = getOrganismSnapshot(dualBand);
  const binaryAgent = organs.binaryAgent;
  const binaryDelta = organs.binaryDelta;

  if (binaryAgent && binaryDelta) {
    const prevSurface = aiHeartbeatHealing.lastComputeSurface || null;

    const { surface, deltaPacket } =
      binaryAgent.computeIntelligenceSnapshot(
        snapshot?.binary?.inputs || [],
        {
          gpuPressure: snapshot?.binary?.gpu?.pressure ?? 0,
          gpuLoad: snapshot?.binary?.gpu?.load ?? 0,
          gpuUtil: snapshot?.binary?.gpu?.util ?? 0
        },
        prevSurface
      );

    aiHeartbeatHealing.lastComputeSurface = surface;
    aiHeartbeatHealing.lastComputeDeltaPacket = deltaPacket || null;
  }
  // Build mom compute surface (symbolic heart → presence only)
  const momComputeSurface = {
    pressure: 0,
    load: 0,
    advantage: 0,
    speed: 0,
    pressureBucket: "none",
    loadBucket: "none",
    advantageBucket: "none",
    speedBucket: "none",
    gpuPressure: 0,
    gpuLoad: 0,
    gpuUtil: 0,
    present: heartbeatArtery.lastPrimaryState === "alive",
    capacity: 1,
    capacityBucket: "high",
    cortexId: "mom",
    triHeartId: "mom",
    epoch: "v16-Immortal",
    band: "symbolic"
  };

  // Build earn compute surface (earn heart → presence only)
  const earnComputeSurface = {
    pressure: 0,
    load: 0,
    advantage: 0,
    speed: 0,
    pressureBucket: "none",
    loadBucket: "none",
    advantageBucket: "none",
    speedBucket: "none",
    gpuPressure: 0,
    gpuLoad: 0,
    gpuUtil: 0,
    present: heartbeatArtery.lastEarnState === "alive",
    capacity: 1,
    capacityBucket: "high",
    cortexId: "earn",
    triHeartId: "earn",
    epoch: "v16-Immortal",
    band: "symbolic"
  };

  if (binaryDelta && aiHeartbeatHealing.lastTriHeartCompute) {
    const triPrev = aiHeartbeatHealing.lastTriHeartCompute;
    const triNext = {
      mom: momComputeSurface,
      dad: aiHeartbeatHealing.lastComputeSurface,
      earn: earnComputeSurface
    };

    const triDeltaPacket = binaryDelta.triHeartComputeDelta(triPrev, triNext);
    aiHeartbeatHealing.lastTriHeartComputeDelta = triDeltaPacket;

    aiHeartbeatHealing.lastTriHeartCompute = triNext;
  }

  const pressure = snapshot?.binary?.metabolic?.pressure ?? 0;
  const load     = snapshot?.binary?.metabolic?.load ?? 0;

  heartbeatArtery.lastReason = reason;
  heartbeatArtery.lastPressure = pressure;
  heartbeatArtery.lastLoad = load;

  // A — Safety envelope (cooldown / concurrency / pressure)
  if (now - lastRun < AI_MIN_GAP_MS) {
    heartbeatArtery.skips++;
    aiHeartbeatHealing.skips++;
    heartbeatArtery.lastReason = `cooldown:${reason}`;
    aiHeartbeatHealing.lastReason = `cooldown:${reason}`;

    context.logStep?.(
      `[HEARTBEAT] Skipped (cooldown). reason=${reason}, delta=${now - lastRun}ms`
    );
    const packet = emitHeartbeatPacket("tick-skip", {
      reason: "cooldown",
      deltaMs: now - lastRun,
      pressure,
      load,
      primaryState: heartbeatArtery.lastPrimaryState,
      dadState: heartbeatArtery.lastDadState,
      earnState: heartbeatArtery.lastEarnState
    });
    aiHeartbeatHealing.lastPacket = packet;

    randomHeartbeatNudge("cooldown");
    return;
  }

  if (aiBusy) {
    heartbeatArtery.skips++;
    aiHeartbeatHealing.skips++;
    heartbeatArtery.lastReason = `busy:${reason}`;
    aiHeartbeatHealing.lastReason = `busy:${reason}`;

    context.logStep?.(`[HEARTBEAT] Skipped (busy). reason=${reason}`);
    const packet = emitHeartbeatPacket("tick-skip", {
      reason: "busy",
      pressure,
      load,
      primaryState: heartbeatArtery.lastPrimaryState,
      dadState: heartbeatArtery.lastDadState,
      earnState: heartbeatArtery.lastEarnState
    });
    aiHeartbeatHealing.lastPacket = packet;

    randomHeartbeatNudge("busy");
    return;
  }

  if (pressure >= 0.85) {
    heartbeatArtery.skips++;
    aiHeartbeatHealing.skips++;
    heartbeatArtery.lastReason = `pressure:${reason}`;
    aiHeartbeatHealing.lastReason = `pressure:${reason}`;

    context.logStep?.(
      `[HEARTBEAT] Skipped (binary pressure=${pressure}). reason=${reason}`
    );
    const packet = emitHeartbeatPacket("tick-skip", {
      reason: "pressure",
      pressure,
      load,
      primaryState: heartbeatArtery.lastPrimaryState,
      dadState: heartbeatArtery.lastDadState,
      earnState: heartbeatArtery.lastEarnState
    });
    aiHeartbeatHealing.lastPacket = packet;

    randomHeartbeatNudge("pressure");
    return;
  }

  // B — Commit tick
  aiBusy = true;
  lastRun = now;
  heartbeatArtery.ticks++;
  aiHeartbeatHealing.ticks++;

  // Mark Dad as alive for mom/earn
  try {
    if (typeof globalThis !== "undefined") {
      globalThis[AI_HEARTBEAT_KEY] = now;
    }
  } catch {}

  const startPacket = emitHeartbeatPacket("tick-start", {
    reason,
    pressure,
    load,
    primaryState: heartbeatArtery.lastPrimaryState,
    dadState: heartbeatArtery.lastDadState,
    earnState: heartbeatArtery.lastEarnState
  });
  aiHeartbeatHealing.lastPacket = startPacket;

  context.logStep?.(
    `[HEARTBEAT] Tick start. reason=${reason}, pressure=${pressure}, load=${load}, primary=${heartbeatArtery.lastPrimaryState}, dad=${heartbeatArtery.lastDadState}, earn=${heartbeatArtery.lastEarnState}`
  );

  try {
    // A — Dual‑band organs
    if (organs.cortex?.run)    await organs.cortex.run();
    if (organs.nervous?.pulse) await organs.nervous.pulse();
    if (organs.router?.scan)   await organs.router.scan();

    // B — Symbolic organs
    if (organs.evolution?.run)    await organs.evolution.run();
    if (organs.environment?.scan) await organs.environment.scan?.();
    if (organs.power?.update)     await organs.power.update?.();

    // A — Close tick
    context.logStep?.("[HEARTBEAT] Tick complete.");
    const completePacket = emitHeartbeatPacket("tick-complete", {
      reason,
      pressure,
      load,
      primaryState: heartbeatArtery.lastPrimaryState,
      dadState: heartbeatArtery.lastDadState,
      earnState: heartbeatArtery.lastEarnState
    });
    aiHeartbeatHealing.lastPacket = completePacket;
    aiHeartbeatHealing.lastExitReason = "ok";
  } catch (err) {
    console.error("[HEARTBEAT] Tick error:", err);
    context.logStep?.(`[HEARTBEAT] Error: ${err.message}`);

    const momPulseSurface = buildMomPulseSurface();
    const earnPulseSurface = buildEarnPulseSurface();
    aiHeartbeatHealing.lastMomPulseSurface = momPulseSurface;
    aiHeartbeatHealing.lastEarnPulseSurface = earnPulseSurface;

    // Fallback priority for Earn:
    // Earn uses Mom → Dad → self.
    // For Dad (this organ), we treat:
    // 1) Mom alive → fallback to mom pulse
    // 2) Earn alive → fallback to earn pulse
    // 3) Otherwise → error + random nudge

    if (momPulseSurface.momPulseAlive) {
      const fallbackPacket = emitHeartbeatPacket("tick-fallback-mom-pulse", {
        reason,
        momPulseFallback: true,
        momPulseLastBeatAt: momPulseSurface.momPulseLastBeatAt,
        primaryState: heartbeatArtery.lastPrimaryState,
        dadState: heartbeatArtery.lastDadState,
        earnState: heartbeatArtery.lastEarnState,
        earnPulseSurface
      });
      aiHeartbeatHealing.lastPacket = fallbackPacket;
      aiHeartbeatHealing.lastError = null;
      aiHeartbeatHealing.lastExitReason = "fallback_mom_pulse";
      return fallbackPacket;
    }

    if (earnPulseSurface.earnPulseAlive) {
      const fallbackPacket = emitHeartbeatPacket("tick-fallback-earn-pulse", {
        reason,
        earnPulseFallback: true,
        earnPulseLastBeatAt: earnPulseSurface.earnPulseLastBeatAt,
        primaryState: heartbeatArtery.lastPrimaryState,
        dadState: heartbeatArtery.lastDadState,
        earnState: heartbeatArtery.lastEarnState,
        momPulseSurface
      });
      aiHeartbeatHealing.lastPacket = fallbackPacket;
      aiHeartbeatHealing.lastError = null;
      aiHeartbeatHealing.lastExitReason = "fallback_earn_pulse";
      return fallbackPacket;
    }

    const errorPacket = emitHeartbeatPacket("tick-error", {
      reason,
      error: String(err),
      pressure,
      load,
      primaryState: heartbeatArtery.lastPrimaryState,
      dadState: heartbeatArtery.lastDadState,
      earnState: heartbeatArtery.lastEarnState,
      momPulseSurface,
      earnPulseSurface
    });
    aiHeartbeatHealing.lastPacket = errorPacket;
    aiHeartbeatHealing.lastError = { message: String(err), reason };
    aiHeartbeatHealing.lastExitReason = "error";

    randomHeartbeatNudge("tick-error");
  } finally {
    aiBusy = false;
  }

  return startPacket;
}

// ============================================================================
//  PULSE ENTRY — ANY internal signal triggers a heartbeat (independent dad)
//  Now symbolic/binary aware, mode-resolved per pulse.
// ============================================================================
export function pulseAiHeartbeat(source = "unknown") {
  const now = Date.now();
  updatePrimaryStateFlag(now);
  updateDadStateFlag(now);
  updateEarnStateFlag(now);

  const mode = resolveHeartbeatMode(source);

  const organism = bootAiOrganism();
  organism.context.logStep?.(
    `[HEARTBEAT] Pulse detected from: ${
      typeof source === "string" ? source : source?.label || "unknown"
    }, mode=${mode}, primary=${heartbeatArtery.lastPrimaryState}, dad=${heartbeatArtery.lastDadState}, earn=${heartbeatArtery.lastEarnState}`
  );

  heartbeatArtery.pulses++;
  aiHeartbeatHealing.pulses++;
  aiHeartbeatHealing.lastMode = mode;
  heartbeatArtery.lastMode = mode;

  const packet = emitHeartbeatPacket("pulse", {
    source,
    mode,
    isBinary: mode === "binary" || mode === "both",
    isSymbolic: mode === "symbolic" || mode === "both",
    primaryState: heartbeatArtery.lastPrimaryState,
    dadState: heartbeatArtery.lastDadState,
    earnState: heartbeatArtery.lastEarnState
  });
  aiHeartbeatHealing.lastPacket = packet;

  try {
    if (typeof globalThis !== "undefined") {
      globalThis[AI_HEARTBEAT_KEY] = now;
      globalThis.PulseAIHeartbeatMode = mode;
    }
  } catch {}

  // Symbolic tick still drives the organism; mode just annotates the pulse.
  void aiHeartbeatTick(`pulse:${typeof source === "string" ? source : "object"}`);
  return packet;
}


// ============================================================================
//  TIME FALLBACK — fires only if idle too long (dad self‑fallback)
//  Now annotated with current heartbeat mode.
// ============================================================================
function timeFallbackCheck() {
  const now = Date.now();
  updatePrimaryStateFlag(now);
  updateDadStateFlag(now);
  updateEarnStateFlag(now);

  const organism = bootAiOrganism();
  const { context, dualBand } = organism;

  const idleFor = now - lastRun;
  const snapshot = getOrganismSnapshot(dualBand);
  const pressure = snapshot?.binary?.metabolic?.pressure ?? 0;

  heartbeatArtery.lastPressure = pressure;
  aiHeartbeatHealing.lastIdleMs = idleFor;

  const mode = getCurrentHeartbeatMode();
  heartbeatArtery.lastMode = mode;
  aiHeartbeatHealing.lastMode = mode;

  if (idleFor >= AI_MAX_IDLE_MS) {
    context.logStep?.(
      `[HEARTBEAT] Time fallback triggered (idle=${idleFor}ms, pressure=${pressure}, mode=${mode}, primary=${heartbeatArtery.lastPrimaryState}, dad=${heartbeatArtery.lastDadState}, earn=${heartbeatArtery.lastEarnState})`
    );
    const packet = emitHeartbeatPacket("time-fallback", {
      idleMs: idleFor,
      pressure,
      mode,
      primaryState: heartbeatArtery.lastPrimaryState,
      dadState: heartbeatArtery.lastDadState,
      earnState: heartbeatArtery.lastEarnState
    });
    aiHeartbeatHealing.lastPacket = packet;
    try {
      if (typeof globalThis !== "undefined") {
        globalThis.PulseAIHeartbeatMode = mode;
      }
    } catch {}
    void aiHeartbeatTick("time-fallback");
  } else {
    context.logStep?.(
      `[HEARTBEAT] Time fallback check: idle=${idleFor}ms (no tick), mode=${mode}, primary=${heartbeatArtery.lastPrimaryState}, dad=${heartbeatArtery.lastDadState}, earn=${heartbeatArtery.lastEarnState}`
    );
    const packet = emitHeartbeatPacket("time-check", {
      idleMs: idleFor,
      pressure,
      mode,
      primaryState: heartbeatArtery.lastPrimaryState,
      dadState: heartbeatArtery.lastDadState,
      earnState: heartbeatArtery.lastEarnState,
      suppressed: false
    });
    aiHeartbeatHealing.lastPacket = packet;

    randomHeartbeatNudge("time-check");
  }
}


// ============================================================================
//  START — enable time fallback (independent pacer mode)
//  Default mode: symbolic (can be overridden by pulses later).
// ============================================================================
export function startAiHeartbeat() {
  if (aiTimeFallbackTimer) return;

  const organism = bootAiOrganism();

  const mode = getCurrentHeartbeatMode();
  heartbeatArtery.lastMode = mode;
  aiHeartbeatHealing.lastMode = mode;

  aiTimeFallbackTimer = setInterval(() => {
    timeFallbackCheck();
  }, AI_TIME_CHECK_MS);

  organism.context.logStep?.(
    `[HEARTBEAT] Time fallback active; mode=${mode}, check=${AI_TIME_CHECK_MS}ms, maxIdle=${AI_MAX_IDLE_MS}ms, primaryKey=${PRIMARY_HEARTBEAT_KEY}, earnKey=${EARN_HEARTBEAT_KEY}`
  );

  const packet = emitHeartbeatPacket("start", {
    mode,
    checkMs: AI_TIME_CHECK_MS,
    maxIdleMs: AI_MAX_IDLE_MS,
    primaryKey: PRIMARY_HEARTBEAT_KEY,
    primaryMaxSilenceMs: PRIMARY_MAX_SILENCE_MS,
    earnKey: EARN_HEARTBEAT_KEY,
    earnMaxSilenceMs: EARN_MAX_SILENCE_MS
  });
  aiHeartbeatHealing.lastPacket = packet;

  try {
    if (typeof globalThis !== "undefined") {
      globalThis.PulseAIHeartbeatMode = mode;
    }
  } catch {}
}


// ============================================================================
//  MODE RESOLUTION — symbolic / binary / both
// ============================================================================
function resolveHeartbeatMode(source) {
  // Object-style source: { mode, binary, symbolic, ... }
  if (source && typeof source === "object") {
    if (source.mode === "binary" || source.mode === "symbolic" || source.mode === "both") {
      return source.mode;
    }
    if (source.binary === true && source.symbolic === true) return "both";
    if (source.binary === true) return "binary";
    if (source.symbolic === true) return "symbolic";
  }

  // String-style hints
  if (typeof source === "string") {
    const s = source.toLowerCase();
    if (s.startsWith("binary:") || s === "binary") return "binary";
    if (s.startsWith("symbolic:") || s === "symbolic") return "symbolic";
    if (s === "both" || s === "dual") return "both";
  }

  // Default: symbolic primary
  return "symbolic";
}

// Current mode helper (fallback for internal paths)
function getCurrentHeartbeatMode() {
  return (
    aiHeartbeatHealing.lastMode ||
    heartbeatArtery.lastMode ||
    "symbolic"
  );
}



// ============================================================================
//  STOP — disable fallback
// ============================================================================
export function stopAiHeartbeat() {
  if (!aiTimeFallbackTimer) return;
  clearInterval(aiTimeFallbackTimer);
  aiTimeFallbackTimer = null;

  const mode = getCurrentHeartbeatMode();

  aiOrganism?.context?.logStep?.(
    `[HEARTBEAT] Time fallback stopped. mode=${mode}`
  );
  const packet = emitHeartbeatPacket("stop", { mode });
  aiHeartbeatHealing.lastPacket = packet;
}


// ============================================================================
//  WINDOW‑SAFE ARTERY SNAPSHOT — now mode-aware
// ============================================================================
export function snapshotAiHeartbeat() {
  const momPulseSurface = buildMomPulseSurface();
  const earnPulseSurface = buildEarnPulseSurface();
  aiHeartbeatHealing.lastMomPulseSurface = momPulseSurface;
  aiHeartbeatHealing.lastEarnPulseSurface = earnPulseSurface;

  const mode = getCurrentHeartbeatMode();
  heartbeatArtery.lastMode = mode;
  aiHeartbeatHealing.lastMode = mode;

  try {
    if (typeof globalThis !== "undefined") {
      globalThis.PulseAIHeartbeatMode = mode;
    }
  } catch {}

  return emitHeartbeatPacket("snapshot", {
    mode,
    artery: heartbeatArtery.snapshot(),
    healing: { ...aiHeartbeatHealing },
    momPulseSurface,
    earnPulseSurface
  });
}

// ============================================================================
//  HEALING + DIAGNOSTICS EXPORTS — mode surfaced
// ============================================================================
export function getAiHeartbeatHealingState() {
  return {
    ...aiHeartbeatHealing,
    lastMode: getCurrentHeartbeatMode()
  };
}

export function getAiHeartbeatDiagnostics() {
  const mode = getCurrentHeartbeatMode();
  return {
    artery: {
      ...heartbeatArtery.snapshot(),
      mode
    },
    healing: {
      ...aiHeartbeatHealing,
      lastMode: mode
    },
    primaryState: heartbeatArtery.lastPrimaryState,
    dadState: heartbeatArtery.lastDadState,
    earnState: heartbeatArtery.lastEarnState
  };
}
