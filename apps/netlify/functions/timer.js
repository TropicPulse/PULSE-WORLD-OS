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


// ---- TASK MODULES (IMPLEMENT THESE AS MODULAR BACKEND FILES) ---------------
import { timerLogout } from "./timerLogout.js";               
import { securitySweep } from "./securitySweep.js";           
import { scheduledUserScoring } from "./scheduledUserScoring.js";               
import { refreshEnvironmentSmart } from "./refreshEnvironmentSmart.js"; 
import { pulsebandCleanup } from "./pulsebandCleanup.js";     
import { pulseHistoryRepair } from "./pulseHistoryRepair.js"; 
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------

if (!admin.apps.length) {
  admin.initializeApp();
}
const db = getFirestore();

// ============================================================================
// INTERNAL: TASK DEFINITIONS
// ============================================================================

const TASKS = [
  {
    key: "logoutSweep",
    label: "Logout Sweep",
    intervalMs: 5 * 60 * 1000,
    runner: runLogoutSweep
  },
  {
    key: "userScoring",
    label: "User Scoring",
    intervalMs: 5 * 60 * 1000,
    runner: runUserScoring
  },
  {
  key: "refreshEnvironmentSmart",
  label: "Environment Refresh",
  intervalMs: 30 * 60 * 1000,
  runner: refreshEnvironmentSmart
},
  {
    key: "securitySweep",
    label: "Security Sweep",
    intervalMs: 24 * 60 * 60 * 1000,
    runner: runSecuritySweep
  },
  {
    key: "pulsebandCleanup",
    label: "Pulseband Cleanup",
    intervalMs: 24 * 60 * 60 * 1000,
    runner: runPulsebandCleanup
  },
  {
    key: "pulseHistoryRepair",
    label: "Pulse History Repair",
    intervalMs: 60 * 60 * 1000,
    runner: runPulseHistoryRepair
  }
];

const STATE_DOC = "PULSE_OS_TIMER_STATE"; // single doc to track last runs

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
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
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
  const logId = `HEARTBEAT_${runId}`;
  const errorPrefix = `ERR_${runId}_`;

  const now = Date.now();
  const results = {
    runId,
    startedAt: now,
    tasks: {}
  };

  try {
    const { ref: stateRef, data: state } = await loadState();
    const lastRuns = state.lastRuns || {};

    for (const task of TASKS) {
      const taskResult = {
        ran: false,
        skipped: false,
        error: null
      };

      try {
        if (!shouldRunTask(now, state, task)) {
          taskResult.skipped = true;
          results.tasks[task.key] = taskResult;
          continue;
        }

        await task.runner(); // task module does its own logging / writes
        taskResult.ran = true;
        lastRuns[task.key] = now;

      } catch (err) {
        taskResult.error = String(err);

        await db.collection("FUNCTION_ERRORS").doc(`${errorPrefix}${task.key}`).set({
          fn: "timerHeartbeat",
          task: task.key,
          label: task.label,
          error: String(err),
          runId,
          createdAt: admin.firestore.FieldValue.serverTimestamp()
        });
      }

      results.tasks[task.key] = taskResult;
    }

    await updateState(stateRef, { lastRuns });

    await db.collection("TIMER_LOGS").doc(logId).set({
      fn: "timerHeartbeat",
      runId,
      tasks: results.tasks,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        ok: true,
        runId,
        tasks: results.tasks
      })
    };

  } catch (err) {
    await db.collection("FUNCTION_ERRORS").doc(`${errorPrefix}FATAL`).set({
      fn: "timerHeartbeat",
      stage: "fatal",
      error: String(err),
      runId,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    return {
      statusCode: 500,
      body: JSON.stringify({
        ok: false,
        runId,
        error: String(err)
      })
    };
  }
};
