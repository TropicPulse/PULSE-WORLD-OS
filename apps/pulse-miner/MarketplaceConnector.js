// FILE: tropic-pulse-functions/apps/pulse-miner/MarketplaceConnector.js
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
//   MarketplaceConnector — the PUBLIC API between Pulse Miner and Pulse Proxy.
//   This file exposes a clean interface for:
//     • Fetching the next job from ALL marketplaces (via MarketplaceOrchestrator)
//     • Wrapping marketplace jobs into PulseJobSchema
//     • Submitting completed results back to the correct marketplace
//     • Updating marketplace reputation based on job outcomes
//
//   REAL‑WORLD CONTEXT (for future Aldwyn):
//     • This file does NOT talk directly to any marketplace APIs.
//       That is handled by the individual adapters.
//     • This file does NOT score jobs, select jobs, or ping marketplaces.
//       That is handled by MarketplaceOrchestrator + PulseJobScoring.
//     • This file does NOT do any crypto, token handling, or blockchain work.
//       Even if a marketplace uses a token (Akash = AKT*, Render = RNDR*, Spheron = SPHERON*),
//       Tropic Pulse ONLY reads job metadata and submits results.
//       We do NOT do crypto.
//
//   This file IS:
//     • A clean interface for PulseProxy
//     • A wrapper around MarketplaceOrchestrator
//     • A job normalizer into PulseJobSchema
//     • A reputation updater
//     • A result forwarder
//
//   This file IS NOT:
//     • A marketplace adapter
//     • A scheduler
//     • A compute engine
//     • A job selector
//     • A scoring engine
//     • A blockchain client
//     • A wallet or token handler
//
// DEPLOYMENT:
//   Lives in /apps/pulse-miner as part of the Pulse Miner subsystem.
//   Must run in any JS environment with fetch() available.
//   Must remain ESM-only and side-effect-free.
//
// SYNTAX RULES:
//   ESM JavaScript ONLY — no TypeScript, no CommonJS, no require().
//   Named exports ONLY — no default exports.
//
// IMPORT RULES:
//   Allowed:
//     • MarketplaceOrchestrator.js
//     • MarketplaceReputation.js
//     • PulseJobSchema.js
//     • PulseDeviceProfile.js
//     • RegisteredMarketplaces.js
//     • ResultSubmission.js
//
//   Forbidden:
//     • Direct marketplace API calls
//     • Node.js APIs
//     • Firebase, Stripe, Twilio, or backend modules
//     • DOM manipulation
//
// INTERNAL LOGIC SUMMARY:
//   • fetchJobFromMarketplace():
//       - Gets device profile
//       - Converts to capacity struct
//       - Calls getNextJob() from MarketplaceOrchestrator
//       - Returns a raw marketplace job or null
//
//   • getNextMarketplaceJob(deviceId):
//       - Wraps raw job into PulseJobSchema-like structure
//       - Adds GPU placeholder (until GPU jobs are supported)
//       - Adds assignment + timestamp
//
//   • submitMarketplaceResult(job, result):
//       - Computes reputation signals
//       - Updates marketplace reputation
//       - Forwards result to the correct marketplace via ResultSubmission.js
//
// SAFETY NOTES:
//   • Must NEVER throw unhandled errors
//   • Must ALWAYS validate job objects before wrapping
//   • Must remain deterministic and side-effect-free
//
// ------------------------------------------------------
// MarketplaceConnector — Public API for PulseProxy
// ------------------------------------------------------

import {
  updateMarketplaceReputation,
  computeReputationSignals
} from "./MarketplaceReputation.js";

import { getNextJob } from "./MarketplaceOrchestrator.js";
import { PulseJobSchema } from "./PulseJobSchema.js";
import { getDeviceProfile } from "./PulseDeviceProfile.js";
import { marketplaces } from "./RegisteredMarketplaces.js";
import { sendResultToMarketplace } from "./ResultSubmission.js";

// ------------------------------------------------------
// Fetch a single job from ALL marketplaces
// ------------------------------------------------------
export async function fetchJobFromMarketplace() {
  try {
    const device = getDeviceProfile();

    // TEMP: convert device profile → capacity struct
    // (will be replaced with capability scoring)
    const capacity = {
      cpuAvailable: device.cpuCores ?? 4,
      memoryAvailable: device.memoryMB ?? 8192
    };

    const job = await getNextJob(marketplaces, capacity);
    return job || null;

  } catch (err) {
    console.error("fetchJobFromMarketplace() error:", err);
    return null;
  }
}

// ------------------------------------------------------
// Wrap marketplace job into PulseJobSchema
// ------------------------------------------------------
export async function getNextMarketplaceJob(deviceId) {
  const job = await fetchJobFromMarketplace();
  if (!job) return null;

  return {
    id: job.id,

    payload: {
      type: "marketplace-job",
      data: {
        marketplaceId: job.marketplaceId,
        cpuRequired: job.cpuRequired,
        memoryRequired: job.memoryRequired,
        estimatedSeconds: job.estimatedSeconds
      },
      gpu: {
        workgroupSize: 1,
        iterations: 1,
        shader: "" // placeholder until GPU jobs are supported
      }
    },

    marketplace: job.marketplaceId,
    assignedTo: deviceId,
    timestamp: Date.now()
  };
}

// ------------------------------------------------------
// Submit results back to the marketplace
// ------------------------------------------------------
export async function submitMarketplaceResult(job, result) {
  try {
    // 1. Compute reputation signals from the job result
    const signals = computeReputationSignals({
      latencyMs: result.latencyMs,
      apiErrors: result.apiErrors,
      jobsReturned: result.jobsReturned,
      profitableJobs: result.profitableJobs,
      jobSuccessRate: result.jobSuccessRate,
      avgProfitPerJob: result.avgProfitPerJob
    });

    // 2. Update reputation for this marketplace
    updateMarketplaceReputation(job.marketplaceId, signals);

    // 3. Send result back to the marketplace
    return await sendResultToMarketplace(job, result);

  } catch (err) {
    console.error("submitMarketplaceResult() error:", err);
    return null;
  }
}