// ============================================================================
// FILE: /apps/lib/Connectors/PageScanner.js
// LAYER: C‑LAYER (PUBLIC FRONTEND API)
// ============================================================================

import { route } from "./router.js";

// ------------------------------------------------------------
// ⭐ HUMAN‑READABLE FILE MAP (LAYER + PURPOSE + CONTEXT)
// ------------------------------------------------------------
const FILE_MAP = {
  "router.js": {
    label: "ROUTER",
    layer: "C‑Layer",
    purpose: "Frontend → Backend Connector",
    context: "Sends structured requests to backend router"
  },
  "PageScanner.js": {
    label: "SCANNER",
    layer: "A2‑Layer",
    purpose: "Error Capture + Healing",
    context: "Intercepts JS errors, extracts route, triggers healing"
  },
  "PulseIdentity.js": {
    label: "IDENTITY",
    layer: "B‑Layer",
    purpose: "Auth + UID + User Context",
    context: "Resolves identity, tokens, and user state"
  },
  "PulseClient.js": {
    label: "CLIENT",
    layer: "B‑Layer",
    purpose: "Data Fetch / Hooks / Maps",
    context: "Fetches user data, maps, hooks, and dynamic fields"
  },
  "PulseNet.js": {
    label: "NETWORK",
    layer: "B‑Layer",
    purpose: "Low‑Level Fetch Wrapper",
    context: "Handles raw network requests + retries"
  },
  "PulseUpdate.js": {
    label: "UPDATE",
    layer: "B‑Layer",
    purpose: "Firestore Writes",
    context: "Writes user data and system updates"
  },
  "PulseGPU.js": {
    label: "GPU",
    layer: "B‑Layer",
    purpose: "Heavy Compute Ops",
    context: "Runs expensive calculations"
  },
  "CheckEmail.js": {
    label: "PAGE",
    layer: "A‑Layer",
    purpose: "CheckEmail.html Logic",
    context: "Handles UI + user input for email verification"
  },
  "Login.js": {
    label: "PAGE",
    layer: "A‑Layer",
    purpose: "Login.html Logic",
    context: "Handles login UI + flow"
  },
  "Dashboard.js": {
    label: "PAGE",
    layer: "A‑Layer",
    purpose: "Dashboard.html Logic",
    context: "Displays user dashboard + data"
  }
};

// ------------------------------------------------------------
// ⭐ PUBLIC API (C‑LAYER)
// ------------------------------------------------------------
export async function getAuth(jwtToken) {
  return await route("auth", { jwtToken });
}

export async function getHook(name, payload = {}) {
  return await route("hook", { name, payload });
}

export async function getMap(mapName) {
  return await route("map", { mapName });
}

export async function callHelper(helperName, payload = {}) {
  return await route("helper", { helperName, payload });
}

// ------------------------------------------------------------
// ⭐ ATTACH SCANNER
// ------------------------------------------------------------
export function attachScanner(id) {
  if (!id) return;

  window.tp_identity = id;

  console.log(
    "%c[PageScanner] Attached with identity: " + id.uid,
    "color: #4CAF50; font-weight: bold;"
  );
}

// ------------------------------------------------------------
// ⭐ GLOBAL ERROR INTERCEPTOR (A → A2)
// ------------------------------------------------------------
let healingInProgress = false;

window.addEventListener("error", async (event) => {
  if (healingInProgress) return;

  const msg = event.message || "";
  const stack = event.error?.stack || "";
  const frames = stack.split("\n").map(s => s.trim());

  // Extract JS frames
  const rawFrames = frames
    .filter(f => f.includes(".js"))
    .map(f => f.replace(/^at\s+/, ""));

  // ------------------------------------------------------------
  // ⭐ CONTEXT‑AWARE ROUTE TRACE
  // ------------------------------------------------------------
  const routeTrace = rawFrames.map((frame) => {
    const file = frame.split("/").pop().split(":")[0];
    const info = FILE_MAP[file] || {
      label: "UNKNOWN",
      layer: "⚠️ Unknown Layer",
      purpose: "Unknown Purpose",
      context: "No mapping found — inspect manually"
    };
    return { frame, ...info };
  });

  // ------------------------------------------------------------
  // ⭐ COLOR‑CODED OUTPUT
  // ------------------------------------------------------------
  console.group("%c🔥 PULSE ERROR TRACE", "color: #FF5252; font-weight: bold;");

  console.log("%cMessage:", "color: #FF5252; font-weight: bold;", msg);
  console.log("%cPage:", "color: #FFC107; font-weight: bold;", window.location.pathname);

  console.log("%cRoute Trace:", "color: #03A9F4; font-weight: bold;");
  routeTrace.forEach((r, i) => {
    console.log(
      `%c${i+1}. ${r.frame}
     → ${r.label} — ${r.layer}
     → ${r.purpose}
     → ${r.context}`,
      "color: #E91E63; font-weight: bold;"
    );
  });

  console.groupEnd();

  // ------------------------------------------------------------
  // ⭐ EXISTING HEALING LOGIC
  // ------------------------------------------------------------
  const parsed = parseMissingField(msg);
  if (!parsed) return;

  const { table, field } = parsed;

  healingInProgress = true;

  console.warn(
    "%c[PageScanner] Missing: " + `${table}.${field}`,
    "color: #FFC107; font-weight: bold;"
  );

  try {
    await route("fetchField", {
      table,
      field,
      message: msg,
      page: window.location.pathname,
      routeTrace
    });

    console.log(
      "%c[PageScanner] Healing request sent successfully",
      "color: #4CAF50; font-weight: bold;"
    );

  } catch (err) {
    console.error(
      "%c[PageScanner] Router fetch failed:",
      "color: #FF5252; font-weight: bold;",
      err
    );
  }

  healingInProgress = false;

  event.preventDefault();
}, true);

// ------------------------------------------------------------
// ⭐ PARSER
// ------------------------------------------------------------
function parseMissingField(message) {
  let match = message.match(/reading '([^']+)'/);
  if (match) return { table: "Users", field: match[1] };

  match = message.match(/([^ ]+) is not defined/);
  if (match) return { table: "Users", field: match[1] };

  match = message.match(/property '([^']+)'/);
  if (match) return { table: "Users", field: match[1] };

  return null;
}
