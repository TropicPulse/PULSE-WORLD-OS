// ============================================================================
// FILE: PULSE-WORLD/PULSE-GPU/PulseGPUSessionTracer-v24.js
//  PULSE GPU SESSION TRACER v24-Immortal++ — THE SENSORY ARCHIVE
//  Afferent Nervous System • Deterministic Perception Layer • Pure Recording
//  GeneticMemory‑v24 + Healer‑v24 + Earn‑v24‑GPU aware
// ============================================================================
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝

export const pulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
// export const PULSE_EARN_IMMUNE_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;
const TRACER_CONTEXT = Identity.pulseLoreContext;
import PulseGPU from "./PulseGPU-v24.js";
import PulseBinaryGPU from "./PulseGPUBinary-v24.js";
import { PulseGPUGeneticMemory } from "./PulseGPUGeneticMemory-v24.js";
import { PulseGPUHealer } from "./PulseGPULymphNodes-v24.js";


// ------------------------------------------------------------
// Utility: clamp helpers
// ------------------------------------------------------------
function clamp(value, min, max) {
  if (typeof value !== "number" || Number.isNaN(value)) return min;
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

function safeBool(v) {
  return v === true;
}

function safeNumber(v, fallback = 0) {
  return typeof v === "number" && !Number.isNaN(v) ? v : fallback;
}

function normalizePresence(presence) {
  if (presence === "idle" || presence === "background") return presence;
  if (presence === "active") return "active";
  return "active";
}

function normalizeInputActivity(inputActivity) {
  if (inputActivity === "high" || inputActivity === "low" || inputActivity === "none") {
    return inputActivity;
  }
  return "none";
}

// ------------------------------------------------------------
// Step normalization — Sensory Input Normalization (v24-Immortal++)
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
    vramUsageMB,

    // v16+ extended telemetry (optional)
    frameTimeAvgMs,
    frameTimeP95Ms,
    frameTimeP99Ms,
    gpuTempC,
    gpuPowerW,
    gpuFanRpm,
    memoryBandwidthGBs,

    // v11/v16 sensory fields
    binaryModeObserved,
    symbolicModeObserved,
    gpuPattern,
    gpuShapeSignature,
    gpuEvolutionStage,
    gpuModeBias,
    gpuDispatchProfile,
    pressureSnapshot,
    factoringSnapshot,

    // v24+ nervous system extras
    prewarmFlag,
    cacheHitFlag,
    advantageTag,
    advantageEpochId,
    nervousSystemChannel,
    presence,
    inputActivity,
    earnHint, // { earnTier, earnBand, maxUtilizationPercent } (optional)
    gpuDispatchHints,
    gpuMemorySnapshot
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

    // v16+ extended telemetry (pure recording)
    frameTimeAvgMs:
      typeof frameTimeAvgMs === "number"
        ? clamp(frameTimeAvgMs, 0, 1000)
        : undefined,
    frameTimeP95Ms:
      typeof frameTimeP95Ms === "number"
        ? clamp(frameTimeP95Ms, 0, 2000)
        : undefined,
    frameTimeP99Ms:
      typeof frameTimeP99Ms === "number"
        ? clamp(frameTimeP99Ms, 0, 5000)
        : undefined,
    gpuTempC:
      typeof gpuTempC === "number"
        ? clamp(gpuTempC, 0, 130)
        : undefined,
    gpuPowerW:
      typeof gpuPowerW === "number"
        ? clamp(gpuPowerW, 0, 1000)
        : undefined,
    gpuFanRpm:
      typeof gpuFanRpm === "number"
        ? clamp(gpuFanRpm, 0, 20000)
        : undefined,
    memoryBandwidthGBs:
      typeof memoryBandwidthGBs === "number"
        ? clamp(memoryBandwidthGBs, 0, 3000)
        : undefined,

    // v11/v16 sensory fields (pure recording)
    binaryModeObserved:
      typeof binaryModeObserved === "boolean" ? binaryModeObserved : false,
    symbolicModeObserved:
      typeof symbolicModeObserved === "boolean" ? symbolicModeObserved : false,

    gpuPattern: gpuPattern || null,
    gpuShapeSignature: gpuShapeSignature || null,
    gpuEvolutionStage: gpuEvolutionStage || null,
    gpuModeBias: gpuModeBias || null,
    gpuDispatchProfile: gpuDispatchProfile || null,

    pressureSnapshot:
      pressureSnapshot && typeof pressureSnapshot === "object"
        ? { ...pressureSnapshot }
        : null,

    factoringSnapshot:
      factoringSnapshot && typeof factoringSnapshot === "object"
        ? { ...factoringSnapshot }
        : null,

    // v24+ nervous system extras
    prewarmFlag: safeBool(prewarmFlag),
    cacheHitFlag: safeBool(cacheHitFlag),
    advantageTag: advantageTag || null,
    advantageEpochId: advantageEpochId || TRACER_CONTEXT.advantageEpochId,
    nervousSystemChannel: nervousSystemChannel || "default",
    presence: normalizePresence(presence),
    inputActivity: normalizeInputActivity(inputActivity),
    earnHint:
      earnHint && typeof earnHint === "object"
        ? {
            earnTier: earnHint.earnTier || null,
            earnBand: earnHint.earnBand || null,
            maxUtilizationPercent:
              typeof earnHint.maxUtilizationPercent === "number"
                ? clamp(earnHint.maxUtilizationPercent, 0, 100)
                : null
          }
        : null,
    gpuDispatchHints:
      gpuDispatchHints && typeof gpuDispatchHints === "object"
        ? { ...gpuDispatchHints }
        : null,
    gpuMemorySnapshot:
      gpuMemorySnapshot && typeof gpuMemorySnapshot === "object"
        ? { ...gpuMemorySnapshot }
        : null,

    meta: { ...TRACER_CONTEXT }
  };
}

// ------------------------------------------------------------
// SessionTrace — Sensory Recording Unit (v24-Immortal++)
// ------------------------------------------------------------
class SessionTrace {
  constructor({
    sessionId,
    gameProfile,
    hardwareProfile,
    tierProfile,
    gpuContext
  }) {
    this.sessionId = String(sessionId || "unknown-session");
    this.gameProfile = gameProfile || {};
    this.hardwareProfile = hardwareProfile || {};
    this.tierProfile = tierProfile || {};

    // v24-Immortal++: session-level GPU context snapshot
    this.gpuContext = gpuContext || null;

    this.steps = [];
    this.meta = { ...TRACER_CONTEXT };
  }

  addStep(step) {
    const normalized = normalizeStep(step);
    this.steps.push(normalized);
  }

  // v24-Immortal++: full advantage snapshot summary for GeneticMemory / Healer
  getSummary() {
    let totalDuration = 0;
    let totalWarnings = 0;
    let totalErrors = 0;
    let totalStutters = 0;
    let binarySteps = 0;
    let symbolicSteps = 0;
    let prewarmSteps = 0;
    let cacheHitSteps = 0;

    let minFrameTimeMs = null;
    let sumFrameTimeMs = 0;
    let frameSampleCount = 0;

    let pressureAgg = {
      gpu: 0,
      thermal: 0,
      memory: 0,
      mesh: 0,
      aura: 0
    };
    let pressureCount = 0;

    const presenceCounts = {
      active: 0,
      idle: 0,
      background: 0
    };

    const inputActivityCounts = {
      high: 0,
      low: 0,
      none: 0
    };

    this.steps.forEach((s) => {
      const step = s || {};

      totalDuration += safeNumber(step.durationMs, 0);
      totalWarnings += safeNumber(step.warnings, 0);
      totalErrors += safeNumber(step.errors, 0);
      totalStutters += safeNumber(step.stutters, 0);

      if (step.binaryModeObserved) binarySteps += 1;
      if (step.symbolicModeObserved) symbolicSteps += 1;
      if (step.prewarmFlag) prewarmSteps += 1;
      if (step.cacheHitFlag) cacheHitSteps += 1;

      if (typeof step.frameTimeAvgMs === "number") {
        const ft = clamp(step.frameTimeAvgMs, 0, 1000);
        sumFrameTimeMs += ft;
        frameSampleCount += 1;
        if (minFrameTimeMs === null || ft < minFrameTimeMs) {
          minFrameTimeMs = ft;
        }
      }

      if (step.pressureSnapshot && typeof step.pressureSnapshot === "object") {
        const p = step.pressureSnapshot;
        pressureAgg.gpu += safeNumber(p.gpuLoadPressure, 0);
        pressureAgg.thermal += safeNumber(p.thermalPressure, 0);
        pressureAgg.memory += safeNumber(p.memoryPressure, 0);
        pressureAgg.mesh += safeNumber(p.meshStormPressure, 0);
        pressureAgg.aura += safeNumber(p.auraTension, 0);
        pressureCount += 1;
      }

      const presence = normalizePresence(step.presence);
      if (presence === "active") presenceCounts.active += 1;
      else if (presence === "idle") presenceCounts.idle += 1;
      else if (presence === "background") presenceCounts.background += 1;

      const ia = normalizeInputActivity(step.inputActivity);
      if (ia === "high") inputActivityCounts.high += 1;
      else if (ia === "low") inputActivityCounts.low += 1;
      else inputActivityCounts.none += 1;
    });

    const avgFrameTimeMs =
      frameSampleCount > 0 ? sumFrameTimeMs / frameSampleCount : 0;
    const avgFps = avgFrameTimeMs > 0 ? 1000 / avgFrameTimeMs : 0;
    const minFps =
      minFrameTimeMs && minFrameTimeMs > 0 ? 1000 / minFrameTimeMs : 0;

    const pressureVector =
      pressureCount > 0
        ? {
            gpu: pressureAgg.gpu / pressureCount,
            thermal: pressureAgg.thermal / pressureCount,
            memory: pressureAgg.memory / pressureCount,
            mesh: pressureAgg.mesh / pressureCount,
            aura: pressureAgg.aura / pressureCount
          }
        : null;

    const advantageSnapshot = {
      epochId: TRACER_CONTEXT.advantageEpochId,
      sessionId: this.sessionId,
      sampleCount: this.steps.length,
      avgFps,
      minFps,
      totalDurationMs: totalDuration,
      pressureVector,
      binaryStepCount: binarySteps,
      symbolicStepCount: symbolicSteps,
      prewarmStepCount: prewarmSteps,
      cacheHitStepCount: cacheHitSteps
    };

    return {
      sessionId: this.sessionId,
      totalDurationMs: totalDuration,
      totalWarnings,
      totalErrors,
      totalStutters,
      stepCount: this.steps.length,

      // v24-Immortal++: mode + advantage counts
      binaryStepCount: binarySteps,
      symbolicStepCount: symbolicSteps,
      prewarmStepCount: prewarmSteps,
      cacheHitStepCount: cacheHitSteps,

      // presence + input activity aggregates
      presenceCounts,
      inputActivityCounts,

      // session-level GPU context
      gpuContext: this.gpuContext,

      // v24-Immortal++: advantage snapshot for GeneticMemory / Healer / Advisor
      advantageSnapshot,
      pressureVector,

      meta: { ...TRACER_CONTEXT }
    };
  }

  // v24-Immortal++: build GeneticMemory observation payload
  toGeneticMemoryObservation() {
    const summary = this.getSummary();

    const metrics = {
      avgFps: summary.advantageSnapshot.avgFps,
      minFps: summary.advantageSnapshot.minFps,
      stutters: summary.totalStutters,
      crashFlag: summary.totalErrors > 0
    };

    const executionContext = {
      binaryMode:
        summary.binaryStepCount > summary.symbolicStepCount
          ? "binary"
          : "symbolic",
      pipelineId: this.gpuContext?.pipelineId || "",
      sceneType: this.gpuContext?.sceneType || "",
      workloadClass: this.gpuContext?.workloadClass || "",
      resolution: this.gpuContext?.resolution || "",
      refreshRate: this.gpuContext?.refreshRate || 0,
      dispatchSignature: this.gpuContext?.gpuDispatchSignature || "",
      shapeSignature: this.gpuContext?.gpuShapeSignature || "",
      qualityPreset: this.gpuContext?.qualityPreset || "",
      rayTracing: !!this.gpuContext?.rayTracing,
      presence:
        summary.presenceCounts.active >=
        summary.presenceCounts.idle +
          summary.presenceCounts.background
          ? "active"
          : "background",
      inputActivity:
        summary.inputActivityCounts.high > 0
          ? "high"
          : summary.inputActivityCounts.low > 0
          ? "low"
          : "none",
      band: this.gpuContext?.bandHint || null,
      earnBand: this.gpuContext?.earnBand || null
    };

    return {
      gameProfile: this.gameProfile,
      hardwareProfile: this.hardwareProfile,
      tierProfile: this.tierProfile,
      executionContext,
      metrics,
      traceSummary: {
        totalDurationMs: summary.totalDurationMs,
        pressureSnapshot: summary.pressureVector,
        binaryStepCount: summary.binaryStepCount,
        symbolicStepCount: summary.symbolicStepCount,
        presenceCounts: summary.presenceCounts,
        inputActivityCounts: summary.inputActivityCounts
      },
      advantageSnapshot: summary.advantageSnapshot,
      computerIntelligence: this.gpuContext?.computerIntelligence || null
    };
  }
}

// ------------------------------------------------------------
// PulseGPUSessionTracer — Sensory Archive Controller (v24-Immortal++)
// ------------------------------------------------------------
class PulseGPUSessionTracer {
  constructor({
    geneticMemory,
    healer
  } = {}) {
    this.sessions = new Map();
    this.meta = { ...TRACER_CONTEXT };

    this.geneticMemory =
      geneticMemory || new PulseGPUGeneticMemory();
    this.healer = healer || new PulseGPUHealer();
  }

  startSession({
    sessionId,
    gameProfile,
    hardwareProfile,
    tierProfile,
    gpuContext
  }) {
    const id = String(sessionId || "unknown-session");

    const trace = new SessionTrace({
      sessionId: id,
      gameProfile: gameProfile || {},
      hardwareProfile: hardwareProfile || {},
      tierProfile: tierProfile || {},
      gpuContext: gpuContext || null
    });

    this.sessions.set(id, trace);
    return trace;
  }

  recordStep(sessionId, step) {
    const id = String(sessionId || "unknown-session");
    const trace = this.sessions.get(id);

    if (!trace) return null;

    trace.addStep(step || {});
    return trace;
  }

  // v24-Immortal++: end session + push into GeneticMemory + Healer
  endSession(sessionId) {
    const id = String(sessionId || "unknown-session");
    const trace = this.sessions.get(id);

    if (!trace) return null;

    this.sessions.delete(id);

    const summary = trace.getSummary();
    const gmObservation = trace.toGeneticMemoryObservation();

    let geneticEntry = null;
    try {
      geneticEntry = this.geneticMemory.recordObservation(gmObservation);
    } catch {
      geneticEntry = null;
    }

    let healingReport = null;
    try {
      healingReport = this.healer.healSessionFlow({
        advisorResult: null,
        restorePlan: null,
        autoDecision: null,
        notifications: [],
        context: {
          gameProfile: gmObservation.gameProfile,
          hardwareProfile: gmObservation.hardwareProfile,
          tierProfile: gmObservation.tierProfile,
          settings: null,
          metrics: gmObservation.metrics,
          userPreferences: null,
          gpuContext: summary.gpuContext,
          advantageSnapshot: summary.advantageSnapshot,
          prewarmState: null
        }
      });
    } catch {
      healingReport = null;
    }

    return {
      trace,
      summary,
      geneticEntry,
      healingReport
    };
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
  normalizeStep,
  TRACER_CONTEXT
};
