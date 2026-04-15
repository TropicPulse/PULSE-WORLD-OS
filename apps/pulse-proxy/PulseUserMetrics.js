// FILE: apps/pulse-proxy/PulseUserMetrics.js
//
// INTENT-CHECK: If you paste this while confused or frustrated, gently re-read your INTENT; if I am unsure of intent, I will ask you for the full INTENT paragraph.
// 📘 PAGE INDEX — Source of Truth for This File
//
// This PAGE INDEX defines the identity, purpose, boundaries, and allowed
// behavior of this file. It is the compressed representation of the entire
// page. Keep this updated as metrics evolve.
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
//   PulseUserMetrics — the centralized metrics engine for Tropic Pulse.
//   This module is responsible for:
//     • Tracking user activity (requests, bytes, latency)
//     • Tracking mesh behavior (relays, pings)
//     • Tracking hub signals
//     • Tracking stability
//     • Producing trustScore, phase, hubFlag, instance allocation
//
//   REAL‑WORLD CONTEXT (for future Aldwyn):
//     • This file does NOT run compute.
//     • This file does NOT select jobs.
//     • This file does NOT supervise workers.
//     • This file does NOT talk to marketplaces.
//     • This file does NOT execute arbitrary code.
//     • This file ONLY tracks behavior + computes trust.
//
//   This file IS:
//     • A metrics aggregator
//     • A trust engine
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
//   • updateUserMetrics(userId, data):
//       - Increments counters
//       - Updates latency average
//       - Tracks mesh + hub signals
//       - Updates stability + timestamps
//
//   • calculateTrustScore(metrics):
//       - Activity
//       - Mesh contribution
//       - Hub signals
//       - Latency quality
//       - Stability
//
//   • calculatePhase(trustScore):
//       - 1 → 4 based on trust
//
//   • isHub(metrics):
//       - Detects hub-like behavior
//
//   • allocateInstances(phase, hubFlag):
//       - Normal users: 1 → 2
//       - Hub users: 2 → 4
//       - Hard cap: 4
//
// ------------------------------------------------------
// PulseUserMetrics — Centralized User Metrics Engine
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