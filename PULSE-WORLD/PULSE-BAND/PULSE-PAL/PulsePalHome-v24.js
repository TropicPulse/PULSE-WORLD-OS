// ============================================================================
// FILE: /PULSE-PAL/PulsePalHome.js
// PULSE OS — v24 IMMORTAL
// PULSE‑PAL HOME PAGE — A0 PRESENCE MEMBRANE + MEDIA + PRESENCE SNAPSHOT
// ============================================================================
//
// ROLE:
//   The Pulse‑Pal Home Page is the A0 surface of the companion.
//   It introduces:
//     • Pal Identity (daemon-fed)
//     • Pal Presence (CorePresence snapshot)
//     • Pal Avatar (media resolver)
//     • Quick Actions
//     • System Status (daemon-fed)
//     • Persona hooks (future)
//
// CONTRACT:
//   • Pure UI Organ (no network)
//   • Deterministic render
//   • Evolvable via IQMap UI Skills
//   • Zero side effects
//
// ============================================================================
// BRIDGE INTEGRATION — REQUIRED
// ============================================================================
import { PulseProofBridge } from "/PULSE/BRIDGE/PulseProofBridge.js";

const CorePresence = PulseProofBridge.corepresence;
const CoreDaemon   = PulseProofBridge.coredaemon;
const CoreSystem   = PulseProofBridge.coresystem;

// ============================================================================
// AI_EXPERIENCE_META
// ============================================================================
export const AI_EXPERIENCE_META_PulsePalHome = {
  id: "pulsepal.home",
  kind: "ui_organ",
  version: "v24-IMMORTAL",
  role: "Pulse‑Pal A0 presence membrane",
  surfaces: {
    band: ["home", "presence", "identity", "media"],
    wave: ["calm", "ready", "supportive"],
    binary: ["router_entry", "companion_entry", "avatar_switch"],
    presence: ["companion_face", "status_overview"],
    advantage: ["one_tap_chat", "one_tap_skills", "one_tap_settings", "media_preload"],
    speed: "instant_ui"
  },
  routes: {
    chat: "pulsepal.chat",
    skills: "pulsepal.skills",
    settings: "pulsepal.settings"
  },
  consumers: ["Router", "IQMap", "CompanionLayer", "CorePresence", "CoreDaemon", "CoreSystem"],
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
export const AI_EXPERIENCE_CONTEXT_PulsePalHome = {
  tone: "warm_technical",
  pacing: "steady",
  emotionalBand: "reassuring",
  primaryIntent: "invite_interaction",
  secondaryIntent: "show_system_stability",
  userFirstImpression: "this_is_the_companion_face",
  visualNotes: {
    mascot: "idle_but_attentive",
    glow: "subtle_cyan",
    motion: "low_breathe"
  }
};

// ============================================================================
// ORGAN_META
// ============================================================================
export const ORGAN_META_PulsePalHome = {
  id: "organ.pulsepal.home",
  organism: "PulsePal",
  layer: "ui.presence",
  tier: "IMMORTAL",
  a0Surface: true,
  evoFlags: {
    canExtendStatusList: true,
    canAddQuickActions: true,
    canThemeWithPresence: true,
    mediaAware: true,
    presenceAware: true,
    personaAware: true
  },
  lineage: {
    family: "companion_home",
    generation: 2,
    osVersion: "v24"
  }
};

// ============================================================================
// ORGAN_CONTRACT
// ============================================================================
export const ORGAN_CONTRACT_PulsePalHome = {
  inputs: {
    Router: "navigation interface",
    Icons: "icon resolution interface",
    Media: "media resolver interface",
    CorePresence: "bridge presence organ",
    CoreDaemon: "bridge daemon snapshot",
    CoreSystem: "bridge system organ"
  },
  outputs: {
    routes: ["pulsepal.chat", "pulsepal.skills", "pulsepal.settings"],
    uiSurface: "home_presence_membrane",
    presence: "CorePresence.snapshot"
  },
  consumers: ["Router", "IQMap", "CompanionLayer", "CorePresence", "CoreDaemon", "CoreSystem"],
  guarantees: {
    deterministicRender: true,
    noNetwork: true,
    noSideEffects: true
  }
};

// ============================================================================
// IMMORTAL_OVERLAYS
// ============================================================================
export const IMMORTAL_OVERLAYS_PulsePalHome = {
  drift: {
    allowed: false,
    notes: "Home presence must remain stable across versions."
  },
  pressure: {
    expectedLoad: "high_entry_frequency",
    notes: "Frequently used as entry point; keep render cheap."
  },
  stability: {
    uiLayout: "stable",
    semantics: "stable",
    notes: "Only additive evolution allowed."
  },
  load: {
    maxComponents: 5,
    notes: "Header, quick actions, presence, status, avatar."
  },
  chunking: {
    prewarm: [
      "icons.pulse",
      "icons.ai_brain",
      "icons.binary_matrix",
      "icons.settings",
      "media.pulsepal"
    ],
    cacheKey: "pulsepal.home.ui"
  },
  worldLens: {
    awareOfWorlds: true
  },
  limbic: {
    band: "safety_presence"
  },
  triHeart: {
    cognitive: "clear_routes",
    emotional: "reassuring_presence",
    behavioral: "invite_click_quick_actions"
  },
  impulseSpeed: {
    primaryAction: "open_chat",
    latencyTargetMs: 50
  },
  healingSurfaces: {
    enabled: true
  }
};

// ============================================================================
// IMPLEMENTATION — v24 IMMORTAL++
// ============================================================================
export function PulsePalHome({ Router, Icons, Media }) {

  const presence = CorePresence?.snapshot?.() || {};
  const daemon   = CoreDaemon?.snapshot?.() || {};
  const system   = CoreSystem?.vitals?.() || {};

  const palImages = Media?.resolveAll?.("PulsePal") || [];
  const avatar = palImages[0] || Icons.resolve("pulse");

  const version = daemon?.aiMeta?.version || "v24 IMMORTAL";
  const lineage = daemon?.aiMeta?.lineage || "Pulse‑OS Evolutionary";

  return `
    <div id="pulsepal-home" class="evo-wrapper">

      <!-- HEADER / IDENTITY -------------------------------------------------->
      <div class="evo-surface evo-breathe" data-hook="pulsepal.header">
        <div style="display:flex; align-items:center; gap:18px;">
          <img src="${avatar}" class="evo-icon" />
          <div>
            <h1 style="margin:0; font-size:1.8rem; color:#00eaff;">
              Pulse‑Pal
            </h1>
            <p style="margin:0; opacity:0.75;">
              ${presence.tone || "Your Pulse OS Companion"}
            </p>
          </div>
        </div>
      </div>

      <!-- QUICK ACTIONS ------------------------------------------------------->
      <div class="evo-block" data-hook="pulsepal.quick">
        <h2 style="margin-top:0;">Quick Actions</h2>

        <div style="display:flex; gap:16px; flex-wrap:wrap;">

          <button class="evo-button" onclick="Router.go('pulsepal.chat')">
            <img src="${Icons.resolve('ai_brain')}" class="evo-icon" />
            Chat with Pulse‑Pal
          </button>

          <button class="evo-button" onclick="Router.go('pulsepal.skills')">
            <img src="${Icons.resolve('binary_matrix')}" class="evo-icon" />
            Explore Skills
          </button>

          <button class="evo-button" onclick="Router.go('pulsepal.settings')">
            <img src="${Icons.resolve('settings')}" class="evo-icon" />
            Settings
          </button>

        </div>
      </div>

      <!-- PAL PRESENCE -------------------------------------------------------->
      <div class="evo-block evo-breathe" data-hook="pulsepal.presence">
        <h2 style="margin-top:0;">Presence</h2>

        <div style="display:flex; align-items:center; gap:24px;">
          <img src="${avatar}" class="pal-avatar-preview" />
          <p style="flex:1; opacity:0.85;">
            ${presence.activity || "Active"} • ${presence.tone || "Warm"}  
            <br/>
            I’m here and ready. Ask anything, explore skills, or open a new Pulse‑World.
          </p>
        </div>
      </div>

      <!-- PAL SYSTEM STATUS --------------------------------------------------->
      <div class="evo-block" data-hook="pulsepal.status">
        <h2 style="margin-top:0;">System Status</h2>

        <ul class="evo-list">
          <li class="evo-list-item">
            <img src="${Icons.resolve('stable')}" class="evo-icon" />
            Core Systems: ${system.core || "Stable"}
          </li>

          <li class="evo-list-item">
            <img src="${Icons.resolve('presence')}" class="evo-icon" />
            Presence Engine: ${system.presence || "Active"}
          </li>

          <li class="evo-list-item">
            <img src="${Icons.resolve('router_node')}" class="evo-icon" />
            Router Cortex: ${system.router || "Connected"}
          </li>

          <li class="evo-list-item">
            <img src="${Icons.resolve('ai_brain')}" class="evo-icon" />
            Pal Intelligence: ${system.anim || "Online"}
          </li>
        </ul>
      </div>

    </div>
  `;
}
