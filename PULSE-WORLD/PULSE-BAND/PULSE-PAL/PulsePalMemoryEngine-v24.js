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
      tone: {}
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

    // Build graph
    const graph = { speech: [...timeline] };

    // Extract entities + topics
    const entities = this.extractEntities(timeline);
    const topics   = this.extractTopics(timeline);

    // Persona + tone
    const persona = this.computePersona({ speech, presence, daemon });
    const tone    = this.computeTone({ speech, presence });

    // Update snapshot
    this.snapshot = { timeline, graph, entities, topics, persona, tone };

    // Feed CoreMemory semantic engine
    this.CoreMemory.engine.fullScan({
      speech,
      presence,
      daemon
    });

    return this.snapshot;
  }

  // ==========================================================================
  // INCREMENTAL UPDATE — v24 IMMORTAL
  // ==========================================================================
  incrementalUpdate() {
    const newSpeech = this.CoreSpeech?.recent?.() || [];
    if (newSpeech.length === 0) return this.snapshot;

    // Update timeline
    for (const m of newSpeech) {
      this.snapshot.timeline.push({ type: "speech", ...m });
    }

    // Update graph
    if (!this.snapshot.graph.speech) this.snapshot.graph.speech = [];
    this.snapshot.graph.speech.push(...newSpeech);

    // Update entities + topics
    this.snapshot.entities = this.extractEntities(this.snapshot.timeline);
    this.snapshot.topics   = this.extractTopics(this.snapshot.timeline);

    // Update persona + tone
    this.snapshot.persona = this.computePersona({
      speech: this.snapshot.graph.speech,
      presence: this.CorePresence?.snapshot?.(),
      daemon: this.CoreDaemon?.snapshot?.()
    });

    this.snapshot.tone = this.computeTone({
      speech: this.snapshot.graph.speech,
      presence: this.CorePresence?.snapshot?.()
    });

    // Feed CoreMemory semantic engine incrementally
    this.CoreMemory.engine.incremental({
      speech: this.snapshot.graph.speech,
      presence: this.CorePresence?.snapshot?.(),
      daemon: this.CoreDaemon?.snapshot?.()
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
        if (lower.includes("world")) topics.world = (topics.world || 0) + 1;
        if (lower.includes("task")) topics.tasks = (topics.tasks || 0) + 1;
        if (lower.includes("memory")) topics.memory = (topics.memory || 0) + 1;
        if (lower.includes("presence")) topics.presence = (topics.presence || 0) + 1;
      }
    }
    return topics;
  }

  // ==========================================================================
  // PERSONA COMPUTATION — v24
  // ==========================================================================
  computePersona({ speech, presence, daemon }) {
    return {
      warmth: presence?.tone === "warm" ? 1 : 0.5,
      focus: presence?.activity === "focused" ? 1 : 0.5,
      expressiveness: presence?.expression || "medium",
      continuity: daemon?.continuity || 0,
      speechVolume: speech?.length || 0
    };
  }

  // ==========================================================================
  // TONE COMPUTATION — v24
  // ==========================================================================
  computeTone({ speech, presence }) {
    const last = speech[speech.length - 1];
    return {
      baseline: presence?.tone || "neutral",
      lastUserTone: last?.tone || "neutral",
      lastMessage: last?.text || ""
    };
  }
}
