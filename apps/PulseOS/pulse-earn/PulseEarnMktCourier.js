// ============================================================================
// FILE: tropic-pulse-functions/apps/pulse-earn/PulseEarnMktCourier.js
// LAYER: THE COURIER (v10.4)
// (Fast‑Turnaround Compute Runner + Job Delivery Agent — Deterministic)
// ============================================================================
//
// ROLE (v10.4):
//   THE COURIER — Pulse‑Earn’s deterministic Spheron marketplace receptor.
//   • Represents Spheron compute jobs as stable receptor DNA.
//   • Normalizes raw Spheron-like tasks into Pulse‑Earn job schema.
//   • Provides deterministic ping(), fetchJobs(), submitResult().
//   • Maintains healing metadata for Earn healers.
//
// CONTRACT (v10.4):
//   • PURE RECEPTOR — no network, no async, no timestamps.
//   • READ‑ONLY except for healing metadata.
//   • Deterministic normalization only.
// ============================================================================


// ---------------------------------------------------------------------------
// Healing Metadata — Courier Interaction Log (deterministic)
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

  lastPayloadVersion: null,
  lastJobType: null,
  lastResourceShape: null,
  lastGpuFlag: null,
  liquidityScore: 0,
  payoutVolatility: 0,

  cycleCount: 0,
  lastCycleIndex: null
};

// Deterministic cycle counter
let courierCycle = 0;


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


// ---------------------------------------------------------------------------
// DETERMINISTIC SPHERON RECEPTOR DNA (replaces network calls)
// ---------------------------------------------------------------------------
const SPHERON_RECEPTOR_DNA = {
  pingLatency: 42,
  jobs: [
    {
      id: "spheron-001",
      payout: 0.05,
      cpu: 2,
      memory: 2048,
      estimatedSeconds: 300,
      gpu: false,
      type: "compute"
    },
    {
      id: "spheron-002",
      payout: 0.12,
      cpu: 4,
      memory: 4096,
      estimatedSeconds: 600,
      gpu: true,
      type: "compute"
    }
  ]
};


// ---------------------------------------------------------------------------
// COURIER CLIENT — Deterministic Spheron Interface
// ---------------------------------------------------------------------------
export const PulseEarnMktCourier = {
  id: "spheron",
  name: "Spheron Compute",

  // -------------------------------------------------------------------------
  // Ping — Deterministic courier route latency
  // -------------------------------------------------------------------------
  ping() {
    courierCycle++;
    healingState.cycleCount++;
    healingState.lastCycleIndex = courierCycle;

    healingState.lastPingMs = SPHERON_RECEPTOR_DNA.pingLatency;
    healingState.lastPingError = null;

    return SPHERON_RECEPTOR_DNA.pingLatency;
  },

  // -------------------------------------------------------------------------
  // Fetch Jobs — Deterministic compute task retrieval
  // -------------------------------------------------------------------------
  fetchJobs() {
    courierCycle++;
    healingState.cycleCount++;
    healingState.lastCycleIndex = courierCycle;

    try {
      const data = { jobs: SPHERON_RECEPTOR_DNA.jobs };
      healingState.lastPayloadVersion = "10.4-spheron-dna";

      if (!data || !Array.isArray(data.jobs)) {
        healingState.lastFetchError = "invalid_jobs_payload";
        healingState.lastFetchCount = 0;
        return [];
      }

      const jobs = data.jobs
        .map(raw => this.normalizeJob(raw))
        .filter(j => j !== null);

      // deterministic volatility
      const count = jobs.length;
      const payouts = jobs.map(j => j.payout);

      healingState.liquidityScore = Math.abs(
        count - (healingState.lastFetchCount || 0)
      );

      if (payouts.length > 1) {
        const avg = payouts.reduce((a, b) => a + b, 0) / payouts.length;
        const variance =
          payouts.reduce((a, b) => a + (b - avg) * (b - avg), 0) /
          payouts.length;
        healingState.payoutVolatility = variance;
      }

      healingState.lastFetchError = null;
      healingState.lastFetchCount = jobs.length;

      return jobs;

    } catch (err) {
      healingState.lastFetchError = err.message;
      healingState.lastFetchCount = 0;
      return [];
    }
  },

  // -------------------------------------------------------------------------
  // Submit Result — Deterministic delivery back to Spheron
  // -------------------------------------------------------------------------
  submitResult(job, result) {
    courierCycle++;
    healingState.cycleCount++;
    healingState.lastCycleIndex = courierCycle;

    healingState.lastSubmitJobId = job?.id ?? null;
    healingState.lastSubmitError = null;

    return {
      ok: true,
      marketplace: "spheron",
      jobId: job?.id ?? null,
      cycleIndex: courierCycle,
      note: "Spheron submission simulated deterministically in v10.4.",
      result
    };
  },

  // -------------------------------------------------------------------------
  // Normalize Job — Convert Spheron job → Pulse‑Earn job schema
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

      const payout = Number(raw.payout ?? 0);
      if (!Number.isFinite(payout) || payout <= 0) {
        healingState.lastNormalizationError = "non_positive_payout";
        return null;
      }

      const cpuRequired = Number(raw.cpu ?? 1);
      const memoryRequired = Number(raw.memory ?? 1024);
      const estimatedSeconds = Number(raw.estimatedSeconds ?? 600);

      healingState.lastResourceShape = {
        cpu: cpuRequired,
        mem: memoryRequired,
        duration: estimatedSeconds
      };

      if (!Number.isFinite(estimatedSeconds) || estimatedSeconds <= 0) {
        healingState.lastNormalizationError = "non_positive_duration";
        return null;
      }

      const gpuFlag = !!raw.gpu;
      healingState.lastGpuFlag = gpuFlag ? "gpu" : "cpu";

      const normalized = {
        id: String(raw.id),
        marketplaceId: "spheron",

        payout,
        cpuRequired,
        memoryRequired,
        estimatedSeconds,

        minGpuScore: gpuFlag ? 300 : 100,
        bandwidthNeededMbps: 5
      };

      healingState.lastNormalizedJobId = normalized.id;
      healingState.lastNormalizationError = null;

      return normalized;

    } catch (err) {
      healingState.lastNormalizationError = err.message;
      return null;
    }
  }
};


// ---------------------------------------------------------------------------
// Healing State Export — Courier Interaction Log
// ---------------------------------------------------------------------------
export function getPulseEarnMktCourierHealingState() {
  return { ...healingState };
}
