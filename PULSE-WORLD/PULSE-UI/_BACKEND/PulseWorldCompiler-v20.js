/*
===============================================================================
FILE: /TROPIC-PULSE-FUNCTIONS/PULSE-WORLD/PulseWorldCompiler-v20.js
ORGAN: PulseWorldCompiler
LAYER: WORLD TOOLING — SEMANTIC BUILD BRAIN — v20-IMMORTAL
===============================================================================
AI_EXPERIENCE_META = {
  identity: "PulseWorld.Compiler",
  version: "v20-Immortal",
  layer: "pulse_world",
  role: "semantic_build_brain",
  lineage: "PulseWorldCompiler-v16 → v18-Immortal → v20-Immortal",

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
    jsxAware: true
  },

  contract: {
    always: [
      "esbuild",
      "PulseProofBridge.signal",
      "Chunker",
      "LaneWorkers"
    ],
    never: [
      "DOM",
      "window",
      "document",
      "runtimeGlobalMutation"
    ]
  }
}
===============================================================================
EXPORT_META = {
  organ: "PulseWorld.Compiler",
  layer: "pulse_world",
  stability: "IMMORTAL",
  deterministic: "per-build",

  consumes: [
    "SourceTree",
    "EntryPoint",
    "BuildMode",
    "LaneConfig"
  ],

  produces: [
    "ESMBundle",
    "MetaFile",
    "BuildSignature",
    "ChunkHints"
  ],

  sideEffects: "filesystem_write_only",
  network: "none"
}
===============================================================================
*/

import esbuild from "esbuild";

// ============================================================================
// IMMORTAL BUILD SIGNATURE — v20
// ----------------------------------------------------------------------------
// This signature is the drift-proof identity of a build. It is used as:
//   • cache key
//   • chunker hint
//   • lane routing hint
//   • debugging anchor
// ============================================================================
function buildSignature({
  entry = "index.js",
  outfile = "PULSE-USER.js",
  mode = "esm",
  buildKind = "world",
  lanes = []
} = {}) {
  return {
    version: "v20-IMMORTAL",
    buildKind,
    entry,
    outfile,
    mode,
    lanes,
    deterministic: true
  };
}

// ============================================================================
// CHUNK HINTS — v20
// ----------------------------------------------------------------------------
// These hints are used by the chunker / lane workers to:
//   • prewarm hot modules
//   • parallelize heavy lanes
//   • understand dependency fan-out
// ============================================================================
function buildChunkHints(metafile) {
  if (!metafile || typeof metafile !== "object") return { entryPoints: [], chunks: [] };

  const entryPoints = Object.keys(metafile.entryPoints || {});
  const outputs = Object.keys(metafile.outputs || {});
  const chunks = outputs.filter((o) => o.endsWith(".js"));

  return {
    entryPoints,
    chunks
  };
}

// ============================================================================
// CORE COMPILER BRAIN — PulseWorldCompile (v20)
// ----------------------------------------------------------------------------
// This is a TOOL organ, not a runtime organ.
// It is allowed to be async (filesystem + esbuild).
// ============================================================================
export async function PulseWorldCompile(options = {}) {
  const entry = options.entry || "index.js";
  const outfile = options.outfile || "PULSE-USER.js";
  const mode = options.mode || "esm";
  const buildKind = options.buildKind || "world";
  const lanes = options.lanes || [];

  const sig = buildSignature({ entry, outfile, mode, buildKind, lanes });

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

  const chunkHints = buildChunkHints(result.metafile || null);

  // Optional: emit compiler event to bridge (if available)
  try {
    if (typeof globalThis?.PulseProofBridge?.signal === "function") {
      globalThis.PulseProofBridge.signal("compiler.event", {
        signature: sig,
        metafile: result.metafile || null,
        chunkHints
      });
    }
  } catch {
    // never throw from telemetry
  }

  return {
    result,
    signature: sig,
    chunkHints
  };
}

// ============================================================================
// DEFAULT INVOCATION — CLI MODE
// ----------------------------------------------------------------------------
// Allows: node PulseWorldCompiler-v20.js
// ============================================================================
if (import.meta.url === `file://${process.argv[1]}`) {
  PulseWorldCompile().catch(() => process.exit(1));
}
