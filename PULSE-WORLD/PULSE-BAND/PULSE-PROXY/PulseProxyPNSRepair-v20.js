/* global log,warn,error */
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
import {
  OrganismIdentity,
  buildPulseOrganismMap as PulseOrganismMap,
  buildPulseOrganismMap as buildOrganismMap
} from "./PULSE-WORLD-MAP.js";
const Identity = OrganismIdentity(import.meta.url);

// 2 — EXPORT GENOME METADATA
// export const PulseMeshMeta = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
export const REPAIR_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;
const admin = global.db;
const db    = global.db;


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
