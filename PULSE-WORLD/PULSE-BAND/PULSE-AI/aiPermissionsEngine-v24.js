// ============================================================================
//  PULSE OS v24‑IMMORTAL++ — PERMISSIONS ENGINE
//  Dual‑Band Safety Contract • Deterministic • Drift‑Proof • Trust‑Aware
//  PURE CONTRACT ORACLE. ZERO MUTATION. ZERO RANDOMNESS.
// ============================================================================

import { OrganismIdentity } from "../PULSE-X/PulseWorldOrganismMap-v24.js";

const Identity = OrganismIdentity(import.meta.url);

// or: const Identity = OrganismIdentity["pulse-ai/ai-v24.0-IMMORTAL"] if that's the key you chose

// ============================================================================
//  META BLOCK — v24.0 IMMORTAL (ORGANISM KERNEL)
//  (now backed by the Organism Map instead of hardcoded here)
// ============================================================================
export const PermissionsMeta = Identity.OrganMeta;

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

import { getPermissionsForPersona, ForbiddenActions } from "./aiPermissions.js";

// ============================================================================
//  INTERNAL HELPERS
// ============================================================================
function bucketLevel(v) {
  if (v >= 0.9) return "elite";
  if (v >= 0.75) return "high";
  if (v >= 0.5) return "medium";
  if (v >= 0.25) return "low";
  return "critical";
}

function extractTrustSignals(trustArtery = {}) {
  return {
    honeypotRisk: trustArtery?.honeypotRisk ?? 0,
    dominanceRisk: trustArtery?.dominanceRisk ?? 0,
    anomalyScore: trustArtery?.anomalyScore ?? 0
  };
}

function bucketRisk(v) {
  if (v >= 0.9) return "severe";
  if (v >= 0.7) return "high";
  if (v >= 0.4) return "medium";
  if (v > 0) return "low";
  return "none";
}

// ============================================================================
//  PACKET EMITTER — deterministic, permissions-scoped
// ============================================================================
function emitPermissionsPacket(type, payload) {
  return Object.freeze({
    meta: {
      version: PermissionsMeta.version,
      epoch: PermissionsMeta.evo.epoch,
      identity: PermissionsMeta.identity,
      layer: PermissionsMeta.layer,
      role: PermissionsMeta.role
    },
    packetType: `permissions-${type}`,
    timestamp: Date.now(),
    ...payload
  });
}

// ============================================================================
//  PREWARM — IMMORTAL++ grade
// ============================================================================
export function prewarmPermissionsEngine({
  trace = false,
  trustFabric = null,
  juryFrame = null
} = {}) {
  const packet = emitPermissionsPacket("prewarm", {
    message: "Permissions engine prewarmed and lineage oracle aligned."
  });

  trustFabric?.recordPermissionsPrewarm?.({});
  juryFrame?.recordEvidence?.("permissions-prewarm", packet);

  if (trace) console.log("[PermissionsEngine] prewarm", packet);
  return packet;
}

// ============================================================================
//  PERMISSIONS ENGINE — v24‑IMMORTAL++
// ============================================================================
export function createPermissionsEngine({
  context = {},
  trustFabric = null,
  juryFrame = null
} = {}) {
  const userIsOwner = context.userIsOwner === true;
  const lineage = context.lineage || null;

  // --------------------------------------------------------------------------
  //  IMMORTAL: lineage‑aware permission drift correction
  // --------------------------------------------------------------------------
  function applyLineageDrift(basePerms) {
    if (!lineage || !Array.isArray(lineage.changes)) return basePerms;

    const drifted = new Set(lineage.changes.map(c => c.capability));
    const corrected = { ...basePerms };

    for (const cap of drifted) {
      if (corrected[cap] === true) corrected[cap] = false;
    }

    return corrected;
  }

  // --------------------------------------------------------------------------
  //  RESOLVE — persona → base permissions → lineage → forbidden actions
  // --------------------------------------------------------------------------
  function resolve(personaId) {
    const persona = personaId || "neutral";

    const base = getPermissionsForPersona(persona, userIsOwner);
    const lineageCorrected = applyLineageDrift(base);

    const merged = Object.freeze({
      ...lineageCorrected,
      ...ForbiddenActions
    });

    const packet = emitPermissionsPacket("resolve", {
      persona,
      ownerMode: userIsOwner === true,
      lineageAware: !!lineage
    });

    trustFabric?.recordPermissionsResolve?.({
      persona,
      ownerMode: userIsOwner === true,
      lineageAware: !!lineage
    });

    juryFrame?.recordEvidence?.("permissions-resolve", packet);

    return merged;
  }

  // --------------------------------------------------------------------------
  //  CHECK — deterministic capability check (trust‑aware)
// --------------------------------------------------------------------------
  function check(personaId, action, { trustArtery = {} } = {}) {
    const perms = resolve(personaId);
    const allowed = perms[action] === true;

    const trust = extractTrustSignals(trustArtery);
    const risk = Math.max(
      trust.honeypotRisk,
      trust.dominanceRisk,
      trust.anomalyScore
    );
    const riskBucket = bucketRisk(risk);

    const packet = emitPermissionsPacket("check", {
      persona: personaId || "neutral",
      action,
      allowed,
      trustRisk: risk,
      trustRiskBucket: riskBucket,
      trustSignals: trust
    });

    trustFabric?.recordPermissionsCheck?.({
      persona: personaId || "neutral",
      action,
      allowed,
      trustRisk: risk,
      trustRiskBucket: riskBucket
    });

    juryFrame?.recordEvidence?.("permissions-check", packet);

    return allowed;
  }

  // --------------------------------------------------------------------------
  //  CAPABILITY ARTERY SNAPSHOT — window-safe, aggregate only
  // --------------------------------------------------------------------------
  function capabilityArterySnapshot(personaId) {
    const persona = personaId || "neutral";
    const perms = resolve(persona);

    let allowedCount = 0;
    let forbiddenCount = 0;

    for (const [k, v] of Object.entries(perms)) {
      if (k in ForbiddenActions) {
        if (ForbiddenActions[k] === false) forbiddenCount += 1;
      } else if (v === true) {
        allowedCount += 1;
      }
    }

    const budget = Math.max(
      0,
      Math.min(1, allowedCount / (allowedCount + forbiddenCount || 1))
    );
    const bucket = bucketLevel(budget);

    const artery = Object.freeze({
      organism: {
        budget,
        budgetBucket: bucket
      },
      persona: {
        id: persona,
        ownerMode: userIsOwner === true
      },
      forbidden: {
        count: forbiddenCount
      },
      meta: {
        version: PermissionsMeta.version,
        epoch: PermissionsMeta.evo.epoch,
        identity: PermissionsMeta.identity
      }
    });

    const packet = emitPermissionsPacket("artery", {
      persona,
      organismBudget: budget,
      budgetBucket: bucket
    });

    trustFabric?.recordPermissionsArtery?.({
      persona,
      budget,
      bucket
    });

    juryFrame?.recordEvidence?.("permissions-artery", packet);

    return artery;
  }

  // --------------------------------------------------------------------------
  //  WINDOW‑SAFE SNAPSHOT — IMMORTAL++ GRADE
  // --------------------------------------------------------------------------
  function snapshot() {
    const snap = Object.freeze({
      version: PermissionsMeta.version,
      epoch: PermissionsMeta.evo.epoch,
      lineageAware: !!lineage,
      ownerMode: userIsOwner === true
    });

    const packet = emitPermissionsPacket("snapshot", snap);

    trustFabric?.recordPermissionsSnapshot?.({
      ownerMode: userIsOwner === true,
      lineageAware: !!lineage
    });

    juryFrame?.recordEvidence?.("permissions-snapshot", packet);

    return packet;
  }

  // --------------------------------------------------------------------------
  //  IMMORTAL++ ENGINE EXPORT
  // --------------------------------------------------------------------------
  return Object.freeze({
    meta: PermissionsMeta,
    resolve,
    check,
    snapshot,
    capabilityArterySnapshot
  });
}

// ============================================================================
//  DUAL‑MODE EXPORTS (ESM + CommonJS)
// ============================================================================
if (typeof module !== "undefined") {
  module.exports = {
    PermissionsMeta,
    createPermissionsEngine,
    prewarmPermissionsEngine
  };
}
