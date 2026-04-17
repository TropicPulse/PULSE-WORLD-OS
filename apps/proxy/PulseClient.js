/* ============================================================
   PulseClient.js — PulseClient v6 (ES Module, OS‑safe)
   Purpose: Thin fetch wrapper → returns data + meta
   Notes:
     - Does NOT import PulseBand or PulseNet
     - Does NOT touch globals
     - Pure subsystem module
   ============================================================ */

const PULSE_PROXY_URL = "https://www.tropicpulse.bz";

/* ------------------------------------------------------------
   Basic metadata helpers
------------------------------------------------------------ */
function getDeviceInfo() {
  return {
    ua: navigator.userAgent || "",
    platform: navigator.platform || "",
    language: navigator.language || ""
  };
}

/* ------------------------------------------------------------
   Core fetch wrapper (v6)
------------------------------------------------------------ */
async function pulseFetch(url) {
  const device = getDeviceInfo();
  const start = performance.now();

  try {
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

    if (!res.ok) throw new Error("Pulse route failed: " + res.status);

    const contentType = res.headers.get("content-type") || "";
    const bytes = Number(res.headers.get("x-pulse-bytes") ?? "0");

    let data;
    if (contentType.includes("application/json")) data = await res.json();
    else if (contentType.startsWith("text/")) data = await res.text();
    else data = await res.arrayBuffer();

    return { data, meta: { route: "Pulse", bytes, durationMs } };

  } catch (err) {
    const fbStart = performance.now();
    const fbRes = await fetch(url);
    const fbDuration = performance.now() - fbStart;

    const contentType = fbRes.headers.get("content-type") || "";
    const bytes = Number(fbRes.headers.get("content-length") ?? "0");

    let data;
    if (contentType.includes("application/json")) data = await fbRes.json();
    else if (contentType.startsWith("text/")) data = await fbRes.text();
    else data = await fbRes.arrayBuffer();

    return { data, meta: { route: "Phone", bytes, durationMs: fbDuration } };
  }
}

/* ------------------------------------------------------------
   Public API
------------------------------------------------------------ */
export const PulseClient = {
  get: pulseFetch
};
