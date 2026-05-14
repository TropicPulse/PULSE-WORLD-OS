// ============================================================================
//  aiConductor-v27.js — Pulse OS v27‑IMMORTAL++ Presence Organ
//  Deterministic Wiring • Binary‑Aware • Core‑Snapshot‑Ready • Touch‑Aligned
// ============================================================================


// ============================================================================
//  HELPERS — PRESSURE + BUCKETS
// ============================================================================
function extractBinaryPressure(binaryVitals = {}) {
  if (binaryVitals?.layered?.organism?.pressure != null)
    return binaryVitals.layered.organism.pressure;
  if (binaryVitals?.binary?.pressure != null)
    return binaryVitals.binary.pressure;
  if (binaryVitals?.pressure != null)
    return binaryVitals.pressure;
  return 0;
}

function bucketPressure(v) {
  if (v >= 0.9) return "overload";
  if (v >= 0.7) return "high";
  if (v >= 0.4) return "medium";
  if (v > 0) return "low";
  return "none";
}

// ============================================================================
//  PACKET EMITTER — deterministic, conductor‑scoped, Touch‑aligned
// ============================================================================
function emitConductorPacket(type, payload) {
  const touch = (typeof window !== "undefined" && window.__PULSE_TOUCH__) || {};

  return Object.freeze({
    meta: {
      id: "pulse-touch-conductor",
      version: touch.version || "v0",
      epoch: touch.epoch || Date.now(),
      layer: "conductor",
      role: "presence-orchestrator",
      band: "binary"
    },
    packetType: `conductor-${type}`,
    timestamp: Date.now(),
    ...payload
  });
}

// ============================================================================
//  PREWARM ENGINE — v27‑IMMORTAL++ Presence
// ============================================================================
export function prewarmAIConductor(config = {}) {
  try {
    const warm = new AIConductor({
      id: "prewarm-conductor",
      trace: config.trace,
      encoder: config.encoder,
      coreMemory: config.coreMemory
    });

    warm.register({ id: "prewarm-organ-A" });
    warm.register({ id: "prewarm-organ-B" });
    warm.get("prewarm-organ-A");

    warm.wirePipeline({
      pipeline: { id: "prewarm-pipeline", run: () => {} },
      reflex: { id: "prewarm-reflex", run: () => {} },
      logger: {
        id: "prewarm-logger",
        attachToPipeline: () => {},
        attachToReflex: () => {}
      },
      governorAdapter: {
        id: "prewarm-governor",
        attachToPipeline: () => {},
        attachToReflex: () => {}
      }
    });

    warm.wirePageScanner({
      scannerAdapter: { id: "prewarm-scanner" },
      pipeline: { id: "prewarm-pipeline" },
      reflex: { id: "prewarm-reflex" },
      logger: { id: "prewarm-logger" }
    });

    warm.wireEvolution({
      evolution: { id: "prewarm-evolution" },
      registry: { id: "prewarm-registry" }
    });

    warm.initialize(
      { registerOrgan: () => {} },
      { storeSignature: () => {} }
    );

    warm.emitPacket();
    warm.conductorArtery({});

    return emitConductorPacket("prewarm", {
      message: "Conductor prewarmed and wiring pathways aligned."
    });
  } catch (err) {
    return emitConductorPacket("prewarm-error", {
      error: String(err),
      message: "Conductor prewarm failed."
    });
  }
}

// ============================================================================
//  ORGAN IMPLEMENTATION — v27‑IMMORTAL++ Presence
// ============================================================================
export class AIConductor {
  constructor(config = {}) {
    this.id = config.id || "pulse-touch-conductor";
    this.trace = !!config.trace;
    this.organs = new Map();

    this.encoder = config.encoder || null;
    this.coreMemory = config.coreMemory || null;

    this.stats = {
      registrations: 0,
      pipelineWires: 0,
      scannerWires: 0,
      evolutionWires: 0
    };
  }

  register(organ) {
    if (!organ || !organ.id) {
      throw new Error("register requires an organ with an id");
    }

    this.organs.set(organ.id, organ);
    this.stats.registrations++;
    this._trace("register", { organ: organ.id });
  }

  get(id) {
    return this.organs.get(id) || null;
  }

  wirePipeline({ pipeline, reflex, logger, governorAdapter }) {
    logger?.attachToPipeline?.(pipeline);
    governorAdapter?.attachToPipeline?.(pipeline);

    if (reflex) {
      logger?.attachToReflex?.(reflex);
      governorAdapter?.attachToReflex?.(reflex);
    }

    this.stats.pipelineWires++;

    this._trace("wirePipeline", {
      pipeline: pipeline?.id,
      reflex: reflex?.id,
      logger: logger?.id,
      governorAdapter: governorAdapter?.id
    });
  }

  wirePageScanner({ scannerAdapter, pipeline, reflex, logger }) {
    if (pipeline) scannerAdapter.pipeline = pipeline;
    if (reflex) scannerAdapter.reflex = reflex;
    if (logger) scannerAdapter.logger = logger;

    this.stats.scannerWires++;

    this._trace("wirePageScanner", {
      scannerAdapter: scannerAdapter?.id,
      pipeline: pipeline?.id,
      reflex: reflex?.id,
      logger: logger?.id
    });
  }

  wireEvolution({ evolution, registry }) {
    registry.evolution = evolution;

    this.stats.evolutionWires++;

    this._trace("wireEvolution", {
      evolution: evolution?.id,
      registry: registry?.id
    });
  }

  initialize(registry, evolution) {
    for (const organ of this.organs.values()) {
      registry.registerOrgan(organ);
      evolution?.storeSignature?.(organ);
    }

    this._trace("initialize", {
      organCount: this.organs.size
    });

    if (this.coreMemory?.buildSnapshot) {
      try {
        const snapshot = this.coreMemory.buildSnapshot("conductor", {
          organCount: this.organs.size,
          stats: { ...this.stats }
        });
        this._trace("initialize:snapshot", { snapshotKind: snapshot.kind });
      } catch {
        // never throw from optional core memory integration
      }
    }
  }

  // --------------------------------------------------------------------------
  //  CONDUCTOR ARTERY v3 — symbolic-only, deterministic
  // --------------------------------------------------------------------------
  conductorArtery({ binaryVitals = {} } = {}) {
    const binaryPressure = extractBinaryPressure(binaryVitals);
    const organCount = this.organs.size;

    const localPressure =
      (organCount > 20 ? 0.3 : organCount > 5 ? 0.1 : 0) +
      (this.stats.pipelineWires > 0 ? 0.1 : 0) +
      (this.stats.scannerWires > 0 ? 0.1 : 0) +
      (this.stats.evolutionWires > 0 ? 0.1 : 0);

    const pressure = Math.max(
      0,
      Math.min(1, 0.6 * localPressure + 0.4 * binaryPressure)
    );

    return {
      organism: {
        pressure,
        pressureBucket: bucketPressure(pressure)
      },
      wiring: {
        organCount,
        registrations: this.stats.registrations,
        pipelineWires: this.stats.pipelineWires,
        scannerWires: this.stats.scannerWires,
        evolutionWires: this.stats.evolutionWires
      }
    };
  }

  // --------------------------------------------------------------------------
  //  PRESENCE PACKET — v27++ with optional bits
  // --------------------------------------------------------------------------
  emitPacket(binaryVitals = {}) {
    const artery = this.conductorArtery({ binaryVitals });

    const payload = {
      type: "conductor-snapshot",
      timestamp: Date.now(),
      organCount: this.organs.size,
      organs: Array.from(this.organs.keys()),
      artery
    };

    let bits = null;
    let bitLength = 0;

    if (this.encoder?.encode) {
      try {
        const json = JSON.stringify(payload);
        bits = this.encoder.encode(json);
        bitLength = bits.length;
      } catch {
        bits = null;
        bitLength = 0;
      }
    }

    return emitConductorPacket("activation", {
      ...payload,
      bits,
      bitLength
    });
  }

  _trace(event, payload) {
    if (!this.trace) return;
    console.log(`[${this.id}] ${event}`, payload);
  }
}

// ============================================================================
//  FACTORY — v27‑IMMORTAL++ Presence
// ============================================================================
export function createAIConductor(config = {}) {
  prewarmAIConductor(config);
  return new AIConductor(config);
}

// ============================================================================
//  DUAL‑MODE EXPORTS
// ============================================================================
if (typeof module !== "undefined") {
  module.exports = {
    AIConductor,
    createAIConductor,
    prewarmAIConductor
  };
}
