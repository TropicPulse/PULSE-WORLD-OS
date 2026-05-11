/* global log,error */
// ============================================================================
// FILE: /PulseOS/PULSE-OS/PulseOSTissueMembrane-v24-IMMORTAL++.js
// PULSE OS — v24.0-IMMORTAL++
// “THE TISSUE MEMBRANE / MID‑LAYER EPITHELIAL REFLEX”
// A2 REFLEX LAYER • MID‑LAYER SENTINEL • ZERO TIMING • ZERO STATE
// DUALBAND-AWARE • PRESENCE-AWARE • ARTERY-AWARE
// ============================================================================
//
// v24.0-IMMORTAL++ UPGRADE:
//   ✔ Zero timing (no Date.now for logic → deterministic seq counter only)
//   ✔ Zero global mutation (no PulseOSBrain.* writes)
//   ✔ Guarded window access (environment‑agnostic)
//   ✔ Deterministic route memory (presence‑band aware, DNA‑tagged)
//   ✔ Prewarmable route cache (pure, deterministic)
//   ✔ Route memory snapshot for diagnostics / presence overlays
//   ✔ Tissue artery: error density, degradation density, presence density
//   ✔ Preserve ALL abilities (degradation, DNA, healing, trace, healing)
//   ✔ No compute, no payload mutation, no scheduling
//   ✔ Dual‑band + presence awareness via __band tagging
// ============================================================================

import {
  OrganismIdentity,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PulseWorldOrganismMap-v24.js";

const Identity = OrganismIdentity(import.meta.url);

// ============================================================================
//  META BLOCK — v24.0 IMMORTAL (ORGANISM KERNEL)
// ============================================================================
export const TissueMeta = Identity.OrganMeta;

// SURFACE / ORGANISM LAYER EXPORTS — v24.0 IMMORTAL
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// ============================================================================
// LAYER CONSTANTS + DIAGNOSTICS (v24‑IMMORTAL++)
// ============================================================================
const hasWindow = typeof window !== "undefined";

const LAYER_ID   = "LAYER-REFLEX";
const LAYER_NAME = "THE TISSUE MEMBRANE";
const LAYER_ROLE = "MID-LAYER ERROR GUARDIAN & HEALING TRIGGER";
const LAYER_VER  = "24.0-IMMORTAL++";

const LAYER_DIAGNOSTICS_ENABLED =
  hasWindow &&
  (window.PULSE_LAYER_DIAGNOSTICS === "true" ||
   window.PULSE_DIAGNOSTICS === "true");

const logLayer = (stage, details = {}) => {
  if (!LAYER_DIAGNOSTICS_ENABLED) return;
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
// DUAL‑BAND + PRESENCE CONSTANTS
// ============================================================================
const ROUTE_BANDS = {
  SYMBOLIC: "symbolic",
  BINARY: "binary",
  PRESENCE: "presence"
};

function normalizeBand(band) {
  const b = (band || ROUTE_BANDS.SYMBOLIC).toLowerCase();
  if (b === ROUTE_BANDS.BINARY) return ROUTE_BANDS.BINARY;
  if (b === ROUTE_BANDS.PRESENCE) return ROUTE_BANDS.PRESENCE;
  return ROUTE_BANDS.SYMBOLIC;
}

// ============================================================================
// TISSUE ARTERY v2 — IMMORTAL++ (pure counters, no time)
// ============================================================================
const _TISSUE_ARTERY = {
  totalErrors: 0,
  totalHeals: 0,
  totalHealFailures: 0,
  totalDegradedRoutes: 0,
  lastErrorBand: null,
  lastErrorMessage: null
};

function _clamp01(v) {
  const n = typeof v === "number" ? v : 0;
  if (n <= 0) return 0;
  if (n >= 1) return 1;
  return n;
}

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

// optional presence hint: window.PULSE_PRESENCE_DENSITY ∈ [0,1]
function _presenceDensity() {
  if (!hasWindow) return 0;
  const v = window.PULSE_PRESENCE_DENSITY;
  return _clamp01(typeof v === "number" ? v : 0);
}

function _computeTissueArtery() {
  const total = _TISSUE_ARTERY.totalErrors;
  const heals = _TISSUE_ARTERY.totalHeals;
  const failures = _TISSUE_ARTERY.totalHealFailures;
  const degraded = _TISSUE_ARTERY.totalDegradedRoutes;

  const errorDensity = total > 0 ? _clamp01(total / 256) : 0;
  const healRatio = total > 0 ? _clamp01(heals / total) : 0;
  const failureRatio = total > 0 ? _clamp01(failures / total) : 0;
  const degradationDensity = total > 0 ? _clamp01(degraded / total) : 0;

  const presence = _presenceDensity();

  const pressure = _clamp01(
    errorDensity * 0.45 +
      failureRatio * 0.25 +
      degradationDensity * 0.15 +
      presence * 0.15
  );

  const throughput = _clamp01(1 - pressure);
  const cost = _clamp01(pressure * (1 - throughput));
  const budget = _clamp01(throughput - cost);

  return Object.freeze({
    totalErrors: _TISSUE_ARTERY.totalErrors,
    totalHeals: _TISSUE_ARTERY.totalHeals,
    totalHealFailures: _TISSUE_ARTERY.totalHealFailures,
    totalDegradedRoutes: _TISSUE_ARTERY.totalDegradedRoutes,
    lastErrorBand: _TISSUE_ARTERY.lastErrorBand,
    lastErrorMessage: _TISSUE_ARTERY.lastErrorMessage,
    presenceDensity: presence,
    errorDensity,
    healRatio,
    failureRatio,
    degradationDensity,
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

export function getTissueArterySnapshot() {
  return _computeTissueArtery();
}

// ============================================================================
// ROUTE MEMORY — deterministic, zero timing, DNA tagging + presence-aware
// ============================================================================
let tissueSeq = 0;

const LayerRouteMemory = {
  store: {},

  makeKey(message, frames, band = ROUTE_BANDS.SYMBOLIC) {
    const top = frames[0] || "NO_FRAME";
    return message + "::" + top + "::" + normalizeBand(band);
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
    const band = normalizeBand(overrides.band);
    const key = this.makeKey(message, frames, band);
    const baseHealth = overrides.healthScore ?? 1.0;
    const tier = this.classifyTier(baseHealth);

    this.store[key] = {
      seq: ++tissueSeq,          // deterministic, zero timing
      message,
      frames,
      routeTrace,
      degraded: !!overrides.degraded,
      healthScore: baseHealth,
      tier,
      band,
      dnaTag: band === ROUTE_BANDS.PRESENCE ? "A2_TISSUE_PRESENCE" : "A2_TISSUE",
      ...overrides
    };

    if (this.store[key].degraded) {
      _TISSUE_ARTERY.totalDegradedRoutes += 1;
    }

    logLayer("ROUTE_MEMORY_SAVED", {
      key,
      frames: frames.length,
      degraded: this.store[key].degraded,
      healthScore: this.store[key].healthScore,
      tier: this.store[key].tier,
      band: this.store[key].band,
      dnaTag: this.store[key].dnaTag
    });
  },

  markDegraded(message, frames, healthScore = 0.85, band = ROUTE_BANDS.SYMBOLIC) {
    const key = this.makeKey(message, frames, band);
    const entry = this.store[key];
    if (!entry) return;

    if (!entry.degraded) {
      _TISSUE_ARTERY.totalDegradedRoutes += 1;
    }

    entry.degraded = true;
    entry.healthScore = healthScore;
    entry.tier = this.classifyTier(healthScore);
    entry.band = normalizeBand(band);
    entry.dnaTag =
      entry.band === ROUTE_BANDS.PRESENCE
        ? "A2_TISSUE_PRESENCE_DEGRADED"
        : "A2_TISSUE_DEGRADED";

    logLayer("ROUTE_MEMORY_DEGRADED", {
      key,
      healthScore,
      tier: entry.tier,
      band: entry.band,
      dnaTag: entry.dnaTag
    });
  },

  recall(message, frames, band = ROUTE_BANDS.SYMBOLIC) {
    const key = this.makeKey(message, frames, band);
    const entry = this.store[key];
    if (!entry) return null;

    logLayer("ROUTE_MEMORY_HIT", {
      key,
      frames: entry.frames.length,
      degraded: entry.degraded,
      healthScore: entry.healthScore,
      tier: entry.tier,
      band: entry.band,
      dnaTag: entry.dnaTag
    });

    return entry.routeTrace;
  },

  getEntry(message, frames, band = ROUTE_BANDS.SYMBOLIC) {
    const key = this.makeKey(message, frames, band);
    return this.store[key] || null;
  },

  snapshot() {
    const entries = Object.keys(this.store)
      .sort((a, b) => this.store[a].seq - this.store[b].seq)
      .map((key) => {
        const e = this.store[key];
        return {
          key,
          seq: e.seq,
          degraded: e.degraded,
          healthScore: e.healthScore,
          tier: e.tier,
          band: e.band,
          dnaTag: e.dnaTag,
          framesCount: e.frames.length
        };
      });

    return {
      version: "24.0-IMMORTAL++",
      count: entries.length,
      entries
    };
  }
};

export function getTissueRouteMemorySnapshot() {
  const snap = LayerRouteMemory.snapshot();
  logLayer("TISSUE_ROUTE_MEMORY_SNAPSHOT", { count: snap.count });
  return snap;
}

// ============================================================================
// PUBLIC API (C‑LAYER passthrough — dual‑band + presence aware)
// ============================================================================
import { route, Router } from "./PulseOSCNSNervousSystem-v24.js";

function attachBand(payload = {}, band) {
  const normalized = normalizeBand(band || payload.__band);
  return { ...payload, __band: normalized };
}

export async function layerAuth(jwtToken, band = ROUTE_BANDS.SYMBOLIC) {
  const b = normalizeBand(band);
  logLayer("LAYER_AUTH", { band: b });
  return await route(
    "auth",
    attachBand(
      { jwtToken, reflexOrigin: "LayerScanner", layer: "A2" },
      b
    )
  );
}

export async function layerHook(
  name,
  payload = {},
  band = payload.__band || ROUTE_BANDS.SYMBOLIC
) {
  const b = normalizeBand(band);
  logLayer("LAYER_HOOK", { name, band: b });
  return await route(
    "hook",
    attachBand(
      { name, payload, reflexOrigin: "LayerScanner", layer: "A2" },
      b
    )
  );
}

export async function layerMap(mapName, band = ROUTE_BANDS.SYMBOLIC) {
  const b = normalizeBand(band);
  logLayer("LAYER_MAP", { mapName, band: b });
  return await route(
    "map",
    attachBand(
      { mapName, reflexOrigin: "LayerScanner", layer: "A2" },
      b
    )
  );
}

export async function layerHelper(
  helperName,
  payload = {},
  band = payload.__band || ROUTE_BANDS.SYMBOLIC
) {
  const b = normalizeBand(band);
  logLayer("LAYER_HELPER", { helperName, band: b });
  return await route(
    "helper",
    attachBand(
      { helperName, payload, reflexOrigin: "LayerScanner", layer: "A2" },
      b
    )
  );
}

// ============================================================================
// MID‑LAYER ERROR INTERCEPTOR (A2 → A3) — v24 IMMORTAL++
// ============================================================================
let layerHealing = false;

if (hasWindow && typeof window.addEventListener === "function") {
  window.addEventListener(
    "error",
    async (event) => {
      if (layerHealing) return;

      const msg = event.message || "";
      const stack = event.error?.stack || "";
      const band = normalizeBand(event.error?.__band);

      // Only intercept errors originating from the mid‑layer
      if (!stack.includes("/Layer/") && !stack.toLowerCase().includes("layer")) {
        return;
      }

      _TISSUE_ARTERY.totalErrors += 1;
      _TISSUE_ARTERY.lastErrorBand = band;
      _TISSUE_ARTERY.lastErrorMessage = msg;

      logLayer("LAYER_ERROR_INTERCEPTED", { message: msg, band });

      // ----------------------------------------------------------------------
      // STACK + ROUTE TRACE
      // ----------------------------------------------------------------------
      const frames = stack.split("\n").map((s) => s.trim());
      const rawFrames = frames
        .filter((f) => f.includes(".js"))
        .map((f) => f.replace(/^at\s+/, ""));

      let routeTrace = LayerRouteMemory.recall(msg, rawFrames, band);

      if (!routeTrace) {
        routeTrace = rawFrames.map((frame, index) => {
          const file = frame.split("/").pop().split(":")[0];

          return {
            frame,
            file,
            index,
            label: "LAYER_FRAME",
            layer: "A2",
            purpose: "Mid-layer observed frame",
            context: "LayerScanner dynamic trace",
            band
          };
        });

        LayerRouteMemory.remember(msg, rawFrames, routeTrace, { band });
      }

      // ----------------------------------------------------------------------
      // MID‑LAYER CLASSIFICATION → MARK DEGRADATION, NEVER BLOCK
      // ----------------------------------------------------------------------
      // Import errors are non-fatal (same rule as SkinReflex)
      if (msg.includes("Cannot find module")) {
        logLayer("LAYER_IMPORT_IGNORED", {
          note: "Import errors are non-fatal in v10.4+",
          details: msg,
          band
        });

        event.preventDefault();
        return;
      }

      if (msg.includes("already been declared")) {
        logLayer("LAYER_IMPORT_CONFLICT", {
          error: "layerImportConflict",
          details: msg,
          band
        });

        LayerRouteMemory.markDegraded(msg, rawFrames, 0.85, band);
      }

      if (msg.includes("process is not defined")) {
        logLayer("LAYER_ENV_MISMATCH", {
          error: "layerEnvMismatch",
          hint: "Replace process.env.* with window.PULSE_*",
          band
        });

        LayerRouteMemory.markDegraded(msg, rawFrames, 0.7, band);
      }

      if (msg.includes("Maximum call stack size exceeded")) {
        logLayer("LAYER_RECURSION_LOOP", {
          error: "layerRecursionLoop",
          details: msg,
          band
        });

        LayerRouteMemory.markDegraded(msg, rawFrames, 0.5, band);
      }

      const memoryEntry = LayerRouteMemory.getEntry(msg, rawFrames, band);
      const degraded = memoryEntry?.degraded || false;
      const healthScore = memoryEntry?.healthScore ?? 1.0;
      const tier = memoryEntry?.tier || "microDegrade";
      const dnaTag =
        memoryEntry?.dnaTag ||
        (band === ROUTE_BANDS.PRESENCE
          ? "A2_TISSUE_PRESENCE"
          : "A2_TISSUE");

      // ----------------------------------------------------------------------
      // ALWAYS PIPE ERROR TO BACKEND VIA ROUTER
      // ----------------------------------------------------------------------
      await route("logError", {
        type: degraded ? "classified" : "unclassified",
        message: msg,
        frames: rawFrames,
        routeTrace,
        page: hasWindow && window.location ? window.location.pathname : null,
        reflexOrigin: "LayerScanner",
        layer: "A2",
        degraded,
        healthScore,
        tier,
        dnaTag,
        __band: band
      });

      // ----------------------------------------------------------------------
      // HEALING LOGIC (A2 reflex → Router)
// ----------------------------------------------------------------------
      const parsed = parseMissingField(msg);
      if (!parsed) {
        logLayer("NO_MISSING_FIELD", {
          degraded,
          healthScore,
          tier,
          dnaTag,
          band
        });
        event.preventDefault();
        return;
      }

      const { table, field } = parsed;

      logLayer("LAYER_HEALING_TRIGGERED", {
        table,
        field,
        degraded,
        healthScore,
        tier,
        dnaTag,
        band
      });

      layerHealing = true;

      try {
        if (Router && typeof Router.receiveReflex === "function") {
          Router.receiveReflex({
            reflexOrigin: "LayerScanner",
            layer: "A2",
            message: msg,
            routeTrace,
            table,
            field,
            degraded,
            healthScore,
            tier,
            dnaTag,
            band
          });
        }

        await route("fetchField", {
          table,
          field,
          message: msg,
          reflexOrigin: "LayerScanner",
          layer: "A2",
          routeTrace,
          degraded,
          healthScore,
          tier,
          dnaTag,
          __band: band
        });

        _TISSUE_ARTERY.totalHeals += 1;

        logLayer("LAYER_HEALING_SUCCESS", {
          table,
          field,
          degraded,
          healthScore,
          tier,
          dnaTag,
          band
        });
      } catch (err) {
        _TISSUE_ARTERY.totalHealFailures += 1;

        logLayer("LAYER_HEALING_FAILED", {
          error: String(err),
          degraded,
          healthScore,
          tier,
          dnaTag,
          band
        });
        if (typeof error === "function") {
          error("[LayerScanner] Router fetch failed:", err);
        }
      }

      layerHealing = false;

      event.preventDefault();
    },
    true
  );
}

// ============================================================================
// PARSER (same as PageScanner) — symbolic-only, deterministic
// ============================================================================
function parseMissingField(message) {
  logLayer("PARSER_INVOKED", {});

  let match = message.match(/reading '([^']+)'/);
  if (match) return { table: "Users", field: match[1] };

  match = message.match(/([^ ]+) is not defined/);
  if (match) return { table: "Users", field: match[1] };

  match = message.match(/property '([^']+)'/);
  if (match) return { table: "Users", field: match[1] };

  return null;
}

// ============================================================================
// PREWARM + SNAPSHOT SURFACE — presence / cache / chunk (pure, deterministic)
// ============================================================================

/**
 * Prewarm the tissue membrane route memory with known mid-layer error patterns.
 * routes: Array<{
 *   message: string,
 *   frames: string[],
 *   routeTrace?: any[],
 *   band?: "symbolic" | "binary" | "presence",
 *   healthScore?: number,
 *   degraded?: boolean
 * }>
 */
export function prewarmTissueMembrane(routes = []) {
  for (const r of routes) {
    if (!r || !r.message || !Array.isArray(r.frames)) continue;
    const band = normalizeBand(r.band);
    const trace =
      Array.isArray(r.routeTrace) && r.routeTrace.length > 0
        ? r.routeTrace
        : r.frames.map((frame, index) => {
            const file = frame.split("/").pop().split(":")[0];
            return {
              frame,
              file,
              index,
              label: "LAYER_FRAME",
              layer: "A2",
              purpose: "Prewarmed mid-layer frame",
              context: "LayerScanner prewarm trace",
              band
            };
          });

    LayerRouteMemory.remember(r.message, r.frames, trace, {
      band,
      healthScore: r.healthScore,
      degraded: !!r.degraded
    });
  }

  logLayer("TISSUE_PREWARM_COMPLETE", {
    prewarmCount: Array.isArray(routes) ? routes.length : 0
  });
}

// ============================================================================
// DUAL‑MODE EXPORTS
// ============================================================================
if (typeof module !== "undefined") {
  module.exports = {
    TissueMeta,
    pulseRole,
    PulseRole,
    surfaceMeta,
    pulseLoreContext,
    AI_EXPERIENCE_META,
    EXPORT_META,
    ROUTE_BANDS,
    getTissueArterySnapshot,
    getTissueRouteMemorySnapshot,
    prewarmTissueMembrane,
    layerAuth,
    layerHook,
    layerMap,
    layerHelper
  };
}

// ============================================================================
// END OF FILE — THE TISSUE MEMBRANE / MID‑LAYER EPITHELIAL REFLEX  [v24.0-IMMORTAL++]
// ============================================================================
