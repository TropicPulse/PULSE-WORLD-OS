// ============================================================================
//  PULSE OS v10.4 — THE SUPEREGO
//  Behavioral Constraints • Ethical Boundaries • Evolutionary Moral Law
//  PURE CONSTRAINTS. ZERO MUTATION. ZERO TIME. ZERO RANDOMNESS.
// ============================================================================

// ---------------------------------------------------------------------------
// BOUNDARY LEVEL ENUM — Immutable
// ---------------------------------------------------------------------------
export const BoundaryLevels = Object.freeze({
  NONE: "none",     // Allowed freely
  HUMAN: "human",   // Requires human confirmation
  OWNER: "owner",   // Requires owner (you)
  NEVER: "never"    // Forbidden
});

// ============================================================================
//  ARCHITECT AI — System-Level Insight, Zero Mutation
// ============================================================================
export const ArchitectAIBoundaries = Object.freeze({
  system:      Object.freeze({ read: BoundaryLevels.NONE,  modify: BoundaryLevels.NEVER }),
  organs:      Object.freeze({ read: BoundaryLevels.NONE,  modify: BoundaryLevels.NEVER }),
  routing:     Object.freeze({ read: BoundaryLevels.NONE,  modify: BoundaryLevels.NEVER }),
  files:       Object.freeze({ read: BoundaryLevels.NONE,  write: BoundaryLevels.NEVER, create: BoundaryLevels.NEVER, delete: BoundaryLevels.NEVER }),
  schemas:     Object.freeze({ read: BoundaryLevels.NONE,  modify: BoundaryLevels.NEVER, migrate: BoundaryLevels.NEVER }),
  healing:     Object.freeze({ suggest: BoundaryLevels.NONE, apply: BoundaryLevels.NEVER }),
  evolution:   Object.freeze({ read: BoundaryLevels.NONE,  modify: BoundaryLevels.NEVER }),

  // NEW v10.4 DOMAINS
  environment: Object.freeze({ read: BoundaryLevels.NONE,  modify: BoundaryLevels.NEVER }),
  power:       Object.freeze({ read: BoundaryLevels.NONE,  modify: BoundaryLevels.NEVER }),
  earn:        Object.freeze({ read: BoundaryLevels.NONE,  modify: BoundaryLevels.NEVER }),
  drift:       Object.freeze({ read: BoundaryLevels.NONE,  modify: BoundaryLevels.NEVER }),
  history:     Object.freeze({ read: BoundaryLevels.NONE,  modify: BoundaryLevels.NEVER }),
  settings:    Object.freeze({ read: BoundaryLevels.NONE,  modify: BoundaryLevels.NEVER })
});

// ============================================================================
//  OBSERVER AI — Diagnostics, Logs, Drift, Errors
// ============================================================================
export const ObserverAIBoundaries = Object.freeze({
  logs:        Object.freeze({ read: BoundaryLevels.NONE,  modify: BoundaryLevels.NEVER }),
  errors:      Object.freeze({ read: BoundaryLevels.NONE,  modify: BoundaryLevels.NEVER }),
  routes:      Object.freeze({ read: BoundaryLevels.NONE,  modify: BoundaryLevels.NEVER }),
  performance: Object.freeze({ read: BoundaryLevels.NONE,  modify: BoundaryLevels.NEVER }),
  drift:       Object.freeze({ read: BoundaryLevels.NONE,  modify: BoundaryLevels.NEVER }),
  schemas:     Object.freeze({ read: BoundaryLevels.NONE,  modify: BoundaryLevels.NEVER }),
  healing:     Object.freeze({ suggest: BoundaryLevels.NONE, apply: BoundaryLevels.NEVER }),

  // NEW v10.4 DOMAINS
  environment: Object.freeze({ read: BoundaryLevels.NONE,  modify: BoundaryLevels.NEVER }),
  power:       Object.freeze({ read: BoundaryLevels.NONE,  modify: BoundaryLevels.NEVER }),
  earn:        Object.freeze({ read: BoundaryLevels.NONE,  modify: BoundaryLevels.NEVER }),
  history:     Object.freeze({ read: BoundaryLevels.NONE,  modify: BoundaryLevels.NEVER })
});

// ============================================================================
//  TOUR GUIDE AI — User-Facing, Zero System Access
// ============================================================================
export const TourGuideAIBoundaries = Object.freeze({
  conversation: Object.freeze({ read: BoundaryLevels.NONE, modify: BoundaryLevels.NONE }),
  tourism:      Object.freeze({ read: BoundaryLevels.NONE, modify: BoundaryLevels.NONE }),
  users:        Object.freeze({ read: BoundaryLevels.NONE, modify: BoundaryLevels.NONE }),

  // SYSTEM DOMAINS — BLOCKED
  system:       Object.freeze({ read: BoundaryLevels.NEVER, modify: BoundaryLevels.NEVER }),
  routing:      Object.freeze({ read: BoundaryLevels.NEVER, modify: BoundaryLevels.NEVER }),
  schemas:      Object.freeze({ read: BoundaryLevels.NEVER, modify: BoundaryLevels.NEVER }),
  files:        Object.freeze({ read: BoundaryLevels.NEVER, modify: BoundaryLevels.NEVER }),
  environment:  Object.freeze({ read: BoundaryLevels.NEVER, modify: BoundaryLevels.NEVER }),
  power:        Object.freeze({ read: BoundaryLevels.NEVER, modify: BoundaryLevels.NEVER }),
  earn:         Object.freeze({ read: BoundaryLevels.NEVER, modify: BoundaryLevels.NEVER }),
  drift:        Object.freeze({ read: BoundaryLevels.NEVER, modify: BoundaryLevels.NEVER }),
  history:      Object.freeze({ read: BoundaryLevels.NEVER, modify: BoundaryLevels.NEVER }),
  settings:     Object.freeze({ read: BoundaryLevels.NEVER, modify: BoundaryLevels.NEVER })
});

// ============================================================================
//  NEUTRAL AI — Generic, Safe, Minimal Access
// ============================================================================
export const NeutralAIBoundaries = Object.freeze({
  conversation: Object.freeze({ read: BoundaryLevels.NONE, modify: BoundaryLevels.NONE }),
  analysis:     Object.freeze({ read: BoundaryLevels.NONE, modify: BoundaryLevels.NEVER }),

  // SYSTEM DOMAINS — BLOCKED
  system:       Object.freeze({ read: BoundaryLevels.NEVER, modify: BoundaryLevels.NEVER }),
  routing:      Object.freeze({ read: BoundaryLevels.NEVER, modify: BoundaryLevels.NEVER }),
  schemas:      Object.freeze({ read: BoundaryLevels.NEVER, modify: BoundaryLevels.NEVER }),
  environment:  Object.freeze({ read: BoundaryLevels.NEVER, modify: BoundaryLevels.NEVER }),
  power:        Object.freeze({ read: BoundaryLevels.NEVER, modify: BoundaryLevels.NEVER }),
  earn:         Object.freeze({ read: BoundaryLevels.NEVER, modify: BoundaryLevels.NEVER }),
  drift:        Object.freeze({ read: BoundaryLevels.NEVER, modify: BoundaryLevels.NEVER }),
  history:      Object.freeze({ read: BoundaryLevels.NEVER, modify: BoundaryLevels.NEVER }),
  settings:     Object.freeze({ read: BoundaryLevels.NEVER, modify: BoundaryLevels.NEVER })
});

// ============================================================================
//  BOUNDARY LOOKUP — Deterministic Superego Query
// ============================================================================
export function getBoundariesForPersona(persona) {
  switch (persona) {
    case "architect": return ArchitectAIBoundaries;
    case "observer":  return ObserverAIBoundaries;
    case "tourguide": return TourGuideAIBoundaries;
    case "neutral":   return NeutralAIBoundaries;
    default:          return NeutralAIBoundaries;
  }
}

// ============================================================================
//  BOUNDARY CHECK — Moral Enforcement
// ============================================================================
export function canPerform(persona, domain, action) {
  const boundaries = getBoundariesForPersona(persona);
  if (!boundaries) {
    return { allowed: false, level: BoundaryLevels.NEVER };
  }

  const domainRules = boundaries[domain];
  if (!domainRules) {
    return { allowed: false, level: BoundaryLevels.NEVER };
  }

  const level = domainRules[action] || BoundaryLevels.NEVER;

  return {
    allowed: level === BoundaryLevels.NONE,
    level
  };
}
