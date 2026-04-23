// ============================================================================
// FILE: tropic-pulse-functions/apps/pulse-earn/PulseEarnMktForager.js
// LAYER: THE FORAGER (General GPU Compute Harvester) — v11
// ============================================================================
//
// ROLE (v11):
//   THE FORAGER — Pulse‑Earn’s deterministic Salad marketplace receptor.
//   • Represents Salad GPU compute workloads as stable receptor DNA.
//   • Normalizes raw Salad-like tasks into Pulse‑Earn job schema.
//   • Provides deterministic ping(), fetchJobs(), submitResult().
//   • Maintains healing metadata + v11 signatures for Earn healers.
//
// PURPOSE (v11):
//   • Replace all network behavior with deterministic receptor DNA.
//   • Maintain strict protocol boundaries.
//   • Ensure safe, predictable compute job communication.
//
// CONTRACT (v11):
//   • PURE RECEPTOR — no network, no async, no timestamps.
//   • READ‑ONLY except for healing metadata.
//   • NO eval(), NO Function(), NO dynamic imports.
//   • NO executing user code.
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
  return computeHash(`PING::SALAD::${latency}`);
}

function buildFetchSignature(count) {
  return computeHash(`FETCH::SALAD::${count}`);
}

function buildNormalizationSignature(jobId) {
  return computeHash(`NORM::SALAD::${jobId || "NONE"}`);
}

function buildSubmitSignature(jobId) {
  return computeHash(`SUBMIT::SALAD::${jobId || "NONE"}`);
}


// ---------------------------------------------------------------------------
// Healing Metadata — Forager Interaction Log (v11)
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

  lastPayloadVersion: "11-salad-dna",
  lastJobType: null,
  lastGpuTier: null,
  lastResourceShape: null,
  payoutVolatility: 0,
  liquidityScore: 0,
  cycleCount: 0,

  // v11 signatures
  lastPingSignature: null,
  lastFetchSignature: null,
  lastNormalizationSignature: null,
  lastSubmitSignature: null
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


// ---------------------------------------------------------------------------
// DETERMINISTIC SALAD DNA — replaces all network calls
// ---------------------------------------------------------------------------
const SALAD_RECEPTOR_DNA = {
  pingLatency: 55, // deterministic
  jobs: [
    {
      id: "salad-001",
      reward: 0.08,
      cpu: 4,
      memory: 4096,
      estimatedSeconds: 900,
      gpuTier: "mid",
      bandwidth: 20,
      type: "generic-compute"
    },
    {
      id: "salad-002",
      reward: 0.15,
      cpu: 8,
      memory: 8192,
      estimatedSeconds: 1800,
      gpuTier: "high",
      bandwidth: 50,
      type: "ai-task"
    }
  ],
  version: "11",
  lineage: "Forager-Salad-v11",
  phenotype: "MarketplaceReceptor"
};


// ---------------------------------------------------------------------------
// Volatility — deterministic (no real variance)
// ---------------------------------------------------------------------------
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
      payouts.reduce((a, b) => a + (b - avg) * (b - avg), 0) / payouts.length;
    healingState.payoutVolatility = variance;
  }
}


// ---------------------------------------------------------------------------
// FORAGER CLIENT — Salad Marketplace Interface (deterministic, v11)
// ---------------------------------------------------------------------------
export const PulseEarnMktForager = {
  id: "salad",
  name: "Salad Marketplace",
  version: "11",
  lineage: "Forager-Salad-v11",

  // -------------------------------------------------------------------------
  // Ping — deterministic marketplace latency
  // -------------------------------------------------------------------------
  ping() {
    const latency = SALAD_RECEPTOR_DNA.pingLatency;
    healingState.lastPingMs = latency;
    healingState.lastPingError = null;
    healingState.cycleCount++;
    healingState.lastPingSignature = buildPingSignature(latency);
    return latency; // keep v10.4 shape for compatibility
  },

  // -------------------------------------------------------------------------
  // Fetch Jobs — Retrieve deterministic Salad compute tasks
  // -------------------------------------------------------------------------
  fetchJobs() {
    try {
      const data = { jobs: SALAD_RECEPTOR_DNA.jobs };
      healingState.lastPayloadVersion = "11-salad-dna";

      if (!data || !Array.isArray(data.jobs)) {
        healingState.lastFetchError = "invalid_jobs_payload";
        healingState.lastFetchCount = 0;
        healingState.lastFetchSignature = buildFetchSignature(0);
        return [];
      }

      const jobs = data.jobs
        .map(raw => this.normalizeJob(raw))
        .filter(j => j !== null);

      updateVolatility(jobs);

      healingState.lastFetchError = null;
      healingState.lastFetchCount = jobs.length;
      healingState.cycleCount++;
      healingState.lastFetchSignature = buildFetchSignature(jobs.length);
      return jobs;
    } catch (err) {
      healingState.lastFetchError = err.message;
      healingState.lastFetchCount = 0;
      healingState.lastFetchSignature = buildFetchSignature(0);
      return [];
    }
  },

  // -------------------------------------------------------------------------
  // Submit Result — Return completed outputs (deterministic stub)
// -------------------------------------------------------------------------
  submitResult(job, result) {
    const jobId = job?.id ?? null;
    healingState.lastSubmitJobId = jobId;
    healingState.lastSubmitError = null;
    healingState.cycleCount++;
    healingState.lastSubmitSignature = buildSubmitSignature(jobId);

    return {
      ok: true,
      marketplace: "salad",
      jobId,
      note: "Salad submission simulated deterministically in v11.",
      result
    };
  },

  // -------------------------------------------------------------------------
  // Normalize Job — Convert Salad job → Pulse‑Earn job schema
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

      const payout = Number(raw.reward ?? raw.payout ?? 0);
      if (!Number.isFinite(payout) || payout <= 0) {
        healingState.lastNormalizationError = "non_positive_payout";
        healingState.lastNormalizationSignature = buildNormalizationSignature(null);
        return null;
      }

      const cpuRequired = Number(raw.cpu ?? 2);
      const memoryRequired = Number(raw.memory ?? 2048);
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
        bandwidthNeededMbps
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
// Healing State Export — Forager Interaction Log
// ---------------------------------------------------------------------------
export function getPulseEarnMktForagerHealingState() {
  return { ...healingState };
}
