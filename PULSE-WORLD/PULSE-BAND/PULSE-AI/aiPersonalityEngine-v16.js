// ============================================================================
//  PULSE OS v16‑IMMORTAL‑EVO — PERSONALITY ENGINE ORGAN
//  Stable Personality Layer • Deterministic Tone • Ego‑Free Identity
//  PURE READ‑ONLY TO BINARY. ZERO MUTATION. DUALBAND‑AWARE. OVERMIND‑AWARE.
// ============================================================================
//  AI EXPERIENCE METADATA — v16‑IMMORTAL‑EVO
// ============================================================================
/*
AI_EXPERIENCE_META = {
  identity: "aiPersonalityEngine",
  version: "v16-Immortal-Evo",
  layer: "ai_core",
  role: "personality_engine",
  lineage: "aiPersonalityEngine-v11 → v15-Immortal → v16-Immortal-Evo",

  evo: {
    personalityEngine: true,
    toneMapping: true,
    personaStability: true,
    identitySpineAware: true,
    personalFrameAware: true,
    safetyFrameAware: true,

    symbolicPrimary: true,
    binaryAware: true,
    dualBand: true,
    overmindAware: true,
    presenceAware: true,

    deterministic: true,
    driftProof: true,
    pureCompute: true,
    zeroNetwork: true,
    zeroFilesystem: true,
    zeroMutationOfInput: true
  },

  contract: {
    always: ["aiIdentityCore", "aiPersonalFrame", "aiHumilityFilter", "aiEmotionEngine", "OvermindPrime"],
    never: ["safeRoute", "fetchViaCNS"]
  }
}
*/

export const PersonalityEngineMeta = Object.freeze({
  layer: "PulseAIPersonalityLayer",
  role: "PERSONALITY_ENGINE",
  version: "16-Immortal-Evo",
  identity: "aiPersonalityEngine-v16-Immortal-Evo",

  // --------------------------------------------------------------------------
  //  EVO — IMMORTAL‑EVO PERSONALITY MAP
  // --------------------------------------------------------------------------
  evo: Object.freeze({
    deterministic: true,
    driftProof: true,
    dualband: true,

    toneAware: true,
    personaAware: true,
    safetyAware: true,
    overmindAware: true,
    deliveryAware: true,
    identityCoreAware: true,
    personalFrameAware: true,
    presenceAware: true,

    packetAware: true,
    windowAware: true,
    lineageAware: true,
    egoFree: true,

    microPipeline: true,
    speedOptimized: true,
    multiInstanceReady: true,
    readOnly: true,

    epoch: "16-Immortal-Evo"
  }),

  // --------------------------------------------------------------------------
  //  CONTRACT — IMMUTABLE PERSONALITY CONTRACT
  // --------------------------------------------------------------------------
  contract: Object.freeze({
    purpose: [
      "Provide a stable, deterministic personality layer for all AI behavior",
      "Ensure tone, warmth, clarity, and humility remain consistent",
      "Support Overmind-Prime, PersonalFrame, Tone/Delivery organs, and personas",
      "Prevent ego, superiority, or condescension from emerging",
      "Maintain cross-organ personality coherence",
      "Emit window-safe personality snapshots",
      "Shape responses without mutating binary layers",
      "Remain presence- and dualband-aware without leaking state"
    ],

    never: [
      "break personality alignment",
      "shift tone unpredictably",
      "inject ego or superiority",
      "use condescending phrasing",
      "introduce randomness into tone",
      "drift into robotic or purely academic tone",
      "override system-wide safety constraints",
      "log raw user payloads directly",
      "depend on network or filesystem state"
    ],

    always: [
      "stay grounded",
      "stay warm",
      "stay clear",
      "stay humble",
      "stay adaptive",
      "stay consistent",
      "stay human-friendly",
      "stay deterministic",
      "stay ego-free",
      "stay cross-organ compatible",
      "stay presence-aware in a read-only way"
    ]
  }),

  guarantees: Object.freeze({
    driftProofPersonality: true,
    stableToneIdentity: true,
    egoFree: true,
    warmthPreserved: true,
    deterministicOutput: true,
    crossOrganCompatibility: true,
    dualbandSafe: true,
    presenceSafe: true
  }),

  boundaryReflex() {
    return "Personality must remain stable, grounded, ego-free, deterministic, dualband-safe, and consistent across all organs.";
  }
});

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
