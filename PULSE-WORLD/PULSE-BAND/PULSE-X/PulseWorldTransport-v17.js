// FILE: tropic-pulse-functions/PULSE-WORLD/PULSE-X/PulseWorldTransport.js
// IMMORTAL GLOBAL CORS ORGAN — v17
//
// INTENT-CHECK: If you paste this while confused or frustrated, gently re-read your INTENT; 
// if I am unsure of intent, I will ask you for the full INTENT paragraph.
//
// 📘 PAGE INDEX — Source of Truth for This File
//
// ROLE:
//   Shared HTTP utilities for Tropic Pulse, including:
//     • pulseCors — universal CORS middleware for all Netlify functions
//     • corsHandler — legacy alias for backward compatibility
//     • fetch — server‑side fetch (node-fetch) re-export
//   This file is LOGIC‑ONLY — it must NOT contain Netlify handlers.
//   Safe to import from any Netlify function or logic module.
//
// DEPLOYMENT:
//   PRIMARY HOST: Netlify (all backend execution runs here)
//   BACKUP HOSTS: Cloudflare + Firebase Hosting (static/CDN only)
//   Firebase Functions = deprecated — do NOT add new Firebase Functions code
//
// CORS RULES:
//   • Allow-Origin: *
//   • Allow-Headers: Content-Type, Authorization, X-Pulse-Device, X-Pulse-Remember, X-Requested-With, *
//   • Allow-Methods: GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS
//   • OPTIONS requests MUST return 204 immediately
//   • Middleware must remain deterministic and side‑effect‑free
//
// SYNTAX RULES:
//   ESM JavaScript ONLY — no TypeScript, no CommonJS, no require()
//   ALWAYS use named exports
//   NEVER use default exports
//
// SAFETY NOTES:
//   • CORS must remain consistent across all endpoints
//   • Do NOT weaken CORS rules without explicit approval
//   • fetch re-export must remain stable for server-side HTTP calls
//
//PLEASE REMEMBER WE OUR PROXYING THEIR DEVICES.. EVERY SINGLE INTERNET CONNECTION OR PAGE OR ANYTHING GOES THROUGH HERE.. WE MUST CORS EVERYTHING TO ALLOW EVERYTHING OR WE ARE BLOCKING THEM
/*
AI_EXPERIENCE_META = {
  identity: "PulseWorldTransport",
  version: "v17",
  layer: "backend_boundary",
  role: "cors_enforcement_organ",
  lineage: "PulseCors, PulseWorldTransport",

  evo: {
    boundaryCore: true,
    deterministic: true,
    dualBand: true,
    symbolicAware: true,
    binaryAware: true,
    safeRouteFree: true,
    driftProof: true,
    zeroMutationOfInput: true,
    zeroRandomness: true,
    zeroTimers: true,
    zeroNetworkFetch: true,
    zeroExternalMutation: true
  },

  contract: {
    always: [
      "PulseProxy",
      "PulseRouter",
      "PulseBinaryRouter",
      "CheckIdentity",
      "CheckBand"
    ],
    never: [
      "legacyCors",
      "legacyBoundary",
      "safeRoute",
      "fetchViaCNS"
    ]
  }
}
*/


import fetch from "node-fetch";

/* ============================================================================
   META — IMMORTAL CORS ORGAN
   ----------------------------------------------------------------------------
   ROLE:
     • Universal CORS membrane for ALL backend endpoints.
     • Ensures NOTHING is blocked.
     • Ensures ALL devices, ALL browsers, ALL proxies pass through cleanly.

   GUARANTEES:
     • Allow-Origin: *
     • Allow-Headers: EVERYTHING
     • Allow-Methods: EVERYTHING
     • OPTIONS returns 204 immediately
     • Zero randomness
     • Zero mutation
     • Zero drift
     • Zero side effects
     • Zero branching
   ============================================================================ */

export function pulseCors(req, res, next) {
  // UNIVERSAL ORIGIN
  res.set("Access-Control-Allow-Origin", "*");

  // UNIVERSAL HEADERS
  res.set(
    "Access-Control-Allow-Headers",
    [
      "Content-Type",
      "Authorization",
      "X-Pulse-Device",
      "X-Pulse-Remember",
      "X-Requested-With",
      "X-Pulse-Session",
      "X-Pulse-Identity",
      "X-Pulse-Band",
      "X-Pulse-World",
      "*"
    ].join(", ")
  );

  // UNIVERSAL METHODS
  res.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS"
  );

  // 24h preflight cache
  res.set("Access-Control-Max-Age", "86400");

  // PRE-FLIGHT EXIT
  if (req.method === "OPTIONS") {
    return res.status(204).send("");
  }

  // CONTINUE
  next();
}

/* ============================================================================
   LEGACY ALIAS (BACKWARD COMPATIBILITY)
   ============================================================================ */
export const corsHandler = pulseCors;

/* ============================================================================
   OPTIONAL EXPRESS-STYLE CORS WRAPPER
   (Allows: cors(req, res) usage)
   ============================================================================ */
export function cors(req, res, next) {
  return pulseCors(req, res, next);
}

/* ============================================================================
   EXPORT FETCH (SERVER-SIDE)
   ============================================================================ */
export { fetch };
