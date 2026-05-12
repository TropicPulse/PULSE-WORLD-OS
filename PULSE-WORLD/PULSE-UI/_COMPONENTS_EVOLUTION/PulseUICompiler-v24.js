/*
===============================================================================
FILE: /PULSE-UI/_CREATION_BARRIER/PulseUICompiler-v24.js
LAYER: UI GENOME → RENDERABLE BLUEPRINT COMPILER — IMMORTAL v24
===============================================================================
AI_EXPERIENCE_META = {
  identity: "PulseUI.Compiler",
  version: "v24-Immortal",
  layer: "pulse_ui",
  role: "ui_genome_compiler",
  lineage: "PulseUICompiler-v14 → v16 → v20-Immortal → v24-Immortal",

  evo: {
    compilerOrgan: true,
    uiGenomeAware: true,
    routeAware: true,
    comfortPatternAware: true,
    iqVersionAware: true,

    deterministic: true,
    pureCompute: true,
    driftProof: true,

    zeroNetwork: true,
    zeroFilesystem: true,
    zeroDomMutation: true,

    schemaVersioned: true,
    bandAware: true,
    advantageAware: true,
    evolutionMetaAware: true,
    runtimeHintsAware: true,
    prewarmAware: true,
    chunkProfileAware: true
  },

  contract: {
    always: [
      "UIGenome",
      "RouteId",
      "ComfortPattern",
      "PulseEvolutionaryMemory"
    ],
    never: [
      "document",
      "window",
      "fetch",
      "WebSocket",
      "localStorage"
    ]
  }
}
===============================================================================
EXPORT_META = {
  organ: "PulseUI.Compiler",
  layer: "pulse_ui",
  stability: "IMMORTAL",
  deterministic: true,
  pure: true,

  consumes: [
    "UIGenome",
    "RouteId",
    "ComfortPattern",
    "IQVersion"
  ],

  produces: [
    "CompiledBlueprint",
    "StyleBundle",
    "AnimationBundle",
    "RuntimeHints"
  ],

  sideEffects: "none",
  network: "none",
  filesystem: "none"
}
===============================================================================
*/

// ============================================================================
// PULSE OS — v24-IMMORTAL
// UI GENOME COMPILER — PURE, SYNC, ZERO-DOM
// ============================================================================

const COMPILER_SCHEMA_VERSION = "v4";

// ---------------------------------------------------------------------------
// ROLE BLOCK
// ---------------------------------------------------------------------------
export const UICompilerRole = {
  type: "Organ",
  subsystem: "UI",
  layer: "Compiler",
  version: "24.0-Immortal",
  identity: "PulseUICompiler",

  evo: {
    deterministic: true,
    pureCompute: true,
    driftProof: true,
    uiGenomeAware: true,
    routeAware: true,
    comfortPatternAware: true,
    iqVersionAware: true,
    bandAware: true,
    advantageAware: true,
    evolutionMetaAware: true,
    runtimeHintsAware: true,
    prewarmAware: true,
    chunkProfileAware: true
  }
};

// ---------------------------------------------------------------------------
// INTERNAL HELPERS — PURE TRANSFORMS
// ---------------------------------------------------------------------------

function normalizeRouteId(routeId) {
  if (!routeId) return "unknown";
  return String(routeId).trim() || "unknown";
}

function computeBlueprintId({ routeId, genomeVersion, iqVersion }) {
  const base = `${routeId}:${genomeVersion || "genome"}:${iqVersion || "iq"}`;
  let h = 0;
  for (let i = 0; i < base.length; i++) {
    h = (h * 31 + base.charCodeAt(i)) >>> 0;
  }
  return `BP-${COMPILER_SCHEMA_VERSION}-${h.toString(16).padStart(8, "0")}`;
}

function extractRouteSlice(uiGenome, routeId) {
  if (!uiGenome || typeof uiGenome !== "object") return null;
  const routes = uiGenome.routes || {};
  return routes[routeId] || null;
}

function buildStyleBundle(routeSlice, comfortPattern) {
  const baseTokens = routeSlice?.styleTokens || {};
  const comfortTokens = comfortPattern?.styleTokens || {};
  const bandTokens = comfortPattern?.bandTokens || {};
  const advantageTokens = comfortPattern?.advantageTokens || {};

  return {
    schemaVersion: COMPILER_SCHEMA_VERSION,
    tokens: {
      ...baseTokens,
      ...comfortTokens,
      ...bandTokens,
      ...advantageTokens
    }
  };
}

function buildAnimationBundle(routeSlice, comfortPattern) {
  const baseAnimations = routeSlice?.animations || {};
  const comfortAnimations = comfortPattern?.animations || {};
  const microInteractions = comfortPattern?.microInteractions || {};

  return {
    schemaVersion: COMPILER_SCHEMA_VERSION,
    animations: {
      ...baseAnimations,
      ...comfortAnimations,
      ...microInteractions
    }
  };
}

function buildRuntimeHints(routeSlice, iqVersion) {
  const prewarm = routeSlice?.prewarm || [];
  const criticalPaths = routeSlice?.criticalPaths || [];
  const comfortZones = routeSlice?.comfortZones || [];
  const chunkProfiles = routeSlice?.chunkProfiles || [];
  const band = routeSlice?.band || "dual";
  const advantageField = routeSlice?.advantageField || null;

  return {
    schemaVersion: COMPILER_SCHEMA_VERSION,
    iqVersion: iqVersion || null,
    prewarm,
    criticalPaths,
    comfortZones,
    chunkProfiles,
    band,
    advantageField
  };
}

// ---------------------------------------------------------------------------
// FACTORY — PURE COMPILER
// ---------------------------------------------------------------------------
export function createPulseUICompiler({
  log = console.log,
  warn = console.warn
} = {}) {
  const CompilerState = {
    lastBlueprint: null,
    lastError: null,
    compileSeq: 0
  };

  function nextSeq() {
    CompilerState.compileSeq += 1;
    return CompilerState.compileSeq;
  }

  function safeLog(stage, details = {}) {
    try {
      log(
        "[PulseUICompiler-v24]",
        stage,
        JSON.stringify({
          schemaVersion: COMPILER_SCHEMA_VERSION,
          seq: CompilerState.compileSeq,
          ...details
        })
      );
    } catch {
      // never throw from logging
    }
  }

  /**
   * compilePage
   * -------------------------------------------------------------------------
   * PURE, SYNC, ZERO-DOM
   *
   * Inputs:
   *   - uiGenome: full UI genome object
   *   - routeId: current route/page id
   *   - comfortPattern: comfort pattern object (optional)
   *   - iqVersion: current IQ/brain version (optional)
   *
   * Output:
   *   - { ok, blueprint, styleBundle, animationBundle, runtimeHints }
   */
  function compilePage({
    uiGenome,
    routeId,
    comfortPattern = null,
    iqVersion = null
  } = {}) {
    nextSeq();

    const normalizedRoute = normalizeRouteId(routeId);

    if (!uiGenome || typeof uiGenome !== "object") {
      const errorInfo = "InvalidGenome";
      CompilerState.lastError = errorInfo;
      warn("[PulseUICompiler-v24] INVALID_GENOME");
      safeLog("COMPILE_INVALID_GENOME", { error: errorInfo, routeId: normalizedRoute });
      return { ok: false, error: errorInfo };
    }

    try {
      const genomeVersion = uiGenome.version || "unknown";
      const routeSlice = extractRouteSlice(uiGenome, normalizedRoute);

      if (!routeSlice) {
        const errorInfo = "RouteNotFound";
        CompilerState.lastError = errorInfo;
        warn("[PulseUICompiler-v24] ROUTE_NOT_FOUND", normalizedRoute);
        safeLog("COMPILE_ROUTE_NOT_FOUND", {
          error: errorInfo,
          routeId: normalizedRoute
        });
        return { ok: false, error: errorInfo };
      }

      const blueprintId = computeBlueprintId({
        routeId: normalizedRoute,
        genomeVersion,
        iqVersion
      });

      const styleBundle = buildStyleBundle(routeSlice, comfortPattern);
      const animationBundle = buildAnimationBundle(routeSlice, comfortPattern);
      const runtimeHints = buildRuntimeHints(routeSlice, iqVersion);

      const blueprint = {
        schemaVersion: COMPILER_SCHEMA_VERSION,
        id: blueprintId,
        routeId: normalizedRoute,
        genomeVersion,
        iqVersion: iqVersion || null,
        comfortPatternId: comfortPattern?.id || null,
        layoutTree: routeSlice.layout || null,
        components: routeSlice.components || [],
        styleBundle,
        animationBundle,
        runtimeHints
      };

      CompilerState.lastBlueprint = blueprint;
      CompilerState.lastError = null;

      safeLog("COMPILE_OK", {
        blueprintId,
        routeId: normalizedRoute,
        genomeVersion,
        iqVersion
      });

      return {
        ok: true,
        blueprint,
        styleBundle,
        animationBundle,
        runtimeHints
      };
    } catch (err) {
      const msg = String(err);
      CompilerState.lastError = msg;
      warn("[PulseUICompiler-v24] COMPILE_ERROR", msg);
      safeLog("COMPILE_ERROR", { error: msg });
      return { ok: false, error: "CompileError" };
    }
  }

  const PulseUICompiler = {
    UICompilerRole,
    CompilerState,
    compilePage
  };

  safeLog("INIT", {
    identity: UICompilerRole.identity,
    version: UICompilerRole.version,
    schemaVersion: COMPILER_SCHEMA_VERSION
  });

  return PulseUICompiler;
}

// ---------------------------------------------------------------------------
// GLOBAL REGISTRATION (OPTIONAL, NO DOM TOUCH)
// ---------------------------------------------------------------------------
try {
  if (typeof globalThis !== "undefined") {
    global.PulseUICompiler = createPulseUICompiler;
  }
  if (typeof global !== "undefined") {
    global.PulseUICompiler = createPulseUICompiler;
  }
  if (typeof window !== "undefined") {
    global.PulseUICompiler = createPulseUICompiler;
  }
} catch {
  // never throw
}
