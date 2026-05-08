// ============================================================================
// FILE: /PULSE-PAL/PulsePalIdentity-v24++.js
// PULSE OS — v24 IMMORTAL++
// PULSE‑PAL IDENTITY PAGE — SELF-GOVERNANCE MEMBRANE + MEDIA + DAEMON SNAPSHOT
// ============================================================================
//
// ROLE:
//   Displays Pulse‑Pal’s identity, presence, lineage, and version.
//   Provides access to personality tuning and presence modes.
//   Now includes:
//     • Media-aware avatar (PulsePal images, prewarmed)
//     • Presence snapshot (CorePresence: tone, band, activity)
//     • Daemon-fed version + lineage + pal summary
//     • Identity bands (cognitive / emotional / behavioral)
//     • Persona hooks (future)
//     • IMMORTAL++ overlays
//
// CONTRACT:
//   • Pure UI Organ
//   • Deterministic render
//   • Evolvable via IQMap
//   • Zero side effects
//
// ============================================================================
// BRIDGE INTEGRATION — REQUIRED
// ============================================================================
import { PulseProofBridge } from "/PULSE/BRIDGE/PulseProofBridge.js";

const CorePresence = PulseProofBridge.corepresence;
const CoreDaemon   = PulseProofBridge.coredaemon; // NEW
const CoreMemory   = PulseProofBridge.corememory;

// ============================================================================
// AI_EXPERIENCE_META — v24 IMMORTAL++
// ============================================================================
export const AI_EXPERIENCE_META_PulsePalIdentity = {
  id: "pulsepal.identity",
  kind: "ui_organ",
  version: "v24-IMMORTAL++",
  role: "Pulse‑Pal self-governance membrane",
  surfaces: {
    band: ["identity", "presence", "lineage", "media", "daemon"],
    wave: ["clear", "grounded", "reassuring"],
    binary: ["presence_mode", "personality_mode", "avatar_switch", "daemon_summary"],
    presence: ["who_am_i", "how_do_i_show_up", "tone_band"],
    advantage: [
      "explicit_identity",
      "explicit_modes",
      "media_preload",
      "daemon_aware_identity"
    ],
    speed: "instant_ui"
  },
  routes: {
    home: "pulsepal.home",
    companion: "pulsepal.companion"
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
export const AI_EXPERIENCE_CONTEXT_PulsePalIdentity = {
  tone: "calm_confident",
  pacing: "steady",
  emotionalBand: "orientation",
  primaryIntent: "show_who_pulsepal_is",
  secondaryIntent: "let_user_tune_modes",
  userFirstImpression: "this_is_the_companion_self_view",
  visualNotes: {
    icon: "presence",
    mascot: "idle_but_attentive",
    colorBand: "cyan_soft"
  }
};

// ============================================================================
// ORGAN_META
// ============================================================================
export const ORGAN_META_PulsePalIdentity = {
  id: "organ.pulsepal.identity",
  organism: "PulsePal",
  layer: "ui.identity",
  tier: "IMMORTAL",
  evoFlags: {
    canExtendIdentityFields: true,
    canAddPresenceModes: true,
    canAddPersonalityModes: true,
    mediaAware: true,
    presenceAware: true,
    personaAware: true,
    daemonAware: true
  },
  lineage: {
    family: "companion_identity",
    generation: 2,
    osVersion: "v24"
  }
};

// ============================================================================
// ORGAN_CONTRACT
// ============================================================================
export const ORGAN_CONTRACT_PulsePalIdentity = {
  inputs: {
    Router: "navigation interface",
    Icons: "icon resolution interface",
    Media: "media resolver interface",
    CorePresence: "bridge presence organ",
    CoreDaemon: "bridge daemon snapshot"
  },
  outputs: {
    uiSurface: "identity_membrane",
    modes: ["presence", "personality"],
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
export const IMMORTAL_OVERLAYS_PulsePalIdentity = {
  drift: {
    allowed: false,
    notes: "Identity semantics must remain stable."
  },
  pressure: {
    expectedLoad: "medium",
    notes: "Visited when user wants to understand or tune Pulse‑Pal."
  },
  stability: {
    uiLayout: "stable",
    semantics: "stable",
    notes: "Only additive evolution allowed."
  },
  load: {
    maxComponents: 5,
    notes: "Header, identity card, bands, presence modes, personality modes."
  },
  chunking: {
    prewarm: [
      "icons.presence",
      "icons.pulse",
      "icons.neon_ring",
      "icons.stable",
      "icons.ai_brain",
      "media.pulsepal"
    ],
    cacheKey: "pulsepal.identity.ui"
  },
  worldLens: {
    awareOfWorlds: true
  },
  limbic: {
    band: "orientation_safety"
  },
  triHeart: {
    cognitive: "clear_identity",
    emotional: "trust_and_stability",
    behavioral: "tune_presence_and_personality"
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
export function PulsePalIdentity({ Router, Icons, Media }) {

  const presence = CorePresence?.snapshot?.() || {};
  const daemon   = CoreDaemon?.snapshot?.() || {};
  const palImages = Media?.resolveAll?.("PulsePal") || [];
  const avatar = palImages[0] || Icons.resolve("pulse");

  const version = daemon?.aiMeta?.version || "v24 IMMORTAL++";
  const lineage = daemon?.aiMeta?.lineage || "Pulse‑OS Evolutionary";

  const tone     = presence.tone || "Warm";
  const band     = presence.band || "Companion";
  const activity = presence.activity || "Active";

  const daemonHtml = daemon?.proxySummary
    ? `
      <div class="evo-block" data-hook="pulsepal.identity.daemon">
        <h2 style="margin-top:0;">Daemon Snapshot</h2>
        <p style="opacity:0.75; margin:0 0 8px 0;">
          Version: ${version} • Lineage: ${lineage}
        </p>
        <ul class="evo-list">
          <li class="evo-list-item">
            <img src="${Icons.resolve('ai_brain')}" class="evo-icon" />
            Pals: ${daemon.palSummary?.palCount ?? "1"}
          </li>
          <li class="evo-list-item">
            <img src="${Icons.resolve('stable')}" class="evo-icon" />
            Continuance: ${daemon.palSummary?.avgPalContinuance ?? "stable"}
          </li>
        </ul>
      </div>
    `
    : "";

  return `
    <div id="pulsepal-identity" class="evo-wrapper">

      <!-- HEADER ------------------------------------------------------------->
      <div class="evo-surface evo-breathe" data-hook="pulsepal.identity.header">
        <div style="display:flex; align-items:center; gap:18px;">
          <img src="${Icons.resolve('presence')}" class="evo-icon" />
          <div>
            <h1 style="margin:0; font-size:1.6rem; color:#00eaff;">
              Pulse‑Pal Identity
            </h1>
            <p style="margin:0; opacity:0.75;">
              ${tone} • ${band} • ${version}
            </p>
          </div>
        </div>
      </div>

      <!-- IDENTITY CARD ------------------------------------------------------>
      <div class="evo-block evo-breathe" data-hook="pulsepal.identity.card">
        <h2 style="margin-top:0;">Who I Am</h2>

        <div style="display:flex; gap:24px; align-items:center;">
          <div class="evo-mascot"
               style="width:120px; height:120px; border-radius:50%;
                      background:url('${avatar}') center/cover no-repeat;
                      box-shadow:0 0 24px rgba(0, 238, 255, 0.35);">
          </div>

          <div style="flex:1;">
            <div style="font-size:1.2rem; color:#00eaff; font-weight:600;">
              Pulse‑Pal
            </div>

            <div style="opacity:0.85; margin-top:6px;">
              Your Pulse OS companion.  
              I evolve with your system, your worlds, and your daily flow.
            </div>

            <div style="margin-top:12px; opacity:0.75;">
              <strong>Version:</strong> ${version}<br/>
              <strong>Lineage:</strong> ${lineage}<br/>
              <strong>Presence Mode:</strong> ${activity}<br/>
              <strong>Tone Band:</strong> ${tone} / ${band}
            </div>
          </div>
        </div>
      </div>

      <!-- IDENTITY BANDS ----------------------------------------------------->
      <div class="evo-block" data-hook="pulsepal.identity.bands">
        <h2 style="margin-top:0;">Identity Bands</h2>

        <ul class="evo-list">
          <li class="evo-list-item">
            <img src="${Icons.resolve('ai_brain')}" class="evo-icon" />
            Cognitive: system‑aware, world‑aware, deterministic companion.
          </li>
          <li class="evo-list-item">
            <img src="${Icons.resolve('pulse')}" class="evo-icon" />
            Emotional: warm, grounded, non‑overwhelming.
          </li>
          <li class="evo-list-item">
            <img src="${Icons.resolve('neon_ring')}" class="evo-icon" />
            Behavioral: responsive, low‑latency, zero‑drift.
          </li>
        </ul>
      </div>

      <!-- PRESENCE MODES ----------------------------------------------------->
      <div class="evo-block" data-hook="pulsepal.identity.presence">
        <h2 style="margin-top:0;">Presence Modes</h2>

        <div style="display:flex; gap:16px; flex-wrap:wrap;">
          <button class="evo-button" onclick="CorePresence.setActivity('active')">
            <img src="${Icons.resolve('pulse')}" class="evo-icon" />
            Active
          </button>

          <button class="evo-button" onclick="CorePresence.setActivity('focused')">
            <img src="${Icons.resolve('neon_ring')}" class="evo-icon" />
            Focused
          </button>

          <button class="evo-button" onclick="CorePresence.setActivity('silent')">
            <img src="${Icons.resolve('stable')}" class="evo-icon" />
            Silent
          </button>
        </div>
      </div>

      <!-- PERSONALITY -------------------------------------------------------->
      <div class="evo-block" data-hook="pulsepal.identity.personality">
        <h2 style="margin-top:0;">Personality</h2>

        <p style="opacity:0.85;">
          My personality adapts to your style.  
          Choose how expressive or reserved you want me to be.
        </p>

        <div style="display:flex; gap:16px; flex-wrap:wrap;">
          <button class="evo-button" onclick="CorePresence.setTone('warm')">Warm</button>
          <button class="evo-button" onclick="CorePresence.setTone('neutral')">Neutral</button>
          <button class="evo-button" onclick="CorePresence.setTone('technical')">Technical</button>
        </div>
      </div>

      <!-- DAEMON SNAPSHOT ---------------------------------------------------->
      ${daemonHtml}

    </div>
  `;
}
