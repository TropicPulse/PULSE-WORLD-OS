// ============================================================================
// PulseWorldEndpoint-v30-IMMORTAL-FINALITY.js
// ============================================================================
// CENTRAL NERVOUS ENDPOINT FOR PULSE ARCHITECTURE — v30 IMMORTAL
// ----------------------------------------------------------------------------
//  • Single canonical endpoint for CNS, CheckBand, PulseNet, Transport, PulseBand
//  • Deterministic, chunk-aware, cache-aware, prewarmable, pulse-aware, versioned
//  • v30: bandFamily / dnaTag / meshTag aware, Finality via PulseSignalPort
// ============================================================================

import { PulseProofSignal } from "../../PULSE-MULTIVERSE/PULSEWORLD/X-PULSE-X/PULSE-WORLD-SIGNAL.js";
import { PulseSignalPort } from "../../PULSE-MULTIVERSE/PULSE-UNIVERSE/PULSE-GALAXY/PULSE-WORLD/PULSE-FINALITY/PULSE-FINALITY-PORT.js";

// ----------------------------------------------------------------------------
// SIGNAL INTEGRATION
// ----------------------------------------------------------------------------

const EndpointSignal =
  (typeof PulseProofSignal === "function" &&
    PulseProofSignal.for?.("PulseWorldEndpoint-v30")) ||
  (typeof PulseProofSignal === "function" &&
    new PulseProofSignal("PulseWorldEndpoint-v30")) ||
  null;

const EndpointFinalityPort =
  (typeof PulseSignalPort === "function" &&
    (PulseSignalPort.for?.("PulseWorldEndpoint-v30") ||
      new PulseSignalPort("PulseWorldEndpoint-v30"))) ||
  null;

function emitSignal(event, payload) {
  try {
    if (!EndpointSignal) return;
    if (typeof EndpointSignal.emit === "function") {
      EndpointSignal.emit(event, payload);
    } else if (typeof EndpointSignal.dispatch === "function") {
      EndpointSignal.dispatch(event, payload);
    }
  } catch {
    // endpoint must never crash from telemetry
  }
}

function emitFinality(event, payload) {
  try {
    if (!EndpointFinalityPort) return;
    if (typeof EndpointFinalityPort.emit === "function") {
      EndpointFinalityPort.emit(event, payload);
    } else if (typeof EndpointFinalityPort.dispatch === "function") {
      EndpointFinalityPort.dispatch(event, payload);
    }
  } catch {
    // never crash
  }
}

// ----------------------------------------------------------------------------
// BAND MODEL (v30)
// ----------------------------------------------------------------------------

const BAND_FAMILY = {
  PULSEBAND: "pulseband",
  MESHBAND: "meshband"
};

function normalizeBandId(bandId) {
  const v = (bandId || "symbolic").toString().toLowerCase();
  if (v === "binary") return "binary";
  if (v === "dual") return "dual";
  if (v === "mesh") return "mesh";
  return "symbolic";
}

function normalizeBandFamily(family) {
  const v = (family || BAND_FAMILY.PULSEBAND).toString().toLowerCase();
  if (v === BAND_FAMILY.MESHBAND) return BAND_FAMILY.MESHBAND;
  return BAND_FAMILY.PULSEBAND;
}

function resolveBandFromRoute(route, payload) {
  const p = payload || route?.payload || {};
  const band =
    p.__band ||
    p.band ||
    p.bandId ||
    route?.band ||
    route?.bandId ||
    "symbolic";
  return normalizeBandId(band);
}

function resolveBandFamilyFromRoute(route, payload) {
  const p = payload || route?.payload || {};
  const family =
    p.__bandFamily ||
    p.bandFamily ||
    route?.bandFamily ||
    BAND_FAMILY.PULSEBAND;
  return normalizeBandFamily(family);
}

function resolveDnaTagFromRoute(route, payload) {
  const p = payload || route?.payload || {};
  return (
    p.__dnaTag ||
    p.dnaTag ||
    route?.dnaTag ||
    null
  );
}

function resolveMeshTagFromRoute(route, payload) {
  const p = payload || route?.payload || {};
  return (
    p.__meshTag ||
    p.meshTag ||
    route?.meshTag ||
    null
  );
}

// ----------------------------------------------------------------------------
// STATE
// ----------------------------------------------------------------------------

const bandCache = new Map();
const chunkBuffer = new Map();

const endpointMetrics = {
  totalCalls: 0,
  totalErrors: 0,
  avgLatencyMs: 0,
  lastLatencyMs: 0,
  lastType: null,
  lastError: null
};

const speedBoosts = new Map();
let prewarmed = false;

// ----------------------------------------------------------------------------
// UTILS
// ----------------------------------------------------------------------------

function nowMs() {
  return Date.now();
}

function safeJsonClone(value) {
  try {
    return JSON.parse(JSON.stringify(value));
  } catch {
    return null;
  }
}

function recordLatency(type, durationMs, error = null, routeMeta = null) {
  endpointMetrics.totalCalls++;
  endpointMetrics.lastLatencyMs = durationMs;
  endpointMetrics.lastType = type;

  if (error) {
    endpointMetrics.totalErrors++;
    endpointMetrics.lastError = String(error);
  }

  const n = endpointMetrics.totalCalls;
  const prevAvg = endpointMetrics.avgLatencyMs;
  endpointMetrics.avgLatencyMs = prevAvg + (durationMs - prevAvg) / n;

  const snapshot = { ...endpointMetrics };

  const meta = {
    type,
    durationMs,
    error: error ? String(error) : null,
    snapshot,
    routeMeta: routeMeta || null
  };

  emitSignal("endpoint.metrics", meta);
  emitFinality("endpoint.metrics", meta);
}

function getBandState(bandId = "symbolic") {
  const key = normalizeBandId(bandId);
  if (!bandCache.has(key)) {
    bandCache.set(key, {
      bandId: key,
      lastCheckBand: null,
      lastVitals: null,
      lastPulseBandSample: null,
      lastUpdatedAt: 0,
      speedBoost: 1.0,
      speedBoostReason: "neutral",
      speedBoostExpiresAt: 0,
      authoritativeBand: null,
      bandFamily: BAND_FAMILY.PULSEBAND,
      dnaTag: null,
      meshTag: null
    });
  }
  return bandCache.get(key);
}

function applySpeedBoost(bandId, boost, reason, ttlMs = 30_000) {
  const key = normalizeBandId(bandId);
  const expiresAt = nowMs() + ttlMs;

  const entry = {
    bandId: key,
    boost: typeof boost === "number" && boost > 0 ? boost : 1.0,
    reason: reason || "unspecified",
    expiresAt
  };

  speedBoosts.set(key, entry);

  const state = getBandState(key);
  state.speedBoost = entry.boost;
  state.speedBoostReason = entry.reason;
  state.speedBoostExpiresAt = expiresAt;

  emitSignal("band.speedBoost", { bandId: key, entry });
  emitFinality("band.speedBoost", { bandId: key, entry });

  return entry;
}

function getEffectiveSpeedBoost(bandId) {
  const key = normalizeBandId(bandId);
  const entry = speedBoosts.get(key);
  const now = nowMs();

  if (!entry || entry.expiresAt <= now) {
    speedBoosts.delete(key);
    const state = getBandState(key);
    state.speedBoost = 1.0;
    state.speedBoostReason = "neutral";
    state.speedBoostExpiresAt = 0;
    const neutral = {
      bandId: key,
      boost: 1.0,
      reason: "neutral",
      expiresAt: 0
    };
    emitFinality("band.speedBoost.expired", { bandId: key, entry: neutral });
    return neutral;
  }

  const state = getBandState(key);
  state.speedBoost = entry.boost;
  state.speedBoostReason = entry.reason;
  state.speedBoostExpiresAt = entry.expiresAt;

  return entry;
}

// ----------------------------------------------------------------------------
// v30 CHUNK PIPELINE (same semantics as v27++, finality-aware)
// ----------------------------------------------------------------------------

function handleChunkedPayloadV30(chunkMeta) {
  const { chunkId, chunkIndex, totalChunks, data, isJson } = chunkMeta || {};
  if (!chunkId || typeof totalChunks !== "number") {
    return { complete: true, payload: chunkMeta }; // not chunked
  }

  if (!chunkBuffer.has(chunkId)) {
    chunkBuffer.set(chunkId, {
      totalChunks,
      received: new Array(totalChunks).fill(null),
      receivedCount: 0,
      isJson: !!isJson
    });
  }

  const entry = chunkBuffer.get(chunkId);

  if (
    typeof chunkIndex === "number" &&
    chunkIndex >= 0 &&
    chunkIndex < entry.totalChunks &&
    entry.received[chunkIndex] == null
  ) {
    entry.received[chunkIndex] = data;
    entry.receivedCount++;
  }

  if (entry.receivedCount < entry.totalChunks) {
    const partial = {
      chunkId,
      chunkIndex,
      totalChunks,
      receivedCount: entry.receivedCount
    };

    emitSignal("endpoint.chunk.partial", partial);
    emitFinality("endpoint.chunk.partial", partial);

    return { complete: false };
  }

  let assembled;
  if (entry.isJson) {
    assembled = entry.received.join("");
    try {
      assembled = JSON.parse(assembled);
    } catch {
      // leave as string if parse fails
    }
  } else {
    assembled = entry.received.join("");
  }

  chunkBuffer.delete(chunkId);

  const complete = {
    chunkId,
    totalChunks: entry.totalChunks,
    isJson: entry.isJson
  };

  emitSignal("endpoint.chunk.complete", complete);
  emitFinality("endpoint.chunk.complete", complete);

  return { complete: true, payload: assembled };
}

// ----------------------------------------------------------------------------
// HANDLERS (v30, band-aware)
// ----------------------------------------------------------------------------

async function handleCheckBand(payload, route) {
  const bandId = normalizeBandId(
    payload?.bandId || payload?.band || route?.bandId || route?.band
  );
  const bandFamily = resolveBandFamilyFromRoute(route, payload);
  const dnaTag = resolveDnaTagFromRoute(route, payload);
  const meshTag = resolveMeshTagFromRoute(route, payload);

  const state = getBandState(bandId);

  state.lastCheckBand = safeJsonClone(payload);
  state.lastUpdatedAt = nowMs();
  state.bandFamily = bandFamily;
  state.dnaTag = dnaTag;
  state.meshTag = meshTag;

  const stability = payload?.stabilityScore ?? 100;
  let boost = 1.0;
  let reason = "neutral";

  if (stability >= 95) {
    boost = 1.15;
    reason = "high-stability-band";
  } else if (stability <= 60) {
    boost = 0.9;
    reason = "unstable-band";
  }

  const boostEntry = applySpeedBoost(bandId, boost, reason, 45_000);
  state.authoritativeBand = payload;

  const result = {
    ok: true,
    type: "CheckBandResult",
    bandId,
    bandFamily,
    dnaTag,
    meshTag,
    stability,
    speedBoost: boostEntry,
    authoritativeBand: state.authoritativeBand,
    meta: {
      source: "PulseWorldEndpoint.CheckBand",
      version: 30
    }
  };

  emitSignal("band.check", { bandId, bandFamily, stability, result });
  emitFinality("band.check", { bandId, bandFamily, stability, result });

  return result;
}

async function handleVitalsSample(payload, route) {
  const bandId = normalizeBandId(
    payload?.bandId || payload?.network?.band || route?.bandId || route?.band
  );
  const bandFamily = resolveBandFamilyFromRoute(route, payload);
  const dnaTag = resolveDnaTagFromRoute(route, payload);
  const meshTag = resolveMeshTagFromRoute(route, payload);

  const state = getBandState(bandId);

  state.lastVitals = safeJsonClone(payload);
  state.lastUpdatedAt = nowMs();
  state.bandFamily = bandFamily;
  state.dnaTag = dnaTag;
  state.meshTag = meshTag;

  const latencyMs = payload?.latencyMs ?? payload?.latency?.ms ?? 50;
  const stability = payload?.stabilityScore ?? payload?.stability?.score ?? 100;

  let baseAdvantage = 1.0;
  if (latencyMs < 40 && stability > 90) baseAdvantage = 1.4;
  else if (latencyMs < 80 && stability > 75) baseAdvantage = 1.2;
  else if (latencyMs > 200 || stability < 50) baseAdvantage = 0.85;

  const boostEntry = getEffectiveSpeedBoost(bandId);
  const effectiveAdvantage = baseAdvantage * boostEntry.boost;

  state.lastPulseBandSample = {
    latencyMs,
    stability,
    baseAdvantage,
    effectiveAdvantage
  };

  const result = {
    ok: true,
    type: "VitalsTuningResult",
    bandId,
    bandFamily,
    dnaTag,
    meshTag,
    suggestedAdvantage: effectiveAdvantage,
    baseAdvantage,
    speedBoost: boostEntry,
    meta: {
      source: "PulseWorldEndpoint.VitalsSample",
      version: 30
    }
  };

  emitSignal("band.vitals", {
    bandId,
    bandFamily,
    latencyMs,
    stability,
    baseAdvantage,
    effectiveAdvantage,
    result
  });

  emitFinality("band.vitals", {
    bandId,
    bandFamily,
    latencyMs,
    stability,
    baseAdvantage,
    effectiveAdvantage,
    result
  });

  return result;
}

async function handlePulseNetRoute(payload, route) {
  const kind = payload?.kind || payload?.channel || route?.channel || "unknown";
  const bandId = normalizeBandId(
    payload?.band || payload?.bandId || route?.band || route?.bandId
  );
  const bandFamily = resolveBandFamilyFromRoute(route, payload);
  const dnaTag = resolveDnaTagFromRoute(route, payload);
  const meshTag = resolveMeshTagFromRoute(route, payload);

  const result = {
    ok: true,
    type: "PulseNetAck",
    kind,
    bandId,
    bandFamily,
    dnaTag,
    meshTag,
    receivedAt: nowMs(),
    meta: {
      source: "PulseWorldEndpoint.PulseNetRoute",
      version: 30
    }
  };

  emitSignal("pulsenet.route", { bandId, bandFamily, kind, payload, result });
  emitFinality("pulsenet.route", { bandId, bandFamily, kind, payload, result });

  return result;
}

async function handleCheckRouterMemory(payload, route) {
  const logs = Array.isArray(payload?.logs) ? payload.logs : [];

  const result = {
    ok: true,
    type: "RouterMemoryHealResult",
    logsCount: logs.length,
    suggestions: [],
    meta: {
      source: "PulseWorldEndpoint.CheckRouterMemory",
      version: 30
    }
  };

  emitSignal("router.memory.check", { logsCount: logs.length, result });
  emitFinality("router.memory.check", { logsCount: logs.length, result });

  return result;
}

async function handleRouteDownAlert(payload, route) {
  const { error, type } = payload || {};

  const result = {
    ok: true,
    type: "RouteDownAck",
    routeType: type || "unknown",
    error: String(error || "unknown"),
    meta: {
      source: "PulseWorldEndpoint.RouteDownAlert",
      version: 30
    }
  };

  emitSignal("route.down", { payload, result });
  emitFinality("route.down", { payload, result });

  return result;
}

async function handlePulseBandMetrics(payload, route) {
  const bandId = normalizeBandId(
    payload?.bandId || payload?.network?.band || route?.bandId || route?.band
  );
  const bandFamily = resolveBandFamilyFromRoute(route, payload);
  const dnaTag = resolveDnaTagFromRoute(route, payload);
  const meshTag = resolveMeshTagFromRoute(route, payload);

  const state = getBandState(bandId);

  state.lastPulseBandSample = safeJsonClone(payload);
  state.lastUpdatedAt = nowMs();
  state.bandFamily = bandFamily;
  state.dnaTag = dnaTag;
  state.meshTag = meshTag;

  const boostEntry = getEffectiveSpeedBoost(bandId);

  const result = {
    ok: true,
    type: "PulseBandMetricsAck",
    bandId,
    bandFamily,
    dnaTag,
    meshTag,
    speedBoost: boostEntry,
    meta: {
      source: "PulseWorldEndpoint.PulseBandMetrics",
      version: 30
    }
  };

  emitSignal("band.metrics", { bandId, bandFamily, payload, result });
  emitFinality("band.metrics", { bandId, bandFamily, payload, result });

  return result;
}

async function handleExpansionRoute(payload, route) {
  const channel = payload?.channel || payload?.kind || route?.channel || "internet";
  const routeEcho = payload?.route ?? payload;

  const bandId = resolveBandFromRoute(route, payload);
  const bandFamily = resolveBandFamilyFromRoute(route, payload);
  const dnaTag = resolveDnaTagFromRoute(route, payload);
  const meshTag = resolveMeshTagFromRoute(route, payload);

  const result = {
    ok: true,
    type: "ExpansionAck",
    channel,
    bandId,
    bandFamily,
    dnaTag,
    meshTag,
    routeEcho,
    meta: {
      source: "PulseWorldEndpoint.ExpansionRoute",
      version: 30
    }
  };

  emitSignal("expansion.route", { channel, bandId, bandFamily, routeEcho, result });
  emitFinality("expansion.route", { channel, bandId, bandFamily, routeEcho, result });

  return result;
}

// ----------------------------------------------------------------------------
// ROUTE REGISTRY (v30)
// ----------------------------------------------------------------------------

const routeHandlers = {
  CheckBand: handleCheckBand,
  VitalsSample: handleVitalsSample,

  PulseNetRoute: handlePulseNetRoute,
  PulseNetExpansion: handlePulseNetRoute,
  PulseNetSoldier: handlePulseNetRoute,
  PulseNetMesh: handlePulseNetRoute,
  PulseNetCastle: handlePulseNetRoute,
  PulseNetServer: handlePulseNetRoute,
  PulseNetUser: handlePulseNetRoute,
  PulseNetBrain: handlePulseNetRoute,
  PulseNetHeartbeat: handlePulseNetRoute,
  PulseNetFastLane: handlePulseNetRoute,

  CheckRouterMemory: handleCheckRouterMemory,
  RouteDownAlert: handleRouteDownAlert,
  PulseBandMetrics: handlePulseBandMetrics,

  ExpansionRoute: handleExpansionRoute,
  InternetRoute: handleExpansionRoute
};

// ----------------------------------------------------------------------------
// PREWARM
// ----------------------------------------------------------------------------

export function prewarmPulseWorldEndpoint() {
  if (prewarmed) return;
  prewarmed = true;

  const defaultBands = ["symbolic", "binary", "dual", "mesh"];

  for (const bandId of defaultBands) {
    const state = getBandState(bandId);
    state.lastUpdatedAt = nowMs();
    state.bandFamily = BAND_FAMILY.PULSEBAND;
    applySpeedBoost(bandId, 1.0, "prewarm-neutral", 60_000);
  }

  const fakeDurations = [2, 3, 4];
  for (const d of fakeDurations) {
    recordLatency("prewarm", d, null);
  }

  emitSignal("endpoint.prewarm", { bands: defaultBands });
  emitFinality("endpoint.prewarm", { bands: defaultBands });
}

// ----------------------------------------------------------------------------
// CENTRAL DISPATCH — v30
// ----------------------------------------------------------------------------

const C_ID = "color:#FFA726; font-weight:bold; font-family:monospace;";
const C_OK = "color:#00FF9C; font-family:monospace;";
const C_INFO = "color:#E8F8FF; font-family:monospace;";
const C_WARN = "color:#FFE066; font-family:monospace;";
const C_ERR = "color:#FF3B3B; font-weight:bold; font-family:monospace;";

export const PulseWorldEndpoint = Object.freeze({
  async handle(route) {
    const start = nowMs();
    const rawType = route?.type || route?.path || "Unknown";
    let error = null;

    const bandId = resolveBandFromRoute(route, route?.payload);
    const bandFamily = resolveBandFamilyFromRoute(route, route?.payload);
    const dnaTag = resolveDnaTagFromRoute(route, route?.payload);
    const meshTag = resolveMeshTagFromRoute(route, route?.payload);

    console.log(
      "%c[PulseWorldEndpoint] %chandle() %c→ %s",
      C_ID,
      C_INFO,
      C_OK,
      rawType
    );

    emitSignal("endpoint.call", {
      type: rawType,
      route,
      bandId,
      bandFamily,
      dnaTag,
      meshTag
    });
    emitFinality("endpoint.call", {
      type: rawType,
      route,
      bandId,
      bandFamily,
      dnaTag,
      meshTag
    });

    try {
      try {
        prewarmPulseWorldEndpoint();
      } catch (_) {}

      let payload = route?.payload ?? null;

      if (payload && payload.chunkId) {
        console.log(
          "%c[PulseWorldEndpoint] %cchunk assembly %c→ chunkId:%s",
          C_ID,
          C_WARN,
          C_INFO,
          payload.chunkId
        );

        const chunkResult = handleChunkedPayloadV30(payload);

        if (!chunkResult.complete) {
          const duration = nowMs() - start;
          recordLatency(rawType, duration, null, {
            bandId,
            bandFamily,
            dnaTag,
            meshTag
          });

          console.log(
            "%c[PulseWorldEndpoint] %cchunk incomplete %c→ waiting",
            C_ID,
            C_WARN,
            C_INFO
          );

          const partial = {
            ok: true,
            type: "ChunkInProgress",
            chunkId: payload.chunkId,
            meta: {
              source: "PulseWorldEndpoint.Chunk",
              version: 30
            }
          };

          emitSignal("endpoint.chunk.inProgress", partial);
          emitFinality("endpoint.chunk.inProgress", partial);
          return partial;
        }

        console.log("%c[PulseWorldEndpoint] %cchunk complete", C_ID, C_OK);
        payload = chunkResult.payload;
      }

      console.log(
        "%c[PulseWorldEndpoint] %cdispatch %c→ %s",
        C_ID,
        C_INFO,
        C_OK,
        rawType
      );

      const handler = routeHandlers[rawType];

      if (!handler) {
        console.log(
          "%c[PulseWorldEndpoint] %cUnknown route %c→ %s",
          C_ID,
          C_WARN,
          C_INFO,
          rawType
        );

        const duration = nowMs() - start;
        recordLatency(rawType, duration, null, {
          bandId,
          bandFamily,
          dnaTag,
          meshTag
        });

        const unknown = {
          ok: false,
          type: "UnknownRouteType",
          routeType: rawType,
          bandId,
          bandFamily,
          dnaTag,
          meshTag,
          meta: {
            source: "PulseWorldEndpoint.Unknown",
            version: 30
          }
        };

        emitSignal("endpoint.unknownRoute", unknown);
        emitFinality("endpoint.unknownRoute", unknown);
        return unknown;
      }

      const result = await handler(payload, {
        ...route,
        bandId,
        bandFamily,
        dnaTag,
        meshTag
      });
      const duration = nowMs() - start;

      console.log(
        "%c[PulseWorldEndpoint] %clatency %c→ %dms",
        C_ID,
        C_INFO,
        C_OK,
        duration
      );

      recordLatency(rawType, duration, null, {
        bandId,
        bandFamily,
        dnaTag,
        meshTag
      });

      emitSignal("endpoint.result", {
        type: rawType,
        durationMs: duration,
        bandId,
        bandFamily,
        dnaTag,
        meshTag,
        result
      });
      emitFinality("endpoint.result", {
        type: rawType,
        durationMs: duration,
        bandId,
        bandFamily,
        dnaTag,
        meshTag,
        result
      });

      return result;
    } catch (err) {
      error = err;

      console.error(
        "%c[PulseWorldEndpoint] %cERROR %c→ %s",
        C_ID,
        C_ERR,
        C_WARN,
        String(err)
      );

      const duration = nowMs() - start;
      recordLatency(rawType, duration, error, {
        bandId,
        bandFamily,
        dnaTag,
        meshTag
      });

      const failure = {
        ok: false,
        type: "PulseWorldEndpointError",
        message: String(err),
        bandId,
        bandFamily,
        dnaTag,
        meshTag,
        meta: {
          source: "PulseWorldEndpoint.handle",
          version: 30
        }
      };

      emitSignal("endpoint.error", {
        type: rawType,
        durationMs: duration,
        bandId,
        bandFamily,
        dnaTag,
        meshTag,
        error: String(err)
      });

      emitFinality("endpoint.error", {
        type: rawType,
        durationMs: duration,
        bandId,
        bandFamily,
        dnaTag,
        meshTag,
        error: String(err)
      });

      return failure;
    }
  },

  getMetrics() {
    console.log("%c[PulseWorldEndpoint] %cgetMetrics()", C_ID, C_INFO);
    const snapshot = safeJsonClone(endpointMetrics);
    emitSignal("endpoint.metrics.read", snapshot);
    emitFinality("endpoint.metrics.read", snapshot);
    return snapshot;
  },

  getBandState(bandId) {
    console.log(
      "%c[PulseWorldEndpoint] %cgetBandState() %c→ %s",
      C_ID,
      C_INFO,
      C_OK,
      bandId
    );
    const snapshot = safeJsonClone(getBandState(bandId));
    emitSignal("band.state.read", { bandId, snapshot });
    emitFinality("band.state.read", { bandId, snapshot });
    return snapshot;
  },

  getSpeedBoost(bandId) {
    console.log(
      "%c[PulseWorldEndpoint] %cgetSpeedBoost() %c→ %s",
      C_ID,
      C_INFO,
      C_OK,
      bandId
    );
    const snapshot = safeJsonClone(getEffectiveSpeedBoost(bandId));
    emitSignal("band.speedBoost.read", { bandId, snapshot });
    emitFinality("band.speedBoost.read", { bandId, snapshot });
    return snapshot;
  }
});

// ----------------------------------------------------------------------------
// AUTO-PREWARM + EXPOSE
// ----------------------------------------------------------------------------

console.log(
  "%c[PulseWorldEndpoint] %cauto-prewarm on import (v30)",
  C_ID,
  C_OK
);

prewarmPulseWorldEndpoint();

console.log(
  "%c[PulseWorldEndpoint] %cexposed to window (v30)",
  C_ID,
  C_OK
);

if (typeof window !== "undefined") {
  window.PulseRemoteEndpoint = PulseWorldEndpoint;
}
