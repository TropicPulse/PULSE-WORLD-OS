// ============================================================================
// FILE: tropic-pulse-functions/apps/pulse-earn/PulseEarnMktAuctioneer.js
// LAYER: THE AUCTIONEER (v10.4)
// (Bid‑Floor Interpreter + Volatility Handler + Market Chaos Normalizer)
// ============================================================================
//
// ROLE (v10.4):
//   THE AUCTIONEER — deterministic Vast.ai receptor phenotype.
//   • Provides a stable, drift‑proof representation of Vast.ai offers.
//   • Normalizes inconsistent metadata into Pulse‑Earn job schema.
//   • Supplies deterministic ping(), fetchJobs(), submitResult().
//   • Maintains healing metadata for Earn healers.
//
// PURPOSE (v10.4):
//   • Replace all network behavior with deterministic receptor DNA.
//   • Guarantee stable job normalization.
//   • Provide predictable, safe, reproducible marketplace behavior.
//
// CONTRACT (v10.4):
//   • PURE RECEPTOR — no network, no async, no timestamps.
//   • READ‑ONLY except for healing metadata.
//   • NO eval(), NO Function(), NO dynamic imports.
//   • NO executing user code.
//   • Deterministic normalization only.
// ============================================================================


// ---------------------------------------------------------------------------
// Healing Metadata — deterministic receptor log
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

  lastPayloadVersion: "10.4",
  lastJobType: null,
  lastGpuScore: null,
  lastResourceShape: null,
  lastBandwidthInference: null,

  priceVolatility: 0,
  listingVolatility: 0,

  cycleCount: 0,

  loopTheory: {
    routingCompletion: true,
    allowLoopfieldPropulsion: true,
    pulseComputeContinuity: true,
    errorRouteAround: true
  }
};


// ---------------------------------------------------------------------------
// DETERMINISTIC VAST.AI DNA — replaces all network calls
// ---------------------------------------------------------------------------
const VAST_RECEPTOR_DNA = {
  pingLatency: 42, // deterministic
  offers: [
    {
      id: "vast-001",
      dph_total: 0.12,
      cpu_cores: 4,
      ram_gb: 8,
      gpu_ram: 8,
      net_up: 50
    },
    {
      id: "vast-002",
      dph_total: 0.20,
      cpu_cores: 8,
      ram_gb: 16,
      gpu_ram: 16,
      net_up: 100
    }
  ]
};


// ---------------------------------------------------------------------------
// SAFE GET — deterministic path reader
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
// VOLATILITY — deterministic (no real variance)
// ---------------------------------------------------------------------------
function updateVolatility(jobs) {
  const count = jobs.length;

  healingState.listingVolatility = Math.abs(
    count - (healingState.lastFetchCount || 0)
  );

  // deterministic price variance
  const payouts = jobs.map(j => j.payout);
  if (payouts.length > 1) {
    const avg = payouts.reduce((a, b) => a + b, 0) / payouts.length;
    const variance =
      payouts.reduce((a, b) => a + (b - avg) * (b - avg), 0) / payouts.length;
    healingState.priceVolatility = variance;
  }
}


// ============================================================================
// AUCTIONEER — Vast.ai Marketplace Adapter (v10.4 deterministic)
// ============================================================================
export const PulseEarnMktAuctioneer = {
  id: "vast",
  name: "Vast.ai",

  // -------------------------------------------------------------------------
  // PING — deterministic latency
  // -------------------------------------------------------------------------
  ping() {
    healingState.lastPingMs = VAST_RECEPTOR_DNA.pingLatency;
    healingState.lastPingError = null;
    healingState.cycleCount++;
    return VAST_RECEPTOR_DNA.pingLatency;
  },

  // -------------------------------------------------------------------------
  // FETCH JOBS — deterministic offers
  // -------------------------------------------------------------------------
  fetchJobs() {
    try {
      const offers = VAST_RECEPTOR_DNA.offers || [];

      const jobs = offers
        .map(raw => this.normalizeJob(raw))
        .filter(j => j !== null);

      updateVolatility(jobs);

      healingState.lastFetchError = null;
      healingState.lastFetchCount = jobs.length;
      healingState.cycleCount++;

      return jobs;
    } catch (err) {
      healingState.lastFetchError = err?.message || String(err);
      healingState.lastFetchCount = 0;
      return [];
    }
  },

  // -------------------------------------------------------------------------
  // SUBMIT RESULT — Vast.ai does NOT accept compute results (deterministic)
  // -------------------------------------------------------------------------
  submitResult(job, result) {
    healingState.lastSubmitJobId = job?.id ?? null;
    healingState.lastSubmitError = null;
    healingState.cycleCount++;

    return {
      ok: true,
      marketplace: "vast",
      jobId: job?.id ?? null,
      note: "Vast.ai does not accept compute results. Pulse‑Earn internal only."
    };
  },

  // -------------------------------------------------------------------------
  // NORMALIZE JOB — Vast → Pulse‑Earn schema (deterministic)
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

      healingState.lastJobType = safeGet(raw, "type", "offer");

      const payout = Number(raw.dph_total ?? raw.price_per_hour ?? 0);
      if (!Number.isFinite(payout) || payout <= 0) {
        healingState.lastNormalizationError = "non_positive_payout";
        return null;
      }

      const cpuRequired = Number(raw.cpu_cores ?? 1);
      const memoryRequired = Number(raw.ram_gb ?? 1) * 1024;
      const estimatedSeconds = 3600;

      healingState.lastResourceShape = {
        cpu: cpuRequired,
        mem: memoryRequired,
        duration: estimatedSeconds
      };

      const gpuScore = Number(raw.gpu_ram ?? 8) * 10;
      healingState.lastGpuScore = gpuScore;

      const bandwidth = Number(raw.net_up ?? 5);
      healingState.lastBandwidthInference = bandwidth;

      const normalized = {
        id: String(raw.id),
        marketplaceId: "vast",

        payout,
        cpuRequired,
        memoryRequired,
        estimatedSeconds,

        minGpuScore: gpuScore,
        bandwidthNeededMbps: bandwidth
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
// HEALING STATE EXPORT
// ---------------------------------------------------------------------------
export function getPulseEarnMktAuctioneerHealingState() {
  return { ...healingState };
}
