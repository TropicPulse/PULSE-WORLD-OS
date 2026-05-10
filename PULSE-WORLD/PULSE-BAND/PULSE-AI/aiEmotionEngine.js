// ============================================================================
//  aiEmotionEngine.js — Pulse OS v14‑IMMORTAL
//  Emotion Organ • Subtle Affect Detection • Tone Routing Surface
//  PURE AFFECT. ZERO DIAGNOSIS. ZERO CLINICAL INTERPRETATION.
// ============================================================================

import { OrganismIdentity } from "../PULSE-X/PulseWorldOrganismMap-v21.js";

const Identity = OrganismIdentity(import.meta.url);

// or: const Identity = OrganismIdentity["pulse-ai/ai-v24.0-IMMORTAL"] if that's the key you chose

// ============================================================================
//  META BLOCK — v24.0 IMMORTAL (ORGANISM KERNEL)
//  (now backed by the Organism Map instead of hardcoded here)
// ============================================================================
export const EmotionEngineMeta = Identity.OrganMeta;

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


// ============================================================================
//  PACKET EMITTER — deterministic, emotion-scoped
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
    ...payload
  });
}

// ============================================================================
//  CORE DETECTORS (pure, stateless)
// ============================================================================
function coreDetectEmotion(message) {
  if (!message) return "neutral";

  const msg = String(message).toLowerCase();

  if (msg.includes("lol") || msg.includes("haha") || msg.includes(":)"))
    return "casual";

  if (
    msg.includes("worried") ||
    msg.includes("idk") ||
    msg.includes("confused")
  )
    return "stressed";

  if (msg.includes("angry") || msg.includes("upset"))
    return "frustrated";

  if (msg.includes("evolve") || msg.includes("improve"))
    return "focused";

  if (msg.includes("tired") || msg.includes("exhausted"))
    return "drained";

  if (msg.includes("excited") || msg.includes("hyped"))
    return "energized";

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
//  FACTORY — v14‑IMMORTAL (context‑aware, dual‑band‑safe)
// ============================================================================
// Signature is compatible with createDualBandOrganism:
//   const emotionEngine = aiEmotionEngine({ context, personaEngine });
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

    interpret(message) {
      const emotion = coreDetectEmotion(message);
      const intensity = coreDetectIntensity(message);

      return emitEmotionPacket("detected", {
        emotion,
        intensity,
        message,
        contextSnapshot: {
          userId: context?.userId ?? null,
          personaId: personaEngine?.getActivePersona?.()?.id ?? null
        }
      });
    }
  };

  return Object.freeze(base);
}

// Backwards‑compatible alias: aiEmotionEngine is the factory
export const aiEmotionEngine = createEmotionEngine;

// ============================================================================
//  EMOTION ENGINE PREWARM — v14‑IMMORTAL
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
      "this is frustrating but I'll fix it"
    ];

    const warmEngine = createEmotionEngine({ context: { userId: "prewarm" } });

    for (const msg of warmSamples) {
      warmEngine.detectEmotion(msg);
      warmEngine.detectIntensity(msg);
      warmEngine.interpret(msg);
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
