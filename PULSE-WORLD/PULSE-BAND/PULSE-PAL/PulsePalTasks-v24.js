// ============================================================================
// FILE: /PULSE-PAL/PulsePalTasks.js
// PULSE OS — v24 IMMORTAL
// PULSE‑PAL TASK PAGE — TASK CORTEX + MEDIA + PRESENCE
// ============================================================================
//
// ROLE:
//   The Pulse‑Pal Task Page is the task cortex surface.
//   It introduces:
//     • Task Listing (daemon-fed)
//     • Task Creation
//     • Future Routines + Daily Flow Hooks
//     • Presence-Aware Task Flow
//     • Media-Aware Task Context (PulsePal images)
//     • History Scanner Hooks
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

// ============================================================================
// AI_EXPERIENCE_META
// ============================================================================
export const AI_EXPERIENCE_META_PulsePalTasks = {
  id: "pulsepal.tasks",
  kind: "ui_organ",
  version: "v24-IMMORTAL",
  role: "Pulse‑Pal task cortex membrane",
  surfaces: {
    band: ["tasks", "routines", "flow", "media"],
    wave: ["organized", "steady", "clear"],
    binary: ["task_list", "task_add", "task_complete"],
    presence: ["task_state", "flow_state"],
    advantage: ["explicit_task_control", "media_preload"],
    speed: "instant_ui"
  },
  routes: {
    home: "pulsepal.home",
    system: "pulsepal.system",
    settings: "pulsepal.settings"
  },
  consumers: ["Router", "CoreTasks", "CoreMemory", "CorePresence"],
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
// ORGAN_META
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
    mediaAware: true
  },
  lineage: {
    family: "companion_tasks",
    generation: 2,
    osVersion: "v24"
  }
};

// ============================================================================
// ORGAN_CONTRACT
// ============================================================================
export const ORGAN_CONTRACT_PulsePalTasks = {
  inputs: {
    Router: "navigation interface",
    Icons: "icon resolution interface",
    Media: "media resolver interface",
    CoreTasks: "bridge task organ",
    CoreMemory: "bridge memory organ",
    CorePresence: "bridge presence organ"
  },
  outputs: {
    uiSurface: "task_cortex",
    tasks: "CoreTasks.list",
    presence: "CorePresence.snapshot"
  },
  consumers: ["Router", "CoreTasks", "CoreMemory", "CorePresence"],
  guarantees: {
    deterministicRender: true,
    noNetwork: true,
    noSideEffects: true
  }
};

// ============================================================================
// IMMORTAL_OVERLAYS
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
    maxComponents: 4,
    notes: "Header, task list, add button, presence panel."
  },
  chunking: {
    prewarm: ["icons.check", "icons.plus", "media.pulsepal"],
    cacheKey: "pulsepal.tasks.ui"
  },
  worldLens: {
    awareOfWorlds: false
  },
  limbic: {
    band: "task_completion_reward",
    notes: "User should feel progress + clarity."
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
    enabled: true,
    notes: "Task clarity reduces overwhelm."
  }
};

// ============================================================================
// IMPLEMENTATION — v24 IMMORTAL++
// ============================================================================
/*
@PULSE_IMMORTAL_REQUIRE_FULL_META
*/
export function PulsePalTasks({ Router, Icons, Media }) {

  const tasks = CoreTasks?.list?.() || [];
  const presence = CorePresence?.snapshot?.() || {};
  const palImages = Media?.resolveAll?.("PulsePal") || [];

  const presenceHtml = `
    <div class="evo-block" data-hook="pulsepal.tasks.presence">
      <h2>Flow State</h2>
      <p style="opacity:0.75;">Focus: ${presence.focus || "None"}</p>
      <p style="opacity:0.75;">Energy: ${presence.energy || "Balanced"}</p>
      <p style="opacity:0.75;">Tone: ${presence.tone || "Neutral"}</p>
    </div>
  `;

  const mediaHtml = palImages.length
    ? `
      <div class="evo-block" data-hook="pulsepal.tasks.media">
        <h2>Pulse‑Pal Media</h2>
        <div style="display:flex; gap:12px; flex-wrap:wrap;">
          ${palImages
            .map(src => `<img src="${src}" class="pal-task-thumb" />`)
            .join("")}
        </div>
      </div>
    `
    : "";

  return `
    <div id="pulsepal-tasks" class="evo-wrapper">

      <!-- HEADER -------------------------------------------------------------->
      <div class="evo-surface evo-breathe" data-hook="pulsepal.tasks.header">
        <div style="display:flex; gap:18px; align-items:center;">
          <img src="${Icons.resolve('check')}" class="evo-icon" />
          <div>
            <h1 style="margin:0;">Pulse‑Pal Tasks</h1>
            <p style="margin:0; opacity:0.75;">Your routines and daily flow.</p>
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

      <!-- PRESENCE PANEL ----------------------------------------------------->
      ${presenceHtml}

      <!-- MEDIA PANEL -------------------------------------------------------->
      ${mediaHtml}

    </div>
  `;
}
