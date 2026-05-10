// ============================================================================
// FILE: /PULSE-AI/PulseFileScanner-v20-ImmortalPlusPlus.js
// PULSE OS v20‑IMMORTAL+++ — FILE SCANNER ORGAN
// Symbolic Cognition • Structural Analysis • Drift + Lineage + Trust + Advantage
// PURE SYMBOLIC ENGINE. ZERO EXECUTION. ZERO MUTATION. DUALBAND + PULSE-NET SAFE.
// ============================================================================

import { OrganismIdentity } from "../PULSE-X/PulseWorldOrganismMap-v21.js";

const Identity = OrganismIdentity(import.meta.url);

// or: const Identity = OrganismIdentity["pulse-ai/ai-v24.0-IMMORTAL"] if that's the key you chose

// ============================================================================
//  META BLOCK — v24.0 IMMORTAL (ORGANISM KERNEL)
//  (now backed by the Organism Map instead of hardcoded here)
// ============================================================================
export const PulseFileScannerMeta = Identity.OrganMeta;

// ============================================================================
//  SURFACE / ORGANISM LAYER EXPORTS — v24.0 IMMORTAL
//  (for Understanding / CNS / Portal alignment)
// ============================================================================

// Required 3 for every “surface” in the organism graph
export const pulseRole = Identity.pulseRole;

export const surfaceMeta = Identity.surfaceMeta;

export const pulseLoreContext = Identity.pulseLoreContext;

// Optional: richer experience meta for AI / tooling
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;

// Optional: export meta for tooling / dev panels
export const EXPORT_META = Identity.EXPORT_META;


// ============================================================================
// HELPERS — BUCKETS + PRESSURE + TRUST / COMPLEXITY / ADVANTAGE
// ============================================================================

function bucketPressure(v) {
  if (v >= 0.9) return "overload";
  if (v >= 0.7) return "high";
  if (v >= 0.4) return "medium";
  if (v > 0) return "low";
  return "none";
}

function extractBinaryPressure(binaryVitals = {}) {
  if (binaryVitals?.layered?.organism?.pressure != null)
    return binaryVitals.layered.organism.pressure;
  if (binaryVitals?.binary?.pressure != null)
    return binaryVitals.binary.pressure;
  return 0;
}

function computeHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 1000003;
  }
  return `h${h}`;
}

function computeComplexityMetrics(content) {
  const length = content.length;
  const lines = content.split(/\r?\n/).length;
  const importCount = (content.match(/import\s+/g) || []).length;
  const requireCount = (content.match(/require\(/g) || []).length;
  const exportCount = (content.match(/export\s+/g) || []).length;
  const functionCount = (content.match(/function\s+|=>/g) || []).length;
  const classCount = (content.match(/class\s+[A-Za-z0-9_]+/g) || []).length;

  const complexityScore = Math.min(
    1,
    (importCount +
      requireCount +
      exportCount +
      functionCount +
      classCount) / 250
  );

  return {
    length,
    lines,
    importCount,
    requireCount,
    exportCount,
    functionCount,
    classCount,
    complexityScore
  };
}

function computeTrustSignals(report, complexity) {
  const driftCount = report?.drift?.length || 0;
  const hasMixedModule = report?.drift?.includes("MIXED_MODULE_SYSTEM");
  const hasCjsOnly = report?.drift?.includes("CJS_ONLY_ORGAN");
  const heavyImports = complexity.importCount + complexity.requireCount > 20;
  const heavyExports = complexity.exportCount > 20;

  const honeypotRisk =
    hasMixedModule || heavyImports
      ? Math.min(1, 0.4 + complexity.complexityScore)
      : 0.1;

  const dominanceRisk =
    driftCount > 0 || heavyExports
      ? Math.min(1, 0.5 + complexity.complexityScore)
      : 0.05;

  const anomalyScore = Math.min(
    1,
    driftCount * 0.2 +
      (hasMixedModule ? 0.3 : 0) +
      (heavyImports ? 0.2 : 0) +
      (heavyExports ? 0.1 : 0) +
      complexity.complexityScore * 0.3
  );

  return {
    honeypotRisk,
    dominanceRisk,
    anomalyScore,
    driftCount
  };
}

// v20: advantage field — time saved / risk avoided / review priority
function computeAdvantageField({ trustSignals, complexity }) {
  const anomaly = trustSignals?.anomalyScore ?? 0;
  const honeypot = trustSignals?.honeypotRisk ?? 0;
  const dominance = trustSignals?.dominanceRisk ?? 0;

  const reviewPriority = Math.min(
    1,
    0.4 * anomaly + 0.3 * honeypot + 0.3 * dominance
  );

  const timeSavedMs = Math.round(
    (complexity?.lines || 0) * (0.5 + anomaly * 1.5)
  );

  return {
    advantageScore: reviewPriority,
    advantageBand: reviewPriority >= 0.7 ? "critical" : reviewPriority >= 0.4 ? "elevated" : "normal",
    cascadeLevel: reviewPriority >= 0.7 ? 3 : reviewPriority >= 0.4 ? 2 : 1,
    field: "file_scanner",
    timeSavedMs,
    description:
      "Symbolic-only file scanner advantage: review prioritization + time-saved estimate for high-risk files."
  };
}

// ============================================================================
// ANALYSIS ENGINE — Pure symbolic cognition
// ============================================================================

function analyzeContent(filePath, content) {
  const report = {
    ok: true,
    filePath,
    size: content.length,
    esmExports: [],
    cjsExports: [],
    imports: [],
    drift: [],
    layerViolations: [],
    visibility: "unknown",
    summary: ""
  };

  // ESM exports
  const esmExportRegex = /export\s+(?:const|function|class)\s+([A-Za-z0-9_]+)/g;
  let match;
  while ((match = esmExportRegex.exec(content)) !== null) {
    report.esmExports.push(match[1]);
  }

  // CJS exports
  const cjsExportRegex = /module\.exports\s*=\s*{([^}]+)}/;
  const cjsMatch = content.match(cjsExportRegex);

  if (cjsMatch) {
    const names = cjsMatch[1]
      .split(",")
      .map((s) => s.trim().replace(/:.*$/, ""))
      .filter(Boolean);

    report.cjsExports.push(...names);
  }

  // Imports
  const importRegex = /import\s+.*?from\s+["'](.+?)["']/g;
  while ((match = importRegex.exec(content)) !== null) {
    report.imports.push(match[1]);
  }

  // Drift detection
  if (report.cjsExports.length > 0 && report.esmExports.length === 0) {
    report.drift.push("CJS_ONLY_ORGAN");
  }

  if (report.esmExports.length > 0 && report.cjsExports.length > 0) {
    report.drift.push("MIXED_MODULE_SYSTEM");
  }

  // Visibility
  report.visibility = report.esmExports.length > 0 ? "visible" : "invisible";

  // Summary
  report.summary = generateSummary(report);

  return report;
}

function generateSummary(r) {
  return `
File: ${r.filePath}
Size: ${r.size} chars

ESM Exports: ${r.esmExports.join(", ") || "none"}
CJS Exports: ${r.cjsExports.join(", ") || "none"}

Visibility: ${r.visibility}
Drift: ${r.drift.join(", ") || "none"}

Imports:
${r.imports.map((i) => " - " + i).join("\n") || " none"}
`.trim();
}

// ============================================================================
// FILE SCANNER ARTERY v5 — Symbolic-only, deterministic, trust + advantage aware
// ============================================================================

export function getScannerArterySnapshotV5({
  ok = false,
  filePath = "",
  report = null,
  binaryVitals = {},
  dualBand = null,
  trust = null,
  identitySnapshot = null,
  environmentSnapshot = null
} = {}) {
  const basePressure = extractBinaryPressure(binaryVitals);

  const driftCount = report?.drift?.length || 0;
  const importCount = report?.imports?.length || 0;
  const esmCount = report?.esmExports?.length || 0;
  const cjsCount = report?.cjsExports?.length || 0;

  const localPressure =
    driftCount > 0
      ? 0.6
      : esmCount > 0 && cjsCount > 0
      ? 0.5
      : importCount > 10
      ? 0.3
      : 0.1;

  const fusedPressure = Math.max(
    0,
    Math.min(1, 0.7 * localPressure + 0.3 * basePressure)
  );

  const complexity = trust?.complexity || null;
  const trustSignals = trust?.trustSignals || null;
  const advantage = trust?.advantage || null;

  const honeypotRisk = trustSignals?.honeypotRisk ?? 0;
  const dominanceRisk = trustSignals?.dominanceRisk ?? 0;
  const anomalyScore = trustSignals?.anomalyScore ?? 0;

  const arterySignature = computeHash(
    [
      "SCANNER_ARTERY_V5",
      filePath,
      fusedPressure.toFixed(3),
      driftCount,
      importCount,
      esmCount,
      cjsCount,
      honeypotRisk.toFixed(3),
      dominanceRisk.toFixed(3),
      anomalyScore.toFixed(3),
      advantage?.advantageScore?.toFixed?.(3) ?? "0.000"
    ].join("::")
  );

  const dualBandContext = dualBand?.artery || null;

  const identityField = identitySnapshot
    ? {
        uid: identitySnapshot.uid || null,
        presenceBand: identitySnapshot?.presence?.band || "unknown",
        advantageBand: identitySnapshot?.advantage?.advantageBand || "neutral",
        topologyBandSource: identitySnapshot?.topology?.bandSource || "identity",
        binarySignature: identitySnapshot.binarySignature || null
      }
    : null;

  const environmentField = environmentSnapshot
    ? {
        runtime: environmentSnapshot.runtime || null,
        origin: environmentSnapshot.origin || null,
        page: environmentSnapshot.page || null,
        online: environmentSnapshot.online ?? null
      }
    : null;

  const chunkHints = {
    backendProfile: "backend-logs",
    aiProfile: "backend-logs",
    presenceTag: "file-scanner",
    band: "dual",
    worldBand: "backend",
    estimatedBytes: complexity?.length || 0
  };

  return Object.freeze({
    organism: {
      pressure: fusedPressure,
      pressureBucket: bucketPressure(fusedPressure)
    },
    file: {
      ok,
      filePath,
      driftCount,
      esmCount,
      cjsCount,
      importCount,
      complexity
    },
    binary: {
      pressure: basePressure,
      pressureBucket: bucketPressure(basePressure)
    },
    trust: {
      honeypotRisk,
      dominanceRisk,
      anomalyScore
    },
    advantage,
    dualBand: {
      artery: dualBandContext
    },
    identity: identityField,
    environment: environmentField,
    chunkHints,
    meta: {
      version: PulseFileScannerMeta.version,
      epoch: PulseFileScannerMeta.evo.epoch,
      identity: PulseFileScannerMeta.identity,
      arterySignature
    }
  });
}

// ============================================================================
// FILE SCANNER FACTORY — v20‑IMMORTAL+++
// ============================================================================

export function createPulseFileScanner({
  backendMode = false,
  Evolution = null,
  TrustFabric = null,
  JuryFrame = null,
  binaryVitals = {},
  dualBand = null,
  identitySnapshot = null,
  environmentSnapshot = null
} = {}) {
  let fs = null;
  let path = null;

  if (backendMode) {
    fs = require("fs");
    path = require("path");
  }

  function prewarm() {
    return {
      ok: true,
      epoch: PulseFileScannerMeta.evo.epoch,
      identity: PulseFileScannerMeta.identity
    };
  }

  function scanFile(filePath) {
    if (!backendMode) {
      return {
        ok: false,
        error: "BACKEND_DISABLED",
        message: "File scanning requires backendMode=true",
        filePath,
        artery: getScannerArterySnapshotV5({
          ok: false,
          filePath,
          binaryVitals,
          report: null,
          dualBand,
          trust: null,
          identitySnapshot,
          environmentSnapshot
        })
      };
    }

    const fullPath = path.resolve(process.cwd(), filePath);

    if (!fs.existsSync(fullPath)) {
      Evolution?.recordLineage?.("scanner-file-not-found", {
        filePath,
        epoch: PulseFileScannerMeta.evo.epoch
      });
      TrustFabric?.recordEvidence?.("scanner-file-not-found", {
        filePath,
        epoch: PulseFileScannerMeta.evo.epoch
      });

      return {
        ok: false,
        error: "FILE_NOT_FOUND",
        filePath,
        fullPath,
        artery: getScannerArterySnapshotV5({
          ok: false,
          filePath,
          binaryVitals,
          report: null,
          dualBand,
          trust: null,
          identitySnapshot,
          environmentSnapshot
        })
      };
    }

    const content = fs.readFileSync(fullPath, "utf8");
    const report = analyzeContent(filePath, content);
    const complexity = computeComplexityMetrics(content);
    const trustSignals = computeTrustSignals(report, complexity);
    const advantage = computeAdvantageField({ trustSignals, complexity });

    Evolution?.recordLineage?.("scanner-file-analyzed", {
      filePath,
      epoch: PulseFileScannerMeta.evo.epoch,
      drift: report.drift,
      complexity,
      advantage
    });
    Evolution?.scanDrift?.({ scannerReport: report });

    TrustFabric?.recordEvidence?.("scanner-file-analyzed", {
      filePath,
      epoch: PulseFileScannerMeta.evo.epoch,
      trustSignals,
      complexity,
      advantage
    });

    JuryFrame?.submitScannerEvidence?.({
      filePath,
      report,
      complexity,
      trustSignals,
      advantage,
      epoch: PulseFileScannerMeta.evo.epoch
    });

    const artery = getScannerArterySnapshotV5({
      ok: true,
      filePath,
      report,
      binaryVitals,
      dualBand,
      trust: { complexity, trustSignals, advantage },
      identitySnapshot,
      environmentSnapshot
    });

    return {
      ...report,
      complexity,
      trustSignals,
      advantage,
      artery
    };
  }

  return Object.freeze({
    meta: PulseFileScannerMeta,
    prewarm,
    scanFile,
    getScannerArterySnapshotV5
  });
}

// ---------------------------------------------------------------------------
//  DUAL EXPORT LAYER — CommonJS compatibility (v20‑IMMORTAL+++ dualband)
// ---------------------------------------------------------------------------
/* c8 ignore next 10 */
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    PulseFileScannerMeta,
    createPulseFileScanner,
    getScannerArterySnapshotV5
  };
}
