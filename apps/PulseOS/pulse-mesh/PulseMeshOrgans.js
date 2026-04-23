// ============================================================================
//  PULSE OS v10.4 — SURVIVAL ORGANS LAYER  // orange
//  “Functional Organ Map of the Mesh Body”
//  Capability Signatures • Deterministic Organ Matching • Metadata-Only
// ============================================================================
//
// IDENTITY (v10.4):
// -----------------
// • Maps impulses to functional organs (storage, routing, security, earnPrep).
// • Pure metadata-only classification — zero payload mutation.
// • Deterministic-field, drift-proof, SDN-aligned.
// • No pressure gating (v9.2 behavior removed).
// • Multi-instance-ready, unified-advantage-field, future-evolution-ready.
//
// ROLE IN THE DIGITAL BODY (v10.4):
// ---------------------------------
// • Organ Map → assigns impulses to the correct functional organ.
// • Zero Compute → classification only, no transformation.
// • No pressure thresholds, no load avoidance, no tension logic.
// • Pure intent-based and flag-based organ selection.
// ============================================================================

export function createPulseOrgans() {

  // -------------------------------------------------------
  // ORGAN DEFINITIONS (v10.4)
  // Deterministic, pressure-free, SDN-aligned.
  // -------------------------------------------------------
  const PulseOrgans = {

    // -------------------------------------------------------
    // STORAGE ORGAN — deterministic, safe default
    // -------------------------------------------------------
    storage: {
      id: "organ-storage",
      capabilities: ["store", "retrieve", "index"],
      match(impulse) {
        return impulse.flags?.cortex_intent === "normal";
      }
    },

    // -------------------------------------------------------
    // ROUTING ORGAN — deterministic, based on intent + score
    // -------------------------------------------------------
    routing: {
      id: "organ-routing",
      capabilities: ["route", "shape", "classify"],
      match(impulse) {
        return impulse.flags?.cortex_intent === "push_hard" ||
               impulse.score >= 0.7;
      }
    },

    // -------------------------------------------------------
    // SECURITY ORGAN — anomaly-first
    // -------------------------------------------------------
    security: {
      id: "organ-security",
      capabilities: ["validate", "verify", "protect"],
      match(impulse) {
        return impulse.flags?.cortex_anomaly ||
               impulse.flags?.cortex_factoring_anomaly;
      }
    },

    // -------------------------------------------------------
    // EARN PREP ORGAN — deterministic, based on routeHint
    // -------------------------------------------------------
    earnPrep: {
      id: "organ-earnprep",
      capabilities: ["prepare", "shape_intent", "assign_earner"],
      match(impulse) {
        return typeof impulse.routeHint === "string" &&
               impulse.routeHint.startsWith("earner-");
      }
    }
  };


  // ========================================================================
  // ORGAN ENGINE (v10.4)
  // “Attach functional organ identity to the impulse”
  // ========================================================================
  function applyPulseOrgans(impulse) {
    impulse.flags = impulse.flags || {};
    impulse.organs = impulse.organs || [];

    // attach v10.4 organ meta
    impulse.flags.organ_meta = {
      layer: "PulseOrgans",
      role: "FUNCTIONAL_ORGAN_MAP",
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
        signalFactoringAware: true,
        meshPressureAware: true,
        auraPressureAware: true
      }
    };

    // deterministic organ matching (no pressure)
    for (const key of Object.keys(PulseOrgans)) {
      const organ = PulseOrgans[key];
      if (organ.match(impulse)) {
        impulse.organs.push(organ.id);
        impulse.flags[`organ_${organ.id}`] = true;
      }
    }

    return impulse;
  }

  return {
    apply: applyPulseOrgans,
    organs: PulseOrgans
  };
}
