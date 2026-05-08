// ============================================================================
// FILE: /PULSE-PAL/PulsePalCompanion.js
// PULSE OS — v24 IMMORTAL
// PULSE‑PAL COMPANION PAGE — EMOTIONAL MEMBRANE + MEDIA + PRESENCE
// ============================================================================
//
// ROLE:
//   The Pulse‑Pal Companion Page is the emotional / bonding membrane.
//   It introduces:
//     • Bonding Level (CorePresence)
//     • Trust Mode (CorePresence)
//     • Pulse‑Pal Media Gallery (daemon-fed)
//     • Avatar Preview
//     • Presence Tone Integration
//     • Persona Hooks (future)
//     • Deterministic IMMORTAL++ UI
//
// CONTRACT:
//   • Pure UI Organ (no network)
//   • Deterministic render
//   • Evolvable via Companion Engine / IQMap
//   • Zero side effects
//
// ============================================================================
// BRIDGE INTEGRATION — REQUIRED
// ============================================================================
import { PulseProofBridge } from "/PULSE/BRIDGE/PulseProofBridge.js";

const CorePresence = PulseProofBridge.corepresence;
const CoreDaemon   = PulseProofBridge.coredaemon;

// ============================================================================
// AI_EXPERIENCE_META
// ============================================================================
export const AI_EXPERIENCE_META_PulsePalCompanion = {
  id: "pulsepal.companion",
  kind: "ui_organ",
  version: "v24-IMMORTAL",
  role: "Pulse‑Pal emotional / bonding membrane",
  surfaces: {
    band: ["companion", "emotional", "settings", "media"],
    wave: ["warm", "supportive", "attuned"],
    binary: ["bonding_mode", "trust_mode", "avatar_switch"],
    presence: ["companion_depth", "relational_state"],
    advantage: ["explicit_bond_control", "explicit_trust_control", "media_preload"],
    speed: "instant_ui"
  },
  routes: {
    home: "pulsepal.home",
    chat: "pulsepal.chat"
  },
  consumers: ["Router", "IQMap", "CompanionLayer", "CorePresence", "CoreDaemon"],
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
export const AI_EXPERIENCE_CONTEXT_PulsePalCompanion = {
  tone: "gentle_direct",
  pacing: "unhurried",
  emotionalBand: "safe_attachment",
  primaryIntent: "let_user_tune_closeness",
  secondaryIntent: "make_trust_explicit",
  userFirstImpression: "i_can_choose_how_close_this_is",
  visualNotes: {
    icon: "pulse_wave",
    motion: "soft_breathe",
    colorBand: "cyan_magenta_soft"
  }
};

// ============================================================================
// ORGAN_META
// ============================================================================
export const ORGAN_META_PulsePalCompanion = {
  id: "organ.pulsepal.companion",
  organism: "PulsePal",
  layer: "ui.companion",
  tier: "IMMORTAL",
  evoFlags: {
    canAddMoreModes: true,
    canThemeWithPresence: true,
    mediaAware: true,
    presenceAware: true,
    personaAware: true
  },
  lineage: {
    family: "companion_membrane",
    generation: 3,
    osVersion: "v24"
  }
};

// ============================================================================
// ORGAN_CONTRACT
// ============================================================================
export const ORGAN_CONTRACT_PulsePalCompanion = {
  inputs: {
    Router: "navigation interface",
    Icons: "icon resolution interface",
    Media: "media resolver interface",
    CorePresence: "bridge presence organ",
    CoreDaemon: "bridge daemon snapshot"
  },
  outputs: {
    uiSurface: "companion_membrane",
    modes: ["bonding", "trust", "gallery"],
    presence: "CorePresence.snapshot"
  },
  consumers: ["Router", "IQMap", "CompanionLayer", "CorePresence", "CoreDaemon"],
  guarantees: {
    deterministicRender: true,
    noNetwork: true,
    noSideEffects: true
  }
};

// ============================================================================
// IMMORTAL_OVERLAYS
// ============================================================================
export const IMMORTAL_OVERLAYS_PulsePalCompanion = {
  drift: {
    allowed: false,
    notes: "Bonding/trust/media semantics must remain stable."
  },
  pressure: {
    expectedLoad: "medium",
    notes: "Visited when user wants to tune relationship or view media."
  },
  stability: {
    uiLayout: "stable",
    semantics: "stable",
    notes: "Only additive evolution allowed."
  },
  load: {
    maxComponents: 5,
    notes: "Header, avatar, bonding, trust, gallery."
  },
  chunking: {
    prewarm: ["icons.pulse_wave", "media.pulsepal"],
    cacheKey: "pulsepal.companion.ui"
  },
  worldLens: {
    awareOfWorlds: true
  },
  limbic: {
    band: "attachment_safety"
  },
  triHeart: {
    cognitive: "clear_modes",
    emotional: "safety_and_choice",
    behavioral: "adjust_bond_and_trust"
  },
  impulseSpeed: {
    primaryAction: "set_bonding_mode",
    latencyTargetMs: 50
  },
  healingSurfaces: {
    enabled: true
  }
};

// ============================================================================
// IMPLEMENTATION — v24 IMMORTAL++
// ============================================================================
export function PulsePalCompanion({ Router, Icons, Media }) {

  const presence = CorePresence?.snapshot?.() || {};
  const daemon   = CoreDaemon?.snapshot?.() || {};

  const palImages = Media?.resolveAll?.("PulsePal") || [];
  const avatar = palImages[0] || Icons.resolve("pulse_wave");

  const galleryHtml = palImages.length
    ? `
      <div class="evo-block" data-hook="pulsepal.companion.gallery">
        <h2>Pulse‑Pal Gallery</h2>
        <div style="display:flex; gap:16px; flex-wrap:wrap;">
          ${palImages.map(src => `
            <div class="pal-image-frame">
              <img src="${src}" class="pal-image" />
            </div>
          `).join("")}
        </div>
      </div>
    `
    : `
      <div class="evo-block" data-hook="pulsepal.companion.gallery-empty">
        <h2>Pulse‑Pal Gallery</h2>
        <p style="opacity:0.6;">No Pulse‑Pal images found in _PICTURES.</p>
      </div>
    `;

  return `
    <div id="pulsepal-companion" class="evo-wrapper">

      <!-- HEADER -------------------------------------------------------------->
      <div class="evo-surface evo-breathe" data-hook="pulsepal.companion.header">
        <div style="display:flex; gap:18px; align-items:center;">
          <img src="${avatar}" class="evo-icon" />
          <div>
            <h1 style="margin:0;">Pulse‑Pal Companion</h1>
            <p style="margin:0; opacity:0.75;">
              ${presence.tone || "How I connect with you."}
            </p>
          </div>
        </div>
      </div>

      <!-- AVATAR PREVIEW ------------------------------------------------------>
      <div class="evo-block" data-hook="pulsepal.companion.avatar">
        <h2>Avatar</h2>
        <img src="${avatar}" class="pal-avatar-preview" />
      </div>

      <!-- BONDING -------------------------------------------------------------->
      <div class="evo-block" data-hook="pulsepal.companion.bonding">
        <h2>Bonding Level</h2>
        <div style="display:flex; gap:16px; flex-wrap:wrap;">
          <button class="evo-button" onclick="CorePresence.setBond('light')">Light</button>
          <button class="evo-button" onclick="CorePresence.setBond('balanced')">Balanced</button>
          <button class="evo-button" onclick="CorePresence.setBond('deep')">Deep</button>
        </div>
      </div>

      <!-- TRUST ---------------------------------------------------------------->
      <div class="evo-block" data-hook="pulsepal.companion.trust">
        <h2>Trust Mode</h2>
        <div style="display:flex; gap:16px; flex-wrap:wrap;">
          <button class="evo-button" onclick="CorePresence.setTrust('standard')">Standard</button>
          <button class="evo-button" onclick="CorePresence.setTrust('enhanced')">Enhanced</button>
        </div>
      </div>

      <!-- GALLERY -------------------------------------------------------------->
      ${galleryHtml}

    </div>
  `;
}
