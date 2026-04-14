// ======================================================
// PulseDeviceProfile.js
// Describes WHAT THIS DEVICE CAN DO (capability-based)
// ======================================================
//
// This module provides a unified "device capability profile"
// used by PulseJobScoring.js and MarketplaceOrchestrator.js.
//
// It does NOT care about:
//   • GPU brand names
//   • Marketplace hardware labels
//
// It ONLY cares about:
//   • measured throughput
//   • memory
//   • bandwidth
//   • stability
// ======================================================

import os from "os";

// Optional: GPU detection (works on most systems)
let gpuInfo = { model: "unknown", vramMB: 2048 };
try {
  const gpu = os.gpu?.()[0];
  if (gpu) {
    gpuInfo = {
      model: gpu.model || "unknown",
      vramMB: gpu.vram || 2048
    };
  }
} catch {}

// Optional: network speed estimation (fallback to 50 Mbps)
function estimateBandwidthMbps() {
  try {
    // If you later add real network tests, plug them here.
    return 50;
  } catch {
    return 50;
  }
}

// Stability score (0–1)
function estimateStability() {
  // Later: use uptime, thermal throttling, job success rate, etc.
  const uptime = os.uptime();
  if (uptime > 3600) return 0.9;
  if (uptime > 600) return 0.7;
  return 0.5;
}

// GPU capability score (your custom metric)
function computeGpuScore() {
  const model = gpuInfo.model.toLowerCase();

  // Very rough heuristic — you can refine this later
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

  // Integrated GPUs or unknown
  return 150;
}

// ======================================================
// MAIN EXPORT
// ======================================================
export function getDeviceProfile() {
  const cpus = os.cpus() || [];
  const totalMemMB = Math.floor(os.totalmem() / 1024 / 1024);

  return {
    id: os.hostname(),

    // CPU
    cpuCores: cpus.length || 4,

    // Memory
    memoryMB: totalMemMB || 4096,

    // GPU
    gpuModel: gpuInfo.model,
    vramMB: gpuInfo.vramMB,
    gpuScore: computeGpuScore(),

    // Network
    bandwidthMbps: estimateBandwidthMbps(),

    // Stability
    stabilityScore: estimateStability()
  };
}