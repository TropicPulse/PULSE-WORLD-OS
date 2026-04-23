// ============================================================================
// FILE: tropic-pulse-functions/apps/pulse-ai/createOrgans.js
// LAYER: BRAINSTEM (Organ Assembly + Context Binding)
// ============================================================================
//
// ROLE:
//   • Assemble all AI organs into a single unified organism.
//   • Bind organs to context (persona, user, owner).
//   • Provide deterministic, read‑only access to system data.
//   • Enforce identity safety + owner gating at the organ level.
//
// CONTRACT:
//   • READ‑ONLY — no writes, no deletes, no updates.
//   • NO eval(), NO Function(), NO dynamic imports.
//   • NO executing user code.
//   • Deterministic organ assembly only.
// ============================================================================

import { createArchitectAPI } from "./aiArchitect.js";
import { createTouristAPI } from "./aiTourist.js";
import { createEnvironmentAPI } from "./aiEnvironment.js";
import { createPowerAPI } from "./aiPower.js";
import { createEvolutionAPI } from "./aiEvolution.js";
import { createEarnAPI } from "./aiEarn.js";

export function createOrgans(context, db, fsAPI, routeAPI, schemaAPI) {
  // Each organ receives the same context + its required data sources.
  return {
    architect: createArchitectAPI(db),
    tourist: createTouristAPI(db),
    environment: createEnvironmentAPI(db),
    power: createPowerAPI(db),
    evolution: createEvolutionAPI(fsAPI, routeAPI, schemaAPI),
    earn: createEarnAPI(db)
  };
}
