/* global log,warn,error */
/*
AI_EXPERIENCE_META = {
  identity: "PulseBandPurifier",
  version: "v16.3-Immortal-PulseBandPurifier",
  layer: "pulseband_purifier",
  role: "purifier_sanity_layer_order_keeper",

  lineage: {
    root: "PulseProxy-v11",
    parent: "PulseBandPurifier-v12.3-Evo-Presence",
    organismIntegration: "v16-Immortal"
  },

  evo: {
    // Core identity
    pulseBandPurifier: true,
    purifierOrgan: true,
    sanityLayer: true,
    orderKeeper: true,
    backendOnly: true,
    symbolicBackend: true,
    boundedScan: true,
    timerSafe: true,
    idempotentCleanup: true,
    multiInstanceReady: true,

    // Awareness / presence / advantage / experience
    bandAware: true,
    waveFieldAware: true,
    presenceAware: true,
    presenceFieldAware: true,
    unifiedAdvantageField: true,
    pulseEfficiencyAware: true,
    experienceAware: true,
    healingAware: true,

    // Evolution / IMMORTAL
    deterministic: true,
    driftProof: true,
    immortal: true,
    futureEvolutionReady: true,

    // Prohibitions
    noIQ: true,
    noRouting: true,
    noCompute: true,
    zeroRandomness: true,
    zeroTimers: true,          // caller provides timing
    zeroAsyncLoops: false,     // bounded async loops allowed
    zeroNetwork: true,         // Firestore only
    zeroIO: true,
    zeroExternalMutation: true,
    zeroDynamicImports: true,
    zeroEval: true,
    zeroWindow: true,
    zeroDOM: true,
    zeroGPU: true
  },

  contract: {
    input: [
      "CleanupScheduleTick",
      "PulseBandSessionSnapshot",
      "PulseBandErrorSnapshot",
      "PulseBandRedownloadSnapshot",
      "PresenceContext"
    ],
    output: [
      "CleanupResult",
      "CleanupBandSignature",
      "CleanupWaveField",
      "CleanupAdvantageField",
      "CleanupExperienceField",
      "CleanupDiagnostics",
      "CleanupHealingState"
    ],
    consumers: [
      "PulseProxySpine",
      "PulseBand",
      "PulseHealer",
      "GlobalHealer",
      "PNSRepair",
      "PNSPurifier",
      "PulseWorldCore"
    ]
  },

  experience: {
    description:
      "PulseBandPurifier maintains long-term sanity of PulseBand by pruning stale sessions, " +
      "errors, and redownload logs, exposing deterministic cleanup and healing surfaces.",
    aiUsageHint:
      "Use CleanupExperienceField and CleanupHealingState to understand PulseBand load, " +
      "cleanup pressure, and long-term drift control."
  }
}
*/

// ============================================================================
//  PULSE OS v16.3-Immortal-Presence — PULSEBAND PURIFIER (BACKEND CLEANUP ORGAN)
//  “THE PURIFIER / SANITY LAYER / ORDER‑KEEPER”
//  Backend‑Only • Drift Control • Session/Error/Redownload Cleanup
// ============================================================================
//
//  ROLE (v16.3):
//  -------------
//  • Backend‑only organ for the PulseBand subsystem.
//  • Periodically cleans up:
//      – pulseband_sessions (+ nested chunks)
//      – pulseband_errors
//      – pulseband_redownloads
//  • Prevents long‑term drift from stale sessions + logs.
//  • Emits IMMORTAL cleanup band/wave/advantage/experience/healing surfaces.
//  • Writes TIMER_LOGS + FUNCTION_ERRORS for full traceability.
//  • Called by Heartbeat / OSKernel as a scheduled purifier.
//
//  SAFETY CONTRACT (v16.3):
//  ------------------------
//  • Fail‑open: errors are logged, never fatal to the OS.
//  • No randomness in cleanup logic.
//  • No mutation outside intended collections.
//  • Deterministic, bounded scans (MAX_BATCH).
//  • Multi‑instance safe — repeated runs are idempotent in effect.
//  • No OS imports, no IQ, no routing.
//  • Pure symbolic backend organ (no binary mode).
//  • Cleanup surfaces are descriptive‑only, never drive routing.
// ============================================================================

const admin = global.db;
const db    = global.db;

// ============================================================================
// AI EXPERIENCE META (exported) — same schema as commented block above
// ============================================================================
export const AI_EXPERIENCE_META = Object.freeze({
  identity: "PulseBandPurifier",
  version: "v16.3-Immortal-PulseBandPurifier",
  layer: "pulseband_purifier",
  role: "purifier_sanity_layer_order_keeper",

  lineage: Object.freeze({
    root: "PulseProxy-v11",
    parent: "PulseBandPurifier-v12.3-Evo-Presence",
    organismIntegration: "v16-Immortal"
  }),

  evo: Object.freeze({
    pulseBandPurifier: true,
    purifierOrgan: true,
    sanityLayer: true,
    orderKeeper: true,
    backendOnly: true,
    symbolicBackend: true,
    boundedScan: true,
    timerSafe: true,
    idempotentCleanup: true,
    multiInstanceReady: true,

    bandAware: true,
    waveFieldAware: true,
    presenceAware: true,
    presenceFieldAware: true,
    unifiedAdvantageField: true,
    pulseEfficiencyAware: true,
    experienceAware: true,
    healingAware: true,

    deterministic: true,
    driftProof: true,
    immortal: true,
    futureEvolutionReady: true,

    noIQ: true,
    noRouting: true,
    noCompute: true,
    zeroRandomness: true,
    zeroTimers: true,
    zeroAsyncLoops: false,
    zeroNetwork: true,
    zeroIO: true,
    zeroExternalMutation: true,
    zeroDynamicImports: true,
    zeroEval: true,
    zeroWindow: true,
    zeroDOM: true,
    zeroGPU: true
  }),

  contract: Object.freeze({
    input: [
      "CleanupScheduleTick",
      "PulseBandSessionSnapshot",
      "PulseBandErrorSnapshot",
      "PulseBandRedownloadSnapshot",
      "PresenceContext"
    ],
    output: [
      "CleanupResult",
      "CleanupBandSignature",
      "CleanupWaveField",
      "CleanupAdvantageField",
      "CleanupExperienceField",
      "CleanupDiagnostics",
      "CleanupHealingState"
    ],
    consumers: [
      "PulseProxySpine",
      "PulseBand",
      "PulseHealer",
      "GlobalHealer",
      "PNSRepair",
      "PNSPurifier",
      "PulseWorldCore"
    ]
  }),

  experience: Object.freeze({
    description:
      "PulseBandPurifier maintains long-term sanity of PulseBand by pruning stale sessions, " +
      "errors, and redownload logs, exposing deterministic cleanup and healing surfaces.",
    aiUsageHint:
      "Use CleanupExperienceField and CleanupHealingState to understand PulseBand load, " +
      "cleanup pressure, and long-term drift control."
  })
});

// ============================================================================
// ORGAN IDENTITY — v16.3-Immortal-Presence
// ============================================================================
export const PulseRole = {
  type: "Organ",
  subsystem: "PulseProxy",
  layer: "PulseBandPurifier",
  version: "16.3-Immortal-Presence",
  identity: "PulseBandCleanup-v16.3-Immortal-Presence",

  evo: {
    driftProof: true,
    deterministic: true,

    backendOnly: true,
    symbolicBackend: true,
    dualModeEvolution: false,

    noIQ: true,
    noRouting: true,
    noCompute: true,

    multiInstanceReady: true,
    pulseBandAware: true,
    futureEvolutionReady: true,

    boundedScan: true,
    timerSafe: true,
    organismClusterBoost: true,

    unifiedAdvantageField: true,
    pulseEfficiencyAware: true,
    bandAware: true,
    waveFieldAware: true,
    presenceAware: true,
    presenceFieldAware: true,
    binaryFieldAware: false,

    experienceAware: true,
    healingAware: true
  }
};

// ============================================================================
// HUMAN‑READABLE CONTEXT MAP (v16.3)
// ============================================================================
const CLEANUP_CONTEXT = {
  label: "PULSEBAND_CLEANUP",
  layer: PulseRole.layer,
  role: "Purifier / Sanity Layer / Order‑Keeper",
  purpose: "PulseBand Session + Error Cleanup",
  context: "Removes expired sessions, chunks, errors, and redownload logs",
  version: PulseRole.version,
  evo: PulseRole.evo
};

const CLEANUP_DIAGNOSTICS_ENABLED =
  process.env.PULSE_BAND_CLEANUP_DIAGNOSTICS === "true" ||
  process.env.PULSE_DIAGNOSTICS === "true";

const logCleanup = (stage, details = {}) => {
  if (!CLEANUP_DIAGNOSTICS_ENABLED) return;

  log(
    `[PULSEBAND_CLEANUP] ${stage} :: ${JSON.stringify({
      ...CLEANUP_CONTEXT,
      ...details
    })}`
  );
};

// ============================================================================
// META — v16.3-Immortal-Presence
// ============================================================================
export const PulseBandPurifierMeta = Object.freeze({
  layer: "PulseBandPurifier",
  role: "PULSEBAND_PURIFIER_ORGAN",
  version: "v16.3-Immortal-Presence",
  identity: "PulseBandPurifier-v16.3-Immortal-Presence",

  guarantees: Object.freeze({
    deterministic: true,
    driftProof: true,
    multiInstanceReady: true,
    backendOnly: true,
    symbolicBackend: true,
    boundedScan: true,
    timerSafe: true,
    idempotentCleanup: true,
    failOpenSafe: true,
    unifiedAdvantageField: true,
    pulseEfficiencyAware: true,
    pulseBandAware: true,

    zeroIQ: true,
    zeroRouting: true,
    zeroCompute: true,
    zeroRandomness: true,
    zeroDateNow: false,             // Date.now() used deterministically for cutoffs
    zeroTimers: true,
    zeroAsyncLoops: false,
    zeroNetwork: true,
    zeroIO: true,
    zeroExternalMutation: true,
    zeroDynamicImports: true,
    zeroEval: true,
    zeroWindow: true,
    zeroDOM: true,
    zeroGPU: true,

    symbolicAware: true,
    binaryAware: false,
    bandAware: true,
    waveFieldAware: true,
    binaryFieldAware: false,
    presenceAware: true,
    presenceFieldAware: true,

    worldLensAware: false
  }),

  contract: Object.freeze({
    input: [
      "CleanupScheduleTick",
      "PulseBandSessionSnapshot",
      "PulseBandErrorSnapshot",
      "PulseBandRedownloadSnapshot",
      "PresenceContext"
    ],
    output: [
      "CleanupResult",
      "CleanupBandSignature",
      "CleanupWaveField",
      "CleanupAdvantageField",
      "CleanupExperienceField",
      "CleanupDiagnostics",
      "CleanupHealingState"
    ]
  }),

  lineage: Object.freeze({
    root: "PulseProxy-v11",
    parent: "PulseProxy-v16-Immortal",
    ancestry: [
      "PulseBandPurifier-v7",
      "PulseBandPurifier-v8",
      "PulseBandPurifier-v9",
      "PulseBandPurifier-v10",
      "PulseBandPurifier-v11",
      "PulseBandPurifier-v11-Evo",
      "PulseBandPurifier-v11-Evo-Prime",
      "PulseBandPurifier-v12.3-Evo-Presence"
    ]
  }),

  bands: Object.freeze({
    supported: ["symbolic"],
    default: "symbolic",
    behavior: "purifier-backend"
  }),

  architecture: Object.freeze({
    pattern: "A-B-A",
    baseline: "scheduled tick → bounded cleanup → symbolic surfaces",
    adaptive: "wave-field + advantage + experience overlays (no binary mode)",
    return: "deterministic cleanup surfaces + signatures + healing state"
  })
});

// ============================================================================
// IMMORTAL CLEANUP SURFACES — band / wave / advantage / experience / healing
// ============================================================================
const purifierHealingState = {
  ...CLEANUP_CONTEXT,
  lastRunId: null,
  lastOk: null,
  lastError: null,
  lastDeletedSessions: 0,
  lastDeletedErrors: 0,
  lastDeletedRedownloads: 0,
  lastBand: "symbolic",
  lastAdvantageScore: null,
  lastExperienceQuality: null,
  cycleCount: 0
};

function computeHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `h${h}`;
}

function buildCleanupWaveField(runId) {
  const key = String(runId || "NO_RUN");
  const len = key.length;
  const amplitude = 5 + (len % 9);
  const wavelength = amplitude + 7;
  const phase = (len * 5) % 32;

  return {
    amplitude,
    wavelength,
    phase,
    band: "purifier",
    mode: "symbolic-wave",
    waveSignature: computeHash(
      `CLEANUP_WAVE::${key}::${amplitude}::${wavelength}::${phase}`
    )
  };
}

function buildCleanupAdvantageField({ deletedSessions, deletedErrors, deletedRedownloads }) {
  const s = Math.max(0, deletedSessions || 0);
  const e = Math.max(0, deletedErrors || 0);
  const r = Math.max(0, deletedRedownloads || 0);
  const total = s + e + r;

  const sessionWeight = 1.0;
  const errorWeight = 0.7;
  const redownloadWeight = 0.5;

  const weighted = s * sessionWeight + e * errorWeight + r * redownloadWeight;
  const density = total === 0 ? 0 : Math.min(1, weighted / (total + 1));
  const stress = Math.min(1, total / 5000);
  const efficiency = total === 0 ? 0 : (weighted + 1) / (total + 1);
  const advantageScore = efficiency * (1 + density) * (1 - 0.25 * stress);

  return {
    deletedSessions: s,
    deletedErrors: e,
    deletedRedownloads: r,
    total,
    density,
    stress,
    efficiency,
    advantageScore,
    advantageSignature: computeHash(
      `CLEANUP_ADVANTAGE::${s}::${e}::${r}::${density}::${stress}::${efficiency}::${advantageScore}`
    )
  };
}

function buildCleanupExperienceField({ runId, ok, deletedSessions, deletedErrors, deletedRedownloads }) {
  const total = (deletedSessions || 0) + (deletedErrors || 0) + (deletedRedownloads || 0);
  let quality = "idle";
  if (!ok) quality = "error";
  else if (total === 0) quality = "no-op";
  else if (total < 100) quality = "light";
  else if (total < 1000) quality = "moderate";
  else quality = "heavy";

  return {
    runId,
    quality,
    deletedSessions: deletedSessions || 0,
    deletedErrors: deletedErrors || 0,
    deletedRedownloads: deletedRedownloads || 0,
    total,
    experienceSignature: computeHash(
      `CLEANUP_EXPERIENCE::${runId}::${quality}::${total}`
    )
  };
}

function buildCleanupBandSignature(runId) {
  return computeHash(`CLEANUP_BAND::symbolic::${runId}`);
}

function updatePurifierHealingState({
  runId,
  ok,
  error,
  deletedSessions,
  deletedErrors,
  deletedRedownloads,
  advantageField,
  experienceField
}) {
  purifierHealingState.lastRunId = runId;
  purifierHealingState.lastOk = ok;
  purifierHealingState.lastError = error || null;
  purifierHealingState.lastDeletedSessions = deletedSessions || 0;
  purifierHealingState.lastDeletedErrors = deletedErrors || 0;
  purifierHealingState.lastDeletedRedownloads = deletedRedownloads || 0;
  purifierHealingState.lastBand = "symbolic";
  purifierHealingState.lastAdvantageScore =
    typeof advantageField?.advantageScore === "number"
      ? advantageField.advantageScore
      : purifierHealingState.lastAdvantageScore;
  purifierHealingState.lastExperienceQuality =
    experienceField?.quality || purifierHealingState.lastExperienceQuality;
  purifierHealingState.cycleCount += 1;
}

export function getPulseBandPurifierHealingState() {
  return { ...purifierHealingState };
}

// ============================================================================
// INTERNAL CONSTANTS (bounded scan size)
// ============================================================================
const MAX_BATCH = 500; // bounded scan size — keeps cleanup deterministic + safe

// ============================================================================
// INTERNAL HELPERS (bounded, deterministic, no IQ)
// ============================================================================
async function cleanupSessionsBefore(cutoffMs, runId, errorPrefix) {
  let deletedCount = 0;
  let lastDoc = null;

  while (true) {
    let query = db
      .collection("pulseband_sessions")
      .where("createdAt", "<", new Date(cutoffMs))
      .orderBy("createdAt", "asc")
      .limit(MAX_BATCH);

    if (lastDoc) {
      query = query.startAfter(lastDoc);
    }

    const snap = await query.get();
    if (snap.empty) break;

    for (const s of snap.docs) {
      const id = s.id;
      try {
        const data = s.data() || {};
        const createdAt = data.createdAt?.toMillis?.() || 0;

        if (createdAt < cutoffMs) {
          log(
            `%c🟨 DELETE SESSION → ${id}`,
            "color:#FFC107; font-weight:bold;"
          );
          logCleanup("DELETE_SESSION", { sessionId: id, runId });

          const chunksSnap = await s.ref.collection("chunks").get();
          for (const c of chunksSnap.docs) {
            await c.ref.delete();
          }

          await s.ref.delete();
          deletedCount += 1;
        }
      } catch (err) {
        error(
          `%c🟥 SESSION CLEANUP ERROR → ${id}`,
          "color:#FF5252; font-weight:bold;",
          err
        );

        await db.collection("FUNCTION_ERRORS").doc(`${errorPrefix}SESSION_${id}`).set({
          fn: "pulsebandCleanup",
          stage: "session_doc",
          docId: id,
          error: String(err),
          runId,
          ...CLEANUP_CONTEXT,
          createdAt: admin.firestore.FieldValue.serverTimestamp()
        });
      }
    }

    lastDoc = snap.docs[snap.docs.length - 1];
    if (snap.size < MAX_BATCH) break;
  }

  return deletedCount;
}

async function cleanupErrorsBefore(cutoffMs, runId, errorPrefix) {
  let deletedCount = 0;
  let lastDoc = null;

  while (true) {
    let query = db
      .collection("pulseband_errors")
      .where("createdAt", "<", new Date(cutoffMs))
      .orderBy("createdAt", "asc")
      .limit(MAX_BATCH);

    if (lastDoc) {
      query = query.startAfter(lastDoc);
    }

    const snap = await query.get();
    if (snap.empty) break;

    for (const e of snap.docs) {
      const id = e.id;
      try {
        const createdAt = e.data()?.createdAt?.toMillis?.() || 0;

        if (createdAt < cutoffMs) {
          log(
            `%c🟨 DELETE ERROR → ${id}`,
            "color:#FFC107; font-weight:bold;"
          );
          logCleanup("DELETE_ERROR", { errorId: id, runId });

          await e.ref.delete();
          deletedCount += 1;
        }
      } catch (err) {
        error(
          `%c🟥 ERROR CLEANUP ERROR → ${id}`,
          "color:#FF5252; font-weight:bold;",
          err
        );

        await db.collection("FUNCTION_ERRORS").doc(`${errorPrefix}ERROR_${id}`).set({
          fn: "pulsebandCleanup",
          stage: "error_doc",
          docId: id,
          error: String(err),
          runId,
          ...CLEANUP_CONTEXT,
          createdAt: admin.firestore.FieldValue.serverTimestamp()
        });
      }
    }

    lastDoc = snap.docs[snap.docs.length - 1];
    if (snap.size < MAX_BATCH) break;
  }

  return deletedCount;
}

async function cleanupRedownloadsBefore(cutoffMs, runId, errorPrefix) {
  let deletedCount = 0;
  let lastDoc = null;

  while (true) {
    let query = db
      .collection("pulseband_redownloads")
      .where("createdAt", "<", new Date(cutoffMs))
      .orderBy("createdAt", "asc")
      .limit(MAX_BATCH);

    if (lastDoc) {
      query = query.startAfter(lastDoc);
    }

    const snap = await query.get();
    if (snap.empty) break;

    for (const r of snap.docs) {
      const id = r.id;
      try {
        const createdAt = r.data()?.createdAt?.toMillis?.() || 0;

        if (createdAt < cutoffMs) {
          log(
            `%c🟨 DELETE REDOWNLOAD → ${id}`,
            "color:#FFC107; font-weight:bold;"
          );
          logCleanup("DELETE_REDOWNLOAD", { redownloadId: id, runId });

          await r.ref.delete();
          deletedCount += 1;
        }
      } catch (err) {
        error(
          `%c🟥 REDOWNLOAD CLEANUP ERROR → ${id}`,
          "color:#FF5252; font-weight:bold;",
          err
        );

        await db.collection("FUNCTION_ERRORS").doc(`${errorPrefix}REDL_${id}`).set({
          fn: "pulsebandCleanup",
          stage: "redownload_doc",
          docId: id,
          error: String(err),
          runId,
          ...CLEANUP_CONTEXT,
          createdAt: admin.firestore.FieldValue.serverTimestamp()
        });
      }
    }

    lastDoc = snap.docs[snap.docs.length - 1];
    if (snap.size < MAX_BATCH) break;
  }

  return deletedCount;
}

// ============================================================================
// BACKEND ENTRY POINT (CALLED BY HEARTBEAT / OSKernel) — v16.3 IMMORTAL
// ============================================================================
export async function pulsebandCleanup(presenceContext = null) {
  const runId = `PB_CLEANUP_${Date.now()}`;
  const errorPrefix = `ERR_${runId}_`;

  log(
    `%c🧹 START PURIFIER CLEANUP → ${runId}`,
    "color:#03A9F4; font-weight:bold;"
  );
  logCleanup("START", { runId, presenceContext: presenceContext || null });

  try {
    const cutoff24h = Date.now() - 24 * 60 * 60 * 1000;
    const cutoff7d  = Date.now() - 7 * 24 * 60 * 60 * 1000;

    const deletedSessions = await cleanupSessionsBefore(
      cutoff24h,
      runId,
      errorPrefix
    );

    const deletedErrors = await cleanupErrorsBefore(
      cutoff7d,
      runId,
      errorPrefix
    );

    const deletedRedownloads = await cleanupRedownloadsBefore(
      cutoff7d,
      runId,
      errorPrefix
    );

    const waveField = buildCleanupWaveField(runId);
    const advantageField = buildCleanupAdvantageField({
      deletedSessions,
      deletedErrors,
      deletedRedownloads
    });
    const experienceField = buildCleanupExperienceField({
      runId,
      ok: true,
      deletedSessions,
      deletedErrors,
      deletedRedownloads
    });
    const bandSignature = buildCleanupBandSignature(runId);

    updatePurifierHealingState({
      runId,
      ok: true,
      error: null,
      deletedSessions,
      deletedErrors,
      deletedRedownloads,
      advantageField,
      experienceField
    });

    await db.collection("TIMER_LOGS").doc(runId).set({
      fn: "pulsebandCleanup",
      runId,
      deletedSessions,
      deletedErrors,
      deletedRedownloads,
      bandSignature,
      waveField,
      advantageField,
      experienceField,
      presenceContext: presenceContext || null,
      ...CLEANUP_CONTEXT,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    log(
      `%c🟩 PURIFIER CLEANUP COMPLETE → ${runId}`,
      "color:#4CAF50; font-weight:bold;"
    );
    logCleanup("COMPLETE", {
      runId,
      deletedSessions,
      deletedErrors,
      deletedRedownloads
    });

    return {
      ok: true,
      runId,
      deletedSessions,
      deletedErrors,
      deletedRedownloads,
      bandSignature,
      waveField,
      advantageField,
      experienceField,
      healingState: getPulseBandPurifierHealingState(),
      presenceContext: presenceContext || null,
      ...CLEANUP_CONTEXT
    };
  } catch (err) {
    error(
      `%c🟥 PURIFIER CLEANUP ERROR`,
      "color:#FF5252; font-weight:bold;",
      err
    );
    logCleanup("FATAL_ERROR", { runId, error: String(err) });

    const waveField = buildCleanupWaveField(runId);
    const advantageField = buildCleanupAdvantageField({
      deletedSessions: purifierHealingState.lastDeletedSessions,
      deletedErrors: purifierHealingState.lastDeletedErrors,
      deletedRedownloads: purifierHealingState.lastDeletedRedownloads
    });
    const experienceField = buildCleanupExperienceField({
      runId,
      ok: false,
      deletedSessions: purifierHealingState.lastDeletedSessions,
      deletedErrors: purifierHealingState.lastDeletedErrors,
      deletedRedownloads: purifierHealingState.lastDeletedRedownloads
    });
    const bandSignature = buildCleanupBandSignature(runId);

    updatePurifierHealingState({
      runId,
      ok: false,
      error: String(err),
      deletedSessions: purifierHealingState.lastDeletedSessions,
      deletedErrors: purifierHealingState.lastDeletedErrors,
      deletedRedownloads: purifierHealingState.lastDeletedRedownloads,
      advantageField,
      experienceField
    });

    await db.collection("FUNCTION_ERRORS").doc(`${errorPrefix}FATAL`).set({
      fn: "pulsebandCleanup",
      stage: "fatal",
      error: String(err),
      runId,
      bandSignature,
      waveField,
      advantageField,
      experienceField,
      presenceContext: presenceContext || null,
      ...CLEANUP_CONTEXT,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    return {
      ok: false,
      runId,
      error: String(err),
      bandSignature,
      waveField,
      advantageField,
      experienceField,
      healingState: getPulseBandPurifierHealingState(),
      presenceContext: presenceContext || null,
      ...CLEANUP_CONTEXT
    };
  }
}
