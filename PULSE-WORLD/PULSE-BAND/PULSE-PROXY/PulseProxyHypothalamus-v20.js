// ============================================================================
//  PULSE OS v20‑IMMORTALPLUS+++ — HYPOTHALAMUS
//  PulseUserScoring — Homeostasis Regulation Organ
//  Backend‑Only • Deterministic • Drift‑Proof • Dual‑Band • Advantage‑Aware
//  ROLE: Reads UserMetrics → Computes trustScore, meshScore, phase, hubFlag,
//        instance allocation → Writes UserScores.
//  v20‑IMMORTALPLUS+++ FULL ORGANISM FUSION EDITION
// ============================================================================
import {
  OrganismIdentity,
  buildPulseOrganismMap as PulseOrganismMap,
  buildPulseOrganismMap as buildOrganismMap
} from "./PULSE-WORLD-MAP.js";
const Identity = OrganismIdentity(import.meta.url);

// 2 — EXPORT GENOME METADATA
export const PulseUserScoringMeta = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
// export const PULSE_EARN_IMMUNE_CONTEXT = Identity.pulseLoreContext;
export const PulseHypothalamusExperienceMeta  = Identity.AI_EXPERIENCE_META;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// ============================================================================
//  GLOBAL WIRING — backend‑only, safe resolver
// ============================================================================
const G =
  typeof globalThis !== "undefined"
    ? globalThis
    : typeof global !== "undefined"
    ? global
    : {};

const db    = G.db    || null;
const log   = G.log   || console.log;
const error = G.error || console.error;

const Timestamp =
  (G.firebaseAdmin && G.firebaseAdmin.firestore.Timestamp) ||
  G.Timestamp ||
  null;


// ============================================================================
//  INTERNAL HELPERS — deterministic, pure, zero randomness
// ============================================================================
function computeHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `h${h}`;
}

// trustScore is 0–100; band thresholds in that space
function buildHypothalamusBand(trustScore) {
  const t = Number(trustScore || 0);
  if (t >= 75) return "symbolic";
  if (t >= 40) return "transition";
  return "binary";
}

function buildHypothalamusBandSignature(band) {
  return computeHash(`HYPOTHALAMUS_BAND::${band}`);
}

function buildBinaryField() {
  const patternLen = 18;
  const density = 18 + 36;
  const surface = density + patternLen;

  return {
    binaryPhenotypeSignature: `hypo-binary-pheno-${surface % 99991}`,
    binarySurfaceSignature: `hypo-binary-surface-${(surface * 13) % 99991}`,
    binarySurface: { patternLen, density, surface },
    parity: surface % 2 === 0 ? 0 : 1,
    shiftDepth: Math.max(0, Math.log2(surface || 1) | 0)
  };
}

function buildWaveField() {
  const amplitude = 16;
  const wavelength = amplitude + 6;
  const phase = amplitude % 16;

  return {
    amplitude,
    wavelength,
    phase,
    band: "symbolic-root",
    mode: "symbolic-wave"
  };
}

function buildHypothalamusCycleSignature(cycle) {
  return computeHash(`HYPOTHALAMUS_CYCLE::${cycle}`);
}

function buildAdvantageField(trustScore, meshScore, phase, hubFlag) {
  const t = Number(trustScore || 0) / 100;
  const m = Number(meshScore || 0) / 100;
  const p = Number(phase || 1) / 4;
  const h = hubFlag ? 1 : 0;

  const base = t * 0.4 + m * 0.3 + p * 0.2 + h * 0.1;
  const advantageScore = Math.max(0, Math.min(1, base));

  return {
    trustNorm: t,
    meshNorm: m,
    phaseNorm: p,
    hubNorm: h,
    advantageScore,
    advantageSignature: computeHash(
      `HYPOTHALAMUS_ADV::${t}::${m}::${p}::${h}::${advantageScore}`
    )
  };
}

function buildPresenceField(trustScore, meshScore) {
  const t = Number(trustScore || 0) / 100;
  const m = Number(meshScore || 0) / 100;
  const presence = Math.max(0, Math.min(1, (t + m) / 2));

  return {
    presence,
    presenceSignature: computeHash(`HYPOTHALAMUS_PRESENCE::${presence}`)
  };
}

function buildChunkCachePrewarmField(phase, hubFlag) {
  const p = Number(phase || 1);
  const hub = !!hubFlag;

  let chunkHint = "single-chunk";
  let cacheHint = "cache-light";
  let prewarmHint = "prewarm-optional";

  if (p >= 3) {
    chunkHint = "multi-chunk";
    cacheHint = "cache-medium";
  }
  if (hub) {
    chunkHint = "multi-chunk-heavy";
    cacheHint = "cache-heavy";
    prewarmHint = "prewarm-preferred";
  }

  return {
    chunkHint,
    cacheHint,
    prewarmHint,
    chunkCachePrewarmSignature: computeHash(
      `HYPOTHALAMUS_CHUNK_CACHE_PREWARM::${chunkHint}::${cacheHint}::${prewarmHint}`
    )
  };
}

function buildDualBandOverlay(dualBandContext) {
  const ctx =
    dualBandContext && typeof dualBandContext === "object"
      ? dualBandContext
      : {};

  const band = typeof ctx.band === "string" ? ctx.band : "unknown";
  const mode = typeof ctx.mode === "string" ? ctx.mode : "unknown";
  const presence = typeof ctx.presence === "string" ? ctx.presence : "unknown";

  return Object.freeze({
    band,
    mode,
    presence,
    overlaySignature: computeHash(
      `HYPOTHALAMUS_DUALBAND::${band}::${mode}::${presence}`
    )
  });
}

// ============================================================================
//  HYPOTHALAMUS CONTEXT — v20‑IMMORTALPLUS+++
// ============================================================================
let HYPOTHALAMUS_CYCLE = 0;

const HYPOTHALAMUS_CONTEXT = {
  layer: PulseRole.layer,
  role: "HYPOTHALAMUS",
  version: PulseRole.version,
  evo: PulseRole.evo,
  experienceMeta: PulseHypothalamusExperienceMeta
};

// ============================================================================
//  LAYER STATE (backend health)
// ============================================================================
G.PULSE_LAYER_STATE = G.PULSE_LAYER_STATE || {};
G.PULSE_LAYER_STATE[4] = {
  name: "Hypothalamus",
  ok: true,
  role: HYPOTHALAMUS_CONTEXT.role,
  version: HYPOTHALAMUS_CONTEXT.version
};

if (!db) {
  log("hypothalamus", "WARNING: db missing — scoring disabled until wiring completes.");
}

// ============================================================================
//  CONFIG — deterministic scoring limits (UNCHANGED)
// ============================================================================
export const NORMAL_MAX    = 4;
export const UPGRADED_MAX  = 8;
export const HIGHEND_MAX   = 8;
export const TEST_EARN_MAX = 16;

export const UPGRADED_MULT  = 2;
export const HIGHEND_MULT   = 2;
export const EARN_MODE_MULT = 1.5;

export const ENABLE_SCORING_LOGGING = true;
export const SCORING_LOG_COLLECTION = "UserScoringLogs";

// ============================================================================
//  TRUST SCORE — deterministic (UNCHANGED)
// ============================================================================
function calculateTrustScore(m) {
  if (!m) return 0;

  const totalRequests = Number(m.totalRequests || 0);
  const meshRelays    = Number(m.meshRelays || 0);
  const hubSignals    = Number(m.hubSignals || 0);
  const stability     = Number(m.stabilityScore || 0);
  const avgLatency    = m.avgLatency ? Number(m.avgLatency) : null;

  let score = 0;

  score += Math.min(totalRequests / 100, 20);
  score += Math.min(meshRelays / 10, 20);
  score += Math.min(hubSignals / 5, 20);
  if (avgLatency && avgLatency < 150) score += 20;
  score += Math.min(stability, 20);

  const final = Math.min(score, 100);

  log("hypothalamus", `HealthIndex | user=${m.userId ?? "?"} | score=${final}`);
  return final;
}

// ============================================================================
//  MESH SCORE — deterministic (UNCHANGED)
// ============================================================================
function calculateMeshScore(m) {
  if (!m) return 0;

  const meshRelays = Number(m.meshRelays || 0);
  const meshPings  = Number(m.meshPings || 0);
  const hubSignals = Number(m.hubSignals || 0);
  const avgLatency = m.avgLatency ? Number(m.avgLatency) : null;

  let score = 0;

  score += Math.min(meshRelays / 5, 40);
  score += Math.min(meshPings / 10, 20);
  score += Math.min(hubSignals / 5, 20);
  if (avgLatency && avgLatency < 150) score += 20;

  const final = Math.min(score, 100);

  log("hypothalamus", `MeshHealth | user=${m.userId ?? "?"} | score=${final}`);
  return final;
}

// ============================================================================
//  PHASE — deterministic (UNCHANGED)
// ============================================================================
function calculatePhase(trustScore) {
  const t = Number(trustScore || 0);
  let phase = 1;

  if (t < 25) phase = 1;
  else if (t < 50) phase = 2;
  else if (t < 75) phase = 3;
  else phase = 4;

  log("hypothalamus", `Phase | trustScore=${t} | phase=${phase}`);
  return phase;
}

// ============================================================================
//  HUB DETECTION — deterministic (UNCHANGED)
// ============================================================================
function isHub(m) {
  if (!m) return false;

  const meshRelays    = Number(m.meshRelays || 0);
  const hubSignals    = Number(m.hubSignals || 0);
  const totalRequests = Number(m.totalRequests || 0);

  const hub =
    meshRelays > 50 ||
    hubSignals > 20 ||
    totalRequests > 500;

  if (hub) {
    log(
      "hypothalamus",
      `HIGH-FLOW ORGAN | user=${m.userId ?? "?"} | relays=${meshRelays} | hubSignals=${hubSignals} | totalRequests=${totalRequests}`
    );
  }

  return hub;
}

// ============================================================================
//  INSTANCE FORMULA — deterministic (UNCHANGED)
// ============================================================================
function allocateInstances(
  phase,
  hubFlag,
  deviceTier,
  earnMode,
  testEarnActive
) {
  let base = phase >= 2 ? 2 : 1;

  if (hubFlag) base *= 2;
  if (deviceTier === "upgraded") base *= UPGRADED_MULT;
  if (deviceTier === "highend")  base *= HIGHEND_MULT;
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

// ============================================================================
//  SNAPSHOT LOGGING — backend‑safe (kept, but now advantage-aware)
// ============================================================================
async function logScoringSnapshot(userId, snapshot) {
  if (!ENABLE_SCORING_LOGGING || !db) return;

  try {
    await db.collection(SCORING_LOG_COLLECTION).add({
      ...HYPOTHALAMUS_CONTEXT,
      userId,
      ts: Date.now(),
      ...snapshot
    });

    log("hypothalamus", `Snapshot logged | user=${userId}`);
  } catch (err) {
    error("hypothalamus", "Failed to log scoring snapshot", String(err));
  }
}

// ============================================================================
//  HEALING STATE
// ============================================================================
const hypothalamusHealing = {
  cycles: 0,
  lastError: null,
  lastExitReason: null,
  lastCycleIndex: null,

  lastHypothalamusCycleSignature: null,
  lastBinaryField: null,
  lastWaveField: null,
  lastAdvantageField: null,
  lastPresenceField: null,
  lastChunkCachePrewarmField: null,
  lastDualBandOverlay: null
};

// ============================================================================
//  MAIN PASS — runUserScoring() (v20 IMMORTALPLUS+++)
// ============================================================================
export async function runUserScoring(dualBandContext = null) {
  HYPOTHALAMUS_CYCLE++;

  const hypothalamusCycleSignature = buildHypothalamusCycleSignature(HYPOTHALAMUS_CYCLE);
  const binaryField = buildBinaryField();
  const waveField = buildWaveField();
  const dualBandOverlay = buildDualBandOverlay(dualBandContext);

  log("hypothalamus", "HYPOTHALAMUS_START", {
    hypothalamusCycle: HYPOTHALAMUS_CYCLE,
    hypothalamusCycleSignature,
    binaryField,
    waveField,
    dualBandOverlay,
    ...HYPOTHALAMUS_CONTEXT
  });

  if (!db) {
    error("hypothalamus", "runUserScoring called but db is missing.");
    G.PULSE_LAYER_STATE[4].ok = false;
    G.PULSE_LAYER_STATE[4].lastError = "db_missing";
    hypothalamusHealing.lastError = { message: "db_missing", stage: "init" };
    hypothalamusHealing.lastExitReason = "db_missing";
    return { ok: false, error: "db_missing" };
  }

  let snap;
  try {
    snap = await db.collection("UserMetrics").get();
  } catch (err) {
    const msg = String(err);
    error("hypothalamus", "Failed to read UserMetrics", msg);
    G.PULSE_LAYER_STATE[4].ok = false;
    G.PULSE_LAYER_STATE[4].lastError = msg;
    hypothalamusHealing.lastError = { message: msg, stage: "read_UserMetrics" };
    hypothalamusHealing.lastExitReason = "read_UserMetrics_failed";
    return { ok: false, error: "read_UserMetrics_failed" };
  }

  const batch = db.batch();
  let processed = 0;

  for (const doc of snap.docs) {
    const m = doc.data() || {};
    m.userId = doc.id;

    const trustScore = calculateTrustScore(m);
    const meshScore  = calculateMeshScore(m);
    const phase      = calculatePhase(trustScore);
    const hubFlag    = isHub(m);

    const deviceTier     = m.deviceTier ?? "normal";
    const earnMode       = m.earnMode ?? false;
    const testEarnActive = m.testEarnActive ?? false;

    const instances = allocateInstances(
      phase,
      hubFlag,
      deviceTier,
      earnMode,
      testEarnActive
    );

    const band = buildHypothalamusBand(trustScore);
    const bandSignature = buildHypothalamusBandSignature(band);

    const advantageField = buildAdvantageField(trustScore, meshScore, phase, hubFlag);
    const presenceField = buildPresenceField(trustScore, meshScore);
    const chunkCachePrewarmField = buildChunkCachePrewarmField(phase, hubFlag);

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
        band,
        hypothalamusBandSignature: bandSignature,
        hypothalamusCycle: HYPOTHALAMUS_CYCLE,
        hypothalamusCycleSignature,
        binaryField,
        waveField,
        advantageField,
        presenceField,
        chunkCachePrewarmField,
        dualBandOverlay,
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
      instances,
      band,
      hypothalamusBandSignature: bandSignature,
      hypothalamusCycle: HYPOTHALAMUS_CYCLE,
      hypothalamusCycleSignature,
      advantageField,
      presenceField,
      chunkCachePrewarmField,
      dualBandOverlay
    });

    processed++;
  }

  try {
    await batch.commit();

    hypothalamusHealing.cycles = HYPOTHALAMUS_CYCLE;
    hypothalamusHealing.lastCycleIndex = HYPOTHALAMUS_CYCLE;
    hypothalamusHealing.lastHypothalamusCycleSignature = hypothalamusCycleSignature;
    hypothalamusHealing.lastBinaryField = binaryField;
    hypothalamusHealing.lastWaveField = waveField;
    hypothalamusHealing.lastAdvantageField = null; // per-user, not global
    hypothalamusHealing.lastPresenceField = null;  // per-user, not global
    hypothalamusHealing.lastChunkCachePrewarmField = null; // per-user
    hypothalamusHealing.lastDualBandOverlay = dualBandOverlay;
    hypothalamusHealing.lastError = null;
    hypothalamusHealing.lastExitReason = "ok";

    G.PULSE_LAYER_STATE[4].ok = true;
    G.PULSE_LAYER_STATE[4].lastError = null;

    log("hypothalamus", `Homeostasis scoring pass complete. Processed=${processed}`);
    return {
      ok: true,
      processed,
      hypothalamusCycle: HYPOTHALAMUS_CYCLE,
      hypothalamusCycleSignature,
      binaryField,
      waveField,
      dualBandOverlay
    };
  } catch (err) {
    const msg = String(err);
    error("hypothalamus", "Failed to commit UserScores batch", msg);
    G.PULSE_LAYER_STATE[4].ok = false;
    G.PULSE_LAYER_STATE[4].lastError = msg;
    hypothalamusHealing.lastError = { message: msg, stage: "commit_UserScores" };
    hypothalamusHealing.lastExitReason = "commit_UserScores_failed";

    return { ok: false, error: "commit_UserScores_failed" };
  }
}

// ============================================================================
//  HEALING / DIAGNOSTICS EXPORTS
// ============================================================================
export function getHypothalamusHealingState() {
  return { ...hypothalamusHealing };
}

export function getHypothalamusDiagnostics() {
  return {
    cycles: hypothalamusHealing.cycles,
    lastCycleIndex: hypothalamusHealing.lastCycleIndex,
    lastExitReason: hypothalamusHealing.lastExitReason,
    lastError: hypothalamusHealing.lastError,
    lastHypothalamusCycleSignature: hypothalamusHealing.lastHypothalamusCycleSignature,
    lastBinaryField: hypothalamusHealing.lastBinaryField,
    lastWaveField: hypothalamusHealing.lastWaveField,
    lastAdvantageField: hypothalamusHealing.lastAdvantageField,
    lastPresenceField: hypothalamusHealing.lastPresenceField,
    lastChunkCachePrewarmField: hypothalamusHealing.lastChunkCachePrewarmField,
    lastDualBandOverlay: hypothalamusHealing.lastDualBandOverlay
  };
}

// ============================================================================
//  PUBLIC EXPORTS
// ============================================================================
export {
  calculateTrustScore,
  calculateMeshScore,
  calculatePhase,
  isHub,
  allocateInstances,
  PulseHypothalamusExperienceMeta as HypothalamusExperienceMeta,
  PulseUserScoringMeta as HypothalamusMeta,
  PulseRole as HypothalamusRole
};
