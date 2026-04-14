// ======================================================
// PulseJobSchema.js — Canonical Pulse Job Format
// ======================================================
//
// This file defines the ONE TRUE job shape that flows through:
//
//   • PulseMiner (job source)
//   • PulseProxy (API router)
//   • PulseBand (frontend GPU worker)
//
// ALL job creators + ALL marketplace adapters MUST output this shape.
// ======================================================

export const PulseJobSchema = {
  id: "string", // Unique job ID

  payload: {
    type: "string", // e.g. "gpu-compute", "hash", "matrix", "shader"
    data: "any",    // Raw job data (input buffer, seed, matrix, etc.)

    gpu: {
      workgroupSize: "number", // GPU workgroup size
      iterations: "number",    // How many compute passes
      shader: "string"         // WGSL shader source code
    }
  },

  marketplace: "string", // "internal", "vast", "akash", etc.
  assignedTo: "deviceId", // PulseBand device ID
  timestamp: "number"     // Job assignment time (ms)
};