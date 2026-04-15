// FILE: tropic-pulse-functions/apps/pulse-miner/marketplaces/AkashAdapter.js
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
//   Akash Marketplace Client Adapter — a lightweight ESM module that defines
//   how Tropic Pulse communicates with the Akash decentralized compute network.
//   Implements the standardized marketplace interface: ping(), fetchJobs(),
//   submitResult(), normalizeJob().
//
//   REAL‑WORLD CONTEXT (for future Aldwyn):
//     • Akash Network is a decentralized cloud compute marketplace where
//       providers rent out CPU/GPU/RAM to buyers.
//     • Jobs appear as "leases" on-chain and are priced in AKT*.
//     • AKT* is the native token used for settlement between compute buyers
//       and providers — it is NOT used by Tropic Pulse.
//     • This adapter ONLY reads public lease metadata; no wallets, no mining,
//       no payments, and no blockchain interaction occur on our side.
//     • Payouts to providers occur automatically when a lease completes,
//       based on blockchain finalization.
//
//   This file IS:
//     • A network adapter for Akash Network
//     • A pure ESM client module
//     • A fetch-based HTTP wrapper
//     • A job normalizer (Akash → Pulse format)
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
//       - Measures round-trip latency to Akash RPC endpoint
//       - Returns ms or null on failure
//
//   • fetchJobs(deviceId):
//       - Fetches active Akash leases
//       - Normalizes each lease into Pulse job format
//       - Filters out invalid or zero-payout jobs
//
//   • submitResult(job, result):
//       - Submits completed job results to Akash RPC endpoint
//       - Returns marketplace response or throws on failure
//
//   • normalizeJob(raw):
//       - Converts Akash lease → Pulse job schema
//       - Extracts payout, CPU, memory, duration
//       - Adds GPU score + bandwidth requirements
//
// SAFETY NOTES:
//   • Must NEVER throw unhandled errors — except inside submitResult() where
//     errors are intentionally surfaced for upstream handling.
//   • Must NEVER mutate raw lease objects
//   • Must ALWAYS validate fetch() responses
//   • Must remain deterministic and side-effect-free
//
// ------------------------------------------------------
// Akash Marketplace Client — ping(), fetchJobs(), submitResult(), normalizeJob()
// ------------------------------------------------------

export default {
  id: "akash",
  name: "Akash Network",

  async ping() {
    const url = "https://akash-api.polkachu.com/blocks/latest";
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
      const url = "https://akash-api.polkachu.com/akash/market/v1beta3/leases/list";
      const res = await fetch(url);

      if (!res.ok) return [];

      const data = await res.json();
      if (!data || !Array.isArray(data.leases)) return [];

      return data.leases
        .map(raw => this.normalizeJob(raw))
        .filter(j => j !== null);

    } catch (err) {
      console.error("AkashAdapter.fetchJobs() error:", err);
      return [];
    }
  },

  async submitResult(job, result) {
    try {
      const url = `https://akash-api.polkachu.com/akash/market/v1beta3/leases/${job.id}/submit`;

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ result })
      });

      return await res.json();
    } catch (err) {
      console.error("AkashAdapter.submitResult() error:", err);
      throw err;
    }
  },

  normalizeJob(raw) {
    if (!raw || typeof raw !== "object") return null;
    if (!raw.id) return null;

    const payout = Number(raw.price?.amount ?? 0);
    if (payout <= 0) return null;

    const cpuRequired = Number(raw.resources?.cpu?.units ?? 1);
    const memoryRequired = Number(raw.resources?.memory?.quantity ?? 1024);
    const estimatedSeconds = Number(raw.duration ?? 600);

    return {
      id: String(raw.id),
      marketplace: "akash",

      payout,
      cpuRequired,
      memoryRequired,
      estimatedSeconds,

      minGpuScore: raw.resources?.gpu ? 300 : 100,
      bandwidthNeededMbps: 5
    };
  }
};