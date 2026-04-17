// ============================================================================
// FILE: tropic-pulse-functions/apps/pulse-gpu/PulseGPUSessionTracer.js
// LAYER: GPU-SUBSYSTEM (PURE LOGIC / SESSION TRACING)
//
// PulseGPUSessionTracer v5 — Deterministic, Pure-Logic Session Tracer
// NO GPU. NO DOM. NO NODE. NO NETWORK. PURE HEALING + REPLAY.
// ============================================================================

// ------------------------------------------------------------
// ⭐ OS‑v5 CONTEXT METADATA
// ------------------------------------------------------------
const TRACER_CONTEXT = {
  layer: "PulseGPUSessionTracer",
  role: "GPU_SESSION_TRACER",
  purpose: "Deterministic GPU/game session tracing",
  context: "Records ordered steps with durations + health signals",
  target: "full-gpu",
  selfRepairable: true,
  version: 5
};

// ------------------------------------------------------------
// Utility: clamp helpers
// ------------------------------------------------------------
function clamp(value, min, max) {
  if (typeof value !== "number" || Number.isNaN(value)) return min;
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

// ------------------------------------------------------------
// Step normalization (v5-ready + OS‑v5 metadata)
// ------------------------------------------------------------
function normalizeStep(step = {}) {
  const {
    stepId = "unknown-step",
    label = "",
    durationMs = 0,
    warnings = 0,
    errors = 0,
    stutters = 0,
    gpuLoad,
    cpuLoad,
    vramUsageMB
  } = step;

  return {
    stepId: String(stepId),
    label: label ? String(label) : "",
    durationMs: clamp(durationMs, 0, 60 * 60 * 1000),
    warnings: clamp(warnings, 0, 100000),
    errors: clamp(errors, 0, 100000),
    stutters: clamp(stutters, 0, 100000),

    gpuLoad:
      typeof gpuLoad === "number" ? clamp(gpuLoad, 0, 100) : undefined,
    cpuLoad:
      typeof cpuLoad === "number" ? clamp(cpuLoad, 0, 100) : undefined,
    vramUsageMB:
      typeof vramUsageMB === "number"
        ? clamp(vramUsageMB, 0, 4_000_000)
        : undefined,

    // ⭐ OS‑v5 metadata
    meta: {
      ...TRACER_CONTEXT
    }
  };
}

// ------------------------------------------------------------
// SessionTrace model (v5-ready + OS‑v5 metadata)
// ------------------------------------------------------------
class SessionTrace {
  constructor({ sessionId, gameProfile, hardwareProfile, tierProfile }) {
    this.sessionId = String(sessionId || "unknown-session");
    this.gameProfile = gameProfile || {};
    this.hardwareProfile = hardwareProfile || {};
    this.tierProfile = tierProfile || {};
    this.steps = [];

    // ⭐ OS‑v5 metadata
    this.meta = {
      ...TRACER_CONTEXT
    };
  }

  addStep(step) {
    const normalized = normalizeStep(step);
    this.steps.push(normalized);
  }

  getSummary() {
    let totalDuration = 0;
    let totalWarnings = 0;
    let totalErrors = 0;
    let totalStutters = 0;

    this.steps.forEach((s) => {
      totalDuration += s.durationMs;
      totalWarnings += s.warnings;
      totalErrors += s.errors;
      totalStutters += s.stutters;
    });

    return {
      sessionId: this.sessionId,
      totalDurationMs: totalDuration,
      totalWarnings,
      totalErrors,
      totalStutters,
      stepCount: this.steps.length,

      // ⭐ OS‑v5 metadata
      meta: {
        ...TRACER_CONTEXT
      }
    };
  }
}

// ------------------------------------------------------------
// PulseGPUSessionTracer (v5-ready + OS‑v5 metadata)
// ------------------------------------------------------------
class PulseGPUSessionTracer {
  constructor() {
    this.sessions = new Map();

    // ⭐ OS‑v5 metadata
    this.meta = {
      ...TRACER_CONTEXT
    };
  }

  startSession({ sessionId, gameProfile, hardwareProfile, tierProfile }) {
    const id = String(sessionId || "unknown-session");

    const trace = new SessionTrace({
      sessionId: id,
      gameProfile: gameProfile || {},
      hardwareProfile: hardwareProfile || {},
      tierProfile: tierProfile || {}
    });

    this.sessions.set(id, trace);
    return trace;
  }

  recordStep(sessionId, step) {
    const id = String(sessionId || "unknown-session");
    const trace = this.sessions.get(id);

    if (!trace) return null; // fail-open

    trace.addStep(step || {});
    return trace;
  }

  endSession(sessionId) {
    const id = String(sessionId || "unknown-session");
    const trace = this.sessions.get(id);

    if (!trace) return null;

    this.sessions.delete(id);
    return trace;
  }

  getSessionTrace(sessionId) {
    const id = String(sessionId || "unknown-session");
    return this.sessions.get(id) || null;
  }

  clearSession(sessionId) {
    const id = String(sessionId || "unknown-session");
    this.sessions.delete(id);
  }

  clearAllSessions() {
    this.sessions.clear();
  }
}

// ------------------------------------------------------------
// EXPORTS
// ------------------------------------------------------------
export {
  PulseGPUSessionTracer,
  SessionTrace,
  normalizeStep
};
