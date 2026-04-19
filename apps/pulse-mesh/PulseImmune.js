// ============================================================================
// [pulse:mesh] COMMUNITY_IMMUNE_LAYER v7.3  // red
// System Safety Layer • Validation • Quarantine • Metadata-Only
// ============================================================================
//
// IDENTITY — THE IMMUNE LAYER:
//  ----------------------------
//  • Protects the system from malformed or unsafe impulses.
//  • Validates metadata, quarantines anomalies, stabilizes routing.
//  • NEVER computes payloads, NEVER mutates data content.
//  • Metadata-only safety layer between Organs and Earners.
//
// THEME:
//  • Color: Red (protection, defense, structural integrity).
//  • Subtheme: Validation, quarantine, safety.
//
// SAFETY CONTRACT:
//  • Metadata-only.
//  • No payload access.
//  • No routing override.
//  • No autonomy, no sentience.
//  • Deterministic, drift-proof safety behavior.
//
// ADVANTAGE CASCADE (conceptual only):
//  ------------------------------------
//  • Inherits ANY advantage from ANY organ automatically.
//  • Dual-mode: mental clarity + system efficiency.
//  • Local-aware: node-level safety context.
//  • Internet-aware: cluster/mesh/global safety context.
//  • Unified-advantage-field: ALL advantages active unless unsafe.
//  • Future-evolution-ready: new safe advantages auto-inherited.
// ============================================================================


// -----------------------------------------------------------
// Immune Pack: protection rules (logic unchanged)
// -----------------------------------------------------------

export const PulseImmune = {
  validateStructure(impulse) {
    if (!impulse.id) return fail('missing_id');
    if (!impulse.payloadRef) return fail('missing_payloadRef');
    if (typeof impulse.energy !== 'number') return fail('invalid_energy');
    if (typeof impulse.score !== 'number') return fail('invalid_score');
    return pass();
  },

  validateFlags(impulse) {
    const flags = impulse.flags || {};
    const keys = Object.keys(flags);
    if (keys.length > 64) return fail('too_many_flags');
    return pass();
  },

  quarantine(impulse) {
    if (impulse.flags?.cortex_anomaly) {
      impulse.flags = impulse.flags || {};
      impulse.flags.immune_quarantined = true;
    }
    return pass();
  },

  routeSanity(impulse) {
    const hint = impulse.routeHint;
    if (!hint) return pass();

    if (typeof hint !== 'string') return fail('invalid_routeHint');
    if (!hint.startsWith('earner-') && !hint.startsWith('service-')) {
      return fail('unknown_routeHint');
    }

    return pass();
  },

  energyFloor(impulse) {
    if (isNaN(impulse.energy)) return fail('energy_nan');
    if (impulse.energy < 0) return fail('energy_negative');
    return pass();
  }
};


// -----------------------------------------------------------
// Immune Engine (logic unchanged, metadata upgraded)
// -----------------------------------------------------------

export function applyPulseImmune(impulse) {
  impulse.flags = impulse.flags || {};

  // attach v7.3 immune meta
  impulse.flags.immune_meta = {
    layer: "PulseImmune",
    role: "IMMUNE_SAFETY_LAYER",
    version: 7.3,
    target: "full-mesh",
    selfRepairable: true,
    evo: {
      dualMode: true,                 // mental + system
      localAware: true,               // node-level safety
      internetAware: true,            // cluster/mesh/global safety

      advantageCascadeAware: true,    // inherits ANY advantage
      pulseEfficiencyAware: true,     // 1-pulse collapse
      driftProof: true,
      multiInstanceReady: true,

      unifiedAdvantageField: true,    // no OR; all advantages ON
      futureEvolutionReady: true      // new safe advantages auto-inherited
    }
  };

  const checks = [
    PulseImmune.validateStructure,
    PulseImmune.validateFlags,
    PulseImmune.quarantine,
    PulseImmune.routeSanity,
    PulseImmune.energyFloor
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


// -----------------------------------------------------------
// Helpers
// -----------------------------------------------------------

function pass() {
  return { ok: true };
}

function fail(reason) {
  return { ok: false, reason };
}
