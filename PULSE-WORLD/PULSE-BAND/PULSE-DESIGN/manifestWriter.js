/*
===============================================================================
AI_EXPERIENCE_META = {
  identity: "PulseDesign.Surveyor",
  version: "v14-IMMORTAL",
  layer: "pulse_design",
  role: "canonical_blueprint_writer",
  lineage: "Surveyor-v10.4 → v12.3 → v14-IMMORTAL",

  evo: {
    blueprintWriter: true,
    canonicalRecorder: true,
    deterministicEmitter: true,
    symbolicPrimary: true,
    binaryAware: true,
    dualBand: true,

    deterministic: true,
    driftProof: true,
    pureCompute: true,

    zeroMutationOfInput: true,
    zeroNetwork: true,

    // NOTE:
    // This organ *allows* filesystem writes ONLY when explicitly invoked
    // by the caller as part of the design pipeline.
    // It never performs scanning, reading, or side‑effects beyond the
    // single authorized write.
    controlledFilesystemWrite: true
  },

  contract: {
    always: [
      "PulseDesign.Archivist",
      "PulseDesign.Anatomist",
      "PulseDesign.RepoWalker"
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
  organ: "PulseDesign.Surveyor",
  layer: "pulse_design",
  stability: "IMMORTAL",
  deterministic: true,

  consumes: ["rootDir", "manifest"],
  produces: ["manifestPath", "fileCount"],

  sideEffects: "single_authorized_write",
  network: "none",
  filesystem: "write_only"
}
===============================================================================
FILE: tropic-pulse-functions/PULSE-WORLD/PULSE-DESIGN/manifestWriter.js
LAYER: THE SURVEYOR (Canonical Blueprint Writer)
===============================================================================

ROLE (v14+):
  THE SURVEYOR — Canonical blueprint writer for Pulse OS.
  • Receives a fully‑formed DesignManifest from THE ARCHIVIST.
  • Emits the canonical pulse_project.json blueprint.
  • Ensures deterministic formatting, ordering, and output stability.
  • Acts as the “official cartographer” of the digital organism.

PURPOSE (v14+):
  • Produce a stable, machine‑readable + human‑readable architecture snapshot.
  • Guarantee deterministic JSON output.
  • Serve as the final stage of the Pulse‑Design pipeline.

CONTRACT:
  • PURE except for the single authorized write.
  • NO eval(), NO Function(), NO dynamic imports.
  • NO executing user code.
  • NO network calls.
  • Deterministic output only.

SAFETY:
  • v14+ upgrade is PURE + STRUCTURAL — logic is richer but still safe.
  • All behavior is deterministic and organism‑safe.
===============================================================================
*/

import fs from "fs";
import path from "path";

// ============================================================================
// PUBLIC API — Write Canonical Manifest (v14+)
// ============================================================================
export function writeManifest(rootDir, manifest) {
  if (!rootDir) {
    throw new Error("manifestWriter: missing rootDir");
  }
  if (!manifest) {
    throw new Error("manifestWriter: missing manifest object");
  }

  // Canonical output path
  const outPath = path.join(rootDir, "pulse_project.json");

  // Deterministic write — stable formatting, stable ordering
  const json = JSON.stringify(manifest, null, 2);

  // Authorized single write
  fs.writeFileSync(outPath, json, "utf8");

  return {
    success: true,
    manifestPath: outPath,
    fileCount: manifest.files?.length || 0,
  };
}
