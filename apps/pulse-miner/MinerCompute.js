// FILE: tropic-pulse-functions/apps/pulse-miner/MinerCompute.js
//
// INTENT-CHECK: If you paste this while confused or frustrated, gently re-read your INTENT; if I am unsure of intent, I will ask you for the full INTENT paragraph.
// 📘 PAGE INDEX — Source of Truth for This File
//
// This PAGE INDEX defines the identity, purpose, boundaries, and allowed
// behavior of this file. It is the compressed representation of the entire
// page. Keep this updated as compute modules evolve.
//
// If AI becomes uncertain or drifts, request: "Rules Design (Trust/Data)"
//
// CONTENTS TO MAINTAIN:
//   • What this file IS
//   • What this file IS NOT
//   • Its responsibilities
//   • Its exported functions
//   • Its internal logic summary
//   • Allowed operations
//   • Forbidden operations
//   • Safety constraints
//
// ROLE:
//   MinerCompute — the deterministic, sandboxed compute engine for marketplace jobs.
//   This module executes ONLY safe, predefined compute operations. It is the
//   final execution layer for all marketplace jobs.
//
//   REAL‑WORLD CONTEXT (for future Aldwyn):
//     • This file does NOT execute arbitrary code.
//     • This file does NOT run user-provided functions.
//     • This file does NOT run GPU shaders (yet).
//     • This file does NOT do crypto, hashing, mining, or token operations.
//     • This file does NOT evaluate JavaScript strings or dynamic code.
//     • This file ONLY performs deterministic, safe, CPU‑bound transforms.
//     • This file is the legal + safety boundary that protects Tropic Pulse.
//
//   This file IS:
//     • A deterministic compute engine
//     • A sandboxed execution layer
//     • A pure function dispatcher
//     • A safe transformation module
//     • A CPU‑only compute system
//
//   This file IS NOT:
//     • A GPU engine
//     • A crypto miner
//     • A blockchain client
//     • A token handler
//     • A scheduler
//     • A marketplace adapter
//     • A job selector
//     • A dynamic code executor
//
// DEPLOYMENT:
//   Lives in /apps/pulse-miner as part of the Pulse Miner subsystem.
//   Must run in any JS environment with performance.now() available.
//   Must remain ESM-only and side-effect-free.
//
// SAFETY RULES (CRITICAL):
//   • NO eval()
//   • NO Function()
//   • NO dynamic imports
//   • NO arbitrary code execution
//   • NO user-provided logic
//   • NO mutation of input job objects
//   • NO non-deterministic behavior
//   • NO network calls
//   • NO filesystem access
//   • NO crypto operations
//
// INTERNAL LOGIC SUMMARY:
//   • computeWork(job):
//       - Dispatches job.type to a safe compute module
//       - Measures execution time
//       - Returns { success, output, durationMs }
//
//   • textTransform():
//       - upper/lower/reverse string transforms
//
//   • mathCompute():
//       - sum/avg/max/min on numeric arrays
//
//   • dataAggregate():
//       - Extracts a field from an array of objects
//
//   • jsonTransform():
//       - Picks keys from a JSON object
//
// ------------------------------------------------------
// MinerCompute — Safe, deterministic compute engine
// ------------------------------------------------------

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