/*
===============================================================================
AI_EXPERIENCE_META = {
  identity: "PulseDesign.Surveyor",
  version: "v17-IMMORTAL",
  layer: "pulse_design",
  role: "canonical_blueprint_writer",
  lineage: "Surveyor-v10.4 → v12.3 → v14-Immortal → v17-IMMORTAL",

  evo: {
    blueprintWriter: true,
    canonicalRecorder: true,
    deterministicEmitter: true,
    symbolicPrimary: true,
    binaryAware: true,
    dualBand: true,
    bandAware: true,
    worldLayerReady: true,
    prewarmAware: true,
    cacheAware: true,

    deterministic: true,
    driftProof: true,
    pureCompute: true,

    zeroMutationOfInput: true,
    zeroNetwork: true,

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

  consumes: ["rootDir", "manifest", "options"],
  produces: ["manifestPath", "fileCount", "manifest", "meta"],

  sideEffects: "single_authorized_write",
  network: "none",
  filesystem: "write_only"
}
===============================================================================
FILE: PULSE-WORLD/PULSE-DESIGN/manifestWriter-v17.js
LAYER: THE SURVEYOR (Canonical Blueprint Writer, v17 IMMORTAL)
===============================================================================
*/

import fs from "fs";
import path from "path";

// ============================================================================
// PUBLIC API — Write Canonical Manifest (v17 IMMORTAL)
// ============================================================================
export function writeManifest(rootDir, manifest, options = {}) {
  if (!rootDir) {
    throw new Error("Surveyor-v17: missing rootDir");
  }
  if (!manifest) {
    throw new Error("Surveyor-v17: missing manifest object");
  }

  const {
    dryRun = false,
    prettyPrint = 2,
    stableSortFiles = true
  } = options || {};

  // --------------------------------------------------------------------------
  // Canonical output path
  // --------------------------------------------------------------------------
  const outPath = path.join(rootDir, "pulse_project.json");

  // --------------------------------------------------------------------------
  // v17: Stable ordering of manifest keys
  // --------------------------------------------------------------------------
  const orderedManifest = orderManifestV17(manifest, { stableSortFiles });

  // --------------------------------------------------------------------------
  // v17: Add manifestMeta block
  // --------------------------------------------------------------------------
  orderedManifest.manifestMeta = {
    version: "v17-IMMORTAL",
    generatedAt: orderedManifest.generatedAt,
    fileCount: orderedManifest.files?.length || 0,
    band: orderedManifest.band || "dual",
    worldTarget: orderedManifest.worldTarget || "hybrid"
  };

  // --------------------------------------------------------------------------
  // Deterministic JSON
  // --------------------------------------------------------------------------
  const json = JSON.stringify(orderedManifest, null, prettyPrint);

  // --------------------------------------------------------------------------
  // Authorized single write
  // --------------------------------------------------------------------------
  if (!dryRun) {
    fs.writeFileSync(outPath, json, "utf8");
  }

  return {
    success: true,
    manifestPath: dryRun ? null : outPath,
    fileCount: orderedManifest.files?.length || 0,
    manifest: orderedManifest,
    meta: {
      surveyorVersion: "v17-IMMORTAL",
      dryRun,
      stableSortFiles,
      prettyPrint
    }
  };
}

// ============================================================================
// v17 IMMORTAL — Deterministic Manifest Ordering
// ============================================================================
function orderManifestV17(manifest, { stableSortFiles }) {
  const clone = JSON.parse(JSON.stringify(manifest));

  // Sort files deterministically
  if (stableSortFiles && Array.isArray(clone.files)) {
    clone.files.sort((a, b) => {
      const pa = a.path || a.filePath || "";
      const pb = b.path || b.filePath || "";
      return pa.localeCompare(pb);
    });
  }

  // Canonical key ordering
  const ordered = {
    generatedAt: clone.generatedAt,
    root: clone.root,
    band: clone.band || "dual",
    worldTarget: clone.worldTarget || "hybrid",
    architectMeta: clone.architectMeta || null,
    organism: clone.organism || null,
    files: clone.files || []
  };

  return ordered;
}
