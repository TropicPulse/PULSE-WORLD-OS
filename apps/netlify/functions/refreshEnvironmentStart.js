// ============================================================================
// FILE: /apps/netlify/functions/refreshEnvironmentSmart.js
// LAYER: D‑LAYER (BACKEND FUNCTION)
//
// PURPOSE:
// • Direct Netlify backend function for refreshEnvironmentSmart.
// • Single file, name matches function, logs use fn: "refreshEnvironmentSmart".
// • Ported from the original onSchedule version (no scheduling wrapper here).
// ============================================================================

import * as admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

if (!admin.apps.length) {
  admin.initializeApp();
}
const db = getFirestore();

// If Netlify calls `handler`, we just run the logic once.
export const handler = async () => {
  const result = await refreshEnvironmentSmart();
  return {
    statusCode: 200,
    body: JSON.stringify(result)
  };
};

// Core logic, same as original onSchedule body, just wrapped in a function.
export async function refreshEnvironmentSmart() {
  const runId = Date.now();
  const logId = `ENV_${runId}`;
  const errorPrefix = `ERR_${runId}_`;

  const envRef = db.collection("environment");
  const nowTs = admin.firestore.Timestamp.now();
  const nowMs = nowTs.toMillis();

  const refreshed = [];
  const skipped = [];
  const failed = [];

  // ---------------------------------------------------------
  // SAFE WRAPPER
  // ---------------------------------------------------------
  async function safeMaybeUpdate(docName, intervalMs, fn) {
    try {
      await maybeUpdate(docName, intervalMs, fn);
    } catch (err) {
      failed.push(docName);

      await db.collection("FUNCTION_ERRORS")
        .doc(`${errorPrefix}${docName}_outer`)
        .set({
          fn: "refreshEnvironmentSmart",
          stage: "maybeUpdate_outer",
          docName,
          error: String(err),
          runId,
          createdAt: admin.firestore.FieldValue.serverTimestamp()
        });

      try {
        await envRef.doc(docName).set(
          {
            updatedAt: nowTs,
            success: false,
            raw: { error: "Outer failure: " + err.message },
            runId
          },
          { merge: true }
        );
      } catch (_) {}
    }
  }

  // ---------------------------------------------------------
  // CORE maybeUpdate
  // ---------------------------------------------------------
  async function maybeUpdate(docName, intervalMs, fn) {
    const snap = await envRef.doc(docName).get();
    const data = snap.data() || {};

    let last = 0;
    const rawUpdated = data.updatedAt;

    if (typeof rawUpdated === "number") last = rawUpdated;
    else if (rawUpdated?.toMillis) last = rawUpdated.toMillis();

    const force =
      !data.success ||
      data.raw?.error ||
      !rawUpdated ||
      last > nowMs ||
      Object.keys(data.raw || {}).length === 0;

    if (!force && nowMs - last < intervalMs) {
      skipped.push(docName);
      return;
    }

    try {
      // ⭐ CALL INTERNAL BACKEND FUNCTION DIRECTLY
      await fn(); // fetchWeather(), fetchWaves(), etc.

      // Helper already wrote to Firestore + history
      refreshed.push(docName);

    } catch (err) {
      failed.push(docName);

      await db.collection("FUNCTION_ERRORS")
        .doc(`${errorPrefix}${docName}`)
        .set({
          fn: "refreshEnvironmentSmart",
          stage: "update_error",
          docName,
          error: String(err),
          runId,
          createdAt: admin.firestore.FieldValue.serverTimestamp()
        });

      await envRef.doc(docName).set(
        {
          updatedAt: nowTs,
          success: false,
          raw: { error: err.message },
          runId
        },
        { merge: true }
      );
    }
  }

  // ---------------------------------------------------------
  // CALL ALL HELPERS DIRECTLY (NO HTTP ANYWHERE)
  // ---------------------------------------------------------
  // These must already exist in this file's scope (import them above if needed)
  await safeMaybeUpdate("weather",       30 * 60 * 1000, fetchWeather);
  await safeMaybeUpdate("heatIndex",     30 * 60 * 1000, fetchHeatIndex);
  await safeMaybeUpdate("waves",          2 * 60 * 60 * 1000, fetchWaves);
  await safeMaybeUpdate("sargassum",      6 * 60 * 60 * 1000, fetchSargassum);
  await safeMaybeUpdate("moon",          24 * 60 * 60 * 1000, fetchMoonPhase);
  await safeMaybeUpdate("wildlife",      24 * 60 * 60 * 1000, fetchWildlife);
  await safeMaybeUpdate("storms",         1 * 60 * 60 * 1000, fetchStorms);
  await safeMaybeUpdate("powerUpdates",   5 * 60 * 1000, updateSanPedroPower);
  await safeMaybeUpdate("power",         15 * 60 * 1000, fetchPowerOutages);

  // ---------------------------------------------------------
  // TIMER LOG
  // ---------------------------------------------------------
  try {
    await db.collection("TIMER_LOGS").doc(logId).set({
      fn: "refreshEnvironmentSmart",
      runId,
      refreshed,
      skipped,
      failed,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
  } catch (err) {
    await db.collection("FUNCTION_ERRORS").doc(`${errorPrefix}timerlog`).set({
      fn: "refreshEnvironmentSmart",
      stage: "timer_log",
      error: String(err),
      runId,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
  }

  return {
    ok: true,
    runId,
    refreshed,
    skipped,
    failed
  };
}
