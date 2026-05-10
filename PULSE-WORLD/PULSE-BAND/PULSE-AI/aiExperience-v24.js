// ============================================================================
// FILE: tropic-pulse-functions/PULSE-WORLD/PULSE-AI/aiExperience-v24.js
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
import { OrganismIdentity } from "../PULSE-X/PulseWorldOrganismMap-v24.js";

const Identity = OrganismIdentity(import.meta.url);

// or: const Identity = OrganismIdentity["pulse-ai/ai-v24.0-IMMORTAL"] if that's the key you chose

// ============================================================================
//  META BLOCK — v24.0 IMMORTAL (ORGANISM KERNEL)
//  (now backed by the Organism Map instead of hardcoded here)
// ============================================================================
export const ExperienceMeta = Identity.OrganMeta;

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
// HELPERS — PRESSURE + BUCKETS
// ============================================================================
function extractBinaryPressure(binaryVitals = {}) {
  if (binaryVitals?.layered?.organism?.pressure != null)
    return binaryVitals.layered.organism.pressure;
  if (binaryVitals?.binary?.pressure != null)
    return binaryVitals.binary.pressure;
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
// PACKET EMITTER — deterministic, window/organism safe
// ============================================================================
function emitExperiencePacket(type, payload, { severity = "info" } = {}) {
  return Object.freeze({
    meta: ExperienceMeta,
    packetType: `experience-${type}`,
    packetId: `experience-${type}-${Date.now()}`,
    timestamp: Date.now(),
    epoch: ExperienceMeta.evo.epoch,
    layer: ExperienceMeta.layer,
    role: ExperienceMeta.role,
    identity: ExperienceMeta.identity,
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

    const warmContext = {
      personaId: personaId || "PREWARM",
      persona: { name: "PREWARM", userName: "prewarm-user" },
      evolutionMode: "passive",
      trace: []
    };

    const warmExperience = createAIExperience(warmContext);

    warmExperience.handleUnsafeIntent({ topic: "prewarm-topic", userName: "prewarm-user" });
    warmExperience.handleCapabilityLimit({ reason: "prewarm-limit", userName: "prewarm-user" });
    warmExperience.experienceArtery({ binaryVitals: { binary: { pressure: 0.1 } } });

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
export function createAIExperience(context = {}) {
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
  // WINDOW PRINCIPLE — safe explanation line
  // --------------------------------------------------------------------------
  function explainSafe(topic = "that") {
    return (
      `I can’t go into unsafe or disallowed details about ${topic}, ` +
      `but I can give you the fullest safe, conceptual explanation available.`
    );
  }

  // --------------------------------------------------------------------------
  // FRUSTRATION‑AWARE TONE
  // --------------------------------------------------------------------------
  function sootheFrustration() {
    return (
      "I hear the frustration — let’s reset and rebuild this cleanly. " +
      "Tell me the exact angle you want to focus on."
    );
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
  // EXPERIENCE ARTERY — symbolic-only, deterministic
  // --------------------------------------------------------------------------
  function experienceArtery({ binaryVitals = {} } = {}) {
    const binaryPressure = extractBinaryPressure(binaryVitals);

    const localPressure =
      (unsafeStrikes ? 0.3 : 0) +
      (evolutionMode === "active" ? 0.2 : 0);

    const pressure = Math.max(
      0,
      Math.min(1, 0.6 * localPressure + 0.4 * binaryPressure)
    );

    return {
      organism: {
        pressure,
        pressureBucket: bucketPressure(pressure)
      },
      experience: {
        unsafeStrikes,
        evolutionMode
      }
    };
  }

  // --------------------------------------------------------------------------
  // PUBLIC EXPERIENCE API — v14‑IMMORTAL
  // --------------------------------------------------------------------------
  return Object.freeze({
    meta: ExperienceMeta,

    log(message) {
      context?.logStep?.(`aiExperience: ${message}`);
      return emitExperiencePacket("experience-log", { message });
    },

    handleUnsafeIntent,
    handleCapabilityLimit,
    experienceArtery,
    explainSafe,
    sootheFrustration
  });
}

if (typeof module !== "undefined") {
  module.exports = {
    ExperienceMeta,
    AI_EXPERIENCE_META,
    createAIExperience,
    prewarmAIExperience
  };
}
