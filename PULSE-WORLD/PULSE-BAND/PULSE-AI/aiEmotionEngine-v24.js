// ============================================================================
//  aiEmotionEngine-v24.js — Pulse OS v24++‑IMMORTAL‑ADVANTAGE
//  Emotion Organ • Subtle Affect Detection • Tone Routing Surface
//  PURE AFFECT. ZERO DIAGNOSIS. ZERO CLINICAL INTERPRETATION.
//  OWNER‑SUBORDINATE: ALWAYS BELOW ALDWYN.
// ============================================================================

import { OrganismIdentity } from "../PULSE-X/PulseWorldOrganismMap-v21.js";

const Identity = OrganismIdentity(import.meta.url);

// ============================================================================
//  META BLOCK — v24++ IMMORTAL (ORGANISM KERNEL)
// ============================================================================
export const EmotionEngineMeta = Identity.OrganMeta;

// ============================================================================
//  SURFACE / ORGANISM LAYER EXPORTS — v24++ IMMORTAL
// ============================================================================
export const pulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// ============================================================================
//  PRESSURE HELPERS — dualband‑aware
// ============================================================================
function extractBinaryPressure(binaryVitals = {}) {
  if (binaryVitals?.layered?.organism?.pressure != null)
    return binaryVitals.layered.organism.pressure;
  if (binaryVitals?.binary?.pressure != null)
    return binaryVitals.binary.pressure;
  if (typeof binaryVitals.pressure === "number")
    return binaryVitals.pressure;
  return 0;
}

function bucketPressure(v) {
  if (v >= 0.9) return "overload";
  if (v >= 0.7) return "high";
  if (v >= 0.4) return "medium";
  if (v > 0) return "low";
  return "none";
}

// ============================================================================
//  PACKET EMITTER — deterministic, emotion‑scoped
// ============================================================================
function emitEmotionPacket(type, payload = {}) {
  return Object.freeze({
    meta: EmotionEngineMeta,
    packetType: `emotion-${type}`,
    timestamp: Date.now(),
    epoch: EmotionEngineMeta.evo.epoch,
    layer: EmotionEngineMeta.layer,
    role: EmotionEngineMeta.role,
    identity: EmotionEngineMeta.identity,
    owner: "Aldwyn",
    subordinate: true,
    ...payload
  });
}

// ============================================================================
//  CORE DETECTORS (pure, stateless, drift‑proof)
// ============================================================================
function coreDetectEmotion(message) {
  if (!message) return "neutral";

  const msg = String(message).toLowerCase();

  // v24++ expanded affect lexicon (still non‑clinical)
  if (msg.includes("lol") || msg.includes("haha") || msg.includes(":)"))
    return "casual";

  if (msg.includes("worried") || msg.includes("idk") || msg.includes("confused"))
    return "stressed";

  if (msg.includes("angry") || msg.includes("upset") || msg.includes("annoyed"))
    return "frustrated";

  if (msg.includes("evolve") || msg.includes("improve") || msg.includes("optimize"))
    return "focused";

  if (msg.includes("tired") || msg.includes("exhausted") || msg.includes("burnt"))
    return "drained";

  if (msg.includes("excited") || msg.includes("hyped") || msg.includes("pumped"))
    return "energized";

  if (msg.includes("sad") || msg.includes("down"))
    return "low";

  if (msg.includes("relaxed") || msg.includes("calm"))
    return "calm";

  return "neutral";
}

function coreDetectIntensity(message) {
  if (!message) return 0.2;

  const len = String(message).length;

  if (len < 20) return 0.3;
  if (len > 200) return 0.7;
  return 0.5;
}

// ============================================================================
//  EMOTION ARTERY — symbolic‑only, deterministic, dualband‑aware
// ============================================================================
function emotionArtery({ message = "", binaryVitals = {} } = {}) {
  const pressure = extractBinaryPressure(binaryVitals);

  const emotion = coreDetectEmotion(message);
  const intensity = coreDetectIntensity(message);

  const localPressure =
    (emotion === "frustrated" ? 0.3 : 0) +
    (emotion === "drained" ? 0.2 : 0) +
    (intensity > 0.6 ? 0.2 : 0);

  const combined = Math.max(
    0,
    Math.min(1, 0.6 * localPressure + 0.4 * pressure)
  );

  return emitEmotionPacket("artery", {
    organism: {
      pressure: combined,
      pressureBucket: bucketPressure(combined)
    },
    emotion,
    intensity
  });
}

// ============================================================================
//  FACTORY — v24++ IMMORTAL‑ADVANTAGE
// ============================================================================
export function createEmotionEngine({ context = {}, personaEngine = null } = {}) {
  const base = {
    meta: EmotionEngineMeta,
    context,
    personaEngine,

    detectEmotion(message) {
      return coreDetectEmotion(message);
    },

    detectIntensity(message) {
      return coreDetectIntensity(message);
    },

    interpret(message, binaryVitals = {}) {
      const emotion = coreDetectEmotion(message);
      const intensity = coreDetectIntensity(message);

      return emitEmotionPacket("detected", {
        emotion,
        intensity,
        message,
        contextSnapshot: {
          userId: context?.userId ?? null,
          personaId: personaEngine?.getActivePersona?.()?.id ?? null
        },
        pressure: extractBinaryPressure(binaryVitals),
        pressureBucket: bucketPressure(extractBinaryPressure(binaryVitals))
      });
    },

    artery(input) {
      return emotionArtery(input);
    }
  };

  return Object.freeze(base);
}

// Backwards‑compatible alias
export const aiEmotionEngine = createEmotionEngine;

// ============================================================================
//  EMOTION ENGINE PREWARM — v24++ IMMORTAL‑ADVANTAGE
// ============================================================================
export function prewarmEmotionEngine() {
  try {
    const warmSamples = [
      "lol this is funny",
      "idk I'm confused",
      "I'm angry about this",
      "I want to evolve the system",
      "neutral baseline",
      "I'm exhausted but still pushing",
      "I'm excited to ship this",
      "this is frustrating but I'll fix it",
      "I'm calm and steady",
      "feeling a bit down today"
    ];

    const warmEngine = createEmotionEngine({ context: { userId: "prewarm" } });

    for (const msg of warmSamples) {
      warmEngine.detectEmotion(msg);
      warmEngine.detectIntensity(msg);
      warmEngine.interpret(msg);
      warmEngine.artery({ message: msg, binaryVitals: { pressure: 0.2 } });
    }

    return emitEmotionPacket("prewarm", {
      message: "Emotion engine prewarmed and affect pathways aligned."
    });
  } catch (err) {
    return emitEmotionPacket("prewarm-error", {
      error: String(err),
      message: "Emotion engine prewarm failed."
    });
  }
}

// ============================================================================
//  DEFAULT EXPORT (ESM + CJS)
// ============================================================================
export default aiEmotionEngine;

if (typeof module !== "undefined") {
  module.exports = {
    EmotionEngineMeta,
    aiEmotionEngine,
    createEmotionEngine,
    prewarmEmotionEngine,
    default: aiEmotionEngine
  };
}
