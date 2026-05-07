/*
===============================================================================
FILE: /PULSE-UI/_COMPONENTS_EVOLUTION/PulseUIRuntime-v20.js
LAYER: UI RUNTIME ORGAN — APPLY BLUEPRINT TO DOM — v20
===============================================================================
AI_EXPERIENCE_META = {
  identity: "PulseUI.Runtime",
  version: "v20",
  layer: "pulse_ui",
  role: "ui_runtime_muscle",
  lineage: "PulseUIRuntime-v14 → v16 → v20",

  evo: {
    runtimeOrgan: true,
    domAware: true,
    animationAware: true,
    comfortPatternAware: true,
    routeAware: true,

    deterministicWithinFrame: true,
    driftControlled: true,

    zeroNetwork: true,
    zeroFilesystem: true,

    blueprintAware: true,
    styleBundleAware: true,
    animationBundleAware: true,
    runtimeHintsAware: true
  },

  contract: {
    always: [
      "CompiledBlueprint",
      "StyleBundle",
      "AnimationBundle",
      "RuntimeHints"
    ],
    never: [
      "fetch",
      "WebSocket",
      "eval",
      "dynamicImport"
    ]
  }
}
===============================================================================
EXPORT_META = {
  organ: "PulseUI.Runtime",
  layer: "pulse_ui",
  stability: "STABLE",
  deterministic: "per-frame",

  consumes: [
    "CompiledBlueprint",
    "StyleBundle",
    "AnimationBundle",
    "RuntimeHints"
  ],

  produces: [
    "MountedUI",
    "UpdatedUI",
    "DetachedUI"
  ],

  sideEffects: "dom_mutation_only",
  network: "none",
  filesystem: "none"
}
===============================================================================
*/

// ============================================================================
// PULSE OS — v20
// UI RUNTIME — DOM APPLICATOR FOR BLUEPRINTS
// ============================================================================

const RUNTIME_SCHEMA_VERSION = "v2";

// ---------------------------------------------------------------------------
// ROLE BLOCK
// ---------------------------------------------------------------------------
export const UIRuntimeRole = {
  type: "Organ",
  subsystem: "UI",
  layer: "Runtime",
  version: "20.0",
  identity: "PulseUIRuntime",

  evo: {
    runtimeOrgan: true,
    domAware: true,
    animationAware: true,
    comfortPatternAware: true,
    routeAware: true,
    blueprintAware: true,
    styleBundleAware: true,
    animationBundleAware: true,
    runtimeHintsAware: true
  }
};

// ---------------------------------------------------------------------------
// INTERNAL HELPERS — DOM-SAFE WRAPPERS
// ---------------------------------------------------------------------------

function hasDOM() {
  return typeof document !== "undefined" && typeof window !== "undefined";
}

function ensureRoot(rootSelector) {
  if (!hasDOM()) return null;
  const sel = rootSelector || "#app";
  return document.querySelector(sel);
}

function applyStyleBundle(styleBundle, styleId = "pulse-ui-runtime-style") {
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

function applyAnimationBundle(animationBundle, styleId = "pulse-ui-runtime-anim") {
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

function renderLayoutTree(rootEl, layoutTree) {
  if (!rootEl) return;
  if (!layoutTree) {
    rootEl.innerHTML = "";
    return;
  }

  // v20: keep it minimal and deterministic.
  // layoutTree is assumed to be a simple JSON structure:
  // { tag, props, children[] }
  rootEl.innerHTML = "";
  const node = createNodeFromLayout(layoutTree);
  if (node) rootEl.appendChild(node);
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

// ---------------------------------------------------------------------------
// FACTORY — RUNTIME ORGAN
// ---------------------------------------------------------------------------
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
    try {
      log(
        "[PulseUIRuntime-v20]",
        stage,
        JSON.stringify({
          schemaVersion: RUNTIME_SCHEMA_VERSION,
          seq: RuntimeState.mountSeq,
          ...details
        })
      );
    } catch {
      // never throw
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
      warn("[PulseUIRuntime-v20] NO_DOM_AVAILABLE");
      safeLog("MOUNT_NO_DOM", { error: errorInfo });
      return { ok: false, error: errorInfo };
    }

    if (!blueprint || typeof blueprint !== "object") {
      const errorInfo = "InvalidBlueprint";
      RuntimeState.lastError = errorInfo;
      warn("[PulseUIRuntime-v20] INVALID_BLUEPRINT");
      safeLog("MOUNT_INVALID_BLUEPRINT", { error: errorInfo });
      return { ok: false, error: errorInfo };
    }

    try {
      const rootEl = ensureRoot(rootSelector);
      if (!rootEl) {
        const errorInfo = "RootNotFound";
        RuntimeState.lastError = errorInfo;
        warn("[PulseUIRuntime-v20] ROOT_NOT_FOUND", rootSelector);
        safeLog("MOUNT_ROOT_NOT_FOUND", { error: errorInfo, rootSelector });
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

      return { ok: true };
    } catch (err) {
      const msg = String(err);
      RuntimeState.lastError = msg;
      warn("[PulseUIRuntime-v20] MOUNT_ERROR", msg);
      safeLog("MOUNT_ERROR", { error: msg });
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
      return { ok: true };
    }

    try {
      const rootEl = ensureRoot(rootSelector);
      if (rootEl) {
        rootEl.innerHTML = "";
      }
      safeLog("UNMOUNT_OK");
      return { ok: true };
    } catch (err) {
      const msg = String(err);
      RuntimeState.lastError = msg;
      warn("[PulseUIRuntime-v20] UNMOUNT_ERROR", msg);
      safeLog("UNMOUNT_ERROR", { error: msg });
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

  return PulseUIRuntime;
}

// ---------------------------------------------------------------------------
// GLOBAL REGISTRATION (OPTIONAL)
// ---------------------------------------------------------------------------
try {
  if (typeof window !== "undefined") {
    window.PulseUIRuntime = createPulseUIRuntime;
  }
  if (typeof globalThis !== "undefined") {
    globalThis.PulseUIRuntime = createPulseUIRuntime;
  }
  if (typeof global !== "undefined") {
    global.PulseUIRuntime = createPulseUIRuntime;
  }
} catch {
  // never throw
}
