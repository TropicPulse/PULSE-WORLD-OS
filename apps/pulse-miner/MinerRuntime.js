// FILE: tropic-pulse-functions/apps/pulse-miner/MinerRuntime.js
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
//   • Its responsibilities
//   • Its exported functions
//   • Its internal logic summary
//   • Allowed imports
//   • Forbidden imports
//   • Safety constraints
//
// ROLE:
//   MinerRuntime — the active worker loop for Pulse Miner.
//   This module is responsible for:
//     • Continuously pulling jobs from MarketplaceConnector
//     • Executing jobs via WorkerExecution
//     • Submitting results via ResultSubmission
//     • Logging each lifecycle event
//     • Obeying engineRef.running for lifecycle control
//
//   REAL‑WORLD CONTEXT (for future Aldwyn):
//     • This file does NOT select jobs — MarketplaceOrchestrator does.
//     • This file does NOT score jobs — PulseJobScoring does.
//     • This file does NOT manage workers — MinerEngine does.
//     • This file does NOT execute arbitrary code — MinerCompute does safe ops only.
//     • This file does NOT do crypto, token handling, or blockchain work.
//       Even if a marketplace uses a token (AKT*, RNDR*, SPHERON*),
//       Tropic Pulse ONLY reads job metadata. We do NOT do crypto.
//
//   This file IS:
//     • The worker loop
//     • The runtime executor
//     • The job → compute → submit pipeline
//     • A deterministic, safe execution environment
//
//   This file IS NOT:
//     • A scheduler
//     • A supervisor
//     • A compute engine
//     • A marketplace adapter
//     • A reputation engine
//     • A blockchain client
//     • A wallet or token handler
//
// DEPLOYMENT:
//   Lives in /apps/pulse-miner as part of the Pulse Miner subsystem.
//   Must run in any JS environment with async/await support.
//   Must remain ESM-only and side-effect-free.
//
// SYNTAX RULES:
//   ESM JavaScript ONLY — no TypeScript, no CommonJS, no require().
//   Named exports ONLY.
//
// IMPORT RULES:
//   Allowed:
//     • MarketplaceConnector.js (getNextJob)
//     • WorkerExecution.js (executeJob)
//     • ResultSubmission.js (submitJobResult)
//
//   Forbidden:
//     • Direct marketplace API calls
//     • Node.js APIs
//     • Any compute logic
//     • Any scoring logic
//     • Any schema logic
//
// INTERNAL LOGIC SUMMARY:
//   • startMinerRuntime(workerId, config, engineRef):
//       - Logs runtime start
//       - Loops while engineRef.running
//       - Pulls job → executes job → submits result
//       - Handles errors + optional hard stop
//
//   • stopMinerRuntime():
//       - No-op (engine controls lifecycle)
//
// SAFETY NOTES:
//   • Must NEVER execute arbitrary code
//   • Must NEVER mutate job objects
//   • Must ALWAYS catch runtime errors
//   • Must remain deterministic
//
// ------------------------------------------------------
// MinerRuntime — Worker Execution Loop
// ------------------------------------------------------

import { getNextJob } from "./MarketplaceConnector.js";
import { executeJob } from "./WorkerExecution.js";
import { submitJobResult } from "./ResultSubmission.js";

export async function startMinerRuntime(workerId, config, engineRef) {
  const { logFn, idleDelayMs, stopOnError } = config;

  logFn("miner:runtime_start", { workerId });

  while (engineRef.running) {
    try {
      // 1. Pull next job from marketplaces
      const job = await getNextJob(config.marketplaces, config.capacity);

      if (!job) {
        await new Promise(r => setTimeout(r, idleDelayMs));
        continue;
      }

      logFn("miner:runtime_job_selected", { workerId, jobId: job.id });

      // 2. Execute job
      const result = await executeJob(job);

      logFn("miner:runtime_job_executed", {
        workerId,
        jobId: job.id,
        success: result.success,
        durationMs: result.durationMs,
      });

      // 3. Submit result
      const submission = await submitJobResult(job, result);

      logFn("miner:runtime_job_submitted", {
        workerId,
        jobId: job.id,
        submission,
      });

    } catch (err) {
      logFn("miner:runtime_error", {
        workerId,
        error: err.message,
      });

      if (stopOnError) {
        await engineRef.hardStop(config, err.message);
        break;
      }
    }
  }

  logFn("miner:runtime_exit", { workerId });
}

export function stopMinerRuntime() {
  // No-op: engine controls lifecycle
}