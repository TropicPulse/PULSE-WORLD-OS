/* ============================================================================
AI_EXPERIENCE_META = {
  identity: "PulseTranslator.SkeletalIntake",
  version: "v17-IMMORTAL",
  layer: "pulse_translator",
  role: "skeletal_intake_translator",
  lineage: "SkeletalIntake-v11 → v12.4 → v14-Immortal → v17-IMMORTAL",

  evo: {
    skeletalIntake: true,
    genomeDriven: true,
    sqlIntake: true,
    symbolicPrimary: true,
    binaryAware: true,
    dualBand: true,
    presenceAware: true,
    harmonicsAware: true,
    shifterAware: true,
    regionAware: true,
    tenantAware: true,
    partitionAware: true,
    indexAware: true,

    deterministic: true,
    driftProof: true,
    pureCompute: true,

    zeroMutationOfInput: true,
    zeroNetwork: true,
    zeroFilesystem: true,
    zeroSQLExecution: true
  },

  contract: {
    always: [
      "PulseSpecs.DNAGenome",
      "PulseTranslator.RNAIntake",
      "PulseTranslator.RNAOutput",
      "PulseTranslator.SkeletalOutput"
    ],
    never: [
      "eval",
      "Function",
      "dynamicImport",
      "safeRoute",
      "fetchViaCNS"
    ]
  }
}
===============================================================================
EXPORT_META = {
  organ: "PulseTranslator.SkeletalIntake",
  layer: "pulse_translator",
  stability: "IMMORTAL",
  deterministic: true,
  pure: true,

  consumes: [
    "SQLColumnDefinition",
    "SQLSchemaObject",
    "SQLQueryString"
  ],

  produces: [
    "PulseField",
    "PulseFieldSchemaMap",
    "PulseFieldUsageMap"
  ],

  sideEffects: "none",
  network: "none",
  filesystem: "none",
  sql: "no_execution"
}
===============================================================================
FILE: /pulse-translator/PulseTranslatorSkeletalIntake.js
LAYER: THE SKELETAL INTAKE TRANSLATOR (SQL → Pulse)
===============================================================================
*/

import {
  SQLToPulse,
  PulseFieldTypes,
  validatePulseField
} from "../PULSE-SPECS/PulseSpecsDNAGenome-v17.js";

/* ============================================================================
   normalizeSQLType(sqlType)
   Handles DECIMAL(x,y), NUMERIC(x,y), VARCHAR(n), ENUM('a','b'), etc.
=============================================================================== */
function normalizeSQLType(sqlType = "") {
  const upper = sqlType.toUpperCase().trim();

  // Strip parameters: VARCHAR(255) → VARCHAR
  const base = upper.replace(/\(.+\)/g, "");

  return base;
}

/* ============================================================================
   extractEnumValues(sqlType)
   ENUM('A','B','C') → ["A","B","C"]
=============================================================================== */
function extractEnumValues(sqlType = "") {
  const match = sqlType.match(/\((.+)\)/);
  if (!match) return [];

  return match[1]
    .split(",")
    .map(v => v.trim().replace(/^'|'$/g, ""))
    .filter(Boolean);
}

/* ============================================================================
   translateSQLColumn(sqlType, columnName)
   Converts a SQL column definition → PulseField object.
   v17 IMMORTAL: supports:
     • DECIMAL → currency
     • ENUM → enum
     • JSON → json
     • VARBINARY/BLOB → binary
     • BIT → bitfield
     • presence/harmonics/shifter detection (schema-only)
     • region/tenant/partition/index-hint detection
=============================================================================== */
export function translateSQLColumn(sqlType, columnName) {
  if (!sqlType || !columnName) {
    throw new Error("PulseTranslatorSkeletalIntake-v17: missing sqlType or columnName");
  }

  const normalizedType = normalizeSQLType(sqlType);
  let pulseType = SQLToPulse[normalizedType] || PulseFieldTypes.STRING;

  // DECIMAL → currency
  if (normalizedType === "DECIMAL" || normalizedType === "NUMERIC") {
    pulseType = PulseFieldTypes.CURRENCY;
  }

  // ENUM → enum
  if (normalizedType === "ENUM") {
    pulseType = PulseFieldTypes.ENUM;
  }

  // JSON → json
  if (normalizedType === "JSON") {
    pulseType = PulseFieldTypes.JSON;
  }

  // IMMORTAL band/presence/harmonics/shifter detection (schema-only)
  if (looksLikeBand(columnName)) pulseType = PulseFieldTypes.BAND;
  if (looksLikePresence(columnName)) pulseType = PulseFieldTypes.PRESENCE;
  if (looksLikeHarmonics(columnName)) pulseType = PulseFieldTypes.HARMONICS;
  if (looksLikeShifter(columnName)) pulseType = PulseFieldTypes.PULSE_SHIFTER;

  // IMMORTAL region/tenant/partition/index-hint detection
  if (looksLikeRegion(columnName)) pulseType = PulseFieldTypes.REGION_CODE;
  if (looksLikeTenant(columnName)) pulseType = PulseFieldTypes.TENANT_ID;
  if (looksLikePartition(columnName)) pulseType = PulseFieldTypes.PARTITION_KEY;
  if (looksLikeIndexHint(columnName)) pulseType = PulseFieldTypes.INDEX_HINT;

  // Detect NULLABLE (SQL: "columnName TYPE NULL")
  const isNullable = /\bNULL\b/i.test(sqlType);

  const field = {
    name: normalizeFieldName(columnName),
    type: pulseType,
    source: "sql",
    originalType: sqlType.trim()
  };

  // ENUM allowedValues
  if (pulseType === PulseFieldTypes.ENUM) {
    field.allowedValues = extractEnumValues(sqlType);
  }

  // Wrap nullable fields
  if (isNullable) {
    field.type = PulseFieldTypes.NULLABLE;
    field.innerType = pulseType;
  }

  validatePulseField(field);
  return field;
}

/* ============================================================================
   translateSQLSchema(schemaObject)
   Example:
   {
     id: "INT",
     name: "VARCHAR(255)",
     price: "DECIMAL(18,2)",
     created_at: "TIMESTAMP NULL"
   }
=============================================================================== */
export function translateSQLSchema(schemaObject = {}) {
  const out = {};

  for (const [columnName, sqlType] of Object.entries(schemaObject)) {
    out[columnName] = translateSQLColumn(sqlType, columnName);
  }

  return out;
}

/* ============================================================================
   translateSQLQuery(queryString)
   Extracts SELECT fields → PulseField usage map.
   v17 IMMORTAL: deterministic, pure, zero‑SQL execution.
=============================================================================== */
export function translateSQLQuery(queryString = "") {
  const fields = extractSelectFields(queryString);

  return fields.map((f) => ({
    name: normalizeFieldName(f),
    type: PulseFieldTypes.STRING, // default inference
    source: "sql-query"
  }));
}

/* ============================================================================
   Helpers
=============================================================================== */
function normalizeFieldName(name) {
  return name.trim().toLowerCase().replace(/[^a-z0-9_]/g, "_");
}

function extractSelectFields(query) {
  const match = query.match(/select\s+(.+?)\s+from/i);
  if (!match) return [];

  const raw = match[1];
  return raw
    .split(",")
    .map((f) => f.trim().replace(/`/g, ""))
    .filter(Boolean);
}

/* IMMORTAL schema-only detectors */
function looksLikeBand(name) {
  return /band/i.test(name);
}
function looksLikePresence(name) {
  return /presence/i.test(name);
}
function looksLikeHarmonics(name) {
  return /harmonics/i.test(name);
}
function looksLikeShifter(name) {
  return /shifter/i.test(name);
}
function looksLikeRegion(name) {
  return /region|country|locale/i.test(name);
}
function looksLikeTenant(name) {
  return /tenant|account|org/i.test(name);
}
function looksLikePartition(name) {
  return /partition|shard|segment/i.test(name);
}
function looksLikeIndexHint(name) {
  return /index|idx|key/i.test(name);
}
