// ============================================================================
// FILE: /PULSE-UI/_EVOLUTION/PulseEvolutionaryStyles-v20.js
// PULSE OS — v20-IMMORTAL-EVOLUTIONARY
// AUTO-BUILT PAGE CSS • UI SKILLS GENOME → PAGE-SCOPED CSS EMITTER
// ============================================================================
//
// ROLE (v20 IMMORTAL):
//   The Evolutionary Styles Organ auto-builds CSS for the CURRENT + UPCOMING
//   pages using the IQ Map’s UI Skills Genome + Base Style/Animation Genomes.
//   It guarantees:
//
//     • Only CSS needed for the current page is emitted.
//     • Only CSS needed for the NEXT page is prebuilt.
//     • Base Style Genome (A0 membrane) always included once.
//     • Base Animation Genome (A0 animation membrane) always included once.
//     • Fully evolvable: new files → new skills → new CSS automatically.
//     • Zero drift, zero global CSS, zero duplication.
//
// CONTRACT:
//   • PURE FRONTEND ORGAN — no network, no timers, no eval.
//   • Deterministic CSS generation from symbolic skill definitions.
//   • Binary surfaces allowed only as metadata (never executed).
//
// SAFETY:
//   • IMMORTAL: zero side effects outside its wrapper.
//   • DOM-guarded: writes only inside <style data-pulse-style>.
//   • Evolvable: rebuilds when IQ Map refreshes its skill genome.
// ============================================================================

/*
AI_EXPERIENCE_META = {
  identity: "PulseEvolutionaryStyles",
  version: "v20-Immortal-Evolutionary",
  layer: "frontend",
  role: "page_style_engine",
  lineage: "PulseOS-v16 → v18 → v20-Immortal-Evolutionary",

  evo: {
    deterministic: true,
    driftProof: true,
    dualBandAware: true,
    symbolicPrimary: true,
    binaryAware: true,

    pageScopedCSS: true,
    autoBuildCSS: true,
    autoBuildAnimations: true,
    autoBuildHooks: true,
    autoBuildIcons: true,
    autoBuildTokens: true,

    iqMapAware: true,
    skillGenomeAware: true,
    routeAware: true,
    upcomingPageAware: true,

    domGuarded: true,
    wrapperScoped: true,
    zeroGlobalCSS: true,

    futureEvolutionReady: true
  }
}
*/
// ============================================================================
// FILE: /PULSE-UI/_EVOLUTION/PulseEvolutionaryStyles-v20.js
// PULSE OS — v20-IMMORTAL-EVOLUTIONARY
// AUTO-BUILT PAGE CSS • UI SKILLS GENOME → PAGE-SCOPED CSS EMITTER
// ============================================================================

import { PulseEvolutionaryStylesBaseGenomeV20 } 
  from "../_EVOLUTION/PulseEvolutionaryStylesBaseGenome-v20.js";

import { PulseEvolutionaryAnimationsBaseGenomeV20 } 
  from "../_EVOLUTION/PulseEvolutionaryAnimationsBaseGenome-v20.js";

import { createPulseEvolutionaryIcons } 
  from "./PulseEvolutionaryIcons-v20.js";

import { createPulseEvolutionaryAnimations } 
  from "./PulseEvolutionaryAnimations-v20.js";

// ============================================================================
// INTERNAL HELPERS
// ============================================================================
function ensureStyleTag() {
  if (typeof document === "undefined") return null;

  let tag = document.querySelector("style[data-pulse-style]");
  if (!tag) {
    tag = document.createElement("style");
    tag.setAttribute("data-pulse-style", "v20");
    document.head.appendChild(tag);
  }
  return tag;
}

function escapeCSS(str) {
  return String(str).replace(/"/g, '\\"');
}

// ============================================================================
// CSS BUILDERS
// ============================================================================
function buildHookCSS(skill) {
  const name = skill.name || skill.id;
  const selector = `[data-${skill.hookType}="${escapeCSS(name)}"]`;
  return `${selector} { ${skill.css || ""} }`;
}

function buildStyleCSS(skill) {
  return skill.css || "";
}

function buildIconCSS(skill, Icons) {
  const name = skill.name || skill.id;
  const svg = Icons.resolve(skill.iconName || name);
  const encoded = btoa(svg);

  return `
    :root {
      --icon-${escapeCSS(name)}: url("data:image/svg+xml;base64,${encoded}");
    }
  `;
}

function buildAnimationCSS(skill) {
  return skill.keyframes || "";
}

function buildTimingTokenCSS(tokens) {
  return Object.entries(tokens || {})
    .map(([k, v]) => `:root { --${escapeCSS(k)}: ${escapeCSS(v)}; }`)
    .join("\n");
}

// ============================================================================
// MAIN ORGAN FACTORY
// ============================================================================
export function createPulseEvolutionaryStyles({
  IQMap,
  Icons = null,
  Animations = null,
  log = console.log,
  warn = console.warn
} = {}) {

  if (!IQMap) {
    warn("[PulseEvolutionaryStyles-v20] Missing IQMap");
    return null;
  }

  // Create Icons Organ if not provided
  if (!Icons) {
    Icons = createPulseEvolutionaryIcons({ IQMap });
  }

  // Create Animations Organ if not provided
  if (!Animations) {
    Animations = createPulseEvolutionaryAnimations({ IQMap });
  }

  const StyleState = {
    lastRoute: null,
    lastCSS: "",
    lastUpcomingCSS: ""
  };

  function safeLog(stage, details = {}) {
    try {
      log("[PulseEvolutionaryStyles-v20]", stage, JSON.stringify(details));
    } catch {}
  }

  // -------------------------------------------------------------------------
  // BUILD CSS FOR A SINGLE ROUTE
  // -------------------------------------------------------------------------
  function buildCSSForRoute(route) {
    const bundle = IQMap.getRouteUISkills(route);

    const skills = IQMap.uiSkillsMap.skills || {};
    const tokens = IQMap.uiSkillsMap.timingTokens || {};

    const cssParts = [];

    // Base genomes
    cssParts.push(PulseEvolutionaryStylesBaseGenomeV20.css);
    cssParts.push(PulseEvolutionaryAnimationsBaseGenomeV20.css);

    // Timing tokens
    cssParts.push(buildTimingTokenCSS(tokens));

    // Hooks
    for (const id of bundle.hooks || []) {
      const skill = skills[id];
      if (skill) cssParts.push(buildHookCSS(skill));
    }

    // Styles
    for (const id of bundle.styles || []) {
      const skill = skills[id];
      if (skill) cssParts.push(buildStyleCSS(skill));
    }

    // Icons
    for (const id of bundle.icons || []) {
      const skill = skills[id];
      if (skill) cssParts.push(buildIconCSS(skill, Icons));
    }

    // Animations
    for (const id of bundle.animations || []) {
      const skill = skills[id];
      if (skill) cssParts.push(buildAnimationCSS(skill));
    }

    return cssParts.join("\n\n");
  }

  // -------------------------------------------------------------------------
  // UPCOMING PAGE CSS (prewarm)
  // -------------------------------------------------------------------------
  function buildUpcomingCSS(routeSequence = []) {
    const { flatSkills } = IQMap.planUpcomingSkills(routeSequence);
    const skills = IQMap.uiSkillsMap.skills || {};
    const tokens = IQMap.uiSkillsMap.timingTokens || {};

    const cssParts = [];

    cssParts.push(PulseEvolutionaryStylesBaseGenomeV20.css);
    cssParts.push(PulseEvolutionaryAnimationsBaseGenomeV20.css);
    cssParts.push(buildTimingTokenCSS(tokens));

    for (const { kind, id } of flatSkills) {
      const skill = skills[id];
      if (!skill) continue;

      if (kind === "hooks") cssParts.push(buildHookCSS(skill));
      if (kind === "styles") cssParts.push(buildStyleCSS(skill));
      if (kind === "icons") cssParts.push(buildIconCSS(skill, Icons));
      if (kind === "animations") cssParts.push(buildAnimationCSS(skill));
    }

    return cssParts.join("\n\n");
  }

  // -------------------------------------------------------------------------
  // APPLY CSS TO DOM
  // -------------------------------------------------------------------------
  function applyCSS(css) {
    const tag = ensureStyleTag();
    if (!tag) return;

    tag.textContent = css;
    StyleState.lastCSS = css;
  }

  // -------------------------------------------------------------------------
  // PUBLIC API
  // -------------------------------------------------------------------------
  const PulseEvolutionaryStyles = {
    identity: "PulseEvolutionaryStyles-v20",
    version: "20.0-Immortal-Evolutionary",
    StyleState,

    applyRouteStyles(route) {
      const css = buildCSSForRoute(route);
      applyCSS(css);
      StyleState.lastRoute = route;

      safeLog("APPLY_ROUTE_STYLES", { route });
      return css;
    },

    buildUpcomingStyles(routeSequence) {
      const css = buildUpcomingCSS(routeSequence);
      StyleState.lastUpcomingCSS = css;

      safeLog("BUILD_UPCOMING_STYLES", { routes: routeSequence });
      return css;
    },

    refreshFromIQMap() {
      safeLog("REFRESH_FROM_IQMAP");
      if (StyleState.lastRoute) {
        const css = buildCSSForRoute(StyleState.lastRoute);
        applyCSS(css);
      }
    }
  };

  safeLog("INIT", {
    identity: PulseEvolutionaryStyles.identity,
    version: PulseEvolutionaryStyles.version
  });

  return PulseEvolutionaryStyles;
}
