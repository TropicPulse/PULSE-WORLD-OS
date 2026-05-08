// ============================================================================
// FILE: /PULSE-PAL/PulsePalSystem.js
// PULSE OS — v24 IMMORTAL
// PULSE‑PAL SYSTEM PAGE — DIAGNOSTIC MEMBRANE + WORLD‑OS + MEDIA
// ============================================================================
//
// ROLE:
//   Shows system-level diagnostics for Pulse‑Pal.
//   Includes:
//     • Organ status (daemon-fed)
//     • Router connectivity
//     • Presence engine
//     • Memory engine
//     • Pulse‑World integration
//     • Glow / Animation engines
//     • Proxy summary
//     • Pulse‑Pal summary
//     • Media awareness
//
// CONTRACT:
//   • Pure UI Organ
//   • Deterministic render
//   • Evolvable via IQMap + CoreSystem
//   • Zero side effects
//
// ============================================================================
// BRIDGE INTEGRATION — REQUIRED
// ============================================================================
import { PulseProofBridge } from "/PULSE/BRIDGE/PulseProofBridge.js";

const CoreSystem   = PulseProofBridge.coresystem;
const CoreMemory   = PulseProofBridge.corememory;
const CorePresence = PulseProofBridge.corepresence;
const CoreRouter   = PulseProofBridge.corerouter;
const CoreWorld    = PulseProofBridge.coreworld;
const CoreGlow     = PulseProofBridge.coreglow;
const CoreAnim     = PulseProofBridge.coreanim;
const CoreDaemon   = PulseProofBridge.coredaemon; // NEW: daemon snapshot bridge

// ============================================================================
// AI_EXPERIENCE_META
// ============================================================================
export const AI_EXPERIENCE_META_PulsePalSystem = {
  id: "pulsepal.system",
  kind: "ui_organ",
  version: "v24-IMMORTAL",
  role: "Pulse‑Pal diagnostic membrane",
  surfaces: {
    band: ["system", "diagnostics", "vitals", "media"],
    wave: ["neutral", "technical", "clear"],
    binary: ["organ_status", "engine_status", "daemon_status"],
    presence: ["system_awareness"],
    advantage: ["full_visibility", "media_preload"],
    speed: "instant_ui"
  },
  routes: {
    home: "pulsepal.home",
    identity: "pulsepal.identity",
    settings: "pulsepal.settings"
  },
  consumers: [
    "Router",
    "CoreSystem",
    "CoreMemory",
    "CorePresence",
    "CoreRouter",
    "CoreWorld",
    "CoreGlow",
    "CoreAnim",
    "CoreDaemon"
  ],
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
export const AI_EXPERIENCE_CONTEXT_PulsePalSystem = {
  tone: "technical_calm",
  pacing: "steady",
  emotionalBand: "system_safety",
  primaryIntent: "show_system_health",
  secondaryIntent: "provide_diagnostics",
  userFirstImpression: "pulsepal_is_stable_and_transparent",
  visualNotes: {
    icon: "diagnostics_pulse",
    motion: "low_breathe",
    colorBand: "cyan_steel"
  }
};

// ============================================================================
// ORGAN_META
// ============================================================================
export const ORGAN_META_PulsePalSystem = {
  id: "organ.pulsepal.system",
  organism: "PulsePal",
  layer: "ui.system",
  tier: "IMMORTAL",
  evoFlags: {
    canAddDiagnosticPanels: true,
    requiresCoreSystem: true,
    daemonAware: true,
    mediaAware: true
  },
  lineage: {
    family: "companion_system",
    generation: 2,
    osVersion: "v24"
  }
};

// ============================================================================
// ORGAN_CONTRACT
// ============================================================================
export const ORGAN_CONTRACT_PulsePalSystem = {
  inputs: {
    Router: "navigation interface",
    Icons: "icon resolution interface",
    CoreSystem: "bridge system organ",
    CoreMemory: "bridge memory organ",
    CorePresence: "bridge presence organ",
    CoreRouter: "bridge router organ",
    CoreWorld: "bridge world organ",
    CoreGlow: "bridge glow organ",
    CoreAnim: "bridge animation organ",
    CoreDaemon: "bridge daemon snapshot"
  },
  outputs: {
    uiSurface: "system_membrane",
    vitals: "CoreSystem.vitals",
    organs: "CoreSystem.organs",
    daemon: "CoreDaemon.snapshot"
  },
  consumers: [
    "Router",
    "CoreSystem",
    "CoreMemory",
    "CorePresence",
    "CoreRouter",
    "CoreWorld",
    "CoreGlow",
    "CoreAnim",
    "CoreDaemon"
  ],
  guarantees: {
    deterministicRender: true,
    noNetwork: true,
    noSideEffects: true
  }
};

// ============================================================================
// IMMORTAL_OVERLAYS
// ============================================================================
export const IMMORTAL_OVERLAYS_PulsePalSystem = {
  drift: {
    allowed: false,
    notes: "System diagnostics must remain stable and predictable."
  },
  pressure: {
    expectedLoad: "medium",
    notes: "Used during debugging or curiosity checks."
  },
  stability: {
    uiLayout: "stable",
    semantics: "stable",
    notes: "Only additive evolution allowed."
  },
  load: {
    maxComponents: 5,
    notes: "Header, system vitals, organ list, daemon summary, media panel."
  },
  chunking: {
    prewarm: [
      "icons.diagnostics_pulse",
      "icons.router_node",
      "icons.presence",
      "media.pulsepal"
    ],
    cacheKey: "pulsepal.system.ui"
  },
  worldLens: {
    awareOfWorlds: true
  },
  limbic: {
    band: "system_safety"
  },
  triHeart: {
    cognitive: "diagnostic_reading",
    emotional: "reassurance",
    behavioral: "review_system_state"
  },
  impulseSpeed: {
    primaryAction: "view_diagnostics",
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
export function PulsePalSystem({ Router, Icons, Media }) {

  const vitals = CoreSystem?.vitals?.() || {};
  const organs = CoreSystem?.organs?.() || [];
  const daemon = CoreDaemon?.snapshot?.() || {};
  const palImages = Media?.resolveAll?.("PulsePal") || [];

  const daemonHtml = daemon?.proxySummary
    ? `
      <div class="evo-block" data-hook="pulsepal.system.daemon">
        <h2>Daemon Summary</h2>
        <p>Proxy Count: ${daemon.proxySummary.proxyCount}</p>
        <p>Binary Count: ${daemon.proxySummary.binaryCount}</p>
        <p>Pal Count: ${daemon.palSummary.palCount}</p>
        <p>Avg Pal Continuance: ${daemon.palSummary.avgPalContinuance}</p>
      </div>
    `
    : "";

  const mediaHtml = palImages.length
    ? `
      <div class="evo-block" data-hook="pulsepal.system.media">
        <h2>Pulse‑Pal Media</h2>
        <div style="display:flex; gap:12px; flex-wrap:wrap;">
          ${palImages
            .map(src => `<img src="${src}" class="pal-system-thumb" />`)
            .join("")}
        </div>
      </div>
    `
    : "";

  return `
    <div id="pulsepal-system" class="evo-wrapper">

      <!-- HEADER ------------------------------------------------------------->
      <div class="evo-surface evo-breathe" data-hook="pulsepal.system.header">
        <div style="display:flex; align-items:center; gap:18px;">
          <img src="${Icons.resolve('diagnostics_pulse')}" class="evo-icon" />
          <div>
            <h1 style="margin:0; font-size:1.6rem; color:#00eaff;">
              Pulse‑Pal System
            </h1>
            <p style="margin:0; opacity:0.75;">
              Internal diagnostics and organ status.
            </p>
          </div>
        </div>
      </div>

      <!-- SYSTEM STATUS ------------------------------------------------------>
      <div class="evo-block" data-hook="pulsepal.system.vitals">
        <h2 style="margin-top:0;">System Vitals</h2>

        <ul class="evo-list">
          <li class="evo-list-item">
            <img src="${Icons.resolve('stable')}" class="evo-icon" />
            Core Engine: ${vitals.core || "Stable"}
          </li>

          <li class="evo-list-item">
            <img src="${Icons.resolve('router_node')}" class="evo-icon" />
            Router Cortex: ${vitals.router || "Connected"}
          </li>

          <li class="evo-list-item">
            <img src="${Icons.resolve('presence')}" class="evo-icon" />
            Presence Engine: ${vitals.presence || "Active"}
          </li>

          <li class="evo-list-item">
            <img src="${Icons.resolve('memory')}" class="evo-icon" />
            Memory Engine: ${vitals.memory || "Balanced"}
          </li>

          <li class="evo-list-item">
            <img src="${Icons.resolve('neon_ring')}" class="evo-icon" />
            Glow System: ${vitals.glow || "Cyan"}
          </li>

          <li class="evo-list-item">
            <img src="${Icons.resolve('pulse_wave')}" class="evo-icon" />
            Animation Engine: ${vitals.anim || "Online"}
          </li>
        </ul>
      </div>

      <!-- ORGAN STATUS ------------------------------------------------------->
      <div class="evo-block" data-hook="pulsepal.system.organs">
        <h2 style="margin-top:0;">Organs</h2>

        <ul class="evo-list">
          ${organs.map(o => `
            <li class="evo-list-item">
              <img src="${Icons.resolve(o.icon)}" class="evo-icon" />
              ${o.label}: ${o.status}
            </li>
          `).join("")}
        </ul>
      </div>

      <!-- DAEMON SUMMARY ----------------------------------------------------->
      ${daemonHtml}

      <!-- MEDIA PANEL -------------------------------------------------------->
      ${mediaHtml}

    </div>
  `;
}
