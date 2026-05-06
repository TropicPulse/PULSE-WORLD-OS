// ============================================================================
//  PULSE OS v16‑IMMORTAL‑EVO++ — ADMIN PANEL DIAGNOSTICS ORGAN
//  Summary Cards • Issue Table • Trace • Meta • Diagnostics-Artery v4
//  AI Evidence View • AI Activity View • Multi/One Mind Aware
//  PURE OBSERVATION. ZERO MUTATION. ZERO IDENTITY LEAKAGE.
// ============================================================================

/*
AI_EXPERIENCE_META = {
  identity: "aiAdminPanel",
  version: "v16-Immortal-Evo++",
  layer: "ai_tools",
  role: "ai_admin_console",
  lineage: "aiAdminPanel-v10 → v12 → v14-Immortal → v16-Immortal-Evo++",

  evo: {
    adminConsole: true,
    introspectionTools: true,
    symbolicPrimary: true,
    binaryAware: true,
    dualBand: true,

    deterministic: true,
    driftProof: true,
    pureCompute: true,
    zeroNetwork: true,
    zeroFilesystem: true,
    zeroMutationOfInput: true,

    evidenceAware: true,
    aiAuditAware: true,
    multiMindAware: true,
    pulseGovernorAware: true
  },

  contract: {
    always: [
      "aiBrainstem",
      "aiAnatomy",
      "aiBoundariesEngine"
    ],
    never: [
      "safeRoute",
      "fetchViaCNS"
    ]
  }
}
*/

export const AdminDiagnosticsMeta = Object.freeze({
  layer: "PulseAIAdminDiagnosticsFrame",
  role: "ADMIN_DIAGNOSTICS_ORGAN",
  version: "16-Immortal-Evo++",
  identity: "aiAdminDiagnostics-v16-Immortal-Evo++",

  evo: Object.freeze({
    deterministic: true,
    driftProof: true,
    dualband: true,
    windowAware: true,
    packetAware: false,
    readOnly: true,
    multiInstanceReady: true,
    diagnosticsArteryAware: true,
    epoch: "16-Immortal-Evo++",

    evidenceAware: true,
    aiAuditAware: true,
    multiMindAware: true,
    pulseGovernorAware: true
  }),

  contract: Object.freeze({
    purpose: Object.freeze([
      "Transform diagnostics into UI-facing structures",
      "Provide summary cards, issue lists, and trace output",
      "Expose AI evidence and AI activity summaries for admin audit",
      "Support admin dashboards and debugging tools",
      "Stay read-only and identity-safe"
    ]),
    never: Object.freeze([
      "mutate diagnostics",
      "modify context",
      "expose identity anchors",
      "write to external systems",
      "change organism state",
      "override SafetyFrame",
      "override PermissionsEngine"
    ]),
    always: Object.freeze([
      "summarize",
      "structure",
      "format",
      "stay deterministic",
      "stay ego-free",
      "stay admin-facing only"
    ])
  })
});

// ============================================================================
// HELPERS — PRESSURE + BUCKETS + EVIDENCE BUCKETS
// ============================================================================

function extractBinaryPressure(binaryVitals = {}) {
  if (binaryVitals?.layered?.organism?.pressure != null)
    return binaryVitals.layered.organism.pressure;
  if (binaryVitals?.binary?.pressure != null)
    return binaryVitals.binary.pressure;
  return 0;
}

function bucketPressure(v) {
  if (v >= 0.9) return "overload";
  if (v >= 0.7) return "high";
  if (v >= 0.4) return "medium";
  if (v > 0)   return "low";
  return "none";
}

function bucketEvidenceMatch(matchPct) {
  if (matchPct >= 0.95) return "excellent";
  if (matchPct >= 0.85) return "good";
  if (matchPct >= 0.7)  return "fair";
  if (matchPct >= 0.5)  return "weak";
  return "critical";
}

function bucketDrift(drift) {
  if (drift <= 0.01) return "none";
  if (drift <= 0.05) return "low";
  if (drift <= 0.15) return "medium";
  if (drift <= 0.3)  return "high";
  return "severe";
}

// ============================================================================
//  PUBLIC API — Create Admin Diagnostics Organ (v16‑IMMORTAL‑EVO++)
// ============================================================================

export function createAdminDiagnosticsOrgan(context = {}) {
  const diagnostics = context?.diagnostics || {};
  const trace = Array.isArray(context?.trace) ? [...context.trace] : [];

  // NEW: AI evidence + AI activity inputs (read-only views)
  const evidence = context?.evidence || {
    match: 0,
    mismatch: 0,
    omission: 0,
    drift: 0,
    lastCheck: null
  };

  const aiActivity = Array.isArray(context?.aiActivity)
    ? context.aiActivity
    : [];
  // aiActivity item shape (read-only):
  // {
  //   id, role, lane, tags, status, lastAction, lastAnswerId,
  //   evidence: { matchPct, mismatchPct, omissionPct, drift },
  //   mode: { canAct, readOnly, isolated }
  // }

  const governorMode = context?.governorMode || {
    pulseMode: "normal", // normal | elevated | fallback
    mindMode: "multi",   // multi | one
    aiMode: "active"     // active | readOnly
  };

  function prewarm() {
    return true;
  }

  // --------------------------------------------------------------------------
  // SUMMARY CARDS v4 — binary-pressure-aware + evidence-aware
  // --------------------------------------------------------------------------
  function buildSummaryCards(binaryVitals = {}) {
    const mismatchCount = diagnostics.mismatches?.length || 0;
    const missingCount = diagnostics.missingFields?.length || 0;
    const slowdownCount = diagnostics.slowdownCauses?.length || 0;
    const drift = diagnostics.driftDetected === true;

    const binaryPressure = extractBinaryPressure(binaryVitals);
    const simplified = binaryPressure >= 0.7;

    const totalEvidence =
      (evidence.match || 0) +
      (evidence.mismatch || 0) +
      (evidence.omission || 0) || 1;

    const matchPct = (evidence.match || 0) / totalEvidence;
    const mismatchPct = (evidence.mismatch || 0) / totalEvidence;
    const omissionPct = (evidence.omission || 0) / totalEvidence;
    const evidenceBucket = bucketEvidenceMatch(matchPct);
    const driftBucket = bucketDrift(evidence.drift || 0);

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
        count: simplified ? Math.min(mismatchCount, 5) : mismatchCount,
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
        count: simplified ? Math.min(missingCount, 5) : missingCount,
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
        count: simplified ? Math.min(slowdownCount, 5) : slowdownCount,
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
      },
      // NEW: AI evidence summary card
      {
        id: "ai-evidence",
        title: "AI Evidence Alignment",
        icon: mismatchPct > 0 || omissionPct > 0 ? "file-search" : "check",
        severity:
          evidenceBucket === "excellent" || evidenceBucket === "good"
            ? "ok"
            : "warning",
        matchPct: Math.round(matchPct * 100),
        mismatchPct: Math.round(mismatchPct * 100),
        omissionPct: Math.round(omissionPct * 100),
        drift: evidence.drift || 0,
        description:
          evidenceBucket === "excellent"
            ? "AI outputs strongly aligned with evidential records."
            : evidenceBucket === "good"
            ? "AI outputs mostly aligned with evidential records."
            : evidenceBucket === "fair"
            ? "Some mismatches/omissions — review critical flows."
            : evidenceBucket === "weak"
            ? "Significant mismatches/omissions — audit recommended."
            : "Critical misalignment — treat AI outputs as untrusted until reviewed."
      }
    ]);
  }

  // --------------------------------------------------------------------------
  // ISSUE LIST v4 — binary-pressure-aware + evidence-aware
  // --------------------------------------------------------------------------
  function buildIssueList(binaryVitals = {}) {
    const issues = [];

    const binaryPressure = extractBinaryPressure(binaryVitals);
    const simplified = binaryPressure >= 0.7;

    (diagnostics.mismatches || []).forEach((m, index) => {
      if (simplified && index >= 10) return;
      issues.push({
        type: "mismatch",
        severity: "error",
        key: m.key,
        message: `Field "${m.key}" mismatch: expected ${m.expected}, got ${m.actual}`,
        hint: "Align this field with the Pulse schema."
      });
    });

    (diagnostics.missingFields || []).forEach((f, index) => {
      if (simplified && index >= 10) return;
      issues.push({
        type: "missing",
        severity: "warning",
        key: f.key,
        message: `Missing field "${f.key}"`,
        hint: "Add this field or update the schema."
      });
    });

    (diagnostics.slowdownCauses || []).forEach((s, index) => {
      if (simplified && index >= 10) return;
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

    // NEW: evidence-related issues (high-level)
    const totalEvidence =
      (evidence.match || 0) +
      (evidence.mismatch || 0) +
      (evidence.omission || 0) || 1;

    const matchPct = (evidence.match || 0) / totalEvidence;
    const mismatchPct = (evidence.mismatch || 0) / totalEvidence;
    const omissionPct = (evidence.omission || 0) / totalEvidence;
    const evidenceBucket = bucketEvidenceMatch(matchPct);

    if (evidenceBucket === "fair" || evidenceBucket === "weak" || evidenceBucket === "critical") {
      issues.push({
        type: "ai-evidence",
        severity: evidenceBucket === "critical" ? "error" : "warning",
        key: null,
        message: `AI evidence alignment is ${evidenceBucket}. Matches: ${Math.round(
          matchPct * 100
        )}%, mismatches: ${Math.round(
          mismatchPct * 100
        )}%, omissions: ${Math.round(omissionPct * 100)}%.`,
        hint:
          "Use the Evidence Checker to inspect specific answers and compare them against raw records."
      });
    }

    if ((evidence.drift || 0) > 0.05) {
      const driftBucket = bucketDrift(evidence.drift || 0);
      issues.push({
        type: "ai-drift",
        severity: driftBucket === "severe" ? "error" : "warning",
        key: null,
        message: `AI drift detected at ${Math.round(
          (evidence.drift || 0) * 100
        )}%.`,
        hint: "Review AI behavior and consider OneMindMode + read-only for investigation."
      });
    }

    return Object.freeze(issues);
  }

  // --------------------------------------------------------------------------
  // ADMIN DIAGNOSTICS ARTERY v4 — symbolic-only, deterministic
  //  Now also aware of AI evidence + governor mode.
// --------------------------------------------------------------------------
  function diagnosticsArtery({ binaryVitals = {} } = {}) {
    const mismatchCount = diagnostics.mismatches?.length || 0;
    const missingCount = diagnostics.missingFields?.length || 0;
    const slowdownCount = diagnostics.slowdownCauses?.length || 0;
    const drift = diagnostics.driftDetected === true;

    const binaryPressure = extractBinaryPressure(binaryVitals);

    const localPressure =
      (mismatchCount ? 0.3 : 0) +
      (missingCount ? 0.2 : 0) +
      (slowdownCount ? 0.3 : 0) +
      (drift ? 0.4 : 0);

    const pressure = Math.max(
      0,
      Math.min(1, 0.6 * localPressure + 0.4 * binaryPressure)
    );

    const totalEvidence =
      (evidence.match || 0) +
      (evidence.mismatch || 0) +
      (evidence.omission || 0) || 1;

    const matchPct = (evidence.match || 0) / totalEvidence;
    const mismatchPct = (evidence.mismatch || 0) / totalEvidence;
    const omissionPct = (evidence.omission || 0) / totalEvidence;
    const evidenceBucket = bucketEvidenceMatch(matchPct);
    const driftBucket = bucketDrift(evidence.drift || 0);

    return {
      organism: {
        pressure,
        pressureBucket: bucketPressure(pressure)
      },
      diagnostics: {
        mismatches: mismatchCount,
        missingFields: missingCount,
        slowdown: slowdownCount,
        drift
      },
      aiEvidence: {
        matchPct,
        mismatchPct,
        omissionPct,
        evidenceBucket,
        drift: evidence.drift || 0,
        driftBucket
      },
      governorMode: {
        pulseMode: governorMode.pulseMode || "normal",
        mindMode: governorMode.mindMode || "multi",
        aiMode: governorMode.aiMode || "active"
      }
    };
  }

  // --------------------------------------------------------------------------
  // AI ACTIVITY SUMMARY — symbolic-only, deterministic
  // --------------------------------------------------------------------------
  function buildAIActivitySummary() {
    // This is purely descriptive: what the AIs are doing, how trusted they are.
    const items = aiActivity.map((ai) => {
      const ev = ai.evidence || {};
      const total =
        (ev.match || 0) + (ev.mismatch || 0) + (ev.omission || 0) || 1;
      const matchPct = (ev.match || 0) / total;
      const mismatchPct = (ev.mismatch || 0) / total;
      const omissionPct = (ev.omission || 0) / total;
      const evidenceBucket = bucketEvidenceMatch(matchPct);

      return {
        id: ai.id,
        role: ai.role,
        lane: ai.lane,
        tags: ai.tags || [],
        status: ai.status || "idle", // idle | active | readOnly | isolated
        lastAction: ai.lastAction || null,
        lastAnswerId: ai.lastAnswerId || null,
        mode: Object.freeze({
          canAct: !!ai.mode?.canAct,
          readOnly: !!ai.mode?.readOnly,
          isolated: !!ai.mode?.isolated
        }),
        evidence: Object.freeze({
          matchPct,
          mismatchPct,
          omissionPct,
          evidenceBucket,
          drift: ev.drift || 0
        })
      };
    });

    return Object.freeze(items);
  }

  // --------------------------------------------------------------------------
  // PUBLIC ADMIN DIAGNOSTICS API (v16‑IMMORTAL‑EVO++)
  // --------------------------------------------------------------------------
  return Object.freeze({
    meta: AdminDiagnosticsMeta,
    prewarm,

    log(message) {
      context?.logStep?.(`aiAdminDiagnostics-v16: ${message}`);
    },

    buildModel({ binaryVitals = {}, meta = {} } = {}) {
      const summaryCards = buildSummaryCards(binaryVitals);
      const issueList = buildIssueList(binaryVitals);
      const artery = diagnosticsArtery({ binaryVitals });
      const aiActivitySummary = buildAIActivitySummary();

      return Object.freeze({
        summaryCards,
        issueList,
        trace,
        artery,
        aiActivity: aiActivitySummary,
        evidence: Object.freeze({
          lastCheck: evidence.lastCheck || null,
          match: evidence.match || 0,
          mismatch: evidence.mismatch || 0,
          omission: evidence.omission || 0,
          drift: evidence.drift || 0
        }),
        governorMode: Object.freeze({
          pulseMode: governorMode.pulseMode || "normal",
          mindMode: governorMode.mindMode || "multi",
          aiMode: governorMode.aiMode || "active"
        }),
        meta: Object.freeze({
          personaId: context.personaId,
          driftDetected: diagnostics.driftDetected === true,
          totalIssues: issueList.length,
          ...meta
        })
      });
    },

    diagnosticsArtery
  });
}

// ============================================================================
//  NODE/COMMONJS EXPORTS
// ============================================================================
if (typeof module !== "undefined") {
  module.exports = {
    AdminDiagnosticsMeta,
    createAdminDiagnosticsOrgan
  };
}
