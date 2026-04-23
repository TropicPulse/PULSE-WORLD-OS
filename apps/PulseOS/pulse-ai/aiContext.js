// ============================================================================
//  PULSE OS v10.4 — THE COGNITIVE FRAME
//  Mental Model Constructor • Expectation Builder • Diagnostic Surface
//  PURE CONTEXT CONSTRUCTION. ZERO MUTATION. ZERO TIME. ZERO RANDOMNESS.
// ============================================================================

import { routeAIRequest } from "./aiRouter.js";

export const COGNITIVE_META = Object.freeze({
  layer: "PulseAICognitiveFrame",
  role: "COGNITIVE_FRAME",
  version: "10.4",
  target: "full-mesh",
  selfRepairable: true,
  evo: Object.freeze({
    driftProof: true,
    deterministicField: true,
    multiInstanceReady: true,
    unifiedAdvantageField: true,
    futureEvolutionReady: true,
    observerOnly: true,
    personaAware: true,
    boundaryAware: true,
    permissionAware: true
  })
});

// ============================================================================
// PUBLIC API — Build Cognitive Frame (v10.4)
// ============================================================================
export function createAIContext(request = {}) {
  const routing = routeAIRequest(request);

  // --------------------------------------------------------------------------
  // BASE CONTEXT — Deterministic, Zero Mutation
  // --------------------------------------------------------------------------
  const context = {
    meta: COGNITIVE_META,

    personaId: routing.personaId,
    persona: routing.persona,
    permissions: routing.permissions,
    boundaries: routing.boundaries,

    // SAFE reasoning trace (not chain‑of‑thought)
    trace: [...routing.reasoning],

    // Diagnostics (v10.4 standard)
    diagnostics: {
      mismatches: [],
      missingFields: [],
      slowdownCauses: [],
      driftEvents: [],
      driftDetected: false
    },

    routing, // full routing snapshot for Scribe

    // ------------------------------------------------------------------------
    // TRACE HELPERS — Cognitive Breadcrumbs
    // ------------------------------------------------------------------------
    logStep(message) {
      this.trace.push(message);
    },

    // ------------------------------------------------------------------------
    // DIAGNOSTIC HELPERS — Cognitive Integrity Checks
    // ------------------------------------------------------------------------
    flagMismatch(key, expected, actual) {
      this.diagnostics.mismatches.push({ key, expected, actual });
      this.trace.push(`Mismatch: "${key}" expected ${expected}, got ${actual}`);
    },

    flagMissingField(key) {
      this.diagnostics.missingFields.push({ key });
      this.trace.push(`Missing field: "${key}"`);
    },

    flagSlowdown(reason) {
      this.diagnostics.slowdownCauses.push({ reason });
      this.trace.push(`Slowdown cause: ${reason}`);
    },

    flagDrift(description) {
      this.diagnostics.driftDetected = true;
      this.diagnostics.driftEvents.push({ description });
      this.trace.push(`Drift detected: ${description}`);
    }
  };

  return context;
}
