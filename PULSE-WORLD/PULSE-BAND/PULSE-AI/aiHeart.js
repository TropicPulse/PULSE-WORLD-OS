// ============================================================================
//  aiHeart.js — Pulse OS v16‑IMMORTAL++
//  AI Heart Organ (Dad) wrapping aiHeartbeat liveness
//  Mom (ProxyHeart) + Dad (AI Heart) + Baby (EarnHeart/EarnHeartbeat)
// ============================================================================

import { OrganismIdentity } from "../PULSE-X/PulseWorldOrganismMap-v21.js";

const Identity = OrganismIdentity(import.meta.url);

// or: const Identity = OrganismIdentity["pulse-ai/ai-v24.0-IMMORTAL"] if that's the key you chose

// ============================================================================
//  META BLOCK — v24.0 IMMORTAL (ORGANISM KERNEL)
//  (now backed by the Organism Map instead of hardcoded here)
// ============================================================================
export const AI_HEART_META = Identity.OrganMeta;

// ============================================================================
//  SURFACE / ORGANISM LAYER EXPORTS — v24.0 IMMORTAL
//  (for Understanding / CNS / Portal alignment)
// ============================================================================

// Required 3 for every “surface” in the organism graph
export const pulseRole = Identity.pulseRole;

export const surfaceMeta = Identity.surfaceMeta;

export const pulseLoreContext = Identity.pulseLoreContext;

// Optional: richer experience meta for AI / tooling
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;

// Optional: export meta for tooling / dev panels
export const EXPORT_META = Identity.EXPORT_META;


import {
  AI_HEARTBEAT_META,
  startAiHeartbeat,
  stopAiHeartbeat,
  pulseAiHeartbeat,
  snapshotAiHeartbeat,
  getAiHeartbeatHealingState,
  getAiHeartbeatDiagnostics
} from "./aiHeartbeat.js";
// ============================================================================
// TRI-HEART SURFACES (Dad reads Mom + Baby via globalThis)
// ============================================================================
function buildMomPulseSurface() {
  const last = globalThis?.PulseProxyHeartbeatLastBeatAt || 0;
  return {
    momAlive: last > 0,
    momLastBeatAt: last,
    momFallbackState: last > 0 ? "available" : "silent"
  };
}

function buildBabyPulseSurface() {
  const last = globalThis?.PulseEarnHeartbeatLastBeatAt || 0;
  return {
    babyAlive: last > 0,
    babyLastBeatAt: last,
    babyFallbackState: last > 0 ? "available" : "silent"
  };
}

function buildTriHeartLiveness() {
  const mom = buildMomPulseSurface();
  const baby = buildBabyPulseSurface();
  const dad = {
    dadAlive: (globalThis?.PulseAIHeartbeatLastBeatAt || 0) > 0,
    dadLastBeatAt: globalThis?.PulseAIHeartbeatLastBeatAt || 0
  };

  return {
    momAlive: mom.momAlive,
    dadAlive: dad.dadAlive,
    babyAlive: baby.babyAlive,
    triHeartSignature: `triLive-${mom.momAlive}-${dad.dadAlive}-${baby.babyAlive}`
  };
}

function buildTriHeartPresence() {
  return {
    momPresence: { focus: "mom", role: "primary_pacemaker" },
    dadPresence: { focus: "dad", role: "ai_pacer" },
    babyPresence: { focus: "baby", role: "earn_pulse_driver" },
    presenceSignature: "triPresence-v16"
  };
}

function buildTriHeartSpeed(aiHealing) {
  const dadTicks = aiHealing?.ticks ?? 0;
  const dadPulses = aiHealing?.pulses ?? 0;
  const dadActivity = Math.min(1, (dadTicks + dadPulses) / 100);

  return {
    momSpeed: 0.5, // mom is steady
    dadSpeed: dadActivity,
    babySpeed: 0.3, // baby is job-driven
    combinedSpeed: (0.5 + dadActivity + 0.3) / 3,
    speedSignature: `triSpeed-${dadActivity}`
  };
}

function buildTriHeartAdvantage() {
  return {
    momAdvantage: 0.5,
    dadAdvantage: 0.4,
    babyAdvantage: 0.3,
    combinedAdvantage: (0.5 + 0.4 + 0.3) / 3,
    advantageSignature: "triAdv-v16"
  };
}

// ============================================================================
// AI HEART ORGAN — thin wrapper over aiHeartbeat
// ============================================================================
export function createAiHeart({ autoStart = false } = {}) {
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
    async beat(source = "unknown") {
      ensureStarted();
      return pulseAiHeartbeat(source);
    },

    // Start/stop dad pacer
    start() {
      if (!state.started) {
        startAiHeartbeat();
        state.started = true;
      }
      return snapshotAiHeartbeat();
    },

    stop() {
      if (!state.started) return null;
      stopAiHeartbeat();
      state.started = false;
      return snapshotAiHeartbeat();
    },

    // Snapshots
    snapshot() {
      return snapshotAiHeartbeat();
    },

    healing() {
      return getAiHeartbeatHealingState();
    },

    diagnostics() {
      const aiHealing = getAiHeartbeatHealingState();

      return {
        ai: getAiHeartbeatDiagnostics(),
        triHeartLiveness: buildTriHeartLiveness(),
        triHeartPresence: buildTriHeartPresence(),
        triHeartSpeed: buildTriHeartSpeed(aiHealing),
        triHeartAdvantage: buildTriHeartAdvantage()
      };
    }
  });
}

// Singleton dad heart
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
