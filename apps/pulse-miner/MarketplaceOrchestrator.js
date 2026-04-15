// FILE: tropic-pulse-functions/apps/pulse-miner/MarketplaceOrchestrator.js
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
//   MarketplaceOrchestrator — the compute‑economy router for Pulse Miner.
//   This module is responsible for:
//     • Pinging all marketplaces
//     • Filtering out unhealthy ones
//     • Fetching jobs from healthy marketplaces
//     • Applying marketplace reputation weighting
//     • Selecting the best job for THIS device using capability scoring
//
//   REAL‑WORLD CONTEXT (for future Aldwyn):
//     • This file does NOT talk directly to any marketplace APIs.
//       That is handled by the individual adapters.
//     • This file does NOT wrap jobs into PulseJobSchema.
//       MarketplaceConnector.js handles that.
//     • This file does NOT submit results.
//       ResultSubmission.js handles that.
//     • This file does NOT do any crypto, token handling, or blockchain work.
//       Even if a marketplace uses a token (Akash = AKT*, Render = RNDR*, Spheron = SPHERON*),
//       Tropic Pulse ONLY reads job metadata. We do NOT do crypto.
//
//   This file IS:
//     • A job discovery engine
//     • A marketplace health checker
//     • A job aggregator
//     • A capability-based job selector
//     • A reputation-weighted scoring engine
//
//   This file IS NOT:
//     • A scheduler
//     • A compute engine
//     • A marketplace adapter
//     • A job wrapper
//     • A result submitter
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
//     • PulseJobScoring.js
//     • PulseDeviceProfile.js
//     • MarketplaceReputation.js
//
//   Forbidden:
//     • Direct marketplace API calls
//     • Node.js APIs
//     • Firebase, Stripe, Twilio, or backend modules
//     • DOM manipulation
//
// INTERNAL LOGIC SUMMARY:
//   • discoverHealthyMarketplaces():
//       - Pings all marketplaces
//       - Filters by latency threshold
//
//   • fetchJobsFromMarketplaces():
//       - Fetches jobs from each healthy marketplace
//       - Injects marketplaceId into each job
//
//   • selectBestJob():
//       - Scores each job using capability scoring
//       - Applies marketplace reputation weighting
//       - Returns the highest-scoring job
//
//   • getNextJob():
//       - Full pipeline: ping → fetch → weight → select
//       - Returns the best job or null
//
// SAFETY NOTES:
//   • Must NEVER throw unhandled errors
//   • Must ALWAYS validate job objects
//   • Must remain deterministic and side-effect-free
//
// ------------------------------------------------------
// MarketplaceOrchestrator — Multi-marketplace job discovery + selection
// ------------------------------------------------------

import { scoreJobForDevice } from "./PulseJobScoring.js";
import { getDeviceProfile } from "./PulseDeviceProfile.js";
import { getMarketplaceReputation } from "./MarketplaceReputation.js";

/*
Job = {
  id: string,
  marketplaceId: string,
  payout: number,
  cpuRequired: number,
  memoryRequired: number,
  estimatedSeconds: number
}

MarketplaceClient = {
  id: string,
  name: string,
  ping: async () => number | null,
  fetchJobs: async () => Job[]
}
*/

// -------------------------------
// 1. Ping marketplaces
// -------------------------------
export async function discoverHealthyMarketplaces(marketplaces, maxLatencyMs = 1500) {
  const results = await Promise.all(
    marketplaces.map(async (m) => {
      try {
        const latency = await m.ping();
        return { m, latency };
      } catch {
        return { m, latency: null };
      }
    })
  );

  return results
    .filter(r => r.latency !== null && r.latency <= maxLatencyMs)
    .map(r => r.m);
}

// -------------------------------
// 2. Fetch jobs from healthy marketplaces
// -------------------------------
export async function fetchJobsFromMarketplaces(marketplaces) {
  const allJobsArrays = await Promise.all(
    marketplaces.map(async (m) => {
      try {
        const jobs = await m.fetchJobs();
        return jobs.map(j => ({ ...j, marketplaceId: m.id }));
      } catch {
        return [];
      }
    })
  );

  return allJobsArrays.flat();
}

// -------------------------------
// 3. Select best job (CAPABILITY-BASED)
// -------------------------------
export function selectBestJob(jobs) {
  const device = getDeviceProfile();

  let bestJob = null;
  let bestScore = -Infinity;

  for (const job of jobs) {
    const capabilityScore = scoreJobForDevice(job, device);
    const rep = job.reputationWeight ?? 0.5;

    const finalScore = capabilityScore * (0.5 + rep); // reputation boosts good markets

    if (finalScore > bestScore) {
      bestScore = finalScore;
      bestJob = job;
    }
  }

  return bestJob;
}

// -------------------------------
// 4. Orchestrator: get next job
// -------------------------------
export async function getNextJob(allMarketplaces) {
  const healthy = await discoverHealthyMarketplaces(allMarketplaces);
  if (healthy.length === 0) return null;

  const jobs = await fetchJobsFromMarketplaces(healthy);
  if (jobs.length === 0) return null;

  // Apply marketplace reputation weighting
  const weightedJobs = jobs.map(job => {
    const rep = getMarketplaceReputation(job.marketplaceId);
    return { ...job, reputationWeight: rep };
  });

  // Select best job using capability scoring + reputation
  return selectBestJob(weightedJobs);
}