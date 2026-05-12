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

PULSE-WORLD-MAP.js
import {
  OrganismIdentity,
  buildPulseOrganismMap as PulseOrganismMap
} from "./PULSE-WORLD-MAP.js";
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
  function analyzeSession({
    sessionId = null,
    ts = null,
    events = [],
    verdicts = []
  } = {}) {

    // Deterministic timestamp — NEVER Date.now()
    const resolvedTs =
      ts ??
      admin.firestore.Timestamp.now();

    const rawEvents = Object.freeze([...events]);
    const rawVerdicts = Object.freeze([...verdicts]);

    const patterns = {
      dominantUser: null,
      dominantUserDecisionCount: 0,
      aiEchoCount: 0,
      decisionDistribution: {},
      timingIrregularities: 0
    };

    const anomalies = [];
    const decisionByUser = new Map();
    let aiEchoCount = 0;

    // PASS 1 — RAW event analysis
    for (const e of rawEvents) {
      if (e.type === "decision" && e.actor) {
        const prev = decisionByUser.get(e.actor) || 0;
        decisionByUser.set(e.actor, prev + 1);
      }

      if (e.aiOrigin === true) {
        aiEchoCount++;
      }
    }

    // PASS 2 — Dominance detection
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

    // PASS 3 — Timing irregularities
    const sorted = [...rawEvents].sort((a, b) => a.ts - b.ts);

    for (let i = 1; i < sorted.length; i++) {
      const dt = sorted[i].ts - sorted[i - 1].ts;
      if (dt < 5) {
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

    // PASS 4 — AI echo anomaly
    if (aiEchoCount >= 5) {
      anomalies.push({
        type: "aiEchoCluster",
        count: aiEchoCount,
        severity: 3,
        note: "High AI-origin echo frequency."
      });
    }

    // ER‑ready snapshot
    const snapshot = Object.freeze({
      meta: PulseTrustJuryBoxCameraMeta,
      sessionId,
      ts: resolvedTs,
      schema: PulseTrustJuryBoxCameraMeta.schema,
      patterns: Object.freeze({ ...patterns }),
      anomalies: Object.freeze([...anomalies]),
      rawRef: {
        eventsCount: rawEvents.length,
        verdictsCount: rawVerdicts.length
      }
    });

    return Object.freeze({
      meta: PulseTrustJuryBoxCameraMeta,
      snapshot,
      patterns: snapshot.patterns,
      anomalies: snapshot.anomalies,
      rawEvents,
      rawVerdicts
    });
  }

  return Object.freeze({
    meta: PulseTrustJuryBoxCameraMeta,
    analyzeSession
  });
}


export default createJuryBoxCamera;
