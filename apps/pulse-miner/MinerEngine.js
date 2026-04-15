// FILE: tropic-pulse-functions/apps/pulse-miner/MinerEngine.js
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
//   MinerEngine — the worker lifecycle manager for Pulse Miner.
//   This module is responsible for:
//     • Spawning worker loops
//     • Continuously requesting jobs from MarketplaceConnector
//     • Executing jobs via WorkerExecution
//     • Submitting results via ResultSubmission
//     • Logging lifecycle events
//     • Handling soft/hard stops
//
//   REAL‑WORLD CONTEXT (for future Aldwyn):
//     • This file does NOT select jobs — MarketplaceOrchestrator does.
//     • This file does NOT score jobs — PulseJobScoring does.
//     • This file does NOT talk to marketplaces — adapters do.
//     • This file does NOT wrap jobs — MarketplaceConnector does.
//     • This file does NOT execute arbitrary code — MinerCompute does safe ops only.
//     • This file does NOT do crypto, token handling, or blockchain work.
//       Even if a marketplace uses a token (AKT*, RNDR*, SPHERON*),
//       Tropic Pulse ONLY reads job metadata. We do NOT do crypto.
//
//   This file IS:
//     • A worker supervisor
//     • A job execution loop
//     • A result submission pipeline
//     • A logging and lifecycle controller
//
//   This file IS NOT:
//     • A scheduler
//     • A job selector
//     • A compute engine
//     • A marketplace adapter
//     • A reputation engine
//     • A blockchain client
//     • A wallet or token handler
//
// DEPLOYMENT:
//   Lives in /apps/pulse-miner as part of the Pulse Miner subsystem.
//   Must run in any JS environment with async/await support.
//   Must remain ESM-only and side-effect-free except for worker loops.
//
// SYNTAX RULES:
//   ESM JavaScript ONLY — no TypeScript, no CommonJS, no require().
//   Default export allowed here (engine singleton).
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
//   • start(config):
//       - Prevents double-start
//       - Spawns N workers
//       - Logs engine start
//
//   • workerLoop(workerId, config):
//       - Requests next job from MarketplaceConnector
//       - Executes job via WorkerExecution
//       - Submits result via ResultSubmission
//       - Logs each lifecycle event
//       - Handles errors + optional hard stop
//
//   • hardStop(config, reason):
//       - Stops engine immediately
//       - Logs reason
//       - Sends failure email
//       - Waits for all workers to settle
//
//   • softStop(config):
//       - Gracefully stops engine without email
//
// SAFETY NOTES:
//   • Must NEVER execute arbitrary code
//   • Must NEVER mutate job objects
//   • Must ALWAYS catch worker errors
//   • Must NEVER block the event loop
//   • Must remain deterministic
//
// ------------------------------------------------------
// MinerEngine — Worker Lifecycle Manager
// ------------------------------------------------------

import { getNextJob } from "./MarketplaceConnector.js";
import { executeJob } from "./WorkerExecution.js";
import { submitJobResult } from "./ResultSubmission.js";

const MinerEngine = {
  running: false,
  workers: new Map(),
  lastReason: null,

  async start(config) {
    if (this.running) {
      config.logFn("miner:already_running");
      return;
    }

    this.running = true;
    this.lastReason = null;

    config.logFn("miner:engine_start", {
      maxWorkers: config.maxWorkers,
    });

    for (let i = 0; i < config.maxWorkers; i++) {
      const workerId = `${config.workerIdBase}-${i}`;
      const workerPromise = this.workerLoop(workerId, config);
      this.workers.set(workerId, workerPromise);
    }
  },

  async workerLoop(workerId, config) {
    config.logFn("miner:worker_start", { workerId });

    while (this.running) {
      try {
        // 1. Select job from marketplaces
        const job = await getNextJob(config.marketplaces, config.capacity);

        if (!job) {
          await new Promise(r => setTimeout(r, config.idleDelayMs));
          continue;
        }

        config.logFn("miner:job_selected", { workerId, jobId: job.id });

        // 2. Execute job
        const result = await executeJob(job);

        config.logFn("miner:job_executed", {
          workerId,
          jobId: job.id,
          success: result.success,
          durationMs: result.durationMs,
        });

        // 3. Submit result
        const submission = await submitJobResult(job, result);

        config.logFn("miner:job_submitted", {
          workerId,
          jobId: job.id,
          submission,
        });

      } catch (err) {
        config.logFn("miner:worker_error", {
          workerId,
          error: err.message,
        });

        if (config.stopOnError) {
          await this.hardStop(config, err.message);
          return;
        }
      }
    }

    config.logFn("miner:worker_exit", { workerId });
  },

  async hardStop(config, reason) {
    if (!this.running) return;

    this.running = false;
    this.lastReason = reason;

    config.logFn("miner:engine_hard_stop", {
      reason,
      workers: Array.from(this.workers.keys()),
    });

    try {
      await config.sendFailureEmailFn({
        reason,
        lastEvent: this.lastReason,
        workers: Array.from(this.workers.keys()),
      });
    } catch (err) {
      config.logFn("miner:email_failed", { err });
    }

    await Promise.allSettled(this.workers.values());
    this.workers.clear();
  },

  softStop(config) {
    if (!this.running) return;
    this.running = false;

    config.logFn("miner:engine_soft_stop", {
      workers: Array.from(this.workers.keys()),
    });
  },
};

export default MinerEngine;