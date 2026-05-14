/**
 * aiBinaryEvolution-v30.js — Pulse OS v30‑IMMORTAL++ Organ
 * --------------------------------------------------------
 * CANONICAL ROLE:
 *   Binary Evolution Engine (genetic layer)
 *   • generates deterministic binary signatures
 *   • detects drift and mutation
 *   • enforces organism identity
 *   • binary‑primary, dualband‑safe, port‑era ready
 */


// ============================================================================
//  GLOBAL HANDLE (environment‑agnostic, no identity surfaces)
// ============================================================================
const G =
  (typeof globalThis !== "undefined" && globalThis) ||
  (typeof window !== "undefined" && window) ||
  (typeof self !== "undefined" && self) ||
  (typeof global !== "undefined" && global) ||
  {};


// ============================================================================
//  CANONICAL JSON CANONICALIZER — deterministic key ordering
// ============================================================================
function canonicalize(obj) {
  return JSON.stringify(obj, Object.keys(obj).sort());
}


// ============================================================================
//  BINARY EQUALITY HELPER — correct drift comparison
// ============================================================================
function binaryEquals(a, b) {
  if (!a || !b) return false;
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}


// ============================================================================
//  PREWARM ENGINE — v30, behavior preserved
// ============================================================================
export function prewarmAIBinaryEvolution(config = {}) {
  try {
    const { encoder, memory, trace } = config;

    if (!encoder?.encode || !memory?.write || !memory?.read) {
      if (trace) {
        // eslint-disable-next-line no-console
        console.warn("[AIBinaryEvolution Prewarm] Missing encoder/memory");
      }
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
      // eslint-disable-next-line no-console
      console.log("[AIBinaryEvolution Prewarm] success", {
        bits: warmBits.length,
        storedBits: stored?.length ?? 0
      });
    }

    return true;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[AIBinaryEvolution Prewarm] Failed:", err);
    return false;
  }
}


// ============================================================================
//  ORGAN IMPLEMENTATION — v30 IMMORTAL++
// ============================================================================
class AIBinaryEvolution {
  constructor(config = {}) {
    this.id      = config.id || "pulse-touch-evolution";
    this.encoder = config.encoder;
    this.memory  = config.memory;   // can be PulsePort / IndexedDB‑backed
    this.trace   = !!config.trace;

    if (!this.encoder?.encode) {
      throw new Error("AIBinaryEvolution requires aiBinaryAgent encoder");
    }
    if (!this.memory?.write) {
      throw new Error("AIBinaryEvolution requires aiBinaryMemory");
    }

    this.maxSignatureBits = config.maxSignatureBits || 0;
  }

  // -------------------------------------------------------------------------
  //  SIGNATURE GENERATION — deterministic, canonical
  // -------------------------------------------------------------------------
  generateSignature(organ) {
    const json = canonicalize({
      id: organ.id || null,
      keys: Object.keys(organ),
      type: organ.constructor?.name || "UnknownOrgan"
    });

    let binary = this.encoder.encode(json);
    const originalLength = binary.length;

    if (this.maxSignatureBits > 0 && binary.length > this.maxSignatureBits) {
      binary = binary.slice(-this.maxSignatureBits);
      this._trace("generateSignature:truncated", {
        organ: organ.id,
        originalBits: originalLength,
        maxSignatureBits: this.maxSignatureBits
      });
    }

    this._trace("generateSignature", {
      organ: organ.id,
      bits: binary.length
    });

    return binary;
  }

  // -------------------------------------------------------------------------
  //  SIGNATURE STORAGE
  // -------------------------------------------------------------------------
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

  // -------------------------------------------------------------------------
  //  DRIFT DETECTION — now uses correct binary comparison
  // -------------------------------------------------------------------------
  detectDrift(organ) {
    const oldSig = this.loadSignature(organ);
    const newSig = this.generateSignature(organ);

    if (!oldSig) {
      this._trace("detectDrift:firstSignature", { organ: organ.id });
      return { oldSig: null, newSig };
    }

    if (binaryEquals(oldSig, newSig)) {
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

  // -------------------------------------------------------------------------
  //  EVOLUTION UPDATE
  // -------------------------------------------------------------------------
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

  // -------------------------------------------------------------------------
  //  INTERNAL TRACE
  // -------------------------------------------------------------------------
  _trace(event, payload) {
    if (!this.trace) return;
    // eslint-disable-next-line no-console
    console.log(`[${this.id}] ${event}`, payload);
  }
}


// ============================================================================
//  FACTORY EXPORT — v30 IMMORTAL++
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
    prewarmAIBinaryEvolution
  };
}
