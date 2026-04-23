// ============================================================================
//  PULSE GPU ORCHESTRATOR v10.4 — MINIMAL BRAINSTEM
//  Autonomic Command Spine • Deterministic • Zero Compute • Zero Mutation
// ============================================================================
//
//  WHAT THIS IS (v10.4):
//    • The pure autonomic command spine of the GPU organism.
//    • Routes signals between GPU subsystems.
//    • Emits deterministic neural events.
//    • Consults the Wisdom Cortex for insights.
//    • Fail‑open, drift‑proof, self‑repair‑ready.
//    • PulseSend‑10.4‑ready: events can be routed by the compute router.
//    • Earn‑v2‑ready.
//
//  WHAT THIS IS NOT:
//    • Not a renderer
//    • Not a GPU runtime
//    • Not a memory organ
//    • Not an advisor, healer, optimizer, or tracer
// ============================================================================

import { PulseGPUEventEmitter } from "./PulseGPUSynapses.js";
import { PulseGPUInsightsEngine } from "./PulseGPUWisdomCortex.js";

// ============================================================================
//  ORCHESTRATOR — MINIMAL BRAINSTEM (v10.4)
// ============================================================================
class PulseGPUOrchestrator {
  constructor() {
    // Synapses = neural firing system
    this.eventEmitter = new PulseGPUEventEmitter();

    // Wisdom Cortex = insight interpreter
    this.insightsEngine = new PulseGPUInsightsEngine();

    // Identity metadata
    this.meta = {
      layer: "PulseGPUOrchestrator",
      role: "BRAINSTEM",
      version: 10.4,
      target: "full-gpu",
      selfRepairable: true,
      evo: {
        driftProof: true,
        unifiedAdvantageField: true,
        advantageCascadeAware: true,
        pulseSend10Ready: true,

        routingContract: "PulseSend-v10.4",
        gpuOrganContract: "PulseGPU-v10.4",
        earnCompatibility: "Earn-v2"
      }
    };
  }

  // ========================================================================
  // SESSION SIGNALS — PURE AUTONOMIC ROUTING
  // ========================================================================
  startSession(payload = {}) {
    this.eventEmitter.emit("session-started", payload);
  }

  recordStep(sessionId, step) {
    this.eventEmitter.emit("session-step-recorded", { sessionId, step });
  }

  endSession(payload = {}) {
    this.eventEmitter.emit("session-ended", payload);
  }

  // ========================================================================
  // INSIGHTS — CONSULT WISDOM CORTEX
  // ========================================================================
  analyzeInsights({ baselineTraces = [], currentTraces = [], gameId, gpuModel }) {
    let insights = [];

    try {
      insights =
        this.insightsEngine.analyzeStepDurationsForGameAndHardware({
          baselineTraces,
          currentTraces,
          gameId,
          gpuModel
        }) || [];
    } catch {
      // fail-open: insights remain empty
    }

    this.eventEmitter.emit("insights-available", {
      gameId,
      gpuModel,
      insights
    });

    return { insights };
  }
}

// ============================================================================
// EXPORTS
// ============================================================================
export { PulseGPUOrchestrator };
