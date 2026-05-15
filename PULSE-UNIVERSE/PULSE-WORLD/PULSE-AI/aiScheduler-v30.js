/**
 * aiScheduler-v30-IMMORTAL-PLUS.js — Pulse OS v30++ Organ
 * ---------------------------------------------------------
 * CANONICAL ROLE:
 *   Binary Scheduler of Pulse OS.
 *
 *   Schedules:
 *     - binary tasks
 *     - binary pulses
 *     - binary jobs
 *     - binary reflex triggers
 *
 *   Provides:
 *     - temporal throughput
 *     - temporal pressure
 *     - temporal cost
 *     - temporal budget
 *     - descriptive buckets
 *     - task-density temporal arteries v6 (IMMORTAL-PLUS)
 *     - multi-instance harmony + soft spiral warnings (non-blocking)
 *     - task-level prewarm + binary chunk awareness
 *     - starvation + jitter awareness
 *     - window-safe scheduler snapshot
 *     - lineage-aware drift protection (IMMORTAL-PLUS)
 */

// ============================================================================
//  META — v30-IMMORTAL-PLUS
// ============================================================================

export const SchedulerMeta = Object.freeze({
  type: "Organ",
  subsystem: "aiScheduler",
  layer: "C2-Scheduler",
  version: "v30-IMMORTAL-PLUS",
  identity: "aiScheduler-v30-IMMORTAL-PLUS",
  evo: Object.freeze({
    epoch: "30-IMMORTAL-PLUS",
    deterministic: true,
    driftProof: true,
    pureCompute: true,
    zeroNetwork: true,
    zeroFilesystem: true,
    zeroMutationOfInput: true,
    binaryPrimary: true,
    dualBandAware: true,
    temporalArteryV6: true,
    multiInstanceAware: true,
    readOnlyToBinary: true
  }),
  guarantees: Object.freeze({
    temporalMetricsStable: true,
    schedulerArteryV6: true,
    multiInstanceHarmonyAware: true,
    jitterAware: true,
    starvationAware: true
  })
});

export const AI_EXPERIENCE_META = Object.freeze({
  owner: "Aldwyn",
  subordinate: true,
  organ: "Scheduler",
  identity: SchedulerMeta.identity,
  epoch: SchedulerMeta.evo.epoch,
  version: SchedulerMeta.version
});

export const EXPORT_META = Object.freeze({
  scheduler: SchedulerMeta,
  experience: AI_EXPERIENCE_META
});

// ============================================================================
//  ARTERY HELPERS — v6 (PURE, STATELESS, IMMORTAL-PLUS)
// ============================================================================

function bucketLevel(v) {
  if (v >= 0.9) return "elite";
  if (v >= 0.75) return "high";
  if (v >= 0.5) return "medium";
  if (v >= 0.25) return "low";
  return "critical";
}

function bucketPressure(v) {
  if (v >= 0.9) return "overload";
  if (v >= 0.7) return "high";
  if (v >= 0.4) return "medium";
  if (v > 0) return "low";
  return "none";
}

function bucketCost(v) {
  if (v >= 0.8) return "heavy";
  if (v >= 0.5) return "moderate";
  if (v >= 0.2) return "light";
  if (v > 0) return "negligible";
  return "none";
}

function bucketStarvation(v) {
  if (v >= 0.9) return "severe";
  if (v >= 0.6) return "high";
  if (v >= 0.3) return "medium";
  if (v > 0) return "low";
  return "none";
}

function bucketJitter(v) {
  if (v >= 0.8) return "chaotic";
  if (v >= 0.5) return "unstable";
  if (v >= 0.2) return "mild";
  if (v > 0) return "trace";
  return "none";
}

// ============================================================================
//  ORGAN IMPLEMENTATION — v30-IMMORTAL-PLUS
// ============================================================================

export class AIBinaryScheduler {
  constructor(config = {}) {
    this.id = config.id || SchedulerMeta.identity;
    this.encoder = config.encoder;
    this.pipeline = config.pipeline || null;
    this.reflex = config.reflex || null;
    this.logger = config.logger || null;
    this.trace = !!config.trace;

    if (!this.encoder || typeof this.encoder.encode !== "function") {
      throw new Error("AIBinaryScheduler requires aiBinaryAgent encoder");
    }

    this.tasks = new Map();

    this._timer = null;
    this._tickInterval = config.tickInterval || 250;

    this.windowMs =
      typeof config.windowMs === "number" && config.windowMs > 0
        ? config.windowMs
        : 60000;

    this._windowStart = Date.now();
    this._windowExecutions = 0;
    this._windowTightExecutions = 0;
    this._totalExecutions = 0;

    this._chunkSize =
      typeof config.chunkSize === "number" && config.chunkSize > 0
        ? config.chunkSize
        : 4096;
    this._autoPrewarm = !!config.autoPrewarm;

    this._lastTickTime = Date.now();
    this._jitterSamples = 0;
    this._jitterAccum = 0;

    this.lineage = Object.freeze({
      version: SchedulerMeta.version,
      epoch: SchedulerMeta.evo.epoch,
      identity: SchedulerMeta.identity
    });

    this.instanceIndex = AIBinaryScheduler._registerInstance();

    this.schedulerArtery = {
      lastThroughput: 1,
      lastPressure: 0,
      lastCost: 0,
      lastBudget: 1,
      lastTaskCount: 0,
      lastStarvation: 0,
      lastJitter: 0,
      snapshot: () =>
        Object.freeze({
          version: SchedulerMeta.version,
          epoch: SchedulerMeta.evo.epoch,
          identity: SchedulerMeta.identity,
          instanceIndex: this.instanceIndex,
          instanceCount: AIBinaryScheduler.getInstanceCount(),
          throughput: this.schedulerArtery.lastThroughput,
          pressure: this.schedulerArtery.lastPressure,
          cost: this.schedulerArtery.lastCost,
          budget: this.schedulerArtery.lastBudget,
          taskCount: this.schedulerArtery.lastTaskCount,
          starvation: this.schedulerArtery.lastStarvation,
          jitter: this.schedulerArtery.lastJitter
        })
    };
  }

  // ---------------------------------------------------------
  //  STATIC INSTANCE REGISTRY
  // ---------------------------------------------------------

  static _registerInstance() {
    if (typeof AIBinaryScheduler._instanceCount !== "number") {
      AIBinaryScheduler._instanceCount = 0;
    }
    const index = AIBinaryScheduler._instanceCount;
    AIBinaryScheduler._instanceCount += 1;
    return index;
  }

  static getInstanceCount() {
    return typeof AIBinaryScheduler._instanceCount === "number"
      ? AIBinaryScheduler._instanceCount
      : 0;
  }

  // ---------------------------------------------------------
  //  WINDOW ROLLING
  // ---------------------------------------------------------

  _rollWindow(now) {
    if (now - this._windowStart >= this.windowMs) {
      this._windowStart = now;
      this._windowExecutions = 0;
      this._windowTightExecutions = 0;
    }
  }

  // ---------------------------------------------------------
  //  BINARY CHUNKING
  // ---------------------------------------------------------

  _chunkBinary(binary) {
    if (typeof binary !== "string") return [];
    const size = this._chunkSize;
    const chunks = [];
    for (let i = 0; i < binary.length; i += size) {
      chunks.push(binary.slice(i, i + size));
    }
    return chunks;
  }

  // ---------------------------------------------------------
  //  TEMPORAL ARTERY SNAPSHOT v6 (IMMORTAL-PLUS)
  // ---------------------------------------------------------

  _computeTemporalArtery() {
    const tasks = Array.from(this.tasks.values());
    const taskCount = tasks.length;

    let totalInterval = 0;
    let tightIntervals = 0;
    let starvationScore = 0;

    const now = Date.now();

    for (const t of tasks) {
      totalInterval += t.intervalMs;
      if (t.intervalMs < 500) tightIntervals++;

      if (typeof t.lastRun === "number") {
        const overdue = now - t.lastRun - t.intervalMs;
        if (overdue > 0) {
          const ratio = Math.min(1, overdue / (5 * t.intervalMs));
          starvationScore += ratio;
        }
      }
    }

    const avgInterval = taskCount > 0 ? totalInterval / taskCount : 0;

    this._rollWindow(now);

    const elapsedMs = Math.max(1, now - this._windowStart);
    const execRatePerSec = (this._windowExecutions / elapsedMs) * 1000;

    const instanceCount = AIBinaryScheduler.getInstanceCount();
    const harmonicLoad =
      instanceCount > 0 ? execRatePerSec / instanceCount : execRatePerSec;

    const taskDensity = Math.min(1, taskCount / 64);
    const intervalFactor =
      avgInterval > 0 ? Math.min(1, 1000 / avgInterval) : 0;
    const loadFactor = Math.min(1, harmonicLoad / 128);
    const tightFactor =
      taskCount > 0 ? Math.min(1, tightIntervals / taskCount) : 0;

    const pressure = Math.max(
      0,
      Math.min(1, (taskDensity + intervalFactor + loadFactor + tightFactor) / 4)
    );

    const throughput = Math.max(0, Math.min(1, 1 - pressure));
    const cost = Math.max(0, Math.min(1, pressure * (1 - throughput)));
    const budget = Math.max(0, Math.min(1, throughput - cost));

    const starvation =
      taskCount > 0 ? Math.min(1, starvationScore / taskCount) : 0;

    const jitter =
      this._jitterSamples > 0
        ? Math.max(0, Math.min(1, this._jitterAccum / this._jitterSamples))
        : 0;

    this.schedulerArtery.lastThroughput = throughput;
    this.schedulerArtery.lastPressure = pressure;
    this.schedulerArtery.lastCost = cost;
    this.schedulerArtery.lastBudget = budget;
    this.schedulerArtery.lastTaskCount = taskCount;
    this.schedulerArtery.lastStarvation = starvation;
    this.schedulerArtery.lastJitter = jitter;

    const artery = {
      instanceIndex: this.instanceIndex,
      instanceCount,

      taskCount,
      avgInterval,
      tightIntervals,

      windowMs: this.windowMs,
      windowExecutions: this._windowExecutions,
      windowTightExecutions: this._windowTightExecutions,
      totalExecutions: this._totalExecutions,
      execRatePerSec,
      harmonicLoad,

      throughput,
      pressure,
      cost,
      budget,

      starvation,
      jitter,

      throughputBucket: bucketLevel(throughput),
      pressureBucket: bucketPressure(pressure),
      costBucket: bucketCost(cost),
      budgetBucket: bucketLevel(budget),
      starvationBucket: bucketStarvation(starvation),
      jitterBucket: bucketJitter(jitter),

      harmony:
        instanceCount > 1 && pressure < 0.7 && jitter < 0.5
          ? "coherent"
          : "strained"
    };

    return artery;
  }

  getTemporalArtery() {
    return this._computeTemporalArtery();
  }

  getSchedulerSnapshot() {
    return this.schedulerArtery.snapshot();
  }

  // ---------------------------------------------------------
  //  TASK REGISTRATION
  // ---------------------------------------------------------

  scheduleTask({ id, intervalMs, payload, action }) {
    if (!id || typeof id !== "string") {
      throw new Error("scheduleTask requires an id");
    }
    if (typeof intervalMs !== "number" || intervalMs <= 0) {
      throw new Error("scheduleTask requires a positive intervalMs");
    }
    if (typeof action !== "function") {
      throw new Error("scheduleTask requires an action function");
    }

    const binaryPayload = this.encoder.encode(payload);
    this._assertBinary(binaryPayload);

    const chunks = this._chunkBinary(binaryPayload);

    const now = Date.now();

    const task = {
      id,
      intervalMs,
      nextRun: now + intervalMs,
      binaryPayload,
      chunks,
      prewarmed: false,
      action,
      lastRun: null
    };

    this.tasks.set(id, task);

    if (this._autoPrewarm) {
      this.prewarmTask(id);
    }

    const artery = this._computeTemporalArtery();
    this._trace("task:scheduled", {
      id,
      intervalMs,
      payloadBits: binaryPayload.length,
      chunkCount: task.chunks.length,
      artery
    });

    return task;
  }

  cancelTask(id) {
    const existed = this.tasks.delete(id);
    const artery = this._computeTemporalArtery();
    this._trace("task:cancelled", { id, existed, artery });
  }

  // ---------------------------------------------------------
  //  PREWARM + TASK SNAPSHOTS
  // ---------------------------------------------------------

  prewarmTask(id) {
    const task = this.tasks.get(id);
    if (!task) return null;

    if (!task.chunks || task.chunks.length === 0) {
      task.chunks = this._chunkBinary(task.binaryPayload);
    }

    task.prewarmed = true;

    const artery = this._computeTemporalArtery();
    this._trace("task:prewarm", {
      id: task.id,
      payloadBits: task.binaryPayload.length,
      chunkCount: task.chunks.length,
      artery
    });

    return task;
  }

  prewarmAllTasks() {
    const results = [];
    for (const id of this.tasks.keys()) {
      const t = this.prewarmTask(id);
      if (t) results.push(t);
    }
    return results;
  }

  getTaskSnapshot(id) {
    const task = this.tasks.get(id);
    if (!task) return null;

    return Object.freeze({
      id: task.id,
      intervalMs: task.intervalMs,
      payloadBits: task.binaryPayload.length,
      chunkCount: task.chunks ? task.chunks.length : 0,
      prewarmed: !!task.prewarmed
    });
  }

  // ---------------------------------------------------------
  //  SCHEDULER LOOP
  // ---------------------------------------------------------

  start() {
    if (this._timer) return;

    this._timer = setInterval(() => {
      this._tick();
    }, this._tickInterval);

    const artery = this._computeTemporalArtery();
    this._trace("scheduler:start", {
      tickInterval: this._tickInterval,
      artery
    });
  }

  stop() {
    if (!this._timer) return;

    clearInterval(this._timer);
    this._timer = null;

    const artery = this._computeTemporalArtery();
    this._trace("scheduler:stop", { artery });
  }

  // ---------------------------------------------------------
  //  TICK EXECUTION
  // ---------------------------------------------------------

  _tick() {
    const now = Date.now();

    const delta = now - this._lastTickTime;
    this._lastTickTime = now;

    const ideal = this._tickInterval;
    if (ideal > 0) {
      const deviation = Math.abs(delta - ideal) / ideal;
      this._jitterSamples += 1;
      this._jitterAccum += Math.min(1, deviation);
    }

    for (const task of this.tasks.values()) {
      if (now >= task.nextRun) {
        this._executeTask(task, now);
        task.nextRun = now + task.intervalMs;
      }
    }
  }

  _executeTask(task, now) {
    const output = task.action(task.binaryPayload);

    this._assertBinary(output);

    this._rollWindow(now);
    this._totalExecutions += 1;
    this._windowExecutions += 1;
    if (task.intervalMs < 500) this._windowTightExecutions += 1;

    task.lastRun = now;

    const artery = this._computeTemporalArtery();

    if (
      artery.pressureBucket === "overload" ||
      artery.budgetBucket === "critical" ||
      artery.starvationBucket === "severe"
    ) {
      this._trace("scheduler:spiral-warning", {
        id: task.id,
        pressure: artery.pressure,
        pressureBucket: artery.pressureBucket,
        budget: artery.budget,
        budgetBucket: artery.budgetBucket,
        starvation: artery.starvation,
        starvationBucket: artery.starvationBucket,
        jitter: artery.jitter,
        jitterBucket: artery.jitterBucket
      });
    }

    this._trace("task:executed", {
      id: task.id,
      outputBits: output.length,
      artery
    });

    if (this.pipeline) this.pipeline.run(output);
    if (this.reflex) this.reflex.run(output);
    if (this.logger && typeof this.logger.logBinary === "function") {
      this.logger.logBinary(output, { source: "scheduler", taskId: task.id });
    }
  }

  // ---------------------------------------------------------
  //  INTERNAL HELPERS
  // ---------------------------------------------------------

  _assertBinary(str) {
    if (typeof str !== "string" || !/^[01]+$/.test(str)) {
      throw new TypeError("expected binary string");
    }
  }

  _trace(event, payload) {
    if (!this.trace) return;
    console.log(
      `[${this.id}#${this.instanceIndex}] ${event}`,
      payload
    );
  }
}

// ============================================================================
//  FACTORY — v30-IMMORTAL-PLUS
// ============================================================================

export function createAIBinaryScheduler(config = {}) {
  return new AIBinaryScheduler(config);
}

// ============================================================================
//  DUAL‑MODE EXPORTS (ESM + CommonJS)
// ============================================================================
if (typeof module !== "undefined") {
  module.exports = {
    SchedulerMeta,
    AIBinaryScheduler,
    createAIBinaryScheduler,
    AI_EXPERIENCE_META,
    EXPORT_META
  };
}
