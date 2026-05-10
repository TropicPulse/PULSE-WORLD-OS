// ============================================================================
//  aiGovernorAdapter.js — Pulse OS v16‑IMMORTAL++
//  Dualband Membrane • Packet Router • Evolution‑Safe Adapter • Trust‑Aware
//  PURE MEMBRANE. ZERO INTERPRETATION. ZERO MUTATION. ZERO RANDOMNESS.
// ============================================================================

import { OrganismIdentity } from "../PULSE-X/PulseWorldOrganismMap-v21.js";

const Identity = OrganismIdentity(import.meta.url);

// or: const Identity = OrganismIdentity["pulse-ai/ai-v24.0-IMMORTAL"] if that's the key you chose

// ============================================================================
//  META BLOCK — v24.0 IMMORTAL (ORGANISM KERNEL)
//  (now backed by the Organism Map instead of hardcoded here)
// ============================================================================
export const GovernorAdapterMeta = Identity.OrganMeta;

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
//  PACKET EMITTER — deterministic, membrane-scoped
// ============================================================================
function emitGovernorAdapterPacket(type, payload) {
  return Object.freeze({
    meta: {
      version: GovernorAdapterMeta.version,
      epoch: GovernorAdapterMeta.evo.epoch,
      identity: GovernorAdapterMeta.identity,
      layer: GovernorAdapterMeta.layer,
      role: GovernorAdapterMeta.role
    },
    packetType: `gov-adapter-${type}`,
    timestamp: Date.now(),
    ...payload
  });
}

// ============================================================================
//  PREWARM — v16‑IMMORTAL++
// ============================================================================
export function prewarmGovernorAdapter(
  dualBand = null,
  { trace = false, trustFabric = null, juryFrame = null } = {}
) {
  try {
    const pressure = dualBand?.binary?.metabolic?.pressure ?? 0;

    const packet = emitGovernorAdapterPacket("prewarm", {
      message: "Governor adapter prewarmed and membrane artery aligned.",
      binaryPressure: pressure
    });

    trustFabric?.recordGovernorAdapterPrewarm?.({ pressure });
    juryFrame?.recordEvidence?.("governor-adapter-prewarm", packet);

    if (trace) console.log("[aiGovernorAdapter] prewarm", packet);
    return packet;
  } catch (err) {
    const packet = emitGovernorAdapterPacket("prewarm-error", {
      error: String(err),
      message: "Governor adapter prewarm failed."
    });

    juryFrame?.recordEvidence?.("governor-adapter-prewarm-error", packet);
    return packet;
  }
}

// ============================================================================
//  ORGAN IMPLEMENTATION — v16 IMMORTAL++
// ============================================================================
export class AIBinaryGovernorAdapter {
  constructor(config = {}) {
    this.id = config.id || "governor-adapter";

    this.encoder  = config.encoder;
    this.governor = config.governor;
    this.pipeline = config.pipeline || null;
    this.reflex   = config.reflex   || null;
    this.logger   = config.logger   || null;

    this.bluetooth = config.bluetooth || null;
    this.trustFabric = config.trustFabric || null;
    this.juryFrame = config.juryFrame || null;

    this.trace = !!config.trace;

    if (!this.encoder?.encode) {
      throw new Error("AIBinaryGovernorAdapter requires aiBinaryAgent encoder");
    }
    if (!this.governor?.handle) {
      throw new Error("AIBinaryGovernorAdapter requires a Governor organ with .handle()");
    }

    this.artery = {
      packetsIn: 0,
      packetsOut: 0,
      lastPacketBits: 0,
      snapshot: () => Object.freeze(this._snapshotArtery())
    };
  }

  // ========================================================================
  //  ARTERY SNAPSHOT
  // ========================================================================
  _snapshotArtery() {
    const { packetsIn, packetsOut, lastPacketBits } = this.artery;
    const load = Math.min(1, (packetsIn + packetsOut) / 1000);
    const pressure = Math.min(1, lastPacketBits / 65536);

    return {
      packetsIn,
      packetsOut,
      lastPacketBits,
      load,
      loadBucket: this._bucketLoad(load),
      pressure,
      pressureBucket: this._bucketPressure(pressure)
    };
  }

  _bucketLoad(v) {
    if (v >= 0.9) return "saturated";
    if (v >= 0.7) return "high";
    if (v >= 0.4) return "medium";
    if (v > 0)   return "low";
    return "idle";
  }

  _bucketPressure(v) {
    if (v >= 0.9) return "overload";
    if (v >= 0.7) return "high";
    if (v >= 0.4) return "medium";
    if (v > 0)   return "low";
    return "none";
  }

  // ========================================================================
  //  FORWARD BINARY → GOVERNOR (PURE MEMBRANE)
// ========================================================================
  forwardBinaryToGovernor(binaryStr) {
    this._assertBinary(binaryStr);

    const packet = emitGovernorAdapterPacket("forward-in", {
      bits: binaryStr,
      bitLength: binaryStr.length,
      bluetooth: {
        ready: !!this.bluetooth,
        channel: null
      }
    });

    this._trace("forwardBinaryToGovernor", packet);

    this.artery.packetsIn++;
    this.artery.lastPacketBits = packet.bitLength;

    this.trustFabric?.recordGovernorAdapterIn?.({
      bitLength: packet.bitLength
    });

    this.juryFrame?.recordEvidence?.("governor-adapter-in", packet);

    this.governor.handle({
      type: "binary-event",
      bits: packet.bits,
      bitLength: packet.bitLength,
      timestamp: packet.timestamp,
      bluetooth: packet.bluetooth
    });
  }

  // ========================================================================
  //  FORWARD GOVERNOR DECISION → PIPELINE / REFLEX
  // ========================================================================
  forwardGovernorDecision(decisionObj) {
    const json = JSON.stringify(decisionObj);
    const binary = this.encoder.encode(json);

    const packet = emitGovernorAdapterPacket("forward-out", {
      decision: decisionObj,
      bits: binary,
      bitLength: binary.length
    });

    this._trace("forwardGovernorDecision", packet);

    this.artery.packetsOut++;
    this.artery.lastPacketBits = binary.length;

    this.trustFabric?.recordGovernorAdapterOut?.({
      bitLength: binary.length
    });

    this.juryFrame?.recordEvidence?.("governor-adapter-out", packet);

    if (this.pipeline) this.pipeline.run(binary);
    if (this.reflex)   this.reflex.run(binary);
    if (this.logger)   this.logger.logBinary(binary, { source: "Governor" });

    return binary;
  }

  // ========================================================================
  //  ATTACHMENT HOOKS
  // ========================================================================
  attachToPipeline(pipeline) {
    pipeline.addObserver(({ output }) => {
      this.forwardBinaryToGovernor(output);
    });

    this._trace("attachToPipeline", { pipeline: pipeline.id });
  }

  attachToReflex(reflex) {
    const originalRun = reflex.run.bind(reflex);

    reflex.run = (binaryInput) => {
      const result = originalRun(binaryInput);

      if (result !== null && typeof result === "string") {
        this.forwardBinaryToGovernor(result);
      }

      return result;
    };

    this._trace("attachToReflex", { reflex: reflex.id });
  }

  // ========================================================================
  //  SNAPSHOT
  // ========================================================================
  snapshotMembrane() {
    const artery = this._snapshotArtery();

    const packet = emitGovernorAdapterPacket("snapshot", {
      artery
    });

    this.juryFrame?.recordEvidence?.("governor-adapter-snapshot", packet);

    return packet;
  }

  // ========================================================================
  //  INTERNAL
  // ========================================================================
  _assertBinary(str) {
    if (typeof str !== "string" || !/^[01]+$/.test(str)) {
      throw new TypeError("expected binary string");
    }
  }

  _trace(event, payload) {
    if (!this.trace) return;
    console.log(`[${this.id}] ${event}`, payload);
  }
}

// ============================================================================
// FACTORY
// ============================================================================
export function createAIBinaryGovernorAdapter(config) {
  return new AIBinaryGovernorAdapter(config);
}

if (typeof module !== "undefined") {
  module.exports = {
    AIBinaryGovernorAdapter,
    createAIBinaryGovernorAdapter,
    GovernorAdapterMeta,
    prewarmGovernorAdapter
  };
}
