// ============================================================================
//  PULSE OS v10.4 — THE SCRIBE
//  Diagnostic Recorder • Forensic Historian • Evolutionary Report Formatter
//  PURE FORMATTING + SUMMARIZATION. ZERO MUTATION. ZERO TIME. ZERO RANDOMNESS.
// ============================================================================

const SCRIBE_META = {
  layer: "PulseAIScribe",
  role: "SCRIBE",
  version: "10.4",
  target: "full-mesh",
  selfRepairable: true,
  evo: {
    driftProof: true,
    deterministicField: true,
    multiInstanceReady: true,
    unifiedAdvantageField: true,
    futureEvolutionReady: true,
    observerOnly: true,
    historian: true
  }
};

// ============================================================================
// PUBLIC API — Build Debug Report (Object)
// ============================================================================
export function formatDebugReport(context) {
  const { trace, diagnostics } = context;

  return {
    meta: SCRIBE_META,
    summary: buildSummary(diagnostics),
    trace: [...trace],
    mismatches: [...diagnostics.mismatches],
    missingFields: [...diagnostics.missingFields],
    slowdownCauses: [...diagnostics.slowdownCauses],
    driftDetected: diagnostics.driftDetected,

    // NEW v10.4 — Evolutionary Layers
    evolution: buildEvolutionaryNotes(context),
    organs: buildOrganSnapshot(context),
    routing: buildRoutingSnapshot(context),
    pulse: buildPulseSnapshot(context)
  };
}

// ============================================================================
// SUMMARY BUILDER — Evolutionary Summary Lines (v10.4)
// ============================================================================
function buildSummary(diagnostics) {
  const summary = [];

  if (diagnostics.mismatches.length > 0)
    summary.push(`⚠️ ${diagnostics.mismatches.length} field mismatches detected`);

  if (diagnostics.missingFields.length > 0)
    summary.push(`⚠️ ${diagnostics.missingFields.length} missing fields detected`);

  if (diagnostics.driftDetected)
    summary.push(`⚠️ Schema drift detected`);

  if (diagnostics.slowdownCauses.length > 0)
    summary.push(`🐢 Slowdown causes: ${diagnostics.slowdownCauses.join(", ")}`);

  if (summary.length === 0)
    summary.push("✅ No issues detected");

  return summary;
}

// ============================================================================
// EVOLUTIONARY NOTES — The Historian Layer (v10.4)
// ============================================================================
function buildEvolutionaryNotes(context) {
  const notes = [];

  // Pattern evolution
  if (context.pulse?.pattern)
    notes.push(`Pattern: ${context.pulse.pattern}`);

  // Lineage depth
  if (context.pulse?.lineage)
    notes.push(`Lineage depth: ${context.pulse.lineage.length}`);

  // Advantage field
  if (context.pulse?.advantageField)
    notes.push(`Advantage field active`);

  // Organ improvements
  if (context.organs)
    notes.push(`Organ snapshot included`);

  // Drift awareness
  if (context.diagnostics?.driftDetected)
    notes.push(`Evolutionary drift detected`);

  return notes;
}

// ============================================================================
// ORGAN SNAPSHOT — Which organs were involved (v10.4)
// ============================================================================
function buildOrganSnapshot(context) {
  return {
    persona: context.persona,
    permissions: context.permissions,
    boundaries: context.boundaries,
    cognitiveFrame: context.meta,
    clinician: context.clinicianMeta || null,
    mesh: context.meshMeta || null,
    router: context.routerMeta || null,
    send: context.sendMeta || null
  };
}

// ============================================================================
// ROUTING SNAPSHOT — Pathway + Router Decisions (v10.4)
// ============================================================================
function buildRoutingSnapshot(context) {
  if (!context.routing) return null;

  return {
    targetOrgan: context.routing.targetOrgan,
    mode: context.routing.mode,
    pathway: context.routing.pathway,
    routerPersona: context.routing.persona
  };
}

// ============================================================================
// PULSE SNAPSHOT — Pulse lineage + pattern (v10.4)
// ============================================================================
function buildPulseSnapshot(context) {
  if (!context.pulse) return null;

  return {
    pulseType: context.pulse.pulseType,
    pattern: context.pulse.pattern,
    lineageDepth: Array.isArray(context.pulse.lineage)
      ? context.pulse.lineage.length
      : 0
  };
}

// ============================================================================
// STRING FORMATTER — Pretty Printed Debug Report (v10.4)
// ============================================================================
export function formatDebugString(context) {
  const report = formatDebugReport(context);

  let out = "\n=== AI DEBUG REPORT (v10.4) ===\n\n";

  out += "SUMMARY:\n";
  report.summary.forEach((line) => {
    out += `  - ${line}\n`;
  });

  out += "\nTRACE:\n";
  report.trace.forEach((step, i) => {
    out += `  ${i + 1}. ${step}\n`;
  });

  if (report.mismatches.length > 0) {
    out += "\nMISMATCHES:\n";
    report.mismatches.forEach((m) => {
      out += `  - Field "${m.field}": expected ${m.expected}, got ${m.actual}\n`;
    });
  }

  if (report.missingFields.length > 0) {
    out += "\nMISSING FIELDS:\n";
    report.missingFields.forEach((f) => {
      out += `  - ${f}\n`;
    });
  }

  if (report.slowdownCauses.length > 0) {
    out += "\nSLOWDOWN CAUSES:\n";
    report.slowdownCauses.forEach((s) => {
      out += `  - ${s}\n`;
    });
  }

  out += `\nDRIFT DETECTED: ${report.driftDetected ? "YES" : "NO"}\n`;

  out += "\nEVOLUTIONARY NOTES:\n";
  report.evolution.forEach((n) => {
    out += `  - ${n}\n`;
  });

  out += "\n========================\n";

  return out;
}
