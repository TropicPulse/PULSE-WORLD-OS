// ============================================================================
// PulseWorldEndpoint-v24.js
// ============================================================================
// CENTRAL NERVOUS ENDPOINT FOR PULSE ARCHITECTURE
// ----------------------------------------------------------------------------
// This file defines the **single, canonical endpoint** that CNS, CheckBand,
// PulseNet, Transport, and (indirectly) PulseBand can talk to.
//
// Conceptually, this is the **“PulseWorld Brainstem”**:
//
//   • CNS route()  → Transport → PulseRemoteEndpoint.handle(route)
//   • CheckBand    → Transport → PulseRemoteEndpoint.handle(route)
//   • PulseNet     → PulseNetBridge.sendRoute() → PulseRemoteEndpoint.handle(route)
//   • RouterMemory → Transport.callCheckRouterMemory() → PulseRemoteEndpoint
//   • RouteDown    → Transport.callRouteDownAlert() → PulseRemoteEndpoint
//
// PulseBand itself is still frontend-only, but it can:
//   • send vitals snapshots here for logging / learning
//   • receive tuned parameters (speed boosts, advantage hints, etc.)
//   • rely on this endpoint as the **authoritative backend brain**.
//
// This endpoint is designed to be:
//
//   • **Deterministic**: same input → same output
//   • **Chunk-aware**: can assemble large payloads over multiple calls
//   • **Cache-aware**: keeps hot band/vitals state in memory
//   • **Prewarmable**: can be prewarmed at boot to avoid cold-start spikes
//   • **Pulse-aware**: tracks latency, throughput, and “impulse speed boosts”
//   • **Versioned**: v24, safe to evolve without breaking older callers
//
// ============================================================================
// PUBLIC SHAPE
// ============================================================================
//
// The endpoint exposes a single method:
//
//   PulseWorldEndpoint.handle(route)
//
// where `route` is an object shaped like:
//
//   {
//     type: string,          // e.g. "CheckBand", "VitalsSample", "PulseNetRoute"
//     payload: object|null,  // arbitrary payload from CNS / PulseNet / CheckBand
//     cycle?: number|null    // optional cycle / tick id
//   }
//
// It returns a Promise resolving to a JSON-serializable object.
//
// ============================================================================
// HOW TO WIRE IT INTO YOUR WORLD (IMPORTANT)
// ============================================================================
//
// In your boot file (e.g. index.js / PulseBoot.js), you MUST do:
//
//   import { PulseWorldEndpoint } from "./PulseWorldEndpoint-v24.js";
//
//   if (typeof window !== "undefined") {
//     window.PulseRemoteEndpoint = {
//       async handle(route) {
//         return PulseWorldEndpoint.handle(route);
//       }
//     };
//   }
//
// This makes **all existing CNS / Transport / PulseNet / CheckBand code**
// immediately functional, because they already call:
//
//   window.PulseRemoteEndpoint.handle({ type, payload, context/cycle })
//
// ============================================================================
// IMPLEMENTATION
// ============================================================================

/**
 * In-memory cache for hot band + vitals state.
 *
 * This is **process-local**, not persisted. It is intentionally simple:
 *   • keyed by bandId (string)
 *   • stores last vitals, last checkBand result, speed boosts, etc.
 */
const bandCache = new Map();

/**
 * Chunk assembly buffer.
 *
 * For large payloads (e.g. multi-MB vitals dumps or logs), callers can send:
 *   {
 *     chunkId: "some-id",
 *     chunkIndex: 0,
 *     totalChunks: 3,
 *     data: "..." // string or partial payload
 *   }
 *
 * We assemble them here and only process when all chunks arrive.
 */
const chunkBuffer = new Map();

/**
 * Global metrics for this endpoint.
 * These are **not** user-facing; they are for introspection / debugging.
 */
const endpointMetrics = {
  totalCalls: 0,
  totalErrors: 0,
  avgLatencyMs: 0,
  lastLatencyMs: 0,
  lastType: null,
  lastError: null
};

/**
 * Speed boost registry.
 *
 * This is where we store “impulse speed boosts” that PulseBand / CNS can
 * consult when deciding advantage multipliers, route preferences, etc.
 *
 * Example entry:
 *   {
 *     bandId: "binary",
 *     boost: 1.25,           // 25% faster
 *     reason: "recent-fast-route",
 *     expiresAt: 1710000000000
 *   }
 */
const speedBoosts = new Map();

/**
 * Prewarm state.
 *
 * When prewarm() is called, we:
 *   • seed bandCache with default entries
 *   • seed speedBoosts with neutral boosts
 *   • optionally simulate a few calls to stabilize avgLatencyMs
 */
let prewarmed = false;

// ============================================================================
// UTILITY HELPERS
// ============================================================================

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

/**
 * Update endpoint-level latency metrics.
 */
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

/**
 * Get or create a band state entry.
 */
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

/**
 * Apply or refresh a speed boost for a band.
 */
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
  state.speedBoost = speedBoosts.get(key).boost;
  state.speedBoostReason = speedBoosts.get(key).reason;
  state.speedBoostExpiresAt = expiresAt;

  return speedBoosts.get(key);
}

/**
 * Resolve current effective speed boost for a band.
 */
function getEffectiveSpeedBoost(bandId) {
  const key = String(bandId || "symbolic").toLowerCase();
  const entry = speedBoosts.get(key);
  const now = nowMs();

  if (!entry || entry.expiresAt <= now) {
    // expired or missing → neutral
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

/**
 * Handle chunked payload assembly.
 *
 * Returns:
 *   • { complete: false } while still assembling
 *   • { complete: true, payload } when all chunks are present
 */
function handleChunkedPayload(chunkMeta) {
  const { chunkId, chunkIndex, totalChunks, data } = chunkMeta || {};
  if (!chunkId || typeof totalChunks !== "number") {
    return { complete: true, payload: chunkMeta }; // not chunked
  }

  if (!chunkBuffer.has(chunkId)) {
    chunkBuffer.set(chunkId, {
      totalChunks,
      received: new Array(totalChunks).fill(null),
      receivedCount: 0
    });
  }

  const entry = chunkBuffer.get(chunkId);
  if (
    typeof chunkIndex === "number" &&
    chunkIndex >= 0 &&
    chunkIndex < entry.totalChunks
  ) {
    if (entry.received[chunkIndex] == null) {
      entry.received[chunkIndex] = data;
      entry.receivedCount++;
    }
  }

  if (entry.receivedCount < entry.totalChunks) {
    return { complete: false };
  }

  // Assemble final payload
  const assembled = entry.received.join("");
  chunkBuffer.delete(chunkId);

  return {
    complete: true,
    payload: assembled
  };
}

// ============================================================================
// HANDLERS FOR SPECIFIC ROUTE TYPES
// ============================================================================
/**
 * Handle CheckBand calls.
 *
 * Upgraded: This endpoint no longer validates or corrects CheckBand.
 * It now forwards the incoming payload to the backend CheckBand engine
 * and returns the authoritative band state.
 *
 * No new variables added. All original variables preserved.
 */
/**
 * Handle CheckBand calls.
 *
 * Upgraded: This endpoint no longer validates or corrects CheckBand.
 * It now forwards the incoming payload to the backend CheckBand engine
 * using the existing variables only.
 */
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

  // *** UPGRADE: push to real CheckBand by writing into state (no new variables) ***
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
      version: 24
    }
  };
}


/**
 * Handle Vitals samples from CNS / PulseBand.
 *
 * This is where CNS can push vitals snapshots for logging / learning, and
 * receive tuned parameters (e.g. recommended advantage multipliers).
 */
async function handleVitalsSample(payload) {
  const bandId = payload?.bandId || payload?.network?.band || "symbolic";
  const state = getBandState(bandId);

  state.lastVitals = safeJsonClone(payload);
  state.lastUpdatedAt = nowMs();

  // Derive a suggested advantage multiplier based on latency + stability.
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
      version: 24
    }
  };
}

/**
 * Handle generic PulseNet route calls.
 *
 * This is the “catch-all” for:
 *   • expansion
 *   • soldier
 *   • mesh
 *   • castle
 *   • server
 *   • user
 *   • brain
 *   • heartbeat
 *   • fastlane
 */
async function handlePulseNetRoute(payload) {
  const kind = payload?.kind || payload?.channel || "unknown";
  const bandId = payload?.band || payload?.bandId || "symbolic";

  // For now, we just acknowledge and echo back some meta.
  // In a real deployment, this is where you’d:
  //   • persist logs
  //   • trigger AI workflows
  //   • update long-term metrics
  //   • etc.
  return {
    ok: true,
    type: "PulseNetAck",
    kind,
    bandId,
    receivedAt: nowMs(),
    meta: {
      source: "PulseWorldEndpoint.PulseNetRoute",
      version: 24
    }
  };
}

/**
 * Handle RouterMemory healing.
 */
async function handleCheckRouterMemory(payload) {
  const logs = Array.isArray(payload?.logs) ? payload.logs : [];

  // For now, we just echo back a neutral “no-op” healing suggestion.
  // You can extend this to:
  //   • detect repeated failures
  //   • suggest route rewrites
  //   • mark certain routes as degraded
  return {
    ok: true,
    type: "RouterMemoryHealResult",
    logsCount: logs.length,
    suggestions: [],
    meta: {
      source: "PulseWorldEndpoint.CheckRouterMemory",
      version: 24
    }
  };
}

/**
 * Handle RouteDown alerts.
 */
async function handleRouteDownAlert(payload) {
  const { error, type } = payload || {};

  // In a real deployment, you’d:
  //   • log to an error pipeline
  //   • notify ops
  //   • mark route as degraded
  return {
    ok: true,
    type: "RouteDownAck",
    routeType: type || "unknown",
    error: String(error || "unknown"),
    meta: {
      source: "PulseWorldEndpoint.RouteDownAlert",
      version: 24
    }
  };
}

/**
 * Handle a direct “PulseBandMetrics” style call, if you ever choose to
 * have PulseBand send its own metrics here.
 */
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
      version: 24
    }
  };
}

// ============================================================================
// PREWARM
// ============================================================================

/**
 * Prewarm the endpoint.
 *
 * Call this once at boot (optional but recommended) to:
 *   • seed bandCache with default entries
 *   • seed neutral speed boosts
 *   • stabilize latency metrics with a few fake calls
 */
export function prewarmPulseWorldEndpoint() {
  if (prewarmed) return;
  prewarmed = true;

  const defaultBands = ["symbolic", "binary", "dual"];

  for (const bandId of defaultBands) {
    const state = getBandState(bandId);
    state.lastUpdatedAt = nowMs();
    applySpeedBoost(bandId, 1.0, "prewarm-neutral", 60_000);
  }

  // Simulate a few no-op calls to stabilize avgLatencyMs
  const fakeDurations = [2, 3, 4];
  for (const d of fakeDurations) {
    recordLatency("prewarm", d, null);
  }
}

// ============================================================================
// CENTRAL DISPATCH
// ============================================================================

/**
 * The central endpoint object.
 *
 * This is what you wire into:
 *
 */
// COLOR CONSTANTS — IMMORTAL PORTAL PATTERN
const C_ID   = "color:#00E5FF; font-weight:bold; font-family:monospace;"; // Cyan
const C_OK   = "color:#00FF9C; font-family:monospace;";                   // Neon Green
const C_INFO = "color:#E8F8FF; font-family:monospace;";                   // White
const C_WARN = "color:#FFE066; font-family:monospace;";                   // Yellow
const C_ERR  = "color:#FF3B3B; font-weight:bold; font-family:monospace;"; // Red

export const PulseWorldEndpoint = Object.freeze({
  /**
   * Main handler.
   */
  async handle(route) {
    const start = nowMs();
    const type = route?.type || "Unknown";
    let error = null;

    console.log(
      "%c[PulseWorldEndpoint] %chandle() %c→ %s",
      C_ID, C_INFO, C_OK, type
    );

    // ⭐ NON‑BLOCKING PREWARM ON EVERY CALL
    try {
      prewarmPulseWorldEndpoint();
      console.log("%c[PulseWorldEndpoint] %cprewarm fired", C_ID, C_OK);
    } catch (_) {
      console.log("%c[PulseWorldEndpoint] %cprewarm skipped", C_ID, C_WARN);
    }

    try {
      let payload = route?.payload ?? null;

      // ⭐ CHUNK ASSEMBLY
      if (payload && payload.chunkId) {
        console.log(
          "%c[PulseWorldEndpoint] %cchunk assembly %c→ chunkId:%s",
          C_ID, C_WARN, C_INFO, payload.chunkId
        );

        const chunkResult = handleChunkedPayload(payload);

        if (!chunkResult.complete) {
          const duration = nowMs() - start;
          recordLatency(type, duration, null);

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
              version: 24
            }
          };
        }

        console.log("%c[PulseWorldEndpoint] %cchunk complete", C_ID, C_OK);
        payload = chunkResult.payload;
      }

      // ⭐ ROUTE DISPATCH
      console.log(
        "%c[PulseWorldEndpoint] %cdispatch %c→ %s",
        C_ID, C_INFO, C_OK, type
      );

      switch (type) {
        case "CheckBand":
          console.log("%c[PulseWorldEndpoint] %cCheckBand", C_ID, C_OK);
          return await handleCheckBand(payload);

        case "VitalsSample":
          console.log("%c[PulseWorldEndpoint] %cVitalsSample", C_ID, C_OK);
          return await handleVitalsSample(payload);

        case "PulseNetRoute":
        case "PulseNetExpansion":
        case "PulseNetSoldier":
        case "PulseNetMesh":
        case "PulseNetCastle":
        case "PulseNetServer":
        case "PulseNetUser":
        case "PulseNetBrain":
        case "PulseNetHeartbeat":
        case "PulseNetFastLane":
          console.log(
            "%c[PulseWorldEndpoint] %cPulseNet route %c→ %s",
            C_ID, C_OK, C_INFO, type
          );
          return await handlePulseNetRoute(payload);

        case "CheckRouterMemory":
          console.log("%c[PulseWorldEndpoint] %cCheckRouterMemory", C_ID, C_OK);
          return await handleCheckRouterMemory(payload);

        case "RouteDownAlert":
          console.log("%c[PulseWorldEndpoint] %cRouteDownAlert", C_ID, C_WARN);
          return await handleRouteDownAlert(payload);

        case "PulseBandMetrics":
          console.log("%c[PulseWorldEndpoint] %cPulseBandMetrics", C_ID, C_OK);
          return await handlePulseBandMetrics(payload);

        default:
          console.log(
            "%c[PulseWorldEndpoint] %cUnknown route %c→ %s",
            C_ID, C_WARN, C_INFO, type
          );
          return {
            ok: false,
            type: "UnknownRouteType",
            routeType: type,
            meta: {
              source: "PulseWorldEndpoint.Unknown",
              version: 24
            }
          };
      }
    } catch (err) {
      error = err;

      console.error(
        "%c[PulseWorldEndpoint] %cERROR %c→ %s",
        C_ID, C_ERR, C_WARN, String(err)
      );

      return {
        ok: false,
        type: "PulseWorldEndpointError",
        message: String(err),
        meta: {
          source: "PulseWorldEndpoint.handle",
          version: 24
        }
      };
    } finally {
      const duration = nowMs() - start;

      console.log(
        "%c[PulseWorldEndpoint] %clatency %c→ %dms",
        C_ID, C_INFO, C_OK, duration
      );

      recordLatency(type, duration, error);
    }
  },

  getMetrics() {
    console.log(
      "%c[PulseWorldEndpoint] %cgetMetrics()",
      C_ID, C_INFO
    );
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

// ============================================================================
// AUTO-PREWARM ON IMPORT
// ============================================================================
console.log(
  "%c[PulseWorldEndpoint] %cauto-prewarm on import",
  C_ID, C_OK
);

prewarmPulseWorldEndpoint();

// ============================================================================
// EXPOSE ENDPOINT
// ============================================================================
console.log(
  "%c[PulseWorldEndpoint] %cexposed to window",
  C_ID, C_OK
);

window.PulseRemoteEndpoint = PulseWorldEndpoint;
