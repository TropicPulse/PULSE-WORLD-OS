// ============================================================================
// FILE: tropic-pulse-functions/apps/pulse-earn/PulseEarnLymphNodes-v11-Evo.js
// LAYER: THE LYMPHATIC HANDSHAKE NODES (v11-Evo)
// (Finalizer of Jobs + Immune-Safe Dispatch + Certified Marketplace Exchange)
// ============================================================================
//
// ROLE (v11-Evo):
//   THE LYMPHATIC HANDSHAKE NODES — Pulse‑Earn’s immune‑safe finalizers.
//   • Validate job + marketplace identity (immune recognition).
//   • Locate the correct marketplace receptor (antigen matching).
//   • Ensure submitResult() exists (immune compatibility).
//   • Perform deterministic Earn → Marketplace handshake.
//   • Record certified submission outcome (immune memory + signatures).
//
// CONTRACT (v11-Evo):
//   • PURE RESULT DISPATCHER — no AI layers, no translation, no memory model.
//   • NO async, NO timestamps, NO nondeterministic behavior.
//   • NEVER mutate job objects.
//   • Deterministic identity verification + dispatch only.
// ============================================================================

import { PulseEarnReceptor } from "./PulseEarnReceptor.js";
import { PulseEarnCustomReceptor } from "./PulseEarnCustomReceptorMkt.js";


// ---------------------------------------------------------------------------
// Healing Metadata — Lymphatic Dispatch Log (v11-Evo)
// ---------------------------------------------------------------------------
const lymphHealing = {
  lastJobId: null,
  lastMarketplaceId: null,
  lastAdapterUsed: null,
  lastError: null,
  lastResponse: null,
  cycleCount: 0,
  lastCycleIndex: null,

  lastHandshakeSignature: null,
  lastJobSignature: null,
  lastMarketplaceSignature: null
};

// Deterministic cycle counter
let lymphCycle = 0;


// ---------------------------------------------------------------------------
// Deterministic Hash Helper — v11-Evo
// ---------------------------------------------------------------------------
function computeHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `h${h}`;
}


// ---------------------------------------------------------------------------
// Signature Builders — v11-Evo
// ---------------------------------------------------------------------------
function buildJobSignature(job) {
  if (!job) return "JOB::NONE";
  return computeHash(`JOB::${job.id}::${job.marketplaceId || "NO_MKT"}`);
}

function buildMarketplaceSignature(marketplaceId) {
  return computeHash(`MKT::${marketplaceId || "NO_MKT"}`);
}

function buildHandshakeSignature(job, cycleIndex) {
  return computeHash(
    `HS::${job?.id || "NO_JOB"}::${job?.marketplaceId || "NO_MKT"}::${cycleIndex}`
  );
}


// ---------------------------------------------------------------------------
// Marketplace Receptor Registry — Antigen Directory
// ---------------------------------------------------------------------------
const receptorRegistry = {
  A: PulseEarnReceptor,
  CUSTOM: PulseEarnCustomReceptor
};


// ---------------------------------------------------------------------------
// submitPulseEarnResult — Deterministic Lymphatic Handshake (v11-Evo)
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
      lymphHealing.lastJobSignature = buildJobSignature(job);
      lymphHealing.lastMarketplaceSignature = buildMarketplaceSignature(
        job?.marketplaceId
      );
      lymphHealing.lastHandshakeSignature = buildHandshakeSignature(job, lymphCycle);

      return failure;
    }

    lymphHealing.lastJobId = job.id;
    lymphHealing.lastMarketplaceId = job.marketplaceId;

    lymphHealing.lastJobSignature = buildJobSignature(job);
    lymphHealing.lastMarketplaceSignature = buildMarketplaceSignature(
      job.marketplaceId
    );

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
      lymphHealing.lastHandshakeSignature = buildHandshakeSignature(job, lymphCycle);

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
      lymphHealing.lastHandshakeSignature = buildHandshakeSignature(job, lymphCycle);

      return failure;
    }

    lymphHealing.lastAdapterUsed = job.marketplaceId;

    // 3. Perform the Handshake — Deterministic Dispatch
    const response = adapter.submitResult(job, result);

    lymphHealing.lastResponse = response;
    lymphHealing.lastError = null;
    lymphHealing.lastHandshakeSignature = buildHandshakeSignature(job, lymphCycle);

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
    lymphHealing.lastHandshakeSignature = buildHandshakeSignature(job, lymphCycle);

    return failure;
  }
}


// ---------------------------------------------------------------------------
// sendResultToMarketplace — v11-Evo alias for Nervous System
// ---------------------------------------------------------------------------
export function sendResultToMarketplace(job, result) {
  return submitPulseEarnResult(job, result);
}


// ---------------------------------------------------------------------------
// Export Healing Metadata — Lymphatic Dispatch Report (v11-Evo)
// ---------------------------------------------------------------------------
export function getPulseEarnLymphHealingState() {
  return { ...lymphHealing };
}
