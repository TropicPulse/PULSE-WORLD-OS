// ============================================================================
// FILE: /PULSE-PAL/PulsePalBubble-v24.js
// PULSE OS — v24 IMMORTAL
// PULSE‑PAL BUBBLE — ENTRY CORTEX + MEDIA + PRESENCE + DAEMON
// ============================================================================
//
// ROLE:
//   The Pulse‑Pal Bubble is the ambient entry cortex.
//   It renders:
//     • Floating 3D Pulse‑Pal bubble
//     • Avatar + presence aura
//     • Last message snippet / invite line
//     • Click-through into Speech / Home
//     • Daemon-aware status hint (optional)
//     • Media-aware avatar (PulsePal images)
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

const CorePresence = PulseProofBridge.corepresence;
const CoreDaemon   = PulseProofBridge.coredaemon;
const CoreSpeech   = PulseProofBridge.corespeech;
const CoreMemory   = PulseProofBridge.corememory;

// ============================================================================
// AI_EXPERIENCE_META
// ============================================================================
export const AI_EXPERIENCE_META_PulsePalBubble = {
  id: "pulsepal.bubble",
  kind: "ui_organ",
  version: "v24-IMMORTAL",
  role: "Pulse‑Pal ambient entry bubble",
  surfaces: {
    band: ["bubble", "entry", "presence", "media"],
    wave: ["inviting", "responsive", "clear"],
    binary: ["avatar_bubble", "message_snippet", "click_through"],
    presence: ["bubble_aura", "entry_tone"],
    advantage: ["prewarmed_media", "instant_entry"],
    speed: "instant_ui"
  },
  routes: {
    home: "pulsepal.home",
    speech: "pulsepal.speech",
    identity: "pulsepal.identity"
  },
  consumers: ["Router", "CorePresence", "CoreDaemon", "CoreSpeech", "CoreMemory"],
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
export const AI_EXPERIENCE_CONTEXT_PulsePalBubble = {
  tone: "warm_attentive",
  pacing: "instant",
  emotionalBand: "connection",
  primaryIntent: "invite_conversation",
  secondaryIntent: "signal_presence",
  userFirstImpression: "pulsepal_is_here_in_the_corner",
  visualNotes: {
    icon: "chat_bubble_3d",
    motion: "soft_float",
    colorBand: "cyan_gold"
  }
};

// ============================================================================
// ORGAN_META
// ============================================================================
export const ORGAN_META_PulsePalBubble = {
  id: "organ.pulsepal.bubble",
  organism: "PulsePal",
  layer: "ui.entry",
  tier: "IMMORTAL",
  evoFlags: {
    canAddBubbleModes: true,
    canAddStatusBadges: true,
    mediaAware: true,
    presenceAware: true,
    daemonAware: true
  },
  lineage: {
    family: "companion_entry",
    generation: 1,
    osVersion: "v24"
  }
};

// ============================================================================
// ORGAN_CONTRACT
// ============================================================================
export const ORGAN_CONTRACT_PulsePalBubble = {
  inputs: {
    Router: "navigation interface",
    Icons: "icon resolution interface",
    Media: "media resolver interface",
    CorePresence: "bridge presence organ",
    CoreDaemon: "bridge daemon snapshot",
    CoreSpeech: "bridge speech organ",
    CoreMemory: "bridge memory organ"
  },
  outputs: {
    uiSurface: "entry_bubble",
    presence: "CorePresence.snapshot",
    daemon: "CoreDaemon.snapshot",
    lastMessages: "CoreSpeech.messages"
  },
  consumers: ["Router", "CorePresence", "CoreDaemon", "CoreSpeech", "CoreMemory"],
  guarantees: {
    deterministicRender: true,
    noNetwork: true,
    noSideEffects: true
  }
};

// ============================================================================
// IMMORTAL_OVERLAYS
// ============================================================================
export const IMMORTAL_OVERLAYS_PulsePalBubble = {
  drift: {
    allowed: false,
    notes: "Bubble semantics and placement must remain stable."
  },
  pressure: {
    expectedLoad: "very_high",
    notes: "Bubble is visible almost constantly."
  },
  stability: {
    uiLayout: "stable",
    semantics: "stable",
    notes: "Only additive evolution allowed."
  },
  load: {
    maxComponents: 2,
    notes: "3D bubble + optional status badge."
  },
  chunking: {
    prewarm: [
      "icons.chat_bubble_3d",
      "icons.pulse",
      "media.pulsepal"
    ],
    cacheKey: "pulsepal.bubble.ui"
  },
  worldLens: {
    awareOfWorlds: true
  },
  limbic: {
    band: "connection_safety"
  },
  triHeart: {
    cognitive: "entry_affordance",
    emotional: "gentle_invitation",
    behavioral: "open_pulsepal"
  },
  impulseSpeed: {
    primaryAction: "open_speech",
    latencyTargetMs: 30
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
export function PulsePalBubble({ Router, Icons, Media }) {

  const presence = CorePresence?.snapshot?.() || {};
  const daemon   = CoreDaemon?.snapshot?.() || {};
  const messages = CoreSpeech?.messages?.() || [];
  const palImages = Media?.resolveAll?.("PulsePal") || [];

  const avatar = palImages[0] || Icons.resolve("pulse");

  // Last message snippet or default invite
  const last = messages[messages.length - 1];
  const snippet =
    (last && last.text && last.text.length > 0)
      ? (last.text.length > 80 ? last.text.slice(0, 77) + "…" : last.text)
      : "Tap to open Pulse‑Pal.";

  // Presence aura color
  const tone = presence.tone || "neutral";
  const auraColor =
    tone === "warm"   ? "rgba(0, 234, 255, 0.55)" :
    tone === "focused"? "rgba(0, 255, 180, 0.55)" :
    tone === "calm"   ? "rgba(120, 200, 255, 0.45)" :
                        "rgba(160, 180, 200, 0.45)";

  // Optional daemon badge (e.g., proxy count)
  const daemonBadge = daemon?.proxySummary
    ? `
      <div style="
        position:absolute;
        top:-6px;
        right:-6px;
        min-width:20px;
        padding:2px 6px;
        border-radius:999px;
        background:linear-gradient(135deg,#ffb347,#ff5f6d);
        color:#050816;
        font-size:0.65rem;
        font-weight:600;
        box-shadow:0 0 10px rgba(255,120,80,0.7);
      ">
        ${daemon.proxySummary.proxyCount}
      </div>
    `
    : "";

  return `
    <div id="pulsepal-bubble-root">
      <style>
        #pulsepal-bubble-root {
          position:fixed;
          right:24px;
          bottom:24px;
          z-index:9999;
          pointer-events:none;
        }
        .pulsepal-bubble-shell {
          pointer-events:auto;
          position:relative;
          width:260px;
          max-width:70vw;
          transform:translateZ(0);
        }
        .pulsepal-bubble-3d {
          background:radial-gradient(circle at 0% 0%, #1b2335, #050816);
          border-radius:24px;
          padding:12px 14px;
          display:flex;
          gap:12px;
          align-items:flex-start;
          box-shadow:
            0 18px 40px rgba(0,0,0,0.65),
            0 0 0 1px rgba(0,234,255,0.18),
            0 0 30px rgba(0,234,255,0.35);
          transform:
            translate3d(0,0,0)
            perspective(800px)
            rotateX(10deg)
            rotateY(-8deg);
          transform-origin:bottom right;
          backdrop-filter:blur(18px);
          -webkit-backdrop-filter:blur(18px);
          transition:
            transform 160ms ease-out,
            box-shadow 160ms ease-out,
            background 160ms ease-out;
          cursor:pointer;
        }
        .pulsepal-bubble-3d:hover {
          transform:
            translate3d(0,-4px,0)
            perspective(800px)
            rotateX(6deg)
            rotateY(-4deg)
            scale(1.02);
          box-shadow:
            0 24px 50px rgba(0,0,0,0.75),
            0 0 0 1px rgba(0,234,255,0.28),
            0 0 40px rgba(0,234,255,0.55);
        }
        .pulsepal-bubble-avatar-wrap {
          position:relative;
          flex-shrink:0;
          width:44px;
          height:44px;
          border-radius:999px;
          background:radial-gradient(circle at 30% 0%, #00eaff, #050816);
          display:flex;
          align-items:center;
          justify-content:center;
          box-shadow:0 0 18px rgba(0,234,255,0.55);
        }
        .pulsepal-bubble-avatar {
          width:34px;
          height:34px;
          border-radius:999px;
          object-fit:cover;
          box-shadow:0 0 12px rgba(0,0,0,0.8);
        }
        .pulsepal-bubble-aura {
          position:absolute;
          inset:-6px;
          border-radius:999px;
          background:${auraColor};
          filter:blur(10px);
          opacity:0.9;
          z-index:-1;
        }
        .pulsepal-bubble-text {
          flex:1;
          display:flex;
          flex-direction:column;
          gap:4px;
        }
        .pulsepal-bubble-title {
          font-size:0.85rem;
          font-weight:600;
          letter-spacing:0.04em;
          text-transform:uppercase;
          color:#9beeff;
        }
        .pulsepal-bubble-snippet {
          font-size:0.9rem;
          line-height:1.35;
          color:#e6f7ff;
          text-shadow:0 0 6px rgba(0,0,0,0.7);
        }
        .pulsepal-bubble-meta {
          font-size:0.7rem;
          opacity:0.7;
          margin-top:2px;
          color:#9fb3c8;
        }
      </style>

      <div class="pulsepal-bubble-shell"
           onclick="(function(){ try { Router.go('pulsepal.speech'); } catch(e) {} })()">

        <div class="pulsepal-bubble-3d">

          <div class="pulsepal-bubble-avatar-wrap">
            <div class="pulsepal-bubble-aura"></div>
            <img src="${avatar}" class="pulsepal-bubble-avatar" />
            ${daemonBadge}
          </div>

          <div class="pulsepal-bubble-text">
            <div class="pulsepal-bubble-title">
              Pulse‑Pal
            </div>
            <div class="pulsepal-bubble-snippet">
              ${snippet}
            </div>
            <div class="pulsepal-bubble-meta">
              ${presence.activity || "Idle"} • ${presence.tone || "Neutral"}
            </div>
          </div>

        </div>

      </div>
    </div>
  `;
}
