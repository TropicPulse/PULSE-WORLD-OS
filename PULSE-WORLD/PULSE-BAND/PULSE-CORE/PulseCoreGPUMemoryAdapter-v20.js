// ============================================================================
//  PulseCoreGPUMemoryAdapter-v20.js — v20‑IMMORTAL‑GPU‑SPINE
//  GPU SPINE / BRAINSTEM • AUTONOMIC NERVOUS SYSTEM
//  “ROUTE SIGNALS. REGULATE PRESSURE. NEVER TOUCH THE HARDWARE.”
// ============================================================================

import { OrganismIdentity } from "../PULSE-X/PulseWorldOrganismMap-v24.js";

const Identity = OrganismIdentity(import.meta.url);

// ============================================================================
//  META BLOCK — v20 IMMORTAL (from genome)
// ============================================================================
export const PulseGPUOrchestratorMeta = Identity.OrganMeta;

// ============================================================================
//  SURFACE / ORGANISM LAYER EXPORTS — v20 IMMORTAL
// ============================================================================
export const pulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;

export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// ============================================================================
//  SIGNAL DEFINITIONS
// ============================================================================

// deterministic epoch for GPU orchestrator events
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
//  ROUTING MAP (v20)
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
//  FACTORY — PURE, DETERMINISTIC DISPATCHER (v20 IMMORTAL)
// ============================================================================
import { createPulseBinaryOverlay } from "./PulseCoreBinaryOverlay-v20.js";

export function createPulseGPUOrchestrator({
  overlay = createPulseBinaryOverlay(),
  dnaTag = "default-dna",
  version = "20.0-IMMORTAL-GPU-ORCHESTRATOR",
  log = console.log
} = {}) {

  function safeLog(stage, details = {}) {
    try { log("[PulseGPUOrchestrator-v20]", stage, JSON.stringify(details)); }
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
        metaBlock: PulseGPUOrchestratorMeta,
        dnaTag,
        version,
        epoch,
        band: "symbolic",
        pressure: null,
        mode: null,
        session: null,
        routeId: payload.routeId || "gpu",
        hiccupSeverity: null
      };
    }

    const band =
      signal === GPUOrchestratorSignals.LOAD_KERNEL ||
      signal === GPUOrchestratorSignals.UNLOAD_KERNEL ||
      signal === GPUOrchestratorSignals.EXECUTE_GRAPH ||
      signal === GPUOrchestratorSignals.WARM_GRAPH
        ? "binary"
        : "symbolic";

    const hiccupSeverity =
      typeof payload.hiccupSeverity === "number"
        ? payload.hiccupSeverity
        : null;

    const meta = {
      metaBlock: PulseGPUOrchestratorMeta,
      dnaTag,
      version,
      epoch,
      band,
      pressure: payload.pressure ?? null,
      mode: payload.mode ?? null,
      session: payload.session ?? null,
      routeId: payload.routeId || "gpu",
      hiccupSeverity
    };

    try {
      overlay.touch?.(meta.routeId, epoch, meta);
    } catch {}

    safeLog("ROUTE", {
      signal,
      targets: route.to,
      band,
      pressure: meta.pressure,
      hiccupSeverity: meta.hiccupSeverity
    });

    return {
      signal,
      payload,
      targets: route.to,
      notes: route.notes || "",
      ...meta
    };
  }

  safeLog("INIT", {
    identity: PulseGPUOrchestratorMeta.identity,
    version: PulseGPUOrchestratorMeta.version,
    dnaTag
  });

  return {
    // genome-driven identity + surface
    meta: PulseGPUOrchestratorMeta,
    pulseRole,
    surfaceMeta,
    pulseLoreContext,
    AI_EXPERIENCE_META,
    EXPORT_META,

    GPUOrchestratorSignals,
    GPUOrchestratorRoutes,
    routeSignal
  };
}
