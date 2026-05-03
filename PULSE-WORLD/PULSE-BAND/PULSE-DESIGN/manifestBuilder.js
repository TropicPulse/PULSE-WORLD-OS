/*
===============================================================================
AI_EXPERIENCE_META = {
  identity: "PulseDesign.Archivist",
  version: "v14-IMMORTAL",
  layer: "pulse_design",
  role: "canonical_manifest_archivist",
  lineage: "Archivist-v10.4 → v12.3 → v14-IMMORTAL",

  evo: {
    manifestBuilder: true,
    genomeArchivist: true,
    structuralAggregator: true,
    signatureAware: true,
    patternAware: true,
    symbolicPrimary: true,
    binaryAware: true,
    dualBand: true,

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

  consumes: ["rootDir"],
  produces: [
    "DesignManifest",
    "fileCount",
    "manifestPath"
  ],

  sideEffects: "none",
  network: "none",
  filesystem: "none"
}
===============================================================================
FILE: tropic-pulse-functions/PULSE-WORLD/PULSE-DESIGN/manifestBuilder.js
LAYER: THE ARCHIVIST (System Historian + Canonical Recorder + Genome Builder)
===============================================================================

ROLE (v14+):
  THE ARCHIVIST — Deterministic repo‑wide historian + genome builder.
  • Walks the entire project directory (via THE EXPLORER / repoWalker).
  • Classifies files using THE ANATOMIST (fileClassifier.js).
  • Aggregates structural + behavioral metadata into a canonical manifest.
  • Acts as the “genome archivist” of the digital organism.

PURPOSE (v14+):
  • Build a complete, deterministic, evolvable DesignManifest.
  • Capture structural, behavioral, evolutionary, and lineage metadata.
  • Provide a stable architecture snapshot for PulseCoreMemory + Runtime.

CONTRACT:
  • PURE FUNCTION — no side effects except returning manifest data.
  • READ‑ONLY — no writes except via THE SCRIBE (manifestWriter).
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
import { walkRepo } from "./repoWalker.js";          // THE EXPLORER
import { classifyFile } from "./fileClassifier.js";  // THE ANATOMIST
import { writeManifest } from "./manifestWriter.js"; // THE SCRIBE

// ============================================================================
// PUBLIC API — Build Canonical Architecture Manifest (v14+)
// ============================================================================
export async function buildManifest(rootDir) {
  const manifest = {
    generatedAt: new Date().toISOString(),
    root: rootDir,

    // Canonical v14+ fields
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
    healingHooks: [],
  };

  // Deterministic repo walk
  const filePaths = walkRepo(rootDir);

  for (const absPath of filePaths) {
    const relPath = path.relative(rootDir, absPath);

    // Skip build artifacts
    if (
      relPath.includes("node_modules") ||
      relPath.includes(".next") ||
      relPath.includes("dist")
    ) {
      continue;
    }

    // Anatomical classification (v14+ signature-based)
    const fileInfo = classifyFile(absPath);

    manifest.files.push(fileInfo);
    manifest.classifications.push(fileInfo.classification);

    // Organ-level aggregation
    manifest.organs.push({
      path: fileInfo.path,
      type: fileInfo.type,
      hints: fileInfo.classification.organHints,
      pattern: fileInfo.classification.patternId,
      confidence: fileInfo.classification.confidence,
    });

    // Pattern aggregation
    manifest.patterns.push({
      file: fileInfo.path,
      pattern: fileInfo.classification.patternId,
    });

    // Band + signal aggregation
    manifest.bands.push({
      file: fileInfo.path,
      pulseBand: fileInfo.usesPulseBand,
      healing: fileInfo.usesHealing,
    });

    manifest.signals.push({
      file: fileInfo.path,
      firestore: fileInfo.signals.firestore,
      sql: fileInfo.signals.sql,
      pulseFields: fileInfo.signals.pulseFields,
    });

    // Data sources
    if (fileInfo.dataSources.length > 0) {
      manifest.dataSources.push({
        file: fileInfo.path,
        sources: fileInfo.dataSources,
      });
    }

    // Legacy structural categorization (kept for compatibility)
    if (fileInfo.type === "page") manifest.pages.push(fileInfo);
    if (fileInfo.type === "component") manifest.components.push(fileInfo);
    if (fileInfo.type === "layout") manifest.layouts.push(fileInfo);
    if (fileInfo.type === "api") manifest.apis.push(fileInfo);

    // Legacy feature categorization
    if (fileInfo.usesPulseBand) manifest.pulseband.push(fileInfo);
    if (fileInfo.usesHealing) manifest.healingHooks.push(fileInfo);
  }

  // Write canonical manifest via THE SCRIBE
  const outPath = writeManifest(rootDir, manifest);

  return {
    success: true,
    manifestPath: outPath,
    fileCount: manifest.files.length,
    manifest,
  };
}
