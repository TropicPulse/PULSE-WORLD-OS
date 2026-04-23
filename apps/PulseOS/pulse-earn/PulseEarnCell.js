// ============================================================================
// FILE: tropic-pulse-functions/apps/pulse-earn/PulseEarnCell.js
// LAYER: THE CELL (Deterministic Worker + Safe Compute Participant)
// PULSE EARN — v10.4
// ============================================================================
//
// ROLE (v10.4):
//   THE CELL — Pulse‑Earn’s sandboxed metabolic labor unit.
//   • Receives assigned jobs from the Muscle System (EarnEngine) or PulseSend.
//   • Executes deterministic, rule‑bound compute tasks (cellular metabolism).
//   • Returns safe, structured results (ATP output).
//   • Maintains personal healing metadata (cell health).
//
// WHY “CELL”?:
//   • Operates inside strict biological laws (no mutation, no side effects).
//   • Performs metabolic labor assigned by the organism.
//   • Maintains its own health + cycle history.
//   • Represents a single productive unit in the Pulse‑Earn economy.
//
// PURPOSE (v10.4):
//   • Provide a deterministic, drift‑proof compute engine.
//   • Guarantee safe execution of text/math/data/json operations.
//   • Maintain healing metadata for Earn healers.
//   • Track metabolic cycles + cell health (conceptual only).
//
// CONTRACT (v10.4):
//   • PURE COMPUTE — no AI layers, no translation, no memory model.
//   • READ‑ONLY except for healing metadata.
//   • NO eval(), NO Function(), NO dynamic imports.
//   • NO network access.
//   • NO executing user code.
//   • Deterministic output only.
//   • No timestamps, no randomness, no async.
// ============================================================================

// ------------------------------------------------------------
// CELL CONTEXT METADATA
// ------------------------------------------------------------
const EARN_CELL_CONTEXT = {
  layer: "PulseEarnCell",
  role: "CELL_WORKER",
  purpose: "Execute deterministic, sandboxed compute operations for Earn jobs",
  context: "Safe compute participant + healing metadata (cell health)",
  version: "10.4"
};

// ------------------------------------------------------------
// Healing Metadata — Cell Health Log
// ------------------------------------------------------------
const healingState = {
  lastJobType: null,
  lastError: null,
  lastOutput: null,
  // Add this field to healingState:
  continuanceFallback: false,

  cycleCount: 0,          // metabolic cycles completed
  lastCycleIndex: 0,      // deterministic cycle marker (no timestamps)
  executionState: "idle", // idle | dispatching | executing | returning | error
  // NOTE: This metadata is used by Earn‑Healers to maintain cell health.
  ...EARN_CELL_CONTEXT
};

// ------------------------------------------------------------
// computeWork(job) — Cell performs metabolic labor (synchronous, deterministic)
// ------------------------------------------------------------
export function computeWork(job) {
  healingState.cycleCount++;
  healingState.lastCycleIndex = healingState.cycleCount;
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
    healingState.continuanceFallback = false;

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
      // deterministic pseudo-duration: cycles only, no real time
      durationCycles: healingState.cycleCount,
      ...EARN_CELL_CONTEXT
    };

  } catch (err) {
    healingState.lastError = err.message;
    healingState.executionState = "error";

    return {
      success: false,
      error: err.message,
      durationCycles: healingState.cycleCount,
      ...EARN_CELL_CONTEXT
    };
  }
}

// ------------------------------------------------------------
// SAFE COMPUTE MODULES — Cell Skillset
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
    case "sum":
      return values.reduce((a, b) => a + b, 0);
    case "avg":
      return values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;
    case "max":
      return values.length ? Math.max(...values) : -Infinity;
    case "min":
      return values.length ? Math.min(...values) : Infinity;
    default:
      throw new Error(`Unknown math operation: ${operation}`);
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
// Export healing metadata — Cell Health Snapshot
// ------------------------------------------------------------
export function getPulseEarnCellHealingState() {
  return { ...healingState };
}
