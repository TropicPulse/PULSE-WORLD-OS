// ============================================================================
//  PULSE‑TRUST CREATOR FLAGS v20.0.0 IMMORTAL
//  Constitutional Fusion Layer • Creator‑Facing Risk Dashboard
//  ER‑Ready • CNS‑Aware • Evidence‑Helping
// ============================================================================

/*
AI_EXPERIENCE_META:
  organ: PulseTrustCreatorFlags
  version: 20.0.0
  tier: IMMORTAL
  layer: trust
  role: trust_creator_flags
  mind: false

  description:
    "PulseTrustCreatorFlags is the constitutional fusion layer that aggregates
     all trust signals into a single Creator‑facing risk snapshot.

     It fuses:
       - JuryFrame verdict creatorFlags
       - JuryBoxCamera behavioral anomalies
       - JuryCouncil systemic drift flags
       - ExpansionCompliance violations + riskProfile
       - RAW vs AI delta divergence
       - environmental stress (advantage)
       - dominance patterns
       - anomaly clusters
       - AI‑origin influence
       - CNS bandSnapshot (PulseWorldBand)
       - trustEvidence (Evidential Records v20)

     It produces:
       - a fused, immutable, constitutional risk object
       - a Creator‑grade dashboard of the organism’s integrity
       - a single source of truth for high‑risk regimes
       - an ER‑ready snapshot for long‑term forensic continuity

     It does not decide. It informs.
     It does not override. It reveals.
     It does not judge. It contextualizes.

     This is the Creator’s window into the organism’s justice membrane."

  lineage:
    parent: "PulseTrustCreatorFlags-v16++"
    evolution: "v20++ IMMORTAL — RAW + AI‑mirror + delta + systemic fusion + CNS + ER"

  identity:
    type: "organ"
    name: "PulseTrustCreatorFlags"
    band: "trust"
    mind: false
    immutable: true

  guarantees:
    - "Never mutates inputs."
    - "Never performs AI reasoning."
    - "Always deterministic and drift-proof."
    - "Always metadata-only."
    - "Always ER‑ready and CNS‑aware."
*/
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝


import { admin, db } from "../X-PULSE-X/PulseWorldFirebaseGenome-v20.js";
export const PulseTrustCreatorFlagsMeta = Object.freeze({
  id: "PulseTrustCreatorFlags-v20++",
  version: "20.0.0",
  role: "trust_creator_flags",
  mind: false,
  description:
    "IMMORTAL fusion layer producing Creator‑level constitutional risk flags, CNS‑aware.",
  identity: {
    type: "organ",
    name: "PulseTrustCreatorFlags",
    band: "trust",
    mind: false,
    immutable: true
  },
  schema: {
    snapshotType: "trust_creator_flags",
    categories: ["RAW_AI"],
    erReady: true
  }
});

// ============================================================================
//  CREATOR FLAG FUSION ENGINE v20
// ============================================================================
export function fuseCreatorFlags({
  juryResult = null,
  boxCameraSnapshot = null,
  councilSnapshot = null,
  expansionCompliance = null,
  delta = null,
  advantage = null,
  bandSnapshot = null,
  trustEvidence = null,
  ts = null,
  creatorSessionId = null
} = {}) {

  // Deterministic timestamp — NEVER Date.now()
  const resolvedTs =
    ts ??
    admin.firestore.Timestamp.now();

  const juryFlags = juryResult?.creatorFlags || {};
  const boxAnomalies = boxCameraSnapshot?.anomalies || [];
  const councilFlags = councilSnapshot?.systemicFlags || {};
  const expansionFlags = expansionCompliance?.violations || [];
  const expansionRisk = expansionCompliance?.riskProfile || {};

  const deltaMagnitude = delta
    ? Object.values(delta).reduce(
        (sum, sub) => sum + Object.keys(sub || {}).length,
        0
      )
    : 0;

  const stressScore = advantage?.ai
    ? (advantage.ai.meshPressure ?? 0) +
      (advantage.ai.castleLoad ?? 0) +
      (advantage.ai.routingLatency ?? 0)
    : 0;

  const anomalyRisk = boxAnomalies.some(a => (a?.severity ?? 1) >= 3);

  const bandMode = bandSnapshot?.mode ?? null;
  const bandRisk =
    bandMode === "high_risk" ||
    bandMode === "offline_biased" ||
    (bandSnapshot?.fallbackLevel ?? 0) > 0;

  const evidenceDrift =
    trustEvidence?.categories?.RAW_AI?.length >= 5 ||
    trustEvidence?.categories?.AI?.length >= 5;

  const fused = {
    aiOriginRisk: !!juryFlags.aiOriginRisk,
    juryFlowRisk: !!juryFlags.juryFlowRisk,
    dominanceRisk: !!juryFlags.dominanceRisk,
    anomalyRisk: !!juryFlags.anomalyRisk || anomalyRisk,
    expansionCentralizationRisk: !!juryFlags.expansionCentralizationRisk,
    highStressContext: !!juryFlags.highStressContext,

    systemicHighFailRate: !!councilFlags.highFailRate,
    systemicHighWarnRate: !!councilFlags.highWarnRate,
    systemicFrequentAiOriginRisk: !!councilFlags.frequentAiOriginRisk,
    systemicFrequentDominanceRisk: !!councilFlags.frequentDominanceRisk,
    systemicLensInstability: !!councilFlags.lensInstability,
    systemicDeltaDivergence: !!councilFlags.deltaDivergence,
    systemicAnomalyClusters: !!councilFlags.anomalyClusters,
    systemicJuryDrift: !!councilFlags.juryDrift,

    expansionBypassJury: expansionRisk.bypassJury > 0,
    expansionBypassUser: expansionRisk.bypassUser > 0,
    expansionAiOriginInfluence: expansionRisk.aiOriginInfluence > 0,
    expansionDrift: expansionRisk.drift > 0,
    expansionAnomaly: expansionRisk.anomaly > 0,
    expansionStress: expansionRisk.stress > 0,
    expansionCompliant: expansionCompliance?.compliant ?? true,

    rawVsAiDivergence: deltaMagnitude >= 10,

    environmentHighPressure: stressScore >= 50,

    bandInstability: !!bandRisk,

    trustEvidenceDrift: !!evidenceDrift
  };

  const snapshot = Object.freeze({
    meta: PulseTrustCreatorFlagsMeta,
    schema: PulseTrustCreatorFlagsMeta.schema,
    ts: resolvedTs,
    creatorSessionId,
    flags: Object.freeze(fused),
    context: Object.freeze({
      juryResult,
      boxCameraSnapshot,
      councilSnapshot,
      expansionCompliance,
      deltaMagnitude,
      stressScore,
      bandSnapshot,
      trustEvidence
    })
  });

  return snapshot;
}


export default fuseCreatorFlags;
