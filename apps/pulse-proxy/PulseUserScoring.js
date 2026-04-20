// ======================================================
//  PULSE USER SCORING v7.3
//  “THE HYPOTHALAMUS / HOMEOSTASIS REGULATION LAYER”
//  Deterministic, Drift‑Proof, Device‑Aware Batch Scoring
//  PURE HEALING. NO AI LAYERS. NO TRANSLATION. NO MEMORY MODEL.
// ======================================================
//
//  PulseUserScoring is the HYPOTHALAMUS of Tropic Pulse.
//  It interprets vitals and assigns stable, deterministic scores.
//
// ======================================================
//  CONFIGURABLE INSTANCE FORMULA VARIABLES
// ======================================================

export const NORMAL_MAX = 4;
export const UPGRADED_MAX = 8;
export const HIGHEND_MAX = 8;
export const TEST_EARN_MAX = 16;

export const UPGRADED_MULT = 2;
export const HIGHEND_MULT = 2;
export const EARN_MODE_MULT = 1.5;

export const ENABLE_SCORING_LOGGING = true;
export const SCORING_LOG_COLLECTION = "UserScoringLogs";

// ======================================================
//  Imports
// ======================================================
import { getFirestore } from "firebase-admin/firestore";
const db = getFirestore();

// ======================================================
//  CONTEXT — Hypothalamus Identity
// ======================================================
const HYPOTHALAMUS_CONTEXT = {
  layer: "PulseUserScoring",
  role: "HYPOTHALAMUS",
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

log("hypothalamus", "PulseUserScoring v7.3 online.");
log("hypothalamus", "Scoring logging:", ENABLE_SCORING_LOGGING);

// ======================================================
//  calculateTrustScore()
//  “Overall health index”
// ======================================================
function calculateTrustScore(m) {
  if (!m) return 0;

  let score = 0;

  // Activity
  score += Math.min(m.totalRequests / 100, 20);
  // Mesh contribution
  score += Math.min(m.meshRelays / 10, 20);
  // Hub-like behavior
  score += Math.min(m.hubSignals / 5, 20);
  // Latency quality
  if (m.avgLatency && m.avgLatency < 150) score += 20;
  // Stability
  score += Math.min(m.stabilityScore || 0, 20);

  const final = Math.min(score, 100);

  log(
    "hypothalamus",
    `HealthIndex | user=${m.userId ?? "?"} | score=${final}`
  );

  return final;
}

// ======================================================
//  calculateMeshScore()
//  “Mesh health index”
// ======================================================
function calculateMeshScore(m) {
  if (!m) return 0;

  let score = 0;

  // Mesh relays
  score += Math.min(m.meshRelays / 5, 40);
  // Mesh pings
  score += Math.min(m.meshPings / 10, 20);
  // Hub-like behavior
  score += Math.min(m.hubSignals / 5, 20);
  // Latency quality
  if (m.avgLatency && m.avgLatency < 150) score += 20;

  const final = Math.min(score, 100);

  log(
    "hypothalamus",
    `MeshHealth | user=${m.userId ?? "?"} | score=${final}`
  );

  return final;
}

// ======================================================
//  calculatePhase()
//  “Functional fitness tier”
// ======================================================
function calculatePhase(trustScore) {
  let phase = 1;

  if (trustScore < 25) phase = 1;
  else if (trustScore < 50) phase = 2;
  else if (trustScore < 75) phase = 3;
  else phase = 4;

  log(
    "hypothalamus",
    `Phase | trustScore=${trustScore} | phase=${phase}`
  );

  return phase;
}

// ======================================================
//  isHub()
//  “High-flow organ detection”
// ======================================================
function isHub(m) {
  if (!m) return false;

  const hub =
    m.meshRelays > 50 ||
    m.hubSignals > 20 ||
    m.totalRequests > 500;

  if (hub) {
    log(
      "hypothalamus",
      `HIGH-FLOW ORGAN | user=${m.userId ?? "?"} | relays=${m.meshRelays} | hubSignals=${m.hubSignals} | totalRequests=${m.totalRequests}`
    );
  }

  return hub;
}

// ======================================================
//  allocateInstances()
//  “Resource allocation / instance capacity”
// ======================================================
function allocateInstances(
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
    "hypothalamus",
    `Resource allocation | phase=${phase} | hub=${hubFlag} | tier=${deviceTier} | earnMode=${earnMode} | testEarn=${testEarnActive} | final=${final}`
  );

  return final;
}

// ======================================================
//  logScoringSnapshot()
//  “Scoring telemetry snapshot”
// ======================================================
async function logScoringSnapshot(userId, snapshot) {
  if (!ENABLE_SCORING_LOGGING) return;

  try {
    await db.collection(SCORING_LOG_COLLECTION).add({
      ...HYPOTHALAMUS_CONTEXT,
      userId,
      ts: Date.now(),
      ...snapshot
    });

    log("hypothalamus", `Snapshot logged | user=${userId}`);
  } catch (err) {
    error("hypothalamus", "Failed to log scoring snapshot", err);
  }
}

// ======================================================
//  runUserScoring()
//  “Homeostasis scoring pass”
// ======================================================
export async function runUserScoring() {
  log("hypothalamus", "Running homeostasis scoring pass…");

  const snap = await db.collection("UserMetrics").get();
  const batch = db.batch();

  for (const doc of snap.docs) {
    const m = doc.data();
    m.userId = doc.id;

    const trustScore = calculateTrustScore(m);
    const meshScore = calculateMeshScore(m);
    const phase = calculatePhase(trustScore);
    const hubFlag = isHub(m);

    const deviceTier = m.deviceTier ?? "normal";
    const earnMode = m.earnMode ?? false;
    const testEarnActive = m.testEarnActive ?? false;

    const instances = allocateInstances(
      phase,
      hubFlag,
      deviceTier,
      earnMode,
      testEarnActive
    );

    log(
      "hypothalamus",
      `Final State | user=${doc.id} | trust=${trustScore} | mesh=${meshScore} | phase=${phase} | hub=${hubFlag} | tier=${deviceTier} | earnMode=${earnMode} | testEarn=${testEarnActive} | instances=${instances}`
    );

    const ref = db.collection("UserScores").doc(doc.id);

    batch.set(
      ref,
      {
        ...HYPOTHALAMUS_CONTEXT,
        userId: doc.id,
        trustScore,
        meshScore,
        phase,
        hub: hubFlag,
        deviceTier,
        earnMode,
        testEarnActive,
        instances,
        lastUpdated: Date.now()
      },
      { merge: true }
    );

    await logScoringSnapshot(doc.id, {
      trustScore,
      meshScore,
      phase,
      hubFlag,
      deviceTier,
      earnMode,
      testEarnActive,
      instances
    });
  }

  await batch.commit();

  log("hypothalamus", "Homeostasis scoring pass complete.");
}

// ======================================================
//  PUBLIC EXPORTS (for reuse / testing)
// ======================================================
export {
  calculateTrustScore,
  calculateMeshScore,
  calculatePhase,
  isHub,
  allocateInstances
};
