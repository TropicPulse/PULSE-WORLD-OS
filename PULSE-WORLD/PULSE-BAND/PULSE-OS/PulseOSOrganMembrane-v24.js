/* global log, error */
// ============================================================================
// FILE: /PulseOS/Organs/Barriers/PulseOSOrganMembrane-v24-IMMORTAL++.js
// PULSE OS — v24.0-IMMORTAL++
// “THE ORGAN MEMBRANE / A3 EPITHELIAL REFLEX”
// GLOBAL SENTINEL • ORGAN-LEVEL PROTECTOR • ZERO RANDOMNESS
// DUALBAND-AWARE • PRESENCE-AWARE • ARTERY-AWARE
// ============================================================================
//
// ORGAN IDENTITY (v24.0-IMMORTAL++):
//   • Organ Type: Barrier / Reflex Membrane
//   • Layer: A3 (Organ-Level Reflex)
//   • Biological Analog: Organ epithelial membrane (deep protective layer)
//   • System Role: Intercept mesh-level structural failures before they reach CNS
//
// PURPOSE:
//   ✔ Catch mesh-level JS errors (A3 reflex)
//   ✔ Detect import drift, recursion, env mismatches
//   ✔ Build dynamic route traces (same as A1/A2 membranes)
//   ✔ Forward lineage + context to Router (nervous system)
//   ✔ Prevent mesh-level failures from destabilizing the organism
//   ✔ Trigger healing via Router
//
// SAFETY CONTRACT (v24.0-IMMORTAL++):
//   • No timers, no scheduling, no async loops beyond direct event handling
//   • No randomness
//   • No mutation of external systems
//   • No blocking of CNS or Mesh
//   • Guarded access to window / globals
//   • Dual-band metadata ready (symbolic-primary, binary-non-executable)
//   • Presence-aware, artery-aware, read-only
// ============================================================================

import { OrganismIdentity } from "../PULSE-X/PulseWorldOrganismMap-v24.js";
import { route, Router } from "./PulseOSCNSNervousSystem.js";

const Identity = OrganismIdentity(import.meta.url);

// ============================================================================
//  META BLOCK — v24.0 IMMORTAL (ORGANISM KERNEL)
// ============================================================================
export const MembraneMeta = Identity.OrganMeta;

// ============================================================================
//  SURFACE / ORGANISM LAYER EXPORTS — v24.0 IMMORTAL
// ============================================================================
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;

export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;

export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// ============================================================================
// LAYER CONSTANTS + DIAGNOSTICS
// ============================================================================
const LAYER_ID   = "MESH-REFLEX";
const LAYER_NAME = "THE ORGAN MEMBRANE";
const LAYER_ROLE = "MESH ERROR GUARDIAN & HEALING TRIGGER";
const LAYER_VER  = "24.0-IMMORTAL++";

const hasWindow = typeof window !== "undefined";

const MESH_DIAGNOSTICS_ENABLED =
  hasWindow &&
  (window.PULSE_MESH_DIAGNOSTICS === "true" ||
    window.PULSE_DIAGNOSTICS === "true");

const logMesh = (stage, details = {}) => {
  if (!MESH_DIAGNOSTICS_ENABLED) return;
  if (typeof log !== "function") return;

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
// MESH ARTERY v2 — IMMORTAL++ (pure counters, no time)
// ============================================================================
const _MEMBRANE_ARTERY = {
  totalErrors: 0,
  totalHeals: 0,
  totalHealFailures: 0,
  classifiedImportConflicts: 0,
  classifiedEnvMismatches: 0,
  classifiedRecursions: 0,
  classifiedRoutingDrift: 0,
  lastErrorKind: null
};

function _bucket(v) {
  if (v >= 0.9) return "elite";
  if (v >= 0.75) return "high";
  if (v >= 0.5) return "medium";
  if (v >= 0.25) return "low";
  return "critical";
}

function _bucketPressure(v) {
  if (v >= 0.9) return "overload";
  if (v >= 0.7) return "high";
  if (v >= 0.4) return "medium";
  if (v > 0) return "low";
  return "none";
}

function _bucketCost(v) {
  if (v >= 0.8) return "heavy";
  if (v >= 0.5) return "moderate";
  if (v >= 0.2) return "light";
  if (v > 0) return "negligible";
  return "none";
}

function _clamp01(v) {
  const n = typeof v === "number" ? v : 0;
  if (n <= 0) return 0;
  if (n >= 1) return 1;
  return n;
}

// optional presence hint: window.PULSE_PRESENCE_DENSITY ∈ [0,1]
function _presenceDensity() {
  if (!hasWindow) return 0;
  const v = window.PULSE_PRESENCE_DENSITY;
  return _clamp01(typeof v === "number" ? v : 0);
}

function _computeMembraneArtery() {
  const total = _MEMBRANE_ARTERY.totalErrors;
  const heals = _MEMBRANE_ARTERY.totalHeals;
  const failures = _MEMBRANE_ARTERY.totalHealFailures;

  const errorDensity = total > 0 ? _clamp01(total / 256) : 0;
  const healRatio = total > 0 ? _clamp01(heals / total) : 0;
  const failureRatio = total > 0 ? _clamp01(failures / total) : 0;

  const presence = _presenceDensity();

  const pressure = _clamp01(
    errorDensity * 0.6 +
      failureRatio * 0.25 +
      presence * 0.15
  );

  const throughput = _clamp01(1 - pressure);
  const cost = _clamp01(pressure * (1 - throughput));
  const budget = _clamp01(throughput - cost);

  return Object.freeze({
    totalErrors: _MEMBRANE_ARTERY.totalErrors,
    totalHeals: _MEMBRANE_ARTERY.totalHeals,
    totalHealFailures: _MEMBRANE_ARTERY.totalHealFailures,
    classifiedImportConflicts: _MEMBRANE_ARTERY.classifiedImportConflicts,
    classifiedEnvMismatches: _MEMBRANE_ARTERY.classifiedEnvMismatches,
    classifiedRecursions: _MEMBRANE_ARTERY.classifiedRecursions,
    classifiedRoutingDrift: _MEMBRANE_ARTERY.classifiedRoutingDrift,
    lastErrorKind: _MEMBRANE_ARTERY.lastErrorKind,
    presenceDensity: presence,
    errorDensity,
    healRatio,
    failureRatio,
    pressure,
    throughput,
    cost,
    budget,
    pressureBucket: _bucketPressure(pressure),
    throughputBucket: _bucket(throughput),
    costBucket: _bucketCost(cost),
    budgetBucket: _bucket(budget)
  });
}

export function getMembraneArterySnapshot() {
  return _computeMembraneArtery();
}

// ============================================================================
// ROUTE MEMORY (same pattern as v12, deterministic sequence counter)
// ============================================================================
let meshRouteSeq = 0;

const MeshRouteMemory = {
  store: {},

  makeKey(message, frames) {
    const top = frames[0] || "NO_FRAME";
    return message + "::" + top;
  },

  remember(message, frames, routeTrace) {
    const key = this.makeKey(message, frames);
    this.store[key] = {
      seq: ++meshRouteSeq,
      message,
      frames,
      routeTrace
    };

    logMesh("ROUTE_MEMORY_SAVED", {
      key,
      frames: frames.length
    });
  },

  recall(message, frames) {
    const key = this.makeKey(message, frames);
    const entry = this.store[key];

    if (!entry) return null;

    logMesh("ROUTE_MEMORY_HIT", {
      key,
      frames: entry.frames.length
    });

    return entry.routeTrace;
  }
};

// ============================================================================
// PUBLIC API (C-LAYER passthrough — symbolic-primary, dual-band metadata)
// ============================================================================
export async function meshAuth(jwtToken) {
  logMesh("MESH_AUTH", {});
  return await route("auth", {
    jwtToken,
    reflexOrigin: "MeshScanner",
    layer: "A3",
    modeKind: "symbolic",
    __band: "symbolic"
  });
}

export async function meshHook(name, payload = {}) {
  logMesh("MESH_HOOK", { name });
  return await route("hook", {
    name,
    payload,
    reflexOrigin: "MeshScanner",
    layer: "A3",
    modeKind: "symbolic",
    __band: "symbolic"
  });
}

export async function meshMap(mapName) {
  logMesh("MESH_MAP", { mapName });
  return await route("map", {
    mapName,
    reflexOrigin: "MeshScanner",
    layer: "A3",
    modeKind: "symbolic",
    __band: "symbolic"
  });
}

export async function meshHelper(helperName, payload = {}) {
  logMesh("MESH_HELPER", { helperName });
  return await route("helper", {
    helperName,
    payload,
    reflexOrigin: "MeshScanner",
    layer: "A3",
    modeKind: "symbolic",
    __band: "symbolic"
  });
}

// ============================================================================
// MESH-LEVEL ERROR INTERCEPTOR (A3 → Immune System / CNS)
// ============================================================================
let meshHealing = false;

if (hasWindow && typeof window.addEventListener === "function") {
  window.addEventListener(
    "error",
    async (event) => {
      if (meshHealing) return;

      const msg   = event.message || "";
      const stack = event.error?.stack || "";

      // Only intercept errors that originate from the MESH
      if (
        !stack.includes("/Mesh/") &&
        !stack.includes("PulseMesh") &&
        !stack.includes("routeImpulse")
      ) {
        return;
      }

      _MEMBRANE_ARTERY.totalErrors += 1;

      logMesh("MESH_ERROR_INTERCEPTED", { message: msg });

      // ----------------------------------------------------------------------
      // MESH-LEVEL CLASSIFICATION
      // ----------------------------------------------------------------------
      if (msg.includes("Cannot find module") || msg.includes("already been declared")) {
        _MEMBRANE_ARTERY.classifiedImportConflicts += 1;
        _MEMBRANE_ARTERY.lastErrorKind = "meshImportConflict";

        logMesh("MESH_IMPORT_CONFLICT", {
          error: "meshImportConflict",
          details: msg
        });
        return;
      }

      if (msg.includes("process is not defined")) {
        _MEMBRANE_ARTERY.classifiedEnvMismatches += 1;
        _MEMBRANE_ARTERY.lastErrorKind = "meshEnvMismatch";

        logMesh("MESH_ENV_MISMATCH", {
          error: "meshEnvMismatch",
          hint: "Replace process.env.* with window.PULSE_*"
        });
        return;
      }

      if (msg.includes("Maximum call stack size exceeded")) {
        _MEMBRANE_ARTERY.classifiedRecursions += 1;
        _MEMBRANE_ARTERY.lastErrorKind = "meshRecursionLoop";

        logMesh("MESH_RECURSION_LOOP", {
          error: "meshRecursionLoop",
          details: msg
        });
        return;
      }

      if (msg.includes("neighbors") || msg.includes("routing stalled")) {
        _MEMBRANE_ARTERY.classifiedRoutingDrift += 1;
        _MEMBRANE_ARTERY.lastErrorKind = "meshRoutingDrift";

        logMesh("MESH_ROUTING_DRIFT", {
          error: "meshRoutingDrift",
          details: msg
        });
      }

      // ----------------------------------------------------------------------
      // STACK + ROUTE TRACE
      // ----------------------------------------------------------------------
      const frames = stack.split("\n").map((s) => s.trim());
      const rawFrames = frames
        .filter((f) => f.includes(".js"))
        .map((f) => f.replace(/^at\s+/, ""));

      let routeTrace = MeshRouteMemory.recall(msg, rawFrames);

      if (!routeTrace) {
        routeTrace = rawFrames.map((frame, index) => {
          const file = frame.split("/").pop().split(":")[0];

          return {
            frame,
            file,
            index,
            label: "MESH_FRAME",
            layer: "A3",
            purpose: "Mesh-level observed frame",
            context: "MeshScanner dynamic trace"
          };
        });

        MeshRouteMemory.remember(msg, rawFrames, routeTrace);
      }

      // ----------------------------------------------------------------------
      // HEALING LOGIC (A3 reflex → Router)
// ----------------------------------------------------------------------
      const parsed = parseMissingField(msg);
      if (!parsed) {
        logMesh("NO_MISSING_FIELD", {});
        return;
      }

      const { table, field } = parsed;

      logMesh("MESH_HEALING_TRIGGERED", { table, field });

      meshHealing = true;

      try {
        if (Router && typeof Router.receiveReflex === "function") {
          Router.receiveReflex({
            reflexOrigin: "MeshScanner",
            layer: "A3",
            message: msg,
            routeTrace,
            table,
            field,
            modeKind: "symbolic",
            __band: "symbolic"
          });
        }

        await route("fetchField", {
          table,
          field,
          message: msg,
          reflexOrigin: "MeshScanner",
          layer: "A3",
          routeTrace,
          modeKind: "symbolic",
          __band: "symbolic"
        });

        _MEMBRANE_ARTERY.totalHeals += 1;

        logMesh("MESH_HEALING_SUCCESS", { table, field });
      } catch (err) {
        _MEMBRANE_ARTERY.totalHealFailures += 1;

        logMesh("MESH_HEALING_FAILED", { error: String(err) });
        if (typeof error === "function") {
          error("[MeshScanner] Router fetch failed:", err);
        }
      }

      meshHealing = false;

      event.preventDefault();
    },
    true
  );
}

// ============================================================================
// PARSER (same as v12, symbolic-only, deterministic)
// ============================================================================
function parseMissingField(message) {
  logMesh("PARSER_INVOKED", {});

  let match = message.match(/reading '([^']+)'/);
  if (match) return { table: "Users", field: match[1] };

  match = message.match(/([^ ]+) is not defined/);
  if (match) return { table: "Users", field: match[1] };

  match = message.match(/property '([^']+)'/);
  if (match) return { table: "Users", field: match[1] };

  return null;
}

// ============================================================================
// DUAL-MODE EXPORTS (ESM + CommonJS)
// ============================================================================
if (typeof module !== "undefined") {
  module.exports = {
    MembraneMeta,
    pulseRole,
    PulseRole,
    surfaceMeta,
    pulseLoreContext,
    AI_EXPERIENCE_META,
    EXPORT_META,
    meshAuth,
    meshHook,
    meshMap,
    meshHelper,
    getMembraneArterySnapshot
  };
}

// ============================================================================
// END OF FILE — THE ORGAN MEMBRANE / A3 EPITHELIAL REFLEX  [v24.0-IMMORTAL++]
// ============================================================================
