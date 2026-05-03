/*
===============================================================================
AI_EXPERIENCE_META = {
  identity: "PulseDesign.Architect",
  version: "v14-IMMORTAL",
  layer: "pulse_design",
  role: "architectural_orchestrator_and_genome_conductor",
  lineage: "Architect-v10.4 → v12.3 → v14-IMMORTAL",

  evo: {
    architecturalOrchestrator: true,
    genomeConductor: true,
    pipelineCoordinator: true,
    organismAware: true,
    signatureAware: true,
    symbolicPrimary: true,
    binaryAware: true,
    dualBand: true,

    deterministic: true,
    driftProof: true,
    pureCompute: true,

    zeroMutationOfInput: true,
    zeroNetwork: true,

    // NOTE:
    // The Architect does not read or write files directly.
    // It delegates scanning to THE CARTOGRAPHER and writing to THE SURVEYOR.
    controlledDelegation: true
  },

  contract: {
    always: [
      "PulseDesign.Cartographer",
      "PulseDesign.Anatomist",
      "PulseDesign.Archivist",
      "PulseDesign.Surveyor",
      "PulseOS.OrganismMap"
    ],
    never: [
      "safeRoute",
      "fetchViaCNS",
      "dynamicImport",
      "eval",
      "Function"
    ]
  }
}
===============================================================================
EXPORT_META = {
  organ: "PulseDesign.Architect",
  layer: "pulse_design",
  stability: "IMMORTAL",
  deterministic: true,
  pure: true,

  consumes: ["rootDir"],
  produces: [
    "manifestPath",
    "fileCount",
    "organism"
  ],

  sideEffects: "delegated_write_only",
  network: "none",
  filesystem: "delegated"
}
===============================================================================
FILE: tropic-pulse-functions/PULSE-WORLD/PULSE-DESIGN/translator.js
LAYER: THE ARCHITECT (v14+ Orchestrator + Genome Conductor)
===============================================================================

ROLE (v14+):
  THE ARCHITECT — Master orchestrator of the Pulse‑Design pipeline.
  • Coordinates THE CARTOGRAPHER (repoWalker).
  • Coordinates THE ANATOMIST (fileClassifier).
  • Coordinates THE ARCHIVIST (manifestBuilder).
  • Coordinates THE SURVEYOR (manifestWriter).
  • Integrates the PulseOrganismMap (genome-level architecture).
  • Produces the canonical PulseManifest.

PURPOSE (v14+):
  • Provide a single deterministic entry point for architecture generation.
  • Translate raw filesystem → FileSignatures → Classifications → OrganismMap → Manifest.
  • Guarantee stable, evolvable, drift‑proof architectural output.

CONTRACT:
  • PURE ORCHESTRATION — no direct filesystem writes.
  • Delegates scanning + writing to other organs.
  • NO eval(), NO Function(), NO dynamic imports.
  • NO executing user code.
  • NO network calls.
  • Deterministic output only.

SAFETY:
  • v14+ upgrade is PURE + STRUCTURAL — logic is richer but still safe.
  • All behavior is deterministic and organism‑safe.
===============================================================================
*/

import path from "path";
import { walkRepo } from "./repoWalker.js";              // THE CARTOGRAPHER
import { writeManifest } from "./manifestWriter.js";     // THE SURVEYOR
import { buildPulseOrganismMap as buildOrganismMap } 
  from "../PULSE-OS/PulseOrganismMap.js";                // THE GENOME ENGINE

// ============================================================================
// PUBLIC API — Full Architectural Translation Pipeline (v14+)
// ============================================================================
export async function buildPulseManifest(rootDir) {
  if (!rootDir) {
    throw new Error("translator: missing rootDir");
  }

  const absRoot = path.resolve(rootDir);

  // --------------------------------------------------------------------------
  // Step 1 — CARTOGRAPHER: Walk repo + classify files (signature-based)
  // --------------------------------------------------------------------------
  const classifiedFiles = walkRepo(absRoot);

  // --------------------------------------------------------------------------
  // Step 2 — GENOME ENGINE: Build organism map (v14+)
  // --------------------------------------------------------------------------
  const organism = buildOrganismMap(classifiedFiles);

  // --------------------------------------------------------------------------
  // Step 3 — SURVEYOR: Write canonical manifest
  // --------------------------------------------------------------------------
  const manifest = {
    generatedAt: new Date().toISOString(),
    root: absRoot,
    files: classifiedFiles,
    organism,
  };

  const result = writeManifest(absRoot, manifest);

  return {
    success: true,
    manifestPath: result.manifestPath,
    fileCount: classifiedFiles.length,
    organism,
  };
}
