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
import {
  OrganismIdentity,
  buildPulseOrganismMap as PulseOrganismMap,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PULSE-WORLD-MAP.js";
const Identity = OrganismIdentity(import.meta.url);

// 2 — EXPORT GENOME METADATA
// export const PulseMeshMeta = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
// export const PULSE_EARN_IMMUNE_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;
import { PulseProofBridge } from "../../PULSE-UI/_BACKEND/PULSE-WORLD-BRIDGE.js";

const CorePresence = PulseProofBridge.corepresence;
const CoreDaemon   = PulseProofBridge.coredaemon; // NEW
const CoreMemory   = PulseProofBridge.corememory;

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
