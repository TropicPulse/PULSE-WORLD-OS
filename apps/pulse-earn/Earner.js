// ============================================================================
// FILE: tropic-pulse-functions/apps/pulse-earn/Earner.js
// LAYER: EARN-SUBSYSTEM (PURE LOGIC / SAFE COMPUTE ENGINE)
//
// Earner v5.2 — Deterministic, Drift‑Proof, Self‑Healing Compute Engine
// NO AI LAYERS. NO TRANSLATION. NO MEMORY MODEL. PURE HEALING.
// ============================================================================

// ------------------------------------------------------------
// ⭐ OS‑v5 CONTEXT METADATA
// ------------------------------------------------------------
const EARNER_CONTEXT = {
  layer: "Earner",
  role: "EARN_COMPUTE_ENGINE",
  purpose: "Execute deterministic, sandboxed compute operations for Earn jobs",
  context: "Safe compute dispatcher + healing metadata"
};

// ------------------------------------------------------------
// Healing Metadata
// ------------------------------------------------------------
const healingState = {
  lastJobType: null,
  lastError: null,
  lastOutput: null,
  cycleCount: 0,
  lastTimestamp: null,
  executionState: "idle", // idle | dispatching | executing | returning | error
  ...EARNER_CONTEXT
};

// ------------------------------------------------------------
// computeWork(job)
// ------------------------------------------------------------
export async function computeWork(job) {
  const start = performance.now();
  healingState.cycleCount++;
  healingState.lastTimestamp = Date.now();
  healingState.executionState = "dispatching";

  try {
    if (!job || !job.type || !job.payload) {
      healingState.lastError = "invalid_job_structure";
      throw new Error("Invalid job structure");
    }

    const { type, payload } = job;
    healingState.lastJobType = type;

    let output;
    healingState.executionState = "executing";

    switch (type) {
      case "text.transform":
        output = textTransform(payload);
        break;

      case "math.compute":
        output = mathCompute(payload);
        break;

      case "data.aggregate":
        output = dataAggregate(payload);
        break;

      case "json.transform":
        output = jsonTransform(payload);
        break;

      default:
        healingState.lastError = "unknown_job_type";
        throw new Error(`Unknown job type: ${type}`);
    }

    healingState.lastOutput = output;
    healingState.lastError = null;
    healingState.executionState = "returning";

    return {
      success: true,
      output,
      durationMs: performance.now() - start,
      ...EARNER_CONTEXT
    };

  } catch (err) {
    healingState.lastError = err.message;
    healingState.executionState = "error";

    return {
      success: false,
      error: err.message,
      durationMs: performance.now() - start,
      ...EARNER_CONTEXT
    };
  }
}

// ------------------------------------------------------------
// SAFE COMPUTE MODULES
// ------------------------------------------------------------
function textTransform({ text = "", mode = "upper" }) {
  switch (mode) {
    case "upper": return text.toUpperCase();
    case "lower": return text.toLowerCase();
    case "reverse": return text.split("").reverse().join("");
    default: throw new Error(`Unknown text mode: ${mode}`);
  }
}

function mathCompute({ operation, values = [] }) {
  switch (operation) {
    case "sum": return values.reduce((a, b) => a + b, 0);
    case "avg": return values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;
    case "max": return Math.max(...values);
    case "min": return Math.min(...values);
    default: throw new Error(`Unknown math operation: ${operation}`);
  }
}

function dataAggregate({ items = [], field }) {
  if (!field) throw new Error("Missing field for data.aggregate");
  return items.map(item => item[field]);
}

function jsonTransform({ json, pick }) {
  if (!json || typeof json !== "object") {
    throw new Error("Invalid JSON payload");
  }

  if (!pick) return json;

  const out = {};
  for (const key of pick) {
    if (Object.prototype.hasOwnProperty.call(json, key)) {
      out[key] = json[key];
    }
  }
  return out;
}

// ------------------------------------------------------------
// Export healing metadata for EarnHealer
// ------------------------------------------------------------
export function getEarnerHealingState() {
  return { ...healingState };
}
