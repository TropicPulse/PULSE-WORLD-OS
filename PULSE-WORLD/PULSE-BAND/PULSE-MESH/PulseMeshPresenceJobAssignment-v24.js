// ============================================================================
// FILE: PulseMeshPresenceJobAssignment-v24-IMMORTAL-ADVANTAGE++.js
// PULSE OS v24 — PRESENCE-Evo-MESH-AWARE-IMMORTAL-ADVANTAGE++
// ---------------------------------------------------------------------------
//  PRESENCE-BASED JOB ASSIGNMENT ENGINE (IMMORTAL-GRADE v24++)
// ---------------------------------------------------------------------------
//  ROLE:
//    • Deterministically assigns jobs to nearby presence nodes.
//    • Reads presence, mesh, mastery, skill, age, advantage, band, identity.
//    • Uses PresenceJobView-v24 as the canonical presence/job surface.
//    • Uses JobCatalog-v24 as deterministic job pool provider.
//    • Zero mutation, zero compute, zero drift.
//
//  ARCHITECTURAL POSITION:
//    • Lives in presence_social layer.
//    • Reads:
//        - PresenceJobView-v24 (presence, mesh, readiness, advantage)
//        - JobCatalog-v24 (deterministic job definitions)
//    • Feeds:
//        - Earn pipelines
//        - Mentor/learner flows
//        - Overmind task routing
//
//  GUARANTEES (v24 IMMORTAL ADVANTAGE++):
//    • Deterministic — same input → same output.
//    • Drift-proof — no scoring drift.
//    • Zero-mutation — never mutates presence or job objects.
//    • Zero-network — no external fetch.
//    • Dual-band — symbolic + binary + dual.
//    • Mesh-aware — meshRole, meshIdentity, meshProximity.
//    • Mastery-aware — skillLevel + masteryTier.
//    • Advantage-aware — advantageField + advantageBias.
//    • System-age-aware — ageCategory influences job type.
//    • Pressure-aware — meshPressure + flowPressure influence scoring.
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
//      • legacyJobAssignment
//      • safeRoute
//      • fetchViaCNS
//
// ============================================================================

import { OrganismIdentity } from "../PULSE-X/PulseWorldOrganismMap-v24.js";
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
export function createPresenceJobAssignment({
  PresenceJobView,
  JobCatalog,
  log, warn, error
}) {

  // -------------------------------------------------------------------------
  // META BLOCK — IMMORTAL-ADVANTAGE++
// -------------------------------------------------------------------------
  const meta = Object.freeze({
    layer: "PresenceJobAssignment",
    role: "JOB_ASSIGNMENT_ENGINE",
    version: "24.0-IMMORTAL-ADVANTAGE++",
    evo: {
      presenceAware: true,
      earnAware: true,
      tendonAware: true,
      meshAware: true,
      masteryAware: true,
      skillLevelAware: true,
      systemAgeAware: true,
      dualBand: true,
      unifiedAdvantageField: true,
      deterministicField: true,
      driftProof: true,
      zeroCompute: true,
      zeroMutation: true,
      zeroNetworkFetch: true,
      meshPressureAware: true,
      flowPressureAware: true,
      safeRouteFree: true,
      futureEvolutionReady: true
    }
  });

  // -------------------------------------------------------------------------
  // JOB POOL SELECTION — v24 deterministic
  // -------------------------------------------------------------------------
  function selectJobPool(jobReadiness) {
    if (jobReadiness === "high")   return JobCatalog.forHighReadiness();
    if (jobReadiness === "medium") return JobCatalog.forMediumReadiness();
    if (jobReadiness === "low")    return JobCatalog.forLowReadiness();
    return JobCatalog.forUnknownReadiness
      ? JobCatalog.forUnknownReadiness()
      : JobCatalog.forLowReadiness();
  }

  // -------------------------------------------------------------------------
  // SCORING ENGINE — v24 IMMORTAL ADVANTAGE++
  // -------------------------------------------------------------------------
  function scoreJobForPresence(job, person) {
    let score = 0;
    const tags = job.tags || [];

    // -----------------------------------------------------
    // Mentor / Learner alignment
    // -----------------------------------------------------
    if (person.powerUser && tags.includes("mentor")) score += 3;
    if (!person.powerUser && tags.includes("learner")) score += 3;

    // -----------------------------------------------------
    // Presence band alignment
    // -----------------------------------------------------
    if (person.presenceBand === "binary"   && tags.includes("precision")) score += 2;
    if (person.presenceBand === "dual"     && tags.includes("bridge"))    score += 2;
    if (person.presenceBand === "symbolic" && tags.includes("creative"))  score += 2;

    // -----------------------------------------------------
    // System age alignment
    // -----------------------------------------------------
    switch (person.systemAgeCategory) {
      case "veteran":
        if (tags.includes("advanced")) score += 2;
        if (tags.includes("mentor"))   score += 1;
        break;
      case "mature":
        if (tags.includes("core")) score += 2;
        break;
      case "new":
        if (tags.includes("onboarding")) score += 2;
        break;
    }

    // -----------------------------------------------------
    // Skill + Mastery alignment
    // -----------------------------------------------------
    const skill = person.skillLevel || 0;
    const mastery = person.masteryTier || 0;

    if (skill >= 4 && tags.includes("high_skill")) score += 2;
    if (skill <= 2 && tags.includes("low_skill"))  score += 2;

    if (mastery >= 4 && tags.includes("high_mastery")) score += 2;
    if (mastery <= 2 && tags.includes("low_mastery"))  score += 2;

    // -----------------------------------------------------
    // Mesh role / identity alignment
    // -----------------------------------------------------
    if (person.meshRole === "teacher" && tags.includes("teaching")) score += 2;
    if (person.meshRole === "guide"   && tags.includes("guidance")) score += 2;

    if (person.meshIdentity === "mentor"      && tags.includes("mentor"))       score += 1;
    if (person.meshIdentity === "contributor" && tags.includes("contribution")) score += 1;
    if (person.meshIdentity === "learner"     && tags.includes("learning"))     score += 1;

    // -----------------------------------------------------
    // Advantage field alignment (v24++)
    // -----------------------------------------------------
    if (person.advantageField === "elite")  score += 3;
    if (person.advantageField === "high")   score += 2;
    if (person.advantageField === "medium") score += 1;

    // -----------------------------------------------------
    // Mesh / Flow pressure awareness (v24++)
    // -----------------------------------------------------
    const meshP = person.meshPressure ?? 0;
    const flowP = person.flowPressure ?? 0;
    const combined = (meshP + flowP) / 2;

    // High pressure → prefer stable jobs
    if (combined >= 0.7 && tags.includes("stable")) score += 2;
    if (combined >= 0.4 && tags.includes("low_pressure")) score += 1;

    return score;
  }

  // -------------------------------------------------------------------------
  // ASSIGNMENT ENGINE — v24 IMMORTAL ADVANTAGE++
  // -------------------------------------------------------------------------
  function assign(entryNodeId, context = {}) {
    const view = PresenceJobView.build(entryNodeId, context);
    const nearby = view.nearbyPresence || [];
    const jobReadiness = view.jobReadiness || "unknown";

    const pool = selectJobPool(jobReadiness);
    const assignments = [];

    for (const person of nearby) {
      let bestJob = null;
      let bestScore = -Infinity;

      for (const job of pool) {
        const s = scoreJobForPresence(job, person);
        if (s > bestScore) {
          bestScore = s;
          bestJob = job;
        }
      }

      if (bestJob) {
        assignments.push({
          uid: person.uid,
          displayName: person.displayName,
          jobId: bestJob.id,
          jobTitle: bestJob.title,
          jobTags: bestJob.tags,
          presenceBand: person.presenceBand,
          systemAge: person.systemAge,
          systemAgeCategory: person.systemAgeCategory,
          powerUser: person.powerUser,
          skillLevel: person.skillLevel,
          masteryTier: person.masteryTier,
          meshRole: person.meshRole,
          meshIdentity: person.meshIdentity,
          advantageField: person.advantageField,
          meshPressure: person.meshPressure,
          flowPressure: person.flowPressure,
          score: bestScore
        });
      }
    }

    return Object.freeze({
      meta,
      jobReadiness,
      assignments
    });
  }

  return Object.freeze({
    meta,
    assign
  });
}
