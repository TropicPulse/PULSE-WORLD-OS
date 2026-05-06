/*
===============================================================================
AI_EXPERIENCE_META = {
  identity: "PulseDesign.Archivist",
  version: "v17-IMMORTAL",
  layer: "pulse_design",
  role: "canonical_manifest_archivist",
  lineage: "Archivist-v10.4 → v12.3 → v14-Immortal → v17-IMMORTAL",

  evo: {
    manifestBuilder: true,
    genomeArchivist: true,
    structuralAggregator: true,
    signatureAware: true,
    patternAware: true,
    symbolicPrimary: true,
    binaryAware: true,
    dualBand: true,
    bandAware: true,
    worldLayerReady: true,
    translatorReady: true,
    runtimeReady: true,
    substrateReady: true,
    prewarmAware: true,
    cacheAware: true,

    deterministic: true,
    driftProof: true,
    pureCompute: true,

    zeroMutationOfInput: true,
    zeroNetwork: true,
    zeroFilesystem: true
  },

  contract: {
    always: [
      "PulseDesign.RepoWalker",
      "PulseDesign.Anatomist",
      "PulseDesign.Scribe"
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
  organ: "PulseDesign.Archivist",
  layer: "pulse_design",
  stability: "IMMORTAL",
  deterministic: true,
  pure: true,

  consumes: ["rootDir", "options"],
  produces: [
    "DesignManifest",
    "fileCount",
    "manifest"
  ],

  sideEffects: "none",
  network: "none",
  filesystem: "none"
}
===============================================================================
FILE: PULSE-WORLD/PULSE-DESIGN/manifestBuilder-v17.js
LAYER: THE ARCHIVIST (System Historian + Canonical Recorder + Genome Builder)
===============================================================================
*/

import path from "path";
import { walkRepo } from "./repoWalker-v17.js";          // THE CARTOGRAPHER (v17)
import { classifyFile } from "./PulseDesignFileClassifier.js";      // THE ANATOMIST
// NOTE: Surveyor is NOT imported here — Archivist never writes files.


// ============================================================================
// PUBLIC API — Build Canonical Architecture Manifest (v17 IMMORTAL)
// ============================================================================
export async function buildManifest(rootDir, options = {}) {
  if (!rootDir) {
    throw new Error("Archivist-v17: missing rootDir");
  }

  const {
    band = "dual",
    worldTarget = "hybrid",
    includeExtensions = null,
    excludePatterns = null,
    maxFileSizeBytes = 512 * 1024,
    enableCache = true
  } = options || {};

  // --------------------------------------------------------------------------
  // Step 1 — CARTOGRAPHER (v17): deterministic scan + meta
  // --------------------------------------------------------------------------
  const { files: fileSignatures, meta: cartographerMeta } = walkRepo(rootDir, {
    band,
    worldTarget,
    includeExtensions,
    excludePatterns,
    maxFileSizeBytes,
    enableCache
  });

  // --------------------------------------------------------------------------
  // Step 2 — ARCHIVIST: Build canonical v17 DesignManifest
  // --------------------------------------------------------------------------
  const manifest = {
    version: "v17-IMMORTAL",
    generatedAt: new Date().toISOString(),
    root: path.resolve(rootDir),

    band,
    worldTarget,

    cartographerMeta,

    // Canonical v17 fields
    files: [],
    classifications: [],
    organs: [],
    layers: [],
    patterns: [],
    signals: [],
    bands: [],
    dataSources: [],
    drift: [],
    lineage: [],
    routing: [],

    // Legacy compatibility fields
    pages: [],
    components: [],
    layouts: [],
    apis: [],
    pulseband: [],
    healingHooks: []
  };

  // --------------------------------------------------------------------------
  // Step 3 — ANATOMIST: classify each file signature
  // --------------------------------------------------------------------------
  for (const sig of fileSignatures) {
    const relPath = sig.path || sig.filePath || sig.rel || "";

    const fileInfo = classifyFile(relPath, sig.content, {
      band,
      worldTarget,
      size: sig.size,
      mtimeMs: sig.mtimeMs
    });

    // Canonical file list
    manifest.files.push(fileInfo);

    // Classification list
    manifest.classifications.push(fileInfo.classification);

    // Organ-level aggregation
    manifest.organs.push({
      path: fileInfo.path,
      type: fileInfo.type,
      hints: fileInfo.classification.organHints,
      pattern: fileInfo.classification.patternId,
      confidence: fileInfo.classification.confidence
    });

    // Pattern aggregation
    manifest.patterns.push({
      file: fileInfo.path,
      pattern: fileInfo.classification.patternId
    });

    // Band + signal aggregation
    manifest.bands.push({
      file: fileInfo.path,
      pulseBand: fileInfo.usesPulseBand,
      healing: fileInfo.usesHealing
    });

    manifest.signals.push({
      file: fileInfo.path,
      firestore: fileInfo.signals.firestore,
      sql: fileInfo.signals.sql,
      pulseFields: fileInfo.signals.pulseFields
    });

    // Data sources
    if (fileInfo.dataSources.length > 0) {
      manifest.dataSources.push({
        file: fileInfo.path,
        sources: fileInfo.dataSources
      });
    }

    // Legacy structural categorization
    if (fileInfo.type === "page") manifest.pages.push(fileInfo);
    if (fileInfo.type === "component") manifest.components.push(fileInfo);
    if (fileInfo.type === "layout") manifest.layouts.push(fileInfo);
    if (fileInfo.type === "api") manifest.apis.push(fileInfo);

    // Legacy feature categorization
    if (fileInfo.usesPulseBand) manifest.pulseband.push(fileInfo);
    if (fileInfo.usesHealing) manifest.healingHooks.push(fileInfo);
  }

  // --------------------------------------------------------------------------
  // Step 4 — Deterministic ordering (v17)
  // --------------------------------------------------------------------------
  manifest.files.sort((a, b) => a.path.localeCompare(b.path));
  manifest.classifications.sort((a, b) =>
    (a.patternId || "").localeCompare(b.patternId || "")
  );
  manifest.organs.sort((a, b) => a.path.localeCompare(b.path));
  manifest.patterns.sort((a, b) => a.file.localeCompare(b.file));
  manifest.bands.sort((a, b) => a.file.localeCompare(b.file));
  manifest.signals.sort((a, b) => a.file.localeCompare(b.file));
  manifest.dataSources.sort((a, b) => a.file.localeCompare(b.file));

  // --------------------------------------------------------------------------
  // Step 5 — Return canonical manifest (NO WRITES — Surveyor handles writing)
  // --------------------------------------------------------------------------
  return {
    success: true,
    fileCount: manifest.files.length,
    manifest
  };
}
