// ============================================================================
// FILE: /apps/netlify/functions/pulseHistoryRepair.js
// LAYER: D‑LAYER (BACKEND FUNCTION)
//
// PURPOSE:
// • Normalize + repair pulse_history entries.
// • Prune dead records older than 30 days.
// • Ensure deterministic lineage for scoring + history.
// • Called directly by heartbeat (timer.js).
// ============================================================================

import * as admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

if (!admin.apps.length) {
  admin.initializeApp();
}
const db = getFirestore();

// ------------------------------------------------------------
// ⭐ HUMAN‑READABLE CONTEXT MAP
// ------------------------------------------------------------
const REPAIR_CONTEXT = {
  label: "PULSE_HISTORY_REPAIR",
  layer: "D‑Layer",
  purpose: "Pulse History Normalization + Cleanup",
  context: "Repairs missing fields, prunes dead entries, ensures deterministic lineage"
};

// ============================================================================
// BACKEND ENTRY POINT (CALLED BY HEARTBEAT)
// ============================================================================
export async function pulseHistoryRepair() {
  const runId = `PB_REPAIR_${Date.now()}`;
  const errorPrefix = `ERR_${runId}_`;

  console.log(
    `%c🟦 START ${REPAIR_CONTEXT.label} → ${runId}`,
    "color:#03A9F4; font-weight:bold;"
  );

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

        // ---------------------------------------------------------
        // ⭐ DELETE: very old + dead
        // ---------------------------------------------------------
        if (createdAt && createdAt < cutoff30d && data.status === "dead") {
          await h.ref.delete();
          deletedDocs.push(id);

          console.log(
            `%c🟨 DELETED → ${id}`,
            "color:#FFC107; font-weight:bold;"
          );

          continue;
        }

        const updates = {};

        // ---------------------------------------------------------
        // ⭐ NORMALIZE MISSING FIELDS
        // ---------------------------------------------------------
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

          console.log(
            `%c🟩 REPAIRED → ${id}`,
            "color:#4CAF50; font-weight:bold;"
          );
        }

      } catch (err) {
        console.error(
          `%c🟥 ERROR (doc) → ${id}`,
          "color:#FF5252; font-weight:bold;",
          err
        );

        await db.collection("FUNCTION_ERRORS").doc(`${errorPrefix}${id}`).set({
          fn: "pulseHistoryRepair",
          stage: "history_doc",
          docId: id,
          error: String(err),
          runId,
          ...REPAIR_CONTEXT,
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
      ...REPAIR_CONTEXT,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    console.log(
      `%c🟩 COMPLETE ${REPAIR_CONTEXT.label} → ${runId}`,
      "color:#4CAF50; font-weight:bold;"
    );

    return {
      ok: true,
      runId,
      repairedDocs,
      deletedDocs,
      ...REPAIR_CONTEXT
    };

  } catch (err) {
    console.error(
      `%c🟥 FATAL ERROR`,
      "color:#FF5252; font-weight:bold;",
      err
    );

    await db.collection("FUNCTION_ERRORS").doc(`${errorPrefix}FATAL`).set({
      fn: "pulseHistoryRepair",
      stage: "fatal",
      error: String(err),
      runId,
      ...REPAIR_CONTEXT,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    return { ok: false, runId, error: String(err), ...REPAIR_CONTEXT };
  }
}
