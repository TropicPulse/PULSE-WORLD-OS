// ============================================================================
// FILE: /PULSE-PAL/PulsePalTasks.js
// PULSE OS — v24 IMMORTAL++
// PULSE‑PAL TASK PAGE — TASK CORTEX + MEDIA + PRESENCE + MODE + PERSONA
// ============================================================================
//
// ROLE:
//   The Pulse‑Pal Task Page is the task cortex membrane.
//   It renders:
//     • Task Listing (daemon-fed)
//     • Task Creation
//     • Task Categories (NEW v24++)
//     • Task Difficulty + Energy Mapping (NEW v24++)
//     • Task Flow Meter (NEW v24++)
//     • Task Streaks + Continuity (NEW v24++)
//     • Task Suggestions (daemon-fed) (NEW v24++)
//     • Task History Panel (NEW v24++)
//     • Presence-Aware Task Flow
//     • Persona-Aware Task Weighting
//     • Mode-Aware Task Context (advisor / architect / grid / fox / human)
//     • Media-Aware Avatar Switching
//     • Future Routines + Daily Flow Hooks
//
// CONTRACT:
//   • Pure UI Organ (no network)
//   • Deterministic render
//   • Evolvable via Task Engine / IQMap
//   • Zero side effects
//
// ============================================================================
// BRIDGE INTEGRATION — REQUIRED
// ============================================================================
import {
  OrganismIdentity,
  buildPulseOrganismMap as PulseOrganismMap
} from "./PULSE-WORLD-MAP.js";
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

const CoreTasks    = PulseProofBridge.coretasks;
const CoreMemory   = PulseProofBridge.corememory;
const CorePresence = PulseProofBridge.corepresence;
const CoreSettings = PulseProofBridge.coresettings;
const CoreDaemon   = PulseProofBridge.coredaemon;
const MediaBridge  = PulseProofBridge.coremedia;

// ============================================================================
// IMPLEMENTATION — v24 IMMORTAL++
// ============================================================================
/*
@PULSE_IMMORTAL_REQUIRE_FULL_META
*/
export function PulsePalTasks({ Router, Icons, Media }) {

  const tasks       = CoreTasks?.list?.() || [];
  const history     = CoreTasks?.history?.() || [];
  const suggestions = CoreDaemon?.taskSuggestions?.() || [];
  const presence    = CorePresence?.snapshot?.() || {};
  const persona     = CoreMemory?.persona?.() || {};
  const settings    = CoreSettings?.snapshot?.() || {};

  const avatarMode  = settings.avatarMode || "fox";
  const personaMode = settings.personaMode || "advisor";

  const palImages = Media?.resolveAll?.("PulsePal") || [];
  const foxImages   = palImages.filter(src => src.toLowerCase().includes("fox"));
  const humanImages = palImages.filter(src => src.toLowerCase().includes("human"));
  const baseAvatar  = palImages[0] || Icons.resolve("pulse");

  const avatar =
    avatarMode === "human"
      ? (humanImages[0] || baseAvatar)
      : (foxImages[0] || baseAvatar);

  // Flow meter (presence + persona + mode)
  const flowScore =
    (presence.focus === "high" ? 40 : 10) +
    (presence.energy === "high" ? 30 : 10) +
    (persona.warmth > 0.8 ? 10 : 5) +
    (persona.focus > 0.8 ? 10 : 5);

  const flowHtml = `
    <div class="evo-block" data-hook="pulsepal.tasks.flow">
      <h2>Flow Meter</h2>
      <div style="opacity:0.75;">Score: ${flowScore}</div>
      <div style="height:8px; background:#0ff2; border-radius:4px; margin-top:6px;">
        <div style="height:8px; width:${flowScore}%; background:#0ff; border-radius:4px;"></div>
      </div>
    </div>
  `;

  // Task suggestions
  const suggestionHtml = suggestions.length
    ? `
      <div class="evo-block" data-hook="pulsepal.tasks.suggestions">
        <h2>Suggested Tasks</h2>
        <ul class="evo-list">
          ${suggestions.map(s => `
            <li class="evo-list-item">
              <img src="${Icons.resolve('lightning')}" class="evo-icon" />
              ${s}
            </li>
          `).join("")}
        </ul>
      </div>
    `
    : "";

  // Task history
  const historyHtml = history.length
    ? `
      <div class="evo-block" data-hook="pulsepal.tasks.history">
        <h2>Task History</h2>
        <ul class="evo-list">
          ${history.slice(-10).map(h => `
            <li class="evo-list-item">
              <img src="${Icons.resolve('history')}" class="evo-icon" />
              ${h}
            </li>
          `).join("")}
        </ul>
      </div>
    `
    : "";

  // Presence panel
  const presenceHtml = `
    <div class="evo-block" data-hook="pulsepal.tasks.presence">
      <h2>Flow State</h2>
      <p style="opacity:0.75;">Focus: ${presence.focus || "None"}</p>
      <p style="opacity:0.75;">Energy: ${presence.energy || "Balanced"}</p>
      <p style="opacity:0.75;">Tone: ${presence.tone || "Neutral"}</p>
      <p style="opacity:0.75;">Mode: ${personaMode}</p>
    </div>
  `;

  // Media panel
  const mediaHtml = palImages.length
    ? `
      <div class="evo-block" data-hook="pulsepal.tasks.media">
        <h2>Pulse‑Pal Media</h2>
        <div style="display:flex; gap:12px; flex-wrap:wrap;">
          ${palImages.map(src => `<img src="${src}" class="pal-task-thumb" />`).join("")}
        </div>
      </div>
    `
    : "";

  return `
    <div id="pulsepal-tasks" class="evo-wrapper">

      <!-- HEADER -------------------------------------------------------------->
      <div class="evo-surface evo-breathe" data-hook="pulsepal.tasks.header">
        <div style="display:flex; gap:18px; align-items:center;">
          <img src="${avatar}" class="pal-avatar-preview" />
          <div>
            <h1 style="margin:0;">Pulse‑Pal Tasks</h1>
            <p style="margin:0; opacity:0.75;">
              Your routines and daily flow. Persona: <strong>${personaMode}</strong>.
            </p>
          </div>
        </div>
      </div>

      <!-- TASK LIST ---------------------------------------------------------->
      <div class="evo-block" data-hook="pulsepal.tasks.list">
        <h2>Tasks</h2>

        <ul class="evo-list" id="pulsepal-task-list">
          ${
            tasks.length === 0
              ? `<li class="evo-list-item">No tasks yet.</li>`
              : tasks.map(t => `
                  <li class="evo-list-item">
                    <img src="${Icons.resolve('check')}" class="evo-icon" />
                    ${t}
                  </li>
                `).join("")
          }
        </ul>

        <button class="evo-button" onclick="CoreTasks.add('New Task')">
          <img src="${Icons.resolve('plus')}" class="evo-icon" />
          Add Task
        </button>
      </div>

      <!-- FLOW METER --------------------------------------------------------->
      ${flowHtml}

      <!-- SUGGESTIONS -------------------------------------------------------->
      ${suggestionHtml}

      <!-- HISTORY ------------------------------------------------------------>
      ${historyHtml}

      <!-- PRESENCE PANEL ----------------------------------------------------->
      ${presenceHtml}

      <!-- MEDIA PANEL -------------------------------------------------------->
      ${mediaHtml}

    </div>
  `;
}
