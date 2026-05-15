// ============================================================================
// FILE: PULSE-WORLD-BINARY-OS.js
// PULSE WORLD BINARY CORE — v30‑IMMORTAL‑INTEL++‑SUBSTRATE‑PRIME
// ----------------------------------------------------------------------------
// WORLD-FIRST ROLE (FOUNDATION LAYER):
//   • ROOT of the world-level binary substrate.
//   • Defines what "binary" means at the world layer.
//   • Defines how binary flows between organs (Earn, Mesh, GPU, etc.).
//   • Defines how binary can be carried forward without re-conversion.
//   • Defines how world-level binary state is represented, cached, evolved,
//     and exposed to daemon / OS / GPU lymph as a stable substrate view.
// ----------------------------------------------------------------------------
// SAFETY CONTRACT (IMMORTAL v30‑INTEL):
//   • No routing influence (metadata only; routers MAY read but not obey).
//   • No randomness, no timestamps, no async, no network, no filesystem.
//   • No mutation outside world.meta / world.flags / world.runtime / world.binary.
//   • Deterministic-field: identical input → identical output.
//   • Drift-proof across versions, multi-instance safe.
//   • Binary surfaces are descriptive, not imperative (no direct hardware calls).
// ============================================================================
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝


// ============================================================================
// HASH / GENERIC HELPERS — v30 IMMORTAL
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
// WORLD BINARY CORE MODEL — v30
// ----------------------------------------------------------------------------
// Canonical "world binary surface":
//
//   world.binary = {
//     version: "v30-IMMORTAL-INTEL-WORLD-BINARY",
//     entities: { ... },   // per-entity physics
//     frames:   [ ... ],   // ordered binary frames for daemon/OS
//     organs:   { ... },   // organ-level view (for daemon organ tick)
//     byId:     { ... },   // alias map (entityId → physics)
//     binaryWaveMap: [ ... ],
//     cacheView: { ... },
//     signatures: { intel, classic }
//   }
//
// This is the physics registry for binary at the world layer.
// Everything else (scheduler, device substrate, cache, daemon) reads from here.
// ============================================================================

function ensureWorldBinarySurface(world) {
  world.binary = world.binary || {};
  if (!world.binary.version) {
    world.binary.version = "v30-IMMORTAL-INTEL-WORLD-BINARY";
  }
  world.binary.entities = world.binary.entities || {};
  world.binary.frames = world.binary.frames || [];
  world.binary.organs = world.binary.organs || {};
  world.binary.byId = world.binary.byId || {};
  world.binary.signatures = world.binary.signatures || {};
  return world.binary;
}

// ============================================================================
// ENTITY EXTRACTION FROM ORGANS
// ----------------------------------------------------------------------------
// We pull binary/throughput info from:
//   • Earn (via earnSignalFactoring + earnChunker).
//   • Mesh (meshFactoring + meshChunker).
//   • Future: GPU / route / cache surfaces can plug into same pattern.
// ============================================================================

function extractBinaryFromEarnEntity(ent) {
  const earnFactoring = ent.meta?.earnSignalFactoring || null;
  const earnChunker = ent.meta?.earnChunker || null;
  if (!earnFactoring && !earnChunker) return null;

  const band = earnFactoring?.bandBinaryWave?.band ||
               earnChunker?.band ||
               "symbolic";

  const throughputClass =
    earnChunker?.throughputClass ||
    "throughput_low";

  const throughputScore =
    clamp01(safeNumber(earnChunker?.throughputScore, 0));

  const advantageTier =
    safeNumber(earnFactoring?.profile?.advantageTier, 0);

  const advantageScore =
    clamp01(
      safeNumber(earnFactoring?.profile?.advantageScore, 0) ||
      safeNumber(earnChunker?.advantageScore, 0)
    );

  const binaryDensity =
    safeNumber(earnFactoring?.bandBinaryWave?.binaryField?.density, 0);

  const waveAmplitude =
    safeNumber(earnFactoring?.bandBinaryWave?.waveField?.amplitude, 0);

  const parity =
    earnFactoring?.bandBinaryWave?.binaryField?.parity ?? null;

  const shiftDepth =
    earnFactoring?.bandBinaryWave?.binaryField?.shiftDepth ?? null;

  const baseFormulaKey =
    earnFactoring?.baseFormulaKey ||
    earnFactoring?.baseShapeSurface?.baseFormulaKey ||
    null;

  return {
    kind: "earn_page",
    band,
    throughputClass,
    throughputScore,
    advantageTier,
    advantageScore,
    binaryDensity,
    waveAmplitude,
    parity,
    shiftDepth,
    baseFormulaKey,
    localChunkerRef: !!earnChunker
  };
}

function extractBinaryFromMeshEntity(ent) {
  const meshChunker = ent.meta?.meshChunker || null;
  const meshFactoring = ent.meta?.meshSignalFactoring || null;
  if (!meshChunker && !meshFactoring) return null;

  const band =
    meshFactoring?.bandBinaryWave?.band ||
    meshChunker?.band ||
    "symbolic";

  const throughputClass =
    meshChunker?.throughputClass ||
    "throughput_low";

  const throughputScore =
    clamp01(safeNumber(meshChunker?.throughputScore, 0));

  const advantageTier =
    safeNumber(meshFactoring?.profile?.advantageTier, 0);

  const advantageScore =
    clamp01(
      safeNumber(meshFactoring?.profile?.advantageScore, 0) ||
      safeNumber(meshChunker?.advantageScore, 0)
    );

  const binaryDensity =
    safeNumber(meshFactoring?.bandBinaryWave?.binaryField?.density, 0);

  const waveAmplitude =
    safeNumber(meshFactoring?.bandBinaryWave?.waveField?.amplitude, 0);

  const parity =
    meshFactoring?.bandBinaryWave?.binaryField?.parity ?? null;

  const shiftDepth =
    meshFactoring?.bandBinaryWave?.binaryField?.shiftDepth ?? null;

  const baseFormulaKey =
    meshFactoring?.baseFormulaKey ||
    meshFactoring?.baseShapeSurface?.baseFormulaKey ||
    null;

  return {
    kind: "mesh_node",
    band,
    throughputClass,
    throughputScore,
    advantageTier,
    advantageScore,
    binaryDensity,
    waveAmplitude,
    parity,
    shiftDepth,
    baseFormulaKey,
    localChunkerRef: !!meshChunker
  };
}

// Generic extractor that tries known organs.
function extractWorldBinaryEntity(ent) {
  const earn = extractBinaryFromEarnEntity(ent);
  if (earn) return earn;

  const mesh = extractBinaryFromMeshEntity(ent);
  if (mesh) return mesh;

  // Future: GPU / route / cache binary surfaces can be added here.
  return null;
}

// ============================================================================
// WORLD BINARY REGISTRATION — v30
// ----------------------------------------------------------------------------
// Walk world.entities and register each entity's binary physics into
// world.binary.entities[entityId].
// Also build organ/byId maps for daemon/OS.
// ============================================================================

function registerWorldBinaryEntities(world) {
  const entities = Array.isArray(world?.entities) ? world.entities : [];
  const wb = ensureWorldBinarySurface(world);

  const registered = [];

  for (const ent of entities) {
    const id = ent.id || ent.key || `entity_${registered.length}`;
    const binary = extractWorldBinaryEntity(ent);
    if (!binary) continue;

    const intelPayload = {
      id,
      kind: binary.kind,
      band: binary.band,
      throughputClass: binary.throughputClass,
      throughputScore: binary.throughputScore,
      advantageTier: binary.advantageTier,
      advantageScore: binary.advantageScore,
      binaryDensity: binary.binaryDensity,
      waveAmplitude: binary.waveAmplitude,
      parity: binary.parity,
      shiftDepth: binary.shiftDepth,
      baseFormulaKey: binary.baseFormulaKey,
      localChunkerRef: binary.localChunkerRef
    };

    const classicString =
      `WBIN_v30::${id}` +
      `::K:${binary.kind}` +
      `::B:${binary.band}` +
      `::TC:${binary.throughputClass}` +
      `::TS:${binary.throughputScore.toFixed(6)}`;

    const sig = buildDualHashSignature(
      "WORLD_BINARY_ENTITY_v30",
      intelPayload,
      classicString
    );

    const entityPhysics = {
      id,
      ...binary,
      worldWaveIndex: null, // filled later by scheduler link
      signatures: {
        intel: sig.intel,
        classic: sig.classic
      }
    };

    wb.entities[id] = entityPhysics;
    wb.byId[id] = entityPhysics;

    // Organ-level view (for daemon organ tick; organId == entityId by default)
    wb.organs[id] = {
      advantageTier: binary.advantageTier,
      advantageScore: binary.advantageScore,
      throughputClass: binary.throughputClass,
      throughputScore: binary.throughputScore,
      substrateLaneId: null,
      substratePhaseIndex: null,
      worldWaveIndex: null,
      prewarmed: false,
      prechunked: false
    };

    registered.push(id);
  }

  // World-level signature over all registered entities.
  const worldIntelPayload = {
    version: wb.version,
    entityCount: registered.length,
    entityIds: registered
  };

  const worldClassicString =
    `WBIN_CORE_v30::ENT:${registered.length}`;

  const worldSig = buildDualHashSignature(
    "WORLD_BINARY_CORE_v30",
    worldIntelPayload,
    worldClassicString
  );

  wb.signatures.intel = worldSig.intel;
  wb.signatures.classic = worldSig.classic;

  return wb;
}

// ============================================================================
// WORLD BINARY ↔ WORLD THROUGHPUT SCHEDULER LINK — v30
// ----------------------------------------------------------------------------
// Scheduler builds waves; we annotate entities + organs with wave indices
// and build a compact binaryWaveMap.
// ============================================================================

function linkWorldBinaryWithThroughput(world) {
  const wb = ensureWorldBinarySurface(world);
  const scheduler = world.meta?.worldBinaryThroughputScheduler;
  if (!scheduler || !Array.isArray(scheduler.waves)) {
    return wb;
  }

  for (const wave of scheduler.waves) {
    const waveIndex = wave.index;
    for (const entId of wave.entities) {
      if (wb.entities[entId]) {
        wb.entities[entId].worldWaveIndex = waveIndex;
      }
      if (wb.organs[entId]) {
        wb.organs[entId].worldWaveIndex = waveIndex;
      }
    }
  }

  wb.binaryWaveMap = scheduler.waves.map(w => ({
    index: w.index,
    entities: w.entities.slice()
  }));

  return wb;
}

// ============================================================================
// WORLD BINARY FRAMES VIEW — v30
// ----------------------------------------------------------------------------
// This is what the daemon / OS reads as `worldBinaryView.frames`.
// Each frame is a compact, deterministic snapshot of one entity’s physics.
// ============================================================================

function buildWorldBinaryFramesView(world) {
  const wb = ensureWorldBinarySurface(world);
  const entities = wb.entities || {};
  const ids = Object.keys(entities);

  const frames = [];

  for (const id of ids) {
    const e = entities[id];
    frames.push({
      id,
      kind: e.kind,
      band: e.band,
      advantageTier: e.advantageTier,
      advantageScore: e.advantageScore,
      throughputClass: e.throughputClass,
      throughputScore: e.throughputScore,
      binaryDensity: e.binaryDensity,
      waveAmplitude: e.waveAmplitude,
      parity: e.parity,
      shiftDepth: e.shiftDepth,
      worldWaveIndex: e.worldWaveIndex,
      tag: e.baseFormulaKey || id,
      bandLabel: e.band
    });
  }

  wb.frames = frames;
  return wb;
}

// ============================================================================
// WORLD BINARY CACHE VIEW — v30
// ----------------------------------------------------------------------------
// Conceptual "send it once" layer.
// No real storage; just a deterministic description of cache policy.
// ============================================================================

function buildWorldBinaryCacheView(world, options = {}) {
  const wb = ensureWorldBinarySurface(world);
  const entities = wb.entities || {};
  const ids = Object.keys(entities);

  const cachePolicy = options.cachePolicy || "binary_forward_only";

  const intelPayload = {
    version: "v30-IMMORTAL-INTEL-WORLD-BINARY-CACHEVIEW",
    entityCount: ids.length,
    cachePolicy
  };

  const classicString =
    `WBIN_CACHE_v30::ENT:${ids.length}` +
    `::POLICY:${cachePolicy}`;

  const sig = buildDualHashSignature(
    "WORLD_BINARY_CACHEVIEW_v30",
    intelPayload,
    classicString
  );

  wb.cacheView = {
    version: intelPayload.version,
    entityCount: ids.length,
    cachePolicy,
    notes:
      cachePolicy === "binary_forward_only"
        ? "Binary is assumed to be carried forward intact; external caches may store device-ready forms."
        : cachePolicy === "hybrid"
        ? "Binary may be cached in both symbolic and device-ready forms, depending on organ-level policy."
        : "Binary caching is disabled at world-core level; organs may still cache locally.",
    signatures: {
      intel: sig.intel,
      classic: sig.classic
    }
  };

  return wb;
}

// ============================================================================
// CORE API — applyPulseWorldBinaryCore (v30‑IMMORTAL‑INTEL++)
// ----------------------------------------------------------------------------
// Single entry point for the WORLD BINARY CORE.
//
//   world = applyPulseWorldBinaryCore(world, context)
//
// INPUT:
//   • world:
//       - world.entities: array of entities (pages, nodes, organs).
//       - world.meta.worldBinaryThroughputScheduler: optional.
//   • context:
//       - cachePolicy: "binary_forward_only" | "hybrid" | "disabled"
//
// OUTPUT (mutates world in-place, deterministically):
//   • world.binary: canonical world binary surface.
//   • world.binary.entities[entityId]: binary physics per entity.
//   • world.binary.frames: compact frames for daemon/OS.
//   • world.binary.organs / world.binary.byId: organ-level view.
//   • world.binary.binaryWaveMap: waves → entities (if scheduler present).
//   • world.binary.cacheView: cache policy + signatures.
//   • world.flags.worldBinaryCoreEnabled = true.
//   • world.flags.worldBinaryCoreVersion = world.binary.version.
// ============================================================================

export function applyPulseWorldBinaryCore(world, context = {}) {
  if (!world) return world;

  world.meta = world.meta || {};
  world.flags = world.flags || {};
  world.runtime = world.runtime || {};

  // 1) Register all binary entities from organs.
  const wb = registerWorldBinaryEntities(world);

  // 2) Link with world throughput scheduler (if present).
  linkWorldBinaryWithThroughput(world);

  // 3) Build frames view for daemon / OS / GPU lymph.
  buildWorldBinaryFramesView(world);

  // 4) Build a world binary cache view (conceptual, no real storage).
  buildWorldBinaryCacheView(world, {
    cachePolicy: context.cachePolicy || "binary_forward_only"
  });

  // 5) Flag world as having an active binary core.
  world.flags.worldBinaryCoreEnabled = true;
  world.flags.worldBinaryCoreVersion = wb.version;

  return world;
}

export default applyPulseWorldBinaryCore;
