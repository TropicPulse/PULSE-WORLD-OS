// ============================================================================
// FILE: tropic-pulse-functions/apps/pulse-earn/PulseEarnLymphNodes.js
// LAYER: THE LYMPHATIC HANDSHAKE NODES (v10.4)
// (Finalizer of Jobs + Immune-Safe Dispatch + Certified Marketplace Exchange)
// ============================================================================
//
// ROLE (v10.4):
//   THE LYMPHATIC HANDSHAKE NODES — Pulse‑Earn’s immune‑safe finalizers.
//   • Validate job + marketplace identity (immune recognition).
//   • Locate the correct marketplace receptor (antigen matching).
//   • Ensure submitResult() exists (immune compatibility).
//   • Perform deterministic Earn → Marketplace handshake.
//   • Record certified submission outcome (immune memory).
//
// CONTRACT (v10.4):
//   • PURE RESULT DISPATCHER — no AI layers, no translation, no memory model.
//   • NO async, NO timestamps, NO nondeterministic behavior.
//   • NEVER mutate job objects.
//   • Deterministic identity verification + dispatch only.
// ============================================================================


// ---------------------------------------------------------------------------
// Healing Metadata — Lymphatic Dispatch Log (deterministic)
// ---------------------------------------------------------------------------
const lymphHealing = {
  lastJobId: null,
  lastMarketplaceId: null,
  lastAdapterUsed: null,
  lastError: null,
  lastResponse: null,
  cycleCount: 0,
  lastCycleIndex: null
};

// Deterministic cycle counter
let lymphCycle = 0;


// ---------------------------------------------------------------------------
// submitPulseEarnResult — Deterministic Lymphatic Handshake
// ---------------------------------------------------------------------------
export function submitPulseEarnResult(job, result) {
  lymphCycle++;
  lymphHealing.cycleCount++;
  lymphHealing.lastCycleIndex = lymphCycle;

  try {
    // 1. Identity Verification — Immune Recognition
    if (!job || !job.marketplaceId) {
      lymphHealing.lastError = "missing_marketplaceId";
      lymphHealing.lastJobId = job?.id ?? null;
      lymphHealing.lastMarketplaceId = job?.marketplaceId ?? null;

      const failure = {
        success: false,
        error: "Job missing marketplaceId",
        jobId: job?.id ?? null,
        marketplaceId: job?.marketplaceId ?? null,
        cycleIndex: lymphCycle
      };

      lymphHealing.lastResponse = failure;
      return failure;
    }

    lymphHealing.lastJobId = job.id;
    lymphHealing.lastMarketplaceId = job.marketplaceId;

    // 2. Locate Marketplace Receptor — Antigen Matching
    const adapter = receptorRegistry[job.marketplaceId];

    if (!adapter) {
      lymphHealing.lastError = "unknown_marketplace";

      const failure = {
        success: false,
        error: `Unknown marketplace: ${job.marketplaceId}`,
        jobId: job.id,
        marketplaceId: job.marketplaceId,
        cycleIndex: lymphCycle
      };

      lymphHealing.lastResponse = failure;
      return failure;
    }

    if (typeof adapter.submitResult !== "function") {
      lymphHealing.lastError = "adapter_missing_submitResult";

      const failure = {
        success: false,
        error: `Marketplace ${job.marketplaceId} does not support result submission`,
        jobId: job.id,
        marketplaceId: job.marketplaceId,
        cycleIndex: lymphCycle
      };

      lymphHealing.lastResponse = failure;
      return failure;
    }

    lymphHealing.lastAdapterUsed = job.marketplaceId;

    // 3. Perform the Handshake — Deterministic Dispatch
    const response = adapter.submitResult(job, result);

    lymphHealing.lastResponse = response;
    lymphHealing.lastError = null;

    return response;

  } catch (err) {
    lymphHealing.lastError = err.message;

    const failure = {
      success: false,
      error: err.message,
      jobId: job?.id ?? null,
      marketplaceId: job?.marketplaceId ?? null,
      cycleIndex: lymphCycle
    };

    lymphHealing.lastResponse = failure;
    return failure;
  }
}


// ---------------------------------------------------------------------------
// Marketplace Receptor Registry — Antigen Directory
// ---------------------------------------------------------------------------
import { PulseEarnReceptor } from "./PulseEarnReceptorMkt.js";
import { PulseEarnCustomReceptor } from "./PulseEarnCustomReceptorMkt.js";

const receptorRegistry = {
  A: PulseEarnReceptor,
  CUSTOM: PulseEarnCustomReceptor
};


// ---------------------------------------------------------------------------
// Export Healing Metadata — Lymphatic Dispatch Report
// ---------------------------------------------------------------------------
export function getPulseEarnLymphHealingState() {
  return { ...lymphHealing };
}
