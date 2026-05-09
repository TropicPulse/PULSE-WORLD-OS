// ============================================================================
// FILE: /PULSE-PAL/PulsePalSkills.js
// PULSE OS — v24 IMMORTAL++
// PULSE‑PAL SKILLS PAGE — ABILITY CORTEX + MODE + PERSONA + PRESENCE
// ============================================================================
//
// ROLE:
//   Displays Pulse‑Pal’s abilities, grouped by category.
//   Evolves automatically as new skills are added to IQMap.
//   Serves as the Ability Cortex surface.
//
//   NEW v24++:
//     • Mode-aware skill emphasis (advisor, architect, grid, mesh, fox, human…)
//     • Persona-aware skill highlighting (warmth, focus, expressiveness)
//     • Presence-aware tone + activity overlays
//     • Daemon-aware continuity + palSummary integration
//     • Media-aware avatar preview
//     • Skill category influence weights
//     • Ability Cortex metadata expansion
//
// CONTRACT:
//   • Pure UI Organ
//   • Deterministic render
//   • Evolvable via IQMap + ModeEngine + PersonaEngine
//   • Zero side effects
//
// ============================================================================
// BRIDGE INTEGRATION — REQUIRED
// ============================================================================
import { PulseProofBridge } from "../../PULSE-UI/_BACKEND/PULSE-WORLD-BRIDGE.js";

const IQMapBridge   = PulseProofBridge.iqmap;
const CorePresence  = PulseProofBridge.corepresence;   // NEW
const CoreMemory    = PulseProofBridge.corememory;     // NEW
const CoreDaemon    = PulseProofBridge.coredaemon;     // NEW
const MediaBridge   = PulseProofBridge.coremedia;      // NEW

// ============================================================================
// AI_EXPERIENCE_META — v24 IMMORTAL++
// ============================================================================
export const AI_EXPERIENCE_META_PulsePalSkills = {
  id: "pulsepal.skills",
  kind: "ui_organ",
  version: "v24-IMMORTAL++",
  role: "Pulse‑Pal ability cortex membrane",
  surfaces: {
    band: ["skills", "abilities", "iqmap", "mode", "persona", "presence"],
    wave: ["exploratory", "structured", "clear", "mode_attuned"],
    binary: [
      "skill_category",
      "skill_count",
      "mode_influence",
      "persona_alignment",
      "avatar_preview"
    ],
    presence: ["ability_surface", "tone_alignment", "activity_alignment"],
    advantage: [
      "auto_evolving_skills",
      "mode_preload",
      "persona_preload",
      "media_preload"
    ],
    speed: "instant_ui"
  },
  routes: {
    home: "pulsepal.home",
    identity: "pulsepal.identity",
    world: "pulsepal.world",
    settings: "pulsepal.settings"
  },
  consumers: [
    "Router",
    "IQMap",
    "IQMapBridge",
    "CorePresence",
    "CoreMemory",
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
export const AI_EXPERIENCE_CONTEXT_PulsePalSkills = {
  tone: "curious_structured",
  pacing: "steady",
  emotionalBand: "exploration",
  primaryIntent: "show_abilities",
  secondaryIntent: "invite_skill_discovery",
  userFirstImpression: "this_is_what_pulsepal_can_do",
  visualNotes: {
    icon: "binary_matrix",
    motion: "soft_breathe",
    colorBand: "cyan_blue"
  }
};

// ============================================================================
// ORGAN_META — v24 IMMORTAL++
// ============================================================================
export const ORGAN_META_PulsePalSkills = {
  id: "organ.pulsepal.skills",
  organism: "PulsePal",
  layer: "ui.skills",
  tier: "IMMORTAL",
  evoFlags: {
    autoEvolvesWithIQMap: true,
    canAddSkillCategories: true,
    requiresIQMap: true,
    modeAware: true,       // NEW
    personaAware: true,    // NEW
    presenceAware: true,   // NEW
    daemonAware: true,     // NEW
    mediaAware: true       // NEW
  },
  lineage: {
    family: "companion_skills",
    generation: 2,
    osVersion: "v24"
  }
};

// ============================================================================
// ORGAN_CONTRACT — v24 IMMORTAL++
// ============================================================================
export const ORGAN_CONTRACT_PulsePalSkills = {
  inputs: {
    Router: "navigation interface",
    Icons: "icon resolution interface",
    IQMap: "skill map interface",
    IQMapBridge: "bridge skill organ",
    CorePresence: "presence organ",
    CoreMemory: "memory organ",
    CoreDaemon: "daemon snapshot",
    Media: "media resolver"
  },
  outputs: {
    uiSurface: "skills_cortex",
    categories: "IQMap.skillCategories",
    skillsByCategory: "IQMap.skillsByCategory",
    mode: "CorePresence.mode",
    persona: "CoreMemory.persona",
    continuity: "CoreDaemon.palHistory.continuityScore"
  },
  consumers: [
    "Router",
    "IQMap",
    "IQMapBridge",
    "CorePresence",
    "CoreMemory",
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
export const IMMORTAL_OVERLAYS_PulsePalSkills = {
  drift: {
    allowed: false,
    notes: "Skill category semantics must remain stable."
  },
  pressure: {
    expectedLoad: "high",
    notes: "Users frequently explore abilities."
  },
  stability: {
    uiLayout: "stable",
    semantics: "stable",
    notes: "Only additive evolution allowed."
  },
  load: {
    maxComponents: 4,
    notes: "Header, avatar, categories, mode influence."
  },
  chunking: {
    prewarm: [
      "icons.binary_matrix",
      "icons.ai_brain",
      "icons.neon_ring",
      "media.pulsepal"
    ],
    cacheKey: "pulsepal.skills.ui"
  },
  worldLens: {
    awareOfWorlds: true,
    notes: "Some skills belong to Pulse‑World."
  },
  limbic: {
    band: "exploration_reward",
    notes: "User should feel discovery + capability."
  },
  triHeart: {
    cognitive: "skill_category_recognition",
    emotional: "curiosity",
    behavioral: "explore_skill_category"
  },
  impulseSpeed: {
    primaryAction: "open_skill_category",
    latencyTargetMs: 50
  },
  healingSurfaces: {
    enabled: true,
    notes: "Clear ability surfaces reduce overwhelm."
  }
};

// ============================================================================
// IMPLEMENTATION — v24 IMMORTAL++
// ============================================================================
export function PulsePalSkills({ Router, Icons, IQMap, Media }) {

  // Pull categories from IQMap or fallback
  const categories =
    IQMap?.skillCategories ||
    IQMapBridge?.skillCategories ||
    [
      { id: "core",  label: "Core Intelligence", icon: "ai_brain" },
      { id: "world", label: "Pulse‑World",       icon: "neon_ring" },
      { id: "tools", label: "Tools & Utilities", icon: "binary_matrix" },
      { id: "earn",  label: "Earn & Economy",    icon: "coin" }
    ];

  const skillsByCategory =
    IQMap?.skillsByCategory ||
    IQMapBridge?.skillsByCategory ||
    {};

  // NEW: presence + persona + daemon surfaces
  const presence = CorePresence?.snapshot?.() || {};
  const persona  = CoreMemory?.persona?.() || {};
  const daemon   = CoreDaemon?.snapshot?.() || {};

  const activeMode =
    presence.mode ||
    persona?.tone?.activeMode ||
    "advisor";

  const continuityScore =
    daemon?.palHistory?.continuityScore ||
    daemon?.palSummary?.avgPalContinuance ||
    0;

  // NEW: avatar preview
  const palImages = Media?.resolveAll?.("PulsePal") || [];
  let avatar = palImages[0] || Icons.resolve("pulse");

  if (palImages.length && activeMode) {
    const lower = activeMode.toLowerCase();
    const match = palImages.find(src => src.toLowerCase().includes(lower));
    if (match) avatar = match;
  }

  // NEW: mode influence (simple heuristic)
  const modeInfluence = persona?.modeInfluence || {};

  return `
    <div id="pulsepal-skills" class="evo-wrapper">

      <!-- HEADER ------------------------------------------------------------->
      <div class="evo-surface evo-breathe" data-hook="pulsepal.skills.header">
        <div style="display:flex; align-items:center; gap:18px;">
          <img src="\${Icons.resolve('binary_matrix')}" class="evo-icon" />
          <div>
            <h1 style="margin:0; font-size:1.6rem; color:#00eaff;">
              Pulse‑Pal Skills
            </h1>
            <p style="margin:0; opacity:0.75;">
              Explore what I can do.
            </p>
            <!-- NEW: mode + continuity -->
            <p style="margin:0; opacity:0.55; font-size:0.85rem;">
              Mode: <strong>\${activeMode}</strong> · Continuity: \${continuityScore}
            </p>
          </div>
        </div>
      </div>

      <!-- NEW: AVATAR PREVIEW ----------------------------------------------->
      <div class="evo-block" data-hook="pulsepal.skills.avatar">
        <h2 style="margin-top:0;">Ability Cortex Avatar</h2>
        <img src="\${avatar}" class="pal-avatar-preview" />
        <p style="opacity:0.7; margin-top:6px; font-size:0.85rem;">
          Avatar adapts to mode and persona.
        </p>
      </div>

      <!-- NEW: MODE INFLUENCE ----------------------------------------------->
      <div class="evo-block" data-hook="pulsepal.skills.mode">
        <h2 style="margin-top:0;">Mode Influence</h2>
        ${
          Object.keys(modeInfluence).length
            ? `
              <ul class="evo-list">
                ${Object.entries(modeInfluence)
                  .map(([m, v]) =>
                    `<li class="evo-list-item">${m}: ${(v * 100).toFixed(1)}%</li>`
                  )
                  .join("")}
              </ul>
            `
            : `<p style="opacity:0.7;">No mode influence detected yet.</p>`
        }
      </div>

      <!-- CATEGORY LIST ------------------------------------------------------>
      <div class="evo-block" data-hook="pulsepal.skills.categories">
        <h2 style="margin-top:0;">Skill Categories</h2>

        <div style="display:flex; flex-direction:column; gap:18px;">
          ${categories.map(cat => `
            <div class="evo-surface evo-route-enter"
                 style="display:flex; align-items:center; gap:16px; cursor:pointer;"
                 onclick="Router.go('pulsepal.skills.${cat.id}')">

              <img src="\${Icons.resolve(cat.icon)}" class="evo-icon" />

              <div style="flex:1;">
                <div style="font-size:1.2rem; color:#00eaff;">${cat.label}</div>
                <div style="opacity:0.75; font-size:0.9rem;">
                  ${(skillsByCategory?.[cat.id]?.length || 0)} skills available
                </div>
              </div>

              <img src="\${Icons.resolve('arrow_right')}" class="evo-icon" />
            </div>
          `).join("")}
        </div>
      </div>

    </div>
  `;
}
