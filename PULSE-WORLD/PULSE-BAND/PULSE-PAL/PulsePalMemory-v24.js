// ============================================================================
// FILE: /PULSE-PAL/PulsePalMemory.js
// PULSE OS — v24 IMMORTAL
// PULSE‑PAL MEMORY PAGE — MEMORY CORTEX + SEMANTIC ENGINE + TIMELINE
// ============================================================================
//
// ROLE:
//   The Pulse‑Pal Memory Page is the memory cortex surface.
//   It renders:
//     • Memory Tier Selection
//     • Semantic Memory Items
//     • Timeline Preview
//     • Persona + Tone Snapshot
//     • CoreMemory Integration (v24 hybrid)
//     • Media-aware memory context
//     • Daemon-aware recall tone
//
// CONTRACT:
//   • Pure UI Organ (no network)
//   • Deterministic render
//   • Evolvable via Memory Engine / IQMap
//   • Zero side effects
//
// ============================================================================
// BRIDGE INTEGRATION — REQUIRED
// ============================================================================
import { PulseProofBridge } from "/PULSE/BRIDGE/PulseProofBridge.js";

const CoreMemory     = PulseProofBridge.corememory;
const CorePresence   = PulseProofBridge.corepresence;
const CoreDaemon     = PulseProofBridge.coredaemon;
const CoreSpeech     = PulseProofBridge.corespeech;
const MemoryManager  = PulseProofBridge.corememorymanager; // optional future hook

// ============================================================================
// AI_EXPERIENCE_META
// ============================================================================
export const AI_EXPERIENCE_META_PulsePalMemory = {
  id: "pulsepal.memory",
  kind: "ui_organ",
  version: "v24-IMMORTAL",
  role: "Pulse‑Pal memory cortex membrane",
  surfaces: {
    band: ["memory", "recall", "tier", "semantic"],
    wave: ["calm", "structured", "clear"],
    binary: ["memory_tier", "memory_items", "timeline", "persona"],
    presence: ["memory_state", "recall_tone"],
    advantage: ["explicit_tier_control", "semantic_preload"],
    speed: "instant_ui"
  },
  routes: {
    home: "pulsepal.home",
    identity: "pulsepal.identity"
  },
  consumers: ["Router", "IQMap", "CoreMemory", "CorePresence", "CoreDaemon"],
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
export const AI_EXPERIENCE_CONTEXT_PulsePalMemory = {
  tone: "neutral_clarity",
  pacing: "steady",
  emotionalBand: "cognitive_order",
  primaryIntent: "let_user_control_memory_depth",
  secondaryIntent: "show_memory_items",
  userFirstImpression: "this_is_where_memory_lives",
  visualNotes: {
    icon: "memory",
    motion: "soft_breathe",
    colorBand: "cyan_soft"
  }
};

// ============================================================================
// ORGAN_META
// ============================================================================
export const ORGAN_META_PulsePalMemory = {
  id: "organ.pulsepal.memory",
  organism: "PulsePal",
  layer: "ui.memory",
  tier: "IMMORTAL",
  evoFlags: {
    canAddMemoryViews: true,
    canAddRecallModes: true,
    requiresCoreMemory: true,
    semanticAware: true,
    personaAware: true,
    presenceAware: true,
    daemonAware: true
  },
  lineage: {
    family: "companion_memory",
    generation: 3,
    osVersion: "v24"
  }
};

// ============================================================================
// ORGAN_CONTRACT
// ============================================================================
export const ORGAN_CONTRACT_PulsePalMemory = {
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
    uiSurface: "memory_cortex",
    modes: ["memory_tier", "recall"],
    memoryItems: "CoreMemory.items",
    timeline: "CoreMemory.timeline",
    persona: "CoreMemory.persona",
    presence: "CorePresence.snapshot"
  },
  consumers: ["Router", "IQMap", "CoreMemory", "CorePresence", "CoreDaemon"],
  guarantees: {
    deterministicRender: true,
    noNetwork: true,
    noSideEffects: true
  }
};

// ============================================================================
// IMMORTAL_OVERLAYS
// ============================================================================
export const IMMORTAL_OVERLAYS_PulsePalMemory = {
  drift: {
    allowed: false,
    notes: "Memory tier semantics must remain stable."
  },
  pressure: {
    expectedLoad: "medium",
    notes: "Visited when user wants to tune memory depth."
  },
  stability: {
    uiLayout: "stable",
    semantics: "stable",
    notes: "Only additive evolution allowed."
  },
  load: {
    maxComponents: 5,
    notes: "Header, tier, items, timeline, persona."
  },
  chunking: {
    prewarm: ["icons.memory", "media.pulsepal"],
    cacheKey: "pulsepal.memory.ui"
  },
  worldLens: {
    awareOfWorlds: true
  },
  limbic: {
    band: "cognitive_order"
  },
  triHeart: {
    cognitive: "memory_tier_selection",
    emotional: "calm_clarity",
    behavioral: "adjust_memory_depth"
  },
  impulseSpeed: {
    primaryAction: "set_memory_tier",
    latencyTargetMs: 50
  },
  healingSurfaces: {
    enabled: true
  }
};

// ============================================================================
// IMPLEMENTATION — v24 IMMORTAL++
// ============================================================================
export function PulsePalMemory({ Router, Icons, Media }) {

  // v24 semantic memory
  const items     = CoreMemory?.items?.()     || [];
  const timeline  = CoreMemory?.timeline?.()  || [];
  const persona   = CoreMemory?.persona?.()   || {};
  const tone      = CoreMemory?.tone?.()      || {};
  const presence  = CorePresence?.snapshot?.() || {};

  const palImages = Media?.resolveAll?.("PulsePal") || [];
  const avatar    = palImages[0] || Icons.resolve("pulse");

  return `
    <div id="pulsepal-memory" class="evo-wrapper">

      <!-- HEADER ------------------------------------------------------------->
      <div class="evo-surface evo-breathe" data-hook="pulsepal.memory.header">
        <div style="display:flex; gap:18px; align-items:center;">
          <img src="${Icons.resolve('memory')}" class="evo-icon" />
          <div>
            <h1 style="margin:0;">Pulse‑Pal Memory</h1>
            <p style="margin:0; opacity:0.75;">
              ${tone.lastUserTone || presence.tone || "How I remember and recall."}
            </p>
          </div>
        </div>
      </div>

      <!-- AVATAR ------------------------------------------------------------->
      <div class="evo-block" data-hook="pulsepal.memory.avatar">
        <h2 style="margin-top:0;">Memory Avatar</h2>
        <img src="${avatar}" class="pal-avatar-preview" />
      </div>

      <!-- MEMORY TIER -------------------------------------------------------->
      <div class="evo-block" data-hook="pulsepal.memory.tier">
        <h2>Memory Tier</h2>
        <div style="display:flex; gap:16px; flex-wrap:wrap;">
          <button class="evo-button" onclick="CoreMemory.setTier('light')">Light</button>
          <button class="evo-button" onclick="CoreMemory.setTier('balanced')">Balanced</button>
          <button class="evo-button" onclick="CoreMemory.setTier('deep')">Deep</button>
        </div>
      </div>

      <!-- MEMORY ITEMS ------------------------------------------------------->
      <div class="evo-block" data-hook="pulsepal.memory.items">
        <h2>Semantic Memory Items</h2>
        <ul class="evo-list">
          ${
            items.length === 0
              ? `<li class="evo-list-item">No memory items yet.</li>`
              : items.map(i => `<li class="evo-list-item">${JSON.stringify(i)}</li>`).join("")
          }
        </ul>
      </div>

      <!-- TIMELINE ----------------------------------------------------------->
      <div class="evo-block" data-hook="pulsepal.memory.timeline">
        <h2>Timeline</h2>
        <ul class="evo-list">
          ${
            timeline.length === 0
              ? `<li class="evo-list-item">Timeline empty.</li>`
              : timeline.slice(-20).map(evt =>
                  `<li class="evo-list-item">
                     <strong>${evt.type}</strong> — ${evt.text || evt.value || ""}
                   </li>`
                ).join("")
          }
        </ul>
      </div>

      <!-- PERSONA SNAPSHOT --------------------------------------------------->
      <div class="evo-block" data-hook="pulsepal.memory.persona">
        <h2>Persona Snapshot</h2>
        <pre class="evo-surface" style="padding:12px; opacity:0.85;">
${JSON.stringify(persona, null, 2)}
        </pre>
      </div>

      <!-- MEDIA PANEL -------------------------------------------------------->
      ${
        palImages.length
          ? `
            <div class="evo-block" data-hook="pulsepal.memory.media">
              <h2>Pulse‑Pal Media</h2>
              <div style="display:flex; gap:12px; flex-wrap:wrap;">
                ${palImages.map(src => `<img src="${src}" class="pal-memory-thumb" />`).join("")}
              </div>
            </div>
          `
          : ""
      }

    </div>
  `;
}
