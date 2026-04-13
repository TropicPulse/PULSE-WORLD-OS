// ======================================================
// Pulse Miner — Job Routing Layer (FINAL)
// ======================================================

import { marketplaces } from "../marketplaces/index.js";

// ------------------------------------------------------
// Get next job from any marketplace
// ------------------------------------------------------
export async function getNextMarketplaceJob(deviceId) {
  for (const adapter of marketplaces) {
    try {
      const jobs = await adapter.fetchJobs(deviceId);

      if (jobs && jobs.length > 0) {
        return jobs[0]; // first available job
      }
    } catch (err) {
      console.error(`Error fetching jobs from ${adapter.id}:`, err);
    }
  }

  return null;
}

// ------------------------------------------------------
// Submit result back to the correct marketplace
// ------------------------------------------------------
export async function submitMarketplaceResult(job, result) {
  if (!job || !job.marketplace) {
    throw new Error("Job missing marketplace identifier");
  }

  const marketplaceId = job.marketplace.toLowerCase();

  const adapter = marketplaces.find(m => m.id === marketplaceId);

  if (!adapter) {
    throw new Error(`Unknown marketplace: ${marketplaceId}`);
  }

  try {
    return await adapter.submitResult(job, result);
  } catch (err) {
    console.error(`submitMarketplaceResult error for ${marketplaceId}:`, err);
    throw err;
  }
}