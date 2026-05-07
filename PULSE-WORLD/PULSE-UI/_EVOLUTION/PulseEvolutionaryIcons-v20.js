// ============================================================================
// FILE: /PULSE-UI/_EVOLUTION/PulseEvolutionaryIcons-v20.js
// PULSE OS — v20-IMMORTAL-EVOLUTIONARY
// ICON ORGAN — AUTO-BUILT, ROUTE-AWARE, UPCOMING-AWARE
// ============================================================================
//
// ROLE (v20 IMMORTAL):
//   This organ builds the FINAL icon maps used by Pulse OS UI.
//
//   It merges:
//     • Base Genome (A0 Icon Membrane)
//     • Evolvable icons from evolutionSources.icons
//     • Local loader icons (optional)
//     • Tier icons
//
//   It provides:
//     • Deterministic icon resolution
//     • Binary-friendly variants
//     • GPU glow variants
//     • Route-aware icon bundles
//     • Upcoming-page icon prewarm
//     • CSS variable generation
//     • IQMap integration
//     • Memory-v20++ integration
//
// CONTRACT:
//   • PURE FRONTEND ORGAN — no network, no filesystem, no eval.
//   • Deterministic merging of icon genomes.
//   • IMMORTAL: zero drift, zero mutation of input.
//   • Evolvable: new icons appear automatically.
//
// SAFETY:
//   • DOM-safe: does not write to DOM directly.
//   • Memory-safe: no external side effects.
// ============================================================================

import { PulseEvolutionaryIconsBaseGenomeV20, mergeIconGenomes } 
  from "../_EVOLUTION/PulseEvolutionaryIconsBaseGenome-v20.js";

// ============================================================================
// HELPERS — deterministic, pure
// ============================================================================

// Convert SVG to binary-friendly variant
function toBinaryFriendly(svg) {
  return svg
    .replace(/stroke="[^"]+"/g, `stroke="#ffffff"`)
    .replace(/fill="[^"]+"/g, `fill="none"`)
    .replace(/filter="[^"]+"/g, "");
}

// GPU glow map (optional aesthetic enhancer)
function toGlowMap(svg) {
  return svg
    .replace(/stroke-width="[^"]+"/g, `stroke-width="3"`)
    .replace(/stroke="[^"]+"/g, `stroke="#00eaff"`)
    .replace(/fill="[^"]+"/g, `fill="none"`);
}

// Encode SVG as CSS variable
function encodeSVG(svg) {
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

// ============================================================================
// ICON ORGAN FACTORY — IMMORTAL
// ============================================================================
export function createPulseEvolutionaryIcons({
  evolutionSources = {},
  localIconMap = {},
  IQMap = null,
  log = console.log,
  warn = console.warn
} = {}) {

  // Merge all icon sources deterministically
  const { baseIcons, expandedIcons, tierIcons } =
    mergeIconGenomes({ evolutionSources, localIconMap });

  // -------------------------------------------------------------------------
  // ROUTE-AWARE ICON EXTRACTION
  // -------------------------------------------------------------------------
  function getIconsForRoute(route) {
    if (!IQMap) return [];

    const bundle = IQMap.getRouteUISkills(route) || {};
    const skills = IQMap.uiSkillsMap.skills || {};

    const icons = [];

    for (const id of bundle.icons || []) {
      const skill = skills[id];
      if (skill && skill.iconName) icons.push(skill.iconName);
    }

    return icons;
  }

  // -------------------------------------------------------------------------
  // UPCOMING-PAGE ICON PREWARM
  // -------------------------------------------------------------------------
  function getIconsForUpcoming(routeSequence = []) {
    if (!IQMap) return [];

    const { flatSkills } = IQMap.planUpcomingSkills(routeSequence);
    const skills = IQMap.uiSkillsMap.skills || {};

    const icons = [];

    for (const { kind, id } of flatSkills) {
      if (kind !== "icons") continue;
      const skill = skills[id];
      if (skill && skill.iconName) icons.push(skill.iconName);
    }

    return icons;
  }

  // -------------------------------------------------------------------------
  // CSS VARIABLE GENERATION
  // -------------------------------------------------------------------------
  function buildCSSVariables() {
    const css = [];

    const all = {
      ...baseIcons,
      ...expandedIcons,
      ...tierIcons
    };

    for (const [name, svg] of Object.entries(all)) {
      css.push(`:root { --icon-${name}: url("${encodeSVG(svg)}"); }`);
    }

    return css.join("\n");
  }

  // ========================================================================
  // PUBLIC ORGAN — IMMORTAL ICON RESOLVER
  // ========================================================================
  const PulseIcons = {
    schemaVersion: "v20",

    base: baseIcons,
    expanded: expandedIcons,
    tier: tierIcons,

    // Resolve icon by name + tier + binary mode
    resolve(name, tier = null, binaryMode = false) {
      let svg =
        (tier && tierIcons[tier]) ||
        baseIcons[name] ||
        expandedIcons[name] ||
        tierIcons.immortal;

      if (binaryMode) svg = toBinaryFriendly(svg);

      return svg;
    },

    // List all icons
    list() {
      return {
        base: Object.keys(baseIcons),
        expanded: Object.keys(expandedIcons),
        tiers: Object.keys(tierIcons)
      };
    },

    // Route-aware icon bundle
    forRoute(route) {
      return getIconsForRoute(route);
    },

    // Upcoming-page icon bundle
    forUpcoming(routeSequence) {
      return getIconsForUpcoming(routeSequence);
    },

    // CSS variables for Styles-v20
    cssVariables() {
      return buildCSSVariables();
    }
  };

  // Log initialization
  try {
    log("[PulseEvolutionaryIcons-v20] INIT", {
      baseCount: Object.keys(baseIcons).length,
      expandedCount: Object.keys(expandedIcons).length,
      tierCount: Object.keys(tierIcons).length
    });
  } catch {}

  return PulseIcons;
}

// ---------------------------------------------------------------------------
// GLOBAL REGISTRATION (optional)
// ---------------------------------------------------------------------------
try {
  if (typeof window !== "undefined") window.PulseEvolutionaryIcons = createPulseEvolutionaryIcons;
  if (typeof globalThis !== "undefined") globalThis.PulseEvolutionaryIcons = createPulseEvolutionaryIcons;
} catch {}
