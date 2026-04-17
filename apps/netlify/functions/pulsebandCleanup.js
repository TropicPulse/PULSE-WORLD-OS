// ============================================================================
// FILE: /apps/netlify/functions/pulsebandCleanup.js
// LAYER: D‑LAYER (BACKEND FUNCTION)
//
// PURPOSE:
// • Direct backend function for pulsebandCleanup.
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
export async function pulsebandCleanup() {
  const runId = `PB_CLEANUP_${Date.now()}`;
  const errorPrefix = `ERR_${runId}_`;

  try {
    // ---------------------------------------------------------
    // ⭐ CLEANUP: pulseband_sessions older than 24h
    // ---------------------------------------------------------
    const cutoff24h = Date.now() - 24 * 60 * 60 * 1000;
    const sessionsSnap = await db.collection("pulseband_sessions").get();

    for (const s of sessionsSnap.docs) {
      const data = s.data() || {};
      const createdAt = data.createdAt?.toMillis?.() || 0;

      if (createdAt < cutoff24h) {
        const chunksSnap = await s.ref.collection("chunks").get();
        for (const c of chunksSnap.docs) {
          await c.ref.delete();
        }
        await s.ref.delete();
      }
    }

    // ---------------------------------------------------------
    // ⭐ CLEANUP: pulseband_errors older than 7 days
    // ---------------------------------------------------------
    const cutoff7d = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const errorsSnap = await db.collection("pulseband_errors").get();

    for (const e of errorsSnap.docs) {
      const createdAt = e.data()?.createdAt?.toMillis?.() || 0;
      if (createdAt < cutoff7d) {
        await e.ref.delete();
      }
    }

    // ---------------------------------------------------------
    // ⭐ CLEANUP: pulseband_redownloads older than 7 days
    // ---------------------------------------------------------
    const redlSnap = await db.collection("pulseband_redownloads").get();

    for (const r of redlSnap.docs) {
      const createdAt = r.data()?.createdAt?.toMillis?.() || 0;
      if (createdAt < cutoff7d) {
        await r.ref.delete();
      }
    }

    // ---------------------------------------------------------
    // ⭐ TIMER LOG
    // ---------------------------------------------------------
    await db.collection("TIMER_LOGS").doc(runId).set({
      fn: "pulsebandCleanup",
      runId,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    return { ok: true, runId };

  } catch (err) {
    await db.collection("FUNCTION_ERRORS").doc(`${errorPrefix}FATAL`).set({
      fn: "pulsebandCleanup",
      stage: "fatal",
      error: String(err),
      runId,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    return { ok: false, runId, error: String(err) };
  }
}
