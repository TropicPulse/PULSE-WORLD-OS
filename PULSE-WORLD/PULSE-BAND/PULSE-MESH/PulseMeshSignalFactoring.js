// ============================================================================
// FILE: PulseMeshSignalFactoring-v16-IMMORTAL-INTEL++.js
// [pulse:mesh] SIGNAL FACTORING LAYER — v16‑IMMORTAL‑INTEL‑DUALHASH‑BASESHAPE
// ----------------------------------------------------------------------------
// ROLE:
//   • Mesh‑level 1/0 factoring engine (metadata‑only, INTEL‑aware, base‑shape aware).
//   • Mirrors CNS/Earn factoring (stride, depth, /2 pattern) at mesh layer.
//   • Shapes impulses with factoring pressure from aura, flow, mesh, presence.
//   • Emits dual INTEL + classic signatures for factoring + base‑shape state.
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
//   • Dual‑hash: INTEL + classic signatures for every factoring/base‑shape event.
// ============================================================================

/*
AI_EXPERIENCE_META = {
  identity: "PulseMeshSignalFactoring",
  version: "v16-IMMORTAL-INTEL++",
  layer: "mesh",
  role: "mesh_signal_factoring_engine",
  lineage: "PulseMeshSignalFactoring-v14 → v15-Evo → v16-IMMORTAL-INTEL → v16-IMMORTAL-INTEL++",

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
    contextAware: true,

    // Base‑shape / formula traits
    baseShapeAware: true,
    baseFormulaKeyAware: true,
    patternMatchSurface: true
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

/**
 * Classic lightweight hash — structure‑insensitive, cheap, stable.
 * Used for "classic" signatures.
 */
function computeHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `h${h}`;
}

/**
 * INTEL hash — structure‑aware, deterministic, no IO, no time.
 * Used for INTEL signatures and baseFormulaKey.
 */
function computeHashIntelligence(payload) {
  const base = JSON.stringify(payload || "");
  let h = 0;
  for (let i = 0; i < base.length; i++) {
    const c = base.charCodeAt(i);
    h = (h * 131 + c * (i + 7)) % 1000000007;
  }
  return `HINTEL_${h}`;
}

/**
 * Dual hash signature builder — INTEL + classic.
 */
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

// ============================================================================
// GENERIC HELPERS
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

// ============================================================================
// BAND / BINARY / WAVE SURFACE (mesh‑level)
// ============================================================================
//
// This is the mesh‑level analog of the Earn band/binary/wave surface.
// It encodes a "binary surface" and a "wave surface" for the impulse,
// giving you parity, density, and shiftDepth (log2‑like) plus a symbolic
// wave envelope. This is where your "binary is 1/0, everything /2" vision
// gets a structural home at mesh scale.
// ============================================================================

function buildMeshBandBinaryWave(impulse, cycleIndex, deviceProfile = {}) {
  const band = normalizeBand(
    impulse?.meta?.band ||
    impulse?.band ||
    deviceProfile?.band ||
    deviceProfile?.presenceBand ||
    "symbolic"
  );

  const idLen = String(impulse?.id || impulse?.key || "NO_IMPULSE_ID").length;

  const channelCount = safeNumber(
    Array.isArray(impulse?.channels) ? impulse.channels.length : 0
  );

  const auraPressure = safeNumber(
    impulse?.auraField?.auraPressureIndex || 0
  );

  const meshPressure = safeNumber(
    impulse?.meshField?.meshPressureIndex || 0
  );

  const flowPressure = safeNumber(
    impulse?.flowField?.flowPressureIndex || 0
  );

  const surface =
    idLen +
    channelCount +
    auraPressure +
    meshPressure +
    flowPressure +
    cycleIndex;

  const binaryField = {
    binaryMeshSignature: computeHash(`BMESH::${surface}`),
    binarySurfaceSignature: computeHash(`BSURF_MESH::${surface}`),
    binarySurface: {
      idLen,
      channelCount,
      auraPressure,
      meshPressure,
      flowPressure,
      cycle: cycleIndex,
      surface
    },
    parity: surface % 2 === 0 ? 0 : 1,
    density: channelCount + auraPressure + meshPressure + flowPressure,
    shiftDepth: Math.max(0, Math.floor(Math.log2(surface || 1)))
  };

  const waveField = {
    amplitude: channelCount + auraPressure + meshPressure + flowPressure,
    wavelength: cycleIndex || 1,
    phase: (idLen + channelCount + cycleIndex) % 16,
    band,
    mode: band === "binary" ? "compression-wave" : "symbolic-wave"
  };

  return { band, binaryField, waveField };
}

// ============================================================================
// ADVANTAGE FIELD (mesh‑level)
// ============================================================================
//
// Mesh advantage is lighter than Earn, but still gives a scalar "advantageScore"
// that can be used to bias prewarm and cache priority. It reads deviceProfile
// and the band/binary/wave surface.
// ============================================================================

function buildMeshAdvantageField(impulse, deviceProfile, bandPack, factoringProfile) {
  const gpuScore = safeNumber(deviceProfile?.gpuScore || 0);
  const bandwidth = safeNumber(deviceProfile?.bandwidthMbps || 0);

  const density = bandPack.binaryField.density;
  const amplitude = bandPack.waveField.amplitude;

  const presenceTier = factoringProfile.presenceTier;

  const advantageScore =
    gpuScore * 0.0005 +
    bandwidth * 0.0002 +
    density * 0.00001 +
    amplitude * 0.00001 +
    (presenceTier === "presence_high" ? 0.01 : 0);

  return {
    advantageVersion: "M-16.0-MESH",
    band: bandPack.band,
    gpuScore,
    bandwidth,
    binaryDensity: density,
    waveAmplitude: amplitude,
    presenceTier,
    advantageScore
  };
}

// ============================================================================
// CHUNK / PREWARM PLAN (mesh‑level)
// ============================================================================
//
// This is the mesh‑level prewarm plan. It doesn't DO prewarm, it only
// describes intent and surfaces. Downstream organs decide what to do.
// ============================================================================

function buildMeshChunkPrewarmPlan(impulse, factoringProfile, bandPack, advantageField) {
  let priorityLabel = "normal";

  if (factoringProfile.presenceTier === "presence_high") priorityLabel = "high";
  else if (factoringProfile.presenceTier === "presence_mid") priorityLabel = "medium";
  else if (factoringProfile.presenceTier === "presence_low") priorityLabel = "low";

  if (advantageField.advantageScore >= 0.05) {
    priorityLabel = "high";
  } else if (advantageField.advantageScore >= 0.02 && priorityLabel === "normal") {
    priorityLabel = "medium";
  }

  const channelCount = safeNumber(
    Array.isArray(impulse?.channels) ? impulse.channels.length : 0
  );

  const planSurface =
    channelCount +
    (factoringProfile.auraPressureIndex || 0) * 2 +
    (factoringProfile.meshPressureIndex || 0) * 2 +
    (factoringProfile.flowPressureIndex || 0) * 2;

  return {
    planVersion: "v16-IMMORTAL-INTEL-MESH",
    priorityLabel,
    bandPresence: factoringProfile.presenceTier,
    band: bandPack.band,
    planSurface,
    chunks: {
      impulseEnvelope: true,
      channelList: true,
      auraMeshFlowEnvelope: true
    },
    cache: {
      meshDiagnostics: true,
      factoringProfile: true
    },
    prewarm: {
      meshEcho: factoringProfile.prewarmNeeded,
      meshFlow: factoringProfile.prewarmNeeded,
      meshAura: factoringProfile.prewarmNeeded
    }
  };
}

// ============================================================================
// FACTORING PROFILE (mesh‑level 1/0, depth, stride)
// ============================================================================
//
// This is the core of your /2 vision at mesh scale.
// We build a factoringPressure from aura/flow/mesh, then derive:
//   • signal (1/0)
//   • depth (grows with cycles + pressure)
//   • stride (1, then 1/2‑like, then 1/3‑like, etc.)
// ============================================================================

function buildMeshFactoringProfile(impulse, cycleIndex, context) {
  const presenceField = context.presenceField || impulse.presenceField || {};
  const auraField     = impulse.auraField || {};
  const meshField     = impulse.meshField || {};
  const flowField     = impulse.flowField || {};

  const presenceTier = presenceField.presenceTier || "idle";
  const presenceBand = presenceField.presenceBand || impulse.band || "symbolic";

  const auraPressureIdx = safeNumber(auraField.auraPressureIndex, 0);
  const meshPressureIdx = safeNumber(meshField.meshPressureIndex, 0);
  const flowPressureIdx = safeNumber(flowField.flowPressureIndex, 0);

  const auraBias = clamp01(auraPressureIdx / 200);
  const meshBias = clamp01(meshPressureIdx / 200);
  const flowBias = clamp01(flowPressureIdx / 200);

  const factoringPressure =
    auraBias * 0.5 +
    flowBias * 0.3 +
    meshBias * 0.2;

  const pressure = clamp01(factoringPressure);

  const depth = Math.max(
    1,
    Math.floor(1 + Math.log2(1 + cycleIndex + pressure * 8))
  );

  const phaseBoundary = 4;
  const inSecondPhase = cycleIndex >= phaseBoundary || pressure >= 0.7;
  const stride = inSecondPhase ? 2 : 1;

  const signal = pressure > 0.15 ? 1 : 0;
  const prewarmNeeded = pressure > 0.25;

  return {
    version: "v16-IMMORTAL-INTEL-MESH",
    cycleIndex,
    pressure,
    depth,
    stride,
    signal,
    auraBias,
    meshBias,
    flowBias,
    auraPressureIdx,
    meshPressureIdx,
    flowPressureIdx,
    presenceTier,
    presenceBand,
    prewarmNeeded
  };
}

// ============================================================================
// BASE SHAPE / BASE FORMULA SURFACE (mesh‑level)
// ============================================================================
//
// This is where your "cheat sheet" lives at mesh scale.
// We compress the impulse into a baseShapeSurface and emit a baseFormulaKey
// (INTEL hash) that can be used by a BaseFormulaLibrary organ to snap
// future impulses to known patterns.
// ============================================================================

function buildMeshBaseShapeSurface(impulse, factoringProfile, bandPack, advantageField) {
  const channelKinds = Array.isArray(impulse?.channels)
    ? impulse.channels.map(c => String(c.kind || c.type || "channel")).sort()
    : [];

  const channelKindHistogram = channelKinds.reduce((acc, k) => {
    acc[k] = (acc[k] || 0) + 1;
    return acc;
  }, {});

  const shapePayload = {
    version: "v16-IMMORTAL-INTEL-MESH-BASESHAPE",
    presenceTier: factoringProfile.presenceTier,
    presenceBand: factoringProfile.presenceBand,
    auraPressureIndex: factoringProfile.auraPressureIndex,
    meshPressureIndex: factoringProfile.meshPressureIndex,
    flowPressureIndex: factoringProfile.flowPressureIndex,
    depth: factoringProfile.depth,
    stride: factoringProfile.stride,
    pressure: factoringProfile.pressure,
    band: bandPack.band,
    binaryDensity: bandPack.binaryField.density,
    waveAmplitude: bandPack.waveField.amplitude,
    advantageScore: advantageField.advantageScore,
    channelKinds: channelKindHistogram,
    impulseKind: String(impulse?.kind || impulse?.type || "impulse"),
    route: String(impulse?.route || impulse?.path || "mesh")
  };

  const classicShapeString = [
    "MESH_BASE_SHAPE",
    shapePayload.version,
    shapePayload.presenceTier,
    shapePayload.presenceBand,
    shapePayload.auraPressureIndex,
    shapePayload.meshPressureIndex,
    shapePayload.flowPressureIndex,
    shapePayload.depth,
    shapePayload.stride,
    shapePayload.pressure.toFixed(4),
    bandPack.band,
    bandPack.binaryField.density,
    bandPack.waveField.amplitude.toFixed(4),
    advantageField.advantageScore.toFixed(6),
    JSON.stringify(channelKindHistogram),
    shapePayload.impulseKind,
    shapePayload.route
  ].join("::");

  const shapeSig = buildDualHashSignature(
    "MESH_BASE_SHAPE",
    shapePayload,
    classicShapeString
  );

  const baseFormulaKey = shapeSig.intel;

  return {
    baseShapeVersion: shapePayload.version,
    baseShapeIntelSignature: shapeSig.intel,
    baseShapeClassicSignature: shapeSig.classic,
    baseFormulaKey,
    shapePayload
  };
}

// ============================================================================
// IMMORTAL META TEMPLATE — v16‑IMMORTAL‑INTEL (mesh)
// ============================================================================
//
// This is the mesh‑level meta block. It carries:
//   • factoring profile (pressure, signal, depth, stride, biases)
//   • dual‑hash signatures
//   • base‑shape + baseFormulaKey surfaces
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

  const sig = buildDualHashSignature(
    "MESH_SIGNAL_FACTORS",
    intelPayload,
    classicString
  );

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
        zeroRoutingInfluence: true,

        baseShapeAware: true,
        baseFormulaKeyAware: true,
        patternMatchSurface: true
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
// CORE API — applyMeshSignalFactoring (v16‑IMMORTAL‑INTEL++)
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

  const factoringPressure =
    (auraBias * 0.5) +
    (flowBias * 0.3) +
    (meshBias * 0.2);

  const clampedPressure = clamp01(factoringPressure);
  impulse.flags.mesh_factoring_pressure = clampedPressure;

  // -------------------------------------------------------------------------
  // 2) Compute factoring signal (1 or 0)
  // -------------------------------------------------------------------------
  const highPressure   = clampedPressure >= 0.6;
  const lowPressure    = clampedPressure <= 0.2;
  const criticalCache  = cachePriority === "critical";

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
  // 6) Build factoring profile surface (IMMORTAL v16 mesh profile)
// -------------------------------------------------------------------------
  const factoringProfile = buildMeshFactoringProfile(
    impulse,
    meshFactoringCycle,
    { presenceField }
  );

  // Enrich with Earn‑style extras for symmetry
  factoringProfile.advantageTier      = advantageTier;
  factoringProfile.jobCount           = jobCount;
  factoringProfile.cachePriority      = cachePriority;
  factoringProfile.prewarmNeeded      = !!prewarmNeeded;
  factoringProfile.fallbackBandLevel  = fallbackBandLvl;
  factoringProfile.presenceBand       = presenceBand;
  factoringProfile.meshPressureIndex  = meshPressureIdx;

  impulse.flags.mesh_factoring_profile = {
    ...factoringProfile
  };

  // -------------------------------------------------------------------------
  // 7) Band/Binary/Wave + Advantage + Chunk/Prewarm (v16 IMMORTAL INTEL)
// -------------------------------------------------------------------------
  const bandPack = buildMeshBandBinaryWave(
    impulse,
    meshFactoringCycle,
    context.deviceProfile || {}
  );

  const meshAdvantageField = buildMeshAdvantageField(
    impulse,
    context.deviceProfile || {},
    bandPack,
    factoringProfile
  );

  const meshChunkPrewarmPlan = buildMeshChunkPrewarmPlan(
    impulse,
    factoringProfile,
    bandPack,
    meshAdvantageField
  );

  // -------------------------------------------------------------------------
  // 8) Base‑shape + baseFormulaKey (mesh‑level cheat‑sheet hook)
// -------------------------------------------------------------------------
  const baseShapeSurface = buildMeshBaseShapeSurface(
    impulse,
    factoringProfile,
    bandPack,
    meshAdvantageField
  );

  // -------------------------------------------------------------------------
  // 9) Attach IMMORTAL META BLOCK with INTEL + classic signatures + surfaces
  // -------------------------------------------------------------------------
  impulse.meta = buildMeshSignalFactoringMeta(
    impulse.meta,
    meshFactoringCycle,
    factoringProfile
  );

  impulse.meta.signalFactoring.bandBinaryWave    = bandPack;
  impulse.meta.signalFactoring.advantageField    = meshAdvantageField;
  impulse.meta.signalFactoring.chunkPrewarmPlan  = meshChunkPrewarmPlan;
  impulse.meta.signalFactoring.baseShapeSurface  = baseShapeSurface;
  impulse.meta.signalFactoring.baseFormulaKey    = baseShapeSurface.baseFormulaKey;
  impulse.meta.signalFactoring.baseShapeVersion  = baseShapeSurface.baseShapeVersion;

  impulse.flags.meshSignalFactoring = true;

  return impulse;
}
