// ============================================================================
// FILE: /PULSE-UI/_COMPONENTS_EVOLUTION/PulseEvolutionaryAnimations-v20.js
// PULSE OS — v20-IMMORTAL-EVOLUTIONARY
// ANIMATION ORGAN — AUTO-BUILT, ROUTE-AWARE, UPCOMING-AWARE
// ============================================================================
//
// ROLE (IMMORTAL):
//   • Builds FINAL animation CSS for Pulse OS UI
//   • Merges:
//       - Base Animation Genome (A0 membrane)
//       - Evolvable animation packs (evolutionSources.animations)
//       - Local animation packs (loader organ)
//       - IQMap animation skills
//   • Provides:
//       - Deterministic keyframe generation
//       - Timing token emission
//       - Route-aware animation bundles
//       - Upcoming-page animation prewarm
//       - Memory-v20++ integration
//       - Styles-v20 integration
//
// CONTRACT:
//   • PURE FRONTEND ORGAN — no network, no timers, no eval
//   • Deterministic CSS generation
//   • IMMORTAL: zero drift, zero mutation of input
//   • Evolvable: new animation packs appear automatically
//
// SAFETY:
//   • DOM-safe: does NOT write to DOM directly
//   • Memory-safe: no external side effects
// ============================================================================

import { PulseEvolutionaryAnimationsBaseGenomeV20 }
  from "./PulseEvolutionaryAnimationsGenome-v20.js";

// ============================================================================
// HELPERS — deterministic, pure
// ============================================================================
function buildKeyframesCSS(skill) {
  if (!skill || !skill.keyframes) return "";
  return skill.keyframes;
}

function buildTimingTokenCSS(tokens) {
  return Object.entries(tokens || {})
    .map(([k, v]) => `:root { --${k}: ${v}; }`)
    .join("\n");
}

// ============================================================================
// ORGAN FACTORY — IMMORTAL
// ============================================================================
export function createPulseEvolutionaryAnimations({
  IQMap,
  evolutionSources = {},
  localAnimationMap = {},
  log = console.log,
  warn = console.warn
} = {}) {

  if (!IQMap) {
    warn("[PulseEvolutionaryAnimations-v20] Missing IQMap");
    return null;
  }

  const AnimState = {
    lastRoute: null,
    lastCSS: "",
    lastUpcomingCSS: ""
  };

  function safeLog(stage, details = {}) {
    try {
      log("[PulseEvolutionaryAnimations-v20]", stage, JSON.stringify(details));
    } catch {}
  }

  // -------------------------------------------------------------------------
  // MERGE ANIMATION SOURCES (IMMORTAL)
  // -------------------------------------------------------------------------
  const baseAnimations = PulseEvolutionaryAnimationsBaseGenomeV20.animations || {};
  const evoAnimations = evolutionSources.animations || {};
  const localAnimations = localAnimationMap || {};

  // IMMORTAL MERGE: deterministic, left-to-right, no mutation
  const mergedAnimations = Object.freeze({
    ...baseAnimations,
    ...evoAnimations,
    ...localAnimations
  });

  // -------------------------------------------------------------------------
  // BUILD CSS FOR A SINGLE ROUTE
  // -------------------------------------------------------------------------
  function buildCSSForRoute(route) {
    const bundle = IQMap.getRouteUISkills(route);
    const skills = IQMap.uiSkillsMap.skills || {};
    const tokens = IQMap.uiSkillsMap.timingTokens || {};

    const cssParts = [];

    // Base animation genome (A0 membrane)
    cssParts.push(PulseEvolutionaryAnimationsBaseGenomeV20.css);

    // Timing tokens
    cssParts.push(buildTimingTokenCSS(tokens));

    // Route-specific animation skills
    for (const id of bundle.animations || []) {
      const skill = skills[id];
      if (skill) cssParts.push(buildKeyframesCSS(skill));
    }

    // Evolvable + local animation packs
    for (const key of Object.keys(mergedAnimations)) {
      const pack = mergedAnimations[key];
      if (pack && pack.keyframes) {
        cssParts.push(pack.keyframes);
      }
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

    cssParts.push(PulseEvolutionaryAnimationsBaseGenomeV20.css);
    cssParts.push(buildTimingTokenCSS(tokens));

    for (const { kind, id } of flatSkills) {
      if (kind !== "animations") continue;
      const skill = skills[id];
      if (skill) cssParts.push(buildKeyframesCSS(skill));
    }

    // Evolvable + local animation packs
    for (const key of Object.keys(mergedAnimations)) {
      const pack = mergedAnimations[key];
      if (pack && pack.keyframes) {
        cssParts.push(pack.keyframes);
      }
    }

    return cssParts.join("\n\n");
  }

  // -------------------------------------------------------------------------
  // PUBLIC API — IMMORTAL ANIMATION ORGAN
  // -------------------------------------------------------------------------
  const PulseEvolutionaryAnimations = {
    identity: "PulseEvolutionaryAnimations-v20",
    version: "20.0-Immortal-Evolutionary",
    AnimState,

    buildRouteAnimations(route) {
      const css = buildCSSForRoute(route);
      AnimState.lastRoute = route;
      AnimState.lastCSS = css;

      safeLog("BUILD_ROUTE_ANIMATIONS", { route });
      return css;
    },

    buildUpcomingAnimations(routeSequence) {
      const css = buildUpcomingCSS(routeSequence);
      AnimState.lastUpcomingCSS = css;

      safeLog("BUILD_UPCOMING_ANIMATIONS", { routes: routeSequence });
      return css;
    },

    refreshFromIQMap() {
      safeLog("REFRESH_FROM_IQMAP");
      if (AnimState.lastRoute) {
        const css = buildCSSForRoute(AnimState.lastRoute);
        AnimState.lastCSS = css;
      }
    }
  };

  safeLog("INIT", {
    identity: PulseEvolutionaryAnimations.identity,
    version: PulseEvolutionaryAnimations.version
  });

  return PulseEvolutionaryAnimations;
}

// ---------------------------------------------------------------------------
// GLOBAL REGISTRATION (optional)
// ---------------------------------------------------------------------------
try {
  if (typeof window !== "undefined") {
    global.PulseEvolutionaryAnimations = createPulseEvolutionaryAnimations;
  }
  if (typeof globalThis !== "undefined") {
    global.PulseEvolutionaryAnimations = createPulseEvolutionaryAnimations;
  }
} catch {}
