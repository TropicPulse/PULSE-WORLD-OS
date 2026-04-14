// pulse-miner/MinerRuntime.js
// NEW RUNTIME — aligned with marketplace miner architecture

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