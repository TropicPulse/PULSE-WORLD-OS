// ============================================================================
// FILE: tropic-pulse-functions/apps/pulse-earn/EarnEngine.js
// LAYER: THE MUSCLE SYSTEM (v10.4)
// (Deterministic Worker Supervisor + Profit Orchestrator)
// ============================================================================
//
// ROLE (v10.4):
//   THE MUSCLE SYSTEM — deterministic contraction engine of Pulse‑Earn.
//   • Executes a single contraction cycle per invocation.
//   • Fetches deterministic jobs from Nervous System.
//   • Executes deterministic compute via PulseSendSystem.
//   • Submits deterministic results via Lymph Nodes.
//   • Maintains healing + pressure metadata (muscle memory).
//
// PURPOSE (v10.4):
//   • Replace async worker loops with deterministic single‑cycle contraction.
//   • Remove nondeterminism, concurrency, timestamps, sleeps.
//   • Guarantee drift‑proof Earn → Pulse → Send execution.
//   • Maintain muscle memory for healers.
//
// CONTRACT (v10.4):
//   • PURE SUPERVISOR — no AI layers, no translation, no memory model.
//   • NO async, NO await, NO timers, NO concurrency.
//   • NO eval(), NO Function(), NO dynamic imports.
//   • Deterministic contraction only.
// ============================================================================

import { fetchJobFromMarketplace } from "./PulseEarnNervousSystem.js";
import { PulseSendSystem } from "../pulse-send/PulseSendSystem.js";
import { submitJobResult } from "./PulseEarnLymphNodes.js";

const EarnEngine = {
  running: false,

  // -------------------------------------------------------------------------
  // Healing Metadata — Muscle Memory Log
  // -------------------------------------------------------------------------
  engineState: "idle",
  cycleCount: 0,
  lastJob: null,
  lastResult: null,
  lastError: null,
  lastReason: null,

  lastTendonContext: null,
  lastVolatility: null,

  eventSeq: 0,

  // -------------------------------------------------------------------------
  // Internal: unified event logger
  // -------------------------------------------------------------------------
  logEvent(config, stage, details = {}) {
    this.eventSeq++;

    const base = {
      seq: this.eventSeq,
      stage,
      engineState: this.engineState,
      cycleCount: this.cycleCount,
      lastJobId: this.lastJob?.id || null,
      lastError: this.lastError || null,
      lastReason: this.lastReason || null,
      lastTendonContext: this.lastTendonContext,
      lastVolatility: this.lastVolatility
    };

    config.logFn(stage, { ...base, ...details });
  },

  // -------------------------------------------------------------------------
  // start(config) — Begin deterministic contraction mode
  // -------------------------------------------------------------------------
  start(config) {
    if (this.running) {
      this.logEvent(config, "earn:already_running");
      return;
    }

    this.running = true;
    this.engineState = "running";
    this.lastReason = null;

    this.logEvent(config, "earn:engine_start", {
      mode: "deterministic_single_cycle"
    });
  },

  // -------------------------------------------------------------------------
  // stop(config) — Controlled Relaxation
  // -------------------------------------------------------------------------
  stop(config) {
    if (!this.running) return;

    this.running = false;
    this.engineState = "stopped";

    this.logEvent(config, "earn:engine_stop");
  },

  // -------------------------------------------------------------------------
  // cycle(config) — ONE deterministic contraction cycle
  // -------------------------------------------------------------------------
  cycle(config) {
    if (!this.running) {
      this.logEvent(config, "earn:cycle_ignored_not_running");
      return null;
    }

    try {
      this.cycleCount++;

      // ------------------------------------------------------
      // 1. FETCH — Motor signal (deterministic)
      // ------------------------------------------------------
      const job = fetchJobFromMarketplace();

      if (!job) {
        this.logEvent(config, "earn:no_job_available", {
          cycle: this.cycleCount
        });
        return null;
      }

      this.lastJob = job;

      const tendonContext = job.impulse?.flags?.earner_context || null;
      const volatility = job.impulse?.flags?.earner_volatility ?? null;

      this.lastTendonContext = tendonContext;
      this.lastVolatility = volatility;

      this.logEvent(config, "earn:job_selected", {
        jobId: job.id,
        tendonClass: tendonContext?.class,
        earnerVolatility: volatility
      });

      // ------------------------------------------------------
      // 2. EXECUTE — Contraction (PulseSend deterministic)
      // ------------------------------------------------------
      const result = PulseSendSystem.compute(job, {
        tendonContext,
        volatility,
        config
      });

      this.lastResult = result;

      this.logEvent(config, "earn:job_executed", {
        jobId: job.id,
        success: result?.success,
        tendonClass: tendonContext?.class,
        earnerVolatility: volatility
      });

      // ------------------------------------------------------
      // 3. SUBMIT — Release (deterministic)
      // ------------------------------------------------------
      const submission = submitJobResult(job, result);

      this.logEvent(config, "earn:job_submitted", {
        jobId: job.id,
        submission,
        tendonClass: tendonContext?.class,
        earnerVolatility: volatility
      });

      return {
        job,
        result,
        submission
      };

    } catch (err) {
      this.lastError = err.message;

      this.logEvent(config, "earn:cycle_error", {
        error: err.message
      });

      if (config.stopOnError) {
        this.stop(config);
      }

      return null;
    }
  }
};

export default EarnEngine;
