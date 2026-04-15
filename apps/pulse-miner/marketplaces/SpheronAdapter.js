// FILE: tropic-pulse-functions/apps/pulse-miner/marketplaces/SpheronAdapter.js
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
// ROLE:
//   Spheron Compute Marketplace Client Adapter — a lightweight ESM module
//   that defines how Tropic Pulse communicates with the Spheron Compute
//   marketplace. Implements the standardized marketplace interface:
//   ping(), fetchJobs(), submitResult(), normalizeJob().
//
//   REAL‑WORLD CONTEXT (for future Aldwyn):
//     • Spheron is a decentralized compute + hosting platform.
//     • It DOES have a token (SPHERON*), used for settlement on their platform.
//     • Tropic Pulse does NOT interact with SPHERON* — this adapter only reads
//       public compute job metadata and submits results.
//     • No wallets, no mining, no payments, and no blockchain interaction occur
//       on our side. We do NOT do crypto.
//
//   This file IS:
//     • A network adapter for Spheron Compute
//     • A pure ESM client module
//     • A fetch-based HTTP wrapper
//     • A job normalizer (Spheron → Pulse format)
//     • A latency tester (ping)
//     • A job retriever (fetchJobs)
//     • A result submitter (submitResult)
//
//   This file IS NOT:
//     • A blockchain client
//     • A wallet or token handler
//     • A crypto miner
//     • A scheduler
//     • A compute engine
//     • A backend service
//     • A business logic module
//
// DEPLOYMENT:
//   Lives in /apps/pulse-miner/marketplaces as part of the Pulse Miner subsystem.
//   Must run in any JS environment with fetch() available.
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
//       - Measures round-trip latency to Spheron API
//       - Returns ms or null on failure
//
//   • fetchJobs(deviceId):
//       - Fetches available Spheron compute jobs
//       - Normalizes each job into Pulse job format
//       - Filters out invalid or zero-payout jobs
//
//   • submitResult(job, result):
//       - Submits completed job results to Spheron
//       - Returns marketplace response or throws on failure
//
//   • normalizeJob(raw):
//       - Converts Spheron job → Pulse job schema
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
// Spheron Compute Marketplace Client
// ------------------------------------------------------

export default {
  id: "spheron",
  name: "Spheron Compute",

  async ping() {
    const url = "https://api-v2.spheron.network/health";
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
      const url = "https://api-v2.spheron.network/compute/jobs";
      const res = await fetch(url);

      if (!res.ok) return [];

      const data = await res.json();
      if (!data || !Array.isArray(data.jobs)) return [];

      return data.jobs
        .map(raw => this.normalizeJob(raw))
        .filter(j => j !== null);

    } catch (err) {
      console.error("SpheronAdapter.fetchJobs() error:", err);
      return [];
    }
  },

  async submitResult(job, result) {
    try {
      const url = `https://api-v2.spheron.network/compute/jobs/${job.id}/submit`;

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ result })
      });

      return await res.json();
    } catch (err) {
      console.error("SpheronAdapter.submitResult() error:", err);
      throw err;
    }
  },

  normalizeJob(raw) {
    if (!raw || typeof raw !== "object") return null;
    if (!raw.id) return null;

    const payout = Number(raw.payout ?? raw.price ?? 0);
    if (payout <= 0) return null;

    const cpuRequired = Number(raw.cpu ?? 1);
    const memoryRequired = Number(raw.memory ?? 1024);
    const estimatedSeconds = Number(raw.estimatedSeconds ?? 600);

    return {
      id: String(raw.id),
      marketplace: "spheron",

      payout,
      cpuRequired,
      memoryRequired,
      estimatedSeconds,

      minGpuScore: raw.gpu ? 300 : 100,
      bandwidthNeededMbps: 5
    };
  }
};