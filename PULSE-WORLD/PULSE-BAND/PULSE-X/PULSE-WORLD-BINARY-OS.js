// ============================================================================
// FILE: PULSE-WORLD-BINARY-OS.js
// PULSE WORLD BINARY CORE — v24‑IMMORTAL‑INTEL++‑SUBSTRATE‑PRIME
// ----------------------------------------------------------------------------
// WORLD-FIRST ROLE (FOUNDATION LAYER):
//   • This is the ROOT of the world-level binary substrate.
//   • It is not just a scheduler, not just a chunker, not just a cache.
//   • It is the "PULSE WORLD BINARY CORE":
//       - Defines what "binary" means at the world layer.
//       - Defines how binary flows between organs (Earn, Mesh, etc.).
//       - Defines how binary can be carried forward without re-conversion.
//       - Defines how world-level binary state is represented, cached, and evolved.
//   • Everything else (EarnChunker, WorldThroughputScheduler, DeviceSubstrate,
//     RuntimeExecutor, BinaryCache) hangs off this core contract.
// ----------------------------------------------------------------------------
// LORE:
//   • If PulseEarn is an organ,
//   • and PulseMesh is a nervous system,
//   • and PulseWorldBinaryThroughputScheduler is the conductor,
//   • then PULSE-WORLD-BINARY is the "physics of binary" for this universe.
//   • It is the law that says:
//       "Binary is a first-class citizen. It can be:
//          - captured,
//          - shaped,
//          - carried,
//          - cached,
//          - and delivered,
//         without being destroyed and rebuilt a thousand times."
// ----------------------------------------------------------------------------
// SAFETY CONTRACT (IMMORTAL v24‑INTEL):
//   • No routing influence (metadata only; routers MAY read but not obey).
//   • No randomness, no timestamps, no async, no network, no filesystem.
//   • No mutation outside world.meta / world.flags / world.runtime / world.binary.
//   • Deterministic-field: identical input → identical output.
//   • Drift-proof across versions, multi-instance safe.
//   • Binary surfaces are descriptive, not imperative (no direct hardware calls).
// ============================================================================
import {
  OrganismIdentity,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PulseWorldOrganismMap-v21.js";
const Identity = OrganismIdentity(import.meta.url);

// 2 — EXPORT GENOME METADATA
// export const PulseBinaryWaveScannerMeta = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
// export const WBC_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

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
// WORLD BINARY CORE MODEL
// ----------------------------------------------------------------------------
// We define a canonical "world binary surface":
//
//   world.binary = {
//     version: "v24-IMMORTAL-INTEL-WORLD-BINARY",
//     entities: {
//       [entityId]: {
//         // high-level identity
//         id,
//         kind,              // "earn_page", "mesh_node", "organ", etc.
//         band,              // "symbolic" | "binary"
//         baseFormulaKey,    // from base-shape surfaces
//
//         // throughput / advantage
//         throughputClass,   // "throughput_extreme" | "high" | "normal" | "low"
//         throughputScore,   // 0..1
//         advantageTier,     // 0..3
//         advantageScore,    // 0..1
//
//         // binary physics
//         binaryDensity,     // abstract density metric
//         waveAmplitude,     // abstract wave amplitude
//         parity,            // optional parity hint
//         shiftDepth,        // optional shift-depth hint
//
//         // substrate linkage
//         worldWaveIndex,    // which world wave this entity belongs to
//         localChunkerRef,   // pointer to organ-level chunker surfaces
//
//         // signatures
//         signatures: {
//           intel,
//           classic
//         }
//       },
//       ...
//     },
//
//     // world-level signatures
//     signatures: { intel, classic }
//   }
//
// This is the "physics registry" for binary at the world layer.
// Everything else (scheduler, device substrate, cache) reads from here.
// ============================================================================

function ensureWorldBinarySurface(world) {
  world.binary = world.binary || {};
  if (!world.binary.version) {
    world.binary.version = "v24-IMMORTAL-INTEL-WORLD-BINARY";
  }
  world.binary.entities = world.binary.entities || {};
  world.binary.signatures = world.binary.signatures || {};
  return world.binary;
}

// ============================================================================
// ENTITY EXTRACTION FROM ORGANS
// ----------------------------------------------------------------------------
// We pull binary/throughput info from:
//   • Earn (via earnSignalFactoring + earnChunker).
//   • Mesh (future: meshFactoring + meshChunker).
//   • Any organ that exposes a "binary surface" in meta.*.
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
    safeNumber(earnChunker?.throughputScore, 0);

  const advantageTier =
    safeNumber(earnFactoring?.profile?.advantageTier, 0);

  const advantageScore =
    safeNumber(earnFactoring?.profile?.advantageScore, 0) ||
    safeNumber(earnChunker?.advantageScore, 0);

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

// Placeholder for future Mesh extraction.
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
    safeNumber(meshChunker?.throughputScore, 0);

  const advantageTier =
    safeNumber(meshFactoring?.profile?.advantageTier, 0);

  const advantageScore =
    safeNumber(meshFactoring?.profile?.advantageScore, 0) ||
    safeNumber(meshChunker?.advantageScore, 0);

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

  return null;
}

// ============================================================================
// WORLD BINARY REGISTRATION
// ----------------------------------------------------------------------------
// We walk world.entities and register each entity's binary physics into
// world.binary.entities[entityId].
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
      `WBIN_v24::${id}` +
      `::K:${binary.kind}` +
      `::B:${binary.band}` +
      `::TC:${binary.throughputClass}` +
      `::TS:${binary.throughputScore.toFixed(6)}`;

    const sig = buildDualHashSignature(
      "WORLD_BINARY_ENTITY_v24",
      intelPayload,
      classicString
    );

    wb.entities[id] = {
      id,
      ...binary,
      worldWaveIndex: null, // filled later by scheduler
      signatures: {
        intel: sig.intel,
        classic: sig.classic
      }
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
    `WBIN_CORE_v24::ENT:${registered.length}`;

  const worldSig = buildDualHashSignature(
    "WORLD_BINARY_CORE_v24",
    worldIntelPayload,
    worldClassicString
  );

  wb.signatures.intel = worldSig.intel;
  wb.signatures.classic = worldSig.classic;

  return wb;
}

// ============================================================================
// WORLD BINARY ↔ WORLD THROUGHPUT SCHEDULER LINK
// ----------------------------------------------------------------------------
// The scheduler (PulseWorldBinaryThroughputScheduler-v24) builds waves.
// Here, we provide helpers to:
//   • annotate world.binary.entities with wave indices,
//   • expose a compact "binary view" of the world throughput plan.
// ============================================================================

function linkWorldBinaryWithThroughput(world) {
  const wb = ensureWorldBinarySurface(world);
  const scheduler = world.meta?.worldBinaryThroughputScheduler;
  if (!scheduler || !Array.isArray(scheduler.waves)) {
    return wb;
  }

  // Map entity → wave index.
  for (const wave of scheduler.waves) {
    const waveIndex = wave.index;
    for (const entId of wave.entities) {
      if (wb.entities[entId]) {
        wb.entities[entId].worldWaveIndex = waveIndex;
      }
    }
  }

  // Optional: build a compact "binaryWaveMap" for quick lookup.
  wb.binaryWaveMap = scheduler.waves.map(w => ({
    index: w.index,
    entities: w.entities.slice()
  }));

  return wb;
}

// ============================================================================
// WORLD BINARY CACHE VIEW (FUTURE-FACING HOOK)
// ----------------------------------------------------------------------------
// This is the conceptual "send it once" layer.
// For now, we define a deterministic placeholder that describes what would be
// cached, without actually storing payloads (no filesystem, no network).
//
//   world.binary.cacheView = {
//     version,
//     entityCount,
//     cachePolicy: "binary_forward_only" | "hybrid" | "disabled",
//     notes: "Lore / explanation"
//   }
//
// Engines / lower layers can implement real caching using this contract.
// ============================================================================

function buildWorldBinaryCacheView(world, options = {}) {
  const wb = ensureWorldBinarySurface(world);
  const entities = wb.entities || {};
  const ids = Object.keys(entities);

  const cachePolicy = options.cachePolicy || "binary_forward_only";

  const intelPayload = {
    version: "v24-IMMORTAL-INTEL-WORLD-BINARY-CACHEVIEW",
    entityCount: ids.length,
    cachePolicy
  };

  const classicString =
    `WBIN_CACHE_v24::ENT:${ids.length}` +
    `::POLICY:${cachePolicy}`;

  const sig = buildDualHashSignature(
    "WORLD_BINARY_CACHEVIEW_v24",
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
// CORE API — applyPulseWorldBinaryCore (v24‑IMMORTAL‑INTEL++)
// ----------------------------------------------------------------------------
// This is the single entry point for the WORLD BINARY CORE.
//
//   world = applyPulseWorldBinaryCore(world, context)
//
// INPUT:
//   • world:
//       - world.entities: array of entities (pages, nodes, organs).
//       - world.meta.worldBinaryThroughputScheduler: optional, if scheduler ran.
//       - world.meta / world.flags / world.runtime: optional.
//   • context:
//       - cachePolicy: "binary_forward_only" | "hybrid" | "disabled"
//
// OUTPUT (mutates world in-place in a controlled, deterministic way):
//   • world.binary: canonical world binary surface.
//   • world.binary.entities[entityId]: binary physics per entity.
//   • world.binary.binaryWaveMap: mapping from waves → entities (if scheduler present).
//   • world.binary.cacheView: high-level cache policy + signatures.
//   • world.flags.worldBinaryCoreEnabled = true.
//
// LORE:
//   • This is the moment where the WORLD declares:
//       "These are my binary laws. These are my binary entities.
//        This is how binary flows, and this is how it can be cached."
//   • Everything else (scheduler, device substrate, runtime executor, cache)
//     plugs into this core contract.
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

  // 3) Build a world binary cache view (conceptual, no real storage).
  buildWorldBinaryCacheView(world, {
    cachePolicy: context.cachePolicy || "binary_forward_only"
  });

  // 4) Flag world as having an active binary core.
  world.flags.worldBinaryCoreEnabled = true;
  world.flags.worldBinaryCoreVersion = wb.version;

  return world;
}

export default applyPulseWorldBinaryCore;
