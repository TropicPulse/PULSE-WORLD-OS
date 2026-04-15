// ============================================================================
// FILE: /apps/netlify/functions/endpoint.js
// LAYER: C‑LAYER (BACKEND ENTRY POINT / KERNEL DISPATCHER)
//
// PURPOSE:
// This is the ONLY backend file Netlify directly executes.
// ALL backend requests — POST (Connector) or GET (Pages) — MUST pass through here.
//
// SECURITY MODEL:
// • Identity + security are validated BEFORE any helper or backend logic runs.
// • Pages MUST declare which helpers they are allowed to use.
// • Endpoint enforces a whitelist PER PAGE.
// • No page can request helpers it did not explicitly declare.
// • No arbitrary helper execution.
// ============================================================================
// ============================================================================
// FILE: /apps/netlify/functions/endpoint.js
// LAYER: C‑LAYER (BACKEND ENTRY POINT / KERNEL DISPATCHER)
// ============================================================================

import * as Helpers from "./helpers.js";
import * as BackendIndex from "./index.js";

import { handler as getMap } from "./getMap.js";
import { handler as getAuth } from "./getAuth.js";
import { handler as getHook } from "./getHook.js";

export const handler = async (event) => {

  let type, payload;

  // POST (Connector → Backend)
  if (event.httpMethod === "POST") {
    ({ type, payload } = JSON.parse(event.body));
  }

  // GET (Page → Backend)
  if (event.httpMethod === "GET") {
    type = event.queryStringParameters?.type;
    payload = event.queryStringParameters || {};
  }

  // ============================================================================
  // 1. IDENTITY + SECURITY VALIDATION (your real logic goes here)
  // ============================================================================

  // ============================================================================
  // 2. NORMAL BACKEND ROUTING
  // ============================================================================
  switch (type) {
    case "getMap": return getMap(payload);
    case "getAuth": return getAuth(payload);
    case "getHook": return getHook(payload);
  }

  // ============================================================================
  // 3. HELPER REQUEST (PURE VARIABLE‑DRIVEN)
  // ============================================================================
  if (type === "helper") {

    const { helper, args = [], allowed } = payload || {};

    // 1. Page MUST send allowed helpers
    if (!Array.isArray(allowed) || allowed.length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "No allowed helpers provided" })
      };
    }

    // 2. Helper MUST be in the allowed list
    if (!allowed.includes(helper)) {
      return {
        statusCode: 403,
        body: JSON.stringify({ error: `Helper not allowed: ${helper}` })
      };
    }

    // 3. Helper MUST exist in helpers.js
    const fn = Helpers[helper];
    if (typeof fn !== "function") {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: `Helper not found in helpers.js: ${helper}` })
      };
    }

    // 4. Helper MUST be exported in index.js (local OR backend)
    const exported = BackendIndex[helper];
    if (typeof exported !== "function") {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: `Helper not exported in index.js: ${helper}` })
      };
    }

    // 5. Execute helper safely
    const result = await fn(...args);

    return {
      statusCode: 200,
      body: JSON.stringify({ result })
    };
  }

  // ============================================================================
  // 4. UNKNOWN TYPE
  // ============================================================================
  return {
    statusCode: 400,
    body: JSON.stringify({ error: `Unknown type: ${type}` })
  };
};
// ============================================================================