// ============================================================================
//  aiField.js — Pulse OS v24‑IMMORTAL‑ADVANTAGE++ Organ
//  Binary Membrane • Artery Metrics • Packet Bus • DualBand + Evolution Aware
// ============================================================================
//
//  CANONICAL ROLE:
//    This organ is the **Binary Field Layer**, the organism’s membrane
//    between internal cognition and the external world.
//
//  v24‑IMMORTAL‑ADVANTAGE++ UPGRADES:
//    • dualBand‑aware (fuses local field vitals with organism binary snapshot)
//    • packet‑aware v2 (explicit field packets, meta‑tagged, source‑id aware)
//    • evolution‑aware (field vitals usable by Evolution / Environment organs)
//    • environment‑aware (external pressure/load channels, deterministic only)
//    • drift‑proof meta (backed by Organism Map, not hardcoded)
//    • deterministic artery metrics (throughput/pressure/cost/budget buckets)
//    • window‑aware (safe vitals exposure for UI / diagnostics)
//    • prewarm‑aware (field prewarm packet, dualBand‑aligned)
//    • multi‑instance, identity‑safe, zero external IO
// ============================================================================


// ============================================================================
//  PACKET EMITTER — deterministic, field‑scoped, v2
// ============================================================================
function emitFieldPacket(type, payload, sourceId = "ai-binary-field") {
  return Object.freeze({
    meta: FieldMeta,
    packetType: `field-${type}`,
    sourceId,
    timestamp: Date.now(),
    epoch: FieldMeta.evo?.epoch ?? 0,
    ...payload
  });
}

// ============================================================================
/** PREWARM — align field with dual‑band snapshot (optional, zero‑IO) */
// ============================================================================
export function prewarmBinaryField(dualBand = null, { trace = false } = {}) {
  try {
    const binaryPressure =
      dualBand?.binary?.metabolic?.pressure ??
      dualBand?.binary?.pressure ??
      0;

    const binaryLoad =
      dualBand?.binary?.metabolic?.load ??
      dualBand?.binary?.load ??
      0;

    const payload = {
      message: "Binary field prewarmed and artery metrics aligned.",
      binary: {
        pressure: binaryPressure,
        load: binaryLoad
      }
    };

    const packet = emitFieldPacket("prewarm", payload);

    if (trace) {
      console.log("[aiBinaryField] prewarm", packet);
    }

    return packet;
  } catch (err) {
    return emitFieldPacket("prewarm-error", {
      error: String(err),
      message: "Binary field prewarm failed."
    });
  }
}

// ============================================================================
//  ORGAN IMPLEMENTATION — v24‑IMMORTAL‑ADVANTAGE++
// ============================================================================
class AIBinaryField {
  constructor(config = {}) {
    this.id = config.id || "ai-binary-field";

    // Required binary organs
    this.encoder = config.encoder;
    this.sentinel = config.sentinel;
    this.metabolism = config.metabolism;
    this.hormones = config.hormones;
    this.consciousness = config.consciousness;

    // Optional binary subsystems
    this.logger = config.logger || null;
    this.pipeline = config.pipeline || null;
    this.reflex = config.reflex || null;

    // Future‑ready: Bluetooth binary channel (not active)
    this.bluetooth = config.bluetooth || null;

    // Optional dual‑band reference (for vitals fusion)
    this.dualBand = config.dualBand || null;

    // Optional environment metrics (owner‑fed, deterministic only)
    this.environment = {
      pressure: 0,
      load: 0,
      ...(config.environment || {})
    };

    this.trace = !!config.trace;

    if (!this.encoder) throw new Error("AIBinaryField requires aiBinaryAgent encoder");
    if (!this.sentinel) throw new Error("AIBinaryField requires aiBinarySentinel");
    if (!this.metabolism) throw new Error("AIBinaryField requires aiBinaryMetabolism");
    if (!this.hormones) throw new Error("AIBinaryField requires aiBinaryHormones");
    if (!this.consciousness) throw new Error("AIBinaryField requires aiBinaryConsciousness");

    this.fieldState = {
      entropy: 0,
      signalDensity: 0,
      lastInputSize: 0,
      lastOutputSize: 0,
      environmentalPressure: 0
    };

    this.vitals = {
      snapshot: () => Object.freeze(this._computeBinaryVitals())
    };

    // Optional: expose window‑safe vitals snapshot for UI / diagnostics
    try {
      if (typeof window !== "undefined") {
        window.PulseBinaryFieldVitalsSnapshot =
          window.PulseBinaryFieldVitalsSnapshot || (() => this.vitals.snapshot());
      }
    } catch {
      // never throw
    }
  }

  // ---------------------------------------------------------------------------
  //  BINARY ARTERY METRICS — deterministic, drift‑proof
  // ---------------------------------------------------------------------------
  _computeBinaryThroughput(entropy, density) {
    const raw = entropy * (1 - Math.min(1, density));
    return Math.max(0, Math.min(1, raw));
  }

  _computeBinaryPressure(entropy, density) {
    const raw = entropy * density;
    return Math.max(0, Math.min(1, raw));
  }

  _computeBinaryCost(pressure, throughput) {
    const raw = pressure * (1 - throughput);
    return Math.max(0, Math.min(1, raw));
  }

  _computeBinaryBudget(throughput, cost) {
    const raw = throughput - cost;
    return Math.max(0, Math.min(1, raw));
  }

  // ---------------------------------------------------------------------------
  //  BUCKETS — stable categorical mapping
  // ---------------------------------------------------------------------------
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

  // ---------------------------------------------------------------------------
  //  ENVIRONMENT CHANNEL — deterministic external pressure/load
  // ---------------------------------------------------------------------------
  setEnvironmentMetrics({ pressure = 0, load = 0 } = {}) {
    const p = Math.max(0, Math.min(1, Number(pressure) || 0));
    const l = Math.max(0, Math.min(1, Number(load) || 0));
    this.environment.pressure = p;
    this.environment.load = l;
  }

  // ---------------------------------------------------------------------------
  //  VITALS SNAPSHOT — window‑safe, deterministic, dual‑band fused
  // ---------------------------------------------------------------------------
  _computeBinaryVitals() {
    const { entropy, signalDensity } = this.fieldState;

    const throughputLocal = this._computeBinaryThroughput(entropy, signalDensity);
    const pressureLocal = this._computeBinaryPressure(entropy, signalDensity);
    const costLocal = this._computeBinaryCost(pressureLocal, throughputLocal);
    const budgetLocal = this._computeBinaryBudget(throughputLocal, costLocal);

    // Dual‑band fusion (if available): blend organism‑level binary vitals
    const dualPressure =
      this.dualBand?.binary?.metabolic?.pressure ??
      this.dualBand?.binary?.pressure ??
      null;

    const dualLoad =
      this.dualBand?.binary?.metabolic?.load ??
      this.dualBand?.binary?.load ??
      null;

    const envPressure = this.environment.pressure || 0;
    const envLoad = this.environment.load || 0;

    const fusedPressure = (() => {
      const base = pressureLocal;
      const dual = dualPressure ?? base;
      const env = envPressure;
      const raw = 0.5 * base + 0.3 * dual + 0.2 * env;
      return Math.max(0, Math.min(1, raw));
    })();

    const fusedThroughput = (() => {
      const base = throughputLocal;
      const dual = dualLoad != null ? 1 - dualLoad : base;
      const env = envLoad != null ? 1 - envLoad : 1;
      const raw = 0.5 * base + 0.3 * dual + 0.2 * env;
      return Math.max(0, Math.min(1, raw));
    })();

    const fusedCost = this._computeBinaryCost(fusedPressure, fusedThroughput);
    const fusedBudget = this._computeBinaryBudget(fusedThroughput, fusedCost);

    return {
      fieldState: { ...this.fieldState },

      // local metrics
      local: {
        throughput: throughputLocal,
        throughputBucket: this._bucketLevel(throughputLocal),
        pressure: pressureLocal,
        pressureBucket: this._bucketPressure(pressureLocal),
        cost: costLocal,
        costBucket: this._bucketCost(costLocal),
        budget: budgetLocal,
        budgetBucket: this._bucketLevel(budgetLocal)
      },

      // fused organism‑aware metrics
      fused: {
        throughput: fusedThroughput,
        throughputBucket: this._bucketLevel(fusedThroughput),
        pressure: fusedPressure,
        pressureBucket: this._bucketPressure(fusedPressure),
        cost: fusedCost,
        costBucket: this._bucketCost(fusedCost),
        budget: fusedBudget,
        budgetBucket: this._bucketLevel(fusedBudget)
      },

      // environment + dual‑band context
      environment: {
        pressure: envPressure,
        load: envLoad
      },
      dualBand: {
        pressure: dualPressure,
        load: dualLoad
      }
    };
  }

  // ---------------------------------------------------------------------------
  //  FIELD STATE UPDATE — pure binary, no symbolic interpretation
  // ---------------------------------------------------------------------------
  _updateFieldState(bits, direction) {
    const size = bits.length || 0;
    const ones = size === 0 ? 0 : bits.split("").filter((b) => b === "1").length;
    const entropy = size === 0 ? 0 : ones / size;

    if (direction === "in") this.fieldState.lastInputSize = size;
    else this.fieldState.lastOutputSize = size;

    this.fieldState.entropy = entropy;
    this.fieldState.signalDensity = size / 1024;
    this.fieldState.environmentalPressure = Math.min(
      1,
      entropy * this.fieldState.signalDensity
    );

    this._trace("field:state:update", {
      direction,
      size,
      entropy,
      pressure: this.fieldState.environmentalPressure
    });
  }

  // ---------------------------------------------------------------------------
  //  PACKET GENERATION — binary‑only, packet‑aware v2
  // ---------------------------------------------------------------------------
  _generateFieldPacket(bits, direction) {
    const vitals = this._computeBinaryVitals();

    const payload = {
      type: "binary-field-event",
      direction,
      bits,
      fieldState: vitals.fieldState,
      binary: {
        // fused metrics are the primary artery for other organs
        throughput: vitals.fused.throughput,
        throughputBucket: vitals.fused.throughputBucket,
        pressure: vitals.fused.pressure,
        pressureBucket: vitals.fused.pressureBucket,
        cost: vitals.fused.cost,
        costBucket: vitals.fused.costBucket,
        budget: vitals.fused.budget,
        budgetBucket: vitals.fused.budgetBucket
      },
      localBinary: vitals.local,
      environment: vitals.environment,
      dualBand: vitals.dualBand,
      bluetooth: {
        ready: !!this.bluetooth
      }
    };

    const json = JSON.stringify(payload);
    const encoded = this.encoder.encode(json);

    return emitFieldPacket(
      "event",
      {
        direction,
        fieldState: payload.fieldState,
        binary: payload.binary,
        localBinary: payload.localBinary,
        environment: payload.environment,
        dualBand: payload.dualBand,
        bluetooth: payload.bluetooth,
        bits: encoded,
        bitLength: encoded.length
      },
      this.id
    );
  }

  // ---------------------------------------------------------------------------
  //  INGEST — binary input only
  // ---------------------------------------------------------------------------
  ingest(bits) {
    const safe = this.sentinel.scan(bits);
    if (!safe) {
      this._trace("field:ingest:blocked", { reason: "sentinel-deny" });
      return emitFieldPacket(
        "ingest-blocked",
        { reason: "sentinel-deny" },
        this.id
      );
    }

    this._updateFieldState(bits, "in");

    const packet = this._generateFieldPacket(bits, "in");

    this.pipeline?.run(packet.bits);
    this.reflex?.run(packet.bits);
    this.logger?.logBinary?.(packet.bits, { source: "field-in" });

    return packet;
  }

  // ---------------------------------------------------------------------------
  //  EMIT — binary output only
  // ---------------------------------------------------------------------------
  emit(bits) {
    this._updateFieldState(bits, "out");

    const packet = this._generateFieldPacket(bits, "out");

    this.pipeline?.run(packet.bits);
    this.logger?.logBinary?.(packet.bits, { source: "field-out" });

    return packet;
  }

  // ---------------------------------------------------------------------------
  //  TRACE — deterministic debug
  // ---------------------------------------------------------------------------
  _trace(event, payload) {
    if (!this.trace) return;
    console.log(`[${this.id}] ${event}`, payload);
  }
}

// ============================================================================
//  FACTORY
// ============================================================================
export function createAIBinaryField(config) {
  return new AIBinaryField(config);
}

// ============================================================================
//  DUAL‑MODE EXPORTS (ESM + CommonJS)
// ============================================================================
export {
  AIBinaryField
};

if (typeof module !== "undefined") {
  module.exports = {
    AIBinaryField,
    createAIBinaryField,
    FieldMeta,
    prewarmBinaryField,
    pulseRole,
    surfaceMeta,
    pulseLoreContext,
    AI_EXPERIENCE_META,
    EXPORT_META
  };
}
