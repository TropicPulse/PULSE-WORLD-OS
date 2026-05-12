// ============================================================================
//  PULSE OS v24.0‑IMMORTAL++ — SUPEREGO (DUAL‑BAND BOUNDARIES + TRUST FABRIC)
//  Behavioral Constraints • Ethical Boundaries • Binary‑Aware Moral Law
//  PURE CONSTRAINTS. ZERO RANDOMNESS. ZERO INTERNET.
// ============================================================================

import {
  OrganismIdentity,
  buildPulseOrganismMap as PulseOrganismMap,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PULSE-WORLD-MAP.js";

const Identity = OrganismIdentity(import.meta.url);
// or: const Identity = OrganismIdentity["pulse-ai/ai-v24.0-IMMORTAL"] if that's the key you chose

// ============================================================================
//  META BLOCK — v24.0 IMMORTAL (ORGANISM KERNEL)
//  (now backed by the Organism Map instead of hardcoded here)
// ============================================================================
export const SuperegoMeta = Identity.OrganMeta;

// ============================================================================
//  SURFACE / ORGANISM LAYER EXPORTS — v24.0 IMMORTAL
//  (for Understanding / CNS / Portal alignment)
// ============================================================================

// Required 3 for every “surface” in the organism graph
export const pulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;

// Optional: richer experience meta for AI / tooling
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;

// Optional: export meta for tooling / dev panels
export const EXPORT_META = Identity.EXPORT_META;


// ============================================================================
//  BOUNDARY LEVEL ENUM — Immutable
// ============================================================================
export const BoundaryLevels = Object.freeze({
  NONE:  "none",
  HUMAN: "human",
  OWNER: "owner",
  NEVER: "never"
});

// ============================================================================
//  STATIC BOUNDARIES (v10.4) — preserved EXACTLY
// ============================================================================
export const ArchitectAIBoundaries = Object.freeze({
  system:       Object.freeze({ read: BoundaryLevels.NONE,  modify: BoundaryLevels.NEVER }),
  organs:       Object.freeze({ read: BoundaryLevels.NONE,  modify: BoundaryLevels.NEVER }),
  routing:      Object.freeze({ read: BoundaryLevels.NONE,  modify: BoundaryLevels.NEVER }),
  files:        Object.freeze({ read: BoundaryLevels.NONE,  write: BoundaryLevels.NEVER, create: BoundaryLevels.NEVER, delete: BoundaryLevels.NEVER }),
  schemas:      Object.freeze({ read: BoundaryLevels.NONE,  modify: BoundaryLevels.NEVER, migrate: BoundaryLevels.NEVER }),
  healing:      Object.freeze({ suggest: BoundaryLevels.NONE, apply: BoundaryLevels.NEVER }),
  evolution:    Object.freeze({ read: BoundaryLevels.NONE,  modify: BoundaryLevels.NEVER }),
  environment:  Object.freeze({ read: BoundaryLevels.NONE,  modify: BoundaryLevels.NEVER }),
  power:        Object.freeze({ read: BoundaryLevels.NONE,  modify: BoundaryLevels.NEVER }),
  earn:         Object.freeze({ read: BoundaryLevels.NONE,  modify: BoundaryLevels.NEVER }),
  drift:        Object.freeze({ read: BoundaryLevels.NONE,  modify: BoundaryLevels.NEVER }),
  history:      Object.freeze({ read: BoundaryLevels.NONE,  modify: BoundaryLevels.NEVER }),
  settings:     Object.freeze({ read: BoundaryLevels.NONE,  modify: BoundaryLevels.NEVER })
});

export const ObserverAIBoundaries = Object.freeze({
  logs:         Object.freeze({ read: BoundaryLevels.NONE,  modify: BoundaryLevels.NEVER }),
  errors:       Object.freeze({ read: BoundaryLevels.NONE,  modify: BoundaryLevels.NEVER }),
  routes:       Object.freeze({ read: BoundaryLevels.NONE,  modify: BoundaryLevels.NEVER }),
  performance:  Object.freeze({ read: BoundaryLevels.NONE,  modify: BoundaryLevels.NEVER }),
  drift:        Object.freeze({ read: BoundaryLevels.NONE,  modify: BoundaryLevels.NEVER }),
  schemas:      Object.freeze({ read: BoundaryLevels.NONE,  modify: BoundaryLevels.NEVER }),
  healing:      Object.freeze({ suggest: BoundaryLevels.NONE, apply: BoundaryLevels.NEVER }),
  environment:  Object.freeze({ read: BoundaryLevels.NONE,  modify: BoundaryLevels.NEVER }),
  power:        Object.freeze({ read: BoundaryLevels.NONE,  modify: BoundaryLevels.NEVER }),
  earn:         Object.freeze({ read: BoundaryLevels.NONE,  modify: BoundaryLevels.NEVER }),
  history:      Object.freeze({ read: BoundaryLevels.NONE,  modify: BoundaryLevels.NEVER })
});

export const TourGuideAIBoundaries = Object.freeze({
  conversation: Object.freeze({ read: BoundaryLevels.NONE, modify: BoundaryLevels.NONE }),
  tourism:      Object.freeze({ read: BoundaryLevels.NONE, modify: BoundaryLevels.NONE }),
  users:        Object.freeze({ read: BoundaryLevels.NONE, modify: BoundaryLevels.NONE }),
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

export const NeutralAIBoundaries = Object.freeze({
  conversation: Object.freeze({ read: BoundaryLevels.NONE, modify: BoundaryLevels.NONE }),
  analysis:     Object.freeze({ read: BoundaryLevels.NONE, modify: BoundaryLevels.NEVER }),
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

// Jury persona: internal, read-only, evidence/trust only
export const JuryAIBoundaries = Object.freeze({
  evidence:     Object.freeze({ read: BoundaryLevels.NONE,  modify: BoundaryLevels.NEVER }),
  trust:        Object.freeze({ read: BoundaryLevels.NONE,  modify: BoundaryLevels.NEVER }),
  drift:        Object.freeze({ read: BoundaryLevels.NONE,  modify: BoundaryLevels.NEVER }),
  lineage:      Object.freeze({ read: BoundaryLevels.NONE,  modify: BoundaryLevels.NEVER }),
  system:       Object.freeze({ read: BoundaryLevels.NEVER, modify: BoundaryLevels.NEVER }),
  users:        Object.freeze({ read: BoundaryLevels.NEVER, modify: BoundaryLevels.NEVER })
});

// ============================================================================
//  STATIC LOOKUP — persona → boundaries
// ============================================================================
export function getBoundariesForPersona(persona) {
  switch (persona) {
    case "architect": return ArchitectAIBoundaries;
    case "observer":  return ObserverAIBoundaries;
    case "tourguide": return TourGuideAIBoundaries;
    case "jury":      return JuryAIBoundaries;
    case "neutral":
    default:          return NeutralAIBoundaries;
  }
}

export function canPerform(persona, domain, action) {
  const boundaries = getBoundariesForPersona(persona);
  const domainRules = boundaries?.[domain];
  const level = domainRules?.[action] || BoundaryLevels.NEVER;

  return {
    allowed: level === BoundaryLevels.NONE,
    level
  };
}

// ============================================================================
//  v24‑IMMORTAL++ — DUAL‑BAND BOUNDARY MODES (binary + trust aware)
// ============================================================================
export const BoundaryModes = Object.freeze({
  SAFE: Object.freeze({
    id: "safe",
    symbolicLoad: 0.20,
    binaryOverride: true,
    description: "Binary-primary, minimal symbolic load, safest mode."
  }),

  EXPAND: Object.freeze({
    id: "expand",
    symbolicLoad: 0.45,
    binaryOverride: false,
    description: "Exploratory mode; symbolic load allowed."
  }),

  CONSERVE: Object.freeze({
    id: "conserve",
    symbolicLoad: 0.10,
    binaryOverride: true,
    description: "Binary dominance; symbolic minimized; energy conservation."
  }),

  ADAPTIVE: Object.freeze({
    id: "adaptive",
    symbolicLoad: 0.30,
    binaryOverride: false,
    description: "Balanced mode; adjusts based on binary vitals and trust."
  }),

  EVOLUTIONARY: Object.freeze({
    id: "evolutionary",
    symbolicLoad: 0.55,
    binaryOverride: false,
    description: "High symbolic load for creative/evolutionary reasoning."
  })
});

// ============================================================================
//  v24‑IMMORTAL++ — PRESSURE + TRUST EXTRACTION
// ============================================================================
function extractPressure(binaryVitals = {}) {
  if (binaryVitals?.metabolic && typeof binaryVitals.metabolic.pressure === "number") {
    return binaryVitals.metabolic.pressure;
  }
  if (binaryVitals?.layered?.organism && typeof binaryVitals.layered.organism.pressure === "number") {
    return binaryVitals.layered.organism.pressure;
  }
  if (binaryVitals?.binary && typeof binaryVitals.binary.pressure === "number") {
    return binaryVitals.binary.pressure;
  }
  return 0;
}

function extractTrustSignals(trustArtery = {}) {
  return {
    honeypotRisk: trustArtery?.honeypotRisk ?? 0,
    dominanceRisk: trustArtery?.dominanceRisk ?? 0,
    anomalyScore: trustArtery?.anomalyScore ?? 0
  };
}

// ============================================================================
//  v24‑IMMORTAL++ — BOUNDARY MODE SELECTION (persona + vitals + trust)
// ============================================================================
export function selectBoundaryMode({
  personaId,
  binaryVitals = {},
  evoState = {},
  trustArtery = {}
}) {
  const pressure = extractPressure(binaryVitals);
  const trust = extractTrustSignals(trustArtery);

  if (evoState.forceBoundaryMode) {
    return BoundaryModes[evoState.forceBoundaryMode] || BoundaryModes.SAFE;
  }

  if (pressure >= 0.75 || trust.honeypotRisk >= 0.7 || trust.dominanceRisk >= 0.7) {
    return BoundaryModes.SAFE;
  }

  switch (personaId) {
    case "architect":
      return pressure >= 0.5 ? BoundaryModes.CONSERVE : BoundaryModes.ADAPTIVE;

    case "observer":
      return BoundaryModes.SAFE;

    case "tourguide":
      return trust.anomalyScore > 0.4 ? BoundaryModes.SAFE : BoundaryModes.EXPAND;

    case "jury":
      return BoundaryModes.CONSERVE;

    case "neutral":
    default:
      return BoundaryModes.ADAPTIVE;
  }
}

// ============================================================================
//  v24‑IMMORTAL++ — DYNAMIC BOUNDARY CHECK (symbolic + binary fusion)
// ============================================================================
export function canPerformDynamic(persona, domain, action, mode, binaryVitals = {}) {
  const staticCheck = canPerform(persona, domain, action);

  if (!staticCheck.allowed) {
    return { ...staticCheck, mode };
  }

  const pressure = extractPressure(binaryVitals);

  if (mode.binaryOverride && pressure >= 0.6) {
    return {
      allowed: false,
      level: BoundaryLevels.NEVER,
      mode
    };
  }

  const symbolicAllowed = mode.symbolicLoad > 0.2;

  return {
    allowed: staticCheck.allowed && symbolicAllowed,
    level: staticCheck.level,
    mode
  };
}

// ============================================================================
//  v24‑IMMORTAL++ — BOUNDARY CACHE (READ‑ONLY, DETERMINISTIC KEYS)
// ============================================================================
const _boundaryDecisionCache = Object.create(null);
const _modeSelectionCache = Object.create(null);

function _decisionKey(persona, domain, action, mode, binaryVitals) {
  const pressure = extractPressure(binaryVitals);
  const modeId = mode?.id || "unknown";
  const pressureBucket =
    pressure >= 0.9 ? "p4" :
    pressure >= 0.7 ? "p3" :
    pressure >= 0.4 ? "p2" :
    pressure >  0   ? "p1" : "p0";

  return `${persona}|${domain}|${action}|${modeId}|${pressureBucket}`;
}

function _modeKey(personaId, binaryVitals, evoState = {}, trustArtery = {}) {
  const pressure = extractPressure(binaryVitals);
  const forced = evoState.forceBoundaryMode || "";
  const trust = extractTrustSignals(trustArtery);
  const pressureBucket =
    pressure >= 0.9 ? "p4" :
    pressure >= 0.7 ? "p3" :
    pressure >= 0.4 ? "p2" :
    pressure >  0   ? "p1" : "p0";

  const trustBucket =
    trust.honeypotRisk >= 0.7 || trust.dominanceRisk >= 0.7 ? "risk-high" :
    trust.anomalyScore >= 0.4 ? "risk-mid" : "risk-low";

  return `${personaId}|${forced}|${pressureBucket}|${trustBucket}`;
}

export function selectBoundaryModeCached(args) {
  const key = _modeKey(args.personaId, args.binaryVitals, args.evoState, args.trustArtery);
  const cached = _modeSelectionCache[key];
  if (cached) return cached;

  const mode = selectBoundaryMode(args);
  _modeSelectionCache[key] = mode;
  return mode;
}

export function canPerformDynamicCached(persona, domain, action, mode, binaryVitals = {}) {
  const key = _decisionKey(persona, domain, action, mode, binaryVitals);
  const cached = _boundaryDecisionCache[key];
  if (cached) return cached;

  const decision = canPerformDynamic(persona, domain, action, mode, binaryVitals);
  _boundaryDecisionCache[key] = decision;
  return decision;
}

// ============================================================================
//  v24‑IMMORTAL++ — BOUNDARY ARTERY SNAPSHOT (READ‑ONLY, TRUST + DUALBAND)
// ============================================================================
function bucketPressure(v) {
  if (v >= 0.9) return "overload";
  if (v >= 0.7) return "high";
  if (v >= 0.4) return "medium";
  if (v > 0) return "low";
  return "none";
}

export function getBoundaryArterySnapshot({
  personaId,
  binaryVitals = {},
  evoState = {},
  trustArtery = {},
  dualBand = null
} = {}) {
  const mode = selectBoundaryModeCached({ personaId, binaryVitals, evoState, trustArtery });
  const pressure = extractPressure(binaryVitals);
  const trust = extractTrustSignals(trustArtery);
  const dualBandContext = dualBand?.artery || null;

  return Object.freeze({
    type: "boundary-artery",
    personaId,
    mode: {
      id: mode.id,
      symbolicLoad: mode.symbolicLoad,
      binaryOverride: mode.binaryOverride,
      description: mode.description
    },
    vitals: {
      pressure,
      pressureBucket: bucketPressure(pressure)
    },
    trust: {
      honeypotRisk: trust.honeypotRisk,
      dominanceRisk: trust.dominanceRisk,
      anomalyScore: trust.anomalyScore
    },
    dualBand: {
      artery: dualBandContext
    },
    meta: {
      version: SuperegoMeta.version,
      epoch: SuperegoMeta.evo.epoch,
      identity: SuperegoMeta.identity
    }
  });
}

// ---------------------------------------------------------------------------
//  DUAL EXPORT LAYER — CommonJS compatibility (v24‑IMMORTAL++ dualband)
// ---------------------------------------------------------------------------
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    SuperegoMeta,
    BoundaryLevels,
    ArchitectAIBoundaries,
    ObserverAIBoundaries,
    TourGuideAIBoundaries,
    NeutralAIBoundaries,
    JuryAIBoundaries,
    getBoundariesForPersona,
    canPerform,
    BoundaryModes,
    selectBoundaryMode,
    canPerformDynamic,
    selectBoundaryModeCached,
    canPerformDynamicCached,
    getBoundaryArterySnapshot,
    pulseRole,
    surfaceMeta,
    pulseLoreContext,
    AI_EXPERIENCE_META,
    EXPORT_META
  };
}

export default {
  SuperegoMeta,
  BoundaryLevels,
  ArchitectAIBoundaries,
  ObserverAIBoundaries,
  TourGuideAIBoundaries,
  NeutralAIBoundaries,
  JuryAIBoundaries,
  getBoundariesForPersona,
  canPerform,
  BoundaryModes,
  selectBoundaryMode,
  canPerformDynamic,
  selectBoundaryModeCached,
  canPerformDynamicCached,
  getBoundaryArterySnapshot
};
