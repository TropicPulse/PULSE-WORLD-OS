/**
 * aiCortex-v24.0-IMMORTAL-ADV — Pulse OS v24.0‑IMMORTAL-ADV Organ
 * --------------------------------------------------------------
 * CANONICAL ROLE:
 *   Dual‑Band Executive Cortex of the organism (subordinate to Aldwyn).
 *
 *   Dual‑band model:
 *     - Binary‑primary (deterministic, pattern, metrics, arteries)
 *     - Symbolic‑augment (persona, boundaries, intent, social/earn context)
 *
 *   Provides:
 *     - long-term reasoning
 *     - pattern recognition
 *     - decision-making
 *     - predictive modeling (lightweight, deterministic)
 *     - binary cognition artery metrics (throughput, pressure, cost, budget)
 *     - symbolic cognition artery metrics (intent clarity, semantic load, context depth)
 *     - dual-band cognition artery snapshots for NodeAdmin/Overmind
 *     - earn/heartbeat/organism‑vitals awareness (read‑only)
 *
 *   Ownership:
 *     • Explicitly subordinate to Aldwyn (canonical owner).
 */

import { OrganismIdentity } from "../PULSE-X/PulseWorldOrganismMap-v24.js";

const Identity = OrganismIdentity(import.meta.url);
// or: const Identity = OrganismIdentity["pulse-ai/ai-v24.0-IMMORTAL"] if that's the key you chose

// ============================================================================
//  META BLOCK — v24.0 IMMORTAL (ORGANISM KERNEL)
//  (now backed by the Organism Map instead of hardcoded here)
// ============================================================================
export const CortexMeta = Identity.OrganMeta;

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
//  GLOBAL CORTEX ARTERY REGISTRY (READ-ONLY, METRICS-ONLY)
// ---------------------------------------------------------

const _globalCortexArteryRegistry = new Map();
/**
 * Registry key: `${id}#${instanceIndex}`
 */
function _registryKey(id, instanceIndex) {
  return `${id || CortexMeta.identity}#${instanceIndex}`;
}

export function getGlobalCortexArteries() {
  const out = {};
  for (const [k, v] of _globalCortexArteryRegistry.entries()) {
    out[k] = v;
  }
  return out;
}

// ---------------------------------------------------------
//  CORTEX PREWARM ENGINE — v24.0‑IMMORTAL‑ADV (logic from v16)
// ---------------------------------------------------------
export function prewarmAICortex(config = {}) {
  try {
    const { encoder, trace } = config;

    const binaryMetrics = {
      throughput: 1,
      pressure: 0,
      cost: 0,
      budget: 1,
      buckets: {
        throughput: "elite",
        pressure: "none",
        cost: "none",
        budget: "elite"
      }
    };

    const symbolicMetrics = {
      intent: "prewarm",
      confidence: 1,
      semanticLoad: 0.2,
      contextDepth: 0.3,
      persona: "none",
      boundaryMode: "safe",
      owner: "Aldwyn",
      mode: "prewarm"
    };

    const fused = {
      type: "binary-cortex-decision",
      timestamp: 0,
      pattern: "prewarm-pattern",
      decision: "prewarm-decision",
      binary: binaryMetrics,
      symbolic: symbolicMetrics,
      band: {
        primary: "binary",
        secondary: "symbolic",
        fusion: "binary-primary-symbolic-augment"
      },
      owner: "Aldwyn"
    };

    if (encoder?.encode) {
      const bits = encoder.encode(JSON.stringify(fused));
      encoder.decode?.(bits, "string");
    }

    if (trace) {
      console.log("[AICortex Prewarm v24] complete");
    }

    return true;
  } catch (err) {
    console.error("[AICortex Prewarm v24] Failed:", err);
    return false;
  }
}

// ---------------------------------------------------------
//  CORTEX CLASS — v16.0‑IMMORTAL‑ADV LOGIC, v24 META
// ---------------------------------------------------------

export class AIDualBandCortex {
  constructor(config = {}) {
    this.id = config.id || CortexMeta.identity || "ai-dualband-cortex-v24";

    // Binary / organism stack
    this.encoder = config.encoder;
    this.pipeline = config.pipeline || null;
    this.reflex = config.reflex || null;
    this.logger = config.logger || null;
    this.memory = config.memory || null;
    this.registry = config.registry || null;
    this.evolution = config.evolution || null;
    this.heartbeat = config.heartbeat || null; // snapshot / artery
    this.earn = config.earn || null;           // earn-heart / earn-vitals
    this.governor = config.governor || null;

    // Symbolic / CNS stack
    this.router = config.router || null;
    this.personaEngine = config.personaEngine || null;
    this.boundariesEngine = config.boundariesEngine || null;
    this.permissionsEngine = config.permissionsEngine || null;

    // Overmind / NodeAdmin hooks (metrics-only, read-only)
    this.overmindReporter =
      typeof config.overmindReporter === "function"
        ? config.overmindReporter
        : null;

    this.nodeAdminReporter =
      typeof config.nodeAdminReporter === "function"
        ? config.nodeAdminReporter
        : null;

    this.trace = !!config.trace;

    if (!this.encoder) {
      throw new Error("AIDualBandCortex v24 requires aiBinaryAgent encoder");
    }

    this.patternHistory = [];
    this.instanceIndex = AIDualBandCortex._registerInstance();
  }

  // ---------------------------------------------------------
  //  STATIC INSTANCE REGISTRY
  // ---------------------------------------------------------
  static _registerInstance() {
    if (typeof AIDualBandCortex._instanceCount !== "number") {
      AIDualBandCortex._instanceCount = 0;
    }
    const idx = AIDualBandCortex._instanceCount;
    AIDualBandCortex._instanceCount += 1;
    return idx;
  }

  static getInstanceCount() {
    return typeof AIDualBandCortex._instanceCount === "number"
      ? AIDualBandCortex._instanceCount
      : 0;
  }

  // ---------------------------------------------------------
  //  BINARY COGNITION ARTERY METRICS (v16 tuned)
// ---------------------------------------------------------
  _computeCognitionThroughput(patternComplexity, snapshotBits, earnPressure = 0) {
    const sizeFactor = Math.min(1, snapshotBits / 65536);
    const earnFactor = Math.min(1, earnPressure);
    const raw = Math.max(
      0,
      1 - (patternComplexity * 0.4 + sizeFactor * 0.4 + earnFactor * 0.2)
    );
    return Math.min(1, raw);
  }

  _computeCognitionPressure(bitLength, snapshotBits, heartbeatPressure = 0) {
    const sizeFactor = Math.min(1, snapshotBits / 65536);
    const raw = Math.min(
      1,
      (bitLength / 50000) * (0.4 + sizeFactor * 0.4 + heartbeatPressure * 0.2)
    );
    return Math.max(0, raw);
  }

  _computeCognitionCost(pressure, throughput) {
    const raw = pressure * (1 - throughput);
    return Math.max(0, Math.min(1, raw));
  }

  _computeCognitionBudget(throughput, cost) {
    const raw = throughput - cost;
    return Math.max(0, Math.min(1, raw));
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
    if (v > 0)   return "low";
    return "none";
  }

  _bucketCost(v) {
    if (v >= 0.8) return "heavy";
    if (v >= 0.5) return "moderate";
    if (v >= 0.2) return "light";
    if (v > 0)    return "negligible";
    return "none";
  }

  // ---------------------------------------------------------
  //  AUX VITALS — heartbeat / earn / governor (read-only)
// ---------------------------------------------------------
  _readHeartbeatVitals() {
    try {
      if (!this.heartbeat || typeof this.heartbeat.snapshot !== "function") {
        return null;
      }
      const snap = this.heartbeat.snapshot();
      return {
        ticks: snap.artery?.ticks ?? 0,
        pulses: snap.artery?.pulses ?? 0,
        skips: snap.artery?.skips ?? 0,
        lastPressure: snap.artery?.lastPressure ?? 0,
        lastLoad: snap.artery?.lastLoad ?? 0,
        primaryState: snap.artery?.lastPrimaryState ?? "unknown"
      };
    } catch {
      return null;
    }
  }

  _readEarnVitals() {
    try {
      if (!this.earn || typeof this.earn.snapshot !== "function") {
        return null;
      }
      const snap = this.earn.snapshot();
      return {
        activeJobs: snap.activeJobs ?? 0,
        backlog: snap.backlog ?? 0,
        earnPressure: snap.earnPressure ?? 0,
        revenueRate: snap.revenueRate ?? 0
      };
    } catch {
      return null;
    }
  }

  // ---------------------------------------------------------
  //  PATTERN RECOGNITION (BINARY PRIMARY)
// ---------------------------------------------------------
  _detectPattern(bits) {
    const motif = bits.slice(0, 32); // richer motif for v16

    this.patternHistory.push(motif);
    if (this.patternHistory.length > 64) {
      this.patternHistory.shift();
    }

    this._trace("pattern:detected", { motif });

    return motif;
  }

  // ---------------------------------------------------------
  //  BINARY DECISION (PRIMARY)
// ---------------------------------------------------------
  _makeBinaryDecision(pattern, bits, snapshotBits, heartbeatVitals, earnVitals) {
    const bitLength = bits.length;
    const complexity = pattern.length / 8;

    const loadFactor = Math.min(1, snapshotBits / 65536);
    const signalFactor = Math.min(1, bitLength / 32768);
    const earnPressure = earnVitals?.earnPressure ?? 0;
    const heartbeatPressure = heartbeatVitals?.lastPressure ?? 0;

    let decision = "neutral";

    if ((loadFactor > 0.7 || heartbeatPressure > 0.8) && signalFactor > 0.5) {
      decision = "conserve";
    } else if (loadFactor < 0.3 && signalFactor < 0.5 && earnPressure < 0.6) {
      decision = "expand";
    }

    this._trace("decision:binary", {
      pattern,
      decision,
      loadFactor,
      signalFactor,
      complexity,
      heartbeatPressure,
      earnPressure
    });

    return decision;
  }

  // ---------------------------------------------------------
  //  SYMBOLIC COGNITION (AUGMENT)
// ---------------------------------------------------------
  _makeSymbolicDecision(pattern, bits, routerPacket = null) {
    if (!routerPacket) {
      this._trace("decision:symbolic", { reason: "no-router-packet", skipped: true });
      return {
        decision: null,
        intent: null,
        confidence: 0,
        semanticLoad: 0,
        contextDepth: 0,
        persona: null,
        boundaryMode: null,
        owner: "Aldwyn"
      };
    }

    const intent = routerPacket.overmind?.intent || "analyze";
    const personaId = routerPacket.personaId || null;
    const safetyMode = routerPacket.personaSafety?.safetyMode || "standard";

    const flags = routerPacket.overmind?.flags || {};
    const activeFlags = Object.values(flags).filter(Boolean).length;

    const semanticLoad = Math.min(1, activeFlags / 10);
    const contextDepth =
      personaId === "ARCHITECT"
        ? 0.85
        : personaId === "OBSERVER"
        ? 0.65
        : personaId === "TOURGUIDE"
        ? 0.55
        : 0.45;

    const confidence =
      safetyMode === "strict"
        ? 0.6
        : safetyMode === "standard"
        ? 0.75
        : 0.85;

    let decision = null;
    if (intent === "optimize" || intent === "refactor" || intent === "scale") {
      decision = "expand";
    } else if (intent === "stabilize" || intent === "diagnose" || intent === "protect") {
      decision = "conserve";
    }

    const personaName = personaId;
    const boundaryMode = safetyMode;

    this._trace("decision:symbolic", {
      pattern,
      decision,
      intent,
      confidence,
      semanticLoad,
      contextDepth,
      persona: personaName,
      boundaryMode
    });

    return {
      decision,
      intent,
      confidence,
      semanticLoad,
      contextDepth,
      persona: personaName,
      boundaryMode,
      owner: "Aldwyn"
    };
  }

  // ---------------------------------------------------------
  //  DUAL‑BAND FUSION (BINARY‑PRIMARY, SYMBOLIC‑AUGMENT)
// ---------------------------------------------------------
  _fuseDecisions(binaryDecision, symbolic) {
    const symbolicDecision = symbolic.decision;
    const confidence = symbolic.confidence || 0;

    let finalDecision = binaryDecision;

    if (symbolicDecision && confidence >= 0.8) {
      finalDecision = symbolicDecision;
    } else if (
      symbolicDecision &&
      confidence >= 0.5 &&
      symbolicDecision !== "neutral" &&
      binaryDecision === "neutral"
    ) {
      finalDecision = symbolicDecision;
    }

    this._trace("decision:fused", {
      binaryDecision,
      symbolicDecision,
      confidence,
      finalDecision
    });

    return finalDecision;
  }

  // ---------------------------------------------------------
  //  CORTEX PACKET (DUAL‑BAND) + ARTERY
  // ---------------------------------------------------------
  _generateDecisionPacket(pattern, decision, bits, options = {}) {
    const bitLength = bits.length;

    let snapshotBits = 0;
    if (this.memory && typeof this.memory.snapshot === "function") {
      const snapshot = this.memory.snapshot();
      if (typeof snapshot === "string") {
        snapshotBits = snapshot.length;
      }
    }

    const heartbeatVitals = this._readHeartbeatVitals();
    const earnVitals = this._readEarnVitals();

    const heartbeatPressure = heartbeatVitals?.lastPressure ?? 0;
    const earnPressure = earnVitals?.earnPressure ?? 0;

    const patternComplexity = pattern.length / 8;

    const throughput = this._computeCognitionThroughput(
      patternComplexity,
      snapshotBits,
      earnPressure
    );
    const pressure = this._computeCognitionPressure(
      bitLength,
      snapshotBits,
      heartbeatPressure
    );
    const cost = this._computeCognitionCost(pressure, throughput);
    const budget = this._computeCognitionBudget(throughput, cost);

    const binary = {
      throughput,
      throughputBucket: this._bucketLevel(throughput),

      pressure,
      pressureBucket: this._bucketPressure(pressure),

      cost,
      costBucket: this._bucketCost(cost),

      budget,
      budgetBucket: this._bucketLevel(budget)
    };

    const symbolic = options.symbolic || {
      intent: null,
      confidence: 0,
      semanticLoad: 0,
      contextDepth: 0,
      persona: null,
      boundaryMode: null,
      owner: "Aldwyn"
    };

    const band = {
      primary: "binary",
      secondary: "symbolic",
      fusion: "binary-primary-symbolic-augment"
    };

    const artery = Object.freeze({
      binary,
      symbolic,
      band,
      heartbeatVitals,
      earnVitals,
      instanceIndex: this.instanceIndex,
      instanceCount: AIDualBandCortex.getInstanceCount(),
      id: this.id,
      timestamp: Date.now(),
      owner: "Aldwyn"
    });

    const payload = {
      type: "binary-cortex-decision",
      timestamp: artery.timestamp,
      pattern,
      decision,
      binary,
      symbolic,
      band,
      binaryDecision: options.binaryDecision || decision,
      symbolicDecision: symbolic.decision || null,
      artery,
      owner: "Aldwyn"
    };

    const json = JSON.stringify(payload);
    const encoded = this.encoder.encode(json);

    const packet = {
      ...payload,
      bits: encoded,
      bitLength: encoded.length
    };

    const key = _registryKey(this.id, this.instanceIndex);
    _globalCortexArteryRegistry.set(key, artery);

    if (this.overmindReporter) {
      try {
        this.overmindReporter(artery, packet, CortexMeta);
      } catch (err) {
        this._trace("overmind:reporter:error", { error: String(err) });
      }
    }

    if (this.nodeAdminReporter) {
      try {
        this.nodeAdminReporter(artery, packet, CortexMeta);
      } catch (err) {
        this._trace("nodeAdmin:reporter:error", { error: String(err) });
      }
    }

    this._trace("cortex:packet", {
      bits: packet.bitLength,
      band,
      owner: "Aldwyn"
    });

    return packet;
  }

  // ---------------------------------------------------------
  //  EXECUTIVE PROCESSING (DUAL‑BAND)
// ---------------------------------------------------------
  async process(bits, routerPacket = null) {
    const pattern = this._detectPattern(bits);

    let snapshotBits = 0;
    if (this.memory && typeof this.memory.snapshot === "function") {
      const snapshot = this.memory.snapshot();
      if (typeof snapshot === "string") {
        snapshotBits = snapshot.length;
      }
    }

    const heartbeatVitals = this._readHeartbeatVitals();
    const earnVitals = this._readEarnVitals();

    const binaryDecision = this._makeBinaryDecision(
      pattern,
      bits,
      snapshotBits,
      heartbeatVitals,
      earnVitals
    );

    const symbolic = this._makeSymbolicDecision(pattern, bits, routerPacket);

    const fusedDecision = this._fuseDecisions(binaryDecision, symbolic);

    const packet = this._generateDecisionPacket(pattern, fusedDecision, bits, {
      binaryDecision,
      symbolic
    });

    if (this.pipeline) this.pipeline.run(packet.bits);
    if (this.reflex) this.reflex.run(packet.bits);
    if (this.logger && typeof this.logger.logBinary === "function") {
      this.logger.logBinary(packet.bits, { source: "cortex" });
    }

    return packet;
  }

  // ---------------------------------------------------------
  //  INTERNAL HELPERS
  // ---------------------------------------------------------
  _trace(event, payload) {
    if (!this.trace) return;
    console.log(
      `[${this.id}#${this.instanceIndex}@v24] ${event}`,
      payload
    );
  }
}

export function createCortex(config) {
  return new AIDualBandCortex(config);
}

// ============================================================================
//  DUAL‑MODE EXPORTS (ESM + CommonJS)
// ============================================================================
if (typeof module !== "undefined") {
  module.exports = {
    CortexMeta,
    AIDualBandCortex,
    createCortex,
    getGlobalCortexArteries,
    prewarmAICortex,
    pulseRole,
    surfaceMeta,
    pulseLoreContext,
    AI_EXPERIENCE_META,
    EXPORT_META
  };
}
