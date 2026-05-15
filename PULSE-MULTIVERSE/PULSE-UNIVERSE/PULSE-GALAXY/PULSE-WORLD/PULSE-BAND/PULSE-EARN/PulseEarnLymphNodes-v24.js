// ============================================================================
// FILE: PULSE-WORLD-OS/PULSE-MULTIVERSE/PULSEWORLD/PULSE-EARN/PulseEarnLymphNodes-v24-Immortal-INTEL.js
// LAYER: THE LYMPHATIC HANDSHAKE NODES (v24-Immortal-INTEL)
// (Finalizer of Jobs + Immune-Safe Dispatch + Certified Marketplace Exchange)
// ============================================================================
//
// ROLE (v24-Immortal-INTEL):
//   THE LYMPHATIC HANDSHAKE NODES — Pulse‑Earn’s immune‑safe finalizers.
//   • Validate job + marketplace identity (immune recognition).
//   • Locate the correct marketplace receptor (antigen matching).
//   • Ensure submitResult() exists (immune compatibility).
//   • Perform deterministic Earn → Marketplace handshake.
//   • Record certified submission outcome (immune memory + signatures).
//   • Emit v24‑Immortal‑INTEL presence/advantage/hints surfaces.
//   • Emit binary-first + wave surfaces.
//   • Emit lymphComputeProfile (metadata-only).
//
// CONTRACT (v24-Immortal-INTEL):
//   • PURE RESULT DISPATCHER — no AI layers, no translation, no memory model.
//   • NO async, NO timestamps, NO nondeterministic behavior.
//   • NEVER mutate job objects.
//   • Deterministic identity verification + dispatch only.
//   • Dual-band + binary + wave + presence metadata are structural-only.
//   • NO speed, NO baseline, NO governor, NO performance assumptions.
//   • computeHashIntelligence is primary; computeHash is deterministic fallback.
// ============================================================================

//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝

// 2 — EXPORT GENOME METADATA
// export const PulseEarnCustomReceptorMeta = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
// export const PULSE_EARN_IMMUNE_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// ============================================================================
// Imports
// ============================================================================

import { PulseEarnReceptor } from "./PulseEarnReceptorMkt-v24.js";
import { PulseEarnCustomReceptor } from "./PulseEarnCustomReceptorMkt-v24.js";

// ============================================================================
// Healing Metadata — v24 IMMORTAL-INTEL
// ============================================================================

const lymphHealing = {
  lastJobId: null,
  lastMarketplaceId: null,
  lastAdapterUsed: null,
  lastError: null,
  lastResponse: null,
  cycleCount: 0,
  lastCycleIndex: null,

  lastHandshakeSignature: null,
  lastJobSignature: null,
  lastMarketplaceSignature: null,

  lastBand: "symbolic",
  lastBandSignature: null,
  lastBinaryField: null,
  lastWaveField: null,

  lastPresenceField: null,
  lastAdvantageField: null,
  lastHintsField: null,
  lastLymphPresenceProfile: null,
  lastBinaryProfile: null,
  lastWaveProfile: null,
  lastLymphComputeProfile: null
};

let lymphCycle = 0;

// ============================================================================
// Deterministic Hash Helpers
// ============================================================================

function computeHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `h${h}`;
}

// Primary INTEL hash — deterministic, structure-aware, no IO, no time.
function computeHashIntelligence(payload) {
  const base = JSON.stringify(payload || "");
  let h = 0;
  for (let i = 0; i < base.length; i++) {
    const c = base.charCodeAt(i);
    h = (h * 131 + c * (i + 7)) % 1000000007;
  }
  return `HINTEL_${h}`;
}

function normalizeBand(band) {
  const b = String(band || "symbolic").toLowerCase();
  return b === "binary" ? "binary" : "symbolic";
}

// ============================================================================
// Signature Builders (INTEL-first, classic fallback)
// ============================================================================

function buildJobSignature(job) {
  if (!job) return "JOB::NONE";
  try {
    return computeHashIntelligence({
      kind: "lymph_job_signature",
      id: job.id || null,
      marketplaceId: job.marketplaceId || "NO_MKT"
    });
  } catch (_) {
    return computeHash(`JOB::${job.id}::${job.marketplaceId || "NO_MKT"}`);
  }
}

function buildMarketplaceSignature(marketplaceId) {
  try {
    return computeHashIntelligence({
      kind: "lymph_marketplace_signature",
      marketplaceId: marketplaceId || "NO_MKT"
    });
  } catch (_) {
    return computeHash(`MKT::${marketplaceId || "NO_MKT"}`);
  }
}

function buildHandshakeSignature(job, cycleIndex) {
  try {
    return computeHashIntelligence({
      kind: "lymph_handshake_signature",
      jobId: job?.id || "NO_JOB",
      marketplaceId: job?.marketplaceId || "NO_MKT",
      cycleIndex
    });
  } catch (_) {
    return computeHash(
      `HS::${job?.id || "NO_JOB"}::${job?.marketplaceId || "NO_MKT"}::${cycleIndex}`
    );
  }
}

// ============================================================================
// Receptor Registry
// ============================================================================

const receptorRegistry = {
  A: PulseEarnReceptor,
  CUSTOM: PulseEarnCustomReceptor
};

// ============================================================================
// Presence / Advantage / Hints — v24 IMMORTAL-INTEL
// ============================================================================

function buildPresenceField(job, globalHints = {}) {
  const meta = job?.meta || {};
  const jp = meta.presenceContext || meta.cardiacPresence || {};

  const mesh = { ...(globalHints.meshSignals || {}), ...(meta.meshSignals || {}) };
  const castle = { ...(globalHints.castleSignals || {}), ...(meta.castleSignals || {}) };
  const region = { ...(globalHints.regionContext || {}), ...(meta.regionContext || {}) };

  const meshPressureIndex = mesh.meshPressureIndex || 0;
  const castleLoadLevel = castle.loadLevel || 0;
  const meshStrength = mesh.meshStrength || 0;

  const pressure = meshPressureIndex + castleLoadLevel;
  let presenceTier = "idle";
  if (pressure >= 150) presenceTier = "critical";
  else if (pressure >= 100) presenceTier = "high";
  else if (pressure >= 50) presenceTier = "elevated";
  else if (pressure > 0) presenceTier = "soft";

  const presenceSignature = computeHashIntelligence({
    organ: "PulseEarnLymphNodes",
    version: "v24-Immortal-INTEL",
    presenceTier,
    meshPressureIndex,
    castleLoadLevel
  });

  return {
    presenceVersion: "v24-Immortal-INTEL",
    presenceTier,
    presenceSignature,

    bandPresence: jp.bandPresence || (globalHints.presenceContext || {}).bandPresence || "unknown",
    routerPresence: jp.routerPresence || (globalHints.presenceContext || {}).routerPresence || "unknown",
    devicePresence: jp.devicePresence || (globalHints.presenceContext || {}).devicePresence || "unknown",

    meshPresence: jp.meshPresence || mesh.meshStrength || "unknown",
    castlePresence: jp.castlePresence || castle.castlePresence || "unknown",
    regionPresence: jp.regionPresence || region.regionTag || "unknown",

    regionId: region.regionId || "unknown-region",
    castleId: castle.castleId || "unknown-castle",

    castleLoadLevel,
    meshStrength,
    meshPressureIndex
  };
}

function buildAdvantageField(job, globalHints = {}) {
  const meta = job?.meta || {};
  const ja = meta.advantageContext || {};
  const gh = globalHints.advantageContext || {};

  return {
    advantageVersion: "C-24.0",
    advantageScore: ja.score ?? gh.score ?? 0,
    advantageBand: ja.band ?? gh.band ?? "neutral",
    advantageTier: ja.tier ?? gh.tier ?? 0
  };
}

function buildHintsField(job, globalHints = {}) {
  const meta = job?.meta || {};
  const jh = meta.hintsContext || {};

  return {
    fallbackBandLevel:
      jh.fallbackBandLevel ??
      globalHints.fallbackBandLevel ??
      0,

    chunkHints: {
      ...(globalHints.chunkHints || {}),
      ...(jh.chunkHints || {})
    },

    cacheHints: {
      ...(globalHints.cacheHints || {}),
      ...(jh.cacheHints || {})
    },

    prewarmHints: {
      ...(globalHints.prewarmHints || {}),
      ...(jh.prewarmHints || {})
    },

    coldStartHints: {
      ...(globalHints.coldStartHints || {}),
      ...(jh.coldStartHints || {})
    }
  };
}

// ============================================================================
// Lymph Compute Profile (metadata-only)
// ============================================================================

function normalizeCachePriority(p) {
  if (!p) return "normal";
  const v = String(p).toLowerCase();
  if (v === "critical" || v === "high" || v === "low") return v;
  return "normal";
}

function buildLymphComputeProfile(band, hintsField) {
  return {
    routeBand: band,
    fallbackBandLevel: hintsField.fallbackBandLevel,
    chunkAggression: hintsField.chunkHints.chunkAggression ?? 0,
    prewarmNeeded: !!hintsField.prewarmHints.shouldPrewarm,
    cachePriority: normalizeCachePriority(hintsField.cacheHints.priority),
    coldStartRisk: !!hintsField.coldStartHints.coldStartRisk
  };
}

// ============================================================================
// Binary + Wave Surfaces
// ============================================================================

function buildLymphBandBinaryWave(job, cycleIndex, presenceField) {
  const band = normalizeBand(job?.band || job?.meta?.band || "symbolic");
  lymphHealing.lastBand = band;
  lymphHealing.lastBandSignature = computeHashIntelligence({
    organ: "PulseEarnLymphNodes",
    band,
    cycleIndex
  });

  const jobIdLength = (job?.id || "").length;
  const marketplaceLength = (job?.marketplaceId || "").length;

  const surface =
    jobIdLength +
    marketplaceLength +
    cycleIndex +
    (presenceField?.meshPressureIndex || 0) +
    (presenceField?.castleLoadLevel || 0);

  const binaryField = {
    binaryLymphSignature: computeHashIntelligence({
      organ: "PulseEarnLymphNodes",
      mode: "binary",
      surface,
      jobIdLength,
      marketplaceLength,
      cycleIndex,
      meshPressureIndex: presenceField?.meshPressureIndex || 0,
      castleLoadLevel: presenceField?.castleLoadLevel || 0
    }),
    binarySurfaceSignature: computeHashIntelligence({
      organ: "PulseEarnLymphNodes",
      mode: "binary_surface",
      surface,
      cycleIndex
    }),
    binarySurface: {
      jobIdLength,
      marketplaceLength,
      cycle: cycleIndex,
      meshPressureIndex: presenceField?.meshPressureIndex || 0,
      castleLoadLevel: presenceField?.castleLoadLevel || 0,
      surface
    },
    parity: surface % 2 === 0 ? 0 : 1,
    density: jobIdLength,
    shiftDepth: Math.max(0, Math.floor(Math.log2(surface || 1)))
  };
  lymphHealing.lastBinaryField = binaryField;

  const waveField = {
    amplitude: jobIdLength + (presenceField?.meshStrength || 0),
    wavelength: cycleIndex,
    phase:
      (jobIdLength +
        cycleIndex +
        (presenceField?.meshPressureIndex || 0)) % 8,
    band,
    mode: band === "binary" ? "compression-wave" : "symbolic-wave"
  };
  lymphHealing.lastWaveField = waveField;

  return { band, binaryField, waveField };
}

// ============================================================================
// submitPulseEarnResult — Deterministic Lymphatic Handshake (v24 IMMORTAL-INTEL)
// ============================================================================

export function submitPulseEarnResult(job, result, globalHints = {}) {
  lymphCycle++;
  lymphHealing.cycleCount++;
  lymphHealing.lastCycleIndex = lymphCycle;

  const presenceField = buildPresenceField(job, globalHints);
  const advantageField = buildAdvantageField(job, globalHints);
  const hintsField = buildHintsField(job, globalHints);
  const presenceTier = presenceField.presenceTier;

  lymphHealing.lastPresenceField = presenceField;
  lymphHealing.lastAdvantageField = advantageField;
  lymphHealing.lastHintsField = hintsField;

  const { band, binaryField, waveField } = buildLymphBandBinaryWave(
    job,
    lymphCycle,
    presenceField
  );

  const lymphComputeProfile = buildLymphComputeProfile(band, hintsField);

  const lymphPresenceProfile = {
    presenceTier,
    band,
    meshPressureIndex: presenceField.meshPressureIndex,
    castleLoadLevel: presenceField.castleLoadLevel,
    advantageTier: advantageField.advantageTier,
    fallbackBandLevel: hintsField.fallbackBandLevel
  };

  const binaryProfile = { binaryField, presenceTier };
  const waveProfile = { waveField, presenceTier };

  lymphHealing.lastLymphPresenceProfile = lymphPresenceProfile;
  lymphHealing.lastBinaryProfile = binaryProfile;
  lymphHealing.lastWaveProfile = waveProfile;
  lymphHealing.lastLymphComputeProfile = lymphComputeProfile;

  try {
    if (!job || !job.marketplaceId) {
      lymphHealing.lastError = "missing_marketplaceId";
      lymphHealing.lastJobId = job?.id ?? null;
      lymphHealing.lastMarketplaceId = job?.marketplaceId ?? null;

      const failure = {
        success: false,
        error: "Job missing marketplaceId",
        jobId: job?.id ?? null,
        marketplaceId: job?.marketplaceId ?? null,
        band,
        binaryField,
        waveField,
        presenceField,
        advantageField,
        hintsField,
        lymphPresenceProfile,
        binaryProfile,
        waveProfile,
        lymphComputeProfile,
        cycleIndex: lymphCycle
      };

      lymphHealing.lastResponse = failure;
      lymphHealing.lastJobSignature = buildJobSignature(job);
      lymphHealing.lastMarketplaceSignature = buildMarketplaceSignature(
        job?.marketplaceId
      );
      lymphHealing.lastHandshakeSignature = buildHandshakeSignature(job, lymphCycle);

      return failure;
    }

    lymphHealing.lastJobId = job.id;
    lymphHealing.lastMarketplaceId = job.marketplaceId;

    lymphHealing.lastJobSignature = buildJobSignature(job);
    lymphHealing.lastMarketplaceSignature = buildMarketplaceSignature(
      job.marketplaceId
    );

    const adapter = receptorRegistry[job.marketplaceId];

    if (!adapter) {
      lymphHealing.lastError = "unknown_marketplace";

      const failure = {
        success: false,
        error: `Unknown marketplace: ${job.marketplaceId}`,
        jobId: job.id,
        marketplaceId: job.marketplaceId,
        band,
        binaryField,
        waveField,
        presenceField,
        advantageField,
        hintsField,
        lymphPresenceProfile,
        binaryProfile,
        waveProfile,
        lymphComputeProfile,
        cycleIndex: lymphCycle
      };

      lymphHealing.lastResponse = failure;
      lymphHealing.lastHandshakeSignature = buildHandshakeSignature(job, lymphCycle);

      return failure;
    }

    if (typeof adapter.submitResult !== "function") {
      lymphHealing.lastError = "adapter_missing_submitResult";

      const failure = {
        success: false,
        error: `Marketplace ${job.marketplaceId} does not support result submission`,
        jobId: job.id,
        marketplaceId: job.marketplaceId,
        band,
        binaryField,
        waveField,
        presenceField,
        advantageField,
        hintsField,
        lymphPresenceProfile,
        binaryProfile,
        waveProfile,
        lymphComputeProfile,
        cycleIndex: lymphCycle
      };

      lymphHealing.lastResponse = failure;
      lymphHealing.lastHandshakeSignature = buildHandshakeSignature(job, lymphCycle);

      return failure;
    }

    lymphHealing.lastAdapterUsed = job.marketplaceId;

    const response = adapter.submitResult(job, result);

    lymphHealing.lastResponse = response;
    lymphHealing.lastError = null;
    lymphHealing.lastHandshakeSignature = buildHandshakeSignature(job, lymphCycle);

    return {
      ...response,
      band,
      binaryField,
      waveField,
      presenceField,
      advantageField,
      hintsField,
      lymphPresenceProfile,
      binaryProfile,
      waveProfile,
      lymphComputeProfile,
      cycleIndex: lymphCycle
    };

  } catch (err) {
    lymphHealing.lastError = err.message;

    const failure = {
      success: false,
      error: err.message,
      jobId: job?.id ?? null,
      marketplaceId: job?.marketplaceId ?? null,
      band,
      binaryField,
      waveField,
      presenceField,
      advantageField,
      hintsField,
      lymphPresenceProfile,
      binaryProfile,
      waveProfile,
      lymphComputeProfile,
      cycleIndex: lymphCycle
    };

    lymphHealing.lastResponse = failure;
    lymphHealing.lastHandshakeSignature = buildHandshakeSignature(job, lymphCycle);

    return failure;
  }
}

// ---------------------------------------------------------------------------
// sendResultToMarketplace — alias for Nervous System (backwards compatible)
// ---------------------------------------------------------------------------

export function sendResultToMarketplace(job, result, globalHints) {
  return submitPulseEarnResult(job, result, globalHints);
}

// ---------------------------------------------------------------------------
// Export Healing Metadata — Lymphatic Dispatch Report
// ---------------------------------------------------------------------------

export function getPulseEarnLymphHealingState() {
  return { ...lymphHealing };
}
