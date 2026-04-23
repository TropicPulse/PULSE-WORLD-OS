// ============================================================================
// FILE: tropic-pulse-functions/apps/pulse-earn/PulseEarnMktAuctioneer-v11-Evo.js
// LAYER: THE AUCTIONEER (v11-Evo)
// (Bid‑Floor Interpreter + Volatility Handler + Market Chaos Normalizer)
// ============================================================================
//
// ROLE (v11-Evo):
//   THE AUCTIONEER — deterministic Vast.ai receptor phenotype.
//   • Provides a stable, drift‑proof representation of Vast.ai offers.
//   • Normalizes inconsistent metadata into Pulse‑Earn job schema.
//   • Supplies deterministic ping(), fetchJobs(), submitResult().
//   • Emits v11‑Evo signatures for all receptor actions.
//
// CONTRACT (v11-Evo):
//   • PURE RECEPTOR — no network, no async, no timestamps.
//   • READ‑ONLY except for healing metadata.
//   • NO eval(), NO Function(), NO dynamic imports.
//   • NO executing user code.
//   • Deterministic normalization only.
// ============================================================================


// ============================================================================
// Healing Metadata — deterministic receptor log (v11-Evo)
// ============================================================================
const healingState = {
  lastPingMs: null,
  lastPingError: null,

  lastFetchCount: 0,
  lastFetchError: null,

  lastSubmitJobId: null,
  lastSubmitError: null,

  lastNormalizedJobId: null,
  lastNormalizationError: null,

  lastPayloadVersion: "11-Evo",
  lastJobType: null,
  lastGpuScore: null,
  lastResourceShape: null,
  lastBandwidthInference: null,

  priceVolatility: 0,
  listingVolatility: 0,

  cycleCount: 0,

  lastPingSignature: null,
  lastFetchSignature: null,
  lastNormalizationSignature: null,
  lastSubmitSignature: null,
  lastAuctioneerCycleSignature: null
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
// Signature Builders — v11-Evo
// ============================================================================
function buildPingSignature(latency) {
  return computeHash(`PING::${latency}`);
}

function buildFetchSignature(count) {
  return computeHash(`FETCH::${count}`);
}

function buildNormalizationSignature(jobId) {
  return computeHash(`NORM::${jobId || "NONE"}`);
}

function buildSubmitSignature(jobId) {
  return computeHash(`SUBMIT::${jobId || "NONE"}`);
}

function buildAuctioneerCycleSignature(cycle) {
  return computeHash(`AUCTIONEER_CYCLE::${cycle}`);
}


// ============================================================================
// SAFE GET — deterministic path reader
// ============================================================================
function safeGet(obj, path, fallback = null) {
  try {
    return path
      .split(".")
      .reduce((o, k) => (o && o[k] !== undefined ? o[k] : null), obj) ?? fallback;
  } catch {
    return fallback;
  }
}


// ============================================================================
// DETERMINISTIC VAST.AI DNA — v11-Evo
// ============================================================================
const VAST_RECEPTOR_DNA = {
  pingLatency: 42,

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
  ],

  version: "11-Evo",
  lineage: "Auctioneer-Vast-v11-Evo",
  phenotype: "MarketplaceAuctioneer"
};


// ============================================================================
// Deterministic Cycle Counter
// ============================================================================
let auctioneerCycle = 0;


// ============================================================================
// VOLATILITY — deterministic (no real variance)
// ============================================================================
function updateVolatility(jobs) {
  const count = jobs.length;

  healingState.listingVolatility = Math.abs(
    count - (healingState.lastFetchCount || 0)
  );

  const payouts = jobs.map(j => j.payout);
  if (payouts.length > 1) {
    const avg = payouts.reduce((a, b) => a + b, 0) / payouts.length;
    const variance =
      payouts.reduce((a, b) => a + (b - avg) * (b - avg), 0) / payouts.length;
    healingState.priceVolatility = variance;
  }
}


// ============================================================================
// AUCTIONEER — Vast.ai Marketplace Adapter (v11-Evo)
// ============================================================================
export const PulseEarnMktAuctioneer = {
  id: "vast",
  name: "Vast.ai",
  version: "11-Evo",
  lineage: "Auctioneer-Vast-v11-Evo",

  // -------------------------------------------------------------------------
  // PING — deterministic latency
  // -------------------------------------------------------------------------
  ping() {
    auctioneerCycle++;
    healingState.cycleCount++;

    const latency = VAST_RECEPTOR_DNA.pingLatency;

    healingState.lastPingMs = latency;
    healingState.lastPingError = null;
    healingState.lastPingSignature = buildPingSignature(latency);
    healingState.lastAuctioneerCycleSignature =
      buildAuctioneerCycleSignature(auctioneerCycle);

    return {
      latency,
      signature: healingState.lastPingSignature
    };
  },

  // -------------------------------------------------------------------------
  // FETCH JOBS — deterministic offers
  // -------------------------------------------------------------------------
  fetchJobs() {
    auctioneerCycle++;
    healingState.cycleCount++;

    try {
      const offers = VAST_RECEPTOR_DNA.offers || [];

      const jobs = offers
        .map(raw => this.normalizeJob(raw))
        .filter(j => j !== null);

      updateVolatility(jobs);

      healingState.lastFetchError = null;
      healingState.lastFetchCount = jobs.length;
      healingState.lastFetchSignature = buildFetchSignature(jobs.length);
      healingState.lastAuctioneerCycleSignature =
        buildAuctioneerCycleSignature(auctioneerCycle);

      return jobs;

    } catch (err) {
      healingState.lastFetchError = err?.message || String(err);
      healingState.lastFetchCount = 0;
      healingState.lastFetchSignature = buildFetchSignature(0);
      return [];
    }
  },

  // -------------------------------------------------------------------------
  // SUBMIT RESULT — Vast.ai does NOT accept compute results
  // -------------------------------------------------------------------------
  submitResult(job, result) {
    auctioneerCycle++;
    healingState.cycleCount++;

    const jobId = job?.id ?? null;

    healingState.lastSubmitJobId = jobId;
    healingState.lastSubmitError = null;
    healingState.lastSubmitSignature = buildSubmitSignature(jobId);
    healingState.lastAuctioneerCycleSignature =
      buildAuctioneerCycleSignature(auctioneerCycle);

    return {
      ok: true,
      marketplace: "vast",
      jobId,
      result,
      signature: healingState.lastSubmitSignature,
      note: "Vast.ai does not accept compute results (v11-Evo deterministic)."
    };
  },

  // -------------------------------------------------------------------------
  // NORMALIZE JOB — Vast → Pulse‑Earn schema (deterministic)
  // -------------------------------------------------------------------------
  normalizeJob(raw) {
    try {
      if (!raw || typeof raw !== "object") {
        healingState.lastNormalizationError = "invalid_raw_job";
        healingState.lastNormalizationSignature =
          buildNormalizationSignature(null);
        return null;
      }

      if (!raw.id) {
        healingState.lastNormalizationError = "missing_id";
        healingState.lastNormalizationSignature =
          buildNormalizationSignature(null);
        return null;
      }

      healingState.lastJobType = safeGet(raw, "type", "offer");

      const payout = Number(raw.dph_total ?? raw.price_per_hour ?? 0);
      if (!Number.isFinite(payout) || payout <= 0) {
        healingState.lastNormalizationError = "non_positive_payout";
        healingState.lastNormalizationSignature =
          buildNormalizationSignature(null);
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
      healingState.lastNormalizationSignature =
        buildNormalizationSignature(normalized.id);

      return normalized;

    } catch (err) {
      healingState.lastNormalizationError = err.message;
      healingState.lastNormalizationSignature =
        buildNormalizationSignature(null);
      return null;
    }
  }
};


// ============================================================================
// HEALING STATE EXPORT — v11-Evo
// ============================================================================
export function getPulseEarnMktAuctioneerHealingState() {
  return { ...healingState };
}
