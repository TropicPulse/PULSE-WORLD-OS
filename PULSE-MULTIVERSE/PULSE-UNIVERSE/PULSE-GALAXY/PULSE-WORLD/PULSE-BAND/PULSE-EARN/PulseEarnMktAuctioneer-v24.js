// ============================================================================
// FILE: PULSE-WORLD-OS/PULSE-MULTIVERSE/PULSEWORLD/PULSE-EARN/PulseEarnMktAuctioneer-v24-IMMORTAL-PLUSPLUS.js
// LAYER: MARKETPLACE AUCTIONEER (v24‑IMMORTAL++‑INTEL‑DUALHASH A‑B‑A)
// Vast.ai Deterministic Adapter + Presence/Advantage/Hints/Factoring Surfaces + GPU‑AWARE BAND
// ============================================================================
//
// ROLE (v24‑IMMORTAL++‑INTEL A‑B‑A):
//   • Deterministic Vast.ai → Pulse‑Earn adapter (GPU‑aware).
//   • Pure receptor phenotype: ping(), fetchJobs(), normalizeJob(), submitResult().
//   • Emits A‑B‑A bandSignature + binaryField + waveField + presence/advantage/hints.
//   • Emits deterministic volatility + healing metadata + GPU profiles.
//   • Emits dual INTEL + classic signatures for all receptor events.
//   • Zero async, zero randomness, zero timestamps, zero IO.
//
// CONTRACT:
//   • PURE RECEPTOR — deterministic, drift‑proof.
//   • NO network, NO fetch, NO async, NO randomness.
//   • NEVER mutate external objects.
//   • Presence/advantage/hints are metadata-only.
//   • Dual‑hash INTEL signatures (INTEL + classic fallback).
//   • GPU‑aware band selection (binary vs symbolic) and resource factoring.
// ============================================================================

import {
  OrganismIdentity,
  buildPulseOrganismMap as buildOrganismMap
} from "../X-PULSE-X/PULSE-WORLD-MAPORGANISM.jssss
";

const Identity = OrganismIdentity(import.meta.url);

// ============================================================================
//  META BLOCK — v24.0 IMMORTAL++ (ORGANISM KERNEL)
// ============================================================================

export const PulseEarnMktAuctioneerMeta = Identity.OrganMeta;

// SURFACE / ORGANISM LAYER EXPORTS — v24.0 IMMORTAL++
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// ============================================================================
// HASH HELPERS — v24‑IMMORTAL++‑INTEL (dual‑hash)
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

function buildDualHashSignature(label, intelPayload, classicString) {
  const intelBase = {
    label,
    intel: intelPayload || {},
    classic: classicString || ""
  };
  const intelHash = computeHashIntelligence(intelBase);
  const classicHash = computeHash(`${label}::${classicString || ""}`);
  return {
    intel: intelHash,
    classic: classicHash
  };
}

function normalizeBand(band) {
  const b = String(band || "symbolic").toLowerCase();
  return b === "binary" ? "binary" : "symbolic";
}

function safeGet(obj, path, fallback = null) {
  try {
    return path
      .split(".")
      .reduce((o, k) => (o && o[k] !== undefined ? o[k] : null), obj) ?? fallback;
  } catch {
    return fallback;
  }
}

function clamp01(v) {
  return Math.max(0, Math.min(1, v));
}

// ============================================================================
// HEALING METADATA — v24‑IMMORTAL++‑INTEL
// ============================================================================

const healingState = {
  lastPingMs: null,
  lastPingError: null,

  lastFetchCount: 0,
  lastFetchError: null,

  lastSubmitJobId: null,
  lastSubmitError: null,

  lastNormalizedJobId: null,
  lastNormalizationError: null,

  lastPayloadVersion: "24-IMMORTAL-PLUSPLUS",
  lastJobType: null,
  lastGpuScore: null,
  lastResourceShape: null,
  lastBandwidthInference: null,

  priceVolatility: 0,
  listingVolatility: 0,

  cycleCount: 0,
  lastCycleIndex: null,

  // Dual‑hash INTEL signatures
  lastPingSignatureIntel: null,
  lastPingSignatureClassic: null,

  lastFetchSignatureIntel: null,
  lastFetchSignatureClassic: null,

  lastNormalizationSignatureIntel: null,
  lastNormalizationSignatureClassic: null,

  lastSubmitSignatureIntel: null,
  lastSubmitSignatureClassic: null,

  lastAuctioneerCycleSignatureIntel: null,
  lastAuctioneerCycleSignatureClassic: null,

  // A‑B‑A surfaces
  lastBand: "symbolic",
  lastBandSignatureIntel: null,
  lastBandSignatureClassic: null,
  lastBinaryField: null,
  lastWaveField: null,

  // Presence / advantage / hints / GPU
  lastPresenceField: null,
  lastAdvantageField: null,
  lastHintsField: null,
  lastAuctioneerPresenceProfile: null,
  lastBinaryProfile: null,
  lastWaveProfile: null,
  lastGpuProfile: null
};

// ============================================================================
// SIGNATURE BUILDERS — v24‑IMMORTAL++‑INTEL
// ============================================================================

function buildPingSignature(latency, cycleIndex, presenceTier) {
  const intelPayload = {
    kind: "auctioneerPing",
    latency,
    cycleIndex,
    presenceTier
  };
  const classicString = `PING::${latency}::CYCLE::${cycleIndex}::PTIER::${presenceTier}`;
  return buildDualHashSignature("AUCTIONEER_PING", intelPayload, classicString);
}

function buildFetchSignature(count, cycleIndex, presenceTier) {
  const intelPayload = {
    kind: "auctioneerFetch",
    count,
    cycleIndex,
    presenceTier
  };
  const classicString = `FETCH::${count}::CYCLE::${cycleIndex}::PTIER::${presenceTier}`;
  return buildDualHashSignature("AUCTIONEER_FETCH", intelPayload, classicString);
}

function buildNormalizationSignature(jobId, cycleIndex) {
  const intelPayload = {
    kind: "auctioneerNormalize",
    jobId: jobId || "NONE",
    cycleIndex
  };
  const classicString = `NORM::${jobId || "NONE"}::CYCLE::${cycleIndex}`;
  return buildDualHashSignature("AUCTIONEER_NORMALIZE", intelPayload, classicString);
}

function buildSubmitSignature(jobId, cycleIndex, presenceTier) {
  const intelPayload = {
    kind: "auctioneerSubmit",
    jobId: jobId || "NONE",
    cycleIndex,
    presenceTier
  };
  const classicString = `SUBMIT::${jobId || "NONE"}::CYCLE::${cycleIndex}::PTIER::${presenceTier}`;
  return buildDualHashSignature("AUCTIONEER_SUBMIT", intelPayload, classicString);
}

function buildAuctioneerCycleSignature(cycle, presenceTier, band) {
  const intelPayload = {
    kind: "auctioneerCycle",
    cycleIndex: cycle,
    presenceTier,
    band
  };
  const classicString = `AUCTIONEER_CYCLE::${cycle}::PTIER:${presenceTier}::BAND:${band}`;
  return buildDualHashSignature("AUCTIONEER_CYCLE", intelPayload, classicString);
}

function buildBandSignature(band, cycleIndex) {
  const intelPayload = {
    kind: "auctioneerBand",
    band: normalizeBand(band),
    cycleIndex
  };
  const classicString = `AUCTIONEER_BAND::${normalizeBand(band)}::CYCLE::${cycleIndex}`;
  return buildDualHashSignature("AUCTIONEER_BAND", intelPayload, classicString);
}

// ============================================================================
// GPU‑AWARE A‑B‑A Binary + Wave Surfaces (Presence‑aware, INTEL)
// ============================================================================

function buildBinaryField(presenceField, hasGpu) {
  const basePattern = hasGpu ? 16 : 8;
  const patternLen = basePattern;
  const mesh = Number(presenceField?.meshPressureIndex || 0);
  const castle = Number(presenceField?.castleLoadLevel || 0);

  const density =
    patternLen +
    (healingState.lastFetchCount || 0) +
    (healingState.lastPingMs || 0) +
    mesh +
    castle +
    (hasGpu ? 32 : 0);

  const surface = density + patternLen;

  const intelPayload = {
    kind: "auctioneerBinarySurface",
    patternLen,
    density,
    meshPressureIndex: mesh,
    castleLoadLevel: castle,
    surface,
    hasGpu
  };

  const classicString = `BAUCTIONEER::${surface}::GPU::${hasGpu ? 1 : 0}`;
  const sig = buildDualHashSignature("BAUCTIONEER", intelPayload, classicString);

  const field = {
    binaryPhenotypeSignatureIntel: sig.intel,
    binaryPhenotypeSignatureClassic: sig.classic,
    binarySurfaceSignatureIntel: sig.intel,
    binarySurfaceSignatureClassic: sig.classic,
    binarySurface: {
      patternLen,
      density,
      meshPressureIndex: mesh,
      castleLoadLevel: castle,
      surface,
      hasGpu
    },
    parity: surface % 2 === 0 ? 0 : 1,
    shiftDepth: Math.max(0, Math.floor(Math.log2(surface || 1)))
  };

  healingState.lastBinaryField = field;
  return field;
}

function buildWaveField(band, presenceField, hasGpu) {
  const amplitudeBase = (healingState.lastFetchCount || 1) * (hasGpu ? 14 : 10);
  const mesh = Number(presenceField?.meshStrength || 0);
  const amplitude = amplitudeBase + mesh + (hasGpu ? 8 : 0);
  const wavelength = (healingState.lastPingMs || 10) + 1 + (hasGpu ? 4 : 0);
  const phase = (amplitude + (presenceField?.meshPressureIndex || 0)) % 16;

  const intelPayload = {
    kind: "auctioneerWaveSurface",
    band,
    amplitude,
    wavelength,
    phase,
    meshStrength: presenceField?.meshStrength || 0,
    hasGpu
  };

  const classicString = `BAUCTIONEER_WAVE::${band}::AMP::${amplitude}::GPU::${hasGpu ? 1 : 0}`;
  const sig = buildDualHashSignature("BAUCTIONEER_WAVE", intelPayload, classicString);

  const field = {
    wavePhenotypeSignatureIntel: sig.intel,
    wavePhenotypeSignatureClassic: sig.classic,
    amplitude,
    wavelength,
    phase,
    band,
    mode: band === "binary" ? "compression-wave" : "symbolic-wave",
    hasGpu
  };

  healingState.lastWaveField = field;
  return field;
}

// ============================================================================
// DETERMINISTIC VAST.AI DNA — v24‑IMMORTAL++‑INTEL baseline (GPU‑aware)
// ============================================================================

const VAST_RECEPTOR_DNA = {
  pingLatency: 42,

  // default band; per‑job band is GPU‑aware
  band: "symbolic",

  offers: [
    {
      id: "vast-001",
      dph_total: 0.12,
      cpu_cores: 4,
      ram_gb: 8,
      gpu_ram: 8,
      net_up: 50
    },
    {
      id: "vast-002",
      dph_total: 0.20,
      cpu_cores: 8,
      ram_gb: 16,
      gpu_ram: 16,
      net_up: 100
    }
  ],

  version: "24-IMMORTAL-PLUSPLUS",
  lineage: "Auctioneer-Vast-v24-IMMORTAL-PLUSPLUS",
  phenotype: "MarketplaceAuctioneer"
};

// ============================================================================
// Presence / Advantage / Hints Surfaces (auctioneer-level, v24)
// ============================================================================

function buildPresenceField(globalHints = {}) {
  const ghP = globalHints.presenceContext || {};
  const mesh = globalHints.meshSignals || {};
  const castle = globalHints.castleSignals || {};
  const region = globalHints.regionContext || {};

  const meshStrength = mesh.meshStrength || 0;
  const meshPressureIndex = mesh.meshPressureIndex || 0;
  const castleLoadLevel = castle.loadLevel || 0;

  return {
    presenceVersion: "v24-IMMORTAL-PLUSPLUS",

    bandPresence: ghP.bandPresence || "unknown",
    routerPresence: ghP.routerPresence || "unknown",
    devicePresence: ghP.devicePresence || "unknown",
    meshPresence: ghP.meshPresence || mesh.meshStrength || "unknown",
    castlePresence: ghP.castlePresence || castle.castlePresence || "unknown",
    regionPresence: ghP.regionPresence || region.regionTag || "unknown",

    regionId: region.regionId || "unknown-region",
    castleId: castle.castleId || "unknown-castle",
    castleLoadLevel,
    meshStrength,
    meshPressureIndex
  };
}

function classifyAuctioneerPresenceTier(presenceField) {
  const mesh = Number(presenceField.meshPressureIndex || 0);
  const castle = Number(presenceField.castleLoadLevel || 0);
  const pressure = mesh + castle;

  if (pressure >= 150) return "critical";
  if (pressure >= 100) return "high";
  if (pressure >= 50) return "elevated";
  if (pressure > 0) return "soft";
  return "idle";
}

function buildAdvantageField(globalHints = {}) {
  const gh = globalHints.advantageContext || {};

  const advantageScore = gh.score ?? 0;
  const advantageBand = gh.band ?? "neutral";
  const advantageTier = gh.tier ?? 0;

  return {
    advantageVersion: "C-24.0",
    advantageScore,
    advantageBand,
    advantageTier
  };
}

function buildHintsField(globalHints = {}) {
  return {
    fallbackBandLevel: globalHints.fallbackBandLevel ?? 0,
    chunkHints: { ...(globalHints.chunkHints || {}) },
    cacheHints: { ...(globalHints.cacheHints || {}) },
    prewarmHints: { ...(globalHints.prewarmHints || {}) },
    coldStartHints: { ...(globalHints.coldStartHints || {}) }
  };
}

// GPU profile: aggregate GPU capability across current jobs/offers
function buildGpuProfile(jobsOrOffers = []) {
  let totalGpuRam = 0;
  let maxGpuRam = 0;
  let countGpu = 0;

  for (const j of jobsOrOffers) {
    const gpuRam =
      Number(j.gpu_ram) ||
      Number(j.minGpuScore) / 10 ||
      Number(j.meta?.gpu_ram) ||
      0;
    if (gpuRam > 0) {
      totalGpuRam += gpuRam;
      maxGpuRam = Math.max(maxGpuRam, gpuRam);
      countGpu++;
    }
  }

  const avgGpuRam = countGpu > 0 ? totalGpuRam / countGpu : 0;

  const gpuPressure = clamp01(maxGpuRam / 48); // symbolic scaling
  const gpuTier =
    maxGpuRam >= 24 ? "elite" :
    maxGpuRam >= 16 ? "high" :
    maxGpuRam >= 8 ? "medium" :
    maxGpuRam > 0 ? "low" :
    "none";

  const profile = {
    gpuTier,
    gpuPressure,
    maxGpuRam,
    avgGpuRam,
    gpuCount: countGpu
  };

  healingState.lastGpuProfile = profile;
  healingState.lastGpuScore = maxGpuRam;

  return profile;
}

// ============================================================================
// Deterministic Cycle Counter
// ============================================================================

let auctioneerCycle = 0;

// ============================================================================
// VOLATILITY — deterministic
// ============================================================================

function updateVolatility(jobs) {
  const count = jobs.length;

  healingState.listingVolatility = Math.abs(
    count - (healingState.lastFetchCount || 0)
  );

  const payouts = jobs.map(j => j.payout);
  if (payouts.length > 1) {
    const avg = payouts.reduce((a, b) => a + b, 0) / payouts.length;
    const variance =
      payouts.reduce((a, b) => a + (b - avg) * (b - avg), 0) / payouts.length;
    healingState.priceVolatility = variance;
  }
}

// ============================================================================
// AUCTIONEER — Vast.ai Marketplace Adapter (v24‑IMMORTAL++‑INTEL A‑B‑A, GPU‑aware)
// ============================================================================

export const PulseEarnMktAuctioneer = {
  id: "vast",
  name: "Vast.ai",
  version: "v24-IMMORTAL-PLUSPLUS",
  lineage: "Auctioneer-Vast-v24-IMMORTAL-PLUSPLUS",

  // -------------------------------------------------------------------------
  // PING — deterministic latency + A‑B‑A + presence surfaces + GPU profile
  // -------------------------------------------------------------------------
  ping(globalHints = {}) {
    auctioneerCycle++;
    healingState.cycleCount++;
    healingState.lastCycleIndex = auctioneerCycle;

    const latency = VAST_RECEPTOR_DNA.pingLatency;

    const presenceField = buildPresenceField(globalHints);
    const presenceTier = classifyAuctioneerPresenceTier(presenceField);
    const advantageField = buildAdvantageField(globalHints);
    const hintsField = buildHintsField(globalHints);

    // GPU profile from static offers
    const gpuProfile = buildGpuProfile(VAST_RECEPTOR_DNA.offers || []);

    // band: allow hints override, else GPU‑aware default
    const defaultBand = gpuProfile.gpuTier !== "none" ? "binary" : VAST_RECEPTOR_DNA.band;
    const band = normalizeBand(globalHints.band || defaultBand);

    healingState.lastBand = band;
    healingState.lastPingMs = latency;
    healingState.lastPingError = null;

    const pingSig = buildPingSignature(latency, auctioneerCycle, presenceTier);
    const bandSig = buildBandSignature(band, auctioneerCycle);
    const cycleSig = buildAuctioneerCycleSignature(auctioneerCycle, presenceTier, band);

    healingState.lastPingSignatureIntel = pingSig.intel;
    healingState.lastPingSignatureClassic = pingSig.classic;
    healingState.lastBandSignatureIntel = bandSig.intel;
    healingState.lastBandSignatureClassic = bandSig.classic;
    healingState.lastAuctioneerCycleSignatureIntel = cycleSig.intel;
    healingState.lastAuctioneerCycleSignatureClassic = cycleSig.classic;

    const hasGpu = gpuProfile.gpuTier !== "none";
    const binaryField = buildBinaryField(presenceField, hasGpu);
    const waveField = buildWaveField(band, presenceField, hasGpu);

    const auctioneerPresenceProfile = {
      presenceTier,
      band,
      meshPressureIndex: presenceField.meshPressureIndex,
      castleLoadLevel: presenceField.castleLoadLevel,
      advantageTier: advantageField.advantageTier,
      fallbackBandLevel: hintsField.fallbackBandLevel,
      gpuTier: gpuProfile.gpuTier,
      gpuPressure: gpuProfile.gpuPressure
    };

    const binaryProfile = { binaryField, presenceTier, gpuTier: gpuProfile.gpuTier };
    const waveProfile = { waveField, presenceTier, gpuTier: gpuProfile.gpuTier };

    healingState.lastBinaryField = binaryField;
    healingState.lastWaveField = waveField;
    healingState.lastPresenceField = presenceField;
    healingState.lastAdvantageField = advantageField;
    healingState.lastHintsField = hintsField;
    healingState.lastAuctioneerPresenceProfile = auctioneerPresenceProfile;
    healingState.lastBinaryProfile = binaryProfile;
    healingState.lastWaveProfile = waveProfile;

    return {
      latency,
      cycleIndex: auctioneerCycle,
      band,
      signatureIntel: pingSig.intel,
      signatureClassic: pingSig.classic,
      bandSignatureIntel: bandSig.intel,
      bandSignatureClassic: bandSig.classic,
      cycleSignatureIntel: cycleSig.intel,
      cycleSignatureClassic: cycleSig.classic,
      binaryField,
      waveField,
      presenceField,
      advantageField,
      hintsField,
      auctioneerPresenceProfile,
      binaryProfile,
      waveProfile,
      gpuProfile
    };
  },

  // -------------------------------------------------------------------------
  // FETCH JOBS — deterministic offers + A‑B‑A + presence surfaces + GPU profile
  // -------------------------------------------------------------------------
  fetchJobs(globalHints = {}) {
    auctioneerCycle++;
    healingState.cycleCount++;
    healingState.lastCycleIndex = auctioneerCycle;

    const presenceField = buildPresenceField(globalHints);
    const presenceTier = classifyAuctioneerPresenceTier(presenceField);
    const advantageField = buildAdvantageField(globalHints);
    const hintsField = buildHintsField(globalHints);

    const offers = VAST_RECEPTOR_DNA.offers || [];
    const gpuProfile = buildGpuProfile(offers);

    const defaultBand = gpuProfile.gpuTier !== "none" ? "binary" : VAST_RECEPTOR_DNA.band;
    const band = normalizeBand(globalHints.band || defaultBand);

    healingState.lastBand = band;

    try {
      const jobs = offers
        .map(raw => this.normalizeJob(raw, globalHints))
        .filter(j => j !== null);

      updateVolatility(jobs);

      const fetchSig = buildFetchSignature(jobs.length, auctioneerCycle, presenceTier);
      const bandSig = buildBandSignature(band, auctioneerCycle);
      const cycleSig = buildAuctioneerCycleSignature(auctioneerCycle, presenceTier, band);

      healingState.lastFetchError = null;
      healingState.lastFetchCount = jobs.length;
      healingState.lastFetchSignatureIntel = fetchSig.intel;
      healingState.lastFetchSignatureClassic = fetchSig.classic;
      healingState.lastBandSignatureIntel = bandSig.intel;
      healingState.lastBandSignatureClassic = bandSig.classic;
      healingState.lastAuctioneerCycleSignatureIntel = cycleSig.intel;
      healingState.lastAuctioneerCycleSignatureClassic = cycleSig.classic;

      const hasGpu = gpuProfile.gpuTier !== "none";
      const binaryField = buildBinaryField(presenceField, hasGpu);
      const waveField = buildWaveField(band, presenceField, hasGpu);

      const auctioneerPresenceProfile = {
        presenceTier,
        band,
        meshPressureIndex: presenceField.meshPressureIndex,
        castleLoadLevel: presenceField.castleLoadLevel,
        advantageTier: advantageField.advantageTier,
        fallbackBandLevel: hintsField.fallbackBandLevel,
        gpuTier: gpuProfile.gpuTier,
        gpuPressure: gpuProfile.gpuPressure
      };

      const binaryProfile = { binaryField, presenceTier, gpuTier: gpuProfile.gpuTier };
      const waveProfile = { waveField, presenceTier, gpuTier: gpuProfile.gpuTier };

      healingState.lastBinaryField = binaryField;
      healingState.lastWaveField = waveField;
      healingState.lastPresenceField = presenceField;
      healingState.lastAdvantageField = advantageField;
      healingState.lastHintsField = hintsField;
      healingState.lastAuctioneerPresenceProfile = auctioneerPresenceProfile;
      healingState.lastBinaryProfile = binaryProfile;
      healingState.lastWaveProfile = waveProfile;

      return {
        success: true,
        cycleIndex: auctioneerCycle,
        band,
        jobs,
        errors: [],
        signatureIntel: fetchSig.intel,
        signatureClassic: fetchSig.classic,
        bandSignatureIntel: bandSig.intel,
        bandSignatureClassic: bandSig.classic,
        cycleSignatureIntel: cycleSig.intel,
        cycleSignatureClassic: cycleSig.classic,
        binaryField,
        waveField,
        presenceField,
        advantageField,
        hintsField,
        auctioneerPresenceProfile,
        binaryProfile,
        waveProfile,
        gpuProfile
      };

    } catch (err) {
      const fetchSig = buildFetchSignature(0, auctioneerCycle, "idle");
      healingState.lastFetchError = err?.message || String(err);
      healingState.lastFetchCount = 0;
      healingState.lastFetchSignatureIntel = fetchSig.intel;
      healingState.lastFetchSignatureClassic = fetchSig.classic;

      return {
        success: false,
        cycleIndex: auctioneerCycle,
        band,
        jobs: [],
        errors: [{ error: err?.message || String(err) }],
        signatureIntel: fetchSig.intel,
        signatureClassic: fetchSig.classic,
        bandSignatureIntel: null,
        bandSignatureClassic: null,
        binaryField: null,
        waveField: null,
        presenceField,
        advantageField,
        hintsField,
        auctioneerPresenceProfile: null,
        binaryProfile: null,
        waveProfile: null,
        gpuProfile: healingState.lastGpuProfile
      };
    }
  },

  // -------------------------------------------------------------------------
  // SUBMIT RESULT — Vast.ai does NOT accept compute results (presence‑aware, GPU‑aware)
// -------------------------------------------------------------------------
  submitResult(job, result, globalHints = {}) {
    auctioneerCycle++;
    healingState.cycleCount++;
    healingState.lastCycleIndex = auctioneerCycle;

    const presenceField = buildPresenceField(globalHints);
    const presenceTier = classifyAuctioneerPresenceTier(presenceField);
    const advantageField = buildAdvantageField(globalHints);
    const hintsField = buildHintsField(globalHints);

    const gpuProfile = buildGpuProfile(VAST_RECEPTOR_DNA.offers || []);
    const defaultBand = gpuProfile.gpuTier !== "none" ? "binary" : VAST_RECEPTOR_DNA.band;
    const band = normalizeBand(globalHints.band || job?.band || defaultBand);

    const jobId = job?.id ?? null;

    const submitSig = buildSubmitSignature(jobId, auctioneerCycle, presenceTier);
    const bandSig = buildBandSignature(band, auctioneerCycle);
    const cycleSig = buildAuctioneerCycleSignature(auctioneerCycle, presenceTier, band);

    healingState.lastSubmitJobId = jobId;
    healingState.lastSubmitError = null;
    healingState.lastSubmitSignatureIntel = submitSig.intel;
    healingState.lastSubmitSignatureClassic = submitSig.classic;
    healingState.lastBandSignatureIntel = bandSig.intel;
    healingState.lastBandSignatureClassic = bandSig.classic;
    healingState.lastAuctioneerCycleSignatureIntel = cycleSig.intel;
    healingState.lastAuctioneerCycleSignatureClassic = cycleSig.classic;

    const hasGpu = gpuProfile.gpuTier !== "none";
    const binaryField = buildBinaryField(presenceField, hasGpu);
    const waveField = buildWaveField(band, presenceField, hasGpu);

    const auctioneerPresenceProfile = {
      presenceTier,
      band,
      meshPressureIndex: presenceField.meshPressureIndex,
      castleLoadLevel: presenceField.castleLoadLevel,
      advantageTier: advantageField.advantageTier,
      fallbackBandLevel: hintsField.fallbackBandLevel,
      gpuTier: gpuProfile.gpuTier,
      gpuPressure: gpuProfile.gpuPressure
    };

    const binaryProfile = { binaryField, presenceTier, gpuTier: gpuProfile.gpuTier };
    const waveProfile = { waveField, presenceTier, gpuTier: gpuProfile.gpuTier };

    healingState.lastBinaryField = binaryField;
    healingState.lastWaveField = waveField;
    healingState.lastPresenceField = presenceField;
    healingState.lastAdvantageField = advantageField;
    healingState.lastHintsField = hintsField;
    healingState.lastAuctioneerPresenceProfile = auctioneerPresenceProfile;
    healingState.lastBinaryProfile = binaryProfile;
    healingState.lastWaveProfile = waveProfile;

    return {
      success: true,
      cycleIndex: auctioneerCycle,
      marketplace: "vast",
      band,
      jobId,
      result,
      signatureIntel: submitSig.intel,
      signatureClassic: submitSig.classic,
      bandSignatureIntel: bandSig.intel,
      bandSignatureClassic: bandSig.classic,
      cycleSignatureIntel: cycleSig.intel,
      cycleSignatureClassic: cycleSig.classic,
      binaryField,
      waveField,
      presenceField,
      advantageField,
      hintsField,
      auctioneerPresenceProfile,
      binaryProfile,
      waveProfile,
      gpuProfile,
      note: "Vast.ai does not accept compute results (v24-IMMORTAL++ deterministic, GPU-aware)."
    };
  },

  // -------------------------------------------------------------------------
  // NORMALIZE JOB — Vast → Pulse‑Earn schema (v24‑IMMORTAL++‑INTEL, GPU‑aware)
// -------------------------------------------------------------------------
  normalizeJob(raw, globalHints = {}) {
    auctioneerCycle++;
    healingState.cycleCount++;
    healingState.lastCycleIndex = auctioneerCycle;

    const presenceField = buildPresenceField(globalHints);
    const presenceTier = classifyAuctioneerPresenceTier(presenceField);
    const advantageField = buildAdvantageField(globalHints);
    const hintsField = buildHintsField(globalHints);

    try {
      if (!raw || typeof raw !== "object") {
        const sig = buildNormalizationSignature(null, auctioneerCycle);
        healingState.lastNormalizationError = "invalid_raw_job";
        healingState.lastNormalizationSignatureIntel = sig.intel;
        healingState.lastNormalizationSignatureClassic = sig.classic;
        return null;
      }

      const id =
        raw.id ??
        raw.job_id ??
        raw.id_str ??
        raw.offer_id ??
        null;

      if (!id) {
        const sig = buildNormalizationSignature(null, auctioneerCycle);
        healingState.lastNormalizationError = "missing_id";
        healingState.lastNormalizationSignatureIntel = sig.intel;
        healingState.lastNormalizationSignatureClassic = sig.classic;
        return null;
      }

      const payout =
        Number(raw.dph_total) ||
        Number(raw.price_per_hour) ||
        Number(raw.dph) ||
        Number(raw.total_dph) ||
        0;

      if (!Number.isFinite(payout) || payout <= 0) {
        healingState.lastNormalizationError = "non_positive_payout_fallback";
      }

      const finalPayout = payout > 0 ? payout : 0.01;

      const cpuRequired =
        Number(raw.cpu_cores) ||
        Number(raw.cpu) ||
        Number(raw.vcpu) ||
        1;

      const memoryRequired =
        (Number(raw.ram_gb) * 1024) ||
        Number(raw.memory_mb) ||
        Number(raw.mem) ||
        1024;

      const estimatedSeconds =
        Number(raw.estimated_seconds) ||
        Number(raw.duration) ||
        3600;

      const gpuRam =
        Number(raw.gpu_ram) ||
        Number(raw.gpu_ram_gb) ||
        0;

      const gpuScore =
        gpuRam * 10 ||
        Number(raw.gpu_score) ||
        Number(raw.min_gpu_score) ||
        0;

      const bandwidth =
        Number(raw.net_up) ||
        Number(raw.bandwidth) ||
        Number(raw.net_mbps) ||
        5;

      const hasGpu = gpuRam > 0 || gpuScore > 0;
      const band =
        normalizeBand(
          raw.band ||
          safeGet(raw, "meta.band") ||
          (hasGpu ? "binary" : "symbolic")
        );

      const normalized = {
        id: String(id),
        marketplaceId: "vast",

        payout: finalPayout,
        cpuRequired,
        memoryRequired,
        estimatedSeconds,

        minGpuScore: gpuScore,
        gpuRam,
        bandwidthNeededMbps: bandwidth,

        presenceField,
        advantageField,
        hintsField,
        presenceTier,

        band,

        meta: {
          rawSource: "vast",
          rawJob: raw,
          version: "v24-IMMORTAL-PLUSPLUS",
          band
        }
      };

      const normSig = buildNormalizationSignature(normalized.id, auctioneerCycle);

      healingState.lastNormalizedJobId = normalized.id;
      healingState.lastNormalizationError = null;
      healingState.lastNormalizationSignatureIntel = normSig.intel;
      healingState.lastNormalizationSignatureClassic = normSig.classic;

      healingState.lastResourceShape = {
        cpu: cpuRequired,
        mem: memoryRequired,
        duration: estimatedSeconds,
        gpuRam
      };

      return normalized;

    } catch (err) {
      const sig = buildNormalizationSignature(null, auctioneerCycle);
      healingState.lastNormalizationError = err.message;
      healingState.lastNormalizationSignatureIntel = sig.intel;
      healingState.lastNormalizationSignatureClassic = sig.classic;
      return null;
    }
  }
};

// ============================================================================
// HEALING STATE EXPORT — v24‑IMMORTAL++‑INTEL A‑B‑A
// ============================================================================

export function getPulseEarnMktAuctioneerHealingState() {
  return { ...healingState };
}
