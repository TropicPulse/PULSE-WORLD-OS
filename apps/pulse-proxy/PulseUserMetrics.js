// ======================================================
//  PULSE USER METRICS v7.3
//  “THE VITALS MONITOR / CIRCULATORY TELEMETRY LAYER”
//  Deterministic, Drift‑Proof, Performance‑Aware Metrics Engine
// ======================================================
//
//  This subsystem monitors circulatory activity across the organism.
//  It does NOT heal, command, scale, or compute. It only measures.
//
// ======================================================
//  CONFIGURABLE INSTANCE FORMULA VARIABLES
// ======================================================

// Physiological caps (max circulatory throughput)
export const NORMAL_MAX = 4;
export const UPGRADED_MAX = 8;
export const HIGHEND_MAX = 8;
export const TEST_EARN_MAX = 16;

// Multipliers (fitness / stress modifiers)
export const UPGRADED_MULT = 2;
export const HIGHEND_MULT = 2;
export const EARN_MODE_MULT = 1.5;

// Logging controls (vitals panel)
export const ENABLE_PERFORMANCE_LOGGING = true;
export const PERFORMANCE_LOG_COLLECTION = "UserPerformanceLogs";

// ======================================================
//  Imports
// ======================================================
import { getFirestore, Timestamp } from "firebase-admin/firestore";
const db = getFirestore();

// ======================================================
//  CONTEXT — Vitals Monitor Identity
// ======================================================
const VITALS_CONTEXT = {
  layer: "PulseUserMetrics",
  role: "VITALS_MONITOR",
  version: "7.3",
  evo: {
    dualMode: true,
    localAware: true,
    internetAware: true,
    advantageCascadeAware: true,
    pulseEfficiencyAware: true,
    driftProof: true,
    multiInstanceReady: true,
    unifiedAdvantageField: true,
    futureEvolutionReady: true
  }
};

log("vitals", "PulseUserMetrics v7.3 online.");
log("vitals", "Performance logging:", ENABLE_PERFORMANCE_LOGGING);

// ======================================================
//  updateUserMetrics()
//  “Record a heartbeat + vitals panel”
// ======================================================
export async function updateUserMetrics(userId, data = {}) {
  if (!userId || userId === "anonymous") return;

  log(
    "vitals",
    `Update | user=${userId} | bytes=${data.bytes ?? 0} | duration=${data.durationMs ?? 0}ms | meshRelay=${!!data.meshRelay} | meshPing=${!!data.meshPing} | hubFlag=${!!data.hubFlag}`
  );

  const ref = db.collection("UserMetrics").doc(userId);
  const now = Date.now();

  await db.runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    const existing = snap.exists ? snap.data() : {};

    // Heartbeat count
    const totalRequests = (existing.totalRequests || 0) + 1;

    // Blood flow
    const totalBytes = (existing.totalBytes || 0) + (data.bytes || 0);

    // Blood pressure (latency)
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

    // Circulatory routing signals
    const meshRelays = (existing.meshRelays || 0) + (data.meshRelay ? 1 : 0);
    const meshPings = (existing.meshPings || 0) + (data.meshPing ? 1 : 0);

    // High-flow organ signals
    const hubSignals = (existing.hubSignals || 0) + (data.hubFlag ? 1 : 0);

    // Stability index
    const stabilityScore = existing.stabilityScore || 0;

    const lastSeen = now;

    log(
      "vitals",
      `user=${userId} | heartbeats=${totalRequests} | bloodFlow=${totalBytes} | bloodPressure=${avgLatency.toFixed(
        2
      )}ms | relays=${meshRelays} | pings=${meshPings} | hubSignals=${hubSignals}`
    );

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

  // PERFORMANCE SNAPSHOT LOGGING (vitals panel)
  if (ENABLE_PERFORMANCE_LOGGING) {
    try {
      await db.collection(PERFORMANCE_LOG_COLLECTION).add({
        ...VITALS_CONTEXT,
        userId,
        ts: Date.now(),
        bytes: data.bytes ?? null,
        durationMs: data.durationMs ?? null,
        meshRelay: data.meshRelay ?? false,
        meshPing: data.meshPing ?? false,
        hubFlag: data.hubFlag ?? false
      });

      log("vitals", `Snapshot logged for user=${userId}`);
    } catch (err) {
      error("vitals", "Failed to log performance", err);
    }
  }
}

// ======================================================
//  calculateTrustScore()
//  “Overall health index”
// ======================================================
export function calculateTrustScore(metrics) {
  if (!metrics) return 0;

  let score = 0;

  // Activity (circulatory activity)
  score += Math.min(metrics.totalRequests / 100, 20);

  // Mesh contribution (routing health)
  score += Math.min(metrics.meshRelays / 10, 20);

  // Hub-like behavior (high-flow organ)
  score += Math.min(metrics.hubSignals / 5, 20);

  // Blood pressure quality (latency)
  if (metrics.avgLatency && metrics.avgLatency < 150) score += 20;

  // Stability (baseline health)
  score += metrics.stabilityScore || 0;

  const final = Math.min(score, 100);

  log(
    "vitals",
    `HealthIndex computed | user=${metrics.userId ?? "?"} | score=${final}`
  );

  return final;
}

// ======================================================
//  calculatePhase()
//  “Functional fitness tier”
// ======================================================
export function calculatePhase(trustScore) {
  let phase = 1;

  if (trustScore < 25) phase = 1;
  else if (trustScore < 50) phase = 2;
  else if (trustScore < 75) phase = 3;
  else phase = 4;

  log("vitals", `Phase computed | trustScore=${trustScore} | phase=${phase}`);

  return phase;
}

// ======================================================
//  isHub()
//  “High-flow organ detection”
// ======================================================
export function isHub(metrics) {
  if (!metrics) return false;

  const hub =
    metrics.meshRelays > 50 ||
    metrics.hubSignals > 20 ||
    metrics.totalRequests > 500;

  if (hub) {
    log(
      "vitals",
      `HIGH-FLOW ORGAN DETECTED | user=${metrics.userId ?? "?"} | relays=${metrics.meshRelays} | hubSignals=${metrics.hubSignals} | totalRequests=${metrics.totalRequests}`
    );
  }

  return hub;
}

// ======================================================
//  allocateInstances()
//  “Circulatory capacity allocation”
// ======================================================
export function allocateInstances(
  phase,
  hubFlag,
  deviceTier,
  earnMode,
  testEarnActive
) {
  let base = phase >= 2 ? 2 : 1;

  if (hubFlag) base = base * 2;

  if (deviceTier === "upgraded") base *= UPGRADED_MULT;
  if (deviceTier === "highend") base *= HIGHEND_MULT;

  if (earnMode) base = Math.floor(base * EARN_MODE_MULT);

  if (testEarnActive) base = TEST_EARN_MAX;

  const max =
    testEarnActive
      ? TEST_EARN_MAX
      : deviceTier === "upgraded"
      ? UPGRADED_MAX
      : deviceTier === "highend"
      ? HIGHEND_MAX
      : NORMAL_MAX;

  const final = Math.max(1, Math.min(base, max));

  log(
    "vitals",
    `Circulatory capacity allocated | phase=${phase} | hub=${hubFlag} | tier=${deviceTier} | earnMode=${earnMode} | testEarn=${testEarnActive} | final=${final}`
  );

  return final;
}
