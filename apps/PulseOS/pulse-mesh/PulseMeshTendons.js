// ============================================================================
// FILE: PulseMeshTendons.js
// PULSE OS — v10.4
// CONNECTIVE TISSUE ORGAN — “PulseMeshTendons”
// Intent Translation • Earn-Ready Metadata • Deterministic Connective Tissue
// ============================================================================
//
// IDENTITY — THE TENDON ORGAN (v10.4):
// ------------------------------------
// • Translates Cortex intent into earn-ready metadata.
// • Classifies impulses (heavy/medium/light) deterministically.
// • Shapes routeHint based ONLY on class (no pressure logic).
// • Stabilizes energy deterministically (no tension logic).
// • Attaches volatility + earn-context for EarnEngine.
// • Pure metadata-only — zero payload mutation.
// • Deterministic, drift-proof, connective tissue.
// • Pulse-agnostic: works with Pulse v1/v2/v3.
// • No pressure gating, no route-mode logic, no factoring pressure.
// ============================================================================

export function createPulseMeshTendons({ log, warn, error }) {

  const tendonMeta = {
    layer: "PulseMeshTendons",
    role: "INTENT_TRANSLATION",
    version: "10.4",
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
      signalFactoringAware: true
    }
  };

  // ========================================================================
  // Tendon Pack (v10.4)
  // ========================================================================
  const PulseMeshTendons = {

    // -------------------------------------------------------
    // CLASSIFY — heavy / medium / light (deterministic)
    // -------------------------------------------------------
    classify(impulse) {
      const score = impulse.score ?? 0.5;

      if (score >= 0.85) return "heavy";
      if (score >= 0.45) return "medium";
      return "light";
    },

    // -------------------------------------------------------
    // ROUTE HINT — earn class only (no pressure logic)
    // -------------------------------------------------------
    routeHint(impulse, cls) {
      impulse.flags = impulse.flags || {};

      switch (cls) {
        case "heavy":
          impulse.routeHint = "earner-heavy";
          break;
        case "medium":
          impulse.routeHint = "earner-medium";
          break;
        default:
          impulse.routeHint = "earner-light";
      }

      return impulse;
    },

    // -------------------------------------------------------
    // SHAPE ENERGY — deterministic stabilization
    // -------------------------------------------------------
    shapeEnergy(impulse, cls) {
      impulse.flags = impulse.flags || {};

      if (cls === "heavy") impulse.energy = (impulse.energy ?? 1) * 1.05;
      if (cls === "light") impulse.energy = (impulse.energy ?? 1) * 0.95;

      impulse.flags.tendon_energy_shaped = true;
      return impulse;
    },

    // -------------------------------------------------------
    // NORMALIZE EARN ENERGY — clamp to safe range
    // -------------------------------------------------------
    normalizeEarnEnergy(impulse) {
      impulse.flags = impulse.flags || {};

      const e = impulse.energy ?? 1;
      impulse.energy = Math.max(0.1, Math.min(e, 1));

      impulse.flags.tendon_energy_normalized = true;
      return impulse;
    },

    // -------------------------------------------------------
    // ATTACH VOLATILITY — deterministic (no pressure)
    // -------------------------------------------------------
    attachVolatility(impulse) {
      impulse.flags = impulse.flags || {};

      // v10.4: volatility is simple + deterministic
      impulse.flags.earner_volatility = 0;

      return impulse;
    },

    // -------------------------------------------------------
    // ATTACH EARN CONTEXT — deterministic earn metadata
    // -------------------------------------------------------
    attachEarnContext(impulse, cls) {
      impulse.flags = impulse.flags || {};

      impulse.flags.earner_context = {
        class: cls,
        urgency: impulse.energy ?? 1,
        stability_hint: 1,
        volatility: impulse.flags.earner_volatility ?? 0,
        route_hint: impulse.routeHint
      };

      return impulse;
    },

    // -------------------------------------------------------
    // TAG CLASS — explicit tendon class flags
    // -------------------------------------------------------
    tag(impulse, cls) {
      impulse.flags = impulse.flags || {};
      impulse.flags[`tendon_class_${cls}`] = true;
      return impulse;
    }
  };

  // ========================================================================
  // Tendon Engine (v10.4)
  // “Apply connective tissue shaping for Mesh → EarnEngine”
  // ========================================================================
  function applyPulseMeshTendons(impulse) {
    impulse.flags = impulse.flags || {};
    impulse.flags.tendon_meta = tendonMeta;

    let cls = PulseMeshTendons.classify(impulse);

    PulseMeshTendons.routeHint(impulse, cls);
    PulseMeshTendons.shapeEnergy(impulse, cls);
    PulseMeshTendons.normalizeEarnEnergy(impulse);
    PulseMeshTendons.attachVolatility(impulse);
    PulseMeshTendons.attachEarnContext(impulse, cls);
    PulseMeshTendons.tag(impulse, cls);

    impulse.flags.tendon_applied = true;

    return impulse;
  }

  return {
    meta: tendonMeta,
    apply: applyPulseMeshTendons,
    tendons: PulseMeshTendons
  };
}
