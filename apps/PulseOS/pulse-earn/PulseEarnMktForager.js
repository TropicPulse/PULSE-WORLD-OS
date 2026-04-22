// ============================================================================
// FILE: tropic-pulse-functions/apps/pulse-earn/PulseEarnMktForager.js
// LAYER: THE FORAGER (General GPU Compute Harvester)
// PULSE‑EARN v9.x — COMMENTAL / IDENTITY UPGRADE ONLY (NO LOGIC CHANGES)
// ============================================================================
//
// ROLE:
//   THE FORAGER — Pulse‑Earn’s general‑purpose compute marketplace agent.
//   • Interfaces with the Salad GPU compute marketplace
//   • Fetches generic compute workloads (AI, ML, rendering, video tasks)
//   • Normalizes raw Salad tasks into Pulse‑Earn job schema
//   • Submits completed outputs
//   • Maintains healing metadata for Earn healers
//
// PURPOSE:
//   • Provide a deterministic, drift‑proof adapter for Salad workloads
//   • Maintain strict protocol boundaries
//   • Ensure safe, predictable compute job communication
//
// CONTRACT:
//   • PURE NETWORK ADAPTER — no AI layers, no translation, no memory model
//   • READ‑ONLY except for healing metadata
//   • NO eval(), NO Function(), NO dynamic imports
//   • NO executing user code
//   • Deterministic normalization only
//
// SAFETY:
//   • v9.x upgrade is COMMENTAL / IDENTITY ONLY — NO LOGIC CHANGES
//   • All behavior remains identical to pre‑v9.x adapter patterns
// ============================================================================


// ---------------------------------------------------------------------------
// Healing Metadata — Forager Interaction Log
// ---------------------------------------------------------------------------
const healingState = {
  lastPingMs: null,
  lastPingError: null,
  lastFetchCount: 0,
  lastFetchError: null,
  lastSubmitJobId: null,
  lastSubmitError: null,
  lastNormalizedJobId: null,
  lastNormalizationError: null,

  // Salad-specific metadata (allowed)
  lastPayloadVersion: null,
  lastJobType: null,
  lastGpuTier: null,
  lastResourceShape: null,
  payoutVolatility: 0,
  liquidityScore: 0,
  cycleCount: 0,
};


// ---------------------------------------------------------------------------
// INTERNAL — Safe Getter
// ---------------------------------------------------------------------------
function safeGet(obj, path, fallback = null) {
  try {
    return path
      .split(".")
      .reduce((o, k) => (o && o[k] !== undefined ? o[k] : null), obj) ?? fallback;
  } catch {
    return fallback;
  }
}

function updateVolatility(jobs) {
  const count = jobs.length;
  const payouts = jobs
    .map(j => Number(j.payout ?? 0))
    .filter(n => Number.isFinite(n));

  healingState.liquidityScore = Math.abs(
    count - (healingState.lastFetchCount || 0)
  );

  if (payouts.length > 1) {
    const avg = payouts.reduce((a, b) => a + b, 0) / payouts.length;
    const variance =
      payouts.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / payouts.length;
    healingState.payoutVolatility = variance;
  }
}


// ---------------------------------------------------------------------------
// FORAGER CLIENT — Salad Marketplace Interface
// ---------------------------------------------------------------------------
export const PulseEarnMktForager = {
  id: "salad",
  name: "Salad Marketplace",

  // -------------------------------------------------------------------------
  // Ping — Measure marketplace latency
  // -------------------------------------------------------------------------
  async ping() {
    const url = "https://api.salad.com/ping"; // placeholder
    const start = Date.now();

    try {
      const res = await fetch(url);
      if (!res.ok) {
        healingState.lastPingError = `non_ok_status_${res.status}`;
        return null;
      }

      const latency = Date.now() - start;
      healingState.lastPingMs = latency;
      healingState.lastPingError = null;
      healingState.cycleCount++;
      return latency;
    } catch (err) {
      healingState.lastPingError = err.message;
      return null;
    }
  },

  // -------------------------------------------------------------------------
  // Fetch Jobs — Retrieve Salad compute tasks
  // -------------------------------------------------------------------------
  async fetchJobs(deviceId) {
    const url = "https://api.salad.com/jobs"; // placeholder

    try {
      const res = await fetch(url);
      if (!res.ok) {
        healingState.lastFetchError = `non_ok_status_${res.status}`;
        healingState.lastFetchCount = 0;
        return [];
      }

      const data = await res.json();

      healingState.lastPayloadVersion =
        typeof data === "object" ? Object.keys(data).join(",") : "unknown";

      if (!data || !Array.isArray(data.jobs)) {
        healingState.lastFetchError = "invalid_jobs_payload";
        healingState.lastFetchCount = 0;
        return [];
      }

      const jobs = data.jobs
        .map(raw => this.normalizeJob(raw))
        .filter(j => j !== null);

      updateVolatility(jobs);

      healingState.lastFetchError = null;
      healingState.lastFetchCount = jobs.length;
      healingState.cycleCount++;
      return jobs;
    } catch (err) {
      healingState.lastFetchError = err.message;
      healingState.lastFetchCount = 0;
      return [];
    }
  },

  // -------------------------------------------------------------------------
  // Submit Result — Return completed outputs
  // -------------------------------------------------------------------------
  async submitResult(job, result) {
    const url = `https://api.salad.com/jobs/${job.id}/submit`; // placeholder
    healingState.lastSubmitJobId = job?.id ?? null;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ result }),
      });

      const json = await res.json();
      healingState.lastSubmitError = null;
      healingState.cycleCount++;
      return json;
    } catch (err) {
      healingState.lastSubmitError = err.message;
      throw err;
    }
  },

  // -------------------------------------------------------------------------
  // Normalize Job — Convert Salad job → Pulse‑Earn job schema
  // -------------------------------------------------------------------------
  normalizeJob(raw) {
    try {
      if (!raw || typeof raw !== "object") {
        healingState.lastNormalizationError = "invalid_raw_job";
        return null;
      }
      if (!raw.id) {
        healingState.lastNormalizationError = "missing_id";
        return null;
      }

      healingState.lastJobType = safeGet(raw, "type", "unknown");

      const payout = Number(raw.reward ?? raw.payout ?? 0);
      if (!Number.isFinite(payout) || payout <= 0) {
        healingState.lastNormalizationError = "non_positive_payout";
        return null;
      }

      const cpuRequired = Number(raw.cpu ?? 2);
      const memoryRequired = Number(raw.memory ?? 2048);
      const estimatedSeconds = Number(raw.estimatedSeconds ?? 600);

      healingState.lastResourceShape = {
        cpu: cpuRequired,
        mem: memoryRequired,
        duration: estimatedSeconds,
      };

      if (!Number.isFinite(estimatedSeconds) || estimatedSeconds <= 0) {
        healingState.lastNormalizationError = "non_positive_duration";
        return null;
      }

      const gpuTier = raw.gpuTier ?? "mid";
      healingState.lastGpuTier = gpuTier;

      const minGpuScore =
        gpuTier === "high"
          ? 600
          : gpuTier === "mid"
          ? 400
          : gpuTier === "low"
          ? 250
          : 150;

      const bandwidthNeededMbps = Number(raw.bandwidth ?? 10);

      const normalized = {
        id: String(raw.id),
        marketplaceId: "salad",

        payout,
        cpuRequired,
        memoryRequired,
        estimatedSeconds,

        minGpuScore,
        bandwidthNeededMbps,
      };

      healingState.lastNormalizedJobId = normalized.id;
      healingState.lastNormalizationError = null;
      return normalized;
    } catch (err) {
      healingState.lastNormalizationError = err.message;
      return null;
    }
  },
};


// ---------------------------------------------------------------------------
// Healing State Export — Forager Interaction Log
// ---------------------------------------------------------------------------
export function getPulseEarnMktForagerHealingState() {
  return { ...healingState };
}
