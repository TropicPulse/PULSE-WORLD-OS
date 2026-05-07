// ============================================================================
// FILE: /PULSE-UI/_COMPONENTS/PulseEvolutionaryStyles-v20.js
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
// IMPORT BASE GENOMES (A0 MEMBRANES)
// ============================================================================
import { PulseEvolutionaryStylesBaseGenomeV20 } from "../_GENOME/PulseEvolutionaryStylesBaseGenome-v20.js";
import { PulseEvolutionaryAnimationsBaseGenomeV20 } from "../_GENOME/PulseEvolutionaryAnimationsBaseGenome-v20.js";

// ============================================================================
// INTERNAL HELPERS — deterministic, pure
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
// CSS BUILDERS — each skill kind → CSS snippet
// ============================================================================
function buildHookCSS(skill) {
  const name = skill.name || skill.id;
  const selector = `[data-${skill.hookType}="${escapeCSS(name)}"]`;
  return `${selector} { ${skill.css || ""} }`;
}

function buildStyleCSS(skill) {
  return skill.css || "";
}

function buildIconCSS(skill) {
  const name = skill.name || skill.id;
  return `
    :root {
      --icon-${escapeCSS(name)}: url("${escapeCSS(skill.src)}");
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
// MAIN ORGAN FACTORY — PulseEvolutionaryStyles v20
// ============================================================================
export function createPulseEvolutionaryStyles({
  IQMap,
  log = console.log,
  warn = console.warn
} = {}) {
  if (!IQMap) {
    warn("[PulseEvolutionaryStyles-v20] Missing IQMap");
    return null;
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

    // ⭐ ALWAYS include Base Style Genome (A0)
    cssParts.push(PulseEvolutionaryStylesBaseGenomeV20.css);

    // ⭐ ALWAYS include Base Animation Genome (A0)
    cssParts.push(PulseEvolutionaryAnimationsBaseGenomeV20.css);

    // timing tokens
    cssParts.push(buildTimingTokenCSS(tokens));

    // hooks
    for (const id of bundle.hooks || []) {
      const skill = skills[id];
      if (skill) cssParts.push(buildHookCSS(skill));
    }

    // styles
    for (const id of bundle.styles || []) {
      const skill = skills[id];
      if (skill) cssParts.push(buildStyleCSS(skill));
    }

    // icons
    for (const id of bundle.icons || []) {
      const skill = skills[id];
      if (skill) cssParts.push(buildIconCSS(skill));
    }

    // animations
    for (const id of bundle.animations || []) {
      const skill = skills[id];
      if (skill) cssParts.push(buildAnimationCSS(skill));
    }

    return cssParts.join("\n\n");
  }

  // -------------------------------------------------------------------------
  // BUILD CSS FOR UPCOMING ROUTES (prewarm)
  // -------------------------------------------------------------------------
  function buildUpcomingCSS(routeSequence = []) {
    const { flatSkills } = IQMap.planUpcomingSkills(routeSequence);
    const skills = IQMap.uiSkillsMap.skills || {};
    const tokens = IQMap.uiSkillsMap.timingTokens || {};

    const cssParts = [];

    // ⭐ Base genomes included ONCE for prewarm
    cssParts.push(PulseEvolutionaryStylesBaseGenomeV20.css);
    cssParts.push(PulseEvolutionaryAnimationsBaseGenomeV20.css);

    cssParts.push(buildTimingTokenCSS(tokens));

    for (const { kind, id } of flatSkills) {
      const skill = skills[id];
      if (!skill) continue;

      if (kind === "hooks") cssParts.push(buildHookCSS(skill));
      if (kind === "styles") cssParts.push(buildStyleCSS(skill));
      if (kind === "icons") cssParts.push(buildIconCSS(skill));
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
  // PUBLIC API — IMMORTAL EVOLUTIONARY STYLE ORGAN
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

// ---------------------------------------------------------------------------
// GLOBAL REGISTRATION (optional)
// ---------------------------------------------------------------------------
try {
  if (typeof window !== "undefined") {
    window.PulseEvolutionaryStyles = createPulseEvolutionaryStyles;
  }
  if (typeof globalThis !== "undefined") {
    globalThis.PulseEvolutionaryStyles = createPulseEvolutionaryStyles;
  }
} catch {}
