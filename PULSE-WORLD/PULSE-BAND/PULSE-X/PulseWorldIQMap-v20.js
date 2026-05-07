// -----------------------------------------------------------------------------
// PulseIQMap-v20-IMMORTAL-EVOLVABLE.js
// THE EVOLVABLE BRAIN — organism + UI genome + comfort/security patterns
// Everything is a pattern. Everything is evolvable. Nothing is guessed.
// -----------------------------------------------------------------------------
/*
AI_EXPERIENCE_META = {
  identity: "IQMap",
  version: "v20-IMMORTAL-EVOLVABLE",
  layer: "consciousness",
  role: "organism_brain + ui_brain + comfort_pattern_brain",
  lineage: [
    "PulseOS-v14",
    "v16-Immortal-CONSCIOUSNESS",
    "v18-Immortal-CONSCIOUSNESS+UI-SKILLS",
    "v19-Immortal-PATTERN",
    "v20-Immortal-EVOLVABLE"
  ],

  evo: {
    organismAware: true,
    uiSkillsAware: true,
    uiEvolvable: true,
    patternAware: true,
    comfortPatternAware: true,

    chunkingAware: true,
    prewarmAware: true,
    dualBandAware: true,

    deterministic: true,
    driftProof: true,
    zeroNetworkFetch: true,
    zeroMutationOfInput: true,
    zeroExternalMutation: true
  },

  contract: {
    always: [
      "PulseOrganismMap",
      "PulseAIChunker",
      "PulseUIEvolutionarySkillsBuilder",
      "PulseComfortPatterns"
    ],
    never: [
      "manualRouting",
      "manualSkillsMapOnly",
      "adHocComfortLogic"
    ]
  }
}
*/

// -----------------------------------------------------------------------------
// IMPORTS (pure contracts; real system wires concrete implementations)
// -----------------------------------------------------------------------------
import { PulseOrganismMap } from "./PulseWorldOrganismMap-v17.js";
import { createPulseAIChunker } from "../ai-core/PulseAIChunker-v16.js";
import { log, warn, error as logError } from "../../PULSE-UI/_BACKEND/PulseProofLogger.js";

// -----------------------------------------------------------------------------
// VERSION MAP
// -----------------------------------------------------------------------------
const VERSION_MAP = {
  organism: "v16-IMMORTAL-ORGANISM",
  iq: "v20-IMMORTAL-EVOLVABLE",

  uiSkillsGenome: "v20-UI-SKILLS-GENOME-EVOLVABLE",
  uiSkillsBuilder: "v20-UI-SKILLS-BUILDER-EVOLVABLE",
  uiCompiler: "v20-UI-COMPILER-PAGE-IMMORTAL",

  patternEngine: "v20-PATTERN-ENGINE-COMFORT",
  patternRegistry: "v20-PATTERN-REGISTRY-COMFORT",
  patternPlanner: "v20-PATTERN-PLANNER-COMFORT",
  patternExecutor: "v20-PATTERN-EXECUTOR-COMFORT"
};

// -----------------------------------------------------------------------------
// FRONTEND / WORLD TOPOLOGY (same as before, just centralized)
// -----------------------------------------------------------------------------
const FRONTEND_ROOT = "PULSE-WORLD";

const FRONTEND_FILES = [
  "index.html",
  "dashboard.html",
  "checkemail.html",
  "userrecords.html"
];

const FRONTEND_SYSTEMS = [
  "PulseAdmin",
  "PulseDirectory",
  "PulseDelivery",
  "PulseRewards"
];

const WORLD_FOLDERS = [
  "NETLIFY/FUNCTIONS",
  "_PICTURES",
  "_REDIRECT",
  "_SOUNDS",
  "_LOADERS",
  "_HELPERS"
];

// -----------------------------------------------------------------------------
// DRIFT / REPAIR METADATA
// -----------------------------------------------------------------------------
const DRIFT_METADATA = {
  lastScan: null,
  lastRepair: null,
  signatures: [],
  repairOrgans: [
    "PulseBandCleanup",
    "PulseHistoryRepair",
    "PulseOSHealer",
    "GlobalHealer",
    "PulseProxyHealer"
  ],
  scannerOrgans: ["PulseFileScanner", "PulseCodeAnalyzer"]
};

// -----------------------------------------------------------------------------
// ROUTE EXPECTATIONS — still no static routing, just expectations
// -----------------------------------------------------------------------------
function buildPageExpectations() {
  return {
    "/": ["PulseEvolutionaryPage"],
    "/dashboard": ["PulseEvolutionaryPage"],
    "/send": ["PulseEvolutionaryPage"],
    "/forms/send": ["PulseEvolutionaryPage"],
    "/earn": ["PulseEvolutionaryPage"],
    "/settings": ["PulseEvolutionaryPage"],
    "/organism": ["PulseEvolutionaryPage"],
    "/scanner": ["PulseEvolutionaryPage"],
    "/scanner/file": ["PulseEvolutionaryPage"],
    "/proxy": ["PulseEvolutionaryPage"],
    "/proxy/health": ["PulseEvolutionaryPage"],
    "/proxy/metrics": ["PulseEvolutionaryPage"],
    "/proxy/node": ["PulseEvolutionaryPage"],
    "/admin": ["PulseEvolutionaryPage"],
    "/directory": ["PulseEvolutionaryPage"],
    "/delivery": ["PulseEvolutionaryPage"],
    "/rewards": ["PulseEvolutionaryPage"],
    "/userrecords": ["PulseEvolutionaryPage"]
  };
}

function interpretRoute(path = "", genome, pageExpectations) {
  if (!path || typeof path !== "string") return "/";

  const clean = path.toLowerCase().split("?")[0].split("#")[0];
  if (clean === "/" || clean === "") return "/";

  if (pageExpectations[clean]) return clean;

  const asHtml = clean.replace("/", "") + ".html";
  if (FRONTEND_FILES.includes(asHtml)) return clean;

  const asSystem = clean.replace("/", "");
  if (FRONTEND_SYSTEMS.includes(asSystem)) return clean;

  if (genome.systems && genome.systems[asSystem]) return clean;

  return "/";
}

// -----------------------------------------------------------------------------
// ORGANISM INTERPRETATION
// -----------------------------------------------------------------------------
function buildOrganExpectationsFromGenome(genome) {
  const systems = genome.systems || {};
  const organsBySystem = {};

  for (const [systemKey, systemDef] of Object.entries(systems)) {
    organsBySystem[systemKey] = systemDef.organs || [];
  }

  return organsBySystem;
}

// -----------------------------------------------------------------------------
// CHUNKER — IMMORTAL 32-LANE
// -----------------------------------------------------------------------------
const iqChunker = createPulseAIChunker({
  id: "PulseAIChunker-IQMap-v20",
  defaultChunkSize: 4096,
  maxChunkSize: 32768,
  trace: false
});

// prewarm patterns for routes, organism, ui, comfort patterns
iqChunker.prewarmPattern("routes", {
  defaultChunkSize: 2048,
  maxChunkSize: 16384,
  band: "symbolic"
});

iqChunker.prewarmPattern("organism_ui", {
  defaultChunkSize: 4096,
  maxChunkSize: 32768,
  band: "symbolic"
});

iqChunker.prewarmPattern("ui_skills", {
  defaultChunkSize: 4096,
  maxChunkSize: 32768,
  band: "symbolic"
});

iqChunker.prewarmPattern("ui_icons", {
  defaultChunkSize: 2048,
  maxChunkSize: 8192,
  band: "symbolic"
});

iqChunker.prewarmPattern("ui_animations", {
  defaultChunkSize: 2048,
  maxChunkSize: 8192,
  band: "symbolic"
});

iqChunker.prewarmPattern("ui_styles", {
  defaultChunkSize: 2048,
  maxChunkSize: 8192,
  band: "symbolic"
});

iqChunker.prewarmPattern("ui_hooks", {
  defaultChunkSize: 1024,
  maxChunkSize: 4096,
  band: "symbolic"
});

iqChunker.prewarmPattern("comfort_patterns", {
  defaultChunkSize: 1024,
  maxChunkSize: 8192,
  band: "symbolic"
});

// -----------------------------------------------------------------------------
// CHUNKING PROFILES
// -----------------------------------------------------------------------------
function buildChunkingProfiles(genome, pageExpectations) {
  const routeProfiles = {};
  for (const route of Object.keys(pageExpectations)) {
    routeProfiles[route] = {
      label: "routes",
      band: "symbolic",
      lanes: 32
    };
  }

  const uiProfiles = {
    skills: {
      label: "ui_skills",
      band: "symbolic",
      lanes: 32
    },
    icons: {
      label: "ui_icons",
      band: "symbolic",
      lanes: 32
    },
    animations: {
      label: "ui_animations",
      band: "symbolic",
      lanes: 32
    },
    styles: {
      label: "ui_styles",
      band: "symbolic",
      lanes: 32
    },
    hooks: {
      label: "ui_hooks",
      band: "symbolic",
      lanes: 16
    }
  };

  const comfortProfiles = {
    comfort: {
      label: "comfort_patterns",
      band: "symbolic",
      lanes: 16
    }
  };

  return {
    default: {
      label: "routes",
      band: "symbolic",
      lanes: 32
    },
    routes: routeProfiles,
    ui: uiProfiles,
    comfort: comfortProfiles
  };
}

// -----------------------------------------------------------------------------
// EVOLVABLE UI SKILLS BUILDER (ABSTRACT CONTRACT)
// In real system, another organ provides folder contents.
// Here we define the shape and evolution logic.
// -----------------------------------------------------------------------------
/**
 * sources = {
 *   pictures: { [id]: { path, meta } },
 *   sounds:   { [id]: { path, meta } },
 *   animations: { [id]: { css, pack, role, class } },
 *   styles:     { [id]: { css, pack, role, class } },
 *   icons:      { [id]: { svg, pack, role, class } },
 *   hooks:      { [id]: { config, pack, role } },
 *   timing:     { [id]: { tokens, pack } }
 * }
 */
function buildEvolutionarySkillsFromSources(sources) {
  const skills = {};
  const packs = {};

  const addPack = (packName) => {
    if (!packs[packName]) packs[packName] = { id: packName, skills: [] };
  };

  const addSkill = (id, skill) => {
    skills[id] = skill;
    const packName = skill.pack || "default";
    addPack(packName);
    packs[packName].skills.push(id);
  };

  // animations
  for (const [id, anim] of Object.entries(sources.animations || {})) {
    addSkill(id, {
      id,
      kind: "animation",
      pack: anim.pack || "animations",
      role: anim.role || null,
      class: anim.class || null,
      css: anim.css || "",
      meta: anim.meta || {}
    });
  }

  // styles
  for (const [id, style] of Object.entries(sources.styles || {})) {
    addSkill(id, {
      id,
      kind: "style",
      pack: style.pack || "styles",
      role: style.role || null,
      class: style.class || null,
      css: style.css || "",
      meta: style.meta || {}
    });
  }

  // icons
  for (const [id, icon] of Object.entries(sources.icons || {})) {
    addSkill(id, {
      id,
      kind: "icon",
      pack: icon.pack || "icons",
      role: icon.role || null,
      class: icon.class || null,
      svg: icon.svg || "",
      meta: icon.meta || {}
    });
  }

  // hooks
  for (const [id, hook] of Object.entries(sources.hooks || {})) {
    addSkill(id, {
      id,
      kind: "hook",
      pack: hook.pack || "hooks",
      role: hook.role || null,
      config: hook.config || {},
      meta: hook.meta || {}
    });
  }

  // timing tokens
  const timingTokens = sources.timing || {};

  // pictures / sounds are not skills, but part of hooks/packs
  const pictures = sources.pictures || {};
  const sounds = sources.sounds || {};

  return {
    version: VERSION_MAP.uiSkillsGenome,
    skills,
    packs,
    timingTokens,
    pictures,
    sounds
  };
}

// -----------------------------------------------------------------------------
// UI SKILLS INDEX + ROUTE EXPECTATIONS
// -----------------------------------------------------------------------------
function buildUISkillsIndex(skillsMap) {
  const skills = skillsMap.skills || {};
  const byPack = {};
  const byKind = {};
  const byRole = {};
  const byClass = {};
  const byIcon = {};

  for (const [id, skill] of Object.entries(skills)) {
    const pack = skill.pack || "unknown";
    const kind = skill.kind || "unknown";

    if (!byPack[pack]) byPack[pack] = [];
    byPack[pack].push(id);

    if (!byKind[kind]) byKind[kind] = [];
    byKind[kind].push(id);

    if (skill.role) {
      if (!byRole[skill.role]) byRole[skill.role] = [];
      byRole[skill.role].push(id);
    }

    if (skill.class) {
      if (!byClass[skill.class]) byClass[skill.class] = [];
      byClass[skill.class].push(id);
    }

    if (kind === "icon") {
      if (!byIcon[id]) byIcon[id] = [];
      byIcon[id].push(id);
    }
  }

  return {
    byPack,
    byKind,
    byRole,
    byClass,
    byIcon
  };
}

function buildRouteUISkillExpectations(pageExpectations, uiIndex) {
  const routeSkills = {};

  for (const route of Object.keys(pageExpectations)) {
    const base = {
      animations: [],
      styles: [],
      icons: [],
      hooks: []
    };

    if (route === "/") {
      base.animations.push("pulse-glow-v3", "evo-breathe-v3");
      base.styles.push("evo-block", "evo-title", "evo-content");
      base.icons.push("home", "pulse");
    }

    if (route === "/dashboard") {
      base.animations.push("evo-shimmer-v4", "evo-route-transition-v2");
      base.styles.push("evo-block", "evo-content", "evo-button");
      base.icons.push("diagnostics_pulse", "cpu", "gpu");
    }

    if (route === "/earn") {
      base.animations.push("evo-coin-spin", "evo-badge-pop");
      base.styles.push("evo-button", "evo-tier-immortal");
      base.icons.push("coin", "wallet", "badge", "trending_up");
    }

    if (route === "/organism") {
      base.animations.push("evo-neural-pulse", "evo-binary-flow");
      base.styles.push("evo-binary-spectral", "evo-impulse-ripple");
      base.icons.push("ai_brain", "binary_matrix", "router_node");
    }

    if (route === "/scanner" || route === "/scanner/file") {
      base.animations.push("evo-scan-v3");
      base.styles.push("evo-content");
      base.icons.push("search", "diagnostics_pulse");
    }

    if (route === "/proxy" || route.startsWith("/proxy/")) {
      base.animations.push("evo-router-hop");
      base.styles.push("evo-content");
      base.icons.push("router_node");
    }

    if (route === "/rewards") {
      base.animations.push("evo-confetti-fall");
      base.styles.push("evo-tier-immortal");
      base.icons.push("badge", "coin");
    }

    routeSkills[route] = base;
  }

  return routeSkills;
}

function buildUISkillsMeta(skillsMap, uiIndex, routeUISkills) {
  const skills = skillsMap.skills || {};
  const totalSkills = Object.keys(skills).length;

  const animationsCount = (uiIndex.byKind.animation || []).length;
  const stylesCount = (uiIndex.byKind.style || []).length;
  const iconsCount = (uiIndex.byKind.icon || []).length;

  const packs = skillsMap.packs || {};
  const packCounts = {};
  for (const [packName, pack] of Object.entries(packs)) {
    packCounts[packName] = (pack.skills || []).length;
  }

  const routesWithUISkills = Object.keys(routeUISkills || {}).length;

  return {
    version: VERSION_MAP.uiSkillsGenome,
    totalSkills,
    animationsCount,
    stylesCount,
    iconsCount,
    packCounts,
    routesWithUISkills
  };
}

// -----------------------------------------------------------------------------
// COMFORT PATTERN REGISTRY — “security” as comfort & safety
// -----------------------------------------------------------------------------
const ComfortPatternRegistry = Object.freeze({
  comfort_baseline: {
    id: "comfort_baseline",
    description: "Always‑on comfort: predictable, gentle, non‑surprising behavior.",
    phases: ["stabilize", "soften", "reassure"],
    steps: [
      "avoid_sudden_changes",
      "use_consistent_motion",
      "use_consistent_colors",
      "avoid_visual_noise",
      "keep_latency_predictable",
      "avoid_jarring_sounds"
    ]
  },

  comfort_transition: {
    id: "comfort_transition",
    description: "Make transitions feel safe and guided.",
    phases: ["prepare", "move", "land"],
    steps: [
      "preview_next_state",
      "use_soft_easing",
      "keep_focus_visible",
      "avoid_full_context_loss",
      "confirm_new_state"
    ]
  },

  comfort_feedback: {
    id: "comfort_feedback",
    description: "Always show that the system heard you.",
    phases: ["acknowledge", "progress", "complete"],
    steps: [
      "instant_ack",
      "show_progress",
      "show_completion",
      "avoid_silent_failures",
      "use_human_language"
    ]
  }
});

const ComfortPatternTags = Object.freeze({
  default: ["comfort_baseline", "comfort_feedback"],
  navigation: ["comfort_baseline", "comfort_transition", "comfort_feedback"],
  loading: ["comfort_baseline", "comfort_feedback"],
  error: ["comfort_baseline", "comfort_feedback"],
  success: ["comfort_baseline", "comfort_feedback"]
});

const comfortPatternChunks = iqChunker.chunkJSON(ComfortPatternRegistry, {
  label: "comfort_patterns",
  band: "symbolic"
});

function buildComfortPlan(contextTag = "default") {
  const ids = ComfortPatternTags[contextTag] || ComfortPatternTags.default;
  const patterns = ids.map((id) => ComfortPatternRegistry[id]).filter(Boolean);

  const phases = [];
  const steps = [];

  for (const pattern of patterns) {
    for (const phase of pattern.phases) {
      if (!phases.includes(phase)) phases.push(phase);
    }
    for (const step of pattern.steps) {
      if (!steps.includes(step)) steps.push(step);
    }
  }

  return {
    version: VERSION_MAP.patternPlanner,
    contextTag,
    patternIds: ids,
    phases,
    steps
  };
}
// ============================================================================
// FILE: /PULSE-CORE/PulseIQMap-v20-Evolvable.js
// PULSE OS — v20-IMMORTAL-EVOLVABLE IQ MAP
// IMMORTAL EVOLVABLE IQ MAP → AUTO-BUILT UI SKILL MAP → UPCOMING PAGE SKILLS
// ============================================================================
//
// ROLE (v20+):
//   • Build a full IQ Map from Organism Genome + Frontend Topology.
//   • Auto-build an EVOLVABLE UI Skills Genome from evolutionSources.
//   • Auto-build route → UI skills expectations (per-page skill bundles).
//   • Expose helpers to:
//       - getRouteUISkills(route)
//       - planUpcomingSkills(routeSequence)
//       - refreshSkills(nextEvolutionSources)  ← re-scan + rebuild skills
//
// CONTRACT:
//   • PURE MAP BUILDER — no network, no timers, no eval.
//   • evolutionSources is injected by a loader organ that scans folders.
//   • This builder is allowed to be called repeatedly as the organism evolves.
//   • All outputs are deterministic for a given genome + evolutionSources.
//
// SAFETY:
//   • v20 upgrade is EVOLUTIONARY + STRUCTURAL — richer helpers, no new IO.
//   • All behavior is deterministic and organism-safe.
// ============================================================================

// -----------------------------------------------------------------------------
// MAIN BUILDER — IMMORTAL EVOLVABLE IQ MAP (v20+)
// -----------------------------------------------------------------------------
async function buildPulseIQMapEvolvable(evolutionSources) {
  const genome = await PulseOrganismMap;

  const pageExpectations = buildPageExpectations();
  const organExpectations = buildOrganExpectationsFromGenome(genome);
  const chunkingProfiles = buildChunkingProfiles(genome, pageExpectations);

  const topology = {
    backendRoot: "tropic-pulse-functions",
    publishRoot: FRONTEND_ROOT,
    frontendFiles: FRONTEND_FILES,
    frontendSystems: FRONTEND_SYSTEMS,
    worldFolders: WORLD_FOLDERS
  };

  const topologyChunks = iqChunker.chunkJSON(topology, {
    label: "routes",
    band: "symbolic"
  });

  const organsChunks = iqChunker.chunkJSON(organExpectations, {
    label: "organism_ui",
    band: "symbolic"
  });

  const pagesChunks = iqChunker.chunkJSON(pageExpectations, {
    label: "routes",
    band: "symbolic"
  });

  const driftChunks = iqChunker.chunkJSON(DRIFT_METADATA, {
    label: "comfort_patterns",
    band: "symbolic"
  });

  const chunkingProfilesChunks = iqChunker.chunkJSON(chunkingProfiles, {
    label: "routes",
    band: "symbolic"
  });

  // ---------------------------------------------------------------------------
  // INTERNAL STATE — v20 EVOLVABLE UI SKILLS GENOME
  // ---------------------------------------------------------------------------
  let currentEvolutionSources = evolutionSources || {};
  let uiSkillsMap = buildEvolutionarySkillsFromSources(currentEvolutionSources);
  let uiSkillsIndex = buildUISkillsIndex(uiSkillsMap);
  let routeUISkills = buildRouteUISkillExpectations(
    pageExpectations,
    uiSkillsIndex
  );
  let uiGenomeMeta = buildUISkillsMeta(
    uiSkillsMap,
    uiSkillsIndex,
    routeUISkills
  );

  let uiSkillsChunks = iqChunker.chunkJSON(uiSkillsMap, {
    label: "ui_skills",
    band: "symbolic"
  });

  let uiSkillsIndexChunks = iqChunker.chunkJSON(uiSkillsIndex, {
    label: "ui_skills",
    band: "symbolic"
  });

  let routeUISkillsChunks = iqChunker.chunkJSON(routeUISkills, {
    label: "ui_skills",
    band: "symbolic"
  });

  let uiTimingChunks = iqChunker.chunkJSON(uiSkillsMap.timingTokens || {}, {
    label: "ui_styles",
    band: "symbolic"
  });

  let uiHooksChunks = iqChunker.chunkJSON(
    Object.fromEntries(
      Object.entries(uiSkillsMap.skills || {}).filter(
        ([, s]) => s.kind === "hook"
      )
    ),
    {
      label: "ui_hooks",
      band: "symbolic"
    }
  );

  // comfort patterns (already present)
  const comfortPatterns = ComfortPatternRegistry;
  const comfortPatternChunks = iqChunker.chunkJSON(comfortPatterns, {
    label: "comfort_patterns",
    band: "symbolic"
  });

  // ---------------------------------------------------------------------------
  // v20+ HELPER — REFRESH SKILLS WHEN ORGANISM MAP / FOLDERS EVOLVE
  // ---------------------------------------------------------------------------
  function refreshSkills(nextEvolutionSources) {
    currentEvolutionSources = nextEvolutionSources || currentEvolutionSources || {};

    uiSkillsMap = buildEvolutionarySkillsFromSources(currentEvolutionSources);
    uiSkillsIndex = buildUISkillsIndex(uiSkillsMap);
    routeUISkills = buildRouteUISkillExpectations(
      pageExpectations,
      uiSkillsIndex
    );
    uiGenomeMeta = buildUISkillsMeta(
      uiSkillsMap,
      uiSkillsIndex,
      routeUISkills
    );

    uiSkillsChunks = iqChunker.chunkJSON(uiSkillsMap, {
      label: "ui_skills",
      band: "symbolic"
    });

    uiSkillsIndexChunks = iqChunker.chunkJSON(uiSkillsIndex, {
      label: "ui_skills",
      band: "symbolic"
    });

    routeUISkillsChunks = iqChunker.chunkJSON(routeUISkills, {
      label: "ui_skills",
      band: "symbolic"
    });

    uiTimingChunks = iqChunker.chunkJSON(uiSkillsMap.timingTokens || {}, {
      label: "ui_styles",
      band: "symbolic"
    });

    uiHooksChunks = iqChunker.chunkJSON(
      Object.fromEntries(
        Object.entries(uiSkillsMap.skills || {}).filter(
          ([, s]) => s.kind === "hook"
        )
      ),
      {
        label: "ui_hooks",
        band: "symbolic"
      }
    );

    return {
      uiSkillsMap,
      uiSkillsIndex,
      routeUISkills,
      uiGenomeMeta,
      uiSkillsChunks,
      uiSkillsIndexChunks,
      routeUISkillsChunks,
      uiTimingChunks,
      uiHooksChunks
    };
  }

  // ---------------------------------------------------------------------------
  // v20+ HELPER — PLAN UPCOMING PAGE SKILLS (FOR NEXT-PAGE CSS / PREWARM)
// ---------------------------------------------------------------------------
  function planUpcomingSkills(routeSequence = []) {
    const skills = [];
    const seen = new Set();
    const skillsByRoute = {};

    for (const route of routeSequence || []) {
      const bundle =
        routeUISkills[route] || {
          animations: [],
          styles: [],
          icons: [],
          hooks: []
        };

      skillsByRoute[route] = bundle;

      for (const kind of ["animations", "styles", "icons", "hooks"]) {
        for (const id of bundle[kind] || []) {
          const key = `${kind}:${id}`;
          if (seen.has(key)) continue;
          seen.add(key);
          skills.push({ kind, id });
        }
      }
    }

    return {
      skillsByRoute,
      flatSkills: skills
    };
  }

  // ---------------------------------------------------------------------------
  // RETURN IMMORTAL EVOLVABLE IQ MAP (v20+)
// ---------------------------------------------------------------------------
  const iqMap = {
    log,
    warn,
    logError,

    meta: {
      identity: "PulseIQMap-v20-Evolvable",
      version: VERSION_MAP || "v20-Immortal-Evolvable",
      schemaVersion: "v4"
    },

    version: VERSION_MAP,
    genome,

    topology,
    topologyChunks,

    chunkingProfiles,
    chunkingProfilesChunks,

    organs: organExpectations,
    organsChunks,
    pages: pageExpectations,
    pagesChunks,
    drift: DRIFT_METADATA,
    driftChunks,

    // ⭐ EVOLVABLE UI GENOME (CURRENT SNAPSHOT)
    uiSkillsMap,
    uiSkillsIndex,
    routeUISkills,
    uiGenomeMeta,

    uiSkillsChunks,
    uiSkillsIndexChunks,
    routeUISkillsChunks,
    uiTimingChunks,
    uiHooksChunks,

    // ⭐ COMFORT PATTERNS (security as comfort)
    comfortPatterns,
    comfortPatternChunks,
    buildComfortPlan,

    // ⭐ HELPERS — CURRENT PAGE / ROUTE SKILLS
    getRouteUISkills(route) {
      return routeUISkills[route] || {
        animations: [],
        styles: [],
        icons: [],
        hooks: []
      };
    },

    getPackSkills(packName) {
      const ids = (uiSkillsIndex.byPack[packName] || []).slice();
      const skills = uiSkillsMap.skills || {};
      return ids.map((id) => skills[id]).filter(Boolean);
    },

    getIconSkill(iconName) {
      const skills = uiSkillsMap.skills || {};
      const ids = uiSkillsIndex.byIcon[iconName] || [];
      if (!ids.length) return null;
      return skills[ids[0]] || null;
    },

    getClassSkills(className) {
      const skills = uiSkillsMap.skills || {};
      const ids = uiSkillsIndex.byClass[className] || [];
      return ids.map((id) => skills[id]).filter(Boolean);
    },

    getComfortPlanForContext(contextTag) {
      return buildComfortPlan(contextTag);
    },

    // ⭐ REQUIRED BY BRAIN
    getRecoveryRoute() {
      return "/";
    },

    routeInterpreter: (path) =>
      interpretRoute(path, genome, pageExpectations),

    chunkerMeta: iqChunker.getMeta(),
    getChunkerLaneStats: () => iqChunker.getLaneStats(),

    // ⭐ v20+ EVOLUTIONARY HELPERS
    refreshSkills,
    planUpcomingSkills
  };

  return iqMap;
}

// -----------------------------------------------------------------------------
// EXPORT — IMMORTAL EVOLVABLE IQ MAP (PROMISE FACTORY, v20+)
// You inject evolutionSources from your folder‑scanner organ.
// -----------------------------------------------------------------------------
export async function createPulseIQMap(evolutionSources) {
  return await buildPulseIQMapEvolvable(evolutionSources);
}

// optional global exposure (no throw)
try {
  if (typeof window !== "undefined") {
    window.createPulseIQMap = createPulseIQMap;
  }
  if (typeof globalThis !== "undefined") {
    globalThis.createPulseIQMap = createPulseIQMap;
  }
} catch {
  // never throw
}
