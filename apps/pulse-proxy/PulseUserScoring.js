// PulseUserScoring.js
// ------------------------------------------------------
// Reads UserMetrics → computes trust, mesh, phase, hub, instances
// Writes results to UserScores/{userId}
// ------------------------------------------------------

import { getFirestore } from "firebase-admin/firestore";
const db = getFirestore();

// ------------------------------------------------------
// calculateTrustScore()
// ------------------------------------------------------
function calculateTrustScore(m) {
  if (!m) return 0;

  let score = 0;

  // Activity (0–20)
  score += Math.min(m.totalRequests / 100, 20);

  // Mesh contribution (0–20)
  score += Math.min(m.meshRelays / 10, 20);

  // Hub-like behavior (0–20)
  score += Math.min(m.hubSignals / 5, 20);

  // Latency quality (0–20)
  if (m.avgLatency && m.avgLatency < 150) score += 20;

  // Stability (0–20)
  score += Math.min(m.stabilityScore || 0, 20);

  return Math.min(score, 100);
}

// ------------------------------------------------------
// calculateMeshScore()
// ------------------------------------------------------
function calculateMeshScore(m) {
  if (!m) return 0;

  let score = 0;

  // Relays (0–40)
  score += Math.min(m.meshRelays / 5, 40);

  // Pings (0–20)
  score += Math.min(m.meshPings / 10, 20);

  // Hub signals (0–20)
  score += Math.min(m.hubSignals / 5, 20);

  // Latency quality (0–20)
  if (m.avgLatency && m.avgLatency < 150) score += 20;

  return Math.min(score, 100);
}

// ------------------------------------------------------
// calculatePhase()
// ------------------------------------------------------
function calculatePhase(trustScore) {
  if (trustScore < 25) return 1;
  if (trustScore < 50) return 2;
  if (trustScore < 75) return 3;
  return 4;
}

// ------------------------------------------------------
// isHub()
// ------------------------------------------------------
function isHub(m) {
  if (!m) return false;

  return (
    m.meshRelays > 50 ||
    m.hubSignals > 20 ||
    m.totalRequests > 500
  );
}

// ------------------------------------------------------
// allocateInstances() — NEW MODEL
// ------------------------------------------------------
// 2 tiers + hub boost
// Normal users: 1 → 2
// Hub users:    2 → 4
// Max = 4
function allocateInstances(phase, hubFlag) {
  // Base allocation: 1 or 2
  let base = phase >= 2 ? 2 : 1;

  // Hub doubles allocation
  if (hubFlag) {
    base = base * 2;
  }

  // Hard cap
  return Math.min(base, 4);
}

// ------------------------------------------------------
// runUserScoring()
// ------------------------------------------------------
export async function runUserScoring() {
  const snap = await db.collection("UserMetrics").get();
  const batch = db.batch();

  snap.forEach((doc) => {
    const m = doc.data();

    const trustScore = calculateTrustScore(m);
    const meshScore = calculateMeshScore(m);
    const phase = calculatePhase(trustScore);
    const hubFlag = isHub(m);
    const instances = allocateInstances(phase, hubFlag);

    const ref = db.collection("UserScores").doc(doc.id);

    batch.set(
      ref,
      {
        userId: doc.id,
        trustScore,
        meshScore,
        phase,
        hub: hubFlag,
        instances,
        lastUpdated: Date.now()
      },
      { merge: true }
    );
  });

  await batch.commit();
}

export {
  calculateTrustScore,
  calculateMeshScore,
  calculatePhase,
  isHub,
  allocateInstances
};