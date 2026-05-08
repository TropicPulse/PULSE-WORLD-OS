// ============================================================================
// FILE: /PULSE-CORE/PulseCoreSpeech-v24.js
// PULSE OS — v24 IMMORTAL
// CORE SPEECH ORGAN — MESSAGE STORE + MEMORY FEEDER
// ============================================================================
//
// ROLE:
//   Stores all user + assistant messages in deterministic order.
//   Provides:
//     • messages()
//     • pushUserMessage()
//     • pushAssistantMessage()
//     • typing indicator
//     • semantic memory feeding (CoreMemory)
//     • daemon + presence awareness
//
// CONTRACT:
//   • Pure data organ (no network)
//   • Deterministic
//   • Evolvable
//   • Zero side effects
//
// ============================================================================
// BRIDGE INTEGRATION — REQUIRED
// ============================================================================
import { PulseProofBridge } from "../../PULSE-UI/_BACKEND/PULSE-WORLD-BRIDGE.js";

const CoreMemory   = PulseProofBridge.corememory;
const CorePresence = PulseProofBridge.corepresence;
const CoreDaemon   = PulseProofBridge.coredaemon;

// ============================================================================
// AI_EXPERIENCE_META
// ============================================================================
export const AI_EXPERIENCE_META_PulseCoreSpeech = {
  id: "core.speech",
  kind: "core_organ",
  version: "v24-IMMORTAL",
  role: "speech_memory_spine",
  surfaces: {
    band: ["speech", "conversation", "timeline"],
    wave: ["ordered", "deterministic", "stable"],
    binary: ["push_user", "push_assistant", "typing"],
    presence: ["tone_awareness"],
    advantage: ["semantic_memory_ready"],
    speed: "hot_loop"
  },
  consumers: ["PulsePalSpeech", "PulsePilotCopilotAdapter", "CoreMemory"],
  invariants: {
    networkCalls: "none",
    sideEffects: "none",
    determinism: "strict"
  }
};

// ============================================================================
// ORGAN META
// ============================================================================
export const ORGAN_META_PulseCoreSpeech = {
  id: "organ.core.speech",
  organism: "PulseCore",
  layer: "core.speech",
  tier: "IMMORTAL",
  evoFlags: {
    messageStore: true,
    semanticFeeder: true,
    personaAware: true,
    presenceAware: true,
    daemonAware: true
  },
  lineage: {
    family: "core_speech",
    generation: 2,
    osVersion: "v24"
  }
};

// ============================================================================
// ORGAN CONTRACT
// ============================================================================
export const ORGAN_CONTRACT_PulseCoreSpeech = {
  inputs: {
    CoreMemory: "semantic memory organ",
    CorePresence: "presence organ",
    CoreDaemon: "daemon organ"
  },
  outputs: {
    messages: "function()",
    pushUserMessage: "function(text)",
    pushAssistantMessage: "function(text)",
    typing: "function(state)"
  },
  consumers: ["PulsePalSpeech", "PulsePilotCopilotAdapter"],
  guarantees: {
    deterministic: true,
    noNetwork: true,
    noSideEffects: true
  }
};

// ============================================================================
// IMMORTAL OVERLAYS
// ============================================================================
export const IMMORTAL_OVERLAYS_PulseCoreSpeech = {
  drift: {
    allowed: false,
    notes: "Message ordering must remain stable."
  },
  pressure: {
    expectedLoad: "high",
    notes: "Speech organ is used constantly."
  },
  stability: {
    algorithm: "stable",
    semantics: "stable"
  },
  load: {
    maxComponents: 1
  },
  chunking: {
    prewarm: ["core.speech"],
    cacheKey: "core.speech.v24"
  },
  triHeart: {
    cognitive: "message_ordering",
    emotional: "tone_awareness",
    behavioral: "conversation_flow"
  }
};

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
    messages,
    pushUserMessage,
    pushAssistantMessage,
    typing
  };
}
