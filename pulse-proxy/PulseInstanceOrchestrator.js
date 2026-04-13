// PulseInstanceOrchestrator.js
// ------------------------------------------------------
// Reads UserScores → launches N workers per user
// Ensures no duplicates, scales up/down, manages lifecycle
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