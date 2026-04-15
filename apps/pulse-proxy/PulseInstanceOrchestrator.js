// FILE: apps/pulse-proxy/PulseInstanceOrchestrator.js
//
// INTENT-CHECK: If you paste this while confused or frustrated, gently re-read your INTENT; if I am unsure of intent, I will ask you for the full INTENT paragraph.
// 📘 PAGE INDEX — Source of Truth for This File
//
// This PAGE INDEX defines the identity, purpose, boundaries, and allowed
// behavior of this file. It is the compressed representation of the entire
// page. Keep this updated as logic evolves.
//
// If AI becomes uncertain or drifts, request: "Rules Design (Trust/Data)"
//
// CONTENTS TO MAINTAIN:
//   • What this file IS
//   • What this file IS NOT
//   • Responsibilities
//   • Exported functions
//   • Internal logic summary
//   • Allowed operations
//   • Forbidden operations
//   • Safety constraints
//
// ROLE:
//   PulseInstanceOrchestrator — the proxy-side supervisor that manages
//   per-user worker instances based on UserScores.
//
//   This module is responsible for:
//     • Reading UserScores from Firestore
//     • Determining how many workers each user should have
//     • Launching workers (placeholder logic)
//     • Killing workers when scaling down
//     • Ensuring no duplicate workers
//     • Maintaining lifecycle in memory
//
//   REAL‑WORLD CONTEXT (for future Aldwyn):
//     • This file does NOT run compute.
//     • This file does NOT run MinerRuntime.
//     • This file does NOT run MinerEngine.
//     • This file does NOT execute jobs.
//     • This file does NOT talk to marketplaces.
//     • This file ONLY manages proxy-side worker processes.
//     • These workers are NOT compute workers — they are proxy workers.
//     • This file is part of the Pulse Proxy, NOT Pulse Miner.
//
//   This file IS:
//     • A supervisor
//     • A lifecycle manager
//     • A scaling controller
//     • A duplicate-prevention system
//
//   This file IS NOT:
//     • A compute engine
//     • A job executor
//     • A scheduler
//     • A marketplace adapter
//     • A reputation engine
//     • A blockchain client
//     • A wallet or token handler
//
// DEPLOYMENT:
//   Lives in apps/pulse-proxy as part of the Pulse Proxy subsystem.
//   Must run in Node.js (uses Firestore + timers).
//   Must remain ESM-only and side-effect-free except for worker intervals.
//
// SAFETY RULES (CRITICAL):
//   • NO eval()
//   • NO dynamic imports
//   • NO arbitrary code execution
//   • NO user-provided logic
//   • NO compute execution
//   • NO GPU work
//   • NO marketplace calls
//
// INTERNAL LOGIC SUMMARY:
//   • runInstanceOrchestrator():
//       - Reads UserScores
//       - For each user:
//           - Ensures worker array exists
//           - Scales up if needed
//           - Scales down if needed
//       - Returns true
//
//   • launchWorker():
//       - Creates placeholder worker object
//       - Starts heartbeat interval
//
//   • killWorker():
//       - Clears interval
//       - Removes worker
//
// ------------------------------------------------------
// PulseInstanceOrchestrator — Proxy Worker Supervisor
// ------------------------------------------------------

import { getFirestore } from "firebase-admin/firestore";
const db = getFirestore();

// In-memory worker registry
const activeWorkers = new Map();

// ------------------------------------------------------
// Launch a worker (placeholder for your real worker logic)
// ------------------------------------------------------
function launchWorker(userId, workerIndex) {
  const workerName = `${userId}-instance-${workerIndex}`;

  console.log(`Launching worker: ${workerName}`);

  // Placeholder worker object
  const worker = {
    name: workerName,
    userId,
    index: workerIndex,
    started: Date.now(),
    interval: setInterval(() => {
      console.log(`Worker ${workerName} heartbeat`);
    }, 5000)
  };

  return worker;
}

// ------------------------------------------------------
// Kill a worker
// ------------------------------------------------------
function killWorker(worker) {
  console.log(`Killing worker: ${worker.name}`);
  clearInterval(worker.interval);
}

// ------------------------------------------------------
// MAIN ORCHESTRATOR LOOP
// ------------------------------------------------------
export async function runInstanceOrchestrator() {
  const snap = await db.collection("UserScores").get();

  for (const doc of snap.docs) {
    const userId = doc.id;
    const { instances } = doc.data();

    if (!activeWorkers.has(userId)) {
      activeWorkers.set(userId, []);
    }

    const currentWorkers = activeWorkers.get(userId);

    // ------------------------------------------------------
    // SCALE UP
    // ------------------------------------------------------
    if (currentWorkers.length < instances) {
      const needed = instances - currentWorkers.length;

      for (let i = 0; i < needed; i++) {
        const workerIndex = currentWorkers.length;
        const worker = launchWorker(userId, workerIndex);
        currentWorkers.push(worker);
      }
    }

    // ------------------------------------------------------
    // SCALE DOWN
    // ------------------------------------------------------
    if (currentWorkers.length > instances) {
      const extra = currentWorkers.length - instances;

      for (let i = 0; i < extra; i++) {
        const worker = currentWorkers.pop();
        killWorker(worker);
      }
    }
  }

  return true;
}