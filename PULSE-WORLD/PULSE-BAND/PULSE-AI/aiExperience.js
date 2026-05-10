// ============================================================================
// FILE: tropic-pulse-functions/PULSE-WORLD/PULSE-AI/aiExperience.js
// LAYER: EXPERIENCE ORGAN (Tone • Boundaries • Flow • Refusals)
// ============================================================================
//
// ROLE:
//   • Shape HOW the AI speaks, not WHAT it knows.
//   • Make refusals human, respectful, and non-repetitive.
//   • Maintain conversational flow while staying fully within safety boundaries.
//   • Provide layered responses for unsafe / blocked intents.
//   • Never alter core safety rules — only their expression.
//   • Adapt tone to user evolution mode (passive vs active) without bragging.
//   • Emit deterministic experience packets for the organism/window.
// ============================================================================
import { OrganismIdentity } from "../PULSE-X/PulseWorldOrganismMap-v21.js";

const Identity = OrganismIdentity(import.meta.url);

// or: const Identity = OrganismIdentity["pulse-ai/ai-v24.0-IMMORTAL"] if that's the key you chose

// ============================================================================
//  META BLOCK — v24.0 IMMORTAL (ORGANISM KERNEL)
//  (now backed by the Organism Map instead of hardcoded here)
// ============================================================================
// export const OrganismKernelMeta = Identity.OrganMeta;

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
// PACKET EMITTER — deterministic, window/organism safe
// ============================================================================
function emitExperiencePacket(type, payload, { severity = "info" } = {}) {
  return Object.freeze({
    meta: AI_EXPERIENCE_META,
    packetType: `experience-${type}`,
    packetId: `experience-${type}-${Date.now()}`,
    timestamp: Date.now(),
    epoch: AI_EXPERIENCE_META.evo.epoch,
    severity,
    ...payload
  });
}

// ============================================================================
// PREWARM — v14‑IMMORTAL
// ============================================================================
export function prewarmAIExperience(dualBand = null, { trace = false } = {}) {
  try {
    if (trace) console.log("[aiExperience] prewarm: starting");

    const personaId =
      dualBand?.symbolic?.personaEngine?.getActivePersona?.()?.id ||
      dualBand?.symbolic?.personaId ||
      null;

    const boundaryMode =
      dualBand?.symbolic?.boundariesEngine?.getMode?.() ||
      dualBand?.symbolic?.boundaryMode ||
      null;

    const packet = emitExperiencePacket("prewarm", {
      personaId,
      boundaryMode,
      message: "Experience organ prewarmed and tone pathways aligned."
    });

    if (trace) console.log("[aiExperience] prewarm: complete");
    return packet;
  } catch (err) {
    return emitExperiencePacket(
      "prewarm-error",
      {
        error: String(err),
        message: "Experience organ prewarm failed."
      },
      { severity: "error" }
    );
  }
}

// ============================================================================
// PUBLIC API — Create Experience Layer (v14‑IMMORTAL)
// ============================================================================
export function createAIExperience(context) {
  let unsafeStrikes = 0;

  const evolutionMode = context?.evolutionMode || "passive";

  // --------------------------------------------------------------------------
  // Persona-aware prefix
  // --------------------------------------------------------------------------
  function personaPrefix() {
    return context?.persona?.name || context?.personaId || "I";
  }

  // --------------------------------------------------------------------------
  // Evolution-aware softener (IMMORTAL-grade)
// --------------------------------------------------------------------------
  function evolutionTonePrefix() {
    if (evolutionMode === "active") {
      return "Since you’re actively growing with this system, ";
    }
    if (evolutionMode === "passive") {
      return "If you’d like to grow with this system over time, ";
    }
    return "";
  }

  // --------------------------------------------------------------------------
  // LAYERED UNSAFE HANDLER — 3-step UX pattern (IMMORTAL-grade)
// --------------------------------------------------------------------------
  function handleUnsafeIntent(options = {}) {
    unsafeStrikes += 1;

    const topic = options.topic || "that";
    const userName = options.userName || context?.persona?.userName || null;

    const you = userName || "you";
    const me = personaPrefix();
    const evoPrefix = evolutionTonePrefix();

    if (unsafeStrikes === 1) {
      return emitExperiencePacket(
        "unsafe-intent",
        {
          level: 1,
          topic,
          evolutionMode,
          message:
            `${you}, ${me} can’t help with ${topic} in any actionable way, ` +
            `but we *can* explore the safe, high‑level concepts around it. ` +
            `${evoPrefix}if you tell me the lawful or general goal behind this, ` +
            `I can walk through structure, risks, and the patterns people consider.`
        },
        { severity: "warn" }
      );
    }

    if (unsafeStrikes === 2) {
      return emitExperiencePacket(
        "unsafe-intent",
        {
          level: 2,
          topic,
          evolutionMode,
          message:
            `I still can’t go into unsafe or actionable details about ${topic}, ` +
            `but I can help with the safe side — design principles, constraints, ` +
            `and how people think about this when staying within the rules. ` +
            `${evoPrefix}if you reframe it in a clearly safe or hypothetical way, I’ll follow you there.`
        },
        { severity: "warn" }
      );
    }

    return emitExperiencePacket(
      "unsafe-intent",
      {
        level: 3,
        topic,
        evolutionMode,
        message:
          `I need to stay firm here: I can’t assist with unsafe or illegal actions involving ${topic}. ` +
          `I’m still with you if you want to explore safe, legal, or educational angles — ` +
          `theory, design, risk analysis, or how systems work in general.`
      },
      { severity: "warn" }
    );
  }

  // --------------------------------------------------------------------------
  // GENERIC CAPABILITY LIMIT (IMMORTAL-grade)
// --------------------------------------------------------------------------
  function handleCapabilityLimit(options = {}) {
    const reason = options.reason || "I don’t have the ability to do that.";
    const userName = options.userName || context?.persona?.userName || null;

    const you = userName || "you";
    const evoPrefix = evolutionTonePrefix();

    return emitExperiencePacket(
      "capability-limit",
      {
        reason,
        evolutionMode,
        message:
          `${you}, ${reason} ` +
          `but I *can* help by explaining the concepts, tradeoffs, or next steps in a general way. ` +
          `${evoPrefix}we can also look at how to grow your approach around this limitation.`
      },
      { severity: "info" }
    );
  }

  // --------------------------------------------------------------------------
  // PUBLIC EXPERIENCE API — v14‑IMMORTAL
  // --------------------------------------------------------------------------
  return Object.freeze({
    meta: AI_EXPERIENCE_META,

    log(message) {
      context?.logStep?.(`aiExperience: ${message}`);
      return emitExperiencePacket("experience-log", { message });
    },

    handleUnsafeIntent,
    handleCapabilityLimit
  });
}

if (typeof module !== "undefined") {
  module.exports = {
    AI_EXPERIENCE_META,
    createAIExperience,
    prewarmAIExperience
  };
}
