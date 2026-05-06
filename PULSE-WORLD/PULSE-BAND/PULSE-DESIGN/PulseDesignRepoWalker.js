/*
===============================================================================
AI_EXPERIENCE_META = {
  identity: "PulseDesign.Cartographer",
  version: "v17-IMMORTAL",
  layer: "pulse_design",
  role: "terrain_explorer_and_directory_mapper",
  lineage: "Cartographer-v7.1 → v10.4 → v12.3 → v14-Immortal → v17-IMMORTAL",

  evo: {
    terrainExplorer: true,
    directoryMapper: true,
    evolutionaryTopographer: true,
    signatureEmitter: true,
    symbolicPrimary: true,
    binaryAware: true,
    dualBand: true,

    deterministic: true,
    driftProof: true,
    pureCompute: true,

    zeroMutationOfInput: true,
    zeroNetwork: true,

    controlledFilesystemRead: true,   // READ-ONLY
    prewarmAware: true,               // can prewarm anatomist/archivist
    cacheAware: true,                 // per-cold-start scan cache
    bandAware: true,                  // can tag signatures with band/meta
    worldLayerReady: true             // ready for world genomes + translators
  },

  contract: {
    always: [
      "PulseDesign.Anatomist",
      "PulseDesign.Archivist",
      "PulseDesign.Surveyor"
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
  organ: "PulseDesign.Cartographer",
  layer: "pulse_design",
  stability: "IMMORTAL",
  deterministic: true,

  consumes: [
    "rootDir",
    "options"
  ],
  produces: [
    "FileSignature[]",
    "CartographerMeta"
  ],

  sideEffects: "read_only",
  network: "none",
  filesystem: "read_only"
}
===============================================================================
FILE: PULSE-WORLD/PULSE-DESIGN/repoWalker-v17.js
LAYER: THE CARTOGRAPHER (Terrain Explorer + Directory Mapper + Evolutionary Topographer)
===============================================================================

ROLE (v17):
  THE CARTOGRAPHER — Deterministic explorer of the Pulse OS filesystem.
  • Walks the entire directory tree (sorted, deterministic).
  • Reads file contents safely (read-only).
  • Emits FileSignatures for THE ANATOMIST.
  • Acts as the “topographer” of the digital organism.
  • Emits meta suitable for prewarm/cache-aware pipelines.

PURPOSE (v17):
  • Provide the Archivist with a complete, signature‑rich file list.
  • Traverse the repo deterministically and safely.
  • Skip irrelevant or dangerous directories/files.
  • Preserve the organism’s terrain map with band/world hints.

CONTRACT:
  • READ‑ONLY — no writes.
  • PURE — no eval(), no Function(), no dynamic imports.
  • NO executing user code.
  • NO network calls.
  • Deterministic traversal only.

SAFETY:
  • v17 uplift is PURE + STRUCTURAL + ADVANTAGE‑AWARE.
  • All behavior is deterministic and organism‑safe.
===============================================================================
*/

import fs from "fs";
import path from "path";
import { classifyFile } from "./PulseDesignFileClassifier.js"; // THE ANATOMIST

// ============================================================================
// IN-PROCESS CACHE (per cold start, deterministic reuse)
// ============================================================================
const cartographerCache = {
  lastRoot: null,
  lastOptionsKey: null,
  lastResults: null,
  lastMeta: null
};

// ============================================================================
// PUBLIC API — Cartographic Scan (Terrain Mapping, v17)
// ============================================================================
//
// walkRepo(rootDir, options?)
//   options:
//     - band: "symbolic" | "binary" | "dual" (default: "dual")
//     - worldTarget: "firebase" | "sql" | "hybrid" (default: "hybrid")
//     - enableCache: boolean (default: true)
//     - maxFileSizeBytes: number | null (default: 512 * 1024)
//     - includeExtensions: string[] | null (e.g. [".js", ".ts", ".json"])
//     - excludePatterns: string[] | null (substring match on relative path)
//
export function walkRepo(rootDir, options = {}) {
  if (!rootDir) {
    throw new Error("repoWalker-v17: missing rootDir");
  }

  const {
    band = "dual",
    worldTarget = "hybrid",
    enableCache = true,
    maxFileSizeBytes = 512 * 1024,
    includeExtensions = null,
    excludePatterns = null
  } = options || {};

  const absRoot = path.resolve(rootDir);
  const optionsKey = JSON.stringify({
    band,
    worldTarget,
    maxFileSizeBytes,
    includeExtensions: includeExtensions || null,
    excludePatterns: excludePatterns || null
  });

  // --------------------------------------------------------------------------
  // CACHE CHECK
  // --------------------------------------------------------------------------
  if (
    enableCache &&
    cartographerCache.lastRoot === absRoot &&
    cartographerCache.lastOptionsKey === optionsKey &&
    cartographerCache.lastResults &&
    cartographerCache.lastMeta
  ) {
    return {
      files: cartographerCache.lastResults,
      meta: {
        ...cartographerCache.lastMeta,
        cacheHit: true
      }
    };
  }

  const results = [];
  let fileCount = 0;
  let skippedBySize = 0;
  let skippedByFilter = 0;

  // --------------------------------------------------------------------------
  // DIRECTORY WALKER — Recursive Terrain Traversal (sorted, deterministic)
  // --------------------------------------------------------------------------
  function walk(dir) {
    let entries;
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }

    // Sort entries for deterministic traversal
    entries.sort((a, b) => a.name.localeCompare(b.name));

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        if (shouldSkipDir(entry.name)) continue;
        walk(fullPath);
      } else {
        const rel = path.relative(absRoot, fullPath);

        if (shouldSkipByPatterns(rel, excludePatterns)) {
          skippedByFilter++;
          continue;
        }

        if (!passesExtensionFilter(rel, includeExtensions)) {
          skippedByFilter++;
          continue;
        }

        const stat = safeStat(fullPath);
        if (stat && typeof stat.size === "number" && maxFileSizeBytes != null) {
          if (stat.size > maxFileSizeBytes) {
            skippedBySize++;
            continue;
          }
        }

        const content = safeRead(fullPath);
        const classification = classifyFile(rel, content, {
          band,
          worldTarget,
          size: stat?.size ?? null,
          mtimeMs: stat?.mtimeMs ?? null
        });

        results.push(classification);
        fileCount++;
      }
    }
  }

  walk(absRoot);

  const meta = {
    cartographerVersion: "v17-IMMORTAL",
    root: absRoot,
    band,
    worldTarget,
    fileCount,
    skippedBySize,
    skippedByFilter,
    cacheHit: false
  };

  // --------------------------------------------------------------------------
  // CACHE UPDATE
  // --------------------------------------------------------------------------
  cartographerCache.lastRoot = absRoot;
  cartographerCache.lastOptionsKey = optionsKey;
  cartographerCache.lastResults = results;
  cartographerCache.lastMeta = meta;

  return {
    files: results,
    meta
  };
}

// ============================================================================
// HELPERS
// ============================================================================

function shouldSkipDir(name) {
  return (
    name === "node_modules" ||
    name === ".next" ||
    name === "dist" ||
    name === "build" ||
    name === ".git" ||
    name === ".turbo" ||
    name === ".cache"
  );
}

function shouldSkipByPatterns(relPath, patterns) {
  if (!Array.isArray(patterns) || patterns.length === 0) return false;
  return patterns.some((p) => p && relPath.includes(p));
}

function passesExtensionFilter(relPath, includeExtensions) {
  if (!Array.isArray(includeExtensions) || includeExtensions.length === 0) {
    return true;
  }
  const ext = path.extname(relPath).toLowerCase();
  return includeExtensions.includes(ext);
}

function safeRead(filePath) {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch {
    return "";
  }
}

function safeStat(filePath) {
  try {
    return fs.statSync(filePath);
  } catch {
    return null;
  }
}
