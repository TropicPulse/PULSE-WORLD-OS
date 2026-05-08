// ============================================================================
// FILE: /PULSE-PAL/PulsePalSettings.js
// PULSE OS — v24 IMMORTAL
// PULSE‑PAL SETTINGS PAGE — PREFERENCE MEMBRANE + MEDIA + PRESENCE + MODE
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
//     • Mode selection (NEW v24++)
//     • Fox/Human form toggle (NEW v24++)
//     • Persona tuning (NEW v24++)
//     • Presence tuning (NEW v24++)
//     • Mode-aware avatar preview (NEW v24++)
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
    band: ["settings", "preferences", "tuning", "media", "mode"],
    wave: ["neutral", "structured", "clear"],
    binary: [
      "glow_mode",
      "animation_intensity",
      "memory_tier",
      "theme",
      "avatar_preview",
      "mode_selection",
      "persona_tuning",
      "presence_tuning",
      "form_toggle"
    ],
    presence: ["preference_surface", "tone_alignment"],
    advantage: ["explicit_control", "media_preload", "mode_preload"],
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
    presenceAware: true,
    modeAware: true,          // NEW
    personaAware: true,       // NEW
    daemonAware: true         // NEW
  },
  lineage: {
    family: "companion_settings",
    generation: 3,
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
    modes: [
      "glow",
      "animation",
      "memory",
      "theme",
      "avatar",
      "mode",
      "persona",
      "presence",
      "form"
    ]
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
    maxComponents: 8,
    notes: "Header, glow, animation, memory, theme, avatar, mode, persona, presence."
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
export function PulsePalSettings({ Router, Icons, Media }) {

  const palImages = Media?.resolveAll?.("PulsePal") || [];
  let avatar = palImages[0] || Icons.resolve("pulse");

  // NEW: daemon + persona + presence surfaces
  const daemonSnapshot = CoreDaemon?.snapshot?.() || {};
  const palPersona     = daemonSnapshot.palPersona || {};
  const palSummary     = daemonSnapshot.palSummary || {};
  const palHistory     = daemonSnapshot.palHistory || {};

  const presence = CorePresence?.snapshot?.() || {};
  const persona  = CoreMemory?.persona?.() || {};

  // NEW: active mode + mode-aware avatar
  const activeMode =
    presence.mode ||
    palPersona?.tone?.activeMode ||
    persona?.tone?.activeMode ||
    "advisor";

  if (palImages.length && activeMode) {
    const lower = activeMode.toLowerCase();
    const match = palImages.find(src => String(src).toLowerCase().includes(lower));
    if (match) avatar = match;
  }

  return `
    <div id="pulsepal-settings" class="evo-wrapper">

      <!-- HEADER ------------------------------------------------------------->
      <div class="evo-surface evo-breathe" data-hook="pulsepal.settings.header">
        <div style="display:flex; align-items:center; gap:18px;">
          <img src="\${Icons.resolve('settings')}" class="evo-icon" />
          <div>
            <h1 style="margin:0; font-size:1.6rem; color:#00eaff;">
              Pulse‑Pal Settings
            </h1>
            <p style="margin:0; opacity:0.75;">
              Tune how I look, feel, and respond.
            </p>
            <!-- NEW: mode + continuity -->
            <p style="margin:0; opacity:0.55; font-size:0.85rem;">
              Mode: <strong>\${activeMode}</strong> · Continuity: \${palHistory.continuityScore || 0}
            </p>
          </div>
        </div>
      </div>

      <!-- AVATAR PREVIEW ----------------------------------------------------->
      <div class="evo-block" data-hook="pulsepal.settings.avatar">
        <h2 style="margin-top:0;">Avatar Preview</h2>
        <img src="\${avatar}" class="pal-avatar-preview" />
        <p style="margin:8px 0 0; opacity:0.7; font-size:0.85rem;">
          Avatar follows the active mode and preloaded Pulse‑Pal images.
        </p>
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

      <!-- NEW: MODE SELECTION ------------------------------------------------>
      <div class="evo-block" data-hook="pulsepal.settings.mode">
        <h2 style="margin-top:0;">Mode Selection</h2>
        <p style="opacity:0.7; margin-top:-4px;">Switch Pulse‑Pal’s cognitive/behavioral mode.</p>
        <div style="display:flex; gap:12px; flex-wrap:wrap;">
          <button class="evo-button" onclick="CorePresence.setMode('advisor')">Advisor</button>
          <button class="evo-button" onclick="CorePresence.setMode('architect')">Architect</button>
          <button class="evo-button" onclick="CorePresence.setMode('entrepreneur')">Entrepreneur</button>
          <button class="evo-button" onclick="CorePresence.setMode('grid')">Grid</button>
          <button class="evo-button" onclick="CorePresence.setMode('mesh')">Mesh</button>
          <button class="evo-button" onclick="CorePresence.setMode('expansion')">Expansion</button>
          <button class="evo-button" onclick="CorePresence.setMode('finality')">Finality</button>
          <button class="evo-button" onclick="CorePresence.setMode('tourist')">Tourist</button>
          <button class="evo-button" onclick="CorePresence.setMode('fox')">Fox</button>
          <button class="evo-button" onclick="CorePresence.setMode('human')">Human</button>
        </div>
      </div>

      <!-- NEW: FORM TOGGLE (FOX / HUMAN) ------------------------------------>
      <div class="evo-block" data-hook="pulsepal.settings.form">
        <h2 style="margin-top:0;">Form</h2>
        <p style="opacity:0.7; margin-top:-4px;">Switch between Fox form and Human form.</p>
        <div style="display:flex; gap:16px; flex-wrap:wrap;">
          <button class="evo-button" onclick="CorePresence.setForm('fox')">Fox Form</button>
          <button class="evo-button" onclick="CorePresence.setForm('human')">Human Form</button>
        </div>
      </div>

      <!-- NEW: PERSONA TUNING ------------------------------------------------>
      <div class="evo-block" data-hook="pulsepal.settings.persona">
        <h2 style="margin-top:0;">Persona Tuning</h2>
        <p style="opacity:0.7; margin-top:-4px;">Adjust Pulse‑Pal’s personality traits.</p>
        <div style="display:flex; gap:16px; flex-wrap:wrap;">
          <button class="evo-button" onclick="CoreSettings.setPersona('warmth','high')">Increase Warmth</button>
          <button class="evo-button" onclick="CoreSettings.setPersona('focus','high')">Increase Focus</button>
          <button class="evo-button" onclick="CoreSettings.setPersona('expressiveness','high')">Increase Expressiveness</button>
        </div>
      </div>

      <!-- NEW: PRESENCE TUNING ---------------------------------------------->
      <div class="evo-block" data-hook="pulsepal.settings.presence">
        <h2 style="margin-top:0;">Presence Tuning</h2>
        <p style="opacity:0.7; margin-top:-4px;">Adjust aura, tone, expression, and activity.</p>
        <div style="display:flex; gap:16px; flex-wrap:wrap;">
          <button class="evo-button" onclick="CorePresence.setAura('calm')">Calm Aura</button>
          <button class="evo-button" onclick="CorePresence.setTone('warm')">Warm Tone</button>
          <button class="evo-button" onclick="CorePresence.setExpression('high')">High Expression</button>
          <button class="evo-button" onclick="CorePresence.setActivity('thinking')">Thinking Mode</button>
        </div>
      </div>

      <!-- NEW: MEDIA PANEL --------------------------------------------------->
      ${
        palImages.length
          ? `
            <div class="evo-block" data-hook="pulsepal.settings.media">
              <h2>Pulse‑Pal Media</h2>
              <p style="opacity:0.7; margin-top:-4px;">All detected Pulse‑Pal images.</p>
              <div style="display:flex; gap:12px; flex-wrap:wrap;">
                ${palImages.map(src => `<img src="\${src}" class="pal-memory-thumb" />`).join("")}
              </div>
            </div>
          `
          : ""
      }

    </div>
  `;
}
