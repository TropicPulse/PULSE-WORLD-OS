// ============================================================================
// FILE: tropic-pulse-functions/apps/pulse-earn/ResultSubmission.js
// LAYER: THE LYMPHATIC HANDSHAKE NODE
// (Finalizer of Jobs + Immune-Safe Dispatch + Certified Marketplace Exchange)
// ============================================================================
//
// ROLE (v7.1+):
//   THE LYMPHATIC HANDSHAKE NODE — Pulse‑Earn’s immune‑safe finalizer.
//   • Validates job + marketplace identity (immune recognition).
//   • Locates the correct marketplace adapter (antigen matching).
//   • Ensures submitResult() exists (immune compatibility).
//   • Performs the final handshake between Earn and the marketplace
//     (lymphatic dispatch).
//   • Records the certified submission outcome (immune memory).
//
// WHY “LYMPHATIC HANDSHAKE NODE”?:
//   • It is the final checkpoint before results leave the organism.
//   • It ensures safe, verified, identity‑correct dispatch.
//   • It prevents misrouting (immune rejection).
//   • It notarizes the exchange for EarnHealer (immune history).
//
// PURPOSE (v7.1+):
//   • Provide deterministic, drift‑proof result submission.
//   • Guarantee safe forwarding to marketplace adapters.
//   • Maintain a certified audit trail for the Immune System (EarnHealer).
//   • Preserve immune lineage + dispatch safety (conceptual only).
//
// CONTRACT (unchanged):
//   • PURE RESULT DISPATCHER — no AI layers, no translation, no memory model.
//   • NO network calls except through adapters.
//   • NO eval(), NO dynamic imports, NO arbitrary code execution.
//   • NEVER mutate job objects.
//   • Deterministic identity verification + dispatch only.
//
// SAFETY (unchanged):
//   • v7.1+ upgrade is COMMENTAL ONLY — NO LOGIC CHANGES.
//   • All behavior remains identical to pre‑v7.1 ResultSubmission.
// ============================================================================

// ---------------------------------------------------------------------------
// Healing Metadata — Lymphatic Dispatch Log
// ---------------------------------------------------------------------------
const healingState = {
  lastJobId: null,           // last immune-recognized job
  lastMarketplaceId: null,   // last antigen source
  lastAdapterUsed: null,     // last lymphatic pathway
  lastError: null,           // immune rejection reason
  lastResponse: null,        // certified dispatch record
  cycleCount: 0,             // lymphatic cycles completed
  lastTimestamp: null,       // last dispatch moment
};

// ---------------------------------------------------------------------------
// submitJobResult — Lymphatic Handshake + Certified Dispatch
// ---------------------------------------------------------------------------
export async function submitJobResult(job, result) {
  const timestamp = Date.now();
  healingState.cycleCount++;
  healingState.lastTimestamp = timestamp;

  try {
    // 1. Identity Verification — Immune Recognition
    if (!job || !job.marketplaceId) {
      healingState.lastError = "missing_marketplaceId";
      healingState.lastJobId = job?.id ?? null;
      healingState.lastMarketplaceId = job?.marketplaceId ?? null;
      throw new Error("Job missing marketplaceId");
    }

    healingState.lastJobId = job.id;
    healingState.lastMarketplaceId = job.marketplaceId;

    // 2. Locate Marketplace Adapter — Antigen Matching
    const adapter = marketplaceRegistry[job.marketplaceId];

    if (!adapter) {
      healingState.lastError = "unknown_marketplace";
      throw new Error(`Unknown marketplace: ${job.marketplaceId}`);
    }

    if (typeof adapter.submitResult !== "function") {
      healingState.lastError = "adapter_missing_submitResult";
      throw new Error(
        `Marketplace ${job.marketplaceId} does not support result submission`
      );
    }

    healingState.lastAdapterUsed = job.marketplaceId;

    // 3. Perform the Handshake — Lymphatic Dispatch
    const response = await adapter.submitResult(job, result);
    healingState.lastResponse = response;
    healingState.lastError = null;

    return response;

  } catch (err) {
    healingState.lastError = err.message;

    const failure = {
      success: false,
      error: err.message,
      jobId: job?.id ?? null,
      marketplaceId: job?.marketplaceId ?? null,
      timestamp,
    };

    healingState.lastResponse = failure;
    return failure;
  }
}

// ---------------------------------------------------------------------------
// Marketplace Registry — Antigen Directory
// ---------------------------------------------------------------------------
import { marketplaceA } from "./marketplaceA.js";
import { marketplaceCustom } from "./marketplaceCustom.js";

const marketplaceRegistry = {
  A: marketplaceA,
  CUSTOM: marketplaceCustom,
};

// ---------------------------------------------------------------------------
// Export Healing Metadata — Lymphatic Dispatch Report
// ---------------------------------------------------------------------------
export function getResultSubmissionHealingState() {
  return { ...healingState };
}
