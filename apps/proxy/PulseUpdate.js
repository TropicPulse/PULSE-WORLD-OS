// ============================================================================
// FILE: /apps/lib/Connectors/PulseUpdate.js
// LAYER: HEMODYNAMIC MONITOR (Pressure + Flow + Reflex Trigger Layer) — v7.4
// ============================================================================
//
// ROLE (v7.4):
//   THE HEMODYNAMIC MONITOR — The organism’s circulatory vital‑signs layer.
//   • Measures upstream pressure (latency)
//   • Measures flow rate (kbps)
//   • Classifies circulatory health
//   • Builds normalized telemetry packets
//   • Triggers reflex responses in the Nervous System (PulseBand)
//
// CONTRACT (v7.4):
//   • No PulseBand imports
//   • No PulseNet imports
//   • No global state
//   • Pure subsystem module
//
// SAFETY (v7.4):
//   • No console.*
//   • All logs routed through PulseLogger
//   • All metrics routed through PulseTelemetry
// ============================================================================

import { log, warn, error } from "../PulseLogger.js";
import { emitTelemetry } from "../PulseTelemetry.js";

// ============================================================================
// SUBSYSTEM IDENTITY
// ============================================================================
const SUBSYSTEM = "hemodynamics";

// ============================================================================
// LAYER CONSTANTS + DIAGNOSTICS
// ============================================================================
const BLOODPRESSURE_LAYER_ID = "HEMODYNAMIC-LAYER";
const BLOODPRESSURE_LAYER_NAME = "THE HEMODYNAMIC MONITOR";
const BLOODPRESSURE_LAYER_ROLE = "Pressure + Flow + Reflex Trigger Layer";

const BLOODPRESSURE_DIAGNOSTICS_ENABLED =
  window?.PULSE_BLOODPRESSURE_DIAGNOSTICS === true ||
  window?.PULSE_DIAGNOSTICS === true;

// v7.4: bpLog now uses proper subsystem logging + telemetry
const bpLog = (stage, details = {}) => {
  if (!BLOODPRESSURE_DIAGNOSTICS_ENABLED) return;

  log(SUBSYSTEM, stage, {
    pulseLayer: BLOODPRESSURE_LAYER_ID,
    pulseName: BLOODPRESSURE_LAYER_NAME,
    pulseRole: BLOODPRESSURE_LAYER_ROLE,
    ...details
  });

  emitTelemetry(SUBSYSTEM, stage, details);
};

bpLog("HEMODYNAMIC_INIT");

// ============================================================================
// 1. Upstream latency probe — PRESSURE MEASUREMENT
// ============================================================================
async function measureLatency(url = "/pulse-proxy/ping") {
  log(SUBSYSTEM, "measureLatency() called", { url });
  bpLog("MEASURE_LATENCY_START", { url });

  const start = performance.now();

  try {
    const res = await fetch(url, { cache: "no-store" });
    const t = performance.now() - start;

    log(SUBSYSTEM, "Ping returned", { durationMs: t });
    bpLog("PING_SUCCESS", { durationMs: t });

    let data = {};
    try {
      data = await res.json();
      log(SUBSYSTEM, "Ping JSON parsed");
      bpLog("PING_JSON_PARSED");
    } catch {
      warn(SUBSYSTEM, "Ping JSON parse failed (ignored)");
      bpLog("PING_JSON_PARSE_FAILED");
    }

    return {
      ok: res.ok,
      rtt: data.rtt ?? t,
      bytes: data.bytes ?? null,
      kbps: data.kbps ?? null,
      msPerKB: data.msPerKB ?? null
    };

  } catch (err) {
    warn(SUBSYSTEM, "Ping FAILED", { error: String(err) });
    bpLog("PING_FAILED", { error: String(err) });

    return {
      ok: false,
      rtt: null,
      bytes: null,
      kbps: null,
      msPerKB: null
    };
  }
}

// ============================================================================
// 2. Classifiers — PRESSURE & FLOW INTERPRETATION
// ============================================================================
function classifyBars(latency) {
  log(SUBSYSTEM, "classifyBars()", { latency });
  bpLog("CLASSIFY_BARS", { latency });

  if (latency == null) return 1;
  if (latency < 80) return 4;
  if (latency < 110) return 3;
  if (latency < 160) return 2;
  return 1;
}

function classifyNetworkHealth(latency) {
  log(SUBSYSTEM, "classifyNetworkHealth()", { latency });
  bpLog("CLASSIFY_HEALTH", { latency });

  if (latency == null) return "Unknown";
  if (latency < 90) return "Excellent";
  if (latency < 120) return "Good";
  if (latency < 180) return "Weak";
  return "Poor";
}

// ============================================================================
// 3. Public API — NORMALIZED VITAL SIGNS PACKET
// ============================================================================
async function getPulseTelemetry() {
  log(SUBSYSTEM, "getPulseTelemetry()");
  bpLog("TELEMETRY_START");

  const ping = await measureLatency();

  const latency = ping.rtt;
  const kbps = ping.kbps;

  log(SUBSYSTEM, "Telemetry values", { latency, kbps });
  bpLog("TELEMETRY_VALUES", { latency, kbps });

  const pulsebandBars = classifyBars(latency);
  const networkHealth = classifyNetworkHealth(latency);

  log(SUBSYSTEM, "Telemetry classified", { pulsebandBars, networkHealth });
  bpLog("TELEMETRY_CLASSIFIED", { pulsebandBars, networkHealth });

  const snapshot = {
    lastChunkDurationMs: latency,
    lastChunkSizeKB: kbps ? kbps / 8 : null,
    lastChunkKbps: kbps ?? null,
    lastChunkIndex: Date.now()
  };

  log(SUBSYSTEM, "Snapshot built", snapshot);
  bpLog("SNAPSHOT_BUILT", snapshot);

  const result = {
    live: {
      latency,
      phoneKbps: kbps,
      appKbps: kbps,
      pulsebandBars,
      phoneBars: 4,
      networkHealth,
      route: "Primary",
      state: "active",
      microWindowActive: true,
      lastSyncTimestamp: Date.now()
    },
    snapshot
  };

  log(SUBSYSTEM, "Telemetry ready");
  bpLog("TELEMETRY_READY", result);

  return result;
}

// ============================================================================
// Exported API — HEMODYNAMIC MONITOR
// ============================================================================
export const PulseUpdate = {
  measureLatency,
  getPulseTelemetry
};
