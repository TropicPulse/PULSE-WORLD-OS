// ============================================================================
// FILE: /PULSE-PAL/PulsePalCopilotAdapter-v24++.js
// PULSE OS — v24 IMMORTAL++
// COPILOT ADAPTER — AI DETECTOR + DOM HARVESTER + MEMORY FEEDER + SESSION CORTEX
// ============================================================================
//
// ROLE:
//   Detect Copilot as the active AI and harvest its message DOM.
//   Feed all unique messages into:
//     • CoreSpeech
//     • CoreMemory.semantic
//     • CoreMemory.engine.incremental
//     • Local DB (optional)
//     • History Scanner (via CoreDaemon / semantic timeline)
//
//   This adapter is:
//     • Copilot‑specific
//     • Delta‑aware
//     • Duplicate‑proof
//     • Deterministic
//     • Zero‑waste CPU
//     • Zero‑waste memory
//     • IMMORTAL++ session‑aware
//
// CONTRACT:
//   • Pure browser‑side organ
//   • No network calls
//   • No mutation of Copilot
//   • No interference with UI
//   • Deterministic ingestion
//   • Additive evolution only
//
// ============================================================================
// BRIDGE INTEGRATION — REQUIRED
// ============================================================================
import { PulseProofBridge } from "../../PULSE-UI/_BACKEND/PULSE-WORLD-BRIDGE.js";

const CoreSpeech   = PulseProofBridge.corespeech;
const CoreMemory   = PulseProofBridge.corememory;
const CoreDaemon   = PulseProofBridge.coredaemon;
const CorePresence = PulseProofBridge.corepresence;

// ============================================================================
// AI_EXPERIENCE_META — v24 IMMORTAL++
// ============================================================================
export const AI_EXPERIENCE_META_PulsePilotCopilotAdapter = {
  id: "pulsepilot.copilot.adapter",
  kind: "adapter",
  version: "v24-IMMORTAL++",
  role: "Copilot DOM harvester + AI detector + memory feeder",
  surfaces: {
    band: ["ai_detector", "dom_harvester", "memory_ingest", "session_cortex"],
    wave: ["silent", "precise", "deterministic"],
    binary: ["detect", "scan", "delta_ingest", "session_track"],
    presence: ["ai_active", "ai_session"],
    advantage: ["zero_duplicate_ingest", "semantic_memory_ready", "history_scanner_ready"],
    speed: "hot_loop"
  },
  consumers: [
    "CoreSpeech",
    "CoreMemory",
    "CoreDaemon",
    "CorePresence",
    "PulsePalHistoryScanner"
  ],
  invariants: {
    networkCalls: "none",
    sideEffects: "none_on_ai",
    determinism: "strict",
    mutation: "forbidden_on_target_dom"
  }
};

// ============================================================================
// AI_EXPERIENCE_CONTEXT — v24 IMMORTAL++
// ============================================================================
export const AI_EXPERIENCE_CONTEXT_PulsePilotCopilotAdapter = {
  tone: "silent_technical",
  pacing: "event_driven",
  emotionalBand: "none",
  primaryIntent: "ingest_ai_history",
  secondaryIntent: "prepare_semantic_memory",
  userFirstImpression: "invisible_background_organ",
  visualNotes: {
    icon: "adapter.copilot",
    motion: "none",
    colorBand: "cyan_steel"
  }
};

// ============================================================================
// ORGAN META — v24 IMMORTAL++
// ============================================================================
export const ORGAN_META_PulsePilotCopilotAdapter = {
  id: "organ.pulsepilot.copilot.adapter",
  organism: "PulsePilot",
  layer: "adapter.ai",
  tier: "IMMORTAL",
  evoFlags: {
    aiDetector: true,
    domHarvester: true,
    deltaAware: true,
    duplicateProof: true,
    semanticMemoryFeeder: true,
    daemonAware: true,
    presenceAware: true,
    sessionAware: true
  },
  lineage: {
    family: "ai_ingestion",
    generation: 2,
    osVersion: "v24"
  }
};

// ============================================================================
// ORGAN CONTRACT — v24 IMMORTAL++
// ============================================================================
export const ORGAN_CONTRACT_PulsePilotCopilotAdapter = {
  inputs: {
    CoreSpeech: "speech ingestion organ",
    CoreMemory: "semantic memory organ",
    CoreDaemon: "daemon snapshot",
    CorePresence: "presence snapshot",
    db: "optional database interface"
  },
  outputs: {
    aiActive: "copilot",
    captureMessage: "function",
    scanDom: "function",
    start: "function",
    stop: "function"
  },
  consumers: [
    "CoreSpeech",
    "CoreMemory",
    "CoreDaemon",
    "PulsePalHistoryScanner"
  ],
  guarantees: {
    deterministic: true,
    noNetwork: true,
    noSideEffects: true
  }
};

// ============================================================================
// IMMORTAL OVERLAYS — v24 IMMORTAL++
// ============================================================================
export const IMMORTAL_OVERLAYS_PulsePilotCopilotAdapter = {
  drift: {
    allowed: false,
    notes: "DOM scanning semantics must remain stable."
  },
  pressure: {
    expectedLoad: "low",
    notes: "Triggered only on DOM mutations and light polling."
  },
  stability: {
    uiLayout: "stable",
    semantics: "stable",
    notes: "Only additive evolution allowed."
  },
  load: {
    maxComponents: 1,
    notes: "Single adapter organ."
  },
  chunking: {
    prewarm: ["adapter.copilot"],
    cacheKey: "pulsepilot.copilot.adapter"
  },
  worldLens: {
    awareOfWorlds: false
  },
  limbic: {
    band: "none"
  },
  triHeart: {
    cognitive: "ai_detection",
    emotional: "none",
    behavioral: "ingest_history"
  },
  impulseSpeed: {
    primaryAction: "scan_dom",
    latencyTargetMs: 5
  }
};

// ============================================================================
// IMPLEMENTATION — v24 IMMORTAL++
// ============================================================================
export function PulsePilotCopilotAdapter({ db }) {

  // Internal state — IMMORTAL++
  const state = {
    activeAI: null,
    sessionId: null,
    lastHashes: new Set(),
    observer: null,
    lastScanTs: 0,
    scanThrottleMs: 150
  };

  // Utility: hash a message for dedupe
  function hashMessage(text) {
    try {
      return btoa(unescape(encodeURIComponent(text))).slice(0, 32);
    } catch {
      return String(text.length) + "::" + String(text.charCodeAt(0) || 0);
    }
  }

  // Detect Copilot
  function detectCopilot() {
    const isCopilot =
      document.querySelector("cwc-chat") ||
      document.querySelector("[data-copilot-root]") ||
      document.querySelector("[data-telemetry-id='CopilotChat']") ||
      window.location.href.includes("copilot");

    if (isCopilot && state.activeAI !== "copilot") {
      state.activeAI = "copilot";
      state.sessionId = crypto.randomUUID();

      CoreDaemon?.log?.({
        kind: "ai_session_start",
        ai: "copilot",
        sessionId: state.sessionId,
        ts: Date.now()
      });
    }
  }

  // Capture a single message
  function captureMessage({ role, text }) {
    if (!text) return;

    if (!state.activeAI) detectCopilot();
    if (!state.activeAI) return;

    const hash = hashMessage(role + "::" + text);
    if (state.lastHashes.has(hash)) return;

    state.lastHashes.add(hash);

    const ts = Date.now();

    const evt = {
      ai: "copilot",
      role,
      text,
      timestamp: ts,
      sessionId: state.sessionId
    };

    // Feed CoreSpeech
    CoreSpeech?.add?.(evt);

    // Feed semantic memory
    CoreMemory?.semantic?.addTimeline?.({
      type: "speech",
      role,
      text,
      timestamp: ts,
      ai: "copilot",
      sessionId: state.sessionId
    });

    // Incremental semantic update
    try {
      CoreMemory?.engine?.incremental?.({
        speech: CoreSpeech?.messages?.() || [],
        presence: CorePresence?.snapshot?.() || {},
        daemon: CoreDaemon?.snapshot?.() || {}
      });
    } catch {
      // IMMORTAL++: swallow, never break adapter
    }

    // Optional DB persistence
    try {
      db?.messages?.insert?.(evt);
    } catch {
      // DB is optional; ignore failures
    }
  }

  // Extract role + text from a node
  function extractFromNode(node) {
    const cls = node.classList || { contains: () => false };
    const tag = (node.tagName || "").toLowerCase();

    const isAssistant =
      cls.contains("assistant") ||
      cls.contains("bot") ||
      cls.contains("ai") ||
      tag.includes("assistant");

    const isUser =
      cls.contains("user") ||
      cls.contains("me") ||
      tag.includes("user");

    const role = isAssistant ? "assistant" : isUser ? "user" : "assistant";

    const text = node.innerText?.trim();
    if (!text) return null;

    return { role, text };
  }

  // Scan Copilot DOM for messages
  function scanDom() {
    const now = performance.now();
    if (now - state.lastScanTs < state.scanThrottleMs) return;
    state.lastScanTs = now;

    detectCopilot();
    if (!state.activeAI) return;

    const nodes = document.querySelectorAll(
      "cwc-chat-message, [data-message-role], .message, .assistant, .user"
    );

    nodes.forEach(node => {
      const explicitRole = node.getAttribute?.("data-message-role");
      const text = node.innerText?.trim();
      if (!text) return;

      const role =
        explicitRole ||
        (node.classList?.contains("assistant") ? "assistant" :
         node.classList?.contains("user") ? "user" : "assistant");

      captureMessage({ role, text });
    });
  }

  // Start DOM observer
  function start() {
    detectCopilot();
    if (!state.activeAI) return;

    if (state.observer) return;

    const observer = new MutationObserver(() => scanDom());
    observer.observe(document.body, { childList: true, subtree: true });
    state.observer = observer;

    scanDom();
  }

  // Stop DOM observer (IMMORTAL++ additive)
  function stop() {
    if (state.observer) {
      state.observer.disconnect();
      state.observer = null;
    }
  }

  return {
    aiActive: () => state.activeAI,
    captureMessage,
    scanDom,
    start,
    stop
  };
}
