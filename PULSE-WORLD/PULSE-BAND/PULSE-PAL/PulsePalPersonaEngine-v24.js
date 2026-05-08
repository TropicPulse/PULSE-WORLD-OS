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
//     global.PulsePalPersonaEngine.compute({
//       daemonSnapshot?,   // optional
//       palSummary?,       // optional
//       palHistory?        // optional
//     })
//
// ============================================================================
// BRIDGE INTEGRATION — REQUIRED
// ============================================================================
import { PulseProofBridge } from "/PULSE/BRIDGE/PulseProofBridge.js";

const CoreMemory   = PulseProofBridge.corememory;
const CoreSpeech   = PulseProofBridge.corespeech;
const CorePresence = PulseProofBridge.corepresence;
const CoreDaemon   = PulseProofBridge.coredaemon;
const getIdentity  = PulseProofBridge.getBridgeIdentitySnapshot
  ? () => PulseProofBridge.getBridgeIdentitySnapshot()
  : () => null;

// ============================================================================
// AI_EXPERIENCE_META
// ============================================================================
export const AI_EXPERIENCE_META_PulsePalPersonaEngine = {
  id: "pulsepal.persona.engine",
  kind: "core_engine",
  version: "v24-IMMORTAL++",
  role: "Pulse‑Pal persona synthesis cortex",
  surfaces: {
    band: ["persona", "tone", "continuity", "identity", "behavior"],
    wave: ["attuned", "stable", "grounded"],
    binary: ["persona_snapshot", "tone_snapshot", "continuity_snapshot", "identity_snapshot"],
    presence: ["persona_state", "relational_band"],
    advantage: ["single_persona_surface", "daemon_bridge", "history_aware"],
    speed: "instant_compute"
  },
  routes: {
    home: "pulsepal.home",
    identity: "pulsepal.identity",
    memory: "pulsepal.memory",
    speech: "pulsepal.speech"
  },
  consumers: [
    "CoreMemory",
    "CoreSpeech",
    "CorePresence",
    "CoreDaemon",
    "PulseBandDaemon",
    "IQMap"
  ],
  invariants: {
    networkCalls: "none",
    sideEffects: "cache_last_snapshot_only",
    determinism: "strict",
    mutation: "forbidden_at_runtime"
  }
};

// ============================================================================
// AI_EXPERIENCE_CONTEXT
// ============================================================================
export const AI_EXPERIENCE_CONTEXT_PulsePalPersonaEngine = {
  tone: "calm_attuned",
  pacing: "steady",
  emotionalBand: "connection_safety",
  primaryIntent: "synthesize_persona_surface",
  secondaryIntent: "stabilize_tone_and_continuity",
  userFirstImpression: "persona_is_consistent_and_explainable",
  visualNotes: {
    icon: "persona",
    motion: "low_breathe",
    colorBand: "cyan_soft"
  }
};

// ============================================================================
// ORGAN_META
// ============================================================================
export const ORGAN_META_PulsePalPersonaEngine = {
  id: "organ.pulsepal.persona.engine",
  organism: "PulsePal",
  layer: "core.persona",
  tier: "IMMORTAL",
  evoFlags: {
    personaAware: true,
    toneAware: true,
    continuityAware: true,
    identityAware: true,
    daemonAware: true,
    requiresCoreMemory: true,
    requiresCoreSpeech: true,
    requiresCorePresence: true
  },
  lineage: {
    family: "companion_persona",
    generation: 2,
    osVersion: "v24"
  }
};

// ============================================================================
// ORGAN_CONTRACT
// ============================================================================
export const ORGAN_CONTRACT_PulsePalPersonaEngine = {
  inputs: {
    CoreMemory: "bridge memory organ",
    CoreSpeech: "bridge speech organ",
    CorePresence: "bridge presence organ",
    CoreDaemon: "bridge daemon snapshot (optional)",
    DaemonSnapshot: "PulseBandDaemon snapshot (optional)",
    PalSummary: "daemon palSummary (optional)",
    PalHistory: "daemon palHistory (optional)"
  },
  outputs: {
    personaSnapshot: {
      persona: "traits + style",
      tone: "tone snapshot (band + energy + focus)",
      behavior: "behavior hints",
      continuity: "continuity snapshot",
      identity: "identity snapshot"
    }
  },
  consumers: [
    "PulseBandDaemon",
    "PulsePalMemory",
    "PulsePalSpeech",
    "IQMap",
    "Dashboards"
  ],
  guarantees: {
    deterministicCompute: true,
    noNetwork: true,
    noUI: true
  }
};

// ============================================================================
// IMMORTAL_OVERLAYS
// ============================================================================
export const IMMORTAL_OVERLAYS_PulsePalPersonaEngine = {
  drift: {
    allowed: false,
    notes: "Persona semantics must remain stable across versions."
  },
  pressure: {
    expectedLoad: "medium",
    notes: "Computed on demand or per daemon tick."
  },
  stability: {
    uiLayout: "none",
    semantics: "stable",
    notes: "Only additive evolution allowed."
  },
  load: {
    maxComponents: 1,
    notes: "Single persona snapshot object."
  },
  worldLens: {
    awareOfWorlds: true
  },
  limbic: {
    band: "connection_safety"
  },
  triHeart: {
    cognitive: "persona_inference",
    emotional: "tone_alignment",
    behavioral: "behavior_hinting"
  },
  impulseSpeed: {
    primaryAction: "compute_persona",
    latencyTargetMs: 10
  },
  healingSurfaces: {
    enabled: true
  }
};

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
    globalThis.PulsePalPersonaEngine = PulsePalPersonaEngine;
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
