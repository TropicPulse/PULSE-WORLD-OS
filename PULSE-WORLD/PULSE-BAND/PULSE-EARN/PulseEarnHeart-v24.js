// ============================================================================
// FILE: PULSE-WORLD/PULSE-EARN/PulseEarnHeart-v24-Immortal-INTEL-PLUS.js
// LAYER: THE HEART (v24-Immortal-INTEL-PLUS + Dual-Band + Binary + Wave + Presence)
// TRIPLE HEART 24++ — MOM + DAD + SELF-BEAT + HEARTBEAT-INTEL (DETERMINISTIC, NO TIME)
// EarnHeart v24++ fully integrates EarnHeartbeat surfaces + richer cardiac intelligence.
// ============================================================================
PULSE-WORLD-MAP.js
import {
  OrganismIdentity,
  buildPulseOrganismMap as PulseOrganismMap
} from "./PULSE-WORLD-MAP.js";
const Identity = OrganismIdentity(import.meta.url);

// 2 — EXPORT GENOME METADATA
// export const PulseEarnCustomReceptorMeta = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

import { getNextMarketplaceJob } from "./PulseEarnNervousSystem-v24.js";
import { executePulseEarnJob } from "./PulseEarnMetabolism-v24.js";
import { submitPulseEarnResult } from "./PulseEarnLymphNodes-v24.js";
import {
  computeWork,
  pulseEarnHeartbeat,
  getPulseEarnHeartbeatHealingState
} from "./PulseEarnHeartbeat-v24.js";

// ============================================================================
// Healing Metadata — Heart Log (v24-Immortal-INTEL-PLUS)
// ============================================================================
const heartHealing = {
  cycles: 0,
  lastJob: null,
  lastResult: null,
  lastSubmission: null,
  lastError: null,
  lastExitReason: null,
  lastCycleIndex: null,

  lastHeartSignature: null,
  lastJobSignature: null,
  lastResultSignature: null,
  lastSubmissionSignature: null,

  lastBand: "symbolic",
  lastBandSignature: null,
  lastBinaryField: null,
  lastWaveField: null,

  lastPresenceField: null,
  lastAdvantageField: null,
  lastHintsField: null,
  lastCardiacPresenceProfile: null,
  lastCardiacBinaryProfile: null,
  lastCardiacWaveProfile: null,

  // Dual-parent + self-beat pulse surfaces
  lastMomPulseSurface: null,
  lastDadPulseSurface: null,
  lastSelfPulseSurface: null,
  lastActivePulseSource: "none", // "mom" | "dad" | "self" | "none"

  // EarnHeartbeat integration
  lastHeartbeatBeat: null,
  lastHeartbeatSpeedField: null,
  lastHeartbeatAdvantageField: null,
  lastHeartbeatPresenceField: null,
  lastHeartbeatExperienceField: null,
  lastHeartbeatCycleSignature: null,

  // Tri-heart surfaces from EarnHeartbeat
  lastTriHeartLiveness: null,
  lastTriHeartAdvantage: null,
  lastTriHeartSpeed: null,
  lastTriHeartPresence: null,

  // Chunk / cache / prewarm plans
  lastChunkPlan: null,
  lastCachePlan: null,
  lastPrewarmPlan: null,

  // Self-beat metadata (deterministic, no randomness)
  lastSelfBeatCycle: null,
  lastSelfBeatReason: null,

  // v24 compute intelligence
  lastComputeProfile: null,
  lastPulseIntelligence: null,

  // v24++ extended intelligence snapshots (opaque, metadata-only)
  lastHeartbeatHealingSnapshot: null,
  lastDeepJobFlag: null
};

let heartCycle = 0;

// ============================================================================
// Hash Helpers — v24 computeHashIntelligence + v13 computeHash fallback
// ============================================================================
function computeHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `h${h}`;
}

// Primary: smarter, context-aware, deterministic hash
function computeHashIntelligence(str, context = {}) {
  const s = String(str || "");
  const band = context.band || "symbolic";
  const tier = context.presenceTier || "idle";
  const cycle = context.cycle || 0;

  // FNV-1a core with light contextual salting
  let hash = (2166136261 ^ cycle) >>> 0;
  const saltBand = band === "binary" ? 0xB1 : 0xA1;
  const saltTier =
    tier === "critical" ? 0xC3 :
    tier === "high" ? 0xB3 :
    tier === "elevated" ? 0xA3 :
    tier === "soft" ? 0x93 : 0x83;

  for (let i = 0; i < s.length; i++) {
    hash ^= s.charCodeAt(i);
    hash = Math.imul(hash, 16777619) >>> 0;
    hash ^= saltBand;
    hash ^= saltTier;
  }

  const v = hash % 100000;
  return `hi${v}`;
}

function normalizeBand(band) {
  const b = String(band || "symbolic").toLowerCase();
  return b === "binary" ? "binary" : "symbolic";
}

// ============================================================================
// Signature Builders
// ============================================================================
function buildHeartSignature(cycle, band, presenceTier, meshPressure, castleLoad) {
  return computeHashIntelligence(
    `HEART24::${cycle}::${band}::PTIER:${presenceTier}::MESH:${meshPressure}::CASTLE:${castleLoad}`,
    { band, presenceTier, cycle }
  );
}

function buildJobSignature(job) {
  if (!job) return "JOB::NONE";
  return computeHashIntelligence(
    `JOB::${job.id}::${job.marketplace}`,
    { band: job.band || "symbolic" }
  );
}

function buildResultSignature(result) {
  if (!result) return "RESULT::NONE";
  return computeHashIntelligence(
    `RESULT::${result.success ? "OK" : "FAIL"}`,
    {}
  );
}

function buildSubmissionSignature(submission) {
  if (!submission) return "SUBMIT::NONE";
  return computeHashIntelligence(
    `SUBMIT::${submission.success ? "OK" : "FAIL"}`,
    {}
  );
}

// ============================================================================
// Presence / Advantage / Hints Surfaces
// ============================================================================
function buildPresenceField({ job, nervousPresence = {}, globalHints = {} }) {
  const jobMeta = job?.meta || {};
  const jobPresence = jobMeta.presenceContext || jobMeta.cardiacPresence || {};
  const ghPresence = globalHints.presenceContext || {};

  const mesh = {
    ...(globalHints.meshSignals || {}),
    ...(jobMeta.meshSignals || {}),
    ...(nervousPresence.meshSignals || {})
  };

  const castle = {
    ...(globalHints.castleSignals || {}),
    ...(jobMeta.castleSignals || {}),
    ...(nervousPresence.castleSignals || {})
  };

  const region = {
    ...(globalHints.regionContext || {}),
    ...(jobMeta.regionContext || {}),
    ...(nervousPresence.regionContext || {})
  };

  return {
    bandPresence:
      jobPresence.bandPresence ||
      ghPresence.bandPresence ||
      nervousPresence.bandPresence ||
      "unknown",

    routerPresence:
      jobPresence.routerPresence ||
      ghPresence.routerPresence ||
      nervousPresence.routerPresence ||
      "unknown",

    devicePresence:
      jobPresence.devicePresence ||
      ghPresence.devicePresence ||
      nervousPresence.devicePresence ||
      "unknown",

    meshPresence: mesh.meshStrength || "unknown",
    castlePresence: castle.castlePresence || "unknown",
    regionPresence: region.regionTag || "unknown",

    regionId: region.regionId || "unknown-region",
    castleId: castle.castleId || "unknown-castle",

    castleLoadLevel: castle.loadLevel || 0,
    meshStrength: mesh.meshStrength || 0,
    meshPressureIndex: mesh.meshPressureIndex || 0
  };
}

function buildAdvantageField({ job, nervousAdvantage = {}, globalHints = {} }) {
  const jobMeta = job?.meta || {};
  const jobAdv = jobMeta.advantageContext || {};
  const ghAdv = globalHints.advantageContext || {};

  return {
    advantageScore:
      jobAdv.score ??
      ghAdv.score ??
      nervousAdvantage.score ??
      0,

    advantageBand:
      jobAdv.band ??
      ghAdv.band ??
      nervousAdvantage.band ??
      "neutral",

    advantageTier:
      jobAdv.tier ??
      ghAdv.tier ??
      nervousAdvantage.tier ??
      0
  };
}

function buildHintsField({ job, nervousHints = {}, globalHints = {} }) {
  const jobMeta = job?.meta || {};
  const jobHints = jobMeta.hintsContext || {};

  return {
    fallbackBandLevel:
      jobHints.fallbackBandLevel ??
      globalHints.fallbackBandLevel ??
      nervousHints.fallbackBandLevel ??
      0,

    chunkHints: {
      ...(globalHints.chunkHints || {}),
      ...(jobHints.chunkHints || {}),
      ...(nervousHints.chunkHints || {})
    },

    cacheHints: {
      ...(globalHints.cacheHints || {}),
      ...(jobHints.cacheHints || {}),
      ...(nervousHints.cacheHints || {})
    },

    prewarmHints: {
      ...(globalHints.prewarmHints || {}),
      ...(jobHints.prewarmHints || {}),
      ...(nervousHints.prewarmHints || {})
    },

    coldStartHints: {
      ...(globalHints.coldStartHints || {}),
      ...(jobHints.coldStartHints || {}),
      ...(nervousHints.coldStartHints || {})
    }
  };
}

function classifyPresenceTier(presenceField) {
  const mesh = Number(presenceField.meshPressureIndex || 0);
  const castle = Number(presenceField.castleLoadLevel || 0);
  const pressure = mesh + castle;

  if (pressure >= 150) return "critical";
  if (pressure >= 100) return "high";
  if (pressure >= 50) return "elevated";
  if (pressure > 0) return "soft";
  return "idle";
}

// ============================================================================
// Dual-Parent Pulse Surfaces + Self-Beat (triple heart)
// ============================================================================
const MOM_PULSE_KEY = "PulseProxyHeartbeatLastBeatAt";
const DAD_PULSE_KEY = "PulseAIHeartbeatLastBeatAt";

function buildMomPulseSurface() {
  let last = 0;
  try {
    last = globalThis?.[MOM_PULSE_KEY] || 0;
  } catch (_) {
    last = 0;
  }
  const alive = !!last;
  return {
    momPulseAlive: alive,
    momPulseLastBeatAt: last,
    momPulseFallbackState: alive ? "available" : "silent"
  };
}

function buildDadPulseSurface() {
  let last = 0;
  try {
    last = globalThis?.[DAD_PULSE_KEY] || 0;
  } catch (_) {
    last = 0;
  }
  const alive = !!last;
  return {
    dadPulseAlive: alive,
    dadPulseLastBeatAt: last,
    dadPulseFallbackState: alive ? "available" : "silent"
  };
}

function buildSelfPulseSurface(workerId, band, presenceTier) {
  const wid = String(workerId || "0");
  let acc = 0;
  for (let i = 0; i < wid.length; i++) {
    acc += wid.charCodeAt(i) * (i + 1);
  }

  const tierWeight =
    presenceTier === "critical" ? 5 :
    presenceTier === "high" ? 4 :
    presenceTier === "elevated" ? 3 :
    presenceTier === "soft" ? 2 : 1;

  const bandWeight = band === "binary" ? 7 : 3;

  const beatIndex = (heartCycle * tierWeight + acc + bandWeight) % 11; // 0..10
  const selfBeatActive = beatIndex === 0;

  return {
    selfPulseAlive: true,
    selfPulseBeatIndex: beatIndex,
    selfPulseActive: selfBeatActive,
    selfPulseFallbackState: selfBeatActive ? "self-beat" : "idle"
  };
}

function selectActivePulseSource(momPulseSurface, dadPulseSurface, selfPulseSurface) {
  if (momPulseSurface.momPulseAlive) return "mom";
  if (dadPulseSurface.dadPulseAlive) return "dad";
  if (selfPulseSurface.selfPulseActive) return "self";
  return "self";
}

// ============================================================================
// Chunk / Cache / Prewarm Plans (symbolic only, no IO)
// ============================================================================
function buildChunkPlan(hintsField, job) {
  const hints = hintsField.chunkHints || {};
  const enabled = Object.keys(hints).length > 0;
  return {
    enabled,
    strategy: hints.strategy || "default",
    target: hints.target || "job",
    key: hints.key || job?.id || "unknown-job"
  };
}

function buildCachePlan(hintsField, job) {
  const hints = hintsField.cacheHints || {};
  const enabled = Object.keys(hints).length > 0;
  return {
    enabled,
    strategy: hints.strategy || "default",
    scope: hints.scope || "session",
    key: hints.key || job?.id || "unknown-job"
  };
}

function buildPrewarmPlan(hintsField, job) {
  const hints = hintsField.prewarmHints || {};
  const enabled = Object.keys(hints).length > 0;
  return {
    enabled,
    strategy: hints.strategy || "default",
    band: hints.band || (job?.band || job?.meta?.band || "symbolic")
  };
}

// ============================================================================
// v24 ComputeProfile + PulseIntelligence (metadata-only, no behavior change)
// ============================================================================
function buildComputeProfile(job, presenceField, advantageField, heartbeatBeat) {
  const payout = Number(job?.payout || 0);
  const cpu = Number(job?.cpuRequired || 0);
  const mem = Number(job?.memoryRequired || 0);
  const est = Number(job?.estimatedSeconds || 0);

  const baseWeight = cpu * 0.4 + mem * 0.3 + est * 0.3;
  const pressure =
    (presenceField.meshPressureIndex || 0) +
    (presenceField.castleLoadLevel || 0);

  const heartbeatLoad = heartbeatBeat?.speedField?.speedScore || 0;
  const heartbeatAdvTier = heartbeatBeat?.advantageField?.advantageTier || 0;

  const weight = baseWeight + heartbeatLoad * 50 + heartbeatAdvTier * 10;

  let computeTier = "light";
  if (weight >= 220 || pressure >= 160) computeTier = "heavy";
  else if (weight >= 90 || pressure >= 90) computeTier = "medium";

  const deepJob =
    computeTier === "heavy" ||
    (heartbeatBeat?.experienceField?.load || 0) >= 0.8;

  return {
    computeVersion: "v24-Immortal-INTEL-PLUS",
    weight,
    computeTier,
    payout,
    cpu,
    mem,
    est,
    pressure,
    advantageTier: advantageField.advantageTier || 0,
    deepJob
  };
}

function buildPulseIntelligence(job, computeProfile, advantageField, presenceTier, band) {
  const solvednessScore = Math.max(
    0,
    Math.min(1, (computeProfile.weight || 0) / 550)
  );
  const readinessScore = Math.max(
    0,
    Math.min(1, 1 - solvednessScore * 0.5)
  );

  const factoringSignal =
    computeProfile.computeTier === "heavy"
      ? "deep-job"
      : computeProfile.computeTier === "medium"
      ? "balanced"
      : "light";

  return {
    pulseIntelligenceVersion: "v24-Immortal-INTEL-PLUS",
    solvednessScore,
    readinessScore,
    factoringSignal,
    advantageTier: advantageField.advantageTier || 0,
    bandPreference: band,
    presenceTier
  };
}

// ============================================================================
// MAIN CARDIAC ENGINE — createPulseEarnHeart (triple heart, self-beat, v24++)
// ============================================================================
export function createPulseEarnHeart({
  pulseSendSystem,
  log = console.log
} = {}) {
  const heart = {
    cycle(workerId, engineRef = {}, globalHints = {}) {
      heartCycle++;
      heartHealing.cycles++;
      heartHealing.lastCycleIndex = heartCycle;

      const runningFlag =
        engineRef.forceRun === true
          ? true
          : engineRef.running !== false;

      if (!runningFlag) {
        heartHealing.lastExitReason = "engine_not_running";
        return null;
      }

      try {
        // -------------------------------------------------------------------
        // Dual‑parent + self-beat pulse surfaces (triple heart)
        // -------------------------------------------------------------------
        const momPulseSurface = buildMomPulseSurface();
        const dadPulseSurface = buildDadPulseSurface();

        const nervousPresence = engineRef?.presenceContext || {};
        const nervousAdvantage = engineRef?.advantageContext || {};
        const nervousHints = engineRef?.hintsContext || {};

        const tempPresenceField = {
          meshPressureIndex: nervousPresence.meshPressureIndex || 0,
          castleLoadLevel: nervousPresence.castleLoadLevel || 0
        };
        const tempPresenceTier = classifyPresenceTier(tempPresenceField);
        const tempBand = normalizeBand(engineRef?.band || "symbolic");

        const selfPulseSurface = buildSelfPulseSurface(
          workerId,
          tempBand,
          tempPresenceTier
        );

        let activePulseSource = selectActivePulseSource(
          momPulseSurface,
          dadPulseSurface,
          selfPulseSurface
        );

        heartHealing.lastMomPulseSurface = momPulseSurface;
        heartHealing.lastDadPulseSurface = dadPulseSurface;
        heartHealing.lastSelfPulseSurface = selfPulseSurface;
        heartHealing.lastActivePulseSource = activePulseSource;

        if (activePulseSource === "self") {
          heartHealing.lastSelfBeatCycle = heartCycle;
          heartHealing.lastSelfBeatReason = "parents_silent_or_inactive";
        }

        // -------------------------------------------------------------------
        // EarnHeartbeat — deterministic beat (v24-Immortal-INTEL-PLUS)
// -------------------------------------------------------------------
        const heartbeatBeat = pulseEarnHeartbeat({
          workerId,
          band: tempBand,
          presenceTier: tempPresenceTier,
          globalHints,
          nervousPresence,
          nervousAdvantage,
          nervousHints
        });

        if (heartbeatBeat) {
          heartHealing.lastHeartbeatBeat = heartbeatBeat;
          heartHealing.lastHeartbeatSpeedField = heartbeatBeat.speedField || null;
          heartHealing.lastHeartbeatAdvantageField =
            heartbeatBeat.advantageField || null;
          heartHealing.lastHeartbeatPresenceField =
            heartbeatBeat.presenceField || null;
          heartHealing.lastHeartbeatExperienceField =
            heartbeatBeat.experienceField || null;
          heartHealing.lastHeartbeatCycleSignature =
            heartbeatBeat.cycleSignature || null;

          heartHealing.lastTriHeartLiveness =
            heartbeatBeat.triHeartLiveness || null;
          heartHealing.lastTriHeartAdvantage =
            heartbeatBeat.triHeartAdvantage || null;
          heartHealing.lastTriHeartSpeed =
            heartbeatBeat.triHeartSpeed || null;
          heartHealing.lastTriHeartPresence =
            heartbeatBeat.triHeartPresence || null;

          // Snapshot heartbeat healing (opaque, metadata-only)
          heartHealing.lastHeartbeatHealingSnapshot =
            getPulseEarnHeartbeatHealingState
              ? getPulseEarnHeartbeatHealingState()
              : null;
        }

        // ------------------------------------------------------
        // 1. FETCH — Systole
        // ------------------------------------------------------
        const job = getNextMarketplaceJob(workerId);

        if (!job) {
          heartHealing.lastExitReason = "no_job";
          return null;
        }

        heartHealing.lastJob = job;
        heartHealing.lastJobSignature = buildJobSignature(job);

        const band = normalizeBand(job.band || job.meta?.band || "symbolic");
        heartHealing.lastBand = band;
        heartHealing.lastBandSignature = computeHashIntelligence(
          `BAND24::${band}`,
          { band, cycle: heartCycle }
        );

        const presenceField = buildPresenceField({
          job,
          nervousPresence,
          globalHints
        });

        const advantageField = buildAdvantageField({
          job,
          nervousAdvantage,
          globalHints
        });

        const hintsField = buildHintsField({
          job,
          nervousHints,
          globalHints
        });

        const presenceTier = classifyPresenceTier(presenceField);

        // B — Binary Surfaces
        const jobIdLength = (job.id || "").length;
        const marketplaceLength = (job.marketplace || "").length;

        const binarySurfaceValue =
          jobIdLength +
          marketplaceLength +
          heartCycle +
          (presenceField.meshPressureIndex || 0) +
          (presenceField.castleLoadLevel || 0);

        const binaryField = {
          binaryHeartSignature: computeHashIntelligence(
            `BHEART24::${binarySurfaceValue}`,
            { band, presenceTier, cycle: heartCycle }
          ),
          binarySurfaceSignature: computeHashIntelligence(
            `BSURF_HEART24::${binarySurfaceValue}`,
            { band, presenceTier, cycle: heartCycle }
          ),
          binarySurface: {
            jobIdLength,
            marketplaceLength,
            cycle: heartCycle,
            meshPressureIndex: presenceField.meshPressureIndex,
            castleLoadLevel: presenceField.castleLoadLevel,
            surface: binarySurfaceValue
          },
          parity: binarySurfaceValue % 2 === 0 ? 0 : 1,
          density: jobIdLength,
          shiftDepth: Math.max(
            0,
            Math.floor(Math.log2(binarySurfaceValue || 1))
          )
        };

        heartHealing.lastBinaryField = binaryField;

        // C — Wave-Theory Metadata
        const waveField = {
          amplitude: jobIdLength + (presenceField.meshStrength || 0),
          wavelength: heartCycle,
          phase:
            (jobIdLength +
              heartCycle +
              (presenceField.meshPressureIndex || 0)) % 8,
          band,
          mode: band === "binary" ? "compression-wave" : "symbolic-wave"
        };

        heartHealing.lastWaveField = waveField;

        // Chunk / Cache / Prewarm plans
        const chunkPlan = buildChunkPlan(hintsField, job);
        const cachePlan = buildCachePlan(hintsField, job);
        const prewarmPlan = buildPrewarmPlan(hintsField, job);

        heartHealing.lastChunkPlan = chunkPlan;
        heartHealing.lastCachePlan = cachePlan;
        heartHealing.lastPrewarmPlan = prewarmPlan;

        // v24 ComputeProfile + PulseIntelligence (uses heartbeat surfaces)
        const computeProfile = buildComputeProfile(
          job,
          presenceField,
          advantageField,
          heartbeatBeat
        );
        const pulseIntelligence = buildPulseIntelligence(
          job,
          computeProfile,
          advantageField,
          presenceTier,
          band
        );

        heartHealing.lastComputeProfile = computeProfile;
        heartHealing.lastPulseIntelligence = pulseIntelligence;
        heartHealing.lastDeepJobFlag = !!computeProfile.deepJob;

        // Optional: invoke pulseSendSystem hooks
        if (pulseSendSystem) {
          try {
            if (
              prewarmPlan.enabled &&
              typeof pulseSendSystem.prewarm === "function"
            ) {
              pulseSendSystem.prewarm(
                job,
                prewarmPlan,
                computeProfile,
                pulseIntelligence
              );
            }
            if (
              chunkPlan.enabled &&
              typeof pulseSendSystem.chunk === "function"
            ) {
              pulseSendSystem.chunk(
                job,
                chunkPlan,
                computeProfile,
                pulseIntelligence
              );
            }
            if (
              cachePlan.enabled &&
              typeof pulseSendSystem.cache === "function"
            ) {
              pulseSendSystem.cache(
                job,
                cachePlan,
                computeProfile,
                pulseIntelligence
              );
            }
          } catch (_) {
            // Heart never throws from optimization hooks
          }
        }

        const cardiacPresenceProfile = {
          presenceTier,
          band,
          meshPressureIndex: presenceField.meshPressureIndex,
          castleLoadLevel: presenceField.castleLoadLevel,
          advantageTier: advantageField.advantageTier,
          fallbackBandLevel: hintsField.fallbackBandLevel,
          activePulseSource,
          heartbeatPresenceTier:
            heartHealing.lastHeartbeatPresenceField?.presenceTier || null
        };

        const cardiacBinaryProfile = {
          binaryField,
          presenceTier,
          heartbeatSpeedScore:
            heartHealing.lastHeartbeatSpeedField?.speedScore || null
        };

        const cardiacWaveProfile = {
          waveField,
          presenceTier,
          heartbeatExperienceLoad:
            heartHealing.lastHeartbeatExperienceField?.load || null
        };

        heartHealing.lastPresenceField = presenceField;
        heartHealing.lastAdvantageField = advantageField;
        heartHealing.lastHintsField = hintsField;
        heartHealing.lastCardiacPresenceProfile = cardiacPresenceProfile;
        heartHealing.lastCardiacBinaryProfile = cardiacBinaryProfile;
        heartHealing.lastCardiacWaveProfile = cardiacWaveProfile;

        // ------------------------------------------------------
        // 2. EXECUTE — Cardiac Output
        // ------------------------------------------------------
        let result;

        if (pulseSendSystem && typeof pulseSendSystem.compute === "function") {
          const workProfile = computeWork
            ? computeWork(job, {
                band,
                presenceField,
                advantageField,
                hintsField,
                heartbeatBeat,
                computeProfile
              })
            : null;

          result = pulseSendSystem.compute(job, {
            band,
            presenceField,
            advantageField,
            hintsField,
            chunkPlan,
            cachePlan,
            prewarmPlan,
            activePulseSource,
            computeProfile,
            pulseIntelligence,
            heartbeatBeat: heartHealing.lastHeartbeatBeat,
            workProfile
          });
        } else {
          result = executePulseEarnJob(job);
        }

        heartHealing.lastResult = result;
        heartHealing.lastResultSignature = buildResultSignature(result);

        // ------------------------------------------------------
        // 3. SUBMIT — Venous Return
        // ------------------------------------------------------
        const submission = submitPulseEarnResult(job, result);
        heartHealing.lastSubmission = submission;
        heartHealing.lastSubmissionSignature =
          buildSubmissionSignature(submission);

        // ------------------------------------------------------
        // 4. Heart Signature — full v24 cardiac signature
        // ------------------------------------------------------
        const heartSignature = buildHeartSignature(
          heartCycle,
          band,
          presenceTier,
          presenceField.meshPressureIndex || 0,
          presenceField.castleLoadLevel || 0
        );

        heartHealing.lastHeartSignature = heartSignature;
        heartHealing.lastExitReason = "ok";

        return {
          job,
          result,
          submission,
          heartSignature,
          band,
          binaryField,
          waveField,
          presenceField,
          advantageField,
          hintsField,
          cardiacPresenceProfile,
          cardiacBinaryProfile,
          cardiacWaveProfile,
          momPulseSurface,
          dadPulseSurface,
          selfPulseSurface,
          activePulseSource,
          chunkPlan,
          cachePlan,
          prewarmPlan,
          computeProfile,
          pulseIntelligence,

          // EarnHeartbeat surfaces
          heartbeatBeat: heartHealing.lastHeartbeatBeat,
          heartbeatSpeedField: heartHealing.lastHeartbeatSpeedField,
          heartbeatAdvantageField: heartHealing.lastHeartbeatAdvantageField,
          heartbeatPresenceField: heartHealing.lastHeartbeatPresenceField,
          heartbeatExperienceField: heartHealing.lastHeartbeatExperienceField,
          heartbeatCycleSignature: heartHealing.lastHeartbeatCycleSignature,

          // v24++ extras
          deepJob: heartHealing.lastDeepJobFlag,
          heartbeatHealingSnapshot: heartHealing.lastHeartbeatHealingSnapshot
        };

      } catch (err) {
        heartHealing.lastError = String(err && err.message || err);
        heartHealing.lastExitReason = "error";
        return null;
      }
    }
  };

  return heart;
}

// ============================================================================
// PUBLIC: Heart Healing State (v24-Immortal-INTEL-PLUS)
// ============================================================================
export function getPulseEarnHeartHealingState() {
  return { ...heartHealing };
}
