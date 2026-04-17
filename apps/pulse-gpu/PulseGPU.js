// FILE: tropic-pulse-functions/apps/pulse-gpu/PulseGPU.js
// LAYER: GPU-SUBSYSTEM (OS-FACING BRIDGE / GPU OS LAYER)
//
// ROLE:
//   PulseGPU — unified GPU subsystem surface for the rest of the OS.
//   - Wires Brain + Runtime + Engine + Orchestrator into a single, deterministic API.
//   - Exposes GPU readiness + basic metrics + handles fail-open behavior.
//   - Stays ESM-only, no hidden side effects; optional window-attach for debugging only.
//
//   This file IS:
//     • The OS-facing GPU bridge
//     • The connection point for PulseBand / PulseNet / dashboards
//     • A thin coordinator over already-pure subsystems
//
//   This file IS NOT:
//     • A renderer by itself
//     • A backend module
//     • A place for business logic
//     • A place for random globals (window attach is opt-in, explicit)
//
// SAFETY:
//   • No DOM work beyond what Runtime/Engine already do with canvas
//   • No Node APIs
//   • Fail-open: if GPU is unavailable, status stays not-ready, no crash
//   • Deterministic: no randomness, no timestamps here
// -------------------------------------------------------------------

import {
  BrainInput,
  PulseGPUBrainExport
} from "./PulseGPUBrain.js";

import {
  PulseGPURuntime
} from "./PulseGPURuntime.js";

import {
  PulseGPUEngine
} from "./PulseGPUEngine.js";

import { PulseGPUOrchestrator } from "./PulseGPUOrchestrator.js";
import { PulseGPUSettingsMemory } from "./PulseGPUSettingsMemory.js";
import { PulseGPUPerformanceAdvisor } from "./PulseGPUPerformanceAdvisor.js";
import { PulseGPUSettingsRestorer } from "./PulseGPUSettingsRestorer.js";
import { PulseGPUSessionTracer } from "./PulseGPUSessionTracer.js";
import { PulseGPUInsightsEngine } from "./PulseGPUInsightsEngine.js";
import { PulseGPUEventEmitter } from "./PulseGPUEventEmitter.js";
import { PulseGPUUXBridge } from "./PulseGPUUXBridge.js";
import { PulseGPUAutoOptimize } from "./PulseGPUAutoOptimize.js";
import { PulseGPUHealer } from "./PulseGPUHealer.js";

// -------------------------------------------------------------------
// INTERNAL SINGLETONS (GPU OS CORE)
// -------------------------------------------------------------------

const gpuRuntime = new PulseGPURuntime();

// Engine is assumed to consume the runtime; if your constructor differs,
// adjust this wiring to match PulseGPUEngine’s actual signature.
const gpuEngine = new PulseGPUEngine(gpuRuntime);

// Orchestrator owns its own memory/advisor/etc internally.
const gpuOrchestrator = new PulseGPUOrchestrator();

// Minimal OS-facing state snapshot (not a source of truth, just a view)
const gpuState = {
  layer: "PulseGPU",
  version: 1,
  ready: false,
  brainReady: false,
  runtimeReady: false,
  engineReady: false,
  lastError: null,
  metrics: {
    framesRendered: 0,
    gpuLoad: null,
    cpuLoad: null,
    smoothness: null,
    memoryMB: null
  }
};

// -------------------------------------------------------------------
// INTERNAL HELPERS
// -------------------------------------------------------------------

function updateReadyFlags() {
  const ctx = gpuRuntime.getGPUContext();
  gpuState.runtimeReady = !!ctx?.ready;
  gpuState.engineReady = !!gpuEngine;
  gpuState.brainReady = !!PulseGPUBrainExport;
  gpuState.ready =
    gpuState.runtimeReady &&
    gpuState.engineReady &&
    gpuState.brainReady;
}

function safeSetError(err) {
  gpuState.lastError = err ? String(err) : null;
}

// -------------------------------------------------------------------
// PUBLIC OS-FACING API
// -------------------------------------------------------------------

/**
 * Initialize the GPU runtime with a canvas.
 * Fail-open: returns false if GPU is unavailable; no crash.
 */
async function init(canvas) {
  try {
    await gpuRuntime.init(canvas);
    updateReadyFlags();
    return gpuState.ready;
  } catch (err) {
    safeSetError(err);
    updateReadyFlags();
    return false;
  }
}

/**
 * Optional: hook for your render loop.
 * This assumes PulseGPUEngine exposes a render() or tick() method.
 * If your engine API differs, adapt this to match.
 */
function renderFrame(frameContext) {
  if (!gpuState.ready || !gpuEngine || typeof gpuEngine.render !== "function") {
    return;
  }

  try {
    gpuEngine.render(frameContext);
    gpuState.metrics.framesRendered += 1;
  } catch (err) {
    safeSetError(err);
  }
}

/**
 * Lightweight status snapshot for PulseBand / PulseNet / dashboards.
 * This is read-only; callers should not mutate the returned object.
 */
function getStatus() {
  updateReadyFlags();
  return {
    ...gpuState,
    metrics: { ...gpuState.metrics }
  };
}

/**
 * Access to the underlying runtime (for advanced flows).
 */
function getRuntime() {
  return gpuRuntime;
}

/**
 * Access to the underlying engine (for advanced flows).
 */
function getEngine() {
  return gpuEngine;
}

/**
 * Access to the orchestrator (sessions, advice, healing, insights).
 */
function getOrchestrator() {
  return gpuOrchestrator;
}

/**
 * Optional: attach a debug handle to window for inspection.
 * This is explicit so you never get surprise globals.
 */
function attachToWindowDebug() {
  if (typeof window === "undefined") return;
  window.PulseGPU = {
    getStatus,
    getRuntime,
    getEngine,
    getOrchestrator
  };
}

// -------------------------------------------------------------------
// EXPORTS — OS-FACING GPU OBJECT + RAW SUBSYSTEMS
// -------------------------------------------------------------------

const PulseGPU = {
  // High-level OS API
  init,
  renderFrame,
  getStatus,
  getRuntime,
  getEngine,
  getOrchestrator,
  attachToWindowDebug
};

// Default-style unified GPU OS surface
export { PulseGPU };

// Raw building blocks (for direct imports where needed)
export {
  BrainInput,
  PulseGPUBrainExport,
  PulseGPURuntime,
  PulseGPUEngine,
  PulseGPUOrchestrator,
  PulseGPUSettingsMemory,
  PulseGPUPerformanceAdvisor,
  PulseGPUSettingsRestorer,
  PulseGPUSessionTracer,
  PulseGPUInsightsEngine,
  PulseGPUEventEmitter,
  PulseGPUUXBridge,
  PulseGPUAutoOptimize,
  PulseGPUHealer
};
