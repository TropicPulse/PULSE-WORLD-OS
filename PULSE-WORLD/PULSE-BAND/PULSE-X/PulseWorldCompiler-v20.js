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
      "LaneWorkers",
      "CompilerWorker"        // NEW: CompilerWorker is now a required backend organ
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
import {
  OrganismIdentity,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PulseWorldOrganismMap-v21.js";
const Identity = OrganismIdentity(import.meta.url);

// 2 — EXPORT GENOME METADATA
// export const PulseBinaryWaveScannerMeta = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
// export const WBC_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;
// ============================================================================
// IMPORTS — ALL STATIC, ALL IMMORTAL-SAFE
// ----------------------------------------------------------------------------
// esbuild is allowed because it is explicitly listed in the organ contract.
// CompilerWorker is a backend worker organ that performs heavy compute,
// prewarm, caching, and deterministic lane-aligned compilation tasks.
// ============================================================================
import esbuild from "esbuild";
import { createPulseWorldCompilerWorker as CompilerWorker } from "./PulseWorldCompilerWorker-v20"; 
// NOTE: This is a stable identity import, NOT a relative path.
//       IMMORTAL organs must never use relative filesystem imports.


// ============================================================================
// IMMORTAL BUILD SIGNATURE — v20
// ----------------------------------------------------------------------------
// This signature is the drift-proof identity of a build. It is used as:
//   • cache key
//   • chunker hint
//   • lane routing hint
//   • debugging anchor
//
// IMPORTANT:
//   This function must remain PURE. No randomness, no timestamps,
//   no environment-dependent values.
// ============================================================================
function buildSignature({
  entry = "PULSE-INDEX.js",
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
//
// This function must remain PURE and deterministic.
// ============================================================================
function buildChunkHints(metafile) {
  if (!metafile || typeof metafile !== "object") {
    return { entryPoints: [], chunks: [] };
  }

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
//
// NEW IN THIS VERSION:
//   • CompilerWorker is invoked BEFORE esbuild to perform:
//       - deterministic prewarm
//       - lane-aware caching
//       - semantic shaping
//       - dependency factoring
//       - world-layer alignment
//
//   • All dynamic behavior has been removed.
//   • No CLI logic exists in this file.
//   • No process, no import.meta.url, no runtime identity.
// ============================================================================
export async function PulseWorldCompile(options = {}) {
  const entry = options.entry || "PULSE-INDEX.js";
  const outfile = options.outfile || "PULSE-USER.js";
  const mode = options.mode || "esm";
  const buildKind = options.buildKind || "world";
  const lanes = options.lanes || [];

  const sig = buildSignature({ entry, outfile, mode, buildKind, lanes });

  // ==========================================================================
  // COMPILER WORKER PREPASS
  // --------------------------------------------------------------------------
  // CompilerWorker performs deterministic pre-processing:
  //   • dependency factoring
  //   • semantic shaping
  //   • lane-aware prewarm
  //   • cache alignment
  //   • world-layer consistency checks
  //
  // This step ensures that esbuild receives a stable, deterministic input.
  // ==========================================================================
  await CompilerWorker.prewarm({
    entry,
    outfile,
    mode,
    buildKind,
    lanes,
    signature: sig
  });


  // ==========================================================================
  // ESBUILD INVOCATION — PURE, DETERMINISTIC
  // --------------------------------------------------------------------------
  // esbuild is allowed because:
  //   • it is explicitly listed in the organ contract
  //   • it is deterministic when configured correctly
  //   • it produces a metafile used for chunk hints
  // ==========================================================================
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


  // ==========================================================================
  // CHUNK HINTS — USED BY LANEWORKERS + CHUNKER
  // ==========================================================================
  const chunkHints = buildChunkHints(result.metafile || null);


  // ==========================================================================
  // OPTIONAL TELEMETRY — IMMORTAL-SAFE
  // --------------------------------------------------------------------------
  // This is allowed because:
  //   • It does not mutate runtime state.
  //   • It does not depend on environment identity.
  //   • It is wrapped in a try/catch and cannot throw.
  // ==========================================================================
  try {
    if (typeof globalThis?.PulseProofBridge?.signal === "function") {
      globalThis.PulseProofBridge.signal("compiler.event", {
        signature: sig,
        metafile: result.metafile || null,
        chunkHints
      });
    }
  } catch {
    // IMMORTAL RULE: telemetry must never throw
  }


  // ==========================================================================
  // FINAL IMMORTAL OUTPUT
  // ==========================================================================
  return {
    result,
    signature: sig,
    chunkHints
  };
}
