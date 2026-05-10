// ============================================================================
// FILE: PulseMeshPresenceAwarenessPage-v24-IMMORTAL-ADVANTAGE++.js
// PULSE OS v24.0 — PRESENCE-Evo-MESH-AWARE-ADVANTAGE++
// ---------------------------------------------------------------------------
//  PRESENCE AWARENESS PAGE (HUMAN-FACING, IMMORTAL-ADVANTAGE HUD)
// ---------------------------------------------------------------------------
//  ROLE:
//    • Human-facing presence HUD / “social radar” of the organism.
//    • Shows nearby users with safe, non-sensitive metadata only.
//    • Exposes skillLevel, masteryTier, systemAgeCategory, meshRole,
//      meshIdentity, presenceBand, distance, and advantage/pressure hints.
//    • Mirrors PresenceAIView fields in a human-readable way.
//
//  ARCHITECTURAL POSITION:
//    • Lives in the Presence layer.
//    • Reads from:
//        - PulseSenses (vitals + environment)
//        - PresenceScanner (nearby presence nodes)
//        - SystemClock (system age)
//        - IdentityDirectory (safe display names)
//        - PublicProfile (safe public details)
//    • Feeds:
//        - PresenceAIView
//        - PowerUserRanking
//        - MentorUpgradeRequest
//        - PresenceJobView
//
//  GUARANTEES (v24-IMMORTAL-ADVANTAGE++):
//    • Deterministic — same input → same output.
//    • Drift-proof — no presence drift.
//    • Zero-mutation — never mutates presence objects.
//    • Zero-compute — pure metadata shaping.
//    • Zero-network — no external fetch.
//    • Dual-band — symbolic + binary presence bands.
//    • Mesh-aware — includes mesh hops + mesh presence band.
//    • Mastery-aware — exposes skillLevel + masteryTier.
//    • System-age-aware — exposes systemAgeCategory.
//    • Human-safe — no private data, no sensitive fields.
//    • Advantage-aware — shows advantageField / advantageBand.
//    • Pressure-aware — can surface meshPressure / flowPressure hints.
//
//  CONTRACT:
//    ALWAYS:
//      • PulsePresence
//      • PulseMeshPresenceRelay
//      • PresenceAIView
//
//    NEVER:
//      • legacyPresenceAwareness
//      • safeRoute
//      • fetchViaCNS
//
// ============================================================================
import {
  OrganismIdentity,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PulseWorldOrganismMap-v24.js";

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
export function createPresenceAwarenessPage({
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
    layer: "PresenceAwarenessPage",
    role: "PRESENCE_HUD",
    version: "24.0-IMMORTAL-ADVANTAGE++",
    evo: {
      presenceAware: true,            // Reads presence bands + state
      meshAware: true,                // Includes mesh hops + relay
      masteryAware: true,             // Shows masteryTier + skillLevel
      skillLevelAware: true,          // SkillLevel (1–5)
      systemAgeAware: true,           // AgeCategory + founder era
      dualBand: true,                 // Binary + symbolic presence bands
      unifiedAdvantageField: true,    // Advantage field visible
      deterministicField: true,       // No randomness, no drift
      driftProof: true,               // Stable over time
      zeroCompute: true,              // Pure metadata shaping
      zeroMutation: true,             // Never mutates inputs
      zeroNetworkFetch: true,         // No external fetch
      meshPressureAware: true,        // Can surface mesh pressure hints
      flowPressureAware: true,        // Can surface flow pressure hints
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
  // SAFE NEARBY PRESENCE (HUMAN-FACING, v24.0)
// -------------------------------------------------------------------------
//  INPUT:
//    • PresenceScanner.scanNearby()
//
//  OUTPUT (per person):
//    • displayName
//    • distance
//    • meshHops
//    • meshDistance
//    • presenceBand
//    • meshPresenceBand
//    • systemAge
//    • systemAgeCategory
//    • skillLevel
//    • masteryTier
//    • meshRole
//    • meshIdentity
//    • advantageField
//    • advantageBand
//    • meshProximity
//    • meshPressure
//    • flowPressure
//    • signalStrength
//    • publicDetails (safe)
// -------------------------------------------------------------------------
  function buildNearbyPresenceList() {
    try {
      const raw = PresenceScanner.scanNearby() || [];

      return raw.map((p) => ({
        displayName: IdentityDirectory.safeName(p.uid),

        distance: p.distance ?? null,
        meshHops: p.meshHops ?? null,
        meshDistance: p.meshDistance ?? null,

        presenceBand: p.presenceBand ?? "symbolic",
        meshPresenceBand: p.meshPresenceBand ?? null,

        systemAge: SystemClock.safeAgeOf
          ? SystemClock.safeAgeOf(p.uid)
          : (p.systemAge ?? null),
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

        publicDetails: PublicProfile.safeDetails(p.uid)
      }));
    } catch (err) {
      warn && warn("presence", "Presence scan failed", err);
      return [];
    }
  }

  // -------------------------------------------------------------------------
  // SYSTEM AGE (SELF, HUMAN-FACING, v24.0)
// -------------------------------------------------------------------------
  function getSystemAge() {
    try {
      const days = SystemClock.organismAgeDays();
      const category = classifyAgeCategory(days);

      return {
        uptimeSeconds: SystemClock.uptimeSeconds(),
        organismAgeDays: days,
        organismAgeCategory: category
      };
    } catch (err) {
      warn && warn("presence", "SystemClock unavailable", err);
      return {
        uptimeSeconds: 0,
        organismAgeDays: 0,
        organismAgeCategory: "unknown"
      };
    }
  }

  // -------------------------------------------------------------------------
  // PAGE BUILDER (v24.0 IMMORTAL-ADVANTAGE++)
// -------------------------------------------------------------------------
  function build(entryNodeId, context = {}) {
    const senses = PulseSenses.forAwarenessPage(entryNodeId, context);
    const nearby = buildNearbyPresenceList();
    const age = getSystemAge();

    const meshPressure = clamp01(senses.mesh?.pressure ?? 0);
    const flowPressure = clamp01(senses.flow?.pressure ?? 0);

    const pressureField = {
      meshPressure,
      flowPressure,
      combinedPressure: clamp01((meshPressure + flowPressure) / 2)
    };

    return Object.freeze({
      meta,

      performance: senses.performance,
      stability: senses.stability,
      drift: senses.drift,

      environment: senses.environment,
      safety: senses.safety,
      hormones: senses.hormones,
      aura: senses.aura,
      mesh: senses.mesh,
      sdn: senses.sdn,
      mode: senses.mode,

      narrative: senses.narrative,
      pressureField,

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
