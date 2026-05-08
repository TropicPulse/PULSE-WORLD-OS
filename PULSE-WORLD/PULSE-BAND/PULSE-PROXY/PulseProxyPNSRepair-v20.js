/* global log,warn,error */
/*
AI_EXPERIENCE_META = {
  identity: "PulseHistoryRepair",
  version: "v20-ImmortalPlus-ShortTermMemoryRepair",
  layer: "short_term_memory",
  role: "working_memory_repair_engine",

  lineage: {
    root: "PulseProxy-v11",
    parent: "PulseHistoryRepair-v16.3-Immortal-Presence",
    organismIntegration: "v20-ImmortalPlus",
    worldIntegration: "PulseWorld-v21-Immortal",
    spinalIntegration: "PulseOSSpinalCord-v20-ImmortalPlus"
  },

  evo: {
    // Core identity
    shortTermMemoryLayer: true,
    workingMemoryRepairEngine: true,
    memoryRepairEngine: true,
    lineageSafe: true,
    boundedScan: true,
    timerSafe: true,
    backendOnly: true,
    symbolicBackend: true,

    // Awareness / presence / advantage / experience
    bandAware: true,
    waveFieldAware: true,
    presenceAware: true,
    presenceFieldAware: true,
    unifiedAdvantageField: true,
    pulseEfficiencyAware: true,
    experienceAware: true,
    healingAware: true,
    repairPressureAware: true,
    driftEnvelopeAware: true,
    loadEnvelopeAware: true,

    // World / organism / speed / limbic links (meta only)
    limbicShadowAware: true,
    impulseSpeedAware: true,
    speedGovernorAware: true,
    organismClusterBoost: true,
    worldLensAware: true,

    // Evolution / IMMORTAL++
    deterministic: true,
    driftProof: true,
    immortal: true,
    immortalPlus: true,
    multiInstanceReady: true,
    futureEvolutionReady: true,

    // Performance overlays (meta only)
    prewarmAware: true,
    cacheAware: true,
    chunkAware: true,

    // Prohibitions
    noIQ: true,
    noRouting: true,
    noCompute: true,
    zeroRandomness: true,
    zeroTimers: false,          // scheduled by OSKernel/Heart, not by organ
    zeroAsyncLoops: false,      // bounded async loop allowed for scans
    zeroNetwork: true,
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
      "RepairScheduleTick",
      "PulseHistorySnapshot",
      "PulseHistoryDeadEntries",
      "PulseHistoryMissingFields",
      "PresenceContext"
    ],
    output: [
      "RepairResult",
      "RepairBandSignature",
      "RepairWaveField",
      "RepairAdvantageField",
      "RepairExperienceField",
      "RepairDiagnostics",
      "RepairHealingState"
    ],
    consumers: [
      "PulseProxySpine",
      "PulseHealer",
      "GlobalHealer",
      "PNSRepair",
      "PNSPurifier",
      "PulseWorldCore"
    ]
  },

  experience: {
    description:
      "PulseHistoryRepair is the IMMORTAL++ short-term memory layer of PulseProxy. " +
      "It maintains coherent, lineage-safe working memory by pruning dead entries and repairing " +
      "missing fields, emitting deterministic repair, pressure, and drift-envelope surfaces for " +
      "healers, limbic shadow, and speed governors.",
    aiUsageHint:
      "Use RepairExperienceField and RepairHealingState to understand memory drift, repair pressure, " +
      "short-term nervous-system stability, and when to slow down or accelerate higher-layer activity."
  }
}
*/

// ============================================================================
// FILE: /PULSE-PROXY/pulseHistoryRepair.js
// PULSE HISTORY REPAIR — VERSION 20‑IMMORTALPLUS‑PRESENCE
// “THE SHORT‑TERM MEMORY LAYER+++ / WORKING MEMORY REPAIR ENGINE+++”
// ============================================================================
//
// ROLE (v20-ImmortalPlus):
//   pulseHistoryRepair is the SHORT‑TERM MEMORY LAYER of PulseProxy.
//   It is the WORKING MEMORY REPAIR ENGINE — responsible for keeping
//   recent history coherent, normalized, lineage‑safe, and drift‑safe,
//   while emitting IMMORTAL++ repair/experience/pressure surfaces for
//   healers, limbic shadow, and speed governors.
//
// SAFETY CONTRACT (v20-ImmortalPlus):
//   • Fail‑open: errors logged, never fatal
//   • No randomness in repair logic
//   • No mutation outside intended collections
//   • Always logs repairs + deletions for traceability
//   • No cross‑subsystem writes
//   • Deterministic cleanup + repair order
//   • Bounded scans for multi‑instance safety
//   • No IQ, no routing, no OS imports
//   • Pure symbolic backend organ (no binary mode)
//   • Repair band/wave/advantage/experience surfaces are descriptive‑only
//   • Drift‑envelope + repair‑pressure overlays are meta‑only
// ============================================================================

const admin = global.db;
const db    = global.db;

// ============================================================================
// AI EXPERIENCE META (exported) — v20 IMMORTAL++
// ============================================================================
export const AI_EXPERIENCE_META = Object.freeze({
  identity: "PulseHistoryRepair",
  version: "v20-ImmortalPlus-ShortTermMemoryRepair",
  layer: "short_term_memory",
  role: "working_memory_repair_engine",

  lineage: Object.freeze({
    root: "PulseProxy-v11",
    parent: "PulseHistoryRepair-v16.3-Immortal-Presence",
    organismIntegration: "v20-ImmortalPlus",
    worldIntegration: "PulseWorld-v21-Immortal",
    spinalIntegration: "PulseOSSpinalCord-v20-ImmortalPlus"
  }),

  evo: Object.freeze({
    shortTermMemoryLayer: true,
    workingMemoryRepairEngine: true,
    memoryRepairEngine: true,
    lineageSafe: true,
    boundedScan: true,
    timerSafe: true,
    backendOnly: true,
    symbolicBackend: true,

    bandAware: true,
    waveFieldAware: true,
    presenceAware: true,
    presenceFieldAware: true,
    unifiedAdvantageField: true,
    pulseEfficiencyAware: true,
    experienceAware: true,
    healingAware: true,
    repairPressureAware: true,
    driftEnvelopeAware: true,
    loadEnvelopeAware: true,

    limbicShadowAware: true,
    impulseSpeedAware: true,
    speedGovernorAware: true,
    organismClusterBoost: true,
    worldLensAware: true,

    deterministic: true,
    driftProof: true,
    immortal: true,
    immortalPlus: true,
    multiInstanceReady: true,
    futureEvolutionReady: true,

    prewarmAware: true,
    cacheAware: true,
    chunkAware: true,

    noIQ: true,
    noRouting: true,
    noCompute: true,
    zeroRandomness: true,
    zeroTimers: false,
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
      "RepairScheduleTick",
      "PulseHistorySnapshot",
      "PulseHistoryDeadEntries",
      "PulseHistoryMissingFields",
      "PresenceContext"
    ],
    output: [
      "RepairResult",
      "RepairBandSignature",
      "RepairWaveField",
      "RepairAdvantageField",
      "RepairExperienceField",
      "RepairDiagnostics",
      "RepairHealingState"
    ],
    consumers: [
      "PulseProxySpine",
      "PulseHealer",
      "GlobalHealer",
      "PNSRepair",
      "PNSPurifier",
      "PulseWorldCore"
    ]
  }),

  experience: Object.freeze({
    description:
      "PulseHistoryRepair maintains coherent, lineage-safe short-term memory by pruning dead entries " +
      "and repairing missing fields, exposing deterministic repair, pressure, and drift-envelope " +
      "surfaces for healers, limbic shadow, and speed governors.",
    aiUsageHint:
      "Use RepairExperienceField and RepairHealingState to understand memory drift, repair pressure, " +
      "short-term nervous-system stability, and when to throttle or accelerate higher-layer activity."
  })
});

// ============================================================================
// ORGAN IDENTITY — v20‑IMMORTALPLUS‑PRESENCE
// ============================================================================
export const PulseRole = {
  type: "Organ",
  subsystem: "PulseProxy",
  layer: "ShortTermMemory",
  version: "20-ImmortalPlus-ShortTermMemory",
  identity: "PulseHistoryRepair-v20-ImmortalPlus-ShortTermMemory",

  evo: {
    driftProof: true,
    deterministic: true,

    backendOnly: true,
    symbolicBackend: true,
    noIQ: true,
    noRouting: true,
    noCompute: true,

    multiInstanceReady: true,
    memoryRepairEngine: true,
    lineageSafe: true,
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
    healingAware: true,
    repairPressureAware: true,
    driftEnvelopeAware: true,
    loadEnvelopeAware: true,

    limbicShadowAware: true,
    impulseSpeedAware: true,
    speedGovernorAware: true,
    worldLensAware: true,

    prewarmAware: true,
    cacheAware: true,
    chunkAware: true
  }
};

// ============================================================================
// HUMAN‑READABLE CONTEXT MAP — v20
// ============================================================================
const REPAIR_CONTEXT = {
  label: "PULSE_HISTORY_REPAIR",
  layer: PulseRole.layer,
  role: "Short‑Term Memory Repair",
  purpose: "Pulse History Normalization + Cleanup",
  context: "Repairs missing fields, prunes dead entries, ensures deterministic lineage",
  version: PulseRole.version,
  evo: PulseRole.evo
};

// ============================================================================
// META — v20‑IMMORTALPLUS‑PRESENCE
// ============================================================================
export const PulseHistoryRepairMeta = Object.freeze({
  layer: "PulseHistoryRepair",
  role: "SHORT_TERM_MEMORY_REPAIR_ENGINE",
  version: "v20-ImmortalPlus-ShortTermMemoryRepair",
  identity: "PulseHistoryRepair-v20-ImmortalPlus-ShortTermMemoryRepair",

  guarantees: Object.freeze({
    deterministic: true,
    driftProof: true,
    multiInstanceReady: true,
    backendOnly: true,
    symbolicBackend: true,
    boundedScan: true,
    timerSafe: true,
    idempotentRepair: true,
    failOpenSafe: true,
    unifiedAdvantageField: true,
    pulseEfficiencyAware: true,
    memoryRepairEngine: true,
    lineageSafe: true,
    repairPressureAware: true,
    driftEnvelopeAware: true,
    loadEnvelopeAware: true,

    zeroIQ: true,
    zeroRouting: true,
    zeroCompute: true,
    zeroRandomness: true,
    zeroDateNow: false, // Date.now allowed for cutoff + runId (telemetry), not decision math
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
    presenceAware: true,
    presenceFieldAware: true,
    binaryFieldAware: false,

    worldLensAware: true
  }),

  contract: Object.freeze({
    input: [
      "RepairScheduleTick",
      "PulseHistorySnapshot",
      "PulseHistoryDeadEntries",
      "PulseHistoryMissingFields",
      "PresenceContext"
    ],
    output: [
      "RepairResult",
      "RepairBandSignature",
      "RepairWaveField",
      "RepairAdvantageField",
      "RepairExperienceField",
      "RepairDiagnostics",
      "RepairHealingState"
    ]
  }),

  lineage: Object.freeze({
    root: "PulseProxy-v11",
    parent: "PulseProxy-v20-ImmortalPlus",
    ancestry: [
      "PulseHistoryRepair-v7",
      "PulseHistoryRepair-v8",
      "PulseHistoryRepair-v9",
      "PulseHistoryRepair-v10",
      "PulseHistoryRepair-v11",
      "PulseHistoryRepair-v11-Evo",
      "PulseHistoryRepair-v11-Evo-Prime",
      "PulseHistoryRepair-v12.3-Evo-Presence",
      "PulseHistoryRepair-v16.3-Immortal-Presence"
    ]
  }),

  bands: Object.freeze({
    supported: ["symbolic"],
    default: "symbolic",
    behavior: "short-term-memory-repair"
  }),

  architecture: Object.freeze({
    pattern: "A-B-A",
    baseline: "scheduled tick → bounded repair → symbolic surfaces",
    adaptive: "wave-field + advantage + experience + drift-envelope overlays (no binary mode)",
    return: "deterministic repair surfaces + signatures + healing state"
  })
});

// ============================================================================
// IMMORTAL REPAIR SURFACES — band / wave / advantage / experience / healing
// ============================================================================
const repairHealingState = {
  ...REPAIR_CONTEXT,
  lastRunId: null,
  lastOk: null,
  lastError: null,
  lastRepairedCount: 0,
  lastDeletedCount: 0,
  lastBand: "symbolic",
  lastAdvantageScore: null,
  lastExperienceQuality: null,
  lastRepairPressure: null,
  lastDriftEnvelope: null,
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

function buildRepairWaveField(runId) {
  const key = String(runId || "NO_RUN");
  const len = key.length;
  const amplitude = 6 + (len % 10);
  const wavelength = amplitude + 8;
  const phase = (len * 3) % 32;

  return {
    amplitude,
    wavelength,
    phase,
    band: "repair",
    mode: "symbolic-wave",
    waveSignature: computeHash(`REPAIR_WAVE::${key}::${amplitude}::${wavelength}::${phase}`)
  };
}

function buildRepairAdvantageField({ repairedCount, deletedCount }) {
  const r = Math.max(0, repairedCount || 0);
  const d = Math.max(0, deletedCount || 0);
  const total = r + d;

  const density = total === 0 ? 0 : Math.min(1, r / (total + 1));
  const stress = Math.min(1, total / 5000);
  const efficiency = total === 0 ? 0 : (r + 1) / (total + 1);
  const advantageScore = efficiency * (1 + density) * (1 - 0.25 * stress);

  return {
    repairedCount: r,
    deletedCount: d,
    total,
    density,
    stress,
    efficiency,
    advantageScore,
    advantageSignature: computeHash(
      `REPAIR_ADVANTAGE::${r}::${d}::${density}::${stress}::${efficiency}::${advantageScore}`
    )
  };
}

function buildRepairExperienceField({ runId, ok, repairedCount, deletedCount }) {
  const total = (repairedCount || 0) + (deletedCount || 0);
  let quality = "idle";
  if (!ok) quality = "error";
  else if (total === 0) quality = "no-op";
  else if (total < 100) quality = "light";
  else if (total < 1000) quality = "moderate";
  else quality = "heavy";

  return {
    runId,
    quality,
    repairedCount: repairedCount || 0,
    deletedCount: deletedCount || 0,
    total,
    experienceSignature: computeHash(
      `REPAIR_EXPERIENCE::${runId}::${quality}::${total}`
    )
  };
}

function buildRepairBandSignature(runId) {
  return computeHash(`REPAIR_BAND::symbolic::${runId}`);
}

// v20 IMMORTAL++: derived repair pressure + drift envelope (meta only)
function buildRepairPressure(total) {
  if (!total || total <= 0) {
    return {
      pressureLevel: "idle",
      pressureScore: 0
    };
  }

  let pressureLevel = "light";
  if (total > 100 && total <= 1000) pressureLevel = "moderate";
  else if (total > 1000 && total <= 5000) pressureLevel = "high";
  else if (total > 5000) pressureLevel = "critical";

  const capped = Math.min(total, 10000);
  const pressureScore = capped / 10000;

  return {
    pressureLevel,
    pressureScore,
    pressureSignature: computeHash(
      `REPAIR_PRESSURE::${pressureLevel}::${total}`
    )
  };
}

function buildDriftEnvelope({ repairedCount, deletedCount }) {
  const total = (repairedCount || 0) + (deletedCount || 0);
  const driftMagnitude = Math.min(1, total / 10000);
  let envelope = "stable";

  if (driftMagnitude > 0.75) envelope = "critical";
  else if (driftMagnitude > 0.5) envelope = "high";
  else if (driftMagnitude > 0.25) envelope = "elevated";

  return {
    envelope,
    driftMagnitude,
    driftSignature: computeHash(
      `REPAIR_DRIFT_ENVELOPE::${envelope}::${driftMagnitude}`
    )
  };
}

function updateRepairHealingState({
  runId,
  ok,
  error,
  repairedCount,
  deletedCount,
  advantageField,
  experienceField,
  repairPressure,
  driftEnvelope
}) {
  repairHealingState.lastRunId = runId;
  repairHealingState.lastOk = ok;
  repairHealingState.lastError = error || null;
  repairHealingState.lastRepairedCount = repairedCount || 0;
  repairHealingState.lastDeletedCount = deletedCount || 0;
  repairHealingState.lastBand = "symbolic";
  repairHealingState.lastAdvantageScore =
    typeof advantageField?.advantageScore === "number"
      ? advantageField.advantageScore
      : repairHealingState.lastAdvantageScore;
  repairHealingState.lastExperienceQuality =
    experienceField?.quality || repairHealingState.lastExperienceQuality;
  repairHealingState.lastRepairPressure =
    repairPressure?.pressureLevel || repairHealingState.lastRepairPressure;
  repairHealingState.lastDriftEnvelope =
    driftEnvelope?.envelope || repairHealingState.lastDriftEnvelope;
  repairHealingState.cycleCount += 1;
}

export function getPulseHistoryRepairHealingState() {
  return { ...repairHealingState };
}

// ============================================================================
// BACKEND ENTRY POINT (CALLED BY HEARTBEAT / OSKernel)
// (LOGIC: deterministic, bounded, safe; surfaces: v20 IMMORTAL++)
// ============================================================================
export async function pulseHistoryRepair(presenceContext = null) {
  const runId = `PB_REPAIR_${Date.now()}`;
  const errorPrefix = `ERR_${runId}_`;

  log(
    `%c🧠 START SHORT‑TERM MEMORY REPAIR → ${runId}`,
    "color:#03A9F4; font-weight:bold;"
  );

  const repairedDocs = [];
  const deletedDocs = [];

  try {
    const cutoff30d = Date.now() - 30 * 24 * 60 * 60 * 1000;
    let lastDoc = null;

    while (true) {
      let query = db
        .collection("pulse_history")
        .orderBy("createdAt", "asc")
        .limit(500);

      if (lastDoc) query = query.startAfter(lastDoc);

      const histSnap = await query.get();
      if (histSnap.empty) break;

      for (const h of histSnap.docs) {
        const id = h.id;

        try {
          const data = h.data() || {};
          const createdAt = data.createdAt?.toMillis?.() || 0;

          if (createdAt && createdAt < cutoff30d && data.status === "dead") {
            await h.ref.delete();
            deletedDocs.push(id);
            log(`%c🟨 PRUNED (expired memory) → ${id}`, "color:#FFC107; font-weight:bold;");
            continue;
          }

          const updates = {};

          if (!data.userId && data.uid) updates.userId = data.uid;
          if (!data.status) updates.status = "unknown";
          if (!data.source) updates.source = "legacy";

          if (!data.lineage || typeof data.lineage !== "object") {
            updates.lineage = {
              version: PulseRole.version,
              repairedBy: "pulseHistoryRepair",
              repairRunId: runId
            };
          }

          if (!data.timestamp) {
            updates.timestamp = admin.firestore.FieldValue.serverTimestamp();
          }

          if (!data.drift) {
            updates.drift = { repaired: true, version: "20-ImmortalPlus" };
          }

          if (Object.keys(updates).length > 0) {
            updates.repairedAt = admin.firestore.FieldValue.serverTimestamp();
            updates.repairRunId = runId;

            await h.ref.set(updates, { merge: true });
            repairedDocs.push(id);

            log(`%c🟩 REPAIRED MEMORY → ${id}`, "color:#4CAF50; font-weight:bold;");
          }

        } catch (err) {
          error(`%c🟥 MEMORY ERROR (doc) → ${id}`, "color:#FF5252; font-weight:bold;", err);

          await db.collection("FUNCTION_ERRORS").doc(`${errorPrefix}${id}`).set({
            fn: "pulseHistoryRepair",
            stage: "history_doc",
            docId: id,
            error: String(err),
            runId,
            presenceContext: presenceContext || null,
            ...REPAIR_CONTEXT,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
          });
        }
      }

      lastDoc = histSnap.docs[histSnap.docs.length - 1];
      if (histSnap.size < 500) break;
    }

    const repairedCount = repairedDocs.length;
    const deletedCount = deletedDocs.length;

    const waveField = buildRepairWaveField(runId);
    const advantageField = buildRepairAdvantageField({ repairedCount, deletedCount });
    const experienceField = buildRepairExperienceField({
      runId,
      ok: true,
      repairedCount,
      deletedCount
    });
    const bandSignature = buildRepairBandSignature(runId);
    const repairPressure = buildRepairPressure(repairedCount + deletedCount);
    const driftEnvelope = buildDriftEnvelope({ repairedCount, deletedCount });

    updateRepairHealingState({
      runId,
      ok: true,
      error: null,
      repairedCount,
      deletedCount,
      advantageField,
      experienceField,
      repairPressure,
      driftEnvelope
    });

    await db.collection("TIMER_LOGS").doc(runId).set({
      fn: "pulseHistoryRepair",
      runId,
      repairedCount,
      deletedCount,
      repairedDocs,
      deletedDocs,
      bandSignature,
      waveField,
      advantageField,
      experienceField,
      repairPressure,
      driftEnvelope,
      presenceContext: presenceContext || null,
      ...REPAIR_CONTEXT,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    log(`%c🟩 SHORT‑TERM MEMORY REPAIR COMPLETE → ${runId}`, "color:#4CAF50; font-weight:bold;");

    return {
      ok: true,
      runId,
      repairedDocs,
      deletedDocs,
      bandSignature,
      waveField,
      advantageField,
      experienceField,
      repairPressure,
      driftEnvelope,
      healingState: getPulseHistoryRepairHealingState(),
      presenceContext: presenceContext || null,
      ...REPAIR_CONTEXT
    };

  } catch (err) {
    error(`%c🟥 FATAL SHORT‑TERM MEMORY ERROR`, "color:#FF5252; font-weight:bold;", err);

    const waveField = buildRepairWaveField(runId);
    const advantageField = buildRepairAdvantageField({
      repairedCount: repairedDocs.length,
      deletedCount: deletedDocs.length
    });
    const experienceField = buildRepairExperienceField({
      runId,
      ok: false,
      repairedCount: repairedDocs.length,
      deletedCount: deletedDocs.length
    });
    const bandSignature = buildRepairBandSignature(runId);
    const repairPressure = buildRepairPressure(repairedDocs.length + deletedDocs.length);
    const driftEnvelope = buildDriftEnvelope({
      repairedCount: repairedDocs.length,
      deletedCount: deletedDocs.length
    });

    updateRepairHealingState({
      runId,
      ok: false,
      error: String(err),
      repairedCount: repairedDocs.length,
      deletedCount: deletedDocs.length,
      advantageField,
      experienceField,
      repairPressure,
      driftEnvelope
    });

    await db.collection("FUNCTION_ERRORS").doc(`${errorPrefix}FATAL`).set({
      fn: "pulseHistoryRepair",
      stage: "fatal",
      error: String(err),
      runId,
      bandSignature,
      waveField,
      advantageField,
      experienceField,
      repairPressure,
      driftEnvelope,
      presenceContext: presenceContext || null,
      ...REPAIR_CONTEXT,
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
      repairPressure,
      driftEnvelope,
      healingState: getPulseHistoryRepairHealingState(),
      presenceContext: presenceContext || null,
      ...REPAIR_CONTEXT
    };
  }
}
