// ============================================================================
// FILE: pulse-os/PulseOSMemory.js
// LAYER: C‑LAYER (OS MEMORY + RESTORE ENGINE)
//
// PulseOSMemory v6.2 — Deterministic OS Memory + Restore Points
// NO AI. NO COMPUTE. NO MARKETPLACE. PURE STATE CAPTURE.
// ============================================================================

// ------------------------------------------------------------
// ⭐ OS‑v5 CONTEXT METADATA
// ------------------------------------------------------------
const MEMORY_CONTEXT = {
  layer: "PulseOSMemory",
  role: "OS_MEMORY",
  purpose: "Store OS + subsystem snapshots, drift signatures, restore points",
  context: "Deterministic OS memory + restore engine",
  version: 6,
  target: "os-core",
  selfRepairable: true
};

// ------------------------------------------------------------
// Collections
// ------------------------------------------------------------
export const OS_SNAPSHOTS_COLLECTION = "OSSnapshots";
export const OS_RESTORE_POINTS_COLLECTION = "OSRestorePoints";
export const DRIFT_SIGNATURES_COLLECTION = "DriftSignatures";

// Snapshot retention
export const MAX_SNAPSHOTS_PER_SUBSYSTEM = 50;
export const MAX_RESTORE_POINTS = 20;

import { getFirestore, Timestamp } from "firebase-admin/firestore";
const db = getFirestore();

/* ------------------------------------------------------------
   1. SNAPSHOTS
   ------------------------------------------------------------ */

/**
 * saveSnapshot(subsystem, payload)
 */
export async function saveSnapshot(subsystem, payload) {
  const now = Date.now();

  try {
    const ref = await db.collection(OS_SNAPSHOTS_COLLECTION).add({
      subsystem,
      payload,
      ts: now,
      createdAt: Timestamp.fromMillis(now),
      ...MEMORY_CONTEXT
    });

    console.log(
      `%c🟦 OS_MEMORY SNAPSHOT SAVED → ${subsystem}`,
      "color:#03A9F4; font-weight:bold;"
    );

    // Trim old snapshots
    const snap = await db
      .collection(OS_SNAPSHOTS_COLLECTION)
      .where("subsystem", "==", subsystem)
      .orderBy("ts", "desc")
      .offset(MAX_SNAPSHOTS_PER_SUBSYSTEM)
      .get();

    const batch = db.batch();
    snap.forEach((doc) => batch.delete(doc.ref));
    if (!snap.empty) await batch.commit();

    return ref.id;

  } catch (err) {
    console.error(
      `%c🟥 OS_MEMORY SNAPSHOT ERROR`,
      "color:#FF5252; font-weight:bold;",
      err
    );
    throw err;
  }
}

/**
 * getLatestSnapshot(subsystem)
 */
export async function getLatestSnapshot(subsystem) {
  const snap = await db
    .collection(OS_SNAPSHOTS_COLLECTION)
    .where("subsystem", "==", subsystem)
    .orderBy("ts", "desc")
    .limit(1)
    .get();

  if (snap.empty) return null;
  const doc = snap.docs[0];
  return { id: doc.id, ...doc.data() };
}

/* ------------------------------------------------------------
   2. DRIFT SIGNATURES
   ------------------------------------------------------------ */

/**
 * recordDriftSignature(subsystem, signature)
 */
export async function recordDriftSignature(subsystem, signature) {
  const now = Date.now();

  try {
    await db.collection(DRIFT_SIGNATURES_COLLECTION).add({
      subsystem,
      type: signature.type ?? "unknown",
      severity: signature.severity ?? "info",
      details: signature.details ?? null,
      relatedSnapshotId: signature.relatedSnapshotId ?? null,
      ts: now,
      createdAt: Timestamp.fromMillis(now),
      ...MEMORY_CONTEXT
    });

    console.log(
      `%c🟨 OS_MEMORY DRIFT SIGNATURE → ${subsystem} / ${signature.type}`,
      "color:#FFC107; font-weight:bold;"
    );

  } catch (err) {
    console.error(
      `%c🟥 OS_MEMORY DRIFT ERROR`,
      "color:#FF5252; font-weight:bold;",
      err
    );
  }
}

/**
 * getRecentDriftSignatures(subsystem, limit = 20)
 */
export async function getRecentDriftSignatures(subsystem, limit = 20) {
  const snap = await db
    .collection(DRIFT_SIGNATURES_COLLECTION)
    .where("subsystem", "==", subsystem)
    .orderBy("ts", "desc")
    .limit(limit)
    .get();

  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

/* ------------------------------------------------------------
   3. RESTORE POINTS
   ------------------------------------------------------------ */

/**
 * createRestorePoint(label, subsystems)
 */
export async function createRestorePoint(label, subsystems = []) {
  const now = Date.now();
  const payload = {};

  try {
    for (const subsystem of subsystems) {
      const snap = await getLatestSnapshot(subsystem);
      if (snap) {
        payload[subsystem] = {
          snapshotId: snap.id,
          payload: snap.payload,
          ts: snap.ts
        };
      }
    }

    const ref = await db.collection(OS_RESTORE_POINTS_COLLECTION).add({
      label,
      subsystems,
      payload,
      ts: now,
      createdAt: Timestamp.fromMillis(now),
      ...MEMORY_CONTEXT
    });

    console.log(
      `%c🟩 OS_MEMORY RESTORE POINT CREATED → ${label}`,
      "color:#4CAF50; font-weight:bold;"
    );

    // Trim old restore points
    const snap = await db
      .collection(OS_RESTORE_POINTS_COLLECTION)
      .orderBy("ts", "desc")
      .offset(MAX_RESTORE_POINTS)
      .get();

    const batch = db.batch();
    snap.forEach((doc) => batch.delete(doc.ref));
    if (!snap.empty) await batch.commit();

    return ref.id;

  } catch (err) {
    console.error(
      `%c🟥 OS_MEMORY RESTORE POINT ERROR`,
      "color:#FF5252; font-weight:bold;",
      err
    );
    throw err;
  }
}

/**
 * getRestorePoint(id)
 */
export async function getRestorePoint(id) {
  const doc = await db.collection(OS_RESTORE_POINTS_COLLECTION).doc(id).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() };
}

/**
 * listRestorePoints(limit = 20)
 */
export async function listRestorePoints(limit = 20) {
  const snap = await db
    .collection(OS_RESTORE_POINTS_COLLECTION)
    .orderBy("ts", "desc")
    .limit(limit)
    .get();

  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

/* ------------------------------------------------------------
   4. RESTORE INTENT (READ-ONLY)
// ------------------------------------------------------------ */

/**
 * getRestorePlan(restorePointId)
 */
export async function getRestorePlan(restorePointId) {
  const rp = await getRestorePoint(restorePointId);
  if (!rp) return null;

  const plan = {
    restorePointId: rp.id,
    label: rp.label,
    subsystems: [],
    createdAt: rp.createdAt,
    ts: rp.ts,
    ...MEMORY_CONTEXT
  };

  for (const subsystem of rp.subsystems || []) {
    const entry = rp.payload?.[subsystem];
    if (!entry) continue;

    plan.subsystems.push({
      subsystem,
      snapshotId: entry.snapshotId,
      snapshotTs: entry.ts,
      payloadPreview: entry.payload ? Object.keys(entry.payload) : [],
      ...MEMORY_CONTEXT
    });
  }

  return plan;
}
