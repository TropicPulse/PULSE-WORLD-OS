// ============================================================================
//  PULSE OS v24‑IMMORTAL++ — REFLEX ENGINE ORGAN
//  Pure‑Binary Reflex Engine • Reflex Artery v5 • IMMORTAL++ Metrics
//  PURE BINARY ARC. ZERO SYMBOLIC. ZERO COGNITION. ZERO RANDOMNESS.
// ============================================================================
import { OrganismIdentity } from "../PULSE-X/PulseWorldOrganismMap-v24.js";

const Identity = OrganismIdentity(import.meta.url);

// or: const Identity = OrganismIdentity["pulse-ai/ai-v24.0-IMMORTAL"] if that's the key you chose

// ============================================================================
//  META BLOCK — v24.0 IMMORTAL (ORGANISM KERNEL)
//  (now backed by the Organism Map instead of hardcoded here)
// ============================================================================
export const ReflexMeta = Identity.OrganMeta;

// ============================================================================
//  SURFACE / ORGANISM LAYER EXPORTS — v24.0 IMMORTAL
//  (for Understanding / CNS / Portal alignment)
// ============================================================================

// Required 3 for every “surface” in the organism graph
export const pulseRole = Identity.pulseRole;

export const surfaceMeta = Identity.surfaceMeta;

export const pulseLoreContext = Identity.pulseLoreContext;

// Optional: richer experience meta for AI / tooling
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;

// Optional: export meta for tooling / dev panels
export const EXPORT_META = Identity.EXPORT_META;

// ============================================================================
//  PACKET EMITTER — deterministic, reflex-scoped
// ============================================================================
function emitReflexPacket(type, payload) {
  const now = Date.now();
  return Object.freeze({
    meta: ReflexMeta,
    exportMeta: EXPORT_META,
    packetType: `reflex-${type}`,
    packetId: `reflex-${type}-${now}`,
    timestamp: now,
    epoch: ReflexMeta.evo.epoch,
    ...payload
  });
}

// ============================================================================
//  PREWARM — IMMORTAL++
// ============================================================================
export function prewarmReflexEngine({ trace = false } = {}) {
  const packet = emitReflexPacket("prewarm", {
    message: "Reflex engine prewarmed and artery metrics aligned."
  });

  if (trace) console.log("[ReflexEngine] prewarm", packet);
  return packet;
}

// ============================================================================
//  ORGAN IMPLEMENTATION — PURE BINARY REFLEX ENGINE (v24‑IMMORTAL++)
// ============================================================================
export class AIBinaryReflex {
  constructor(config = {}) {
    this.id = config.id || ReflexMeta.identity;
    this.trace = !!config.trace;

    this.slice = config.slice || "default";
    this.reflexes = [];

    this.reflexArtery = {
      lastThroughput: 1,
      lastPressure: 0,
      lastCost: 0,
      lastBudget: 1,
      lastReflexCount: 0,
      lastTightTriggers: 0,
      snapshot: () =>
        emitReflexPacket(
          "snapshot",
          Object.freeze({
            throughput: this.reflexArtery.lastThroughput,
            pressure: this.reflexArtery.lastPressure,
            cost: this.reflexArtery.lastCost,
            budget: this.reflexArtery.lastBudget,
            reflexCount: this.reflexArtery.lastReflexCount,
            tightTriggers: this.reflexArtery.lastTightTriggers,
            slice: this.slice
          })
        )
    };
  }

  // ========================================================================
  //  REFLEX ARTERY v5 — IMMORTAL++
  // ========================================================================
  _computeReflexThroughput(reflexCount, avgTriggerCost) {
    const countFactor = Math.min(1, reflexCount / 64);
    const costFactor = Math.min(1, avgTriggerCost / 64);
    return Math.max(0, 1 - (countFactor * 0.5 + costFactor * 0.5));
  }

  _computeReflexPressure(reflexCount, tightTriggers) {
    return Math.min(1, (reflexCount + tightTriggers) / 48);
  }

  _computeReflexCost(pressure, throughput) {
    return Math.max(0, Math.min(1, pressure * (1 - throughput)));
  }

  _computeReflexBudget(throughput, cost) {
    return Math.max(0, Math.min(1, throughput - cost));
  }

  _bucketLevel(v) {
    if (v >= 0.9) return "elite";
    if (v >= 0.75) return "high";
    if (v >= 0.5) return "medium";
    if (v >= 0.25) return "low";
    return "critical";
  }

  _bucketPressure(v) {
    if (v >= 0.9) return "overload";
    if (v >= 0.7) return "high";
    if (v >= 0.4) return "medium";
    if (v > 0) return "low";
    return "none";
  }

  _bucketCost(v) {
    if (v >= 0.8) return "heavy";
    if (v >= 0.5) return "moderate";
    if (v >= 0.2) return "light";
    if (v > 0) return "negligible";
    return "none";
  }

  // ========================================================================
  //  REFLEX ARTERY SNAPSHOT — window-safe
  // ========================================================================
  _computeReflexArtery() {
    const reflexCount = this.reflexes.length;

    let totalTriggerCost = 0;
    let tightTriggers = 0;

    for (const r of this.reflexes) {
      const cost = r.trigger.length || 1;
      totalTriggerCost += cost;
      if (cost < 32) tightTriggers++;
    }

    const avgTriggerCost = reflexCount > 0 ? totalTriggerCost / reflexCount : 0;

    const throughput = this._computeReflexThroughput(
      reflexCount,
      avgTriggerCost
    );
    const pressure = this._computeReflexPressure(reflexCount, tightTriggers);
    const cost = this._computeReflexCost(pressure, throughput);
    const budget = this._computeReflexBudget(throughput, cost);

    this.reflexArtery.lastThroughput = throughput;
    this.reflexArtery.lastPressure = pressure;
    this.reflexArtery.lastCost = cost;
    this.reflexArtery.lastBudget = budget;
    this.reflexArtery.lastReflexCount = reflexCount;
    this.reflexArtery.lastTightTriggers = tightTriggers;

    const artery = {
      slice: this.slice,
      reflexCount,
      avgTriggerCost,
      tightTriggers,

      throughput,
      throughputBucket: this._bucketLevel(throughput),

      pressure,
      pressureBucket: this._bucketPressure(pressure),

      cost,
      costBucket: this._bucketCost(cost),

      budget,
      budgetBucket: this._bucketLevel(budget)
    };

    emitReflexPacket("artery", artery);
    return artery;
  }

  getReflexArtery() {
    return this._computeReflexArtery();
  }

  // ========================================================================
  //  REFLEX CONFIGURATION
  // ========================================================================
  addReflex(triggerFn, actionFn) {
    if (typeof triggerFn !== "function") {
      throw new TypeError("addReflex: trigger must be a function");
    }
    if (typeof actionFn !== "function") {
      throw new TypeError("addReflex: action must be a function");
    }

    this.reflexes.push({ trigger: triggerFn, action: actionFn });

    const artery = this._computeReflexArtery();
    this._trace("addReflex", { totalReflexes: this.reflexes.length, artery });

    emitReflexPacket("add-reflex", {
      slice: this.slice,
      totalReflexes: this.reflexes.length
    });
  }

  // ========================================================================
  //  REFLEX EXECUTION — PURE BINARY ARC
  // ========================================================================
  run(binaryInput) {
    this._assertBinary(binaryInput);

    const artery = this._computeReflexArtery();
    this._trace("run:start", { binaryInput, artery });

    emitReflexPacket("run-start", {
      slice: this.slice,
      bitLength: binaryInput.length,
      reflexCount: this.reflexes.length
    });

    for (let i = 0; i < this.reflexes.length; i++) {
      const { trigger, action } = this.reflexes[i];

      const shouldFire = trigger(binaryInput);
      this._trace("run:triggerCheck", { index: i, shouldFire });

      if (shouldFire) {
        const output = action(binaryInput);
        this._assertBinary(output);

        const arteryAfter = this._computeReflexArtery();
        this._trace("run:reflexFired", {
          index: i,
          input: binaryInput,
          output,
          artery: arteryAfter
        });

        emitReflexPacket("reflex-fired", {
          slice: this.slice,
          index: i,
          inputBits: binaryInput.length,
          outputBits: output.length
        });

        return output;
      }
    }

    this._trace("run:noReflexFired", { binaryInput });

    emitReflexPacket("no-reflex", {
      slice: this.slice,
      bitLength: binaryInput.length
    });

    return null;
  }

  // ========================================================================
  //  INTERNAL HELPERS
  // ========================================================================
  _assertBinary(str) {
    if (typeof str !== "string" || !/^[01]+$/.test(str)) {
      throw new TypeError("expected binary string");
    }
  }

  _trace(event, payload) {
    if (!this.trace) return;
    console.log(`[${this.id}:${this.slice}] ${event}`, payload);
  }
}

// ============================================================================
//  FACTORY — v24‑IMMORTAL++
// ============================================================================
export function createAIBinaryReflex(config) {
  return new AIBinaryReflex(config);
}

// ============================================================================
//  DUAL‑MODE EXPORTS
// ============================================================================
if (typeof module !== "undefined") {
  module.exports = {
    ReflexMeta,
    AIBinaryReflex,
    createAIBinaryReflex,
    prewarmReflexEngine,
    AI_EXPERIENCE_META,
    EXPORT_META
  };
}
