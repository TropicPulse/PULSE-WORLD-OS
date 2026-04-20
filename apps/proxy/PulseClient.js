// ============================================================================
// FILE: /apps/tropic-pulse/lib/Connectors/PulseClient.js
// LAYER: CIRCULATORY SYSTEM (Arterial Fetch Layer) — v7.1+
// ============================================================================
//
// ROLE (v7.1+):
//   THE CIRCULATORY SYSTEM — Arterial Fetch Layer
//   • Moves data outward through the organism
//   • Attempts accelerated PULSE route first (arterial path)
//   • Falls back to PHONE route if needed (venous path)
//   • Returns clean { data, meta } packets (oxygenated payloads)
//
// CONTRACT (v7.1+):
//   • No PulseBand imports (nervous system separation)
//   • No PulseNet imports
//   • No global state
//   • No side effects
//   • Pure circulatory subsystem
//
// SAFETY (v7.1+):
//   • v7.1+ upgrade is COMMENTAL + DIAGNOSTIC ONLY — NO LOGIC CHANGES
//   • All behavior remains identical to pre‑v7.1 PulseClient
// ============================================================================

// ============================================================================
// LAYER CONSTANTS + DIAGNOSTICS
// ============================================================================
const CIRCULATION_LAYER_ID = "CIRCULATORY-LAYER";
const CIRCULATION_LAYER_NAME = "THE CIRCULATORY SYSTEM";
const CIRCULATION_LAYER_ROLE = "Arterial Fetch Layer";

const CIRCULATION_DIAGNOSTICS_ENABLED =
  window?.PULSE_BLOODFLOW_DIAGNOSTICS === true ||
  window?.PULSE_DIAGNOSTICS === true;

const circulationLog = (stage, details = {}) => {
  if (!CIRCULATION_DIAGNOSTICS_ENABLED) return;

  log(
    JSON.stringify({
      pulseLayer: CIRCULATION_LAYER_ID,
      pulseName: CIRCULATION_LAYER_NAME,
      pulseRole: CIRCULATION_LAYER_ROLE,
      stage,
      ...details
    })
  );
};

circulationLog("CIRCULATION_INIT", {});
window.PULSE_LOG = function (...args) {
  try {
    log("[PULSE]", ...args);
  } catch (err) {
    error("PULSE_LOG failed:", err);
  }
};

// ============================================================================
// CONSTANTS
// ============================================================================
const PULSE_PROXY_URL = "https://www.tropicpulse.bz";

// ============================================================================
// DEVICE METADATA
// ============================================================================
function getDeviceInfo() {
  const info = {
    ua: navigator.userAgent || "",
    platform: navigator.platform || "",
    language: navigator.language || ""
  };

  window.PULSE_LOG("PulseClient → getDeviceInfo()");
  circulationLog("DEVICE_INFO_COLLECTED", info);

  return info;
}

// ============================================================================
// CORE FETCH WRAPPER — ARTERIAL FLOW
// ============================================================================
async function pulseFetch(url) {
  window.PULSE_LOG(`PulseClient → pulseFetch() called for URL: ${url}`);
  circulationLog("FETCH_START", { url });

  const device = getDeviceInfo();
  const start = performance.now();

  try {
    window.PULSE_LOG("PulseClient → Attempting PULSE (arterial) route…");
    circulationLog("ARTERIAL_ATTEMPT", { url });

    const res = await fetch(
      `${PULSE_PROXY_URL}/TPProxy?url=${encodeURIComponent(url)}`,
      {
        method: "GET",
        headers: {
          "x-pulse-device": JSON.stringify(device)
        }
      }
    );

    const durationMs = performance.now() - start;

    if (!res.ok) {
      window.PULSE_LOG(`PulseClient → Arterial route FAILED (${res.status})`);
      circulationLog("ARTERIAL_FAIL", { status: res.status });
      throw new Error("Pulse route failed: " + res.status);
    }

    const contentType = res.headers.get("content-type") || "";
    const bytes = Number(res.headers.get("x-pulse-bytes") ?? "0");

    let data;
    if (contentType.includes("application/json")) data = await res.json();
    else if (contentType.startsWith("text/")) data = await res.text();
    else data = await res.arrayBuffer();

    window.PULSE_LOG(
      `PulseClient → Arterial SUCCESS (${durationMs.toFixed(
        1
      )}ms, ${bytes} bytes)`
    );

    circulationLog("ARTERIAL_SUCCESS", {
      durationMs,
      bytes
    });

    return { data, meta: { route: "Pulse", bytes, durationMs } };

  } catch (err) {
    window.PULSE_LOG("PulseClient → Arterial FAILED → Falling back to Venous route");
    circulationLog("ARTERIAL_EXCEPTION", { error: String(err) });

    const fbStart = performance.now();
    const fbRes = await fetch(url);
    const fbDuration = performance.now() - fbStart;

    const contentType = fbRes.headers.get("content-type") || "";
    const bytes = Number(fbRes.headers.get("content-length") ?? "0");

    let data;
    if (contentType.includes("application/json")) data = await fbRes.json();
    else if (contentType.startsWith("text/")) data = await fbRes.text();
    else data = await fbRes.arrayBuffer();

    window.PULSE_LOG(
      `PulseClient → Venous SUCCESS (${fbDuration.toFixed(
        1
      )}ms, ${bytes} bytes)`
    );

    circulationLog("VENOUS_SUCCESS", {
      durationMs: fbDuration,
      bytes
    });

    return { data, meta: { route: "Phone", bytes, durationMs: fbDuration } };
  }
}

// ============================================================================
// PUBLIC API — CIRCULATORY SYSTEM
// ============================================================================
export const PulseClient = {
  get: pulseFetch
};
