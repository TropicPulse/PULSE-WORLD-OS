// ============================================================================
// FILE: PulseMeshPresenceAwarenessPage.js
// PULSE OS v15.0 — PRESENCE-Evo-MESH-AWARE
// ---------------------------------------------------------------------------
//  PRESENCE AWARENESS PAGE (HUMAN-FACING, IMMORTAL-GRADE COMMENTARY)
// ---------------------------------------------------------------------------
//  ROLE:
//    • This organ is the *human-facing presence HUD*.
//    • It shows nearby users with safe, non-sensitive metadata.
//    • It exposes skillLevel, masteryTier, systemAgeCategory, meshRole,
//      meshIdentity, presenceBand, and distance.
//    • It is the canonical “social radar” of the organism.
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
//  GUARANTEES:
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
// export const PulseMeshMeta = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
// export const PULSE_EARN_IMMUNE_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;
export function createPresenceAwarenessPage({
  PulseSenses,
  PresenceScanner,
  SystemClock,
  IdentityDirectory,
  PublicProfile,
  log, warn, error
}) {

  // -------------------------------------------------------------------------
  // META BLOCK — IMMORTAL-GRADE
  // -------------------------------------------------------------------------
  const meta = Object.freeze({
    layer: "PresenceAwarenessPage",
    role: "PRESENCE_HUD",
    version: "15.0-Evo",
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
      safeRouteFree: true             // No safeRoute allowed
    }
  });

  // -------------------------------------------------------------------------
  // SAFE NEARBY PRESENCE (HUMAN-FACING, v15.0)
// -------------------------------------------------------------------------
//  INPUT:
//    • PresenceScanner.scanNearby()
//
//  OUTPUT (per person):
//    • displayName
//    • distance
//    • meshHops
//    • presenceBand
//    • systemAge
//    • systemAgeCategory
//    • skillLevel
//    • masteryTier
//    • meshRole
//    • meshIdentity
//    • publicDetails (safe)
// -------------------------------------------------------------------------
  function buildNearbyPresenceList() {
    try {
      const raw = PresenceScanner.scanNearby() || [];

      return raw.map((p) => ({
        displayName: IdentityDirectory.safeName(p.uid),
        distance: p.distance,
        meshHops: p.meshHops ?? null,
        presenceBand: p.presenceBand,
        systemAge: SystemClock.safeAgeOf(p.uid),
        systemAgeCategory: p.systemAgeCategory ?? null,
        skillLevel: p.skillLevel ?? null,
        masteryTier: p.masteryTier ?? null,
        meshRole: p.meshRole ?? null,
        meshIdentity: p.meshIdentity ?? null,
        publicDetails: PublicProfile.safeDetails(p.uid)
      }));
    } catch (err) {
      warn && warn("presence", "Presence scan failed", err);
      return [];
    }
  }

  // -------------------------------------------------------------------------
  // SYSTEM AGE (SELF, HUMAN-FACING)
// -------------------------------------------------------------------------
  function getSystemAge() {
    try {
      const days = SystemClock.organismAgeDays();
      let category = "unknown";

      if (days < 30) category = "new";
      else if (days < 365) category = "mature";
      else category = "veteran";

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
  // PAGE BUILDER (v15.0)
// -------------------------------------------------------------------------
  function build(entryNodeId, context = {}) {
    const senses = PulseSenses.forAwarenessPage(entryNodeId, context);
    const nearby = buildNearbyPresenceList();
    const age = getSystemAge();

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
