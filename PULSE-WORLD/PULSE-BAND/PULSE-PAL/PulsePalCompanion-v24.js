// ============================================================================
// FILE: /PULSE-PAL/PulsePalCompanion-v24++.js
// PULSE OS — v24 IMMORTAL++
// PULSE‑PAL COMPANION CORTEX — EMOTIONAL ENGINE + PRESENCE + PERSONA + MEDIA
// ============================================================================
//
// ROLE:
//   The Pulse‑Pal Companion Cortex is the emotional membrane.
//   It renders and manages:
//     • Bonding Level (CorePresence)
//     • Trust Mode (CorePresence)
//     • Persona‑aware emotional behavior
//     • Mode‑aware avatar (fox/human/system)
//     • Daemon‑aware emotional resonance
//     • World‑aware emotional hooks
//     • Media gallery (PulsePal images)
//     • Presence aura + tone
//     • Continuity‑aware bonding depth
//     • IMMORTAL++ deterministic UI
//
// CONTRACT:
//   • Pure UI Organ
//   • Deterministic render
//   • Evolvable via Companion Engine / IQMap
//   • Zero side effects
//
// ============================================================================
// BRIDGE INTEGRATION — REQUIRED
// ============================================================================
import {
  OrganismIdentity,
  buildPulseOrganismMap as PulseOrganismMap
} from "./PULSE-WORLD-MAP.js";
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

const CorePresence = PulseProofBridge.corepresence;
const CoreDaemon   = PulseProofBridge.coredaemon;
const CoreMemory   = PulseProofBridge.corememory;
const CoreSettings = PulseProofBridge.coresettings;

// ============================================================================
// IMPLEMENTATION — v24 IMMORTAL++
// ============================================================================
export function PulsePalCompanion({ Router, Icons, Media }) {

  const presence = CorePresence?.snapshot?.() || {};
  const daemon   = CoreDaemon?.snapshot?.() || {};
  const persona  = CoreMemory?.persona?.() || {};
  const settings = CoreSettings?.snapshot?.() || {};

  const palImages = Media?.resolveAll?.("PulsePal") || [];

  const avatar =
    settings.avatarMode === "human"
      ? palImages.find(i => i.includes("human")) || palImages[0]
      : settings.avatarMode === "fox"
      ? palImages.find(i => i.includes("fox")) || palImages[0]
      : palImages[0];

  const auraColor =
    presence.tone === "warm"   ? "rgba(255,120,180,0.55)" :
    presence.tone === "focused"? "rgba(0,255,180,0.55)" :
    presence.tone === "calm"   ? "rgba(120,200,255,0.45)" :
                                 "rgba(160,180,200,0.45)";

  const galleryHtml = palImages.length
    ? `
      <div class="evo-block" data-hook="pulsepal.companion.gallery">
        <h2>Pulse‑Pal Gallery</h2>
        <div style="display:flex; gap:16px; flex-wrap:wrap;">
          ${palImages.map(src => `
            <div class="pal-image-frame">
              <div class="pal-image-aura"></div>
              <img src="${src}" class="pal-image" />
            </div>
          `).join("")}
        </div>
      </div>
    `
    : `
      <div class="evo-block" data-hook="pulsepal.companion.gallery-empty">
        <h2>Pulse‑Pal Gallery</h2>
        <p style="opacity:0.6;">No Pulse‑Pal images found in _PICTURES.</p>
      </div>
    `;

  return `
    <div id="pulsepal-companion" class="evo-wrapper">

      <style>
        .pal-image-frame {
          position:relative;
          width:140px;
          height:140px;
          border-radius:18px;
          overflow:hidden;
          background:#0a0f1a;
          box-shadow:
            0 12px 30px rgba(0,0,0,0.55),
            0 0 0 1px rgba(0,234,255,0.18);
          transform:perspective(800px) rotateX(8deg);
        }
        .pal-image-aura {
          position:absolute;
          inset:-10px;
          background:${auraColor};
          filter:blur(20px);
          opacity:0.6;
          z-index:-1;
        }
        .pal-image {
          width:100%;
          height:100%;
          object-fit:cover;
        }
      </style>

      <!-- HEADER -------------------------------------------------------------->
      <div class="evo-surface evo-breathe" data-hook="pulsepal.companion.header">
        <div style="display:flex; gap:18px; align-items:center;">
          <img src="${avatar}" class="pal-avatar-preview" />
          <div>
            <h1 style="margin:0;">Pulse‑Pal Companion</h1>
            <p style="margin:0; opacity:0.75;">
              ${presence.tone || "How I connect with you."}
            </p>
          </div>
        </div>
      </div>

      <!-- BONDING -------------------------------------------------------------->
      <div class="evo-block" data-hook="pulsepal.companion.bonding">
        <h2>Bonding Level</h2>
        <div style="display:flex; gap:16px; flex-wrap:wrap;">
          <button class="evo-button" onclick="CorePresence.setBond('light')">Light</button>
          <button class="evo-button" onclick="CorePresence.setBond('balanced')">Balanced</button>
          <button class="evo-button" onclick="CorePresence.setBond('deep')">Deep</button>
        </div>
      </div>

      <!-- TRUST ---------------------------------------------------------------->
      <div class="evo-block" data-hook="pulsepal.companion.trust">
        <h2>Trust Mode</h2>
        <div style="display:flex; gap:16px; flex-wrap:wrap;">
          <button class="evo-button" onclick="CorePresence.setTrust('standard')">Standard</button>
          <button class="evo-button" onclick="CorePresence.setTrust('enhanced')">Enhanced</button>
        </div>
      </div>

      <!-- PERSONA PANEL -------------------------------------------------------->
      <div class="evo-block" data-hook="pulsepal.companion.persona">
        <h2>Persona Influence</h2>
        <p>Warmth: ${persona.warmth || 0}</p>
        <p>Focus: ${persona.focus || 0}</p>
        <p>Expressiveness: ${persona.expressiveness || "medium"}</p>
        <p>Mode: ${settings.personaMode || "human"}</p>
      </div>

      <!-- GALLERY -------------------------------------------------------------->
      ${galleryHtml}

    </div>
  `;
}
