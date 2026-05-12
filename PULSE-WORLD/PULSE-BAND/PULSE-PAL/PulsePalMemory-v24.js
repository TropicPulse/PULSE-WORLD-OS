// ============================================================================
// FILE: /PULSE-PAL/PulsePalMemory.js
// PULSE OS — v24 IMMORTAL
// PULSE‑PAL MEMORY PAGE — MEMORY CORTEX + SEMANTIC ENGINE + TIMELINE
// ============================================================================
//
// ROLE:
//   The Pulse‑Pal Memory Page is the memory cortex surface.
//   It renders:
//     • Memory Tier Selection
//     • Semantic Memory Items
//     • Timeline Preview
//     • Persona + Tone Snapshot
//     • CoreMemory Integration (v24 hybrid)
//     • Media-aware memory context
//     • Daemon-aware recall tone
//
// CONTRACT:
//   • Pure UI Organ (no network)
//   • Deterministic render
//   • Evolvable via Memory Engine / IQMap
//   • Zero side effects
//
// ============================================================================
// BRIDGE INTEGRATION — REQUIRED
// ============================================================================
import {
  OrganismIdentity,
  buildPulseOrganismMap as PulseOrganismMap,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PULSE-WORLD-MAP.js";
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

const CoreMemory     = PulseProofBridge.corememory;
const CorePresence   = PulseProofBridge.corepresence;
const CoreDaemon     = PulseProofBridge.coredaemon;
const CoreSpeech     = PulseProofBridge.corespeech;
const MemoryManager  = PulseProofBridge.corememorymanager; // optional future hook


// ============================================================================
// IMPLEMENTATION — v24 IMMORTAL++
// ============================================================================
export function PulsePalMemory({ Router, Icons, Media }) {

  // v24 semantic memory
  const items     = CoreMemory?.items?.()     || [];
  const timeline  = CoreMemory?.timeline?.()  || [];
  const persona   = CoreMemory?.persona?.()   || {};
  const tone      = CoreMemory?.tone?.()      || {};
  const presence  = CorePresence?.snapshot?.() || {};

  // NEW: daemon + pal surfaces
  const daemonSnapshot = CoreDaemon?.snapshot?.() || {};
  const palSummary     = daemonSnapshot.palSummary || {};
  const palHistory     = daemonSnapshot.palHistory || {};
  const palPersona     = daemonSnapshot.palPersona || {};

  // NEW: continuity score (memory + daemon)
  const continuityScore =
    palHistory.continuityScore ??
    palSummary.avgPalContinuance ??
    persona?.continuity?.continuityScore ??
    0;

  // NEW: mode + mode influence
  const activeMode =
    palPersona?.tone?.activeMode ||
    persona?.tone?.activeMode ||
    presence.activityMode ||
    presence.activity ||
    "advisor";

  const modeInfluence =
    persona?.persona?.modeInfluence ||
    persona?.modeInfluence ||
    {};

  const modeList = Object.entries(modeInfluence)
    .filter(([k, v]) => typeof v === "number")
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  // Media
  const palImages = Media?.resolveAll?.("PulsePal") || [];
  let avatar      = palImages[0] || Icons.resolve("pulse");

  // NEW: mode-aware avatar selection (no removal of original fallback)
  if (palImages.length && activeMode) {
    const lower = String(activeMode).toLowerCase();
    const match = palImages.find(src => String(src).toLowerCase().includes(lower));
    if (match) avatar = match;
  }

  return `
    <div id="pulsepal-memory" class="evo-wrapper">

      <!-- HEADER ------------------------------------------------------------->
      <div class="evo-surface evo-breathe" data-hook="pulsepal.memory.header">
        <div style="display:flex; gap:18px; align-items:center;">
          <img src="${Icons.resolve('memory')}" class="evo-icon" />
          <div>
            <h1 style="margin:0;">Pulse‑Pal Memory</h1>
            <p style="margin:0; opacity:0.75;">
              ${tone.lastUserTone || presence.tone || "How I remember and recall."}
            </p>
            <!-- NEW: mode + continuity line (additive) -->
            <p style="margin:0; opacity:0.55; font-size:0.85rem;">
              Mode: <strong>${activeMode}</strong> · Continuity: ${continuityScore}
            </p>
          </div>
        </div>
      </div>

      <!-- AVATAR ------------------------------------------------------------->
      <div class="evo-block" data-hook="pulsepal.memory.avatar">
        <h2 style="margin-top:0;">Memory Avatar</h2>
        <img src="${avatar}" class="pal-avatar-preview" />
        <!-- NEW: avatar note (additive) -->
        <p style="margin:8px 0 0; opacity:0.7; font-size:0.85rem;">
          Avatar follows the active mode and preloaded Pulse‑Pal images.
        </p>
      </div>

      <!-- NEW: MODE INFLUENCE PANEL ----------------------------------------->
      <div class="evo-block" data-hook="pulsepal.memory.mode">
        <h2>Mode Influence</h2>
        ${
          modeList.length
            ? `
              <ul class="evo-list">
                ${modeList
                  .map(([mode, w]) =>
                    `<li class="evo-list-item">${mode}: ${(w * 100).toFixed(1)}%</li>`
                  )
                  .join("")}
              </ul>
            `
            : `<p style="opacity:0.7;">No mode influence detected yet.</p>`
        }
      </div>

      <!-- MEMORY TIER -------------------------------------------------------->
      <div class="evo-block" data-hook="pulsepal.memory.tier">
        <h2>Memory Tier</h2>
        <div style="display:flex; gap:16px; flex-wrap:wrap;">
          <button class="evo-button" onclick="CoreMemory.setTier('light')">Light</button>
          <button class="evo-button" onclick="CoreMemory.setTier('balanced')">Balanced</button>
          <button class="evo-button" onclick="CoreMemory.setTier('deep')">Deep</button>
        </div>
      </div>

      <!-- MEMORY ITEMS ------------------------------------------------------->
      <div class="evo-block" data-hook="pulsepal.memory.items">
        <h2>Semantic Memory Items</h2>
        <ul class="evo-list">
          ${
            items.length === 0
              ? `<li class="evo-list-item">No memory items yet.</li>`
              : items.map(i => `<li class="evo-list-item">${JSON.stringify(i)}</li>`).join("")
          }
        </ul>
      </div>

      <!-- TIMELINE ----------------------------------------------------------->
      <div class="evo-block" data-hook="pulsepal.memory.timeline">
        <h2>Timeline</h2>
        <ul class="evo-list">
          ${
            timeline.length === 0
              ? `<li class="evo-list-item">Timeline empty.</li>`
              : timeline.slice(-20).map(evt =>
                  `<li class="evo-list-item">
                     <strong>${evt.type}</strong> — ${evt.text || evt.value || ""}
                   </li>`
                ).join("")
          }
        </ul>
      </div>

      <!-- PERSONA SNAPSHOT --------------------------------------------------->
      <div class="evo-block" data-hook="pulsepal.memory.persona">
        <h2>Persona Snapshot</h2>
        <pre class="evo-surface" style="padding:12px; opacity:0.85;">
${JSON.stringify(persona, null, 2)}
        </pre>
      </div>

      <!-- MEDIA PANEL -------------------------------------------------------->
      ${
        palImages.length
          ? `
            <div class="evo-block" data-hook="pulsepal.memory.media">
              <h2>Pulse‑Pal Media</h2>
              <div style="display:flex; gap:12px; flex-wrap:wrap;">
                ${palImages.map(src => `<img src="${src}" class="pal-memory-thumb" />`).join("")}
              </div>
            </div>
          `
          : ""
      }

    </div>
  `;
}
