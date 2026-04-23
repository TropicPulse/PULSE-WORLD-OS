// ============================================================================
// FILE: tropic-pulse-functions/apps/pulse-earn/EarnEngine-v11-Evo.js
// LAYER: THE MUSCLE SYSTEM (v11-Evo)
// (Deterministic Worker Supervisor + Profit Orchestrator)
// ============================================================================
//
// ROLE (v11-Evo):
//   THE MUSCLE SYSTEM — deterministic contraction engine of Pulse‑Earn.
//   • Executes a single contraction cycle per invocation.
//   • Fetches deterministic jobs from Nervous System.
//   • Executes deterministic compute via injected PulseSendSystem.
//   • Submits deterministic results via Lymph Nodes.
//   • Maintains healing + pressure metadata (muscle memory + signatures).
//
// PURPOSE (v11-Evo):
//   • Replace async worker loops with deterministic single‑cycle contraction.
//   • Remove nondeterminism, concurrency, timestamps, sleeps.
//   • Guarantee drift‑proof Earn → Pulse → Send execution.
//   • Maintain muscle memory + signatures for healers.
//
// CONTRACT (v11-Evo):
//   • PURE SUPERVISOR — no AI layers, no translation, no memory model.
//   • NO async, NO await, NO timers, NO concurrency.
//   • NO eval(), NO Function(), NO dynamic imports.
//   • Deterministic contraction only.
//   • PulseSendSystem is injected, not imported.
// ============================================================================

import { fetchJobFromMarketplace } from "./PulseEarnNervousSystem-v11-Evo.js";
import { submitMarketplaceResult } from "./PulseEarnLymphNodes-v11-Evo.js";


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
// FACTORY — createEarnEngine (v11-Evo)
// ============================================================================
export function createEarnEngine({
  pulseSendSystem,      // required: injected PulseSendSystem (must expose compute(job, ctx))
  log = console.log     // optional: deterministic logger
} = {}) {
  if (!pulseSendSystem || typeof pulseSendSystem.compute !== "function") {
    throw new Error(
      "[EarnEngine-v11-Evo] pulseSendSystem with compute(job, ctx) is required."
    );
  }

  const engine = {
    // -----------------------------------------------------------------------
    // Healing Metadata — Muscle Memory Log (v11-Evo)
    // -----------------------------------------------------------------------
    running: false,
    engineState: "idle",
    cycleCount: 0,
    lastJob: null,
    lastResult: null,
    lastError: null,
    lastReason: null,

    lastTendonContext: null,
    lastVolatility: null,

    eventSeq: 0,

    lastEngineSignature: null,
    lastJobSignature: null,
    lastResultSignature: null,

    // -----------------------------------------------------------------------
    // Internal: unified event logger
    // -----------------------------------------------------------------------
    logEvent(stage, details = {}) {
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
        lastVolatility: this.lastVolatility,
        lastEngineSignature: this.lastEngineSignature,
        lastJobSignature: this.lastJobSignature,
        lastResultSignature: this.lastResultSignature
      };

      log(stage, { ...base, ...details });
    },

    // -----------------------------------------------------------------------
    // Internal: signature builders
    // -----------------------------------------------------------------------
    buildEngineSignature() {
      return computeHash(
        `ENGINE::${this.engineState}::${this.cycleCount}::${this.lastJob?.id || "NO_JOB"}`
      );
    },

    buildJobSignature(job) {
      if (!job) return "JOB::NONE";
      return computeHash(
        `JOB::${job.id}::${job.marketplaceId || "NO_MARKET"}`
      );
    },

    buildResultSignature(job, result) {
      const success = result && typeof result.success === "boolean"
        ? result.success
        : null;

      return computeHash(
        `RESULT::${job?.id || "NO_JOB"}::${success === null ? "NA" : success}`
      );
    },

    // -----------------------------------------------------------------------
    // start() — Begin deterministic contraction mode
    // -----------------------------------------------------------------------
    start() {
      if (this.running) {
        this.logEvent("earn:already_running");
        return;
      }

      this.running = true;
      this.engineState = "running";
      this.lastReason = null;

      this.lastEngineSignature = this.buildEngineSignature();

      this.logEvent("earn:engine_start", {
        mode: "deterministic_single_cycle"
      });
    },

    // -----------------------------------------------------------------------
    // stop() — Controlled Relaxation
    // -----------------------------------------------------------------------
    stop() {
      if (!this.running) return;

      this.running = false;
      this.engineState = "stopped";

      this.lastEngineSignature = this.buildEngineSignature();

      this.logEvent("earn:engine_stop");
    },

    // -----------------------------------------------------------------------
    // cycle() — ONE deterministic contraction cycle
    // -----------------------------------------------------------------------
    cycle() {
      if (!this.running) {
        this.logEvent("earn:cycle_ignored_not_running");
        return null;
      }

      try {
        this.cycleCount++;

        // ------------------------------------------------------
        // 1. FETCH — Motor signal (deterministic)
        // ------------------------------------------------------
        const job = fetchJobFromMarketplace();

        if (!job) {
          this.logEvent("earn:no_job_available", {
            cycle: this.cycleCount
          });
          this.lastEngineSignature = this.buildEngineSignature();
          return null;
        }

        this.lastJob = job;
        this.lastJobSignature = this.buildJobSignature(job);

        const tendonContext = job.impulse?.flags?.earner_context || null;
        const volatility = job.impulse?.flags?.earner_volatility ?? null;

        this.lastTendonContext = tendonContext;
        this.lastVolatility = volatility;

        this.logEvent("earn:job_selected", {
          jobId: job.id,
          tendonClass: tendonContext?.class,
          earnerVolatility: volatility
        });

        // ------------------------------------------------------
        // 2. EXECUTE — Contraction (PulseSend deterministic)
        // ------------------------------------------------------
        const result = pulseSendSystem.compute(job, {
          tendonContext,
          volatility
        });

        this.lastResult = result;
        this.lastResultSignature = this.buildResultSignature(job, result);

        this.logEvent("earn:job_executed", {
          jobId: job.id,
          success: result?.success,
          tendonClass: tendonContext?.class,
          earnerVolatility: volatility
        });

        // ------------------------------------------------------
        // 3. SUBMIT — Release (deterministic)
        // ------------------------------------------------------
        const submission = submitMarketplaceResult(job, result);

        this.lastEngineSignature = this.buildEngineSignature();

        this.logEvent("earn:job_submitted", {
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

        this.logEvent("earn:cycle_error", {
          error: err.message
        });

        this.lastEngineSignature = this.buildEngineSignature();

        return null;
      }
    },

    // -----------------------------------------------------------------------
    // diagnostics() — v11-Evo muscle diagnostics
    // -----------------------------------------------------------------------
    diagnostics() {
      return {
        engineState: this.engineState,
        cycleCount: this.cycleCount,
        lastJobId: this.lastJob?.id || null,
        lastError: this.lastError || null,
        lastReason: this.lastReason || null,
        lastTendonContext: this.lastTendonContext,
        lastVolatility: this.lastVolatility,
        lastEngineSignature: this.lastEngineSignature,
        lastJobSignature: this.lastJobSignature,
        lastResultSignature: this.lastResultSignature
      };
    }
  };

  return engine;
}

export default createEarnEngine;
