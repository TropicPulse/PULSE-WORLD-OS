/**
 * aiOrganRegistry.js — Pulse OS v24‑IMMORTAL++ DualBand Organ
 * ---------------------------------------------------------
 * CANONICAL ROLE:
 *   Organ Identity Registry (binary‑primary, dualband‑aware)
 *   Stores organ identity, signatures, timestamps, type, and band.
 *   Deterministic • Drift‑Proof • IMMORTAL v24++
 */

import {
  OrganismIdentity,
  buildPulseOrganismMap as PulseOrganismMap,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PULSE-WORLD-MAP.js";

// v24++ identity (no hardcoded meta)
const Identity = OrganismIdentity(import.meta.url);

// ============================================================================
//  META BLOCK — v24++ IMMORTAL (Organism Kernel)
// ============================================================================
export const OrganRegistryMeta   = Identity.OrganMeta;
export const pulseRole           = Identity.pulseRole;
export const surfaceMeta         = Identity.surfaceMeta;
export const pulseLoreContext    = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META  = Identity.AI_EXPERIENCE_META;
export const EXPORT_META         = Identity.EXPORT_META;

// ============================================================================
//  BINARY‑ONLY ORGAN SET — unchanged
// ============================================================================
const BINARY_ONLY_ORGANS = new Set([
  "aiBinaryAgent",
  "aiBinaryDelta",
  "aiBinaryEvolution",
  "PulseBinaryTech",
  "PulseBinaryShifterEvolutionaryPulse"
]);

// ============================================================================
//  PACKET EMITTER — upgraded to v24++ packet discipline
// ============================================================================
function emitRegistryPacket(type, payload) {
  return Object.freeze({
    meta: OrganRegistryMeta,
    packetType: `registry-${type}`,
    timestamp: Date.now(),                 // unchanged (v24++ allows timing)
    epoch: OrganRegistryMeta.evo.epoch,    // now v24++ epoch
    layer: OrganRegistryMeta.layer,
    role: OrganRegistryMeta.role,
    identity: OrganRegistryMeta.identity,
    ...payload
  });
}

// ============================================================================
//  PREWARM ENGINE — unchanged behavior, v24++ meta
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

    if (memory.read(warmKey)) {
      encoder.decode(memory.read(warmKey), "string");
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

// ============================================================================
//  ORGAN IMPLEMENTATION — v24++ (BEHAVIOR UNCHANGED)
// ============================================================================
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

  // REGISTER ORGAN — unchanged logic, v24++ meta
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

  // LOOKUP — unchanged
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

  // LIST — unchanged
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

  // EVOLVE — unchanged
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

  // TRACE — unchanged
  _trace(event, payload) {
    if (!this.trace) return;
    console.log(`[${this.id}] ${event}`, payload);
  }
}

// ============================================================================
// FACTORY — v24++
// ============================================================================
export function createAIBinaryOrganRegistry(config = {}) {
  prewarmAIBinaryOrganRegistry(config);
  return new AIBinaryOrganRegistry(config);
}

if (typeof module !== "undefined") {
  module.exports = {
    OrganRegistryMeta,
    AIBinaryOrganRegistry,
    createAIBinaryOrganRegistry,
    prewarmAIBinaryOrganRegistry
  };
}
