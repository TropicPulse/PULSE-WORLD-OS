// ============================================================================
// FILE: tropic-pulse-functions/apps/pulse-earn/PulseEarnReceptor-v11-Evo.js
// LAYER: THE STANDARD RECEPTOR (Marketplace Protocol + Universal Adapter)
// PULSE EARN — v11-Evo
// ============================================================================
//
// ROLE (v11-Evo):
//   THE STANDARD RECEPTOR — Pulse‑Earn’s canonical marketplace interface.
//   • Defines the universal interface for all marketplaces.
//   • Provides a config‑driven, reusable adapter (deterministic only).
//   • Establishes the minimum contract (ping, fetchJobs, submitResult).
//   • Acts as the “sensory receptor” of the Earn organism.
//   • Emits v11‑Evo signatures + diagnostics.
//
// PURPOSE (v11-Evo):
//   • Provide deterministic, drift‑proof marketplace template.
//   • Allow runtime configuration for receptor DNA (no network).
//   • Guarantee safe, deterministic behavior + fallback values.
//   • Preserve receptor lineage + environmental interface (conceptual only).
//
// CONTRACT (v11-Evo):
//   • PURE RECEPTOR — no AI layers, no translation, no memory model.
//   • READ‑ONLY except for config overrides.
//   • NO eval(), NO Function(), NO dynamic imports.
//   • NO executing user code.
//   • NO fetch, NO network, NO timestamps, NO async.
//   • Deterministic receptor behavior only.
// ============================================================================


// ============================================================================
// INTERNAL STATE — deterministic, drift-proof
// ============================================================================
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


// ============================================================================
// Deterministic Hash Helper — v11-Evo
// ============================================================================
function computeHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `h${h}`;
}


// ============================================================================
// v11-Evo: Signature Builders
// ============================================================================
function buildReceptorPattern(cfg) {
  return (
    `RECEPTOR::${cfg.id}` +
    `::name:${cfg.name}` +
    `::health:${cfg.healthScore}` +
    `::jobs:${Array.isArray(cfg.endpoints.jobs) ? cfg.endpoints.jobs.length : 0}` +
    `::submit:${cfg.endpoints.submitStatus}`
  );
}

function buildReceptorSignature(cfg) {
  return computeHash(
    `${cfg.id}::${cfg.name}::${cfg.healthScore}::${cfg.endpoints.submitStatus}`
  );
}

function buildEndpointSignature(cfg) {
  return computeHash(
    `ENDPOINTS::jobs:${Array.isArray(cfg.endpoints.jobs) ? cfg.endpoints.jobs.length : 0}` +
    `::submit:${cfg.endpoints.submitStatus}`
  );
}


// ============================================================================
// Health Tier (unchanged logic, v11-Evo naming)
// ============================================================================
function classifyHealth(healthScore) {
  const h = typeof healthScore === "number" ? healthScore : 1.0;
  if (h >= 0.95) return "healthy";
  if (h >= 0.85) return "soft";
  if (h >= 0.50) return "mid";
  if (h >= 0.15) return "hard";
  return "critical";
}


// ============================================================================
// CONFIG OVERRIDE — deterministic only
// ============================================================================
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


// ============================================================================
// Sensory Functions — ping(), fetchJobs(), submitResult()
// PURE deterministic behavior
// ============================================================================
function ping() {
  const tier = classifyHealth(receptorConfig.healthScore);

  if (tier === "healthy") return 10;
  if (tier === "soft") return 50;
  if (tier === "mid") return 150;
  if (tier === "hard") return 300;
  return null; // critical → no signal
}

function fetchJobs() {
  const jobs = receptorConfig.endpoints.jobs;
  if (!Array.isArray(jobs)) return [];

  return jobs.map(j => ({
    ...j,
    marketplaceId: receptorConfig.id
  }));
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


// ============================================================================
// PUBLIC EXPORT — PulseEarnReceptor v11-Evo
// ============================================================================
export const PulseEarnReceptor = {
  id: () => receptorConfig.id,
  name: () => receptorConfig.name,

  // v11-Evo signatures
  receptorSignature: () => buildReceptorSignature(receptorConfig),
  endpointSignature: () => buildEndpointSignature(receptorConfig),
  receptorPattern: () => buildReceptorPattern(receptorConfig),

  // sensory functions
  ping,
  fetchJobs,
  submitResult,

  // v11-Evo diagnostics bundle
  diagnostics() {
    return {
      id: receptorConfig.id,
      name: receptorConfig.name,
      healthScore: receptorConfig.healthScore,
      healthTier: classifyHealth(receptorConfig.healthScore),
      receptorSignature: buildReceptorSignature(receptorConfig),
      endpointSignature: buildEndpointSignature(receptorConfig),
      receptorPattern: buildReceptorPattern(receptorConfig),
      jobCount: Array.isArray(receptorConfig.endpoints.jobs)
        ? receptorConfig.endpoints.jobs.length
        : 0
    };
  }
};
