// FILE: tropic-pulse-functions/apps/pulse-miner/marketplaces/FluidStackAdapter.js
//
// INTENT-CHECK: If you paste this while confused or frustrated, gently re-read your INTENT; if I am unsure of intent, I will ask you for the full INTENT paragraph.
// 📘 PAGE INDEX — Source of Truth for This File
//
// This PAGE INDEX defines the identity, purpose, boundaries, and allowed
// behavior of this file. It is the compressed representation of the entire
// page. Keep this updated as functions, responsibilities, and logic evolve.
//
// If AI becomes uncertain or drifts, request: "Rules Design (Trust/Data)"
//
// CONTENTS TO MAINTAIN:
//   • What this file IS
//   • What this file IS NOT
//   • Its responsibilities
//   • Its exported functions
//   • Its internal logic summary
//   • Allowed imports
//   • Forbidden imports
//   • Deployment rules
//   • Safety constraints
//
// The PAGE INDEX + SUB‑COMMENTS allow full reconstruction of the file
// without needing to paste the entire codebase. Keep summaries accurate.
// The comments are the source of truth — if code and comments disagree,
// the comments win.
//
// ROLE:
//   FluidStack Marketplace Client Adapter — a lightweight ESM module that
//   defines how Tropic Pulse communicates with the FluidStack compute marketplace.
//   Implements the standardized marketplace interface: ping(), fetchJobs(),
//   submitResult(), normalizeJob().
//
//   REAL‑WORLD CONTEXT (for future Aldwyn):
//     • FluidStack is a centralized GPU/CPU compute marketplace used for
//       cloud rendering, AI workloads, and general compute.
//     • It does NOT use any token or blockchain — payouts are fiat-based
//       through their platform (no crypto layer, no token reference).
//     • This adapter ONLY reads job listings and submits results; no payments,
//       no identity verification, and no financial interaction occur on our side.
//
//   This file IS:
//     • A network adapter for FluidStack
//     • A pure ESM client module
//     • A fetch-based HTTP wrapper
//     • A job normalizer (FluidStack → Pulse format)
//     • A latency tester (ping)
//     • A job retriever (fetchJobs)
//     • A result submitter (submitResult)
//
//   This file IS NOT:
//     • A payment handler
//     • A blockchain client
//     • A wallet or token manager
//     • A scheduler
//     • A compute engine
//     • A backend service
//     • A business logic module
//
// DEPLOYMENT:
//   Lives in /apps/pulse-miner/marketplaces as part of the Pulse Miner subsystem.
//   Must run in any JS environment with fetch() available (browser or server).
//   Must remain ESM-only and side-effect-free.
//
// SYNTAX RULES:
//   ESM JavaScript ONLY — no TypeScript, no CommonJS, no require().
//   Named exports ONLY — no default exports.
//
// IMPORT RULES:
//   Allowed:
//     • None (this file is intentionally dependency-free)
//
//   Forbidden:
//     • Node.js APIs
//     • Firebase, Stripe, Twilio, or any backend modules
//     • DOM manipulation
//     • Any environment-specific dependencies
//
// INTERNAL LOGIC SUMMARY:
//   • ping():
//       - Measures round-trip latency to FluidStack API
//       - Returns ms or null on failure
//
//   • fetchJobs(deviceId):
//       - Fetches available FluidStack jobs
//       - Normalizes each job into Pulse job format
//       - Filters out invalid or zero-payout jobs
//
//   • submitResult(job, result):
//       - Submits completed job results to FluidStack
//       - Returns marketplace response or throws on failure
//
//   • normalizeJob(raw):
//       - Converts FluidStack job → Pulse job schema
//       - Extracts payout, CPU, memory, duration
//       - Adds GPU score + bandwidth requirements
//
// SAFETY NOTES:
//   • Must NEVER throw unhandled errors — except inside submitResult() where
//     errors are intentionally surfaced for upstream handling.
//   • Must NEVER mutate raw job objects
//   • Must ALWAYS validate fetch() responses
//   • Must remain deterministic and side-effect-free
//
// ------------------------------------------------------
// FluidStack Marketplace Client — ping(), fetchJobs(), submitResult(), normalizeJob()
// ------------------------------------------------------

export default {
  id: "fluidstack",
  name: "FluidStack",

  async ping() {
    const url = "https://api.fluidstack.io/ping";
    const start = Date.now();

    try {
      const res = await fetch(url);
      if (!res.ok) return null;
      return Date.now() - start;
    } catch {
      return null;
    }
  },

  async fetchJobs(deviceId) {
    try {
      const url = "https://api.fluidstack.io/jobs";
      const res = await fetch(url);

      if (!res.ok) return [];

      const data = await res.json();
      if (!data || !Array.isArray(data.jobs)) return [];

      return data.jobs
        .map(raw => this.normalizeJob(raw))
        .filter(j => j !== null);

    } catch (err) {
      console.error("FluidStackAdapter.fetchJobs() error:", err);
      return [];
    }
  },

  async submitResult(job, result) {
    try {
      const url = `https://api.fluidstack.io/jobs/${job.id}/submit`;

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ result })
      });

      return await res.json();
    } catch (err) {
      console.error("FluidStackAdapter.submitResult() error:", err);
      throw err;
    }
  },

  normalizeJob(raw) {
    if (!raw || typeof raw !== "object") return null;
    if (!raw.id) return null;

    const payout = Number(raw.payout ?? raw.price ?? 0);
    if (payout <= 0) return null;

    const cpuRequired = Number(raw.cpu ?? 2);
    const memoryRequired = Number(raw.memory ?? 2048);
    const estimatedSeconds = Number(raw.estimatedSeconds ?? 1200);

    return {
      id: String(raw.id),
      marketplace: "fluidstack",

      payout,
      cpuRequired,
      memoryRequired,
      estimatedSeconds,

      minGpuScore: raw.gpuRequired ? 500 : 150,
      bandwidthNeededMbps: raw.dataSizeMB ? raw.dataSizeMB / 20 : 5
    };
  }
};