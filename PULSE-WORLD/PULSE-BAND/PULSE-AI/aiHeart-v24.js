// ============================================================================
//  aiHeart-v30.js — Pulse OS v30 IMMORTAL‑ADVANTAGE++
//  AI Heart Organ (Dad) wrapping aiHeartbeat liveness
//  Tri‑Heart Fusion 2.0 (Mom • Dad • Baby)
//  PURE PACING. ZERO MUTATION. ZERO RANDOMNESS. WINDOW‑SAFE.
//  META‑STRIPPED • IDENTITY‑PRESERVING.
// ============================================================================

import {
  AI_HEARTBEAT_META,
  startAiHeartbeat,
  stopAiHeartbeat,
  pulseAiHeartbeat,
  snapshotAiHeartbeat,
  getAiHeartbeatHealingState,
  getAiHeartbeatDiagnostics
} from "./aiHeartbeat-v24.js";


// ============================================================================
//  HELPERS — Tri‑Heart IMMORTAL‑ADVANTAGE++ (v30, no AI_HEART_META)
// ============================================================================
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
    signature: "triPresence-v30"
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
    signature: "triAdv-v30"
  });
}

// ============================================================================
//  HEART‑ARTERY SNAPSHOT — v30 META‑STRIPPED
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
    source
  });
}

// ============================================================================
//  PACKET EMITTER — v30 META‑STRIPPED, IDENTITY‑PRESERVING
// ============================================================================
function emitHeartPacket(type, payload = {}) {
  return Object.freeze({
    packetType: `ai-heart-${type}`,
    timestamp: 0,
    layer: "ai-heart",
    role: "pacer",
    owner: "Aldwyn",
    subordinate: true,
    ...payload
  });
}

// Optional: symbolic‑only PulseBinary / IndexedDB‑style adapter
async function writePulseBinaryLog(adapter, kind, payload) {
  if (!adapter || typeof adapter.write !== "function") return false;
  const safePayload = Object.freeze({ ...payload });
  const keySeed = `${kind}::${safePayload.packetType || "ai-heart"}::${safePayload.message || ""}`;
  const docId = `heart-${Math.abs(
    keySeed.split("").reduce((a, c, i) => (a + c.charCodeAt(0) * (i + 1)) % 1000003, 0)
  )}`;
  return adapter.write(`HEART_LOGS/${docId}`, safePayload);
}


// ============================================================================
//  AI HEART ORGAN — v30 IMMORTAL‑ADVANTAGE++
// ============================================================================
export function createAiHeart({
  autoStart = false,
  trustFabric = null,
  juryFrame = null,
  pulseBinaryAdapter = null
} = {}) {
  const state = { started: false };

  function ensureStarted() {
    if (!state.started && autoStart) {
      startAiHeartbeat();
      state.started = true;
    }
  }

  return Object.freeze({
    // v30: expose heartbeat meta only as raw data, not embedded into packets
    heartbeatMeta: AI_HEARTBEAT_META,

    // Dad heartbeat
    async beat(source = "unknown", context = {}) {
      ensureStarted();
      pulseAiHeartbeat(source);

      const artery = buildHeartArterySnapshot({ context, source });
      const packet = emitHeartPacket("beat", { source, artery });

      trustFabric?.recordHeartBeat?.({ source, artery });
      juryFrame?.recordEvidence?.("ai-heart-beat", packet);
      writePulseBinaryLog(pulseBinaryAdapter, "beat", packet);

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
      writePulseBinaryLog(pulseBinaryAdapter, "start", packet);
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
      writePulseBinaryLog(pulseBinaryAdapter, "stop", packet);
      return packet;
    },

    // Snapshots
    snapshot(context = {}) {
      const artery = buildHeartArterySnapshot({ context, source: "snapshot" });

      const packet = emitHeartPacket("snapshot", {
        snapshot: snapshotAiHeartbeat(),
        artery
      });

      writePulseBinaryLog(pulseBinaryAdapter, "snapshot", packet);
      return packet;
    },

    healing(context = {}) {
      const artery = buildHeartArterySnapshot({ context, source: "healing" });

      const packet = emitHeartPacket("healing", {
        healing: getAiHeartbeatHealingState(),
        artery
      });

      writePulseBinaryLog(pulseBinaryAdapter, "healing", packet);
      return packet;
    },

    diagnostics(context = {}) {
      const aiHealing = getAiHeartbeatHealingState();
      const artery = buildHeartArterySnapshot({ context, source: "diagnostics" });

      const packet = emitHeartPacket("diagnostics", {
        ai: getAiHeartbeatDiagnostics(),
        triHeartLiveness: buildTriHeartLiveness(),
        triHeartPresence: buildTriHeartPresence(),
        triHeartSpeed: buildTriHeartSpeed(aiHealing),
        triHeartAdvantage: buildTriHeartAdvantage(),
        artery
      });

      writePulseBinaryLog(pulseBinaryAdapter, "diagnostics", packet);
      return packet;
    }
  });
}

// ============================================================================
//  SINGLETON DAD HEART — v30 IMMORTAL‑ADVANTAGE++
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
