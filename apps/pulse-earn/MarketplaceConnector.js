// ============================================================================
// FILE: tropic-pulse-functions/apps/pulse-earn/MarketplaceConnector.js
// LAYER: THE EXCHANGE OFFICE + NERVOUS SYSTEM
// (Job Intake + Result Forwarding + Reputation Updating + Signal Routing)
// ============================================================================
//
// ROLE (v7.1+ AND-ARCHITECTURE):
//   THE EXCHANGE OFFICE — Pulse‑Earn’s public-facing economic counter.
//   THE NERVOUS SYSTEM — Pulse‑Earn’s signal router between environment AND organism.
//   • Fetches next job from all marketplaces (via MarketplaceOrchestrator).
//   • Converts marketplace jobs into PulseJobSchema-like structures.
//   • Submits completed results back to the correct marketplace.
//   • Updates marketplace reputation based on job outcomes.
//   • Logs neural/economic activity for healing (EarnHealer).
//
// WHY “EXCHANGE OFFICE + NERVOUS SYSTEM”?:
//   • Economic: It is the bridge between internal performance AND external profit.
//   • Economic: It handles job intake (incoming currency) AND result submission (outgoing currency).
//   • Economic: It updates marketplace trust (exchange rate).
//   • Biological: It routes sensory input (jobs) AND motor output (results).
//   • Biological: It adjusts reputation (synaptic weighting) AND exposes health to the Immune System.
//
// PURPOSE (v7.1+):
//   • Provide a deterministic, drift‑proof interface between Earn AND Proxy.
//   • Normalize jobs AND forward results safely.
//   • Maintain healing metadata for the Physician / Immune System (EarnHealer).
//   • Make economic AND biological routing explicit and human‑readable.
//
// CONTRACT (unchanged):
//   • PURE INTERFACE — no AI layers, no translation, no memory model.
//   • READ‑ONLY except for healing metadata + reputation updates.
//   • NO eval(), NO Function(), NO dynamic imports.
//   • NO executing user code.
//   • Deterministic job intake + result forwarding only.
//
// SAFETY (unchanged):
//   • v7.1+ upgrade is COMMENTAL ONLY — NO LOGIC CHANGES.
//   • All behavior remains identical to pre‑v7.1 MarketplaceConnector.
// ============================================================================

import {
  updateMarketplaceReputation,
  computeReputationSignals
} from "./MarketplaceReputation.js";

import { getNextJob } from "./MarketplaceOrchestrator.js";
import { PulseJobSchema } from "./PulseJobSchema.js";
import { getDeviceProfile } from "./PulseDeviceProfile.js";
import { marketplaces } from "./RegisteredMarketplaces.js";
import { sendResultToMarketplace } from "./ResultSubmission.js";

// ---------------------------------------------------------------------------
// Healing Metadata — Exchange Office + Neural Activity Log
//   • Economic view: last profit‑relevant events.
//   • Biological view: last neural signal + pathway health.
// ---------------------------------------------------------------------------
const healingState = {
  lastFetchError: null,       // sensory / intake failure
  lastSubmitError: null,      // motor / output failure
  lastJobId: null,            // last economic + neural signal ID
  lastMarketplaceId: null,    // last external counterparty / sensory source
  cycleCount: 0,              // total intake cycles (neural firings + economic ticks)
};

// ---------------------------------------------------------------------------
// fetchJobFromMarketplace — Intake Window (Sensory + Economic)
//   • Reads device capacity (organism capability).
//   • Asks MarketplaceOrchestrator for next job (environmental stimulus).
//   • Records last job + marketplace for healing AND diagnostics.
// ---------------------------------------------------------------------------
export async function fetchJobFromMarketplace() {
  healingState.cycleCount++;

  try {
    const device = getDeviceProfile();

    const capacity = {
      cpuAvailable: device.cpuCores ?? 4,
      memoryAvailable: device.memoryMB ?? 8192
    };

    const job = await getNextJob(marketplaces, capacity);

    if (job) {
      healingState.lastJobId = job.id;
      healingState.lastMarketplaceId = job.marketplaceId;
    }

    // NOTE:
    //   • If job exists → organism has external demand (earning opportunity).
    //   • If null → environment is quiet; Exchange Office idles.
    return job || null;

  } catch (err) {
    healingState.lastFetchError = err.message;
    console.error("fetchJobFromMarketplace() error:", err);
    return null;
  }
}

// ---------------------------------------------------------------------------
// getNextMarketplaceJob — Job Conversion Counter (Encoding Layer)
//   • Converts raw marketplace job → normalized internal job structure.
//   • This is the “neural encoding” AND “economic ticket printing” step.
// ---------------------------------------------------------------------------
export async function getNextMarketplaceJob(deviceId) {
  const job = await fetchJobFromMarketplace();
  if (!job) return null;

  if (!job.id || !job.marketplaceId) {
    healingState.lastFetchError = "invalid_job_structure";
    return null;
  }

  // NOTE:
  //   • payload.data describes resource requirements (metabolic cost).
  //   • gpu block is reserved for future safe compute extensions.
  //   • assignedTo ties the job to a specific device (organ / worker).
  return {
    id: job.id,

    payload: {
      type: "marketplace-job",
      data: {
        marketplaceId: job.marketplaceId,
        cpuRequired: job.cpuRequired ?? 0,
        memoryRequired: job.memoryRequired ?? 0,
        estimatedSeconds: job.estimatedSeconds ?? 0
      },
      gpu: {
        workgroupSize: 1,
        iterations: 1,
        shader: ""
      }
    },

    marketplace: job.marketplaceId,
    assignedTo: deviceId,
    timestamp: Date.now()
  };
}

// ---------------------------------------------------------------------------
// submitMarketplaceResult — Result Forwarding Window (Motor + Synaptic)
//   • Sends completed work back to the originating marketplace.
//   • Computes reputation signals (economic performance metrics).
//   • Updates marketplace reputation (synaptic weighting).
// ---------------------------------------------------------------------------
export async function submitMarketplaceResult(job, result) {
  try {
    if (!job || !job.marketplaceId) {
      healingState.lastSubmitError = "invalid_job_for_submission";
      return null;
    }

    const signals = computeReputationSignals({
      latencyMs: result.latencyMs ?? 0,
      apiErrors: result.apiErrors ?? 0,
      jobsReturned: result.jobsReturned ?? 0,
      profitableJobs: result.profitableJobs ?? 0,
      jobSuccessRate: result.jobSuccessRate ?? 0,
      avgProfitPerJob: result.avgProfitPerJob ?? 0
    });

    // NOTE:
    //   • This is synaptic plasticity: better performance → stronger reputation.
    //   • Over time, this biases Earn toward more profitable marketplaces.
    updateMarketplaceReputation(job.marketplaceId, signals);

    const submission = await sendResultToMarketplace(job, result);
    return submission;

  } catch (err) {
    healingState.lastSubmitError = err.message;
    console.error("submitMarketplaceResult() error:", err);
    return null;
  }
}

// ---------------------------------------------------------------------------
// Export Healing Metadata — Exchange Office + Neural Health Report
//   • Used by EarnHealer (Immune System) to diagnose:
//       – intake failures
//       – output failures
//       – marketplace‑specific issues
//       – overall nervous system activity
// ---------------------------------------------------------------------------
export function getMarketplaceConnectorHealingState() {
  return { ...healingState };
}
