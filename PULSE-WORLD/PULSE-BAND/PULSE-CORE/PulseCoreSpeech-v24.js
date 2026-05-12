// ============================================================================
// FILE: /PULSE-CORE/PulseCoreSpeech-v24.js
// PULSE OS — v24 IMMORTAL
// CORE SPEECH ORGAN — MESSAGE STORE + MEMORY FEEDER
// ============================================================================

import {
  OrganismIdentity,
  buildPulseOrganismMap as PulseOrganismMap,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PULSE-WORLD-MAP.js";
import { PulseProofBridge } from "../../PULSE-UI/_BACKEND/PULSE-WORLD-BRIDGE.js";
const Identity = OrganismIdentity(import.meta.url);

// ============================================================================
//  META BLOCK — v24 IMMORTAL (from genome)
// ============================================================================
export const PulseCoreSpeechMeta = Identity.OrganMeta;

// ============================================================================
//  SURFACE / ORGANISM LAYER EXPORTS — v24 IMMORTAL
// ============================================================================
export const pulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;

export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// ============================================================================
// BRIDGE INTEGRATION — REQUIRED
// ============================================================================
const CoreMemory   = PulseProofBridge.corememory;
const CorePresence = PulseProofBridge.corepresence;
const CoreDaemon   = PulseProofBridge.coredaemon;

// ============================================================================
// IMPLEMENTATION — v24 IMMORTAL++
// ============================================================================
export function PulseCoreSpeech() {

  const state = {
    messages: [],
    typing: false
  };

  // ------------------------------
  // INTERNAL: feed semantic memory
  // ------------------------------
  function feedSemantic(role, text) {
    const evt = {
      type: "speech",
      role,
      text,
      timestamp: Date.now()
    };

    // Add to semantic timeline
    CoreMemory.semantic.addTimeline(evt);

    // Incremental semantic update
    CoreMemory.engine.incremental({
      speech: state.messages,
      presence: CorePresence.snapshot(),
      daemon: CoreDaemon.snapshot()
    });
  }

  // ------------------------------
  // PUBLIC API
  // ------------------------------

  function messages() {
    return [...state.messages];
  }

  function pushUserMessage(text) {
    const evt = {
      role: "user",
      text,
      timestamp: Date.now()
    };

    state.messages.push(evt);
    feedSemantic("user", text);
  }

  function pushAssistantMessage(text) {
    const evt = {
      role: "assistant",
      text,
      timestamp: Date.now()
    };

    state.messages.push(evt);
    feedSemantic("assistant", text);
  }

  function typing(stateValue) {
    state.typing = !!stateValue;
  }

  return {
    // genome-driven identity
    meta: PulseCoreSpeechMeta,
    pulseRole,
    surfaceMeta,
    pulseLoreContext,
    AI_EXPERIENCE_META,
    EXPORT_META,

    // organ API
    messages,
    pushUserMessage,
    pushAssistantMessage,
    typing
  };
}
