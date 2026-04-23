// ============================================================================
// FILE: tropic-pulse-functions/apps/pulse-earn/PulseEarnMktAmbassador.js
// LAYER: THE AMBASSADOR (v10.4)
// (Marketplace Liaison + External Negotiator — Deterministic Receptor DNA)
// ============================================================================
//
// ROLE (v10.4):
//   THE AMBASSADOR — Pulse‑Earn’s deterministic interface to the Akash Network.
//   • Represents Akash leases as stable receptor DNA.
//   • Normalizes raw Akash-like tasks into Pulse‑Earn job schema.
//   • Provides deterministic ping(), fetchJobs(), submitResult().
//   • Tracks healing metadata for Earn healers.
//
// CONTRACT (v10.4):
//   • PURE RECEPTOR — no network, no async, no timestamps.
//   • READ‑ONLY except for healing metadata.
//   • NO eval(), NO Function(), NO dynamic imports.
//   • NO executing user code.
//   • Deterministic normalization only.
// ============================================================================


// ---------------------------------------------------------------------------
// Healing Metadata — Ambassador Interaction Log (deterministic)
// ---------------------------------------------------------------------------
const ambassadorHealing = {
  lastPingMs: null,
  lastPingError: null,
  lastFetchCount: 0,
  lastFetchError: null,
  lastSubmitJobId: null,
  lastSubmitError: null,
  lastNormalizedJobId: null,
  lastNormalizationError: null,
  lastLeaseState: null,
  lastPayloadVersion: null,
  lastResourceShape: null,
  cycleCount: 0
};

// Deterministic cycle counter
let ambassadorCycle = 0;


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

const VALID_LEASE_STATES = new Set([
  "active",
  "open",
  "insufficient_funds",
  "closed",
  "unknown"
]);


// ---------------------------------------------------------------------------
// DETERMINISTIC AKASH RECEPTOR DNA (replaces network calls)
// ---------------------------------------------------------------------------
const AKASH_RECEPTOR_DNA = {
  pingLatency: 87, // deterministic
  leases: [
    {
      id: "akash-001",
      state: "active",
      price: { amount: 0.12 },
      resources: {
        cpu: { units: 4 },
        memory: { quantity: 4096 },
        gpu: null
      },
      duration: 1200
    },
    {
      id: "akash-002",
      state: "open",
      price: { amount: 0.20 },
      resources: {
        cpu: { units: 8 },
        memory: { quantity: 8192 },
        gpu: { units: 1 }
      },
      duration: 2400
    }
  ]
};


// ---------------------------------------------------------------------------
// AMBASSADOR CLIENT — Deterministic Akash Marketplace Interface
// ---------------------------------------------------------------------------
export const PulseEarnMktAmbassador = {
  id: "akash",
  name: "Akash Network",

  // -------------------------------------------------------------------------
  // Ping — Deterministic Diplomatic Channel Latency
  // -------------------------------------------------------------------------
  ping() {
    ambassadorCycle++;
    ambassadorHealing.cycleCount++;

    ambassadorHealing.lastPingMs = AKASH_RECEPTOR_DNA.pingLatency;
    ambassadorHealing.lastPingError = null;

    return AKASH_RECEPTOR_DNA.pingLatency;
  },

  // -------------------------------------------------------------------------
  // Fetch Jobs — Deterministic Lease Retrieval
  // -------------------------------------------------------------------------
  fetchJobs() {
    ambassadorCycle++;
    ambassadorHealing.cycleCount++;

    try {
      const data = { leases: AKASH_RECEPTOR_DNA.leases };
      ambassadorHealing.lastPayloadVersion = "10.4-akash-dna";

      if (!data || !Array.isArray(data.leases)) {
        ambassadorHealing.lastFetchError = "invalid_leases_payload";
        ambassadorHealing.lastFetchCount = 0;
        return [];
      }

      const jobs = data.leases
        .map(raw => this.normalizeJob(raw))
        .filter(j => j !== null);

      ambassadorHealing.lastFetchError = null;
      ambassadorHealing.lastFetchCount = jobs.length;

      return jobs;

    } catch (err) {
      ambassadorHealing.lastFetchError = err.message;
      ambassadorHealing.lastFetchCount = 0;
      return [];
    }
  },

  // -------------------------------------------------------------------------
  // Submit Result — Deterministic Certified Marketplace Dispatch
  // -------------------------------------------------------------------------
  submitResult(job, result) {
    ambassadorCycle++;
    ambassadorHealing.cycleCount++;
    ambassadorHealing.lastSubmitJobId = job?.id ?? null;

    ambassadorHealing.lastSubmitError = null;

    return {
      ok: true,
      marketplace: "akash",
      jobId: job?.id ?? null,
      note: "Akash submission simulated deterministically in v10.4.",
      result
    };
  },

  // -------------------------------------------------------------------------
  // Normalize Job — Convert Akash Lease → Pulse‑Earn Job (deterministic)
  // -------------------------------------------------------------------------
  normalizeJob(raw) {
    try {
      if (!raw || typeof raw !== "object") {
        ambassadorHealing.lastNormalizationError = "invalid_raw_lease";
        return null;
      }

      const leaseState = safeGet(raw, "state", "unknown");
      ambassadorHealing.lastLeaseState =
        VALID_LEASE_STATES.has(leaseState) ? leaseState : "unknown";

      if (!raw.id) {
        ambassadorHealing.lastNormalizationError = "missing_id";
        return null;
      }

      const payout = Number(safeGet(raw, "price.amount", 0));
      if (!Number.isFinite(payout) || payout <= 0) {
        ambassadorHealing.lastNormalizationError = "non_positive_payout";
        return null;
      }

      const cpuRequired = Number(safeGet(raw, "resources.cpu.units", 1));
      const memoryRequired = Number(safeGet(raw, "resources.memory.quantity", 1024));
      const estimatedSeconds = Number(safeGet(raw, "duration", 600));

      ambassadorHealing.lastResourceShape = {
        cpu: cpuRequired,
        mem: memoryRequired,
        duration: estimatedSeconds
      };

      if (!Number.isFinite(estimatedSeconds) || estimatedSeconds <= 0) {
        ambassadorHealing.lastNormalizationError = "non_positive_duration";
        return null;
      }

      const hasGpu = !!safeGet(raw, "resources.gpu", null);

      const normalized = {
        id: String(raw.id),
        marketplaceId: "akash",

        payout,
        cpuRequired,
        memoryRequired,
        estimatedSeconds,

        minGpuScore: hasGpu ? 300 : 100,
        bandwidthNeededMbps: 5
      };

      ambassadorHealing.lastNormalizedJobId = normalized.id;
      ambassadorHealing.lastNormalizationError = null;

      return normalized;

    } catch (err) {
      ambassadorHealing.lastNormalizationError = err.message;
      return null;
    }
  }
};


// ---------------------------------------------------------------------------
// Healing State Export — Ambassador Interaction Log
// ---------------------------------------------------------------------------
export function getPulseEarnMktAmbassadorHealingState() {
  return { ...ambassadorHealing };
}
