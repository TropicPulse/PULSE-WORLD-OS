// ============================================================================
// FILE: /PULSE-PAL/PulsePalMemoryEngine-v24.js
// PULSE OS — v24 IMMORTAL
// PULSE‑PAL MEMORY ENGINE — SEMANTIC TIMELINE + GRAPH + PERSONA + TONE
// ============================================================================
//
// ROLE:
//   The Memory Engine is the semantic cortex behind Pulse‑Pal.
//   It builds:
//     • Semantic Timeline
//     • Semantic Graph
//     • Entities
//     • Topics
//     • Persona
//     • Tone
//   (NEW v24++):
//     • Continuity (daemon-aware)
//     • Mode Influence (mode-aware)
//     • Daemon Pal surfaces (palHistory / palSummary)
//     • Presence-aware activity + expression in tone
//
//   It feeds CoreMemory.engine.fullScan() and incremental().
//
// CONTRACT:
//   • Pure logic organ (no UI)
//   • Deterministic
//   • Zero network
//   • Evolvable
//
// ============================================================================
import {
  OrganismIdentity,
  buildPulseOrganismMap as PulseOrganismMap,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PULSE-WORLD-MAP.js";
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

export class PulsePalMemoryEngine {
  constructor({ CoreMemory, CoreSpeech, CorePresence, CoreDaemon }) {
    this.CoreMemory   = CoreMemory;
    this.CoreSpeech   = CoreSpeech;
    this.CorePresence = CorePresence;
    this.CoreDaemon   = CoreDaemon;

    this.snapshot = {
      timeline: [],
      graph: {},
      entities: {},
      topics: {},
      persona: {},
      tone: {},
      // NEW v24++ surfaces
      continuity: {
        score: 0,
        sources: []
      },
      mode: {
        activeMode: "advisor",
        influence: {}
      }
    };
  }

  // ==========================================================================
  // FULL SCAN — v24 IMMORTAL
  // ==========================================================================
  fullScan() {
    const speech   = this.CoreSpeech?.messages?.() || [];
    const presence = this.CorePresence?.snapshot?.() || {};
    const daemon   = this.CoreDaemon?.snapshot?.() || {};

    // Build timeline (speech only for now — memory items come from CoreMemory)
    const timeline = speech.map(m => ({
      type: "speech",
      ...m
    }));

    // Build graph (original)
    const graph = { speech: [...timeline] };

    // Extract entities + topics
    const entities = this.extractEntities(timeline);
    const topics   = this.extractTopics(timeline);

    // Persona + tone (original, now extended)
    const persona = this.computePersona({ speech, presence, daemon, topics });
    const tone    = this.computeTone({ speech, presence, daemon });

    // NEW: continuity + mode surfaces
    const continuity = this.computeContinuity({ timeline, topics, daemon });
    const mode       = this.computeMode({ presence, daemon, topics });

    // Update snapshot (additive)
    this.snapshot = {
      timeline,
      graph,
      entities,
      topics,
      persona,
      tone,
      continuity,
      mode
    };

    // Feed CoreMemory semantic engine (original)
    this.CoreMemory.engine.fullScan({
      speech,
      presence,
      daemon,
      // NEW: pass-through for richer engines (backwards compatible)
      entities,
      topics,
      persona,
      tone,
      continuity,
      mode
    });

    return this.snapshot;
  }

  // ==========================================================================
  // INCREMENTAL UPDATE — v24 IMMORTAL
  // ==========================================================================
  incrementalUpdate() {
    const newSpeech = this.CoreSpeech?.recent?.() || [];
    if (newSpeech.length === 0) return this.snapshot;

    // Update timeline (original)
    for (const m of newSpeech) {
      this.snapshot.timeline.push({ type: "speech", ...m });
    }

    // Update graph (original)
    if (!this.snapshot.graph.speech) this.snapshot.graph.speech = [];
    this.snapshot.graph.speech.push(...newSpeech);

    // Update entities + topics (original)
    this.snapshot.entities = this.extractEntities(this.snapshot.timeline);
    this.snapshot.topics   = this.extractTopics(this.snapshot.timeline);

    const presence = this.CorePresence?.snapshot?.() || {};
    const daemon   = this.CoreDaemon?.snapshot?.() || {};

    // Update persona + tone (original, now extended)
    this.snapshot.persona = this.computePersona({
      speech: this.snapshot.graph.speech,
      presence,
      daemon,
      topics: this.snapshot.topics
    });

    this.snapshot.tone = this.computeTone({
      speech: this.snapshot.graph.speech,
      presence,
      daemon
    });

    // NEW: update continuity + mode
    this.snapshot.continuity = this.computeContinuity({
      timeline: this.snapshot.timeline,
      topics: this.snapshot.topics,
      daemon
    });

    this.snapshot.mode = this.computeMode({
      presence,
      daemon,
      topics: this.snapshot.topics
    });

    // Feed CoreMemory semantic engine incrementally (original, now richer)
    this.CoreMemory.engine.incremental({
      speech: this.snapshot.graph.speech,
      presence,
      daemon,
      entities: this.snapshot.entities,
      topics: this.snapshot.topics,
      persona: this.snapshot.persona,
      tone: this.snapshot.tone,
      continuity: this.snapshot.continuity,
      mode: this.snapshot.mode
    });

    return this.snapshot;
  }

  // ==========================================================================
  // ENTITY EXTRACTION — v24
  // ==========================================================================
  extractEntities(timeline) {
    const entities = {};
    for (const item of timeline) {
      if (item.type === "speech" && item.text) {
        const words = item.text.split(/\s+/);
        for (const w of words) {
          if (w.length > 3) {
            if (!entities[w]) entities[w] = 0;
            entities[w]++;
          }
        }
      }
    }
    return entities;
  }

  // ==========================================================================
  // TOPIC EXTRACTION — v24
  // ==========================================================================
  extractTopics(timeline) {
    const topics = {};
    for (const item of timeline) {
      if (item.type === "speech" && item.text) {
        const lower = item.text.toLowerCase();
        if (lower.includes("world"))   topics.world   = (topics.world   || 0) + 1;
        if (lower.includes("task"))    topics.tasks   = (topics.tasks   || 0) + 1;
        if (lower.includes("memory"))  topics.memory  = (topics.memory  || 0) + 1;
        if (lower.includes("presence"))topics.presence= (topics.presence|| 0) + 1;
        // NEW: mode-ish topics
        if (lower.includes("grid"))       topics.grid       = (topics.grid       || 0) + 1;
        if (lower.includes("architect"))  topics.architect  = (topics.architect  || 0) + 1;
        if (lower.includes("earn"))       topics.earn       = (topics.earn       || 0) + 1;
        if (lower.includes("tourist"))    topics.tourist    = (topics.tourist    || 0) + 1;
        if (lower.includes("fox"))        topics.fox        = (topics.fox        || 0) + 1;
      }
    }
    return topics;
  }

  // ==========================================================================
  // PERSONA COMPUTATION — v24 (extended, additive)
// ==========================================================================
  computePersona({ speech, presence, daemon, topics }) {
    const base = {
      warmth: presence?.tone === "warm" ? 1 : 0.5,
      focus: presence?.activity === "focused" ? 1 : 0.5,
      expressiveness: presence?.expression || "medium",
      continuity: daemon?.continuity || 0,
      speechVolume: speech?.length || 0
    };

    // NEW: daemon pal surfaces
    const palHistory = daemon?.palHistory || {};
    const palSummary = daemon?.palSummary || {};
    const palPersona = daemon?.palPersona || {};

    const continuityScore =
      palHistory.continuityScore ??
      palSummary.avgPalContinuance ??
      base.continuity ??
      0;

    // NEW: mode influence (from palPersona or topics)
    const activeMode =
      palPersona?.tone?.activeMode ||
      presence?.activityMode ||
      presence?.activity ||
      "advisor";

    const modeInfluence = {
      grid:       (topics?.grid       || 0) / (speech.length || 1),
      architect:  (topics?.architect  || 0) / (speech.length || 1),
      earn:       (topics?.earn       || 0) / (speech.length || 1),
      tourist:    (topics?.tourist    || 0) / (speech.length || 1),
      fox:        (topics?.fox        || 0) / (speech.length || 1)
    };

    return {
      ...base,
      // NEW: richer continuity + mode surfaces
      continuityScore,
      modeInfluence,
      activeMode
    };
  }

  // ==========================================================================
  // TONE COMPUTATION — v24 (extended, additive)
// ==========================================================================
  computeTone({ speech, presence, daemon }) {
    const last = speech[speech.length - 1];

    const baseline = presence?.tone || "neutral";

    // NEW: activity + expression + daemon-aware recall tone
    const activity   = presence?.activity || "active";
    const expression = presence?.expression || "medium";

    const palHistory = daemon?.palHistory || {};
    const recallTone =
      palHistory.continuityScore > 50
        ? "anchored"
        : "light";

    return {
      baseline,
      lastUserTone: last?.tone || "neutral",
      lastMessage: last?.text || "",
      activity,
      expression,
      recallTone
    };
  }

  // ==========================================================================
  // CONTINUITY COMPUTATION — v24++ (NEW)
// ==========================================================================
  computeContinuity({ timeline, topics, daemon }) {
    const palHistory = daemon?.palHistory || {};
    const palSummary = daemon?.palSummary || {};

    const baseScore =
      (timeline?.length || 0) +
      Object.keys(topics || {}).length * 5;

    const daemonScore =
      palHistory.continuityScore ??
      palSummary.avgPalContinuance ??
      0;

    const score = baseScore + daemonScore;

    const sources = [];
    if (palHistory.sources && palHistory.sources.length) {
      sources.push(...palHistory.sources);
    }
    if (palSummary.palMediaFiles && palSummary.palMediaFiles.length) {
      sources.push("palMediaFiles");
    }

    return {
      score,
      sources
    };
  }

  // ==========================================================================
  // MODE COMPUTATION — v24++ (NEW)
// ==========================================================================
  computeMode({ presence, daemon, topics }) {
    const palPersona = daemon?.palPersona || {};

    const activeMode =
      palPersona?.tone?.activeMode ||
      presence?.activityMode ||
      presence?.activity ||
      "advisor";

    const influence = {
      grid:       (topics?.grid       || 0),
      architect:  (topics?.architect  || 0),
      earn:       (topics?.earn       || 0),
      tourist:    (topics?.tourist    || 0),
      fox:        (topics?.fox        || 0)
    };

    return {
      activeMode,
      influence
    };
  }
}
