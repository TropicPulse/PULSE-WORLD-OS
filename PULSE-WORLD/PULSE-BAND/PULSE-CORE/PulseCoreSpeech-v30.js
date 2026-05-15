// ============================================================================
// FILE: /PULSE-CORE/PulseCoreSpeech-v30.js
// PULSE OS — v30 IMMORTAL++
// CORE SPEECH ORGAN — PURE BINARY MESSAGE STORE
// ============================================================================

import { PulseProofBridge } from "../../PULSE-UI/____BACKEND/PULSE-WORLD-BRIDGE.js";

// ---------------------------------------------------------------------------
// BRIDGE INTEGRATION — v30
// ---------------------------------------------------------------------------
const CoreMemory = PulseProofBridge.corememory;

// ---------------------------------------------------------------------------
// IMPLEMENTATION — v30 IMMORTAL++
// ---------------------------------------------------------------------------
export function PulseCoreSpeech_v30() {

  const state = {
    messages: [],
    typing: false
  };

  // ---------------------------------------------------------
  // INTERNAL: persist message to CoreMemory (binary route)
// ---------------------------------------------------------
  function persistMessage(evt) {
    try {
      const inst = CoreMemory.create?.();
      if (inst) {
        const routeId = "speech-stream";
        const key = String(evt.timestamp);
        inst.set(routeId, key, evt);
      }
    } catch {}
  }

  // ---------------------------------------------------------
  // PUBLIC API
  // ---------------------------------------------------------

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
    persistMessage(evt);
  }

  function pushAssistantMessage(text) {
    const evt = {
      role: "assistant",
      text,
      timestamp: Date.now()
    };

    state.messages.push(evt);
    persistMessage(evt);
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

export default PulseCoreSpeech_v30;
