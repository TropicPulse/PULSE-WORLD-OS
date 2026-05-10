// ============================================================================
// FILE: /PULSE-PROXY/PULSE-WORLD-BAND-v21-Immortal-WorldBand-Presence-Advantage.js
// PULSE-WORLD-BAND INSTANCE ORCHESTRATOR — “CHECKBAND” — v21‑IMMORTAL‑WORLDBAND‑PRESENCE‑ADVANTAGE
// “THE WORLD-BAND CONTROLLER / INSTANCE ADRENAL SYSTEM / BINARY-FIRST ORCHESTRATOR”
// Backbone for PulseWorld + PulseBand presence + PulseNet pulses + instance scaling
// ============================================================================
//
// ROLE (v21‑IMMORTAL‑WORLDBAND‑PRESENCE‑ADVANTAGE / PULSE‑WORLD‑BAND):
//   • Backend-only, PULSE-folder organ (safe for OSKernel + proxy spine).
//   • Backbone world-band controller for PulseWorld + PulseBand + PulseNet + presence + advantage.
//   • Orchestrates per-user “instance world-band” deterministically.
//   • Reads UserScores → presence/pulse quality → computes band size + world-band shape.
//   • Binary-first, dualband: symbolic view + binary compression metadata.
//   • No timers, no intervals, no Date.now — pure metadata + deterministic writes.
//   • Designed for binary organism + presence upgrade + advantage cascade + world-lens routing.
//   • Emits rich band state snapshots for CNS / OS-Healer / GlobalHealer / Pulse-World.
// ============================================================================
import {
  OrganismIdentity,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PulseWorldOrganismMap-v21.js";
const Identity = OrganismIdentity(import.meta.url);

// 2 — EXPORT GENOME METADATA
export const PulseOSCheckBandMeta = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
export const ADRENAL_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;
const admin = global.db;
const db    = global.db;
import { PulseProofBridgeLogger as logger } from "../../PULSE-UI/_BACKEND/PULSE-WORLD-BRIDGE.js";
import { PulseLineage } from "../PULSE-PROXY/PulseProxyBBB-v20.js";

// ============================================================================
//  MODES — Orchestrator routing modes
// ============================================================================
export const ORCHESTRATOR_MODES = {
  NORMAL: "normal",
  EARN_STRESS: "earn-stress",
  DRAIN: "drain"
};

// ============================================================================
//  CONFIG — Physiological Limits (drift-proof, binary-aware)
// ============================================================================
export const NORMAL_MAX     = 4;
export const UPGRADED_MAX   = 8;
export const HIGHEND_MAX    = 8;
export const TEST_EARN_MAX  = 16;

export const UPGRADED_MULT  = 2;
export const HIGHEND_MULT   = 2;
export const EARN_MODE_MULT = 1.5;

export const ENABLE_INSTANCE_LOGGING = true;
export const INSTANCE_LOG_COLLECTION = "UserInstanceLogs";

// Presence / pulse quality bands (symbolic inputs → deterministic factors)
export const PULSE_QUALITY = {
  EXCELLENT: "excellent",
  GOOD: "good",
  WEAK: "weak",
  CRITICAL: "critical",
  UNKNOWN: "unknown"
};

export const PRESENCE_TIER = {
  FULL: "full",          // strong Bluetooth + device presence
  PARTIAL: "partial",
  BACKGROUND: "background",
  OFFLINE: "offline",
  UNKNOWN: "unknown"
};

// ============================================================================
//  INTERNAL STATE — Active “cells” per user (CHECKBAND REGISTRY)
// ============================================================================
const activeWorkers = new Map(); // userId -> worker[]
let lastBandStateSnapshot = null; // last global band state snapshot

// ============================================================================
//  BINARY HELPERS — Instance Signatures + Drift Flags
// ============================================================================
let adrenalSeq = 0; // deterministic sequence counter (replaces Date.now)

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
//  DEVICE TIER → MAX INSTANCES (deterministic)
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
//  PULSE / PRESENCE DEGRADE FACTOR — deterministic fallback ladder
//  • Worse pulses/presence → lower band, never higher
//  • Always returns factor in (0, 1], never 0
// ============================================================================
function computePulsePresenceDegradeFactor(pulseQuality, presenceTier) {
  const pq = pulseQuality || PULSE_QUALITY.UNKNOWN;
  const pt = presenceTier || PRESENCE_TIER.UNKNOWN;

  // Base factor from pulse quality
  let factor = 1.0;
  if (pq === PULSE_QUALITY.EXCELLENT) factor = 1.0;
  else if (pq === PULSE_QUALITY.GOOD) factor = 0.85;
  else if (pq === PULSE_QUALITY.WEAK) factor = 0.6;
  else if (pq === PULSE_QUALITY.CRITICAL) factor = 0.35;
  else factor = 0.7; // UNKNOWN

  // Presence tier further constrains factor (fallback ladder)
  if (pt === PRESENCE_TIER.FULL) {
    factor *= 1.0;
  } else if (pt === PRESENCE_TIER.PARTIAL) {
    factor *= 0.85;
  } else if (pt === PRESENCE_TIER.BACKGROUND) {
    factor *= 0.6;
  } else if (pt === PRESENCE_TIER.OFFLINE) {
    factor *= 0.4;
  } else {
    factor *= 0.75; // UNKNOWN
  }

  // Clamp to safe range (never 0, never >1)
  if (factor > 1.0) factor = 1.0;
  if (factor <= 0) factor = 0.2;

  return factor;
}

// ============================================================================
//  COMPUTE FINAL INSTANCE COUNT — Deterministic + presence/pulse aware
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

  // Mode-aware routing
  if (orchestratorMode === ORCHESTRATOR_MODES.DRAIN) {
    final = 1;
  } else {
    if (deviceTier === "upgraded") final *= UPGRADED_MULT;
    if (deviceTier === "highend")  final *= HIGHEND_MULT;

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

  // Presence/pulse degrade ladder — only ever scales DOWN
  const degradeFactor = computePulsePresenceDegradeFactor(pulseQuality, presenceTier);
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
//  WORLD-BAND PROJECTION — deterministic world-lens view of band state
//  • No randomness, pure function of band + presence/pulse
// ============================================================================
function computeWorldBandProjection({
  finalInstances,
  pulseQuality,
  presenceTier,
  bluetoothPresence
}) {
  // Map symbolic tiers into stable numeric weights
  const pq = pulseQuality || PULSE_QUALITY.UNKNOWN;
  const pt = presenceTier || PRESENCE_TIER.UNKNOWN;

  let localWeight = 0.5;
  let edgeWeight  = 0.3;
  let meshWeight  = 0.2;

  // Presence drives locality
  if (pt === PRESENCE_TIER.FULL) {
    localWeight = 0.7;
    edgeWeight  = 0.2;
    meshWeight  = 0.1;
  } else if (pt === PRESENCE_TIER.PARTIAL) {
    localWeight = 0.55;
    edgeWeight  = 0.3;
    meshWeight  = 0.15;
  } else if (pt === PRESENCE_TIER.BACKGROUND) {
    localWeight = 0.4;
    edgeWeight  = 0.35;
    meshWeight  = 0.25;
  } else if (pt === PRESENCE_TIER.OFFLINE) {
    localWeight = 0.25;
    edgeWeight  = 0.4;
    meshWeight  = 0.35;
  }

  // Pulse quality nudges mesh vs edge
  if (pq === PULSE_QUALITY.EXCELLENT) {
    meshWeight += 0.05;
    edgeWeight += 0.05;
    localWeight -= 0.1;
  } else if (pq === PULSE_QUALITY.CRITICAL) {
    meshWeight -= 0.05;
    localWeight += 0.05;
  }

  // Clamp and renormalize
  function clamp01(v) {
    if (v < 0) return 0;
    if (v > 1) return 1;
    return v;
  }

  localWeight = clamp01(localWeight);
  edgeWeight  = clamp01(edgeWeight);
  meshWeight  = clamp01(meshWeight);

  const sum = localWeight + edgeWeight + meshWeight || 1;
  localWeight /= sum;
  edgeWeight  /= sum;
  meshWeight  /= sum;

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
//  LOG USER SNAPSHOT — deterministic, immune-safe, presence/pulse/world aware
// ============================================================================
async function logUserInstanceSnapshot(userId, snapshot) {
  if (!ENABLE_INSTANCE_LOGGING) return;

  try {
    await db.collection(INSTANCE_LOG_COLLECTION).add({
      ...ADRENAL_CONTEXT,
      userId,
      seq: ++adrenalSeq,
      binaryBandSignature: snapshot.binaryBandSignature,
      binaryBandDriftFlags: snapshot.binaryBandDriftFlags,
      worldBandProjection: snapshot.worldBandProjection,
      ...snapshot
    });
  } catch (err) {
    logger.error("adrenal", "snapshot_log_failed", { error: String(err) });
  }
}

// ============================================================================
//  LAUNCH WORKER — binary-first, presence-aware metadata
// ============================================================================
function launchWorker(userId, workerIndex, orchestratorMode, deviceTier) {
  const workerName = `${userId}-instance-${workerIndex}`;
  const binarySignature = computeBinaryInstanceSignature(
    userId,
    workerIndex,
    deviceTier,
    orchestratorMode
  );

  logger.log("adrenal", "launch", {
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

// ============================================================================
//  KILL WORKER — deterministic shutdown
// ============================================================================
function killWorker(worker) {
  logger.log("adrenal", "shutdown", {
    worker: worker.name,
    mode: worker.mode,
    binarySignature: worker.binarySignature
  });
}

// ============================================================================
//  BAND STATE SNAPSHOT + DIAGNOSTICS SURFACES
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
  worldBandProjection
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
    worldBandProjection
  };
}

function buildGlobalBandSnapshot({ mode, users }) {
  return {
    meta: {
      identity: PulseOSCheckBandMeta.identity,
      version: PulseOSCheckBandMeta.version,
      role: PulseOSCheckBandMeta.role,
      layer: PulseOSCheckBandMeta.layer
    },
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

  for (const u of snapshot.users) {
    totalInstances += u.currentWorkers || 0;
  }

  return {
    meta: {
      identity: PulseOSCheckBandMeta.identity,
      version: PulseOSCheckBandMeta.version
    },
    totalUsers,
    totalInstances,
    mode: snapshot.mode || ORCHESTRATOR_MODES.NORMAL,
    seq: snapshot.seq || adrenalSeq
  };
}

// ============================================================================
//  MAIN ORCHESTRATOR LOOP — v21‑IMMORTAL‑WORLDBAND‑PRESENCE‑ADVANTAGE
//  • Reads presence/pulse fields if present, otherwise safe defaults
//  • Worse pulses/presence → lower band, never higher
//  • Emits global band state snapshot for CNS / OS‑Healer / Pulse‑World
// ============================================================================
export async function runInstanceOrchestrator(pulse) {
  const orchestratorMode =
    pulse?.mode && Object.values(ORCHESTRATOR_MODES).includes(pulse.mode)
      ? pulse.mode
      : ORCHESTRATOR_MODES.NORMAL;

  logger.log("adrenal", "tick_start", {
    ...ADRENAL_CONTEXT,
    pulseId: pulse?.jobId || pulse?.id || null,
    mode: orchestratorMode
  });

  const snap = await db.collection("UserScores").get();
  const usersState = [];

  for (const doc of snap.docs) {
    const userId = doc.id;
    const data = doc.data() || {};

    const baseInstances   = data.instances ?? 1;
    const deviceTier      = data.deviceTier ?? "normal";
    const earnMode        = data.earnMode ?? false;
    const testEarnActive  = data.testEarnActive ?? false;

    // Presence / pulse quality inputs (optional, safe defaults)
    const pulseQuality      = data.pulseQuality || PULSE_QUALITY.UNKNOWN;
    const presenceTier      = data.presenceTier || PRESENCE_TIER.UNKNOWN;
    const bluetoothPresence = !!data.bluetoothPresence; // symbolic only

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

    if (!activeWorkers.has(userId)) {
      activeWorkers.set(userId, []);
    }

    const currentWorkers = activeWorkers.get(userId);

    logger.log("adrenal", "state", {
      userId,
      baseInstances,
      deviceTier,
      earnMode,
      testEarnActive,
      current: currentWorkers.length,
      final: finalInstances,
      maxAllowed,
      driftFlags,
      mode: orchestratorMode,
      pulseQuality,
      presenceTier,
      bluetoothPresence,
      degradeFactor
    });

    // SCALE UP
    if (currentWorkers.length < finalInstances) {
      const needed = finalInstances - currentWorkers.length;

      logger.log("adrenal", "scale_up", {
        userId,
        needed,
        from: currentWorkers.length,
        to: finalInstances,
        mode: orchestratorMode
      });

      for (let i = 0; i < needed; i++) {
        const workerIndex = currentWorkers.length;
        const worker = launchWorker(
          userId,
          workerIndex,
          orchestratorMode,
          deviceTier
        );
        currentWorkers.push(worker);
      }
    }

    // SCALE DOWN
    if (currentWorkers.length > finalInstances) {
      const extra = currentWorkers.length - finalInstances;

      logger.log("adrenal", "scale_down", {
        userId,
        extra,
        from: currentWorkers.length,
        to: finalInstances,
        mode: orchestratorMode
      });

      for (let i = 0; i < extra; i++) {
        const worker = currentWorkers.pop();
        killWorker(worker);
      }
    }

    // BINARY BAND SIGNATURE — compress entire band for this user
    const bandSeed =
      `${userId}|${currentWorkers.length}|` +
      `${deviceTier}|${orchestratorMode}|${adrenalSeq}|` +
      `${pulseQuality}|${presenceTier}`;
    let bandHash = 0;
    for (let i = 0; i < bandSeed.length; i++) {
      bandHash = (bandHash * 31 + bandSeed.charCodeAt(i)) >>> 0;
    }
    const binaryBandSignature =
      "BAND-STATE-" + bandHash.toString(16).padStart(8, "0");

    // WORLD-BAND PROJECTION — world-lens view for Pulse-World routing
    const worldBandProjection = computeWorldBandProjection({
      finalInstances,
      pulseQuality,
      presenceTier,
      bluetoothPresence
    });

    const userBandState = buildUserBandState({
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
      worldBandProjection
    });

    usersState.push(userBandState);

    // SNAPSHOT — Immune-safe Logging (deterministic, presence/pulse/world aware)
    await logUserInstanceSnapshot(userId, {
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
      worldBandProjection
    });
  }

  lastBandStateSnapshot = buildGlobalBandSnapshot({
    mode: orchestratorMode,
    users: usersState
  });

  logger.log("adrenal", "tick_complete", {
    mode: orchestratorMode,
    users: usersState.length,
    seq: adrenalSeq
  });

  return true;
}

// ============================================================================
//–  DEFAULT EXPORT — IMMORTAL PULSE‑WORLD‑BAND ORGAN
// ============================================================================
export default {
  meta: PulseOSCheckBandMeta,
  PulseRole,
  runInstanceOrchestrator,
  getCheckBandStateSnapshot,
  getCheckBandDiagnostics
};
