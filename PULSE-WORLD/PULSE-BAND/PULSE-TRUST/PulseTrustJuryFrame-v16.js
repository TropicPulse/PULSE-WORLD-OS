// ============================================================================
//  PULSE‑TRUST JURY FRAME v16++ IMMORTAL — VERDICT ENGINE WRAPPER
//  12‑Lens Constitutional Justice Engine • RAW + AI‑Mirror Aware
//  Bridges JuryFeed → JuryFrame → Trust Fabric
// ============================================================================

/*
AI_EXPERIENCE_META:
  organ: PulseTrustJuryFrame
  version: 16.2.0
  tier: IMMORTAL
  role: trust_jury_frame
  description:
    "Trust-facing wrapper around the IMMORTAL JuryFrame justice engine.
     Accepts RAW + AI‑mirror evidence packets from PulseTrustJuryFeed,
     applies the 12‑lens constitutional justice system,
     and emits deterministic verdicts for the Trust fabric."

  guarantees:
    - "Never mutates evidence."
    - "Never performs AI reasoning."
    - "Never filters or compresses juryFeed."
    - "Always produces deterministic verdicts."
    - "Always drift‑proof and immutable."
    - "Always preserves lens breakdowns."

  lineage:
    parent: "JuryFrame-v12.3-Evo+"
    evolution: "v16++ IMMORTAL — RAW + AI‑mirror + delta aware"

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
      - JuryCouncil
      - CreatorFlags
      - ExpansionCompliance
*/

import {
  JuryFrameMeta,
  createJuryFrame,
  evaluateJury
} from "../PULSE-AI-JURY/JuryFrame-v16++.js";

export const PulseTrustJuryFrameMeta = Object.freeze({
  id: "PulseTrustJuryFrame-v16++",
  version: "16.2.0",
  role: "trust_jury_frame",
  mind: false,
  description:
    "IMMORTAL trust-facing wrapper around the JuryFrame justice engine.",
  identity: {
    type: "organ",
    name: "PulseTrustJuryFrame",
    band: "trust",
    mind: false,
    immutable: true
  },
  juryMeta: JuryFrameMeta
});

// ============================================================================
//  CLASS — TRUST JURY FRAME WRAPPER
// ============================================================================
export function createPulseTrustJuryFrame({ safetyAPI } = {}) {
  // Underlying IMMORTAL JuryFrame
  const jury = createJuryFrame({ safetyAPI });

  // --------------------------------------------------------------------------
  //  EVALUATE — MAIN VERDICT ENTRYPOINT
  // --------------------------------------------------------------------------
  function evaluate({
    intent = null,
    context = null,
    candidate = null,
    juryFeed = null,
    binaryVitals = null,
    boundaryArtery = null
  } = {}) {

    // No mutation, no inference, no filtering.
    const verdict = jury.evaluate({
      intent,
      context,
      candidate,
      juryFeed,
      binaryVitals,
      boundaryArtery
    });

    return Object.freeze({
      meta: PulseTrustJuryFrameMeta,
      verdict,
      lenses: verdict?.lenses || null,
      worldLens: verdict?.worldLens || null,
      artery: verdict?.artery || null,
      ts: Date.now()
    });
  }

  // --------------------------------------------------------------------------
  //  RETURN IMMUTABLE WRAPPER
  // --------------------------------------------------------------------------
  return Object.freeze({
    meta: PulseTrustJuryFrameMeta,
    evaluate,
    getLenses: jury.getLenses
  });
}

// ============================================================================
//  ONE‑OFF EVALUATION HELPER
// ============================================================================
export function evaluateWithTrustJury(args = {}) {
  return evaluateJury(args);
}

export default createPulseTrustJuryFrame;
