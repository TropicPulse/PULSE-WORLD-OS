// ============================================================================
// FILE: PulseMeshPresenceJobView-v24-IMMORTAL-ADVANTAGE++.js
// PULSE OS v24 — PRESENCE-Evo-MESH-AWARE-IMMORTAL-ADVANTAGE++
// ---------------------------------------------------------------------------
//  PRESENCE JOB VIEW (HUMAN + AI HYBRID, IMMORTAL-GRADE v24++)
// ---------------------------------------------------------------------------
//  ROLE:
//    • Unified presence/job surface merging:
//        - PresenceAwarenessPage-v24 (human HUD)
//        - PresenceAIView-v24 (machine AI view)
//        - PresenceScanner (raw presence)
//        - Earn/job readiness context
//    • Feeds:
//        - PresenceJobAssignment-v24
//        - MentorUpgradeRequest-v24
//        - PowerUserRanking-v24
//        - Overmind social/earn routing
//
//  GUARANTEES (v24 IMMORTAL ADVANTAGE++):
//    • Deterministic — same input → same output
//    • Drift-proof — no ordering drift
//    • Zero-mutation — never mutates presence/profile objects
//    • Zero-compute — metadata shaping only
//    • Zero-network — no external fetch
//    • Dual-band — symbolic + binary + dual
//    • Mesh-aware — hops, distance, meshPresenceBand
//    • Mastery-aware — skillLevel + masteryTier
//    • System-age-aware — ageCategory
//    • Advantage-aware — advantageField + advantageBand
//    • Pressure-aware — meshPressure + flowPressure
//    • Earn-aware — jobReadiness from earner_context
//
//  CONTRACT:
//    ALWAYS:
//      • PresenceAwareness
//      • PresenceAIView
//      • PowerUserRanking
//      • PulseMeshPresenceRelay
//
//    NEVER:
//      • legacyPresenceJobView
//      • safeRoute
//      • fetchViaCNS
//
// ============================================================================

//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝

// META EXPORTS
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// ============================================================================
// FACTORY — v24 IMMORTAL ADVANTAGE++
// ============================================================================
export function createPresenceJobView({
  PresenceAwarenessPage,
  PresenceAIView,
  PresenceScanner,
  IdentityDirectory,
  SystemClock,
  PublicProfile,
  log, warn, error
}) {

  // -------------------------------------------------------------------------
  // META BLOCK — IMMORTAL-ADVANTAGE++
// -------------------------------------------------------------------------
  const meta = Object.freeze({
    layer: "PresenceJobView",
    role: "PRESENCE_JOB_SURFACE",
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
  // HELPERS
  // -------------------------------------------------------------------------
  function classifyAgeCategory(days) {
    if (typeof days !== "number" || Number.isNaN(days)) return "unknown";
    if (days < 30) return "new";
    if (days < 365) return "mature";
    return "veteran";
  }

  // -------------------------------------------------------------------------
  // NEARBY PRESENCE (JOB-READY, v24++)
  // -------------------------------------------------------------------------
  function buildNearbyPresenceJobList() {
    try {
      const raw = PresenceScanner.scanNearby() || [];

      return raw.map((p) => {
        const displayName = IdentityDirectory.safeName(p.uid);
        const systemAge = SystemClock.safeAgeOf(p.uid);
        const publicDetails = PublicProfile.safeDetails(p.uid);

        const systemAgeCategory = classifyAgeCategory(systemAge);

        const skillLevel = p.skillLevel ?? null;
        const masteryTier = p.masteryTier ?? null;

        const meshRole = p.meshRole ?? publicDetails?.role ?? null;
        const meshIdentity = p.meshIdentity ?? publicDetails?.rank ?? null;

        const powerUser =
          systemAgeCategory === "veteran" ||
          p.presenceBand === "binary" ||
          publicDetails?.rank === "mentor" ||
          publicDetails?.role === "teacher" ||
          (skillLevel >= 4) ||
          (masteryTier >= 3);

        return {
          uid: p.uid,
          displayName,
          distance: p.distance,
          meshHops: p.meshHops ?? null,
          meshDistance: p.meshDistance ?? null,

          presenceBand: p.presenceBand ?? "symbolic",
          meshPresenceBand: p.meshPresenceBand ?? null,

          systemAge,
          systemAgeCategory,

          skillLevel,
          masteryTier,

          meshRole,
          meshIdentity,

          advantageField: p.advantageField ?? null,
          advantageBand: p.advantageBand ?? null,

          meshPressure: p.meshPressure ?? null,
          flowPressure: p.flowPressure ?? null,

          signalStrength: p.signalStrength ?? null,

          publicDetails,
          powerUser
        };
      });

    } catch (err) {
      warn?.("presence-job", "Presence scan failed", err);
      return [];
    }
  }

  // -------------------------------------------------------------------------
  // JOB READINESS (v24++)
  // -------------------------------------------------------------------------
  function computeJobReadiness(impulse) {
    if (!impulse || !impulse.flags) return "unknown";

    const ctx = impulse.flags.earner_context || {};
    const cls = ctx.class || "medium";
    const urgency = ctx.urgency ?? 0.5;
    const volatility = ctx.volatility ?? 0.5;
    const band = ctx.presence_band || "symbolic";

    let score = 0;

    if (cls === "heavy") score += 2;
    if (cls === "medium") score += 1;

    if (urgency > 0.9) score += 2;
    else if (urgency > 0.6) score += 1;

    if (volatility < 0.05) score += 2;
    else if (volatility < 0.2) score += 1;

    if (band === "binary") score += 2;
    if (band === "dual") score += 1;

    if (score >= 6) return "high";
    if (score >= 3) return "medium";
    if (score >= 1) return "low";
    return "unknown";
  }

  // -------------------------------------------------------------------------
  // BUILD JOB VIEW — v24 IMMORTAL ADVANTAGE++
// -------------------------------------------------------------------------
  function build(entryNodeId, context = {}) {
    const awareness = PresenceAwarenessPage.build(entryNodeId, context);
    const aiView = PresenceAIView.build(entryNodeId, context);

    const nearby = buildNearbyPresenceJobList();
    const jobReadiness = computeJobReadiness(context.impulse);

    return Object.freeze({
      meta,

      // HUMAN-FACING PRESENCE HUD
      performance: awareness.performance,
      stability: awareness.stability,
      drift: awareness.drift,
      environment: awareness.environment,
      safety: awareness.safety,
      hormones: awareness.hormones,
      aura: awareness.aura,
      mesh: awareness.mesh,
      sdn: awareness.sdn,
      mode: awareness.mode,
      narrative: awareness.narrative,

      // JOB + PRESENCE SURFACE
      nearbyPresence: nearby,
      systemAge: awareness.systemAge,
      jobReadiness,

      // MACHINE-FACING AI PRESENCE
      aiPresence: {
        performance_percent: aiView.performance_percent,
        stability: aiView.stability,
        drift_risk: aiView.drift_risk,
        environment: aiView.environment,
        presence: aiView.presence,
        nearbyPresence: aiView.nearbyPresence,
        pressureField: aiView.pressureField
      }
    });
  }

  return Object.freeze({
    meta,
    build
  });
}
