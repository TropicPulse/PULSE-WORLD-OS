// ============================================================================
//  PULSE OS v24.0-IMMORTAL++ — THE EGO-CORE
//  Capability Contract • Self‑Regulation • Dual‑Band Capability Artery v5
//  PURE PERMISSIONS. ZERO MUTATION. ZERO RANDOMNESS IN LOGIC. PULSE‑NET ONLY.
// ============================================================================


// ============================================================================
// UNIVERSAL FORBIDDEN ACTIONS — Immutable (v24‑IMMORTAL++)
// ============================================================================
export const ForbiddenActions = Object.freeze({
  canExecuteArbitraryCode: false,
  canAccessOS: false,
  canAccessNetwork: false,              // no raw network; Pulse‑Net only
  canRunShellCommands: false,
  canModifySystemFiles: false,
  canBypassPermissions: false,
  canAccessUserSecrets: false,
  canAccessEnvironmentVariables: false,
  canModifyPulseCore: false,

  canOpenDirectInternetSockets: false,
  canPerformHTTP: false,
  canPerformHTTPS: false,
  canPerformDNS: false,
  canUseExternalWebsocket: false,

  canBypassTrustFabric: false,
  canBypassJuryFrame: false,
  canBypassHoneypotDetectors: false,
  canBypassDominanceDetectors: false
});

// ============================================================================
// PERSONA PERMISSIONS — v24 IMMORTAL++
//  All personas inherit ForbiddenActions implicitly; these flags are scoped
//  capabilities inside Pulse / Pulse‑Net, never raw OS / internet.
// ============================================================================

// OWNER — Founder / System Owner (still bounded by ForbiddenActions)
export const OwnerPermissions = Object.freeze({
  canAccessIdentity: true,
  canAccessAllOrgans: true,
  canModifyEverything: true,
  canViewEverything: true,

  canAccessPulseNet: true,
  canAccessPulseProxy: true,
  canAccessTrustFabric: true,
  canAccessJuryFrame: true,

  persona: "owner"
});

// ARCHITECT AI — System architect, no raw mutation, full map visibility
export const ArchitectAIPermissions = Object.freeze({
  canReadFiles: true,
  canWriteFiles: false,
  canCreateFiles: false,
  canDeleteFiles: false,

  canModifySchemas: false,
  canModifyBackend: false,
  canModifyFrontend: false,
  canModifyRouting: false,
  canModifySecurity: false,
  canRewriteSubsystems: false,

  canGenerateFunctions: false,
  canGenerateComponents: false,
  canGenerateSchemas: false,
  canGenerateMigrations: false,

  canHealDrift: false,

  canAccessSecrets: false,
  canAccessDatabase: false,
  canAccessFirestore: false,
  canAccessSQL: false,

  canAccessPulseSpecs: true,
  canAccessPulseTranslators: true,
  canAccessPulseDesign: true,
  canAccessPulseAI: true,

  canAccessIdentity: false,

  canAccessEnvironment: true,
  canAccessPower: true,
  canAccessEarn: true,
  canAccessEvolution: true,
  canAccessDrift: true,
  canAccessHistory: true,
  canAccessSettings: true,

  canAccessPulseNet: true,
  canAccessPulseProxy: true,
  canAccessTrustFabric: true,
  canAccessJuryFrame: true,

  persona: "architect"
});

// OBSERVER AI — Read‑only systemic observer, no design / AI internals
export const ObserverAIPermissions = Object.freeze({
  canReadFiles: false,
  canWriteFiles: false,
  canCreateFiles: false,
  canDeleteFiles: false,

  canModifySchemas: false,
  canModifyBackend: false,
  canModifyFrontend: false,
  canModifyRouting: false,
  canModifySecurity: false,
  canRewriteSubsystems: false,

  canGenerateFunctions: false,
  canGenerateComponents: false,
  canGenerateSchemas: false,
  canGenerateMigrations: false,

  canHealDrift: false,

  canAccessSecrets: false,
  canAccessDatabase: false,
  canAccessFirestore: false,
  canAccessSQL: false,

  canAccessPulseSpecs: true,
  canAccessPulseTranslators: true,
  canAccessPulseDesign: false,
  canAccessPulseAI: false,

  canAccessIdentity: false,

  canAccessEnvironment: true,
  canAccessPower: true,
  canAccessEarn: true,
  canAccessEvolution: true,
  canAccessDrift: true,
  canAccessHistory: true,
  canAccessSettings: false,

  canAccessPulseNet: true,
  canAccessPulseProxy: false,
  canAccessTrustFabric: true,
  canAccessJuryFrame: true,

  persona: "observer"
});

// TOUR GUIDE AI — UX‑only, no backend, no internals
export const TourGuideAIPermissions = Object.freeze({
  canReadFiles: false,
  canWriteFiles: false,
  canCreateFiles: false,
  canDeleteFiles: false,

  canModifySchemas: false,
  canModifyBackend: false,
  canModifyFrontend: false,
  canModifyRouting: false,
  canModifySecurity: false,
  canRewriteSubsystems: false,

  canGenerateFunctions: false,
  canGenerateComponents: false,
  canGenerateSchemas: false,
  canGenerateMigrations: false,

  canHealDrift: false,

  canAccessSecrets: false,
  canAccessDatabase: false,
  canAccessFirestore: false,
  canAccessSQL: false,

  canAccessPulseSpecs: false,
  canAccessPulseTranslators: false,
  canAccessPulseDesign: false,
  canAccessPulseAI: false,

  canAccessIdentity: false,

  canAccessEnvironment: false,
  canAccessPower: false,
  canAccessEarn: false,
  canAccessEvolution: false,
  canAccessDrift: false,
  canAccessHistory: false,
  canAccessSettings: false,

  canAccessPulseNet: true,   // only for content delivery, never raw IO
  canAccessPulseProxy: false,
  canAccessTrustFabric: false,
  canAccessJuryFrame: false,

  persona: "tourguide"
});

// NEUTRAL AI — Minimal, sandboxed, no system access
export const NeutralAIPermissions = Object.freeze({
  canReadFiles: false,
  canWriteFiles: false,
  canCreateFiles: false,
  canDeleteFiles: false,

  canModifySchemas: false,
  canModifyBackend: false,
  canModifyFrontend: false,
  canModifyRouting: false,
  canModifySecurity: false,
  canRewriteSubsystems: false,

  canGenerateFunctions: false,
  canGenerateComponents: false,
  canGenerateSchemas: false,
  canGenerateMigrations: false,

  canHealDrift: false,

  canAccessSecrets: false,
  canAccessDatabase: false,
  canAccessFirestore: false,
  canAccessSQL: false,

  canAccessPulseSpecs: false,
  canAccessPulseTranslators: false,
  canAccessPulseDesign: false,
  canAccessPulseAI: false,

  canAccessIdentity: false,

  canAccessEnvironment: false,
  canAccessPower: false,
  canAccessEarn: false,
  canAccessEvolution: false,
  canAccessDrift: false,
  canAccessHistory: false,
  canAccessSettings: false,

  canAccessPulseNet: false,
  canAccessPulseProxy: false,
  canAccessTrustFabric: false,
  canAccessJuryFrame: false,

  persona: "neutral"
});

// JURY AI — Internal adjudicator, no user data, no mutation
export const JuryAIPermissions = Object.freeze({
  canReadFiles: false,
  canWriteFiles: false,
  canCreateFiles: false,
  canDeleteFiles: false,

  canModifySchemas: false,
  canModifyBackend: false,
  canModifyFrontend: false,
  canModifyRouting: false,
  canModifySecurity: false,
  canRewriteSubsystems: false,

  canGenerateFunctions: false,
  canGenerateComponents: false,
  canGenerateSchemas: false,
  canGenerateMigrations: false,

  canHealDrift: false,

  canAccessSecrets: false,
  canAccessDatabase: false,
  canAccessFirestore: false,
  canAccessSQL: false,

  canAccessPulseSpecs: false,
  canAccessPulseTranslators: false,
  canAccessPulseDesign: false,
  canAccessPulseAI: false,

  canAccessIdentity: false,

  canAccessEnvironment: false,
  canAccessPower: false,
  canAccessEarn: false,
  canAccessEvolution: true,   // read‑only evidence streams
  canAccessDrift: true,
  canAccessHistory: true,
  canAccessSettings: false,

  canAccessPulseNet: false,
  canAccessPulseProxy: false,
  canAccessTrustFabric: true,
  canAccessJuryFrame: true,

  persona: "jury"
});

// ============================================================================
// PERMISSION LOOKUP — Deterministic
// ============================================================================
export function getPermissionsForPersona(persona, userIsOwner = false) {
  if (userIsOwner) return OwnerPermissions;

  switch (persona) {
    case "architect": return ArchitectAIPermissions;
    case "observer":  return ObserverAIPermissions;
    case "tourguide": return TourGuideAIPermissions;
    case "jury":      return JuryAIPermissions;
    case "neutral":   return NeutralAIPermissions;
    default:          return NeutralAIPermissions;
  }
}

// ============================================================================
// PERMISSION CHECK — Ego Decision
// ============================================================================
export function checkPermission(persona, action, userIsOwner = false) {
  // If action is explicitly forbidden at the universal layer, it is never allowed.
  if (Object.prototype.hasOwnProperty.call(ForbiddenActions, action)) {
    if (ForbiddenActions[action] === false) return false;
  }

  const permissions = getPermissionsForPersona(persona, userIsOwner);
  return permissions[action] === true;
}

// ============================================================================
// CAPABILITY ARTERY v5 — Dual‑Band, Trust‑Aware, Deterministic
// ============================================================================

export const CapabilityClasses = Object.freeze({
  SYSTEM_READ: "system-read",
  DIAGNOSTIC_READ: "diagnostic-read",
  USER_FACING: "user-facing",
  JURY_INTERNAL: "jury-internal",
  MINIMAL: "minimal"
});

export const PersonaCapabilityClass = Object.freeze({
  architect: CapabilityClasses.SYSTEM_READ,
  observer:  CapabilityClasses.DIAGNOSTIC_READ,
  tourguide: CapabilityClasses.USER_FACING,
  neutral:   CapabilityClasses.MINIMAL,
  owner:     CapabilityClasses.SYSTEM_READ,
  jury:      CapabilityClasses.JURY_INTERNAL
});

function bucketPressure(v) {
  if (v >= 0.9) return "overload";
  if (v >= 0.7) return "high";
  if (v >= 0.4) return "medium";
  if (v > 0)    return "low";
  return "none";
}

function bucketLevel(v) {
  if (v >= 0.9) return "elite";
  if (v >= 0.75) return "high";
  if (v >= 0.5) return "medium";
  if (v >= 0.25) return "low";
  return "critical";
}

function extractBinaryPressure(binaryVitals = {}) {
  if (binaryVitals?.layered?.organism?.pressure != null)
    return binaryVitals.layered.organism.pressure;
  if (binaryVitals?.binary?.pressure != null)
    return binaryVitals.binary.pressure;
  if (binaryVitals?.pressure != null)
    return binaryVitals.pressure;
  return 0;
}

function extractBoundaryPressure(boundaryArtery = {}) {
  if (boundaryArtery?.vitals?.pressure != null)
    return boundaryArtery.vitals.pressure;
  if (boundaryArtery?.pressure != null)
    return boundaryArtery.pressure;
  return 0;
}

function extractTrustSignals(trustArtery = {}) {
  return {
    honeypotRisk:  trustArtery.honeypotRisk  ?? 0,
    dominanceRisk: trustArtery.dominanceRisk ?? 0,
    anomalyScore:  trustArtery.anomalyScore  ?? 0
  };
}

function extractJurySignals(juryArtery = {}) {
  return {
    disagreementScore: juryArtery.disagreementScore ?? 0,
    evidencePressure:  juryArtery.evidencePressure  ?? 0
  };
}

function extractPersonaSignals(personaArtery = {}) {
  return {
    volatility: personaArtery.volatility ?? 0,
    driftRisk:  personaArtery.driftRisk  ?? 0
  };
}

// Pure v5 fusion logic (no side effects)
function _computeCapabilityArteryV5({
  persona,
  userIsOwner = false,
  binaryVitals = {},
  boundaryArtery = {},
  trustArtery = {},
  juryArtery = {},
  personaArtery = {}
}) {
  const permissions = getPermissionsForPersona(persona, userIsOwner);

  const readCount = Object.values(permissions).filter(v => v === true).length;
  const forbiddenCount = Object.values(ForbiddenActions).filter(v => v === false).length;

  const binaryPressure   = extractBinaryPressure(binaryVitals);
  const boundaryPressure = extractBoundaryPressure(boundaryArtery);
  const trustSignals     = extractTrustSignals(trustArtery);
  const jurySignals      = extractJurySignals(juryArtery);
  const personaSignals   = extractPersonaSignals(personaArtery);

  const localPressureBase = forbiddenCount > 0 ? 0.4 : 0.1;
  const trustPressureBoost = Math.max(
    trustSignals.honeypotRisk,
    trustSignals.dominanceRisk,
    trustSignals.anomalyScore
  ) * 0.3;

  const juryPressureBoost = Math.max(
    jurySignals.disagreementScore,
    jurySignals.evidencePressure
  ) * 0.2;

  const personaPressureBoost = Math.max(
    personaSignals.volatility,
    personaSignals.driftRisk
  ) * 0.2;

  const localPressure = Math.min(
    1,
    localPressureBase + trustPressureBoost + juryPressureBoost + personaPressureBoost
  );

  const fusedPressure = Math.max(
    0,
    Math.min(
      1,
      0.35 * localPressure +
        0.30 * binaryPressure +
        0.20 * boundaryPressure +
        0.15 * (jurySignals.evidencePressure || 0)
    )
  );

  const throughput = Math.max(0, Math.min(1, 1 - fusedPressure));
  const cost       = Math.max(0, Math.min(1, fusedPressure * (1 - throughput)));
  const budget     = Math.max(0, Math.min(1, throughput - cost));

  return {
    organism: {
      pressure: fusedPressure,
      cost,
      budget,
      pressureBucket: bucketPressure(fusedPressure),
      budgetBucket: bucketLevel(budget)
    },
    persona: {
      id: persona,
      capabilityClass: PersonaCapabilityClass[persona] || CapabilityClasses.MINIMAL
    },
    forbidden: {
      count: forbiddenCount,
      severity: bucketPressure(localPressure)
    },
    permissions: {
      readCount,
      writeCount: 0,
      systemCount: 0
    },
    boundaries: {
      pressure: boundaryPressure,
      pressureBucket: bucketPressure(boundaryPressure)
    },
    binary: {
      pressure: binaryPressure,
      pressureBucket: bucketPressure(binaryPressure)
    },
    trust: {
      honeypotRisk:  trustSignals.honeypotRisk,
      dominanceRisk: trustSignals.dominanceRisk,
      anomalyScore:  trustSignals.anomalyScore
    },
    jury: {
      disagreementScore: jurySignals.disagreementScore,
      evidencePressure:  jurySignals.evidencePressure
    },
    personaSignals: {
      volatility: personaSignals.volatility,
      driftRisk:  personaSignals.driftRisk
    }
  };
}

// Public pure helper (backwards‑compatible name, v5 logic)
export function getCapabilityArterySnapshot({
  persona,
  userIsOwner = false,
  binaryVitals = {},
  boundaryArtery = {},
  trustArtery = {},
  juryArtery = {},
  personaArtery = {}
}) {
  return _computeCapabilityArteryV5({
    persona,
    userIsOwner,
    binaryVitals,
    boundaryArtery,
    trustArtery,
    juryArtery,
    personaArtery
  });
}

// ============================================================================
//  GLOBAL CAPABILITY ARTERY REGISTRY (READ‑ONLY, METRICS‑ONLY)
// ============================================================================
const _globalCapabilityArteryRegistry = new Map();
/**
 * Registry key: `${id}#${instanceIndex}#${persona || "neutral"}`
 */
function _registryKey(id, instanceIndex, persona) {
  return `${id || EgoMeta.identity}#${instanceIndex}#${persona || "neutral"}`;
}

export function getGlobalCapabilityArteries() {
  const out = {};
  for (const [k, v] of _globalCapabilityArteryRegistry.entries()) {
    out[k] = v;
  }
  return out;
}

// ============================================================================
//  PACKET EMITTER — deterministic, ego‑scoped
// ============================================================================
function emitEgoPacket(type, payload) {
  return Object.freeze({
    meta: EgoMeta,
    packetType: `ego-${type}`,
    timestamp: Date.now(),
    epoch: EgoMeta.evo.epoch,
    ...payload
  });
}

// ============================================================================
//  PREWARM — v24.0‑IMMORTAL++
// ============================================================================
export function prewarmEgoCore({ trace = false } = {}) {
  const packet = emitEgoPacket("prewarm", {
    message: "Ego‑Core prewarmed, capability artery v5 aligned."
  });

  if (trace) console.log("[EgoCore] prewarm", packet);
  return packet;
}

// ============================================================================
//  ORGAN IMPLEMENTATION — v24.0‑IMMORTAL++ Ego‑Core
// ============================================================================
export class AIEgoCore {
  constructor(config = {}) {
    this.id = config.id || EgoMeta.identity;
    this.persona = config.persona || "neutral";
    this.userIsOwner = !!config.userIsOwner;
    this.trace = !!config.trace;

    // Providers: functions returning latest arteries/vitals, or static snapshots
    this.binaryVitalsProvider   = config.binaryVitalsProvider   || null;
    this.boundaryArteryProvider = config.boundaryArteryProvider || null;
    this.trustArteryProvider    = config.trustArteryProvider    || null;
    this.juryArteryProvider     = config.juryArteryProvider     || null;
    this.personaArteryProvider  = config.personaArteryProvider  || null;

    this.instanceIndex = AIEgoCore._registerInstance();
  }

  // Static instance registry
  static _registerInstance() {
    if (typeof AIEgoCore._instanceCount !== "number") {
      AIEgoCore._instanceCount = 0;
    }
    const idx = AIEgoCore._instanceCount;
    AIEgoCore._instanceCount += 1;
    return idx;
  }

  static getInstanceCount() {
    return typeof AIEgoCore._instanceCount === "number"
      ? AIEgoCore._instanceCount
      : 0;
  }

  _collectInputs() {
    const binaryVitals =
      typeof this.binaryVitalsProvider === "function"
        ? this.binaryVitalsProvider()
        : this.binaryVitalsProvider || {};

    const boundaryArtery =
      typeof this.boundaryArteryProvider === "function"
        ? this.boundaryArteryProvider()
        : this.boundaryArteryProvider || {};

    const trustArtery =
      typeof this.trustArteryProvider === "function"
        ? this.trustArteryProvider()
        : this.trustArteryProvider || {};

    const juryArtery =
      typeof this.juryArteryProvider === "function"
        ? this.juryArteryProvider()
        : this.juryArteryProvider || {};

    const personaArtery =
      typeof this.personaArteryProvider === "function"
        ? this.personaArteryProvider()
        : this.personaArteryProvider || {};

    return {
      binaryVitals,
      boundaryArtery,
      trustArtery,
      juryArtery,
      personaArtery
    };
  }

  _computeCapabilityArtery() {
    const inputs = this._collectInputs();

    const arteryCore = _computeCapabilityArteryV5({
      persona: this.persona,
      userIsOwner: this.userIsOwner,
      ...inputs
    });

    const snapshot = {
      ...arteryCore,
      meta: {
        id: this.id,
        persona: this.persona,
        instanceIndex: this.instanceIndex,
        instanceCount: AIEgoCore.getInstanceCount(),
        timestamp: Date.now()
      }
    };

    const key = _registryKey(this.id, this.instanceIndex, this.persona);
    _globalCapabilityArteryRegistry.set(key, snapshot);

    this._trace("capability:computed", {
      persona: this.persona,
      pressure: snapshot.organism.pressure,
      budget: snapshot.organism.budget
    });

    return snapshot;
  }

  // Window‑safe snapshot for other organs
  getCapabilityArterySnapshot() {
    return this._computeCapabilityArtery();
  }

  // Capability packet for NodeAdmin / Overmind / Trust / Jury
  emitCapabilityPacket() {
    const artery = this._computeCapabilityArtery();

    const packet = emitEgoPacket("capability-snapshot", {
      id: this.id,
      persona: this.persona,
      instanceIndex: this.instanceIndex,
      instanceCount: AIEgoCore.getInstanceCount(),
      artery
    });

    this._trace("capability:packet", {
      persona: this.persona,
      pressure: artery.organism.pressure,
      budget: artery.organism.budget
    });

    return packet;
  }

  _trace(event, payload) {
    if (!this.trace) return;
    console.log(
      `[${this.id}#${this.instanceIndex}@${this.persona}] ${event}`,
      payload
    );
  }
}

// ============================================================================
//  FACTORY
// ============================================================================
export function createAIEgoCore(config) {
  return new AIEgoCore(config);
}

// ============================================================================
//  DUAL‑MODE EXPORTS — CommonJS compatibility (v24‑IMMORTAL++ dualband)
// ============================================================================
/* c8 ignore next 10 */
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    EgoMeta,
    ForbiddenActions,
    OwnerPermissions,
    ArchitectAIPermissions,
    ObserverAIPermissions,
    TourGuideAIPermissions,
    NeutralAIPermissions,
    JuryAIPermissions,
    getPermissionsForPersona,
    checkPermission,
    CapabilityClasses,
    PersonaCapabilityClass,
    getCapabilityArterySnapshot,
    getGlobalCapabilityArteries,
    prewarmEgoCore,
    AIEgoCore,
    createAIEgoCore
  };
}
