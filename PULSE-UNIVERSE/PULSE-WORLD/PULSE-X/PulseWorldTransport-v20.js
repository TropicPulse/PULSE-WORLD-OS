// ============================================================================
// FILE: tropic-pulse-functions/PULSE-UNIVERSE/PULSE-X/PulseWorldTransport-v20.js
// PULSE‑WORLD TRANSPORT — IMMORTAL GLOBAL CORS ORGAN — v20‑IMMORTAL‑THROUGHPUT
// ----------------------------------------------------------------------------
// ROLE:
//   • Single, universal CORS + transport membrane for ALL Pulse‑World traffic.
//   • Every device, every browser, every proxy, every page → passes through here.
//   • Guarantees NOTHING is blocked at the HTTP boundary by CORS.
//   • Provides fast, deterministic helpers for Express/Netlify/Generic handlers.
//   • Logic‑only: NO framework binding, NO Netlify handler definitions.
// ----------------------------------------------------------------------------
// DESIGN GOALS (v20‑IMMORTAL‑THROUGHPUT):
//   • Max throughput: minimal branching, minimal allocations, hot‑path friendly.
//   • Max compatibility: works with Express‑style, Netlify‑style, generic adapters.
//   • Max openness: CORS “allow everything” while still deterministic and explicit.
//   • Zero surprises: same headers, same behavior, every request, every host.
// ============================================================================
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝

// 2 — EXPORT GENOME METADATA
// export const PulseBinaryWaveScannerMeta = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
// export const WBC_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

import fetch from "node-fetch";

// Universal “allow everything” surfaces — explicit, stable, immutable.
const ALLOW_ORIGIN = "*";

const ALLOW_METHODS = "GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS";

const ALLOW_HEADERS = [
  "Content-Type",
  "Authorization",
  "X-Pulse-Device",
  "X-Pulse-Remember",
  "X-Requested-With",
  "X-Pulse-Session",
  "X-Pulse-Identity",
  "X-Pulse-Band",
  "X-Pulse-World",
  "X-Pulse-Proxy",
  "X-Pulse-Route",
  "X-Pulse-Client",
  "X-Pulse-Forwarded-For",
  "X-Pulse-Trace",
  "*"
].join(", ");

// 24h preflight cache
const MAX_AGE_SECONDS = "86400";

// Pre‑built header object for generic environments (e.g. Netlify, raw HTTP).
export const PulseWorldCorsHeaders = Object.freeze({
  "Access-Control-Allow-Origin": ALLOW_ORIGIN,
  "Access-Control-Allow-Methods": ALLOW_METHODS,
  "Access-Control-Allow-Headers": ALLOW_HEADERS,
  "Access-Control-Max-Age": MAX_AGE_SECONDS
});

// ============================================================================
// LOW‑LEVEL HEADER APPLIERS
// ============================================================================

/**
 * Apply CORS headers to an Express‑style response object.
 * No branching, no randomness, no mutation of request.
 */
export function applyCorsHeadersToResponse(res) {
  // Assume res.set(name, value) exists (Express / Netlify‑express adapter).
  res.set("Access-Control-Allow-Origin", ALLOW_ORIGIN);
  res.set("Access-Control-Allow-Methods", ALLOW_METHODS);
  res.set("Access-Control-Allow-Headers", ALLOW_HEADERS);
  res.set("Access-Control-Max-Age", MAX_AGE_SECONDS);
  return res;
}

/**
 * Build a plain headers object for environments that expect a POJO.
 * Example: Netlify function return { statusCode, headers, body }.
 */
export function buildCorsHeaderObject(extraHeaders = null) {
  if (!extraHeaders) return PulseWorldCorsHeaders;
  return {
    ...PulseWorldCorsHeaders,
    ...extraHeaders
  };
}

// ============================================================================
// EXPRESS‑STYLE MIDDLEWARE — HOT PATH
// ============================================================================
//
// Usage (Express / Netlify‑express):
//   app.use(pulseCors);
//   exports.handler = (req, res) => { pulseCors(req, res, () => { ... }); }
// ============================================================================

export function pulseCors(req, res, next) {
  applyCorsHeadersToResponse(res);

  // PRE‑FLIGHT EXIT — OPTIONS always returns 204, empty body.
  if (req.method === "OPTIONS") {
    return res.status(204).send("");
  }

  // CONTINUE — no branching, no mutation of req.
  next();
}

// Legacy alias (backward compatibility)
export const corsHandler = pulseCors;

// Optional alias for code that expects cors(req, res, next)
export function cors(req, res, next) {
  return pulseCors(req, res, next);
}

// ============================================================================
// GENERIC CORS WRAPPERS — NON‑EXPRESS ENVIRONMENTS
// ============================================================================
//
// These helpers make it trivial to wrap Netlify / raw HTTP handlers without
// re‑implementing CORS logic. They are still logic‑only, no framework binding.
// ============================================================================

/**
 * Wrap a Netlify‑style handler:
 *   const handler = withPulseCorsNetlify(async (event, context) => { ... });
 */
export function withPulseCorsNetlify(handler) {
  return async function netlifyCorsWrapper(event, context) {
    const method = event.httpMethod || "GET";

    // Preflight: respond immediately with 204 + CORS headers.
    if (method === "OPTIONS") {
      return {
        statusCode: 204,
        headers: PulseWorldCorsHeaders,
        body: ""
      };
    }

    const result = await handler(event, context);

    // Ensure CORS headers are present on all responses.
    const headers = buildCorsHeaderObject(result?.headers || {});
    return {
      ...result,
      headers
    };
  };
}

/**
 * Wrap a generic async handler that returns { statusCode, headers, body }.
 */
export function withPulseCorsGeneric(handler) {
  return async function genericCorsWrapper(requestLike) {
    const method = requestLike?.method || requestLike?.httpMethod || "GET";

    if (method === "OPTIONS") {
      return {
        statusCode: 204,
        headers: PulseWorldCorsHeaders,
        body: ""
      };
    }

    const result = await handler(requestLike);
    const headers = buildCorsHeaderObject(result?.headers || {});
    return {
      ...result,
      headers
    };
  };
}

// ============================================================================
// FETCH RE‑EXPORT (SERVER‑SIDE HTTP)
// ============================================================================
//
// NOTE:
//   • This is a pure re‑export of node‑fetch for server‑side HTTP calls.
//   • PulseWorldTransport itself NEVER calls fetch — zeroNetworkFetch: true.
//   • Other organs MAY import { fetch } from here for consistency.
// ============================================================================

export { fetch };
