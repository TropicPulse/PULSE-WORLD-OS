/* ============================================================
   PulseUpdate.js — v6 (ES Module, OS‑safe)
   Purpose: Simple telemetry → returns normalized metrics
   Notes:
     - No PulseBand imports
     - No PulseNet imports
     - No globals
     - Pure subsystem module
   ============================================================ */

/* ------------------------------------------------------------
   1. Simple upstream latency probe
------------------------------------------------------------ */
async function measureLatency(url = "/pulse-proxy/ping") {
  const start = performance.now();
  try {
    const res = await fetch(url, { cache: "no-store" });
    const t = performance.now() - start;

    let data = {};
    try {
      data = await res.json();
    } catch {
      // ignore body parse errors
    }

    return {
      ok: res.ok,
      rtt: data.rtt ?? t,
      bytes: data.bytes ?? null,
      kbps: data.kbps ?? null,
      msPerKB: data.msPerKB ?? null
    };
  } catch {
    return { ok: false, rtt: null, bytes: null, kbps: null, msPerKB: null };
  }
}

/* ------------------------------------------------------------
   2. Classifiers
------------------------------------------------------------ */
function classifyBars(latency) {
  if (latency == null) return 1;
  if (latency < 80) return 4;
  if (latency < 110) return 3;
  if (latency < 160) return 2;
  return 1;
}

function classifyNetworkHealth(latency) {
  if (latency == null) return "Unknown";
  if (latency < 90) return "Excellent";
  if (latency < 120) return "Good";
  if (latency < 180) return "Weak";
  return "Poor";
}

/* ------------------------------------------------------------
   3. Public API: return normalized telemetry
------------------------------------------------------------ */
async function getPulseTelemetry() {
  const ping = await measureLatency();

  const latency = ping.rtt;
  const kbps = ping.kbps;
  const pulsebandBars = classifyBars(latency);
  const networkHealth = classifyNetworkHealth(latency);

  const snapshot = {
    lastChunkDurationMs: latency,
    lastChunkSizeKB: kbps ? kbps / 8 : null,
    lastChunkKbps: kbps ?? null,
    lastChunkIndex: Date.now()
  };

  return {
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
}

/* ------------------------------------------------------------
   Exported API
------------------------------------------------------------ */
export const PulseUpdate = {
  measureLatency,
  getPulseTelemetry
};
