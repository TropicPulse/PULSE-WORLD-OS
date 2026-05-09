// ============================================================================
// FILE: /PULSE-PAL/PulsePalCompanion-v24++.js
// PULSE OS — v24 IMMORTAL++
// PULSE‑PAL COMPANION CORTEX — EMOTIONAL ENGINE + PRESENCE + PERSONA + MEDIA
// ============================================================================
//
// ROLE:
//   The Pulse‑Pal Companion Cortex is the emotional membrane.
//   It renders and manages:
//     • Bonding Level (CorePresence)
//     • Trust Mode (CorePresence)
//     • Persona‑aware emotional behavior
//     • Mode‑aware avatar (fox/human/system)
//     • Daemon‑aware emotional resonance
//     • World‑aware emotional hooks
//     • Media gallery (PulsePal images)
//     • Presence aura + tone
//     • Continuity‑aware bonding depth
//     • IMMORTAL++ deterministic UI
//
// CONTRACT:
//   • Pure UI Organ
//   • Deterministic render
//   • Evolvable via Companion Engine / IQMap
//   • Zero side effects
//
// ============================================================================
// BRIDGE INTEGRATION — REQUIRED
// ============================================================================
import { PulseProofBridge } from "../../PULSE-UI/_BACKEND/PULSE-WORLD-BRIDGE.js";

const CorePresence = PulseProofBridge.corepresence;
const CoreDaemon   = PulseProofBridge.coredaemon;
const CoreMemory   = PulseProofBridge.corememory;
const CoreSettings = PulseProofBridge.coresettings;

// ============================================================================
// AI_EXPERIENCE_META — v24 IMMORTAL++
// ============================================================================
export const AI_EXPERIENCE_META_PulsePalCompanion = {
  id: "pulsepal.companion",
  kind: "ui_organ",
  version: "v24-IMMORTAL++",
  role: "Pulse‑Pal emotional / bonding cortex membrane",
  surfaces: {
    band: ["companion", "emotional", "presence", "media", "persona", "mode"],
    wave: ["warm", "supportive", "attuned", "mode_aware"],
    binary: [
      "bonding_mode",
      "trust_mode",
      "avatar_switch",
      "emotional_state",
      "gallery_panel"
    ],
    presence: ["companion_depth", "relational_state"],
    advantage: ["explicit_bond_control", "explicit_trust_control", "media_preload"],
    speed: "instant_ui"
  },
  routes: {
    home: "pulsepal.home",
    chat: "pulsepal.speech",
    identity: "pulsepal.identity"
  },
  consumers: [
    "Router",
    "IQMap",
    "CompanionLayer",
    "CorePresence",
    "CoreDaemon",
    "CoreMemory",
    "CoreSettings"
  ],
  invariants: {
    networkCalls: "none",
    sideEffects: "none",
    determinism: "strict",
    mutation: "forbidden_at_runtime"
  }
};

// ============================================================================
// AI_EXPERIENCE_CONTEXT — v24 IMMORTAL++
// ============================================================================
export const AI_EXPERIENCE_CONTEXT_PulsePalCompanion = {
  tone: "gentle_direct",
  pacing: "unhurried",
  emotionalBand: "safe_attachment",
  primaryIntent: "let_user_tune_closeness",
  secondaryIntent: "make_trust_explicit",
  userFirstImpression: "this_is_the_emotional_core",
  visualNotes: {
    icon: "pulse_wave",
    motion: "soft_breathe",
    colorBand: "cyan_magenta_soft"
  }
};

// ============================================================================
// ORGAN_META — v24 IMMORTAL++
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
    personaAware: true,
    modeAware: true,
    daemonAware: true,
    worldAware: true
  },
  lineage: {
    family: "companion_membrane",
    generation: 4,
    osVersion: "v24"
  }
};

// ============================================================================
// ORGAN_CONTRACT — v24 IMMORTAL++
// ============================================================================
export const ORGAN_CONTRACT_PulsePalCompanion = {
  inputs: {
    Router: "navigation interface",
    Icons: "icon resolution interface",
    Media: "media resolver interface",
    CorePresence: "bridge presence organ",
    CoreDaemon: "bridge daemon snapshot",
    CoreMemory: "bridge memory organ",
    CoreSettings: "bridge settings organ"
  },
  outputs: {
    uiSurface: "companion_membrane",
    modes: ["bonding", "trust", "gallery", "persona", "mode"],
    presence: "CorePresence.snapshot",
    persona: "CoreMemory.persona",
    mode: "CoreSettings.personaMode"
  },
  consumers: [
    "Router",
    "IQMap",
    "CompanionLayer",
    "CorePresence",
    "CoreDaemon",
    "CoreMemory",
    "CoreSettings"
  ],
  guarantees: {
    deterministicRender: true,
    noNetwork: true,
    noSideEffects: true
  }
};

// ============================================================================
// IMMORTAL_OVERLAYS — v24 IMMORTAL++
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
    maxComponents: 6,
    notes: "Header, avatar, bonding, trust, persona, gallery."
  },
  chunking: {
    prewarm: [
      "icons.pulse_wave",
      "icons.heart",
      "icons.shield",
      "media.pulsepal"
    ],
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
    latencyTargetMs: 40
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
  const persona  = CoreMemory?.persona?.() || {};
  const settings = CoreSettings?.snapshot?.() || {};

  const palImages = Media?.resolveAll?.("PulsePal") || [];

  const avatar =
    settings.avatarMode === "human"
      ? palImages.find(i => i.includes("human")) || palImages[0]
      : settings.avatarMode === "fox"
      ? palImages.find(i => i.includes("fox")) || palImages[0]
      : palImages[0];

  const auraColor =
    presence.tone === "warm"   ? "rgba(255,120,180,0.55)" :
    presence.tone === "focused"? "rgba(0,255,180,0.55)" :
    presence.tone === "calm"   ? "rgba(120,200,255,0.45)" :
                                 "rgba(160,180,200,0.45)";

  const galleryHtml = palImages.length
    ? `
      <div class="evo-block" data-hook="pulsepal.companion.gallery">
        <h2>Pulse‑Pal Gallery</h2>
        <div style="display:flex; gap:16px; flex-wrap:wrap;">
          ${palImages.map(src => `
            <div class="pal-image-frame">
              <div class="pal-image-aura"></div>
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

      <style>
        .pal-image-frame {
          position:relative;
          width:140px;
          height:140px;
          border-radius:18px;
          overflow:hidden;
          background:#0a0f1a;
          box-shadow:
            0 12px 30px rgba(0,0,0,0.55),
            0 0 0 1px rgba(0,234,255,0.18);
          transform:perspective(800px) rotateX(8deg);
        }
        .pal-image-aura {
          position:absolute;
          inset:-10px;
          background:${auraColor};
          filter:blur(20px);
          opacity:0.6;
          z-index:-1;
        }
        .pal-image {
          width:100%;
          height:100%;
          object-fit:cover;
        }
      </style>

      <!-- HEADER -------------------------------------------------------------->
      <div class="evo-surface evo-breathe" data-hook="pulsepal.companion.header">
        <div style="display:flex; gap:18px; align-items:center;">
          <img src="${avatar}" class="pal-avatar-preview" />
          <div>
            <h1 style="margin:0;">Pulse‑Pal Companion</h1>
            <p style="margin:0; opacity:0.75;">
              ${presence.tone || "How I connect with you."}
            </p>
          </div>
        </div>
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

      <!-- PERSONA PANEL -------------------------------------------------------->
      <div class="evo-block" data-hook="pulsepal.companion.persona">
        <h2>Persona Influence</h2>
        <p>Warmth: ${persona.warmth || 0}</p>
        <p>Focus: ${persona.focus || 0}</p>
        <p>Expressiveness: ${persona.expressiveness || "medium"}</p>
        <p>Mode: ${settings.personaMode || "human"}</p>
      </div>

      <!-- GALLERY -------------------------------------------------------------->
      ${galleryHtml}

    </div>
  `;
}
