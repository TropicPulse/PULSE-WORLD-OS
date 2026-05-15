// ============================================================================
// FILE: tropic-pulse-functions/PULSE-MULTIVERSE/PULSEWORLD/PULSE-EARN/PulseEarnMktAmbassador-v24-IMMORTAL-PLUSPLUS.js
// LAYER: THE AMBASSADOR (v24‑IMMORTAL‑PLUSPLUS + A‑B‑A + INTEL)
// ============================================================================
//
// ROLE (v24‑IMMORTAL‑PLUSPLUS):
//   THE AMBASSADOR — deterministic Akash marketplace receptor.
//   • Normalizes Akash leases into unified Earn job schema.
//   • Emits unified presence/advantage/hints surfaces (v24+).
//   • Emits A‑B‑A binary/wave surfaces (INTEL + classic signatures).
//   • Deterministic ping(), fetchJobs(), submitResult(), normalizeJob().
//   • PURE RECEPTOR: no network, no async, no randomness.
//
// CONTRACT:
//   • PURE SYMBOLIC RECEPTOR — drift‑proof, zero IO.
//   • Earn‑aware, NodeAdmin‑aware, Organism‑aware artery surfaces.
//   • Dual‑hash INTEL signatures (INTEL + classic fallback).
//   • v24 OrganismIdentity‑backed meta.
// ============================================================================

import {
  OrganismIdentity,
  buildPulseOrganismMap as buildOrganismMap
} from "../X-PULSE-X/PULSE-WORLD-MAPORGANISM.jssss
";

const Identity = OrganismIdentity(import.meta.url);

// ============================================================================
//  META BLOCK — v24.0 IMMORTAL (ORGANISM KERNEL)
// ============================================================================

export const PulseEarnAmbassadorMeta = Identity.OrganMeta;

// Required 3 for every “surface” in the organism graph
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;

// Optional: richer experience meta for AI / tooling
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

// ============================================================================
// Deterministic Akash Receptor DNA (INTEL‑aware but static)
// ============================================================================

const AKASH_RECEPTOR_DNA = {
  pingLatency: 87,

  leases: [
    {
      id: "akash-001",
      state: "active",
      price: { amount: 0.12 },
      resources: {
        cpu: { units: 4 },
        memory: { quantity: 4096 },
        gpu: null
      },
      duration: 1200
    },
    {
      id: "akash-002",
      state: "open",
      price: { amount: 0.20 },
      resources: {
        cpu: { units: 8 },
        memory: { quantity: 8192 },
        gpu: { units: 1 }
      },
      duration: 2400
    }
  ],

  version: "24-IMMORTAL-PLUSPLUS",
  lineage: "Ambassador-Akash-v24-IMMORTAL-PLUSPLUS",
  phenotype: "MarketplaceAmbassador"
};

// ============================================================================
// Healing Metadata — v24‑IMMORTAL‑PLUSPLUS
// ============================================================================

const ambassadorHealing = {
  lastPingOk: null,
  lastPingError: null,

  lastFetchCount: 0,
  lastFetchError: null,

  lastSubmitJobId: null,
  lastSubmitError: null,

  lastNormalizedJobId: null,
  lastNormalizationError: null,

  lastLeaseState: null,
  lastPayloadVersion: null,
  lastResourceShape: null,

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

  lastAmbassadorCycleSignatureIntel: null,
  lastAmbassadorCycleSignatureClassic: null,

  // Band + binary/wave
  lastBand: "symbolic",
  lastBandSignatureIntel: null,
  lastBandSignatureClassic: null,
  lastBinaryField: null,
  lastWaveField: null,

  // Presence / advantage / hints / chunk-prewarm
  lastPresenceField: null,
  lastAdvantageField: null,
  lastHintsField: null,
  lastChunkPrewarmPlan: null
};

// ============================================================================
// Deterministic Cycle Counter
// ============================================================================

let ambassadorCycle = 0;

// ============================================================================
// Deterministic Hash Helpers — INTEL + Classic Fallback
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

function buildBandSignature(band, cycleIndex) {
  const intelPayload = {
    kind: "band",
    band: normalizeBand(band),
    cycleIndex
  };
  const classicString = `AMBASSADOR_BAND::${normalizeBand(band)}::CYCLE::${cycleIndex}`;
  return buildDualHashSignature("AMBASSADOR_BAND", intelPayload, classicString);
}

// ============================================================================
// A‑B‑A Surfaces (INTEL)
// ============================================================================

function buildBinaryField(cycle, hasGpu, presenceField) {
  const patternLen = hasGpu ? 16 : 10;
  const baseDensity = patternLen + cycle + (hasGpu ? 25 : 8);

  const mesh = Number(presenceField.meshPressureIndex || 0);
  const castle = Number(presenceField.castleLoadLevel || 0);

  const density = baseDensity + mesh + castle;
  const surface = density + patternLen;

  const intelPayload = {
    kind: "ambassadorBinarySurface",
    patternLen,
    density,
    meshPressureIndex: mesh,
    castleLoadLevel: castle,
    surface,
    cycle
  };

  const classicString = `BAKASH::${surface}`;

  const sig = buildDualHashSignature("BAKASH", intelPayload, classicString);

  return {
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
}

function buildWaveField(cycle, band, presenceField) {
  const mesh = Number(presenceField.meshStrength || 0);
  const amplitude = (cycle + 1) * (band === "binary" ? 14 : 7) + mesh;
  const wavelength = amplitude + 5;
  const phase = (amplitude + (presenceField.meshPressureIndex || 0)) % 16;

  const intelPayload = {
    kind: "ambassadorWaveSurface",
    cycle,
    band,
    amplitude,
    wavelength,
    phase,
    meshStrength: presenceField.meshStrength || 0
  };

  const classicString = `BAKASH_WAVE::${cycle}::${band}`;

  const sig = buildDualHashSignature("BAKASH_WAVE", intelPayload, classicString);

  return {
    wavePhenotypeSignatureIntel: sig.intel,
    wavePhenotypeSignatureClassic: sig.classic,
    amplitude,
    wavelength,
    phase,
    band,
    mode: band === "binary" ? "compression-wave" : "symbolic-wave"
  };
}

// ============================================================================
// Unified Earn Presence Tier
// ============================================================================

function classifyPresenceTier(pressure) {
  if (pressure >= 150) return "critical";
  if (pressure >= 100) return "high";
  if (pressure >= 50) return "elevated";
  if (pressure > 0) return "soft";
  return "idle";
}

// ============================================================================
// Unified Presence Field (INTEL)
// ============================================================================

function buildPresenceField(globalHints = {}, cycle) {
  const ghP = globalHints.presenceContext || {};
  const mesh = globalHints.meshSignals || {};
  const castle = globalHints.castleSignals || {};
  const region = globalHints.regionContext || {};

  const meshStrength = Number(mesh.meshStrength || 0);
  const meshPressureExternal = Number(mesh.meshPressureIndex || 0);
  const castleLoadExternal = Number(castle.loadLevel || 0);

  const internalComposite = cycle * 0.0001;
  const internalPressure = Math.floor(internalComposite * 1000);

  const meshPressureIndex = meshPressureExternal + internalPressure;
  const castleLoadLevel = castleLoadExternal;

  const pressure = meshPressureIndex + castleLoadLevel;
  const presenceTier = classifyPresenceTier(pressure);

  const intelPayload = {
    kind: "ambassadorPresence",
    presenceTier,
    meshPressureIndex,
    castleLoadLevel,
    meshStrength,
    regionId: region.regionId || "ambassador-region",
    castleId: castle.castleId || "ambassador-castle",
    cycle
  };

  const classicString = `AMBASSADOR_PRESENCE::${presenceTier}::${meshPressureIndex}::${castleLoadLevel}`;

  const sig = buildDualHashSignature("AMBASSADOR_PRESENCE", intelPayload, classicString);

  return {
    presenceVersion: "v24-IMMORTAL-PLUSPLUS",
    presenceTier,

    presenceSignatureIntel: sig.intel,
    presenceSignatureClassic: sig.classic,

    bandPresence: ghP.bandPresence || "symbolic",
    routerPresence: ghP.routerPresence || "stable",
    devicePresence: ghP.devicePresence || "ambassador",

    meshPresence: ghP.meshPresence || (meshStrength > 0 ? "mesh-active" : "mesh-idle"),
    castlePresence: ghP.castlePresence || castle.castlePresence || "ambassador-region",
    regionPresence: ghP.regionPresence || region.regionTag || "unknown-region",

    regionId: region.regionId || "ambassador-region",
    castleId: castle.castleId || "ambassador-castle",

    meshStrength,
    meshPressureIndex,
    castleLoadLevel,

    cycle
  };
}

// ============================================================================
// Advantage‑C v24 (INTEL)
// ============================================================================

function buildAdvantageField(bandPack, presenceField, globalHints = {}) {
  const density = bandPack.binaryField.binarySurface.density;
  const amplitude = bandPack.waveField.amplitude;

  const baseScore = density * 0.00001 + amplitude * 0.00001;

  const presenceBoost =
    presenceField.presenceTier === "critical"
      ? 0.02
      : presenceField.presenceTier === "high"
      ? 0.015
      : presenceField.presenceTier === "elevated"
      ? 0.01
      : presenceField.presenceTier === "soft"
      ? 0.005
      : 0;

  const advantageScore = baseScore + presenceBoost;

  let advantageTier = 0;
  if (advantageScore >= 0.05) advantageTier = 3;
  else if (advantageScore >= 0.02) advantageTier = 2;
  else if (advantageScore > 0) advantageTier = 1;

  const fallbackBandLevel = globalHints.fallbackBandLevel ?? 0;

  return {
    advantageVersion: "C-24.0",
    advantageScore,
    advantageTier,
    fallbackBandLevel
  };
}

// ============================================================================
// Hints Field (chunk/cache/prewarm/coldStart)
// ============================================================================

function buildHintsField(globalHints = {}) {
  const jh = globalHints.hintsContext || {};

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
// Chunk / Cache / Prewarm Plan v24 (INTEL)
// ============================================================================

function buildChunkPrewarmPlan(presenceField, advantageField, hintsField) {
  const basePriority =
    presenceField.presenceTier === "critical"
      ? 4
      : presenceField.presenceTier === "high"
      ? 3
      : presenceField.presenceTier === "elevated"
      ? 2
      : presenceField.presenceTier === "soft"
      ? 1
      : 0;

  const advantageBoost =
    advantageField.advantageTier >= 3 ? 2 :
    advantageField.advantageTier === 2 ? 1 :
    0;

  const hintBoost =
    hintsField.fallbackBandLevel >= 2 ? 1 : 0;

  const priority = basePriority + advantageBoost + hintBoost;

  return {
    planVersion: "v24.0-Ambassador-AdvantageC-INTEL",
    priority,
    band: presenceField.presenceTier,
    chunks: {
      receptorEnvelope: true,
      normalizationBlueprint: true,
      leaseShapeCache: true
    },
    cache: {
      ambassadorDiagnostics: true,
      lastLeaseShapes: true
    },
    prewarm: {
      nervousSystem: true,
      muscleSystem: true,
      lymphNodes: true,
      metabolism: true
    }
  };
}

// ============================================================================
// Cycle Signature (INTEL)
// ============================================================================

function buildAmbassadorCycleSignature(cycleIndex, presenceField, bandPack) {
  const intelPayload = {
    kind: "ambassadorCycle",
    cycleIndex,
    presenceTier: presenceField.presenceTier,
    band: bandPack.band,
    meshPressureIndex: presenceField.meshPressureIndex,
    castleLoadLevel: presenceField.castleLoadLevel
  };

  const classicString = `AMBASSADOR_CYCLE::${cycleIndex}::${presenceField.presenceTier}::${bandPack.band}`;

  return buildDualHashSignature("AMBASSADOR_CYCLE", intelPayload, classicString);
}

// ============================================================================
// Normalization — Akash Lease → Unified Earn Job
// ============================================================================

function normalizeAkashLeaseToEarnJob(lease, cycleIndex, presenceField, bandPack) {
  if (!lease || typeof lease !== "object") {
    const sig = buildDualHashSignature(
      "AMBASSADOR_NORMALIZE",
      { kind: "invalid_raw" },
      "NORM::AKASH::NONE"
    );
    return {
      error: "invalid_raw_lease",
      job: null,
      normalizationSignatureIntel: sig.intel,
      normalizationSignatureClassic: sig.classic
    };
  }

  if (!lease.id) {
    const sig = buildDualHashSignature(
      "AMBASSADOR_NORMALIZE",
      { kind: "missing_id" },
      "NORM::AKASH::NONE"
    );
    return {
      error: "missing_id",
      job: null,
      normalizationSignatureIntel: sig.intel,
      normalizationSignatureClassic: sig.classic
    };
  }

  const payout = Number(lease.price?.amount ?? 0);
  if (!Number.isFinite(payout) || payout <= 0) {
    const sig = buildDualHashSignature(
      "AMBASSADOR_NORMALIZE",
      { kind: "non_positive_payout" },
      "NORM::AKASH::NONE"
    );
    return {
      error: "non_positive_payout",
      job: null,
      normalizationSignatureIntel: sig.intel,
      normalizationSignatureClassic: sig.classic
    };
  }

  const cpuRequired = Number(lease.resources?.cpu?.units ?? 1);
  const memoryRequired = Number(lease.resources?.memory?.quantity ?? 1024);
  const estimatedSeconds = Number(lease.duration ?? 600);

  if (!Number.isFinite(estimatedSeconds) || estimatedSeconds <= 0) {
    const sig = buildDualHashSignature(
      "AMBASSADOR_NORMALIZE",
      { kind: "non_positive_duration" },
      "NORM::AKASH::NONE"
    );
    return {
      error: "non_positive_duration",
      job: null,
      normalizationSignatureIntel: sig.intel,
      normalizationSignatureClassic: sig.classic
    };
  }

  const hasGpu = !!(lease.resources && lease.resources.gpu);
  const band = hasGpu ? "binary" : "symbolic";

  const jobId = String(lease.id);
  const payloadType = "compute";

  const job = {
    id: jobId,
    marketplaceId: "akash",
    band,
    payload: {
      type: payloadType,
      data: {
        leaseId: lease.id,
        resources: lease.resources || {},
        metadata: lease.metadata || {}
      }
    },
    meta: {
      presenceContext: {
        bandPresence: band,
        routerPresence: "ambassador",
        devicePresence: "akash-ambassador",
        meshPresence: presenceField.meshPresence,
        castlePresence: presenceField.castlePresence,
        regionPresence: presenceField.regionPresence
      },
      meshSignals: {
        meshStrength: presenceField.meshStrength,
        meshPressureIndex: presenceField.meshPressureIndex
      },
      castleSignals: {
        loadLevel: presenceField.castleLoadLevel,
        castleId: presenceField.castleId
      },
      regionContext: {
        regionId: presenceField.regionId,
        regionTag: presenceField.regionPresence
      }
    }
  };

  const intelPayload = {
    kind: "normalization",
    cycleIndex,
    jobId,
    leaseId: lease.id,
    band
  };

  const classicString = `AMBASSADOR_NORMALIZE::${jobId}::${lease.id}::${band}`;

  const sig = buildDualHashSignature("AMBASSADOR_NORMALIZE", intelPayload, classicString);

  return {
    error: null,
    job,
    normalizationSignatureIntel: sig.intel,
    normalizationSignatureClassic: sig.classic
  };
}

// ============================================================================
// AMBASSADOR ARTERY SNAPSHOT v5 — Earn / Presence / Advantage / Band
// ============================================================================

export function getAmbassadorArterySnapshotV5({
  ok = false,
  phase = "idle", // ping | fetch | submit
  cycleIndex = 0,
  band = "symbolic",
  presenceField = null,
  advantageField = null,
  hintsField = null,
  jobs = [],
  errors = []
} = {}) {
  const presenceTier = presenceField?.presenceTier || "idle";
  const meshPressureIndex = presenceField?.meshPressureIndex || 0;
  const castleLoadLevel = presenceField?.castleLoadLevel || 0;

  const advantageScore = advantageField?.advantageScore ?? 0;
  const advantageTier = advantageField?.advantageTier ?? 0;

  const jobCount = jobs.length || 0;
  const errorCount = errors.length || 0;

  const pressure = Math.max(
    0,
    Math.min(
      1,
      (meshPressureIndex / 200 + castleLoadLevel / 200 + jobCount / 16) / 3
    )
  );

  const bucketPressure = (v) => {
    if (v >= 0.9) return "overload";
    if (v >= 0.7) return "high";
    if (v >= 0.4) return "medium";
    if (v > 0) return "low";
    return "none";
  };

  const arterySignature = computeHash(
    [
      "AMBASSADOR_ARTERY_V5",
      phase,
      band,
      presenceTier,
      cycleIndex,
      jobCount,
      errorCount,
      pressure.toFixed(3),
      advantageScore.toFixed(5),
      advantageTier
    ].join("::")
  );

  return Object.freeze({
    ok,
    phase,
    band,
    cycleIndex,
    jobs: jobCount,
    errors: errorCount,
    presence: {
      presenceTier,
      meshPressureIndex,
      castleLoadLevel
    },
    advantage: {
      advantageScore,
      advantageTier
    },
    pressure: {
      value: pressure,
      bucket: bucketPressure(pressure)
    },
    hints: hintsField || null,
    meta: {
      version: PulseEarnAmbassadorMeta.version,
      epoch: PulseEarnAmbassadorMeta.evo.epoch,
      identity: PulseEarnAmbassadorMeta.identity,
      arterySignature
    }
  });
}

// ============================================================================
// AMBASSADOR CLIENT — v24‑IMMORTAL‑PLUSPLUS
// ============================================================================

export const PulseEarnMktAmbassador = {
  id: "akash",
  name: "Akash Network",
  version: "v24-IMMORTAL-PLUSPLUS",
  lineage: "Ambassador-Akash-v24-IMMORTAL-PLUSPLUS",

  // -------------------------------------------------------------------------
  // Ping — unified presence
  // -------------------------------------------------------------------------
  ping(globalHints = {}) {
    ambassadorCycle++;
    ambassadorHealing.cycleCount++;
    ambassadorHealing.lastCycleIndex = ambassadorCycle;

    const latency = AKASH_RECEPTOR_DNA.pingLatency;

    const presenceField = buildPresenceField(globalHints, ambassadorCycle);
    const hintsField = buildHintsField(globalHints);

    const band = "symbolic";
    const bandSig = buildBandSignature(band, ambassadorCycle);

    const binaryField = buildBinaryField(ambassadorCycle, false, presenceField);
    const waveField = buildWaveField(ambassadorCycle, band, presenceField);

    const bandPack = { band, binaryField, waveField };

    const advantageField = buildAdvantageField(
      bandPack,
      presenceField,
      globalHints
    );

    const chunkPlan = buildChunkPrewarmPlan(
      presenceField,
      advantageField,
      hintsField
    );

    const cycleSig = buildAmbassadorCycleSignature(
      ambassadorCycle,
      presenceField,
      bandPack
    );

    ambassadorHealing.lastPingOk = true;
    ambassadorHealing.lastPingError = null;

    ambassadorHealing.lastPingSignatureIntel = cycleSig.intel;
    ambassadorHealing.lastPingSignatureClassic = cycleSig.classic;

    ambassadorHealing.lastBand = band;
    ambassadorHealing.lastBandSignatureIntel = bandSig.intel;
    ambassadorHealing.lastBandSignatureClassic = bandSig.classic;

    ambassadorHealing.lastBinaryField = binaryField;
    ambassadorHealing.lastWaveField = waveField;

    ambassadorHealing.lastPresenceField = presenceField;
    ambassadorHealing.lastAdvantageField = advantageField;
    ambassadorHealing.lastHintsField = hintsField;
    ambassadorHealing.lastChunkPrewarmPlan = chunkPlan;

    ambassadorHealing.lastAmbassadorCycleSignatureIntel = cycleSig.intel;
    ambassadorHealing.lastAmbassadorCycleSignatureClassic = cycleSig.classic;

    const artery = getAmbassadorArterySnapshotV5({
      ok: true,
      phase: "ping",
      cycleIndex: ambassadorCycle,
      band,
      presenceField,
      advantageField,
      hintsField,
      jobs: [],
      errors: []
    });

    return {
      latency,
      cycleIndex: ambassadorCycle,
      band,
      signatureIntel: cycleSig.intel,
      signatureClassic: cycleSig.classic,
      bandSignatureIntel: bandSig.intel,
      bandSignatureClassic: bandSig.classic,
      binaryField,
      waveField,
      presenceField,
      advantageField,
      hintsField,
      chunkPlan,
      artery
    };
  },

  // -------------------------------------------------------------------------
  // Fetch Jobs — unified presence
  // -------------------------------------------------------------------------
  fetchJobs(globalHints = {}) {
    ambassadorCycle++;
    ambassadorHealing.cycleCount++;
    ambassadorHealing.lastCycleIndex = ambassadorCycle;

    const presenceField = buildPresenceField(globalHints, ambassadorCycle);
    const hintsField = buildHintsField(globalHints);

    const band = "symbolic";
    const bandSig = buildBandSignature(band, ambassadorCycle);

    const binaryField = buildBinaryField(ambassadorCycle, false, presenceField);
    const waveField = buildWaveField(ambassadorCycle, band, presenceField);

    const bandPack = { band, binaryField, waveField };

    const advantageField = buildAdvantageField(
      bandPack,
      presenceField,
      globalHints
    );

    const chunkPlan = buildChunkPrewarmPlan(
      presenceField,
      advantageField,
      hintsField
    );

    try {
      const leases = AKASH_RECEPTOR_DNA.leases;
      ambassadorHealing.lastPayloadVersion = "24-akash-dna";

      const jobs = [];
      const errors = [];

      if (!Array.isArray(leases)) {
        const intelPayload = {
          kind: "fetch",
          cycleIndex: ambassadorCycle,
          jobCount: 0,
          errorCount: 1,
          band
        };
        const classicString = `AMBASSADOR_FETCH::${ambassadorCycle}::JOBS::0::ERR::1::${band}`;
        const fetchSig = buildDualHashSignature(
          "AMBASSADOR_FETCH",
          intelPayload,
          classicString
        );

        ambassadorHealing.lastFetchError = "invalid_leases_payload";
        ambassadorHealing.lastFetchCount = 0;
        ambassadorHealing.lastFetchSignatureIntel = fetchSig.intel;
        ambassadorHealing.lastFetchSignatureClassic = fetchSig.classic;

        ambassadorHealing.lastBand = band;
        ambassadorHealing.lastBandSignatureIntel = bandSig.intel;
        ambassadorHealing.lastBandSignatureClassic = bandSig.classic;

        ambassadorHealing.lastBinaryField = binaryField;
        ambassadorHealing.lastWaveField = waveField;

        ambassadorHealing.lastPresenceField = presenceField;
        ambassadorHealing.lastAdvantageField = advantageField;
        ambassadorHealing.lastHintsField = hintsField;
        ambassadorHealing.lastChunkPrewarmPlan = chunkPlan;

        ambassadorHealing.lastAmbassadorCycleSignatureIntel = fetchSig.intel;
        ambassadorHealing.lastAmbassadorCycleSignatureClassic = fetchSig.classic;

        const artery = getAmbassadorArterySnapshotV5({
          ok: false,
          phase: "fetch",
          cycleIndex: ambassadorCycle,
          band,
          presenceField,
          advantageField,
          hintsField,
          jobs: [],
          errors: [{ error: "invalid_leases_payload" }]
        });

        return {
          success: false,
          cycleIndex: ambassadorCycle,
          band,
          jobs: [],
          errors: [{ error: "invalid_leases_payload" }],
          presenceField,
          advantageField,
          hintsField,
          chunkPlan,
          binaryField,
          waveField,
          fetchSignatureIntel: fetchSig.intel,
          fetchSignatureClassic: fetchSig.classic,
          artery
        };
      }

      for (let i = 0; i < leases.length; i++) {
        const lease = leases[i];
        const norm = normalizeAkashLeaseToEarnJob(
          lease,
          ambassadorCycle,
          presenceField,
          bandPack
        );
        if (norm.error) {
          errors.push({ index: i, error: norm.error });
        } else {
          jobs.push({
            job: norm.job,
            normalizationSignatureIntel: norm.normalizationSignatureIntel,
            normalizationSignatureClassic: norm.normalizationSignatureClassic
          });
          ambassadorHealing.lastNormalizedJobId = norm.job.id;
          ambassadorHealing.lastNormalizationError = null;
          ambassadorHealing.lastNormalizationSignatureIntel =
            norm.normalizationSignatureIntel;
          ambassadorHealing.lastNormalizationSignatureClassic =
            norm.normalizationSignatureClassic;
        }
      }

      const intelPayload = {
        kind: "fetch",
        cycleIndex: ambassadorCycle,
        jobCount: jobs.length,
        errorCount: errors.length,
        band
      };
      const classicString = `AMBASSADOR_FETCH::${ambassadorCycle}::JOBS::${jobs.length}::ERR::${errors.length}::${band}`;
      const fetchSig = buildDualHashSignature(
        "AMBASSADOR_FETCH",
        intelPayload,
        classicString
      );

      ambassadorHealing.lastFetchError =
        errors.length > 0 ? "partial_errors" : null;
      ambassadorHealing.lastFetchCount = jobs.length;
      ambassadorHealing.lastFetchSignatureIntel = fetchSig.intel;
      ambassadorHealing.lastFetchSignatureClassic = fetchSig.classic;

      ambassadorHealing.lastBand = band;
      ambassadorHealing.lastBandSignatureIntel = bandSig.intel;
      ambassadorHealing.lastBandSignatureClassic = bandSig.classic;

      ambassadorHealing.lastBinaryField = binaryField;
      ambassadorHealing.lastWaveField = waveField;

      ambassadorHealing.lastPresenceField = presenceField;
      ambassadorHealing.lastAdvantageField = advantageField;
      ambassadorHealing.lastHintsField = hintsField;
      ambassadorHealing.lastChunkPrewarmPlan = chunkPlan;

      ambassadorHealing.lastAmbassadorCycleSignatureIntel = fetchSig.intel;
      ambassadorHealing.lastAmbassadorCycleSignatureClassic = fetchSig.classic;

      const artery = getAmbassadorArterySnapshotV5({
        ok: true,
        phase: "fetch",
        cycleIndex: ambassadorCycle,
        band,
        presenceField,
        advantageField,
        hintsField,
        jobs,
        errors
      });

      return {
        success: true,
        cycleIndex: ambassadorCycle,
        band,
        jobs,
        errors,
        presenceField,
        advantageField,
        hintsField,
        chunkPlan,
        binaryField,
        waveField,
        fetchSignatureIntel: fetchSig.intel,
        fetchSignatureClassic: fetchSig.classic,
        artery
      };
    } catch (err) {
      const intelPayload = {
        kind: "fetch",
        cycleIndex: ambassadorCycle,
        jobCount: 0,
        errorCount: 1,
        band
      };
      const classicString = `AMBASSADOR_FETCH::${ambassadorCycle}::JOBS::0::ERR::1::${band}`;
      const fetchSig = buildDualHashSignature(
        "AMBASSADOR_FETCH",
        intelPayload,
        classicString
      );

      ambassadorHealing.lastFetchError = err.message;
      ambassadorHealing.lastFetchCount = 0;
      ambassadorHealing.lastFetchSignatureIntel = fetchSig.intel;
      ambassadorHealing.lastFetchSignatureClassic = fetchSig.classic;

      ambassadorHealing.lastBand = band;
      ambassadorHealing.lastBandSignatureIntel = bandSig.intel;
      ambassadorHealing.lastBandSignatureClassic = bandSig.classic;

      ambassadorHealing.lastBinaryField = binaryField;
      ambassadorHealing.lastWaveField = waveField;

      ambassadorHealing.lastPresenceField = presenceField;
      ambassadorHealing.lastAdvantageField = advantageField;
      ambassadorHealing.lastHintsField = hintsField;
      ambassadorHealing.lastChunkPrewarmPlan = chunkPlan;

      ambassadorHealing.lastAmbassadorCycleSignatureIntel = fetchSig.intel;
      ambassadorHealing.lastAmbassadorCycleSignatureClassic = fetchSig.classic;

      const artery = getAmbassadorArterySnapshotV5({
        ok: false,
        phase: "fetch",
        cycleIndex: ambassadorCycle,
        band,
        presenceField,
        advantageField,
        hintsField,
        jobs: [],
        errors: [{ error: err.message }]
      });

      return {
        success: false,
        cycleIndex: ambassadorCycle,
        band,
        jobs: [],
        errors: [{ error: err.message }],
        presenceField,
        advantageField,
        hintsField,
        chunkPlan,
        binaryField,
        waveField,
        fetchSignatureIntel: fetchSig.intel,
        fetchSignatureClassic: fetchSig.classic,
        artery
      };
    }
  },

  // -------------------------------------------------------------------------
  // Submit Result — unified presence
  // -------------------------------------------------------------------------
  submitResult(job, result, globalHints = {}) {
    ambassadorCycle++;
    ambassadorHealing.cycleCount++;
    ambassadorHealing.lastCycleIndex = ambassadorCycle;

    const presenceField = buildPresenceField(globalHints, ambassadorCycle);
    const hintsField = buildHintsField(globalHints);

    const band = normalizeBand(globalHints.band || job?.band || "symbolic");
    const bandSig = buildBandSignature(band, ambassadorCycle);

    const hasGpu = !!globalHints.hasGpu;
    const binaryField = buildBinaryField(ambassadorCycle, hasGpu, presenceField);
    const waveField = buildWaveField(ambassadorCycle, band, presenceField);

    const bandPack = { band, binaryField, waveField };

    const advantageField = buildAdvantageField(
      bandPack,
      presenceField,
      globalHints
    );

    const chunkPlan = buildChunkPrewarmPlan(
      presenceField,
      advantageField,
      hintsField
    );

    const jobId = job?.id ?? null;

    const intelPayload = {
      kind: "submit",
      cycleIndex: ambassadorCycle,
      jobId,
      band,
      hasResult: !!result
    };
    const classicString = `AMBASSADOR_SUBMIT::${ambassadorCycle}::${jobId}::${band}::${!!result}`;
    const submitSig = buildDualHashSignature(
      "AMBASSADOR_SUBMIT",
      intelPayload,
      classicString
    );

    ambassadorHealing.lastSubmitJobId = jobId;
    ambassadorHealing.lastSubmitError = null;
    ambassadorHealing.lastSubmitSignatureIntel = submitSig.intel;
    ambassadorHealing.lastSubmitSignatureClassic = submitSig.classic;

    ambassadorHealing.lastBand = band;
    ambassadorHealing.lastBandSignatureIntel = bandSig.intel;
    ambassadorHealing.lastBandSignatureClassic = bandSig.classic;

    ambassadorHealing.lastBinaryField = binaryField;
    ambassadorHealing.lastWaveField = waveField;

    ambassadorHealing.lastPresenceField = presenceField;
    ambassadorHealing.lastAdvantageField = advantageField;
    ambassadorHealing.lastHintsField = hintsField;
    ambassadorHealing.lastChunkPrewarmPlan = chunkPlan;

    ambassadorHealing.lastAmbassadorCycleSignatureIntel = submitSig.intel;
    ambassadorHealing.lastAmbassadorCycleSignatureClassic = submitSig.classic;

    const artery = getAmbassadorArterySnapshotV5({
      ok: true,
      phase: "submit",
      cycleIndex: ambassadorCycle,
      band,
      presenceField,
      advantageField,
      hintsField,
      jobs: job ? [job] : [],
      errors: []
    });

    return {
      success: true,
      cycleIndex: ambassadorCycle,
      band,
      jobId,
      hasResult: !!result,
      presenceField,
      advantageField,
      hintsField,
      chunkPlan,
      binaryField,
      waveField,
      submitSignatureIntel: submitSig.intel,
      submitSignatureClassic: submitSig.classic,
      artery
    };
  }
};

// ============================================================================
// FACTORY — v24‑IMMORTAL‑PLUSPLUS ORGAN SURFACE
// ============================================================================

export function createPulseEarnMktAmbassador() {
  return Object.freeze({
    meta: PulseEarnAmbassadorMeta,
    role: pulseRole,
    surfaceMeta,
    lore: pulseLoreContext,
    AI_EXPERIENCE_META,
    EXPORT_META,
    healingSnapshot: () => ({ ...ambassadorHealing }),
    ping: (hints) => PulseEarnMktAmbassador.ping(hints),
    fetchJobs: (hints) => PulseEarnMktAmbassador.fetchJobs(hints),
    submitResult: (job, result, hints) =>
      PulseEarnMktAmbassador.submitResult(job, result, hints),
    getAmbassadorArterySnapshotV5
  });
}

// ============================================================================
// DUAL‑MODE EXPORTS (ESM + CommonJS)
// ============================================================================

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    PulseEarnAmbassadorMeta,
    pulseRole,
    PulseRole,
    surfaceMeta,
    pulseLoreContext,
    AI_EXPERIENCE_META,
    EXPORT_META,
    PulseEarnMktAmbassador,
    createPulseEarnMktAmbassador,
    getAmbassadorArterySnapshotV5
  };
}
