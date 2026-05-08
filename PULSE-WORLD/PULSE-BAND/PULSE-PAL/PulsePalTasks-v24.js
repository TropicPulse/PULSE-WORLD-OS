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
import { PulseProofBridge } from "/PULSE/BRIDGE/PulseProofBridge.js";

const CoreTasks    = PulseProofBridge.coretasks;
const CoreMemory   = PulseProofBridge.corememory;
const CorePresence = PulseProofBridge.corepresence;
const CoreSettings = PulseProofBridge.coresettings;
const CoreDaemon   = PulseProofBridge.coredaemon;
const MediaBridge  = PulseProofBridge.coremedia;

// ============================================================================
// AI_EXPERIENCE_META — v24 IMMORTAL++
// ============================================================================
export const AI_EXPERIENCE_META_PulsePalTasks = {
  id: "pulsepal.tasks",
  kind: "ui_organ",
  version: "v24-IMMORTAL++",
  role: "Pulse‑Pal task cortex membrane",
  surfaces: {
    band: ["tasks", "routines", "flow", "media", "mode", "persona"],
    wave: ["organized", "steady", "clear", "mode_attuned"],
    binary: [
      "task_list",
      "task_add",
      "task_complete",
      "task_category",
      "task_energy",
      "task_suggestion",
      "task_history"
    ],
    presence: ["task_state", "flow_state"],
    advantage: [
      "explicit_task_control",
      "media_preload",
      "mode_preload",
      "persona_preload"
    ],
    speed: "instant_ui"
  },
  routes: {
    home: "pulsepal.home",
    system: "pulsepal.system",
    settings: "pulsepal.settings",
    presence: "pulsepal.presence"
  },
  consumers: [
    "Router",
    "CoreTasks",
    "CoreMemory",
    "CorePresence",
    "CoreSettings",
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
// AI_EXPERIENCE_CONTEXT — v24 IMMORTAL++
// ============================================================================
export const AI_EXPERIENCE_CONTEXT_PulsePalTasks = {
  tone: "neutral_productive",
  pacing: "steady",
  emotionalBand: "task_flow",
  primaryIntent: "let_user_manage_tasks",
  secondaryIntent: "prepare_for_routines",
  userFirstImpression: "this_is_where_tasks_live",
  visualNotes: {
    icon: "check",
    motion: "soft_breathe",
    colorBand: "cyan_green"
  }
};

// ============================================================================
// ORGAN_META — v24 IMMORTAL++
// ============================================================================
export const ORGAN_META_PulsePalTasks = {
  id: "organ.pulsepal.tasks",
  organism: "PulsePal",
  layer: "ui.tasks",
  tier: "IMMORTAL",
  evoFlags: {
    canAddTaskTypes: true,
    canAddRoutinePanels: true,
    requiresCoreTasks: true,
    presenceAware: true,
    personaAware: true,
    modeAware: true,
    mediaAware: true,
    daemonAware: true
  },
  lineage: {
    family: "companion_tasks",
    generation: 3,
    osVersion: "v24"
  }
};

// ============================================================================
// ORGAN_CONTRACT — v24 IMMORTAL++
// ============================================================================
export const ORGAN_CONTRACT_PulsePalTasks = {
  inputs: {
    Router: "navigation interface",
    Icons: "icon resolution interface",
    Media: "media resolver interface",
    CoreTasks: "bridge task organ",
    CoreMemory: "bridge memory organ",
    CorePresence: "bridge presence organ",
    CoreSettings: "bridge settings organ",
    CoreDaemon: "bridge daemon snapshot"
  },
  outputs: {
    uiSurface: "task_cortex",
    tasks: "CoreTasks.list",
    presence: "CorePresence.snapshot",
    persona: "CoreMemory.persona",
    mode: "CoreSettings.personaMode",
    avatarMode: "CoreSettings.avatarMode",
    suggestions: "CoreDaemon.taskSuggestions",
    history: "CoreTasks.history"
  },
  consumers: [
    "Router",
    "CoreTasks",
    "CoreMemory",
    "CorePresence",
    "CoreSettings",
    "CoreDaemon"
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
export const IMMORTAL_OVERLAYS_PulsePalTasks = {
  drift: {
    allowed: false,
    notes: "Task semantics must remain stable."
  },
  pressure: {
    expectedLoad: "medium",
    notes: "Tasks are used frequently but not constantly."
  },
  stability: {
    uiLayout: "stable",
    semantics: "stable",
    notes: "Only additive evolution allowed."
  },
  load: {
    maxComponents: 8,
    notes: "Header, task list, add button, presence panel, suggestions, categories, history, media."
  },
  chunking: {
    prewarm: [
      "icons.check",
      "icons.plus",
      "icons.history",
      "icons.lightning",
      "icons.layers",
      "media.pulsepal"
    ],
    cacheKey: "pulsepal.tasks.ui"
  },
  worldLens: {
    awareOfWorlds: true
  },
  limbic: {
    band: "task_completion_reward"
  },
  triHeart: {
    cognitive: "task_management",
    emotional: "light_productivity",
    behavioral: "add_or_complete_task"
  },
  impulseSpeed: {
    primaryAction: "add_task",
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
