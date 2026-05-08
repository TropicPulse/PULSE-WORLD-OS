// ============================================================================
// FILE: /PULSE-PAL/PulsePalPresence.js
// PULSE OS — v24 IMMORTAL
// PULSE‑PAL PRESENCE PAGE — AURA MEMBRANE + MEDIA + TONE ENGINE
// ============================================================================
//
// ROLE:
//   Controls Pulse‑Pal’s presence state:
//     • Aura
//     • Glow
//     • Emotional tone
//     • Activity mode (NEW v24)
//     • Expression level
//     • Media-aware avatar preview
//     • Presence snapshot (CorePresence)
//     • Persona hooks (future)
//
// CONTRACT:
//   • Pure UI Organ
//   • Deterministic render
//   • Evolvable via Presence Engine / IQMap
//   • Zero side effects
//
// ============================================================================
// BRIDGE INTEGRATION — REQUIRED
// ============================================================================
import { PulseProofBridge } from "/PULSE/BRIDGE/PulseProofBridge.js";

const CorePresence = PulseProofBridge.corepresence;
const CoreDaemon   = PulseProofBridge.coredaemon; // NEW: daemon snapshot bridge

// ============================================================================
// AI_EXPERIENCE_META
// ============================================================================
export const AI_EXPERIENCE_META_PulsePalPresence = {
  id: "pulsepal.presence",
  kind: "ui_organ",
  version: "v24-IMMORTAL",
  role: "Pulse‑Pal aura + emotional presence membrane",
  surfaces: {
    band: ["presence", "aura", "tone", "media"],
    wave: ["warm", "focused", "neutral"],
    binary: ["aura_mode", "expression_level", "tone_mode", "activity_mode"],
    presence: ["emotional_state", "aura_state", "activity_state"],
    advantage: ["explicit_presence_control", "media_preload"],
    speed: "instant_ui"
  },
  routes: {
    home: "pulsepal.home",
    identity: "pulsepal.identity",
    companion: "pulsepal.companion"
  },
  consumers: ["Router", "IQMap", "CorePresence", "CoreDaemon"],
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
export const AI_EXPERIENCE_CONTEXT_PulsePalPresence = {
  tone: "warm_balanced",
  pacing: "steady",
  emotionalBand: "expressive_control",
  primaryIntent: "let_user_tune_presence",
  secondaryIntent: "show_aura_modes",
  userFirstImpression: "this_is_where_pulsepal_feels",
  visualNotes: {
    icon: "presence",
    motion: "soft_breathe",
    colorBand: "cyan_magenta_soft"
  }
};

// ============================================================================
// ORGAN_META
// ============================================================================
export const ORGAN_META_PulsePalPresence = {
  id: "organ.pulsepal.presence",
  organism: "PulsePal",
  layer: "ui.presence",
  tier: "IMMORTAL",
  evoFlags: {
    canAddAuraModes: true,
    canAddToneModes: true,
    canAddActivityModes: true,
    requiresCorePresence: true,
    mediaAware: true,
    personaAware: true
  },
  lineage: {
    family: "companion_presence",
    generation: 2,
    osVersion: "v24"
  }
};

// ============================================================================
// ORGAN_CONTRACT
// ============================================================================
export const ORGAN_CONTRACT_PulsePalPresence = {
  inputs: {
    Router: "navigation interface",
    Icons: "icon resolution interface",
    Media: "media resolver interface",
    CorePresence: "bridge presence organ",
    CoreDaemon: "bridge daemon snapshot"
  },
  outputs: {
    uiSurface: "presence_membrane",
    modes: ["aura", "expression", "tone", "activity"]
  },
  consumers: ["Router", "IQMap", "CorePresence", "CoreDaemon"],
  guarantees: {
    deterministicRender: true,
    noNetwork: true,
    noSideEffects: true
  }
};

// ============================================================================
// IMMORTAL_OVERLAYS
// ============================================================================
export const IMMORTAL_OVERLAYS_PulsePalPresence = {
  drift: {
    allowed: false,
    notes: "Presence semantics must remain stable."
  },
  pressure: {
    expectedLoad: "high",
    notes: "Presence is frequently adjusted by users."
  },
  stability: {
    uiLayout: "stable",
    semantics: "stable",
    notes: "Only additive evolution allowed."
  },
  load: {
    maxComponents: 5,
    notes: "Header, aura, expression, tone, activity, avatar preview."
  },
  chunking: {
    prewarm: ["icons.presence", "icons.pulse", "icons.neon_ring", "media.pulsepal"],
    cacheKey: "pulsepal.presence.ui"
  },
  worldLens: {
    awareOfWorlds: true
  },
  limbic: {
    band: "emotional_regulation"
  },
  triHeart: {
    cognitive: "presence_mode_selection",
    emotional: "attuned_expression",
    behavioral: "adjust_aura_expression_tone"
  },
  impulseSpeed: {
    primaryAction: "set_presence_mode",
    latencyTargetMs: 50
  },
  healingSurfaces: {
    enabled: true
  }
};

// ============================================================================
// IMPLEMENTATION — v24 IMMORTAL++
// ============================================================================
/*
@PULSE_IMMORTAL_REQUIRE_FULL_META
*/
export function PulsePalPresence({ Router, Icons, Media }) {

  const presence = CorePresence?.snapshot?.() || {};
  const palImages = Media?.resolveAll?.("PulsePal") || [];
  const avatar = palImages[0] || Icons.resolve("pulse");

  return `
    <div id="pulsepal-presence" class="evo-wrapper">

      <!-- HEADER ------------------------------------------------------------->
      <div class="evo-surface evo-breathe" data-hook="pulsepal.presence.header">
        <div style="display:flex; align-items:center; gap:18px;">
          <img src="${Icons.resolve('presence')}" class="evo-icon" />
          <div>
            <h1 style="margin:0; font-size:1.6rem; color:#00eaff;">
              Pulse‑Pal Presence
            </h1>
            <p style="margin:0; opacity:0.75;">
              ${presence.tone || "Adjust my aura, tone, and expression."}
            </p>
          </div>
        </div>
      </div>

      <!-- AVATAR PREVIEW ----------------------------------------------------->
      <div class="evo-block" data-hook="pulsepal.presence.avatar">
        <h2 style="margin-top:0;">Avatar Preview</h2>
        <img src="${avatar}" class="pal-avatar-preview" />
      </div>

      <!-- AURA --------------------------------------------------------------->
      <div class="evo-block" data-hook="pulsepal.presence.aura">
        <h2 style="margin-top:0;">Aura</h2>
        <div style="display:flex; gap:16px; flex-wrap:wrap;">
          <button class="evo-button" onclick="CorePresence.setAura('calm')">Calm</button>
          <button class="evo-button" onclick="CorePresence.setAura('bright')">Bright</button>
          <button class="evo-button" onclick="CorePresence.setAura('focused')">Focused</button>
        </div>
      </div>

      <!-- EXPRESSION --------------------------------------------------------->
      <div class="evo-block" data-hook="pulsepal.presence.expression">
        <h2 style="margin-top:0;">Expression Level</h2>
        <div style="display:flex; gap:16px; flex-wrap:wrap;">
          <button class="evo-button" onclick="CorePresence.setExpression('low')">Low</button>
          <button class="evo-button" onclick="CorePresence.setExpression('medium')">Medium</button>
          <button class="evo-button" onclick="CorePresence.setExpression('high')">High</button>
        </div>
      </div>

      <!-- EMOTIONAL TONE ----------------------------------------------------->
      <div class="evo-block" data-hook="pulsepal.presence.tone">
        <h2 style="margin-top:0;">Emotional Tone</h2>
        <div style="display:flex; gap:16px; flex-wrap:wrap;">
          <button class="evo-button" onclick="CorePresence.setTone('warm')">Warm</button>
          <button class="evo-button" onclick="CorePresence.setTone('neutral')">Neutral</button>
          <button class="evo-button" onclick="CorePresence.setTone('technical')">Technical</button>
        </div>
      </div>

      <!-- ACTIVITY MODE (NEW v24) ------------------------------------------->
      <div class="evo-block" data-hook="pulsepal.presence.activity">
        <h2 style="margin-top:0;">Activity Mode</h2>
        <div style="display:flex; gap:16px; flex-wrap:wrap;">
          <button class="evo-button" onclick="CorePresence.setActivity('listening')">Listening</button>
          <button class="evo-button" onclick="CorePresence.setActivity('thinking')">Thinking</button>
          <button class="evo-button" onclick="CorePresence.setActivity('active')">Active</button>
        </div>
      </div>

    </div>
  `;
}
