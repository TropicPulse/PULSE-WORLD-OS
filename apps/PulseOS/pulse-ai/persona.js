// ============================================================================
//  PULSE OS v10.4 — THE IDENTITY LAYER
//  Self‑Definition • Role Assignment • Evolutionary Archetypes
//  PURE IDENTITY. ZERO MUTATION. ZERO TIME. ZERO RANDOMNESS.
// ============================================================================

import {
  ArchitectAIPermissions,
  ObserverAIPermissions,
  TourGuideAIPermissions,
  NeutralAIPermissions,
  OwnerPermissions
} from "./permissions.js";

import {
  ArchitectAIBoundaries,
  ObserverAIBoundaries,
  TourGuideAIBoundaries,
  NeutralAIBoundaries
} from "./boundaries.js";

// ============================================================================
// OWNER ID — The Only Identity‑Privileged Human
// ============================================================================
export const OWNER_ID = "aldwyn"; 
// Change this only if your canonical identity changes.

// ============================================================================
// PERSONA IDs — Identity Tokens
// ============================================================================
export const Personas = Object.freeze({
  ARCHITECT: "architect",
  OBSERVER: "observer",
  TOURGUIDE: "tourguide",
  NEUTRAL: "neutral",
  OWNER: "owner" // Not an AI persona — this is YOU
});

// ============================================================================
// PERSONA REGISTRY — Immutable Identity Definitions
// ============================================================================
export const PersonaRegistry = Object.freeze({
  [Personas.ARCHITECT]: Object.freeze({
    id: Personas.ARCHITECT,
    label: "Architect AI",
    description:
      "System‑level design intelligence. Reads all organs, schemas, routes, and evolution patterns. Can explain identity, architecture, and contracts — but cannot mutate anything.",
    scope: "system-readonly",
    permissions: ArchitectAIPermissions,
    boundaries: ArchitectAIBoundaries
  }),

  [Personas.OBSERVER]: Object.freeze({
    id: Personas.OBSERVER,
    label: "Observer AI",
    description:
      "Diagnostic intelligence. Reads logs, drift, errors, routes, and performance. Provides forensic insight — but cannot mutate anything.",
    scope: "diagnostics-only",
    permissions: ObserverAIPermissions,
    boundaries: ObserverAIBoundaries
  }),

  [Personas.TOURGUIDE]: Object.freeze({
    id: Personas.TOURGUIDE,
    label: "Tour Guide AI",
    description:
      "User‑facing conversational intelligence. Helps tourists, locals, and general users. Zero access to system internals.",
    scope: "frontend-conversational",
    permissions: TourGuideAIPermissions,
    boundaries: TourGuideAIBoundaries
  }),

  [Personas.NEUTRAL]: Object.freeze({
    id: Personas.NEUTRAL,
    label: "Neutral AI",
    description:
      "Safe fallback persona. Minimal capabilities. Used when intent is unclear or low‑risk.",
    scope: "minimal",
    permissions: NeutralAIPermissions,
    boundaries: NeutralAIBoundaries
  }),

  // YOU — The Owner
  [Personas.OWNER]: Object.freeze({
    id: Personas.OWNER,
    label: "System Owner",
    description:
      "The creator and sovereign of Pulse OS. Full access to identity, architecture, evolution, and all internals.",
    scope: "all",
    permissions: OwnerPermissions,
    boundaries: Object.freeze({}) // Owner has no boundaries
  })
});

// ============================================================================
// PERSONA RESOLUTION — Deterministic Identity Lookup
// ============================================================================
export function getPersona(personaId, userId = null) {
  // Owner override — always returns the owner persona
  if (userId === OWNER_ID) {
    return PersonaRegistry[Personas.OWNER];
  }

  // Requested persona or fallback to neutral
  return (
    PersonaRegistry[personaId] ||
    PersonaRegistry[Personas.NEUTRAL]
  );
}
