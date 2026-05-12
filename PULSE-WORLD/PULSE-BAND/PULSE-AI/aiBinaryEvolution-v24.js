/**
 * aiBinaryEvolution-v24.js — Pulse OS v24++ Immortal Organ
 * ---------------------------------------------------------
 * CANONICAL ROLE:
 *   Binary Evolution Engine (genetic layer)
 *   • generates deterministic binary signatures
 *   • detects drift and mutation
 *   • enforces organism identity
 *   • binary‑primary, dualband‑safe
 */

import { OrganismIdentity } from "../PULSE-X/PULSE-WORLD-MAP.js
";

// v24++ identity (no hardcoded meta)
const Identity = OrganismIdentity(import.meta.url);

// ============================================================================
//  META BLOCK — v24++ IMMORTAL (Organism Kernel)
// ============================================================================
export const EvolutionMeta       = Identity.OrganMeta;
export const pulseRole           = Identity.pulseRole;
export const surfaceMeta         = Identity.surfaceMeta;
export const pulseLoreContext    = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META  = Identity.AI_EXPERIENCE_META;
export const EXPORT_META         = Identity.EXPORT_META;

// ============================================================================
//  CANONICAL JSON CANONICALIZER — unchanged (v16 → v24++)
// ============================================================================
function canonicalize(obj) {
  return JSON.stringify(obj, Object.keys(obj).sort());
}

// ============================================================================
//  PREWARM ENGINE — unchanged (v16 → v24++)
// ============================================================================
export function prewarmAIBinaryEvolution(config = {}) {
  try {
    const { encoder, memory, trace } = config;

    if (!encoder?.encode || !memory?.write || !memory?.read) {
      if (trace) console.warn("[AIBinaryEvolution Prewarm] Missing encoder/memory");
      return false;
    }

    const warmJson = canonicalize({
      id: "prewarm",
      keys: ["id", "keys", "type"],
      type: "organ-signature"
    });

    const warmBits = encoder.encode(warmJson);
    const warmKey  = encoder.encode("signature:prewarm-organ");

    memory.write(warmKey, warmBits);

    if (trace) {
      const stored = memory.read(warmKey);
      console.log("[AIBinaryEvolution Prewarm] success", {
        bits: warmBits.length,
        storedBits: stored?.length ?? 0
      });
    }

    return true;
  } catch (err) {
    console.error("[AIBinaryEvolution Prewarm] Failed:", err);
    return false;
  }
}

// ============================================================================
//  ORGAN IMPLEMENTATION — v24++ (BEHAVIOR UNCHANGED)
// ============================================================================
class AIBinaryEvolution {
  constructor(config = {}) {
    this.id      = config.id || EvolutionMeta.identity;
    this.encoder = config.encoder;
    this.memory  = config.memory;
    this.trace   = !!config.trace;

    if (!this.encoder?.encode) {
      throw new Error("AIBinaryEvolution requires aiBinaryAgent encoder");
    }
    if (!this.memory?.write) {
      throw new Error("AIBinaryEvolution requires aiBinaryMemory");
    }

    this.maxSignatureBits = config.maxSignatureBits || 0;
  }

  // SIGNATURE GENERATION — unchanged
  generateSignature(organ) {
    const json = canonicalize({
      id: organ.id || null,
      keys: Object.keys(organ),
      type: organ.constructor?.name || "UnknownOrgan"
    });

    let binary = this.encoder.encode(json);

    if (this.maxSignatureBits > 0 && binary.length > this.maxSignatureBits) {
      binary = binary.slice(-this.maxSignatureBits);
      this._trace("generateSignature:truncated", {
        organ: organ.id,
        originalBits: binary.length,
        maxSignatureBits: this.maxSignatureBits
      });
    }

    this._trace("generateSignature", {
      organ: organ.id,
      bits: binary.length
    });

    return binary;
  }

  // SIGNATURE STORAGE — unchanged
  storeSignature(organ) {
    const signature = this.generateSignature(organ);
    const key = this.encoder.encode(`signature:${organ.id}`);

    this.memory.write(key, signature);

    this._trace("storeSignature", {
      organ: organ.id,
      bits: signature.length
    });

    return signature;
  }

  loadSignature(organ) {
    const key = this.encoder.encode(`signature:${organ.id}`);
    const stored = this.memory.read(key);

    this._trace("loadSignature", {
      organ: organ.id,
      storedBits: stored?.length
    });

    return stored || null;
  }

  // DRIFT DETECTION — unchanged
  detectDrift(organ) {
    const oldSig = this.loadSignature(organ);
    const newSig = this.generateSignature(organ);

    if (!oldSig) {
      this._trace("detectDrift:firstSignature", { organ: organ.id });
      return { oldSig: null, newSig };
    }

    if (oldSig === newSig) {
      this._trace("detectDrift:noDrift", { organ: organ.id });
      return null;
    }

    this._trace("detectDrift:driftDetected", {
      organ: organ.id,
      oldBits: oldSig.length,
      newBits: newSig.length
    });

    return { oldSig, newSig };
  }

  // EVOLUTION UPDATE — unchanged
  evolve(organ) {
    const drift = this.detectDrift(organ);

    if (!drift) {
      const result = Object.freeze({
        evolved: false,
        message: "No drift detected"
      });
      this._trace("evolve:noDrift", { organ: organ.id });
      return result;
    }

    this.storeSignature(organ);

    const result = Object.freeze({
      evolved: true,
      oldSignature: drift.oldSig,
      newSignature: drift.newSig
    });

    this._trace("evolve:evolved", { organ: organ.id });
    return result;
  }

  // INTERNAL TRACE — unchanged
  _trace(event, payload) {
    if (!this.trace) return;
    console.log(`[${this.id}] ${event}`, payload);
  }
}

// ============================================================================
// FACTORY EXPORT — v24++
// ============================================================================
export function createAIBinaryEvolution(config = {}) {
  prewarmAIBinaryEvolution(config);
  return new AIBinaryEvolution(config);
}

export { AIBinaryEvolution };

if (typeof module !== "undefined") {
  module.exports = {
    AIBinaryEvolution,
    createAIBinaryEvolution,
    EvolutionMeta,
    prewarmAIBinaryEvolution
  };
}
