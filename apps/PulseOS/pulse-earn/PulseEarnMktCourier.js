// ============================================================================
// FILE: tropic-pulse-functions/apps/pulse-earn/PulseEarnMktCourier.js
// LAYER: THE COURIER (v11)
// (Fast‑Turnaround Compute Runner + Job Delivery Agent — Deterministic)
// ============================================================================
//
// ROLE (v11):
//   THE COURIER — Pulse‑Earn’s deterministic Spheron marketplace receptor.
//   • Represents Spheron compute jobs as stable receptor DNA.
//   • Normalizes raw Spheron-like tasks into Pulse‑Earn job schema.
//   • Provides deterministic ping(), fetchJobs(), submitResult().
//   • Maintains healing metadata + v11 signatures for Earn healers.
//
// CONTRACT (v11):
//   • PURE RECEPTOR — no network, no async, no timestamps.
//   • READ‑ONLY except for healing metadata.
//   • Deterministic normalization only.
// ============================================================================


// ---------------------------------------------------------------------------
// Deterministic Hash Helper — v11
// ---------------------------------------------------------------------------
function computeHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `h${h}`;
}

function buildPingSignature(latency) {
  return computeHash(`PING::SPHERON::${latency}`);
}

function buildFetchSignature(count) {
  return computeHash(`FETCH::SPHERON::${count}`);
}

function buildNormalizationSignature(jobId) {
  return computeHash(`NORM::SPHERON::${jobId || "NONE"}`);
}

function buildSubmitSignature(jobId) {
  return computeHash(`SUBMIT::SPHERON::${jobId || "NONE"}`);
}

function buildCourierCycleSignature(cycle) {
  return computeHash(`COURIER_CYCLE::${cycle}`);
}


// ---------------------------------------------------------------------------
// Healing Metadata — Courier Interaction Log (deterministic, v11)
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

  lastPayloadVersion: "11-spheron-dna",
  lastJobType: null,
  lastResourceShape: null,
  lastGpuFlag: null,
  liquidityScore: 0,
  payoutVolatility: 0,

  cycleCount: 0,
  lastCycleIndex: null,

  // v11 signatures
  lastPingSignature: null,
  lastFetchSignature: null,
  lastNormalizationSignature: null,
  lastSubmitSignature: null,
  lastCourierCycleSignature: null
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
  ],
  version: "11",
  lineage: "Courier-Spheron-v11",
  phenotype: "MarketplaceReceptor"
};


// ---------------------------------------------------------------------------
// COURIER CLIENT — Deterministic Spheron Interface (v11)
// ---------------------------------------------------------------------------
export const PulseEarnMktCourier = {
  id: "spheron",
  name: "Spheron Compute",
  version: "11",
  lineage: "Courier-Spheron-v11",

  // -------------------------------------------------------------------------
  // Ping — Deterministic courier route latency
  // -------------------------------------------------------------------------
  ping() {
    courierCycle++;
    healingState.cycleCount++;
    healingState.lastCycleIndex = courierCycle;

    const latency = SPHERON_RECEPTOR_DNA.pingLatency;

    healingState.lastPingMs = latency;
    healingState.lastPingError = null;
    healingState.lastPingSignature = buildPingSignature(latency);
    healingState.lastCourierCycleSignature = buildCourierCycleSignature(courierCycle);

    // v11: structured ping result
    return {
      latency,
      signature: healingState.lastPingSignature
    };
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
      healingState.lastPayloadVersion = "11-spheron-dna";

      if (!data || !Array.isArray(data.jobs)) {
        healingState.lastFetchError = "invalid_jobs_payload";
        healingState.lastFetchCount = 0;
        healingState.lastFetchSignature = buildFetchSignature(0);
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
      healingState.lastFetchSignature = buildFetchSignature(jobs.length);
      healingState.lastCourierCycleSignature = buildCourierCycleSignature(courierCycle);

      return jobs;

    } catch (err) {
      healingState.lastFetchError = err.message;
      healingState.lastFetchCount = 0;
      healingState.lastFetchSignature = buildFetchSignature(0);
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

    const jobId = job?.id ?? null;

    healingState.lastSubmitJobId = jobId;
    healingState.lastSubmitError = null;
    healingState.lastSubmitSignature = buildSubmitSignature(jobId);
    healingState.lastCourierCycleSignature = buildCourierCycleSignature(courierCycle);

    return {
      ok: true,
      marketplace: "spheron",
      jobId,
      cycleIndex: courierCycle,
      signature: healingState.lastSubmitSignature,
      note: "Spheron submission simulated deterministically in v11.",
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
        healingState.lastNormalizationSignature = buildNormalizationSignature(null);
        return null;
      }
      if (!raw.id) {
        healingState.lastNormalizationError = "missing_id";
        healingState.lastNormalizationSignature = buildNormalizationSignature(null);
        return null;
      }

      healingState.lastJobType = safeGet(raw, "type", "unknown");

      const payout = Number(raw.payout ?? 0);
      if (!Number.isFinite(payout) || payout <= 0) {
        healingState.lastNormalizationError = "non_positive_payout";
        healingState.lastNormalizationSignature = buildNormalizationSignature(null);
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
        healingState.lastNormalizationSignature = buildNormalizationSignature(null);
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
      healingState.lastNormalizationSignature =
        buildNormalizationSignature(normalized.id);

      return normalized;

    } catch (err) {
      healingState.lastNormalizationError = err.message;
      healingState.lastNormalizationSignature = buildNormalizationSignature(null);
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
