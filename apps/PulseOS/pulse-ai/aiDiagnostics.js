// ============================================================================
//  PULSE OS v10.4 — AI DIAGNOSTICS
//  Drift Tracker • Mismatch Ledger • Slowdown Sensor
//  PURE OBSERVATION. ZERO RANDOMNESS. ZERO PERSISTENT MUTATION.
// ============================================================================
//
// ROLE:
//   • Provide a deterministic diagnostics state for any AI context.
//   • Expose helper functions to record mismatches, drift, and slowdown causes.
//   • Stay read-only with respect to system architecture and identity.
//   • Be pluggable into Brainstem context or a dedicated diagnostics organ.
//
// CONTRACT:
//   • No network, no filesystem, no DB access.
//   • No eval(), no Function(), no dynamic imports.
//   • No writes outside the provided diagnostics object.
// ============================================================================

// ============================================================================
//  IDENTITY — THE DIAGNOSTICS (v10.4)
// ============================================================================
export const AI_DIAGNOSTICS_META = Object.freeze({
  layer: "PulseAIDiagnostics",
  role: "DIAGNOSTICS",
  version: "10.4",
  target: "full-mesh",
  evo: Object.freeze({
    driftProof: true,
    deterministicField: true,
    multiInstanceReady: true,
    observerOnly: true,
    architectAware: true,
    schemaAware: true,
    patternAware: true
  })
});

// ============================================================================
//  FACTORY — Create Diagnostics State
// ============================================================================
export function createDiagnosticsState() {
  return {
    mismatches: [],
    missingFields: [],
    slowdownCauses: [],
    driftEvents: [],
    driftDetected: false
  };
}

// ============================================================================
//  HELPERS — Attach Diagnostics to a Context
// ============================================================================
//
// This is intentionally minimal and side-effect scoped:
// it only mutates the provided context object at runtime.
//
export function attachDiagnosticsHelpers(context) {
  if (!context) return context;

  const diagnostics = createDiagnosticsState();

  // Attach state
  context.diagnostics = diagnostics;

  // --------------------------------------------------------------------------
  // MISMATCH — expected vs actual
  // --------------------------------------------------------------------------
  context.flagMismatch = (key, expected, actual) => {
    diagnostics.mismatches.push({ key, expected, actual });
  };

  // --------------------------------------------------------------------------
  // MISSING FIELD — required but absent
  // --------------------------------------------------------------------------
  context.flagMissingField = (key) => {
    diagnostics.missingFields.push({ key });
  };

  // --------------------------------------------------------------------------
  // SLOWDOWN — performance / payload concerns
  // --------------------------------------------------------------------------
  context.flagSlowdown = (reason) => {
    diagnostics.slowdownCauses.push({ reason });
  };

  // --------------------------------------------------------------------------
  // DRIFT — schema / behavior divergence
  // --------------------------------------------------------------------------
  context.flagDrift = (description) => {
    diagnostics.driftDetected = true;
    diagnostics.driftEvents.push({ description });
  };

  return context;
}

// ============================================================================
//  PUBLIC API — Create Standalone Diagnostics Bundle
// ============================================================================
//
// For use as a dedicated organ or standalone module without mutating context.
//
export function createDiagnosticsAPI() {
  const diagnostics = createDiagnosticsState();

  function flagMismatch(key, expected, actual) {
    diagnostics.mismatches.push({ key, expected, actual });
  }

  function flagMissingField(key) {
    diagnostics.missingFields.push({ key });
  }

  function flagSlowdown(reason) {
    diagnostics.slowdownCauses.push({ reason });
  }

  function flagDrift(description) {
    diagnostics.driftDetected = true;
    diagnostics.driftEvents.push({ description });
  }

  return Object.freeze({
    diagnostics,
    flagMismatch,
    flagMissingField,
    flagSlowdown,
    flagDrift
  });
}
