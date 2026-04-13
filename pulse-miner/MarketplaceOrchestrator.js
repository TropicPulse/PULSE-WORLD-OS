// ======================================================
// MarketplaceOrchestrator.js
// Multi-marketplace job discovery + selection
// ======================================================
//
// This module:
//   • Pings marketplaces
//   • Fetches jobs from healthy ones
//   • Selects the best job for THIS device (CAPABILITY-BASED)
//
// It does NOT:
//   • Wrap jobs into PulseJobSchema
//   • Know about deviceId
//   • Submit results
//   • Talk to PulseProxy or PulseBand
//
// MarketplaceConnector.js handles all of that.
// ======================================================

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