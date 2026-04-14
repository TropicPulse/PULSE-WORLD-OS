// ======================================================
// MarketplaceConnector.js
// PUBLIC API for PulseProxy
// ======================================================
//
// This file:
//   • Calls MarketplaceOrchestrator to get jobs
//   • Wraps jobs into PulseJobSchema
//   • Submits results back to marketplaces
//
// It does NOT:
//   • Ping marketplaces
//   • Fetch jobs directly
//   • Select jobs
//   • Score jobs
//
// Those live in MarketplaceOrchestrator.js
// ======================================================
import {
  updateMarketplaceReputation,
  computeReputationSignals
} from "./MarketplaceReputation.js";
import { getNextJob } from "./MarketplaceOrchestrator.js";
import { PulseJobSchema } from "./PulseJobSchema.js";
import { getDeviceProfile } from "./PulseDeviceProfile.js";
import { marketplaces } from "./RegisteredMarketplaces.js"; 
import { submitJobResult } from "./ResultSubmission.js";

// ======================================================
// Fetch a single job from ALL marketplaces
// ======================================================
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

// ======================================================
// Wrap marketplace job into PulseJobSchema
// ======================================================
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

// ======================================================
// Submit results back to the marketplace
// ======================================================
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