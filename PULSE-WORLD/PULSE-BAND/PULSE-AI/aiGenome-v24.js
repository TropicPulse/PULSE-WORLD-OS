// ============================================================================
//  aiGenome-v24.js — Pulse OS v24‑IMMORTAL‑ADVANTAGE++
//  Binary Genome • Organ Lineage • Fingerprint Engine • Trust‑Aware • Drift‑Aware
//  HYBRID MODE: Fast path + Deep path (drift‑aware, artery‑aware, jury‑aware)
//  PURE BINARY. ZERO NETWORK. ZERO MUTATION. ZERO RANDOMNESS.
// ============================================================================

import {
  OrganismIdentity,
  buildPulseOrganismMap as PulseOrganismMap,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PULSE-WORLD-MAP.js";

const Identity = OrganismIdentity(import.meta.url);

// ============================================================================
//  META BLOCK — v24.0 IMMORTAL (ORGANISM KERNEL)
//  (backed by the Organism Map instead of hardcoded here)
// ============================================================================
export const GenomeMeta = Identity.OrganMeta;

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
// PACKET EMITTER — deterministic, trust‑aware
// ============================================================================
function emitGenomePacket(type, payload) {
  return Object.freeze({
    meta: {
      version: GenomeMeta.version,
      epoch: GenomeMeta.evo?.epoch,
      identity: GenomeMeta.identity,
      layer: GenomeMeta.layer,
      role: GenomeMeta.role
    },
    packetType: `genome-${type}`,
    timestamp: Date.now(),
    ...payload
  });
}

// ============================================================================
// PREWARM — dual‑band + trust fabric + jury evidence
// ============================================================================
export function prewarmBinaryGenome(
  dualBand = null,
  { trace = false, trustFabric = null, juryFrame = null } = {}
) {
  try {
    const binaryPressure =
      dualBand?.binary?.metabolic?.pressure ??
      dualBand?.binary?.pressure ??
      0;

    const packet = emitGenomePacket("prewarm", {
      message: "Binary genome prewarmed and lineage metrics aligned.",
      binaryPressure
    });

    trustFabric?.recordGenomePrewarm?.({ pressure: binaryPressure });
    juryFrame?.recordEvidence?.("genome-prewarm", packet);

    if (trace) console.log("[aiBinaryGenome] prewarm", packet);
    return packet;
  } catch (err) {
    const packet = emitGenomePacket("prewarm-error", {
      error: String(err),
      message: "Binary genome prewarm failed."
    });

    juryFrame?.recordEvidence?.("genome-prewarm-error", packet);
    return packet;
  }
}

// ============================================================================
// BINARY GENOME ORGAN — v24 IMMORTAL‑ADVANTAGE++
// ============================================================================
export class AIBinaryGenome {
  constructor(config = {}) {
    this.id = config.id || "ai-binary-genome";

    this.encoder = config.encoder;
    this.registry = config.registry;
    this.evolution = config.evolution;
    this.memory = config.memory;

    this.dualBand = config.dualBand || null;
    this.trustFabric = config.trustFabric || null;
    this.juryFrame = config.juryFrame || null;

    this.trace = !!config.trace;

    if (!this.encoder) {
      throw new Error("AIBinaryGenome requires aiBinaryAgent encoder");
    }
    if (!this.registry) {
      throw new Error("AIBinaryGenome requires aiBinaryOrganRegistry");
    }
    if (!this.evolution) {
      throw new Error("AIBinaryGenome requires aiBinaryEvolution");
    }
    if (!this.memory) {
      throw new Error("AIBinaryGenome requires aiBinaryMemory");
    }

    this._cache = {
      organIds: null,
      signatures: null,
      fingerprint: null,
      genomeBinary: null,
      lastDriftCount: 0,
      lastSnapshotAt: 0
    };

    this._ttlMs = config.cacheTtlMs || 60 * 1000; // 60s cache for fast path
  }

  // ========================================================================
  // GENETIC METRICS — artery‑style, deterministic
  // ========================================================================
  _computeGeneticThroughput(organCount, driftCount) {
    const driftFactor = Math.min(1, driftCount / Math.max(organCount, 1));
    return Math.max(0, 1 - driftFactor);
  }

  _computeGeneticPressure(organCount, signatureBits) {
    const organFactor = Math.min(1, organCount / 100);
    const sigFactor = Math.min(1, signatureBits / 50000);
    return Math.min(1, organFactor * 0.5 + sigFactor * 0.5);
  }

  _computeGeneticCost(pressure, throughput) {
    return Math.max(0, Math.min(1, pressure * (1 - throughput)));
  }

  _computeGeneticBudget(throughput, cost) {
    return Math.max(0, Math.min(1, throughput - cost));
  }

  _bucketLevel(v) {
    if (v >= 0.9) return "elite";
    if (v >= 0.75) return "high";
    if (v >= 0.5) return "medium";
    if (v >= 0.25) return "low";
    return "critical";
  }

  _bucketPressure(v) {
    if (v >= 0.9) return "overload";
    if (v >= 0.7) return "high";
    if (v >= 0.4) return "medium";
    if (v > 0) return "low";
    return "none";
  }

  _bucketCost(v) {
    if (v >= 0.8) return "heavy";
    if (v >= 0.5) return "moderate";
    if (v >= 0.2) return "light";
    if (v > 0) return "negligible";
    return "none";
  }

  _classifyDriftLevel(driftCount, organCount) {
    if (driftCount <= 0) return "none";
    const ratio = driftCount / Math.max(organCount, 1);
    if (ratio >= 0.5) return "severe";
    if (ratio >= 0.2) return "moderate";
    return "mild";
  }

  _cacheValid() {
    if (!this._cache.genomeBinary) return false;
    if (!this._ttlMs) return true;
    return Date.now() - this._cache.lastSnapshotAt <= this._ttlMs;
  }

  // ========================================================================
  // GENOME GENERATION (FAST + DEEP, drift‑aware)
// ========================================================================
  generateGenome() {
    const organIds = this.registry.listOrgans?.() || [];

    const signatures = {};
    let driftCount = 0;
    let signatureBits = 0;

    for (const id of organIds) {
      const stored = this.evolution.loadSignature({ id }) || "0";
      signatures[id] = stored;
      signatureBits += stored.length;

      if (this._cache.signatures && this._cache.signatures[id] !== stored) {
        driftCount++;
      }
    }

    const organCountChanged =
      organIds.length !== (this._cache.organIds?.length || 0);

    const driftDetected = driftCount > 0 || organCountChanged;

    // FAST PATH — no drift + cache valid
    if (!driftDetected && this._cacheValid()) {
      const packet = emitGenomePacket("genome-fast", {
        drift: false,
        driftLevel: "none",
        genomeBinary: this._cache.genomeBinary,
        fingerprint: this._cache.fingerprint,
        organIds,
        signatures,
        artery: this._cache.artery || null
      });

      this.trustFabric?.recordGenomeFastPath?.({
        organCount: organIds.length,
        driftLevel: "none"
      });
      this.juryFrame?.recordEvidence?.("genome-fast", packet);

      if (this.trace) {
        console.log("[aiBinaryGenome] fast-path", {
          organCount: organIds.length
        });
      }

      return packet;
    }

    // DEEP PATH — recompute artery + fingerprint
    const throughput = this._computeGeneticThroughput(
      organIds.length,
      driftCount
    );
    const pressure = this._computeGeneticPressure(
      organIds.length,
      signatureBits
    );
    const cost = this._computeGeneticCost(pressure, throughput);
    const budget = this._computeGeneticBudget(throughput, cost);

    const artery = {
      throughput,
      throughputBucket: this._bucketLevel(throughput),
      pressure,
      pressureBucket: this._bucketPressure(pressure),
      cost,
      costBucket: this._bucketCost(cost),
      budget,
      budgetBucket: this._bucketLevel(budget)
    };

    const driftLevel = this._classifyDriftLevel(driftCount, organIds.length);

    const genomeObject = {
      organismId: "pulse-os-binary-organism",
      version: GenomeMeta.version,
      organIds,
      signatures,
      artery,
      timestamp: Date.now(),
      bluetooth: { ready: false, channel: null }
    };

    const json = JSON.stringify(genomeObject);
    const binary = this.encoder.encode(json);
    const fingerprint = this._computeFingerprint(binary);

    this._cache.organIds = organIds;
    this._cache.signatures = signatures;
    this._cache.fingerprint = fingerprint;
    this._cache.genomeBinary = binary;
    this._cache.artery = artery;
    this._cache.lastDriftCount = driftCount;
    this._cache.lastSnapshotAt = Date.now();

    const packet = emitGenomePacket("genome-deep", {
      drift: true,
      driftCount,
      driftLevel,
      genomeBinary: binary,
      fingerprint,
      organIds,
      signatures,
      artery
    });

    this.trustFabric?.recordGenomeDeepPath?.({
      driftCount,
      organCount: organIds.length,
      driftLevel
    });
    this.juryFrame?.recordEvidence?.("genome-deep", packet);

    if (this.trace) {
      console.log("[aiBinaryGenome] deep-path", {
        organCount: organIds.length,
        driftCount,
        driftLevel
      });
    }

    return packet;
  }

  // ========================================================================
  // STORE / LOAD / SNAPSHOT
  // ========================================================================
  storeGenome() {
    const packet = this.generateGenome();
    const key = this.encoder.encode("genome:current");

    this.memory.write(key, packet.genomeBinary);

    const out = emitGenomePacket("store", {
      bits: packet.genomeBinary.length,
      fingerprint: packet.fingerprint
    });

    this.juryFrame?.recordEvidence?.("genome-store", out);

    if (this.trace) {
      console.log("[aiBinaryGenome] store", {
        bits: packet.genomeBinary.length
      });
    }

    return out;
  }

  loadGenome() {
    const key = this.encoder.encode("genome:current");
    const binary = this.memory.read(key);

    if (!binary) {
      const packet = emitGenomePacket("load-none", { hasGenome: false });
      this.juryFrame?.recordEvidence?.("genome-load-none", packet);
      return packet;
    }

    const json = this.encoder.decode(binary, "string");
    const genome = JSON.parse(json);

    const packet = emitGenomePacket("load", {
      hasGenome: true,
      organCount: genome.organIds.length,
      bits: binary.length,
      genome
    });

    this.juryFrame?.recordEvidence?.("genome-load", packet);
    return packet;
  }

  snapshotMetrics() {
    const packet = this.loadGenome();
    if (!packet.hasGenome) {
      const out = emitGenomePacket("snapshot", {
        hasGenome: false,
        artery: null
      });
      this.juryFrame?.recordEvidence?.("genome-snapshot-none", out);
      return out;
    }

    const artery = packet.genome.artery;

    const out = emitGenomePacket("snapshot", {
      hasGenome: true,
      artery,
      throughputBucket: artery.throughputBucket,
      pressureBucket: artery.pressureBucket,
      costBucket: artery.costBucket,
      budgetBucket: artery.budgetBucket
    });

    this.juryFrame?.recordEvidence?.("genome-snapshot", out);
    return out;
  }

  // Lightweight, read‑only snapshot for other organs (Evolution, Field, etc.)
  getGenomeSnapshot() {
    if (!this._cache.genomeBinary || !this._cache.artery) {
      return emitGenomePacket("snapshot-lite", {
        hasGenome: false,
        artery: null
      });
    }

    return emitGenomePacket("snapshot-lite", {
      hasGenome: true,
      artery: this._cache.artery,
      organCount: this._cache.organIds?.length || 0,
      driftCount: this._cache.lastDriftCount
    });
  }

  // ========================================================================
  // FINGERPRINT ENGINE — deterministic, drift‑aware
  // ========================================================================
  _computeFingerprint(binary) {
    let out = "";
    for (let i = 0; i < binary.length; i++) {
      const bit = binary[i];
      const prev = out[out.length - 1] || "0";
      out += bit === prev ? "0" : "1";
    }
    return out;
  }
}

// ============================================================================
// FACTORY
// ============================================================================
export function createAIBinaryGenome(config) {
  return new AIBinaryGenome(config);
}
