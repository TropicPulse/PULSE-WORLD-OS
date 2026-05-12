// ============================================================================
//  PULSE OS v24.0‑IMMORTAL‑ADVANTAGE++ — THE SCRIBE
//  Dual‑Band Diagnostic Recorder • Forensic Historian • Organism Snapshot
//  PURE FORMATTING + SUMMARIZATION. ZERO MUTATION. ZERO RANDOMNESS.
//  FULL v24++ ORGANISM‑AWARE SCRIBE
// ============================================================================

import { OrganismIdentity } from "../PULSE-X/PULSE-WORLD-MAP.js
";

const Identity = OrganismIdentity(import.meta.url);

// ============================================================================
//  META BLOCK — v24.0 IMMORTAL (ORGANISM KERNEL)
// ============================================================================
export const SCRIBE_META = Identity.OrganMeta;

// ============================================================================
//  SURFACE / ORGANISM LAYER EXPORTS — v24.0 IMMORTAL
// ============================================================================
export const pulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// ============================================================================
//  SCRIBE PREWARM ENGINE — v24++
// ============================================================================
export function prewarmScribe() {
  try {
    const warmDiagnostics = {
      mismatches: [{ key: "prewarm", expected: "x", actual: "y" }],
      missingFields: [{ key: "missing" }],
      slowdownCauses: [{ reason: "prewarm" }],
      driftDetected: true
    };

    const warmBinary = {
      metabolic: { load: 0.1, pressure: 0.2 }
    };

    const warmSymbolic = {
      persona: "ARCHITECT",
      boundaryMode: "safe",
      permissions: { allow: true }
    };

    const warmDualBand = {
      binary: { vitals: { snapshot: () => warmBinary } },
      symbolic: {
        personaEngine: { getActivePersona: () => "ARCHITECT" },
        boundariesEngine: { getMode: () => "safe" },
        permissionsEngine: { snapshot: () => ({ allow: true }) }
      },
      organism: {
        organismSnapshot: () => ({
          artery: { pressure: 0.1, cost: 0.05, budget: 0.95 }
        })
      }
    };

    const warmContext = {
      trace: ["prewarm"],
      diagnostics: warmDiagnostics,
      persona: "ARCHITECT",
      boundaryMode: "safe",
      permissions: { allow: true },
      routing: {
        personaId: "ARCHITECT",
        dualBand: { primary: "binary" },
        reasoning: ["prewarm"]
      },
      cortexPacket: {
        pattern: "prewarm",
        decision: "expand",
        binary: warmBinary,
        symbolic: warmSymbolic,
        band: { primary: "binary" },
        bitLength: 128
      },
      pulse: {
        pulseType: "prewarm",
        pattern: "prewarm",
        lineage: ["root", "prewarm"]
      }
    };

    formatDebugReport(warmContext, warmDualBand);
    formatDebugString(warmContext, warmDualBand);

    return true;
  } catch (err) {
    console.error("[Scribe Prewarm v24] Failed:", err);
    return false;
  }
}

// ============================================================================
//  PUBLIC API — Build Debug Report (Object)
// ============================================================================
export function formatDebugReport(context = {}, dualBand = null) {
  const { trace = [], diagnostics = {} } = context;

  const organismSnapshot = buildOrganismSnapshot(dualBand);
  const binarySnapshot = organismSnapshot?.binary || null;
  const symbolicSnapshot = organismSnapshot?.symbolic || null;
  const organismArtery = organismSnapshot?.artery || null;

  return Object.freeze({
    meta: SCRIBE_META,

    summary: buildSummary(diagnostics, binarySnapshot, organismArtery),

    trace: [...trace],

    mismatches: [...(diagnostics.mismatches || [])],
    missingFields: [...(diagnostics.missingFields || [])],
    slowdownCauses: [...(diagnostics.slowdownCauses || [])],
    driftDetected: diagnostics.driftDetected === true,

    // v24++ Dual‑Band Layers
    binary: binarySnapshot,
    symbolic: symbolicSnapshot,
    organism: organismSnapshot,
    organismArtery,

    // v24++ Evolutionary Layers
    evolution: buildEvolutionaryNotes(context, organismSnapshot),

    // v24++ CNS Layers
    organs: buildOrganSnapshot(context),
    routing: buildRoutingSnapshot(context),
    cortex: buildCortexSnapshot(context),

    // v24++ Pulse lineage
    pulse: buildPulseSnapshot(context)
  });
}

// ============================================================================
// SUMMARY BUILDER — v24++
// ============================================================================
function buildSummary(diagnostics, binary, organismArtery) {
  const summary = [];

  if (binary) {
    summary.push(
      `🧠 Binary load=${binary.metabolic?.load ?? 0}, pressure=${binary.metabolic?.pressure ?? 0}`
    );
  }

  if (organismArtery) {
    summary.push(
      `🌐 Organism pressure=${organismArtery.pressure ?? 0}, budget=${organismArtery.budget ?? "?"}`
    );
  }

  if (diagnostics.mismatches?.length > 0)
    summary.push(`⚠️ ${diagnostics.mismatches.length} field mismatches detected`);

  if (diagnostics.missingFields?.length > 0)
    summary.push(`⚠️ ${diagnostics.missingFields.length} missing fields detected`);

  if (diagnostics.driftDetected)
    summary.push(`⚠️ Schema drift detected`);

  if (diagnostics.slowdownCauses?.length > 0)
    summary.push(`🐢 Slowdown causes: ${diagnostics.slowdownCauses.map(s => s.reason).join(", ")}`);

  if (summary.length === 0)
    summary.push("✅ No issues detected");

  return summary;
}

// ============================================================================
// ORGANISM SNAPSHOT — v24++
// ============================================================================
function buildOrganismSnapshot(dualBand) {
  if (!dualBand) return null;

  const organismArtery =
    dualBand.organism?.organismSnapshot?.()?.artery || null;

  return Object.freeze({
    timestamp: Date.now(),

    binary: dualBand.binary?.vitals?.snapshot?.() || null,

    symbolic: {
      persona: dualBand.symbolic?.personaEngine?.getActivePersona?.() || null,
      boundaryMode: dualBand.symbolic?.boundariesEngine?.getMode?.() || null,
      permissions: dualBand.symbolic?.permissionsEngine?.snapshot?.() || null
    },

    artery: organismArtery
  });
}

// ============================================================================
// EVOLUTIONARY NOTES — v24++
// ============================================================================
function buildEvolutionaryNotes(context, organismSnapshot) {
  const notes = [];

  if (organismSnapshot?.binary?.metabolic) {
    notes.push(
      `Binary metabolic pressure=${organismSnapshot.binary.metabolic.pressure}`
    );
  }

  if (organismSnapshot?.artery) {
    notes.push(
      `Organism artery pressure=${organismSnapshot.artery.pressure}`
    );
  }

  if (context.pulse?.pattern)
    notes.push(`Pattern: ${context.pulse.pattern}`);

  if (Array.isArray(context.pulse?.lineage))
    notes.push(`Lineage depth: ${context.pulse.lineage.length}`);

  if (context.diagnostics?.driftDetected)
    notes.push("Evolutionary drift detected");

  return notes;
}

// ============================================================================
// ORGAN SNAPSHOT — v24++
// ============================================================================
function buildOrganSnapshot(context) {
  return Object.freeze({
    persona: context.persona || null,
    boundaryMode: context.boundaryMode || null,
    permissions: context.permissions || null
  });
}

// ============================================================================
// ROUTING SNAPSHOT — v24++
// ============================================================================
function buildRoutingSnapshot(context) {
  if (!context.routing) return null;

  return Object.freeze({
    personaId: context.routing.personaId,
    dualBand: context.routing.dualBand || null,
    reasoning: [...(context.routing.reasoning || [])]
  });
}

// ============================================================================
// CORTEX SNAPSHOT — v24++
// ============================================================================
function buildCortexSnapshot(context) {
  if (!context.cortexPacket) return null;

  return Object.freeze({
    pattern: context.cortexPacket.pattern,
    decision: context.cortexPacket.decision,
    binary: context.cortexPacket.binary,
    symbolic: context.cortexPacket.symbolic,
    band: context.cortexPacket.band,
    bitLength: context.cortexPacket.bitLength
  });
}

// ============================================================================
// PULSE SNAPSHOT — v24++
// ============================================================================
function buildPulseSnapshot(context) {
  if (!context.pulse) return null;

  return Object.freeze({
    pulseType: context.pulse.pulseType || null,
    pattern: context.pulse.pattern || null,
    lineageDepth: Array.isArray(context.pulse.lineage)
      ? context.pulse.lineage.length
      : 0
  });
}

// ============================================================================
// STRING FORMATTER — v24++
// ============================================================================
export function formatDebugString(context, dualBand = null) {
  const report = formatDebugReport(context, dualBand);

  let out = "\n=== AI DEBUG REPORT (v24.0‑IMMORTAL‑ADVANTAGE++) ===\n\n";

  out += "SUMMARY:\n";
  report.summary.forEach(line => {
    out += `  - ${line}\n`;
  });

  out += "\nTRACE:\n";
  report.trace.forEach((step, i) => {
    out += `  ${i + 1}. ${step}\n`;
  });

  out += "\nBINARY VITALS:\n";
  out += JSON.stringify(report.binary, null, 2) + "\n";

  out += "\nSYMBOLIC SNAPSHOT:\n";
  out += JSON.stringify(report.symbolic, null, 2) + "\n";

  out += "\nORGANISM ARTERY:\n";
  out += JSON.stringify(report.organismArtery, null, 2) + "\n";

  out += "\nROUTING:\n";
  out += JSON.stringify(report.routing, null, 2) + "\n";

  out += "\nCORTEX PACKET:\n";
  out += JSON.stringify(report.cortex, null, 2) + "\n";

  out += "\nEVOLUTIONARY NOTES:\n";
  report.evolution.forEach(n => {
    out += `  - ${n}\n`;
  });

  out += "\n========================\n";

  return out;
}

// ============================================================================
//  DUAL‑MODE EXPORTS (ESM + CommonJS)
// ============================================================================
prewarmScribe();

if (typeof module !== "undefined") {
  module.exports = {
    SCRIBE_META,
    formatDebugReport,
    formatDebugString,
    pulseRole,
    surfaceMeta,
    pulseLoreContext,
    AI_EXPERIENCE_META,
    EXPORT_META
  };
}
