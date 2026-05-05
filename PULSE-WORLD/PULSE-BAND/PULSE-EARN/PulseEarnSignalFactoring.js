// ============================================================================
// FILE: PulseEarnSignalFactoring-v16-IMMORTAL-INTEL.js
// [earn:page] SIGNAL FACTORING LAYER — v16‑IMMORTAL‑INTEL‑DUALHASH
// ----------------------------------------------------------------------------
// ROLE:
//   • Earn‑page‑level 1/0 factoring engine (metadata‑only, INTEL‑aware).
//   • Mirrors mesh/CNS factoring (stride, depth, /2 pattern) at Earn page layer.
//   • Shapes Earn pages with factoring pressure from presence, advantage, hints,
//     job load, mesh pressure, cache priority, and prewarm intent.
//   • Emits dual INTEL + classic signatures for factoring state.
//   • NEVER mutates core payloads — only meta + flags on the page object.
//   • Deterministic: same page + same context → same factoring result.
//   • Zero randomness, zero timestamps, zero async, zero network.
//   • Drift‑proof, multi‑instance‑ready, chunk/prewarm‑ready.
//   • Used by: PulseEarnHeart, PulseEarnCirculatorySystem, PulseEarnMetabolism,
//              PulseEarnLymphNodes, PulseEarnImmuneSystem, PulseEarnMkt* organs.
// ----------------------------------------------------------------------------
// SAFETY CONTRACT (IMMORTAL v16‑INTEL):
//   • No payload mutation (only meta/flags fields are allowed).
//   • No routing influence (metadata only; routers MAY read but not obey).
//   • No randomness, no timestamps.
//   • No external I/O, no FS, no network.
//   • Zero async, zero side‑effects outside page.meta/flags.
//   • Deterministic‑field: identical input → identical output.
//   • Drift‑proof: stable across versions.
//   • Dual‑hash: INTEL + classic signatures for every factoring event.
// ============================================================================

/*
AI_EXPERIENCE_META = {
  identity: "PulseEarnSignalFactoring",
  version: "v16-IMMORTAL-INTEL",
  layer: "earn_page",
  role: "earn_page_signal_factoring_engine",
  lineage: "PulseEarnSignalFactoring-v14 → v15-Evo → v16-IMMORTAL-INTEL",

  evo: {
    // Core factoring traits
    signalFactoring: true,
    factoringPressureEngine: true,
    factoringDepthEngine: true,
    factoringStrideEngine: true,
    factoringIntentEngine: true,

    // Awareness traits
    presenceAware: true,
    advantageAware: true,
    hintsAware: true,
    meshPressureAware: true,
    jobLoadAware: true,
    cachePriorityAware: true,
    prewarmAware: true,
    bandAware: true,

    // Band traits
    symbolicPrimary: true,
    binaryAware: true,
    dualBand: true,

    // IMMORTAL traits
    deterministic: true,
    deterministicField: true,
    driftProof: true,
    multiInstanceReady: true,
    selfRepairable: true,

    // Safety traits
    zeroNetwork: true,
    zeroFilesystem: true,
    zeroAsync: true,
    zeroRandomness: true,
    zeroMutationOfInput: true,
    zeroRoutingInfluence: true,

    // Performance metadata traits
    chunkAware: true,
    prewarmAware: true,
    cacheAware: true,

    // INTEL traits
    intelSignatureAware: true,
    dualHashAware: true,
    structureAware: true,
    contextAware: true
  },

  contract: {
    always: [
      "PulseEarnHeart",
      "PulseEarnCirculatorySystem",
      "PulseEarnGenome",
      "PulseEarnMetabolism",
      "PulseEarnLymphNodes",
      "PulseEarnImmuneSystem",
      "PulseEarnMktAmbassador",
      "PulseEarnMktAuctioneer",
      "PulseEarnCustomReceptorMkt"
    ],
    never: [
      "legacyEarnFactoring",
      "safeRoute",
      "fetchViaCNS",
      "userScript",
      "dynamicEval"
    ]
  }
}
*/

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

// ============================================================================
// HELPERS
// ============================================================================
function clamp01(v) {
  return Math.max(0, Math.min(1, v));
}

function safeNumber(v, fallback = 0) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

function normalizeBand(band) {
  const x = String(band || "symbolic").toLowerCase();
  return x === "binary" ? "binary" : "symbolic";
}

function buildPageBandBinaryWave(page, cycleIndex, deviceProfile = {}) {
  const band = normalizeBand(
    page?.meta?.band ||
    page?.band ||
    deviceProfile?.band ||
    deviceProfile?.presenceBand ||
    "symbolic"
  );

  const idLen = String(page?.id || page?.key || "NO_PAGE_ID").length;
  const jobCount = safeNumber(Array.isArray(page?.jobs) ? page.jobs.length : 0);
  const meshPressure = safeNumber(page?.presenceField?.meshPressureIndex || 0);
  const gpuScore = safeNumber(deviceProfile?.gpuScore || 0);

  const surface = idLen + jobCount + meshPressure + gpuScore + cycleIndex;

  const binaryField = {
    binaryPageSignature: computeHash(`BPAGE::${surface}`),
    binarySurfaceSignature: computeHash(`BSURF_EARN_PAGE::${surface}`),
    binarySurface: {
      idLen,
      jobCount,
      meshPressure,
      gpuScore,
      cycle: cycleIndex,
      surface
    },
    parity: surface % 2 === 0 ? 0 : 1,
    density: jobCount + meshPressure + gpuScore,
    shiftDepth: Math.max(0, Math.floor(Math.log2(surface || 1)))
  };

  const waveField = {
    amplitude: jobCount + meshPressure + gpuScore,
    wavelength: cycleIndex || 1,
    phase: (idLen + jobCount + cycleIndex) % 16,
    band,
    mode: band === "binary" ? "compression-wave" : "symbolic-wave"
  };

  return { band, binaryField, waveField };
}

function buildPageAdvantageField(page, deviceProfile, bandPack, factoringProfile) {
  const gpuScore = safeNumber(deviceProfile?.gpuScore || 0);
  const bandwidth = safeNumber(deviceProfile?.bandwidthMbps || 0);
  const chunkBudgetKB = safeNumber(deviceProfile?.chunkField?.chunkBudgetKB || 0);
  const cacheLines = safeNumber(deviceProfile?.chunkField?.cacheLines || 0);
  const prewarmSlots = safeNumber(deviceProfile?.chunkField?.prewarmSlots || 0);

  const density = bandPack.binaryField.density;
  const amplitude = bandPack.waveField.amplitude;

  const presenceTier = factoringProfile.presenceTier;
  const advantageTier = factoringProfile.advantageTier;

  const advantageScore =
    gpuScore * 0.0005 +
    bandwidth * 0.0002 +
    density * 0.00001 +
    amplitude * 0.00001 +
    (chunkBudgetKB + cacheLines + prewarmSlots) * 0.000001 +
    (presenceTier === "presence_high" ? 0.01 : 0) +
    (advantageTier >= 2 ? 0.005 : 0);

  return {
    advantageVersion: "M-16.0-EARN-PAGE",
    band: bandPack.band,
    gpuScore,
    bandwidth,
    binaryDensity: density,
    waveAmplitude: amplitude,
    chunkBudgetKB,
    cacheLines,
    prewarmSlots,
    presenceTier,
    advantageTier,
    advantageScore
  };
}

function buildPageChunkPrewarmPlan(page, factoringProfile, bandPack, advantageField) {
  let priorityLabel = "normal";
  if (factoringProfile.presenceTier === "presence_high") priorityLabel = "high";
  else if (factoringProfile.presenceTier === "presence_mid") priorityLabel = "medium";
  else if (factoringProfile.presenceTier === "presence_low") priorityLabel = "low";

  if (advantageField.advantageScore >= 0.05) priorityLabel = "high";
  else if (advantageField.advantageScore >= 0.02 && priorityLabel === "normal") {
    priorityLabel = "medium";
  }

  const jobCount = factoringProfile.jobCount;
  const planSurface =
    jobCount +
    (factoringProfile.meshPressureIndex || 0) * 2 +
    (factoringProfile.cachePriority || 0) * 3;

  return {
    planVersion: "v16-IMMORTAL-INTEL-EARN-PAGE",
    priorityLabel,
    bandPresence: factoringProfile.presenceTier,
    band: bandPack.band,
    planSurface,
    chunks: {
      pageEnvelope: true,
      jobList: true,
      presenceAdvantageEnvelope: true
    },
    cache: {
      pageDiagnostics: true,
      factoringProfile: true
    },
    prewarm: {
      circulatorySystem: factoringProfile.prewarmNeeded,
      lymphNodes: factoringProfile.prewarmNeeded,
      metabolism: factoringProfile.prewarmNeeded && jobCount > 0
    }
  };
}


// ============================================================================
// IMMORTAL META TEMPLATE — v16‑IMMORTAL‑INTEL (Earn Page)
// ============================================================================
function buildEarnSignalFactoringMeta(existingMeta, cycleIndex, factoringProfile) {
  const base = existingMeta || {};
  const intelPayload = {
    kind: "earnPageSignalFactoring",
    version: "v16-IMMORTAL-INTEL",
    cycleIndex,
    pressure: factoringProfile.pressure,
    signal: factoringProfile.signal,
    depth: factoringProfile.depth,
    stride: factoringProfile.stride,
    presenceTier: factoringProfile.presenceTier,
    advantageTier: factoringProfile.advantageTier,
    jobCount: factoringProfile.jobCount,
    meshPressureIndex: factoringProfile.meshPressureIndex,
    cachePriority: factoringProfile.cachePriority,
    prewarmNeeded: factoringProfile.prewarmNeeded,
    presenceBand: factoringProfile.presenceBand
  };

  const classicString =
    `EARN_FACTORS::CYCLE:${cycleIndex}` +
    `::SIG:${factoringProfile.signal}` +
    `::DEPTH:${factoringProfile.depth}` +
    `::STRIDE:${factoringProfile.stride}` +
    `::JOBS:${factoringProfile.jobCount}`;

  const sig = buildDualHashSignature("EARN_PAGE_SIGNAL_FACTORS", intelPayload, classicString);

  return {
    ...base,
    earnSignalFactoring: {
      layer: "PulseEarnSignalFactoring",
      role: "EARN_PAGE_SIGNAL_FACTORS",
      version: "v16-IMMORTAL-INTEL",
      target: "earn-page",
      selfRepairable: true,
      evo: {
        dualMode: true,
        binaryAware: true,
        symbolicAware: true,
        jobLoadAware: true,
        presenceAware: true,
        advantageAware: true,
        hintsAware: true,
        meshPressureAware: true,
        cachePriorityAware: true,
        prewarmAware: true,

        unifiedAdvantageField: true,
        deterministicField: true,
        driftProof: true,
        multiInstanceReady: true,

        signalFactoringAware: true,
        bandAware: true,

        zeroCompute: true,
        zeroMutation: true,
        zeroRoutingInfluence: true
      },
      signatures: {
        factoringSignatureIntel: sig.intel,
        factoringSignatureClassic: sig.classic
      },
      profile: factoringProfile
    }
  };
}

// ============================================================================
// GLOBAL CYCLE COUNTER (earn‑page‑local, deterministic)
// ============================================================================
let earnFactoringCycle = 0;

// ============================================================================
// CORE API — applyEarnSignalFactoring (v16‑IMMORTAL‑INTEL)
// ============================================================================
//
// page:   Earn "page" object (jobs list, presence, advantage, hints, etc.).
// context:
//   • presenceField: { presenceTier, meshPressureIndex, ... }
//   • advantageField: { advantageTier, advantageScore, ... }
//   • hintsField: { fallbackBandLevel, prewarmHints, cacheHints, ... }
//   • jobCountOverride: number
//   • cachePriority: "normal" | "high" | "critical"
//   • prewarmNeeded: boolean
//   • band: "symbolic" | "binary"
// ============================================================================
export function applyEarnSignalFactoring(page, context = {}) {
  if (!page) return page;

  earnFactoringCycle++;

  // Ensure meta/flags containers exist
  page.meta = page.meta || {};
  page.flags = page.flags || {};

  const presenceField   = context.presenceField   || page.presenceField   || {};
  const advantageField  = context.advantageField  || page.advantageField  || {};
  const hintsField      = context.hintsField      || page.hintsField      || {};
  const jobs            = Array.isArray(page.jobs) ? page.jobs : [];
  const jobCount        = safeNumber(context.jobCountOverride ?? jobs.length, 0);

  const presenceTier    = presenceField.presenceTier || "idle";
  const meshPressureIdx = safeNumber(presenceField.meshPressureIndex, 0);
  const advantageTier   = safeNumber(advantageField.advantageTier, 0);
  const fallbackBandLvl = safeNumber(hintsField.fallbackBandLevel, 0);

  const cachePriority   = context.cachePriority || page.flags.cachePriority || "normal";
  const prewarmNeeded   = !!(context.prewarmNeeded || page.flags.prewarmNeeded);
  const presenceBand    = context.band || page.band || "symbolic";

  // -------------------------------------------------------------------------
  // 1) Build factoring pressure from presence + advantage + job load
  // -------------------------------------------------------------------------
  // Normalize mesh pressure to [0,1] assuming 0–200 typical range.
  const meshPressureNorm = clamp01(meshPressureIdx / 200);

  // Normalize job load: 0 jobs → 0, 100+ jobs → ~1
  const jobLoadNorm = clamp01(jobCount / 100);

  // Advantage tier: 0–3 → 0–1
  const advantageNorm = clamp01(advantageTier / 3);

  // Fallback band level: 0–3 → 0–1
  const fallbackBandNorm = clamp01(fallbackBandLvl / 3);

  // Weighted factoring pressure (earn‑page specific)
  const factoringPressure =
    meshPressureNorm   * 0.30 +
    jobLoadNorm        * 0.30 +
    advantageNorm      * 0.20 +
    fallbackBandNorm   * 0.20;

  const clampedPressure = clamp01(factoringPressure);
  page.flags.earn_factoring_pressure = clampedPressure;

  // -------------------------------------------------------------------------
  // 2) Compute factoring signal (1 or 0)
// -------------------------------------------------------------------------
  const highPressure = clampedPressure >= 0.6;
  const lowPressure  = clampedPressure <= 0.2;

  const criticalCache = cachePriority === "critical";

  let signal;
  if (criticalCache || prewarmNeeded) {
    signal = 1;
  } else if (highPressure) {
    signal = 1;
  } else if (lowPressure) {
    signal = 0;
  } else {
    // mid‑band: preserve existing factoringSignal if present, else 0
    signal = page.flags.earn_factoringSignal ?? 0;
  }

  page.flags.earn_factoringSignal = signal;

  // -------------------------------------------------------------------------
  // 3) Compute factoring depth (page‑level collapse depth)
// -------------------------------------------------------------------------
  const previousDepth = page.flags.earn_factoringDepth ?? 0;
  const depth =
    signal === 1
      ? Math.min(previousDepth + 1, 8)
      : 0;

  page.flags.earn_factoringDepth = depth;

  // -------------------------------------------------------------------------
  // 4) Compute factoring stride (/2‑like pattern)
// -------------------------------------------------------------------------
  // depth = 0 → stride = 1 (no factoring)
// depth = 1 → stride ≈ 1/2
// depth = 2 → stride ≈ 1/3
// depth = 3 → stride ≈ 1/4
// ...
  const stride =
    depth > 0 ? 1 / (depth + 1) : 1;

  page.flags.earn_factoringStride = stride;

  // -------------------------------------------------------------------------
  // 5) Tag factoring intent (metadata only)
// -------------------------------------------------------------------------
  page.flags.earn_factoring_intent =
    signal === 1
      ? "prefer_factored_page"
      : "normal";

    // -------------------------------------------------------------------------
  // 6) Build factoring profile surface for Earn organs
  // -------------------------------------------------------------------------
  const factoringProfile = {
    pressure: clampedPressure,
    signal,
    depth,
    stride,
    presenceTier,
    advantageTier,
    jobCount,
    meshPressureIndex: meshPressureIdx,
    cachePriority,
    prewarmNeeded: !!prewarmNeeded,
    presenceBand,
    fallbackBandLevel: fallbackBandLvl,
    cycleIndex: earnFactoringCycle,
    prewarm_surface: true,
    chunk_surface: true,
    cache_surface: true
  };

  page.flags.earn_factoring_advantage = {
    ...factoringProfile
  };

  // -------------------------------------------------------------------------
  // 7) Band/Binary/Wave + Advantage‑M16 + Chunk/Prewarm (v16 IMMORTAL INTEL)
  // -------------------------------------------------------------------------
  const bandPack = buildPageBandBinaryWave(page, earnFactoringCycle, context.deviceProfile || {});
  const pageAdvantageField = buildPageAdvantageField(
    page,
    context.deviceProfile || {},
    bandPack,
    factoringProfile
  );
  const pageChunkPrewarmPlan = buildPageChunkPrewarmPlan(
    page,
    factoringProfile,
    bandPack,
    pageAdvantageField
  );

  // -------------------------------------------------------------------------
  // 8) Attach IMMORTAL META BLOCK with INTEL + classic signatures + surfaces
  // -------------------------------------------------------------------------
  page.meta = buildEarnSignalFactoringMeta(
    page.meta,
    earnFactoringCycle,
    {
      ...factoringProfile,
      band: bandPack.band,
      binaryDensity: bandPack.binaryField.density,
      waveAmplitude: bandPack.waveField.amplitude,
      advantageScore: pageAdvantageField.advantageScore
    }
  );

  page.meta.earnSignalFactoring.bandBinaryWave = bandPack;
  page.meta.earnSignalFactoring.advantageField = pageAdvantageField;
  page.meta.earnSignalFactoring.chunkPrewarmPlan = pageChunkPrewarmPlan;

  page.flags.earnSignalFactoring = true;

  return page;
}
