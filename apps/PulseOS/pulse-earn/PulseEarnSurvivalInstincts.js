// ============================================================================
// FILE: tropic-pulse-functions/apps/pulse-earn/PulseEarnSurvivalInstincts.js
// LAYER: THE SURVIVAL INSTINCTS (v10.4)
// (Worker Protection + Evolutionary Scaling + Fair Workload Defense)
// ============================================================================
//
// ROLE (v10.4):
//   THE SURVIVAL INSTINCTS — Pulse‑Earn’s evolved worker‑protection engine.
//   • Rejects unsafe jobs (structural incompatibility).
//   • Rejects unfair jobs (low pay, high metabolic cost).
//   • Rejects exploitative jobs (bandwidth drain, long runtimes).
//   • Applies deterministic evolutionary capability scaling.
//   • Approves only safe, profitable, fair workloads.
//
// PURPOSE (v10.4):
//   • Provide deterministic, drift‑proof job scoring.
//   • Apply evolutionary scaling to device capability.
//   • Ensure the device is never overloaded or underpaid.
//   • Guarantee that only profitable, safe workloads enter the pipeline.
//
// CONTRACT (v10.4):
//   • PURE SCORING ENGINE — no AI layers, no translation, no memory model.
//   • NO imports, NO eval(), NO dynamic behavior.
//   • NEVER mutate job objects.
//   • Deterministic compatibility + profitability scoring only.
//   • NO timestamps, NO randomness.
// ============================================================================


// ---------------------------------------------------------------------------
// Healing Metadata — Survival Instinct Activity Log
// ---------------------------------------------------------------------------
const survivalHealing = {
  lastJobId: null,
  lastMarketplaceId: null,
  lastScore: null,
  lastCompatibility: null,
  lastRuntimeSeconds: null,
  lastPayoutEstimate: null,
  lastBandwidthPenalty: null,
  lastEvolutionBoost: null,
  lastTier: null,
  cycleCount: 0,

  loopTheory: {
    routingCompletion: true,
    allowLoopfieldPropulsion: true,
    pulseComputeContinuity: true,
    errorRouteAround: true
  }
};


// ---------------------------------------------------------------------------
// Degradation Tier — aligned with Router v10.4
// ---------------------------------------------------------------------------
function classifyDegradationTier(healthScore) {
  const h = typeof healthScore === "number" ? healthScore : 1.0;

  if (h >= 0.95) return "microDegrade";
  if (h >= 0.85) return "softDegrade";
  if (h >= 0.50) return "midDegrade";
  if (h >= 0.15) return "hardDegrade";
  return "criticalDegrade";
}


// ---------------------------------------------------------------------------
// scoreJobForDevice — Survival Instinct Approval Process (v10.4)
// ---------------------------------------------------------------------------
export function scoreJobForDevice(rawJob, deviceProfile) {
  survivalHealing.cycleCount++;
  survivalHealing.lastJobId = rawJob?.id ?? null;
  survivalHealing.lastMarketplaceId = rawJob?.marketplaceId ?? null;

  // 1. Worker Safety Check — Survival Protection
  const compatible = isJobCompatible(rawJob, deviceProfile);
  survivalHealing.lastCompatibility = compatible;

  if (!compatible) {
    survivalHealing.lastScore = -Infinity;
    return -Infinity;
  }

  // 2. Evolutionary Capability Scaling — Organism Advantage
  const evoBoost = computeEvolutionaryBoost(deviceProfile);
  survivalHealing.lastEvolutionBoost = evoBoost;

  // 3. Workload Evaluation — Difficulty
  const estimatedRuntimeSeconds =
    estimateRuntimeSeconds(rawJob, deviceProfile, evoBoost);
  survivalHealing.lastRuntimeSeconds = estimatedRuntimeSeconds;

  // 4. Compensation Check — Fair Pay
  const estimatedPayout = estimatePayout(rawJob);
  survivalHealing.lastPayoutEstimate = estimatedPayout;

  // 5. Hidden Cost Detection — Bandwidth Penalties
  const bandwidthPenalty = estimateBandwidthPenalty(rawJob, deviceProfile);
  survivalHealing.lastBandwidthPenalty = bandwidthPenalty;

  // 6. Degradation Tier Awareness
  const healthScore = deviceProfile.healthScore ?? 1.0;
  const tier = classifyDegradationTier(healthScore);
  survivalHealing.lastTier = tier;

  // 7. Stability Bonus
  const stabilityBonus = deviceProfile.stabilityScore || 0.5;

  // 8. Final Survival Score — Profitability + Evolution
  const profitPerSecond =
    estimatedPayout / Math.max(estimatedRuntimeSeconds, 1);

  const finalScore =
    profitPerSecond * stabilityBonus * evoBoost - bandwidthPenalty;

  survivalHealing.lastScore = finalScore;

  return finalScore;
}


// ---------------------------------------------------------------------------
// COMPATIBILITY CHECKS — Worker Safety Rules (v10.4)
// ---------------------------------------------------------------------------
function isJobCompatible(rawJob, deviceProfile) {
  if (!rawJob || !deviceProfile) return false;

  if (rawJob.cpuRequired &&
      rawJob.cpuRequired > (deviceProfile.cpuCores || 4)) {
    return false;
  }

  if (rawJob.memoryRequired &&
      rawJob.memoryRequired > (deviceProfile.memoryMB || 4096)) {
    return false;
  }

  if (rawJob.minGpuScore &&
      deviceProfile.gpuScore &&
      rawJob.minGpuScore > deviceProfile.gpuScore * 1.5) {
    return false;
  }

  return true;
}


// ---------------------------------------------------------------------------
// EVOLUTIONARY CAPABILITY BOOST — Organism Advantage (v10.4)
// ---------------------------------------------------------------------------
function computeEvolutionaryBoost(deviceProfile) {
  const stability = deviceProfile.stabilityScore || 0.5;
  const bandwidth = deviceProfile.bandwidthMbps || 50;
  const memory = deviceProfile.memoryMB || 4096;

  return (
    1 +
    stability * 0.4 +
    Math.min(bandwidth / 200, 0.3) +
    Math.min(memory / 32000, 0.3)
  );
}


// ---------------------------------------------------------------------------
// RUNTIME ESTIMATION — Workload Difficulty (v10.4)
// ---------------------------------------------------------------------------
function estimateRuntimeSeconds(rawJob, deviceProfile, evoBoost) {
  const base = rawJob.estimatedSeconds || 600;

  const jobGpuBaseline = rawJob.minGpuScore || 100;
  const ourGpu = (deviceProfile.gpuScore || 100) * evoBoost;

  const speedFactor = ourGpu / jobGpuBaseline;

  return base / Math.max(speedFactor, 0.25);
}


// ---------------------------------------------------------------------------
// PAYOUT ESTIMATION — Fair Compensation (v10.4)
// ---------------------------------------------------------------------------
function estimatePayout(rawJob) {
  if (rawJob.payout) return rawJob.payout;
  return 0.01;
}


// ---------------------------------------------------------------------------
// BANDWIDTH PENALTY — Hidden Cost Detection (v10.4)
// ---------------------------------------------------------------------------
function estimateBandwidthPenalty(rawJob, deviceProfile) {
  if (!rawJob.bandwidthNeededMbps) return 0;

  const ratio =
    rawJob.bandwidthNeededMbps /
    Math.max(deviceProfile.bandwidthMbps || 1, 1);

  if (ratio > 1) return ratio * 0.01;
  return ratio * 0.001;
}


// ---------------------------------------------------------------------------
// Export Healing Metadata — Survival Instinct Report
// ---------------------------------------------------------------------------
export function getPulseEarnSurvivalHealingState() {
  return { ...survivalHealing };
}
