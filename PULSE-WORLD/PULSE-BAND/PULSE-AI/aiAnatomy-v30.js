// ============================================================================
//  PULSE OS v30.0‑IMMORTAL‑EVO+++ — ANATOMY ORGAN v4
//  Structural Map • Connectivity Skeleton • Organism Blueprint
//  PURE STRUCTURE. ZERO ROUTING. ZERO HEAVY COMPUTE. BINARY‑AWARE.
//  • Dualband‑aware (binary / symbolic / dual).
//  • Mesh‑pressure‑aware (via vitals + external mesh artery).
//  • Advantage‑field‑aware (metadata only).
//  • Bluetooth‑presence‑aware (metadata only).
// ============================================================================

// ============================================================================
// META — ANATOMY ORGAN IDENTITY (READ‑ONLY)
// ============================================================================
export const AI_ANATOMY_META_V30 = Object.freeze({
  layer: "organism",
  role: "ANATOMY_ORGAN",
  version: "v30.0-IMMORTAL-EVO+++",
  target: "dualband-organism",
  selfRepairable: true,
  evo: {
    dualMode: true,
    binaryAware: true,
    symbolicAware: true,
    meshPressureAware: true,
    advantageFieldAware: true,
    bluetoothPresenceAware: true,
    zeroRouting: true,
    zeroHeavyCompute: true,
    zeroMutationExternal: true,
    driftProof: true,
    futureEvolutionReady: true
  }
});

// ============================================================================
// HELPERS — PRESSURE + BUCKETS (v30 IMMORTAL BUCKET ENGINE)
// ============================================================================
function extractBinaryPressure(binaryVitals = {}) {
  if (binaryVitals?.layered?.organism?.pressure != null)
    return binaryVitals.layered.organism.pressure;
  if (binaryVitals?.binary?.pressure != null)
    return binaryVitals.binary.pressure;
  return 0;
}

function extractMeshPressure(meshArtery = {}) {
  // meshArtery.organism?.pressure or meshArtery.mesh?.pressure, if present
  if (meshArtery?.organism?.pressure != null) return meshArtery.organism.pressure;
  if (meshArtery?.mesh?.pressure != null) return meshArtery.mesh.pressure;
  return 0;
}

function clamp01(v) {
  if (!Number.isFinite(v)) return 0;
  if (v <= 0) return 0;
  if (v >= 1) return 1;
  return v;
}

function bucketPressure(v) {
  if (v >= 0.9) return "overload";
  if (v >= 0.7) return "high";
  if (v >= 0.4) return "medium";
  if (v > 0)   return "low";
  return "none";
}

function bucketLevel(v) {
  if (v >= 0.9) return "elite";
  if (v >= 0.75) return "high";
  if (v >= 0.5) return "medium";
  if (v >= 0.25) return "low";
  return "critical";
}

function bucketCost(v) {
  if (v >= 0.8) return "heavy";
  if (v >= 0.5) return "moderate";
  if (v >= 0.2) return "light";
  if (v > 0)    return "negligible";
  return "none";
}

// ============================================================================
//  ORGAN IMPLEMENTATION — v30.0 IMMORTAL‑EVO+++
// ============================================================================
export class AIAnatomy {
  constructor(config = {}) {
    this.id = config.id || "pulse-touch-anatomy";
    this.encoder = config.encoder;
    this.memory = config.memory;
    this.trace = !!config.trace;

    if (!this.encoder || typeof this.encoder.encode !== "function") {
      throw new Error("AIAnatomy v30 requires aiBinaryAgent encoder");
    }
    if (
      !this.memory ||
      typeof this.memory.write !== "function" ||
      typeof this.memory.read !== "function"
    ) {
      throw new Error("AIAnatomy v30 requires a binary memory organ with write/read");
    }

    // pure structural topology
    this.topology = new Map();

    // local structural stats (no payloads, no identities)
    this._stats = {
      registerEvents: 0,
      connectEvents: 0,
      linkEvents: 0
    };
  }

  get meta() {
    return AI_ANATOMY_META_V30;
  }

  prewarm() {
    // no heavy compute; just a deterministic no‑op
    return true;
  }

  // ========================================================================
  //  STRUCTURAL ARTERY METRICS — v30 IMMORTAL‑EVO++
//  (purely structural, no routing, no semantics)
// ========================================================================
  _computeStructuralThroughput(organCount, connectionCount) {
    const organFactor = Math.min(1, organCount / 128);
    const connFactor  = Math.min(1, connectionCount / 256);
    const raw = Math.max(0, 1 - (organFactor * 0.5 + connFactor * 0.5));
    return Math.min(1, raw);
  }

  _computeStructuralPressure(connectionCount, organCount) {
    const density = organCount > 0 ? connectionCount / organCount : 0;
    const raw = Math.min(1, density / 12);
    return Math.max(0, raw);
  }

  _computeStructuralCost(pressure, throughput) {
    const raw = pressure * (1 - throughput);
    return Math.max(0, Math.min(1, raw));
  }

  _computeStructuralBudget(throughput, cost) {
    const raw = throughput - cost;
    return Math.max(0, Math.min(1, raw));
  }

  _computeStructuralArtery() {
    const organIds = Array.from(this.topology.keys());
    const organCount = organIds.length;

    let connectionCount = 0;

    for (const data of this.topology.values()) {
      connectionCount += data.inputs.length;
      connectionCount += data.outputs.length;
      connectionCount += data.bidirectional.length;
    }

    const throughput = this._computeStructuralThroughput(organCount, connectionCount);
    const pressure   = this._computeStructuralPressure(connectionCount, organCount);
    const cost       = this._computeStructuralCost(pressure, throughput);
    const budget     = this._computeStructuralBudget(throughput, cost);

    return Object.freeze({
      throughput,
      throughputBucket: bucketLevel(throughput),

      pressure,
      pressureBucket: bucketPressure(pressure),

      cost,
      costBucket: bucketCost(cost),

      budget,
      budgetBucket: bucketLevel(budget),

      organCount,
      connectionCount,

      // local structural stats (advisory only)
      events: {
        register: this._stats.registerEvents,
        connect: this._stats.connectEvents,
        link: this._stats.linkEvents
      }
    });
  }

  // ========================================================================
  //  TOPOLOGY REGISTRATION — v30 IMMORTAL‑EVO+++
//  (pure structure, no routing decisions)
// ========================================================================
  registerOrgan(organId) {
    if (!organId) return;

    if (!this.topology.has(organId)) {
      this.topology.set(organId, {
        inputs: [],
        outputs: [],
        bidirectional: []
      });

      this._stats.registerEvents++;
      const artery = this._computeStructuralArtery();
      this._trace("registerOrgan", { organId, artery });
    }
  }

  connect(from, to) {
    if (!from || !to) return;

    this.registerOrgan(from);
    this.registerOrgan(to);

    const node = this.topology.get(from);
    if (!node.outputs.includes(to)) node.outputs.push(to);

    const target = this.topology.get(to);
    if (!target.inputs.includes(from)) target.inputs.push(from);

    this._stats.connectEvents++;
    const artery = this._computeStructuralArtery();
    this._trace("connect", { from, to, artery });
  }

  link(a, b) {
    if (!a || !b) return;

    this.registerOrgan(a);
    this.registerOrgan(b);

    const A = this.topology.get(a);
    const B = this.topology.get(b);

    if (!A.bidirectional.includes(b)) A.bidirectional.push(b);
    if (!B.bidirectional.includes(a)) B.bidirectional.push(a);

    this._stats.linkEvents++;
    const artery = this._computeStructuralArtery();
    this._trace("link", { a, b, artery });
  }

  // ========================================================================
  //  ANATOMY SNAPSHOT v4 — v30 IMMORTAL‑EVO+++
//  Adds: band awareness, mesh pressure, advantage + bluetooth metadata.
// ========================================================================
  snapshot({
    binaryVitals = {},
    meshArtery = {},
    advantageField = {},
    bluetoothPresence = {}
  } = {}) {
    const obj = {};

    for (const [organId, data] of this.topology.entries()) {
      obj[organId] = {
        inputs: [...data.inputs],
        outputs: [...data.outputs],
        bidirectional: [...data.bidirectional]
      };
    }

    const artery = this._computeStructuralArtery();
    const binaryPressure = extractBinaryPressure(binaryVitals);
    const meshPressure = extractMeshPressure(meshArtery);

    const advantageEvents = advantageField.events || 0;
    const advantageBinaryPref = advantageField.binaryPreferenceEvents || 0;
    const advantageFactored = advantageField.factoredPathEvents || 0;

    const btProximity = bluetoothPresence.proximityTier || "unknown";
    const btTransport = bluetoothPresence.transport || "unknown";
    const btQuality = clamp01(Number(bluetoothPresence.linkQuality ?? 0));

    const payload = {
      type: "anatomy-snapshot-v4",
      meta: AI_ANATOMY_META_V30,
      timestamp: Date.now(), // symbolic only
      topology: obj,
      artery,
      pressures: {
        structural: artery.pressure,
        binary: binaryPressure,
        mesh: meshPressure
      },
      advantage: {
        events: advantageEvents,
        binaryPreferenceEvents: advantageBinaryPref,
        factoredPathEvents: advantageFactored
      },
      bluetooth: {
        proximityTier: btProximity,
        transport: btTransport,
        linkQuality: btQuality
      }
    };

    const json = JSON.stringify(payload);
    const binary = this.encoder.encode(json);

    const packet = Object.freeze({
      ...payload,
      bits: binary,
      bitLength: binary.length,
      pressureBucket: bucketPressure(
        0.5 * artery.pressure + 0.25 * binaryPressure + 0.25 * meshPressure
      )
    });

    this._trace("snapshot", {
      organs: Object.keys(obj).length,
      artery,
      pressures: payload.pressures,
      advantage: payload.advantage,
      bluetooth: payload.bluetooth
    });

    return packet;
  }

  // ========================================================================
  //  ANATOMY STORAGE — v30 IMMORTAL‑EVO+++
//  (still binary‑only, payload‑opaque)
// ========================================================================
  store(opts = {}) {
    const snap = this.snapshot(opts);

    const key = this.encoder.encode("anatomy:current");
    const value = snap.bits;

    this.memory.write(key, value);

    this._trace("store", { bits: value.length });

    return snap;
  }

  load() {
    const key = this.encoder.encode("anatomy:current");
    const binary = this.memory.read(key);

    if (!binary) {
      this._trace("load:none", {});
      return null;
    }

    const json = this.encoder.decode(binary, "string");
    const topology = JSON.parse(json);

    this._trace("load", {
      organs: Object.keys(topology.topology || {}).length,
      artery: topology.artery
    });

    return Object.freeze(topology);
  }

  // ========================================================================
  //  ANATOMY ARTERY v4 — v30 IMMORTAL‑EVO+++
//  Blends structural + binary + mesh pressure into organism view.
// ========================================================================
  anatomyArtery({
    binaryVitals = {},
    meshArtery = {}
  } = {}) {
    const artery = this._computeStructuralArtery();
    const binaryPressure = extractBinaryPressure(binaryVitals);
    const meshPressure = extractMeshPressure(meshArtery);

    const localPressure =
      (artery.pressure || 0) * 0.5 +
      (artery.cost || 0) * 0.3 +
      (meshPressure || 0) * 0.2;

    const pressure = Math.max(
      0,
      Math.min(1, 0.5 * localPressure + 0.5 * binaryPressure)
    );

    return {
      meta: AI_ANATOMY_META_V30,
      organism: {
        pressure,
        pressureBucket: bucketPressure(pressure)
      },
      anatomy: {
        throughput: artery.throughput,
        pressure: artery.pressure,
        cost: artery.cost,
        budget: artery.budget,
        organCount: artery.organCount,
        connectionCount: artery.connectionCount
      },
      mesh: {
        pressure: meshPressure,
        pressureBucket: bucketPressure(meshPressure)
      }
    };
  }

  // ========================================================================
  //  INTERNAL HELPERS
  // ========================================================================
  _trace(event, payload) {
    if (!this.trace) return;
    // eslint-disable-next-line no-console
    console.log(`[${this.id} v30] ${event}`, payload);
  }
}

// ============================================================================
// FACTORY EXPORT (ESM + CommonJS)
// ============================================================================
export function createAIAnatomy(config) {
  return new AIAnatomy(config);
}

if (typeof module !== "undefined") {
  module.exports = {
    AIAnatomy,
    createAIAnatomy,
    AI_ANATOMY_META_V30
  };
}
