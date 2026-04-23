// ============================================================================
//  PULSE OS v10.4 — AI ROUTER (FINAL VERSION)
//  Intent Decoder • Persona Selector • Language Cortex
//  PURE ROUTING. ZERO MUTATION. ZERO TIME. ZERO RANDOMNESS.
// ============================================================================

import { Personas, getPersona } from "./persona.js";

// ============================================================================
// PUBLIC API — Interpret + Route (v10.4)
// ============================================================================
export function routeAIRequest(request = {}) {
  const reasoning = [];

  // --------------------------------------------------------------------------
  // 1) Normalize Intent — Language Cortex
  // --------------------------------------------------------------------------
  const intent = (request.intent || "analyze").toLowerCase();
  reasoning.push(`Intent detected: "${intent}"`);

  // Extract flags (default false)
  const {
    touchesBackend = false,
    touchesFrontend = false,
    touchesSchemas = false,
    touchesFiles = false,
    touchesLogs = false,
    touchesRoutes = false,
    touchesErrors = false,
    touchesTourism = false,
    touchesUsers = false,
    touchesArchitecture = false,
    touchesEvolution = false,
    touchesEnvironment = false,
    touchesPower = false,
    touchesEarn = false,
    touchesPulse = false,
    touchesHistory = false,
    touchesSettings = false,
    userIsOwner = false
  } = request;

  // Record flags
  Object.entries({
    touchesBackend,
    touchesFrontend,
    touchesSchemas,
    touchesFiles,
    touchesLogs,
    touchesRoutes,
    touchesErrors,
    touchesTourism,
    touchesUsers,
    touchesArchitecture,
    touchesEvolution,
    touchesEnvironment,
    touchesPower,
    touchesEarn,
    touchesPulse,
    touchesHistory,
    touchesSettings,
    userIsOwner
  }).forEach(([k, v]) => {
    if (v) reasoning.push(`Flag: ${k.toUpperCase()}`);
  });

  // --------------------------------------------------------------------------
  // 2) Persona Selection — Interpreter Decision (v10.4)
  // --------------------------------------------------------------------------
  let personaId = Personas.NEUTRAL;

  // ARCHITECT MODE — system-level, owner-only
  if (
    touchesArchitecture ||
    touchesEvolution ||
    touchesSchemas ||
    touchesBackend ||
    touchesFiles ||
    touchesEnvironment && userIsOwner ||
    touchesPower && userIsOwner ||
    touchesEarn && userIsOwner ||
    touchesSettings && userIsOwner
  ) {
    if (userIsOwner) {
      personaId = Personas.ARCHITECT;
      reasoning.push("Routing to ARCHITECT persona (system-level request).");
    } else {
      reasoning.push("User not owner — cannot route to ARCHITECT persona.");
    }
  }

  // OBSERVER MODE — diagnostics
  else if (
    touchesLogs ||
    touchesRoutes ||
    touchesErrors ||
    touchesHistory ||
    touchesPulse
  ) {
    personaId = Personas.OBSERVER;
    reasoning.push("Routing to OBSERVER persona (diagnostic request).");
  }

  // TOUR GUIDE MODE — user-facing + tourism
  else if (
    touchesTourism ||
    touchesUsers ||
    touchesEarn ||
    touchesPulse
  ) {
    personaId = Personas.TOURGUIDE;
    reasoning.push("Routing to TOUR GUIDE persona (user-facing request).");
  }

  // NEUTRAL MODE — fallback
  else {
    personaId = Personas.NEUTRAL;
    reasoning.push("Routing to NEUTRAL persona (generic request).");
  }

  const persona = getPersona(personaId);

  // --------------------------------------------------------------------------
  // 3) Attach Permissions + Boundaries
  // --------------------------------------------------------------------------
  const permissions = persona?.permissions || {};
  const boundaries = persona?.boundaries || {};

  reasoning.push(`Persona selected: ${personaId}`);

  return {
    personaId,
    persona,
    permissions,
    boundaries,
    reasoning
  };
}

// ============================================================================
// EXPLAIN ROUTING — Interpreter Summary
// ============================================================================
export function explainRoutingDecision(request = {}) {
  const result = routeAIRequest(request);

  return {
    personaId: result.personaId,
    reasoning: result.reasoning
  };
}
