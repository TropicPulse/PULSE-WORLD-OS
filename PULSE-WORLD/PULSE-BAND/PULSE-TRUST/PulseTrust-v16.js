// ============================================================================
//  PULSE‑TRUST v16++ IMMORTAL — ORGANISM BARREL
//  Constitutional Oversight • Jury System • Evidence Fabric • AI Delta Engine
//  Entry point for all Trust / Jury / Oversight organs
// ============================================================================
//
//  AI_EXPERIENCE_META:
//    organ: PulseTrustBarrel
//    version: 16.2.0
//    tier: IMMORTAL
//    role: trust_oversight_fabric
//    description:
//      "Central barrel for the Pulse‑Trust constitutional oversight system.
//       Provides unified access to JuryFeed, JuryFrame, JuryCouncil,
//       CreatorFlags, ExpansionCompliance, and JuryBoxCamera.
//       Integrates RAW truth, AI‑mirror worldview (PulseAIWorldCore),
//       and AI trace surfaces for full evidential analysis."
//
//    guarantees:
//      - "Never mutates evidence."
//      - "Never performs AI reasoning."
//      - "Never filters or compresses RAW truth."
//      - "Always exposes RAW + AI‑mirror + delta surfaces."
//      - "Always routes evidence to JuryFrame deterministically."
//      - "Always preserves constitutional integrity."
//
//    integration:
//      receives:
//        - PulseAIWorldCore (AI‑mirror worldview)
//        - RAW subsystem providers
//        - OvermindPrime traces
//        - EvolutionaryThought traces
//        - EvolutionaryInstincts traces
//      feeds:
//        - JuryFrame (verdict engine)
//        - JuryCouncil (oversight escalation)
//        - CreatorFlags (creator‑level signals)
//        - ExpansionCompliance (constitutional enforcement)
//        - JuryBoxCamera (session recorder)
//
//    identity:
//      type: "organism_barrel"
//      band: "trust"
//      mind: false
//      immutable: true
//
//    lineage:
//      parent: "Pulse‑Trust v15"
//      evolution: "v16++ IMMORTAL — AI‑mirror + RAW delta constitutional fabric"
//
//    safety:
//      - "No AI cognition allowed."
//      - "No summarization or interpretation."
//      - "No mutation of evidence packets."
//      - "No interference with JuryFrame verdicts."
//
// ============================================================================

export const PulseTrustBarrelMeta = Object.freeze({
  id: "PulseTrustBarrel-v16++",
  version: "16.2.0",
  role: "trust_oversight_fabric",
  mind: false,
  description:
    "IMMORTAL constitutional oversight barrel for the Pulse‑Trust system.",
  identity: {
    type: "organism_barrel",
    name: "PulseTrustBarrel",
    band: "trust",
    mind: false,
    immutable: true
  }
});

// ============================================================================
//  META EXPORT (ROOT META)
// ============================================================================
export { PulseTrustMeta } from "./PulseTrustMeta-v16++.js";

// ============================================================================
//  JURY FEED — RAW + AI‑MIRROR + DELTA EVIDENCE FABRIC
// ============================================================================
export {
  PulseTrustJuryFeedMeta,
  buildJuryFeed
} from "./PulseTrustJuryFeed-v16++.js";

// ============================================================================
//  JURY FRAME — VERDICT ENGINE (12‑LENS IMMORTAL JURY)
// ============================================================================
export {
  PulseTrustJuryFrameMeta,
  createPulseTrustJuryFrame,
  evaluateWithTrustJury
} from "./PulseTrustJuryFrame-v16++.js";

// ============================================================================
//  JURY BOX CAMERA — SESSION RECORDER (IMMUTABLE)
// ============================================================================
export {
  PulseTrustJuryBoxCameraMeta,
  createJuryBoxCamera
} from "./PulseTrustJuryBoxCamera-v16++.js";

// ============================================================================
//  JURY COUNCIL — OVERSIGHT ESCALATION ENGINE
// ============================================================================
export {
  PulseTrustJuryCouncilMeta,
  createJuryCouncil
} from "./PulseTrustJuryCouncil-v16++.js";

// ============================================================================
//  CREATOR FLAGS — CREATOR‑LEVEL SIGNAL FUSION
// ============================================================================
export {
  PulseTrustCreatorFlagsMeta,
  fuseCreatorFlags
} from "./PulseTrustCreatorFlags-v16++.js";

// ============================================================================
//  EXPANSION COMPLIANCE — CONSTITUTIONAL ENFORCEMENT LAYER
// ============================================================================
export {
  PulseTrustExpansionComplianceMeta,
  createExpansionCompliance
} from "./PulseTrustExpansionCompliance-v16++.js";

// ============================================================================
//  OPTIONAL: AI WORLD CORE IMPORT (AI‑MIRROR WORLDVIEW)
//  This is not re‑exported, but the barrel acknowledges its existence.
//  Trust organs will import PulseAIWorldCore directly as needed.
// ============================================================================
export { PulseAIWorldCoreMeta } from "../world/PulseAIWorldCore-v16++.js";
