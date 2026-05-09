// ============================================================================
// FILE: tropic-pulse-functions/PULSE-WORLD/PULSE-EARN/PulseEarnMktAuctioneer-v16.js
// LAYER: MARKETPLACE AUCTIONEER (v16‑IMMORTAL‑INTEL‑DUALHASH A‑B‑A)
// Vast.ai Deterministic Adapter + Presence/Advantage/Hints/Factoring Surfaces
// ============================================================================
//
// ROLE (v16‑IMMORTAL‑INTEL A‑B‑A):
//   • Deterministic Vast.ai → Pulse‑Earn adapter.
//   • Pure receptor phenotype: ping(), fetchJobs(), normalizeJob(), submitResult().
//   • Emits A‑B‑A bandSignature + binaryField + waveField + presence/advantage/hints.
//   • Emits deterministic volatility + healing metadata.
//   • Emits dual INTEL + classic signatures for all receptor events.
//   • Zero async, zero randomness, zero timestamps.
//
// CONTRACT:
//   • PURE RECEPTOR — deterministic, drift‑proof.
//   • NO network, NO fetch, NO async, NO randomness.
//   • NEVER mutate external objects.
//   • Presence/advantage/hints are metadata-only.
//   • Dual‑hash INTEL signatures (INTEL + classic fallback).
// ============================================================================

/*
AI_EXPERIENCE_META = {
  identity: "PulseEarnMktAuctioneer",
  version: "v16-IMMORTAL-INTEL",
  layer: "earn_market",
  role: "earn_market_auctioneer",
  lineage: "PulseEarnMktAuctioneer-v11 → v12.3 → v13.0-Presence-Immortal → v16-IMMORTAL-INTEL",

  evo: {
    marketAuctioneer: true,
    jobScoring: true,
    jobRanking: true,
    jobValuation: true,
    dualBand: true,
    symbolicPrimary: true,
    binaryAware: true,

    deterministic: true,
    deterministicField: true,
    driftProof: true,
    pureCompute: true,
    zeroMutationOfInput: true,
    zeroNetwork: true,
    zeroFilesystem: true,
    zeroAsync: true,
    zeroRandomness: true,

    chunkAware: true,
    prewarmAware: true,
    cacheAware: true,

    intelSignatureAware: true,
    dualHashAware: true,
    structureAware: true,
    contextAware: true
  },

  contract: {
    always: [
      "PulseEarnMktAmbassador",
      "PulseEarnCustomReceptorMkt",
      "PulseEarnCirculatorySystem",
      "PulseEarnMetabolism",
      "PulseEarnLymphNodes"
    ],
    never: [
      "safeRoute",
      "fetchViaCNS",
      "userScript",
      "dynamicEval"
    ]
  }
}
*/

export const PulseEarnMktAuctioneerMeta = Object.freeze({
  layer: "PulseEarnMktAuctioneer",
  role: "EARN_MARKETPLACE_RECEPTOR",
  version: "v16-IMMORTAL-INTEL",
  identity: "PulseEarnMktAuctioneer-v16-IMMORTAL-INTEL",

  guarantees: Object.freeze({
    deterministic: true,
    noRandomness: true,
    noRealTime: true,
    noExternalIO: true,
    pureReceptor: true,
    dualBandAware: true,
    binaryAware: true,
    waveFieldAware: true,
    healingMetadataAware: true,
    presenceAware: true,
    advantageAware: true,
    hintsAware: true,
    meshAware: true,
    castleAware: true,
    regionAware: true,
    worldLensAware: false,
    zeroNetwork: true,
    zeroAsync: true,
    zeroAI: true,
    zeroUserCode: true,
    volatilityDeterministic: true
  }),

  contract: Object.freeze({
    input: [
      "VastAIDNA",
      "DualBandContext",
      "ReceptorNormalizationRules",
      "GlobalHintsPresenceField"
    ],
    output: [
      "ReceptorPingResult",
      "ReceptorJobList",
      "ReceptorSubmissionResult",
      "ReceptorNormalizationResult",
      "ReceptorSignatures",
      "AuctioneerHealingState"
    ]
  }),

  lineage: Object.freeze({
    root: "PulseOS-v11-Evo",
    parent: "PulseEarn-v16-IMMORTAL-INTEL",
    ancestry: [
      "PulseEarnMktAuctioneer-v9",
      "PulseEarnMktAuctioneer-v10",
      "PulseEarnMktAuctioneer-v11",
      "PulseEarnMktAuctioneer-v11-Evo",
      "PulseEarnMktAuctioneer-v12.3-Presence-Evo+",
      "PulseEarnMktAuctioneer-v13.0-Presence-Immortal"
    ]
  }),

  bands: Object.freeze({
    supported: ["symbolic", "binary"],
    default: "symbolic",
    behavior: "metadata-only"
  }),

  architecture: Object.freeze({
    pattern: "A-B-A",
    baseline: "deterministic Vast.ai receptor phenotype",
    adaptive: "binary/wave surfaces + volatility + presence/advantage/hints",
    return: "deterministic ping/fetchJobs/normalizeJob/submitResult"
  })
});

// ============================================================================
// HASH HELPERS — v16‑IMMORTAL‑INTEL (dual‑hash)
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
  const classicHash = computeHash(
    `${label}::${classicString || ""}`
  );
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
// HEALING METADATA — v16‑IMMORTAL‑INTEL
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

  lastPayloadVersion: "16-IMMORTAL-INTEL",
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

  // Presence / advantage / hints
  lastPresenceField: null,
  lastAdvantageField: null,
  lastHintsField: null,
  lastAuctioneerPresenceProfile: null,
  lastBinaryProfile: null,
  lastWaveProfile: null
};

// ============================================================================
// SIGNATURE BUILDERS — v16‑IMMORTAL‑INTEL
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
// A‑B‑A Binary + Wave Surfaces (Presence‑aware, INTEL)
// ============================================================================

function buildBinaryField(presenceField) {
  const patternLen = 8;
  const mesh = Number(presenceField?.meshPressureIndex || 0);
  const castle = Number(presenceField?.castleLoadLevel || 0);

  const density =
    patternLen +
    (healingState.lastFetchCount || 0) +
    (healingState.lastPingMs || 0) +
    mesh +
    castle;

  const surface = density + patternLen;

  const intelPayload = {
    kind: "auctioneerBinarySurface",
    patternLen,
    density,
    meshPressureIndex: mesh,
    castleLoadLevel: castle,
    surface
  };

  const classicString = `BAUCTIONEER::${surface}`;
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
      surface
    },
    parity: surface % 2 === 0 ? 0 : 1,
    shiftDepth: Math.max(0, Math.floor(Math.log2(surface || 1)))
  };

  healingState.lastBinaryField = field;
  return field;
}

function buildWaveField(band, presenceField) {
  const amplitudeBase = (healingState.lastFetchCount || 1) * 10;
  const mesh = Number(presenceField?.meshStrength || 0);
  const amplitude = amplitudeBase + mesh;
  const wavelength = (healingState.lastPingMs || 10) + 1;
  const phase = (amplitude + (presenceField?.meshPressureIndex || 0)) % 16;

  const intelPayload = {
    kind: "auctioneerWaveSurface",
    band,
    amplitude,
    wavelength,
    phase,
    meshStrength: presenceField?.meshStrength || 0
  };

  const classicString = `BAUCTIONEER_WAVE::${band}::AMP::${amplitude}`;
  const sig = buildDualHashSignature("BAUCTIONEER_WAVE", intelPayload, classicString);

  const field = {
    wavePhenotypeSignatureIntel: sig.intel,
    wavePhenotypeSignatureClassic: sig.classic,
    amplitude,
    wavelength,
    phase,
    band,
    mode: band === "binary" ? "compression-wave" : "symbolic-wave"
  };

  healingState.lastWaveField = field;
  return field;
}

// ============================================================================
// DETERMINISTIC VAST.AI DNA — v16‑IMMORTAL‑INTEL baseline
// ============================================================================

const VAST_RECEPTOR_DNA = {
  pingLatency: 42,

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

  version: "16-IMMORTAL-INTEL",
  lineage: "Auctioneer-Vast-v16-IMMORTAL-INTEL",
  phenotype: "MarketplaceAuctioneer"
};

// ============================================================================
// Presence / Advantage / Hints Surfaces (auctioneer-level, v16)
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
    presenceVersion: "v16-IMMORTAL-INTEL",

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
    advantageVersion: "C-16.0",
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
// AUCTIONEER — Vast.ai Marketplace Adapter (v16‑IMMORTAL‑INTEL A‑B‑A)
// ============================================================================

export const PulseEarnMktAuctioneer = {
  id: "vast",
  name: "Vast.ai",
  version: "v16-IMMORTAL-INTEL",
  lineage: "Auctioneer-Vast-v16-IMMORTAL-INTEL",

  // -------------------------------------------------------------------------
  // PING — deterministic latency + A‑B‑A + presence surfaces
  // -------------------------------------------------------------------------
  ping(globalHints = {}) {
    auctioneerCycle++;
    healingState.cycleCount++;
    healingState.lastCycleIndex = auctioneerCycle;

    const latency = VAST_RECEPTOR_DNA.pingLatency;
    const band = normalizeBand(VAST_RECEPTOR_DNA.band);

    const presenceField = buildPresenceField(globalHints);
    const presenceTier = classifyAuctioneerPresenceTier(presenceField);
    const advantageField = buildAdvantageField(globalHints);
    const hintsField = buildHintsField(globalHints);

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

    const binaryField = buildBinaryField(presenceField);
    const waveField = buildWaveField(band, presenceField);

    const auctioneerPresenceProfile = {
      presenceTier,
      band,
      meshPressureIndex: presenceField.meshPressureIndex,
      castleLoadLevel: presenceField.castleLoadLevel,
      advantageTier: advantageField.advantageTier,
      fallbackBandLevel: hintsField.fallbackBandLevel
    };

    const binaryProfile = { binaryField, presenceTier };
    const waveProfile = { waveField, presenceTier };

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
      waveProfile
    };
  },

  // -------------------------------------------------------------------------
  // FETCH JOBS — deterministic offers + A‑B‑A + presence surfaces
  // -------------------------------------------------------------------------
  fetchJobs(globalHints = {}) {
    auctioneerCycle++;
    healingState.cycleCount++;
    healingState.lastCycleIndex = auctioneerCycle;

    const band = normalizeBand(VAST_RECEPTOR_DNA.band);
    const presenceField = buildPresenceField(globalHints);
    const presenceTier = classifyAuctioneerPresenceTier(presenceField);
    const advantageField = buildAdvantageField(globalHints);
    const hintsField = buildHintsField(globalHints);

    healingState.lastBand = band;

    try {
      const offers = VAST_RECEPTOR_DNA.offers || [];

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

      const binaryField = buildBinaryField(presenceField);
      const waveField = buildWaveField(band, presenceField);

      const auctioneerPresenceProfile = {
        presenceTier,
        band,
        meshPressureIndex: presenceField.meshPressureIndex,
        castleLoadLevel: presenceField.castleLoadLevel,
        advantageTier: advantageField.advantageTier,
        fallbackBandLevel: hintsField.fallbackBandLevel
      };

      const binaryProfile = { binaryField, presenceTier };
      const waveProfile = { waveField, presenceTier };

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
        waveProfile
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
        waveProfile: null
      };
    }
  },

  // -------------------------------------------------------------------------
  // SUBMIT RESULT — Vast.ai does NOT accept compute results (presence‑aware)
// -------------------------------------------------------------------------
  submitResult(job, result, globalHints = {}) {
    auctioneerCycle++;
    healingState.cycleCount++;
    healingState.lastCycleIndex = auctioneerCycle;

    const band = normalizeBand(VAST_RECEPTOR_DNA.band);
    const presenceField = buildPresenceField(globalHints);
    const presenceTier = classifyAuctioneerPresenceTier(presenceField);
    const advantageField = buildAdvantageField(globalHints);
    const hintsField = buildHintsField(globalHints);

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

    const binaryField = buildBinaryField(presenceField);
    const waveField = buildWaveField(band, presenceField);

    const auctioneerPresenceProfile = {
      presenceTier,
      band,
      meshPressureIndex: presenceField.meshPressureIndex,
      castleLoadLevel: presenceField.castleLoadLevel,
      advantageTier: advantageField.advantageTier,
      fallbackBandLevel: hintsField.fallbackBandLevel
    };

    const binaryProfile = { binaryField, presenceTier };
    const waveProfile = { waveField, presenceTier };

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
      note: "Vast.ai does not accept compute results (v16-IMMORTAL-INTEL deterministic)."
    };
  },

  // -------------------------------------------------------------------------
  // NORMALIZE JOB — Vast → Pulse‑Earn schema (v16‑IMMORTAL‑INTEL)
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

      const gpuScore =
        Number(raw.gpu_ram) * 10 ||
        Number(raw.gpu_score) ||
        Number(raw.min_gpu_score) ||
        80;

      const bandwidth =
        Number(raw.net_up) ||
        Number(raw.bandwidth) ||
        Number(raw.net_mbps) ||
        5;

      const normalized = {
        id: String(id),
        marketplaceId: "vast",

        payout: finalPayout,
        cpuRequired,
        memoryRequired,
        estimatedSeconds,

        minGpuScore: gpuScore,
        bandwidthNeededMbps: bandwidth,

        presenceField,
        advantageField,
        hintsField,
        presenceTier,

        meta: {
          rawSource: "vast",
          rawJob: raw,
          version: "v16-IMMORTAL-INTEL",
          band: raw.band || safeGet(raw, "meta.band") || "symbolic"
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
        duration: estimatedSeconds
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
// HEALING STATE EXPORT — v16‑IMMORTAL‑INTEL A‑B‑A
// ============================================================================

export function getPulseEarnMktAuctioneerHealingState() {
  return { ...healingState };
}
