/*
===============================================================================
AI_EXPERIENCE_META = {
  identity: "PulseDesign.Cartographer",
  version: "v14-Immortal",
  layer: "pulse_design",
  role: "terrain_explorer_and_directory_mapper",
  lineage: "Cartographer-v7.1 → v10.4 → v12.3 → v14-Immortal",

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

    // NOTE:
    // This organ *allows* filesystem READS ONLY.
    // It never writes, mutates, or executes anything.
    controlledFilesystemRead: true
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

  consumes: ["rootDir"],
  produces: ["FileSignature[]"],

  sideEffects: "read_only",
  network: "none",
  filesystem: "read_only"
}
===============================================================================
FILE: tropic-pulse-functions/PULSE-WORLD/PULSE-DESIGN/repoWalker.js
LAYER: THE CARTOGRAPHER (Terrain Explorer + Directory Mapper + Evolutionary Topographer)
===============================================================================

ROLE (v14+):
  THE CARTOGRAPHER — Deterministic explorer of the Pulse OS filesystem.
  • Walks the entire directory tree.
  • Reads file contents safely.
  • Emits FileSignatures for THE ANATOMIST.
  • Acts as the “topographer” of the digital organism.

PURPOSE (v14+):
  • Provide the Archivist with a complete, signature‑rich file list.
  • Traverse the repo deterministically and safely.
  • Skip irrelevant or dangerous directories.
  • Preserve the organism’s terrain map.

CONTRACT:
  • READ‑ONLY — no writes.
  • PURE — no eval(), no Function(), no dynamic imports.
  • NO executing user code.
  • NO network calls.
  • Deterministic traversal only.

SAFETY:
  • v14+ upgrade is PURE + STRUCTURAL — logic is richer but still safe.
  • All behavior is deterministic and organism‑safe.
===============================================================================
*/

import fs from "fs";
import path from "path";
import { classifyFile } from "./fileClassifier.js"; // THE ANATOMIST

// ============================================================================
// PUBLIC API — Cartographic Scan (Terrain Mapping)
// ============================================================================

export function walkRepo(rootDir) {
  if (!rootDir) {
    throw new Error("repoWalker: missing rootDir");
  }

  const results = [];

  walk(rootDir, (fullPath) => {
    const rel = path.relative(rootDir, fullPath);

    // Skip irrelevant or unsafe directories
    if (
      rel.includes("node_modules") ||
      rel.includes(".next") ||
      rel.includes("dist") ||
      rel.includes("build") ||
      rel.includes(".git")
    ) {
      return;
    }

    const content = safeRead(fullPath);

    // THE ANATOMIST now expects (filePath, content)
    const classification = classifyFile(rel, content);

    results.push(classification);
  });

  return results;
}

// ============================================================================
// DIRECTORY WALKER — Recursive Terrain Traversal
// ============================================================================
function walk(dir, callback) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(fullPath, callback);
    } else {
      callback(fullPath);
    }
  }
}

// ============================================================================
// SAFE READ — Silent, Non‑Throwing File Access
// ============================================================================
function safeRead(filePath) {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch {
    return "";
  }
}
