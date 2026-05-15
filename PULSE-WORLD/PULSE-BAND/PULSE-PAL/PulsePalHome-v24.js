// ============================================================================
// FILE: /PULSE-PAL/PulsePalHome-v24++.js
// PULSE OS — v24 IMMORTAL++
// PULSE‑PAL HOME PAGE — A0 PRESENCE MEMBRANE + MEDIA + DAEMON SNAPSHOT
// ============================================================================
//
// ROLE:
//   The Pulse‑Pal Home Page is the A0 surface of the companion.
//   It now introduces:
//     • Pal Identity (daemon-fed, aiMeta-aware)
//     • Pal Presence (CorePresence snapshot, tone + activity + band)
//     • Pal Avatar (media resolver, prewarmed)
//     • Quick Actions (chat / skills / settings / tasks / system)
//     • System Status (CoreSystem vitals)
//     • Daemon Summary (lightweight, non-invasive)
//     • Persona hooks (future)
//     • Deterministic IMMORTAL++ UI
//
// CONTRACT:
//   • Pure UI Organ (no network)
//   • Deterministic render
//   • Evolvable via IQMap UI Skills + Daemon
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

// 2 — EXPORT GENOME METADATA
// export const PulseMeshMeta = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
// export const PULSE_EARN_IMMUNE_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;
import { PulseProofBridge } from "../../PULSE-UI/____BACKEND/PULSE-WORLD-BRIDGE.js";

const CorePresence = PulseProofBridge.corepresence;
const CoreDaemon   = PulseProofBridge.coredaemon;
const CoreSystem   = PulseProofBridge.coresystem;

// ============================================================================
// IMPLEMENTATION — v24 IMMORTAL++
// ============================================================================
export function PulsePalHome({ Router, Icons, Media }) {

  const presence = CorePresence?.snapshot?.() || {};
  const daemon   = CoreDaemon?.snapshot?.() || {};
  const system   = CoreSystem?.vitals?.() || {};

  const palImages = Media?.resolveAll?.("PulsePal") || [];
  const avatar = palImages[0] || Icons.resolve("pulse");

  const version = daemon?.aiMeta?.version || "v24 IMMORTAL++";
  const lineage = daemon?.aiMeta?.lineage || "Pulse‑OS Evolutionary";

  const tone   = presence.tone || "Warm";
  const band   = presence.band || "Companion";
  const activity = presence.activity || "Active";

  const daemonHtml = daemon?.proxySummary
    ? `
      <div class="evo-block" data-hook="pulsepal.home.daemon">
        <h2 style="margin-top:0;">Daemon Snapshot</h2>
        <p style="opacity:0.75; margin:0 0 8px 0;">
          Version: ${version} • Lineage: ${lineage}
        </p>
        <ul class="evo-list">
          <li class="evo-list-item">
            <img src="${Icons.resolve("diagnostics_pulse")}" class="evo-icon" />
            Proxies: ${daemon.proxySummary.proxyCount}
          </li>
          <li class="evo-list-item">
            <img src="${Icons.resolve("ai_brain")}" class="evo-icon" />
            Pals: ${daemon.palSummary?.palCount ?? "1"}
          </li>
        </ul>
      </div>
    `
    : "";

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
              ${tone} • ${band} • ${version}
            </p>
          </div>
        </div>
      </div>

      <!-- QUICK ACTIONS ------------------------------------------------------->
      <div class="evo-block" data-hook="pulsepal.quick">
        <h2 style="margin-top:0;">Quick Actions</h2>

        <div style="display:flex; gap:16px; flex-wrap:wrap;">

          <button class="evo-button" onclick="Router.go('pulsepal.chat')">
            <img src="${Icons.resolve("ai_brain")}" class="evo-icon" />
            Chat
          </button>

          <button class="evo-button" onclick="Router.go('pulsepal.skills')">
            <img src="${Icons.resolve("binary_matrix")}" class="evo-icon" />
            Skills
          </button>

          <button class="evo-button" onclick="Router.go('pulsepal.tasks')">
            <img src="${Icons.resolve("check")}" class="evo-icon" />
            Tasks
          </button>

          <button class="evo-button" onclick="Router.go('pulsepal.system')">
            <img src="${Icons.resolve("diagnostics_pulse")}" class="evo-icon" />
            System
          </button>

          <button class="evo-button" onclick="Router.go('pulsepal.settings')">
            <img src="${Icons.resolve("settings")}" class="evo-icon" />
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
            ${activity} • ${tone}
            <br/>
            I’m here and ready. Start a chat, manage tasks, explore skills, or review system state.
          </p>
        </div>
      </div>

      <!-- PAL SYSTEM STATUS --------------------------------------------------->
      <div class="evo-block" data-hook="pulsepal.status">
        <h2 style="margin-top:0;">System Status</h2>

        <ul class="evo-list">
          <li class="evo-list-item">
            <img src="${Icons.resolve("stable")}" class="evo-icon" />
            Core Systems: ${system.core || "Stable"}
          </li>

          <li class="evo-list-item">
            <img src="${Icons.resolve("presence")}" class="evo-icon" />
            Presence Engine: ${system.presence || "Active"}
          </li>

          <li class="evo-list-item">
            <img src="${Icons.resolve("router_node")}" class="evo-icon" />
            Router Cortex: ${system.router || "Connected"}
          </li>

          <li class="evo-list-item">
            <img src="${Icons.resolve("ai_brain")}" class="evo-icon" />
            Pal Intelligence: ${system.anim || "Online"}
          </li>
        </ul>
      </div>

      <!-- DAEMON SNAPSHOT ----------------------------------------------------->
      ${daemonHtml}

    </div>
  `;
}
