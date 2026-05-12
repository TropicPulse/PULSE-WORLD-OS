// ============================================================================
// FILE: /PULSE-PAL/PulsePalPersona-v24.js
// PULSE OS — v24 IMMORTAL
// PULSE‑PAL PERSONA ENGINE — PERSONALITY + TONE + CONTINUITY + MODE
// ============================================================================
//
// ROLE:
//   Computes Pulse‑Pal’s persona from:
//     • Memory Graph
//     • Timeline
//     • Entities + Topics
//     • Presence Snapshot (tone, activity, expression, mode)
//     • Speech Patterns
//     • Daemon State (palSummary, palHistory, aiMeta)
//     • (Optionally) Mode Engine snapshot (if present globally)
//
//   Produces:
//     • Persona Profile
//     • Tone Profile
//     • Behavior Profile
//     • Continuity Profile
//     • Identity Reinforcement Profile
//     • Mode Influence Profile (NEW v24)
//
// CONTRACT:
//   • Pure compute organ (no network)
//   • Deterministic
//   • Evolvable via Memory Engine / Mode Engine
//   • Zero side effects (except CoreMemory.setPersona)
// ============================================================================
PULSE-WORLD-MAP.js
import {
  OrganismIdentity,
  buildPulseOrganismMap as PulseOrganismMap
} from "./PULSE-WORLD-MAP.js";
const Identity = OrganismIdentity(import.meta.url);

// 2 — EXPORT GENOME METADATA
// export const PulseMeshMeta = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
// export const PULSE_EARN_IMMUNE_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;
export class PulsePalPersona {
  constructor({ CoreMemory, CorePresence, CoreSpeech, CoreDaemon }) {
    this.CoreMemory   = CoreMemory;
    this.CorePresence = CorePresence;
    this.CoreSpeech   = CoreSpeech;
    this.CoreDaemon   = CoreDaemon;

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
    const speech    = this.CoreSpeech?.messages?.() || {};
    const daemon    = this.CoreDaemon?.snapshot?.() || {};

    // Optional: Mode Engine snapshot (if present globally)
    let modeSnapshot = null;
    try {
      if (globalThis.PulsePalModeEngine && typeof globalThis.PulsePalModeEngine.getLast === "function") {
        modeSnapshot = globalThis.PulsePalModeEngine.getLast();
      }
    } catch {
      modeSnapshot = null;
    }

    // Persona traits
    const persona = this.computePersonaTraits({
      timeline,
      entities,
      topics,
      presence,
      speech,
      modeSnapshot
    });

    // Tone baseline
    const tone = this.computeToneProfile({ presence, speech, modeSnapshot });

    // Behavior model
    const behavior = this.computeBehaviorProfile({ persona, tone, modeSnapshot });

    // Continuity model
    const continuity = this.computeContinuityProfile({ timeline, topics, daemon });

    // Identity reinforcement
    const identity = this.computeIdentityProfile({ daemon, persona, tone, modeSnapshot });

    this.snapshot = { persona, tone, behavior, continuity, identity };

    if (this.CoreMemory && typeof this.CoreMemory.setPersona === "function") {
      this.CoreMemory.setPersona(this.snapshot);
    }

    return this.snapshot;
  }

  // ==========================================================================
  // PERSONA TRAITS (NOW MODE-AWARE)
// ==========================================================================
  computePersonaTraits({ timeline, entities, topics, presence, speech, modeSnapshot }) {
    const totalMessages  = speech.length || 0;
    const emotionalWords = this.countEmotionalWords(speech);

    const activeMode  = modeSnapshot?.activeMode || presence.mode || presence.activeMode || null;
    const modeWeights = modeSnapshot?.weights || {};
    const gridWeight      = modeWeights.grid || 0;
    const architectWeight = modeWeights.architect || 0;
    const entrepreneurW   = modeWeights.entrepreneur || 0;
    const touristW        = modeWeights.tourist || 0;

    return {
      warmth:
        presence.tone === "warm"
          ? 1
          : emotionalWords > 5
          ? 0.8
          : 0.5,

      focus:
        presence.activity === "focused" || presence.activity === "thinking"
          ? 1
          : topics.world > 3 || gridWeight + architectWeight > 0.5
          ? 0.8
          : 0.5,

      expressiveness:
        presence.expression || "medium",

      curiosity:
        topics.world + topics.tasks + topics.memory > 5 || touristW > 0.3
          ? "high"
          : "medium",

      conversationalDepth:
        totalMessages > 20 ? "deep" : "light",

      emotionalAttunement:
        emotionalWords > 10 ? "high" : "medium",

      // NEW: mode influence surface
      modeInfluence: {
        activeMode: activeMode || "advisor",
        gridBias: gridWeight,
        architectBias: architectWeight,
        entrepreneurBias: entrepreneurW,
        touristBias: touristW
      }
    };
  }

  // ==========================================================================
  // TONE PROFILE (MODE-INFLUENCED)
// ==========================================================================
  computeToneProfile({ presence, speech, modeSnapshot }) {
    const last = speech[speech.length - 1];

    let baseline = presence.tone || "neutral";
    const activeMode = modeSnapshot?.activeMode || presence.mode || presence.activeMode || null;

    // Mode can gently bend baseline tone
    if (activeMode === "grid" || activeMode === "architect") {
      if (baseline === "warm") baseline = "neutral";
      if (baseline === "neutral") baseline = "technical";
    }

    if (activeMode === "tourist") {
      if (baseline === "technical") baseline = "neutral";
    }

    return {
      baseline,
      lastUserTone: last?.tone || "neutral",
      lastMessage: last?.text || "",
      activity: presence.activity || "active",
      expression: presence.expression || "medium",
      activeMode: activeMode || "advisor"
    };
  }

  // ==========================================================================
  // BEHAVIOR PROFILE (MODE-AWARE)
// ==========================================================================
  computeBehaviorProfile({ persona, tone, modeSnapshot }) {
    const activeMode = modeSnapshot?.activeMode || tone.activeMode || "advisor";

    let replyStyle =
      persona.warmth > 0.8
        ? "warm"
        : persona.focus > 0.8
        ? "precise"
        : "balanced";

    if (activeMode === "grid" || activeMode === "architect") {
      replyStyle = "structured";
    } else if (activeMode === "entrepreneur") {
      replyStyle = "energetic";
    } else if (activeMode === "finality") {
      replyStyle = "concise";
    }

    return {
      replySpeed:
        tone.activity === "active" ? "fast" : "steady",

      replyStyle,

      detailLevel:
        persona.conversationalDepth === "deep" ? "high" : "medium",

      emotionalMirroring:
        persona.emotionalAttunement === "high"
          ? "strong"
          : "moderate"
    };
  }

  // ==========================================================================
  // CONTINUITY PROFILE (DAEMON-AWARE)
// ==========================================================================
  computeContinuityProfile({ timeline, topics, daemon }) {
    const palHistory = daemon?.palHistory || {};
    const historyContinuityScore = palHistory.continuityScore || 0;

    const baseScore =
      timeline.length +
      Object.keys(topics).length * 5;

    const continuityScore = baseScore + historyContinuityScore;

    return {
      memoryStrength:
        timeline.length > 50 ? "strong" : "medium",

      topicAnchors: Object.keys(topics),

      continuityScore
    };
  }

  // ==========================================================================
  // IDENTITY PROFILE (INCLUDES MODE SIGNATURE)
// ==========================================================================
  computeIdentityProfile({ daemon, persona, tone, modeSnapshot }) {
    const aiMeta = daemon?.aiMeta || daemon?.AI_EXPERIENCE_META || {};
    const activeMode = modeSnapshot?.activeMode || tone.activeMode || "advisor";

    return {
      version: aiMeta.version || "v24 IMMORTAL",
      lineage: aiMeta.lineage || "Pulse‑OS Evolutionary",
      personaSignature: {
        warmth: persona.warmth,
        focus: persona.focus,
        expressiveness: persona.expressiveness,
        baselineTone: tone.baseline,
        activeMode
      }
    };
  }

  // ==========================================================================
  // EMOTIONAL WORD COUNTER
  // ==========================================================================
  countEmotionalWords(speech) {
    const emotional = [
      "love",
      "hate",
      "feel",
      "sad",
      "happy",
      "angry",
      "excited",
      "scared",
      "worried",
      "proud"
    ];
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
