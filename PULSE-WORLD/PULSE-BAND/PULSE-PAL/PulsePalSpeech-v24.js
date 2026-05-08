// ============================================================================
// FILE: /PULSE-PAL/PulsePalSpeech.js
// PULSE OS — v24 IMMORTAL
// PULSE‑PAL CHAT CORTEX — SPEECH ORGAN + MEDIA + PRESENCE
// ============================================================================
//
// ROLE:
//   The Pulse‑Pal Speech Organ is the conversational cortex.
//   It renders:
//     • Message stream (CoreSpeech-driven)
//     • Pal responses
//     • User messages
//     • Typing indicator
//     • Presence aura + tone
//     • Media-aware avatar (PulsePal images)
//     • Persona hooks (future history scanner)
//
// CONTRACT:
//   • Pure UI Organ (no network)
//   • Deterministic render
//   • Evolvable via IQMap UI Skills
//   • Zero side effects
//
// ============================================================================
// BRIDGE INTEGRATION — REQUIRED
// ============================================================================
import { PulseProofBridge } from "/PULSE/BRIDGE/PulseProofBridge.js";

const CoreSpeech   = PulseProofBridge.corespeech;
const CorePresence = PulseProofBridge.corepresence;
const CoreMemory   = PulseProofBridge.corememory;
const CoreDaemon   = PulseProofBridge.coredaemon; // NEW: daemon snapshot bridge

// ============================================================================
// AI_EXPERIENCE_META
// ============================================================================
export const AI_EXPERIENCE_META_PulsePalSpeech = {
  id: "pulsepal.speech",
  kind: "ui_organ",
  version: "v24-IMMORTAL",
  role: "Pulse‑Pal conversational cortex membrane",
  surfaces: {
    band: ["speech", "chat", "conversation", "media"],
    wave: ["responsive", "attentive", "warm"],
    binary: ["message_stream", "typing_indicator", "avatar_switch"],
    presence: ["chat_aura", "response_tone"],
    advantage: ["instant_feedback", "impulse_hooks", "media_preload"],
    speed: "instant_ui"
  },
  routes: {
    home: "pulsepal.home",
    identity: "pulsepal.identity",
    presence: "pulsepal.presence"
  },
  consumers: ["Router", "IQMap", "CoreSpeech", "CorePresence", "CoreMemory", "CoreDaemon"],
  invariants: {
    networkCalls: "none",
    sideEffects: "none",
    determinism: "strict",
    mutation: "forbidden_at_runtime"
  }
};

// ============================================================================
// AI_EXPERIENCE_CONTEXT
// ============================================================================
export const AI_EXPERIENCE_CONTEXT_PulsePalSpeech = {
  tone: "warm_attentive",
  pacing: "adaptive",
  emotionalBand: "connection",
  primaryIntent: "enable_conversation",
  secondaryIntent: "show_presence_feedback",
  userFirstImpression: "pulsepal_is_here_and_listening",
  visualNotes: {
    icon: "ai_brain",
    motion: "soft_breathe",
    colorBand: "cyan_gold"
  }
};

// ============================================================================
// ORGAN_META
// ============================================================================
export const ORGAN_META_PulsePalSpeech = {
  id: "organ.pulsepal.speech",
  organism: "PulsePal",
  layer: "ui.speech",
  tier: "IMMORTAL",
  evoFlags: {
    canAddMessageTypes: true,
    canAddPresenceAnimations: true,
    requiresCoreSpeech: true,
    mediaAware: true,
    personaAware: true
  },
  lineage: {
    family: "companion_speech",
    generation: 2,
    osVersion: "v24"
  }
};

// ============================================================================
// ORGAN_CONTRACT
// ============================================================================
export const ORGAN_CONTRACT_PulsePalSpeech = {
  inputs: {
    Router: "navigation interface",
    Icons: "icon resolution interface",
    Media: "media resolver interface",
    CoreSpeech: "bridge speech organ",
    CorePresence: "bridge presence organ",
    CoreMemory: "bridge memory organ",
    CoreDaemon: "bridge daemon snapshot"
  },
  outputs: {
    uiSurface: "speech_cortex",
    messages: "CoreSpeech.messages",
    typing: "CoreSpeech.typing",
    presence: "CorePresence.snapshot"
  },
  consumers: ["Router", "IQMap", "CoreSpeech", "CorePresence", "CoreMemory", "CoreDaemon"],
  guarantees: {
    deterministicRender: true,
    noNetwork: true,
    noSideEffects: true
  }
};

// ============================================================================
// IMMORTAL_OVERLAYS
// ============================================================================
export const IMMORTAL_OVERLAYS_PulsePalSpeech = {
  drift: {
    allowed: false,
    notes: "Conversational semantics must remain stable."
  },
  pressure: {
    expectedLoad: "very_high",
    notes: "Chat cortex is the most frequently used organ."
  },
  stability: {
    uiLayout: "stable",
    semantics: "stable",
    notes: "Only additive evolution allowed."
  },
  load: {
    maxComponents: 4,
    notes: "Header, stream, input, presence aura."
  },
  chunking: {
    prewarm: ["icons.ai_brain", "icons.pulse", "icons.user", "media.pulsepal"],
    cacheKey: "pulsepal.speech.ui"
  },
  worldLens: {
    awareOfWorlds: true
  },
  limbic: {
    band: "connection_safety"
  },
  triHeart: {
    cognitive: "message_processing",
    emotional: "attuned_response",
    behavioral: "send_message"
  },
  impulseSpeed: {
    primaryAction: "send_message",
    latencyTargetMs: 50
  },
  healingSurfaces: {
    enabled: true
  }
};

// ============================================================================
// IMPLEMENTATION — v24 IMMORTAL++
// ============================================================================
/*
@PULSE_IMMORTAL_REQUIRE_FULL_META
*/
export function PulsePalSpeech({ Router, Icons, Media }) {

  const presence = CorePresence?.snapshot?.() || {};
  const palImages = Media?.resolveAll?.("PulsePal") || [];

  // Choose avatar (first image or fallback icon)
  const palAvatar = palImages[0] || Icons.resolve("pulse");

  return `
    <div id="pulsepal-speech" class="evo-wrapper">

      <!-- HEADER ------------------------------------------------------------->
      <div class="evo-surface evo-breathe" data-hook="pulsepal.chat.header">
        <div style="display:flex; align-items:center; gap:18px;">
          <img src="${Icons.resolve('ai_brain')}" class="evo-icon" />
          <div>
            <h1 style="margin:0; font-size:1.6rem; color:#00eaff;">
              Pulse‑Pal Chat
            </h1>
            <p style="margin:0; opacity:0.75;">
              ${presence.tone || "I'm here with you."}
            </p>
          </div>
        </div>
      </div>

      <!-- MESSAGE STREAM ----------------------------------------------------->
      <div id="pulsepal-stream" class="evo-block"
           data-hook="pulsepal.chat.stream"
           style="display:flex; flex-direction:column; gap:18px; max-height:60vh; overflow-y:auto;">
      </div>

      <!-- TYPING INDICATOR --------------------------------------------------->
      <div id="pulsepal-typing" class="evo-surface evo-flicker"
           data-hook="pulsepal.chat.typing"
           style="display:none; gap:14px; align-items:center;">
        <img src="${palAvatar}" class="evo-icon" />
        <div style="opacity:0.65;">Pulse‑Pal is thinking…</div>
      </div>

      <!-- INPUT BAR ---------------------------------------------------------->
      <div class="evo-block" data-hook="pulsepal.chat.input">
        <div style="display:flex; gap:12px; align-items:center;">

          <input id="pulsepal-input"
                 class="evo-input"
                 placeholder="Say something…"
                 onkeydown="if(event.key==='Enter'){ window.PulsePalSendMessage(); }" />

          <button class="evo-button"
                  onclick="window.PulsePalSendMessage()">
            <img src="${Icons.resolve('send')}" class="evo-icon" />
            Send
          </button>

        </div>
      </div>

    </div>

    <!-- SCRIPT: MESSAGE HANDLING -------------------------------------------->
    <script>
      window.PulsePalSendMessage = function() {
        const input  = document.getElementById('pulsepal-input');
        const stream = document.getElementById('pulsepal-stream');
        const typing = document.getElementById('pulsepal-typing');

        const text = input.value.trim();
        if (!text) return;

        CoreSpeech.pushUserMessage(text);

        const userMsg = document.createElement('div');
        userMsg.className = 'evo-surface evo-route-enter';
        userMsg.style = 'display:flex; gap:14px; align-items:flex-start; justify-content:flex-end;';
        userMsg.innerHTML = \`
          <div>
            <div style="font-weight:600; color:#ffd700; text-align:right;">You</div>
            <div style="opacity:0.85; text-align:right;">\${text}</div>
          </div>
          <img src="\${Icons.resolve('user')}" class="evo-icon" />
        \`;
        stream.appendChild(userMsg);

        input.value = '';
        typing.style.display = 'flex';

        setTimeout(() => {
          typing.style.display = 'none';

          const palMsg = document.createElement('div');
          palMsg.className = 'evo-surface evo-route-enter';
          palMsg.style = 'display:flex; gap:14px; align-items:flex-start;';
          palMsg.innerHTML = \`
            <img src="${palAvatar}" class="evo-icon" />
            <div>
              <div style="font-weight:600; color:#00eaff;">Pulse‑Pal</div>
              <div style="opacity:0.85;">
                I hear you. Tell me more.
              </div>
            </div>
          \`;
          stream.appendChild(palMsg);

          stream.scrollTop = stream.scrollHeight;
        }, 650);
      };
    </script>
  `;
}
