// ============================================================================
// FILE: /PULSE-PAL/PulsePalWorld-v24.js
// PULSE OS — v24 IMMORTAL++
// PULSE‑PAL WORLD CORTEX — WORLD ENGINE + PRESENCE + MEDIA + DAEMON
// ============================================================================
//
// ROLE:
//   The Pulse‑Pal World Cortex is the world membrane.
//   It renders and manages:
//     • World Layers (surface, deep, meta, daemon)
//     • World Entities (nodes, objects, proxies, people)
//     • World State (mood, tone, drift, stability)
//     • World Time (ticks, cycles, epochs)
//     • World Memory (semantic world graph)
//     • World Maps (zones, regions, lenses)
//     • World Presence (world‑aware aura)
//     • World Persona (mode‑aware behavior)
//     • World Evolution (versioning, lineage)
//     • World Media (world images, avatars)
//     • World Proxies (daemon‑fed world agents)
//     • World Continuity (world drift detection)
//     • World Hooks for Tasks, Skills, Persona, Presence
//
// CONTRACT:
//   • Pure UI Organ
//   • Deterministic render
//   • Evolvable via World Engine / IQMap
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

const CoreWorld    = PulseProofBridge.coreworld;
const CorePresence = PulseProofBridge.corepresence;
const CoreMemory   = PulseProofBridge.corememory;
const CoreDaemon   = PulseProofBridge.coredaemon;
const MediaBridge  = PulseProofBridge.coremedia;
const CoreSettings = PulseProofBridge.coresettings;


// ============================================================================
// IMPLEMENTATION — v24 IMMORTAL++
// ============================================================================
export function PulsePalWorld({ Router, Icons, Media }) {

  const worldState   = CoreWorld?.state?.() || {};
  const worldLayers  = CoreWorld?.layers?.() || [];
  const worldEntities = CoreWorld?.entities?.() || [];
  const worldTime    = CoreWorld?.time?.() || {};
  const worldMemory  = CoreWorld?.memory?.() || {};

  const presence = CorePresence?.snapshot?.() || {};
  const persona  = CoreMemory?.persona?.() || {};
  const settings = CoreSettings?.snapshot?.() || {};

  const palImages = Media?.resolveAll?.("PulsePal") || [];

  const avatarMode = settings.avatarMode || "fox";
  const personaMode = settings.personaMode || "human";

  const avatar =
    avatarMode === "human"
      ? palImages.find(i => i.includes("human")) || palImages[0]
      : palImages.find(i => i.includes("fox")) || palImages[0];

  const mediaHtml = palImages.length
    ? `
      <div class="evo-block" data-hook="pulsepal.world.media">
        <h2>Pulse‑Pal World Media</h2>
        <div style="display:flex; gap:12px; flex-wrap:wrap;">
          ${palImages.map(src => `<img src="${src}" class="pal-world-thumb" />`).join("")}
        </div>
      </div>
    `
    : "";

  return `
    <div id="pulsepal-world" class="evo-wrapper">

      <!-- HEADER ------------------------------------------------------------->
      <div class="evo-surface evo-breathe" data-hook="pulsepal.world.header">
        <div style="display:flex; align-items:center; gap:18px;">
          <img src="${avatar}" class="pal-avatar-preview" />
          <div>
            <h1 style="margin:0; font-size:1.6rem; color:#00eaff;">
              Pulse‑Pal World
            </h1>
            <p style="margin:0; opacity:0.75;">
              ${presence.tone || "The world is alive."}
            </p>
          </div>
        </div>
      </div>

      <!-- WORLD STATE -------------------------------------------------------->
      <div class="evo-block" data-hook="pulsepal.world.state">
        <h2>World State</h2>
        <p>Mood: ${worldState.mood || "Neutral"}</p>
        <p>Tone: ${worldState.tone || "Calm"}</p>
        <p>Drift: ${worldState.drift || "Stable"}</p>
        <p>Stability: ${worldState.stability || "High"}</p>
      </div>

      <!-- WORLD LAYERS ------------------------------------------------------->
      <div class="evo-block" data-hook="pulsepal.world.layers">
        <h2>World Layers</h2>
        <ul class="evo-list">
          ${worldLayers.map(l => `
            <li class="evo-list-item">
              <img src="${Icons.resolve('layers')}" class="evo-icon" />
              ${l.name} — ${l.state}
            </li>
          `).join("")}
        </ul>
      </div>

      <!-- WORLD ENTITIES ----------------------------------------------------->
      <div class="evo-block" data-hook="pulsepal.world.entities">
        <h2>Entities</h2>
        <ul class="evo-list">
          ${worldEntities.map(e => `
            <li class="evo-list-item">
              <img src="${Icons.resolve('entity')}" class="evo-icon" />
              ${e.id} — ${e.type}
            </li>
          `).join("")}
        </ul>
      </div>

      <!-- WORLD TIME --------------------------------------------------------->
      <div class="evo-block" data-hook="pulsepal.world.time">
        <h2>World Time</h2>
        <p>Tick: ${worldTime.tick || 0}</p>
        <p>Cycle: ${worldTime.cycle || 0}</p>
        <p>Epoch: ${worldTime.epoch || "v24"}</p>
      </div>

      <!-- WORLD MEMORY ------------------------------------------------------->
      <div class="evo-block" data-hook="pulsepal.world.memory">
        <h2>World Memory</h2>
        <pre class="evo-surface" style="padding:12px; opacity:0.85;">
${JSON.stringify(worldMemory, null, 2)}
        </pre>
      </div>

      <!-- MEDIA PANEL -------------------------------------------------------->
      ${mediaHtml}

    </div>
  `;
}
