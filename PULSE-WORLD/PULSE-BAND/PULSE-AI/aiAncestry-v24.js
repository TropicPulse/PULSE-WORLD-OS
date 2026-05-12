// ============================================================================
//  PULSE OS v24‑IMMORTAL++ — ANCESTRY ORGAN
//  Genealogical Archive • Lineage Ledger • Reproduction Historian
//  PURE BINARY. ZERO MUTATION. ZERO RANDOMNESS. ZERO TIMING.
//  CORE MEMORY AWARE. IMMORTAL. DUALBAND. DETERMINISTIC.
// ============================================================================

import { OrganismIdentity } from "../PULSE-X/PULSE-WORLD-MAP.js
";

const Identity = OrganismIdentity(import.meta.url);

// META EXPORTS — v24 IMMORTAL++
export const AncestryMeta       = Identity.OrganMeta;
export const pulseRole          = Identity.pulseRole;
export const surfaceMeta        = Identity.surfaceMeta;
export const pulseLoreContext   = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META        = Identity.EXPORT_META;

// ============================================================================
//  IMMORTAL HELPERS — ZERO TIMING, ZERO RANDOMNESS
// ============================================================================

function extractBinaryPressure(binaryVitals = {}) {
  if (binaryVitals?.layered?.organism?.pressure != null)
    return binaryVitals.layered.organism.pressure;
  if (binaryVitals?.binary?.pressure != null)
    return binaryVitals.binary.pressure;
  return 0;
}

function bucketPressure(v) {
  if (v >= 0.9) return "overload";
  if (v >= 0.7) return "high";
  if (v >= 0.4) return "medium";
  if (v > 0)   return "low";
  return "none";
}

// IMMORTAL timestamp substitute (monotonic counter)
let IMMORTAL_TICK = 0;
function immortalTimestamp() {
  IMMORTAL_TICK += 1;
  return IMMORTAL_TICK;
}

// ============================================================================
//  ORGAN IMPLEMENTATION — v24‑IMMORTAL++
// ============================================================================
export class AIAncestry {
  constructor(config = {}) {
    this.id       = config.id || AncestryMeta.identity;
    this.encoder  = config.encoder;
    this.memory   = config.memory;
    this.pipeline = config.pipeline || null;
    this.reflex   = config.reflex || null;
    this.logger   = config.logger || null;
    this.trace    = !!config.trace;

    if (!this.encoder?.encode) {
      throw new Error("AIAncestry v24 requires a binary encoder");
    }
    if (!this.memory?.write || !this.memory?.read) {
      throw new Error("AIAncestry v24 requires a binary memory organ");
    }

    // IMMORTAL: lineage is immutable snapshots, not a growing array
    this._lineage = Object.freeze([]);
  }

  prewarm() {
    return true;
  }

  // ========================================================================
  //  RECORDING — deterministic, binary‑safe, IMMORTAL
  // ========================================================================
  recordReproduction(record, binaryVitals = {}, coreMemoryRef = null) {
    const frozenRecord = Object.freeze({ ...record });

    // IMMUTABLE lineage append
    this._lineage = Object.freeze([...this._lineage, frozenRecord]);

    const packet = this._generateAncestryPacket(
      frozenRecord,
      binaryVitals,
      coreMemoryRef
    );

    if (this.pipeline) this.pipeline.run(packet.bits);
    if (this.reflex)   this.reflex.run(packet.bits);
    if (this.logger)   this.logger.logBinary(packet.bits, { source: "ancestry" });

    return packet;
  }

  // ========================================================================
  //  ANCESTRY PACKET v4 — IMMORTAL, deterministic, zero timing
  // ========================================================================
  _generateAncestryPacket(record, binaryVitals = {}, coreMemoryRef = null) {
    const binaryPressure = extractBinaryPressure(binaryVitals);

    const payload = {
      type: "ancestry-event",
      ts: immortalTimestamp(),     // IMMORTAL timestamp
      record,
      pressure: binaryPressure,
      coreMemoryRef
    };

    const json   = JSON.stringify(payload);
    const binary = this.encoder.encode(json);

    return Object.freeze({
      ...payload,
      bits: binary,
      bitLength: binary.length,
      pressureBucket: bucketPressure(binaryPressure)
    });
  }

  // ========================================================================
  //  STORAGE v4 — IMMORTAL, deterministic
  // ========================================================================
  store(binaryVitals = {}, coreMemoryRef = null) {
    const payload = {
      lineage: this._lineage,
      ts: immortalTimestamp(),
      coreMemoryRef
    };

    const json   = JSON.stringify(payload);
    const binary = this.encoder.encode(json);

    const key = this.encoder.encode("ancestry:records:v24");
    this.memory.write(key, binary);

    return binary;
  }

  load(binaryVitals = {}) {
    const key    = this.encoder.encode("ancestry:records:v24");
    const binary = this.memory.read(key);

    if (!binary) {
      this._lineage = Object.freeze([]);
      return this._lineage;
    }

    const json   = this.encoder.decode(binary, "string");
    const parsed = JSON.parse(json);

    const lineage = Array.isArray(parsed.lineage) ? parsed.lineage : [];
    this._lineage = Object.freeze(
      lineage.map((r) => Object.freeze({ ...r }))
    );

    return this._lineage;
  }

  // ========================================================================
  //  QUERIES — deterministic lineage graph (IMMORTAL-safe)
// ========================================================================
  getChildren(parentId) {
    return this._lineage.filter((r) => r.parentId === parentId);
  }

  getParent(childId) {
    return this._lineage.find((r) => r.childId === childId) || null;
  }

  getSiblings(childId) {
    const parent = this.getParent(childId);
    if (!parent) return [];
    return this._lineage
      .filter((r) => r.parentId === parent.parentId && r.childId !== childId)
      .map((r) => r.childId);
  }

  getLineageTree(rootId) {
    const build = (id) => {
      const children = this.getChildren(id);
      return {
        id,
        children: children.map((c) => build(c.childId))
      };
    };
    return build(rootId);
  }

  // ========================================================================
  //  ANCESTRY ARTERY v4 — IMMORTAL, deterministic
  // ========================================================================
  ancestryArtery({ binaryVitals = {} } = {}) {
    const binaryPressure = extractBinaryPressure(binaryVitals);

    const eventCount  = this._lineage.length;
    const parentCount = new Set(this._lineage.map((r) => r.parentId)).size;
    const childCount  = new Set(this._lineage.map((r) => r.childId)).size;

    const localPressure =
      (eventCount  > 50 ? 0.3 : 0) +
      (parentCount > 20 ? 0.3 : 0) +
      (childCount  > 20 ? 0.3 : 0);

    const pressure = Math.max(
      0,
      Math.min(1, 0.6 * localPressure + 0.4 * binaryPressure)
    );

    return {
      organism: {
        pressure,
        pressureBucket: bucketPressure(pressure)
      },
      lineage: {
        events: eventCount,
        parents: parentCount,
        children: childCount
      }
    };
  }

  // ========================================================================
  //  INTERNAL TRACE — IMMORTAL: no console, no side effects
  // ========================================================================
  _trace(event, payload) {
    if (!this.trace) return;
    // IMMORTAL: no console.log — replaced with no‑op
  }
}

// ============================================================================
// FACTORY EXPORT
// ============================================================================
export function createAIAncestry(config) {
  return new AIAncestry(config);
}

if (typeof module !== "undefined") {
  module.exports = {
    AIAncestry,
    createAIAncestry,
    AncestryMeta
  };
}
