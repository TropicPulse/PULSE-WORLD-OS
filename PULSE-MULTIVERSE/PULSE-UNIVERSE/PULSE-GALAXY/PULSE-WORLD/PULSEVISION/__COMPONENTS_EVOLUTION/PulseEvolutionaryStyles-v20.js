// ============================================================================
// FILE: /PULSEVISION/__COMPONENTS_EVOLUTION/PulseEvolutionaryStyles-v20.js
// PULSE OS — v20-IMMORTAL-EVOLUTIONARY
// AUTO-BUILT PAGE CSS • UI SKILLS GENOME → PAGE-SCOPED CSS EMITTER
// ============================================================================
//
// ROLE (IMMORTAL):
//   • Auto-builds CSS for CURRENT + UPCOMING pages
//   • Uses IQMap UI Skills Genome
//   • Includes Base Style + Base Animation genomes exactly once
//   • Zero drift, zero duplication, zero global CSS
//   • DOM-guarded (<style data-pulse-style>)
//
// CONTRACT:
//   • PURE FRONTEND ORGAN — no network, no timers, no eval
//   • Deterministic CSS generation from symbolic skill definitions
//   • Binary surfaces allowed only as metadata
//
// SAFETY:
//   • IMMORTAL: zero side effects outside wrapper
//   • Evolvable: rebuilds when IQMap refreshes
// ============================================================================

import { createPulseEvolutionaryIcons } 
  from "./PulseEvolutionaryIcons-v20.js";

import { createPulseEvolutionaryAnimations } 
  from "./PulseEvolutionaryAnimations-v20.js";

import { PulseEvolutionaryStylesBaseGenomeV20 } 
  from "./PulseEvolutionaryStylesGenome-v20.js";

import { PulseEvolutionaryAnimationsBaseGenomeV20 } 
  from "./PulseEvolutionaryAnimationsGenome-v20.js";

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

// ---------------------------------------------------------------------------
// VERY SIMPLE CSS CASCADE MERGE ENGINE
// map → submaps → final map
// ---------------------------------------------------------------------------
function mergeCSSCascade(rawCSS) {
  if (!rawCSS || typeof rawCSS !== "string") return rawCSS;

  const globalRules = new Map(); // selector -> Map(prop -> value)
  const mediaBlocks = [];        // { query, css }

  // 1) Extract @media blocks and keep them separate
  let css = rawCSS;
  const mediaRegex = /@media\s+([^{]+)\{([\s\S]*?)\}\s*/g;
  let mediaMatch;
  while ((mediaMatch = mediaRegex.exec(rawCSS)) !== null) {
    const query = mediaMatch[1].trim();
    const body = mediaMatch[2].trim();
    mediaBlocks.push({ query, body });
  }
  css = rawCSS.replace(mediaRegex, "");

  // 2) Parse global (non-media) rules
  parseAndMergeRules(css, globalRules);

  // 3) Parse and merge rules inside each media block
  const mergedMediaBlocks = mediaBlocks.map(({ query, body }) => {
    const mediaRules = new Map();
    parseAndMergeRules(body, mediaRules);
    const mediaCSS = emitMergedRules(mediaRules);
    return mediaCSS ? `@media ${query} {\n${mediaCSS}\n}` : "";
  }).filter(Boolean);

  // 4) Emit final CSS: global + media
  const globalCSS = emitMergedRules(globalRules);
  return [globalCSS, ...mergedMediaBlocks].filter(Boolean).join("\n\n");
}

function parseAndMergeRules(css, rulesMap) {
  if (!css) return;

  // naive rule splitter: selector { ... }
  const ruleRegex = /([^{]+)\{([^}]*)\}/g;
  let match;
  while ((match = ruleRegex.exec(css)) !== null) {
    const selector = match[1].trim();
    const body = match[2].trim();
    if (!selector || !body) continue;

    // ensure selector map exists
    let propMap = rulesMap.get(selector);
    if (!propMap) {
      propMap = new Map();
      rulesMap.set(selector, propMap);
    }

    // split declarations: prop: value;
    const lines = body.split(";");
    for (let line of lines) {
      line = line.trim();
      if (!line) continue;
      const colonIdx = line.indexOf(":");
      if (colonIdx === -1) continue;

      const prop = line.slice(0, colonIdx).trim();
      const value = line.slice(colonIdx + 1).trim();
      if (!prop || !value) continue;

      // last one wins
      propMap.set(prop, value);
    }
  }
}

function emitMergedRules(rulesMap) {
  const chunks = [];
  for (const [selector, propMap] of rulesMap.entries()) {
    if (!propMap || propMap.size === 0) continue;
    const decls = [];
    for (const [prop, value] of propMap.entries()) {
      decls.push(`${prop}: ${value};`);
    }
    if (decls.length === 0) continue;
    chunks.push(`${selector} { ${decls.join(" ")} }`);
  }
  return chunks.join("\n");
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

    // Base genomes (always once)
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

    const rawCSS = cssParts.join("\n\n");
    const mergedCSS = mergeCSSCascade(rawCSS);
    return mergedCSS;
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

    const rawCSS = cssParts.join("\n\n");
    const mergedCSS = mergeCSSCascade(rawCSS);
    return mergedCSS;
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
