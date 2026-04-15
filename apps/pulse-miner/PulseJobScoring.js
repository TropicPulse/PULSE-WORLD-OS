// FILE: tropic-pulse-functions/apps/pulse-miner/PulseJobScoring.js
//
// INTENT-CHECK: If you paste this while confused or frustrated, gently re-read your INTENT; if I am unsure of intent, I will ask you for the full INTENT paragraph.
// 📘 PAGE INDEX — Source of Truth for This File
//
// This PAGE INDEX defines the identity, purpose, boundaries, and allowed
// behavior of this file. It is the compressed representation of the entire
// page. Keep this updated as scoring logic evolves.
//
// If AI becomes uncertain or drifts, request: "Rules Design (Trust/Data)"
//
// CONTENTS TO MAINTAIN:
//   • What this file IS
//   • What this file IS NOT
//   • Responsibilities
//   • Exported functions
//   • Internal logic summary
//   • Allowed operations
//   • Forbidden operations
//   • Safety constraints
//
// ROLE:
//   PulseJobScoring — the capability-based scoring engine for marketplace jobs.
//   This module is responsible for:
//     • Checking device compatibility
//     • Estimating runtime on THIS device
//     • Estimating payout
//     • Applying bandwidth penalties
//     • Applying stability bonuses
//     • Producing a final numeric score
//
//   REAL‑WORLD CONTEXT (for future Aldwyn):
//     • This file does NOT talk to marketplaces.
//     • This file does NOT execute jobs.
//     • This file does NOT wrap jobs.
//     • This file does NOT supervise workers.
//     • This file does NOT do crypto, mining, hashing, or token operations.
//     • This file ONLY scores jobs based on device capability.
//
//   This file IS:
//     • A deterministic scoring engine
//     • A capability evaluator
//     • A runtime estimator
//     • A profitability estimator
//     • A penalty/bonus calculator
//
//   This file IS NOT:
//     • A scheduler
//     • A compute engine
//     • A job selector
//     • A marketplace adapter
//     • A reputation engine
//     • A blockchain client
//     • A wallet or token handler
//
// DEPLOYMENT:
//   Lives in /apps/pulse-miner as part of the Pulse Miner subsystem.
//   Must remain ESM-only and side-effect-free.
//   Must NEVER import anything.
//   Must NEVER mutate job objects.
//
// SAFETY RULES (CRITICAL):
//   • NO eval()
//   • NO dynamic imports
//   • NO arbitrary code execution
//   • NO network calls
//   • NO filesystem access
//   • NO crypto operations
//
// INTERNAL LOGIC SUMMARY:
//   • scoreJobForDevice(rawJob, deviceProfile):
//       - Hard compatibility checks
//       - Runtime estimation
//       - Payout estimation
//       - Bandwidth penalty
//       - Stability bonus
//       - Final score = profitPerSecond * stability - bandwidthPenalty
//
//   • isJobCompatible():
//       - CPU, memory, GPU sanity checks
//
//   • estimateRuntimeSeconds():
//       - GPU-based speed factor
//
//   • estimatePayout():
//       - Uses rawJob.payout directly
//
//   • estimateBandwidthPenalty():
//       - Penalizes jobs requiring more bandwidth than device has
//
// ------------------------------------------------------
// PulseJobScoring — Capability-Based Job Scoring
// ------------------------------------------------------

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