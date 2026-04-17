// ============================================================================
// FILE: /apps/netlify/functions/pulseHistoryRepair.js
// LAYER: D‑LAYER (BACKEND FUNCTION)
//
// PURPOSE:
// • Direct backend function for pulseHistoryRepair.
// • Name matches file, matches function, matches logs.
// • No scheduling wrapper — heartbeat calls this.
// ============================================================================

import * as admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

if (!admin.apps.length) {
  admin.initializeApp();
}
const db = getFirestore();

// ============================================================================
// BACKEND ENTRY POINT (CALLED BY HEARTBEAT)
// ============================================================================
export async function pulseHistoryRepair() {
  const runId = `PB_REPAIR_${Date.now()}`;
  const errorPrefix = `ERR_${runId}_`;

  const repairedDocs = [];
  const deletedDocs = [];

  try {
    const cutoff30d = Date.now() - 30 * 24 * 60 * 60 * 1000;

    // ---------------------------------------------------------
    // ⭐ REPAIR: pulse_history (normalize + prune)
    // ---------------------------------------------------------
    const histSnap = await db.collection("pulse_history").get();

    for (const h of histSnap.docs) {
      const id = h.id;

      try {
        const data = h.data() || {};
        const createdAt = data.createdAt?.toMillis?.() || 0;

        // delete very old, obviously dead records
        if (createdAt && createdAt < cutoff30d && data.status === "dead") {
          await h.ref.delete();
          deletedDocs.push(id);
          continue;
        }

        const updates = {};

        // normalize missing fields
        if (!data.userId && data.uid) {
          updates.userId = data.uid;
        }

        if (!data.status) {
          updates.status = "unknown";
        }

        if (!data.source) {
          updates.source = "legacy";
        }

        if (Object.keys(updates).length > 0) {
          updates.repairedAt = admin.firestore.FieldValue.serverTimestamp();
          updates.repairRunId = runId;
          await h.ref.set(updates, { merge: true });
          repairedDocs.push(id);
        }

      } catch (err) {
        await db.collection("FUNCTION_ERRORS").doc(`${errorPrefix}${id}`).set({
          fn: "pulseHistoryRepair",
          stage: "history_doc",
          docId: id,
          error: String(err),
          runId,
          createdAt: admin.firestore.FieldValue.serverTimestamp()
        });
      }
    }

    // ---------------------------------------------------------
    // ⭐ TIMER LOG
    // ---------------------------------------------------------
    await db.collection("TIMER_LOGS").doc(runId).set({
      fn: "pulseHistoryRepair",
      runId,
      repairedCount: repairedDocs.length,
      deletedCount: deletedDocs.length,
      repairedDocs,
      deletedDocs,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    return {
      ok: true,
      runId,
      repairedDocs,
      deletedDocs
    };

  } catch (err) {
    await db.collection("FUNCTION_ERRORS").doc(`${errorPrefix}FATAL`).set({
      fn: "pulseHistoryRepair",
      stage: "fatal",
      error: String(err),
      runId,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    return { ok: false, runId, error: String(err) };
  }
}
