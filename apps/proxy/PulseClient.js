// ============================================================================
// FILE: /apps/tropic-pulse/lib/Connectors/PulseClient.js
// LAYER: CIRCULATORY SYSTEM (Arterial Fetch Layer) — v7.4
// ============================================================================
//
// ROLE (v7.4):
//   THE CIRCULATORY SYSTEM — Arterial Fetch Layer
//   • Moves data outward through the organism
//   • Attempts accelerated PULSE route first (arterial path)
//   • Falls back to PHONE route if needed (venous path)
//   • Returns clean { data, meta } packets (oxygenated payloads)
//
// CONTRACT (v7.4):
//   • No PulseBand imports
//   • No PulseNet imports
//   • No global state
//   • No side effects
//   • Pure circulatory subsystem
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
const SUBSYSTEM = "circulation";

// ============================================================================
// LAYER CONSTANTS + DIAGNOSTICS
// ============================================================================
const CIRCULATION_LAYER_ID = "CIRCULATORY-LAYER";
const CIRCULATION_LAYER_NAME = "THE CIRCULATORY SYSTEM";
const CIRCULATION_LAYER_ROLE = "Arterial Fetch Layer";

const CIRCULATION_DIAGNOSTICS_ENABLED =
  window?.PULSE_BLOODFLOW_DIAGNOSTICS === true ||
  window?.PULSE_DIAGNOSTICS === true;

// v7.4: circulationLog now uses proper subsystem logging
const circulationLog = (stage, details = {}) => {
  if (!CIRCULATION_DIAGNOSTICS_ENABLED) return;

  log(SUBSYSTEM, stage, {
    pulseLayer: CIRCULATION_LAYER_ID,
    pulseName: CIRCULATION_LAYER_NAME,
    pulseRole: CIRCULATION_LAYER_ROLE,
    ...details
  });

  emitTelemetry(SUBSYSTEM, stage, details);
};

circulationLog("CIRCULATION_INIT");

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

  log(SUBSYSTEM, "Device info collected", info);
  circulationLog("DEVICE_INFO_COLLECTED", info);

  return info;
}

// ============================================================================
// CORE FETCH WRAPPER — ARTERIAL FLOW
// ============================================================================
async function pulseFetch(url) {
  log(SUBSYSTEM, "pulseFetch() called", { url });
  circulationLog("FETCH_START", { url });

  const device = getDeviceInfo();
  const start = performance.now();

  try {
    log(SUBSYSTEM, "Attempting arterial route", { url });
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
      warn(SUBSYSTEM, "Arterial route failed", { status: res.status });
      circulationLog("ARTERIAL_FAIL", { status: res.status });
      throw new Error("Pulse route failed: " + res.status);
    }

    const contentType = res.headers.get("content-type") || "";
    const bytes = Number(res.headers.get("x-pulse-bytes") ?? "0");

    let data;
    if (contentType.includes("application/json")) data = await res.json();
    else if (contentType.startsWith("text/")) data = await res.text();
    else data = await res.arrayBuffer();

    log(SUBSYSTEM, "Arterial success", { durationMs, bytes });
    circulationLog("ARTERIAL_SUCCESS", { durationMs, bytes });

    return { data, meta: { route: "Pulse", bytes, durationMs } };

  } catch (err) {
    warn(SUBSYSTEM, "Arterial failed → falling back to venous", { error: String(err) });
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

    log(SUBSYSTEM, "Venous success", { durationMs: fbDuration, bytes });
    circulationLog("VENOUS_SUCCESS", { durationMs: fbDuration, bytes });

    return { data, meta: { route: "Phone", bytes, durationMs: fbDuration } };
  }
}

// ============================================================================
// PUBLIC API — CIRCULATORY SYSTEM
// ============================================================================
export const PulseClient = {
  get: pulseFetch
};
