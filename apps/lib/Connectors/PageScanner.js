// ============================================================================
// FILE: /apps/lib/Connectors/PageScanner.js
// PULSE ERROR GUARDIAN — v7.1
// “THE SENTINEL / THE IMMUNE SCOUT LAYER”
// ============================================================================
//
// THEME v7.1:
//   • Same organ, smarter nervous system
//   • Adds router-style guards at page level
//   • Classifies page errors before they ever hit the router
//   • Keeps healing behavior unchanged for missing-field patterns
//
// ROLE — “THE PROTECTOR”
//   • Intercepts JS errors
//   • Extracts stack frames + route context
//   • Builds a dynamic route trace (no file-name hardcoding)
//   • Triggers backend healing deterministically (for missing fields)
//   • Classifies page-level failures (import/env/recursion) early
// ============================================================================


// ============================================================================
// LAYER CONSTANTS + DIAGNOSTICS
// ============================================================================
const LAYER_ID = "PROTECTOR-LAYER";
const LAYER_NAME = "THE PROTECTOR";
const LAYER_ROLE = "ERROR GUARDIAN & HEALING TRIGGER";

const PROTECTOR_DIAGNOSTICS_ENABLED =
  window.PULSE_PROTECTOR_DIAGNOSTICS === "true" ||
  window.PULSE_DIAGNOSTICS === "true";

const logProtector = (stage, details = {}) => {
  if (!PROTECTOR_DIAGNOSTICS_ENABLED) return;

  log(
    JSON.stringify({
      pulseLayer: LAYER_ID,
      pulseName: LAYER_NAME,
      pulseRole: LAYER_ROLE,
      stage,
      ...details
    })
  );
};


// ============================================================================
// ROUTE MEMORY (v7.0) — LIVING MAP, NOT CONFIG
// ============================================================================
const RouteMemory = {
  store: {},

  makeKey(message, frames) {
    const top = frames[0] || "NO_FRAME";
    return message + "::" + top;
  },

  remember(message, frames, routeTrace) {
    const key = this.makeKey(message, frames);
    this.store[key] = {
      ts: Date.now(),
      message,
      frames,
      routeTrace
    };

    logProtector("ROUTE_MEMORY_SAVED", {
      key,
      frames: frames.length
    });
  },

  recall(message, frames) {
    const key = this.makeKey(message, frames);
    const entry = this.store[key];

    if (!entry) return null;

    logProtector("ROUTE_MEMORY_HIT", {
      key,
      frames: entry.frames.length
    });

    return entry.routeTrace;
  }
};


// ============================================================================
// PUBLIC API (C‑LAYER)
// ============================================================================
import { route } from "./router.js";

export async function getAuth(jwtToken) {
  logProtector("GET_AUTH", {});
  return await route("auth", { jwtToken });
}

export async function getHook(name, payload = {}) {
  logProtector("GET_HOOK", { name });
  return await route("hook", { name, payload });
}

export async function getMap(mapName) {
  logProtector("GET_MAP", { mapName });
  return await route("map", { mapName });
}

export async function callHelper(helperName, payload = {}) {
  logProtector("CALL_HELPER", { helperName });
  return await route("helper", { helperName, payload });
}


// ============================================================================
// ATTACH SCANNER
// ============================================================================
export function attachScanner(id) {
  if (!id) {
    logProtector("ATTACH_NO_ID", {});
    return;
  }

  window.tp_identity = id;

  logProtector("ATTACH_OK", { uid: id.uid });

  log(
    "%c[PageScanner] Attached with identity: " + id.uid,
    "color: #4CAF50; font-weight: bold;"
  );
}


// ============================================================================
// GLOBAL ERROR INTERCEPTOR (A → A2)
// ============================================================================
let healingInProgress = false;

window.addEventListener(
  "error",
  async (event) => {
    if (healingInProgress) return;

    const msg = event.message || "";
    logProtector("ERROR_INTERCEPTED", { message: msg });

    // ------------------------------------------------------------------------
    // v7.1 — PAGE-LEVEL CLASSIFICATION (router-style guards)
    // ------------------------------------------------------------------------
    // These never touch backend logic or identity; they just classify and
    // prevent page-level failures from becoming organism killers.
    // ------------------------------------------------------------------------

    // 1) Import / module conflict (double import, circular, missing module)
    if (msg.includes("Cannot find module") || msg.includes("already been declared")) {
      logProtector("PAGE_IMPORT_CONFLICT", {
        error: "importConflict",
        details: msg
      });
      // Page-level classification only; router still has its own guard.
      return;
    }

    // 2) Env mismatch (process.env used in frontend)
    if (msg.includes("process is not defined")) {
      logProtector("PAGE_ENV_MISMATCH", {
        error: "frontendEnvMismatch",
        hint: "Replace process.env.* with window.PULSE_*"
      });
      // We don't push to RouterMemory here; this is a pure page-level signal.
      return;
    }

    // 3) Recursion / thrash at page level (above router)
    if (msg.includes("Maximum call stack size exceeded")) {
      logProtector("PAGE_RECURSION_LOOP", {
        error: "pageRecursionLoop",
        details: msg
      });
      // Router cannot see this; PageScanner is the only safe place to stop it.
      return;
    }

    const stack = event.error?.stack || "";
    const frames = stack.split("\n").map((s) => s.trim());

    const rawFrames = frames
      .filter((f) => f.includes(".js"))
      .map((f) => f.replace(/^at\s+/, ""));

    // If we have no frames, we still log and bail safely
    if (!rawFrames.length) {
      logProtector("NO_FRAMES_FOUND", {});
    }

    // ------------------------------------------------------------------------
    // ROUTE TRACE v7.0 — LIVING, NOT HARD-CODED
    // ------------------------------------------------------------------------
    let routeTrace = RouteMemory.recall(msg, rawFrames);

    if (!routeTrace) {
      routeTrace = rawFrames.map((frame, index) => {
        const file = frame.split("/").pop().split(":")[0];

        return {
          frame,
          file,
          index,
          label: "UNKNOWN",
          layer: "UNKNOWN",
          purpose: "Observed frame — classification deferred",
          context: "Dynamic route sample — evolutionary layer may annotate"
        };
      });

      logProtector("ROUTE_TRACE_BUILT_DYNAMIC", {
        frames: routeTrace.length
      });

      RouteMemory.remember(msg, rawFrames, routeTrace);
    }

    // ------------------------------------------------------------------------
    // HEALING LOGIC (unchanged core behavior)
// ------------------------------------------------------------------------
    const parsed = parseMissingField(msg);
    if (!parsed) {
      logProtector("NO_MISSING_FIELD", {});
      return;
    }

    const { table, field } = parsed;

    logProtector("HEALING_TRIGGERED", { table, field });

    healingInProgress = true;

    try {
      await route("fetchField", {
        table,
        field,
        message: msg,
        page: window.location.pathname,
        routeTrace
      });

      logProtector("HEALING_SUCCESS", { table, field });
    } catch (err) {
      logProtector("HEALING_FAILED", { error: String(err) });
      error("[PageScanner] Router fetch failed:", err);
    }

    healingInProgress = false;

    event.preventDefault();
  },
  true
);


// ============================================================================
// PARSER (v7.0 — same behavior, clearer intent)
// ============================================================================
function parseMissingField(message) {
  logProtector("PARSER_INVOKED", {});

  let match = message.match(/reading '([^']+)'/);
  if (match) return { table: "Users", field: match[1] };

  match = message.match(/([^ ]+) is not defined/);
  if (match) return { table: "Users", field: match[1] };

  match = message.match(/property '([^']+)'/);
  if (match) return { table: "Users", field: match[1] };

  return null;
}

// ============================================================================
// END OF FILE — THE SENTINEL / LIVING ROUTE MEMORY  [v7.1]
// ============================================================================
