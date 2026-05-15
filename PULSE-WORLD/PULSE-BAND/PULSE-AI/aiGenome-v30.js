// ============================================================================
//  aiBinaryGenome-v30.js — Pulse OS v30‑IMMORTAL++
//  Binary Genome Organ • Drift Snapshot • Artery Buckets (No Map, No Identity)
//  PURE BINARY. ZERO OWNER. ZERO WALL-CLOCK. NO ORGANISM MAP INSIDE.
// ============================================================================


// ============================================================================
//  PACKET EMITTER — v30 IMMORTAL++ (no meta, no identity, no wall-clock)
// ============================================================================
function emitGenomePacket(type, payload = {}) {
  return Object.freeze({
    packetType: `genome-${type}`,
    timestamp: 0,              // IMMORTAL++: symbolic, not wall-clock
    layer: "binary-genome",
    role: "genome",
    band: "binary",
    ...payload
  });
}


// ============================================================================
//  BINARY GENOME ORGAN — v30 IMMORTAL++
// ============================================================================
//
//  Design:
//    • No organism map lookup inside the organ.
//    • No identity/owner baked into packets.
//    • All structure comes from an injected snapshot reader.
//    • Drift is symbolic: counts + levels only.
//    • Artery is carried through as-is (no reinterpretation).
//
//  Required config:
//    - encoder: { encode(str) -> Uint8Array | string, decode(binary, "string") -> string }
//    - memory:  { write(keyBinary, valueBinary), read(keyBinary) -> valueBinary | null }
//    - readSnapshot: () => {
//          organIds: string[]
//          signatures: Record<string,string>
//          artery: {
//            throughputBucket, pressureBucket, costBucket, budgetBucket, ...
//          }
//          driftCount: number
//          driftLevel: string
//      }
//
//  Optional:
//    - trustFabric: { recordGenomeDeepPath?, recordGenomeStore?, recordGenomeLoad? }
//    - juryFrame:   { recordEvidence?(label, packet) }
//    - trace: boolean
// ============================================================================

export class AIBinaryGenome {
  constructor(config = {}) {
    const { encoder, memory, readSnapshot, trustFabric = null, juryFrame = null, trace = false } =
      config || {};

    if (!encoder) throw new Error("AIBinaryGenome v30 requires encoder");
    if (!memory) throw new Error("AIBinaryGenome v30 requires memory");
    if (typeof readSnapshot !== "function") {
      throw new Error("AIBinaryGenome v30 requires readSnapshot() function (no internal map).");
    }

    this.encoder = encoder;
    this.memory = memory;
    this.readSnapshot = readSnapshot;
    this.trustFabric = trustFabric;
    this.juryFrame = juryFrame;
    this.trace = !!trace;

    this._cache = {
      organIds: [],
      signatures: {},
      fingerprint: "",
      genomeBinary: null,
      artery: null,
      lastDriftCount: 0,
      lastSnapshotAt: 0 // symbolic; not used as wall-clock
    };
  }

  // ---------------------------------------------------------------------------
  //  SNAPSHOT SOURCE — injected, map-free
  // ---------------------------------------------------------------------------
  _readGenomeSource() {
    try {
      const snap = this.readSnapshot() || {};
      const organIds = Array.isArray(snap.organIds) ? snap.organIds.slice() : [];
      const signatures = snap.signatures || {};
      const artery = snap.artery || null;
      const driftCount = typeof snap.driftCount === "number" ? snap.driftCount : 0;
      const driftLevel = snap.driftLevel || "none";

      return { organIds, signatures, artery, driftCount, driftLevel };
    } catch (err) {
      if (this.trace) {
        console.log("[aiBinaryGenome v30] readSnapshot error", String(err));
      }
      return {
        organIds: [],
        signatures: {},
        artery: null,
        driftCount: 0,
        driftLevel: "none"
      };
    }
  }

  // ---------------------------------------------------------------------------
  //  GENOME GENERATION — v30 IMMORTAL++ (no meta, no identity, no time)
// ---------------------------------------------------------------------------

  generateGenome() {
    const { organIds, signatures, artery, driftCount, driftLevel } =
      this._readGenomeSource();

    const genomeObject = {
      version: "v30-IMMORTAL++",
      organIds,
      signatures,
      artery,
      driftCount,
      driftLevel
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
    // IMMORTAL++: keep symbolic, not Date.now()
    this._cache.lastSnapshotAt = this._cache.lastSnapshotAt + 1;

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
      console.log("[aiBinaryGenome v30] deep-path", {
        organCount: organIds.length,
        driftCount,
        driftLevel
      });
    }

    return packet;
  }

  // ---------------------------------------------------------------------------
  //  STORE GENOME — v30 IMMORTAL++ (no identity, no map)
// ---------------------------------------------------------------------------

  storeGenome() {
    const packet = this.generateGenome();
    const key = this.encoder.encode("genome:current");

    this.memory.write(key, packet.genomeBinary);

    const out = emitGenomePacket("store", {
      bits: packet.genomeBinary.length,
      fingerprint: packet.fingerprint
    });

    this.trustFabric?.recordGenomeStore?.({
      bits: packet.genomeBinary.length,
      fingerprint: packet.fingerprint
    });

    this.juryFrame?.recordEvidence?.("genome-store", out);

    if (this.trace) {
      console.log("[aiBinaryGenome v30] store", {
        bits: packet.genomeBinary.length
      });
    }

    return out;
  }

  // ---------------------------------------------------------------------------
  //  LOAD GENOME — v30 IMMORTAL++
// ---------------------------------------------------------------------------

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

  // ---------------------------------------------------------------------------
  //  SNAPSHOT METRICS — v30 IMMORTAL++
// ---------------------------------------------------------------------------

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

    const artery = packet.genome.artery || null;

    const out = emitGenomePacket("snapshot", {
      hasGenome: true,
      artery,
      throughputBucket: artery?.throughputBucket ?? null,
      pressureBucket: artery?.pressureBucket ?? null,
      costBucket: artery?.costBucket ?? null,
      budgetBucket: artery?.budgetBucket ?? null
    });

    this.juryFrame?.recordEvidence?.("genome-snapshot", out);
    return out;
  }

  // ---------------------------------------------------------------------------
  //  LITE SNAPSHOT — v30 IMMORTAL++ (for Field, Evolution, etc.)
// ---------------------------------------------------------------------------

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

  // ---------------------------------------------------------------------------
  //  FINGERPRINT — v30 IMMORTAL++ (pure binary pattern, no identity)
// ---------------------------------------------------------------------------

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
//  FACTORY — v30 IMMORTAL++
// ============================================================================
export function createAIBinaryGenome(config) {
  return new AIBinaryGenome(config);
}

// ============================================================================
//  DUAL EXPORT LAYER — CommonJS compatibility
// ============================================================================
if (typeof module !== "undefined") {
  module.exports = {
    AIBinaryGenome,
    createAIBinaryGenome
  };
}
