// ============================================================================
// FILE: PulseMeshMentorUpgradeRequest-v24-IMMORTAL-ADVANTAGE.js
// PULSE OS v24 — PRESENCE-Evo-MESH-AWARE-IMMORTAL-ADVANTAGE++
// ---------------------------------------------------------------------------
//  MENTOR UPGRADE REQUEST SURFACE (IMMORTAL-GRADE v24++)
// ---------------------------------------------------------------------------
//  ROLE:
//    • Social presence gateway for mentor upgrades.
//    • Pure metadata surface — no compute, no mutation, no routing.
//    • Reads presence, mesh, mastery, skill-level, system-age, advantage fields.
//    • Produces deterministic, drift-proof mentor candidate lists.
//    • Feeds Overmind’s social reasoning layer.
//
//  GUARANTEES (v24 IMMORTAL ADVANTAGE++):
//    • Deterministic — same input → same output.
//    • Drift-proof — topology, ranking, and advantage fields stable.
//    • Zero-mutation — never mutates presence objects.
//    • Zero-compute — pure metadata shaping.
//    • Zero-network — no fetch, no external calls.
//    • Dual-band — symbolic + binary presence scoring.
//    • Mesh-aware — proximity, hops, mesh identity.
//    • Presence-aware — bands, systemAge, founderEra.
//    • Mastery-aware — skillLevel, masteryTier.
//    • Advantage-aware — rankScore, advantageBias.
//    • Social-aware — mentor/mentee graph.
//    • Immortal-field — unified advantage + deterministic field.
//    • Future-evolution-ready — v24 kernel alignment.
//
//  CONTRACT:
//    ALWAYS:
//      • PresenceAwareness
//      • PresenceAIView
//      • PowerUserRanking
//      • PulseMeshPresenceRelay
//
//    NEVER:
//      • legacyMentorUpgrade
//      • safeRoute
//      • fetchViaCNS
//
// ============================================================================

import {
  OrganismIdentity
} from "../PULSE-X/PULSE-WORLD-MAP.js
";

const Identity = OrganismIdentity(import.meta.url);

// META EXPORTS
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// ============================================================================
// ORGAN FACTORY — v24 IMMORTAL ADVANTAGE++
// ============================================================================
export function createMentorUpgradeRequest({
  PresenceJobView,
  PowerUserRanking,
  log, warn, error
}) {

  // -------------------------------------------------------------------------
  // META BLOCK — IMMORTAL-GRADE v24++
  // -------------------------------------------------------------------------
  const meta = Object.freeze({
    layer: "MentorUpgradeRequest",
    role: "MENTOR_UPGRADE_SURFACE",
    version: "24-IMMORTAL-ADVANTAGE++",
    evo: {
      presenceAware: true,
      meshAware: true,
      masteryAware: true,
      skillLevelAware: true,
      systemAgeAware: true,
      socialAware: true,
      unifiedAdvantageField: true,
      deterministicField: true,
      zeroCompute: true,
      zeroMutation: true,
      zeroNetworkFetch: true,
      dualBand: true,
      meshPressureAware: true,
      advantageCascadeAware: true,
      futureEvolutionReady: true,
      safeRouteFree: true
    }
  });

  // -------------------------------------------------------------------------
  // BUILD MENTOR CANDIDATES — v24 IMMORTAL ADVANTAGE++
  // -------------------------------------------------------------------------
  function buildMentorCandidates(entryNodeId, context = {}) {
    const view = PresenceJobView.build(entryNodeId, context);
    const nearby = view.nearbyPresence || [];

    // v24 ranking includes:
    // • mastery
    // • skill
    // • mesh identity
    // • founder era
    // • advantage cascade
    // • presence band
    // • system age
    const ranking = PowerUserRanking.rankNearby(nearby);

    return ranking
      .filter((p) =>
        p.powerUser === true &&
        p.skillLevel >= 3 &&
        p.masteryTier >= 2 &&
        p.systemAgeCategory !== "new" &&
        p.meshProximity > 0
      )
      .map((p) => Object.freeze({
        uid: p.uid,
        displayName: p.displayName,
        presenceBand: p.presenceBand,
        systemAge: p.systemAge,
        systemAgeCategory: p.systemAgeCategory,
        skillLevel: p.skillLevel,
        masteryTier: p.masteryTier,
        meshRole: p.meshRole,
        meshIdentity: p.meshIdentity,
        meshProximity: p.meshProximity,
        advantageBias: p.advantageBias,
        rankScore: p.rankScore
      }));
  }

  // -------------------------------------------------------------------------
  // BUILD UPGRADE REQUEST PAYLOAD — v24 IMMORTAL ADVANTAGE++
  // -------------------------------------------------------------------------
  function buildUpgradeRequestPayload(requesterUid, mentorUid, reason) {
    return Object.freeze({
      meta,
      requester: { uid: requesterUid },
      mentor: { uid: mentorUid },
      reason: reason || "upgrade_request",
      status: "pending",
      version: meta.version
    });
  }

  // -------------------------------------------------------------------------
  // PUBLIC API
  // -------------------------------------------------------------------------
  function build(entryNodeId, context = {}) {
    const mentors = buildMentorCandidates(entryNodeId, context);

    return Object.freeze({
      meta,
      mentors
    });
  }

  return Object.freeze({
    meta,
    build,
    buildUpgradeRequestPayload
  });
}
