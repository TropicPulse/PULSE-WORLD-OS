/*
===============================================================================
FILE: /TROPIC-PULSE-FUNCTIONS/PULSE-UNIVERSE/PulseWorldCompiler-v30.js
ORGAN: PulseWorldCompiler
LAYER: WORLD TOOLING — SEMANTIC BUILD BRAIN — v30-IMMORTAL-BINARY
===============================================================================
*/
export const AI_EXPERIENCE_META = {
  identity: "PulseWorld.Compiler",
  version: "v30-Immortal-Binary",
  layer: "pulse_world",
  role: "semantic_build_brain",
  lineage: "PulseWorldCompiler-v16 → v18-Immortal → v20-Immortal → v30-Immortal-Binary",

  evo: {
    compilerOrgan: true,
    semanticAware: true,
    chunkerAligned: true,
    laneAware: true,
    actNowAware: true,
    portalAware: true,

    deterministicBuilds: true,
    driftProofSignatures: true,
    cacheKeyAware: true,

    zeroRuntimeMutation: true,
    zeroPageCoupling: true,

    esbuildAware: true,
    esmFirst: true,
    jsxAware: true,

    // v30 additions
    worldBinaryAware: true,      // plugs into world binary core
    meshAware: true,             // emits mesh-friendly chunk hints
    satelliteMeshAware: true,    // aware of host/satellite routing modes
    gpuLymphAware: true          // safe for GPU lymph nodes / tempo
  },

  contract: {
    always: [
      "esbuild",
      "PulseProofBridge.signal",
      "Chunker",
      "LaneWorkers",
      "CompilerWorker",          // backend organ
      "WorldBinaryCore"         // conceptual: compiler emits binary surfaces
    ],
    never: [
      "DOM",
      "window",
      "document",
      "runtimeGlobalMutation"
    ]
  }
};

export const EXPORT_META = {
  organ: "PulseWorld.Compiler",
  layer: "pulse_world",
  stability: "IMMORTAL",
  deterministic: "per-build",

  consumes: [
    "SourceTree",
    "EntryPoint",
    "BuildMode",
    "LaneConfig",
    "WorldBinaryContext"        // v30: optional world binary / mesh context
  ],

  produces: [
    "ESMBundle",
    "MetaFile",
    "BuildSignature",
    "ChunkHints",
    "BinaryBuildSurface"        // v30: binary-aware build surface
  ],

  sideEffects: "filesystem_write_only",
  network: "none"
};

// ============================================================================
// IMPORTS — ALL STATIC, ALL IMMORTAL-SAFE
// ============================================================================
import esbuild from "esbuild";
import { createPulseWorldCompilerWorker as CompilerWorker } from "./PulseWorldCompilerWorker-v30.js";

// ============================================================================
// IMMORTAL BUILD SIGNATURE — v30 (binary + mesh aware)
// ============================================================================
function buildSignature({
  entry = "PULSE-INDEX.js",
  outfile = "PULSE-USER.js",
  mode = "esm",
  buildKind = "world",
  lanes = [],
  worldBinaryContext = null
} = {}) {
  const binaryHint = worldBinaryContext?.binaryMode || "symbolic";
  const meshHint = worldBinaryContext?.meshMode || "mesh-first";
  const satelliteHint = worldBinaryContext?.satelliteMode || "auto";

  return {
    version: "v30-IMMORTAL-BINARY",
    buildKind,
    entry,
    outfile,
    mode,
    lanes,
    deterministic: true,

    // v30: routing + binary hints baked into signature (still pure)
    binaryMode: binaryHint,        // "symbolic" | "binary" | "hybrid"
    meshMode: meshHint,            // "mesh-first" | "host-mesh" | "satellite-mesh"
    satelliteMode: satelliteHint   // "auto" | "forced" | "disabled"
  };
}

// ============================================================================
// CHUNK HINTS — v30 (mesh + binary aware)
// ============================================================================
function buildChunkHints(metafile, signature) {
  if (!metafile || typeof metafile !== "object") {
    return {
      entryPoints: [],
      chunks: [],
      meshAffinity: "unknown",
      binaryAffinity: "symbolic"
    };
  }

  const entryPoints = Object.keys(metafile.entryPoints || {});
  const outputs = Object.keys(metafile.outputs || {});
  const chunks = outputs.filter((o) => o.endsWith(".js"));

  // v30: simple, deterministic affinity surfaces
  const meshAffinity =
    signature.meshMode === "mesh-first" ? "high" :
    signature.meshMode === "host-mesh" ? "medium" :
    signature.meshMode === "satellite-mesh" ? "edge" :
    "unknown";

  const binaryAffinity =
    signature.binaryMode === "binary" ? "binary" :
    signature.binaryMode === "hybrid" ? "hybrid" :
    "symbolic";

  return {
    entryPoints,
    chunks,
    meshAffinity,
    binaryAffinity
  };
}

// ============================================================================
// BINARY BUILD SURFACE — v30
// ----------------------------------------------------------------------------
// This is what the world-binary core / router / daemon can read.
// It is descriptive only, no routing, no IO.
// ============================================================================
function buildBinaryBuildSurface(signature, chunkHints) {
  const entityId = `build::${signature.entry}::${signature.outfile}`;

  return {
    id: entityId,
    kind: "world_build",
    band: signature.binaryMode === "binary" ? "binary" : "symbolic",
    throughputClass:
      chunkHints.meshAffinity === "high" ? "throughput_high" :
      chunkHints.meshAffinity === "edge" ? "throughput_medium" :
      "throughput_low",
    throughputScore:
      chunkHints.meshAffinity === "high" ? 0.8 :
      chunkHints.meshAffinity === "edge" ? 0.6 :
      0.4,
    advantageTier:
      signature.binaryMode === "binary" ? 2 :
      signature.binaryMode === "hybrid" ? 1 :
      0,
    advantageScore:
      signature.binaryMode === "binary" ? 0.4 :
      signature.binaryMode === "hybrid" ? 0.2 :
      0.1,

    binaryDensity:
      chunkHints.binaryAffinity === "binary" ? 0.9 :
      chunkHints.binaryAffinity === "hybrid" ? 0.6 :
      0.3,

    waveAmplitude:
      chunkHints.meshAffinity === "high" ? 32 :
      chunkHints.meshAffinity === "edge" ? 24 :
      16,

    parity: 0,
    shiftDepth: 5,

    baseFormulaKey: "world_build_v30",
    localChunkerRef: true
  };
}

// ============================================================================
// CORE COMPILER BRAIN — PulseWorldCompile (v30)
// ============================================================================
export async function PulseWorldCompile(options = {}) {
  const entry = options.entry || "PULSE-INDEX.js";
  const outfile = options.outfile || "PULSE-USER.js";
  const mode = options.mode || "esm";
  const buildKind = options.buildKind || "world";
  const lanes = options.lanes || [];
  const worldBinaryContext = options.worldBinaryContext || null;

  const sig = buildSignature({
    entry,
    outfile,
    mode,
    buildKind,
    lanes,
    worldBinaryContext
  });

  // --------------------------------------------------------------------------
  // COMPILER WORKER PREPASS (still v20 worker, now fed v30 signature)
  // --------------------------------------------------------------------------
  await CompilerWorker.prewarm({
    entry,
    outfile,
    mode,
    buildKind,
    lanes,
    signature: sig,
    worldBinaryContext
  });

  // --------------------------------------------------------------------------
  // ESBUILD INVOCATION — PURE, DETERMINISTIC
  // --------------------------------------------------------------------------
  const result = await esbuild.build({
    entryPoints: [entry],
    bundle: true,
    outfile,
    minify: options.minify ?? false,
    sourcemap: options.sourcemap ?? true,
    format: mode,
    metafile: true,
    splitting: options.splitting ?? true,
    chunkNames: options.chunkNames ?? "chunks/[name]-[hash]",
    loader: {
      ".js": "jsx",
      ".jsx": "jsx",
      ...(options.loader || {})
    },
    define: {
      ...(options.define || {})
    },
    target: options.target || ["es2020"],
    platform: options.platform || "browser"
  });

  // --------------------------------------------------------------------------
  // CHUNK HINTS + BINARY BUILD SURFACE
  // --------------------------------------------------------------------------
  const chunkHints = buildChunkHints(result.metafile || null, sig);
  const binaryBuildSurface = buildBinaryBuildSurface(sig, chunkHints);

  // --------------------------------------------------------------------------
  // OPTIONAL TELEMETRY — IMMORTAL-SAFE (no window usage)
// --------------------------------------------------------------------------
  try {
    const bridge = globalThis?.PulseProofBridge;
    if (bridge && typeof bridge.signal === "function") {
      bridge.signal("compiler.event", {
        signature: sig,
        metafile: result.metafile || null,
        chunkHints,
        binaryBuildSurface
      });
    }
  } catch {
    // IMMORTAL RULE: telemetry must never throw
  }

  // --------------------------------------------------------------------------
  // FINAL IMMORTAL OUTPUT
  // --------------------------------------------------------------------------
  return {
    result,
    signature: sig,
    chunkHints,
    binaryBuildSurface
  };
}

export default PulseWorldCompile;
