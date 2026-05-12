// ============================================================================
//  PULSE OS v20‑IMMORTAL+++ — PROXY HEALER
//  “WHITE BLOOD CELL LAYER / IMMUNE PATROL”
//  Deterministic • Drift‑Proof • Proxy‑Only Healing Layer
//  PURE DETECTION. NO AI. NO BUSINESS MUTATION.
//  BINARY CORE + SYMBOLIC WRAPPER + PRESENCE / ADVANTAGE / CHUNK‑CACHE OVERLAYS
// ============================================================================
import {
  OrganismIdentity,
  buildPulseOrganismMap as PulseOrganismMap,
  buildPulseOrganismMap as buildOrganismMap
} from "./PULSE-WORLD-MAP.js";
const Identity = OrganismIdentity(import.meta.url);

// 2 — EXPORT GENOME METADATA
// export const PulseMeshMeta = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
export const WBC_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// ============================================================================
// GLOBAL WIRING — backend-only, no hard window/global coupling
// ============================================================================
const G =
  typeof globalThis !== "undefined"
    ? globalThis
    : typeof global !== "undefined"
    ? global
    : {};

const Timestamp =
  (G.firebaseAdmin && G.firebaseAdmin.firestore.Timestamp) ||
  G.Timestamp ||
  null;

const admin =
  (G.firebaseAdmin && G.firebaseAdmin) ||
  G.admin ||
  null;

const db =
  (G.db && G.db) ||
  (admin && admin.firestore && admin.firestore()) ||
  null;

const log =
  (G.log && G.log) ||
  console.log;

const error =
  (G.error && G.error) ||
  console.error;


const ImmuneState = {
  lastHealthScanTs: null,
  lastMetricsScanTs: null,
  lastScoresScanTs: null,
  lastHealthError: null,
  lastMetricsError: null,
  lastScoresError: null,
  status: "idle",

  lastBandSignature: null,
  lastBinaryField: null,
  lastWaveField: null,
  lastPresenceField: null,
  lastAdvantageField: null,
  lastChunkCacheHints: null,
  lastDualBandOverlay: null
};
// ============================================================================
//  IMMUNE CONFIG — thresholds (unchanged semantics)
// ============================================================================
export const PROXY_HEALTH_URL  =
  process.env.PULSE_PROXY_HEALTH_URL  || "http://localhost:8080/TPProxy/health";

export const PROXY_METRICS_URL =
  process.env.PULSE_PROXY_METRICS_URL || "http://localhost:8080/TPProxy/metrics";

export const HEALTH_INTERVAL_MS      = 30_000;
export const SCORES_SCAN_INTERVAL_MS = 60_000;

export const CPU_PRESSURE_WARN     = 80;
export const MEM_PRESSURE_WARN     = 80;
export const EVENT_LOOP_LAG_WARN   = 100;

export const MIN_INSTANCES = 1;
export const MAX_INSTANCES = 32;




// ============================================================================
// INTERNAL HELPERS — deterministic, pure
// ============================================================================
function computeHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `h${h}`;
}

function buildBandSignature(status) {
  const st = String(status || "unknown");
  return `immune-band-v20:${st}`;
}

function buildWaveField(healthResult) {
  const hr = healthResult || {};
  return {
    cpu: hr.cpuPercent ?? null,
    mem: hr.memPressure ?? null,
    lag: hr.eventLoopLagMs ?? null,
    waveSignature: computeHash(
      `IMMUNE_WAVE::${hr.cpuPercent ?? "x"}::${hr.memPressure ?? "x"}::${hr.eventLoopLagMs ?? "x"}`
    )
  };
}

function buildBinaryField(healthResult) {
  const hr = healthResult || {};
  const warnings = Array.isArray(hr.warnings) ? hr.warnings : [];
  const density = warnings.length;
  const surface = density + (hr.cpuPercent || 0) + (hr.memPressure || 0);

  return {
    warnings,
    cpu: hr.cpuPercent ?? null,
    mem: hr.memPressure ?? null,
    density,
    surface,
    binaryPhenotypeSignature: `immune-binary-pheno-${surface % 99991}`,
    binarySurfaceSignature: `immune-binary-surface-${(surface * 7) % 99991}`,
    parity: surface % 2 === 0 ? 0 : 1,
    shiftDepth: Math.max(0, Math.floor(Math.log2(surface || 1)))
  };
}

function buildPresenceField(status) {
  const st = String(status || "unknown");
  return {
    layer: "ImmuneLayer",
    state: st,
    presenceSignature: `immune-presence-${st}`
  };
}

function buildAdvantageFieldFromHealth(healthResult) {
  const hr = healthResult || {};
  const cpu = hr.cpuPercent ?? 0;
  const mem = hr.memPressure ?? 0;
  const lag = hr.eventLoopLagMs ?? 0;

  const pressure = Math.max(cpu / 100, mem / 100, lag / 500);
  const advantageScore = Math.max(0, 1 - pressure); // high pressure → low advantage

  return {
    advantageScore,
    pressure,
    advantageSignature: computeHash(
      `IMMUNE_ADVANTAGE::${cpu}::${mem}::${lag}::${advantageScore}`
    )
  };
}

function buildChunkCacheHintsFromHealth(healthResult) {
  const hr = healthResult || {};
  const warnings = Array.isArray(hr.warnings) ? hr.warnings : [];
  const hasPressure = warnings.length > 0;

  let chunkHint = "single-chunk";
  let cacheHint = "cache-light";
  let prewarmHint = "prewarm-optional";
  let routeWarmth = "cool";

  if (hasPressure) {
    chunkHint = "multi-chunk";
    cacheHint = "cache-heavy";
    prewarmHint = "prewarm-preferred";
    routeWarmth = "warm";
  }

  if (warnings.includes("cpu_high") || warnings.includes("memory_high")) {
    routeWarmth = "hot";
  }

  return {
    chunkHint,
    cacheHint,
    prewarmHint,
    routeWarmth,
    chunkCacheSignature: computeHash(
      `IMMUNE_CHUNK_CACHE::${chunkHint}::${cacheHint}::${prewarmHint}::${routeWarmth}`
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

  return {
    band,
    mode,
    presence,
    overlaySignature: computeHash(
      `IMMUNE_DUALBAND::${band}::${mode}::${presence}`
    )
  };
}


// ============================================================================
// writeHealerLog — v20 IMMORTAL+++ HEALER LOGGER
// ============================================================================
let HEALER_SEQ = 0;

export async function writeHealerLog({
  subsystem = "proxy",
  stage = "unknown",
  severity = "info",
  note = null,
  details = null,
  runId = null,
  uid = null,
  file = null,
  fn = null,
  type = null
} = {}) {
  if (!db || !admin || !admin.firestore) return null;

  try {
    const ts = Date.now();
    HEALER_SEQ += 1;
    const baseId = `HL_${ts}_${HEALER_SEQ}`;
    const id = computeHash(baseId);

    const payload = {
      ts,
      subsystem,
      stage,
      severity,
      type,
      note,
      details,
      runId,
      uid,
      file,
      fn,
      healerVersion: "v20-ImmortalPlusPlus",
      layer: "backend_healer",
      context: { ...WBC_CONTEXT },
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    };

    await db.collection("FUNCTION_LOGS").doc(id).set(payload);
    return id;

  } catch (err) {
    try {
      await db.collection("FUNCTION_ERRORS").add({
        ts: Date.now(),
        fn: "writeHealerLog",
        error: String(err),
        stage: "healer_log_failure",
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });
    } catch (_) {}
    return null;
  }
}


// ============================================================================
//  BINARY CORE — v20 (same logic, richer surfaces)
// ============================================================================
function classifyPressureBinary(metrics) {
  if (!metrics || typeof metrics !== "object") {
    return {
      status: "unknown",
      warnings: [],
      cpuPercent: null,
      memPressure: null,
      eventLoopLagMs: null
    };
  }

  const cpuPercent     = metrics.cpu?.percent ?? null;
  const memPressure    = metrics.memory?.pressure ?? null;
  const eventLoopLagMs = metrics.eventLoopLagMs ?? null;

  const warnings = [];

  if (cpuPercent     > CPU_PRESSURE_WARN)   warnings.push("cpu_high");
  if (memPressure    > MEM_PRESSURE_WARN)   warnings.push("memory_high");
  if (eventLoopLagMs > EVENT_LOOP_LAG_WARN) warnings.push("event_loop_lag_high");

  const status = warnings.length === 0 ? "healthy" : "warning";

  return {
    status,
    warnings,
    cpuPercent,
    memPressure,
    eventLoopLagMs
  };
}

function evaluateUserScoreBinary(scoreDoc) {
  if (!scoreDoc || typeof scoreDoc !== "object") {
    return {
      outOfBounds: false,
      upgradeHint: false,
      reviewHint: false
    };
  }

  const trustScore = scoreDoc.trustScore ?? 0;
  const instances  = scoreDoc.instances ?? 1;

  const outOfBounds =
    instances < MIN_INSTANCES || instances > MAX_INSTANCES;

  const upgradeHint =
    !outOfBounds && trustScore > 80 && instances < 4;

  const reviewHint =
    !outOfBounds && trustScore < 20 && instances > 4;

  return {
    outOfBounds,
    upgradeHint,
    reviewHint,
    trustScore,
    instances
  };
}

function buildImmuneSnapshotBinary({ healthResult, scoreHints, ts }) {
  return {
    ts,
    status: healthResult?.status ?? "unknown",
    warnings: healthResult?.warnings ?? [],
    cpuPercent: healthResult?.cpuPercent ?? null,
    memPressure: healthResult?.memPressure ?? null,
    eventLoopLagMs: healthResult?.eventLoopLagMs ?? null,
    scoreHints,
    meta: { ...WBC_CONTEXT }
  };
}

export const ProxyHealerBinary = {
  classifyPressure: classifyPressureBinary,
  evaluateUserScore: evaluateUserScoreBinary,
  buildSnapshot: buildImmuneSnapshotBinary
};


// ============================================================================
//  SYMBOLIC WRAPPER — v20 (fetch + db + intervals + presence/advantage/chunk)
// ============================================================================
async function checkProxyHealthAndMetrics({ dualBandContext = null } = {}) {
  ImmuneState.status = "scanning";
  ImmuneState.lastHealthScanTs = Date.now();
  log("wbc", "scan_start_v20");

  let health = null;
  let metrics = null;

  try {
    const res = await fetch(PROXY_HEALTH_URL);
    health = await res.json().catch(() => null);
  } catch (err) {
    const msg = String(err);
    ImmuneState.lastHealthError = msg;
    error("wbc", "health_fetch_failed", { error: msg });
    await writeHealerLog({ type: "health_error", stage: "health_fetch", details: { error: msg } });
  }

  try {
    const res = await fetch(PROXY_METRICS_URL);
    metrics = await res.json().catch(() => null);
  } catch (err) {
    const msg = String(err);
    ImmuneState.lastMetricsError = msg;
    error("wbc", "metrics_fetch_failed", { error: msg });
    await writeHealerLog({ type: "metrics_error", stage: "metrics_fetch", details: { error: msg } });
  }

  if (!metrics) {
    ImmuneState.status = "degraded";
    return;
  }

  ImmuneState.lastMetricsScanTs = Date.now();

  const healthResult = ProxyHealerBinary.classifyPressure(metrics);

  const bandSignature   = buildBandSignature(healthResult.status);
  const waveField       = buildWaveField(healthResult);
  const binaryField     = buildBinaryField(healthResult);
  const presenceField   = buildPresenceField(healthResult.status);
  const advantageField  = buildAdvantageFieldFromHealth(healthResult);
  const chunkCacheHints = buildChunkCacheHintsFromHealth(healthResult);
  const dualBandOverlay = buildDualBandOverlay(dualBandContext);

  ImmuneState.lastBandSignature   = bandSignature;
  ImmuneState.lastWaveField       = waveField;
  ImmuneState.lastBinaryField     = binaryField;
  ImmuneState.lastPresenceField   = presenceField;
  ImmuneState.lastAdvantageField  = advantageField;
  ImmuneState.lastChunkCacheHints = chunkCacheHints;
  ImmuneState.lastDualBandOverlay = dualBandOverlay;

  if (healthResult.warnings.length) {
    ImmuneState.status = "warning";

    await writeHealerLog({
      type: "proxy_pressure_warning",
      stage: "pressure_scan",
      severity: "warn",
      details: {
        bandSignature,
        waveField,
        binaryField,
        presenceField,
        advantageField,
        chunkCacheHints,
        dualBandOverlay
      }
    });
  } else {
    ImmuneState.status = "healthy";
  }
}

async function scanUserScoresForInstanceHints() {
  if (!db) return;

  ImmuneState.lastScoresScanTs = Date.now();

  let snap;
  try {
    snap = await db.collection("UserScores").get();
  } catch (err) {
    const msg = String(err);
    ImmuneState.lastScoresError = msg;
    await writeHealerLog({
      type: "scores_fetch_error",
      stage: "scores_fetch",
      severity: "error",
      details: { error: msg }
    });
    return;
  }

  for (const doc of snap.docs) {
    const s = doc.data() || {};
    const userId = doc.id;

    const hint = ProxyHealerBinary.evaluateUserScore(s);

    const bandSignature = buildBandSignature(hint.outOfBounds ? "critical" : "ok");
    const waveField     = { trust: hint.trustScore, instances: hint.instances };
    const binaryField   = { trust: hint.trustScore, instances: hint.instances };
    const presenceField = buildPresenceField(hint.outOfBounds ? "critical" : "ok");

    const logBase = {
      userId,
      bandSignature,
      waveField,
      binaryField,
      presenceField
    };

    if (hint.outOfBounds) {
      await writeHealerLog({
        type: "instance_out_of_bounds",
        stage: "scores_scan",
        severity: "warn",
        details: logBase
      });
      continue;
    }

    if (hint.upgradeHint) {
      await writeHealerLog({
        type: "instance_upgrade_hint",
        stage: "scores_scan",
        severity: "info",
        details: logBase
      });
    }

    if (hint.reviewHint) {
      await writeHealerLog({
        type: "instance_review_hint",
        stage: "scores_scan",
        severity: "info",
        details: logBase
      });
    }
  }
}


// ============================================================================
//  PUBLIC: startPulseProxyHealer() — immune patrol loop (symbolic wrapper)
// ============================================================================
export default function startPulseProxyHealer() {
  log("wbc", "immune_patrol_start_v20", WBC_CONTEXT);

  setInterval(() => {
    checkProxyHealthAndMetrics().catch(err =>
      error("wbc", "health_loop_error", { error: String(err) })
    );
  }, HEALTH_INTERVAL_MS);

  setInterval(() => {
    scanUserScoresForInstanceHints().catch(err =>
      error("wbc", "scores_loop_error", { error: String(err) })
    );
  }, SCORES_SCAN_INTERVAL_MS);

  log("wbc", "immune_patrol_active_v20", {
    ...WBC_CONTEXT,
    healthIntervalMs: HEALTH_INTERVAL_MS,
    scoresIntervalMs: SCORES_SCAN_INTERVAL_MS
  });
}


// ============================================================================
//  EXPORTED IMMUNE STATE
// ============================================================================
export function getProxyImmuneState() {
  return {
    ...ImmuneState,
    bandSignature: ImmuneState.lastBandSignature || buildBandSignature(ImmuneState.status),
    presenceField: ImmuneState.lastPresenceField || buildPresenceField(ImmuneState.status),
    context: { ...WBC_CONTEXT }
  };
}
