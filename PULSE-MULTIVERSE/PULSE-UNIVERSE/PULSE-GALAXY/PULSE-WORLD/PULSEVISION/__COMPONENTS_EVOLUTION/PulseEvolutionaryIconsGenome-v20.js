
// ============================================================================
// FILE: /PULSEVISION/_GENOME/PulseEvolutionaryIconsGenome-v20.js
// PULSE OS — v20++ IMMORTAL EVOLUTIONARY
// UNIVERSAL ICON GENOME (A0 ICON MEMBRANE)
// ============================================================================
//
// ROLE (IMMORTAL):
//   • Foundational icon genome for Pulse OS UI
//   • Provides universal icon membrane (A0)
//   • Deterministic, drift-proof, evolvable
//   • Auto-integrated with:
//       - Icons Organ (v20 IMMORTAL)
//       - Styles Organ (v20 IMMORTAL)
//       - Animations Organ (v20 IMMORTAL)
//       - IQMap UI Skills Genome
//       - Memory-v20++
//       - Router-v20
//
// CONTRACT:
//   • STATIC but EVOLVABLE
//   • Never mutated at runtime
//   • Always included exactly once
//   • Page-specific icon skills may extend/override
//
// SAFETY:
//   • IMMORTAL: deterministic, pure, zero side effects
//   • Zero network, zero filesystem, zero randomness
//   • Zero dynamic imports, zero eval
// ============================================================================


// ICON SCHEMA VERSION
const ICON_SCHEMA_VERSION = "v20++";

// These objects will be populated dynamically:
let baseIcons = {};       // your built-in icons
let expandedIcons = {};   // icons from evolutionSources
let tierIcons = {};       // tier-based icons (immortal, critical, etc.)


// ============================================================================
// GENOME MERGER — IMMORTAL, PURE, DETERMINISTIC
// v20++ icon genome merging logic
// ============================================================================
//
// This function merges:
//   • Base Genome icons (A0 membrane)
//   • Tier icons (immortal, critical, system)
//   • Evolvable icons from evolutionSources.icons
//   • Local loader icons (from /PULSEVISION/_ICONS/)
//
// It produces the final icon maps consumed by the Icons Organ.
//
// IMMORTAL RULES:
//   • No mutation of input
//   • No randomness
//   • No side effects
//   • No network or filesystem
//   • Deterministic merge order
// ============================================================================

export const PulseEvolutionaryIconsBaseGenomeV20 = Object.freeze({

  schemaVersion: "v20++",
  identity: "PulseEvolutionaryIconsBaseGenome",
  version: "20.0-Immortal-Evolutionary",
  layer: "pulse_ui",
  role: "icon_genome_a0",

  evo: Object.freeze({
    deterministic: true,
    driftProof: true,
    schemaVersioned: true,
    iconGenome: true,
    binaryAware: true,
    glowAware: true,
    tierAware: true,
    evolvable: true,
    futureEvolutionReady: true,

    zeroNetwork: true,
    zeroFilesystem: true,
    zeroMutationOfInput: true,
    zeroDynamicImports: true,
    zeroEval: true,
    zeroRandomness: true
  }),

  // -------------------------------------------------------------------------
  // BASE ICONS (A0 MEMBRANE)
  // -------------------------------------------------------------------------
  icons: Object.freeze({
    pulse: `
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M3 12h4l2-6 4 12 2-6h6"
              stroke="#00eaff"
              stroke-width="2"
              stroke-linecap="round"
              filter="drop-shadow(0 0 6px rgba(0,255,255,0.45))" />
      </svg>
    `,

    check: `
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M5 13l4 4L19 7"
              stroke="#00ff99"
              stroke-width="2"
              stroke-linecap="round"
              filter="drop-shadow(0 0 6px rgba(0,255,150,0.45))" />
      </svg>
    `,

    alert: `
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
              stroke="#ff4d4d"
              stroke-width="2"
              stroke-linecap="round"
              filter="drop-shadow(0 0 6px rgba(255,60,60,0.45))" />
      </svg>
    `,

    info: `
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10"
                stroke="#00eaff"
                stroke-width="2"
                filter="drop-shadow(0 0 6px rgba(0,255,255,0.45))" />
        <path d="M12 16v-4m0-4h.01"
              stroke="#00eaff"
              stroke-width="2"
              stroke-linecap="round" />
      </svg>
    `,

    stable: `
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10"
                stroke="#00ff99"
                stroke-width="2"
                filter="drop-shadow(0 0 6px rgba(0,255,150,0.45))" />
        <path d="M8 12l3 3 5-5"
              stroke="#00ff99"
              stroke-width="2"
              stroke-linecap="round" />
      </svg>
    `
  }),

  // -------------------------------------------------------------------------
  // TIER ICONS (IMMORTAL, CRITICAL, SYSTEM)
  // -------------------------------------------------------------------------
  tiers: Object.freeze({
    immortal: `
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="8"
                stroke="#ffd700"
                stroke-width="2"
                filter="drop-shadow(0 0 8px rgba(255,215,0,0.55))" />
      </svg>
    `,

    critical: `
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="8"
                stroke="#ff4d4d"
                stroke-width="2"
                filter="drop-shadow(0 0 6px rgba(255,60,60,0.45))" />
      </svg>
    `,

    system: `
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="8"
                stroke="#4da3ff"
                stroke-width="2"
                filter="drop-shadow(0 0 6px rgba(80,160,255,0.45))" />
      </svg>
    `
  })
});

// ============================================================================
// IMMORTAL MERGER — PURE, DETERMINISTIC
// ============================================================================
export function mergeIconGenomes({
  evolutionSources = {},
  localIconMap = {},
  baseGenome = PulseEvolutionaryIconsBaseGenomeV20
} = {}) {

  const baseIcons = Object.freeze({ ...baseGenome.icons });
  const baseTiers = Object.freeze({ ...baseGenome.tiers });

  const evoIcons = Object.freeze({ ...(evolutionSources.icons || {}) });
  const evoTiers = Object.freeze({ ...(evolutionSources.iconTiers || {}) });

  const localIcons = Object.freeze({ ...(localIconMap || {}) });

  // IMMORTAL MERGE ORDER:
  // 1. Base Genome (cannot be overridden)
  // 2. Evolvable icons
  // 3. Local loader icons (highest priority)
  const expandedIcons = Object.freeze({
    ...evoIcons,
    ...localIcons
  });

  const tierIcons = Object.freeze({
    ...baseTiers,
    ...evoTiers
  });

  return {
    baseIcons,
    expandedIcons,
    tierIcons
  };
}


// ---------------------------------------------------------------------------
// AUTO-LOAD ICONS FROM evolutionSources (injected by IQMap)
// ---------------------------------------------------------------------------
export function buildEvolutionaryIcons(evolutionSources = {}) {
  const icons = evolutionSources.icons || {};

  // Merge into expandedIcons
  for (const [name, svg] of Object.entries(icons)) {
    expandedIcons[name] = svg;
  }

  return expandedIcons;
}

// ---------------------------------------------------------------------------
// AUTO-LOAD ICONS FROM LOCAL FOLDER (optional loader organ)
// ---------------------------------------------------------------------------
//
// If you have a loader organ that scans /PULSEVISION/_ICONS/ and injects
// evolutionSources.icons, this function will pick them up automatically.
//
// ---------------------------------------------------------------------------
export function loadLocalIcons(localIconMap = {}) {
  for (const [name, svg] of Object.entries(localIconMap)) {
    expandedIcons[name] = svg;
  }
}

// ---------------------------------------------------------------------------
// ROUTE-AWARE + UPCOMING-PAGE AWARE ICON PREWARM
// ---------------------------------------------------------------------------
//
// IQMap.getRouteUISkills(route) returns:
//   { icons: ["vault", "mascot", ...], ... }
//
// IQMap.planUpcomingSkills([route]) returns:
//   { flatSkills: [{kind:"icons", id:"vault"}, ...] }
//
// This function extracts the icons needed for:
//   • current page
//   • next page
//
// ---------------------------------------------------------------------------
export function getIconsForRoute(IQMap, route) {
  const bundle = IQMap.getRouteUISkills(route) || {};
  const skills = IQMap.uiSkillsMap.skills || {};

  const icons = [];

  for (const id of bundle.icons || []) {
    const skill = skills[id];
    if (skill && skill.iconName) icons.push(skill.iconName);
  }

  return icons;
}

export function getIconsForUpcoming(IQMap, routeSequence = []) {
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

// ---------------------------------------------------------------------------
// AUTO-GENERATE CSS VARIABLES FOR ICONS
// ---------------------------------------------------------------------------
//
// This allows Styles-v20 to emit:
//
//   :root { --icon-vault: url("data:image/svg+xml;base64,..."); }
//
// ---------------------------------------------------------------------------
export function buildIconCSSVariables() {
  const css = [];

  const all = {
    ...baseIcons,
    ...expandedIcons,
    ...tierIcons
  };

  for (const [name, svg] of Object.entries(all)) {
    const encoded = btoa(svg);
    css.push(`:root { --icon-${name}: url("data:image/svg+xml;base64,${encoded}"); }`);
  }

  return css.join("\n");
}

// ---------------------------------------------------------------------------
// GPU-FRIENDLY GLOW MAP (optional)
// ---------------------------------------------------------------------------
//
// This produces a neon glow version of the icon by thickening strokes.
// ---------------------------------------------------------------------------
export function buildGlowMap(svg) {
  return svg
    .replace(/stroke-width="[^"]+"/g, `stroke-width="3"`)
    .replace(/stroke="[^"]+"/g, `stroke="#00eaff"`)
    .replace(/fill="[^"]+"/g, `fill="none"`);
}

// ============================================================================
// GPU‑FRIENDLY GLOW + STROKE MAPS (v16.5 IMMORTAL)
// ============================================================================
const glow = Object.freeze({
  cyan:    "drop-shadow(0 0 6px rgba(0,255,255,0.45))",
  green:   "drop-shadow(0 0 6px rgba(0,255,150,0.45))",
  red:     "drop-shadow(0 0 6px rgba(255,60,60,0.45))",
  gold:    "drop-shadow(0 0 8px rgba(255,215,0,0.55))",
  purple:  "drop-shadow(0 0 8px rgba(180,0,255,0.55))",
  white:   "drop-shadow(0 0 6px rgba(255,255,255,0.45))",
  blue:    "drop-shadow(0 0 6px rgba(80,160,255,0.45))",
  orange:  "drop-shadow(0 0 6px rgba(255,150,0,0.45))",
  yellow:  "drop-shadow(0 0 6px rgba(255,255,0,0.45))"
});

const stroke = Object.freeze({
  cyan:    "#00eaff",
  green:   "#00ff99",
  red:     "#ff4d4d",
  gold:    "#ffd700",
  purple:  "#b300ff",
  white:   "#ffffff",
  black:   "#000000",
  blue:    "#4da3ff",
  orange:  "#ff9900",
  yellow:  "#ffff66"
});

// ============================================================================
// BASE ICONS — core Pulse icons
// ============================================================================
baseIcons = Object.freeze({
  pulse: `
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M3 12h4l2-6 4 12 2-6h6"
            stroke="${stroke.cyan}"
            stroke-width="2"
            stroke-linecap="round"
            filter="${glow.cyan}" />
    </svg>
  `,

  check: `
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M5 13l4 4L19 7"
            stroke="${stroke.green}"
            stroke-width="2"
            stroke-linecap="round"
            filter="${glow.green}" />
    </svg>
  `,

  alert: `
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
            stroke="${stroke.red}"
            stroke-width="2"
            stroke-linecap="round"
            filter="${glow.red}" />
    </svg>
  `,

  info: `
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10"
              stroke="${stroke.cyan}"
              stroke-width="2"
              filter="${glow.cyan}" />
      <path d="M12 16v-4m0-4h.01"
            stroke="${stroke.cyan}"
            stroke-width="2"
            stroke-linecap="round" />
    </svg>
  `,

  stable: `
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10"
              stroke="${stroke.green}"
              stroke-width="2"
              filter="${glow.green}" />
      <path d="M8 12l3 3 5-5"
            stroke="${stroke.green}"
            stroke-width="2"
            stroke-linecap="round" />
    </svg>
  `
});

// ============================================================================
// EXPANDED ICON PACK — UI, system, PulseWorld, Tropic, Tech, Earn, etc.
// ============================================================================
expandedIcons = Object.freeze({

  // UI / SYSTEM --------------------------------------------------------------
  plus: `
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M12 5v14M5 12h14"
            stroke="${stroke.white}"
            stroke-width="2"
            filter="${glow.purple}" />
    </svg>
  `,

  edit: `
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M12 20h9M16.5 3.5l4 4L7 21H3v-4L16.5 3.5z"
            stroke="${stroke.gold}"
            stroke-width="2"
            filter="${glow.gold}" />
    </svg>
  `,

  close: `
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M6 6l12 12M6 18L18 6"
            stroke="${stroke.red}"
            stroke-width="2"
            filter="${glow.red}" />
    </svg>
  `,

  menu: `
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M4 6h16M4 12h16M4 18h16"
            stroke="${stroke.white}"
            stroke-width="2"
            filter="${glow.cyan}" />
    </svg>
  `,

  warning: `
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M12 9v4m0 4h.01M3 19h18L12 3 3 19z"
            stroke="${stroke.yellow}"
            stroke-width="2"
            filter="${glow.yellow}" />
    </svg>
  `,

  danger: `
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10"
              stroke="${stroke.red}"
              stroke-width="2"
              filter="${glow.red}" />
      <path d="M12 7v6m0 4h.01"
            stroke="${stroke.red}"
            stroke-width="2" />
    </svg>
  `,

  // NODEADMIN / SYSTEM ROLES -------------------------------------------------
  nodeadmin: `
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4"
              stroke="${stroke.blue}"
              stroke-width="2"
              filter="${glow.blue}" />
      <path d="M4 20c1-4 4-6 8-6s7 2 8 6"
            stroke="${stroke.blue}"
            stroke-width="2"
            stroke-linecap="round" />
    </svg>
  `,

  reproduction: `
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="9" cy="12" r="4"
              stroke="${stroke.green}"
              stroke-width="2"
              filter="${glow.green}" />
      <circle cx="15" cy="12" r="4"
              stroke="${stroke.green}"
              stroke-width="2"
              filter="${glow.green}" />
    </svg>
  `,

  server: `
    <svg viewBox="0 0 24 24" fill="none">
      <rect x="4" y="4" width="16" height="6"
            stroke="${stroke.yellow}"
            stroke-width="2"
            filter="${glow.yellow}" />
      <rect x="4" y="14" width="16" height="6"
            stroke="${stroke.yellow}"
            stroke-width="2"
            filter="${glow.yellow}" />
    </svg>
  `,

  castle: `
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M4 10V6l2-1 2 1v4h8V6l2-1 2 1v4l-2 10H6L4 10z"
            stroke="${stroke.orange}"
            stroke-width="2"
            filter="${glow.orange}" />
    </svg>
  `,

  expansion: `
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M12 2v20M2 12h20"
            stroke="${stroke.red}"
            stroke-width="2"
            filter="${glow.red}" />
    </svg>
  `,

  energy: `
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"
            stroke="${stroke.gold}"
            stroke-width="2"
            filter="${glow.gold}" />
    </svg>
  `,

  harmonics: `
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M3 12c4-8 14-8 18 0-4 8-14 8-18 0z"
            stroke="${stroke.purple}"
            stroke-width="2"
            filter="${glow.purple}" />
    </svg>
  `,

  presence: `
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="6"
              stroke="${stroke.cyan}"
              stroke-width="2"
              filter="${glow.cyan}" />
      <circle cx="12" cy="12" r="10"
              stroke="${stroke.white}"
              stroke-width="1"
              filter="${glow.white}" />
    </svg>
  `,

  user: `
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4"
              stroke="${stroke.white}"
              stroke-width="2"
              filter="${glow.white}" />
      <path d="M4 20c1-4 4-6 8-6s7 2 8 6"
            stroke="${stroke.white}"
            stroke-width="2"
            stroke-linecap="round" />
    </svg>
  `,

  home: `
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M3 12l9-8 9 8v8H3v-8z"
            stroke="${stroke.cyan}"
            stroke-width="2"
            filter="${glow.cyan}" />
    </svg>
  `,

  town: `
    <svg viewBox="0 0 24 24" fill="none">
      <rect x="3" y="10" width="6" height="10"
            stroke="${stroke.white}"
            stroke-width="2"
            filter="${glow.white}" />
      <rect x="10" y="6" width="6" height="14"
            stroke="${stroke.white}"
            stroke-width="2"
            filter="${glow.white}" />
      <rect x="17" y="12" width="4" height="8"
            stroke="${stroke.white}"
            stroke-width="2"
            filter="${glow.white}" />
    </svg>
  `,

  // TROPIC BELIZE ------------------------------------------------------------
  palm: `
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M12 22v-8M8 8c2-3 6-3 8 0M6 6c2-2 6-2 8 0M10 7c-2-2-4-2-6-1"
            stroke="${stroke.green}"
            stroke-width="2"
            stroke-linecap="round"
            filter="${glow.green}" />
    </svg>
  `,

  beach_wave: `
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M3 16c2-2 4-2 6 0s4 2 6 0 4-2 6 0"
            stroke="${stroke.cyan}"
            stroke-width="2"
            stroke-linecap="round"
            filter="${glow.cyan}" />
      <path d="M3 20h18"
            stroke="${stroke.white}"
            stroke-width="1"
            stroke-linecap="round" />
    </svg>
  `,

  coconut: `
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="13" r="6"
              stroke="${stroke.brown || '#8b4513'}"
              stroke-width="2" />
      <circle cx="10" cy="11" r="1"
              stroke="${stroke.white}"
              stroke-width="1" />
      <circle cx="13" cy="10" r="1"
              stroke="${stroke.white}"
              stroke-width="1" />
    </svg>
  `,

  reef_coral: `
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M6 20c0-4 2-6 4-8M10 20c0-3 1-5 3-7M14 20c0-2 1-4 3-5"
            stroke="${stroke.orange}"
            stroke-width="2"
            stroke-linecap="round"
            filter="${glow.orange}" />
    </svg>
  `,

  conch_shell: `
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M4 16c4-6 8-8 16-8-2 6-6 10-12 12-2-1-3-2-4-4z"
            stroke="${stroke.gold}"
            stroke-width="2"
            filter="${glow.gold}" />
    </svg>
  `,

  hammock: `
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M4 8v4m16-4v4"
            stroke="${stroke.white}"
            stroke-width="2"
            stroke-linecap="round" />
      <path d="M4 12c4 4 12 4 16 0"
            stroke="${stroke.green}"
            stroke-width="2"
            stroke-linecap="round"
            filter="${glow.green}" />
    </svg>
  `,

  tropical_drink: `
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M7 4h10l-2 6H9L7 4z"
            stroke="${stroke.cyan}"
            stroke-width="2"
            filter="${glow.cyan}" />
      <path d="M10 10v6c0 2 1 3 2 3s2-1 2-3v-6"
            stroke="${stroke.white}"
            stroke-width="2" />
      <path d="M14 4l3-2"
            stroke="${stroke.yellow}"
            stroke-width="2"
            stroke-linecap="round"
            filter="${glow.yellow}" />
    </svg>
  `,

  mayan_temple: `
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M10 4h4v2h2v3h2v3h2v6H4v-6h2v-3h2V6h2V4z"
            stroke="${stroke.orange}"
            stroke-width="2"
            filter="${glow.orange}" />
    </svg>
  `,

  island_pin: `
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="9" r="3"
              stroke="${stroke.cyan}"
              stroke-width="2"
              filter="${glow.cyan}" />
      <path d="M12 12v7"
            stroke="${stroke.green}"
            stroke-width="2"
            stroke-linecap="round"
            filter="${glow.green}" />
      <path d="M6 20c2-2 4-2 6-2s4 0 6 2"
            stroke="${stroke.white}"
            stroke-width="1" />
    </svg>
  `,

  // WILDLIFE -----------------------------------------------------------------
  toucan: `
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M6 8c2-3 6-3 8 0v8H8c-2 0-3-2-3-4 0-2 1-4 1-4z"
            stroke="${stroke.white}"
            stroke-width="2"
            filter="${glow.white}" />
      <path d="M14 8c3-2 5-2 7 0-2 2-4 2-7 0z"
            stroke="${stroke.yellow}"
            stroke-width="2"
            filter="${glow.yellow}" />
    </svg>
  `,

  jaguar: `
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M6 8l3-3h6l3 3v6l-3 4H9l-3-4V8z"
            stroke="${stroke.gold}"
            stroke-width="2"
            filter="${glow.gold}" />
      <circle cx="10" cy="11" r="1" fill="${stroke.black}" />
      <circle cx="14" cy="11" r="1" fill="${stroke.black}" />
    </svg>
  `,

  sea_turtle: `
    <svg viewBox="0 0 24 24" fill="none">
      <ellipse cx="12" cy="12" rx="4" ry="5"
               stroke="${stroke.green}"
               stroke-width="2"
               filter="${glow.green}" />
      <path d="M12 7V4M12 20v-3M8 12H5M19 12h-3"
            stroke="${stroke.green}"
            stroke-width="2"
            stroke-linecap="round" />
    </svg>
  `,

  stingray: `
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M4 10c4-4 12-4 16 0-4 4-12 4-16 0z"
            stroke="${stroke.cyan}"
            stroke-width="2"
            filter="${glow.cyan}" />
      <path d="M12 14c0 4 1 6 3 8"
            stroke="${stroke.white}"
            stroke-width="1"
            stroke-linecap="round" />
    </svg>
  `,

  dolphin: `
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M4 14c2-4 6-6 10-6 2 0 4 1 6 2-2 1-3 2-4 4-2 0-4 0-6 2-1-1-3-2-6-2z"
            stroke="${stroke.blue}"
            stroke-width="2"
            filter="${glow.blue}" />
    </svg>
  `,

  // WEATHER ------------------------------------------------------------------
  sun: `
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="4"
              stroke="${stroke.yellow}"
              stroke-width="2"
              filter="${glow.yellow}" />
      <path d="M12 3v2M12 19v2M5 12h2M17 12h2M6 6l1.5 1.5M16.5 16.5L18 18M6 18l1.5-1.5M16.5 7.5L18 6"
            stroke="${stroke.yellow}"
            stroke-width="1.5" />
    </svg>
  `,

  partly_cloudy: `
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="9" cy="9" r="3"
              stroke="${stroke.yellow}"
              stroke-width="2"
              filter="${glow.yellow}" />
      <path d="M7 16h8a3 3 0 000-6 4 4 0 00-7.8 1"
            stroke="${stroke.white}"
            stroke-width="2"
            stroke-linecap="round" />
    </svg>
  `,

  rain: `
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M6 14h10a3 3 0 000-6 4 4 0 00-7.8 1"
            stroke="${stroke.white}"
            stroke-width="2"
            stroke-linecap="round" />
      <path d="M8 16l-1 3M12 16l-1 3M16 16l-1 3"
            stroke="${stroke.cyan}"
            stroke-width="2"
            stroke-linecap="round"
            filter="${glow.cyan}" />
    </svg>
  `,

  storm: `
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M6 13h10a3 3 0 000-6 4 4 0 00-7.8 1"
            stroke="${stroke.white}"
            stroke-width="2"
            stroke-linecap="round" />
      <path d="M11 14l-2 4h3l-2 4"
            stroke="${stroke.yellow}"
            stroke-width="2"
            stroke-linecap="round"
            filter="${glow.yellow}" />
    </svg>
  `,

  hurricane_spiral: `
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M12 4c-4 0-7 3-7 7 0 3 2 5 5 5 3 0 5-2 5-5 0-3-2-5-5-5"
            stroke="${stroke.cyan}"
            stroke-width="2"
            filter="${glow.cyan}" />
    </svg>
  `,

  // TECH / OS ----------------------------------------------------------------
  cpu: `
    <svg viewBox="0 0 24 24" fill="none">
      <rect x="7" y="7" width="10" height="10"
            stroke="${stroke.white}"
            stroke-width="2"
            filter="${glow.white}" />
      <rect x="10" y="10" width="4" height="4"
            stroke="${stroke.cyan}"
            stroke-width="2"
            filter="${glow.cyan}" />
      <path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3"
            stroke="${stroke.white}"
            stroke-width="1.5" />
    </svg>
  `,

  gpu: `
    <svg viewBox="0 0 24 24" fill="none">
      <rect x="4" y="6" width="16" height="12"
            stroke="${stroke.green}"
            stroke-width="2"
            filter="${glow.green}" />
      <circle cx="12" cy="12" r="3"
              stroke="${stroke.green}"
              stroke-width="2" />
      <path d="M4 9h-2M4 15h-2M22 9h-2M22 15h-2"
            stroke="${stroke.white}"
            stroke-width="1.5" />
    </svg>
  `,

  ai_brain: `
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M9 5a3 3 0 00-3 3v2a3 3 0 003 3v2a3 3 0 003 3"
            stroke="${stroke.purple}"
            stroke-width="2"
            filter="${glow.purple}" />
      <path d="M15 5a3 3 0 013 3v2a3 3 0 01-3 3v2a3 3 0 01-3 3"
            stroke="${stroke.cyan}"
            stroke-width="2"
            filter="${glow.cyan}" />
    </svg>
  `,

  binary_matrix: `
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M6 6h3v3H6zM11 6h3v3h-3zM16 6h3v3h-3zM6 11h3v3H6zM11 11h3v3h-3zM16 11h3v3h-3zM6 16h3v3H6zM11 16h3v3h-3zM16 16h3v3h-3z"
            stroke="${stroke.white}"
            stroke-width="1.2"
            filter="${glow.white}" />
    </svg>
  `,

  diagnostics_pulse: `
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M3 12h4l2-4 3 8 2-4h7"
            stroke="${stroke.cyan}"
            stroke-width="2"
            stroke-linecap="round"
            filter="${glow.cyan}" />
    </svg>
  `,

  router_node: `
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="3"
              stroke="${stroke.blue}"
              stroke-width="2"
              filter="${glow.blue}" />
      <path d="M12 5v2M12 17v2M5 12h2M17 12h2M7 7l1.5 1.5M15.5 15.5L17 17M7 17l1.5-1.5M15.5 8.5L17 7"
            stroke="${stroke.white}"
            stroke-width="1.5" />
    </svg>
  `,

  // EARN / ECONOMY -----------------------------------------------------------
  coin: `
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="6"
              stroke="${stroke.gold}"
              stroke-width="2"
              filter="${glow.gold}" />
      <path d="M10 10h4v4h-4z"
            stroke="${stroke.gold}"
            stroke-width="1.5" />
    </svg>
  `,

  wallet: `
    <svg viewBox="0 0 24 24" fill="none">
      <rect x="4" y="7" width="16" height="10" rx="2"
            stroke="${stroke.orange}"
            stroke-width="2"
            filter="${glow.orange}" />
      <circle cx="16" cy="12" r="1"
              stroke="${stroke.white}"
              stroke-width="1" />
    </svg>
  `,

  trending_up: `
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M4 16l5-5 4 4 7-9"
            stroke="${stroke.green}"
            stroke-width="2"
            stroke-linecap="round"
            filter="${glow.green}" />
      <path d="M15 7h5v5"
            stroke="${stroke.green}"
            stroke-width="2"
            stroke-linecap="round" />
    </svg>
  `,

  trending_down: `
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M4 8l5 5 4-4 7 9"
            stroke="${stroke.red}"
            stroke-width="2"
            stroke-linecap="round"
            filter="${glow.red}" />
      <path d="M15 17h5v-5"
            stroke="${stroke.red}"
            stroke-width="2"
            stroke-linecap="round" />
    </svg>
  `,

  badge: `
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="9" r="4"
              stroke="${stroke.gold}"
              stroke-width="2"
              filter="${glow.gold}" />
      <path d="M8 13l-2 7 6-3 6 3-2-7"
            stroke="${stroke.gold}"
            stroke-width="2" />
    </svg>
  `,

  // NAVIGATION ---------------------------------------------------------------
  search: `
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="4"
              stroke="${stroke.white}"
              stroke-width="2"
              filter="${glow.white}" />
      <path d="M15 15l4 4"
            stroke="${stroke.cyan}"
            stroke-width="2"
            stroke-linecap="round"
            filter="${glow.cyan}" />
    </svg>
  `,

  map_pin: `
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M12 4a5 5 0 015 5c0 3-5 9-5 9s-5-6-5-9a5 5 0 015-5z"
            stroke="${stroke.cyan}"
            stroke-width="2"
            filter="${glow.cyan}" />
      <circle cx="12" cy="9" r="1.5"
              stroke="${stroke.white}"
              stroke-width="1" />
    </svg>
  `,

  compass: `
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8"
              stroke="${stroke.white}"
              stroke-width="2"
              filter="${glow.white}" />
      <path d="M10 14l2-6 2 6-2 2-2-2z"
            stroke="${stroke.cyan}"
            stroke-width="1.5"
            filter="${glow.cyan}" />
    </svg>
  `,

  // BRAND / AESTHETIC --------------------------------------------------------
  neon_ring: `
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="7"
              stroke="${stroke.cyan}"
              stroke-width="2"
              filter="${glow.cyan}" />
      <circle cx="12" cy="12" r="10"
              stroke="${stroke.purple}"
              stroke-width="1"
              filter="${glow.purple}" />
    </svg>
  `,

  glow_orb: `
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="5"
              stroke="${stroke.gold}"
              stroke-width="2"
              filter="${glow.gold}" />
      <circle cx="12" cy="12" r="2"
              stroke="${stroke.white}"
              stroke-width="1"
              filter="${glow.white}" />
    </svg>
  `,

  pulse_wave: `
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M3 12h4l2-4 3 8 2-4h7"
            stroke="${stroke.cyan}"
            stroke-width="2"
            stroke-linecap="round"
            filter="${glow.cyan}" />
    </svg>
  `
});

// ============================================================================
// TIERED ICONS — Bronze / Silver / Gold / Platinum / Immortal / Ultra / Omega
// ============================================================================
tierIcons = Object.freeze({
  bronze:   `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#cd7f32" /></svg>`,
  silver:   `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#c0c0c0" /></svg>`,
  gold:     `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#ffd700" filter="${glow.gold}" /></svg>`,
  platinum: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#e5e4e2" filter="${glow.cyan}" /></svg>`,
  immortal: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#b300ff" filter="${glow.purple}" /></svg>`,
  ultra:    `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#00eaff" filter="${glow.white}" /></svg>`,
  omega:    `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#000000" stroke="#ffffff" stroke-width="2" filter="${glow.white}" /></svg>`
});

// ============================================================================
// BINARY‑FRIENDLY MODE — low entropy, monochrome, GPU‑friendly
// ============================================================================
function toBinaryFriendly(svg) {
  return svg
    .replace(/stroke="[^"]+"/g, `stroke="${stroke.white}"`)
    .replace(/fill="[^"]+"/g, `fill="none"`)
    .replace(/filter="[^"]+"/g, "");
}

