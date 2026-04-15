// FILE: tropic-pulse-functions/apps/pulse-miner/PulseDeviceProfile.js
//
// INTENT-CHECK: If you paste this while confused or frustrated, gently re-read your INTENT; if I am unsure of intent, I will ask you for the full INTENT paragraph.
// 📘 PAGE INDEX — Source of Truth for This File
//
// This PAGE INDEX defines the identity, purpose, boundaries, and allowed
// behavior of this file. It is the compressed representation of the entire
// page. Keep this updated as device capability logic evolves.
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
//   PulseDeviceProfile — the authoritative description of WHAT THIS DEVICE CAN DO.
//   This module provides a unified capability profile consumed by:
//     • PulseJobScoring.js
//     • MarketplaceOrchestrator.js
//     • MinerEngine.js (indirectly)
//     • MarketplaceConnector.js (capacity struct)
//
//   REAL‑WORLD CONTEXT (for future Aldwyn):
//     • This file does NOT care about GPU brand names.
//     • This file does NOT care about marketplace hardware labels.
//     • This file does NOT do crypto, mining, hashing, or token operations.
//     • This file does NOT execute arbitrary code.
//     • This file does NOT talk to marketplaces.
//     • This file ONLY measures local device capability.
//
//   This file IS:
//     • A capability detector
//     • A performance estimator
//     • A stability estimator
//     • A GPU score generator
//     • A unified device profile provider
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
//   Must run in Node.js (uses os module).
//   Must remain ESM-only and side-effect-free.
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
//   • GPU detection (optional):
//       - Reads os.gpu() if available
//       - Falls back to default values
//
//   • estimateBandwidthMbps():
//       - Placeholder network throughput estimator
//
//   • estimateStability():
//       - Uses uptime to approximate stability
//
//   • computeGpuScore():
//       - Converts GPU model → numeric capability score
//       - Used by PulseJobScoring + MarketplaceOrchestrator
//
//   • getDeviceProfile():
//       - Returns unified capability object:
//           { cpuCores, memoryMB, gpuScore, bandwidthMbps, stabilityScore }
//
// ------------------------------------------------------
// PulseDeviceProfile — Capability-Based Device Description
// ------------------------------------------------------

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