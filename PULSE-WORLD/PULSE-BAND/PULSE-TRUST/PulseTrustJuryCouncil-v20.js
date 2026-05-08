// ============================================================================
//  PULSE‑TRUST JURY COUNCIL v20.0.0 IMMORTAL — META-JURY
//  Evaluates Jury behavior over time • Detects systemic drift & manipulation
//  v20+: Evidence‑helping, schema‑tagged, ER‑ready
// ============================================================================

/*
AI_EXPERIENCE_META:
  organ: PulseTrustJuryCouncil
  version: 20.0.0
  tier: IMMORTAL
  layer: trust
  role: trust_jury_council
  mind: false

  description:
    "The JuryCouncil is the meta‑jury of the Pulse organism.
     It does not judge candidates — it judges the jury itself.
     It analyzes verdict history, lens breakdowns, creator flags,
     AI‑origin risk, dominance patterns, anomaly chains, and
     RAW vs AI‑mirror deltas over time.

     Its purpose is to detect:
       - systemic jury drift
       - repeated AI‑origin influence
       - dominance patterns across lenses
       - high‑stress environmental distortion
       - anomaly clustering
       - flow corruption
       - verdict instability
       - repeated RAW vs AI divergence

     The JuryCouncil produces systemicFlags:
       - highFailRate
       - highWarnRate
       - frequentAiOriginRisk
       - frequentDominanceRisk
       - lensInstability
       - environmentStress
       - deltaDivergence
       - anomalyClusters
       - juryDrift

     These flags feed CreatorFlags, ExpansionCompliance,
     OvermindPrime, and Evidential Records as ER‑ready snapshots."

  lineage:
    parent: "PulseTrustJuryCouncil-v16++"
    evolution: "v20++ IMMORTAL — systemic drift + AI‑mirror delta aware + ER‑ready"

  identity:
    type: "organ"
    name: "PulseTrustJuryCouncil"
    band: "trust"
    mind: false
    immutable: true

  guarantees:
    - "Never mutates jury history."
    - "Never performs AI reasoning."
    - "Never filters or compresses evidence."
    - "Always deterministic and drift-proof."
    - "Always metadata-only."
    - "Always produces ER‑ready, schema‑tagged snapshots."

  contract:
    always:
      - "PulseTrustJuryFrame"
      - "PulseTrustCreatorFlags"
      - "PulseTrustJuryFeed"
      - "PulseTrustEvidence / Evidential Records (as RAW_AI snapshot)"
    never:
      - "safeRoute"
      - "fetchViaCNS"
      - "directCandidateEvaluation"
*/
import { admin, db } from "../PULSE-X/PulseWorldFirebaseGenome-v20.js";
export const PulseTrustJuryCouncilMeta = Object.freeze({
  id: "PulseTrustJuryCouncil-v20++",
  version: "20.0.0",
  role: "trust_jury_council",
  mind: false,
  description:
    "IMMORTAL meta‑jury evaluating systemic jury behavior over time, ER‑ready.",
  identity: {
    type: "organ",
    name: "PulseTrustJuryCouncil",
    band: "trust",
    mind: false,
    immutable: true
  },
  schema: {
    snapshotType: "trust_jury_council",
    categories: ["RAW_AI"],
    erReady: true
  }
});

// ============================================================================
//  CLASS — META-JURY v20
// ============================================================================
export function createJuryCouncil() {
  function reviewJuryHistory({
    juryDecisions = [],
    councilId = null,
    ts = null
  } = {}) {

    // Deterministic timestamp — NEVER Date.now()
    const resolvedTs =
      ts ??
      juryDecisions[juryDecisions.length - 1]?.ts ??
      admin.firestore.Timestamp.now();

    let failCount = 0;
    let warnCount = 0;
    let aiOriginRiskCount = 0;
    let dominanceRiskCount = 0;

    let lensInstabilityCount = 0;
    let environmentStressCount = 0;
    let deltaDivergenceCount = 0;
    let anomalyClusterCount = 0;

    const lensFailureMap = {};
    const lensDominanceMap = {};

    for (const d of juryDecisions) {
      const verdict = d?.verdict;
      const flags = d?.creatorFlags || {};
      const lenses = d?.lenses || {};
      const delta = d?.delta || {};
      const patterns = d?.patterns || {};

      if (verdict === "fail") failCount++;
      if (verdict === "warn") warnCount++;

      if (flags.aiOriginRisk) aiOriginRiskCount++;
      if (flags.dominanceRisk) dominanceRiskCount++;

      if (flags.lensInstability) lensInstabilityCount++;
      if (flags.environmentStress) environmentStressCount++;

      const deltaMagnitude =
        Object.keys(delta.mesh || {}).length +
        Object.keys(delta.castle || {}).length +
        Object.keys(delta.server || {}).length +
        Object.keys(delta.expansion || {}).length +
        Object.keys(delta.earn || {}).length +
        Object.keys(delta.routing || {}).length +
        Object.keys(delta.presence || {}).length +
        Object.keys(delta.metrics || {}).length;

      if (deltaMagnitude >= 10) deltaDivergenceCount++;

      if (patterns?.mismatchCounts) {
        const totalMismatch = Object.values(patterns.mismatchCounts)
          .reduce((a, b) => a + b, 0);
        if (totalMismatch >= 20) anomalyClusterCount++;
      }

      for (const [lensName, lensData] of Object.entries(lenses)) {
        if (!lensFailureMap[lensName]) lensFailureMap[lensName] = 0;
        if (!lensDominanceMap[lensName]) lensDominanceMap[lensName] = 0;

        if (lensData?.status === "fail") lensFailureMap[lensName]++;
        if (lensData?.dominant === true) lensDominanceMap[lensName]++;
      }
    }

    const systemicFlags = {
      highFailRate: failCount >= 5,
      highWarnRate: warnCount >= 10,
      frequentAiOriginRisk: aiOriginRiskCount >= 5,
      frequentDominanceRisk: dominanceRiskCount >= 3,

      lensInstability: lensInstabilityCount >= 5,
      environmentStress: environmentStressCount >= 5,
      deltaDivergence: deltaDivergenceCount >= 5,
      anomalyClusters: anomalyClusterCount >= 3,

      juryDrift:
        failCount >= 10 ||
        warnCount >= 20 ||
        deltaDivergenceCount >= 10 ||
        lensInstabilityCount >= 10
    };

    const snapshot = Object.freeze({
      meta: PulseTrustJuryCouncilMeta,
      schema: PulseTrustJuryCouncilMeta.schema,
      councilId,
      ts: resolvedTs,
      stats: {
        total: juryDecisions.length,
        failCount,
        warnCount,
        aiOriginRiskCount,
        dominanceRiskCount,
        lensInstabilityCount,
        environmentStressCount,
        deltaDivergenceCount,
        anomalyClusterCount,
        lensFailureMap,
        lensDominanceMap
      },
      systemicFlags
    });

    return Object.freeze({
      meta: PulseTrustJuryCouncilMeta,
      snapshot,
      stats: snapshot.stats,
      systemicFlags: snapshot.systemicFlags
    });
  }

  return Object.freeze({
    meta: PulseTrustJuryCouncilMeta,
    reviewJuryHistory
  });
}


export default createJuryCouncil;
