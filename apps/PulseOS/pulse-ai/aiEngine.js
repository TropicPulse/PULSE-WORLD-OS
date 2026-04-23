// ============================================================================
//  PULSE OS v10.4 — AI CORTEX (FINAL CLEAN VERSION)
// ============================================================================

import { createAIContext } from "./aiContext.js";
import { checkPermission } from "./permissions.js";
import { formatDebugReport } from "./aiDebug.js";
import { buildAdminPanelModel } from "./aiClinician.js";

import { runArchitectMode } from "./modes/architect.js";
import { runObserverMode } from "./modes/observer.js";
import { runTourGuideMode } from "./modes/tourguide.js";

import { createBrainstem } from "./aiBrainstem.js";

// ============================================================================
// PUBLIC API — Cortex Execution Wrapper (v10.4)
// ============================================================================
export async function runAI(request = {}, operation, deps = {}) {
  const { db, fsAPI, routeAPI, schemaAPI } = deps;

  // --------------------------------------------------------------------------
  // 1) Build Cognitive Frame — Cortex Initialization
  // --------------------------------------------------------------------------
  const context = createAIContext(request);
  context.logStep("AI context initialized.");

  // --------------------------------------------------------------------------
  // 2) Build Brainstem (Persona + Organs + Personality)
  // --------------------------------------------------------------------------
  const brainstem = createBrainstem(request, db, fsAPI, routeAPI, schemaAPI);

  // Merge brainstem context into cortex context
  Object.assign(context, brainstem.context);

  // Attach organs to context
  context.organs = brainstem.organs;

  context.logStep(`Persona selected: ${context.personaId}`);

  // --------------------------------------------------------------------------
  // 3) Permission Enforcement — Executive Control
  // --------------------------------------------------------------------------
  const allowed = checkPermission(
    context.personaId,
    request.intent === "generate" ? "canGenerateFunctions" : "canReadFiles"
  );

  if (!allowed) {
    context.logStep(
      `Permission denied for persona "${context.personaId}" on intent "${request.intent}".`
    );
    return buildAIResponse(null, context);
  }

  context.logStep(
    `Permission granted for persona "${context.personaId}" to perform intent "${request.intent}".`
  );

  // --------------------------------------------------------------------------
  // 4) Persona-Specific Execution Pathway
  // --------------------------------------------------------------------------
  let result = null;

  try {
    context.logStep("Executing AI operation...");

    switch (context.personaId) {
      case "architect":
        result = await runArchitectMode(request, context, operation);
        break;

      case "observer":
        result = await runObserverMode(request, context, operation);
        break;

      case "tourguide":
        result = await runTourGuideMode(request, context, operation);
        break;

      default:
        // Neutral mode
        result = await operation(context);
        break;
    }

    context.logStep("AI operation completed successfully.");

  } catch (err) {
    context.flagSlowdown("Operation threw an exception.");
    context.logStep(`Error: ${err.message}`);
    result = null;
  }

  // --------------------------------------------------------------------------
  // 5) Return Full AI Output — Cortex Output Contract (v10.4)
  // --------------------------------------------------------------------------
  return buildAIResponse(result, context);
}

// ============================================================================
// INTERNAL — Build Full AI Response (v10.4)
// ============================================================================
function buildAIResponse(result, context) {
  return {
    result,
    context,

    // Historian (Scribe)
    scribeReport: formatDebugReport(context),

    // Diagnostics (Clinician)
    clinicianReport: buildAdminPanelModel(context),

    // Observer (optional)
    observerReport: context.observerReport || null,

    // Identity + Boundaries
    persona: context.persona,
    permissions: context.permissions,
    boundaries: context.boundaries
  };
}
