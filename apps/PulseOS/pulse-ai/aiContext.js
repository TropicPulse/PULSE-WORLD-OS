// ============================================================================
//  PULSE OS v10.4 — THE COGNITIVE FRAME
//  Mental Model Constructor • Expectation Builder • Diagnostic Surface
//  PURE CONTEXT CONSTRUCTION. ZERO MUTATION. ZERO TIME. ZERO RANDOMNESS.
// ============================================================================

import { routeAIRequest } from "./aiRouter.js";

const COGNITIVE_META = {
  layer: "PulseAICognitiveFrame",
  role: "COGNITIVE_FRAME",
  version: "10.4",
  target: "full-mesh",
  selfRepairable: true,
  evo: {
    driftProof: true,
    deterministicField: true,
    multiInstanceReady: true,
    unifiedAdvantageField: true,
    futureEvolutionReady: true,
    observerOnly: true,
    personaAware: true,
    boundaryAware: true,
    permissionAware: true
  }
};

// ============================================================================
// PUBLIC API — Build Cognitive Frame (v10.4)
// ============================================================================
export function createAIContext(request = {}) {

  const routing = routeAIRequest(request);

  const context = {
    meta: COGNITIVE_META,

    personaId: routing.personaId,
    persona: routing.persona,
    permissions: routing.permissions,
    boundaries: routing.boundaries,

    // SAFE reasoning trace (not chain‑of‑thought)
    trace: [...routing.reasoning],

    // Diagnostics the AI can fill in during processing
    diagnostics: {
      mismatches: [],
      missingFields: [],
      driftDetected: false,
      slowdownCauses: []
    },

    // ------------------------------------------------------------------------
    // TRACE HELPERS — Cognitive Breadcrumbs
    // ------------------------------------------------------------------------
    logStep(message) {
      this.trace.push(message);
    },

    // ------------------------------------------------------------------------
    // DIAGNOSTIC HELPERS — Cognitive Integrity Checks
    // ------------------------------------------------------------------------
    flagMismatch(field, expected, actual) {
      this.diagnostics.mismatches.push({ field, expected, actual });
      this.trace.push(
        `Mismatch detected on "${field}": expected ${expected}, got ${actual}`
      );
    },

    flagMissingField(field) {
      this.diagnostics.missingFields.push(field);
      this.trace.push(`Missing field detected: "${field}"`);
    },

    flagSlowdown(reason) {
      this.diagnostics.slowdownCauses.push(reason);
      this.trace.push(`Potential slowdown cause: ${reason}`);
    },

    flagDrift(reason) {
      this.diagnostics.driftDetected = true;
      this.trace.push(`Drift detected: ${reason}`);
    }
  };

  return context;
}
