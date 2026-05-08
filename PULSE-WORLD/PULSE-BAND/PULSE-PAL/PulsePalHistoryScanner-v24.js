// ============================================================================
// FILE: /PULSE-PAL/PulsePalHistoryScanner-v24.js
// PULSE OS — v24 IMMORTAL
// PULSE‑PAL HISTORY SCANNER — TIMELINE + GRAPH + PERSONA + TONE + DAEMON
// ============================================================================
//
// ROLE:
//   Visualizes the full Pulse‑Pal Memory + Daemon view:
//     • Timeline (message history projection)
//     • Memory Graph (clusters / buckets)
//     • Entities
//     • Topics
//     • Persona Traits
//     • Tone Baseline
//     • Avatar (media-aware)
//     • Daemon-fed pal summary (continuance, tier, media load)
//     • Optional CoreSpeech stats (message counts, last activity)
//
// CONTRACT:
//   • Pure UI Organ (no network)
//   • Deterministic render
//   • Evolvable via Memory Engine / IQMap / Daemon / Speech
//   • Zero side effects
//
// ============================================================================
// BRIDGE INTEGRATION — REQUIRED
// ============================================================================
import { PulseProofBridge } from "/PULSE/BRIDGE/PulseProofBridge.js";

const CoreMemory   = PulseProofBridge.corememory;
const CorePresence = PulseProofBridge.corepresence;
const CoreDaemon   = PulseProofBridge.coredaemon;
const CoreSpeech   = PulseProofBridge.corespeech;

// ============================================================================
// AI_EXPERIENCE_META
// ============================================================================
export const AI_EXPERIENCE_META_PulsePalHistoryScanner = {
  id: "pulsepal.history",
  kind: "ui_organ",
  version: "v24-IMMORTAL",
  role: "Pulse‑Pal memory + daemon history scanner membrane",
  surfaces: {
    band: ["memory", "history", "timeline", "graph", "persona"],
    wave: ["calm", "structured", "clear"],
    binary: ["timeline_view", "graph_view", "persona_view", "daemon_view"],
    presence: ["memory_state", "recall_surface"],
    advantage: [
      "explicit_memory_visibility",
      "persona_insight",
      "daemon_pal_visibility",
      "message_activity_visibility"
    ],
    speed: "instant_ui"
  },
  routes: {
    home: "pulsepal.home",
    memory: "pulsepal.memory",
    persona: "pulsepal.persona"
  },
  consumers: ["Router", "IQMap", "CoreMemory", "CorePresence", "CoreDaemon", "CoreSpeech"],
  invariants: {
    networkCalls: "none",
    sideEffects: "none",
    determinism: "strict",
    mutation: "forbidden_at_runtime"
  }
};

// ============================================================================
// AI_EXPERIENCE_CONTEXT
// ============================================================================
export const AI_EXPERIENCE_CONTEXT_PulsePalHistoryScanner = {
  tone: "neutral_clarity",
  pacing: "steady",
  emotionalBand: "cognitive_order",
  primaryIntent: "show_memory_graph",
  secondaryIntent: "show_persona_and_tone",
  userFirstImpression: "this_is_how_pulsepal_understands_history",
  visualNotes: {
    icon: "memory",
    motion: "soft_breathe",
    colorBand: "cyan_soft"
  }
};

// ============================================================================
// ORGAN_META
// ============================================================================
export const ORGAN_META_PulsePalHistoryScanner = {
  id: "organ.pulsepal.history",
  organism: "PulsePal",
  layer: "ui.memory",
  tier: "IMMORTAL",
  evoFlags: {
    canAddMemoryViews: true,
    canAddGraphViews: true,
    canAddPersonaViews: true,
    canAddDaemonViews: true,
    requiresCoreMemory: true,
    mediaAware: true,
    presenceAware: true,
    personaAware: true,
    daemonAware: true,
    speechAware: true
  },
  lineage: {
    family: "companion_memory_scanner",
    generation: 2,
    osVersion: "v24"
  }
};

// ============================================================================
// ORGAN_CONTRACT
// ============================================================================
export const ORGAN_CONTRACT_PulsePalHistoryScanner = {
  inputs: {
    Router: "navigation interface",
    Icons: "icon resolution interface",
    Media: "media resolver interface",
    CoreMemory: "bridge memory organ",
    CorePresence: "bridge presence organ",
    CoreDaemon: "bridge daemon snapshot",
    CoreSpeech: "bridge speech organ"
  },
  outputs: {
    uiSurface: "history_scanner_membrane",
    memoryGraph: "CoreMemory.graph",
    memoryTimeline: "CoreMemory.timeline",
    persona: "CoreMemory.persona",
    tone: "CoreMemory.tone",
    daemonPalSummary: "CoreDaemon.palSummary",
    speechStats: "CoreSpeech.stats"
  },
  consumers: ["Router", "IQMap", "CoreMemory", "CorePresence", "CoreDaemon", "CoreSpeech"],
  guarantees: {
    deterministicRender: true,
    noNetwork: true,
    noSideEffects: true
  }
};

// ============================================================================
// IMMORTAL_OVERLAYS
// ============================================================================
export const IMMORTAL_OVERLAYS_PulsePalHistoryScanner = {
  drift: {
    allowed: false,
    notes: "Memory graph + daemon semantics must remain stable."
  },
  pressure: {
    expectedLoad: "medium",
    notes: "Used during introspection, debugging, or curiosity checks."
  },
  stability: {
    uiLayout: "stable",
    semantics: "stable",
    notes: "Only additive evolution allowed."
  },
  load: {
    maxComponents: 7,
    notes: "Header, avatar, timeline, graph, persona, tone, daemon/activity."
  },
  chunking: {
    prewarm: ["icons.memory", "icons.pulse", "icons.ai_brain", "media.pulsepal"],
    cacheKey: "pulsepal.history.ui"
  },
  worldLens: {
    awareOfWorlds: true,
    notes: "History may include Pulse‑World contexts via Memory Engine."
  },
  limbic: {
    band: "cognitive_order",
    notes: "User should feel oriented about what is remembered and how."
  },
  triHeart: {
    cognitive: "memory_graph_understanding",
    emotional: "clarity",
    behavioral: "review_history"
  },
  impulseSpeed: {
    primaryAction: "open_history",
    latencyTargetMs: 50
  },
  healingSurfaces: {
    enabled: true,
    notes: "Seeing history + persona reduces uncertainty about what persists."
  }
};

// ============================================================================
// IMPLEMENTATION — v24 IMMORTAL++
// ============================================================================
export function PulsePalHistoryScanner({ Router, Icons, Media }) {

  // ---- CORE SNAPSHOTS ------------------------------------------------------
  // Memory Engine: explicit APIs (timeline, graph, persona, tone)
  const memoryTimeline = CoreMemory?.timeline?.() || [];
  const memoryGraph    = CoreMemory?.graph?.()    || {};
  const persona        = CoreMemory?.persona?.()  || {};
  const tone           = CoreMemory?.tone?.()     || {};

  // Presence snapshot (for header line / tone text)
  const presence = CorePresence?.snapshot?.() || {};

  // Daemon snapshot / pal summary (v24 PAL‑HELPER)
  const daemonSnapshot =
    CoreDaemon?.snapshot?.() ||
    CoreDaemon?.snapshot?.()    ||
    {};
  const palSummary =
    daemonSnapshot.palSummary ||
    CoreDaemon?.palSummary?.() ||
    {};

  // Speech stats (message counts, last activity, etc.)
  const speechStats = CoreSpeech?.stats?.() || {};

  // Avatar (media-aware, daemon‑compatible)
  const palImages = Media?.resolveAll?.("PulsePal") || [];
  const avatar = palImages[0] || Icons.resolve("pulse");

  // ---- DERIVED MEMORY STRUCTURES ------------------------------------------
  const timeline = memoryTimeline || [];
  const graph    = memoryGraph.graph    || memoryGraph || {};
  const entities = memoryGraph.entities || {};
  const topics   = memoryGraph.topics   || {};
  const personaModel = persona || {};
  const toneModel    = tone    || {};

  // ---- TIMELINE HTML (MESSAGE HISTORY PROJECTION) -------------------------
  const timelineHtml = timeline.length
    ? timeline.map(item => `
        <li class="evo-list-item">
          <strong>[${item.type || "event"}]</strong>
          ${item.timestamp ? ` — <span style="opacity:0.7;">${item.timestamp}</span>` : ""}
          <br/>
          ${item.text || item.value || ""}
        </li>
      `).join("")
    : `<li class="evo-list-item">No timeline entries yet.</li>`;

  // ---- GRAPH HTML ---------------------------------------------------------
  const graphHtml = Object.keys(graph).length
    ? Object.keys(graph).map(key => {
        const bucket = graph[key];
        const size = Array.isArray(bucket) ? bucket.length : 0;
        return `
          <li class="evo-list-item">
            <strong>${key}</strong>: ${size} items
          </li>
        `;
      }).join("")
    : `<li class="evo-list-item">Graph empty.</li>`;

  // ---- ENTITIES HTML ------------------------------------------------------
  const entitiesHtml = Object.keys(entities).length
    ? Object.entries(entities).map(([k, v]) => `
        <li class="evo-list-item">${k}: ${v}</li>
      `).join("")
    : `<li class="evo-list-item">No entities extracted.</li>`;

  // ---- TOPICS HTML --------------------------------------------------------
  const topicsHtml = Object.keys(topics).length
    ? Object.entries(topics).map(([k, v]) => `
        <li class="evo-list-item">${k}: ${v}</li>
      `).join("")
    : `<li class="evo-list-item">No topics detected.</li>`;

  // ---- PERSONA HTML -------------------------------------------------------
  const personaHtml = Object.keys(personaModel).length
    ? Object.entries(personaModel).map(([k, v]) => `
        <li class="evo-list-item">
          <strong>${k}</strong>: ${v}
        </li>
      `).join("")
    : `<li class="evo-list-item">Persona not computed.</li>`;

  // ---- TONE HTML ----------------------------------------------------------
  const toneHtml = Object.keys(toneModel).length
    ? Object.entries(toneModel).map(([k, v]) => `
        <li class="evo-list-item">
          <strong>${k}</strong>: ${v}
        </li>
      `).join("")
    : `<li class="evo-list-item">Tone not computed.</li>`;

  // ---- DAEMON PAL SUMMARY HTML (CLOSES LOOP WITH DAEMON) ------------------
  const palSummaryHtml = Object.keys(palSummary).length
    ? Object.entries(palSummary).map(([k, v]) => `
        <li class="evo-list-item">
          <strong>${k}</strong>: ${v}
        </li>
      `).join("")
    : `<li class="evo-list-item">Daemon pal summary not available yet.</li>`;

  // ---- SPEECH STATS HTML (MESSAGE ACTIVITY) -------------------------------
  const speechStatsHtml = Object.keys(speechStats).length
    ? Object.entries(speechStats).map(([k, v]) => `
        <li class="evo-list-item">
          <strong>${k}</strong>: ${v}
        </li>
      `).join("")
    : `<li class="evo-list-item">No conversation stats available yet.</li>`;

  // ========================================================================
  // RENDER
  // ========================================================================
  return `
    <div id="pulsepal-history" class="evo-wrapper">

      <!-- HEADER ------------------------------------------------------------->
      <div class="evo-surface evo-breathe" data-hook="pulsepal.history.header">
        <div style="display:flex; align-items:center; gap:18px;">
          <img src="${avatar}" class="evo-icon" />
          <div>
            <h1 style="margin:0;">Pulse‑Pal History Scanner</h1>
            <p style="margin:0; opacity:0.75;">
              ${presence.tone || "How I understand our history and how the daemon sees me."}
            </p>
          </div>
        </div>
      </div>

      <!-- TIMELINE (MESSAGE HISTORY PROJECTION) ------------------------------>
      <div class="evo-block" data-hook="pulsepal.history.timeline">
        <h2>Timeline</h2>
        <ul class="evo-list">
          ${timelineHtml}
        </ul>
      </div>

      <!-- MEMORY GRAPH ------------------------------------------------------->
      <div class="evo-block" data-hook="pulsepal.history.graph">
        <h2>Memory Graph</h2>
        <ul class="evo-list">
          ${graphHtml}
        </ul>
      </div>

      <!-- ENTITIES ----------------------------------------------------------->
      <div class="evo-block" data-hook="pulsepal.history.entities">
        <h2>Entities</h2>
        <ul class="evo-list">
          ${entitiesHtml}
        </ul>
      </div>

      <!-- TOPICS ------------------------------------------------------------->
      <div class="evo-block" data-hook="pulsepal.history.topics">
        <h2>Topics</h2>
        <ul class="evo-list">
          ${topicsHtml}
        </ul>
      </div>

      <!-- PERSONA ------------------------------------------------------------>
      <div class="evo-block" data-hook="pulsepal.history.persona">
        <h2>Persona Traits</h2>
        <ul class="evo-list">
          ${personaHtml}
        </ul>
      </div>

      <!-- TONE --------------------------------------------------------------->
      <div class="evo-block" data-hook="pulsepal.history.tone">
        <h2>Tone</h2>
        <ul class="evo-list">
          ${toneHtml}
        </ul>
      </div>

      <!-- DAEMON + ACTIVITY (CLOSED LOOP) ----------------------------------->
      <div class="evo-block" data-hook="pulsepal.history.daemon">
        <h2>Daemon View (Pal Summary)</h2>
        <p style="opacity:0.75; margin-top:0;">
          How the v24 Continuance Daemon classifies Pulse‑Pal (palCount, palCoreCount, avgPalContinuance, etc.).
        </p>
        <ul class="evo-list">
          ${palSummaryHtml}
        </ul>
      </div>

      <div class="evo-block" data-hook="pulsepal.history.activity">
        <h2>Conversation Activity</h2>
        <ul class="evo-list">
          ${speechStatsHtml}
        </ul>
      </div>

    </div>
  `;
}
