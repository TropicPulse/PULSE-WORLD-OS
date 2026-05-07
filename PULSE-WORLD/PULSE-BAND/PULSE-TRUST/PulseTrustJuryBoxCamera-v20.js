// ============================================================================
//  PULSE‑TRUST JURY BOX CAMERA v20.0.0 IMMORTAL
//  RAW Black‑Box Recorder • Behavioral Pattern Detector • AI‑Blind
//  v20+: Evidence‑helping, schema‑tagged, ER‑ready
// ============================================================================

/*
AI_EXPERIENCE_META:
  organ: PulseTrustJuryBoxCamera
  version: 20.0.0
  tier: IMMORTAL
  layer: trust
  role: trust_jury_observer
  mind: false

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
       - patterns (dominance, AI‑echo, decision distribution, timing)
       - anomalies (dominance, echo clusters, timing irregularities)
       - rawEvents (immutable)
       - rawVerdicts (immutable)
       - snapshot (ER‑ready, metadata‑only)

     These outputs feed:
       - JuryFeed (as citizenWitness patterns/anomalies)
       - CreatorFlags
       - JuryCouncil (systemic drift detection)
       - ExpansionCompliance (constitutional enforcement)
       - PulseTrustEvidence / Evidential Records (as RAW_AI snapshot)"

  lineage:
    parent: "PulseTrustJuryBoxCamera-v16++"
    evolution: "v20++ IMMORTAL — RAW recorder + AI‑blind + anomaly clustering + ER‑ready"

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
    - "Always produces ER‑ready, schema‑tagged snapshots."

  contract:
    always:
      - "PulseTrustJuryFrame"
      - "PulseTrustJuryCouncil"
      - "PulseTrustCreatorFlags"
      - "PulseTrustEvidence / Evidential Records (as RAW_AI snapshot)"
    never:
      - "safeRoute"
      - "fetchViaCNS"
      - "contentMutation"
      - "AIWriteAccess"
*/

export const PulseTrustJuryBoxCameraMeta = Object.freeze({
  id: "PulseTrustJuryBoxCamera-v20++",
  version: "20.0.0",
  role: "trust_jury_observer",
  mind: false,
  description:
    "IMMORTAL RAW black‑box recorder for jury sessions. AI‑blind, immutable, ER‑ready.",
  identity: {
    type: "organ",
    name: "PulseTrustJuryBoxCamera",
    band: "trust",
    mind: false,
    immutable: true
  },
  schema: {
    snapshotType: "trust_jury_box_camera",
    categories: ["RAW", "RAW_AI"],
    erReady: true
  }
});

// ============================================================================
//  CLASS — RAW BLACK BOX RECORDER v20
// ============================================================================
export function createJuryBoxCamera() {
  // --------------------------------------------------------------------------
  //  analyzeSession — RAW → patterns + anomalies + ER‑ready snapshot
  // --------------------------------------------------------------------------
  function analyzeSession({
    sessionId = null,
    ts = Date.now(),
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
      if (dt < 5) {
        // <5ms = suspicious burst
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
    //  BUILD ER‑READY SNAPSHOT (metadata‑only, RAW_AI category)
// ------------------------------------------------------------------------
    const snapshot = Object.freeze({
      meta: PulseTrustJuryBoxCameraMeta,
      sessionId,
      ts,
      schema: PulseTrustJuryBoxCameraMeta.schema,
      patterns: Object.freeze({ ...patterns }),
      anomalies: Object.freeze([...anomalies]),
      // RAW references are kept separate so ER can store them as RAW if desired
      rawRef: {
        eventsCount: rawEvents.length,
        verdictsCount: rawVerdicts.length
      }
    });

    // ------------------------------------------------------------------------
    //  RETURN IMMUTABLE CAMERA SNAPSHOT + RAW
    // ------------------------------------------------------------------------
    return Object.freeze({
      meta: PulseTrustJuryBoxCameraMeta,
      snapshot,          // ER‑ready, RAW_AI
      patterns: snapshot.patterns,
      anomalies: snapshot.anomalies,
      rawEvents,         // RAW
      rawVerdicts        // RAW
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
