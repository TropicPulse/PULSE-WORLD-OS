// ============================================================================
// FILE: /PULSE-PAL/PulsePalSkills.js
// PULSE OS — v20 IMMORTAL
// PULSE‑PAL SKILLS PAGE — ABILITY CORTEX
// ============================================================================
//
// ROLE:
//   Displays Pulse‑Pal’s abilities, grouped by category.
//   Evolves automatically as new skills are added to IQMap.
//   Serves as the Ability Cortex surface.
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
const IQMapBridge = PulseProofBridge.iqmap;

// ============================================================================
// AI_EXPERIENCE_META
// ============================================================================
export const AI_EXPERIENCE_META_PulsePalSkills = {
  id: "pulsepal.skills",
  kind: "ui_organ",
  version: "v20-IMMORTAL",
  role: "Pulse‑Pal ability cortex membrane",
  surfaces: {
    band: ["skills", "abilities", "iqmap"],
    wave: ["exploratory", "structured", "clear"],
    binary: ["skill_category", "skill_count"],
    presence: ["ability_surface"],
    advantage: ["auto_evolving_skills"],
    speed: "instant_ui"
  },
  routes: {
    home: "pulsepal.home",
    identity: "pulsepal.identity",
    world: "pulsepal.world"
  },
  consumers: ["Router", "IQMap", "IQMapBridge"],
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
// ORGAN_META
// ============================================================================
export const ORGAN_META_PulsePalSkills = {
  id: "organ.pulsepal.skills",
  organism: "PulsePal",
  layer: "ui.skills",
  tier: "IMMORTAL",
  evoFlags: {
    autoEvolvesWithIQMap: true,
    canAddSkillCategories: true,
    requiresIQMap: true
  },
  lineage: {
    family: "companion_skills",
    generation: 1,
    osVersion: "v20"
  }
};

// ============================================================================
// ORGAN_CONTRACT
// ============================================================================
export const ORGAN_CONTRACT_PulsePalSkills = {
  inputs: {
    Router: "navigation interface",
    Icons: "icon resolution interface",
    IQMap: "skill map interface",
    IQMapBridge: "bridge skill organ"
  },
  outputs: {
    uiSurface: "skills_cortex",
    categories: "IQMap.skillCategories",
    skillsByCategory: "IQMap.skillsByCategory"
  },
  consumers: ["Router", "IQMap", "IQMapBridge"],
  guarantees: {
    deterministicRender: true,
    noNetwork: true,
    noSideEffects: true
  }
};

// ============================================================================
// IMMORTAL_OVERLAYS
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
    maxComponents: 2,
    notes: "Header + category list."
  },
  chunking: {
    prewarm: ["icons.binary_matrix", "icons.ai_brain", "icons.neon_ring"],
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
// IMPLEMENTATION
// ============================================================================
/* 
@PULSE_IMMORTAL_REQUIRE_FULL_META
(…same block…)
*/
export function PulsePalSkills({ Router, Icons, IQMap }) {

  // Pull categories from IQMap or fallback
  const categories = IQMap?.skillCategories || IQMapBridge?.skillCategories || [
    { id: "core",  label: "Core Intelligence", icon: "ai_brain" },
    { id: "world", label: "Pulse‑World",       icon: "neon_ring" },
    { id: "tools", label: "Tools & Utilities", icon: "binary_matrix" },
    { id: "earn",  label: "Earn & Economy",    icon: "coin" }
  ];

  const skillsByCategory = IQMap?.skillsByCategory || IQMapBridge?.skillsByCategory || {};

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
          </div>
        </div>
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

      <!-- FUTURE: SKILL SEARCH ---------------------------------------------->
      <!--
      <div class="evo-block" data-hook="pulsepal.skills.search">
        <h2>Search Skills</h2>
        <input class="evo-input" placeholder="Search abilities..." />
      </div>
      -->

      <!-- FUTURE: SKILL TAGS ------------------------------------------------->
      <!--
      <div class="evo-block" data-hook="pulsepal.skills.tags">
        <h2>Tags</h2>
        <div class="evo-tag-list">
          <span class="evo-tag">AI</span>
          <span class="evo-tag">World</span>
          <span class="evo-tag">Tools</span>
          <span class="evo-tag">Earn</span>
        </div>
      </div>
      -->

    </div>
  `;
}
