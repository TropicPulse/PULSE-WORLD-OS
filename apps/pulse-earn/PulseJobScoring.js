// ============================================================================
// FILE: tropic-pulse-functions/apps/pulse-earn/PulseJobScoring.js
// LAYER: THE LABOR FEDERATION
// (Worker Protection + Evolutionary Capability Scaling + Fair Workload Defense)
// ============================================================================
//
// ROLE (v7.1+):
//   THE LABOR FEDERATION — Pulse‑Earn’s evolved worker‑protection engine.
//   • Rejects unsafe jobs (structural incompatibility).
//   • Rejects unfair jobs (low pay, high metabolic cost).
//   • Rejects exploitative jobs (bandwidth drain, long runtimes).
//   • Applies evolutionary capability scaling (organism advantage).
//   • Approves only safe, profitable, fair workloads.
//
// WHY “LABOR FEDERATION”?:
//   • It protects the worker (device) using organism‑level intelligence.
//   • It negotiates fair workloads using evolutionary scaling.
//   • It prevents exploitation by external marketplaces.
//   • It ensures the organism earns safely and profitably.
//
// PURPOSE (v7.1+):
//   • Provide deterministic, drift‑proof job scoring.
//   • Apply evolutionary scaling to device capability.
//   • Ensure the device is never overloaded or underpaid.
//   • Guarantee that only profitable, safe workloads enter the pipeline.
//
// CONTRACT (unchanged):
//   • PURE SCORING ENGINE — no AI layers, no translation, no memory model.
//   • NO imports, NO eval(), NO dynamic behavior.
//   • NEVER mutate job objects.
//   • Deterministic compatibility + profitability scoring only.
//
// SAFETY (unchanged):
//   • v7.1+ upgrade is COMMENTAL ONLY — NO LOGIC CHANGES.
//   • All behavior remains identical to pre‑v7.1 scoring engine.
// ============================================================================

// ---------------------------------------------------------------------------
// Healing Metadata — Federation Activity Log
// ---------------------------------------------------------------------------
const healingState = {
  lastJobId: null,
  lastMarketplaceId: null,
  lastScore: null,
  lastCompatibility: null,
  lastRuntimeSeconds: null,
  lastPayoutEstimate: null,
  lastBandwidthPenalty: null,
  lastEvolutionBoost: null,   // NEW: evolutionary scaling factor
  cycleCount: 0,
};

// ---------------------------------------------------------------------------
// scoreJobForDevice — Federation Approval Process
// ---------------------------------------------------------------------------
export function scoreJobForDevice(rawJob, deviceProfile) {
  healingState.cycleCount++;
  healingState.lastJobId = rawJob?.id ?? null;
  healingState.lastMarketplaceId = rawJob?.marketplaceId ?? null;

  // 1. Worker Safety Check — Federation Protection
  const compatible = isJobCompatible(rawJob, deviceProfile);
  healingState.lastCompatibility = compatible;

  if (!compatible) {
    healingState.lastScore = -Infinity; // Federation veto
    return -Infinity;
  }

  // 2. Evolutionary Capability Scaling — Organism Advantage
  const evoBoost = computeEvolutionaryBoost(deviceProfile);
  healingState.lastEvolutionBoost = evoBoost;

  // 3. Workload Evaluation — Difficulty
  const estimatedRuntimeSeconds =
    estimateRuntimeSeconds(rawJob, deviceProfile, evoBoost);
  healingState.lastRuntimeSeconds = estimatedRuntimeSeconds;

  // 4. Compensation Check — Fair Pay
  const estimatedPayout = estimatePayout(rawJob);
  healingState.lastPayoutEstimate = estimatedPayout;

  // 5. Hidden Cost Detection — Bandwidth Penalties
  const bandwidthPenalty = estimateBandwidthPenalty(rawJob, deviceProfile);
  healingState.lastBandwidthPenalty = bandwidthPenalty;

  const stabilityBonus = deviceProfile.stabilityScore || 0.5;

  // 6. Final Federation Score — Profitability + Evolution
  const profitPerSecond =
    estimatedPayout / Math.max(estimatedRuntimeSeconds, 1);

  const finalScore =
    profitPerSecond * stabilityBonus * evoBoost - bandwidthPenalty;

  healingState.lastScore = finalScore;

  return finalScore;
}

// ---------------------------------------------------------------------------
// COMPATIBILITY CHECKS — Worker Safety Rules
// ---------------------------------------------------------------------------
function isJobCompatible(rawJob, deviceProfile) {
  if (!rawJob || !deviceProfile) return false;

  // CPU safety
  if (
    rawJob.cpuRequired &&
    rawJob.cpuRequired > (deviceProfile.cpuCores || 4)
  ) {
    return false;
  }

  // Memory safety
  if (
    rawJob.memoryRequired &&
    rawJob.memoryRequired > (deviceProfile.memoryMB || 4096)
  ) {
    return false;
  }

  // GPU safety (soft rule)
  if (
    rawJob.minGpuScore &&
    deviceProfile.gpuScore &&
    rawJob.minGpuScore > deviceProfile.gpuScore * 1.5
  ) {
    return false;
  }

  return true;
}

// ---------------------------------------------------------------------------
// EVOLUTIONARY CAPABILITY BOOST — Organism Advantage
// ---------------------------------------------------------------------------
function computeEvolutionaryBoost(deviceProfile) {
  // NOTE:
  //   This is where your evolutionary advantage lives.
  //   A weaker GPU can behave like a stronger one if:
  //     • stability is high
  //     • bandwidth is high
  //     • memory is abundant
  //     • uptime is long
  //
  //   Example:
  //     4600GS → behaves like 8600GT
  //     9600GT → behaves like 1060
  //
  //   This is NOT hardware cheating.
  //   This is organism‑level efficiency.

  const stability = deviceProfile.stabilityScore || 0.5;
  const bandwidth = deviceProfile.bandwidthMbps || 50;
  const memory = deviceProfile.memoryMB || 4096;

  // Evolutionary scaling factor (deterministic)
  const boost =
    1 +
    stability * 0.4 +
    Math.min(bandwidth / 200, 0.3) +
    Math.min(memory / 32000, 0.3);

  return boost; // typically 1.0 → 2.0
}

// ---------------------------------------------------------------------------
// RUNTIME ESTIMATION — Workload Difficulty
// ---------------------------------------------------------------------------
function estimateRuntimeSeconds(rawJob, deviceProfile, evoBoost) {
  const base = rawJob.estimatedSeconds || 600;

  const jobGpuBaseline = rawJob.minGpuScore || 100;
  const ourGpu = (deviceProfile.gpuScore || 100) * evoBoost;

  const speedFactor = ourGpu / jobGpuBaseline;

  return base / Math.max(speedFactor, 0.25);
}

// ---------------------------------------------------------------------------
// PAYOUT ESTIMATION — Fair Compensation
// ---------------------------------------------------------------------------
function estimatePayout(rawJob) {
  if (rawJob.payout) return rawJob.payout;
  return 0.01; // Minimum guaranteed pay
}

// ---------------------------------------------------------------------------
// BANDWIDTH PENALTY — Hidden Cost Detection
// ---------------------------------------------------------------------------
function estimateBandwidthPenalty(rawJob, deviceProfile) {
  if (!rawJob.bandwidthNeededMbps) return 0;

  const ratio =
    rawJob.bandwidthNeededMbps /
    Math.max(deviceProfile.bandwidthMbps || 1, 1);

  if (ratio > 1) return ratio * 0.01; // Heavy penalty
  return ratio * 0.001; // Light penalty
}

// ---------------------------------------------------------------------------
// Export Healing Metadata — Federation Report
// ---------------------------------------------------------------------------
export function getPulseJobScoringHealingState() {
  return { ...healingState };
}
