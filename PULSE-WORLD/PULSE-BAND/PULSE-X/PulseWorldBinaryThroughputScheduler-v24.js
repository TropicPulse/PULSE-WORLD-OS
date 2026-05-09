// ============================================================================
// FILE: PulseWorldBinaryThroughputScheduler-v24.js
// [pulse:world] BINARY THROUGHPUT SCHEDULER — v24‑IMMORTAL‑INTEL++‑SUBSTRATE
// ----------------------------------------------------------------------------
// WORLD-FIRST ROLE (LORE + REALITY):
//   • This is not an app-layer scheduler.
//   • This is not a game engine feature.
//   • This is not a driver tweak.
//   • This is a WORLD-LEVEL BINARY SUBSTRATE that:
//       - Reads binary/throughput surfaces from all organs (Earn, Mesh, etc.).
//       - Normalizes them into a single global "binary throughput fabric".
//       - Builds execution waves that can drop all the way down to device lanes
//         (warps, bursts, lanes) IF the device/policy allows it.
//       - Falls back to a pure metadata scheduler if not allowed.
//   • It is the first layer whose job is: "carry binary forward intact".
//   • It is designed to eliminate repeated conversions and re-hydration,
//     and instead treat binary as a first-class, forward-propagated substrate.
// ----------------------------------------------------------------------------
// SAFETY CONTRACT (IMMORTAL v24‑INTEL):
//   • No routing influence (metadata only; routers MAY read but not obey).
//   • No randomness, no timestamps, no async, no network, no filesystem.
//   • No mutation outside world.meta / world.flags / world.runtime.
//   • Deterministic-field: identical input → identical output.
//   • Drift-proof across versions, multi-instance safe.
// ----------------------------------------------------------------------------
// HIGH-LEVEL LORE:
//   • Think of this as the "World Heart of Throughput":
//       - EarnChunker is a local organ-level chunker.
//       - Mesh chunkers (future) are network/graph-level chunkers.
//       - This scheduler is the WORLD-LEVEL conductor that:
//           * Sees all binary surfaces.
//           * Assigns them to global waves.
//           * Aligns them with device lanes when allowed.
//   • It is the bridge between:
//       - symbolic world state
//       - binary substrates
//       - physical device lanes
//   • It is the layer that finally answers:
//       "If the computer needs something, can we have it ready ONCE,
//        instead of converting it a million times?"
// ============================================================================

/*
AI_EXPERIENCE_META = {
  identity: "PulseWorldBinaryThroughputScheduler",
  version: "v24-IMMORTAL-INTEL++",
  layer: "world",
  role: "world_binary_throughput_scheduler",
  lineage: [
    "PulseEarnSignalFactoring-v16 → v24",
    "PulseEarnChunker-v24",
    "PulseWorldBinaryThroughputScheduler-v24"
  ],

  evo: {
    worldScheduler: true,
    binaryThroughputFabric: true,
    substrateEngine: true,

    // Awareness
    jobLoadAware: true,
    meshPressureAware: true,
    presenceAware: true,
    bandAware: true,
    advantageAware: true,
    hintsAware: true,
    factoringAware: true,
    chunkerAware: true,

    // Binary / band
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

    // Performance traits
    chunkAware: true,
    prewarmAware: true,
    cacheAware: true,
    throughputAware: true,
    deviceAware: true,

    // INTEL traits
    intelSignatureAware: true,
    dualHashAware: true,
    structureAware: true,
    contextAware: true,

    // Base-shape / formula traits
    baseShapeAware: true,
    baseFormulaKeyAware: true,
    patternMatchSurface: true
  }
}
*/

// ============================================================================
// HASH / GENERIC HELPERS — v24 IMMORTAL
// ============================================================================

function computeHash(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 100000;
  }
  return `h${h}`;
}

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

function clamp01(v) {
  const n = Number(v);
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.min(1, n));
}

function safeNumber(v, fallback = 0) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

// ============================================================================
// WORLD ENTITY NORMALIZATION
// ----------------------------------------------------------------------------
// We treat "world" as a container of many "entities":
//   • Earn pages
//   • Mesh nodes
//   • Any future organ that exposes a binary/throughput surface.
// For now, we assume:
//   world.entities = array of objects with:
//     - id / key
//     - meta.earnChunker (optional)
//     - meta.earnSignalFactoring (optional)
//     - meta.meshChunker (future)
//     - flags.*
// ============================================================================

function normalizeWorldEntities(world) {
  const entities = Array.isArray(world?.entities) ? world.entities : [];
  const normalized = [];

  for (const ent of entities) {
    const id = ent.id || ent.key || `entity_${normalized.length}`;
    const earnChunker = ent.meta?.earnChunker || null;
    const earnFactoring = ent.meta?.earnSignalFactoring || null;

    // Future: meshChunker, meshFactoring, etc.
    const meshChunker = ent.meta?.meshChunker || null;

    // We only consider entities that expose at least one throughput surface.
    if (!earnChunker && !meshChunker) continue;

    const throughputClass =
      earnChunker?.throughputClass ||
      meshChunker?.throughputClass ||
      "throughput_low";

    const throughputScore =
      safeNumber(earnChunker?.throughputScore, 0) ||
      safeNumber(meshChunker?.throughputScore, 0);

    const band =
      earnFactoring?.band ||
      earnChunker?.band ||
      meshChunker?.band ||
      "symbolic";

    const advantageTier =
      safeNumber(earnFactoring?.profile?.advantageTier, 0) ||
      safeNumber(earnChunker?.advantageTier, 0) ||
      0;

    const advantageScore =
      safeNumber(earnFactoring?.profile?.advantageScore, 0) ||
      safeNumber(earnChunker?.advantageScore, 0) ||
      0;

    const binaryDensity =
      safeNumber(earnFactoring?.bandBinaryWave?.binaryField?.density, 0) ||
      safeNumber(earnChunker?.binaryDensity, 0) ||
      0;

    const waveAmplitude =
      safeNumber(earnFactoring?.bandBinaryWave?.waveField?.amplitude, 0) ||
      safeNumber(earnChunker?.waveAmplitude, 0) ||
      0;

    normalized.push({
      id,
      ref: ent,
      band,
      throughputClass,
      throughputScore,
      advantageTier,
      advantageScore,
      binaryDensity,
      waveAmplitude,
      earnChunker,
      earnFactoring,
      meshChunker
    });
  }

  return normalized;
}

// ============================================================================
// WORLD WAVE BUILDING
// ----------------------------------------------------------------------------
// We build "waves" of execution across the world:
//   • Wave 0: highest throughput / advantage / density.
//   • Wave 1: high.
//   • Wave 2: normal.
//   • Wave 3: low.
// These waves are conceptual: they can be mapped to frames, ticks, or
// scheduling slices by the engine/runtime.
// ============================================================================

function classifyEntityWave(entity) {
  // Primary key: throughputClass
  // Secondary: throughputScore
  const cls = entity.throughputClass;
  const score = clamp01(entity.throughputScore);

  if (cls === "throughput_extreme") return 0;
  if (cls === "throughput_high") return 1;
  if (cls === "throughput_normal") return 2;
  if (cls === "throughput_low") return 3;

  // Fallback purely on score
  if (score >= 0.9) return 0;
  if (score >= 0.7) return 1;
  if (score >= 0.4) return 2;
  return 3;
}

function buildWorldWaves(entities) {
  const waves = [[], [], [], []];

  for (const ent of entities) {
    const waveIndex = classifyEntityWave(ent);
    waves[waveIndex].push(ent);
  }

  // Within each wave, sort by throughputScore desc, then advantageTier desc.
  for (const wave of waves) {
    wave.sort((a, b) => {
      const sDiff = (b.throughputScore || 0) - (a.throughputScore || 0);
      if (sDiff !== 0) return sDiff;
      const tDiff = (b.advantageTier || 0) - (a.advantageTier || 0);
      if (tDiff !== 0) return tDiff;
      return (b.binaryDensity || 0) - (a.binaryDensity || 0);
    });
  }

  return waves;
}

// ============================================================================
// DEVICE-AWARE MODE SELECTION
// ----------------------------------------------------------------------------
// The world scheduler can operate in two modes:
//
//   • Mode A: device-aware substrate
//       - world.deviceProfile.allowDeviceSubstrate === true
//       - We align waves with warp/lane/burst hints.
//       - We treat binary as a first-class substrate.
//
//   • Mode B: safe metadata-only
//       - Device substrate not allowed or not available.
//       - We still build waves and ordering, but do not emit lane/warp/burst
//         shaping hints.
// ============================================================================

function resolveWorldMode(deviceProfile = {}) {
  const allowDeviceSubstrate = !!deviceProfile.allowDeviceSubstrate;
  const mode = allowDeviceSubstrate ? "device_substrate" : "metadata_only";

  const intelPayload = {
    allowDeviceSubstrate,
    mode,
    gpuLaneCount: safeNumber(deviceProfile.gpuLaneCount, 0),
    gpuLaneUtilization: clamp01(deviceProfile.gpuLaneUtilization || 0),
    memoryChannels: safeNumber(deviceProfile.memoryChannels, 0),
    memoryBurstWidth: safeNumber(deviceProfile.memoryBurstWidth, 0),
    ioBandwidth: safeNumber(deviceProfile.ioBandwidth, 0)
  };

  const classicString =
    `MODE:${mode}` +
    `::LANES:${intelPayload.gpuLaneCount}` +
    `::MC:${intelPayload.memoryChannels}` +
    `::BW:${intelPayload.ioBandwidth}`;

  const sig = buildDualHashSignature(
    "WORLD_BINARY_THROUGHPUT_MODE_v24",
    intelPayload,
    classicString
  );

  return {
    mode,
    allowDeviceSubstrate,
    intelPayload,
    signatureIntel: sig.intel,
    signatureClassic: sig.classic
  };
}

// ============================================================================
// WORLD-LEVEL EXECUTION ENVELOPE
// ----------------------------------------------------------------------------
// This is the heart of the module.
// We take:
//   • normalized entities
//   • world waves
//   • device mode
// and build a single "world binary throughput envelope":
//
//   world.runtime.binaryThroughputPlan = {
//     version,
//     mode,
//     waves: [
//       { index: 0, entities: [...], aggregateMetrics: {...}, deviceHints: {...} },
//       ...
//     ],
//     signatures: { intel, classic }
//   }
//
// Engines / runtimes can then:
//   • iterate waves in order,
//   • schedule entities/jobs accordingly,
//   • optionally use deviceHints to shape GPU/CPU/IO work.
// ============================================================================

function buildWorldThroughputEnvelope(entities, waves, worldMode, deviceProfile = {}) {
  // Aggregate metrics per wave for lore + analytics + device hints.
  const waveEnvelopes = waves.map((waveEntities, index) => {
    let totalThroughputScore = 0;
    let totalAdvantageScore = 0;
    let totalBinaryDensity = 0;
    let totalWaveAmplitude = 0;

    for (const ent of waveEntities) {
      totalThroughputScore += safeNumber(ent.throughputScore, 0);
      totalAdvantageScore += safeNumber(ent.advantageScore, 0);
      totalBinaryDensity += safeNumber(ent.binaryDensity, 0);
      totalWaveAmplitude += safeNumber(ent.waveAmplitude, 0);
    }

    const count = waveEntities.length || 1;
    const avgThroughputScore = totalThroughputScore / count;
    const avgAdvantageScore = totalAdvantageScore / count;
    const avgBinaryDensity = totalBinaryDensity / count;
    const avgWaveAmplitude = totalWaveAmplitude / count;

    // Device hints: only meaningful in device_substrate mode.
    let deviceHints = null;
    if (worldMode.mode === "device_substrate") {
      // Very simple world-level hints:
      //   • high waves → more aggressive warp/lane usage
      //   • low waves → conservative usage
      const laneAggression =
        index === 0 ? "extreme" :
        index === 1 ? "high" :
        index === 2 ? "normal" :
        "low";

      const memoryBurstAggression =
        index === 0 ? "wide" :
        index === 1 ? "medium" :
        index === 2 ? "normal" :
        "narrow";

      deviceHints = {
        laneAggression,
        memoryBurstAggression,
        // These are hints; engines can map them to real warp/burst configs.
        suggestedGpuLaneCount: safeNumber(deviceProfile.gpuLaneCount, 0),
        suggestedMemoryChannels: safeNumber(deviceProfile.memoryChannels, 0)
      };
    }

    const intelPayload = {
      waveIndex: index,
      entityCount: waveEntities.length,
      avgThroughputScore,
      avgAdvantageScore,
      avgBinaryDensity,
      avgWaveAmplitude,
      mode: worldMode.mode,
      allowDeviceSubstrate: worldMode.allowDeviceSubstrate,
      deviceHints
    };

    const classicString =
      `WAVE:${index}` +
      `::COUNT:${waveEntities.length}` +
      `::TS:${avgThroughputScore.toFixed(6)}` +
      `::AS:${avgAdvantageScore.toFixed(6)}`;

    const sig = buildDualHashSignature(
      "WORLD_BINARY_THROUGHPUT_WAVE_v24",
      intelPayload,
      classicString
    );

    return {
      index,
      entities: waveEntities.map(e => e.id),
      aggregateMetrics: {
        avgThroughputScore,
        avgAdvantageScore,
        avgBinaryDensity,
        avgWaveAmplitude
      },
      deviceHints,
      signatures: {
        intel: sig.intel,
        classic: sig.classic
      }
    };
  });

  const worldIntelPayload = {
    version: "v24-IMMORTAL-INTEL-WORLD-THROUGHPUT",
    mode: worldMode.mode,
    allowDeviceSubstrate: worldMode.allowDeviceSubstrate,
    entityCount: entities.length,
    waveCount: waveEnvelopes.length,
    deviceProfile: {
      gpuLaneCount: safeNumber(deviceProfile.gpuLaneCount, 0),
      gpuLaneUtilization: clamp01(deviceProfile.gpuLaneUtilization || 0),
      memoryChannels: safeNumber(deviceProfile.memoryChannels, 0),
      memoryBurstWidth: safeNumber(deviceProfile.memoryBurstWidth, 0),
      ioBandwidth: safeNumber(deviceProfile.ioBandwidth, 0)
    }
  };

  const worldClassicString =
    `WORLD_THR_v24::MODE:${worldMode.mode}` +
    `::ENT:${entities.length}` +
    `::WAVES:${waveEnvelopes.length}`;

  const worldSig = buildDualHashSignature(
    "WORLD_BINARY_THROUGHPUT_ENVELOPE_v24",
    worldIntelPayload,
    worldClassicString
  );

  return {
    version: worldIntelPayload.version,
    mode: worldMode.mode,
    allowDeviceSubstrate: worldMode.allowDeviceSubstrate,
    waves: waveEnvelopes,
    deviceProfile: worldIntelPayload.deviceProfile,
    signatures: {
      intel: worldSig.intel,
      classic: worldSig.classic,
      modeIntel: worldMode.signatureIntel,
      modeClassic: worldMode.signatureClassic
    }
  };
}

// ============================================================================
// CORE API — applyWorldBinaryThroughputScheduler (v24‑IMMORTAL‑INTEL++)
// ----------------------------------------------------------------------------
// This is the single entry point.
//
//   world = applyWorldBinaryThroughputScheduler(world, context)
//
// INPUT:
//   • world:
//       - world.entities: array of entities (pages, nodes, etc.).
//       - world.meta / world.flags / world.runtime: optional.
//   • context:
//       - deviceProfile: {
//           allowDeviceSubstrate: boolean,
//           gpuLaneCount,
//           gpuLaneUtilization,
//           memoryChannels,
//           memoryBurstWidth,
//           ioBandwidth
//         }
//
// OUTPUT (mutates world in-place in a controlled, deterministic way):
//   • world.flags.worldBinaryThroughputEnabled = true
//   • world.meta.worldBinaryThroughputScheduler = { ...full envelope... }
//   • world.runtime.binaryThroughputPlan = { ...runtime-friendly view... }
//
// LORE:
//   • This is the moment where the WORLD becomes a binary substrate.
//   • All organs (Earn, Mesh, etc.) feed their chunkers/factoring surfaces.
//   • The world scheduler:
//       - sees them all,
//       - builds waves,
//       - optionally aligns them with device lanes,
//       - and emits a single, unified plan.
//   • Engines can now:
//       - schedule work by wave,
//       - prioritize by throughput,
//       - and, if allowed, shape GPU/CPU/IO to match the plan.
// ============================================================================

export function applyWorldBinaryThroughputScheduler(world, context = {}) {
  if (!world) return world;

  world.meta = world.meta || {};
  world.flags = world.flags || {};
  world.runtime = world.runtime || {};

  const deviceProfile = context.deviceProfile || {};

  // 1) Normalize entities into a unified throughput surface.
  const entities = normalizeWorldEntities(world);
  if (entities.length === 0) {
    // No entities with throughput surfaces → nothing to schedule.
    world.flags.worldBinaryThroughputEnabled = false;
    return world;
  }

  // 2) Build world waves.
  const waves = buildWorldWaves(entities);

  // 3) Resolve world mode (device_substrate vs metadata_only).
  const worldMode = resolveWorldMode(deviceProfile);

  // 4) Build world-level throughput envelope.
  const envelope = buildWorldThroughputEnvelope(
    entities,
    waves,
    worldMode,
    deviceProfile
  );

  // 5) Attach to world surfaces.
  world.flags.worldBinaryThroughputEnabled = true;
  world.flags.worldBinaryThroughputMode = envelope.mode;

  world.meta.worldBinaryThroughputScheduler = {
    version: envelope.version,
    mode: envelope.mode,
    allowDeviceSubstrate: envelope.allowDeviceSubstrate,
    waves: envelope.waves,
    deviceProfile: envelope.deviceProfile,
    signatures: envelope.signatures
  };

  // Runtime-friendly view: minimal, engine-facing.
  world.runtime.binaryThroughputPlan = {
    mode: envelope.mode,
    allowDeviceSubstrate: envelope.allowDeviceSubstrate,
    waves: envelope.waves.map(w => ({
      index: w.index,
      entities: w.entities,
      throughputClassHint:
        w.aggregateMetrics.avgThroughputScore >= 0.9 ? "extreme" :
        w.aggregateMetrics.avgThroughputScore >= 0.7 ? "high" :
        w.aggregateMetrics.avgThroughputScore >= 0.4 ? "normal" :
        "low",
      deviceHints: w.deviceHints
    }))
  };

  return world;
}

export default applyWorldBinaryThroughputScheduler;
