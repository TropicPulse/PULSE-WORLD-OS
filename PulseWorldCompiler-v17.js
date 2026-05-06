// ================================================================
//  ORGAN: PulseWorldCompiler-v17
//  LOCATION: TROPIC-PULSE-FUNCTIONS/PULSE-WORLD/
//  AUTHOR: Pulse OS (Aldwyn)
//  VERSION: 17
//  TYPE: Frontend Compiler Organ (Core Brain)
//  PURPOSE:
//      This organ wraps a real industrial-grade compiler (esbuild)
//      and exposes it to the Pulse-World organism as the primary
//      semantic transformation engine.
//
//      It does NOT:
//          - handle lanes
//          - handle chunking
//          - handle ACTNOW
//          - handle hot-swap
//
//      It DOES:
//          - compile JS/JSX into runnable ESM
//          - resolve imports/exports
//          - build a dependency graph
//          - emit a single deterministic output
//          - act as the "compiler brain" for future lane workers
//
//  FUTURE EXPANSION POINTS:
//      - Add lane workers (PulseWorldCompilerWorkers-v1)
//      - Add chunk-fed input (Chunker → Compiler integration)
//      - Add ACTNOW hot-swap output
//      - Add plugin transforms for Pulse-specific syntax
//
// ================================================================

import esbuild from 'esbuild';

// ---------------------------------------------------------------
//  PULSE WORLD COMPILER BRAIN (v1)
//  This is the minimal viable compiler wrapper.
//  It compiles your frontend entrypoint into a runnable ESM bundle.
// ---------------------------------------------------------------

export async function PulseWorldCompile() {
  return esbuild.build({
    entryPoints: ['index.js'],   // main JS entry
    bundle: true,
    outfile: 'PULSE-USER.js',
    minify: false,
    sourcemap: true,
    format: 'esm',
    loader: {
      '.js': 'jsx',
      '.jsx': 'jsx'
    }
  });
}

// ---------------------------------------------------------------
//  DEFAULT INVOCATION (optional)
//  Allows running this file directly via: node PulseWorldCompiler-v17.js
// ---------------------------------------------------------------
if (import.meta.url === `file://${process.argv[1]}`) {
  PulseWorldCompile().catch(() => process.exit(1));
}
