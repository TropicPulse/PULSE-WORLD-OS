// ============================================================================
//  aiPageScannerAdapter.js — Pulse OS v24.0-IMMORTAL++
//  Binary PageScanner Membrane • Drift Intel • Artery v4 • Beacon Mesh
//  PURE MEMBRANE. ZERO MUTATION. ZERO RANDOMNESS. ZERO DIRECT INTERNET.
// ============================================================================

import { OrganismIdentity } from "../PULSE-X/PulseWorldOrganismMap-v24.js";

const Identity = OrganismIdentity(import.meta.url);

// ============================================================================
//  META BLOCK — v24.0 IMMORTAL (ORGANISM KERNEL)
//  (now backed by the Organism Map instead of hardcoded here)
// ============================================================================
export const PageScannerAdapterMeta = Identity.OrganMeta;

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
//  GLOBAL ARTERY REGISTRY (READ-ONLY, METRICS-ONLY)
// ============================================================================
//
//  Registry key: `${id}#${instanceIndex}`
//  Value: latest scanner artery snapshot for that instance.
//
const _globalPageScannerArteryRegistry = new Map();

function _registryKey(id, instanceIndex) {
  return `${id || PageScannerAdapterMeta.identity}#${instanceIndex}`;
}

export function getGlobalPageScannerArteries() {
  const out = {};
  for (const [k, v] of _globalPageScannerArteryRegistry.entries()) {
    out[k] = v;
  }
  return out;
}

// ============================================================================
//  PACKET EMITTER — deterministic, membrane-scoped
// ============================================================================
function emitPageScannerAdapterPacket(type, payload) {
  return Object.freeze({
    meta: PageScannerAdapterMeta,
    packetType: `pagescanner-adapter-${type}`,
    packetId: `pagescanner-adapter-${type}-${Date.now()}`,
    timestamp: Date.now(),
    epoch: PageScannerAdapterMeta.evo.epoch,
    ...payload
  });
}

// ============================================================================
//  PREWARM — v24.0‑IMMORTAL++ membrane warmup (dualband-aware)
// ============================================================================
export function prewarmPageScannerAdapter(
  dualBand = null,
  {
    trace = false,
    computeSurface = null,
    computeDeltaPacket = null
  } = {}
) {
  try {
    const binaryPressure =
      dualBand?.binary?.metabolic?.pressure ??
      dualBand?.binary?.routing?.pressure ??
      0;

    const evolutionMode =
      dualBand?.symbolic?.evolution?.mode ||
      dualBand?.symbolic?.persona?.evolutionMode ||
      "passive";

    const packet = emitPageScannerAdapterPacket("prewarm", {
      message: "PageScanner adapter prewarmed and membrane artery v4 aligned.",
      binaryPressure,
      evolutionMode,
      computeSurface: computeSurface || null,
      computeDeltaPacket: computeDeltaPacket || null
    });

    if (trace) console.log("[aiPageScannerAdapter] prewarm", packet);
    return packet;
  } catch (err) {
    return emitPageScannerAdapterPacket("prewarm-error", {
      error: String(err),
      message: "PageScanner adapter prewarm failed."
    });
  }
}

// ============================================================================
//  ARTERY HELPERS — v4 (windowed, drift-aware)
// ============================================================================
function _bucketLevel(v) {
  if (v >= 0.9) return "elite";
  if (v >= 0.75) return "high";
  if (v >= 0.5) return "medium";
  if (v >= 0.25) return "low";
  return "critical";
}

function _bucketPressure(v) {
  if (v >= 0.9) return "overload";
  if (v >= 0.7) return "high";
  if (v >= 0.4) return "medium";
  if (v > 0)   return "low";
  return "none";
}

function _bucketCost(v) {
  if (v >= 0.8) return "heavy";
  if (v >= 0.5) return "moderate";
  if (v >= 0.2) return "light";
  if (v > 0)    return "negligible";
  return "none";
}

function _bucketDrift(v) {
  if (v >= 0.9) return "catastrophic";
  if (v >= 0.7) return "severe";
  if (v >= 0.4) return "moderate";
  if (v > 0)    return "mild";
  return "none";
}

// ============================================================================
//  ORGAN IMPLEMENTATION — v24.0‑IMMORTAL++ Membrane
// ============================================================================
export class AIBinaryPageScannerAdapter {
  constructor(config = {}) {
    this.id = config.id || PageScannerAdapterMeta.identity;
    this.encoder = config.encoder;
    this.logger = config.logger || null;
    this.shadowLogger = config.shadowLogger || null;
    this.pipeline = config.pipeline || null;
    this.reflex = config.reflex || null;

    // Optional: crown-layer hooks
    this.beacon = config.beacon || null; // function(beaconEvent)
    this.trace = !!config.trace;

    // optional CI / delta context (read-only, never interpreted)
    this.computeSurfaceProvider = config.computeSurfaceProvider || null;
    this.computeDeltaProvider = config.computeDeltaProvider || null;
    this.triHeartId = config.triHeartId || "pagescanner";

    // optional NodeAdmin reporter hook (metrics-only, read-only)
    this.nodeAdminReporter =
      typeof config.nodeAdminReporter === "function"
        ? config.nodeAdminReporter
        : null;

    if (!this.encoder || typeof this.encoder.encode !== "function") {
      throw new Error("AIBinaryPageScannerAdapter requires aiBinaryAgent encoder");
    }

    // Multi-instance identity
    this.instanceIndex = AIBinaryPageScannerAdapter._registerInstance();

    // Window configuration for artery v4
    this.windowMs =
      typeof config.windowMs === "number" && config.windowMs > 0
        ? config.windowMs
        : 60000;

    this._windowStart = Date.now();
    this._windowEvents = 0;
    this._windowBits = 0;
    this._windowHighDrift = 0;

    this._totalEvents = 0;
    this._totalBits = 0;
    this._totalHighDrift = 0;

    // Window-safe artery snapshot (no source code, no raw events)
    this.scannerArtery = {
      lastEventType: null,
      lastFile: null,
      lastRoute: null,
      lastBits: 0,
      lastDriftScore: 0,
      lastDriftBucket: "none",
      eventsPerSec: 0,
      harmonicLoad: 0,
      snapshot: () =>
        Object.freeze({
          lastEventType: this.scannerArtery.lastEventType,
          lastFile: this.scannerArtery.lastFile,
          lastRoute: this.scannerArtery.lastRoute,
          lastBits: this.scannerArtery.lastBits,
          lastDriftScore: this.scannerArtery.lastDriftScore,
          lastDriftBucket: this.scannerArtery.lastDriftBucket,
          eventsPerSec: this.scannerArtery.eventsPerSec,
          harmonicLoad: this.scannerArtery.harmonicLoad,
          instanceIndex: this.instanceIndex,
          instanceCount: AIBinaryPageScannerAdapter.getInstanceCount()
        })
    };
  }

  // ---------------------------------------------------------------------------
  //  STATIC INSTANCE REGISTRY
  // ---------------------------------------------------------------------------
  static _registerInstance() {
    if (typeof AIBinaryPageScannerAdapter._instanceCount !== "number") {
      AIBinaryPageScannerAdapter._instanceCount = 0;
    }
    const idx = AIBinaryPageScannerAdapter._instanceCount;
    AIBinaryPageScannerAdapter._instanceCount += 1;
    return idx;
  }

  static getInstanceCount() {
    return typeof AIBinaryPageScannerAdapter._instanceCount === "number"
      ? AIBinaryPageScannerAdapter._instanceCount
      : 0;
  }

  // ---------------------------------------------------------------------------
  //  WINDOW ROLLING — Artery v4
  // ---------------------------------------------------------------------------
  _rollWindow(now) {
    if (now - this._windowStart >= this.windowMs) {
      this._windowStart = now;
      this._windowEvents = 0;
      this._windowBits = 0;
      this._windowHighDrift = 0;
    }
  }

  // IMMORTAL-grade artery snapshot packet (window-safe)
  snapshotMembrane() {
    return emitPageScannerAdapterPacket("snapshot", {
      artery: this.scannerArtery.snapshot()
    });
  }

  snapshotArteryPacket() {
    const artery = this._computeScannerArtery();
    return emitPageScannerAdapterPacket("artery-snapshot", {
      artery,
      instanceIndex: this.instanceIndex
    });
  }

  // ---------------------------------------------------------------------------
  //  OPTIONAL CI / DELTA CONTEXT — read-only, non-interpreting
  // ---------------------------------------------------------------------------
  _getComputeContext() {
    let computeSurface = null;
    let computeDeltaPacket = null;

    try {
      if (typeof this.computeSurfaceProvider === "function") {
        computeSurface = this.computeSurfaceProvider() || null;
      }
    } catch (_) {
      computeSurface = null;
    }

    try {
      if (typeof this.computeDeltaProvider === "function") {
        computeDeltaPacket = this.computeDeltaProvider() || null;
      }
    } catch (_) {
      computeDeltaPacket = null;
    }

    return { computeSurface, computeDeltaPacket };
  }

  // ---------------------------------------------------------------------------
  //  ARTERY v4 — windowed drift + load metrics
  // ---------------------------------------------------------------------------
  _computeScannerArtery() {
    const now = Date.now();
    this._rollWindow(now);

    const elapsedMs = Math.max(1, now - this._windowStart);
    const eventsPerSec = (this._windowEvents / elapsedMs) * 1000;

    const instanceCount = AIBinaryPageScannerAdapter.getInstanceCount() || 1;
    const harmonicLoad = eventsPerSec / instanceCount;

    const avgBits =
      this._windowEvents > 0 ? this._windowBits / this._windowEvents : 0;

    const highDriftRatio =
      this._windowEvents > 0
        ? Math.min(1, this._windowHighDrift / this._windowEvents)
        : 0;

    const sizeFactor = Math.min(1, avgBits / 50000);
    const loadFactor = Math.min(1, harmonicLoad / 128);
    const driftFactor = highDriftRatio;

    const pressureBase = Math.max(
      0,
      Math.min(1, (sizeFactor + loadFactor + driftFactor) / 3)
    );
    const pressure = pressureBase;

    const throughputBase = Math.max(0, 1 - pressure);
    const throughput = Math.max(0, Math.min(1, throughputBase));

    const cost = Math.max(0, Math.min(1, pressure * (1 - throughput)));
    const budget = Math.max(0, Math.min(1, throughput - cost));

    const artery = {
      instanceIndex: this.instanceIndex,
      instanceCount,

      windowMs: this.windowMs,
      windowEvents: this._windowEvents,
      windowBits: this._windowBits,
      windowHighDrift: this._windowHighDrift,

      totalEvents: this._totalEvents,
      totalBits: this._totalBits,
      totalHighDrift: this._totalHighDrift,

      eventsPerSec,
      harmonicLoad,
      avgBits,
      highDriftRatio,
      highDriftBucket: _bucketDrift(highDriftRatio),

      throughput,
      throughputBucket: _bucketLevel(throughput),

      pressure,
      pressureBucket: _bucketPressure(pressure),

      cost,
      costBucket: _bucketCost(cost),

      budget,
      budgetBucket: _bucketLevel(budget),

      id: this.id,
      timestamp: now
    };

    // Update window-safe snapshot
    this.scannerArtery.eventsPerSec = eventsPerSec;
    this.scannerArtery.harmonicLoad = harmonicLoad;

    // Update global registry
    const key = _registryKey(this.id, this.instanceIndex);
    _globalPageScannerArteryRegistry.set(key, artery);

    // Optional NodeAdmin reporter
    if (this.nodeAdminReporter) {
      try {
        this.nodeAdminReporter(artery, PageScannerAdapterMeta);
      } catch (err) {
        this._trace("nodeAdmin:reporter:error", { error: String(err) });
      }
    }

    return artery;
  }

  // ---------------------------------------------------------------------------
  //  ATTACHMENT
  // ---------------------------------------------------------------------------
  attach(scanner) {
    if (!scanner || typeof scanner.onEvent !== "function") {
      throw new Error("attach expects a PageScanner with .onEvent()");
    }

    scanner.onEvent((event) => {
      this._handleScannerEvent(event);
    });

    this._trace("attach", { scanner: scanner.id || "PageScanner" });

    return emitPageScannerAdapterPacket("attached", {
      scannerId: scanner.id || "PageScanner",
      instanceIndex: this.instanceIndex
    });
  }

  // ---------------------------------------------------------------------------
  //  DRIFT ANALYSIS
  // ---------------------------------------------------------------------------
  _analyzeDrift(event) {
    const srcA = event?.pageA || "";
    const srcB = event?.pageB || "";

    const extractVars = (src) =>
      [...src.matchAll(/(?:const|let|var)\s+([A-Za-z0-9_]+)/g)].map((m) => m[1]);

    const varsA = extractVars(srcA);
    const varsB = extractVars(srcB);

    const normalize = (name) =>
      name
        .replace(/[\d_]+$/, "")
        .replace(/(Field|State|Mode|Flag|Ref|Node)$/i, "")
        .toLowerCase();

    const lineage = [];
    for (const a of varsA) {
      const normA = normalize(a);
      for (const b of varsB) {
        const normB = normalize(b);
        if (normA === normB && a !== b) {
          lineage.push({ canonical: a, drifted: b });
        }
      }
    }

    const esmA = /import\s+.*from\s+['"]/.test(srcA);
    const cjsA = /require\s*\(/.test(srcA);
    const esmB = /import\s+.*from\s+['"]/.test(srcB);
    const cjsB = /require\s*\(/.test(srcB);

    const moduleMode = {
      pageA: { esm: esmA, cjs: cjsA, mixed: esmA && cjsA },
      pageB: { esm: esmB, cjs: cjsB, mixed: esmB && cjsB }
    };

    const hasESMExportB = /export\s+/.test(srcB);
    const hasCJSExportB = /module\.exports/.test(srcB);

    const exportDrift = {
      missingESM: !hasESMExportB,
      missingCJS: !hasCJSExportB,
      vars: varsB
    };

    const driftScore =
      (lineage.length ? 0.4 : 0) +
      ((moduleMode.pageA.mixed || moduleMode.pageB.mixed) ? 0.3 : 0) +
      ((exportDrift.missingESM || exportDrift.missingCJS) ? 0.3 : 0);

    return Object.freeze({
      lineage,
      moduleMode,
      exportDrift,
      driftScore: Math.min(1, driftScore)
    });
  }

  // ---------------------------------------------------------------------------
  //  LOCAL ARTERY BUILDERS (per-event)
// ---------------------------------------------------------------------------
  _computeThroughput(bitLength, driftScore) {
    const sizeFactor = Math.min(1, bitLength / 50000);
    const raw = 1 - (sizeFactor * 0.5 + driftScore * 0.5);
    return Math.max(0, Math.min(1, raw));
  }

  _computePressure(bitLength, driftScore) {
    const raw = Math.min(1, (bitLength / 50000) * (0.5 + driftScore * 0.5));
    return Math.max(0, raw);
  }

  _computeCost(pressure, throughput) {
    const raw = pressure * (1 - throughput);
    return Math.max(0, Math.min(1, raw));
  }

  _computeBudget(throughput, cost) {
    const raw = throughput - cost;
    return Math.max(0, Math.min(1, raw));
  }

  _buildArtery(bitLength, driftScore) {
    const throughput = this._computeThroughput(bitLength, driftScore);
    const pressure   = this._computePressure(bitLength, driftScore);
    const cost       = this._computeCost(pressure, throughput);
    const budget     = this._computeBudget(throughput, cost);

    return Object.freeze({
      throughput,
      throughputBucket: _bucketLevel(throughput),

      pressure,
      pressureBucket: _bucketPressure(pressure),

      cost,
      costBucket: _bucketCost(cost),

      budget,
      budgetBucket: _bucketLevel(budget),

      driftScore,
      driftBucket: _bucketDrift(driftScore)
    });
  }

  // ---------------------------------------------------------------------------
  //  PACKET BUILDER
  // ---------------------------------------------------------------------------
  _buildPacket(event, binary, driftIntel, artery) {
    const { computeSurface, computeDeltaPacket } = this._getComputeContext();

    const ciMeta =
      computeSurface || computeDeltaPacket
        ? {
            triHeartId: this.triHeartId,
            computeSurface: computeSurface || null,
            computeDeltaPacket: computeDeltaPacket || null
          }
        : null;

    return Object.freeze({
      type: "pagescanner-event",
      source: this.id,
      bits: binary,
      bitLength: binary.length,
      timestamp: Date.now(),
      driftIntel,
      artery,
      meta: Object.freeze({
        eventType: event.type || "unknown",
        route: event.route || null,
        file: event.file || null,
        line: event.line || null,
        ci: ciMeta
      })
    });
  }

  // ---------------------------------------------------------------------------
  //  SHADOW LOGGER — non-blocking, non-recursive
  // ---------------------------------------------------------------------------
  _shadowLog(bits, meta) {
    if (!this.shadowLogger) return;
    try {
      this.shadowLogger.logRaw(bits, meta);
    } catch {
      // never break the organism
    }
  }

  // ---------------------------------------------------------------------------
  //  BEACON EMISSION — Overmind / Trust Mesh
  // ---------------------------------------------------------------------------
  _emitBeacon(packet) {
    if (!this.beacon) return;

    const severity =
      packet.driftIntel.driftScore >= 0.9 ? "critical" :
      packet.driftIntel.driftScore >= 0.7 ? "high" :
      packet.driftIntel.driftScore >= 0.4 ? "medium" :
      packet.driftIntel.driftScore > 0   ? "low" :
      "none";

    const beaconEvent = Object.freeze({
      eventType: "pagescanner-drift",
      severity,
      file: packet.meta.file,
      route: packet.meta.route,
      driftScore: packet.driftIntel.driftScore,
      driftBucket: _bucketDrift(packet.driftIntel.driftScore),
      lineageCount: packet.driftIntel.lineage.length,
      moduleMode: packet.driftIntel.moduleMode
    });

    try {
      this.beacon(beaconEvent);
    } catch {
      // never break the organism
    }
  }

  // ---------------------------------------------------------------------------
  //  CORE EVENT HANDLER
  // ---------------------------------------------------------------------------
  _handleScannerEvent(event) {
    const driftIntel = this._analyzeDrift(event);

    const json = JSON.stringify({ event, driftIntel });
    const binary = this.encoder.encode(json);

    // update window counters
    const now = Date.now();
    this._rollWindow(now);
    this._windowEvents += 1;
    this._windowBits += binary.length;
    this._totalEvents += 1;
    this._totalBits += binary.length;

    if (driftIntel.driftScore >= 0.7) {
      this._windowHighDrift += 1;
      this._totalHighDrift += 1;
    }

    const artery = this._buildArtery(binary.length, driftIntel.driftScore);
    const packet = this._buildPacket(event, binary, driftIntel, artery);

    // update window-safe artery snapshot
    this.scannerArtery.lastEventType = packet.meta.eventType;
    this.scannerArtery.lastFile = packet.meta.file;
    this.scannerArtery.lastRoute = packet.meta.route;
    this.scannerArtery.lastBits = packet.bitLength;
    this.scannerArtery.lastDriftScore = driftIntel.driftScore;
    this.scannerArtery.lastDriftBucket = artery.driftBucket;

    // refresh global artery snapshot
    this._computeScannerArtery();

    this._trace("event:received", {
      bitLength: packet.bitLength,
      eventType: packet.meta.eventType,
      driftScore: driftIntel.driftScore,
      artery
    });

    // optional beacon to Overmind / beacon mesh
    this._emitBeacon(packet);

    // shadow logger first
    this._shadowLog(binary, packet.meta);

    // primary logger
    this.logger?.logBinary?.(binary, {
      source: "pagescanner",
      eventType: packet.meta.eventType,
      file: packet.meta.file,
      route: packet.meta.route,
      driftScore: driftIntel.driftScore
    });

    // downstream binary-only propagation
    this.pipeline?.run?.(binary);
    this.reflex?.run?.(binary);
  }

  // ---------------------------------------------------------------------------
  //  INTERNAL TRACE
  // ---------------------------------------------------------------------------
  _trace(event, payload) {
    if (!this.trace) return;
    console.log(`[${this.id}#${this.instanceIndex}] ${event}`, payload);
  }
}

// ============================================================================
//  FACTORY
// ============================================================================
export function createAIBinaryPageScannerAdapter(config) {
  return new AIBinaryPageScannerAdapter(config);
}

/* c8 ignore next 10 */
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    PageScannerAdapterMeta,
    AIBinaryPageScannerAdapter,
    createAIBinaryPageScannerAdapter,
    prewarmPageScannerAdapter,
    getGlobalPageScannerArteries
  };
}
