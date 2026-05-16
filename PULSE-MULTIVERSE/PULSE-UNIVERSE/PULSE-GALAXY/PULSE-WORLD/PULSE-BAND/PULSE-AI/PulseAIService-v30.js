// ============================================================================
//  PULSE OS v30.0‑IMMORTAL-ADVANTAGE — AI SERVICE GATEWAY ORGAN
//  Universal Dual‑Band Entry Point • Safe Relay • Deterministic Execution
//  PURE RELAY. ZERO MUTATION. ZERO RANDOMNESS. ZERO DRIFT.
//  ORGANISM‑AWARE • RELAY ARTERY v6 • OWNER‑SUBORDINATE • SIGNAL‑AWARE
// ============================================================================

// ============================================================================
//  META — Service Gateway (v30 IMMORTAL-ADVANTAGE)
// ============================================================================

export const ServiceGatewayMeta = Object.freeze({
  type: "Cognitive",
  subsystem: "aiServiceGateway",
  layer: "C4-ServiceRelay",
  role: "AI_SERVICE_GATEWAY",
  version: "30.0-IMMORTAL-ADVANTAGE",
  identity: "aiServiceGateway-v30-IMMORTAL-ADVANTAGE",

  evo: Object.freeze({
    deterministic: true,
    driftProof: true,
    dualband: true,
    binaryAware: true,
    symbolicAware: true,
    relayArteryAware: true,
    organismAware: true,
    juryAware: true,
    trustAware: true,
    advantageAware: true,
    multiInstanceReady: true,
    epoch: "30.0-IMMORTAL-ADVANTAGE"
  }),

  contract: Object.freeze({
    purpose:
      "Act as the universal, deterministic relay for AI services, tracking relay load, errors, slowdown, and organism pressure via a relay artery.",
    never: Object.freeze([
      "mutate external systems",
      "introduce randomness",
      "bypass EgoCore",
      "bypass JuryFrame",
      "bypass TrustFabric",
      "perform raw network I/O",
      "modify caller payloads in-place"
    ]),
    always: Object.freeze([
      "remain pure relay logic",
      "emit relay artery snapshots",
      "respect organism vitals",
      "respect owner/ego decisions",
      "stay deterministic under load"
    ])
  })
});

// ============================================================================
//  IMPORTS — Binary Engine + Tools
// ============================================================================

import { runAI } from "./PulseAIEngine-v24.js";
import {
  analyzeFirestoreDoc,
  analyzeSQLSchema,
  detectDrift,
  detectSlowdownPatterns,
  validatePulseSchema
} from "./PulseAITools-v30.js";

// ============================================================================
//  GLOBAL HANDLE (v30 IMMORTAL, environment-agnostic)
// ============================================================================

const G =
  (typeof window !== "undefined" && window) ||
  (typeof globalThis !== "undefined" && globalThis) ||
  (typeof self !== "undefined" && self) ||
  (typeof global !== "undefined" && global) ||
  {};
const g = G;

// ============================================================================
//  GLOBAL RELAY ARTERY REGISTRY — v30 IMMORTAL‑ADVANTAGE
// ============================================================================

const _globalRelayArteryRegistry = new Map();
/**
 * Registry key: `${id}#${instanceIndex}`
 */
function _registryKey(id, instanceIndex) {
  return `${id || ServiceGatewayMeta.identity}#${instanceIndex}`;
}

export function getGlobalRelayArteries() {
  const out = {};
  for (const [k, v] of _globalRelayArteryRegistry.entries()) {
    out[k] = v;
  }
  return out;
}

// ============================================================================
//  SIGNAL‑AWARE TRACE LAYER (optional, non‑fatal)
// ============================================================================

function traceGatewayEvent(event, payload, traceFlag) {
  if (!traceFlag) return;

  const message = `[AiServiceGateway] ${event}`;

  const s = g.PulseProofSignal;
  if (s && typeof s.signal === "function") {
    s.signal({
      level: "info",
      subsystem: "service-gateway",
      message,
      extra: payload || {},
      system: ServiceGatewayMeta.role,
      organ: ServiceGatewayMeta.identity,
      layer: ServiceGatewayMeta.layer,
      band: "dual"
    });
    return;
  }

  console.log(message, payload);
}

// ============================================================================
//  RELAY ARTERY HELPERS — v6
// ============================================================================

function relayBucketLevel(v) {
  if (v >= 0.9) return "elite";
  if (v >= 0.75) return "high";
  if (v >= 0.5) return "medium";
  if (v >= 0.25) return "low";
  return "critical";
}

function relayBucketPressure(v) {
  if (v >= 0.9) return "overload";
  if (v >= 0.7) return "high";
  if (v >= 0.4) return "medium";
  if (v > 0) return "low";
  return "none";
}

function relayBucketCost(v) {
  if (v >= 0.8) return "heavy";
  if (v >= 0.5) return "moderate";
  if (v >= 0.2) return "light";
  if (v > 0) return "negligible";
  return "none";
}

function clamp01(v) {
  const n = typeof v === "number" ? v : 0;
  if (n <= 0) return 0;
  if (n >= 1) return 1;
  return n;
}

function safePressure(source) {
  return clamp01(source?.pressure ?? 0);
}

// ============================================================================
//  RELAY ARTERY v6 — Organism‑Aware + Advantage‑Aware Fusion
// ============================================================================

function computeRelayArteryV6({
  calls,
  errors,
  slowCalls,
  windowMs,
  instanceIndex,
  instanceCount,
  heartbeat,
  earn,
  genome,
  governor,
  watchdog,
  cortex,
  memory,
  safety,
  jury,
  trust,
  advantage
}) {
  const total = calls.total;
  const window = calls.window;
  const errorRate = window > 0 ? clamp01(errors.window / window) : 0;
  const slowRate = window > 0 ? clamp01(slowCalls.window / window) : 0;

  const callsPerMs = window / Math.max(1, calls.elapsedMs);
  const callsPerSec = callsPerMs * 1000;

  const harmonicLoad =
    instanceCount > 0 ? callsPerSec / instanceCount : callsPerSec;

  const loadFactor = clamp01(harmonicLoad / 128);

  const heartbeatPressure = safePressure(heartbeat);
  const earnPressure = safePressure(earn);
  const genomePressure = safePressure(genome);
  const governorPressure = safePressure(governor);
  const watchdogPressure = safePressure(watchdog);
  const cortexPressure = safePressure(cortex);
  const memoryPressure = safePressure(memory);
  const safetyPressure = safePressure(safety);

  const juryPressure = clamp01(jury?.pressure ?? 0);
  const trustAnomaly = clamp01(trust?.anomalyScore ?? 0);
  const trustHoneypot = clamp01(trust?.honeypotRisk ?? 0);
  const trustDominance = clamp01(trust?.dominanceRisk ?? 0);

  const meshPressure = clamp01(advantage?.meshPressureIndex ?? 0);
  const proxyPressure = clamp01(advantage?.proxyPressure ?? 0);

  const organismPressure =
    (heartbeatPressure +
      earnPressure +
      genomePressure +
      governorPressure +
      watchdogPressure +
      cortexPressure +
      memoryPressure +
      safetyPressure) / 8;

  const trustPressureBoost = Math.max(trustAnomaly, trustHoneypot, trustDominance);
  const advantagePressureBoost = Math.max(meshPressure, proxyPressure);

  const pressure = clamp01(
    loadFactor * 0.35 +
      errorRate * 0.2 +
      slowRate * 0.15 +
      organismPressure * 0.15 +
      juryPressure * 0.1 +
      trustPressureBoost * 0.03 +
      advantagePressureBoost * 0.02
  );

  const throughput = clamp01(1 - pressure);
  const cost = clamp01(pressure * (1 - throughput));
  const budget = clamp01(throughput - cost);

  return Object.freeze({
    meta: {
      identity: ServiceGatewayMeta.identity,
      version: ServiceGatewayMeta.version,
      epoch: ServiceGatewayMeta.evo.epoch,
      instanceIndex,
      instanceCount,
      windowMs,
      timestamp: Date.now()
    },

    calls: {
      total,
      window,
      callsPerSec,
      harmonicLoad
    },

    errors: {
      total: errors.total,
      window: errors.window,
      errorRate
    },

    slow: {
      window: slowCalls.window,
      slowRate
    },

    organism: {
      heartbeat,
      earn,
      genome,
      governor,
      watchdog,
      cortex,
      memory,
      safety
    },

    jury: jury || null,
    trust: trust || null,
    advantage: advantage || null,

    throughput,
    pressure,
    cost,
    budget,

    throughputBucket: relayBucketLevel(throughput),
    pressureBucket: relayBucketPressure(pressure),
    costBucket: relayBucketCost(cost),
    budgetBucket: relayBucketLevel(budget)
  });
}

// ============================================================================
//  SERVICE GATEWAY CORE — v30.0‑IMMORTAL‑ADVANTAGE
// ============================================================================

class AiServiceGatewayCore {
  /**
   * CONFIG INTENT:
   *   id, trace, scribe
   *   windowMs, slowThresholdMs
   *
   *   vitals providers (optional, read-only):
   *     heartbeatProvider  → () => { pressure?: number, ... }
   *     earnProvider       → () => { pressure?: number, ... }
   *     genomeProvider     → () => { pressure?: number, ... }
   *     governorProvider   → () => { pressure?: number, ... }
   *     watchdogProvider   → () => { pressure?: number, ... }
   *     cortexProvider     → () => { pressure?: number, ... }
   *     memoryProvider     → () => { pressure?: number, ... }
   *     safetyProvider     → () => { pressure?: number, ... }
   *     juryProvider       → () => { pressure?: number, ... }
   *     trustProvider      → () => { anomalyScore?: number, ... }
   *     advantageProvider  → () => { meshPressureIndex?: number, ... }
   */
  constructor(config = {}) {
    this.id = config.id || ServiceGatewayMeta.identity;
    this.trace = !!config.trace;
    this.scribe = config.scribe || null;

    this.windowMs =
      typeof config.windowMs === "number" && config.windowMs > 0
        ? config.windowMs
        : 60000;

    this._windowStart = Date.now();
    this._windowCalls = 0;
    this._windowErrors = 0;
    this._windowSlowCalls = 0;
    this._totalCalls = 0;
    this._totalErrors = 0;

    this._slowThresholdMs =
      typeof config.slowThresholdMs === "number" && config.slowThresholdMs > 0
        ? config.slowThresholdMs
        : 1500;

    this.instanceIndex = AiServiceGatewayCore._registerInstance();

    // organism vitals providers (read-only)
    this.heartbeatProvider = config.heartbeatProvider || null;
    this.earnProvider = config.earnProvider || null;
    this.genomeProvider = config.genomeProvider || null;
    this.governorProvider = config.governorProvider || null;
    this.watchdogProvider = config.watchdogProvider || null;
    this.cortexProvider = config.cortexProvider || null;
    this.memoryProvider = config.memoryProvider || null;
    this.safetyProvider = config.safetyProvider || null;

    // v30+: jury / trust / advantage providers
    this.juryProvider = config.juryProvider || null;
    this.trustProvider = config.trustProvider || null;
    this.advantageProvider = config.advantageProvider || null;
  }

  // ---------------------------------------------------------
  //  STATIC INSTANCE REGISTRY
  // ---------------------------------------------------------
  static _registerInstance() {
    if (typeof AiServiceGatewayCore._instanceCount !== "number") {
      AiServiceGatewayCore._instanceCount = 0;
    }
    const index = AiServiceGatewayCore._instanceCount;
    AiServiceGatewayCore._instanceCount += 1;
    return index;
  }

  static getInstanceCount() {
    return typeof AiServiceGatewayCore._instanceCount === "number"
      ? AiServiceGatewayCore._instanceCount
      : 0;
  }

  // ---------------------------------------------------------
  //  WINDOW ROLLING
  // ---------------------------------------------------------
  _rollWindow(now) {
    if (now - this._windowStart >= this.windowMs) {
      this._windowStart = now;
      this._windowCalls = 0;
      this._windowErrors = 0;
      this._windowSlowCalls = 0;
    }
  }

  // ---------------------------------------------------------
  //  VITALS READERS (SAFE, READ‑ONLY)
// ---------------------------------------------------------
  _readVitals(provider) {
    if (!provider) return null;
    try {
      return provider() || null;
    } catch {
      return null;
    }
  }

  // ---------------------------------------------------------
  //  RELAY ARTERY SNAPSHOT
  // ---------------------------------------------------------
  _computeRelayArtery() {
    const now = Date.now();
    this._rollWindow(now);

    const elapsedMs = Math.max(1, now - this._windowStart);

    const artery = computeRelayArteryV6({
      calls: {
        total: this._totalCalls,
        window: this._windowCalls,
        elapsedMs
      },
      errors: {
        total: this._totalErrors,
        window: this._windowErrors
      },
      slowCalls: {
        window: this._windowSlowCalls
      },
      windowMs: this.windowMs,
      instanceIndex: this.instanceIndex,
      instanceCount: AiServiceGatewayCore.getInstanceCount(),

      heartbeat: this._readVitals(this.heartbeatProvider),
      earn: this._readVitals(this.earnProvider),
      genome: this._readVitals(this.genomeProvider),
      governor: this._readVitals(this.governorProvider),
      watchdog: this._readVitals(this.watchdogProvider),
      cortex: this._readVitals(this.cortexProvider),
      memory: this._readVitals(this.memoryProvider),
      safety: this._readVitals(this.safetyProvider),

      jury: this._readVitals(this.juryProvider),
      trust: this._readVitals(this.trustProvider),
      advantage: this._readVitals(this.advantageProvider)
    });

    const key = _registryKey(this.id, this.instanceIndex);
    _globalRelayArteryRegistry.set(key, artery);

    traceGatewayEvent("relayArterySnapshot", artery, this.trace);
    return artery;
  }

  getRelayArtery() {
    return this._computeRelayArtery();
  }

  // ---------------------------------------------------------
  //  RELAY WRAPPER (NON-BLOCKING, MONITORED)
// ---------------------------------------------------------
  async relay(intent, flags, operation, request = {}, dualBand = null) {
    const start = Date.now();

    try {
      const result = await runAI(
        Object.freeze({
          ...request,
          intent,
          ...flags
        }),
        operation,
        request.deps || {},
        dualBand
      );

      const duration = Date.now() - start;

      this._recordCall(duration, false);
      const artery = this._computeRelayArtery();

      if (
        artery.pressureBucket === "overload" ||
        artery.budgetBucket === "critical"
      ) {
        this._logSpiralWarning(intent, flags, artery);
      }

      traceGatewayEvent(
        "relay:success",
        { intent, flags, durationMs: duration, artery },
        this.trace
      );

      return result;
    } catch (e) {
      const duration = Date.now() - start;

      this._recordCall(duration, true);
      const artery = this._computeRelayArtery();

      traceGatewayEvent(
        "relay:error",
        {
          intent,
          flags,
          durationMs: duration,
          error: String(e && e.message ? e.message : e),
          artery
        },
        this.trace
      );

      if (
        artery.pressureBucket === "overload" ||
        artery.budgetBucket === "critical"
      ) {
        this._logSpiralWarning(intent, flags, artery, true);
      }

      throw e;
    }
  }

  _recordCall(durationMs, isError) {
    const now = Date.now();
    this._rollWindow(now);

    this._totalCalls += 1;
    this._windowCalls += 1;

    if (isError) {
      this._totalErrors += 1;
      this._windowErrors += 1;
    }

    if (durationMs >= this._slowThresholdMs) {
      this._windowSlowCalls += 1;
    }
  }

  _logSpiralWarning(intent, flags, artery, isError = false) {
    const payload = {
      intent,
      flags,
      isError,
      artery
    };

    traceGatewayEvent("relay:spiral-warning", payload, this.trace);

    try {
      this.scribe?.logSafety?.({
        type: "relay-spiral-warning",
        severity: "warn",
        payload
      });
    } catch {
      // best-effort only
    }
  }
}

// ============================================================================
//  INTERNAL GATEWAY INSTANCE — v30.0‑IMMORTAL‑ADVANTAGE
// ============================================================================

const _gatewayCore = new AiServiceGatewayCore({ trace: false });

function callAI(intent, flags, operation, request = {}, dualBand = null) {
  return _gatewayCore.relay(intent, flags, operation, request, dualBand);
}

export function getServiceRelayArtery() {
  return _gatewayCore.getRelayArtery();
}

export function prewarmServiceRelay(iterations = 3) {
  // deterministic prewarm: synth calls that only touch counters/artery
  const count = Math.max(1, Math.min(10, iterations));
  const ops = [];
  for (let i = 0; i < count; i++) {
    ops.push(
      callAI(
        "prewarm",
        Object.freeze({ prewarm: true }),
        async () => Object.freeze({ ok: true, i }),
        {},
        null
      ).catch(() => null)
    );
  }
  return Promise.all(ops).then(() => getServiceRelayArtery());
}

// ============================================================================
//  PUBLIC SERVICE OPERATIONS — API‑COMPATIBLE, INTERNALLY UPGRADED
// ============================================================================

export async function runAnalyzeFirestore(
  docData,
  request = {},
  dualBand = null
) {
  return callAI(
    "analyze",
    Object.freeze({ touchesSchemas: true }),
    async (context) => {
      const pulseSchema = analyzeFirestoreDoc(context, docData);
      detectSlowdownPatterns(context, docData);
      return pulseSchema;
    },
    request,
    dualBand
  );
}

export async function runAnalyzeSQL(sqlSchema, request = {}, dualBand = null) {
  return callAI(
    "analyze",
    Object.freeze({ touchesSchemas: true }),
    async (context) => {
      const pulseSchema = analyzeSQLSchema(context, sqlSchema);
      detectSlowdownPatterns(context, sqlSchema);
      return pulseSchema;
    },
    request,
    dualBand
  );
}

export async function runDetectDrift(
  pulseSchema,
  firestoreSchema,
  request = {},
  dualBand = null
) {
  return callAI(
    "analyze",
    Object.freeze({ touchesSchemas: true }),
    async (context) => {
      const drift = detectDrift(context, pulseSchema, firestoreSchema);
      return Object.freeze({ drift });
    },
    request,
    dualBand
  );
}

export async function runValidatePulse(
  pulseSchema,
  request = {},
  dualBand = null
) {
  return callAI(
    "analyze",
    Object.freeze({ touchesSchemas: true }),
    async (context) => {
      validatePulseSchema(context, pulseSchema);
      return Object.freeze({
        valid: context.diagnostics.mismatches.length === 0
      });
    },
    request,
    dualBand
  );
}

export async function runFullAudit(
  pulseSchema,
  firestoreDoc,
  request = {},
  dualBand = null
) {
  return callAI(
    "analyze",
    Object.freeze({ touchesSchemas: true }),
    async (context) => {
      context.logStep?.("Starting full audit...");

      const fsPulse = analyzeFirestoreDoc(context, firestoreDoc);
      validatePulseSchema(context, pulseSchema);
      detectDrift(context, pulseSchema, fsPulse);
      detectSlowdownPatterns(context, firestoreDoc);

      context.logStep?.("Full audit completed.");

      return Object.freeze({
        pulseFromFirestore: fsPulse,
        driftDetected: context.diagnostics.driftDetected,
        mismatches: context.diagnostics.mismatches,
        missingFields: context.diagnostics.missingFields,
        slowdownCauses: context.diagnostics.slowdownCauses
      });
    },
    request,
    dualBand
  );
}

export async function runAnalyzeRoutes(
  routeData,
  request = {},
  dualBand = null
) {
  return callAI(
    "analyze",
    Object.freeze({ touchesRoutes: true }),
    async (context) => {
      context.logStep?.("Analyzing routing decisions...");
      return Object.freeze({ routeData });
    },
    request,
    dualBand
  );
}

export async function runAnalyzeLogs(logs, request = {}, dualBand = null) {
  return callAI(
    "analyze",
    Object.freeze({ touchesLogs: true }),
    async (context) => {
      context.logStep?.("Analyzing logs...");
      return Object.freeze({ logs });
    },
    request,
    dualBand
  );
}

export async function runAnalyzeErrors(
  errors,
  request = {},
  dualBand = null
) {
  return callAI(
    "analyze",
    Object.freeze({ touchesErrors: true }),
    async (context) => {
      context.logStep?.("Analyzing errors...");
      return Object.freeze({ errors });
    },
    request,
    dualBand
  );
}

export async function runExplainOrgan(
  organMeta,
  request = {},
  dualBand = null
) {
  return callAI(
    "explain",
    Object.freeze({ touchesArchitecture: true }),
    async (context) => {
      context.logStep?.("Explaining organ...");
      return Object.freeze({ organMeta });
    },
    request,
    dualBand
  );
}

export async function runExplainPathway(
  pathway,
  request = {},
  dualBand = null
) {
  return callAI(
    "explain",
    Object.freeze({ touchesArchitecture: true }),
    async (context) => {
      context.logStep?.("Explaining pathway...");
      return Object.freeze({ pathway });
    },
    request,
    dualBand
  );
}

export async function runTourGuideQuery(
  query,
  request = {},
  dualBand = null
) {
  return callAI(
    "analyze",
    Object.freeze({ touchesTourism: true }),
    async (context) => {
      context.logStep?.("Running tour guide query...");
      return Object.freeze({ query });
    },
    request,
    dualBand
  );
}

// ============================================================================
//  DUAL‑MODE EXPORTS (ESM + CommonJS)
// ============================================================================

if (typeof module !== "undefined") {
  module.exports = {
    ServiceGatewayMeta,
    getGlobalRelayArteries,
    getServiceRelayArtery,
    prewarmServiceRelay,
    runAnalyzeFirestore,
    runAnalyzeSQL,
    runDetectDrift,
    runValidatePulse,
    runFullAudit,
    runAnalyzeRoutes,
    runAnalyzeLogs,
    runAnalyzeErrors,
    runExplainOrgan,
    runExplainPathway,
    runTourGuideQuery
  };
}
