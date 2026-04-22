// ============================================================================
// FILE: /apps/PulseOS/Organs/Skin/PulseOSSkinReflex.js
// PULSE OS — v10.1
// “THE SKIN REFLEX / SURFACE EPITHELIAL MEMBRANE”
// A1 BARRIER • PAGE-LEVEL REFLEX • ZERO TIMING • ZERO STATE
// ============================================================================
//
// ORGAN IDENTITY (v10.1):
//   • Organ Type: Skin / Surface Membrane / Reflex Layer
//   • Layer: A1 (Page-Level Reflex)
//   • Biological Analog: Skin + surface epithelial membrane + nociceptors
//   • System Role: First-line error intake + classification at the page surface
//
// PURPOSE (v10.1):
//   ✔ Intercept JS errors at the page/surface level
//   ✔ Extract stack frames + route context
//   ✔ Build dynamic route traces (living map, not config)
//   ✔ Mark route degradation (degraded + healthScore + tier)
//   ✔ Tag route DNA at the surface (A1_SURFACE)
//   ✔ Trigger healing deterministically for missing-field patternsGot you—no moralizing, no second‑guessing. You’re designing an organism; I’m just helping you articulate it.

// Here’s a **full v10.1 upgrade** of `PulseOSSkinReflex.js`, written exactly like your existing organ, but:

// - version bumped to **v10.1**  
// - adds **degradation tiers** (aligned with Router v10.1)  
// - adds **route DNA tagging** at the surface (A1)  
// - keeps **import behavior identical** (only `route` from CNS)  
// - keeps **behavioral contract** the same: intercept → classify → mark degradation → log → heal (if missing field) → never block  

// You can drop this in and run it **outside** this environment.

// ```js
// ============================================================================
// FILE: /apps/PulseOS/Organs/Skin/PulseOSSkinReflex.js
// PULSE OS — v10.1
// “THE SKIN REFLEX / SURFACE EPITHELIAL MEMBRANE”
// A1 BARRIER • PAGE-LEVEL REFLEX • ZERO TIMING • ZERO STATE
// ============================================================================
//
// ORGAN IDENTITY (v10.1):
//   • Organ Type: Skin / Surface Membrane / Reflex Layer
//   • Layer: A1 (Page-Level Reflex)
//   • Biological Analog: Skin + surface epithelial membrane
//   • System Role: First-line error intake + classification at the page surface
//
// PURPOSE (v10.1):
//   ✔ Intercept JS errors at the page/surface level
//   ✔ Extract stack frames + route context
//   ✔ Build dynamic route traces (living map, not config)
//   ✔ Mark route degradation (degraded + healthScore + tier)
//   ✔ Tag route DNA at the surface (A1_SURFACE)
//   ✔ Trigger healing deterministically for missing-field patterns
//   ✔ Always pipe errors to Router/backend for logging + lineage
//   ✔ Never block the organism; always route forward
//
// WHAT THIS ORGAN IS:
//   ✔ The skin reflex of PulseOS
//   ✔ The lowest / outermost membrane (A1 barrier)
//   ✔ A universal error intake at the surface
//   ✔ A living route sampler and classifier
//   ✔ A degradation + DNA annotator for Router v10.1
//
// WHAT THIS ORGAN IS NOT:
//   ✘ NOT a router
//   ✘ NOT a backend logic layer
//   ✘ NOT a state machine
//   ✘ NOT a scheduler or timer
//   ✘ NOT an IQ/import organ
//
// SAFETY CONTRACT (v10.1):
//   • Never run timers, loops, or scheduling
//   • Never hold long-lived state (only ephemeral route memory)
//   • Never mutate payloads
//   • Always classify before escalating when possible
//   • Always forward healing triggers via Router
//   • Never block CNS or Mesh; import errors are degradation, not fatal
//   • Errors are signals, not fatal stops — reflex must always continue forward
// ============================================================================


// ============================================================================
// SYMBOL → OWNER MODULE RESOLUTION (unchanged behavior)
// ============================================================================
function resolveOwnerModule(symbol) {
  try {
    const subsystems = window?.PULSE_SUBSYSTEMS;
    if (!subsystems) return null;

    for (const [moduleName, moduleExports] of Object.entries(subsystems)) {
      if (moduleExports && typeof moduleExports === "object") {
        if (symbol in moduleExports) {
          return moduleName;
        }
      }
    }
  } catch (err) {
    logProtector("OWNER_RESOLUTION_FAILED", { error: String(err) });
  }

  return null;
}


// ============================================================================
// LAYER CONSTANTS + DIAGNOSTICS
// ============================================================================
const LAYER_ID   = "SKIN-REFLEX";
const LAYER_NAME = "THE SKIN REFLEX";
const LAYER_ROLE = "SURFACE ERROR GUARDIAN & HEALING TRIGGER";
const LAYER_VER  = "10.1";

const PROTECTOR_DIAGNOSTICS_ENABLED =
  window.PULSE_PROTECTOR_DIAGNOSTICS === "true" ||
  window.PULSE_DIAGNOSTICS === "true";

const logProtector = (stage, details = {}) => {
  if (!PROTECTOR_DIAGNOSTICS_ENABLED) return;

  log(
    JSON.stringify({
      pulseLayer: LAYER_ID,
      pulseName:  LAYER_NAME,
      pulseRole:  LAYER_ROLE,
      pulseVer:   LAYER_VER,
      stage,
      ...details
    })
  );
};


// ============================================================================
// PULSE OS v10.1 — SKIN REFLEX (A1 → A2 → Router → Backend)
// ============================================================================
import { route } from "./PulseOSCNSNervousSystem.js";


// ============================================================================
// ROUTE MEMORY — LIVING MAP, NOW WITH DEGRADATION + TIER + DNA TAG
// ============================================================================
const RouteMemory = {
  store: {},

  makeKey(message, frames) {
    const top = frames[0] || "NO_FRAME";
    return message + "::" + top;
  },

  classifyTier(healthScore) {
    const h = typeof healthScore === "number" ? healthScore : 1.0;

    if (h >= 0.95) return "microDegrade";
    if (h >= 0.85) return "softDegrade";
    if (h >= 0.50) return "midDegrade";
    if (h >= 0.15) return "hardDegrade";
    return "criticalDegrade";
  },

  remember(message, frames, routeTrace, overrides = {}) {
    const key = this.makeKey(message, frames);
    const baseHealth = overrides.healthScore ?? 1.0;
    const tier = this.classifyTier(baseHealth);

    this.store[key] = {
      ts: Date.now(),
      message,
      frames,
      routeTrace,
      degraded: !!overrides.degraded,
      healthScore: baseHealth,
      tier,
      dnaTag: "A1_SURFACE",
      ...overrides
    };

    logProtector("ROUTE_MEMORY_SAVED", {
      key,
      frames: frames.length,
      degraded: this.store[key].degraded,
      healthScore: this.store[key].healthScore,
      tier: this.store[key].tier,
      dnaTag: this.store[key].dnaTag
    });
  },

  markDegraded(message, frames, healthScore = 0.85) {
    const key = this.makeKey(message, frames);
    const entry = this.store[key];

    if (!entry) return;

    entry.degraded = true;
    entry.healthScore = healthScore;
    entry.tier = this.classifyTier(healthScore);
    entry.dnaTag = "A1_SURFACE_DEGRADED";

    logProtector("ROUTE_MEMORY_DEGRADED", {
      key,
      healthScore,
      tier: entry.tier,
      dnaTag: entry.dnaTag
    });
  },

  recall(message, frames) {
    const key = this.makeKey(message, frames);
    const entry = this.store[key];

    if (!entry) return null;

    logProtector("ROUTE_MEMORY_HIT", {
      key,
      frames: entry.frames.length,
      degraded: entry.degraded,
      healthScore: entry.healthScore,
      tier: entry.tier,
      dnaTag: entry.dnaTag
    });

    return entry.routeTrace;
  },

  getEntry(message, frames) {
    const key = this.makeKey(message, frames);
    return this.store[key] || null;
  }
};


// ============================================================================
// PUBLIC API (C‑LAYER passthrough)
// ============================================================================
export async function getAuth(jwtToken) {
  logProtector("GET_AUTH", {});
  return await route("auth", { jwtToken, reflexOrigin: "SkinReflex", layer: "A1" });
}

export async function getHook(name, payload = {}) {
  logProtector("GET_HOOK", { name });
  return await route("hook", { name, payload, reflexOrigin: "SkinReflex", layer: "A1" });
}

export async function getMap(mapName) {
  logProtector("GET_MAP", { mapName });
  return await route("map", { mapName, reflexOrigin: "SkinReflex", layer: "A1" });
}

export async function callHelper(helperName, payload = {}) {
  logProtector("CALL_HELPER", { helperName });
  return await route("helper", { helperName, payload, reflexOrigin: "SkinReflex", layer: "A1" });
}


// ============================================================================
// ATTACH SKIN REFLEX
// ============================================================================
export function attachScanner(id) {
  if (!id) {
    logProtector("ATTACH_NO_ID", {});
    return;
  }

  window.tp_identity = id;

  logProtector("ATTACH_OK", { uid: id.uid });

  log(
    "%c[PulseOSSkinReflex] Attached with identity: " + id.uid,
    "color: #4CAF50; font-weight: bold;"
  );
}


// ============================================================================
// GLOBAL ERROR INTERCEPTOR (A1 → A2 → Router → Backend)
// ============================================================================
let healingInProgress = false;

window.addEventListener(
  "error",
  async (event) => {
    if (healingInProgress) return;

    const msg   = event.message || "";
    const stack = event.error?.stack || "";
    const frames = stack.split("\n").map((s) => s.trim());

    const rawFrames = frames
      .filter((f) => f.includes(".js"))
      .map((f) => f.replace(/^at\s+/, ""));

    logProtector("ERROR_INTERCEPTED", { message: msg });

    // ------------------------------------------------------------------------
    // ROUTE TRACE — LIVING, NOT HARD-CODED
    // ------------------------------------------------------------------------
    let routeTrace = RouteMemory.recall(msg, rawFrames);

    if (!routeTrace) {
      routeTrace = rawFrames.map((frame, index) => {
        const file = frame.split("/").pop().split(":")[0];

        return {
          frame,
          file,
          index,
          label: "A1_FRAME",
          layer: "A1",
          purpose: "Surface observed frame",
          context: "SkinReflex dynamic trace"
        };
      });

      logProtector("ROUTE_TRACE_BUILT_DYNAMIC", {
        frames: routeTrace.length
      });

      RouteMemory.remember(msg, rawFrames, routeTrace);
    }

    // ------------------------------------------------------------------------
    // PAGE-LEVEL CLASSIFICATION → MARK DEGRADATION, NEVER BLOCK
    // ------------------------------------------------------------------------
    let classified = false;

    if (msg.includes("Cannot find module")) {
      let attemptedPath = null;
      const m = msg.match(/Cannot find module ['"]([^'"]+)['"]/);
      if (m && m[1]) attemptedPath = m[1];

      logProtector("PAGE_IMPORT_DEGRADATION", {
        error: "importDegradation",
        details: msg,
        attemptedPath
      });

      RouteMemory.markDegraded(msg, rawFrames, 0.85);
      classified = true;
    }

    if (msg.includes("process is not defined")) {
      logProtector("PAGE_ENV_MISMATCH", {
        error: "frontendEnvMismatch",
        hint: "Replace process.env.* with window.PULSE_*"
      });

      RouteMemory.markDegraded(msg, rawFrames, 0.7);
      classified = true;
    }

    if (msg.includes("Maximum call stack size exceeded")) {
      logProtector("PAGE_RECURSION_LOOP", {
        error: "pageRecursionLoop",
        details: msg
      });

      RouteMemory.markDegraded(msg, rawFrames, 0.5);
      classified = true;
    }

    const memoryEntry = RouteMemory.getEntry(msg, rawFrames);
    const degraded = memoryEntry?.degraded || false;
    const healthScore = memoryEntry?.healthScore ?? 1.0;
    const tier = memoryEntry?.tier || "microDegrade";
    const dnaTag = memoryEntry?.dnaTag || "A1_SURFACE";

    // ------------------------------------------------------------------------
    // ALWAYS PIPE ERROR TO BACKEND VIA ROUTER
    // ------------------------------------------------------------------------
    await route("logError", {
      type: classified ? "classified" : "unclassified",
      message: msg,
      frames: rawFrames,
      routeTrace,
      page: window.location.pathname,
      reflexOrigin: "SkinReflex",
      layer: "A1",
      degraded,
      healthScore,
      tier,
      dnaTag
    });

    // ------------------------------------------------------------------------
    // HEALING LOGIC (missing-field patterns only)
    // ------------------------------------------------------------------------
    const parsed = parseMissingField(msg);
    if (!parsed) {
      logProtector("NO_MISSING_FIELD", {
        degraded,
        healthScore,
        tier,
        dnaTag
      });
      event.preventDefault();
      return;
    }

    const { table, field } = parsed;
    const ownerModule = resolveOwnerModule(field);

    logProtector("HEALING_TRIGGERED", {
      table,
      field,
      ownerModule: ownerModule || "UNKNOWN",
      degraded,
      healthScore,
      tier,
      dnaTag
    });

    healingInProgress = true;

    try {
      await route("fetchField", {
        table,
        field,
        ownerModule,
        message: msg,
        page: window.location.pathname,
        routeTrace,
        reflexOrigin: "SkinReflex",
        layer: "A1",
        degraded,
        healthScore,
        tier,
        dnaTag
      });

      logProtector("HEALING_SUCCESS", {
        table,
        field,
        ownerModule,
        degraded,
        healthScore,
        tier,
        dnaTag
      });
    } catch (err) {
      logProtector("HEALING_FAILED", {
        error: String(err),
        degraded,
        healthScore,
        tier,
        dnaTag
      });
      error("[PulseOSSkinReflex] Router fetch failed:", err);
    }

    healingInProgress = false;

    event.preventDefault();
  },
  true
);


// ============================================================================
// PARSER — same behavior, clearer intent
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
// END OF FILE — THE SKIN REFLEX / SURFACE EPITHELIAL MEMBRANE  [v10.1]
// ============================================================================
