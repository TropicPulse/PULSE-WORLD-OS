import fs from "fs";
import path from "path";

// ============================================================================
// ROOT — one folder back, then scan forward
// ============================================================================
const ROOT = path.resolve(process.cwd(), "..");

// ============================================================================
// FIVE-LAYER METABLOCK DEFINITIONS — v20 IMMORTAL‑ADV++
// ============================================================================
// Every layer now includes ALL v20 organ vocabulary, including:
// identity++ • evo++ • contract++ • guarantees++ • safety++
// ============================================================================
const LAYERS = {
  identity: [
    /AI_EXPERIENCE_META/i,
    /ORGAN:/i,
    /identity:/i,
    /organId:/i,
    /role:/i,
    /layer:/i,
    /epoch:/i,
    /version:/i,
    /lineage:/i,
    /Pulse[A-Za-z0-9]+Meta/i,
    /v20-Immortal/i,
    /IMMORTAL/i
  ],

  evo: [
    /evo:\s*\{/i,
    /nodeAdmin/i,
    /networkBrain/i,
    /sentinelBrain/i,
    /presenceIntellect/i,
    /presenceAware/i,
    /socialGraphAware/i,
    /meshCastleExpansionAware/i,
    /routerBeaconWorldCoreAware/i,
    /reproductionAware/i,
    /earnAware/i,
    /chunkPrewarmAware/i,
    /advantageAware/i,
    /dualBand/i,
    /bandAware/i,
    /binaryAware/i,
    /binaryFieldAware/i,
    /waveFieldAware/i,
    /arteryAware/i,
    /arteryV5/i,
    /snapshotAware/i,
    /packetAware/i,
    /windowAware/i,
    /multiInstanceIdentity/i,
    /spiralAware/i,
    /gpuAware/i,
    /juryAware/i,
    /shifterAware/i,
    /timelineFlowAware/i,
    /multiSpin/i
  ],

  contract: [
    /contract:\s*\{/i,
    /purpose:/i,
    /always:\s*\[/i,
    /never:\s*\[/i,
    /advisory-only/i,
    /deterministic/i
  ],

  guarantees: [
    /guarantees:\s*\{/i,
    /deterministic/i,
    /driftProof/i,
    /zeroNetwork/i,
    /zeroFilesystem/i,
    /zeroMutation/i,
    /zeroMutationOfInput/i,
    /zeroRandomness/i,
    /pureCompute/i,
    /windowSafe/i,
    /IMMORTAL/i
  ],

  safety: [
    /safety:\s*\{/i,
    /AI_EXPERIENCE_META/i,
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
    /PulseOS/i,
    /Advantage/i,
    /Binary/i,
    /Wave/i,
    /Sentinel/i,
    /Overmind/i
  ]
};

// Flatten all patterns for raw match listing
const META_PATTERNS = Object.values(LAYERS).flat();

// ============================================================================
// SCAN A SINGLE FILE — v20 IMMORTAL‑ADV++
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
// FIX RECOMMENDATION ENGINE — v20 IMMORTAL‑ADV++
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
// RUN SCAN — v20 IMMORTAL‑ADV++
// ============================================================================
const output = walk(ROOT);

// compute global health
const globalScore =
  output.reduce((a, f) => a + f.overallScore, 0) / (output.length || 1);

console.log("=== Pulse Metadata Scan (v20‑IMMORTAL‑ADV++, 5‑Layer Metablock Scanner + Damage Wizard) ===");
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
