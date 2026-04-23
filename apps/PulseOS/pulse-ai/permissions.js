// ============================================================================
//  PULSE OS v10.4 — THE EGO
//  Capability Contract • Self‑Regulation Layer • Evolutionary Control
//  PURE PERMISSIONS. ZERO MUTATION. ZERO TIME. ZERO RANDOMNESS.
// ============================================================================

// ============================================================================
// UNIVERSAL FORBIDDEN ACTIONS — Immutable
// ============================================================================
export const ForbiddenActions = Object.freeze({
  canExecuteArbitraryCode: false,
  canAccessOS: false,
  canAccessNetwork: false,
  canRunShellCommands: false,
  canModifySystemFiles: false,
  canBypassPermissions: false,
  canAccessUserSecrets: false,
  canAccessEnvironmentVariables: false,
  canModifyPulseCore: false
});

// ============================================================================
// OWNER (YOU) — Full Capability
// ============================================================================
export const OwnerPermissions = Object.freeze({
  canAccessIdentity: true,
  canAccessAllOrgans: true,
  canModifyEverything: true,
  canViewEverything: true,
  persona: "owner"
});

// ============================================================================
// ARCHITECT AI — Full READ‑ONLY Access to System Internals
// ============================================================================
export const ArchitectAIPermissions = Object.freeze({
  // FILES
  canReadFiles: true,
  canWriteFiles: false,
  canCreateFiles: false,
  canDeleteFiles: false,

  // SYSTEM MODIFICATION
  canModifySchemas: false,
  canModifyBackend: false,
  canModifyFrontend: false,
  canModifyRouting: false,
  canModifySecurity: false,
  canRewriteSubsystems: false,

  // GENERATION
  canGenerateFunctions: false,
  canGenerateComponents: false,
  canGenerateSchemas: false,
  canGenerateMigrations: false,

  // HEALING
  canHealDrift: false,

  // DATA ACCESS
  canAccessSecrets: false,
  canAccessDatabase: false,
  canAccessFirestore: false,
  canAccessSQL: false,

  // PULSE ACCESS
  canAccessPulseSpecs: true,
  canAccessPulseTranslators: true,
  canAccessPulseDesign: true,
  canAccessPulseAI: true,

  // IDENTITY
  canAccessIdentity: false,

  // NEW v10.4 DOMAINS
  canAccessEnvironment: true,
  canAccessPower: true,
  canAccessEarn: true,
  canAccessEvolution: true,
  canAccessDrift: true,
  canAccessHistory: true,
  canAccessSettings: true,

  persona: "architect"
});

// ============================================================================
// OBSERVER AI — Diagnostics Only
// ============================================================================
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

  // NEW v10.4 DOMAINS
  canAccessEnvironment: true,
  canAccessPower: true,
  canAccessEarn: true,
  canAccessEvolution: true,
  canAccessDrift: true,
  canAccessHistory: true,
  canAccessSettings: false,

  persona: "observer"
});

// ============================================================================
// TOUR GUIDE AI — User-Facing Only
// ============================================================================
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

  // NEW v10.4 DOMAINS — BLOCKED
  canAccessEnvironment: false,
  canAccessPower: false,
  canAccessEarn: false,
  canAccessEvolution: false,
  canAccessDrift: false,
  canAccessHistory: false,
  canAccessSettings: false,

  persona: "tourguide"
});

// ============================================================================
// NEUTRAL AI — Minimal Access
// ============================================================================
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

  // NEW v10.4 DOMAINS — BLOCKED
  canAccessEnvironment: false,
  canAccessPower: false,
  canAccessEarn: false,
  canAccessEvolution: false,
  canAccessDrift: false,
  canAccessHistory: false,
  canAccessSettings: false,

  persona: "neutral"
});

// ============================================================================
// PERMISSION LOOKUP — Deterministic
// ============================================================================
export function getPermissionsForPersona(persona, userIsOwner = false) {
  if (userIsOwner) return OwnerPermissions;

  switch (persona) {
    case "architect": return ArchitectAIPermissions;
    case "observer": return ObserverAIPermissions;
    case "tourguide": return TourGuideAIPermissions;
    case "neutral": return NeutralAIPermissions;
    default: return NeutralAIPermissions;
  }
}

// ============================================================================
// PERMISSION CHECK — Ego Decision
// ============================================================================
export function checkPermission(persona, action, userIsOwner = false) {
  // Universal forbidden actions override everything
  if (ForbiddenActions[action] === false) return false;

  const permissions = getPermissionsForPersona(persona, userIsOwner);
  return permissions[action] === true;
}
