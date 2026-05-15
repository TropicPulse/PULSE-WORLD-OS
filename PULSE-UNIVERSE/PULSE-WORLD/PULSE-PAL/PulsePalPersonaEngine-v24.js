// ============================================================================
// FILE: /PULSE-PAL/PulsePalPersonaEngine-v24++.js
// PULSE OS — v24 IMMORTAL++
// PULSE‑PAL PERSONA ENGINE — TRAITS + TONE + CONTINUITY + IDENTITY
// ============================================================================
//
// ROLE:
//   The Pulse‑Pal Persona Engine is the semantic persona cortex.
//   It fuses:
//     • CoreMemory persona snapshot
//     • CoreMemory tone snapshot
//     • CoreMemory relationship snapshot (optional)
//     • CoreSpeech recent messages
//     • CorePresence snapshot
//     • Daemon palHistory + palSummary (optional)
//     • Identity snapshot from PulseProofBridge
//
//   It produces a single, deterministic persona surface:
//     • persona: traits + style
//     • tone: conversational tone snapshot (band + energy + focus)
//     • behavior: inferred behavior hints
//     • continuity: continuity + history depth
//     • identity: stable identity hints
//
// CONTRACT:
//   • Pure logic organ (no network)
//   • Deterministic given inputs
//   • Evolvable via CoreMemory / IQMap
//   • Zero side effects (except cached lastSnapshot)
//
//   Daemon contract (Node side):
//     window.PulsePalPersonaEngine.compute({
//       daemonSnapshot?,   // optional
//       palSummary?,       // optional
//       palHistory?        // optional
//     })
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
import { PulseProofBridge } from "../../PULSE-BAND/____BACKEND/PULSE-WORLD-BRIDGE.js";

const CoreMemory   = PulseProofBridge.corememory;
const CoreSpeech   = PulseProofBridge.corespeech;
const CorePresence = PulseProofBridge.corepresence;
const CoreDaemon   = PulseProofBridge.coredaemon;
const getIdentity  = PulseProofBridge.getBridgeIdentitySnapshot
  ? () => PulseProofBridge.getBridgeIdentitySnapshot()
  : () => null;

// ============================================================================
// IMPLEMENTATION — v24 IMMORTAL++
// ============================================================================
class PulsePalPersonaEngineCore {
  constructor() {
    this.lastSnapshot = null;
  }

  // --------------------------------------------------------------------------
  // PUBLIC: compute persona snapshot
  // --------------------------------------------------------------------------
  compute(context = {}) {
    const daemonSnapshot = context.daemonSnapshot || null;
    const palSummary     = context.palSummary || null;
    const palHistory     = context.palHistory || null;

    const memoryPersona  = CoreMemory?.persona?.()      || {};
    const memoryTone     = CoreMemory?.tone?.()         || {};
    const relationship   = CoreMemory?.relationship?.() || {};
    const presence       = CorePresence?.snapshot?.()   || {};
    const daemonCore     = CoreDaemon?.snapshot?.()     || {};
    const identity       = getIdentity()                || null;

    const speechMessages = CoreSpeech?.messages?.()     || [];
    const lastMessage    = speechMessages[speechMessages.length - 1] || null;

    const persona = this.buildPersonaTraits({
      memoryPersona,
      relationship,
      presence,
      daemonCore,
      palSummary
    });

    const tone = this.buildToneSnapshot({
      memoryTone,
      presence,
      lastMessage
    });

    const behavior = this.buildBehaviorSnapshot({
      speechMessages,
      relationship,
      palSummary
    });

    const continuity = this.buildContinuitySnapshot({
      palHistory,
      daemonSnapshot,
      daemonCore
    });

    const identitySnapshot = this.buildIdentitySnapshot({
      identity,
      relationship
    });

    const snapshot = {
      version: "v24-IMMORTAL++",
      persona,
      tone,
      behavior,
      continuity,
      identity: identitySnapshot,
      lastComputeAt: new Date().toISOString()
    };

    this.lastSnapshot = snapshot;
    return snapshot;
  }

  // --------------------------------------------------------------------------
  // INTERNAL: persona traits
  // --------------------------------------------------------------------------
  buildPersonaTraits({ memoryPersona, relationship, presence, daemonCore, palSummary }) {
    const warmth =
      memoryPersona.warmth ??
      (presence?.tone === "warm" ? 1 : 0.6);

    const focus =
      memoryPersona.focus ??
      (presence?.activity === "focused" ? 1 : 0.6);

    const expressiveness =
      memoryPersona.expressiveness ||
      presence?.expression ||
      "medium";

    const trustLevel =
      relationship?.trustLevel ??
      relationship?.score ??
      0.5;

    const palWeight =
      palSummary?.avgPalContinuance != null
        ? palSummary.avgPalContinuance / 100
        : 0.5;

    const daemonContinuityHint = daemonCore?.continuity ?? null;

    const tags = Array.isArray(memoryPersona.tags)
      ? memoryPersona.tags
      : memoryPersona.tags
      ? [memoryPersona.tags]
      : [];

    return {
      warmth,
      focus,
      expressiveness,
      trustLevel,
      palWeight,
      daemonContinuityHint,
      tags
    };
  }

  // --------------------------------------------------------------------------
  // INTERNAL: tone snapshot (band + energy + focus)
// --------------------------------------------------------------------------
  buildToneSnapshot({ memoryTone, presence, lastMessage }) {
    const baseline = memoryTone.baseline || presence?.tone || "neutral";
    const lastUserTone = memoryTone.lastUserTone || lastMessage?.tone || "neutral";

    const band =
      memoryTone.band ||
      presence?.band ||
      "companion";

    const energy =
      memoryTone.energy ||
      presence?.energy ||
      "balanced";

    const focus =
      memoryTone.focus ||
      presence?.focus ||
      "general";

    return {
      baseline,
      lastUserTone,
      band,
      energy,
      focus,
      lastMessageText: lastMessage?.text || "",
      lastMessageRole: lastMessage?.role || "unknown"
    };
  }

  // --------------------------------------------------------------------------
  // INTERNAL: behavior snapshot
  // --------------------------------------------------------------------------
  buildBehaviorSnapshot({ speechMessages, relationship, palSummary }) {
    const totalMessages = speechMessages.length;
    const recent = speechMessages.slice(-20);

    const questionCount = recent.filter(m => m.text && m.text.includes("?")).length;
    const avgLength =
      recent.length > 0
        ? recent.reduce((sum, m) => sum + (m.text ? m.text.length : 0), 0) / recent.length
        : 0;

    const engagement =
      totalMessages > 0
        ? Math.min(1, totalMessages / 200)
        : 0;

    const palContinuance =
      palSummary?.avgPalContinuance != null
        ? palSummary.avgPalContinuance / 100
        : 0.5;

    const relationalBand = relationship?.band || "neutral";

    const styleHint =
      avgLength > 220 ? "long_form"
      : avgLength > 80 ? "medium_form"
      : "short_form";

    return {
      engagement,
      questionRate: recent.length > 0 ? questionCount / recent.length : 0,
      avgMessageLength: avgLength,
      relationalBand,
      palContinuance,
      styleHint
    };
  }

  // --------------------------------------------------------------------------
  // INTERNAL: continuity snapshot
  // --------------------------------------------------------------------------
  buildContinuitySnapshot({ palHistory, daemonSnapshot, daemonCore }) {
    const historyScore    = palHistory?.continuityScore ?? 0;
    const messagesScanned = palHistory?.messagesScanned ?? 0;

    const daemonContinuance =
      daemonSnapshot?.palSummary?.avgPalContinuance ??
      daemonCore?.continuity ??
      0;

    const combinedContinuity = Math.round(
      (historyScore * 0.6) + (daemonContinuance * 0.4)
    );

    return {
      historyScore,
      messagesScanned,
      daemonContinuance,
      combinedContinuity
    };
  }

  // --------------------------------------------------------------------------
  // INTERNAL: identity snapshot
  // --------------------------------------------------------------------------
  buildIdentitySnapshot({ identity, relationship }) {
    if (!identity && !relationship) {
      return null;
    }

    return {
      uid: identity?.uid || null,
      identityVersion: identity?.identityVersion || null,
      presenceBand: identity?.presenceBand || relationship?.band || "unknown",
      advantageBand: identity?.advantageBand || "neutral",
      earnBand: identity?.earnBand || "unknown",
      deviceTrusted: identity?.deviceTrusted ?? null,
      sessionAge: identity?.sessionAge ?? null,
      binarySignature: identity?.binarySignature || null,
      presenceSignature: identity?.presenceSignature || null,
      relationshipBand: relationship?.band || null
    };
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
const _personaEngineInstance = new PulsePalPersonaEngineCore();

export function computePulsePalPersona(context = {}) {
  return _personaEngineInstance.compute(context);
}

export function getLastPulsePalPersonaSnapshot() {
  return _personaEngineInstance.getLastSnapshot();
}

export const PulsePalPersonaEngine = {
  compute: computePulsePalPersona,
  getLast: getLastPulsePalPersonaSnapshot
};

// ============================================================================
// GLOBAL EXPOSURE (for daemon / dashboards)
// ============================================================================
try {
  if (typeof globalThis !== "undefined") {
    window.PulsePalPersonaEngine = PulsePalPersonaEngine;
  }
  if (typeof window !== "undefined") {
    window.PulsePalPersonaEngine = PulsePalPersonaEngine;
  }
} catch {
  // never throw
}

// ============================================================================
// END OF FILE — PulsePalPersonaEngine-v24 IMMORTAL++
// ============================================================================
