// ============================================================================
// FILE: tropic-pulse-functions/apps/pulse-earn/PulseEarnCell-v11-Evo.js
// LAYER: THE CELL (Deterministic Worker + Safe Compute Participant)
// ============================================================================
//
// ROLE (v11-Evo):
//   THE CELL — Pulse‑Earn’s sandboxed metabolic labor unit.
//   • Executes deterministic, rule‑bound compute tasks (cellular metabolism).
//   • Returns safe, structured results (ATP output).
//   • Maintains personal healing metadata (cell health).
//   • Emits v11‑Evo metabolic signatures.
//
// PURPOSE (v11-Evo):
//   • Provide a deterministic, drift‑proof compute engine.
//   • Guarantee safe execution of text/math/data/json operations.
//   • Maintain healing metadata for Earn healers.
//   • Track metabolic cycles + cell health (conceptual only).
//
// CONTRACT (v11-Evo):
//   • PURE COMPUTE — no AI layers, no translation, no memory model.
//   • READ‑ONLY except for healing metadata.
//   • NO eval(), NO Function(), NO dynamic imports.
//   • NO network access.
//   • NO executing user code.
//   • Deterministic output only.
//   • No timestamps, no randomness, no async.
// ============================================================================


// ============================================================================
// CELL CONTEXT METADATA (v11-Evo)
// ============================================================================
const EARN_CELL_CONTEXT = {
  layer: "PulseEarnCell-v11-Evo",
  role: "CELL_WORKER",
  purpose: "Execute deterministic, sandboxed compute operations for Earn jobs",
  context: "Safe compute participant + healing metadata (cell health)",
  version: "11-Evo"
};


// ============================================================================
// Healing Metadata — Cell Health Log (v11-Evo)
// ============================================================================
const healingState = {
  lastJobType: null,
  lastError: null,
  lastOutput: null,
  continuanceFallback: false,

  cycleCount: 0,
  lastCycleIndex: 0,
  executionState: "idle", // idle | dispatching | executing | returning | error

  lastCellSignature: null,
  lastJobSignature: null,
  lastOutputSignature: null,

  ...EARN_CELL_CONTEXT
};


// ============================================================================
// Deterministic Hash Helper — v11-Evo
// ============================================================================
function computeHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `h${h}`;
}


// ============================================================================
// Signature Builders — v11-Evo
// ============================================================================
function buildCellSignature(cycle) {
  return computeHash(`CELL::${cycle}`);
}

function buildJobSignature(type) {
  return computeHash(`JOBTYPE::${type}`);
}

function buildOutputSignature(output) {
  return computeHash(`OUTPUT::${JSON.stringify(output).length}`);
}


// ============================================================================
// computeWork(job) — Deterministic Metabolic Labor
// ============================================================================
export function computeWork(job) {
  healingState.cycleCount++;
  healingState.lastCycleIndex = healingState.cycleCount;
  healingState.executionState = "dispatching";

  try {
    if (!job || !job.type || !job.payload) {
      healingState.lastError = "invalid_job_structure";
      healingState.executionState = "error";

      return {
        success: false,
        error: "Invalid job structure",
        durationCycles: healingState.cycleCount,
        ...EARN_CELL_CONTEXT
      };
    }

    const { type, payload } = job;
    healingState.lastJobType = type;
    healingState.lastJobSignature = buildJobSignature(type);

    healingState.executionState = "executing";
    healingState.continuanceFallback = false;

    let output;

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
        healingState.executionState = "error";

        return {
          success: false,
          error: `Unknown job type: ${type}`,
          durationCycles: healingState.cycleCount,
          ...EARN_CELL_CONTEXT
        };
    }

    healingState.lastOutput = output;
    healingState.lastOutputSignature = buildOutputSignature(output);
    healingState.lastError = null;
    healingState.executionState = "returning";

    healingState.lastCellSignature = buildCellSignature(healingState.cycleCount);

    return {
      success: true,
      output,
      durationCycles: healingState.cycleCount,
      cellSignature: healingState.lastCellSignature,
      ...EARN_CELL_CONTEXT
    };

  } catch (err) {
    healingState.lastError = err.message;
    healingState.executionState = "error";

    healingState.lastCellSignature = buildCellSignature(healingState.cycleCount);

    return {
      success: false,
      error: err.message,
      durationCycles: healingState.cycleCount,
      cellSignature: healingState.lastCellSignature,
      ...EARN_CELL_CONTEXT
    };
  }
}


// ============================================================================
// SAFE COMPUTE MODULES — Deterministic Cell Skillset
// ============================================================================
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
    case "max": return values.length ? Math.max(...values) : -Infinity;
    case "min": return values.length ? Math.min(...values) : Infinity;
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


// ============================================================================
// Export healing metadata — Cell Health Snapshot (v11-Evo)
// ============================================================================
export function getPulseEarnCellHealingState() {
  return { ...healingState };
}
