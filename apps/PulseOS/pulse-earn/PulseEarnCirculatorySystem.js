// ============================================================================
// FILE: tropic-pulse-functions/apps/pulse-earn/PulseEarnCirculatorySystem-v11-Evo.js
// LAYER: THE CIRCULATORY SYSTEM (v11-Evo)
// (Deterministic Reflex + Routing + Weighting)
// ============================================================================
//
// ROLE (v11-Evo):
//   THE CIRCULATORY SYSTEM — Pulse‑Earn’s autonomic routing center.
//   • Evaluates marketplaces deterministically (no real ping).
//   • Filters unhealthy ones using deterministic healthScore.
//   • Fetches jobs deterministically (no async, no network).
//   • Applies reputation weighting (synaptic strength).
//   • Selects the best job for the device (autonomic prioritization).
//   • Emits v11‑Evo routing signatures.
//
// PURPOSE (v11-Evo):
//   • Provide deterministic, drift‑proof job routing.
//   • Guarantee safe multi‑marketplace discovery.
//   • Maintain healing metadata for the Immune System.
//   • Preserve autonomic routing + synaptic weighting.
//
// CONTRACT (v11-Evo):
//   • PURE ROUTER — no AI layers, no translation, no memory model.
//   • READ‑ONLY except for healing metadata.
//   • NO eval(), NO Function(), NO dynamic imports.
//   • NO executing user code.
//   • NO timestamps, NO randomness, NO async.
//   • Deterministic job selection only.
// ============================================================================


// ============================================================================
// Healing Metadata — Circulatory Reflex Log (v11-Evo)
// ============================================================================
const circulatoryHealing = {
  lastHealthError: null,
  lastFetchError: null,
  lastSelectionError: null,

  lastHealthyMarketplaces: [],
  lastJobsFetched: 0,
  lastBestJobId: null,

  cycleCount: 0,

  lastHealthSignature: null,
  lastJobListSignature: null,
  lastSelectionSignature: null,
  lastRoutingCycleSignature: null
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
function buildHealthSignature(list) {
  return computeHash(`HEALTH::${list.join(",")}`);
}

function buildJobListSignature(count) {
  return computeHash(`JOBS::${count}`);
}

function buildSelectionSignature(jobId) {
  return computeHash(`SELECT::${jobId || "NONE"}`);
}

function buildRoutingCycleSignature(cycle) {
  return computeHash(`ROUTE_CYCLE::${cycle}`);
}


// ============================================================================
// Deterministic Marketplace Health Evaluation (NO NETWORK)
// ============================================================================
function evaluateMarketplaceHealth(marketplace) {
  const h = typeof marketplace.healthScore === "number"
    ? marketplace.healthScore
    : 1.0;

  if (h >= 0.95) return "healthy";
  if (h >= 0.85) return "soft";
  if (h >= 0.50) return "mid";
  if (h >= 0.15) return "hard";
  return "critical";
}


// ============================================================================
// 1. discoverHealthyMarketplaces — Deterministic Sensory Reflex
// ============================================================================
export function discoverHealthyMarketplaces(marketplaces) {
  circulatoryHealing.cycleCount++;

  try {
    const healthy = [];

    for (const m of marketplaces) {
      const tier = evaluateMarketplaceHealth(m);
      if (tier === "healthy" || tier === "soft") {
        healthy.push(m);
      }
    }

    const ids = healthy.map(m => m.id);
    circulatoryHealing.lastHealthyMarketplaces = ids;
    circulatoryHealing.lastHealthSignature = buildHealthSignature(ids);

    return healthy;

  } catch (err) {
    circulatoryHealing.lastHealthError = err.message;
    return [];
  }
}


// ============================================================================
// 2. fetchJobsFromMarketplaces — Deterministic Intake
// ============================================================================
export function fetchJobsFromMarketplaces(marketplaces) {
  try {
    const allJobs = [];

    for (const m of marketplaces) {
      const jobs = Array.isArray(m.jobs) ? m.jobs : [];

      for (const j of jobs) {
        allJobs.push({
          ...j,
          marketplaceId: m.id
        });
      }
    }

    circulatoryHealing.lastJobsFetched = allJobs.length;
    circulatoryHealing.lastJobListSignature = buildJobListSignature(allJobs.length);

    return allJobs;

  } catch (err) {
    circulatoryHealing.lastFetchError = err.message;
    return [];
  }
}


// ============================================================================
// INTERNAL: Deterministic Device Profile (v11-Evo)
// ============================================================================
function getDeviceProfile() {
  return {
    cpuCores: 8,
    memoryMB: 16384,
    gpuScore: 600
  };
}


// ============================================================================
// INTERNAL: Deterministic Job Capability Scoring (v11-Evo)
// ============================================================================
function scoreJobForDevice(job, device) {
  const cpu = job.cpuRequired ?? 0;
  const mem = job.memoryRequired ?? 0;

  const cpuScore = device.cpuCores >= cpu ? 1 : 0.2;
  const memScore = device.memoryMB >= mem ? 1 : 0.2;

  return (cpuScore + memScore) / 2;
}


// ============================================================================
// 3. selectBestJob — Deterministic Autonomic Prioritization
// ============================================================================
export function selectBestJob(jobs) {
  try {
    const device = getDeviceProfile();

    let bestJob = null;
    let bestScore = -Infinity;

    for (const job of jobs) {
      if (!job.id || !job.marketplaceId) continue;

      const capabilityScore = scoreJobForDevice(job, device);
      const rep = job.reputationWeight ?? 0.5;

      const finalScore = capabilityScore * (0.5 + rep);

      if (finalScore > bestScore) {
        bestScore = finalScore;
        bestJob = job;
      }
    }

    if (bestJob) {
      circulatoryHealing.lastBestJobId = bestJob.id;
      circulatoryHealing.lastSelectionSignature = buildSelectionSignature(bestJob.id);
    }

    return bestJob;

  } catch (err) {
    circulatoryHealing.lastSelectionError = err.message;
    return null;
  }
}


// ============================================================================
// 4. getNextJob — Full Autonomic Routing Cycle (Deterministic)
// ============================================================================
export function getNextJob(allMarketplaces, getMarketplaceReputation) {
  try {
    const healthy = discoverHealthyMarketplaces(allMarketplaces);
    if (healthy.length === 0) return null;

    const jobs = fetchJobsFromMarketplaces(healthy);
    if (jobs.length === 0) return null;

    const weightedJobs = jobs.map(job => {
      const rep = getMarketplaceReputation(job.marketplaceId);
      return { ...job, reputationWeight: rep };
    });

    const best = selectBestJob(weightedJobs);

    circulatoryHealing.lastRoutingCycleSignature =
      buildRoutingCycleSignature(circulatoryHealing.cycleCount);

    return best;

  } catch (err) {
    circulatoryHealing.lastSelectionError = err.message;
    return null;
  }
}


// ============================================================================
// Export Healing Metadata — Circulatory Reflex Report (v11-Evo)
// ============================================================================
export function getPulseEarnCirculatorySystemHealingState() {
  return { ...circulatoryHealing };
}
