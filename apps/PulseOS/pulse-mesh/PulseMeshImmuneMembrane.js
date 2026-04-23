// ============================================================================
//  PULSE OS v10.4 — IMMUNE MEMBRANE LAYER  // red
//  “System Safety Membrane / Structural Validation / Quarantine / Metadata‑Only”
// ============================================================================
//
// IDENTITY — IMMUNE MEMBRANE (v10.4):
// -----------------------------------
// • First-line safety membrane for all impulses.
// • Pure structural validation — no pressure gating.
// • Pure metadata-only — zero payload mutation.
// • No routing logic, no compute, no shaping.
// • Quarantines unsafe or malformed impulses deterministically.
// • SDN-aligned: validates impulses before Router v10.4 receives them.
//
// SAFETY CONTRACT (v10.4):
// ------------------------
// • No payload access.
// • No score/energy mutation.
// • No routing override.
// • No pressure-based gating.
// • No autonomy.
// • Deterministic-field, drift-proof.
// • Unified-advantage-field, multi-instance-ready.
// ============================================================================

export function createPulseImmune() {

  const meta = {
    layer: "PulseImmune",
    role: "IMMUNE_MEMBRANE",
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

  // ---------------------------------------------------------------------------
  // STRUCTURAL VALIDATION (v10.4)
  // Pure structural checks — no pressure gating.
  // ---------------------------------------------------------------------------
  function validateStructure(impulse) {
    if (!impulse.id) return fail("missing_id");
    if (!impulse.payloadRef) return fail("missing_payloadRef");
    if (typeof impulse.energy !== "number") return fail("invalid_energy");
    if (typeof impulse.score !== "number") return fail("invalid_score");
    return pass();
  }

  function validateFlags(impulse) {
    const flags = impulse.flags || {};
    if (Object.keys(flags).length > 96) return fail("too_many_flags");
    return pass();
  }

  // ---------------------------------------------------------------------------
  // ANOMALY QUARANTINE (v10.4)
  // Only Cortex anomalies or explicit flags can quarantine.
  // ---------------------------------------------------------------------------
  function quarantine(impulse) {
    const f = impulse.flags || {};

    if (f.cortex_anomaly) {
      impulse.flags.immune_quarantined = true;
      return fail("cortex_anomaly");
    }

    if (f.cortex_factoring_anomaly) {
      impulse.flags.immune_quarantined = true;
      return fail("factoring_anomaly");
    }

    return pass();
  }

  // ---------------------------------------------------------------------------
  // ROUTE HINT SANITY (v10.4)
  // Still allowed, but simplified — no pressure gating.
  // ---------------------------------------------------------------------------
  function routeSanity(impulse) {
    const hint = impulse.routeHint;
    if (!hint) return pass();

    if (typeof hint !== "string") return fail("invalid_routeHint");
    if (!hint.startsWith("earner-") && !hint.startsWith("service-")) {
      return fail("unknown_routeHint");
    }

    return pass();
  }

  // ---------------------------------------------------------------------------
  // ENERGY FLOOR (v10.4)
  // Same as v9.2 — but no pressure gating.
  // ---------------------------------------------------------------------------
  function energyFloor(impulse) {
    if (isNaN(impulse.energy)) return fail("energy_nan");
    if (impulse.energy < 0) return fail("energy_negative");
    return pass();
  }

  // ---------------------------------------------------------------------------
  // IMMUNE ENGINE (v10.4)
  // Pure structural validation + anomaly quarantine.
  // No pressure gating. No dynamic thresholds.
  // ---------------------------------------------------------------------------
  function applyPulseImmune(impulse) {
    impulse.flags = impulse.flags || {};
    impulse.flags.immune_meta = meta;

    const checks = [
      validateStructure,
      validateFlags,
      quarantine,
      routeSanity,
      energyFloor
    ];

    for (const check of checks) {
      const result = check(impulse);
      if (!result.ok) {
        impulse.flags[`immune_${result.reason}`] = true;
        impulse.flags.immune_failed = true;
        return impulse;
      }
    }

    impulse.flags.immune_passed = true;
    return impulse;
  }

  return applyPulseImmune;
}

// ---------------------------------------------------------------------------
// HELPERS
// ---------------------------------------------------------------------------
function pass() { return { ok: true }; }
function fail(reason) { return { ok: false, reason }; }
