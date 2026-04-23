// ============================================================================
//  PULSE OS v10.4 — THE SUPEREGO
//  Behavioral Constraints • Ethical Boundaries • Evolutionary Moral Law
//  PURE CONSTRAINTS. ZERO MUTATION. ZERO TIME. ZERO RANDOMNESS.
// ============================================================================

export const BoundaryLevels = {
  NONE: "none",     // Allowed freely
  HUMAN: "human",   // Requires human confirmation
  OWNER: "owner",   // Requires owner (you)
  NEVER: "never"    // Forbidden
};

// ============================================================================
//  ARCHITECT AI — System-Level Insight, Zero Mutation
// ============================================================================
export const ArchitectAIBoundaries = {
  system: { read: BoundaryLevels.NONE, modify: BoundaryLevels.NEVER },
  organs: { read: BoundaryLevels.NONE, modify: BoundaryLevels.NEVER },
  routing:{ read: BoundaryLevels.NONE, modify: BoundaryLevels.NEVER },
  files:  { read: BoundaryLevels.NONE, write: BoundaryLevels.NEVER, create: BoundaryLevels.NEVER, delete: BoundaryLevels.NEVER },
  schemas:{ read: BoundaryLevels.NONE, modify: BoundaryLevels.NEVER, migrate: BoundaryLevels.NEVER },
  healing:{ suggest: BoundaryLevels.NONE, apply: BoundaryLevels.NEVER },
  evolution:{ read: BoundaryLevels.NONE, modify: BoundaryLevels.NEVER },

  // NEW v10.4 DOMAINS
  environment:{ read: BoundaryLevels.NONE, modify: BoundaryLevels.NEVER },
  power:{ read: BoundaryLevels.NONE, modify: BoundaryLevels.NEVER },
  earn:{ read: BoundaryLevels.NONE, modify: BoundaryLevels.NEVER },
  drift:{ read: BoundaryLevels.NONE, modify: BoundaryLevels.NEVER },
  history:{ read: BoundaryLevels.NONE, modify: BoundaryLevels.NEVER },
  settings:{ read: BoundaryLevels.NONE, modify: BoundaryLevels.NEVER }
};

// ============================================================================
//  OBSERVER AI — Diagnostics, Logs, Drift, Errors
// ============================================================================
export const ObserverAIBoundaries = {
  logs:{ read: BoundaryLevels.NONE, modify: BoundaryLevels.NEVER },
  errors:{ read: BoundaryLevels.NONE, modify: BoundaryLevels.NEVER },
  routes:{ read: BoundaryLevels.NONE, modify: BoundaryLevels.NEVER },
  performance:{ read: BoundaryLevels.NONE, modify: BoundaryLevels.NEVER },
  drift:{ read: BoundaryLevels.NONE, modify: BoundaryLevels.NEVER },
  schemas:{ read: BoundaryLevels.NONE, modify: BoundaryLevels.NEVER },
  healing:{ suggest: BoundaryLevels.NONE, apply: BoundaryLevels.NEVER },

  // NEW v10.4 DOMAINS
  environment:{ read: BoundaryLevels.NONE, modify: BoundaryLevels.NEVER },
  power:{ read: BoundaryLevels.NONE, modify: BoundaryLevels.NEVER },
  earn:{ read: BoundaryLevels.NONE, modify: BoundaryLevels.NEVER },
  history:{ read: BoundaryLevels.NONE, modify: BoundaryLevels.NEVER }
};

// ============================================================================
//  TOUR GUIDE AI — User-Facing, Zero System Access
// ============================================================================
export const TourGuideAIBoundaries = {
  conversation:{ read: BoundaryLevels.NONE, modify: BoundaryLevels.NONE },
  tourism:{ read: BoundaryLevels.NONE, modify: BoundaryLevels.NONE },
  users:{ read: BoundaryLevels.NONE, modify: BoundaryLevels.NONE },

  // SYSTEM DOMAINS — BLOCKED
  system:{ read: BoundaryLevels.NEVER, modify: BoundaryLevels.NEVER },
  routing:{ read: BoundaryLevels.NEVER, modify: BoundaryLevels.NEVER },
  schemas:{ read: BoundaryLevels.NEVER, modify: BoundaryLevels.NEVER },
  files:{ read: BoundaryLevels.NEVER, modify: BoundaryLevels.NEVER },
  environment:{ read: BoundaryLevels.NEVER, modify: BoundaryLevels.NEVER },
  power:{ read: BoundaryLevels.NEVER, modify: BoundaryLevels.NEVER },
  earn:{ read: BoundaryLevels.NEVER, modify: BoundaryLevels.NEVER },
  drift:{ read: BoundaryLevels.NEVER, modify: BoundaryLevels.NEVER },
  history:{ read: BoundaryLevels.NEVER, modify: BoundaryLevels.NEVER },
  settings:{ read: BoundaryLevels.NEVER, modify: BoundaryLevels.NEVER }
};

// ============================================================================
//  NEUTRAL AI — Generic, Safe, Minimal Access
// ============================================================================
export const NeutralAIBoundaries = {
  conversation:{ read: BoundaryLevels.NONE, modify: BoundaryLevels.NONE },
  analysis:{ read: BoundaryLevels.NONE, modify: BoundaryLevels.NEVER },

  // SYSTEM DOMAINS — BLOCKED
  system:{ read: BoundaryLevels.NEVER, modify: BoundaryLevels.NEVER },
  routing:{ read: BoundaryLevels.NEVER, modify: BoundaryLevels.NEVER },
  schemas:{ read: BoundaryLevels.NEVER, modify: BoundaryLevels.NEVER },
  environment:{ read: BoundaryLevels.NEVER, modify: BoundaryLevels.NEVER },
  power:{ read: BoundaryLevels.NEVER, modify: BoundaryLevels.NEVER },
  earn:{ read: BoundaryLevels.NEVER, modify: BoundaryLevels.NEVER },
  drift:{ read: BoundaryLevels.NEVER, modify: BoundaryLevels.NEVER },
  history:{ read: BoundaryLevels.NEVER, modify: BoundaryLevels.NEVER },
  settings:{ read: BoundaryLevels.NEVER, modify: BoundaryLevels.NEVER }
};

// ============================================================================
//  BOUNDARY LOOKUP — Superego Query
// ============================================================================
export function getBoundariesForPersona(persona) {
  switch (persona) {
    case "architect": return ArchitectAIBoundaries;
    case "observer": return ObserverAIBoundaries;
    case "tourguide": return TourGuideAIBoundaries;
    case "neutral": return NeutralAIBoundaries;
    default: return NeutralAIBoundaries;
  }
}

// ============================================================================
//  BOUNDARY CHECK — Moral Enforcement
// ============================================================================
export function canPerform(persona, domain, action) {
  const boundaries = getBoundariesForPersona(persona);
  if (!boundaries) return { allowed: false, level: BoundaryLevels.NEVER };

  const domainRules = boundaries[domain];
  if (!domainRules) return { allowed: false, level: BoundaryLevels.NEVER };

  const level = domainRules[action] || BoundaryLevels.NEVER;

  return {
    allowed: level === BoundaryLevels.NONE,
    level
  };
}
