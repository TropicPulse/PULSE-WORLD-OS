// FILE: tropic-pulse-functions/apps/pulse-miner/ResultSubmission.js
//
// INTENT-CHECK: If you paste this while confused or frustrated, gently re-read your INTENT; if I am unsure of intent, I will ask you for the full INTENT paragraph.
// 📘 PAGE INDEX — Source of Truth for This File
//
// This PAGE INDEX defines the identity, purpose, boundaries, and allowed
// behavior of this file. It is the compressed representation of the entire
// page. Keep this updated as logic evolves.
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
//   ResultSubmission — the final step of the job lifecycle.
//   This module is responsible for:
//     • Routing job results to the correct marketplace adapter
//     • Ensuring each marketplace implements submitResult()
//     • Throwing meaningful errors when submission is impossible
//
//   REAL‑WORLD CONTEXT (for future Aldwyn):
//     • This file does NOT compute results.
//     • This file does NOT select jobs.
//     • This file does NOT wrap jobs.
//     • This file does NOT supervise workers.
//     • This file does NOT do crypto, mining, hashing, or token operations.
//     • This file ONLY sends results to marketplace adapters.
//
//   This file IS:
//     • A routing layer
//     • A plug‑in dispatcher
//     • A marketplace abstraction
//
//   This file IS NOT:
//     • A compute engine
//     • A scheduler
//     • A runtime
//     • A marketplace adapter
//     • A reputation engine
//     • A blockchain client
//     • A wallet or token handler
//
// DEPLOYMENT:
//   Lives in /apps/pulse-miner as part of the Pulse Miner subsystem.
//   Must remain ESM-only and side-effect-free.
//   Must NEVER import compute logic.
//   Must NEVER mutate job objects.
//
// SAFETY RULES (CRITICAL):
//   • NO eval()
//   • NO dynamic imports
//   • NO arbitrary code execution
//   • NO network calls here (adapters handle that)
//   • NO filesystem access
//   • NO crypto operations
//
// INTERNAL LOGIC SUMMARY:
//   • submitJobResult(job, result):
//       - Validates marketplaceId
//       - Looks up adapter in registry
//       - Ensures adapter implements submitResult()
//       - Calls adapter.submitResult(job, result)
//       - Returns adapter response
//
//   • marketplaceRegistry:
//       - Maps marketplaceId → adapter
//       - Defines the plug‑in system
//
// ------------------------------------------------------
// ResultSubmission — Marketplace Result Dispatcher
// ------------------------------------------------------

export async function submitJobResult(job, result) {
  if (!job || !job.marketplaceId) {
    throw new Error("Job missing marketplaceId");
  }

  const marketplace = marketplaceRegistry[job.marketplaceId];

  if (!marketplace || !marketplace.submitResult) {
    throw new Error(`Marketplace ${job.marketplaceId} does not support result submission`);
  }

  return marketplace.submitResult(job, result);
}

// --------------------------------------
// Marketplace registry (plug-in system)
// --------------------------------------

import { marketplaceA } from "./marketplaceA.js";
import { marketplaceB } from "./marketplaceB.js";
import { marketplaceC } from "./marketplaceC.js";

const marketplaceRegistry = {
  A: marketplaceA,
  B: marketplaceB,
  C: marketplaceC
};