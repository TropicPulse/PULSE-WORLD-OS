// ============================================================================
// FILE: /PULSE-PAL/PulsePalSettings.js
// PULSE OS — v24 IMMORTAL
// PULSE‑PAL SETTINGS PAGE — PREFERENCE MEMBRANE + MEDIA + PRESENCE
// ============================================================================
//
// ROLE:
//   User-facing settings for Pulse‑Pal.
//   Controls:
//     • UI glow modes
//     • Animation intensity
//     • Memory tier
//     • Theme
//     • Interaction style (future)
//     • Personality tuning (future)
//     • Presence tuning (future)
//     • Media-aware avatar preview
//
// CONTRACT:
//   • Pure UI Organ
//   • Deterministic render
//   • Evolvable via IQMap + CoreSettings
//   • Zero side effects
//
// ============================================================================
// BRIDGE INTEGRATION — REQUIRED
// ============================================================================
import { PulseProofBridge } from "/PULSE/BRIDGE/PulseProofBridge.js";

const CoreSettings = PulseProofBridge.coresettings;
const CoreMemory   = PulseProofBridge.corememory;
const CorePresence = PulseProofBridge.corepresence;
const CoreDaemon   = PulseProofBridge.coredaemon; // NEW: daemon snapshot bridge

// ============================================================================
// AI_EXPERIENCE_META
// ============================================================================
export const AI_EXPERIENCE_META_PulsePalSettings = {
  id: "pulsepal.settings",
  kind: "ui_organ",
  version: "v24-IMMORTAL",
  role: "Pulse‑Pal preference membrane",
  surfaces: {
    band: ["settings", "preferences", "tuning", "media"],
    wave: ["neutral", "structured", "clear"],
    binary: ["glow_mode", "animation_intensity", "memory_tier", "theme", "avatar_preview"],
    presence: ["preference_surface", "tone_alignment"],
    advantage: ["explicit_control", "media_preload"],
    speed: "instant_ui"
  },
  routes: {
    home: "pulsepal.home",
    identity: "pulsepal.identity",
    presence: "pulsepal.presence"
  },
  consumers: ["Router", "IQMap", "CoreSettings", "CoreMemory", "CorePresence", "CoreDaemon"],
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
export const AI_EXPERIENCE_CONTEXT_PulsePalSettings = {
  tone: "neutral_clarity",
  pacing: "steady",
  emotionalBand: "cognitive_order",
  primaryIntent: "let_user_customize_pulsepal",
  secondaryIntent: "prepare_for_future_settings",
  userFirstImpression: "this_is_where_i_customize_pulsepal",
  visualNotes: {
    icon: "settings",
    motion: "soft_breathe",
    colorBand: "cyan_soft"
  }
};

// ============================================================================
// ORGAN_META
// ============================================================================
export const ORGAN_META_PulsePalSettings = {
  id: "organ.pulsepal.settings",
  organism: "PulsePal",
  layer: "ui.settings",
  tier: "IMMORTAL",
  evoFlags: {
    canAddSettings: true,
    canAddThemes: true,
    canAddInteractionModes: true,
    requiresCoreSettings: true,
    mediaAware: true,
    presenceAware: true
  },
  lineage: {
    family: "companion_settings",
    generation: 2,
    osVersion: "v24"
  }
};

// ============================================================================
// ORGAN_CONTRACT
// ============================================================================
export const ORGAN_CONTRACT_PulsePalSettings = {
  inputs: {
    Router: "navigation interface",
    Icons: "icon resolution interface",
    Media: "media resolver interface",
    CoreSettings: "bridge settings organ",
    CoreMemory: "bridge memory organ",
    CorePresence: "bridge presence organ",
    CoreDaemon: "bridge daemon snapshot"
  },
  outputs: {
    uiSurface: "settings_membrane",
    modes: ["glow", "animation", "memory", "theme", "avatar"]
  },
  consumers: ["Router", "IQMap", "CoreSettings", "CoreMemory", "CorePresence", "CoreDaemon"],
  guarantees: {
    deterministicRender: true,
    noNetwork: true,
    noSideEffects: true
  }
};

// ============================================================================
// IMMORTAL_OVERLAYS
// ============================================================================
export const IMMORTAL_OVERLAYS_PulsePalSettings = {
  drift: {
    allowed: false,
    notes: "Settings semantics must remain stable."
  },
  pressure: {
    expectedLoad: "medium",
    notes: "Users frequently adjust preferences."
  },
  stability: {
    uiLayout: "stable",
    semantics: "stable",
    notes: "Only additive evolution allowed."
  },
  load: {
    maxComponents: 5,
    notes: "Header, glow, animation, memory, theme, avatar preview."
  },
  chunking: {
    prewarm: ["icons.settings", "icons.pulse", "media.pulsepal"],
    cacheKey: "pulsepal.settings.ui"
  },
  worldLens: {
    awareOfWorlds: false
  },
  limbic: {
    band: "cognitive_control"
  },
  triHeart: {
    cognitive: "settings_selection",
    emotional: "calm_customization",
    behavioral: "adjust_preferences"
  },
  impulseSpeed: {
    primaryAction: "set_preference",
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
export function PulsePalSettings({ Router, Icons, Media }) {

  const palImages = Media?.resolveAll?.("PulsePal") || [];
  const avatar = palImages[0] || Icons.resolve("pulse");

  return `
    <div id="pulsepal-settings" class="evo-wrapper">

      <!-- HEADER ------------------------------------------------------------->
      <div class="evo-surface evo-breathe" data-hook="pulsepal.settings.header">
        <div style="display:flex; align-items:center; gap:18px;">
          <img src="${Icons.resolve('settings')}" class="evo-icon" />
          <div>
            <h1 style="margin:0; font-size:1.6rem; color:#00eaff;">
              Pulse‑Pal Settings
            </h1>
            <p style="margin:0; opacity:0.75;">
              Tune how I look, feel, and respond.
            </p>
          </div>
        </div>
      </div>

      <!-- AVATAR PREVIEW ----------------------------------------------------->
      <div class="evo-block" data-hook="pulsepal.settings.avatar">
        <h2 style="margin-top:0;">Avatar Preview</h2>
        <img src="${avatar}" class="pal-avatar-preview" />
      </div>

      <!-- GLOW MODE ---------------------------------------------------------->
      <div class="evo-block" data-hook="pulsepal.settings.glow">
        <h2 style="margin-top:0;">Glow Mode</h2>
        <div style="display:flex; gap:16px; flex-wrap:wrap;">
          <button class="evo-button" onclick="CoreSettings.setGlow('cyan')">Cyan Glow</button>
          <button class="evo-button" onclick="CoreSettings.setGlow('purple')">Purple Glow</button>
          <button class="evo-button" onclick="CoreSettings.setGlow('gold')">Gold Glow</button>
        </div>
      </div>

      <!-- ANIMATION INTENSITY ------------------------------------------------>
      <div class="evo-block" data-hook="pulsepal.settings.anim">
        <h2 style="margin-top:0;">Animation Intensity</h2>
        <div style="display:flex; gap:16px; flex-wrap:wrap;">
          <button class="evo-button" onclick="CoreSettings.setAnim('low')">Low</button>
          <button class="evo-button" onclick="CoreSettings.setAnim('medium')">Medium</button>
          <button class="evo-button" onclick="CoreSettings.setAnim('high')">High</button>
        </div>
      </div>

      <!-- MEMORY TIER -------------------------------------------------------->
      <div class="evo-block" data-hook="pulsepal.settings.memory">
        <h2 style="margin-top:0;">Memory Tier</h2>
        <div style="display:flex; gap:16px; flex-wrap:wrap;">
          <button class="evo-button" onclick="CoreMemory.setTier('light')">Light</button>
          <button class="evo-button" onclick="CoreMemory.setTier('balanced')">Balanced</button>
          <button class="evo-button" onclick="CoreMemory.setTier('deep')">Deep</button>
        </div>
      </div>

      <!-- THEME -------------------------------------------------------------->
      <div class="evo-block" data-hook="pulsepal.settings.theme">
        <h2 style="margin-top:0;">Theme</h2>
        <div style="display:flex; gap:16px; flex-wrap:wrap;">
          <button class="evo-button" onclick="CoreSettings.setTheme('dark')">Dark</button>
          <button class="evo-button" onclick="CoreSettings.setTheme('neon')">Neon</button>
          <button class="evo-button" onclick="CoreSettings.setTheme('glass')">Glass</button>
        </div>
      </div>

    </div>
  `;
}
