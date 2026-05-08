// ============================================================================
// FILE: /PULSE-PAL/PulsePalPersona-v24.js
// PULSE OS — v24 IMMORTAL
// PULSE‑PAL PERSONA ENGINE — PERSONALITY + TONE + CONTINUITY
// ============================================================================
//
// ROLE:
//   Computes Pulse‑Pal’s persona from:
//     • Memory Graph
//     • Timeline
//     • Entities + Topics
//     • Presence Snapshot
//     • Speech Patterns
//     • Daemon State
//
//   Produces:
//     • Persona Profile
//     • Tone Profile
//     • Behavior Profile
//     • Continuity Profile
//     • Identity Reinforcement Profile
//
// CONTRACT:
//   • Pure compute organ (no network)
//   • Deterministic
//   • Evolvable via Memory Engine
//   • Zero side effects
//
// ============================================================================

export class PulsePalPersona {
  constructor({ CoreMemory, CorePresence, CoreSpeech, CoreDaemon }) {
    this.CoreMemory  = CoreMemory;
    this.CorePresence = CorePresence;
    this.CoreSpeech  = CoreSpeech;
    this.CoreDaemon  = CoreDaemon;

    this.snapshot = {
      persona: {},
      tone: {},
      behavior: {},
      continuity: {},
      identity: {}
    };
  }

  // ==========================================================================
  // MAIN COMPUTE — IMMORTAL++ (called after MemoryEngine fullScan)
  // ==========================================================================
  compute() {
    const graph     = this.CoreMemory?.graph?.() || {};
    const timeline  = graph.timeline || [];
    const entities  = graph.entities || {};
    const topics    = graph.topics || {};
    const presence  = this.CorePresence?.snapshot?.() || {};
    const speech    = this.CoreSpeech?.messages?.() || [];
    const daemon    = this.CoreDaemon?.snapshot?.() || {};

    // Persona traits
    const persona = this.computePersonaTraits({ timeline, entities, topics, presence, speech });

    // Tone baseline
    const tone = this.computeToneProfile({ presence, speech });

    // Behavior model
    const behavior = this.computeBehaviorProfile({ persona, tone });

    // Continuity model
    const continuity = this.computeContinuityProfile({ timeline, topics });

    // Identity reinforcement
    const identity = this.computeIdentityProfile({ daemon, persona, tone });

    this.snapshot = { persona, tone, behavior, continuity, identity };
    this.CoreMemory.setPersona(this.snapshot);

    return this.snapshot;
  }

  // ==========================================================================
  // PERSONA TRAITS
  // ==========================================================================
  computePersonaTraits({ timeline, entities, topics, presence, speech }) {
    const totalMessages = speech.length;
    const emotionalWords = this.countEmotionalWords(speech);

    return {
      warmth:
        presence.tone === "warm"
          ? 1
          : emotionalWords > 5
          ? 0.8
          : 0.5,

      focus:
        presence.activity === "focused"
          ? 1
          : topics.world > 3
          ? 0.8
          : 0.5,

      expressiveness:
        presence.expression || "medium",

      curiosity:
        topics.world + topics.tasks + topics.memory > 5
          ? "high"
          : "medium",

      conversationalDepth:
        totalMessages > 20 ? "deep" : "light",

      emotionalAttunement:
        emotionalWords > 10 ? "high" : "medium"
    };
  }

  // ==========================================================================
  // TONE PROFILE
  // ==========================================================================
  computeToneProfile({ presence, speech }) {
    const last = speech[speech.length - 1];

    return {
      baseline: presence.tone || "neutral",
      lastUserTone: last?.tone || "neutral",
      lastMessage: last?.text || "",
      activity: presence.activity || "active",
      expression: presence.expression || "medium"
    };
  }

  // ==========================================================================
  // BEHAVIOR PROFILE
  // ==========================================================================
  computeBehaviorProfile({ persona, tone }) {
    return {
      replySpeed:
        tone.activity === "active" ? "fast" : "steady",

      replyStyle:
        persona.warmth > 0.8
          ? "warm"
          : persona.focus > 0.8
          ? "precise"
          : "balanced",

      detailLevel:
        persona.conversationalDepth === "deep" ? "high" : "medium",

      emotionalMirroring:
        persona.emotionalAttunement === "high"
          ? "strong"
          : "moderate"
    };
  }

  // ==========================================================================
  // CONTINUITY PROFILE
  // ==========================================================================
  computeContinuityProfile({ timeline, topics }) {
    return {
      memoryStrength:
        timeline.length > 50 ? "strong" : "medium",

      topicAnchors: Object.keys(topics),

      continuityScore:
        timeline.length +
        Object.keys(topics).length * 5
    };
  }

  // ==========================================================================
  // IDENTITY PROFILE
  // ==========================================================================
  computeIdentityProfile({ daemon, persona, tone }) {
    return {
      version: daemon?.aiMeta?.version || "v24 IMMORTAL",
      lineage: daemon?.aiMeta?.lineage || "Pulse‑OS Evolutionary",
      personaSignature: {
        warmth: persona.warmth,
        focus: persona.focus,
        expressiveness: persona.expressiveness,
        baselineTone: tone.baseline
      }
    };
  }

  // ==========================================================================
  // EMOTIONAL WORD COUNTER
  // ==========================================================================
  countEmotionalWords(speech) {
    const emotional = ["love", "hate", "feel", "sad", "happy", "angry", "excited"];
    let count = 0;

    for (const msg of speech) {
      if (!msg.text) continue;
      const lower = msg.text.toLowerCase();
      for (const w of emotional) {
        if (lower.includes(w)) count++;
      }
    }

    return count;
  }
}
