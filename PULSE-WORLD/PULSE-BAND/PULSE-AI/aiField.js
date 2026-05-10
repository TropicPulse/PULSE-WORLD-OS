// ============================================================================
//  aiField.js — Pulse OS v11.3‑EVO Organ
//  Binary Membrane • Artery Metrics • Packet Bus Ready • Bluetooth‑Future Hooks
// ============================================================================
//
//  CANONICAL ROLE:
//    This organ is the **Binary Field Layer**, the organism’s membrane
//    between internal cognition and the external world.
//
//  v11.3‑EVO UPGRADES:
//    • dualband-aware (binary vitals can align with organism snapshot)
//    • packet-aware (explicit field packets, meta-tagged)
//    • evolution-aware (field vitals usable by Evolution / Environment)
//    • bluetooth-ready (future hooks only, no behavior change)
//    • drift-proof meta
//    • deterministic artery metrics
//    • window-aware (safe vitals exposure)
//    • prewarm-aware (field prewarm packet)
//    • multi-instance, identity-safe
// ============================================================================
import { OrganismIdentity } from "../PULSE-X/PulseWorldOrganismMap-v21.js";

const Identity = OrganismIdentity(import.meta.url);

// or: const Identity = OrganismIdentity["pulse-ai/ai-v24.0-IMMORTAL"] if that's the key you chose

// ============================================================================
//  META BLOCK — v24.0 IMMORTAL (ORGANISM KERNEL)
//  (now backed by the Organism Map instead of hardcoded here)
// ============================================================================
export const FieldMeta = Identity.OrganMeta;

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
//  PACKET EMITTER — deterministic, field-scoped
// ============================================================================
function emitFieldPacket(type, payload) {
  return Object.freeze({
    meta: FieldMeta,
    packetType: `field-${type}`,
    timestamp: Date.now(),
    epoch: FieldMeta.evo.epoch,
    ...payload
  });
}

// ============================================================================
//  PREWARM — align field with dual-band snapshot (optional)
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
//  ORGAN IMPLEMENTATION — v11.3‑EVO
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

    // Optional dual-band reference (for future vitals alignment)
    this.dualBand = config.dualBand || null;

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
  }

  // ---------------------------------------------------------------------------
  //  BINARY ARTERY METRICS — deterministic, drift-proof
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
  //  VITALS SNAPSHOT — window-safe, deterministic
  // ---------------------------------------------------------------------------
  _computeBinaryVitals() {
    const { entropy, signalDensity } = this.fieldState;

    const throughput = this._computeBinaryThroughput(entropy, signalDensity);
    const pressure = this._computeBinaryPressure(entropy, signalDensity);
    const cost = this._computeBinaryCost(pressure, throughput);
    const budget = this._computeBinaryBudget(throughput, cost);

    return {
      fieldState: { ...this.fieldState },

      throughput,
      throughputBucket: this._bucketLevel(throughput),

      pressure,
      pressureBucket: this._bucketPressure(pressure),

      cost,
      costBucket: this._bucketCost(cost),

      budget,
      budgetBucket: this._bucketLevel(budget)
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
  //  PACKET GENERATION — binary-only, packet-aware
  // ---------------------------------------------------------------------------
  _generateFieldPacket(bits, direction) {
    const vitals = this._computeBinaryVitals();

    const payload = {
      type: "binary-field-event",
      direction,
      bits,
      fieldState: vitals.fieldState,
      binary: {
        throughput: vitals.throughput,
        throughputBucket: vitals.throughputBucket,
        pressure: vitals.pressure,
        pressureBucket: vitals.pressureBucket,
        cost: vitals.cost,
        costBucket: vitals.costBucket,
        budget: vitals.budget,
        budgetBucket: vitals.budgetBucket
      },
      bluetooth: {
        ready: !!this.bluetooth
      }
    };

    const json = JSON.stringify(payload);
    const encoded = this.encoder.encode(json);

    return emitFieldPacket("event", {
      direction,
      fieldState: payload.fieldState,
      binary: payload.binary,
      bluetooth: payload.bluetooth,
      bits: encoded,
      bitLength: encoded.length
    });
  }

  // ---------------------------------------------------------------------------
  //  INGEST — binary input only
  // ---------------------------------------------------------------------------
  ingest(bits) {
    const safe = this.sentinel.scan(bits);
    if (!safe) {
      this._trace("field:ingest:blocked", { reason: "sentinel-deny" });
      return emitFieldPacket("ingest-blocked", {
        reason: "sentinel-deny"
      });
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
  AIBinaryField,
};

if (typeof module !== "undefined") {
  module.exports = {
    AIBinaryField,
    createAIBinaryField,
    FieldMeta,
    prewarmBinaryField
  };
}
