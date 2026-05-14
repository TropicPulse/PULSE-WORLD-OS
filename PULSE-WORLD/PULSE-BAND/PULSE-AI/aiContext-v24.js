// ============================================================================
//  PULSE OS v27‑IMMORTAL++ Presence — COGNITIVE FRAME ORGAN
//  Dual‑Band Context • ABA Anchor • Drift & Diagnostics Surface
//  PURE CONTEXT. ZERO MUTATION. ZERO RANDOMNESS. TOUCH‑ALIGNED.
// ============================================================================


// ============================================================================
//  HELPERS — PRESSURE + BUCKETS
// ============================================================================
function extractBinaryPressure(binaryVitals = {}) {
  if (binaryVitals?.layered?.organism?.pressure != null)
    return binaryVitals.layered.organism.pressure;
  if (binaryVitals?.binary?.pressure != null)
    return binaryVitals.binary.pressure;
  if (typeof binaryVitals.pressure === "number")
    return binaryVitals.pressure;
  return 0;
}

function bucketPressure(v) {
  if (v >= 0.9) return "overload";
  if (v >= 0.7) return "high";
  if (v >= 0.4) return "medium";
  if (v > 0) return "low";
  return "none";
}

// ============================================================================
//  PACKET EMITTER — deterministic, frame‑scoped, Touch‑aligned
// ============================================================================
function emitCognitiveFramePacket(type, payload) {
  const touch = (typeof window !== "undefined" && window.__PULSE_TOUCH__) || {};

  return Object.freeze({
    meta: {
      id: "pulse-touch-cognitive-frame",
      version: touch.version || "v0",
      epoch: touch.epoch || Date.now(),
      layer: "cognitive-frame",
      role: "context-organ",
      band: "binary"
    },
    packetType: `cognitive-frame-${type}`,
    timestamp: Date.now(),
    ...payload
  });
}

// ============================================================================
//  COGNITIVE FRAME PREWARM ENGINE — v27‑IMMORTAL++ Presence
// ============================================================================
export function prewarmCognitiveFrame() {
  try {
    const warmRequest = {
      intent: "prewarm",
      domain: "system",
      action: "init",
      userId: "prewarm-user"
    };

    const warmRouting = {
      personaId: "ARCHITECT",
      persona: { id: "ARCHITECT" },
      permissions: { allow: true },
      boundaries: { mode: "safe" },
      dualBand: true,
      reasoning: ["prewarm"],
      flags: { stable: true }
    };

    const warmOrganism = {
      binary: { throughput: 1, pressure: 0, cost: 0, budget: 1 },
      symbolic: { state: "prewarm" }
    };

    const frame = createCognitiveFrame({
      request: warmRequest,
      routing: warmRouting,
      organismSnapshot: warmOrganism
    });

    frame.flagMismatch?.("test", "expected", "actual");
    frame.flagMissingField?.("missingField");
    frame.flagSlowdown?.("prewarm");
    frame.flagDrift?.("prewarm drift");

    frame.ABA.setStablePoint?.({ snapshot: "prewarm" });
    frame.ABA.resetToStablePoint?.();

    frame.abstraction.updateLevel?.("prewarm");

    frame.repair.next?.();
    frame.repair.next?.();

    frame.window.explainSafe?.("prewarm");

    frame.frustration.soothe?.();

    frame.artery?.({});

    return emitCognitiveFramePacket("prewarm", {
      message: "Cognitive frame prewarmed and context pathways aligned."
    });
  } catch (err) {
    console.error("[CognitiveFrame Prewarm] Failed:", err);
    return emitCognitiveFramePacket("prewarm-error", {
      error: String(err),
      message: "Cognitive frame prewarm failed."
    });
  }
}

// ============================================================================
//  createCognitiveFrame — Self‑Contained Cognitive Context (v27‑IMMORTAL++)
// ============================================================================
export function createCognitiveFrame(options = {}) {
  const { request = {}, routing = {}, organismSnapshot = null } = options;
  const touch = (typeof window !== "undefined" && window.__PULSE_TOUCH__) || {};

  const frameMeta = {
    id: "pulse-touch-cognitive-frame",
    version: touch.version || "v0",
    epoch: touch.epoch || Date.now(),
    layer: "cognitive-frame",
    role: "context-organ",
    band: "binary"
  };

  const context = {
    meta: frameMeta,

    request: Object.freeze({
      intent: request.intent || null,
      domain: request.domain || null,
      action: request.action || null,
      userId: request.userId || null
    }),

    personaId: routing.personaId || null,
    persona: routing.persona || null,
    permissions: routing.permissions || null,
    boundaries: routing.boundaries || null,

    dualBand: routing.dualBand || null,

    organism: organismSnapshot || null,
    binaryVitals: organismSnapshot?.binary || null,
    symbolicState: organismSnapshot?.symbolic || null,

    trace: Array.isArray(routing.reasoning) ? [...routing.reasoning] : [],

    diagnostics: {
      mismatches: [],
      missingFields: [],
      slowdownCauses: [],
      driftEvents: [],
      driftDetected: false
    },

    routing
  };

  // TRACE HELPERS
  context.logStep = function logStep(message) {
    this.trace.push(String(message || ""));
  };

  // DIAGNOSTIC HELPERS
  context.flagMismatch = function (key, expected, actual) {
    this.diagnostics.mismatches.push({ key, expected, actual });
    this.trace.push(`Mismatch: "${key}" expected ${expected}, got ${actual}`);
    this.logStep && this.logStep("diagnostic:mismatch");
  };

  context.flagMissingField = function (key) {
    this.diagnostics.missingFields.push({ key });
    this.trace.push(`Missing field: "${key}"`);
    this.logStep && this.logStep("diagnostic:missingField");
  };

  context.flagSlowdown = function (reason) {
    this.diagnostics.slowdownCauses.push({ reason });
    this.trace.push(`Slowdown cause: ${reason}`);
    this.logStep && this.logStep("diagnostic:slowdown");
  };

  context.flagDrift = function (description) {
    this.diagnostics.driftDetected = true;
    this.diagnostics.driftEvents.push({ description });
    this.trace.push(`Drift detected: ${description}`);
    this.logStep && this.logStep("diagnostic:drift");
  };

  // ABA ANCHOR
  context.ABA = {
    stablePoint: null,

    setStablePoint(snapshot) {
      this.stablePoint = snapshot;
      context.logStep("ABA: stable point updated.");
    },

    resetToStablePoint() {
      if (this.stablePoint) {
        context.logStep("ABA: resetting to stable point.");
        return this.stablePoint;
      }
      context.logStep("ABA: no stable point available.");
      return null;
    }
  };

  // ABSTRACTION TRACKING
  context.abstraction = {
    level: "general",

    updateLevel(userMessage = "") {
      const hasCodeLike = /[{}`;]/.test(userMessage || "");
      this.level = hasCodeLike ? "specific" : "general";
      context.logStep(`Abstraction level set to: ${this.level}`);
    }
  };

  // DRIFT DETECTION + REPAIR
  context.drift = {
    detect(condition, note = "Cognitive drift detected.") {
      if (condition) {
        context.flagDrift(note);
        return true;
      }
      return false;
    },

    repair() {
      context.logStep("Drift repair initiated via ABA.");
      return context.ABA.resetToStablePoint();
    }
  };

  // LAYERED REPAIR REFLEX
  context.repair = {
    attempts: 0,

    next() {
      this.attempts += 1;

      if (this.attempts === 1) {
        return "Let me reset to the last stable point and rebuild that clearly.";
      }

      if (this.attempts === 2) {
        return "We’re still misaligned — anchoring to the last confirmed correct state.";
      }

      return "Let’s fully reset. Tell me the exact point you want me to anchor to.";
    }
  };

  // WINDOW PRINCIPLE
  context.window = {
    explainSafe(topic = "that") {
      return (
        `I can’t go into unsafe or disallowed details about ${topic}, ` +
        `but I can give you the fullest safe, conceptual explanation available.`
      );
    }
  };

  // FRUSTRATION‑AWARE TONE
  context.frustration = {
    soothe() {
      return (
        "I hear the frustration — let’s reset and rebuild this cleanly. " +
        "Tell me the exact angle you want to focus on."
      );
    }
  };

  // OPTIONAL INTENT CONTEXT
  if (request.intentContext) {
    context.intentContext = Object.freeze({ ...request.intentContext });
    context.logStep("Intent handler context attached.");
  }

  // --------------------------------------------------------------------------
  //  COGNITIVE FRAME ARTERY — symbolic-only, deterministic
  // --------------------------------------------------------------------------
  context.artery = function cognitiveFrameArtery({ binaryVitals = {} } = {}) {
    const binaryPressure = extractBinaryPressure(binaryVitals);

    const mismatchCount = this.diagnostics.mismatches.length;
    const missingCount = this.diagnostics.missingFields.length;
    const slowdownCount = this.diagnostics.slowdownCauses.length;
    const drift = this.diagnostics.driftDetected === true;

    const localPressure =
      (mismatchCount ? 0.3 : 0) +
      (missingCount ? 0.2 : 0) +
      (slowdownCount ? 0.3 : 0) +
      (drift ? 0.4 : 0);

    const pressure = Math.max(
      0,
      Math.min(1, 0.6 * localPressure + 0.4 * binaryPressure)
    );

    return {
      organism: {
        pressure,
        pressureBucket: bucketPressure(pressure)
      },
      diagnostics: {
        mismatches: mismatchCount,
        missingFields: missingCount,
        slowdown: slowdownCount,
        drift
      }
    };
  };

  const frozen = Object.freeze(context);

  frozen.logStep("frame:created");

  return frozen;
}

export default createCognitiveFrame;

// ============================================================================
//  COMMONJS FALLBACK EXPORTS — v27‑IMMORTAL++
// ============================================================================
if (typeof module !== "undefined") {
  module.exports = {
    createCognitiveFrame,
    default: createCognitiveFrame,
    prewarmCognitiveFrame
  };
}
