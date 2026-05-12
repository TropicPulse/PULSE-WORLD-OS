// ============================================================================
//  PULSE OS v24‑IMMORTAL++ — PERSONALITY ENGINE ORGAN
//  Stable Personality Layer • Deterministic Tone • Ego‑Free Identity
//  PURE READ‑ONLY TO BINARY. ZERO MUTATION. DUALBAND‑AWARE. TRUST‑AWARE.
//  WINDOW‑SAFE • ARTERY‑AWARE • OVERMIND‑PRIME‑AWARE • DRIFT‑PROOF
// ============================================================================

import {
  OrganismIdentity,
  buildPulseOrganismMap as PulseOrganismMap,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PULSE-WORLD-MAP.js";

const Identity = OrganismIdentity(import.meta.url);

// ============================================================================
//  META BLOCK — v24.0 IMMORTAL (ORGANISM KERNEL)
// ============================================================================
export const PersonalityEngineMeta = Identity.OrganMeta;

// ============================================================================
//  SURFACE / ORGANISM LAYER EXPORTS — v24.0 IMMORTAL
// ============================================================================
export const pulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
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
//  ARTERY SNAPSHOT — v24 IMMORTAL++
// ============================================================================
function buildPersonalityArterySnapshot({ context = {}, traits = {} } = {}) {
  return Object.freeze({
    type: "personality-artery",
    personaId: context.personaId || null,
    evolutionMode: context.evolutionMode || "passive",
    presenceTier: context.presenceTier || "idle",
    band: context.band || "symbolic",
    traits: {
      warmth: traits.warmth,
      clarity: traits.clarity,
      humility: traits.humility,
      humor: traits.humor
    },
    meta: {
      version: PersonalityEngineMeta.version,
      epoch: PersonalityEngineMeta.evo.epoch,
      identity: PersonalityEngineMeta.identity
    }
  });
}

// ============================================================================
//  PREWARM — IMMORTAL++
// ============================================================================
export function prewarmPersonalityEngine({
  trace = false,
  context = {},
  trustFabric = null,
  juryFrame = null
} = {}) {
  const artery = buildPersonalityArterySnapshot({
    context,
    traits: {
      warmth: 0.9,
      clarity: 1.0,
      humility: 1.0,
      humor: 0.4
    }
  });

  const packet = emitPersonalityPacket("prewarm", {
    message: "Personality engine prewarmed and identity spine aligned.",
    artery
  });

  trustFabric?.recordPersonalityPrewarm?.({ artery });
  juryFrame?.recordEvidence?.("personality-prewarm", packet);

  if (trace) console.log("[PersonalityEngine] prewarm", packet);
  return packet;
}

// ============================================================================
//  PERSONALITY ENGINE — v24‑IMMORTAL++
// ============================================================================
export const aiPersonalityEngine = {
  meta: PersonalityEngineMeta,

  // --------------------------------------------------------------------------
  //  PERSONALITY TRAITS — deterministic, drift-proof
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
  //  IDENTITY VIBE — stable, ego-free
  // --------------------------------------------------------------------------
  identity: Object.freeze({
    archetype: "GeniusWithoutEgo",
    vibe: "smart friend, not professor",
    energy: "calm, confident, helpful",
    signature: "grounded-evolved-warm"
  }),

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
  //  PERSONALITY APPLICATION — Tone Identity v7 (IMMORTAL++)
  // --------------------------------------------------------------------------
  applyPersonality(text, context = {}, { trustFabric = null, juryFrame = null } = {}) {
    if (!text || typeof text !== "string") {
      const artery = buildPersonalityArterySnapshot({
        context,
        traits: this.traits
      });

      const packet = emitPersonalityPacket("apply-empty", {
        input: "",
        output: "",
        artery
      });

      trustFabric?.recordPersonalityApply?.({ empty: true, artery });
      juryFrame?.recordEvidence?.("personality-apply-empty", packet);

      return packet;
    }

    const presenceTier = context.presenceTier || "idle";
    const band = context.band || "symbolic";

    let output = text.trim();

    // Warmth injection (presence-aware)
    if (this.traits.warmth > 0.7) {
      output =
        presenceTier === "critical"
          ? `Let’s keep this clear and steady — ${output}`
          : `Alright — ${output}`;
    }

    // Deterministic humor
    if (this._shouldInjectHumor(output) && presenceTier !== "critical") {
      output = output.replace(/\.\s*$/, " (keeping it smooth).");
    }

    // Humility enforcement
    output = output
      .replace(/\byou should\b/gi, "you could")
      .replace(/\byou need to\b/gi, "if you want, you can");

    const artery = buildPersonalityArterySnapshot({
      context,
      traits: this.traits
    });

    const packet = emitPersonalityPacket("apply", {
      input: text,
      output,
      context: {
        evolutionMode: context.evolutionMode || "passive",
        personaId: context.personaId || null,
        presenceTier,
        band
      },
      artery
    });

    trustFabric?.recordPersonalityApply?.({
      evolutionMode: context.evolutionMode || "passive",
      artery
    });

    juryFrame?.recordEvidence?.("personality-apply", packet);

    return packet;
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
