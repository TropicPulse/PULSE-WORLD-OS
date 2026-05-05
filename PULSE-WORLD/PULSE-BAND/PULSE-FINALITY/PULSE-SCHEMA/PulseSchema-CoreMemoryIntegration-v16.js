/**
 * PulseSchema-CoreMemoryIntegration-v16-Immortal-GPU+-CI.js
 * PULSE-WORLD / PULSE-FINALITY / PULSE-SCHEMA + CORE MEMORY
 *
 * ROLE:
 *   Wraps PulseSchema physics with PulseCoreMemory hot caching.
 *   - Caches last unified schemas (Firestore, SQL, Binary)
 *   - Caches last merged schema + conflicts
 *   - Caches last binary encoding/decoding
 *   - Tracks hot fields / types (loop-theory friendly)
 *   - Tracks operation-level artery metrics (per route, per op)
 *   - Tracks CI / continuance / binary-delta symbolic overlays
 *
 *   16-IMMORTAL-GPU+-CI:
 *     - GPU-aware (symbolic only)
 *     - Compute-Intelligence (CI) aware (symbolic only)
 *     - Binary-delta aware (symbolic only, no bit inspection)
 *     - Continuance-aware (risk bands + hints)
 *     - Dualband-safe overlays for presence/advantage/fallback/chunk/cache/prewarm
 *
 *   ZERO mutation of physics.
 *   ZERO randomness.
 *   PURE symbolic caching.
 */
/*
AI_EXPERIENCE_META = {
  identity: "PulseSchema-CoreMemoryIntegration",
  version: "v16-Immortal-GPU+-CI",
  layer: "integration",
  role: "schema_corememory_wrapper",
  lineage: "PulseSchema-v14 → v12.3-Presence-Evo+ → v16-Immortal-GPU+-CI",

  evo: {
    integrationWrapper: true,
    coreMemoryAdapter: true,
    symbolicPrimary: true,

    schemaAware: true,
    binaryAware: true,
    firestoreAware: true,
    sqlAware: true,
    mergeAware: true,
    conflictAware: true,

    gpuAware: true,
    ciAware: true,
    continuanceAware: true,
    binaryDeltaAware: true,

    deterministic: true,
    driftProof: true,
    zeroMutationOfInput: true,

    zeroNetwork: true,
    zeroFilesystem: true,
    pureCompute: true
  },

  contract: {
    always: [
      "PulseSchema",
      "PulseCoreMemory"
    ],
    never: [
      "safeRoute",
      "fetchViaCNS",
      "legacySchemaIntegration"
    ]
  }
}
*/

import PulseSchemaAPI from "./PulseSchema-v16.js";
import { createPulseCoreMemory } from "../../PULSE-CORE/PulseCoreMemory.js";

const {
  PulseField,
  PulseSchema,
  unifyFromFirestore,
  unifyFromSQL,
  unifyFromBinary,
  unifyToBinary,
  mergeSchemas
} = PulseSchemaAPI;

// ============================================================================
// META — v16-Immortal-GPU+-CI
// ============================================================================

export const PulseSchemaCoreMemoryMeta = Object.freeze({
  layer: "PulseSchemaCoreMemory",
  role: "SCHEMA_MEMORY_ORGAN",
  version: "16-Immortal-GPU+-CI",
  identity: "PulseSchema-CoreMemory-v16-Immortal-GPU+-CI",

  evo: Object.freeze({
    deterministic: true,
    driftProof: true,
    schemaAware: true,
    binaryAware: true,
    firestoreAware: true,
    sqlAware: true,
    mergeAware: true,
    conflictAware: true,
    readOnly: true,

    // presence surfaces
    presenceAware: true,
    bandPresenceAware: true,
    routerPresenceAware: true,
    advantageAware: true,
    fallbackBandAware: true,
    chunkAware: true,
    cacheAware: true,
    prewarmAware: true,
    coldStartAware: true,

    // v16+ surfaces
    gpuAware: true,
    ciAware: true,
    continuanceAware: true,
    binaryDeltaAware: true,
    arteryMetricsAware: true,

    hotMemoryOrgan: true,
    symbolicMemory: true,
    zeroMutationOfPhysics: true,
    zeroRandomness: true,
    epoch: "16-Immortal-GPU+-CI"
  })
});

// ============================================================================
// CORE MEMORY SETUP
// ============================================================================

const CoreMemory = createPulseCoreMemory();
const ROUTE = "schema-global";

const KEY_LAST_FIRESTORE = "last-unified-firestore-schema";
const KEY_LAST_SQL = "last-unified-sql-schema";
const KEY_LAST_BINARY = "last-unified-binary-schema";
const KEY_LAST_BINARY_BUFFER = "last-binary-buffer";

const KEY_LAST_MERGED = "last-merged-schema";
const KEY_LAST_CONFLICTS = "last-merge-conflicts";

const KEY_HOT_FIELDS = "hot-fields";
const KEY_HOT_TYPES = "hot-types";

// v16: operation-level artery metrics
const KEY_ARTERY = "schema-artery-metrics";

// 12.3+ presence / advantage / fallback / hints
const KEY_LAST_PRESENCE = "last-presence-field";
const KEY_LAST_ADVANTAGE = "last-advantage-field";
const KEY_LAST_FALLBACK = "last-fallback-band-level";
const KEY_LAST_CHUNK_HINTS = "last-chunk-hints";
const KEY_LAST_CACHE_HINTS = "last-cache-hints";
const KEY_LAST_PREWARM_HINTS = "last-prewarm-hints";

// v16: continuance / CI / binary-delta overlays
const KEY_LAST_CONTINUANCE_HINT = "last-continuance-hint";
const KEY_LAST_CI_HINT = "last-ci-hint";
const KEY_LAST_BINARY_DELTA_HINT = "last-binary-delta-hint";

// ============================================================================
// INTERNAL HELPERS
// ============================================================================

function clamp01(v) {
  if (v < 0) return 0;
  if (v > 1) return 1;
  return v;
}

function trackSchemaUsage(schema) {
  if (!schema || !schema.fields) return;

  const hotFields = CoreMemory.get(ROUTE, KEY_HOT_FIELDS) || {};
  const hotTypes = CoreMemory.get(ROUTE, KEY_HOT_TYPES) || {};

  for (const [name, field] of Object.entries(schema.fields)) {
    hotFields[name] = (hotFields[name] || 0) + 1;
    const t = field.type || "unknown";
    hotTypes[t] = (hotTypes[t] || 0) + 1;
  }

  CoreMemory.set(ROUTE, KEY_HOT_FIELDS, hotFields);
  CoreMemory.set(ROUTE, KEY_HOT_TYPES, hotTypes);
}

function normalizeHints(hints = {}) {
  const {
    presenceContext = {},
    advantageContext = {},
    fallbackBandLevel = 0,
    chunkHints = {},
    cacheHints = {},
    prewarmHints = {},

    continuanceRiskReport = null,
    ciSurface = null,
    binaryDeltaPacket = null
  } = hints;

  return {
    presenceContext,
    advantageContext,
    fallbackBandLevel,
    chunkHints,
    cacheHints,
    prewarmHints,
    continuanceRiskReport,
    ciSurface,
    binaryDeltaPacket
  };
}

function stampPresenceHints(hints = {}) {
  const {
    presenceContext,
    advantageContext,
    fallbackBandLevel,
    chunkHints,
    cacheHints,
    prewarmHints
  } = normalizeHints(hints);

  CoreMemory.set(ROUTE, KEY_LAST_PRESENCE, presenceContext);
  CoreMemory.set(ROUTE, KEY_LAST_ADVANTAGE, advantageContext);
  CoreMemory.set(ROUTE, KEY_LAST_FALLBACK, fallbackBandLevel);
  CoreMemory.set(ROUTE, KEY_LAST_CHUNK_HINTS, chunkHints);
  CoreMemory.set(ROUTE, KEY_LAST_CACHE_HINTS, cacheHints);
  CoreMemory.set(ROUTE, KEY_LAST_PREWARM_HINTS, prewarmHints);
}

function bucketContinuanceBand(globalRisk = 0) {
  if (globalRisk >= 0.8) return 3;
  if (globalRisk >= 0.6) return 2;
  if (globalRisk >= 0.4) return 1;
  return 0;
}

function buildContinuanceHint(continuanceRiskReport) {
  if (!continuanceRiskReport) {
    return {
      globalRisk: 0,
      band: 0,
      notes: ["no_continuance_risk_report"]
    };
  }

  const globalRisk = clamp01(continuanceRiskReport.globalRisk ?? 0);
  const band = bucketContinuanceBand(globalRisk);

  return {
    globalRisk,
    band,
    notes: Array.isArray(continuanceRiskReport.notes)
      ? continuanceRiskReport.notes.slice()
      : []
  };
}

function buildCIHint(ciSurface) {
  if (!ciSurface) {
    return {
      ciActive: false,
      ciMode: "none",
      ciScore: 0
    };
  }

  return {
    ciActive: true,
    ciMode: ciSurface.mode || "unknown",
    ciScore: clamp01(ciSurface.ciScore ?? 1)
  };
}

function buildBinaryDeltaHint(binaryDeltaPacket) {
  if (!binaryDeltaPacket || !binaryDeltaPacket.delta) {
    return {
      deltaPresent: false,
      addedBits: 0,
      removedBits: 0,
      unchangedBits: 0
    };
  }

  const d = binaryDeltaPacket.delta;
  return {
    deltaPresent: true,
    addedBits: d.addedCount ?? 0,
    removedBits: d.removedCount ?? 0,
    unchangedBits: d.unchangedCount ?? 0
  };
}

function stampContinuanceCIAndDelta(hints = {}) {
  const { continuanceRiskReport, ciSurface, binaryDeltaPacket } =
    normalizeHints(hints);

  const continuanceHint = buildContinuanceHint(continuanceRiskReport);
  const ciHint = buildCIHint(ciSurface);
  const binaryDeltaHint = buildBinaryDeltaHint(binaryDeltaPacket);

  CoreMemory.set(ROUTE, KEY_LAST_CONTINUANCE_HINT, continuanceHint);
  CoreMemory.set(ROUTE, KEY_LAST_CI_HINT, ciHint);
  CoreMemory.set(ROUTE, KEY_LAST_BINARY_DELTA_HINT, binaryDeltaHint);

  return { continuanceHint, ciHint, binaryDeltaHint };
}

function buildArteryMetricsSnapshot() {
  const artery = CoreMemory.get(ROUTE, KEY_ARTERY) || {
    totalOps: 0,
    firestoreOps: 0,
    sqlOps: 0,
    binaryOps: 0,
    mergeOps: 0,
    lastOpKind: null,
    lastFieldCount: 0
  };

  const totalOps = Math.max(1, artery.totalOps || 1);
  const load = clamp01(totalOps / 8192);
  const pressure = clamp01(artery.lastFieldCount / 4096);

  const loadBucket =
    load >= 0.9 ? "saturated" :
    load >= 0.7 ? "high" :
    load >= 0.4 ? "medium" :
    load > 0 ? "low" : "idle";

  const pressureBucket =
    pressure >= 0.9 ? "overload" :
    pressure >= 0.7 ? "high" :
    pressure >= 0.4 ? "medium" :
    pressure > 0 ? "low" : "none";

  return {
    ...artery,
    load,
    loadBucket,
    pressure,
    pressureBucket
  };
}

function bumpArtery(kind, fieldCount) {
  const artery = CoreMemory.get(ROUTE, KEY_ARTERY) || {
    totalOps: 0,
    firestoreOps: 0,
    sqlOps: 0,
    binaryOps: 0,
    mergeOps: 0,
    lastOpKind: null,
    lastFieldCount: 0
  };

  artery.totalOps += 1;
  if (kind === "firestore") artery.firestoreOps += 1;
  if (kind === "sql") artery.sqlOps += 1;
  if (kind === "binary") artery.binaryOps += 1;
  if (kind === "merge") artery.mergeOps += 1;

  artery.lastOpKind = kind;
  artery.lastFieldCount = fieldCount || 0;

  CoreMemory.set(ROUTE, KEY_ARTERY, artery);
}

// ============================================================================
// WRAPPED API — v16-Immortal-GPU+-CI
// ============================================================================

export function unifyFromFirestoreWithMemory(firestoreSchema, hints = {}) {
  CoreMemory.prewarm();

  const schema = unifyFromFirestore(firestoreSchema);

  CoreMemory.set(ROUTE, KEY_LAST_FIRESTORE, schema);
  trackSchemaUsage(schema);
  stampPresenceHints(hints);
  const overlays = stampContinuanceCIAndDelta(hints);

  const fieldCount = schema && schema.fields
    ? Object.keys(schema.fields).length
    : 0;
  bumpArtery("firestore", fieldCount);

  return {
    schema,
    overlays,
    artery: buildArteryMetricsSnapshot()
  };
}

export function unifyFromSQLWithMemory(sqlSchema, hints = {}) {
  CoreMemory.prewarm();

  const schema = unifyFromSQL(sqlSchema);

  CoreMemory.set(ROUTE, KEY_LAST_SQL, schema);
  trackSchemaUsage(schema);
  stampPresenceHints(hints);
  const overlays = stampContinuanceCIAndDelta(hints);

  const fieldCount = schema && schema.fields
    ? Object.keys(schema.fields).length
    : 0;
  bumpArtery("sql", fieldCount);

  return {
    schema,
    overlays,
    artery: buildArteryMetricsSnapshot()
  };
}

export function unifyFromBinaryWithMemory(binaryBuffer, hints = {}) {
  CoreMemory.prewarm();

  const schema = unifyFromBinary(binaryBuffer);

  CoreMemory.set(ROUTE, KEY_LAST_BINARY, schema);
  CoreMemory.set(ROUTE, KEY_LAST_BINARY_BUFFER, binaryBuffer);
  trackSchemaUsage(schema);
  stampPresenceHints(hints);
  const overlays = stampContinuanceCIAndDelta(hints);

  const fieldCount = schema && schema.fields
    ? Object.keys(schema.fields).length
    : 0;
  bumpArtery("binary", fieldCount);

  return {
    schema,
    overlays,
    artery: buildArteryMetricsSnapshot()
  };
}

export function unifyToBinaryWithMemory(pulseSchema, hints = {}) {
  CoreMemory.prewarm();

  const buffer = unifyToBinary(pulseSchema);

  CoreMemory.set(ROUTE, KEY_LAST_BINARY_BUFFER, buffer);
  CoreMemory.set(ROUTE, KEY_LAST_BINARY, pulseSchema);
  trackSchemaUsage(pulseSchema);
  stampPresenceHints(hints);
  const overlays = stampContinuanceCIAndDelta(hints);

  const fieldCount = pulseSchema && pulseSchema.fields
    ? Object.keys(pulseSchema.fields).length
    : 0;
  bumpArtery("binary", fieldCount);

  return {
    buffer,
    overlays,
    artery: buildArteryMetricsSnapshot()
  };
}

export function mergeSchemasWithMemory(schemaA, schemaB, hints = {}) {
  CoreMemory.prewarm();

  const merged = mergeSchemas(schemaA, schemaB);

  CoreMemory.set(ROUTE, KEY_LAST_MERGED, merged);

  const conflicts =
    (merged.meta && merged.meta.schemaConflicts) || [];
  CoreMemory.set(ROUTE, KEY_LAST_CONFLICTS, conflicts);

  trackSchemaUsage(merged);
  stampPresenceHints(hints);
  const overlays = stampContinuanceCIAndDelta(hints);

  const fieldCount = merged && merged.fields
    ? Object.keys(merged.fields).length
    : 0;
  bumpArtery("merge", fieldCount);

  return {
    merged,
    conflicts,
    overlays,
    artery: buildArteryMetricsSnapshot()
  };
}

// ============================================================================
// HOT MEMORY ACCESSORS
// ============================================================================

export function getLastSchemaState() {
  CoreMemory.prewarm();

  return {
    meta: PulseSchemaCoreMemoryMeta,

    lastFirestoreSchema: CoreMemory.get(ROUTE, KEY_LAST_FIRESTORE),
    lastSQLSchema: CoreMemory.get(ROUTE, KEY_LAST_SQL),
    lastBinarySchema: CoreMemory.get(ROUTE, KEY_LAST_BINARY),
    lastBinaryBuffer: CoreMemory.get(ROUTE, KEY_LAST_BINARY_BUFFER),
    lastMergedSchema: CoreMemory.get(ROUTE, KEY_LAST_MERGED),
    lastMergeConflicts: CoreMemory.get(ROUTE, KEY_LAST_CONFLICTS),

    hotFields: CoreMemory.get(ROUTE, KEY_HOT_FIELDS),
    hotTypes: CoreMemory.get(ROUTE, KEY_HOT_TYPES),

    presenceField: CoreMemory.get(ROUTE, KEY_LAST_PRESENCE),
    advantageField: CoreMemory.get(ROUTE, KEY_LAST_ADVANTAGE),
    fallbackBandLevel: CoreMemory.get(ROUTE, KEY_LAST_FALLBACK),

    chunkHints: CoreMemory.get(ROUTE, KEY_LAST_CHUNK_HINTS),
    cacheHints: CoreMemory.get(ROUTE, KEY_LAST_CACHE_HINTS),
    prewarmHints: CoreMemory.get(ROUTE, KEY_LAST_PREWARM_HINTS),

    continuanceHint: CoreMemory.get(ROUTE, KEY_LAST_CONTINUANCE_HINT),
    ciHint: CoreMemory.get(ROUTE, KEY_LAST_CI_HINT),
    binaryDeltaHint: CoreMemory.get(ROUTE, KEY_LAST_BINARY_DELTA_HINT),

    artery: buildArteryMetricsSnapshot()
  };
}

// ============================================================================
// EXPORT
// ============================================================================

const PulseSchemaCoreMemory = {
  PulseField,
  PulseSchema,

  unifyFromFirestoreWithMemory,
  unifyFromSQLWithMemory,
  unifyFromBinaryWithMemory,
  unifyToBinaryWithMemory,
  mergeSchemasWithMemory,

  getLastSchemaState,
  CoreMemory,
  meta: PulseSchemaCoreMemoryMeta
};

export default PulseSchemaCoreMemory;
