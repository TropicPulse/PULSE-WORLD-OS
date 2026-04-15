// FILE: tropic-pulse-functions/apps/pulse-miner/PulseJobSchema.js
//
// INTENT-CHECK: If you paste this while confused or frustrated, gently re-read your INTENT; if I am unsure of intent, I will ask you for the full INTENT paragraph.
// 📘 PAGE INDEX — Source of Truth for This File
//
// This PAGE INDEX defines the identity, purpose, boundaries, and allowed
// behavior of this file. It is the compressed representation of the entire
// page. Keep this updated as the schema evolves.
//
// If AI becomes uncertain or drifts, request: "Rules Design (Trust/Data)"
//
// CONTENTS TO MAINTAIN:
//   • What this file IS
//   • What this file IS NOT
//   • Responsibilities
//   • Exported schema
//   • Internal logic summary
//   • Allowed modifications
//   • Forbidden modifications
//   • Safety constraints
//
// ROLE:
//   PulseJobSchema — the ONE TRUE job format used across the entire Pulse stack.
//   This schema defines the exact shape of a job as it flows through:
//     • PulseMiner (job source + compute engine)
//     • PulseProxy (API router + job distributor)
//     • PulseBand (frontend GPU worker)
//
//   REAL‑WORLD CONTEXT (for future Aldwyn):
//     • ALL marketplace adapters MUST output this shape.
//     • ALL internal job creators MUST output this shape.
//     • ALL compute engines MUST accept this shape.
//     • ALL runtimes MUST expect this shape.
//     • This schema is the backbone of your compute OS.
//     • This file does NOT execute code.
//     • This file does NOT validate jobs.
//     • This file does NOT mutate jobs.
//     • This file does NOT do crypto, mining, or token operations.
//
//   This file IS:
//     • A static contract
//     • A canonical schema
//     • A cross‑system interface definition
//     • A compatibility guarantee
//
//   This file IS NOT:
//     • A compute engine
//     • A validator
//     • A job selector
//     • A marketplace adapter
//     • A runtime
//     • A scheduler
//     • A blockchain client
//     • A wallet or token handler
//
// DEPLOYMENT:
//   Lives in /apps/pulse-miner as part of the Pulse Miner subsystem.
//   Must remain ESM-only and side-effect-free.
//   Must NEVER import anything.
//   Must NEVER export functions.
//   Must NEVER change shape without updating all dependent systems.
//
// SAFETY RULES (CRITICAL):
//   • NO dynamic fields
//   • NO optional structural keys
//   • NO runtime logic
//   • NO environment-specific fields
//   • NO marketplace-specific fields
//   • NO device-specific fields
//
// INTERNAL LOGIC SUMMARY:
//   • Defines the canonical job structure:
//       {
//         id,
//         payload: {
//           type,
//           data,
//           gpu: { workgroupSize, iterations, shader }
//         },
//         marketplace,
//         assignedTo,
//         timestamp
//       }
//
//   • This schema is used by:
//       - MarketplaceConnector
//       - PulseProxy
//       - PulseBand GPU worker
//       - MinerRuntime
//       - MinerEngine
//
//   • This schema MUST remain stable across versions.
//
// ------------------------------------------------------
// PulseJobSchema — Canonical Pulse Job Format
// ------------------------------------------------------

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