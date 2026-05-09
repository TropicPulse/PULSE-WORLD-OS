// ============================================================================
// FILE: /PULSE-PAL/PulsePalPresence.js
// PULSE OS — v24 IMMORTAL
// PULSE‑PAL PRESENCE PAGE — AURA MEMBRANE + MEDIA + TONE + MODE + CONTINUITY
// ============================================================================
//
// ROLE:
//   Controls Pulse‑Pal’s live presence state:
//     • Aura
//     • Glow
//     • Emotional tone
//     • Activity mode
//     • Expression level
//     • Active archetype / mode (advisor, grid, etc.)
//     • Media-aware avatar preview (mode-based)
//     • Presence snapshot (CorePresence)
//     • Persona + continuity surfaces (via daemon / persona engine)
//
// CONTRACT:
//   • Pure UI Organ (no network)
//   • Deterministic render
//   • Evolvable via Presence / Mode / Persona Engines / IQMap
//   • Zero side effects (only calls CorePresence setters via onclick)
//
// ============================================================================
// BRIDGE INTEGRATION — REQUIRED
// ============================================================================
import { PulseProofBridge } from "../../PULSE-UI/_BACKEND/PULSE-WORLD-BRIDGE.js";

const CorePresence = PulseProofBridge.corepresence;
const CoreDaemon   = PulseProofBridge.coredaemon; // daemon snapshot bridge

// ============================================================================
// AI_EXPERIENCE_META
// ============================================================================
export const AI_EXPERIENCE_META_PulsePalPresence = {
  id: "pulsepal.presence",
  kind: "ui_organ",
  version: "v24-IMMORTAL",
  role: "Pulse‑Pal aura + emotional + mode presence membrane",
  surfaces: {
    band: ["presence", "aura", "tone", "media", "mode", "continuity"],
    wave: ["warm", "focused", "neutral", "attuned"],
    binary: [
      "aura_mode",
      "expression_level",
      "tone_mode",
      "activity_mode",
      "active_mode",
      "avatar_mode"
    ],
    presence: [
      "emotional_state",
      "aura_state",
      "activity_state",
      "mode_state",
      "continuity_state"
    ],
    advantage: [
      "explicit_presence_control",
      "media_preload",
      "mode_flip",
      "persona_visibility"
    ],
    speed: "instant_ui"
  },
  routes: {
    home: "pulsepal.home",
    identity: "pulsepal.identity",
    companion: "pulsepal.companion",
    memory: "pulsepal.memory"
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
  primaryIntent: "let_user_tune_presence_and_mode",
  secondaryIntent: "show_aura_modes_and_continuity",
  userFirstImpression: "this_is_where_pulsepal_feels_and_which_mode_is_active",
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
    canAddArchetypeModes: true,
    requiresCorePresence: true,
    mediaAware: true,
    personaAware: true,
    continuityAware: true
  },
  lineage: {
    family: "companion_presence",
    generation: 3,
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
    modes: ["aura", "expression", "tone", "activity", "mode"],
    presenceSnapshot: "CorePresence.snapshot()",
    daemonSnapshot: "CoreDaemon.snapshot() (palSummary, palHistory, palPersona)"
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
    notes: "Presence + mode semantics must remain stable."
  },
  pressure: {
    expectedLoad: "high",
    notes: "Presence is frequently adjusted by users and engines."
  },
  stability: {
    uiLayout: "stable",
    semantics: "stable",
    notes: "Only additive evolution allowed."
  },
  load: {
    maxComponents: 7,
    notes: "Header, avatar, aura, expression, tone, activity, mode, continuity."
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
    behavioral: "adjust_aura_expression_tone_mode"
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
  const daemonSnapshot = CoreDaemon?.snapshot?.() || {};
  const palSummary = daemonSnapshot.palSummary || {};
  const palHistory = daemonSnapshot.palHistory || {};
  const palPersona = daemonSnapshot.palPersona || {};

  const palImages = Media?.resolveAll?.("PulsePal") || [];

  const activeMode = presence.mode || presence.activeMode || "advisor";
  const modeWeights = presence.modeWeights || {};
  const continuityScore =
    palHistory.continuityScore != null
      ? palHistory.continuityScore
      : palSummary.avgPalContinuance != null
        ? palSummary.avgPalContinuance
        : 0;

  // Mode-aware avatar resolution: pick image whose name includes the mode
  let avatar = palImages[0] || Icons.resolve("pulse");
  if (palImages.length && activeMode) {
    const lowerMode = String(activeMode).toLowerCase();
    const match = palImages.find(src =>
      String(src).toLowerCase().includes(lowerMode)
    );
    if (match) avatar = match;
  }

  const personaTone = palPersona?.tone || {};
  const personaWarmth = personaTone.warmth ?? presence.warmth ?? null;

  const modeWeightsList = Object.keys(modeWeights).length
    ? Object.entries(modeWeights)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6)
    : [];

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
              ${presence.tone || personaTone.baseline || "Adjust my aura, mode, and expression."}
            </p>
            <p style="margin:0; opacity:0.55; font-size:0.85rem;">
              Active mode: <strong>${activeMode}</strong> · Continuity: ${continuityScore}
            </p>
          </div>
        </div>
      </div>

      <!-- AVATAR + MODE ------------------------------------------------------>
      <div class="evo-block" data-hook="pulsepal.presence.avatar_mode">
        <div style="display:flex; gap:24px; flex-wrap:wrap; align-items:flex-start;">

          <!-- AVATAR PREVIEW -->
          <div style="flex:0 0 auto;">
            <h2 style="margin-top:0;">Avatar Preview</h2>
            <img src="${avatar}" class="pal-avatar-preview" />
            <p style="margin:8px 0 0; opacity:0.7; font-size:0.85rem;">
              Avatar follows the active mode and preloaded Pulse‑Pal images.
            </p>
          </div>

          <!-- MODE SELECTION -->
          <div style="flex:1 1 220px;">
            <h2 style="margin-top:0;">Archetype Mode</h2>
            <div style="display:flex; gap:10px; flex-wrap:wrap;">
              <button class="evo-button" onclick="CorePresence.setMode && CorePresence.setMode('advisor')">Advisor</button>
              <button class="evo-button" onclick="CorePresence.setMode && CorePresence.setMode('architect')">Architect</button>
              <button class="evo-button" onclick="CorePresence.setMode && CorePresence.setMode('entrepreneur')">Entrepreneur</button>
              <button class="evo-button" onclick="CorePresence.setMode && CorePresence.setMode('grid')">Grid</button>
              <button class="evo-button" onclick="CorePresence.setMode && CorePresence.setMode('mesh')">Mesh</button>
              <button class="evo-button" onclick="CorePresence.setMode && CorePresence.setMode('tourist')">Tourist</button>
              <button class="evo-button" onclick="CorePresence.setMode && CorePresence.setMode('expansion')">Expansion</button>
              <button class="evo-button" onclick="CorePresence.setMode && CorePresence.setMode('finality')">Finality</button>
              <button class="evo-button" onclick="CorePresence.setMode && CorePresence.setMode('fox')">Fox</button>
              <button class="evo-button" onclick="CorePresence.setMode && CorePresence.setMode('human')">Human</button>
            </div>

            ${
              modeWeightsList.length
                ? `
                  <div style="margin-top:12px;">
                    <p style="margin:0 0 4px; opacity:0.7; font-size:0.85rem;">
                      Mode blend (top weights):
                    </p>
                    <ul class="evo-list" style="margin:0;">
                      ${modeWeightsList
                        .map(
                          ([mode, w]) =>
                            `<li class="evo-list-item">${mode}: ${(w * 100).toFixed(1)}%</li>`
                        )
                        .join("")}
                    </ul>
                  </div>
                `
                : ""
            }
          </div>

        </div>
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

      <!-- ACTIVITY MODE ------------------------------------------------------>
      <div class="evo-block" data-hook="pulsepal.presence.activity">
        <h2 style="margin-top:0;">Activity Mode</h2>
        <div style="display:flex; gap:16px; flex-wrap:wrap;">
          <button class="evo-button" onclick="CorePresence.setActivity('listening')">Listening</button>
          <button class="evo-button" onclick="CorePresence.setActivity('thinking')">Thinking</button>
          <button class="evo-button" onclick="CorePresence.setActivity('active')">Active</button>
        </div>
      </div>

      <!-- CONTINUITY + PERSONA GLANCE ---------------------------------------->
      <div class="evo-block" data-hook="pulsepal.presence.continuity">
        <h2 style="margin-top:0;">Continuity & Persona</h2>
        <p style="margin:0 0 4px; opacity:0.8;">
          History continuity score: <strong>${continuityScore}</strong>
        </p>
        <p style="margin:0 0 4px; opacity:0.7; font-size:0.9rem;">
          Messages scanned: ${palHistory.messagesScanned || 0}
        </p>
        ${
          personaWarmth != null
            ? `<p style="margin:0; opacity:0.7; font-size:0.9rem;">
                 Persona warmth: ${personaWarmth}
               </p>`
            : ""
        }
      </div>

    </div>
  `;
}
