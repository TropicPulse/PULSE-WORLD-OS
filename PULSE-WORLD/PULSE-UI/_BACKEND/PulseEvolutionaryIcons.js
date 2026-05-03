/*
===============================================================================
FILE: /PULSE-UI/PulseEvolutionaryIcons.js
LAYER: UNIVERSAL ICON ORGAN
===============================================================================
===============================================================================
AI_EXPERIENCE_META = {
  identity: "PulseUI.EvolutionaryIcons",
  version: "v15-IMMORTAL",
  layer: "pulse_ui",
  role: "universal_icon_organ",
  lineage: "PulseEvolutionaryIcons-v11 → v14-IMMORTAL → v15-IMMORTAL",

  evo: {
    iconOrgan: true,
    gpuFriendly: true,
    neonNative: true,
    dualBand: true,
    binaryAware: true,
    symbolicAware: true,
    tierAware: true,
    routeAware: true,
    lineageAware: true,
    unifiedAdvantageField: true,
    futureEvolutionReady: true,

    deterministic: true,
    driftProof: true,
    pureCompute: true,
    zeroMutationOfInput: true,
    zeroNetwork: true,
    zeroFilesystem: true,

    // v15 upgrades
    schemaVersioned: true,
    envelopeAware: true,
    binaryFriendlyMode: true,
    lowEntropySVG: true
  },

  contract: {
    always: [
      "PulseUI.EvolutionaryBinary",
      "PulseUI.EvolutionaryCode",
      "PulseUI.EvolutionaryBrain",
      "PulseDesign.Manifest"
    ],
    never: [
      "eval",
      "Function",
      "dynamicImport",
      "fetchViaCNS",
      "safeRoute"
    ]
  }
}
===============================================================================
EXPORT_META = {
  organ: "PulseUI.EvolutionaryIcons",
  layer: "pulse_ui",
  stability: "IMMORTAL",
  deterministic: true,
  pure: true,

  consumes: ["IconName", "Tier", "BinaryMode"],
  produces: ["SVGString", "BinaryFriendlySVG", "TieredIcon"],

  sideEffects: "none",
  network: "none",
  filesystem: "none"
}

*/

const ICON_SCHEMA_VERSION = "v2";

// ============================================================================
// GPU‑FRIENDLY GLOW + STROKE MAPS (deterministic)
// ============================================================================
const glow = Object.freeze({
  cyan:    "drop-shadow(0 0 6px rgba(0,255,255,0.45))",
  green:   "drop-shadow(0 0 6px rgba(0,255,150,0.45))",
  red:     "drop-shadow(0 0 6px rgba(255,60,60,0.45))",
  gold:    "drop-shadow(0 0 8px rgba(255,215,0,0.55))",
  purple:  "drop-shadow(0 0 8px rgba(180,0,255,0.55))",
  white:   "drop-shadow(0 0 6px rgba(255,255,255,0.45))"
});

const stroke = Object.freeze({
  cyan:    "#00eaff",
  green:   "#00ff99",
  red:     "#ff4d4d",
  gold:    "#ffd700",
  purple:  "#b300ff",
  white:   "#ffffff",
  black:   "#000000"
});

// ============================================================================
// BASE ICONS — deterministic SVGs
// ============================================================================
const baseIcons = Object.freeze({
  pulse: `
    <svg class="evo-icon" viewBox="0 0 24 24" fill="none">
      <path d="M3 12h4l2-6 4 12 2-6h6"
            stroke="${stroke.cyan}"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            filter="${glow.cyan}" />
    </svg>
  `,

  check: `
    <svg class="evo-icon" viewBox="0 0 24 24" fill="none">
      <path d="M5 13l4 4L19 7"
            stroke="${stroke.green}"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            filter="${glow.green}" />
    </svg>
  `,

  alert: `
    <svg class="evo-icon" viewBox="0 0 24 24" fill="none">
      <path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
            stroke="${stroke.red}"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            filter="${glow.red}" />
    </svg>
  `,

  info: `
    <svg class="evo-icon" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10"
              stroke="${stroke.cyan}"
              stroke-width="2"
              filter="${glow.cyan}" />
      <path d="M12 16v-4m0-4h.01"
            stroke="${stroke.cyan}"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round" />
    </svg>
  `
});

// ============================================================================
// EXPANDED ICON SET — v15 IMMORTAL
// ============================================================================
const expandedIcons = Object.freeze({
  plus: `
    <svg class="evo-icon" viewBox="0 0 24 24" fill="none">
      <path d="M12 5v14M5 12h14"
            stroke="${stroke.white}"
            stroke-width="2"
            stroke-linecap="round"
            filter="${glow.purple}" />
    </svg>
  `,

  edit: `
    <svg class="evo-icon" viewBox="0 0 24 24" fill="none">
      <path d="M12 20h9M16.5 3.5l4 4L7 21H3v-4L16.5 3.5z"
            stroke="${stroke.gold}"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            filter="${glow.gold}" />
    </svg>
  `,

  close: `
    <svg class="evo-icon" viewBox="0 0 24 24" fill="none">
      <path d="M6 6l12 12M6 18L18 6"
            stroke="${stroke.red}"
            stroke-width="2"
            stroke-linecap="round"
            filter="${glow.red}" />
    </svg>
  `,

  menu: `
    <svg class="evo-icon" viewBox="0 0 24 24" fill="none">
      <path d="M4 6h16M4 12h16M4 18h16"
            stroke="${stroke.white}"
            stroke-width="2"
            stroke-linecap="round"
            filter="${glow.cyan}" />
    </svg>
  `
});

// ============================================================================
// TIERED ICONS — Bronze / Silver / Gold / Platinum / Immortal / Ultra / Omega
// ============================================================================
const tierIcons = Object.freeze({
  bronze:   `<svg class="evo-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#cd7f32" /></svg>`,
  silver:   `<svg class="evo-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#c0c0c0" /></svg>`,
  gold:     `<svg class="evo-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#ffd700" filter="${glow.gold}" /></svg>`,
  platinum: `<svg class="evo-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#e5e4e2" filter="${glow.cyan}" /></svg>`,
  immortal: `<svg class="evo-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#b300ff" filter="${glow.purple}" /></svg>`,

  // v15 new tiers
  ultra:    `<svg class="evo-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#00eaff" filter="${glow.white}" /></svg>`,
  omega:    `<svg class="evo-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#000000" stroke="#ffffff" stroke-width="2" filter="${glow.white}" /></svg>`
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

// ============================================================================
// PUBLIC ORGAN — deterministic icon resolver
// ============================================================================
export const PulseIcons = {
  schemaVersion: ICON_SCHEMA_VERSION,

  base: baseIcons,
  expanded: expandedIcons,
  tier: tierIcons,

  resolve(name, tier = null, binaryMode = false) {
    let svg =
      (tier && tierIcons[tier]) ||
      baseIcons[name] ||
      expandedIcons[name] ||
      tierIcons.immortal;

    if (binaryMode) svg = toBinaryFriendly(svg);

    return svg;
  }
};
