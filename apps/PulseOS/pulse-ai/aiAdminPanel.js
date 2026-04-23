// ============================================================================
//  PULSE OS v10.4 — THE EVOLUTIONARY CLINICIAN
//  Diagnostic Interpreter • Triage Specialist • Evolutionary Insight Layer
//  PURE DIAGNOSTIC TRANSFORMATION. ZERO MUTATION. ZERO TIME. ZERO RANDOMNESS.
// ============================================================================

const CLINICIAN_META = {
  layer: "PulseClinician",
  role: "DIAGNOSTIC_INTERPRETER",
  version: "10.4",
  target: "full-mesh",
  selfRepairable: true,
  evo: {
    driftProof: true,
    deterministicField: true,
    multiInstanceReady: true,
    unifiedAdvantageField: true,
    futureEvolutionReady: true,
    observerOnly: true
  }
};

// ============================================================================
// PUBLIC API — Build Admin Panel Model (v10.4)
// ============================================================================
export function buildAdminPanelModel(context, options = {}) {
  const { trace, diagnostics } = context;

  const summaryCards = buildSummaryCards(diagnostics);
  const issueList = buildIssueList(diagnostics);

  return {
    summaryCards,
    issueList,
    trace: [...trace], // preserve lineage
    meta: {
      clinician: CLINICIAN_META,
      personaId: context.personaId,
      driftDetected: diagnostics.driftDetected,
      totalIssues: issueList.length,
      // v10.4: no timestamps, no randomness
      ...options.meta
    }
  };
}

// ============================================================================
// SUMMARY CARDS — Clinical Overview (v10.4)
// ============================================================================
function buildSummaryCards(diagnostics) {
  const mismatchCount = diagnostics.mismatches.length;
  const missingCount = diagnostics.missingFields.length;
  const slowdownCount = diagnostics.slowdownCauses.length;
  const drift = diagnostics.driftDetected;

  return [
    {
      id: "overall-health",
      title: "Overall Health",
      icon: drift || mismatchCount || missingCount ? "warning" : "check",
      severity: drift || mismatchCount || missingCount ? "warning" : "ok",
      description:
        drift
          ? "Schema drift detected."
          : mismatchCount || missingCount
          ? "Data issues detected."
          : "No major issues detected."
    },
    {
      id: "mismatches",
      title: "Field Mismatches",
      icon: mismatchCount ? "error" : "check",
      severity: mismatchCount ? "error" : "ok",
      count: mismatchCount,
      description:
        mismatchCount
          ? `${mismatchCount} mismatched fields.`
          : "No mismatched fields."
    },
    {
      id: "missing-fields",
      title: "Missing Fields",
      icon: missingCount ? "warning" : "check",
      severity: missingCount ? "warning" : "ok",
      count: missingCount,
      description:
        missingCount
          ? `${missingCount} missing fields.`
          : "No missing fields."
    },
    {
      id: "performance",
      title: "Performance Signals",
      icon: slowdownCount ? "turtle" : "bolt",
      severity: slowdownCount ? "warning" : "ok",
      count: slowdownCount,
      description:
        slowdownCount
          ? `${slowdownCount} slowdown patterns detected.`
          : "No slowdown patterns."
    },
    {
      id: "drift",
      title: "Schema Drift",
      icon: drift ? "split" : "link",
      severity: drift ? "error" : "ok",
      description:
        drift
          ? "Schema drift detected."
          : "No schema drift."
    }
  ];
}

// ============================================================================
// ISSUE LIST — Clinical Triage Table (v10.4)
// ============================================================================
function buildIssueList(diagnostics) {
  const issues = [];

  diagnostics.mismatches.forEach((m) => {
    issues.push({
      type: "mismatch",
      severity: "error",
      field: m.field,
      message: `Field "${m.field}" mismatch: expected ${m.expected}, got ${m.actual}`,
      hint: "Align this field with the Pulse schema."
    });
  });

  diagnostics.missingFields.forEach((f) => {
    issues.push({
      type: "missing",
      severity: "warning",
      field: f,
      message: `Missing field "${f}"`,
      hint: "Add this field or update the schema."
    });
  });

  diagnostics.slowdownCauses.forEach((reason, index) => {
    issues.push({
      type: "slowdown",
      severity: "warning",
      field: null,
      message: `Potential slowdown cause: ${reason}`,
      hint: "Consider simplifying this data.",
      id: `slowdown-${index}`
    });
  });

  if (diagnostics.driftDetected) {
    issues.push({
      type: "drift",
      severity: "error",
      field: null,
      message: "Schema drift detected.",
      hint: "Run a full audit and align schemas."
    });
  }

  return issues;
}
