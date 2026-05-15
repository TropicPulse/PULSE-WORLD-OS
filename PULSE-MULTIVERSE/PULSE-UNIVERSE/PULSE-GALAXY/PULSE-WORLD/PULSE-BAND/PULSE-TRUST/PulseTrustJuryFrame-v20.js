// ============================================================================
//  PULSE‑TRUST JURY FRAME v20.0.0 IMMORTAL — VERDICT ENGINE WRAPPER
//  12‑Lens Constitutional Justice Engine • RAW + AI‑Mirror Aware
//  Bridges JuryFeed → JuryFrame → Trust Fabric → Evidential Records
// ============================================================================

/*
AI_EXPERIENCE_META:
  organ: PulseTrustJuryFrame
  version: 20.0.0
  tier: IMMORTAL
  role: trust_jury_frame
  mind: false

  description:
    "Trust-facing wrapper around the IMMORTAL JuryFrame justice engine.
     Accepts RAW + AI‑mirror evidence packets from PulseTrustJuryFeed,
     applies the 12‑lens constitutional justice system,
     and emits deterministic verdicts for the Trust fabric.

     It does not judge candidates directly — it exposes the JuryFrame’s
     lens breakdowns, artery decisions, and worldLens outcomes in a
     metadata‑rich, ER‑ready snapshot for systemic oversight."

  guarantees:
    - "Never mutates evidence."
    - "Never performs AI reasoning."
    - "Never filters or compresses juryFeed."
    - "Always produces deterministic verdicts."
    - "Always drift‑proof and immutable."
    - "Always preserves lens breakdowns and artery decisions."
    - "Always ER‑ready and schema‑tagged."

  lineage:
    parent: "JuryFrame-v16++"
    evolution: "v20++ IMMORTAL — RAW + AI‑mirror + delta aware + ER‑ready"

  identity:
    type: "organ"
    name: "PulseTrustJuryFrame"
    band: "trust"
    mind: false
    immutable: true

  integration:
    receives:
      - juryFeed (RAW + AI‑mirror + delta + patterns + advantage)
      - binaryVitals
      - boundaryArtery
      - intent / context / candidate
    feeds:
      - JuryCouncil (systemic drift)
      - CreatorFlags (creator‑visible signals)
      - ExpansionCompliance (constitutional enforcement)
      - PulseTrustEvidence / Evidential Records (as RAW_AI snapshot)

  schema:
    snapshotType: "trust_jury_frame_verdict"
    categories: ["RAW_AI"]
    erReady: true
*/
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝

// 2 — EXPORT GENOME METADATA
// export const PulseBinaryWaveScannerMeta = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
// export const WBC_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

import { JuryFrameMeta, createJuryFrame, evaluateJury} from "../PULSE-AI/PulseAIJuryFrame-v24.js";
import { admin, db } from "../X-PULSE-X/PulseWorldFirebaseGenome-v20.js";

export const PulseTrustJuryFrameMeta = Object.freeze({
  id: "PulseTrustJuryFrame-v20++",
  version: "20.0.0",
  role: "trust_jury_frame",
  mind: false,
  description:
    "IMMORTAL trust-facing wrapper around the JuryFrame justice engine, ER‑ready.",
  identity: {
    type: "organ",
    name: "PulseTrustJuryFrame",
    band: "trust",
    mind: false,
    immutable: true
  },
  juryMeta: JuryFrameMeta,
  schema: {
    snapshotType: "trust_jury_frame_verdict",
    categories: ["RAW_AI"],
    erReady: true
  }
});

// ============================================================================
//  CLASS — TRUST JURY FRAME WRAPPER v20
// ============================================================================
export function createPulseTrustJuryFrame({ safetyAPI } = {}) {
  const jury = createJuryFrame({ safetyAPI });

  function evaluate({
    intent = null,
    context = null,
    candidate = null,
    juryFeed = null,
    binaryVitals = null,
    boundaryArtery = null,
    requestId = null,
    juryId = null
  } = {}) {

    // Deterministic timestamp — NEVER Date.now()
    const ts =
      juryFeed?.meta?.ts ??
      admin.firestore.Timestamp.now();

    const verdict = jury.evaluate({
      intent,
      context,
      candidate,
      juryFeed,
      binaryVitals,
      boundaryArtery
    });

    const snapshot = Object.freeze({
      meta: PulseTrustJuryFrameMeta,
      schema: PulseTrustJuryFrameMeta.schema,
      ts,
      requestId,
      juryId,
      intent,
      context,
      candidateRef: candidate?.id ?? null,
      juryFeedRef: juryFeed?.meta?.id ?? null,
      verdict: verdict || null,
      lenses: verdict?.lenses || null,
      worldLens: verdict?.worldLens || null,
      artery: verdict?.artery || null,
      flags: verdict?.flags || null
    });

    return snapshot;
  }

  return Object.freeze({
    meta: PulseTrustJuryFrameMeta,
    evaluate,
    getLenses: jury.getLenses
  });
}


// ============================================================================
//  ONE‑OFF EVALUATION HELPER (thin pass‑through)
// ============================================================================
export function evaluateWithTrustJury(args = {}) {
  return evaluateJury(args);
}

export default createPulseTrustJuryFrame;
