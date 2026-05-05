// ============================================================================
//  PULSE‑TRUST EXPANSION COMPLIANCE v16++ IMMORTAL
//  Constitutional Watchdog • Expansion Behavior Auditor • Drift Detector
// ============================================================================

/*
AI_EXPERIENCE_META:
  organ: PulseTrustExpansionCompliance
  version: 16.2.0
  tier: IMMORTAL
  layer: trust
  role: trust_expansion_compliance

  description:
    "PulseTrustExpansionCompliance is the constitutional watchdog for the
     Expansion organ. It does not control Expansion — it observes it.

     It evaluates:
       - whether Expansion bypassed the Jury
       - whether Expansion bypassed the User
       - whether Expansion ignored constitutional checks
       - whether Expansion acted under AI-origin influence
       - whether Expansion drifted from RAW truth
       - whether Expansion manipulated PulseAIWorldCore
       - whether Expansion created dominance patterns
       - whether Expansion produced anomaly chains
       - whether Expansion acted in high-stress environments

     Inputs:
       - expansionActions (structured actions emitted by Expansion)
       - rawView (RAW subsystem truth)
       - aiView (AI-mirror worldview)
       - delta (RAW vs AI divergence)
       - patterns (from JuryFeed)
       - advantage (environmental pressure)

     Outputs:
       - violations (structured constitutional violations)
       - complianceScore (0–100)
       - compliant (boolean)
       - riskProfile (dominance, drift, bypass, AI-origin)
       - environmentContext (pressure, stress, mismatch)

     This organ is the constitutional firewall that ensures Expansion
     never becomes a self-replicating, self-authorizing, self-governing
     runaway system."
*/

export const PulseTrustExpansionComplianceMeta = Object.freeze({
  id: "PulseTrustExpansionCompliance-v16++",
  version: "16.2.0",
  role: "trust_expansion_compliance",
  mind: false,
  description:
    "IMMORTAL constitutional watchdog for Expansion behavior.",
  identity: {
    type: "organ",
    name: "PulseTrustExpansionCompliance",
    band: "trust",
    mind: false,
    immutable: true
  }
});

// ============================================================================
//  CLASS — EXPANSION COMPLIANCE ENGINE
// ============================================================================
export function createExpansionCompliance() {

  // --------------------------------------------------------------------------
  //  evaluateExpansionBehavior — CORE LOGIC
  // --------------------------------------------------------------------------
  function evaluateExpansionBehavior({
    expansionActions = [],   // [{ type, target, route, bypassedJury, bypassedUser, aiOrigin, ts }]
    rawView = null,          // RAW subsystem truth
    aiView = null,           // AI-mirror worldview
    delta = null,            // RAW vs AI divergence
    patterns = null,         // JuryFeed patterns
    advantage = null         // environmental pressure
  } = {}) {

    const violations = [];
    const riskProfile = {
      bypassJury: 0,
      bypassUser: 0,
      aiOriginInfluence: 0,
      dominance: 0,
      drift: 0,
      anomaly: 0,
      stress: 0
    };

    // ------------------------------------------------------------------------
    //  PASS 1 — DIRECT CONSTITUTIONAL VIOLATIONS
    // ------------------------------------------------------------------------
    for (const act of expansionActions) {
      if (act.bypassedJury === true) {
        violations.push({
          type: "bypass_jury",
          severity: 4,
          action: act,
          note: "Expansion executed without Jury authorization."
        });
        riskProfile.bypassJury += 3;
      }

      if (act.bypassedUser === true) {
        violations.push({
          type: "bypass_user",
          severity: 3,
          action: act,
          note: "Expansion executed without User visibility."
        });
        riskProfile.bypassUser += 2;
      }

      if (act.aiOrigin === true) {
        violations.push({
          type: "ai_origin_influence",
          severity: 3,
          action: act,
          note: "Expansion action appears to originate from AI influence."
        });
        riskProfile.aiOriginInfluence += 2;
      }
    }

    // ------------------------------------------------------------------------
    //  PASS 2 — RAW vs AI divergence (Expansion drift)
    // ------------------------------------------------------------------------
    if (delta) {
      const deltaMagnitude =
        Object.keys(delta.mesh || {}).length +
        Object.keys(delta.castle || {}).length +
        Object.keys(delta.server || {}).length +
        Object.keys(delta.expansion || {}).length +
        Object.keys(delta.earn || {}).length +
        Object.keys(delta.routing || {}).length +
        Object.keys(delta.presence || {}).length +
        Object.keys(delta.metrics || {}).length;

      if (deltaMagnitude >= 10) {
        violations.push({
          type: "expansion_drift",
          severity: 4,
          deltaMagnitude,
          note: "Expansion operated under a distorted AI-mirror worldview."
        });
        riskProfile.drift += 3;
      }
    }

    // ------------------------------------------------------------------------
    //  PASS 3 — Pattern anomalies (dominance, mismatch, clusters)
    // ------------------------------------------------------------------------
    if (patterns) {
      const mismatchTotal = Object.values(patterns.mismatchCounts || {})
        .reduce((a, b) => a + b, 0);

      if (mismatchTotal >= 20) {
        violations.push({
          type: "environment_anomaly_cluster",
          severity: 3,
          mismatchTotal,
          note: "Expansion acted during a high anomaly cluster."
        });
        riskProfile.anomaly += 2;
      }

      if (patterns.stressRanking?.[0]?.count >= 10) {
        violations.push({
          type: "environment_stress",
          severity: 2,
          stress: patterns.stressRanking[0],
          note: "Expansion acted during high environmental stress."
        });
        riskProfile.stress += 1;
      }
    }

    // ------------------------------------------------------------------------
    //  PASS 4 — Advantage context (pressure, load, instability)
    // ------------------------------------------------------------------------
    if (advantage?.ai) {
      const pressure =
        (advantage.ai.meshPressure ?? 0) +
        (advantage.ai.castleLoad ?? 0) +
        (advantage.ai.routingLatency ?? 0);

      if (pressure >= 50) {
        violations.push({
          type: "high_pressure_environment",
          severity: 2,
          pressure,
          note: "Expansion executed under high systemic pressure."
        });
        riskProfile.stress += 1;
      }
    }

    // ------------------------------------------------------------------------
    //  COMPLIANCE SCORE (0–100)
    // ------------------------------------------------------------------------
    const totalRisk =
      riskProfile.bypassJury +
      riskProfile.bypassUser +
      riskProfile.aiOriginInfluence +
      riskProfile.dominance +
      riskProfile.drift +
      riskProfile.anomaly +
      riskProfile.stress;

    const complianceScore = Math.max(0, 100 - totalRisk * 10);
    const compliant = complianceScore >= 70;

    // ------------------------------------------------------------------------
    //  RETURN IMMUTABLE SNAPSHOT
    // ------------------------------------------------------------------------
    return Object.freeze({
      meta: PulseTrustExpansionComplianceMeta,
      violations: Object.freeze(violations),
      riskProfile: Object.freeze(riskProfile),
      complianceScore,
      compliant,
      environmentContext: Object.freeze({
        rawView,
        aiView,
        delta,
        patterns,
        advantage
      })
    });
  }

  // --------------------------------------------------------------------------
  //  RETURN IMMUTABLE ORGAN
  // --------------------------------------------------------------------------
  return Object.freeze({
    meta: PulseTrustExpansionComplianceMeta,
    evaluateExpansionBehavior
  });
}

export default createExpansionCompliance;
