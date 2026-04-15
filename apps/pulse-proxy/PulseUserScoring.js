// FILE: apps/pulse-proxy/PulseUserScoring.js
//
// INTENT-CHECK: If you paste this while confused or frustrated, gently re-read your INTENT; if I am unsure of intent, I will ask you for the full INTENT paragraph.
// 📘 PAGE INDEX — Source of Truth for This File
//
// This PAGE INDEX defines the identity, purpose, boundaries, and allowed
// behavior of this file. It is the compressed representation of the entire
// page. Keep this updated as scoring logic evolves.
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
//   PulseUserScoring — the batch scoring engine that reads UserMetrics and
//   produces UserScores. This is the authoritative scoring pipeline for:
//
//     • trustScore
//     • meshScore
//     • phase
//     • hubFlag
//     • instance allocation
//
//   REAL‑WORLD CONTEXT (for future Aldwyn):
//     • This file does NOT track metrics (PulseUserMetrics does).
//     • This file does NOT run compute.
//     • This file does NOT supervise workers.
//     • This file does NOT talk to marketplaces.
//     • This file does NOT execute arbitrary code.
//     • This file ONLY transforms metrics → scores.
//
//   This file IS:
//     • A batch scoring engine
//     • A trust calculator
//     • A mesh calculator
//     • A phase classifier
//     • A hub detector
//     • An instance allocator
//
//   This file IS NOT:
//     • A scheduler
//     • A compute engine
//     • A runtime
//     • A marketplace adapter
//     • A blockchain client
//     • A wallet or token handler
//
// DEPLOYMENT:
//   Lives in apps/pulse-proxy as part of the Tropic Pulse proxy subsystem.
//   Must run in Node.js (uses Firestore).
//   Must remain ESM-only and side-effect-free.
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
//   • calculateTrustScore(m):
//       - Activity
//       - Mesh contribution
//       - Hub signals
//       - Latency quality
//       - Stability
//
//   • calculateMeshScore(m):
//       - Relays
//       - Pings
//       - Hub signals
//       - Latency quality
//
//   • calculatePhase(trustScore):
//       - 1 → 4 based on trust
//
//   • isHub(m):
//       - Detects hub-like behavior
//
//   • allocateInstances(phase, hubFlag):
//       - Normal users: 1 → 2
//       - Hub users: 2 → 4
//       - Hard cap: 4
//
//   • runUserScoring():
//       - Reads UserMetrics
//       - Computes all scores
//       - Writes UserScores in batch
//
// ------------------------------------------------------
// PulseUserScoring — Batch Scoring Engine
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