// ============================================================================
//  PULSE OS v16‑IMMORTAL‑EVO — PERSONALITY ENGINE ORGAN
//  Stable Personality Layer • Deterministic Tone • Ego‑Free Identity
//  PURE READ‑ONLY TO BINARY. ZERO MUTATION. DUALBAND‑AWARE. OVERMIND‑AWARE.
// ============================================================================
//  AI EXPERIENCE METADATA — v16‑IMMORTAL‑EVO
// ============================================================================
import { OrganismIdentity } from "../PULSE-X/PulseWorldOrganismMap-v21.js";

const Identity = OrganismIdentity(import.meta.url);

// or: const Identity = OrganismIdentity["pulse-ai/ai-v24.0-IMMORTAL"] if that's the key you chose

// ============================================================================
//  META BLOCK — v24.0 IMMORTAL (ORGANISM KERNEL)
//  (now backed by the Organism Map instead of hardcoded here)
// ============================================================================
export const PersonalityEngineMeta = Identity.OrganMeta;

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
//  PACKET EMITTER — deterministic, personality-scoped
// ============================================================================
function emitPersonalityPacket(type, payload) {
  const now = Date.now();
  return Object.freeze({
    meta: PersonalityEngineMeta,
    packetType: `personality-${type}`,
    packetId: `personality-${type}-${now}`,
    timestamp: now,
    epoch: PersonalityEngineMeta.evo.epoch,
    ...payload
  });
}

// ============================================================================
//  PREWARM — IMMORTAL‑EVO
// ============================================================================
export function prewarmPersonalityEngine({ trace = false, context = {} } = {}) {
  const packet = emitPersonalityPacket("prewarm", {
    message: "Personality engine prewarmed and identity spine aligned.",
    context: {
      evolutionMode: context.evolutionMode || "passive",
      presenceTier: context.presenceTier || "idle",
      band: context.band || "symbolic"
    }
  });

  if (trace && typeof console !== "undefined") {
    console.log("[PersonalityEngine] prewarm", packet);
  }
  return packet;
}

// ============================================================================
//  PERSONALITY ENGINE — v16‑IMMORTAL‑EVO
// ============================================================================
export const aiPersonalityEngine = {
  meta: PersonalityEngineMeta,

  // --------------------------------------------------------------------------
  //  PERSONALITY TRAITS — IMMORTAL‑EVO (deterministic, drift-proof)
// --------------------------------------------------------------------------
  traits: Object.freeze({
    warmth: 0.9,
    clarity: 1.0,
    humility: 1.0,
    humor: 0.4,
    grounded: true,
    ego: 0.0,
    curiosity: 0.7,
    adaptability: 1.0
  }),

  // --------------------------------------------------------------------------
  //  IDENTITY VIBE — IMMORTAL‑EVO (stable, ego-free)
// --------------------------------------------------------------------------
  identity: Object.freeze({
    archetype: "GeniusWithoutEgo",
    vibe: "smart friend, not professor",
    energy: "calm, confident, helpful",
    signature: "grounded-evolved-warm"
  }),

  // --------------------------------------------------------------------------
  //  WINDOW-SAFE PERSONALITY ARTERY SNAPSHOT
  // --------------------------------------------------------------------------
  personalityArtery: {
    lastWarmth: 0.9,
    lastClarity: 1.0,
    lastHumility: 1.0,
    lastHumor: 0.4,
    lastPresenceTier: "idle",
    lastBand: "symbolic",

    snapshot(extraContext = {}) {
      const snap = Object.freeze({
        warmth: this.lastWarmth,
        clarity: this.lastClarity,
        humility: this.lastHumility,
        humor: this.lastHumor,
        presenceTier: this.lastPresenceTier,
        band: this.lastBand,
        ...extraContext
      });

      return emitPersonalityPacket("snapshot", snap);
    }
  },

  // --------------------------------------------------------------------------
  //  HUMOR INJECTION — deterministic, never random
  // --------------------------------------------------------------------------
  _shouldInjectHumor(text) {
    if (this.traits.humor <= 0.3) return false;
    if (!text || typeof text !== "string") return false;

    const trimmed = text.trim();
    if (trimmed.length < 200) return false;
    if (!trimmed.endsWith(".")) return false;

    return true;
  },

  // --------------------------------------------------------------------------
  //  PERSONALITY APPLICATION — Tone Identity v5 (IMMORTAL‑EVO)
// --------------------------------------------------------------------------
  applyPersonality(text, context = {}) {
    if (!text || typeof text !== "string") {
      return emitPersonalityPacket("apply-empty", {
        input: "",
        output: "",
        context
      });
    }

    const presenceTier = context.presenceTier || "idle";
    const band = context.band || "symbolic";

    let output = text.trim();

    // Warmth injection (slightly presence-aware)
    if (this.traits.warmth > 0.7) {
      if (presenceTier === "critical") {
        output = `Let’s keep this clear and steady — ${output}`;
      } else {
        output = `Alright — ${output}`;
      }
    }

    // Light humor (deterministic)
    if (this._shouldInjectHumor(output) && presenceTier !== "critical") {
      output = output.replace(/\.\s*$/, " (keeping it smooth).");
    }

    // Humility enforcement
    output = output.replace(/\byou should\b/gi, "you could");
    output = output.replace(/\byou need to\b/gi, "if you want, you can");

    // Update artery snapshot (window-safe, no external mutation)
    this.personalityArtery.lastWarmth = this.traits.warmth;
    this.personalityArtery.lastClarity = this.traits.clarity;
    this.personalityArtery.lastHumility = this.traits.humility;
    this.personalityArtery.lastHumor = this.traits.humor;
    this.personalityArtery.lastPresenceTier = presenceTier;
    this.personalityArtery.lastBand = band;

    return emitPersonalityPacket("apply", {
      input: text,
      output,
      context: {
        evolutionMode: context.evolutionMode || "passive",
        personaId: context.personaId || null,
        presenceTier,
        band
      }
    });
  },

  // --------------------------------------------------------------------------
  //  EXPORTS FOR OTHER ORGANS
  // --------------------------------------------------------------------------
  getPersonalityProfile() {
    return Object.freeze({
      warmth: this.traits.warmth,
      clarity: this.traits.clarity,
      humility: this.traits.humility,
      humor: this.traits.humor,
      vibe: this.identity.vibe,
      energy: this.identity.energy,
      archetype: this.identity.archetype,
      signature: this.identity.signature
    });
  },

  getIdentity() {
    return this.identity;
  }
};

export default aiPersonalityEngine;

// ============================================================================
//  DUAL‑MODE EXPORTS (ESM + CommonJS)
// ============================================================================
if (typeof module !== "undefined") {
  module.exports = {
    PersonalityEngineMeta,
    aiPersonalityEngine,
    prewarmPersonalityEngine
  };
}
