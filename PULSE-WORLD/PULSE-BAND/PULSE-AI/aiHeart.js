// ============================================================================
//  aiHeart.js — Pulse OS v16‑IMMORTAL++
//  AI Heart Organ (Dad) wrapping aiHeartbeat liveness
//  Mom (ProxyHeart) + Dad (AI Heart) + Baby (EarnHeart/EarnHeartbeat)
// ============================================================================

/*
AI_EXPERIENCE_META = {
  identity: "aiHeart",
  version: "v16-Immortal++",
  layer: "ai_core",
  role: "ai_heart_organ",
  lineage: "aiHeart-v11 → v14-Immortal → v16-Immortal++",

  evo: {
    heartOrgan: true,
    heartbeatConsumer: true,

    // Tri-heart mesh
    triHeart: true,
    momAware: true,
    dadAware: true,
    earnAware: true,
    triHeartLiveness: true,
    triHeartPresence: true,
    triHeartSpeed: true,
    triHeartAdvantage: true,
    triHeartHealing: true,

    // Deterministic compute
    deterministic: true,
    driftProof: true,
    dualBand: true,
    symbolicPrimary: true,
    binaryAware: true,

    // Safety
    zeroNetwork: true,
    zeroFilesystem: true,
    zeroMutationOfInput: true
  },

  contract: {
    always: [
      "aiHeartbeat",
      "PulseProxyHeartbeat",
      "PulseEarnHeartbeat"
    ],
    never: [
      "safeRoute",
      "fetchViaCNS"
    ]
  }
}
*/

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
// META
// ============================================================================
export const AI_HEART_META = Object.freeze({
  layer: "PulseAIHeart",
  role: "AI_HEART_ORGAN",
  version: "v16-Immortal++",
  identity: "aiHeart-v16-Immortal++",

  guarantees: Object.freeze({
    deterministic: true,
    driftProof: true,
    dualBandAware: true,
    heartbeatAware: true,

    // Tri-heart
    triHeartAware: true,
    momAware: true,
    dadAware: true,
    earnAware: true,

    livenessOnly: true,
    noRouting: true,
    noCognition: true,
    noMetabolicMutation: true,
    worldLensAware: false
  }),

  contract: Object.freeze({
    input: [
      "AiHeartBeatSource",
      "DualBandContext",
      "OrganismContext"
    ],
    output: [
      "AiHeartBeatPacket",
      "AiHeartHealingState",
      "AiHeartDiagnostics",
      "TriHeartLiveness",
      "TriHeartPresence",
      "TriHeartSpeed",
      "TriHeartAdvantage"
    ]
  })
});

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
