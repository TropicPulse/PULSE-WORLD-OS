// ============================================================================
// FILE: PulseWorldBinaryThroughputScheduler-v30.js
// [pulse:world] BINARY THROUGHPUT SCHEDULER — v30 IMMORTAL++
//
// ROLE (LORE + REALITY):
//   • Not an app-layer scheduler.
//   • Not a game engine feature.
//   • Not a driver tweak.
//   • A WORLD-LEVEL BINARY WAVE SCHEDULER that:
//       - Reads throughput surfaces from world entities (Earn, Mesh, etc.).
//       - Normalizes them into a single global "binary throughput fabric".
//       - Builds execution waves (0..3) in pure metadata form.
//   • Its only job now: "group entities into deterministic binary waves".
//   • No device substrate shaping, no signatures, no intel layer.
// ----------------------------------------------------------------------------
// SAFETY CONTRACT (IMMORTAL v30):
//   • No routing influence (metadata only; routers MAY read but not obey).
//   • No randomness, no timestamps, no async, no network, no filesystem.
//   • No mutation outside world.flags / world.runtime.
//   • Deterministic-field: identical input → identical output.
//   • Drift-proof across versions, multi-instance safe.
// ============================================================================
//
//  “THE WORLD BUILDS WAVES DIRECTLY. NO MIDDLE INTERPRETATION LAYER.”
// ============================================================================
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝
// ============================================================================
// FILE: PulseWorldBinaryThroughputScheduler-v30.js
// [pulse:world] BINARY THROUGHPUT SCHEDULER — v30 IMMORTAL++
// PURE BINARY WAVE SCHEDULER — NO INTEL LAYER, NO SIGNATURES, NO DEVICE SUBSTRATE
// ============================================================================
//
//  “THE WORLD BUILDS WAVES DIRECTLY. NO MIDDLE INTERPRETATION LAYER.”
// ============================================================================

// ============================================================================
// GENERIC HELPERS — v30 IMMORTAL++
// ============================================================================

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
// WORLD ENTITY NORMALIZATION — v30
// ----------------------------------------------------------------------------
// We treat "world" as a container of many "entities":
//   • Earn pages
//   • Mesh nodes
//   • Any organ that exposes a throughput surface.
//
// For v30, we keep only what we need to classify entities into waves.
// No hashes, no signatures, no intel payloads.
// ============================================================================

function normalizeWorldEntities_v30(world) {
  const entities = Array.isArray(world?.entities) ? world.entities : [];
  const normalized = [];

  for (const ent of entities) {
    const id = ent.id || ent.key || `entity_${normalized.length}`;
    const earnChunker = ent.meta?.earnChunker || null;
    const earnFactoring = ent.meta?.earnSignalFactoring || null;
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
      "binary";

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
      waveAmplitude
    });
  }

  return normalized;
}

// ============================================================================
// WORLD WAVE BUILDING — v30
// ----------------------------------------------------------------------------
// We build "waves" of execution across the world:
//   • Wave 0: highest throughput.
//   • Wave 1: high.
//   • Wave 2: normal.
//   • Wave 3: low.
//
// No device substrate, no signatures, no intel envelopes.
// Just deterministic grouping + ordering.
// ============================================================================

function classifyEntityWave_v30(entity) {
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

function buildWorldWaves_v30(entities) {
  const waves = [[], [], [], []];

  for (const ent of entities) {
    const waveIndex = classifyEntityWave_v30(ent);
    waves[waveIndex].push(ent);
  }

  // Within each wave, sort by throughputScore desc, then advantageTier desc, then binaryDensity desc.
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
// CORE API — applyWorldBinaryThroughputScheduler_v30
// ----------------------------------------------------------------------------
//   world = applyWorldBinaryThroughputScheduler_v30(world)
//
// INPUT:
//   • world:
//       - world.entities: array of entities (pages, nodes, etc.).
//       - world.meta / world.flags / world.runtime: optional.
//
// OUTPUT (mutates world in-place in a deterministic way):
//   • world.flags.worldBinaryThroughputEnabled
//   • world.runtime.binaryThroughputPlan = {
//       waves: [
//         { index, entities: [entityId, ...] }
//       ]
//     }
//
// No signatures, no intel payloads, no device substrate mode.
// ============================================================================

export function applyWorldBinaryThroughputScheduler_v30(world) {
  if (!world) return world;

  world.meta = world.meta || {};
  world.flags = world.flags || {};
  world.runtime = world.runtime || {};

  // 1) Normalize entities into a unified throughput surface.
  const entities = normalizeWorldEntities_v30(world);
  if (entities.length === 0) {
    world.flags.worldBinaryThroughputEnabled = false;
    world.runtime.binaryThroughputPlan = { waves: [] };
    return world;
  }

  // 2) Build world waves.
  const waves = buildWorldWaves_v30(entities);

  // 3) Attach minimal, runtime-friendly plan.
  world.flags.worldBinaryThroughputEnabled = true;

  world.runtime.binaryThroughputPlan = {
    waves: waves.map((waveEntities, index) => ({
      index,
      entities: waveEntities.map(e => e.id)
    }))
  };

  return world;
}

export default applyWorldBinaryThroughputScheduler_v30;
