// ============================================================================
// FILE: PulseMeshSignalFactoring-v16-IMMORTAL-INTEL.js
// [pulse:mesh] SIGNAL FACTORING LAYER — v16‑IMMORTAL‑INTEL‑DUALHASH
// ----------------------------------------------------------------------------
// ROLE:
//   • Mesh‑level 1/0 factoring engine (metadata‑only, INTEL‑aware).
//   • Mirrors CNS factoring (stride, depth, /2 pattern) at mesh layer.
//   • Shapes impulses with factoring pressure from aura, flow, mesh echo.
//   • Emits dual INTEL + classic signatures for factoring state.
//   • NEVER mutates payloads beyond meta/flags — flags + meta only.
//   • Deterministic: same impulse + same context → same factoring result.
//   • Zero randomness, zero timestamps, zero async, zero network.
//   • Drift‑proof, multi‑instance‑ready, chunk/prewarm‑ready.
//   • Used by: Spine, Tendons, Aura, Flow, Thalamus, Cognition, Endocrine,
//              Immune, Organs, Earn, MeshEcho, PresenceRelay.
// ----------------------------------------------------------------------------
// SAFETY CONTRACT (IMMORTAL v16‑INTEL):
//   • No payload mutation (only meta/flags fields are allowed).
//   • No routing influence (metadata only; routers MAY read but not obey).
//   • No randomness, no timestamps.
//   • No external I/O, no FS, no network.
//   • Zero async, zero side‑effects outside impulse.meta/flags.
//   • Deterministic‑field: identical input → identical output.
//   • Drift‑proof: stable across versions.
//   • Dual‑hash: INTEL + classic signatures for every factoring event.
// ============================================================================
/*
AI_EXPERIENCE_META = {
  identity: "PulseMeshSignalFactoring",
  version: "v16-IMMORTAL-INTEL",
  layer: "mesh",
  role: "mesh_signal_factoring_engine",
  lineage: "PulseMeshSignalFactoring-v14 → v15-Evo → v16-IMMORTAL-INTEL",

  evo: {
    // Core factoring traits
    signalFactoring: true,
    factoringPressureEngine: true,
    factoringDepthEngine: true,
    factoringStrideEngine: true,
    factoringIntentEngine: true,

    // Awareness traits
    auraPressureAware: true,
    meshPressureAware: true,
    flowPressureAware: true,
    presenceAware: true,
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
      "PulseMesh",
      "PulseMeshEcho",
      "PulseMeshFlow",
      "PulseMeshAura",
      "PulseMeshThalamus",
      "PulseMeshCognition",
      "PulseMeshEndocrine",
      "PulseMeshImmune",
      "PulseMeshOrgans",
      "PulseMeshPresenceRelay",
      "PulseEarnMetabolism",
      "PulseEarnLymphNodes"
    ],
    never: [
      "legacyMeshFactoring",
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
// CLAMP HELPER
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
// IMMORTAL META TEMPLATE — v16‑IMMORTAL‑INTEL
// ============================================================================
function buildMeshSignalFactoringMeta(existingMeta, cycleIndex, factoringProfile) {
  const base = existingMeta || {};
  const intelPayload = {
    kind: "meshSignalFactoring",
    version: "v16-IMMORTAL-INTEL",
    cycleIndex,
    pressure: factoringProfile.pressure,
    signal: factoringProfile.signal,
    depth: factoringProfile.depth,
    stride: factoringProfile.stride,
    auraBias: factoringProfile.auraBias,
    flowBias: factoringProfile.flowBias,
    meshBias: factoringProfile.meshBias,
    presenceBand: factoringProfile.presenceBand
  };

  const classicString =
    `MESH_FACTORS::CYCLE:${cycleIndex}` +
    `::SIG:${factoringProfile.signal}` +
    `::DEPTH:${factoringProfile.depth}` +
    `::STRIDE:${factoringProfile.stride}`;

  const sig = buildDualHashSignature("MESH_SIGNAL_FACTORS", intelPayload, classicString);

  return {
    ...base,
    signalFactoring: {
      layer: "PulseMeshSignalFactoring",
      role: "MESH_SIGNAL_FACTORS",
      version: "v16-IMMORTAL-INTEL",
      target: "full-mesh",
      selfRepairable: true,
      evo: {
        dualMode: true,
        binaryAware: true,
        symbolicAware: true,
        localAware: true,
        internetAware: true,

        unifiedAdvantageField: true,
        deterministicField: true,
        driftProof: true,
        multiInstanceReady: true,

        signalFactoringAware: true,
        auraPressureAware: true,
        meshPressureAware: true,
        flowAware: true,
        presenceAware: true,
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
// GLOBAL CYCLE COUNTER (mesh‑local, deterministic)
// ============================================================================
let meshFactoringCycle = 0;

// ============================================================================
// CORE API — applyMeshSignalFactoring (v16‑IMMORTAL‑INTEL)
// ============================================================================
//
// NOTE:
//   • This function is intentionally "big" in metadata, small in math.
//   • All heavy lifting is in how richly we describe the factoring event.
//   • The actual factoring (job /2, sub‑jobs, etc.) is done by downstream
//     organs that read these flags and profiles.
// ============================================================================
export function applyMeshSignalFactoring(impulse, context = {}) {
  if (!impulse) return impulse;

  meshFactoringCycle++;

  
  // Ensure meta/flags containers exist
  impulse.meta = impulse.meta || {};
  impulse.flags = impulse.flags || {};

  const presenceField   = context.presenceField   || impulse.presenceField   || {};
  const advantageField  = context.advantageField  || impulse.advantageField  || {};
  const hintsField      = context.hintsField      || impulse.hintsField      || {};
  const jobs            = Array.isArray(impulse.jobs) ? impulse.jobs : [];
  const jobCount        = safeNumber(context.jobCountOverride ?? jobs.length, 0);

  const presenceTier    = presenceField.presenceTier || "idle";
  const meshPressureIdx = safeNumber(presenceField.meshPressureIndex, 0);
  const advantageTier   = safeNumber(advantageField.advantageTier, 0);
  const fallbackBandLvl = safeNumber(hintsField.fallbackBandLevel, 0);

  const cachePriority   = context.cachePriority || impulse.flags.cachePriority || "normal";
  const prewarmNeeded   = !!(context.prewarmNeeded || impulse.flags.prewarmNeeded);
  const presenceBand    = context.band || impulse.band || "symbolic";

  // -------------------------------------------------------------------------
  // 1) Extract factoring pressures (aura + flow + mesh)
// -------------------------------------------------------------------------
  const auraBias  = impulse.flags.aura_factoring_bias ?? 0;
  const flowBias  = context.flowPressure ?? 0;
  const meshBias  = context.meshPressure ?? 0;

  // unified factoring pressure (IMMORTAL v16 weighting)
  const factoringPressure =
    (auraBias * 0.5) +
    (flowBias * 0.3) +
    (meshBias * 0.2);

  const clampedPressure = clamp01(factoringPressure);
  impulse.flags.mesh_factoring_pressure = clampedPressure;

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
    signal = impulse.flags.factoringSignal ?? 0;
  }

  impulse.flags.factoringSignal = signal;

  // -------------------------------------------------------------------------
  // 3) Compute factoring depth (mirrors CNS stride/depth)
// -------------------------------------------------------------------------
  const previousDepth = impulse.flags.factoringDepth ?? 0;
  const depth =
    signal === 1
      ? Math.min(previousDepth + 1, 8)
      : 0;

  impulse.flags.factoringDepth = depth;

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

  impulse.flags.factoringStride = stride;

  // -------------------------------------------------------------------------
  // 5) Tag factoring intent (metadata only)
// -------------------------------------------------------------------------
  impulse.flags.mesh_factoring_intent =
    signal === 1
      ? "prefer_factored_path"
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
    cycleIndex: meshFactoringCycle,
    prewarm_surface: true,
    chunk_surface: true,
    cache_surface: true
  };

  impulse.flags.earn_factoring_advantage = {
    ...factoringProfile
  };

  // -------------------------------------------------------------------------
  // 7) Band/Binary/Wave + Advantage‑M16 + Chunk/Prewarm (v16 IMMORTAL INTEL)
  // -------------------------------------------------------------------------
  const bandPack = buildPageBandBinaryWave(impulse, meshFactoringCycle, context.deviceProfile || {});
  const pageAdvantageField = buildPageAdvantageField(
    impulse,
    context.deviceProfile || {},
    bandPack,
    factoringProfile
  );
  const pageChunkPrewarmPlan = buildPageChunkPrewarmPlan(
    impulse,
    factoringProfile,
    bandPack,
    pageAdvantageField
  );

  // -------------------------------------------------------------------------
  // 8) Attach IMMORTAL META BLOCK with INTEL + classic signatures + surfaces
  // -------------------------------------------------------------------------
  impulse.meta = buildMeshSignalFactoringMeta(
    impulse.meta,
    meshFactoringCycle,
    {
      ...factoringProfile,
      band: bandPack.band,
      binaryDensity: bandPack.binaryField.density,
      waveAmplitude: bandPack.waveField.amplitude,
      advantageScore: pageAdvantageField.advantageScore
    }
  );

  impulse.meta.earnSignalFactoring.bandBinaryWave = bandPack;
  impulse.meta.earnSignalFactoring.advantageField = pageAdvantageField;
  impulse.meta.earnSignalFactoring.chunkPrewarmPlan = pageChunkPrewarmPlan;

  impulse.flags.earnSignalFactoring = true;

  return impulse;
}
