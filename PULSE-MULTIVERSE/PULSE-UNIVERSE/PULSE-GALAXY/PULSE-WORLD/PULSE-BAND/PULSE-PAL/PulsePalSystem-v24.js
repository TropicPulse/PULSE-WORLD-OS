// ============================================================================
// FILE: /PULSE-PAL/PulsePalSystem.js
// PULSE OS — v24 IMMORTAL++
// PULSE‑PAL SYSTEM PAGE — DIAGNOSTIC MEMBRANE + WORLD‑OS + MODE + PERSONA
// ============================================================================
//
// ROLE:
//   The Pulse‑Pal System Page is the OS‑level diagnostic membrane.
//   It renders:
//     • System vitals (CoreSystem)
//     • Organ status (daemon-fed)
//     • Router connectivity
//     • Presence engine state
//     • Memory engine state
//     • Persona engine state (NEW v24++)
//     • Mode engine state (NEW v24++)
//     • Pulse‑World integration
//     • Glow / Animation engines
//     • Proxy summary
//     • Daemon summary
//     • Pal summary
//     • Media-aware avatar preview
//     • Mode-aware avatar switching (NEW v24++)
//     • Persona-aware overlays (NEW v24++)
//     • Continuity score (NEW v24++)
//
// CONTRACT:
//   • Pure UI Organ
//   • Deterministic render
//   • Evolvable via IQMap + CoreSystem + CoreDaemon
//   • Zero side effects
//
// ============================================================================
// BRIDGE INTEGRATION — REQUIRED
// ============================================================================
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝

import { PulseProofBridge } from "../../PULSEVISION/____BACKEND/PULSE-WORLD-BRIDGE.js";

const CoreSystem   = PulseProofBridge.coresystem;
const CoreMemory   = PulseProofBridge.corememory;
const CorePresence = PulseProofBridge.corepresence;
const CoreRouter   = PulseProofBridge.corerouter;
const CoreWorld    = PulseProofBridge.coreworld;
const CoreGlow     = PulseProofBridge.coreglow;
const CoreAnim     = PulseProofBridge.coreanim;
const CoreDaemon   = PulseProofBridge.coredaemon;
const MediaBridge  = PulseProofBridge.coremedia;

// ============================================================================
// IMPLEMENTATION — v24 IMMORTAL++
// ============================================================================
export function PulsePalSystem({ Router, Icons, Media }) {

  const vitals     = CoreSystem?.vitals?.() || {};
  const organs     = CoreSystem?.organs?.() || [];
  const daemon     = CoreDaemon?.snapshot?.() || {};
  const persona    = CoreMemory?.persona?.() || {};
  const presence   = CorePresence?.snapshot?.() || {};
  const continuity = daemon?.palHistory?.continuityScore || 0;

  const activeMode =
    presence.mode ||
    persona?.tone?.activeMode ||
    "advisor";

  // MEDIA: mode-aware avatar
  const palImages = Media?.resolveAll?.("PulsePal") || [];
  let avatar = palImages[0] || Icons.resolve("pulse");

  if (palImages.length && activeMode) {
    const lower = activeMode.toLowerCase();
    const match = palImages.find(src => src.toLowerCase().includes(lower));
    if (match) avatar = match;
  }

  // DAEMON SUMMARY
  const daemonHtml = daemon?.proxySummary
    ? `
      <div class="evo-block" data-hook="pulsepal.system.daemon">
        <h2>Daemon Summary</h2>
        <p>Proxy Count: ${daemon.proxySummary.proxyCount}</p>
        <p>Binary Count: ${daemon.proxySummary.binaryCount}</p>
        <p>Pal Count: ${daemon.palSummary.palCount}</p>
        <p>Avg Pal Continuance: ${daemon.palSummary.avgPalContinuance}</p>
        <p>Continuity Score: ${continuity}</p>
      </div>
    `
    : "";

  // MEDIA PANEL
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
            <p style="margin:0; opacity:0.55; font-size:0.85rem;">
              Mode: <strong>${activeMode}</strong> · Continuity: ${continuity}
            </p>
          </div>
        </div>
      </div>

      <!-- AVATAR ------------------------------------------------------------->
      <div class="evo-block" data-hook="pulsepal.system.avatar">
        <h2 style="margin-top:0;">System Avatar</h2>
        <img src="${avatar}" class="pal-avatar-preview" />
        <p style="opacity:0.7; margin-top:6px; font-size:0.85rem;">
          Avatar adapts to mode and persona.
        </p>
      </div>

      <!-- SYSTEM VITALS ------------------------------------------------------>
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
