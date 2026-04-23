// ============================================================================
//  PULSE OS v10.4 — THE SCRIBE
//  Diagnostic Recorder • Forensic Historian • Evolutionary Report Formatter
//  PURE FORMATTING + SUMMARIZATION. ZERO MUTATION. ZERO TIME. ZERO RANDOMNESS.
// ============================================================================

export const SCRIBE_META = Object.freeze({
  layer: "PulseAIScribe",
  role: "SCRIBE",
  version: "10.4",
  target: "full-mesh",
  selfRepairable: true,
  evo: Object.freeze({
    driftProof: true,
    deterministicField: true,
    multiInstanceReady: true,
    unifiedAdvantageField: true,
    futureEvolutionReady: true,
    observerOnly: true,
    historian: true
  })
});

// ============================================================================
// PUBLIC API — Build Debug Report (Object)
// ============================================================================
export function formatDebugReport(context) {
  const { trace = [], diagnostics = {} } = context;

  return Object.freeze({
    meta: SCRIBE_META,
    summary: buildSummary(diagnostics),
    trace: [...trace],
    mismatches: [...(diagnostics.mismatches || [])],
    missingFields: [...(diagnostics.missingFields || [])],
    slowdownCauses: [...(diagnostics.slowdownCauses || [])],
    driftDetected: diagnostics.driftDetected === true,

    // NEW v10.4 — Evolutionary Layers
    evolution: buildEvolutionaryNotes(context),
    organs: buildOrganSnapshot(context),
    routing: buildRoutingSnapshot(context),
    pulse: buildPulseSnapshot(context)
  });
}

// ============================================================================
// SUMMARY BUILDER — Evolutionary Summary Lines (v10.4)
// ============================================================================
function buildSummary(diagnostics) {
  const summary = [];

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
// EVOLUTIONARY NOTES — The Historian Layer (v10.4)
// ============================================================================
function buildEvolutionaryNotes(context) {
  const notes = [];

  if (context.pulse?.pattern)
    notes.push(`Pattern: ${context.pulse.pattern}`);

  if (Array.isArray(context.pulse?.lineage))
    notes.push(`Lineage depth: ${context.pulse.lineage.length}`);

  if (context.pulse?.advantageField)
    notes.push("Advantage field active");

  if (context.organs)
    notes.push("Organ snapshot included");

  if (context.diagnostics?.driftDetected)
    notes.push("Evolutionary drift detected");

  return notes;
}

// ============================================================================
// ORGAN SNAPSHOT — Which organs were involved (v10.4)
// ============================================================================
function buildOrganSnapshot(context) {
  return Object.freeze({
    persona: context.persona || null,
    permissions: context.permissions || null,
    boundaries: context.boundaries || null
  });
}

// ============================================================================
// ROUTING SNAPSHOT — Pathway + Router Decisions (v10.4)
// ============================================================================
function buildRoutingSnapshot(context) {
  if (!context.routing) return null;

  return Object.freeze({
    personaId: context.routing.personaId,
    reasoning: [...(context.routing.reasoning || [])]
  });
}

// ============================================================================
// PULSE SNAPSHOT — Pulse lineage + pattern (v10.4)
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
// STRING FORMATTER — Pretty Printed Debug Report (v10.4)
// ============================================================================
export function formatDebugString(context) {
  const report = formatDebugReport(context);

  let out = "\n=== AI DEBUG REPORT (v10.4) ===\n\n";

  out += "SUMMARY:\n";
  report.summary.forEach(line => {
    out += `  - ${line}\n`;
  });

  out += "\nTRACE:\n";
  report.trace.forEach((step, i) => {
    out += `  ${i + 1}. ${step}\n`;
  });

  if (report.mismatches.length > 0) {
    out += "\nMISMATCHES:\n";
    report.mismatches.forEach(m => {
      out += `  - Field "${m.key}": expected ${m.expected}, got ${m.actual}\n`;
    });
  }

  if (report.missingFields.length > 0) {
    out += "\nMISSING FIELDS:\n";
    report.missingFields.forEach(f => {
      out += `  - ${f.key}\n`;
    });
  }

  if (report.slowdownCauses.length > 0) {
    out += "\nSLOWDOWN CAUSES:\n";
    report.slowdownCauses.forEach(s => {
      out += `  - ${s.reason}\n`;
    });
  }

  out += `\nDRIFT DETECTED: ${report.driftDetected ? "YES" : "NO"}\n`;

  out += "\nEVOLUTIONARY NOTES:\n";
  report.evolution.forEach(n => {
    out += `  - ${n}\n`;
  });

  out += "\n========================\n";

  return out;
}
