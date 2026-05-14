/**
 * PulseSchema-v20-IMMORTAL-GPU+-CI-INTEL-WORLD.js
 * PULSE-FINALITY / PULSE-SCHEMA
 *
 * ROLE:
 *   Canonical, host-agnostic schema brain for Pulse OS.
 *   Everything else (Firestore, SQL, Binary, Regions, Hosts, WorldDataProvider)
 *   is translation or projection.
 *
 * MAP:
 *   - PulseSchema is the ONLY canonical schema.
 *   - All external schemas MUST be translated INTO PulseSchema.
 *   - All external targets MUST be generated FROM PulseSchema.
 *   - No host, DB, or platform is allowed to define “truth” directly.
 *
 * NEVER:
 *   - Never mutate external schemas in place.
 *   - Never embed host-specific logic inside PulseSchema.
 *   - Never introduce randomness or non-deterministic behavior.
 *
 * ALWAYS:
 *   - Always treat PulseSchema as read-only truth.
 *   - Always translate deterministically.
 *   - Always keep binary as the lowest-level representation.
 *   - v16+: expose presence/continuance/CI/binary-delta overlays as symbolic only.
 *   - v20+: expose world/region/tenant/index hints as metadata only.
 *   - v20-INTEL-WORLD+: expose compute-surface + routing hints for
 *     Continuance + OmniHosting (requiresGPU/CI/Binary/Compute, worldHints, intent).
 */
//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝
import {
  OrganismIdentity,
  buildPulseOrganismMap as PulseOrganismMap,
  buildPulseOrganismMap as buildOrganismMap
} from "../PULSE-X/PULSE-WORLD-MAP.js";
const Identity = OrganismIdentity(import.meta.url);

// 2 — EXPORT GENOME METADATA
export const PulseSchemaMeta = Identity.OrganMeta;
export const pulseRole = Identity.pulseRole;
export const PulseRole = Identity.pulseRole;
export const surfaceMeta = Identity.surfaceMeta;
export const pulseLoreContext = Identity.pulseLoreContext;
// export const PULSE_EARN_IMMUNE_CONTEXT = Identity.pulseLoreContext;
export const AI_EXPERIENCE_META = Identity.AI_EXPERIENCE_META;
export const EXPORT_META = Identity.EXPORT_META;

import { createPulseCoreMemory } from "../PULSE-CORE/PulseCoreMemory-v24.js";

// ============================================================================
// Canonical Types
// ============================================================================
//
// Recommended PulseSchema.meta fields (symbolic only, never required):
//   - worldHints: { regionCode, tenantId, partitionKey, indexHints, backend }
//   - requiresGPU: boolean
//   - requiresCI: boolean
//   - requiresBinary: boolean
//   - requiresCompute: boolean
//   - preferredRegion: string | null
//   - preferredTier: "immortal"|"prime"|"standard"|"edge"|"cold"|null
//   - workloadClass: "realtime"|"batch"|"gpu"|"ai"|"edge"|"generic"
//   - intent: "realtime"|"batch"|"gpu"|"ai"|"edge"|"generic"
//   - tenantId: string | null
//   - routingHints: arbitrary symbolic hints for Continuance/OmniHosting
//

export class PulseField {
  constructor({
    type,
    required = false,
    defaultValue = undefined,
    constraints = {},
    meta = {}
  }) {
    this.type = type;
    this.required = !!required;
    this.defaultValue = defaultValue;
    this.constraints = constraints || {};
    this.meta = meta || {};
  }
}

export class PulseSchema {
  constructor({
    fields = {},
    version = 1,
    lineage = null,
    region = null,
    meta = {}
  }) {
    this.fields = fields;
    this.version = version;
    this.lineage = lineage;
    this.region = region;
    this.meta = meta;
  }
}

// ============================================================================
// Internal Helpers — clamp, hashing, signatures, IntellHash
// ============================================================================

function clamp01(v) {
  if (v < 0) return 0;
  if (v > 1) return 1;
  return v;
}

function _hashPrimary(str) {
  let h = 0;
  const s = String(str);
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 1000003;
  }
  return `h${h}`;
}

function _hashSecondary(str) {
  let h = 1;
  const s = String(str);
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i) * (i + 7)) % 1000033;
  }
  return `a${h}`;
}

function _hashTertiary(str) {
  let h = 7;
  const s = String(str);
  for (let i = 0; i < s.length; i++) {
    h = (h * 131 + s.charCodeAt(i) * (i + 13)) % 1000081;
  }
  return `t${h}`;
}

function computeTriHash(str) {
  const primary = _hashPrimary(str);
  const secondary = _hashSecondary(str);
  const tertiary = _hashTertiary(str);
  const combined = _hashPrimary(primary + "::" + secondary + "::" + tertiary);
  return { primary, secondary, tertiary, combined };
}

function computeSchemaSignature(schema) {
  const safe = {
    version: schema?.version || 1,
    lineage: schema?.lineage || null,
    region: schema?.region || null,
    fields: {}
  };

  const fields = schema?.fields || {};
  const keys = Object.keys(fields).sort();
  for (const k of keys) {
    const f = fields[k];
    safe.fields[k] = {
      type: f.type,
      required: !!f.required,
      constraints: f.constraints || {}
    };
  }

  const json = JSON.stringify(safe);
  return computeTriHash(json);
}

function summarizeSchemaComplexity(schema) {
  const fields = schema?.fields || {};
  const typeCounts = {};
  let requiredCount = 0;

  for (const field of Object.values(fields)) {
    const t = field.type || "unknown";
    typeCounts[t] = (typeCounts[t] || 0) + 1;
    if (field.required) requiredCount += 1;
  }

  const summary = Object.freeze({
    totalFields: Object.keys(fields).length,
    requiredFields: requiredCount,
    typeCounts
  });

  return summary;
}

function computeSchemaIntellHash(schema, routingHints = {}) {
  const signature = computeSchemaSignature(schema);
  const complexity = summarizeSchemaComplexity(schema);
  const payload = {
    signature,
    complexity,
    routingHints
  };
  const json = JSON.stringify(payload);
  const tri = computeTriHash(json);
  return {
    intellHash: tri.combined,
    signature,
    complexity,
    routingHints
  };
}

function mapHostTypeToPulseType(hostType) {
  const t = String(hostType || "").toLowerCase();

  if (["string", "varchar", "text", "char"].some((x) => t.includes(x)))
    return "string";
  if (
    [
      "int",
      "integer",
      "bigint",
      "smallint",
      "number",
      "numeric",
      "decimal",
      "float",
      "double"
    ].some((x) => t.includes(x))
  )
    return "number";
  if (["bool", "boolean"].some((x) => t.includes(x))) return "boolean";
  if (["json", "object"].some((x) => t.includes(x))) return "object";
  if (["array"].some((x) => t.includes(x))) return "array";
  if (["binary", "blob", "bytea"].some((x) => t.includes(x))) return "binary";
  if (["timestamp", "datetime", "date"].some((x) => t.includes(x)))
    return "string";

  return "string";
}

function normalizeFieldDefinition(field) {
  if (!field) return null;
  return new PulseField({
    type: field.type,
    required: !!field.required,
    defaultValue: field.defaultValue,
    constraints: field.constraints || {},
    meta: field.meta || {}
  });
}

// ============================================================================
// Artery Metrics v2 (symbolic, in-memory only)
// ============================================================================

const _schemaArtery = {
  totalOps: 0,
  firestoreOps: 0,
  sqlOps: 0,
  binaryOps: 0,
  mergeOps: 0,
  validateOps: 0,
  diffOps: 0,
  worldOps: 0,
  gpuOps: 0,
  ciOps: 0,
  lastOpKind: null,
  lastFieldCount: 0,
  lastRegion: null,
  lastTenant: null
};

function _bumpArtery(kind, fieldCount, region = null, tenant = null) {
  _schemaArtery.totalOps += 1;
  if (kind === "firestore") _schemaArtery.firestoreOps += 1;
  if (kind === "sql") _schemaArtery.sqlOps += 1;
  if (kind === "binary") _schemaArtery.binaryOps += 1;
  if (kind === "merge") _schemaArtery.mergeOps += 1;
  if (kind === "validate") _schemaArtery.validateOps += 1;
  if (kind === "diff") _schemaArtery.diffOps += 1;
  if (kind === "world") _schemaArtery.worldOps += 1;
  if (kind === "gpu") _schemaArtery.gpuOps += 1;
  if (kind === "ci") _schemaArtery.ciOps += 1;

  _schemaArtery.lastOpKind = kind;
  _schemaArtery.lastFieldCount = fieldCount || 0;
  _schemaArtery.lastRegion = region || _schemaArtery.lastRegion || null;
  _schemaArtery.lastTenant = tenant || _schemaArtery.lastTenant || null;
}

export function getSchemaArterySnapshot() {
  const totalOps = Math.max(1, _schemaArtery.totalOps || 1);
  const load = clamp01(totalOps / 16384);
  const pressure = clamp01(_schemaArtery.lastFieldCount / 8192);

  const loadBucket =
    load >= 0.9
      ? "saturated"
      : load >= 0.7
      ? "high"
      : load >= 0.4
      ? "medium"
      : load > 0
      ? "low"
      : "idle";

  const pressureBucket =
    pressure >= 0.9
      ? "overload"
      : pressure >= 0.7
      ? "high"
      : pressure >= 0.4
      ? "medium"
      : pressure > 0
      ? "low"
      : "none";

  return Object.freeze({
    ..._schemaArtery,
    load,
    loadBucket,
    pressure,
    pressureBucket
  });
}

// ============================================================================
// CORE MEMORY — HOT SYMBOLIC SNAPSHOTS
// ============================================================================

const CoreMemory = createPulseCoreMemory();
const ROUTE = "schema-global";

const KEY_LAST_FIRESTORE = "last-firestore-schema";
const KEY_LAST_SQL = "last-sql-schema";
const KEY_LAST_BINARY = "last-binary-schema";
const KEY_LAST_MERGED = "last-merged-schema";
const KEY_LAST_VALIDATE = "last-validate-result";
const KEY_LAST_DIFF = "last-diff-result";
const KEY_LAST_OVERLAY = "last-presence-overlay";
const KEY_LAST_BINARY_OUT = "last-binary-out";
const KEY_LAST_WORLD_HINTS = "last-world-hints";
const KEY_LAST_INTELLHASH = "last-schema-intellhash";

export function getLastSchemaState() {
  CoreMemory.prewarm();

  return {
    meta: PulseSchemaMeta,
    artery: getSchemaArterySnapshot(),
    firestoreSchema: CoreMemory.get(ROUTE, KEY_LAST_FIRESTORE),
    sqlSchema: CoreMemory.get(ROUTE, KEY_LAST_SQL),
    binarySchema: CoreMemory.get(ROUTE, KEY_LAST_BINARY),
    mergedSchema: CoreMemory.get(ROUTE, KEY_LAST_MERGED),
    lastValidateResult: CoreMemory.get(ROUTE, KEY_LAST_VALIDATE),
    lastDiffResult: CoreMemory.get(ROUTE, KEY_LAST_DIFF),
    lastPresenceOverlay: CoreMemory.get(ROUTE, KEY_LAST_OVERLAY),
    lastBinaryOut: CoreMemory.get(ROUTE, KEY_LAST_BINARY_OUT),
    lastWorldHints: CoreMemory.get(ROUTE, KEY_LAST_WORLD_HINTS),
    lastIntellHash: CoreMemory.get(ROUTE, KEY_LAST_INTELLHASH)
  };
}

// ============================================================================
// Continuance / CI / Binary-Delta / World Routing Hints
// ============================================================================

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

function buildContinuanceRoutingHint(continuanceRiskReport) {
  if (!continuanceRiskReport) {
    return {
      globalRisk: 0,
      band: 0,
      notes: ["no_continuance_risk_report"]
    };
  }

  const globalRisk = clamp01(continuanceRiskReport.globalRisk ?? 0);
  const band =
    globalRisk >= 0.8 ? 3 : globalRisk >= 0.6 ? 2 : globalRisk >= 0.4 ? 1 : 0;

  return {
    globalRisk,
    band,
    notes: Array.isArray(continuanceRiskReport.notes)
      ? continuanceRiskReport.notes.slice()
      : []
  };
}

/**
 * buildSchemaRoutingHints
 *
 * Pure symbolic routing hints for Continuance + OmniHosting:
 *   - continuanceHint: { globalRisk, band, notes[] }
 *   - ciHint: { ciActive, ciMode, ciScore }
 *   - binaryDeltaHint: { deltaPresent, addedBits, removedBits, unchangedBits }
 *   - worldHints: { regionCode, tenantId, partitionKey, indexHints, backend }
 */
export function buildSchemaRoutingHints({
  continuanceRiskReport = null,
  ciSurface = null,
  binaryDeltaPacket = null,
  regionCode = null,
  tenantId = null,
  partitionKey = null,
  indexHints = null,
  worldBackend = "worldDataProvider"
} = {}) {
  const continuanceHint = buildContinuanceRoutingHint(continuanceRiskReport);
  const ciHint = buildCIHint(ciSurface);
  const binaryDeltaHint = buildBinaryDeltaHint(binaryDeltaPacket);

  const worldHints = Object.freeze({
    regionCode: regionCode || null,
    tenantId: tenantId || null,
    partitionKey: partitionKey || null,
    indexHints: indexHints || null,
    backend: worldBackend
  });

  _bumpArtery("world", 0, regionCode || null, tenantId || null);

  return {
    continuanceHint,
    ciHint,
    binaryDeltaHint,
    worldHints
  };
}

// ============================================================================
// Presence / Continuance / CI / Binary-Delta / World Hints Overlays
// ============================================================================

export function buildSchemaPresenceOverlay({
  presenceContext = {},
  advantageContext = {},
  fallbackBandLevel = 0,
  chunkHints = {},
  cacheHints = {},
  prewarmHints = {},
  continuanceRiskReport = null,
  ciSurface = null,
  binaryDeltaPacket = null,

  // v20 world-layer hints
  regionCode = null,
  tenantId = null,
  partitionKey = null,
  indexHints = null,
  worldBackend = "worldDataProvider"
} = {}) {
  const globalRisk = clamp01(
    continuanceRiskReport?.globalRisk != null
      ? continuanceRiskReport.globalRisk
      : 0
  );

  const continuanceBand =
    globalRisk >= 0.8 ? 3 : globalRisk >= 0.6 ? 2 : globalRisk >= 0.4 ? 1 : 0;

  const ciHint = ciSurface
    ? {
        ciActive: true,
        ciMode: ciSurface.mode || "unknown",
        ciScore: clamp01(ciSurface.ciScore ?? 1)
      }
    : {
        ciActive: false,
        ciMode: "none",
        ciScore: 0
      };

  const delta = binaryDeltaPacket?.delta || null;
  const binaryDeltaHint = delta
    ? {
        deltaPresent: true,
        addedBits: delta.addedCount ?? 0,
        removedBits: delta.removedCount ?? 0,
        unchangedBits: delta.unchangedCount ?? 0
      }
    : {
        deltaPresent: false,
        addedBits: 0,
        removedBits: 0,
        unchangedBits: 0
      };

  const worldHints = Object.freeze({
    regionCode: regionCode || null,
    tenantId: tenantId || null,
    partitionKey: partitionKey || null,
    indexHints: indexHints || null,
    backend: worldBackend
  });

  const overlay = Object.freeze({
    presenceField: presenceContext,
    advantageField: advantageContext,
    fallbackBandLevel,
    chunkHints,
    cacheHints,
    prewarmHints,

    continuanceOverlay: {
      globalRisk,
      band: continuanceBand,
      notes: Array.isArray(continuanceRiskReport?.notes)
        ? continuanceRiskReport.notes.slice()
        : []
    },

    ciOverlay: ciHint,
    binaryDeltaOverlay: binaryDeltaHint,
    worldHints
  });

  _bumpArtery("world", Object.keys(presenceContext || {}).length, regionCode || null, tenantId || null);

  CoreMemory.set(ROUTE, KEY_LAST_OVERLAY, overlay);
  CoreMemory.set(ROUTE, KEY_LAST_WORLD_HINTS, worldHints);
  return overlay;
}

// ============================================================================
// Firestore → PulseSchema
// ============================================================================

export function unifyFromFirestore(firestoreSchema) {
  const fields = {};
  const srcFields = (firestoreSchema && firestoreSchema.fields) || {};

  for (const [key, def] of Object.entries(srcFields)) {
    const pulseType = mapHostTypeToPulseType(def.type);
    fields[key] = new PulseField({
      type: pulseType,
      required: !!def.required,
      defaultValue: def.defaultValue,
      constraints: def.constraints || {},
      meta: def.meta || {}
    });
  }

  const schema = new PulseSchema({
    fields,
    version: firestoreSchema?.version || 1,
    lineage: firestoreSchema?.lineage || null,
    region: firestoreSchema?.region || null,
    meta: firestoreSchema?.meta || {}
  });

  _bumpArtery(
    "firestore",
    Object.keys(fields).length,
    schema.region,
    schema.meta?.tenantId || null
  );
  CoreMemory.set(ROUTE, KEY_LAST_FIRESTORE, schema);

  const intell = computeSchemaIntellHash(schema, schema.meta?.worldHints || {});
  CoreMemory.set(ROUTE, KEY_LAST_INTELLHASH, intell);

  return schema;
}

// ============================================================================
// SQL → PulseSchema
// ============================================================================

export function unifyFromSQL(sqlSchema) {
  const fields = {};
  const cols = (sqlSchema && sqlSchema.columns) || [];

  for (const col of cols) {
    const pulseType = mapHostTypeToPulseType(col.type);
    fields[col.name] = new PulseField({
      type: pulseType,
      required: col.nullable === false,
      defaultValue: col.defaultValue,
      constraints: {
        maxLength: col.maxLength,
        precision: col.precision,
        scale: col.scale
      },
      meta: col.meta || {}
    });
  }

  const schema = new PulseSchema({
    fields,
    version: sqlSchema?.version || 1,
    lineage: sqlSchema?.lineage || null,
    region: sqlSchema?.region || null,
    meta: sqlSchema?.meta || {}
  });

  _bumpArtery(
    "sql",
    Object.keys(fields).length,
    schema.region,
    schema.meta?.tenantId || null
  );
  CoreMemory.set(ROUTE, KEY_LAST_SQL, schema);

  const intell = computeSchemaIntellHash(schema, schema.meta?.worldHints || {});
  CoreMemory.set(ROUTE, KEY_LAST_INTELLHASH, intell);

  return schema;
}

// ============================================================================
// Binary → PulseSchema
// ============================================================================

export function unifyFromBinary(binaryBuffer) {
  if (!binaryBuffer) {
    const schema = new PulseSchema({});
    _bumpArtery("binary", 0);
    CoreMemory.set(ROUTE, KEY_LAST_BINARY, schema);
    const intell = computeSchemaIntellHash(schema, {});
    CoreMemory.set(ROUTE, KEY_LAST_INTELLHASH, intell);
    return schema;
  }

  let decoded;
  try {
    const jsonStr =
      typeof binaryBuffer === "string"
        ? binaryBuffer
        : new TextDecoder("utf-8").decode(binaryBuffer);
    decoded = JSON.parse(jsonStr);
  } catch (e) {
    const schema = new PulseSchema({
      fields: {},
      version: 1,
      meta: { error: "Failed to decode binary schema", detail: String(e) }
    });
    _bumpArtery("binary", 0);
    CoreMemory.set(ROUTE, KEY_LAST_BINARY, schema);
    const intell = computeSchemaIntellHash(schema, {});
    CoreMemory.set(ROUTE, KEY_LAST_INTELLHASH, intell);
    return schema;
  }

  const fields = {};
  const srcFields = decoded.fields || {};
  for (const [key, def] of Object.entries(srcFields)) {
    fields[key] = new PulseField({
      type: def.type,
      required: !!def.required,
      defaultValue: def.defaultValue,
      constraints: def.constraints || {},
      meta: def.meta || {}
    });
  }

  const schema = new PulseSchema({
    fields,
    version: decoded.version || 1,
    lineage: decoded.lineage || null,
    region: decoded.region || null,
    meta: decoded.meta || {}
  });

  _bumpArtery(
    "binary",
    Object.keys(fields).length,
    schema.region,
    schema.meta?.tenantId || null
  );
  CoreMemory.set(ROUTE, KEY_LAST_BINARY, schema);

  const intell = computeSchemaIntellHash(schema, schema.meta?.worldHints || {});
  CoreMemory.set(ROUTE, KEY_LAST_INTELLHASH, intell);

  return schema;
}

// ============================================================================
// PulseSchema → Binary
// ============================================================================

export function unifyToBinary(pulseSchema) {
  const safe = {
    fields: {},
    version: pulseSchema.version || 1,
    lineage: pulseSchema.lineage || null,
    region: pulseSchema.region || null,
    meta: pulseSchema.meta || {}
  };

  for (const [key, field] of Object.entries(pulseSchema.fields || {})) {
    safe.fields[key] = {
      type: field.type,
      required: !!field.required,
      defaultValue: field.defaultValue,
      constraints: field.constraints || {},
      meta: field.meta || {}
    };
  }

  const jsonStr = JSON.stringify(safe);
  const buffer = new TextEncoder().encode(jsonStr);

  _bumpArtery(
    "binary",
    Object.keys(pulseSchema.fields || {}).length,
    safe.region,
    safe.meta?.tenantId || null
  );
  CoreMemory.set(ROUTE, KEY_LAST_BINARY_OUT, buffer);

  const intell = computeSchemaIntellHash(
    pulseSchema,
    pulseSchema.meta?.worldHints || {}
  );
  CoreMemory.set(ROUTE, KEY_LAST_INTELLHASH, intell);

  return buffer;
}

// ============================================================================
// Schema Merging
// ============================================================================

export function mergeSchemas(schemaA, schemaB) {
  const mergedFields = {};
  const allKeys = new Set([
    ...Object.keys(schemaA.fields || {}),
    ...Object.keys(schemaB.fields || {})
  ]);

  const conflicts = [];

  for (const key of allKeys) {
    const fa = schemaA.fields[key];
    const fb = schemaB.fields[key];

    if (fa && !fb) {
      mergedFields[key] = normalizeFieldDefinition(fa);
      continue;
    }
    if (!fa && fb) {
      mergedFields[key] = normalizeFieldDefinition(fb);
      continue;
    }

    if (fa.type !== fb.type) {
      conflicts.push({ field: key, from: fa.type, to: fb.type });
    }

    mergedFields[key] = new PulseField({
      type: fb.type || fa.type,
      required: !!(fa.required || fb.required),
      defaultValue:
        fb.defaultValue !== undefined ? fb.defaultValue : fa.defaultValue,
      constraints: { ...(fa.constraints || {}), ...(fb.constraints || {}) },
      meta: { ...(fa.meta || {}), ...(fb.meta || {}) }
    });
  }

  const version = Math.max(schemaA.version || 1, schemaB.version || 1) + 1;

  const meta = {
    ...(schemaA.meta || {}),
    ...(schemaB.meta || {})
  };

  if (conflicts.length > 0) {
    meta.schemaConflicts = conflicts;
  }

  const merged = new PulseSchema({
    fields: mergedFields,
    version,
    lineage: schemaB.lineage || schemaA.lineage || null,
    region: schemaB.region || schemaA.region || null,
    meta
  });

  _bumpArtery(
    "merge",
    Object.keys(mergedFields).length,
    merged.region,
    merged.meta?.tenantId || null
  );
  CoreMemory.set(ROUTE, KEY_LAST_MERGED, merged);

  const intell = computeSchemaIntellHash(
    merged,
    merged.meta?.worldHints || {}
  );
  CoreMemory.set(ROUTE, KEY_LAST_INTELLHASH, intell);

  return merged;
}

// ============================================================================
// Validation Surface (symbolic, deterministic)
// ============================================================================

function _validateValueForType(type, value, constraints) {
  const errors = [];

  if (value === undefined || value === null) {
    return errors;
  }

  switch (type) {
    case "string": {
      if (typeof value !== "string") {
        errors.push("expected_string");
        break;
      }
      const maxLength = constraints?.maxLength;
      if (typeof maxLength === "number" && value.length > maxLength) {
        errors.push("string_too_long");
      }
      break;
    }
    case "number": {
      if (typeof value !== "number" || !Number.isFinite(value)) {
        errors.push("expected_finite_number");
        break;
      }
      const min = constraints?.min;
      const max = constraints?.max;
      if (typeof min === "number" && value < min) errors.push("number_too_small");
      if (typeof max === "number" && value > max) errors.push("number_too_large");
      break;
    }
    case "boolean": {
      if (typeof value !== "boolean") {
        errors.push("expected_boolean");
      }
      break;
    }
    case "object": {
      if (typeof value !== "object" || value === null || Array.isArray(value)) {
        errors.push("expected_object");
      }
      break;
    }
    case "array": {
      if (!Array.isArray(value)) {
        errors.push("expected_array");
      }
      break;
    }
    case "binary": {
      if (!(value instanceof Uint8Array) && typeof value !== "string") {
        errors.push("expected_binary_or_string");
      }
      break;
    }
    default: {
      // unknown type → no structural validation
      break;
    }
  }

  return errors;
}

export function validateDocument(pulseSchema, doc) {
  const fields = pulseSchema?.fields || {};
  const errors = {};
  const missingRequired = [];

  for (const [name, field] of Object.entries(fields)) {
    const value = doc ? doc[name] : undefined;

    if (value === undefined || value === null) {
      if (field.required && field.defaultValue === undefined) {
        missingRequired.push(name);
      }
      continue;
    }

    const fieldErrors = _validateValueForType(
      field.type,
      value,
      field.constraints
    );
    if (fieldErrors.length > 0) {
      errors[name] = fieldErrors;
    }
  }

  const fieldCount = Object.keys(fields).length;
  _bumpArtery(
    "validate",
    fieldCount,
    pulseSchema.region,
    pulseSchema.meta?.tenantId || null
  );

  const result = Object.freeze({
    ok: Object.keys(errors).length === 0 && missingRequired.length === 0,
    errors,
    missingRequired,
    fieldCount
  });

  CoreMemory.set(ROUTE, KEY_LAST_VALIDATE, result);
  return result;
}

// ============================================================================
// Schema Diff
// ============================================================================

export function computeSchemaDiff(schemaA, schemaB) {
  const aFields = schemaA?.fields || {};
  const bFields = schemaB?.fields || {};

  const added = [];
  const removed = [];
  const changed = [];

  const allKeys = new Set([...Object.keys(aFields), ...Object.keys(bFields)]);

  for (const key of allKeys) {
    const fa = aFields[key];
    const fb = bFields[key];

    if (fa && !fb) {
      removed.push(key);
      continue;
    }
    if (!fa && fb) {
      added.push(key);
      continue;
    }

    const changes = [];
    if (fa.type !== fb.type) changes.push("type");
    if (!!fa.required !== !!fb.required) changes.push("required");
    if (fa.defaultValue !== fb.defaultValue) changes.push("defaultValue");

    if (changes.length > 0) {
      changed.push({ field: key, changes });
    }
  }

  const diff = Object.freeze({
    added,
    removed,
    changed
  });

  _bumpArtery(
    "diff",
    allKeys.size,
    schemaB?.region || schemaA?.region || null,
    schemaB?.meta?.tenantId || schemaA?.meta?.tenantId || null
  );
  CoreMemory.set(ROUTE, KEY_LAST_DIFF, diff);
  return diff;
}

// ============================================================================
// Compute Surface Inference (for OmniHosting / Continuance)
// ============================================================================
//
// inferSchemaComputeSurface(pulseSchema) →
//   {
//     requiresBinary,
//     requiresCompute,
//     requiresGPU,
//     requiresCI,
//     preferredRegion,
//     preferredTier,
//     workloadClass,
//     intent
//   }
//

export function inferSchemaComputeSurface(pulseSchema) {
  const fields = pulseSchema?.fields || {};
  const meta = pulseSchema?.meta || {};

  let requiresBinary =
    meta.requiresBinary === true ||
    Object.values(fields).some((f) => f.type === "binary");

  let requiresCompute =
    meta.requiresCompute === true ||
    Object.values(fields).some(
      (f) => f.type === "object" || f.type === "array"
    );

  const requiresGPU = meta.requiresGPU === true;
  const requiresCI = meta.requiresCI === true;

  const preferredRegion = meta.preferredRegion || pulseSchema.region || null;
  const preferredTier = meta.preferredTier || null;

  const workloadClass = meta.workloadClass || "generic";
  const intent = meta.intent || workloadClass || "generic";

  // symbolic bump only
  _bumpArtery(
    "gpu",
    Object.keys(fields).length,
    preferredRegion,
    meta.tenantId || null
  );
  _bumpArtery(
    "ci",
    Object.keys(fields).length,
    preferredRegion,
    meta.tenantId || null
  );

  return {
    requiresBinary,
    requiresCompute,
    requiresGPU,
    requiresCI,
    preferredRegion,
    preferredTier,
    workloadClass,
    intent
  };
}

// ============================================================================
// Exported API Surface — v20 IMMORTAL INTEL-WORLD
// ============================================================================

const PulseSchemaAPI_v20 = {
  Meta: PulseSchemaMeta,
  PulseField,
  PulseSchema,

  unifyFromFirestore,
  unifyFromSQL,
  unifyFromBinary,
  unifyToBinary,
  mergeSchemas,

  validateDocument,
  computeSchemaDiff,
  summarizeSchemaComplexity,
  buildSchemaPresenceOverlay,
  buildSchemaRoutingHints,
  inferSchemaComputeSurface,
  getSchemaArterySnapshot,
  getLastSchemaState,

  computeSchemaSignature,
  computeSchemaIntellHash,

  CoreMemory
};

export default PulseSchemaAPI_v20;
