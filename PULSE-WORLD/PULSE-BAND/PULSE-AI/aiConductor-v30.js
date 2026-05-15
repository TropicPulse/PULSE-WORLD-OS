// ============================================================================
//  aiConductor-v30.js — Pulse OS v30‑IMMORTAL‑EVO++ Presence Organ
//  Deterministic Wiring • Binary‑Aware • CoreMemory‑Deep • Owner‑Subordinate
//  “SEE ALL ORGANS. ORCHESTRATE. NEVER MUTATE. ALWAYS BELOW ALDWYN.”
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

function bucketWiringComplexity({ organCount, pipelineWires, scannerWires, evolutionWires }) {
  const score =
    organCount * 0.4 +
    pipelineWires * 0.25 +
    scannerWires * 0.2 +
    evolutionWires * 0.15;

  if (score >= 80) return "extreme";
  if (score >= 40) return "high";
  if (score >= 20) return "medium";
  if (score > 0)   return "low";
  return "minimal";
}

function safeNow() {
  return Date.now();
}

function computeWindowId({ conductorId, context = {} }) {
  const base = context.windowId ||
    `${conductorId || "conductor"}:${context.personaId || "neutral"}:${context.routeId || "presence"}`;
  let h = 0;
  for (let i = 0; i < base.length; i++) {
    h = (h * 31 + base.charCodeAt(i)) | 0;
  }
  return "win-" + (h >>> 0).toString(16);
}

// ============================================================================
//  COREMEMORY INTEGRATION — v30 IMMORTAL‑EVO++
//  Pure metadata: no DB, no network, no timers
// ============================================================================
function buildCoreMemorySnapshot(coreMemory, { conductorId, stats, binaryVitals }) {
  if (!coreMemory || typeof coreMemory.buildSnapshot !== "function") return null;

  try {
    return coreMemory.buildSnapshot("conductor", {
      conductorId,
      stats: { ...stats },
      binaryVitals
    });
  } catch {
    return null;
  }
}

function buildCoreMemoryDrift(coreMemory, { conductorId, stats, binaryVitals }) {
  if (!coreMemory || typeof coreMemory.buildDriftSignature !== "function") return null;

  const pressure = extractBinaryPressure(binaryVitals);
  const drift =
    pressure >= 0.9 ||
    stats.organCount > 64 ||
    stats.pipelineWires + stats.scannerWires + stats.evolutionWires > 128;

  const severity =
    pressure >= 0.95 ? "critical" :
    pressure >= 0.9  ? "high"     :
    drift            ? "warning"  :
                       "info";

  const signature = {
    type: drift ? "conductor_presence_drift" : "conductor_presence_stable",
    severity,
    details: {
      conductorId,
      organCount: stats.organCount,
      pipelineWires: stats.pipelineWires,
      scannerWires: stats.scannerWires,
      evolutionWires: stats.evolutionWires,
      pressure
    }
  };

  try {
    return coreMemory.buildDriftSignature("conductor", signature);
  } catch {
    return null;
  }
}

// ============================================================================
//  PACKET EMITTER — deterministic, conductor‑scoped, Touch‑aligned, owner‑anchored
// ============================================================================
function emitConductorPacket(type, payload) {
  const touch = (typeof window !== "undefined" && window.__PULSE_TOUCH__) || {};

  return Object.freeze({
    meta: {
      id: "pulse-touch-conductor",
      version: touch.version || "v0",
      epoch: touch.epoch || safeNow(),
      layer: "conductor",
      role: "presence-orchestrator",
      band: "binary",
      owner: "Aldwyn",
      subordinate: true
    },
    packetType: `conductor-${type}`,
    timestamp: safeNow(),
    ...payload
  });
}

// ============================================================================
//  PREWARM ENGINE — v30‑IMMORTAL‑EVO++ Presence
// ============================================================================
export function prewarmAIConductor(config = {}) {
  try {
    const warm = new AIConductor({
      id: "prewarm-conductor",
      trace: config.trace,
      encoder: config.encoder,
      coreMemory: config.coreMemory,
      context: config.context || {}
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
      message: "Conductor v30 prewarmed and wiring pathways aligned.",
      conductorId: warm.id
    });
  } catch (err) {
    return emitConductorPacket("prewarm-error", {
      error: String(err),
      message: "Conductor v30 prewarm failed."
    });
  }
}

// ============================================================================
//  ORGAN IMPLEMENTATION — v30‑IMMORTAL‑EVO++ Presence
// ============================================================================
export class AIConductor {
  constructor(config = {}) {
    const touch = (typeof window !== "undefined" && window.__PULSE_TOUCH__) || {};

    this.id = config.id || "pulse-touch-conductor";
    this.trace = !!config.trace;
    this.organs = new Map();

    this.encoder = config.encoder || null;
    this.coreMemory = config.coreMemory || null;
    this.context = {
      personaId: config.context?.personaId || "architect",
      routeId: config.context?.routeId || "presence",
      windowId: config.context?.windowId || null,
      touchVersion: touch.version || "v0"
    };

    this.stats = {
      registrations: 0,
      pipelineWires: 0,
      scannerWires: 0,
      evolutionWires: 0,
      organCount: 0
    };
  }

  // --------------------------------------------------------------------------
  //  REGISTRY
  // --------------------------------------------------------------------------
  register(organ) {
    if (!organ || !organ.id) {
      throw new Error("register requires an organ with an id");
    }

    this.organs.set(organ.id, organ);
    this.stats.registrations++;
    this.stats.organCount = this.organs.size;
    this._trace("register", { organ: organ.id });
  }

  get(id) {
    return this.organs.get(id) || null;
  }

  // --------------------------------------------------------------------------
  //  WIRING
  // --------------------------------------------------------------------------
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

  // --------------------------------------------------------------------------
  //  INITIALIZATION — presence + CoreMemory snapshot
  // --------------------------------------------------------------------------
  initialize(registry, evolution) {
    for (const organ of this.organs.values()) {
      registry.registerOrgan(organ);
      evolution?.storeSignature?.(organ);
    }

    this.stats.organCount = this.organs.size;

    this._trace("initialize", {
      organCount: this.organs.size
    });

    const snapshot = buildCoreMemorySnapshot(this.coreMemory, {
      conductorId: this.id,
      stats: this.stats,
      binaryVitals: { pressure: 0 }
    });

    if (snapshot) {
      this._trace("initialize:snapshot", { snapshotKind: snapshot.kind });
    }
  }

  // --------------------------------------------------------------------------
  //  CONDUCTOR ARTERY v30 — symbolic-only, deterministic
  // --------------------------------------------------------------------------
  conductorArtery({ binaryVitals = {} } = {}) {
    const binaryPressure = extractBinaryPressure(binaryVitals);
    const organCount = this.organs.size;

    const localPressure =
      (organCount > 32 ? 0.4 : organCount > 12 ? 0.2 : organCount > 0 ? 0.1 : 0) +
      (this.stats.pipelineWires > 0 ? 0.1 : 0) +
      (this.stats.scannerWires > 0 ? 0.1 : 0) +
      (this.stats.evolutionWires > 0 ? 0.1 : 0);

    const pressure = Math.max(
      0,
      Math.min(1, 0.6 * localPressure + 0.4 * binaryPressure)
    );

    const wiring = {
      organCount,
      registrations: this.stats.registrations,
      pipelineWires: this.stats.pipelineWires,
      scannerWires: this.stats.scannerWires,
      evolutionWires: this.stats.evolutionWires,
      complexityBucket: bucketWiringComplexity({
        organCount,
        pipelineWires: this.stats.pipelineWires,
        scannerWires: this.stats.scannerWires,
        evolutionWires: this.stats.evolutionWires
      })
    };

    const artery = {
      organism: {
        pressure,
        pressureBucket: bucketPressure(pressure)
      },
      wiring
    };

    const coreSnapshot = buildCoreMemorySnapshot(this.coreMemory, {
      conductorId: this.id,
      stats: this.stats,
      binaryVitals
    });

    const coreDrift = buildCoreMemoryDrift(this.coreMemory, {
      conductorId: this.id,
      stats: this.stats,
      binaryVitals
    });

    return {
      ...artery,
      memoryArtifacts: {
        snapshot: coreSnapshot,
        driftSignature: coreDrift
      }
    };
  }

  // --------------------------------------------------------------------------
  //  PRESENCE PACKET — v30++ with bits + artery + CoreMemory artifacts
  // --------------------------------------------------------------------------
  emitPacket(binaryVitals = {}) {
    const artery = this.conductorArtery({ binaryVitals });

    const payload = {
      type: "conductor-snapshot",
      timestamp: safeNow(),
      conductorId: this.id,
      windowId: computeWindowId({ conductorId: this.id, context: this.context }),
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

  // Explicit artery packet (no bits) for fast presence polling
  emitArteryPacket(binaryVitals = {}) {
    const artery = this.conductorArtery({ binaryVitals });

    return emitConductorPacket("artery", {
      conductorId: this.id,
      windowId: computeWindowId({ conductorId: this.id, context: this.context }),
      artery
    });
  }

  _trace(event, payload) {
    if (!this.trace) return;
    console.log(`[${this.id}] ${event}`, payload);
  }
}

// ============================================================================
//  FACTORY — v30‑IMMORTAL‑EVO++ Presence
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
