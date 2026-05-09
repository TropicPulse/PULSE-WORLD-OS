/*
===============================================================================
AI_EXPERIENCE_META = {
  identity: "PulseDesign.Architect",
  version: "v17-IMMORTAL",
  layer: "pulse_design",
  role: "architectural_orchestrator_and_genome_conductor",
  lineage: "Architect-v10.4 → v12.3 → v14-Immortal → v17-IMMORTAL",

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

    controlledDelegation: true,     // scanning/writing delegated only
    prewarmAware: true,             // can prewarm downstream organs
    cacheAware: true,               // can reuse prior scans in-process
    bandAware: true,                // can tag outputs with band/meta
    worldLayerReady: true,          // ready to feed world-layer genomes
    translatorReady: true           // ready to feed Pulse-Translator stack
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

  consumes: [
    "rootDir",
    "options"
  ],
  produces: [
    "manifestPath",
    "fileCount",
    "organism",
    "manifest",
    "meta"
  ],

  sideEffects: "delegated_write_only",
  network: "none",
  filesystem: "delegated"
}
===============================================================================
FILE: PULSE-WORLD/PULSE-DESIGN/translator-v17.js
LAYER: THE ARCHITECT (v17 IMMORTAL Orchestrator + Genome Conductor)
===============================================================================

ROLE (v17):
  THE ARCHITECT — Master orchestrator of the Pulse‑Design pipeline.
  • Coordinates THE CARTOGRAPHER (repoWalker).
  • Coordinates THE ANATOMIST (fileClassifier) via organism map.
  • Coordinates THE ARCHIVIST (manifestBuilder).
  • Coordinates THE SURVEYOR (manifestWriter).
  • Integrates the PulseOrganismMap (genome-level architecture).
  • Produces the canonical PulseManifest (dual-band, v17-ready).

PURPOSE (v17):
  • Provide a single deterministic entry point for architecture generation.
  • Translate raw filesystem → FileSignatures → Classifications → OrganismMap → Manifest.
  • Guarantee stable, evolvable, drift‑proof architectural output.
  • Optionally prewarm downstream organs and cache scan results per-process.
  • Emit manifest + meta suitable for Firebase/SQL translators and world genomes.

CONTRACT:
  • PURE ORCHESTRATION — no direct filesystem writes.
  • Delegates scanning + writing to other organs.
  • NO eval(), NO Function(), NO dynamic imports.
  • NO executing user code.
  • NO network calls.
  • Deterministic output only.

SAFETY:
  • v17 uplift is PURE + STRUCTURAL + ADVANTAGE‑AWARE.
  • All behavior is deterministic and organism‑safe.
===============================================================================
*/

import path from "path";
import { walkRepo } from "./PulseDesignRepoWalker.js";              // THE CARTOGRAPHER
import { writeManifest } from "./PulseDesignManifestWriter.js";     // THE SURVEYOR
import {
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PulseWorldOrganismMap-v21.js";               // THE GENOME ENGINE

// Optional: specs + translators awareness (no imports here to avoid coupling)
// Architect only tags meta so downstream can plug in:
//   PULSE-SPECS/PulseSpecsDNAGenome-v20.js
//   PULSE-TRANSLATOR/PulseTranslatorRNAIntake-v24.js
//   PULSE-TRANSLATOR/PulseTranslatorRNAOutput-v24.js
//   PULSE-TRANSLATOR/PulseTranslatorSkeletalIntake.js
//   PULSE-TRANSLATOR/PulseTranslatorSkeletalOutput.js

// ============================================================================
// IN-PROCESS CACHE (v17 IMMORTAL — deterministic, per-cold-start only)
// ============================================================================
const architectCache = {
  lastRoot: null,
  lastFiles: null,
  lastOrganism: null,
  lastManifest: null
};

// ============================================================================
// buildPulseManifest(rootDir, options?)
// v17 IMMORTAL — dual-band, cache-aware, prewarm-aware orchestrator.
// ============================================================================
export async function buildPulseManifest(rootDir, options = {}) {
  if (!rootDir) {
    throw new Error("PulseDesign.Architect-v17: missing rootDir");
  }

  const {
    // If true, reuse prior scan for same absRoot within this cold start.
    enableCache = true,
    // If true, do not write manifest to disk; return in-memory only.
    dryRun = false,
    // Optional band tag for manifest ("symbolic" | "binary" | "dual").
    band = "dual",
    // Optional label for world-layer usage (e.g. "firebase", "sql", "hybrid").
    worldTarget = "hybrid",
    // Optional prewarm hint for downstream organs.
    prewarm = true
  } = options || {};

  const absRoot = path.resolve(rootDir);

  // --------------------------------------------------------------------------
  // CACHE CHECK — reuse classification + organism if same root in this process
  // --------------------------------------------------------------------------
  if (
    enableCache &&
    architectCache.lastRoot === absRoot &&
    architectCache.lastFiles &&
    architectCache.lastOrganism &&
    architectCache.lastManifest
  ) {
    const cached = architectCache.lastManifest;
    return {
      success: true,
      manifestPath: cached.manifestPath || null,
      fileCount: architectCache.lastFiles.length,
      organism: architectCache.lastOrganism,
      manifest: cached,
      meta: {
        architectVersion: "v17-IMMORTAL",
        cacheHit: true,
        band,
        worldTarget,
        dryRun,
        prewarm
      }
    };
  }

  // --------------------------------------------------------------------------
  // Step 1 — CARTOGRAPHER: Walk repo + classify files (signature-based)
  // --------------------------------------------------------------------------
  const classifiedFiles = walkRepo(absRoot);

  // --------------------------------------------------------------------------
  // Step 2 — GENOME ENGINE: Build organism map (v17+)
  // --------------------------------------------------------------------------
  const organism = buildOrganismMap(classifiedFiles, {
    band,
    worldTarget,
    architectVersion: "v17-IMMORTAL"
  });

  // --------------------------------------------------------------------------
  // Step 3 — ARCHITECT META + PREWARM HINTS
  // --------------------------------------------------------------------------
  const architectMeta = {
    architectVersion: "v17-IMMORTAL",
    band,
    worldTarget,
    prewarmHints: prewarm
      ? {
          // Downstream organs that can be prewarmed by consumers:
          //   - PulseSpecsDNAGenome-v17
          //   - PulseTranslatorRNAIntake / RNAOutput
          //   - PulseTranslatorSkeletalIntake / SkeletalOutput
          //   - PulseWorldFirebaseGenome / SQL genomes
          specsGenome: true,
          translators: {
            rnaIntake: true,
            rnaOutput: true,
            skeletalIntake: true,
            skeletalOutput: true
          },
          worldGenomes: {
            firebase: true,
            sql: true,
            hybrid: worldTarget === "hybrid"
          }
        }
      : null
  };

  // --------------------------------------------------------------------------
  // Step 4 — SURVEYOR: Build canonical manifest object
  // --------------------------------------------------------------------------
  const manifest = {
    generatedAt: new Date().toISOString(),
    root: absRoot,
    files: classifiedFiles,
    organism,
    band,
    worldTarget,
    architectMeta
  };

  let manifestPath = null;

  // Only delegate write if not dryRun
  if (!dryRun) {
    const result = writeManifest(absRoot, manifest);
    manifestPath = result.manifestPath || null;
  }

  // --------------------------------------------------------------------------
  // CACHE UPDATE — store for this cold start
  // --------------------------------------------------------------------------
  architectCache.lastRoot = absRoot;
  architectCache.lastFiles = classifiedFiles;
  architectCache.lastOrganism = organism;
  architectCache.lastManifest = {
    ...manifest,
    manifestPath
  };

  // --------------------------------------------------------------------------
  // FINAL RETURN — dual-band, world-ready
  // --------------------------------------------------------------------------
  return {
    success: true,
    manifestPath,
    fileCount: classifiedFiles.length,
    organism,
    manifest,
    meta: {
      architectVersion: "v17-IMMORTAL",
      cacheHit: false,
      band,
      worldTarget,
      dryRun,
      prewarm
    }
  };
}

// ============================================================================
// Convenience wrapper — symbolic-only manifest (legacy compatibility)
// ============================================================================
export async function buildSymbolicPulseManifest(rootDir, options = {}) {
  return buildPulseManifest(rootDir, {
    ...options,
    band: "symbolic"
  });
}

// ============================================================================
// Convenience wrapper — binary-leaning manifest (for binary-first tooling)
// ============================================================================
export async function buildBinaryPulseManifest(rootDir, options = {}) {
  return buildPulseManifest(rootDir, {
    ...options,
    band: "binary"
  });
}
