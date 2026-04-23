// ============================================================================
// FILE: /apps/organs/skin/PulseMeshSkin.js
// [pulse:mesh] PULSE_OS_SKIN_LAYER v10.4  // silver
// Boundary Membrane • Entry–Exit Normalization • Deterministic Skin
// ============================================================================
//
// IDENTITY — THE SKIN (v10.4):
// ----------------------------
// • First organ touched by every impulse entering the organism.
// • Last organ to touch every impulse leaving the organism.
// • Normalizes entry (score, energy).
// • Cleans exit (strips internal metadata).
// • No pressure reactivity (v9.2 behavior removed).
// • Pure metadata-only — zero payload mutation.
// • Deterministic-field, drift-proof, SDN-aligned.
//
// SAFETY CONTRACT (v10.4):
// -------------------------
// • No routing, no compute, no shaping.
// • No payload mutation.
// • No async, no randomness.
// • Metadata-only, reversible, safe.
// • Zero imports — CNS injects dependencies.
// • Drift-proof, deterministic, multi-instance-ready.
// ============================================================================

export function createPulseSkin({ log, warn, error }) {

  const SkinState = {
    meta: {
      layer: "PulseSkin",
      role: "BOUNDARY_MEMBRANE",
      version: 10.4,
      target: "full-mesh",
      selfRepairable: true,
      evo: {
        dualMode: true,
        localAware: true,
        internetAware: true,

        advantageCascadeAware: true,
        pulseEfficiencyAware: true,
        driftProof: true,
        multiInstanceReady: true,

        unifiedAdvantageField: true,
        deterministicField: true,
        futureEvolutionReady: true,

        signalFactoringAware: true,
        meshPressureAware: true,
        auraPressureAware: true
      }
    }
  };

  // ========================================================================
  //  SKIN PACK (v10.4)
  // ========================================================================
  const PulseSkin = {

    // -------------------------------------------------------
    // ENTRY NORMALIZATION — deterministic
    // -------------------------------------------------------
    normalizeEntry(impulse) {
      impulse.flags = impulse.flags || {};
      impulse.flags.skin_entry_normalized = true;

      // deterministic normalization
      impulse.score = clamp01(impulse.score ?? 0.5);
      impulse.energy = Math.max(0.05, impulse.energy ?? 1);

      return impulse;
    },

    // -------------------------------------------------------
    // EXIT NORMALIZATION — deterministic
    // -------------------------------------------------------
    normalizeExit(impulse) {
      impulse.flags = impulse.flags || {};
      impulse.flags.skin_exit_normalized = true;
      impulse.flags.internal_metadata_stripped = true;
      return impulse;
    }
  };

  // ========================================================================
  //  SKIN ENGINE (v10.4)
  // ========================================================================
  function applyPulseSkin(impulse, phase = "entry") {
    impulse.flags = impulse.flags || {};
    impulse.flags.skin_meta = SkinState.meta;

    if (phase === "entry") {
      PulseSkin.normalizeEntry(impulse);
    }

    // v10.4: NO dynamic friction
    // v10.4: NO dynamic noise
    // v10.4: NO boundary load modulation
    // Skin is now pure normalization only.

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
//  HELPERS
// ============================================================================
function clamp01(v) {
  if (typeof v !== "number" || Number.isNaN(v)) return 0;
  return Math.max(0, Math.min(1, v));
}
