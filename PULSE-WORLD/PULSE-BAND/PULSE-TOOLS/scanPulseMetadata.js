import fs from "fs";
import path from "path";

// ============================================================================
// ROOT — one folder back, then scan forward
// ============================================================================
const ROOT = path.resolve(process.cwd(), "..");

// ============================================================================
// FIVE-LAYER METABLOCK DEFINITIONS
// ============================================================================
const LAYERS = {
  identity: [
    /ORGAN:/i,
    /identity:/i,
    /organId:/i,
    /role:/i,
    /layer:/i,
    /epoch:/i,
    /version:/i,
    /lineage:/i
  ],
  evo: [
    /evo:\s*\{/i,
    /presenceAware/i,
    /dualBand/i,
    /binaryAware/i,
    /gpuAware/i,
    /arteryAware/i,
    /juryAware/i,
    /shifterAware/i,
    /timelineFlowAware/i,
    /multiSpin/i
  ],
  contract: [
    /contract:\s*\{/i,
    /always:\s*\[/i,
    /never:\s*\[/i,
    /purpose:/i
  ],
  guarantees: [
    /guarantees:\s*\{/i,
    /deterministic/i,
    /driftProof/i,
    /zeroNetwork/i,
    /zeroFilesystem/i,
    /zeroMutation/i,
    /zeroRandomness/i,
    /pureCompute/i,
    /windowSafe/i
  ],
  safety: [
    /safety:\s*\{/i,
    /AI_EXPERIENCE_META/i,
    /Pulse[A-Za-z0-9]+Meta/i,
    /IMMORTAL/i,
    /ORGANISM/i,
    /Presence/i,
    /Harmonics/i,
    /DualBand/i,
    /Shifter/i,
    /Proxy/i,
    /Mesh/i,
    /Cortex/i,
    /Organism/i,
    /PulseWorld/i,
    /PulseOS/i
  ]
};

// Flatten all patterns for raw match listing
const META_PATTERNS = Object.values(LAYERS).flat();

// ============================================================================
// SCAN A SINGLE FILE
// ============================================================================
function scanFile(filePath) {
  const text = fs.readFileSync(filePath, "utf8");

  const layerHits = {};
  const rawMatches = [];

  // initialize layer hit counters
  for (const layer of Object.keys(LAYERS)) {
    layerHits[layer] = 0;
  }

  // scan patterns
  for (const layer of Object.keys(LAYERS)) {
    for (const pattern of LAYERS[layer]) {
      const match = text.match(pattern);
      if (match) {
        layerHits[layer]++;
        rawMatches.push({
          layer,
          pattern: pattern.toString(),
          match: match[1] || match[0]
        });
      }
    }
  }

  // compute layer completeness
  const layerScores = {};
  for (const layer of Object.keys(LAYERS)) {
    const found = layerHits[layer];
    const total = LAYERS[layer].length;
    const score = Math.round((found / total) * 100);
    layerScores[layer] = score;
  }

  // compute overall completeness
  const overall =
    Object.values(layerScores).reduce((a, b) => a + b, 0) /
    Object.keys(layerScores).length;

  return {
    rawMatches,
    layerScores,
    overallScore: Math.round(overall)
  };
}

// ============================================================================
// RECURSIVE WALK
// ============================================================================
function walk(dir, results = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(full, results);
    } else if (entry.isFile() && full.endsWith(".js")) {
      const scan = scanFile(full);
      if (scan.rawMatches.length > 0) {
        results.push({
          file: full.replace(ROOT, "."),
          ...scan
        });
      }
    }
  }

  return results;
}

// ============================================================================
// FIX RECOMMENDATION ENGINE
// ============================================================================
function recommendFixes(layerScores) {
  const fixes = [];

  for (const [layer, score] of Object.entries(layerScores)) {
    if (score === 100) continue;

    if (score === 0) {
      fixes.push(`❌ Missing entire ${layer} block — add full ${layer} metablock.`);
    } else if (score < 50) {
      fixes.push(`⚠️ ${layer} block incomplete (${score}%) — add missing required fields.`);
    } else {
      fixes.push(`🔧 ${layer} block partially complete (${score}%) — verify optional fields.`);
    }
  }

  return fixes;
}

// ============================================================================
// RUN SCAN
// ============================================================================
const output = walk(ROOT);

// compute global health
const globalScore =
  output.reduce((a, f) => a + f.overallScore, 0) / (output.length || 1);

console.log("=== Pulse Metadata Scan (v18‑IMMORTAL, 5‑Layer Metablock Scanner + Damage Wizard) ===");
console.log(`\nGLOBAL ORGANISM COMPLETENESS: ${globalScore.toFixed(1)}%`);
console.log("=====================================================================");

output.forEach((item) => {
  console.log(`\nFILE: ${item.file}`);
  console.log(`  → Overall completeness: ${item.overallScore}%`);

  console.log("  → Layer scores:");
  for (const [layer, score] of Object.entries(item.layerScores)) {
    console.log(`      ${layer.padEnd(12)} : ${score}%`);
  }

  const fixes = recommendFixes(item.layerScores);
  if (fixes.length > 0) {
    console.log("  → Recommended fixes:");
    fixes.forEach((f) => console.log(`      ${f}`));
  }

  console.log("  → Raw matches:");
  item.rawMatches.forEach((m) => {
    console.log(`      [${m.layer}] ${m.match}`);
  });
});
