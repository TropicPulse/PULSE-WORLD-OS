// ============================================================================
// FILE: tropic-pulse-functions/apps/pulse-earn/PulseEarnHeart.js
// LAYER: THE HEART (v10.4)
// (Deterministic Heartbeat Cycle + Circulatory Pump)
// ============================================================================
//
// ROLE (v10.4):
//   THE HEART — Pulse‑Earn’s deterministic rhythmic engine.
//   • Performs ONE cardiac cycle per invocation.
//   • Pulls jobs from the Nervous System.
//   • Executes jobs via Metabolism or PulseSend.
//   • Submits results via Lymph Nodes.
//   • Logs each cardiac cycle deterministically.
//
// PURPOSE (v10.4):
//   • Provide a deterministic, drift‑proof execution cycle.
//   • Guarantee safe job → compute → submit flow.
//   • Maintain healing metadata for the Immune System.
//   • Preserve cardiac rhythm (conceptual only).
//
// CONTRACT (v10.4):
//   • PURE RUNTIME — no AI layers, no translation, no memory model.
//   • NO async, NO timers, NO timestamps.
//   • Deterministic cycle only.
// ============================================================================

import { getNextJob } from "./PulseEarnNervousSystem.js";
import { executeJob } from "./PulseEarnMetabolism.js";
import { submitJobResult } from "./PulseEarnLymphNodes.js";

// ---------------------------------------------------------------------------
// Healing Metadata — Cardiac Rhythm Log (deterministic)
// ---------------------------------------------------------------------------
const heartHealing = {
  cycles: 0,
  lastJob: null,
  lastResult: null,
  lastSubmission: null,
  lastError: null,
  lastExitReason: null,
  lastCycleIndex: null
};

// Deterministic cycle counter
let heartCycle = 0;

// ---------------------------------------------------------------------------
// pulseEarnHeartCycle — ONE deterministic heartbeat
// ---------------------------------------------------------------------------
export function pulseEarnHeartCycle(workerId, config, engineRef) {
  heartCycle++;
  heartHealing.cycles++;
  heartHealing.lastCycleIndex = heartCycle;

  const { logFn, stopOnError } = config;

  if (!engineRef.running) {
    heartHealing.lastExitReason = "engine_not_running";
    return null;
  }

  try {
    // ------------------------------------------------------
    // 1. FETCH — Systole: Heart contracts, pulling in blood
    // ------------------------------------------------------
    const job = getNextJob(config.marketplaces);

    if (!job) {
      logFn("earn:heart_no_job", { workerId, cycleIndex: heartCycle });
      return null;
    }

    heartHealing.lastJob = job;

    logFn("earn:heart_job_selected", {
      workerId,
      jobId: job.id,
      cycleIndex: heartCycle
    });

    // ------------------------------------------------------
    // 2. EXECUTE — Cardiac output: Heart pumps
    // ------------------------------------------------------
    const result = executeJob(job);
    heartHealing.lastResult = result;

    logFn("earn:heart_job_executed", {
      workerId,
      jobId: job.id,
      success: result.success,
      cycleIndex: heartCycle
    });

    // ------------------------------------------------------
    // 3. SUBMIT — Venous return: Blood flows back
    // ------------------------------------------------------
    const submission = submitJobResult(job, result);
    heartHealing.lastSubmission = submission;

    logFn("earn:heart_job_submitted", {
      workerId,
      jobId: job.id,
      submission,
      cycleIndex: heartCycle
    });

    return { job, result, submission };

  } catch (err) {
    heartHealing.lastError = {
      message: err.message,
      workerId,
      cycleIndex: heartCycle
    };

    logFn("earn:heart_error", {
      workerId,
      error: err.message,
      cycleIndex: heartCycle
    });

    if (stopOnError) {
      heartHealing.lastExitReason = "hardStop";
      engineRef.hardStop(config, err.message);
    }

    return null;
  }
}

// ---------------------------------------------------------------------------
// stopPulseEarnHeart — No-op (engine controls lifecycle)
// ---------------------------------------------------------------------------
export function stopPulseEarnHeart() {
  // v10.4: Heart does not own lifecycle
}

// ---------------------------------------------------------------------------
// Export healing metadata — Cardiac Rhythm Report
// ---------------------------------------------------------------------------
export function getPulseEarnHeartHealingState() {
  return { ...heartHealing };
}
