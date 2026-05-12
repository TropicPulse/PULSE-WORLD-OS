// ============================================================================
// PulseWorldEndpoint-v25.js
// ============================================================================
// CENTRAL NERVOUS ENDPOINT FOR PULSE ARCHITECTURE — v25++ IMMORTAL
// ----------------------------------------------------------------------------
//  • Single canonical endpoint for CNS, CheckBand, PulseNet, Transport, PulseBand
//  • Deterministic, chunk-aware, cache-aware, prewarmable, pulse-aware, versioned
//  • Now supports:
//      - path or type (safeRoute-style)
//      - unified route registry (no giant switch)
//      - explicit Expansion / Internet routes
//      - v25++ chunk pipeline (string or JSON)
// ============================================================================

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

function recordLatency(type, durationMs, error = null) {
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
}

function getBandState(bandId = "symbolic") {
  const key = String(bandId || "symbolic").toLowerCase();
  if (!bandCache.has(key)) {
    bandCache.set(key, {
      bandId: key,
      lastCheckBand: null,
      lastVitals: null,
      lastPulseBandSample: null,
      lastUpdatedAt: 0,
      speedBoost: 1.0,
      speedBoostReason: "neutral",
      speedBoostExpiresAt: 0
    });
  }
  return bandCache.get(key);
}

function applySpeedBoost(bandId, boost, reason, ttlMs = 30_000) {
  const key = String(bandId || "symbolic").toLowerCase();
  const expiresAt = nowMs() + ttlMs;

  speedBoosts.set(key, {
    bandId: key,
    boost: typeof boost === "number" && boost > 0 ? boost : 1.0,
    reason: reason || "unspecified",
    expiresAt
  });

  const state = getBandState(key);
  const entry = speedBoosts.get(key);
  state.speedBoost = entry.boost;
  state.speedBoostReason = entry.reason;
  state.speedBoostExpiresAt = expiresAt;

  return entry;
}

function getEffectiveSpeedBoost(bandId) {
  const key = String(bandId || "symbolic").toLowerCase();
  const entry = speedBoosts.get(key);
  const now = nowMs();

  if (!entry || entry.expiresAt <= now) {
    speedBoosts.delete(key);
    const state = getBandState(key);
    state.speedBoost = 1.0;
    state.speedBoostReason = "neutral";
    state.speedBoostExpiresAt = 0;
    return { bandId: key, boost: 1.0, reason: "neutral", expiresAt: 0 };
  }

  const state = getBandState(key);
  state.speedBoost = entry.boost;
  state.speedBoostReason = entry.reason;
  state.speedBoostExpiresAt = entry.expiresAt;

  return entry;
}

// ----------------------------------------------------------------------------
// v25++ CHUNK PIPELINE
// ----------------------------------------------------------------------------
// Supports:
//   • string chunks
//   • JSON chunks (assembled then parsed)
//   • falls back gracefully if parse fails

function handleChunkedPayloadV25(chunkMeta) {
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
  return { complete: true, payload: assembled };
}

// ----------------------------------------------------------------------------
// HANDLERS
// ----------------------------------------------------------------------------

async function handleCheckBand(payload) {
  const bandId = payload?.bandId || payload?.band || "symbolic";
  const state = getBandState(bandId);

  state.lastCheckBand = safeJsonClone(payload);
  state.lastUpdatedAt = nowMs();

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

  return {
    ok: true,
    type: "CheckBandResult",
    bandId,
    stability,
    speedBoost: boostEntry,
    authoritativeBand: state.authoritativeBand,
    meta: {
      source: "PulseWorldEndpoint.CheckBand",
      version: 25
    }
  };
}

async function handleVitalsSample(payload) {
  const bandId = payload?.bandId || payload?.network?.band || "symbolic";
  const state = getBandState(bandId);

  state.lastVitals = safeJsonClone(payload);
  state.lastUpdatedAt = nowMs();

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

  return {
    ok: true,
    type: "VitalsTuningResult",
    bandId,
    suggestedAdvantage: effectiveAdvantage,
    baseAdvantage,
    speedBoost: boostEntry,
    meta: {
      source: "PulseWorldEndpoint.VitalsSample",
      version: 25
    }
  };
}

async function handlePulseNetRoute(payload) {
  const kind = payload?.kind || payload?.channel || "unknown";
  const bandId = payload?.band || payload?.bandId || "symbolic";

  return {
    ok: true,
    type: "PulseNetAck",
    kind,
    bandId,
    receivedAt: nowMs(),
    meta: {
      source: "PulseWorldEndpoint.PulseNetRoute",
      version: 25
    }
  };
}

async function handleCheckRouterMemory(payload) {
  const logs = Array.isArray(payload?.logs) ? payload.logs : [];

  return {
    ok: true,
    type: "RouterMemoryHealResult",
    logsCount: logs.length,
    suggestions: [],
    meta: {
      source: "PulseWorldEndpoint.CheckRouterMemory",
      version: 25
    }
  };
}

async function handleRouteDownAlert(payload) {
  const { error, type } = payload || {};

  return {
    ok: true,
    type: "RouteDownAck",
    routeType: type || "unknown",
    error: String(error || "unknown"),
    meta: {
      source: "PulseWorldEndpoint.RouteDownAlert",
      version: 25
    }
  };
}

async function handlePulseBandMetrics(payload) {
  const bandId = payload?.bandId || payload?.network?.band || "symbolic";
  const state = getBandState(bandId);

  state.lastPulseBandSample = safeJsonClone(payload);
  state.lastUpdatedAt = nowMs();

  const boostEntry = getEffectiveSpeedBoost(bandId);

  return {
    ok: true,
    type: "PulseBandMetricsAck",
    bandId,
    speedBoost: boostEntry,
    meta: {
      source: "PulseWorldEndpoint.PulseBandMetrics",
      version: 25
    }
  };
}

// v25++: explicit Expansion / Internet entry
async function handleExpansionRoute(payload) {
  const channel = payload?.channel || payload?.kind || "internet";
  const route   = payload?.route ?? payload;

  // Here is where you later plug in full Pulse‑World Expansion / Net / World.
  // For now, echo back with rich meta so you can see the full shape.
  return {
    ok: true,
    type: "ExpansionAck",
    channel,
    routeEcho: route,
    meta: {
      source: "PulseWorldEndpoint.ExpansionRoute",
      version: 25
    }
  };
}

// ----------------------------------------------------------------------------
// ROUTE REGISTRY (v25++)
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

  // v25++ explicit internet/expansion entry
  ExpansionRoute: handleExpansionRoute,
  InternetRoute: handleExpansionRoute
};

// ----------------------------------------------------------------------------
// PREWARM
// ----------------------------------------------------------------------------

export function prewarmPulseWorldEndpoint() {
  if (prewarmed) return;
  prewarmed = true;

  const defaultBands = ["symbolic", "binary", "dual"];

  for (const bandId of defaultBands) {
    const state = getBandState(bandId);
    state.lastUpdatedAt = nowMs();
    applySpeedBoost(bandId, 1.0, "prewarm-neutral", 60_000);
  }

  const fakeDurations = [2, 3, 4];
  for (const d of fakeDurations) {
    recordLatency("prewarm", d, null);
  }
}

// ----------------------------------------------------------------------------
// CENTRAL DISPATCH — v25++
// ----------------------------------------------------------------------------

const C_ID   = "color:#FFA726; font-weight:bold; font-family:monospace;";
const C_OK   = "color:#00FF9C; font-family:monospace;";
const C_INFO = "color:#E8F8FF; font-family:monospace;";
const C_WARN = "color:#FFE066; font-family:monospace;";
const C_ERR  = "color:#FF3B3B; font-weight:bold; font-family:monospace;";

export const PulseWorldEndpoint = Object.freeze({
  async handle(route) {
    const start = nowMs();
    const rawType = route?.type || route?.path || "Unknown";
    let error = null;

    console.log(
      "%c[PulseWorldEndpoint] %chandle() %c→ %s",
      C_ID, C_INFO, C_OK, rawType
    );

    try {
      try {
        prewarmPulseWorldEndpoint();
      } catch (_) {}

      let payload = route?.payload ?? null;

      if (payload && payload.chunkId) {
        console.log(
          "%c[PulseWorldEndpoint] %cchunk assembly %c→ chunkId:%s",
          C_ID, C_WARN, C_INFO, payload.chunkId
        );

        const chunkResult = handleChunkedPayloadV25(payload);

        if (!chunkResult.complete) {
          const duration = nowMs() - start;
          recordLatency(rawType, duration, null);

          console.log(
            "%c[PulseWorldEndpoint] %cchunk incomplete %c→ waiting",
            C_ID, C_WARN, C_INFO
          );

          return {
            ok: true,
            type: "ChunkInProgress",
            chunkId: payload.chunkId,
            meta: {
              source: "PulseWorldEndpoint.Chunk",
              version: 25
            }
          };
        }

        console.log("%c[PulseWorldEndpoint] %cchunk complete", C_ID, C_OK);
        payload = chunkResult.payload;
      }

      console.log(
        "%c[PulseWorldEndpoint] %cdispatch %c→ %s",
        C_ID, C_INFO, C_OK, rawType
      );

      const handler = routeHandlers[rawType];

      if (!handler) {
        console.log(
          "%c[PulseWorldEndpoint] %cUnknown route %c→ %s",
          C_ID, C_WARN, C_INFO, rawType
        );

        const duration = nowMs() - start;
        recordLatency(rawType, duration, null);

        return {
          ok: false,
          type: "UnknownRouteType",
          routeType: rawType,
          meta: {
            source: "PulseWorldEndpoint.Unknown",
            version: 25
          }
        };
      }

      const result = await handler(payload, route);
      const duration = nowMs() - start;

      console.log(
        "%c[PulseWorldEndpoint] %clatency %c→ %dms",
        C_ID, C_INFO, C_OK, duration
      );

      recordLatency(rawType, duration, null);
      return result;

    } catch (err) {
      error = err;

      console.error(
        "%c[PulseWorldEndpoint] %cERROR %c→ %s",
        C_ID, C_ERR, C_WARN, String(err)
      );

      const duration = nowMs() - start;
      recordLatency(rawType, duration, error);

      return {
        ok: false,
        type: "PulseWorldEndpointError",
        message: String(err),
        meta: {
          source: "PulseWorldEndpoint.handle",
          version: 25
        }
      };
    }
  },

  getMetrics() {
    console.log("%c[PulseWorldEndpoint] %cgetMetrics()", C_ID, C_INFO);
    return safeJsonClone(endpointMetrics);
  },

  getBandState(bandId) {
    console.log(
      "%c[PulseWorldEndpoint] %cgetBandState() %c→ %s",
      C_ID, C_INFO, C_OK, bandId
    );
    return safeJsonClone(getBandState(bandId));
  },

  getSpeedBoost(bandId) {
    console.log(
      "%c[PulseWorldEndpoint] %cgetSpeedBoost() %c→ %s",
      C_ID, C_INFO, C_OK, bandId
    );
    return safeJsonClone(getEffectiveSpeedBoost(bandId));
  }
});

// ----------------------------------------------------------------------------
// AUTO-PREWARM + EXPOSE
// ----------------------------------------------------------------------------

console.log(
  "%c[PulseWorldEndpoint] %cauto-prewarm on import (v25++)",
  C_ID, C_OK
);

prewarmPulseWorldEndpoint();

console.log(
  "%c[PulseWorldEndpoint] %cexposed to window (v25++)",
  C_ID, C_OK
);

if (typeof window !== "undefined") {
  global.PulseRemoteEndpoint = PulseWorldEndpoint;
}
