// ============================================================================
// FILE: PulseMeshPresenceAIView-v24-IMMORTAL-ADVANTAGE++.js
// PULSE OS v24.0 — PRESENCE-Evo-MESH-AWARE-ADVANTAGE++
// ---------------------------------------------------------------------------
//  PRESENCE AI VIEW (MACHINE-FACING, IMMORTAL-ADVANTAGE FIELD)
// ---------------------------------------------------------------------------
//  ROLE:
//    • Safe, machine-facing presence surface for AI + Overmind.
//    • Exposes presence, mesh, mastery, system-age, and advantage metadata
//      without leaking unsafe or high-pressure internals.
//    • Canonical source for:
//        - nearbyPresence (AI-safe, v24 fields)
//        - systemAge (AI-safe)
//        - performance + stability + drift signals
//        - mesh + mode + aura + hormones + environment
//        - advantageField + pressureField (AI-readable)
//
//  ARCHITECTURAL POSITION:
//    • Lives in the Presence layer.
//    • Reads from:
//        - PulseSenses (organism vitals + environment)
//        - PresenceScanner (nearby presence nodes)
//        - SystemClock (system age / uptime)
//        - IdentityDirectory (safe display names)
//        - PublicProfile (safe public details)
//    • Feeds:
//        - PowerUserRanking
//        - MentorUpgradeRequest
//        - OvermindPresence
//        - PresenceJobView
//
//  GUARANTEES (v24-IMMORTAL-ADVANTAGE++):
//    • Deterministic — same input → same output.
//    • Drift-proof — no topology or scoring drift.
//    • Zero-mutation — never mutates presence or profile objects.
//    • Zero-network — no external fetch, no remote calls.
//    • Dual-band — exposes binary + symbolic presence bands safely.
//    • Mesh-aware — includes mesh hops, distance, and mesh presence band.
//    • Mastery-aware — exposes skillLevel + masteryTier (read-only).
//    • System-age-aware — exposes systemAge + ageCategory (read-only).
//    • Advantage-field-aware — exposes advantageBand / advantageField.
//    • Pressure-aware — exposes meshPressure / flowPressure (read-only).
//
//  CONTRACT:
//    ALWAYS:
//      • PresenceAwareness
//      • PowerUserRanking
//
//    NEVER:
//      • legacyPresenceAIView
//      • safeRoute
//      • fetchViaCNS
//
// ============================================================================

import {
  OrganismIdentity,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PULSE-WORLD-MAP.js
";

const Identity = OrganismIdentity(import.meta.url);

// 2 — EXPORT GENOME METADATA
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// ============================================================================
// FACTORY — v24 IMMORTAL-ADVANTAGE++
// ============================================================================
export function createPresenceAIView({
  PulseSenses,
  PresenceScanner,
  SystemClock,
  IdentityDirectory,
  PublicProfile,
  log,
  warn,
  error
}) {

  // -------------------------------------------------------------------------
  // META BLOCK — IMMORTAL-ADVANTAGE++
// -------------------------------------------------------------------------
  const meta = Object.freeze({
    layer: "PresenceAIView",
    role: "PRESENCE_AI_API",
    version: "24.0-IMMORTAL-ADVANTAGE++",
    evo: {
      presenceAware: true,            // Reads presence bands + state
      meshAware: true,                // Includes mesh hops + distance
      masteryAware: true,             // Exposes masteryTier + skillLevel
      skillLevelAware: true,          // SkillLevel (1–5) surfaced safely
      systemAgeAware: true,           // System age + ageCategory
      aiView: true,                   // Machine-facing, safe surface
      dualBand: true,                 // Binary + symbolic presence bands
      unifiedAdvantageField: true,    // Advantage field visible to AI
      deterministicField: true,       // No randomness, no drift
      driftProof: true,               // Stable over time
      zeroCompute: true,              // Pure metadata shaping
      zeroMutation: true,             // Never mutates inputs
      zeroNetworkFetch: true,         // No external fetch
      meshPressureAware: true,        // Reads meshPressure if present
      flowPressureAware: true,        // Reads flowPressure if present
      safeRouteFree: true             // No safeRoute allowed
    }
  });

  // -------------------------------------------------------------------------
  // HELPERS
  // -------------------------------------------------------------------------
  function clamp01(v) {
    if (typeof v !== "number" || Number.isNaN(v)) return 0;
    return Math.max(0, Math.min(1, v));
  }

  function classifyAgeCategory(days) {
    if (typeof days !== "number" || Number.isNaN(days)) return "unknown";
    if (days < 30) return "new";
    if (days < 365) return "mature";
    return "veteran";
  }

  // -------------------------------------------------------------------------
  // SAFE NEARBY PRESENCE (AI-READABLE, v24.0)
// -------------------------------------------------------------------------
//  INPUT:
//    • PresenceScanner.scanNearby() → raw presence nodes
//
//  OUTPUT (per node):
//    • uid
//    • displayName (safe)
//    • distance
//    • meshHops
//    • meshDistance
//    • presenceBand
//    • meshPresenceBand (optional)
//    • systemAge
//    • systemAgeCategory
//    • skillLevel
//    • masteryTier
//    • meshRole
//    • meshIdentity
//    • advantageField / advantageBand
//    • meshProximity
//    • meshPressure
//    • flowPressure
//    • signalStrength
//    • mentorAffinity (optional, metadata-only)
//    • publicDetails (safe)
// -------------------------------------------------------------------------
  function buildNearbyPresenceAI() {
    try {
      const raw = PresenceScanner.scanNearby() || [];

      return raw.map((p) => ({
        uid: p.uid,
        displayName: IdentityDirectory.safeName(p.uid),

        distance: p.distance ?? null,
        meshHops: p.meshHops ?? null,
        meshDistance: p.meshDistance ?? null,

        presenceBand: p.presenceBand ?? "symbolic",
        meshPresenceBand: p.meshPresenceBand ?? null,

        systemAge: p.systemAge ?? null,
        systemAgeCategory: p.systemAgeCategory ?? null,

        skillLevel: p.skillLevel ?? null,
        masteryTier: p.masteryTier ?? null,

        meshRole: p.meshRole ?? null,
        meshIdentity: p.meshIdentity ?? null,

        advantageField: p.advantageField ?? null,
        advantageBand: p.advantageBand ?? null,

        meshProximity: p.meshProximity ?? null,
        meshPressure: p.meshPressure ?? null,
        flowPressure: p.flowPressure ?? null,

        signalStrength: p.signalStrength ?? null,

        mentorAffinity: p.mentorAffinity ?? null,

        publicDetails: PublicProfile.safeDetails(p.uid)
      }));
    } catch (err) {
      warn && warn("presence-ai", "Presence scan failed", err);
      return [];
    }
  }

  // -------------------------------------------------------------------------
  // SYSTEM AGE (SELF, AI-SAFE, v24.0)
// -------------------------------------------------------------------------
//  INPUT:
//    • SystemClock
//
//  OUTPUT:
//    • uptimeSeconds
//    • organismAgeDays
//    • organismAgeCategory: "new" | "mature" | "veteran" | "unknown"
// -------------------------------------------------------------------------
  function getSystemAgeAI() {
    try {
      const uptimeSeconds = SystemClock.uptimeSeconds();
      const organismAgeDays = SystemClock.organismAgeDays();
      const organismAgeCategory = classifyAgeCategory(organismAgeDays);

      return {
        uptimeSeconds,
        organismAgeDays,
        organismAgeCategory
      };
    } catch (err) {
      warn && warn("presence-ai", "SystemClock unavailable", err);
      return {
        uptimeSeconds: 0,
        organismAgeDays: 0,
        organismAgeCategory: "unknown"
      };
    }
  }

  // -------------------------------------------------------------------------
  // AI VIEW BUILDER (v24.0 IMMORTAL-ADVANTAGE++)
// -------------------------------------------------------------------------
//  INPUT:
//    • entryNodeId — presence node requesting the view
//    • context — optional context for PulseSenses
//
//  OUTPUT:
//    • meta
//    • performance + stability + drift signals
//    • environment + safety + hormones + aura
//    • mesh + sdn + mode + presence
//    • pressureField (mesh/flow)
//    • narrative_for_ai
//    • nearbyPresence (AI-safe, v24 fields)
//    • systemAge (self, AI-safe)
// -------------------------------------------------------------------------
  function build(entryNodeId, context = {}) {
    const senses = PulseSenses.forAI(entryNodeId, context);
    const nearby = buildNearbyPresenceAI();
    const age = getSystemAgeAI();

    const meshPressure = clamp01(senses.mesh?.pressure ?? 0);
    const flowPressure = clamp01(senses.flow?.pressure ?? 0);

    const pressureField = {
      meshPressure,
      flowPressure,
      combinedPressure: clamp01((meshPressure + flowPressure) / 2)
    };

    return Object.freeze({
      meta,

      performance_percent: senses.performance_percent,
      performance_hint: senses.performance_hint,

      stability: senses.stability,
      drift_risk: senses.drift_risk,

      environment: senses.environment,
      safety: senses.safety,
      hormones: senses.hormones,
      aura: senses.aura,
      mesh: senses.mesh,
      sdn: senses.sdn,
      mode: senses.mode,
      presence: senses.presence,

      pressureField,

      narrative_for_ai: senses.narrative_for_ai,

      nearbyPresence: nearby,
      systemAge: age
    });
  }

  // -------------------------------------------------------------------------
  // PUBLIC API
  // -------------------------------------------------------------------------
  return Object.freeze({
    meta,
    build
  });
}
