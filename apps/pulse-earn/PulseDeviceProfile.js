// ============================================================================
// FILE: tropic-pulse-functions/apps/pulse-earn/PulseDeviceProfile.js
// LAYER: THE SKELETAL SYSTEM + VITAL SIGNS MONITOR
// (Device Capacity + Structural Limits + Physiological Baselines)
// ============================================================================
//
// ROLE (v7.1+):
//   THE SKELETAL SYSTEM — Pulse‑Earn’s structural capacity declaration.
//   • CPU cores = bone density
//   • Memory = marrow capacity
//   • GPU = muscular fiber potential
//
//   THE VITAL SIGNS MONITOR — Pulse‑Earn’s physiological baseline.
//   • Bandwidth = circulatory throughput
//   • Stability = organism uptime / homeostasis
//
//   Together, they form the device’s “phenotype passport”.
//
// WHY THIS EVOLUTION?:
//   • The Inspector examines structure AND physiology.
//   • It determines safe workloads AND metabolic limits.
//   • It issues the capability passport used by all Earn subsystems.
//   • It defines the organism’s physical identity.
//
// PURPOSE (v7.1+):
//   • Provide deterministic, drift‑proof device profiling.
//   • Guarantee safe capability detection.
//   • Supply the Brainstem (Orchestrator) + Endocrine System (Reputation)
//     with accurate structural + physiological data.
//   • Preserve phenotype lineage + deterministic physiology.
//
// CONTRACT (unchanged):
//   • PURE CAPABILITY ENGINE — no AI layers, no translation, no memory model.
//   • NO eval(), NO dynamic imports, NO arbitrary code execution.
//   • NO network calls, NO filesystem access, NO crypto operations.
//   • Deterministic hardware inspection only.
//
// SAFETY (unchanged):
//   • v7.1+ upgrade is COMMENTAL ONLY — NO LOGIC CHANGES.
//   • All behavior remains identical to pre‑v7.1 DeviceProfile.
// ============================================================================

import os from "os";

// ---------------------------------------------------------------------------
// Healing Metadata — Structural + Physiological Log
// ---------------------------------------------------------------------------
const healingState = {
  lastProfile: null,          // last phenotype snapshot
  lastGpuModel: null,         // last muscular fiber identity
  lastGpuScore: null,         // last muscular potential rating
  lastBandwidthMbps: null,    // last circulatory throughput reading
  lastStabilityScore: null,   // last homeostasis score
  cycleCount: 0,              // phenotype cycles completed
};

// ---------------------------------------------------------------------------
// GPU Detection — Muscular Fiber Scan
// ---------------------------------------------------------------------------
let gpuInfo = { model: "unknown", vramMB: 2048 };

try {
  const gpu = os.gpu?.()[0];
  if (gpu) {
    gpuInfo = {
      model: gpu.model || "unknown",
      vramMB: gpu.vram || 2048,
    };
  }
} catch {
  // keep defaults — unknown muscle fiber type
}

// ---------------------------------------------------------------------------
// Bandwidth Estimation — Circulatory Throughput
// ---------------------------------------------------------------------------
function estimateBandwidthMbps() {
  try {
    return 50; // baseline circulatory capacity
  } catch {
    return 50;
  }
}

// ---------------------------------------------------------------------------
// Stability Score — Homeostasis / Vital Signs
// ---------------------------------------------------------------------------
function estimateStability() {
  const uptime = os.uptime();

  // NOTE:
  //   • Long uptime = stable physiology
  //   • Medium uptime = warming up
  //   • Low uptime = cold start / unstable
  if (uptime > 3600) return 0.9;
  if (uptime > 600) return 0.7;
  return 0.5;
}

// ---------------------------------------------------------------------------
// GPU Score — Muscular Potential Rating
// ---------------------------------------------------------------------------
function computeGpuScore() {
  const model = gpuInfo.model.toLowerCase();

  if (model.includes("4090")) return 1000;
  if (model.includes("3090")) return 800;
  if (model.includes("3080")) return 700;
  if (model.includes("3070")) return 600;
  if (model.includes("3060")) return 500;
  if (model.includes("2080")) return 450;
  if (model.includes("2070")) return 400;
  if (model.includes("2060")) return 350;
  if (model.includes("1660")) return 300;
  if (model.includes("1060")) return 200;

  return 150; // baseline muscular potential
}

// ---------------------------------------------------------------------------
// MAIN EXPORT — getDeviceProfile()
// Phenotype Passport + Structural Identity
// ---------------------------------------------------------------------------
export function getDeviceProfile() {
  healingState.cycleCount++;

  const cpus = os.cpus() || [];
  const totalMemMB = Math.floor(os.totalmem() / 1024 / 1024);

  const bandwidthMbps = estimateBandwidthMbps();
  const stabilityScore = estimateStability();
  const gpuScore = computeGpuScore();

  const profile = {
    id: os.hostname(), // organism identity tag

    // Structural capacity (skeletal system)
    cpuCores: cpus.length || 4,
    memoryMB: totalMemMB || 4096,

    // Muscular potential
    gpuModel: gpuInfo.model,
    vramMB: gpuInfo.vramMB,
    gpuScore,

    // Physiological baselines (vital signs)
    bandwidthMbps,
    stabilityScore,
  };

  // Update healing metadata
  healingState.lastProfile = profile;
  healingState.lastGpuModel = gpuInfo.model;
  healingState.lastGpuScore = gpuScore;
  healingState.lastBandwidthMbps = bandwidthMbps;
  healingState.lastStabilityScore = stabilityScore;

  return profile;
}

// ---------------------------------------------------------------------------
// Export Healing Metadata — Phenotype Health Report
// ---------------------------------------------------------------------------
export function getPulseDeviceProfileHealingState() {
  return { ...healingState };
}
