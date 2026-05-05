// ============================================================================
// FILE: PULSE-WORLD/PULSE-EARN/PulseEarnHeart-v16-Immortal-INTEL.js
// LAYER: THE HEART (v16-Immortal-INTEL + Dual-Band + Binary + Wave + Presence)
// TRIPLE HEART — MOM + DAD + SELF-BEAT (DETERMINISTIC, NO TIME, NO TIMERS)
// Baby grew up: it now has its OWN deterministic beat when parents drop.
// ============================================================================

/*
AI_EXPERIENCE_META = {
  identity: "PulseEarnHeart",
  version: "v16-Immortal-INTEL",
  layer: "earn_heart",
  role: "earn_pulse_driver_triple_heart",
  lineage: "PulseEarnHeart-v10.4 → v11-Evo → v14-Immortal → v16-Immortal-INTEL",

  evo: {
    earnPulse: true,
    jobPump: true,
    metabolicPulse: true,
    dualBand: true,
    symbolicPrimary: true,
    binaryAware: true,
    waveAware: true,

    deterministic: true,
    driftProof: true,
    pureCompute: true,
    zeroMutationOfInput: true,
    zeroNetwork: true,
    zeroFilesystem: true,

    tripleHeart: true,
    momPulseAware: true,
    dadPulseAware: true,
    selfBeatEngine: true,

    presenceAware: true,
    advantageAware: true,
    hintsAware: true,
    chunkAware: true,
    cacheAware: true,
    prewarmAware: true,

    computeProfileAware: true,
    pulseIntelligenceAware: true,
    factoringAware: true
  },

  contract: {
    always: [
      "PulseEarnCirculatorySystem",
      "PulseEarnMetabolism",
      "PulseEarnGenome",
      "PulseEarnEndocrineSystem",
      "PulseEarnGeneticMemory"
    ],
    never: [
      "safeRoute",
      "fetchViaCNS"
    ]
  }
}
*/

export const PulseEarnHeartMeta = Object.freeze({
  layer: "PulseEarnHeart",
  role: "EARN_HEART_ORGAN",
  version: "v16-Immortal-INTEL",
  identity: "PulseEarnHeart-v16-Immortal-INTEL",

  guarantees: Object.freeze({
    deterministicCore: true,
    selfBeatDeterministic: true,
    noRandomness: true,
    noRealTime: true,
    noExternalIO: true,
    pureRuntime: true,

    dualBandAware: true,
    binaryAware: true,
    waveFieldAware: true,
    healingMetadataAware: true,
    presenceAware: true,
    advantageAware: true,
    hintsAware: true,
    worldLensAware: false,
    metabolismInjected: true,
    lymphNodesInjected: true,
    nervousSystemInjected: true,

    chunkAware: true,
    cacheAware: true,
    prewarmAware: true,
    dualParentPulseAware: true,
    tripleHeartAware: true
  }),

  contract: Object.freeze({
    input: [
      "NextMarketplaceJob",
      "MetabolismExecutor",
      "LymphNodeSubmitter",
      "DualBandContext",
      "GlobalHintsPresenceField"
    ],
    output: [
      "CardiacCycleResult",
      "CardiacDiagnostics",
      "CardiacSignatures",
      "HeartHealingState"
    ]
  })
});

import { getNextMarketplaceJob } from "./PulseEarnNervousSystem.js";
import { executePulseEarnJob } from "./PulseEarnMetabolism.js";
import { submitPulseEarnResult } from "./PulseEarnLymphNodes.js";

// ============================================================================
// Healing Metadata — Heart Log (v16-Immortal-INTEL)
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

  // Chunk / cache / prewarm plans
  lastChunkPlan: null,
  lastCachePlan: null,
  lastPrewarmPlan: null,

  // Self-beat metadata (deterministic, no randomness)
  lastSelfBeatCycle: null,
  lastSelfBeatReason: null,

  // v16 compute intelligence
  lastComputeProfile: null,
  lastPulseIntelligence: null
};

let heartCycle = 0;

// ============================================================================
// Hash Helpers — v16 computeHashIntelligence + v13 computeHash fallback
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
  let hash = 2166136261 ^ cycle;
  const saltBand = band === "binary" ? 0xB1 : 0xA1;
  const saltTier =
    tier === "critical" ? 0xC3 :
    tier === "high" ? 0xB3 :
    tier === "elevated" ? 0xA3 :
    tier === "soft" ? 0x93 : 0x83;

  for (let i = 0; i < s.length; i++) {
    hash ^= s.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
    hash ^= saltBand;
    hash ^= saltTier;
  }

  const v = (hash >>> 0) % 100000;
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
    `HEART::${cycle}::${band}::PTIER:${presenceTier}::MESH:${meshPressure}::CASTLE:${castleLoad}`,
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
  // Purely deterministic self-beat index
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
  const selfBeatActive = beatIndex === 0; // fires every deterministic window

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
  // Parents silent → deterministic self-beat
  if (selfPulseSurface.selfPulseActive) return "self";
  // Even if not "active" this cycle, self still exists as fallback identity
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
// v16 ComputeProfile + PulseIntelligence (metadata-only, no behavior change)
// ============================================================================
function buildComputeProfile(job, presenceField, advantageField) {
  const payout = Number(job?.payout || 0);
  const cpu = Number(job?.cpuRequired || 0);
  const mem = Number(job?.memoryRequired || 0);
  const est = Number(job?.estimatedSeconds || 0);

  const weight = cpu * 0.4 + mem * 0.3 + est * 0.3;
  const pressure = (presenceField.meshPressureIndex || 0) + (presenceField.castleLoadLevel || 0);

  let computeTier = "light";
  if (weight >= 200 || pressure >= 150) computeTier = "heavy";
  else if (weight >= 80 || pressure >= 80) computeTier = "medium";

  return {
    computeVersion: "v16-Immortal-INTEL",
    weight,
    computeTier,
    payout,
    cpu,
    mem,
    est,
    pressure
  };
}

function buildPulseIntelligence(job, computeProfile, advantageField, presenceTier, band) {
  const solvednessScore = Math.max(0, Math.min(1, (computeProfile.weight || 0) / 500));
  const readinessScore = Math.max(0, Math.min(1, 1 - solvednessScore * 0.5));

  const factoringSignal =
    computeProfile.computeTier === "heavy" ? "deep-job" :
    computeProfile.computeTier === "medium" ? "balanced" :
    "light";

  return {
    pulseIntelligenceVersion: "v16-Immortal-INTEL",
    solvednessScore,
    readinessScore,
    factoringSignal,
    advantageTier: advantageField.advantageTier || 0,
    bandPreference: band,
    presenceTier
  };
}

// ============================================================================
// MAIN CARDIAC ENGINE — createPulseEarnHeart (triple heart, self-beat)
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

        // Nervous-system-level presence/advantage/hints (optional, used for self-beat context)
        const nervousPresence = engineRef?.presenceContext || {};
        const nervousAdvantage = engineRef?.advantageContext || {};
        const nervousHints = engineRef?.hintsContext || {};

        // Temporary presence for self-beat context (before job)
        const tempPresenceField = {
          meshPressureIndex: nervousPresence.meshPressureIndex || 0,
          castleLoadLevel: nervousPresence.castleLoadLevel || 0
        };
        const tempPresenceTier = classifyPresenceTier(tempPresenceField);
        const tempBand = normalizeBand(engineRef?.band || "symbolic");

        const selfPulseSurface = buildSelfPulseSurface(workerId, tempBand, tempPresenceTier);

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

        // A — Dual-Band Awareness
        const band = normalizeBand(job.band || job.meta?.band || "symbolic");
        heartHealing.lastBand = band;
        heartHealing.lastBandSignature = computeHashIntelligence(
          `BAND::${band}`,
          { band, cycle: heartCycle }
        );

        // Presence/advantage/hints with job + nervous + global
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
            `BHEART::${binarySurfaceValue}`,
            { band, presenceTier, cycle: heartCycle }
          ),
          binarySurfaceSignature: computeHashIntelligence(
            `BSURF_HEART::${binarySurfaceValue}`,
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
          shiftDepth: Math.max(0, Math.floor(Math.log2(binarySurfaceValue || 1)))
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

        // Chunk / Cache / Prewarm plans (symbolic only)
        const chunkPlan = buildChunkPlan(hintsField, job);
        const cachePlan = buildCachePlan(hintsField, job);
        const prewarmPlan = buildPrewarmPlan(hintsField, job);

        heartHealing.lastChunkPlan = chunkPlan;
        heartHealing.lastCachePlan = cachePlan;
        heartHealing.lastPrewarmPlan = prewarmPlan;

        // v16 ComputeProfile + PulseIntelligence
        const computeProfile = buildComputeProfile(job, presenceField, advantageField);
        const pulseIntelligence = buildPulseIntelligence(
          job,
          computeProfile,
          advantageField,
          presenceTier,
          band
        );

        heartHealing.lastComputeProfile = computeProfile;
        heartHealing.lastPulseIntelligence = pulseIntelligence;

        // Optional: invoke pulseSendSystem hooks (still pure runtime)
        if (pulseSendSystem) {
          try {
            if (prewarmPlan.enabled && typeof pulseSendSystem.prewarm === "function") {
              pulseSendSystem.prewarm(job, prewarmPlan, computeProfile, pulseIntelligence);
            }
            if (chunkPlan.enabled && typeof pulseSendSystem.chunk === "function") {
              pulseSendSystem.chunk(job, chunkPlan, computeProfile, pulseIntelligence);
            }
            if (cachePlan.enabled && typeof pulseSendSystem.cache === "function") {
              pulseSendSystem.cache(job, cachePlan, computeProfile, pulseIntelligence);
            }
          } catch (_) {
            // Heart never throws from optimization hooks
          }
        }

        // Profiles
        const cardiacPresenceProfile = {
          presenceTier,
          band,
          meshPressureIndex: presenceField.meshPressureIndex,
          castleLoadLevel: presenceField.castleLoadLevel,
          advantageTier: advantageField.advantageTier,
          fallbackBandLevel: hintsField.fallbackBandLevel,
          activePulseSource
        };

        const cardiacBinaryProfile = {
          binaryField,
          presenceTier
        };

        const cardiacWaveProfile = {
          waveField,
          presenceTier
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
            pulseIntelligence
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
        heartHealing.lastSubmissionSignature = buildSubmissionSignature(submission);

        // ------------------------------------------------------
        // 4. Heart Signature — full v16 cardiac signature
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
          pulseIntelligence
        };

      } catch (err) {
        heartHealing.lastError = {
          message: err.message,
          workerId,
          cycleIndex: heartCycle
        };

        if (engineRef.stopOnError) {
          heartHealing.lastExitReason = "hardStop";
          engineRef.hardStop(err.message);
        }

        return null;
      }
    },

    stop() {},

    diagnostics() {
      return {
        cycles: heartHealing.cycles,
        lastJob: heartHealing.lastJob,
        lastResult: heartHealing.lastResult,
        lastSubmission: heartHealing.lastSubmission,
        lastError: heartHealing.lastError,
        lastExitReason: heartHealing.lastExitReason,
        lastCycleIndex: heartHealing.lastCycleIndex,

        lastHeartSignature: heartHealing.lastHeartSignature,
        lastJobSignature: heartHealing.lastJobSignature,
        lastResultSignature: heartHealing.lastResultSignature,
        lastSubmissionSignature: heartHealing.lastSubmissionSignature,

        lastBand: heartHealing.lastBand,
        lastBandSignature: heartHealing.lastBandSignature,
        lastBinaryField: heartHealing.lastBinaryField,
        lastWaveField: heartHealing.lastWaveField,

        lastPresenceField: heartHealing.lastPresenceField,
        lastAdvantageField: heartHealing.lastAdvantageField,
        lastHintsField: heartHealing.lastHintsField,
        lastCardiacPresenceProfile: heartHealing.lastCardiacPresenceProfile,
        lastCardiacBinaryProfile: heartHealing.lastCardiacBinaryProfile,
        lastCardiacWaveProfile: heartHealing.lastCardiacWaveProfile,

        lastMomPulseSurface: heartHealing.lastMomPulseSurface,
        lastDadPulseSurface: heartHealing.lastDadPulseSurface,
        lastSelfPulseSurface: heartHealing.lastSelfPulseSurface,
        lastActivePulseSource: heartHealing.lastActivePulseSource,

        lastChunkPlan: heartHealing.lastChunkPlan,
        lastCachePlan: heartHealing.lastCachePlan,
        lastPrewarmPlan: heartHealing.lastPrewarmPlan,

        lastSelfBeatCycle: heartHealing.lastSelfBeatCycle,
        lastSelfBeatReason: heartHealing.lastSelfBeatReason,

        lastComputeProfile: heartHealing.lastComputeProfile,
        lastPulseIntelligence: heartHealing.lastPulseIntelligence
      };
    }
  };

  return heart;
}

const earnHeartSingleton = createPulseEarnHeart();

export function pulseEarnFromHeartbeat(source = "unknown", engineRef = {}, globalHints = {}) {
  return earnHeartSingleton.cycle(source, engineRef, globalHints);
}

export function getPulseEarnHeartHealingState() {
  return { ...heartHealing };
}
