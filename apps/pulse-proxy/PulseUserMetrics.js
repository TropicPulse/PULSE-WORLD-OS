// PulseUserMetrics.js
// ------------------------------------------------------
// Centralized user metrics engine for Tropic Pulse
// Tracks: requests, bytes, latency, mesh signals, hub signals, stability
// ------------------------------------------------------

import { getFirestore } from "firebase-admin/firestore";
const db = getFirestore();

// ------------------------------------------------------
// updateUserMetrics()
// Called from server.js (TPProxy) on every request
// ------------------------------------------------------
export async function updateUserMetrics(userId, data = {}) {
  if (!userId || userId === "anonymous") return;

  const ref = db.collection("UserMetrics").doc(userId);
  const now = Date.now();

  await db.runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    const existing = snap.exists ? snap.data() : {};

    // Base counters
    const totalRequests = (existing.totalRequests || 0) + 1;
    const totalBytes = (existing.totalBytes || 0) + (data.bytes || 0);

    // Latency averaging
    let avgLatency = existing.avgLatency || 0;
    if (data.durationMs != null) {
      if (!existing.totalRequests) {
        avgLatency = data.durationMs;
      } else {
        avgLatency =
          (avgLatency * existing.totalRequests + data.durationMs) /
          totalRequests;
      }
    }

    // Mesh + hub signals
    const meshRelays = (existing.meshRelays || 0) + (data.meshRelay ? 1 : 0);
    const meshPings = (existing.meshPings || 0) + (data.meshPing ? 1 : 0);
    const hubSignals = (existing.hubSignals || 0) + (data.hubFlag ? 1 : 0);

    // Stability (simple for now)
    const stabilityScore = existing.stabilityScore || 0;
    const lastSeen = now;

    tx.set(
      ref,
      {
        userId,
        totalRequests,
        totalBytes,
        avgLatency,
        meshRelays,
        meshPings,
        hubSignals,
        stabilityScore,
        lastSeen,
        updatedAt: now
      },
      { merge: true }
    );
  });
}

// ------------------------------------------------------
// calculateTrustScore()
// ------------------------------------------------------
export function calculateTrustScore(metrics) {
  if (!metrics) return 0;

  let score = 0;

  // Activity
  score += Math.min(metrics.totalRequests / 100, 20);

  // Mesh contribution
  score += Math.min(metrics.meshRelays / 10, 20);

  // Hub-like behavior
  score += Math.min(metrics.hubSignals / 5, 20);

  // Latency quality
  if (metrics.avgLatency && metrics.avgLatency < 150) score += 20;

  // Stability
  score += metrics.stabilityScore || 0;

  return Math.min(score, 100);
}

// ------------------------------------------------------
// calculatePhase()
// ------------------------------------------------------
export function calculatePhase(trustScore) {
  if (trustScore < 25) return 1;
  if (trustScore < 50) return 2;
  if (trustScore < 75) return 3;
  return 4;
}

// ------------------------------------------------------
// isHub()
// ------------------------------------------------------
export function isHub(metrics) {
  if (!metrics) return false;

  return (
    metrics.meshRelays > 50 ||
    metrics.hubSignals > 20 ||
    metrics.totalRequests > 500
  );
}

// ------------------------------------------------------
// allocateInstances() — NEW MODEL
// ------------------------------------------------------
// Normal users: 1 → 2
// Hub users:    2 → 4
// Max = 4
export function allocateInstances(phase, hubFlag) {
  // Base allocation: 1 or 2
  let base = phase >= 2 ? 2 : 1;

  // Hub doubles allocation
  if (hubFlag) {
    base = base * 2;
  }

  // Hard cap
  return Math.min(base, 4);
}