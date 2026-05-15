/*
===============================================================================
FILE: /PULSE-UNIVERSE/PulseUIRuntime-v24-Immortal-Evo+++.js
PULSE OS — v24-IMMORTAL-EVO+++
UI RUNTIME — DOM APPLICATOR FOR BLUEPRINTS / EVIDENCE-AWARE / FLOW-AWARE
Offline-First • LocalStorage+CoreMemory Mirrored • Replay-Aware
Route-Aware • Session-Aware • PulseBand-Aware • Portal-Aware
Diagnostics-Aware • ErrorSpine-Aware • Future-Evolution-Ready
===============================================================================
AI_EXPERIENCE_META = {
  identity: "PulseUIRuntime",
  version: "v24-Immortal-Evo+++",
  layer: "pulse_ui",
  role: "ui_runtime_dom_applicator",
  lineage: "PulseUIRuntime-v20 → v24-Immortal-Evo+++",

  evo: {
    runtimeOrgan: true,
    domAware: true,
    animationAware: true,
    comfortPatternAware: true,
    routeAware: true,
    blueprintAware: true,
    styleBundleAware: true,
    animationBundleAware: true,
    runtimeHintsAware: true,

    // determinism / safety
    deterministic: true,
    driftProof: true,
    zeroNetwork: true,
    zeroFilesystem: true,
    zeroMutationOfInput: true,

    // v24 IMMORTAL
    offlineFirst: true,
    localStoreMirrored: true,
    replayAware: true,
    modeAgnostic: true,
    diagnosticsAware: true,
    evidenceAware: true,
    adminPanelAware: true,
    uiErrorSpineV20Aware: true,
    uiFlowAware: true,
    trustFabricAware: true,
    pulseBandAware: true,
    portalAware: true,
    timeAxisAware: true,
    sessionAware: true,
    advantageAware: true
  },

  contract: {
    always: [
      "PulseWindow",
      "PulsePresence",
      "PulseChunks",
      "PulseUIFlow",
      "PulseUIErrors",
      "PulseProofBridge",
      "PulseCore.Memory",
      "PulseWorldAdminPanel",
      "AdminDiagnosticsOrgan",
      "PulsePortal",
      "PulseBand"
    ],
    never: [
      "legacyUIRuntime",
      "safeRoute",
      "fetchViaCNS",
      "directNetworkCalls",
      "filesystemWrites"
    ]
  }
}
===============================================================================
EXPORT_META = {
  organ: "PulseUIRuntime",
  layer: "pulse_ui",
  stability: "IMMORTAL",
  deterministic: true,
  pure: false, // DOM side-effects only
  consumes: [
    "CompiledBlueprint",
    "StyleBundle",
    "AnimationBundle",
    "RuntimeHints",
    "UIFlowStateSnapshot"
  ],
  produces: [
    "UIRuntimeMountEnvelope",
    "UIRuntimeDiagnosticsEnvelope"
  ],
  sideEffects: "dom_and_localstorage_and_corememory_write_only",
  network: "none",
  filesystem: "none"
}
===============================================================================
*/

// ============================================================================
// GLOBAL HANDLE + CORE MEMORY BRIDGE
// ============================================================================

const G =
  (typeof window !== "undefined" && window) ||
  (typeof globalThis !== "undefined" && globalThis) ||
  (typeof self !== "undefined" && self) ||
  (typeof global !== "undefined" && global) ||
  {};
const g = G;
// ============================================================================
// UNIVERSAL TIMESTAMP (Shadow or Admin)
// ============================================================================

const Timestamp =
  (G.firebaseAdmin && G.firebaseAdmin.firestore && G.firebaseAdmin.firestore.Timestamp) ||
  (G.Timestamp && G.Timestamp) ||
  null;

// ============================================================================
// UNIVERSAL ADMIN (Shadow or Admin)
// ============================================================================

const admin =
  (G.firebaseAdmin && G.firebaseAdmin) ||
  (G.admin && G.admin) ||
  null;

// ============================================================================
// UNIVERSAL DB (Shadow DB ALWAYS wins)
// ============================================================================
const db =
  (G.db && G.db) ||                 // Shadow DB (v25++)
  (admin && admin.firestore && admin.firestore()) || // Admin fallback
  null;

// ============================================================================
// UNIVERSAL LOGGING
// ============================================================================

const dblog =
  (G.log && G.log) ||
  console.log;

const dberror =
  (G.error && G.error) ||
  console.error;
  
const fetchFn =
  (G.fetchfn && typeof G.fetchfn === "function" && G.fetchfn) ||   // Shadow fetch alias
  (G.fetch && typeof G.fetch === "function" && G.fetch) ||         // Global broadcasted Shadow.fetch
  null;

import { PulseProofBridge } from "../____BACKEND/PULSE-WORLD-BRIDGE.js";

const CoreMemory = PulseProofBridge?.coreMemory || null;
const Trust      = PulseProofBridge?.trust || null;

// ============================================================================
// IMMORTAL LOCALSTORAGE MIRROR — PulseUIRuntimeStore v24
// ============================================================================

const RUNTIME_SCHEMA_VERSION = "v3";
const UIRUNTIME_LS_KEY = "PulseUIRuntime.v24.buffer";
const UIRUNTIME_LS_MAX = 4000;

function runtimeHasLocalStorage() {
  try {
    if (typeof window === "undefined" || !window.localStorage) return false;
    const t = "__uiruntime_v24_test__";
    window.localStorage.setItem(t, "1");
    window.localStorage.removeItem(t);
    return true;
  } catch {
    return false;
  }
}

function runtimeLoadBuffer() {
  if (!runtimeHasLocalStorage()) return [];
  try {
    const raw = window.localStorage.getItem(UIRUNTIME_LS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function mirrorRuntimeBufferToCoreMemory(buf) {
  if (!CoreMemory || typeof CoreMemory.setRouteSnapshot !== "function") return;
  try {
    const envelope = {
      schemaVersion: RUNTIME_SCHEMA_VERSION,
      version: "24.0-Immortal-Evo+++",
      routeId: "uiRuntime",
      buffer: buf,
      timestamp: Date.now()
    };
    CoreMemory.setRouteSnapshot("uiRuntime", envelope);
  } catch {
    // best-effort only
  }
}

function runtimeSaveBuffer(buf) {
  if (!runtimeHasLocalStorage()) return;
  try {
    const trimmed =
      buf.length > UIRUNTIME_LS_MAX ? buf.slice(buf.length - UIRUNTIME_LS_MAX) : buf;
    window.localStorage.setItem(UIRUNTIME_LS_KEY, JSON.stringify(trimmed));
    mirrorRuntimeBufferToCoreMemory(trimmed);
  } catch {}
}

function appendRuntimeRecord(kind, payload) {
  const entry = {
    ts: Date.now(),
    kind,
    payload
  };
  const buf = runtimeLoadBuffer();
  buf.push(entry);
  runtimeSaveBuffer(buf);
}

export const PulseUIRuntimeStore = {
  getAll() {
    return runtimeLoadBuffer();
  },
  tail(n = 200) {
    const buf = runtimeLoadBuffer();
    return buf.slice(Math.max(0, buf.length - n));
  },
  clear() {
    runtimeSaveBuffer([]);
    try {
      CoreMemory?.setRouteSnapshot?.("uiRuntime", {
        schemaVersion: RUNTIME_SCHEMA_VERSION,
        version: "24.0-Immortal-Evo+++",
        routeId: "uiRuntime",
        buffer: [],
        cleared: true,
        timestamp: Date.now()
      });
    } catch {}
  }
};

// ============================================================================
// SURFACE CONTEXT — PORTAL / PULSEBAND / SESSION
// ============================================================================

const hasWindow = typeof window !== "undefined";

function readSurfaceContext() {
  if (!hasWindow) {
    return {
      route: null,
      surface: "unknown-surface",
      band: null,
      sessionId: null
    };
  }

  try {
    const portal = window.PulsePortal || null;
    const meta   = portal?.meta || null;

    const route =
      window.location?.pathname ||
      meta?.route ||
      null;

    const band =
      window.PulseBand?.mode ||
      null;

    const sessionId =
      window.PulseBand?.sessionId ||
      null;

    return {
      route,
      surface: meta?.pulseRole?.identity || "unknown-surface",
      band,
      sessionId
    };
  } catch {
    return {
      route: null,
      surface: "unknown-surface",
      band: null,
      sessionId: null
    };
  }
}

// ============================================================================
// ROLE BLOCK — v24 IMMORTAL EVO+++
// ============================================================================

export const UIRuntimeRole = {
  type: "Organ",
  subsystem: "UI",
  layer: "Runtime",
  version: "24.0-Immortal-Evo+++",
  identity: "PulseUIRuntime-v24-Immortal-Evo+++",

  evo: {
    runtimeOrgan: true,
    domAware: true,
    animationAware: true,
    comfortPatternAware: true,
    routeAware: true,
    blueprintAware: true,
    styleBundleAware: true,
    animationBundleAware: true,
    runtimeHintsAware: true,

    deterministic: true,
    driftProof: true,
    zeroNetwork: true,
    zeroFilesystem: true,
    zeroMutationOfInput: true,

    offlineFirst: true,
    localStoreMirrored: true,
    replayAware: true,
    modeAgnostic: true,
    diagnosticsAware: true,
    evidenceAware: true,
    adminPanelAware: true,
    uiErrorSpineV20Aware: true,
    uiFlowAware: true,
    trustFabricAware: true,
    pulseBandAware: true,
    portalAware: true,
    timeAxisAware: true,
    sessionAware: true,
    advantageAware: true
  }
};

// ============================================================================
// INTERNAL HELPERS — DOM-SAFE WRAPPERS
// ============================================================================

function hasDOM() {
  return typeof document !== "undefined" && typeof window !== "undefined";
}

function ensureRoot(rootSelector) {
  if (!hasDOM()) return null;
  const sel = rootSelector || "#app";
  return document.querySelector(sel);
}

function styleBundleToCSS(styleBundle) {
  if (!styleBundle || typeof styleBundle !== "object") return "";
  const tokens = styleBundle.tokens || {};
  let css = "";

  for (const selector in tokens) {
    const rules = tokens[selector];
    css += `${selector}{`;
    for (const prop in rules) {
      css += `${prop}:${rules[prop]};`;
    }
    css += "}";
  }

  return css;
}

function applyStyleBundle(styleBundle, styleId = "PULSE-BAND-runtime-style") {
  if (!hasDOM() || !styleBundle) return;

  const existing = document.getElementById(styleId);
  const cssText = styleBundleToCSS(styleBundle);

  if (existing) {
    existing.textContent = cssText;
    return;
  }

  const styleEl = document.createElement("style");
  styleEl.id = styleId;
  styleEl.textContent = cssText;
  document.head.appendChild(styleEl);
}

function animationBundleToCSS(animationBundle) {
  if (!animationBundle || typeof animationBundle !== "object") return "";
  const animations = animationBundle.animations || {};
  let css = "";

  for (const name in animations) {
    const def = animations[name];
    if (!def || !Array.isArray(def.keyframes)) continue;

    css += `@keyframes ${name}{`;
    for (const frame of def.keyframes) {
      const pct = frame.offset != null ? frame.offset * 100 : 0;
      css += `${pct}%{`;
      const props = frame.props || {};
      for (const prop in props) {
        css += `${prop}:${props[prop]};`;
      }
      css += "}";
    }
    css += "}";
  }

  return css;
}

function applyAnimationBundle(animationBundle, styleId = "PULSE-BAND-runtime-anim") {
  if (!hasDOM() || !animationBundle) return;

  const existing = document.getElementById(styleId);
  const cssText = animationBundleToCSS(animationBundle);

  if (existing) {
    existing.textContent = cssText;
    return;
  }

  const styleEl = document.createElement("style");
  styleEl.id = styleId;
  styleEl.textContent = cssText;
  document.head.appendChild(styleEl);
}

function createNodeFromLayout(nodeDef) {
  if (!hasDOM() || !nodeDef) return null;
  const tag = nodeDef.tag || "div";
  const el = document.createElement(tag);

  const props = nodeDef.props || {};
  for (const key in props) {
    if (key === "style" && typeof props.style === "object") {
      for (const s in props.style) {
        el.style[s] = props.style[s];
      }
    } else if (key === "className") {
      el.className = props[key];
    } else if (key.startsWith("data-")) {
      el.setAttribute(key, props[key]);
    } else if (key === "text") {
      el.textContent = props[key];
    } else {
      try {
        el.setAttribute(key, props[key]);
      } catch {
        // ignore invalid attributes
      }
    }
  }

  const children = nodeDef.children || [];
  for (const child of children) {
    const childNode = createNodeFromLayout(child);
    if (childNode) el.appendChild(childNode);
  }

  return el;
}

function renderLayoutTree(rootEl, layoutTree) {
  if (!rootEl) return;
  if (!layoutTree) {
    rootEl.innerHTML = "";
    return;
  }

  // v24: still minimal + deterministic.
  // layoutTree: { tag, props, children[] }
  rootEl.innerHTML = "";
  const node = createNodeFromLayout(layoutTree);
  if (node) rootEl.appendChild(node);
}

// ============================================================================
// DIAGNOSTICS ENVELOPE
// ============================================================================

function buildRuntimeDiagnosticsEnvelope(RuntimeState) {
  const surfaceCtx = readSurfaceContext();

  const envelope = {
    schemaVersion: RUNTIME_SCHEMA_VERSION,
    version: "24.0-Immortal-Evo+++",
    layer: "UI-Runtime",
    role: "PulseUIRuntime",
    state: {
      lastBlueprintId: RuntimeState.lastBlueprintId,
      lastRouteId: RuntimeState.lastRouteId,
      lastError: RuntimeState.lastError,
      mountSeq: RuntimeState.mountSeq
    },
    surface: surfaceCtx.surface,
    route: surfaceCtx.route,
    band: surfaceCtx.band,
    sessionId: surfaceCtx.sessionId,
    ts: Date.now()
  };

  appendRuntimeRecord("diagnostics_envelope", envelope);

  try {
    CoreMemory?.setRouteSnapshot?.("uiRuntimeDiagnostics", envelope);
  } catch {}

  return envelope;
}

// ============================================================================
// FACTORY — RUNTIME ORGAN v24 IMMORTAL EVO+++
// ============================================================================

export function createPulseUIRuntime({
  rootSelector = "#app",
  log = console.log,
  warn = console.warn
} = {}) {
  const RuntimeState = {
    lastBlueprintId: null,
    lastRouteId: null,
    lastError: null,
    mountSeq: 0
  };

  function nextSeq() {
    RuntimeState.mountSeq += 1;
    return RuntimeState.mountSeq;
  }

  function safeLog(stage, details = {}) {
    const surfaceCtx = readSurfaceContext();

    const payload = {
      schemaVersion: RUNTIME_SCHEMA_VERSION,
      seq: RuntimeState.mountSeq,
      surface: surfaceCtx.surface,
      route: surfaceCtx.route,
      band: surfaceCtx.band,
      sessionId: surfaceCtx.sessionId,
      ...details
    };

    appendRuntimeRecord("runtime_log", { stage, payload });

    try {
      log("[PulseUIRuntime-v24]", stage, JSON.stringify(payload));
    } catch {
      // never throw
    }
  }

  function mirrorStateToCoreMemory() {
    try {
      CoreMemory?.setRouteSnapshot?.("uiRuntimeState", {
        schemaVersion: RUNTIME_SCHEMA_VERSION,
        version: "24.0-Immortal-Evo+++",
        routeId: "uiRuntimeState",
        state: {
          lastBlueprintId: RuntimeState.lastBlueprintId,
          lastRouteId: RuntimeState.lastRouteId,
          lastError: RuntimeState.lastError,
          mountSeq: RuntimeState.mountSeq
        },
        timestamp: Date.now()
      });
    } catch {
      // best-effort
    }
  }

  /**
   * mountBlueprint
   * -------------------------------------------------------------------------
   * Applies:
   *   - styleBundle → <style> in <head>
   *   - animationBundle → <style> in <head>
   *   - layoutTree → DOM under rootSelector
   */
  function mountBlueprint({
    blueprint,
    styleBundle,
    animationBundle
  } = {}) {
    nextSeq();

    if (!hasDOM()) {
      const errorInfo = "NoDOM";
      RuntimeState.lastError = errorInfo;
      warn("[PulseUIRuntime-v24] NO_DOM_AVAILABLE");
      safeLog("MOUNT_NO_DOM", { error: errorInfo });
      buildRuntimeDiagnosticsEnvelope(RuntimeState);
      mirrorStateToCoreMemory();
      return { ok: false, error: errorInfo };
    }

    if (!blueprint || typeof blueprint !== "object") {
      const errorInfo = "InvalidBlueprint";
      RuntimeState.lastError = errorInfo;
      warn("[PulseUIRuntime-v24] INVALID_BLUEPRINT");
      safeLog("MOUNT_INVALID_BLUEPRINT", { error: errorInfo });
      buildRuntimeDiagnosticsEnvelope(RuntimeState);
      mirrorStateToCoreMemory();
      return { ok: false, error: errorInfo };
    }

    try {
      const rootEl = ensureRoot(rootSelector);
      if (!rootEl) {
        const errorInfo = "RootNotFound";
        RuntimeState.lastError = errorInfo;
        warn("[PulseUIRuntime-v24] ROOT_NOT_FOUND", rootSelector);
        safeLog("MOUNT_ROOT_NOT_FOUND", { error: errorInfo, rootSelector });
        buildRuntimeDiagnosticsEnvelope(RuntimeState);
        mirrorStateToCoreMemory();
        return { ok: false, error: errorInfo };
      }

      applyStyleBundle(styleBundle || blueprint.styleBundle);
      applyAnimationBundle(animationBundle || blueprint.animationBundle);
      renderLayoutTree(rootEl, blueprint.layoutTree);

      RuntimeState.lastBlueprintId = blueprint.id || null;
      RuntimeState.lastRouteId = blueprint.routeId || null;
      RuntimeState.lastError = null;

      safeLog("MOUNT_OK", {
        blueprintId: blueprint.id || null,
        routeId: blueprint.routeId || null
      });

      const diagEnvelope = buildRuntimeDiagnosticsEnvelope(RuntimeState);

      // Optional: trust fabric hook
      try {
        Trust?.recordEvent?.("uiRuntimeMount", {
          blueprintId: RuntimeState.lastBlueprintId,
          routeId: RuntimeState.lastRouteId,
          diagnostics: diagEnvelope
        });
      } catch {}

      mirrorStateToCoreMemory();

      return { ok: true };
    } catch (err) {
      const msg = String(err);
      RuntimeState.lastError = msg;
      warn("[PulseUIRuntime-v24] MOUNT_ERROR", msg);
      safeLog("MOUNT_ERROR", { error: msg });
      buildRuntimeDiagnosticsEnvelope(RuntimeState);
      mirrorStateToCoreMemory();

      // Optional: send to UI Error Spine if present
      try {
        const envelope = window?.PulseUIErrors?.normalizeError?.(err, "ui.runtime.mount");
        if (envelope) {
          window.PulseUIErrors.broadcast?.(envelope);
        }
      } catch {}

      return { ok: false, error: "MountError" };
    }
  }

  /**
   * unmount
   * -------------------------------------------------------------------------
   * Clears the root container.
   */
  function unmount() {
    nextSeq();

    if (!hasDOM()) {
      safeLog("UNMOUNT_NO_DOM");
      buildRuntimeDiagnosticsEnvelope(RuntimeState);
      mirrorStateToCoreMemory();
      return { ok: true };
    }

    try {
      const rootEl = ensureRoot(rootSelector);
      if (rootEl) {
        rootEl.innerHTML = "";
      }
      safeLog("UNMOUNT_OK");
      buildRuntimeDiagnosticsEnvelope(RuntimeState);
      mirrorStateToCoreMemory();
      return { ok: true };
    } catch (err) {
      const msg = String(err);
      RuntimeState.lastError = msg;
      warn("[PulseUIRuntime-v24] UNMOUNT_ERROR", msg);
      safeLog("UNMOUNT_ERROR", { error: msg });
      buildRuntimeDiagnosticsEnvelope(RuntimeState);
      mirrorStateToCoreMemory();

      try {
        const envelope = window?.PulseUIErrors?.normalizeError?.(err, "ui.runtime.unmount");
        if (envelope) {
          window.PulseUIErrors.broadcast?.(envelope);
        }
      } catch {}

      return { ok: false, error: "UnmountError" };
    }
  }

  const PulseUIRuntime = {
    UIRuntimeRole,
    RuntimeState,
    mountBlueprint,
    unmount
  };

  safeLog("INIT", {
    identity: UIRuntimeRole.identity,
    version: UIRuntimeRole.version,
    schemaVersion: RUNTIME_SCHEMA_VERSION
  });

  buildRuntimeDiagnosticsEnvelope(RuntimeState);
  mirrorStateToCoreMemory();

  return PulseUIRuntime;
}

// ============================================================================
// GLOBAL REGISTRATION (OPTIONAL) — v24 IMMORTAL EVO+++
// ============================================================================

try {
  if (typeof window !== "undefined") {
    window.PulseUIRuntime = createPulseUIRuntime;
    window.PulseUIRuntimeStore = PulseUIRuntimeStore;
  }
  if (typeof globalThis !== "undefined") {
    window.PulseUIRuntime = createPulseUIRuntime;
    window.PulseUIRuntimeStore = PulseUIRuntimeStore;
  }
  if (typeof global !== "undefined") {
    window.PulseUIRuntime = createPulseUIRuntime;
    window.PulseUIRuntimeStore = PulseUIRuntimeStore;
  }
  if (typeof g !== "undefined") {
    g.PulseUIRuntime = createPulseUIRuntime;
    g.PulseUIRuntimeStore = PulseUIRuntimeStore;
  }
} catch {
  // never throw
}
