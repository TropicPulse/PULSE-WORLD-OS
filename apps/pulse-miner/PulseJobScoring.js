// ======================================================
// PulseJobScoring.js — Capability-based job scoring
// ======================================================
//
// Scores marketplace jobs based on what the DEVICE CAN DO.
// ======================================================

/**
 * deviceProfile = {
 *   id: string,
 *   gpuModel: string,
 *   gpuScore: number,
 *   vramMB: number,
 *   bandwidthMbps: number,
 *   stabilityScore: number
 * }
 *
 * rawJob = {
 *   id,
 *   marketplaceId,
 *   payout,
 *   cpuRequired,
 *   memoryRequired,
 *   estimatedSeconds
 * }
 */

export function scoreJobForDevice(rawJob, deviceProfile) {
  // 1. Hard compatibility checks
  if (!isJobCompatible(rawJob, deviceProfile)) {
    return -Infinity;
  }

  // 2. Estimate runtime on THIS device
  const estimatedRuntimeSeconds = estimateRuntimeSeconds(rawJob, deviceProfile);

  // 3. Estimate payout
  const estimatedPayout = estimatePayout(rawJob, estimatedRuntimeSeconds);

  // 4. Penalties / bonuses
  const bandwidthPenalty = estimateBandwidthPenalty(rawJob, deviceProfile);
  const stabilityBonus = deviceProfile.stabilityScore || 0.5;

  // 5. Final score
  const profitPerSecond = estimatedPayout / Math.max(estimatedRuntimeSeconds, 1);

  return profitPerSecond * stabilityBonus - bandwidthPenalty;
}

// ------------------------------------------------------
// COMPATIBILITY CHECKS
// ------------------------------------------------------
function isJobCompatible(rawJob, deviceProfile) {
  // CPU sanity check
  if (rawJob.cpuRequired && rawJob.cpuRequired > (deviceProfile.cpuCores || 4)) {
    return false;
  }

  // Memory sanity check
  if (rawJob.memoryRequired && rawJob.memoryRequired > (deviceProfile.memoryMB || 4096)) {
    return false;
  }

  // GPU sanity check (soft)
  if (rawJob.minGpuScore && rawJob.minGpuScore > deviceProfile.gpuScore * 1.5) {
    return false;
  }

  return true;
}

// ------------------------------------------------------
// RUNTIME ESTIMATION
// ------------------------------------------------------
function estimateRuntimeSeconds(rawJob, deviceProfile) {
  const base = rawJob.estimatedSeconds || 600;

  const jobGpuBaseline = rawJob.minGpuScore || 100;
  const ourGpu = deviceProfile.gpuScore || 100;

  const speedFactor = ourGpu / jobGpuBaseline;

  return base / Math.max(speedFactor, 0.25);
}

// ------------------------------------------------------
// PAYOUT ESTIMATION
// ------------------------------------------------------
function estimatePayout(rawJob, estimatedRuntimeSeconds) {
  // Your marketplace jobs use "payout" directly
  if (rawJob.payout) return rawJob.payout;

  // fallback
  return 0.01;
}

// ------------------------------------------------------
// BANDWIDTH PENALTY
// ------------------------------------------------------
function estimateBandwidthPenalty(rawJob, deviceProfile) {
  if (!rawJob.bandwidthNeededMbps) return 0;

  const ratio = rawJob.bandwidthNeededMbps / Math.max(deviceProfile.bandwidthMbps, 1);

  if (ratio > 1) return ratio * 0.01;

  return ratio * 0.001;
}