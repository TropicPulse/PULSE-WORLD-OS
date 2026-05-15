// ============================================================================
//  PULSE OS v30.0‑IMMORTAL‑EVO++ — ANCESTRY ORGAN
//  Genealogical Archive • Lineage Ledger • Reproduction Historian
//  PURE BINARY. ZERO MUTATION OF EXTERNALS. ZERO RANDOMNESS. ZERO WALL‑TIME.
//  CORE MEMORY AWARE • DUALBAND‑AWARE • BLUETOOTH‑AWARE • HALO‑READY
// ============================================================================

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

function bucketLevel(v) {
  if (v >= 0.9)  return "elite";
  if (v >= 0.75) return "high";
  if (v >= 0.5)  return "medium";
  if (v >= 0.25) return "low";
  return "critical";
}

function bucketCost(v) {
  if (v >= 0.8)  return "heavy";
  if (v >= 0.5)  return "moderate";
  if (v >= 0.2)  return "light";
  if (v > 0)     return "negligible";
  return "none";
}

function clamp01(v) {
  if (v <= 0) return 0;
  if (v >= 1) return 1;
  return v;
}

// IMMORTAL timestamp substitute (monotonic counter, no wall‑clock)
let IMMORTAL_TICK = 0;
function immortalTimestamp() {
  IMMORTAL_TICK += 1;
  return IMMORTAL_TICK;
}

// ============================================================================
//  BLUETOOTH / PRESENCE CLASSIFICATION — METADATA‑ONLY
// ============================================================================
function classifyBluetoothPresenceCounters(state, bluetoothPresence) {
  if (!bluetoothPresence || typeof bluetoothPresence !== "object") return;

  state.btEvents += 1;

  const proximity = bluetoothPresence.proximityTier || "unknown";
  if (proximity === "near") {
    state.btNear += 1;
  } else if (proximity === "mid") {
    state.btMid += 1;
  } else if (proximity === "far") {
    state.btFar += 1;
  } else {
    state.btUnknown += 1;
  }

  const transport = bluetoothPresence.transport || "unknown";
  if (transport === "ble") {
    state.btBLE += 1;
  } else if (transport === "wifi") {
    state.btWiFi += 1;
  } else if (transport === "wired") {
    state.btWired += 1;
  } else {
    state.btTransportUnknown += 1;
  }

  const qRaw = Number(bluetoothPresence.linkQuality);
  if (Number.isFinite(qRaw)) {
    const q = clamp01(qRaw);
    state.btLinkQualitySum += q;
    state.btLinkQualitySamples += 1;
  }
}

// ============================================================================
//  ANCESTRY ARTERY ENGINE — v30 IMMORTAL‑EVO++
// ============================================================================
function computeAncestryArteryCore(lineage) {
  const eventCount  = lineage.length;
  const parentCount = new Set(lineage.map((r) => r.parentId)).size;
  const childCount  = new Set(lineage.map((r) => r.childId)).size;

  // Structural density heuristic
  const density = eventCount > 0 ? (parentCount + childCount) / (2 * eventCount) : 0;

  const throughput = clamp01(1 - clamp01(density)); // more dense → lower throughput
  const pressure   = clamp01(density);              // more dense → higher pressure
  const cost       = clamp01(pressure * (1 - throughput));
  const budget     = clamp01(throughput - cost);

  return Object.freeze({
    events: eventCount,
    parents: parentCount,
    children: childCount,

    throughput,
    throughputBucket: bucketLevel(throughput),

    pressure,
    pressureBucket: bucketPressure(pressure),

    cost,
    costBucket: bucketCost(cost),

    budget,
    budgetBucket: bucketLevel(budget)
  });
}

// ============================================================================
//  ORGAN IMPLEMENTATION — v30.0 IMMORTAL‑EVO++
// ============================================================================
export class AIAncestry {
  constructor(config = {}) {
    this.id       = config.id || "pulse-touch-ancestry";
    this.encoder  = config.encoder;
    this.memory   = config.memory;
    this.pipeline = config.pipeline || null;
    this.reflex   = config.reflex || null;
    this.logger   = config.logger || null;
    this.trace    = !!config.trace;

    if (!this.encoder?.encode) {
      throw new Error("AIAncestry v30 requires a binary encoder");
    }
    if (!this.memory?.write || !this.memory?.read) {
      throw new Error("AIAncestry v30 requires a binary memory organ");
    }

    // IMMORTAL: lineage is immutable snapshots, not a growing mutable array
    this._lineage = Object.freeze([]);

    // Halo / bluetooth‑style counters (local only, no external mutation)
    this._telemetry = {
      btEvents: 0,
      btNear: 0,
      btMid: 0,
      btFar: 0,
      btUnknown: 0,
      btBLE: 0,
      btWiFi: 0,
      btWired: 0,
      btTransportUnknown: 0,
      btLinkQualitySum: 0,
      btLinkQualitySamples: 0
    };
  }

  prewarm() {
    // deterministic no‑op prewarm
    return true;
  }

  // ========================================================================
  //  RECORDING — deterministic, binary‑safe, IMMORTAL
  // ========================================================================
  recordReproduction(
    record,
    {
      binaryVitals = {},
      coreMemoryRef = null,
      band = "binary",
      presenceTag = "AIAncestry-v30",
      bluetoothPresence = null
    } = {}
  ) {
    const frozenRecord = Object.freeze({ ...record });

    // IMMUTABLE lineage append
    this._lineage = Object.freeze([...this._lineage, frozenRecord]);

    classifyBluetoothPresenceCounters(this._telemetry, bluetoothPresence);

    const packet = this._generateAncestryPacket(
      frozenRecord,
      {
        binaryVitals,
        band,
        presenceTag,
        bluetoothPresence
      },
      coreMemoryRef
    );

    if (this.pipeline) this.pipeline.run(packet.bits);
    if (this.reflex)   this.reflex.run(packet.bits);
    if (this.logger && this.logger.logBinary) {
      this.logger.logBinary(packet.bits, { source: "ancestry" });
    }

    return packet;
  }

  // ========================================================================
  //  ANCESTRY PACKET v5 — IMMORTAL, dualband‑aware, presence‑aware
  // ========================================================================
  _generateAncestryPacket(
    record,
    {
      binaryVitals = {},
      band = "binary",
      presenceTag = "AIAncestry-v30",
      bluetoothPresence = null
    } = {},
    coreMemoryRef = null
  ) {
    const binaryPressure = extractBinaryPressure(binaryVitals);
    const arteryCore     = computeAncestryArteryCore(this._lineage);

    const btState = this._telemetry;
    const btAvgLink =
      btState.btLinkQualitySamples > 0
        ? btState.btLinkQualitySum / btState.btLinkQualitySamples
        : 0;

    const payload = {
      type: "ancestry-event",
      ts: immortalTimestamp(), // IMMORTAL timestamp
      record,
      band,
      presenceTag,
      bluetoothPresence,
      pressure: binaryPressure,
      ancestryArtery: arteryCore,
      bluetooth: {
        events: btState.btEvents,
        near: btState.btNear,
        mid: btState.btMid,
        far: btState.btFar,
        unknown: btState.btUnknown,
        ble: btState.btBLE,
        wifi: btState.btWiFi,
        wired: btState.btWired,
        transport_unknown: btState.btTransportUnknown,
        avg_link_quality: btAvgLink
      },
      coreMemoryRef,
      flags: {
        ancestry_event: true,
        dualband_aware: true,
        bluetooth_aware: !!bluetoothPresence,
        presence_tagged: !!presenceTag
      }
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
  //  STORAGE v5 — IMMORTAL, deterministic
  // ========================================================================
  store({ binaryVitals = {}, coreMemoryRef = null } = {}) {
    const arteryCore = computeAncestryArteryCore(this._lineage);
    const binaryPressure = extractBinaryPressure(binaryVitals);

    const payload = {
      type: "ancestry-store",
      ts: immortalTimestamp(),
      lineage: this._lineage,
      ancestryArtery: arteryCore,
      pressure: binaryPressure,
      coreMemoryRef
    };

    const json   = JSON.stringify(payload);
    const binary = this.encoder.encode(json);

    const key = this.encoder.encode("ancestry:records:v30");
    this.memory.write(key, binary);

    return binary;
  }

  load() {
    const key    = this.encoder.encode("ancestry:records:v30");
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
  //  QUERIES — deterministic lineage graph (IMMORTAL‑safe)
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
  //  ANCESTRY ARTERY v5 — IMMORTAL, dualband‑aware
  // ========================================================================
  ancestryArtery({ binaryVitals = {} } = {}) {
    const binaryPressure = extractBinaryPressure(binaryVitals);
    const core = computeAncestryArteryCore(this._lineage);

    const localPressure =
      (core.pressure || 0) * 0.6 +
      (core.cost || 0) * 0.4;

    const pressure = clamp01(
      0.6 * localPressure + 0.4 * binaryPressure
    );

    return {
      organism: {
        pressure,
        pressureBucket: bucketPressure(pressure)
      },
      lineage: {
        events: core.events,
        parents: core.parents,
        children: core.children
      },
      ancestry: {
        throughput: core.throughput,
        pressure: core.pressure,
        cost: core.cost,
        budget: core.budget,
        throughputBucket: core.throughputBucket,
        pressureBucket: core.pressureBucket,
        costBucket: core.costBucket,
        budgetBucket: core.budgetBucket
      }
    };
  }

  // ========================================================================
  //  TELEMETRY SNAPSHOT — HALO / BACKEND‑AI FRIENDLY
  // ========================================================================
  snapshotTelemetry() {
    const bt = this._telemetry;
    const btAvg =
      bt.btLinkQualitySamples > 0
        ? bt.btLinkQualitySum / bt.btLinkQualitySamples
        : 0;

    return Object.freeze({
      id: this.id,
      lineageEvents: this._lineage.length,
      bluetooth: {
        events: bt.btEvents,
        near: bt.btNear,
        mid: bt.btMid,
        far: bt.btFar,
        unknown: bt.btUnknown,
        ble: bt.btBLE,
        wifi: bt.btWiFi,
        wired: bt.btWired,
        transport_unknown: bt.btTransportUnknown,
        avg_link_quality: btAvg
      }
    });
  }

  // ========================================================================
  //  INTERNAL TRACE — IMMORTAL: no console, no side effects
  // ========================================================================
  _trace(_event, _payload) {
    if (!this.trace) return;
    // IMMORTAL: no console.log — intentional no‑op
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
    createAIAncestry
  };
}
