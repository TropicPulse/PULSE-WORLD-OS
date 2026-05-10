/**
 * aiOrganRegistry.js — Pulse OS v16‑Immortal DualBand Organ
 * ---------------------------------------------------------
 * CANONICAL ROLE:
 *   Organ Identity Registry (binary‑primary, dualband‑aware)
 *   Stores organ identity, signatures, timestamps, type, and band.
 *   Deterministic • Drift‑Proof • IMMORTAL v16
 */

// ---------------------------------------------------------
//  META BLOCK — v16‑Immortal DualBand
// ---------------------------------------------------------
import { OrganismIdentity } from "../PULSE-X/PulseWorldOrganismMap-v21.js";

const Identity = OrganismIdentity(import.meta.url);

// or: const Identity = OrganismIdentity["pulse-ai/ai-v24.0-IMMORTAL"] if that's the key you chose

// ============================================================================
//  META BLOCK — v24.0 IMMORTAL (ORGANISM KERNEL)
//  (now backed by the Organism Map instead of hardcoded here)
// ============================================================================
export const OrganRegistryMeta = Identity.OrganMeta;

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


// ---------------------------------------------------------
//  BINARY‑ONLY ORGAN SET — v16 IMMORTAL
// ---------------------------------------------------------

const BINARY_ONLY_ORGANS = new Set([
  "aiBinaryAgent",
  "aiBinaryDelta",
  "aiBinaryEvolution",
  "PulseBinaryTech",
  "PulseBinaryShifterEvolutionaryPulse"
]);

// ---------------------------------------------------------
//  PACKET EMITTER — deterministic, identity-scoped
// ---------------------------------------------------------
function emitRegistryPacket(type, payload) {
  return Object.freeze({
    meta: OrganRegistryMeta,
    packetType: `registry-${type}`,
    timestamp: Date.now(),
    epoch: OrganRegistryMeta.evo.epoch,
    layer: OrganRegistryMeta.layer,
    role: OrganRegistryMeta.role,
    identity: OrganRegistryMeta.identity,
    ...payload
  });
}

// ---------------------------------------------------------
//  PREWARM ENGINE — v16‑Immortal DualBand
// ---------------------------------------------------------
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
    const read = memory.read(warmKey);

    if (read) encoder.decode(read, "string");

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

    if (trace) console.log("[aiOrganRegistry] prewarm");

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

// ---------------------------------------------------------
//  ORGAN IMPLEMENTATION — v16‑Immortal DualBand
// ---------------------------------------------------------

export class AIBinaryOrganRegistry {
  constructor(config = {}) {
    this.id        = config.id || "organ-registry";
    this.encoder   = config.encoder;
    this.memory    = config.memory;
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

  // ---------------------------------------------------------
  //  REGISTER ORGAN — now dualband aware
  // ---------------------------------------------------------
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

  // ---------------------------------------------------------
  //  LOOKUP ORGAN
  // ---------------------------------------------------------
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

  // ---------------------------------------------------------
  //  LIST ORGANS
  // ---------------------------------------------------------
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

  // ---------------------------------------------------------
  //  EVOLVE ORGAN
  // ---------------------------------------------------------
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

  // ---------------------------------------------------------
  //  TRACE
  // ---------------------------------------------------------
  _trace(event, payload) {
    if (!this.trace) return;
    console.log(`[${this.id}] ${event}`, payload);
  }
}

// ---------------------------------------------------------
//  FACTORY — v16‑Immortal DualBand
// ---------------------------------------------------------

export function createAIBinaryOrganRegistry(config = {}) {
  prewarmAIBinaryOrganRegistry(config);
  return new AIBinaryOrganRegistry(config);
}

// ---------------------------------------------------------
//  DUAL‑MODE EXPORTS
// ---------------------------------------------------------

if (typeof module !== "undefined") {
  module.exports = {
    OrganRegistryMeta,
    AIBinaryOrganRegistry,
    createAIBinaryOrganRegistry,
    prewarmAIBinaryOrganRegistry
  };
}
