// ============================================================================
//  PULSE OS v10.4 — ADMIN PANEL MODEL (UI-FACING)
//  Summary Cards • Issue Table • Trace • Meta
// ============================================================================

import { CLINICIAN_META } from "./aiClinician.js";

export function buildAdminPanelModel(context, options = {}) {
  const diagnostics = context.diagnostics || {};
  const trace = Array.isArray(context.trace) ? [...context.trace] : [];

  const summaryCards = buildSummaryCards(diagnostics);
  const issueList = buildIssueList(diagnostics);

  return Object.freeze({
    summaryCards,
    issueList,
    trace,
    meta: Object.freeze({
      clinician: CLINICIAN_META,
      personaId: context.personaId,
      driftDetected: diagnostics.driftDetected === true,
      totalIssues: issueList.length,
      ...options.meta
    })
  });
}

function buildSummaryCards(diagnostics) {
  const mismatchCount = diagnostics.mismatches?.length || 0;
  const missingCount = diagnostics.missingFields?.length || 0;
  const slowdownCount = diagnostics.slowdownCauses?.length || 0;
  const drift = diagnostics.driftDetected === true;

  return Object.freeze([
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
      description: drift ? "Schema drift detected." : "No schema drift."
    }
  ]);
}

function buildIssueList(diagnostics) {
  const issues = [];

  (diagnostics.mismatches || []).forEach((m) => {
    issues.push({
      type: "mismatch",
      severity: "error",
      key: m.key,
      message: `Field "${m.key}" mismatch: expected ${m.expected}, got ${m.actual}`,
      hint: "Align this field with the Pulse schema."
    });
  });

  (diagnostics.missingFields || []).forEach((f) => {
    issues.push({
      type: "missing",
      severity: "warning",
      key: f.key,
      message: `Missing field "${f.key}"`,
      hint: "Add this field or update the schema."
    });
  });

  (diagnostics.slowdownCauses || []).forEach((s, index) => {
    issues.push({
      type: "slowdown",
      severity: "warning",
      key: null,
      message: `Potential slowdown cause: ${s.reason}`,
      hint: "Consider simplifying this data.",
      id: `slowdown-${index}`
    });
  });

  if (diagnostics.driftDetected) {
    issues.push({
      type: "drift",
      severity: "error",
      key: null,
      message: "Schema drift detected.",
      hint: "Run a full audit and align schemas."
    });
  }

  return Object.freeze(issues);
}
