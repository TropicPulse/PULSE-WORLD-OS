// ============================================================================
// FILE: tropic-pulse-functions/apps/pulse-earn/marketplaceA.js
// LAYER: THE STANDARD RECEPTOR (Marketplace Protocol + Universal Adapter)
// ============================================================================
//
// ROLE (v7.1+):
//   THE STANDARD RECEPTOR — Pulse‑Earn’s canonical marketplace interface.
//   • Defines the universal interface for all marketplaces.
//   • Provides a config‑driven, reusable adapter.
//   • Establishes the minimum contract (ping, fetchJobs, submitResult).
//   • Acts as the “sensory receptor” of the Earn organism.
//
// WHY “STANDARD RECEPTOR”?:
//   • It receives external signals (jobs, pings, submissions).
//   • It sets the protocol all other receptors must follow.
//   • It defines safe defaults + deterministic behavior.
//   • It is the constitution of the Earn marketplace layer.
//
// PURPOSE (v7.1+):
//   • Provide a deterministic, drift‑proof marketplace template.
//   • Allow runtime configuration for custom integrations.
//   • Guarantee safe HTTP behavior + fallback values.
//   • Preserve receptor lineage + environmental interface (conceptual only).
//
// CONTRACT (unchanged):
//   • PURE NETWORK ADAPTER — no AI layers, no translation, no memory model.
//   • READ‑ONLY except for config overrides.
//   • NO eval(), NO Function(), NO dynamic imports.
//   • NO executing user code.
//   • Deterministic fetch‑based wrapper only.
//
// SAFETY (unchanged):
//   • v7.1+ upgrade is COMMENTAL ONLY — NO LOGIC CHANGES.
//   • All behavior remains identical to pre‑v7.1 marketplaceA.
// ============================================================================

// ---------------------------------------------------------------------------
// Config — Receptor Identity (runtime‑overrideable)
// ---------------------------------------------------------------------------
let marketplaceConfig = {
  id: "A",
  name: "Marketplace A",
  baseUrl: "https://example-marketplace-A.com",
  endpoints: {
    ping: "/ping",
    jobs: "/jobs",
    submit: "/submit",
  },
};

// ---------------------------------------------------------------------------
// configureMarketplaceA — Safe, shallow config override
// NOTE: This is equivalent to adjusting receptor sensitivity.
// ---------------------------------------------------------------------------
export function configureMarketplaceA(config) {
  marketplaceConfig = {
    ...marketplaceConfig,
    ...config,
    endpoints: {
      ...marketplaceConfig.endpoints,
      ...(config?.endpoints || {}),
    },
  };
}

// ---------------------------------------------------------------------------
// Helpers — URL Builder (Receptor Pathway)
// ---------------------------------------------------------------------------
function buildUrl(pathKey) {
  const base = marketplaceConfig.baseUrl || "";
  const path = marketplaceConfig.endpoints[pathKey] || "";
  return `${base}${path}`;
}

// ---------------------------------------------------------------------------
// Standard Receptor Client — ping(), fetchJobs(), submitResult()
// NOTE: These are the receptor’s sensory functions.
// ---------------------------------------------------------------------------

async function ping() {
  try {
    const start = Date.now();
    const res = await fetch(buildUrl("ping"));
    if (!res.ok) return null;

    // NOTE: Lower latency = stronger receptor signal
    return Date.now() - start;
  } catch {
    return null;
  }
}

async function fetchJobs() {
  try {
    const res = await fetch(buildUrl("jobs"));
    if (!res.ok) return [];

    const data = await res.json();
    // NOTE: More jobs = stronger environmental stimulus
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

async function submitResult(job, result) {
  try {
    const res = await fetch(buildUrl("submit"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jobId: job.id, result }),
    });

    if (!res.ok) {
      return {
        success: false,
        error: `Marketplace submission failed: ${res.status}`,
      };
    }

    // NOTE: Successful submission = completed metabolic exchange
    return await res.json();
  } catch (err) {
    return {
      success: false,
      error: err.message,
    };
  }
}

// ---------------------------------------------------------------------------
// Export Standard Receptor Adapter
// ---------------------------------------------------------------------------
export const marketplaceA = {
  id: () => marketplaceConfig.id,
  name: () => marketplaceConfig.name,
  ping,
  fetchJobs,
  submitResult,
};
