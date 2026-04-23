// ============================================================================
// FILE: tropic-pulse-functions/apps/pulse-earn/PulseEarnHeart-v11-Evo.js
// LAYER: THE HEART (v11-Evo)
// (Deterministic Heartbeat Cycle + Circulatory Pump)
// ============================================================================
//
// ROLE (v11-Evo):
//   THE HEART — Pulse‑Earn’s deterministic rhythmic engine.
//   • Performs ONE cardiac cycle per invocation.
//   • Pulls jobs from the Nervous System.
//   • Executes jobs via injected Metabolism or PulseSendSystem.
//   • Submits results via Lymph Nodes.
//   • Emits v11‑Evo signatures + cardiac diagnostics.
//
// PURPOSE (v11-Evo):
//   • Provide a deterministic, drift‑proof execution cycle.
//   • Guarantee safe job → compute → submit flow.
//   • Maintain healing metadata for the Immune System.
//   • Preserve cardiac rhythm (conceptual only).
//
// CONTRACT (v11-Evo):
//   • PURE RUNTIME — no AI layers, no translation, no memory model.
//   • NO async, NO timers, NO timestamps.
//   • Deterministic cycle only.
//   • PulseSendSystem + Metabolism are injected, not imported.
// ============================================================================

import { getNextMarketplaceJob } from "./PulseEarnNervousSystem-v11-Evo.js";
import { executePulseEarnJob } from "./PulseEarnMetabolism-v11-Evo.js";
import { submitPulseEarnResult } from "./PulseEarnLymphNodes-v11-Evo.js";


// ============================================================================
// Healing Metadata — Cardiac Rhythm Log (v11-Evo)
// ============================================================================
const heartHealing = {
  cycles: 0,
  lastJob: null,
  lastResult: null,
  lastSubmission: null,
  lastError: null,
  lastExitReason: null,
  lastCycleIndex: null,

  lastHeartSignature: null,
  lastJobSignature: null,
  lastResultSignature: null,
  lastSubmissionSignature: null
};

// Deterministic cycle counter
let heartCycle = 0;


// ============================================================================
// Deterministic Hash Helper — v11-Evo
// ============================================================================
function computeHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `h${h}`;
}


// ============================================================================
// Signature Builders — v11-Evo
// ============================================================================
function buildHeartSignature(cycle) {
  return computeHash(`HEART::${cycle}`);
}

function buildJobSignature(job) {
  if (!job) return "JOB::NONE";
  return computeHash(`JOB::${job.id}::${job.marketplace}`);
}

function buildResultSignature(result) {
  if (!result) return "RESULT::NONE";
  return computeHash(`RESULT::${result.success ? "OK" : "FAIL"}`);
}

function buildSubmissionSignature(submission) {
  if (!submission) return "SUBMIT::NONE";
  return computeHash(`SUBMIT::${submission.success ? "OK" : "FAIL"}`);
}


// ============================================================================
// FACTORY — createPulseEarnHeart (v11-Evo)
// ============================================================================
export function createPulseEarnHeart({
  pulseSendSystem,   // optional: injected PulseSendSystem (compute override)
  log = console.log  // deterministic logger
} = {}) {

  const heart = {

    // -----------------------------------------------------------------------
    // ONE deterministic heartbeat
    // -----------------------------------------------------------------------
    cycle(workerId, engineRef) {
      heartCycle++;
      heartHealing.cycles++;
      heartHealing.lastCycleIndex = heartCycle;

      if (!engineRef.running) {
        heartHealing.lastExitReason = "engine_not_running";
        return null;
      }

      try {
        // ------------------------------------------------------
        // 1. FETCH — Systole: Heart contracts, pulling in blood
        // ------------------------------------------------------
        const job = getNextMarketplaceJob(workerId);

        if (!job) {
          log("earn:heart_no_job", { workerId, cycleIndex: heartCycle });
          return null;
        }

        heartHealing.lastJob = job;
        heartHealing.lastJobSignature = buildJobSignature(job);

        log("earn:heart_job_selected", {
          workerId,
          jobId: job.id,
          cycleIndex: heartCycle
        });

        // ------------------------------------------------------
        // 2. EXECUTE — Cardiac output: Heart pumps
        // ------------------------------------------------------
        let result;

        if (pulseSendSystem && typeof pulseSendSystem.compute === "function") {
          // PulseSendSystem override path
          result = pulseSendSystem.compute(job, {});
        } else {
          // Default metabolic execution path
          result = executePulseEarnJob(job);
        }

        heartHealing.lastResult = result;
        heartHealing.lastResultSignature = buildResultSignature(result);

        log("earn:heart_job_executed", {
          workerId,
          jobId: job.id,
          success: result.success,
          cycleIndex: heartCycle
        });

        // ------------------------------------------------------
        // 3. SUBMIT — Venous return: Blood flows back
        // ------------------------------------------------------
        const submission = submitPulseEarnResult(job, result);
        heartHealing.lastSubmission = submission;
        heartHealing.lastSubmissionSignature = buildSubmissionSignature(submission);

        log("earn:heart_job_submitted", {
          workerId,
          jobId: job.id,
          submission,
          cycleIndex: heartCycle
        });

        // ------------------------------------------------------
        // 4. Heartbeat Signature
        // ------------------------------------------------------
        heartHealing.lastHeartSignature = buildHeartSignature(heartCycle);

        return {
          job,
          result,
          submission,
          heartSignature: heartHealing.lastHeartSignature
        };

      } catch (err) {
        heartHealing.lastError = {
          message: err.message,
          workerId,
          cycleIndex: heartCycle
        };

        log("earn:heart_error", {
          workerId,
          error: err.message,
          cycleIndex: heartCycle
        });

        if (engineRef.stopOnError) {
          heartHealing.lastExitReason = "hardStop";
          engineRef.hardStop(err.message);
        }

        return null;
      }
    },

    // -----------------------------------------------------------------------
    // stop — no-op (engine owns lifecycle)
    // -----------------------------------------------------------------------
    stop() {},

    // -----------------------------------------------------------------------
    // diagnostics — v11-Evo cardiac telemetry
    // -----------------------------------------------------------------------
    diagnostics() {
      return {
        cycles: heartHealing.cycles,
        lastJob: heartHealing.lastJob,
        lastResult: heartHealing.lastResult,
        lastSubmission: heartHealing.lastSubmission,
        lastError: heartHealing.lastError,
        lastExitReason: heartHealing.lastExitReason,
        lastCycleIndex: heartHealing.lastCycleIndex,

        lastHeartSignature: heartHealing.lastHeartSignature,
        lastJobSignature: heartHealing.lastJobSignature,
        lastResultSignature: heartHealing.lastResultSignature,
        lastSubmissionSignature: heartHealing.lastSubmissionSignature
      };
    }
  };

  return heart;
}


// ============================================================================
// Export healing metadata — Cardiac Rhythm Report (v11-Evo)
// ============================================================================
export function getPulseEarnHeartHealingState() {
  return { ...heartHealing };
}
