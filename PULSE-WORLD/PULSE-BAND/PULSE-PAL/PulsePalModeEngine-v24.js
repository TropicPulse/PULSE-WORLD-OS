// ============================================================================
// FILE: /PULSE/CORE/PulsePalModeEngine-v24.js
// PULSE OS — v24 IMMORTAL
// PULSE‑PAL MODE ENGINE — ARCHETYPE WEIGHTS + ACTIVE MODE + AVATAR RESOLUTION
// ============================================================================
//
// ROLE:
//   The Pulse‑Pal Mode Engine is the archetype router.
//   It decides:
//     • Which mode is currently active (advisor, architect, grid, earn, etc.)
//     • How much each mode contributes (weights)
//     • Which avatar image to show for the active mode
//     • How to flip modes quickly when the user shifts perspective
//
//   It is designed to work with:
//     • 16+ Pulse‑Pal images (Advisor, Architect, Entrepreneur, Expansion,
//       Finality, Grid, Mesh, Tourist, Fox/Human modes, etc.)
//     • Existing media scan (PulseMediaResolver / Media.resolveAll("PulsePal"))
//     • CorePresence / CoreMemory / CoreSpeech
//
// CONTRACT:
//   • Pure logic organ (no network)
//   • Deterministic given inputs
//   • Evolvable (new modes can be added without breaking old ones)
//   • Zero side effects except cached last snapshot + global exposure
//
// ============================================================================
// BRIDGE INTEGRATION — REQUIRED
// ============================================================================
PULSE-WORLD-MAP.js
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

const CoreMemory   = PulseProofBridge.corememory;
const CoreSpeech   = PulseProofBridge.corespeech;
const CorePresence = PulseProofBridge.corepresence;

// Media is usually provided to UI organs, but we allow a bridge hook too:
const CoreMedia = PulseProofBridge.coremedia || null;


// ============================================================================
// IMPLEMENTATION — v24 IMMORTAL++
// ============================================================================

const DEFAULT_MODES = [
  "advisor",
  "architect",
  "entrepreneur",
  "expansion",
  "finality",
  "grid",
  "mesh",
  "tourist",
  "fox",
  "human"
  // plus any others you’ve added with the same naming pattern
];

class PulsePalModeEngineCore {
  constructor() {
    this.lastSnapshot = null;
    this.modes = new Set(DEFAULT_MODES);
  }

  // --------------------------------------------------------------------------
  // PUBLIC: compute mode snapshot
  // --------------------------------------------------------------------------
  compute(context = {}) {
    const media = context.Media || CoreMedia || null;
    const filenames = context.fileNames || context.filenames || null;

    const speechMessages = CoreSpeech?.messages?.() || [];
    const presence = CorePresence?.snapshot?.() || {};
    const memoryPersona = CoreMemory?.persona?.() || {};

    const allAvatars = this.resolveAvatars({ media, filenames });
    const weights = this.computeModeWeights({ speechMessages, presence, memoryPersona, allAvatars });
    const activeMode = this.pickActiveMode({ presence, weights });

    const avatar = allAvatars[activeMode] || this.pickFallbackAvatar(allAvatars);

    const snapshot = {
      version: "v24-IMMORTAL",
      activeMode,
      weights,
      avatar,
      allAvatars,
      lastComputeAt: new Date().toISOString()
    };

    this.lastSnapshot = snapshot;
    return snapshot;
  }

  // --------------------------------------------------------------------------
  // INTERNAL: resolve avatars from filenames / media
  // --------------------------------------------------------------------------
  resolveAvatars({ media, filenames }) {
    const avatars = {};

    // Strategy 1: use filenames passed in (daemon / FS side)
    if (Array.isArray(filenames) && filenames.length) {
      for (const file of filenames) {
        const lower = file.toLowerCase();
        for (const mode of this.modes) {
          if (lower.includes(mode)) {
            avatars[mode] = file;
          }
        }
      }
    }

    // Strategy 2: use Media resolver (browser / UI side)
    if (media && typeof media.resolveAll === "function") {
      const palImages = media.resolveAll("PulsePal") || [];
      for (const src of palImages) {
        const lower = String(src).toLowerCase();
        for (const mode of this.modes) {
          if (lower.includes(mode)) {
            if (!avatars[mode]) avatars[mode] = src;
          }
        }
      }
    }

    return avatars;
  }

  // --------------------------------------------------------------------------
  // INTERNAL: compute mode weights from speech + presence + memory
  // --------------------------------------------------------------------------
  computeModeWeights({ speechMessages, presence, memoryPersona, allAvatars }) {
    const weights = {};
    for (const mode of this.modes) {
      weights[mode] = 0;
    }

    // 1) Presence explicit mode override
    const presenceMode = presence?.mode || presence?.activeMode || null;
    if (presenceMode && weights.hasOwnProperty(presenceMode)) {
      weights[presenceMode] += 2.0; // strong hint
    }

    // 2) Memory persona hints (e.g., persona.tags: ["grid", "architect"])
    const tags = memoryPersona?.tags || [];
    for (const tag of tags) {
      const t = String(tag).toLowerCase();
      for (const mode of this.modes) {
        if (t.includes(mode)) {
          weights[mode] += 1.0;
        }
      }
    }

    // 3) Speech context: last N messages, look for mode words
    const recent = speechMessages.slice(-20);
    for (const msg of recent) {
      const text = (msg.text || "").toLowerCase();
      for (const mode of this.modes) {
        if (text.includes(mode)) {
          weights[mode] += 0.7;
        }
      }

      // Special semantic hints
      if (text.includes("earn") || text.includes("money") || text.includes("reward")) {
        if (weights.hasOwnProperty("entrepreneur")) weights.entrepreneur += 0.5;
      }
      if (text.includes("grid") || text.includes("structure") || text.includes("system")) {
        if (weights.hasOwnProperty("grid")) weights.grid += 0.5;
        if (weights.hasOwnProperty("architect")) weights.architect += 0.3;
      }
      if (text.includes("travel") || text.includes("explore") || text.includes("tourist")) {
        if (weights.hasOwnProperty("tourist")) weights.tourist += 0.5;
      }
      if (text.includes("final") || text.includes("closure") || text.includes("endgame")) {
        if (weights.hasOwnProperty("finality")) weights.finality += 0.5;
      }
    }

    // 4) Avatar availability: modes that actually have images get a small boost
    for (const mode of Object.keys(allAvatars)) {
      if (weights.hasOwnProperty(mode)) {
        weights[mode] += 0.2;
      }
    }

    // Normalize to 0..1
    const sum = Object.values(weights).reduce((a, b) => a + b, 0) || 1;
    for (const mode of Object.keys(weights)) {
      weights[mode] = weights[mode] / sum;
    }

    return weights;
  }

  // --------------------------------------------------------------------------
  // INTERNAL: pick active mode
  // --------------------------------------------------------------------------
  pickActiveMode({ presence, weights }) {
    // 1) Presence explicit override
    const presenceMode = presence?.mode || presence?.activeMode || null;
    if (presenceMode && weights.hasOwnProperty(presenceMode)) {
      return presenceMode;
    }

    // 2) Highest weight
    let bestMode = "advisor";
    let bestWeight = -1;
    for (const [mode, w] of Object.entries(weights)) {
      if (w > bestWeight) {
        bestWeight = w;
        bestMode = mode;
      }
    }

    return bestMode;
  }

  // --------------------------------------------------------------------------
  // INTERNAL: fallback avatar
  // --------------------------------------------------------------------------
  pickFallbackAvatar(allAvatars) {
    const modes = Object.keys(allAvatars);
    if (modes.length === 0) return null;
    return allAvatars[modes[0]];
  }

  // --------------------------------------------------------------------------
  // PUBLIC: last snapshot
  // --------------------------------------------------------------------------
  getLastSnapshot() {
    return this.lastSnapshot;
  }
}

// ============================================================================
// SINGLETON INSTANCE + EXPORT SURFACE
// ============================================================================
const _modeEngineInstance = new PulsePalModeEngineCore();

export function computePulsePalMode(context = {}) {
  return _modeEngineInstance.compute(context);
}

export function getLastPulsePalModeSnapshot() {
  return _modeEngineInstance.getLastSnapshot();
}

export const PulsePalModeEngine = {
  compute: computePulsePalMode,
  getLast: getLastPulsePalModeSnapshot
};

// ============================================================================
// GLOBAL EXPOSURE (for UI / dashboards / daemon taps)
// ============================================================================
try {
  if (typeof globalThis !== "undefined") {
    globalThis.PulsePalModeEngine = PulsePalModeEngine;
  }
  if (typeof window !== "undefined") {
    window.PulsePalModeEngine = PulsePalModeEngine;
  }
} catch {
  // never throw
}

// ============================================================================
// END OF FILE — PulsePalModeEngine-v24 IMMORTAL
// ============================================================================
