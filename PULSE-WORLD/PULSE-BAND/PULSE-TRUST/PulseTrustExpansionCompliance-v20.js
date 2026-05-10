// ============================================================================
//  PULSE‑TRUST EXPANSION COMPLIANCE v20.0.0 IMMORTAL
//  Constitutional Watchdog • Expansion Behavior Auditor • Drift Detector
//  ER‑Ready • Band/CNS‑Aware • Evidence‑Helping
// ============================================================================

/*
AI_EXPERIENCE_META:
  organ: PulseTrustExpansionCompliance
  version: 20.0.0
  tier: IMMORTAL
  layer: trust
  role: trust_expansion_compliance
  mind: false

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
       - whether Expansion acted during CNS band instability

     Inputs:
       - expansionActions (structured actions emitted by Expansion)
       - rawView (RAW subsystem truth)
       - aiView (AI-mirror worldview)
       - delta (RAW vs AI divergence)
       - patterns (from JuryFeed)
       - advantage (environmental pressure)
       - bandSnapshot (CNS / PulseWorldBand snapshot, optional)

     Outputs:
       - violations (structured constitutional violations)
       - complianceScore (0–100)
       - compliant (boolean)
       - riskProfile (dominance, drift, bypass, AI-origin, anomaly, stress, bandRisk)
       - environmentContext (pressure, stress, mismatch, bandState)
       - snapshot (ER‑ready, metadata‑only)

     This organ is the constitutional firewall that ensures Expansion
     never becomes a self-replicating, self-authorizing, self-governing
     runaway system."

  lineage:
    parent: "PulseTrustExpansionCompliance-v16++"
    evolution: "v20++ IMMORTAL — RAW + AI‑mirror + delta + CNS + ER‑ready"

  identity:
    type: "organ"
    name: "PulseTrustExpansionCompliance"
    band: "trust"
    mind: false
    immutable: true

  guarantees:
    - "Never mutates evidence."
    - "Never performs AI reasoning."
    - "Never filters or compresses RAW truth."
    - "Always deterministic and drift-proof."
    - "Always metadata-only, zero side-effects."
    - "Always ER‑ready and CNS‑aware."
*/
import {
  OrganismIdentity,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PulseWorldOrganismMap-v24.js";
const Identity = OrganismIdentity(import.meta.url);

// 2 — EXPORT GENOME METADATA
// export const PulseBinaryWaveScannerMeta = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
// export const WBC_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

import { admin, db } from "../PULSE-X/PulseWorldFirebaseGenome-v20.js";
export const PulseTrustExpansionComplianceMeta = Object.freeze({
  id: "PulseTrustExpansionCompliance-v20++",
  version: "20.0.0",
  role: "trust_expansion_compliance",
  mind: false,
  description:
    "IMMORTAL constitutional watchdog for Expansion behavior, ER‑ready and CNS‑aware.",
  identity: {
    type: "organ",
    name: "PulseTrustExpansionCompliance",
    band: "trust",
    mind: false,
    immutable: true
  },
  schema: {
    snapshotType: "trust_expansion_compliance",
    categories: ["RAW_AI"],
    erReady: true
  }
});

// ============================================================================
//  CLASS — EXPANSION COMPLIANCE ENGINE v20
// ============================================================================
export function createExpansionCompliance() {
  function evaluateExpansionBehavior({
    expansionActions = [],
    rawView = null,
    aiView = null,
    delta = null,
    patterns = null,
    advantage = null,
    bandSnapshot = null,
    ts = null,
    expansionSessionId = null
  } = {}) {

    // Deterministic timestamp — NEVER Date.now()
    const resolvedTs =
      ts ??
      admin.firestore.Timestamp.now();

    const violations = [];
    const riskProfile = {
      bypassJury: 0,
      bypassUser: 0,
      aiOriginInfluence: 0,
      dominance: 0,
      drift: 0,
      anomaly: 0,
      stress: 0,
      bandRisk: 0
    };

    // PASS 1 — Direct constitutional violations
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

    // PASS 2 — RAW vs AI divergence
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

    // PASS 3 — Pattern anomalies
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

    // PASS 4 — Advantage context
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

    // PASS 5 — Band / CNS context
    if (bandSnapshot) {
      const bandLevel = bandSnapshot.bandLevel ?? null;
      const fallbackLevel = bandSnapshot.fallbackLevel ?? null;
      const bandMode = bandSnapshot.mode ?? null;

      const unstable =
        bandMode === "high_risk" ||
        bandMode === "offline_biased" ||
        (typeof fallbackLevel === "number" && fallbackLevel > 0);

      if (unstable) {
        violations.push({
          type: "band_instability_context",
          severity: 2,
          bandLevel,
          fallbackLevel,
          bandMode,
          note: "Expansion executed during CNS band instability or high-risk mode."
        });
        riskProfile.bandRisk += 2;
      }
    }

    // Compliance score
    const totalRisk =
      riskProfile.bypassJury +
      riskProfile.bypassUser +
      riskProfile.aiOriginInfluence +
      riskProfile.dominance +
      riskProfile.drift +
      riskProfile.anomaly +
      riskProfile.stress +
      riskProfile.bandRisk;

    const complianceScore = Math.max(0, 100 - totalRisk * 10);
    const compliant = complianceScore >= 70;

    // ER‑ready snapshot
    const snapshot = Object.freeze({
      meta: PulseTrustExpansionComplianceMeta,
      schema: PulseTrustExpansionComplianceMeta.schema,
      ts: resolvedTs,
      expansionSessionId,
      violations: Object.freeze(violations),
      riskProfile: Object.freeze(riskProfile),
      complianceScore,
      compliant,
      environmentContext: Object.freeze({
        rawView,
        aiView,
        delta,
        patterns,
        advantage,
        bandSnapshot
      })
    });

    return snapshot;
  }

  return Object.freeze({
    meta: PulseTrustExpansionComplianceMeta,
    evaluateExpansionBehavior
  });
}


export default createExpansionCompliance;
