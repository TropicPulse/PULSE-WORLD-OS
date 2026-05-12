// ============================================================================
//  aiHeart.js — Pulse OS v24++ IMMORTAL‑ADVANTAGE++
//  AI Heart Organ (Dad) wrapping aiHeartbeat liveness
//  Tri‑Heart Fusion 2.0 (Mom • Dad • Baby)
//  PURE PACING. ZERO MUTATION. ZERO RANDOMNESS. WINDOW‑SAFE.
// ============================================================================

import {
  OrganismIdentity,
  buildPulseOrganismMap as PulseOrganismMap,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PULSE-WORLD-MAP.js";
import {
  AI_HEARTBEAT_META,
  startAiHeartbeat,
  stopAiHeartbeat,
  pulseAiHeartbeat,
  snapshotAiHeartbeat,
  getAiHeartbeatHealingState,
  getAiHeartbeatDiagnostics
} from "./aiHeartbeat-v24.js";

const Identity = OrganismIdentity(import.meta.url);

// ============================================================================
//  META BLOCK — v24++ IMMORTAL‑ADVANTAGE++
// ============================================================================
export const AI_HEART_META = Identity.OrganMeta;

// ============================================================================
//  SURFACE EXPORTS — v24++ IMMORTAL‑ADVANTAGE++
// ============================================================================
export const pulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// ============================================================================
//  HELPERS — Tri‑Heart IMMORTAL‑ADVANTAGE++
// ============================================================================
function now() {
  return Date.now();
}

function triState(last) {
  return {
    alive: last > 0,
    lastBeatAt: last,
    fallback: last > 0 ? "available" : "silent"
  };
}

function buildMomPulseSurface() {
  return triState(globalThis?.PulseProxyHeartbeatLastBeatAt || 0);
}

function buildBabyPulseSurface() {
  return triState(globalThis?.PulseEarnHeartbeatLastBeatAt || 0);
}

function buildDadPulseSurface() {
  return triState(globalThis?.PulseAIHeartbeatLastBeatAt || 0);
}

function buildTriHeartLiveness() {
  const mom = buildMomPulseSurface();
  const dad = buildDadPulseSurface();
  const baby = buildBabyPulseSurface();

  return Object.freeze({
    momAlive: mom.alive,
    dadAlive: dad.alive,
    babyAlive: baby.alive,
    signature: `triLive-${mom.alive}-${dad.alive}-${baby.alive}`
  });
}

function buildTriHeartPresence() {
  return Object.freeze({
    mom: { role: "primary_pacemaker", focus: "mom" },
    dad: { role: "ai_pacer", focus: "dad" },
    baby: { role: "earn_pulse_driver", focus: "baby" },
    signature: "triPresence-v24++"
  });
}

function buildTriHeartSpeed(aiHealing) {
  const ticks = aiHealing?.ticks ?? 0;
  const pulses = aiHealing?.pulses ?? 0;
  const dadActivity = Math.min(1, (ticks + pulses) / 200);

  return Object.freeze({
    momSpeed: 0.5,
    dadSpeed: dadActivity,
    babySpeed: 0.3,
    combined: (0.5 + dadActivity + 0.3) / 3,
    signature: `triSpeed-${dadActivity}`
  });
}

function buildTriHeartAdvantage() {
  return Object.freeze({
    mom: 0.5,
    dad: 0.45,
    baby: 0.35,
    combined: (0.5 + 0.45 + 0.35) / 3,
    signature: "triAdv-v24++"
  });
}

// ============================================================================
//  HEART‑ARTERY SNAPSHOT — IMMORTAL‑ADVANTAGE++
// ============================================================================
function buildHeartArterySnapshot({ context = {}, source = "unknown" } = {}) {
  const healing = getAiHeartbeatHealingState();
  const pressure = Math.min(1, (healing?.ticks ?? 0) / 200);

  return Object.freeze({
    type: "heart-artery",
    personaId: context.personaId || null,
    evolutionMode: context.evolutionMode || "passive",
    organism: {
      pressure,
      pressureBucket:
        pressure >= 0.9 ? "overload" :
        pressure >= 0.7 ? "high" :
        pressure >= 0.4 ? "medium" :
        pressure > 0   ? "low" : "none"
    },
    source,
    meta: {
      version: AI_HEART_META.version,
      epoch: AI_HEART_META.evo.epoch,
      identity: AI_HEART_META.identity,
      layer: AI_HEART_META.layer,
      role: AI_HEART_META.role
    }
  });
}

// ============================================================================
//  PACKET EMITTER — deterministic IMMORTAL‑ADVANTAGE++
// ============================================================================
function emitHeartPacket(type, payload) {
  return Object.freeze({
    meta: {
      version: AI_HEART_META.version,
      epoch: AI_HEART_META.evo.epoch,
      identity: AI_HEART_META.identity,
      layer: AI_HEART_META.layer,
      role: AI_HEART_META.role,
      owner: "Aldwyn",
      subordinate: true
    },
    packetType: `ai-heart-${type}`,
    packetId: `ai-heart-${type}-${now()}`,
    timestamp: now(),
    ...payload
  });
}

// ============================================================================
//  AI HEART ORGAN — IMMORTAL‑ADVANTAGE++
// ============================================================================
export function createAiHeart({
  autoStart = false,
  trustFabric = null,
  juryFrame = null
} = {}) {
  const state = { started: false };

  function ensureStarted() {
    if (!state.started && autoStart) {
      startAiHeartbeat();
      state.started = true;
    }
  }

  return Object.freeze({
    meta: AI_HEART_META,
    heartbeatMeta: AI_HEARTBEAT_META,

    // Dad heartbeat
    async beat(source = "unknown", context = {}) {
      ensureStarted();
      const result = pulseAiHeartbeat(source);

      const artery = buildHeartArterySnapshot({ context, source });
      const packet = emitHeartPacket("beat", { source, artery });

      trustFabric?.recordHeartBeat?.({ source, artery });
      juryFrame?.recordEvidence?.("ai-heart-beat", packet);

      return packet;
    },

    // Start/stop pacer
    start(context = {}) {
      if (!state.started) {
        startAiHeartbeat();
        state.started = true;
      }

      const artery = buildHeartArterySnapshot({ context, source: "start" });
      const packet = emitHeartPacket("start", {
        snapshot: snapshotAiHeartbeat(),
        artery
      });

      juryFrame?.recordEvidence?.("ai-heart-start", packet);
      return packet;
    },

    stop(context = {}) {
      if (!state.started) return null;

      stopAiHeartbeat();
      state.started = false;

      const artery = buildHeartArterySnapshot({ context, source: "stop" });
      const packet = emitHeartPacket("stop", {
        snapshot: snapshotAiHeartbeat(),
        artery
      });

      juryFrame?.recordEvidence?.("ai-heart-stop", packet);
      return packet;
    },

    // Snapshots
    snapshot(context = {}) {
      const artery = buildHeartArterySnapshot({ context, source: "snapshot" });

      return emitHeartPacket("snapshot", {
        snapshot: snapshotAiHeartbeat(),
        artery
      });
    },

    healing(context = {}) {
      const artery = buildHeartArterySnapshot({ context, source: "healing" });

      return emitHeartPacket("healing", {
        healing: getAiHeartbeatHealingState(),
        artery
      });
    },

    diagnostics(context = {}) {
      const aiHealing = getAiHeartbeatHealingState();
      const artery = buildHeartArterySnapshot({ context, source: "diagnostics" });

      return emitHeartPacket("diagnostics", {
        ai: getAiHeartbeatDiagnostics(),
        triHeartLiveness: buildTriHeartLiveness(),
        triHeartPresence: buildTriHeartPresence(),
        triHeartSpeed: buildTriHeartSpeed(aiHealing),
        triHeartAdvantage: buildTriHeartAdvantage(),
        artery
      });
    }
  });
}

// ============================================================================
//  SINGLETON DAD HEART — IMMORTAL‑ADVANTAGE++
// ============================================================================
const aiHeartSingleton = createAiHeart({ autoStart: false });

export function pulseAiHeart(source = "unknown") {
  return aiHeartSingleton.beat(source);
}

export function getAiHeartHealingState() {
  return aiHeartSingleton.healing();
}

export function getAiHeartDiagnostics() {
  return aiHeartSingleton.diagnostics();
}
