/**
 * aiOrganRegistry-v30.js — Pulse OS v30‑IMMORTAL++ DualBand Organ
 * ---------------------------------------------------------------
 * CANONICAL ROLE:
 *   Organ Identity Registry (binary‑primary, dualband‑aware)
 *   Stores organ identity, signatures, timestamps, type, and band.
 *   Deterministic • Drift‑Proof • IMMORTAL v30 • Port‑era ready
 */


// ============================================================================
//  GLOBAL HANDLE (Touch‑aware, environment‑agnostic)
// ============================================================================
const G =
  (typeof window !== "undefined" && window) ||
  (typeof globalThis !== "undefined" && globalThis) ||
  (typeof self !== "undefined" && self) ||
  (typeof global !== "undefined" && global) ||
  {};

const g = G;


// ============================================================================
//  BINARY‑ONLY ORGAN SET — unchanged semantics
// ============================================================================
const BINARY_ONLY_ORGANS = new Set([
  "aiBinaryAgent",
  "aiBinaryDelta",
  "aiBinaryEvolution",
  "PulseBinaryTech",
  "PulseBinaryShifterEvolutionaryPulse"
]);


// ============================================================================
//  PACKET EMITTER — v30 IMMORTAL++ packet discipline
// ============================================================================
function emitRegistryPacket(type, payload) {
  const touch = g.__PULSE_TOUCH__ || {};

  return Object.freeze({
    meta: {
      id: "pulse-touch-registry",
      version: touch.version || "v0",
      epoch: touch.epoch || Date.now(),
      layer: "registry",
      role: "organ-registry",
      band: "binary"
    },
    packetType: `registry-${type}`,
    timestamp: Date.now(),
    ...payload
  });
}


// ============================================================================
//  PREWARM ENGINE — v30, behavior unchanged, port‑era safe
// ============================================================================
export function prewarmAIBinaryOrganRegistry(config = {}) {
  try {
    const { encoder, memory, evolution, trace } = config;

    if (!encoder?.encode || !memory?.write || !memory?.read) {
      return false;
    }

    const warmJson = JSON.stringify({
      id: "prewarm-organ",
      type: "Prewarm",
      band: "binary",
      signatureBits: 0,
      timestamp: 0
    });

    const warmKey = encoder.encode("organ:prewarm");
    const warmVal = encoder.encode(warmJson);

    memory.write(warmKey, warmVal);

    const readBack = memory.read(warmKey);
    if (readBack) {
      encoder.decode(readBack, "string");
    }

    if (typeof memory.listKeys === "function") {
      const keys = memory.listKeys();
      for (const k of keys) encoder.decode(k, "string");
    }

    if (evolution?.generateSignature) {
      evolution.generateSignature({
        id: "prewarm-organ",
        constructor: { name: "PrewarmOrgan" }
      });
    }

    if (trace) {
      // eslint-disable-next-line no-console
      console.log("[aiOrganRegistry] prewarm");
    }

    return emitRegistryPacket("prewarm", {
      message: "Organ Registry prewarmed."
    });
  } catch (err) {
    return emitRegistryPacket("prewarm-error", {
      error: String(err),
      message: "Organ Registry prewarm failed."
    });
  }
}


// ============================================================================
//  ORGAN IMPLEMENTATION — v30 IMMORTAL++ (behavior preserved)
// ============================================================================
export class AIBinaryOrganRegistry {
  constructor(config = {}) {
    this.id        = config.id || "organ-registry";
    this.encoder   = config.encoder;
    this.memory    = config.memory;    // can be PulsePort / IndexedDB‑backed
    this.evolution = config.evolution || null;
    this.trace     = !!config.trace;

    if (!this.encoder?.encode) {
      throw new Error("AIBinaryOrganRegistry requires aiBinaryAgent encoder");
    }
    if (!this.memory?.write) {
      throw new Error("AIBinaryOrganRegistry requires aiBinaryMemory");
    }

    this.artery = {
      registrations: 0,
      lookups: 0,
      lists: 0,
      lastBits: 0,
      snapshot: () =>
        Object.freeze({
          registrations: this.artery.registrations,
          lookups: this.artery.lookups,
          lists: this.artery.lists,
          lastBits: this.artery.lastBits
        })
    };
  }

  // -------------------------------------------------------------------------
  //  REGISTER ORGAN — v30, semantics unchanged
  // -------------------------------------------------------------------------
  registerOrgan(organ) {
    const signature = this.evolution
      ? this.evolution.generateSignature(organ)
      : this.encoder.encode("nosig");

    const band = BINARY_ONLY_ORGANS.has(organ.constructor.name)
      ? "binary"
      : "dualband";

    const record = {
      id: organ.id || null,
      type: organ.constructor.name,
      band,
      signatureBits: signature.length,
      timestamp: Date.now()
    };

    const json  = JSON.stringify(record);
    const key   = this.encoder.encode(`organ:${record.id}`);
    const value = this.encoder.encode(json);

    this.memory.write(key, value);

    this.artery.registrations++;
    this.artery.lastBits = value.length;

    this._trace("registerOrgan", {
      organ: record.id,
      type: record.type,
      band,
      bits: value.length
    });

    return emitRegistryPacket("register", record);
  }

  // -------------------------------------------------------------------------
  //  LOOKUP — v30, unchanged behavior
  // -------------------------------------------------------------------------
  getOrganRecord(organId) {
    const key = this.encoder.encode(`organ:${organId}`);
    const binary = this.memory.read(key);

    this.artery.lookups++;

    if (!binary) {
      this._trace("getOrganRecord:notFound", { organId });
      return null;
    }

    const json = this.encoder.decode(binary, "string");
    const record = JSON.parse(json);

    this.artery.lastBits = binary.length;

    this._trace("getOrganRecord", { organId, record });

    return emitRegistryPacket("lookup", record);
  }

  // -------------------------------------------------------------------------
  //  LIST — v30, unchanged behavior
  // -------------------------------------------------------------------------
  listOrgans() {
    const keys = this.memory.listKeys();

    const organKeys = keys.filter((k) => {
      const decoded = this.encoder.decode(k, "string");
      return decoded.startsWith("organ:");
    });

    const organIds = organKeys.map((k) => {
      const decoded = this.encoder.decode(k, "string");
      return decoded.replace("organ:", "");
    });

    this.artery.lists++;
    this.artery.lastBits = organIds.length;

    this._trace("listOrgans", { count: organIds.length });

    return emitRegistryPacket("list", { organIds });
  }

  // -------------------------------------------------------------------------
  //  EVOLVE — v30, unchanged behavior
  // -------------------------------------------------------------------------
  evolveOrgan(organ) {
    if (!this.evolution) {
      throw new Error("evolution engine not provided");
    }

    const result = this.evolution.evolve(organ);

    if (result.evolved) {
      this.registerOrgan(organ);
    }

    this._trace("evolveOrgan", {
      organ: organ.id,
      evolved: result.evolved
    });

    return emitRegistryPacket("evolve", result);
  }

  // -------------------------------------------------------------------------
  //  TRACE — v30, environment‑agnostic
  // -------------------------------------------------------------------------
  _trace(event, payload) {
    if (!this.trace) return;
    // eslint-disable-next-line no-console
    console.log(`[${this.id}] ${event}`, payload);
  }
}


// ============================================================================
//  FACTORY — v30 IMMORTAL++
// ============================================================================
export function createAIBinaryOrganRegistry(config = {}) {
  prewarmAIBinaryOrganRegistry(config);
  return new AIBinaryOrganRegistry(config);
}

if (typeof module !== "undefined") {
  module.exports = {
    AIBinaryOrganRegistry,
    createAIBinaryOrganRegistry,
    prewarmAIBinaryOrganRegistry
  };
}
