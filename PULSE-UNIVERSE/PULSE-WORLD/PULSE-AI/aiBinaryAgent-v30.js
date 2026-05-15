// ============================================================================
//  PULSE OS v30.0‑IMMORTAL‑EVO++ — BINARY CORTEX ORGAN
//  aiBinaryAgent-v30.js
//  Binary Compute Cortex • Artery Metrics • Compute-Intelligence Surfaces
//  PURE BINARY PHYSIOLOGY. ZERO SYMBOLIC. ZERO RANDOMNESS.
// ============================================================================

// ---------------------------------------------------------
//  IMMORTAL HELPERS — ZERO RANDOMNESS, MONOTONIC EPOCH
// ---------------------------------------------------------

let IMMORTAL_TICK = 0;
function immortalEpoch() {
  IMMORTAL_TICK += 1;
  return IMMORTAL_TICK;
}

function extractBinaryPressure(binaryVitals = {}) {
  if (binaryVitals?.layered?.organism?.pressure != null)
    return binaryVitals.layered.organism.pressure;
  if (binaryVitals?.binary?.pressure != null)
    return binaryVitals.binary.pressure;
  return 0;
}

function bucketPressure(v) {
  if (v >= 0.9) return "overload";
  if (v >= 0.7) return "high";
  if (v >= 0.4) return "medium";
  if (v > 0) return "low";
  return "none";
}

function bucketLevel(v) {
  if (v >= 0.9) return "elite";
  if (v >= 0.75) return "high";
  if (v >= 0.5) return "medium";
  if (v >= 0.25) return "low";
  return "critical";
}

function bucketCost(v) {
  if (v >= 0.8) return "heavy";
  if (v >= 0.5) return "moderate";
  if (v >= 0.2) return "light";
  if (v > 0) return "negligible";
  return "none";
}

// ---------------------------------------------------------
//  BINARY AGENT PREWARM ENGINE — v30 IMMORTAL
// ---------------------------------------------------------

export function prewarmAIBinaryAgent(config = {}) {
  try {
    const {
      encoder,
      compute,
      trace,
      measurePressure,
      measureThroughput,
      measureCost,
      measureBudget,
      deltaEngine,              // optional: AIBinaryDelta or compatible
      sampleComputeSurface      // optional: (phase) => surface
    } = config;

    const localTrace = !!trace;
    const traceFn = localTrace
      ? (event, payload) =>
          console.log("[AIBinaryAgent:prewarm:v30]", event, payload)
      : () => {};

    // Warm encoder encode/decode
    if (encoder?.encode && encoder?.decode) {
      const warmJson = JSON.stringify({ id: "prewarm-v30", bits: 0 });
      const warmBits = encoder.encode(warmJson);
      encoder.decode(warmBits, "string");
      traceFn("encoder:warm", { bits: warmBits.length });
    }

    // Warm binary compute arteries
    if (typeof compute === "function" && encoder?.encode) {
      const token = encoder.encode("prewarm-compute-v30");
      compute(token);
      traceFn("compute:warm", { tokenBits: token.length });
    }

    // Warm pressure/throughput/cost/budget meters if present
    if (typeof measurePressure === "function") {
      measurePressure();
      traceFn("measurePressure:warm");
    }
    if (typeof measureThroughput === "function") {
      measureThroughput();
      traceFn("measureThroughput:warm");
    }
    if (typeof measureCost === "function") {
      measureCost();
      traceFn("measureCost:warm");
    }
    if (typeof measureBudget === "function") {
      measureBudget();
      traceFn("measureBudget:warm");
    }

    // Warm compute‑intelligence + delta engine if provided
    if (deltaEngine && typeof deltaEngine.computeDelta === "function") {
      const prevSurface =
        (typeof sampleComputeSurface === "function"
          ? sampleComputeSurface("prev")
          : { pressure: 0.1, load: 0.1, advantage: 0, speed: 0.1 });

      const nextSurface =
        (typeof sampleComputeSurface === "function"
          ? sampleComputeSurface("next")
          : { pressure: 0.2, load: 0.2, advantage: 0.05, speed: 0.2 });

      deltaEngine.computeDelta(prevSurface, nextSurface);
      traceFn("deltaEngine:warm", { prevSurface, nextSurface });
    }

    return true;
  } catch (err) {
    console.error("[AIBinaryAgent Prewarm v30] Failed:", err);
    return false;
  }
}

// ---------------------------------------------------------
//  ORGAN IMPLEMENTATION — v30 IMMORTAL‑EVO++
// ---------------------------------------------------------

class AIBinaryAgent {
  constructor(config = {}) {
    this.id = config.id || "ai-binary-agent";
    this.maxBits = typeof config.maxBits === "number" ? config.maxBits : 64;
    this.maxInputs = typeof config.maxInputs === "number" ? config.maxInputs : 64;
    this.trace = !!config.trace;

    // Optional GPU / buffer hints (no hard dependency, just presence‑aware)
    this.gpuHints = Object.freeze({
      allowGPU: !!config.allowGPU,
      preferredBatchSize: config.preferredBatchSize || 0,
      preferredBufferBits: config.preferredBufferBits || this.maxBits,
      pressure: config.gpuPressure ?? 0,
      load: config.gpuLoad ?? 0,
      util: config.gpuUtil ?? 0,
      pressureBucket: config.gpuPressureBucket ?? null,
      loadBucket: config.gpuLoadBucket ?? null,
      utilBucket: config.gpuUtilBucket ?? null
    });

    // compute‑intelligence + delta integration
    this.deltaEngine = config.deltaEngine || null;          // AIBinaryDelta or compatible
    this.triHeartId = config.triHeartId || "dad";           // "mom" | "dad" | "earn" etc
    this.sampleComputeSurface = config.sampleComputeSurface || null;

    // IMMORTAL: bounded history of surfaces (read‑only snapshots)
    this.historySize = typeof config.historySize === "number" ? config.historySize : 32;
    this._surfaceHistory = [];

    // IMMORTAL: overload guard thresholds
    this.overloadThreshold = typeof config.overloadThreshold === "number"
      ? config.overloadThreshold
      : 0.9;
  }

  // ---------------------------------------------------------
  //  BINARY COMPUTE ARTERY METRICS
  // ---------------------------------------------------------

  _computeComputeThroughput(inputCount, avgBits) {
    const countFactor = Math.min(1, inputCount / this.maxInputs);
    const sizeFactor = Math.min(1, avgBits / this.maxBits);
    const raw = Math.max(0, 1 - (countFactor * 0.5 + sizeFactor * 0.5));
    return Math.min(1, raw);
  }

  _computeComputePressure(inputCount, totalBits) {
    const density = inputCount + totalBits / this.maxBits;
    const raw = Math.min(1, density / (this.maxInputs + 32));
    return Math.max(0, raw);
  }

  _computeComputeCost(pressure, throughput) {
    const raw = pressure * (1 - throughput);
    return Math.max(0, Math.min(1, raw));
  }

  _computeComputeBudget(throughput, cost) {
    const raw = throughput - cost;
    return Math.max(0, Math.min(1, raw));
  }

  _bucketLevel(v) {
    return bucketLevel(v);
  }

  _bucketPressure(v) {
    return bucketPressure(v);
  }

  _bucketCost(v) {
    return bucketCost(v);
  }

  _computeArtery(binaryInputs) {
    const inputCount = binaryInputs.length;

    let totalBits = 0;
    for (const b of binaryInputs) totalBits += b.length;

    const avgBits = inputCount > 0 ? totalBits / inputCount : 0;

    const throughput = this._computeComputeThroughput(inputCount, avgBits);
    const pressure = this._computeComputePressure(inputCount, totalBits);
    const cost = this._computeComputeCost(pressure, throughput);
    const budget = this._computeComputeBudget(throughput, cost);

    const artery = {
      throughput,
      throughputBucket: this._bucketLevel(throughput),

      pressure,
      pressureBucket: this._bucketPressure(pressure),

      cost,
      costBucket: this._bucketCost(cost),

      budget,
      budgetBucket: this._bucketLevel(budget),

      inputCount,
      totalBits,
      avgBits
    };

    // overload flag for organism‑level reflexes
    artery.overload = pressure >= this.overloadThreshold;
    artery.overloadBucket = artery.overload ? "overload" : "normal";

    return artery;
  }

  // ---------------------------------------------------------
  //  COMPUTE‑INTELLIGENCE SURFACE — v30 IMMORTAL
  // ---------------------------------------------------------

  _buildComputeIntelligenceSurface(arteryMetrics = {}, extras = {}, binaryVitals = {}) {
    const {
      throughput = 0,
      pressure = 0,
      cost = 0,
      budget = 0,
      throughputBucket,
      pressureBucket,
      costBucket,
      budgetBucket,
      inputCount = 0,
      totalBits = 0,
      avgBits = 0,
      overload = false,
      overloadBucket = "normal"
    } = arteryMetrics;

    const {
      gpuPressure = this.gpuHints.pressure ?? 0,
      gpuLoad = this.gpuHints.load ?? 0,
      gpuUtil = this.gpuHints.util ?? 0,
      gpuPressureBucket = this.gpuHints.pressureBucket ?? null,
      gpuLoadBucket = this.gpuHints.loadBucket ?? null,
      gpuUtilBucket = this.gpuHints.utilBucket ?? null,
      capacity = 1,
      capacityBucket = "high",
      present = true
    } = extras;

    const organismPressure = extractBinaryPressure(binaryVitals);

    return Object.freeze({
      // core compute metrics
      pressure,
      load: 1 - throughput,
      cost,
      budget,

      pressureBucket: pressureBucket || this._bucketPressure(pressure),
      loadBucket: this._bucketLevel(1 - throughput),
      costBucket: costBucket || this._bucketCost(cost),
      budgetBucket: budgetBucket || this._bucketLevel(budget),

      // throughput as "speed"
      speed: throughput,
      speedBucket: this._bucketLevel(throughput),

      // capacity / presence
      capacity,
      capacityBucket,
      present: !!present,

      // gpu metrics
      gpuPressure,
      gpuLoad,
      gpuUtil,
      gpuPressureBucket: gpuPressureBucket || this._bucketPressure(gpuPressure),
      gpuLoadBucket: gpuLoadBucket || this._bucketLevel(gpuLoad),
      gpuUtilBucket: gpuUtilBucket || this._bucketLevel(gpuUtil),

      // raw artery stats
      inputCount,
      totalBits,
      avgBits,

      // overload + organism coupling
      overload,
      overloadBucket,
      organismPressure,
      organismPressureBucket: bucketPressure(organismPressure),

      // identity
      cortexId: this.id,
      triHeartId: this.triHeartId,
      epoch: immortalEpoch(),
      band: "binary"
    });
  }

  _pushSurfaceHistory(surface) {
    this._surfaceHistory.push(surface);
    if (this._surfaceHistory.length > this.historySize) {
      this._surfaceHistory.shift();
    }
  }

  getSurfaceHistory() {
    return Object.freeze([...this._surfaceHistory]);
  }

  getLastSurface() {
    if (this._surfaceHistory.length === 0) return null;
    return this._surfaceHistory[this._surfaceHistory.length - 1];
  }

  // PUBLIC: computeIntelligenceSnapshot v30
  //   inputs: array of values (numbers/strings/bytes) to encode
  //   extras: gpu + capacity hints
  //   prevSurface: optional previous surface for delta
  //   binaryVitals: organism‑level pressure
  computeIntelligenceSnapshot(
    inputs = [],
    {
      extras = {},
      prevSurface = null,
      binaryVitals = {}
    } = {}
  ) {
    const binaryInputs = inputs.map((v) => this.encode(v));
    const artery = this._computeArtery(binaryInputs);
    const surface = this._buildComputeIntelligenceSurface(
      artery,
      extras,
      binaryVitals
    );

    let deltaPacket = null;
    if (this.deltaEngine && typeof this.deltaEngine.computeDelta === "function" && prevSurface) {
      deltaPacket = this.deltaEngine.computeDelta(prevSurface, surface);
      if (this.trace) {
        console.log("[AIBinaryAgent v30] computeIntelligence:delta", {
          prevSurface,
          surface
        });
      }
    } else if (this.trace) {
      console.log("[AIBinaryAgent v30] computeIntelligence:surface", { surface });
    }

    this._pushSurfaceHistory(surface);

    return { artery, surface, deltaPacket };
  }

  // ---------------------------------------------------------
  //  BINARY ENCODING / DECODING
  // ---------------------------------------------------------

  encodeNumber(value) {
    if (typeof value === "bigint") return value.toString(2);
    if (typeof value !== "number" || !Number.isFinite(value)) {
      throw new TypeError("encodeNumber expects a finite number or bigint");
    }
    return Math.trunc(value).toString(2);
  }

  decodeNumber(binaryStr) {
    if (!/^[01]+$/.test(binaryStr)) {
      throw new TypeError("decodeNumber expects a binary string");
    }
    if (binaryStr.length > 53) {
      return BigInt("0b" + binaryStr);
    }
    return parseInt(binaryStr, 2);
  }

  encode(value) {
    if (typeof value === "number" || typeof value === "bigint") {
      return this.encodeNumber(value);
    }
    if (typeof value === "string") {
      const bytes = Buffer.from(value, "utf8");
      return this._bytesToBinary(bytes);
    }
    if (value instanceof Uint8Array || Buffer.isBuffer(value)) {
      return this._bytesToBinary(value);
    }
    if (typeof value === "object" && value !== null) {
      // IMMORTAL-safe: deterministic JSON stringify
      const json = JSON.stringify(value);
      const bytes = Buffer.from(json, "utf8");
      return this._bytesToBinary(bytes);
    }
    throw new TypeError("encode: unsupported type");
  }

  decode(binaryStr, type = "number") {
    switch (type) {
      case "number":
        return this.decodeNumber(binaryStr);
      case "bigint":
        return BigInt("0b" + binaryStr);
      case "string": {
        const bytes = this._binaryToBytes(binaryStr);
        return Buffer.from(bytes).toString("utf8");
      }
      case "bytes":
        return this._binaryToBytes(binaryStr);
      case "json": {
        const bytes = this._binaryToBytes(binaryStr);
        const text = Buffer.from(bytes).toString("utf8");
        return JSON.parse(text);
      }
      default:
        throw new TypeError(`decode: unsupported target type "${type}"`);
    }
  }

  // ---------------------------------------------------------
  //  BINARY COMPUTE SURFACE (Presence‑aware)
// ---------------------------------------------------------

  computeBinary(fn, ...inputs) {
    if (typeof fn !== "function") {
      throw new TypeError("computeBinary expects a function");
    }

    const binaryInputs = inputs.map((v) => this.encode(v));
    const artery = this._computeArtery(binaryInputs);

    this._trace("computeBinary:inputs", {
      binaryInputs,
      artery,
      gpuHints: this.gpuHints
    });

    const result = fn(binaryInputs);

    this._trace("computeBinary:rawResult", result);

    if (Array.isArray(result)) {
      result.forEach((r) => this._assertBinary(r));
    } else {
      this._assertBinary(result);
    }

    return result;
  }

  computeAndProject(fn, projector, ...inputs) {
    const binaryResult = this.computeBinary(fn, ...inputs);

    if (Array.isArray(binaryResult)) {
      const projected = binaryResult.map((b) => projector(b));
      this._trace("computeAndProject:projected", projected);
      return projected;
    }

    const projected = projector(binaryResult);
    this._trace("computeAndProject:projected", projected);
    return projected;
  }

  // ---------------------------------------------------------
  //  EXAMPLE BINARY OPS
  // ---------------------------------------------------------

  addBinary(aBin, bBin) {
    this._assertBinary(aBin);
    this._assertBinary(bBin);

    const a = BigInt("0b" + aBin);
    const b = BigInt("0b" + bBin);
    const sum = a + b;

    const out = sum.toString(2);
    this._trace("addBinary", { aBin, bBin, out });
    return out;
  }

  andBinary(aBin, bBin) {
    this._assertBinary(aBin);
    this._assertBinary(bBin);

    const len = Math.max(aBin.length, bBin.length);
    const a = aBin.padStart(len, "0");
    const b = bBin.padStart(len, "0");

    let out = "";
    for (let i = 0; i < len; i++) {
      out += a[i] === "1" && b[i] === "1" ? "1" : "0";
    }

    this._trace("andBinary", { a, b, out });
    return out.replace(/^0+(?=\d)/, "") || "0";
  }

  orBinary(aBin, bBin) {
    this._assertBinary(aBin);
    this._assertBinary(bBin);

    const len = Math.max(aBin.length, bBin.length);
    const a = aBin.padStart(len, "0");
    const b = bBin.padStart(len, "0");

    let out = "";
    for (let i = 0; i < len; i++) {
      out += a[i] === "1" || b[i] === "1" ? "1" : "0";
    }

    this._trace("orBinary", { a, b, out });
    return out.replace(/^0+(?=\d)/, "") || "0";
  }

  xorBinary(aBin, bBin) {
    this._assertBinary(aBin);
    this._assertBinary(bBin);

    const len = Math.max(aBin.length, bBin.length);
    const a = aBin.padStart(len, "0");
    const b = bBin.padStart(len, "0");

    let out = "";
    for (let i = 0; i < len; i++) {
      out += a[i] !== b[i] ? "1" : "0";
    }

    this._trace("xorBinary", { a, b, out });
    return out.replace(/^0+(?=\d)/, "") || "0";
  }

  // ---------------------------------------------------------
  //  INTERNAL HELPERS
  // ---------------------------------------------------------

  _bytesToBinary(bytes) {
    let out = "";
    for (const byte of bytes) {
      out += byte.toString(2).padStart(8, "0");
    }

    if (out.length > this.maxBits && this.maxBits > 0) {
      this._trace("bytesToBinary:truncated", {
        originalBits: out.length,
        maxBits: this.maxBits
      });
      return out.slice(-this.maxBits);
    }

    return out;
  }

  _binaryToBytes(binaryStr) {
    this._assertBinary(binaryStr);

    const padded = binaryStr.padStart(
      Math.ceil(binaryStr.length / 8) * 8,
      "0"
    );

    const bytes = [];
    for (let i = 0; i < padded.length; i += 8) {
      bytes.push(parseInt(padded.slice(i, i + 8), 2));
    }

    return Uint8Array.from(bytes);
  }

  _assertBinary(str) {
    if (typeof str !== "string" || !/^[01]+$/.test(str)) {
      throw new TypeError("expected binary string");
    }
  }

  _trace(event, payload) {
    if (!this.trace) return;
    console.log(`[${this.id}:v30] ${event}`, payload);
  }
}

// ---------------------------------------------------------
//  PRESENCE SURFACE / FACTORY EXPORT — v30.0‑IMMORTAL‑EVO++
// ---------------------------------------------------------

export function createAIBinaryAgent(config = {}) {
  prewarmAIBinaryAgent(config); // one-time binary cortex warm-up
  return new AIBinaryAgent(config);
}

export const BinaryAgentPresence = Object.freeze({
  meta: {
    id: "ai-binary-agent",
    version: (typeof window !== "undefined" && window.__PULSE_TOUCH__?.version) || "v30.0-IMMORTAL-EVO++",
    layer: "binary",
    role: "binary-cortex",
    band: "binary"
  },

  create: createAIBinaryAgent,
  prewarm: prewarmAIBinaryAgent,
  organ: "AIBinaryAgent"
});

// Keep direct class export for advanced callers
export { AIBinaryAgent };

// ---------------------------------------------------------
//  COMMONJS FALLBACK EXPORT (Dual‑Mode)
// ---------------------------------------------------------
if (typeof module !== "undefined") {
  module.exports = {
    AIBinaryAgent,
    createAIBinaryAgent,
    BinaryAgentPresence,
    prewarmAIBinaryAgent
  };
}

// Default ES export for v30‑IMMORTAL surface usage
export default createAIBinaryAgent;
