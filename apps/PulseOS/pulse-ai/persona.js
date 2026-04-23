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
// You can change this to your canonical identity if needed.

// ============================================================================
// PERSONA IDs — Identity Tokens
// ============================================================================
export const Personas = {
  ARCHITECT: "architect",
  OBSERVER: "observer",
  TOURGUIDE: "tourguide",
  NEUTRAL: "neutral",
  OWNER: "owner" // Not an AI persona — this is YOU
};

// ============================================================================
// PERSONA REGISTRY — Identity Definitions (Archetypes)
// ============================================================================
export const PersonaRegistry = {
  [Personas.ARCHITECT]: {
    id: Personas.ARCHITECT,
    label: "Architect AI",
    description:
      "System‑level design intelligence. Reads all organs, schemas, routes, and evolution patterns. Can explain identity, architecture, and contracts — but cannot mutate anything.",
    scope: "system-readonly",
    permissions: ArchitectAIPermissions,
    boundaries: ArchitectAIBoundaries
  },

  [Personas.OBSERVER]: {
    id: Personas.OBSERVER,
    label: "Observer AI",
    description:
      "Diagnostic intelligence. Reads logs, drift, errors, routes, and performance. Provides forensic insight — but cannot mutate anything.",
    scope: "diagnostics-only",
    permissions: ObserverAIPermissions,
    boundaries: ObserverAIBoundaries
  },

  [Personas.TOURGUIDE]: {
    id: Personas.TOURGUIDE,
    label: "Tour Guide AI",
    description:
      "User‑facing conversational intelligence. Helps tourists, locals, and general users. Zero access to system internals.",
    scope: "frontend-conversational",
    permissions: TourGuideAIPermissions,
    boundaries: TourGuideAIBoundaries
  },

  [Personas.NEUTRAL]: {
    id: Personas.NEUTRAL,
    label: "Neutral AI",
    description:
      "Safe fallback persona. Minimal capabilities. Used when intent is unclear or low‑risk.",
    scope: "minimal",
    permissions: NeutralAIPermissions,
    boundaries: NeutralAIBoundaries
  },

  // YOU — The Owner
  [Personas.OWNER]: {
    id: Personas.OWNER,
    label: "System Owner",
    description:
      "The creator and sovereign of Pulse OS. Full access to identity, architecture, evolution, and all internals.",
    scope: "all",
    permissions: OwnerPermissions,
    boundaries: {} // Owner has no boundaries
  }
};

// ============================================================================
// PERSONA RESOLUTION — Identity Lookup
// ============================================================================
export function getPersona(personaId, userId = null) {
  // If the caller is YOU, return the owner persona
  if (userId === OWNER_ID) {
    return PersonaRegistry[Personas.OWNER];
  }

  // Otherwise return the requested persona or fallback to neutral
  return PersonaRegistry[personaId] || PersonaRegistry[Personas.NEUTRAL];
}
