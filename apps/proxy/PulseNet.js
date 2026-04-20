// ============================================================================
// FILE: /apps/lib/Connectors/PulseNet.js
// LAYER: THE SYNAPSE + PULSE-ONCE CONNECTIVITY ORGAN — v7.4
// ============================================================================
//
// ROLE (v7.4):
//   THE SYNAPSE — Neural Signal Routing Layer
//   • Receives electrical signal from Nervous System (PulseBand)
//   • Computes signalScore + signalSlope (signal strength + trend)
//   • Classifies route health (neural path integrity)
//   • Emits pulse updates to the OS (neural firing)
//
//   PULSE-ONCE CONNECTIVITY ORGAN — Tiny Sync + Offline-First
//   • Attempts one tiny connectivity pulse using any legal path
//   • Syncs identity + config + jobs (1–2 KB)
//   • Stores everything locally for fully offline operation
//   • Does NOT require continuous internet
//
// CONTRACT (v7.4):
//   • No PulseBand imports
//   • No PulseClient imports
//   • No PulseUpdate imports
//   • Pure subsystem module (only uses browser APIs + fetch + localStorage)
//
// SAFETY (v7.4):
//   • No illegal network access
//   • Only uses legal/open/saved connectivity paths (where implemented)
//   • Deterministic math for signal routing
//   • Tiny, bounded sync payload
// ============================================================================


// ============================================================================
// LAYER CONSTANTS + DIAGNOSTICS
// ============================================================================
const PULSE_LAYER_ID = "SYNAPSE-LAYER";
const PULSE_LAYER_NAME = "THE SYNAPSE";
const PULSE_LAYER_ROLE = "Neural Signal Routing Layer";

const PULSE_DIAGNOSTICS_ENABLED =
  (typeof window !== "undefined" &&
    (window.PULSE_PULSE_DIAGNOSTICS === true ||
     window.PULSE_DIAGNOSTICS === true)) ||
  false;

const pulseLog = (stage, details = {}) => {
  if (!PULSE_DIAGNOSTICS_ENABLED) return;

  log(
    JSON.stringify({
      pulseLayer: PULSE_LAYER_ID,
      pulseName: PULSE_LAYER_NAME,
      pulseRole: PULSE_LAYER_ROLE,
      stage,
      ...details
    })
  );
};

pulseLog("SYNAPSE_INIT", {});


// ============================================================================
// CORE PURE HELPERS (NO IMPORTS, NO SIDE EFFECTS EXCEPT OPTIONAL LOGGING)
// ============================================================================

/**
 * Normalize a raw numeric signal into a bounded [0,1] score.
 * This is intentionally simple + deterministic.
 */
function normalizeSignal(rawValue, opts = {}) {
  const {
    min = 0,
    max = 100,
    clamp = true
  } = opts;

  if (rawValue == null || Number.isNaN(rawValue)) return 0;

  let v = Number(rawValue);
  const span = max - min || 1;
  let score = (v - min) / span;

  if (clamp) {
    if (score < 0) score = 0;
    if (score > 1) score = 1;
  }

  return score;
}

/**
 * Compute slope between two samples (trend).
 * Returns a signed value: positive = rising, negative = falling.
 */
function computeSlope(prevValue, nextValue, opts = {}) {
  const { epsilon = 1e-6 } = opts;

  if (prevValue == null || nextValue == null) return 0;

  const a = Number(prevValue);
  const b = Number(nextValue);

  const delta = b - a;
  if (Math.abs(delta) < epsilon) return 0;

  return delta;
}

/**
 * Classify route health based on score + slope.
 * This is the "neural path integrity" classifier.
 */
function classifyRouteHealth(signalScore, signalSlope) {
  const score = Number(signalScore ?? 0);
  const slope = Number(signalSlope ?? 0);

  if (score >= 0.8 && slope >= 0) return "healthy";
  if (score >= 0.5 && slope >= -0.1) return "stable";
  if (score >= 0.3 && slope >= -0.3) return "degrading";
  if (score < 0.3 && slope < -0.1) return "critical";

  return "unknown";
}

/**
 * Build a pure "pulse update" object that the OS / higher layers can consume.
 */
function buildPulseUpdate({
  rawSignal,
  previousSignal,
  meta = {}
} = {}) {
  const signalScore = normalizeSignal(rawSignal, meta.normalize || {});
  const signalSlope = computeSlope(previousSignal, rawSignal, meta.slope || {});
  const routeHealth = classifyRouteHealth(signalScore, signalSlope);

  const update = {
    layerId: PULSE_LAYER_ID,
    layerName: PULSE_LAYER_NAME,
    layerRole: PULSE_LAYER_ROLE,

    rawSignal: rawSignal ?? null,
    previousSignal: previousSignal ?? null,

    signalScore,
    signalSlope,
    routeHealth,

    meta: {
      ...meta
    },

    ts: new Date().toISOString()
  };

  pulseLog("SYNAPSE_PULSE_UPDATE", {
    routeHealth,
    signalScore,
    signalSlope,
    meta
  });

  return update;
}

/**
 * High-level "process" function:
 *   • Takes a raw nervous-system signal + previous sample
 *   • Returns a full PulseNet update object
 */
function processPulseSignal(rawSignal, previousSignal, meta = {}) {
  pulseLog("SYNAPSE_PROCESS_START", {
    rawSignal,
    previousSignal,
    meta
  });

  const update = buildPulseUpdate({ rawSignal, previousSignal, meta });

  pulseLog("SYNAPSE_PROCESS_DONE", {
    routeHealth: update.routeHealth,
    signalScore: update.signalScore,
    signalSlope: update.signalSlope
  });

  return update;
}

/**
 * Optional: build a small diagnostic snapshot for dashboards.
 */
function buildPulseNetSnapshot(rawSignal, previousSignal, meta = {}) {
  const update = buildPulseUpdate({ rawSignal, previousSignal, meta });

  return {
    version: "7.4",
    layerId: PULSE_LAYER_ID,
    layerName: PULSE_LAYER_NAME,
    layerRole: PULSE_LAYER_ROLE,
    ts: update.ts,

    signal: {
      raw: update.rawSignal,
      previous: update.previousSignal,
      score: update.signalScore,
      slope: update.signalSlope,
      routeHealth: update.routeHealth
    },

    meta: update.meta
  };
}


// ============================================================================
// PULSE-ONCE CONNECTIVITY ORGAN (OFFLINE-FIRST SYNC)
// ============================================================================

const PulseNetState = {
  lastPulseTs: null,
  lastPulseOk: false,
  lastError: null,
  minPulseIntervalMs: 5 * 60 * 1000 // 5 minutes (tunable)
};

/**
 * Multi-gateway reachout:
 *  • Satellite (if available)
 *  • Open WiFi (where supported)
 *  • Saved WiFi (OS-level, where supported)
 *  • Carrier WiFi (where supported)
 *  • Last known gateway (conceptual mesh / cached path)
 *
 * NOTE: In browser JS we cannot actually scan WiFi or force connections.
 * These are stubs/placeholders for native / host integrations.
 */
async function multiGatewayReachout() {
  pulseLog("PULSE_REACHOUT_START", {});

  // 1) Satellite (if connection type is exposed as such)
  try {
    if (typeof navigator !== "undefined" && navigator.connection?.type === "satellite") {
      pulseLog("PULSE_REACHOUT_SATELLITE_TRY", {});
      const ok = await trySatellitePing();
      if (ok) {
        pulseLog("PULSE_REACHOUT_SATELLITE_OK", {});
        return true;
      }
    }
  } catch (e) {
    pulseLog("PULSE_REACHOUT_SATELLITE_ERR", { error: String(e) });
  }

  // 2) Open WiFi / Saved WiFi / Carrier WiFi:
  //    In browser JS, we cannot enumerate or join networks directly.
  //    These are placeholders for native app / OS-level integrations.
  pulseLog("PULSE_REACHOUT_WIFI_PLACEHOLDER", {
    note: "WiFi scanning/joining requires native/OS integration."
  });

  // 3) Last known gateway (conceptual: try a tiny ping to a known endpoint)
  try {
    const ok = await tryLastKnownGateway();
    if (ok) {
      pulseLog("PULSE_REACHOUT_LAST_GATEWAY_OK", {});
      return true;
    }
  } catch (e) {
    pulseLog("PULSE_REACHOUT_LAST_GATEWAY_ERR", { error: String(e) });
  }

  pulseLog("PULSE_REACHOUT_NO_PATH", {});
  return false;
}

async function trySatellitePing() {
  try {
    const res = await fetch("https://example-satellite-check.com/ping", {
      method: "GET",
      cache: "no-store"
    });
    return res.ok;
  } catch {
    return false;
  }
}

async function tryLastKnownGateway() {
  try {
    const res = await fetch("/pulse-gateway-ping", {
      method: "GET",
      cache: "no-store"
    });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Pulse once:
 *  • Respects minPulseIntervalMs
 *  • Uses multiGatewayReachout() to find ANY legal path
 *  • Performs tiny sync: identity + config + jobs
 *  • Stores everything in localStorage for offline-first operation
 */
async function pulseOnce(deviceId) {
  pulseLog("PULSE_ONCE_CALLED", { deviceId });

  const now = Date.now();
  if (
    PulseNetState.lastPulseTs &&
    now - PulseNetState.lastPulseTs < PulseNetState.minPulseIntervalMs
  ) {
    pulseLog("PULSE_ONCE_SKIPPED_MIN_INTERVAL", {
      lastPulseTs: PulseNetState.lastPulseTs,
      now,
      minPulseIntervalMs: PulseNetState.minPulseIntervalMs
    });
    return { skipped: true, reason: "min-interval" };
  }

  try {
    const pathOk = await multiGatewayReachout();
    if (!pathOk) {
      PulseNetState.lastPulseTs = now;
      PulseNetState.lastPulseOk = false;
      PulseNetState.lastError = "no-path";

      pulseLog("PULSE_ONCE_NO_PATH", {});
      return { ok: false, reason: "no-path" };
    }

    pulseLog("PULSE_ONCE_TINY_SYNC_START", {});

    const res = await fetch("/pulse-sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      body: JSON.stringify({ deviceId })
    });

    if (!res.ok) {
      throw new Error("non_ok_status_" + res.status);
    }

    const payload = await res.json();

    try {
      if (typeof localStorage !== "undefined") {
        if (payload.identity) {
          localStorage.setItem("tp_identity_v7", JSON.stringify(payload.identity));
        }
        if (payload.config) {
          localStorage.setItem("tp_earn_config_v7", JSON.stringify(payload.config));
        }
        if (payload.jobs) {
          localStorage.setItem("tp_jobs_seed_v7", JSON.stringify(payload.jobs));
        }
      }
    } catch (storageErr) {
      pulseLog("PULSE_ONCE_STORAGE_ERR", { error: String(storageErr) });
    }

    PulseNetState.lastPulseTs = now;
    PulseNetState.lastPulseOk = true;
    PulseNetState.lastError = null;

    pulseLog("PULSE_ONCE_TINY_SYNC_DONE", {
      bytes: JSON.stringify(payload).length,
      hasJobs: Array.isArray(payload.jobs) && payload.jobs.length > 0
    });

    return { ok: true, payload };

  } catch (err) {
    PulseNetState.lastPulseTs = Date.now();
    PulseNetState.lastPulseOk = false;
    PulseNetState.lastError = err?.message || "unknown";

    pulseLog("PULSE_ONCE_ERR", { error: String(err) });
    return { ok: false, error: err?.message || "unknown" };
  }
}

function getPulseNetState() {
  return { ...PulseNetState };
}


// ============================================================================
// EXPORTED SYNAPSE + PULSE-ONCE API
// ============================================================================

export const PulseNet = {
  // Identity
  PULSE_LAYER_ID,
  PULSE_LAYER_NAME,
  PULSE_LAYER_ROLE,

  // Diagnostics
  PULSE_DIAGNOSTICS_ENABLED,
  pulseLog,

  // Core math / classification
  normalizeSignal,
  computeSlope,
  classifyRouteHealth,

  // Main routing primitives
  buildPulseUpdate,
  processPulseSignal,
  buildPulseNetSnapshot,

  // Pulse-once connectivity
  pulseOnce,
  getPulseNetState
};
