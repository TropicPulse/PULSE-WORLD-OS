// pulse-miner/MinerEngine.js

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