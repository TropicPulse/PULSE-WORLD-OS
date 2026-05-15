/*
===============================================================================
FILE: /PULSE-PROXY/PULSE-WORLD-BAND/PulseWorldBandCheckBand-v30.js
ORGAN: PulseWorldBandCheckBand
LAYER: WORLD BACKEND — WORLDBAND PRESENCE/ADVANTAGE ORCHESTRATOR — v30-IMMORTAL-BINARY
===============================================================================
*/

export const AI_EXPERIENCE_META = {
  identity: "PulseWorldBand.CheckBand",
  version: "v30-Immortal-Binary",
  layer: "pulse_world_backend",
  role: "worldband_presence_advantage_orchestrator",
  lineage:
    "PulseWorldBand-v20 → v24-ImmortalPlus-WorldBand-Presence-Advantage → v30-Immortal-Binary",

  evo: {
    backendOrgan: true,
    worldBandController: true,
    presenceAware: true,
    pulseAware: true,
    advantageAware: true,
    touchAware: true,

    binaryFirst: true,
    worldBinaryAware: true,
    meshAware: true,
    routerAware: true,
    satelliteAware: true,

    throughputAware: true,
    chunkerAware: true,
    cacheAware: true,

    deterministicPerTick: true,
    driftProofBands: true,

    zeroDOM: true,
    zeroWindow: true,
    zeroUI: true,
    zeroRuntimeMutation: true
  },

  contract: {
    always: [
      "Logger",
      "PulseLineage",
      "WorldBinaryCore",
      "ChunkerFactory",
      "IndexedStorage"
    ],
    never: [
      "window",
      "document",
      "DOM",
      "eval",
      "dynamicImport"
    ]
  }
};

export const EXPORT_META = {
  organ: "PulseWorldBand.CheckBand",
  layer: "pulse_world_backend",
  stability: "IMMORTAL",
  deterministic: "per-tick",

  consumes: [
    "UserScoresSnapshot",
    "BackendPulse",
    "Chunker",
    "WorldBinaryCore",
    "IndexedStorage"
  ],

  produces: [
    "WorldBandSnapshot",
    "UserBandState",
    "WorldBandDiagnostics",
    "BinaryBandSurface",
    "ChunkedBandSnapshot"
  ],

  sideEffects: "log_only",
  network: "none",
  filesystem: "band_logs_only"
};

// ============================================================================
// MODES — Orchestrator routing modes
// ============================================================================
export const ORCHESTRATOR_MODES = {
  NORMAL: "normal",
  EARN_STRESS: "earn-stress",
  DRAIN: "drain"
};

// ============================================================================
// CONFIG — Physiological Limits (drift-proof, binary-aware)
// ============================================================================
export const NORMAL_MAX = 4;
export const UPGRADED_MAX = 8;
export const HIGHEND_MAX = 8;
export const TEST_EARN_MAX = 16;

export const UPGRADED_MULT = 2;
export const HIGHEND_MULT = 2;
export const EARN_MODE_MULT = 1.5;

export const ENABLE_INSTANCE_LOGGING = true;
export const INSTANCE_LOG_COLLECTION = "UserInstanceLogs";

export const PULSE_QUALITY = {
  EXCELLENT: "excellent",
  GOOD: "good",
  WEAK: "weak",
  CRITICAL: "critical",
  UNKNOWN: "unknown"
};

export const PRESENCE_TIER = {
  FULL: "full",
  PARTIAL: "partial",
  BACKGROUND: "background",
  OFFLINE: "offline",
  UNKNOWN: "unknown"
};

// ============================================================================
// INTERNAL STATE — Active “cells” per user (CHECKBAND REGISTRY)
// ============================================================================
const activeWorkers = new Map();      // userId -> worker[]
let lastBandStateSnapshot = null;     // last global band state snapshot
const userBandCache = new Map();      // userId -> last user band state
let adrenalSeq = 0;                   // deterministic sequence counter

// ============================================================================
// BINARY HELPERS — Instance Signatures + Drift Flags
// ============================================================================
function computeBinaryInstanceSignature(userId, index, deviceTier, mode) {
  const seed = `${userId}|${index}|${deviceTier}|${mode}|${adrenalSeq}`;
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return "BAND-BIN-" + hash.toString(16).padStart(8, "0");
}

function computeBandDriftFlags(finalInstances, maxAllowed) {
  const flags = [];
  if (finalInstances > maxAllowed) {
    flags.push("band_exceeds_device_max");
  }
  if (finalInstances <= 0) {
    flags.push("band_zero_or_negative");
  }
  return flags;
}

// ============================================================================
// DEVICE TIER → MAX INSTANCES (deterministic)
// ============================================================================
function getDeviceMax(deviceTier, testEarnActive, orchestratorMode) {
  if (orchestratorMode === ORCHESTRATOR_MODES.DRAIN) {
    return 1;
  }

  if (testEarnActive) {
    return TEST_EARN_MAX;
  }

  switch (deviceTier) {
    case "upgraded":
      return UPGRADED_MAX;
    case "highend":
      return HIGHEND_MAX;
    default:
      return NORMAL_MAX;
  }
}

// ============================================================================
// PULSE / PRESENCE DEGRADE FACTOR — deterministic fallback ladder
// ============================================================================
function computePulsePresenceDegradeFactor(pulseQuality, presenceTier) {
  const pq = pulseQuality || PULSE_QUALITY.UNKNOWN;
  const pt = presenceTier || PRESENCE_TIER.UNKNOWN;

  let factor = 1.0;
  if (pq === PULSE_QUALITY.EXCELLENT) factor = 1.0;
  else if (pq === PULSE_QUALITY.GOOD) factor = 0.85;
  else if (pq === PULSE_QUALITY.WEAK) factor = 0.6;
  else if (pq === PULSE_QUALITY.CRITICAL) factor = 0.35;
  else factor = 0.7;

  if (pt === PRESENCE_TIER.FULL) {
    factor *= 1.0;
  } else if (pt === PRESENCE_TIER.PARTIAL) {
    factor *= 0.85;
  } else if (pt === PRESENCE_TIER.BACKGROUND) {
    factor *= 0.6;
  } else if (pt === PRESENCE_TIER.OFFLINE) {
    factor *= 0.4;
  } else {
    factor *= 0.75;
  }

  if (factor > 1.0) factor = 1.0;
  if (factor <= 0) factor = 0.2;

  return factor;
}

// ============================================================================
// ADVANTAGE SCORE — presence/pulse/BT → scalar
// ============================================================================
function computeBandAdvantageScore({
  pulseQuality,
  presenceTier,
  bluetoothPresence,
  finalInstances
}) {
  const pq = pulseQuality || PULSE_QUALITY.UNKNOWN;
  const pt = presenceTier || PRESENCE_TIER.UNKNOWN;
  const bt = !!bluetoothPresence;

  let score = 0;

  if (pq === PULSE_QUALITY.EXCELLENT) score += 4;
  else if (pq === PULSE_QUALITY.GOOD) score += 3;
  else if (pq === PULSE_QUALITY.WEAK) score += 2;
  else if (pq === PULSE_QUALITY.CRITICAL) score += 1;
  else score += 2;

  if (pt === PRESENCE_TIER.FULL) score += 4;
  else if (pt === PRESENCE_TIER.PARTIAL) score += 3;
  else if (pt === PRESENCE_TIER.BACKGROUND) score += 2;
  else if (pt === PRESENCE_TIER.OFFLINE) score += 1;
  else score += 2;

  if (bt) score += 2;

  if (finalInstances >= 4) score += 2;
  else if (finalInstances >= 2) score += 1;

  if (score > 10) score = 10;
  if (score < 0) score = 0;

  return score;
}

// ============================================================================
// TOUCH / PRESENCE DRIFT FLAGS
// ============================================================================
function computePresenceDriftFlags({ pulseQuality, presenceTier, bluetoothPresence }) {
  const flags = [];
  const pq = pulseQuality || PULSE_QUALITY.UNKNOWN;
  const pt = presenceTier || PRESENCE_TIER.UNKNOWN;
  const bt = !!bluetoothPresence;

  if (pt === PRESENCE_TIER.OFFLINE && bt) {
    flags.push("offline_but_bluetooth_present");
  }
  if (pq === PULSE_QUALITY.CRITICAL && pt === PRESENCE_TIER.FULL) {
    flags.push("critical_pulse_full_presence_mismatch");
  }
  if (pq === PULSE_QUALITY.EXCELLENT && pt === PRESENCE_TIER.OFFLINE) {
    flags.push("excellent_pulse_offline_presence_mismatch");
  }

  return flags;
}

// ============================================================================
// COMPUTE FINAL INSTANCE COUNT — Deterministic + presence/pulse aware
// ============================================================================
function computeFinalInstances(
  base,
  deviceTier,
  earnMode,
  testEarnActive,
  orchestratorMode,
  pulseQuality,
  presenceTier
) {
  let final = base;

  if (orchestratorMode === ORCHESTRATOR_MODES.DRAIN) {
    final = 1;
  } else {
    if (deviceTier === "upgraded") final *= UPGRADED_MULT;
    if (deviceTier === "highend") final *= HIGHEND_MULT;

    if (earnMode) {
      final = Math.floor(final * EARN_MODE_MULT);
    }

    if (orchestratorMode === ORCHESTRATOR_MODES.EARN_STRESS) {
      final = Math.max(final, base * 2);
    }

    if (testEarnActive) {
      final = TEST_EARN_MAX;
    }
  }

  const degradeFactor = computePulsePresenceDegradeFactor(
    pulseQuality,
    presenceTier
  );
  final = Math.floor(final * degradeFactor);

  const max = getDeviceMax(deviceTier, testEarnActive, orchestratorMode);
  const clamped = Math.max(1, Math.min(final, max));

  return {
    finalInstances: clamped,
    maxAllowed: max,
    degradeFactor,
    driftFlags: computeBandDriftFlags(clamped, max)
  };
}

// ============================================================================
// WORLD-BAND PROJECTION — deterministic world-lens view of band state
// ============================================================================
function computeWorldBandProjection({
  finalInstances,
  pulseQuality,
  presenceTier,
  bluetoothPresence
}) {
  const pq = pulseQuality || PULSE_QUALITY.UNKNOWN;
  const pt = presenceTier || PRESENCE_TIER.UNKNOWN;

  let localWeight = 0.5;
  let edgeWeight = 0.3;
  let meshWeight = 0.2;

  if (pt === PRESENCE_TIER.FULL) {
    localWeight = 0.7;
    edgeWeight = 0.2;
    meshWeight = 0.1;
  } else if (pt === PRESENCE_TIER.PARTIAL) {
    localWeight = 0.55;
    edgeWeight = 0.3;
    meshWeight = 0.15;
  } else if (pt === PRESENCE_TIER.BACKGROUND) {
    localWeight = 0.4;
    edgeWeight = 0.35;
    meshWeight = 0.25;
  } else if (pt === PRESENCE_TIER.OFFLINE) {
    localWeight = 0.25;
    edgeWeight = 0.4;
    meshWeight = 0.35;
  }

  if (pq === PULSE_QUALITY.EXCELLENT) {
    meshWeight += 0.05;
    edgeWeight += 0.05;
    localWeight -= 0.1;
  } else if (pq === PULSE_QUALITY.CRITICAL) {
    meshWeight -= 0.05;
    localWeight += 0.05;
  }

  function clamp01(v) {
    if (v < 0) return 0;
    if (v > 1) return 1;
    return v;
  }

  localWeight = clamp01(localWeight);
  edgeWeight = clamp01(edgeWeight);
  meshWeight = clamp01(meshWeight);

  const sum = localWeight + edgeWeight + meshWeight || 1;
  localWeight /= sum;
  edgeWeight /= sum;
  meshWeight /= sum;

  const fastLaneEligible =
    pq === PULSE_QUALITY.EXCELLENT &&
    (pt === PRESENCE_TIER.FULL || pt === PRESENCE_TIER.PARTIAL) &&
    !!bluetoothPresence &&
    finalInstances >= 2;

  return {
    localWeight,
    edgeWeight,
    meshWeight,
    fastLaneEligible
  };
}

// ============================================================================
// BINARY BAND SURFACE — v30 (for WorldBinaryCore / router / mesh)
// ============================================================================
function buildBinaryBandSurface(userBandState) {
  const {
    userId,
    finalInstances,
    deviceTier,
    pulseQuality,
    presenceTier,
    bluetoothPresence,
    worldBandProjection,
    bandAdvantageScore,
    binaryBandSignature
  } = userBandState;

  const throughputClass =
    finalInstances >= 8 ? "throughput_high" :
    finalInstances >= 4 ? "throughput_medium" :
    "throughput_low";

  const throughputScore =
    finalInstances >= 8 ? 0.8 :
    finalInstances >= 4 ? 0.6 :
    0.4;

  const binaryDensity =
    pulseQuality === PULSE_QUALITY.EXCELLENT ? 0.9 :
    pulseQuality === PULSE_QUALITY.GOOD ? 0.75 :
    pulseQuality === PULSE_QUALITY.WEAK ? 0.5 :
    0.3;

  return {
    id: `band::${userId}`,
    kind: "world_band",
    userId,
    deviceTier,
    finalInstances,
    pulseQuality,
    presenceTier,
    bluetoothPresence,
    binaryBandSignature,
    throughputClass,
    throughputScore,
    binaryDensity,
    advantageScore: bandAdvantageScore,
    localWeight: worldBandProjection?.localWeight ?? 0.33,
    edgeWeight: worldBandProjection?.edgeWeight ?? 0.33,
    meshWeight: worldBandProjection?.meshWeight ?? 0.34,
    fastLaneEligible: !!worldBandProjection?.fastLaneEligible,
    baseFormulaKey: "world_band_v30"
  };
}

// ============================================================================
// LOG USER SNAPSHOT — backend storage (IndexedStorage / db-like)
// ============================================================================
async function logUserInstanceSnapshot({
  storage,
  userId,
  snapshot,
  PulseLineage,
  Logger
}) {
  if (!ENABLE_INSTANCE_LOGGING || !storage) return;

  const log = Logger?.log || console.log;

  try {
    await storage.append(INSTANCE_LOG_COLLECTION, {
      userId,
      seq: ++adrenalSeq,
      lineage: PulseLineage || null,
      ...snapshot
    });
    log("[CheckBand v30] snapshot logged", { userId, seq: adrenalSeq });
  } catch (err) {
    const error = Logger?.error || console.error;
    error("[CheckBand v30] snapshot_log_failed", { error: String(err) });
  }
}

// ============================================================================
// LAUNCH / KILL WORKER — metadata only (no real threads here)
// ============================================================================
function launchWorker({ userId, workerIndex, orchestratorMode, deviceTier, Logger }) {
  const log = Logger?.log || console.log;
  const workerName = `${userId}-instance-${workerIndex}`;
  const binarySignature = computeBinaryInstanceSignature(
    userId,
    workerIndex,
    deviceTier,
    orchestratorMode
  );

  log("[CheckBand v30] launch", {
    userId,
    workerName,
    workerIndex,
    mode: orchestratorMode,
    deviceTier,
    binarySignature
  });

  return {
    name: workerName,
    userId,
    index: workerIndex,
    mode: orchestratorMode,
    deviceTier,
    seq: ++adrenalSeq,
    binarySignature
  };
}

function killWorker(worker, Logger) {
  const log = Logger?.log || console.log;
  log("[CheckBand v30] shutdown", {
    worker: worker.name,
    mode: worker.mode,
    binarySignature: worker.binarySignature
  });
}

// ============================================================================
// BAND STATE SNAPSHOT + DIAGNOSTICS SURFACES
// ============================================================================
function buildUserBandState({
  userId,
  baseInstances,
  finalInstances,
  deviceTier,
  earnMode,
  testEarnActive,
  currentWorkers,
  maxAllowed,
  mode,
  pulseQuality,
  presenceTier,
  bluetoothPresence,
  degradeFactor,
  binaryBandSignature,
  driftFlags,
  worldBandProjection,
  bandAdvantageScore,
  presenceDriftFlags,
  touchHint
}) {
  return {
    userId,
    baseInstances,
    finalInstances,
    deviceTier,
    earnMode,
    testEarnActive,
    currentWorkers,
    maxAllowed,
    mode,
    pulseQuality,
    presenceTier,
    bluetoothPresence,
    degradeFactor,
    binaryBandSignature,
    driftFlags,
    worldBandProjection,
    bandAdvantageScore,
    presenceDriftFlags,
    touchHint
  };
}

function buildGlobalBandSnapshot({ mode, users, meta }) {
  return {
    meta,
    mode,
    users,
    seq: adrenalSeq
  };
}

export function getCheckBandStateSnapshot() {
  return lastBandStateSnapshot || null;
}

export function getCheckBandDiagnostics() {
  const snapshot = lastBandStateSnapshot || { users: [] };
  const totalUsers = snapshot.users.length;
  let totalInstances = 0;
  let fastLaneEligibleUsers = 0;

  for (const u of snapshot.users) {
    totalInstances += u.currentWorkers || 0;
    if (u.worldBandProjection?.fastLaneEligible) {
      fastLaneEligibleUsers += 1;
    }
  }

  return {
    totalUsers,
    totalInstances,
    fastLaneEligibleUsers,
    mode: snapshot.mode || ORCHESTRATOR_MODES.NORMAL,
    seq: snapshot.seq || adrenalSeq
  };
}

// ============================================================================
// PURE PROJECTION HELPER — cache/prewarm-friendly
// ============================================================================
export function projectWorldBandForUser({
  userId,
  data,
  orchestratorMode = ORCHESTRATOR_MODES.NORMAL
}) {
  const baseInstances = data.instances ?? 1;
  const deviceTier = data.deviceTier ?? "normal";
  const earnMode = data.earnMode ?? false;
  const testEarnActive = data.testEarnActive ?? false;

  const pulseQuality = data.pulseQuality || PULSE_QUALITY.UNKNOWN;
  const presenceTier = data.presenceTier || PRESENCE_TIER.UNKNOWN;
  const bluetoothPresence = !!data.bluetoothPresence;

  const {
    finalInstances,
    maxAllowed,
    degradeFactor,
    driftFlags
  } = computeFinalInstances(
    baseInstances,
    deviceTier,
    earnMode,
    testEarnActive,
    orchestratorMode,
    pulseQuality,
    presenceTier
  );

  const worldBandProjection = computeWorldBandProjection({
    finalInstances,
    pulseQuality,
    presenceTier,
    bluetoothPresence
  });

  const bandAdvantageScore = computeBandAdvantageScore({
    pulseQuality,
    presenceTier,
    bluetoothPresence,
    finalInstances
  });

  const presenceDriftFlags = computePresenceDriftFlags({
    pulseQuality,
    presenceTier,
    bluetoothPresence
  });

  const binaryBandSignatureSeed =
    `${userId}|${finalInstances}|` +
    `${deviceTier}|${orchestratorMode}|${adrenalSeq}|` +
    `${pulseQuality}|${presenceTier}`;
  let bandHash = 0;
  for (let i = 0; i < binaryBandSignatureSeed.length; i++) {
    bandHash =
      (bandHash * 31 + binaryBandSignatureSeed.charCodeAt(i)) >>> 0;
  }
  const binaryBandSignature =
    "BAND-STATE-" + bandHash.toString(16).padStart(8, "0");

  return {
    userId,
    baseInstances,
    finalInstances,
    deviceTier,
    earnMode,
    testEarnActive,
    maxAllowed,
    mode: orchestratorMode,
    pulseQuality,
    presenceTier,
    bluetoothPresence,
    degradeFactor,
    binaryBandSignature,
    driftFlags,
    worldBandProjection,
    bandAdvantageScore,
    presenceDriftFlags
  };
}

// ============================================================================
// FACTORY — IMMORTAL BACKEND CHECKBAND ENGINE (no window/db)
// ============================================================================
export function createPulseWorldBandCheckBand({
  UserScoresStore,   // async { getAll(): Promise<Array<{id, data}>> }
  ChunkerFactory,    // optional: create chunker for snapshots
  WorldBinaryCore,   // optional: register BinaryBandSurface
  IndexedStorage,    // optional: append logs
  PulseLineage,
  Logger
} = {}) {
  const log = Logger?.log || console.log;
  const error = Logger?.error || console.error;

  const Chunker =
    typeof ChunkerFactory === "function"
      ? ChunkerFactory({ Logger })
      : null;

  const storage = IndexedStorage || null;

  function safeLog(stage, details = {}) {
    try {
      log("[CheckBand v30]", stage, JSON.stringify(details));
    } catch {
      // never throw
    }
  }

  async function runInstanceOrchestrator(pulse) {
    safeLog("tick_start", pulse || {});

    let userDocs;
    try {
      userDocs = await UserScoresStore.getAll();
      safeLog("UserScores_fetched", { size: userDocs.length });
    } catch (err) {
      error("[CheckBand v30] FAILED to fetch UserScores", String(err));
      return false;
    }

    const orchestratorMode =
      pulse?.mode && Object.values(ORCHESTRATOR_MODES).includes(pulse.mode)
        ? pulse.mode
        : ORCHESTRATOR_MODES.NORMAL;

    const touchHint =
      pulse?.touchHint ||
      pulse?.pulseTouch ||
      null;

    const usersState = [];
    const binarySurfaces = [];

    for (const doc of userDocs) {
      const userId = doc.id;
      let data;
      try {
        data = doc.data || doc.data() || {};
      } catch (err) {
        error("[CheckBand v30] FAILED to read user doc", userId, String(err));
        continue;
      }

      const baseInstances   = data.instances ?? 1;
      const deviceTier      = data.deviceTier ?? "normal";
      const earnMode        = data.earnMode ?? false;
      const testEarnActive  = data.testEarnActive ?? false;

      const pulseQuality      = data.pulseQuality || PULSE_QUALITY.UNKNOWN;
      const presenceTier      = data.presenceTier || PRESENCE_TIER.UNKNOWN;
      const bluetoothPresence = !!data.bluetoothPresence;

      let finalInstances, maxAllowed, degradeFactor, driftFlags;
      try {
        ({
          finalInstances,
          maxAllowed,
          degradeFactor,
          driftFlags
        } = computeFinalInstances(
          baseInstances,
          deviceTier,
          earnMode,
          testEarnActive,
          orchestratorMode,
          pulseQuality,
          presenceTier
        ));
      } catch (err) {
        error("[CheckBand v30] FAILED computeFinalInstances", userId, String(err));
        continue;
      }

      if (!activeWorkers.has(userId)) {
        activeWorkers.set(userId, []);
      }

      const currentWorkers = activeWorkers.get(userId);

      // SCALE UP
      if (currentWorkers.length < finalInstances) {
        const needed = finalInstances - currentWorkers.length;
        for (let i = 0; i < needed; i++) {
          try {
            const workerIndex = currentWorkers.length;
            const worker = launchWorker({
              userId,
              workerIndex,
              orchestratorMode,
              deviceTier,
              Logger
            });
            currentWorkers.push(worker);
          } catch (err) {
            error("[CheckBand v30] FAILED to launch worker", String(err));
          }
        }
      }

      // SCALE DOWN
      if (currentWorkers.length > finalInstances) {
        const extra = currentWorkers.length - finalInstances;
        for (let i = 0; i < extra; i++) {
          try {
            const worker = currentWorkers.pop();
            if (worker) killWorker(worker, Logger);
          } catch (err) {
            error("[CheckBand v30] FAILED to kill worker", String(err));
          }
        }
      }

      // BINARY BAND SIGNATURE
      let binaryBandSignature = "BAND-STATE-ERR";
      try {
        const bandSeed =
          `${userId}|${currentWorkers.length}|` +
          `${deviceTier}|${orchestratorMode}|${adrenalSeq}|` +
          `${pulseQuality}|${presenceTier}`;

        let bandHash = 0;
        for (let i = 0; i < bandSeed.length; i++) {
          bandHash = (bandHash * 31 + bandSeed.charCodeAt(i)) >>> 0;
        }

        binaryBandSignature =
          "BAND-STATE-" + bandHash.toString(16).padStart(8, "0");
      } catch (err) {
        error("[CheckBand v30] FAILED to compute band signature", String(err));
      }

      // WORLD-BAND PROJECTION
      let worldBandProjection = null;
      try {
        worldBandProjection = computeWorldBandProjection({
          finalInstances,
          pulseQuality,
          presenceTier,
          bluetoothPresence
        });
      } catch (err) {
        error("[CheckBand v30] FAILED computeWorldBandProjection", String(err));
      }

      // ADVANTAGE SCORE
      let bandAdvantageScore = null;
      try {
        bandAdvantageScore = computeBandAdvantageScore({
          pulseQuality,
          presenceTier,
          bluetoothPresence,
          finalInstances
        });
      } catch (err) {
        error("[CheckBand v30] FAILED computeBandAdvantageScore", String(err));
      }

      // PRESENCE DRIFT FLAGS
      let presenceDriftFlags = null;
      try {
        presenceDriftFlags = computePresenceDriftFlags({
          pulseQuality,
          presenceTier,
          bluetoothPresence
        });
      } catch (err) {
        error("[CheckBand v30] FAILED computePresenceDriftFlags", String(err));
      }

      let userBandState;
      try {
        userBandState = buildUserBandState({
          userId,
          baseInstances,
          finalInstances,
          deviceTier,
          earnMode,
          testEarnActive,
          currentWorkers: currentWorkers.length,
          maxAllowed,
          mode: orchestratorMode,
          pulseQuality,
          presenceTier,
          bluetoothPresence,
          degradeFactor,
          binaryBandSignature,
          driftFlags,
          worldBandProjection,
          bandAdvantageScore,
          presenceDriftFlags,
          touchHint
        });
      } catch (err) {
        error("[CheckBand v30] FAILED buildUserBandState", String(err));
        continue;
      }

      usersState.push(userBandState);
      userBandCache.set(userId, userBandState);

      // Binary band surface registration
      try {
        const surface = buildBinaryBandSurface(userBandState);
        binarySurfaces.push(surface);
        if (WorldBinaryCore && typeof WorldBinaryCore.registerEntity === "function") {
          WorldBinaryCore.registerEntity(surface);
        }
      } catch (err) {
        error("[CheckBand v30] FAILED build/register BinaryBandSurface", String(err));
      }

      // Snapshot logging
      try {
        await logUserInstanceSnapshot({
          storage,
          userId,
          snapshot: {
            baseInstances,
            finalInstances,
            deviceTier,
            earnMode,
            testEarnActive,
            currentWorkers: currentWorkers.length,
            maxAllowed,
            seq: adrenalSeq,
            mode: orchestratorMode,
            pulseQuality,
            presenceTier,
            bluetoothPresence,
            degradeFactor,
            binaryBandSignature,
            binaryBandDriftFlags: driftFlags,
            worldBandProjection,
            bandAdvantageScore,
            presenceDriftFlags
          },
          PulseLineage,
          Logger
        });
      } catch (err) {
        error("[CheckBand v30] FAILED logUserInstanceSnapshot", String(err));
      }
    }

    // GLOBAL SNAPSHOT
    try {
      lastBandStateSnapshot = buildGlobalBandSnapshot({
        mode: orchestratorMode,
        users: usersState,
        meta: {
          identity: AI_EXPERIENCE_META.identity,
          version: AI_EXPERIENCE_META.version,
          role: AI_EXPERIENCE_META.role,
          layer: AI_EXPERIENCE_META.layer
        }
      });
    } catch (err) {
      error("[CheckBand v30] FAILED buildGlobalBandSnapshot", String(err));
    }

    // Optional chunked snapshot for transport / mesh / IndexedDB
    let chunkedSnapshot = null;
    if (Chunker && typeof Chunker.chunkPayload === "function") {
      try {
        const buffer = Buffer.from(
          JSON.stringify(lastBandStateSnapshot || {}),
          "utf8"
        );
        chunkedSnapshot = Chunker.chunkPayload({
          payload: buffer,
          chunkSize: 64 * 1024,
          baseVersion: "v1",
          sizeOnly: false,
          presenceTag: "worldband-snapshot",
          band: "dual",
          backendKind: "worldband",
          worldBand: "backend",
          chunkProfile: "worldband-snapshot"
        });
      } catch (err) {
        error("[CheckBand v30] FAILED chunking global snapshot", String(err));
      }
    }

    safeLog("tick_complete", {
      users: usersState.length,
      mode: orchestratorMode
    });

    return {
      ok: true,
      snapshot: lastBandStateSnapshot,
      binarySurfaces,
      chunkedSnapshot
    };
  }

  return {
    meta: AI_EXPERIENCE_META,
    runInstanceOrchestrator,
    getCheckBandStateSnapshot,
    getCheckBandDiagnostics,
    projectWorldBandForUser
  };
}

export default createPulseWorldBandCheckBand;
