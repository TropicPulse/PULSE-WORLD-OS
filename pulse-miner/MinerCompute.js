// pulse-miner/MinerCompute.js
// NEW compute engine for marketplace jobs.
// Safe, deterministic, sandboxed, non-crypto, non-arbitrary execution.

export async function computeWork(job) {
  const start = performance.now();

  const { type, payload } = job;

  let output;

  try {
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
        throw new Error(`Unknown job type: ${type}`);
    }
  } catch (err) {
    return {
      success: false,
      error: err.message,
      durationMs: performance.now() - start
    };
  }

  return {
    success: true,
    output,
    durationMs: performance.now() - start
  };
}

// -------------------------------
// SAFE COMPUTE MODULES
// -------------------------------

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
    case "avg": return values.reduce((a, b) => a + b, 0) / values.length;
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
    if (json.hasOwnProperty(key)) {
      out[key] = json[key];
    }
  }
  return out;
}