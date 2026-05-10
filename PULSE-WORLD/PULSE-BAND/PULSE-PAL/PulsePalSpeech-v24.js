// ============================================================================
// FILE: /PULSE-PAL/PulsePalSpeech.js
// PULSE OS — v24 IMMORTAL++
// PULSE‑PAL CHAT CORTEX — SPEECH ORGAN + MEDIA + PRESENCE + MODE + PERSONA
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
//     • Persona hooks
//     • Mode-aware avatar switching (NEW v24++)
//     • Fox/Human form switching (NEW v24++)
//     • Daemon-aware continuity tone (NEW v24++)
//     • Mode-aware response style (NEW v24++)
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
import {
  OrganismIdentity,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PulseWorldOrganismMap-v21.js";
const Identity = OrganismIdentity(import.meta.url);

// 2 — EXPORT GENOME METADATA
// export const PulseMeshMeta = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
// export const PULSE_EARN_IMMUNE_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;
import { PulseProofBridge } from "../../PULSE-UI/_BACKEND/PULSE-WORLD-BRIDGE.js";

const CoreSpeech   = PulseProofBridge.corespeech;
const CorePresence = PulseProofBridge.corepresence;
const CoreMemory   = PulseProofBridge.corememory;
const CoreDaemon   = PulseProofBridge.coredaemon;


// ============================================================================
// IMPLEMENTATION — v24 IMMORTAL++
// ============================================================================
export function PulsePalSpeech({ Router, Icons, Media }) {

  const presence = CorePresence?.snapshot?.() || {};
  const persona  = CoreMemory?.persona?.() || {};
  const daemon   = CoreDaemon?.snapshot?.() || {};

  const activeMode =
    presence.mode ||
    persona?.tone?.activeMode ||
    "advisor";

  const continuityScore =
    daemon?.palHistory?.continuityScore ||
    daemon?.palSummary?.avgPalContinuance ||
    0;

  // MEDIA: mode-aware avatar selection
  const palImages = Media?.resolveAll?.("PulsePal") || [];
  let palAvatar = palImages[0] || Icons.resolve("pulse");

  if (palImages.length && activeMode) {
    const lower = activeMode.toLowerCase();
    const match = palImages.find(src => src.toLowerCase().includes(lower));
    if (match) palAvatar = match;
  }

  // MODE-AWARE RESPONSE STYLE
  const modeTag = {
    advisor:     "💬",
    architect:   "📐",
    entrepreneur:"💼",
    grid:        "🧩",
    mesh:        "🕸️",
    expansion:   "🌌",
    finality:    "🔮",
    tourist:     "🧭",
    fox:         "🦊",
    human:       "🙂"
  }[activeMode] || "💬";

  return `
    <div id="pulsepal-speech" class="evo-wrapper">

      <!-- HEADER ------------------------------------------------------------->
      <div class="evo-surface evo-breathe" data-hook="pulsepal.chat.header">
        <div style="display:flex; align-items:center; gap:18px;">
          <img src="\${Icons.resolve('ai_brain')}" class="evo-icon" />
          <div>
            <h1 style="margin:0; font-size:1.6rem; color:#00eaff;">
              Pulse‑Pal Chat
            </h1>
            <p style="margin:0; opacity:0.75;">
              \${presence.tone || "I'm here with you."}
            </p>
            <!-- NEW: mode + continuity -->
            <p style="margin:0; opacity:0.55; font-size:0.85rem;">
              Mode: <strong>\${activeMode}</strong> · Continuity: \${continuityScore}
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
        <img src="\${palAvatar}" class="evo-icon" />
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
            <img src="\${Icons.resolve('send')}" class="evo-icon" />
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
              <div style="font-weight:600; color:#00eaff;">Pulse‑Pal \${"${modeTag}"}</div>
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
