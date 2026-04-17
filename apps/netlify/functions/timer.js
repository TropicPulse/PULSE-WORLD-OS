// ============================================================================
// FILE: /apps/netlify/functions/timer.js
// LAYER: D‑LAYER (PULSE OS HEARTBEAT / SCHEDULED EXECUTOR)
//
// PURPOSE:
// • Single scheduled backend heartbeat.
// • Runs ALL periodic tasks with internal scheduling.
// • Writes to TIMER_LOGS, errors to FUNCTION_ERRORS.
// • NEVER touches frontend files.
// ============================================================================

import * as admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

// ---- TASK MODULES ----------------------------------------------------------
import { timerLogout } from "./timerLogout.js";
import { securitySweep } from "./securitySweep.js";
import { scheduledUserScoring } from "./scheduledUserScoring.js";
import { refreshEnvironmentSmart } from "./refreshEnvironmentSmart.js";
import { pulsebandCleanup } from "./pulsebandCleanup.js";
import { pulseHistoryRepair } from "./pulseHistoryRepair.js";
// ---------------------------------------------------------------------------

if (!admin.apps.length) {
  admin.initializeApp();
}
const db = getFirestore();

// ------------------------------------------------------------
// ⭐ HUMAN‑READABLE CONTEXT MAP
// ------------------------------------------------------------
const TIMER_CONTEXT = {
  label: "HEARTBEAT",
  layer: "D‑Layer",
  purpose: "Scheduled Executor",
  context: "Runs periodic backend tasks and writes logs"
};

// ============================================================================
// INTERNAL: TASK DEFINITIONS
// ============================================================================

const TASKS = [
  {
    key: "logoutSweep",
    label: "Logout Sweep",
    purpose: "Expire inactive sessions",
    context: "Ensures security + session hygiene",
    intervalMs: 5 * 60 * 1000,
    runner: timerLogout
  },
  {
    key: "userScoring",
    label: "User Scoring",
    purpose: "Recalculate user scores",
    context: "Maintains deterministic scoring",
    intervalMs: 5 * 60 * 1000,
    runner: scheduledUserScoring
  },
  {
    key: "refreshEnvironmentSmart",
    label: "Environment Refresh",
    purpose: "Refresh environment data",
    context: "Ensures environment freshness",
    intervalMs: 30 * 60 * 1000,
    runner: refreshEnvironmentSmart
  },
  {
    key: "securitySweep",
    label: "Security Sweep",
    purpose: "Scan for anomalies",
    context: "Detects suspicious activity",
    intervalMs: 24 * 60 * 60 * 1000,
    runner: securitySweep
  },
  {
    key: "pulsebandCleanup",
    label: "Pulseband Cleanup",
    purpose: "Clean expired Pulseband entries",
    context: "Maintains badge integrity",
    intervalMs: 24 * 60 * 60 * 1000,
    runner: pulsebandCleanup
  },
  {
    key: "pulseHistoryRepair",
    label: "Pulse History Repair",
    purpose: "Repair missing snapshots",
    context: "Ensures deterministic lineage",
    intervalMs: 60 * 60 * 1000,
    runner: pulseHistoryRepair
  }
];

const STATE_DOC = "PULSE_OS_TIMER_STATE";

// ============================================================================
// INTERNAL: LOAD / UPDATE STATE
// ============================================================================

async function loadState() {
  const ref = db.collection("TIMER_LOGS").doc(STATE_DOC);
  const snap = await ref.get();
  return { ref, data: snap.exists ? snap.data() : {} };
}

async function updateState(ref, updates) {
  await ref.set(
    {
      ...updates,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      ...TIMER_CONTEXT
    },
    { merge: true }
  );
}

// ============================================================================
// INTERNAL: SHOULD RUN?
// ============================================================================

function shouldRunTask(nowMs, state, task) {
  const last = state?.lastRuns?.[task.key] ?? 0;
  if (!last) return true;
  return nowMs - last >= task.intervalMs;
}

// ============================================================================
// MAIN HANDLER (NETLIFY SCHEDULED FUNCTION)
// ============================================================================

export const handler = async () => {
  const runId = `HB_${Date.now()}`;

  console.log(
    `%c🟦 HEARTBEAT START → ${runId}`,
    "color:#03A9F4; font-weight:bold;"
  );

  const now = Date.now();
  const results = {
    runId,
    startedAt: now,
    tasks: {},
    ...TIMER_CONTEXT
  };

  try {
    const { ref: stateRef, data: state } = await loadState();
    const lastRuns = state.lastRuns || {};

    for (const task of TASKS) {
      const taskResult = {
        ran: false,
        skipped: false,
        error: null,
        label: task.label,
        purpose: task.purpose,
        context: task.context
      };

      try {
        if (!shouldRunTask(now, state, task)) {
          taskResult.skipped = true;

          console.log(
            `%c🟨 SKIPPED → ${task.label}`,
            "color:#FFC107; font-weight:bold;"
          );

          results.tasks[task.key] = taskResult;
          continue;
        }

        await task.runner();
        taskResult.ran = true;
        lastRuns[task.key] = now;

        console.log(
          `%c🟩 RAN → ${task.label}`,
          "color:#4CAF50; font-weight:bold;"
        );

      } catch (err) {
        taskResult.error = String(err);

        console.error(
          `%c🟥 ERROR → ${task.label}`,
          "color:#FF5252; font-weight:bold;",
          err
        );

        await db.collection("FUNCTION_ERRORS").doc(`ERR_${runId}_${task.key}`).set({
          fn: "timer",
          task: task.key,
          label: task.label,
          error: String(err),
          runId,
          ...TIMER_CONTEXT,
          createdAt: admin.firestore.FieldValue.serverTimestamp()
        });
      }

      results.tasks[task.key] = taskResult;
    }

    await updateState(stateRef, { lastRuns });

    await db.collection("TIMER_LOGS").doc(`HEARTBEAT_${runId}`).set({
      fn: "timer",
      runId,
      tasks: results.tasks,
      ...TIMER_CONTEXT,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    console.log(
      `%c🟩 HEARTBEAT COMPLETE → ${runId}`,
      "color:#4CAF50; font-weight:bold;"
    );

    return {
      statusCode: 200,
      body: JSON.stringify(results)
    };

  } catch (err) {
    console.error(
      `%c🟥 HEARTBEAT FATAL ERROR`,
      "color:#FF5252; font-weight:bold;",
      err
    );

    await db.collection("FUNCTION_ERRORS").doc(`ERR_${runId}_FATAL`).set({
      fn: "timer",
      stage: "fatal",
      error: String(err),
      runId,
      ...TIMER_CONTEXT,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    return {
      statusCode: 500,
      body: JSON.stringify({
        ok: false,
        runId,
        error: String(err),
        ...TIMER_CONTEXT
      })
    };
  }
};
