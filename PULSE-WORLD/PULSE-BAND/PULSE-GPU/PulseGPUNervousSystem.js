// ============================================================================
//  PULSE GPU SESSION TRACER v16-Ascendant-Continuum-binary — THE SENSORY ARCHIVE
//  Afferent Nervous System • Deterministic Perception Layer • Pure Recording
// ============================================================================
//
// IDENTITY — THE SENSORY ARCHIVE (v16-Ascendant-Continuum-binary):
//  ---------------------------------------------------------------
//  • The afferent nervous system of the GPU organism.
//  • Records every sensation: duration, warnings, errors, stutters, load.
//  • Records binary/symbolic mode, dispatch lineage, shape signatures.
//  • Records extended v16+ pressure, frame-time, thermal, prewarm, cache hints.
//  • Never judges, never interprets — only perceives and preserves.
//  • The black box of the GPU body.
//  • Raw sensory feed for Insights, Brainstem, Healer, Advisor, GeneticMemory.
//  • Advantage‑cascade aware: inherits all systemic advantages.
//  • PulseSend‑v16‑Ascendant‑ready: sensory traces can be routed by the router.
//  • Earn‑v4‑Presence‑ready.
//
// SAFETY CONTRACT (v16-Ascendant-Continuum-binary):
//  -----------------------------------------------
//  • No randomness
//  • No timestamps
//  • No GPU calls
//  • No DOM
//  • No Node APIs
//  • No network or filesystem access
//  • Fail-open: invalid steps → normalized safely
//  • Self-repair-ready: traces include metadata
//  • Deterministic: same steps → same trace
// ============================================================================

/*
AI_EXPERIENCE_META = {
  identity: "PulseGPUNervousSystem",
  version: "v16-Ascendant",
  layer: "gpu_runtime",
  role: "gpu_nervous_system",
  lineage: "PulseGPU-v16",

  evo: {
    gpuConduction: true,
    gpuSignalRouting: true,
    gpuReflexPath: true,

    gpuCompute: true,
    deterministic: true,
    driftProof: true,
    pureCompute: true,

    zeroNetwork: true,
    zeroFilesystem: true,
    zeroMutationOfInput: true
  },

  contract: {
    always: [
      "PulseGPUSpine",
      "PulseGPUSynapse",
      "PulseGPUDrive"
    ],
    never: [
      "safeRoute",
      "fetchViaCNS",
      "legacyGPUNervousSystem"
    ]
  }
}
*/


// ------------------------------------------------------------
// ⭐ v16-Ascendant CONTEXT METADATA — Sensory Archive Identity
// ------------------------------------------------------------
const TRACER_CONTEXT = {
  layer: "PulseGPUSessionTracer",
  role: "SENSORY_ARCHIVE",
  purpose: "Afferent nervous system — deterministic perception + recording",
  context:
    "Records ordered steps with durations + health signals + GPU mode/dispatch info + v16+ vectors",
  target: "full-gpu+binary",
  selfRepairable: true,
  version: "16-Ascendant-Continuum-binary",

  // v16+ advantage epoch identity
  advantageEpochId: "gpu-v16-ascendant",
  systemAgeBand: "immortal",
  lineage: "PulseGPU-v16-Ascendant",

  evo: {
    advantageCascadeAware: true,
    pulseEfficiencyAware: true,
    driftProof: true,
    multiInstanceReady: true,
    unifiedAdvantageField: true,
    pulseSend16Ready: true,

    // v16-Ascendant awareness
    binaryAware: true,
    symbolicAware: true,
    gpuDispatchAware: true,
    gpuMemoryAware: true,
    gpuAdvantageAware: true,
    dualModeEvolution: true,
    dualBandAware: true,
    organismLoaderAware: true,
    geneticMemoryLink: true,
    healerLink: true,
    lymphNodeLink: true,
    prewarmAware: true,
    cacheAware: true,
    snapshotAware: true,

    routingContract: "PulseSend-v16-Ascendant",
    gpuOrganContract: "PulseGPU-v16-Ascendant",
    binaryGpuOrganContract: "PulseBinaryGPU-v16-Ascendant",
    earnCompatibility: "Earn-v4-Presence",

    // Legacy compatibility (metadata only)
    legacyRoutingContract: "PulseSend-v12",
    legacyGPUOrganContract: "PulseGPU-v12-Continuum",
    legacyEarnCompatibility: "Earn-v3",
    legacyRoutingContractV11: "PulseSend-v11",
    legacyGPUOrganContractV11: "PulseGPU-v11-Evo"
  }
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

function safeBool(v) {
  return v === true;
}

function safeNumber(v, fallback = 0) {
  return typeof v === "number" && !Number.isNaN(v) ? v : fallback;
}


// ------------------------------------------------------------
// Step normalization — Sensory Input Normalization (v16-Ascendant)
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

    // v11-Evo / v12 sensory fields
    binaryModeObserved,
    symbolicModeObserved,
    gpuPattern,
    gpuShapeSignature,
    gpuEvolutionStage,
    gpuModeBias,
    gpuDispatchProfile,
    pressureSnapshot,
    factoringSnapshot,

    // v16+ nervous system extras
    prewarmFlag,
    cacheHitFlag,
    advantageTag,
    advantageEpochId,
    nervousSystemChannel
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

    // v11-Evo-binary sensory fields (pure recording)
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

    // v16+ nervous system extras
    prewarmFlag: safeBool(prewarmFlag),
    cacheHitFlag: safeBool(cacheHitFlag),
    advantageTag: advantageTag || null,
    advantageEpochId: advantageEpochId || TRACER_CONTEXT.advantageEpochId,
    nervousSystemChannel: nervousSystemChannel || "default",

    meta: { ...TRACER_CONTEXT }
  };
}


// ------------------------------------------------------------
// SessionTrace — Sensory Recording Unit (v16-Ascendant-Continuum-binary)
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

    // v16-Ascendant: session-level GPU context snapshot
    this.gpuContext = gpuContext || null;

    this.steps = [];
    this.meta = { ...TRACER_CONTEXT };
  }

  addStep(step) {
    const normalized = normalizeStep(step);
    this.steps.push(normalized);
  }

  // v16-Ascendant: full advantage snapshot summary for GeneticMemory / Healer
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

      // v16-Ascendant: mode + advantage counts
      binaryStepCount: binarySteps,
      symbolicStepCount: symbolicSteps,
      prewarmStepCount: prewarmSteps,
      cacheHitStepCount: cacheHitSteps,

      // session-level GPU context
      gpuContext: this.gpuContext,

      // v16-Ascendant: advantage snapshot for GeneticMemory / Healer / Advisor
      advantageSnapshot,
      pressureVector,

      meta: { ...TRACER_CONTEXT }
    };
  }
}


// ------------------------------------------------------------
// PulseGPUSessionTracer — Sensory Archive Controller (v16-Ascendant)
// ------------------------------------------------------------
class PulseGPUSessionTracer {
  constructor() {
    this.sessions = new Map();
    this.meta = { ...TRACER_CONTEXT };
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
  normalizeStep,
  TRACER_CONTEXT
};
