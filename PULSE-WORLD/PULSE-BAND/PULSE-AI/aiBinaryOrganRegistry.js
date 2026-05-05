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

export const OrganRegistryMeta = Object.freeze({
  layer: "OrganismIdentity",
  role: "ORGAN_REGISTRY",
  version: "v16-Immortal-DualBand",
  identity: "aiOrganRegistry-v16-Immortal-DualBand",

  evo: Object.freeze({
    deterministic: true,
    driftProof: true,

    binaryPrimary: true,
    dualBand: true,
    symbolicAware: true,

    memoryAware: true,
    evolutionAware: true,
    identityAware: true,
    arteryAware: true,

    presenceAware: true,
    chunkingAware: true,
    gpuFriendly: true,
    dualBandSafe: true,

    multiInstanceReady: true,
    readOnly: true,
    epoch: "v16-Immortal"
  }),

  contract: Object.freeze({
    purpose:
      "Store and retrieve organ identity records in binary memory, with dualband symbolic surfaces.",

    never: Object.freeze([
      "auto-discover organs",
      "interpret metadata",
      "mutate external organs",
      "perform routing",
      "perform scanning",
      "perform governance",
      "introduce randomness"
    ]),

    always: Object.freeze([
      "encode all keys and values in binary",
      "register only when explicitly called",
      "store id/type/signature/timestamp/band",
      "remain pure and minimal",
      "treat organ records as read-only",
      "maintain registry artery metrics"
    ])
  }),

  presence: Object.freeze({
    organId: "OrganRegistry",
    organKind: "Identity",
    physiologyBand: "DualBand",
    warmStrategy: "prewarm-on-attach",
    attachStrategy: "on-demand",
    concurrency: "multi-instance",
    observability: {
      traceEvents: [
        "registerOrgan",
        "getOrganRecord",
        "getOrganRecord:notFound",
        "listOrgans",
        "evolveOrgan",
        "prewarm",
        "prewarm-error"
      ]
    }
  })
});

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
