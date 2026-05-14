// ============================================================================
//  PulseProxyAdrenalSystem-v20.js
//  ADRENAL SYSTEM — v20 IMMORTAL A‑B‑A
//  Tri‑Environment Reflex Organ (cortex/somatic/sensory) + Max‑Dominant Fusion
//  Dynamic Band Reflex + Stress Scaling + Instance Orchestrator
//  v20: Backend + Device + Browser, Proxy‑Mode/Pulse‑Pal aware, dual‑band,
//       presence/harmonics, prewarm/cache/chunk/remember hints.
// ============================================================================
//
//  ROLE:
//    - Fight‑or‑flight reflex organ for Pulse‑Earn / Pulse‑Proxy / Pulse‑Pal.
//    - Scales worker “cells” based on tri‑environment stress + orchestrator mode.
//    - Emits A‑B‑A surfaces: bandSignature, binaryField, waveField.
//    - Dynamic band: low stress → symbolic, high stress → binary.
//    - Tri‑environment stress: cortex (backend), somatic (device), sensory (browser).
//    - Max‑dominant fusion: finalStress = max(cortex, somatic, sensory).
//    - Backend‑only core logic (no timers/Date.now), but accepts external stress.
// ============================================================================
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝

// 2 — EXPORT GENOME METADATA
// export const PulseMeshMeta = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
export const ADRENAL_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

import { PulseProofBridgeLogger as logger } from "../../PULSE-UI/___BACKEND/PULSE-WORLD-BRIDGE.js";
import { PulseLineage } from "./PulseProxyBBB-v20.js";

const db = window.db;

export const ORCHESTRATOR_MODES = {
  NORMAL: "normal",
  EARN_STRESS: "earn-stress",
  DRAIN: "drain"
};
// ============================================================================
//  PHYSIOLOGICAL LIMITS
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

// ============================================================================
//  INTERNAL STATE — Active “cells” per user
// ============================================================================
const activeWorkers = new Map(); // userId -> worker[]

let adrenalSeq = 0;
let adrenalCycle = 0;

// ============================================================================
//  TRI‑ENV STRESS FIELD + A‑B‑A SURFACES
// ============================================================================

function buildTriEnvStressField({ cortexStress, somaticStress, sensoryStress }) {
  const c = typeof cortexStress === "number" ? Math.max(0, cortexStress) : 0;
  const s = typeof somaticStress === "number" ? Math.max(0, somaticStress) : 0;
  const y = typeof sensoryStress === "number" ? Math.max(0, sensoryStress) : 0;

  const finalStress = Math.max(c, s, y);
  const dominantSource =
    finalStress === c ? "cortex" :
    finalStress === s ? "somatic" :
    finalStress === y ? "sensory" :
    "none";

  return {
    cortexStress: c,
    somaticStress: s,
    sensoryStress: y,
    finalStress,
    dominantSource
  };
}

function computeBandFromStress(stressField) {
  const s = stressField.finalStress;
  if (s >= 0.75) return "binary";
  if (s >= 0.35) return "dual";
  return "symbolic";
}

function buildBandSignature(band, dominantSource) {
  const raw = `ADRENAL_BAND::${band}::${dominantSource}`;
  let acc = 0;
  for (let i = 0; i < raw.length; i++) {
    acc = (acc + raw.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `adrenal-band-${acc}`;
}

function buildBinaryFieldFromStress(stressField) {
  const base = 12;
  const level = stressField.finalStress;
  const patternLen = base + Math.floor(level * 10);
  const density = patternLen + Math.floor(level * 40);
  const surface = density + patternLen;

  return {
    binaryPhenotypeSignature: `adrenal-binary-pheno-${surface % 99991}`,
    binarySurfaceSignature: `adrenal-binary-surface-${(surface * 7) % 99991}`,
    binarySurface: { patternLen, density, surface },
    parity: surface % 2 === 0 ? 0 : 1,
    shiftDepth: Math.max(0, Math.floor(Math.log2(surface || 1)))
  };
}

function buildWaveFieldFromStress(stressField, band) {
  const level = stressField.finalStress;
  const ampBase = band === "binary" ? 10 : band === "dual" ? 8 : 5;
  const amplitude = (level * 20) + ampBase;
  const wavelength = amplitude + 4;
  const phase = amplitude % 16;

  return {
    amplitude,
    wavelength,
    phase,
    band,
    mode:
      band === "binary" ? "compression-wave" :
      band === "dual"   ? "dual-wave" :
                          "symbolic-wave"
  };
}

function buildAdrenalCycleSignature(cycle) {
  return `adrenal-cycle-${(cycle * 7919) % 99991}`;
}

function buildPresenceAndHarmonicsFromStress(stressField, band) {
  const level = stressField.finalStress;

  const presenceBandState =
    level > 0.8 ? "deep-presence" :
    level > 0.4 ? "stable-presence" :
                  "light-presence";

  const harmonicDrift = Math.max(0, Math.min(1, level));

  const coherenceScore = Math.max(
    0.2,
    Math.min(1.0, 0.7 + level * 0.2 - level * 0.1)
  );

  const pulsePrewarm =
    band === "binary" || band === "dual" ? "preferred" : "optional";

  const pulseCacheMode =
    level >= 0.5 ? "stress-cache" : "normal-cache";

  const pulseChunkMode =
    level > 0.6 ? "multi-chunk" : "single-chunk";

  const pulseRemember =
    level >= 0.3 ? "remember-strong" : "remember-weak";

  const dualBandMode =
    band === "binary" ? "binary" :
    band === "dual"   ? "dual" :
                        "symbolic";

  return {
    presenceBandState,
    harmonicDrift,
    coherenceScore,
    pulsePrewarm,
    pulseCacheMode,
    pulseChunkMode,
    pulseRemember,
    dualBandMode
  };
}

// ============================================================================
//  DEVICE TIER → MAX INSTANCES
// ============================================================================
function getDeviceMax(deviceTier, testEarnActive, orchestratorMode) {
  if (orchestratorMode === ORCHESTRATOR_MODES.DRAIN) return 1;
  if (testEarnActive) return TEST_EARN_MAX;

  switch (deviceTier) {
    case "upgraded": return UPGRADED_MAX;
    case "highend":  return HIGHEND_MAX;
    default:         return NORMAL_MAX;
  }
}

// ============================================================================
//  COMPUTE FINAL INSTANCE COUNT — v20 IMMORTAL
// ============================================================================
function computeFinalInstances(base, deviceTier, earnMode, testEarnActive, orchestratorMode) {
  const safeBase = base && base > 0 ? base : 1;
  let final = safeBase;

  if (orchestratorMode === ORCHESTRATOR_MODES.DRAIN) {
    final = 1;
  } else {
    if (deviceTier === "upgraded") final *= UPGRADED_MULT;
    if (deviceTier === "highend")  final *= HIGHEND_MULT;

    if (earnMode) final = Math.floor(final * EARN_MODE_MULT);

    if (orchestratorMode === ORCHESTRATOR_MODES.EARN_STRESS) {
      final = Math.max(final, safeBase * 2);
    }

    if (testEarnActive) final = TEST_EARN_MAX;
  }

  const max = getDeviceMax(deviceTier, testEarnActive, orchestratorMode);
  const clamped = Math.max(1, Math.min(final, max));

  return {
    finalInstances: clamped,
    maxAllowed: max
  };
}

// ============================================================================
//  LOG USER SNAPSHOT — deterministic (no Date.now)
// ============================================================================
async function logUserInstanceSnapshot(userId, snapshot) {
  if (!ENABLE_INSTANCE_LOGGING) return;

  try {
    await db.collection(INSTANCE_LOG_COLLECTION).add({
      ...ADRENAL_CONTEXT,
      userId,
      seq: ++adrenalSeq,
      ...snapshot
    });
  } catch (err) {
    logger.error("adrenal", "snapshot_log_failed", { error: String(err) });
  }
}

// ============================================================================
//  LAUNCH / KILL WORKERS
// ============================================================================
function launchWorker(userId, workerIndex, orchestratorMode) {
  const workerName = `${userId}-instance-${workerIndex}`;

  logger.log("adrenal", "launch", {
    userId,
    workerName,
    workerIndex,
    mode: orchestratorMode,
    context: ADRENAL_CONTEXT,
    seq: ++adrenalSeq
  });

  return {
    name: workerName,
    userId,
    index: workerIndex,
    mode: orchestratorMode,
    seq: adrenalSeq
  };
}

function killWorker(worker) {
  if (!worker) return;

  logger.log("adrenal", "shutdown", {
    worker: worker.name,
    userId: worker.userId,
    index: worker.index,
    mode: worker.mode,
    seq: ++adrenalSeq
  });
}

// ============================================================================
//  MAIN ORCHESTRATOR LOOP — v20 IMMORTAL TRIENV MAXDOM
// ============================================================================
//
//  runInstanceOrchestrator({
//    mode,
//    cortexStress,
//    somaticStress,
//    sensoryStress
//  })
//
export async function runInstanceOrchestrator(pulse) {
  adrenalCycle++;

  const requestedMode = pulse?.mode;
  const orchestratorMode =
    requestedMode && Object.values(ORCHESTRATOR_MODES).includes(requestedMode)
      ? requestedMode
      : ORCHESTRATOR_MODES.NORMAL;

  const cortexStress  = typeof pulse?.cortexStress  === "number" ? pulse.cortexStress  : 0;
  const somaticStress = typeof pulse?.somaticStress === "number" ? pulse.somaticStress : 0;
  const sensoryStress = typeof pulse?.sensoryStress === "number" ? pulse.sensoryStress : 0;

  const triEnvStressField = buildTriEnvStressField({
    cortexStress,
    somaticStress,
    sensoryStress
  });

  const band = computeBandFromStress(triEnvStressField);
  const bandSignature = buildBandSignature(band, triEnvStressField.dominantSource);
  const binaryField = buildBinaryFieldFromStress(triEnvStressField);
  const waveField = buildWaveFieldFromStress(triEnvStressField, band);
  const presence = buildPresenceAndHarmonicsFromStress(triEnvStressField, band);
  const adrenalCycleSignature = buildAdrenalCycleSignature(adrenalCycle);

  logger.log("adrenal", "tick_start", {
    ...ADRENAL_CONTEXT,
    pulseId: pulse?.jobId || pulse?.id || null,
    pulseLineage: pulse?.lineage || null,
    pulseMode: orchestratorMode,
    adrenalCycleSignature,
    cortexStress,
    somaticStress,
    sensoryStress,
    finalStress: triEnvStressField.finalStress,
    dominantSource: triEnvStressField.dominantSource,
    band,
    bandSignature,
    seq: ++adrenalSeq
  });

  const snap = await db.collection("UserScores").get();

  for (const doc of snap.docs) {
    const userId = doc.id;
    const data = doc.data() || {};

    const baseInstances   = data.instances ?? 1;
    const deviceTier      = data.deviceTier ?? "normal";
    const earnMode        = data.earnMode ?? false;
    const testEarnActive  = data.testEarnActive ?? false;

    const {
      finalInstances,
      maxAllowed
    } = computeFinalInstances(
      baseInstances,
      deviceTier,
      earnMode,
      testEarnActive,
      orchestratorMode
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
      mode: orchestratorMode,

      band,
      bandSignature,
      binaryField,
      waveField,
      triEnvStressField,

      presenceBandState: presence.presenceBandState,
      harmonicDrift: presence.harmonicDrift,
      coherenceScore: presence.coherenceScore,
      pulsePrewarm: presence.pulsePrewarm,
      pulseCacheMode: presence.pulseCacheMode,
      pulseChunkMode: presence.pulseChunkMode,
      pulseRemember: presence.pulseRemember,
      dualBandMode: presence.dualBandMode,

      seq: ++adrenalSeq
    });

    // SCALE UP
    if (currentWorkers.length < finalInstances) {
      const needed = finalInstances - currentWorkers.length;

      logger.log("adrenal", "scale_up", {
        userId,
        needed,
        from: currentWorkers.length,
        to: finalInstances,
        mode: orchestratorMode,
        band,
        triEnvStressField,
        seq: ++adrenalSeq
      });

      for (let i = 0; i < needed; i++) {
        const workerIndex = currentWorkers.length;
        const worker = launchWorker(userId, workerIndex, orchestratorMode);
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
        mode: orchestratorMode,
        band,
        triEnvStressField,
        seq: ++adrenalSeq
      });

      for (let i = 0; i < extra; i++) {
        const worker = currentWorkers.pop();
        killWorker(worker);
      }
    }

    // SNAPSHOT
    await logUserInstanceSnapshot(userId, {
      baseInstances,
      finalInstances,
      deviceTier,
      earnMode,
      testEarnActive,
      currentWorkers: currentWorkers.length,
      maxAllowed,
      mode: orchestratorMode,

      band,
      bandSignature,
      binaryField,
      waveField,
      triEnvStressField,

      presenceBandState: presence.presenceBandState,
      harmonicDrift: presence.harmonicDrift,
      coherenceScore: presence.coherenceScore,
      pulsePrewarm: presence.pulsePrewarm,
      pulseCacheMode: presence.pulseCacheMode,
      pulseChunkMode: presence.pulseChunkMode,
      pulseRemember: presence.pulseRemember,
      dualBandMode: presence.dualBandMode
    });
  }

  logger.log("adrenal", "tick_complete", {
    mode: orchestratorMode,
    adrenalCycleSignature,
    finalStress: triEnvStressField.finalStress,
    dominantSource: triEnvStressField.dominantSource,
    band,
    bandSignature,
    seq: ++adrenalSeq
  });

  return true;
}
