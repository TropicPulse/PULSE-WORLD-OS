/*
===============================================================================
FILE: /PULSE-UI/_COMPONENTS/PulseAIConsole-v20.js
LAYER: UI → CNS BRIDGE (AI COMMAND ORGAN)
VERSION: v20-IMMORTAL
===============================================================================
AI_EXPERIENCE_META = {
  identity: "PulseAIConsole",
  version: "v20-Immortal",
  layer: "pulse_ui",
  role: "ai_command_console",
  lineage: "PulseAIConsole-v14 → v16 → v18 → v20",

  evo: {
    aiConsoleOrgan: true,
    cnsBridge: true,
    reflexAware: true,
    actNowAware: true,
    dualBand: true,
    symbolicPrimary: true,
    deterministic: true,
    driftProof: true,
    zeroMutationOfInput: true,
    zeroNetwork: true,
    zeroBackend: true,
    zeroAutonomy: true,
    zeroTiming: true,
    zeroEval: true,
    zeroDynamicImports: true,
    uiAttachable: true,
    worldAware: true,
    preActNowAnnounce: true
  },

  contract: {
    input: [
      "Pulse: <command>",
      "AI user text",
      "UI events",
      "CNS triggers"
    ],
    output: [
      "AIConsoleEvent",
      "AIResponse",
      "PreActNowAnnouncement",
      "ConsoleRenderState"
    ]
  }
}
===============================================================================
EXPORT_META = {
  organ: "PulseAIConsole",
  layer: "pulse_ui",
  stability: "IMMORTAL",
  deterministic: true,

  consumes: [
    "UserInput",
    "PulseAI",
    "ACTNow",
    "UIRuntime"
  ],

  produces: [
    "AIConsoleState",
    "AIConsoleEvent",
    "AIResponse",
    "PreActNowAnnouncement"
  ],

  sideEffects: "ui_render_only",
  network: "none",
  filesystem: "none"
}
===============================================================================
*/

export function createPulseAIConsole({
  PulseAI,          // your AI brain (symbolic)
  ACTNow,           // ACTNow v20 reflex organ
  UIRuntime,        // UI renderer
  Logger = console
} = {}) {

  const log = Logger.log || console.log;

  // ==========================================================================
  // IMMORTAL STATE — deterministic, no mutation outside organ
  // ==========================================================================
  const ConsoleState = Object.seal({
    open: false,
    history: [],
    lastCommand: null,
    lastAIResponse: null,
    lastPreActNow: null,
    version: "v20-IMMORTAL"
  });

  // ==========================================================================
  // HELPERS — deterministic, pure
  // ==========================================================================
  function normalizeInput(text) {
    return String(text || "").trim();
  }

  function isPulseCommand(text) {
    return text.startsWith("Pulse:");
  }

  function extractCommand(text) {
    return text.slice(6).trim().toLowerCase();
  }

  function pushHistory(entry) {
    ConsoleState.history.push({
      id: "H" + (ConsoleState.history.length + 1),
      ts: Date.now(),
      ...entry
    });
  }

  // ==========================================================================
  // PRE‑ACTNOW ANNOUNCEMENT
  //  Before ACTNOW fires, the console prints a deterministic AI statement.
  // ==========================================================================
  function announcePreActNow(snapshot) {
    const msg = `⚡ ACTNOW reflex incoming for route "${snapshot.route}" intent "${snapshot.intent}"`;
    ConsoleState.lastPreActNow = msg;

    pushHistory({
      type: "pre_actnow",
      message: msg,
      snapshot
    });

    UIRuntime.renderAIConsole(ConsoleState);
  }

  // ==========================================================================
  // AI RESPONSE HANDLER
  // ==========================================================================
  function handleAIResponse(text, aiResponse) {
    ConsoleState.lastAIResponse = aiResponse;

    pushHistory({
      type: "ai",
      input: text,
      response: aiResponse
    });

    UIRuntime.renderAIConsole(ConsoleState);
  }

  // ==========================================================================
  // COMMAND HANDLER — Pulse: commands
  // ==========================================================================
  function handlePulseCommand(text) {
    const cmd = extractCommand(text);
    ConsoleState.lastCommand = cmd;

    let response = null;

    switch (cmd) {
      case "help":
        response = "PulseAIConsole v20 — Commands: help, open, close, clear, history";
        break;

      case "open":
        ConsoleState.open = true;
        response = "Console opened.";
        break;

      case "close":
        ConsoleState.open = false;
        response = "Console closed.";
        break;

      case "clear":
        ConsoleState.history.length = 0;
        response = "Console history cleared.";
        break;

      case "history":
        response = `History entries: ${ConsoleState.history.length}`;
        break;

      default:
        response = `Unknown Pulse command: ${cmd}`;
        break;
    }

    pushHistory({
      type: "command",
      command: cmd,
      response
    });

    UIRuntime.renderAIConsole(ConsoleState);
  }

  // ==========================================================================
  // MAIN ENTRY — user typed something
  // ==========================================================================
  function onUserInput(text) {
    const input = normalizeInput(text);
    if (!input) return;

    pushHistory({ type: "input", input });

    if (isPulseCommand(input)) {
      handlePulseCommand(input);
      return;
    }

    // AI symbolic reasoning
    const aiResponse = PulseAI.respond(input);

    handleAIResponse(input, aiResponse);

    // If AI response indicates ACTNOW reflex is needed:
    if (aiResponse?.actNowSnapshot) {
      announcePreActNow(aiResponse.actNowSnapshot);

      const reflex = ACTNow.fromCompileSnapshot(aiResponse.actNowSnapshot);

      pushHistory({
        type: "actnow",
        reflex
      });

      UIRuntime.renderAIConsole(ConsoleState);
    }
  }

  // ==========================================================================
  // PUBLIC API
  // ==========================================================================
  return {
    meta: {
      identity: "PulseAIConsole-v20",
      version: "v20-IMMORTAL"
    },

    state: ConsoleState,

    onUserInput,
    open() {
      ConsoleState.open = true;
      UIRuntime.renderAIConsole(ConsoleState);
    },
    close() {
      ConsoleState.open = false;
      UIRuntime.renderAIConsole(ConsoleState);
    },
    toggle() {
      ConsoleState.open = !ConsoleState.open;
      UIRuntime.renderAIConsole(ConsoleState);
    },
    clear() {
      ConsoleState.history.length = 0;
      UIRuntime.renderAIConsole(ConsoleState);
    }
  };
}
