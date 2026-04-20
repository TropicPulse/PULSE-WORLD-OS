// ======================================================
//  PULSE OS v7.3 — THE THYMUS
//  Immune Command Organ • Integrity Sentinel • Root Healing Authority
// ======================================================

export const FUNCTION_LOGS_COLLECTION = "FUNCTION_LOGS";
export const OS_HEALTH_COLLECTION = "OSHealth";
export const OS_EVENTS_COLLECTION = "OSEvents";

export const OS_HEARTBEAT_INTERVAL_MS = 30_000;
export const FUNCTION_LOG_SCAN_INTERVAL_MS = 60_000;

// ⭐ Version + Generation + Organ Identity (v7.x aligned)
export const PULSE_OS_ID = "PulseOS-v7.3";
export const PULSE_OS_ROLE = "immune_command_organ";
export const PULSE_OS_GENERATION = "v7";
export const PULSE_OS_ORGAN = "Thymus";

import { getFirestore, Timestamp } from "firebase-admin/firestore";
import {
  saveSnapshot,
  recordDriftSignature,
  createRestorePoint
} from "./PulseOSMemory.js";

const db = getFirestore();

// ⭐ Thymus identity block (aligned with v7.x organism)
const THYMUS_CONTEXT = {
  osId: PULSE_OS_ID,
  role: PULSE_OS_ROLE,
  organ: PULSE_OS_ORGAN,
  generation: PULSE_OS_GENERATION,
  version: "7.3",
  evo: {
    dualMode: true,
    localAware: true,
    internetAware: true,
    advantageCascadeAware: true,
    pulseEfficiencyAware: true,
    driftProof: true,
    multiInstanceReady: true,
    unifiedAdvantageField: true,
    futureEvolutionReady: true
  }
};

log("thymus", "PulseOS v7.3 immune kernel online.");
log("thymus", "Heartbeat interval", OS_HEARTBEAT_INTERVAL_MS, "ms");
log("thymus", "FUNCTION_LOG scan interval", FUNCTION_LOG_SCAN_INTERVAL_MS, "ms");

// ======================================================
//  writeOSEvent() — Immune Signal Emitter
// ======================================================
async function writeOSEvent(entry) {
  try {
    log(
      "thymus",
      `ImmuneSignal | type=${entry.type} | hintCode=${entry.hintCode ?? "UNSPECIFIED_HINT"}`,
      entry
    );

    await db.collection(OS_EVENTS_COLLECTION).add({
      ...THYMUS_CONTEXT,
      ts: Date.now(),
      hintCode: entry.hintCode ?? "UNSPECIFIED_HINT",
      ...entry
    });
  } catch (err) {
    error("thymus", "Failed to emit immune signal", err);
  }
}

// ======================================================
//  updateOSHealth() — Vital Signs + Immune Snapshot
// ======================================================
async function updateOSHealth(extra = {}) {
  try {
    const now = Timestamp.now();

    log("thymus", "Heartbeat emitted.");

    await db.collection(OS_HEALTH_COLLECTION).doc(PULSE_OS_ID).set(
      {
        ...THYMUS_CONTEXT,
        heartbeatAt: now,
        ...extra
      },
      { merge: true }
    );

    await saveSnapshot("OS", {
      heartbeatAt: now.toMillis(),
      role: PULSE_OS_ROLE,
      generation: PULSE_OS_GENERATION,
      organ: PULSE_OS_ORGAN,
      ...extra
    });

  } catch (err) {
    error("thymus", "Failed to update vital signs", err);
  }
}

// ======================================================
//  processFunctionLogs() — Immune Training + Drift Detection
// ======================================================
async function processFunctionLogs() {
  log("thymus", "Scanning FUNCTION_LOGS…");

  const snap = await db
    .collection(FUNCTION_LOGS_COLLECTION)
    .where("processed", "==", false)
    .limit(100)
    .get();

  if (snap.empty) {
    log("thymus", "No new immune stimuli.");
    return;
  }

  log("thymus", `Ingesting ${snap.size} FUNCTION_LOGS…`);

  const batch = db.batch();

  for (const doc of snap.docs) {
    const entry = doc.data();

    log(
      "thymus",
      `Ingest | id=${doc.id} | subsystem=${entry.subsystem ?? "unknown"} | severity=${entry.severity ?? "info"}`,
      entry
    );

    await writeOSEvent({
      type: "function_log_ingested",
      hintCode: entry.hintCode ?? "FUNCTION_LOG_INGESTED",
      functionLogId: doc.id,
      subsystem: entry.subsystem ?? null,
      fileName: entry.fileName ?? null,
      functionName: entry.functionName ?? null,
      fieldName: entry.fieldName ?? null,
      note: entry.note ?? null,
      severity: entry.severity ?? "info"
    });

    if (entry.subsystem) {
      await saveSnapshot(entry.subsystem, {
        fileName: entry.fileName,
        functionName: entry.functionName,
        fieldName: entry.fieldName,
        note: entry.note,
        severity: entry.severity
      });
    }

    if (entry.severity === "error" || entry.severity === "critical") {
      log(
        "thymus",
        `Drift signature recorded | subsystem=${entry.subsystem ?? "unknown"}`,
        entry
      );

      await recordDriftSignature(entry.subsystem ?? "unknown", {
        type: "function_error",
        severity: entry.severity,
        details: {
          fileName: entry.fileName,
          functionName: entry.functionName,
          fieldName: entry.fieldName,
          note: entry.note
        },
        version: "7.3",
        generation: "v7"
      });
    }

    batch.update(doc.ref, {
      processed: true,
      processedAt: Timestamp.now()
    });
  }

  await batch.commit();

  log("thymus", "FUNCTION_LOG ingestion complete.");

  if (snap.size >= 50) {
    warn("thymus", "Large immune stimulus — creating restore point.");
    await createRestorePoint("auto_after_large_ingest", ["OS"]);
  }
}

// ======================================================
//  PUBLIC: startPulseOS() — Activate Immune Organ
// ======================================================
export default function startPulseOS() {
  log("thymus", "Starting immune supervisor loops…");

  setInterval(() => {
    updateOSHealth().catch((err) => {
      error("thymus", "Heartbeat loop error", err);
    });
  }, OS_HEARTBEAT_INTERVAL_MS);

  setInterval(() => {
    processFunctionLogs().catch((err) => {
      error("thymus", "FUNCTION_LOGS loop error", err);
    });
  }, FUNCTION_LOG_SCAN_INTERVAL_MS);

  log("thymus", "v7.3 immune kernel active.");
}

export { updateOSHealth, processFunctionLogs, writeOSEvent };
