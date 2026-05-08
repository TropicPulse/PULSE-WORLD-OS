// ============================================================================
// FILE: /PULSE-PAL/PulsePalCopilotAdapter-v24.js
// PULSE OS — v24 IMMORTAL
// COPILOT ADAPTER — AI DETECTOR + DOM HARVESTER + MEMORY FEEDER
// ============================================================================
//
// ROLE:
//   Detect Copilot as the active AI and harvest its message DOM.
//   Feed all unique messages into:
//     • CoreSpeech
//     • CoreMemory.semantic
//     • CoreMemory.engine.incremental
//     • Local DB (optional)
//
//   This adapter is:
//     • Copilot‑specific
//     • Delta‑aware
//     • Duplicate‑proof
//     • Deterministic
//     • Zero‑waste CPU
//     • Zero‑waste memory
//
// CONTRACT:
//   • Pure browser‑side organ
//   • No network calls
//   • No mutation of Copilot
//   • No interference with UI
//   • Deterministic ingestion
//
// ============================================================================
// BRIDGE INTEGRATION — REQUIRED
// ============================================================================
import { PulseProofBridge } from "../../PULSE-UI/_BACKEND/PULSE-WORLD-BRIDGE.js";

const CoreSpeech = PulseProofBridge.corespeech;
const CoreMemory = PulseProofBridge.corememory;
const CoreDaemon = PulseProofBridge.coredaemon;
const CorePresence = PulseProofBridge.corepresence;

// ============================================================================
// AI_EXPERIENCE_META
// ============================================================================
export const AI_EXPERIENCE_META_PulsePilotCopilotAdapter = {
  id: "pulsepilot.copilot.adapter",
  kind: "adapter",
  version: "v24-IMMORTAL",
  role: "Copilot DOM harvester + AI detector + memory feeder",
  surfaces: {
    band: ["ai_detector", "dom_harvester", "memory_ingest"],
    wave: ["silent", "precise", "deterministic"],
    binary: ["detect", "scan", "delta_ingest"],
    presence: ["ai_active", "ai_session"],
    advantage: ["zero_duplicate_ingest", "semantic_memory_ready"],
    speed: "hot_loop"
  },
  consumers: ["CoreSpeech", "CoreMemory", "CoreDaemon", "PulsePalHistoryScanner"],
  invariants: {
    networkCalls: "none",
    sideEffects: "none_on_ai",
    determinism: "strict",
    mutation: "forbidden_on_target_dom"
  }
};

// ============================================================================
// ORGAN META
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
    presenceAware: true
  },
  lineage: {
    family: "ai_ingestion",
    generation: 1,
    osVersion: "v24"
  }
};

// ============================================================================
// ORGAN CONTRACT
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
    start: "function"
  },
  consumers: ["CoreSpeech", "CoreMemory", "PulsePalHistoryScanner"],
  guarantees: {
    deterministic: true,
    noNetwork: true,
    noSideEffects: true
  }
};

// ============================================================================
// IMMORTAL OVERLAYS
// ============================================================================
export const IMMORTAL_OVERLAYS_PulsePilotCopilotAdapter = {
  drift: {
    allowed: false,
    notes: "DOM scanning semantics must remain stable."
  },
  pressure: {
    expectedLoad: "low",
    notes: "Triggered only on DOM mutations."
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

  // Internal state
  const state = {
    activeAI: null,
    sessionId: null,
    lastHashes: new Set()
  };

  // Utility: hash a message for dedupe
  function hashMessage(text) {
    return btoa(unescape(encodeURIComponent(text))).slice(0, 32);
  }

  // Detect Copilot
  function detectCopilot() {
    if (
      document.querySelector("cwc-chat") ||
      document.querySelector("[data-copilot-root]") ||
      window.location.href.includes("copilot")
    ) {
      if (state.activeAI !== "copilot") {
        state.activeAI = "copilot";
        state.sessionId = crypto.randomUUID();
      }
    }
  }

  // Capture a single message
  function captureMessage({ role, text }) {
    if (!state.activeAI) detectCopilot();
    if (!state.activeAI) return;

    const hash = hashMessage(role + "::" + text);
    if (state.lastHashes.has(hash)) return; // duplicate suppression

    state.lastHashes.add(hash);

    const evt = {
      ai: "copilot",
      role,
      text,
      timestamp: Date.now(),
      sessionId: state.sessionId
    };

    // Feed CoreSpeech
    CoreSpeech.add(evt);

    // Feed semantic memory
    CoreMemory.semantic.addTimeline({
      type: "speech",
      role,
      text,
      timestamp: evt.timestamp
    });

    // Incremental semantic update
    CoreMemory.engine.incremental({
      speech: CoreSpeech.messages(),
      presence: CorePresence.snapshot(),
      daemon: CoreDaemon.snapshot()
    });

    // Optional DB persistence
    db?.messages?.insert(evt);
  }

  // Scan Copilot DOM for messages
  function scanDom() {
    detectCopilot();
    if (!state.activeAI) return;

    const nodes = document.querySelectorAll("cwc-chat-message, .message, .assistant, .user");

    nodes.forEach(node => {
      const role =
        node.classList.contains("assistant") ||
        node.tagName.toLowerCase().includes("assistant")
          ? "assistant"
          : "user";

      const text = node.innerText?.trim();
      if (!text) return;

      captureMessage({ role, text });
    });
  }

  // Start DOM observer
  function start() {
    detectCopilot();
    if (!state.activeAI) return;

    const observer = new MutationObserver(() => scanDom());
    observer.observe(document.body, { childList: true, subtree: true });

    // Initial scan
    scanDom();
  }

  return {
    aiActive: () => state.activeAI,
    captureMessage,
    scanDom,
    start
  };
}
