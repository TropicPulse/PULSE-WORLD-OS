// ============================================================================
// FILE: tropic-pulse-functions/apps/pulse-earn/EarnRuntime.js
// LAYER: THE HEART (Heartbeat Loop + Circulatory Pump)
// ============================================================================
//
// ROLE (v7.1+):
//   THE HEART — Pulse‑Earn’s continuous rhythmic engine.
//   • Pulls jobs from the Exchange Office (MarketplaceConnector).
//   • Executes jobs via the Craftsman (WorkerExecution).
//   • Submits results via the Return Clerk (ResultSubmission).
//   • Logs each cardiac cycle of the worker’s lifecycle.
//
// WHY “HEART”?:
//   • It is the rhythmic loop that keeps Earn alive.
//   • It beats continuously while the Muscle System (EarnEngine) allows it.
//   • It pumps jobs through the system like blood through arteries.
//   • It maintains the life cycle of the Earn worker (cardiac output).
//
// PURPOSE (v7.1+):
//   • Provide a deterministic, drift‑proof execution loop.
//   • Guarantee safe job → compute → submit flow.
//   • Maintain healing metadata for the Immune System (EarnHealer).
//   • Preserve cardiac rhythm + circulatory stability (conceptual only).
//
// CONTRACT (unchanged):
//   • PURE RUNTIME — no AI layers, no translation, no memory model.
//   • READ‑ONLY except for healing metadata.
//   • NO eval(), NO Function(), NO dynamic imports.
//   • NO executing user code.
//   • Deterministic loop only.
//
// SAFETY (unchanged):
//   • v7.1+ upgrade is COMMENTAL ONLY — NO LOGIC CHANGES.
//   • All behavior remains identical to pre‑v7.1 EarnRuntime.
// ============================================================================

import { getNextJob } from "./MarketplaceConnector.js";
import { executeJob } from "./WorkerExecution.js";
import { submitJobResult } from "./ResultSubmission.js";

// ---------------------------------------------------------------------------
// Healing Metadata — Cardiac Rhythm Log
// ---------------------------------------------------------------------------
const runtimeHealing = {
  cycles: 0,              // cardiac cycles completed
  lastJob: null,          // last “blood cell” pumped
  lastResult: null,       // metabolic output
  lastSubmission: null,   // venous return
  lastError: null,        // arrhythmia event
  lastExitReason: null,   // cardiac arrest reason
  lastTimestamp: null,    // last heartbeat timestamp
};

// ---------------------------------------------------------------------------
// startEarnRuntime — Begin the heartbeat
// ---------------------------------------------------------------------------
export async function startEarnRuntime(workerId, config, engineRef) {
  const { logFn, idleDelayMs, stopOnError } = config;

  logFn("earn:runtime_start", { workerId });

  // NOTE: While the Muscle System (EarnEngine) is running,
  //       the Heart continues to beat.
  while (engineRef.running) {
    try {
      runtimeHealing.cycles++;
      runtimeHealing.lastTimestamp = Date.now();

      // ------------------------------------------------------
      // 1. FETCH — Systole: Heart contracts, pulling in blood
      // ------------------------------------------------------
      const job = await getNextJob(config.marketplaces);

      if (!job) {
        const delay = Math.max(50, idleDelayMs || 250);
        await new Promise(r => setTimeout(r, delay));
        continue;
      }

      runtimeHealing.lastJob = job;

      logFn("earn:runtime_job_selected", { workerId, jobId: job.id });

      // ------------------------------------------------------
      // 2. EXECUTE — Cardiac output: Heart pumps
      // ------------------------------------------------------
      const result = await executeJob(job);
      runtimeHealing.lastResult = result;

      logFn("earn:runtime_job_executed", {
        workerId,
        jobId: job.id,
        success: result.success,
        durationMs: result.durationMs,
      });

      // ------------------------------------------------------
      // 3. SUBMIT — Venous return: Blood flows back
      // ------------------------------------------------------
      const submission = await submitJobResult(job, result);
      runtimeHealing.lastSubmission = submission;

      logFn("earn:runtime_job_submitted", {
        workerId,
        jobId: job.id,
        submission,
      });

      // NOTE: Successful cycle = healthy cardiac output
      //       → directly correlates to earning throughput (conceptual only)

    } catch (err) {
      // Arrhythmia event
      runtimeHealing.lastError = {
        message: err.message,
        workerId,
        timestamp: Date.now(),
      };

      logFn("earn:runtime_error", {
        workerId,
        error: err.message,
      });

      if (stopOnError) {
        runtimeHealing.lastExitReason = "hardStop";
        await engineRef.hardStop(config, err.message);
        break;
      }
    }
  }

  // Cardiac arrest (engine stopped)
  runtimeHealing.lastExitReason = "softStop";
  logFn("earn:runtime_exit", { workerId });
}

// ---------------------------------------------------------------------------
// stopEarnRuntime — Heart stops when Muscle System stops engine
// ---------------------------------------------------------------------------
export function stopEarnRuntime() {
  // No-op: engine controls lifecycle
}

// ---------------------------------------------------------------------------
// Export healing metadata — Cardiac Rhythm Report
// ---------------------------------------------------------------------------
export function getEarnRuntimeHealingState() {
  return { ...runtimeHealing };
}
