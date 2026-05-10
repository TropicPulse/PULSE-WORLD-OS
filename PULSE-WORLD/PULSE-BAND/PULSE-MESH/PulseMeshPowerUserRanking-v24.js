// ============================================================================
// FILE: PulseMeshPowerUserRanking-v24-IMMORTAL-ADVANTAGE++.js
// PULSE OS v24.0 — PRESENCE-Evo-MESH-AWARE-ADVANTAGE++
// ---------------------------------------------------------------------------
//  POWER USER RANKING ENGINE (IMMORTAL-ADVANTAGE FIELD)
// ---------------------------------------------------------------------------
//  ROLE:
//    • Computes deterministic rankScore for presence nodes.
//    • Backbone of mentor selection, social graph ordering,
//      and Overmind’s presence reasoning.
//    • Metadata-only, deterministic, drift-proof, zero-mutation.
//
//  ARCHITECTURAL POSITION:
//    • Lives in the Presence-Social layer.
//    • Reads from PresenceAIView (presenceBand, systemAge, founderEra).
//    • Reads from MeshPresence (meshRole, meshIdentity, proximity).
//    • Reads from Mastery (skillLevel, masteryTier).
//    • Reads from AdvantageField (advantageBand / advantageScore).
//    • Feeds MentorUpgradeRequest, OvermindSocial, PresenceJobView.
//
//  GUARANTEES (v24-IMMORTAL-ADVANTAGE++):
//    • Deterministic — same input → same output.
//    • Drift-proof — no ranking drift over time.
//    • Zero-mutation — never mutates presence objects.
//    • Zero-network — no external fetch.
//    • Dual-band — symbolic + binary scoring.
//    • Mesh-aware — reads mesh proximity + identity.
//    • Mastery-aware — reads skillLevel + masteryTier.
//    • System-age-aware — founderEra + ageCategory.
//    • Advantage-field-aware — unified advantage cascade.
//    • Presence-pressure-aware — reads meshPressure / flowPressure (if present).
//
//  CONTRACT:
//    ALWAYS:
//      • PresenceAwareness
//      • PresenceAIView
//      • MentorUpgradeRequest
//
//    NEVER:
//      • legacyRanking
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
// FACTORY — v24 IMMORTAL ADVANTAGE++
// ============================================================================
export function createPowerUserRanking({ log, warn, error } = {}) {

  // -------------------------------------------------------------------------
  // META BLOCK — IMMORTAL-ADVANTAGE++
// -------------------------------------------------------------------------
  const meta = Object.freeze({
    layer: "PowerUserRanking",
    role: "POWER_USER_RANKING",
    version: "24.0-IMMORTAL-ADVANTAGE++",
    evo: {
      presenceAware: true,            // Reads presence bands + system age
      meshAware: true,                // Reads mesh proximity + identity
      masteryAware: true,             // Reads masteryTier + subsystem mastery
      skillLevelAware: true,          // Reads skillLevel (1–5)
      systemAgeAware: true,           // FounderEra / AgeCategory
      socialAware: true,              // Social graph aware
      unifiedAdvantageField: true,    // Advantage cascade scoring
      deterministicField: true,       // No randomness, no drift
      zeroCompute: true,              // Conceptual: only simple weighting
      zeroMutation: true,             // Never mutates presence objects
      zeroNetworkFetch: true,         // No external fetch
      dualBand: true,                 // Symbolic + binary scoring
      meshPressureAware: true,        // Reads mesh tension signals
      flowPressureAware: true,        // Reads flowPressure if present
      safeRouteFree: true             // No safeRoute allowed
    }
  });

  // -------------------------------------------------------------------------
  // HELPERS — v24++
// -------------------------------------------------------------------------
  function clamp01(v) {
    if (typeof v !== "number" || Number.isNaN(v)) return 0;
    return Math.max(0, Math.min(1, v));
  }

  function ageScore(person) {
    switch (person.systemAgeCategory) {
      case "veteran": return 4;
      case "mature":  return 3;
      case "stable":  return 2;
      case "new":     return 0;
      default:        return 0;
    }
  }

  function bandScore(person) {
    switch (person.presenceBand) {
      case "binary":   return 4;
      case "dual":     return 3;
      case "symbolic": return 1;
      default:         return 0;
    }
  }

  function skillScore(person) {
    const s = person.skillLevel || 0;
    return Math.max(0, Math.min(5, s));
  }

  function masteryScore(person) {
    const m = person.masteryTier || 0;
    return Math.max(0, Math.min(5, m));
  }

  function meshRoleScore(person) {
    switch (person.meshRole) {
      case "teacher": return 4;
      case "guide":   return 3;
      case "helper":  return 2;
      default:        return 0;
    }
  }

  function meshIdentityScore(person) {
    switch (person.meshIdentity) {
      case "mentor":      return 4;
      case "contributor": return 2;
      case "learner":     return 1;
      default:            return 0;
    }
  }

  function powerUserScore(person) {
    return person.powerUser ? 2 : 0;
  }

  function advantageScore(person) {
    // advantageField or advantageBand, metadata-only
    const field = person.advantageField || person.advantageBand || null;
    if (field === "elite")  return 4;
    if (field === "high")   return 3;
    if (field === "medium") return 2;
    if (field === "low")    return 1;
    return 0;
  }

  function proximityScore(person) {
    // meshProximity: 0..1 (optional)
    const p = clamp01(person.meshProximity ?? 0);
    if (p >= 0.9) return 4;
    if (p >= 0.6) return 3;
    if (p >= 0.3) return 2;
    if (p > 0)    return 1;
    return 0;
  }

  function pressureScore(person) {
    // meshPressure / flowPressure: 0..1 (optional)
    const meshP = clamp01(person.meshPressure ?? 0);
    const flowP = clamp01(person.flowPressure ?? 0);
    const combined = clamp01((meshP + flowP) / 2);

    // High pressure slightly *reduces* rank (they’re overloaded).
    if (combined >= 0.8) return -2;
    if (combined >= 0.5) return -1;
    return 0;
  }

  function mentorAffinityScore(person) {
    // Optional: explicit mentorAffinity flag or tag
    if (person.mentorAffinity === "high") return 3;
    if (person.mentorAffinity === "medium") return 2;
    if (person.mentorAffinity === "low") return 1;
    return 0;
  }

  function classifyTier(rawScore) {
    if (rawScore >= 28) return "elite";
    if (rawScore >= 20) return "high";
    if (rawScore >= 12) return "medium";
    if (rawScore > 0)   return "emerging";
    return "unranked";
  }

  // -------------------------------------------------------------------------
  // DETERMINISTIC RANK SCORE (v24.0 IMMORTAL-ADVANTAGE++)
  // -------------------------------------------------------------------------
  //  INPUT:
  //    • person — presence node with v24 metadata
  //
  //  OUTPUT:
  //    • { raw, normalized, tier, breakdown }
// -------------------------------------------------------------------------
  function computeRankScore(person) {
    const breakdown = {
      age: ageScore(person),
      band: bandScore(person),
      skill: skillScore(person),
      mastery: masteryScore(person),
      meshRole: meshRoleScore(person),
      meshIdentity: meshIdentityScore(person),
      powerUser: powerUserScore(person),
      advantage: advantageScore(person),
      proximity: proximityScore(person),
      pressure: pressureScore(person),
      mentorAffinity: mentorAffinityScore(person)
    };

    const raw =
      breakdown.age +
      breakdown.band +
      breakdown.skill +
      breakdown.mastery +
      breakdown.meshRole +
      breakdown.meshIdentity +
      breakdown.powerUser +
      breakdown.advantage +
      breakdown.proximity +
      breakdown.pressure +
      breakdown.mentorAffinity;

    // Rough max: keep normalization simple and deterministic.
    const maxPossible = 4 + 4 + 5 + 5 + 4 + 4 + 2 + 4 + 4 + 0 + 3; // 39
    const normalized = maxPossible > 0 ? clamp01(raw / maxPossible) : 0;
    const tier = classifyTier(raw);

    return {
      raw,
      normalized,
      tier,
      breakdown
    };
  }

  // -------------------------------------------------------------------------
  // EXPLAIN RANK — human-readable breakdown (metadata-only)
// -------------------------------------------------------------------------
  function explainRank(person) {
    const result = computeRankScore(person);
    return Object.freeze({
      meta,
      uid: person.uid,
      displayName: person.displayName,
      rankScore: result.raw,
      rankTier: result.tier,
      normalized: result.normalized,
      breakdown: result.breakdown
    });
  }

  // -------------------------------------------------------------------------
  // RANK NEARBY PRESENCE (v24.0)
// -------------------------------------------------------------------------
  //  INPUT:
  //    • nearbyPresence — array of presence nodes
  //
  //  OUTPUT:
  //    • sorted list by rankScore (desc), then displayName
  //    • each entry enriched with rankScore, rankTier, normalized, breakdown
  // -------------------------------------------------------------------------
  function rankNearby(nearbyPresence) {
    const list = (nearbyPresence || []).map((p) => {
      const result = computeRankScore(p);
      return {
        ...p,
        rankScore: result.raw,
        rankTier: result.tier,
        rankNormalized: result.normalized,
        rankBreakdown: result.breakdown
      };
    });

    list.sort((a, b) => {
      if (b.rankScore !== a.rankScore) return b.rankScore - a.rankScore;
      return String(a.displayName || "").localeCompare(String(b.displayName || ""));
    });

    return list;
  }

  // -------------------------------------------------------------------------
  // PUBLIC API
  // -------------------------------------------------------------------------
  return Object.freeze({
    meta,
    rankNearby,
    computeRankScore,
    explainRank
  });
}
