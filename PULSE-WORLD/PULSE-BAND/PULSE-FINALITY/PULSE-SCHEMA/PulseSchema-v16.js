/**
 * PulseSchema-v16-Immortal-GPU+-CI.js
 * PULSE-FINALITY / PULSE-SCHEMA
 *
 * ROLE:
 *   Canonical, host-agnostic schema brain for Pulse OS.
 *   Everything else (Firestore, SQL, Binary, Regions, Hosts) is translation.
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
 */

/*
AI_EXPERIENCE_META = {
  identity: "PulseSchema",
  version: "v16-Immortal-GPU+-CI",
  layer: "schema",
  role: "unified_schema_brain",
  lineage: "PulseOS-v14 → v12.3-Presence-Evo+ → v16-Immortal-GPU+-CI",

  evo: {
    schemaUnification: true,
    firestoreUnify: true,
    sqlUnify: true,
    binaryUnify: true,
    schemaMerge: true,
    conflictDetection: true,
    lineageTracking: true,
    versionTracking: true,

    gpuAware: true,
    ciAware: true,
    continuanceAware: true,
    binaryDeltaAware: true,

    deterministic: true,
    driftProof: true,
    pureCompute: true,

    zeroNetwork: true,
    zeroFilesystem: true,
    zeroMutationOfInput: true
  },

  contract: {
    always: [
      "PulseContinuance",
      "PulseOmniHosting"
    ],
    never: [
      "safeRoute",
      "fetchViaCNS",
      "legacySchema"
    ]
  }
}
*/

// ============================================================================
// META — v16-Immortal-GPU+-CI
// ============================================================================

export const PulseSchemaMeta = Object.freeze({
  layer: "PulseSchema",
  role: "CANONICAL_SCHEMA_ORGAN",
  version: "16-Immortal-GPU+-CI",
  identity: "PulseSchema-v16-Immortal-GPU+-CI",

  evo: Object.freeze({
    deterministic: true,
    driftProof: true,
    hostAgnostic: true,
    reversibleBinary: true,
    noRandomness: true,
    noHostLogic: true,

    // organism overlays
    presenceAware: true,
    advantageAware: true,
    fallbackBandAware: true,
    chunkAware: true,
    cacheAware: true,
    prewarmAware: true,
    coldStartAware: true,
    dualbandSafe: true,

    // v16+ overlays
    gpuAware: true,
    ciAware: true,
    continuanceAware: true,
    binaryDeltaAware: true,
    arteryMetricsAware: true,
    validationAware: true,
    diffAware: true,

    epoch: "16-Immortal-GPU+-CI"
  })
});

// ============================================================================
// Canonical Types
// ============================================================================

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
// Internal Helpers
// ============================================================================

function clamp01(v) {
  if (v < 0) return 0;
  if (v > 1) return 1;
  return v;
}

function mapHostTypeToPulseType(hostType) {
  const t = String(hostType || "").toLowerCase();

  if (["string", "varchar", "text", "char"].some((x) => t.includes(x)))
    return "string";
  if (
    ["int", "integer", "bigint", "smallint", "number", "numeric", "decimal", "float", "double"].some(
      (x) => t.includes(x)
    )
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
// Artery Metrics (symbolic, in-memory only)
// ============================================================================

const _schemaArtery = {
  totalOps: 0,
  firestoreOps: 0,
  sqlOps: 0,
  binaryOps: 0,
  mergeOps: 0,
  validateOps: 0,
  diffOps: 0,
  lastOpKind: null,
  lastFieldCount: 0
};

function _bumpArtery(kind, fieldCount) {
  _schemaArtery.totalOps += 1;
  if (kind === "firestore") _schemaArtery.firestoreOps += 1;
  if (kind === "sql") _schemaArtery.sqlOps += 1;
  if (kind === "binary") _schemaArtery.binaryOps += 1;
  if (kind === "merge") _schemaArtery.mergeOps += 1;
  if (kind === "validate") _schemaArtery.validateOps += 1;
  if (kind === "diff") _schemaArtery.diffOps += 1;

  _schemaArtery.lastOpKind = kind;
  _schemaArtery.lastFieldCount = fieldCount || 0;
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
// Presence / Continuance / CI / Binary-Delta Overlays (symbolic only)
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
  binaryDeltaPacket = null
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

  return Object.freeze({
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
    binaryDeltaOverlay: binaryDeltaHint
  });
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

  _bumpArtery("firestore", Object.keys(fields).length);
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

  _bumpArtery("sql", Object.keys(fields).length);
  return schema;
}

// ============================================================================
// Binary → PulseSchema
// ============================================================================

export function unifyFromBinary(binaryBuffer) {
  if (!binaryBuffer) {
    const schema = new PulseSchema({});
    _bumpArtery("binary", 0);
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

  _bumpArtery("binary", Object.keys(fields).length);
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

  _bumpArtery("binary", Object.keys(pulseSchema.fields || {}).length);
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

  _bumpArtery("merge", Object.keys(mergedFields).length);
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
  _bumpArtery("validate", fieldCount);

  return Object.freeze({
    ok: Object.keys(errors).length === 0 && missingRequired.length === 0,
    errors,
    missingRequired,
    fieldCount
  });
}

// ============================================================================
// Schema Diff / Complexity
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

  _bumpArtery("diff", allKeys.size);
  return diff;
}

export function summarizeSchemaComplexity(schema) {
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

  // no artery bump here; call sites can decide if they want it
  return summary;
}

// ============================================================================
// Exported API Surface
// ============================================================================

const PulseSchemaAPI_v16 = {
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
  getSchemaArterySnapshot
};

export default PulseSchemaAPI_v16;
