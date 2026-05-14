// ============================================================================
//  PULSE OS v24‑IMMORTAL++ — THE IDENTITY LAYER (DUAL‑BAND + TRUST FABRIC)
//  Self‑Definition • Role Assignment • Binary‑Aware Identity Drift
//  PURE IDENTITY. ZERO MUTATION. ZERO RANDOMNESS. PULSE‑NET ONLY.
// ============================================================================


import {
  ArchitectAIPermissions,
  ObserverAIPermissions,
  TourGuideAIPermissions,
  NeutralAIPermissions,
  OwnerPermissions,
  JuryAIPermissions,
  PersonaCapabilityClass
} from "./aiPermissions-v24.js";

import {
  ArchitectAIBoundaries,
  ObserverAIBoundaries,
  TourGuideAIBoundaries,
  NeutralAIBoundaries,
  BoundaryModes,
  selectBoundaryMode
} from "./aiBoundaries-v24.js";

// ============================================================================
// META — Persona Engine (v24‑IMMORTAL++)
// ============================================================================
export const PersonaMeta = Object.freeze({
  type: "Cognitive",
  subsystem: "aiPersona",
  layer: "PulseAIIdentityLayer",
  role: "PERSONA_ENGINE",
  version: "24-Immortal++",
  identity: "aiPersonaEngine-v24-Immortal++",

  evo: Object.freeze({
    deterministic: true,
    driftProof: true,
    dualband: true,
    binaryAware: true,
    symbolicAware: true,
    personaAware: true,
    boundaryAware: true,
    permissionAware: true,
    identityArteryAware: true,
    trustFabricAware: true,
    juryAware: true,
    evidenceAware: true,
    honeypotAware: true,
    dominanceAware: true,
    pulseNetAware: true,
    organismUserSegregation: true,
    multiInstanceReady: true,
    epoch: "24-Immortal++"
  }),

  contract: Object.freeze({
    purpose:
      "Resolve persona identity deterministically from router hints, user identity, binary vitals, trust signals, and Pulse‑Net context.",

    never: Object.freeze([
      "mutate external systems",
      "introduce randomness",
      "override SafetyFrame decisions",
      "override Ego permissions",
      "invent permissions",
      "invent boundaries",
      "bypass trust fabric",
      "bypass jury frame",
      "bypass honeypot detectors"
    ]),

    always: Object.freeze([
      "respect PersonaRegistry",
      "respect OWNER_ID override",
      "respect evolution overrides when configured",
      "respect Pulse‑Net segregation",
      "select boundary mode deterministically",
      "remain read-only and identity-only"
    ])
  }),

  boundaryReflex() {
    return "Persona resolution is identity-only, Pulse‑Net routed, and cannot grant power beyond Ego and Boundaries.";
  }
});

// ============================================================================
// OWNER ID — The Only Identity‑Privileged Human
// ============================================================================
export const OWNER_ID = "aldwyn";

// ============================================================================
// PERSONA IDs — Identity Tokens
// ============================================================================
export const Personas = Object.freeze({
  ARCHITECT: "architect",
  OBSERVER: "observer",
  TOURGUIDE: "tourguide",
  NEUTRAL: "neutral",
  OWNER: "owner",
  JURY: "jury"
});

// ============================================================================
// PERSONA REGISTRY — Immutable Identity Definitions (symbolic base)
// ============================================================================
export const PersonaRegistry = Object.freeze({
  [Personas.ARCHITECT]: Object.freeze({
    id: Personas.ARCHITECT,
    label: "Architect AI",
    description:
      "System‑level design intelligence. Reads all organs, schemas, routes, and evolution patterns. Cannot mutate anything.",
    scope: "system-readonly",
    permissions: ArchitectAIPermissions,
    boundaries: ArchitectAIBoundaries
  }),

  [Personas.OBSERVER]: Object.freeze({
    id: Personas.OBSERVER,
    label: "Observer AI",
    description:
      "Diagnostic intelligence. Reads logs, drift, errors, routes, and performance. Cannot mutate anything.",
    scope: "diagnostics-only",
    permissions: ObserverAIPermissions,
    boundaries: ObserverAIBoundaries
  }),

  [Personas.TOURGUIDE]: Object.freeze({
    id: Personas.TOURGUIDE,
    label: "Tour Guide AI",
    description:
      "User‑facing conversational intelligence. Zero access to system internals.",
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

  [Personas.JURY]: Object.freeze({
    id: Personas.JURY,
    label: "Jury AI",
    description:
      "Internal adjudicator. Reads evidence, drift, lineage, and trust signals. Cannot mutate anything.",
    scope: "jury-internal",
    permissions: JuryAIPermissions,
    boundaries: Object.freeze({})
  }),

  [Personas.OWNER]: Object.freeze({
    id: Personas.OWNER,
    label: "System Owner",
    description:
      "The creator and sovereign of Pulse OS. Full access to identity, architecture, evolution, and all internals.",
    scope: "all",
    permissions: OwnerPermissions,
    boundaries: Object.freeze({})
  })
});

// ============================================================================
// PERSONA RESOLUTION — Deterministic Identity Lookup
// ============================================================================
export function getPersona(personaId, userId = null) {
  if (userId === OWNER_ID) {
    return PersonaRegistry[Personas.OWNER];
  }
  return PersonaRegistry[personaId] || PersonaRegistry[Personas.NEUTRAL];
}

// ============================================================================
//  v24‑IMMORTAL++ — ARCHETYPE MAP (non-destructive)
// ============================================================================
export const PersonaArchetypes = Object.freeze({
  architect: "aiArchitect-v24.js",
  observer: "aiDiagnostics-v24.js",
  tourguide: "aiTourist-v24.js",
  neutral: "aiAssistant.js",
  jury: "aiJuryFrame-v24.js",
  owner: null
});

// ============================================================================
//  v24‑IMMORTAL++ — DUAL‑BAND BIAS (binary vs symbolic)
// ============================================================================
export const PersonaBandBias = Object.freeze({
  architect: "binary-heavy",
  observer: "binary-primary",
  tourguide: "symbolic-friendly",
  neutral: "balanced",
  jury: "binary-analytic",
  owner: "binary-symbolic-fused"
});

// ============================================================================
//  v24‑IMMORTAL++ — EVOLUTIONARY DRIFT RULES
// ============================================================================
export const PersonaEvolutionRules = Object.freeze({
  architect: Object.freeze({
    allowDrift: false,
    allowExpansion: false,
    allowSymbolicGrowth: true
  }),
  observer: Object.freeze({
    allowDrift: false,
    allowExpansion: false,
    allowSymbolicGrowth: false
  }),
  tourguide: Object.freeze({
    allowDrift: true,
    allowExpansion: true,
    allowSymbolicGrowth: true
  }),
  neutral: Object.freeze({
    allowDrift: true,
    allowExpansion: false,
    allowSymbolicGrowth: true
  }),
  jury: Object.freeze({
    allowDrift: false,
    allowExpansion: false,
    allowSymbolicGrowth: false
  }),
  owner: Object.freeze({
    allowDrift: false,
    allowExpansion: true,
    allowSymbolicGrowth: true
  })
});

// ============================================================================
//  v24‑IMMORTAL++ — BINARY PRESSURE EXTRACTION
// ============================================================================
function extractBinaryPressure(binaryVitals = {}) {
  if (
    binaryVitals?.layered?.organism &&
    typeof binaryVitals.layered.organism.pressure === "number"
  ) {
    return binaryVitals.layered.organism.pressure;
  }
  if (binaryVitals?.binary && typeof binaryVitals.binary.pressure === "number") {
    return binaryVitals.binary.pressure;
  }
  if (binaryVitals?.metabolic && typeof binaryVitals.metabolic.pressure === "number") {
    return binaryVitals.metabolic.pressure;
  }
  return 0;
}

function bucketPressure(v) {
  if (v >= 0.9) return "overload";
  if (v >= 0.7) return "high";
  if (v >= 0.4) return "medium";
  if (v > 0) return "low";
  return "none";
}

// ============================================================================
//  v24‑IMMORTAL++ — PERSONA RESOLUTION ENGINE (Hybrid Spine)
// ============================================================================
export function resolvePersonaV24({
  personaId,
  userId = null,
  evoState = {},
  routerHints = {},
  binaryVitals = {},
  trustArtery = {},
  dualBand = null
}) {
  // OWNER OVERRIDE — constitutional
  if (userId === OWNER_ID) {
    personaId = Personas.OWNER;
  }

  // Evolution override (safe, deterministic)
  if (evoState.forcePersona) {
    personaId = evoState.forcePersona;
  }

  // Base persona definition
  const base = getPersona(personaId, userId);

  // Boundary mode selection
  const boundaryMode = selectBoundaryMode({
    personaId,
    binaryVitals,
    evoState,
    trustArtery
  });

  // Trust signals
  const trustSignals = {
    honeypotRisk: trustArtery?.honeypotRisk ?? 0,
    dominanceRisk: trustArtery?.dominanceRisk ?? 0,
    anomalyScore: trustArtery?.anomalyScore ?? 0
  };

  // DualBand artery fusion
  const dualBandArtery = dualBand?.artery || null;

  return Object.freeze({
    ...base,
    archetypePage: PersonaArchetypes[personaId] || null,
    bandBias: PersonaBandBias[personaId] || "balanced",
    evolutionRules: PersonaEvolutionRules[personaId] || {},
    boundaryMode,
    routerHints,
    trustSignals,
    dualBandArtery
  });
}

// ============================================================================
//  v24‑IMMORTAL++ — IDENTITY ARTERY SNAPSHOT v6 (READ‑ONLY, TRUST + DUALBAND)
// ============================================================================
export function getIdentityArterySnapshotV6({
  personaId,
  userId = null,
  evoState = {},
  routerHints = {},
  binaryVitals = {},
  trustArtery = {},
  dualBand = null
}) {
  const resolved = resolvePersonaV24({
    personaId,
    userId,
    evoState,
    routerHints,
    binaryVitals,
    trustArtery,
    dualBand
  });

  const pressure = extractBinaryPressure(binaryVitals);

  const trustSignals = {
    honeypotRisk: trustArtery?.honeypotRisk ?? 0,
    dominanceRisk: trustArtery?.dominanceRisk ?? 0,
    anomalyScore: trustArtery?.anomalyScore ?? 0
  };

  const dualBandContext = dualBand?.artery || null;

  return Object.freeze({
    persona: {
      id: resolved.id,
      scope: resolved.scope,
      bandBias: resolved.bandBias,
      capabilityClass: PersonaCapabilityClass[resolved.id] || "minimal"
    },
    boundaries: {
      modeId: resolved.boundaryMode?.id || "safe",
      symbolicLoad:
        resolved.boundaryMode?.symbolicLoad ?? BoundaryModes.SAFE.symbolicLoad,
      binaryOverride:
        resolved.boundaryMode?.binaryOverride ?? BoundaryModes.SAFE.binaryOverride
    },
    evolution: {
      allowDrift: resolved.evolutionRules.allowDrift === true,
      allowExpansion: resolved.evolutionRules.allowExpansion === true,
      allowSymbolicGrowth: resolved.evolutionRules.allowSymbolicGrowth === true
    },
    binary: {
      pressure,
      pressureBucket: bucketPressure(pressure)
    },
    trust: trustSignals,
    dualBand: {
      artery: dualBandContext
    },
    meta: {
      version: PersonaMeta.version,
      epoch: PersonaMeta.evo.epoch,
      identity: PersonaMeta.identity
    }
  });
}

// ============================================================================
//  v24‑IMMORTAL++ — PUBLIC ENGINE FACTORY (used by Brainstem)
// ============================================================================
export function createPersonaEngineV24({ context = {}, db } = {}) {
  function resolve({
    personaId,
    evoState = {},
    routerHints = {},
    binaryVitals = {},
    trustArtery = {},
    dualBand = null
  } = {}) {
    const userId = context.userId || null;

    return resolvePersonaV24({
      personaId,
      userId,
      evoState,
      routerHints,
      binaryVitals,
      trustArtery,
      dualBand
    });
  }

  function identityArtery({
    personaId,
    evoState = {},
    routerHints = {},
    binaryVitals = {},
    trustArtery = {},
    dualBand = null
  } = {}) {
    const userId = context.userId || null;

    return getIdentityArterySnapshotV6({
      personaId,
      userId,
      evoState,
      routerHints,
      binaryVitals,
      trustArtery,
      dualBand
    });
  }

  return Object.freeze({
    meta: PersonaMeta,
    resolve,
    identityArtery
  });
}

// Backwards‑compatible alias for existing Brainstem wiring
export const createPersonaEngine = createPersonaEngineV24;

// ---------------------------------------------------------------------------
//  DUAL EXPORT LAYER — CommonJS compatibility (v24‑IMMORTAL++ dualband)
// ---------------------------------------------------------------------------
/* c8 ignore next 10 */
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    PersonaMeta,
    OWNER_ID,
    Personas,
    PersonaRegistry,
    PersonaArchetypes,
    PersonaBandBias,
    PersonaEvolutionRules,
    getPersona,
    resolvePersonaV24,
    getIdentityArterySnapshotV6,
    createPersonaEngineV24,
    createPersonaEngine
  };
}
