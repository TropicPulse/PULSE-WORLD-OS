// ============================================================================
//  aiConductor.js — Pulse OS v12.3‑Presence Organ
//  Deterministic Wiring • Dualband‑Safe • Packet‑Aware • Drift‑Proof
// ============================================================================
import { OrganismIdentity } from "../PULSE-X/PulseWorldOrganismMap-v21.js";

const Identity = OrganismIdentity(import.meta.url);

// or: const Identity = OrganismIdentity["pulse-ai/ai-v24.0-IMMORTAL"] if that's the key you chose

// ============================================================================
//  META BLOCK — v24.0 IMMORTAL (ORGANISM KERNEL)
//  (now backed by the Organism Map instead of hardcoded here)
// ============================================================================
export const ConductorMeta = Identity.OrganMeta;

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
//  PACKET EMITTER — deterministic, conductor-scoped
// ============================================================================
function emitConductorPacket(type, payload) {
  return Object.freeze({
    meta: ConductorMeta,
    packetType: `conductor-${type}`,
    timestamp: Date.now(),
    epoch: ConductorMeta.evo.epoch,
    layer: ConductorMeta.layer,
    role: ConductorMeta.role,
    identity: ConductorMeta.identity,
    ...payload
  });
}

// ============================================================================
//  PREWARM ENGINE — v12.3‑Presence
// ============================================================================
export function prewarmAIConductor(config = {}) {
  try {
    const warm = new AIConductor({ id: "prewarm-conductor", trace: config.trace });

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
//  ORGAN IMPLEMENTATION — v12.3‑Presence
// ============================================================================
export class AIConductor {
  constructor(config = {}) {
    this.id = config.id || ConductorMeta.identity;
    this.trace = !!config.trace;
    this.organs = new Map();
  }

  register(organ) {
    if (!organ || !organ.id) {
      throw new Error("register requires an organ with an id");
    }

    this.organs.set(organ.id, organ);
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

    this._trace("wirePageScanner", {
      scannerAdapter: scannerAdapter?.id,
      pipeline: pipeline?.id,
      reflex: reflex?.id,
      logger: logger?.id
    });
  }

  wireEvolution({ evolution, registry }) {
    registry.evolution = evolution;

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
  }

  emitPacket() {
    const payload = {
      type: "conductor-snapshot",
      timestamp: Date.now(),
      organCount: this.organs.size,
      organs: Array.from(this.organs.keys())
    };

    return emitConductorPacket("activation", {
      ...payload,
      bits: null,
      bitLength: 0
    });
  }

  _trace(event, payload) {
    if (!this.trace) return;
    console.log(`[${this.id}] ${event}`, payload);
  }
}

// ============================================================================
//  FACTORY — v12.3‑Presence
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
    ConductorMeta,
    AIConductor,
    createAIConductor,
    prewarmAIConductor
  };
}
