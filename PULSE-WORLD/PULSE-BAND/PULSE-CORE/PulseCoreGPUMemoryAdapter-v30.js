// ============================================================================
//  PulseCoreGPUMemoryAdapter-v30.js — v30‑IMMORTAL‑GPU‑SPINE
//  GPU SPINE / BRAINSTEM • AUTONOMIC NERVOUS SYSTEM
//  “ROUTE SIGNALS. REGULATE PRESSURE. NEVER TOUCH THE HARDWARE.”
//  META‑STRIPPED • NO OVERLAY MAP • NO BAND MAP
// ============================================================================

// ============================================================================
//  SIGNAL DEFINITIONS (unchanged)
// ============================================================================
let GPU_EPOCH = 0;
function nextGPUEpoch() {
  GPU_EPOCH += 1;
  return GPU_EPOCH;
}

export const GPUOrchestratorSignals = {
  SESSION_START: "gpu.session.start",
  SESSION_END: "gpu.session.end",

  LOAD_MODEL: "gpu.model.load",
  UNLOAD_MODEL: "gpu.model.unload",

  LOAD_KERNEL: "gpu.kernel.load",
  UNLOAD_KERNEL: "gpu.kernel.unload",

  EXECUTE_GRAPH: "gpu.graph.execute",
  WARM_GRAPH: "gpu.graph.warm",

  PRESSURE_TICK: "gpu.pressure.tick",
  MODE_SWITCH: "gpu.mode.switch",

  FRAME_HICCUP: "gpu.frame.hiccup",
  FRAME_STABLE: "gpu.frame.stable"
};

// ============================================================================
//  ROUTING TABLE (functional, not meta‑map)
// ============================================================================
export const GPUOrchestratorRoutes = {
  [GPUOrchestratorSignals.SESSION_START]: {
    to: ["GPU-Brain", "GPU-Engine"],
    notes: "Initialize GPU session context, allocate logical lanes."
  },
  [GPUOrchestratorSignals.SESSION_END]: {
    to: ["GPU-Brain", "GPU-Engine", "GPU-Healer"],
    notes: "Tear down logical session, emit summaries."
  },
  [GPUOrchestratorSignals.LOAD_MODEL]: {
    to: ["GPU-Engine", "GPU-Memory"],
    notes: "Load model into VRAM via GPU memory adapter."
  },
  [GPUOrchestratorSignals.UNLOAD_MODEL]: {
    to: ["GPU-Engine", "GPU-Memory"],
    notes: "Release VRAM allocations for model."
  },
  [GPUOrchestratorSignals.LOAD_KERNEL]: {
    to: ["GPU-Engine", "GPU-Memory"],
    notes: "Load/compile kernel into VRAM."
  },
  [GPUOrchestratorSignals.UNLOAD_KERNEL]: {
    to: ["GPU-Engine", "GPU-Memory"],
    notes: "Release kernel resources."
  },
  [GPUOrchestratorSignals.EXECUTE_GRAPH]: {
    to: ["GPU-Engine", "GPU-Brain", "GPU-Healer"],
    notes: "Execute compiled graph, feed results to Brain/Healer."
  },
  [GPUOrchestratorSignals.WARM_GRAPH]: {
    to: ["GPU-Engine", "GPU-Memory"],
    notes: "Pre‑warm graph paths for low‑latency execution."
  },
  [GPUOrchestratorSignals.PRESSURE_TICK]: {
    to: ["GPU-Advisor", "GPU-Healer"],
    notes: "Report load/pressure, trigger balancing or throttling."
  },
  [GPUOrchestratorSignals.MODE_SWITCH]: {
    to: ["GPU-Brain", "GPU-Engine"],
    notes: "Coordinate binary/symbolic mode transitions."
  },
  [GPUOrchestratorSignals.FRAME_HICCUP]: {
    to: ["GPU-Advisor", "GPU-Healer", "GPU-Brain"],
    notes: "Frame‑level hiccup; adjust scheduling, warm paths, or downgrade quality."
  },
  [GPUOrchestratorSignals.FRAME_STABLE]: {
    to: ["GPU-Advisor"],
    notes: "Frame‑level stability; may relax throttling or restore quality."
  }
};

// ============================================================================
//  FACTORY — PURE, DETERMINISTIC DISPATCHER (v30 IMMORTAL)
// ============================================================================
export function createPulseGPUOrchestrator({
  log = console.log
} = {}) {
  function safeLog(stage, details = {}) {
    try { log("[PulseGPUOrchestrator-v30]", stage, JSON.stringify(details)); }
    catch {}
  }

  function routeSignal(signal, payload = {}) {
    const route = GPUOrchestratorRoutes[signal];
    const epoch = nextGPUEpoch();

    if (!route) {
      safeLog("UNKNOWN_SIGNAL", { signal });
      return {
        signal,
        payload,
        targets: [],
        notes: "",
        epoch,
        routeId: payload.routeId || "gpu"
      };
    }

    const hiccupSeverity =
      typeof payload.hiccupSeverity === "number"
        ? payload.hiccupSeverity
        : null;

    safeLog("ROUTE", {
      signal,
      targets: route.to,
      pressure: payload.pressure ?? null,
      hiccupSeverity
    });

    return {
      signal,
      payload,
      targets: route.to,
      notes: route.notes || "",
      epoch,
      routeId: payload.routeId || "gpu",
      pressure: payload.pressure ?? null,
      mode: payload.mode ?? null,
      session: payload.session ?? null,
      hiccupSeverity
    };
  }

  safeLog("INIT", { version: "30.0-IMMORTAL-GPU-ORCHESTRATOR" });

  return {
    GPUOrchestratorSignals,
    GPUOrchestratorRoutes,
    routeSignal
  };
}
