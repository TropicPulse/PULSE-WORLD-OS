// ============================================================================
// FILE: /apps/netlify/functions/scheduledUserScoring.js
// LAYER: D‑LAYER (BACKEND FUNCTION)
//
// PURPOSE:
// • Direct backend function for scheduledUserScoring.
// • Name matches file, matches function, matches logs.
// • Contains the ENTIRE scoring engine.
// • No external imports except Firebase.
// ============================================================================

import * as admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

if (!admin.apps.length) {
  admin.initializeApp();
}
const db = getFirestore();

// ============================================================================
// BACKEND ENTRY POINT — THIS *IS* THE SCORING ENGINE
// ============================================================================
export async function scheduledUserScoring() {
  const runId = `SCORE_${Date.now()}`;
  const errorPrefix = `ERR_${runId}_`;

  try {
    // ---------------------------------------------------------
    // ⭐ LOAD ALL USER METRICS
    // ---------------------------------------------------------
    const metricsSnap = await db.collection("UserMetrics").get();
    const results = {};

    for (const doc of metricsSnap.docs) {
      const uid = doc.id;
      const m = doc.data() || {};

      try {
        // ---------------------------------------------------------
        // ⭐ COMPUTE SCORES (YOUR ORIGINAL ENGINE LOGIC)
        // ---------------------------------------------------------
        const trustScore =
          (m.loginSuccesses || 0) * 2 -
          (m.loginFailures || 0) * 3 +
          (m.identityChecks || 0) * 1;

        const meshScore =
          (m.deliveryCount || 0) * 5 +
          (m.fastDeliveries || 0) * 10 -
          (m.lateDeliveries || 0) * 8;

        const phase =
          trustScore > 50 && meshScore > 100 ? "alpha" :
          trustScore > 20 && meshScore > 50 ? "beta" :
          "gamma";

        const hubFlag = meshScore > 200;

        const instances = hubFlag ? 3 : phase === "alpha" ? 2 : 1;

        // ---------------------------------------------------------
        // ⭐ WRITE TO UserScores
        // ---------------------------------------------------------
        await db.collection("UserScores").doc(uid).set(
          {
            trustScore,
            meshScore,
            phase,
            hubFlag,
            instances,
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
            runId
          },
          { merge: true }
        );

        results[uid] = { trustScore, meshScore, phase, hubFlag, instances };

      } catch (err) {
        await db.collection("FUNCTION_ERRORS").doc(`${errorPrefix}${uid}`).set({
          fn: "scheduledUserScoring",
          stage: "user_scoring",
          uid,
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
      fn: "scheduledUserScoring",
      runId,
      results,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    return { ok: true, runId, results };

  } catch (err) {
    await db.collection("FUNCTION_ERRORS").doc(`${errorPrefix}FATAL`).set({
      fn: "scheduledUserScoring",
      stage: "fatal",
      error: String(err),
      runId,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    return { ok: false, runId, error: String(err) };
  }
}
