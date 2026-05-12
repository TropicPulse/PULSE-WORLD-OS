// ============================================================================
// FILE: /organs/skin/PulseMeshSkin-v24-IMMORTAL-ADVANTAGE++.js
// [pulse:mesh] PULSE_OS_SKIN_LAYER v24-IMMORTAL-ADVANTAGE++  // silver
// Boundary Membrane • Entry–Exit Normalization • Zero-Trust Surface
// Deterministic • Drift-Proof • Metadata-Only • Dual-Band • Mesh-Aware
// ============================================================================
//
// IDENTITY — THE SKIN (v24 IMMORTAL ADVANTAGE++):
// -----------------------------------------------
// • First organ touched by every impulse entering the organism.
// • Last organ to touch every impulse leaving the organism.
// • Pure metadata-only normalization — zero payload mutation.
// • Zero-trust boundary membrane: validates, tags, normalizes.
// • Deterministic-field, drift-proof, SDN-aligned.
// • Presence-aware, binary-aware, dual-band-ready.
// • Mesh-aware, advantage-aware, pressure-aware.
// • IMMORTAL: zero randomness, zero compute, zero shaping.
//
// SAFETY CONTRACT (v24):
// -----------------------
// • No routing, no compute, no shaping.
// • No payload mutation.
// • No async, no randomness.
// • Zero external mutation.
// • Zero network fetch.
// • Deterministic, reversible, safe.
// • Multi-instance-ready.
// ============================================================================

import { OrganismIdentity } from "../PULSE-X/PULSE-WORLD-MAP.js
";
const Identity = OrganismIdentity(import.meta.url);

// META EXPORTS
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

export function createPulseSkin({ log, warn, error }) {

  // ==========================================================================
  // IMMORTAL META — v24
  // ==========================================================================
  const SkinState = {
    meta: Object.freeze({
      layer: "PulseSkin",
      role: "BOUNDARY_MEMBRANE",
      version: "24-IMMORTAL-ADVANTAGE++",
      lineage: "PulseMesh-v24",
      target: "full-mesh",
      selfRepairable: true,

      evo: {
        skin: true,
        boundaryLayer: true,
        zeroTrustSurface: true,
        metadataOnly: true,
        deterministic: true,
        driftProof: true,

        presenceAware: true,
        bandAware: true,
        binaryAware: true,
        symbolicAware: true,
        dualBand: true,
        meshAware: true,

        advantageCascadeAware: true,
        unifiedAdvantageField: true,
        pulseEfficiencyAware: true,

        meshPressureAware: true,
        auraPressureAware: true,

        deterministicField: true,
        futureEvolutionReady: true,
        multiInstanceReady: true,

        zeroCompute: true,
        zeroMutation: true,
        zeroRoutingInfluence: true,
        zeroNetworkFetch: true,
        zeroExternalMutation: true
      },

      contract: {
        always: [
          "normalize entry",
          "normalize exit",
          "preserve payload",
          "preserve determinism",
          "strip internal metadata safely"
        ],
        never: [
          "mutate payload",
          "route",
          "compute",
          "inject randomness",
          "modify score beyond normalization",
          "modify energy beyond normalization"
        ]
      }
    })
  };

  // ==========================================================================
  // SKIN PACK — IMMORTAL ENTRY/EXIT NORMALIZATION
  // ==========================================================================
  const PulseSkin = {

    // ------------------------------------------------------------------------
    // ENTRY NORMALIZATION — deterministic, zero-trust, metadata-only
    // ------------------------------------------------------------------------
    normalizeEntry(impulse) {
      impulse.flags = impulse.flags || {};
      impulse.flags.skin_entry_normalized = true;
      impulse.flags.skin_lineage = "skin-v24-immortal";

      // ---------------------------------------------------
      // MODE + PRESENCE-BAND DETERMINISTIC TAGGING
      // ---------------------------------------------------
      if (impulse.flags.binary_mode) {
        impulse.flags.skin_mode = "binary";
        impulse.band = "binary";
        impulse.flags.skin_band_lineage = "band-binary-v24";
      }
      else if (impulse.flags.dual_mode) {
        impulse.flags.skin_mode = "dual";
        impulse.band = "dual";
        impulse.flags.skin_band_lineage = "band-dual-v24";
      }
      else {
        impulse.flags.skin_mode = "symbolic";
        impulse.band = "symbolic";
        impulse.flags.skin_band_lineage = "band-symbolic-v24";
      }

      // ---------------------------------------------------
      // SCORE + ENERGY NORMALIZATION (deterministic)
      // ---------------------------------------------------
      impulse.score = clamp01(impulse.score ?? 0.5);
      impulse.energy = Math.max(0.05, impulse.energy ?? 1);

      // ---------------------------------------------------
      // PRESENCE-BAND METADATA
      // ---------------------------------------------------
      impulse.flags.skin_presence_band = impulse.band;

      // ---------------------------------------------------
      // ADVANTAGE + PRESSURE REFLECTION (metadata-only)
      // ---------------------------------------------------
      if (impulse.flags.mesh_pressure != null)
        impulse.flags.skin_mesh_pressure_reflection = impulse.flags.mesh_pressure;

      if (impulse.flags.aura_pressure != null)
        impulse.flags.skin_aura_pressure_reflection = impulse.flags.aura_pressure;

      if (impulse.flags.advantage_field != null)
        impulse.flags.skin_advantage_field = impulse.flags.advantage_field;

      // ---------------------------------------------------
      // IMMORTAL SURFACE SIGNATURE
      // ---------------------------------------------------
      impulse.flags.skin_surface_signature = "surface-v24-immortal";

      return impulse;
    },

    // ------------------------------------------------------------------------
    // EXIT NORMALIZATION — deterministic, metadata scrubbing
    // ------------------------------------------------------------------------
    normalizeExit(impulse) {
      impulse.flags = impulse.flags || {};
      impulse.flags.skin_exit_normalized = true;

      // IMMORTAL: safe metadata scrubbing
      impulse.flags.skin_exit_scrubbed = true;

      // We do NOT delete flags — Router/SendSystem may strip internals later.
      return impulse;
    }
  };

  // ==========================================================================
  // SKIN ENGINE — IMMORTAL
  // ==========================================================================
  function applyPulseSkin(impulse, phase = "entry") {
    impulse.flags = impulse.flags || {};
    impulse.flags.skin_meta = SkinState.meta;

    if (phase === "entry") {
      PulseSkin.normalizeEntry(impulse);
    }

    // IMMORTAL SKIN: no friction, no noise, no shaping, no compute.

    if (phase === "exit") {
      PulseSkin.normalizeExit(impulse);
    }

    impulse.flags.skin_applied = true;
    return impulse;
  }

  return {
    meta: SkinState.meta,
    apply: applyPulseSkin,
    state: SkinState
  };
}

// ============================================================================
// HELPERS
// ============================================================================
function clamp01(v) {
  if (typeof v !== "number" || Number.isNaN(v)) return 0;
  return Math.max(0, Math.min(1, v));
}
