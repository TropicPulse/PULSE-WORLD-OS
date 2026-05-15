// ============================================================================
// FILE: /PULSE-PAL/PulsePalHistoryScanner-v24++.js
// PULSE OS — v24 IMMORTAL++
// PULSE‑PAL HISTORY SCANNER — TIMELINE + GRAPH + PERSONA + TONE + DAEMON
// ============================================================================
//
// ROLE:
//   Visualizes the full Pulse‑Pal Memory + Daemon view:
//     • Timeline (message history projection)
//     • Memory Graph (clusters / buckets)
//     • Entities
//     • Topics
//     • Persona Traits
//     • Tone Baseline
//     • Avatar (media-aware)
//     • Daemon-fed pal summary (continuance, tier, media load)
//     • CoreSpeech stats (message counts, last activity)
//
// CONTRACT:
//   • Pure UI Organ (no network)
//   • Deterministic render
//   • Evolvable via Memory Engine / IQMap / Daemon / Speech
//   • Zero side effects
//
// ============================================================================
// BRIDGE INTEGRATION — REQUIRED
// ============================================================================
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝

// 2 — EXPORT GENOME METADATA
// export const PulseMeshMeta = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
// export const PULSE_EARN_IMMUNE_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;
import { PulseProofBridge } from "../../PULSE-UI/____BACKEND/PULSE-WORLD-BRIDGE.js";

const CoreMemory   = PulseProofBridge.corememory;
const CorePresence = PulseProofBridge.corepresence;
const CoreDaemon   = PulseProofBridge.coredaemon;
const CoreSpeech   = PulseProofBridge.corespeech;


// ============================================================================
// IMPLEMENTATION — v24 IMMORTAL++
// ============================================================================
/*
@PULSE_IMMORTAL_REQUIRE_FULL_META
*/
export function PulsePalHistoryScanner({ Router, Icons, Media }) {

  // ---- CORE SNAPSHOTS ------------------------------------------------------
  const memoryTimeline = CoreMemory?.timeline?.() || [];
  const memoryGraph    = CoreMemory?.graph?.()    || {};
  const persona        = CoreMemory?.persona?.()  || {};
  const tone           = CoreMemory?.tone?.()     || {};

  const presence = CorePresence?.snapshot?.() || {};

  const daemonSnapshot =
    CoreDaemon?.snapshot?.() ||
    CoreDaemon?.snapshot?.() ||
    {};
  const palSummary =
    daemonSnapshot.palSummary ||
    CoreDaemon?.palSummary?.() ||
    {};

  const speechStats = CoreSpeech?.stats?.() || {};

  const palImages = Media?.resolveAll?.("PulsePal") || [];
  const avatar = palImages[0] || Icons.resolve("pulse");

  // ---- DERIVED MEMORY STRUCTURES ------------------------------------------
  const timeline = memoryTimeline || [];
  const graph    = memoryGraph.graph    || memoryGraph || {};
  const entities = memoryGraph.entities || {};
  const topics   = memoryGraph.topics   || {};
  const personaModel = persona || {};
  const toneModel    = tone    || {};

  const version = daemonSnapshot?.aiMeta?.version || "v24 IMMORTAL++";
  const lineage = daemonSnapshot?.aiMeta?.lineage || "Pulse‑OS Evolutionary";

  const toneLabel   = toneModel.label   || presence.tone   || "Neutral";
  const toneBand    = toneModel.band    || presence.band   || "Companion";
  const toneEnergy  = toneModel.energy  || presence.energy || "Balanced";
  const toneFocus   = toneModel.focus   || presence.focus  || "General";

  // ---- TIMELINE HTML (MESSAGE HISTORY PROJECTION) -------------------------
  const timelineHtml = timeline.length
    ? timeline.map(item => `
        <li class="evo-list-item">
          <strong>[${item.type || "event"}]</strong>
          ${item.timestamp
            ? ` — <span style="opacity:0.7;">${new Date(item.timestamp).toLocaleString()}</span>`
            : ""}
          <br/>
          ${item.text || item.value || ""}
        </li>
      `).join("")
    : `<li class="evo-list-item" style="opacity:0.7;">
         No timeline entries yet. As we talk, this view will fill in.
       </li>`;

  // ---- GRAPH HTML ---------------------------------------------------------
  const graphBuckets = graph.buckets || graph.clusters || graph || {};
  const graphKeys = Object.keys(graphBuckets);
  const graphHtml = graphKeys.length
    ? graphKeys.map(key => {
        const bucket = graphBuckets[key];
        const size = Array.isArray(bucket?.items) ? bucket.items.length
                   : Array.isArray(bucket)        ? bucket.length
                   : bucket?.count                || 0;
        const label = bucket?.label || key;
        return `
          <li class="evo-list-item">
            <strong>${label}</strong>: ${size} items
          </li>
        `;
      }).join("")
    : `<li class="evo-list-item">Graph empty.</li>`;

  // ---- ENTITIES HTML ------------------------------------------------------
  const entitiesHtml = Object.keys(entities).length
    ? Object.entries(entities).map(([k, v]) => {
        const type = v?.type || "entity";
        const count = v?.count || v?.frequency || 1;
        return `
          <li class="evo-list-item">
            <strong>${k}</strong>
            <span style="opacity:0.75; font-size:0.85rem;">
              (${type}, seen ${count}×)
            </span>
          </li>
        `;
      }).join("")
    : `<li class="evo-list-item">No entities extracted.</li>`;

  // ---- TOPICS HTML --------------------------------------------------------
  const topicsHtml = Object.keys(topics).length
    ? Object.entries(topics).map(([k, v]) => {
        const weight = v?.weight || v?.score || 1;
        return `
          <li class="evo-list-item">
            <strong>${k}</strong>
            <span style="opacity:0.75; font-size:0.85rem;">
              (weight ${weight})
            </span>
          </li>
        `;
      }).join("")
    : `<li class="evo-list-item">No topics detected.</li>`;

  // ---- PERSONA HTML -------------------------------------------------------
  const personaTraits = personaModel.traits || personaModel || {};
  const personaHtml = Object.keys(personaTraits).length
    ? Object.entries(personaTraits).map(([k, v]) => `
        <li class="evo-list-item">
          <strong>${k}</strong>: ${String(v)}
        </li>
      `).join("")
    : `<li class="evo-list-item">Persona not computed.</li>`;

  // ---- TONE HTML ----------------------------------------------------------
  const toneHtml = Object.keys(toneModel).length
    ? Object.entries(toneModel).map(([k, v]) => `
        <li class="evo-list-item">
          <strong>${k}</strong>: ${String(v)}
        </li>
      `).join("")
    : `<li class="evo-list-item">Tone not computed.</li>`;

  // ---- DAEMON PAL SUMMARY HTML -------------------------------------------
  const palSummaryHtml = Object.keys(palSummary || {}).length
    ? Object.entries(palSummary).map(([k, v]) => `
        <li class="evo-list-item">
          <strong>${k}</strong>: ${String(v)}
        </li>
      `).join("")
    : `<li class="evo-list-item">Daemon pal summary not available yet.</li>`;

  // ---- SPEECH STATS HTML --------------------------------------------------
  const speechStatsHtml = Object.keys(speechStats || {}).length
    ? Object.entries(speechStats).map(([k, v]) => `
        <li class="evo-list-item">
          <strong>${k}</strong>: ${String(v)}
        </li>
      `).join("")
    : `<li class="evo-list-item">No conversation stats available yet.</li>`;

  // ---- MEDIA PANEL --------------------------------------------------------
  const mediaHtml = palImages.length
    ? `
      <div class="evo-block" data-hook="pulsepal.history.media">
        <h2>Pulse‑Pal Media</h2>
        <div style="display:flex; gap:12px; flex-wrap:wrap;">
          ${palImages.map(src => `
            <div class="pal-history-thumb-frame">
              <img src="${src}" class="pal-history-thumb" />
            </div>
          `).join("")}
        </div>
      </div>
    `
    : "";

  // ========================================================================
  // RENDER
  // ========================================================================
  return `
    <div id="pulsepal-history" class="evo-wrapper">

      <!-- HEADER ------------------------------------------------------------->
      <div class="evo-surface evo-breathe" data-hook="pulsepal.history.header">
        <div style="display:flex; align-items:center; gap:18px;">
          <img src="${avatar}" class="evo-icon" />
          <div>
            <h1 style="margin:0;">Pulse‑Pal History Scanner</h1>
            <p style="margin:0; opacity:0.75;">
              ${toneLabel} • ${toneBand} • Energy: ${toneEnergy} • Focus: ${toneFocus}
            </p>
            <p style="margin:0; opacity:0.6; font-size:0.8rem;">
              Version: ${version} • Lineage: ${lineage}
            </p>
          </div>
        </div>
      </div>

      <!-- TIMELINE (MESSAGE HISTORY PROJECTION) ------------------------------>
      <div class="evo-block" data-hook="pulsepal.history.timeline">
        <h2>Timeline</h2>
        <ul class="evo-list">
          ${timelineHtml}
        </ul>
      </div>

      <!-- MEMORY GRAPH ------------------------------------------------------->
      <div class="evo-block" data-hook="pulsepal.history.graph">
        <h2>Memory Graph</h2>
        <ul class="evo-list">
          ${graphHtml}
        </ul>
      </div>

      <!-- ENTITIES ----------------------------------------------------------->
      <div class="evo-block" data-hook="pulsepal.history.entities">
        <h2>Entities</h2>
        <ul class="evo-list">
          ${entitiesHtml}
        </ul>
      </div>

      <!-- TOPICS ------------------------------------------------------------->
      <div class="evo-block" data-hook="pulsepal.history.topics">
        <h2>Topics</h2>
        <ul class="evo-list">
          ${topicsHtml}
        </ul>
      </div>

      <!-- PERSONA ------------------------------------------------------------>
      <div class="evo-block" data-hook="pulsepal.history.persona">
        <h2>Persona Traits</h2>
        <ul class="evo-list">
          ${personaHtml}
        </ul>
      </div>

      <!-- TONE --------------------------------------------------------------->
      <div class="evo-block" data-hook="pulsepal.history.tone">
        <h2>Tone</h2>
        <ul class="evo-list">
          ${toneHtml}
        </ul>
      </div>

      <!-- DAEMON VIEW -------------------------------------------------------->
      <div class="evo-block" data-hook="pulsepal.history.daemon">
        <h2>Daemon View (Pal Summary)</h2>
        <p style="opacity:0.75; margin-top:0;">
          How the v24 Continuance Daemon classifies Pulse‑Pal (palCount, continuance, proxies, binaries, etc.).
        </p>
        <ul class="evo-list">
          ${palSummaryHtml}
        </ul>
      </div>

      <!-- SPEECH ACTIVITY ---------------------------------------------------->
      <div class="evo-block" data-hook="pulsepal.history.activity">
        <h2>Conversation Activity</h2>
        <ul class="evo-list">
          ${speechStatsHtml}
        </ul>
      </div>

      <!-- MEDIA PANEL -------------------------------------------------------->
      ${mediaHtml}

    </div>
  `;
}
