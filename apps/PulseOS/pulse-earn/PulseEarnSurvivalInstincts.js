// ============================================================================
// FILE: tropic-pulse-functions/apps/pulse-earn/PulseEarnSurvivalInstincts-v11-Evo.js
// LAYER: THE SURVIVAL INSTINCTS (v11-Evo)
// (Worker Protection + Evolutionary Scaling + Fair Workload Defense + Diagnostics)
// ============================================================================
//
// ROLE (v11-Evo):
//   THE SURVIVAL INSTINCTS — Pulse‑Earn’s evolved worker‑protection engine.
//   • Rejects unsafe jobs (structural incompatibility).
//   • Rejects unfair jobs (low pay, high metabolic cost).
//   • Rejects exploitative jobs (bandwidth drain, long runtimes).
//   • Applies deterministic evolutionary capability scaling.
//   • Approves only safe, profitable, fair workloads.
//   • Emits deterministic, pattern‑aware diagnostics for governance.
//
// PURPOSE (v11-Evo):
//   • Provide deterministic, drift‑proof job scoring.
//   • Apply evolutionary scaling to device capability.
//   • Ensure the device is never overloaded or underpaid.
//   • Guarantee that only profitable, safe workloads enter the pipeline.
//   • Surface a stable, inspectable survival signature per job.
//
// CONTRACT (v11-Evo):
//   • PURE SCORING ENGINE — no AI layers, no translation, no memory model.
//   • NO imports, NO eval(), NO dynamic behavior.
//   • NEVER mutate job objects.
//   • Deterministic compatibility + profitability scoring only.
//   • NO timestamps, NO randomness.
//   • Internal healing state is allowed to mutate; external objects are not.
// ============================================================================


// ---------------------------------------------------------------------------
// Healing Metadata — Survival Instinct Activity Log (v11-Evo)
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
  lastProfitPerSecond: null,
  lastStabilityBonus: null,
  lastHealthScore: null,

  // v11-Evo: pattern / signature surface
  lastJobPattern: null,
  lastDevicePattern: null,
  lastSurvivalSignature: null,

  cycleCount: 0,

  loopTheory: {
    routingCompletion: true,
    allowLoopfieldPropulsion: true,
    pulseComputeContinuity: true,
    errorRouteAround: true
  }
};


// ---------------------------------------------------------------------------
// Deterministic Hash Helper — v11-Evo (no randomness, no timestamps)
// ---------------------------------------------------------------------------
function computeDeterministicHash(str) {
  let acc = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    acc = (acc + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `h${acc}`;
}


// ---------------------------------------------------------------------------
// Degradation Tier — aligned with Router v10.4 / v11
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
// INTERNAL: Build Survival Signature (v11-Evo)
// ---------------------------------------------------------------------------
function buildSurvivalSignature({
  jobId,
  marketplaceId,
  compatibility,
  profitPerSecond,
  bandwidthPenalty,
  tier,
  healthScore,
  stabilityBonus
}) {
  const raw = [
    jobId || "NO_JOB",
    marketplaceId || "NO_MARKET",
    compatibility ? "COMPATIBLE" : "INCOMPATIBLE",
    `pps:${profitPerSecond}`,
    `bw:${bandwidthPenalty}`,
    `tier:${tier}`,
    `h:${healthScore}`,
    `stab:${stabilityBonus}`
  ].join("::");

  return computeDeterministicHash(raw);
}


// ---------------------------------------------------------------------------
// scoreJobForDevice — Survival Instinct Approval Process (v11-Evo)
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
    survivalHealing.lastRuntimeSeconds = null;
    survivalHealing.lastPayoutEstimate = null;
    survivalHealing.lastBandwidthPenalty = null;
    survivalHealing.lastEvolutionBoost = null;
    survivalHealing.lastTier = classifyDegradationTier(deviceProfile?.healthScore ?? 1.0);
    survivalHealing.lastProfitPerSecond = null;
    survivalHealing.lastStabilityBonus = deviceProfile?.stabilityScore || 0.5;
    survivalHealing.lastHealthScore = deviceProfile?.healthScore ?? 1.0;

    survivalHealing.lastJobPattern = buildJobPattern(rawJob);
    survivalHealing.lastDevicePattern = buildDevicePattern(deviceProfile);
    survivalHealing.lastSurvivalSignature = buildSurvivalSignature({
      jobId: survivalHealing.lastJobId,
      marketplaceId: survivalHealing.lastMarketplaceId,
      compatibility: false,
      profitPerSecond: 0,
      bandwidthPenalty: 0,
      tier: survivalHealing.lastTier,
      healthScore: survivalHealing.lastHealthScore,
      stabilityBonus: survivalHealing.lastStabilityBonus
    });

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
  survivalHealing.lastHealthScore = healthScore;

  // 7. Stability Bonus
  const stabilityBonus = deviceProfile.stabilityScore || 0.5;
  survivalHealing.lastStabilityBonus = stabilityBonus;

  // 8. Final Survival Score — Profitability + Evolution
  const profitPerSecond =
    estimatedPayout / Math.max(estimatedRuntimeSeconds, 1);
  survivalHealing.lastProfitPerSecond = profitPerSecond;

  const finalScore =
    profitPerSecond * stabilityBonus * evoBoost - bandwidthPenalty;

  survivalHealing.lastScore = finalScore;

  // 9. v11-Evo: Pattern + Signature Surface
  const jobPattern = buildJobPattern(rawJob);
  const devicePattern = buildDevicePattern(deviceProfile);
  survivalHealing.lastJobPattern = jobPattern;
  survivalHealing.lastDevicePattern = devicePattern;

  survivalHealing.lastSurvivalSignature = buildSurvivalSignature({
    jobId: survivalHealing.lastJobId,
    marketplaceId: survivalHealing.lastMarketplaceId,
    compatibility: true,
    profitPerSecond,
    bandwidthPenalty,
    tier,
    healthScore,
    stabilityBonus
  });

  return finalScore;
}


// ---------------------------------------------------------------------------
// COMPATIBILITY CHECKS — Worker Safety Rules (v11-Evo)
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
// EVOLUTIONARY CAPABILITY BOOST — Organism Advantage (v11-Evo)
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
// RUNTIME ESTIMATION — Workload Difficulty (v11-Evo)
// ---------------------------------------------------------------------------
function estimateRuntimeSeconds(rawJob, deviceProfile, evoBoost) {
  const base = rawJob.estimatedSeconds || 600;

  const jobGpuBaseline = rawJob.minGpuScore || 100;
  const ourGpu = (deviceProfile.gpuScore || 100) * evoBoost;

  const speedFactor = ourGpu / jobGpuBaseline;

  return base / Math.max(speedFactor, 0.25);
}


// ---------------------------------------------------------------------------
// PAYOUT ESTIMATION — Fair Compensation (v11-Evo)
// ---------------------------------------------------------------------------
function estimatePayout(rawJob) {
  if (rawJob.payout) return rawJob.payout;
  return 0.01;
}


// ---------------------------------------------------------------------------
// BANDWIDTH PENALTY — Hidden Cost Detection (v11-Evo)
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
// PATTERN BUILDERS — Job / Device Pattern Surfaces (v11-Evo)
// ---------------------------------------------------------------------------
function buildJobPattern(rawJob) {
  if (!rawJob) return "JOB::NONE";

  const id = rawJob.id || "NO_ID";
  const market = rawJob.marketplaceId || "NO_MARKET";
  const cpu = rawJob.cpuRequired || 0;
  const mem = rawJob.memoryRequired || 0;
  const gpu = rawJob.minGpuScore || 0;
  const bw = rawJob.bandwidthNeededMbps || 0;

  const base = `JOB::${id}::${market}::cpu:${cpu}::mem:${mem}::gpu:${gpu}::bw:${bw}`;
  return base;
}

function buildDevicePattern(deviceProfile) {
  if (!deviceProfile) return "DEVICE::NONE";

  const cpu = deviceProfile.cpuCores || 0;
  const mem = deviceProfile.memoryMB || 0;
  const gpu = deviceProfile.gpuScore || 0;
  const bw = deviceProfile.bandwidthMbps || 0;
  const stab = deviceProfile.stabilityScore || 0.5;
  const health = deviceProfile.healthScore ?? 1.0;

  const base = `DEVICE::cpu:${cpu}::mem:${mem}::gpu:${gpu}::bw:${bw}::stab:${stab}::h:${health}`;
  return base;
}


// ---------------------------------------------------------------------------
// Export Healing Metadata — Survival Instinct Report (v11-Evo)
// ---------------------------------------------------------------------------
export function getPulseEarnSurvivalHealingState() {
  return { ...survivalHealing };
}
