// ResultSubmission.js
// Sends job results back to the marketplace that issued the job.

export async function submitJobResult(job, result) {
  if (!job || !job.marketplaceId) {
    throw new Error("Job missing marketplaceId");
  }

  const marketplace = marketplaceRegistry[job.marketplaceId];

  if (!marketplace || !marketplace.submitResult) {
    throw new Error(`Marketplace ${job.marketplaceId} does not support result submission`);
  }

  return marketplace.submitResult(job, result);
}

// --------------------------------------
// Marketplace registry (plug-in system)
// --------------------------------------

import { marketplaceA } from "./marketplaceA.js";
import { marketplaceB } from "./marketplaceB.js";
import { marketplaceC } from "./marketplaceC.js";

const marketplaceRegistry = {
  A: marketplaceA,
  B: marketplaceB,
  C: marketplaceC
};