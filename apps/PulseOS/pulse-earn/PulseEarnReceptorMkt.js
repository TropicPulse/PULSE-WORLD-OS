// ============================================================================
// FILE: tropic-pulse-functions/apps/pulse-earn/PulseEarnReceptor.js
// LAYER: THE STANDARD RECEPTOR (Marketplace Protocol + Universal Adapter)
// PULSE EARN — v10.4 (UPGRADED)
// ============================================================================
//
// ROLE (v10.4):
//   THE STANDARD RECEPTOR — Pulse‑Earn’s canonical marketplace interface.
//   • Defines the universal interface for all marketplaces.
//   • Provides a config‑driven, reusable adapter (deterministic only).
//   • Establishes the minimum contract (ping, fetchJobs, submitResult).
//   • Acts as the “sensory receptor” of the Earn organism.
//
// PURPOSE (v10.4):
//   • Provide a deterministic, drift‑proof marketplace template.
//   • Allow runtime configuration for receptor DNA (no network).
//   • Guarantee safe, deterministic behavior + fallback values.
//   • Preserve receptor lineage + environmental interface (conceptual only).
//
// CONTRACT (v10.4):
//   • PURE RECEPTOR — no AI layers, no translation, no memory model.
//   • READ‑ONLY except for config overrides.
//   • NO eval(), NO Function(), NO dynamic imports.
//   • NO executing user code.
//   • NO fetch, NO network, NO timestamps, NO async.
//   • Deterministic receptor behavior only.
// ============================================================================


// ---------------------------------------------------------------------------
// Config — Receptor Identity (runtime‑overrideable, deterministic)
// ---------------------------------------------------------------------------
let receptorConfig = {
  id: "A",
  name: "PulseEarn Receptor A",
  healthScore: 1.0,
  endpoints: {
    pingSignal: "PING_OK",
    jobs: [],          // deterministic job list
    submitStatus: "SUBMIT_OK"
  }
};


// ---------------------------------------------------------------------------
// configurePulseEarnReceptor — Safe, shallow config override
// ---------------------------------------------------------------------------
export function configurePulseEarnReceptor(config) {
  receptorConfig = {
    ...receptorConfig,
    ...config,
    endpoints: {
      ...receptorConfig.endpoints,
      ...(config?.endpoints || {})
    }
  };
}


// ---------------------------------------------------------------------------
// Deterministic helpers
// ---------------------------------------------------------------------------
function classifyHealth(healthScore) {
  const h = typeof healthScore === "number" ? healthScore : 1.0;
  if (h >= 0.95) return "healthy";
  if (h >= 0.85) return "soft";
  if (h >= 0.50) return "mid";
  if (h >= 0.15) return "hard";
  return "critical";
}


// ---------------------------------------------------------------------------
 // Standard Receptor Client — ping(), fetchJobs(), submitResult()
// NOTE: These are the receptor’s sensory functions (deterministic).
// ---------------------------------------------------------------------------

function ping() {
  const h = classifyHealth(receptorConfig.healthScore);

  // deterministic “latency” signal based on health tier
  if (h === "healthy") return 10;
  if (h === "soft") return 50;
  if (h === "mid") return 150;
  if (h === "hard") return 300;
  return null; // critical → no signal
}

function fetchJobs() {
  const jobs = receptorConfig.endpoints.jobs;
  if (!Array.isArray(jobs)) return [];
  return jobs.map(j => ({ ...j, marketplaceId: receptorConfig.id }));
}

function submitResult(job, result) {
  if (!job || !job.id) {
    return {
      success: false,
      error: "invalid_job"
    };
  }

  return {
    success: true,
    receptorId: receptorConfig.id,
    jobId: job.id,
    result,
    status: receptorConfig.endpoints.submitStatus
  };
}


// ---------------------------------------------------------------------------
// Export Standard Receptor Adapter
// ---------------------------------------------------------------------------
export const PulseEarnReceptor = {
  id: () => receptorConfig.id,
  name: () => receptorConfig.name,
  ping,
  fetchJobs,
  submitResult
};
