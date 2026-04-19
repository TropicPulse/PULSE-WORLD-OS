// ============================================================================
// FILE: /apps/lib/Connectors/PulseUpdate.js
// LAYER: HEMODYNAMIC MONITOR (Pressure + Flow + Reflex Trigger Layer) — v7.1+
// ============================================================================
//
// ROLE (v7.1+):
//   THE HEMODYNAMIC MONITOR — The organism’s circulatory vital‑signs layer.
//   • Measures upstream pressure (latency)
//   • Measures flow rate (kbps)
//   • Classifies circulatory health
//   • Builds normalized telemetry packets
//   • Triggers reflex responses in the Nervous System (PulseBand)
//
// CONTRACT (v7.1+):
//   • No PulseBand imports
//   • No PulseNet imports
//   • No global state
//   • Pure subsystem module
//
// SAFETY (v7.1+):
//   • v7.1+ upgrade is COMMENTAL + DIAGNOSTIC ONLY — NO LOGIC CHANGES
//   • All behavior remains identical to pre‑v7.1 PulseUpdate
// ============================================================================

// ============================================================================
// LAYER CONSTANTS + DIAGNOSTICS
// ============================================================================
const BLOODPRESSURE_LAYER_ID = "HEMODYNAMIC-LAYER";
const BLOODPRESSURE_LAYER_NAME = "THE HEMODYNAMIC MONITOR";
const BLOODPRESSURE_LAYER_ROLE = "Pressure + Flow + Reflex Trigger Layer";

const BLOODPRESSURE_DIAGNOSTICS_ENABLED =
  window?.PULSE_BLOODPRESSURE_DIAGNOSTICS === true ||
  window?.PULSE_DIAGNOSTICS === true;

const bpLog = (stage, details = {}) => {
  if (!BLOODPRESSURE_DIAGNOSTICS_ENABLED) return;

  console.log(
    JSON.stringify({
      pulseLayer: BLOODPRESSURE_LAYER_ID,
      pulseName: BLOODPRESSURE_LAYER_NAME,
      pulseRole: BLOODPRESSURE_LAYER_ROLE,
      stage,
      ...details
    })
  );
};

bpLog("HEMODYNAMIC_INIT", {});
window.PULSE_LOG = function (...args) {
  try {
    console.log("[PULSE]", ...args);
  } catch (err) {
    console.error("PULSE_LOG failed:", err);
  }
};

// ============================================================================
// 1. Upstream latency probe — PRESSURE MEASUREMENT
// ============================================================================
async function measureLatency(url = "/pulse-proxy/ping") {
  window.PULSE_LOG(`PulseUpdate → measureLatency() called (${url})`);
  bpLog("MEASURE_LATENCY_START", { url });

  const start = performance.now();

  try {
    const res = await fetch(url, { cache: "no-store" });
    const t = performance.now() - start;

    window.PULSE_LOG(`PulseUpdate → ping returned in ${t.toFixed(1)}ms`);
    bpLog("PING_SUCCESS", { durationMs: t });

    let data = {};
    try {
      data = await res.json();
      window.PULSE_LOG("PulseUpdate → ping JSON parsed");
      bpLog("PING_JSON_PARSED");
    } catch {
      window.PULSE_LOG("PulseUpdate → ping JSON parse failed (ignored)");
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
    window.PULSE_LOG("PulseUpdate → ping FAILED");
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
  window.PULSE_LOG(`PulseUpdate → classifyBars(${latency})`);
  bpLog("CLASSIFY_BARS", { latency });

  if (latency == null) return 1;
  if (latency < 80) return 4;
  if (latency < 110) return 3;
  if (latency < 160) return 2;
  return 1;
}

function classifyNetworkHealth(latency) {
  window.PULSE_LOG(`PulseUpdate → classifyNetworkHealth(${latency})`);
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
  window.PULSE_LOG("PulseUpdate → getPulseTelemetry()");
  bpLog("TELEMETRY_START");

  const ping = await measureLatency();

  const latency = ping.rtt;
  const kbps = ping.kbps;

  window.PULSE_LOG(`PulseUpdate → latency=${latency}, kbps=${kbps}`);
  bpLog("TELEMETRY_VALUES", { latency, kbps });

  const pulsebandBars = classifyBars(latency);
  const networkHealth = classifyNetworkHealth(latency);

  window.PULSE_LOG(`PulseUpdate → bars=${pulsebandBars}, health=${networkHealth}`);
  bpLog("TELEMETRY_CLASSIFIED", { pulsebandBars, networkHealth });

  const snapshot = {
    lastChunkDurationMs: latency,
    lastChunkSizeKB: kbps ? kbps / 8 : null,
    lastChunkKbps: kbps ?? null,
    lastChunkIndex: Date.now()
  };

  window.PULSE_LOG("PulseUpdate → snapshot built");
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

  window.PULSE_LOG("PulseUpdate → telemetry ready");
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
