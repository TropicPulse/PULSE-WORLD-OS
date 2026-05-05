// ============================================================================
//  PULSE‑TRUST JURY BOX CAMERA v16++ IMMORTAL
//  RAW Black‑Box Recorder • Behavioral Pattern Detector • AI‑Blind
// ============================================================================

/*
AI_EXPERIENCE_META:
  organ: PulseTrustJuryBoxCamera
  version: 16.2.0
  tier: IMMORTAL
  layer: trust
  role: trust_jury_observer

  description:
    "The JuryBoxCamera is the RAW, immutable black‑box recorder of the
     constitutional justice system. It captures jury session behavior,
     dominance patterns, AI‑origin echoes, anomaly chains, and flow
     irregularities — without AI involvement, filtering, or mutation.

     It does not judge content. It judges behavior.
     It does not evaluate candidates. It evaluates the jury environment.

     It is AI‑blind:
       - AI cannot modify events.
       - AI cannot redact or reorder.
       - AI cannot suppress anomalies.
       - AI cannot rewrite history.

     It produces:
       - patterns (dominance, AI‑echo, decision distribution)
       - anomalies (dominance, echo clusters, timing irregularities)
       - rawEvents (immutable)
       - rawVerdicts (immutable)

     These outputs feed:
       - JuryFeed (as citizenWitness patterns/anomalies)
       - CreatorFlags
       - JuryCouncil (systemic drift detection)
       - ExpansionCompliance (constitutional enforcement)"

  lineage:
    parent: "PulseTrustJuryBoxCamera-v15"
    evolution: "v16++ IMMORTAL — RAW recorder + AI‑blind + anomaly clustering"

  identity:
    type: "organ"
    name: "PulseTrustJuryBoxCamera"
    band: "trust"
    mind: false
    immutable: true

  guarantees:
    - "Never mutates events."
    - "Never filters or compresses RAW data."
    - "Never allows AI to write to the recorder."
    - "Always deterministic and drift-proof."
    - "Always metadata-only."

  contract:
    always:
      - "PulseTrustJuryFrame"
      - "PulseTrustJuryCouncil"
      - "PulseTrustCreatorFlags"
    never:
      - "safeRoute"
      - "fetchViaCNS"
      - "contentMutation"
      - "AIWriteAccess"
*/

export const PulseTrustJuryBoxCameraMeta = Object.freeze({
  id: "PulseTrustJuryBoxCamera-v16++",
  version: "16.2.0",
  role: "trust_jury_observer",
  mind: false,
  description:
    "IMMORTAL RAW black‑box recorder for jury sessions. AI‑blind, immutable.",
  identity: {
    type: "organ",
    name: "PulseTrustJuryBoxCamera",
    band: "trust",
    mind: false,
    immutable: true
  }
});

// ============================================================================
//  CLASS — RAW BLACK BOX RECORDER
// ============================================================================
export function createJuryBoxCamera() {

  // --------------------------------------------------------------------------
  //  analyzeSession — RAW → patterns + anomalies
  // --------------------------------------------------------------------------
  function analyzeSession({
    events = [],     // RAW events: [{ type, actor, ts, aiOrigin, ... }]
    verdicts = []    // RAW verdicts: [{ decisionId, verdict, creatorFlags, ts }]
  } = {}) {

    // RAW → immutable
    const rawEvents = Object.freeze([...events]);
    const rawVerdicts = Object.freeze([...verdicts]);

    // Pattern accumulators
    const patterns = {
      dominantUser: null,
      dominantUserDecisionCount: 0,
      aiEchoCount: 0,
      decisionDistribution: {},
      timingIrregularities: 0
    };

    const anomalies = [];

    // Internal counters
    const decisionByUser = new Map();
    let aiEchoCount = 0;

    // ------------------------------------------------------------------------
    //  PASS 1 — RAW event analysis
    // ------------------------------------------------------------------------
    for (const e of rawEvents) {
      // Count decisions per actor
      if (e.type === "decision" && e.actor) {
        const prev = decisionByUser.get(e.actor) || 0;
        decisionByUser.set(e.actor, prev + 1);
      }

      // Count AI-origin echoes
      if (e.aiOrigin === true) {
        aiEchoCount++;
      }
    }

    // ------------------------------------------------------------------------
    //  PASS 2 — Dominance detection
    // ------------------------------------------------------------------------
    let dominantUser = null;
    let dominantCount = 0;

    for (const [user, count] of decisionByUser.entries()) {
      patterns.decisionDistribution[user] = count;
      if (count > dominantCount) {
        dominantUser = user;
        dominantCount = count;
      }
    }

    patterns.dominantUser = dominantUser;
    patterns.dominantUserDecisionCount = dominantCount;
    patterns.aiEchoCount = aiEchoCount;

    // Dominance anomaly
    if (dominantUser && dominantCount >= 3) {
      anomalies.push({
        type: "dominance",
        actor: dominantUser,
        count: dominantCount,
        severity: 2,
        note: "Single actor dominates decision stream."
      });
    }

    // ------------------------------------------------------------------------
    //  PASS 3 — Timing irregularities (burst decisions, unnatural spacing)
    // ------------------------------------------------------------------------
    const sorted = [...rawEvents].sort((a, b) => a.ts - b.ts);

    for (let i = 1; i < sorted.length; i++) {
      const dt = sorted[i].ts - sorted[i - 1].ts;
      if (dt < 5) { // <5ms = suspicious burst
        patterns.timingIrregularities++;
      }
    }

    if (patterns.timingIrregularities >= 5) {
      anomalies.push({
        type: "timing",
        count: patterns.timingIrregularities,
        severity: 2,
        note: "Unnatural burst timing detected."
      });
    }

    // ------------------------------------------------------------------------
    //  PASS 4 — AI echo anomaly
    // ------------------------------------------------------------------------
    if (aiEchoCount >= 5) {
      anomalies.push({
        type: "aiEchoCluster",
        count: aiEchoCount,
        severity: 3,
        note: "High AI-origin echo frequency."
      });
    }

    // ------------------------------------------------------------------------
    //  RETURN IMMUTABLE CAMERA SNAPSHOT
    // ------------------------------------------------------------------------
    return Object.freeze({
      meta: PulseTrustJuryBoxCameraMeta,
      patterns: Object.freeze(patterns),
      anomalies: Object.freeze(anomalies),
      rawEvents,
      rawVerdicts
    });
  }

  // --------------------------------------------------------------------------
  //  RETURN IMMUTABLE ORGAN
  // --------------------------------------------------------------------------
  return Object.freeze({
    meta: PulseTrustJuryBoxCameraMeta,
    analyzeSession
  });
}

export default createJuryBoxCamera;
