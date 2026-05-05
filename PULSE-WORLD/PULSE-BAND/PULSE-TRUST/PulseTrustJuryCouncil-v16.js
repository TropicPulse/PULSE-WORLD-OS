// ============================================================================
//  PULSE‑TRUST JURY COUNCIL v16++ IMMORTAL — META-JURY
//  Evaluates Jury behavior over time • Detects systemic drift & manipulation
// ============================================================================

/*
AI_EXPERIENCE_META:
  organ: PulseTrustJuryCouncil
  version: 16.2.0
  tier: IMMORTAL
  layer: trust
  role: trust_jury_council

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
     and OvermindPrime’s high‑risk behavioral adjustments."

  lineage:
    parent: "PulseTrustJuryCouncil-v15"
    evolution: "v16++ IMMORTAL — systemic drift + AI‑mirror delta aware"

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

  contract:
    always:
      - "PulseTrustJuryFrame"
      - "PulseTrustCreatorFlags"
      - "PulseTrustJuryFeed"
    never:
      - "safeRoute"
      - "fetchViaCNS"
      - "directCandidateEvaluation"
*/

export const PulseTrustJuryCouncilMeta = Object.freeze({
  id: "PulseTrustJuryCouncil-v16++",
  version: "16.2.0",
  role: "trust_jury_council",
  mind: false,
  description:
    "IMMORTAL meta‑jury evaluating systemic jury behavior over time.",
  identity: {
    type: "organ",
    name: "PulseTrustJuryCouncil",
    band: "trust",
    mind: false,
    immutable: true
  }
});

// ============================================================================
//  CLASS — META-JURY
// ============================================================================
export function createJuryCouncil() {

  // --------------------------------------------------------------------------
  //  REVIEW JURY HISTORY — CORE META-JURY LOGIC
  // --------------------------------------------------------------------------
  function reviewJuryHistory({ juryDecisions = [] } = {}) {
    let failCount = 0;
    let warnCount = 0;
    let aiOriginRiskCount = 0;
    let dominanceRiskCount = 0;

    // New metrics for v16++
    let lensInstabilityCount = 0;
    let environmentStressCount = 0;
    let deltaDivergenceCount = 0;
    let anomalyClusterCount = 0;

    // Track lens patterns
    const lensFailureMap = {};
    const lensDominanceMap = {};

    for (const d of juryDecisions) {
      const verdict = d?.verdict;
      const flags = d?.creatorFlags || {};
      const lenses = d?.lenses || {};
      const delta = d?.delta || {};
      const patterns = d?.patterns || {};

      // Basic verdict stats
      if (verdict === "fail") failCount++;
      if (verdict === "warn") warnCount++;

      // Creator flag stats
      if (flags.aiOriginRisk) aiOriginRiskCount++;
      if (flags.dominanceRisk) dominanceRiskCount++;

      // Lens instability
      if (flags.lensInstability) lensInstabilityCount++;

      // Environment stress
      if (flags.environmentStress) environmentStressCount++;

      // RAW vs AI divergence
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

      // Anomaly clustering
      if (patterns?.mismatchCounts) {
        const totalMismatch = Object.values(patterns.mismatchCounts)
          .reduce((a, b) => a + b, 0);
        if (totalMismatch >= 20) anomalyClusterCount++;
      }

      // Lens failure/dominance patterns
      for (const [lensName, lensData] of Object.entries(lenses)) {
        if (!lensFailureMap[lensName]) lensFailureMap[lensName] = 0;
        if (!lensDominanceMap[lensName]) lensDominanceMap[lensName] = 0;

        if (lensData?.status === "fail") lensFailureMap[lensName]++;
        if (lensData?.dominant === true) lensDominanceMap[lensName]++;
      }
    }

    // ------------------------------------------------------------------------
    //  SYSTEMIC FLAGS — IMMORTAL TIER
    // ------------------------------------------------------------------------
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

    // ------------------------------------------------------------------------
    //  RETURN IMMUTABLE META-JURY SNAPSHOT
    // ------------------------------------------------------------------------
    return Object.freeze({
      meta: PulseTrustJuryCouncilMeta,
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
  }

  // --------------------------------------------------------------------------
  //  RETURN IMMUTABLE ORGAN
  // --------------------------------------------------------------------------
  return Object.freeze({
    meta: PulseTrustJuryCouncilMeta,
    reviewJuryHistory
  });
}

export default createJuryCouncil;
